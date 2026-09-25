#!/usr/bin/env python3
"""
lint_reel.py — valida un plan de Reel (plan.yaml / plan.json) contra el perfil del cliente.

Uso:
    python lint_reel.py plan.yaml --perfil perfiles/torre-de-vega.yaml [--raiz CARPETA_CLIENTE]
                         [--historial historial.yaml] [--json]

Errores (E..) bloquean la puerta; avisos (W..) se presentan al cliente con su motivo si se aceptan.
Solo comprueba lo que se puede comprobar de forma determinista: no sustituye la revisión visual.

Requiere Python 3.9+. Para .yaml necesita PyYAML (pip install pyyaml); .json funciona sin nada más.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

# ── utilidades ────────────────────────────────────────────────────────────


def cargar(ruta: Path):
    texto = ruta.read_text(encoding="utf-8-sig")  # tolera BOM (PowerShell 5.1)
    if ruta.suffix.lower() in (".yaml", ".yml"):
        try:
            import yaml  # type: ignore
        except ImportError:
            sys.exit("Falta PyYAML: pip install pyyaml (o usa el plan en .json)")
        return yaml.safe_load(texto) or {}
    return json.loads(texto)


class Informe:
    def __init__(self):
        self.items: list[dict] = []

    def e(self, codigo, donde, msg):
        self.items.append({"nivel": "error", "codigo": codigo, "donde": donde, "msg": msg})

    def w(self, codigo, donde, msg):
        self.items.append({"nivel": "aviso", "codigo": codigo, "donde": donde, "msg": msg})

    @property
    def errores(self):
        return [i for i in self.items if i["nivel"] == "error"]


def lista(x):
    if x is None:
        return []
    return x if isinstance(x, list) else [x]


def contiene_alguna(texto: str, alternativas: str) -> bool:
    t = texto.lower()
    return any(a.strip().lower() in t for a in alternativas.split("|"))


def duracion(plano) -> float | None:
    t = plano.get("t")
    if isinstance(t, (list, tuple)) and len(t) == 2:
        try:
            return float(t[1]) - float(t[0])
        except (TypeError, ValueError):
            return None
    return None


FUEGO = re.compile(r"\b(fuego|brasa|brasas|llama|llamas|humo|fire|flame|flames|embers|smoke)\b", re.I)
PROHIBIDAS_SIEMPRE = ["8k", "hyperrealistic", "hyper-realistic", "masterpiece", "trending on"]
NEGADORES = ("no", "not", "never", "without", "nor")
BLOQUES_VIDEO = ["PRESERVE", "MOTION", "CAMERA", "FILM GRADE", "NEGATIVE"]
CODA = "photographic realism, no text."
CAMPOS_IMAGEN = ["subject_identity", "realism", "environment", "lighting", "camera",
                 "composition", "imperfections", "palette", "mood", "negatives"]


def termino_no_negado(texto: str, termino: str) -> bool:
    """True si 'termino' aparece sin una negación en las 3 palabras previas."""
    t = texto.lower()
    for m in re.finditer(re.escape(termino.lower()), t):
        previas = re.findall(r"[a-z']+", t[max(0, m.start() - 40):m.start()])[-3:]
        if not any(p in NEGADORES for p in previas):
            return True
    return False


def bloque_negativo(prompt: str) -> str:
    m = re.search(r"NEGATIVE\s*:?(.*)", prompt, re.S)
    return m.group(1) if m else ""


# ── comprobaciones ────────────────────────────────────────────────────────


def comprobar_estructura(plan, inf: Informe):
    for sec in ("reel", "brief", "verdad", "tratamiento", "planos", "generaciones"):
        if sec not in plan or plan[sec] in (None, ""):
            inf.e("E01", sec, f"falta la sección «{sec}»")
    brief = plan.get("brief") or {}
    for campo in ("pieza", "objetivo", "motivo_para_reenviar", "reel_de_referencia", "estilo_de_luz", "cta"):
        if not str(brief.get(campo) or "").strip():
            inf.e("E02", f"brief.{campo}", "campo vacío: pregunta al cliente antes de seguir")
    if not brief.get("presupuesto_creditos"):
        inf.w("W16", "brief.presupuesto_creditos", "sin presupuesto: no se puede controlar el gasto")


def comprobar_rutas(plan, raiz: Path | None, inf: Informe):
    if raiz is None:
        return
    verdad = plan.get("verdad") or {}
    rutas = []
    for a in lista(verdad.get("anclas")):
        rutas += [(f"verdad.anclas.{a.get('id')}", f) for f in lista(a.get("fotos"))]
    for mr in lista(verdad.get("metraje_real")):
        rutas.append(("verdad.metraje_real", mr.get("ruta")))
    for g in lista(plan.get("generaciones")):
        for r in lista(g.get("referencias")):
            if r.get("ruta") and not str(r.get("ruta")).startswith(("job:", "K-", "V-")):
                rutas.append((f"generaciones.{g.get('id')}", r.get("ruta")))
    for donde, ruta in rutas:
        if ruta and not (raiz / ruta).exists():
            inf.e("E03", donde, f"no existe «{ruta}» bajo {raiz}")


def comprobar_planos(plan, perfil, inf: Informe):
    planos = lista(plan.get("planos"))
    gens = {g.get("id"): g for g in lista(plan.get("generaciones"))}
    if not planos:
        return
    gancho_cfg = perfil.get("gancho") or {}
    manos_cfg = perfil.get("manos") or {}
    modelos_cfg = perfil.get("modelos") or {}

    # Línea de tiempo
    ordenados = sorted(planos, key=lambda p: (lista(p.get("t")) or [0])[0])
    fin_prev = None
    for p in ordenados:
        t = lista(p.get("t"))
        if len(t) != 2:
            inf.e("E04", p.get("id"), "t debe ser [inicio, fin] en segundos")
            continue
        if fin_prev is not None and abs(float(t[0]) - fin_prev) > 0.05:
            inf.w("W08", p.get("id"), f"hueco o solape en la línea de tiempo ({fin_prev} → {t[0]})")
        fin_prev = float(t[1])
    total = fin_prev or 0
    orient = (plan.get("brief") or {}).get("duracion_orientativa_s")
    if orient and total and not (0.7 * float(orient) <= total <= 1.3 * float(orient)):
        inf.w("W09", "planos", f"duración total {total:.1f} s lejos de la orientativa ({orient} s)")

    # Gancho
    g0 = ordenados[0]
    t0 = lista(g0.get("t"))
    if t0 and float(t0[0]) != 0.0:
        inf.e("E10", g0.get("id"), "el primer plano debe empezar en 0,0 s")
    if gancho_cfg.get("rotulo_obligatorio") and not str(g0.get("rotulo") or "").strip():
        inf.e("E10", g0.get("id"), "el gancho necesita rótulo desde el fotograma 1 (regla 12)")
    origen0 = ((g0.get("accion") or {}).get("origen_movimiento") or "").lower()
    if origen0 in ("", "ninguno") or g0.get("escalon") == "L1" and (g0.get("fuente") or {}).get("tipo") != "real":
        inf.e("E11", g0.get("id"), "el fotograma 1 necesita movimiento real, no un bodegón ni un paneo de montaje")
    d0 = duracion(g0)
    if d0 is not None and gancho_cfg:
        if not (gancho_cfg.get("duracion_min_s", 0) <= d0 <= gancho_cfg.get("duracion_max_s", 99)):
            inf.w("W01", g0.get("id"), f"el gancho dura {d0:.1f} s; el perfil pide "
                  f"{gancho_cfg.get('duracion_min_s')}-{gancho_cfg.get('duracion_max_s')} s")

    angulos = {}
    mov_prev = None
    conteo_manos = {"mujer": 0, "hombre": 0}
    for p in ordenados:
        pid = p.get("id")
        escalon = str(p.get("escalon") or "")
        fuente = p.get("fuente") or {}
        generado = fuente.get("tipo") == "generado" or escalon in ("L2", "L3", "L4")
        accion = p.get("accion") or {}
        desc = f"{accion.get('descripcion', '')} {p.get('rotulo', '')}"

        if escalon not in ("L0", "L1", "L2", "L3", "L4"):
            inf.e("E13", pid, "escalón inválido (L0-L4)")
        elif escalon in ("L2", "L3", "L4") and not str(p.get("justificacion_escalon") or "").strip():
            inf.e("E13", pid, f"{escalon} sin justificación: ¿por qué no sirve un escalón más bajo?")

        if generado and (FUEGO.search(accion.get("descripcion", "")) or accion.get("origen_movimiento") == "fuego"):
            inf.e("E12", pid, "fuego, brasa o humo generados: solo metraje real (regla 22)")

        if generado and escalon in ("L3", "L4") and accion.get("origen_movimiento") in ("ninguno", None, ""):
            inf.w("W03", pid, "nada se mueve en el keyframe: resuélvelo en montaje (L1) en vez de generar vídeo")

        if generado:
            gid = p.get("generacion")
            if not gid or gid not in gens:
                inf.e("E15", pid, f"plano generado sin generación de vídeo válida («{gid}»)")
            else:
                g = gens[gid]
                clase = accion.get("clase")
                modelo = g.get("modelo")
                if clase == "compleja" and modelo not in lista(modelos_cfg.get("compleja")):
                    inf.e("E17", pid, f"acción compleja con {modelo}; el perfil pide {modelos_cfg.get('compleja')}")
                if clase == "simple" and modelo in lista(modelos_cfg.get("compleja")) and len(lista(g.get("planos"))) == 1:
                    inf.w("W05", pid, f"acción simple con {modelo}: más caro sin necesidad (salvo multitoma)")

            ang = p.get("angulo") or {}
            clave = (str(ang.get("posicion")), str(ang.get("altura")))
            if clave in angulos and not str(p.get("excepcion_angulo") or "").strip():
                inf.e("E14", pid, f"mismo ángulo que {angulos[clave]} ({clave[0]}, {clave[1]}): cambia posición o altura, "
                      "no solo focal o recorte")
            angulos.setdefault(clave, pid)

            beats = lista(p.get("beats"))
            if not beats:
                inf.e("E29", pid, "plano generado sin beats")
            elif not str(beats[-1].get("estado_final") or "").strip():
                inf.e("E29", pid, "el último beat necesita un estado final visible")

        mov = ((p.get("camara") or {}).get("movimiento") or "").lower()
        if mov and mov_prev and mov == mov_prev and mov not in ("bloqueada",):
            inf.w("W02", pid, f"mismo movimiento de cámara ({mov}) que el plano anterior (regla 9)")
        mov_prev = mov or mov_prev

        manos = [m.lower() for m in lista(p.get("manos"))]
        if manos_cfg.get("generos_distintos_en_plano") and len(manos) >= 2 and len(set(manos)) < len(manos):
            inf.e("E18", pid, "dos manos del mismo género en el plano (regla 13)")
        for m in manos:
            if m in conteo_manos:
                conteo_manos[m] += 1

    pred = manos_cfg.get("predominio")
    if pred and sum(conteo_manos.values()) >= 2:
        otro = "hombre" if pred == "mujer" else "mujer"
        if conteo_manos[pred] < conteo_manos[otro]:
            inf.w("W06", "planos", f"predominio de manos de {otro}; el perfil pide {pred}")

    # Material real reutilizado y anclas difíciles
    verdad = plan.get("verdad") or {}
    for mr in lista(verdad.get("metraje_real")):
        usados = [p.get("id") for p in planos if (p.get("fuente") or {}).get("ruta") == mr.get("ruta")]
        if usados and lista(mr.get("usos_previos")):
            inf.w("W13", ",".join(usados), f"«{mr.get('ruta')}» ya se usó en {mr.get('usos_previos')}: "
                  "confirma con el cliente")
    dificiles = {a.get("id") for a in lista(verdad.get("anclas")) if a.get("dificultad") == "alta"}
    for p in planos:
        for a in lista(p.get("anclas")):
            if a in dificiles and p.get("escalon") == "L4":
                inf.w("W12", p.get("id"), f"ancla «{a}» marcada como difícil en un plano L4")


def comprobar_generaciones(plan, perfil, inf: Informe):
    fmt = perfil.get("formato") or {}
    modelos_cfg = perfil.get("modelos") or {}
    camara_cfg = perfil.get("camara") or {}
    neg_obl = perfil.get("negativos_obligatorios") or {}
    neg_cond = perfil.get("negativos_condicionales") or {}
    planos = {p.get("id"): p for p in lista(plan.get("planos"))}
    presupuesto = (plan.get("brief") or {}).get("presupuesto_creditos") or 0
    total = 0.0

    for g in lista(plan.get("generaciones")):
        gid = g.get("id")
        tipo = g.get("tipo")
        modelo = str(g.get("modelo") or "")
        params = g.get("params") or {}
        prompt = str(g.get("prompt") or "")
        total += float(g.get("coste_est_creditos") or 0)
        etiquetas = set()
        for pid in lista(g.get("planos")):
            etiquetas |= set(lista((planos.get(pid) or {}).get("contiene")))

        if modelo in lista(modelos_cfg.get("prohibidos")):
            inf.e("E16", gid, f"modelo prohibido: {modelo}")
        if str(params.get("mode", "")).lower() == "t2v":
            inf.e("E16", gid, "texto a vídeo prohibido: todo plano generado parte de imagen")

        externo = prompt.strip().startswith("(ver ")
        if externo:
            inf.w("W15", gid, "prompt no incluido en el plan: no se ha podido revisar")

        if tipo == "video":
            if str(params.get("aspect_ratio")) != fmt.get("aspect_ratio", "9:16"):
                inf.e("E20", gid, f"aspect_ratio «{params.get('aspect_ratio')}»: el vídeo no lo deduce de la imagen")
            minimo = fmt.get("video_resolucion_min", "1080p")
            if modelo.startswith("kling"):
                if str(params.get("mode")) not in ("pro", "4k"):
                    inf.e("E21", gid, f"Kling en modo «{params.get('mode')}»: 1080p exige pro (o 4k)")
                dur_def = modelos_cfg.get("kling_duracion_por_defecto")
                if dur_def and params.get("duration") not in (None, dur_def) and not g.get("justificacion_duracion"):
                    inf.w("W04", gid, f"Kling con duration {params.get('duration')} (por defecto {dur_def}, regla 2)")
            elif str(params.get("resolution")) != minimo:
                inf.e("E21", gid, f"resolución «{params.get('resolution')}»: mínimo {minimo}")
            if params.get("end_image") and modelo in lista(modelos_cfg.get("sin_end_image")):
                inf.e("E16", gid, f"{modelo} no admite end_image")
            if not externo:
                pos = [prompt.find(b) for b in BLOQUES_VIDEO]
                if any(x < 0 for x in pos) or pos != sorted(pos):
                    faltan = [b for b, x in zip(BLOQUES_VIDEO, pos) if x < 0]
                    inf.e("E22", gid, "bloques PRESERVE → MOTION → CAMERA → FILM GRADE → NEGATIVE "
                          + (f"(faltan {faltan})" if faltan else "(orden incorrecto)"))
                if not prompt.strip().lower().endswith(CODA):
                    inf.e("E23", gid, "el prompt debe terminar en «Photographic realism, no text.»")
                frase = camara_cfg.get("frase_obligatoria")
                bloqueada = all(((planos.get(pid) or {}).get("camara") or {}).get("movimiento") == "bloqueada"
                                for pid in lista(g.get("planos")))
                if frase and not bloqueada and frase.lower() not in prompt.lower():
                    inf.e("E28", gid, f"CAMERA sin «{frase}»: la cámara debe moverse de principio a fin")
                neg = bloque_negativo(prompt)
                requeridos = list(lista(neg_obl.get("video")))
                for et in etiquetas:
                    requeridos += lista((neg_cond.get("video") or {}).get(et))
                faltan = [r for r in requeridos if not contiene_alguna(neg + " " + prompt, r)]
                if faltan:
                    inf.e("E24", gid, f"faltan negativos validados: {faltan} (regla 9quater)")
                texto_sin_neg = prompt[: prompt.find("NEGATIVE")] if "NEGATIVE" in prompt else prompt
                for termino in lista(camara_cfg.get("prohibido")):
                    if termino_no_negado(texto_sin_neg, termino):
                        inf.e("E25", gid, f"«{termino}» pedido como movimiento: prohibido (reglas 5 y 11)")

        elif tipo == "imagen":
            if fmt.get("imagen_resolucion") and str(params.get("resolution")) != fmt["imagen_resolucion"]:
                inf.e("E26", gid, f"resolución «{params.get('resolution')}»; el perfil pide {fmt['imagen_resolucion']}")
            if str(params.get("aspect_ratio")) != fmt.get("aspect_ratio", "9:16"):
                inf.e("E20", gid, f"aspect_ratio «{params.get('aspect_ratio')}»")
            refs = lista(g.get("referencias"))
            if fmt.get("max_referencias_imagen") and len(refs) > fmt["max_referencias_imagen"]:
                inf.w("W11", gid, f"{len(refs)} referencias: la atención se diluye pasadas {fmt['max_referencias_imagen']}")
            if refs and not any(r.get("fidelidad") == "completa" for r in refs):
                inf.e("E27", gid, "ninguna referencia real con fidelidad «completa»: nada ancla el local")
            for r in refs:
                if r.get("fidelidad") not in ("completa", "parcial", "atributo", "guia"):
                    inf.e("E27", gid, f"referencia «{r.get('ruta')}» sin grado de fidelidad válido")
                if r.get("fidelidad") == "guia" and not str(r.get("excluir") or "").strip():
                    inf.e("E27", gid, f"referencia guía «{r.get('ruta')}» sin exclusión: su contenido se colará")
            if not externo:
                try:
                    brief = json.loads(prompt)
                except json.JSONDecodeError:
                    inf.e("E26", gid, "el prompt de imagen no es un JSON válido (se envía stringificado)")
                    brief = None
                if isinstance(brief, dict):
                    faltan_campos = [c for c in CAMPOS_IMAGEN if c not in brief]
                    if faltan_campos:
                        inf.e("E26", gid, f"faltan campos del Decoded Brief: {faltan_campos}")
                    neg = str(brief.get("negatives", ""))
                    requeridos = list(lista(neg_obl.get("imagen")))
                    for et in etiquetas:
                        requeridos += lista((neg_cond.get("imagen") or {}).get(et))
                    faltan = [r for r in requeridos if not contiene_alguna(neg, r)]
                    if faltan:
                        inf.e("E24", gid, f"faltan negativos validados en «negatives»: {faltan}")
        else:
            inf.e("E01", gid, "tipo debe ser «imagen» o «video»")

        for termino in PROHIBIDAS_SIEMPRE:
            if termino in prompt.lower():
                inf.e("E25", gid, f"«{termino}» no aporta nada y empuja al look de render")

    if presupuesto:
        if total > presupuesto:
            inf.e("E30", "generaciones", f"coste estimado {total:.2f} > presupuesto {presupuesto}")
        elif total > 0.8 * presupuesto:
            inf.w("W07", "generaciones", f"coste estimado {total:.2f} por encima del 80 % del presupuesto")


def comprobar_novedad(plan, historial, inf: Informe):
    if not historial:
        return
    elegido = plan.get("concepto_elegido")
    mec = next((c.get("mecanismo") for c in lista(plan.get("conceptos")) if c.get("id") == elegido), None)
    ultimos = [r.get("mecanismo") for r in lista(historial.get("reels"))[-2:]]
    if mec and mec in ultimos:
        inf.w("W10", "concepto_elegido", f"mecanismo {mec} usado en los dos últimos reels")


# ── principal ─────────────────────────────────────────────────────────────


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("plan", type=Path)
    ap.add_argument("--perfil", type=Path, required=True)
    ap.add_argument("--raiz", type=Path, help="carpeta del cliente para comprobar rutas")
    ap.add_argument("--historial", type=Path, help="historial de reels (references/07)")
    ap.add_argument("--json", action="store_true", help="salida en JSON")
    a = ap.parse_args()

    plan = cargar(a.plan)
    perfil = cargar(a.perfil)
    historial = cargar(a.historial) if a.historial and a.historial.exists() else None

    inf = Informe()
    comprobar_estructura(plan, inf)
    comprobar_rutas(plan, a.raiz, inf)
    comprobar_planos(plan, perfil, inf)
    comprobar_generaciones(plan, perfil, inf)
    comprobar_novedad(plan, historial, inf)

    if a.json:
        print(json.dumps(inf.items, ensure_ascii=False, indent=2))
    else:
        for i in sorted(inf.items, key=lambda x: (x["nivel"] != "error", x["codigo"])):
            marca = "✗" if i["nivel"] == "error" else "!"
            print(f"{marca} {i['codigo']} [{i['donde']}] {i['msg']}")
        n_e, n_w = len(inf.errores), len(inf.items) - len(inf.errores)
        print(f"\n{n_e} errores, {n_w} avisos" + (" — listo para la puerta" if n_e == 0 else ""))
    sys.exit(1 if inf.errores else 0)


if __name__ == "__main__":
    main()
