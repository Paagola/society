# -*- coding: utf-8 -*-
"""Recorta a alfa las imagenes regeneradas sobre fondo carbon (raw_fondo_oscuro/).

Por que (2026-09-14)
--------------------
Los platos blancos sobre ciclorama blanco no se pueden separar: ni el flood-fill
ni un modelo neuronal (isnet-general-use, ni `remove_background` de Higgsfield)
distinguen porcelana blanca de fondo blanco, y ademas el modelo neuronal trata la
comida como sujeto y el plato como fondo.

Se regeneraron esos platos cambiando SOLO el fondo a carbon mate uniforme. Con
ese contraste no hace falta ningun modelo: se inunda desde los bordes todo lo que
se parece al color del fondo (medido en las esquinas) y lo demas es sujeto. Un
plato blanco, una tabla clara o una mano nunca se confunden con el carbon, y la
comida oscura queda dentro del plato, donde la inundacion no llega.

Salida: alfa/<id>.png (RGBA) + alfa/<id>.webp, recortado al sujeto, lado max 900 px.
"""
import os
import numpy as np
from scipy import ndimage
from PIL import Image, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "raw_fondo_oscuro")
OUT = os.path.join(BASE, "alfa")

LUM_DURO = 88    # luminancia <= esto (y color neutro, conectado al borde) -> fondo seguro
LUM_BLANDO = 125 # entre ambos -> alfa proporcional (borde antialias / degradado del carbon)
CROMA_MAX = 26   # max(R,G,B)-min(R,G,B); por encima es color (piel, comida), nunca fondo
FEATHER = 0.05   # franja junto al borde de la foto donde el alfa se desvanece (munecas)
LADO_MAX = 900


def recortar(path):
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im).astype(np.float32)
    h, w = arr.shape[:2]

    # El carbon generado no siempre es uniforme: trae degradado y viñeteado (esquinas
    # de #0b0c0b a #4b4b4d en el mismo fondo). Un solo color de referencia deja cajas
    # grises semitransparentes. Se clasifica por LUMINANCIA baja + color NEUTRO, que
    # tolera el degradado: el plato blanco es claro y la mano tiene croma.
    lum = arr @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    croma = arr.max(axis=2) - arr.min(axis=2)
    candidato = (lum <= LUM_BLANDO) & (croma <= CROMA_MAX)
    etiquetas, _ = ndimage.label(candidato)
    borde = np.concatenate([etiquetas[0, :], etiquetas[-1, :], etiquetas[:, 0], etiquetas[:, -1]])
    es_fondo = np.isin(etiquetas, np.unique(borde[borde > 0]))

    alpha = np.ones((h, w), np.float32)
    rampa = np.clip((lum - LUM_DURO) / (LUM_BLANDO - LUM_DURO), 0, 1)
    alpha[es_fondo] = rampa[es_fondo]

    # rellenar huecos interiores (reflejos oscuros dentro del plato no son fondo)
    solido = ndimage.binary_fill_holes(alpha > 0.5)
    alpha = np.where(solido & (alpha < 0.5), 1.0, alpha)

    # suavizar el contorno 1 px para evitar dientes de sierra
    a8 = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))
    alpha = np.asarray(a8).astype(np.float32) / 255

    # desvanecer junto al borde de la foto (manos que entran desde fuera)
    franja = max(1, int(min(h, w) * FEATHER))
    yy, xx = np.mgrid[0:h, 0:w]
    dist_borde = np.minimum.reduce([yy, xx, h - 1 - yy, w - 1 - xx])
    alpha *= np.clip(dist_borde / franja, 0, 1)

    rgba = np.dstack([arr.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    out = Image.fromarray(rgba, "RGBA")
    caja = Image.fromarray(((alpha > 0.03) * 255).astype(np.uint8)).getbbox()
    if caja:
        m = int(max(h, w) * 0.03)
        out = out.crop((max(0, caja[0] - m), max(0, caja[1] - m),
                        min(w, caja[2] + m), min(h, caja[3] + m)))
    out.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    solo = set(os.environ.get("SOLO", "").split(",")) - {""}
    for f in sorted(os.listdir(SRC)):
        if not f.lower().endswith(".png"):
            continue
        base = f[:-4]
        if solo and base not in solo:
            continue
        out = recortar(os.path.join(SRC, f))
        out.save(os.path.join(OUT, base + ".png"), optimize=True)
        a = np.asarray(out)[:, :, 3]
        print("%-34s %dx%d  opaco %.0f%%" % (base, out.width, out.height, 100 * (a > 250).mean()))


if __name__ == "__main__":
    main()
