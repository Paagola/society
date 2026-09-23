<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 01 — Higgsfield MCP: referencia operativa

> Este archivo es el **manual de instrucciones exacto** del MCP de Higgsfield: qué herramienta llamar, qué parámetros forzar (porque los defaults te traicionan), y qué payload JSON enviar. Es la base sobre la que se apoyan `knowledge/02-modelos-imagen.md`, `knowledge/03-modelos-video.md` y `knowledge/07-troubleshooting.md`.
>
> **Regla de oro:** todo lo que aparece aquí está verificado contra el comportamiento real del MCP. Si un parámetro no figura en este documento, no existe (o no lo conocemos) — no lo inventes. Cuando un dato sea dudoso lo verás marcado como `(verificar)`.

---

## 0. Cómo leer este documento

El MCP de Higgsfield expone **dos verbos principales** que usarás el 90% del tiempo:

- `generate_image` — todo lo que sea un fotograma fijo (keyframes, productos, retratos, refs de identidad).
- `generate_video` — animar una imagen de partida (`start_image`) hacia un clip.

Y un puñado de herramientas de **plomería** que hacen que el resto funcione: subir refs (`media_upload` / `media_confirm`), elegir workspace, mirar coste, etc.

Una cosa que tienes que interiorizar desde el minuto uno: **los modelos de imagen y vídeo rinden mejor en inglés.** Con el usuario conversas en español (es su idioma y el de su público), pero **el prompt final que entra en `params.prompt` va en inglés.** No es una preferencia estética: el inglés es el idioma en el que estos modelos fueron entrenados de forma masiva, y la diferencia en fidelidad es real. Lo mismo aplica a todas las plantillas de `templates/`.

---

## 1. `generate_image` — generar fotogramas fijos

### 1.1 Qué hace

Lanza un job de imagen contra el modelo que elijas. Devuelve uno o varios resultados (URLs) más un `job_id`. Puedes adjuntar imágenes de referencia (`medias[]`) o trabajar solo desde texto, **según el modelo** (esto es crítico: no todos los modelos miran las refs — ver 1.3).

### 1.2 Anatomía del payload

```json
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "<tu prompt en inglés, o el JSON brief stringificado con tokens @imageN>",
    "aspect_ratio": "9:16",
    "resolution": "4k"
  },
  "medias": [
    { "role": "image", "value": "<media_id_1>" },
    { "role": "image", "value": "<media_id_2>" }
  ]
}
```

Notas transversales:

- **`medias[].value`** es el `media_id` que te devuelve el flujo de subida (ver §4). No es una URL ni una ruta local.
- **`medias[].role`** depende del verbo: en imagen es `"image"`, en vídeo es `"start_image"` / `"audio"`. Ojo con `nano_banana_pro` (ver abajo, fuerza `"image"`).
- **`get_cost: true`** dentro de `params` hace un **preflight de coste** — te dice cuánto costaría el job **sin lanzarlo**. Úsalo antes de batches grandes.

### 1.3 Modelos de imagen y sus trampas

Esto es el corazón del archivo. Cada modelo se comporta de forma distinta y **los defaults casi siempre están mal para lo que tú quieres**. (Profundización pedagógica de cada uno en `knowledge/02-modelos-imagen.md`.)

#### `nano_banana_pro` — el rey de la identidad (2026)

Líder en **preservación de identidad**. Es tu modelo por defecto cuando hay un personaje recurrente que tiene que mantener la cara, o cuando quieres generar directamente desde refs + una descripción verbosa.

- **`resolution`**: default `"1k"`. **FUERZA `"4k"`.** Siempre. El 1k no es entregable.
- **`aspect_ratio`**: soportado (p.ej. `"9:16"`, `"16:9"`, `"1:1"`).
- **`medias[].role`**: **DEBE ser `"image"`.** Si pasas `"reference"`, el server lo coacciona a `"image"` — no falla, pero pásalo bien tú.
- **Fallback interno**: a veces el job reporta `model: "nano_banana_2"` internamente. **Es normal**, no es un error tuyo.
- **Refs**: admite hasta **14**, pero la atención se diluye pasadas **3-4**. Más refs ≠ mejor. Ver `knowledge/04-consistencia-personaje.md` para el orden óptimo de refs.

```json
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "<JSON Decoded Brief stringificado, con @image1 @image2 incrustados>",
    "aspect_ratio": "9:16",
    "resolution": "4k"
  },
  "medias": [
    { "role": "image", "value": "<id_identity_sheet>" },
    { "role": "image", "value": "<id_selfie>" },
    { "role": "image", "value": "<id_scene_ref>" }
  ]
}
```

#### `soul_2` (alias `text2image_soul_v2`) y `soul_cinematic` — PROMPT-ONLY

Estos dos modelos son **prompt-only: IGNORAN / DROPEAN las refs.** Si les adjuntas una ref, el job guarda `prompt: ""` y solo regenera variaciones de esa ref — no es lo que quieres. **Nunca les pases `medias[]` esperando que respeten una identidad.**

- **`quality`**: default `"2k"`.
- **Uso correcto**: exploración de estilo cinematográfico / editorial / UGC donde la **identidad no es ref-crítica** (no hay un personaje cuya cara haya que clavar).
- **Trampa de `soul_cinematic`**: **pierde conceptos muy específicos o surreales.** Si el concepto importa de verdad (algo raro, una composición concreta), no uses soul_cinematic — usa `nano_banana_pro` con una **ref ancla** que fije el concepto.

```json
{
  "model": "soul_cinematic",
  "params": {
    "prompt": "<prompt en inglés, autónomo, sin tokens @image>",
    "aspect_ratio": "9:16",
    "quality": "2k"
  }
}
```

#### `gpt_image_2` — comparación de fidelidad, no producción de personaje

- **`quality`**: `"low"` | `"high"`. **Default `"low"`. FUERZA `"high"`.**
- **Trampa**: tiende a **"AI gloss"** (ese brillo plástico de IA) y a **modificarte la cara**. **EVÍTALO para la identidad de un personaje recurrente.**
- **Para qué sí vale**: comparar fidelidad facial entre modelos en una prueba puntual.

```json
{
  "model": "gpt_image_2",
  "params": {
    "prompt": "<prompt en inglés>",
    "quality": "high",
    "aspect_ratio": "9:16"
  }
}
```

#### `marketing_studio_image` — default comercial

Pensado para **producto / comercial / ads**. Es el atajo cuando lo que quieres es un still de producto o un anuncio limpio sin un personaje de identidad locked.

```json
{
  "model": "marketing_studio_image",
  "params": {
    "prompt": "<prompt de producto en inglés>",
    "aspect_ratio": "9:16"
  }
}
```

### 1.4 Cómo se inyecta el prompt (metodología PromptDirector)

Para `nano_banana_pro` y `gpt_image_2`, la preferencia de payload es **enviar `params.prompt` = el JSON Decoded Brief stringificado**, con los **tokens `@imageN` ya incrustados** en el orden exacto de `medias[]`. Al usuario se le muestran **ambas formas**: el JSON (que es lo que entra en la API) y el párrafo en lenguaje natural (para revisión humana). El detalle completo de la metodología está en `knowledge/00-metodologia-promptdirector.md`; aquí solo importa **dónde** va: en `params.prompt`.

Regla de tokens: cuando hay varias refs, **nunca** escribas "the reference image" de forma vaga. Referencia cada media como `@image1`, `@image2`, `@image3` **en el orden exacto del array `medias[]`**.

---

## 2. `generate_video` — animar un fotograma

### 2.1 Qué hace

Toma una imagen de partida (`start_image`) y la convierte en un clip. La calidad del vídeo está **techada por la del still**: si el keyframe no es premium, el vídeo tampoco. Por eso el pipeline siempre es *imagen primero, vídeo después* (ver `knowledge/08-recetas-pipeline.md`).

### 2.2 La trampa que comparten todos: el aspect ratio

**Todos los modelos de vídeo tienen `aspect_ratio` default `16:9`.** Y — esto es lo importante — **NO auto-matchean al `start_image`.** Si tu keyframe es vertical 9:16 y no pasas `aspect_ratio` explícito, el modelo te devuelve un 16:9 con tu imagen vertical metida con calzador. **Pasa SIEMPRE `aspect_ratio: "9:16"` cuando trabajes vertical.**

### 2.3 Modelos de vídeo

(Profundización de dirección en `knowledge/03-modelos-video.md` y `knowledge/06-direccion-movimiento.md`.)

#### `kling3_0` — movimiento contenido

El modelo de **restraint**: retratos, talking heads, micro-movimiento (una respiración, un parpadeo, el sway del pelo). Cuando el plano tiene que "respirar" sin que pase nada espectacular, es Kling.

- **`mode`**: `std` / `pro` / `4k`. (**`pro` = 1080p.**)
- **`aspect_ratio`**: default `16:9`. **FUERZA `"9:16"` para vertical.**
- **`sound`**: default `"on"`.
- **`medias[].role`**: `"start_image"`.

```json
{
  "model": "kling3_0",
  "params": {
    "prompt": "<prompt de movimiento en inglés: un gesto, una respiración>",
    "mode": "pro",
    "aspect_ratio": "9:16",
    "sound": "on"
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_keyframe>" }
  ]
}
```

#### `seedance_2_0` — movimiento complejo

Para todo lo que Kling no aguanta: **multi-elemento, physics, líquidos, parallax, cámara en movimiento, multi-actor sincronizado.**

- **`mode`**: `std` / `fast`. **NO existe `pro` ni `4k`** (no lo confundas con Kling).
- **`resolution`**: default `"720p"`. **PÁSALO a `"1080p"`.**
- **`aspect_ratio`**: default `16:9`. **FUERZA `"9:16"`.**
- **`genre`**: default `"auto"`.
- **`medias[].role`**: `"start_image"`.

```json
{
  "model": "seedance_2_0",
  "params": {
    "prompt": "<prompt de movimiento complejo en inglés>",
    "mode": "std",
    "resolution": "1080p",
    "aspect_ratio": "9:16",
    "genre": "auto"
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_keyframe>" }
  ]
}
```

#### `wan2_7` — el único con audio-sync nativo del MCP

Es el **único modelo de audio-sync expuesto por el MCP**: le das un `start_image` + un `audio` y devuelve vídeo sincronizado.

- **Formato nativo**: 4:3.
- **Resolución**: 1080p.
- **Duración**: 2–15 s.
- **`medias[].role`**: `"start_image"` y `"audio"`.

```json
{
  "model": "wan2_7",
  "params": {
    "prompt": "<prompt en inglés>"
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_keyframe>" },
    { "role": "audio", "value": "<media_id_audio>" }
  ]
}
```

### 2.4 LIPSYNC: lo que el MCP NO expone (y el workaround)

Esto hay que tenerlo clarísimo para no perder horas buscando un parámetro que no existe.

**El MCP NO expone lipsync nativo.** Ninguna de estas herramientas es invocable por MCP:

- Sync Lipsync 2 Pro
- Kling Lipsync
- Kling 2.6 Lipsync
- Kling Avatars 2.0
- Higgsfield Speak 2.0
- Infinite Talk

**Workaround (el flujo real de producción):**

1. Genera el clip con `kling3_0` o `seedance_2_0` **incluyendo movimiento de boca** — para eso, mete la **línea de diálogo LITERAL entre comillas dentro del prompt**. Las formas de boca sintetizan mucho mejor si el modelo "sabe" qué se está diciendo.
2. **Aplica el lipsync después, en la web UI de Higgsfield**, sobre el clip ya generado.

La plantilla `templates/talking-head-lipsync.md` cubre cómo coreografiar este clip para que el lipsync posterior cuadre.

---

## 3. TRAMPAS / OPS — lo que rompe en producción

### 3.1 Preset auto-recommend (el job fantasma)

**Síntoma:** lanzas `generate_image`/`generate_video`, y la respuesta vuelve **sin `results` y sin `job_id`** — solo trae un `notice` de tipo `preset_recommendation`. Parece que se ejecutó pero no se ejecutó nada.

**Causa:** tu prompt se parece demasiado a un preset existente. El server, en vez de generar, te "recomienda" usar el preset (ejemplo real: preset **"IN THE DARK"**, id `24bae836-2c4a-48e0-89b6-49fcc0b21612`).

**Fix:** añade `declined_preset_id` con el id que te devolvió el notice, para **forzar la generación literal** de tu prompt.

```json
{
  "model": "soul_cinematic",
  "params": {
    "prompt": "<tu prompt>",
    "aspect_ratio": "9:16",
    "declined_preset_id": "24bae836-2c4a-48e0-89b6-49fcc0b21612"
  }
}
```

### 3.2 Rate limit: máx 8 jobs concurrentes

En plan **ultra** el tope es **8 jobs concurrentes**. Si lo superas, la respuesta es **"Rate limit reached"**. **Batchea en grupos de ≤ 8** y espera a que drenen antes del siguiente lote. (Ver `knowledge/08-recetas-pipeline.md` para la estrategia de batching de una secuencia larga.)

### 3.3 Cambiar de workspace INVALIDA los media_ids

Si cambias de workspace (`select_workspace`), **todos los `media_id` que tenías dejan de ser válidos.** El job que los referencie fallará. **Hay que re-subir las refs** en el nuevo workspace. Decide el workspace **antes** de subir refs, no después.

> Nota de operación real: tras una reconexión del MCP los `media_id` también pueden quedar obsoletos (stale). Si un job que antes funcionaba empieza a fallar por media inválida, re-sube la ref antes de seguir investigando.

---

## 4. FLUJO DE SUBIDA DE MEDIA (refs, audio, etc.)

Subir una ref no es un solo paso: son **tres**. Saltarte uno deja el `media_id` inutilizable.

### Paso 1 — `media_upload`

Pides una URL de subida firmada (presigned) declarando qué vas a subir.

```json
{
  "files": [
    { "filename": "identity_sheet.png", "content_type": "image/png" }
  ]
}
```

Te devuelve, por cada archivo: un **`upload_url`** (presigned) y un **`media_id`**.

### Paso 2 — `curl -X PUT` (subida binaria real)

El MCP **no** sube el archivo por ti. Tú haces el PUT a la `upload_url` con el binario. El `Content-Type` del header **debe coincidir** con el que declaraste en el paso 1.

```bash
curl -X PUT \
  -H "Content-Type: image/png" \
  --data-binary @identity_sheet.png \
  '<upload_url>'
```

### Paso 3 — `media_confirm`

Confirmas que la subida terminó. **Sin este paso el `media_id` no es usable.**

```json
{
  "media_ids": ["<media_id>"],
  "type": "image"
}
```

`type` puede ser `"image"`, `"video"` o `"audio"`.

### Paso 4 — usar la ref

Ya puedes pasar el `media_id` como `medias[].value` en `generate_image` / `generate_video`.

```json
{ "role": "image", "value": "<media_id>" }
```

**Resumen del flujo:** `media_upload` → `curl -X PUT` → `media_confirm` → usar como `medias[].value`.

---

## 5. Preflight de coste

Antes de lanzar un batch caro, pasa **`get_cost: true`** dentro de `params`. Devuelve el coste estimado **sin ejecutar el job**. Combínalo con el batching de ≤ 8 (§3.2) para no quemar créditos a ciegas.

```json
{
  "model": "nano_banana_pro",
  "params": {
    "prompt": "<prompt>",
    "resolution": "4k",
    "get_cost": true
  }
}
```

---

## 6. Tabla resumen — todos los modelos y sus params

### Imagen (`generate_image`)

| Modelo | Param clave (default → forzar) | Refs / role | Notas |
|---|---|---|---|
| `nano_banana_pro` | `resolution` `1k` → **`4k`** | hasta 14 (útil 3-4), role **`image`** | Rey de identidad. Puede reportar `nano_banana_2` interno (normal). Coacciona `reference`→`image`. |
| `soul_2` (`text2image_soul_v2`) | `quality` default `2k` | **PROMPT-ONLY** — ignora refs | Exploración de estilo; identidad no ref-crítica. |
| `soul_cinematic` | `quality` default `2k` | **PROMPT-ONLY** — ignora refs | Pierde conceptos surreales/específicos → usa `nano_banana_pro` + ref ancla. |
| `gpt_image_2` | `quality` `low` → **`high`** | (refs, pero modifica cara) | "AI gloss"; **evitar** para personaje recurrente. Solo comparar fidelidad facial. |
| `marketing_studio_image` | — | — | Default comercial / producto / ads. |

`aspect_ratio` soportado en los modelos de imagen (p.ej. `9:16`). `get_cost: true` disponible como preflight en todos.

### Vídeo (`generate_video`)

| Modelo | `mode` | `resolution` (default → forzar) | `aspect_ratio` | role(s) | Uso |
|---|---|---|---|---|---|
| `kling3_0` | `std` / `pro` / `4k` (**pro = 1080p**) | — | `16:9` → **`9:16`** | `start_image` | Movimiento contenido: retratos, talking heads, micro-movimiento. `sound` default `on`. |
| `seedance_2_0` | `std` / `fast` (**no pro/4k**) | `720p` → **`1080p`** | `16:9` → **`9:16`** | `start_image` | Movimiento complejo: physics, líquidos, parallax, cámara, multi-actor. `genre` default `auto`. |
| `wan2_7` | — | 1080p (nativo) | 4:3 nativo | `start_image` + `audio` | **Único audio-sync del MCP.** 2–15 s. |

**Lipsync nativo:** NO expuesto por el MCP (Sync Lipsync 2 Pro, Kling Lipsync, Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk). Workaround: generar el clip con la línea de diálogo literal entre comillas en el prompt + aplicar lipsync después en la web UI.

---

## 7. Checklist antes de lanzar cualquier job

- [ ] ¿Workspace correcto **ya elegido** antes de subir refs? (cambiarlo después invalida los `media_id` — §3.3)
- [ ] Refs subidas con el flujo completo `upload → PUT → confirm` (§4).
- [ ] `prompt` en **inglés** (conversación con el usuario en español, prompt en inglés).
- [ ] **Imagen:** ¿`resolution: "4k"` (nano_banana) / `quality: "high"` (gpt_image_2)? ¿role `"image"`?
- [ ] **Imagen prompt-only (soul):** ¿SIN `medias[]`? (ignora refs y guarda prompt vacío si las metes).
- [ ] **Vídeo:** ¿`aspect_ratio: "9:16"` explícito? ¿`resolution: "1080p"` en seedance? ¿`mode` correcto para el modelo?
- [ ] ¿Línea de diálogo literal entre comillas si va a llevar lipsync después?
- [ ] ¿Batch ≤ 8 jobs concurrentes? (§3.2)
- [ ] Si volvió un `preset_recommendation` sin `job_id` → reenviar con `declined_preset_id` (§3.1).
- [ ] Batch caro → `get_cost: true` primero (§5).