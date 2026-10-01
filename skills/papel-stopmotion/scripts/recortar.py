"""Corta una imagen en piezas de papel para montarla en stop-motion con Remotion (skill papel-stopmotion).

Uso, desde la raíz del repo:
  python skills/papel-stopmotion/scripts/recortar.py IMAGEN --id NOMBRE [--modo escena|recorte] [opciones]

Modos
  escena   Imagen opaca que llena el cuadro. Se ajusta a --ancho x --alto (1080 x 1920 por defecto).
           Las regiones grandes que tocan el borde son hojas de fondo (cielo, pared, suelo): se completan
           por detrás de lo que tienen delante (lisas con relleno y grano; mosaicos como piedras o
           baldosas, estampando trozos reales) y se parten con cortes rasgados. Lo demás son figuras,
           agrupadas en objetos (lo que se toca) y ordenadas de lejos a cerca por su base.
  recorte  Imagen con transparencia (pantalla de la app, pegatina, objeto). Conserva su tamaño
           (x --escala). Sus regiones grandes son la base, entera; lo demás va encima.
Cada pieza se lleva la sombra dura y el filo que dejaba sobre la hoja de detrás.

Salidas
  promo/public/papel/<id>/NNN.png          piezas (RGBA recortadas a su caja)
  promo/src/recorte/escenas/<id>.json      datos de las piezas: lo lee <Escena id="..."> en Remotion
  promo/src/recorte/escenas/index.ts       índice de escenas (se regenera solo)
  promo/out/papel/<id>/                    revisión: rejilla.png (zonas 0-1 para el guion), capas.png, montada.png
"""
import argparse
import json
import os
import re
import shutil
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont
from scipy import ndimage as ndi

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, '../../..'))
sys.path.insert(0, AQUI)
from papel_lib import (CREMA, estampa, fibra_en_cortes, lab, limpia, lleva, mediana, muestras_textura,  # noqa: E402
                       regiones, relleno_suave, trocea)

PUB = os.path.join(RAIZ, 'promo/public/papel')
ESC = os.path.join(RAIZ, 'promo/src/recorte/escenas')
REV = os.path.join(RAIZ, 'promo/out/papel')


def carga(ruta, modo, ancho, alto, escala):
    im = Image.open(ruta)
    if modo == 'escena':
        im = im.convert('RGB')
        k = max(ancho / im.width, alto / im.height)
        im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
        x0, y0 = (im.width - ancho) // 2, (im.height - alto) // 2
        im = im.crop((x0, y0, x0 + ancho, y0 + alto))
        return np.asarray(im, np.float32), np.ones((alto, ancho), np.float32)
    im = im.convert('RGBA')
    if escala != 1:
        im = im.resize((round(im.width * escala), round(im.height * escala)), Image.LANCZOS)
    a = np.asarray(im, np.float32)
    return a[..., :3], a[..., 3] / 255


def hojas_de_fondo(A, et, area, tot, de_max=9.0, contacto_min=400):
    """Hojas de fondo de una escena: se unen las regiones vecinas grandes de color parecido (un
    empedrado son muchas piedras) y cuentan como fondo las uniones grandes que tocan el borde del
    cuadro a lo largo (cielo, pared, suelo); lo que solo asoma al borde, como una mano, no.
    Cada hoja queda como una sola etiqueta en `et` (se modifica). Devuelve sus etiquetas."""
    n = len(area)
    idx = np.arange(n)
    L = lab(mediana(A, 5))
    med = np.stack([ndi.mean(L[..., c], et, idx) for c in range(3)], 1)
    a = np.concatenate([et[:, :-1].ravel(), et[:-1, :].ravel()]).astype(np.int64)
    b = np.concatenate([et[:, 1:].ravel(), et[1:, :].ravel()]).astype(np.int64)
    k = (a != b) & (a >= 0) & (b >= 0)
    cod = np.unique(np.minimum(a[k], b[k]) * n + np.maximum(a[k], b[k]))
    pa, pb = cod // n, cod % n
    ok = (area[pa] >= 1500) & (area[pb] >= 1500) & (np.linalg.norm(med[pa] - med[pb], axis=1) < de_max)
    p = idx.copy()

    def raiz(i):
        while p[i] != i:
            p[i] = p[p[i]]
            i = p[i]
        return i
    for x, y in zip(pa[ok], pb[ok]):
        rx, ry = raiz(x), raiz(y)
        if rx != ry:
            p[max(rx, ry)] = min(rx, ry)
    sup = np.array([raiz(i) for i in idx])
    sup_area = np.bincount(sup, weights=area, minlength=n)
    borde = np.concatenate([et[0, :], et[-1, :], et[:, 0], et[:, -1]])
    contacto = np.bincount(sup[borde[borde >= 0]], minlength=n)
    elegidas = [s for s in np.unique(sup) if sup_area[s] > 0.04 * tot and contacto[s] >= contacto_min]
    if not elegidas:
        elegidas = [int(np.argmax(sup_area))]
    hojas = []
    for s in elegidas:
        ids = idx[sup == s]
        et[np.isin(et, ids)] = ids[0]
        hojas.append(int(ids[0]))
    return hojas


def dueno_por_horizonte(mascaras, ids):
    """Qué hoja hay detrás de cada píxel tapado. Las hojas de una escena van apiladas en bandas
    (cielo / pared / suelo): entre cada par de bandas se mide la línea donde se tocan, columna a
    columna, y se interpola donde las figuras la tapan. Encima de la línea, la hoja de arriba."""
    H, W = mascaras[0].shape
    yy = np.arange(H)[:, None]
    lineas = []
    for arriba, abajo in zip(mascaras[:-1], mascaras[1:]):
        fondo_arriba = np.where(arriba.any(0), np.where(arriba, yy, -1).max(0), -1)
        techo_abajo = np.where(abajo.any(0), np.where(abajo, yy, H).min(0), H)
        cols = np.nonzero((fondo_arriba >= 0) & (techo_abajo < H) & (techo_abajo - fondo_arriba < 40))[0]
        if len(cols) >= 3:
            y = (fondo_arriba[cols] + techo_abajo[cols]) / 2
            linea = np.interp(np.arange(W), cols, y)
        else:  # no se tocan en ninguna columna: a mitad entre la base de una y el techo de la otra
            fa = fondo_arriba[fondo_arriba >= 0]
            ta = techo_abajo[techo_abajo < H]
            linea = np.full(W, ((np.median(fa) if len(fa) else 0) + (np.median(ta) if len(ta) else H)) / 2)
        lineas.append(ndi.gaussian_filter1d(linea, 25))
    k = np.zeros((H, W), np.int32)
    for linea in lineas:
        k += yy >= linea[None, :]
    return ids[k]


def corta(A, alfa, modo, seed, min_area, objetos=False):
    """Devuelve una lista de capas (etiquetas, imagen, tipo 'h'|'f', z, objeto por etiqueta)."""
    H, W = A.shape[:2]
    escena = modo == 'escena'
    val = alfa > 0.5
    base = np.where(val[..., None], A, 0)
    et = regiones(base, min_area=min_area, validos=None if val.all() else val)
    et = limpia(et, val, min_area)
    n = int(et.max()) + 1
    idx = np.arange(n)
    area = np.bincount(et[et >= 0].ravel(), minlength=n)
    cajas = ndi.find_objects(et + 1)
    tot = val.sum()
    if escena:
        hojas = hojas_de_fondo(A, et, area, tot)
    else:
        hojas = [int(i) for i in idx if area[i] > 0.12 * tot] or [int(np.argmax(area))]
    figs = [int(i) for i in idx if i not in hojas]

    # cada pieza de delante se lleva su sombra y su filo sobre la hoja
    Lm = lab(mediana(A, 3))
    for h in hojas:
        med = np.median(Lm[et == h], 0)
        lleva(et, figs, [h], np.linalg.norm(Lm - med, axis=-1) > 10, 16 if escena else 6)

    if escena:
        # lo fino y lejos de cualquier parte gruesa (juntas de tablones, ranuras, filos sueltos) es fondo,
        # no figura: si no, une objetos que no se tocan (pizza, vaso y servilleta en una sola pieza).
        # Lo fino pegado a un objeto (el tenedor sobre la servilleta) se queda con él.
        hoja_m = np.isin(et, hojas)
        F = np.isin(et, figs)
        grueso = ndi.distance_transform_edt(F) >= 7
        linea = F & ~ndi.binary_dilation(grueso, iterations=10)
        if linea.any():
            _, (iy, ix) = ndi.distance_transform_edt(~hoja_m, return_indices=True)
            et[linea] = et[iy[linea], ix[linea]]

    M = {h: et == h for h in hojas}
    fig_m = val & ~np.logical_or.reduce(list(M.values()))
    if escena:
        orden = sorted(hojas, key=lambda h: np.nonzero(M[h])[0].mean())   # de arriba abajo: cielo, pared, suelo
        dueno = dueno_por_horizonte([M[h] for h in orden], np.array(orden))
    else:
        orden = sorted(hojas, key=lambda h: -M[h].sum())                  # de mayor a menor: marco, fondo
        dist = np.stack([ndi.distance_transform_edt(~M[h]) for h in hojas])
        dueno = np.array(hojas)[dist.argmin(0)]
    capas = []
    for z, h in enumerate(orden):
        D = M[h] | (fig_m & (dueno == h))
        tex = muestras_textura(A, M[h], seed + z) if escena else None
        if tex:
            trozos, junta = tex
            ys = np.nonzero(M[h])[0]
            persp = (ys.min(), H) if ys.max() >= H - 3 and ys.min() > 0.3 * H else None
            img = np.where(M[h][..., None], A, estampa((H, W), trozos, junta, seed + z, persp))
            etk = regiones(np.where(D[..., None], img, 0), min_area=600, validos=D)
            etk = limpia(etk, D, 600)
            print(f'  hoja {z}: mosaico, {len(trozos)} trozos de muestra')
        else:
            med = np.median(Lm[M[h]], 0)
            claro = M[h] & (np.linalg.norm(Lm - med, axis=-1) < 12)
            img = relleno_suave(A, claro if claro.sum() > 100 else M[h], D & ~M[h], seed + z)
            if escena:
                ys, xs = np.nonzero(D)
                nt = int(np.clip(round(D.sum() / 90000), 2, 12))
                etk = trocea(D, nt, seed + z, aniso=1.8 if np.ptp(xs) > 1.5 * np.ptp(ys) else 1.0)
                img = fibra_en_cortes(img, etk, seed + z)
            else:
                etk = np.where(D, 0, -1).astype(np.int32)
            print(f'  hoja {z}: lisa, {int(etk.max()) + 1} trozos')
        capas.append((etk, img, 'h', z, None))

    # figuras: objetos = lo que se toca; de lejos a cerca por la base del objeto
    mapa = np.full(n, -1, np.int32)
    vivos = [i for i in figs if (et == i).any()]
    mapa[vivos] = np.arange(len(vivos))
    etf = np.where(et >= 0, mapa[np.maximum(et, 0)], -1)
    obj, no = ndi.label(etf >= 0, structure=np.ones((3, 3)))
    if no:
        base_obj = ndi.maximum(np.mgrid[0:H, 0:W][0], obj, np.arange(1, no + 1))
        rango = np.argsort(np.argsort(base_obj))
        obj_de = np.zeros(len(vivos), np.int32)
        for j, sl in enumerate(ndi.find_objects(etf + 1)):
            if sl is not None:
                o = obj[sl][etf[sl] == j]
                obj_de[j] = rango[np.bincount(o).argmax() - 1]
        if objetos:
            # cada objeto entero en una sola pieza (la pizza con su plato, el vaso, la servilleta…)
            etf = np.where(obj > 0, obj - 1, -1).astype(np.int32)
            obj_de = rango.astype(np.int32)
        capas.append((etf, A, 'f', 10, obj_de))
    return capas


def exporta(capas, alfa, carpeta):
    piezas = []
    for etk, img, tipo, z, obj_de in capas:
        for j, sl in enumerate(ndi.find_objects(etk + 1)):
            if sl is None:
                continue
            m = etk[sl] == j
            a = int(m.sum())
            if a < 40:
                continue
            rgba = np.dstack([img[sl], m * alfa[sl] * 255.0])
            rgba[~m] = 0
            k = len(piezas)
            Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8)).save(os.path.join(carpeta, f'{k:03d}.png'), optimize=True)
            ys, xs = np.nonzero(m)
            o = int(obj_de[j]) if obj_de is not None else -1
            piezas.append({'i': k, 'x': sl[1].start, 'y': sl[0].start, 'w': sl[1].stop - sl[1].start, 'h': sl[0].stop - sl[0].start,
                           'z': z + (o if o >= 0 else 0), 't': tipo, 'o': o, 'cx': round(float(sl[1].start + xs.mean()), 1),
                           'cy': round(float(sl[0].start + ys.mean()), 1), 'b': int(sl[0].stop), 'a': a})
    return piezas


def revision(piezas, A, carpeta_piezas, rev, modo):
    H, W = A.shape[:2]
    os.makedirs(rev, exist_ok=True)
    out = np.zeros((H, W, 3), np.float32) + CREMA
    vis = np.zeros((H, W, 3), np.float32) + 40
    r = np.random.default_rng(1)
    for p in sorted(piezas, key=lambda p: p['z']):
        im = np.asarray(Image.open(os.path.join(carpeta_piezas, f"{p['i']:03d}.png")), np.float32)
        a = im[..., 3:4] / 255
        sl = (slice(p['y'], p['y'] + p['h']), slice(p['x'], p['x'] + p['w']))
        out[sl] = out[sl] * (1 - a) + im[..., :3] * a
        col = np.array([150, 150, 150]) * (0.7 + 0.3 * r.random()) if p['t'] == 'h' else r.integers(60, 255, 3)
        vis[sl] = vis[sl] * (1 - a) + col * a
    Image.fromarray(out.astype(np.uint8)).save(os.path.join(rev, 'montada.png'))
    Image.fromarray((A * 0.35 + vis * 0.65).astype(np.uint8)).save(os.path.join(rev, 'capas.png'))
    # rejilla pequeña con coordenadas normalizadas: para escribir las zonas del guion mirando una sola imagen
    k = 540 / W
    g = Image.fromarray(A.astype(np.uint8)).resize((540, round(H * k)), Image.LANCZOS)
    d = ImageDraw.Draw(g)
    try:
        f = ImageFont.truetype('arial.ttf', 13)
    except OSError:
        f = ImageFont.load_default()
    for t in range(1, 10):
        d.line([(540 * t / 10, 0), (540 * t / 10, g.height)], fill=(255, 0, 0), width=1)
        d.line([(0, g.height * t / 10), (540, g.height * t / 10)], fill=(255, 0, 0), width=1)
        d.text((540 * t / 10 + 2, 2), f'.{t}', fill=(255, 255, 0), font=f, stroke_width=2, stroke_fill=(0, 0, 0))
        d.text((2, g.height * t / 10 + 2), f'.{t}', fill=(255, 255, 0), font=f, stroke_width=2, stroke_fill=(0, 0, 0))
    g.save(os.path.join(rev, 'rejilla.png'))
    return (np.abs(out - A).max(-1) > 12).mean() * 100


def indice():
    archivos = sorted(f for f in os.listdir(ESC) if f.endswith('.json'))
    lin = ['// Generado por skills/papel-stopmotion/scripts/recortar.py: no editar a mano.',
           "import type {EscenaDatos} from '../motor';"]
    nombres = []
    for f in archivos:
        var = 'e_' + re.sub(r'\W', '_', f[:-5])
        lin.append(f"import {var} from './{f}';")
        nombres.append((f[:-5], var))
    lin.append('')
    lin.append('export const ESCENAS: Record<string, EscenaDatos> = {')
    lin += [f"  '{n}': {v} as unknown as EscenaDatos," for n, v in nombres]
    lin.append('};')
    with open(os.path.join(ESC, 'index.ts'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lin) + '\n')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('imagen')
    ap.add_argument('--id', required=True, help='nombre de la escena (minúsculas y guiones)')
    ap.add_argument('--modo', choices=['escena', 'recorte'], default='escena')
    ap.add_argument('--ancho', type=int, default=1080)
    ap.add_argument('--alto', type=int, default=1920)
    ap.add_argument('--escala', type=float, default=1.0, help='solo en modo recorte')
    ap.add_argument('--min-area', type=int, default=1500, help='pieza mínima en píxeles (más alto = menos piezas; 1500 = piezas grandes, montaje rápido)')
    ap.add_argument('--semilla', type=int, default=7)
    ap.add_argument('--objetos', action='store_true', help='cada objeto (lo que se toca) en una sola pieza entera; el fondo sigue en trozos')
    a = ap.parse_args()

    A, alfa = carga(a.imagen, a.modo, a.ancho, a.alto, a.escala)
    carpeta = os.path.join(PUB, a.id)
    shutil.rmtree(carpeta, ignore_errors=True)
    os.makedirs(carpeta)
    os.makedirs(ESC, exist_ok=True)
    print(f'{a.id}: {A.shape[1]} x {A.shape[0]}, modo {a.modo}')
    capas = corta(A, alfa, a.modo, a.semilla, a.min_area, a.objetos)
    piezas = exporta(capas, alfa, carpeta)
    datos = {'id': a.id, 'W': A.shape[1], 'H': A.shape[0], 'modo': a.modo, 'piezas': piezas}
    with open(os.path.join(ESC, f'{a.id}.json'), 'w', encoding='utf-8') as fh:
        json.dump(datos, fh, separators=(',', ':'))
    indice()
    dif = revision(piezas, np.where(alfa[..., None] > 0.5, A, CREMA), carpeta, os.path.join(REV, a.id), a.modo)
    nh = sum(p['t'] == 'h' for p in piezas)
    no = len({p['o'] for p in piezas if p['t'] == 'f'})
    print(f'{a.id}: {len(piezas)} piezas ({nh} de hojas, {len(piezas) - nh} de figuras en {no} objetos); '
          f'distinta de la original en {dif:.2f} % (fibra de los cortes). Revisión: promo/out/papel/{a.id}/')


if __name__ == '__main__':
    main()
