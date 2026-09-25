# 05 · Vocabulario de cámara

El marketing de Higgsfield se reconoce por sus movimientos con nombre (Dolly In, Crash Zoom, Bullet
Time, 360 Orbit, FPV Drone…). Aquí se traducen a lo que sirve en un restaurante **sin inventar el
local** y a la fórmula que el cliente validó: aparato nombrado, recorrido cuantificado, velocidad
constante y en marcha del primer al último fotograma (regla 11).

Cada movimiento tiene una **intención**: qué revela o hacia dónde lleva la mirada (regla 9). Si no
puedes decir la intención en una frase, el plano no necesita ese movimiento.

## Índice

1. Movimientos admitidos
2. Movimientos restringidos o prohibidos
3. Ángulos: qué cuenta como distinto
4. Micro-movimientos: siempre con distancia

---

## 1. Movimientos admitidos

La columna «fórmula» va en el bloque CAMERA, seguida siempre de: *Slow, constant speed, already moving
on the first frame and still moving on the last. Perfectly mechanical and stabilised: no handheld
operation, no shake, no jitter, no wobble, no floaty drift.*

| `movimiento` | Nombre tipo Higgsfield | Intención | Fórmula | Modelo | Riesgo |
|---|---|---|---|---|---|
| `push_in` | Dolly In | Ganar intimidad hacia el detalle | *a slow motorised push-in of about 3-5 percent toward <sujeto>* | Kling (sin acción) · Seedance (con acción) | Bajo |
| `push_in` (largo) | Super Dolly In | Del contexto al detalle en un plano | *starts high over the whole plate and descends and pushes in about fifteen percent toward <sujeto>* (validado: carne cortada) | Seedance | Medio: revela lo que no estaba |
| `pull_back` | Dolly Out | Sorpresa o contexto | *starts close on <detalle> and pulls back about 8 percent to reveal <conjunto>* | Seedance | Medio: lo revelado debe estar en el keyframe o en las anclas |
| `lateral` | Dolly Left/Right, Truck | Profundidad por parallax | *a single continuous lateral move on a motorised slider with a geared head, travelling about 5-8 percent to the <dirección>, so the foreground <objeto> slides across the frame faster than <fondo>* | Kling | Bajo |
| `arco` | Arc, Robo Arm (corto) | Volumen y textura | *a single continuous short arc of about 6-15 degrees around <sujeto> from left to right* | Kling (objeto quieto) · Seedance (con acción) | Medio: más de 15° inventa la cara oculta |
| `grua_bajada` | Crane Down, Jib Down | Aterrizar en el plato | *a slow mechanical crane descent of about 4 percent, lowering toward <sujeto>* | Seedance | Bajo-medio |
| `grua_subida` | Crane Up, Jib Up | Revelar la sala desde la mesa | *a slow mechanical crane rise of about 5 percent, revealing <sala>* | Seedance | Medio: la sala debe estar anclada |
| `tilt` | Tilt Up/Down | Aparición vertical del plato o la lámpara | *a slow geared-head tilt of about 6 degrees upward from <A> to <B>* | Kling | Bajo |
| `foco` | Focus Change | Pasar la atención de un objeto a otro | *a slow, smooth focus pull from <objeto cercano> to <objeto lejano>; the camera itself creeps forward about 3 percent* | **Seedance** (Kling lo ignoró en el Reel 09) | Medio |
| `bloqueada` | Static | Formato «mismo plano, cambia el plato» (regla 14) | *locked-off tripod, the camera does not move* | Seedance con `end_image` | Solo con excepción anotada |

### Cenital

Cenital (Overhead) es un **ángulo**, no un movimiento: un cenital con `grua_bajada` o `arco` corto
funciona muy bien para mesas y platos, y cuenta como ángulo distinto de cualquier tres cuartos.

### Movimientos de montaje (L1)

Gratis y sin riesgo sobre metraje real o sobre un clip ya aprobado: push-in digital, rampa de velocidad,
corte con salto de escala (el «crash zoom» de montaje). **No sirven para abrir el Reel sobre una foto
fija** (regla 12).

---

## 2. Movimientos restringidos o prohibidos

| Nombre tipo Higgsfield | Por qué | Qué hacer en su lugar |
|---|---|---|
| Handheld, Wiggle, Snorricam | El cliente lo rechazó por temblor (regla 11) | Slider motorizado |
| Static a secas | Lee como foto animada (regla 5) | Micro-movimiento mecánico de 3-4 % |
| 360 Orbit, Lazy Susan con el plato girando | El modelo inventa la cara oculta del plato o la deforma al girar | Arco de 6-15° |
| Crash Zoom / Rapid Zoom generados | El «zoom punch» está en los negativos validados | Salto de escala en montaje |
| FPV Drone, Through Object | Atraviesa espacios que no están en ninguna foto: inventa el local | Solo con un recorrido 3D real del local (módulo experimental del TFG) |
| Bullet Time | Posible con un gesto congelado y anclas completas; caro y arriesgado (ver `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/10-bullet-time-y-secuencias-largas.md`) | Reservarlo para un plano héroe con «ok» del cliente |
| Hyperlapse, Timelapse de sala | Se inventan personas y servicio | Solo con metraje real |
| Dutch Angle, Fisheye | Fuera del tono de marca (auténtico, tradicional) | — |
| Whip Pan generado | Puente sin anclas | Transición en cámara (`02` §3) o en montaje |

### Excepciones aprobadas por perfil (Da Tonino, 25/09/2026)

Donde el perfil del cliente no lo prohíbe, Víctor aprobó en el reel v4 de Da Tonino estos movimientos,
siempre sobre una imagen aprobada que ya enseña el espacio o el gesto (→ `04` §4.0):

| Movimiento | Fórmula que funcionó |
|---|---|
| Planeo FPV / dron de interior en la sala | *stabilised FPV-style glide at table height between the tables toward the window, then rising smoothly like a small indoor drone to a high angle …, ending steady. The room … stays exactly as in the reference; nothing new appears.* |
| Whip en mano que sigue un salto de sartén | *handheld whip-follow of the toss with real weight, then settles* |
| Dolly-in que frena en seco | *fast snap dolly-in of 10 cm on a slider that stops hard with a tiny settle as <acción> lands* |
| Slider macro lateral | *macro probe lens on a motorised slider tracking sideways along <borde> at constant speed, 6 cm in 1s, … through a razor-thin focus plane* |

Para Torre de Vega sigue valiendo la tabla de arriba (sin cámara en mano).

---

## 3. Ángulos: qué cuenta como distinto

Criterio del cliente (2026-09-15): cambiar distancia, focal o recorte **no** es otro ángulo. Cuenta la
**posición** alrededor del sujeto o la **altura** de la cámara.

| `posicion` | Descripción | Buen uso |
|---|---|---|
| `frontal` | Cámara de cara al sujeto | Sala, cierre con placa |
| `tres_cuartos` | 30-60° respecto al frente | Plato con volumen |
| `lateral` | 90°, de perfil | Silla, vertido a ras, fila de copas |
| `cenital` | 90° desde arriba | Mesa completa, composición de platos |
| `contrapicado` | Desde abajo | Lámpara, botellas en alto |
| `picado` | Desde arriba sin llegar a cenital | Detalle del corte |

| `altura` | Referencia física |
|---|---|
| `ras_de_mesa` | Objetivo a la altura del mantel |
| `mesa` | Objetivo un poco por encima del mantel |
| `sentado` | Ojos de un comensal sentado |
| `respaldo` | Altura del respaldo de la silla |
| `de_pie` | Ojos de una persona de pie |
| `alto` | Por encima de la cabeza |
| `bajo` | Cerca del suelo o bajo el sujeto |

Antes de animar, pon los keyframes juntos en la hoja de contactos y rechaza los que repitan ángulo sin
excepción justificada.

---

## 4. Micro-movimientos: siempre con distancia

Un porcentaje o unos grados, nunca «slightly»:

- Push-in: 3-5 % en un plano de 3 s; 15 % solo en un plano largo de revelación.
- Lateral: 5-8 %.
- Arco: 6-15°.
- Grúa: 4-5 %.
- Silla: 10 cm. Copa: 1 cm. Plato bajando: 5 cm.

Sin distancia, el modelo elige, y suele elegir de más.
