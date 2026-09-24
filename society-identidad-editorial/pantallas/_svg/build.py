"""Genera las 7 pantallas en SVG (importables en Figma) y sus PNG de control."""
import sys
from pathlib import Path

from lib import (ANTON, COBALTO, MOSTAZA, PAPEL, SERIF, SERIF_REG, TARJETA, TINTA, Fuente, Pantalla, n,
                 render)

SALIDA = Path(__file__).resolve().parent.parent  # pantallas/
SERIF_ROMAN = Fuente("PlayfairDisplay.ttf", 900)
BLANCO = "#FFFFFF"


# ------------------------------------------------------------------ piezas comunes
def icono(d, x, y, size, color, stroke=True, sw=2, box=24, extra=""):
    s = size / box
    attrs = (f'fill="none" stroke="{color}" stroke-width="{n(sw / s)}" stroke-linecap="round" stroke-linejoin="round"'
             if stroke else f'fill="{color}"')
    return f'<g transform="translate({n(x)} {n(y)}) scale({n(s)})" {attrs}>{d}{extra}</g>'


I = {
    "atras": '<path d="M15 4 L7 12 L15 20"/>',
    "cerrar": '<path d="M5 5 L19 19 M19 5 L5 19"/>',
    "buscar": '<circle cx="10.5" cy="10.5" r="7"/><path d="M16 16 L21 21"/>',
    "flecha": '<path d="M3 12 H21 M14 5 L21 12 L14 19"/>',
    "pin": '<path d="M12 21.5s-7-6.3-7-11.8a7 7 0 0 1 14 0c0 5.5-7 11.8-7 11.8z"/><circle cx="12" cy="9.7" r="2.6"/>',
    "corazon": '<path d="M12 20.5s-8.5-5.2-8.5-11.2A4.8 4.8 0 0 1 12 6.4a4.8 4.8 0 0 1 8.5 2.9c0 6-8.5 11.2-8.5 11.2z"/>',
    "comentario": '<path d="M20.6 16.4A9 9 0 1 0 17 19.9L21.5 21z"/>',
    "enviar": '<path d="M22 3 L2.5 10.5 L10 13.5 L13 21 Z M10 13.5 L22 3"/>',
    "guardar": '<path d="M5.5 3 H18.5 V21 L12 15.5 L5.5 21 Z"/>',
    "instagram": '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.5"/>'
                 '<circle cx="17.6" cy="6.4" r="0.6" fill="currentColor"/>',
    "inicio": '<path d="M3 10.5 L12 3 L21 10.5 V20.5 A0.8 0.8 0 0 1 20.2 21.3 H14.5 V15 H9.5 V21.3 H3.8 A0.8 0.8 0 0 1 3 20.5 Z"/>',
    "calendario": '<rect x="3" y="4.5" width="18" height="16.5" rx="3"/><path d="M3 9.5 H21 M8 2.5 V6.5 M16 2.5 V6.5"/>'
                  '<path d="M7 13 h2 M11 13 h2 M15 13 h2 M7 17 h2 M11 17 h2"/>',
    "resultados": '<path d="M5 21 V14 M9.7 21 V10 M14.3 21 V12.5 M19 21 V5.5"/>',
    "perfil": '<circle cx="12" cy="8" r="4.3"/><path d="M4 21.5 a8 8 0 0 1 16 0"/>',
    "chevron": '<path d="M9 5 L16 12 L9 19"/>',
    "mas": '<path d="M12 6 V18 M6 12 H18"/>',
}
TIKTOK = ('<path d="M16.6 2h-3.5v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9a6.5 6.5 0 1 0 5.5 6.4V8.7'
          'a8.3 8.3 0 0 0 4.9 1.6V6.8a4.9 4.9 0 0 1-4.9-4.8z"/>')
FACEBOOK = ('<path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5'
            'c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/>')
XLOGO = ('<path d="M18.2 2.2h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.2h7l4.8 6.4zm-1.2 18h1.9'
         'L7.1 4.1H5.1z"/>')


def barra_estado(p, oscura):
    c = PAPEL if oscura else TINTA
    p.partes.append('<g id="Barra de estado">')
    p.texto("9:41", 38, 32, 16, c, 600)
    iconos = (f'<g transform="translate(292 20)"><g fill="{c}"><rect x="0" y="8.5" width="3.2" height="4.5" rx="1"/>'
              f'<rect x="5" y="6" width="3.2" height="7" rx="1"/><rect x="10" y="3" width="3.2" height="10" rx="1"/>'
              f'<rect x="15" y="0" width="3.2" height="13" rx="1"/></g>'
              f'<g fill="none" stroke="{c}" stroke-width="2" stroke-linecap="round"><path d="M26 4.7 A11 11 0 0 1 42 4.7"/>'
              f'<path d="M29 7.9 A6.8 6.8 0 0 1 39 7.9"/></g><circle cx="34" cy="11.3" r="1.8" fill="{c}"/>'
              f'<rect x="48" y="0.5" width="24" height="12" rx="3.6" fill="none" stroke="{c}" stroke-opacity="0.45" stroke-width="1.2"/>'
              f'<rect x="50" y="2.5" width="20" height="8" rx="2" fill="{c}"/>'
              f'<rect x="73.5" y="4.3" width="1.6" height="4.4" rx="0.8" fill="{c}" fill-opacity="0.5"/></g>')
    p.add(iconos)
    p.rect(134, 11, 122, 35, "#000000", r=17.5)
    p.partes.append("</g>")


def logo(p, tx, ty, tw, th, sx, sy, sw_, sh, color):
    """Logotipo «Society»: texto en caja (tx..) y subrayado de pincel en caja (sx..)."""
    d = "M2 17 C30 9 65 4 98 2 C99.6 2 100 4.2 98.4 5 C66 8.5 34 13.5 4.5 20 C1 20.6 0 18 2 17 Z"
    p.partes.append('<g id="Logo Society">')
    p.titular(SERIF, "Society", tx, ty, tw, th, color, capa="Society")
    p.add(f'<path d="{d}" fill="{COBALTO}" transform="translate({n(sx)} {n(sy)}) scale({n(sw_ / 100)} {n(sh / 21)})"/>')
    p.partes.append("</g>")


def destello(p, x, y, w, h, color=COBALTO, sw=2.6, fill="none"):
    cx, cy, k = x + w / 2, y + h / 2, 0.1
    d = (f"M{n(cx)} {n(y)} Q{n(cx + k * w)} {n(cy - k * h)} {n(x + w)} {n(cy)} "
         f"Q{n(cx + k * w)} {n(cy + k * h)} {n(cx)} {n(y + h)} Q{n(cx - k * w)} {n(cy + k * h)} {n(x)} {n(cy)} "
         f"Q{n(cx - k * w)} {n(cy - k * h)} {n(cx)} {n(y)} Z")
    p.add(f'<path d="{d}" fill="{fill}" stroke="{color}" stroke-width="{sw}" stroke-linejoin="round"/>', "Destello")


def bocadillo(p, x, y, w=69, h=25):
    p.partes.append('<g id="Bocadillo @society">')
    p.rect(x, y, w, h, COBALTO, r=h / 2)
    p.add(f'<path d="M{n(x + 16)} {n(y + h - 2)} L{n(x + 17)} {n(y + h + 9)} L{n(x + 28)} {n(y + h - 2)} Z" fill="{COBALTO}"/>')
    p.texto("@society", x + w / 2, y + h / 2 + 4.2, 12, BLANCO, 700, anclaje="middle")
    p.partes.append("</g>")


def rayos(p, lineas, color, sw):
    d = " ".join(f"M{n(a)} {n(b)} L{n(c)} {n(e)}" for a, b, c, e in lineas)
    p.add(f'<path d="{d}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" fill="none"/>', "Rayos")


def fondo_papel(p, oscura=False):
    p.imagen("papel-oscuro.png" if oscura else "papel.png", 0, 0, 390, 844, capa="Fondo papel", calidad=80)


# ------------------------------------------------------------------ pantallas
def p1():
    p = Pantalla("01-bienvenida", oscura=True)
    fondo_papel(p, True)
    barra_estado(p, True)
    logo(p, 31, 67, 169, 44, 37, 108, 127, 22, PAPEL)
    p.titular(ANTON, "TU BAR", 29, 163, 258, 104, PAPEL)
    p.titular(SERIF, "merece", 31, 282, 274, 58, PAPEL)
    p.titular(ANTON, "QUE LO VEAN.", 28, 354, 341, 91, PAPEL)
    p.imagen("mano-copa-v2.png", 90, 447, 330, 307, capa="Mano con cóctel", ajuste="xMidYMid meet", max_lado=900)
    rayos(p, [(52, 498, 78, 518), (37, 540, 74, 536), (64, 575, 82, 554)], PAPEL, 5.5)
    p.boton(25, 728, 332, 54, MOSTAZA, "EMPEZAR", 21, TINTA, 900, capa="Botón Empezar")
    p.partes.append('<g id="Paginación">')
    for cx, c in ((165, MOSTAZA), (191, "#5A5A58"), (217, "#5A5A58")):
        p.add(f'<circle cx="{cx}" cy="810" r="6" fill="{c}"/>')
    p.partes.append("</g>")
    return p


def tarjeta_plan(p, y, h, fondo, titulo, tw, lineas, color_txt, icono_svg, circ, img, img_box, capa, dy=(39, 67, 131)):
    p.partes.append(f'<g id="{capa}">')
    p.rect(11, y, 362, h, fondo, r=13)
    p.add(f'<circle cx="55" cy="{y + dy[0]}" r="23" fill="{circ}"/>')
    p.add(icono_svg)
    p.titular(ANTON, titulo, 30, y + dy[1], tw, 44 if dy[1] == 67 else 33, color_txt, capa=titulo)
    p.texto("", 30, y + dy[2], 12.6, color_txt, 500, lineas=lineas, lh=16.2)
    x, yy, w, hh = img_box
    p.imagen(img, x, yy, w, hh, capa="Foto", ajuste="none" if False else "xMidYMid slice")
    p.partes.append("</g>")


def p2():
    p = Pantalla("02-tu-plan", oscura=True)
    fondo_papel(p, True)
    barra_estado(p, True)
    # cabecera: asterisco + «society» y lema en mono
    ast = "".join(f'<rect x="-2" y="-9.5" width="4" height="19" rx="1.2" transform="rotate({a})"/>' for a in (0, 60, 120))
    p.add(f'<g transform="translate(30 71)" fill="{COBALTO}">{ast}</g>', "Asterisco")
    p.titular(SERIF_ROMAN, "society", 46, 63, 91, 22, PAPEL, capa="society")
    p.texto("", 356, 67, 8.6, PAPEL, 400, familia="Space Mono", anclaje="end",
            lineas=["TU BAR.", "NUESTRA MISIÓN.", "TU COMUNIDAD."], lh=10.8, capa="Lema")
    p.titular(ANTON, "TU", 20, 105, 72, 93, PAPEL)
    p.titular(SERIF_REG, "PLAN", 102, 119, 218, 79, PAPEL)
    rayos(p, [(332, 143, 344, 136), (335, 160, 357, 158), (332, 176, 345, 183)], MOSTAZA, 4.5)

    pin = icono(I["pin"], 44, 260, 22, BLANCO, stroke=False) + icono(
        '<circle cx="12" cy="9.7" r="2.6"/>', 44, 260, 22, COBALTO, stroke=False)
    tarjeta_plan(p, 233, 183, PAPEL, "LOCAL", 90, ["Haz que te encuentren", "en el barrio y atrae a", "más gente cerca de ti."],
                 TINTA, pin, COBALTO, "bar-esquina.png", (188, 245, 174, 157), "Plan Local")
    rayos(p, [(326, 258, 330, 268), (333, 256, 337, 272), (340, 262, 347, 270)], COBALTO, 2.2)

    ig = icono(I["instagram"], 42.5, 453.5, 25, COBALTO, sw=2.3).replace("currentColor", COBALTO)
    tarjeta_plan(p, 429, 181, COBALTO, "REDES", 89, ["Crea contenido que", "conecta, genera conversación", "y lleva más gente a tu bar."],
                 PAPEL, ig, PAPEL, "movil-mano.png", (213, 485, 147, 113), "Plan Redes")
    # «RECOMENDADO»
    import math
    cx, cy, R, r, k = 293, 453, 55, 45, 22
    pts = " ".join(f"{n(cx + (R if i % 2 == 0 else r) * math.cos(math.pi * i / k))},"
                   f"{n(cy + (R if i % 2 == 0 else r) * 0.5 * math.sin(math.pi * i / k))}" for i in range(2 * k))
    p.partes.append('<g id="Pegatina Recomendado">')
    p.add(f'<polygon points="{pts}" fill="{MOSTAZA}" transform="rotate(-3 {cx} {cy})"/>')
    p.add(f'<g transform="translate(255 444) skewX(-10)">'
          f'<g fill="{TINTA}">{ANTON.en_caja("RECOMENDADO", 2, 0, 84, 15)}</g></g>')
    p.partes.append("</g>")
    rayos(p, [(217, 443, 229, 446), (216, 458, 229, 456), (221, 473, 231, 466), (350, 441, 361, 436), (352, 455, 367, 455),
              (228, 509, 238, 513), (229, 529, 240, 528), (334, 500, 342, 507), (331, 520, 346, 522)], MOSTAZA, 3.6)

    cal = (f'<rect x="44" y="{659 + 8}" width="22" height="19" rx="3.5" fill="{BLANCO}"/>'
           f'<path d="M50 {663} v6 M60 {663} v6" stroke="{BLANCO}" stroke-width="2.4" stroke-linecap="round"/>'
           f'<path d="M52 {672} L60 {676.5} L52 {681} Z" fill="{COBALTO}"/>')
    tarjeta_plan(p, 621, 165, PAPEL, "REELS", 74, ["Vídeos cortos, gran", "alcance. Muestra lo mejor", "de tu bar en segundos."],
                 TINTA, cal, COBALTO, "coctel.png", (213, 633, 148, 137), "Plan Reels", dy=(47, 61, 115))
    p.add(f'<path d="M277 699 L301 712 L277 725 Z" fill="none" stroke="{BLANCO}" stroke-width="2.4" stroke-linejoin="round"/>'
          f'<path d="M281 706 L294 712 L281 718 Z" fill="{COBALTO}"/>', "Play")
    rayos(p, [(324, 683, 335, 678), (326, 697, 340, 697), (325, 711, 335, 716)], MOSTAZA, 3.4)

    # barra de pestañas
    p.partes.append('<g id="Barra de pestañas">')
    p.rect(0, 782, 390, 62, TINTA)
    tabs = [("inicio", "Inicio", 39), ("buscar", "Local", 116), ("calendario", "Semana", 191),
            ("resultados", "Resultados", 267), ("perfil", "Perfil", 343)]
    for ic, lab, cx in tabs:
        c = COBALTO if lab == "Inicio" else "#9A9A96"
        if ic == "inicio":
            p.add(icono(I[ic], cx - 13, 787, 26, c, stroke=False))
        else:
            p.add(icono(I[ic], cx - 12.5, 788, 25, c, sw=2))
        p.texto(lab, cx, 821, 10.8, c, 500, anclaje="middle")
    p.rect(129, 833, 132, 5, BLANCO, r=2.5)
    p.partes.append("</g>")
    return p


def p3():
    p = Pantalla("03-que-hay-hoy")
    fondo_papel(p)
    barra_estado(p, False)
    logo(p, 20, 55, 102, 29, 24, 81, 72, 13, TINTA)
    p.add(icono(I["cerrar"], 346, 62, 23, TINTA, sw=3.2), "Cerrar")
    p.titular(ANTON, "¿QUÉ HAY", 22, 103, 306, 125, TINTA)
    p.titular(SERIF, "hoy?", 31, 224, 211, 112, TINTA)
    destello(p, 323, 218, 44, 56)
    p.partes.append('<g id="Campo de texto">')
    p.rect(21, 355, 350, 115, TARJETA, r=16, stroke=COBALTO, sw=2, opacity=None)
    p.texto("", 41, 389, 19.5, TINTA, 400, lineas=["Hoy tenemos alcachofas", "a la brasa"], lh=27)
    p.texto("32/300", 352, 456, 13, "#6B6A66", 400, anclaje="end")
    p.partes.append("</g>")
    p.imagen("alcachofas-cerca.png", 21, 490, 350, 163, r=18, capa="Foto")
    p.add(f'<circle cx="195" cy="573" r="22" fill="{TINTA}"/>' + icono(I["mas"], 181, 559, 28, BLANCO, sw=3.4), "Añadir foto")
    for x, lab, act in ((21, "4:5", True), (143, "Historia", False), (266, "Reel", False)):
        p.boton(x, 673, 105, 42, COBALTO if act else "none", lab, 16, BLANCO if act else COBALTO, 700,
                stroke=None if act else COBALTO, capa=f"Chip {lab}")
    p.boton(21, 750, 350, 49, MOSTAZA, "SIGUIENTE", 19, TINTA, 900, capa="Botón Siguiente")
    return p


def cabecera_centrada(p):
    p.add(icono(I["atras"], 17, 60, 24, TINTA, sw=3), "Atrás")
    logo(p, 145, 52, 103, 29, 152, 81, 70, 13, TINTA)


def poster(p, x, y, w, h, fondo, tinta, img, capa):
    p.partes.append(f'<g id="{capa}">')
    p.rect(x, y, w, h, fondo, r=6)
    cid = p.uid("clip")
    p.defs.append(f'<clipPath id="{cid}"><rect x="{n(x)}" y="{n(y)}" width="{n(w)}" height="{n(h)}" rx="6"/></clipPath>')
    p.partes.append(f'<g clip-path="url(#{cid})">')
    p.imagen(img, x + 9, y + 101, w - 18, (w - 18) * 481 / 720, ajuste="xMidYMin slice")
    p.partes.append("</g>")
    p.titular(ANTON, "ALCACHOFAS", x + 14, y + 14, w - 30, 44, tinta)
    p.titular(ANTON, "a la BRASA", x + 14, y + 62, w - 43, 37, tinta)
    p.partes.append("</g>")


def p4():
    p = Pantalla("04-elige-el-estilo")
    fondo_papel(p)
    barra_estado(p, False)
    cabecera_centrada(p)
    p.titular(ANTON, "ELIGE", 21, 117, 161, 82, TINTA)
    p.titular(SERIF, "el estilo", 21, 197, 262, 71, TINTA)
    destello(p, 289, 180, 36, 48)
    poster(p, 21, 292, 165, 180, TARJETA, TINTA, "plato-trama.png", "Estilo póster de papel")
    destello(p, 39, 395, 11, 17, sw=1.6)
    destello(p, 164, 385, 12, 23, sw=1.6)
    poster(p, 205, 292, 166, 180, COBALTO, BLANCO, "plato-cobalto.png", "Estilo póster cobalto")
    p.boton(22, 477, 164, 31, TARJETA, "Póster de papel", 14, TINTA, 700, stroke="#D8D3C6", sw=1.4, capa="Etiqueta papel")
    p.boton(205, 476, 166, 33, COBALTO, "Póster cobalt", 14, BLANCO, 700, capa="Etiqueta cobalto")
    p.imagen("alcachofas-color.png", 21, 527, 165, 166, r=8, capa="Estilo foto")
    # feed
    p.partes.append('<g id="Estilo feed">')
    p.rect(205, 527, 166, 166, TARJETA, r=6)
    p.titular(ANTON, "ALCACHOFAS", 213, 537, 117, 38, TINTA)
    p.titular(ANTON, "a la BRASA", 213, 577, 107, 26, TINTA)
    p.imagen("plato-cobalto.png", 207, 614, 49, 79, ajuste="xMidYMid slice")
    p.imagen("plato-trama.png", 258, 614, 76, 79, ajuste="xMidYMid slice")
    p.rect(339, 591, 30, 59, COBALTO)
    p.rect(339, 655, 30, 38, COBALTO)
    p.partes.append("</g>")
    destello(p, 346, 543, 12, 38, sw=1.4)
    p.boton(21, 696, 165, 32, "none", "Foto", 15, COBALTO, 700, stroke=COBALTO, capa="Etiqueta foto")
    p.boton(205, 696, 166, 32, "none", "Feed", 15, COBALTO, 700, stroke=COBALTO, capa="Etiqueta feed")
    p.boton(21, 755, 350, 50, MOSTAZA, "SIGUIENTE", 19, TINTA, 900, capa="Botón Siguiente")
    return p


def p5():
    p = Pantalla("05-asi-queda")
    fondo_papel(p)
    barra_estado(p, False)
    cabecera_centrada(p)
    p.titular(ANTON, "ASÍ", 21, 95, 107, 118, TINTA)
    p.titular(SERIF, "queda", 145, 148, 195, 77, TINTA)
    destello(p, 341, 143, 34, 45)
    p.partes.append('<g id="Post de Instagram">')
    p.rect(21, 235, 350, 485, TARJETA, r=12, opacity=0.9)
    p.add(f'<circle cx="50" cy="262" r="18.5" fill="{COBALTO}"/>')
    p.titular(ANTON, "S", 45, 250, 10, 24, BLANCO, capa="S")
    p.texto("society", 78, 267, 14, TINTA, 700)
    p.add(f'<g fill="{TINTA}"><circle cx="351" cy="254" r="2"/><circle cx="351" cy="262" r="2"/><circle cx="351" cy="270" r="2"/></g>')
    cid = p.uid("clip")
    p.defs.append(f'<clipPath id="{cid}"><rect x="21" y="288" width="350" height="312"/></clipPath>')
    p.partes.append(f'<g clip-path="url(#{cid})">')
    p.imagen("papel.png", 21, 288, 350, 312, ajuste="xMidYMid slice", calidad=75)
    p.imagen("plato-trama.png", 12, 456, 368, 246)
    p.partes.append("</g>")
    p.titular(ANTON, "ALCACHOFAS", 48, 300, 304, 64, TINTA)
    p.titular(ANTON, "a la", 48, 372, 77, 58, TINTA)
    p.titular(ANTON, "BRASA", 146, 377, 181, 80, TINTA)
    destello(p, 328, 448, 32, 45)
    p.add(icono(I["corazon"], 30, 612, 26, TINTA, sw=2.2) + icono(I["comentario"], 73, 612, 25, TINTA, sw=2.2)
          + icono(I["enviar"], 113, 612, 25, TINTA, sw=2.2) + icono(I["guardar"], 335, 612, 25, TINTA, sw=2.2),
          "Acciones")
    p.add(f'<text font-family="Schibsted Grotesk" font-size="14" fill="{TINTA}">'
          f'<tspan x="31" y="661" font-weight="700">society</tspan><tspan font-weight="400"> Hoy tenemos alcachofas a la brasa.</tspan>'
          f'<tspan x="31" y="681" font-weight="400">Sabor, temporada y buena compañía.</tspan></text>', "Texto del post")
    p.texto("#Society  #Alcachofas  #Hoy", 31, 711, 13.5, COBALTO, 500, capa="Hashtags")
    p.partes.append("</g>")
    p.boton(21, 750, 166, 55, "none", "Editar", 19, COBALTO, 700, stroke=COBALTO, capa="Botón Editar")
    p.boton(205, 750, 166, 55, MOSTAZA, "Publicar", 19, TINTA, 800, capa="Botón Publicar")
    return p


def cabecera_logo_bocadillo(p):
    logo(p, 17, 64, 111, 35, 22, 95, 81, 19, TINTA)
    bocadillo(p, 304, 75)


def p6():
    p = Pantalla("06-busca-tu-local")
    fondo_papel(p)
    barra_estado(p, False)
    cabecera_logo_bocadillo(p)
    p.titular(ANTON, "BUSCA", 30, 143, 301, 132, TINTA)
    p.titular(SERIF, "tu local", 73, 268, 294, 85, TINTA)
    destello(p, 340, 185, 35, 48, sw=3)
    destello(p, 15, 293, 35, 47, sw=3)
    p.partes.append('<g id="Buscador">')
    p.rect(20, 381, 350, 50, "none", r=25, stroke="#8E8A80", sw=1.6)
    p.add(icono(I["buscar"], 34, 394, 24, TINTA, sw=2.4))
    p.texto("Madrid", 74, 412, 17, TINTA, 600)
    p.add(icono(I["cerrar"], 338, 398, 16, TINTA, sw=3))
    p.partes.append("</g>")
    p.partes.append('<g id="Resultado">')
    p.rect(20, 445, 350, 217, COBALTO, r=12)
    p.imagen("taberna.png", 37, 462, 316, 124, r=8)
    p.texto("La Taberna del Patio", 37, 621, 20.5, BLANCO, 500)
    p.add(icono(I["pin"], 35, 629, 17, BLANCO, sw=2.2))
    p.texto("Calle Mayor, 12", 58, 644, 15.5, BLANCO, 400)
    p.add(icono(I["flecha"], 326, 613, 27, BLANCO, sw=2.2))
    p.partes.append("</g>")
    for i, cy in enumerate((706, 780)):
        p.partes.append(f'<g id="Resultado vacío {i + 1}" opacity="0.9">')
        p.add(f'<circle cx="46" cy="{cy}" r="20" fill="#D8D3C6"/>')
        p.rect(82, cy - 12, 181, 8, "#D8D3C6", r=4)
        p.rect(82, cy + 6, 108, 8, "#D8D3C6", r=4)
        p.add(icono(I["chevron"], 346, cy - 10, 20, "#B8B3A6", sw=2))
        p.partes.append("</g>")
    p.rect(20, 742, 350, 1, "#D8D3C6")
    return p


def p7():
    p = Pantalla("07-conecta-tus-redes")
    fondo_papel(p)
    barra_estado(p, False)
    cabecera_logo_bocadillo(p)
    p.titular(ANTON, "CONECTA", 20, 143, 352, 127, TINTA)
    p.titular(SERIF, "tus redes", 59, 265, 305, 75, TINTA)
    destello(p, 15, 285, 37, 47, sw=3)
    filas = [("Instagram", ["Comparte tus mejores", "momentos y atrae más gente."], "ig"),
             ("TikTok", ["Haz que tu bar se descubra", "de forma diferente."], "tt"),
             ("Facebook", ["Mantén a tu comunidad", "siempre al día."], "fb"),
             ("X (Twitter)", ["Habla, comparte,", "conecta."], "x")]
    for i, (tit, lineas, k) in enumerate(filas):
        y = 366 + i * 93
        p.partes.append(f'<g id="Red {tit}">')
        p.rect(18, y, 356, 86, TARJETA, r=12, stroke="#BDB9AE", sw=1.4, opacity=None)
        if k == "ig":
            p.add(icono(I["instagram"], 30, y + 14, 38, TINTA, sw=2.4).replace("currentColor", TINTA))
        elif k == "tt":
            p.add(icono(TIKTOK, 31, y + 17, 36, TINTA, stroke=False))
        elif k == "fb":
            p.add(icono(FACEBOOK, 30, y + 16, 38, TINTA, stroke=False))
        else:
            p.add(icono(XLOGO, 31, y + 17, 36, TINTA, stroke=False))
        p.texto(tit, 88, y + 34, 16.5, TINTA, 600)
        p.texto("", 88, y + 55, 11.6, TINTA, 400, lineas=lineas, lh=15)
        p.rect(308, y + 25, 55, 29, COBALTO, r=14.5)
        p.add(f'<circle cx="{348.5}" cy="{y + 39.5}" r="11" fill="{BLANCO}"/>')
        p.partes.append("</g>")
    p.boton(23, 749, 345, 61, MOSTAZA, "Siguiente", 18, TINTA, 700, capa="Botón Siguiente",
            icono=lambda x, y, c: icono(I["flecha"], x - 2, y - 10, 20, c, sw=2.4))
    return p


PANTALLAS = [p1, p2, p3, p4, p5, p6, p7]

if __name__ == "__main__":
    elegidas = [int(a) for a in sys.argv[1:]] or range(1, 8)
    for i in elegidas:
        pant = PANTALLAS[i - 1]()
        ruta = Path(__file__).resolve().parent / f"{pant.nombre}.svg"
        ruta.write_text(pant.svg(), encoding="utf-8")
        render(ruta, SALIDA / "_cmp" / f"f{i}.png")
        print("ok", ruta.name, round(ruta.stat().st_size / 1024), "KB")
