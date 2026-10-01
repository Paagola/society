"""«La terraza que se llena»: corta la escena de papel en piezas para montarlas en stop-motion.

1. Regiones: cada trozo de papel de la imagen (segmentar.py).
2. Capas: cada región va a una capa por mayoría (polígonos medidos sobre la rejilla + color).
3. Hojas de fondo completas: el cielo, la pared y el suelo se rellenan por detrás de lo que tienen
   delante (el suelo clonando piedras de la zona limpia; lo demás con un relleno suave y grano), para
   que la terraza vacía se vea entera antes de que lleguen los clientes.
4. Troceo: las hojas grandes se parten con cortes rasgados y fibra clara, como papel roto a mano.
5. Guion: a cada pieza se le da su fotograma de entrada, su dirección y su giro (atrás → delante;
   las figuras de abajo arriba). La historia va en el orden: calle vacía → móvil → publica → se llena.

Salidas: promo/public/recortado/ (piezas, fondo, burbuja, máscaras de las tiras) y
promo/src/recortado/piezas.json. Revisión en produccion/society-papel-recortado/revision/.
Uso: python produccion/society-papel-recortado/scripts/recortar.py
"""
import json
import math
import os
import shutil
import sys

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)
RAIZ = os.path.abspath(os.path.join(BASE, '../..'))
sys.path.insert(0, AQUI)
sys.path.insert(0, os.path.join(RAIZ, 'produccion/society-anuncio/scripts'))
from segmentar import lab, regiones  # noqa: E402
from rasgado import CREMA, fibra_rgba, mascara_y_fibra, ruido  # noqa: E402

W, H = 1080, 1920
FPS = 30
PUB = os.path.join(RAIZ, 'promo/public/recortado')
SRC = os.path.join(RAIZ, 'promo/src/recortado')
REV = os.path.join(BASE, 'revision')

# Profundidad de cada capa (de atrás adelante). Una hoja de fondo nunca tapa una capa de detrás.
Z = {'cielo': 0, 'luna': 1, 'suelo': 2, 'pared': 3, 'tejado': 4, 'detalle': 5, 'toldo': 6, 'guirnalda': 7,
     'camarero': 8, 'terraza_izq': 9, 'terraza_der': 9, 'mano': 10, 'pantalla': 10, 'burbuja': 11}

# Polígonos medidos sobre revision/rejilla-*.png y revision/zoom-*.png (coordenadas de 1080 x 1920)
POL = {
    'camarero': [(585, 960), (625, 962), (640, 990), (632, 1015), (645, 1040), (700, 1038), (715, 1090), (700, 1103),
                 (645, 1106), (640, 1180), (635, 1265), (660, 1310), (690, 1335), (685, 1368), (628, 1370), (600, 1330),
                 (588, 1398), (512, 1400), (516, 1368), (540, 1330), (545, 1270), (540, 1170), (522, 1165), (525, 1140),
                 (530, 1060), (555, 1025), (580, 1010)],
    'terraza_izq': [(0, 1120), (120, 1120), (150, 1095), (215, 1100), (240, 1150), (290, 1150), (360, 1125), (440, 1130),
                    (470, 1190), (508, 1260), (515, 1350), (505, 1540), (500, 1625), (420, 1640), (260, 1640), (0, 1620)],
    'terraza_der': [(660, 1250), (690, 1150), (740, 1120), (800, 1130), (830, 1150), (900, 1095), (1000, 1095),
                    (1080, 1130), (1080, 1650), (1010, 1650), (995, 1625), (975, 1605), (945, 1600), (915, 1440),
                    (890, 1420), (700, 1470), (665, 1470)],
    'mano': [(640, 1485), (890, 1420), (915, 1440), (945, 1600), (975, 1605), (995, 1625), (1010, 1680), (1045, 1760),
             (1080, 1830), (1080, 1920), (695, 1920), (650, 1900), (640, 1840), (648, 1790), (640, 1720), (645, 1680),
             (648, 1550)],
}
Y_TEJADO = 255   # donde empieza el tejado
Y_SUELO = 1197   # donde la pared toca el suelo


def poligono(p):
    m = Image.new('L', (W, H), 0)
    ImageDraw.Draw(m).polygon(p, fill=1)
    return np.asarray(m, bool)


def guarda(a, ruta, **kw):
    Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(ruta, **kw)


def grano(seed):
    return ruido(H, W, seed, 1.2) * 0.6 + ruido(H, W, seed + 1, 5) * 0.4


def desenfoca(a, s):
    """Gaussiano; a escalas grandes se hace sobre la imagen reducida (mismo resultado a efectos de relleno)."""
    if s <= 4:
        return ndi.gaussian_filter(a, s)
    f = int(s // 4)
    h, w = a.shape
    ph, pw = -h % f, -w % f
    b = np.pad(a, ((0, ph), (0, pw)), mode='edge').reshape((h + ph) // f, f, (w + pw) // f, f).mean((1, 3))
    b = ndi.gaussian_filter(b, s / f)
    return ndi.zoom(b, f, order=1)[:h, :w]


def relleno_suave(img, conocido, falta, seed):
    """Rellena `falta` desde `conocido` con convolución normalizada a varias escalas y le pone grano."""
    out = img.copy()
    k = conocido.astype(np.float32)
    hecho = np.zeros_like(falta)
    res = np.zeros_like(out)
    for s in (2, 4, 8, 16, 32, 64, 128, 256):
        w = desenfoca(k, s)
        ok = (w > 0.03) & falta & ~hecho
        if ok.any():
            for c in range(3):
                res[..., c][ok] = desenfoca(img[..., c] * k, s)[ok] / w[ok]
            hecho |= ok
        if hecho.sum() == falta.sum():
            break
    resto = falta & ~hecho
    if resto.any():  # lo que queda muy lejos: el color conocido más cercano
        _, (iy, ix) = ndi.distance_transform_edt(~conocido, return_indices=True)
        res[resto] = img[iy[resto], ix[resto]]
    g = grano(seed)
    out[falta] = res[falta] * (1 + 0.04 * g[falta][:, None])
    return out


def empedrado(A, M_suelo, seed):
    """Suelo nuevo para lo que tapan la terraza y la mano: piedras reales del suelo visible estampadas
    en filas sobre la junta, más pequeñas al fondo (perspectiva)."""
    r = np.random.default_rng(seed)
    piedras = []
    # piedra a piedra: las piedras son grises y la junta beige (umbral de Otsu sobre b*, azul-amarillo)
    Ls = ndi.median_filter(lab(A)[..., 2], size=7)
    v = Ls[M_suelo]
    hist, bordes = np.histogram(v, 128)
    p = hist / hist.sum()
    w0 = np.cumsum(p)
    mu = np.cumsum(p * bordes[:-1])
    entre = (mu[-1] * w0 - mu) ** 2 / (w0 * (1 - w0) + 1e-9)
    corte = bordes[np.argmax(entre)]
    piedra = ndi.binary_opening(M_suelo & (Ls < corte), iterations=3)
    et, _ = ndi.label(piedra)
    et = et - 1
    dentro = ndi.binary_erosion(M_suelo, iterations=3)
    objs = ndi.find_objects(et + 1)
    motivo = {}
    for i, sl in enumerate(objs):
        # solo piedras enteras: dentro del suelo visible, ni cortadas por el borde ni pegadas a los dedos
        if sl is None or sl[0].start < Y_SUELO or sl[0].stop >= H - 2 or sl[1].start <= 2 or sl[1].stop >= W - 2:
            motivo['sitio'] = motivo.get('sitio', 0) + 1
            continue
        m = et[sl] == i
        if not 700 < m.sum() < 40000 or m.sum() < 0.45 * m.size or dentro[sl][m].mean() < 0.97:
            motivo['forma'] = motivo.get('forma', 0) + 1
            continue
        # la piedra se estampa a la escala de abajo del todo: se normaliza según su fila
        k = 1 / (0.5 + 0.55 * np.clip((sl[0].start - Y_SUELO) / (H - Y_SUELO), 0, 1))
        rgba = Image.fromarray(np.dstack([A[sl], m * 255.0]).astype(np.uint8))
        piedras.append(rgba.resize((round(rgba.width * k), round(rgba.height * k)), Image.LANCZOS))
    L = lab(A)
    junta_m = M_suelo & (L[..., 0] > 62) & (np.hypot(L[..., 1], L[..., 2]) < 14)
    junta = A[junta_m].mean(0) if junta_m.any() else np.array([190, 184, 172], np.float32)
    lienzo = Image.fromarray(np.clip(junta[None, None, :] * (1 + 0.05 * grano(seed)[..., None]), 0, 255).astype(np.uint8)).convert('RGBA')
    print('piedras de muestra', len(piedras), 'descartadas', motivo)
    y = Y_SUELO - 40
    while y < H + 40:
        s = 0.5 + 0.55 * np.clip((y - Y_SUELO) / (H - Y_SUELO), 0, 1)
        x = -r.uniform(20, 120) * s
        altos = []
        while x < W + 40:
            p = piedras[r.integers(len(piedras))]
            k = s * r.uniform(0.85, 1.1)
            q = p.resize((max(8, round(p.width * k)), max(8, round(p.height * k))), Image.LANCZOS)
            if r.random() < 0.5:
                q = q.transpose(Image.FLIP_LEFT_RIGHT)
            lienzo.alpha_composite(q, (int(x), int(y + r.uniform(-10, 10) * s)))
            x += q.width * 0.9
            altos.append(q.height)
        y += np.median(altos) * 0.72
    return np.asarray(lienzo.convert('RGB'), np.float32)


def conexos(et):
    """Cada trozo en una sola pieza: las islas sueltas pasan al trozo vecino."""
    out = et.copy()
    for i in range(int(et.max()) + 1):
        cc, n = ndi.label(et == i)
        if n > 1:
            a = np.bincount(cc.ravel())
            a[0] = 0
            out[(cc > 0) & (cc != a.argmax())] = -2
    hueco = out == -2
    if hueco.any():
        _, (iy, ix) = ndi.distance_transform_edt(out < 0, return_indices=True)
        out[hueco] = out[iy[hueco], ix[hueco]]
    return out


def trocea(dominio, n, seed, aniso=1.0, amp=9):
    """Parte un dominio en n trozos de borde irregular (Voronoi con coordenadas deformadas por ruido)."""
    ys, xs = np.nonzero(dominio)
    r = np.random.default_rng(seed)
    # semillas repartidas: unas iteraciones de Lloyd sobre una muestra
    idx = r.choice(len(xs), min(len(xs), 20000), replace=False)
    px, py = xs[idx].astype(np.float32), ys[idx].astype(np.float32)
    sel = r.choice(len(px), n, replace=False)
    c = np.stack([px[sel], py[sel]], 1)
    for _ in range(12):
        d = (px[:, None] - c[None, :, 0]) ** 2 + ((py[:, None] - c[None, :, 1]) * aniso) ** 2
        a = d.argmin(1)
        for i in range(n):
            if (a == i).any():
                c[i] = px[a == i].mean(), py[a == i].mean()
    # borde de papel roto: ondulación suave y larga + temblor fino, sin bucles
    nx = ruido(H, W, seed + 3, 40) * amp + ruido(H, W, seed + 4, 1.5) * 1.8
    ny = ruido(H, W, seed + 5, 40) * amp + ruido(H, W, seed + 6, 1.5) * 1.8
    X = xs + nx[ys, xs]
    Y = ys + ny[ys, xs]
    d = (X[:, None] - c[None, :, 0]) ** 2 + ((Y[:, None] - c[None, :, 1]) * aniso) ** 2
    et = np.full((H, W), -1, np.int32)
    et[ys, xs] = d.argmin(1)
    return conexos(et)


def fibra_en_cortes(img, et, seed, ancho=2.4):
    """Franja clara de fibra a los dos lados de cada corte nuevo (entre trozos de la misma hoja)."""
    b = np.zeros((H, W), bool)
    for dy, dx in ((0, 1), (1, 0)):
        a1 = et[:H - dy, :W - dx]
        a2 = et[dy:, dx:]
        c = (a1 != a2) & (a1 >= 0) & (a2 >= 0)
        b[:H - dy, :W - dx] |= c
        b[dy:, dx:] |= c
    d = ndi.distance_transform_edt(~b)
    n2 = ruido(H, W, seed, 1.5)
    f = np.clip(1 - d / (ancho * np.clip(1 + 0.35 * ruido(H, W, seed + 1, 8), 0.5, 1.6)), 0, 1) * np.clip(0.75 + 0.35 * n2, 0, 1)
    f[et < 0] = 0
    return img * (1 - f[..., None]) + CREMA * f[..., None]


def limpia(et, dominio, min_area=220):
    """Recorta las etiquetas al dominio y reparte los trozos diminutos entre sus vecinos."""
    et = np.where(dominio, et, -1)
    u, inv = np.unique(et, return_inverse=True)
    et = inv.reshape(et.shape).astype(np.int32) - (1 if u[0] == -1 else 0)
    area = np.bincount(et[et >= 0].ravel())
    chico = np.zeros(H * W, bool).reshape(H, W)
    chico[et >= 0] = area[et[et >= 0]] < min_area
    et[chico] = -1
    hueco = (et < 0) & dominio
    if hueco.any():
        _, (iy, ix) = ndi.distance_transform_edt(et < 0, return_indices=True)
        et[hueco] = et[iy[hueco], ix[hueco]]
    u, inv = np.unique(et, return_inverse=True)
    return inv.reshape(et.shape).astype(np.int32) - (1 if u[0] == -1 else 0)


def parte_grandes(et, max_area, seed, aniso=1.0):
    """Parte en trozos rasgados las piezas de más de max_area píxeles."""
    out = et.copy()
    sig = int(et.max()) + 1
    area = np.bincount(et[et >= 0].ravel())
    for i in np.nonzero(area > max_area)[0]:
        n = int(math.ceil(area[i] / max_area))
        sub = trocea(et == i, n, seed + int(i), aniso=aniso, amp=8)
        m = et == i
        out[m] = np.where(sub[m] == 0, i, sig + sub[m] - 1)
        sig += n - 1
    return out


def main():
    os.makedirs(REV, exist_ok=True)
    if os.path.isdir(os.path.join(PUB, 'piezas')):
        shutil.rmtree(os.path.join(PUB, 'piezas'))
    os.makedirs(os.path.join(PUB, 'piezas'), exist_ok=True)
    os.makedirs(os.path.join(PUB, 'mascaras'), exist_ok=True)
    os.makedirs(SRC, exist_ok=True)

    A = np.asarray(Image.open(os.path.join(BASE, 'imagen/escena-1080.png')).convert('RGB'), np.float32)
    L = lab(A)
    et, n, _ = regiones(A)
    idx = np.arange(n)
    area = np.bincount(et.ravel(), minlength=n)
    cy = ndi.mean(np.mgrid[0:H, 0:W][0], et, idx)
    cx = ndi.mean(np.mgrid[0:H, 0:W][1], et, idx)
    med = np.stack([ndi.mean(L[..., c], et, idx) for c in range(3)], 1)
    chroma = np.hypot(med[:, 1], med[:, 2])

    # --- capa por mayoría -------------------------------------------------------------------------
    NOM = ['cielo', 'fachada', 'suelo', 'camarero', 'terraza_izq', 'terraza_der', 'mano']
    yy = np.arange(H)[:, None] * np.ones((1, W), int)
    sem = np.where(yy < Y_TEJADO, 0, np.where(yy < Y_SUELO, 1, 2))
    for k in ('camarero', 'terraza_izq', 'terraza_der', 'mano'):
        sem[poligono(POL[k])] = NOM.index(k)
    votos = np.bincount((et * len(NOM) + sem).ravel(), minlength=n * len(NOM)).reshape(n, len(NOM)).astype(float)
    # lo que está a medias entre una figura y el fondo se va con la figura: mejor que llegue un trozo
    # de suelo con los clientes que dejar un cuello de camisa en la terraza vacía
    votos[:, 3:] *= 2.5
    capa = np.array([NOM[v] for v in votos.argmax(1)], dtype=object)

    for i in idx:
        if capa[i] == 'cielo':
            if 890 < cx[i] < 1000 and 25 < cy[i] < 140 and med[i, 0] > 60:
                capa[i] = 'luna'
            elif med[i, 2] > -18:
                capa[i] = 'guirnalda'
        elif capa[i] == 'fachada':
            if area[i] > 3000 and chroma[i] < 24 and med[i, 0] > 60 and not 630 <= cy[i] <= 815:
                capa[i] = 'pared'
            elif cy[i] < 345:
                capa[i] = 'tejado'
            elif 630 <= cy[i] <= 815:
                capa[i] = 'toldo'
            else:
                capa[i] = 'detalle'
        elif capa[i] == 'mano':
            if 740 < cx[i] < 900 and 1570 < cy[i] < 1745 and med[i, 0] > 70:
                capa[i] = 'burbuja'
    en_mano = [i for i in idx if capa[i] == 'mano']
    pant = max(en_mano, key=lambda i: area[i] * (med[i, 2] < -30))
    capa[pant] = 'pantalla'
    # la burbuja entera en una pieza: su filo claro puede haber salido como región aparte
    burb = max((i for i in idx if capa[i] == 'burbuja'), key=lambda i: area[i])
    cerca = ndi.binary_dilation(et == burb, iterations=16)
    junto = ndi.mean(cerca.astype(np.float32), et, idx)
    for i in en_mano:
        if i != pant and junto[i] > 0.6:
            capa[i] = 'burbuja'
    for i in idx:
        if capa[i] == 'burbuja' and i != burb:
            et[et == i] = burb
    # y su sombra: lo de la mano pegado a la burbuja (a menos de 10 px) se va con ella
    pegado = ndi.binary_dilation(et == burb, iterations=10) & np.isin(et, [i for i in en_mano if i != pant and capa[i] == 'mano'])
    et[pegado] = burb

    # --- cada pieza de delante se lleva su sombra y su borde ----------------------------------------
    # Los píxeles de la hoja de detrás pegados a una pieza (su sombra dura, el filo azul, la fibra) se
    # van con la pieza: así el relleno de la hoja sale limpio, sin fantasmas de ventanas, y al volar
    # cada recorte lleva su propia sombra. Lo que es color limpio de la hoja se queda en la hoja.
    # mediana pequeña: quita el grano pero conserva las ranuras blancas de 2-3 px (son el borde de la pieza)
    Lm = lab(np.dstack([ndi.median_filter(A[..., c], size=3) for c in range(3)]))
    ids_de = lambda *ks: [i for i in idx if capa[i] in ks]
    frente = [i for i in idx if capa[i] not in ('cielo', 'pared', 'suelo')]

    def lleva(origen, destino, criterio, r=16):
        o = np.isin(et, origen)
        de = np.isin(et, destino)
        d, (iy, ix) = ndi.distance_transform_edt(~o, return_indices=True)
        mov = de & (d <= r) & (criterio | (d <= 3))
        et[mov] = et[iy[mov], ix[mov]]

    def distinto(ks, umbral):
        m = np.isin(et, ids_de(*ks))
        med = np.median(Lm[m], axis=0)
        return np.linalg.norm(Lm - med, axis=-1) > umbral

    suelo0 = np.isin(et, ids_de('suelo'))  # el suelo tal cual, para sacar piedras de muestra
    lleva(frente, ids_de('cielo'), distinto(['cielo'], 12))
    lleva(frente, ids_de('pared'), distinto(['pared'], 10), r=22)  # las macetas y el toldo dan sombras anchas
    lleva(frente, ids_de('suelo'), Lm[..., 0] < 36)  # la piedra ya es oscura: solo la sombra de verdad
    lleva(ids_de('burbuja'), ids_de('pantalla'), distinto(['pantalla'], 12))

    M = {k: np.isin(et, [i for i in idx if capa[i] == k]) for k in set(capa)}
    vacio = np.zeros((H, W), bool)
    detras = lambda z: np.logical_or.reduce([M.get(k, vacio) for k, zk in Z.items() if zk < z] + [vacio])

    # --- hojas de fondo completas ------------------------------------------------------------------
    hojas = {}
    # cielo: todo lo de arriba del tejado (y algo por debajo, para que no quede hueco al llegar el tejado)
    D = (yy < Y_TEJADO + 45) | M['cielo']
    img = relleno_suave(A, M['cielo'], D & ~M['cielo'], 101)
    et_c = trocea(D, 7, 11, aniso=2.2)
    hojas['cielo'] = (et_c, fibra_en_cortes(img, et_c, 12))
    # pared: toda la franja de la fachada, por detrás de ventanas, toldo, plantas y cabezas
    D = (yy >= Y_TEJADO) & (yy < Y_SUELO + 4) & ~detras(Z['pared'])
    # el relleno sale solo del crema claro de la pared: sin grietas ni sombras que manchen los huecos
    claro = M['pared'] & (Lm[..., 0] > np.percentile(Lm[..., 0][M['pared']], 35))
    img = relleno_suave(A, claro, D & ~M['pared'], 102)
    et_p = trocea(D, 12, 21)
    hojas['pared'] = (et_p, fibra_en_cortes(img, et_p, 22))
    # suelo: piedras nuevas por debajo de la terraza, el camarero y la mano, y recortadas de nuevo
    D = (yy >= Y_SUELO - 3) & ~detras(Z['suelo'])
    comp = np.where(M['suelo'][..., None], A, empedrado(A, suelo0, 41))
    comp = np.where(D[..., None], comp, 0)
    et_s, _, _ = regiones(comp, min_area=600, validos=D)
    et_s = limpia(et_s, D, 600)
    et_s = parte_grandes(et_s, 26000, 31, aniso=1.6)
    hojas['suelo'] = (et_s, comp)
    # pantalla del móvil: entera por debajo de la burbuja
    D = M['pantalla'] | M['burbuja']
    img = relleno_suave(A, M['pantalla'], M['burbuja'], 103)
    hojas['pantalla'] = (np.where(D, 0, -1).astype(np.int32), img)

    # --- lista de piezas ----------------------------------------------------------------------------
    piezas = []

    def exporta(etk, img, nombre_capa):
        objs = ndi.find_objects(etk + 1)
        for j, sl in enumerate(objs):
            if sl is None:
                continue
            m = etk[sl] == j
            a = int(m.sum())
            if a < 40:
                continue
            rgba = np.dstack([img[sl], m * 255.0])
            rgba[~m] = 0
            k = len(piezas)
            guarda(rgba, os.path.join(PUB, 'piezas', f'{k:03d}.png'), optimize=True)
            ys, xs = np.nonzero(m)
            piezas.append({'id': k, 'capa': nombre_capa, 'z': Z[nombre_capa], 'x': sl[1].start, 'y': sl[0].start,
                           'w': sl[1].stop - sl[1].start, 'h': sl[0].stop - sl[0].start, 'area': a,
                           'cx': float(sl[1].start + xs.mean()), 'cy': float(sl[0].start + ys.mean())})

    for k in ('cielo', 'pared', 'suelo', 'pantalla'):
        exporta(hojas[k][0], hojas[k][1], k)
    for k in ('luna', 'guirnalda', 'tejado', 'detalle', 'toldo', 'camarero', 'terraza_izq', 'terraza_der', 'mano', 'burbuja'):
        ids = [i for i in idx if capa[i] == k]
        if not ids:
            continue
        etk = np.full((H, W), -1, np.int32)
        for j, i in enumerate(ids):
            etk[et == i] = j
        exporta(etk, A, k)

    # --- comprobaciones: la escena montada es la original; la terraza vacía se ve entera -----------
    def compone(filtro):
        out = np.zeros((H, W, 3), np.float32) + CREMA
        for p in sorted(piezas, key=lambda p: p['z']):
            if not filtro(p):
                continue
            im = np.asarray(Image.open(os.path.join(PUB, 'piezas', f"{p['id']:03d}.png")), np.float32)
            a = im[..., 3:4] / 255
            sl = (slice(p['y'], p['y'] + p['h']), slice(p['x'], p['x'] + p['w']))
            out[sl] = out[sl] * (1 - a) + im[..., :3] * a
        return out

    llena = compone(lambda p: True)
    dif = np.abs(llena - A).max(-1)
    print(f'piezas {len(piezas)}; píxeles distintos de la original: {(dif > 12).mean() * 100:.2f} % (fibra de los cortes nuevos)')
    guarda(llena, os.path.join(REV, 'montada-llena.png'))
    vacia = compone(lambda p: p['capa'] not in ('terraza_izq', 'terraza_der', 'mano', 'pantalla', 'burbuja'))
    guarda(vacia, os.path.join(REV, 'montada-vacia.png'))
    rng = np.random.default_rng(3)
    col = {k: rng.integers(60, 255, 3) for k in Z}
    capas_vis = np.zeros((H, W, 3), np.float32)
    for p in sorted(piezas, key=lambda p: p['z']):
        im = np.asarray(Image.open(os.path.join(PUB, 'piezas', f"{p['id']:03d}.png")))[..., 3] > 0
        sl = (slice(p['y'], p['y'] + p['h']), slice(p['x'], p['x'] + p['w']))
        capas_vis[sl][im] = col[p['capa']] * (0.75 + 0.25 * ((p['id'] * 7919) % 5) / 4)
    guarda(A * 0.35 + capas_vis * 0.65, os.path.join(REV, 'capas.png'))
    return piezas, M, A


if __name__ == '__main__':
    piezas, M, A = main()
    from collections import Counter
    print(Counter(p['capa'] for p in piezas))
    # el guion (montaje.py) lee de aquí las piezas; así se puede retocar el tiempo sin volver a cortar
    with open(os.path.join(BASE, 'imagen/piezas.json'), 'w') as f:
        json.dump(piezas, f)
