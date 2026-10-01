"""Biblioteca de la skill papel-stopmotion: cortar una imagen en piezas de papel, sin intervención.

Funciones puras (numpy, scipy, PIL). Las usa recortar.py. Salen del caso «La terraza que se llena»
(produccion/society-papel-recortado), generalizadas para que ninguna necesite polígonos ni medidas a mano.
"""
import math

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

CREMA = np.array([236, 231, 219], np.float32)


# --- ruido y papel -------------------------------------------------------------------------------------
def _blur(a, s):
    h, w = a.shape
    fy = np.fft.fftfreq(h)[:, None]
    fx = np.fft.fftfreq(w)[None, :]
    return np.real(np.fft.ifft2(np.fft.fft2(a) * np.exp(-2 * np.pi ** 2 * s ** 2 * (fx ** 2 + fy ** 2))))


def ruido(h, w, seed, s):
    n = _blur(np.random.default_rng(seed).standard_normal((h, w)), s)
    return n / (n.std() + 1e-9)


def grano(h, w, seed):
    return ruido(h, w, seed, 1.2) * 0.6 + ruido(h, w, seed + 1, 5) * 0.4


def mascara_y_fibra(h, w, seed=1, amp=6.0, fibra=6.0, margen=None, lados='tblr'):
    """Máscara (0..1) de un rectángulo con los lados rasgados y la franja clara de fibra."""
    margen = amp * 1.6 + 2 if margen is None else margen
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.full((h, w), 1e6, np.float32)
    if 'l' in lados:
        d = np.minimum(d, xx)
    if 'r' in lados:
        d = np.minimum(d, w - 1 - xx)
    if 't' in lados:
        d = np.minimum(d, yy)
    if 'b' in lados:
        d = np.minimum(d, h - 1 - yy)
    n2 = ruido(h, w, seed + 1, 1.5)
    d = d - margen + amp * ruido(h, w, seed, 6) + 1.2 * n2
    alfa = np.clip(d + 0.5, 0, 1)
    f = np.clip(1 - d / fibra, 0, 1) * (d > 0) * np.clip(0.75 + 0.35 * n2, 0, 1)
    return alfa, f


def fibra_rgba(alfa, f):
    out = np.zeros(alfa.shape + (4,), np.uint8)
    out[..., :3] = CREMA.astype(np.uint8)
    out[..., 3] = (np.clip(f * alfa, 0, 1) * 255).astype(np.uint8)
    return out


# --- color -------------------------------------------------------------------------------------------
def lab(rgb):
    c = np.asarray(rgb, np.float32) / 255
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], np.float32)
    xyz = c @ m.T / np.array([0.95047, 1, 1.08883], np.float32)
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.dstack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])])


def mediana(A, s):
    return np.dstack([ndi.median_filter(A[..., c], size=s) for c in range(3)])


# --- regiones: cada trozo de papel de la imagen ---------------------------------------------------------
def _ranuras(L, chroma):
    """Líneas finas, claras y sin color: las ranuras blancas entre piezas."""
    return (L - ndi.grey_opening(L, size=(9, 9)) > 7) & (L > 70) & (chroma < 22)


def _pares(et):
    n = int(et.max()) + 1
    a = np.concatenate([et[:, :-1].ravel(), et[:-1, :].ravel()]).astype(np.int64)
    b = np.concatenate([et[:, 1:].ravel(), et[1:, :].ravel()]).astype(np.int64)
    k = a != b
    return a[k], b[k], n


def _reetiqueta(et):
    return np.unique(et, return_inverse=True)[1].reshape(et.shape).astype(np.int32)


def _fusiona_pequenas(et, L, min_area):
    for _ in range(40):
        et = _reetiqueta(et)
        n = int(et.max()) + 1
        idx = np.arange(n)
        area = np.bincount(et.ravel(), minlength=n)
        chicas = area < min_area
        if not chicas.any():
            break
        med = np.stack([ndi.mean(L[..., c], et, idx) for c in range(3)], 1)
        a, b, _ = _pares(et)
        lo, hi = np.minimum(a, b), np.maximum(a, b)
        cod, cnt = np.unique(lo * n + hi, return_counts=True)
        pa, pb = cod // n, cod % n
        dest, mejor = idx.copy(), np.full(n, np.inf)
        for x, y in ((pa, pb), (pb, pa)):
            sel = chicas[x]
            d = np.linalg.norm(med[x[sel]] - med[y[sel]], axis=1) - 0.002 * cnt[sel]
            for xi, yi, di in zip(x[sel], y[sel], d):
                if di < mejor[xi]:
                    mejor[xi], dest[xi] = di, yi
        for i in np.nonzero(chicas)[0]:
            j = dest[i]
            if chicas[j] and dest[j] == i and j > i:
                dest[i] = i
        for _ in range(8):
            dest = dest[dest]
        et = dest[et]
    return _reetiqueta(et)


def _raiz(p, i):
    while p[i] != i:
        p[i] = p[p[i]]
        i = p[i]
    return i


def _fusiona_parecidas(et, L, rn, de_max, ranura_max=0.25):
    """Une vecinas de color parecido si su frontera no va sobre una ranura blanca (textura, no corte)."""
    rnd = ndi.binary_dilation(rn, iterations=3)
    for _ in range(4):
        n = int(et.max()) + 1
        idx = np.arange(n)
        med = np.stack([ndi.mean(L[..., c], et, idx) for c in range(3)], 1)
        a = np.concatenate([et[:, :-1].ravel(), et[:-1, :].ravel()]).astype(np.int64)
        b = np.concatenate([et[:, 1:].ravel(), et[1:, :].ravel()]).astype(np.int64)
        r = np.concatenate([(rnd[:, :-1] | rnd[:, 1:]).ravel(), (rnd[:-1, :] | rnd[1:, :]).ravel()])
        k = a != b
        lo, hi, r = np.minimum(a[k], b[k]), np.maximum(a[k], b[k]), r[k]
        uc, inv, tot = np.unique(lo * n + hi, return_inverse=True, return_counts=True)
        enr = np.bincount(inv, weights=r.astype(np.float64))
        pa, pb = uc // n, uc % n
        ok = (np.linalg.norm(med[pa] - med[pb], axis=1) < de_max) & (enr / tot < ranura_max) & (tot >= 12)
        if not ok.any():
            break
        p = idx.copy()
        for x, y in zip(pa[ok], pb[ok]):
            rx, ry = _raiz(p, x), _raiz(p, y)
            if rx != ry:
                p[max(rx, ry)] = min(rx, ry)
        et = _reetiqueta(np.array([_raiz(p, i) for i in idx])[et])
    return et


def regiones(img, min_area=260, umbral=0.42, de_max=8.0, validos=None):
    """Etiquetas H x W: mediana, gradiente de color, watershed desde lo plano y fusiones.
    `validos`: zona que cuenta para los umbrales (si la imagen viene enmascarada)."""
    rgb = np.asarray(img, np.float32)[..., :3]
    L = lab(mediana(rgb, 5))
    chroma = np.hypot(L[..., 1], L[..., 2])
    g = ndi.gaussian_filter(sum(np.hypot(ndi.sobel(L[..., c], 0), ndi.sobel(L[..., c], 1)) for c in range(3)), 1.0)
    rn = _ranuras(L[..., 0], chroma)
    gv = g if validos is None else g[validos]
    plano = ndi.binary_erosion((g < np.quantile(gv, umbral)) & ~ndi.binary_dilation(rn, iterations=1), iterations=2)
    sem, _ = ndi.label(plano)
    area = np.bincount(sem.ravel())
    sem[area[sem] < 30] = 0
    sem = _reetiqueta(sem)
    g8 = np.clip(g / np.quantile(gv, 0.995) * 255, 0, 255).astype(np.uint8)
    et = ndi.watershed_ift(g8, sem)
    et = _fusiona_pequenas(et, L, min_area)
    return _fusiona_parecidas(et, L, rn, de_max)


# --- rellenos ----------------------------------------------------------------------------------------
def desenfoca(a, s):
    if s <= 4:
        return ndi.gaussian_filter(a, s)
    f = int(s // 4)
    h, w = a.shape
    ph, pw = -h % f, -w % f
    b = np.pad(a, ((0, ph), (0, pw)), mode='edge').reshape((h + ph) // f, f, (w + pw) // f, f).mean((1, 3))
    return ndi.zoom(ndi.gaussian_filter(b, s / f), f, order=1)[:h, :w]


def relleno_suave(img, conocido, falta, seed):
    """Rellena `falta` desde `conocido` (convolución normalizada a varias escalas) y le pone grano."""
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
    if resto.any():
        _, (iy, ix) = ndi.distance_transform_edt(~conocido, return_indices=True)
        res[resto] = img[iy[resto], ix[resto]]
    g = grano(*falta.shape, seed)
    out[falta] = res[falta] * (1 + 0.04 * g[falta][:, None])
    return out


def muestras_textura(A, hoja, seed):
    """Si la hoja es un mosaico (piedras, baldosas, ladrillos), devuelve trozos enteros para estampar
    y el color de la junta; si es lisa, None. Separa las dos clases de color con PCA + Otsu."""
    L = lab(mediana(A, 5))
    v = L[hoja]
    if len(v) < 5000 or np.linalg.norm(v.std(0)) < 5.5:
        print(f'    textura: lisa (dispersión {np.linalg.norm(v.std(0)) if len(v) else 0:.1f})')
        return None
    # el color separa mejor la pieza de la junta que la luz (que varía con el relieve del papel)
    peso = np.array([0.5, 1, 1], np.float32)
    v = v * peso
    mu = v.mean(0)
    e = np.linalg.eigh(np.cov((v - mu).T))[1][:, -1]
    proj = (L * peso - mu) @ e
    pv = proj[hoja]
    hist, bordes = np.histogram(pv, 128)
    p = hist / hist.sum()
    w0 = np.cumsum(p)
    mu_c = np.cumsum(p * bordes[:-1])
    corte = bordes[np.argmax((mu_c[-1] * w0 - mu_c) ** 2 / (w0 * (1 - w0) + 1e-9))]
    dentro = ndi.binary_erosion(hoja, iterations=3)
    H, W = hoja.shape
    mejor = None
    cuenta = []
    for clase in (proj < corte, proj >= corte):
        m = ndi.binary_opening(hoja & clase, iterations=3)
        et, n = ndi.label(m)
        trozos = []
        for i, sl in enumerate(ndi.find_objects(et)):
            if sl is None or sl[0].start <= 2 or sl[1].start <= 2 or sl[0].stop >= H - 2 or sl[1].stop >= W - 2:
                continue
            mm = et[sl] == i + 1
            a = mm.sum()
            if 700 < a < 60000 and a >= 0.4 * mm.size and dentro[sl][mm].mean() > 0.9:
                trozos.append((sl, mm))
        cuenta.append((n, len(trozos)))
        # las piezas del mosaico son la clase de trozos grandes; la junta da trozos pequeños y finos
        tam = np.median([mm.sum() for _, mm in trozos]) if trozos else 0
        if len(trozos) >= 4 and (mejor is None or tam > mejor[2]):
            junta = A[hoja & ~clase]
            mejor = (trozos, np.median(junta, 0) if len(junta) else CREMA, tam)
    print(f'    textura: dispersión {np.linalg.norm(v.std(0)):.1f}, componentes y trozos válidos por clase {cuenta}')
    if mejor is None:
        return None
    # cada trozo con la altura de la que sale, para corregir la perspectiva al estampar
    out = []
    for sl, mm in mejor[0]:
        mm = ndi.binary_fill_holes(mm)
        # borde de papel: franja clara de fibra, como las piezas de la imagen
        d = ndi.distance_transform_edt(np.pad(mm, 1))[1:-1, 1:-1]
        f = np.clip(1 - d / 3.2, 0, 1)[..., None] * mm[..., None]
        rgb = A[sl] * (1 - f) + CREMA * f
        out.append((Image.fromarray(np.dstack([rgb, mm * 255.0]).astype(np.uint8)), (sl[0].start + sl[0].stop) / 2))
    return out, mejor[1]


def estampa(forma, trozos, junta, seed, perspectiva=None):
    """Lienzo H x W de junta con los trozos estampados en filas; con `perspectiva=(y0, y1)`,
    más pequeños arriba (fondo) que abajo."""
    H, W = forma
    r = np.random.default_rng(seed)
    esc = lambda y: 1.0 if perspectiva is None else 0.5 + 0.55 * np.clip((y - perspectiva[0]) / max(1, perspectiva[1] - perspectiva[0]), 0, 1)
    trozos = [p.resize((max(8, round(p.width / esc(y))), max(8, round(p.height / esc(y)))), Image.LANCZOS) for p, y in trozos]
    lienzo = Image.fromarray(np.clip(junta[None, None, :] * (1 + 0.05 * grano(H, W, seed)[..., None]), 0, 255).astype(np.uint8)).convert('RGBA')
    y = -40
    while y < H + 40:
        s = esc(y)
        x = -r.uniform(20, 120) * s
        altos = []
        while x < W + 40:
            p = trozos[r.integers(len(trozos))]
            k = s * r.uniform(0.85, 1.1)
            q = p.resize((max(8, round(p.width * k)), max(8, round(p.height * k))), Image.LANCZOS)
            if r.random() < 0.5:
                q = q.transpose(Image.FLIP_LEFT_RIGHT)
            px, py = int(x), int(y + r.uniform(-10, 10) * s)
            sombra = Image.new('RGBA', q.size, (20, 14, 8, 0))
            sombra.putalpha(q.getchannel('A').point(lambda v: int(v * 0.35)))
            lienzo.alpha_composite(sombra, (px + int(4 * s), py + int(5 * s)))
            lienzo.alpha_composite(q, (px, py))
            x += q.width * 0.97 + 3 * s
            altos.append(q.height)
        y += max(10, np.median(altos) * 0.82)
    return np.asarray(lienzo.convert('RGB'), np.float32)


# --- trocear -----------------------------------------------------------------------------------------
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
    """Parte un dominio en n trozos de borde de papel roto (Voronoi con coordenadas deformadas)."""
    H, W = dominio.shape
    ys, xs = np.nonzero(dominio)
    r = np.random.default_rng(seed)
    idx = r.choice(len(xs), min(len(xs), 20000), replace=False)
    px, py = xs[idx].astype(np.float32), ys[idx].astype(np.float32)
    n = max(1, min(n, len(px)))
    sel = r.choice(len(px), n, replace=False)
    c = np.stack([px[sel], py[sel]], 1)
    for _ in range(12):
        a = ((px[:, None] - c[None, :, 0]) ** 2 + ((py[:, None] - c[None, :, 1]) * aniso) ** 2).argmin(1)
        for i in range(n):
            if (a == i).any():
                c[i] = px[a == i].mean(), py[a == i].mean()
    nx = ruido(H, W, seed + 3, 40) * amp + ruido(H, W, seed + 4, 1.5) * 1.8
    ny = ruido(H, W, seed + 5, 40) * amp + ruido(H, W, seed + 6, 1.5) * 1.8
    X, Y = xs + nx[ys, xs], ys + ny[ys, xs]
    et = np.full((H, W), -1, np.int32)
    et[ys, xs] = ((X[:, None] - c[None, :, 0]) ** 2 + ((Y[:, None] - c[None, :, 1]) * aniso) ** 2).argmin(1)
    return conexos(et)


def fibra_en_cortes(img, et, seed, ancho=2.4):
    """Franja clara de fibra a los dos lados de cada corte nuevo."""
    H, W = et.shape
    b = np.zeros((H, W), bool)
    for dy, dx in ((0, 1), (1, 0)):
        a1, a2 = et[:H - dy, :W - dx], et[dy:, dx:]
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
    chico = np.zeros(et.shape, bool)
    chico[et >= 0] = area[et[et >= 0]] < min_area
    et[chico] = -1
    hueco = (et < 0) & dominio
    if hueco.any() and (et >= 0).any():
        _, (iy, ix) = ndi.distance_transform_edt(et < 0, return_indices=True)
        et[hueco] = et[iy[hueco], ix[hueco]]
    u, inv = np.unique(et, return_inverse=True)
    return inv.reshape(et.shape).astype(np.int32) - (1 if u[0] == -1 else 0)


def parte_grandes(et, max_area, seed, aniso=1.0):
    out = et.copy()
    sig = int(et.max()) + 1
    area = np.bincount(et[et >= 0].ravel())
    for i in np.nonzero(area > max_area)[0]:
        n = int(math.ceil(area[i] / max_area))
        m = et == i
        sub = trocea(m, n, seed + int(i), aniso=aniso, amp=8)
        out[m] = np.where(sub[m] == 0, i, sig + sub[m] - 1)
        sig += n - 1
    return out


def lleva(et, origen, destino, criterio, r):
    """Los píxeles de `destino` a menos de r de `origen` que cumplen `criterio` (sombra, filo, fibra),
    o están pegados (≤ 3 px), pasan a la región de origen más cercana. Modifica `et`."""
    o = np.isin(et, origen)
    de = np.isin(et, destino)
    if not o.any() or not de.any():
        return
    d, (iy, ix) = ndi.distance_transform_edt(~o, return_indices=True)
    mov = de & (d <= r) & (criterio | (d <= 3))
    et[mov] = et[iy[mov], ix[mov]]
