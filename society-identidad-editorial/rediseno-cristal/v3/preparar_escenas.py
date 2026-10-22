"""Descarga las imágenes generadas de la v3 (escenas.tsv) y las deja en img/v3/:
los fondos como .jpg a tamaño original y los recortes con transparencia (id que
empieza por «p») como .png sin margen y a 900 px de alto. La mascota no se
genera: es la oficial y está en img/mascota/."""
import io, urllib.request
from pathlib import Path
from PIL import Image, ImageOps

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
        im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        if im.height > 900:
            im = im.resize((round(im.width * 900 / im.height), 900), Image.LANCZOS)
        im.save(dest / f"{cid}.png", optimize=True)
    print(cid, que, im.size)
