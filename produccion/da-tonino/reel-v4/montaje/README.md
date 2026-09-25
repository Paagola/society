# Montaje · Da Tonino reel v4

- **Entrega:** `da-tonino-reel-v4.mp4`, 1080×1920, 24 fps, 14,5 s. Media de Higgsfield `e7c65767-aab5-4a5c-8328-750417fa3d8d`.
  No está en el repo porque este entorno no puede descargar de la CDN de Higgsfield.
- **Origen:** multitoma de Seedance `023715c8` (aprobada por Víctor) → reescalado ByteDance `8fe46ec7` (preset `aigc`, 1080p, 24 fps).
- **Cadena (ffmpeg, sandbox de Higgsfield):**
  - curva común: negros a 0,035 y luces a 0,96, saturación ×1,03;
  - `gblur` 0,35 px para quitar la nitidez de reescalado;
  - grano temporal solo en luma (`noise=c0s=5:c0f=t+u`);
  - corte seco a la cartela ([`cartela.png`](cartela.png), Playfair Display cursiva + Schibsted Grotesk), 2,4 s;
  - sonido diegético de Seedance, con el ambiente de sala prolongado bajo la cartela y fundido, y `loudnorm` a −14 LUFS objetivo.
- **Revisión:** [`medicion.txt`](medicion.txt).
- **Música:** no hay modelo de música en Higgsfield para uso general. Se añade al publicar, con la biblioteca de Instagram (licencia incluida) y el pulso en los cortes.

## Versión 4K (v4-4k)

- Reescalado ByteDance `94fa925f` a 4K (2160×3840) desde el 720p original.
- Mismo montaje, con `gblur` 0,7 px; media `a71b7099`.

## v5 (entrega vigente) · cambios pedidos por Víctor

1. **Sonido:** se queda la canción de Seedance (stems `bass` + `other` de Demucs). Los efectos (`drums` + `vocals`) solo suenan en la toma de la cerveza (7,9–9,4 s, +40 %), como golpe del corte final.
2. **Sala con otra luz:** el día pasa a luz de cena en el etalonaje:
   - curva `0/0 0.2/0.16 0.5/0.46 0.8/0.76 1/0.93`;
   - `colortemperature` 4500 K al 35 %;
   - viñeta.
   Resultado medido: brillo medio 101 → 38; R/B 1,29 → 1,52. Un primer intento dejó la sala en 18 y 2,05: demasiado oscura y naranja, corregido.
3. **Logo sobre la sala** ([`logo-4k.png`](logo-4k.png), logotipo tipográfico; Da Tonino no ha dado un logo real):
   - entra a 9,9 s;
   - la sala funde a negro de 10,8 a 12,0 s;
   - el logo se queda sobre negro hasta 13,4 s;
   - la canción se apaga con él.
4. **Entregas:**
   - máster 4K `4ac9c8b1` (2160×3840, 13,5 s, 82 Mb/s);
   - copia para Instagram `8ac1bc5e` (1080×1920, 7 Mb/s);
   - sonoridad −14,1 LUFS.
5. **Medición** ([`medicion-v5.txt`](medicion-v5.txt)):
   - foco 20,9 %, negro 0,6 y audio correctos;
   - «transición a 9,5 s» y blanco p99 215 salen del fundido final pedido;
   - la duración media incluye el cierre de 4,2 s.
