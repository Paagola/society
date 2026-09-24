# 01 · El sistema OpenMontage

Qué es OpenMontage, cómo se gobierna y cómo se usa para producir piezas de Society sin romper las reglas del cliente. Fuente: repositorio local `C:\Users\victo\OpenMontage` (commit `08e2151`, 05/09/2026; `AGENT_GUIDE.md`, `skills/`, `pipeline_defs/`, `config.yaml`) y el prompt de producción propio `prompts/openmontage-reel-torre-de-vega.md`.

## Índice

1. Qué es y qué licencia tiene
2. Las tres capas de conocimiento
3. Rule Zero: todo pasa por un pipeline
4. Pipelines útiles para hostelería
5. Etapas, puertas y política de checkpoints
6. Motores de composición
7. Modo plantilla frente a modo atelier
8. Presupuesto y configuración
9. Restricciones de Society sobre OpenMontage

---

## 1. Qué es y qué licencia tiene

OpenMontage es un sistema de producción de vídeo dirigido por agentes: el LLM recorre un pipeline por etapas (idea → guion → escenas → recursos → edición → composición → publicación) guiado por *skills* en Markdown, con herramientas en Python y composición final en Remotion o HyperFrames.

**Licencia AGPL-3.0.** Se usa como **herramienta interna de la agencia** para producir piezas; **no se integra en el producto Society**. Integrarlo en un SaaS obligaría a publicar el código de ese servicio. El render de producto de Society es Remotion propio (→ [`06-remotion-para-society.md`](06-remotion-para-society.md)).

## 2. Las tres capas de conocimiento

| Capa | Dónde | Qué contiene |
|---|---|---|
| 1 · Herramientas | `tools/tool_registry.py` | Catálogo con `capability`, `provider` y `agent_skills[]` |
| 2 · Convenciones | `skills/{core,creative,meta,pipelines}/` | Cómo hace las cosas OpenMontage: transiciones, ritmo, tipografía, directores de etapa |
| 3 · Proveedores | `.agents/skills/` | Conocimiento de APIs externas (Seedance, Kling, Remotion, GSAP, ElevenLabs…) |

**Puerta de la capa 3 (obligatoria):** antes de generar con una herramienta se leen las skills que declara en `agent_skills`. Nunca se lee el código Python de una herramienta para saber cómo usarla.

## 3. Rule Zero: todo pasa por un pipeline

Cita de `AGENT_GUIDE.md`: *"Every video production request MUST go through the pipeline system. No exceptions."*

1. Identificar el pipeline en `pipeline_defs/`.
2. Leer su manifiesto YAML.
3. Hacer el *preflight* de herramientas con el registro.
4. Ejecutar etapa por etapa, leyendo **antes** la skill del director de cada etapa.
5. Leer la capa 3 antes de llamar a cualquier herramienta con `agent_skills`.

**Prohibido:** scripts Python improvisados, saltarse el pipeline, generar recursos sin leer al director, saltarse *preflight*, checkpoints o revisión.

**Contrato de comunicación de decisiones:** anunciar herramienta, proveedor, modelo y motivo **antes** de cualquier llamada de pago. Pedir aprobación antes de cambios mayores (de proveedor, de vídeo a imagen fija, de movimiento a estático). **Nunca un cambio silencioso.**

## 4. Pipelines útiles para hostelería

| Pipeline | Cuándo | Vocabulario de transición | Rasgo clave |
|---|---|---|---|
| `cinematic` | Reel héroe, pieza con fotogramas memorables, parte de un reel de referencia | Corte, fundido a negro, disolvencia lenta, *push* o *punch-in* contenido (máximo 4 tipos) | Fotogramas héroe explícitos (apertura, revelación, cierre, rótulo) especificados en los 5 aspectos; regla de Murch |
| `hybrid` | Pieza apoyada en **metraje real** con capas de apoyo | Hereda el catálogo general | "El medio ancla sigue siendo primario"; orden fijo de capas: subtítulos → rótulos → diagramas o cifras → inserts → CTA; zonas seguras por variante |
| `documentary-montage` | Pieza documental del local (historia, oficio) | Solo corte, disolvencia de 0,5–1 s, fundido a negro de 0,5 s y fundidos de apertura y cierre | Prohibidos *wipes*, *push/slide*, *zoom blur*, RGB split, *light leaks* y *glitch* ("leen como edición de redes") |
| `talking-head`, `clip-factory`, `podcast-repurpose` | Persona hablando o recortes de un vídeo largo | Corte + L/J-cut | Quitar muletillas, silencios de más de 1,5 s y arranques en falso |

Regla del prompt de Torre de Vega: **con reel de referencia → `cinematic`**, empezando por `skills/meta/video-reference-analyst.md`; **si la pieza se apoya sobre todo en metraje real → `hybrid`**.

## 5. Etapas, puertas y política de checkpoints

Cada pipeline tiene directores por etapa (`research`/`idea`, `proposal`, `script`, `scene`, `asset`, `edit`, `compose`, `publish`) y un `executive-producer.md` con los límites de presupuesto y revisiones.

- **Puertas humanas:** en las etapas con `human_approval_default: true`, tras la revisión se hace checkpoint con `status="awaiting_human"`, se presenta el resumen y **se termina el turno**. La aprobación es por puerta: un "adelante" anterior no cubre la siguiente.
- **La puerta de recursos se revisa antes de renderizar ningún borrador**, con una tira de fotogramas fijos, no con vídeo renderizado.
- **Política de checkpoints** (`config.yaml`): `guided` (por defecto), `manual_all` u `auto_noncreative`. Para clientes se usa `manual_all`, o `guided` sin aprobación automática en ninguna etapa creativa.
- **Muestra primero:** antes de la pieza completa, una muestra de 10–15 s (gancho + una escena intermedia) con voz, imagen, música y estilo de subtítulos reales.
- **Puertas de Society** (prompt de Torre de Vega): A análisis y propuesta · B guion y lista de planos · C hoja de contactos de keyframes · D clips · E montaje con revisión automática.

## 6. Motores de composición

| Motor | Cuándo |
|---|---|
| **Remotion** | Por defecto para piezas con vídeo: clips + transiciones + capas en una sola pasada React (`OffthreadVideo`) |
| **HyperFrames** | Rótulos cinéticos, composiciones HTML/GSAP, tráileres tipo *launch reel*; `hyperframes check` debe pasar antes del render |
| **FFmpeg** | Solo operaciones sueltas (recortar, transcodificar, quemar subtítulos) o concatenar metraje sin composición |

- **Regla dura:** si Remotion y HyperFrames están disponibles, se presentan **los dos** con sus ventajas e inconvenientes y se espera la elección. No se elige uno por defecto en silencio.
- **Promesa de movimiento:** si la pieza exige movimiento (`motion_required=true`), está **prohibido** sustituirla por una versión de imágenes fijas con Ken Burns o cambiar de motor en silencio. Si el motor falla, se escala al usuario.

## 7. Modo plantilla frente a modo atelier

- **Plantilla:** los tipos de escena predefinidos del compositor (`text_card`, `hero_title`, `stat_card`, `callout`, `comparison`, gráficos, `kpi_grid`…). Es rápido, pero hace que "todos los vídeos se parezcan".
- **Atelier** (`skills/meta/bespoke-composition.md`): composición hecha a mano, sin reutilizar componentes creativos. Es el modo por defecto para trabajo **héroe** (marketing, lanzamientos, marca). Regla de oro: *"reuse engine knowledge, never creative components"*.
- **Recurso distintivo escaso:** en modo atelier, un recurso visual único que aparece en 1–2 momentos como mucho, nunca como columna vertebral repetida.
- **Distinción de escenas:** dos escenas no pueden compartir el mismo sujeto visual principal (sin "columna de componente héroe").

## 8. Presupuesto y configuración

`config.yaml` (valores por defecto globales):

```yaml
budget:
  mode: warn            # observe | warn | cap
  total_usd: 10.00
  reserve_pct: 0.10
  single_action_approval_usd: 0.50
  require_approval_for_new_paid_tool: true
checkpoint:
  policy: guided        # guided | manual_all | auto_noncreative
output:
  default_resolution: "1920x1080"   # ⚠️ horizontal
  default_fps: 30
  default_crf: 23
```

Para una pieza de cliente: `budget.mode: cap`, `total_usd` = presupuesto del brief, `single_action_approval_usd: 0.50`. Los límites por pipeline (presupuesto, tiempo máximo, revisiones) viven en su `executive-producer.md`. `max_wall_time_minutes: 12`: Seedance puede tardar más, y **una espera no es un fallo**. Se guarda el `job_id`, no se relanza y se reanuda desde el checkpoint.

## 9. Restricciones de Society sobre OpenMontage

Del prompt de producción de Torre de Vega (vigente). **Mandan sobre cualquier valor por defecto, skill o playbook de OpenMontage** cuando chocan:

- **Formato:** OpenMontage renderiza por defecto en 1920×1080. Los reels son **1080×1920, 9:16**, con los rótulos dentro de la zona segura (→ [`04-texto-subtitulos-y-audio.md`](04-texto-subtitulos-y-audio.md)).
- **Material:** nada de stock ni archivo (Pexels, Pixabay, Unsplash, Archive.org, Wikimedia). Nada de texto a vídeo: todo plano generado sale de **imagen a vídeo** desde un keyframe anclado a fotos reales. Si existe metraje real de fuego, brasa o textura caótica, no se genera.
- **La etapa de investigación no busca tendencias en la web para el guion:** sus fuentes son el análisis de Instagram del cliente, el plan de contenido y la noticia del brief.
- **Avisos comprobados en el código:** `seedance_video` solo expone 480p/720p (aunque la API de fal admite 1080p; se puede añadir `"1080p"` al enum en una copia local, o se para y se pregunta). `atlas_video` ofrece `1080p-esr`, que es reescalado: no vale para 1080p nativo. `kling_video` (fal) solo expone `v3/standard`; para `pro` se usa `kling_official_video`. Veo 3.1 no admite imagen final.
- **Si el modelo devuelto no coincide con el pedido, se dice.**
- **Idioma:** prompts de generación en inglés; conversación en español.
- **Entregables:** vídeo 1080×1920 (Remotion) o clips + EDL + SRT + voz (After Effects); guion en el formato del cliente; registro de intentos; aprendizajes **propuestos**, nunca escritos directamente en las reglas.

Para piezas con los modelos de Higgsfield, la ruta de generación la marca la skill `higgsfield`; OpenMontage entra en guion, escenas y composición.
