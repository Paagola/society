# Society · reel del flujo (v4)

Fecha: 2026-10-20. Encargo de Víctor: una demostración artística de Society que una la identidad visual de la app con el flujo real, desde la foto del cliente hasta el carrusel terminado, en la estética de los posts de [`posts.md`](posts.md). La v3 le gustó, con cambios: **menos letra y más gruesa** (sin títulos secundarios pequeños), **mascota de al menos un 20 % de la pantalla y con animación**, que la foto **salga de la carpeta y se coloque** en vez de saltar, **quitar las etiquetas** «Tu foto · móvil» y «Con Society · pro», que no haya corte entre la foto y el diseño, que «FUEGO» sea **el post ya hecho, un poco separado, que se acopla**, un **final más creativo** que el logo en una tarjeta, **fondo que cambie de color con cada foto** en «cualquier cocina» y un **fondo de cristal degradado** con los colores de la app. Y que se use **onetake** para el vídeo.

## Entregable

| Qué | Dónde |
|---|---|
| Reel final, 1080 × 1920, 60 fps, 20 s, con sonido | [society-reel-v4.mp4](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/c4f5bc3a-3ca6-4dfd-9345-c0ba51f8a827.mp4) (28,1 MB) · [portada](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/7bd8ff50-0a7f-4aaf-9aaa-6160415ce81e.jpg) |
| Fuente del reel | [`reel.html`](reel.html): todo se calcula desde el tiempo en `seek(t)`; cumple el contrato de onetake (`__seek`, `__ready`, `__meta`) |
| Movimiento y render | [onetake](https://github.com/feitangyuan/onetake) (commit `4157581`): `lib/motion.js` para los muelles, `morphRect`, `hop`, `gather`, `seal`, `letterDrop`, `wordRise`, `liftOut`, `shake`; `scripts/render.py` con obturador de 180° promediado en luz lineal; `scripts/probe.py` para la continuidad |
| Capas de FUEGO | [`capas.py`](capas.py): recorta las letras del post E1 terminado en dos PNG transparentes |
| Banda sonora | [`audio.py`](audio.py): rejilla medida con numpy y sonidos de interfaz sintetizados |
| Material | [`preparar.sh`](preparar.sh): foto original, tomas, los 17 posts, logo, música y onetake a `assets/` (no se sube) |
| Posts | [`posts.md`](posts.md) y [`montaje-posts/`](montaje-posts/) |
| Mascota sin fondo | [`mascota/`](mascota/): 7 poses recortadas del Drive (los ojos no cambian) |

Para rehacerlo con Python 3 (numpy, scipy, Pillow, playwright), ImageMagick y ffmpeg:

```bash
cd promo/reel-carruseles
bash preparar.sh                       # material + onetake en assets/onetake + capas de FUEGO
python3 audio.py assets/musica.mp3 out/banda-v4.wav --inicio 64.0
python3 assets/onetake/scripts/probe.py reel.html --width 1080 --height 1920 --fps 15
python3 assets/onetake/scripts/render.py reel.html --out out/society-reel-v4.mp4 \
        --width 1080 --height 1920 --fps 60 --samples 6 --sfx out/banda-v4.wav
python3 ../../skills/openmontage/scripts/medir_realismo.py out/society-reel-v4.mp4
```

**Licencia de onetake:** PolyForm Noncommercial 1.0.0. Es gratis para uso no comercial (este TFG); si el reel se usa para vender Society hace falta la licencia comercial (onetake Pro). Por eso su código no se sube al repositorio: `preparar.sh` lo descarga.

## Dirección: una sola toma

Con el método de onetake, cada tramo nace del anterior: algo sobrevive al paso y se convierte en lo siguiente. Solo hay cortes secos dentro de la ráfaga. La sonda de continuidad de onetake da **1,00** (ningún corte suelto fuera de la ráfaga).

- **La foto sale de la carpeta:** al abrirse, la foto sube del bolsillo de cristal (lo que aún está dentro no se ve) mientras la carpeta cae, y se coloca en su sitio. Sin salto.
- **Sin etiquetas sobre las fotos:** fuera «Tu foto · móvil», «Con Society · pro», el nombre del archivo y los contadores de la carpeta.
- **Del escaneo al diseño sin corte:** tras el escaneo, la misma tarjeta gira a tres cuartos.
- **FUEGO, el post ya hecho:** el rótulo y el pie llegan como capas recortadas del post terminado ([`capas.py`](capas.py)), flotan separadas delante de la foto con un canto de cristal, la cámara orbita y se acoplan con un pequeño golpe. Como son las letras del post real, al acoplarse coinciden con él.
- **La rueda:** el post terminado se encoge hasta su hueco en el anillo de 17 posts; cuatro arrastres, el último de golpe de muñeca hasta Axpe, y la tarjeta de Axpe toma el relevo de la de delante.
- **Cualquier cocina:** ráfaga de 10 posts, uno por corchea, y el fondo toma el color dominante de cada foto (el rótulo pasa a blanco cuando el fondo es oscuro).
- **La semana:** el último post de la ráfaga vuela a la carpeta del lunes; travelling por las tres carpetas; «Aprobar semana» y el aviso «Lista para publicar.».
- **Final:** el círculo del aviso crece hasta un sello oscuro; los posts llegan desde fuera y orbitan alrededor; el logotipo oficial cae sobre el sello letra a letra (recortes del png oficial) y sube el lema. Para cerrar el bucle, el sello se encoge hasta ser la tecla «+» de la carpeta del principio.
- **Rótulos:** una frase de dos líneas por tramo, en Geist 800 a 116 px, sin etiquetas ni subtítulos. Las palabras suben con muelle y la frase sale hacia arriba.
- **Mascota:** 920 px de alto (casi media pantalla; su caja ocupa más del 20 % del área) y siempre en movimiento: entra y sale saltando, se aplasta al aterrizar, respira, se balancea, se sobresalta con el clic, cambia de pose en el aire o con un pequeño rebote (pulgar arriba, pensando, señalando la foto). Sale en dos tramos largos: del final al principio del bucle (17,5–1,9 s) y durante el escaneo (2,4–4,3 s).
- **Fondo:** degradado claro con manchas de cobalto, mostaza, blanco y azul claro que derivan con el bucle, un panel de cristal con canto blanco y grano fino para que el degradado no haga bandas.
- **Desenfoque de movimiento:** el de onetake, 6 capturas por fotograma en movimiento, promediadas en luz lineal y sin mezclar nunca a través de un corte.

## Guion sobre la rejilla (120 BPM, 40 tiempos, 10 compases)

| Segundos | Rótulo | Acción |
|---|---|---|
| 19,25–0,9 | Del móvil al post. | El sello se vuelve la tecla «+» y la carpeta se monta alrededor; la mascota salta a la izquierda; «Tú» pulsa «+» y cae la foto |
| 0,9–1,95 | Sube tu foto. | La mascota sube el pulgar; clic en la carpeta, que se abre; la foto sale del bolsillo y la carpeta cae |
| 1,95–3,95 | Society la mejora. | La mascota entra pensando y señala la foto; «Society» pulsa «Mejorar foto»; escaneo cobalto hasta la toma profesional |
| 3,95–6,95 | Diseña el post. | La tarjeta gira a tres cuartos; llegan las capas de FUEGO y del pie, la cámara orbita y se acoplan en el post E1 |
| 6,95–9,4 | Todos tus posts. | El post se encoge hasta el anillo; anillo → tambor; arrastres hasta Axpe |
| 9,4–11,45 | Sin tocar tu foto. | La tarjeta de Axpe se tumba y la grúa sube mientras cae «PLAZA» |
| 11,5–13,95 | Cualquier cocina. | Ráfaga de 10 posts con el fondo del color de cada uno |
| 13,95–16,95 | Planifica tu semana. | El post D6 vuela a la carpeta del lunes; miércoles D5 y viernes S6; «Aprobar semana»; aviso |
| 17–19,25 | | El círculo del aviso crece hasta el sello, los posts lo orbitan, cae el logotipo y la mascota sube el pulgar |

## Música y sonido

- **Música:** «Electro Dreams» de Arulo, de [Mixkit](https://mixkit.co/free-stock-music/tag/house/) ([pista](https://assets.mixkit.co/music/190/190.mp3)), con la *Mixkit Stock Music Free License*: uso comercial gratuito en vídeos, sin atribución obligatoria; no se puede redistribuir la pista suelta, por eso no va al repositorio. Tramo de 10 compases desde la entrada fuerte del minuto 1:04 (tempo medido 120,0 BPM).
- **Sonidos de interfaz** sintetizados en `audio.py`: clics, barridos en cada viaje (la foto, la rueda, Axpe, la carpeta del lunes, el sello), golpes en la llegada y el acople de las capas, en cada letra de «PLAZA» y del logotipo y en cada aterrizaje de la mascota, tic en cada corte de la ráfaga y campanitas de la foto recibida, el aviso y el lema. Cada sonido se coloca por su pico medido.
- **Mezcla:** música al 78 %, interfaz por encima, RMS a −15 dBFS y limitador suave con techo a −3,2 dBFS.

## Reglas del proyecto

- **Nada inventado:** la única foto «del cliente» es la original del chuletón de Etxebarri en Wikimedia (Ryan Snyder, CC BY 2.0). Como la v4 quita los textos pequeños de pantalla, **el crédito tiene que ir en el texto de la publicación**: «Foto original: Ryan Snyder, CC BY 2.0 (Wikimedia Commons)». Las de Disfrutar y St. JOHN no salen como «antes». Los datos de los posts salen de las webs oficiales ([`posts.md`](posts.md)). La semana no lleva cifras y «lista para publicar» respeta que la publicación es asistida (README raíz §6).
- **Regla cero (firma de rodaje real):** no se aplica, a propósito: es una pieza de diseño de movimiento de interfaz (`skills/README.md`, «Cuándo se puede saltar»). `medir_realismo.py` se pasa igualmente: dentro de objetivo el enfoque (21,4 %), el punto blanco (242,3) y el volumen (RMS 5296,1). Marca REVISAR la duración media de plano (1,6 s, porque la toma continua cuenta como un plano largo), el movimiento de cámara (0,4 px), el punto negro (13,6), 8 planos con cámara quieta y 1 «transición» que es el desenfoque de movimiento. Es lo esperable en una pieza de interfaz sin rodaje. SHA-256 del vídeo: `3e7e447f0fa231894f88d4707a33b7c0948379e660394b2cede57c579cdf6170`.
- **Revisión de onetake (`verify_promo.py`):** pasan la continuidad (1,00), las ráfagas y las curvas (pico de 377 px por fotograma, con obturador). No pasan dos puntos, a sabiendas: el **reposo** (onetake pide un 25 % de fotogramas totalmente quietos y un tramo de 1 s; aquí el fondo deriva y la mascota respira todo el rato, porque el encargo pedía que todo se moviera y captase la atención) y el **audio** (pide un 15 % de silencio, que no existe con música de fondo; el pico queda en −1,8 dBFS tras el AAC).
- **Coste del reel v4:** 0 créditos (todo se dibuja en el navegador).

## Versión anterior

- v3 (un punto de vista por tramo, chips sobre las fotos, rótulos con etiqueta): commit `ec4ae36`, [vídeo](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/47d82d0c-0516-4dd8-ab22-45f80088d717.mp4).
- v2 (una sola forma que muta, rótulos en Anton y Playfair): commit `475dcf2`, [vídeo](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/88bc71bb-8a56-4831-b32b-5c6c2ce96409.mp4).
- v1 (16 s, con los tres carruseles de la mascota): commit `42536ad`.
