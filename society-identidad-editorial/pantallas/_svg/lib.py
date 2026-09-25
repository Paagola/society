"""Utilidades para montar las pantallas en SVG: fuentes a contorno, texto editable, imágenes e iconos."""
import base64
import io
import subprocess
from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

AQUI = Path(__file__).resolve().parent
FUENTES = AQUI / "fuentes"
ASSETS = AQUI.parent / "_assets" / "listos"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

TINTA, PAPEL, COBALTO, MOSTAZA = "#141414", "#ECE8DC", "#2440E0", "#F5C518"
TARJETA = "#F4F1E8"


def n(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


class Fuente:
    def __init__(self, archivo, wght=None):
        ruta = str(FUENTES / archivo)
        self.tt = TTFont(ruta)
        self.hbf = hb.Font(hb.Face(hb.Blob.from_file_path(ruta)))
        loc = {"wght": wght} if wght else None
        if wght:
            self.hbf.set_variations(loc)
        self.gs = self.tt.getGlyphSet(location=loc) if wght else self.tt.getGlyphSet()
        self.orden = self.tt.getGlyphOrder()
        self.upem = self.tt["head"].unitsPerEm

    def _glifos(self, s, size, track=0):
        buf = hb.Buffer()
        buf.add_str(s)
        buf.guess_segment_properties()
        hb.shape(self.hbf, buf, {})
        sc = size / self.upem
        cx = 0.0
        for info, p in zip(buf.glyph_infos, buf.glyph_positions):
            yield self.orden[info.codepoint], cx + p.x_offset * sc, -p.y_offset * sc, sc
            cx += p.x_advance * sc + track

    def _dibuja(self, pen, s, size, x, y, track=0):
        for nombre, gx, gy, sc in self._glifos(s, size, track):
            self.gs[nombre].draw(TransformPen(pen, (sc, 0, 0, -sc, x + gx, y + gy)))

    def caja(self, s, size=100, track=0):
        bp = BoundsPen(self.gs)
        self._dibuja(bp, s, size, 0, 0, track)
        return bp.bounds

    def ancho_avance(self, s, size, track=0):
        return sum(1 for _ in self._glifos(s, size, track)) and \
            list(self._glifos(s + " ", size, track))[-1][1]

    def path(self, s, size, x, y, track=0):
        pen = SVGPathPen(self.gs, ntos=n)
        self._dibuja(pen, s, size, x, y, track)
        return pen.getCommands()

    def en_caja(self, s, x, y, w, h, track=0):
        """Trazado del texto escalado para que su contorno ocupe exactamente la caja (x, y, w, h)."""
        x0, y0, x1, y1 = self.caja(s, 100, track)
        sx, sy = w / (x1 - x0), h / (y1 - y0)
        # SVG: y hacia abajo; la caja de fontTools está en y hacia abajo tras la transformación (-sc)
        d = self.path(s, 100, 0, 0, track)
        return f'<path d="{d}" transform="translate({n(x - x0 * sx)} {n(y - y0 * sy)}) scale({n(sx)} {n(sy)})"/>'


ANTON = Fuente("Anton-Regular.ttf")
SERIF = Fuente("PlayfairDisplay-Italic.ttf", 900)
SERIF_REG = Fuente("PlayfairDisplay-Italic.ttf", 620)


def img_b64(nombre, max_lado=None, calidad=None):
    im = Image.open(ASSETS / nombre)
    if max_lado:
        im.thumbnail((max_lado, max_lado))
    buf = io.BytesIO()
    if calidad and im.mode == "RGB":
        im.save(buf, "JPEG", quality=calidad)
        mime = "image/jpeg"
    else:
        im.save(buf, "PNG", optimize=True)
        mime = "image/png"
    return f"data:{mime};base64," + base64.b64encode(buf.getvalue()).decode()


class Pantalla:
    def __init__(self, nombre, oscura=False):
        self.nombre = nombre
        self.oscura = oscura
        self.partes = []
        self.defs = []
        self._id = 0

    def uid(self, p="c"):
        self._id += 1
        return f"{p}{self._id}"

    def add(self, s, capa=None):
        self.partes.append(f'<g id="{capa}">{s}</g>' if capa else s)

    # --- elementos
    def rect(self, x, y, w, h, fill="none", r=0, stroke=None, sw=0, capa=None, opacity=None):
        st = f' stroke="{stroke}" stroke-width="{n(sw)}"' if stroke else ""
        op = f' opacity="{opacity}"' if opacity is not None else ""
        self.add(f'<rect x="{n(x)}" y="{n(y)}" width="{n(w)}" height="{n(h)}" rx="{n(r)}" fill="{fill}"{st}{op}/>', capa)

    def imagen(self, nombre, x, y, w, h, r=0, capa=None, ajuste="xMidYMid slice", max_lado=None, calidad=None):
        href = img_b64(nombre, max_lado, calidad)
        clip = ""
        if r:
            cid = self.uid("clip")
            self.defs.append(f'<clipPath id="{cid}"><rect x="{n(x)}" y="{n(y)}" width="{n(w)}" height="{n(h)}" rx="{n(r)}"/></clipPath>')
            clip = f' clip-path="url(#{cid})"'
        self.add(f'<g{clip}><image xlink:href="{href}" x="{n(x)}" y="{n(y)}" width="{n(w)}" height="{n(h)}" '
                 f'preserveAspectRatio="{ajuste}"/></g>', capa)

    def titular(self, fuente, s, x, y, w, h, fill, capa=None, track=0):
        self.add(f'<g fill="{fill}">{fuente.en_caja(s, x, y, w, h, track)}</g>', capa or s)

    def texto(self, s, x, y, size, fill, peso=400, familia="Schibsted Grotesk", anclaje="start", italic=False,
              ls=None, capa=None, lineas=None, lh=None):
        """Texto editable. y es la línea base de la primera línea."""
        est = ' font-style="italic"' if italic else ""
        lsp = f' letter-spacing="{n(ls)}"' if ls is not None else ""
        lineas = lineas or [s]
        tsp = "".join(
            f'<tspan x="{n(x)}" y="{n(y + i * (lh or size * 1.25))}">{esc(l)}</tspan>' for i, l in enumerate(lineas))
        self.add(f'<text font-family="{familia}" font-weight="{peso}" font-size="{n(size)}" fill="{fill}" '
                 f'text-anchor="{anclaje}"{est}{lsp}>{tsp}</text>', capa)

    def boton(self, x, y, w, h, fill, texto, size, color, peso=900, stroke=None, sw=2, capa="Botón", icono=None,
              ls=None):
        self.partes.append(f'<g id="{capa}">')
        self.rect(x, y, w, h, fill, r=h / 2, stroke=stroke, sw=sw)
        cx = x + w / 2 - (10 if icono else 0)
        self.texto(texto, cx, y + h / 2 + size * 0.36, size, color, peso, anclaje="middle", ls=ls)
        if icono:
            f = Fuente("SchibstedGrotesk.ttf", peso)
            ancho = f.caja(texto, size)[2]
            self.add(icono(cx + ancho / 2 + 10, y + h / 2, color))
        self.partes.append("</g>")

    def svg(self, extra_defs=""):
        fondo = TINTA if self.oscura else PAPEL
        return (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            'width="390" height="844" viewBox="0 0 390 844">'
            f"<defs>{FONT_FACE}{''.join(self.defs)}{extra_defs}</defs>"
            f'<rect width="390" height="844" fill="{fondo}"/>'
            + "".join(self.partes) + "</svg>\n"
        )


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


FONT_FACE = """<style>
@font-face{font-family:'Schibsted Grotesk';src:url('fuentes/SchibstedGrotesk.ttf');font-weight:100 900}
@font-face{font-family:'Anton';src:url('fuentes/Anton-Regular.ttf')}
@font-face{font-family:'Playfair Display';src:url('fuentes/PlayfairDisplay-Italic.ttf');font-style:italic;font-weight:100 900}
@font-face{font-family:'Space Mono';src:url('fuentes/SpaceMono-Regular.ttf')}
</style>"""


def render(svg_path, png_path, escala=1):
    svg_path, png_path = Path(svg_path).resolve(), Path(png_path).resolve()
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-sandbox",
                    "--allow-file-access-from-files", "--virtual-time-budget=5000",
                    f"--force-device-scale-factor={escala}", "--window-size=390,844",
                    f"--screenshot={png_path}", svg_path.as_uri()], check=True, capture_output=True, timeout=120)
