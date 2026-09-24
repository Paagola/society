# 04 · Bloques de prompt para comida y locales

Plantillas listas para adaptar. Se integran en el método de dos partes (JSON Decoded Brief + párrafo NL) de [`../knowledge/00-metodologia-promptdirector.md`](../knowledge/00-metodologia-promptdirector.md): estos campos se **añaden** al brief, no lo sustituyen. Prompts en inglés; conversación en español.

## Índice

1. Imagen: campos añadidos al JSON Decoded Brief
2. Vídeo: bloques fijos y orden
3. Seedance 2.5: sintaxis de referencias y audio
4. Reglas de escritura
5. Ejemplo completo: plano héroe de brasa

---

## 1. Imagen: campos añadidos al JSON Decoded Brief

```json
{
  "reference_roles": "@image1 = real photo of the dish, for identity: shape, portion, plating, tableware. @image2 = real texture sheet. Match the surface textures of @image2 exactly: grain size, matte vs wet, cracks, fibres. Do not copy its layout. @image3 = template frame, only for camera angle, framing and light direction; the real photos govern the room, the food and the tableware.",
  "lighting": "Natural window daylight, neutral white balance around 5000K so the linen reads off-white, never orange. Directional key with soft edges; the room gently lifts the shadows so they keep detail. Background bokeh neutral grey-brown, not golden.",
  "colour_allocation": "The dominant light is neutral daylight around 5000K: the linen is off-white and the plate is white. Warm tones exist only in the food itself. If the linen turns cream or orange, the frame is wrong.",
  "camera": {"lens_mm": 85, "aperture_f": 4.0, "iso": 200, "lens_to_subject_m": 0.6, "subject_to_bg_m": 3},
  "composition": "Vertical 9:16, 45-degree three-quarter angle, plate in the lower-middle third, negative space above for on-screen text",
  "scale": "The plate is 27 cm across; exactly five slices of meat, fanned left to right",
  "texture": {
    "tamago": "matte egg surface with fine pores, thin layer lines, one or two small cracks, faint browned spots, no shine",
    "rice": "individual grains 5-7 mm, slightly translucent, visible gaps and tiny shadows between grains, a few broken grains",
    "nori": "matte, crinkled and fibrous, tiny pinholes"
  },
  "render": "Unretouched RAW photograph, natural micro-contrast, fine sensor grain, no beauty retouching",
  "negatives": "no glossy, waxy or clay-like food, no smooth gradients on food surfaces, no HDR look, no heavy vignette, no text, no logos, no watermark"
}
```

- `texture`: adaptar a cada producto con la tabla de [`01-texturas-y-materiales.md`](01-texturas-y-materiales.md) §5.
- `colour_allocation`: se escribe en positivo (→ [`02-luz-y-color.md`](02-luz-y-color.md) §4). El naranja sale de `negatives` a propósito.
- `composition`: tamaño de plano y ángulo con nombre técnico (`knowledge/09` §1). Dejar hueco para el rótulo dentro de la zona segura de Reels (skill `openmontage`).
- **Párrafo NL:** incorpora cada campo y cierra con la coda de `knowledge/05` §5, pero con luz neutra: *"Shot on a full-frame camera, 85mm, f/4, ISO 200, neutral daylight colour, photographic realism, no text."*

## 2. Vídeo: bloques fijos y orden

Orden obligatorio, heredado de la plantilla de producción de Torre de Vega y compatible con `templates/prompt-video-motion.md`:

**PRESERVE → MOTION (beats con tiempos) → CAMERA → GRADE → NEGATIVE → coda fotográfica**

Los tres bloques fijos de conservación van siempre primero:

```text
PRESERVE TEXTURE: every surface keeps the exact texture of the reference images in every frame. Textures never soften, smear or become smoother over time.
PRESERVE EXPOSURE AND COLOUR: same brightness and white balance as the reference images, neutral daylight around 5000K. Do not warm up, darken or add an orange cast. The linen stays off-white in every frame; if it turns cream or orange, the frame is wrong.
SHARPNESS: motion blur only on what moves; food at rest stays tack sharp.
```

Después:

- **MOTION:** beats con ventana de tiempo, un único beat principal por toma (`knowledge/06` §4). Velocidad con distancia + tiempo + perfil (§4).
- **CAMERA:** un movimiento dominante con **punto final nombrado**. Un movimiento sin destino tiende a volver sobre sí mismo (OSideMedia, "action-reversal fill" [COMUNIDAD]).
- **GRADE:** lo manda el brief. Por defecto, neutro.
- **NEGATIVE:** defectos concretos de esta escena (ver `06-de-slop-y-revision.md`), no una lista genérica.

## 3. Seedance 2.5: sintaxis de referencias y audio [OFICIAL ByteDance, vía smixs]

- Cada referencia se declara por orden de subida y con rol: *"@Image 1 defines the dish: shape, portion and plating. @Image 2 defines the surface textures only. @Video 1 defines only the camera movement; do not use its people or its room."*
- Se vincula cada sujeto por separado. Nunca "las imágenes 1 a 4 definen los cuatro platos".
- **No se describe otra vez lo que ya define una referencia.** Si un vídeo de referencia define el movimiento, basta nombrar qué atributos se heredan.
- **Marcadores:** música `( )`, efecto de sonido `< >`, diálogo `{ }`, rótulo `【 】`. Ejemplo: `<the steak hits the grill with a sharp sizzle>`.
- Fórmula oficial base: *"<Subject> performs <action> in <scene>. The visuals feature <style>. Use <shot size, angle, movement or cuts>. Audio includes <...>."*
- En piezas largas: `[Stage N] Initial state… Primary event… End state…`, con **ventanas de 3 s o más** y un único cambio principal por ventana.
- **Negativos fiables en 2.5:** *"Pure video, no subtitles, no background music."* Se repiten al final del prompt. Los rótulos y la música se ponen en montaje.
- Parámetros (duración, proporción, resolución) van en la llamada, **no en el texto del prompt**.

## 4. Reglas de escritura

- **Rol explícito de cada referencia** y lo que **no** se copia de ella (`knowledge/10` §2.1).
- **Repetir en cada regeneración las restricciones negativas ya validadas**, no solo la corrección nueva.
- **Antes de animar, pregunta qué se mueve ya en la imagen.** Si la respuesta es "nada", el plano se resuelve en montaje (push-in digital, corte), no con generación.
- **Manos:** un único gesto breve al principio y quietud después, sin reagarres. En primeros planos con manos, recuento explícito: *"There are only two hands in the frame, both belonging to the same person, entering from the same sleeve."* [COMUNIDAD, OSideMedia: un primer plano de una sola persona generó una tercera mano].
- **Manipulación con causa:** para verter, cortar o abrir, se escribe la cadena física: estado inicial → qué lo sujeta → dónde se aplica la fuerza → qué hace el material → estado final (→ `06-de-slop-y-revision.md` §3).
- **Velocidad con números:** *"30 cm in 0.35s with natural motion blur"*, *"decelerating to a soft stop, no bounce"*, *"constant speed until the end"*, *"real-time, no slow motion, no speed ramp"*. Los gestos de precisión van más lentos (0,4–0,6 s) que las entradas y salidas (0,3–0,45 s).
- **Microdesplazamientos con distancia total:** *"over the full 6 seconds the camera pushes in only 10-15 cm"*. Comprueba que el movimiento puede llegar al encuadre final que pides: un empuje lento no termina en macro desde un plano general.
- **Nada de adjetivos vacíos:** "cinematic", "delicious", "stunning", "epic" no se renderizan. Se sustituyen por hechos físicos.

## 5. Ejemplo completo: plano héroe de brasa

Imagen de inicio: la foto real del chuletón ampliada a 9:16 con la ficha de texturas. Vídeo de 5 s, Seedance 2.5 `omni_reference`, 1080p, 9:16.

```text
@Image 1 is the first frame and defines the steak, the board and the grill exactly. @Image 2 defines only the surface textures of the meat and the wood.

PRESERVE TEXTURE: every surface keeps the exact texture of the reference images in every frame. Textures never soften, smear or become smoother over time.
PRESERVE EXPOSURE AND COLOUR: same brightness and white balance as @Image 1, neutral daylight around 5000K. The board and the plate keep their real colour; warm tones exist only in the charred crust and the embers. If the whole frame turns orange, the frame is wrong.
SHARPNESS: motion blur only on the knife; the meat at rest stays tack sharp.

[0-1.5s] The knife is already halfway through the first cut; the slice separates and tips onto its side, revealing a pink centre and visible muscle fibres.
[1.5-4s] The blade finishes the second cut and stops flat on the board. Exactly five slices in total, fanned left to right. The hand holding the fork stays still.
[4-5s] Hold. A thin wisp of real steam rises from the cut face.

CAMERA: locked-off 45-degree three-quarter angle; one slow push-in of about 8 cm over the full 5 seconds, ending on the cut face filling the lower half of the frame.

There are only two hands in the frame, both belonging to the same cook, entering from the right sleeve.
<a knife scraping wood> <a soft sizzle from the embers>
Pure video, no subtitles, no background music.

Shot on a full-frame cinema camera, 85mm, f/4, neutral daylight colour, photographic realism, no text.
```
