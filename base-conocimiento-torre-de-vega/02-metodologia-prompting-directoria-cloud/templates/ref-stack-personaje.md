# Plantilla — Ref Stack de personaje (consistencia de identidad)

> **Qué es esto.** El esqueleto del *stack de referencias* que se monta cuando metes un personaje recurrente (un actor, un avatar UGC, tu propia cara) en una escena nueva y necesitas que **la cara, el pelo, el tono de piel y el vestuario sigan siendo los mismos** toma a toma.
>
> Esto es la **plantilla operativa** de la teoría que vive en `knowledge/04-consistencia-personaje.md`. Aquí vienes a copiar, pegar y rellenar; allí vienes a entender el porqué de cada bloque. Si algo de aquí te suena a magia, lee primero ese archivo.
>
> **Modelo objetivo:** `nano_banana_pro` (líder en preservación de identidad en 2026 y el único que respeta las refs de verdad — ver `knowledge/02-modelos-imagen.md`). Soul (`soul_2`, `soul_cinematic`) **dropea las refs**, así que NO sirve para este stack. `gpt_image_2` te modifica la cara: úsalo solo para comparar fidelidad, nunca como motor de un personaje recurrente.

---

## 0. El idioma del prompt es inglés (la prosa de enseñanza, español)

Hablas con tu agente en español, pero **el prompt final que se manda a la API va en inglés**. No es esnobismo: los modelos de imagen rinden notablemente mejor con instrucciones en inglés (es donde está la masa de su entrenamiento), y palabras-ancla como *skin pores*, *subsurface scattering* o *flyaway strand* activan texturas que sus equivalentes en español no disparan igual de bien.

Por eso: **todas las anotaciones de esta plantilla van en español, y todo lo que se copia-pega va en inglés.** Cuando rellenes los huecos `[...]`, rellénalos en inglés.

---

## 1. El orden del stack manda (y el primer adjunto pesa más)

`nano_banana_pro` admite hasta 14 refs, pero **la atención se diluye pasadas 3-4**. Mete más y empiezas a perder, no a ganar. Regla de oro: **máximo 3-4 refs, y el orden importa** porque el primer adjunto pesa más que los siguientes.

| Slot | Ref | Qué aporta | Por qué en esta posición |
|------|-----|-----------|--------------------------|
| `@image1` | **Identity sheet** multiángulo (frontal + 3/4 + perfil) | La identidad facial canónica: huesos, ojos, pelo | Primer adjunto = más peso. La cara es lo no negociable. |
| `@image2` | **Selfie / close-up** de la misma persona | Refuerza textura de piel, color de ojos, detalle fino | Segunda voz de la identidad; consolida lo que el sheet generaliza. |
| `@image3` | **Scene / wardrobe ref** (pose, ropa, entorno, luz) | El *dónde* y el *cómo va vestido*, la composición destino | Va al final: aporta contexto, no identidad. |

> **Nota sobre `medias[].role`.** En `nano_banana_pro` el rol de cada media **debe ser `"image"`**. El servidor coacciona `"reference"` a `"image"` por su cuenta, pero no juegues con eso: pásalo ya como `"image"`. Y los tokens `@image1/@image2/@image3` del prompt deben corresponder al **orden exacto** del array `medias[]` que mandas a la API. Si reordenas el array, reordena los tokens. (Detalle del payload en `knowledge/01-higgsfield-mcp.md`.)

> **Nunca digas "the reference image" en vago cuando hay varias.** El modelo no sabe a cuál te refieres y promedia. Siempre `@imageN` explícito.

---

## 2. Anatomía del prompt: los cuatro bloques, en orden

El prompt de personaje **no es un párrafo libre**. Tiene una arquitectura de bloques, y el orden de esos bloques es deliberado:

```
┌─────────────────────────────────────────────┐
│ 1. ANCHOR WORDS  (descripción física, ARRIBA)│  ← antes de cualquier @image
├─────────────────────────────────────────────┤
│ 2. REF ROLES     (qué hace cada @imageN)      │  ← evita el robo de cara
├─────────────────────────────────────────────┤
│ 3. SKIN-TONE LOCK (toda la piel = @image1)    │  ← evita el skin-tone bleed
├─────────────────────────────────────────────┤
│ 4. MICRO-IMPERFECTIONS (poros, vello, brillo) │  ← mata el look "IA/CGI"
└─────────────────────────────────────────────┘
   + escena/acción + coda fotográfica + "no text"
```

**Por qué este orden.** Las *anchor words* van arriba del todo, **antes de los `@image`**, para que los tokens atmosféricos (humo, neón, bokeh) y de escena no diluyan la cara. Si describes la atmósfera primero y la cara al final, el modelo "olvida" la identidad. Cara primero, mundo después.

A continuación, cada bloque en detalle con su esqueleto.

---

### Bloque 1 — ANCHOR WORDS (descripción física, lo primero de todo)

Una descripción física compacta del personaje **en palabras**, aunque tengas la identity sheet. La sheet ancla; las palabras refuerzan. Van **antes** del primer `@image`.

```text
[GENDER] [AGE]-year-old [ETHNICITY/DESCENT] [SUBJECT NOUN],
[HAIR: length, color, texture, parting/style],
[EYES: color, shape],
[FACIAL HAIR if any],
[DISTINCTIVE FEATURES: jaw, nose, freckles, scar, glasses],
[BUILD].
```

Ejemplo rellenado:

```text
A 34-year-old Mediterranean man, short dark-brown wavy hair parted to the left,
warm hazel eyes, light stubble along the jaw, a small mole above the right
eyebrow, lean athletic build.
```

> **Por qué.** Si solo le das la sheet sin palabras, en escenas cargadas (poca luz, mucho humo, ángulo raro) el modelo tira de su *prior* genérico de cara. Las anchor words son el segundo cable de seguridad.

---

### Bloque 2 — REF ROLES (el rol explícito de cada ref)

Aquí le dices al modelo, sin ambigüedad, **qué papel juega cada `@imageN`**. Este es el bloque que evita el fallo más común y más frustrante del flujo: **el robo de cara**.

> **El pitfall.** Si tu scene/wardrobe ref (`@image3`) contiene una persona — cualquier persona, aunque solo se parezca un poco a tu personaje — `nano_banana_pro` tiende a **conservar la cara de ESA persona** en vez de la de tu identity sheet. Te genera la escena perfecta... con otra cara.
>
> **El fix** es triple y se mete TODO en este bloque:
> 1. Asignar roles explícitos por ref.
> 2. Frasear el reemplazo en orden: *"reemplaza a la persona de @image3 por [target] de @image1"*.
> 3. Repetir una negación dura: *"DO NOT use the face of the person in @image3."*
>
> Y un anti-patrón: **NO escribas "keep @image3 exactly"**. Eso le ordena conservar la cara del intruso. Quieres conservar la *pose, ropa y setting* de @image3, no su cara.

```text
REF ROLES:
- Use @image1 for facial identity, bone structure, and hair. This is the ONLY
  source of the face.
- Use @image2 to reinforce skin texture, eye color, and fine facial detail.
- Use @image3 ONLY for pose, wardrobe, framing, lighting, and setting.
- Replace the [PERSON in @image3] with [TARGET] from @image1: keep the pose,
  the clothing, and the environment of @image3, but the face, hair and skin
  are entirely from @image1 and @image2.
- DO NOT use the face of the [person] in @image3.
```

Ejemplo rellenado (el personaje masculino entra en una escena de bar nocturno):

```text
REF ROLES:
- Use @image1 for facial identity, bone structure, and hair. This is the ONLY
  source of the face.
- Use @image2 to reinforce skin texture, eye color, and fine facial detail.
- Use @image3 ONLY for pose, wardrobe, framing, lighting, and setting.
- Replace the man seated at the bar in @image3 with the man from @image1:
  keep his pose, his dark blazer, and the neon-lit bar around him, but the
  face, hair and skin are entirely from @image1 and @image2.
- DO NOT use the face of the man in @image3.
```

> **Si tu scene ref NO tiene ninguna persona** (es solo un fondo / un mood de luz), puedes simplificar este bloque: bastan los roles de @image1/@image2/@image3 sin la cláusula de reemplazo ni la negación dura. El robo de cara solo ocurre cuando hay una cara que robar.

---

### Bloque 3 — SKIN-TONE LOCK (toda la piel visible = la de @image1)

Hermano del robo de cara: el **skin-tone bleed**. El modelo te clava la cara correcta... pero las manos, el cuello o las orejas heredan el tono de piel de la persona de `@image3`. Resultado: un personaje con la cara de un tono y las manos de otro. Roto.

El fix es enumerar **toda** la piel visible y anclarla a `@image1`:

```text
SKIN TONE:
ALL visible skin — face, neck, ears, hands, wrists — must match the skin tone
of @image1. Do NOT inherit the skin tone of the [person] in @image3.
```

Ejemplo rellenado:

```text
SKIN TONE:
ALL visible skin — face, neck, ears, hands, wrists — must match the warm
olive skin tone of @image1. Do NOT inherit the skin tone of the man in @image3.
```

> **Truco de blindaje:** enumera las zonas que de verdad aparecen en tu encuadre. Si hay manos en plano, "hands, wrists" es obligatorio; si es un primer plano de cara, "face, neck, ears" basta. Cuanto más explícita la lista, menos margen al bleed.

---

### Bloque 4 — MICRO-IMPERFECTIONS (lo que mata el look "IA")

La trampa del principiante es escribir `hyperrealistic 8k ultra detailed`. Eso produce justo lo contrario: piel de plástico, brillo CGI, cara de avatar. **El hiperrealismo no se pide con adjetivos grandilocuentes; se construye con imperfecciones pequeñas y específicas** (la biblia completa está en `knowledge/05-biblia-hiperrealismo.md`).

Lista de la compra de micro-imperfecciones — coge las que apliquen a tu encuadre:

```text
MICRO-IMPERFECTIONS:
visible skin pores, faint stubble, subsurface scattering on the ears and nose,
individual eyebrow hairs, slight facial asymmetry, one flyaway strand of hair,
fine vellus hair along the jaw, micro lip texture, a subtle T-zone oil sheen.
```

> **No las metas todas a ciegas.** *T-zone oil sheen* en un primer plano frontal, sí; en un plano general donde la cara ocupa 40 px, da igual. *Faint stubble* solo si tu personaje lleva barba incipiente — coherente con las anchor words. La regla es: la imperfección tiene que ser **plausible y específica para ESTE personaje en ESTE plano**.

---

## 3. Esqueleto completo (en inglés, listo para rellenar)

Esto es el prompt **en lenguaje natural** que se envía como `params.prompt`. Recuerda la metodología PromptDirector: la salida ideal son **dos partes** — un *JSON Decoded Brief* y este párrafo NL (el JSON va más abajo, en la sección 4). Detalle en `knowledge/00-metodologia-promptdirector.md` y en la plantilla `templates/prompt-imagen.md`.

```text
[ANCHOR WORDS — physical description of the character, FIRST, before any @image]

REF ROLES:
- Use @image1 for facial identity, bone structure, and hair. This is the ONLY
  source of the face.
- Use @image2 to reinforce skin texture, eye color, and fine facial detail.
- Use @image3 ONLY for pose, wardrobe, framing, lighting, and setting.
- Replace the [PERSON in @image3] with [TARGET] from @image1: keep the pose,
  the clothing, and the environment of @image3, but the face, hair and skin
  are entirely from @image1 and @image2.
- DO NOT use the face of the [person] in @image3.

SKIN TONE:
ALL visible skin — face, neck, ears, hands, wrists — must match the skin tone
of @image1. Do NOT inherit the skin tone of the [person] in @image3.

SCENE:
[What the character is doing, the action, the setting, the wardrobe — drawn
from @image3 — the mood and the moment.]

LIGHTING:
[Quality and direction of light: e.g. soft window light from camera-left,
warm practicals, motivated single key. Use "lit by / photographed under",
never "glowing / rendered".]

CAMERA:
shot on [camera body], [lens]mm lens, f/[N], ISO [N], shutter 1/[N]s,
lens-to-subject [N] m, subject-to-background [N] m, white balance [N]K.
Subject sharp with coherent background bokeh (no sharp-on-sharp pasted look).

MICRO-IMPERFECTIONS:
visible skin pores, faint stubble, subsurface scattering on the ears and nose,
individual eyebrow hairs, slight facial asymmetry, one flyaway strand of hair,
fine vellus hair, micro lip texture, subtle T-zone oil sheen.

PALETTE / FILM:
[e.g. Kodak Portra 400 warm editorial grade, lifted shadows, soft halation.]

NEGATIVES: no extra people, no face swap from @image3, no plastic CGI skin,
no text, no watermark, no logos invented.

Photographic realism, no text.
```

> **La coda fotográfica no es decorativa.** `shot on [...], [lens]mm, f/[N], ISO [N], natural color grade, photographic realism, no text` activa los *priors* de fotografía sobre los de ilustración. Las specs de cámara (lente, apertura, ISO, distancias, CCT) son **obligatorias** en el párrafo NL. Y se cierra SIEMPRE en `Photographic realism, no text.` — el `no text` evita que el modelo invente marcas, carteles o subtítulos ilegibles.

---

## 4. Versión de ejemplo, rellenada y completa

Caso: **Elliot**, personaje masculino recurrente, entra en una escena nueva de bar nocturno. Tenemos su identity sheet (`@image1`), un selfie close-up (`@image2`) y una scene ref de un bar con un hombre sentado a la barra cuya cara NO queremos (`@image3`).

### 4a. Párrafo NL (lo que se manda como `params.prompt`)

```text
A 34-year-old Mediterranean man, short dark-brown wavy hair parted to the left,
warm hazel eyes, light stubble along the jaw, a small mole above the right
eyebrow, lean athletic build.

REF ROLES:
- Use @image1 for facial identity, bone structure, and hair. This is the ONLY
  source of the face.
- Use @image2 to reinforce skin texture, eye color, and fine facial detail.
- Use @image3 ONLY for pose, wardrobe, framing, lighting, and setting.
- Replace the man seated at the bar in @image3 with the man from @image1:
  keep his pose, his dark blazer, and the neon-lit bar around him, but the
  face, hair and skin are entirely from @image1 and @image2.
- DO NOT use the face of the man in @image3.

SKIN TONE:
ALL visible skin — face, neck, ears, hands, wrists — must match the warm olive
skin tone of @image1. Do NOT inherit the skin tone of the man in @image3.

SCENE:
He sits alone at a dimly lit cocktail bar, one hand resting around a lowball
glass, looking slightly off-camera in quiet thought. Late evening, near-empty
bar, the city blurred through the window behind him.

LIGHTING:
Lit by a warm amber practical above the bar from camera-left and a faint cool
neon spill from the window behind; single motivated key, soft falloff.

CAMERA:
shot on a Sony A7S III, 50mm lens, f/1.8, ISO 1600, shutter 1/60s,
lens-to-subject 1.6 m, subject-to-background 4 m, white balance 3400K.
Subject sharp with coherent warm background bokeh, no sharp-on-sharp pasted look.

MICRO-IMPERFECTIONS:
visible skin pores, faint stubble along the jaw, subsurface scattering on the
ears and nose, individual eyebrow hairs, slight facial asymmetry, one flyaway
strand of hair, micro lip texture, a subtle T-zone oil sheen.

PALETTE / FILM:
Kodak Vision3 500T cinematic teal-and-amber grade, clean blacks, fine grain.

NEGATIVES: no extra people, no face swap from @image3, no plastic CGI skin,
no text, no watermark, no invented logos.

Photographic realism, no text.
```

### 4b. JSON Decoded Brief (la otra mitad de la salida PromptDirector)

Se muestra al humano para revisión rápida; en el payload va stringificado dentro de `params.prompt` (preferencia de `nano_banana_pro` — ver `knowledge/00-metodologia-promptdirector.md`).

```json
{
  "subject_identity": "34yo Mediterranean man, short dark-brown wavy hair, hazel eyes, light stubble, mole above right eyebrow; identity from @image1 + @image2",
  "ref_roles": {
    "@image1": "facial identity, bone structure, hair — ONLY source of the face",
    "@image2": "reinforce skin texture, eye color, fine facial detail",
    "@image3": "pose, wardrobe, framing, lighting, setting ONLY — face NOT used"
  },
  "skin_tone_lock": "all visible skin (face, neck, ears, hands, wrists) = warm olive of @image1; do not inherit @image3 skin tone",
  "realism": "photographic, micro-imperfections not '8k'",
  "environment": "dimly lit cocktail bar, late evening, near-empty, city blurred through window",
  "lighting": "warm amber practical key from camera-left + faint cool neon spill from window; single motivated key, soft falloff",
  "camera": {
    "body": "Sony A7S III",
    "lens_mm": 50,
    "aperture": "f/1.8",
    "iso": 1600,
    "shutter": "1/60s",
    "lens_to_subject_m": 1.6,
    "subject_to_bg_m": 4,
    "cct_k": 3400
  },
  "composition": "seated at bar, one hand on lowball glass, looking off-camera, quiet",
  "imperfections": "skin pores, faint stubble, subsurface scattering ears/nose, individual eyebrow hairs, slight asymmetry, one flyaway strand, micro lip texture, T-zone oil sheen",
  "palette": "Kodak Vision3 500T teal-and-amber, clean blacks, fine grain",
  "mood": "intimate, contemplative, late-night",
  "negatives": ["no extra people", "no face swap from @image3", "no plastic CGI skin", "no text", "no watermark", "no invented logos"]
}
```

### 4c. Cómo se ata al payload de la API

Esto es lo mínimo que define el stack en la llamada `generate_image` (parámetros completos en `knowledge/01-higgsfield-mcp.md`):

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "9:16",
  "params": { "prompt": "<el párrafo NL / JSON brief de arriba>" },
  "medias": [
    { "role": "image", "value": "<media_id de la identity sheet>" },
    { "role": "image", "value": "<media_id del selfie close-up>" },
    { "role": "image", "value": "<media_id de la scene/wardrobe ref>" }
  ]
}
```

> **Recuerda:** `resolution: "4k"` (el default es 1k — hay que pasarlo). `role` siempre `"image"`. Y el ORDEN de `medias[]` define qué es `@image1`, `@image2`, `@image3`. Para preflight de coste sin lanzar el job: `get_cost: true`.

---

## 5. Checklist antes de lanzar (léelo cada vez)

- [ ] **¿Anchor words ARRIBA**, antes del primer `@image`? (Si no, la cara se diluye.)
- [ ] **¿3-4 refs máximo**, identity sheet en `@image1`? (Más de 4 = atención diluida.)
- [ ] **¿`role: "image"`** en cada media, y orden = tokens `@imageN`?
- [ ] Si la scene ref tiene una persona: **¿bloque REF ROLES con reemplazo + "DO NOT use the face of the [person] in @image3"?** ¿Y NADA de `"keep @image3 exactly"`?
- [ ] **¿Skin-tone lock** enumerando la piel visible de tu encuadre?
- [ ] **¿Micro-imperfecciones** específicas para este plano (NO "hyperrealistic 8k")?
- [ ] **¿Specs de cámara** completas en el NL (lente, f/, ISO, distancias, CCT)?
- [ ] **¿DOF coherente** (sujeto nítido + bokeh de fondo, no nítido-sobre-nítido)?
- [ ] **¿Termina en `Photographic realism, no text.`?**
- [ ] **¿`resolution: "4k"`** en la llamada?

---

## 6. Higiene de sesión (no la saltes)

La consistencia se degrada con el uso. Estas reglas vienen de `knowledge/04-consistencia-personaje.md` y son la diferencia entre un personaje que aguanta 15 tomas y uno que muta a la quinta:

- **Re-ancla cada ~5 generaciones.** Coge un buen keyframe que te haya salido bordado y úsalo como **nueva** ref de identidad (`@image1`) para las siguientes. Sesión fresca cada 5-10 gens.
- **No encadenes variante-de-variante.** No partas de "la última imagen que salió" para hacer la siguiente: el drift se acumula. **Re-genera desde el prompt estructural** que funcionó, con TODAS las refs de identidad adjuntas de nuevo.
- **Wardrobe lock siempre.** Cuando trabajas un personaje conocido en escenas nuevas, incluye SIEMPRE una ref canónica de vestuario/estilo. Sin ella, deriva el gorro, la ropa, el pelo.
- **Volumen alto (10+ beats)?** No sigas peleando ref a ref: **entrena un Soul ID** (15-25 fotos variadas del personaje, ~3-5 min de entrenamiento) y obtienes un token de identidad persistente que no depende del stack de refs en cada llamada.
- **¿Cambias de workspace?** Todos los `media_id` se invalidan. **Re-sube las refs** y reconstruye el stack. (Ver `knowledge/07-troubleshooting.md`.)

---

## 7. De la imagen al vídeo

Cuando tengas el keyframe del personaje clavado y quieras moverlo:

- Para **micro-movimiento** (una respiración, un parpadeo, sway de pelo, talking head contenido) → `kling3_0`. **Pasa `aspect_ratio: "9:16"` explícito** (su default es 16:9 y NO auto-matchea al start_image).
- Para **movimiento complejo** (cámara que se mueve, multi-actor sincronizado, physics) → `seedance_2_0` con `resolution: "1080p"` y `aspect_ratio: "9:16"` forzado.
- Para **diálogo / lipsync** → arranca de `templates/talking-head-lipsync.md`. El lipsync fino NO está expuesto por el MCP: se genera el clip con movimiento de boca (metiendo la línea de diálogo LITERAL entre comillas) y se aplica el lipsync después en la web UI de Higgsfield.

Detalle de motores y gramática de movimiento: `knowledge/03-modelos-video.md` y `knowledge/06-direccion-movimiento.md`.

---

### Archivos relacionados
- `knowledge/04-consistencia-personaje.md` — la teoría completa detrás de cada bloque de aquí.
- `knowledge/00-metodologia-promptdirector.md` — JSON brief + NL, la salida en 2 partes.
- `knowledge/05-biblia-hiperrealismo.md` — por qué micro-imperfecciones y no "8k".
- `templates/prompt-imagen.md` — la plantilla de prompt de imagen general.
- `templates/talking-head-lipsync.md` — siguiente paso si el personaje habla.
- `knowledge/01-higgsfield-mcp.md` · `knowledge/07-troubleshooting.md` — payload, subida de refs y trampas.