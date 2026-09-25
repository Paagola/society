# 04 · Compilador de prompts

Un prompt se **compila desde el contrato del plano**, no se escribe de cero. Si un dato del prompt no
está en el contrato, falta en el contrato. Este archivo da el dialecto de cada modelo y el léxico que
hace creíble la comida, la vajilla y las manos.

Base: la metodología `directoria-cloud` (JSON Decoded Brief + párrafo, y PRESERVE → MOTION → CAMERA →
FILM GRADE → NEGATIVE), las reglas del cliente y los prompts que funcionaron en el Reel 09. La gramática
de referencias de Seedance 2.5 (rol, exclusión, fidelidad, estados finales) se adapta de la skill
`OSideMedia/higgsfield-ai-prompt-skill` (licencia MIT), que resume la guía oficial de Dreamina.

## Índice

0. Principios comunes
1. Diseñar el keyframe para el vídeo
2. Imagen: Nano Banana Pro
3. Vídeo simple: Kling 3.0
4. Vídeo complejo: Seedance 2.5 (plano único y multitoma)
5. Metraje real: extensión y edición con Seedance 2.5 (L2, experimental)
6. Léxico de realismo para hostelería
7. Frases que no hacen nada y su sustituto
8. Comprobación final

---

## 0. Principios comunes

1. **Conversación en español, prompt en inglés.** Los modelos entienden mejor la terminología de
   cámara, óptica y luz en inglés.
2. **Escribe lo visible.** Grosor del chorro, cuántos centímetros se mueve la silla, qué dedo toca el
   pie de la copa. Un adjetivo («natural», «elegante») no tiene nada que renderizar.
3. **Los parámetros no van en el texto.** Resolución, duración y relación de aspecto se pasan en
   `params`; escribirlas en la prosa no hace nada.
4. **Repite lo validado.** El bloque de lugar, el de luz y los negativos del perfil van literales en
   cada prompt y en cada regeneración (regla 9quater).
5. **Una acción principal por plano, con estado final.** Si el plano necesita dos acciones
   incompatibles (física y actuación), son dos planos.

---

## 1. Diseñar el keyframe para el vídeo

El vídeo anima lo que el fotograma insinúa (medido el 08/09: el vapor no aparece sobre un plato frío).
El keyframe se pide **a mitad de acción**:

| Quieres en el vídeo | El keyframe muestra |
|---|---|
| Vino sirviéndose | El chorro ya cayendo, la copa a un tercio, con cresta donde entra el chorro |
| Retirar la silla | La mano ya agarrando el respaldo, la silla girada unos grados |
| Corte de la carne | El cuchillo a mitad de la pieza, el interior ya asomando |
| Plato que llega a la mesa | El plato a unos centímetros del mantel, sostenido por la mano |
| Copa que se acerca | Las yemas ya apoyadas en el pie |

Si el plano debe **aterrizar** en una toma fija (regla 16), genera también el keyframe final con «un
solo cambio» desde el inicial (quitar la mano, posar el plato) y pásalo como `end_image`.

---

## 2. Imagen: Nano Banana Pro

**Parámetros:** `model: nano_banana_pro`, `resolution: "2k"` (regla 12 de imagen: nunca 4K),
`aspect_ratio: "9:16"`, `medias[].role: "image"` en el orden de `@image1…`. El prompt es el JSON del
Decoded Brief stringificado. Anota el `modelo_devuelto`.

**Campos del JSON** (orden del Reel 09): `subject_identity`, `realism`, `environment`, `lighting`,
`camera` (`lens_mm`, `aperture_f`, `iso`, `shutter`, `lens_to_subject_m`, `subject_to_bg_m`, `cct_k`),
`composition`, `imperfections`, `palette`, `mood`, `film_stock`, `negatives`.

### 2.1 `subject_identity`: lugar + mapa de referencias

Abre con el bloque `lugar` del perfil. Después, **una frase por referencia**, con rol, grado de
fidelidad y exclusión:

```text
@image1 and @image2 are real photographs of the dining room and govern the chair and the table
completely: <descripción física del ancla>.
@image3 is a real photograph of the restaurant's wine glass and governs ONLY its exact shape; do not
take its background or lighting.
@image4 is a frame from another restaurant's video and governs ONLY the camera angle, the framing and
the direction of the light; nothing else from @image4 may appear.
```

- Varias fotos del mismo objeto: *«@image1 and @image2 show one and the same chair; the output contains
  exactly one chair.»*
- Nunca «@images 1 to 3 define the room»: una línea por referencia.
- Máximo 3-4 referencias.

### 2.2 El resto de campos

- **`environment`:** la acción a mitad de camino (§1) y lo que hay detrás. Nada debajo del plato
  (regla 26). Si un objeto no tiene ancla, no se nombra.
- **`lighting`, `film_stock`:** los del estilo elegido en el perfil, literales.
- **`camera`:** coherente con el ángulo del contrato. Planos de mesa: 50-65 mm, f/2-2.2; sala: 35 mm;
  detalle de lámpara o textura: 85 mm.
- **`composition`:** 9:16, ángulo del contrato con posición y altura, y **dónde queda limpio para el
  rótulo** (tercio superior o banda central).
- **`imperfections`:** solo textura y colocación (vetas, relieve del mantel desigual a la luz, pliegue
  de plancha). Nunca suciedad (regla 25).
- **`negatives`:** los obligatorios del perfil + los condicionales por `contiene` + las invenciones
  recurrentes que apliquen + los negativos ya validados de este plano.

### 2.3 Corregir con «un solo cambio» (regla 27)

Pasa la imagen ya generada como `@image1` y abre `environment` así:

```text
THE ONE CHANGE: <el único arreglo>. Everything else is unchanged from @image1.
```

En `subject_identity`, lista todo lo que debe seguir idéntico. Si el modelo repone el mismo defecto dos
veces, deja de gastar: parche de píxel sobre textura regular, o el plano sale.

---

## 3. Vídeo simple: Kling 3.0 — OBSOLETO (2026-09-25)

> **No se usa.** Todos los planos, simples o complejos, van por Seedance 2.5 a 720p + reescalado ByteDance pro (§4 y `../../directoria/references/hosteleria/03` §3.1). Se conserva como histórico.

**Cuándo:** planos de cámara sin interacción compleja: sala, lámpara, mesa puesta, producto quieto.

**Parámetros:** `model: kling3_0`, `mode: "pro"` (1080p), `duration: 3` (regla 2), `aspect_ratio:
"9:16"` explícito, `sound: "off"`, `medias: start_image` (el `job_id` del keyframe aprobado vale, regla
8), `end_image` si debe aterrizar. Si el servidor recomienda un preset, reenvía con
`declined_preset_id`.

**Esqueleto** (patrón del Reel 09, P3):

```text
<Una frase: lo que muestra el keyframe>. Animate the provided start image with restrained, cinematic
camera motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- <cada ancla del plano con su descripción física>, all in the same positions.
- <objetos en primer plano con su estado: mismo nivel de vino, mismos dedos>.
- The light direction, the deep shadows and the colour grade.

MOTION (BEATS):
- 0-1.5s: <micro-movimiento que ya existe en el frame, o «the room is still»>.
- 1.5-3s: nothing in the room moves; only the camera travels.

CAMERA:
- <fórmula de 05-vocabulario-camara.md>. Slow, constant speed, already moving on the first frame and
  still moving on the last. Perfectly mechanical and stabilised: no handheld operation, no shake, no
  jitter, no wobble, no floaty drift, no pan, no roll, no orbit, no zoom punch.

FILM GRADE:
- <video_grade del estilo del perfil>.

NEGATIVE: <obligatorios del perfil + condicionales + los propios del plano>.

Shot on a cinema camera with a <lente>mm lens, f/<apertura>, depth of field consistent with the still.
Photographic realism, no text.
```

**Límites conocidos:**

- **No le confíes un cambio de foco:** en P8 del Reel 09 devolvió un desplazamiento lateral. Si el foco
  es la idea del plano, llévalo a Seedance o cambia la idea.
- Gestos de manos continuos: dedos y joyería parpadean (regla 6). Con manos, Seedance.
- Su multi-shot solo acepta imagen inicial y final: las tomas intermedias salen inventadas. No lo uses.
- Entrega 1076×1928: se reescala en montaje.

---

## 4. Vídeo complejo: Seedance 2.5

**Cuándo:** manos, cubiertos, cortes, líquidos, interacción. Y **multitoma** cuando hay dos o más
planos complejos con keyframes aprobados: ahorra segundos (el Reel 09 hizo tres planos en 10 s a la
primera).

**Parámetros:** `model: seedance_2_5`, `mode: "omni_reference"`, `resolution: "1080p"`, `duration` según
los planos (4-30 s); **resolución de trabajo 720p** y reescalado ByteDance pro solo de la toma aprobada (regla vigente desde el 24/09; sustituye al 1080p nativo de abajo), `aspect_ratio: "9:16"`, `generate_audio: false` (el sonido va en montaje),
`medias: image_references` en el orden de `@image1…` (plano único: `start_image` y `end_image` también
están admitidos según `models_explore` del 17/09).

**Verifica 1080p cada vez.** El 17/09, `models_explore` listó 480/720/1080p. Una skill de la comunidad
con catálogo del 07/08 dice que solo 720p. Si hoy no aparece 1080p, **para y pregunta**. Si produces
desde las herramientas de OpenMontage, `seedance_video` solo expone 480p/720p aunque fal admite 1080p.

### 4.0 Dirección aprobada: el reel entero en una sola multitoma (Da Tonino v4, 25/09/2026)

**Es el patrón por defecto desde el 25/09/2026.** Víctor aprobó el reel de Da Tonino (job `023715c8`) a la
primera con esta dirección. Prompt íntegro: [`produccion/da-tonino/reel-v4/prompt-seedance-reel.txt`](../../../produccion/da-tonino/reel-v4/prompt-seedance-reel.txt).

**Qué decide la dirección (y por qué funcionó):**

1. **Una generación, todo el reel.** No se hace un clip por plano: una sola llamada a Seedance 2.5
   (`omni_reference`, 720p, 9:16, 12 s, `generate_audio: true`) con todas las imágenes aprobadas como
   `image_references` (@Image 1…9, hasta 9) en el orden de la lista de planos. Coste: 84 cr por 12 s.
   Salen una sola luz, un solo grano y un solo ritmo, sin costuras entre clips.
2. **Tomas rápidas.** Nueve tomas de 1,0–1,4 s con corte seco y una toma final de sala de 3 s. El prompt
   da el tramo exacto de cada una (`[Shot k, a-b s]`) y pide que el corte caiga en el punto más rápido del
   movimiento.
3. **Una toma = un verbo + un movimiento de cámara profesional con nombre, distinto del anterior.** Nunca
   «trípode con empuje de 3 cm» en todas. La secuencia aprobada:

   | # | Toma | Verbo | Cámara |
   |---|---|---|---|
   | 1 | Rúcula | cae y se posa | dolly-in rápido que frena en seco |
   | 2 | Cornicione | — (textura) | slider macro lateral, plano de foco finísimo |
   | 3 | Jamón | — (brillo) | rack focus de la hoja al jamón + empuje de 3 cm |
   | 4 | Porción | se levanta, el queso se estira y rompe | tilt de gimbal que sigue la porción |
   | 5 | Salteado | salto de sartén | whip de cámara en mano con peso, que se asienta |
   | 6 | Emplatado | pinzas colocan el nido | grúa de 45° a casi cenital |
   | 7 | Paella | vapor | slider bajo a ras del borde, vapor cruzando el objetivo |
   | 8 | Cerveza | la mano suelta la caña, la espuma asienta | arco de 10° en slider, parallax de bombillas |
   | 9 | Sala | — (espacio) | planeo tipo FPV / dron de interior entre mesas que sube a picado |

4. **Ritmo en tres actos por el menú:** pizza (textura → gesto) → pasta (fuego → plato) → paella y bebida
   → sala como respiro final y sitio para la cartela.
5. **Mundo de luz único** (luz de cena del perfil) en todos los platos; la sala, con su luz de día
   aprobada, va sola al final, así que el cambio de luz se lee como «salimos al comedor» y no como error.
6. **Bloques comunes del prompt:** PRESERVE TEXTURE (lista de texturas reales plato a plato), PRESERVE
   EXPOSURE AND COLOUR, SHARPNESS (un plano de foco por toma, estela solo en lo rápido), EDIT (corte en
   el punto más rápido, velocidad real, sin rampas ni zooms), manos de un solo cocinero, sonido
   diegético descrito por acción, sin música ni voz (la música va en montaje).

**Plantilla:**

```text
A <T>-second vertical restaurant film in <K> shots with hard cuts, shot by a professional food commercial
crew. Shot 1 is @Image 1. … Shot K is @Image K. Each image is the first frame of its shot and defines that
shot's food, hands, tableware, room and light exactly; do not mix elements between shots.
PRESERVE TEXTURE: <texturas reales, plato a plato>. Textures never soften, smear or become smoother over time.
PRESERVE EXPOSURE AND COLOUR: <luz del perfil>. Do not warm up, darken, flatten or add an orange cast.
SHARPNESS: one named focus plane per shot …; 180-degree shutter motion blur only on what moves fast.
[Shot 1, 0-1.2s] <lugar>. <verbo con tiempos y consecuencia física>. CAMERA: <movimiento con nombre y medida>; focus on <objeto>.
…
[Shot K, a-T s] <sala>. CAMERA: <planeo / grúa>. The room … stays exactly as in the reference; nothing new appears.
EDIT: every cut lands on the fastest part of the motion. Real-time speed, no speed ramps, no zoom effects, no transitions other than hard cuts.
Only the hands described in each shot, all from the same cook; no faces, no extra people. Pure video, no subtitles, no text, no logos.
Sound: realistic diegetic sound only, <un sonido por acción>, quiet room tone; no music, no voice.
Shot on a full-frame cinema camera, 35-100mm primes around f/2, photographic realism, fine natural grain.
```

**Cierre y sonido aprobados (reel v5, 25/09/2026).** Víctor pidió, y aprobó en la dirección, este final:

- **La canción de Seedance se queda; los efectos se quitan todos menos uno:** el golpe de la caña al apoyarse en la mesa, que hace de **corte final** antes de la sala. Seedance entrega canción y efectos mezclados. Se separan en montaje con Demucs (`htdemucs`): canción = `bass` + `other`, efectos = `drums` + `vocals`. En la toma de la cerveza se devuelven los efectos al +40 %. Ver `openmontage/references/04-texto-subtitulos-y-audio.md`.
- **Sala con otra luz, logo encima y apagado lento:**
  - la sala de día pasa a luz de cena en el etalonaje (brillo medio ≈ 38 y R/B ≈ 1,5, cerca de la toma de la cerveza, que está en 48 y 1,8);
  - el logotipo aparece sobre la sala a los 0,5 s;
  - la imagen funde a negro en 1,3 s;
  - el logo se queda 0,8 s sobre negro y la canción se apaga con él.
  Sustituye a la cartela negra aparte. Es la única transición de efecto permitida: la pide el cliente para el cierre.
- **Pedirlo ya en el prompt:** en próximos reels, la toma de sala se pide directamente con la luz de cena del perfil, sin sonido diegético salvo el golpe final.

**Límites:** el planeo FPV, el whip en mano y el arco solo valen sobre una imagen aprobada que ya enseña
ese espacio o ese gesto; si el perfil del cliente los prohíbe (Torre de Vega: nada de cámara en mano),
manda el perfil y se sustituyen por slider. Si el servidor sugiere un preset («IN THE DARK»), se
rechaza con `declined_preset_id`.

El patrón de §4.1 queda para reels de pocas tomas largas o clientes con cámara solo mecánica.

### 4.1 Multitoma (patrón validado, V1 del Reel 09)

```text
A <N>-shot sequence inside <lugar corto>, with hard cuts between shots. Shot 1 is @image1, shot 2 is
@image2, shot 3 is @image3. Each shot opens framed exactly like its reference image and animates it
with restrained, cinematic motion.

PRESERVE EXACTLY FROM EACH REFERENCE IMAGE:
- <anclas comunes con descripción física>: same shapes, same positions, unchanged.
- The hands: <quién aparece en qué plano, p. ej. the woman's hand in shots 1 and 3 and the man's hand
  in shot 2> keep the same fingers, the same skin, no rings or jewellery appearing, no change of shape
  in any frame.
- <objetos con estado a proteger: botella sin etiqueta visible>.
- The framing, the light direction and the colour grade of each reference.

MOTION (BEATS):
- 0-<t1>s, shot 1 (@image1): <acción ya empezada>, then <estado final>.
- <t1>-<t2>s, shot 2 (@image2): <acción>, then <estado final>; <lo que no se mueve>.
- <t2>-<t3>s, shot 3 (@image3): <acción>, then <estado final>.

CAMERA:
- Shot 1: <fórmula>, already moving on the first frame and still moving on the last.
- Shot 2: <fórmula distinta>.
- Shot 3: <fórmula distinta>.
- Perfectly mechanical and stabilised in every shot: no handheld operation, no shake, no jitter, no
  wobble, no floaty drift, no pan, no roll, no orbit, no zoom punch.

FILM GRADE:
- <video_grade del estilo>.

NEGATIVE: <obligatorios + condicionales + propios>.

Shot on a cinema camera with <lentes> lenses, f/<apertura>, shallow depth of field consistent with the
stills. Photographic realism, no text.
```

Reglas de la multitoma:

- Reparte los segundos según el uso en montaje, con margen: el Reel 09 usó 1,9-2,4 s de cada tramo de
  3,3 s.
- **Nombra a las personas por lo que se ve, no por el handle**: «the woman's hand», no «@image1's hand».
  Un handle usado como sujeto de la frase es la forma clásica de que una mano salga duplicada.
- Nunca pongas un handle en un plano donde ese objeto no está: el modelo lo mete a la fuerza.
- Si un plano sale mal, se repite la multitoma entera: presupuesta el reintento.

### 4.2 Plano único con estados

Para un plano complejo largo (corte de carne de 5-6 s), escribe por etapas con estado final:

```text
[Stage 1] Initial state: the knife is halfway through the steak, the pink interior already visible.
Primary event: one slow downward stroke completes the cut. End state: the slice lies on its side, the
knife rests still against the board.
```

Una etapa, un cambio de estado.

---

## 5. Metraje real: extensión y edición con Seedance 2.5 (L2, experimental)

Solo con «ok» del cliente, nunca sobre fuego, brasa o humo, y verificando modos y coste con
`models_explore` y `get_cost`. Plantillas adaptadas de la skill de OSideMedia (MIT):

**Extender hacia delante** (`mode: video_extension`, `extension_mode: forward`):

```text
@Video 1 is the source video to extend forward. The first frame of the extended segment directly
continues from the last frame of @Video 1. Maintain continuity in <postura de la mano>, <posición del
plato>, <fondo>, <posición de cámara y encuadre>, <luz> and <dirección del movimiento>.
Then, <una sola acción nueva>, and <estado final>.
Keep each object as the same continuous instance: do not duplicate or split it.
```

**Extender hacia atrás** (`extension_mode: backward`): describe lo que ocurre antes y cierra con que el
último fotograma **aterriza** en el primero del original, con postura, objetos, encuadre y luz. No
escribas «then connect to the source video»: deja que lo posterior se cuele antes.

**Editar** (`mode: video_edit`): un solo cambio con alcance acotado y la lista de lo que no se toca.
Según la misma fuente, cobra por la duración del vídeo original: recorta antes el tramo.

Registra el plano como parcialmente generado.

---

## 6. Léxico de realismo para hostelería

| Gesto | Escribe así | Evita |
|---|---|---|
| **Vertido de vino** | *a continuous ruby stream about one centimetre thick keeps pouring into the glass; the level rises gently with small ripples; a small crest where the stream meets the surface; then the bottle tilts up and the stream thins to a last drop* | «wine pours elegantly», salpicaduras, vino en el mantel |
| **Botella** | *plain dark glass with the label turned away from camera, only a highlight along it* | Etiquetas legibles (texto basura) |
| **Mano que coloca** | *in one short movement at the start, then the hand stays completely still; the same fingers, the same skin, no rings or jewellery appearing* | Reagarres, gesto continuo (regla 6) |
| **Silla** | *draws the chair back about ten centimetres in one smooth pull, then the chair settles on its legs* | «moves the chair» sin distancia |
| **Copa deslizada** | *the fingertips slide the glass one centimetre closer to the plate in a single short gesture and stay still; a faint shimmer moves across the wine surface* | Copa que gira o flota |
| **Corte de carne** | *the knife is already halfway through; one slow downward stroke; the slice separates and falls onto its side, revealing the pink interior; a bead of juice runs down the cut face* | «juicy», «perfectly cooked» |
| **Brillo de la grasa** | *the fat on the edge catches the key light and glistens as the camera moves* | Brillo que aparece sin movimiento de cámara |
| **Vapor** | Solo si el keyframe ya lo muestra: *thin steam rises slowly from the hot dish and drifts to the left* | Pedirlo sobre un plato frío (no sale) |
| **Luz de sala** | *the sconces glow steadily as small warm accents*; *the bulbs hold a constant glow* | «magical glow», bombillas que parpadean |
| **Sala vacía** | *nothing in the room moves; only the camera travels* | Gente que pasa (se inventa) |
| **Escala** | Dimensiones reales cuando importan: *a 28 cm white plate*, *a large wine glass about 22 cm tall* | Copas gigantes por falta de medida |

Fuego, brasa y humo no están en esta tabla porque no se generan (regla 22).

---

## 7. Frases que no hacen nada y su sustituto

| En lugar de | Escribe |
|---|---|
| cinematic, epic, stunning | La lente, la apertura, la dirección de la luz y el movimiento cuantificado |
| hyperrealistic, 8k, masterpiece | Imperfecciones de textura y la coda *Photographic realism, no text.* |
| natural movement | Qué se mueve, cuánto, en qué dirección y cuándo para |
| static camera | Un movimiento mecánico de 3-8 % (regla 5) |
| handheld feel / subtle camera shake | *a motorised slider with a geared head* (regla 11) |
| slow zoom | *a slow motorised push-in of about four percent*: un zoom no es un movimiento físico |
| make it look real | Nada: el realismo sale de las referencias, la luz y la física escritas |

---

## 8. Comprobación final

Antes de enviar, el linter debe pasar sin errores. Además, léelo tú:

- ¿Cada objeto nombrado tiene ancla?
- ¿El keyframe muestra ya la acción que pide el vídeo?
- ¿Hay una sola acción principal por plano, con estado final?
- ¿El movimiento de cámara es distinto al del plano anterior?
- ¿Quién lo lea en voz alta «ve» el plano sin mirar la imagen?
