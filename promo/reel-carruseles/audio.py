#!/usr/bin/env python3
"""Banda sonora del reel: 10 compases de la música desde un tiempo fuerte medido,
más los sonidos de interfaz sintetizados y colocados por su pico medido.

    python3 audio.py assets/musica.mp3 out/banda.wav [--inicio 64.0]

--inicio es una estimación: el script busca el golpe de bombo real más cercano.
Necesita numpy, scipy y ffmpeg.
"""
import json
import subprocess
import sys

import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
BPM = 120
B = 60 / BPM
DUR = 40 * B


def carga(ruta):
    raw = subprocess.run(['ffmpeg', '-v', 'quiet', '-i', ruta, '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()


def rejilla(x, inicio):
    """Tempo y fase del bombo (banda < 150 Hz), y el tiempo fuerte más cercano a `inicio`."""
    mono = x.mean(1)
    low = sosfilt(butter(4, 150, 'low', fs=SR, output='sos'), mono)
    hop = 120
    n = len(low) // hop
    e = np.sqrt(np.add.reduceat(low[:n * hop] ** 2, np.arange(0, n * hop, hop)) / hop)
    o = np.maximum(0, np.diff(e))
    fr = SR / hop
    mejor = None
    for bpm in np.arange(118, 122, 0.005):
        per = 60 / bpm * fr
        h, _ = np.histogram(np.arange(len(o)) % per, bins=96, range=(0, per), weights=o)
        sc = h.max() / h.mean()
        if mejor is None or sc > mejor[0]:
            mejor = (sc, bpm, (np.argmax(h) + 0.5) / 96 * per / fr)
    _, bpm, fase = mejor
    beat = 60 / bpm
    k = round((inicio - fase) / beat)
    t0 = fase + k * beat
    # afina al pico de ataque real en ±25 ms
    a, b = int((t0 - 0.025) * fr), int((t0 + 0.025) * fr)
    t0 = (a + int(np.argmax(o[a:b]))) / fr
    return bpm, t0


# ───────── Sonidos de interfaz (sintetizados aquí, sin licencias de terceros) ─────────
rng = np.random.default_rng(7)


def env(n, ataque, caida):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(ataque, 1e-4)) * np.exp(-t / caida)


def clic(fuerza=1.0, tono=2400):
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    ruido = sosfilt(butter(2, [1500, 7000], 'band', fs=SR, output='sos'), rng.standard_normal(n))
    s = 0.6 * ruido * env(n, 0.0005, 0.006) + 0.5 * np.sin(2 * np.pi * tono * t) * env(n, 0.0005, 0.012)
    return fuerza * s


def tecla():
    n = int(0.06 * SR)
    t = np.arange(n) / SR
    ruido = sosfilt(butter(2, [800, 5000], 'band', fs=SR, output='sos'), rng.standard_normal(n))
    return 0.55 * ruido * env(n, 0.0008, 0.010) + 0.25 * np.sin(2 * np.pi * 180 * t) * env(n, 0.001, 0.02)


def golpe(tono=110, caida=0.09, fuerza=1.0):
    """Cambio de forma: un golpe grave corto, con barrido de tono."""
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = tono * (1 + 1.2 * np.exp(-t / 0.02))
    fase = 2 * np.pi * np.cumsum(f) / SR
    return fuerza * 0.8 * np.sin(fase) * env(n, 0.002, caida)


def barrido(dur=0.30, fuerza=1.0):
    """Arrastre: ruido filtrado que sube y acaba en el golpe (el pico, al final)."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    out = np.zeros(n)
    tramos = 12
    for i in range(tramos):
        a, b = i * n // tramos, (i + 1) * n // tramos
        fc = 600 + 5000 * (i / tramos) ** 2
        out[a:b] = sosfilt(butter(2, [fc * 0.6, fc * 1.6], 'band', fs=SR, output='sos'), ruido)[a:b]
    forma = (t / dur) ** 2.2
    forma[-int(0.012 * SR):] *= np.linspace(1, 0, int(0.012 * SR))
    return fuerza * 0.45 * out * forma


def campana(notas=(1318.5, 1975.5), fuerza=1.0):
    n = int(0.7 * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for i, f in enumerate(notas):
        d = int(i * 0.07 * SR)
        tt = t[: n - d]
        s[d:] += np.sin(2 * np.pi * f * tt) * env(n - d, 0.002, 0.18) + 0.3 * np.sin(2 * np.pi * 2 * f * tt) * env(n - d, 0.002, 0.08)
    return fuerza * 0.28 * s


# ───────── Guion de sonidos (mismos tiempos que reel.html, v4) ─────────
CLICS = [[0.44, 0.52], [1.50, 1.58], [2.94, 3.00], [15.94, 16.02]]
SUELTAS = [7.75, 8.25, 8.75, 9.05]                        # giros de la rueda (el último, de golpe de muñeca)
CAEN = [0.52, 14.5, 14.75, 15.0]                          # archivos que caen en una carpeta
LLEGADAS = [4.32, 4.78]                                   # las capas del post llegan y se quedan flotando
PLAZA = [10.0 + i * 0.25 for i in range(5)]
RAFAGA = [11.5 + i * 0.25 for i in range(10)]
LOGO = [17.7 + i * 0.06 + 0.07 for i in range(7)]         # piezas del logotipo que caen en el sello
ATERRIZA = [17.95, 19.45, 2.8]                            # la mascota toca el suelo
VIAJES = [(2.05, 0.4), (3.5, 0.5), (7.42, 0.4), (9.62, 0.45), (14.45, 0.45), (17.55, 0.5), (19.55, 0.45)]   # pico, duración


def eventos():
    ev = []
    for a, b in CLICS:
        ev.append((a, clic(0.9)))
        ev.append((b, clic(0.5, 1800)))
    for r in SUELTAS:
        ev.append((r - 0.2, clic(0.5)))           # agarre
        ev.append((r, barrido(0.3 if r < 9 else 0.4)))
        ev.append((r, golpe(140, 0.05, 0.5)))
    for t in CAEN:                                 # el archivo toca fondo y el cristal cede
        ev.append((t + 0.61, golpe(150, 0.06, 0.7)))
        ev.append((t + 0.61, clic(0.35, 1300)))
    for t in LLEGADAS:
        ev.append((t, golpe(90, 0.10, 0.8)))
    ev.append((6.3, golpe(65, 0.18, 1.0)))         # las capas se acoplan al post
    ev.append((6.3, clic(0.6, 1500)))
    for t in PLAZA:
        ev.append((t + 0.07, golpe(70, 0.14, 0.9)))
        ev.append((t + 0.07, clic(0.5, 1500)))
    ev.append((11.5, golpe(80, 0.10, 0.9)))
    for t in RAFAGA[1:]:
        ev.append((t, clic(0.55, 2900)))
    for t in LOGO:
        ev.append((t, golpe(75, 0.10, 0.7)))
        ev.append((t, clic(0.45, 1700)))
    for t in ATERRIZA:
        ev.append((t, golpe(60, 0.12, 0.6)))
    for t, d in VIAJES:                            # la foto, la rueda, Axpe, la carpeta del lunes y el sello viajan
        ev.append((t, barrido(d, 0.6)))
    ev.append((19.6, golpe(120, 0.07, 0.8)))       # el sello se vuelve la tecla
    ev.append((1.13, campana((1567.98, 2349.3), 0.8)))   # foto recibida
    ev.append((16.3, campana()))                         # aviso
    ev.append((18.15, campana((1318.5, 1975.5, 2637.0), 0.7)))   # lema
    return ev


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    musica, salida = sys.argv[1], sys.argv[2]
    inicio = float(sys.argv[sys.argv.index('--inicio') + 1]) if '--inicio' in sys.argv else 64.0
    x = carga(musica)
    bpm, t0 = rejilla(x, inicio)
    a = int(round(t0 * SR))
    n = int(round(DUR * SR))
    # 10 compases a su tempo; la diferencia con 120 BPM es de 4 ms en 20 s
    m = x[a - int(0.004 * SR): a - int(0.004 * SR) + n].astype(np.float64)
    # micro fundidos para que el bucle no haga clic
    f = int(0.006 * SR)
    m[:f] *= np.linspace(0, 1, f)[:, None]
    m[-f:] *= np.linspace(1, 0, f)[:, None]

    ui = np.zeros(n)
    for t, s in eventos():
        pico = int(np.argmax(np.abs(s)))
        p = int(round(t * SR)) - pico
        for k in (0, -n):                 # lo que pasa del final vuelve al principio (bucle)
            i0 = p + k
            lo, hi = max(0, i0), min(n, i0 + len(s))
            if hi > lo:
                ui[lo:hi] += s[lo - i0: hi - i0]
    ui /= max(1e-9, np.abs(ui).max())

    mezcla = m * 0.78 + 0.32 * ui[:, None]
    # nivel: RMS a −15 dBFS y limitador suave con techo a −3,2 dBFS (verify_promo de onetake pide pico ≤ −3)
    rms = np.sqrt(np.mean(mezcla ** 2))
    mezcla *= 10 ** (-15 / 20) / rms
    techo = 10 ** (-3.2 / 20)
    mezcla = techo * np.tanh(mezcla / techo)
    pcm = (np.clip(mezcla, -1, 1) * 32767).astype('<i2')
    import wave
    with wave.open(salida, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(json.dumps({'bpm_medido': round(bpm, 3), 'inicio_s': round(t0, 4), 'duracion_s': DUR, 'salida': salida}))


if __name__ == '__main__':
    main()
