# 11 — FPV de cámara invisible y física de fuerza compartida (construcción/deconstrucción imposible)

> Origen: prompt de producción real para una secuencia FPV de 10s, un solo plano continuo, de una construcción arquitectónica "imposible" — la gravedad cambia de dirección varias veces (UP → LEFT → TOWARD BUILDING → UP → ZERO-G → DOWN) y tanto los materiales sueltos como la propia cámara reaccionan a la misma fuerza en cada instante, hasta que el edificio queda ensamblado exactamente como en la imagen de referencia.
>
> Este archivo no documenta "un prompt bonito de dron imposible": documenta el **patrón estructural reutilizable** detrás de él — aplicable a cualquier pieza FPV de un solo plano donde (a) la cámara debe ser invisible y (b) el mundo entero obedece a una única fuerza física que cambia de dirección, no a eventos causales independientes.
>
> Léelo junto a:
> - `10-bullet-time-y-secuencias-largas.md` — el otro patrón de "plano largo, un solo shot, con reglas de física estrictas". Comparten estructura (refs con rol, object count, beats con timestamp, coda) pero **usan contratos de física opuestos** — ver §1.
> - `06-direccion-movimiento.md` — la biblia del restraint para clips cortos. Este archivo y el 10 son las dos excepciones deliberadas al "un solo beat": aquí hay muchos beats, pero cada uno resuelve la MISMA regla física, no una regla nueva cada vez.
> - `09-vocabulario-plano-y-modo-organico.md` — vocabulario de plano/cámara; este archivo añade vocabulario específico de FPV y de ensamblaje.
> - `03-modelos-video.md` — cámara compleja + multi-elemento + física → dominio de `seedance_2_0`, nunca `kling3_0` (ver tabla de selección ahí).

---

## 1. Dos contratos de física distintos para un plano largo continuo

`10-bullet-time-y-secuencias-largas.md` establece un contrato: **world-space lock** — los objetos se quedan fijos, solo la cámara se mueve. Es el contrato correcto cuando el plano es una *inspección* (la cámara visita objetos que no tienen motivo para moverse).

Este prompt usa el contrato contrario, igual de válido pero para el caso opuesto — cuando el plano es una *tormenta de eventos*, no una inspección:

> **Fuerza compartida (shared-force contract):** existe UNA sola variable física externa (aquí, el vector de gravedad) que cambia de dirección en momentos concretos y nombrados. TODO lo que hay en el plano —cada objeto suelto y la propia cámara FPV— obedece a esa misma variable, al mismo tiempo, con la misma dirección.

```text
Gravity violently switches direction: UP → LEFT → TOWARD BUILDING → UP → ZERO-G → DOWN.
Every loose object and the FPV camera react simultaneously.
```

**Por qué funciona:** con múltiples objetos en pantalla a la vez (no uno detrás de otro como en la inspección de bullet-time), enumerar una causa física distinta por objeto sería inviable. La solución es la inversa: declarar **una única fuerza gobernante**, y dejar que cada beat simplemente describa sus dos consecuencias en paralelo — qué le hace al entorno, qué le hace a la cámara. La cámara deja de ser un agente libre (como en el contrato de bullet-time) y pasa a ser **un objeto más obedeciendo la misma física** — eso es lo que hace creíble que sea "imposible pero coherente" en vez de caótico.

**Regla de decisión entre los dos contratos:**

| | World-space lock (`10`) | Fuerza compartida (`11`, este archivo) |
|---|---|---|
| Quién se mueve | Solo la cámara | Todo: objetos + cámara, a la vez |
| Tipo de plano | Inspección secuencial (un foco cada vez) | Tormenta simultánea (todo el frame en movimiento) |
| Causalidad | Cadena de eventos únicos (colisión → separación →...) | Una sola variable física que cambia de estado (§5) |
| Riesgo principal | Objeto que "vuela" hacia cámara en vez de que la cámara se acerque | Objetos/cámara que no reaccionan igual al mismo cambio de fuerza (rompe la ilusión de "una sola física") |

No son intercambiables: usar fuerza compartida en una pieza de inspección da caos sin foco; usar world-space lock en una tormenta de escombros da un plano vacío de energía.

---

## 2. Referencia con doble rol: bloqueo del ESTADO FINAL, libertad en el RECORRIDO

El prompt separa explícitamente qué toma de la referencia y qué NO:

```text
@image1 defines the exact final building: its complete architecture, proportions,
silhouette, floor count, roof form, facade materials, colours, window pattern,
entrances, and every surrounding element visible in the reference.
The final frame must show this building 100% complete, exactly matching @image1.
Do not use the reference image's camera angle as a constraint during flight —
only for the final state of the building itself.
```

Esto es una variante nueva del patrón de `10-bullet-time-y-secuencias-largas.md` §2.1 ("rol explícito + qué NO copiar"), pero aplicado al **eje temporal** en vez de al eje espacial: la referencia fija **el último fotograma** (identidad del sujeto en su estado completo), no el encuadre desde el que se generó. Sin esta separación explícita, el modelo tiende a clonar el ángulo de cámara de la foto de referencia como si fuera el plano final del vídeo, en vez de tratarlo solo como ficha de identidad del objeto.

**Patrón generalizable:** en cualquier vídeo donde una referencia describe un *sujeto en su estado ideal* (un edificio terminado, un producto montado, un plato emplatado) pero el vídeo recorre un *proceso* hacia ese estado, declara explícitamente: "la referencia fija identidad/estado final, no composición de cámara" — si no, el modelo intenta igualar el framing de la foto en vez de dejar que la cámara coreografíe su propio recorrido.

---

## 3. Bloqueo de entorno a nivel de escena (extensión de EXACT OBJECT COUNT)

`10` documenta `EXACT OBJECT COUNT` para evitar que se dupliquen props/personas. Este prompt extiende el mismo principio al **entorno completo**, no solo a props discretos:

```text
No other buildings may be invented; the environment stays consistent with
@image1 throughout.
```

**Por qué hace falta un bloque aparte:** en una tormenta de escombros con cámara moviéndose violentamente y mucho fuera de cuadro sugerido, el modelo tiende a "rellenar" el mundo con arquitectura nueva cada vez que la cámara mira a un lado (un edificio de fondo que no estaba, una estructura secundaria inventada). El fallo es el mismo que la duplicación de props de `10`, pero a escala de escenario en vez de a escala de objeto.

**Patrón generalizable:** en cualquier plano FPV/dron con cámara muy dinámica sobre un entorno específico (una obra, un paisaje, un set), añade una línea explícita de "no inventes elementos nuevos del entorno; el escenario es exactamente el de la referencia en todo momento" — no asumas que basta con fijar el sujeto principal.

---

## 4. LA CÁMARA ES INVISIBLE — bloque de negativos específico de FPV

Esto es nuevo respecto a la lista negra de `06-direccion-movimiento.md` (que prohíbe gimmicks de *movimiento*: brillos, chispas, levitación). Aquí el riesgo no es un gimmick de movimiento sino que **el dispositivo que porta el punto de vista se filtre en el frame** — un fallo típico de FPV/POV generado por IA:

```text
THE CAMERA IS INVISIBLE: this is a pure first-person viewpoint flying through
space. The camera itself must NEVER appear in frame — no drone body, no
propellers, no camera housing, no photo device, no rig, no shadow of a drone,
no reflection of any camera in glass, water or polished surfaces. Nothing
that reveals what is "carrying" the view may ever be shown.
```

Nótese la exhaustividad deliberada: no basta con "sin dron visible" — hay que cubrir **sombra** del dron y **reflejo** en superficies (cristal, agua, metal pulido), que son los dos sitios donde el modelo more probable filtra el aparato aunque nunca lo pida en el prompt principal.

**Patrón generalizable — añádelo siempre que el plano sea POV/FPV puro** (recorrido en primera persona sin sujeto visible en cuadro, sea dron, sea "los ojos de un personaje", sea cámara subjetiva):

```text
Pure first-person / POV viewpoint. The camera/viewpoint device must NEVER
appear in frame: no visible body, no rig, no housing, no shadow of it on
any surface, no reflection of it in glass, water, metal or any polished
surface. Nothing reveals what is "carrying" the view.
```

Este bloque es un negativo tan crítico como la lista de `06` — considera fusionarlo mentalmente con esa lista cuando el plano sea FPV: los dos tipos de negativo (gimmicks de movimiento + aparato visible) suelen fallar a la vez si no se nombran ambos por separado.

---

## 5. Vocabulario de fase física y de ensamblaje inverso

### 5.1 Beats anclados al cambio de fuerza, no a la acción narrativa

En vez de nombrar beats por lo que "hace la historia" (como en `10` §2.6: reveal, colisión, inspección...), aquí cada beat se nombra por **el estado de la variable física** y describe sus dos consecuencias en paralelo — entorno y cámara:

```text
00:00–00:01 — GRAVITY UP ↑
  [Efecto en el entorno: qué hacen los objetos sueltos]
  [Efecto en la cámara: cómo reacciona el FPV al mismo vector]
00:01–00:02 — VIOLENT UP ↑ (misma dirección, intensidad mayor)
00:02–00:03 — SWITCH LEFT ← (cambio de dirección; describe el *whip* de reorientación de TODO lo que estaba en vuelo)
```

**Patrón generalizable:** cuando el plano tiene una sola variable física gobernante que cambia de estado varias veces, nombra cada beat por el **estado de la variable** (`GRAVITY UP`, `ZERO-G`, `SWITCH LEFT`), no por una etiqueta narrativa — y dentro de cada beat, describe siempre las dos capas (entorno / cámara) para que el modelo no las trate como independientes.

### 5.2 Verbos de ensamblaje inverso (construcción, no destrucción)

Para secuencias de "reverse-destruction" — piezas que en vez de salir despedidas se ensamblan con precisión — el prompt usa una cadena de verbos corta y explícita:

```text
ACCELERATE → ROTATE → ALIGN → SNAP
```

```text
Structural components slam into exact positions dictated by @image1's
architecture. Columns rotate vertical, beams lock horizontally, slabs
become floors.
```

**Por qué hace falta nombrar la cadena de verbos:** sin ella, el modelo interpreta "objetos volando hacia el edificio a gran velocidad" como una colisión/explosión (que es el prior estadístico de "objetos + velocidad + impacto"), no como un ensamblaje preciso. Declarar explícitamente el verbo final (`SNAP`, `LOCK INTO PLACE`) fuerza el resultado de "encaje perfecto" en vez de "impacto caótico".

**Patrón generalizable:** cualquier plano de "construcción acelerada", "montaje en reversa" o "objetos que se autoensamblan" necesita esta cadena de verbos explícita (aceleración → reorientación → alineación → fijación), más una frase de cierre tipo *"exact positions dictated by [referencia]"* que ancle el resultado a la geometría real de la referencia y no a una interpretación libre.

### 5.3 "No visible gravity effects" — la negación que cierra el bloque físico

El prompt cierra la regla de gravedad con una negación aparentemente contradictoria pero deliberada:

```text
Gravity violently switches direction... No visible gravity effects.
```

Esto no prohíbe el efecto (que es literalmente el concepto central de la pieza) — prohíbe los **artefactos visuales genéricos** con los que un generador suele *ilustrar* "gravedad" cuando no se le da vocabulario preciso: líneas de movimiento tipo cómic, distorsión de lente, ralentización visible del framerate, vinetas de impacto. **Patrón generalizable:** cuando pidas un efecto físico poco común, añade una negación corta que excluya la representación "de cómic/VFX genérico" del efecto — quieres la física real del efecto, no su iconografía de dibujo animado.

---

## 6. Plantilla en blanco reutilizable

```text
@image1 = [ROL: identidad/estado final del sujeto]. Preservar: [lista exhaustiva
de rasgos del sujeto en su estado completo]. NO usar de la referencia: [ej. el
ángulo de cámara de la foto — solo aplica al estado final, no al recorrido].
El entorno se mantiene consistente con @image1 en todo momento; no se inventan
elementos nuevos del escenario.

Create a [N]-second ultra-dynamic continuous [tipo de plano] sequence. One
continuous impossible shot, no visible cuts. [Regla de la variable física
única y su secuencia de estados]: [ESTADO A] → [ESTADO B] → [ESTADO C] → ...
Every loose object and the [cámara/POV] react simultaneously. No visible
[efecto]-genérico artifacts.

THE CAMERA IS INVISIBLE: pure first-person viewpoint. The camera/viewpoint
device must NEVER appear in frame: no body, no rig, no housing, no shadow
of it, no reflection of it in any surface.

[TIMESTAMP] — [ESTADO A]
  [efecto en el entorno]
  [efecto simultáneo en la cámara/POV]
[TIMESTAMP] — [ESTADO B — cambio de estado]
  [whip/reorientación de TODO lo que estaba en movimiento, entorno + cámara]
...
[TIMESTAMP — beat final] — [ESTADO DE CIERRE, ej. ensamblaje/resolución]
  ACCELERATE → ROTATE → ALIGN → SNAP: [componentes] se fijan en
  [posición exacta dictada por @image1].

[Coda fotográfica estándar de 05-biblia-hiperrealismo.md, adaptada a FPV:
óptica, si aplica lente de acción/gran angular, grading, "no CGI, no VFX
sim genérica".]
```

---

## 7. Consideraciones de modelo (MCP) — huecos por verificar

- Cámara compleja + multi-elemento + física simultánea es, por lo ya documentado en `03-modelos-video.md`, terreno de **`seedance_2_0`**, no `kling3_0` (que rinde peor con movimiento de cámara real y con múltiples elementos moviéndose a la vez).
- **10s de duración con recorrido FPV continuo y multitud de objetos en pantalla simultáneamente** es una carga de movimiento alta; conviene iterar primero en `mode:"fast"`/resolución baja para validar la coreografía de beats antes de lanzar la tanda final en `std` + `1080p` (ver trampas de rate limit y coste en `01-higgsfield-mcp.md` y `07-troubleshooting.md`).
- Si el resultado real se parece demasiado a un preset del catálogo de Higgsfield (este tipo de "impossible construction reveal" es un formato con tirón comercial), revisa la trampa de `declined_preset_id` documentada en `templates/prompt-video-motion.md` §6 antes de asumir que el job se lanzó literal.
- **(verificar)** si 4 refs / cambios de estado tan granulares por timestamp caben en un solo `prompt` de `generate_video` estándar o si esta clase de pieza corresponde mejor a una app/preset específico del catálogo (`get_workflow_instructions`) — mismo hueco que señala `10-bullet-time-y-secuencias-largas.md` §5 para piezas de alta complejidad.

---

## 8. Checklist rápido antes de escribir una pieza FPV de fuerza compartida

- [ ] ¿La referencia separa explícitamente qué fija (identidad/estado final) de qué NO fija (ángulo de cámara, composición de la foto)?
- [ ] ¿Hay una línea de "el entorno no inventa elementos nuevos" si la cámara es muy dinámica?
- [ ] ¿Está declarada la variable física única y su secuencia de estados con nombres cortos (`GRAVITY UP`, `ZERO-G`...)?
- [ ] ¿Cada beat describe las DOS capas — efecto en el entorno y efecto simultáneo en la cámara — no solo una?
- [ ] Si el plano es POV/FPV puro: ¿está el bloque **"THE CAMERA IS INVISIBLE"** completo (cuerpo, rig, sombra, reflejo)?
- [ ] Si hay ensamblaje/construcción en reversa: ¿está la cadena de verbos `ACCELERATE → ROTATE → ALIGN → SNAP` (o equivalente) y el anclaje "posición exacta dictada por la referencia"?
- [ ] ¿Hay una negación corta contra la iconografía genérica del efecto físico pedido (líneas de cómic, distorsión de lente, etc.)?
- [ ] ¿Se ha elegido el contrato de física correcto — world-space lock (`10`) vs. fuerza compartida (este archivo) — según si el plano es inspección secuencial o tormenta simultánea?
- [ ] ¿Modelo verificado (`03-modelos-video.md`) — `seedance_2_0` para cámara+física compleja, nunca `kling3_0`?
