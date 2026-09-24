> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/08-recetas-pipeline.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 08 — Recetas de pipeline (end-to-end)

Este archivo es el recetario práctico de DirectorIA-Cloud. Cada receta es un **pipeline completo, paso a paso**, que va desde "tengo una idea y unas referencias" hasta "tengo el clip final listo para publicar". No te enseña la teoría (eso está en los otros archivos): te dice exactamente qué modelo usar en cada paso, qué parámetros pasar, qué vigilar mientras se cocina y cómo iterar cuando algo sale mal.

> **Idioma.** Toda la conversación con el usuario va en español. **Todos los prompts finales que se envían a Higgsfield van en inglés**, sin excepción: los modelos de imagen y vídeo (nano_banana_pro, soul, kling3_0, seedance_2_0) están entrenados mayoritariamente en inglés y rinden notablemente mejor en identidad, iluminación y física cuando el prompt está en inglés. Tú piensas y discutes con el creador en su idioma; le entregas el prompt en inglés.

## Cómo leer este recetario

Las cuatro recetas cubren el 90% del onboarding:

| # | Receta | Cuándo usarla | Modelo imagen | Modelo motion |
|---|--------|---------------|---------------|---------------|
| 1 | **AD UGC con personaje recurrente** (Reels 9:16) | El mismo personaje aparece en varios beats vendiendo algo | `nano_banana_pro` 4k | Kling o Seedance según el beat |
| 2 | **Talking head con lipsync** | Una persona habla a cámara | `nano_banana_pro` 4k | Kling/Seedance + lipsync en web |
| 3 | **Retrato de marca / founders** (16:9) | Foto premium de fundador/equipo, low-key, con espacio para titular | `nano_banana_pro` 16:9 | Kling (opcional, micro-movimiento) |
| 4 | **B-roll / mundo editorial surreal** | Plano de mundo/atmósfera sin cara crítica | `nano_banana_pro` o `soul` | Seedance (cámara) o Kling |

Reglas transversales que aplican a TODAS las recetas (no se repiten en cada paso para no engordar):

- **Toda salida de prompt es bipartita** (metodología PromptDirector, ver `00-metodologia-promptdirector.md`): un **JSON Decoded Brief** + un **párrafo en lenguaje natural** que termina en `Photographic realism, no text.` El JSON estringificado es lo que va en `params.prompt`; el párrafo NL es para revisión humana.
- **Coda fotográfica obligatoria** en el NL: `shot on [cámara], [lens]mm, f/[N], ISO [N], natural color grade, photographic realism, no text.` Activa los priors de foto sobre los de ilustración (ver `05-biblia-hiperrealismo.md`).
- **Rate limit**: máximo **8 jobs concurrentes** (plan ultra). Batchea en grupos de ≤8 o verás `Rate limit reached`.
- **Preflight de coste**: ante cualquier batch grande, lanza primero con `get_cost:true` para ver el coste sin ejecutar.
- **Trampa preset auto-recommend**: si tu prompt se parece a un preset, el server devuelve un `notice` (`type: preset_recommendation`) y **no ejecuta** (no trae `results` ni `job_id`). Fix: añade `declined_preset_id:"<id>"` para forzar la generación literal. (Ver `07-troubleshooting.md`.)
- **Workspace**: cambiar de workspace **invalida todos los `media_id`** → re-sube las refs. No cambies de workspace a media campaña.

---

## Flujo de subida de referencias (común a las recetas 1, 2, 3)

Antes de cualquier receta que use referencias, hay que subirlas. Este sub-flujo se invoca desde dentro de las recetas; aquí está completo una sola vez.

```text
1. media_upload(files:[{filename, content_type}])
      -> devuelve { upload_url (presigned), media_id } por cada archivo
2. curl -X PUT -H "Content-Type: <content_type>" \
        --data-binary @<archivo_local> '<upload_url>'
3. media_confirm(media_ids:[...], type:"image")   // o "video" / "audio"
4. usar cada media_id como medias[].value en generate_image / generate_video
```

Reglas al construir el array `medias[]` para `generate_image` con `nano_banana_pro`:

- **`medias[].role` DEBE ser `"image"`.** El server coacciona `"reference"` → `"image"`, pero no dependas de eso: pásalo ya como `"image"`.
- **Orden = peso.** El primer adjunto pesa más. Para identidad: identity sheet multiángulo → `@image1`, selfie close-up → `@image2`, scene/wardrobe ref → `@image3`.
- **Máximo útil 3–4 refs.** El server admite hasta 14, pero la atención se diluye pasadas 3–4 y empiezas a perder la cara.
- **Tokens explícitos**: en el prompt referencia cada media como `@image1`, `@image2`, `@image3` **en el orden exacto de `medias[]`**. Nunca "the reference image" cuando hay varias.

---

# RECETA 1 — AD UGC con personaje recurrente (Reels 9:16)

## Objetivo

Producir un anuncio UGC vertical (9:16, formato Reels/TikTok/Shorts) en el que **el mismo personaje** aparece a lo largo de varios beats (p. ej.: gancho → problema → producto → demo → CTA), con la **identidad facial bloqueada** entre planos, y rematarlo con movimiento y, si habla, lipsync. Es la receta estrella del onboarding y la que más cuida la consistencia.

## Vista de pájaro

```
Refs de identidad ──► nano_banana_pro 4k (1 frame por beat, ref stack) ──►
   elegir winner por beat ──► motion (Kling micro / Seedance complejo) ──►
   [si habla] lipsync en la web UI de Higgsfield ──► montaje
```

---

### Paso 0 — Diseñar los beats antes de tocar el MCP

No generes nada hasta tener la lista de beats escrita. Un Reel UGC típico son 4–6 beats de 2–4 s. Para cada beat anota: **qué pasa, qué plano (close-up / medio / americano), y si el personaje habla** (si habla, anota la línea literal — la necesitarás para el lipsync).

Ejemplo de estructura (guárdala como guion, no es un prompt):

```
Beat 1 (gancho, close-up, HABLA):   "Llevo tres años buscando esto."
Beat 2 (problema, plano medio):     mira frustrada el producto antiguo
Beat 3 (producto, close-up manos):  sostiene el producto nuevo en la palma
Beat 4 (demo, plano medio):         lo usa, reacción de sorpresa
Beat 5 (CTA, close-up, HABLA):      "Link en la bio."
```

> Si el ad tiene **10+ beats**, no tires de ref stack manual: considera entrenar un **Soul ID** (15–25 fotos variadas del personaje, ~3–5 min de entrenamiento) para tener un token de identidad persistente. Para 4–6 beats, el ref stack de esta receta es suficiente.

---

### Paso 1 — Subir el ref stack de identidad

Sube las referencias del personaje siguiendo el [flujo de subida](#flujo-de-subida-de-referencias-común-a-las-recetas-1-2-3). El stack canónico (ver `04-consistencia-personaje.md` y `templates/ref-stack-personaje.md`):

| Orden | Ref | Token | Rol |
|-------|-----|-------|-----|
| 1.º | Identity sheet multiángulo (frente + 3/4 + perfil) | `@image1` | identidad facial y pelo (la que más pesa) |
| 2.º | Selfie close-up nítido | `@image2` | refuerzo de rasgos finos |
| 3.º | Ref de wardrobe / setting | `@image3` | pose, ropa, entorno |

**Wardrobe lock**: incluye SIEMPRE una ref canónica de vestuario aunque cambies de escena. Sin ella aparece drift de gorro/ropa/pelo entre beats.

---

### Paso 2 — Generar 1 frame por beat con `nano_banana_pro`

`nano_banana_pro` es el líder 2026 en preservación de identidad: es el modelo correcto para "meter un personaje recurrente con identidad locked en una escena". Genera **un frame (still) por beat**, no el vídeo todavía.

Parámetros clave de `generate_image`:

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "9:16",
  "medias": [
    {"role": "image", "value": "<media_id_identity_sheet>"},
    {"role": "image", "value": "<media_id_selfie>"},
    {"role": "image", "value": "<media_id_wardrobe>"}
  ],
  "prompt": "<JSON Decoded Brief estringificado, con @image1/@image2/@image3 incrustados>"
}
```

- **`resolution:"4k"` es obligatorio pasarlo.** El default es `1k`; para un ad premium necesitas 4k.
- `aspect_ratio:"9:16"` para vertical.
- Si ves `model:"nano_banana_2"` en la respuesta es un **fallback interno normal**, no un error.

**Estructura del prompt por beat** (anchor words → tokens → escena). Las *anchor words* (descripción física del personaje) van **al principio**, antes de los `@image`, para que los tokens atmosféricos no diluyan la cara:

```text
A 29-year-old woman with warm olive skin, dark almond eyes, a small scar
above the left eyebrow, shoulder-length dark brown hair. Use @image1 for
facial identity and hair; @image2 to reinforce fine features; @image3 for
wardrobe and setting only. Replace only the face — keep her identity from
@image1 across the whole scene.

[descripción de la escena del beat: entorno, luz, plano, acción]

shot on ARRI Alexa, 35mm, f/2.0, ISO 400, natural color grade,
photographic realism, no text.
```

> **Pitfall crítico — cara prestada de la scene ref.** Si `@image3` contiene una persona parecida, el modelo se queda con ESA cara. Fix: bloque REF ROLES explícito, y repite literalmente `DO NOT use the face of the person in @image3`. Evita `keep @image3 exactly`.
>
> **Skin-tone bleed.** Añade: `ALL visible skin — face, neck, ears, hands, wrists — must match the skin tone of @image1. Do NOT inherit the skin tone of the person in @image3.`

**Lote**: si son ≤8 beats puedes lanzarlos en paralelo (respetando el límite de 8 jobs). Para tener variantes, lanza 2–3 generaciones por beat (sigue cuidando el tope de 8 concurrentes: batchea).

---

### Paso 3 — Elegir el winner de cada beat

Revisa los stills y elige uno por beat con estos criterios de descarte (ver `05-biblia-hiperrealismo.md`):

- **Identidad**: ¿es la misma persona en todos los beats? Si un beat derivó la cara, descártalo.
- **Hiperrealismo**: ¿se lee como foto real? Si tiene *AI gloss*, look CGI, "glow" o piel de plástico, fuera.
- **Micro-imperfecciones presentes**: poros visibles, un mechón suelto, ligera asimetría, brillo en la zona T. Su ausencia es señal de imagen "demasiado limpia" = falsa.
- **DOF coherente**: sujeto nítido + bokeh de fondo coherente. Nítido-sobre-nítido = se ve pegado.

> **Re-anclaje.** Cada ~5 generaciones, coge un buen keyframe winner y úsalo como **nueva ref de identidad** (`@image1`) para los siguientes beats. Mantiene la deriva a raya. Y empieza **sesión fresca cada 5–10 gens**.
>
> **No encadenes variante-de-variante.** Si un beat necesita revisión, **re-genera desde el prompt estructural que funcionó**, con TODAS las refs de identidad adjuntas — no a partir de una salida anterior.

---

### Paso 4 — Dar movimiento (Kling vs Seedance por beat)

Cada frame winner se convierte en clip con `generate_video`. **El modelo se elige por beat**, no para todo el ad:

| Tipo de beat | Modelo | Por qué |
|--------------|--------|---------|
| Close-up que habla, micro-gesto, respiración, sway de pelo | `kling3_0` | Movimiento contenido = territorio Kling |
| Cámara en movimiento, manos manipulando producto con física, multi-elemento, parallax | `seedance_2_0` | Movimiento complejo = territorio Seedance |

**Kling (movimiento contenido):**

```json
{
  "model": "kling3_0",
  "mode": "pro",
  "aspect_ratio": "9:16",
  "medias": [{"role": "start_image", "value": "<media_id_frame_winner>"}],
  "prompt": "<dirección de movimiento del beat, en inglés>"
}
```

- `mode:"pro"` = 1080p (las otras opciones son `std` y `4k`).
- **`aspect_ratio:"9:16"` OBLIGATORIO.** El default de Kling es 16:9 y **NO se auto-ajusta al `start_image`**. Si lo olvidas, recortará tu vertical.
- `sound` está `on` por defecto.

**Seedance (movimiento complejo):**

```json
{
  "model": "seedance_2_0",
  "mode": "std",
  "resolution": "1080p",
  "aspect_ratio": "9:16",
  "medias": [{"role": "start_image", "value": "<media_id_frame_winner>"}],
  "prompt": "<dirección de movimiento del beat, en inglés>"
}
```

- Modos de Seedance: `std` / `fast`. **No existe `pro` ni `4k`** en este modelo.
- **`resolution:"1080p"` pásalo explícito** (default 720p).
- **`aspect_ratio:"9:16"` OBLIGATORIO** (default 16:9, igual que Kling).
- `genre` por defecto `auto`.

**Dirección de movimiento (RESTRAINT es cine, ver `06-direccion-movimiento.md`):** describe **poco pero exacto**. Un dolly push-in imperceptible (3–4%), un gesto deliberado, una respiración, un parpadeo. **PROHIBIDO**: ojos que brillan, chispas mágicas, *fairy dust*, props que rotan solos, objetos levitando — leen como fantasía Marvel, no como ad real.

> Para los beats que hablan (1 y 5 del ejemplo), mete la **línea de diálogo LITERAL entre comillas** en el prompt de motion para que las formas de boca sinteticen bien — esto prepara el lipsync del paso 5.

---

### Paso 5 — Lipsync (solo beats que hablan)

**El lipsync NO está expuesto por el MCP.** Los modelos de lipsync (Sync Lipsync 2 Pro, Kling Lipsync, Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk) se aplican en la **web UI de Higgsfield**. El workflow correcto:

1. Generaste el clip del beat con **movimiento de boca** ya presente (la línea literal entre comillas en el prompt de motion — paso 4).
2. Llevas ese clip a la web UI de Higgsfield.
3. Le aplicas el lipsync con el audio real (locución / voz clonada).

> Alternativa **dentro del MCP** si el beat encaja: `wan2_7` es el **único modelo audio-sync expuesto por el MCP** (start_image + audio → vídeo sincronizado, **4:3 nativo, 1080p, 2–15 s**). Limita: su salida es 4:3, no 9:16 — sirve para un inserto, no para el Reel completo. Para el lipsync 9:16 de calidad, ve a la web UI.

---

### Paso 6 — Montaje

Ensambla los clips por beats en tu editor. El MCP no monta el ad; entrega los clips. Si necesitas re-encuadrar algún plano, revisa las herramientas de reframe del MCP (ver `01-higgsfield-mcp.md`).

### Checklist de salida de la Receta 1

- [ ] Misma cara en todos los beats (re-anclada cada ~5 gens).
- [ ] Stills en 4k, 9:16, con micro-imperfecciones y DOF coherente.
- [ ] Motion contenido por Kling / complejo por Seedance, ambos con `aspect_ratio:"9:16"` explícito.
- [ ] Beats hablados con la línea literal entre comillas; lipsync aplicado en web UI.
- [ ] Sin look CGI / glow / fairy dust en ningún plano.

---

# RECETA 2 — Talking head con lipsync

## Objetivo

Una persona habla directamente a cámara (testimonial, founder hablando, avatar UGC, "head"). El reto es: cara realista y estable + boca que sincroniza con un audio real. Es una versión simplificada de la Receta 1 enfocada en un solo sujeto que habla.

## Vista de pájaro

```
Ref(s) de identidad ──► nano_banana_pro 4k (frame talking head) ──►
   motion con la línea LITERAL ──► lipsync en web UI ──► clip final
```

---

### Paso 1 — Frame con `nano_banana_pro`

Sube las refs ([flujo de subida](#flujo-de-subida-de-referencias-común-a-las-recetas-1-2-3)) y genera el frame del talking head. Mismos parámetros que la Receta 1 (`model:"nano_banana_pro"`, `resolution:"4k"`, `aspect_ratio` según destino — `9:16` para Reels, `16:9` para YouTube/landing).

El prompt sigue la metodología bipartita. Para el plano de talking head, encuadre típico close-up / busto, luz suave de frente, mirada a cámara.

> **Trampa "head only" — solo si pides una cabeza flotante** (estilo figura/avatar sin cuerpo). Si quieres una cabeza sin cuerpo, hay que blindarlo o el modelo de motion inventará un cuerpo: `floating HEAD ONLY ... DO NOT add neck, shoulders, chest, body, clothing below the chin`. Para un talking head normal (con busto), **no** uses esto — déjalo respirar.

---

### Paso 2 — Motion con la línea de diálogo literal

Un talking head es **movimiento contenido** → **`kling3_0`**. Lo crítico aquí es preparar el terreno para el lipsync:

```json
{
  "model": "kling3_0",
  "mode": "pro",
  "aspect_ratio": "9:16",
  "medias": [{"role": "start_image", "value": "<media_id_frame>"}],
  "prompt": "<dirección + la LÍNEA LITERAL entre comillas + lock de composición>"
}
```

Reglas del prompt de motion para talking head (ver `06-direccion-movimiento.md` y `templates/talking-head-lipsync.md`):

- **Mete la línea de diálogo LITERAL entre comillas.** Las formas de boca sintetizan mucho mejor cuando el modelo sabe qué se está diciendo. Ej.: `She says, to camera: "I tried everything before this."`
- **Coreografía gestos a beats** con timestamps si el clip es largo (un asentimiento, un parpadeo) — pero con RESTRAINT, no sobreactúes.
- **Preserva EXACTAMENTE la composición del start-image**: `DO NOT change wardrobe, background, or pose. Keep the framing of the start image.`
- Si vas a usar `wan2_7` (audio-sync por MCP), termina con: `Audio/voice to lipsync is <<<audio_1>>>` y adjunta el audio confirmado.

---

### Paso 3 — Lipsync en la web UI

Igual que en la Receta 1, paso 5: el lipsync de calidad **no está en el MCP**. Lleva el clip (que ya tiene movimiento de boca por la línea literal) a la **web UI de Higgsfield** y aplica Sync Lipsync 2 Pro / Kling Lipsync / Higgsfield Speak 2.0 con tu audio real.

Si el formato 4:3 te sirve y quieres quedarte 100% dentro del MCP, usa **`wan2_7`** (start_image + audio → sincronizado, 4:3 1080p, 2–15 s).

### Checklist de salida de la Receta 2

- [ ] Cara estable, mirada a cámara, micro-imperfecciones reales.
- [ ] Motion en Kling con `aspect_ratio` correcto y **línea literal entre comillas**.
- [ ] Composición del start-image preservada (sin cambios de wardrobe/fondo/pose).
- [ ] Lipsync aplicado en web UI (o `wan2_7` si 4:3 es aceptable).

---

# RECETA 3 — Retrato de marca / founders (16:9)

## Objetivo

Un retrato premium de fundador/a o equipo: **low-key**, cinematográfico, con **espacio negativo para un titular** (para usarse como hero de landing, portada de pitch, banner de LinkedIn, etc.). La identidad importa (es una persona real), así que ref stack + `nano_banana_pro`.

## Vista de pájaro

```
Ref stack del founder ──► nano_banana_pro 16:9 low-key, espacio para titular ──►
   [opcional] Kling micro-movimiento ──► entrega
```

---

### Paso 1 — Ref stack + generación 16:9

Sube las refs del founder ([flujo de subida](#flujo-de-subida-de-referencias-común-a-las-recetas-1-2-3)). Para un solo founder bastan identity sheet (`@image1`) + selfie (`@image2`). Para retrato de equipo, una ref por persona (cuidando el tope de 3–4 refs útiles; si son más personas, considera componer por partes).

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "16:9",
  "medias": [
    {"role": "image", "value": "<media_id_identity_sheet>"},
    {"role": "image", "value": "<media_id_selfie>"}
  ],
  "prompt": "<JSON brief estringificado, low-key, espacio negativo a un lado>"
}
```

**Claves de dirección (en el NL del prompt):**

- **Iluminación low-key**: una fuente principal lateral, sombras profundas, fall-off marcado. Descríbelo como foto real: `lit by a single soft key light from camera left, deep falloff into shadow`. Nada de "dramatic glow".
- **Espacio para titular**: compón al sujeto descentrado dejando **espacio negativo limpio** al lado opuesto. Ej.: `subject positioned on the right third, clean dark negative space on the left for headline placement`.
- **Specs de cámara** premium en el NL: lente de retrato (85mm típico), apertura abierta (f/1.8–f/2.0) para separar del fondo, CCT cálida si quieres calidez. Coda fotográfica de cierre obligatoria.
- **Film stock** según el mood (ver `05-biblia-hiperrealismo.md`): Kodak Portra 400 para editorial cálido con sombras levantadas; Kodak Vision3 500T para teal-orange cinematográfico con negros limpios; medio formato (Mamiya 7 80mm) para caída suave de fondo.
- **Micro-imperfecciones de piel** siempre: poros, *subsurface scattering* en orejas/nariz, asimetría leve. Es lo que separa un retrato real de un render.

> **Nada de inventar.** No fabriques logos, credenciales, ni texto en el fondo (cierras en `no text`). Si la marca tiene un logo real y se quiere reproducir, hazlo 1:1 desde una ref (ver `05-biblia-hiperrealismo.md`), no lo inventes.

---

### Paso 2 (opcional) — Micro-movimiento con Kling

Un retrato se puede animar ligerísimamente para un hero "vivo" (LinkedIn, web). Es **movimiento contenido** → **`kling3_0`**, `mode:"pro"`, **`aspect_ratio:"16:9"`** (aquí el default de Kling sí coincide, pero pásalo igualmente por higiene). Dirección: una respiración, un parpadeo, un sway mínimo de pelo. **RESTRAINT máximo** — un retrato de marca con efectos mágicos es un desastre de credibilidad.

### Checklist de salida de la Receta 3

- [ ] 16:9, 4k, low-key con fall-off real (no "glow").
- [ ] Espacio negativo limpio para titular en el lado correcto.
- [ ] Identidad fiel + micro-imperfecciones de piel.
- [ ] Cero texto/logos inventados.
- [ ] (Si se anima) micro-movimiento sobrio en Kling.

---

# RECETA 4 — B-roll / mundo editorial surreal (sin identidad crítica)

## Objetivo

Planos de **mundo / atmósfera** para cortar entre beats: un interior surreal, una textura de ciudad, un objeto editorial, un paisaje onírico. **No hay una cara crítica que preservar**, así que aquí se abre la puerta a `soul` (prompt-only, exploración de estilo) y se busca **variación agresiva de ángulo y plano** para tener material de montaje.

## Vista de pájaro

```
Ref del mundo (opcional) ──► nano_banana_pro (concepto preciso) o soul (estilo) ──►
   variación agresiva de ángulo/plano ──► [opcional] motion Seedance/Kling ──► b-roll
```

---

### Decisión de modelo (lo primero)

| Situación | Modelo | Por qué |
|-----------|--------|---------|
| El concepto es **muy específico o surreal** y NO puede deformarse (un objeto concreto, una composición exacta) | `nano_banana_pro` con **ref ancla** | soul_cinematic **pierde** conceptos muy específicos/surreales; nano los mantiene |
| Quieres **explorar un estilo** cinematográfico/editorial/UGC y la identidad no es ref-crítica | `soul_2` / `soul_cinematic` | son los modelos de exploración de estilo |
| Default comercial/producto/ads | `marketing_studio_image` | es el default comercial |

> **soul es PROMPT-ONLY.** `soul_2` (alias `text2image_soul_v2`) y `soul_cinematic` **ignoran/dropean las refs**: un job de soul con una ref guarda `prompt:""` y solo regenera variaciones de esa ref. **Conclusión: con soul, dirige TODO por texto**; no adjuntes refs esperando que las respete. Default de quality en soul: 2k.

---

### Paso 1 — Generar el plano base

**Opción A — concepto preciso/surreal con `nano_banana_pro` + ref ancla:**

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "9:16",
  "medias": [{"role": "image", "value": "<media_id_ref_del_mundo>"}],
  "prompt": "<JSON brief estringificado, @image1 = world anchor>"
}
```

Usa la ref como **ancla del mundo** (`@image1 for the world: palette, set, atmosphere`) y describe el resto por texto.

**Opción B — exploración de estilo con `soul`:**

```json
{
  "model": "soul_cinematic",
  "prompt": "<párrafo NL completo, todo dirigido por texto>"
}
```

- **Sin `medias`** (las dropearía).
- Si el concepto es muy surreal y soul_cinematic lo está perdiendo (deriva a algo genérico), **cambia a la Opción A** (nano_banana_pro con ref ancla). Esa es la señal de que el concepto era demasiado específico para soul.
- Default quality 2k; sirve de sobra para b-roll.

> **Trampa preset**: los mundos editoriales/oscuros se parecen a presets como `IN THE DARK` (id `24bae836-2c4a-48e0-89b6-49fcc0b21612`). Si el server devuelve un `notice` de tipo `preset_recommendation` sin ejecutar, añade `declined_preset_id:"24bae836-2c4a-48e0-89b6-49fcc0b21612"` (o el id que indique el notice) para forzar la generación literal.

---

### Paso 2 — Variación agresiva de ángulo/plano

Aquí está el valor del b-roll: **muchas tomas del mismo mundo desde ángulos y escalas distintas** para tener con qué montar. Como no hay cara que preservar, puedes ser agresivo. Genera variaciones cambiando, en el prompt, un eje a la vez:

- **Escala de plano**: extreme wide → wide → medium → close-up → macro detail.
- **Ángulo de cámara**: eye-level → low angle → high angle / top-down → dutch tilt sutil.
- **Distancia focal**: wide 24mm (mundo) ↔ tele 85mm (compresión, detalle).
- **Momento de luz**: clave alta vs clave baja, dirección de la fuente.

Lanza un batch de variaciones (≤8 jobs concurrentes). Mantén el **mismo film stock** entre tomas para que el b-roll case en el montaje (Portra 400, Vision3 500T, anamórfico, etc. — ver `05-biblia-hiperrealismo.md`).

> Aunque sea surreal, **sigue siendo foto, no ilustración**: usa `photographed`, `lit by`, `shot on`, `wreathed in real smoke`. Evita `rendered as`, `glow silhouette`, `CGI`. La coda fotográfica también va aquí.

---

### Paso 3 (opcional) — Motion del b-roll

| Movimiento deseado | Modelo |
|--------------------|--------|
| Cámara en movimiento (dolly, parallax), líquidos/física, niebla/polvo en haces de luz, transición atmosférica | `seedance_2_0` (`mode:"std"`, `resolution:"1080p"`, `aspect_ratio` explícito) |
| Micro-movimiento de un objeto, deriva muy lenta | `kling3_0` (`mode:"pro"`, `aspect_ratio` explícito) |

Dirección con la misma gramática de **restraint cinematográfico**: bruma deslizándose en un haz, un dolly imperceptible, fluorescentes muriendo en secuencia. Sin chispas mágicas ni props que levitan.

### Checklist de salida de la Receta 4

- [ ] Modelo elegido bien: `nano_banana_pro`+ref para concepto crítico, `soul` para estilo libre.
- [ ] Si usaste soul, dirigiste todo por texto (sin esperar que respete refs).
- [ ] Tanda de variaciones con cambios de ángulo/escala/focal/luz, mismo film stock.
- [ ] Look fotográfico real, nunca CGI/glow/render.
- [ ] (Si hay motion) Seedance para cámara/física, Kling para micro; `aspect_ratio` explícito.

---

## Apéndice — Tabla rápida de "qué modelo para qué" (para no salir de este archivo)

| Necesito... | Modelo | Param que NUNCA olvidar |
|-------------|--------|--------------------------|
| Personaje recurrente con identidad locked en una escena | `nano_banana_pro` | `resolution:"4k"`, `medias[].role:"image"` |
| Generar desde refs + descripción verbosa | `nano_banana_pro` | `resolution:"4k"` |
| Explorar estilo cinematográfico/editorial/UGC sin identidad crítica | `soul_2` / `soul_cinematic` | es prompt-only (sin refs útiles), quality 2k |
| Comparar fidelidad facial (no para personaje recurrente) | `gpt_image_2` | `quality:"high"` (default low); tiende a AI gloss y a modificar la cara → evitar para identidad |
| Default comercial/producto/ad | `marketing_studio_image` | — |
| Movimiento contenido (retrato, talking head, micro) | `kling3_0` | `aspect_ratio:"9:16"` explícito; `mode:"pro"` = 1080p |
| Movimiento complejo (cámara, multi-actor, física, parallax) | `seedance_2_0` | `aspect_ratio:"9:16"` + `resolution:"1080p"` explícitos; modos solo `std`/`fast` |
| Audio-sync dentro del MCP | `wan2_7` | 4:3 nativo, 1080p, 2–15 s |
| Lipsync de calidad | **web UI de Higgsfield** | no expuesto por MCP; mete la línea literal en el motion antes |
| Preflight de coste | cualquiera | `get_cost:true` |

**Errores que cuestan generaciones (resumen):**

- Olvidar `aspect_ratio:"9:16"` en Kling/Seedance → te lo da en 16:9 (default), no auto-matchea al start_image.
- Olvidar `resolution:"4k"` en nano_banana_pro → te da 1k.
- Adjuntar refs a soul esperando que las respete → las dropea.
- Usar `gpt_image_2` para un personaje recurrente → te cambia la cara.
- Más de 8 jobs a la vez → `Rate limit reached`.
- Prompt que parece preset sin `declined_preset_id` → devuelve `notice` y no ejecuta.
- Cambiar de workspace a media producción → invalida todos los `media_id`.

> Para diagnósticos detallados de cualquiera de estos, ve a `07-troubleshooting.md`. Para la teoría de identidad, `04-consistencia-personaje.md`. Para el porqué del look foto, `05-biblia-hiperrealismo.md`. Para la gramática de movimiento, `06-direccion-movimiento.md`.