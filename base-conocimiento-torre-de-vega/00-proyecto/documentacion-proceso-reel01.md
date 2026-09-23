<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Documentación — Proceso de producción de Reels

Reel 01 (`carne.mp4`): 2026-09-07 · Ampliación con hallazgos medidos: 2026-09-08

> **Leer antes de producir cualquier Reel:** la [Parte II](#parte-ii--hallazgos-medidos-2026-09-08)
> contiene hallazgos medidos que **corrigen** varias decisiones de la Parte I. En concreto: pedir
> movimiento de cámara al modelo es la causa principal del aspecto IA, y el montaje no mueve las
> métricas de viralidad. La skill `after-effects-reels` (en `~/.claude/skills/`) tiene el detalle
> operativo completo.

---

# Parte I — Reel 01, análisis de plantilla y producción

Fecha: 2026-09-07

## Objetivo

Analizar un vídeo de referencia (`carne.mp4`, aportado por el cliente desde su carpeta de
Descargas) para extraer su desglose de escenas y su potencial de viralidad, como paso previo a
escribir el guion de un Reel nuevo para Torre de Vega inspirado en esa plantilla. Sigue el flujo
descrito en `imagenes/reglas_videos.md` (reglas 3 y 4).

## Archivos de referencia usados

- [`imagenes/reglas_videos.md`](../01-reglas-contenido/reglas_videos.md) — reglas de vídeo/Reels de Torre de
  Vega. En concreto:
  - Regla 3 — Higgsfield Virality Predictor (puntuación de rendimiento).
  - Regla 4 — Higgsfield Video Analysis (desglose escena por escena).
- Vídeo de entrada: `Downloads/carne.mp4` (aportado por el cliente como plantilla de inspiración).
  - Nota: se intentó primero con `imagenes/generadas/plantilla.mp4`, pero la confirmación de
    subida (`media_confirm`) falló de forma persistente (7 intentos, con dos subidas
    independientes) con un error genérico del servidor de Higgsfield. Se cambió a `carne.mp4` por
    indicación del cliente y esa subida sí se confirmó a la primera.

## Herramientas MCP de Higgsfield utilizadas

1. **`media_upload`** — genera una URL prefirmada de S3 para subir el vídeo.
   - Parámetros: `filename: "carne.mp4"`, `content_type: "video/mp4"`.
   - Devuelve `upload_url` (URL prefirmada) y `media_id` (UUID a reutilizar en el resto del flujo).
2. **Subida de bytes** — `curl -X PUT` con el contenido del vídeo contra la `upload_url` devuelta
   por `media_upload` (esto se hace fuera de MCP, directamente contra S3; confirmado por HTTP 200).
3. **`media_confirm`** — confirma que la subida a S3 se completó y registra el media como listo
   para usarse en generación/análisis.
   - Parámetros: `media_id`, `type: "video"`.
   - Resultado: `{"status": "uploaded"}`.
4. **`video_analysis_create`** — lanza el desglose escena por escena (regla 4).
   - Parámetro: `video_input_id` = el `media_id` confirmado (alternativa: `youtube_url` si el
     vídeo es un enlace de YouTube, no usado aquí).
   - Devuelve un `id` de análisis (`video_analyze_id`) con estado inicial `"queued"`.
5. **`video_analysis_status`** — consulta el estado del análisis anterior, sondeado hasta que
   `status` pasa a `"completed"` (con el array `scenes` ya poblado).
   - Parámetro: `video_analyze_id`.
6. **`virality_predictor`** (`action: "create"`) — lanza el análisis de potencial viral
   (regla 3).
   - Parámetros: `params.model: "virality_predictor"`, `params.medias: [{role: "video", id:
     <media_id>}]`.
   - Devuelve un `job_id`.
7. **`job_status`** — consulta el resultado del `virality_predictor` (que se ejecuta como un job
   genérico de Higgsfield, no con su propio endpoint de status).
   - Parámetros: `jobId` = el `job_id` anterior, `sync: true` (para que el servidor espere en la
     propia llamada hasta un estado terminal, hasta ~25s).
   - Devuelve `generation.status`, y cuando está `"completed"`, `generation.params.analysis.scores`
     (hook_score, peak_score, peak_second, overall_score, viral_potential, sustain,
     brain_engagement) y `results.rawUrl` (dashboard HTML interactivo).
8. **`balance`** — usada para comprobar que no era un problema de crédito lo que causaba el fallo
   inicial de `media_confirm` con `plantilla.mp4` (resultado: 83.5 créditos disponibles, plan
   Plus — no era un problema de saldo).

## Secuencia exacta de llamadas realizada

1. `media_upload` (filename: carne.mp4) → `upload_url` + `media_id`
   `f94861d5-6799-48a4-b867-9fabd75309f5`.
2. `curl -X PUT` de los bytes de `Downloads/carne.mp4` contra `upload_url` → HTTP 200.
3. `media_confirm` (media_id, type: video) → `{"status": "uploaded"}`.
4. En paralelo:
   - `video_analysis_create` (video_input_id = media_id) → `video_analyze_id`
     `9d8019e5-f892-44f9-a3f0-172783bb70b2`, estado `queued`.
   - `virality_predictor` (action: create, medias: [{role: video, id: media_id}]) → `job_id`
     `bc01777e-1fc3-4366-9215-ae03ea8494d0`.
5. Espera de ~4 minutos (el vídeo dura 11.4s / 343 fotogramas a ~30fps).
6. `video_analysis_status` (video_analyze_id) → `status: completed`, `scenes` con 11 planos
   desglosados (encuadre, movimiento, acción, timestamps).
7. `job_status` (jobId, sync: true) → `status: completed`, con `analysis.scores` y el dashboard
   interactivo en `results.rawUrl`.

## Resultado — Desglose de escenas (Video Analysis)

| # | Tiempo | Plano | Descripción |
|---|--------|-------|-------------|
| 1 | 0:00-0:01 | Extreme Close-Up | Pinchos de carne a la brasa sobre piedra caliente, humo blanco, luz cálida direccional |
| 2 | 0:01-0:02 | Extreme Close-Up | Misma toma con filtro B/N invertido de alto contraste (corte de shock) |
| 3 | 0:02-0:03 | Close-Up | Alitas de pollo fritas, sésamo, pizarra oscura |
| 4 | 0:03-0:04 | Close-Up | Panceta/bacon glaseado a la brasa, zoom rápido |
| 5 | 0:04-0:05 | Close-Up | Muslos de pollo fritos apilados, hierbas picadas |
| 6 | 0:05-0:06 | Medium Close-Up | Persona levantando fideos con palillos de una jarra de cristal |
| 7 | 0:06-0:07 | Close-Up | Hamburguesa gourmet con pincho de madera |
| 8 | 0:07-0:08 | Close-Up | Zoom rápido al pan de sésamo, profundidad de campo muy corta |
| 9 | 0:08-0:09 | Medium Shot | Plano cenital-diagonal de mesa completa (costillas BBQ + patatas + otras tablas) |
| 10 | 0:09-0:10 | Close-Up | Salsa de queso junto a nachos con guacamole |
| 11 | 0:10-0:12 | Close-Up | Vuelta al plano de apertura (loop), fade out |

**Patrón estructural:** ~1s por plano, casi sin movimiento de cámara (estático o zoom rápido),
loop visual (abre y cierra con la misma imagen), corte de shock (B/N invertido) justo después del
hook inicial.

## Resultado — Puntuación de viralidad (Virality Predictor)

| Métrica | Valor | Lectura |
|---|---|---|
| Hook score | 25 (bajo) | El arranque (0-3s) no engancha lo suficiente |
| Peak score / peak second | 0.33 en el segundo 8 | El pico de mayor activación llega tarde |
| Overall score | 41 | Medio-bajo |
| Viral potential | 40 | Medio-bajo |
| Sustain | 95 (muy alto) | Una vez enganchado, retiene muy bien la atención |
| Brain engagement | 31 | Activación moderada, sobre todo visual y de atención (frontoparietal) |

## Conclusión de viabilidad

El vídeo no es buen candidato para copiar literalmente el hook (arranca flojo y el pico real llega
en el segundo 8), pero sí para copiar el ritmo y la estructura de montaje: el sustain de 95 es
excelente y demuestra que el corte rápido de ~1s por plano sin movimiento de cámara retiene muy
bien la atención una vez enganchado el espectador. Recomendación aplicada: adelantar el plano más
fuerte (el equivalente al "plato hero"/mesa completa) a los primeros 1-2 segundos en la versión de
Torre de Vega, mantener el ritmo de corte y reutilizar el recurso barato del corte de shock
(B/N invertido) en la escena 2.

## Diseño del guion Torre de Vega y generación de las imágenes fijas

Siguiendo la regla 1 de `reglas_videos.md` (imágenes fijas primero, visto bueno del cliente, luego
vídeo), se tradujo el desglose de la plantilla a un guion propio de Torre de Vega:

1. Se propuso un guion inicial de 7 escenas, adelantando el plano de mayor impacto (mesa llena) a la
   apertura para corregir el hook_score bajo detectado en el análisis.
2. Se identificaron fotos reales de referencia por escena (jamón, solomillo, croquetas, vino, sala,
   postre) en `imagenes/local/`, `imagenes/comida/`, `imagenes/vinos/` y `imagenes/tartas/`, aplicando
   la regla 1 de `reglas_imagenes.md` (anclar cada generación en fotos reales del local).
3. Subida de referencias: `media_upload`/`media_confirm` para cada foto real (hasta 20 por llamada),
   seguido de `curl -X PUT` de los bytes contra la `upload_url`.
4. Generación de las 7 imágenes fijas en un solo lote con **`generate_image_batch`**
   (`model: "nano_banana_pro"`, ejecutado internamente como `nano_banana_2`; `aspect_ratio: "9:16"`,
   `resolution: "1k"` — la opción más cercana a 1080p disponible en el modelo, por ser keyframes que
   se animarán después, regla 2bis de `reglas_videos.md`), pasando las fotos reales de cada escena
   como `medias` con `role: "image_references"`.
5. Espera de los resultados con **`jobs_wait`** (hasta 12 jobs por llamada, timeout 15s, repitiendo
   hasta `all_terminal: true`) y visualización del lote completo con **`show_generation_by_ids`**.

### Correcciones aplicadas tras revisión del cliente

- Se detectó que `imagenes/local/copa_vino.png` no era una foto real del local (a pesar de estar en
  la carpeta de referencias reales) → se borró del repositorio y se dejó de usar como referencia.
- Escena "mesa llena": el mantel y el fondo (estantería, candelabro) estaban inventados por usar como
  referencia principal imágenes ya generadas por IA (`gmaps_08`/`gmaps_23`) en vez de una foto real →
  se regeneró anclando el mantel a `mantel_blanco.jpg` y dejando el fondo en bokeh cálido sin
  arquitectura reconocible; una segunda corrección resolvió que la mesa "flotaba" (recorte demasiado
  cerrado, sin patas ni suelo visibles) añadiendo el borde/pata de mesa y la silla de mimbre real de
  la referencia al encuadre.
- Escena "manos sirviendo el plato": el mantel y el plato estaban inventados por no incluir ninguna
  referencia real de mesa/vajilla en esa generación → se añadieron `mantel_blanco.jpg` y
  `plato-blanco-formal.jpg` como referencias. Una segunda corrección eliminó una acción de corte con
  cuchillo en primer plano que había aparecido sin pedirse, por ser exactamente el tipo de plano que
  la regla 11 de `reglas_imagenes.md` documenta como ya rechazado por el cliente en un proyecto
  anterior — se regeneró pidiendo explícitamente el traspaso del plato ya cortado, sin cuchillo ni
  acción de corte.
- Escena "sala": por indicación del cliente, se sustituyó el mantel propio de la foto real
  `mesa-ventana.jpg` (crema con trama) por el mantel liso real de `mantel_blanco.jpg`, mantenido el
  resto de la sala (ventana, cortinas, ladrillo, sillas) fiel a la foto original.
- Se descartó por completo la escena de "mesa llena" a petición del cliente y se reorganizó el guion
  a **6 escenas**, usando el solomillo a la brasa (con su corte en blanco y negro invertido) como
  nueva apertura y también como cierre en bucle, replicando la estructura de apertura/cierre de la
  plantilla original.
- Ya con el guion aprobado, se generó una escena adicional de sustitución (pulpo a la brasa con
  gambas) a partir de una foto real nueva aportada por el cliente
  (`imagenes/comida/pulpo.png`), para sustituir la escena del postre.

### Guion final aprobado (6 escenas + cierre en bucle)

| # | Escena |
|---|--------|
| 1 (apertura) | Solomillo a la brasa + corte en blanco y negro invertido |
| 2 | Jamón cortado |
| 3 | Copa de vino sirviéndose (mano de mujer, sin cara) |
| 4 | Manos sirviendo el plato (mano de mujer + mano de hombre, sin cara, sin cuchillo) |
| 5 | Pulpo a la brasa con gambas (sustituye al postre) |
| 6 | Sala — mesa junto a la ventana, con mantel real |
| 7 (cierre en loop) | Vuelve a la escena 1 |

## Animación a vídeo de las escenas aprobadas

Con las imágenes fijas ya aprobadas, se animó cada una a vídeo siguiendo la regla 2 de
`reglas_videos.md`:

- **Modelo:** `kling3_0`, `mode: "pro"`, `duration: 3` (mínimo real del modelo), `sound: "off"`,
  `aspect_ratio: "9:16"`.
- **Entrada:** en vez de volver a subir cada imagen, se pasó directamente el `job_id` de la
  generación de imagen ya aprobada como `medias: [{role: "start_image", value: <job_id>}]` — Kling
  acepta un `job_id` de una generación anterior igual que un `media_id` subido a mano.
- **Generación en lote:** `generate_video_batch` para las 6 escenas del guion en una sola llamada
  (índices 1-6), cada una con un prompt de movimiento sutil y específico de la escena (humo
  ascendiendo, vino sirviéndose, traspaso natural del plato, cortina moviéndose, etc.), siempre con
  cámara estática y sin inventar elementos nuevos.
- **Espera y descarga:** `jobs_wait` hasta que las 6 quedaron `completed`, descarga de los
  `result_url` con `curl` a `imagenes/generadas/reel_carne_torre_de_vega/clips/`.
- **Presets automáticos:** al generar animaciones sueltas adicionales (terraza de noche, arcos de la
  barra), la herramienta detectó que el prompt coincidía con un preset de Higgsfield ("IN THE DARK")
  y pidió confirmación; se declinó el preset (`declined_preset_id`) para mantener el prompt literal
  específico de marca en vez del genérico.
- **Escena de sustitución (pulpo):** una vez aprobada la imagen fija del pulpo, se animó con un
  prompt de movimiento lateral de cámara sobre el plato (pedido explícito del cliente), sin zoom ni
  movimiento vertical.

### Vídeos sueltos animados fuera del guion del Reel

A petición del cliente, se animaron también dos fotos reales ya aprobadas en un proyecto anterior
(no forman parte del guion de este Reel, son piezas sueltas):

- Terraza de noche con guirnalda de luces (foto real ya generada el 2026-08-30).
- Arcos de ladrillo con la barra y el barril "De Vega" (foto real ya generada el 2026-08-30).

Ambas animadas con `kling3_0`, `mode: "pro"`, `duration: 3`, `aspect_ratio: "9:16"`, movimiento sutil
(oscilación de luces/plantas, comensales de fondo genéricos con micro-movimientos naturales, sin
mirar a cámara), pasando directamente el `job_id` de la imagen original como `start_image`.

## Nota sobre el montaje final

El montaje/edición del Reel (cortes, ritmo, corrección de color entre escenas) lo ha hecho el cliente
directamente en CapCut — no se documenta aquí ningún intento de montaje realizado por Claude.

---

# Parte II — Hallazgos medidos (2026-09-08)

Todo lo que sigue está **medido**, no supuesto. Las cifras salen de análisis reales del Virality
Predictor y de preflights de coste con `get_cost`. Corrige varias decisiones de la Parte I.

## 0. Resumen — qué cambió respecto al Reel 01

| | Antes (Reel 01) | Ahora | Impacto |
|---|---|---|---|
| **Movimiento de cámara** | Se le pedía al modelo (paneos) → morphing. O "static camera" → congelado | Micro-movimiento al modelo; el macro en After Effects | **El mayor**: arregla el aspecto IA y cuesta 0 créditos |
| **Acabado** | Cinematográfico, film-grain, luz cálida, DOF corta | ~~Acabado de iPhone~~ (2026-09-08) → **editorial dramático** desde el 2026-09-10: una sola fuente dura y cálida, sombras casi negras, contraste alto, grano visible | Invertido a petición del cliente; ver historial en la regla 17 de `reglas_imagenes.md` |
| **Rostros** | Prohibidos en todo fotograma | Preferencia, no regla | Formato de persona hablando: **45/45**, el mejor medido |
| **Modelo** | Kling 3.0 `pro` para todo (5,25) | Tres modelos por caso de uso (4,50 / 5,00 / 10,00) | Coste ajustado al plano |
| **Elección de planos** | Intuición ("el plato estrella") | Leer `values_by_frame` del análisis | El pulpo batía al solomillo 0,50 vs 0,39 |
| **Resolución de imagen** | 1k (regla 2bis) | 2k — cuesta lo mismo | Margen para paneos en AE |
| **Montaje** | ffmpeg (rechazado) o CapCut | After Effects por MCP, tipografía aprobada | Control y coste cero del movimiento |
| **Coste** | Sin preflight | `get_cost` antes de cada tanda, gratis | Sin sorpresas |

> ⚠️ **Estado real:** todo esto está medido sobre **vídeos de terceros**, no sobre producción propia.
> Nuestro mejor Reel sigue en 40/38, por debajo de las plantillas. Son hipótesis bien fundadas
> pendientes de validar produciendo el Reel 02 y midiéndolo.

## 1. After Effects conectado por MCP

Claude Code controla After Effects mediante el servidor MCP `aftereffects`
(`@kumoproductions/mcp-aftereffects`, ámbito user, file IPC sin panel CEP). Requiere AE abierto con
un proyecto cargado y el permiso *Allow Scripts to Write Files and Access Network* activado en
Preferences → Scripting & Expressions.

Esto habilita montaje, grade, transiciones, texto y render H.264 desde la conversación. **El detalle
operativo completo (trampas de parámetros, fórmula de recorte de clips, catálogo de transiciones,
flujo de render) está en la skill `after-effects-reels`** — no se duplica aquí.

## 2. El montaje NO mueve las métricas de viralidad

Cinco análisis sobre el mismo material (los 6 clips del Reel 01):

| Versión | Hook | Overall | Viral | Act. visual t=0 |
|---|---|---|---|---|
| CONTROL — corte plano, sin nada | 24 | 40 | 38 | 0,377 |
| v2 — cortes 1 s + grade + whips + shock cut | 25 | 40 | 38 | 0,392 |
| v3 — reordenado por dato + ráfaga de microcortes | 24 | 39 | 37 | 0,429 |
| v4 — v3 + hook de texto en pantalla | 25 | 40 | 38 | 0,437 |

**Un corte plano sin editar puntúa igual que un montaje completo.** Overall 40 y viral 38 en ambos
extremos.

Lo que **sí** mejora medibemente con el montaje: corteza visual en t=0 **+16 %**, activación global
media **+4,4 %**, Default Mode (divagación mental) a la baja, y red del lenguaje **+3,6 %** al añadir
texto. La edición funciona sobre las señales reales; el titular está saturado por el tipo de
contenido.

**Consecuencia práctica:** no gastar más de 2 iteraciones del Virality Predictor en el montaje de un
Reel de comida. Se agota. Las palancas reales están en el material, no en la edición.

### Corrección 2026-09-08 — no es "el audio", es **que alguien hable**

Hubo dos correcciones encadenadas sobre esto. La versión final es la de abajo.

1. Primero se atribuyó la red auditiva baja (0,238) a que nuestros MP4 no llevan pista, y se concluyó
   que **añadir música** era la mayor palanca pendiente.
2. Se desmintió: la plantilla de la mesa **sí lleva música** y su red auditiva da **0,238**, idéntica
   a la de nuestros Reels mudos. Conclusión intermedia: el audio no mueve nada.
3. **Conclusión final, medida:** un Reel con una **persona hablando** a cámara da **0,381** de red
   auditiva. La música no mueve esa red; **el habla la dispara un 60 %**.

| Red | Plantilla mesa (con música) | Reel con persona hablando | Δ |
|---|---|---|---|
| Auditiva | 0,238 | **0,381** | **+60 %** |
| Lenguaje | 0,261 | **0,353** | **+35 %** |
| Atención frontoparietal | 0,329 | **0,382** | +16 % |
| Corteza visual | 0,525 | 0,450 | −14 % |

**No es "poner audio", es que haya voz humana.** Y el efecto es tan grande que compensa tener *menos*
información visual: el Reel con persona gana el titular (45/45) pese a que la mesa llena tiene más
elementos por fotograma.

## 3. Lo que sí sube la activación: complejidad visual por fotograma

Dentro del Reel 01, el plano de mayor activación de corteza visual fue el **pulpo con gambas** (0,50
en t=5) — colores, elementos y contraste — y no el solomillo a la brasa (0,39), que era el candidato
"obvio" pero es marrón sobre marrón.

Confirmado a lo grande con la plantilla del Reel 02 (mesa que se llena): **corteza visual 0,525 de
media frente a 0,443** del mejor montaje nuestro, y **sustain 100**. Una mesa con seis platos tiene
mucha más información por fotograma que un plato solo.

**Consecuencia:** al elegir qué plano abre, leer `values_by_frame` de `visual_occipital` en el
análisis en vez de decidir por intuición. Y preferir encuadres con varios elementos y variedad
cromática sobre el plato único, por bonito que sea.

### Ranking completo de formatos medidos (2026-09-08)

| Formato | Fuente | Overall | Viral | Sustain | Brain |
|---|---|---|---|---|---|
| **Persona a cámara hablando, plano único sin cortes** | Pinterest | **45** | **45** | 100 | **36** |
| Mesa que se llena (acumulación) | Instagram | 44 | 41 | 100 | 34 |
| Montaje rápido ~1 s por plano | `carne.mp4` | 41 | 40 | 95 | 31 |
| B-roll cinematográfico horizontal | YouTube | 40 | 39 | 95 | 29 |
| Nuestro Reel 01 v4 | Propio | 40 | 38 | 96 | 30 |
| Compilación de stock | Pexels | 39 | 38 | 97 | 29 |

**El formato de persona hablando gana, y gana por una vía distinta:** no por complejidad visual —de
hecho tiene menos que la mesa llena— sino por activar las redes auditiva, del lenguaje y de atención.
Ver la corrección de la sección 2.

Ventaja práctica añadida: es **un solo plano**, sin montaje. Un Seedance 2.5 a 1080p de 5 s (45
créditos) es el Reel entero, frente a los 51 del Reel 02 con sus siete planos y su montaje.

## 4. El movimiento de cámara va en AE, NUNCA en el prompt del modelo

**Este es el hallazgo que más corrige la Parte I.** Comparando los seis clips del Reel 01:

| Clip | Qué se pidió | Resultado |
|---|---|---|
| Pulpo | Paneo lateral sobre el plato | **El peor morphing**: tentáculos y gambas se regeneran durante el recorrido |
| Manos sirviendo | Traspaso de plato entre dos manos | Comida que cambia de forma y número entre fotogramas |
| Copa de vino | Servido con movimiento | Recipiente de forma imposible, mano que se aplana |
| Sala/ventana | Movimiento suave sobre la sala | **El mejor de los seis** — la arquitectura es rígida |

El modelo regenera el contenido mientras la cámara se desplaza. La arquitectura aguanta porque es
rígida; la comida orgánica no.

**Cómo se hace a partir de ahora — hay dos errores opuestos, no solo uno:**

| | Resultado |
|---|---|
| ❌ Pedir movimiento **macro** de cámara (paneo, dolly, órbita) | El modelo regenera el contenido: morphing |
| ❌ Pedir `"static camera"` / `"locked-off"` a secas | Todo congelado menos un elemento: **se lee como foto animada** (regla 5, incidente 2026-09-07) |
| ✅ **Micro-movimiento** de cámara + movimiento físico de la escena | Lo correcto |

Un recorrido pequeño y mecánico no recorre la escena, solo le da vida. El macro sí la recorre, y ahí
es donde el modelo reinventa la comida. **La regla 5 y este hallazgo no se contradicen: hablan de
escalas de movimiento distintas.**

> ⚠️ **Corregido el 2026-09-14.** Este punto decía «pedir handheld drift». El cliente lo rechazó el
> mismo 2026-09-08 (*"la cámara tiembla mucho y no es nada profesional"*) y la regla 11 de
> `reglas_videos.md` lo prohíbe. La fórmula vigente es la del slider motorizado.

1. Pedir un **recorrido mecánico, lento, constante y cuantificado** (*motorised slider with a geared
   head*, 3-15 % de recorrido, `no handheld operation, no shake` en el negative — regla 11) **más**
   el movimiento físico de la escena (humo, líquido, tela).
2. Declarar que el **sujeto** no cambia — distinto de que no se mueva la cámara: *"the food remains
   the same food throughout — never shifts, morphs or changes shape"*.
3. Negativos: prohibir solo el macro → `no camera pan, no dolly, no orbit, no zoom, no rotation`.
   **Nunca** `no camera movement` a secas.
4. **El push/pull y los paneos se hacen en After Effects** con keyframes de escala y posición. Cero
   créditos.

**Regla de decisión AE vs. pagar generación:** la pregunta no es si el plano se mueve, es si el
movimiento **revela información que no está en el fotograma de partida**.

| Movimiento | Dónde |
|---|---|
| Push-in, pull-back, deriva lateral, rotación leve, paneo sobre escena estática | **AE, gratis** |
| Paralaje, órbita, pasar por delante de algo que tapa, descubrir lo que no estaba en cuadro | Generación de vídeo |

## 5. Elección de modelo por caso de uso

> ⚠️ **Criterio corregido el 2026-09-08.** Estaba planteado como "el más barato que resuelve el
> plano". **Está mal.** El orden correcto es:
> 1. **1080p es el mínimo innegociable.** Nunca 720p ni resolución sin verificar.
> 2. Entre las que cumplen, **elegir por calidad**.
> 3. **El coste solo desempata** entre opciones equivalentes.
>
> Literal del cliente: *"la calidad mínima es 1080 no 720, y además no quiero que por gastarme menos
> créditos me vayan a hacer vídeos malos"*.

| Caso | Cuándo | Modelo y parámetros | Créditos |
|---|---|---|---|
| **1 · Cámara fija, movimiento local** (80 % de los planos) | Humo, aceite, vino, cortina. Un elemento en movimiento, el resto quieto. | `kling3_0`, `mode: "pro"`, `duration: 3`, `sound: "off"` | 5,25 |
| **2 · Movimiento fluido de cámara** | Solo cuando AE no puede: paralaje, órbitas, oclusiones. | `kling2_6`, `duration: 5`, `sound: false` | 5,00 |
| **3 · Manos y acción física** ⚠️ **CORREGIDO 2026-09-09** | Interacción entre anatomía y objeto. Dos manos ya es caso 3. | ~~`minimax_hailuo`~~ **PROHIBIDO** (regla 15 de `reglas_videos.md`: mueve la cámara aunque se le prohíba y rehace la comida). Usar **`seedance_2_0`**, `mode:"std"`, `resolution:"1080p"`, `duration:4`, `generate_audio:false`, con `start_image` **y** `end_image` | 36,00 |
| **4 · Plano único largo sin cortes** | Persona a cámara, 8-15 s. El Reel entero en una toma. | `veo3_1`, `variant: "veo-3-1-preview"`, `quality: "high"`, `duration: 8` | 58,00 |

**Caso 1 va en `pro`, no en `std`.** Es la única configuración de Kling 3.0 con resolución
**verificada sobre salida real** (1076×1924). El ahorro de 0,75 con `std` no compensa desconocer la
resolución. Si un plano concreto lo merece (apertura o cierre), `mode: "4k"` cuesta **18** y da muy
por encima de 1080.

**Descartados por no llegar al mínimo**, aunque salgan baratos: Kling 3.0 `std` (4,50 · sin
verificar), Kling Turbo 720p (4,50), Veo 3.1 Lite (4,00 · sin control de resolución — solo para
pruebas), Seedance 2.0 Mini (10 · 720p), Seedance 2.5 a 720p (52).

### Caso 4 en detalle — por qué Veo 3.1 `preview` y no Seedance 2.5

Es el formato que **mejor ha medido** (45/45) y no son 7 clips más montaje: es **un clip**. Como es
la pieza entera, aquí no se escatima: va la variante de mejor calidad.

| Modelo (8 s, 9:16, con audio) | Créditos | Calidad | ¿Vídeo de ref.? |
|---|---|---|---|
| Veo 3.1 Lite | 12 | Sin control de resolución | No |
| Veo 3.1 `fast` + `high` | 22 | Variante rápida | No |
| Wan 3.0 (10 s, 1080p) | 35 | 1080p | Sí |
| Veo 3.1 `fast` + `ultra` | 48 | Rápida, calidad ultra | No |
| **Veo 3.1 `preview` + `high`** | **58** | **La mejor variante** | No |
| Seedance 2.5 `omni_reference` 1080p | 72 | 1080p | Sí |
| Veo 3.1 `preview` + `ultra` | 87,2 | Máximo absoluto | No |
| Seedance 2.5, 10 s 1080p | 90 | 1080p | Sí |

`quality: "basic"` cuesta lo mismo que `"high"` (22 en fast) — **nunca usar `basic`**, es tirar
calidad gratis. Veo 3.1 genera **audio nativo**, que en este formato es justo lo que dispara la
puntuación.

**Pendiente de verificar:** no está comprobada la diferencia visual real entre `fast` y `preview`, ni
entre `high` y `ultra`. Merece la pena gastar una vez ~80 créditos en generar el mismo prompt con
`fast+high` y `preview+high` y compararlos — deja el criterio cerrado para siempre.

**El razonamiento clave:** la regla 18 prohíbe replicar a la persona del vídeo plantilla y la regla 1
prohíbe replicar el local. Si no se puede copiar ni a la persona ni el sitio, lo único que aporta un
vídeo de referencia es el ritmo del encuadre — **y eso se describe en texto**. Pagar 72 en vez de 22
por referenciar un vídeo cuyos dos contenidos principales están vetados no sale a cuenta.

Seedance 2.5 se justifica solo cuando haya que transferir un movimiento concreto difícil de
describir. En ese caso, probar antes **Wan 3.0 (35 créditos)**, que también acepta `video_references`
y cuesta la mitad.

### Costes medidos con `get_cost` (9:16, sin audio)

| Modelo | Config | Créditos | Cr/s | 1080p real |
|---|---|---|---|---|
| Veo 3.1 Lite | 4 s | 4,00 | 1,00 | sin control |
| **Kling 3.0 `std`** | 3 s | **4,50** | 1,50 | a verificar |
| Kling 3.0 Turbo | 3 s, 720p | 4,50 | 1,50 | no |
| **Kling 2.6** | 5 s | **5,00** | **1,00** | sí |
| Kling 3.0 `pro` | 3 s | 5,25 | 1,75 | sí (1076×1924) |
| Kling 3.0 Turbo | 3 s, 1080p | 6,00 | 2,00 | sí |
| **Minimax Hailuo 2.3** | 6 s, 1080 | **10,00** | 1,67 | sí |
| Seedance 1.5 | 4 s, 1080p | 12,00 | 3,00 | sí |
| Happy Horse | 3 s, 1080p | 13,50 | 4,50 | sí |
| Wan 2.6 | 5 s, 1080p | 20,00 | 4,00 | sí |
| Grok 1.5 | 4 s, 1080p | 32,00 | 8,00 | sí |
| Seedance 2.0 | 4 s, 1080p | 36,00 | 9,00 | sí |
| Cinema Studio 3.0 | 4 s, 1080p | 40,00 | 10,00 | sí |
| `nano_banana_pro` (imagen) | 1k **y** 2k | 2,00 | — | — |

**Dos contraintuiciones que cuestan dinero:**
- El Kling 3.0 **Turbo cuesta más** que el `pro` en cuanto se pide 1080p (6,00 vs 5,25).
- **Kling 2.6 es más barato que Kling 3.0** por clip (5,00 por 5 s frente a 5,25 por 3 s). La versión
  nueva no es la barata.

**La imagen cuesta lo mismo a 1k que a 2k** → generar siempre a 2k, sobre todo si va a haber paneos
en AE, que necesitan margen. Esto **corrige la regla 2bis** de `reglas_videos.md`, que fijaba 1k.

### Lo que no cuesta créditos

`virality_predictor`, `video_analysis_create` y `get_cost` **son gratis** en el plan Plus (verificado:
el saldo no se movió tras seis análisis). Medir y preflightear no tiene coste — hacerlo siempre antes
de generar.

## 6. Análisis de plantillas sin gastar créditos

Antes de subir nada a Higgsfield, el desglose de cortes se saca con `ffmpeg` en local:

```bash
ffmpeg -hide_banner -i PLANTILLA.mp4 -filter:v "select='gt(scene,0.2)',showinfo" -f null - 2>&1 \
  | grep -oE "pts_time:[0-9.]+"
```

Da los tiempos exactos de corte, incluidos los destellos de 2-3 fotogramas que el análisis de
Higgsfield no separa. Complementa al `video_analysis_create`, no lo sustituye: Higgsfield sí describe
el contenido y el movimiento de cámara de cada plano.

**Límite duro del Virality Predictor: 16 segundos.** Vídeos más largos son rechazados.

## 7. Tipografía — estándar aprobado por el cliente

Validado el 2026-09-08 tras rechazar la alternativa pesada ("esos textos siguen siendo horribles").

| Elemento | Fuente | Tamaño | Tracking |
|---|---|---|---|
| Titular | `BodoniMT` **Regular** | 70 px | 400 |
| Marca / subtítulo | `BodoniMT` Regular | 40 px | 640 |
| Placa de cierre | `BodoniMT` Regular | 62 px | 540 |

Blanco puro, **sin contorno** (`applyStroke: false`). La legibilidad la da `ADBE Drop Shadow` con
`Distance 0 / Softness 70 / Opacity 200` (escala 0-255), más un filete horizontal de 2 px al 70 % de
opacidad entre titular y marca. Animación: fade 0,45 s + subida de 14 px, filete dibujándose desde el
centro, entradas escalonadas ~0,12 s.

**Lo rechazado:** `BodoniMTBlack` a 128 px con contorno negro de 13 px. El texto enorme y grueso con
borde duro lee como vídeo casero. **Lo premium se consigue restando**: peso fino, tamaño pequeño,
tracking enorme, sombra suave en vez de borde.

**Contraste texto/fondo (indicado por el cliente):** el color del texto depende del plano que va
debajo. Texto blanco solo sobre plano oscuro o de tono medio; texto oscuro solo sobre plano claro.
Comprobar renderizando frames del **tramo entero** en que el texto está visible, no solo el primero.
Si no contrasta: mover el texto de zona, recolocarlo en el tiempo, o degradado sutil — **nunca subir
el contorno**.

## 8. Auditoría de aspecto IA — cómo detectarlo

Los artefactos se ven **comparando fotogramas del mismo clip**, no en un frame suelto. Contact sheet
de 3 fotogramas por clip:

```bash
ffmpeg -i CLIP.mp4 -vf "select='eq(n\,8)+eq(n\,36)+eq(n\,68)',scale=430:-1,tile=3x1" -frames:v 1 sheet.jpg
```

Donde la comida "se rehace" entre fotogramas, es IA. Resultado sobre el Reel 01:

| Escena | Veredicto | Qué falla |
|---|---|---|
| Copa de vino | 🔴 Sustituir | Decantador de forma imposible, disco acanalado falso en la superficie del vino |
| Manos sirviendo | 🔴 Sustituir | Pimientos y láminas de carne se reorganizan entre fotogramas |
| Pulpo | 🔴 Sustituir | Morphing más fuerte: tentáculos y gambas se regeneran durante el paneo |
| Solomillo | 🟡 Aceptable en corte corto | Las patatas se reorganizan; a 1,5 s no canta |
| Jamón | 🟡 Aceptable | Las lonchas se reordenan, el patrón radial lo disimula |
| Sala | 🟢 Conservar | El más creíble; la arquitectura es estable |

## 9. Ficheros de guion

Los guiones de cada Reel se escriben como `.md` en `instagram/`, redactados para que una IA los
ejecute sin reconstruir el razonamiento: parámetros exactos, prompts finales en inglés, rutas reales
de referencia y bloqueos pendientes.

- `instagram/fuentes_plantillas_reels.md` — **de dónde sacar los vídeos base**, con la comparativa
  medida de fuentes y el pipeline de cribado en dos fases.
- `instagram/proceso-reel-vinos-blancos.md` — Reel de vinos blancos.
- `instagram/reel_02_mesa_que_se_llena.md` — Reel 02, formato de acumulación. **Bloqueado** pendiente
  de confirmar el concepto de mesa llena, la selección de platos y la recarga de créditos.
