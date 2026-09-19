import json, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

QUERIES = [
    "carta de otoño restaurante #shorts",
    "nueva carta otoño asador #shorts",
    "setas a la brasa restaurante #shorts",
    "guiso tradicional restaurante #shorts",
    "rabo de toro restaurante #shorts",
    "castañas asadas restaurante #shorts",
    "autumn menu restaurant reel #shorts",
    "new fall menu restaurant #shorts",
    "wild mushrooms grill restaurant #shorts",
    "steakhouse fall menu #shorts",
    "braised short rib restaurant fall #shorts",
    "rustic restaurant autumn dishes #shorts",
]
FLAGS = ["--no-warnings", "--no-check-certificates"]


def search(q):
    out = subprocess.run([sys.executable, "-m", "yt_dlp", f"ytsearch20:{q}", "--flat-playlist", "--dump-json", *FLAGS],
                         capture_output=True, text=True, encoding="utf-8", errors="replace").stdout
    rows = []
    for line in out.splitlines():
        try:
            d = json.loads(line)
        except Exception:
            continue
        rows.append({"q": q, "id": d.get("id"), "title": (d.get("title") or "")[:70],
                     "dur": d.get("duration") or 0, "views": d.get("view_count") or 0,
                     "channel": d.get("channel") or d.get("uploader") or ""})
    return rows


with ThreadPoolExecutor(6) as ex:
    allrows = [r for rows in ex.map(search, QUERIES) for r in rows]

seen, uniq = set(), []
for r in allrows:
    if r["id"] and r["id"] not in seen:
        seen.add(r["id"]); uniq.append(r)

cand = [r for r in uniq if 5 <= r["dur"] <= 30]
cand.sort(key=lambda r: -r["views"])
print(f"{len(uniq)} únicos, {len(cand)} entre 5 y 30 s")
for r in cand[:60]:
    print(f'{r["views"]:>11,} | {r["dur"]:>4}s | {r["id"]} | {r["channel"][:22]:22} | {r["title"]}  [{r["q"][:28]}]')
json.dump(cand, open(sys.argv[1], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
