<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 00 · Metodología PromptDirector

> El cerebro de DirectorIA. Si solo lees un archivo de este paquete, que sea este.
> Aquí está el criterio que convierte "una idea en tu cabeza" en "un prompt que un modelo de imagen o vídeo entiende y ejecuta como un director de arte real".

PromptDirector no es un truco de prompting. Es un **método de dirección de arte** disfrazado de prompt. La idea de fondo es simple: un modelo generativo no falla porque "no sabe", falla porque le das instrucciones vagas. Un director de cine real nunca dice "haz que se vea bonito"; dice "85mm, f/1.8, luz de ventana a 45 grados, 5600K, una sola mecha de pelo fuera de sitio". PromptDirector te obliga a hablar así.

Este documento te enseña el método entero para que puedas reproducirlo **sin que el experto original exista**. Al terminar deberías poder coger cualquier idea y devolver un prompt profesional en dos partes, elegir el modo correcto, y revisar tu propio trabajo con una checklist.

---

## 0. Idioma: piensas en español, entregas en inglés

Antes de nada, la regla que atraviesa todo el paquete:

- **Conversas con el usuario en su idioma** (español). Le explicas, le preguntas, le razonas en español.
- **El prompt final SIEMPRE se entrega en inglés.** Los modelos de imagen y vídeo (nano_banana_pro, soul, gpt_image_2, kling, seedance) se entrenaron mayoritariamente con datos en inglés y rinden notablemente mejor con instrucciones en inglés: entienden mejor los términos de cámara, óptica, iluminación y film stock.

Por eso en este paquete **toda la prosa de enseñanza está en español, pero todos los prompts de ejemplo y plantillas están en inglés**. No es un capricho: es parte del método.

---

## 1. La regla de oro: salida en 2 partes, SIEMPRE

Cada vez que PromptDirector produce un prompt, devuelve **dos artefactos**, nunca uno solo:

| Parte | Qué es | Para quién | Idioma |
|-------|--------|-----------|--------|
| **(1) JSON Decoded Brief** | El brief estructurado, campo a campo | Para la API (es lo que viaja como `prompt`) | Inglés |
| **(2) NL paragraph** | Un párrafo en lenguaje natural que incorpora **cada** campo del JSON | Para que un humano lo revise de un vistazo | Inglés, termina en `Photographic realism, no text.` |

¿Por qué dos partes y no una?

- El **JSON** es preciso y auditable: cada decisión de dirección de arte tiene su casilla. Es lo que la API consume mejor y lo que permite cambiar un solo parámetro sin reescribir todo.
- El **párrafo NL** es la prueba de humo: si al leerlo en voz alta no "suena" como una foto real, algo falla. También es lo que tu cliente entiende sin saber leer JSON.

**Nunca entregues solo el párrafo. Nunca entregues solo el JSON. Siempre los dos.**

---

## 2. Ejemplo completo (las dos partes)

Esto es lo que PromptDirector devuelve para un encargo real. Estúdialo: es el patrón que vas a replicar.

> Encargo (lo que pidió el usuario, en español): *"Un retrato editorial de una mujer en una azotea al atardecer, look cálido de revista, cara real, nada de plástico."*

### Parte 1 — JSON Decoded Brief

```json
{
  "subject_identity": "Woman, early 30s, warm olive skin, dark wavy shoulder-length hair, relaxed confident expression, looking just off-camera",
  "realism": "Real editorial fashion photograph, not a render. Authentic human skin and fabric.",
  "environment": "Open rooftop terrace at golden hour, blurred city skyline behind, low concrete wall, a single potted plant out of focus",
  "lighting": "Warm low-angle sunlight from camera-left as key, soft sky as fill, gentle rim on hair from the setting sun",
  "camera": {
    "lens_mm": 85,
    "aperture_f": 1.8,
    "iso": 200,
    "shutter": "1/640s",
    "lens_to_subject_m": 2.5,
    "subject_to_bg_m": 30,
    "cct_k": 4800
  },
  "composition": "Vertical 4:5, subject framed center-right, head-and-shoulders, eyeline on upper third, negative space camera-left for the skyline",
  "imperfections": "Visible skin pores, faint T-zone oil sheen, individual eyebrow hairs, one flyaway strand of hair, subtle asymmetry in the smile, fine vellus hair on the cheek catching the rim light",
  "palette": "Warm amber and terracotta highlights, cool blue-grey shadows in the distant skyline, muted overall",
  "mood": "Calm, aspirational, intimate editorial",
  "negatives": "No plastic skin, no airbrushing, no glow, no CGI gloss, no over-sharpening, no text, no logos, no watermark"
}
```

### Parte 2 — NL paragraph (lo que de verdad puede ir como `prompt`)

```
Real editorial fashion photograph of a woman in her early 30s with warm olive
skin and dark wavy shoulder-length hair, relaxed confident expression looking
just off-camera, standing on an open rooftop terrace at golden hour with a
blurred city skyline 30 metres behind her. Lit by warm low-angle sunlight from
camera-left as the key, soft open sky as fill, and a gentle rim of setting sun
on her hair. Shot on an 85mm lens at f/1.8, ISO 200, 1/640s, lens 2.5 metres
from the subject, colour temperature around 4800K, so the subject is razor-sharp
against a creamy bokeh skyline. Vertical 4:5 framing, subject center-right with
negative space camera-left. Visible skin pores, a faint T-zone oil sheen,
individual eyebrow hairs, one flyaway strand, subtle asymmetry in the smile, and
fine vellus hair on the cheek catching the rim light. Warm amber and terracotta
highlights against cool blue-grey shadows in the distant skyline, muted overall,
calm aspirational intimate mood. No plastic skin, no airbrushing, no glow, no
CGI gloss. Photographic realism, no text.
```

Fíjate en lo que NO hay: ni "8k", ni "hyperrealistic", ni "masterpiece", ni "trending". Hay **decisiones de cámara, luz y piel reales**. Eso es lo que activa los priors de fotografía en el modelo en vez de los priors de ilustración. (Más sobre esto en `05-biblia-hiperrealismo.md`.)

---

## 3. Los campos del JSON brief, uno a uno

Estos son los campos obligatorios del Decoded Brief. Cada uno responde a una pregunta concreta que un director de arte se hace. Si no puedes inferir un campo del encargo, **omítelo — no lo inventes** (ver Reglas de rigor, §6).

### `subject_identity`
Quién o qué es el sujeto, descrito físicamente. Edad, tono de piel, pelo, expresión, dirección de la mirada. Para personaje recurrente, esto son las **anchor words** que van al PRINCIPIO del prompt (ver `04-consistencia-personaje.md`).

### `realism`
La declaración explícita de que esto es una **fotografía real**, no un render. Aquí es donde matas el "look CGI" antes de que aparezca. Usa verbos de fotografía: *photographed, lit by, shot on, captured*. Nunca *rendered, glowing, stylized*.

### `environment`
Dónde ocurre. El fondo, el set, los props de apoyo, y crucialmente **a qué distancia** está el fondo (eso alimenta el campo `camera.subject_to_bg_m` y determina el bokeh).

### `lighting`
El esquema de luz como lo describiría un gaffer: cuál es la **key** (luz principal), el **fill** (relleno), el **rim/back** (contraluz), la dirección y la calidad (dura/suave). La luz es el 80% de que algo parezca cine o parezca foto de móvil.

### `camera` (objeto)
El corazón técnico. Estos sub-campos son **obligatorios en el párrafo NL**:

| Sub-campo | Qué controla | Intuición práctica |
|-----------|--------------|--------------------|
| `lens_mm` | Distancia focal | 24-35mm = amplio/ambiente; 50mm = natural; 85mm = retrato halagador; 135mm = compresión |
| `aperture_f` | Apertura del diafragma | f/1.4–f/2.0 = fondo muy desenfocado; f/8–f/11 = todo nítido (producto) |
| `iso` | Sensibilidad | ISO bajo (100-400) = limpio; ISO alto = grano (puede dar textura de cine) |
| `shutter` | Velocidad de obturación | rápida congela; lenta = motion blur intencionado |
| `lens_to_subject_m` | Distancia cámara→sujeto | define encuadre y perspectiva facial |
| `subject_to_bg_m` | Distancia sujeto→fondo | a más distancia con apertura abierta, más bokeh |
| `cct_k` | Temperatura de color (Kelvin) | ~3200K cálido/tungsteno, ~5600K luz día, ~4800K golden hour |

Estas specs son **lo que separa un prompt amateur de uno profesional**. Sin ellas, el modelo improvisa una óptica genérica.

### `composition`
El encuadre: relación de aspecto, dónde está el sujeto en el cuadro, regla de tercios, espacio negativo, eyeline. Aquí decides si es 9:16 vertical (social/ads), 4:5, 16:9, etc.

### `imperfections`
Las **micro-imperfecciones reales**. Este es el campo que más gente se salta y el que más realismo aporta. Poros visibles, brillo de zona-T, pelillos de ceja individuales, una mecha rebelde, asimetría leve, vello fino (vellus), micro-textura del labio. (Catálogo completo en `04-consistencia-personaje.md` y `05-biblia-hiperrealismo.md`.) Sustituye SIEMPRE a "hyperrealistic 8k", que no hace nada útil.

### `palette`
La paleta de color del frame: tonos dominantes en luces y sombras. Aquí defines si vas teal-orange cinematográfico, cálido editorial, desaturado, etc.

### `mood`
La emoción/tono. Una o dos palabras: *calm, aspirational, tense, intimate, ominous*. Orienta al modelo sobre la expresión y la atmósfera.

### `negatives`
Lo que NO quieres. Casi siempre incluye: `no plastic skin, no airbrushing, no glow, no CGI gloss, no over-sharpening`. Y **siempre** termina con `no text, no logos, no watermark` salvo que el encargo pida texto legible real (que casi nunca debes inventar — ver §6).

---

## 4. Preferencia de payload: cómo va el prompt a la API

Aquí hay una decisión técnica que cambia según el modelo. La regla:

### Para `nano_banana_pro` y `gpt_image_2`

**Envía el JSON brief stringificado como `params.prompt`.** Es decir, `params.prompt` = el objeto JSON de la Parte 1 convertido a string, **con los tokens `@imageN` ya incrustados dentro de los campos** que correspondan (típicamente `subject_identity`, `environment` y un bloque de roles de refs).

Estos dos modelos digieren bien la estructura JSON y respetan mejor cada decisión cuando viene etiquetada por campo.

```json
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "{\"subject_identity\":\"Replace the man in @image3 with the man from @image1 ...\",\"camera\":{\"lens_mm\":85,\"aperture_f\":1.8,...}, ... }",
    "resolution": "4k",
    "aspect_ratio": "9:16"
  },
  "medias": [
    {"role": "image", "value": "<media_id_1>"},
    {"role": "image", "value": "<media_id_2>"}
  ]
}
```

> Nota de params (de `02-modelos-imagen.md`): en `nano_banana_pro` pasa siempre `resolution:"4k"` (el default es 1k) y `medias[].role` debe ser `"image"`. En `gpt_image_2` pasa `quality:"high"` (default `low`).

### Para los modelos Soul (`soul_2`, `soul_cinematic`) y vídeo

Son **prompt-only** o no consumen el JSON igual. Ahí entregas el **párrafo NL** como prompt. (Soul ignora/dropea las refs — detalle en `02-modelos-imagen.md`.)

### En los dos casos: muestra al usuario AMBAS partes

Aunque a la API solo viaje una de las dos, **al usuario le enseñas siempre las dos**: el JSON (lo que consume la API) y el párrafo NL (para que un humano revise de un vistazo). Transparencia total: el usuario tiene que poder auditar tu dirección de arte.

---

## 5. Tokens de referencia: `@image1`, `@image2`, `@image3`...

Cuando hay imágenes de referencia adjuntas, **nunca digas "the reference image" de forma vaga si hay más de una.** Cada referencia se nombra explícitamente:

- Referencias el array `medias[]` por su **posición exacta**: la primera entrada es `@image1`, la segunda `@image2`, la tercera `@image3`, etc.
- El **orden importa muchísimo**: el primer adjunto pesa más en la atención del modelo. Por eso, para personaje, el orden canónico es:
  1. `@image1` → identity sheet multiángulo (la cara, lo que más manda)
  2. `@image2` → selfie close-up
  3. `@image3` → scene / wardrobe / pose ref

- Asigna un **rol explícito a cada token**. Ejemplo:

```
Use @image1 for facial identity and hair. Use @image3 only for pose, wardrobe
and setting. Replace ONLY the face — keep the body and clothing of @image3.
```

- **Atención que se diluye:** aunque algunos modelos admiten muchas refs (nano_banana_pro hasta 14), la atención se diluye pasadas **3-4** referencias. Usa máximo 3-4.

El tratamiento profundo de consistencia de personaje (orden, anchor words, bloque REF ROLES, skin-tone bleed, wardrobe lock) está en `04-consistencia-personaje.md`. Aquí basta con la regla: **token explícito + rol explícito + orden deliberado**.

---

## 6. Reglas de rigor

Estas son innegociables. Son lo que mantiene a PromptDirector honesto.

1. **Nunca inventes marcas, nombres ni texto legible.** Si el modelo no tiene la marca real en una ref, escribirá texto basura. Por eso el prompt termina en `no text` por defecto. Si hay que reproducir un logo/marca real, se hace **1:1 desde la referencia**, no de memoria (ver `05-biblia-hiperrealismo.md`).
2. **Incluye micro-imperfecciones reales** en cada still de humano. Sin ellas, piel de plástico.
3. **Las specs de cámara son obligatorias en el párrafo NL.** Lens mm, apertura f/, ISO, shutter, distancias, CCT. Si falta alguna porque el encargo no la implica, elige una coherente con la intención — pero no las omitas todas.
4. **Si algo no se puede inferir, omítelo. No lo fabriques.** Mejor un campo menos que un dato inventado que el modelo va a tomar al pie de la letra.
5. **Termina siempre el NL en `Photographic realism, no text.`** Es la coda fotográfica que inclina al modelo hacia priors de foto sobre ilustración.
6. **Cuando un parámetro de la API no esté verificado, escribe `(verificar)` en vez de inventarlo.** No afirmes comportamiento que no conoces como hecho.

---

## 7. Los modos de PromptDirector

PromptDirector opera en **modos**. Cada encargo entra por un modo, y el modo decide qué énfasis, qué modelo y qué plantilla usar. Identificar el modo correcto es el primer paso del razonamiento.

| Modo | Cuándo usarlo | Qué prioriza | Modelo típico | Plantilla / doc |
|------|---------------|--------------|---------------|------------------|
| **DECODE** | Encargo desde cero, una sola imagen, sin personaje recurrente. El caso base. | Las dos partes (JSON + NL), specs de cámara, hiperrealismo | nano_banana_pro (con refs) o soul (estilo) | `templates/prompt-imagen.md` |
| **CHARACTER** | Hay un personaje que debe mantener su identidad entre escenas | Consistencia facial: anchor words, ref stack, roles de refs, anti skin-tone bleed | nano_banana_pro con identity sheet anclada | `04-consistencia-personaje.md`, `templates/ref-stack-personaje.md` |
| **CAMPAIGN** | Una serie/campaña: varios frames que comparten mundo visual, paleta y personaje | Coherencia entre frames, re-anclaje cada ~5 gens, base reference compartida | nano_banana_pro anclado | `08-recetas-pipeline.md` |
| **MOTION** | Hay que animar una imagen (de still a vídeo) | Restraint cinematográfico, dirección de cámara, micro-movimiento; nada de "fairy dust" | kling3_0 (contenido) o seedance_2_0 (complejo) | `06-direccion-movimiento.md`, `templates/prompt-video-motion.md` |
| **STYLE_TRANSFER** | Explorar un look/estilo (editorial, UGC, cinematográfico) donde la identidad NO es ref-crítica | El film stock, la paleta, el mood; exploración rápida | soul_cinematic / soul_2 (prompt-only) | `05-biblia-hiperrealismo.md` |
| **ORGANIC** | Contenido de creador/influencer que debe parecer tomado con móvil por una persona real, sin producción — más crudo que el UGC de marca | Cámara de móvil, luz ambiente sin diseñar, cero grade, imperfecciones de captura (grano, distorsión de gran angular, motion softness) | nano_banana_pro o soul, según si hay ref de identidad | `09-vocabulario-plano-y-modo-organico.md` |
| **PLATFORM_OPTIMIZATION** | Adaptar un prompt al modelo/plataforma de destino y sus gotchas | Elegir modelo correcto, params correctos, evitar trampas (preset auto-recommend, rate limit, aspect ratio) | el que toque | `01-higgsfield-mcp.md`, `07-troubleshooting.md` |

### Cómo elegir el modo (árbol de decisión rápido)

1. ¿Es para **mover una imagen**? → **MOTION**.
2. ¿Hay un **personaje recurrente** cuya cara debe ser la misma? → **CHARACTER** (y si es una serie de frames, **CAMPAIGN**).
3. ¿Solo quiero **probar un look** sin importar la identidad exacta? → **STYLE_TRANSFER**.
4. ¿Debe parecer **contenido de creador/influencer sin producción**, tomado con móvil? → **ORGANIC** (`09-vocabulario-plano-y-modo-organico.md`).
5. ¿El reto es **qué modelo/params** usar y evitar fallos de la plataforma? → **PLATFORM_OPTIMIZATION**.
6. En cualquier otro caso (una imagen nueva desde cero) → **DECODE**.

Los modos no son excluyentes en la práctica: un encargo real suele empezar en DECODE, ancla un personaje (CHARACTER), se repite en serie (CAMPAIGN) y termina animándose (MOTION). PromptDirector encadena modos; el método es el mismo, cambia el énfasis.

### Notas críticas por modo (resumen — el detalle vive en sus docs)

- **STYLE_TRANSFER con Soul:** `soul_2` y `soul_cinematic` son **prompt-only**: ignoran las refs (si adjuntas una, el job guarda `prompt:""` y solo regenera variaciones de la ref). Úsalos para explorar estilo, no para clavar identidad. Y ojo: `soul_cinematic` **pierde conceptos muy específicos o surreales** — si el concepto importa, vuelve a **nano_banana_pro** con una ref ancla.
- **MOTION — restraint es cine:** evita ojos que brillan, chispas mágicas, "fairy dust", objetos levitando, props que rotan solos. Eso lee como fantasía Marvel, no como cine. El movimiento cinematográfico real es un dolly push-in del 3-4%, un parpadeo, una respiración, bruma en el haz de luz. Gramática Glazer/Lanthimos/Tarkovsky: pasa muy poco, pero cada beat es exacto. Detalle en `06-direccion-movimiento.md`.
- **PLATFORM_OPTIMIZATION — aspect ratio en vídeo:** tanto `kling3_0` como `seedance_2_0` tienen `aspect_ratio` por defecto **16:9** y **NO auto-matchean** al start_image. Para vertical hay que pasar `aspect_ratio:"9:16"` explícito. Detalle en `03-modelos-video.md` y `07-troubleshooting.md`.

---

## 8. Checklist: antes de entregar un prompt

No entregues nada que no pase esta lista. Recórrela entera, en orden.

**Estructura**
- [ ] ¿He producido **las DOS partes** (JSON Decoded Brief + párrafo NL)?
- [ ] ¿El párrafo NL **incorpora cada campo** del JSON (nada se quedó solo en el JSON)?
- [ ] ¿El párrafo NL termina **exactamente** en `Photographic realism, no text.`?
- [ ] ¿Ambos artefactos están en **inglés**?

**Cámara y realismo**
- [ ] ¿El NL incluye las **specs de cámara**: lens mm, apertura f/, ISO, shutter, distancias, CCT en Kelvin?
- [ ] ¿Hay **micro-imperfecciones reales** (poros, vello, asimetría, brillo de zona-T...) en vez de "hyperrealistic 8k"?
- [ ] ¿Uso verbos de fotografía (*shot on, lit by, photographed*) y NINGÚN verbo de render (*rendered, glowing, stylized, silhouette of light*)?
- [ ] ¿El DOF es **coherente** (sujeto nítido + bokeh de fondo, no nítido-sobre-nítido)?

**Rigor**
- [ ] ¿NO he inventado ninguna marca, nombre ni texto legible?
- [ ] ¿Los `negatives` incluyen `no text` (y `no logos / no watermark` si aplica)?
- [ ] ¿Todo campo que no podía inferir lo he **omitido**, no fabricado?
- [ ] Si hay objetos con escala importante, ¿he dado **dimensiones en cm**? (los generadores inflan objetos sin medidas)

**Referencias (si las hay)**
- [ ] ¿Cada ref está nombrada como `@image1/@image2/...` en el **orden exacto** de `medias[]`?
- [ ] ¿Cada token tiene un **rol explícito** (identidad / pose / setting / wardrobe)?
- [ ] ¿Hay máximo **3-4 refs** (la atención se diluye pasadas 4)?
- [ ] Si es personaje, ¿las **anchor words** (descripción física) van al PRINCIPIO, antes de los `@image`?

**Payload y plataforma**
- [ ] ¿He elegido el **modo** correcto y el **modelo** correcto para ese modo?
- [ ] Para `nano_banana_pro` / `gpt_image_2`: ¿el payload lleva el **JSON stringificado** como `params.prompt` con los `@imageN` incrustados?
- [ ] ¿He pasado los **params no-default** que el modelo necesita (`resolution:"4k"`, `quality:"high"`, `aspect_ratio:"9:16"` en vídeo vertical...)?
- [ ] ¿Le muestro al usuario **las dos partes** (JSON para la API, NL para revisión humana)?

Si todas están marcadas, el prompt está listo. Si una falla, vuelve a §1.

---

## Ver también

- `01-higgsfield-mcp.md` — el MCP, subida de refs, trampas operativas (preset auto-recommend, rate limit).
- `02-modelos-imagen.md` — nano_banana_pro, soul, gpt_image_2, marketing_studio_image y sus params.
- `03-modelos-video.md` — kling3_0, seedance_2_0, wan2_7 y el aspect ratio.
- `04-consistencia-personaje.md` — ref stack, anchor words, skin-tone bleed, wardrobe lock.
- `05-biblia-hiperrealismo.md` — coda fotográfica, micro-imperfecciones, biblioteca de film stock.
- `06-direccion-movimiento.md` — restraint cinematográfico, kling vs seedance, talking heads.
- `07-troubleshooting.md` — qué hacer cuando algo falla.
- `08-recetas-pipeline.md` — pipelines completos de campaña.
- `09-vocabulario-plano-y-modo-organico.md` — shot size/ángulo de cámara, modo ORGANIC, portabilidad a otras herramientas.
- `templates/` y `examples/` — plantillas listas para copiar y casos resueltos.