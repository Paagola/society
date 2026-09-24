"""Convierte las fotos generadas en assets de las pantallas: semitono, colores de marca, recortes y papel."""
import math
import random
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

AQUI = Path(__file__).parent
ORIG = AQUI / "original"
OUT = AQUI / "listos"
OUT.mkdir(exist_ok=True)

TINTA = (20, 20, 20)
PAPEL = (236, 232, 220)


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def semitono(img, ancho, celda=7, contraste=1.5, brillo=1.0, angulo=45, oscuro=TINTA, claro=PAPEL, grano=0.08, gamma=1.0):
    """Trama de puntos a 45 grados + grano de imprenta. Conserva el canal alfa si lo hay."""
    img = img.convert("RGBA")
    alto = round(img.height * ancho / img.width)
    img = img.resize((ancho, alto), Image.LANCZOS)
    alfa = img.getchannel("A")
    g = ImageOps.autocontrast(ImageOps.grayscale(img.convert("RGB")), cutoff=1, mask=alfa)
    g = g.point(lambda v: 255 * (v / 255) ** gamma)  # gamma < 1 abre las sombras
    g = ImageEnhance.Brightness(g).enhance(brillo)
    g = ImageEnhance.Contrast(g).enhance(contraste)
    g = np.asarray(g).astype(np.float32) / 255.0
    h, w = g.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    a = math.radians(angulo)
    u = (xx * math.cos(a) + yy * math.sin(a)) / celda
    v = (-xx * math.sin(a) + yy * math.cos(a)) / celda
    # distancia al centro de la celda (0 en el centro, ~0.7 en la esquina)
    d = np.sqrt((u - np.floor(u) - 0.5) ** 2 + (v - np.floor(v) - 0.5) ** 2)
    radio = np.sqrt(1.0 - g) * 0.72  # más oscuro, punto más grande
    tinta = (d < radio).astype(np.float32)
    # suaviza el borde del punto y mezcla un poco de tono continuo para que no quede plano
    tinta = np.clip(tinta * 0.82 + (1.0 - g) * 0.18, 0, 1)
    ruido = np.random.default_rng(7).normal(0, grano, (h, w)).astype(np.float32)
    tinta = np.clip(tinta + ruido, 0, 1)
    o, c = np.array(oscuro, np.float32), np.array(claro, np.float32)
    rgb = c[None, None, :] * (1 - tinta[..., None]) + o[None, None, :] * tinta[..., None]
    out = Image.fromarray(rgb.astype(np.uint8)).convert("RGBA")
    out.putalpha(alfa)
    return out


def rasgado(img, amplitud=5, paso=6, semilla=1):
    """Borde de papel rasgado: recorta el rectángulo con un contorno irregular."""
    rnd = random.Random(semilla)
    w, h = img.size
    mascara = Image.new("L", (w, h), 0)
    pts = []
    for x in range(0, w + paso, paso):
        pts.append((min(x, w), rnd.uniform(0, amplitud)))
    for y in range(0, h + paso, paso):
        pts.append((w - rnd.uniform(0, amplitud), min(y, h)))
    for x in range(w, -paso, -paso):
        pts.append((max(x, 0), h - rnd.uniform(0, amplitud)))
    for y in range(h, -paso, -paso):
        pts.append((rnd.uniform(0, amplitud), max(y, 0)))
    from PIL import ImageDraw
    ImageDraw.Draw(mascara).polygon(pts, fill=255)
    out = img.convert("RGBA")
    out.putalpha(Image.fromarray(np.minimum(np.asarray(out.getchannel("A")), np.asarray(mascara))))
    return out


def recorte(img, ratio, cy=0.5, cx=0.5):
    """Recorta al ratio ancho/alto indicado alrededor del punto (cx, cy)."""
    w, h = img.size
    if w / h > ratio:
        nw = round(h * ratio)
        x0 = int((w - nw) * cx)
        return img.crop((x0, 0, x0 + nw, h))
    nh = round(w / ratio)
    y0 = int((h - nh) * cy)
    return img.crop((0, y0, w, y0 + nh))


def guardar(img, nombre):
    img.save(OUT / nombre, optimize=True)
    print(nombre, img.size)


def main():
    abre = lambda n: Image.open(ORIG / n)

    # Papel arrugado del fondo (2x de 390x844) y variante para el modo oscuro.
    papel = recorte(abre("papel.png").convert("RGB"), 390 / 844).resize((780, 1688), Image.LANCZOS)
    arr = np.asarray(papel).astype(np.float32)
    lum = arr.mean(axis=2, keepdims=True)
    lum = (lum - lum.mean()) * 1.6  # acentúa las arrugas
    base = np.array(PAPEL, np.float32)[None, None, :]
    guardar(Image.fromarray(np.clip(base + lum, 0, 255).astype(np.uint8)), "papel.png")
    ruido = np.random.default_rng(3).normal(0, 5, (1688, 780, 1)).astype(np.float32)
    oscuro = np.array(TINTA, np.float32)[None, None, :] + lum * 0.25 + ruido
    guardar(Image.fromarray(np.clip(oscuro, 0, 255).astype(np.uint8)), "papel-oscuro.png")

    # Pantalla 1: mano con copa, recorte sin fondo, claros en papel.
    mano = abre("mano-copa.png")
    mano = mano.crop(mano.getbbox())
    guardar(semitono(mano, 760, celda=6, contraste=1.2, gamma=0.85), "mano-copa.png")

    # Pantalla 2: tres fotos de tarjeta con borde rasgado.
    bar = recorte(abre("bar-esquina.png"), 1.1, cy=0.35)
    guardar(rasgado(semitono(bar, 360, celda=5, contraste=1.25, gamma=0.55), semilla=2), "bar-esquina.png")
    movil = recorte(abre("movil-mano.png"), 1.15, cy=0.45, cx=0.3)
    guardar(rasgado(semitono(movil, 300, celda=5, contraste=1.1, gamma=0.38, brillo=1.1), semilla=3), "movil-mano.png")
    coctel = recorte(abre("coctel.png"), 1.15, cy=0.4)
    guardar(rasgado(semitono(coctel, 300, celda=5, contraste=1.1, gamma=0.4, brillo=1.1), semilla=4), "coctel.png")

    # Alcachofas: foto a color, versión en trama y plato recortado.
    color = abre("alcachofas-color.png").convert("RGB")
    c2 = recorte(color, 290 / 300, cy=0.6)
    w, h = c2.size
    c2 = c2.crop((int(w * .12), int(h * .2), int(w * .88), int(h * .2) + int(w * .76 * 300 / 290)))
    guardar(c2.resize((580, 600), Image.LANCZOS), "alcachofas-color.png")
    trama = recorte(color, 620 / 300, cy=0.62)
    guardar(semitono(trama, 640, celda=5, contraste=1.25, gamma=0.6), "alcachofas-trama.png")
    plato = abre("plato-alcachofas.png")
    plato = plato.crop(plato.getbbox())
    guardar(semitono(plato, 720, celda=5, contraste=1.2, gamma=0.7), "plato-trama.png")
    w, h = plato.size
    cerca = plato.crop((int(w * .1), int(h * .05), int(w * .9), int(h * .05) + int(w * .8 * 163 / 350)))
    fondo = Image.new("RGBA", cerca.size, (70, 66, 60, 255))
    fondo.alpha_composite(cerca)
    guardar(semitono(fondo, 700, celda=5, contraste=1.25, gamma=0.75), "alcachofas-cerca.png")
    guardar(semitono(plato, 400, celda=4, contraste=1.2, gamma=0.7,
                     oscuro=hexrgb("#0B1466"), claro=hexrgb("#DCE2FF")), "plato-cobalto.png")

    # Pantalla 6: fachada de la taberna.
    taberna = recorte(abre("taberna.png"), 580 / 220, cy=0.45)
    guardar(semitono(taberna, 600, celda=4, contraste=1.15, gamma=0.45, brillo=1.1), "taberna.png")


if __name__ == "__main__":
    main()
