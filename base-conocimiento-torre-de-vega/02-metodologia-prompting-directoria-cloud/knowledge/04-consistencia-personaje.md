<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 04 · Consistencia de personaje

> La biblia de la **identidad recurrente**. Cómo conseguir que la misma persona aparezca igual a sí misma en escena tras escena, sin que la cara mute, sin que el tono de piel se contamine, sin que el vestuario derive.
>
> Si la cara cambia entre tomas, el espectador deja de creer el anuncio. La consistencia no es un capricho estético: es lo que separa una campaña de una galería de stills sueltos.

**Idioma:** la explicación va en español porque hablas en tu idioma. **Todos los prompts y plantillas van en inglés** — los modelos de imagen rinden mejor en inglés, así que se conversa contigo en español pero el prompt que se envía a la API se entrega siempre en inglés.

Archivos relacionados:
- `knowledge/00-metodologia-promptdirector.md` — la estructura JSON + NL de cada prompt (aquí la damos por conocida).
- `knowledge/02-modelos-imagen.md` — qué modelo elegir; aquí solo recordamos lo crítico para identidad.
- `knowledge/05-biblia-hiperrealismo.md` — micro-imperfecciones y coda fotográfica en detalle.
- `templates/ref-stack-personaje.md` — la plantilla de stack de referencias en su versión larga.

---

## 0 · El principio en una frase

> **El primer adjunto manda, las palabras de anclaje van antes de los `@image`, y cada referencia lleva un rol explícito.**

Todo lo demás de este documento son consecuencias de esa frase.

---

## 1 · Qué modelo usar para identidad (y cuál NO)

Antes de hablar de refs, hay que elegir bien el motor. Meter referencias de personaje en el modelo equivocado es tirar el trabajo.

| Modelo | ¿Sirve para identidad recurrente? | Por qué |
|---|---|---|
| **nano_banana_pro** | **SÍ — es el motor de identidad** | Líder en preservación de identidad en 2026. Respeta las refs. Pasar `resolution:"4k"` (default es 1k). Soporta `aspect_ratio`. Admite hasta 14 refs pero la atención se diluye pasadas 3-4. |
| soul_2 / soul_cinematic | **NO para identidad** | Son **PROMPT-ONLY**: ignoran/dropean las refs (los jobs con ref guardan `prompt:""` y solo regeneran variaciones de la ref). Sirven para explorar estilo, no para fijar una cara. |
| gpt_image_2 | **NO para personaje recurrente** | Tiende a "AI gloss" y a **modificar la cara**. Solo vale para comparar fidelidad facial puntualmente. Si lo usas, pasa `quality:"high"` (default es `low`). |
| marketing_studio_image | No es de identidad | Default comercial/producto/ads. |

**Detalle técnico de nano_banana_pro que debes conocer:**
- En `medias[]`, el campo `role` **DEBE** ser `"image"`. El server coacciona `"reference"` → `"image"`, pero no te fíes: pon `"image"`.
- Puede reportar internamente `model:"nano_banana_2"` (fallback). **Es normal**, no es un error.
- Antes de lanzar, puedes pasar `get_cost:true` para un preflight de coste sin ejecutar el job.

> Si el concepto es muy específico o surreal y aun así necesitas identidad, **nano_banana_pro con ref ancla** es la respuesta — no soul_cinematic, que pierde los conceptos raros.

---

## 2 · El orden de las referencias (importa, y mucho)

El **primer adjunto pesa más** que el segundo, el segundo más que el tercero. Por eso el orden no es decorativo: es jerarquía de atención.

**Orden canónico (máximo 3-4 refs):**

| Posición | Qué va aquí | Token |
|---|---|---|
| 1 | **Identity sheet** multiángulo (la cara desde varios ángulos) | `@image1` |
| 2 | **Selfie close-up** (primer plano nítido de la cara) | `@image2` |
| 3 | **Scene / wardrobe ref** (la escena o el vestuario donde lo metes) | `@image3` |

Por qué este orden:
- Las dos primeras refs son **quién es**. Van delante para que el modelo "decida la cara" antes de mirar la escena.
- La tercera es **dónde está y cómo va vestido**. Va detrás a propósito: queremos que aporte pose/setting/ropa, no que imponga su propia cara (ver §4).

> **Regla dura: nunca pases más de 3-4 refs.** nano_banana_pro admite hasta 14, pero la atención se diluye y la cara empeora. Más refs ≠ más fidelidad. Menos refs bien elegidas y bien etiquetadas ganan siempre.

**Y nunca digas "the reference image" en vago cuando hay varias.** Si hay varias refs, cada una se nombra por su token: `@image1`, `@image2`, `@image3`, en el **orden exacto** del array `medias[]`.

---

## 3 · Anchor words: la cara va al principio del prompt

El error más común es escribir un prompt larguísimo de atmósfera (luz, humo, lente, mood) y meter la descripción de la persona al final, justo antes o después de los `@image`. Resultado: los tokens atmosféricos **diluyen la cara**.

**Fix:** las **anchor words** — la descripción física del personaje — van **al PRINCIPIO del prompt, antes de los `@image`**.

```text
A 34-year-old man, olive skin, short dark stubble, heavy brows,
defined jawline, deep-set brown eyes, short side-swept dark hair.
[...todo el resto del prompt atmosférico viene DESPUÉS, y luego los @image...]
```

La lógica: pones la identidad delante para que sea el ancla, y el ambiente la rodea en vez de borrarla.

---

## 4 · Rol explícito por referencia (el bloque REF ROLES)

Cada referencia debe llevar **una instrucción de para qué se usa**. El modelo no adivina; si no le dices el rol de cada ref, mezcla todo.

```text
REF ROLES:
- @image1: facial identity, bone structure, hair. SOURCE OF TRUTH for the face.
- @image2: fine facial detail, eye color, skin texture close-up.
- @image3: pose, wardrobe, setting and lighting ONLY. NOT a face source.
Replace ONLY the face. Keep the body pose and clothing of @image3.
```

La frase clave es **"reemplaza solo la cara"**: tomas pose/ropa/setting de la scene ref, pero la cara viene de `@image1`.

---

## 5 · EL pitfall de la cara parecida (y su fix)

Este es **el** fallo de consistencia que más cuesta diagnosticar.

**Síntoma:** metes una scene ref (`@image3`) que ya tiene una persona dentro — porque te servía la pose, la luz o el encuadre. El resultado sale con la cara de **esa** persona, no la de tu personaje. Y no entiendes por qué, si tu identity sheet va de primera.

**Causa:** si la scene ref contiene una persona **parecida**, el modelo se aferra a esa cara porque está físicamente presente en una de las imágenes que le diste. La presencia gana a la descripción.

**Fix — los cuatro movimientos juntos:**

1. **Bloque REF ROLES** explícito (el de §4).
2. **Orden de reemplazo nombrado:**
   ```text
   Replace the man in @image3 with [TARGET] from @image1.
   ```
3. **Repetir la negación, literal y varias veces:**
   ```text
   DO NOT use the face of the man in @image3.
   DO NOT use the face of the man in @image3.
   The face MUST come from @image1 only.
   ```
4. **Evitar "keep @image3 exactly".** Esa frase le dice al modelo que conserve la escena *tal cual* — incluida la cara que quieres reemplazar. Di "keep the pose and wardrobe of @image3", nunca "keep @image3 exactly".

> Regla mnemotécnica: **nombra al intruso y exíliale.** Si en la scene ref hay una persona, asume que el modelo querrá su cara, y escribe explícitamente que NO.

---

## 6 · Skin-tone bleed lock

Variante específica del pitfall anterior: aunque la cara salga bien, el **tono de piel** se contamina del de la persona de la scene ref. Sale la cara correcta con un tono que no es el del personaje, o con las manos/cuello de otro tono que la cara.

**Lock, copia literal:**

```text
ALL visible skin — face, neck, ears, hands, wrists — must match the
skin tone of @image1. Do NOT inherit the skin tone of the person in @image3.
```

Fíjate que enumera **todas las zonas de piel visibles** (cara, cuello, orejas, manos, muñecas), no solo "la piel". Si no enumeras, el modelo iguala la cara a `@image1` pero deja las manos con el tono de `@image3`, y se nota.

---

## 7 · Wardrobe lock

Cuando trabajas un personaje **conocido** en escenas nuevas y NO incluyes una ref canónica de su vestuario/estilo, aparece el **drift**: cambia el gorro, cambia la ropa, cambia el pelo de una toma a otra. El personaje deja de ser reconocible aunque la cara sea correcta.

**Regla:** **incluye SIEMPRE una ref canónica de vestuario/estilo** en el stack cuando el personaje ya está definido. Es una de tus 3-4 refs, y vale la pena gastarla en esto.

```text
Wardrobe and styling are LOCKED to the canonical look:
[describe the canonical garments/hair/accessories here], as shown in @imageN.
Do NOT introduce new hats, jackets, or hairstyles.
```

---

## 8 · Micro-imperfecciones — NO "hyperrealistic 8k"

Escribir "hyperrealistic 8k" no produce realismo: produce **plástico CGI**. El realismo de una cara real vive en las **imperfecciones**, no en la resolución.

Sustituye "hyperrealistic 8k" por esta lista (mete las que apliquen al plano):

```text
visible skin pores, faint stubble, subsurface scattering on the ears and nose,
individual eyebrow hairs, slight facial asymmetry, one flyaway strand of hair,
fine vellus hair along the jaw, micro lip texture, subtle T-zone oil sheen.
```

Cada una de estas pistas empuja al modelo hacia "foto de persona real" en vez de "render de persona". (Más en `knowledge/05-biblia-hiperrealismo.md`.)

---

## 9 · Coherencia de profundidad de campo (DOF)

Un personaje **nítido pegado sobre un fondo igual de nítido** delata el montaje: lee a "recortado y pegado", no a fotografía.

**Regla:** sujeto nítido **+ bokeh de fondo coherente**. Si el sujeto está enfocado, el fondo debe caer en desenfoque proporcional a la apertura que declaraste en el brief de cámara. Nítido-sobre-nítido = pegado.

```text
Subject in sharp focus; background falls into coherent bokeh consistent
with the stated aperture. No flat, all-sharp "cut-out" look.
```

Esto se ata con las specs de cámara del JSON brief (lente mm, apertura f/, distancias) — ver `knowledge/00-metodologia-promptdirector.md`.

---

## 10 · Higiene de sesión: re-anclar, no encadenar

La identidad **deriva** con el uso. Dos reglas para frenarla:

**Re-anclar cada ~5 generaciones.**
Cuando saques un keyframe excelente (una toma donde la cara está perfecta), **úsalo como nueva ref de identidad** para las siguientes. Así corriges la deriva antes de que se acumule. Y abre una **sesión fresca cada 5-10 gens** — el contexto largo arrastra ruido.

**No encadenar variante-de-variante.**
La tentación es: sale una toma buena, generas una variante de ella, luego una variante de la variante… y a la quinta el personaje es otra persona. Cada paso introduce un poco de deriva y se multiplica.

> **Fix:** vuelve siempre al **prompt estructural que funcionó**, con **TODAS las refs de identidad adjuntas**, y regenera desde ahí. No partas del último output; parte del prompt + refs originales.

---

## 11 · Cuándo entrenar un Soul ID

Para volumen bajo (un puñado de tomas) el flujo de refs basta. Pero cuando el proyecto es grande, el manejo manual de refs no escala.

**Regla:** si tienes un **volumen alto — 10+ beats / escenas** del mismo personaje, **entrena un Soul ID**.

- **Material:** 15-25 fotos variadas del personaje (ángulos, luces, expresiones distintas).
- **Tiempo:** ~3-5 minutos de entrenamiento.
- **Resultado:** un **token de identidad persistente** que invocas en cada generación sin re-adjuntar el stack de refs cada vez.

A partir de ahí, la cara es estable por construcción y dejas de pelear contra la deriva en cada gen.

---

## 12 · PLANTILLA copy-paste — "personaje en escena ref"

> En inglés a propósito (los modelos rinden mejor en inglés). Sustituye lo que va entre `[CORCHETES]`. Esta es la versión NL del prompt; el JSON Decoded Brief que la acompaña se construye según `knowledge/00-metodologia-promptdirector.md`. Stack de refs sugerido: `@image1` = identity sheet, `@image2` = selfie close-up, `@image3` = scene/wardrobe ref.

```text
[ANCHOR — physical description first, before any @image]
A [AGE]-year-old [GENDER], [SKIN TONE] skin, [HAIR: length/color/style],
[BROWS], [EYES: shape/color], [FACIAL HAIR], [JAW/BONE STRUCTURE],
[ANY DISTINGUISHING MARK].

SCENE:
[Place the character into the scene: environment, action, framing,
lighting source, mood. Keep it concrete.]

REF ROLES:
- @image1: facial identity, bone structure, hair. SOURCE OF TRUTH for the face.
- @image2: fine facial detail, eye color, skin texture close-up.
- @image3: pose, wardrobe, setting and lighting ONLY. NOT a face source.
Replace the [person] in @image3 with the subject from @image1.
Keep the pose and wardrobe of @image3 — do NOT keep @image3 exactly.

FACE LOCK:
DO NOT use the face of the [person] in @image3.
DO NOT use the face of the [person] in @image3.
The face MUST come from @image1 only.

SKIN-TONE LOCK:
ALL visible skin — face, neck, ears, hands, wrists — must match the
skin tone of @image1. Do NOT inherit the skin tone of the person in @image3.

WARDROBE LOCK:
Wardrobe and styling locked to the canonical look:
[CANONICAL GARMENTS / HAIR / ACCESSORIES]. No new hats, jackets, or hairstyles.

REALISM (micro-imperfections, NOT "8k"):
visible skin pores, faint stubble, subsurface scattering on ears and nose,
individual eyebrow hairs, slight facial asymmetry, one flyaway strand,
fine vellus hair, micro lip texture, subtle T-zone oil sheen.

DEPTH:
Subject in sharp focus; background in coherent bokeh consistent with the
stated aperture. No flat all-sharp cut-out look.

CAMERA / CODA:
shot on [CAMERA], [LENS]mm, f/[N], ISO [N], [CCT]K, natural color grade.
Photographic realism, no text.
```

**Params de envío sugeridos (nano_banana_pro):**

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "9:16",
  "medias": [
    { "role": "image", "value": "<media_id_identity_sheet>" },
    { "role": "image", "value": "<media_id_selfie>" },
    { "role": "image", "value": "<media_id_scene_wardrobe>" }
  ],
  "params": { "prompt": "<el JSON Decoded Brief stringificado, con @image1/2/3 incrustados>" }
}
```

> Recuerda: el `prompt` que viaja a la API es el **JSON brief stringificado** con los tokens `@imageN` ya dentro; la versión NL de arriba es para tu revisión humana. (Ver `knowledge/00-metodologia-promptdirector.md`.) `role` siempre `"image"`. Para preflight de coste, añade `"get_cost": true`.

---

## 13 · Top pitfalls → fix

| # | Pitfall (síntoma) | Causa | Fix |
|---|---|---|---|
| 1 | Sale la cara de la persona de la scene ref, no la del personaje | Hay una persona **parecida** en `@image3`; su presencia gana a la descripción | Bloque REF ROLES + "Replace the man in @image3 with [target] from @image1" + repetir "DO NOT use the face of the man in @image3" + **evitar** "keep @image3 exactly" |
| 2 | La cara sale bien pero el **tono de piel** está contaminado, o las manos no pegan con la cara | Skin-tone bleed desde `@image3` | "ALL visible skin — face, neck, ears, hands, wrists — must match @image1. Do NOT inherit the skin tone of the person in @image3." |
| 3 | El personaje **deriva** entre escenas: cambia gorro/ropa/pelo | Falta ref canónica de vestuario | **Wardrobe lock**: incluir siempre una ref de vestuario/estilo + bloquearlo en texto |
| 4 | Cara de plástico / CGI | "hyperrealistic 8k" en el prompt | Sustituir por **micro-imperfecciones** (poros, stubble, subsurface scattering, vellus, asimetría, flyaway) |
| 5 | El personaje lee a "recortado y pegado" | Nítido-sobre-nítido, sin DOF | Sujeto nítido + **bokeh de fondo coherente** con la apertura declarada |
| 6 | La identidad se pierde tras varias tomas | Encadenar **variante-de-variante** / sesión demasiado larga | Re-generar desde el **prompt estructural** con TODAS las refs; **re-anclar cada ~5 gens**; sesión fresca cada 5-10 |
| 7 | La cara está diluida por el ambiente | Descripción del personaje **al final** del prompt | **Anchor words** (físico) **al principio**, antes de los `@image` |
| 8 | Más refs no mejoran (incluso empeoran) la cara | Atención diluida pasadas 3-4 refs | **Máximo 3-4 refs**, bien ordenadas y con rol explícito |
| 9 | El modelo "no respeta" mis referencias | Estás usando **soul_2 / soul_cinematic** (prompt-only, dropean refs) o **gpt_image_2** (modifica la cara) | Usar **nano_banana_pro** para identidad; `resolution:"4k"`; `role:"image"` |
| 10 | Tengo 10+ escenas y el manejo de refs no escala | Volumen alto sin token persistente | **Entrenar Soul ID** (15-25 fotos variadas, ~3-5 min) |

---

## 14 · Checklist antes de lanzar una gen de personaje

- [ ] ¿Estoy en **nano_banana_pro** con `resolution:"4k"` y `role:"image"`?
- [ ] ¿Las **anchor words** (físico) están **al principio**, antes de los `@image`?
- [ ] ¿Tengo **3-4 refs máximo**, en orden: identity sheet → selfie → scene/wardrobe?
- [ ] ¿Cada ref tiene un **rol explícito** (bloque REF ROLES)?
- [ ] Si la scene ref tiene una persona: ¿he **nombrado y negado** su cara (×2-3)? ¿He evitado "keep @image3 exactly"?
- [ ] ¿Está el **skin-tone lock** (cara, cuello, orejas, manos, muñecas)?
- [ ] ¿Está el **wardrobe lock** si el personaje ya es conocido?
- [ ] ¿Usé **micro-imperfecciones** en vez de "8k"?
- [ ] ¿Hay **DOF coherente** (sujeto nítido + bokeh)?
- [ ] ¿Termina en **"Photographic realism, no text."**?
- [ ] ¿Llevo **<5 gens** desde el último re-anclaje? ¿Parto del **prompt estructural**, no de una variante encadenada?
- [ ] Si son **10+ beats**: ¿debería estar usando un **Soul ID** en vez de refs manuales?