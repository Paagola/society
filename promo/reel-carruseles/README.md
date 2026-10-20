# Society · reel del flujo (v3)

Fecha: 2026-10-20. Encargo de Víctor: una demostración artística de Society que una la identidad visual de la app con el flujo real, desde la foto del cliente hasta el carrusel terminado, en la estética de los posts de [`posts.md`](posts.md). La v2 no le terminó de convencer: pidió **cambiar los puntos de vista en todo el reel** para hacerlo más creativo y adictivo, otra tipografía en los rótulos de arriba y usar tres componentes de interfaz más profesionales que pasó él: un cursor con etiqueta (animate-ui), carpetas de cristal (*glass folder cards*) y una rueda de trabajos (*works wheel*).

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
ffmpeg -i out/reel-muda.mp4 -i out/banda.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest out/society-reel-v3.mp4
python3 ../../skills/openmontage/scripts/medir_realismo.py out/society-reel-v3.mp4
```

## Dirección

- **Un punto de vista por tramo, y que se mueva:** vista cenital de la carpeta, la foto vista desde la mesa, un contrapicado que gira alrededor de la tarjeta mientras caen las letras, un primerísimo plano del pie, la rueda vista de lado, la plaza de Axpe desde arriba con la grúa bajando, un ángulo distinto en cada corte de la ráfaga, un travelling por las carpetas de la semana y una órbita sobre el logo. Los cortes caen en el compás.
- **Componentes de Víctor, rehechos para vídeo:** los tres son de React y se animan con el ratón, así que en `reel.html` están reescritos para moverse fotograma a fotograma con la misma geometría, sombras y curvas:
  - **Cursor con etiqueta:** dos cursores, «Tú» (tinta) sube la foto y aprueba la semana, y «Society» (cobalto) mejora la foto y monta el carrusel. La etiqueta sigue al cursor con un poco de retraso, como `CursorFollow`.
  - **Carpeta de cristal:** el cliente pulsa «+», la foto cae en la carpeta «Etxebarri», el cristal cede y el contador rueda a «1 foto». Al abrirla, el archivo sube y la cámara entra en él. En la semana, cada día es una carpeta que recibe su post. El fondo líquido usa el mismo generador del componente con los colores de Society (cobalto, mostaza, tinta y papel).
  - **Rueda de trabajos:** los 17 posts forman un anillo alrededor de «17 posts» y, al arrastrar, el anillo se abre en tambor. En vertical gira en horizontal: los vecinos salen por los lados, el arco cae hacia abajo y el índice va en cinta debajo.
- **Rótulos de arriba:** Geist seminegrita con el espaciado apretado y una etiqueta en Geist Mono («01 — Tú»), la misma pareja de los componentes. Las palabras entran desenfocadas una a una.
- **Identidad de Society:** papel `#ECE8DC` con una retícula de puntos de mesa, tinta `#141414` y cobalto `#2440E0`. Cierra con el logotipo oficial de recortes y la mascota.
- **Desenfoque de movimiento:** 4 subfotogramas en medio fotograma (180°) mezclados con `tmix`. El obturador abre en el instante del fotograma, así un corte seco no deja un fotograma mezclado.
- **Bucle:** el último fotograma lleva al primero (la carpeta vuelve a montarse sola).

## Guion sobre la rejilla (120 BPM, 40 tiempos, 10 compases)

| Segundos | Rótulo | Punto de vista y acción |
|---|---|---|
| 19–1 | Society · «De la foto del móvil al post listo.» | Cenital → tres cuartos: la carpeta «Etxebarri» se monta sola; el cursor «Tú» pulsa «+» y cae la foto |
| 1–2 | 01 — Tú · «Subes la foto de tu plato.» | Órbita lenta; clic en el cristal, la carpeta se abre y la cámara sube hacia el archivo |
| 2–4 | 02 — Society · «La deja profesional.» | La foto del móvil (Ryan Snyder, CC BY 2.0) vista desde la mesa; «Society» pulsa «Mejorar foto»; escaneo cobalto que descubre la toma profesional |
| 4–7 | 03 — Diseño · «Escribe y diseña el post.» | Contrapicado girando mientras caen F-U-E-G-O; primerísimo plano del pie que se teclea; plano general y paso al post E1 |
| 7–9,5 | 04 — Carrusel · «Monta todos tus posts.» | Rueda: anillo de 17 posts → tambor; cuatro arrastres E1 → E3 → E4 → E5 con el índice en cinta |
| 9,5–11,5 | Sobre tu foto · «Sin tocar la foto original.» | Axpe desde arriba, la grúa baja mientras «PLAZA» cae letra a letra sobre el suelo |
| 11,5–14 | Con cualquier cocina · «Etxebarri, Disfrutar, St. JOHN.» | Ráfaga de 10 posts, uno por corchea, cada uno con su ángulo; contador 06/17 → 15/17 |
| 14–16,5 | 05 — Calendario · «Y te planifica la semana.» | Travelling por tres carpetas (lunes E2, miércoles D5, viernes S6) que reciben su post; «Tú» pulsa «Aprobar la semana» |
| 16,5–17,5 | | La semana se desenfoca y baja el aviso «Tu semana, lista para publicar.» |
| 17,5–19 | Society · «Tu agencia de marketing con IA.» | Órbita sobre el logotipo oficial; la mascota sube el pulgar |

## Música y sonido

- **Música:** «Electro Dreams» de Arulo, de [Mixkit](https://mixkit.co/free-stock-music/tag/house/) ([pista](https://assets.mixkit.co/music/190/190.mp3)), con la *Mixkit Stock Music Free License*: uso comercial gratuito en vídeos, sin atribución obligatoria; no se puede redistribuir la pista suelta, por eso no va al repositorio. Tramo de 10 compases desde la entrada fuerte del minuto 1:04 (tempo medido 119,98 BPM).
- **Sonidos de interfaz** sintetizados en `audio.py`: clics, barrido en cada giro de la rueda y en el escaneo, golpe grave en cada corte de plano y en cada letra que aterriza, el archivo que toca fondo en la carpeta, tic en cada corte de la ráfaga, teclas del pie y campanitas de la foto recibida y del aviso. Cada sonido se coloca por su pico medido.
- **Mezcla:** música al 78 %, interfaz por encima, RMS a −15 dBFS y limitador suave a −1 dBFS.

## Reglas del proyecto

- **Nada inventado:** la única foto «del cliente» es la original del chuletón de Etxebarri en Wikimedia (Ryan Snyder, CC BY 2.0), con su crédito en pantalla. Las de Disfrutar y St. JOHN no salen como «antes». Los datos de los posts salen de las webs oficiales ([`posts.md`](posts.md)). La semana no lleva cifras y «lista para publicar» respeta que la publicación es asistida (README raíz §6).
- **Imagen con referencia:** todas las tomas tienen su foto real de referencia. Desde la tercera tanda de posts, el texto se monta sobre la foto sin regenerarla.
- **Regla cero (firma de rodaje real):** no se aplica, a propósito: es una pieza de diseño de movimiento de interfaz (`skills/README.md`, «Cuándo se puede saltar»). `medir_realismo.py` se pasa igualmente (resultado de la v2): dentro de objetivo la duración de plano (1,1 s), el enfoque (18,6 %), el punto blanco (237,9), el volumen (RMS 5291,5) y las transiciones (0). Marca REVISAR el movimiento de cámara (0,3 px), el punto negro (20,6) y los 16 planos con cámara quieta, lo esperable en una pieza de interfaz sin rodaje. SHA-256 del vídeo: `082da33e210ca6332e3f95fe542a5be38aab355b6a6427dcd6f52034d64457d1`.
- **Coste del reel v3:** 0 créditos. Los posts costaron 16,5 + 16,5 + 2 créditos ([`posts.md`](posts.md)).

## Versión anterior

- v2 (una sola forma que muta, rótulos en Anton y Playfair): commit `475dcf2`, [vídeo](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/88bc71bb-8a56-4831-b32b-5c6c2ce96409.mp4).
- v1 (16 s, con los tres carruseles de la mascota): commit `42536ad`.
