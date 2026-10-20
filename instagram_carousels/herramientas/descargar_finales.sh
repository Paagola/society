#!/usr/bin/env bash
# Descarga el ZIP con las 18 diapositivas finales y las 3 vistas previas desde el
# almacenamiento de Higgsfield y lo descomprime en su sitio (restaurant_0X/slides/).
# Hace falta porque el contenedor donde se preparó el repositorio no podía descargar
# de ese dominio (proxy 403); desde cualquier ordenador normal funciona.
set -euo pipefail
cd "$(dirname "$0")/.."
URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/8afbafad-6235-467f-b650-9fd3980a5ae6.zip"
SHA="6e726cf8163287f0c4e5979bb927088927df2a534e3d36da96729e82d140af99"
curl -fL -o instagram_carousels_18.zip "$URL"
echo "$SHA  instagram_carousels_18.zip" | sha256sum -c -
unzip -n instagram_carousels_18.zip   # -n: no sobrescribe nada que ya exista
ls restaurant_0*/slides/*.png | wc -l   # deben salir 18
