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

## v5 · cambios pedidos por Víctor (sustituida por la v6)

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

## v6 (entrega vigente) · sin el sonido de la pizza y con la tipografía del carrusel

Aprobada por Víctor el 25/09/2026. Hecha como **revisión de la etapa `edit` del pipeline `hybrid` de OpenMontage** (proyecto `projects/da-tonino-reel-v6`, política `manual_all`): idea, guion, planos y recursos se importan de la v5 aprobada y solo se toca la edición. 0 créditos de Higgsfield.

1. **Sonido E quitado** (toma de la porción, 3,57–4,57 s). Víctor lo eligió entre 5 candidatos localizados con Demucs `htdemucs_ft`. Los candidatos y el espectrograma se retiraron del repositorio en la limpieza del 26/09/2026; queda la comparación antes y después en [`v6-sonido/candidatos/E_antes.wav`](v6-sonido/candidatos/E_antes.wav) y [`E_despues.wav`](v6-sonido/candidatos/E_despues.wav). Estaba colado en el stem `other`, que también lleva la canción, así que no se podía quitar el stem:
   - método b del prompt: puerta espectral guiada por el stem. Se resta **de la mezcla original** lo que en `other` sobresale más de 1,25 veces de su suelo local (percentil 20 por bin en 0,5 s), solo dentro del tramo y con fundidos de 18 ms ([`v6-sonido/quitar_E.py`](v6-sonido/quitar_E.py));
   - agudos (> 1,5 kHz) del tramo: 55,9 → 48,0 dB; el tramo en total baja solo 0,9 dB (la canción sigue);
   - fuera del tramo, el audio es **idéntico bit a bit** a la v5; el golpe de la cerveza y el apagado no cambian;
   - sin `loudnorm` global: habría movido la canción fuera del tramo. Queda en −14,2 LUFS y −1,4 dBTP (la v5 aprobada: −14,1 y −1,3).
2. **Logo con la tipografía del carrusel** ([`logo-carrusel-4k.png`](logo-carrusel-4k.png), [`v6-sonido/logo_carrusel.py`](v6-sonido/logo_carrusel.py)): «DA TONINO» en Cinzel, «Ristorante» en Pinyon Script, filete y «RESERVA TU MESA» en Montserrat Light con tracking; crema y piedra del carrusel. Sustituye a Playfair Display + Schibsted Grotesk.
   - El logo de la v5 estaba **incrustado en la imagen**, así que se rehízo solo el plano de la sala (9,375–13,54 s) desde el reescalado 4K `94fa925f` sin logo, con el etalonaje de la v5 reajustado en bucle cerrado ([`v6-sonido/sala_v5.cube`](v6-sonido/sala_v5.cube) + `vignette` 0,93 en RGB + `gblur` 0,7 + grano). Medido frente a la v5: luminancia 39,2 / 39,0 y R/B 1,55 / 1,53.
   - Mismos tiempos que la v5: el logo entra de 9,95 a 10,8 s, la sala funde a negro de 10,8 a 12,05 s y el logo sale de 12,6 a 13,43 s.
3. **Imagen:** 0–9,375 s copiados de la v5 sin reencodar (fotograma clave en 9,375 s y GOP cerrado: 225 paquetes; framemd5 idéntico). El plano nuevo se codificó con los mismos ajustes de x264 que la v5 (4K: `medium`, CRF 16, nivel 5.1; 1080: `slow`, CRF 17, nivel 5.0). Comandos: [`v6-sonido/montar_v6.sh`](v6-sonido/montar_v6.sh).
4. **Entregas:**
   - máster 4K `4a51f618-7bbc-4cb2-aa4a-26e65bb8fb14` (2160×3840, 13,54 s, 69 Mb/s);
   - copia para Instagram `cfc5c21c-d47a-4dad-bd11-42a23f87cc92` (1080×1920, 7,1 Mb/s), también en [`v6-sonido/da-tonino-reel-v6-1080.mp4`](v6-sonido/da-tonino-reel-v6-1080.mp4).
5. **Medición** ([`medicion-v6.txt`](medicion-v6.txt)): 325 fotogramas y 0 errores de descodificación en las dos entregas; foco 20,6 %, negro 0,7 y audio correctos. «Transición» a 13,2 s, blanco p99 201 y duración media salen del fundido y del cierre pedidos (el blanco baja de 215 a 201 porque el logo nuevo es más fino).
6. **Archivos de la carpeta** [`v6-sonido/`](v6-sonido/):
   - `quitar_E.py` escribe `audio_v6_premaster.wav`, que se guarda como [`audio_v6.wav`](v6-sonido/audio_v6.wav);
   - material de partida: [`seedance_original.mp4`](v6-sonido/seedance_original.mp4) (multitoma de Seedance sin montar) y [`v5_1080.mp4`](v6-sonido/v5_1080.mp4);
   - la copia de 1080 es el reel que usa la promo (`promo/public/video/reel-v6.mp4`).

