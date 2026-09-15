# Reel 06 — «Para compartir» (mismo plano, cambia el plato)

**Fecha:** 2026-09-09
**Plantilla base:** [`plantillas/2026-09-08/02_mismo-plano-cambia-el-plato_7s.mp4`](../plantillas/2026-09-08/02_mismo-plano-cambia-el-plato_7s.mp4)
(copia de trabajo en `plantillas/2026-09-09/C_mismo-plano-cambia-el-plato_7s.mp4`; original:
restaurante **MALAY FELLAS**)
**Publicación prevista:** semana del 28 de septiembre — pieza fuerte «carta de otoño»
**Formato:** 9:16, ~7 s, cámara fija baja al borde de la mesa, una mano deja un plato y el plato cambia

---

## 0. La plantilla, y la nota que hay que leer antes

Medida el 2026-09-08: **hook 29 · overall 45 · viral 43 · sustain 100**.

En el ranking del 8 de septiembre esta plantilla quedó **descartada por contenido** — es un
restaurante asiático de *bowls*. **El cliente la ha pedido explícitamente**, así que entra: el filtro
de contenido de `CLAUDE.md` existe para ordenar un lote que propongo yo, no para vetar una elección
del cliente. Y no es una elección caprichosa: **la regla 19 de `reglas_imagenes.md` se escribió a
partir de esta plantilla exacta**, así que el formato ya estaba adoptado en el proyecto.

**El formato, en una frase:** un solo encuadre, una sola mesa, una sola luz, una sola mano — y lo
único que cambia es el plato. Es baratísimo (cero vídeo generado, todo imágenes fijas) y **solo
funciona si la escena es literalmente idéntica entre plano y plano**. Si la mesa, la luz o el ángulo
bailan, se rompe el efecto y queda un montaje cualquiera.

**Ritmo real de la plantilla, medido con `ffmpeg`:** la mano entra y deja el cuenco, y el plato cambia
cada **0,5–0,9 s**; unos ocho platos en 7 segundos, más el logo al final. La detección de escenas a
umbral 0,2 devuelve **cero cortes** porque el fondo no cambia nunca — hay que bajar a 0,03 para verlos.
Eso es exactamente lo que se busca: que los cortes no se noten como cortes.

---

## 1. Estructura en el tiempo

| t | Plano | Rótulo |
|---|---|---|
| 0,0 – 2,2 s | **Mano ya entrando** por la izquierda, posando la cazuela de gambas al ajillo en el borde de la mesa de pino. La acción está empezada en el fotograma 1 | `GAMBAS AL AJILLO` desde t=0 |
| 2,2 – 3,1 s | Mismo encuadre, otro plato, otra mano | `CROQUETAS CASERAS` |
| 3,1 – 4,0 s | ídem | `CHIRLAS` |
| 4,0 – 4,9 s | ídem | `JAMÓN IBÉRICO` |
| 4,9 – 5,8 s | ídem | `PATATAS BRAVAS` |
| 5,8 – 6,7 s | ídem | `PINCHITO DE TERNERA` |
| 6,7 – 9,0 s | La mano se retira y deja el pinchito en cuadro | `PARA COMPARTIR` · `TORRE DE VEGA` |

**Regla 12 cumplida:** la mano ya está en movimiento en el fotograma 1, rótulo desde el fotograma 1, y
el primer plano dura 2,2 s. La ráfaga empieza después del segundo 2.

**Regla 20 (efecto validado, «al cliente le gustan»):** el rótulo de cada plato **aparece al retirarse
la mano**, revelado por el movimiento, no con un fundido. En AE se hace duplicando el clip,
enmascarando la mano en la copia superior y metiendo la capa de texto entre las dos.

**Pregunta de control — ¿un vecino reenviaría esto?** Es la más floja de las tres en este punto: seis
platos bonitos no son una noticia. **Lo que lo salva es el precio.** Si el cliente aporta los precios
de las seis raciones, el rótulo pasa a `GAMBAS AL AJILLO · 14 €` y la pieza se convierte en algo que
sí se reenvía a un grupo («mira lo que valen las raciones»). **Sin precios, esta es una pieza de
alcance normal.** Ver bloqueo nº 2.

---

## 2. Los seis platos — raciones para compartir

Se reserva deliberadamente para **entrantes y raciones**, sin solapar con el
[Reel 05](reel_05_media_carta_cenital.md), que lleva los platos fuertes. Ningún plato se repite entre
los dos.

| # | Plato | Foto real | Recipiente real |
|---|---|---|---|
| 1 | Gambas al ajillo | `gambas.jpg` + `gambas2.jpg` | Cazuela de barro sobre plato blanco con servilleta |
| 2 | Croquetas caseras | `croquetas.jpg` | Pizarra blanca rectangular con hilo de aceite verde |
| 3 | Chirlas | `chirlas.jpg` | Plato blanco rectangular, salsa verde y limón |
| 4 | Jamón ibérico | `jamon2.jpg` | Plato redondo, lonchas en abanico radial |
| 5 | Patatas bravas | `patatas-bravas.jpg` | Plato blanco, alioli y pimentón |
| 6 | Pinchito de ternera | `pinchito-ternera.jpg` | Plato de barro con patatas y pimientos |

**Cada plato conserva su recipiente real.** La plantilla también cambia de recipiente (cuenco azul
oscuro, ramequines blancos, plato llano) — lo que se mantiene constante no es la vajilla, es **la
mesa, la luz, el ángulo y el punto exacto donde se posa el plato**.

---

## 3. Referencias reales (regla 14 — todas verificadas)

| Token | Fichero | Papel |
|---|---|---|
| `@image1` | [`imagenes/local/mesa-madera.jpg`](../imagenes/local/mesa-madera.jpg) | **La superficie**: mesa de pino claro real, con sus nudos, su junta de tablero y su veta |
| `@image2` | [`imagenes/local/mesas-restaurante2.jpg`](../imagenes/local/mesas-restaurante2.jpg) | El comedor al fondo: ladrillo, visillos blancos, lámpara de forja, sillas de madera, manteles crema |
| `@image3` | `plantillas/2026-09-09/frames_C/C_1.80s.jpg` | **Solo ángulo, altura de cámara, borde de mesa en diagonal y reparto de luz** (regla 10) |
| `@image4`(+`@image5`) | La foto (o dos, regla 6) del plato de cada toma | Identidad del plato y su vajilla real |
| `@image6` | **La toma 1 ya generada** | Escena, mesa, fondo, luz y posición de cámara (regla 19) |

**La mesa de pino de `mesa-madera.jpg` es el hallazgo del encaje.** La plantilla C apoya los cuencos
en el canto de un tablero de madera clara con la veta a la vista; Torre de Vega tiene **exactamente esa
mesa**, con nudos reales y la junta del tablero. No hay que inventar ninguna superficie.

**Lo que NO se copia de la plantilla:** el fondo de estantería con plantas colgantes y el fondo casi
negro. En su lugar va el comedor real de `@image2`, desenfocado. Y **prevalece la regla 17** sobre la
penumbra de la plantilla: luz natural de día, contraste plano, blancos neutros.

⚠️ **Tensión declarada entre reglas.** La plantilla C funciona con fondo oscuro y desenfocado
(regla 9: «todo lo que queda fuera del radio de la mesa se disuelve en bokeh»), pero la regla 17 pide
profundidad de campo amplia y fondo legible. **Se resuelve con la distancia, no con la apertura**:
f/5,6 y el comedor a 5 m, de modo que el fondo queda suave por distancia pero se lee como una sala de
verdad, no como un bokeh de estudio.

---

## 4. Prompt maestro — toma 1 (gambas al ajillo)

`nano_banana_pro`, `resolution:"2k"`, `aspect_ratio:"9:16"`.

```json
{
  "subject_identity": "A dish being set down on a table at Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria, Spain. @image1 is the master reference for the surface and governs it completely: a solid light pine table top with visible knots, a joint line between two boards and an open natural grain, warm honey coloured and lightly varnished. @image2 governs the room behind: red brick walls, white curtained windows, a wrought-iron ceiling lamp, dark wooden chairs and cream tablecloths on the tables further back. @image3 is the template frame and governs ONLY the camera: a low camera placed at the height of the table top, the near edge of the table running as a diagonal from the lower left to the right of the frame, the dish sitting on that edge just right of centre, and the direction and quality of the light. @image4 and @image5 are two angles of the same real dish and govern its identity: gambas al ajillo, a brown glazed earthenware cazuela about 15 cm across, filled with peeled pink prawns bubbling in golden olive oil with sliced garlic, dried red guindilla peppers, halved cherry tomatoes and chopped parsley, set on a white dinner plate with a folded natural-fibre napkin between plate and cazuela. Reproduce only what exists in these photographs and invent nothing.",
  "realism": "a real photograph taken on a modern smartphone from a chair at the next table, single realistic exposure, not CGI, not illustration, not a studio food-advertising shot",
  "environment": "the dining room during service. A woman's hand and forearm enter from the left edge of the frame, already in the middle of setting the white plate with its cazuela of gambas al ajillo down onto the near edge of the pine table — the plate is a couple of centimetres above the wood, not yet resting, her fingers still under its rim. The dish is complete and untouched, the oil still bubbling. Nothing else on the near edge of the table.",
  "lighting": "abundant soft daylight from the curtained windows behind and to the left, rimming the edge of the pine table and the rim of the plate, with the wrought-iron ceiling lamps as a faint warm accent only; the white plate and the napkin reproduce as neutral white with no yellow cast; the room behind is clearly darker than the table top but still readable, never black; natural contrast with real shadow, one single exposure, no HDR fusion, no studio softbox, no hard specular advertising highlight",
  "camera": {
    "lens_mm": "50",
    "aperture_f": "5.6",
    "iso": "400",
    "shutter": "1/125",
    "lens_to_subject_m": "0.6",
    "subject_to_bg_m": "5",
    "cct_k": "4400"
  },
  "composition": "vertical 9:16 frame, camera low and level with the table top so the eye is almost on the surface. The near edge of the pine table runs as a diagonal across the lower third of the frame, from the lower left corner up to the right edge. The plate and cazuela sit on that edge just right of centre, occupying the middle band of the frame. The upper half is the dining room behind, soft and out of focus. The hand and forearm enter from the left edge and are cropped at the elbow. The upper left area is kept relatively clean as the area where the caption sits in editing.",
  "imperfections": "the real knots and the joint line of the pine boards crossing the frame, a shallow scratch in the varnish, one small splash of oil on the white plate rim, a faint scorch mark on the earthenware, uneven bubbling across the oil, one prawn sitting higher than the rest, a soft crease in the napkin, short unpolished natural fingernails and fine skin texture on the hand",
  "palette": "warm honey pine, golden olive oil, pink-orange prawns, deep red guindilla, neutral white porcelain, true terracotta brick and muted cream linen behind, not oversaturated",
  "mood": "appetising and matter-of-fact, a plate arriving at a table in a busy village dining room",
  "film_stock": "no film stock; modern smartphone capture, iPhone main-camera look, flat contrast with lifted blacks, neutral white balance, generous depth of field with a readable background, zero film grain, no cinematic colour grade",
  "negatives": "no hanging plants, no shelf of potted plants, no black background, no dark moody restaurant, no half-eaten portion, no missing prawns, no used plate, no leftovers, no crumbs, no empty or stained glass, no fire, no flames, no embers, no smoke, no barrel table, no branded or engraved lettering on the table surface, no face, no arm above the elbow, no rings or bracelets or watches, no furniture or decoration absent from @image1 and @image2, no HDR look, no oversaturated colour, no creamy bokeh, no film grain, no cinematic teal-and-orange grade, no overall yellow filter, no text, no logo, no watermark"
}
```

> **NL (revisión humana).** A real photograph taken on a modern smartphone from a chair at the next
> table — a single realistic exposure, not CGI, not a studio food shot — of a dish being set down at
> Torre de Vega, a nearly 50-year-old village grill restaurant in El Mora, Cantabria. Use @image1 for
> the surface, which it governs completely: a solid light pine table top with visible knots, a joint
> line between two boards, open natural grain, warm honey coloured and lightly varnished. Use @image2
> for the room behind: red brick walls, white curtained windows, a wrought-iron ceiling lamp, dark
> wooden chairs and cream tablecloths further back. Use @image3 only for the camera: low and level
> with the table top, the near edge running as a diagonal from the lower left to the right of frame,
> the dish on that edge just right of centre, and the direction and quality of the light. Use @image4
> and @image5, two angles of the same real dish, for its identity: a brown glazed earthenware cazuela
> about 15 cm across of gambas al ajillo — peeled pink prawns bubbling in golden olive oil with sliced
> garlic, dried red guindilla, halved cherry tomatoes and chopped parsley — on a white dinner plate
> with a folded natural-fibre napkin between plate and cazuela. A woman's hand and forearm enter from
> the left, already mid-gesture, setting the plate down onto the near edge of the pine table, the
> plate a couple of centimetres above the wood and her fingers still under its rim; the dish is
> complete and untouched, the oil still bubbling, and nothing else is on the near edge. The scene is
> lit by abundant soft daylight from the curtained windows behind and to the left, rimming the table
> edge and the plate rim, the ceiling lamps a faint warm accent only; the plate and napkin stay
> neutral white with no yellow cast; the room behind is clearly darker than the table top but still
> readable, never black — natural contrast, one exposure, no HDR, no softbox, no hard advertising
> highlight. The palette is warm honey pine, golden oil, pink-orange prawn, deep red guindilla,
> neutral porcelain and true terracotta brick behind, not oversaturated, in an appetising,
> matter-of-fact mood. Composition: vertical 9:16, camera low and level with the surface, the near
> edge as a diagonal across the lower third, the plate just right of centre in the middle band, the
> soft dining room filling the upper half, the hand and forearm cropped at the elbow entering from the
> left, and the upper left kept clean for the caption. The frame shows the real knots and the board
> joint of the pine crossing it, a shallow scratch in the varnish, one splash of oil on the plate rim,
> a faint scorch mark on the earthenware, uneven bubbling in the oil, one prawn higher than the rest,
> a soft crease in the napkin, short unpolished nails and fine skin texture. Shot on a smartphone main
> camera, 50mm, f/5.6, ISO 400, 1/125, lens-to-subject 0.6m, subject-to-background 5m, colour
> temperature 4400K, flat contrast with lifted blacks, generous depth of field with a readable
> background, zero film grain, natural colour. No hanging plants, no black background, no half-eaten
> portion, no leftovers, no glass, no fire, no smoke, no barrel table, no engraved lettering, no face,
> no rings, no creamy bokeh, no HDR, no yellow filter. Photographic realism, no text.

---

## 5. Las cinco tomas restantes (regla 19 — encadenado)

Mismo JSON, cambiando solo `subject_identity` (refs del plato), `environment`, `imperfections` y
`palette`, y **pasando siempre la toma 1 ya generada** más las anteriores como referencia de escena.

| # | Plato | `environment` (sustituye) | Mano (regla 13) |
|---|---|---|---|
| 2 | Croquetas caseras | *"a man's hand entering from the left, setting down a long white rectangular slate plate holding five golden croquetas in a row on a drizzle of green herb oil, complete and untouched"* | **Hombre** |
| 3 | Chirlas | *"a woman's hand entering from the left, setting down a white rectangular plate of chirlas in their shells in a green parsley and garlic sauce with a wedge of lemon, complete and untouched"* | Mujer |
| 4 | Jamón ibérico | *"a woman's hand entering from the left, setting down a round white plate with hand-carved slices of ibérico ham laid out in a radial fan, complete and untouched"* | Mujer |
| 5 | Patatas bravas | *"a man's hand entering from the left, setting down a round white plate of fried potatoes topped with white alioli and a dusting of red paprika, complete and untouched"* | **Hombre** |
| 6 | Pinchito de ternera | *"a woman's hand entering from the left, setting down a brown glazed terracotta plate with a beef skewer of meat, green and red pepper and onion over thin fried potatoes, with two fried green padrón peppers, complete and untouched"* | Mujer |

**Regla 13 cumplida:** cuatro manos de mujer y dos de hombre — géneros distintos entre tomas y
predominio femenino en el conjunto de la pieza.

En las cinco: `"@image6 is the previously generated frame and governs the pine table, the background
room, the light and the exact camera position, which must not change at all"`, y en negativos
`"no change to the table, the background, the light or the camera position from @image6"`.

---

## 6. Coste

| Concepto | Cantidad | Créditos |
|---|---|---|
| `nano_banana_pro` 2k, 9:16 | 6 | **12,00** |
| Montaje, revelado de rótulos y push-ins en After Effects | — | 0 |

**Ningún plano se anima por defecto.** Un plato posándose sí tiene movimiento propio, pero el gesto
completo (mano entrando, posando, retirándose) es exactamente el caso que la regla 6 señala como el
que más falla en Kling — dedos que se derriten, anillos que parpadean. En este formato el gesto se
resuelve mejor **en el montaje**: se entra al plano con el plato ya casi posado y se sale antes de que
la mano complete la retirada.

Si el cliente quiere el gesto real animado, es `minimax_hailuo` `minimax-2.3`, 6 s, 1080p —
**10 créditos por plano** (caso 3 de la tabla de modelos: manos y acción física).

---

## 7. Bloqueos

1. **Aprobación del lote de 6 imágenes** antes de montar (regla 1).
2. ⚠️ **Los precios de las seis raciones.** Es lo que convierte la pieza de «platos bonitos» a algo
   reenviable (regla 12). Hacen falta seis cifras del cliente. Sin ellas, el Reel se monta igual solo
   con los nombres, pero pierde su mejor palanca.
3. **Los seis platos son elección propia**, reservando los entrantes para no solapar con el Reel 05.
   Cambiar cualquiera cuesta 2 créditos.
4. **Esta plantilla venía descartada por contenido** en el ranking del 08-09 (restaurante asiático).
   Entra porque la ha pedido el cliente — queda anotado para que una sesión futura no la reintroduzca
   sola en un ranking.

---

## 8. Resultado de la generación (2026-09-09)

Las seis tomas están generadas y descargadas en
[`imagenes/generadas/reel_06_para_compartir/`](../imagenes/generadas/reel_06_para_compartir/).
Coste real: **14 créditos** (7 generaciones: 6 buenas + 1 descartada por corrección).

| # | Plato | `job_id` | Fichero | Mano |
|---|---|---|---|---|
| 1 | Gambas al ajillo | `41254781-f27c-412e-b6cf-429bde04ef5f` | `06_01_gambas.png` | Mujer |
| 2 | Croquetas caseras | `302050aa-10c7-41f1-8ad6-44307719edab` | `06_02_croquetas.png` | Hombre |
| 3 | Chirlas | `3ab3eb3b-b63b-4d06-a6cc-879adaaf4615` | `06_03_chirlas.png` | Mujer |
| 4 | Jamón ibérico | `c4a23595-0dbb-45d5-8ade-862f397bfbf8` | `06_04_jamon.png` | Mujer |
| 5 | Patatas bravas | `f1891307-ce8a-422e-a323-1f9ed664cce2` | `06_05_bravas.png` | Hombre |
| 6 | Pinchito de ternera | `94d37407-42c7-4766-b705-d30de0e41ca6` | `06_06_pinchito.png` | Mujer |

Todas encadenadas a la toma 1 como `image_references` (regla 19).

### Verificación

| Punto | Resultado |
|---|---|
| Continuidad de escena (regla 19) | ✅ **El nudo de la madera y la junta del tablero salen en el mismo sitio en las seis.** Mismo comedor al fondo, misma lámpara de forja, misma luz de ventana, misma cámara |
| Nada inventado (regla 1) | ✅ mesa de pino, ladrillo, visillos, sillas y manteles son los reales de `mesa-madera.jpg` y `mesas-restaurante2.jpg` |
| Manos: géneros distintos, predominio femenino (regla 13) | ✅ 4 de mujer, 2 de hombre |
| Sin sobras (regla 15) | ✅ las seis raciones íntegras |
| Acabado de iPhone (regla 17) | ✅ luz natural de ventana, contraste plano, blancos neutros, fondo legible |
| Fondo | ✅ el comedor real, no las plantas colgantes de la plantilla |

### La corrección que hizo falta

**Primera pasada de la toma 1: cámara demasiado alta y plato demasiado pequeño.** El resultado era una
foto bonita del comedor con un plato lejano, no el plano de la plantilla. Se regeneró bajando
`lens_to_subject_m` de 0,6 a 0,35, diciendo *"the lens is placed at the very height of the table top,
almost level with the wood"*, cuantificando el tamaño (*"the plate spanning about fifty-five percent
of the frame width"*) y prohibiendo lo contrario en negativos: `no high camera angle, no looking down
onto the table, no broad expanse of table top filling the lower half, no small or distant dish`.

### Deriva de encuadre a corregir en montaje

En las tomas 5 (bravas) y 6 (pinchito) el plato sale algo más grande y más alto, y el fondo con una
escala ligeramente distinta. Se normaliza en After Effects con escala y posición por capa. Es
importante hacerlo: **en este formato la escena tiene que ser literalmente idéntica** o el efecto se
rompe (regla 19).

---

## 9. Corrección del cliente (2026-09-09, misma tarde)

Rechazada la **servilleta debajo de la cazuela** en la toma 1. Viene de la foto real
(`imagenes/comida/gambas.jpg`), que la lleva, así que el modelo la reproducía fielmente. Corregida con
el patrón de «un solo cambio» (regla 27), a la primera.

| # | `job_id` final |
|---|---|
| 1 | `6f519ed1-18ba-4012-882d-b4678dffc3d7` — sin servilleta, plato impecable |
| 2–6 | sin cambios |

Las otras cinco tomas no llevaban servilleta debajo ni manchas: el plato va directamente sobre la mesa
de pino en todas. Ver las reglas nuevas **25** y **26** de
[`reglas_imagenes.md`](../imagenes/reglas_imagenes.md).

---

## 10. Producción de vídeo (2026-09-09)

Estructura indicada por el cliente: **solo el primer plano y el último son vídeo**; los intermedios
son fijas congeladas en la mitad del gesto. Queda como regla 14 de
[`reglas_videos.md`](../imagenes/reglas_videos.md).

### Lo que hubo que cambiar en las imágenes

1. **El pinchito llevaba servilleta y bajoplato blanco.** Regenerado con el plato de barro desnudo
   sobre la mesa, que además es como se sirve de verdad (`pinchito-ternera.jpg`).
2. **Faltaba el keyframe de cierre**, que es el único de la serie con el plato ya apoyado. Se generó
   aparte reencadenando el fijo del pinchito con el patrón de «un solo cambio».

| Fichero | `job_id` | Qué es |
|---|---|---|
| `06_06_pinchito.png` | `1bf55604-e5a8-4ca2-b3d8-2941ab79239c` | Fija, plato en el aire (sin servilleta) |
| `06_07_cierre_pinchito_posado.png` | `bb148909-2dbb-42df-a217-86b75512d8be` | **Keyframe del vídeo de cierre**: plato apoyado, dedos en el borde |

### Los dos vídeos

`minimax_hailuo` `minimax-2.3`, `duration:6`, `resolution:"1080"` — caso 3 de la tabla de modelos
(manos y acción física). **Salida real: 1080×1934, 24 fps, 5,875 s, 10 créditos cada uno.**

| Fichero | `job_id` | `start_image` | Movimiento |
|---|---|---|---|
| `v01_gambas_posando.mp4` | `382b9229-80e5-43ad-b516-97777a16eb2a` | `6f519ed1` (gambas) | La mano baja el plato y lo posa en la mesa |
| `v02_pinchito_retirando_mano.mp4` | `633bc8b8-c3bb-4828-b4fb-e35b4305f0c7` | `bb148909` (cierre) | Los dedos se despegan y el brazo sale de cuadro; el plato se queda solo |

**Dos trampas que costaron dos lanzamientos fallidos (sin cargo):**

1. **El preset «IN THE DARK»** saltó en los dos, como avisa la regla 7. Se fuerza el prompt literal
   con `declined_preset_id: "24bae836-2c4a-48e0-89b6-49fcc0b21612"`.
2. **`minimax_hailuo` no admite `aspect_ratio`** y pasárselo tiró los trabajos con un payload
   `1024×1024`. Ver la regla 13 nueva de `reglas_videos.md`.

**Verificación de artefactos** (contact sheet de 6 fotogramas por clip, documentación §8): la comida
no se rehace entre fotogramas en ninguno de los dos, los dedos no se deforman y no aparece joyería.
En el `v01` el modelo llevó el gesto más lejos de lo pedido y la mano llega a retirarse — por eso el
clip se corta a 2,2 s, justo cuando el plato asienta.

### Montaje

**El cliente monta en CapCut** (skill `after-effects-reels` §13). No se ha montado la pieza final; se
entrega el material cortado, numerado y normalizado a **1080×1920, 24 fps** en
`imagenes/generadas/reel_06_para_compartir/montaje/`:

| Orden | Fichero | Dur | Rótulo |
|---|---|---|---|
| 1 | `01_video_gambas.mp4` | 2,2 s | `GAMBAS AL AJILLO` |
| 2 | `02_croquetas.mp4` | 0,9 s | `CROQUETAS CASERAS` |
| 3 | `03_chirlas.mp4` | 0,9 s | `CHIRLAS` |
| 4 | `04_jamon.mp4` | 0,9 s | `JAMÓN IBÉRICO` |
| 5 | `05_bravas.mp4` | 0,9 s | `PATATAS BRAVAS` |
| 6 | `06_video_pinchito.mp4` | 2,7 s | `PINCHITO DE TERNERA` → `PARA COMPARTIR` · `TORRE DE VEGA` |

Total **8,58 s**. Los clips completos sin cortar (`v01_*.mp4`, `v02_*.mp4`) siguen en la carpeta padre
por si conviene otro punto de corte.

`premontaje_sin_rotulos.mp4` es el pegado de los seis en orden, **sin texto**, solo para validar el
ritmo antes de rotular.

**Tipografía para CapCut:** Bodoni MT Regular, blanco puro, **sin contorno**, con sombra suave —
titular 70 px con tracking muy alto, marca 40 px con tracking aún mayor, filete de 2 px entre ambos.
El texto va en el **tercio superior izquierdo**, sobre el ladrillo del comedor, que es de tono medio
y aguanta el blanco. Nunca sobre la mesa de pino, que es clara.

---

## 11. Corrección del cliente y rehecho de los vídeos (2026-09-09, misma tarde)

Los dos vídeos con `minimax_hailuo` fueron **rechazados**: *"valiente mierda de vídeos han salido,
por favor no vuelvas a utilizar ese modelo"*. Y la estructura estaba mal entendida.

### Los dos fallos del material, verificados fotograma a fotograma

1. **La cámara se movía sola.** Push-in claro pese a pedir trípode bloqueado y prohibir el movimiento
   por su nombre siete veces. En un formato de plano fijo, eso rompe el corte a las tomas fijas.
2. **Las gambas se rehacían** entre fotogramas: cambiaban de número y de posición.

Queda como **regla 15** de [`reglas_videos.md`](../imagenes/reglas_videos.md): `minimax_hailuo`
prohibido en este proyecto. Y **corrige el caso 3** de la tabla de modelos de `documentación.md`.

### La estructura correcta, según el cliente

> «Primero apareciese el local vacío, al momento apareciese la mano con la comida y luego apareciesen
> todas las imágenes de platos. Al acabarse esto continuaría el otro vídeo, dejaría el plato y se
> iría la mano.»

Eso obliga a **dos keyframes nuevos** que no son ninguna toma del guion:

| Fichero | `job_id` | Para qué |
|---|---|---|
| `06_00_mesa_vacia.png` | `31da28b9-0093-4007-87c6-60d6959cc5e8` | Arranque del clip 1: mesa de pino vacía, sin plato ni mano |
| `06_08_plato_solo.png` | `7a04dfd3-bc94-4e6f-8276-df76aec4a63d` | Final del clip 2: el pinchito solo en la mesa |

### La técnica que lo resuelve: fijar también la imagen final

`seedance_2_0` admite `start_image` **y** `end_image`. Anclando los dos extremos, el clip no puede
derivar y **el último fotograma coincide al píxel con la toma fija que viene detrás**. Comprobado: el
final del clip 1 es la pose exacta de `06_01_gambas.png`, y el del clip 2 es `06_08_plato_solo.png`.
Regla 16 de `reglas_videos.md`.

### Los dos vídeos definitivos

`seedance_2_0`, `mode:"std"`, `resolution:"1080p"`, `duration:4`, `generate_audio:false` —
**36 créditos cada uno**. Salida real **1080×1920 exactos**, 24 fps, 4,04 s: no hace falta recortar.

| Fichero | `job_id` | `start_image` → `end_image` | Movimiento |
|---|---|---|---|
| `v01_llega_la_mano.mp4` | `1398a02e-02fc-421f-be15-544d50e9e707` | mesa vacía → gambas en el aire | Mesa vacía y quieta, la mano entra por la izquierda con el plato y lo sostiene sobre la mesa |
| `v02_deja_y_se_va.mp4` | `7d7b6fe5-48a8-4600-ae45-b6953489201f` | pinchito posado → plato solo | Los dedos se despegan, el brazo sale de cuadro y el plato se queda solo |

**Verificación:** cámara completamente estable en los dos (el fondo y el canto de la mesa no cambian
de escala ni de posición en ningún fotograma) y la comida no se rehace. Los dos fallos, resueltos.

### Montaje final — 9,33 s

`imagenes/generadas/reel_06_para_compartir/montaje/`, todo a 1080×1920 24 fps:

| Orden | Fichero | Dur | Rótulo |
|---|---|---|---|
| 1 | `01_video_llega_la_mano.mp4` | 2,83 s | `GAMBAS AL AJILLO` (entra cuando aparece el plato) |
| 2 | `02_croquetas.mp4` | 0,9 s | `CROQUETAS CASERAS` |
| 3 | `03_chirlas.mp4` | 0,9 s | `CHIRLAS` |
| 4 | `04_jamon.mp4` | 0,9 s | `JAMÓN IBÉRICO` |
| 5 | `05_bravas.mp4` | 0,9 s | `PATATAS BRAVAS` |
| 6 | `06_video_deja_y_se_va.mp4` | 2,83 s | `PINCHITO DE TERNERA` → `PARA COMPARTIR` · `TORRE DE VEGA` |

El clip 1 va recortado desde el segundo 1,2 del original para que la mesa vacía dure ~0,7 s y la mano
entre enseguida — la estructura que pide el cliente sin incumplir la regla 12 (que el arranque no
parezca una foto fija). Los originales completos siguen en la carpeta padre por si conviene otro
punto de corte.

`premontaje_sin_rotulos.mp4` es el pegado de los seis, sin texto, para validar el ritmo.

---

## 12. Montaje final en After Effects (2026-09-10)

Montado por MCP a petición del cliente («móntalo»). Proyecto guardado en
[`Reel06_Para_Compartir.aep`](../imagenes/generadas/reel_06_para_compartir/Reel06_Para_Compartir.aep).

**Entregable:** [`REEL_06_para_compartir.mp4`](../imagenes/generadas/reel_06_para_compartir/REEL_06_para_compartir.mp4)
— 1080×1920, 24 fps, **9,33 s**, H.264 a 14,2 Mbps, 16,6 MB.

### Composición

15 capas: 6 de metraje + 6 rótulos de plato + placa de cierre (titular, filete, marca).

| t (s) | Capa | Rótulo |
|---|---|---|
| 0 – 2,833 | `S1_gambas_video` | `GAMBAS AL AJILLO` (entra en 0,7, cuando aparece el plato) |
| 2,833 – 3,75 | `S2_croquetas` | `CROQUETAS CASERAS` |
| 3,75 – 4,667 | `S3_chirlas` | `CHIRLAS` |
| 4,667 – 5,583 | `S4_jamon` | `JAMÓN IBÉRICO` |
| 5,583 – 6,5 | `S5_bravas` | `PATATAS BRAVAS` |
| 6,5 – 9,333 | `S6_pinchito_video` | `PINCHITO DE TERNERA` (6,5–7,9) → placa de cierre (7,9–9,333) |

Animación: fundido de entrada 0,18 s y de salida 0,12 s en los rótulos rápidos; en los dos largos,
0,45 s más una subida de 14 px. Placa de cierre escalonada: titular a 7,9, filete dibujándose desde el
centro a 8,0 y marca a 8,02.

### Tipografía — dos desviaciones del estándar, con su motivo

| Elemento | Aprobado | Usado | Por qué |
|---|---|---|---|
| Rótulo de plato | `BodoniMT` 70 px, tracking 400 | `BodoniMT` **48 px, tracking 340** | Medido: `PINCHITO DE TERNERA` a 70/400 ocupa **1090 px de ancho en un cuadro de 1080**. A 48/340 mide 868 px y entra con 106 px de margen |
| Placa de cierre | 62 px tracking 540 / 40 px tracking 640 | **46/460** y **40/640** | `PARA COMPARTIR` a 62/540 no cabía. A 46/460 mide 681 px |

Lo que **no** cambia y es lo que define el estándar: Bodoni MT **Regular**, blanco puro,
`applyStroke:false`, sombra `ADBE Drop Shadow` Distance 0 / Softness 70 / Opacity 200, y tracking muy
alto. El registro editorial se mantiene.

### ⚠️ El error de contraste que se cometió y cómo se detectó

Los rótulos se colocaron primero en **y=650**, elegida midiendo la **luminancia media** por franjas:
esa daba 96-100 sobre 255, aparentemente ideal para texto blanco.

**La media mentía.** Al renderizar los fotogramas se vio que esa franja contiene a la vez ladrillo
oscuro **y los visillos blancos de las ventanas**, y el texto desaparecía justo sobre ellos.

**La medida correcta no es la media, es el porcentaje de píxeles claros:**

| Franja (y) | % píxeles > 170 en el peor plano |
|---|---|
| 450-690 (donde estaba) | **29-36 %** ← los visillos |
| **210-390** (donde está) | **0 %** en los ocho planos |

Se subieron todos los rótulos a **y=330** (placa de cierre en 270 / 315 / 370), sobre el ladrillo que
hay encima de las ventanas. Verificado renderizando cinco fotogramas repartidos por toda la pieza.

**Para la próxima:** medir la **fracción de píxeles claros bajo el ancho exacto del texto**, nunca la
luminancia media — una franja mitad oscura y mitad blanca da una media perfecta y es la peor opción
posible.

### Trampas de la API encontradas

- Dentro de `batch.run`, `comp.info` usa el parámetro **`comp`**, no `nameOrId` (que sí usa la
  herramienta suelta `ae_comp_info`). Es la misma dualidad que ya documenta la skill para
  `render.frame` / `ae_render_frame`.
- Se repitió la condición de carrera conocida al convertir los PNG recién renderizados: `chunk too
  big` / `Invalid PNG signature`. **Se resuelve reintentando la conversión**, no volviendo a
  renderizar.
