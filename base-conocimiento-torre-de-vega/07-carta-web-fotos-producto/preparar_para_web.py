# -*- coding: utf-8 -*-
"""Prepara las imagenes de carta_web/raw para servirlas en la web.

Que hace y por que
------------------
Las imagenes se generaron sobre un fondo blanco liso con una sombra de contacto
real bajo el plato. La idea inicial era recortarlas a alfa, pero NO se puede:

 * Un flood-fill por umbral no distingue la porcelana blanca del fondo blanco,
   asi que se come el plato (probado: se mordia el plato del jamon y la bandeja
   de las croquetas).
 * El recorte neuronal de Higgsfield (`remove_background`) sirve solo la comida:
   elimina el plato Y la mano. Rompe la regla 1 de continuidad (el plato de
   barro del local es parte de la promesa) y tira el gesto que pidio el cliente.

Solucion: no se recorta. Se NORMALIZA el fondo a blanco puro #FFFFFF y en la web
se elimina con `mix-blend-mode: multiply`, que sobre cualquier fondo claro deja
pasar el fondo intacto y conserva la sombra de contacto. El plato blanco y la
mano quedan enteros.

Solo se tocan los pixeles de fondo CONECTADOS al borde del encuadre y que ya
estan a menos de TOL del blanco, asi que nada del interior del plato se altera.

Salida:
  web/<id>.webp  -> lo que sirve la pagina
  web/<id>.png   -> el mismo fotograma sin comprimir, por si hace falta reeditar
"""
import os
import numpy as np
from scipy import ndimage
from PIL import Image

BASE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(BASE, "raw")
OUT = os.path.join(BASE, "web")

TOL = 6       # tras corregir el punto blanco, margen para aplanar el fondo a #FFF
SIZE = 1080   # lado del entregable


def preparar(path):
    im = Image.open(path).convert("RGB")
    arr = np.asarray(im).astype(np.float32)

    # 1. Corregir el punto blanco. Algunas generaciones traen el fondo a ~#EDEDED
    #    en vez de #FFFFFF; se escala cada canal para que ese gris sea blanco puro.
    #    Es un ajuste global y suave (factor ~1.08), no toca la geometria de nada.
    e = 40
    esquinas = np.concatenate([arr[:e, :e], arr[:e, -e:], arr[-e:, :e], arr[-e:, -e:]])
    fondo = np.median(esquinas.reshape(-1, 3), axis=0)
    fondo = np.maximum(fondo, 200.0)            # nunca aclarar de forma agresiva
    arr = np.clip(arr * (255.0 / fondo), 0, 255)

    # 2. Aplanar a #FFFFFF exacto solo el fondo CONECTADO al borde del encuadre,
    #    para que `mix-blend-mode: multiply` lo deje pasar limpio. Nada del
    #    interior del plato se altera.
    dist = (255 - arr).max(axis=2)
    etiquetas, _ = ndimage.label(dist <= TOL)
    borde = np.concatenate([etiquetas[0, :], etiquetas[-1, :],
                            etiquetas[:, 0], etiquetas[:, -1]])
    arr[np.isin(etiquetas, np.unique(borde[borde > 0]))] = 255
    im = Image.fromarray(arr.astype(np.uint8))

    # 3. Encuadrar al sujeto (incluida su sombra) dejando un 4% de aire
    tinta = (255 - arr).max(axis=2) > TOL
    ys, xs = np.where(tinta)
    if len(xs):
        m = int(max(im.size) * 0.04)
        caja = (max(0, xs.min() - m), max(0, ys.min() - m),
                min(im.width, xs.max() + m), min(im.height, ys.max() + m))
        im = im.crop(caja)

    lado = max(im.size)
    lienzo = Image.new("RGB", (lado, lado), (255, 255, 255))
    lienzo.paste(im, ((lado - im.width) // 2, (lado - im.height) // 2))
    return lienzo.resize((SIZE, SIZE), Image.LANCZOS)


def main():
    os.makedirs(OUT, exist_ok=True)
    for f in sorted(os.listdir(SRC)):
        if not f.lower().endswith(".png"):
            continue
        im = preparar(os.path.join(SRC, f))
        base = f[:-4]
        im.save(os.path.join(OUT, base + ".png"))
        im.save(os.path.join(OUT, base + ".webp"), quality=86, method=4)
        a = np.asarray(im)
        blanco = 100 * (a == 255).all(axis=2).mean()
        kb = os.path.getsize(os.path.join(OUT, base + ".webp")) / 1024
        print("%-34s fondo blanco puro %.1f%%   webp %.0f KB" % (base, blanco, kb))


if __name__ == "__main__":
    main()
