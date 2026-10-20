#!/usr/bin/env bash
# Descarga el ZIP con las 18 diapositivas finales (1080 × 1350) y las 3 vistas
# previas desde el almacenamiento de Higgsfield y lo descomprime en carruseles_society/.
# Hace falta porque el contenedor donde se preparó el repositorio no podía descargar
# de ese dominio (proxy 403); desde cualquier ordenador normal funciona.
set -euo pipefail
cd "$(dirname "$0")/.."
URL="https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/5b8eade9-16ba-49d6-8bb6-1802d1fb07ae.zip"
SHA="52196248bc82b9c1e7674d529150167b7ae9b05e25884a234cc09181d8325a1b"
curl -fL -o carruseles_society_18.zip "$URL"
echo "$SHA  carruseles_society_18.zip" | sha256sum -c -
unzip -n carruseles_society_18.zip   # -n: no sobrescribe nada que ya exista
ls carrusel_0*/0*.png | wc -l        # deben salir 18
