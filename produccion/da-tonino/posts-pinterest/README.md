# Da Tonino · dos posts de Instagram desde Pinterest

Fecha: 2026-10-21. Encargo de Víctor: analizar pines nuevos de Pinterest, elegir la mejor referencia y crear en Higgsfield **a la vez** la foto con buen ángulo y el diseño del post, en una sola generación. Correcciones de Víctor al primer intento: **Nano Banana Pro**, posts **para el restaurante** (no para Society) y otro estilo.

## Entregables

| Post | Final 1080 × 1350 | Original 2K | SHA-256 |
|---|---|---|---|
| **A · «PIZZA»** (crema, serif gigante, el queso se enreda en las letras) | [png](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/4913f502-9163-45d1-916c-5e69aef6ac98.png) | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/hf_20261021_083442_ad78c219-fed0-4542-8c93-ecec0e95b188.png) | `4c18e8f5…d4b698` |
| **B · «PROSCIUTTO E RUCOLA»** (manos con la pizza delante de letras rojas enormes) | [png](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/6323ceba-788b-4ec7-9fed-9b76f3b9677c.png) | [png](https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/hf_20261021_083442_3126eb7d-b5f5-4697-843f-a5db4189b1d0.png) | `4a7110a0…ece1217d` |

Prompts exactos, referencias y `job_id`: [herramientas/prompts.json](herramientas/prompts.json). Para tenerlos en local: `bash produccion/da-tonino/posts-pinterest/herramientas/descargar.sh`. Los PNG no van en el repositorio.

## Copy

**A.** En la imagen: «DA TONINO · RISTORANTE», «PIZZA», «Prosciutto e rucola», «TOMATE · MOZZARELLA · PROSCIUTTO · RÚCULA», «Reserva tu mesa». Tipografía y colores sacados de la cartela de Da Tonino ([`reel-v4/montaje/cartela.png`](../reel-v4/montaje/cartela.png)): serif cursiva, crema y dorado.

**B.** En la imagen: «PROSCIUTTO / E / RUCOLA», «Da Tonino», «RESERVA TU MESA».

Texto de publicación (propuesta para los dos):

> Prosciutto e rucola: tomate, mozzarella, jamón y rúcula fresca sobre nuestra masa napolitana. Ven a probarla. Reserva tu mesa (enlace en la bio).
>
> #pizzanapolitana #pizza #restauranteitaliano #prosciuttoerucola #datonino

## Cómo se hizo

1. **Pinterest.** Los mismos 144 pines nuevos del primer intento (6 búsquedas: pósteres de comida con tipografía, posts de restaurante, publicidad de comida, portadas de revistas de cocina, hamburguesas y comida en azul), ninguno repetido del PR #3. Para cambiar de estilo se descartó el pin del primer intento (foto cálida con sol y titular encima) y se tomaron las dos finalistas que juegan con **tipografía gigante entrelazada con la comida**.
2. **Plato real.** La foto real de la pizza Prosciutto e rucola de Da Tonino ([`reel-v4/referencias/pizza.jpg`](../reel-v4/referencias/pizza.jpg)) va como referencia en los dos posts, con su plato oscuro. El nombre sale de su carta.
3. **Una sola generación por post.** `nano_banana_pro`, 2K, 4:5, con dos referencias: el pin (maquetación, ángulo y luz) y la pizza real (el plato). Sin mascota de Society, sin cajas detrás del texto, sin montaje posterior; solo el reescalado Lanczos a 1080 × 1350.

## Referencias elegidas

| Post | Pin | Qué se toma | Qué cambia |
|---|---|---|---|
| A | [n002 «PASTA»](https://i.pinimg.com/736x/37/51/2c/37512c37a4d84640958efd1e577fef61.jpg) | Fondo de papel crema, palabra serif gigante, la comida que pasa por delante y por detrás de las letras, plato abajo a la derecha en tres cuartos, subtítulo en cursiva y detalles en versalitas | La pasta pasa a ser la pizza real con una porción que se levanta y el queso que cruza «PIZZA»; colores y tipografía de la cartela de Da Tonino |
| B | [n130 «BLUE BIRD HOT CHICKEN»](https://i.pinimg.com/736x/b4/07/4b/b4074be294a6cd33d2b6fe7cbd377ea7.jpg) | Fondo crema, tres filas de letras condensadas enormes de un color, dos manos que entran por la izquierda con comida delante del texto, luz de flash con sombra corta | Las pegatinas del pin se quitan (son contenedores); el azul pasa a rojo tomate; arriba la pizza entera en su plato y abajo una porción con hilo de queso |

La tabla completa de las 8 finalistas está en la versión anterior de este documento (historial del PR #5).

## Coste

Primer intento descartado (post de Society con GPT Image 2.5): 5,5 créditos. Este intento: 2 generaciones con Nano Banana Pro, 4 créditos. Saldo final: 811,15.

## Avisos

- **Higgsfield registra los trabajos como `nano_banana_2`** aunque se pidieron con `nano_banana_pro`. Parece el nombre interno del mismo modelo, pero no está confirmado.
- **Post B:** la pizza del plato se ve entera y además hay una porción en la mano. Si molesta, se repite pidiendo que falte una porción en el plato.
- **Post A:** el hilo de queso que cruza las letras es un efecto de cartel a propósito: no es físico.
- El precio, los ingredientes exactos y el usuario de Instagram de Da Tonino **no están verificados**. Los ingredientes del post A salen de lo que se ve en la foto real.
- Conviene el visto bueno de Da Tonino antes de publicar en su nombre.
- El texto está generado dentro de la imagen; se revisó, pero hay que leerlo otra vez antes de publicar.
