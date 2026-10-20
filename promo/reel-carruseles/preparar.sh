#!/usr/bin/env bash
# Trae el material del reel v2 a assets/ (no se sube al repositorio):
#   - assets/reel/real_E1.jpg  foto original del chuletón de Etxebarri (Ryan Snyder, CC BY 2.0), recortada a 4:5
#   - assets/reel/raw_E1.jpg, raw_E2.jpg  tomas profesionales sin texto (Higgsfield)
#   - assets/posts/*.jpg       los 17 posts terminados (1080 × 1350)
#   - assets/reel/logo.png     logotipo oficial
#   - assets/musica-techno.wav «Deep Techno Ambience» de Alejandro Magaña (Mixkit, licencia gratuita de uso comercial),
#                              pasada de 125 a 120 BPM
#   - assets/onetake/          onetake (github.com/feitangyuan/onetake): librería de movimiento y render del reel v4.
#                              Licencia PolyForm Noncommercial 1.0.0: gratis para uso no comercial (el TFG);
#                              para uso comercial hace falta la licencia Pro. No se sube al repositorio.
# Desde el contenedor de Claude, Higgsfield da 403; se ejecuta en un ordenador normal
# o en el sandbox de Higgsfield.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p assets/reel assets/posts out
ln -sfn ../public/fonts fonts 2>/dev/null || true

H=https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO
POSTS_ZIP="https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/29cd5b4e-f39d-4d01-9893-2c490e5f4027.zip"
REAL="https://commons.wikimedia.org/wiki/Special:FilePath/Etxebarri_Beef_chop_(14468258749).jpg?width=1920"
MUSICA_URL="https://assets.mixkit.co/music/134/134.mp3"

tmp=$(mktemp -d)
curl -fsSL -A "SocietyReel/1.0" -o "$tmp/real.jpg" "$REAL"
convert "$tmp/real.jpg" -gravity center -crop 4:5 +repage -resize 1080x1350\! -quality 92 assets/reel/real_E1.jpg
curl -fsSL -o "$tmp/e1.png" "$H/hf_20261020_120353_49ee9c90-7321-48e0-a7ae-839336055820.png"
convert "$tmp/e1.png" -gravity center -crop 1843x2304+0+0 +repage -resize 1080x1350\! -quality 92 assets/reel/raw_E1.jpg
curl -fsSL -o "$tmp/e2.png" "$H/hf_20261020_120352_9c8c4685-2a50-43c8-b2d2-b983777769b5.png"
convert "$tmp/e2.png" -quality 92 assets/reel/raw_E2.jpg
curl -fsSL -o "$tmp/p.zip" "$POSTS_ZIP"
unzip -q -o "$tmp/p.zip" -d assets/posts
cp ../../society-identidad-editorial/logos/society-logo-oficial.png assets/reel/logo.png
curl -fsSL -o "$tmp/musica.mp3" "$MUSICA_URL"
ffmpeg -loglevel error -y -i "$tmp/musica.mp3" -filter:a atempo=0.96 -ar 48000 -ac 2 assets/musica-techno.wav
rm -rf "$tmp"
python3 capas.py                # capas de letras del post E1 para el reel v4
[ -d assets/onetake ] || { git clone -q https://github.com/feitangyuan/onetake.git assets/onetake && git -C assets/onetake checkout -q 4157581; }
echo "posts: $(ls assets/posts | wc -l)"
