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
