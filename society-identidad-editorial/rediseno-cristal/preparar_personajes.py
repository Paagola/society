"""Descarga los personajes sin fondo (personajes.tsv), recorta el margen
transparente y los deja en img/personajes/cN.png a 1000 px de alto."""
import io, sys, urllib.request
from pathlib import Path
from PIL import Image

aqui = Path(__file__).parent
dest = aqui / "img" / "personajes"
dest.mkdir(parents=True, exist_ok=True)
for linea in (aqui / "personajes.tsv").read_text().splitlines():
    cid, nombre, trabajo, url = linea.split("\t")
    im = Image.open(io.BytesIO(urllib.request.urlopen(url).read())).convert("RGBA")
    caja = im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    im = im.crop(caja)
    if im.height > 1000:
        im = im.resize((round(im.width * 1000 / im.height), 1000), Image.LANCZOS)
    im.save(dest / f"{cid}.png", optimize=True)
    print(cid, nombre, im.size)
