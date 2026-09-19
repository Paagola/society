# Plantillas del 2026-09-17 — Reel «carta de otoño»

Buscadas por cuenta propia (corrección del cliente del 2026-09-17, anotada en `CLAUDE.md`): el brief
no traía reel de referencia, y eso obliga a buscar al menos 2-3, medir su viralidad y elegir uno.

## Cómo se buscaron

1. **YouTube** (`yt-dlp ytsearch`, 12 consultas por plato: setas a la brasa, guiso, rabo de toro,
   castañas, carta de otoño, fall menu steakhouse…). 236 resultados únicos, **todos los candidatos de
   contenido válido eran horizontales** (1920×1080). Descartado como fuente, igual que el 2026-09-08.
2. **Instagram** vía búsqueda web `site:instagram.com/reel` + palabras clave del plato, y descarga del
   Reel suelto con `yt-dlp` (**funciona sin login** para Reels públicos; lo bloqueado es la búsqueda,
   no la descarga). 6 candidatos descargados y revisados con contact sheet.

## Filtro de contenido (antes de puntuar)

| Reel | Cuenta | Contenido | Filtro |
|---|---|---|---|
| **01** «A uma nova temporada» | @1835carneebrasa (Kempinski Laje de Pedra, Brasil) | Anuncio de nueva temporada: fuego, sala, vino, mesa. Look oscuro editorial | ✅ |
| **02** NaBrasa Ourense | @cenandoconpablo | Cocina gallega a la brasa: chuletón, caldo gallego **con precio en pantalla** | ✅ |
| A_new-season-new-menu | `plantillas/2026-09-09/` (CLARENCE) | Nuevo menú de temporada. **Ya medida: 28 / 43 / 42** | ✅ |
| Castaño Nervión `DSHuvY1EuCi` | — | Cafetería de desayunos | ❌ |
| El Limón `DNAuuG-NNQT` | — | Fine dining urbano, maître a cámara | ❌ |
| Tabernacle `DByfhwgx8O9` | — | Fall menu con sushi | ❌ |
| Tu Asador `C-WCN8URHHv` | — | Apertura, obras, sin comida | ❌ |

## Ficheros

- `01_1835-carne-e-brasa_nueva-temporada_46s_original.mp4` + recorte `_15s.mp4` · `sheet_01.jpg`
- `02_nabrasa-ourense_plato-y-precio_164s_original.mp4` + recorte `_15s.mp4` · `sheet_02.jpg`

## Estructura medida (primeros 15 s)

**01 — cortes ffmpeg:** 1,93 · 3,67 · 5,57 · 8,07 · 9,73 · 10,93 · 11,70 · 13,63 · 14,40 s (planos de
~1,7 s). Video Analysis: hierba en rack focus → ventana con copa → **mano retirando una silla con
rótulo «Sejam bem-vindos»** → fuego sobre leña → sala tras cristal con «A uma nova temporada» →
lámpara → mesa larga con copas → plato con marca «Na história do 1835 Carne e Brasa» → copas.
Rótulos serif finos, pequeños, centrados. Jazz. **Abre con un plano quieto y oscuro (regla 12 ✗).**

**02 — cortes ffmpeg:** 3,17 · 5,20 · 8,63 · 10,23 · 12,70 s. Presentador a cámara sosteniendo la
bandeja de chuletón desde t=0 (acción empezada ✓) → travelling del patio → levanta una loncha →
cenital del caldo con **«CALDO GALLEGO 10 €»** → prueba la cuchara. Subtítulos de voz permanentes.

## Viralidad — ⛔ BLOQUEADO

El `virality_predictor` **falló en todos los intentos del 2026-09-17**, sin `fail_reason`:
recortes a 15,9 s y a 15 s de las dos plantillas, **y también el control** `B_south-indian-meal_8s.mp4`
que el 2026-09-09 midió 54/51. Fallo del servicio, no del fichero. Los fallos no cobraron (saldo
498,13 antes y después). Media IDs ya subidos, para relanzar sin volver a subir:

| Vídeo | `media_id` |
|---|---|
| 01 (15 s) | `5c8bd627-6341-4dc9-9fdf-e88a2cfd284e` |
| 02 (15 s) | `7d5bad2c-b520-44f5-b7b9-34e31de8d1d1` |
| Control B | `cf41357e-5bcf-4558-9db8-0a383415a80e` |

Video Analysis sí funcionó: `8896f0bf-3812-42ed-8162-27d22bdfd39a` (01), `b6cb334b-2196-473e-b849-db941050b3b9` (02).
