# 02 · Luz y color

Por qué la luz cálida delata a la IA en comida, cómo impedir que el modelo de vídeo caliente y oscurezca el keyframe, y cómo controlar el color con asignación positiva en lugar de negativos. Sustituye, para comida y locales, a las codas cálidas de [`../knowledge/05-biblia-hiperrealismo.md`](../knowledge/05-biblia-hiperrealismo.md) §3 y §5 (→ [`00-precedencia-y-correcciones.md`](00-precedencia-y-correcciones.md) §2.1).

## Índice

1. El color se estropea en dos fases
2. Luz por defecto
3. Bokeh, fondo y profundidad de campo
4. Asignación positiva del color
5. Luz motivada: cuándo sí hay calidez
6. Paletas por tipo de cocina
7. Cómo medirlo
8. Estilo "estudio de fotografía" y una sola luminosidad por pieza (R-LUZ-01)

---

## 1. El color se estropea en dos fases [MEDIDO 24/09/2026]

| | Rojo/azul (temperatura) | Luminancia mediana |
|---|---|---|
| Foto real del nigiri | 1,47 | 151 |
| Keyframe generado | 1,39 | 105 |
| Fotograma del vídeo final | 1,57 | 63 |

- **Fase 1, imagen:** el keyframe ya salió bastante más oscuro que la foto real (105 frente a 151).
- **Fase 2, vídeo:** Seedance **calentó y oscureció** el keyframe (1,39 → 1,57 de temperatura; 105 → 63 de luminancia).
- **Causa en el prompt:** el prompt empujaba justo en esa dirección (3300 K, "warm amber", bokeh dorado).

Consecuencia: hace falta corregir **los dos prompts**. El de imagen fija la exposición y la temperatura; el de vídeo obliga a conservarlas.

## 2. Luz por defecto

**Luz de día neutra, unos 5000 K.** No es una preferencia estética: la luz naranja exagerada y el bokeh dorado son, junto con la piel de plástico, la firma más reconocible del contenido generado. Además, en el restaurante real la comida no se ve naranja: el cliente que entra notaría la diferencia.

Texto para el campo `lighting`:

> "Natural window daylight, neutral white balance around 5000K so the linen reads off-white, never orange. Directional key with soft edges; the room gently lifts the shadows so they keep detail."

- **Neutra de color, no plana de forma** [MEDIDO 25/09/2026]: en cocina, proceso y fuego, luz *low-key* dura y motivada con negros profundos y brillos especulares. El párrafo de arriba es para la sala y el plato servido. → [`08-firma-de-rodaje-real.md`](08-firma-de-rodaje-real.md) §3
- **Termómetro rápido:** el mantel o cualquier blanco de referencia debe leerse blanco roto. Si se ve crema o naranja, la temperatura se ha ido.
- **Luz direccional de bordes suaves:** ni plana ni de flash.
- **Sombras con detalle:** la sala las levanta; no se cierran a negro.
- **Contraluz para vapor y brillo** (del oficio de fotografía de comida, pixelab [COMUNIDAD]): el vapor, el glaseado y las burbujas se ven gracias a una luz por detrás. Se admite, **pero con la misma temperatura neutra**: "backlight from a window behind the dish so the steam reads, same neutral daylight".

## 3. Bokeh, fondo y profundidad de campo

- **Bokeh gris parduzco, nunca dorado:** *"background bokeh neutral grey-brown, not golden."* El dorado es un cliché de stock y en Seedance arrastra toda la temperatura del plano.
- **Vídeo y planos de acción** [MEDIDO 25/09/2026]: plano de foco fino con nombre (f/1.8–2.8), no f/4. → [`08-firma-de-rodaje-real.md`](08-firma-de-rodaje-real.md) §2
- **Still de catálogo: f/4 con 85 mm** para platos (`lens_mm 85, aperture_f 4.0, iso 200`). La textura se resuelve en el plano de foco. La regla de coherencia de `knowledge/05` §3.3 sigue valiendo: si el fondo está lejos, se desenfoca aunque la apertura sea f/4.
- **Qué plano se queda nítido:** dilo siempre. *"The whole plate in sharp focus, background falling into soft bokeh"*. "Blurry background" a secas puede desenfocar también el plato (OSideMedia [COMUNIDAD]).

## 4. Asignación positiva del color

**Caso de campo** (estudio de Higgsfield, recogido por OSideMedia [COMUNIDAD]): una película con pasillos verde azulado frío acababa amarilla cálida, porque las referencias traían ventanas encendidas y lámparas cálidas que el modelo amplificaba. **Las listas "no yellow" no sirvieron.** Funcionó asignar el color en positivo, con presupuesto y condición de fallo:

```text
The dominant colour must be cold teal-green. Yellow exists only inside
the lamp bulb and a palm-sized halo beneath it. If the frame turns
yellow, the frame is wrong.
```

La cláusula tiene tres partes: el color dominante, **dónde y cuánto** puede aparecer el color problemático, y una prueba que el modelo puede aplicar a su propia salida.

**Versión para comida** (añadir al prompt de imagen y al de vídeo):

```text
The dominant light is neutral daylight around 5000K: the linen is off-white
and the plate is white. Warm tones exist only in the food itself (the seared
crust, the wood of the board). If the linen turns cream or orange, the frame
is wrong.
```

**Reescribir un elemento de la referencia en positivo:** si una referencia trae algo que no se puede recortar (una lámpara naranja, un neón), se declara como hecho del mundo de la pieza: *"The orange pendant lamp in the reference is switched off in our scene."*

**Estado:** probado en otro contexto (color de escena en cine), no en comida. Está en la lista de A/B pendientes (`00` §4.5).

## 5. Luz motivada: cuándo sí hay calidez

La calidez es correcta cuando **tiene una fuente visible y la pide el brief**: velas en una cena, la brasa encendida, la lámpara de una barra de noche. Entonces:

- Se nombra la fuente y su alcance: *"lit by a single candle on the left; its warm glow reaches only the glass and the near edge of the plate; the rest of the room stays neutral."*
- Se asigna el color (§4), no se aplica un grade general.
- Se respeta la temperatura real del local: si el local tiene luz fría, no se inventa luz cálida.

## 6. Paletas por tipo de cocina

Orientación de la comunidad (pixelab [COMUNIDAD]). Son colores **del plato y de la escena**, no un grade que tiña la imagen:

| Cocina | Paleta dominante |
|---|---|
| Alta cocina | blancos, negros, dorados, tonos joya, verdes profundos |
| Comida rápida / informal | rojos saturados, naranjas, amarillos, verdes vivos |
| Cafetería | marrones cálidos, cremas, blancos |
| Asiática | rojos, marrón soja, verdes vivos, blancos, aceites dorados |
| Mediterránea | verdes profundos, amarillos, tomate rojo, quesos blancos, oliva |
| Brasa / asador | negros de carbón, grises humo, centros rosados de la carne, salsas rojas y marrones |
| Postres | chocolates, caramelos, pasteles, blancos, frutos rojos |
| Cócteles | ámbar, cristalino, rojo rubí, acentos de cítrico o hierba |

Regla: el color vive en la comida; la luz sigue neutra. Una hamburguesa puede ser muy roja y amarilla con luz de 5000 K.

## 7. Cómo medirlo

Se miden con PIL o ffmpeg, en 5 fotogramas, sobre la foto real, el keyframe y el vídeo:

- Relación rojo/azul (temperatura).
- Luminancia mediana y percentiles 5 y 95 (exposición y rango).
- Saturación media.

Si el fotograma del vídeo se aleja del keyframe en temperatura o luminancia, el problema está en el prompt de vídeo. Si el keyframe se aleja de la foto real, el problema está en el prompt de imagen. Protocolo completo en [`07-recreacion-de-referencia.md`](07-recreacion-de-referencia.md) §1.

## Bloque fijo para vídeo

```text
PRESERVE EXPOSURE AND COLOUR: same brightness and white balance as the reference images, neutral daylight around 5000K. Do not warm up, darken or add an orange cast.
```

Va siempre acompañado de la cláusula de asignación positiva de §4 (→ [`04-bloques-de-prompt.md`](04-bloques-de-prompt.md) §2).

## 8. Estilo "estudio de fotografía" y una sola luminosidad por pieza (R-LUZ-01) [MEDIDO, 25/09/2026]

### 8.1 Qué quiere decir el cliente con "como un estudio de fotografía"

No habla del plato ni del encuadre: habla de **la luminosidad de toda la fotografía**. El fondo está oscurecido y **el único sitio donde vive la luz es el protagonista**, igual que en un estudio profesional con un foco sobre el producto y el resto del set sin luz.

**Imagen patrón:** keyframe K4 de Da Tonino, rigatoni saltando en la sartén (`84a4353e-e0e3-46d3-b370-c05c49f9dad7`, `pruebas/reel-da-tonino-2026-09-25/keyframes/K4-rigatoni.jpg`). Medido a 180×320:

| Métrica | Valor | Qué significa |
|---|---|---|
| Luminancia mediana | **25** (de 255) | El fotograma, en conjunto, es oscuro |
| p5 / p95 / p99 | 3 / 115 / 178 | Negros profundos; las luces no llegan a quemarse (solo el 1 % > 180) |
| Píxeles en sombra (< 40) | **65 %** | Dos tercios del encuadre están casi negros |
| Sujeto frente a fondo | **2,5×** más luz en la zona sartén+pasta | La mirada va sola al protagonista |
| Alimento frente al resto | **4,1×** (pasta 133 frente a 33) | El alimento es lo más brillante del encuadre |
| Relación rojo/azul | 1,24 | El balance de blancos sigue **neutro**: oscuro no quiere decir naranja |

Cómo está construida la luz (observado):

- **Una sola fuente dura de contra/lateral** que recorta el vapor, la salsa y los bordes de la pasta. La cara del fondo que da a cámara no recibe luz.
- **El fondo existe, pero 1,5–2 pasos por debajo:** el acero, la campana y el fogón se leen como formas, sin detalle que compita.
- **Únicas luces en el fondo:** puntos pequeños (bombillas, la llama azul), que dan profundidad sin iluminar el set.
- **Nada blanco ni brillante fuera del sujeto.**

Texto para el campo `lighting` cuando el brief pide este estilo:

> "Studio product lighting: a single hard neutral key (about 5000K) from behind and to the side of the subject, rim-lighting its edges and the steam. The subject is the brightest thing in the frame; the background sits two stops darker, readable as shapes but with no competing detail, lit only by a few small practical bulbs as points. Deep blacks, no fill on the background, highlights never clipped. Neutral white balance, not orange."

**Excepción a §2:** en este estilo, "las sombras con detalle" y "la sala levanta las sombras" **no se aplican al fondo**, que va a negro a propósito. Sigue valiendo todo lo demás: temperatura neutra, sin naranja y luces sin quemar.

### 8.2 Regla: una sola luminosidad por pieza

**Si una pieza (o una campaña) elige un estilo de luz, todas sus imágenes y vídeos van con ese estilo. Mezclar luminosidades destruye la inversión:** la pieza deja de parecer una producción y se lee como material de fuentes distintas.

- **Caso Da Tonino, v3 [MEDIDO]:** mezcla dos mundos. Los planos de cocina (K2–K4) son de estudio, con mediana de 25–65 y 41–65 % de sombras. Los de sala (K1 y K5) son de luz de día, con mediana de 142–145 y 8–10 % de sombras. El salto es de ~2,5 pasos en cada corte sala↔cocina. Es exactamente lo que este punto prohíbe.
- **Puerta A (director):** el estilo de luz se decide **una vez** para toda la pieza y queda escrito en el prefijo global de la lista de planos. Si la referencia es de estudio, todos los planos son de estudio, **incluidos los de sala**: la sala se retrata como un set, con el plato iluminado y el comedor en penumbra con las lámparas del local como puntos.
- **Puerta C (hoja de contactos):** antes de animar nada se mide la **mediana de luminancia y el % de sombras (< 40)** de todos los keyframes. Tolerancia propuesta: mediana dentro de ±40 % de la del keyframe patrón y % de sombras a ±15 puntos (**hipótesis**, a validar). Un keyframe fuera del rango se regenera, no se "arregla en montaje".
- **Montaje:** el grade puede igualar pequeñas diferencias, pero **no** convierte un plano de luz de día en uno de estudio. Oscurecer un fondo iluminado da un plano sucio, no de estudio.
- **Medición:** con el mismo script de §7 (luminancia mediana, p5, p95, % < 40) sobre cada keyframe y sobre 1 fotograma por toma del vídeo.
- **Qué medir para comparar la coherencia: el fondo, no la media global.** Un macro o un primer plano llena el encuadre de comida y sube la mediana global sin cambiar el estilo (en una serie de estudio coherente, la mediana global va de 6 a 53). La luminosidad del estilo la da el **fondo**: se mide la mediana de la zona sin sujeto (p. ej., el tercio reservado al texto) y debe quedar en el mismo rango en todas las piezas (en esa serie, 4–14). Una imagen con el fondo fuera de rango (una ventana con luz de día, un rótulo de la calle iluminado) se regenera.
- **Aviso en el prompt de sala:** "night, the street windows are black glass, no daylight, the pendant lamps are the only light sources". Sin esa frase, el modelo copia la luz de día de la foto real del local.
