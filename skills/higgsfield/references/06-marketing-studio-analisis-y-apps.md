# 06 · Marketing Studio, análisis de vídeo, flujos y apps

Funciones de Higgsfield que van más allá de "generar un plano": anuncios con presentador y producto, puntuación de viralidad, análisis por escenas, flujos de edición y apps. Fuente principal: skill oficial `higgsfield-ai/skills` (`higgsfield-generate`, commit `d071406`, 11/09/2026) y esquemas del MCP en vivo (24/09/2026).

## Índice

1. Virality Predictor
2. Video Analysis
3. Marketing Studio
4. Flujos (workflows)
5. Presets, apps y Shorts Studio
6. Encaje en Society

---

## 1. Virality Predictor

- **Qué es:** un proxy objetivo de la atención para probar creatividades terminadas. Entra un vídeo y sale un **informe de texto** con puntuaciones y un enlace al panel. Nombre técnico en la CLI: `brain_activity`; en el MCP: la herramienta `virality_predictor` (`action:"create"` con `medias:[{role:"video", id}]`, `action:"preview"` con `job_id`).
- **Qué devuelve** [OFICIAL]: puntuación global, segundo de máximo gancho, porcentaje de sostenimiento, regiones más fuertes y más débiles, y el enlace "Open report". Se interpreta así: puntuaciones altas en Visual, Auditiva, Lenguaje y Atención indican más estímulo y foco; **un Default Mode bajo es mejor** (menos mente divagando).
- **Formato de entrega recomendado:**

```text
Overall score: 44/100
Peak hook: 49% at 1s
Sustain: 89%
Strongest region: Visual Cortex
Risk: Default Mode is high, which can indicate mind-wandering.
Open report: <url>
```

- **Coste y límites** [MEDIDO, 09/09/2026]: 0 cr, unos 40 s, hasta unos 16 s de vídeo analizable.
- **Cómo usarlo en Society:** es una **puerta auxiliar**, no una verdad (informe 05 del TFG, "predictor con techo explícito"). Se pasa sobre el **render montado**, no sobre un clip suelto. Como mucho 2 iteraciones de mejora antes de replantear el concepto. La métrica real sigue siendo el rendimiento en Instagram (skill `marketing-hosteleria`).

## 2. Video Analysis

- `video_analysis_create` con **un** `video_input_id` (subido) **o** una `youtube_url`. Vuelve en estado `queued`; se consulta con `video_analysis_status`. Tarda **3–5 min** de media [OFICIAL, descripción de la herramienta].
- **Aviso obligatorio:** cuanto más largo es el vídeo, menos preciso es el análisis por escenas. Los clips cortos dan los resultados más fiables.
- Uso: analizar un reel de referencia plano a plano, como complemento del protocolo con ffmpeg de la skill `directoria` (`hosteleria/07` §1).

## 3. Marketing Studio

**Conceptos** [OFICIAL]:

- **Avatar:** la cara del presentador; *preset* (del catálogo) o *custom* (fotos subidas). En los modos UGC es opcional si el brief menciona a una persona (el servidor puede crear un Soul Character).
- **Producto:** artículo con título e imágenes. Se importa desde una URL o se crea con imágenes subidas.
- **Hook:** el "qué", la mecánica de gancho (p. ej. "un objeto entra volando en el plano"). **Setting:** el "dónde", el lugar o ambiente.
- **Ad reference:** un vídeo de inspiración cuyo escenario se recrea (composición, ritmo, gancho, narración). ⚠️ El avatar y el producto vinculados a una *ad reference* **no se aplican solos**: hay que pasarlos explícitamente en la llamada.
- **Brand kit:** logo, imágenes, colores, fuentes y tono, importados desde la web de la marca.
- **Ad format:** plantillas de estructura visual para imagen (`headline`, `bullet-points`…), obligatorio en DTC Ads.

**Reglas de uso** [OFICIAL]:

- **Hook/setting y ad reference son excluyentes:** o se compone con bloques, o se recrea una referencia. Nunca las dos cosas.
- Hook y setting solo son válidos en los modos `ugc`, `ugc_how_to`, `ugc_unboxing`, `product_review` y `ugc_virtual_try_on`.
- Con `hook_id`, pasar también `product_ids`: los ganchos están pensados para girar hacia un producto.
- **Una pregunta por fase;** no preguntar producto, avatar y modo a la vez.
- `ms_image` (DTC Ads): `style_id` **obligatorio**, elegido por el usuario tras `show_marketing_studio(type:"image_style")`. No hay valor por defecto.

**Modos de `marketing_studio_video`** [OFICIAL]:

| Modo | Para qué | Hook/setting |
|---|---|---|
| `ugc` (por defecto) | Presentador casual, aspecto orgánico | ✅ |
| `ugc_how_to` | Tutorial | ✅ |
| `ugc_unboxing` | Unboxing | ✅ |
| `product_showcase` | Producto limpio y cuidado, con poco presentador | ❌ |
| `product_review` | Opinión del presentador | ✅ |
| `tv_spot` | Anuncio de televisión | ❌ |
| `wild_card` | Experimental, el modelo elige | ❌ |
| `ugc_virtual_try_on` / `virtual_try_on` | Probarse ropa | ✅ / ❌ |

Parámetros actuales (catálogo en vivo): 12–15 s, 480p/720p/1080p, audio por defecto true, proporción por defecto 16:9 (**pasar 9:16**).

**Atajo Click-to-Ad:** importar el producto con su URL y generar el vídeo apuntando a la misma URL. El servidor reutiliza la entidad y no la vuelve a importar.

## 4. Flujos (workflows)

- `draw_to_video` ("Draw To Edit"): edita un vídeo a partir de un fotograma dibujado o editado en un instante concreto más una instrucción.
- `reframe`: cambia la proporción de un vídeo (en el MCP, la herramienta `reframe` admite `get_cost`; más de 15 s exige `duration_seconds` y `resolution`, hasta 60 s).
- `get_workflow_instructions` lista el resto: `ad-multiplier`, `character-sheet`, `website-builder-flow`… Los flujos **no** aparecen en `models_explore`.

## 5. Presets, apps y Shorts Studio

- **Presets virales:** `get_presets` para explorar, `execute_preset` para ejecutar. Explorar no autoriza a ejecutar [OFICIAL]. Los presets heredados (`higgsfield_preset`) no admiten preflight ni resolución: no sirven para una entrega verificable.
- **Apps del Marketplace:** `apps_search` → `apps_describe` → `apps_invoke`. Ejemplos documentados: Match Cut + Tracelab (`create_productcut` y `create_logocut`, 27 modos, sin parámetro de resolución: solo para pruebas) y Ad Recreator (contrato en `informes/higgsfield/ad-recreator-contrato.json`).
- **Shorts Studio** (`shorts_studio_create`, presets, sesiones y estado): generación de shorts completos. Sin evaluar para Society.
- **TikTok:** `tiktok_connect`, `tiktok_prepare_publish`, `tiktok_music_trending`. Publicación directa, sin evaluar.

## 6. Encaje en Society

- Marketing Studio está pensado para **productos de e-commerce con presentador**. Para un restaurante encaja en: plato envasado o producto de la tienda del local, UGC con un presentador del equipo (con permiso escrito) o un anuncio de una promoción concreta. **No sustituye** al flujo principal de keyframes anclados a fotos reales, porque no garantiza la fidelidad al local.
- Virality Predictor y Video Analysis cuestan 0 créditos y entran en la cadena de producción como comprobaciones automáticas.
