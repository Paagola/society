"""Descarga las escenas y los personajes de la v3 (escenas.tsv) y los deja en
img/v3/: las escenas eN.jpg a 1170 px de ancho (390 pt a @3x) y los
personajes pN.png sin margen transparente y a 900 px de alto."""
import io, urllib.request
from pathlib import Path
from PIL import Image

aqui = Path(__file__).parent
dest = aqui.parent / "img" / "v3"
dest.mkdir(parents=True, exist_ok=True)
for linea in (aqui / "escenas.tsv").read_text().splitlines():
    if not linea.strip() or linea.startswith("#"):
        continue
    cid, que, recorte, url = linea.split("\t")
    im = Image.open(io.BytesIO(urllib.request.urlopen(url).read()))
    if cid.startswith("e"):
        # El recorte quita los marcos de viñeta que a veces dibuja el modelo
        if recorte != "-":
            im = im.crop(tuple(int(n) for n in recorte.split(",")))
        im = im.convert("RGB")
        im = im.resize((1170, round(im.height * 1170 / im.width)), Image.LANCZOS)
        im.save(dest / f"{cid}.jpg", quality=88, optimize=True, progressive=True)
    else:
        im = im.convert("RGBA")
        im = im.crop(im.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
        if im.height > 900:
            im = im.resize((round(im.width * 900 / im.height), 900), Image.LANCZOS)
        im.save(dest / f"{cid}.png", optimize=True)
    print(cid, que, im.size)
