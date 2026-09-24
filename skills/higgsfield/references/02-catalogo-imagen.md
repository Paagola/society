# 02 · Catálogo de imagen

Catálogo en vivo (`models_explore(action:"list", type:"image")`, 24/09/2026), cruzado con la guía oficial de elección de modelo de `higgsfield-ai/skills` y con la experiencia de producción.

## Índice

1. Elección rápida para hostelería
2. Modelos principales con sus valores por defecto
3. Resto del catálogo
4. Utilidades de imagen
5. Comportamientos conocidos

---

## 1. Elección rápida para hostelería

| Necesidad | Modelo | Por qué |
|---|---|---|
| Keyframe de un plato o local real a partir de fotos reales | **`nano_banana_pro`** | Líder en preservación con referencias; probado en producción (2 cr por imagen a 2K) |
| Iterar rápido sobre una edición sencilla con referencias | `nano_banana_2_lite` o `nano_banana_2` | Más barato; Lite admite hasta 14 referencias [OFICIAL] |
| Carta, cartel, rótulo o texto legible dentro de la imagen | `gpt_image_2_5` | Modelo por defecto oficial para diseño y texto |
| Sala o fachada **sin personas** | `soul_location` | "Best in class" en entornos [OFICIAL]. ⚠️ Solo con prompt: no reproduce **el** local real; útil para conceptos, no para la sala del cliente |
| Retrato editorial o UGC de una persona **sin identidad fija** | `soul_2` | Solo con prompt; ignora las referencias |
| Anuncio de producto con presentador (flujo Marketing Studio) | `marketing_studio_image`, `ms_image` (DTC Ads) | `ms_image` exige un `style_id` elegido por el usuario |
| Editar una cara dentro de una escena compleja | `seedream_v4_5` | Por encima de un cambio de ropa, sin filtros fuertes [OFICIAL] |
| Logo, icono o vector | `recraft_v4_1` (`model_type:"vector"`) | Paleta controlada |
| Pasar una foto real 1:1 a 9:16 | `flux_2_pro_outpaint` o la herramienta `outpaint_image` | Ver §4 |

Guía oficial, en una frase: GPT Image 2.5 para imagen, diseño y texto; Nano Banana 2 / Lite / Pro para trabajo con personajes o referencias; Soul para UGC y editorial; Marketing Studio para anuncios. En Society, **el plato real manda**: Nano Banana Pro con fotos reales y ficha de texturas, mientras GPT Image 2.5 y Seedream no se comparen con la misma ficha (pendiente en `directoria`).

## 2. Modelos principales con sus valores por defecto

| ID | Resolución (por defecto) | Otros parámetros | Roles de medios |
|---|---|---|---|
| `nano_banana_pro` | 1k / **2k** / 4k | — | `image_references` |
| `nano_banana_2` | **1k** / 2k / 4k | `is_inpaint` | `image_references`, `mask` |
| `nano_banana_2_lite` | 1k (única) | `thinking` MINIMAL/HIGH (por defecto HIGH), `is_inpaint` | `image_references`, `mask` |
| `nano_banana` | — | — | `image_references` |
| `gpt_image_2_5` | **1k** / 2k / 4k | `variant` flare/sunburst; `quality` **low**/medium/high/xhigh/max; `background` auto/opaque/transparent | `image_references` |
| `gpt_image_2` | **1k** / 2k / 4k | `quality` **low**/medium/high | `image` |
| `soul_2` / `soul_v2` | `quality` 1.5k / **2k** | `soul_id` | `image` (máximo 1) |
| `soul_cinematic` | `quality` 1.5k / **2k** | `soul_id` | `image` (máximo 1) |
| `cinematic_studio_2_5` | **1k** / 2k / 4k | — | `image` |
| `marketing_studio_image` | **1k** / 2k / 4k | — | `image` |
| `ms_image` (DTC Ads) | **1k** / 2k / 4k | `style_id` obligatorio, `brand_kit_id`, `quality` low/medium/high, `batch_size` 1–20, `product_ids` (máximo 4) | `image` (máximo 14) |
| `seedream_v4_5` | `quality` basic (hasta 4K) / high (~6K) | — | `image_references` |
| `seedream_v5_pro` | 1k / 1.5k / **2k** | `remove_bg`, `is_inpaint` | `image_references` |

Precio medido de `nano_banana_pro` a 2K, 9:16: **2 cr por imagen** (preflight del 22/09 y cargo del 24/09/2026). Se pide Pro, el trabajo se sirve como `nano_banana_2` y se cobra como "Nano Banana Pro" [MEDIDO]: es un *fallback* normal y **se registra lo servido**, no lo pedido.

⚠️ **Base heredada desactualizada:** decía que `nano_banana_pro` venía a 1K y que había que forzar 4K. Hoy viene a 2K por defecto y 2K es el estándar de producción; 4K solo para el plano héroe o impresión.

## 3. Resto del catálogo

| ID | Qué es |
|---|---|
| `image_auto` | Enruta automáticamente al mejor modelo según la intención del prompt |
| `soul_cast` | Persona de carácter muy marcado, solo 16:9, `budget` 10–500, sin medios |
| `soul_location` | Entornos y localizaciones sin personas, solo con prompt |
| `z_image` | El más rápido y barato, estilizado, solo con prompt |
| `flux_2` | Variantes pro/flex/max, buena adherencia al prompt; 1k/2k |
| `flux_kontext` | Edición y transferencia de estilo |
| `kling_omni_image` | Kling O1 Image, fotorrealista, muchas proporciones |
| `openai_hazel` | Edición y el mejor texto; `quality` por defecto medium |
| `seedream_v5_lite`, `seedream_5_0_flash` | Edición por instrucciones |
| `grok_image`, `grok_image_2_0` | Estilo expresivo y de alto contraste |
| `recraft_v4_1` | `model_type` standard/vector/utility/utility_vector; `colors` (hasta 10 hex) |
| `nano_banana_2_shots` | Variante "shots" de Nano Banana (sin descripción en el catálogo: verificar antes de usar) |
| `autosprite` | Sprites de videojuego (fuera del alcance de Society) |

## 4. Utilidades de imagen

| ID o herramienta | Uso | Parámetros clave |
|---|---|---|
| `upscale_image` (herramienta) | Reescalar a 2K/4K | Solo proveedor `bytedance`; exige `width` y `height` del original; **coste fijo, admite `get_cost`** |
| `bytedance_image_upscale` | Mismo reescalado, como modelo | 2k/4k (por defecto 4K), `remove_bg` |
| `topaz_image` | Topaz clásico | `output_width` y `output_height` obligatorios; variantes Standard V2 / Low Resolution V2 / CGI / High Fidelity V2 / Text Refine; `sharpen`, `denoise`, realce de caras |
| **`topaz_image_generative`** | **Reescalado generativo que añade detalle** | Variantes **Redefine** (por defecto) / Recovery / Recovery V2 / Standard MAX; `creativity` 1–6; `texture` 1–5; `autoprompt` (por defecto true). ⚠️ No está en la herramienta `upscale_image`: verificar si se lanza con `generate_image` usando este `model_id` |
| `outpaint_image` (herramienta) | Ampliar el lienzo a otra proporción | `aspect_ratio` (**por defecto 21:9**: pasar 9:16), `width`/`height` opcionales; admite `get_cost` |
| `flux_2_pro_outpaint` | Ampliación por lado en píxeles | `expand_top/bottom/left/right` (negativo = recortar ese lado; si todo es recorte, se sirve en local y gratis) |
| `outpaint` | Ampliación genérica | Proporción de destino |
| `image_background_remover` | Quitar el fondo | ⚠️ `remove_background` falló sobre plato blanco + mano en la carta web (se "comió" partes) [OBSERVADO] |

**Hipótesis para comida** (→ `directoria`, `hosteleria/01` §1): `topaz_image_generative` con creatividad baja sobre el keyframe aprobado, **antes** de animar, podría añadir el grano y la textura que Nano Banana no llega a dar. Pendiente de A/B con la métrica de detalle fino.

## 5. Comportamientos conocidos

- **Soul ignora las referencias:** con `medias[]`, el trabajo guarda `prompt:""` y solo regenera variaciones de la referencia. No sirve para anclar un plato ni una cara real.
- **`gpt_image_2` tiende al "brillo IA"** y modifica caras: no sirve para identidad recurrente.
- **Nano Banana Pro con muchas referencias:** la atención se diluye a partir de 3–4 [base heredada]. Según la comunidad (smixs), los límites por tipo en la API de Google son de hasta 6 objetos de alta fidelidad, 5 de personaje y 3 de estilo en Pro; no verificado por MCP.
- **Nano Banana tiende al HDR sobrecocinado** [COMUNIDAD]: pedir *"natural contrast, no HDR look"*.
- **Marca de agua invisible:** todas las generaciones de Google llevan SynthID [COMUNIDAD]. Afecta a la obligación de etiquetar contenido IA (skill `marketing-hosteleria`).
- **Modelos solo con prompt** (rechazan medios): `z_image`, `recraft_v4_1`, `soul_cast`, `soul_location` [OFICIAL].
