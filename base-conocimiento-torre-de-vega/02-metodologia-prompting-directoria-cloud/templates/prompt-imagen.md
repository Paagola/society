# Plantilla — Prompt de imagen (copy-paste)

> **Qué es esto.** El molde reutilizable para generar un *still* con `generate_image` del MCP de Higgsfield siguiendo la metodología PromptDirector. Cada prompt sale **en dos partes**: (1) un **JSON Decoded Brief** con todos los campos, y (2) un **párrafo en lenguaje natural (NL)** que reescribe esos mismos campos en prosa y cierra con la coda fotográfica.
>
> **Por qué el prompt va en INGLÉS.** Los modelos de imagen entienden y rinden mejor en inglés: el vocabulario fotográfico (lentes, aperturas, film stock, micro-imperfecciones) está sobre-representado en sus datos de entrenamiento. Con el usuario se conversa en su idioma; **el prompt final se entrega en inglés**. Por eso los esqueletos y el ejemplo de abajo están en inglés y los comentarios/instrucciones en español.
>
> **Dónde encaja.** Esta plantilla es el paso "prompt" del pipeline. Para el ráciter de por qué cada campo existe, ver `knowledge/00-metodologia-promptdirector.md`. Para elegir y configurar el modelo, ver `knowledge/02-modelos-imagen.md`. Para bloquear una cara recurrente, combinar con `templates/ref-stack-personaje.md`.

---

## 0. Cómo se usa esta plantilla (lectura de 30 segundos)

1. **Rellena el JSON Decoded Brief** (Sección 1). Cada campo está comentado con qué meter.
2. **Reescribe el JSON en el párrafo NL** (Sección 2): la prosa incorpora *cada* campo del JSON, no un resumen. Termina SIEMPRE con la coda fotográfica + `Photographic realism, no text.`
3. **Decide el payload según modelo** (Sección 4):
   - `nano_banana_pro` y `gpt_image_2` → manda el **JSON brief stringificado** como `params.prompt` (con los tokens `@image1/@image2…` ya incrustados). Enséñale al usuario el JSON (para la API) **y** el NL (para revisión humana).
   - `soul_*` → **PROMPT-ONLY**: solo el párrafo NL, sin refs (las dropea). Ver Sección 4.
4. **Adjunta refs** en `medias[]` en el ORDEN exacto en que las nombras (`@image1` = primer adjunto). `role` siempre `"image"`. Ver `templates/ref-stack-personaje.md`.

> **Regla de rigor.** Nunca inventes marcas, nombres ni texto legible (por eso cerramos en `no text`). Mete micro-imperfecciones reales en vez de "8k hyperrealistic". Si un campo no se puede inferir del brief del usuario, **omítelo** — no lo fabriques. Donde no sepas un valor exacto, escribe `(verificar)`.

---

## 1. Esqueleto — JSON Decoded Brief (rellenar campos vacíos)

```json
{
  "subject_identity": "",   // QUIÉN/QUÉ es el sujeto. Si hay personaje con ref, mete las ANCHOR WORDS aquí (descripción física: edad aprox., tono de piel, pelo, rasgos) ANTES de los @imageN, para que la cara no se diluya. Ej: "a 30-year-old man, warm light-olive skin, short dark stubble — use @image1 for facial identity"
  "realism": "",            // Nivel/tipo de realismo. SIEMPRE foto, nunca render. Ej: "real premium-ad photography, shot on location, not CGI, not illustration"
  "environment": "",        // DÓNDE. Lugar, hora del día, props, escala. Mete DIMENSIONES en cm si hay producto (los generadores inflan objetos sin medidas). Ej: "a dim apartment kitchen at dusk; a 90 ml perfume bottle, ~7×6×4 cm, sitting in the palm"
  "lighting": "",           // CÓMO está iluminado. Fuente + dirección + calidad. Verbos de luz reales: "lit by", "wreathed in real smoke". Ej: "single soft window light from camera-left, deep falloff into shadow"
  "camera": {
    "lens_mm": "",          // Distancia focal. Ej: "85" (retrato), "35" (ambiente), "50"
    "aperture_f": "",       // Apertura. Ej: "1.8" (DOF poco profundo), "5.6"
    "iso": "",              // Ej: "400"
    "shutter": "",          // Ej: "1/200"
    "lens_to_subject_m": "",// Distancia lente→sujeto en metros. Ej: "1.5"
    "subject_to_bg_m": "",  // Distancia sujeto→fondo en metros (gobierna el bokeh). Ej: "3"
    "cct_k": ""             // Temperatura de color en Kelvin. Ej: "3200" (cálido), "5600" (día)
  },
  "composition": "",        // Encuadre, regla de tercios, ángulo, headroom. Ej: "medium close-up, subject on left third, eye-level, slight negative space right"
  "imperfections": "",      // MICRO-IMPERFECCIONES reales (no "8k"). Ej: "visible skin pores, faint stubble, one flyaway hair, subsurface scattering on the ears, micro lip texture, T-zone oil sheen"
  "palette": "",            // Paleta de color. Ej: "warm amber and deep teal shadows, desaturated midtones"
  "mood": "",               // Emoción/tono. Ej: "intimate, restrained, late-night editorial"
  "film_stock": "",         // OPCIONAL pero potente. Activa priors de foto. Ej: "Kodak Portra 400" / "Kodak Vision3 500T" / "Mamiya 7 80mm" / "anamorphic"
  "negatives": ""           // Qué NO quieres. Ej: "no CGI gloss, no plastic skin, no text, no watermark, no extra fingers, no inflated product scale"
}
```

> **Tokens de refs.** Cuando haya varias refs, nómbralas explícitamente (`@image1`, `@image2`, `@image3`) en el campo donde manden — nunca "the reference image" en vago. El orden debe coincidir con `medias[]`. Para roles por ref ("usa @image1 para cara, @image3 para pose/wardrobe"), ver `templates/ref-stack-personaje.md`.

---

## 2. Esqueleto — Párrafo en lenguaje natural (huecos `[LIKE_THIS]`)

> Reescribe cada campo del JSON en prosa. Las **specs de cámara son obligatorias** en el NL. Cierra siempre con la coda fotográfica.

```
[ANCHOR_WORDS: physical description of the subject — age, skin tone, hair, build].
Use @image1 for facial identity and hair. [REF_ROLES if more than one ref].
A [REALISM_PHRASE: e.g. real premium-ad photograph, not CGI] of [SUBJECT] in
[ENVIRONMENT, with explicit cm dimensions if a product is present].
The scene is [LIGHTING: source + direction + quality, using real light verbs like
"lit by" / "wreathed in real smoke"], in a palette of [PALETTE], with a
[MOOD] mood.
Composition: [COMPOSITION — framing, angle, thirds, headroom].
The skin shows [IMPERFECTIONS: pores, stubble, one flyaway strand, subsurface
scattering, micro lip texture, T-zone oil sheen — choose real ones].
Shot on [CAMERA_BODY/STOCK, e.g. Kodak Portra 400], [LENS_MM]mm, f/[APERTURE],
ISO [ISO], [SHUTTER], lens-to-subject [LENS_TO_SUBJECT]m, subject-to-background
[SUBJECT_TO_BG]m, color temperature [CCT]K, natural color grade.
[NEGATIVES, phrased positively where possible].
Photographic realism, no text.
```

> **La coda fotográfica no es decorativa.** "Shot on… / lens / f/ / ISO / natural color grade / Photographic realism, no text." activa los priors de *fotografía* sobre los de ilustración. Es la diferencia entre un still que parece un ad real y uno que huele a render. Detalle en `knowledge/05-biblia-hiperrealismo.md`.

---

## 3. Ejemplo relleno (UGC / personaje recurrente con `nano_banana_pro`)

### 3a. JSON Decoded Brief (esto es lo que va en `params.prompt`)

```json
{
  "subject_identity": "Elliot, a 34-year-old man, warm light-olive skin, short dark stubble, tired hazel eyes — use @image1 for facial identity and hair, @image2 (close-up selfie) to lock fine facial detail",
  "realism": "real premium-ad photograph, shot on location, not CGI, not illustration",
  "environment": "a cramped late-night apartment kitchen, fluorescent tube overhead half-dead, an open laptop and a cold mug of coffee on the counter",
  "lighting": "hard greenish fluorescent from above mixed with cool blue spill from the laptop screen; deep falloff into the unlit corners of the room",
  "camera": {
    "lens_mm": "35",
    "aperture_f": "2.0",
    "iso": "800",
    "shutter": "1/100",
    "lens_to_subject_m": "1.2",
    "subject_to_bg_m": "2.5",
    "cct_k": "4000"
  },
  "composition": "medium shot, subject seated on the right third, eye-level, slight negative space camera-left, slight Dutch tilt",
  "imperfections": "visible skin pores, faint stubble, subsurface scattering on the ears and nose, individual eyebrow hairs, one flyaway strand, fine vellus hair on the cheek, micro lip texture, faint T-zone oil sheen, slight facial asymmetry",
  "palette": "sickly fluorescent green highlights, cold blue screen spill, muddy desaturated midtones",
  "mood": "exhausted, honest, unglamorous late-night confessional",
  "film_stock": "Kodak Vision3 500T",
  "negatives": "no CGI gloss, no plastic skin, no glowing eyes, no text, no watermark, no extra fingers, do not change the face from @image1"
}
```

### 3b. Párrafo NL (para revisión humana; en `soul_*` sería esto lo único que se manda)

```
Elliot, a 34-year-old man, warm light-olive skin, short dark stubble, tired hazel
eyes. Use @image1 for facial identity and hair, and @image2 (close-up selfie) to
lock fine facial detail; do not alter the bone structure or skin tone.
A real premium-ad photograph — shot on location, not CGI — of Elliot seated alone
in a cramped late-night apartment kitchen: a half-dead fluorescent tube overhead,
an open laptop and a cold mug of coffee on the counter.
The scene is lit by hard greenish fluorescent from above mixed with cool blue spill
from the laptop screen, with deep falloff into the unlit corners; the palette is
sickly fluorescent green, cold blue screen spill and muddy desaturated midtones,
in an exhausted, honest, unglamorous late-night mood.
Composition: medium shot, subject on the right third, eye-level, a sliver of
negative space camera-left, a slight Dutch tilt.
The skin shows visible pores, faint stubble, subsurface scattering on the ears and
nose, individual eyebrow hairs, one flyaway strand, fine vellus hair on the cheek,
micro lip texture, a faint T-zone oil sheen and slight facial asymmetry.
Shot on Kodak Vision3 500T, 35mm, f/2.0, ISO 800, 1/100, lens-to-subject 1.2m,
subject-to-background 2.5m, color temperature 4000K, natural color grade.
No CGI gloss, no plastic skin, no glowing eyes.
Photographic realism, no text.
```

> Fíjate: el NL **no resume** el JSON, lo *traduce a prosa* campo por campo, y mete las specs de cámara dentro de la frase. El JSON va a la API; el NL es para que el humano valide criterio antes de gastar créditos.

---

## 4. Adaptar por modelo (chuleta)

> Solo parámetros confirmados en el ground truth del MCP. Detalle completo en `knowledge/02-modelos-imagen.md`.

| Modelo | Qué pasar además del prompt | Payload del prompt | Refs |
|---|---|---|---|
| `nano_banana_pro` | `resolution:"4k"` (default 1k — **pásalo siempre**); `aspect_ratio` soportado | JSON brief stringificado con `@imageN` incrustados | Sí. `role` **debe** ser `"image"`. Hasta 14, pero la atención se diluye pasadas 3-4. Líder en preservación de identidad. |
| `gpt_image_2` | `quality:"high"` (default `low` — **pásalo**) | JSON brief stringificado | Sí, pero tiende a "AI gloss" y a **modificar la cara** → evitar para identidad recurrente; sirve para comparar fidelidad facial |
| `soul_2` / `soul_cinematic` | quality default 2k; aspect_ratio según necesites | **Solo el párrafo NL** | **PROMPT-ONLY**: ignora/dropea las refs. Para estilo cinematográfico/editorial/UGC donde la identidad no es ref-crítica |
| `marketing_studio_image` | default comercial | JSON brief stringificado | Default para producto/ads |

**Notas operativas que importan:**

- **`nano_banana_pro`** puede reportar internamente `model:"nano_banana_2"` (fallback). Es normal, no es un error.
- **`soul_cinematic`** **pierde conceptos muy específicos o surreales**. Si el concepto es raro/preciso y debe sobrevivir, usa `nano_banana_pro` con una ref ancla en vez de soul.
- **Preflight de coste:** añade `get_cost:true` para ver el coste sin lanzar el job.
- **Trampa preset auto-recommend:** si tu prompt se parece a un preset, el server devuelve un `notice` (type `preset_recommendation`) **sin ejecutar** (no trae `results`/`job_id`). Fix: añade `declined_preset_id:"<id>"` para forzar la generación literal. (Detalle y casos en `knowledge/07-troubleshooting.md`.)
- **Rate limit:** máx 8 jobs concurrentes. Batchea en grupos de ≤8.

### Esqueleto de llamada (referencia — `nano_banana_pro` con refs)

```jsonc
// generate_image
{
  "model": "nano_banana_pro",
  "resolution": "4k",            // <- default es 1k, pásalo siempre
  "aspect_ratio": "9:16",        // ajusta al formato del entregable
  "prompt": "<<JSON Decoded Brief de la Sección 1, stringificado, con @image1/@image2 incrustados>>",
  "medias": [
    { "role": "image", "value": "<media_id_de_la_ref_1>" },  // = @image1
    { "role": "image", "value": "<media_id_de_la_ref_2>" }   // = @image2
  ]
  // "get_cost": true            // <- descomenta para preflight de coste sin lanzar
}
```

```jsonc
// generate_image — soul (PROMPT-ONLY, sin medias)
{
  "model": "soul_cinematic",
  "prompt": "<<solo el párrafo NL de la Sección 2>>"
  // NO adjuntar medias: soul las dropea (job con ref guarda prompt:"" y regenera variaciones de la ref)
}
```

> El flujo de subida de refs (`media_upload` → `curl PUT` → `media_confirm` → usar `media_id`) está en `knowledge/01-higgsfield-mcp.md`. Recuerda: cambiar de workspace **invalida** todos los `media_id` y hay que re-subir.

---

## 5. Checklist final antes de lanzar

- [ ] El JSON tiene **todos** los campos rellenos o conscientemente omitidos (nada fabricado; `(verificar)` donde no sepa).
- [ ] El NL incorpora **cada** campo del JSON, no un resumen.
- [ ] Las **specs de cámara** (lens/f/ISO/shutter/distancias/CCT) están en el párrafo NL.
- [ ] Hay **micro-imperfecciones reales** (no "8k hyperrealistic").
- [ ] Si hay producto: **dimensiones en cm** explícitas.
- [ ] Si hay personaje con ref: **anchor words al principio**, tokens `@imageN` en el orden de `medias[]`, `role:"image"`.
- [ ] El NL **termina** en coda fotográfica + `Photographic realism, no text.`
- [ ] **Parámetro del modelo** correcto: `resolution:"4k"` (nano_banana_pro) / `quality:"high"` (gpt_image_2) / **prompt-only sin refs** (soul).
- [ ] Cero marcas/texto inventado. (Si hay que reproducir un logo real desde la ref, hazlo 1:1 — ver `knowledge/05-biblia-hiperrealismo.md`.)