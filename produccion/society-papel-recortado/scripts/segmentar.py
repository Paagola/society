"""Regiones de papel de la escena: cada trozo de color que en la imagen está separado por una ranura
blanca o por un cambio de color pasa a ser una región. Las ranuras blancas se reparten entre las
regiones vecinas, así cada pieza se lleva su borde de fibra al moverse.

regiones(img) -> (etiquetas H x W int32, número de regiones)
"""
import numpy as np
from scipy import ndimage as ndi


def lab(rgb):
    c = np.asarray(rgb, np.float32) / 255
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]], np.float32)
    xyz = c @ m.T / np.array([0.95047, 1, 1.08883], np.float32)
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.dstack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])])


def ranuras(L, chroma):
    """Líneas finas, claras y sin color: las ranuras blancas entre piezas."""
    tophat = L - ndi.grey_opening(L, size=(9, 9))
    return (tophat > 7) & (L > 70) & (chroma < 22)


def adyacencia(et):
    n = int(et.max()) + 1
    a = np.concatenate([et[:, :-1].ravel(), et[:-1, :].ravel()]).astype(np.int64)
    b = np.concatenate([et[:, 1:].ravel(), et[1:, :].ravel()]).astype(np.int64)
    k = a != b
    lo, hi = np.minimum(a[k], b[k]), np.maximum(a[k], b[k])
    cod, cnt = np.unique(lo * n + hi, return_counts=True)
    return cod // n, cod % n, cnt


def fusiona_pequenas(et, labimg, min_area, max_pasadas=40):
    """Une cada región de menos de `min_area` píxeles con la vecina de color más parecido."""
    for _ in range(max_pasadas):
        et = np.unique(et, return_inverse=True)[1].reshape(et.shape).astype(np.int32)
        n = int(et.max()) + 1
        idx = np.arange(n)
        area = np.bincount(et.ravel(), minlength=n)
        med = np.stack([ndi.mean(labimg[..., c], et, idx) for c in range(3)], 1)
        chicas = area < min_area
        if not chicas.any():
            break
        a, b, cnt = adyacencia(et)
        # para cada región pequeña: la vecina con menor diferencia de color (a igualdad, la de más borde)
        dest = idx.copy()
        mejor = np.full(n, np.inf)
        for x, y, c in ((a, b, cnt), (b, a, cnt)):
            sel = chicas[x]
            x, y, c = x[sel], y[sel], c[sel]
            d = np.linalg.norm(med[x] - med[y], axis=1) - 0.002 * c
            orden = np.argsort(-d)  # la mejor (menor) se escribe la última
            for xi, yi, di in zip(x[orden], y[orden], d[orden]):
                if di < mejor[xi]:
                    mejor[xi], dest[xi] = di, yi
        # evitar ciclos: una región pequeña solo se une a otra si esa no se va también, o a la de índice menor
        for i in np.nonzero(chicas)[0]:
            j = dest[i]
            if chicas[j] and dest[j] == i and j > i:
                dest[i] = i
        # resolver cadenas
        for _ in range(8):
            dest = dest[dest]
        et = dest[et]
    et = np.unique(et, return_inverse=True)[1].reshape(et.shape).astype(np.int32)
    return et


def _raiz(p, i):
    while p[i] != i:
        p[i] = p[p[i]]
        i = p[i]
    return i


def fusiona_parecidas(et, labimg, rn, de_max=8.0, ranura_max=0.25, pasadas=4):
    """Une vecinas de color parecido si su frontera no va sobre una ranura blanca (textura, no corte)."""
    rnd = ndi.binary_dilation(rn, iterations=3)
    for _ in range(pasadas):
        n = int(et.max()) + 1
        idx = np.arange(n)
        med = np.stack([ndi.mean(labimg[..., c], et, idx) for c in range(3)], 1)
        # frontera total y frontera sobre ranura, por pareja
        a = np.concatenate([et[:, :-1].ravel(), et[:-1, :].ravel()]).astype(np.int64)
        b = np.concatenate([et[:, 1:].ravel(), et[1:, :].ravel()]).astype(np.int64)
        r = np.concatenate([(rnd[:, :-1] | rnd[:, 1:]).ravel(), (rnd[:-1, :] | rnd[1:, :]).ravel()])
        k = a != b
        lo, hi, r = np.minimum(a[k], b[k]), np.maximum(a[k], b[k]), r[k]
        cod = lo * n + hi
        uc, inv, tot = np.unique(cod, return_inverse=True, return_counts=True)
        enr = np.bincount(inv, weights=r.astype(np.float64))
        pa, pb = uc // n, uc % n
        de = np.linalg.norm(med[pa] - med[pb], axis=1)
        ok = (de < de_max) & (enr / tot < ranura_max) & (tot >= 12)
        if not ok.any():
            break
        p = idx.copy()
        for x, y in sorted(zip(pa[ok], pb[ok]), key=lambda t: 0):
            rx, ry = _raiz(p, x), _raiz(p, y)
            if rx != ry:
                p[max(rx, ry)] = min(rx, ry)
        raiz = np.array([_raiz(p, i) for i in idx])
        et = np.unique(raiz[et], return_inverse=True)[1].reshape(et.shape).astype(np.int32)
    return et


def regiones(img, min_area=260, umbral=0.42, de_max=8.0, validos=None):
    """`validos`: zona que cuenta para el umbral de «plano» (si la imagen viene enmascarada en negro)."""
    rgb = np.asarray(img, np.float32)[..., :3]
    suave = np.dstack([ndi.median_filter(rgb[..., c], size=5) for c in range(3)])
    L = lab(suave)
    chroma = np.hypot(L[..., 1], L[..., 2])
    g = sum(np.hypot(ndi.sobel(L[..., c], 0), ndi.sobel(L[..., c], 1)) for c in range(3))
    g = ndi.gaussian_filter(g, 1.0)
    rn = ranuras(L[..., 0], chroma)
    # semillas: zonas planas (gradiente bajo) fuera de las ranuras, algo erosionadas
    gv = g if validos is None else g[validos]
    plano = (g < np.quantile(gv, umbral)) & ~ndi.binary_dilation(rn, iterations=1)
    plano = ndi.binary_erosion(plano, iterations=2)
    sem, n = ndi.label(plano)
    area = np.bincount(sem.ravel())
    sem[area[sem] < 30] = 0
    sem = np.unique(sem, return_inverse=True)[1].reshape(sem.shape).astype(np.int32)
    g8 = np.clip(g / np.quantile(gv, 0.995) * 255, 0, 255).astype(np.uint8)
    et = ndi.watershed_ift(g8, sem)
    et = fusiona_pequenas(et, L, min_area)
    et = fusiona_parecidas(et, L, rn, de_max=de_max)
    return et, int(et.max()) + 1, rn
