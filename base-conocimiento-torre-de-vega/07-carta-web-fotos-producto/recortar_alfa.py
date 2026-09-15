# -*- coding: utf-8 -*-
"""Recorta a alfa real las imagenes de carta_web/raw para webs de fondo OSCURO.

Por que existe (2026-09-14)
---------------------------
La carta de `web-referencia` va sobre fondo oscuro (#17201c y variantes por
categoria). Ahi `mix-blend-mode: multiply` no sirve (ennegrece la foto), asi que
hace falta transparencia de verdad, como los *-recorte-original-v1.png que ya
usa esa web.

Se usa rembg con un modelo de segmentacion GENERAL (no de comida), que trata
plato + comida + mano como un solo objeto. El recorte neuronal de Higgsfield
(`remove_background`) se descarto porque dejaba solo la comida.

Uso (desde el venv con rembg instalado):
    python recortar_alfa.py [modelo]
Salida: alfa/<id>.png (RGBA, recortado al sujeto con un 3% de aire, lado max 900 px)
"""
import os
import sys
import numpy as np
from PIL import Image
from rembg import new_session, remove

BASE = os.path.dirname(os.path.abspath(__file__))
# ORIGEN=raw_fondo_oscuro para recortar las regeneradas sobre carbon (platos blancos)
SRC = os.path.join(BASE, os.environ.get("ORIGEN", "raw"))
OUT = os.path.join(BASE, "alfa")
MODELO = sys.argv[1] if len(sys.argv) > 1 else "isnet-general-use"
LADO_MAX = 900
FEATHER = 0.05   # fraccion del lado en la que el alfa se desvanece junto al borde de la foto


def main(solo=None):
    os.makedirs(OUT, exist_ok=True)
    sesion = new_session(MODELO)
    for f in sorted(os.listdir(SRC)):
        if not f.lower().endswith(".png"):
            continue
        base = f[:-4]
        if solo and base not in solo:
            continue
        im = Image.open(os.path.join(SRC, f)).convert("RGB")
        rgba = remove(im, session=sesion, post_process_mask=True)

        # Las manos entran desde fuera del encuadre. Recortadas, la muneca acabaria
        # en un corte recto; se difumina el alfa en la franja pegada al borde de la
        # foto para que la mano se desvanezca en vez de terminar en seco.
        arr = np.asarray(rgba).copy()
        h, w = arr.shape[:2]
        franja = max(1, int(min(h, w) * FEATHER))
        yy, xx = np.mgrid[0:h, 0:w]
        dist_borde = np.minimum.reduce([yy, xx, h - 1 - yy, w - 1 - xx])
        rampa = np.clip(dist_borde / franja, 0, 1)
        arr[:, :, 3] = (arr[:, :, 3] * rampa).astype(np.uint8)
        rgba = Image.fromarray(arr, "RGBA")
        a = arr[:, :, 3]
        caja = Image.fromarray((a > 8).astype(np.uint8) * 255).getbbox()
        if caja:
            m = int(max(im.size) * 0.03)
            caja = (max(0, caja[0] - m), max(0, caja[1] - m),
                    min(im.width, caja[2] + m), min(im.height, caja[3] + m))
            rgba = rgba.crop(caja)
        rgba.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
        rgba.save(os.path.join(OUT, base + ".png"), optimize=True)
        print("%-34s %dx%d  opaco %.0f%%" % (base, rgba.width, rgba.height,
              100 * (np.asarray(rgba)[:, :, 3] > 250).mean()))


if __name__ == "__main__":
    solo = set(os.environ.get("SOLO", "").split(",")) - {""}
    main(solo or None)
