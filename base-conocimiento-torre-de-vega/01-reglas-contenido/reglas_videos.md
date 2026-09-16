# Reglas de vídeo — Torre de Vega (Reels)

Restaurante de pueblo, casi 50 años, clientela fiel y buen renombre. El objetivo de todo contenido
visual es que un cliente que entre físicamente al local no note ninguna diferencia respecto a lo que
vio en Instagram: no se vende una fantasía, se vende la promesa exacta del sitio real.

Este archivo cubre las reglas específicas de **vídeo / Reels**. Para reglas de fotografía/imagen fija
(carruseles de plato, fotos de sala, carteles), ver [`reglas_imagenes.md`](reglas_imagenes.md).

## Reglas compartidas con imagen (aplican tal cual a vídeo)

Estas reglas están desarrolladas en detalle en `reglas_imagenes.md` y aplican sin cambios a cada
escena/frame de un Reel:

- **Regla 1 — Continuidad**: nunca añadir mobiliario, decoración o elementos que no existan en el local
  real. Cada escena del Reel se ancla en fotos reales del local.
- **Regla 2 — Rostros: preferencia, no prohibición** *(rebajada 2026-09-08)*: se sigue prefiriendo
  manos, brazos y gestos, pero **la cara puede salir si el formato lo pide**. Literal del cliente:
  "si se puede evitar se evita, sino no pasa nada". Único matiz: un empleado real identificable tiene
  que estar de acuerdo. Ver el desarrollo completo en `reglas_imagenes.md`.
- **Regla 4 — Iluminación en texto**: describir la luz por temperatura de color (K) y tipo de fuente en
  el prompt, nunca forzar una imagen de referencia de mood/luz compartida entre escenas.
- **Regla 9quater — Repetir restricciones negativas en cada regeneración**: al reintentar/corregir una
  escena de vídeo ya corregida antes, repetir también las restricciones negativas ya validadas
  (p. ej. `no deer head / no antlers`), no solo añadir la corrección nueva.
- **Regla 13 — Variedad de género en manos**: si aparece más de una mano en una escena de vídeo,
  géneros distintos entre sí, y predominando manos de mujer en el conjunto de la pieza.

## Identidad y formato (resumen — ver perfil completo en `reglas_imagenes.md`)

- Tono de marca: auténtico, tradicional, sin artificios.
- Plataforma: Instagram Reels.
- **Aspect ratio: 9:16.**
- **Estilo: calidad fotográfica alta con acabado editorial dramático** *(invertido 2026-09-10, ver
  historial completo de la regla 17 en `reglas_imagenes.md`)*. Luz de una sola fuente dura y cálida,
  sombras profundas casi negras, contraste alto, grano de película visible y grade cinematográfico —
  el acabado de iPhone que se usaba antes queda sustituido de forma permanente.
- Herramienta: MCP Higgsfield conectado (modalidad EJECUTA tools).
- Conversación en español, prompts finales en inglés.

## 1. Flujo obligatorio: primero todas las imágenes, visto bueno, luego vídeo

Añadido 2026-09-05 tras el proyecto del Reel de vinos blancos.

**Regla:** para cualquier pieza de vídeo compuesta por varias escenas (un Reel, un carrusel animado, etc.), el orden de trabajo es siempre:

1. Generar **primero las imágenes fijas de todas las escenas** (el keyframe de cada plano).
2. **Presentar el lote completo de imágenes al cliente y esperar su visto bueno explícito** antes de gastar créditos en animar ninguna a vídeo.
3. Solo tras la aprobación, animar cada imagen ya aprobada a vídeo.

**Por qué:** animar a vídeo cuesta muchos más créditos que generar la imagen fija (ver regla 2 y el proceso documentado en `instagram/proceso-reel-vinos-blancos.md`). Corregir un fallo (cartel roto, elemento inventado, encuadre que no gusta, "aspecto IA") es barato en fase de imagen y caro en fase de vídeo — animar una imagen defectuosa y luego tener que regenerar arrastra el coste del vídeo desperdiciado además del de la imagen.

**Cómo aplicarlo:** no lanzar ningún `generate_video`/`generate_video_batch` de una escena cuya imagen fija no haya sido explícitamente aprobada por el cliente en la conversación. Si el cliente pide "genera ya el vídeo" sin haber visto la imagen antes, generar y enseñar la imagen primero igualmente, salvo que el cliente diga explícitamente que se salte ese paso.

## 2. Duración de vídeo por defecto: 3 segundos

Añadido 2026-09-05 tras comprobar costes reales en el proyecto del Reel de vinos blancos.

**Regla:** salvo que el cliente pida explícitamente otra duración, **todo vídeo generado con Kling (`kling3_0`) debe pedirse con `duration:3`** (el mínimo real que admite el modelo — no existe la opción de 1s).

**Por qué:** el coste de Kling `pro` escala con la duración — 3s cuesta **5,25 créditos** frente a **8,75** de 5s (medido con `get_cost` el 2026-09-08/09; la cifra original de ~7,5 / ~12,5 era una estimación anterior, corregida el 2026-09-14). Para Reels de ritmo rápido (~1-1,5s útiles por escena tras el recorte en edición) no hace falta más metraje del mínimo; generar a 5s por defecto desperdicia crédito en fotogramas que se acaban recortando de todas formas.

**Cómo aplicarlo:** incluir siempre `"duration": 3` en los parámetros de `generate_video`/`generate_video_batch` con Kling. Si el cliente pide un movimiento que necesita más recorrido (p. ej. una coreografía de varios beats), preguntar antes de subir la duración por defecto, ya que cada segundo extra tiene coste.

## 2bis. ~~Resolución de las imágenes fijas que se van a animar a vídeo — 1080, no 2K~~ — SUSTITUIDA: 2k

> ⛔ **Sustituida (anotado el 2026-09-14).** El argumento de esta regla era no pagar de más por 2K.
> Medido con `get_cost` el 2026-09-08: `nano_banana_pro` **cuesta lo mismo a 1k que a 2k** (2,00), y
> 2k deja margen para los reencuadres y push-in de After Effects. Vigente: **`resolution:"2k"`
> siempre** (paso 4 de `CLAUDE.md`, `documentación.md` Parte II §5). El texto de abajo se conserva
> como historial.

Añadido 2026-09-07 por indicación del cliente.

**Regla:** cuando la imagen fija (keyframe) que se genera es para **animarla después a vídeo** (no para
publicarse como foto suelta en el feed/carrusel), pedirla en **resolución 1080** (`resolution:"1080p"` o
equivalente más cercano disponible en `generate_image`), no en `"2k"`.

**Por qué:** todos los vídeos de Torre de Vega se generan y publican en 1080p (regla implícita del
formato Reel de Instagram). Si la imagen de partida se genera en 2K, esa resolución extra se pierde en
cuanto Kling anima el vídeo a 1080p — se paga de más en la generación de la imagen sin ningún beneficio
en el resultado final. Esto es una excepción a la regla 12 de `reglas_imagenes.md` (2K por defecto para
fotos), que sigue aplicando tal cual a fotos que se publican como imagen fija.

**Cómo aplicarlo:** al generar el keyframe de una escena de Reel (paso 1 del flujo de la regla 1 de este
documento), usar `"resolution": "1080p"` en `generate_image`. Si la misma imagen se va a reutilizar
también como foto suelta de feed/carrusel además de como base de vídeo, generarla en 2K igualmente (gana
el uso de mayor resolución) y no hace falta duplicar la generación.

## 3. Herramienta de análisis pre y post generación — Higgsfield Virality Predictor

Añadido 2026-09-07 tras probar la herramienta con `imagenes/generadas/reel_vinos_blancos/last.mp4`.

**Qué es:** herramienta MCP de Higgsfield (`virality_predictor`) que analiza un vídeo ya existente
(propio o de referencia) y devuelve un dashboard con:
- **Hook score**: fuerza de los primeros 3 segundos para captar atención.
- **Peak score / peak second**: en qué segundo está el pico de mayor "enganche" del vídeo.
- **Overall score / viral potential**: puntuación global de potencial viral (0-100).
- **Sustain**: qué tan bien retiene la atención una vez que el espectador ya está enganchado.
- **Brain engagement**: activación estimada por regiones (visual, atención, lenguaje, etc.), a nivel
  más experimental/informativo.

**Es una herramienta de análisis, no de generación**: no escribe prompts por sí sola. Sirve como bucle
de feedback — analizas un vídeo, lees dónde falla (p. ej. hook flojo, pico tardío) y traduces eso a
ajustes concretos de prompt/orden de escenas para la siguiente generación.

**Cuándo usarla, dos momentos:**

1. **Antes de escribir los prompts de las escenas** (análisis de plantilla/referencia): si hay un vídeo
   de referencia disponible — un Reel ajeno que funcionó bien, o un intento propio anterior — pasarlo
   por el Virality Predictor primero para extraer qué patrón de ritmo/hook usa (p. ej. "el pico está en
   el segundo 1, no en el 5") y estructurar el guion de escenas del Reel nuevo replicando ese patrón.
2. **Después de montar el Reel propio, antes de publicar**: analizar el vídeo final ya montado para
   detectar puntos débiles (hook_score bajo, peak_second tardío, sustain bajo) e iterar — reordenar
   escenas, adelantar el momento más fuerte a los primeros 1-2s, o regenerar el plano de apertura — antes
   de dar la pieza por buena.

**Cómo aplicarlo (flujo técnico):**
1. Subir el vídeo con `media_upload` (obtiene `upload_url` + `media_id`) → `curl PUT` de los bytes →
   `media_confirm` con `type: "video"`.
2. Lanzar el análisis: `virality_predictor` con `action: "create"`, `params.model: "virality_predictor"`
   y `medias: [{role: "video", id: <media_id>}]`.
3. Esperar el resultado con `job_status` (`sync: true`, puede tardar varios minutos — un vídeo de
   ~11.5s a 60fps tardó unos 6 minutos) o reabrir un análisis ya hecho con
   `action: "preview"` + `job_id`.
4. Leer `analysis.scores` (hook_score, peak_second, overall_score, viral_potential, sustain) y el
   `results.rawUrl` (dashboard HTML interactivo) para la lectura visual completa.

**Sobre el coste:** en la prueba realizada (plan Plus), el análisis **no generó ningún cargo** en el
historial de transacciones (`transactions`) — el saldo de créditos quedó igual antes y después. No hay
confirmación oficial de que sea "ilimitado", pero de momento se ha comprobado gratuito en este plan.
Si se usa de forma repetida o en otro plan, comprobar `balance`/`transactions` antes y después para
verificar que sigue sin coste.

**Qué mirar en el resultado para decidir si hace falta iterar:**
- `hook_score` bajo (< ~50) → el arranque no engancha, revisar qué pasa en los primeros 3 segundos del
  guion de escenas.
- `peak_second` tardío (> 2-3s) → el momento más fuerte del vídeo llega demasiado tarde; considerar
  adelantarlo o abrir el Reel directamente con esa escena.
- `sustain` bajo → aunque enganche al principio, se pierde audiencia según avanza; revisar ritmo de
  corte entre escenas.
- `overall_score`/`viral_potential` como puntuación de referencia global, útil para comparar variantes
  entre sí (p. ej. dos órdenes de escena distintos del mismo Reel).

## 4. Herramienta de desglose escena-por-escena — Higgsfield Video Analysis

Añadido 2026-09-07.

**Qué es:** herramienta MCP de Higgsfield (`video_analysis_create` / `video_analysis_status`) que,
a diferencia del Virality Predictor (regla 3, que da puntuaciones de rendimiento), **desglosa un vídeo
escena por escena**: identifica los cortes, describe qué pasa en cada plano (encuadre, movimiento de
cámara, acción, ritmo) y da una lectura estructural del vídeo completo. Acepta como entrada un vídeo ya
subido (`video_input_id`, el `media_id` de `media_upload`/`media_confirm`) o directamente una
`youtube_url`.

**Para qué sirve en este proyecto:** cuando el cliente pasa un vídeo (un Reel ajeno que le gusta, un
anuncio, una referencia de otro restaurante/bodega) como plantilla de inspiración, esta herramienta
permite analizarlo automáticamente y extraer su estructura de escenas real (cuántos planos tiene, qué
tipo de plano es cada uno, cómo se encadenan) en vez de tener que desglosarlo a ojo. Ese desglose se usa
después como base para **redactar los prompts de un Reel nuevo para Torre de Vega**, adaptando cada
escena de la plantilla al negocio real: mismos tipos de plano/ritmo, pero con platos, bodega, personal
sin cara y local reales de Torre de Vega en vez de los del vídeo original — aplicando siempre todas las
reglas compartidas de este documento y de `reglas_imagenes.md` (continuidad, personal sin cara,
iluminación en texto, etc.) al traducir cada escena.

**Diferencia con el Virality Predictor (regla 3):**
- **Video Analysis** → desglose estructural: "qué escenas tiene y qué pasa en cada una" → insumo para
  **escribir** el guion de prompts de un Reel nuevo inspirado en la plantilla.
- **Virality Predictor** → puntuación de rendimiento: "cómo de bien engancha" → insumo para **evaluar y
  corregir** un Reel ya generado (propio o de referencia).
- Se pueden combinar: analizar la estructura de una plantilla con Video Analysis, construir el guion de
  Torre de Vega en base a ella, y luego validar el resultado final con el Virality Predictor.

**Cómo aplicarlo (flujo técnico):**
1. Si el vídeo es un archivo local del cliente: subirlo con `media_upload` → `curl PUT` de los bytes →
   `media_confirm` con `type: "video"` → usar el `media_id` como `video_input_id`.
   Si es un enlace de YouTube: pasar directamente `youtube_url` a `video_analysis_create` (no hace falta
   subir nada).
2. Lanzar el análisis: `video_analysis_create` con `video_input_id` **o** `youtube_url` (exactamente
   uno de los dos).
3. Esperar el resultado con `video_analysis_status` (`video_analyze_id`), sondeando cada 30-60s —
   tarda normalmente 3-5 minutos, hasta `status:"completed"` (con `scenes` ya poblado) o
   `status:"failed"` (con `fail_reason`).
4. Leer las `scenes` devueltas (desglose plano a plano) y usarlas como base para redactar el guion de
   escenas del Reel de Torre de Vega, adaptando cada plano al negocio real.

**Aviso importante:** cuanto más largo es el vídeo, **menos fiable** es el desglose escena por escena —
la herramienta da mejores resultados con clips cortos. Avisar al cliente de esto antes de analizar un
vídeo largo, y si es posible, preferir recortar a la parte relevante antes de analizar.

**Sobre el coste:** **gratis en el plan Plus** — verificado el 2026-09-08 (el saldo no se movió tras
varios análisis; recogido en `CLAUDE.md` y `documentación.md` Parte II §5). Si cambia el plan, volver
a comprobar `balance` antes y después. *(Corregido el 2026-09-14: aquí constaba «no comprobado».)*

## 5. Cámara "perfectamente fija" en Kling delata que es IA — pedir siempre micro-movimiento

Incidente 2026-09-07 (Reel de carne): un vídeo pedido con cámara estática quedó con el plato, la
carne y las patatas completamente congelados fotograma a fotograma (solo se movía el humo). El
cliente lo señaló directamente: "se nota muchísimo que es IA".

**Por qué:** una cámara real, aunque el operador intente mantenerla fija, siempre tiene algo de
micro-temblor, respiración de enfoque y vida — el bloqueo absoluto de todo el encuadre excepto un solo
elemento (el humo) se lee como una foto animada, no como vídeo real, por perfecta que sea la imagen de
partida.

**Cómo aplicarlo:** no pedir literalmente "static camera" a secas en el prompt de vídeo. Pedir en su
lugar **un movimiento de cámara diseñado, mecánico y pequeño** (regla 9 para elegirlo, fórmula del
slider motorizado de la regla 11 para escribirlo) además del movimiento propio de la escena (humo,
líquido sirviéndose, tela moviéndose). El objeto principal (plato, mesa) debe seguir siendo el mismo
objeto en todo el clip — lo que cambia es la cámara, no el contenido.

> ⚠️ **Corregido el 2026-09-14.** Este párrafo pedía «micro-movimiento tipo mano sujetando el móvil».
> Aplicado así, el cliente lo rechazó el 2026-09-08 por temblor poco profesional (regla 11). **Nunca
> pedir handheld.** Excepción consciente: el formato «mismo plano, cambia el plato» va con trípode
> bloqueado (regla 14).

## 6. Consistencia de manos en Kling — minimizar gestos continuos sostenidos

Incidente 2026-09-07 (Reel de carne, escena de manos sirviendo el plato): en un clip de 3s con dos
manos sujetando y pasando un plato, aparecieron dos fallos de consistencia temporal típicos de vídeo
generado por IA — un anillo que aparecía y desaparecía entre fotogramas, y los dedos de una mano
deformándose/derritiéndose ligeramente hacia el final del clip. El cliente lo detectó de inmediato
("aquí también [se nota que es IA]").

**Por qué:** Kling pierde consistencia cuando se le pide un gesto de manos complejo y continuo
sostenido durante los 3 segundos completos (sujetar, reajustar agarre, mover dedos de forma activa) —
cuantos más fotogramas tiene que mantener la misma geometría de mano/joyería, más probabilidad de que
algo parpadee o se deforme.

**Cómo aplicarlo:** en escenas con manos, pedir **un único movimiento breve al principio del clip**
(p. ej. asentar el plato sobre la mesa) y que las manos se mantengan **esencialmente quietas y
estables** el resto del clip — nunca un gesto continuo de reagarre o movimiento activo de dedos
sostenido durante todo el plano. Especificar explícitamente en el prompt que cada mano mantiene los
mismos dedos, la misma joyería (o ausencia de ella) y la misma posición en todos los fotogramas, sin
parpadeos ni cambios de forma.

## 7. Presets automáticos de Higgsfield al generar vídeo — declinar si se quiere el prompt literal

Añadido 2026-09-07. Al llamar a `generate_video`/`generate_video_batch`, si el prompt se parece a un
preset ya existente de Higgsfield (p. ej. "IN THE DARK"), la herramienta no lanza la generación:
devuelve un `notice`/error con `preset_recommendation` pidiendo elegir entre usar ese preset o generar
en modo literal.

**Cómo aplicarlo:** si se quiere mantener el prompt específico de marca (lo habitual en este
proyecto, para cumplir las reglas de continuidad/personal sin cara/iluminación), volver a llamar a la
misma generación añadiendo `declined_preset_id: <preset_id>` devuelto en el aviso — eso fuerza la
generación literal con el prompt propio en vez del preset genérico. Tenerlo en cuenta al hacer
`generate_video_batch`: si un ítem del lote falla por esta razón (`submission_failed`), hay que
reenviarlo por separado con `declined_preset_id`, no asumir que todo el lote se generó.

## 8. Reutilizar el `job_id` de una imagen/vídeo ya aprobado como entrada, sin volver a subirlo

Añadido 2026-09-07. Tanto `generate_video`/`generate_video_batch` (rol `start_image` en `kling3_0`)
como `generate_image`/`virality_predictor` aceptan directamente el `job_id` de una generación anterior
en `medias[].value`, exactamente igual que un `media_id` subido a mano con `media_upload`.

**Por qué:** evita tener que descargar la imagen ya generada y volver a subirla a S3 solo para
animarla a vídeo o reanalizarla — se ahorra un ciclo completo de `media_upload`/`curl PUT`/
`media_confirm` por cada escena ya aprobada.

**Cómo aplicarlo:** al animar una escena cuya imagen fija ya se generó y aprobó en la misma
conversación, usar directamente `{"role": "start_image", "value": "<job_id de la imagen>"}` en vez de
subir el archivo de nuevo.

## 9. Diseñar el movimiento de cámara como lo haría un fotógrafo/videógrafo profesional, no un movimiento genérico por defecto

Añadido 2026-09-08 por indicación del cliente: "todos los vídeos que se hacen no tienen gracia... no
tienen movimientos pensados como lo haría un fotógrafo profesional, son vídeos a secas y ya".

**Por qué:** pedir "cámara estática con micro-movimiento sutil" en todas las escenas (regla 5) evita el
efecto "foto congelada", pero por sí solo no basta — si se repite la misma fórmula plana en cada
escena, el resultado es correcto técnicamente pero soso, sin intención visual. Un fotógrafo/videógrafo
profesional de producto elige un movimiento de cámara **con propósito narrativo** para cada plano (qué
quiere revelar, hacia dónde quiere llevar la mirada), no solo "que no se note que está quieto".

**Cómo aplicarlo:** al escribir el prompt de movimiento de cada escena, elegir deliberadamente un tipo
de movimiento de cámara con intención, variando entre escenas del mismo guion en vez de repetir
siempre la misma micro-deriva. Vocabulario a usar (con propósito, no al azar):
- **Push-in lento** (acercamiento progresivo hacia el detalle del plato) — para escenas de producto que
  quieren ganar intimidad hacia el final del plano.
- **Pull-back reveal** (empieza muy cerca de un detalle y se aleja para revelar el plato/mesa completos)
  — para dar un momento de "sorpresa" o contexto.
- **Rack focus** (el enfoque pasa de un elemento cercano desenfocado a el plato en foco, o al revés) —
  para dirigir la atención de un elemento secundario (copa, cubertería) al protagonista.
- **Parallax lateral sutil** (la cámara se desliza unos centímetros en horizontal, dejando que el primer
  plano y el fondo se separen a distinta velocidad) — aporta profundidad de capas real.
- **Tilt reveal** (la cámara empieza más baja/alta y sube o baja para revelar el plato) — útil para
  escenas de "aparición" del plato en mesa.
- **Orbit corto** (la cámara gira unos grados alrededor del plato, no un giro completo) — para mostrar
  volumen/textura en vez de un plano plano.

No usar el mismo movimiento en dos escenas seguidas del mismo guion — igual que la regla 11 de
`reglas_imagenes.md` exige variar ángulo entre fotos de un lote, aquí hay que variar el **tipo de
movimiento** entre escenas de un mismo Reel para que se note que cada plano está pensado, no que es la
misma plantilla de animación aplicada en bucle.

## 10. Los fotogramas de la plantilla son referencia de generación, no solo de análisis

Añadido 2026-09-08 por indicación del cliente.

**Regla:** cuando se toma un Reel como plantilla y se le extraen los cortes, **esos fotogramas se pasan
también como imágenes de referencia** al generar cada imagen fija — no se usan solo para escribir el
guion. Sirven para clavar el **ángulo, el encuadre, la distancia de cámara y la luminosidad** del plano
equivalente, de modo que el Reel resultante se parezca de verdad al que funciona.

**Por qué:** hasta ahora la plantilla se analizaba, se escribía el guion y después las imágenes se
generaban desde cero, ancladas solo a las fotos del local. Resultado: se copiaba la *estructura* pero
no el *plano*, y el lote entero salía con el mismo ángulo frontal a nivel de mesa y el mismo fondo,
que es justo lo que la regla 11 de `reglas_imagenes.md` prohíbe. La plantilla ya trae resuelto qué
ángulo funciona en cada momento del Reel — desaprovecharlo es rehacer ese trabajo a peor.

**El reparto de mando, que es lo que no se puede confundir:**

| De la plantilla se copia | Del cliente manda siempre |
|---|---|
| Ángulo y altura de cámara | La geometría del local y su mobiliario |
| Encuadre y distancia al sujeto | Los platos, la vajilla y la mantelería reales |
| Dónde cae el sujeto en el cuadro | El acabado editorial dramático (regla 17, invertida el 2026-09-10) |
| De dónde viene la luz y cómo está repartida | El balance de blancos cálido de la regla 17 vigente |
| El ritmo de planos abiertos y cerrados | Todo lo que diga la regla 1 |

**Cómo aplicarlo:**
- Al extraer los cortes con `ffmpeg`, guardar los fotogramas representativos de cada plano en
  `plantillas/AAAA-MM-DD/frames_NN/` y dejarlos subidos como media en Higgsfield.
- **Un fotograma por plano, tomado hacia la mitad del plano — nunca a intervalos fijos.** Sacar la
  lista de cortes con `select='gt(scene,0.2)',showinfo`, calcular el punto medio de cada tramo y
  extraer ahí. *(Corregido por el cliente el 2026-09-08: un muestreo cada 1,3 s en la plantilla 01 se
  llevó tres fotogramas del plano final —que dura 4,1 s, el 40 % del Reel— y dejó otros planos sin
  representar. Bajar el umbral a 0,1 no arregla nada: mete la animación del logo y las cortinillas
  como si fueran cortes.)*
- **Mirar los fotogramas antes de dar por buena la lectura del Reel.** En la plantilla 01, el contact
  sheet a intervalos fijos ocultaba que el Reel es una **pantalla partida** con dos franjas
  simultáneas, cada una con su rótulo. Eso cambia el guion entero y la composición de cada imagen
  (sujeto centrado en vertical, pensado para recortarse a banda apaisada).
- En cada generación, pasar el fotograma del plano equivalente **junto a** las fotos reales, y decir
  explícitamente en el prompt qué papel tiene cada referencia: *"use the template frame only for camera
  angle, framing and light direction; the real photos govern the room, the food and the tableware"*.
  Es la misma fórmula ya validada en la regla 9sexies de `reglas_imagenes.md`.
- **Nunca** copiar de la plantilla el plato, el local, la vajilla ni la persona (regla 18).

**Dónde choca y quién gana.** Muchas plantillas vienen con grade cinematográfico y penumbra. De la
luminosidad se copia **la estructura de la luz** —de dónde entra, qué queda en sombra, si el plano es
claro u oscuro dentro del arco del Reel—, nunca el grade literal de la plantilla. **Prevalece la regla
17 vigente** (invertida el 2026-09-10): luz de una sola fuente, sombras profundas, contraste alto,
grano visible. El cliente lo dijo así: lo más parecido posible, pero **con el estilo del cliente** —
solo que ahora ese estilo es el dramático, no el de iPhone.

## 11. OBLIGATORIO — los motion prompts se escriben con la plantilla de `directoria-cloud`

Exigido por el cliente el 2026-09-08, tras detectar que los cuatro vídeos del Reel 03 se lanzaron con
prompts en prosa libre en vez de con la metodología del proyecto.

**Regla:** todo prompt de vídeo se construye con
[`directoria-cloud/templates/prompt-video-motion.md`](../directoria-cloud/templates/prompt-video-motion.md).

### Los cuatro bloques, en este orden

| Bloque | Qué lleva | Por qué |
|---|---|---|
| **1. PRESERVE** | Lo que el modelo NO debe tocar: cara, vestuario, fondo, producto, logo, encuadre | El vídeo **deriva**. Sin anclar, a los 3 s cambia la cara o se borra el bordado |
| **2. MOTION (BEATS)** | El movimiento troceado **por timestamps**: `0–2s`, `2–4s`, `4–6s` | Sin timestamps el modelo mete todo el movimiento de golpe y queda frenético |
| **3. CAMERA** | El comportamiento de cámara, casi siempre muy poco | *"Restraint es cine."* Quieta o push-in del 3-4 %. Una cámara loca lee como demo de motor gráfico |
| **4. FILM GRADE** | Coherencia de look con el frame inicial | Evita que el modelo "limpie" la imagen a un digital plano |

Cierra con **NEGATIVE** y la **coda fotográfica** (cámara, lente, f/, `Photographic realism, no text.`).

**Lista negra que no se escribe nunca:** ojos que brillan, chispas mágicas, *fairy dust*, objetos que
levitan, props que rotan solos, luces en cascada.

### ⚠️ Dónde choca con las reglas de este cliente

El bloque **FILM GRADE** de la plantilla pide grano Kodak y halación. **Prevalece la regla 17 vigente**
(invertida el 2026-09-10): ahí se escribe algo como `one dramatic hard key light, deep near-black
shadows, warm cinematic grade around 3000-3300K, visible fine film grain`. Antes de esta fecha se
escribía justo lo contrario (`no film grain, no cinematic colour grade`) — ver el historial completo
en la regla 17 de `reglas_imagenes.md`. La estructura de la plantilla es obligatoria; **los valores
los mandan las reglas de este proyecto**.

Lo mismo con la tabla de modelos de la plantilla (`kling3_0` / `seedance_2_0`): la **elección de modelo**
la manda la tabla de costes medida en `documentación.md`, que es posterior. La **estructura del prompt**
es obligatoria igualmente.

### ⛔ Nunca pedir "micro-movimiento de móvil en mano": sale temblor, no cine

Rechazado por el cliente el 2026-09-08: *"no hay movimiento de cámara, la cámara tiembla mucho y no es
nada profesional"*. El prompt pedía literalmente *"only the faint natural breathing of a handheld
phone"*. El modelo lo obedeció y devolvió exactamente eso: temblor sin intención.

**Esto corrige cómo se venía aplicando la regla 5.** "Nunca `static camera` a secas" **no significa
pedir handheld**. Significa diseñar un movimiento (regla 9). El handheld lee como aficionado; lo que
lee como profesional es un movimiento **mecánico, lento y constante**.

**La fórmula que funcionó** (`v01_carne-cortada_pushin.mp4`), a copiar tal cual:

> *"A single continuous move on a **motorised slider with a geared head**, like a professional food
> videographer. The camera starts high over the whole plate and, across the whole five seconds,
> descends and pushes in about **fifteen percent** towards the subject. **Slow, constant speed, already
> moving on the first frame and still moving on the last.** Perfectly mechanical and stabilised: no
> handheld operation, no shake, no jitter, no wobble, no vibration, no floaty drift. No pan, no roll,
> no orbit, no zoom punch."*

Las cuatro claves: **nombrar el aparato** (slider motorizado, cabezal engranado), **cuantificar el
recorrido** (un 15 %), **exigir velocidad constante de principio a fin**, y **prohibir el handheld por
su nombre** en el negative.

### Los 4 bloques anclan, pero no inventan movimiento que no esté en el frame

Medido el 2026-09-08 en `v01_carne-cortada_vapor.mp4`, el primer motion prompt escrito con la
plantilla. El bloque **PRESERVE funcionó perfectamente** —no se deformó ni una loncha ni una patata,
que era el fallo de las tandas anteriores—, pero **el beat de vapor no se generó**: un mapa de
diferencias entre el frame 0 y el 4,6 s solo muestra deriva de cámara y un temblor leve en los bordes
de la comida.

**Lección:** en un plato quieto no hay de dónde sacar movimiento. El modelo puede animar lo que ya
insinúa el frame (líquido cayendo, una persona a media zancada, fuego), pero **no crea vapor sobre una
imagen fría**. Si el plano no tiene movimiento propio, **no se anima: se resuelve con un push-in en el
montaje, que es gratis** y encima no arrastra el artefacto de que la comida tiemble.

**Antes de gastar créditos en animar un plano, preguntarse:** ¿qué se está moviendo ya en la imagen?
Si la respuesta es "nada", ese plano va al montaje, no a `generate_video`.

### La trampa del preset, que la plantilla ya avisaba

Si el prompt se parece a un preset, el server devuelve un `notice` de tipo `preset_recommendation`
**sin ejecutar nada**: no trae `results` ni `job_id`. El preset que salta con prompts de comida y luz
es **"IN THE DARK"**, id `24bae836-2c4a-48e0-89b6-49fcc0b21612`. Se fuerza el prompt literal pasando
`declined_preset_id` con ese id. *(Ocurrió el 2026-09-08 y costó dos llamadas, estando ya documentado.)*

## 12. El primer segundo decide si el Reel se distribuye — nunca abrir con un bodegón quieto

Añadido el 2026-09-08 tras medir los 90 días reales de la cuenta
(`informes/2026-09-08_analisis-instagram-90dias.md`).

**El dato:** los 16 Reels del trimestre tienen entre **56,8 % y 82,8 % de abandono en los 3
primeros segundos** (mediana ~75 %). Ninguno cruza el umbral en que Instagram empuja un Reel más
allá de los seguidores — y, de hecho, en 90 días **ninguna publicación superó los 4.349 seguidores
en alcance**. El Reel de los 3 vinos blancos, el primero producido con este flujo, es **el peor de
los 16 en retención (82,8 %)**: nueve cortes de 1,2 s de botellas bonitas no le dan al espectador
ninguna razón para quedarse en el segundo 1.

**Regla:** el guion se escribe empezando por el fotograma 1, y ese fotograma tiene que cumplir las
cuatro condiciones:

1. **Acción ya empezada.** Mano que ya está vertiendo, cuchillo que ya está cortando, puerta que ya
   está abriéndose. *Si el primer fotograma se puede confundir con una foto fija, está mal.*
2. **Rótulo en pantalla desde el fotograma 1**, con la tipografía aprobada (Bodoni MT Regular
   espaciado + filete + sombra suave, nunca contorno negro).
3. **El primer plano dura 2–2,5 s, no 1,2 s.** El ritmo rápido empieza después del segundo 3, no
   antes: cortar rápido al principio reparte la atención en vez de crear una.
4. **Movimiento real, no push de After Effects.** Un paneo de AE sobre una imagen fija no lee como
   "está pasando algo". Si el plano 1 debe ser generado, se genera como vídeo aunque cueste
   créditos; si puede salir de metraje real del cliente, mejor y gratis (y obligatorio si hay
   fuego o brasa — regla 22).

**Ojo con la lectura estadística.** En estos 90 días la retención correlaciona −0,26 con el
alcance, casi nada. Eso **no** significa que la retención dé igual: significa que no hay variación
que medir, porque los 16 Reels están todos en la franja mala. Es condición necesaria y no
suficiente. El objetivo no es mejorarla un poco, es **bajar de 65 % de abandono al menos una vez**
para ver por primera vez qué hace el algoritmo con un Reel de esta cuenta que sí retiene.

**Y la condición que pesa más que el montaje:** los dos únicos posts que llegaron lejos en 90 días
lo hicieron por **compartidos** (concentran el 50 % de los del trimestre), y uno de ellos tenía
77 % de abandono. Antes de producir, la pregunta de control es:

> ¿Un vecino de Alhaurín le reenviaría esto a alguien?

Si la respuesta es no, la pieza se queda en 600–900 de alcance haga lo que haga el montaje. Se
comparte lo que resuelve un plan (una fecha, una novedad, un aviso real), no lo que enseña un
plato bonito.

## 13. `minimax_hailuo` NO acepta `aspect_ratio` — se lo saca de la imagen de partida

Medido el 2026-09-09 produciendo el Reel 06. Dos trabajos lanzados con
`aspect_ratio:"9:16"` **fallaron sin mensaje de error**. En el payload devuelto por `job_status`
con `raw_data:true` se veía la causa: `"width":1024,"height":1024`. El parámetro no solo se ignora,
**rompe el trabajo**.

`models_explore action:"get" model_id:"minimax_hailuo"` lo dice explícitamente: `aspect_ratios: []`.
El modelo deduce el encuadre de la `start_image`, así que con un keyframe 9:16 devuelve vertical solo.

**Cómo aplicarlo:** con `minimax_hailuo`, pasar únicamente `variant`, `duration`, `resolution` y
`medias`. **Nada de `aspect_ratio`.** Esto es lo contrario que en Kling y Seedance, donde el aviso de
la plantilla de `directoria-cloud` es que `aspect_ratio:"9:16"` es **obligatorio** porque el default
es `16:9`. No se puede copiar el bloque de params de un modelo a otro.

**Regla general que deja el incidente:** antes de la primera tanda con un modelo que no se haya usado
en el proyecto, ejecutar `models_explore action:"get"` — es gratis y devuelve los parámetros
admitidos, sus opciones y sus defaults. Los trabajos fallidos **no cobran créditos** (verificado: el
saldo no se movió tras los dos fallos), pero sí cuestan tiempo.

**Salida real medida** de `minimax_hailuo` `minimax-2.3`, `duration:6`, `resolution:"1080"` con
keyframe 9:16: **1080×1934, 24 fps, 5,875 s, 10 créditos.** Los 1934 px de alto se recortan a 1920
en montaje (`crop=1080:1920`).

## 14. Formato «mismo plano, cambia el plato»: solo se animan el primero y el último

Indicado por el cliente el 2026-09-09 al producir el Reel 06, y es la forma correcta de hacer este
formato.

**El reparto:** el gesto completo —la mano entra, posa el plato, se retira— **se parte entre los dos
extremos de la pieza**, y los planos intermedios son imágenes fijas congeladas en la mitad de ese
gesto.

| Plano | Qué es | Por qué |
|---|---|---|
| **Primero** | **Vídeo.** La mano baja el plato los últimos centímetros y lo posa en la mesa | Regla 12: el fotograma 1 necesita movimiento real, no un push de AE |
| **Intermedios** | **Imágenes fijas**, todas en el mismo punto medio: plato en el aire, mano sujetándolo | A 0,9 s por plano el ojo lee «otro plato que llega». Animarlos no aporta y multiplica el coste |
| **Último** | **Vídeo.** El plato ya está posado y la mano se retira dejándolo solo en cuadro | Cierra el gesto y deja el plano limpio para la placa de marca |

**Por qué funciona:** el espectador ve el principio del movimiento, luego una ráfaga de platos
detenidos en ese mismo instante, y por fin el final del movimiento. El cerebro completa el gesto en
los planos fijos aunque no se muevan.

**Coste:** 2 vídeos en vez de 6. Con `minimax_hailuo` son **20 créditos** en vez de 60.

⚠️ **Los fijos tienen que estar todos en el MISMO punto del gesto.** Si uno tiene el plato ya posado
y otro en el aire, el efecto se rompe. Al generar la serie, decirlo explícitamente en `environment`:
*"the plate is a couple of centimetres above the wood, not yet resting, her fingers still under its
rim"*.

**Y el keyframe del plano de cierre hay que generarlo aparte**: es el único de la serie con el plato
apoyado, así que no vale ninguno de los fijos. Se saca reencadenando el fijo de ese plato con el
patrón de «un solo cambio» (regla 27 de `reglas_imagenes.md`).

### La cámara va bloqueada en este formato, y es una excepción consciente a la regla 5

La regla 5 prohíbe `"static camera"` a secas porque congela el plano y se lee como foto animada. **En
este formato no aplica**, y hay que pedir explícitamente trípode bloqueado:

- El movimiento real ya está en la escena (la mano y el plato), que es justo la condición que la
  regla 5 exige.
- Los planos intermedios son **fijos**. Si la cámara deriva en los vídeos, el corte a los fijos
  salta y el formato se rompe: todo el efecto depende de que el encuadre sea literalmente idéntico.

Fórmula usada: *"Locked tripod, absolutely fixed for the whole clip. No pan, no tilt, no dolly, no
push-in, no zoom, no roll, no orbit, no handheld operation, no shake, no drift. The last frame is
framed identically to the first."*

## 15. `minimax_hailuo` está PROHIBIDO — y por qué falló

Rechazado por el cliente el 2026-09-09: *"valiente mierda de vídeos han salido, por favor no vuelvas
a utilizar ese modelo y utiliza modelos un poco mejores"*.

**No usar `minimax_hailuo` en este proyecto.** Esto **corrige el caso 3 de la tabla de modelos** de
`documentación.md` §5, que lo fijaba como el especialista en manos y acción física.

**Los dos fallos, medidos sobre la salida:**

1. **La cámara se movió sola.** El prompt pedía trípode bloqueado y lo prohibía por su nombre siete
   veces (*no pan, no tilt, no dolly, no push-in, no zoom, no roll, no orbit*). El clip hace un
   push-in claro: el fondo cambia de escala de principio a fin. En un formato de plano fijo eso
   **rompe el corte** a las tomas fijas.
2. **La comida se rehizo.** Las gambas cambian de número y de posición entre fotogramas, y la
   guindilla se desplaza. Es el morphing clásico que documenta la Parte II §4 — y aquí ocurrió
   **pese a no haber pedido ningún movimiento de cámara**.

**La lección que va más allá del modelo:** un modelo que ignora el bloque CAMERA no sirve para este
cliente, por buena que sea su física. Antes de adoptar un modelo, hay que **verificar que respeta la
cámara bloqueada**, no fiarse de la etiqueta comercial.

## 16. Fijar también la imagen FINAL (`end_image`) — la técnica que resuelve el plano fijo

Validado el 2026-09-09 con `seedance_2_0` tras el fallo de la regla 15.

**El problema:** en un formato de cámara fija, si el clip deriva aunque sea poco, el corte a las
tomas fijas salta y se ve.

**La solución:** varios modelos aceptan `start_image` **y** `end_image`. Pasando las dos, el clip
queda **anclado por los dos extremos** y no puede derivar: se sabe exactamente dónde empieza y dónde
acaba. Además el último fotograma coincide al píxel con la toma fija que viene detrás, así que el
corte es invisible.

**Cómo se usó en el Reel 06:**

| Clip | `start_image` | `end_image` | Resultado |
|---|---|---|---|
| Entrada | Mesa vacía | La mano sosteniendo el plato en el aire (= la pose de las fijas) | Aterriza clavado en las fijas |
| Cierre | Plato posado, dedos en el borde | El plato solo, sin mano | Termina limpio para la placa de marca |

**Eso obliga a generar keyframes que no son ninguna de las tomas del guion**: la mesa vacía y el
plato solo. Se sacan reencadenando con el patrón de «un solo cambio» (regla 27 de
`reglas_imagenes.md`) — quitar el plato y la mano en un caso, quitar la mano en el otro.

**Modelos que admiten `end_image`** (verificado con `models_explore`): `seedance_2_0`,
`seedance_2_5`, `seedance1_5`, `cinematic_studio_3_0`, `kling3_0`, `minimax_h3`, `wan3_0`,
`wan3_0_prime`, `flux_3_video`. **`veo3_1` NO lo admite** — solo `start_image` — y por eso se
descartó aquí pese a ser de los mejores y de los más baratos del lote.

## 17. Modelo por defecto para planos de cámara fija con acción de manos: `seedance_2_0`

Validado por el cliente el 2026-09-09 (*"muy bien, bastante mejor"*) tras rechazar
`minimax_hailuo`.

```
model: "seedance_2_0", mode: "std", resolution: "1080p", duration: 4,
aspect_ratio: "9:16", generate_audio: false
+ medias: start_image y end_image
→ 36 créditos · salida real 1080×1920 exactos, 24 fps, 4,04 s
```

**Por qué este y no otro.** El catálogo lo describe como *reference-driven, consistent identity,
product, multi-SKU, e-commerce* — está construido para que **un producto no cambie** entre
fotogramas, que era exactamente el fallo a batir. Y admite `end_image`.

**Comparativa de coste medida el 2026-09-09** (por clip, 9:16, sin audio):

| Modelo | Config | Créditos | `end_image` |
|---|---|---|---|
| Veo 3.1 `preview`+`high` | 4 s | 29 | ❌ **No** |
| Kling 3.0 `4k` | 5 s | 30 | ✅ |
| **Seedance 2.0 `std` 1080p** | **4 s** | **36** | ✅ |
| Seedance 2.0 `std` 1080p | 5 s | 45 | ✅ |
| Cinema Studio 3.0 1080p | 5 s | 50 | ✅ |

Ventaja operativa añadida: **devuelve 1080×1920 exactos**, sin los 1934 px de alto de Minimax ni los
1076×1924 de Kling, así que no hace falta recortar nada en montaje.

## Checklist rápido antes de generar/publicar un Reel

- [ ] **¿El fotograma 1 tiene una acción ya empezada y un rótulo en pantalla, y dura 2–2,5 s (regla 12)?**
      Si el primer fotograma parece una foto fija, el Reel no se va a distribuir.
- [ ] **¿Un vecino de Alhaurín reenviaría esta pieza a alguien (regla 12)?** Si no, el alcance se
      queda en 600–900 haga lo que haga el montaje.
- [ ] ¿Se han generado y aprobado TODAS las imágenes fijas de cada escena antes de animar ninguna a
      vídeo (regla 1)?
- [ ] ¿El vídeo pide `duration:3` en Kling salvo indicación contraria del cliente (regla 2)?
- [ ] ¿El aspect ratio es 9:16 y el acabado editorial dramático vigente (luz de una sola fuente,
      sombras profundas, contraste alto, grano de película visible — regla 17, invertida 2026-09-10)?
- [ ] Si aparece una persona: ¿existe su imagen de referencia aprobada, y es claramente **otra
      persona** distinta a la del vídeo plantilla? (regla 18 de `reglas_imagenes.md`)
- [ ] ¿Cada escena cumple las reglas compartidas de continuidad, personal sin cara, iluminación en
      texto, restricciones negativas repetidas y variedad de género en manos?
- [ ] Si hay un vídeo de referencia disponible, ¿se ha analizado con el Virality Predictor antes de
      escribir el guion de escenas, para replicar el patrón de hook/ritmo que funciona (regla 3)?
- [ ] Antes de publicar el Reel final, ¿se ha pasado por el Virality Predictor y revisado hook_score /
      peak_second / sustain para decidir si hace falta iterar (regla 3)?
- [ ] Si el cliente pasa un vídeo/Reel de referencia como plantilla, ¿se ha desglosado con Video
      Analysis (regla 4) antes de escribir los prompts, en vez de improvisar el guion de escenas a ojo?
- [ ] ¿El prompt de vídeo pide un movimiento mecánico, lento y cuantificado (slider motorizado, regla 11) en vez de "static camera" a secas (regla 5) — y **nunca** handheld?
- [ ] ¿Se han pasado los **fotogramas de la plantilla** como referencia de ángulo, encuadre y luz en
      cada generación de imagen, dejando claro en el prompt que el local, los platos y la vajilla los
      mandan las fotos reales (regla 10)?
- [ ] Si hay manos en la escena, ¿el prompt pide un único movimiento breve seguido de quietud, en vez de un gesto continuo sostenido los 3 segundos (regla 6)?
- [ ] Si la herramienta devuelve una recomendación de preset, ¿se ha decidido conscientemente entre usar el preset o declinarlo con `declined_preset_id` para mantener el prompt propio (regla 7)?
- [ ] ¿Cada escena tiene un movimiento de cámara elegido con intención (push-in, pull-back reveal, rack focus, parallax, tilt reveal, orbit corto...) en vez de la misma fórmula genérica repetida en todo el guion (regla 9)?
- [ ] ¿Se ha consultado `models_explore action:"get"` (gratis) antes de la primera tanda con un modelo
      nuevo, en vez de copiar el bloque de params de otro? (regla 13 — `minimax_hailuo` **no** admite
      `aspect_ratio` y pasárselo tira el trabajo)
- [ ] En un formato de «mismo plano, cambia el plato», ¿se animan **solo** el primer y el último plano,
      con los intermedios fijos en el mismo punto del gesto y la cámara bloqueada (regla 14)?
- [ ] ⛔ ¿Se ha evitado `minimax_hailuo`, que está **prohibido** en este proyecto (regla 15)?
- [ ] En un plano de cámara fija, ¿se han pasado **`start_image` y `end_image`** para anclar el clip
      por los dos extremos y que el corte a las tomas fijas no salte (regla 16)?


## 17. OBLIGATORIO — variedad real de ángulos entre vídeos de un mismo reel

Indicación expresa del usuario, 2026-09-15. Si se van a generar varios vídeos para una misma pieza, queda prohibido que tengan exactamente el mismo ángulo de cámara. Deben aportar variedad de puntos de vista claramente perceptible.

Un recorte más cerrado, un zoom, otra focal o una distancia menor no cuentan por sí solos como otro ángulo. Variar de verdad la posición alrededor del sujeto o la inclinación de la cámara: por ejemplo, tres cuartos bajo, lateral a ras y cenital a 90°. Mantener la identidad del producto y la fidelidad al local entre vistas.

Única excepción: el reel exige explícitamente mantener el mismo ángulo para ejecutar una transición que se haya estudiado previamente en un reel de referencia. Registrar qué referencia, qué transición y qué planos requieren ese encuadre fijo. No aplicar la excepción por comodidad, ahorro o simple continuidad estética.

Antes de generar: anotar el ángulo y su función en la lista de planos. Antes de animar: revisar las imágenes base juntas y rechazar las que repitan el ángulo sin excepción justificada. Antes de entregar: comprobar que los vídeos conservan esa variedad.

Esta regla prevalece sobre recetas anteriores que repitan ángulo sin una transición estudiada y justificada. En el reel del chuletón actual, un macro desde el mismo tres cuartos no es variedad suficiente; se sustituye por un cenital real.


## 18. Selección de modelo según la acción — actualización del usuario, 2026-09-15

- Vídeos sencillos, desplazamientos de cámara y planos de producto sin interacción compleja: **Kling 3.0**.
- Manos, uso de cubiertos, cortes para mostrar el interior de la carne y otras acciones físicas complejas: **Seedance 2.5** como modelo preferido.
- Clasificar cada plano por la acción antes de generar; no elegir todos los modelos por igual para ahorrar decisiones. La preferencia de modelo no sustituye la revisión de anatomía, contacto, física del corte ni continuidad.
- Esta indicación prevalece sobre recetas anteriores que asignen Kling a un corte con manos. En el reel actual del chuletón, regenerar ese plano con Seedance 2.5 y conservar la luz natural solicitada.
- Se mantiene la regla de variedad real de ángulos entre vídeos generados.
