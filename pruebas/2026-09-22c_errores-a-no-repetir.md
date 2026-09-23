<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22.
> **Ámbito / a quién obliga:** método de producción de Society y de cualquier IA que opere el flujo.
> **Índice único y autoridad:** [README raíz](../README.md).

# Errores a no repetir — sesión del 22/09/2026

Registro de los fallos cometidos produciendo dos piezas el 22/09: el reel de Torre de Vega
adaptado de La Kasta y el reel demo del asador con el personaje Julián. **Veredicto del
cliente sobre ambas: no sirven.** Coste de la sesión: **~480 créditos**, de los cuales al
menos 96 fueron desperdicio directamente atribuible a saltarse el proceso.

Este documento no describe lo que salió bien. Describe lo que hay que impedir que vuelva a pasar.

---

## 1. Saltarse la puerta de aprobación de keyframes — **dos veces**

La regla 1 de `reglas_videos.md` dice: *primero todas las imágenes, visto bueno, y luego vídeo*.

| Vez | Qué pasó | Coste |
|---|---|---|
| 1ª | Se animó Seedance directamente sobre fotos de móvil del cliente, sin generar keyframes | Pieza entera descartada, 180 cr |
| 2ª | Se lanzó el clip A antes de que nadie revisara sus keyframes. El cliente detectó **dos parrillas en el mismo plano** —una imposibilidad física— cuando el vídeo ya estaba generado | 96 cr |

**Regla que se deriva:** ninguna llamada de vídeo se envía sin que exista una aprobación
explícita y registrada de **todos** sus keyframes. En Society esto es una puerta de estado,
no una recomendación: la pieza no puede transitar a `generando_video` sin
`keyframes_aprobados = true`.

## 2. No usar las plantillas de `directoria-cloud`

Las reglas 23 de imagen y 11 de vídeo las declaran **obligatorias**. En el primer intento se
escribieron los prompts a mano. Resultado: sin specs de cámara, sin micro-imperfecciones, sin
film stock, sin coda fotográfica — y una pieza plana.

**Regla que se deriva:** el prompt no es prosa libre. Si no sale del JSON Decoded Brief, no se
envía. Debe ser una validación de esquema en el backend, no una buena intención.

## 3. `omni_reference` hereda la calidad fotográfica de su referencia

Anclar Seedance a fotos de móvil con luz plana devuelve vídeo con luz plana de móvil, por mucho
que el texto pida acabado editorial. **La instrucción de look pierde siempre contra la imagen
de referencia.**

**Regla que se deriva:** la calidad se decide en el keyframe, no en el prompt de vídeo. Si la
referencia disponible es mala, hay que generar el keyframe primero —aplicando ahí el look— y
animar ese, nunca la foto original.

## 4. Los negativos genéricos no corrigen un defecto concreto

El keyframe con dos parrillas llevaba ya `no flat lighting, no HDR, no perfect symmetry`. El
defecto solo desapareció al nombrarlo: `no second grill, no extra grate, no separate griddle in
the foreground, no duplicate cooking surface, no floating grate without a fire beneath it`.

**Regla que se deriva:** un defecto observado se corrige nombrándolo literalmente en negativos,
y ese negativo se persiste para ese cliente. Es el banco de vetos por restaurante.

## 5. Confundir medición de proceso con calidad percibida — **el error de fondo**

Durante toda la sesión se presentaron como prueba de calidad: sonoridad en LUFS, suelo de negro
en YMIN, marcas de corte al milisegundo, puntuaciones del Virality Predictor. **El cliente miró
las dos piezas y dijo que eran horribles.**

Ninguna de esas métricas mide si un vídeo gusta. Miden que el proceso se ejecutó. Un `hook_score`
de 26 frente al 28 de la referencia parecía un buen resultado; en realidad ambas piezas estaban
por debajo del umbral en el que a alguien le importa.

**Regla que se deriva:** la métrica no sustituye al visionado. Antes de reportar una pieza como
terminada hay que decir si se ve bien, no si los números salieron. Y si hay duda, se enseña y se
calla.

## 6. No fijar la referencia de calidad antes de gastar

Nunca se estableció **qué significa «profesional» para este cliente** con una pieza concreta que
él considerase buena. Se preguntó una vez, no se insistió, y se gastaron ~480 créditos sobre una
definición supuesta.

**Regla que se deriva:** antes de la primera generación de pago hay que tener una referencia
aprobada por el cliente, medida y descompuesta. Sin eso, producir es apostar.

## 7. Calibrar «invisible» cuando se pidió «que se note»

Se pidieron *«transiciones de editor profesional y efectos»*. Se entregó montaje invisible —whips
de 5 fotogramas (0,16 s), disolvencia suave, punch-ins del 3-6 %— con el argumento de que las
transiciones marcadas «delatan la plantilla». El cliente dijo no ver ni transiciones ni efectos.

El argumento puede ser correcto en abstracto y sigue siendo un fallo de ejecución: **se entregó
lo contrario de lo pedido, dos veces, y se justificó en vez de preguntar.**

**Regla que se deriva:** cuando el criterio propio contradice lo que pide el cliente, se dice en
una frase y se ejecuta lo que pide. Si de verdad merece la pena comparar, se hacen las dos
versiones —el montaje cuesta 0 créditos— y decide él viendo, no leyendo.

---

## Resumen operativo para Society

1. Puerta de estado dura: sin keyframes aprobados no hay vídeo.
2. Validación de esquema del prompt contra la plantilla, no confianza.
3. El look se fija en el keyframe; el vídeo solo lo anima.
4. Banco de negativos literales por cliente, alimentado por cada defecto observado.
5. Referencia de calidad aprobada **antes** del primer gasto.
6. Al reportar: primero si se ve bien, después los números.
7. Ante conflicto entre criterio y encargo: se ejecuta el encargo.
