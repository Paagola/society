"""Maqueta del carrusel "Anatomía de una pizza" (Da Tonino) sobre las fotos generadas.

Sistema visual copiado de la referencia "Dinner Light" (posts/image copy 2.png):
etiquetas pequeñas arriba, título serif romana fina en mayúsculas, acento caligráfico,
píldora de reserva con borde fino abajo. 1080x1350 (4:5).
Fuentes OFL (Google Fonts): Cinzel, Montserrat, Pinyon Script.
"""
import pathlib
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = pathlib.Path(__file__).resolve().parent
IMG, OUT = BASE / "fotos", BASE / "laminas"
OUT.mkdir(exist_ok=True)
F = BASE / "fuentes"
W, H = 1080, 1350
WHITE = (246, 241, 233)
SOFT = (214, 206, 194)

def font(name, size, weight=None):
    f = ImageFont.truetype(str(F / name), size)
    if weight:
        try: f.set_variation_by_axes([weight])
        except Exception: pass
    return f

def tracked(d, xy, text, f, fill, spacing=0, anchor="l"):
    """Texto con tracking; anchor l/c/r sobre x."""
    widths = [d.textlength(c, font=f) for c in text]
    total = sum(widths) + spacing * (len(text) - 1)
    x, y = xy
    if anchor == "c": x -= total / 2
    if anchor == "r": x -= total
    for c, w in zip(text, widths):
        d.text((x, y), c, font=f, fill=fill); x += w + spacing
    return total

def base(photo, dim_top=0.55, dim_bottom=0.45, extra_dim=0.0):
    im = Image.open(IMG / photo).convert("RGB")
    # recorte a 4:5 centrado
    r = im.width / im.height
    if r > W / H:
        nw = int(im.height * W / H); im = im.crop(((im.width - nw) // 2, 0, (im.width + nw) // 2, im.height))
    else:
        nh = int(im.width * H / W); im = im.crop((0, (im.height - nh) // 2, im.width, (im.height + nh) // 2))
    im = im.resize((W, H), Image.LANCZOS)
    # degradados suaves arriba y abajo para leer el texto sin cambiar la luz del plato
    g = Image.new("L", (1, H))
    for y in range(H):
        t = max(0, 1 - y / (H * 0.42)) * dim_top + max(0, (y - H * 0.80) / (H * 0.20)) * dim_bottom + extra_dim
        g.putpixel((0, y), int(255 * min(t, 0.92)))
    g = g.resize((W, H))
    black = Image.new("RGB", (W, H), (6, 5, 4))
    return Image.composite(black, im, g)

def chrome(d, n, total=7):
    small = font("Montserrat.ttf", 22, 300)
    d.text((44, 38), "Da Tonino", font=small, fill=SOFT)
    tracked(d, (W - 44, 38), "Ristorante", small, SOFT, 0, "r")
    tracked(d, (W / 2, 38), f"{n:02d} / {total:02d}", font("Montserrat.ttf", 18, 300), SOFT, 3, "c")

def pill(d, left, right, y=H - 110):
    f = font("Montserrat.ttf", 23, 300)
    d.rounded_rectangle((44, y, W - 44, y + 58), radius=29, outline=(230, 224, 214), width=2)
    d.text((80, y + 16), left, font=f, fill=WHITE)
    tracked(d, (W - 80, y + 16), right, f, WHITE, 0, "r")

def title_block(d, lines, y, size=112, script=None, sub=None, align="c"):
    f = font("Cinzel.ttf", size, 400)
    x = W / 2 if align == "c" else 60
    for i, line in enumerate(lines):
        tracked(d, (x, y + i * size * 1.02), line, f, WHITE, 4, "c" if align == "c" else "l")
    yy = y + len(lines) * size * 1.02
    if script:
        fs = font("PinyonScript.ttf", int(size * 0.72))
        tw = d.textlength(script, font=fs)
        d.text((x - tw / 2 if align == "c" else x, yy + size * 0.06), script, font=fs, fill=WHITE)
        yy += size * 0.86
    if sub:
        fsub = font("Montserrat.ttf", 30, 300)
        for j, sline in enumerate(sub.split("\n")):
            tw = d.textlength(sline, font=fsub)
            d.text((x - tw / 2 if align == "c" else x, yy + 18 + j * 42), sline, font=fsub, fill=SOFT)

SLIDES = [
    ("01-portada.png", dict(lines=["PROSCIUTTO", "E RUCOLA"], script="anatomía de una pizza", sub="Desliza  →"), 120, {}),
    ("02-borde.png", dict(lines=["EL BORDE"], sub="Cornicione alto, aireado\ny moteado por el horno."), 120, {}),
    ("03-prosciutto.png", dict(lines=["EL PROSCIUTTO"], size=96, sub="Crudo, en lonchas finas,\nsobre tomate y mozzarella."), 120, {}),
    ("04-rucula.png", dict(lines=["LA RÚCULA"], sub="Fresca, al final,\ncon la pizza recién salida."), 120, {}),
    ("05-porcion.png", dict(lines=["LA PRIMERA", "PORCIÓN"], size=96), 100, {}),
    ("06-mesa.png", dict(lines=["EN LA MESA"], sub="Con una caña fría,\nen Da Tonino."), 120, {}),
]

for i, (photo, tb, y, dims) in enumerate(SLIDES, 1):
    im = base(photo, **dims); d = ImageDraw.Draw(im)
    chrome(d, i)
    title_block(d, y=y, **tb)
    pill(d, "Reserva tu mesa", "Link en bio")
    im.save(OUT / f"{i:02d}.jpg", quality=95)

# 07 · CTA: la mesa del local, más oscura, con un solo llamado a la acción
im = base("06-mesa.png", dim_top=0.75, dim_bottom=0.6, extra_dim=0.25); d = ImageDraw.Draw(im)
chrome(d, 7)
title_block(d, ["RESERVA", "TU MESA"], y=400, size=120, script="Da Tonino", sub="Mándaselo a quien\nte debe una pizza.")
pill(d, "Da Tonino ristorante", "Link en bio")
im.save(OUT / "07.jpg", quality=95)

# hoja de revisión
thumbs = [Image.open(OUT / f"{i:02d}.jpg").resize((270, 338)) for i in range(1, 8)]
sheet = Image.new("RGB", (270 * 7 + 6 * 8, 338), (20, 20, 20))
for i, t in enumerate(thumbs): sheet.paste(t, (i * 278, 0))
sheet.save(BASE / "hoja-carrusel.jpg", quality=90)
print("ok")
