"""Rasgado de papel del anuncio «La pizza que nadie vio».

Borde roto a mano con la franja de fibra clara del alma del papel: el mismo acabado que las tres
piezas de la persiana, que Víctor pidió extender al resto de imágenes (26/09/2026).

- rasgar(): aplica el rasgado a una imagen (RGB o RGBA) en los lados que se pidan.
- mascara_y_fibra(): máscara y franja de fibra sueltas, para rasgar en Remotion lo que no es una
  imagen fija (vídeo, interfaz) con `mask-image` y una capa encima.
- contorno_rasgado(): el mismo borde como polígono, para la hoja en 3D que se arruga.
"""
import numpy as np

CREMA = np.array([236, 231, 219], np.float32)


def _blur(a, s):
    """Desenfoque gaussiano por FFT (sin scipy)."""
    h, w = a.shape
    fy = np.fft.fftfreq(h)[:, None]
    fx = np.fft.fftfreq(w)[None, :]
    return np.real(np.fft.ifft2(np.fft.fft2(a) * np.exp(-2 * np.pi**2 * s**2 * (fx**2 + fy**2))))


def ruido(h, w, seed, s):
    r = np.random.default_rng(seed)
    n = _blur(r.standard_normal((h, w)), s)
    return n / (n.std() + 1e-9)


def _distancia(h, w, lados):
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
    return d


def mascara_y_fibra(h, w, seed=1, amp=6.0, fibra=6.0, margen=None, lados='tblr'):
    """Devuelve (alfa 0..1, fibra 0..1) para un rectángulo de h x w con los lados rasgados."""
    margen = amp * 1.6 + 2 if margen is None else margen
    n1 = ruido(h, w, seed, 6)
    n2 = ruido(h, w, seed + 1, 1.5)
    d = _distancia(h, w, lados) - margen + amp * n1 + 1.2 * n2
    alfa = np.clip(d + 0.5, 0, 1)
    f = np.clip(1 - d / fibra, 0, 1) * (d > 0) * np.clip(0.75 + 0.35 * n2, 0, 1)
    return alfa, f


def rasgar(img, seed=1, amp=6.0, fibra=6.0, margen=None, lados='tblr'):
    """Imagen (H x W x 3|4, 0..255) → RGBA uint8 con los lados rasgados y la fibra clara."""
    a = np.asarray(img, np.float32)
    h, w = a.shape[:2]
    alfa, f = mascara_y_fibra(h, w, seed, amp, fibra, margen, lados)
    rgb = a[..., :3] * (1 - f[..., None]) + CREMA * f[..., None]
    if a.shape[2] == 4:
        alfa = alfa * a[..., 3] / 255
    out = np.dstack([np.clip(rgb, 0, 255), alfa * 255]).astype(np.uint8)
    out[out[..., 3] == 0, :3] = 0
    return out


def fibra_rgba(alfa, f):
    """Capa de fibra (crema con alfa) para poner encima de un elemento enmascarado."""
    h, w = alfa.shape
    out = np.zeros((h, w, 4), np.uint8)
    out[..., :3] = CREMA.astype(np.uint8)
    out[..., 3] = (np.clip(f * alfa, 0, 1) * 255).astype(np.uint8)
    return out


def contorno_rasgado(w, h, seed=1, amp=5.0, paso=3.0, margen=8.0):
    """Polígono rasgado dentro de un rectángulo w x h (coordenadas de imagen, y hacia abajo)."""
    r = np.random.default_rng(seed)
    # Se recorre el rectángulo metido `margen` hacia dentro y cada punto se aparta por su normal.
    iw, ih = w - 2 * margen, h - 2 * margen
    per = 2 * (iw + ih)
    n = int(per / paso)
    s = np.arange(n) * paso
    # ruido 1D del borde: muchas escalas con más peso en las grandes y un temblor fino, periódico
    k = np.arange(1, 90)
    fases = r.uniform(0, 2 * np.pi, (len(k),))
    amps = 1 / (k ** 1.1) * r.uniform(0.6, 1.0, (len(k),))
    ang = 2 * np.pi * s / per
    n1 = (amps[None, :] * np.sin(k[None, :] * ang[:, None] + fases[None, :])).sum(1)
    n1 = n1 / (n1.std() + 1e-9)
    off = amp * np.clip(n1, -1.6, 1.6) + r.standard_normal(n) * 0.45
    pts = []
    for si, o in zip(s, off):
        if si < iw:
            x, y, nx, ny = margen + si, margen, 0, 1
        elif si < iw + ih:
            x, y, nx, ny = w - margen, margen + si - iw, -1, 0
        elif si < 2 * iw + ih:
            x, y, nx, ny = w - margen - (si - iw - ih), h - margen, 0, -1
        else:
            x, y, nx, ny = margen, h - margen - (si - 2 * iw - ih), 1, 0
        pts.append((x + nx * o, y + ny * o))
    return pts
