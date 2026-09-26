"""Foto del móvil impresa en papel mate y rasgada: la hoja que se arruga (plano 2) y se abre (plano 5).

Salidas (promo/public/pizza/): foto-recorte.png (cara), foto-dorso.png (dorso), papel-normal.png
(relieve), y promo/src/pizza/contornos.ts con el contorno rasgado que usa la malla 3D.
Uso: python produccion/society-anuncio/scripts/foto_papel.py  (desde la raíz del repo)
"""
import json
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
from rasgado import CREMA, contorno_rasgado, ruido

PUB = 'promo/public/pizza'
W, H = 760, 570          # tamaño de la hoja en pantalla
K = 2                    # la textura va al doble


def relieve():
    """Relieve de papel en mosaico (fibras finas, grano medio y fibras alargadas) y su mapa de normales."""
    N = 1024
    r = np.random.default_rng(7)
    fx = np.fft.fftfreq(N)[None, :]
    fy = np.fft.fftfreq(N)[:, None]
    g = lambda a, sx, sy: np.real(np.fft.ifft2(np.fft.fft2(a) * np.exp(-2 * np.pi**2 * ((sx * fx) ** 2 + (sy * fy) ** 2))))
    n1 = g(r.standard_normal((N, N)), 0.8, 0.8)
    n2 = g(r.standard_normal((N, N)), 3.0, 3.0)
    f = g(r.standard_normal((N, N)), 6.0, 0.7)
    alt = n1 / n1.std() * 0.55 + n2 / n2.std() * 0.35 + f / f.std() * 0.25
    alt = (alt - alt.min()) / (alt.max() - alt.min())
    gy, gx = np.gradient(alt * 3.0)
    nz = np.ones_like(alt)
    nrm = np.sqrt(gx**2 + gy**2 + nz**2)
    nm = np.stack([(-gx / nrm + 1) / 2, (gy / nrm + 1) / 2, (nz / nrm + 1) / 2], -1)
    Image.fromarray((nm * 255).astype(np.uint8)).save(f'{PUB}/papel-normal.png')
    return alt


def main():
    alt = relieve()
    TW, TH = W * K, H * K
    foto = Image.open('promo/public/anuncio/foto-movil-pizza.jpg').convert('RGB')
    img = ImageEnhance.Contrast(foto.resize((TW, TH), Image.LANCZOS)).enhance(0.98)
    grano = np.asarray(Image.fromarray((alt * 255).astype(np.uint8)).resize((TW, TH)), np.float32) / 255
    # Cara: la foto tal cual, impresa (negros apenas levantados) y un grano de papel muy fino. Más grano o
    # más relieve ensucia la foto con manchas y ya no se lee como impresa (revisión del 26/09/2026).
    cara = np.asarray(img, np.float32) * 0.98 + 4
    cara = cara * (0.975 + 0.05 * grano[..., None])
    # Dorso: papel crudo con la foto transparentándose muy poco
    lum = np.asarray(img.convert('L').filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
    dorso = np.array([228, 223, 212], np.float32)[None, None, :] * (1 - 0.07 * (1 - lum[..., None]))
    dorso = dorso * (0.92 + 0.13 * grano[..., None])
    # Contorno rasgado (en la hoja) y franja de fibra clara pegada al borde, por dentro
    pol = contorno_rasgado(W, H, seed=5, amp=4.5, paso=3, margen=9)
    m = Image.new('L', (TW, TH), 0)
    ImageDraw.Draw(m).polygon([(x * K, y * K) for x, y in pol], fill=255)
    dist = np.zeros((TH, TW), np.float32)
    e = m
    for _ in range(20):
        e = e.filter(ImageFilter.MinFilter(3))
        dist += np.asarray(e, np.float32) / 255
    n2 = ruido(TH, TW, 9, 1.5 * K)
    n1 = ruido(TH, TW, 10, 5 * K)
    # ancho de la franja entre 2,5 y 8 px: sin tope, el ruido la metía en el interior y manchaba la foto
    ancho = np.clip(5.5 + 3.0 * n1, 2.5, 8.0) * K
    f = np.clip(1 - dist / np.maximum(ancho, 1.5 * K), 0, 1) * (np.asarray(m) > 0) * np.clip(0.75 + 0.35 * n2, 0, 1)
    for nombre, a in (('foto-recorte', cara), ('foto-dorso', dorso)):
        out = a * (1 - f[..., None]) + CREMA * f[..., None]
        Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(f'{PUB}/{nombre}.png')
    # Contorno para la malla: centrado y con y hacia arriba
    pts = [[round(x - W / 2, 2), round(H / 2 - y, 2)] for x, y in pol]
    with open('promo/src/pizza/contornos.ts', 'w', encoding='utf-8') as fh:
        fh.write('// Generado por produccion/society-anuncio/scripts/foto_papel.py: no editar a mano.\n')
        fh.write('// Contorno rasgado de la foto del móvil (hoja de 760 x 570, centrada, y hacia arriba).\n')
        fh.write(f'export const CONTORNO_FOTO: [number, number][] = {json.dumps(pts, separators=(",", ":"))};\n')
    print('ok', len(pts), 'puntos')


if __name__ == '__main__':
    main()
