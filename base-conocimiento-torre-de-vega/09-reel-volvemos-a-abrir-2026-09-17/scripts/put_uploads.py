import json, sys, urllib.request, ssl
from pathlib import Path

resp = json.load(open(sys.argv[1], encoding="utf-8"))
paths = [Path(p) for p in sys.argv[2:]]
ups = resp["uploads"]
assert len(ups) == len(paths), (len(ups), len(paths))
ctx = ssl._create_unverified_context()  # Avast intercepts TLS on this machine
out = {}
for up, p in zip(ups, paths):
    req = urllib.request.Request(up["upload_url"], data=p.read_bytes(), method="PUT",
                                 headers={"Content-Type": up["content_type"]})
    with urllib.request.urlopen(req, context=ctx) as r:
        print(r.status, up["media_id"], p.name)
    out[p.name] = up["media_id"]
json.dump(out, open(Path(sys.argv[1]).with_suffix(".ids.json"), "w"), indent=1)
