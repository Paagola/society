<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Investigación — Cómo pasar de "vídeo IA que necesita mucha iteración" a "vídeo de agencia profesional"

**Fecha:** 2026-09-10
**Motivo:** el flujo descrito en [`idea.md`](archivo/idea.md) y validado en la práctica en
[`caso-practico-01-torre-de-vega.md`](caso-practico-01-torre-de-vega.md) funciona a nivel de proceso,
pero el resultado visual todavía no llega al nivel de una agencia de marketing profesional pese a mucha
iteración. Este documento investiga **por qué** y qué técnicas/arquitecturas existen hoy para cerrar
ese hueco, de cara a diseñar Society.

**Nota de alcance (regla del TFG):** este documento es investigación y recomendación de arquitectura,
no código. No propone implementación — eso le corresponde a Víctor, según la filosofía del proyecto en
[`README.md`](README.md).

---

## 1. Diagnóstico — por qué la iteración actual no basta

El propio proyecto Torre de Vega ya ha medido, con datos reales (no intuición), **dónde falla** el
enfoque actual de "un prompt de texto → un modelo de vídeo → esperar que salga bien":

| Síntoma medido en Torre de Vega | Causa raíz |
|---|---|
| La comida "se rehace" entre fotogramas al mover la cámara (pulpo, manos, copa) | El modelo de vídeo **regenera contenido orgánico** en cada fotograma nuevo; no hay geometría 3D real subyacente que ancle la forma |
| Fuego/brasa/humo generado se ve "muy falso" | El modelo **promedia y ordena** texturas caóticas (llama uniforme, brasa homogénea) |
| Luz "amarilla de IA" o aspecto "HDR de inmobiliaria" | La luz se describe en texto dentro del mismo prompt que genera el contenido — no hay control independiente de iluminación |
| Cámara "perfectamente fija" se lee como foto animada; pedir "handheld" se lee como amateur | El movimiento de cámara se pide **en lenguaje natural**, un canal muy impreciso, en vez de con un control paramétrico real |
| El montaje no mueve las métricas de viralidad (medido: overall 40 en el corte plano y en el montaje completo) | El techo está en el **material generado**, no en la edición — coherente con la literatura: falta *consistencia temporal* de base |

Esto coincide con el diagnóstico de la industria en 2026: la generación de vídeo por difusión de texto a
vídeo sigue teniendo el mismo cuello de botella estructural — cada segmento de vídeo se genera "a
ciegas" prediciendo píxeles futuros sin una escena 3D ni una trayectoria de cámara real detrás, así que
cualquier movimiento no trivial (revelar algo que no estaba en el fotograma de partida) obliga al modelo
a **inventar**, y lo orgánico (comida, fuego, agua) es justo lo que peor tolera esa invención frame a
frame.

La consecuencia de diseño es la misma que ya escribió el propio proyecto en `documentación.md` Parte II:
**"la pregunta no es si el plano se mueve, es si el movimiento revela información que no está en el
fotograma de partida"**. Este documento generaliza esa intuición en una arquitectura completa.

---

## 2. La idea central: separar "verdad física" de "invención generativa"

Las agencias/estudios que en 2026 consiguen resultados de nivel profesional con IA no usan la IA de
generación de vídeo como una caja negra de principio a fin. La usan como **una capa más** dentro de un
pipeline híbrido donde:

- **Lo que puede ser real, es real** (geometría del local, movimiento de cámara, física del fuego/agua,
  producto exacto).
- **La IA solo genera lo que de verdad hace falta inventar o adaptar** (una escena que no se puede
  grabar, una variante de plato, una persona genérica, una ambientación).
- Hay **capas independientes y editables** (geometría → movimiento → iluminación → grado de color) en vez
  de un único prompt monolítico que intenta resolverlo todo a la vez y que hay que regenerar entero si
  falla una sola cosa.

Esto es exactamente la distinción que Torre de Vega ya descubrió a mano con la regla 22
("si existe material real de una textura caótica, NO se genera") y con la regla 10 de `reglas_videos.md`
("los fotogramas de la plantilla son referencia de generación, no solo de análisis"). La propuesta de
este documento es **llevar ese principio hasta el final** y convertirlo en la arquitectura de Society,
no solo en una regla de contenido puntual.

A continuación, las cinco piezas técnicas que hacen esa separación posible hoy.

### 2.1 Escaneo 3D del propio local (Gaussian Splatting / NeRF) como fuente de "geometría verdadera"

`idea.md` §7 ya deja como decisión pendiente "hasta qué punto conviene automatizar el mapeo 3D". La
investigación confirma que **es la pieza que más directamente ataca el problema medido**: la razón por
la que la escena "Sala" del Reel 01 fue "la más creíble" de las seis (regla 4 de `documentación.md`
Parte II) es que la arquitectura es rígida y tolera bien el movimiento de cámara generado; la comida, no.

Un escaneo 3D real del comedor, la barra, la bodega y las mesas (con **Gaussian Splatting**, capturable
hoy con el móvil — apps como Luma AI 3D Capture funcionan desde un iPhone 11 en adelante, sin LiDAR)
convierte esa intuición en infraestructura:

- Se **renderiza una cámara virtual moviéndose por la geometría real** del local (paneo, dolly, órbita,
  parallax) sin que nada se "reinvente" fotograma a fotograma, porque no es generación: es render de una
  reconstrucción real.
- Ese render puede usarse como **plano de fondo/ambientación** sobre el que luego se compone el plato (
  generado o real) en primer plano, en vez de pedirle a un modelo de vídeo generativo que anime toda la
  escena (sala + plato) a la vez.
- Resuelve de raíz la Fase 1 de `idea.md` ("onboarding del local") con una garantía de fidelidad que el
  vídeo de referencia actual no puede dar: la geometría es literalmente la del local, no una
  aproximación aprendida de fotos.

**Limitación honesta:** el splat reconstruye bien superficies estáticas y rígidas (sala, mobiliario,
arquitectura); no resuelve el plato en sí, que sigue siendo el elemento vivo/orgánico. Por eso esta
pieza ataca las escenas de "sala"/"ambiente" (que ya funcionaban razonablemente) y libera presupuesto de
iteración para las escenas de comida, que son las que de verdad lo necesitan.

> **Actualización 2026-09-10 — decisión de arquitectura tomada.** Esta sección se escribió pensando en
> apps de escaneo de consumo (Luma AI). Tras discutirlo, la decisión es **no depender de ninguna app
> externa de escaneo**: la captura se hace dentro de la propia app de Society (grabar vídeo con el
> móvil, sin más), y la reconstrucción 3D se resuelve con repos open-source integrados en el propio
> backend, encadenados con Blender y Genjutsu. El pipeline completo, con nombres de repo concretos y la
> arquitectura de renderizado con varios trabajos a la vez, está desarrollado en la
> [sección 9](#9-arquitectura-final-de-escaneo-3d-propio--blender--genjutsu-decidida-el-2026-09-10).

### 2.2 Movimiento de cámara real, transferido — no descrito en texto

El hallazgo más caro de Torre de Vega (regla 9 y regla 11 de `reglas_videos.md`) fue que describir el
movimiento de cámara en prosa da resultados o bien congelados ("static camera" a secas) o bien
temblorosos y amateur ("micro-movimiento de móvil en mano"), y que hace falta *diseñar* el movimiento
como un profesional (push-in, pull-back reveal, rack focus...). Ahora mismo esa "profesionalidad" recae
enteramente en la habilidad de quien escribe el prompt, cada vez, sin garantía.

La industria ya tiene una solución más fiable que el texto para esto, en dos variantes:

1. **Grabar una sola vez el movimiento profesional real** con un slider/gimbal barato (push-in del 15 %
   a velocidad constante, por ejemplo) y usar herramientas de **motion/camera control** (Kling Motion
   Control, Runway Act-Two) que transfieren esa trayectoria de cámara real a la generación nueva, en vez
   de que el modelo la interprete de un adjetivo. La cámara ya no se describe: **se copia de un vídeo de
   referencia**, exactamente igual que ya se hace con el contenido (regla 10) pero aplicado al
   movimiento en vez de al encuadre estático.
2. **Condicionamiento paramétrico de cámara en el propio modelo de difusión** (la línea de investigación
   *CameraCtrl*, que codifica la trayectoria de cámara como *Plücker embeddings* en vez de como texto).
   Es la base técnica de por qué algunos modelos comerciales ya aceptan trayectorias de cámara como
   parámetro estructurado y no solo como prompt — un criterio útil para **evaluar modelos nuevos**: un
   modelo con control de cámara paramétrico (no solo textual) es preferible para este proyecto.

Consecuencia práctica para Society: en vez de que cada escena "reinvente" cómo describir su movimiento,
el sistema puede mantener una **librería de movimientos de cámara ya grabados/definidos con
parámetros** (push-in 15 %, pull-back reveal, rack focus, orbit corto — los mismos seis de la regla 9,
ya catalogados) y aplicarlos por transferencia/condicionamiento en vez de por descripción libre cada
vez. Esto convierte un problema de "arte/redacción" en un problema de "selección de un asset ya
validado", que es mucho más repetible y es, además, la clase de trabajo de ingeniería que sí encaja con
el alcance de un TFG.

### 2.3 La iluminación como capa independiente, no como parte del mismo prompt de contenido

Torre de Vega ya sabe (regla 4, regla 9ter, regla 17) que la luz hay que describirla en texto con mucho
cuidado (K, tipo de fuente, "acabado de iPhone" vs "editorial dramático" — la regla 17 pasó del primero
al segundo el 2026-09-10) y que un solo matiz mal calibrado
("2800K sin corregir") tira todo el lote a "amarillo de IA". Ese enfoque funciona, pero es fràgil: la
misma llamada que genera el contenido tiene que acertar también la luz, y si falla la luz hay que
regenerar el contenido entero.

Existe una alternativa madura: **modelos de relighting especializados** (la familia *IC-Light* es el
ejemplo de referencia, con variante *condicionada por texto* y variante *condicionada por fondo*) que
separan el problema en dos pasos:

1. Generar/fotografiar el sujeto (el plato, la mesa) con calidad de detalle, sin preocuparse tanto de
   que la luz sea perfecta a la primera.
2. **Re-iluminar ese resultado ya generado** como un paso posterior e independiente, probando varias
   direcciones/temperaturas de luz sobre el mismo contenido sin tener que regenerar el plato desde cero.

Esto es exactamente el patrón que ya funciona en la regla 27 de `reglas_imagenes.md` ("reencadenar con
un solo cambio" en vez de regenerar desde cero) pero aplicado específicamente a la luz en vez de a un
defecto puntual. Para Society, significa diseñar el pipeline de imagen con una **etapa de relighting
desacoplada** de la etapa de generación de contenido, en vez de un único prompt JSON que intenta acertar
composición + iluminación + estilo a la vez.

### 2.4 Compositing con seguimiento automático — la solución real para fuego, brasa y elementos caóticos

La regla 22 de Torre de Vega ("si existe material real de una textura caótica, no se genera; se extrae
el fotograma") es correcta pero manual y limitada a fotogramas sueltos del vídeo del cliente. La
industria de VFX ya automatizó esta idea a nivel de **vídeo completo**: herramientas de compositing
IA (la referencia es *Wonder Studio*) hacen automáticamente, sobre metraje real:

- Tracking del movimiento de cámara y de los objetos/personas del plano real, sin marcadores.
- Inserción de un elemento generado/CG en ese plano, con **iluminación automáticamente ajustada** a la
  del entorno real (relighting automático del elemento insertado, no del plano entero).
- Composición final coherente en cámara, luz y sombra entre lo real y lo insertado.

Aplicado a Torre de Vega: en vez de generar un vídeo entero de "manos sirviendo el plato" y aceptar que
la comida se deforme, se puede **grabar la acción real** (mano + mesa, con cámara real o generada en un
segundo plano) y **componer solo el plato** (generado o fotografiado aparte) con seguimiento automático,
en vez de pedirle a un único modelo de vídeo que resuelva manos + comida + cámara a la vez, que es
justamente donde se acumulan los tres tipos de fallo medidos (regla 6, regla 11 y regla 15 de
`documentación.md`).

Esta pieza es la que mejor generaliza la lección de la regla 22 (fuego/brasa) a **cualquier** elemento
difícil de generar de forma consistente: no es "una regla especial para el fuego", es la misma técnica
aplicable siempre que un elemento del plano sea mejor grabarlo real y solo se necesite generar/insertar
otra cosa encima (un rótulo, un plato, una persona genérica).

### 2.5 Vídeo-a-vídeo (restyle) sobre metraje propio, en vez de generación desde cero

Una cuarta vía, más simple de adoptar, es no generar vídeo desde texto en absoluto para los planos donde
el cliente puede grabar barato con el móvil (sala, mesa, movimiento de manos reales, humo real, líquido
real): **grabar el plano real** y usar un modelo de **vídeo-a-vídeo con referencia** (la línea de
Runway Gen-4 restyle es el ejemplo consolidado) para ajustar solo lo que hace falta — relighting, grado
de color, pequeños cambios de decorado o vestuario — **preservando el movimiento y la física reales del
vídeo de origen**.

Esto es coherente con lo que ya reportan las propias agencias/estudios en 2026: el patrón dominante no
es "todo generado" ni "todo grabado", es *rellenar con IA los huecos alrededor de metraje ya grabado*
(un producto real, una demo real, un fundador real hablando) en vez de generar la pieza entera desde una
frase. Para un restaurante con 50 años de historia y clientela fiel — donde la promesa de marca es
"lo que ves en Instagram es exactamente lo que hay en el local" — este enfoque encaja mejor con el
objetivo de negocio que la generación pura: **cuanto más del vídeo final sea metraje real, más barata y
más automática es la garantía de fidelidad** que hoy Society tiene que reconstruir a mano con reglas de
continuidad (regla 1) y verificación de referencias (regla 14).

---

## 3. Consistencia entre tomas: lo que ya se hace bien y por qué funciona

Dos técnicas que Torre de Vega ya adoptó de forma empírica (por prueba y error con el cliente) tienen
respaldo directo en la investigación, y merece la pena mantenerlas como **estándar de arquitectura**, no
como parche puntual:

- **Anclaje por `start_image` + `end_image` (regla 16 de `reglas_videos.md`).** La literatura lo
  confirma como la técnica estándar para evitar la "deriva" (*drift*) de un modelo que solo recibe un
  fotograma de partida: con dos anclas, el modelo no tiene que "adivinar" hacia dónde va la escena, solo
  interpolar entre dos puntos conocidos. Es la razón técnica de por qué el "corte a los planos fijos" deja
  de saltar. Recomendación: convertir esto en regla dura de arquitectura para **todo** plano de cámara
  fija, no solo para el formato "mismo plano cambia el plato" (regla 14).
- **Encadenar imágenes ya generadas como referencia de la siguiente (regla 19 de `reglas_imagenes.md`).**
  Es el mismo principio de anclaje aplicado a una serie de imágenes fijas en vez de a un solo vídeo, y
  es coherente con cómo los modelos de imagen con referencia (nano_banana_pro y equivalentes) evitan que
  "dos generaciones con el mismo texto den dos mesas distintas".

La generalización de ambas para Society: **ninguna escena de una serie debería generarse "desde cero" a
partir de solo texto** si ya existe una escena anterior de la misma serie — el sistema debe forzar
encadenamiento de referencias como comportamiento por defecto, no como algo que haya que acordarse de
pedir.

---

## 4. La post-producción no es cosmética: es donde se cierra el hueco final

Un hallazgo de la investigación que **no** estaba explícito en la documentación actual de Torre de
Vega: incluso con un prompt perfecto, la salida cruda de un modelo de vídeo generativo tiene un sesgo
estructural hacia lo "demasiado nítido, demasiado contrastado, piel/superficie plástica" — es sabido en
la industria que este es precisamente el motivo por el que el ojo humano detecta contenido IA incluso
cuando el contenido en sí es correcto. La receta que usan los estudios que sí llegan a nivel
profesional, en orden, es:

1. **Upscale** (recupera detalle real en vez de artefactos del generador).
2. **Blur muy sutil + grano fino** (contrarresta la nitidez excesiva y devuelve textura). *Cuando se
   escribió esto, la regla 17 prohibía el grano; desde el 2026-09-10 lo **exige** («grano de película
   visible, sutil pero real»), así que este paso pasa de tolerado a obligatorio.*
3. **Grado de color aplicado a intensidad reducida** (50-70 %, nunca al 100 %, porque un LUT diseñado
   para metraje de cámara real "log" sobre-satura si se aplica entero a un clip IA que ya sale saturado
   de fábrica).

> **Actualización 2026-09-14.** Esta sección se escribió contra la versión de la regla 17 del
> 2026-09-08 (acabado de iPhone, sin grano ni grade). El cliente la invirtió el 2026-09-10 a **editorial
> dramático** (una sola fuente dura y cálida ~3000-3300K, sombras casi negras, contraste alto, grano
> visible). El argumento de fondo se mantiene y sale reforzado: el aspecto final es ahora *más*
> dependiente del grade de montaje. Primer caso real: la tarea MD-3 del
> [Reel 08](base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_08_volvemos_miercoles_16.md), un
> grade en After Effects para acercar clips de iPhone al look vigente — con el límite explícito de que un
> grade **no puede crear** una luz dura de una sola fuente que no está en el clip.

Esto **no contradice la regla 17**: al contrario, la afina. La regla 17 dice qué *aspecto final* se
quiere; esta sección dice **por qué
pasos técnicos hay que pasar en montaje** para que la salida cruda del modelo (que sale con sesgo
"plástico/HDR" de fábrica, coherente con la regla 9quinquies ya documentada) llegue a ese aspecto en vez
de quedarse a medio camino. Es una capa de montaje en After Effects que hoy no está descrita como paso
sistemático en la skill `after-effects-reels`, y que puede ser precisamente el último 20 % de "por qué
no queda profesional" que la iteración de prompt por sí sola no puede arreglar, porque el problema no
está en el prompt: está en qué se hace *después* de generar.

---

## 5. QA automatizado del "aspecto IA" — de contact sheets manuales a puntuación por modelo de visión

La regla 8 de `documentación.md` (contact sheet de 3 fotogramas por clip, revisión visual manual) es el
método correcto pero no escala ni es objetivo — depende de que alguien mire con atención. La
investigación confirma que esto ya es un campo activo: existen pipelines de control de calidad que usan
un modelo de visión-lenguaje (el patrón habitual es GPT-4o o equivalente) para **puntuar automáticamente
artefactos** de un vídeo generado — parpadeo de textura, un objeto que cambia de forma entre
fotogramas, iluminación que salta de un fotograma a otro — antes de que un humano lo revise.

Para Society esto sugiere una fase adicional, barata de justificar en un TFG porque es la que más
diferencia "un script que llama a una API" de "un producto con criterio incorporado":

- Generar el contact sheet automáticamente (ya se hace con `ffmpeg` en el proyecto actual).
- Pasarlo por un modelo de visión con un prompt de auditoría específico (equivalente a la tabla que ya
  se usa a mano en la regla 8: "¿se reorganiza la comida entre fotogramas? ¿hay morphing? ¿es creíble?").
- Usar esa puntuación como **filtro previo a mostrárselo al cliente**, no como sustituto del visto bueno
  humano (que sigue siendo obligatorio por la regla 1 del flujo de Reels) — es una segunda capa de
  criterio automático antes de gastar el tiempo de aprobación del cliente en algo que ya se sabe que va
  a fallar.

---

## 6. Cómo encaja esto en la elección de modelo ya medida en `documentación.md`

La tabla de modelos de Torre de Vega (§5 de `documentación.md`) ya refleja, sin saberlo explícitamente,
varias de las conclusiones de esta investigación:

- **`seedance_2_0` se valida precisamente porque el catálogo lo describe como *reference-driven,
  consistent identity*** — es decir, porque su arquitectura está pensada para no dejar que el "sujeto"
  cambie entre fotogramas, que es justo el problema de fondo de la sección 1. La investigación confirma
  que "consistencia de personaje/producto" es hoy un eje de comparación explícito entre modelos
  (Seedance 2.0 y Kling 3 se disputan ese punto en las comparativas de 2026), así que seguir midiendo
  modelos nuevos por ese criterio (no solo por precio o resolución) es correcto.
- **`minimax_hailuo` se prohibió (regla 15) precisamente por ignorar el bloque CAMERA** — coincide con
  el hallazgo de que un modelo sin control de cámara paramétrico real (solo interpretación de texto) es
  el que menos fiabilidad da, y confirma que "verificar que el modelo respeta la cámara bloqueada" debe
  ser un criterio de evaluación explícito para cualquier modelo nuevo que se pruebe.
- **Herramientas de transferencia de movimiento (Kling Motion Control, Runway Act-Two)**, no exploradas
  todavía en el proyecto, son candidatas directas para atacar la sección 2.2 de este documento (cámara
  profesional real transferida en vez de descrita) y merecen una prueba dedicada antes de asumir que el
  prompt de texto es el techo de lo que se puede conseguir con el movimiento de cámara.

---

## 7. Arquitectura recomendada para Society (diseño, no implementación)

Traduciendo todo lo anterior a fases sobre las ya descritas en `idea.md`:

| Fase de `idea.md` | Qué añadir según esta investigación |
|---|---|
| **Fase 1 — Onboarding del local** | Añadir un **escaneo 3D (Gaussian Splatting) del local**, no solo vídeo/fotos planas — es la pieza que da geometría real reutilizable como fondo/cámara virtual para cualquier Reel futuro, y es la mejor respuesta a la "decisión pendiente" que `idea.md` §7 ya deja abierta. |
| **Fase 2 — Catálogo de producto** | Mantener el banco de fotos reales, pero separar explícitamente "elementos caóticos que nunca se generan" (fuego, brasa, líquido en movimiento — regla 22) de "elementos ordenados que sí se generan bien" (plato servido, mesa, persona con uniforme), como ya intuye la propia regla 22. |
| **Fase 4 — Análisis del Reel de referencia** | Añadir extracción de la **trayectoria de cámara** del vídeo de referencia (no solo el desglose de escenas), como input a una librería propia de movimientos de cámara transferibles (sección 2.2), en vez de traducir el movimiento a un adjetivo de prompt cada vez. |
| **Fase 7 — Imágenes de plantilla** | Separar en dos subpasos: **(a)** generación/composición del sujeto, **(b)** relighting como paso independiente y editable sin regenerar el sujeto (sección 2.3). |
| **Fase 8 — Producción del vídeo final** | Decidir, escena por escena, cuál de las cinco vías de la sección 2 aplica (splat 3D, motion transfer, compositing con tracking, vídeo-a-vídeo sobre metraje real, o generación de vídeo pura como último recurso) — **en ese orden de preferencia**, porque cada vía anterior depende menos de la "invención" del modelo que la siguiente. Añadir una etapa de post-producción sistemática (sección 4) y de QA automatizado del aspecto IA (sección 5) antes de la aprobación del cliente. |

El principio de diseño que resume todo el documento, para que quede como criterio permanente de
Society: **generar de texto a vídeo es el último recurso, no el primero.** Cuanto más se pueda anclar
un plano a algo real (geometría escaneada, movimiento grabado, metraje propio), menos tiene que
inventar el modelo, y menos iteración hace falta para llegar a un resultado que un cliente de 50 años de
trayectoria reconozca como su propio local.

---

## 8. Qué probar primero (orden sugerido, no vinculante)

1. **Post-producción sistemática** (sección 4) sobre clips ya generados y aprobados — es la más barata
   de validar (no requiere nuevas herramientas, solo un paso de montaje) y puede explicar una parte
   del hueco de "no profesional" sin tocar nada del proceso de generación.
2. **Anclaje `start_image`+`end_image` como estándar, no excepción** (sección 3) — ya está validado en
   un caso, generalizarlo cuesta cero herramientas nuevas.
3. **Prueba dirigida de motion control/transferencia de cámara** (Kling Motion Control o Runway Act-Two)
   sobre un plano ya fallido por movimiento de cámara mal descrito, comparando contra el resultado
   actual — barato de probar, alto potencial si confirma la hipótesis de la sección 2.2.
4. **Piloto de escaneo 3D del local** con Luma AI (gratis/barato, solo requiere un iPhone) para validar
   si el render de cámara virtual sobre geometría real da un resultado mejor que el vídeo generado en al
   menos una escena de "sala".
5. **Relighting desacoplado** (IC-Light o equivalente) como experimento sobre una imagen ya generada y
   aprobada, para ver si resuelve casos de luz fallida sin tener que regenerar el contenido.
6. **Compositing con tracking** (línea Wonder Studio) — el más costoso de adoptar operativamente, dejarlo
   para cuando las cuatro anteriores ya estén validadas o descartadas.

---

## 9. Arquitectura final de escaneo 3D propio + Blender + Genjutsu (decidida el 2026-09-10)

Esta sección documenta la conversación en la que se cerró la arquitectura concreta para la Fase 1 de
`idea.md` (onboarding del local) y la Fase 8 (producción del vídeo final), sustituyendo la idea inicial
de apps de escaneo de consumo por un pipeline integrado enteramente en la propia app de Society.

### 9.1 La idea de partida de Víctor, y por qué es acertada

Propuesta original: el cliente escanea el local **entero** una vez; cuando se quiere un Reel nuevo, se
analiza la plantilla de referencia para sacar el listado de planos/movimientos de cámara, se reconstruyen
esos mismos planos **dentro del modelo 3D del local** en Blender, se renderiza, y ese render se pasa por
Genjutsu para convertirlo en la pieza final fotorrealista.

Es acertada porque ataca directamente la causa raíz de la sección 1 de este documento: el movimiento de
cámara deja de describirse en texto (canal impreciso) y pasa a ejecutarse sobre geometría real del local
(canal exacto), y **Genjutsu ya tiene la herramienta que encaja con esto sin inventar nada nuevo**:
`hf_mult_motion_control` está diseñado para "copiar/transferir movimiento desde un vídeo conductor" — el
render de Blender hace de vídeo conductor.

### 9.2 Requisito añadido: nada de apps de escaneo externas

Corrección hecha por Víctor a la primera versión de esta sección: la captura 3D **no puede depender de
que el cliente instale una app de terceros** (tipo Polycam o KIRI Engine) — tiene que resolverse dentro
de la propia app de Society. La parte de captura en sí es trivial (grabar vídeo/fotos con la cámara del
móvil no necesita ninguna app especial, cualquier app puede acceder a la cámara); lo que hacía falta
investigar era **con qué repos open-source se sustituye el motor de reconstrucción** que por debajo usan
esas apps de consumo.

### 9.3 Pipeline de reconstrucción — solo repos, sin apps de consumo

```
App de Society (grabación de vídeo/fotos del local, código propio, sin dependencias externas)
   └─ subida de fotogramas al servidor
        └─ COLMAP (github.com/colmap/colmap, bindings pycolmap)
             → Structure-from-Motion: calcula posición de cámara de cada fotograma + nube de puntos dispersa
                  └─ gsplat (github.com/nerfstudio-project/gsplat, Apache 2.0, `pip install gsplat`)
                     o alternativa en C++ "production-grade": OpenSplat (github.com/pierotofy/OpenSplat)
                     → entrena el modelo de Gaussian Splatting → archivo .ply
```

- **COLMAP** es el estándar del sector para Structure-from-Motion; tiene bindings de Python
  (`pycolmap`), así que se invoca como librería desde el propio backend, no como programa de usuario.
  Es la pieza más madura y mejor documentada de las cuatro, lo que importa para un TFG en solitario
  (más tutoriales, más comunidad para resolver problemas propios).
- **gsplat** es explícitamente una librería (no una app) pensada para que terceros construyan productos
  encima — es, de hecho, el motor que usan por debajo muchas apps comerciales de splatting.
- **OpenSplat** es la alternativa si se prefiere evitar la dependencia de Python/PyTorch en el
  servidor: un binario en C++ pensado para despliegue en producción.
- **A vigilar, no para el MVP — `InstantSplat`** (github.com/NVlabs/InstantSplat): salta COLMAP usando
  modelos de fundación (DUSt3R/MASt3R) y reconstruye en menos de un minuto sin necesitar las poses de
  cámara precalculadas. Es más rápido pero está probado sobre todo con pocas vistas de escenas pequeñas;
  para un restaurante entero (varias salas, cobertura densa) el camino COLMAP + gsplat/OpenSplat es hoy
  la opción más probada. Revisitar esta pieza cuando el pipeline base ya esté validado.

### 9.4 De `.ply` a escena editable en Blender

El único punto del pipeline donde aparece una herramienta de terceros reconocible es aquí, y es
aceptable porque **es un plugin de importación dentro de Blender, no una app que el cliente tenga que
instalar**: el addon gratuito y open-source **3DGS Render de KIRI Engine**
(github.com/Kiri-Innovation/3dgs-render-blender-addon, Blender 5.0+) importa el `.ply` generado por
gsplat/OpenSplat y lo deja como escena editable — se puede componer con objetos normales, limpiar
artefactos, y sobre todo, **colocar y animar una cámara** dentro de esa geometría real.

Este `.blend` resultante es el "gemelo digital" del local: se genera **una vez por cliente** en el
onboarding (Fase 1 de `idea.md`), no una vez por Reel.

### 9.5 Generar la cámara del guion sin intervención manual

Blender se controla enteramente por su API de Python (`bpy`). Un script puede:

1. Cargar el `.blend` del cliente (el gemelo digital ya generado en el onboarding).
2. Leer el listado de planos/movimientos que sacó el análisis de la plantilla de referencia (ángulo,
   distancia, tipo de movimiento — los mismos seis con intención de la regla 9 de `reglas_videos.md`:
   push-in, pull-back reveal, rack focus, parallax lateral, tilt reveal, orbit corto).
3. Posicionar y animar la cámara con esos parámetros dentro de la escena real.
4. Renderizar en modo headless (`blender --background --python script.py`), sin abrir ninguna interfaz.

Existen paquetes de referencia que ya resuelven los problemas típicos de hacer esto en un servidor sin
pantalla (framebuffer virtual, una sola importación de `bpy` por proceso): `blenderless` y
`PyBlenderRender`. Sirven como prueba de que el enfoque es viable y como referencia de diseño, no hace
falta partir de cero.

### 9.6 Varios Reels a la vez — por qué no hace falta diseñar una cola propia

La pregunta de Víctor era cómo servir varios vídeos en paralelo desde un servidor con Blender. La
respuesta correcta es no construir un gestor de colas propio: **Flamenco**
(flamenco.blender.org / projects.blender.org/studio/flamenco) es el gestor de render farm open-source
del propio Blender Foundation, construido exactamente para esto:

- Un **Manager** recibe los trabajos (un `.blend` + una animación de cámara) y los trocea en tareas.
- Varios **Workers** se registran contra el Manager, piden tarea, ejecutan Blender headless, y suben el
  resultado a almacenamiento en la nube.
- Escala horizontalmente sin más que añadir Workers — si varios clientes piden Reels a la vez, el
  Manager reparte solo.

**Dónde vive esto respecto al stack ya conocido (Vercel + Supabase + R2):** Vercel no sirve para esto —
no hay GPU ni ejecución larga en funciones serverless. El render necesita una capa aparte de cómputo con
GPU: **RunPod** o **Modal**, ambos con modalidad *serverless GPU* (facturación por segundo, escala a
cero sin trabajos pendientes), encajan mejor que un servidor GPU fijo con el patrón de uso de una
agencia unipersonal (ráfagas de trabajo, no carga constante). Ahí es donde corren los Workers de
Flamenco (o, en una primera versión sin Flamenco, un único Worker simple que reciba el guion, corra el
script `bpy` y suba el resultado a R2).

**Nivel de dificultad honesto:** cada pieza por separado es integración de herramientas maduras (nada es
investigación propia), pero montar el conjunto (contenedores de los Workers, gestión de un `.blend` por
cliente, cola, GPU bajo demanda) es trabajo de infraestructura real. Para el TFG, empezar **sin
Flamenco** (un solo Worker en Modal/RunPod) y dejar la concurrencia con Flamenco documentada como mejora
de escalado futura es razonable — demuestra que la arquitectura correcta está identificada sin que
montar un render farm distribuido completo sea condición para aprobar el proyecto.

### 9.7 Dónde entra Genjutsu, y el límite que no desaparece con esta arquitectura

El render de Blender se pasa a Higgsfield Genjutsu (`hf_mult_motion_control`) como vídeo conductor,
**solo para los planos de sala/ambiente/arquitectura** — ahí es donde el modelo hereda una trayectoria
de cámara real en vez de tener que interpretarla de un prompt.

**Aclaración de Víctor, importante:** el plato no se queda fuera de la IA — al contrario, la intención es
generar las imágenes del plato **con IA para mejorar su belleza/calidad** respecto a la foto real tal
cual, y pasar esa imagen generada como referencia al hacer el vídeo. Eso es compatible con toda la
arquitectura de esta sección: el gemelo digital en Blender resuelve **la cámara y la sala**; el plato
sigue por la vía ya validada en el proyecto (generación de imagen anclada a fotos reales,
regla 1/10bis de `reglas_imagenes.md`) y se compone sobre la escena, no se modela dentro de Blender. Lo
que hay que evitar (matiz ya señalado en la conversación) es esperar que Genjutsu "foto-realice" un
plato modelado como geometría CG genérica dentro de Blender — ahí sí se reintroduciría el mismo problema
de invención que toda esta arquitectura busca evitar. El plato entra en el vídeo final como imagen ya
generada/mejorada por IA y compuesta, no como malla 3D de Blender.

### 9.8 Riesgos y límites a tener documentados

- **Tiempo de reconstrucción de un local completo.** COLMAP con cobertura densa de varias salas puede
  tardar bastante más que la reconstrucción de un solo objeto — medirlo con el primer escaneo real antes
  de prometer un tiempo de onboarding concreto al cliente.
- **Requisito de GPU tanto para reconstrucción (gsplat) como para render (Blender Cycles/EEVEE).** No es
  gratis ni instantáneo; el modelo de coste serverless (RunPod/Modal) ayuda a no pagar por servidor
  ocioso, pero sigue siendo un coste variable a preflightear, igual que ya se hace con `get_cost` en
  Higgsfield.
- **Mantenimiento de un `.blend` por cliente.** Si el local cambia de mobiliario/decoración, el gemelo
  digital queda desactualizado y hay que re-escanear — es una asunción de producto (¿cada cuánto se
  re-escanea?) que queda pendiente de decidir, del mismo tipo que las ya listadas en `idea.md` §7.
- **Compatibilidad de versión de Blender** con el addon de importación (5.0+) — a verificar contra la
  versión que finalmente se use en el servidor.

## Fuentes

- [How to Make a Food Product Video Ad with AI in 2026: Full Workflow — Higgsfield](https://higgsfield.ai/blog/food-product-video-ad-ai-2026)
- [AI Video Generation in 2026: A Practical Guide — Zupino](https://www.zupino.com/generative-ai/creative-ai/ai-video-generation-in-2026-a-practical-guide-to-tools-workflows-and-production/)
- [Gaussian splatting: a complete student guide to 3D capture in 2026 — Medium](https://medium.com/@Jamesroha/gaussian-splatting-a-complete-student-guide-to-3d-capture-in-2026-1195a6265870)
- [Luma AI 3D Capture: The Complete Guide 2026 — SwiftXR](https://home.swiftxr.io/blog/luma-ai-3d-capture-the-complete-guide-to-scanning-exporting-and-publishing-3d-models-in-2026)
- [GitHub — lllyasviel/IC-Light](https://github.com/lllyasviel/IC-Light)
- [Learning Illumination Control in Diffusion Models](https://arxiv.org/html/2604.24877)
- [How to Use Start and End Frames for AI Video Motion Control in 2026 — Dreamina](https://dreamina.capcut.com/ai-video/how-to-use-start-and-end-frame-generators)
- [The Missing Frames: Start-to-End Video Diffusion Models — Medium](https://medium.com/@shashvat.k.singh.16/the-missing-frames-an-overview-of-start-to-end-video-diffusion-models-a299b87e4830)
- [Best AI Video Generators 2026: Veo 3.1, Kling, Sora 2, Seedance & More Compared — aimlapi](https://aimlapi.com/blog/best-ai-video-generators-2026-veo-3-1-kling-3-sora-2-seedance-more-compared)
- [Seedance 2.0 Review 2026: Real Tests vs Kling 3.0, Veo 3.1 & Sora 2 — noviai](https://www.noviai.ai/video-tips/seedance-2-reivew/)
- [Hybrid AI Workflows For Business Video Production — Artlist](https://artlist.io/blog/hybrid-ai-business-creator-workflows/)
- [How to Combine Real Footage With AI-Generated Video — Danetsoft](https://www.danetsoft.com/post/how-to-combine-real-footage-with-ai-generated-video)
- [Runway Gen-4 solves AI video's biggest problem: character consistency — VentureBeat](https://venturebeat.com/ai/runways-gen-4-ai-solves-the-character-consistency-challenge-making-ai-filmmaking-actually-useful)
- [Runway Video to Video: Restyle Videos Instantly — Pollo AI](https://pollo.ai/m/runway-ai-video-to-video)
- [Kling Motion Control – Directable AI Motion Transfer for Video](https://klingmotioncontrol.com/)
- [Performance Capture with Act-Two — Runway Help](https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two)
- [CameraCtrl: Enabling Camera Control for Text-to-Video Generation (arXiv)](https://arxiv.org/abs/2404.02101)
- [CameraCtrl project page](https://hehao13.github.io/projects-CameraCtrl/)
- [Wonder Studio — Wonder Dynamics overview](https://exploreai.tools/tools/wonder-studio)
- [AI Video Production in 2026: Why Brands Blend AI Clips With Real Footage — Code Designs](https://codedesigns.eu/ai-video-production-in-2026-why-brands-blend-ai-clips-with-real-footage/)
- [Artifact-Bench: Evaluating MLLMs on Detecting Artifacts of AI-Generated Videos (arXiv)](https://arxiv.org/html/2605.18984v1)
- [Detecting AI-Generated Video via Frame Consistency (arXiv)](https://arxiv.org/pdf/2402.02085)
- [LUTs, Film Grain, and the Film Look for AI Video — invideo](https://invideo.io/blog/luts-film-grain-ai-video/)
- [AI Video Post-Production: How to Make AI Footage Look Like Real Film — invideo](https://invideo.io/blog/ai-video-post-production/)
- [Lighting for Food Photography and Food Videography — Regan Baroni](https://reganbaroni.com/blog/video/lighting-for-food-photography/)
- [Food Photography Lighting (One Light Set Ups) — Expert Photography](https://expertphotography.com/food-photography-lighting)
- [COLMAP — Structure-from-Motion and Multi-View Stereo](https://colmap.github.io/index.html)
- [GitHub — colmap/colmap](https://github.com/colmap/colmap)
- [gsplat: An Open-Source Library for Gaussian Splatting (arXiv)](https://arxiv.org/html/2409.06765v1)
- [GitHub — nerfstudio-project/gsplat](https://github.com/nerfstudio-project/gsplat)
- [GitHub — pierotofy/OpenSplat](https://github.com/pierotofy/OpenSplat)
- [GitHub — NVlabs/InstantSplat](https://github.com/NVlabs/InstantSplat)
- [InstantSplat: Sparse-view Gaussian Splatting in Seconds](https://instantsplat.github.io/)
- [GitHub — Kiri-Innovation/3dgs-render-blender-addon](https://github.com/Kiri-Innovation/3dgs-render-blender-addon)
- [GitHub — oqton/blenderless](https://github.com/oqton/blenderless)
- [PyBlenderRender — GitHub](https://github.com/spa-dev/PyBlenderRender)
- [Blender Command Line Interface (headless rendering)](https://renderday.com/blog/mastering-the-blender-cli)
- [Flamenco — official site (Blender Foundation render farm manager)](https://flamenco.blender.org/faq/)
- [Flamenco Render Farm on Google Cloud Run](https://labs.steren.fr/2026/flamenco-cloud-run/)
- [Self-Hosting a Blender Render Farm Using Flamenco In 2026 — CGWire](https://blog.cg-wire.com/self-hosted-blender-render-farm/)
- [Scaling Render Power with Flamenco Orchestra — Blender Studio](https://studio.blender.org/blog/scaling-render-power-with-flamenco-orchestra/)
- [Best GPU Cloud for AI Inference (2026) — RunPod](https://www.runpod.io/articles/guides/top-serverless-gpu-clouds)
- [Top 5 serverless GPU providers — Modal](https://modal.com/blog/serverless-gpu-article)
