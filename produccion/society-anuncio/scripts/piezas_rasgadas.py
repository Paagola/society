"""Piezas rasgadas del anuncio «La pizza que nadie vio» (mismo rasgado que la persiana).

Salidas en promo/public/pizza/:
  mano-carta.png        mano con el móvil sobre un recorte oscuro, con el hueco de la pantalla (plano 3)
  carrusel/NN.png       láminas 01, 02, 03 y 07 del carrusel de Da Tonino, rasgadas (plano 8)
  estudio-hoja.png      la pizza con luz de estudio, hoja a sangre con el borde de arriba rasgado (plano 6)
  mascaras/*.png        máscara + fibra para rasgar en Remotion la historia, el reel y las letras
La mano del café del plano 10 va sin rasgar: es un recorte con fondo transparente (Víctor, 26/09/2026).
Uso: python produccion/society-anuncio/scripts/piezas_rasgadas.py  (desde la raíz del repo)
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rasgado import fibra_rgba, mascara_y_fibra, rasgar, ruido

PUB = 'promo/public/pizza'
os.makedirs(f'{PUB}/carrusel', exist_ok=True)
os.makedirs(f'{PUB}/mascaras', exist_ok=True)


def guarda(a, ruta):
    Image.fromarray(a).save(ruta, optimize=True)


def fondo_papel(h, w, color, seed, grano=0.1):
    g = ruido(h, w, seed, 1.2) * 0.6 + ruido(h, w, seed + 1, 5) * 0.4
    return np.clip(np.array(color, np.float32)[None, None, :] * (1 + grano * 0.25 * g[..., None]), 0, 255)


def mano_carta(escala=1.75):
    mano = Image.open('promo/public/anuncio/mano-movil.png').convert('RGBA')
    hueco = Image.open(f'{PUB}/mano-movil-hueco.png').convert('RGBA')
    W, H = round(mano.width * escala), round(mano.height * escala)
    mano_h = np.asarray(hueco.resize((W, H), Image.LANCZOS), np.float32)
    orig_a = np.asarray(mano.resize((W, H), Image.LANCZOS), np.float32)[..., 3]
    pantalla = np.clip((orig_a - mano_h[..., 3]) / 255, 0, 1)
    # Recorte oscuro con un foco suave detrás del móvil, como el recurso original de la identidad
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    r = np.hypot((xx - 0.42 * W) / W, (yy - 0.45 * H) / H)
    base = (70 - 58 * np.clip(r / 0.75, 0, 1))[..., None] * np.ones(3, np.float32)
    base = base * (1 + 0.05 * ruido(H, W, 4, 1.2)[..., None])
    a = mano_h[..., 3:4] / 255
    rgb = base * (1 - a) + mano_h[..., :3] * a
    out = rasgar(np.dstack([rgb, np.full((H, W), 255, np.float32)]), seed=21, amp=7, fibra=7)
    out[..., 3] = (out[..., 3] * (1 - pantalla)).astype(np.uint8)
    guarda(out, f'{PUB}/mano-carta.png')
    print('mano-carta', W, H)


def laminas():
    fuentes = {
        '01': 'promo/public/anuncio/lamina-01.jpg',
        '02': 'promo/public/anuncio/lamina-02.jpg',
        '03': 'pruebas/carrusel-da-tonino-2026-09-25/laminas/03.jpg',
        '07': 'pruebas/carrusel-da-tonino-2026-09-25/laminas/07.jpg',
    }
    for i, (n, ruta) in enumerate(fuentes.items()):
        im = Image.open(ruta).convert('RGB').resize((720, 900), Image.LANCZOS)
        guarda(rasgar(np.asarray(im), seed=30 + i, amp=5, fibra=5), f'{PUB}/carrusel/{n}.png')
    print('laminas', list(fuentes))


def estudio_hoja():
    im = Image.open('promo/public/anuncio/pizza-estudio.jpg').convert('RGB')
    W, H = 1080, 1990
    k = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    x0 = (im.width - W) // 2
    im = im.crop((x0, 0, x0 + W, H))
    guarda(rasgar(np.asarray(im), seed=41, amp=9, fibra=8, margen=20, lados='t'), f'{PUB}/estudio-hoja.png')
    print('estudio-hoja', W, H)


def mascara(nombre, w, h, seed, amp=6, fibra=6):
    alfa, f = mascara_y_fibra(h, w, seed=seed, amp=amp, fibra=fibra)
    m = np.zeros((h, w, 4), np.uint8)
    m[..., :3] = 255
    m[..., 3] = (alfa * 255).astype(np.uint8)
    guarda(m, f'{PUB}/mascaras/{nombre}.png')
    guarda(fibra_rgba(alfa, f), f'{PUB}/mascaras/{nombre}-fibra.png')


def mascaras():
    mascara('historia', 740, 1316, 61)
    mascara('reel', 1000, 1776, 62, amp=7, fibra=7)
    # Letras de la firma: una pieza por letra, de tamaños distintos (se estiran a su caja en Remotion)
    for i, (w, h) in enumerate([(250, 330), (210, 250), (200, 260), (140, 330), (220, 260), (190, 330), (220, 350)]):
        mascara(f'letra-{i}', w, h, 70 + i, amp=4.5, fibra=5)
    print('mascaras')


if __name__ == '__main__':
    mano_carta()
    laminas()
    estudio_hoja()
    mascaras()
