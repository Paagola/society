"""«La terraza que se llena»: guion de las piezas, piezas de apoyo y sonido de papel.

Lee las piezas que deja recortar.py (imagen/piezas.json) y escribe:
  promo/src/recortado/guion.json     cuándo y desde dónde entra cada pieza, la burbuja, las motas y los eventos
  promo/public/recortado/fondo.jpg   el papel crudo de base
  promo/public/recortado/burbuja.png la burbuja del móvil a tamaño grande, rasgada
  promo/public/recortado/mascaras/   máscara y fibra de las tiras de texto
  promo/public/recortado/foley.wav   sonido: solo papel, sincronizado con cada pieza que se posa
El guion es la única fuente de tiempos: Remotion y el sonido leen los mismos fotogramas.
Uso: python produccion/society-papel-recortado/scripts/montaje.py
"""
import json
import math
import os
import sys
import wave

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)
RAIZ = os.path.abspath(os.path.join(BASE, '../..'))
sys.path.insert(0, os.path.join(RAIZ, 'produccion/society-anuncio/scripts'))
from rasgado import CREMA, fibra_rgba, mascara_y_fibra, ruido  # noqa: E402

W, H, FPS = 1080, 1920, 30
PASO = 2          # stop-motion a 15 imágenes por segundo
VIAJE = 10        # fotogramas que tarda una pieza en entrar
PUB = os.path.join(RAIZ, 'promo/public/recortado')
SRC = os.path.join(RAIZ, 'promo/src/recortado')
SR = 48000

# Historia: calle vacía → titular → sube el móvil → publica → la terraza se llena → lema
EV = {
    'titular': 156,        # «TERRAZA / vacía.» entra
    'titular_fuera': 198,  # la empuja el móvil
    'toque': 238,          # el pulgar publica
    'pop': 244,            # la burbuja sale de la pantalla
    'pop_dur': 14,
    'lema': 342,           # «PUBLICA menos, / LLENA MÁS.»
    'fin': 420,
}

# grupo: (primera salida, última salida, desde dónde, orden)
GRUPOS = {
    'cielo': (4, 22, 'arriba', 'x'),
    'luna': (30, 30, 'arriba', 'x'),
    'pared': (12, 42, 'lados', 'azar'),
    'tejado': (34, 56, 'arriba', 'x'),
    'detalle_arriba': (46, 82, 'lados', 'y'),
    'toldo': (68, 94, 'arriba', 'x'),
    'detalle_abajo': (84, 116, 'lados', 'x'),
    'suelo': (94, 128, 'abajo', 'filas'),
    'guirnalda': (112, 130, 'arriba', 'x'),
    'camarero': (128, 146, 'abajo', 'base'),
    'mano': (196, 222, 'abajo', 'base'),
    'burbuja': (226, 226, 'abajo', 'x'),
    'terraza_izq': (262, 324, 'izquierda', 'base'),
    'terraza_der': (266, 328, 'derecha', 'base'),
}
HOJAS = ('cielo', 'pared')

# la burbuja, ya grande, arriba en el centro: la firma de la pieza
BURBUJA_FINAL = {'cx': 540, 'cy': 272, 'w': 440, 'rot': -3}


def grupo_de(p):
    c = p['capa']
    if c == 'detalle':
        return 'detalle_arriba' if p['cy'] < 630 else 'detalle_abajo'
    if c == 'pantalla':
        return 'mano'
    return c


def guion(piezas, r):
    por_grupo = {}
    for p in piezas:
        por_grupo.setdefault(grupo_de(p), []).append(p)
    out = []
    for g, lista in por_grupo.items():
        a, b, desde, orden = GRUPOS[g]
        if orden == 'x':
            lista.sort(key=lambda p: p['cx'] + r.uniform(-30, 30))
        elif orden == 'y':
            lista.sort(key=lambda p: p['cy'] + r.uniform(-40, 40))
        elif orden == 'filas':  # de delante (abajo) hacia el fondo
            lista.sort(key=lambda p: -p['cy'] + r.uniform(-60, 60))
        elif orden == 'base':  # las figuras de abajo arriba: pies, piernas, cuerpo, brazos, cabeza, pelo
            lista.sort(key=lambda p: -(p['y'] + p['h']) + r.uniform(-25, 25))
        else:
            r.shuffle(lista)
        n = len(lista)
        for i, p in enumerate(lista):
            t0 = a if n == 1 else a + (b - a) * i / (n - 1)
            d = desde
            if d == 'lados':
                d = 'izquierda' if p['cx'] < W / 2 else 'derecha'
            m = 40 + r.uniform(0, 90)
            if d == 'arriba':
                dx, dy = r.uniform(-70, 70), -(p['y'] + p['h']) - m
            elif d == 'abajo':
                dx, dy = r.uniform(-70, 70), (H - p['y']) + m
            elif d == 'izquierda':
                dx, dy = -(p['x'] + p['w']) - m, r.uniform(-90, 50)
            else:
                dx, dy = (W - p['x']) + m, r.uniform(-90, 50)
            hoja = p['capa'] in HOJAS or p['area'] > 60000
            giro = r.choice([-1, 1]) * (r.uniform(2, 5) if hoja else r.uniform(4, 14))
            # pequeño recolocado a mano después de posarse (no en todas)
            aj = [round(r.uniform(-2, 2), 1), round(r.uniform(-2, 2), 1), round(r.uniform(-0.8, 0.8), 2)] if r.random() < 0.45 else None
            out.append({'id': p['id'], 'x': p['x'], 'y': p['y'], 'w': p['w'], 'h': p['h'], 'z': p['z'], 'g': g,
                        't0': int(round(t0)), 'v': VIAJE + (2 if hoja else 0), 'dx': round(dx), 'dy': round(dy),
                        'r': round(giro, 1), 'aj': aj, 'area': p['area']})
    # mismo plano: la que llega después va encima (se desliza por encima de las ya pegadas)
    out.sort(key=lambda q: (q['z'], q['t0'], q['id']))
    return out


def fondo():
    g = ruido(H, W, 5, 1.2) * 0.6 + ruido(H, W, 6, 5) * 0.4
    m = ruido(H, W, 7, 120)
    a = CREMA[None, None, :] * (1 + 0.045 * g[..., None] + 0.02 * m[..., None])
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(os.path.join(PUB, 'fondo.jpg'), quality=92)


def burbuja(p):
    """La burbuja de la pantalla a tamaño grande: misma silueta, papel nuevo y borde roto con fibra."""
    im = np.asarray(Image.open(os.path.join(PUB, 'piezas', f"{p['id']:03d}.png")), np.float32)
    a = im[..., 3] / 255
    color = (im[..., :3] * a[..., None]).reshape(-1, 3).sum(0) / a.sum()
    k = BURBUJA_FINAL['w'] / p['w']
    pad = 24
    Wb, Hb = round(p['w'] * k) + 2 * pad, round(p['h'] * k) + 2 * pad
    m = Image.fromarray((a * 255).astype(np.uint8)).resize((Wb - 2 * pad, Hb - 2 * pad), Image.LANCZOS)
    m = np.pad(np.asarray(m, np.float32) / 255, pad)
    m = ndi.gaussian_filter(m, 2.5 * k / 3) > 0.5
    d = ndi.distance_transform_edt(m)
    n1 = ruido(Hb, Wb, 91, 6)
    n2 = ruido(Hb, Wb, 92, 1.5)
    amp, fib = 5.0, 7.0
    dd = d - (amp * 1.6 + 2) + amp * n1 + 1.2 * n2
    alfa = np.clip(dd + 0.5, 0, 1)
    f = np.clip(1 - dd / fib, 0, 1) * (dd > 0) * np.clip(0.75 + 0.35 * n2, 0, 1)
    g = ruido(Hb, Wb, 93, 1.2) * 0.6 + ruido(Hb, Wb, 94, 5) * 0.4
    rgb = color[None, None, :] * (1 + 0.05 * g[..., None] + 0.025 * ruido(Hb, Wb, 95, 40)[..., None])
    blanco = np.array([248, 245, 238], np.float32)
    rgb = rgb * (1 - f[..., None]) + blanco * f[..., None]
    out = np.dstack([np.clip(rgb, 0, 255), alfa * 255]).astype(np.uint8)
    out[out[..., 3] == 0, :3] = 0
    Image.fromarray(out).save(os.path.join(PUB, 'burbuja.png'), optimize=True)
    return Wb, Hb, pad, k


def tiras():
    for i, (w, h) in enumerate([(640, 200), (520, 200), (760, 170), (640, 170)]):
        alfa, f = mascara_y_fibra(h, w, seed=120 + i, amp=6, fibra=6)
        m = np.zeros((h, w, 4), np.uint8)
        m[..., :3] = 255
        m[..., 3] = (alfa * 255).astype(np.uint8)
        Image.fromarray(m).save(os.path.join(PUB, 'mascaras', f'tira-{i}.png'), optimize=True)
        Image.fromarray(fibra_rgba(alfa, f)).save(os.path.join(PUB, 'mascaras', f'tira-{i}-fibra.png'), optimize=True)


def motas(r, x0, y0):
    """Recortitos que saltan al salir la burbuja: cobalto, papel, tinta y muy poca mostaza."""
    colores = ['#2440E0'] * 8 + ['#ECE8DC'] * 7 + ['#141414'] * 4 + ['#F5C518'] * 3
    out = []
    for c in colores:
        n = r.integers(5, 8)
        ang = np.sort(r.uniform(0, 2 * np.pi, n))
        rad = r.uniform(0.55, 1.0, n)
        pts = [f'{50 + 50 * rr * math.cos(t):.0f}% {50 + 50 * rr * math.sin(t):.0f}%' for t, rr in zip(ang, rad)]
        a = r.uniform(-np.pi * 0.95, -np.pi * 0.05)
        v = r.uniform(18, 42)
        out.append({'c': c, 's': round(r.uniform(12, 30)), 'clip': 'polygon(' + ', '.join(pts) + ')',
                    'x': round(x0 + r.uniform(-40, 40)), 'y': round(y0 + r.uniform(-30, 30)),
                    'vx': round(v * math.cos(a), 1), 'vy': round(v * math.sin(a), 1), 'vr': round(r.uniform(-25, 25), 1)})
    return out


# --- sonido ------------------------------------------------------------------------------------------
def lee(nombre):
    with wave.open(os.path.join(RAIZ, 'promo/public/audio/pizza', f'{nombre}.wav')) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    return x


def sonido(g, pop_xy):
    S = {n: lee(n) for n in ('pegar-1', 'pegar-2', 'pegar-3', 'caer', 'lanzar', 'tic', 'clic', 'pop', 'alisar')}
    r = np.random.default_rng(77)
    sal = np.zeros(int((EV['fin'] + 30) / FPS * SR))

    def pon(nombre, fot, gan, tono=1.0):
        x = S[nombre]
        if tono != 1.0:
            x = np.interp(np.arange(0, len(x) - 1, tono), np.arange(len(x)), x)
        i = int(fot / FPS * SR)
        j = min(len(sal), i + len(x))
        sal[i:j] += gan * x[:j - i]

    # cada paso en el que se posan piezas suena un pegado; más fuerte si son muchas o grandes
    posa = {}
    for p in g:
        t = p['t0'] + p['v']
        posa.setdefault(t, []).append(p)
    for k, (t, ps) in enumerate(sorted(posa.items())):
        area = sum(p['area'] for p in ps)
        gan = min(0.95, 0.22 + 0.07 * len(ps) + 0.35 * math.sqrt(area) / 400)
        pon(f'pegar-{k % 3 + 1}', t, gan, r.uniform(0.85, 1.15))
        if max(p['area'] for p in ps) > 30000:
            pon('caer', t, 0.35, 0.8)
    # las hojas grandes se oyen entrar
    for p in g:
        if p['g'] in HOJAS:
            pon('lanzar', p['t0'], 0.18, r.uniform(1.0, 1.2))
    # titular, toque, burbuja y lema
    for t in (EV['titular'], EV['titular'] + 6):
        pon('lanzar', t, 0.45)
        pon('pegar-2', t + 8, 0.9, 0.8)
    pon('lanzar', EV['titular_fuera'], 0.5, 0.9)
    pon('tic', EV['toque'], 0.9)
    pon('clic', EV['toque'], 0.35, 1.2)
    pon('pop', EV['pop'], 0.95)
    pon('lanzar', EV['pop'], 0.35, 1.3)
    pon('alisar', EV['pop'] + EV['pop_dur'], 0.4, 1.1)
    for t in (EV['lema'], EV['lema'] + 8):
        pon('lanzar', t, 0.45)
        pon('pegar-3', t + 8, 0.95, 0.75)
    sal = sal / (np.abs(sal).max() + 1e-9) * 0.89
    with wave.open(os.path.join(PUB, 'foley.wav'), 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((sal * 32767).astype(np.int16).tobytes())


def main():
    os.makedirs(os.path.join(PUB, 'mascaras'), exist_ok=True)
    os.makedirs(SRC, exist_ok=True)
    with open(os.path.join(BASE, 'imagen/piezas.json')) as f:
        piezas = json.load(f)
    r = np.random.default_rng(2026)
    g = guion(piezas, r)
    fondo()
    tiras()
    pb = next(p for p in piezas if p['capa'] == 'burbuja')
    Wb, Hb, pad, k = burbuja(pb)
    bf = BURBUJA_FINAL
    datos = {
        'W': W, 'H': H, 'fps': FPS, 'paso': PASO, 'duracion': EV['fin'], 'eventos': EV,
        'piezas': [{k2: v for k2, v in p.items() if k2 != 'area'} for p in g],
        # la burbuja grande: empieza exactamente sobre la de la pantalla y acaba arriba en el centro
        'burbuja': {'id': pb['id'], 'w': Wb, 'h': Hb,
                    'x0': pb['x'] - pad / k, 'y0': pb['y'] - pad / k, 'k0': 1 / k,
                    'x1': bf['cx'] - Wb / 2, 'y1': bf['cy'] - Hb / 2, 'rot': bf['rot']},
        'motas': motas(r, pb['cx'], pb['cy']),
    }
    with open(os.path.join(SRC, 'guion.json'), 'w', encoding='utf-8') as f:
        json.dump(datos, f, ensure_ascii=False, separators=(',', ':'))
    sonido(g, (pb['cx'], pb['cy']))
    ult = max(p['t0'] + p['v'] for p in g)
    print(f"piezas {len(g)} · última pieza posada en el fotograma {ult} · duración {EV['fin']} ({EV['fin'] / FPS:.1f} s)")


if __name__ == '__main__':
    main()
