# Historias — semana del 9 al 15 de septiembre de 2026 (semana de cierre, reapertura el 16)

**Fecha:** 2026-09-09
**Formato:** Instagram Stories, 9:16, texto rotulado **dentro de la imagen**
**Modelo:** `gpt_image_2_5` (OpenAI, vía MCP Higgsfield) — `variant: flare`, `resolution: 2k`,
`quality: max`, `aspect_ratio: 9:16`
**Contexto de negocio:** el restaurante está **cerrado** y **reabre el miércoles 16 de septiembre**.
Las dos piezas cubren el hueco de la semana 0 del
[`plan_contenido_2026-09_a_12.md`](plan_contenido_2026-09_a_12.md) sin gastar la munición del Reel
de reapertura.

---

## 0. Decisiones tomadas y desviaciones de las reglas — leer antes de aprobar

| Punto | Qué se ha hecho | Por qué |
|---|---|---|
| **Texto dentro de la imagen** | El rótulo se **genera**, no se añade en diseño. | Desvía de la regla 9 de `reglas_imagenes.md` ("espacio negativo … nunca generado como texto dentro de la imagen") y de la coda `Photographic realism, no text.` de la plantilla. Lo pide el cliente explícitamente: es la capacidad diferencial de GPT Image 2.5. **Si el rótulo sale con una errata, la imagen se descarta y se regenera** — no se retoca a mano. |
| **Tipografía** | Se pide "Didone alta de contraste tipo Bodoni, regular, muy espaciada, blanco puro, sin contorno, filete de 2 px". | Es la traducción del estándar aprobado (`BodoniMT` Regular, tracking alto, sin `applyStroke`) al único lenguaje que entiende un modelo de imagen. **No es la fuente exacta**: si al cliente le importa el 1:1 tipográfico, la ruta correcta es imagen limpia + rótulo en CapCut/AE. |
| **Contraste texto/fondo** | El rótulo va sobre la **zona alta en sombra** del encuadre en las dos piezas, en blanco. | Regla de contraste del estándar tipográfico: blanco solo sobre plano oscuro o de tono medio. |
| **Vaso vacío** | En la historia 1 hay copas limpias sobre la mesa puesta. | La regla dura prohíbe "vaso vacío" **como resto de consumo**. Aquí son copas recién pulidas de una mesa montada antes de abrir, no una mesa usada. Los prompts lo dicen literalmente y lo refuerzan en negativos. **Si el cliente lo lee igualmente como "vaso vacío", se regenera sin copas.** |
| **Calidad** | `quality: max` (16,5 créditos/imagen) en vez de `high` (5,5) o `xhigh` (8). | Regla de calidad primero: el coste solo desempata entre opciones equivalentes, y el escalón de calidad es exactamente lo que sostiene el rótulo sin erratas. Total del lote: **33 créditos** sobre un saldo de 772,28. |
| **Fuego/brasa/humo** | Chimenea **apagada** en la historia 1, y excluida en negativos. | Regla 22: no se genera fuego, brasa ni humo. |
| **Plato de la historia 2** | Gambas al ajillo, sin abrir abanico de alternativas. | Es el carrusel de plato ya aprobado por el cliente (`imagenes/generadas/carrusel_gambas/`), así que es el plato de menor riesgo. Cambiarlo es una decisión del cliente. |
| **Campo 15 en el brief** | Se añade `typography` al JSON Decoded Brief de 14 campos. | La plantilla `directoria-cloud/templates/prompt-imagen.md` no contempla texto rotulado porque cierra en `no text`. El texto exacto necesita un campo propio; los 14 campos originales se mantienen todos. |

---

## 1. Referencias reales usadas (todas verificadas, regla 14)

| Token | Fichero real | `media_id` Higgsfield | Papel |
|---|---|---|---|
| `@image1` (H1) | [`imagenes/local/mesa-chimenea.jpg`](../imagenes/local/mesa-chimenea.jpg) | `8cd399e3-795b-45a3-8294-ea1dd25bfbda` | **Manda en todo el encuadre**: mantel, vajilla, sillas, ladrillo, chimenea de piedra, repisa, cuadro del caballo |
| `@image2` (H1) | [`imagenes/local/panoramica.png`](../imagenes/local/panoramica.png) | `fee9fb24-66a9-4cf0-850f-be5d7e9f52f7` | Comedor grande al fondo: filas de mesas, columnas, lámparas, suelo, trofeo de ciervo real |
| `@image3` (H1) | [`imagenes/local/mesa-chimenea2.jpg`](../imagenes/local/mesa-chimenea2.jpg) | `3e7dbc58-52eb-461a-8bc4-c1d9602f45ee` | Segundo ángulo del mismo rincón de chimenea (regla 6) |
| `@image1` (H2) | [`imagenes/comida/gambas.jpg`](../imagenes/comida/gambas.jpg) | `c2f00871-3c93-43cf-9c5d-5cb6a028c304` | Identidad del plato: cazuela de barro, gambas, aceite, guindilla, tomate, perejil |
| `@image2` (H2) | [`imagenes/comida/gambas2.jpg`](../imagenes/comida/gambas2.jpg) | `0e6a1e4d-834b-4364-9258-8816917892d2` | Segundo ángulo del mismo plato (regla 6) |
| `@image3` (H2) | [`imagenes/local/mantel_blanco.jpg`](../imagenes/local/mantel_blanco.jpg) | `4c3adfb4-7ca6-44e3-a684-a868f8d78df1` | Superficie real de mesa (el barril de `@image1/@image2` se sustituye por mantel para no arrastrar el rótulo "CILLAR DE SILOS DESDE 1994", que el modelo destrozaría) |

---

## 2. Historia 1 — «Volvemos el 16 de septiembre»

**Cuándo publicar:** miércoles 9 o jueves 10. Fijar como destacada hasta el 16.
**Función:** anuncio con fecha. Es el patrón que produjo el mejor post de los 90 días (barbacoa).
**Stickers encima al publicar:** cuenta atrás de Instagram al 16/09 a las 13:00, en el tercio inferior
(el encuadre lo deja limpio a propósito). Ningún sticker sobre el rótulo.

### 2a. JSON Decoded Brief — esto es lo que va en `params.prompt`, stringificado

```json
{
  "subject_identity": "The real dining room of Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria, Spain, seen from the table beside the stone fireplace. @image1 is the master reference and governs the whole frame: the cream textured tablecloth, the white plates, the dark carved wooden chairs, the red brick wall, the framed black-and-white horse photograph, the grey stone fireplace with its dark wooden mantel, the dried-flower vase and the real wine bottles standing on that mantel. @image2 (wide view of the big dining room) governs only what is seen deeper in the room: rows of laid tables, brick columns, wall lamps, terracotta floor tiles, white curtained windows, and the mounted deer trophy on the brick column, which is real decoration of this restaurant and must be reproduced only if that column falls inside the frame. @image3 is a second angle of the same fireplace corner; use it to complete geometry. Reproduce only what exists in these three photographs and invent nothing.",
  "realism": "a real photograph taken on a modern smartphone by the restaurant owner, single realistic exposure, not CGI, not illustration, not an HDR real-estate render",
  "environment": "the empty dining room before opening, every table laid and ready for service: cream textured tablecloths, clean white plates, polished cutlery, folded napkins, freshly polished clean stemless wine glasses and one unopened bottle of red Rioja standing on the nearest table. No diners, no staff, no food served, no used plates, no leftovers, no crumbs. Late afternoon, fireplace unlit and cold.",
  "lighting": "abundant soft daylight through the white-curtained windows on camera-left, with the warm tungsten of the ceiling lamps as a local accent only; whites reproduce as neutral white with no overall yellow cast and the brick keeps its true terracotta colour; the upper wall and ceiling fall naturally into shadow and stay clearly darker than the tables; natural contrast with real shadow areas, one single exposure, no HDR exposure fusion, no dramatic advertising light",
  "camera": {
    "lens_mm": "28",
    "aperture_f": "2.2",
    "iso": "320",
    "shutter": "1/80",
    "lens_to_subject_m": "1.4",
    "subject_to_bg_m": "6",
    "cct_k": "4300"
  },
  "composition": "vertical 9:16 story frame. The upper third is the dim upper brick wall and ceiling of the room in shadow, deliberately kept clean and dark as the area where the caption sits. The middle band holds the grey stone fireplace slightly right of centre and the laid foreground table entering from the bottom left, with the rows of laid tables of the big dining room receding to a vanishing point behind. The bottom fifth is plain empty tablecloth, kept clear. Nothing important in the top 250 pixels or the bottom 250 pixels of the frame.",
  "typography": "Render exactly and only this Spanish text, correctly spelled and accented, as a clean flat overlay inside the dark upper third: first line, small all-caps letter-spaced serif reading TORRE DE VEGA; below it a two-pixel hairline horizontal rule about one third of the frame wide, centred; below the rule a centred two-line headline in a high-contrast Didone serif of Bodoni style, regular weight, generous letter-spacing, all caps, reading VOLVEMOS EL on the first line and 16 DE SEPTIEMBRE on the second. Pure white type, no outline, no stroke, no coloured box, no gradient bar, at most a very soft diffuse shadow for legibility. The type must be perfectly legible against the dark wall behind it. No other text anywhere in the image.",
  "imperfections": "the natural wear of a fifty-year-old village restaurant: slight irregularity in the brick courses, faint scuffs on the terracotta floor tiles, small creases in the tablecloths, one chair not perfectly aligned, uneven patina on the wooden mantel, lived-in but spotless",
  "palette": "neutral white linen and plates, true terracotta brick and floor, dark walnut wood, grey stone, warm tungsten only inside the lamp shades, muted overall and not oversaturated",
  "mood": "quiet, warm and ready: a room that has been cleaned and laid and is waiting to open",
  "film_stock": "no film stock; modern smartphone capture, iPhone main-camera look, flat contrast, neutral white balance, deep depth of field, zero film grain, no cinematic colour grade",
  "negatives": "no people, no diners, no staff, no hands, no food on the plates, no used plates, no leftovers, no crumbs, no half-drunk or stained glasses, no fire, no flames, no embers, no smoke, no lit fireplace, no furniture or decoration that does not appear in @image1, @image2 or @image3, no HDR look, no oversaturated colour, no film grain, no cinematic teal-and-orange grade, no overall yellow filter, no extra text beyond the caption specified, no logo, no watermark, no camera date stamp, no misspelled or garbled lettering"
}
```

### 2b. Párrafo NL (revisión humana)

> A real photograph taken on a modern smartphone by the owner of Torre de Vega, a nearly 50-year-old
> village grill restaurant in El Mora, Cantabria — a single realistic exposure, not CGI, not an HDR
> real-estate render — of the empty dining room laid and waiting before opening. Use @image1 as the
> master reference for the whole frame: cream textured tablecloth, white plates, dark carved wooden
> chairs, red brick wall, the framed black-and-white horse photograph, the grey stone fireplace and
> its dark wooden mantel with the real bottles and dried-flower vase. Use @image2 only for what is
> seen deeper in the room — rows of laid tables, brick columns, wall lamps, terracotta floor,
> white-curtained windows, and the real mounted deer trophy on the brick column if that column falls
> in frame. Use @image3 to complete the geometry of the same corner. Every table is laid: polished
> cutlery, folded napkins, freshly polished clean glasses, one unopened bottle of red Rioja on the
> nearest table; no diners, no staff, no food served, no used plates, no leftovers; the fireplace is
> unlit and cold. The scene is lit by abundant soft daylight through the white-curtained windows on
> camera-left, with the ceiling lamps as a warm local accent only; whites stay neutral white, the
> brick keeps its true terracotta, and the upper wall and ceiling fall into real shadow and stay
> clearly darker than the tables — natural contrast, no exposure fusion, no advertising light. The
> palette is neutral linen, true terracotta, dark walnut and grey stone, muted and unsaturated, in a
> quiet, warm, ready mood. Composition: vertical 9:16, the dim upper wall and ceiling filling a clean
> dark upper third, the stone fireplace slightly right of centre in the middle band, the laid
> foreground table entering bottom-left, the rows of tables receding behind, and the bottom fifth left
> as plain empty tablecloth. In the dark upper third, render exactly this text and nothing else, in
> pure white with no outline: a small letter-spaced all-caps line reading TORRE DE VEGA, a two-pixel
> hairline rule beneath it, and a centred two-line Bodoni-style Didone headline in caps reading
> VOLVEMOS EL / 16 DE SEPTIEMBRE. The room shows the wear of fifty years: irregular brick courses,
> faint scuffs on the floor tiles, small creases in the linen, one chair out of line, uneven patina on
> the mantel. Shot on a smartphone main camera, 28mm, f/2.2, ISO 320, 1/80, lens-to-subject 1.4m,
> subject-to-background 6m, colour temperature 4300K, flat contrast, deep depth of field, zero film
> grain, natural colour. No people, no fire, no smoke, no invented furniture, no HDR, no yellow
> filter, no extra lettering. Photographic realism; the only text in the image is the caption
> specified above.

---

## 3. Historia 2 — «¿Qué es lo primero que vas a pedir?»

**Cuándo publicar:** viernes 11 o sábado 12, y repetir el domingo 13 enlazada al post de comunidad.
**Función:** comentarios y respuestas antes de la reapertura. Alimenta directamente el post del
domingo del plan de contenido.
**Stickers encima al publicar:** caja de preguntas de Instagram en el tercio inferior, sobre el
mantel limpio. Ningún sticker sobre el rótulo ni sobre la cazuela.

### 3a. JSON Decoded Brief — esto es lo que va en `params.prompt`, stringificado

```json
{
  "subject_identity": "A single serving of gambas al ajillo as it is actually served at Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria, Spain. @image1 and @image2 are two angles of the exact same real dish and together govern its identity: a brown glazed earthenware cazuela about 15 cm across, filled with peeled pink prawns bubbling in golden olive oil with sliced garlic, dried red guindilla peppers, halved cherry tomatoes and chopped parsley, set on a white dinner plate with a folded natural-fibre napkin between plate and cazuela. @image3 is the real table surface of the restaurant and governs the tablecloth: an off-white woven cotton cloth with a fine textured weave. Reproduce the dish exactly as photographed and invent nothing.",
  "realism": "a real photograph taken on a modern smartphone at the table, single realistic exposure, not CGI, not illustration, not a studio food-advertising shot",
  "environment": "the cazuela of gambas al ajillo on its white plate on the laid off-white textured tablecloth of the restaurant, freshly served and untouched, oil still bubbling at the rim; behind and above, the real red brick wall of the dining room falls out of focus. Nothing else on the table, no cutlery in the shot, no second dish.",
  "lighting": "soft ambient daylight from a window on camera-left grazing across the surface of the oil so the bubbles and the sheen of the prawns read clearly, with the warm ceiling lamps as a faint accent only; the brick wall above the dish sits in the shade and is clearly darker than the tablecloth and the plate; whites stay neutral white with no yellow cast, natural contrast with real shadow, one single exposure, no HDR fusion, no studio softbox, no hard specular advertising highlight",
  "camera": {
    "lens_mm": "45",
    "aperture_f": "2.4",
    "iso": "250",
    "shutter": "1/125",
    "lens_to_subject_m": "0.4",
    "subject_to_bg_m": "1.6",
    "cct_k": "4400"
  },
  "composition": "vertical 9:16 story frame, high three-quarter angle looking down at about 45 degrees at the cazuela. The upper third is the shaded out-of-focus brick wall, kept clean and dark as the area where the caption sits. The cazuela and its white plate sit just below centre, filling most of the middle band and slightly off-centre to the left on the thirds. The bottom quarter is plain off-white tablecloth, deliberately left empty and uncluttered. Nothing important in the top 250 pixels or the bottom 250 pixels of the frame.",
  "typography": "Render exactly and only this Spanish text, correctly spelled and accented, with both the opening inverted question mark and the closing one, as a clean flat overlay inside the shaded upper third: a centred two-line headline in a high-contrast Didone serif of Bodoni style, regular weight, generous letter-spacing, all caps, reading ¿QUÉ ES LO PRIMERO on the first line and QUE VAS A PEDIR? on the second; beneath it a two-pixel hairline horizontal rule about one third of the frame wide, centred; beneath the rule a small all-caps widely letter-spaced line reading ABRIMOS EL 16 DE SEPTIEMBRE. Pure white type, no outline, no stroke, no coloured box, no gradient bar, at most a very soft diffuse shadow for legibility. The type must be perfectly legible against the shaded brick behind it. No other text anywhere in the image.",
  "imperfections": "one small splash of oil on the white plate rim, a faint scorch mark on the earthenware, uneven bubbling across the surface of the oil, one prawn sitting slightly higher than the rest, a soft crease in the napkin, tiny irregularities in the weave of the tablecloth",
  "palette": "golden olive oil, pink-orange prawns, deep red guindilla, brown glazed earthenware, neutral off-white linen and porcelain, true terracotta brick behind, muted and not oversaturated",
  "mood": "appetising, homely and direct, the ordinary generosity of a village restaurant rather than a styled magazine shot",
  "film_stock": "no film stock; modern smartphone capture, iPhone main-camera look, flat contrast, neutral white balance, generous depth of field, zero film grain, no cinematic colour grade",
  "negatives": "no hands, no people, no cutlery, no half-eaten portion, no missing prawns, no used plate, no leftovers, no crumbs, no empty or stained glass, no fire, no flames, no embers, no smoke, no barrel table, no branded lettering or winery name on the table surface, no props or decoration absent from @image1, @image2 and @image3, no HDR look, no oversaturated colour, no glossy CGI sheen, no studio reflection, no film grain, no overall yellow filter, no extra text beyond the caption specified, no logo, no watermark, no misspelled or garbled lettering"
}
```

### 3b. Párrafo NL (revisión humana)

> A real photograph taken on a modern smartphone at the table — a single realistic exposure, not CGI,
> not a studio food-advertising shot — of one serving of gambas al ajillo exactly as it is served at
> Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria. Use @image1 and
> @image2, two angles of the very same real dish, for its identity: a brown glazed earthenware cazuela
> about 15 cm across, peeled pink prawns bubbling in golden olive oil with sliced garlic, dried red
> guindilla, halved cherry tomatoes and chopped parsley, on a white dinner plate with a folded
> natural-fibre napkin between plate and cazuela. Use @image3 for the table surface: the restaurant's
> off-white finely woven cotton tablecloth. The dish is freshly served and untouched, the oil still
> bubbling at the rim, nothing else on the table; behind and above it the real red brick wall of the
> dining room falls out of focus. The scene is lit by soft ambient daylight from a window on
> camera-left grazing the surface of the oil so the bubbles and the sheen of the prawns read clearly,
> the ceiling lamps a faint warm accent only; the brick above the dish sits in shade and stays clearly
> darker than the tablecloth, whites stay neutral, contrast is natural with real shadow — one
> exposure, no HDR, no softbox, no hard advertising highlight. The palette is golden oil, pink-orange
> prawn, deep red guindilla, brown earthenware, neutral off-white linen and true terracotta brick,
> muted, in an appetising, homely, direct mood. Composition: vertical 9:16, a high three-quarter angle
> at about 45 degrees, the shaded out-of-focus brick filling a clean dark upper third, the cazuela and
> its plate just below centre and slightly left on the thirds, and the bottom quarter left as plain
> empty tablecloth. In the shaded upper third, render exactly this text and nothing else, in pure
> white with no outline: a centred two-line Bodoni-style Didone headline in caps reading ¿QUÉ ES LO
> PRIMERO / QUE VAS A PEDIR?, a two-pixel hairline rule beneath it, and a small widely letter-spaced
> line reading ABRIMOS EL 16 DE SEPTIEMBRE. The plate shows one small splash of oil on its rim, a
> faint scorch mark on the earthenware, uneven bubbling across the oil, one prawn sitting higher than
> the rest, a soft crease in the napkin and tiny irregularities in the weave of the cloth. Shot on a
> smartphone main camera, 45mm, f/2.4, ISO 250, 1/125, lens-to-subject 0.4m, subject-to-background
> 1.6m, colour temperature 4400K, flat contrast, generous depth of field, zero film grain, natural
> colour. No hands, no cutlery, no half-eaten portion, no barrel table, no winery lettering, no fire,
> no smoke, no HDR, no yellow filter, no extra lettering. Photographic realism; the only text in the
> image is the caption specified above.

---

## 4. Llamada exacta (reproducible)

```jsonc
// generate_image — Historia 1
{
  "model": "gpt_image_2_5",
  "variant": "flare",
  "resolution": "2k",
  "quality": "max",
  "aspect_ratio": "9:16",
  "prompt": "<<JSON Decoded Brief de la sección 2a, stringificado>>",
  "medias": [
    { "role": "image_references", "value": "8cd399e3-795b-45a3-8294-ea1dd25bfbda" }, // @image1
    { "role": "image_references", "value": "fee9fb24-66a9-4cf0-850f-be5d7e9f52f7" }, // @image2
    { "role": "image_references", "value": "3e7dbc58-52eb-461a-8bc4-c1d9602f45ee" }  // @image3
  ]
}

// generate_image — Historia 2
{
  "model": "gpt_image_2_5",
  "variant": "flare",
  "resolution": "2k",
  "quality": "max",
  "aspect_ratio": "9:16",
  "prompt": "<<JSON Decoded Brief de la sección 3a, stringificado>>",
  "medias": [
    { "role": "image_references", "value": "c2f00871-3c93-43cf-9c5d-5cb6a028c304" }, // @image1
    { "role": "image_references", "value": "0e6a1e4d-834b-4364-9258-8816917892d2" }, // @image2
    { "role": "image_references", "value": "4c3adfb4-7ca6-44e3-a684-a868f8d78df1" }  // @image3
  ]
}
```

**Coste medido con `get_cost` (no consume créditos):** 5,5 créditos a `quality:"high"`, 8 a `xhigh`,
**16,5 a `max`** — siempre a `resolution:"2k"` y 9:16. Lote de 2 imágenes a `max`: **33 créditos**.
Saldo antes de generar: **772,28**.

**Límite operativo:** máximo 2 trabajos simultáneos en el plan Plus. Este lote son exactamente 2.

---

## 5. Verificación antes de dar por buena cada imagen

1. **El rótulo, letra por letra.** Acentos (`QUÉ`), signo de apertura (`¿`) y la fecha correcta
   (**16 de septiembre**). Una errata = descartar y regenerar, no retocar.
2. **Contraste**: rótulo blanco sobre zona realmente oscura. Si el tercio superior sale claro, la
   imagen no vale.
3. **Nada inventado** (regla 1): comparar mobiliario, mantelería y vajilla contra las fotos reales.
4. **Sin fuego, brasa ni humo** (regla 22).
5. **Sin sobras**: ninguna gamba de menos, ningún plato empezado, ninguna copa usada.
6. **Acabado de iPhone** (regla 17): si sale con grano, grade cinematográfico o luz de estudio, se
   regenera.
7. **Zonas seguras de Stories**: los 250 px de arriba y los 250 px de abajo quedan tapados por la
   interfaz de Instagram. El rótulo debe caer dentro de la franja central.

---

## 5bis. Resultado de la generación (2026-09-09)

Las dos salieron a la primera, sin reintentos. Coste real: **33 créditos**. Saldo restante: ~739.

| Pieza | `job_id` | Fichero | Tamaño |
|---|---|---|---|
| Historia 1 | `51cb1de9-9941-48b9-b42f-f5149484a088` | [`imagenes/generadas/historias_reapertura/historia_01_volvemos_el_16.png`](../imagenes/generadas/historias_reapertura/historia_01_volvemos_el_16.png) | 1520×2688 |
| Historia 2 | `d252c723-aa3a-4cdc-963f-165df1648787` | [`imagenes/generadas/historias_reapertura/historia_02_que_vas_a_pedir.png`](../imagenes/generadas/historias_reapertura/historia_02_que_vas_a_pedir.png) | 1520×2688 |

### Verificación contra la sección 5

| Punto | H1 | H2 |
|---|---|---|
| Rótulo letra por letra | ✅ `TORRE DE VEGA` / `VOLVEMOS EL 16 DE SEPTIEMBRE`, sin erratas | ✅ `¿QUÉ ES LO PRIMERO QUE VAS A PEDIR?` con `¿` y `É` correctos, y `ABRIMOS EL 16 DE SEPTIEMBRE` |
| Contraste texto/fondo | ✅ blanco sobre techo en sombra | ✅ blanco sobre ladrillo en sombra y desenfocado |
| Nada inventado | ✅ ladrillo, chimenea de piedra, repisa con botellas, cuadro del caballo, lámparas de forja, suelo de barro, sillas talladas, mantel crema, botella Glorioso, trofeo de ciervo (real, regla 9ter-bis) | ✅ cazuela de barro, gambas, guindilla, tomate, perejil, servilleta, plato blanco, mantel real |
| Sin fuego/brasa/humo | ✅ chimenea apagada | ✅ n/a |
| Sin sobras | ⚠️ copas limpias sobre mesa montada (ver sección 0) | ✅ ración íntegra, sin cubiertos ni manos |
| Acabado de iPhone | ✅ contraste plano, sin grano, blancos neutros | ✅ igual |
| Zonas seguras de Stories | ⚠️ ver abajo | ⚠️ ver abajo |

### Lo aprendido — dos cosas para la próxima

1. **`gpt_image_2_5` a `quality:"max"` clava el castellano acentuado y los signos de apertura.** Cero
   erratas en dos piezas a la primera, incluidas `¿`, `É` y una cifra. El rótulo generado es viable
   como flujo, no solo como experimento. Lo que sí hay que dictarle es la **jerarquía** (kicker,
   filete, titular) — la respeta al pie de la letra.
2. **El modelo oscurece la zona donde le pides que caiga el texto.** En la H1 el techo real del
   comedor es blanco y aquí sale en penumbra profunda: no es mobiliario inventado, pero **sí es una
   sala más oscura de lo que es**. Si el cliente quiere el techo real, hay que pedir explícitamente
   "keep the ceiling its real off-white colour" y buscar el contraste de otra forma.

### Ajuste pendiente antes de publicar

**El bloque de texto está demasiado arriba en las dos.** El primer renglón cae a unos 200–270 px del
borde superior sobre 2688 de alto; la zona que tapa la interfaz de Instagram (nombre de la cuenta, X,
menú) es de ~350 px a esta altura. Dos salidas:

- **Gratis:** al subir la historia, bajar la imagen unos 150 px con el dedo, o dejar que el rótulo
  quede algo justo — se lee igual, solo pierde aire.
- **16,5 créditos por pieza:** regenerar pidiendo `"nothing important in the top 420 pixels"` en
  `composition`, que es lo que realmente equivale al margen seguro a 2688 px de alto. El `250` que se
  usó en estos prompts está calculado sobre 1920, no sobre 2688 — **ese es el error a no repetir**.

---

## 6. Bloqueos

1. **Aprobación del cliente de las dos imágenes** antes de publicar. No hay animación en este lote,
   así que no aplica la regla 1 de `reglas_videos.md`, pero el rótulo generado es una desviación de la
   regla 9 de imagen y necesita visto bueno explícito (ver sección 0).
2. **Plato de la historia 2**: se ha fijado gambas al ajillo por ser el carrusel ya aprobado. Si el
   cliente quiere otro plato de la carta, es cambio de plato y se regenera esa imagen.
3. **Fidelidad tipográfica**: el rótulo es "estilo Bodoni", no `BodoniMT` real. Si el cliente exige la
   fuente exacta, la ruta es generar las imágenes limpias y rotular en CapCut.
4. **La pieza del 16 sigue dependiendo de metraje real de la brasa** (bloqueo heredado del plan de
   contenido). Estas dos historias no lo resuelven.
