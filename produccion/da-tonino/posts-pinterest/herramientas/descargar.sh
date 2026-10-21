#!/usr/bin/env bash
# Descarga los dos posts de Da Tonino (1080 x 1350) y comprueba su SHA-256.
set -euo pipefail
cd "$(dirname "$0")/.."
base="https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO"
curl -fsSL -o post_A_pizza.png "$base/4913f502-9163-45d1-916c-5e69aef6ac98.png"
curl -fsSL -o post_B_prosciutto_e_rucola.png "$base/6323ceba-788b-4ec7-9fed-9b76f3b9677c.png"
sha256sum -c - <<'SUMS'
4c18e8f5c7d1e9d691c86570e2ddbfa01bdc3eb7a21cf09ba76289dd20d4b698  post_A_pizza.png
4a7110a00862d4657f374926cf4f19e0fabe72a7811b4871c8376343ece1217d  post_B_prosciutto_e_rucola.png
SUMS
