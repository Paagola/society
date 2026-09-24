# 02 · Transiciones

Catálogo de transiciones de cuatro fuentes: OpenMontage (convenciones de montaje), el vocabulario de transiciones para vídeo generado (smixs, guía oficial de Seedance 2.5), las transiciones medidas en After Effects con clientes y la API de Remotion. Una transición es **significado**, no decoración.

## Índice

1. Reglas que mandan
2. Catálogo de montaje (OpenMontage)
3. Árbol de decisión
4. Transiciones dentro del clip generado
5. Transiciones que retienen, medidas en reels de hostelería
6. Transiciones entre clips generados
7. Implementación en Remotion

---

## 1. Reglas que mandan

1. **Como mucho 2–3 tipos de transición por pieza.** Cuantos más tipos, menos significa cada uno ("demasiados tipos de transición matan el mood", `cinematic/scene-director`).
2. **La transición significa algo:** corte = continuidad; disolvencia = paso del tiempo o parentesco emocional; fundido a negro = cambio de acto; *wipe* = siguiente paso; zoom = más detalle.
3. **El sonido de la transición empieza 10–20 ms antes** que el cambio de imagen; el pico del *whoosh* coincide con el momento de mayor cambio visual.
4. **Nunca `linear` en movimiento** (sí en opacidad o color) → [`03-ritmo-y-gancho.md`](03-ritmo-y-gancho.md) §6.
5. **Corte sobre sonido, no sobre silencio** [COMUNIDAD, pixelab].
6. **Registro del pipeline:** en `documentary-montage` quedan prohibidos *wipes*, *push/slide*, *zoom blur*, RGB split, *light leaks* y *glitch*.

## 2. Catálogo de montaje (OpenMontage)

**`skills/creative/video-stitching.md`:**

| Transición | Duración | Implementación | Uso |
|---|---|---|---|
| Corte seco (`cut`) | 0 ms | Concat (`codec: copy`) | Misma escena, ritmo rápido |
| Encadenado (`crossfade`) | 0,5–1,5 s | `xfade` | Cambio de tema, paso del tiempo |
| Fundido a negro (`fade_black`) | 0,5–1,0 s por lado | Fade out → negro → fade in | Cambio de sección mayor |
| L-cut | 0,3–0,5 s | El audio del clip saliente sigue sobre el entrante | Salida suave de diálogo |
| J-cut | 0,3–0,5 s | El audio del entrante empieza bajo el saliente | Anticipación |

Duración del encadenado según la pieza: menos de 60 s → 0,3–0,5 s; 1–10 min → 0,5–1,0 s; más de 10 min → 1,0–1,5 s.

**`skills/creative/animation-pipeline.md` (grafismo):** corte (mismo tema, otro ángulo); encadenado de 0,5–1,0 s; *wipe/slide* de 0,5–0,8 s (pasos secuenciales); zoom in u out de 0,8–1,2 s (detalle o panorámica); *match cut* instantáneo (misma forma o posición con distinto contenido); *morph* de 1–2 s (antes y después).

**L-cut en documental:** llevar el ambiente del clip saliente 0,5–1,5 s bajo el entrante. Según OpenMontage, "las piezas con L-cuts se sienten un 50 % más coherentes" [COMUNIDAD, sin metodología publicada].

## 3. Árbol de decisión

- Continuidad de acción → corte.
- Mismo tema, otro ángulo → corte + L/J-cut.
- Cambio de tema → encadenado de 0,5–1,0 s.
- Paso del tiempo o cambio de ánimo → encadenado de 1,0–1,5 s.
- Sección mayor → fundido a negro.
- Entre clips generados con buena continuidad → corte o encadenado corto (0,3–0,5 s).
- Entre clips generados con ruptura → fundido a negro de 0,5 s + 0,5 s (esconde el salto).

## 4. Transiciones dentro del clip generado

Transiciones con nombre que entienden los modelos de vídeo actuales. Seedance 2.5 las respeta de forma explícita [OFICIAL ByteDance, vía smixs CC BY 4.0]:

| Transición | Qué hace |
|---|---|
| **natural cut** | Punto de edición sencillo; el modelo elige el cambio de encuadre |
| **fade in / fade out** | Desde o hacia negro |
| **dissolve** | Encadenado de 1–2 s |
| **white flash / black flash** | Destello de un fotograma, puntuación de impacto |
| **wipe** | El plano nuevo empuja al anterior |
| **occlusion mask** | Un objeto en primer plano tapa el objetivo y detrás aparece la escena nueva |
| **match cut** | Una forma o un movimiento parecidos unen dos escenas (luna → café con leche) |
| **action cut / whip pan** | Corte escondido en un movimiento rápido con desenfoque |
| **motion relay** | El sujeto sale del plano A a mitad de un movimiento y aterriza en el plano B continuándolo |
| **zoom-through** | La cámara atraviesa una pupila, una cerradura o una ventana hasta la escena siguiente |

Reglas de uso en el prompt:

- Se nombra la transición y **el momento exacto** en que ocurre. Un tipo de transición por corte.
- Siempre con la cláusula oficial antisalto: ***"prohibit rigid cutting, prohibit objects appearing out of thin air"***.
- Se puede delegar: *"choose the most suitable from [natural cut / occlusion mask / match cut] for the style of this film"*.
- Para efectos que no deben dispararse antes de tiempo, se condicionan a un evento: *"the ink-wash effect must only appear after 25 seconds, triggered by the 'click' sound"*.

**En hostelería funcionan bien:** *action cut* escondido en el gesto rápido (la multitoma de la skill `directoria`), *occlusion mask* con la mano del camarero o una copa que cruza el plano, *match cut* por forma (plato redondo → sartén redonda) y *motion relay* (el plato sale de cocina y entra en sala).

## 5. Transiciones que retienen, medidas en reels de hostelería

Del montaje en After Effects de Torre de Vega (skill `after-effects-reels`, 08/09/2026) [MEDIDO con cliente]:

- **Latigazo de desenfoque direccional** (la de uso general): *Directional Blur* en los 3 primeros fotogramas del plano entrante, `Blur Length 45 → 0` en 0,125 s (3 fotogramas a 24 fps), con la dirección alternando entre 90 y 270 en cada corte para que no se note el patrón. **No en cortes de menos de 0,4 s:** emborrona la ráfaga.
- **Corte de choque en blanco y negro invertido** (interrupción de patrón): se duplica la capa del plano de apertura **continuando el mismo tiempo de origen**, con Black&White + Invert, durante 0,15 s (3–4 fotogramas) y dentro de la ventana del gancho. Es el mismo plano parpadeando en negativo.
- **Ráfaga de microcortes:** 6 planos de unos 0,35 s en los 2 primeros segundos, estilo tráiler; después, el cuerpo respira con planos de 1 s. Sube la señal visual, pero **no movió la puntuación titular** del Virality Predictor (→ [`03-ritmo-y-gancho.md`](03-ritmo-y-gancho.md) §5).
- **Empujar y tirar alternados:** ningún plano queda quieto. Dos fotogramas clave de escala por capa, alternando la dirección en cada corte (116 → 103, 103 → 113, 115 → 102…). Se hace **en montaje**, no se pide al modelo de vídeo.

## 6. Transiciones entre clips generados

- **La descripción del último fotograma del clip N empareja con la del primero del clip N+1** (solapamiento deliberado en el prompt). La transición tapa un cambio de forma, no un cambio de contenido.
- **Encadenar por fotograma:** el último fotograma del clip N es el primero del N+1, **con la acción cruzando el corte a mitad de movimiento**, no en la posición de reposo. Si se encadena en un tiempo ya completado, se sigue leyendo como una parada [COMUNIDAD, OSideMedia].
- **Corte sobre la misma acción:** terminar una escena y empezar la siguiente con el mismo gesto (el golpe en el auricular del ejemplo de OSideMedia; en hostelería, la mano que deja el plato).
- **Relación entre planos escrita en ambos prompts:** si dos planos deben coincidir (velocidad de cámara, luz), se escribe como relación en los dos, porque ningún prompt ve al otro: *"the camera speed of shot 9 equals shot 10, exactly"*.

## 7. Implementación en Remotion

Resumen de la skill oficial `remotion-dev/skills` (`remotion-markup/transitions.md`, commit `41b22ee`, 24/09/2026) [OFICIAL]. Detalle → [`06-remotion-para-society.md`](06-remotion-para-society.md).

- `<TransitionSeries>` con `<TransitionSeries.Sequence>` y `<TransitionSeries.Transition presentation={…} timing={…}>`.
- Presentaciones disponibles: `fade()`, `slide({direction:"from-left"|"from-right"|"from-top"|"from-bottom"})`, `wipe()`, `flip()`, `clockWipe()`.
- Tiempos: `linearTiming({durationInFrames})` o `springTiming({config:{damping:200}})`.
- **Las transiciones acortan la composición** (las dos escenas se solapan): 60 + 60 − 15 = 105 fotogramas. Los **overlays** (`<TransitionSeries.Overlay>`, p. ej. un *light leak*) no la acortan. Un overlay no puede ir junto a una transición ni a otro overlay.
- *Light leak* (`@remotion/effects/light-leak`, Remotion ≥ 4.0.500): `progress` 0 → 1 (aparece y se retira), `seed`, `hueShift` (0 = amarillo-naranja; 120 = verde; 240 = azul). Usa WebGL2 (`Config.setChromiumOpenGlRenderer("angle")`). ⚠️ El *light leak* amarillo-naranja por defecto choca con la regla de luz neutra en comida: si se usa, `hueShift` o con moderación.
