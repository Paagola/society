"""Capas de imagen y vídeo de «La pizza que nadie vio» (las que no son papel generado).

  rucula()   plano 1: la rúcula del reel v5 en 4K a cámara lenta (interpolada a 96 fps, 54 fotogramas) y
             la capa de hojas recortada por color, en la franja del «DIEZ» (pizza/a1/base, pizza/a1/hojas)
  persiana() plano 4: persiana.jpg en tres piezas rasgadas que encajan exactas (interior, chapa sin las
             manos, persona) (pizza/persiana/*.png)
  hueco()    plano 3: la mano con el móvil con la pantalla vacía, para poner la carta debajo
  paella()   plano 9: la paella del reel a cámara lenta (72 fps interpolados) para la historia
Uso: python produccion/society-anuncio/scripts/capas.py [rucula|persiana|hueco|paella]  (desde la raíz)
El máster 4K del reel (v5_4k.mp4) no está en el repo: ver produccion/da-tonino/reel-v4/montaje/v6-sonido/montar_v6.sh.
"""
import os
import subprocess
import sys
import tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from rasgado import ruido

PUB = 'promo/public/pizza'
V5 = 'produccion/da-tonino/reel-v4/montaje/v6-sonido/v5_4k.mp4'
INTERP = 'minterpolate=fps={fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1'
CREMA = np.array([236, 231, 219], np.float32)


def _hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx = a.max(-1)
    d = mx - a.min(-1) + 1e-6
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    return h, d / (mx + 1e-6), mx


def rucula():
    os.makedirs(f'{PUB}/a1/base', exist_ok=True)
    os.makedirs(f'{PUB}/a1/hojas', exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        vf = f"trim=end_frame=16,setpts=PTS-STARTPTS,scale=1080:1920:flags=lanczos,{INTERP.format(fps=96)}"
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', V5, '-vf', vf, f'{tmp}/%03d.png'], check=True)
        y0, y1 = 400, 1060  # franja del «DIEZ» / «10»: solo ahí hacen falta las hojas por delante
        for k in range(54):
            im = Image.open(f'{tmp}/{k + 1:03d}.png').convert('RGB')
            im.save(f'{PUB}/a1/base/{k:03d}.jpg', quality=90)
            a = np.asarray(im, np.float32)[y0:y1] / 255
            h, s, v = _hsv(a)
            # verde de la rúcula: tono 65-165 °, saturada y con luz
            m = np.clip(1 - np.maximum(0, np.abs(h - 108) - 38) / 14, 0, 1) * np.clip((s - 0.22) / 0.18, 0, 1) * np.clip((v - 0.10) / 0.10, 0, 1)
            rgba = np.dstack([np.asarray(im)[y0:y1], (m * 255).astype(np.uint8)])
            rgba[rgba[..., 3] < 2, :3] = 0
            Image.fromarray(rgba).save(f'{PUB}/a1/hojas/{k:03d}.png', optimize=True)


def _dist_signada(mask, n=40):
    im = Image.fromarray((mask * 255).astype(np.uint8))
    d = np.zeros(mask.shape, np.float32)
    e = im
    for _ in range(n):
        e = e.filter(ImageFilter.MinFilter(3))
        d += np.asarray(e, np.float32) / 255
    o = im
    for _ in range(n):
        o = o.filter(ImageFilter.MaxFilter(3))
        d -= 1 - np.asarray(o, np.float32) / 255
    return d


def persiana():
    os.makedirs(f'{PUB}/persiana', exist_ok=True)
    A = np.asarray(Image.open('promo/public/anuncio/persiana.jpg').convert('RGB')).astype(np.float32)
    H, W = A.shape[:2]
    n1 = ruido(H, W, 3, 6)
    n2 = ruido(H, W, 4, 1.5)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    abajo = lambda x: 1880 - 0.2 * x  # borde de abajo de la barra, medido sobre una rejilla
    # manos y brazos con margen de tijera
    pers = [(850, 1470), (900, 1405), (985, 1385), (1085, 1395), (1180, 1420), (1245, 1470), (1285, 1545), (1536, 1540), (1536, 2240),
            (1390, 2210), (1240, 2130), (1090, 2050), (985, 1965), (945, 1860), (905, 1760), (865, 1650)]
    m = Image.new('L', (W, H), 0)
    ImageDraw.Draw(m).polygon(pers, fill=255)
    dp = _dist_signada(np.asarray(m, np.float32) / 255) + n1 * 5 + n2 * 1.2

    def pieza(img, d, nombre):
        alfa = np.clip(d + 0.5, 0, 1)
        f = np.clip(1 - d / 6.0, 0, 1) * (d > 0) * np.clip(0.75 + 0.35 * n2, 0, 1)
        rgb = img * (1 - f[..., None]) + CREMA * f[..., None]
        a = np.dstack([np.clip(rgb, 0, 255), alfa * 255]).astype(np.uint8)
        a[a[..., 3] == 0, :3] = 0
        Image.fromarray(a).resize((1080, round(H * 1080 / W)), Image.LANCZOS).save(f'{PUB}/persiana/{nombre}.png', optimize=True)

    # interior: de la barra hacia abajo, sin el bloque de la persona
    pieza(A, np.minimum((yy - (abajo(xx) - 14)) + n1 * 6 + n2 * 1.2, -dp), 'interior')
    # chapa: de la barra hacia arriba, con las manos borradas clonando la barra 480 px a la izquierda
    clon = A[yy.astype(int), np.clip(xx - 480, 0, W - 1).astype(int)]
    zona = (xx > 830) & (xx < 1310) & (yy > 1360) & (yy < abajo(xx) + 25)
    suav = np.asarray(Image.fromarray((zona * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(18)), np.float32) / 255
    pieza(A * (1 - suav[..., None]) + clon * suav[..., None], ((abajo(xx) + 14) - yy) + n1 * 6 + n2 * 1.2, 'chapa')
    pieza(A, dp, 'persona')


def hueco():
    im = Image.open('promo/public/anuncio/mano-movil.png').convert('RGBA')
    W, H = im.size
    # pantalla: rectángulo redondeado de 300 x 656 centrado en (242,5; 368,5) y girado 1,9 ° en sentido horario
    cx, cy, w, h, ang, rad, k = 242.5, 368.5, 300, 656, 1.9, 38, 4
    aux = Image.new('L', (w * k + 8, h * k + 8), 0)
    ImageDraw.Draw(aux).rounded_rectangle([4, 4, 4 + w * k, 4 + h * k], radius=rad * k, fill=255)
    aux = aux.rotate(-ang, resample=Image.BICUBIC, expand=True)
    m = Image.new('L', (W * k, H * k), 0)
    m.paste(aux, (int(cx * k - aux.width / 2), int(cy * k - aux.height / 2)), aux)
    m = np.asarray(m.resize((W, H), Image.LANCZOS), np.float32) / 255
    a = np.array(im)
    a[..., 3] = (a[..., 3] * (1 - m)).astype(np.uint8)
    Image.fromarray(a).save(f'{PUB}/mano-movil-hueco.png', optimize=True)


def paella():
    os.makedirs(f'{PUB}/paella', exist_ok=True)
    vf = f"trim=end_frame=24,setpts=PTS-STARTPTS,scale=1080:1920:flags=lanczos,{INTERP.format(fps=72)},scale=740:1316:flags=lanczos"
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '7.0', '-i', V5, '-vf', vf, '-q:v', '3', f'{PUB}/paella/%03d.jpg'], check=True)


if __name__ == '__main__':
    pasos = {'rucula': rucula, 'persiana': persiana, 'hueco': hueco, 'paella': paella}
    for n in sys.argv[1:] or pasos:
        pasos[n]()
        print('ok', n)
