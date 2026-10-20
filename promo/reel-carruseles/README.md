# Society · reel del flujo (v2)

Fecha: 2026-10-20. Encargo de Víctor: una demostración artística de Society que una la identidad visual de la app con el flujo real, desde la foto del cliente hasta el carrusel terminado, en la estética de los posts de [`posts.md`](posts.md). Mantiene la dirección de la v1, la que le gustó: **una sola forma que nunca se corta** y muta mientras un cursor la maneja, con muelles, cámara y bucle perfecto.

## Entregable

| Qué | Dónde |
|---|---|
| Reel final, 1080 × 1920, 60 fps, 20 s, con sonido | enlace en el PR |
| Fuente del reel | [`reel.html`](reel.html): todo se calcula desde el tiempo en `seek(t)` |
| Renderizador | [`render.mjs`](render.mjs): Playwright, 4 subfotogramas por fotograma, `tmix` → 60 fps |
| Banda sonora | [`audio.py`](audio.py): rejilla medida con numpy y sonidos de interfaz sintetizados |
| Material | [`preparar.sh`](preparar.sh): foto original, tomas, los 17 posts, logo y música a `assets/` (no se sube) |
| Posts | [`posts.md`](posts.md) y [`montaje-posts/`](montaje-posts/): los 17 posts y cómo se montan |
| Mascota sin fondo | [`mascota/`](mascota/): 7 poses recortadas del Drive (los ojos no cambian) |
| Fuentes de los posts | [`fuentes/`](fuentes/): Archivo Narrow, Bricolage Grotesque, Libre Caslon, Caveat, IBM Plex Mono, Courier Prime (todas OFL) |

Para rehacerlo con Node, Python 3 (numpy, scipy), ImageMagick y ffmpeg:

```bash
cd promo/reel-carruseles
bash preparar.sh
node render.mjs --tiempos              # un fotograma por tiempo → out/tiempos-hoja.jpg (revisar antes)
HILOS=8 node render.mjs                # out/reel-muda.mp4
python3 audio.py assets/musica.mp3 out/banda.wav --inicio 64.0
ffmpeg -i out/reel-muda.mp4 -i out/banda.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest out/society-reel-v2.mp4
python3 ../../skills/openmontage/scripts/medir_realismo.py out/society-reel-v2.mp4
```

## Dirección

- **Identidad de Society:** lienzo papel `#ECE8DC`, tinta `#141414` y cobalto `#2440E0`, que son los colores de la guía. Los rótulos usan la pareja de la marca, Anton para el número del paso y Playfair cursiva para la frase. La interfaz va en Geist. Cierra con el logotipo oficial de recortes y la mascota.
- **Una sola forma** que pasa por botón, carga, check, isla, tarjeta, semana, aviso y logo. Muelles de forma cerrada (zeta 0,86), sin rebotes, partículas, brillos ni degradados.
- **El flujo se ve, no se cuenta:** la foto del móvil entra torcida y se endereza. Una línea cobalto la escanea y debajo aparece la toma profesional. La tarjeta gira en 3D, las letras caen desde la cámara una por corchea con puntillo y el montaje pasa nítido al post terminado.
- **Sobre tu foto, sin tocarla:** en Axpe, el título entra palabra a palabra y «PLAZA» cae letra a letra sobre el suelo, en la misma perspectiva del post.
- **Manipulación directa** en el carrusel: la tira sigue al cursor y al soltar sale el muelle desde donde estaba.
- **Desenfoque de movimiento:** 4 subfotogramas en medio fotograma (180°) mezclados con `tmix`.
- **Bucle:** el último fotograma es el primero.

## Guion sobre la rejilla (120 BPM, 40 tiempos, 10 compases)

| Segundos | Rótulo | Forma y acción |
|---|---|---|
| 0–1,5 | «De la foto del móvil al post listo.» | Botón «Sube la foto de tu plato» → clic → carga → check cobalto (la mascota sube el pulgar) |
| 1,5–3 | 01 · «Subes la foto de tu plato.» | Isla «Foto recibida» → clic → tarjeta con la foto original del chuletón (Ryan Snyder, CC BY 2.0), chip «Tu foto · móvil», clic en «Mejorar foto» |
| 3–4 | 02 · «La IA la deja profesional.» · «Mismo plato. Nada inventado.» | Escaneo cobalto que descubre la toma profesional; chip «Con Society» |
| 4–7 | 03 · «Escribe y diseña el post.» | Giro 3D; F-U-E-G-O caen una a una; se teclea el pie; pasa al post E1 |
| 7–9,5 | 04 · «Monta el carrusel entero.» | Arrastres por E1 → E3 → E4 → E5 → E6 con sus puntos |
| 9,5–11,5 | «Sobre tu foto, sin tocarla.» | Axpe: título palabra a palabra y «PLAZA» letra a letra sobre el suelo |
| 11,5–14 | «Con cualquier cocina.» | Ráfaga de 10 posts, uno por corchea, con contador 08/17 → 17/17 |
| 14–16,5 | 05 · «Y te planifica la semana.» | «Tu semana»: Lun, Mié y Vie reciben su post; clic en «Aprobar la semana» |
| 16,5–17,5 | | Aviso «Tu semana, lista para publicar.» |
| 17,5–19 | «Tu agencia de marketing con IA.» | Logotipo oficial y mascota |
| 19–20 | | Vuelta al botón |

## Música y sonido

- **Música:** «Electro Dreams» de Arulo, de [Mixkit](https://mixkit.co/free-stock-music/tag/house/) ([pista](https://assets.mixkit.co/music/190/190.mp3)), con la *Mixkit Stock Music Free License*: uso comercial gratuito en vídeos, sin atribución obligatoria; no se puede redistribuir la pista suelta, por eso no va al repositorio. Tramo de 10 compases desde la entrada fuerte del minuto 1:04 (tempo medido 119,98 BPM).
- **Sonidos de interfaz** sintetizados en `audio.py`: clics, barrido en cada arrastre y en el escaneo, golpe grave en cada cambio de forma y en cada letra que aterriza, tic en cada corte de la ráfaga, teclas del pie y campanitas del check y del aviso. Cada sonido se coloca por su pico medido.
- **Mezcla:** música al 78 %, interfaz por encima, RMS a −15 dBFS y limitador suave a −1 dBFS.

## Reglas del proyecto

- **Nada inventado:** la única foto «del cliente» es la original del chuletón de Etxebarri en Wikimedia (Ryan Snyder, CC BY 2.0), con su crédito en pantalla. Las de Disfrutar y St. JOHN no salen como «antes». Los datos de los posts salen de las webs oficiales ([`posts.md`](posts.md)). La semana no lleva cifras y «lista para publicar» respeta que la publicación es asistida (README raíz §6).
- **Imagen con referencia:** todas las tomas tienen su foto real de referencia. Desde la tercera tanda de posts, el texto se monta sobre la foto sin regenerarla.
- **Regla cero (firma de rodaje real):** no se aplica, a propósito: es una pieza de diseño de movimiento de interfaz (`skills/README.md`, «Cuándo se puede saltar»). `medir_realismo.py` se pasa igualmente y su resultado va en el PR.
- **Coste del reel v2:** 0 créditos. Los posts costaron 16,5 + 16,5 + 2 créditos ([`posts.md`](posts.md)).

## Versión anterior

La v1 (16 s, con los tres carruseles de la mascota) está en el historial de la rama: commit `42536ad`.
