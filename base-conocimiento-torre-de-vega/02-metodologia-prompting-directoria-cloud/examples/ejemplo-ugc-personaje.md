# Ejemplo trabajado — Ad UGC con personaje recurrente (talking head vertical)

> **Qué vas a ver aquí.** Un caso completo, de principio a fin, sin saltos: desde lo que el agente averigua en el onboarding hasta el clip final con la boca sincronizada. El objetivo es que puedas **copiar el criterio**, no solo el resultado. Cada decisión va explicada con su *porqué*.
>
> **Idioma.** Toda la narración va en español porque hablas con el cliente en su idioma. **Todos los prompts van en inglés**, siempre, porque los modelos de imagen y vídeo de Higgsfield rinden notablemente mejor con instrucciones en inglés (su entrenamiento es mayoritariamente anglosajón; el español les introduce ruido y deriva). Regla de oro del paquete: *se conversa con el usuario en su idioma, pero el prompt final se entrega en inglés.*
>
> **Datos.** Nombres, marcas y referencias de este ejemplo son **inventados y genéricos**. No corresponden a ningún cliente real.

Archivos hermanos que conviene tener a mano mientras lees:
- `knowledge/00-metodologia-promptdirector.md` — la metodología de los 2 bloques (JSON + NL).
- `knowledge/02-modelos-imagen.md` — por qué `nano_banana_pro` para identidad.
- `knowledge/03-modelos-video.md` — por qué `kling3_0` para un talking head.
- `knowledge/04-consistencia-personaje.md` — orden de refs, anchor words, REF ROLES.
- `knowledge/06-direccion-movimiento.md` — restraint cinematográfico + prep de lipsync.
- `templates/talking-head-lipsync.md` — la plantilla pura de la que sale el motion prompt.
- `templates/ref-stack-personaje.md` — el stack de referencias que montamos aquí.

---

## 0. El encargo en una frase

> *"Tengo un personaje que uso en todos mis vídeos. Quiero un anuncio vertical, formato UGC, en el que ella hable a cámara en un salón de casa, como si estuviera grabando con el móvil. Que se note que es la misma persona de siempre."*

Tres exigencias escondidas en esa frase, y todas marcan el pipeline:

1. **"el mismo personaje de siempre"** → identidad *ref-crítica*. No vale explorar estilo; la cara tiene que ser **idéntica** entre vídeos. Esto descarta los modelos prompt-only (Soul) y nos lleva a `nano_banana_pro`. (Ver §2.)
2. **"formato UGC, como con el móvil"** → estética casera, no editorial. Luz natural de ventana, lente equivalente a móvil, micro-imperfecciones de selfie. El hiperrealismo aquí **no** es glamour: es "esto lo grabó una persona real en su salón".
3. **"que hable a cámara"** → talking head con diálogo → necesitamos **lipsync**. Y el lipsync de Higgsfield **no está expuesto por el MCP**; se aplica después en la web UI. Eso condiciona cómo escribimos el motion prompt (la línea de diálogo va literal en el prompt). (Ver §6 y §7.)

---

## 1. Perfil de cliente (resultado del onboarding)

Esto es lo que el agente deja consolidado tras pasar el cuestionario de `ONBOARDING.md`. No es un formulario muerto: cada campo cambia una decisión técnica más abajo.

| Campo del onboarding | Respuesta del cliente | Consecuencia técnica |
|---|---|---|
| **Tipo de proyecto** | Ad de respuesta directa para redes (Reels / TikTok / Shorts) | Vertical 9:16 obligatorio. |
| **¿Personaje recurrente?** | Sí — "Carla", su creadora-avatar de marca | Identidad locked → `nano_banana_pro` con ref stack, no Soul. |
| **¿Tiene material de referencia del personaje?** | Sí: una hoja de identidad multiángulo + selfies sueltos | Podemos montar ref stack de 3 (ver §3). No hace falta entrenar Soul ID todavía. |
| **¿Habla a cámara / hay diálogo?** | Sí, un guion corto de ~8 s | Necesita lipsync → motion prompt con línea literal + paso en web UI. |
| **Estética buscada** | UGC casero, "selfie de salón", nada de estudio | Lente/luz tipo móvil; imperfecciones de cámara real, no glamour. |
| **Plataforma de generación** | Higgsfield (plan ultra) | Hasta 8 jobs concurrentes; MCP disponible. |
| **Volumen previsto** | 1 ad ahora, pero la quiere reusar mes a mes | Aún no justifica Soul ID; lo anotamos como recomendación futura (§8). |
| **Nivel técnico** | Creador / marketer, no técnico | Le entregamos params copy-paste y le explicamos cada paso. |

**Ficha canónica del personaje "Carla"** (esto es lo que el agente fija como *anchor words* — la descripción física que irá al principio de todos los prompts; ver `knowledge/04-consistencia-personaje.md`):

```
Carla — woman, early 30s, warm olive skin, dark brown wavy
shoulder-length hair, light brown eyes, faint freckles across
the nose, small mole above the left lip, natural thick eyebrows,
no heavy makeup. Wardrobe canon: oversized cream knit sweater.
```

> **Por qué importa la ficha:** sin una descripción física al frente, los tokens atmosféricos del prompt ("warm window light", "cozy living room"...) **diluyen la cara** y el modelo deriva. El primer adjunto de la ref stack manda, pero las anchor words son el cinturón de seguridad.

---

## 2. Decisión de modelo y parámetros

### Imagen → `nano_banana_pro`

| Por qué este y no otro | |
|---|---|
| `nano_banana_pro` | **Líder 2026 en preservación de identidad.** Es el único que mantiene la cara de Carla 1:1 a partir de refs. Por eso es el elegido. Hay que pasar `resolution:"4k"` (el default es `1k`) y `aspect_ratio:"9:16"`. |
| `soul_2` / `soul_cinematic` | **Descartado.** Son **prompt-only**: ignoran y dropean las refs (un job con ref guarda `prompt:""` y solo regenera variaciones de la propia ref). Sirven para explorar estilo, no para clavar una identidad. |
| `gpt_image_2` | **Descartado para producir.** Tiende a "AI gloss" y a **modificar la cara** → veneno para un personaje recurrente. Solo lo usaríamos para *comparar* fidelidad facial, nunca como entrega. |
| `marketing_studio_image` | Default comercial/producto; aquí el foco es una persona, no un packshot. |

**Detalles del server que NO puedes saltarte:**
- `medias[].role` **debe** ser `"image"`. Si pones `"reference"`, el server lo coacciona a `"image"` — escríbelo bien desde el principio.
- El job puede reportar `model:"nano_banana_2"` internamente (fallback). **Es normal**, no es un error.
- Refs: admite hasta 14, pero **la atención se diluye pasadas 3-4**. Trabajamos con **3**.

> Antes de lanzar, conviene `get_cost:true` para un *preflight* del coste sin gastar el job. Es gratis saberlo.

### Vídeo → `kling3_0`

Un talking head es **movimiento contenido**: respiración, un parpadeo, un leve sway del pelo, la boca moviéndose. Eso es exactamente el dominio de Kling.

| | |
|---|---|
| `kling3_0` | **Elegido.** Movimiento contenido (retratos, talking heads, micro-movimiento). `mode = std/pro/4k` (`pro` = 1080p). **Default `aspect_ratio` = 16:9 → hay que pasar `"9:16"` explícito**; NO auto-matchea al `start_image`. `media role = "start_image"`. |
| `seedance_2_0` | **Descartado.** Es para movimiento *complejo* (multi-elemento, physics, líquidos, parallax, cámara en movimiento, multi-actor sync). Para un talking head es overkill y mete movimiento de más. |
| `wan2_7` | Único modelo audio-sync expuesto por el MCP (start_image + audio → vídeo). Lo mencionamos como **alternativa** (§7) pero el flujo UGC estándar es Kling + lipsync en web UI. |

> **Lipsync — recordatorio crítico:** el lipsync de calidad (Sync Lipsync 2 Pro, Kling Lipsync, etc.) **no está expuesto por el MCP**. El plan es: generar el clip con la boca ya moviéndose (línea de diálogo **literal** dentro del prompt) y **aplicar el lipsync después en la web UI de Higgsfield**. (Ver §6.)

---

## 3. El ref stack (orden = prioridad)

Regla de `knowledge/04-consistencia-personaje.md` y `templates/ref-stack-personaje.md`: **el primer adjunto pesa más**, y el orden canónico es *identity sheet multiángulo → selfie close-up → scene/wardrobe ref*. Máximo 3-4.

| Token | Qué es | Rol |
|---|---|---|
| `@image1` | Hoja de identidad de Carla, varios ángulos (frontal, 3/4, perfil) | **Identidad facial y pelo.** Es la verdad de la cara. |
| `@image2` | Selfie close-up de Carla, buena luz | Refuerza textura de piel y rasgos finos. |
| `@image3` | Foto de un salón acogedor con luz de ventana (sin personas reconocibles) | **Setting / wardrobe / encuadre UGC.** De aquí sale la escena, no la cara. |

> **Trampa que evitamos a propósito:** si `@image3` tuviera una persona parecida, el modelo tiende a **quedarse con esa cara**. Por eso elegimos una foto de salón **sin gente**, y aun así blindamos con el bloque **REF ROLES** (§4). Si te toca usar una scene ref con persona, hay que decir explícitamente *"reemplaza a esa persona por Carla de @image1"* y repetir *"DO NOT use the face of the person in @image3"*.

**Flujo de subida (resumen operativo — detalle en `knowledge/01-higgsfield-mcp.md`):**

```
media_upload(files:[{filename, content_type}])   → devuelve upload_url + media_id
curl -X PUT -H "Content-Type: image/png" --data-binary @file '<upload_url>'
media_confirm(media_ids:[...], type:"image")
→ usar cada media_id como medias[].value, EN ORDEN (image1, image2, image3)
```

> ⚠️ **Si cambias de workspace, TODOS los media_ids se invalidan** y hay que volver a subir las refs. Confirma tu workspace antes de empezar.

---

## 4. El prompt de imagen — Parte 1: JSON Decoded Brief

La metodología PromptDirector (ver `knowledge/00-metodologia-promptdirector.md`) **siempre** entrega 2 cosas: (1) un **JSON Decoded Brief** y (2) un **párrafo en lenguaje natural**. Al usuario le enseñas las dos; a la API de `nano_banana_pro` le mandas el JSON stringificado como `params.prompt` (con los tokens `@imageN` ya incrustados).

Fíjate en el orden interno: **anchor words primero**, luego un bloque `ref_roles` explícito, y `negatives` al final.

```json
{
  "anchor_subject": "Carla — woman, early 30s, warm olive skin, dark brown wavy shoulder-length hair, light brown eyes, faint freckles across the nose, small mole above the left lip, natural thick eyebrows, minimal makeup",
  "ref_roles": {
    "@image1": "use for facial identity and hair — this is the ground truth of the face",
    "@image2": "use for fine skin texture and facial detail",
    "@image3": "use ONLY for the living-room setting, framing and lighting mood — DO NOT use any face from @image3"
  },
  "identity_lock": "replace nothing about Carla's face; keep the exact face, freckles, mole and eyebrows from @image1",
  "skin_tone_lock": "ALL visible skin — face, neck, ears, hands — must match the warm olive skin tone of @image1",
  "realism": "real person filming herself on a phone, candid UGC selfie energy, not a studio portrait",
  "environment": "cozy lived-in living room, soft beige sofa, a leafy plant slightly out of focus behind her, a warm table lamp off to one side, daytime",
  "lighting": "soft diffuse daylight from a large window camera-left, gentle fill, warm domestic ambience",
  "wardrobe": "oversized cream knit sweater (canonical wardrobe)",
  "camera": {
    "lens_mm": 28,
    "aperture": "f/2.2",
    "iso": 200,
    "shutter": "1/120s",
    "lens_to_subject_m": 0.6,
    "subject_to_bg_m": 2.0,
    "cct_K": 5200,
    "note": "phone-style front-camera framing, slight wide-angle, held at arm's length"
  },
  "composition": "vertical 9:16, head-and-shoulders, eyes near upper third, looking straight into lens, a little headroom",
  "imperfections": "visible skin pores, faint vellus hair on cheeks, subsurface scattering on ears and nose, individual eyebrow hairs, slight facial asymmetry, one flyaway strand of hair, micro lip texture, light T-zone oil sheen",
  "palette": "warm neutrals — cream, beige, soft brown, muted green plant",
  "mood": "friendly, close, confiding, like talking to a friend",
  "negatives": "no studio look, no glamour retouching, no plastic skin, no AI gloss, no extra people, no text, no watermark, no logos"
}
```

> **Por qué cada bloque:**
> - `anchor_subject` arriba del todo = el cinturón de seguridad de la cara.
> - `ref_roles` + `identity_lock` + `skin_tone_lock` = el trío anti-deriva. El `skin_tone_lock` evita el *skin-tone bleed* (que la piel se contagie de otra ref).
> - `imperfections` en vez de "hyperrealistic 8k": las **micro-imperfecciones reales** son lo que hace que lea como foto y no como render. *Nunca* pongas "8k ultra detailed" esperando realismo; pon poros, vello, asimetría.
> - `camera` con lente 28 mm y f/2.2 = look de cámara frontal de móvil. No metas un 85 mm f/1.4 aquí: eso es retrato de estudio, mata el efecto UGC.

---

## 5. El prompt de imagen — Parte 2: párrafo en lenguaje natural (lo que ve un humano)

Este es el bloque de revisión humana. Incorpora **cada** campo del JSON, mete las specs de cámara en prosa, y **termina con la coda fotográfica**. Las anchor words van delante; los tokens `@image` después.

```
Carla — a woman in her early 30s with warm olive skin, dark brown wavy
shoulder-length hair, light brown eyes, faint freckles across the nose, a
small mole above the left lip, natural thick eyebrows and minimal makeup.
Use @image1 for her facial identity and hair (this is the ground truth of
her face), @image2 for fine skin texture, and @image3 ONLY for the living-room
setting, framing and lighting — DO NOT use any face from @image3. ALL visible
skin (face, neck, ears, hands) must match the warm olive skin tone of @image1.

She is sitting on a soft beige sofa in a cozy, lived-in living room, a leafy
plant softly out of focus behind her and a warm table lamp glowing off to one
side. She wears her oversized cream knit sweater. She holds the phone at arm's
length and looks straight into the lens with a friendly, confiding expression,
like she is talking to a close friend — candid UGC selfie energy, absolutely
not a studio portrait. Soft diffuse daylight comes from a large window to
camera-left with gentle warm fill.

Photographed as if on a phone front camera: 28mm-equivalent lens, f/2.2, ISO
200, 1/120s, lens about 0.6m from her face, background about 2m behind her,
white balance around 5200K. Vertical 9:16, head-and-shoulders, eyes near the
upper third with a little headroom. Show real skin: visible pores, faint vellus
hair on the cheeks, subsurface scattering on the ears and nose, individual
eyebrow hairs, slight natural asymmetry, one flyaway strand of hair, micro lip
texture and a light T-zone oil sheen. Warm neutral palette — cream, beige, soft
brown, muted green. No studio look, no glamour retouching, no plastic skin, no
AI gloss, no extra people.

Shot on a phone front camera, 28mm, f/2.2, ISO 200, natural color grade.
Photographic realism, no text.
```

> **Lo que hace bien este párrafo:**
> - **Verbos de fotografía, no de render:** "photographed", "shot on", "soft daylight comes from". Nada de "rendered as", "glow", "silhouette of light" → esos disparan priors de CGI y son un FALLO de hiperrealismo.
> - **Specs de cámara en prosa, obligatorias.** Activan los priors de foto real.
> - **Termina en la coda** "Photographic realism, no text." → reancla a foto y prohíbe texto inventado.

### Bloque de params exacto para lanzar (copy-paste)

Este es el `params` literal de `generate_image` con `nano_banana_pro`. El `prompt` aquí es el **JSON brief stringificado** (preferencia de payload para `nano_banana_pro` / `gpt_image_2`). Sustituye los `media_id` por los que te devuelva `media_confirm`.

```json
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "{\"anchor_subject\":\"Carla — woman, early 30s, warm olive skin, dark brown wavy shoulder-length hair, light brown eyes, faint freckles across the nose, small mole above the left lip, natural thick eyebrows, minimal makeup\",\"ref_roles\":{\"@image1\":\"facial identity and hair — ground truth of the face\",\"@image2\":\"fine skin texture and facial detail\",\"@image3\":\"living-room setting, framing and lighting ONLY — DO NOT use any face from @image3\"},\"identity_lock\":\"keep the exact face, freckles, mole and eyebrows from @image1\",\"skin_tone_lock\":\"ALL visible skin (face, neck, ears, hands) must match the warm olive skin tone of @image1\",\"realism\":\"real person filming herself on a phone, candid UGC selfie, not a studio portrait\",\"environment\":\"cozy lived-in living room, soft beige sofa, leafy plant out of focus behind her, warm table lamp to one side, daytime\",\"lighting\":\"soft diffuse daylight from a large window camera-left, gentle warm fill\",\"wardrobe\":\"oversized cream knit sweater\",\"camera\":{\"lens_mm\":28,\"aperture\":\"f/2.2\",\"iso\":200,\"shutter\":\"1/120s\",\"lens_to_subject_m\":0.6,\"subject_to_bg_m\":2.0,\"cct_K\":5200,\"note\":\"phone front-camera framing, held at arm's length\"},\"composition\":\"vertical 9:16, head-and-shoulders, eyes upper third, slight headroom, looking into lens\",\"imperfections\":\"visible skin pores, faint vellus hair, subsurface scattering on ears and nose, individual eyebrow hairs, slight asymmetry, one flyaway strand, micro lip texture, light T-zone oil sheen\",\"palette\":\"warm neutrals — cream, beige, soft brown, muted green\",\"mood\":\"friendly, close, confiding\",\"coda\":\"Shot on a phone front camera, 28mm, f/2.2, ISO 200, natural color grade. Photographic realism, no text.\",\"negatives\":\"no studio look, no glamour retouching, no plastic skin, no AI gloss, no extra people, no text, no watermark, no logos\"}",
    "aspect_ratio": "9:16",
    "resolution": "4k",
    "medias": [
      { "role": "image", "value": "<media_id_identity_sheet>" },
      { "role": "image", "value": "<media_id_selfie_closeup>" },
      { "role": "image", "value": "<media_id_living_room>" }
    ]
  }
}
```

**Checklist de los 4 errores que más se cometen aquí:**
- [ ] `resolution:"4k"` puesto (el default es `1k` — si lo olvidas, entregas baja resolución).
- [ ] `aspect_ratio:"9:16"` puesto (si no, sale horizontal).
- [ ] Los 3 `role` dicen `"image"`, no `"reference"`.
- [ ] El orden de `medias[]` coincide con los tokens `@image1/2/3` del prompt.

> **Iterar sin que la cara derive.** Si la primera imagen no clava la cara: **no encadenes variante-de-variante.** Re-lanza este mismo prompt estructural con las 3 refs adjuntas. Y **re-ancla cada ~5 generaciones**: coge un buen keyframe que sí clavó a Carla y úsalo como nueva ref de identidad. Sesión fresca cada 5-10 gens.

Cuando tengas el still que clava a Carla en su salón → ese PNG es el **`start_image`** del vídeo.

---

## 6. El motion prompt para Kling (talking head + prep de lipsync)

Sale directo de `templates/talking-head-lipsync.md` y aplica la dirección de movimiento de `knowledge/06-direccion-movimiento.md`. Cuatro reglas de oro:

1. **Restraint es cine.** Un talking head bueno hace *poco*: respira, parpadea, un leve sway de pelo, la boca habla. **Prohibido**: ojos que brillan, chispas mágicas, props que rotan solos, luces en cascada. Eso lee como fantasía Marvel, no como UGC real.
2. **La línea de diálogo va LITERAL, entre comillas**, dentro del prompt. Así Kling sintetiza las formas de boca correctas y el lipsync posterior tiene una base coherente.
3. **Preservar EXACTAMENTE la composición del start-image**: "DO NOT change wardrobe, background or pose". Si Kling reinventa el encuadre, el lipsync de web UI parte de algo distinto a tu still.
4. **Coreografiar gestos a beats** (con micro-timestamps) y, para la fase de lipsync, terminar con la línea de audio (ver nota).

```
Start from the provided start_image and preserve it EXACTLY — same woman
(Carla), same cream knit sweater, same living-room background, same framing,
same lighting. DO NOT change wardrobe, background, pose or face.

She is talking to camera in a natural UGC way. Very contained, realistic
motion only: gentle breathing, one or two slow natural blinks, a subtle sway
of a loose strand of hair, micro head movements as she speaks. Her mouth moves
naturally as she says, in a warm conversational tone:
"Okay, I have to tell you about the one thing that actually changed my mornings."

Beat choreography (8 seconds):
- 0.0s–0.5s: a soft natural smile begins, she settles into frame
- 0.5s–6.5s: she delivers the line to camera, relaxed, one slow blink around 3.0s
- 6.5s–8.0s: a small confiding nod, eyebrows lift slightly, holds eye contact

Hand-held phone feel: an almost imperceptible natural sway, no dramatic camera
moves. No glowing eyes, no sparks, no floating objects, no magical light — just
a real person talking on her phone in her living room.

Photographic realism, no text.
```

> **Sobre los 8 segundos / la duración exacta:** ajústala al largo de tu guion y a lo que permita el modo de Kling en tu plan **(verificar)**. La duración no está fijada en el ground truth; lo que sí está fijado es que el movimiento sea contenido y que la línea vaya literal.

### Params de `generate_video` con `kling3_0` (copy-paste)

```json
{
  "model": "kling3_0",
  "params": {
    "prompt": "<el motion prompt de arriba, en una sola cadena>",
    "mode": "pro",
    "aspect_ratio": "9:16",
    "medias": [
      { "role": "start_image", "value": "<media_id_del_still_de_Carla>" }
    ]
  }
}
```

**Checklist Kling:**
- [ ] `aspect_ratio:"9:16"` **explícito** — Kling default es `16:9` y **NO** auto-matchea al `start_image`. Sin esto, sale horizontal aunque tu still sea vertical. Es el error nº1.
- [ ] `mode:"pro"` si quieres 1080p (`std` / `pro` / `4k`).
- [ ] `role:"start_image"` (no `"image"`).
- [ ] `sound` viene `"on"` por default; tenlo en cuenta (el audio real lo pondrás en el lipsync).
- [ ] El `start_image` es el PNG que clavó a Carla, no la ref original.

> Si el clip te sale con movimiento de más (cabeza que se va, fondo que respira raro), **baja el motion**: reduce gestos en la coreografía y refuerza "very contained motion, almost still". El push-in cinematográfico, si lo quisieras, sería un 3-4% imperceptible — pero en UGC casero ni eso suele hacer falta.

---

## 7. La nota de lipsync (paso en la web UI)

Esto es lo que **cierra** el ad, y es el punto donde el MCP te deja a medias **a propósito**:

> **El lipsync NO está expuesto por el MCP.** Los motores de sincronización labial (Sync Lipsync 2 Pro, Kling Lipsync, Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk) **solo se aplican desde la web UI de Higgsfield.** Desde aquí generamos el clip con la boca ya moviéndose; el *sync fino* se hace fuera.

**Workflow completo, paso a paso:**

1. **Genera el clip** con `kling3_0` y el motion prompt de §6 (la línea de diálogo ya está dentro, literal → la boca de Carla se mueve de forma coherente).
2. **Prepara tu pista de voz** (la voz real de la locución del ad, el audio que quieres que diga Carla).
3. **Abre el clip en la web UI de Higgsfield** y aplica un motor de lipsync (p. ej. **Sync Lipsync 2 Pro** o **Kling Lipsync**). Le das el clip de Kling + tu pista de voz; el motor recalcula la boca para que cuadre con el audio.
4. **Exporta** el resultado sincronizado. Ese es tu ad final.

**Cómo dejar el clip de Kling "listo para sincronizar":**
- La línea literal del prompt **debe coincidir** con lo que dice tu pista de voz. Si en el prompt Carla dice *"the one thing that actually changed my mornings"*, que la voz diga exactamente eso. Cuanto más alineadas, mejor sincroniza.
- Encuadre estable y cara bien visible de frente (lo garantizamos en §4-5): el lipsync trabaja sobre la boca, necesita verla limpia.
- Nada de oclusiones (mano delante de la boca, pelo tapando los labios) durante la frase.

> **Cuando preparas un prompt específicamente para la fase de lipsync** (según la metodología, ver `templates/talking-head-lipsync.md`), se cierra con la referencia de audio literal:
> ```
> Audio/voice to lipsync is <<<audio_1>>>.
> ```
> Esto le indica al motor qué pista usar. En nuestro flujo de web UI tú seleccionas el audio en la interfaz, pero la convención del token queda documentada por si lo automatizas.

### Alternativa audio-sync dentro del MCP: `wan2_7`

Si quisieras sincronizar **sin salir del MCP**, el único modelo audio-sync expuesto es **`wan2_7`** (`start_image` + `audio` → vídeo sincronizado). Características: **4:3 nativo, 1080p, 2-15 s**.

Por qué **no** es nuestro camino principal aquí:
- Es **4:3 nativo**, y nosotros necesitamos **9:16**. Tendrías que reencuadrar después, perdiendo composición.
- La ruta Kling + lipsync en web UI da más control sobre el movimiento contenido y el motor de sync.

Es una alternativa válida para pruebas rápidas o cuando el formato 4:3 te sirva; para un ad vertical pulido, Kling + web UI manda.

---

## 8. Resumen del pipeline (la receta de este caso)

```
1. Onboarding → perfil: personaje recurrente, talking head, UGC vertical, con diálogo.
2. Subir refs:  identity sheet (@image1) → selfie (@image2) → salón sin gente (@image3)
                vía media_upload → curl PUT → media_confirm.
3. Imagen:      nano_banana_pro, prompt = JSON brief stringificado (anchor words +
                REF ROLES + skin_tone_lock + imperfections + coda),
                resolution:"4k", aspect_ratio:"9:16", role:"image" x3.
                → still que clava a Carla en su salón.
4. Vídeo:       kling3_0, mode:"pro", aspect_ratio:"9:16" (explícito!),
                start_image = el still, motion contenido + línea de diálogo LITERAL,
                "DO NOT change wardrobe/background/pose".
                → clip con la boca moviéndose.
5. Lipsync:     web UI de Higgsfield (Sync Lipsync 2 Pro / Kling Lipsync) +
                pista de voz real → ad final sincronizado.
```

**Recomendación de futuro (para el cliente):** como quiere reusar a Carla mes a mes, en cuanto pase de **10+ beats/escenas distintas** le compensa **entrenar un Soul ID** (15-25 fotos variadas de Carla, ~3-5 min) para tener un *token de identidad persistente* y dejar de depender del ref stack en cada gen. Para este primer ad, el stack de 3 refs es suficiente.

---

## 9. Los 8 errores que arruinan este ad (chuleta final)

| # | Error | Síntoma | Fix |
|---|---|---|---|
| 1 | Olvidar `resolution:"4k"` en la imagen | Still en 1k, borroso al escalar | Pásalo siempre; el default es `1k`. |
| 2 | Olvidar `aspect_ratio:"9:16"` en Kling | Vídeo horizontal pese a start_image vertical | Kling default es `16:9`, **no** auto-matchea. Explícito. |
| 3 | `role:"reference"` en vez de `"image"` | El server lo coacciona; confusión | Escribe `"image"` desde el principio. |
| 4 | Usar Soul para fijar identidad | La cara cambia entre gens | Soul es prompt-only, ignora refs. Usa `nano_banana_pro`. |
| 5 | "hyperrealistic 8k" en vez de imperfecciones | Piel de plástico, AI gloss | Pon poros, vello, asimetría, T-zone sheen + coda fotográfica. |
| 6 | Scene ref con una persona parecida | Kling/NBP mantienen ESA cara | Scene ref sin gente + bloque REF ROLES + "DO NOT use any face from @image3". |
| 7 | Movimiento de más en el clip | Cabeza que se va, fondo raro, "magia" | Restraint: respira, parpadea, habla. Nada de glow/chispas. |
| 8 | Esperar que el MCP haga el lipsync | No aparece la opción | El lipsync va en la **web UI**; el MCP solo prepara el clip con la boca moviéndose. |

> **La idea que se lleva el lector:** el secreto de un ad UGC con personaje recurrente no es un prompt mágico, es **disciplina de identidad** (anchor words + ref stack ordenado + locks anti-deriva), **hiperrealismo por imperfección** (no por "8k"), **movimiento contenido**, y saber **dónde acaba el MCP y empieza la web UI** (el lipsync). Reproduce ese criterio y reproduces el resultado.