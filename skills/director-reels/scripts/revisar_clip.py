#!/usr/bin/env python3
"""
revisar_clip.py — revisión técnica de un clip generado antes de enseñarlo.

Uso:
    python revisar_clip.py clip.mp4 [--keyframe inicio.png] [--end final.png] [--salida carpeta]
                           [--ancho 1080 --alto 1920] [--fps-analisis 8]

Qué mide (orientativo: los umbrales son un punto de partida, calíbralos con clips ya aprobados):
  · formato real (resolución, fps, duración, audio) frente a 1080×1920;
  · movimiento global de cámara por correlación de fase: trayectoria, suavidad y temblor;
  · si la imagen ya se mueve en el primer y en el último tramo (fórmula del slider);
  · «foto congelada»: casi nada cambia salvo una zona pequeña (regla 5);
  · deriva frente al keyframe de inicio y al de final (regla 16);
  · dónde ocurre el movimiento (rejilla 3×3) y una hoja de contactos de 6 fotogramas.

No juzga el realismo de manos, comida o texto: eso se mira a tamaño real con la rúbrica
(references/06-revision-realismo.md). Requiere ffmpeg/ffprobe en el PATH, numpy y Pillow.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

UMBRALES = {
    "temblor_px": 0.35,        # desviación del movimiento frente a su media móvil (en px a 270 de ancho)
    "arranque_mad": 1.5,       # actividad propia del sujeto (líquido, mano) que también cuenta como «en marcha»
    "congelada_area": 0.05,    # si cambia menos de este % del encuadre y la cámara no se mueve
    "camara_quieta_px": 0.25,  # movimiento medio de cámara por medio segundo (px a 270 de ancho) = parada
    "en_marcha_px": 0.25,      # movimiento mínimo en el primer y el último medio segundo
    "deriva_mae": 18.0,        # diferencia media (0-255) frente al keyframe a partir de la cual avisar
    "deriva_ncc": 0.85,        # correlación mínima con el keyframe (1 = idéntico)
}


def sh(cmd: list[str]) -> bytes:
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode != 0:
        sys.exit(f"Falló: {' '.join(cmd)}\n{r.stderr.decode(errors='ignore')[-800:]}")
    return r.stdout


def probar(clip: Path) -> dict:
    out = json.loads(sh(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(clip)]))
    v = next(s for s in out["streams"] if s["codec_type"] == "video")
    num, den = (v.get("r_frame_rate") or "0/1").split("/")
    return {
        "ancho": int(v["width"]), "alto": int(v["height"]),
        "fps": round(float(num) / float(den or 1), 3),
        "duracion_s": round(float(out["format"].get("duration", 0)), 3),
        "codec": v.get("codec_name"),
        "audio": any(s["codec_type"] == "audio" for s in out["streams"]),
    }


def fotogramas(clip: Path, fps: float, ancho: int, info: dict) -> np.ndarray:
    alto = int(round(info["alto"] * ancho / info["ancho"] / 2) * 2)
    raw = sh(["ffmpeg", "-v", "error", "-i", str(clip), "-vf", f"fps={fps},scale={ancho}:{alto},format=gray",
              "-f", "rawvideo", "-"])
    n = len(raw) // (ancho * alto)
    return np.frombuffer(raw[: n * ancho * alto], dtype=np.uint8).reshape(n, alto, ancho).astype(np.float32)


def desplazamiento(a: np.ndarray, b: np.ndarray, ventana: np.ndarray) -> tuple[float, float]:
    """Traslación de b respecto a a por correlación de fase, con ajuste subpíxel."""
    fa, fb = np.fft.fft2((a - a.mean()) * ventana), np.fft.fft2((b - b.mean()) * ventana)
    r = fa * np.conj(fb)
    r /= np.abs(r) + 1e-9
    c = np.fft.ifft2(r).real
    py, px = np.unravel_index(np.argmax(c), c.shape)

    def sub(p, n, eje):
        m1 = c[(p - 1) % n, px] if eje == 0 else c[py, (p - 1) % n]
        m0 = c[py, px]
        p1 = c[(p + 1) % n, px] if eje == 0 else c[py, (p + 1) % n]
        d = m1 - 2 * m0 + p1
        return p + (0.5 * (m1 - p1) / d if d != 0 else 0.0)

    h, w = c.shape
    y, x = sub(py, h, 0), sub(px, w, 1)
    if y > h / 2:
        y -= h
    if x > w / 2:
        x -= w
    return float(-x), float(-y)


def modelo_camara(a: np.ndarray, b: np.ndarray) -> tuple[float, float, float]:
    """Ajusta traslación + escala entre dos fotogramas con 3×3 bloques: v = t + s·(p − centro).

    Devuelve (tx, ty, s): s > 0 es acercamiento (push-in), s < 0 alejamiento.
    """
    h, w = a.shape
    bh, bw = h // 3, w // 3
    ventana = np.outer(np.hanning(bh), np.hanning(bw)).astype(np.float32)
    filas, obs = [], []
    for i in range(3):
        for j in range(3):
            pa = a[i * bh:(i + 1) * bh, j * bw:(j + 1) * bw]
            pb = b[i * bh:(i + 1) * bh, j * bw:(j + 1) * bw]
            if pa.std() < 2:  # bloque sin textura (negro, cielo): no informa
                continue
            dx, dy = desplazamiento(pa, pb, ventana)
            cx, cy = (j + 0.5) * bw - w / 2, (i + 0.5) * bh - h / 2
            filas += [[1, 0, cx], [0, 1, cy]]
            obs += [dx, dy]
    if len(obs) < 6:
        return 0.0, 0.0, 0.0
    sol, *_ = np.linalg.lstsq(np.array(filas, dtype=np.float64), np.array(obs), rcond=None)
    return float(sol[0]), float(sol[1]), float(sol[2])


def comparar_imagen(ruta: Path, frame: np.ndarray) -> tuple[float, float]:
    """Diferencia media (0-255) y correlación normalizada entre una imagen y un fotograma."""
    img = Image.open(ruta).convert("L").resize((frame.shape[1], frame.shape[0]), Image.BILINEAR)
    x = np.asarray(img, dtype=np.float32)
    mae = float(np.mean(np.abs(x - frame)))
    xa, fa = x - x.mean(), frame - frame.mean()
    ncc = float((xa * fa).sum() / (np.sqrt((xa ** 2).sum() * (fa ** 2).sum()) + 1e-9))
    return mae, ncc


def hoja_contactos(clip: Path, info: dict, salida: Path, n: int = 6) -> Path:
    tiempos = [info["duracion_s"] * (i + 0.5) / n for i in range(n)]
    ancho = 360
    miniaturas = []
    for i, t in enumerate(tiempos):
        tmp = salida / f"_f{i}.png"
        sh(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(clip), "-frames:v", "1",
            "-vf", f"scale={ancho}:-2", str(tmp)])
        miniaturas.append((t, Image.open(tmp).convert("RGB")))
        tmp.unlink(missing_ok=True)
    alto = miniaturas[0][1].height
    hoja = Image.new("RGB", (ancho * n + 10 * (n - 1), alto + 28), (20, 20, 20))
    dib = ImageDraw.Draw(hoja)
    for i, (t, im) in enumerate(miniaturas):
        x = i * (ancho + 10)
        hoja.paste(im, (x, 28))
        dib.text((x + 6, 8), f"{t:.2f} s", fill=(235, 235, 235))
    destino = salida / f"{clip.stem}_hoja.jpg"
    hoja.save(destino, quality=90)
    return destino


def analizar(a) -> dict:
    clip = Path(a.clip)
    salida = Path(a.salida or clip.parent)
    salida.mkdir(parents=True, exist_ok=True)
    info = probar(clip)
    fr = fotogramas(clip, a.fps_analisis, 270, info)
    if len(fr) < 4:
        sys.exit("Clip demasiado corto para analizarlo")

    h, w = fr.shape[1:]
    ventana = np.outer(np.hanning(h), np.hanning(w)).astype(np.float32)
    tray = np.array([desplazamiento(fr[i], fr[i + 1], ventana) for i in range(len(fr) - 1)])
    k = min(5, len(tray))
    suave = np.vstack([np.convolve(tray[:, j], np.ones(k) / k, mode="same") for j in (0, 1)]).T
    temblor = float(np.std(tray - suave))

    difs = np.abs(np.diff(fr, axis=0))
    area_cambio = float((difs > 6).mean())

    # Movimiento de cámara por tramos de medio segundo: traslación + escala (push-in / pull-back).
    paso = max(1, int(round(a.fps_analisis * 0.5)))
    radio = float(np.mean([np.hypot((j + 0.5) * w / 3 - w / 2, (i + 0.5) * h / 3 - h / 2)
                           for i in range(3) for j in range(3)]))
    tramos = [modelo_camara(fr[i], fr[i + paso]) for i in range(0, len(fr) - paso, paso)]
    energia = [abs(tx) + abs(ty) + abs(sc) * radio for tx, ty, sc in tramos] or [0.0]
    escala_total = float(np.sum([t[2] for t in tramos]))
    mov_ini, mov_fin = energia[0], energia[-1]
    act_ini, act_fin = float(difs[:paso].mean()), float(difs[-paso:].mean())

    rej = np.zeros((3, 3))
    for i in range(3):
        for j in range(3):
            rej[i, j] = difs[:, i * h // 3:(i + 1) * h // 3, j * w // 3:(j + 1) * w // 3].mean()
    rej_norm = (rej / rej.max()).round(2).tolist() if rej.max() > 0 else rej.tolist()

    avisos = []
    if (info["ancho"], info["alto"]) != (a.ancho, a.alto):
        avisos.append(f"resolución {info['ancho']}×{info['alto']} ≠ {a.ancho}×{a.alto}: reescalar/recortar en montaje "
                      "y comprobar que no es un 720p")
    if info["alto"] < 1900:
        avisos.append("por debajo de 1080p reales: no cumple la regla de resolución")
    if temblor > UMBRALES["temblor_px"]:
        avisos.append(f"temblor {temblor:.2f} px: movimiento irregular, lee como handheld (regla 11)")
    camara_quieta = float(np.mean(energia)) < UMBRALES["camara_quieta_px"]
    en_marcha = UMBRALES["en_marcha_px"]
    if mov_ini < en_marcha and act_ini < UMBRALES["arranque_mad"]:
        avisos.append("el primer medio segundo está casi parado: la cámara debería estar en marcha desde el fotograma 1")
    if mov_fin < en_marcha and act_fin < UMBRALES["arranque_mad"]:
        avisos.append("el último medio segundo está casi parado: el movimiento debería llegar hasta el final")
    if camara_quieta and area_cambio < UMBRALES["congelada_area"]:
        avisos.append(f"solo cambia el {area_cambio:.1%} del encuadre con la cámara parada: «foto congelada» (regla 5)")

    deriva = {}
    for nombre, ruta, frame, texto in (
        ("inicio", a.keyframe, fr[0], "el primer fotograma se aparta del keyframe: ¿otro encuadre, otro grade o recorte?"),
        ("final", a.end, fr[-1], "el último fotograma no aterriza en el end_image: el corte a la toma fija saltará"),
    ):
        if not ruta:
            continue
        mae, ncc = comparar_imagen(Path(ruta), frame)
        deriva[nombre] = {"mae": round(mae, 2), "correlacion": round(ncc, 3)}
        if mae > UMBRALES["deriva_mae"] or ncc < UMBRALES["deriva_ncc"]:
            avisos.append(f"{texto} (MAE {mae:.1f}, correlación {ncc:.2f})")

    hoja = hoja_contactos(clip, info, salida)
    informe = {
        "clip": str(clip),
        "formato": info,
        "camara": {
            "desplazamiento_imagen_px": [round(float(tray[:, 0].sum()), 1), round(float(tray[:, 1].sum()), 1)],
            "escala_total_pct": round(escala_total * 100, 2),
            "energia_por_medio_segundo": [round(e, 2) for e in energia],
            "temblor_px": round(temblor, 3),
            "quieta": camara_quieta,
            "nota": "px medidos a 270 de ancho; desplazamiento negativo en x = la imagen va a la izquierda "
                    "(la cámara a la derecha); escala positiva = acercamiento",
        },
        "actividad": {
            "diferencia_media_inicio": round(act_ini, 2),
            "diferencia_media_final": round(act_fin, 2),
            "area_que_cambia": round(area_cambio, 3),
            "rejilla_3x3": rej_norm,
        },
        "deriva": deriva,
        "hoja_contactos": str(hoja),
        "avisos": avisos,
        "umbrales": UMBRALES,
    }
    (salida / f"{clip.stem}_revision.json").write_text(json.dumps(informe, ensure_ascii=False, indent=2),
                                                        encoding="utf-8")
    return informe


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("clip")
    ap.add_argument("--keyframe", help="imagen de inicio aprobada")
    ap.add_argument("--end", help="imagen final (end_image) si el clip debe aterrizar en ella")
    ap.add_argument("--salida", help="carpeta para la hoja de contactos y el informe")
    ap.add_argument("--ancho", type=int, default=1080)
    ap.add_argument("--alto", type=int, default=1920)
    ap.add_argument("--fps-analisis", type=float, default=8.0)
    a = ap.parse_args()
    inf = analizar(a)
    f = inf["formato"]
    print(f"{Path(inf['clip']).name}: {f['ancho']}×{f['alto']}, {f['fps']} fps, {f['duracion_s']} s"
          f"{', con audio' if f['audio'] else ''}")
    c = inf["camara"]
    print(f"cámara: desplazamiento {c['desplazamiento_imagen_px']} px, escala {c['escala_total_pct']} %, "
          f"temblor {c['temblor_px']} px{', quieta' if c['quieta'] else ''}")
    print(f"actividad: inicio {inf['actividad']['diferencia_media_inicio']}, final "
          f"{inf['actividad']['diferencia_media_final']}, área que cambia {inf['actividad']['area_que_cambia']:.1%}")
    if inf["deriva"]:
        print(f"deriva: {inf['deriva']}")
    print(f"hoja de contactos: {inf['hoja_contactos']}")
    if inf["avisos"]:
        print("\nAVISOS:")
        for x in inf["avisos"]:
            print(f"  ! {x}")
    else:
        print("\nSin avisos técnicos. Falta la revisión visual a tamaño real.")


if __name__ == "__main__":
    main()
