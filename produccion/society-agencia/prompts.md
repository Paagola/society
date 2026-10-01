# Imágenes generadas para «Tu agencia con IA» (28/09/2026)

Higgsfield. **11 cr en total**, con el coste comprobado antes (saldo de 366,57 → 355,57 cr). Las láminas se pidieron a `nano_banana_pro` y las sirvió `nano_banana_2` (se registra lo servido). Referencias subidas:

| Referencia | Archivo | `media_id` |
|---|---|---|
| Pizza real de Da Tonino | `promo/public/caso/real-pizza.jpg` | `65200f01-cf89-4138-9385-f3d887aa6cba` |
| Sala real de Da Tonino | `promo/public/caso/real-sala.jpg` | `295a60e0-57bf-48a4-ae2d-5e6ee0eb0b44` |
| Estética propia de Víctor | `posts/grid.png` | `aac229c9-0505-44f1-82d7-5ffebeb9febb` |

| Archivo (`imagen/`) | Modelo servido | Ajustes | Coste | Trabajo |
|---|---|---|---|---|
| `mesa.png` | gpt_image_2_5 | 9:16, 2K, media, ref. pizza | 1 cr | `1b452d1f-84a1-44a9-b923-2a400d30ef82` |
| `mano-movil.png` | gpt_image_2_5 | 4:5, 2K, media, fondo transparente | 1 cr | `26e7bbd3-0ea9-4943-a64f-e424fda1f597` |
| `collage.png` | gpt_image_2_5 | 9:16, 2K, media | 1 cr | `bb824743-e683-4c27-a841-293651b1e38a` |
| `lamina-1.png` (portada) | nano_banana_2 | 4:5, 2K, ref. pizza + grid | 2 cr | `201a0924-ee65-4fda-be65-078085a707f3` |
| `lamina-2.png` (porción) | nano_banana_2 | 4:5, 2K, ref. pizza + grid | 2 cr | `fc72a7ae-7591-40c8-bd0f-098cecc77793` |
| `lamina-3.png` (en la sala) | nano_banana_2 | 4:5, 2K, ref. pizza + grid + sala | 2 cr | `10cb4818-e2f8-427e-8916-db9cb984352b` · **descartada**: Víctor eligió otra |
| `pov-movil.png` (foto del móvil) | nano_banana_2 | 9:16, 2K, ref. pizza | 2 cr | `8822e964-8541-4158-86dc-66659d5b4626` |
| `lamina-3-victor.png` (tercera lámina) | — | elegida por Víctor, generada el 25/09 | 0 cr ahora | `d68d1d5f-2b9e-4e96-8def-5e000e0f4413` |

## Prompts

Las tres de papel llevan al final el bloque de estilo de [`skills/papel-stopmotion/references/prompt-estilo.md`](../../skills/papel-stopmotion/references/prompt-estilo.md). Llevan también «Large, bold, simple paper shapes, uncluttered», para que tengan pocas piezas y grandes.

- **mesa:** Vista cenital de una mesa de madera de pizzería. Arriba, la pizza de la referencia (prosciutto, rúcula y borde tostado) en plato blanco, con una caña y una servilleta cobalto con cubiertos. Abajo, madera vacía para que aterrice una tarjeta. Sin personas, manos, móvil ni texto.
- **mano-movil:** Una mano derecha que sostiene un móvil en vertical, vista desde detrás, como haciendo una foto a la comida. La pantalla es un rectángulo negro vacío, con puño cobalto. Fondo transparente y sin texto.
- **collage:** Composición abstracta de grandes hojas rasgadas: fondo tinta, trozos cobalto que entran por los bordes y algún resto crema, con mucho espacio vacío en el centro. Sin objetos ni texto.
- **lámina 1:** Fotografía editorial profesional de la pizza exacta de la imagen 1, a 45°, con luz lateral baja, fondo negro y poca profundidad de campo. El tercio de arriba queda oscuro y vacío para el título, con el tono de los posts de la imagen 2. Sin texto.
- **lámina 2:** Macro de una porción de la misma pizza levantándose: el jamón cayendo, rúcula y algo de queso estirándose. Fondo oscuro y luz lateral cálida. Sin texto.
- **pov-movil:** Rehace la foto real (imagen 1) en vertical 9:16, como una foto de móvil hecha desde la mesa. Conserva exactamente la pizza, la caña, la segunda pizza, el vino, la servilleta, el tenedor y la mesa. Misma luz y el aspecto normal de una foto de móvil; solo alarga la mesa arriba y abajo. No añade ni cambia nada, sin manos ni texto.
- **lámina 3 (descartada):** La misma pizza en una mesa de la sala de la imagen 3, conservando el suelo de madera, las plantas, las lámparas y las sillas grises. Luz de tarde y la sala desenfocada detrás. Sin personas ni texto.

La transcripción completa de cada prompt está en la conversación del 28/09 y en el trabajo de Higgsfield.

## Carrusel con el texto integrado (28/09/2026, tarde)

- **Estética:** post «The Golden Hour» recortado del centro de `posts/grid.png` (`posts/golden-hour.png`, 360 × 450). Se subió con `media_id` `5b5745b6-cbac-40dd-bcf7-97c7365bb6d5` y se reescaló a 2K (trabajo `46c8ae6c`, 2 cr).
- **Láminas:** cada una parte de su foto (imagen 1) con el post como referencia tipográfica (imagen 2). Llevan el texto dentro de la imagen y el título por detrás de la comida; no hay nada escrito encima en Remotion. Servido: `nano_banana_2`, 4:5, 2K, 2 cr cada una.

| Orden | Foto de partida | Texto | Trabajo |
|---|---|---|---|
| 1 | Porción (`fc72a7ae`) | PROSCIUTTO *e Rucola* · Masa fina, borde tostado · Jamón. Rúcula. Mozzarella. · Reserva tu mesa | `5a3e392d` (el primer intento, `f8de769f`, falló) |
| 2 | Pizza entera (`201a0924`) | RECIÉN *del horno* · Borde alto, tostado · Para compartir · Reserva tu mesa | `60ae2ff6` |
| 3 | Jamón, la elegida por Víctor (`d68d1d5f`) | DA TONINO *te espera* · Reserva tu mesa | `954fb993` |

**Coste:** 10 cr (saldo de 305,22 → 295,22). Incluye 2 cr del intento fallido, que parece que se cobró; no he comprobado si luego se devuelven.
