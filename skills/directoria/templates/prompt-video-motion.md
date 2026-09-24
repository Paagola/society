> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-video-motion.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../references/hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# Plantilla — Motion Prompt (Kling / Seedance)

> **Plantilla copy-paste para animar una imagen fija** (start-image → vídeo) con los modelos de vídeo de Higgsfield.
> El esqueleto del prompt va en **inglés** (los modelos de vídeo rinden mejor en inglés; con el usuario conversamos en español, pero el prompt final que pegamos en la API va en inglés). Las **anotaciones** y el **porqué** van en español.
>
> Antes de tocar esto conviene haber leído `knowledge/06-direccion-movimiento.md` (gramática del movimiento), `knowledge/03-modelos-video.md` (qué modelo elegir y sus params) y `knowledge/01-higgsfield-mcp.md` (flujo de subida y trampas del server).

---

## 0. Cómo usar esta plantilla en 30 segundos

1. **Genera primero la imagen fija** con `templates/prompt-imagen.md`. El vídeo SOLO anima lo que ya existe en el frame inicial; no inventa fidelidad que no estaba.
2. **Elige el modelo según el tipo de movimiento** (esto es lo que decide todo):
   - Movimiento **contenido** (un retrato respira, un parpadeo, el pelo se mueve, un talking head) → **Kling (`kling3_0`)** → usa la **Variante A**.
   - Movimiento **complejo** (cámara que viaja, multi-actor sincronizado, líquidos, humo, parallax, físicas) → **Seedance (`seedance_2_0`)** → usa la **Variante B**.
3. **Sube la imagen fija** y consigue su `media_id` (flujo de subida resumido en §5). Ese `media_id` va en `medias[].value` con `role:"start_image"`.
4. **Copia el esqueleto de prompt** de la variante que toque, rellena los corchetes `[...]`, y **borra los corchetes**.
5. **Copia el bloque JSON de params** de al lado, ajusta `mode`/`resolution`, y **fuerza `aspect_ratio:"9:16"`** (ver el aviso grande de abajo).
6. Lanza con `generate_video`. Si quieres ver el coste antes, mete `get_cost:true` en una llamada previa.

> ⚠️ **AVISO QUE TE VA A SALVAR LA TARDE — el `aspect_ratio` NO se auto-deduce de la imagen.**
> Tanto Kling como Seedance tienen **`aspect_ratio` por defecto `16:9`**. Aunque tu start-image sea vertical 9:16, **el server NO la matchea automáticamente**: si no pasas `aspect_ratio:"9:16"` explícito, te sale un vídeo horizontal con tu frame metido con calzador. **Siempre forzar `aspect_ratio:"9:16"` para vertical.**

---

## 1. Anatomía de un motion prompt (los 4 bloques)

Un buen prompt de movimiento NO es una descripción de la escena (eso ya lo tiene la imagen). Es una **partitura de qué cambia y qué NO cambia** en los próximos segundos. Cuatro bloques, siempre en este orden:

| Bloque | Para qué sirve | Por qué importa |
|---|---|---|
| **1. PRESERVE** | Lo que el modelo NO debe tocar (cara, vestuario, fondo, producto, composición) | El vídeo "deriva". Si no anclas, a los 3s el personaje cambia de cara o el logo se borra. |
| **2. BEATS** | El movimiento, troceado por timestamp (`0–2s`, `2–4s`, …) | El restraint es cine. Sin timestamps, el modelo mete *todo* el movimiento de golpe y queda frenético. |
| **3. CAMERA** | El comportamiento de cámara (casi siempre: muy poco) | Una cámara quieta o un push-in del 3–4% lee como cine. Una cámara loca lee como demo de motor gráfico. |
| **4. FILM GRADE** | Grano, color, stock, coda fotográfica | Mantiene el look del frame; evita que el modelo "limpie" la imagen a un look digital plano. |

**Regla de oro del movimiento (de `knowledge/06-direccion-movimiento.md`):** RESTRAINT es cine. Pasa muy poco, pero cada beat es exacto. Si dudas entre poner más o menos movimiento, pon menos.

**Lista negra (esto NO es cine, es fantasía Marvel ridícula):** ojos que brillan, estallidos de chispas mágicas, "fairy dust", objetos que levitan sin razón, props que rotan solos, luces en cascada mágicas. **No los escribas nunca** en un motion prompt salvo que el brief sea explícitamente fantástico.

---

## 2. VARIANTE A — Kling (movimiento contenido)

**Cuándo:** retratos, talking heads, micro-movimiento. Una respiración, un parpadeo, un sway de pelo, un giro de cabeza lento. El sujeto y la cámara casi no se mueven.

### A.1 — Esqueleto de prompt (copia, rellena los `[...]`, borra los corchetes)

```text
[ANCHOR — one line physical description of the subject so the face survives the motion, e.g. "A 30-year-old woman, olive skin, dark wavy hair, freckles across the nose"]. Animate the provided start image with subtle, restrained, cinematic motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- Face, identity, skin tone, hair shape and color — do NOT alter the face.
- Wardrobe, every garment, accessory and color — unchanged.
- Background, set, props and their positions — unchanged.
- Product and any branding/logo — reproduced 1:1, do NOT redraw or distort.
- Framing and composition — keep the same crop, the subject does NOT drift out of frame.

MOTION (BEATS):
- 0–2s: [smallest possible opening move, e.g. "a slow natural inhale, chest rises 1cm, shoulders settle"].
- 2–4s: [one deliberate gesture, e.g. "the eyes blink once, then the gaze drifts 10° to camera-left"].
- 4–6s: [closing micro-move, e.g. "one loose strand of hair sways as if from a faint draft, then stillness"].

CAMERA:
- Locked tripod OR an almost-imperceptible dolly push-in of ~3–4% over the full clip. No pan, no tilt, no shake, no zoom punches.

FILM GRADE:
- Keep the exact grade, contrast and color of the start image. Fine [Kodak Portra 400 / Kodak Vision3 500T] grain, soft halation in highlights, organic film texture. No digital sharpening, no AI smoothing.

NEGATIVE: no warping face, no morphing wardrobe, no extra fingers/limbs, no logo distortion, no glowing eyes, no sparks, no floating objects, no fast camera moves, no text overlay.

Shot on [camera, e.g. ARRI Alexa] with a [50]mm lens, f/[1.8], shallow depth of field consistent with the still. Photographic realism, no text.
```

### A.2 — Params JSON para `generate_video` (Kling)

```json
{
  "model": "kling3_0",
  "mode": "pro",
  "aspect_ratio": "9:16",
  "medias": [
    { "role": "start_image", "value": "<MEDIA_ID_DE_TU_IMAGEN_FIJA>" }
  ],
  "prompt": "<PEGA AQUÍ EL PROMPT DE A.1 YA RELLENADO>"
}
```

**Notas de params (Kling `kling3_0`):**
- `mode`: `std` / `pro` / `4k`. **`pro` = 1080p** (el punto dulce calidad/velocidad para vertical de redes). Usa `4k` solo si vas a hacer post pesado o ampliar.
- `aspect_ratio`: **obligatorio `"9:16"`** para vertical (default es `16:9`, no auto-matchea). Ver el aviso de §0.
- `medias[].role`: **`"start_image"`** (exacto).
- `sound`: por defecto `"on"` en este modelo. Si no quieres pista de audio generada (porque vas a poner tu propia música o un lipsync después), puedes desactivarla pasando `sound:"off"` *(verificar el valor exacto de off en `models_explore` antes de depender de ello; el default documentado es "on")*.
- No lleva `resolution` como param separado: la resolución la marca `mode`.

---

## 3. VARIANTE B — Seedance (movimiento complejo)

**Cuándo:** la cámara viaja (dolly, parallax), hay varios actores que se mueven coordinados, hay físicas (humo, líquido, polvo en los haces de luz), o una transición atmosférica/de iluminación. Todo lo que Kling no aguanta sin romperse.

### B.1 — Esqueleto de prompt (copia, rellena los `[...]`, borra los corchetes)

```text
[ANCHOR — one line physical description of each key subject so faces survive, e.g. "Two men in dark coats; the one on the left has a grey beard"]. Animate the provided start image with controlled, cinematic, multi-element motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- All faces, identities and skin tones — do NOT alter any face.
- Wardrobe and accessories on every figure — unchanged.
- Set, architecture, props and their positions — unchanged.
- Product and branding/logo — reproduced 1:1, do NOT redraw or distort.
- Overall composition and palette — preserved.

MOTION (BEATS):
- 0–2s: [establishing micro-motion across the frame, e.g. "haze drifts slowly through the light beams; the candle flame flickers once"].
- 2–4s: [the main coordinated move, e.g. "all three figures turn their heads toward camera-left in unison, slow and deliberate (Lanthimos cadence)"].
- 4–6s: [physics / atmosphere resolves, e.g. "dust settles, the fluorescent tube on the left dies and flickers out, then stillness"].

CAMERA:
- [Choose ONE: a slow lateral dolly of ~10% revealing parallax between foreground and background / a slow push-in of ~5% / locked]. Smooth, motorized, no handheld shake. One move only.

FILM GRADE:
- Keep the exact grade of the start image. [Kodak Vision3 500T teal-orange cinematic / anamorphic with horizontal flares and oval bokeh]. Clean blacks, fine grain, real film texture. No digital over-sharpening.

NEGATIVE: no warping faces, no morphing wardrobe, no extra limbs, no logo distortion, no glowing eyes, no magic sparks, no objects floating without cause, no chaotic camera, no text overlay.

Shot on [camera + lens, e.g. anamorphic 40mm], f/[2.0], depth of field consistent with the still. Photographic realism, no text.
```

### B.2 — Params JSON para `generate_video` (Seedance)

```json
{
  "model": "seedance_2_0",
  "mode": "std",
  "resolution": "1080p",
  "aspect_ratio": "9:16",
  "medias": [
    { "role": "start_image", "value": "<MEDIA_ID_DE_TU_IMAGEN_FIJA>" }
  ],
  "prompt": "<PEGA AQUÍ EL PROMPT DE B.1 YA RELLENADO>"
}
```

**Notas de params (Seedance `seedance_2_0`):**
- `mode`: `std` / `fast`. **NO existe `pro` ni `4k`** en este modelo (eso es de Kling — no los mezcles). `std` para calidad, `fast` para iterar barato.
- `resolution`: **pásalo `"1080p"`** explícito (default es `720p`, que se nota en vertical). Aquí la resolución SÍ es un param aparte (al revés que en Kling).
- `aspect_ratio`: **obligatorio `"9:16"`** (default `16:9`, no auto-matchea).
- `genre`: por defecto `"auto"`. Déjalo en auto salvo que `models_explore` te ofrezca un género que encaje con tu pieza.
- `medias[].role`: **`"start_image"`** (exacto).

---

## 4. Tabla rápida de decisión

| Necesitas… | Modelo | Variante | `mode` | Resolución 1080p |
|---|---|---|---|---|
| Retrato que respira / parpadea / sway de pelo | `kling3_0` | A | `pro` | vía `mode:"pro"` |
| Talking head (preparar lipsync) | `kling3_0` | A | `pro` | vía `mode:"pro"` |
| Cámara que viaja / parallax | `seedance_2_0` | B | `std` | `resolution:"1080p"` |
| Multi-actor sincronizado (giros Lanthimos) | `seedance_2_0` | B | `std` | `resolution:"1080p"` |
| Humo / líquido / polvo en los haces / físicas | `seedance_2_0` | B | `std` | `resolution:"1080p"` |
| Iterar barato antes de la toma buena | el que toque | A/B | `std` / `fast` | bajar a default |

> **Audio-sync (boca sincronizada a una pista):** el único modelo audio-sync expuesto por el MCP es `wan2_7` (start_image + audio → vídeo sincronizado, **4:3 nativo, 1080p, 2–15s**). No es 9:16 y vive fuera de estas dos variantes. Para talking heads verticales con voz, el flujo real es: generar el clip de movimiento con la **Variante A** (metiendo la línea de diálogo entre comillas) y aplicar el **lipsync después en la web UI** de Higgsfield. Todo el detalle está en `templates/talking-head-lipsync.md`.

---

## 5. Recordatorio del flujo de subida (de dónde sale el `media_id`)

El `start_image` no es una ruta de archivo: es un `media_id` que el server te devuelve tras subir. Resumen (detalle completo en `knowledge/01-higgsfield-mcp.md`):

```text
1) media_upload(files:[{filename, content_type}])
        -> devuelve  upload_url (presigned)  +  media_id
2) curl -X PUT -H "Content-Type: <content_type>" --data-binary @<archivo> '<upload_url>'
3) media_confirm(media_ids:[<media_id>], type:"image")
4) usar <media_id> como medias[].value  con role:"start_image"
```

> ⚠️ **Cambiar de workspace INVALIDA todos los `media_id`.** Si saltaste de workspace, re-sube la imagen antes de lanzar el vídeo o te dará error de media inexistente.

---

## 6. Trampas del server al lanzar vídeo

- **Trampa del preset auto-recommend.** Si tu prompt se parece demasiado a un preset de Higgsfield (ej. el preset "IN THE DARK", id `24bae836-2c4a-48e0-89b6-49fcc0b21612`), el server devuelve un **`notice` (type `preset_recommendation`) SIN ejecutar** — no trae `results` ni `job_id`, y te quedas esperando un vídeo que nunca se lanzó. **Fix:** añade `declined_preset_id` con ese id para forzar la generación literal de tu prompt:

  ```json
  {
    "model": "seedance_2_0",
    "mode": "std",
    "resolution": "1080p",
    "aspect_ratio": "9:16",
    "declined_preset_id": "24bae836-2c4a-48e0-89b6-49fcc0b21612",
    "medias": [{ "role": "start_image", "value": "<MEDIA_ID>" }],
    "prompt": "<TU PROMPT>"
  }
  ```

- **Rate limit: máx 8 jobs concurrentes** (plan ultra). Si lanzas más, te sale "Rate limit reached". Batchea en grupos de ≤ 8 y espera a que cierren antes de la siguiente tanda.

- **Preflight de coste.** Antes de quemar créditos en una tanda, lanza la misma llamada con `get_cost:true` para ver el coste sin ejecutar el job.

---

## 7. Checklist antes de pulsar enviar

- [ ] La **imagen fija ya es buena** (identidad, producto/logo, escala correcta). El vídeo no arregla un frame malo.
- [ ] **¿Contenido o complejo?** → modelo correcto (Kling A / Seedance B). No uses Seedance para un simple parpadeo ni Kling para una cámara que viaja.
- [ ] **`aspect_ratio:"9:16"`** escrito explícito. (El default es `16:9`. Esto es el error #1.)
- [ ] Params del modelo correcto: Kling usa `mode` (`std/pro/4k`, sin `resolution`); Seedance usa `mode` (`std/fast`) **+** `resolution:"1080p"`. No los cruces.
- [ ] El prompt tiene los **4 bloques**: PRESERVE / BEATS (con timestamps) / CAMERA (con restraint) / FILM GRADE.
- [ ] **NEGATIVE** incluye: no glowing eyes, no sparks, no floating objects (la lista negra del cine).
- [ ] **No hay "fairy dust", ni props que rotan solos, ni cámara loca** en los beats.
- [ ] Cierra con la **coda fotográfica** (cámara, lens, f/) y **"Photographic realism, no text."**
- [ ] `medias[].role` es **`"start_image"`** y el `media_id` es del **workspace actual** (no invalidado por cambio de workspace).
- [ ] Si el prompt huele a preset → `declined_preset_id` puesto.
- [ ] Tanda de **≤ 8 jobs** concurrentes.

---

### Ver también
- `knowledge/06-direccion-movimiento.md` — la gramática del movimiento (restraint, Glazer/Lanthimos/Tarkovsky, la lista negra).
- `knowledge/03-modelos-video.md` — ficha completa de cada modelo de vídeo y sus params.
- `templates/talking-head-lipsync.md` — el flujo específico para boca sincronizada / voz.
- `templates/prompt-imagen.md` — para generar la imagen fija de partida.
- `knowledge/07-troubleshooting.md` — cuando el vídeo "deriva", cambia la cara o sale horizontal.