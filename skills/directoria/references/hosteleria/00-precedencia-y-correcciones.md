# 00 · Precedencia y correcciones

Qué manda cuando dos fuentes de esta skill dicen cosas distintas, y la lista cerrada de correcciones a la base de conocimiento heredada (`references/knowledge/`, `templates/`, `examples/`, `assets/`).

## Índice

1. Orden de precedencia
2. Correcciones a la base heredada
3. Conflictos con fuentes públicas
4. Lo que sigue sin verificar

---

## 1. Orden de precedencia

De más a menos autoridad:

1. **Regla escrita del cliente** (ficha del restaurante, reglas numeradas del cliente, correcciones fechadas). Si es posterior o más concreta que esta skill, manda la del cliente. Ejemplo: Torre de Vega exige 1080p nativo aunque la regla general de Society sea 720p + ByteDance pro (R-RES-01, `03` §3.1); mientras el cliente no apruebe el cambio, manda su regla.
2. **Medición propia fechada** (`[MEDIDO]`): cargos, preflights y mediciones con ffmpeg/PIL sobre archivos descargados. Hoy: los hallazgos del 24/09/2026 de `01`–`03` de esta carpeta.
3. **Documentación oficial** (`[OFICIAL]`): la skill oficial `higgsfield-ai/skills` (commit `d071406`, 11/09/2026), las guías oficiales de ByteDance para Seedance 2.5 (31/07/2026), `about.instagram.com` y `creators.instagram.com`.
4. **Base heredada DirectorIA** (`references/knowledge/`): método probado en producción, revisión editorial 22/09/2026.
5. **Conocimiento de la comunidad** (`[COMUNIDAD]`): skills públicas de GitHub. Útiles para ampliar vocabulario, nunca para fijar un umbral o un precio sin probarlo.

Cuando se aplique una corrección de esta lista, dilo en la respuesta ("según `00-precedencia` §2.1, cambio el grade cálido por luz neutra").

## 2. Correcciones a la base heredada

La base DirectorIA nació para publicidad de belleza, moda y perfume (el caso Black Opium). En comida y locales de hostelería hay que corregir estos puntos:

### 2.1 Luz y grade por defecto

- **Base heredada:** códigos cálidos como look premium por defecto: `Kodak Portra 400, warm natural color grade with soft halation` (`knowledge/05` §3.1 y §5), golden hour y `cct_k 4800` en el ejemplo de `knowledge/00` §2, la pregunta "¿Portra cálido o limpio digital?" en `assets/onboarding.md`.
- **Corrección [MEDIDO 24/09/2026]:** para comida y salas de restaurante, **luz de día neutra de unos 5000 K**, mantel blanco roto (nunca naranja) y bokeh gris parduzco (nunca dorado). Seedance calentó y oscureció un keyframe que ya salía más frío y oscuro que la foto real (rojo/azul 1,39 → 1,57; luminancia mediana 105 → 63). → [`02-luz-y-color.md`](02-luz-y-color.md)
- **Cuándo sigue valiendo lo cálido:** si el brief o la ficha del cliente lo pide (cena a la luz de las velas, brasa de noche) y siempre como luz motivada con fuente visible, nunca como grade general.

### 2.2 Apertura en comida

- **Base heredada:** los ejemplos de retrato usan `f/1.4–f/2` para aislar al sujeto (`knowledge/05` §3.3).
- **Corrección [MEDIDO]:** en platos, **f/4** con objetivo de 85 mm. Con más profundidad de campo, la textura se resuelve en lugar de fundirse; el desenfoque esconde justo el defecto de textura que hay que evitar. f/1.8 solo para una miga, una gota o un detalle aislado y deliberado.

### 2.3 Resolución de imagen

- **Base heredada:** `nano_banana_pro` siempre con `resolution:"4k"` (`knowledge/00` §4, `knowledge/02`, `assets/onboarding.md` tabla D).
- **Corrección [MEDIDO]:** el estándar de producción medido es **2K, 9:16, a 2 créditos por imagen**. 4K solo para el plano héroe o para piezas de impresión. En borradores, primero exploración barata y después el ganador a 2K/4K.

### 2.4 Modelo de vídeo para movimiento complejo

- **Base heredada:** `seedance_2_0` para cámara móvil, física y multi-actor (`knowledge/03`, `knowledge/06`).
- **Corrección [OFICIAL, 11/09/2026]:** la skill oficial de Higgsfield fija **Seedance 2.5** (`seedance_2_5`) como modelo por defecto para vídeo serio: 4–30 s, hasta 1080p, modos `t2v` / `omni_reference` / `video_edit` / `video_extension`. Seedance 2.0 queda para cuando haga falta **4K nativo**. Precios medidos del 2.5 → skill `higgsfield`.
- **Corrección de parámetros:** en Seedance 2.5 las referencias van en `omni_reference` (incluidos los fotogramas inicial y final); `t2v` no admite medios. Los tokens se escriben `@Image 1`, `@Video 1`, `@Audio 1` y cada uno necesita un rol escrito.

### 2.5 Modelo de imagen por defecto

- **Base heredada:** `nano_banana_pro` para identidad y refs, `marketing_studio_image` para producto.
- **Actualización [OFICIAL]:** la skill oficial pone **GPT Image 2.5** como modelo por defecto de alta fidelidad, texto en imagen y diseño gráfico, y **Nano Banana 2 / Lite / Pro** para trabajo guiado por referencias. Para la comida del cliente sigue mandando Nano Banana Pro con fotos reales como ancla (probado en producción); GPT Image 2.5 queda **pendiente de comparar** con la misma ficha de texturas (`03-resolucion-y-reescalado.md`, pendientes).

### 2.6 Negativos para controlar el color

- **Base heredada:** bloques largos de `no X` (`no glow, no orange cast...`).
- **Corrección [COMUNIDAD, caso de campo documentado por el estudio de Higgsfield]:** las listas negativas no frenaron una deriva cálida heredada de las referencias. Funcionó **asignar el color en positivo, con presupuesto y condición de fallo**. Los negativos se mantienen para defectos concretos (subtítulos, música de fondo, manos), pero el color se controla con la cláusula de asignación de [`02-luz-y-color.md`](02-luz-y-color.md) §4.
- **Matiz [OFICIAL ByteDance]:** en Seedance 2.5 los negativos del tipo "pure video, no subtitles, no background music" sí son fiables.

### 2.7 Especificaciones numéricas de cámara

- **Base heredada:** mm, f/, ISO, obturación, distancias y CCT son obligatorios en el párrafo NL.
- **Matiz [COMUNIDAD, sin verificar]:** una guía pública afirma que Nano Banana ignora los valores numéricos de objetivo y apertura. No se ha medido. Se mantienen las cifras (no estorban), pero **siempre acompañadas del resultado visible en palabras**: "85mm, f/4 — the whole plate in focus, background softly separated".

### 2.8 Proporción y bandas negras

- **Base heredada:** avisa de que el vídeo no ajusta solo el `aspect_ratio` al keyframe (hay que pasar `9:16`).
- **Ampliación [MEDIDO]:** aunque se pida 9:16, una imagen de inicio cuadrada produce un vídeo 1080×1920 con 420 px negros arriba y abajo. La imagen de inicio tiene que **nacer** en 9:16. Además, Instagram reduce la visibilidad de los reels con bordes [OFICIAL]. → [`03-resolucion-y-reescalado.md`](03-resolucion-y-reescalado.md)

### 2.8 bis Catálogo en vivo del MCP [OFICIAL, `models_explore` consultado el 2026-09-24]

- `nano_banana_pro`: la resolución por defecto **ya es 2K** (no 1K, como dice la base heredada); el rol de medios que declara el esquema es `image_references`.
- **Lipsync dentro del MCP:** existe `sync_so` ("Sync Lipsync 3", roles `input_video` + `input_audio`, `sync_mode` bounce/loop/cut_off/silence/remap). La base heredada (`knowledge/03`, `knowledge/06` §6, `templates/talking-head-lipsync.md`) dice que el lipsync solo está en la web: **desactualizado**. El prep de dos pasos (clip con la línea literal entre comillas → sincronización) sigue siendo válido, pero el segundo paso ya puede ir por MCP.
- **Seedance 2.5 por defecto:** `mode:"t2v"`, 720p, 5 s y `generate_audio:true`. Sin `mode:"omni_reference"`, las referencias no se usan; sin `generate_audio:false`, se paga audio (los precios medidos del 24/09 eran sin audio).
- **Reescalado generativo de imagen:** `topaz_image_generative` (variantes Redefine / Recovery / Standard MAX, `creativity` 1–6, `texture` 1–5, `autoprompt`). No existe un equivalente con prompt para **vídeo**, pero sí para **imagen**. → hipótesis nueva en [`01-texturas-y-materiales.md`](01-texturas-y-materiales.md) §1.
- **Ampliar a 9:16 sin inventar el plato:** `flux_2_pro_outpaint` (expansión por lado en píxeles) y el modelo `outpaint`. Es la herramienta para pasar una foto real 1:1 a keyframe vertical (→ [`03-resolucion-y-reescalado.md`](03-resolucion-y-reescalado.md) §1).
- El resto del catálogo y sus valores por defecto → skill `higgsfield`.

### 2.9 Multitoma frente a "un solo beat"

- **Base heredada:** un clip de 4–6 s lleva un único beat principal (`knowledge/06` §1).
- **No es una contradicción:** sigue valiendo **por toma**. La multitoma de Seedance 2.5 (varias tomas en una generación, con el corte escondido en un gesto rápido) es un montaje dentro del clip: cada toma conserva su único beat. → [`07-recreacion-de-referencia.md`](07-recreacion-de-referencia.md)

<<<<<<< HEAD
### 2.10 Restraint frente a la energía de un reel de referencia (R-VEL-01, 25/09/2026) [MEDIDO]

- **Base heredada:** *"el cine es restraint"*: un beat, cámara fija o empuje del 3–4 %, hold (`knowledge/06`, `director/03` §5).
- **Corrección:** **cuando hay un reel de referencia, su energía de movimiento manda sobre el restraint.** El restraint es el valor por defecto **sin** referencia, no un techo.
- **Evidencia (Da Tonino, 25/09/2026):** una multitoma escrita con "locked-off, very slow push-in of 3-5 cm, hold, tiny settle" salió con un movimiento mediano entre fotogramas de 2,17 frente a 5,25 de la referencia (2,4× menos), p90 de 3,4 frente a 12,6 y un **1 % de fotogramas con movimiento rápido frente al 40 %**. La referencia cortaba cada ~0,6 s; la multitoma, cada 3 s. El cliente la rechazó: "los movimientos son muy lentos". 105 cr gastados en un clip técnicamente correcto pero con el ritmo equivocado.
- **Cómo se aplica:** → [`07-recreacion-de-referencia.md`](07-recreacion-de-referencia.md) §7.

### 2.11 Luz por defecto frente a estilo de estudio (R-LUZ-01, 25/09/2026)

- **Regla de `02` §2:** luz de día neutra y sombras con detalle, que la sala levanta.
- **Precisión:** si el brief o la referencia piden un **estilo de estudio de fotografía** (fondo oscurecido, solo el protagonista iluminado; patrón medido: mediana 25, 65 % de sombras, sujeto 2,5× el fondo), el fondo va a negro a propósito. Se mantiene la temperatura neutra.
- **Regla nueva:** una sola luminosidad por pieza o campaña; ninguna imagen ni vídeo con otra. → [`02-luz-y-color.md`](02-luz-y-color.md) §8
=======
### 2.10 Firma de rodaje real [MEDIDO 25/09/2026]

Comparación del reel de Da Tonino v3 con un reel de producto rodado (`pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/`). Tres reglas anteriores, aplicadas a todos los planos, producían el aspecto de catálogo que delata la IA. Se corrigen **para vídeo y planos de acción**; el detalle está en [`08-firma-de-rodaje-real.md`](08-firma-de-rodaje-real.md).

- **§2.2 f/4 en platos → matizado.** f/4 queda para el still de catálogo. En vídeo y acción, plano de foco fino con nombre (f/1.8–2.8 equivalente). Medido: 31 % del encuadre en foco en el v3 frente a 18 % en la referencia. La textura se resuelve en ese plano de foco con la ficha de `01`; el fallo del 24/09 era desenfocar el plato entero.
- **`02` §2 «la sala levanta las sombras» → matizado.** El balance de blancos sigue neutro; el contraste no se aplana. En cocina, proceso y fuego, luz *low-key* dura y motivada. Medido: negro p1 5,8 frente a 1,8; blanco p99 194 frente a 234.
- **Prefijo `director/04` §2 «Motorised slider moves only, no handheld» → sustituido.** Cámara en mano o gimbal con microtemblor en proceso; slider solo en el plano héroe. Medido: 5 planos quietos frente a 2. **Límite:** seguimiento con intención de pequeña amplitud, nunca temblor genérico ni recorrido sobre la comida; si la ficha del cliente prohíbe la cámara en mano (Torre de Vega), manda la ficha.
- **Nuevo:** física con peso y obturación de 180° (desenfoque de movimiento), un verbo de manos por plano, un solo mundo visual, corte seco sin transiciones de efecto y sonido obligatorio.
>>>>>>> 2c4e6fc8c2c88bf2843bc4ad582e9e8849f11b34

## 3. Conflictos con fuentes públicas

| Fuente pública | Qué dice | Decisión |
|---|---|---|
| pixelab `14-food-beverage` [COMUNIDAD, MIT] | Luz clave cálida de 2700–3200 K para que la comida resulte apetecible | **Rechazado para el look general.** Choca con la medición del 24/09. Se acepta la contraluz para vapor y brillo, con luz neutra |
| pixelab `14-food-beverage` | Seedance 2.0 como modelo principal de comida | **Desactualizado.** Seedance 2.5 [OFICIAL] |
| pixelab `hook-craft` | "Por debajo del 50 % de finalización el algoritmo te hace shadow-ban" | **No se usa como umbral.** No hay fuente; Instagram no lo documenta |
| smixs `nano-banana` | Nano Banana ignora mm, f/ e ISO | **Sin verificar.** Ver §2.7 |
| OSideMedia `negative-constraints` | Cinema Studio 3.0 no admite negativos | Aplica solo a Cinema Studio 3.0. En Seedance 2.5 los negativos de subtítulos y música funcionan [OFICIAL] |

## 4. Lo que sigue sin verificar

1. ~~ByteDance frente a Topaz~~ y ~~720p + reescalado frente a 1080p nativo (métrica)~~: **medidos el 24/09/2026 en una escena** (`03` §3–§4; `pruebas/ab-reescalado-720p-2026-09-24/`). 720p + ByteDance pro: 71 % del detalle del keyframe, frente al 31 % del 1080p nativo y el 37 % de Topaz. Queda abierta la **prueba a ciegas en móvil** y la repetición en 3 escenas más.
2. **Color:** en esa A/B, con PRESERVE + asignación positiva, el mantel no se calentó ni se oscureció (rojo/azul 1,04 → 1,02–1,06). Es una señal a favor, pero **sin brazo de control**: el punto 5 sigue abierto.
3. GPT Image 2.5 y Seedream 4.5 frente a Nano Banana Pro, con la misma ficha de texturas.
4. Si Nano Banana respeta los valores numéricos de cámara (§2.7).
5. Si la cláusula de asignación positiva de color (`02` §4) frena el calentamiento de Seedance en comida. Es la primera prueba A/B a hacer: el mismo keyframe con y sin la cláusula, midiendo rojo/azul y luminancia.
6. **Umbrales de firma de rodaje** (`08` §12): salen de una sola referencia. Repetir la medición con 3–5 reels de producto rodados.
7. **A/B de `08`:** profundidad de campo f/4 frente a f/2 con plano de foco nombrado; cámara fija frente a en mano; suavizado de 0,3–0,5 px + grano tras el reescalado. Cada una con el script y una prueba a ciegas con 5 personas.
