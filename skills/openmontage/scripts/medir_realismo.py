#!/usr/bin/env python3
"""Medidor de «firma de rodaje» para reels de hostelería.

Compara un reel (generado o montado) con los valores de un rodaje real de comida:
cortes, duración de plano, parte del encuadre en foco, movimiento e irregularidad
de cámara, rango tonal, nitidez y audio. Es la revisión automática de las puertas
D y E (skill `director`), descrita en `directoria/references/hosteleria/08-firma-de-rodaje-real.md`.

Uso:
    python3 medir_realismo.py reel.mp4 [referencia.mp4] [--ffmpeg RUTA]

Requisitos: numpy, Pillow y un ffmpeg (el de Remotion sirve:
node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg, con LD_LIBRARY_PATH en esa carpeta).
Las cifras son de diagnóstico, no una nota de calidad: un plano puede incumplir un umbral
a propósito si la lista de planos lo justifica.
"""
import argparse
import math
import os
import shutil
import struct
import subprocess
import sys
import tempfile
import wave

import numpy as np
from PIL import Image, ImageFilter

FPS = 10          # fotogramas por segundo analizados
ANCHO = 270       # ancho de análisis en píxeles
UMBRAL_CORTE = 40  # diferencia media de luminancia que se considera corte

# Valores de referencia medidos el 2026-09-25 en un reel de comida rodado (ver pruebas/).
OBJETIVO = {
    "plano_medio_s": (0.4, 1.2),
    "enfoque_pct": (8, 25),       # parte del encuadre nítida en planos cercanos
    "movimiento_px": (1.0, 9.0),  # desplazamiento medio de cámara por fotograma analizado
    "negro_p1": (0, 3.5),
    "blanco_p99": (220, 255),
    "audio_rms": (1500, 20000),
}


def ffmpeg_bin(arg):
    if arg:
        return arg
    local = os.path.join(os.path.dirname(__file__), "..", "..", "..", "promo", "node_modules",
                         "@remotion", "compositor-linux-x64-gnu", "ffmpeg")
    if os.path.exists(local):
        os.environ["LD_LIBRARY_PATH"] = os.path.dirname(os.path.abspath(local))
        return os.path.abspath(local)
    return shutil.which("ffmpeg") or sys.exit("No encuentro ffmpeg; pásalo con --ffmpeg")


def extraer(video, ff, tmp):
    subprocess.run([ff, "-y", "-loglevel", "error", "-i", video, "-vf", f"scale={ANCHO}:-2",
                    "-r", str(FPS), os.path.join(tmp, "%05d.png")], check=True)
    wav = os.path.join(tmp, "a.wav")
    r = subprocess.run([ff, "-y", "-loglevel", "error", "-i", video, "-vn", "-ac", "1", "-ar", "16000",
                        "-c:a", "pcm_s16le", wav])
    fotos = sorted(f for f in os.listdir(tmp) if f.endswith(".png"))
    return [os.path.join(tmp, f) for f in fotos], (wav if r.returncode == 0 else None)


def rms_audio(wav):
    if not wav or not os.path.exists(wav):
        return 0.0
    w = wave.open(wav)
    datos = w.readframes(w.getnframes())
    if not datos:
        return 0.0
    s = np.frombuffer(datos, dtype=np.int16).astype(float)
    return float(math.sqrt((s ** 2).mean()))


def laplaciano(g):
    return g[1:-1, 1:-1] * 4 - g[:-2, 1:-1] - g[2:, 1:-1] - g[1:-1, :-2] - g[1:-1, 2:]


def enfoque(g, b=16):
    """Porcentaje de bloques cuya energía de detalle supera el 35 % del máximo del fotograma."""
    lap = np.abs(laplaciano(g))
    h, w = lap.shape
    e = np.array([[lap[i:i + b, j:j + b].mean() for j in range(0, w - b, b)] for i in range(0, h - b, b)])
    return float((e > 0.35 * np.percentile(e, 98)).mean() * 100)


def desplazamiento(a, b):
    fa, fb = np.fft.fft2(a - a.mean()), np.fft.fft2(b - b.mean())
    r = fa * np.conj(fb)
    r /= np.abs(r) + 1e-9
    c = np.abs(np.fft.ifft2(r))
    y, x = np.unravel_index(c.argmax(), c.shape)
    h, w = a.shape
    y = y - h if y > h / 2 else y
    x = x - w if x > w / 2 else x
    return math.hypot(x, y)


def analizar(video, ff):
    with tempfile.TemporaryDirectory() as tmp:
        fotos, wav = extraer(video, ff, tmp)
        rgb = [np.asarray(Image.open(p).convert("RGB")).astype(float) for p in fotos]
        audio = rms_audio(wav)
    gris = [x.mean(2) for x in rgb]

    cortes = [0]
    transiciones = []
    for i in range(1, len(gris)):
        if np.abs(gris[i] - gris[i - 1]).mean() > UMBRAL_CORTE:
            cortes.append(i)
        # destello: fotograma mucho más claro que sus dos vecinos
        if 1 < i < len(gris) - 1 and gris[i].mean() > 1.25 * max(gris[i - 1].mean(), gris[i + 1].mean()):
            transiciones.append((i / FPS, "destello"))
    cortes.append(len(gris))

    planos = []
    for s, e in zip(cortes[:-1], cortes[1:]):
        seg = gris[s:e]
        if np.mean([g.mean() for g in seg]) < 8:
            planos.append(dict(ini=s / FPS, fin=e / FPS, negro=True))
            continue
        # desenfoque de transición: 2+ fotogramas seguidos con menos del 30 % de la nitidez mediana del plano
        nit = [laplaciano(g).var() for g in seg]
        med = float(np.median(nit))
        bajos = [k for k, v in enumerate(nit) if v < 0.3 * med]
        if any(b + 1 in bajos for b in bajos):
            transiciones.append(((s + bajos[0]) / FPS, "desenfoque"))
        mov = [desplazamiento(seg[k], seg[k - 1]) for k in range(1, len(seg))]
        planos.append(dict(
            ini=s / FPS, fin=e / FPS, negro=False,
            enfoque=float(np.mean([enfoque(g) for g in seg[::2]])),
            mov=float(np.mean(mov)) if mov else 0.0,
            irreg=float(np.std(mov)) if len(mov) > 2 else 0.0,
        ))

    utiles = [x for x, g in zip(rgb, gris) if g.mean() >= 8]
    tono = np.array([[np.percentile(x.mean(2), 1), np.percentile(x.mean(2), 99),
                      laplaciano(x.mean(2)).var(),
                      np.asarray(Image.fromarray(x.astype("uint8")).convert("HSV"))[..., 1].mean()]
                     for x in utiles])
    return dict(planos=planos, transiciones=transiciones, audio=audio,
                negro_p1=float(tono[:, 0].mean()), blanco_p99=float(tono[:, 1].mean()),
                nitidez=float(tono[:, 2].mean()), saturacion=float(tono[:, 3].mean()))


def marca(valor, rango):
    lo, hi = rango
    return "ok" if lo <= valor <= hi else "REVISAR"


def informe(nombre, r):
    reales = [p for p in r["planos"] if not p["negro"]]
    dur = [p["fin"] - p["ini"] for p in reales]
    medio = float(np.mean(dur)) if dur else 0
    enf = float(np.mean([p["enfoque"] for p in reales])) if reales else 0
    mov = float(np.mean([p["mov"] for p in reales])) if reales else 0
    quietos = sum(1 for p in reales if p["mov"] < 0.5)
    print(f"\n== {nombre}")
    print(f"{'inicio':>6} {'fin':>6} {'dur':>5} {'foco %':>7} {'mov px':>7} {'irreg':>6}")
    for p in r["planos"]:
        if p["negro"]:
            print(f"{p['ini']:6.1f} {p['fin']:6.1f} {p['fin'] - p['ini']:5.1f}   cartela negra")
        else:
            print(f"{p['ini']:6.1f} {p['fin']:6.1f} {p['fin'] - p['ini']:5.1f} {p['enfoque']:7.0f} {p['mov']:7.2f} {p['irreg']:6.2f}")
    print("\nResumen                      valor    objetivo        estado")
    filas = [
        ("Duración media de plano (s)", medio, "plano_medio_s"),
        ("Encuadre en foco (%)", enf, "enfoque_pct"),
        ("Movimiento de cámara (px)", mov, "movimiento_px"),
        ("Negro, percentil 1", r["negro_p1"], "negro_p1"),
        ("Blanco, percentil 99", r["blanco_p99"], "blanco_p99"),
        ("Audio, RMS", r["audio"], "audio_rms"),
    ]
    for texto, v, k in filas:
        lo, hi = OBJETIVO[k]
        print(f"  {texto:28s} {v:8.1f}   {lo:g}–{hi:g}{'':6s} {marca(v, OBJETIVO[k])}")
    print(f"  {'Planos con cámara quieta':28s} {quietos:8d}   0–2{'':9s} {'ok' if quietos <= 2 else 'REVISAR'}")
    trans = sorted(set((round(t, 1), k) for t, k in r["transiciones"]))
    print(f"  {'Transiciones (indicativo)':28s} {len(trans):8d}   0{'':11s} {'ok' if not trans else 'REVISAR'}"
          + ("  " + ", ".join(f"{k} {t:.1f}s" for t, k in trans) if trans else ""))
    print(f"  {'Nitidez media (informativo)':28s} {r['nitidez']:8.1f}")
    print(f"  {'Saturación media (inform.)':28s} {r['saturacion']:8.1f}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("videos", nargs="+", help="reel a revisar y, opcionalmente, un reel de referencia")
    ap.add_argument("--ffmpeg")
    a = ap.parse_args()
    ff = ffmpeg_bin(a.ffmpeg)
    for v in a.videos:
        informe(os.path.basename(v), analizar(v, ff))


if __name__ == "__main__":
    main()
