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
