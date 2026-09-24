"""A/B de reescalado: 720p nativo vs Lanczos vs ByteDance vs Topaz (y opcional 1080p nativo)."""
import json, subprocess, sys, os
import numpy as np
from PIL import Image, ImageFilter

os.chdir(os.path.dirname(os.path.abspath(__file__)))
W, H = 1080, 1920
VIDEOS = {k: v for k, v in {
    '720_nativo': 'v720.mp4',
    'bytedance_aigc': 'v_bytedance.mp4',
    'bytedance_pro': 'v_bytedance_pro.mp4',
    'topaz': 'v_topaz.mp4',
    '1080_nativo': 'v1080.mp4',
}.items() if os.path.exists(v)}
TIMES = [0.1, 1.5, 3.0, 4.5, 5.8]
# Regiones en coordenadas normalizadas (x0, y0, x1, y1) sobre el encuadre 9:16
REGIONS = {
    'gambas': (0.22, 0.38, 0.78, 0.66),
    'servilleta': (0.05, 0.72, 0.45, 0.84),
    'mantel': (0.02, 0.02, 0.30, 0.14),
}


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True).stdout + subprocess.run(cmd, capture_output=True, text=True).stderr


def probe(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries',
                          'stream=width,height,r_frame_rate,bit_rate,nb_frames', '-show_entries', 'format=duration,bit_rate',
                          '-of', 'json', path], capture_output=True, text=True).stdout
    return json.loads(out)


def cropdetect(path):
    err = subprocess.run(['ffmpeg', '-i', path, '-vf', 'cropdetect=24:16:0', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    crops = [l.split('crop=')[1].split()[0] for l in err.splitlines() if 'crop=' in l]
    return max(set(crops), key=crops.count) if crops else None


def frame(path, t):
    out = f'_f_{os.path.basename(path)}_{t}.png'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-ss', str(t), '-i', path, '-frames:v', '1', out])
    return Image.open(out).convert('RGB')


def to_out(im):
    return im.resize((W, H), Image.LANCZOS) if im.size != (W, H) else im


def region(im, r):
    x0, y0, x1, y1 = r
    w, h = im.size
    return im.crop((int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h)))


def edge_var(im):
    g = im.convert('L').filter(ImageFilter.FIND_EDGES)
    return float(np.asarray(g, dtype=np.float64).var())


def colour(im):
    a = np.asarray(im, dtype=np.float64)
    r, g, b = a[..., 0].mean(), a[..., 1].mean(), a[..., 2].mean()
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    return round(r / b, 3), round(float(np.median(lum)), 1)


def temporal_hf(path, n=48):
    """Energía temporal de alta frecuencia en 1080x1920: media |HP(t)-HP(t-1)|."""
    tmp = f'_seq_{os.path.basename(path)}'
    os.makedirs(tmp, exist_ok=True)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', path, '-vf', f'scale={W}:{H}:flags=lanczos',
                    '-frames:v', str(n), f'{tmp}/%03d.png'])
    files = sorted(os.listdir(tmp))
    prev = None
    diffs = []
    for f in files:
        g = Image.open(f'{tmp}/{f}').convert('L')
        a = np.asarray(g, dtype=np.float64)
        hp = a - np.asarray(g.filter(ImageFilter.GaussianBlur(2)), dtype=np.float64)
        if prev is not None:
            diffs.append(np.abs(hp - prev).mean())
        prev = hp
    return round(float(np.mean(diffs)), 3)


res = {'probe': {}, 'cropdetect': {}, 'detalle': {}, 'color_mantel': {}, 'hervido': {}}
key = Image.open('keyframe_9x16.png').convert('RGB')
res['detalle']['keyframe (Lanczos a 1080)'] = {k: round(edge_var(region(to_out(key), r)), 1) for k, r in REGIONS.items()}
res['color_mantel']['keyframe'] = colour(region(key, REGIONS['mantel']))

versions = dict(VIDEOS)
for name, path in VIDEOS.items():
    res['probe'][name] = probe(path)
    res['cropdetect'][name] = cropdetect(path)
    res['hervido'][name] = temporal_hf(path)

sheet_rows = []
for t in TIMES:
    row = {}
    for name, path in VIDEOS.items():
        im = frame(path, t)
        row[name] = to_out(im)
        if name == '720_nativo':
            row['720_lanczos'] = to_out(im)  # mismo contenido, reescalado sin IA
    for name, im in row.items():
        d = res['detalle'].setdefault(name, {k: [] for k in REGIONS})
        for k, r in REGIONS.items():
            d[k].append(edge_var(region(im, r)))
        res['color_mantel'].setdefault(name, []).append(colour(region(im, REGIONS['mantel'])))
    sheet_rows.append((t, row))

for name, d in res['detalle'].items():
    if isinstance(d.get('gambas'), list):
        res['detalle'][name] = {k: round(float(np.mean(v)), 1) for k, v in d.items()}

# Hoja comparativa: recorte de gambas a 1:1 en t=0.1 y t=3.0
cols = ['720_lanczos'] + [n for n in ['bytedance_aigc', 'bytedance_pro', 'topaz', '1080_nativo'] if n in VIDEOS]
tiles = []
for t, row in sheet_rows:
    if t not in (0.1, 3.0):
        continue
    for c in cols:
        im = row[c]
        cx, cy = int(0.5 * W), int(0.52 * H)
        tiles.append(im.crop((cx - 220, cy - 220, cx + 220, cy + 220)))
sheet = Image.new('RGB', (440 * len(cols), 440 * 2), 'white')
for i, tile in enumerate(tiles):
    sheet.paste(tile, ((i % len(cols)) * 440, (i // len(cols)) * 440))
sheet.save('comparativa_gambas.png')
print('columnas de la hoja:', cols)
print(json.dumps(res, indent=1, ensure_ascii=False, default=str))
