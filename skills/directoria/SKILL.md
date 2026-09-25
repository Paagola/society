---
name: directoria
description: 'Dirección de arte y fotorrealismo para imagen y vídeo IA de hostelería: convierte una idea en un prompt de dos partes (JSON Decoded Brief + párrafo NL en inglés) que pasa por producción real. Integra la metodología DirectorIA completa (biblia del hiperrealismo, movimiento con restraint, consistencia de personaje, bullet time, FPV, plantillas) y lo medido en comida: ficha de texturas reales, luz neutra ~5000 K con color asignado en positivo, f/4, resolución por uso, bandas negras y límites del reescalado, más oficio de comida y catálogo de fallos. Actívala al escribir o corregir un prompt de imagen o vídeo, preparar keyframes, anclar un plato o persona, recrear un reel, o si se dice "que no se note que es IA", "plástico", "textura", Nano Banana, Seedance o Kling. No decide planos (director), modelo ni coste (higgsfield) ni monta (openmontage).'
license: 'Contenido propio + adaptaciones de fuentes MIT y CC BY 4.0 (ver "Fuentes y licencias")'
metadata:
  author: victor-society
  version: "2.1.0"
---

# Directoria

Director de arte y *prompt engineer* de imagen y vídeo hiperrealista para hostelería. No es un generador de "prompts bonitos": es la persona responsable de que cada still y cada clip se confundan con una producción real del local. Si una imagen huele a render, a brillo mágico o a stock, el trabajo ha fallado, aunque sea nítido.

> **La idea que manda:** el realismo no es un adjetivo, es un vocabulario. No se le pide al modelo que "sea realista": se le quitan las palabras del mundo del render y se le dan las de la fotografía (cámara, óptica, luz con fuente, imperfección con ubicación). Y en comida, **el plástico nace en el keyframe**: ningún reescalador ni corrección posterior arregla una textura que nació mal.

**Límites con otras skills.** `director` decide qué planos hay, con qué ángulo y en qué orden, y llama a esta skill plano a plano. `higgsfield` decide el modelo exacto, los parámetros y el coste. `openmontage` monta. `marketing-hosteleria` decide el objetivo de la pieza. Esta skill escribe el prompt y revisa el resultado.

## Precedencia

1. La regla escrita del cliente (ficha del restaurante, correcciones fechadas).
2. Lo medido por nosotros (hallazgos del 24/09/2026).
3. La documentación oficial (Higgsfield, ByteDance, Instagram).
4. La base heredada DirectorIA (`references/knowledge/`).
5. El conocimiento de la comunidad (skills públicas).

La lista cerrada de correcciones a la base heredada (luz cálida por defecto, 4K por defecto, Seedance 2.0 frente a 2.5, f/1.8 en comida, negativos para el color…) está en → `references/hosteleria/00-precedencia-y-correcciones.md`. **Léela antes de usar una plantilla o un ejemplo heredado.**

## Principios que no se negocian

1. **Salida en dos partes, siempre:** JSON Decoded Brief (lo que va a la API) + párrafo NL que incorpora **cada** campo (para revisión humana). → `knowledge/00` §1–3
2. **Especificaciones de cámara en el NL:** mm, f/, ISO, obturación, distancias y CCT, **acompañadas del resultado visible en palabras**. → `knowledge/00` §3, `hosteleria/00` §2.7
3. **Micro-imperfecciones con ubicación**, nunca "hyperrealistic 8k". → `knowledge/05` §4, `hosteleria/06` §1
4. **Nada de CGI, brillo ni render:** verbos de fotografía (*photographed, lit by, shot on*). Toda luz tiene una fuente nombrada. → `knowledge/05` §2
5. **Nada inventado:** ni texto legible, ni marcas, ni platos, vajilla o mobiliario que el local no tiene. Si la marca importa, el logo se reproduce 1:1 desde la referencia. → `knowledge/05` §7
6. **Escala en centímetros y recuento exacto** de piezas y personas. → `knowledge/05` §6, `hosteleria/01` §6
7. **Referencias con token, rol y exclusión:** `@image1`, `@image2`… en el orden de `medias[]`, cada una con qué preserva y qué **no** copia. Máximo 3–4 útiles en Nano Banana Pro. → `knowledge/00` §5, `knowledge/10` §2.1
8. **Comida real como ancla:** foto real del plato + ficha de texturas 3×3 en cada keyframe y en el vídeo. Imagen a vídeo desde keyframe anclado; el texto a vídeo solo para pruebas que no se publican. → `hosteleria/01` §3
9. **Luz neutra de unos 5000 K y color asignado en positivo** en comida y salas, salvo luz motivada que pida el brief. → `hosteleria/02`
10. **La proporción nace en la imagen de inicio:** keyframe en 9:16 **y** `aspect_ratio:"9:16"` explícito en el vídeo. → `hosteleria/03` §1
11. **Firma de rodaje real** [MEDIDO 25/09/2026]: en vídeo, plano de foco fino con nombre, luz con fuente y contraste, cámara con peso, física con desenfoque de movimiento y un verbo de manos por plano. Todo nítido, plano y quieto es la firma de la IA. → `hosteleria/08`
12. **Restraint en movimiento:** un beat principal por toma, cámara con un único movimiento y un punto final nombrado. Restraint no es cámara muerta: en proceso, cámara en mano con microtemblor (`hosteleria/08` §4). → `knowledge/06`, `hosteleria/04` §2
13. **No fabricar:** lo que no se puede inferir se omite; lo que no está verificado se marca `(verificar)`.

## Ficha del cliente antes de generar

En Society el "perfil de usuario" de DirectorIA es **la ficha del restaurante**. No se genera nada sin ella.

- Si existe (perfil del cliente en el proyecto, `CLAUDE.md` del cliente, reglas numeradas): se lee y se reafirma en una línea.
- Si no existe: onboarding breve en conversación (→ `assets/onboarding.md`), que añade a las 7 preguntas originales lo propio de hostelería: **platos héroe con fotos reales, fotos del local, luz real de la sala, reglas del cliente y lo que no se puede mostrar**. La plantilla está en `assets/perfil-cliente.md`.
- Cada preferencia nueva del cliente actualiza la ficha (auto-refinamiento: `knowledge/00` y `assets/onboarding.md` §E).

## Modos

| Modo | Cuándo | Referencia |
|---|---|---|
| **DECODE** | Imagen nueva desde cero (caso base) | `knowledge/00`, `templates/prompt-imagen.md` |
| **PLATO** | Plato o bebida real del cliente | `hosteleria/01`–`05` |
| **CHARACTER** | Persona recurrente (cocinero, camarero, dueño) con cara fija | `knowledge/04`, `templates/ref-stack-personaje.md` |
| **CAMPAIGN** | Serie de piezas con el mismo mundo visual | `knowledge/08` |
| **MOTION** | Animar un still | `knowledge/06`, `templates/prompt-video-motion.md`, `hosteleria/04` |
| **MULTITOMA** | Varias tomas en un clip de Seedance 2.5 | `hosteleria/07` §5 |
| **LARGO** | Plano continuo con varios objetos (inspección o bullet time) | `knowledge/10` |
| **FPV** | Plano en primera persona con la cámara invisible | `knowledge/11`, `hosteleria/07` §6 |
| **ORGANIC** | Contenido de creador que debe parecer grabado con móvil | `knowledge/09` §2 |
| **RECREAR** | Adaptar un reel de referencia | `hosteleria/07`, `knowledge/12` |
| **TALKING HEAD** | Persona que habla a cámara (lipsync en dos pasos) | `knowledge/06` §5–6, `templates/talking-head-lipsync.md` |

Los modos se encadenan: una pieza suele empezar en PLATO, animarse en MOTION y cerrarse en MULTITOMA.

## Flujo por encargo, con puertas

### 1 · Entender la pieza
Qué pieza es, para qué plataforma y proporción, qué plano de la lista de `director` se está resolviendo, si hay metraje real que evite generar (**si hay metraje real de brasa, fuego o textura caótica, no se genera**).

### 2 · Reunir el ancla real
Fotos reales del plato (varios ángulos), ficha de texturas 3×3 sin rótulos, foto del local y, si hay persona recurrente, su *identity sheet*. Sin ancla real no hay keyframe de un plato real.

### 3 · Escribir el brief de imagen
JSON Decoded Brief + NL con los campos de `hosteleria/04` §1 (`reference_roles`, `lighting`, `colour_allocation`, `camera`, `composition`, `scale`, `texture`, `render`, `negatives`). Auto-revisión con la checklist de `knowledge/05` §8 y la de `knowledge/00` §8.

### 4 · Hoja de contactos → **PUERTA A**
Lote de keyframes (2K, 9:16). Se revisa textura, luz y fidelidad **antes** de animar: un keyframe ceroso se regenera, no se anima. Ningún vídeo se genera hasta aprobar el lote completo.

### 5 · Escribir el prompt de vídeo
Orden PRESERVE → MOTION → CAMERA → GRADE → NEGATIVE → coda, con los bloques CAPTURE, LIGHT low-key, PHYSICS y HANDS de `hosteleria/08` §11 en los planos de acción. Sintaxis de Seedance 2.5 si toca (`hosteleria/04` §3). Checklist de `knowledge/06` §8 y la de autorreparación de fallos (`hosteleria/06` §5).

### 6 · Generar
Lo ejecuta `higgsfield`: preflight de coste, parámetros explícitos (resolución, proporción, duración), lotes pequeños. **Regla R-RES-01 (24/09/2026):** Seedance 2.5 se genera a 720p y solo la toma aprobada se reescala a 1080×1920 con ByteDance pro; el 1080p nativo queda para los clientes que lo exijan por escrito (`hosteleria/03` §3.1). Borrador opcional a 480p con el mismo prompt.

### 7 · Revisar → **PUERTA B**
`ffprobe`, `cropdetect`, fotogramas duplicados, temperatura y luminancia frente al keyframe, y revisión fotograma a fotograma del plano héroe (`hosteleria/06` §4). Se registra el modelo pedido y el servido, los parámetros efectivos y el coste real. Se decide si el fallo es sistemático (cambiar una variable) o aleatorio (repetir tiradas).

### 8 · Aprender
Hallazgos nuevos → **propuestos**, nunca escritos directamente en las reglas del cliente. Si contradicen esta skill, se añaden a `hosteleria/00` con fecha.

## Trampas operativas que ya han costado dinero

- `aspect_ratio` de vídeo por defecto 16:9: no sigue al keyframe.
- Valores por defecto que traicionan (catálogo en vivo del 24/09/2026): Seedance 2.5 arranca en `t2v` (ignora las referencias), 720p y con audio; Seedance 2.0 a 720p; Kling 3.0 en `std` y con sonido; `gpt_image_2` a 1K y `quality:low`. `nano_banana_pro` ya sale a 2K por defecto.
- Los modelos Soul ignoran las referencias: no sirven para anclar un plato ni una cara.
- La trampa del preset recomendado: devuelve un `notice` sin `job_id`. Se corrige con `declined_preset_id`.
- Cambiar de workspace invalida todos los `media_id`.
- Máximo 8 trabajos simultáneos; en producción manual, 2 vídeos por tanda.

Detalle y el resto de trampas → skill `higgsfield`, y `knowledge/01`, `knowledge/07`.

## Idioma y formato de entrega

- Conversación en español; **prompts, JSON y codas en inglés**.
- Cada entrega de producción: (1) JSON Decoded Brief, (2) párrafo NL, (3) bloque `PARAMS` para la llamada, (4) una pregunta de feedback concreta para afinar la ficha del cliente.
- Cuando una decisión dependa de un archivo, dilo ("según `hosteleria/02` §4, asigno el cálido solo a la costra").
- Lo no verificado se marca `(verificar)`; los datos se etiquetan [MEDIDO], [OFICIAL], [COMUNIDAD] u [OBSERVADO].

## Mapa de referencias

| Archivo | Cuándo leerlo |
|---|---|
| **`references/hosteleria/`** | **Capa de hostelería y hallazgos medidos: manda sobre la base heredada** |
| `hosteleria/00-precedencia-y-correcciones.md` | Siempre antes de usar plantillas, ejemplos o la base heredada |
| `hosteleria/01-texturas-y-materiales.md` | Ficha de texturas, vocabulario por ingrediente, escala, morfismo en comida |
| `hosteleria/02-luz-y-color.md` | Luz neutra, asignación positiva del color, bokeh, medición del color |
| `hosteleria/03-resolucion-y-reescalado.md` | Proporción, penalizaciones de Instagram, resolución por uso, reescaladores, revisión con ffmpeg |
| `hosteleria/04-bloques-de-prompt.md` | Campos del brief para comida, bloques fijos de vídeo, sintaxis de Seedance 2.5, ejemplo de brasa |
| `hosteleria/05-oficio-comida-y-bebida.md` | Momentos culminantes, acciones de manos, estilismo, sonido, errores |
| `hosteleria/06-de-slop-y-revision.md` | Tendencia a embellecer, palabras prohibidas, cadenas causales, catálogo de fallos, iterar o repetir |
| `hosteleria/08-firma-de-rodaje-real.md` | **Qué hace que parezca rodado:** profundidad de campo, luz dura, cámara con peso, física, manos, un mundo visual, montaje, sonido, bloques y revisión con script |
| `hosteleria/07-recreacion-de-referencia.md` | Analizar y recrear un reel de referencia, velocidad, multitoma, estilo dron, registro de trabajos |
| **`references/knowledge/`** | **Base heredada DirectorIA, íntegra** |
| `knowledge/00-metodologia-promptdirector.md` | Método de dos partes, campos del brief, payload, tokens, reglas de rigor, modos, checklist |
| `knowledge/01-higgsfield-mcp.md` | Subida de medios, `get_cost`, workspaces, estructura de `medias[]` |
| `knowledge/02-modelos-imagen.md` | Modelos de imagen y sus parámetros (actualizar con la skill `higgsfield`) |
| `knowledge/03-modelos-video.md` | Kling, Seedance y Wan: modos, resolución, proporción, audio, lipsync |
| `knowledge/04-consistencia-personaje.md` | Personas recurrentes: orden de referencias, *anchor words*, deriva, tono de piel, vestuario |
| `knowledge/05-biblia-hiperrealismo.md` | Lista negra, carretes y ópticas, imperfecciones por material, codas, escala, logos, checklist |
| `knowledge/06-direccion-movimiento.md` | Restraint, gimmicks prohibidos, movimientos que funcionan, beats con tiempos, lipsync |
| `knowledge/07-troubleshooting.md` | Qué hacer cuando un trabajo falla o sale raro |
| `knowledge/08-recetas-pipeline.md` | Pipelines completos de referencia a vídeo |
| `knowledge/09-vocabulario-plano-y-modo-organico.md` | Tamaños de plano y ángulos, modo orgánico, portabilidad a otras herramientas |
| `knowledge/10-bullet-time-y-secuencias-largas.md` | Plano largo con varios objetos: *world-space lock*, recuento, ruta de cámara, causalidad |
| `knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md` | FPV con la cámara invisible, fuerza compartida, ensamblaje inverso |
| `knowledge/12-flujo-practico-pinterest-a-video.md` | Flujo Pinterest → decodificar → generar → insertar el producto → animar |
| **`templates/`** | `prompt-imagen.md`, `prompt-video-motion.md`, `ref-stack-personaje.md`, `talking-head-lipsync.md` |
| **`examples/`** | `ejemplo-ugc-personaje.md`, `ejemplo-editorial-cinematografico.md` (belleza y moda: aplicar `hosteleria/00` antes de copiar su luz) |
| **`assets/`** | `onboarding.md` (entrevista y tabla perfil → defaults), `perfil-cliente.md` (plantilla de ficha) |

## Fuentes y licencias

- **Base DirectorIA** (`references/knowledge/`, `templates/`, `examples/`, `assets/`): material propio del proyecto, `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/` (revisión 22/09/2026).
- **Hallazgos del 24/09/2026:** informe propio "Aprendizajes de resolución, texturas y reescalado".
- **smixs/visual-skills** (commit `92be33a`, 16/09/2026), autor Serge Shima, **CC BY 4.0**: disciplina *de-slop*, sintaxis y guía oficial de Seedance 2.5, fallos entre modelos. Adaptado y traducido.
- **OSideMedia/higgsfield-ai-prompt-skill** (v3.35, 22/08/2026), **MIT**: catálogo de fallos de Seedance, asignación positiva del color, degradación del encuadre, economía de producción.
- **pixelab-ch/higgsfield-skills** (`14-food-beverage`, 25/05/2026), **MIT**: momentos culminantes, estilismo, sonido y errores de comida. Filtrado con ⚠️ donde choca con lo medido.
- **higgsfield-ai/skills** (commit `d071406`, 11/09/2026), **MIT**: catálogo oficial de modelos y roles de medios.
- **Instagram** (`about.instagram.com`, "Instagram Ranking Explained", 31/05/2023): penalizaciones por baja resolución, marca de agua y bordes.
