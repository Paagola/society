# 04 · Trampas y errores del MCP

Cada fila ha costado ya una llamada fallida, un gasto duplicado o un render repetido. Se lee **antes de la primera llamada de una sesión nueva**.

## Índice

1. Valores por defecto que traicionan
2. Instrucciones oficiales del servidor MCP
3. Comportamientos del servidor
4. Errores y qué significan
5. Límites de calidad observados
6. Contradicciones entre capas

---

## 1. Valores por defecto que traicionan

Fuente: catálogo en vivo del 24/09/2026, salvo que se indique otra.

| Modelo o herramienta | Valor por defecto | Qué pasa si no se corrige | Qué pasar |
|---|---|---|---|
| `seedance_2_5` | `mode:"t2v"` | **Ignora las referencias**: genera desde texto e inventa el local | `mode:"omni_reference"` |
| `seedance_2_5`, `seedance_2_0`, `seedance1_5`, `marketing_studio_video` | `generate_audio:true` | Se paga audio que después se tira en montaje | `generate_audio:false` si el sonido va en montaje |
| `kling3_0` | `sound:"on"`, `mode:"std"` | Más créditos y menos de 1080p | `sound:"off"`, `mode:"pro"` |
| Todos los de vídeo | resolución 720p (o `std`) | Entrega por debajo de lo prometido | Resolución explícita |
| Vídeo en general | `aspect_ratio` 16:9, **no sigue al keyframe** | Vídeo horizontal recortado; re-render completo | `aspect_ratio:"9:16"` |
| `marketing_studio_video` | 16:9 [OFICIAL, descripción de la herramienta] | Anuncio horizontal | `aspect_ratio:"9:16"` o `width:1080, height:1920` |
| Imagen de inicio cuadrada | — | Vídeo 1080×1920 con 420 px negros arriba y abajo [MEDIDO] | La imagen de inicio nace en 9:16 (outpaint) |
| `outpaint_image` | `aspect_ratio:"21:9"` | Imagen panorámica | `aspect_ratio:"9:16"` |
| `gpt_image_2`, `gpt_image_2_5` | 1K, `quality:"low"` | Imagen floja | Resolución y calidad explícitas |
| `veo3_1` | `variant:"veo-3-1-fast"`, `quality:"basic"`, 8 s | No es la calidad "preview" medida | Fijar variante y calidad |
| `seedance1_5` | 4 s por defecto en el catálogo actual. [COMUNIDAD, robonuggets]: en una versión anterior el valor por defecto era 12 s (el triple de coste) | Gasto inesperado | Pasar `duration` siempre |
| `seedance_2_0` | `mode:"std"`; `fast` solo llega a 720p | "mode 1080p not allowed" si se mezclan | 1080p/4K exigen `std` |
| Kling frente a Seedance 2.0 | La resolución va en `mode` en Kling y en `resolution` en Seedance | Error al copiar parámetros de un modelo a otro | Revisar el esquema del modelo llamado |

## 2. Instrucciones oficiales del servidor MCP

Estas instrucciones vienen del propio servidor de Higgsfield (texto de inicialización del MCP y descripciones de herramientas, 24/09/2026) [OFICIAL]:

- **Comando slash o receta con nombre:** llamar primero a `get_preset_instructions` y seguir esa entrada, antes de subir nada.
- **Vídeos de varios pasos:** llamar primero a `get_workflow_instructions` sin argumento. Para varias ediciones de un mismo clip: `get_workflow_instructions({workflow:"ad-multiplier"})`.
- **Medios locales sin `media_id` confirmado:** llamar a `media_upload_widget` **como única herramienta de ese turno**. Para medios web: `media_import_url`. En `medias[].value` solo van `media_id` o `job_id`, **nunca URLs `https://`**.
- **Varias generaciones independientes:** herramientas `*_batch` (2–12 peticiones) → `jobs_wait` → un único `show_generation_by_ids`. `count` 2–4 solo para variantes del **mismo** prompt y los mismos ajustes.
- **Genjutsu:** transferencia de movimiento → `hf_mult_motion_control`; sustitución de objeto → `hf_mult_replace_object`. Imágenes con rol `image`, un único vídeo con rol `video`.
- **Duda de modelo:** `models_explore(action:"recommend")` antes de generar.
- **Aplicar `adjustments`** devueltos por el servidor y llamar a cualquier `recovery_tool` indicada.
- **Timeout de transporte:** el resultado puede ser desconocido. **No reenviar automáticamente**; reutilizar el `job_id` devuelto y reintentar solo cuando se sepa qué pasó.
- **`use_unlim`:** omitirlo. Si el usuario tiene generaciones ilimitadas que cubren el modelo, el servidor no envía nada y devuelve una pregunta (`unlim_choice`) que hay que hacer al usuario.
- **Virality Predictor:** para predecir viralidad o analizar un vídeo terminado.

## 3. Comportamientos del servidor

- **Trampa del preset recomendado:** si el prompt se parece a un preset (caso real: "IN THE DARK", id `24bae836-2c4a-48e0-89b6-49fcc0b21612`, con prompts largos de comida), el servidor devuelve un `notice` de tipo `preset_recommendation` **sin `results` ni `job_id`**. Parece que se ejecutó y no generó nada. Se reenvía con `declined_preset_id`.
- **Concurrencia:** máximo 8 trabajos simultáneos ("Rate limit reached"); `jobs_wait` consulta grupos de hasta 8 y la galería admite hasta 24 IDs [contrato observado].
- **Cambiar de workspace invalida todos los `media_id`** ("Media input not found"). Tras reconectar el MCP también pueden quedar obsoletos.
- **`select_workspace`** al inicio: sin workspace seleccionado, las generaciones pueden fallar en silencio [COMUNIDAD, robonuggets].
- **Se pide Pro y se sirve `nano_banana_2`:** es un *fallback*. Se registra y se informa; no se reintenta.
- **Modelos Soul:** descartan las referencias sin avisar.
- **Sin preflight:** presets (`higgsfield_preset`, error literal: *"Cost preflight (get_cost) is not yet supported for Higgsfield presets"*), `upscale_video`, y Genjutsu sin vídeo subido (error 422).
- **Aprobaciones:** varias llamadas de gasto se rechazaron por falta de aprobación manual. En la app de Society, las llamadas de gasto pasan por el libro de gastos, nunca por una aprobación en el chat.
- **Acceso a resultados desde el contenedor de Claude:** no descarga de `d8j0ntlcm91z4.cloudfront.net` (403) ni abre Pinterest. Para revisar un resultado, se descarga y se sube al chat, o se añade el dominio a la red permitida.
- **Los archivos del chat no llegan a Higgsfield** sin pasar por el recuadro de subida (`media_upload_widget`).

## 4. Errores y qué significan

| Error | Causa probable | Qué hacer |
|---|---|---|
| `Missing required params: prompt` | Sin prompt | Pedirlo |
| `Missing required params: medias` en `brain_activity` / Virality | Falta el vídeo | Exactamente un vídeo |
| `Invalid values: X (allowed: …)` | Valor fuera de la enumeración | Elegir uno permitido |
| `Unknown params: X` | El modelo no declara ese parámetro | `models_explore(action:"get")` |
| `Unknown media role "X"` | Rol incorrecto para ese modelo | Revisar `medias[].roles` en el esquema |
| `Model accepts only one image reference` | Modelo de una sola referencia (Veo, Kling Turbo, Kling 2.6, Grok) | Una imagen |
| `Model does not accept media inputs` | Modelo solo con prompt | Quitar los medios |
| `Something went wrong` sin más | Posible bloqueo de plan | Comprobar el plan y el saldo |
| `nsfw` / `ip_detected` | Moderación | Reformular; no repetir el mismo texto |
| Falso positivo NSFW en Seedance | Clasificador conservador (anatomía, vocabulario sensual) | Generalizar la anatomía y neutralizar los adjetivos |
| HTTP 429 | Demasiadas peticiones | Esperar |
| Página HTML con `captcha-delivery` | Antibot | Esperar 30 s y reintentar |

## 5. Límites de calidad observados

- **Morfismo en órbitas y macros sobre comida blanda.** Los objetos rígidos aguantan.
- **Continuidad en multitoma corta:** 3 tomas en 5 s rompen el recuento de piezas, la orientación y el fondo [OBSERVADO, chuletón].
- **Calentamiento y oscurecimiento en Seedance** [MEDIDO] (skill `directoria`, `hosteleria/02`).
- **Cabeza parlante en Kling:** inventa cuello y hombros si no se prohíbe ("floating head only").
- **Deriva de cara acumulada** tras 3–4 generaciones encadenadas: volver a anclar a la foto original cada ~5.
- **El tono de piel se contagia** desde la referencia de escena.
- **La librería clásica de movimientos de cámara** (Bullet Time, Crash Zoom, Robo Arm, 360 Orbit) no tiene un parámetro `motions` en el MCP: solo presets. Los movimientos se escriben en el prompt.
- **Cadencia falsa:** Seedance puede rellenar con fotogramas repetidos [COMUNIDAD].
- **Seedance 2.5 corta por su cuenta** aunque se pida plano secuencia [COMUNIDAD, smixs].

## 6. Contradicciones entre capas

Informe 04 del TFG: el MCP tiene tres capas que pueden no coincidir. **Lo que acepta la herramienta**, **lo que el modelo puede hacer en teoría** y **lo que el servidor ajusta**. Ejemplo: `image` frente a `image_references` en Nano Banana Pro (la base heredada dice `image` y el servidor lo acepta; el esquema declara `image_references`). No se prueban cargas al azar con generaciones de pago: se consulta el esquema y se registra la discrepancia.
