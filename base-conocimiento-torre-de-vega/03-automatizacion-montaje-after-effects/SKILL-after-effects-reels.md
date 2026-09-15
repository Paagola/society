---
name: after-effects-reels
description: "Montaje de Reels verticales en After Effects controlado desde Claude Code vía el MCP mcp-aftereffects. Cubre el flujo completo operativo (importar clips, timeline, recortes, grade, transiciones, texto, render H.264), el catálogo de transiciones y movimientos que retienen, y lo aprendido midiendo viralidad con el Virality Predictor de Higgsfield. Actívala al montar, editar o retocar cualquier vídeo/Reel en After Effects, al animar clips generados por IA, o al analizar potencial viral de un vídeo."
license: MIT
metadata:
  author: victor-agencia
  version: "1.0.0"
---

# Montaje de Reels en After Effects desde Claude Code

Conocimiento acumulado montando Reels verticales de hostelería con After Effects controlado por MCP,
midiendo cada versión con el Virality Predictor de Higgsfield. El eje de todo lo aprendido:

> **El montaje mejora las señales reales de atención, pero no mueve las métricas titulares de
> viralidad. El techo lo pone el material de origen.** Medido, no intuido — ver la sección
> "Techo de viralidad" antes de prometer nada a un cliente.

---

## 1. Conexión y arranque

El servidor MCP es `@kumoproductions/mcp-aftereffects`, registrado en ámbito user:

```
claude mcp add aftereffects --scope user -- npx -y @kumoproductions/mcp-aftereffects
```

**Requisitos antes de cualquier llamada:**
- After Effects abierto **con un proyecto cargado** (no basta la pantalla de bienvenida).
- Permiso activado: `Edit → Preferences → Scripting & Expressions → Allow Scripts to Write Files
  and Access Network`.
- No hace falta panel CEP: usa file IPC. No hay nada que activar dentro de AE.
- Tras registrar el servidor hay que **reiniciar la sesión de Claude Code**; no se carga en caliente.

**Herramientas:** `ae_project_info`, `ae_context`, `ae_version_info`, `ae_catalog` (descubre las ~197
operaciones), `ae_do` (ejecuta una operación), `ae_render_frame`, `ae_save_project`.
`ae_save_project` es herramienta propia, **no** una operación de `ae_do`.

Arranca siempre con `ae_project_info` para confirmar que AE responde de verdad.

### Segundo agente: Higgsfield AI Motion Designer (en prueba desde 2026-09-14)

Higgsfield ofrece un agente de motion graphics que trabaja **dentro de la composición abierta**
(títulos, logo reveals, transiciones, expresiones, recrear una animación desde un vídeo de
referencia). Necesita tres cosas: el plugin de Higgsfield instalado en AE (`.zxp` con ZXP Installer
de aescripts, como administrador; panel en `Window → Extensions → Higgsfield`, con sesión iniciada),
el conector `higgsfield-bridge` → `https://bridge.higgsfield.ai/mcp` (OAuth; **no** es el mismo que
`mcp.higgsfield.ai`, que solo genera) y reiniciar Claude Code.

- **No sustituye a este MCP todavía.** Reparto de la prueba: el ensamblado del timeline (recortes con
  la fórmula de §3) va por `mcp-aftereffects`, que es determinista; los gráficos, por el agente.
- **Nunca los dos agentes a la vez sobre el mismo proyecto.** `ae_save_project` antes de pasar de uno
  a otro.
- Pasarle **siempre la especificación tipográfica cerrada** de §8: sus ejemplos por defecto son justo
  la estética gruesa que el cliente rechazó.
- Coste sin publicar y sin `get_cost`: `balance` antes y después.
- Evaluación completa en `informes/2026-09-14_procesos-reels_y_ai-motion-designer.md`.

---

## 2. Trampas de la API que cuestan llamadas

Estas ya me las he comido. No repetirlas:

| Operación | Parámetro correcto | El que parece lógico y falla |
|---|---|---|
| `batch.run` | `ops` | `operations` |
| `project.import_file` | `path` | `file` |
| `comp.create` | `fps` | `frameRate` |
| `render.frame` (dentro de `ae_do`) | `comp` | `compNameOrId` |
| `ae_render_frame` (herramienta suelta) | `compNameOrId` | — |

Sí: `render.frame` como operación usa `comp`, pero la herramienta `ae_render_frame` usa
`compNameOrId`. Son dos superficies distintas.

**Otras cosas que hay que saber:**

- **`batch.run` ejecuta en orden secuencial.** Se puede encadenar `set_style → render.frame →
  set_style → render.frame` en una sola llamada para generar comparativas. Pero no hay
  interpolación de variables: no puedes usar el resultado de una op como argumento de la siguiente.
- **Las capas nuevas siempre entran en el índice 1** (arriba del stack) empujando las demás. Si
  creas 8 capas seguidas, la última creada es la 1 y la primera es la 8. **Referéncialas siempre por
  nombre**, nunca por índice, y el orden deja de importar.
- **El orden de apilado da igual si las capas no se solapan en el tiempo.** Para un montaje
  secuencial no hace falta reordenar nada.
- Cada `ae_do` es **un grupo de deshacer**. Un `batch.run` entero = un solo Ctrl+Z.
- Nunca llamar a `app.beginUndoGroup`/`endUndoGroup`; el wrapper ya lo hace.

**Rutas de propiedades de efectos: son planas, no anidadas.** Aunque el panel de AE muestre
`Exposure > Master > Exposure`, la ruta correcta es `["Exposure"]`, no `["Master","Exposure"]`.
Descúbrelas siempre con `effect.list_on_layer` sobre una capa de referencia antes de escribir.

---

## 3. Recortar clips en el timeline: la fórmula

Es la operación central de todo montaje y es fácil equivocarse. Para mostrar el tramo
`[src_in, src_out]` de un clip en el tramo `[comp_in, comp_out]` de la composición:

```
startTime = comp_in - src_in
inPoint   = comp_in
outPoint  = comp_out
```

Se aplican los tres juntos con `layer.set_props`:

```json
{"operation": "layer.set_props", "args": {
  "comp": "MiComp", "layer": "S3_jamon",
  "props": {"startTime": 1.10, "inPoint": 1.65, "outPoint": 2.65}
}}
```

**Validación obligatoria antes de enviar:** `startTime + duración_del_clip > outPoint`. Si no, AE
recorta en silencio y el plano se queda congelado en el último fotograma sin avisar.

`startTime` desplaza la capa entera; `inPoint`/`outPoint` recortan. En ese orden.

---

## 4. Resolución y escalado

Los clips generados por IA rara vez salen a medida exacta. Kling devuelve **1076×1924**, no
1080×1920.

- Crea la comp a **1080×1920, 24 fps** (estándar Reel) y escala las capas a **100.4%** para cubrir
  el frame sin franjas negras.
- Ese 100.4% es el **suelo**: cualquier animación de escala debe quedarse siempre por encima, o
  aparecen bordes negros en los extremos del movimiento.

---

## 5. Movimiento de cámara: push/pull alternado

Ningún plano se queda quieto. Dos keyframes de `Transform > Scale` por capa, **alternando la
dirección** en cada corte para que no se vuelva monótono:

```
Plano 1: 116 → 103   (pull-back)
Plano 2: 103 → 113   (push-in)
Plano 3: 115 → 102   (pull-back)
...
```

**Regla contraintuitiva y medida:** en el **hook** hay que abrir **ancho** (101–105%), no cerrado.
Un push-in cerrado al 119% en el primer plano reduce la información en pantalla y **baja** la
activación visual. Medido: pasar de un hook cerrado (119%) a uno ancho subió la activación de la
corteza visual en t=0 un **+10%**.

Cerrado = dramático pero pobre en información. En los primeros 3 segundos manda la información.

---

## 5bis. El movimiento de cámara va en AE, NUNCA en el prompt del modelo

**Regla de oro al animar clips con IA.** Medido en el Reel de carne (2026-09-08) comparando los seis
clips generados con Kling 3.0:

| Clip | Qué se pidió al modelo | Resultado |
|---|---|---|
| Pulpo | Paneo lateral sobre el plato | **El peor morphing**: tentáculos y gambas se regeneran durante el recorrido |
| Manos sirviendo | Traspaso de plato entre dos manos | La comida cambia de forma y número entre fotogramas |
| Copa de vino | Servido con movimiento | Recipiente de forma imposible, mano que se aplana |
| Sala/ventana | Movimiento suave sobre la sala | **El mejor de los seis** — la arquitectura es rígida |

**El patrón:** el modelo regenera el contenido mientras la cámara se desplaza. La arquitectura
aguanta porque es rígida y repetitiva; la comida orgánica no — cada fotograma es una reinterpretación
distinta del plato.

**Cómo aplicarlo — ojo, hay dos errores opuestos y hay que esquivar los dos:**

| | Resultado |
|---|---|
| ❌ Pedir movimiento **macro** de cámara (paneo, dolly, órbita) | El modelo regenera el contenido: morphing |
| ❌ Pedir `"static camera"` / `"locked-off"` a secas | Todo congelado menos un elemento: **se lee como foto animada** |
| ❌ Pedir **handheld** / «micro-movimiento de móvil en mano» | Sale temblor sin intención: **rechazado** por el cliente el 2026-09-08 (regla 11 de `reglas_videos.md`) |
| ✅ Un movimiento **mecánico, lento, constante y cuantificado** (slider motorizado) + movimiento físico de la escena | Lo correcto |

> ⚠️ **Corregido el 2026-09-14.** Esta sección decía «pide handheld drift». Está mal: la regla 11 de
> `reglas_videos.md` lo prohíbe tras un rechazo del cliente. Lo que da vida sin recorrer la escena es
> un recorrido pequeño y mecánico, no el temblor de un móvil.

1. Pide un **recorrido pequeño y mecánico** (fórmula de la regla 11: *motorised slider with a geared
   head*, recorrido del 3-15 %, velocidad constante del primer al último fotograma, `no handheld
   operation, no shake` en el negative) **más** el movimiento físico propio de la escena: humo,
   líquido, tela.
2. Declara explícitamente que el **sujeto** no cambia, que es distinto de que no se mueva la cámara:
   *"the food remains the same food throughout — never shifts, morphs or changes shape"*.
3. En negativos, prohibir solo el **macro**: `no camera pan, no dolly, no orbit, no zoom,
   no rotation`. **No** pongas `no camera movement` a secas — eso congela el plano.
4. **El push/pull y los paneos se hacen en After Effects** con keyframes de escala y posición
   (sección 5). Se ve igual de bien y cuesta **cero créditos**.

> Esto reconcilia la regla 5 de `imagenes/reglas_videos.md` (incidente 2026-09-07: "se nota muchísimo
> que es IA" con cámara estática) con el hallazgo del morphing. No son contradictorias: hablan de
> escalas de movimiento distintas.

**Beneficio:** además de eliminar la causa principal del morphing, el recorrido que va en AE cuesta
cero créditos. *(Corregido el 2026-09-14: aquí se sugería bajar a `mode: std` para ahorrar un 14 %.
No: `std` tiene resolución sin verificar y el criterio es calidad primero — ver §5ter.)*

## 5ter. Elegir modelo por caso de uso — la calidad es el suelo

> ⚠️ **Criterio corregido el 2026-09-08 por indicación del cliente.** Este apartado estaba planteado
> como "el modelo más barato que resuelve el plano". **Está mal.** El orden correcto es:
>
> 1. **1080p es el mínimo innegociable.** Nunca 720p, nunca "resolución sin verificar".
> 2. **Entre las opciones que cumplen, elegir por calidad.**
> 3. **El coste solo desempata** entre opciones equivalentes en calidad.
>
> Literal del cliente: *"la calidad mínima es 1080 no 720, y además no quiero que por gastarme menos
> créditos me vayan a hacer vídeos malos"*.

**Descartados por no cumplir el mínimo** (aunque aparezcan baratos en la tabla de costes):

| Opción | Créditos | Por qué se descarta |
|---|---|---|
| Kling 3.0 `std` | 4,50 | **Resolución sin verificar.** Se recomendó por precio sin comprobarla — error. |
| Kling 3.0 Turbo 720p | 4,50 | 720p |
| Veo 3.1 Lite | 4,00 | Sin control de resolución. Válido solo para **pruebas**, nunca para entrega. |
| Seedance 2.0 Mini | 10,00 | Máximo 720p |
| Seedance 2.5 `omni_reference` 720p | 52,00 | 720p |

**El principio que sigue vigente: el clip más barato es el que no hay que repetir.** La escena de las
manos del Reel 01 se generó y corrigió varias veces a 5,25 cada vez — pagar 10 una sola vez habría
salido más barato y mejor.

### Caso 1 · Cámara fija con movimiento local — el 80 % de los planos

Humo que sube, aceite que cae, vino que se sirve, cortina que se mueve. Un solo elemento en
movimiento, todo lo demás quieto. **Es el caso por defecto** (ver 5bis: la cámara se mueve en AE).

```
model: "kling3_0", mode: "pro", duration: 3, sound: "off", aspect_ratio: "9:16"
→ 5,25 créditos · resolución MEDIDA: 1076×1924
```

`pro`, no `std`. Es la única configuración de Kling 3.0 cuya resolución está **verificada** sobre
salida real. El ahorro de 0,75 con `std` no compensa no saber qué resolución sale.

**Si un plano concreto lo merece** (el de apertura, el de cierre): `mode: "4k"` cuesta **18 créditos**
y da resolución muy por encima de 1080. Reservarlo para el plano que sostiene el Reel, no para todos.

### Caso 2 · Movimiento fluido de cámara — solo cuando AE no puede

```
model: "kling2_6", duration: 5, sound: false, aspect_ratio: "9:16"
→ 5,00 créditos · el mejor ratio disponible: 1,00 cr/s
```

Kling 2.6 está construido para movimiento cinematográfico y física, y a 1 crédito por segundo da 5 s
para elegir el mejor tramo del recorrido. La evidencia propia lo respalda: el único clip con
movimiento de cámara que salió bien fue el de la sala, y salió bien porque era arquitectura rígida —
exactamente este caso.

**Cuándo basta AE (gratis) y cuándo hay que pagar este caso.** La regla es si el movimiento
**revela información nueva**:

| Movimiento | Dónde se hace |
|---|---|
| Push-in, pull-back, deriva lateral, rotación leve | **AE**, keyframes de escala/posición. Gratis. |
| Paralaje (fondo y primer plano a distinta velocidad) | Caso 2 |
| Órbita alrededor de un objeto | Caso 2 |
| Pasar por delante o por detrás de algo que tapa | Caso 2 |
| Descubrir algo que no estaba en el encuadre | Caso 2 |

Si el plano es esencialmente plano y solo cambia de tamaño o posición, AE lo hace igual de bien por
cero créditos. Solo se paga cuando hacen falta píxeles que no existen en el fotograma de partida.

> ⚠️ **Esto se aplica sobre CLIPS DE VÍDEO ya generados, nunca sobre una imagen fija.** Panear una
> foto en AE para ahorrarse la generación de vídeo produce un plano completamente muerto —sin humo,
> sin vapor, sin respiración de enfoque— y es un fallo peor que el de la cámara estática (regla 5).
> El cliente lo ha rechazado dos veces. La imagen fija es solo el **keyframe de partida**; el plano
> final siempre es vídeo.

### Caso 3 · Manos, personas y acción física — donde todo se rompe

Servir un plato, manos que se cruzan, verter sujetando algo, cualquier interacción entre anatomía y
objeto.

```
model: "seedance_2_0", mode: "std", resolution: "1080p", duration: 4,
aspect_ratio: "9:16", generate_audio: false
+ medias: start_image y end_image
→ 36 créditos · salida real 1080×1920 exactos, 24 fps
```

> ⛔ **Corregido el 2026-09-14.** Aquí figuraba `minimax_hailuo` como especialista en manos. **Está
> prohibido en este proyecto** (regla 15 de `reglas_videos.md`, 2026-09-09: movió la cámara pese a
> prohibírselo siete veces y rehízo la comida). El modelo validado por el cliente es `seedance_2_0`
> con `start_image` **y** `end_image` (reglas 16 y 17): anclado por los dos extremos no puede derivar.

Se paga **solo** en este caso, porque es justo donde los modelos baratos producen material
inservible — dedos fundidos, agarres imposibles, comida que se reorganiza.

Si el plano lleva manos pero la acción es simple (una mano que entra, deja algo y sale), el caso 1
puede bastar: declara la inmovilidad de todo lo demás y **usa una sola mano**. Dos manos
interactuando ya es caso 3.

### Caso 4 · Plano único largo sin cortes — el Reel entero en una toma

Formato de persona a cámara, 8-15 s sin un solo corte. **Es el formato que mejor ha medido**
(45/45), y su ventaja de coste es que **no son 7 clips más montaje: es un clip**.

```
model: "veo3_1", variant: "veo-3-1-preview", quality: "high", duration: 8, aspect_ratio: "9:16"
→ 58 créditos · el Reel completo
```

**`preview`, no `fast`.** La variante `preview` es la de mejor calidad según el propio catálogo
(`fast` solo genera más rápido). Este formato **es el Reel entero** — no es un plano de siete, es la
pieza completa. Aquí no se escatima.

Veo 3.1 genera **audio nativo**, que en este formato es justo lo que dispara la puntuación: el habla
sube la red auditiva un 60 % y la del lenguaje un 35 %.

**Comparativa medida (8 s, 9:16, con audio):**

| Modelo | Créditos | Calidad | ¿Vídeo de referencia? |
|---|---|---|---|
| Veo 3.1 Lite | 12 | Sin control de resolución | No |
| Veo 3.1 `fast` + `high` | 22 | Variante rápida | No |
| Wan 3.0 (10 s, 1080p) | 35 | 1080p | Sí |
| Veo 3.1 `fast` + `ultra` | 48 | Variante rápida, calidad ultra | No |
| **Veo 3.1 `preview` + `high`** | **58** | **La mejor variante** | No |
| Seedance 2.5 `omni_reference` 1080p | 72 | 1080p | Sí |
| Veo 3.1 `preview` + `ultra` | 87,2 | Máximo absoluto | No |
| Seedance 2.5, 10 s 1080p | 90 | 1080p | Sí |

`quality: "basic"` cuesta lo mismo que `"high"` (22 en fast) — **no usar nunca `basic`**, es tirar
calidad gratis.

**Pendiente de verificar:** no está comprobado cuánta diferencia visual real hay entre `fast` y
`preview`, ni entre `high` y `ultra`. Merece la pena gastar una vez ~80 créditos en generar el mismo
prompt con `fast+high` y `preview+high` y compararlos — queda resuelto para siempre.

**Por qué Veo 3.1 y no Seedance 2.5, pese a que Seedance acepta vídeo de referencia:**

La regla 18 de `reglas_imagenes.md` prohíbe replicar a la persona del vídeo plantilla, y la regla 1
prohíbe replicar el local. Si no puedes copiar ni a la persona ni el sitio, **lo único que aporta el
vídeo de referencia es el ritmo y la energía del encuadre — y eso se describe en texto**. Pagar 72 en
vez de 22 por referenciar un vídeo cuyos dos contenidos principales tienes prohibido usar no sale a
cuenta.

**Cuándo sí justificar Seedance 2.5 `omni_reference`:** cuando el movimiento concreto sea difícil de
describir y haya que transferirlo tal cual (una coreografía de cámara específica, un gesto complejo).
Si es el caso, **Wan 3.0 a 35 créditos** acepta también `video_references` y cuesta la mitad —
probarlo antes de ir a Seedance.

**Obligatorio en este caso:** la persona necesita **imagen de referencia previa aprobada** (regla 18),
que se pasa como `start_image`, y tiene que ser claramente **otra persona** que la del vídeo
plantilla.

### Tabla de costes completa

Medida con `get_cost` el 2026-09-08 en 9:16 sin audio. `get_cost: true` preflightea sin lanzar
trabajo ni gastar nada — **úsalo siempre antes de una tanda**.

| Modelo | Config | Créditos | Cr/s | 1080p real |
|---|---|---|---|---|
| Veo 3.1 Lite | 4 s | 4,00 | 1,00 | sin control |
| **Kling 3.0 `std`** | 3 s | **4,50** | 1,50 | a verificar |
| Kling 3.0 Turbo | 3 s, 720p | 4,50 | 1,50 | no |
| **Kling 2.6** | 5 s | **5,00** | **1,00** | sí |
| **Kling 3.0 `pro`** | 3 s | **5,25** | 1,75 | sí (1076×1924) |
| Kling 3.0 Turbo | 3 s, 1080p | 6,00 | 2,00 | sí |
| Kling 3.0 `std` | 5 s | 7,50 | 1,50 | a verificar |
| ~~Minimax Hailuo 2.3~~ ⛔ **prohibido** (regla 15) | 6 s, 1080 | 10,00 | 1,67 | sí |
| Kling 2.6 | 10 s | 10,00 | 1,00 | sí |
| Veo 3.1 fast | 4 s | 11,00 | 2,75 | — |
| Seedance 1.5 | 4 s, 1080p | 12,00 | 3,00 | sí |
| Happy Horse | 3 s, 1080p | 13,50 | 4,50 | sí |
| Wan 2.6 | 5 s, 1080p | 20,00 | 4,00 | sí |
| Veo 3 fast | por defecto | 22,00 | ~4,4 | — |
| Grok 1.5 | 4 s, 1080p | 32,00 | 8,00 | sí |
| Seedance 2.0 | 4 s, 1080p | 36,00 | 9,00 | sí |
| Cinema Studio 3.0 | 4 s, 1080p | 40,00 | 10,00 | sí |

**Dos contraintuiciones que cuestan dinero si no se saben:**
- El Kling 3.0 **Turbo cuesta más** que el `pro` en cuanto pides 1080p (6,00 vs 5,25), pese al nombre.
- **Kling 2.6 es más barato que Kling 3.0** por clip (5,00 por 5 s frente a 5,25 por 3 s). La versión
  nueva no es la barata.

Siempre `sound: "off"` / `sound: false` (baja créditos y el Reel no usa ese audio) y la duración
mínima del modelo — en montaje solo se usa ~1-1,5 s por escena.

## 6. Transiciones que retienen

### Whip de desenfoque direccional (la de uso general)

Efecto `ADBE Motion Blur` (se llama "Directional Blur" en la UI). Dos keyframes en los 3 primeros
fotogramas de cada plano entrante:

```
Direction: 90 (o 270, alternando por corte)
Blur Length: 45 → 0  en 0.125s (3 frames a 24fps)
```

Vende el corte como un latigazo de cámara. Alternar 90/270 entre cortes evita que se note el patrón.

**No lo pongas en cortes muy rápidos (<0.4s):** emborrona la ráfaga y pierdes la información que
justamente estás intentando meter.

### Shock cut B/N invertido (el pattern interrupt)

Robado de las plantillas virales de comida y confirmado como recurso barato y eficaz. Duplica la
capa del plano de apertura, **continuando el mismo tiempo de origen** (no reiniciándolo), y aplícale:

```
ADBE Black&White  →  ADBE Invert
```

Duración: **0.15s (3-4 frames)**. Colócalo pronto, dentro de la ventana de hook.

Como comparte fuente y continúa el mismo instante del clip, el movimiento no se corta: es el mismo
plano parpadeando en negativo. Ese es el efecto buscado.

### Ráfaga de microcortes

6 planos de ~0.35s encadenados en los primeros 2 segundos, a modo de tráiler. Máxima tasa de cambio
visual en la ventana de hook. Luego el cuerpo respira con planos de ~1s.

Funciona a nivel de señal, pero **ojo**: no movió la métrica titular (ver sección 9).

---

## 7. Corrección de luminosidad por escena

Dos efectos por capa, siempre en este orden:

1. `ADBE Exposure2` → propiedades `["Exposure"]` y `["Gamma Correction"]`
2. `ADBE Vibrance` → propiedades `["Vibrance"]` y `["Saturation"]`

**Nunca apliques el mismo grade a todas las escenas.** Renderiza un frame de cada plano, míralo, y
corrige según lo que veas. Rangos que funcionan en interiores de hostelería:

| Tipo de plano | Exposure | Gamma | Vibrance | Saturation |
|---|---|---|---|---|
| Plano cálido ya bien expuesto (brasa, madera) | 0.10–0.14 | 1.06 | 30–36 | 5–8 |
| Fondo oscuro con sujeto claro (jamón, vino) | 0.18–0.22 | 1.04–1.05 | 30–32 | 5–6 |
| Luz plana / sujeto pálido | 0.26–0.30 | 1.10–1.12 | 42–55 | 12–18 |
| Escena con ventana quemada | 0.05–0.08 | 1.05 | 28 | 6 |

En la **ráfaga del hook** sube el grade un escalón (más vibrance y contraste que en el cuerpo): más
señal visual donde más falta hace.

---

## 8. Texto en pantalla

**Es la única palanca de montaje que mueve una red cerebral distinta.** Sin texto, la red del
lenguaje se queda plana en ~0.24 durante todo el vídeo. Con un hook de texto sube a ~0.27 en t=0 y
arrastra la atención frontoparietal con ella.

### Tipografía

`font.list` acepta `familyContains` para filtrar — úsalo, hay 700+ fuentes y el listado por defecto
corta en 200.

Para **hostelería tradicional / clásica**, en una instalación Windows estándar (Trajan, Cinzel,
Playfair y Didot **no** vienen instaladas):

| PostScript name | Carácter |
|---|---|
| `BodoniMT` (Regular) | **La familia aprobada** — ver «Estándar aprobado» abajo. Didone clásica, aire de carta de restaurante y etiqueta de vino. ⛔ `BodoniMTBlack` está **rechazado** por el cliente (corregido el 2026-09-14: esta tabla lo daba como primera opción). |
| `GeorgiaPro-Black` | Serif robusta, la más legible de las tres. Lee algo más moderna. |
| `CopperplateGothic-Bold` | Grabado clásico de rótulo. Más débil en peso, requiere tamaño mayor. |
| `Garamond-Bold`, `BookAntiqua-Bold`, `BookmanOldStyle-Bold` | Alternativas clásicas si piden algo más suave. |

Evita las serif de trazo fino (`BaskOldFace`, `Castellar`): los trazos finos desaparecen a tamaño de
móvil.

### ESTÁNDAR APROBADO — úsalo por defecto

Esta especificación fue **validada por cliente el 2026-09-08** tras rechazar la alternativa pesada.
Aplícala directamente en Reels de hostelería sin abrir debate tipográfico:

| Elemento | Fuente | Tamaño | Tracking |
|---|---|---|---|
| Titular | `BodoniMT` | 70 | 400 |
| Marca / subtítulo | `BodoniMT` | 40 | 640 |
| Placa de cierre | `BodoniMT` | 62 | 540 |

Blanco puro, `applyStroke: false`, Drop Shadow `Distance 0 / Softness 70 / Opacity 200`, filete de
2px a opacidad 70. Animación: fade 0.45s + subida 14px, filete dibujándose desde el centro,
entradas escalonadas ~0.12s.

### Estilo: NO uses contorno negro grueso

**Este es el error que hace que un Reel se vea amateur.** Texto enorme en peso Black con un borde
negro de 13px es la firma visual del vídeo casero. Rechazado explícitamente por cliente.

❌ **Lo que NO hay que hacer:**
```json
{"font": "BodoniMTBlack", "fontSize": 128, "strokeWidth": 13, "tracking": 12}
```

✅ **Tipografía premium sobre vídeo — el patrón que sí funciona:**

```json
{"font": "BodoniMT", "fontSize": 70, "fillColor": [1,1,1],
 "applyStroke": false, "justification": "center", "tracking": 400}
```

Los cuatro principios, que van todos en la misma dirección — **restar, no añadir**:

1. **Peso Regular, no Black.** El trazo fino es lo que lee como caro.
2. **Tamaño pequeño** (60-75px en 1080×1920, no 130). El texto no debe gritar.
3. **Tracking enorme** (`400-640`). Mayúsculas muy espaciadas = registro editorial/lujo. Es el
   parámetro que más trabaja de todos.
4. **Cero contorno.** La legibilidad la da una **sombra suave**, no un borde duro:

```json
{"matchName": "ADBE Drop Shadow", "Distance": 0, "Softness": 70, "Opacity": 200}
```

`Distance: 0` + `Softness` alta = halo oscuro difuso que despega el texto del fondo sin ensuciarlo.
La `Opacity` de Drop Shadow va en escala **0-255**, no 0-100.

### Contraste texto/fondo: mira SIEMPRE el plano que va debajo

**La sombra suave ayuda, pero no salva un fondo mal elegido.** Antes de decidir el color del texto,
mira el fotograma concreto sobre el que va a caer — y no solo uno: el texto dura 1-2s y por debajo
pasan varios planos, así que hay que comprobar **todo el tramo**, no el primer frame.

- **Texto blanco → el plano de debajo tiene que ser oscuro o de tono medio.** Sobre un plato muy
  iluminado, un mantel blanco o una ventana quemada, el blanco desaparece por mucha sombra que lleve.
- **Texto oscuro → el plano de debajo tiene que ser claro.** Sobre una brasa, un fondo negro o una
  sala en penumbra, no se lee.

**Cómo comprobarlo, no adivinarlo:** renderiza frames en el inicio, la mitad y el final del tramo en
que el texto está visible, y míralos. Si en alguno el texto pelea con el fondo, hay tres salidas, en
este orden de preferencia:

1. **Mover el texto** a una zona del encuadre que sea estable y de tono contrario (el fondo oscuro
   detrás de una copa, la sombra bajo una mesa). Es la solución limpia.
2. **Recolocar el texto en el tiempo** para que caiga sobre los planos que sí contrastan.
3. **Poner un degradado sutil** debajo: un solid negro con máscara degradada al 35-45% de opacidad
   solo en la banda del texto. Último recurso — ensucia el plano.

Nunca la salida fácil de subir el contorno: eso devuelve al look amateur (ver arriba).

**Regla práctica al planificar el guion:** decide qué planos llevan texto *antes* de fijar el orden
de los cortes. Un plano claro y uno oscuro consecutivos bajo el mismo texto obligan a comprometer el
color, y el resultado no funciona bien en ninguno de los dos.

### Texto revelado por capas — recurso validado por el cliente

**Le gustan** los efectos donde el texto aparece al retirarse un elemento, o queda por detrás de un
objeto. No es un fundido: es el **movimiento de la escena** el que descubre la palabra.

| Efecto | Cómo se hace |
|---|---|
| Texto **detrás de un objeto** | Duplicar el clip, enmascarar el objeto en la copia superior (`mask.add` + `mask.set_path`) y meter la capa de texto entre las dos |
| **Revelado por movimiento** | `layer.set_track_matte` con `matteType: "alpha"` o `"lumaInverted"`, con una forma que sigue al elemento que se retira |
| **Revelado simple** | Cronometrar la entrada del texto al fotograma exacto en que el elemento sale de cuadro. Es el más barato y da el 80 % del efecto |

Empezar siempre por el revelado simple: sale casi igual y no requiere rotoscopia. Y **la tipografía
no cambia** — sigue siendo el estándar aprobado (§8). Lo que cambia es cómo entra, no cómo se ve.

### El filete fino: el detalle que sube el nivel

Una línea horizontal de 2px entre el titular y el subtítulo. Se hace con un **solid**, no con shape
layer (mucho más simple): `layer.create_solid` con `width: 520, height: 2`, opacidad ~70.

### Estructura de lockup que funciona

```
        A S Í   S E   C O M E          ← 70px, tracking 400
        ─────────────────────          ← filete 2px, opacidad 70
      T O R R E   D E   V E G A        ← 40px, tracking 640
```

Titular grande espaciado, filete, marca pequeña aún más espaciada. Para la placa de cierre, el
mismo patrón invertido (filete arriba, marca debajo).

**Compensación de centrado:** el tracking añade espacio también *después* del último carácter, así
que un texto centrado aparece desplazado a la izquierda. Compénsalo sumando ~8-12px a la X de la
posición (p. ej. 548 en vez de 540).

`text.set_style` **conserva los parámetros que no le pasas** — puedes cambiar solo la fuente sin
reespecificar color y alineación.

### Animación: elegante, no golpe

El golpe de escala (`72 → 108 → 100`) es punchy y encaja con el estilo chunky, pero **desentona con
el minimalismo**. Para texto premium, movimientos lentos y suaves:

```
Texto:   Opacity 0 → 100 en 0.45s
         Position Y +14px → final en 0.6s   (subida suave)
Filete:  Scale X 0 → 100 en 0.65s           (la línea se dibuja desde el centro)
```

Escalona las entradas: titular a 0.2s, filete a 0.3s, subtítulo a 0.42s. Esa cascada de ~0.12s entre
elementos es lo que hace que se vea coreografiado y no montado de golpe.

Salida: fundido de 0.15s, nunca corte seco.

### Copy

**El texto es mensaje de marca: es del cliente, no tuyo.** Propón siempre una opción marcada
explícitamente como propuesta y pide que la valide. No inventes afirmaciones sobre el negocio
(premios, antigüedad, "el mejor de…") que no te hayan dado por escrito.

---

## 9. Techo de viralidad — lo más importante de esta skill

Medido el 2026-09-08 con 5 análisis del Virality Predictor sobre el mismo material (6 clips Kling de
3s, cámara estática, sin caras, sin audio):

| Versión | Hook | Overall | Viral | Act. visual t=0 |
|---|---|---|---|---|
| CONTROL (corte plano, sin nada) | 24 | 40 | 38 | 0.377 |
| Cortes 1s + grade + whips + shock cut | 25 | 40 | 38 | 0.392 |
| Reordenado por dato + ráfaga microcortes | 24 | 39 | 37 | 0.429 |
| + hook de texto en pantalla | 25 | 40 | **38** | **0.437** |

**Un corte plano sin editar puntúa igual que un montaje completo.** Overall 40 y viral 38 en ambos
extremos.

Lo que **sí** mejora medibemente con el montaje:
- Corteza visual en t=0: **+16%**
- Activación global media: **+4.4%**
- Default Mode (divagación mental): **a la baja** en todo el vídeo
- Red del lenguaje: **+3.6%** al meter texto

**Por qué el titular no se mueve:** `hook_score` mide la ventana 0-3s **relativa al pico del propio
vídeo**, y el pico se queda en t=5 haga lo que haga el montaje. Con b-roll de comida de cámara
estática la curva de activación es plana (rango 0.28–0.31) y no hay nada que el montaje pueda hacer.

### Implicación práctica

**No gastes más de 2 iteraciones de Virality Predictor en el montaje de un Reel de comida.** Se
agota. Las palancas que quedan están en el material y en la publicación:

1. **Más elementos en el encuadre.** Es la palanca demostrada dos veces. Una mesa con seis platos da
   0,525 de corteza visual frente a 0,443 de un plato solo. Formato de acumulación > plato único.
2. **Una cara humana / alguien hablando.** El mayor activador medido (formato de persona a cámara,
   45/45). La regla 2 ya **no lo bloquea**: se rebajó a preferencia el 2026-09-08 (una persona
   generada necesita imagen de referencia aprobada, regla 18; un empleado real, su consentimiento).
3. **Movimiento real fuerte** en el material: un chorro que salpica, queso estirándose. Las
   animaciones de Kling son deliberadamente sutiles y eso se paga aquí.

> ~~**Audio.**~~ **Descartado el 2026-09-08.** Se creyó que la red auditiva baja (0,238) se debía a
> que el MP4 no lleva pista, y que añadir música era la mayor palanca pendiente. Pero una plantilla
> **con** música da exactamente **0,238** en esa misma red. O el analizador no procesa el audio, o la
> música no mueve la métrica. No hay evidencia de que añadir audio suba la puntuación — no usar ese
> argumento.

### Qué plano abre

**Deja que lo decidan los datos, no la intuición.** Lee `values_by_frame` de `visual_occipital` en
el análisis: el segundo con el pico es tu plano más potente. En el caso medido, el pulpo con gambas
(colorido, complejo, muchos elementos) superaba al solomillo a la brasa (marrón sobre marrón), que
era el candidato "obvio".

Complejidad visual y contraste cromático > belleza del plato.

---

## 10. Análisis con Virality Predictor: flujo

```
media_upload (filename, content_type)  →  devuelve upload_url + media_id
curl -X PUT --data-binary @<ruta ABSOLUTA> '<upload_url>'   →  HTTP 200
media_confirm (media_id, type: "video")
virality_predictor (action: create, params: {model, medias:[{role:"video", id}]})
job_status (jobId, sync: true)   →  repetir hasta status: completed
```

**Límite duro: 16 segundos.** Vídeos más largos son rechazados. Si necesitas evaluar un montaje
largo, haz una versión corta representativa.

**Métricas que devuelve y cómo leerlas:**
- `hook_score` — ventana 0-3s, relativa al pico. Saturada en contenido de comida.
- `sustain` — retención una vez enganchado. Los cortes rápidos lo suben fácil (95-98).
- `peak_second` — dónde está el pico real. Si cae tarde, el hook es débil.
- `regions[].values_by_frame` — **lo más útil de todo**. Activación por segundo y por red cerebral.
  Es lo que te dice *qué plano* funciona y *dónde* está el bache.
- `default_mode` — `lower_better: true`. Es divagación mental. Si es alto en t=0, el arranque no
  engancha.

Ignora el titular y lee `values_by_frame`. Ahí está la información accionable.

---

## 11. Render y export

La cola de AE trae plantilla H.264 directa, no hace falta Media Encoder:

```json
{"renderTemplate": "Best Settings",
 "outputTemplate": "H.264 - Match Render Settings - 15 Mbps",
 "outputPath": "C:\\ruta\\absoluta\\salida.mp4"}
```

Flujo: `render.clear_queue` → `render.add_to_queue` → `render.set_output` → `render.start`.
Encadénalos en un `batch.run` salvo `render.start`, que va aparte con `timeoutMs` alto (un Reel de
8s tarda ~40s; uno de 21s tardó ~170s).

Descubre las plantillas disponibles con `render.list_templates` (**necesita al menos un elemento en
la cola** para poder leerlas).

15 Mbps a 8s ≈ 16 MB. Si hay que enviarlo por un canal con límite de tamaño, recomprime con
`ffmpeg -crf 23`.

---

## 12. Verificación visual: cómo mirar lo que haces

`render.frame` es tu ojo. Renderiza frames en los puntos clave (hook, cada corte, el shock cut, el
cierre) y **míralos de verdad** antes de dar nada por bueno.

**Los PNG de AE salen con canal alfa y a veces fallan al leerse.** Conviértelos a JPG:

```bash
ffmpeg -y -i frame.png -vf scale=540:-1 frame.jpg
```

**Ojo con la condición de carrera:** si encadenas varios `render.frame` en un `batch.run` y
conviertes inmediatamente, ffmpeg puede leer un PNG a medio escribir ("chunk too big", "Invalid PNG
signature"). Reintenta la conversión, no vuelvas a renderizar.

**El directorio de trabajo del shell no persiste como esperas** entre llamadas. Usa **rutas
absolutas** en `curl --data-binary @...` y en `ffmpeg`, o `cd` explícito al principio de cada
comando.

---

## 13. Encaje con el cliente

Antes de montar nada, comprueba si el cliente monta él. Hay clientes que **tienen su propio flujo en
CapCut y no quieren el montaje hecho**; en ese caso el trabajo termina en entregar los clips por
escena generados y aprobados.

**Torre de Vega** empezó así (Reel 01, 2026-09-07, montaje con `ffmpeg` rechazado), pero desde el
2026-09-08 **pide y aprueba el montaje en After Effects por MCP** — es el paso 7 del flujo de
`CLAUDE.md`. Lo rechazado fue `ffmpeg`, no la edición. *(Corregido el 2026-09-14: esta sección aún
decía que Torre de Vega no quería el montaje hecho.)*

Ofrece siempre la vía de escape: los clips sueltos siguen ahí por si prefiere montar una pieza él.
