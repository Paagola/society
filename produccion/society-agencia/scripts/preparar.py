"""Recursos de «Tu agencia con IA» (28/09/2026): imágenes a su tamaño en promo/public/agencia/ y medidas
automáticas en promo/src/agencia/medidas.json (pantalla del móvil de papel y módulo oscuro del QR).
Uso: python produccion/society-agencia/scripts/preparar.py  (desde la raíz del repo)
"""
import json
import os

import numpy as np
import segno
from PIL import Image, ImageOps

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..'))
IMG = os.path.join(RAIZ, 'produccion/society-agencia/imagen')
PUB = os.path.join(RAIZ, 'promo/public/agencia')
SRC = os.path.join(RAIZ, 'promo/src/agencia')
QR_TEXTO = 'Society · tu agencia con IA'  # texto, no una web: el QR no lleva a ningún sitio inventado


def cubre(ruta, w, h, salida, calidad=90, centro=(0.5, 0.5)):
    im = Image.open(ruta).convert('RGB')
    ImageOps.fit(im, (w, h), Image.LANCZOS, centering=centro).save(os.path.join(PUB, salida), quality=calidad)


def main():
    os.makedirs(PUB, exist_ok=True)
    os.makedirs(SRC, exist_ok=True)
    cubre(f'{IMG}/mesa.png', 1080, 1920, 'mesa.jpg')
    cubre(f'{IMG}/collage.png', 1400, 2476, 'collage.jpg', 85)
    for i in (1, 2):
        cubre(f'{IMG}/lamina-{i}.png', 1080, 1350, f'lamina-{i}.jpg')
    # la tercera la eligió Víctor (28/09): su generación del 25/09 (hf_20260925_124628_d68d1d5f…)
    cubre(f'{IMG}/lamina-3-victor.png', 1080, 1350, 'lamina-3.jpg', centro=(0.5, 0.62))
    cubre(f'{IMG}/pov-movil.png', 1080, 1920, 'pov-movil.jpg')
    for n in ('post1', 'post2', 'post3', 'post4', 'grid'):
        cubre(f'{RAIZ}/posts/{n}.png', 640, 800, f'{n}.jpg')
    cubre(f'{RAIZ}/promo/public/caso/real-pizza.jpg', 800, 1000, 'pizza.jpg')
    cubre(f'{RAIZ}/promo/public/caso/real-sala.jpg', 800, 1000, 'sala.jpg')
    cubre(f'{RAIZ}/promo/public/anuncio/foto-movil-pizza.jpg', 1000, 1000, 'foto-movil.jpg')

    # mano con el móvil: a 820 px de ancho; la pantalla es el rectángulo casi negro más grande
    mano = Image.open(f'{IMG}/mano-movil.png').convert('RGBA')
    k = 820 / mano.width
    mano = mano.resize((820, round(mano.height * k)), Image.LANCZOS)
    mano.save(os.path.join(PUB, 'mano-movil.png'), optimize=True)
    a = np.asarray(mano, np.float32)
    negro = (a[..., 3] > 200) & (a[..., :3].max(-1) < 45)
    filas, cols = np.nonzero(negro.sum(1) > negro.shape[1] * 0.12)[0], np.nonzero(negro.sum(0) > negro.shape[0] * 0.12)[0]
    pantalla = {'x': int(cols.min()), 'y': int(filas.min()), 'w': int(cols.max() - cols.min()), 'h': int(filas.max() - filas.min())}

    # QR: imagen y el módulo oscuro más céntrico rodeado de oscuros (ahí entra la cámara)
    q = segno.make(QR_TEXTO, error='m')
    esc = 20
    q.save(os.path.join(PUB, 'qr.png'), scale=esc, border=0, dark='#141414', light='#ECE8DC')
    m = np.array([[bool(v) for v in fila] for fila in q.matrix])
    n = m.shape[0]
    mejor = None
    for r in range(1, n - 1):
        for c in range(1, n - 1):
            if m[r - 1:r + 2, c - 1:c + 2].all():
                d = (r - n / 2) ** 2 + (c - n / 2) ** 2
                if mejor is None or d < mejor[0]:
                    mejor = (d, r, c)
    _, r, c = mejor
    medidas = {'mano': {'w': mano.width, 'h': mano.height, 'pantalla': pantalla},
               'qr': {'lado': n * esc, 'modulos': n, 'oscuro': {'x': (c + 0.5) / n, 'y': (r + 0.5) / n},
                      'matriz': [''.join('1' if v else '0' for v in fila) for fila in m]}}
    with open(os.path.join(SRC, 'medidas.json'), 'w', encoding='utf-8') as f:
        json.dump(medidas, f, indent=1)
    print(json.dumps(medidas))


if __name__ == '__main__':
    main()
