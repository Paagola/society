"""Recursos comunes de los vídeos de papel (se ejecuta una vez; volver a ejecutarlo no rompe nada).

  promo/public/papel/fondos/{papel,cobalto,tinta}.jpg   hojas de fondo con grano
  promo/public/papel/mascaras/tira-0..5(-fibra).png     tiras rasgadas para títulos y transiciones
  promo/public/papel/mascaras/hoja(-fibra).png          hoja entera rasgada arriba y abajo (transición)
  promo/public/papel/recursos/<nombre>.png              recursos gráficos de la identidad, ya recortados
Uso: python skills/papel-stopmotion/scripts/recursos.py
"""
import os
import sys

import numpy as np
from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, '../../..'))
sys.path.insert(0, AQUI)
from papel_lib import fibra_rgba, grano, mascara_y_fibra, ruido  # noqa: E402

PUB = os.path.join(RAIZ, 'promo/public/papel')
IDENT = os.path.join(RAIZ, 'society-identidad-editorial/recursos-graficos')
COLORES = {'papel': (236, 232, 220), 'cobalto': (36, 64, 224), 'tinta': (20, 20, 20)}
RECURSOS = {
    'destello': '01-destello-cobalto', 'destellos': '02-destellos-mostaza-pegatina', 'explosion': '03-explosion-mostaza-vacia',
    'subrayado': '04-subrayado-pincel-cobalto', 'mano-cafe': '05-recorte-mano-cafe', 'mano-movil': '06-recorte-mano-movil',
    'brindis': '07-recorte-brindis-vino', 'plato-tapas': '08-recorte-plato-tapas', 'megafono': '09-pegatina-megafono',
    'bocadillo': '10-bocadillo-cobalto-vacio', 'circulo': '11-circulo-rotulador-cobalto', 'flecha': '12-flecha-pincel-cobalto',
    'rayos': '13-rayos-mostaza', 'asterisco': '14-asterisco-cobalto', 'papel-rasgado': '15-papel-rasgado',
    'cinta': '16-cinta-adhesiva', 'sello': '17-sello-vacio', 'pin': '18-pin-ubicacion', 'corazon': '19-corazon-mostaza',
    'chuleton': '20-recorte-chuleton', 'mano-copa': '21-recorte-mano-copa', 'vieiras': '22-recorte-plato-gourmet-vieiras',
    'tartar': '23-recorte-plato-gourmet-tartar',
}


def mascara(nombre, w, h, seed, lados='tblr', amp=6, fibra=6):
    alfa, f = mascara_y_fibra(h, w, seed=seed, amp=amp, fibra=fibra, lados=lados)
    m = np.zeros((h, w, 4), np.uint8)
    m[..., :3] = 255
    m[..., 3] = (alfa * 255).astype(np.uint8)
    Image.fromarray(m).save(os.path.join(PUB, 'mascaras', f'{nombre}.png'), optimize=True)
    Image.fromarray(fibra_rgba(alfa, f)).save(os.path.join(PUB, 'mascaras', f'{nombre}-fibra.png'), optimize=True)


def main():
    for d in ('fondos', 'mascaras', 'recursos'):
        os.makedirs(os.path.join(PUB, d), exist_ok=True)
    H, W = 1920, 1080
    g = grano(H, W, 5)
    m = ruido(H, W, 7, 120)
    for nombre, c in COLORES.items():
        k = 0.045 if nombre != 'tinta' else 0.18
        a = np.array(c, np.float32)[None, None, :] * (1 + k * g[..., None] + 0.02 * m[..., None]) + (6 * g[..., None] if nombre == 'tinta' else 0)
        Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(PUB, 'fondos', f'{nombre}.jpg'), quality=92)
    for i, (w, h) in enumerate([(640, 200), (520, 200), (760, 170), (640, 170), (900, 380), (900, 380)]):
        mascara(f'tira-{i}', w, h, 120 + i)
    mascara('hoja', 1080, 2300, 200, lados='tb', amp=14, fibra=9)
    for corto, archivo in RECURSOS.items():
        ruta = os.path.join(IDENT, f'{archivo}.png')
        if not os.path.exists(ruta):
            print('falta', ruta)
            continue
        im = Image.open(ruta).convert('RGBA')
        im = im.crop(im.getbbox() or (0, 0, im.width, im.height))
        im.thumbnail((800, 800), Image.LANCZOS)
        im.save(os.path.join(PUB, 'recursos', f'{corto}.png'), optimize=True)
    print('recursos listos en promo/public/papel/')


if __name__ == '__main__':
    main()
