# 08 · Firma de rodaje real

Qué hace que un reel de comida parezca **rodado** y no generado, con los bloques de prompt, los umbrales medibles y la revisión automática. Sale de la comparación medida del 25/09/2026 entre el reel de Da Tonino v3 y un reel de referencia de producto (→ [`pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/`](../../../../pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/README.md)).

> **La idea que manda:** el público no detecta la IA por falta de detalle. La detecta porque la imagen **no tiene las limitaciones de una cámara**:
> - todo está en foco;
> - la luz no tiene fuente;
> - la cámara no pesa;
> - los objetos no pesan;
> - el montaje no respira con un sonido.
>
> Hay que **devolverle a la imagen las limitaciones de un rodaje**.

**Precedencia.** Este archivo corrige, para vídeo y planos de acción, tres reglas anteriores:
- f/4 en platos (`00` §2.2 y `02` §3);
- sombras levantadas por la sala (`02` §2);
- «slider motorizado, sin cámara en mano» (prefijo de `director/04` §2).

La corrección está fechada en [`00-precedencia-y-correcciones.md`](00-precedencia-y-correcciones.md) §2.10. Se mantienen:
- el balance de blancos neutro;
- la ficha de texturas;
- el ancla real;
- la prohibición de inventar.

## Índice

1. Las diez firmas
2. Profundidad de campo: un plano de foco con nombre
3. Luz: neutra de color, dura de forma
4. Cámara con peso
5. Física con peso y desenfoque de movimiento
6. Verbos de manos
7. Un mundo visual por pieza
8. Montaje de producto
9. Sonido obligatorio
10. Postproducción que une
11. Bloques de prompt
12. Revisión automática y umbrales
13. Material real primero

---

## 1. Las diez firmas

| # | Firma de rodaje | Señal de IA que evita | Medible |
|---|---|---|---|
| F1 | **Plano de foco fino con nombre**: nítido solo lo que importa | Todo el encuadre en foco | % de encuadre en foco 8–25 % en planos cercanos |
| F2 | **Luz con fuente y contraste**: negros profundos, brillos que llegan a blanco | Luz plana, sombras lavadas | Negro p1 ≤ 3,5; blanco p99 ≥ 220 |
| F3 | **Cámara con peso**: a mano o gimbal, microtemblor, acompaña el gesto | Cámara quieta o que flota | ≤ 2 planos quietos por pieza |
| F4 | **Objetos con peso**: caen rápido, rebotan, se posan; desenfoque de movimiento en lo rápido | Ingredientes que flotan nítidos | Revisión a ojo |
| F5 | **Acción con causa**: una mano hace un verbo concreto en cada plano | Cosas que se mueven solas | Revisión a ojo |
| F6 | **Imperfección con sitio**: harina en la mesa, gota que cae, borde quemado | Estilismo perfecto | Revisión a ojo |
| F7 | **Un mundo visual**: la misma luz, grade y fondo en toda la pieza | Planos de estéticas distintas | Revisión a ojo |
| F8 | **Fondos distintos por plano** | El mismo fondo de plantilla en planos distintos (dos bombillas y el mismo vapor) | Revisión a ojo |
| F9 | **Montaje de producto**: corte seco cada 0,5–1,2 s | Transiciones de efecto (desenfoque, destello, zoom) | Duración media 0,4–1,2 s; 0 transiciones |
| F10 | **Sonido**: música con pulso + efecto de cocina por acción | Reel mudo | RMS de audio ≥ 1.500 |

## 2. Profundidad de campo: un plano de foco con nombre

**Medido (25/09/2026):** la referencia tiene nítido de media el 18 % del encuadre (10–26 %); el v3 generado, el 31 % (27–47 %). Es la diferencia más visible.

- **Vídeo y planos de acción:** f/1.8–2.8 equivalente, 50–100 mm, y **se nombra el plano de foco**: *"only the front edge of the crust and the first arugula leaves are in sharp focus; everything 3 cm behind falls into soft blur"*.
- **Still de catálogo o carta:** sigue valiendo f/4 (`02` §3), porque ahí se juzga la textura del plato entero.
- **La textura no se pierde:** se resuelve en el plano de foco. La ficha de texturas (`01`) se aplica a esa franja. El error del 24/09 fue **desenfocar el plato entero**, no usar poca profundidad de campo.
- **Rack focus con motivo:** si el foco cambia, lo hace porque cambia la acción (*"focus shifts from the hand to the falling cheese as it lands"*).
- **Coherencia:** el desenfoque crece con la distancia. Un fondo a 3 m no puede verse igual de nítido que el plato.

## 3. Luz: neutra de color, dura de forma

**Medido:** el negro (percentil 1) está a 5,8 en el v3 y a 1,8 en la referencia; el blanco (percentil 99), a 194 frente a 234. El v3 es neutro de color, que es correcto, pero **plano de forma**.

- **Balance de blancos neutro, como en `02`.** Lo que cambia es el **contraste**: la luz tiene una fuente, una dirección y una caída.
- **Cocina, proceso y fuego (por defecto en estos planos):** *low-key*:
  - fondo oscuro que cae a casi negro;
  - una luz principal dura lateral o trasera con fuente visible o motivada (la campana, el pase, la boca del horno);
  - contraluz que recorta el vapor, la harina y el queso.
- **Sala y plato servido:** luz de ventana direccional, pero con **sombra que existe**: un lado del plato más oscuro que el otro y el fondo un punto por debajo del plato.
- **Brillos especulares:** la grasa, la salsa, el aceite y el cristal deben tener puntos que lleguen casi a blanco. Sin ellos, la comida parece de cera.
- **Lo que no cambia:** la luz no se vuelve naranja. El cálido solo vive en la fuente (brasa, horno, llama) y en la comida (`02` §4–5).

## 4. Cámara con peso

**Medido:** el v3 tiene 5 planos con la cámara quieta; la referencia, 2. En la referencia el movimiento es irregular: acompaña la mano.

- **Planos de proceso y manos:** *"handheld on a small rig, subtle organic micro-shake, the operator follows the hand"*, o gimbal con ligera inercia. Un movimiento dominante con motivo (`director/03` §1–2).
- **Qué se acepta y qué no.** El cliente de Torre de Vega rechazó el *handheld* como «temblor sin intención», y está medido que paneos, dollies y órbitas sobre la comida la deforman (`director/02` §10). Se acepta solo el **seguimiento con intención de pequeña amplitud**: la cámara acompaña la mano o el objeto que se mueve, y lo que no se mueve (el plato) apenas se desplaza en el encuadre. Nunca un temblor genérico ni un recorrido que atraviese la comida.
- **Preferencia del cliente.** Si la ficha del restaurante prohíbe la cámara en mano, manda la ficha: gimbal o slider con inercia y el movimiento propio de la escena (mano, vapor, llama). Es la A/B pendiente de `00` §4.7.
- **Plano héroe:** empuje de slider lento, con recorrido en centímetros.
- **Restraint no es cámara muerta.** El principio de un solo movimiento sigue valiendo. Lo que se evita es el clip quieto al que luego se le aplica un zoom digital en montaje: se lee como plantilla.
- **Cámara lenta solo donde luce:** harina, fritura, salpicadura, hilo de queso. Se pide como *"shot at 120 fps, played back at quarter speed"*. El resto, en tiempo real.

## 5. Física con peso y desenfoque de movimiento

El fallo más fiable del vídeo generado: **objetos rápidos nítidos y lentos**. En el v3, la rúcula cae despacio, sin desenfoque, y se queda de pie; los rigatoni flotan nítidos.

Cláusula de física para cada objeto que cae, salta o vuela:

```text
PHYSICS: the arugula leaves fall fast under gravity, tumbling, and land flat on the pizza;
each leaf has natural motion blur while falling (180-degree shutter, 1/50 s);
nothing hangs in the air, nothing floats, nothing stands upright after landing.
```

- **Obturación 180°** (1/50 s a 25 fps; 1/60 s a 30 fps): con ella, lo rápido lleva estela.
- **Peso y rebote:** *"the dough sags between the hands"*, *"the sauce drips and breaks into drops"*, *"the pasta lands in the pan and slides"*.
- **Piezas diferentes:** *"irregular pieces, no two identical"* (rigatoni, rúcula, sésamo). Los objetos repetidos idénticos delatan el modelo.
- Si la física no sale en 2 tiradas, se cambia el plano: **dos estados y un sonido** (`06` §3), o metraje real.

## 6. Verbos de manos

Cada plano de proceso tiene **una mano que hace un verbo concreto**, con persona (guante, manga, reloj o antebrazo coherente) y consecuencia visible.

| Verbo | Consecuencia que se ve | Sonido |
|---|---|---|
| Enharinar la mesa | Nube de harina a contraluz | Golpe sordo |
| Estirar y girar la masa | La masa se comba y gira con inercia | Palmada |
| Espolvorear (queso, rúcula, sal) | Caída rápida, piezas que rebotan | Lluvia fina |
| Saltear | La sartén sube, la comida gira y cae | Chisporroteo, metal |
| Tirar de una porción | Hilo de queso que se estira y se rompe | Crujido |
| Verter o apretar un bote | Chorro que salpica | Chorro |
| Dar la vuelta con pinzas | Humo y marca de parrilla | Sizzle fuerte |
| Servir o levantar | El arroz se desgrana, el socarrat cruje | Rascado |
| Cerrar o emplatar | El pan aplasta, la salsa rebosa | Blando |

- La acción empieza **antes** del primer fotograma (el plano entra en marcha, `director/06` §5).
- **Nunca** ingredientes que aparecen, caen o se mueven sin una mano o una causa en el plano.

## 7. Un mundo visual por pieza

El v3 mezcla cocina oscura y dramática con sala luminosa y plana, sin transición motivada. En la referencia todos los planos comparten la misma luz, el mismo negro y el mismo grade.

- **Una pieza, una luz.** Si hay dos espacios (cocina y sala), se unen con **un grade común** y un paso motivado: el plato sale por el pase, la puerta de la cocina se abre.
- **Fondo propio en cada plano.** Si dos planos distintos comparten el mismo fondo de bombillas, el mismo vapor o la misma pared, uno se regenera con otro fondo real del local.
- El fondo sale del **inventario real** (fotos del local, `01` y `director`), nunca del «restaurante moody» por defecto del modelo.

## 8. Montaje de producto

**Medido:** la referencia corta cada 0,8 s de media (0,5–1,3 s), solo con cortes secos, y deja un plano héroe de 1,7 s. El v3 corta cada 1,1 s y usa dos transiciones de efecto (desenfoque a 1,0 s y destello a 4,9 s).

- **Solo corte seco** en comida. Como mucho, un *whip* que nace del propio gesto (la sartén que sube). **Nunca** desenfoque, destello, zoom de transición ni fundido entre planos de acción.
- **Cadencia:** un gesto por plano, cortado en el pico de la acción o justo después; 0,4–1,2 s en proceso; el plano héroe, 1,5–2,5 s.
- **Corte en el sonido:** el corte cae en el golpe (el pulso de la música o el sizzle), no en el silencio (`openmontage/02`).
- **Sin repetir el mismo plano** como apertura y cierre salvo que el concepto lo pida; si se repite, cambia el tamaño o el estado (antes y después).

## 9. Sonido obligatorio

Un reel de comida sin sonido **no se entrega** (puerta E). Capas mínimas:

1. **Música con pulso**, con licencia o sonido original (README §11), que marca los cortes.
2. **Un efecto por acción** (tabla de §6), 10–20 ms antes del corte o en el golpe.
3. **Ambiente** bajo: cocina o sala, según el plano.

Origen, de mejor a peor:
- sonido real grabado en el local;
- biblioteca con licencia;
- audio de Seedance 2.5 con marcadores `<the pasta hits the pan with a sharp sizzle>` (`04` §3), revisado a oído.

## 10. Postproducción que une

Lo que no se pide en el prompt (porque degrada el encuadre, `06` §2) se hace en montaje y **igual en todos los planos**:

- **Grade común:** negros a 0–3, brillos a 225–245, saturación del producto un punto por encima del fondo.
- **Grano fino común** sobre toda la pieza (Remotion o ffmpeg). Une planos de distinto origen y rompe el microdetalle uniforme del reescalado.
- **Microdetalle:** si el clip reescalado sale con nitidez uniforme de borde a borde (en el v3, 4 veces la de la referencia), se prueba un suavizado de 0,3–0,5 px antes del grano. **Hipótesis sin medir**: se valida en la A/B del informe de pruebas §7.

## 11. Bloques de prompt

Se añaden a los bloques fijos de `04` §2, **después** de PRESERVE y **antes** de la coda.

**CAPTURE** (vídeo de proceso, manos o fuego):

```text
CAPTURE: shot like a real food commercial on a cinema camera, 50mm at f/2,
180-degree shutter so fast motion has natural blur. Only [FOCAL PLANE] is in sharp focus;
everything a few centimetres behind falls into soft blur. Handheld on a small rig with
subtle organic micro-shake, the operator follows the hand. Real-time except [SLOW MOMENT],
shot at 120 fps and played at quarter speed.
```

**LIGHT · LOW-KEY** (cocina y proceso):

```text
LIGHT: low-key kitchen. One hard key light from [SIDE/BEHIND], motivated by [SOURCE: the extractor hood,
the pass, the oven mouth]; the background falls to near-black. A rim of backlight catches
the steam, the flour and the edges of the food. Neutral white balance: whites stay white,
warm tones exist only in [the flame, the crust]. Deep blacks and specular highlights on
the oil and sauce.
```

**PHYSICS** (cualquier objeto que cae, salta o se estira): la cláusula de §5.

**HANDS** (verbo de §6):

```text
ACTION: [ONE HAND / TWO HANDS OF THE SAME PERSON] in [black nitrile gloves / rolled white sleeve]
[VERB] the [INGREDIENT]; the action is already in motion in the first frame and its consequence
is visible: [CONSEQUENCE]. Nothing moves without a hand or a cause.
```

**Negativos de rodaje** (en el NEGATIVE de `04`): *"no floating objects, no slow-motion drift, no objects standing upright after landing, no identical repeated pieces, no deep focus across the whole frame, no flat even lighting, no locked-off camera unless stated"*.

## 12. Revisión automática y umbrales

Antes de la puerta D (clip) y de la puerta E (montaje):

```bash
python3 skills/openmontage/scripts/medir_realismo.py reel.mp4 [referencia.mp4]
```

| Medida | Objetivo | Si falla |
|---|---|---|
| Duración media de plano | 0,4–1,2 s | Recortar al pico de la acción |
| Encuadre en foco | 8–25 % | Regenerar con CAPTURE y el plano de foco nombrado |
| Planos con cámara quieta | ≤ 2 | CAPTURE con cámara en mano |
| Negro p1 / blanco p99 | ≤ 3,5 / ≥ 220 | Grade común (§10); si el keyframe es plano, LIGHT low-key |
| Audio RMS | ≥ 1.500 | Capas de §9 |
| Transiciones de efecto | 0 (indicativo; confirmar a ojo) | Cambiar por corte seco |

Los umbrales salen de **una** referencia medida. Son orientativos hasta repetir la medición con 3–5 reels de producto más (queda en `00` §4). Un plano puede saltarse un umbral **a propósito** si la lista de planos lo justifica: una cenital quieta de cierre, por ejemplo.

Y siempre, a ojo, fotograma a fotograma en el plano héroe (`06` §4):
- ¿algo flota?
- ¿algo cae sin estela?
- ¿algo se queda de pie donde debería caer?
- ¿se repite una pieza idéntica?
- ¿hay una mano sin dueño?

## 13. Material real primero

La referencia gana, sobre todo, porque cada plano es una acción real. En Society:

1. **Planos de manos, fuego, masa y salteado:** primero se pide al local una **sesión corta con el móvil**: 20–30 min, 4K y 60 fps, luz lateral o de la campana, fondo oscuro y sonido de cada gesto. Se genera solo lo que no se pudo grabar bien.
2. **Plano héroe del plato:** generado desde el keyframe anclado (`01`, `04`) o fotografiado.
3. **Sala:** foto o vídeo real del local; generado solo si el local no puede grabarla.

Esta regla amplía la ya vigente («si hay metraje real de brasa, fuego o textura caótica, no se genera»): ahora el metraje real **se pide activamente** antes de generar planos de acción.
