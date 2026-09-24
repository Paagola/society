# 06 · De-slop, fallos conocidos y revisión

Cómo quitar el "aspecto IA" antes de generar y cómo revisar lo generado antes de aprobarlo. Reúne la disciplina *de-slop* de `smixs/visual-skills` (CC BY 4.0, Serge Shima), el catálogo de fallos de Seedance de `OSideMedia/higgsfield-ai-prompt-skill` (MIT) y la biblia heredada ([`../knowledge/05-biblia-hiperrealismo.md`](../knowledge/05-biblia-hiperrealismo.md), [`../knowledge/07-troubleshooting.md`](../knowledge/07-troubleshooting.md)).

## Índice

1. La tendencia del modelo a embellecer
2. Palabras que empujan hacia el render
3. Cadenas causales para manipular objetos
4. Revisión fotograma a fotograma
5. Catálogo de fallos de vídeo
6. Iterar o repetir tiradas
7. Rescatar tomas fallidas

---

## 1. La tendencia del modelo a embellecer [COMUNIDAD, smixs]

Los modelos de imagen tienden a una imagen idealizada: sin ella, la piel pierde poros, las caras ganan simetría, la ropa pierde arrugas y los fondos ganan saturación. En comida y locales se ve así:

| Eje | Hacia dónde tira el modelo | Lo que tiene el local real |
|---|---|---|
| Comida | brillante, uniforme, simétrica | tostado desigual, migas, bordes irregulares |
| Vajilla | nueva, impecable | desgaste, pequeñas marcas de uso |
| Sala | ordenada, saturada, degradados limpios | objetos reales, luz mezclada, una pared con pintura desigual |
| Personas | aspecto de modelo, pose | una persona normal trabajando |
| Extras | añade carteles, flores, velas, texto | exactamente lo que hay |

**Regla de escalado:** cada diferencia con lo que el modelo daría por defecto se escribe **dos veces**: en la descripción, de forma medible, y en una línea de restricción al final (*"PLATE: exactly the chipped white stoneware of @image1"*). Si se dice una sola vez, gana la tendencia del modelo.

**Imperfecciones con ubicación:** una imperfección sin sitio se ignora o se reparte por todo. *"A few crumbs on the board to the right of the loaf"*, no "some crumbs".

## 2. Palabras que empujan hacia el render

Lista negra de la biblia heredada (`knowledge/05` §2) más la de smixs: `4K`, `8K`, `ultra-detailed`, `hyper-detailed`, `ultra-realistic`, `photorealistic render`, `masterpiece`, `best quality`, `sharp focus`, `crisp`, `intricate detail`, `flawless`, `stunning`, `perfect`, `cinematic` a secas, `delicious`, `mouth-watering`.

**Palabras que degradan todo el encuadre** [COMUNIDAD, OSideMedia, sin prueba A/B propia]: `film grain`, `soft focus`, `dreamy`, `hazy` o `blurry background`, puestas al final como petición genérica de realismo, se aplican a toda la imagen y ablandan también el plato. La imperfección va **en el contenido** (una miga, una grieta), no como instrucción de calidad. El grano solo vale como look declarado ("fine sensor grain" dentro del campo `render`).

**Tres verbos que casi siempre salvan un prompt:** `photographed`, `lit by`, `shot on`.

## 3. Cadenas causales para manipular objetos [COMUNIDAD, OSideMedia]

**Fallo "manipulación en el aire":** la mano abre, vierte o corta, pero el objeto no cambia (la mano trabaja sobre una botella que sigue cerrada). Pasa cuando se escribe solo el verbo.

Hay que escribir la cadena en orden:

1. **Estructura inicial:** qué es el objeto antes del contacto ("the bottle is sealed with a cork").
2. **Anclaje:** qué lo sujeta ("the left hand grips the neck").
3. **Fuerza:** dónde se aplica y hacia dónde ("the right hand twists the corkscrew upward").
4. **Respuesta del material:** qué hace el material ("the cork slides out with a soft pop").
5. **Estado final:** qué es cierto al terminar ("the open bottle, cork in hand, rests on the table").

Reglas asociadas:

- Si la manipulación solo sirve para llegar al siguiente estado, es más barato y seguro usar **dos estados y un sonido**: botella cerrada, `<cork pop>` fuera de plano, botella abierta.
- No inventar una estructura que la referencia no muestra: si no se ve el tapón, se corta alrededor o se graba de verdad.
- **Invariantes físicos:** lo que no se mueve se nombra ("the plate stays still on the table; only the sauce moves").
- **Estado final visible:** la acción tiene que terminar dentro del plano ("the glass comes to rest on the wood"). Si no, el corte llega antes del resultado.

## 4. Revisión fotograma a fotograma

Un clip generado no es un rodaje: cada fotograma se genera por separado y puede fallar uno solo. Revisión mínima antes de aprobar:

1. **Técnica automática:** `ffprobe`, `cropdetect` y detección de duplicados (→ [`03-resolucion-y-reescalado.md`](03-resolucion-y-reescalado.md) §5).
2. **Comparación con el keyframe:** temperatura y luminancia (→ [`02-luz-y-color.md`](02-luz-y-color.md) §7).
3. **Paso a paso en el plano héroe:** manos (número de dedos y manos, quién las lleva), recuento de piezas, forma del plato, vajilla y fondo que cambian, texto que aparece.
4. **Continuidad entre tomas:** mismo número de piezas, misma orientación (en el clip del chuletón, el hueso cambió de orientación en la toma 3), mismo fondo (en ese mismo clip pasó de claro a madera oscura) [OBSERVADO].
5. **Filtro Society:** ¿notaría un cliente que entra en el local alguna diferencia con lo que vio?

## 5. Catálogo de fallos de vídeo

| Fallo | Causa | Corrección |
|---|---|---|
| Acción que se deshace | La acción acaba antes que el clip y el modelo rellena el tiempo reproduciéndola al revés | Encadenar 2–3 acciones en la misma dirección, o acortar el clip. Movimiento de cámara con punto final nombrado |
| Acción truncada | El corte llega antes del resultado | Escribir el estado final visible y dejar que asiente; o abrir la toma siguiente con el resultado ya hecho |
| Tercera mano / mano sin dueño | Una mano es lo más pequeño del encuadre que tiene que pertenecer a alguien | Recuento explícito: *"only two hands, same person, same sleeve"*. En grupos, como mucho dos personas con acción de manos |
| Objeto que se inventa | La acción pide algo que no está en el keyframe | Decir que no está y cómo aparece: *"the lemon is not on the board in @Image 1; it enters from the bottom of the frame in the cook's hand"* |
| Objeto vecino que se mueve | El modelo interpreta un movimiento como de dos objetos | Nombrar el invariante: *"the saucer stays on the table; only the cup lifts"* |
| Cámara con tres movimientos a la vez | Demasiados ejes a la vez | Un movimiento dominante; si hacen falta dos, en fases con tiempos o en dos cortes |
| Fallo de geometría (puerta, pasillo, mueble) | El modelo reconstruye el espacio a su manera | Bloque de disposición espacial antes de la acción: dónde está la cámara, qué hay entre medias, dirección del movimiento |
| Andar deslizándose | El modelo anima la apariencia de andar, no la física | *"heel lands first, strict left-right alternation, one foot always on the ground"* |
| Cadencia a saltos | Seedance rellena con fotogramas repetidos | Indicar la cadencia en el texto (*"runs at 24 fps, no frame is repeated"*); si falla en el héroe, regenerar |
| Deriva cálida y oscura | Sesgo del modelo y referencias cálidas | Bloque PRESERVE + asignación positiva del color |
| Rótulos o música no pedidos | El modelo los añade por defecto | Seedance 2.5: *"Pure video, no subtitles, no background music"*, repetido al final |
| Una sola toma cuando se pedía montaje | El modelo no entiende que haya cortes | *"This must be a multi-shot sequence with visible hard cuts"*, más `Shot N` / `Cut to` |
| Montaje cuando se pedía una sola toma | Seedance 2.5 tiende a cortar por su cuenta | *"One continuous shot, no cuts of any kind"* y una ruta de cámara que no justifique cortes; si sigue fallando, clips de 10–15 s |

## 6. Iterar o repetir tiradas [COMUNIDAD, OSideMedia]

Antes de tocar el prompt, se decide qué tipo de fallo es:

- **Fallo sistemático:** falla siempre igual. El prompt está mal: se cambia **una sola variable por regeneración**.
- **Fallo aleatorio:** unas tomas salen bien y otras no. El prompt está bien: se fija y se lanzan varias tiradas iguales, y se elige la mejor con criterios escritos antes.

Referencia de producción: la película de 90 minutos del equipo de Higgsfield ("Hell Grind", mayo de 2026) aceptó alrededor del **1 % de las imágenes y el 1,5 % de los vídeos** generados. Es una sola fuente y un listón de cine, no de un reel de restaurante, pero enseña que **iterar es el trabajo, no un fallo**. Hay que presupuestarlo (skill `higgsfield`, factores de reintento).

## 7. Rescatar tomas fallidas

Una toma "fallida" rara vez falla en todos sus segundos. Antes de descartarla, se marca el tramo útil (1–3 s limpios) y se guarda como recurso para montaje. La película de Higgsfield montó metraje importante solo con rescates.

Organización recomendada del material: carpetas `TESTS`, `FINAL KEYFRAMES`, `FINAL GENERATIONS` y `FAILED GENERATIONS` (los descartes se guardan a propósito: saber qué no funcionó es parte del aprendizaje).
