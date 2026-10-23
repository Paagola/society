"""Primer paso para llevar la v3 a Figma como capas editables (no como imagen).

Escribe v3/figma/base.html: las seis pantallas en un solo HTML sin nada externo,
porque la herramienta html_to_figma de Figma no descarga recursos:
  · las letras DynaPuff y Nunito van dentro, en woff2 (subconjuntos latin y latin-ext);
  · las imágenes van dentro, reducidas a 2x de su tamaño en pantalla;
  · el logo pierde el fondo blanco (en la maqueta se quitaba con mix-blend-mode);
  · el cristal líquido pasa a cristal estático (velo, desenfoque de fondo y cantos de
    luz), porque la refracción de liquido.js usa un filtro SVG que Figma no entiende.

El segundo paso es exportar_figma.cjs, que abre este HTML en Chromium y deja los
iconos y los pseudoelementos como capas reales. Hace falta haber corrido antes
preparar_escenas.py (fondo y poses de la mascota en ../img/v3/)."""
import base64, io, re, urllib.request
from pathlib import Path
from PIL import Image

aqui = Path(__file__).parent
img = aqui.parent / "img"
salida = aqui / "figma"
salida.mkdir(exist_ok=True)


def dato(ruta, alto=None, ancho=None):
    im = Image.open(ruta)
    escala = min(1, (alto or 10**6) / im.height, (ancho or 10**6) / im.width)
    if escala < 1:
        im = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
    b = io.BytesIO()
    if im.mode in ("RGBA", "LA", "P"):
        im.convert("RGBA").save(b, "PNG", optimize=True)
        tipo = "png"
    else:
        im.convert("RGB").save(b, "JPEG", quality=84, optimize=True, progressive=True)
        tipo = "jpeg"
    return f"data:image/{tipo};base64," + base64.b64encode(b.getvalue()).decode()


def logo_sin_fondo(ruta, alto):
    """Quita el blanco como lo haría mix-blend-mode:multiply sobre cualquier fondo."""
    im = Image.open(ruta).convert("RGB")
    im = im.resize((round(im.width * alto / im.height), alto), Image.LANCZOS)
    px = []
    for r, g, b in im.getdata():
        a = 255 - min(r, g, b)
        if a == 0:
            px.append((0, 0, 0, 0))
        else:
            f = lambda c: max(0, min(255, round((c - (255 - a)) * 255 / a)))
            px.append((f(r), f(g), f(b), a))
    out = Image.new("RGBA", im.size)
    out.putdata(px)
    b = io.BytesIO()
    out.save(b, "PNG", optimize=True)
    return "data:image/png;base64," + base64.b64encode(b.getvalue()).decode()


def letras():
    pide = urllib.request.Request(
        "https://fonts.googleapis.com/css2?family=DynaPuff:wght@400..700&family=Nunito:wght@400..900&display=block",
        headers={"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"})
    css = urllib.request.urlopen(pide).read().decode()
    bloques = re.findall(r"/\* (latin(?:-ext)?) \*/\s*(@font-face\s*\{[^}]*\})", css)
    def mete(m):
        return "url(data:font/woff2;base64," + base64.b64encode(urllib.request.urlopen(m.group(1)).read()).decode() + ")"
    return "\n".join(re.sub(r"url\((https://[^)]+)\)", mete, b) for _, b in bloques)


# Cristal estático: lo mismo que .brillo de liquido.css, pero en la propia pieza
CRISTAL = """
.liquido{
  background:linear-gradient(180deg,rgba(255,255,255,var(--velo-a,.30)),rgba(255,255,255,var(--velo-b,.14)));
  -webkit-backdrop-filter:blur(calc(var(--desenfoque,6) * 1px)) saturate(var(--saturacion,170%));
  backdrop-filter:blur(calc(var(--desenfoque,6) * 1px)) saturate(var(--saturacion,170%));
  box-shadow:0 18px 36px -16px rgba(12,16,40,.42),0 2px 6px -2px rgba(12,16,40,.18),
    inset 0 1.5px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.30),inset 0 0 0 .75px rgba(255,255,255,.45)}
.liquido.tinta{background:linear-gradient(180deg,rgba(22,22,30,.62),rgba(22,22,30,.74))}
.marca img{mix-blend-mode:normal}
"""

html = (aqui / "index.html").read_text()
css = (aqui / "v3.css").read_text()

css = css.replace("url(../img/v3/fondo.jpg)", "url(" + dato(img / "v3" / "fondo.jpg", ancho=780) + ")")
for foto in ("terraza", "salon", "ensalada"):
    html = html.replace(f"url(../img/{foto}.jpg)", "url(" + dato(img / f"{foto}.jpg", ancho=700) + ")")
for ruta in sorted((img / "v3").glob("p-*.png")):
    pose = ruta.stem[2:]
    html = html.replace(f'src="../img/v3/{ruta.name}"', f'data-pose="{pose}" src="{dato(ruta, alto=320)}"')
html = html.replace('src="../img/logo.png"', f'src="{logo_sin_fondo(img / "logo.png", 78)}"')

html = re.sub(r'<link[^>]*fonts.googleapis[^>]*>\s*', "", html)
html = html.replace('<link rel="stylesheet" href="liquido.css">', "")
html = html.replace('<link rel="stylesheet" href="v3.css">', "<style>\n" + letras() + "\n" + css + CRISTAL + "</style>")
html = html.replace('<script src="liquido.js"></script>', "")

assert "../img/" not in html and "liquido.js" not in html, "queda algún recurso externo"
(salida / "base.html").write_text(html)
print("base.html", round(len(html) / 1e6, 2), "MB")
