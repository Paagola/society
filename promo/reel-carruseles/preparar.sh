#!/usr/bin/env bash
# Trae el material del reel a assets/ (no se sube al repositorio):
#   - las 18 diapositivas de los carruseles (ZIP de Higgsfield, comprobado con SHA-256)
#   - el clip de la mascota hecho con Seedance 2.5 a partir de la diapositiva 1·6, en fotogramas
#   - la música: «Electro Dreams» de Arulo (Mixkit, licencia gratuita de uso comercial)
# Desde el contenedor de Claude, Higgsfield da 403; se ejecuta en un ordenador normal
# o en el sandbox de Higgsfield.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/slides assets/mascota out
ln -sfn ../public/fonts fonts 2>/dev/null || true

ZIP_URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/5b8eade9-16ba-49d6-8bb6-1802d1fb07ae.zip"
ZIP_SHA="52196248bc82b9c1e7674d529150167b7ae9b05e25884a234cc09181d8325a1b"
CLIP_URL="https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/hf_20261020_184001_0cfc6e54-06e3-4fab-bded-9780c9913fc0.mp4"
MUSICA_URL="https://assets.mixkit.co/music/190/190.mp3"

tmp=$(mktemp -d)
curl -fsSL -o "$tmp/c.zip" "$ZIP_URL"
echo "$ZIP_SHA  $tmp/c.zip" | sha256sum -c -
unzip -q -o "$tmp/c.zip" -d "$tmp/z"
for c in 1 2 3; do
  d=$(ls -d "$tmp"/z/carrusel_0${c}_*)
  for f in "$d"/0*.png; do cp "$f" "assets/slides/c${c}_$(basename "$f")"; done
done
curl -fsSL -o assets/mascota.mp4 "$CLIP_URL"
rm -f assets/mascota/*.jpg
ffmpeg -v error -i assets/mascota.mp4 -q:v 2 assets/mascota/%04d.jpg
curl -fsSL -o assets/musica.mp3 "$MUSICA_URL"
rm -rf "$tmp"
echo "diapositivas: $(ls assets/slides | wc -l) · fotogramas del clip: $(ls assets/mascota | wc -l)"
