import sys, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

src, out = Path(sys.argv[1]), Path(sys.argv[2])
pat = sys.argv[3] if len(sys.argv) > 3 else "*"
files = sorted(p for p in src.glob(pat) if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"})
cell, lab, cols = 260, 22, 7
rows = math.ceil(len(files) / cols)
sheet = Image.new("RGB", (cols * cell, rows * (cell + lab)), "white")
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    im.thumbnail((cell, cell))
    x, y = (i % cols) * cell, (i // cols) * (cell + lab)
    sheet.paste(im, (x + (cell - im.width) // 2, y + (cell - im.height) // 2))
    d.text((x + 3, y + cell + 4), f.name[:40], fill="black")
sheet.save(out, quality=85)
print(len(files), "->", out)
