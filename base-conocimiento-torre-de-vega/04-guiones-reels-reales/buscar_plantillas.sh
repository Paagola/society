#!/usr/bin/env bash
# Cribado automático de plantillas de Reels — Torre de Vega
#
# Busca vídeos de comida en YouTube, filtra por duración analizable (<=16s, límite del
# Virality Predictor) y descarga los candidatos listos para puntuar.
#
# Uso:
#   ./buscar_plantillas.sh "restaurant food b-roll" 25 ./candidatos
#
# Requisitos: python -m pip install yt-dlp
# Nota SSL: en esta máquina Avast intercepta TLS, por eso va --no-check-certificates.

set -uo pipefail

QUERY="${1:-restaurant food b-roll cinematic}"
NUM="${2:-25}"
OUTDIR="${3:-./candidatos}"
MAXDUR=16          # límite duro del Virality Predictor
MINDUR=5

mkdir -p "$OUTDIR"
YTDLP="python -m yt_dlp"
FLAGS="--no-warnings --no-check-certificates"

echo "Buscando: \"$QUERY\"  (top $NUM)"
echo

$YTDLP "ytsearch${NUM}:${QUERY}" --flat-playlist --dump-json $FLAGS 2>/dev/null \
| python -c "
import json,sys
rows=[]
for line in sys.stdin:
    try: d=json.loads(line)
    except: continue
    dur=d.get('duration') or 0
    rows.append((d.get('view_count') or 0, dur, (d.get('title') or '')[:52], d.get('id')))
rows.sort(reverse=True)
ok=[r for r in rows if $MINDUR <= r[1] <= $MAXDUR]
print(f'{len(rows)} resultados · {len(ok)} analizables directamente ({$MINDUR}-{$MAXDUR}s)\n')
print('--- ANALIZABLES YA ---')
for v,d,t,i in ok:
    print(f'{v:>11,} | {d:>3}s | {t}\n              {i}')
print()
print('--- MÁS LARGOS (habría que recortar los primeros 15s) ---')
for v,d,t,i in [r for r in rows if r[1] > $MAXDUR][:8]:
    print(f'{v:>11,} | {d:>3}s | {t}\n              {i}')
with open('$OUTDIR/_ids.txt','w') as f:
    for v,d,t,i in ok: f.write(i+'\n')
"

echo
IDS_FILE="$OUTDIR/_ids.txt"
if [[ -s "$IDS_FILE" ]]; then
  echo "Descargando los analizables..."
  while read -r id; do
    [[ -z "$id" ]] && continue
    echo "  -> $id"
    $YTDLP "https://www.youtube.com/watch?v=$id" \
      -f "mp4[height<=1080]/best[ext=mp4]/best" \
      -o "$OUTDIR/%(id)s.%(ext)s" $FLAGS --quiet 2>/dev/null
  done < "$IDS_FILE"
  echo
  ls -la "$OUTDIR"/*.mp4 2>/dev/null
else
  echo "Sin candidatos en rango. Prueba otra query, o recorta uno largo:"
  echo "  ffmpeg -i largo.mp4 -t 15 -c copy corto.mp4"
fi

cat <<'NOTA'

SIGUIENTE PASO (lo hace Claude, no el script — requiere las tools MCP):
  media_upload -> curl PUT -> media_confirm -> virality_predictor -> job_status(sync:true)

Y el desglose de cortes en local, gratis:
  ffmpeg -hide_banner -i VIDEO.mp4 -filter:v "select='gt(scene,0.2)',showinfo" -f null - 2>&1 \
    | grep -oE "pts_time:[0-9.]+"
NOTA
