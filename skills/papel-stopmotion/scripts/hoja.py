"""Hoja de contacto de un vídeo: una sola imagen con un fotograma cada N, para revisarlo de un vistazo.

Uso: python skills/papel-stopmotion/scripts/hoja.py VIDEO.mp4 [--cada 20] [--columnas 8] [--salida hoja.png]
"""
import argparse
import glob
import os
import subprocess
import tempfile

from PIL import Image, ImageDraw


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('video')
    ap.add_argument('--cada', type=int, default=20, help='un fotograma cada N')
    ap.add_argument('--columnas', type=int, default=8)
    ap.add_argument('--ancho', type=int, default=180, help='ancho de cada miniatura')
    ap.add_argument('--salida')
    a = ap.parse_args()
    salida = a.salida or os.path.splitext(a.video)[0] + '-hoja.png'
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['ffmpeg', '-v', 'error', '-i', a.video, '-vf', f"select='not(mod(n\\,{a.cada}))',scale={a.ancho}:-2",
                        '-fps_mode', 'passthrough', os.path.join(tmp, '%03d.png')], check=True)
        fs = sorted(glob.glob(os.path.join(tmp, '*.png')))
        ims = [Image.open(f).convert('RGB') for f in fs]
    w, h = ims[0].size
    filas = (len(ims) + a.columnas - 1) // a.columnas
    hoja = Image.new('RGB', (a.columnas * (w + 4), filas * (h + 18)), (25, 25, 25))
    d = ImageDraw.Draw(hoja)
    for i, im in enumerate(ims):
        x, y = (i % a.columnas) * (w + 4), (i // a.columnas) * (h + 18)
        hoja.paste(im, (x, y))
        d.text((x + 3, y + h + 3), f'f{i * a.cada} · {i * a.cada / 30:.1f} s', fill=(255, 220, 0))
    hoja.save(salida)
    print(salida, f'{len(ims)} fotogramas')


if __name__ == '__main__':
    main()
