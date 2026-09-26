"""Efectos de sonido sintetizados (sonido propio, sin licencias) para «La pizza que nadie vio».

Salidas en promo/public/audio/pizza/: clic (cámara del móvil), arrugar, lanzar, caer, abrir,
pegar-1..3 (un recorte que se pega), el proceso de la foto (alisar, encuadre, escanear) y la
interfaz de la versión startup (tic, pop).
Mono, 48 kHz, 16 bits.
Uso: python produccion/society-anuncio/scripts/sonidos.py  (desde la raíz del repo)
Si hay biblioteca con licencia, sustituir por grabaciones reales de papel.
"""
import os
import wave
import numpy as np

SR = 48000
OUT = 'promo/public/audio/pizza'
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(11)


def banda(x, lo, hi, suave=0.25):
    """Filtro paso banda por FFT con flancos suaves."""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / SR)
    m = 1 / (1 + (lo / np.maximum(f, 1)) ** (2 / suave)) * 1 / (1 + (f / hi) ** (2 / suave))
    return np.fft.irfft(X * m, n)


def env(n, a, d, forma=3.0):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / max(d, 1e-4) * forma / 3)
    return e


def guarda(x, nombre, pico=0.9):
    x = x / (np.abs(x).max() + 1e-9) * pico
    with wave.open(f'{OUT}/{nombre}.wav', 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def chasquidos(dur, tasa, lo=1500, hi=7500, largo=(0.001, 0.006)):
    """Crujidos de papel: impulsos cortos de ruido filtrado con una tasa que cambia en el tiempo."""
    n = int(dur * SR)
    x = np.zeros(n)
    t = 0.0
    while t < dur:
        r = max(tasa(t / dur), 1)
        t += rng.exponential(1 / r)
        if t >= dur:
            break
        L = int(rng.uniform(*largo) * SR)
        i = int(t * SR)
        seg = rng.standard_normal(L) * np.exp(-np.arange(L) / (L / 3)) * rng.uniform(0.2, 1) ** 1.6
        x[i:i + L] += seg[: max(0, min(L, n - i))]
    return banda(x, lo, hi)


def clic():
    n = int(0.16 * SR)
    x = np.zeros(n)
    for t0, g in ((0.0, 1.0), (0.052, 0.7)):
        i = int(t0 * SR)
        L = int(0.03 * SR)
        ruido = banda(rng.standard_normal(L), 2000, 9000) * env(L, 0.0015, 0.012)
        golpe = np.sin(2 * np.pi * 190 * np.arange(L) / SR) * env(L, 0.001, 0.018) * 0.6
        x[i:i + L] += g * (ruido + golpe)
    guarda(x, 'clic')


def arrugar():
    dur = 0.62
    tasa = lambda u: 40 + 320 * np.sin(np.pi * min(1, u * 1.15)) ** 0.8
    x = chasquidos(dur, tasa)
    n = len(x)
    roce = banda(rng.standard_normal(n), 350, 3200) * env(n, 0.06, 0.4) * 0.35
    guarda(x + roce, 'arrugar')


def abrir():
    dur = 0.85
    tasa = lambda u: 25 + 140 * np.sin(np.pi * u) ** 1.2
    x = chasquidos(dur, tasa, lo=1200, hi=6500, largo=(0.0015, 0.009))
    n = len(x)
    roce = banda(rng.standard_normal(n), 250, 2600) * (0.25 + 0.2 * np.sin(np.pi * np.arange(n) / n)) * 0.4
    # el golpe seco final de la hoja al quedar plana
    i = int(0.7 * SR)
    L = int(0.05 * SR)
    x[i:i + L] += banda(rng.standard_normal(L), 600, 5000) * env(L, 0.002, 0.03) * 3
    guarda(x + roce, 'abrir', pico=0.8)


def lanzar():
    n = int(0.36 * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    # barrido: se suman bandas estrechas cuyo centro sube, con envolvente de ida
    for k in range(6):
        c0 = 500 + k * 120
        seg = banda(rng.standard_normal(n), c0, c0 * 2.6)
        x += seg * np.exp(-((t - 0.13 - k * 0.01) / 0.08) ** 2)
    guarda(x, 'lanzar', pico=0.7)


def caer():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    golpe = np.sin(2 * np.pi * (140 - 60 * t) * t) * env(n, 0.002, 0.05)
    papel = chasquidos(0.25, lambda u: 220 * np.exp(-u * 6), lo=1500, hi=7000) * 0.6
    guarda(golpe + papel[:n], 'caer', pico=0.85)


def pegar(k, f0):
    n = int(0.14 * SR)
    t = np.arange(n) / SR
    golpe = np.sin(2 * np.pi * f0 * t) * env(n, 0.001, 0.028)
    palmada = banda(rng.standard_normal(n), 900, 6000) * env(n, 0.0008, 0.012) * 0.9
    guarda(golpe * 0.8 + palmada, f'pegar-{k}', pico=0.85)


def alisar():
    """La mano que plancha el papel: un roce que crece y se apaga, sin crujidos."""
    n = int(0.42 * SR)
    t = np.arange(n) / SR
    x = banda(rng.standard_normal(n), 500, 4200) * np.sin(np.pi * np.clip(t / 0.42, 0, 1)) ** 1.5
    guarda(x, 'alisar', pico=0.6)


def encuadre():
    """Las marcas de recorte que se cierran: dos golpes secos y cortos."""
    n = int(0.12 * SR)
    x = np.zeros(n)
    for t0 in (0.0, 0.045):
        i = int(t0 * SR)
        L = int(0.02 * SR)
        x[i:i + L] += banda(rng.standard_normal(L), 3000, 10000) * env(L, 0.0008, 0.006)
    guarda(x, 'encuadre', pico=0.7)


def escanear():
    """La barra de luz que recorre la foto: un zumbido que sube de tono, con aire por encima."""
    dur = 0.62
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 180 + 520 * (t / dur) ** 1.4
    fase = 2 * np.pi * np.cumsum(f) / SR
    tono = (np.sin(fase) + 0.35 * np.sin(2 * fase) + 0.15 * np.sin(3 * fase)) * 0.35
    aire = banda(rng.standard_normal(n), 1800, 9000) * 0.25
    x = (tono + aire) * np.sin(np.pi * t / dur) ** 0.8
    guarda(x, 'escanear', pico=0.55)


def tic():
    """Tic de interfaz (el marcador que cuenta, los círculos que se encienden)."""
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    x = np.sin(2 * np.pi * 2300 * t) * env(n, 0.0005, 0.008) + banda(rng.standard_normal(n), 3000, 9000) * env(n, 0.0003, 0.004) * 0.4
    guarda(x, 'tic', pico=0.6)


def pop():
    """Pop de interfaz (una tarjeta o una píldora que aparece)."""
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    f = 520 + 380 * np.exp(-t / 0.02)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.045)
    guarda(x, 'pop', pico=0.7)


if __name__ == '__main__':
    clic()
    arrugar()
    abrir()
    lanzar()
    caer()
    for k, f0 in ((1, 170), (2, 210), (3, 150)):
        pegar(k, f0)
    alisar()
    encuadre()
    escanear()
    tic()
    pop()
    print(sorted(os.listdir(OUT)))
