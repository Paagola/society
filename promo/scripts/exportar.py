#!/usr/bin/env python3
"""Exporta la promo: une cada render mudo con la banda sonora y hace las copias de la web.

Uso (desde promo/), después de `npm run audio`, `npm run render` y `npm run render:wide`:
    python3 scripts/exportar.py

- out/society-promo-9x16-muda.mp4 + public/audio/banda-sonora.wav → society-promo-v3-9x16.mp4
- out/society-promo-16x9-muda.mp4 + public/audio/banda-sonora.wav → society-promo-v3-16x9.mp4
- web/society-promo-9x16.mp4 (720 × 1280), web/society-promo-16x9.mp4 (1280 × 720) y sus pósteres.

El audio se codifica aquí (AAC 320 kb/s) y no en Remotion, porque el AAC del render llegaba con 2048
muestras de relleno sin señalizar: sonaba 43 ms tarde respecto a la imagen. Se usa el codificador
«fast» de ffmpeg porque el predeterminado (twoloop) metía un pico de 0 dBFS en un golpe (14,76 s).
Requisitos: ffmpeg.
"""
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO = os.path.join(ROOT, 'public', 'audio', 'banda-sonora.wav')
POSTER_S = 13.8  # «CASO REAL · DA TONINO / DE 4 FOTOS a un reel.»

JOBS = [
    ('out/society-promo-9x16-muda.mp4', 'society-promo-v3-9x16.mp4', 'web/society-promo-9x16.mp4', 'web/poster-9x16.jpg', '720:1280'),
    ('out/society-promo-16x9-muda.mp4', 'society-promo-v3-16x9.mp4', 'web/society-promo-16x9.mp4', 'web/poster-16x9.jpg', '1280:720'),
]


def ff(*args: str) -> None:
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args], check=True)


for muda, final, web, poster, size in JOBS:
    src = os.path.join(ROOT, muda)
    if not os.path.exists(src):
        print('falta', muda, '— se omite')
        continue
    dst = os.path.join(ROOT, final)
    ff('-i', src, '-i', AUDIO, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-aac_coder', 'fast', '-b:a', '320k', '-movflags', '+faststart', dst)
    ff('-i', dst, '-vf', f'scale={size}:flags=lanczos', '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p',
       '-c:a', 'aac', '-aac_coder', 'fast', '-b:a', '160k', '-movflags', '+faststart', os.path.join(ROOT, web))
    ff('-ss', str(POSTER_S), '-i', dst, '-frames:v', '1', '-vf', f'scale={size}:flags=lanczos', '-q:v', '3', os.path.join(ROOT, poster))
    print('→', final, '·', web, '·', poster)
