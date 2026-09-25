---
name: director
description: 'Director de la pieza completa y orquestador de las skills de producción de Society (marketing-hosteleria, directoria, higgsfield, openmontage): del brief a los conceptos, la lista de planos, las puertas A-E y el montaje, para que un reel de hostelería sea profesional y no aburrido. Aporta dramaturgia (fórmula de escena, ley del detalle, anclajes, arcos, patrones), vocabulario de cámara, óptica, luz y sonido (5 aspectos, ángulos, movimientos, controles de Higgsfield), movimiento con motivo (regla de Fincher, recorridos con números, restraint, planos largos), la lista de planos como contrato (prefijo, glosario, ficha, densidad, tempo, auditoría de monotonía) y estructuras de reel probadas, con lo medido (qué movimientos deforman la comida, gancho abierto, acumulación). Actívala al planificar un reel de principio a fin, escribir guion de planos o storyboard, elegir ángulo o movimiento, proponer conceptos, o si se pide "más creativo", "que no aburra" o "más profesional". Coordina, no escribe prompts ni monta.'
license: 'Contenido propio + adaptaciones de fuentes MIT y CC BY 4.0 (ver "Fuentes")'
metadata:
  author: victor-society
  version: "2.1.0"
---

# Director

> **Regla cero, obligatoria antes de cualquier otra:** todo lo que se produzca tiene que parecer rodado, no generado. Lee y aplica [`../README.md`](../README.md) (firma de rodaje real: material real primero, plano de foco con nombre, luz con fuente, cámara y física con peso, un verbo de manos por plano, corte seco, sonido obligatorio y revisión con `medir_realismo.py`). Detalle: `directoria/references/hosteleria/08-firma-de-rodaje-real.md`.

La skill que **decide la pieza** y **coordina** a las demás. Convierte un brief en conceptos, los conceptos en una lista de planos que funciona como contrato, y lleva cada plano por `directoria` → `higgsfield` → `openmontage` con puertas de aprobación en los puntos donde un error cuesta dinero.

> **El error que existe para evitar:** una pieza donde cada plano es fotorrealista y está bien iluminado, pero el conjunto aburre: todos los planos con el mismo tamaño, el mismo movimiento y la misma duración, sin una razón para seguir mirando ni para reenviarla. **Un plano bonito sin dramaturgia es papel pintado.** Y en hostelería hay un segundo error: pedir al modelo movimientos de cámara que recorren la comida y la deforman. El movimiento amplio se hace en montaje.

## Principios

1. **Primero la historia, luego el plano:** fórmula de escena, cinco anclajes y un arco que encaje con el brief (novedad con fecha → final abierto; proceso → cadena causal; plato estrella → momento culminante). → `references/01`
2. **Cada plano hace un trabajo** (emoción, acción o presión) y lleva **tres detalles físicos** (presión del entorno, microacción, sonido o motivo). Si no, se elimina. → `references/01` §2–3
3. **Lenguaje preciso:** tamaño, ángulo, movimiento, óptica y luz con nombre; nada de "cinematic". → `references/02`
4. **La cámara se mueve por un motivo**, con un movimiento dominante, recorrido y tiempo en números y un punto final. En comida: recorrido pequeño sobre el plato; en planos de proceso, cámara en mano que acompaña el gesto; nada de recorridos macro sobre comida blanda. → `references/03`, `references/02` §10
5. **El fotograma 1 ya tiene acción y rótulo**, abre ancho, y el momento que justifica la pieza va al principio. → `references/06` §5
6. **Variedad real:** 3+ tamaños de plano, ninguna racha de 3 cortes iguales en tamaño y movimiento, duraciones escalonadas. → `references/06` §3
7. **Nada inventado y material real primero:** todo sale del inventario real del local. Para planos de manos, fuego o proceso se **pide** una sesión corta con el móvil antes de generar (`directoria/references/hosteleria/08` §13).
8. **Firma de rodaje real** [MEDIDO 25/09/2026]: plano de foco fino, luz con fuente y contraste, cámara con peso, física con desenfoque de movimiento, un verbo de manos por plano, un solo mundo visual. → `directoria/references/hosteleria/08`
9. **Pregunta de control:** *¿alguien del barrio le reenviaría esto a otra persona?* Si no, se replantea antes de gastar.

## Flujo con puertas

### 1 · Brief
Llega de `marketing-hosteleria` (objetivo, situación de consumo, motivo de envío, hipótesis, métrica, etiqueta de IA). Sin brief completo no se empieza.

### 2 · Inventario de verdad
Fotos y metraje reales del plato y del local, personas con permiso, reglas numeradas del cliente (si dos chocan, manda la más reciente y concreta, y se enumeran en la puerta A). Metraje real de fuego o brasa → no se genera.

### 3 · Conceptos → **PUERTA A**
2–3 conceptos con **arcos o mecanismos distintos** (no variaciones de estilo), cada uno con sus cinco anclajes, la estructura de partida (`references/07`) y el coste estimado (`higgsfield`). Si hay reel de referencia: análisis en 5 aspectos por plano (`openmontage`, `references/07`). Se recomienda uno con su motivo.

### 4 · Lista de planos → **PUERTA B**
Prefijo de estilo global, glosario de recursos con grado de fidelidad y una ficha completa por plano (función, encuadre, cámara con recorrido y motivo, acción física, duración, material real o generado, modelo previsto, rótulo). Presupuesto de tempo que suma exacto. Checklist completo de `references/06`. → `references/04`

### 5 · Keyframes → **PUERTA C**
Por cada plano generado, `directoria` escribe el prompt de imagen (textura, luz, escala, recuento) y `higgsfield` lo ejecuta. Hoja de contactos completa antes de animar nada.

### 6 · Clips → **PUERTA D**
`directoria` escribe el prompt de vídeo (bloques PRESERVE + movimiento de esta lista) y `higgsfield` lo ejecuta. Revisión técnica y fotograma a fotograma. Multitoma de Seedance 2.5 con ventanas de 3 s o más por toma.

### 7 · Montaje → **PUERTA E**
`openmontage` monta con la lista: gancho, escalera de ritmo, corte seco, rótulos, **sonido obligatorio**, grade y grano comunes, auditoría antislideshow y `scripts/medir_realismo.py`.

### 8 · Publicar, medir y aprender
`marketing-hosteleria` publica y mide. Los aprendizajes se **proponen**; entran en las reglas solo con aprobación y con fecha. → `references/05`

## Formato de lo que presentas

- Conversación en español; prompts y términos de cámara en inglés.
- **Puerta A:** conceptos en tabla (arco, mecanismo, anclajes, coste, riesgo) + recomendación.
- **Puerta B:** tabla *Tiempo · Plano · Función · Acción · Cámara · Luz · Sonido · Emoción · Material · Rótulo* + respuesta a la pregunta de control.
- Decisiones pendientes y conflictos de reglas, al final y numerados.
- Lo no verificado se marca; lo medido se distingue de la opinión.

## Mapa de referencias

| Archivo | Cuándo leerlo |
|---|---|
| [`references/01-dramaturgia.md`](references/01-dramaturgia.md) | Pensar la pieza: fórmula de escena, detalle, tres trabajos, anclajes, arcos, patrones, entorno, bloqueo, geografía |
| [`references/02-vocabulario-camara-y-luz.md`](references/02-vocabulario-camara-y-luz.md) | Escribir un plano: 5 aspectos, tamaños, ángulos, movimientos, óptica, luz, color, sonido y qué funciona en comida |
| [`references/03-movimiento-con-motivo.md`](references/03-movimiento-con-motivo.md) | Decidir si la cámara se mueve, cuánto y cómo; restraint; planos largos; copiar un movimiento real |
| [`references/04-lista-de-planos.md`](references/04-lista-de-planos.md) | Construir la lista: prefijo, glosario, ficha, densidad, tempo, continuidad, formato |
| [`references/05-orquestacion.md`](references/05-orquestacion.md) | Qué skill hace qué, las puertas A–E, qué viaja entre etapas, atajos, iteración |
| [`references/06-checklist-profesional.md`](references/06-checklist-profesional.md) | Revisión antes de la puerta B |
| [`references/07-estructuras-de-reel-hosteleria.md`](references/07-estructuras-de-reel-hosteleria.md) | Puntos de partida para los conceptos |

## Fuentes

- **`smixs/visual-skills`** (commit `92be33a`, 16/09/2026), Serge Shima, **CC BY 4.0**: `dramaturgy.md`, `universal-rules.md`, `camera-lighting-vocabulary.md`, `patterns-and-genres.md`, `fixes-and-skeletons.md`, `seedance-25.md`. Adaptado y traducido.
- **`OSideMedia/higgsfield-ai-prompt-skill`** (v3.35, 22/08/2026), **MIT**: `higgsfield-camera` (controles con nombre, cámara y emoción, óptica por propósito, duraciones, microrrecorridos, referencias de vídeo), `higgsfield-shotlist-director` (prefijo, glosario, densidad, tempo, monotonía, fuera de plano), `FAILURE-MODES.md`.
- **`ai9app/AI-Cinematic-Prompt-Director`** (MIT): diccionario de 50 movimientos, 50 encuadres, 50 luces y 50 efectos (su formato de prompt en lista de etiquetas se descarta).
- **Base DirectorIA** (`directoria/references/knowledge/06`, `09`, `10`, `11`).
- **Mediciones propias:** skill `after-effects-reels` (08/09/2026: movimiento en montaje, gancho abierto, acumulación, persona); análisis de 90 días de Torre de Vega; aprendizajes del chuletón (15/09/2026) y del 24/09/2026; prompt `prompts/openmontage-reel-torre-de-vega.md` (puertas A–E, reglas de cámara).
- **OpenMontage** (taxonomía de 5 aspectos, analista de referencias).
