#!/usr/bin/env bash
# Descarga el post final (1080 x 1350) y comprueba su SHA-256.
set -euo pipefail
cd "$(dirname "$0")/.."
curl -fsSL -o society_post_esto_se_come_1080x1350.png \
  "https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/a10d455d-38b1-4fe9-91a7-9b4b509dc9fe.png"
echo "8813a9dc5d8211cd6dca588f16c5df15be0a7f26bb2fd5b07b4255ac74c39db0  society_post_esto_se_come_1080x1350.png" | sha256sum -c -
