# Reel 05 — «Media carta en 10 segundos» (cenital, ráfaga de platos)

**Fecha:** 2026-09-09
**Plantilla base:** [`plantillas/2026-09-09/A_new-season-new-menu_11s.mp4`](../plantillas/2026-09-09/A_new-season-new-menu_11s.mp4)
(original: *"A new season, a new menu"*, restaurante **CLARENCE**)
**Publicación prevista:** viernes 18 de septiembre — pieza fuerte de la semana 1, la que convierte al
público que traiga el Reel de reapertura
**Formato:** 9:16, ~10 s, cámara cenital fija sobre la misma mesa, el plato cambia

---

## 0. Qué mide la plantilla y dónde está su fallo

Medida hoy (gratis): **hook 28 · overall 43 · viral 42 · sustain 94 · brain 34**.

Es la más floja de las tres, y se sabe exactamente por qué: **abre con un bodegón quieto y oscuro** —
un reservado vacío, sin acción, tres segundos de zoom hasta llegar al plato. Es literalmente lo que
prohíbe la regla 12 (*«si el primer fotograma se puede confundir con una foto fija, está mal»*), y su
`hook_score` de 28 lo confirma.

**Lo que sí funciona, y es lo que se copia:**

| Dato medido | Lectura |
|---|---|
| Corteza visual pico **0,494 en t=7** | El pico es **la ráfaga de platos** (6,2–8,5 s), no el plano largo del principio |
| Lenguaje y auditiva pico **0,370 / 0,392 en t=9** | El pico llega con **el rótulo en pantalla**, al final |
| Default Mode **0,740 de media** — el peor de las tres | Los 4 s de plano fijo del principio dejan divagar al espectador |

**La traducción es directa: se le da la vuelta al orden.** La ráfaga y el rótulo, que es donde la
plantilla se despierta en el segundo 7, aquí van al principio. Lo que en la plantilla es el clímax,
en nuestro Reel es el hook.

| | Plantilla (CLARENCE) | Torre de Vega |
|---|---|---|
| 0–2 s | Reservado vacío, oscuro, zoom | **Tenedor levantando ya una loncha de solomillo** + rótulo |
| 2–6 s | Plano cenital fijo, un tenedor come | Ráfaga de platos rotulados |
| 6–8,5 s | **Ráfaga de 17 platos** a 0,13 s | Plano cenital sostenido del plato fuerte |
| 8,5–11 s | Mano retira, mesa vacía, marca | Mesa vacía + `TORRE DE VEGA` |

**Y la ráfaga se ralentiza.** La plantilla cambia de plato cada **0,13 s** — imposible leer un rótulo
ahí. Como la palanca medida más barata que tenemos es rotular el producto en pantalla (la red del
lenguaje de la plantilla 06 mide 0,462 frente a 0,26–0,32 del resto), aquí la ráfaga va a **0,45 s por
plato**: sigue siendo ráfaga, pero da tiempo a leer el nombre. Es el injerto que pedía el
[`README` de plantillas del 08-09](../plantillas/2026-09-08/README.md): *el mecanismo de la
descartada se injerta en la que sí encaja*.

---

## 1. Estructura en el tiempo

| t | Plano | Rótulo |
|---|---|---|
| 0,0 – 2,2 s | **Cenital fijo.** Un tenedor sujetado por una mano de mujer ya está levantando una loncha de solomillo al whisky del plato. La acción está empezada en el fotograma 1 | `SOLOMILLO AL WHISKY` desde t=0 |
| 2,2 – 2,65 s | Mismo encuadre, cambia el plato | `CARNE A LA BRASA` |
| 2,65 – 3,10 s | ídem | `POLLO ASADO` |
| 3,10 – 3,55 s | ídem | `CALAMAR A LA PLANCHA` |
| 3,55 – 4,00 s | ídem | `ENSALADA DE CABRA` |
| 4,00 – 4,45 s | ídem | `PULPO` |
| 4,45 – 4,90 s | ídem | `TARTA DE PISTACHO` |
| 4,90 – 8,00 s | Vuelve al **solomillo**, plano sostenido, el tenedor deja la loncha | `MEDIA CARTA EN 10 SEGUNDOS` |
| 8,0 – 10,0 s | Mesa vacía, solo mantel y cubiertos | `TORRE DE VEGA` · `ABRIMOS EL 16` |

**Regla 12 cumplida:** acción ya empezada en el fotograma 1, rótulo desde el fotograma 1, y el primer
plano dura 2,2 s. El ritmo rápido empieza después del segundo 2, no antes.

**Regla 9 (movimiento con intención):** en montaje, cada plano de la ráfaga lleva un push-in del 3 %
distinto en dirección, y el plano largo del final un pull-back suave. Todo en After Effects, gratis.

**Pregunta de control — ¿un vecino reenviaría esto?** Con matices. Un Reel de carta se comparte
**dentro de un grupo que está decidiendo dónde comer**, que es un reenvío real aunque pequeño. Por eso
el cierre lleva `ABRIMOS EL 16`: le da la fecha, que es lo que de verdad se reenvía.

---

## 2. Los siete platos, y por qué estos

Criterio de la Parte II de [`documentación.md`](../documentación.md) §3: **elegir por información y
variedad cromática por fotograma, no por «el plato estrella»**. El pulpo con gambas midió 0,50 de
activación de corteza visual y el solomillo a la brasa 0,39, porque el segundo es marrón sobre marrón.

| # | Plato | Foto real | Por qué entra |
|---|---|---|---|
| 1 | Solomillo al whisky | `solomillo_cortado.jpg` + `solomillo_cortado2.jpg` | Es el plano del tenedor: necesita lonchas separables. Dos ángulos (regla 6) |
| 2 | Carne a la brasa cortada | `carne-cortada-plato-barro_REF.jpg` | Plato de barro + patatas + pimiento verde: tres colores |
| 3 | Pollo asado | `pollo_asado.jpg` | Dorado + patata, volumen alto |
| 4 | Calamar a la plancha | `calamar.png` | Blanco, verde perejil y patata: rompe la racha de marrones |
| 5 | Ensalada de queso de cabra | `ensalada_cabra.jpg` | El plano más cromático del lote |
| 6 | Pulpo | `pulpo.png` | El **medido**: 0,50, el más alto del Reel 01 |
| 7 | Tarta de pistacho | `tarta-pistacho.png` | Verde pistacho + nata: cierra en postre y en color |

**Se respeta la vajilla real de cada plato.** No se re-emplata todo en el mismo plato blanco: la
plantilla A también cambia de recipiente (cuenco, plato, papel). Lo que se mantiene idéntico es
**la mesa, la luz, el ángulo y la posición del plato en el cuadro** — que es lo que hace funcionar el
formato. Re-emplatar el pulpo en un plato que no es el suyo rompería la regla 1: el cliente entraría
al local y no reconocería lo que vio.

---

## 3. Referencias reales (regla 14 — todas verificadas)

| Token | Fichero | Papel |
|---|---|---|
| `@image1` | [`imagenes/local/mesa-ventana.jpg`](../imagenes/local/mesa-ventana.jpg) | Mantel crema real, mantelería, vajilla, contexto de sala |
| `@image2` | [`imagenes/local/mantel_blanco.jpg`](../imagenes/local/mantel_blanco.jpg) | Textura y costuras de la mantelería |
| `@image3` | `plantillas/2026-09-09/frames_A/A_3.80s.jpg` | **Solo ángulo, encuadre, distancia y reparto de luz** (regla 10) |
| `@image4`(+`@image5`) | La foto (o dos, regla 6) del plato de cada toma | Identidad del plato y su vajilla real |
| `@image6` | **La toma 1 ya generada** | Escena, mantel, luz y posición de cámara (regla 19) |

**Lo que se copia del fotograma de plantilla y lo que no.** La plantilla A es una mesa de nogal
oscuro con un aplique de latón y un banco de cuero rojo, luz dura desde arriba a la derecha, grade
cálido y contrastado. **De ahí sale solo:** cenital ligeramente inclinado, el plato en el tercio
izquierdo, la veta de la mesa llenando el cuadro, el espacio limpio a la derecha para el rótulo, y la
luz entrando por arriba a la derecha. **Nada más.** El aplique de latón y el banco rojo **no existen
en Torre de Vega y no se generan** (regla 1), y prevalece la regla 17 sobre el grade.

---

## 4. Prompt maestro — toma 1 (solomillo con tenedor)

`nano_banana_pro`, `resolution:"2k"`, `aspect_ratio:"9:16"`.

```json
{
  "subject_identity": "A single plated dish on a laid table at Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria, Spain, seen from almost directly above. @image1 is the master reference for the setting and governs the cream textured woven tablecloth over a white underskirt, the tableware and the cutlery. @image2 governs the weave and the real ironed creases of the linen. @image3 is the template frame and governs ONLY the camera and the light: a top-down angle tilted a few degrees off vertical, the plate sitting on the left third of the frame, the table surface filling the whole frame, clean empty table on the right third, and light arriving from the top right corner. @image4 and @image5 are two angles of the real dish and govern its identity: solomillo al whisky, medallions of pork tenderloin sliced across into overlapping slices in a glossy dark whisky and garlic sauce, served with thin fried potatoes and a fried green padrón pepper on a brown glazed terracotta plate about 26 cm across. Reproduce the dish exactly as photographed and invent nothing.",
  "realism": "a real photograph taken from above on a modern smartphone at the table, single realistic exposure, not CGI, not illustration, not a studio food-advertising shot",
  "environment": "the terracotta plate of solomillo al whisky on the cream textured tablecloth, freshly served and complete. A woman's hand enters from the bottom left corner holding a table fork, already lifting one whole slice of tenderloin clear of the plate — the slice is fully on the fork, mid-air, about 4 cm above the sauce, with one thread of sauce still hanging from it. Nothing else on the table but a folded white napkin at the top left corner.",
  "lighting": "abundant soft daylight arriving from the top right corner of the frame, grazing across the sauce so its gloss and the ridges of the meat read clearly and casting one soft real shadow of the fork and the raised slice down and to the left; the linen reproduces as neutral cream white with no yellow cast; natural contrast with real shadow, one single exposure, no HDR fusion, no studio softbox, no hard specular advertising highlight",
  "camera": {
    "lens_mm": "35",
    "aperture_f": "5.6",
    "iso": "250",
    "shutter": "1/160",
    "lens_to_subject_m": "0.7",
    "subject_to_bg_m": "0",
    "cct_k": "4400"
  },
  "composition": "vertical 9:16 frame, top-down at about 80 degrees, just off perfectly vertical. The terracotta plate sits on the left third and fills a little under half the frame width. The cream tablecloth fills the frame edge to edge. The right third is kept deliberately clean and empty as the area where the caption sits in editing. The hand and fork enter from the bottom left corner and are cropped at the wrist.",
  "imperfections": "one small splash of sauce on the rim of the terracotta plate, the ironed fold lines of the tablecloth crossing the frame, two fried potatoes fallen slightly out of the pile, an uneven glaze on the terracotta, short unpolished natural fingernails, fine skin texture and visible knuckle creases on the hand",
  "palette": "deep brown whisky sauce, warm terracotta, pale gold fried potato, dark green pepper, neutral cream linen, muted and not oversaturated",
  "mood": "appetising, homely and direct, the ordinary generosity of a village restaurant rather than a styled magazine shot",
  "film_stock": "no film stock; modern smartphone capture, iPhone main-camera look, flat contrast with lifted blacks, neutral white balance, deep depth of field, zero film grain, no cinematic colour grade",
  "negatives": "no brass wall lamp, no red leather bench, no dark walnut table, no barrel table, no branded or engraved lettering on the table, no half-eaten portion, no gap left in the plate where the slice came from, no used plate, no leftovers, no crumbs, no empty or stained glass, no fire, no flames, no embers, no smoke, no face, no arm above the wrist, no rings or bracelets or watches, no furniture or tableware absent from @image1, @image4 and @image5, no HDR look, no oversaturated colour, no film grain, no cinematic teal-and-orange grade, no overall yellow filter, no text, no logo, no watermark"
}
```

> **NL (revisión humana).** A real overhead photograph taken on a modern smartphone at the table — a
> single realistic exposure, not CGI, not a studio food shot — of one plate of solomillo al whisky as
> it is served at Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria.
> Use @image1 for the setting (cream textured tablecloth over a white underskirt, the real tableware
> and cutlery) and @image2 for the weave and ironed creases of the linen. Use @image3 only for the
> camera and the light: a top-down angle a few degrees off vertical, the plate on the left third, the
> table filling the frame, the right third clean, and light from the top right corner. Use @image4 and
> @image5, two angles of the same real dish, for its identity: pork tenderloin medallions sliced
> across into overlapping slices in a glossy dark whisky and garlic sauce, with thin fried potatoes
> and a fried green padrón pepper, on a brown glazed terracotta plate about 26 cm across. The dish is
> freshly served and complete; a woman's hand enters from the bottom left holding a table fork and has
> already lifted one whole slice clear of the plate, about 4 cm above the sauce, one thread of sauce
> still hanging. Nothing else is on the table but a folded white napkin at the top left. The scene is
> lit by abundant soft daylight from the top right corner, grazing the sauce so its gloss and the
> ridges of the meat read and casting one soft real shadow of the fork down and to the left; the linen
> stays neutral cream with no yellow cast; natural contrast, one exposure, no HDR, no softbox, no hard
> advertising highlight. The palette is deep brown sauce, warm terracotta, pale gold potato, dark
> green pepper and neutral cream linen, muted, in an appetising, homely, direct mood. Composition:
> vertical 9:16, top-down at about 80 degrees, the plate on the left third filling a little under half
> the frame width, the cloth edge to edge, the right third clean for the caption, the hand and fork
> cropped at the wrist entering bottom left. There is one small splash of sauce on the plate rim, the
> ironed fold lines of the cloth crossing the frame, two potatoes fallen out of the pile, uneven glaze
> on the terracotta, short unpolished nails and visible knuckle creases. Shot on a smartphone main
> camera, 35mm, f/5.6, ISO 250, 1/160, lens-to-subject 0.7m, colour temperature 4400K, flat contrast
> with lifted blacks, deep depth of field, zero film grain, natural colour. No brass lamp, no red
> leather bench, no dark walnut or barrel table, no engraved lettering, no half-eaten portion, no gap
> in the plate, no leftovers, no glass, no fire, no smoke, no face, no rings, no HDR, no yellow
> filter. Photographic realism, no text.

### 4bis. Detalle que no se puede pasar por alto

**El plato no puede quedar con un hueco.** El tenedor levanta una loncha, pero el plato tiene que
seguir leyéndose como una ración íntegra — si se ve el agujero de donde salió, es un plato empezado
(regla 15). Está explícitamente en los negativos: `no gap left in the plate where the slice came from`.

---

## 5. Las seis tomas de la ráfaga (regla 19 — encadenado)

Mismo JSON, cambiando solo estos campos, y **pasando siempre la toma 1 ya generada** como referencia
de escena, más las tomas anteriores según se acumulan:

| # | Plato | Refs de plato | `environment` (sustituye) |
|---|---|---|---|
| 2 | Carne a la brasa | `carne-cortada-plato-barro_REF.jpg` | *"a brown glazed terracotta plate of sliced grilled beef with thin fried potatoes and a fried green padrón pepper, freshly served and complete, in the exact position on the tablecloth where the previous plate was. No hands in this frame."* |
| 3 | Pollo asado | `pollo_asado.jpg` | *"a white oval platter of roast chicken quarters with their own juices and thin fried potatoes…"* |
| 4 | Calamar a la plancha | `calamar.png` | *"a round white plate of grilled squid with chopped parsley and thin fried potatoes…"* |
| 5 | Ensalada de queso de cabra | `ensalada_cabra.jpg` | *"a round white plate of green leaf salad with two rounds of grilled goat cheese, walnuts and dressing…"* |
| 6 | Pulpo | `pulpo.png` + `pulpo2.png` | *"a wooden serving board of sliced pulpo a la gallega with prawns, sliced potato, paprika, olive oil and chopped parsley…"* |
| 7 | Tarta de pistacho | `tarta-pistacho.png` | *"a dark aubergine glazed plate with one slice of pistachio tart, crushed pistachio and three quenelles of whipped cream…"* |

Y una **toma 8** de cierre: el mismo encuadre **sin plato**, solo mantel, servilleta doblada y los
cubiertos — sobre la que va la placa de marca.

En las siete: `"@image6 is the previously generated frame and governs the tablecloth, the light and
the exact camera position, which must not change at all"`, y en negativos `"no change to the
tablecloth, the light or the camera position from @image6"`.

---

## 6. Coste

| Concepto | Cantidad | Créditos |
|---|---|---|
| `nano_banana_pro` 2k, 9:16 | 8 | **16,00** |
| Montaje, push-ins y rótulos en After Effects | — | 0 |

**Ningún plano se anima.** Regla 11 de `reglas_videos.md`, sección *«Los 4 bloques anclan, pero no
inventan movimiento que no esté en el frame»*: en un plato quieto no hay de dónde sacar movimiento, y
el modelo no crea vapor sobre una imagen fría. Todo el movimiento de este Reel es push-in de AE.

La única excepción defendible sería el plano 1 (regla 12 pide movimiento real en el primer plano): el
tenedor levantando la loncha **sí** tiene movimiento propio en el fotograma. Si el cliente lo quiere
animado, es `minimax_hailuo` `minimax-2.3` 6 s 1080p = **10 créditos** (caso 3: manos y acción física,
dos manos ya es caso 3).

---

## 7. Bloqueos

1. **Aprobación del lote de 8 imágenes** antes de montar (regla 1).
2. **Los siete platos son elección propia** por variedad cromática medida, no por preferencia del
   cliente. Cambiar cualquiera cuesta 2 créditos de regeneración.
3. **`ABRIMOS EL 16` en la placa de cierre** solo vale si se publica antes del 16. Publicado después,
   el rótulo pasa a ser el nombre de la casa a secas.

---

## 8. Resultado de la generación (2026-09-09)

Las ocho tomas están generadas y descargadas en
[`imagenes/generadas/reel_05_media_carta/`](../imagenes/generadas/reel_05_media_carta/).
Coste real: **18 créditos** (9 generaciones: 8 buenas + 1 descartada por corrección).

| # | Plano | `job_id` | Fichero |
|---|---|---|---|
| 1 | Solomillo al whisky (tenedor) | `04844e8d-fc0f-4ec7-843a-b9d89cd46ed8` | `05_01_solomillo.png` |
| 2 | Carne a la brasa cortada | `109dbc9a-24b5-426d-9712-954c3bf721ee` | `05_02_carne_brasa.png` |
| 3 | Pollo asado | `3f49fa74-3ab5-4677-ac4b-b77775b400bc` | `05_03_pollo.png` |
| 4 | Calamar a la plancha | `9e5a992e-877d-4a36-acd7-bb188e13928d` | `05_04_calamar.png` |
| 5 | Ensalada de queso de cabra | `edd7dbbf-f34f-4e4e-aa29-252f4858e330` | `05_05_ensalada_cabra.png` |
| 6 | Pulpo | `4fbfdf79-4afd-4a40-89a7-d29d9411c7f7` | `05_06_pulpo.png` |
| 7 | Tarta de pistacho | `f4b7aba3-545c-4f6c-99db-c58ad4a00617` | `05_07_tarta_pistacho.png` |
| 8 | Cierre, mesa sin plato | `e0a7f5fb-664b-42bc-8e1a-de3be78cb738` | `05_08_cierre_mesa.png` |

Todas encadenadas a la toma 1 como `image_references` (regla 19). La toma 1 se generó con
`mesa-ventana` + `mantel_blanco` + el fotograma de plantilla A + las dos fotos del solomillo.

### Verificación

| Punto | Resultado |
|---|---|
| Continuidad de escena (regla 19) | ✅ Mismo mantel, mismos pliegues de plancha, misma luz desde arriba a la derecha, mismo tercio derecho limpio en las ocho |
| Vajilla real por plato (regla 1) | ✅ Barro para solomillo, carne y pinchito; fuente ovalada blanca para el pollo; plato llano blanco para calamar y ensalada; tabla de madera para el pulpo; plato berenjena para la tarta |
| Sin sobras (regla 15) | ✅ Ninguna ración empezada. En la toma 1 el tenedor levanta una loncha **sin** dejar hueco en el plato |
| Acabado de iPhone (regla 17) | ✅ |
| Fuego/brasa/humo (regla 22) | ✅ ninguno — la carne a la brasa se muestra ya emplatada, nunca en la parrilla |
| Espacio para el rótulo | ✅ el tercio derecho queda limpio en las ocho, tal y como manda el fotograma de plantilla |

### La corrección que hizo falta

**Primera pasada de la toma 1: el tenedor no levantaba nada**, solo se apoyaba junto al medallón. Eso
rompe la regla 12 (acción ya empezada en el fotograma 1), que es justo el problema medido de los 16
Reels del trimestre. Se regeneró exigiendo la loncha **en el aire**: *"one entire medallion already
speared on the tines and lifted clear into the air, floating about six centimetres above the surface
of the sauce, casting its own small shadow, with one thread of glossy sauce still hanging"*, y
añadiendo a los negativos `no fork resting on the plate, no empty fork, no fork merely touching the
food`. A la segunda salió exacto.

**Lección transferible:** para conseguir acción real en una imagen fija no basta con decir "lifting".
Hay que **cuantificar la separación en centímetros**, pedir la **sombra propia** del objeto levantado
y prohibir por su nombre la versión estática.

### Deriva de encuadre a corregir en montaje

En las tomas 3 (pollo) y 5 (ensalada) el plato sale algo más centrado y más grande que en la 1. El
mantel, la luz y el ángulo son idénticos, así que **se normaliza en After Effects** con un keyframe de
escala y posición por plano — no merece regenerar. De hecho, con el push-in de cada plano hay que
tocar escala igualmente.

---

## 9. Corrección del cliente (2026-09-09, misma tarde)

Tres cosas rechazadas sobre el lote entregado:

1. **«Manchas en el mantel»** — las ocho tomas llevaban las mismas motas de comida sobre el mantel,
   heredadas de la toma 1 por el encadenado (regla 19).
2. **«Platos manchados»** — gotas y regueros de salsa en el borde de la porcelana.
3. **«Servilletas debajo de los platos»** — no se quieren.
4. **La tarta tenía que ir en el plato real** [`imagenes/postres/plato_tarta.jpg`](../imagenes/postres/plato_tarta.jpg),
   no en un plato berenjena inventado.

**La culpa era del prompt, no del modelo.** El campo `imperfections` pedía literalmente
`one small splash of sauce on the rim` y `a faint smear of juices on the plate rim`. Ver las reglas
nuevas **25** (las imperfecciones van en la comida y el material, nunca en suciedad) y **26** (nada
debajo del plato) de [`reglas_imagenes.md`](../imagenes/reglas_imagenes.md).

### Estado final de las ocho

| # | `job_id` final | Qué se corrigió |
|---|---|---|
| 1 | `04a5386c-fcd3-45a4-ac09-bd9176f6d44e` + parche | Mantel limpio (parche de píxel) |
| 2 | `1c39250e-2354-4fda-9383-2739b490a6d4` | Mantel limpio, borde del plato limpio |
| 3 | `e28b800d-249a-4304-b81d-75dda1978938` | Mantel limpio, patatas caídas fuera del plato eliminadas |
| 4 | `6282dd47-2bb0-47cd-857b-7c091e52e184` | Mantel limpio, borde del plato limpio |
| 5 | `e802b46d-2b2a-4543-ad91-de88c21db4dd` | Mantel limpio |
| 6 | `9adf26a9-2e8b-42be-ade9-ab19cbbdab21` | Mantel limpio *(la que señaló el cliente)* |
| 7 | `3424f4c7-4971-4789-9888-8d19d094803f` + parche | **Plato real de la tarta** + mantel limpio |
| 8 | `d39a22d2-5996-496b-bad4-8967668f0f5b` | Mantel limpio |

`plato_tarta.jpg` → `media_id` `2955b5b9-816d-46d9-b3b1-292114cb11f6`.

### Lo que no se pudo resolver por generación, y cómo se resolvió

**El mantel de las tomas 1 y 7.** Seis de las ocho salieron limpias reencadenando con el patrón de
«un solo cambio». En esas dos, **el modelo repuso las motas en tres intentos seguidos**, incluso
partiendo de una imagen que ya no las tenía. Se dejó de gastar créditos y se **clonó un parche limpio
del propio mantel** de cada imagen, con bordes difuminados y el tono igualado al del anillo que rodea
la zona. Resultado exacto, coste cero. Receta completa en la regla 27.

### ⚠️ Lo que sigue pendiente: el gesto del tenedor de la toma 1

La versión con la loncha **levantada en el aire** (`04844e8d`) es la buena para el hook de la regla 12,
pero es justo la que llevaba el mantel manchado. Cada intento de combinar «mantel limpio + loncha
levantada» devolvió el tenedor apoyado en el plato. La entregada tiene **el mantel impecable y el
tenedor apoyado**.

Dos formas de cerrarlo, ninguna por generación:

1. **After Effects, gratis y exacto.** Las dos versiones comparten encuadre, plato y luz: se enmascara
   la zona del tenedor y la loncha de `04844e8d` sobre el fondo limpio de la entregada. Dos minutos.
2. **Animar el plano, 10 créditos.** `minimax_hailuo` `minimax-2.3`, 6 s, 1080p (caso 3: manos y acción
   física). El movimiento real del tenedor levantando la loncha vende el hook mucho mejor que la foto
   fija, y este es el único plano del guion con movimiento propio de verdad.
