#!/usr/bin/env python3
"""Banda sonora de la promo v3: música (CC0) + audio original del reel de Da Tonino.

Lee la rejilla de `src/timeline.json` y escribe `public/audio/banda-sonora.wav`, que la
composición de Remotion reproduce desde el fotograma 0 (el vídeo del reel va silenciado).

Qué hace:
1. Estira la música de 129,994 a 132,983 BPM (el pulso medido de la canción del reel) con
   Rubber Band (sin cambiar el tono), para que toda la pieza comparta una sola rejilla.
2. Monta la música por compases completos según `music.segments` y la pone en su tiempo.
   Los empalmes caen en tiempo fuerte, 8 ms antes del golpe, con fundidos de potencia constante.
3. Coloca el audio del reel exactamente donde suena su vídeo (misma cuenta de fotogramas).
4. Iguala el nivel de la música al del reel, normaliza a −14 LUFS y limita a −1 dBTP.

Requisitos: python3 con numpy, scipy, soundfile y pyloudnorm; ffmpeg con el filtro rubberband.
Uso (desde promo/):  python3 scripts/banda_sonora.py
"""
import json
import os
import subprocess
import sys
import tempfile

import numpy as np
import pyloudnorm as pyln
import soundfile as sf
from scipy.signal import butter, resample_poly, sosfilt

SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
TL = json.load(open(os.path.join(ROOT, 'src', 'timeline.json'), encoding='utf-8'))
PUBLIC = os.path.join(ROOT, 'public')
OUT = os.path.join(PUBLIC, 'audio', 'banda-sonora.wav')

BEAT = 60.0 / TL['bpm']
FPS = TL['fps']
PRE = 0.008  # los empalmes se hacen justo antes del golpe para no comerse el ataque


def t_beat(n: float) -> float:
    return TL['t0'] + n * BEAT


def frame_of_beat(n: float) -> int:
    # Igual que beatFrame() en src/timing.ts
    return int(round(t_beat(n) * FPS))


def decode(path: str, extra_filter: str = '') -> np.ndarray:
    """Decodifica a float32 estéreo 48 kHz con ffmpeg (opcionalmente con un filtro)."""
    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, 'a.wav')
        af = ['-af', extra_filter] if extra_filter else []
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', path, '-vn', *af, '-ac', '2', '-ar', str(SR), '-c:a', 'pcm_f32le', wav], check=True)
        x, sr = sf.read(wav, dtype='float32', always_2d=True)
    assert sr == SR
    return x


def ramp(n: int, up: bool) -> np.ndarray:
    """Fundido de potencia constante (seno/coseno)."""
    t = np.linspace(0, np.pi / 2, n, dtype=np.float32)
    r = np.sin(t) if up else np.cos(t)
    return r[:, None]


def place(out: np.ndarray, clip: np.ndarray, at_s: float, fade_in: float = 0.008, fade_out: float = 0.008, gain: float = 1.0) -> None:
    c = clip.copy() * gain
    fi, fo = int(fade_in * SR), int(fade_out * SR)
    if fi:
        c[:fi] *= ramp(fi, True)
    if fo:
        c[-fo:] *= ramp(fo, False)
    i = int(round(at_s * SR))
    j = min(len(out), i + len(c))
    if i < 0:
        c = c[-i:]
        i = 0
    out[i:j] += c[: j - i]


def main() -> None:
    m = TL['music']
    ratio = TL['bpm'] / m['src_bpm']
    src_bar = 4 * 60.0 / m['src_bpm'] / ratio  # duración de un compás ya estirado
    src_t0 = m['src_t0'] / ratio
    music = decode(
        os.path.join(PUBLIC, m['file']),
        f'rubberband=tempo={ratio:.6f}:transients=crisp:detector=compound:phase=laminar:window=standard:pitchq=quality:channels=together',
    )

    # Mismo final que END_FRAME en src/timing.ts: la banda dura exactamente lo que el vídeo.
    end_s = (frame_of_beat(TL['final']) + round(TL['tail_s'] * FPS)) / FPS
    n = int(np.ceil(end_s * SR))
    mus = np.zeros((n, 2), np.float32)
    reel_bus = np.zeros((n, 2), np.float32)

    # --- Música, por compases -------------------------------------------------
    for seg in m['segments']:
        a = src_t0 + seg['src_bar'] * src_bar - PRE
        b = src_t0 + (seg['src_bar'] + seg['bars']) * src_bar - PRE
        clip = music[max(0, int(a * SR)): int(b * SR)]
        at = t_beat(seg['beat']) - PRE
        if seg['beat'] == 0:
            at = 0.0
        if seg.get('hp'):
            clip = sosfilt(butter(2, seg['hp'], 'highpass', fs=SR, output='sos'), clip, axis=0).astype(np.float32)
        if seg.get('env_in'):
            # Entra desde abajo (env_floor) y crece hasta el siguiente golpe (curva exponencial).
            lo = seg.get('env_floor', 0.0)
            env = (lo + (1 - lo) * np.linspace(0, 1, len(clip)) ** seg['env_in']).astype(np.float32)[:, None]
            place(mus, clip * env, at, fade_in=0.0, fade_out=0.004, gain=seg.get('gain', 1.0))
        elif seg.get('tail'):
            # Acorde final: golpe y cola que se apaga hasta el último fotograma.
            clip = clip[: int((end_s - at) * SR)]
            L = len(clip)
            hold = int(0.35 * SR)
            env = np.ones(L, np.float32)
            env[hold:] = np.clip(np.cos(np.linspace(0, np.pi / 2, L - hold)), 0, 1) ** 1.6
            place(mus, clip * env[:, None], at, fade_in=0.004, fade_out=0.0)
        else:
            place(mus, clip, at, fade_in=0.004 if at > 0 else 0.0, fade_out=seg.get('fade_out_s', 0.008), gain=seg.get('gain', 1.0))

    # --- Audio original del reel ----------------------------------------------
    r = TL['reel']
    reel = decode(os.path.join(PUBLIC, r['file']))
    start_frame = frame_of_beat(r['screen_on_beat'])
    start_from_frames = int(round(r['start_from_s'] * FPS))
    # τ del reel en el instante t = t − start_frame/FPS + start_from/FPS (igual que el vídeo)
    at = start_frame / FPS
    clip = reel[int(start_from_frames / FPS * SR):]
    fade_end = t_beat(96) + 0.05
    clip = clip[: max(0, int((fade_end - at) * SR))]
    fo = int(0.6 * SR)
    clip[-fo:] *= ramp(fo, False)
    reel_bus[int(at * SR): int(at * SR) + len(clip)] += clip

    # --- Niveles ---------------------------------------------------------------
    meter = pyln.Meter(SR)
    reel_region = reel_bus[int(t_beat(68) * SR): int(t_beat(88) * SR)]
    mus_region = mus[int(t_beat(8) * SR): int(t_beat(64) * SR)]
    l_reel = meter.integrated_loudness(reel_region)
    l_mus = meter.integrated_loudness(mus_region)
    g_mus = 10 ** ((l_reel - l_mus - 0.5) / 20)  # la música, medio punto por debajo del reel
    mix = mus * g_mus + reel_bus
    print(f'reel {l_reel:.1f} LUFS · música {l_mus:.1f} LUFS → ganancia música {20*np.log10(g_mus):+.1f} dB')

    # --- Máster: −14 LUFS, −1 dBTP --------------------------------------------
    target = -14.0
    for _ in range(4):
        li = meter.integrated_loudness(mix)
        mix *= 10 ** ((target - li) / 20)
        mix = limit(mix, ceiling_db=-1.2)
    li = meter.integrated_loudness(mix)
    tp = true_peak_db(mix)
    print(f'máster: {li:.2f} LUFS integrados, pico verdadero {tp:.2f} dBTP, {len(mix)/SR:.3f} s')
    if not np.isfinite(mix).all() or tp > -1.0:
        sys.exit('El pico verdadero supera −1 dBTP')
    sf.write(OUT, mix, SR, subtype='PCM_24')
    print('→', os.path.relpath(OUT, ROOT))


def true_peak_db(x: np.ndarray) -> float:
    up = resample_poly(x, 4, 1, axis=0)
    return 20 * np.log10(np.max(np.abs(up)) + 1e-12)


def limit(x: np.ndarray, ceiling_db: float = -1.2, lookahead_ms: float = 3.0, release_ms: float = 80.0) -> np.ndarray:
    """Limitador con anticipación: ganancia suave que nunca deja pasar el techo (medido con sobremuestreo ×4)."""
    ceil = 10 ** (ceiling_db / 20)
    up = resample_poly(np.abs(x).max(axis=1), 4, 1)
    peak = np.maximum.reduceat(np.abs(up), np.arange(0, len(up), 4))[: len(x)]
    if len(peak) < len(x):
        peak = np.pad(peak, (0, len(x) - len(peak)))
    need = np.minimum(1.0, ceil / np.maximum(peak, 1e-9))
    la = int(lookahead_ms / 1000 * SR)
    # mínimo en la ventana de anticipación
    from scipy.ndimage import minimum_filter1d
    g = minimum_filter1d(need, size=2 * la + 1, mode='nearest')
    # suavizado: ataque inmediato (ya anticipado), liberación exponencial
    rel = np.exp(-1.0 / (release_ms / 1000 * SR))
    out = np.empty_like(g)
    cur = 1.0
    for i, v in enumerate(g):
        cur = v if v < cur else v + (cur - v) * rel
        out[i] = cur
    # suavizado de la entrada de la reducción (sin escalones audibles); la ventana cabe en la anticipación
    from scipy.ndimage import uniform_filter1d
    out = uniform_filter1d(out, size=la, mode='nearest')
    return (x * out[:, None]).astype(np.float32)


if __name__ == '__main__':
    main()
