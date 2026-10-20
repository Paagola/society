# Carruseles de Society · tres carruseles con el texto integrado en la imagen

Fecha: 2026-10-20. Encargo de Víctor: rehacer los carruseles de Society con mejor dirección de arte, con el texto generado dentro de la propia imagen (sin montaje posterior), con la mascota del Drive y con una imagen de Pinterest elegida una a una como referencia. Sin contenedores: ningún texto va sobre cajas, paneles, tarjetas, bandas ni bocadillos.

## Entregables

| Qué | Enlace |
|---|---|
| ZIP con las 18 diapositivas (1080 × 1350 PNG) y las 3 tiras de vista previa | [carruseles_society_18.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/5b8eade9-16ba-49d6-8bb6-1802d1fb07ae.zip) · SHA-256 `52196248bc82b9c1e7674d529150167b7ae9b05e25884a234cc09181d8325a1b` |
| Vista previa carrusel 1 | [jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/bd874840-f952-4f95-ac7f-18f01a617ca2.jpg) |
| Vista previa carrusel 2 | [jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/22a93e77-7f3d-4464-a223-b73170a28d23.jpg) |
| Vista previa carrusel 3 | [jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/aed178b5-35af-4919-83ca-e72305b77f01.jpg) |
| Copy por diapositiva y textos de publicación | [copy.md](copy.md) |
| Prompts exactos, referencias y `job_id` de cada diapositiva | [herramientas/prompts_c1.json](herramientas/prompts_c1.json), [prompts_c2.json](herramientas/prompts_c2.json), [prompts_c3.json](herramientas/prompts_c3.json) |
| Mascota y logo usados como referencia (copiados del Drive de Society) | [referencias/marca/](referencias/marca/) |

Los PNG no van en el repositorio: el contenedor donde se preparó no podía descargar del almacenamiento de Higgsfield (proxy 403). Para tenerlos en local: `bash carruseles_society/herramientas/descargar_finales.sh` (descarga, comprueba el SHA-256 y descomprime en `carrusel_01_…`, `carrusel_02_…`, `carrusel_03_…`).

## Cómo se hizo

1. **Marca.** Del LEEME del Drive: azul #1033EF, amarillo #F5C518, tinta #151515, papel #F2F1EC; Anton, Schibsted Grotesk, Space Mono y Playfair Display Bold Italic; logo en collage de letras de papel rasgado. Mascota: cabeza de bola de papel arrugado, cara ovalada negra con dos ojos blancos en forma de píldora vertical (no cambian nunca), halo de globo de alambre, sudadera cobalto con destello amarillo, guantes blancos, piernas negras y zapatillas blancas.
2. **Pinterest.** 144 pines de 6 búsquedas (pósteres editoriales con personaje, collage de papel, tipografía gigante, carruseles de marca en azul cobalto). Primer filtro con hojas de contactos y después revisión una a una de 20 finalistas (tabla abajo).
3. **Generación.** Modelo `gpt_image_2_5` (calidad alta, 2K, 4:5) en Higgsfield. Se probó `nano_banana_pro` en la portada del carrusel 1 y tapaba la palabra en cursiva; GPT ganó en legibilidad del texto. Cada diapositiva lleva como referencias el pin elegido para su carrusel, la mascota (pulgar, señalando o celebrando según la diapositiva) y la hoja de personaje, para que la mascota sea la misma en las 18. La regla del proyecto se cumple así: los elementos de la referencia (estudio cobalto, collage de papel, tipografía gigante) aparecen, pero la composición, el texto y el personaje son nuevos.
4. **Reglas de maquetación en el prompt.** El titular ocupa el 65–78 % superior y nada tapa ninguna letra; la frase en cursiva va con letras recortadas sueltas, nunca sobre una tira; todo el texto va directamente sobre el fondo, sin cajas.
5. **Revisión.** Se revisaron las 18 diapositivas. Se descartaron y repitieron 5: la portada del carrusel 2 (la cursiva iba sobre una tira de papel, que es un contenedor), la diapositiva 3 del carrusel 2 (bajo las gafas de sol los ojos parecían lágrimas) y las diapositivas 2, 3 y 5 del carrusel 3 (la mascota tapaba palabras).
6. **Exportación.** Reescalado Lanczos de 2K a 1080 × 1350 en el sandbox de Higgsfield, más una tira de vista previa por carrusel.

## Dirección de arte por carrusel

| Carrusel | Referencia de Pinterest | Qué se toma de ella | Qué cambia |
|---|---|---|---|
| **1 · Tu bar merece que lo vean** | [d04 «STAY CURIOUS»](https://i.pinimg.com/736x/cd/b9/f2/cdb9f212479ae53daebd1a773f457115.jpg) | Personaje de cuerpo entero en un estudio fotográfico cobalto sin costuras, delante de un titular gigante en blanco | La mascota de Society en vez del personaje, titular en Anton con palabra en Playfair cursiva amarilla, un atrezo distinto por diapositiva (pizarra, móvil, calendario) |
| **2 · Nadie va a donde no ve** | [a06 «READ LATE»](https://i.pinimg.com/736x/a1/39/f9/a139f9fc08da33063f2b8a45ad1de715.jpg) | Collage de nota de rescate: letras recortadas de revista sobre papel cobalto arrugado | Es el mismo ADN que el logo de Society; se numeran los errores (01–04) y la mascota se integra como recorte de papel |
| **3 · Publica menos, llena más** | [d12 «THE BAD BOYS»](https://i.pinimg.com/736x/08/f2/8d/08f28dd00b78ddf78b9ddf733b835e76.jpg) (composición) + [c18 «SLOW IS A POWER MOVE»](https://i.pinimg.com/736x/91/20/f0/9120f0ef3b591ad9a51748b6ed560116.jpg) (color) | De d12, el personaje delante de tipografía condensada gigante sobre papel; de c18, la paleta papel + tinta + cobalto | Tono de manifiesto: frases cortas, mucho papel en blanco y la mascota en un lateral sin tapar texto |

## Las 20 finalistas de Pinterest, una a una

Las imágenes de Pinterest son solo referencia de estilo: no se publican ni se copian.

| Id | Pin | Veredicto |
|---|---|---|
| a06 | [jpg](https://i.pinimg.com/736x/a1/39/f9/a139f9fc08da33063f2b8a45ad1de715.jpg) | **Elegida (carrusel 2).** Collage cobalto con letras de revista: el ADN exacto del logo de Society. |
| a08 | [jpg](https://i.pinimg.com/736x/68/99/d5/6899d51b8824cfdab644967711f05af5.jpg) | Tiras de papel rasgado. Finalista, no elegida. |
| a15 | [jpg](https://i.pinimg.com/736x/b8/43/53/b84353e18f30c57e48d94d0158b0cd09.jpg) | Recorte con rayos amarillos, pero el texto va dentro de una caja. Descartada por contenedor. |
| a18 | [jpg](https://i.pinimg.com/736x/82/b9/c9/82b9c9aaa4fa8d64fd152cb738c269d9.jpg) | Tipografía de nota de rescate. Finalista, no elegida; a06 trae además el cobalto. |
| c01 | [jpg](https://i.pinimg.com/736x/8d/2d/fd/8d2dfdc157dc4e72dd6ff4fa388ad939.jpg) | Finalista, no elegida. |
| c06 | [jpg](https://i.pinimg.com/736x/1a/26/ea/1a26eac9ccfb55a6d72d6fd8b36a3b92.jpg) | Finalista, no elegida. |
| c12 | [jpg](https://i.pinimg.com/736x/b1/06/16/b106165a7636d26d333c2da836fe6e0d.jpg) | Finalista, no elegida. |
| c18 | [jpg](https://i.pinimg.com/736x/91/20/f0/9120f0ef3b591ad9a51748b6ed560116.jpg) | **Elegida (color del carrusel 3).** Papel con tipografía condensada en tinta y cobalto. |
| c19 | [jpg](https://i.pinimg.com/736x/01/a0/81/01a081d8b4c62435e45d46e7d7fa0deb.jpg) | Finalista, no elegida. |
| d03 | [jpg](https://i.pinimg.com/736x/1f/f4/09/1ff4090b559ec180864490e90463626d.jpg) | Finalista, no elegida. |
| d04 | [jpg](https://i.pinimg.com/736x/cd/b9/f2/cdb9f212479ae53daebd1a773f457115.jpg) | **Elegida (carrusel 1).** Personaje delante de tipografía gigante sobre cobalto. |
| d12 | [jpg](https://i.pinimg.com/736x/08/f2/8d/08f28dd00b78ddf78b9ddf733b835e76.jpg) | **Elegida (composición del carrusel 3).** Personaje sobre tipografía gigante en papel. |
| d20 | [jpg](https://i.pinimg.com/736x/18/ef/9e/18ef9e2011e4f06cbe5508861f9caf34.jpg) | Finalista, no elegida. |
| e16 | [jpg](https://i.pinimg.com/736x/11/48/70/11487066c6dac2c638a1663afaea84b0.jpg) | Rectángulos de papel detrás del texto. Descartada por contenedor. |
| f04 | [jpg](https://i.pinimg.com/736x/e8/5e/a8/e85ea802a87a49e31f1c0e96526e675f.jpg) | Finalista, no elegida. |
| f05 | [jpg](https://i.pinimg.com/736x/98/11/ed/9811eddfd62bb5da2cb1ecadac186fd2.jpg) | Finalista, no elegida. |
| f09 | [jpg](https://i.pinimg.com/736x/85/c6/9a/85c69a86a4839457befce3d5483ca336.jpg) | Finalista, no elegida. |
| f10 | [jpg](https://i.pinimg.com/736x/bd/dc/96/bddc96cf0ae54ff7418c4579b42c4af5.jpg) | Iconos dentro de círculos. Descartada por contenedor. |
| f11 | [jpg](https://i.pinimg.com/736x/bd/ce/c7/bdcec7decb04847ec6e174b5f84e9100.jpg) | Finalista, no elegida. |
| f21 | [jpg](https://i.pinimg.com/736x/bb/64/9d/bb649df9488e441cff1b780b8ad07cea.jpg) | Finalista, no elegida. |

En las no elegidas solo se anota el motivo cuando fue concreto (contenedor, o quedar cubierta por otra finalista); los enlaces son las imágenes que se analizaron.

## Coste

24 generaciones: 23 con `gpt_image_2_5` a 2,75 créditos y 1 prueba con `nano_banana_pro` a 2 créditos. Total **65,25 créditos** (saldo de 955,90 a 890,65). Las 18 finales son 49,5; el resto son la prueba de modelo y las 5 repeticiones.

## Avisos

- **Sin verificar:** el usuario de Instagram de Society y que vaya a haber un enlace en la bio. Las diapositivas finales dicen «Link en la bio»; si no lo hay, hay que cambiarlo.
- La foto de tapas y los platos que aparecen en algunas diapositivas son ilustrativos: no son de ningún cliente real. No usarlos como si lo fueran.
- Los textos están generados dentro de la imagen. Se revisaron letra por letra, pero conviene una última lectura antes de publicar.
