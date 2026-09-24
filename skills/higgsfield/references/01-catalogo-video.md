# 01 · Catálogo de vídeo

Catálogo **en vivo** del MCP de Higgsfield (`models_explore(action:"list", type:"video")`, consultado el 2026-09-24 con la cuenta de Society), cruzado con la skill oficial `higgsfield-ai/skills` (commit `d071406`, 11/09/2026) y con las mediciones propias. Los valores por defecto son los que aplica el servidor si no se pasa el parámetro: **casi nunca son los que quieres**.

> Este catálogo caduca. Antes de una tarea nueva, `models_explore(action:"get", model_id:"…")` del modelo elegido. Si el esquema no coincide con esta tabla, manda el esquema vivo y se anota la discrepancia (→ [`05-protocolo-y-trazabilidad.md`](05-protocolo-y-trazabilidad.md) §5).

## Índice

1. Elección rápida para hostelería
2. Modelos generativos principales
3. Resto del catálogo generativo
4. Edición, extensión y transferencia de movimiento
5. Utilidades de vídeo
6. Lo que ha cambiado respecto a la base heredada

---

## 1. Elección rápida para hostelería

| Necesidad | Modelo | Parámetros a fijar siempre |
|---|---|---|
| Plano complejo, multitoma, cámara móvil, física, varios keyframes | **`seedance_2_5`** | `mode:"omni_reference"`, `resolution`, `duration`, `aspect_ratio:"9:16"`, `generate_audio:false` si el sonido va en montaje |
| Plano sencillo con movimiento contenido, desde un fotograma inicial | `kling3_0` | `mode:"pro"`, `sound:"off"` si el sonido va en montaje, `aspect_ratio:"9:16"` |
| Necesito 4K nativo | `seedance_2_0` | `mode:"std"` (obligatorio para 1080p/4K), `resolution:"4k"` |
| Persona que habla con audio sincronizado | `wan2_7` o `sync_so` (lipsync sobre un clip existente) | Ver §4 |
| Transferir un movimiento real grabado (camarero, cocinero) a otro sujeto | `hf_mult_motion_control` (Genjutsu) | Roles `image_references` + `video_references` |
| Anuncio de producto con presentador | `marketing_studio_video` | `mode` (preset), `aspect_ratio:"9:16"` (por defecto 16:9) |
| Cambiar el plato u objeto de un vídeo real | `hf_mult_replace_object` o `seedance_2_5` `video_edit` | Vídeo fuente ≤ 20 s para editar |

Regla de la guía oficial: **no rebajar a Seedance 1.5** solo porque su enumeración de duraciones sea más fácil de leer; se valida primero Seedance 2.5.

## 2. Modelos generativos principales

### `seedance_2_5` — Seedance 2.5 (ByteDance) · por defecto para vídeo serio [OFICIAL]

| Parámetro | Opciones | Por defecto |
|---|---|---|
| `mode` | `t2v`, `omni_reference`, `video_edit`, `video_extension` | **`t2v`** (sin referencias) |
| `duration` | 4–30 s | 5 |
| `resolution` | 480p, 720p, 1080p | **720p** |
| `generate_audio` | bool | **true** |
| `bitrate_mode` | standard, high | standard |
| `extension_mode` | backward, forward (solo en `video_extension`) | — |
| Roles de medios | `start_image`, `end_image`, `image_references`, `video_references`, `audio_references` | |
| Proporciones | auto, 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 | |

- **Precio medido (24/09/2026, `omni_reference`, sin audio, 9:16):** 480p = 3 cr/s · 720p = 7 cr/s · 1080p = 12 cr/s [MEDIDO] (→ [`03-precios-y-economia.md`](03-precios-y-economia.md)).
- `video_edit`: se cobra por la duración del vídeo fuente; `duration` y `aspect_ratio` se ignoran. `video_extension`: la proporción sale del vídeo extendido. Extensión de 4–30 s por pasada, con un techo de 60 s [OFICIAL ByteDance, vía smixs].
- Hasta 1080p; para 4K nativo, Seedance 2.0 [OFICIAL].
- La guía de ByteDance para Seedance 2.5 (31/07/2026) admite hasta 50 referencias (30 imágenes, 10 vídeos y 10 audios). El número que admite el MCP no está documentado: **verificar con el esquema** antes de pasar más de 4–5.

### `kling3_0` — Kling 3.0 · opción más barata para escenas de un solo plano [OFICIAL]

| Parámetro | Opciones | Por defecto |
|---|---|---|
| `mode` | std, pro, 4k | **std** |
| `duration` | 3–15 s | 5 |
| `sound` | on, off | **on** ("off" = silencio y menos créditos) |
| Roles | `start_image`, `end_image` | |
| Proporciones | 16:9, 9:16, 1:1 | |

- `pro` = 1080p. Precio medido: 5,25 cr por 3 s (22/09/2026); 8,75 cr por 5 s a 1076×1924 (09/09/2026) [MEDIDO, con sonido sin precisar].
- Etiquetado como multitoma, audio sincronizado y transferencia de movimiento en el catálogo.

### `seedance_2_0` — Seedance 2.0 · cuando hace falta 4K nativo

| Parámetro | Opciones | Por defecto |
|---|---|---|
| `mode` | std, fast | std |
| `resolution` | 480p, 720p, 1080p, 4k (1080p y 4K solo en `std`) | **720p** |
| `duration` | 4–15 s | 5 |
| `genre` | auto, action, horror, comedy, noir, drama, epic | auto |
| `generate_audio` | bool | **true** |
| `bitrate_mode` | standard, high | standard |
| Roles | `start_image`, `end_image`, `image_references`, `video_references`, `audio_references` | |

Precios medidos: 45 cr por 5 s a 1080p; 36 cr por 4 s con fotograma inicial y final (09/09/2026) [MEDIDO].

### `wan2_7` — Wan 2.7 · audio sincronizado y personaje consistente

2–15 s, 720p/1080p (por defecto 720p), roles `start_image`, `end_image`, `audio_references`, proporciones 16:9, 9:16, 1:1, 4:3, 3:4. ⚠️ La base heredada decía "4:3 nativo, hay que reencuadrar": **el catálogo actual admite 9:16**.

### `minimax_h3` — MiniMax H3 · keyframes a 2K y referencias mixtas

4–15 s, 2K fijo, `batch_size` 1–4, todos los roles de referencia. Precio medido: 10 cr por 5 s (09/09/2026). Comparado con Seedance 2.5 [COMUNIDAD, smixs]: *H3 falla por omisión (entrega un conjunto más cinematográfico, pero se salta planos de la lista); 2.5 falla por exceso (ejecuta casi todo, pero puede usar mal una referencia)*.

### `marketing_studio_video` — Marketing Studio

12–15 s, 480p/720p/1080p (por defecto 720p), `generate_audio` por defecto true, `avatar_ids` (máximo 1), `product_ids`, `hook_id`, `setting_id`, `ad_reference_id`. **Proporción por defecto 16:9**: pasar 9:16. Modos, ganchos y ajustes → [`06-marketing-studio-analisis-y-apps.md`](06-marketing-studio-analisis-y-apps.md).

## 3. Resto del catálogo generativo

| ID | Qué es | Límites y valores por defecto |
|---|---|---|
| `cinematic_studio_3_0` | Cinema Studio Video 3.0, el de mayor calidad cinematográfica | 4–15 s; 480p–4K (por defecto 720p); `genre`; audio por defecto false. Medido: 50 cr por 5 s a 1080p |
| `cinematic_studio_video_v2` | Cinema Studio v2 | 3–12 s; `speedramp` (slowmo/speedup/impact/linear/custom), `multi_shots`, `cfg_scale`; **sin parámetro de resolución**. Medido: 7,5 cr por 5 s |
| `cinematic_studio_video` | Cinema Studio (antiguo) | 5 o 10 s; `slow_motion`; `sound` |
| `seedance1_5` | Seedance 1.5 Pro | 4, 8 o 12 s (por defecto 4); 480p–1080p; audio por defecto true. Medido: 12 cr por 4 s a 1080p |
| `seedance_2_0_mini` | Seedance 2.0 barato y rápido | 4–15 s; solo 480p/720p |
| `kling3_0_turbo` | Kling rápido y barato | 3–15 s; 720p/1080p; solo `start_image` |
| `kling2_6` | Kling 2.6 | 5 o 10 s; `sound`; solo `start_image`. Medido: 5 cr por 5 s |
| `veo3_1` | Google Veo 3.1 | 4, 6 u 8 s (por defecto 8); `quality` basic/high/ultra (por defecto basic); `variant` preview/fast (por defecto **fast**); solo `start_image`, **sin fotograma final**. Medido: preview/high 29 cr por 4 s |
| `veo3_1_lite` | Veo 3.1 Lite, para lotes | 4, 6 u 8 s; audio por defecto false; `start_image` y `end_image` |
| `veo3` | Google Veo 3 | `variant` preview/fast |
| `minimax_hailuo` | Hailuo, física barata | 6 o 10 s; 512/768/1080; variantes 2.3. ⚠️ Vetado por reglas de Torre de Vega para manos |
| `minimax_h3_max` | H3 rápido | 5–15 s; 480p/768p |
| `wan3_0`, `wan3_0_prime` | Wan 3.0 con audio nativo | 2–30 s (o −1: el modelo elige la duración y se cobra como 10 s); 480p–1080p; `enable_thinking`; todos los roles |
| `wan2_6` | Wan 2.6 estilizado | 5, 10 o 15 s; 720p/1080p |
| `flux_3_video` | FLUX 3 Video con audio | 5–20 s; 720p/1080p; `start_image`, `end_image`, `image_references`, `video_references` |
| `gemini_omni` | Gemini Omni Flash | 4–10 s; 720p; hasta 7 imágenes o 1 vídeo de referencia |
| `gemini_omni_flash_1_1` | Gemini Omni 1.1 | modos text/image/reference-to-video y edit; 3–10 s; 360p–4K |
| `grok_video_v15`, `grok_video` | xAI, estilo marcado | 2–15 s; 480p–1080p |
| `happy_horse_video` | Texto o fotograma inicial | 3–15 s; 720p/1080p |
| `ad_multiplier` | Variantes de anuncio con Seedance 2.5 | Mismos modos que Seedance 2.5. Solo para variantes independientes pedidas explícitamente |
| `higgsfield_preset` | Presets heredados | Sin resolución ni prompt; **sin preflight de coste**. No apto para entrega verificable |

## 4. Edición, extensión y transferencia de movimiento

| ID | Uso | Notas |
|---|---|---|
| `seedance_2_5` `video_edit` | Cambiar un objeto, el fondo, el idioma o quitar la música de un vídeo existente | Fuente ≤ 20 s (los vídeos largos se atascan); un solo cambio por pasada; "@Video 1 is the sole editing master" [OFICIAL ByteDance] |
| `seedance_2_5` `video_extension` | Alargar hacia delante o hacia atrás | 4–30 s por pasada, con un techo de 60 s |
| `hf_mult_motion_control` (Genjutsu) | Copiar el movimiento de un vídeo guía a sujetos de imagen | 480p–1080p. **No admite preflight sin el vídeo subido** (error 422) |
| `hf_mult_replace_object` (Genjutsu) | Sustituir un objeto o plato en un vídeo real | 480p–1080p |
| `kling_video_edit` | Kling 3.0 Omni Edit: editar con texto e imágenes | std/pro/4k (por defecto pro) |
| `flux_3_video_edit` | Editar con texto | Usa como mucho los primeros 15 s; **1 cr por segundo** procesado [OFICIAL, catálogo] |
| `sync_so` | **Sync Lipsync 3**: sincroniza un vídeo con un audio | Roles `input_video` + `input_audio`; `sync_mode` bounce/loop/cut_off/silence/remap (por defecto bounce) |

Instrucción del servidor MCP [OFICIAL]: *copiar, repetir o transferir movimiento, gestos, baile o movimiento de cámara → `hf_mult_motion_control`; sustituir un objeto, producto, prenda o personaje en un vídeo fuente → `hf_mult_replace_object`*. Son modelos directos de `generate_video`, no el antiguo `motion_control`.

## 5. Utilidades de vídeo

| ID o herramienta | Uso | Parámetros clave |
|---|---|---|
| `upscale_video` (herramienta) | Reescalar | Dos proveedores (→ §5.1). **Sin preflight de coste** |
| `topaz_video` | Topaz como modelo | 1080p/2160p; `enhancement`, `frame_interpolation` |
| `bytedance_video_upscale` | ByteDance como modelo, **la única forma de elegir el pro** | `model_version` standard/**pro**; `preset` common/aigc/short_series/ugc/old_film; 1080p/2k/4k (por defecto 2K); `fps` 24–60. Se lanza con `generate_video` y **admite preflight** (→ §5.2) |
| `video_upscale` | Reescalado genérico | — |
| `video_deflicker` | Quitar parpadeo | — |
| `video_background_remover`, `sam_3_video` | Quitar el fondo o segmentar | `sam_3_video`: `apply_mask`, `frames_count` |
| `reframe` (herramienta) | Cambiar la proporción de un vídeo rellenando bordes | 1 vídeo + `start_image` opcional + 1–2 imágenes guía; >15 s requiere `duration_seconds` y `resolution` (máximo 60 s); **admite `get_cost`** |
| `clipify` | Cortar un vídeo de YouTube en clips con subtítulos | Hasta 20 clips, 9:16 por defecto |

### 5.1 `upscale_video`: los dos proveedores [OFICIAL, esquema de la herramienta]

- **`bytedance`**: exige `width` y `height` del vídeo fuente en píxeles; `preset` (por defecto `common`); `resolution` 1080p/2k/4k (por defecto 2K); `fps` 24/30/60. **Por encima de 30 fps el coste se duplica.** No expone `model_version`: el "pro" **no** se puede elegir desde esta herramienta.
- **`topaz`**: `aspect_ratio` (por defecto `auto`) y `resolution` 1080p/2160p. No necesita las dimensiones del vídeo fuente.
- Ninguno acepta prompt. Coste medido y límites de calidad → [`03-precios-y-economia.md`](03-precios-y-economia.md) §2 y skill `directoria`, `hosteleria/03` §4.
- **Salida [MEDIDO, 24/09/2026]:** Topaz entrega **HEVC**; ByteDance, H.264. Seedance 2.5 a 1080p nativo también entrega HEVC. Para Instagram se transcodifica a H.264.

### 5.2 ByteDance pro con `generate_video` [MEDIDO, 24/09/2026]

```json
{
  "model": "bytedance_video_upscale",
  "model_version": "pro",
  "preset": "aigc",
  "resolution": "1080p",
  "fps": 24,
  "medias": [{ "role": "video_references", "value": "<job_id o media_id del clip>" }]
}
```

- Preflight: 1 cr; **cargo real: 1,21 cr** por 6 s de 720p → 1080×1920. Salida H.264 y proporción conservada.
- **Calidad medida** (cazuela de gambas; detalle fino con el keyframe como 100 %): pro **71 %** · `aigc` standard 53 % · Topaz 37 % · Seedance 1080p nativo 31 %. El pro es el mejor reescalador del catálogo para comida; Topaz solo gana en estabilidad temporal. Detalle en `directoria`, `hosteleria/03` §4.

## 6. Lo que ha cambiado respecto a la base heredada

| Base heredada (`directoria/references/knowledge/03`) | Catálogo del 24/09/2026 |
|---|---|
| Seedance 2.0 para movimiento complejo | Seedance 2.5 es el modelo por defecto para vídeo serio; 2.0 solo para 4K |
| El lipsync no está en el MCP | Existe `sync_so` (Sync Lipsync 3) |
| Wan 2.7 solo en 4:3 | Admite 9:16 |
| No hay reescalador pro por MCP | `bytedance_video_upscale` con `model_version:"pro"` se lanza con `generate_video` (verificado el 24/09/2026, 1,21 cr por 6 s; §5.2). No se puede elegir desde `upscale_video` |
| — | Modelos nuevos: `wan3_0`, `flux_3_video`, `gemini_omni_flash_1_1`, `seedance_2_0_mini`, `minimax_h3_max`, `happy_horse_video`, `kling_video_edit`, `video_deflicker`, `video_background_remover` |
