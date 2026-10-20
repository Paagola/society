#!/usr/bin/env python3
"""Monta las diapositivas de los carruseles: recorta la imagen generada a 4:5,
la lleva a 1080x1350 y compone encima la tipografía y el sistema gráfico de cada marca.

El texto nunca lo escribe el generador de imágenes: se compone aquí, con fuentes reales,
para que salga exacto y legible.

Uso:
    python3 montar_carrusel.py specs.json <carpeta_imagenes> <carpeta_fuentes> <carpeta_salida>

specs.json: {"marca": "etx|dis|sj", "slides": [{"n":1, "img":"raw_1.png", ...}, ...]}
Fuentes (Google Fonts, licencia OFL): ArchivoNarrow[wght].ttf, IBMPlexMono-Regular.ttf,
IBMPlexMono-Medium.ttf, BricolageGrotesque[opsz,wdth,wght].ttf, CourierPrime-Regular.ttf,
CourierPrime-Bold.ttf.
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1080, 1350
M = 96  # margen lateral: fuera del recorte 3:4 de la cuadrícula del perfil

FONTS = {}


def font(name, size, wght=None, opsz=None, wdth=None):
    key = (name, size, wght, opsz, wdth)
    if key in FONTS:
        return FONTS[key]
    f = ImageFont.truetype(os.path.join(FONT_DIR, name), size)
    axes = f.get_variation_axes() if name.endswith("].ttf") else []
    if axes:
        vals = []
        for a in axes:
            n = a["name"].decode() if isinstance(a["name"], bytes) else a["name"]
            if n == "Weight" and wght:
                vals.append(wght)
            elif n == "Optical size" and opsz:
                vals.append(opsz)
            elif n == "Width" and wdth:
                vals.append(wdth)
            else:
                vals.append(a["default"])
        f.set_variation_by_axes(vals)
    FONTS[key] = f
    return f


def cover(img):
    """Escala y recorta al centro a 1080x1350 (4:5)."""
    r = max(W / img.width, H / img.height)
    img = img.resize((round(img.width * r), round(img.height * r)), Image.LANCZOS)
    x = (img.width - W) // 2
    y = (img.height - H) // 2
    return img.crop((x, y, x + W, y + H))


def scrim(base, box, opacity, color=(0, 0, 0), blur=90):
    """Oscurece suavemente la zona del texto para asegurar la lectura (sin degradados visibles)."""
    layer = Image.new("L", base.size, 0)
    d = ImageDraw.Draw(layer)
    d.rectangle(box, fill=int(255 * opacity))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    solid = Image.new("RGB", base.size, color)
    return Image.composite(solid, base, layer)


def text_block(d, xy, text, f, fill, leading=1.08, anchor="la"):
    x, y = xy
    lines = text.split("\n")
    asc, desc = f.getmetrics()
    lh = round((asc + desc) * leading)
    for i, line in enumerate(lines):
        d.text((x, y + i * lh), line, font=f, fill=fill, anchor=anchor)
    return y + len(lines) * lh


def wrap(text, f, width, d):
    out = []
    for para in text.split("\n"):
        words, line = para.split(" "), ""
        for w in words:
            t = (line + " " + w).strip()
            if d.textlength(t, font=f) <= width:
                line = t
            else:
                out.append(line)
                line = w
        out.append(line)
    return "\n".join(out)


# ---------------------------------------------------------------- Etxebarri
ETX = dict(carbon=(17, 17, 16), hueso=(237, 231, 221), brasa=(217, 98, 43), ceniza=(138, 135, 129))


def etx(img, s):
    ink = ETX["carbon"] if s.get("tinta") == "oscura" else ETX["hueso"]
    for box, op in s.get("scrims", []):
        img = scrim(img, tuple(box), op, color=(237, 231, 221) if s.get("tinta") == "oscura" else (0, 0, 0))
    d = ImageDraw.Draw(img)
    mono = font("IBMPlexMono-Medium.ttf", 22)
    # cabecera fija: etiqueta y contador (puede ir en otra tinta que el titular)
    hink = ETX["carbon"] if s.get("cabecera", s.get("tinta")) == "oscura" else ETX["hueso"]
    d.text((M, 72), "ASADOR ETXEBARRI · AXPE", font=mono, fill=hink)
    d.text((W - M, 72), f"{s['n']:02d}/06", font=mono, fill=hink, anchor="ra")
    y = s["y"]
    # motivo de parrilla: tres barras paralelas, la central en color brasa
    for i in range(3):
        col = ETX["brasa"] if i == 1 else ink
        d.rectangle((M, y + i * 14, M + 120, y + i * 14 + 3), fill=col)
    y += 64
    head = font("ArchivoNarrow[wght].ttf", s.get("size", 104), wght=700)
    y = text_block(d, (M, y), s["titular"], head, ink, leading=1.0)
    if s.get("texto"):
        body = font("IBMPlexMono-Regular.ttf", 30)
        t = wrap(s["texto"], body, W - 2 * M - 80, d)
        if s.get("caja", True):
            # etiqueta: el texto corrido va sobre una caja sólida, como una ficha de cocina
            box_ink = ETX["hueso"] if ink == ETX["carbon"] else ETX["carbon"]
            n = len(t.split("\n"))
            asc, desc = body.getmetrics()
            hh = n * round((asc + desc) * 1.32)
            ww = max(d.textlength(l, font=body) for l in t.split("\n"))
            if s.get("texto_y"):
                y = s["texto_y"] - 26
            d.rectangle((M - 16, y + 26 - 12, M + ww + 16, y + 26 + hh), fill=box_ink)
        y = text_block(d, (M, y + 26), t, body, ink, leading=1.32)
    if s.get("aviso"):
        small = font("IBMPlexMono-Regular.ttf", 20)
        d.text((M, H - 72), s["aviso"], font=small, fill=hink if s.get("aviso_cabecera") else ink, anchor="ls")
    return img


# ---------------------------------------------------------------- Disfrutar
DIS = dict(negro=(17, 17, 17), blanco=(247, 245, 240), cobalto=(29, 63, 166), rojo=(214, 40, 40),
           amarillo=(244, 194, 27), arcilla=(181, 101, 58))


def dis(img, s):
    d = ImageDraw.Draw(img)
    head = font("BricolageGrotesque[opsz,wdth,wght].ttf", s.get("size", 118), wght=800, opsz=96, wdth=88)
    body = font("BricolageGrotesque[opsz,wdth,wght].ttf", 34, wght=500, opsz=24, wdth=100)
    small = font("BricolageGrotesque[opsz,wdth,wght].ttf", 24, wght=600, opsz=14, wdth=100)
    ink = DIS["negro"] if s.get("tinta") == "oscura" else DIS["blanco"]
    # cabecera: nombre y punto con el número (círculo de color, guiño a la cerámica mironiana)
    d.text((M, 84), "DISFRUTAR · BARCELONA", font=small, fill=ink, anchor="ls")
    cx, cy, r = W - M - 26, 76, 26
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=ink)
    d.text((cx, cy + 1), str(s["n"]), font=small, fill=DIS["negro"] if ink == DIS["blanco"] else DIS["blanco"], anchor="mm")
    def lines_h(t, f, lead):
        asc, desc = f.getmetrics()
        return len(t.split("\n")) * round((asc + desc) * lead)

    tb = wrap(s["texto"], body, W - 2 * M - 60, d) if s.get("texto") else ""
    if s.get("barra") is not None:
        # la "venda": banda negra a sangre con el titular (y el texto) dentro, el motivo de "elige sin mirar"
        pad = s.get("pad", 40)
        hh = lines_h(s["titular"], head, 0.96)
        inner = hh + (24 + lines_h(tb, body, 1.25) if tb else 0)
        by0 = s["barra"] if s.get("barra_abajo") is None else H - inner - 2 * pad - (64 if s.get("aviso") else 0)
        d.rectangle((0, by0, W, H if s.get("barra_abajo") is not None else by0 + inner + 2 * pad), fill=DIS["negro"])
        text_block(d, (M, by0 + pad), s["titular"], head, DIS["blanco"], leading=0.96)
        if tb:
            text_block(d, (M, by0 + pad + hh + 24), tb, body, DIS["blanco"], leading=1.25)
    else:
        y = text_block(d, (M, s["y"]), s["titular"], head, ink, leading=0.96)
        if tb:
            ty = s.get("texto_y", y + 30)
            if s.get("caja"):
                ww = max(d.textlength(l, font=body) for l in tb.split("\n"))
                d.rectangle((M - 20, ty - 14, M + ww + 20, ty + lines_h(tb, body, 1.25) + 4), fill=DIS["negro"])
                text_block(d, (M, ty), tb, body, DIS["blanco"], leading=1.25)
            else:
                text_block(d, (M, ty), tb, body, ink, leading=1.25)
    if s.get("circulo"):
        x, yy, rr = s["circulo"]
        for k in range(9):
            d.ellipse((x - rr - k, yy - rr - k, x + rr + k, yy + rr + k), outline=DIS["negro"])
    if s.get("aviso"):
        d.text((M, H - 64), s["aviso"], font=font("BricolageGrotesque[opsz,wdth,wght].ttf", 20, wght=500, opsz=12),
               fill=DIS["blanco"] if s.get("barra_abajo") is not None else ink, anchor="ls")
    return img


# ---------------------------------------------------------------- St. JOHN
SJ = dict(tinta=(20, 20, 20), clarete=(94, 26, 34))


def sj(img, s):
    d = ImageDraw.Draw(img)
    reg = font("CourierPrime-Regular.ttf", 26)
    ink = SJ["tinta"]
    # tiras de papel arriba y abajo cuando la foto es oscura en esas zonas
    if s.get("papel_arriba"):
        d.rectangle((0, 0, W, 128), fill=(251, 251, 249))
    if s.get("papel_abajo"):
        d.rectangle((0, H - 108, W, H), fill=(251, 251, 249))
    # cabecera de carta: casa a la izquierda, fecha a la derecha, filete fino debajo
    d.text((M, 84), "St. JOHN · SMITHFIELD", font=reg, fill=ink, anchor="ls")
    d.text((W - M, 84), s.get("fecha", "MARTES 20.10.2026"), font=reg, fill=ink, anchor="rs")
    d.line((M, 102, W - M, 102), fill=ink, width=2)
    d.text((W - M, H - 64), f"{s['n']}/6", font=reg, fill=ink, anchor="rs")
    for b in s.get("bloques", []):
        sj_caja(d, dict(b, n=s["n"]), b["y"]) if b.get("caja") else None
        sj_bloque(d, b, b["y"])
    if "y" not in s:
        if s.get("aviso"):
            d.text((M, H - 64), s["aviso"], font=font("CourierPrime-Regular.ttf", 20), fill=ink, anchor="ls")
        return img
    y = s["y"]
    if s.get("caja"):
        # papeleta de carta: se mide el bloque en seco y se pone debajo un papel con filete
        dummy = ImageDraw.Draw(Image.new("RGB", (W, H)))
        y_end = sj_bloque(dummy, dict(s, grande=None), y + (s.get("grande_alto", 300) if s.get("grande") else 0))
        y0 = y + (s.get("grande_alto", 300) if s.get("grande") else 0)
        ancho = s.get("ancho", W - 2 * M)
        d.rectangle((M - 28, y0 - 28, M + ancho + 28, y_end + 24), fill=(251, 251, 249), outline=ink, width=2)
    if s.get("grande"):
        g = font("CourierPrime-Bold.ttf", s["grande_size"])
        d.text((M - 8, y), s["grande"], font=g, fill=SJ["clarete"], anchor="la")
        y += s.get("grande_alto", 300)
    sj_bloque(d, s, y)
    if s.get("aviso"):
        d.text((M, H - 64), s["aviso"], font=font("CourierPrime-Regular.ttf", 20), fill=ink, anchor="ls")
    return img


def sj_caja(d, b, y):
    dummy = ImageDraw.Draw(Image.new("RGB", (W, H)))
    y_end = sj_bloque(dummy, b, y)
    ancho = b.get("ancho", W - 2 * M)
    d.rectangle((M - 28, y - 28, M + ancho + 28, y_end + 24), fill=(251, 251, 249), outline=SJ["tinta"], width=2)


def sj_bloque(d, s, y):
    """Plato, precio, titular y texto de St. JOHN; devuelve la y final."""
    bold = font("CourierPrime-Bold.ttf", s.get("size", 62))
    body = font("CourierPrime-Regular.ttf", 32)
    ink = SJ["tinta"]
    ancho = s.get("ancho", W - 2 * M)
    if s.get("plato"):
        y2 = text_block(d, (M, y), s["plato"], bold, ink, leading=1.05)
        if s.get("precio"):
            d.text((M + ancho, y), s["precio"], font=bold, fill=ink, anchor="ra")
        y = y2
    if s.get("titular"):
        y = text_block(d, (M, y), s["titular"], bold, ink, leading=1.1)
    if s.get("texto"):
        y = text_block(d, (M, y + 22), wrap(s["texto"], body, ancho, d), body, ink, leading=1.3)
    return y


def main():
    global FONT_DIR
    spec_path, img_dir, FONT_DIR, out_dir = sys.argv[1:5]
    spec = json.load(open(spec_path, encoding="utf-8"))
    os.makedirs(out_dir, exist_ok=True)
    fn = {"etx": etx, "dis": dis, "sj": sj}[spec["marca"]]
    outs = []
    for s in spec["slides"]:
        img = cover(Image.open(os.path.join(img_dir, s["img"])).convert("RGB"))
        img = fn(img, s)
        p = os.path.join(out_dir, f"{spec['prefijo']}_{s['n']:02d}.png")
        img.save(p, optimize=True)
        assert Image.open(p).size == (W, H)
        outs.append(p)
        print(p, Image.open(p).size)
    # vista previa: las seis en fila
    prev = Image.new("RGB", (6 * 360 + 7 * 12, 450 + 24), (24, 24, 24))
    for i, p in enumerate(outs):
        prev.paste(Image.open(p).resize((360, 450), Image.LANCZOS), (12 + i * 372, 12))
    prev.save(os.path.join(out_dir, "carousel_preview.jpg"), quality=88)


if __name__ == "__main__":
    main()
