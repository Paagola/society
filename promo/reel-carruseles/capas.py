#!/usr/bin/env python3
"""Separa las letras del post E1 en capas transparentes para el reel v4.

    python3 capas.py   → assets/reel/capa_fuego.png (rótulo y cabecera) y assets/reel/capa_pie.png (pie)

Las letras del post son color crema sobre fondo oscuro: se recortan por luminancia y poca saturación,
así la capa coincide píxel a píxel con el post terminado cuando se acopla. Del rótulo grande solo se
quedan las manchas grandes (las letras); los brillos del hueso y del plato se descartan.
"""
import numpy as np
from PIL import Image
from scipy import ndimage

im = np.asarray(Image.open('assets/posts/E1.jpg').convert('RGB')).astype(np.float32)
h, w, _ = im.shape
lum = im @ np.array([0.2126, 0.7152, 0.0722])
sat = im.max(2) - im.min(2)
alfa = np.clip((lum - 110) / 70, 0, 1) * np.clip((60 - sat) / 30, 0, 1)


def guarda(a, salida):
    Image.fromarray(np.dstack([im, a * 255]).astype(np.uint8), 'RGBA').save(salida, optimize=True)


# rótulo: cabecera entera (y < 100) y, debajo, solo las letras grandes
fuego = np.zeros((h, w))
fuego[:100] = alfa[:100]
banda = np.zeros((h, w)); banda[100:620] = alfa[100:620]
nucleo = ndimage.binary_erosion(banda > 0.8, iterations=3)          # rompe los hilos que unen la O con el plato
etq, n = ndimage.label(nucleo)
tam = ndimage.sum(nucleo, etq, range(1, n + 1))
grandes = np.isin(etq, [i + 1 for i, t in enumerate(tam) if t > 15000])
mascara = ndimage.binary_dilation(grandes, iterations=6)
calido = np.clip((im[..., 0] - im[..., 2] - 4) / 6, 0, 1)        # la crema tira a cálido; el plato es gris
fuego += banda * mascara * calido
yy, xx = np.mgrid[0:h, 0:w]
fuego[(xx > 840) & (yy > 488 + (xx - 850) * 0.48)] = 0              # el borde del plato que asoma bajo la O
guarda(np.clip(fuego, 0, 1), 'assets/reel/capa_fuego.png')

# pie: las dos líneas de abajo a la izquierda
pie = np.zeros((h, w)); pie[1245:1315, :440] = alfa[1245:1315, :440]
guarda(pie, 'assets/reel/capa_pie.png')
print('capas listas')
