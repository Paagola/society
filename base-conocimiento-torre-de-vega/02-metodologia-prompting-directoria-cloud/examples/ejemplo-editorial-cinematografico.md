# Ejemplo trabajado — Still editorial cinematográfico surreal (Reels 9:16)

> **Qué es esto:** un caso completo, de principio a fin, de cómo el DirectorIA-Cloud convierte un brief de marca en un still cinematográfico hiperrealista y luego le pone movimiento contenido. No es teoría: es el guion exacto de decisiones, prompts y parámetros que reproducirías en una sesión real.
>
> Para el caso de **personaje/UGC con identidad ref-crítica**, ver `examples/ejemplo-ugc-personaje.md`. Aquí trabajamos el caso opuesto: **estética por encima de identidad facial**.

---

## 0. El encargo

Una marca de fragancia quiere un **still editorial cinematográfico surreal** para abrir un Reel en formato vertical **9:16**. Referencias visuales que da el cliente: la frialdad incómoda de **Yorgos Lanthimos**, el surrealismo lumínico de **Jonathan Glazer** (*Under the Skin*), y **grano de película** real (nada de "8k ultra HD digital").

Lo importante que hay que extraer de ese encargo:

- **No hay una cara concreta que preservar.** El modelo de la imagen es anónimo, casi un maniquí; lo que vende es la atmósfera, el color y la textura de película. La identidad facial **no es ref-crítica**.
- **Sí hay un "mundo" estético muy específico** (paleta, encuadre, la rareza surreal). Si ese concepto se pierde, el still falla.
- Salida: **una imagen 9:16** que luego anima con **micro-movimiento cinematográfico** (no un anuncio que se mueve mucho, sino un plano que respira).

Esa tensión — *estética altísima / identidad baja / concepto surreal que no se puede perder* — es justo la que decide el modelo. Vamos a ello.

---

## 1. El perfil del proyecto

Antes de tocar Higgsfield, el agente fija el perfil. Es lo que orienta cada decisión posterior (esto sale del cuestionario de `ONBOARDING.md`).

| Campo | Valor |
|---|---|
| **Plataforma de salida** | Reels / TikTok — vertical **9:16** |
| **Objetivo** | Still de apertura cinematográfico + 1 clip de micro-movimiento |
| **Identidad facial** | **No crítica** (modelo anónimo, sin rostro reconocible que repetir) |
| **Concepto** | Surreal, muy específico (Lanthimos / Glazer) → **no se puede perder** |
| **Acabado obligatorio** | Hiperrealismo + grano de película (film stock real) |
| **Referencias** | El cliente aporta 1 imagen del "mundo" (paleta + set), **no** un rostro |
| **Branding/logos** | Ninguno legible en el frame → terminamos con `no text` |

Las dos casillas que mandan: **identidad no crítica** + **concepto surreal que no se puede perder**. Eso es exactamente lo que separa `soul` de `nano_banana_pro`.

---

## 2. La decisión de modelo (lo más importante de este ejemplo)

Aquí mucha gente se equivoca. La intuición dice "es estética cinematográfica, sin cara concreta → usa Soul, que es el modelo cinematográfico". **Pero depende de si hay ref del mundo y de cuánto importa el concepto.** Detalle de modelos en `knowledge/02-modelos-imagen.md`; el resumen operativo:

| Modelo | Cómo trata las refs | Cuándo aquí |
|---|---|---|
| **`soul_cinematic`** | **PROMPT-ONLY.** Ignora/dropea las refs. Calidad default 2k. **Pierde conceptos muy específicos/surreales.** | Solo si **NO hay ref del mundo** y el concepto se puede describir 100% por texto. |
| **`soul_2`** (alias `text2image_soul_v2`) | **PROMPT-ONLY.** También dropea refs (un job con ref guarda `prompt:""` y solo regenera variaciones de la ref). 2k default. | Exploración pura de estilo por texto, sin ref. |
| **`nano_banana_pro`** | **Sí usa las refs como ancla.** Líder en preservación 2026. `resolution:"4k"`. | Cuando **SÍ hay ref del mundo** o el concepto surreal es demasiado específico para fiarlo a texto. |

### El árbol de decisión, explícito

```
¿El cliente aportó una imagen del "mundo" (set/paleta/atmósfera)?
│
├── SÍ  → nano_banana_pro  (ancla esa ref como @image1, resolution:"4k")
│         · Razón: las soul DROPEAN la ref, así que tu referencia
│           del mundo se perdería. Y el concepto surreal específico
│           sobrevive mucho mejor anclado a una imagen real.
│
└── NO  → ¿el concepto surreal se puede describir 100% por texto sin perderlo?
          │
          ├── SÍ → soul_cinematic  (prompt-only, 2k, más "fílmico" de fábrica)
          │
          └── NO → nano_banana_pro igualmente
                   · soul_cinematic PIERDE conceptos muy específicos/surreales.
                     Si el surrealismo es el corazón del anuncio, no lo arriesgues.
```

> **Regla de oro que debes recordar:** **una ref + un modelo Soul = la ref se tira a la basura.** Las soul son prompt-only. Si tienes una imagen del mundo que el cliente quiere respetar, tu modelo es `nano_banana_pro`. Si no tienes ref y el concepto es describible, Soul te da grano cinematográfico más barato y directo.

### Lo que decidimos en ESTE caso

El cliente **sí aportó** una imagen del mundo (un set teatral con luz sodio-naranja y pared verde quirófano). Y el concepto surreal es muy específico. **Doble razón para `nano_banana_pro`.** Vamos con eso como ruta principal, y dejo abajo la variante Soul por si te llega el mismo encargo **sin** ref.

---

## 3. Subir la ref del mundo (solo ruta `nano_banana_pro`)

Antes de generar hay que subir y confirmar la imagen del mundo. Flujo de subida completo en `knowledge/01-higgsfield-mcp.md`; resumen:

```
media_upload(files:[{filename:"world_ref.png", content_type:"image/png"}])
   → devuelve { upload_url (presigned), media_id }

curl -X PUT -H "Content-Type: image/png" \
     --data-binary @world_ref.png '<upload_url>'

media_confirm(media_ids:["<media_id>"], type:"image")
   → ese media_id es el que pones en medias[].value
```

> **Trampa que cuesta una sesión entera:** si cambias de workspace, **todos los `media_id` se invalidan** y hay que volver a subir. No cambies de workspace a media generación. Y recuerda: en `nano_banana_pro` el `medias[].role` **debe ser `"image"`** — el server coacciona `"reference"` → `"image"` solo, pero no dejes a la suerte; pásalo ya como `"image"`.

Como aquí hay **una sola ref** (el mundo, no una cara), la usamos como `@image1`. Sin problema de dilución: la atención se diluye pasadas 3-4 refs, y nosotros tenemos una.

---

## 4. El prompt — metodología PromptDirector (2 partes SIEMPRE)

Toda salida del agente son **dos piezas**: (1) un **JSON Decoded Brief** que es lo que va literalmente en `params.prompt`, y (2) un **párrafo en lenguaje natural** que es lo que el humano revisa. Detalle metodológico en `knowledge/00-metodologia-promptdirector.md`.

> **Por qué los prompts van en inglés:** los modelos de imagen y vídeo rinden mejor en inglés — su entrenamiento está dominado por captions en inglés. Con el cliente conversamos en español, pero **el prompt final se entrega en inglés**. La narración de este documento es española; los bloques de prompt, no.

### 4.1. JSON Decoded Brief (esto es lo que va en `params.prompt`)

El `@image1` ya va incrustado dentro del JSON, en su rol. Campos obligatorios del brief: `subject`, `realism`, `environment`, `lighting`, `camera` (con todas las specs), `composition`, `imperfections`, `palette`, `mood`, `negatives`.

```json
{
  "subject": "A single anonymous figure, androgynous, standing perfectly still and facing the camera with a blank, affectless expression; face is non-specific and not identifiable, almost mannequin-like",
  "ref_roles": "Use @image1 for the WORLD only — set, palette, sodium-orange light direction and surgical-green walls. Do NOT copy any face or person from @image1; the figure is generated fresh.",
  "realism": "Real photograph, shot on motion-picture film. NOT a render, NOT CGI, NOT digital gloss. Visible film grain.",
  "environment": "A bare theatrical interior: surgical-green painted wall, a single wooden chair pushed slightly out of frame, cold linoleum floor; sparse, uncanny, Lanthimos-like emptiness",
  "lighting": "Hard practical sodium-vapor source from frame-left at low angle, raking across the wall; deep falloff into shadow on frame-right; one cold fill bounce to lift the shadow side just barely",
  "camera": {
    "lens_mm": 40,
    "anamorphic": true,
    "aperture": "f/2.8",
    "iso": 500,
    "shutter": "1/50s",
    "lens_to_subject_m": 2.2,
    "subject_to_bg_m": 1.5,
    "cct_kelvin": 3200,
    "film_stock": "Kodak Vision3 500T, anamorphic, oval bokeh, subtle horizontal flare"
  },
  "composition": "Vertical 9:16; figure centered but pushed low, large negative space of green wall above the head (Lanthimos symmetry-with-headroom); slight wide-angle anamorphic distortion at edges",
  "imperfections": "Faint film grain, gentle halation around the sodium highlight, one soft horizontal anamorphic flare, slight gate weave feel, true-to-life skin with visible pores and subsurface scattering on the ears, micro lip texture, no plastic smoothing",
  "palette": "Sodium orange highlight vs surgical teal-green shadow; clean blacks; muted, slightly sickly",
  "mood": "Cold, surreal, beautiful and unsettling; affectless; cinematic dread",
  "negatives": "no glow, no silhouette-of-light, no CGI sheen, no fairy dust, no levitation, no lens dirt overlay, no watermark, no text, no logos, no extra people, not hyperreal-8k-digital"
}
```

### 4.2. Párrafo en lenguaje natural (revisión humana + coda fotográfica)

Esto es lo que le enseñas al cliente para que lo apruebe. **Incorpora cada campo del JSON** y **termina con la coda fotográfica** que activa los priors de foto sobre ilustración.

```
A single anonymous, androgynous figure stands perfectly still, facing the
camera with a blank, affectless expression — the face deliberately
non-specific, almost a mannequin. Use @image1 for the WORLD only: the bare
theatrical set, the surgical-green wall, the cold linoleum, the low
sodium-orange light raking in from frame-left. Do NOT borrow any face from
@image1. The figure is centered but pushed low in a vertical 9:16 frame,
with a large negative space of green wall above the head — Lanthimos
symmetry with too much headroom. A hard sodium-vapor practical at 3200K
rakes across the wall and falls off into deep teal-green shadow on the
right, lifted just barely by one cold bounce. Photographed on motion-picture
film: faint grain, gentle halation around the sodium highlight, one soft
horizontal anamorphic flare, true skin with visible pores and subsurface
scattering on the ears, micro lip texture — no plastic smoothing, no glow,
no CGI sheen. Shot on a 40mm anamorphic lens, f/2.8, ISO 500, 1/50s, lens
2.2 m from the subject, subject 1.5 m off the green wall, Kodak Vision3 500T
teal-orange grade with clean blacks and oval bokeh. Cold, surreal,
beautiful and unsettling. Photographic realism, no text.
```

> **Por qué este NL evita el fallo "estilizado/CGI":** no decimos "glowing silhouette" ni "rendered as"; decimos **"photographed on motion-picture film"**, **"lit by a sodium-vapor practical"**, **"shot on a 40mm anamorphic lens"**. Esa gramática — *photographed / lit by / shot on / wreathed in real smoke* — activa los priors de fotografía. Un still que dice "glow silhouette" o "rendered" lee como CGI y es un **fallo** según la biblia de hiperrealismo (`knowledge/05-biblia-hiperrealismo.md`).
>
> **Por qué micro-imperfecciones en vez de "8k ultra HD":** "hyperrealistic 8k" empuja al modelo hacia el render digital pulido. Lo que da realismo es lo contrario: poros visibles, subsurface scattering en las orejas, halation, grano, una imperfección de gate weave. La textura de lo real, no la limpieza de lo sintético.

---

## 5. La llamada exacta a `generate_image`

Preferencia de payload en `nano_banana_pro`: **`params.prompt` = el JSON brief stringificado** (con los `@imageN` ya incrustados, como arriba). Parámetros — **solo los del ground truth**:

```jsonc
// Higgsfield MCP → generate_image
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "<el JSON Decoded Brief de la sección 4.1, stringificado>",
    "resolution": "4k",          // default es 1k → SIEMPRE pasar 4k
    "aspect_ratio": "9:16"       // soportado; lo forzamos para vertical
  },
  "medias": [
    { "role": "image", "value": "<media_id del world_ref>" }  // @image1
  ]
}
```

Notas que evitan sustos:

- **`resolution:"4k"`** — el default es `1k`. Para un still editorial **siempre** subes a `4k`.
- **`role` debe ser `"image"`** — el server coacciona `"reference"`→`"image"`, pero pásalo correcto de entrada.
- **Puede reportar `model:"nano_banana_2"` internamente.** Es un fallback normal, no un error; tu still sigue siendo válido.
- **Preflight de coste:** si quieres saber el coste antes de lanzar, añade `get_cost:true` y no se ejecuta el job, solo te devuelve el precio.
- **No te pases de refs:** aunque admite hasta 14, la atención se diluye pasadas 3-4. Aquí basta con una.

### Variante Soul — solo si NO hay ref del mundo

Si el mismo encargo te llega **sin** imagen del cliente y el concepto es describible al 100% por texto, la ruta es `soul_cinematic`, **prompt-only**:

```jsonc
// Higgsfield MCP → generate_image  (ruta sin ref)
{
  "model": "soul_cinematic",
  "params": {
    "prompt": "<el mismo NL de la sección 4.2, SIN los tokens @image>",
    // quality default 2k; aspect vertical
    "aspect_ratio": "9:16"
  }
  // SIN medias: soul_cinematic dropea cualquier ref que le pongas
}
```

> En la variante Soul **quita los `@image1`** del prompt (no hay ref que referenciar) y asume que `soul_cinematic` puede **perder matices del surrealismo**. Si al revisar ves que el concepto se diluyó, no insistas con Soul: vuelve a `nano_banana_pro` y ánclalo aunque tengas que fabricar tú una ref del mundo primero.

### Trampa de preset auto-recommend

Un prompt así de "cinematográfico oscuro" se parece a presets de Higgsfield (p. ej. el preset **"IN THE DARK"**, id `24bae836-2c4a-48e0-89b6-49fcc0b21612`). Si el server detecta el parecido, devuelve un **`notice` de `type: preset_recommendation` SIN ejecutar** — no trae `results` ni `job_id`, y te quedas pensando que falló. **Fix:** añade `declined_preset_id:"<id>"` para forzar la generación literal de tu prompt. Más trampas en `knowledge/07-troubleshooting.md`.

---

## 6. Revisión del still — checklist antes de animar

No animes una imagen que no pasa este filtro (de `knowledge/05-biblia-hiperrealismo.md`):

- [ ] ¿Lee como **foto premium real**, no como render? Si hay "glow", "silhouette of light" o brillo CGI → **rehacer**.
- [ ] ¿Hay **grano de película** y halation reales, no un overlay digital pegado?
- [ ] **Coherencia de DOF:** sujeto nítido + bokeh de fondo coherente. Nítido-sobre-nítido = pegado = fallo.
- [ ] ¿La **paleta teal-naranja** está, con negros limpios (firma de Vision3 500T)?
- [ ] ¿La **composición Lanthimos** se respetó (figura baja, headroom verde grande, simetría)?
- [ ] ¿**Cero texto/logos** inventados en el frame?

Si pasa, este still es tu **start_image** para el vídeo. Guarda su `media_id` (si lo generaste vía MCP ya lo tienes; si lo subes, repite el flujo `media_upload → curl PUT → media_confirm`).

---

## 7. El movimiento — Seedance con RESTRAINT

Ahora le ponemos vida al plano. **Aquí es donde el 90% de los anuncios de IA se arruinan**: meten ojos que brillan, chispas mágicas, props que rotan solos, luces en cascada. Eso lee como **fantasía de Marvel ridícula, NO como cine**. Dirección de movimiento completa en `knowledge/06-direccion-movimiento.md`.

### 7.1. ¿Kling o Seedance?

| | `kling3_0` | `seedance_2_0` |
|---|---|---|
| **Para** | Movimiento **contenido**: retratos, talking heads, micro-movimiento (respiración, un parpadeo, sway de pelo) | Movimiento **complejo**: cámara en movimiento, parallax, físicas, líquidos, multi-actor sincronizado, transiciones atmosféricas |
| **Modos** | `std` / `pro` (1080p) / `4k` | `std` / `fast` (**no hay pro/4k**) |
| **Resolución** | — | `resolution:"1080p"` (default 720p → pásalo) |

Nuestro beat sheet incluye **un dolly push-in lento** (cámara en movimiento) + **bruma que cruza el haz de luz** (atmósfera) + el parpadeo. Eso es **cámara + atmósfera**, terreno de **`seedance_2_0`**. Si solo quisiéramos respiración y un parpadeo sin mover cámara, Kling sería suficiente y más barato.

### 7.2. Qué es movimiento cinematográfico real (la gramática Glazer/Lanthimos/Tarkovsky)

Pasa **muy poco**, pero cada beat es **exacto**:

- Un **dolly push-in lento imperceptible** (3-4%, no un zoom agresivo).
- **Un** gesto deliberado (no diez).
- Una **transición de iluminación** real (un fluorescente que muere parpadeando).
- **Bruma/polvo** atravesando los haces de luz.
- Una **respiración**. **Un** parpadeo.

Y lo que se PROHÍBE explícitamente en el prompt: ojos que brillan, estallidos de chispas, fairy dust, objetos levitando, props que rotan solos, luces en cascada mágicas.

### 7.3. El motion prompt en beats (inglés)

```
START: preserve the start image EXACTLY — same anonymous figure, same
surgical-green wall, same sodium-orange raking light, same 9:16 framing,
same Vision3 500T grade and film grain. DO NOT change wardrobe, set,
palette, pose, or composition.

CAMERA: one extremely slow dolly push-in, about 3–4% over the whole clip —
imperceptible, never a zoom. The frame breathes inward and stops.

BEAT 1 (0.0–2.0s): the figure stays perfectly still, affectless. A faint
haze of real atmospheric smoke drifts slowly left-to-right through the
sodium light beam. Film grain alive.

BEAT 2 (2.0–3.5s): the figure takes one slow, shallow breath — the chest
rises a few millimetres and settles. Nothing else moves.

BEAT 3 (3.5–5.0s): one single slow blink. The haze keeps drifting. The
dolly settles to a stop. Hold the unsettling stillness.

RESTRAINT: no glowing eyes, no sparks, no fairy dust, no levitation, no
spinning props, no magical cascading lights, no fast moves, no extra people.
Cinematic stillness in the grammar of Lanthimos and Glazer — almost nothing
happens, and every beat is exact.

Photographic realism, film grain preserved, no text.
```

### 7.4. La llamada a `generate_video`

```jsonc
// Higgsfield MCP → generate_video
{
  "model": "seedance_2_0",
  "params": {
    "prompt": "<el motion prompt en beats de la sección 7.3>",
    "mode": "std",               // std | fast  (NO existe pro ni 4k en seedance)
    "resolution": "1080p",       // default 720p → SIEMPRE pasar 1080p
    "aspect_ratio": "9:16",      // default es 16:9 → FORZAR vertical
    "genre": "auto"              // default
  },
  "medias": [
    { "role": "start_image", "value": "<media_id del still aprobado>" }
  ]
}
```

> **Los dos errores que te van a pasar si no miras:**
> 1. **`aspect_ratio` default es `16:9`.** Seedance **NO** auto-matchea al `start_image`. Si no fuerzas `"9:16"`, tu still vertical sale recortado o pillarboxed. **Siempre explícito.**
> 2. **`resolution` default es `720p`.** Para un anuncio pásalo a `"1080p"`. Y recuerda: en `seedance_2_0` el modo `pro`/`4k` **no existe** (eso es Kling); aquí solo `std` / `fast`.
>
> El `role` de la media de entrada es **`start_image`** (no `image`). Y el `sound` de Kling no aplica aquí.

### 7.5. Rate limit al batchear variantes

Si lanzas varias variantes del still o del clip a la vez, el plan ultra topa en **8 jobs concurrentes**. Pasarte devuelve **"Rate limit reached"**. Batchea en grupos de **≤8**.

---

## 8. Resumen del pipeline (cópialo como checklist)

1. **Perfil:** identidad no crítica + concepto surreal específico + film grain obligatorio.
2. **Decisión de modelo:**
   - ¿Hay ref del mundo? → **`nano_banana_pro`** (las Soul dropean refs).
   - ¿No hay ref y el concepto es describible? → **`soul_cinematic`** (prompt-only).
   - ¿No hay ref pero el concepto es demasiado específico? → **`nano_banana_pro`** igual.
3. **Subir ref** (si aplica): `media_upload → curl PUT → media_confirm`, `role:"image"`. No cambies de workspace.
4. **Prompt en 2 partes:** JSON Decoded Brief (→ `params.prompt`) + NL para el humano. `@image1` en orden. Termina en `Photographic realism, no text.`
5. **`generate_image`:** `nano_banana_pro`, `resolution:"4k"`, `aspect_ratio:"9:16"`. Si salta preset notice → `declined_preset_id`.
6. **Revisar** contra el checklist de hiperrealismo. Sin "glow"/CGI. DOF coherente. Cero texto.
7. **Movimiento:** Seedance (cámara + atmósfera) con **RESTRAINT** en beats. Preserva el start image EXACTO.
8. **`generate_video`:** `seedance_2_0`, `mode:"std"`, `resolution:"1080p"`, **`aspect_ratio:"9:16"` forzado**, `role:"start_image"`. Batchea ≤8.

---

### Ficheros relacionados

- `knowledge/00-metodologia-promptdirector.md` — la salida en 2 partes y los campos del brief.
- `knowledge/02-modelos-imagen.md` — por qué Soul dropea refs y nano_banana_pro las ancla.
- `knowledge/03-modelos-video.md` — defaults de Kling/Seedance y el lío del aspect_ratio.
- `knowledge/05-biblia-hiperrealismo.md` — film stocks, codas fotográficas, micro-imperfecciones.
- `knowledge/06-direccion-movimiento.md` — RESTRAINT y la gramática Lanthimos/Glazer.
- `knowledge/07-troubleshooting.md` — preset notice, rate limit, media_ids invalidados.
- `examples/ejemplo-ugc-personaje.md` — el caso opuesto: identidad facial ref-crítica.