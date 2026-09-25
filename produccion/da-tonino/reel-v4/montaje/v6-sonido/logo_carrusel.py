"""Logo del cierre del reel v6 con la tipografía del carrusel «Anatomía de una pizza».

Mismo sistema que pruebas/carrusel-da-tonino-2026-09-25/maquetar.py (repo Society):
Cinzel (título en mayúsculas, tracking), Pinyon Script (acento), Montserrat Light (texto pequeño
con tracking), colores crema (246,241,233) y piedra (214,206,194). Sustituye al logo de la v5
(Playfair Display cursiva + Schibsted Grotesk). PNG 2160x3840 con alfa; la copia 1080 se escala.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

F = Path(__file__).resolve().parents[5] / "pruebas" / "carrusel-da-tonino-2026-09-25" / "fuentes"
OUT = Path(__file__).resolve().parent.parent / "logo-carrusel-4k.png"
W, H = 2160, 3840
WHITE = (246, 241, 233, 255)
SOFT = (214, 206, 194, 255)

def font(name, size, weight=None):
    f = ImageFont.truetype(str(F / name), size)
    if weight:
        try: f.set_variation_by_axes([weight])
        except Exception: pass
    return f

def tracked(d, cx, y, text, f, fill, spacing):
    widths = [d.textlength(c, font=f) for c in text]
    x = cx - (sum(widths) + spacing * (len(text) - 1)) / 2
    for c, w in zip(text, widths):
        d.text((x, y), c, font=f, fill=fill); x += w + spacing

text = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(text)
cx = W / 2
# posición vertical equivalente a la del logo de la v5 (tercio central)
tracked(d, cx, 1560, "DA TONINO", font("Cinzel.ttf", 250, 400), WHITE, 10)
fs = font("PinyonScript.ttf", 190)
tw = d.textlength("Ristorante", font=fs)
d.text((cx - tw / 2, 1850), "Ristorante", font=fs, fill=WHITE)
d.line((cx - 120, 2140, cx + 120, 2140), fill=SOFT, width=3)
tracked(d, cx, 2200, "RESERVA TU MESA", font("Montserrat.ttf", 58, 300), SOFT, 14)

# sombra suave para que se lea sobre la sala (como la v5), sin contorno
shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
shadow.putalpha(text.split()[3].filter(ImageFilter.GaussianBlur(28)).point(lambda a: int(a * 0.75)))
logo = Image.alpha_composite(shadow, text)
OUT.parent.mkdir(parents=True, exist_ok=True)
logo.save(OUT)
print(OUT)
