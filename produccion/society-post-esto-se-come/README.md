# Post de Society · «Esto se come con los ojos»

Fecha: 2026-10-21. Encargo de Víctor: con la misma creatividad que los carruseles del 20/10 ([PR #3](https://github.com/Paagola/society/pull/3)), analizar pines nuevos de Pinterest, elegir uno y crear en Higgsfield **a la vez** la foto con buen ángulo y el diseño del post, en una sola generación. Sin contenedores detrás del texto y con la mascota del Drive.

## Entregable

| Qué | Enlace |
|---|---|
| Post final, 1080 × 1350 PNG | [png](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/a10d455d-38b1-4fe9-91a7-9b4b509dc9fe.png) · SHA-256 `8813a9dc5d8211cd6dca588f16c5df15be0a7f26bb2fd5b07b4255ac74c39db0` |
| Original a 2K (1792 × 2240) | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/hf_20261021_082833_8955bdf1-b20f-426b-a8dd-b8dc3188f05c.png) |
| Las 8 finalistas de Pinterest en una hoja | [jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/bc42761a-7a52-44ce-b82f-adfe449875c7.jpg) |
| Prompt exacto, referencias y `job_id` | [herramientas/prompt.json](herramientas/prompt.json) |

El PNG no va en el repositorio (el contenedor no puede descargar del almacenamiento de Higgsfield). Para tenerlo en local: `bash produccion/society-post-esto-se-come/herramientas/descargar.sh`.

## Copy

En la imagen:

- Titular: **ESTO** / *se come* / **CON LOS OJOS.** (condensada blanca papel #F2F1EC + cursiva serif amarilla #F5C518, como en los carruseles)
- Abajo: «Fotos, posts y reels para tu bar. Hechos con IA. Parecen de estudio.»
- Pie: «SOCIETY · LINK EN LA BIO»
- Arriba a la derecha: «Prosciutto e rucola · Da Tonino»

Texto de publicación (propuesta):

> La primera impresión de tu bar ya no es la puerta: es la foto. Esta es la Prosciutto e rucola de Da Tonino, con luz de tarde y el ángulo con el que se vende un plato. Tú cocinas, nosotros hacemos que se vea así. Link en la bio.
>
> #hosteleria #fotografiagastronomica #marketingrestaurantes #pizzanapolitana #society

## Cómo se hizo

1. **Punto de partida.** Identidad y reglas del PR #3: paleta (cobalto #1033EF, amarillo #F5C518, tinta, papel), titular condensado + palabra en cursiva serif amarilla, mascota de la hoja de personaje y nada de cajas detrás del texto.
2. **Pinterest.** 144 pines nuevos de 6 búsquedas (pósteres de comida con tipografía, posts de restaurante, publicidad de comida con tipografía grande, portadas de revistas de cocina, pósteres de hamburguesa y fotografía de comida en azul). Ninguno coincide con los del PR #3. Primer filtro con 6 hojas de contactos y después revisión una a una de 8 finalistas (tabla abajo).
3. **Plato real.** Para no inventar comida se usó la foto real de la pizza Prosciutto e rucola de Da Tonino ([`produccion/da-tonino/reel-v4/referencias/pizza.jpg`](../da-tonino/reel-v4/referencias/pizza.jpg)); el nombre sale de su carta, como en el anuncio [«Tu agencia con IA»](../society-agencia/README.md). Se mantienen su plato oscuro, el mantel de papel kraft, la mesa de madera clara, la caña, la servilleta, los cubiertos y la maceta.
4. **Una sola generación.** `gpt_image_2_5`, calidad alta, 2K, 4:5, con 4 referencias: el pin elegido (ángulo, luz y maquetación), la pizza real (el plato), la mascota con el pulgar y la hoja de personaje. Foto, mascota y texto salen juntos; no hay montaje posterior, solo el reescalado Lanczos a 1080 × 1350.
5. **Regla de la referencia.** Del pin se conservan sus elementos (pizza de jamón sobre mesa, bebida al lado, maceta, luz de sol dura con sombras de hojas, ángulo alto de tres cuartos, titular serif arriba a la izquierda y texto pequeño abajo a la izquierda). Se recombinan en una pieza nueva: el plato y el atrezo son los reales de Da Tonino, la tipografía es la de Society y la mascota aparece como figura de coleccionista con su propia sombra.
6. **Revisión.** Dos variantes. Se eligió la 1: el texto se lee entero y sin errores, la mascota es fiel (halo de alambre, ojos de píldora, sudadera cobalto con destello) y no tapa nada. La 2 se descartó porque el texto pequeño de arriba a la derecha toca el borde y la cabeza de la mascota sale facetada.

## Las 8 finalistas, una a una

Las imágenes de Pinterest son solo referencia: no se publican ni se copian.

| Id | Pin | Veredicto |
|---|---|---|
| n002 «PASTA» | [jpg](https://i.pinimg.com/736x/37/51/2c/37512c37a4d84640958efd1e577fef61.jpg) | La pasta se enreda con la palabra gigante. Muy buena idea, pero el plato visto casi de frente pierde la textura, y el beige y verde no casan con Society. Finalista, no elegida. |
| n003 «MELT» | [jpg](https://i.pinimg.com/736x/1d/dc/e5/1ddce5ff4a5059a25ef9c8dfb712b960.jpg) | Hilo de queso que cruza el titular. Lleva marca de agua de una cuenta de IA y se nota: luz plana y todo en foco. Descartada por la regla cero. |
| n004 «TWIST» | [jpg](https://i.pinimg.com/736x/d3/b7/25/d3b7252f6c064be8d195d4753ef01c43.jpg) | Tenedor con pasta flotando a través de la palabra. Mismo problema: aspecto generado, comida que flota. Descartada. |
| n005 «FRESH» | [jpg](https://i.pinimg.com/736x/11/7a/3f/117a3f6f3b717ed0d28f779106789125.jpg) | Producto delante de un titular enorme. Fuerte, pero es un bodegón de estudio sin mesa ni sitio: no vende un bar. Finalista, no elegida. |
| **n037 «la primera impresión importa»** | [jpg](https://i.pinimg.com/736x/ae/af/82/aeaf824f49b4d7593d055afd0ee36223.jpg) | **Elegida.** Es una pizza de jamón como la real de Da Tonino, en ángulo alto de tres cuartos, con luz de sol dura y sombras de hojas: parece rodada, no generada. El texto va directo sobre la foto, sin cajas, y además habla de marketing, que es lo que vende Society. |
| n063 «THE BIG MELT» | [jpg](https://i.pinimg.com/736x/1b/95/fc/1b95fc14b9698f6ade92332909fd96ca.jpg) | Hamburguesa con salsa que cae. Lleva botón «SHOP NOW» y círculo «BUY 1 GET 1». Descartada por contenedores. |
| n129 bodegón azul | [jpg](https://i.pinimg.com/736x/18/b6/22/18b6228b301531225750ff75f7afeebb.jpg) | Mesa cobalto con plato, rábanos y guindillas: el color exacto de Society. No lleva texto y el atrezo no sería del cliente. Segunda opción si se quiere una pieza en azul. |
| n130 «BLUE BIRD HOT CHICKEN» | [jpg](https://i.pinimg.com/736x/b4/07/4b/b4074be294a6cd33d2b6fe7cbd377ea7.jpg) | Manos con comida que se cruzan con un titular azul. Buena composición, pero lleva pegatinas detrás del texto. Descartada por contenedores. |

## Coste

2 generaciones con `gpt_image_2_5` a 2,75 créditos: **5,5 créditos** (saldo antes de generar: 820,65).

## Avisos

- **Sin verificar:** el usuario de Instagram de Society y que haya enlace en la bio. Si no lo hay, cambiar «LINK EN LA BIO».
- La pizza es la real de Da Tonino, pero la escena (luz de tarde, encuadre, mascota) es generada. Si se publica en nombre de Da Tonino o se le cita, conviene su permiso.
- El texto está generado dentro de la imagen. Se revisó letra a letra a 2K, pero conviene una última lectura antes de publicar.
- No se pasó `medir_realismo.py`: ese script mide vídeo y esto es una imagen fija. La revisión de realismo se hizo a ojo (plano de foco, luz con fuente, sombras de la mascota).
