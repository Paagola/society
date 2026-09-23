<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 03 · Modelos de vídeo (Higgsfield MCP)

Esta es la guía para elegir y configurar el modelo de vídeo correcto en `generate_video`. Lee primero **`06-direccion-movimiento.md`** para entender el criterio cinematográfico (qué movimiento se busca); este archivo te dice **con qué modelo y con qué parámetros** ejecutarlo.

Regla de oro de este capítulo: el movimiento manda sobre el modelo. Primero decides qué hace la cámara y los sujetos; eso te dice si vas a Kling (contenido) o a Seedance (complejo). Nunca al revés.

> Nota de idioma: hablamos contigo en español, pero **todos los prompts de ejemplo van en inglés**. Los modelos de vídeo (igual que los de imagen) rinden mejor con instrucciones en inglés; conversas con el cliente en su idioma, pero el prompt que entregas a la API siempre va en inglés.

---

## 1. Los tres modelos que importan

El MCP de Higgsfield expone más cosas, pero para producción de anuncios solo necesitas memorizar tres:

| Modelo | Para qué | Audio |
|---|---|---|
| **`kling3_0`** | Movimiento **contenido**: retratos, talking heads, micro-movimiento (respiración, parpadeo, sway de pelo). | `sound` default `"on"` (ambiente generado, no lipsync) |
| **`seedance_2_0`** | Movimiento **complejo**: multi-elemento, physics, líquidos, parallax, cámara en movimiento, multi-actor sincronizado. | — |
| **`wan2_7`** | Único modelo **audio-sync por MCP**: `start_image + audio → vídeo sincronizado`. | Sincroniza al audio que le pasas |

Todo lo demás (lipsync de boca real, avatares parlantes) **no está expuesto por MCP** y se resuelve en la web UI de Higgsfield. Ver §6.

---

## 2. `kling3_0` — movimiento contenido

### Cuándo usarlo
Cuando "pasa muy poco pero exacto": un retrato que respira, un talking head, pelo que se mueve apenas, un parpadeo, un push-in lento. Es la herramienta de la **gramática Glazer / Lanthimos / Tarkovsky** (ver `06-direccion-movimiento.md`): restraint, no espectáculo.

### Parámetros (solo lo confirmado)

| Param | Valores | Notas |
|---|---|---|
| `mode` | `std` / `pro` / `4k` | **`pro` = 1080p**. Usa `pro` para entregables; `std` para pruebas baratas. |
| `aspect_ratio` | `16:9` (default) → **forzar `9:16`** | NO auto-matchea al `start_image`. Si quieres vertical, lo pasas tú. Ver §5. |
| `sound` | default `"on"` | Genera audio ambiente, **no es lipsync**. |
| `medias[].role` | `"start_image"` | El frame de partida (tu keyframe de imagen). |

### Ejemplo JSON (vertical, 1080p, retrato que respira)

```json
{
  "model": "kling3_0",
  "params": {
    "mode": "pro",
    "aspect_ratio": "9:16",
    "prompt": "A woman seated in profile, lit by a single warm key. She breathes once, slow; her shoulders settle on the exhale. One strand of hair drifts in the air-conditioning. The camera pushes in 3 percent, almost imperceptible. No other movement. Restrained, cinematic. Photographic realism, no text."
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_del_keyframe>" }
  ]
}
```

Fíjate en la disciplina del prompt: **un** gesto (respiración), **un** detalle (la mecha), **un** movimiento de cámara mínimo (3%). Eso es cine. Si metieras "ojos que brillan, chispas, pelo ondeando dramáticamente" leería a fantasía Marvel y sería un fallo (ver `06-direccion-movimiento.md`).

---

## 3. `seedance_2_0` — movimiento complejo

### Cuándo usarlo
Cuando hay **varias cosas pasando a la vez y deben coordinarse**: cámara que viaja (dolly real, no micro-push), parallax entre planos, líquidos/humo/polvo con física, multi-actor sincronizado, transiciones atmosféricas (fluorescentes muriendo en secuencia). Kling colapsa en estos casos; Seedance los sostiene.

### Parámetros (solo lo confirmado)

| Param | Valores | Notas |
|---|---|---|
| `mode` | `std` / `fast` | **NO existe `pro` ni `4k`** en Seedance. No los inventes. |
| `resolution` | `"1080p"` | Default `720p`. **Pásalo explícito** para entregable. |
| `aspect_ratio` | `16:9` (default) → **forzar `9:16`** | Misma trampa que Kling. Ver §5. |
| `genre` | default `"auto"` | Déjalo en auto salvo que tengas razón fuerte para cambiarlo. |
| `medias[].role` | `"start_image"` | Frame de partida. |

### Ejemplo JSON (vertical, 1080p, cámara en movimiento + atmósfera)

```json
{
  "model": "seedance_2_0",
  "params": {
    "mode": "std",
    "resolution": "1080p",
    "aspect_ratio": "9:16",
    "genre": "auto",
    "prompt": "Slow lateral dolly across a dark room. Dust and haze drift through the light beams. In the background a row of fluorescent tubes flickers and dies one after another, left to right. Two figures turn their heads in unison toward the camera. Coordinated, deliberate, cinematic. Photographic realism, no text."
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_del_keyframe>" }
  ]
}
```

---

## 4. Tabla de selección: Kling vs Seedance por tipo de plano

| Tipo de plano | Modelo | Por qué |
|---|---|---|
| Retrato fijo que respira / parpadea | **Kling** `pro` | Micro-movimiento contenido; un solo sujeto, sin física. |
| Talking head (boca moviéndose, prep de lipsync) | **Kling** `pro` | Movimiento facial controlado; el lipsync real va después (§6). |
| Sway de pelo, tela que se mueve apenas | **Kling** `pro` | Movimiento secundario sutil sobre sujeto estático. |
| Push-in lento imperceptible (3-4%) | **Kling** `pro` | Cámara casi quieta = territorio de Kling. |
| Dolly / travelling real, cámara que viaja | **Seedance** | Desplazamiento de cámara con parallax = complejo. |
| Multi-actor sincronizado (giros de cabeza al unísono) | **Seedance** | Coordinación de varios cuerpos. |
| Líquidos, humo, polvo, chispas con física | **Seedance** | Simulación física multi-elemento. |
| Parallax entre capas (primer plano vs fondo) | **Seedance** | Profundidad en movimiento. |
| Transición de iluminación (fluorescentes muriendo en secuencia) | **Seedance** | Cambio coordinado en el tiempo sobre múltiples elementos. |
| Producto que rota / líquido cayendo en un frasco | **Seedance** | Física de producto = complejo. |

Regla rápida: **¿se mueve la cámara o hay más de un elemento físico coordinándose? → Seedance. ¿Es un sujeto casi quieto con un gesto? → Kling.**

---

## 5. La regla del `aspect_ratio` (la trampa que arruina entregables)

Tanto **`kling3_0`** como **`seedance_2_0`** tienen **`aspect_ratio` por defecto en `16:9`**, y **NO auto-matchean al `start_image`**. Es decir: aunque tu keyframe sea un 9:16 vertical perfecto, si no pasas `aspect_ratio` explícito, el vídeo sale **horizontal** y te recorta o estira el plano.

Para anuncios verticales (Reels, TikTok, Stories) **siempre** incluye:

```json
"aspect_ratio": "9:16"
```

Checklist mental antes de lanzar cualquier `generate_video`:
1. ¿Pasé `aspect_ratio:"9:16"`? (si es vertical)
2. ¿Pasé la calidad alta? (`mode:"pro"` en Kling / `resolution:"1080p"` en Seedance)
3. ¿`medias[].role` es `"start_image"`?

> Atajo de coste: igual que en imagen, puedes hacer un preflight de coste sin lanzar el job antes de batchear (ver `get_cost` / `balance` en `01-higgsfield-mcp.md`).

---

## 6. Lipsync: qué NO está expuesto y cuál es el workflow

Esto es lo que más confunde, así que sé estricto.

### Lo que NO puedes hacer por MCP
El **lipsync real** (sincronizar una voz a una cara con formas de boca correctas) **NO está expuesto por el MCP**. Los siguientes modelos de lipsync **solo existen en la web UI de Higgsfield**, no como parámetro del MCP:

- Sync Lipsync 2 Pro
- Kling Lipsync
- Kling 2.6 Lipsync
- Kling Avatars 2.0
- Higgsfield Speak 2.0
- Infinite Talk

No intentes invocarlos desde el MCP; no están ahí.

### El workflow correcto de lipsync (dos pasos)

**Paso 1 — Genera el clip con movimiento de boca (por MCP, con Kling).**
Generas un talking head donde la boca **ya se mueve**. El truco clave: mete la **línea de diálogo LITERAL entre comillas** dentro del prompt. Eso hace que el modelo sintetice formas de boca que luego encajan mucho mejor con el lipsync.

```json
{
  "model": "kling3_0",
  "params": {
    "mode": "pro",
    "aspect_ratio": "9:16",
    "prompt": "Tight portrait of a man speaking directly to camera, talking head, mouth moving naturally as if saying: \"You haven't tried everything until you've tried this.\" Subtle eyebrow raise on the word 'everything'. Keep wardrobe, background and pose EXACTLY as the start image. No other movement. Photographic realism, no text."
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_del_keyframe>" }
  ]
}
```

**Paso 2 — Aplica el lipsync en la web UI de Higgsfield.**
Subes ese clip (boca ya moviéndose) a la web UI, eliges uno de los modelos de lipsync de arriba, le das la pista de audio/voz, y obtienes la sincronización fina. El MCP te dejó el clip a punto; el lipsync se cierra fuera.

> Detalle de craft para el Paso 1 (ver `06-direccion-movimiento.md` y la plantilla `templates/talking-head-lipsync.md`): preserva EXACTAMENTE la composición del start-image ("DO NOT change wardrobe / background / pose"), coreografía los gestos a beats, y si es solo cabeza flotante añade el bloqueo "HEAD ONLY... DO NOT add neck, shoulders, body or clothing below the chin" para que Kling no invente un cuerpo.

---

## 7. `wan2_7` — el único audio-sync por MCP

Cuando **sí** necesitas sincronización a audio **sin salir del MCP**, el único modelo expuesto es **`wan2_7`**:

- Entrada: **`start_image` + `audio`** → salida vídeo sincronizado al audio.
- Formato **4:3 nativo**.
- **1080p**.
- Duración **2–15 s**.

Es la excepción a la regla "el lipsync no está en el MCP": `wan2_7` hace audio-sync directamente. Ten en cuenta que es **4:3 nativo**, así que para un entregable vertical 9:16 tendrás que reencuadrar después (ver `reframe` en `01-higgsfield-mcp.md`).

```json
{
  "model": "wan2_7",
  "params": {
    "prompt": "Close-up of a presenter delivering the line to camera, natural head movement, lit by a soft key. Photographic realism, no text."
  },
  "medias": [
    { "role": "start_image", "value": "<media_id_del_keyframe>" },
    { "role": "audio",       "value": "<media_id_del_audio>" }
  ]
}
```

> El `media_id` del audio se obtiene con el mismo flujo de subida que las imágenes, pero confirmando con `type:"audio"` (ver el flujo `media_upload → PUT → media_confirm` en `01-higgsfield-mcp.md`).

---

## 8. Trampas operativas que también aplican a vídeo

Estas valen para `generate_video` igual que para imagen (detalle completo en `07-troubleshooting.md`):

- **Auto-recommend de preset:** si tu prompt se parece a un preset conocido, el server devuelve un `notice` (`type: preset_recommendation`) **sin ejecutar** (no trae `results` ni `job_id`). Fix: añade `declined_preset_id:"<id>"` para forzar la generación literal.
- **Rate limit:** máximo **8 jobs concurrentes** (plan ultra). Si lo excedes → `"Rate limit reached"`. Batchea en grupos de ≤8.
- **Subida de refs:** `media_upload → PUT con curl → media_confirm` y usa el `media_id` como `medias[].value`.
- **Cambiar de workspace INVALIDA todos los `media_id`** → hay que re-subir las refs.

---

## 9. Resumen accionable

1. **Movimiento manda.** Decide el plano antes que el modelo (ver `06-direccion-movimiento.md`).
2. **Contenido → Kling `pro`** (1080p). **Complejo → Seedance `std`/`fast`** con `resolution:"1080p"`.
3. **Siempre fuerza `aspect_ratio:"9:16"`** para vertical: ningún modelo lo auto-matchea al `start_image`.
4. **Lipsync real NO está en el MCP.** Genera el clip con boca + línea literal entre comillas (Kling) y cierra el lipsync en la web UI.
5. **`wan2_7`** es el único audio-sync por MCP (4:3 nativo, 1080p, 2–15s) → reencuadra para vertical.
6. **Restraint es cine.** Nada de ojos brillantes, chispas mágicas ni props que rotan solos: eso es un fallo de hiperrealismo (ver `05-biblia-hiperrealismo.md`).