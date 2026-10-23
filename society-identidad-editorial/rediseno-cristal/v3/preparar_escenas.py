"""Descarga las imágenes generadas de la v3 (escenas.tsv) y las deja en img/v3/:
los fondos como .jpg a tamaño original y los recortes con transparencia (id que
empieza por «p») como .png sin margen y a 900 px de alto. Los recortes son las
poses nuevas de la mascota oficial; las poses originales están en img/mascota/."""
import io, urllib.request
import numpy as np
from pathlib import Path
from PIL import Image, ImageFilter, ImageOps


def limpiar(recorte, url_original):
    """Arregla lo que deja el quitafondos de Higgsfield comparando con la
    imagen original: borra el fondo gris que queda dentro de la aureola y
    recupera los trazos amarillos sueltos, que el quitafondos tira."""
    a = np.array(recorte).astype(int)
    o = np.array(Image.open(io.BytesIO(urllib.request.urlopen(url_original).read())).convert("RGB")).astype(int)
    bordes = np.concatenate([o[:8].reshape(-1, 3), o[-8:].reshape(-1, 3), o[:, :8].reshape(-1, 3), o[:, -8:].reshape(-1, 3)])
    distancia = np.sqrt(((o - np.median(bordes, axis=0)) ** 2).sum(-1))
    a[(distancia < 22) & (a[..., 3] < 245), 3] = 0
    r, g, b = o[..., 0], o[..., 1], o[..., 2]
    amarillo = (r > 170) & (g > 110) & (r - b > 90)
    a[amarillo, :3] = o[amarillo]
    a[amarillo, 3] = 255
    return Image.fromarray(a.astype("uint8"))


aqui = Path(__file__).parent
dest = aqui.parent / "img" / "v3"
dest.mkdir(parents=True, exist_ok=True)
for linea in (aqui / "escenas.tsv").read_text().splitlines():
    if not linea.strip() or linea.startswith("#"):
        continue
    cid, que, ajuste, url = linea.split("\t")
    im = Image.open(io.BytesIO(urllib.request.urlopen(url).read()))
    if not cid.startswith("p"):
        im = im.convert("RGB")
        tipo, _, valor = ajuste.partition(":")
        if tipo == "recorte":
            # quita los marcos de viñeta que a veces dibuja el modelo
            im = im.crop(tuple(int(n) for n in valor.split(",")))
        elif tipo == "espejo-izq":
            # alarga la pared por la izquierda con su reflejo, para que el
            # personaje quede más a la derecha y más pequeño
            p = int(im.width * float(valor))
            ancha = Image.new("RGB", (im.width + p, im.height))
            ancha.paste(ImageOps.mirror(im.crop((0, 0, p, im.height))), (0, 0))
            ancha.paste(im, (p, 0))
            im = ancha
        im.save(dest / f"{cid}.jpg", quality=88, optimize=True, progressive=True)
    else:
        im = im.convert("RGBA")
        ajustes = dict(a.partition(":")[::2] for a in ajuste.split(";") if a != "-")
        if "original" in ajustes:
            im = limpiar(im, ajustes["original"])
        im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        if im.height > 900:
            im = im.resize((round(im.width * 900 / im.height), 900), Image.LANCZOS)
        if "contorno" in ajustes:
            # borde blanco de pegatina, para que la sudadera azul se vea sobre
            # una tarjeta del mismo azul
            g = int(ajustes["contorno"])
            lienzo = Image.new("RGBA", (im.width + 2 * g, im.height + 2 * g))
            lienzo.paste(im, (g, g))
            borde = lienzo.getchannel("A").filter(ImageFilter.GaussianBlur(g / 2))
            borde = borde.point(lambda a: 255 if a > 10 else 0).filter(ImageFilter.GaussianBlur(1.2))
            fondo = Image.new("RGBA", lienzo.size, (255, 255, 255, 0))
            fondo.putalpha(borde)
            im = Image.alpha_composite(fondo, lienzo)
        im.save(dest / f"{cid}.png", optimize=True)
    print(cid, que, im.size)
