import sys, json
import truststore
truststore.inject_into_ssl()  # Avast intercepts TLS; trust the Windows cert store
from faster_whisper import WhisperModel

model = WhisperModel(sys.argv[1] if len(sys.argv) > 2 else "small", device="cpu", compute_type="int8")
out = {}
for path in sys.argv[2:]:
    segs, info = model.transcribe(path, language="es", word_timestamps=True)
    words = [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for s in segs for w in s.words]
    print(path.split("\\")[-1], f"{info.duration:.2f}s |", " ".join(w["w"] for w in words))
    out[path] = words
json.dump(out, open(sys.argv[2] + ".words.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
