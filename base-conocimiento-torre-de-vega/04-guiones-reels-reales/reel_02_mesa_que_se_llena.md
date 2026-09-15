# Guion ejecutable — Reel 02 "La mesa que se llena"

Fecha: 2026-09-08 · Estado: **BLOQUEADO, pendiente de decisiones del cliente** (ver §8)

> Este fichero está escrito para que una IA lo ejecute sin reconstruir el razonamiento. Contiene los
> parámetros exactos, los prompts finales en inglés y las rutas reales de referencia. Antes de
> ejecutar nada, leer §8 (bloqueos) y la skill `after-effects-reels`.

---

## 1. Origen y análisis de la plantilla

- **Vídeo base:** `imagenes/generadas/Grabación 2026-09-08 005128.mp4` (aportado por el cliente).
- **Propiedades:** 608×1080, 30 fps, 8,96 s, 269 fotogramas, con pista de audio.
- **`media_id` en Higgsfield:** `96f9ac03-975d-4216-8a03-e58c088ef004`
- **`video_analyze_id`:** `f24ef0ce-c51a-48b0-9b18-c2b885646c4d`
- **`job_id` de virality:** `e0cf97a0-985d-4215-a629-1465d286722d`

### Puntuación medida (Virality Predictor)

| Métrica | carne.mp4 (Reel 01) | Nuestro Reel 01 v4 | **Esta plantilla** |
|---|---|---|---|
| hook_score | 25 | 25 | **29** |
| overall_score | 41 | 40 | **44** |
| viral_potential | 40 | 38 | **41** |
| sustain | 95 | 96 | **100** |
| brain_engagement | 31 | 30 | **34** |
| Corteza visual (media) | — | 0,443 | **0,525** |
| Atención frontoparietal (media) | — | 0,269 | **0,329** |

`global_scores_by_frame` = `[0.345, 0.345, 0.344, 0.341, 0.339, 0.347, 0.348, 0.349, 0.347]`

**Curva plana y alta** (0,339–0,349), frente a 0,290–0,315 del nuestro: ~15 % por encima durante
todo el vídeo. Por eso el sustain es 100 — no hay un solo momento flojo. La atención frontoparietal
**hace pico en t=0** (0,356), justo lo contrario que en el Reel 01, donde se hundía en el hook.

### Por qué gana

Confirma lo ya medido en el Reel 01: **lo que sube la activación es la complejidad visual por
fotograma**. Una mesa con seis platos tiene mucha más información que un plato solo, y en formato de
acumulación cada corte añade algo nuevo sin obligar al espectador a reorientarse.

### Estructura detectada

Cortes detectados con `ffmpeg` (`select='gt(scene,0.2)'`), en segundos:
`0.855 1.255 1.322 1.988 2.522 2.622 3.188 3.755 3.955 5.255 5.322 6.255`

13 segmentos en 8,96 s. Tres de ellos duran **0,07 s** (1.255→1.322, 2.522→2.622, 5.255→5.322): son
**destellos** que tapan el momento en que una mano entra o sale.

Desglose de Higgsfield (5 escenas, menos granular):

| # | t | Plano | Contenido |
|---|---|---|---|
| 1 | 0:00-0:01 | Medium | Manos con pulseras dejan tabla de carne sobre mesa de piedra gris. Banqueta de terciopelo verde al fondo. |
| 2 | 0:01-0:02 | Close-Up | Una mano levanta copa de vino blanco. **Cámara panea a la derecha**. |
| 3 | 0:02-0:03 | Close-Up | **Paneo a la derecha** sobre botella y mano con cóctel naranja. |
| 4 | 0:03-0:05 | Close-Up | **Paneo a la izquierda** sobre carpaccio y tuétano con pan tostado. |
| 5 | 0:05-0:08 | Wide | **Zoom-out** a la mesa completa. Una mano añade un cuenco de pan. |

**Corrección importante:** la extracción de fotogramas sueltos hacía parecer que la cámara estaba
fija. No lo está — hay paneos lentos y un zoom-out final. Son movimientos lentos sobre una escena
estática.

---

## 2. Qué se copia y qué NO

| | |
|---|---|
| ✅ **Estructura** | Mesa que se llena plato a plato, misma cámara, paneos lentos, destellos de 0,07 s tapando cortes, zoom-out final a la mesa completa. |
| ✅ **Ritmo** | 13 segmentos en ~9 s, cortes de 0,4-0,9 s, plano final largo de ~2,4 s como recompensa. |
| ❌ **Look** | La plantilla es un restaurante urbano de gama alta: terciopelo verde, mármol, cócteles. Torre de Vega es mantel blanco, ladrillo visto y sillas de mimbre. Copiar el look **rompe la regla 1** de `imagenes/reglas_imagenes.md`. |
| ❌ **Platos** | Nada de carpaccio ni tuétano. Van los platos reales de la casa, anclados a fotos reales. |

---

## 3. Guion propuesto (~9 s, 10 planos)

Superficie base en todos los planos: `imagenes/local/mantel_blanco.jpg` (mantel blanco liso real,
sobre mesa cuadrada, con ladrillo visto y silla de mimbre al fondo).

| # | t | Plano | Qué entra | Cómo se produce |
|---|---|---|---|---|
| 1 | 0,0–1,1 | Apertura | Mesa vestida vacía. Manos de mujer dejan la tabla del solomillo a la brasa. | **Vídeo** |
| 2 | 1,1–1,2 | Destello | — | AE |
| 3 | 1,2–2,2 | Paneo dcha. | Entra copa de vino + botella. | Imagen + paneo AE |
| 4 | 2,2–3,2 | Paneo dcha. | Entran gildas + croquetas. | Imagen + paneo AE |
| 5 | 3,2–3,3 | Destello | — | AE |
| 6 | 3,3–4,4 | Paneo izda. | Entran gambas + pulpo. | Imagen + paneo AE |
| 7 | 4,4–5,4 | Paneo izda. | Entran ensalada de cabra + patatas bravas. | Imagen + paneo AE |
| 8 | 5,4–5,5 | Destello | — | AE |
| 9 | 5,5–6,6 | Cierre de mesa | Mano de hombre deja el último plato: el jamón. | **Vídeo** |
| 10 | 6,6–9,0 | Recompensa | Zoom-out lento a la mesa completa. | **Vídeo** |

### Cumplimiento de reglas

- **Regla 2 (sin cara):** ninguna cara en ningún fotograma. Solo manos y antebrazos.
- **Regla 13 (género de manos):** plano 1 mano de mujer, plano 9 mano de hombre. Predominan las de
  mujer en el conjunto de la pieza.
- **Regla 1 (nada inventado):** toda superficie y vajilla anclada a foto real.
- **Regla 11:** ningún plano de cuchillo cortando dominando el encuadre.
- **Memoria `feedback-nunca-mostrar-plato-comido`:** todos los platos intactos, ninguna copa vacía.

---

## 4. Fotos reales de referencia (rutas verificadas)

| Elemento | Ruta |
|---|---|
| Mantel / mesa base | `imagenes/local/mantel_blanco.jpg` |
| Solomillo a la brasa | `imagenes/comida/solomillo.jpg`, `imagenes/comida/solomillo_cortado.jpg` |
| Copa de vino | `imagenes/vinos/copa-vino.jpg`, `imagenes/vinos/copa-vino-grande.jpg` |
| Botella / jarra | `imagenes/vinos/jarra-vino-formal.jpg` |
| Gildas | `imagenes/comida/gildas.jpg` |
| Croquetas | `imagenes/comida/croquetas.jpg` |
| Gambas | `imagenes/comida/gambas.jpg` |
| Pulpo | `imagenes/comida/pulpo.png` |
| Ensalada de cabra | `imagenes/comida/ensalada_cabra.jpg` |
| Patatas bravas | `imagenes/comida/patatas-bravas.jpg` |
| Jamón | `imagenes/comida/jamon.jpg` |
| Vajilla blanca | `imagenes/local/plato-blanco-formal.jpg` |

⚠️ `imagenes/comida/gildas.jpg` es una **bandeja de barra**, no un plato emplatado. Hay que pedir
explícitamente el emplatado en plato de la casa.

---

## 5. Producción — TODOS los planos se generan como vídeo

> ⚠️ **Corregido el 2026-09-08 por indicación del cliente.** La versión anterior de este guion
> proponía resolver 6 de los 10 planos como **imagen fija + paneo en After Effects** para ahorrar
> créditos. **Es un error y no se hace.**
>
> Una foto paneada está *más* congelada que un clip con cámara estática: no tiene humo, ni vapor, ni
> respiración de enfoque, ni micro-vida de ningún tipo. Es justo el fallo que documenta la **regla 5**
> de `reglas_videos.md` — el cliente ya lo señaló una vez ("se nota muchísimo que es IA") y lo ha
> vuelto a recordar.
>
> **Norma:** cada plano visible se genera como vídeo, con micro-movimiento de cámara y movimiento
> físico real en la escena. La imagen fija solo se usa como *keyframe de partida* (regla 1), nunca
> como plano final. Excepción únicamente si un plano concreto lo justifica y el cliente lo aprueba.

### Qué sí se sigue haciendo en After Effects

Los **paneos y el push/pull de cámara sobre los clips ya generados** — animando escala y posición
sobre el vídeo, no sobre una foto. Eso mantiene la vida del clip y sigue costando cero créditos,
además de evitar pedirle macro-movimiento al modelo (que es lo que provoca el morphing).

### Fase A — imágenes fijas encadenadas

```
model: "nano_banana_pro"
aspect_ratio: "9:16"
resolution: "2k"          ← 2K, no 1k: hace falta margen para panear en AE
medias: [{role: "image_references", value: <media_id de las fotos reales>}]
```

**Encadenado obligatorio:** generar la imagen 1 (mesa + primer plato), y usar **esa imagen como
`image_references` de la imagen 2**, y así sucesivamente. Es lo que mantiene la mesa, la luz y el
encuadre idénticos entre planos. Sin encadenar, cada imagen sale de una mesa distinta y el efecto de
acumulación se rompe.

Coste: **2 créditos por imagen**, igual a 1k que a 2k → generar siempre a 2k.

### Fase B — solo 3 vídeos

Únicamente donde hay movimiento real que la imagen no puede dar:

| Plano | Modelo | Parámetros | Créditos |
|---|---|---|---|
| 1 · manos dejan la tabla | Caso 3 (anatomía) `minimax_hailuo` | `variant: "minimax-2.3", duration: 6, resolution: "1080"` | 10,00 |
| 9 · mano deja el jamón | Caso 1 `kling3_0` | `mode: "std", duration: 3, sound: "off"` | 4,50 |
| 10 · zoom-out mesa completa | Caso 1 `kling3_0` | `mode: "std", duration: 3, sound: "off"` | 4,50 |

> El plano 1 lleva el caso 3 porque es el hook y porque las manos sobre un objeto son justo donde los
> modelos baratos se rompen (ver Reel 01, escena "manos sirviendo"). El plano 9 es una sola mano con
> acción simple, así que basta el caso 1.

### Fase C — montaje en After Effects

Composición: **1080×1920, 24 fps, ~9 s**.

- Paneos de los planos 3, 4, 6 y 7: animar `Transform > Position` sobre las imágenes 2K
  sobredimensionadas. Alternar dirección (dcha., dcha., izda., izda.) igual que la plantilla.
- Destellos (planos 2, 5, 8): 2 fotogramas a 24 fps. Duplicar la capa anterior con
  `ADBE Black&White` + `ADBE Invert`, igual que en el Reel 01.
- Escala base **100,4 %** si el metraje sale a 1076×1924.
- Grade por escena con `ADBE Exposure2` + `ADBE Vibrance` (valores en la skill §7).
- Tipografía: **estándar aprobado** — `BodoniMT` Regular, titular 70 px / tracking 400, marca 40 px /
  tracking 640, sin contorno, `ADBE Drop Shadow` con `Distance 0 / Softness 70 / Opacity 200`, filete
  de 2 px al 70 %. Ver skill §8.
- ⚠️ **Contraste texto/fondo:** este Reel es de mantel blanco, es decir **fondo claro**. El texto
  blanco del Reel 01 **no vale aquí**. Comprobar renderizando frames del tramo entero y, si hace
  falta, usar texto oscuro o reubicarlo sobre una zona de sombra.

---

## 6. Presupuesto (corregido — todo vídeo)

7 planos visibles + 3 destellos que se hacen en AE. Cada plano visible se genera como vídeo.

| Concepto | Desglose | Créditos |
|---|---|---|
| Keyframes (regla 1) | 7 imágenes `nano_banana_pro` 2k × 2 | 14,00 |
| Plano de manos (caso 3) | `minimax_hailuo` 2.3, 6 s, 1080 | 10,00 |
| Resto de planos (caso 1) | 6 × `kling3_0` std, 3 s | 27,00 |
| Paneos y push/pull | After Effects sobre los clips | 0,00 |
| Destellos B/N invertido | After Effects | 0,00 |
| **TOTAL** | | **51,00** |

> El presupuesto anterior de este guion decía 31 créditos, pero contaba con resolver 6 planos como
> fotos paneadas. Al hacerlo bien —todo vídeo— el coste real es **51**. La diferencia es el precio de
> que no se note que es IA.

Saldo a 2026-09-08: **5 créditos**. Hay que recargar.

> Nota: `virality_predictor`, `video_analysis_create` y `get_cost` **no consumen créditos** en el plan
> Plus. Verificado: el saldo no se movió tras seis análisis de viralidad. Medir es gratis; generar no.

---

## 7. Prompts finales (inglés)

> **Dos reglas que gobiernan estos prompts y que es fácil incumplir:**
> - **Regla 5** — nunca pedir `"static camera"` a secas: congela el plano y el cliente ya lo detectó
>   ("se nota muchísimo que es IA"). Se pide un **recorrido mecánico pequeño** (slider motorizado,
>   regla 11) y se prohíbe el **macro** (paneo, dolly, órbita, zoom) y el **handheld**.
>
> ⚠️ **Corregido el 2026-09-14, antes de ejecutar.** Estos prompts pedían *handheld micro-drift*
> (rechazado, regla 11), el plano 1 iba en `minimax_hailuo` (**prohibido**, regla 15) y los planos 9 y
> 10 en `kling3_0 std` (resolución sin verificar). Ya están cambiados abajo. **Siguen pendientes de
> reescribirse con la plantilla PRESERVE / MOTION / CAMERA / FILM GRADE** (regla 11) antes de lanzar:
> la estructura en prosa de aquí es anterior a esa obligación.
> - **Regla 6** — con manos, **un único movimiento breve al principio** y luego las manos quietas y
>   estables. Nunca un gesto continuo durante los 3 s: los dedos se deforman y la joyería parpadea.

### Plano 1 — apertura, manos dejan la tabla (`seedance_2_0` std 1080p 4 s, `start_image` + `end_image`)

```
A woman's hands place a wooden board of sliced grilled beef sirloin with
padron peppers onto a plain white cotton tablecloth on a square table.
The hands set the board down in the first second and then rest completely
still and stable for the remainder of the shot — same fingers, no jewellery,
identical position in every frame, no regripping, no finger movement.
The board and the food remain the same board and the same food throughout,
never shifting, morphing or changing shape.
The camera is on a locked tripod, framed identically on the first and last
frame; no handheld operation, no shake, no drift.
Exposed red brick wall and a wicker chair softly out of focus behind.
Warm interior light 3000K, cinematic, film grain, shallow depth of field.
Negative: no face, no head, no camera pan, no dolly, no orbit, no zoom,
no rotation, no knife, no cutting action, no deer head, no antlers,
no marble table, no green velvet booth.
```

### Plano 9 — mano deja el jamón (`kling3_0` pro)

```
A man's hand places a white ceramic plate of sliced Iberian ham onto a
table already covered with dishes. The hand completes the movement in the
first second and then stays completely still and stable — same fingers,
same position in every frame, no regripping.
Every other dish on the table remains the same dish throughout, never
shifting, morphing or changing shape.
A single slow move on a motorised slider with a geared head: the camera
pushes in about three percent at constant speed from the first frame to the
last. Perfectly stabilised, no handheld operation, no shake, no jitter.
Plain white tablecloth, exposed red brick background. Warm interior light
3000K, cinematic, film grain.
Negative: no camera pan, no dolly, no orbit, no zoom, no rotation, no face,
no second hand, no knife, no deer head, no antlers.
```

### Plano 10 — apertura de encuadre a la mesa completa (`kling3_0` pro)

```
A full table of Spanish dishes on a plain white tablecloth: grilled sirloin
board, Iberian ham, gildas, croquettes, prawns, octopus, goat cheese salad,
patatas bravas, wine glass and bottle. Steam still rising gently from the
grilled meat.
All the food remains the same food throughout, never shifting, morphing or
changing shape.
A single slow lateral move on a motorised slider with a geared head, about
three percent of travel at constant speed from the first frame to the last.
Perfectly stabilised, no handheld operation, no shake, no jitter.
Exposed red brick wall and wicker chairs behind. Warm interior light 3000K,
cinematic, film grain.
Negative: no hands, no face, no people, no camera pan, no dolly, no orbit,
no zoom, no rotation, no deer head, no antlers, no marble, no green velvet.
```

> **El zoom-out final se hace en After Effects**, no se le pide al modelo. Generar el plano con
> encuadre amplio y micro-movimiento, y animar en AE `Transform > Scale` de ~112 % a ~101 % sobre los
> 2,4 s del plano. Así se consigue la recompensa de la plantilla sin arriesgar morphing en el plano
> con más comida de todo el Reel — que es justo el que más tiene que perder.

---

## 8. BLOQUEOS — resolver antes de ejecutar

1. **Mesa llena.** En el Reel 01 la escena de "mesa llena" **se descartó por completo a petición del
   cliente** (ver `documentación.md`). Esta plantilla entera *es* una mesa que se llena. La lectura
   es que se rechazó por ejecución (mantel y fondo inventados, mesa flotando) y no por concepto, y
   que al traer el cliente esta plantilla el concepto vuelve a estar aprobado — **pero hay que
   confirmarlo explícitamente antes de generar**.
2. **Selección de platos.** Los 9 propuestos tienen foto real. Falta el visto bueno del cliente sobre
   cuáles entran.
3. **Saldo.** Hacen falta ~31 créditos; hay 5.
4. **Regla 1 de `reglas_videos.md`:** las imágenes fijas se aprueban **todas** antes de animar
   ninguna. No lanzar `generate_video*` sin aprobación explícita del lote de imágenes.
