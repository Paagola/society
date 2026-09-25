---
name: higgsfield
description: 'Operativa de Higgsfield para Society: qué modelo o herramienta usar en cada caso de hostelería, con qué parámetros, cuánto cuesta y dónde falla. Catálogo en vivo del MCP (24/09/2026: Seedance 2.5/2.0, Kling 3.0, Wan, Veo, Genjutsu, Sync Lipsync 3, Nano Banana, GPT Image 2.5, Topaz generativo, outpaint, reescaladores), valores por defecto que traicionan (Seedance 2.5 en t2v y con audio, 16:9, 720p), precios medidos por segundo y resolución, coste por reel y cliente, instrucciones oficiales del servidor, Marketing Studio, Virality Predictor, trazabilidad y MCP frente a API REST. Actívala antes de llamar a Higgsfield, al elegir modelo o resolución, presupuestar créditos, reescalar o reencuadrar, depurar un error, o si se mencionan créditos, get_cost, Seedance, Kling, Nano Banana, Topaz o Virality Predictor. No escribe el prompt (directoria) ni decide planos (director).'
license: 'Contenido propio + adaptaciones de fuentes MIT y CC BY 4.0 (ver "Fuentes")'
metadata:
  author: victor-society
  version: "2.1.0"
---

# Higgsfield

> **Regla cero, obligatoria antes de cualquier otra:** todo lo que se produzca tiene que parecer rodado, no generado. Lee y aplica [`../README.md`](../README.md) (firma de rodaje real: material real primero, plano de foco con nombre, luz con fuente, cámara y física con peso, un verbo de manos por plano, corte seco, sonido obligatorio y revisión con `medir_realismo.py`). Detalle: `directoria/references/hosteleria/08-firma-de-rodaje-real.md`.

La skill que convierte "quiero este plano" en **una llamada correcta, presupuestada y registrada**. No decide la estética (`directoria`) ni la cinematografía (`director`); decide la herramienta exacta, los parámetros y el coste, y evita los errores que ya se han pagado.

> **Regla de oro:** verificar, no suponer. El catálogo cambia cada semana y los valores por defecto casi nunca son los que quieres. Antes de gastar: `models_explore(action:"get")` + `get_cost`. Después: se registra **lo servido**, no lo pedido.

## Antes de la primera llamada de la sesión

1. Leer [`references/04-trampas-y-errores.md`](references/04-trampas-y-errores.md) §1–2 (valores por defecto e instrucciones oficiales del servidor).
2. Workspace seleccionado (`list_workspaces` / `select_workspace`): cambiarlo invalida todos los `media_id`.
3. Saldo (`balance`); si es menor de 200 cr, avisar antes de cualquier vídeo.
4. Medios locales → `media_upload_widget` como única herramienta del turno; medios web → `media_import_url`. En `medias[].value` solo van `media_id` o `job_id`.

## Elegir la herramienta

**Imagen** → [`references/02-catalogo-imagen.md`](references/02-catalogo-imagen.md)
- Plato o local real con fotos: `nano_banana_pro` (2K por defecto, 2 cr por imagen).
- Texto legible, carta o cartel: `gpt_image_2_5`.
- Foto 1:1 a 9:16: `flux_2_pro_outpaint` o `outpaint_image` (por defecto 21:9: pasar 9:16).

**Vídeo** → [`references/01-catalogo-video.md`](references/01-catalogo-video.md)
- Plano serio, multitoma o cámara móvil: `seedance_2_5` con `mode:"omni_reference"`.
- Plano sencillo desde un fotograma inicial: `kling3_0` con `mode:"pro"`.
- 4K nativo: `seedance_2_0` con `mode:"std"`.
- Movimiento real transferido o sustitución de objeto: Genjutsu (`hf_mult_motion_control` / `hf_mult_replace_object`).
- Lipsync: `sync_so` o `wan2_7`.
- Anuncio con presentador: `marketing_studio_video`.

**Reescalar o reencuadrar** → `01` §5 y `02` §4. Ningún reescalador de vídeo acepta prompt; `upscale_video` no admite preflight.

**Sin tener claro el modelo:** `models_explore(action:"recommend")`. Flujos de varios pasos: `get_workflow_instructions`.

## Los parámetros que siempre se fijan

| Modelo | Fijar siempre |
|---|---|
| `seedance_2_5` | `mode`, `resolution`, `duration`, `aspect_ratio`, `generate_audio` |
| `kling3_0` | `mode:"pro"`, `sound`, `aspect_ratio`, `duration` |
| `seedance_2_0` | `mode:"std"` para 1080p/4K, `resolution`, `generate_audio`, `aspect_ratio` |
| `nano_banana_pro` | `resolution`, `aspect_ratio` |
| `gpt_image_2_5` | `resolution`, `quality` (por defecto low) |
| `marketing_studio_video` | `aspect_ratio:"9:16"` (por defecto 16:9), `mode` |
| `upscale_video` (ByteDance) | `width` y `height` del vídeo fuente, `preset`, `resolution`, `fps` ≤ 30 (más fps duplica el coste) |
| `bytedance_video_upscale` (con `generate_video`) | `model_version:"pro"`, `preset:"aigc"`, `resolution:"1080p"` (por defecto 2K), vídeo en `video_references`. **Reescalador recomendado** (`references/01` §5.2) |

## Precios de referencia (créditos del plan, medidos)

- Seedance 2.5 `omni_reference`, sin audio: **480p 3 cr/s · 720p 7 cr/s · 1080p 12 cr/s** (24/09/2026).
- Nano Banana Pro 2K: **2 cr por imagen**. Kling 3.0 pro: 1,75 cr/s. ByteDance `aigc` 6 s: 0,12 cr; **ByteDance pro 6 s: 1,21 cr**. Topaz: 3–9 cr por clip.
- **Regla R-RES-01 (24/09/2026):** Seedance 2.5 se genera a 720p y solo la toma aprobada se reescala con ByteDance pro. En la A/B dio más detalle que el 1080p nativo (71 % frente al 31 % del keyframe) por 43,21 cr frente a 72. 1080p nativo solo si el cliente lo exige por escrito (skill `directoria`, `hosteleria/03` §3.1).
- Reel tipo: **156 cr con R-RES-01**, 229 cr a 1080p nativo. Cliente con 3 reels por semana: 2.028 cr/mes, 949 menos que a 1080p nativo. Precio mínimo de un plan: `(coste + 0,25) / 0,57338` (`references/03` §3–4).

Tabla completa, coste por formato y por cliente, tasa de aceptación y conversión a euros (hipótesis) → [`references/03-precios-y-economia.md`](references/03-precios-y-economia.md).

## Flujo de una generación

1. **Describir la tarea sin nombrar un modelo** y comparar rutas: material real, generación, edición o composición (`05` §2).
2. **Consultar el esquema vivo** del modelo elegido; si contradice esta skill, manda el esquema y se anota la discrepancia.
3. **Preflight** (`get_cost:true`) y anuncio: modelo, parámetros, coste, saldo antes y después. En producción manual, esperar aprobación.
4. **Enviar**: lotes independientes con `*_batch` → `jobs_wait` → `show_generation_by_ids`. Máximo 8 simultáneos (2 vídeos por tanda en producción manual).
5. **Timeout:** no reenviar. Reutilizar el `job_id` y esperar a saber qué pasó.
6. **Si vuelve un `notice` sin `job_id`**: preset recomendado → reenviar con `declined_preset_id`.
7. **Registrar la fila** del registro de generaciones (`05` §6) y verificar el artefacto (`05` §7) antes de declararlo bueno.

## Lo que Higgsfield ofrece además de generar

Virality Predictor (0 cr, sobre el render montado, como puerta auxiliar), Video Analysis por escenas (3–5 min), Marketing Studio (avatares, productos, ganchos, *ad references*), flujos `draw_to_video` y `reframe`, apps del Marketplace, Shorts Studio y publicación en TikTok → [`references/06-marketing-studio-analisis-y-apps.md`](references/06-marketing-studio-analisis-y-apps.md).

## MCP frente a API REST

El MCP es la herramienta de la agencia y de Claude; el producto Society hablará con la **API REST** desde su backend. Monederos, nombres, subida de medios, estados e idempotencia son distintos. Además, la API REST pública de Seedance 2.5 aún no documenta referencias de imagen ni 1080p → [`references/07-api-rest-y-arquitectura.md`](references/07-api-rest-y-arquitectura.md).

## Convención de evidencia

[MEDIDO] = cargo, preflight o medición propia · [OFICIAL] = catálogo en vivo, esquema de la herramienta, skill oficial o documentación oficial · [COMUNIDAD] = skills públicas de terceros · [OBSERVADO] = visto sin medir · **hipótesis** = pendiente de prueba.

## Mapa de referencias

| Archivo | Cuándo leerlo |
|---|---|
| [`references/01-catalogo-video.md`](references/01-catalogo-video.md) | Elegir modelo de vídeo, parámetros y valores por defecto; edición, extensión, lipsync, reescalado de vídeo |
| [`references/02-catalogo-imagen.md`](references/02-catalogo-imagen.md) | Elegir modelo de imagen; outpaint, reescalado generativo, quitafondos |
| [`references/03-precios-y-economia.md`](references/03-precios-y-economia.md) | Presupuestar una pieza, un reel, un cliente o el precio de un plan |
| [`references/04-trampas-y-errores.md`](references/04-trampas-y-errores.md) | Antes de la primera llamada y al depurar un error |
| [`references/05-protocolo-y-trazabilidad.md`](references/05-protocolo-y-trazabilidad.md) | Descubrir una capacidad nueva, resolver contradicciones, registrar y verificar |
| [`references/06-marketing-studio-analisis-y-apps.md`](references/06-marketing-studio-analisis-y-apps.md) | Virality Predictor, Video Analysis, Marketing Studio, flujos, presets y apps |
| [`references/07-api-rest-y-arquitectura.md`](references/07-api-rest-y-arquitectura.md) | Diseñar la integración de Society con la API REST |
| Base histórica: `../directoria/references/knowledge/01-higgsfield-mcp.md`, `02`, `03`, `07` | Detalle heredado del flujo MCP (algunos datos superados: ver `01` §6) |

## Fuentes

- Catálogo en vivo del MCP (`models_explore` de vídeo e imagen) y esquemas de `generate_video`, `upscale_video`, `upscale_image`, `outpaint_image`, `reframe`, `virality_predictor` y `video_analysis_create`, consultados el 24/09/2026.
- Instrucciones de inicialización del servidor MCP de Higgsfield (24/09/2026).
- `higgsfield-ai/skills`, skill oficial `higgsfield-generate` v0.12.0 (commit `d071406`, 11/09/2026), MIT.
- Informes propios: "Aprendizajes de resolución, texturas y reescalado" (24/09/2026), `informes/higgsfield/02`–`05` (19–22/09/2026), informes de Torre de Vega del 09/09 y 14/09/2026.
- `OSideMedia/higgsfield-ai-prompt-skill` v3.35 (MIT): economía de producción (Hell Grind), disciplinas de registro y verificación, fallos.
- `robonuggets/higgsfield-skill` (CC BY 4.0, RoboLabs): plan y recargas (sin verificar), bloqueo por plan, `select_workspace`.
- `smixs/visual-skills` (CC BY 4.0, Serge Shima): guía oficial de Seedance 2.5 y comparación con H3.
