# 01 · Texturas y materiales de comida

Cómo evitar que una superficie de comida (arroz, carne, pan, salsa, verdura) se vea de plástico. Mediciones del 24/09/2026 sobre generaciones reales de Higgsfield (Seedance 2.5, Nano Banana Pro, Topaz). Complementa el diccionario general de micro-imperfecciones de [`../knowledge/05-biblia-hiperrealismo.md`](../knowledge/05-biblia-hiperrealismo.md) §4.

## Índice

1. El reescalado no crea textura
2. El plástico nace en el keyframe
3. La ficha de texturas reales
4. La ficha de producto para primeros planos
5. Vocabulario de textura por ingrediente
6. Escala y fidelidad del plato
7. Movimiento sin morfismo

---

## 1. El reescalado no crea textura [MEDIDO]

Mismo maki, recortado a la misma escala. Métrica: varianza del filtro de bordes, que mide el detalle fino.

| Versión | Detalle fino |
|---|---|
| Foto real | 1.544 |
| 480p + Topaz 1080p | 499 |
| 480p + reescalado simple (Lanczos, sin IA) | 352 |

Topaz recupera alrededor de **un tercio** del detalle real y aporta poco sobre un reescalado sin IA. A 480p un grano de arroz ocupa unos 3 px, así que el modelo nunca llega a generarlo. **Observado:** el arroz exterior se funde en una masa lisa y cerosa; la forma y los rellenos se mantienen fieles.

**Consecuencia:** el reescalador sirve para la resolución de salida, no para el detalle. En un plano donde se mira la textura, se genera directamente a la resolución final (→ [`03-resolucion-y-reescalado.md`](03-resolucion-y-reescalado.md)).

⚠️ Ningún reescalador **de vídeo** del catálogo de Higgsfield acepta prompt ni modo creativo (Topaz, ByteDance y "Video Upscale", revisado el 24/09/2026). **Hipótesis de riesgo:** un reescalador creativo de vídeo inventaría textura fotograma a fotograma; en vídeo eso suele producir arroz que "hierve" y comida que cambia. No usarlo como solución principal sin una prueba.

**Vía nueva por probar: el reescalado generativo sobre el keyframe [OFICIAL, catálogo en vivo del 24/09/2026].** Para **imagen** sí existe un reescalador creativo: `topaz_image_generative` (variante `Redefine` por defecto, `creativity` 1–6, `texture` 1–5, `autoprompt`). Aplicado al **keyframe antes de animar**, añadiría textura en una sola imagen fija, así que no puede "hervir" entre fotogramas; el vídeo después solo tiene que conservarla (bloque `PRESERVE TEXTURE`).
- **Riesgo:** con creatividad alta puede inventar detalles que el plato real no tiene. Empezar con `creativity` 1–2 y `texture` 2–3, y comparar con la foto real.
- **Prueba A/B propuesta:** el mismo keyframe del nigiri, con y sin `topaz_image_generative`, medido con la métrica de detalle fino de la tabla de arriba y revisado contra la foto real. Si mejora el detalle sin inventar, pasa a ser un paso fijo entre la PUERTA A y la animación.

## 2. El plástico nace en el keyframe [MEDIDO]

El keyframe del nigiri y un fotograma del vídeo final eran prácticamente iguales: tamago brillante y uniforme, arroz sin granos definidos. **El defecto ya estaba en la imagen.** El vídeo lo hereda y además lo calienta (→ [`02-luz-y-color.md`](02-luz-y-color.md) §1).

Por eso la revisión de textura se hace **en la hoja de contactos de keyframes, antes de animar**. Un keyframe con arroz ceroso no se anima "para ver si mejora": se regenera.

## 3. La ficha de texturas reales

Una cuadrícula de 3×3 con **recortes al 100 % de una foto real del cliente**. Ejemplo de sushi: tamago, nori, wasabi, jengibre, arroz, wakame, inari, lino y madera. Se monta automáticamente con PIL a partir de la foto original.

Reglas:

- **Sin rótulos ni texto:** el texto de la referencia acaba apareciendo en la generación.
- Va como referencia **en cada keyframe y en el vídeo**, no solo en el primero.
- La instrucción dice qué copiar y qué no: *"@image2 = real texture sheet. Match the surface textures of @image2 exactly: grain size, matte vs wet, cracks, fibres. Do not copy its layout."*
- Cuenta dentro del presupuesto de referencias: con Nano Banana Pro, la atención se diluye a partir de 3–4 referencias (`knowledge/00` §5). Reparto habitual: foto real del plato + ficha de texturas + fotograma de encuadre.

## 4. La ficha de producto para primeros planos

Para planos cercanos, una ficha tipo catálogo: **3–4 ángulos del plato + 3 macros de textura**.

- **Prioridad: fotos reales**, aunque sean de móvil. Una ficha generada por IA hereda el mismo aspecto plástico.
- Es lo que Society debería pedir al restaurante **en el alta de cada plato héroe** (campo del perfil del cliente, [`../../assets/perfil-cliente.md`](../../assets/perfil-cliente.md)).
- Patrón equivalente al *character sheet* de personas (`knowledge/04`): el plato héroe es un "personaje" recurrente que debe verse igual en todas las piezas.

## 5. Vocabulario de textura por ingrediente

Va en el campo `texture` del brief de imagen (→ [`04-bloques-de-prompt.md`](04-bloques-de-prompt.md)). Se describe física observable: tamaño, mate o húmedo, grietas, fibras, huecos. Nunca "delicious", "appetizing" o "perfect".

| Ingrediente | Texto para el prompt |
|---|---|
| Tamago / tortilla | matte egg surface with fine pores, thin layer lines, one or two small cracks, faint browned spots, no shine |
| Arroz de sushi | individual grains 5-7 mm, slightly translucent, visible gaps and tiny shadows between grains, a few broken grains |
| Nori | matte, crinkled and fibrous, tiny pinholes |
| Jengibre encurtido | thin fibrous slices, translucent edges |
| Wasabi | grainy paste with small ridges, not smooth |
| Carne a la brasa (corte) | visible fat marbling, muscle fibres running across the cut face, sheen only on the fat, charred crust with uneven dark edges |
| Pan / miga | irregular open crumb with uneven air pockets, crust with small cracks and flour dust, a few crumbs on the board |
| Salsa | glossy surface catching one specular highlight, uneven edge where it pools, a thin skin where it has cooled |
| Verdura fresca | small moisture beads, a slightly bruised edge, natural colour variation within the same leaf |
| Bebida fría | condensation droplets running down the glass, a faint meniscus, real refraction of the background through the liquid |

Añadidos generales de comida, de la biblia heredada (`knowledge/05` §4): vapor real saliendo de lo caliente, migas, un borde irregular (la comida nunca es un círculo perfecto), una miga caída sobre la mesa.

## 6. Escala y fidelidad del plato

- **Escala en centímetros** (`knowledge/05` §6): "the plate is 27 cm across; the chuletón is about 4 cm thick". Sin medidas, el modelo infla o encoge.
- **Número exacto de piezas:** en el clip del chuletón salieron unas 7 lonchas en lugar de 5 [OBSERVADO]. Se escribe el recuento como hecho y se repite en cada regeneración: "exactly five slices, fanned left to right". Para piezas largas con varios objetos, bloque `EXACT OBJECT COUNT` (`knowledge/10` §2.3).
- **Emplatado real:** el orden, la vajilla y la guarnición salen de la foto real. Nada inventado sobre la mesa ni debajo del plato. Ni platos comidos ni copas vacías, salvo que la historia lo pida.

## 7. Movimiento sin morfismo

- **Riesgo documentado:** en órbitas y macros que recorren comida blanda, el modelo reinventa la comida entre fotogramas. Los sujetos rígidos (botella, mesa, fachada) aguantan bien los arcos de cámara.
- **Continuidad al cambiar de distancia de cámara:** si el mismo plato aparece en general y en macro, se describe como **el mismo objeto visto a distintas distancias** (bloque `PERSISTENT PROP`, `knowledge/10` §2.4): *"Wide shot → medium → macro = THE SAME dish viewed from different camera distances. Do not redesign it when the camera gets closer."*
- **Preservar la textura en el prompt de vídeo:** bloque `PRESERVE TEXTURE` fijo (→ [`04-bloques-de-prompt.md`](04-bloques-de-prompt.md) §2).

## Pendiente de verificar

- ~~ByteDance frente a Topaz~~ **Medido el 24/09/2026** en la cazuela de gambas (720p → 1080p): ByteDance pro recupera el 71 % del detalle del keyframe, ByteDance `aigc` el 53 %, Topaz el 37 % y el 1080p nativo el 31 %; proporción correcta en todos ([`03`](03-resolucion-y-reescalado.md) §4). Falta repetirlo con una textura granular (arroz del nigiri).
- GPT Image 2.5 y Seedream 4.5 frente a Nano Banana Pro, con el mismo prompt y la misma ficha de texturas.
