<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 07 · Troubleshooting — Errores reales y cómo arreglarlos

> **Para qué sirve este archivo.** Es la guía de urgencias. Cuando una generación falla, sale rara, o el job ni siquiera se ejecuta, busca el **síntoma** en la tabla, lee la **causa** y aplica el **fix** (con el parámetro o el snippet exacto que tienes que pegar).
>
> Casi ningún error aquí es un "bug" del modelo. Son **valores por defecto que juegan en tu contra** (vertical que sale horizontal, vídeo a 720p, presets que secuestran tu prompt) o **patrones de prompt** que el modelo malinterpreta (la cara que driftea, la piel de cera). Una vez los conoces, dejan de pasarte.
>
> **Recordatorio de idioma:** la conversación con el usuario va en español, pero **todos los prompts y snippets de esta guía van en inglés** — los modelos de imagen/vídeo rinden mejor en inglés y los anchors/negativos pierden fuerza traducidos. Copia los snippets tal cual.

Archivos relacionados:
- `knowledge/01-higgsfield-mcp.md` — herramientas del MCP y flujo de subida de refs.
- `knowledge/02-modelos-imagen.md` — parámetros por modelo de imagen.
- `knowledge/03-modelos-video.md` — parámetros por modelo de vídeo.
- `knowledge/04-consistencia-personaje.md` — orden de refs, anchor words, skin-tone lock.
- `knowledge/05-biblia-hiperrealismo.md` — piel de cera, coda fotográfica, film stocks.
- `knowledge/06-direccion-movimiento.md` — restraint, talking head, prep de lipsync.

---

## 1. Tabla maestra: SÍNTOMA → CAUSA → FIX

> Lee la tabla para localizar tu caso; cada fila enlaza a una sección de abajo con el snippet completo para copiar.

| # | SÍNTOMA (lo que ves) | CAUSA (por qué pasa) | FIX (qué pegar / cambiar) |
|---|---|---|---|
| 1 | Error `mode 1080p not allowed` (o `invalid mode`) en vídeo | Estás pasando una resolución como si fuera `mode`. Cada modelo tiene su propio set de `mode` | Usa los `mode` válidos: **kling3_0** → `std` / `pro` / `4k` (pro = 1080p); **seedance_2_0** → `std` / `fast`. La resolución de seedance va en `resolution`, no en `mode`. → §2 |
| 2 | El vídeo sale **16:9** cuando lo querías **9:16** (vertical) | `aspect_ratio` por defecto es **16:9** en kling y seedance, y **no** auto-matchea al `start_image` | Pasa `aspect_ratio:"9:16"` **explícito** en cada job de vídeo. → §3 |
| 3 | **seedance** sale a **720p** y se ve blando | El default de `resolution` en seedance_2_0 es **720p** | Pasa `resolution:"1080p"` explícito. (En seedance `1080p` va en `resolution`, NO en `mode`.) → §4 |
| 4 | Lanzas un job y vuelve un **"notice"** sin `results` ni `job_id` | Tu prompt se parece a un **preset** del catálogo → el server devuelve un `preset_recommendation` y **no ejecuta** | Añade `declined_preset_id:"<id del preset>"` para forzar la generación literal. → §5 |
| 5 | Error `Rate limit reached` / `max 8 concurrent` | Plan ultra: máx **8 jobs concurrentes**. Lanzaste más a la vez | Batchea en grupos de **≤8** y espera a que cierren antes del siguiente lote. → §6 |
| 6 | Error `Media input not found` (una ref que ayer funcionaba) | **Cambiaste de workspace** → eso **invalida todos los `media_id`** | Re-sube las refs en el workspace actual (`media_upload` → PUT → `media_confirm`) y usa los nuevos `media_id`. → §7 |
| 7 | La **cara driftea** / no se aplica el cambio de avatar (mantiene la cara de la escena) | La scene ref tiene una persona parecida; el modelo conserva ESA cara. Refs en mal orden o sin rol | Reordena refs (identidad primero), añade anchor words al principio y un bloque REF ROLES con `DO NOT use the face of the man in @image3`. → §8 |
| 8 | **Manos / cuello / orejas** con un tono de piel que no es el del personaje | Skin-tone bleed: el modelo hereda el tono de piel de la persona en la scene ref | Skin-tone lock: bloquea TODA la piel visible al tono de `@image1`. → §9 |
| 9 | La piel se ve de **cera / plástico / muñeca** (CGI, no foto) | Prompts tipo `hyperrealistic 8k` / `ultra detailed` empujan al render liso, sin poros | Cambia esos términos por **micro-imperfecciones reales** (poros, vello, asimetría, brillo en zona T). → §10 |
| 10 | **Soul ignora tu ref** (devuelve variaciones de la ref o prompt vacío) | `soul_2` / `soul_cinematic` son **PROMPT-ONLY**: dropean las refs | No dependas de la ref: escribe un **prompt prompt-only verboso**. Si la identidad es crítica, usa `nano_banana_pro` con ref ancla. → §11 |
| 11 | El clip de **talking head** le inventa **cuello / hombros / cuerpo** | Kling completa el encuadre añadiendo cuerpo por debajo del mentón | "Floating HEAD ONLY": prohíbe explícitamente todo lo que esté bajo el mentón. → §12 |
| 12 | La imagen sale con **"AI gloss"** y la cara modificada (en personaje recurrente) | Estás usando `gpt_image_2`, que tiende a glaze facial y a modificar la cara | Para identidad recurrente usa `nano_banana_pro`. Reserva `gpt_image_2` para comparar fidelidad facial. → §13 |
| 13 | `soul_cinematic` **pierde un concepto surreal/específico** (p.ej. el caballo en la puerta) | Soul prioriza estilo cinematográfico; los conceptos muy específicos se diluyen | Para conceptos que importan, usa `nano_banana_pro` con una ref ancla del concepto. → §14 |
| 14 | La imagen sale a **1k** y se ve blanda (nano_banana_pro) | El default de `resolution` en nano_banana_pro es **1k** | Pasa `resolution:"4k"` explícito. → §15 |
| 15 | `gpt_image_2` sale con calidad pobre | El default de `quality` en gpt_image_2 es **low** | Pasa `quality:"high"`. → §15 |
| 16 | El server reporta `model:"nano_banana_2"` cuando pediste `nano_banana_pro` | Es un **fallback interno** del server, no un error | Normal. No cambies nada: la generación es válida. → §16 |
| 17 | La cara se mantiene 3-4 gens y luego **driftea** poco a poco | Drift acumulado por encadenar variantes de variantes | Re-ancla cada ~5 gens con un buen keyframe como nueva ref; sesión fresca cada 5-10 gens; re-genera desde el prompt estructural con TODAS las refs de identidad. → §17 |
| 18 | El movimiento del vídeo se ve **"Marvel"** (ojos que brillan, chispas, objetos levitando) | Pediste efectos mágicos; el modelo los ejecuta literalmente y rompe el realismo | Restraint: borra esos términos, pide micro-movimiento (push-in 3-4%, un parpadeo, bruma en el haz). → §18 |
| 19 | El **lipsync** no encaja / bocas mal sincronizadas | Lipsync **no está expuesto por el MCP**; además el clip base no tenía la línea de diálogo | Genera el clip con la **línea de diálogo LITERAL entre comillas** y aplica el lipsync **después en la web UI** de Higgsfield. → §19 |
| 20 | Drift de **gorro / pelo / ropa** al meter un personaje conocido en una escena nueva | No incluiste una ref canónica de vestuario | Wardrobe lock: adjunta siempre una ref canónica de vestuario/estilo. → §20 |
| 21 | El sujeto se ve **"pegado"** sobre el fondo (todo nítido) | Falta coherencia de profundidad de campo | Pide DOF coherente: sujeto nítido + bokeh de fondo, no nítido-sobre-nítido. → §21 |
| 22 | El job de **nano_banana_pro** rechaza `role:"reference"` o lo cambia solo | El server **coacciona** `role:"reference"` → `"image"` | Pasa `medias[].role:"image"` directamente para evitar confusión. → §22 |

---

## 2. `mode 1080p not allowed` — modes válidos por modelo

**Causa:** `1080p` no es un `mode`. Es una resolución. Cada modelo de vídeo tiene su propio enum de `mode`, y meter ahí una resolución revienta el job.

**Modes válidos:**

| Modelo | `mode` permitidos | Notas |
|---|---|---|
| `kling3_0` | `std` / `pro` / `4k` | `pro` = 1080p. La resolución se controla por el `mode`. |
| `seedance_2_0` | `std` / `fast` | **No existe** `pro` ni `4k`. La resolución va aparte, en `resolution`. |

```jsonc
// kling3_0: quieres 1080p → usa mode "pro" (NO "1080p")
{ "model": "kling3_0", "mode": "pro", "aspect_ratio": "9:16" }

// seedance_2_0: el 1080p va en resolution, el mode es std/fast
{ "model": "seedance_2_0", "mode": "std", "resolution": "1080p", "aspect_ratio": "9:16" }
```

Detalle completo de cada modelo de vídeo en `knowledge/03-modelos-video.md`.

---

## 3. El vídeo sale 16:9 cuando querías 9:16 (vertical)

**Causa:** tanto `kling3_0` como `seedance_2_0` tienen `aspect_ratio` por defecto en **16:9**, y **no** lo auto-ajustan al formato de tu `start_image`. Si subes un keyframe vertical y no pasas el ratio, te lo recorta/encaja a horizontal.

**Fix:** pasa `aspect_ratio:"9:16"` **explícito** en cada job de vídeo vertical. No confíes en el start_image.

```jsonc
{ "model": "kling3_0",    "mode": "pro", "aspect_ratio": "9:16" }
{ "model": "seedance_2_0","mode": "std", "resolution": "1080p", "aspect_ratio": "9:16" }
```

> Regla mental: **el aspect_ratio se pasa SIEMPRE, en todos los jobs de vídeo.** Es el error más frecuente y el más caro (re-render entero).

---

## 4. seedance sale a 720p

**Causa:** el default de `resolution` en `seedance_2_0` es **720p**. Si no lo fuerzas, te entrega un vídeo blando que no aguanta un ad premium.

**Fix:** pasa `resolution:"1080p"` explícito. Recuerda: en seedance el `1080p` va en `resolution`, **no** en `mode` (el `mode` es `std` / `fast`).

```jsonc
{ "model": "seedance_2_0", "mode": "std", "resolution": "1080p", "aspect_ratio": "9:16" }
```

---

## 5. El job no se ejecuta y vuelve un "notice" de preset

**Causa:** la **trampa del preset auto-recommend.** Si tu prompt se parece a un preset del catálogo (el caso clásico es `IN THE DARK`, id `24bae836-2c4a-48e0-89b6-49fcc0b21612`), el server responde con un objeto `notice` de `type: preset_recommendation` y **NO ejecuta** — no trae `results` ni `job_id`. Parece que "no pasa nada".

**Cómo detectarlo:** la respuesta no tiene `job_id` ni `results`; tiene un `notice`/`preset_recommendation` con un `preset_id`.

**Fix:** añade `declined_preset_id:"<ese preset_id>"` para decirle al server "no quiero el preset, genera mi prompt literal".

```jsonc
{
  "model": "soul_cinematic",
  "params": { "prompt": "...your literal prompt..." },
  "declined_preset_id": "24bae836-2c4a-48e0-89b6-49fcc0b21612"
}
```

> El `id` a declinar es el que venga en ESE `notice`. El de `IN THE DARK` es solo el ejemplo más habitual.

---

## 6. `Rate limit reached` / max 8 concurrent

**Causa:** el plan ultra permite un **máximo de 8 jobs concurrentes**. Si disparas un lote grande (p.ej. 12 keyframes de golpe), los que excedan 8 fallan con `Rate limit reached`.

**Fix:** **batchea en grupos de ≤8.** Lanza un lote, espera a que cierren (chequea con `job_display` / `show_generations`), y entonces lanza el siguiente.

> Para un guión de muchos beats: divide la lista de prompts en tandas de 8. No es opcional — el server rechaza el 9.º sin contemplaciones.

---

## 7. `Media input not found` (tras cambiar de workspace)

**Causa:** **cambiar de workspace INVALIDA todos los `media_id`.** Una ref que subiste y usaste sin problema deja de existir para el server en cuanto saltas de workspace (esto cuadra con la nota de memoria de que los `media_id` quedan "stale" tras reconectar/cambiar de contexto).

**Fix:** re-sube las refs en el workspace actual y usa los nuevos `media_id`. El flujo completo de subida:

```bash
# 1) Pide el upload presigned
media_upload(files:[{ filename:"ref_identity.png", content_type:"image/png" }])
#    → devuelve { upload_url, media_id }

# 2) Sube el binario al presigned URL
curl -X PUT -H "Content-Type: image/png" \
  --data-binary @ref_identity.png '<upload_url>'

# 3) Confirma
media_confirm(media_ids:["<media_id>"], type:"image")

# 4) Usa el media_id como medias[].value en generate_image / generate_video
```

> Comprueba en qué workspace estás con `list_workspaces` / `select_workspace` antes de culpar a la ref. Más detalle en `knowledge/01-higgsfield-mcp.md`.

---

## 8. La cara driftea / no se aplica el cambio de avatar

**Causa:** normalmente **no** es que el modelo "no sepa" la cara — es que la **scene ref (`@image3`) contiene una persona parecida y el modelo mantiene ESA cara**. También pasa por refs en mal orden o sin rol explícito.

**Fix — los cuatro movimientos juntos:**

1. **Orden de refs:** identity sheet multiángulo primero (`@image1`), selfie close-up (`@image2`), scene/wardrobe después (`@image3`). El primer adjunto pesa más. Máx 3-4 refs.
2. **Anchor words al principio:** la descripción física del personaje va ANTES de los `@image`, para que los tokens atmosféricos no diluyan la cara.
3. **Rol explícito por ref.**
4. **Negativo repetido** sobre la cara de la scene ref.

```text
[ANCHOR WORDS — al principio] A 34-year-old man, square jaw, dark brown
short hair, light olive skin, faint stubble, brown eyes, thick eyebrows.

[REF ROLES]
- Use @image1 for facial identity and hair.
- Use @image2 to confirm facial features (close-up).
- Use @image3 ONLY for pose, wardrobe and setting. Replace the man in
  @image3 with the person from @image1.
- DO NOT use the face of the man in @image3.
- DO NOT use the face of the man in @image3.   // repetido a propósito
```

> Evita decir `keep @image3 exactly` — eso le ordena conservar la cara que quieres reemplazar. Metodología completa en `knowledge/04-consistencia-personaje.md`.

---

## 9. Manos / cuello / orejas con un tono de piel ajeno

**Causa:** **skin-tone bleed.** El modelo coge la cara de `@image1` pero hereda el tono de piel del cuerpo de la persona en la scene ref (`@image3`), así que cuello, orejas y manos salen con otro tono. Delata el montaje al instante.

**Fix — skin-tone lock:** bloquea TODA la piel visible al tono de `@image1`.

```text
ALL visible skin — face, neck, ears, hands, wrists — must match the skin
tone of @image1. Do NOT inherit the skin tone of the person in @image3.
```

---

## 10. Piel de cera / plástico (CGI, no foto)

**Causa:** términos como `hyperrealistic 8k`, `ultra detailed`, `flawless skin` empujan al modelo a una piel lisa y pulida — el look "render", no el look foto. Es un fallo (ver biblia de hiperrealismo: lo estilizado/CGI es FALLO).

**Fix:** sustituye esos términos por **micro-imperfecciones reales**:

```text
visible skin pores, faint stubble, subsurface scattering on ears and nose,
individual eyebrow hairs, slight facial asymmetry, one flyaway hair strand,
fine vellus hair on cheeks, micro lip texture, subtle T-zone oil sheen.
```

Y cierra con la **coda fotográfica** para activar priors de foto sobre ilustración:

```text
shot on [camera], [lens]mm, f/[N], ISO [N], natural color grade,
photographic realism, no text.
```

> Más en `knowledge/05-biblia-hiperrealismo.md`. Verbos que ayudan: `photographed`, `lit by`, `shot on`, `wreathed in real smoke`. Verbos que sabotean: `rendered as`, `glow`, `silhouette of light`.

---

## 11. Soul ignora tu ref (devuelve solo variaciones de la ref)

**Causa:** `soul_2` (alias `text2image_soul_v2`) y `soul_cinematic` son **PROMPT-ONLY**. **Dropean las refs**: los jobs lanzados con ref guardan `prompt:""` internamente y solo regeneran variaciones de esa ref. No es un bug, es el diseño del modelo.

**Fix:**

- Si usas Soul, **no dependas de la ref**: escribe un **prompt prompt-only verboso** que describa todo (sujeto, luz, lente, paleta, mood) sin apoyarte en `@imageN`. Soul es para **explorar estilo** cinematográfico/editorial/UGC donde la identidad no es ref-crítica.
- Si la **identidad sí importa**, NO uses Soul: usa `nano_banana_pro` con ref ancla (líder en preservación de identidad 2026).

```jsonc
// Mal: soul con ref esperando que la respete → la dropea
{ "model": "soul_cinematic", "medias": [{ "role":"image", "value":"<id>" }] }

// Bien: soul prompt-only verboso (sin medias)
{ "model": "soul_cinematic", "params": { "prompt": "<descripción larga y específica>" } }

// Si la identidad es crítica: nano_banana_pro con ref
{ "model": "nano_banana_pro", "resolution":"4k",
  "medias": [{ "role":"image", "value":"<identity_id>" }],
  "params": { "prompt": "<anchor words + @image1 + escena>" } }
```

---

## 12. El talking head añade cuello / hombros / cuerpo

**Causa:** al animar/generar una cabeza, Kling "completa" el encuadre inventando cuello, hombros y torso por debajo del mentón. Rompe el plano de talking head flotante.

**Fix — "floating HEAD ONLY":** prohíbe explícitamente todo lo que esté bajo el mentón.

```text
Floating HEAD ONLY, like a vinyl figurine head reference.
DO NOT add neck, shoulders, chest, body, or any clothing below the chin.
The head floats; nothing exists below the jaw line.
```

> Detalle de dirección de cabezas y lipsync en `knowledge/06-direccion-movimiento.md`.

---

## 13. "AI gloss" y cara modificada en un personaje recurrente

**Causa:** estás generando con `gpt_image_2`, que **tiende al "AI gloss" y a modificar la cara**. Mortal para un personaje que tiene que verse idéntico en 10 beats.

**Fix:** para identidad recurrente usa **`nano_banana_pro`**. `gpt_image_2` solo vale para una cosa puntual: **comparar fidelidad facial** entre opciones. Y si lo usas, sube la calidad:

```jsonc
{ "model": "gpt_image_2", "quality": "high" }   // default es "low"
```

---

## 14. soul_cinematic pierde un concepto surreal/específico

**Causa:** `soul_cinematic` prioriza el acabado cinematográfico y **pierde conceptos muy específicos o surreales** (p.ej. "un caballo de pie en el marco de una puerta de un interior doméstico"). Te da una imagen bonita pero sin el concepto.

**Fix:** si el concepto **importa**, no lo dejes en manos de Soul: usa `nano_banana_pro` con una **ref ancla** del concepto y descripción verbosa. Soul para estilo; nano_banana_pro para conceptos que tienen que aparecer sí o sí.

---

## 15. Imagen blanda / calidad pobre por defaults

**Causa:** los modelos de imagen nacen en su calidad baja para abaratar; hay que subirla a mano.

**Fix por modelo:**

```jsonc
{ "model": "nano_banana_pro", "resolution": "4k" }   // default 1k → fuérzalo a 4k
{ "model": "gpt_image_2",      "quality": "high" }    // default low → fuérzalo a high
```

- `soul_2` / `soul_cinematic`: default quality **2k** (suele bastar).
- Truco de coste: `get_cost:true` hace un **preflight de coste** sin lanzar el job — úsalo antes de batches de 4k.

Tabla completa en `knowledge/02-modelos-imagen.md`.

---

## 16. El server reporta `nano_banana_2` cuando pediste `nano_banana_pro`

**Causa:** es un **fallback interno** del server. Pides `nano_banana_pro` y el job puede reportar `model:"nano_banana_2"` por debajo.

**Fix:** **ninguno — es normal.** La generación es válida y la preservación de identidad sigue siendo la de nano_banana_pro. No reintentes ni cambies el modelo por esto.

---

## 17. La cara driftea poco a poco tras varias gens

**Causa:** **drift acumulado.** Encadenar "variante de la variante de la variante" arrastra pequeños errores hasta que la cara ya no es la misma.

**Fix:**

- **Re-ancla cada ~5 gens:** coge un keyframe bueno y úsalo como **nueva ref de identidad**.
- **Sesión fresca cada 5-10 gens.**
- **No encadenes variante-de-variante:** vuelve al **prompt estructural** que funcionó y re-genera con **TODAS las refs de identidad adjuntas**, no partiendo del último output.
- **Volumen alto (10+ beats):** entrena un **Soul ID** (15-25 fotos variadas, ~3-5 min) para tener un token de identidad persistente.

Detalle en `knowledge/04-consistencia-personaje.md`.

---

## 18. El movimiento se ve "Marvel" (chispas, brillos, levitación)

**Causa:** pediste efectos mágicos (ojos que brillan, fairy dust, props que rotan solos, luces en cascada) y el modelo los ejecuta literalmente. Resultado: fantasía ridícula, no cine.

**Fix — restraint.** Borra todo término mágico y pide micro-movimiento real:

```text
Cinematic restraint. Slow imperceptible dolly push-in (3–4%).
One deliberate gesture. A single blink. Soft haze drifting through the
light beam. A quiet breath. NOTHING levitates, no sparks, no glowing eyes,
no magical light cascades, no objects rotating on their own.
```

> Gramática Glazer/Lanthimos/Tarkovsky: pasa muy poco, pero cada beat es exacto. Más en `knowledge/06-direccion-movimiento.md`.

---

## 19. El lipsync no encaja / bocas mal sincronizadas

**Causa:** **el lipsync NO está expuesto por el MCP** (Sync Lipsync 2 Pro, Kling Lipsync, Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk — ninguno es llamable vía MCP). Si además generaste el clip base sin la línea de diálogo, las formas de boca no sincronizan.

**Fix — workflow en dos pasos:**

1. **Genera el clip con movimiento de boca** metiendo la **línea de diálogo LITERAL entre comillas** en el prompt (eso fuerza formas de boca sintetizables). Preserva EXACTAMENTE la composición del start-image.

   ```text
   The character says, clearly mouthing the words: "we tried everything,
   and nothing worked." Lips move naturally to form these exact words.
   DO NOT change wardrobe, background or pose from the start image.
   ```

2. **Aplica el lipsync después en la web UI de Higgsfield** (Sync Lipsync 2 Pro / Kling Lipsync / etc.).

> Si el flujo usa `wan2_7` (único modelo audio-sync expuesto por MCP: start_image + audio → vídeo sincronizado, 4:3 nativo, 1080p, 2-15s), termina el prompt con `Audio/voice to lipsync is <<<audio_1>>>`. Coreografía de gestos por timestamps en `knowledge/06-direccion-movimiento.md`.

---

## 20. Drift de gorro / pelo / ropa al cambiar de escena

**Causa:** metiste un personaje conocido en una escena nueva **sin una ref canónica de vestuario/estilo**. El modelo improvisa gorro, peinado y ropa distintos en cada gen.

**Fix — wardrobe lock:** adjunta **siempre** una ref canónica de vestuario/estilo cuando trabajes un personaje conocido en escenas nuevas, y refiérela con su rol.

```text
Use @image4 for canonical wardrobe and styling (beanie, jacket, hair).
Keep wardrobe and hair consistent with @image4.
```

---

## 21. El sujeto se ve "pegado" sobre el fondo

**Causa:** falta **coherencia de profundidad de campo.** Si el sujeto y el fondo están ambos nítidos (nítido-sobre-nítido), parece un recorte pegado, no una foto.

**Fix:** pide DOF coherente — sujeto nítido con bokeh de fondo acorde a la apertura que declaraste:

```text
Subject in sharp focus; background falls into coherent bokeh consistent
with f/2.0. Shallow depth of field, natural focus falloff.
```

---

## 22. nano_banana_pro y el `role` de las refs

**Causa:** el server **coacciona** `medias[].role:"reference"` → `"image"`. Si pasas `"reference"` puede parecer que "cambia tu input".

**Fix:** pasa directamente `role:"image"`. Para nano_banana_pro **el role correcto es `"image"`**.

```jsonc
{ "model": "nano_banana_pro", "resolution": "4k",
  "medias": [{ "role": "image", "value": "<media_id>" }] }
```

> Recuerda los límites de refs: nano_banana_pro admite hasta 14, pero la atención se diluye pasadas **3-4**. Para vídeo, el role es `"start_image"` (kling/seedance).

---

## 3 reglas de oro (para no acabar en esta tabla)

1. **Pasa siempre los defaults a mano:** `aspect_ratio:"9:16"`, `resolution:"4k"` (imagen) / `"1080p"` (seedance), `quality:"high"` (gpt). Casi la mitad de la tabla son defaults no forzados.
2. **Ordena y nombra tus refs:** identidad primero, anchor words al principio, rol explícito, negativos sobre la cara de la scene ref. La consistencia de personaje se gana en el prompt, no rezando.
3. **Realismo por micro-imperfección, restraint en movimiento:** nada de `8k hyperrealistic` ni de chispas mágicas. `photographed`, poros, un parpadeo, un push-in de 3%.