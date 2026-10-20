# Society · reel de los carruseles

Fecha: 2026-10-20. Encargo de Víctor: un reel con los tres carruseles de la mascota (rama `claude/society-carousels-7e13tj`, PR #3), con buena música, buen gancho, estética profesional y minimalista, identidad de Society y mucha animación. Referencia de estilo que pasó Víctor: movimiento de interfaz «nivel Dribbble», **una sola forma que nunca se corta** y muta de tamaño, radio y color mientras un cursor la maneja con clics y arrastres de verdad, con muelles, cámara que se acerca a cada estado y bucle perfecto. Nivel de energía: un *showreel* de 15 s.

## Entregable

| Qué | Dónde |
|---|---|
| Reel final, 1080 × 1920, 60 fps, 16 s, con sonido | enlace en el PR (almacenamiento de Higgsfield; el contenedor de Claude no puede descargar de ahí) |
| Fuente del reel | [`reel.html`](reel.html): todo se calcula desde el tiempo en `seek(t)` |
| Renderizador | [`render.mjs`](render.mjs): Playwright, 4 subfotogramas por fotograma, `tmix` → 60 fps |
| Banda sonora | [`audio.py`](audio.py): rejilla medida con numpy y sonidos de interfaz sintetizados |
| Material | [`preparar.sh`](preparar.sh): diapositivas, clip de la mascota y música a `assets/` (no se sube) |

Para rehacerlo en cualquier ordenador con Node, Python 3 (numpy, scipy) y ffmpeg:

```bash
cd promo/reel-carruseles
bash preparar.sh                       # material a assets/
node render.mjs --tiempos              # un fotograma por tiempo → out/tiempos-hoja.jpg (revisar antes)
node render.mjs                        # out/reel-muda.mp4 (unos 4 min con 4 hilos)
python3 audio.py assets/musica.mp3 out/banda.wav --inicio 64.0
ffmpeg -i out/reel-muda.mp4 -i out/banda.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest out/society-reel-carruseles.mp4
```

Sin Playwright instalado en el proyecto, `render.mjs` usa el global (`npm root -g`). `CHROMIUM=/ruta` fija el navegador.

## Dirección

- **Lienzo** gris cálido `#E9E6DF`, componentes en tinta `#151515` y blanco, y un solo acento: el cobalto de Society `#1033EF`. Letra única de interfaz: Geist. La identidad gráfica de Society (Anton, Playfair cursiva, collage de papel, mascota) entra por las propias diapositivas, que viven dentro de la forma.
- **Muelles** en todo, con forma cerrada (respuesta al escalón, zeta 0,86: rebasa menos del 1 %). Un valor que cambia de objetivo muchas veces es la suma de un muelle por cambio, así que sigue siendo una función pura del tiempo. Nada de rebotes, partículas, brillos ni degradados en la interfaz.
- **Cámara** con su propio muelle, más lento que la forma: cada estado acaba llenando el cuadro y se nota el cambio de tamaño.
- **Manipulación directa.** Mientras el cursor arrastra, la tira del carrusel, la barra de progreso (y el fotograma del clip) o el deslizador siguen su posición. Al soltar, el muelle sale desde donde estaba.
- **Bola de dos bordes.** En el interruptor y en el indicador de pestañas, el borde de delante va en un muelle más rápido que el de detrás, así que se estira al moverse.
- **Desenfoque de movimiento:** 4 subfotogramas en medio fotograma (obturador de 180°), mezclados con `tmix`.
- **Bucle:** el último fotograma es el primero. Las pistas suman lo que queda de los muelles del final al principio, y el cursor vuelve a su sitio quieto.

## Guion sobre la rejilla (120 BPM, 32 tiempos, 8 compases)

| Compás | Tiempos | Estado de la forma | Lo que hace el cursor |
|---|---|---|---|
| 1 | 0–3 | Botón «Haz que vean tu bar» → carga → check cobalto → isla dinámica «Society · 3 carruseles listos» | Clic en el botón (t1) y en la isla (t3–4) |
| 2 | 4–7 | La isla crece hasta la portada del carrusel 1. Diapositivas 1·1 → 1·2 → 1·3 → 1·4 | Arrastra en cada tiempo |
| 2–3 | 7–11 | Pulso de la tarjeta y carrusel 2: 2·1 (gancho: «Nadie va a donde no ve») → 01 → 02 → 03 → 04 | Arrastra en cada tiempo |
| 4 | 12–15 | Reproductor con la mascota animada (Seedance 2.5 desde la diapositiva 1·6). Pausa, play, arrastre de la barra de progreso | Clics y arrastre |
| 4–5 | 15–17 | La barra pasa a deslizador de «publicaciones por semana». Se arrastra más allá del 7 y el carril se estira; al soltar vuelve a **3**: «Publica menos, llena más.» | Arrastre |
| 5 | 18–19 | Interruptor «Publicar solo» que se enciende en el tiempo. Su bola se convierte en el indicador de las pestañas Lun / Mié / Vie | Clic |
| 5–6 | 20–23 | Mié, Vie y las pestañas se abren en el gráfico «Tu semana» (tres barras iguales: constancia), que se dibuja solo, con etiqueta al pasar por el viernes | Clics y paso del cursor |
| 6–7 | 24–26 | Carrusel 3: «Publica menos, llena más» → «La constancia llena mesas» → «Tú cocinas, nosotros lo contamos» | Arrastres |
| 7–8 | 27–31 | ⌘K, se escribe «semana», se filtra, Enter, aviso «Tu semana, planificada.» y vuelta al botón | Clics |

## Música y sonido

- **Música:** «Electro Dreams» de Arulo, de [Mixkit](https://mixkit.co/free-stock-music/tag/house/) ([pista](https://assets.mixkit.co/music/190/190.mp3)), con la *Mixkit Stock Music Free License*: uso comercial gratuito en vídeos, sin atribución obligatoria; no se puede redistribuir la pista suelta, por eso no se sube al repositorio. Elegida entre las 36 pistas de la etiqueta «house» de Mixkit midiendo el tempo de todas (las de 120 BPM eran 8) y su forma con espectrograma.
- **Rejilla medida:** 119,98 BPM. El tramo usado son los 8 compases que empiezan en la entrada fuerte del minuto 1:04, de modo que el reel arranca en un golpe y el bucle vuelve al mismo groove.
- **Sonidos de interfaz** sintetizados en `audio.py` (sin licencias de terceros): clic al pulsar y al soltar, barrido en cada arrastre con el pico en la suelta, golpe grave en cada cambio de forma, muescas del deslizador, teclas, campanita del check y del aviso. Cada sonido se coloca por su **pico medido**, no por su inicio.
- **Mezcla:** música al 78 %, interfaz por encima, RMS a −15 dBFS y limitador suave a −1 dBFS.

## Reglas del proyecto

- **Imagen con referencia:** el reel no genera imágenes nuevas; usa las 18 diapositivas tal cual. El único plano generado es el clip de la mascota (Seedance 2.5, 720p, 5 s, `job 0cfc6e54-06e3-4fab-bded-9780c9913fc0`), hecho con la diapositiva 1·6 como imagen de inicio y la orden de no mover el texto. Se usa el tramo 2,6–5,0 s: entre 1,9 y 2,2 s la mascota guiña y cambia los ojos, que según la marca no cambian nunca.
- **Reescalado:** el clip se ve a 760 × 1013 px dentro de la forma, por debajo de su tamaño nativo (834 × 1112), así que no se ha reescalado.
- **Regla cero (firma de rodaje real):** no se aplica, a propósito y por escrito: es una pieza de diseño de movimiento de interfaz, como las de `papel-stopmotion` (`skills/README.md`, «Cuándo se puede saltar»). `medir_realismo.py` se ha pasado igualmente y su resultado está en el PR.
- **Nada inventado:** el gráfico no lleva cifras. Las tres barras iguales dicen «siempre los mismos días», que es el mensaje del carrusel 3, no un dato. La interfaz (⌘K, isla, reproductor) es ilustración de marca, no la app de Society.
- **Coste:** 35 créditos (el clip de Seedance). Saldo de 890,65 a 855,65.

## Avisos

- Igual que en los carruseles: falta confirmar que habrá enlace en la bio y los platos de algunas diapositivas son ilustrativos.
- El botón dice «Haz que vean tu bar». Si se prefiere otro gancho, es la primera línea del HTML que hay que cambiar (`L_boton`).
