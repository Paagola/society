# 08 · Creatividad propia en cada reel

Estado: vigente · decisión de Víctor.
Fecha de revisión: 2026-10-01.
Ámbito / a quién obliga: todos los reels de hostelería; skills `director`, `director-reels`, `directoria` y `openmontage`.
Fuentes: encargo de Víctor del 01/10/2026 con el prompt de ejemplo de §7. Lo no verificado se marca.
Índice único: [README raíz](../../../README.md).

## Índice

1. Qué cambia
2. Qué no cambia
3. Del análisis del reel al concepto
4. Anatomía del prompt de vídeo
5. Textos dentro del vídeo
6. Que ningún reel se parezca al anterior
7. Prompt de ejemplo

---

## 1. Qué cambia

- **Ningún reel tiene estructura fija.** Cada uno nace con su concepto creativo propio, sacado del reel de referencia, del plato y del local. No hay número de tomas, duración por toma, orden de funciones ni tipo de transición obligatorios: los decide el guion de esa pieza.
- **La creatividad se genera dentro del vídeo.** Textos, transiciones (match cut, barrido líquido, partícula que cruza el objetivo, paso a través de un objeto), efectos 3D, morphing, cámara lenta y rápida y movimientos de cámara se escriben en el prompt de la multitoma para que salgan en la propia generación, no solo en el montaje.
- **El audio de la referencia marca el ritmo.** Los picos del audio dicen dónde cortar, dónde va la cámara lenta o la rápida, dónde cae cada transición y cada efecto (§3).
- Las reglas que antes eran fijas pasan a ser **opciones del concepto**: solo corte seco, rótulo desde el fotograma 1, 0,8–1,4 s por toma, nada de transiciones de efecto. Se usan cuando el concepto las pide.

## 2. Qué no cambia

- **Nada inventado.** El plato, el local, la vajilla, el nombre y la localidad son los reales: salen del material del cliente y de su ficha. El concepto puede ser surrealista en la forma (un plato que se forma en el aire, un portal en la superficie del vino), nunca en el contenido. En el ejemplo de §7, «un restaurante sobre una ciudad iluminada» o «un pabellón de cristal» solo se escriben si son el local real; si no, se sustituyen por su fachada o su sala reales.
- **La comida da hambre y parece real.** Textura fotorrealista, física creíble, nada de plástico, comida deformada ni CGI barato. El efecto rodea al plato; no lo convierte en un render. Es lo que el propio ejemplo pide en su bloque QUALITY CONTROL.
- **Regla cero.** Lo que tiene que parecer real (comida, local, personas, manos) sigue la firma de rodaje real (`../../directoria/references/hosteleria/08-firma-de-rodaje-real.md`). La capa creativa es dirección deliberada: se escribe **a propósito y por escrito** en el concepto, como ya permite `../../README.md` en «Cuándo se puede saltar».
- **Una sola luminosidad por reel:** la del reel de referencia o la que el usuario elija en el selector (estudio, natural, cálida…).
- **Cada transición tiene motivo:** conecta visualmente con el plano anterior. Nada de efectos al azar, glitch, destellos que distraen ni plantillas genéricas.

## 3. Del análisis del reel al concepto

Orden del proceso (Víctor, 01/10/2026): **análisis del reel de referencia → guion → búsqueda de las imágenes reales que mejor encajan con ese reel → keyframes → vídeo → montaje.**

1. **Audio de la referencia.** Se separa la pista y se localizan los picos (golpes, cambios de intensidad). Cada pico es un candidato a corte, a cambio de velocidad (cámara lenta en el impacto, rápida en el tramo de transición), a transición o a efecto. Se anota en segundos.
2. **Imagen de la referencia.** Cortes, energía de movimiento, grid de fotogramas, cinco aspectos por plano y luminosidad (`../../directoria/references/hosteleria/07-recreacion-de-referencia.md` §1).
3. **Concepto.** Una frase con nombre (en el ejemplo, «A TASTE ABOVE THE ORDINARY»), una identidad visual con la paleta de los platos reales y la luz de la pieza, y una secuencia de tramos con tiempos que caen en los picos del audio.
4. **Tramos.** Para cada uno: qué pasa, con qué cámara, qué texto (si lo hay) y cómo pasa al siguiente. Las funciones del ejemplo (gancho, deseo, momento sensorial, experiencia, revelación, llamada a la acción) son una posibilidad, no una plantilla.
5. **Imágenes.** Con el guion cerrado se buscan entre el material real las fotos que mejor encajan con cada tramo; si falta alguna, se pide al cliente o el tramo cambia. Esas fotos anclan los keyframes, y los keyframes aprobados van a la multitoma como `@Image k`.

## 4. Anatomía del prompt de vídeo

Un solo prompt para toda la multitoma de Seedance 2.5, en inglés y en este orden de bloques. El contenido de cada bloque es libre.

1. **Cabecera:** duración, 9:16 y tipo de pieza.
2. **CREATIVE CONCEPT:** la frase del concepto.
3. **VISUAL IDENTITY:** paleta, luz de la pieza, textura y tono.
4. **REFERENCES:** qué es cada `@Image k` (el plato o el espacio real) y qué se conserva de ella: textura, exposición, color y forma. Nada se mezcla entre tramos.
5. **SEQUENCE:** un bloque por tramo `[a–b s]` con acción, cámara, texto y transición de salida.
6. **TRANSITIONS & MOTION DESIGN:** el vocabulario de transiciones de esta pieza y su regla de conexión.
7. **CAMERA & LIGHTING:** óptica, profundidad de campo, tipo de movimiento y luz.
8. **SOUND DESIGN:** sonidos de la comida, transiciones y música, alineados con los picos del audio de la referencia.
9. **QUALITY CONTROL:** comida fotorrealista, física creíble, geometría coherente, manos bien formadas, texto legible; y los negativos validados del cliente.

`../../director-reels/scripts/lint_reel.py` comprueba que estén estos bloques en orden.

## 5. Textos dentro del vídeo

- Cortos (2–4 palabras) y grandes. El nombre, la localidad y la llamada a la acción salen tal cual de la ficha.
- **(verificar)** No está medido cómo de bien escribe texto Seedance 2.5. Cada texto se revisa letra a letra; si sale mal, se regenera ese tramo o el texto se pone en el montaje (Remotion) encima del vídeo.
- Nada en los 310 px de abajo (zona segura de Reels).
- El rótulo es opcional: va si el concepto lo pide.

## 6. Que ningún reel se parezca al anterior

- Antes de cerrar el concepto se miran los últimos reels del cliente en el registro: no se repite concepto, vocabulario de transiciones ni apertura.
- Pregunta de control: *¿este reel podría confundirse con el anterior?* Si la respuesta es sí, se cambia el mecanismo.
- Se registra qué concepto y qué transiciones llevó cada pieza para que la medición diga qué funciona (`../../director-reels/references/07-registro-y-aprendizaje.md`).

## 7. Prompt de ejemplo

Prompt de Víctor (01/10/2026). Marca el nivel de ambición y la anatomía; **no** es una plantilla de seis tramos para todos los reels. Antes de usarlo con un cliente: `@Image k` con sus fotos reales, nombre y localidad de la ficha, y el exterior sustituido por el local real (§2).

```text
Create a 15-second vertical 9:16 high-end cinematic restaurant commercial for Instagram Reels. Directed by an award-winning creative studio specializing in luxury food photography, photorealistic CGI, sophisticated 3D motion design and premium brand films.
CREATIVE CONCEPT: "A TASTE ABOVE THE ORDINARY."
VISUAL IDENTITY:
A bold fusion of editorial food photography and surreal photorealistic 3D. Deep black backgrounds, rich pesto green, creamy ivory, ruby red and subtle champagne gold. Dramatic studio lighting, sculptural highlights, realistic reflections, macro lens details, volumetric light, controlled depth of field and ultra-realistic food textures. Every scene feels like a premium international restaurant campaign, visually surprising but elegant and appetising.
SEQUENCE:
0:00–0:02 — THE HOOK.
Extreme macro of a fresh burrata floating against a deep black background. It slowly splits open in midair, releasing a thick stream of creamy stracciatella suspended in a spectacular yet physically believable liquid sculpture. The camera rapidly pushes through the creamy texture. Large elegant 3D typography appears: "NOT JUST FOOD." A sharp liquid wipe transitions into the next scene.
0:02–0:05 — THE DESIRE.
A beautiful plate of vibrant green pesto tagliatelle materializes through a seamless 3D transformation. The pasta rotates gracefully as a ribbon of glossy pesto spirals around the plate in a controlled orbit. Fine parmesan particles fall in cinematic slow motion, with realistic macro detail and strong depth. Bold kinetic typography: "MADE TO BE FELT." A parmesan flake sweeps across the lens, creating a seamless match cut.
0:05–0:07.5 — THE SENSORY MOMENT.
Golden garlic bread fills the frame. Two halves slowly separate, stretching long, glossy strands of melted cheese. The cheese transforms into a flowing golden 3D line that curves through the frame. A precise lateral camera move captures the crisp crust and realistic cheese texture. Typography appears briefly: "PURE ITALIAN SOUL." The golden line morphs into the reflection of a red wine glass.
0:07.5–0:10 — THE EXPERIENCE.
A ruby-red wine glass emerges from darkness, surrounded by sophisticated warm reflections. The camera performs a smooth cinematic orbit. The surface of the wine creates a perfectly circular ripple that expands into a photorealistic 3D portal. Through the portal, reveal an intimate Italian restaurant atmosphere, elegant table settings and warm practical lights. Typography: "YOUR NEXT OBSESSION." The camera flies through the liquid portal into a real architectural environment.
0:10–0:13 — THE REVEAL.
A spectacular cinematic exterior reveal of an elegant Italian restaurant perched above a glowing town at night. A smooth aerial-style camera rises and moves forward, revealing the illuminated glass pavilion, garden and breathtaking panoramic surroundings. The restaurant is the hero. Sophisticated 3D typography reading "[RESTAURANT NAME]" emerges in perspective, subtly integrated into the composition without obstructing the architecture.
0:13–0:15 — THE CALL TO ACTION.
A seamless transition to a minimalist premium brand end card. Deep black background, restrained golden highlights, refined typography and subtle cinematic light. Show "[RESTAURANT NAME]", "[LOCATION]" and "BOOK YOUR TABLE". Hold the final composition long enough to read. Clean, elegant and memorable.
TRANSITIONS & MOTION DESIGN:
Use creative match cuts, fluid liquid transitions, 3D camera fly-throughs, controlled morphing, depth-based parallax, foreground particle wipes and precise typography animation. Each transition must have a clear visual connection to the previous shot. Avoid random effects, excessive glitching, distracting flashes or generic templates. Transitions should feel designed by a premium motion graphics studio.
CAMERA & LIGHTING:
Professional full-frame cinema camera aesthetic, macro lenses, carefully controlled shallow depth of field, precise camera tracking, sophisticated product photography lighting and realistic global illumination. Combine dramatic macro close-ups with wide cinematic reveals. Use intentional camera movement, clean framing and polished visual rhythm.
SOUND DESIGN:
A sophisticated contemporary soundscape with tactile food sounds, subtle liquid textures, a crisp bread crackle, a delicate wine-glass chime, cinematic transition whooshes and a powerful but elegant musical build. The sound design rises with the visual intensity and resolves into a memorable final accent.
QUALITY CONTROL:
Photorealistic food, believable physics, coherent object geometry, natural liquid simulation, realistic reflections, perfectly formed hands when visible, refined typography and consistent visual identity. No cartoon effects, no cheap CGI, no distorted food, no random objects, no cluttered composition, no excessive glow, no illegible text and no artificial-looking restaurant architecture.
The final result must feel like a sophisticated, high-budget creative studio campaign designed to stop the scroll, stimulate appetite, build desire and make viewers want to visit the restaurant.
```

Para la multitoma, al prompt se le añade el bloque REFERENCES de §4 antes de SEQUENCE, y cada tramo cita su `@Image k`.
