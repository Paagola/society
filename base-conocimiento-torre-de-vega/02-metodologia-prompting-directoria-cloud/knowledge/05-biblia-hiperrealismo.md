# 05 — La Biblia del Hiperrealismo

> **La regla madre de todo el sistema.** Cada imagen fija (y cada fotograma de vídeo) que produzcas debe leerse como **un anuncio premium real**, fotografiado con una cámara real, por una persona real. En el momento en que algo "parece IA", "parece CGI" o "parece render", has fracasado — da igual lo bonito que sea.
>
> Este archivo es el filtro de calidad. Antes de mandar cualquier prompt a generar, pásalo por esta biblia: ¿he eliminado el lenguaje de estilización? ¿he puesto una cámara, una óptica y una película? ¿he añadido micro-imperfecciones por material? ¿he fijado la escala en cm? ¿he respetado el logo 1:1?

Archivos hermanos relevantes:
- `00-metodologia-promptdirector.md` — la estructura de salida (JSON Decoded Brief + párrafo NL). El hiperrealismo se aplica DENTRO de esa estructura, sobre todo en los campos `realism`, `camera` e `imperfections` y en la coda final del párrafo.
- `04-consistencia-personaje.md` — las micro-imperfecciones de **piel/pelo** del personaje viven aquí, y se cruzan con las reglas de identidad de ese archivo.
- `06-direccion-movimiento.md` — la versión "en movimiento" de esta biblia: el equivalente a "no glow" en vídeo es "no ojos que brillan, no fairy dust, no levitación gratis".
- `02-modelos-imagen.md` — qué modelo usar (nano_banana_pro vs soul vs marketing_studio). Esta biblia es agnóstica al modelo: el lenguaje fotográfico se aplica a todos.

---

## 0. Una nota sobre el idioma

Toda la conversación con el creador es en **español**. Pero **el prompt final, las codas, las frases prohibidas/sustitutas y las plantillas de esta biblia van en INGLÉS**.

Motivo: los modelos de imagen y vídeo rinden mejor en inglés — su vocabulario fotográfico (nombres de película, ópticas, aperturas, vocabulario de luz) está entrenado mayoritariamente sobre texto en inglés. "Shot on Kodak Portra 400" activa muchísimos más priors de foto real que "rodado en Kodak Portra 400".

Por eso esta biblia te da las frases **literales en inglés** para copiar y pegar. Explícale al creador en español qué hace cada una, pero entrégale el prompt en inglés.

---

## 1. Por qué los looks estilizados / CGI fallan

Los generadores de imagen tienen DOS grandes universos de imágenes en su entrenamiento:

1. **Fotografía real** — fotos de cámara, anuncios reales, editoriales, fotoperiodismo.
2. **Imagen sintética** — renders 3D, ilustración digital, concept art, "AI art" genérico, wallpapers de fantasía.

Cuando tu prompt usa palabras del universo (2), el modelo se desliza hacia ahí. Y el universo (2) tiene marcas visibles que el ojo humano detecta en milisegundos como "falso":

- **Plástico perfecto** — piel sin poros, sin vello, simétrica; "AI gloss" (un brillo aceitoso uniforme sobre todo).
- **Luz imposible** — luz que no viene de ninguna fuente física; objetos auto-iluminados; "glow" interno.
- **Materiales muertos** — vidrio sin huellas, metal sin micro-arañazos, tela sin pelusa ni arrugas, comida sin condensación.
- **Profundidad falsa** — sujeto nítido pegado sobre fondo igual de nítido (sin DOF coherente) = collage.
- **Composición de wallpaper** — todo centrado, simétrico, "épico", sin el desorden honesto de una foto real.

> **El principio operativo:** no le pides al modelo que "haga algo realista". Le **niegas el acceso** al universo sintético quitándole las palabras que lo invocan, y le **das las llaves** del universo fotográfico nombrando cámara, óptica, película y aperturas concretas. El realismo no es un adjetivo que añades; es un vocabulario que sustituye.

Esto conecta con la metodología (`00-metodologia-promptdirector.md`): por eso **nunca** escribimos `hyperrealistic 8k ultra detailed`. Eso es vocabulario del universo (2) — paradójicamente, pedir "hiperrealista" empuja hacia el render. El realismo se construye con **especificaciones de cámara + micro-imperfecciones**, no con adjetivos de intensidad.

---

## 2. Frases PROHIBIDAS y sus sustitutas

Esta es la lista negra. Si alguna de estas aparece en tu prompt, reescríbela. La columna de la derecha es lo que pones en su lugar — **literal, en inglés**.

| PROHIBIDO (invoca el render) | SUSTITUTO (invoca la foto) | Por qué |
|---|---|---|
| `rendered as` / `3D render` / `CGI` | `photographed`, `shot on [cámara]` | "render" literalmente es la palabra del universo sintético. |
| `glowing silhouette` / `silhouette of light` | `rim-lit by a [fuente] behind her`, `backlit, edge caught by a hard light` | El glow no tiene fuente física; el rim-light sí (hay una luz detrás). |
| `neon glow` / `glowing eyes` / `inner glow` | `lit by a neon sign`, `catchlight from a [fuente] in the eyes` | La luz entra desde fuera y se refleja; no sale del objeto. |
| `magical light` / `ethereal glow` / `fairy dust` | `wreathed in real smoke`, `dust motes drifting in the light beam`, `haze in the air` | Sustituye magia por **partículas físicas reales** (humo, polvo, bruma). |
| `hyperrealistic 8k ultra-detailed` | `[lente]mm, f/[N], ISO [N]`, + micro-imperfecciones concretas | Los adjetivos de intensidad empujan al render; las specs empujan a la foto. |
| `perfect skin` / `flawless` / `smooth skin` | `visible skin pores, faint stubble, fine vellus hair, subsurface scattering` | La piel perfecta es la firma nº1 de la IA. |
| `cinematic lighting` (a secas) | `lit by a soft key from camera-left, ~5600K, deep falloff into shadow` | "Cinematic" es un cajón vago; nombra la luz física. |
| `dramatic studio light` (a secas) | `single hard rim light, large softbox key, black flags cutting fill` | Igual: di QUÉ aparato y desde dónde. |
| `floating` / `levitating` (sin razón física) | suprimir, o `resting on`, `held in the palm` | La levitación gratis lee como fantasía. (Ver `06-direccion-movimiento.md`.) |
| `vibrant saturated colors` / `hyper-saturated` | `natural color grade`, `muted [película] palette` | La sobre-saturación es marca de wallpaper. |
| `digital art` / `concept art` / `illustration` / `artstation` | `editorial photograph`, `advertising still`, `documentary photograph` | Nombra el género **fotográfico** real. |
| `flawless symmetry` / `perfectly symmetrical` | `slight natural asymmetry`, `candid, off-center` | La cara/cuerpo humanos NO son simétricos. |
| `plastic` / `glossy surface` (involuntario) | `matte`, `satin finish with fine fingerprints` | El plástico brillante es la textura del CGI. |
| `8k`, `4k ultra HD` como **estilo** | (la resolución se pide en el param `resolution`, no en el texto) | En el texto, "8k" es solo más combustible de render. La resolución real es un parámetro (ver `02-modelos-imagen.md`). |

**Tres verbos que casi siempre salvan un prompt:** `photographed`, `lit by`, `shot on`. Si dudas, reescribe la frase para que use uno de los tres.

> **Caso real del proyecto:** el doberman "glow silhouette" del anuncio Black Opium fue un FALLO precisamente por esto. La solución no es "menos glow" — es **eliminar la palabra glow** y sustituirla por una luz física: `the doberman rim-lit from behind by a warm practical lamp, its short coat catching a hard edge of light, the rest of the body falling into shadow`. Ahora hay una lámpara real detrás del perro, no un aura mágica.

---

## 3. Biblioteca de FILM STOCKS (películas) y LENTES

Nombrar una película o una óptica concreta es el atajo más potente al hiperrealismo: cada nombre arrastra un "paquete" completo de grano, color, contraste y carácter que el modelo aprendió de millones de fotos reales tomadas con ese material.

> **Cómo se usa en el prompt:** va en la **coda fotográfica** (ver §5) y/o en el campo `camera`/`realism` del JSON Decoded Brief. Formato: `shot on [cámara/película], [lente]mm, f/[N], ISO [N]`.

### 3.1 Film stocks

| Stock | Carácter | Cuándo usarlo |
|---|---|---|
| **Kodak Portra 400** | Editorial cálido, **halation** suave en las altas luces, sombras levantadas, tonos de piel preciosos y favorecedores, grano fino. | Retrato editorial, belleza, moda cálida, UGC "premium". El default para piel bonita y look de revista. |
| **Kodak Vision3 500T** | **Cinematográfico** teal-orange, negros limpios y profundos, equilibrada para tungsteno (interiores cálidos), rango dinámico alto. | Cine, escenas de interior nocturnas, look de película de cine. El default para "esto parece un fotograma de largometraje". (T = tungsten/3200K.) |
| **Mamiya 7 80mm** | **Medio formato**, caída (falloff) suave y orgánica del foco, detalle altísimo en el plano enfocado, transición a desenfoque muy gradual. | Producto premium, retrato de lujo, bodegón de perfume. Cuando quieres esa tridimensionalidad cara del medio formato. (Es cámara+óptica a la vez.) |
| **Anamórfico** (lente, no stock) | **Bokeh oval**, flares horizontales, ligera distorsión en bordes, sensación "scope" de cine ancho. | Planos de cine de gran formato, hero shots, cuando quieres el lenguaje visual del cine comercial de alto presupuesto. Combina muy bien con Vision3 500T. |

> Cualquier otra película/cámara que el creador conozca y quiera (Cinestill 800T, Fuji 400H, Hasselblad, etc.) es válida — el principio es el mismo: **un nombre concreto > un adjetivo vago**. Si no estás seguro del carácter exacto de un stock que el creador menciona, no lo inventes: descríbelo por sus propiedades fotográficas reales o márcalo como **(verificar)**.

### 3.2 Lentes — el carácter por distancia focal

La distancia focal no es solo "cuánto zoom"; cambia la **psicología** del plano (compresión facial, relación con el fondo, intimidad).

| Lente | Carácter | Cuándo usarlo |
|---|---|---|
| **35mm** | Reportaje, "estás ahí", incluye contexto/entorno alrededor del sujeto. Ligera amplitud. | UGC honesto, lifestyle, documental, escena con entorno. |
| **50mm** | "Ojo humano", neutro, natural, sin distorsión. | El plano seguro y honesto por defecto. Retrato medio, producto en mano. |
| **85mm** | Retrato clásico, comprime y **adelgaza** los rasgos faciales (favorecedor), separa al sujeto del fondo con bokeh. | Beauty, retrato premium, primer plano de cara. El default para "que salga guapa/o". |
| **100–135mm** | Telefoto de retrato, máxima compresión, fondo muy desenfocado y comprimido, mucha intimidad. | Hero close-up, ojos, detalle de producto aislado del fondo. |
| **Anamórfico** | (ver arriba) bokeh oval + flares horizontales + look scope. | Hero shots de cine. |

### 3.3 Apertura (f/) — cuánto se desenfoca el fondo

| Apertura | Efecto | Uso |
|---|---|---|
| `f/1.4 – f/2` | Profundidad de campo finísima, fondo muy cremoso (bokeh), solo los ojos nítidos. | Retrato premium, aislar sujeto, hero close-up. |
| `f/2.8 – f/4` | Sujeto nítido, fondo agradablemente desenfocado pero legible. | El rango "todoterreno" para la mayoría de planos. |
| `f/5.6 – f/8` | Casi todo nítido, poca separación. | Producto donde quieres ver todo el objeto enfocado, grupo, entorno. |
| `f/11 – f/16` | Todo nítido de delante a atrás. | Paisaje, escena amplia. Raro en retrato/producto premium. |

> **Regla de coherencia de DOF (crítica):** si pones al sujeto a `f/1.4`, el fondo DEBE estar desenfocado. Un sujeto nítido sobre un fondo igualmente nítido es la firma del "collage IA" — parece pegado. En el JSON brief esto se controla con las distancias `lens-to-subject` y `subject-to-bg` (ver `00-metodologia-promptdirector.md`): cuanto más lejos el fondo del sujeto y más abierta la apertura, más bokeh. Ejemplo: `lens-to-subject 1.5 m, subject-to-bg 6 m, f/1.8` → fondo bien fundido.

---

## 4. Diccionario de MICRO-IMPERFECCIONES por material

Las micro-imperfecciones son lo que separa una foto de un render. **Ninguna superficie real es perfecta.** Este diccionario te da, por material, las imperfecciones concretas que debes nombrar (en inglés, para el prompt). Elige 2–4 por material visible en la escena — no hace falta listarlas todas.

### Piel (humana)
> Esto se solapa con `04-consistencia-personaje.md`; ahí se exige por la cara del personaje recurrente. Aquí es por hiperrealismo general.

```
visible skin pores, fine vellus hair (peach fuzz) along the jaw and cheek,
subsurface scattering on the ears, nostrils and lips, individual eyebrow hairs,
faint stubble / faint razor shadow, slight asymmetry in the face,
micro lip texture and fine vertical lip lines, T-zone oil sheen on forehead and nose,
a couple of small freckles or a tiny blemish, faint under-eye texture
```

### Pelo
```
a few flyaway strands catching the light, individual hairs at the hairline (not a helmet),
slight frizz, natural part with uneven density, baby hairs at the temples,
strands separating into clumps rather than a solid mass, a single loose hair across the cheek
```

### Tela / ropa
```
natural fabric wrinkles and creases where the body bends, fine lint and a stray thread,
visible weave texture, soft sheen on satin / matte nap on cotton,
a slight pull at a seam, the fabric draping under its own weight,
faint wear at the cuffs or collar
```

### Vidrio (frasco de perfume, copa, ventana)
```
soft fingerprints and a faint smudge near where it's held, a single dust speck,
real refractions bending the background through the glass,
specular highlights with a defined hard edge (a real light source reflected),
the liquid level slightly catching light, a faint meniscus, micro-bubbles in thick glass
```

### Metal (tapón, joya, superficie)
```
fine micro-scratches and brushed-grain texture, real reflections of the surroundings
(not a generic chrome gradient), tiny dust, a slightly worn edge,
specular hot-spots that map to actual lights in the scene, a faint fingerprint smudge
```

### Comida / bebida
```
condensation droplets running down a cold glass, real steam rising from something hot,
crumbs, an uneven natural edge (food is never a perfect circle),
glossy moisture on fresh produce, a slight char or browning, oil sheen,
melting at the edges, a crumb that fell onto the table
```

> **Por qué micro-imperfecciones > "ultra detailed":** "ultra detailed" le pide al modelo MÁS de lo que ya hace mal (plástico perfecto, más nítido). Una imperfección concreta ("a soft fingerprint near the cap") le pide algo que **solo existe en fotos reales** — y por tanto lo empuja al universo fotográfico. Detalle ≠ realismo. Imperfección = realismo.

---

## 5. Codas fotográficas (plantilla)

La **coda** es la frase que cierra el párrafo en lenguaje natural (la parte (2) de la salida PromptDirector, ver `00-metodologia-promptdirector.md`). Su trabajo: activar de golpe los priors de fotografía sobre los de ilustración, y cerrar con `no text`.

**Estructura canónica de la coda:**

```
Shot on [cámara/película], [lente]mm, f/[N], ISO [N], [grade], photographic realism, no text.
```

Codas plantilla listas para copiar (rellena lo que esté entre corchetes; el resto es literal):

```
# Retrato editorial cálido / belleza
Shot on Kodak Portra 400, 85mm, f/1.8, ISO 400, warm natural color grade with soft halation, photographic realism, no text.

# Cine nocturno interior / look de largometraje
Shot on Kodak Vision3 500T, 35mm anamorphic, f/2.8, ISO 500, teal-and-orange cinematic grade, clean deep blacks, photographic realism, no text.

# Producto / bodegón de perfume premium
Shot on Mamiya 7, 80mm, f/4, ISO 100, neutral color grade, soft medium-format falloff, photographic realism, no text.

# UGC honesto / lifestyle (estética menos "perfecta")
Shot on a phone-style 26mm equivalent lens, f/2.2, natural window light, slightly imperfect handheld framing, true-to-life color, photographic realism, no text.

# Hero close-up de ojos / detalle
Shot on Kodak Portra 400, 135mm, f/2, ISO 400, shallow focus with creamy bokeh, photographic realism, no text.
```

> **Regla:** la coda **siempre termina en `no text`** (regla de rigor de PromptDirector: nunca texto legible inventado). Si el anuncio necesita un claim o logotipo, ese texto se compone **después** en edición/post, no lo genera el modelo — porque el modelo inventa letras rotas. La única excepción es el branding del propio producto reproducido desde una ref (ver §7).

---

## 6. Regla de ESCALA (dimensiones en cm)

Los generadores **no tienen sentido de la escala**. Si no les dices cuánto mide un objeto, lo inflan grotescamente — un frasco de perfume acaba del tamaño de una botella de champán en la mano del modelo.

> **Regla:** todo objeto cuya escala importe lleva **dimensiones explícitas en centímetros** en el prompt, y una **referencia de tamaño humana** ("fits in the palm", "as tall as her hand").

Ejemplo del proyecto (Black Opium, regla canónica del sistema):

```
The Black Opium bottle is small — a 90 ml flacon, roughly 7 × 6 × 4 cm,
that fits entirely in the palm of her hand; it must NOT look oversized.
```

Plantilla genérica:

```
[objeto] is [ancho] × [alto] × [fondo] cm, [referencia humana de tamaño]; do NOT inflate its scale.
```

Cómo medir si no lo sabes: usa la ref real del producto, o el dato del fabricante (ml/volumen ayuda a inferir). Si no puedes determinarlo, **no inventes números** — pídele la medida al creador o márcalo **(verificar)**. Un número inventado es peor que ninguno porque el creador confiará en él.

---

## 7. Fidelidad de PRODUCTO y LOGO 1:1

Cuando el anuncio gira en torno a un producto de marca, el logo y el packaging **se reproducen exactamente desde la referencia, sin alterar**. Esto **anula** cualquier instrucción genérica de "no inventar texto" (§5): el branding del producto real NO es texto inventado, es la marca que se está anunciando, y debe ser legible y correcta.

Reglas:

1. **No scrubbear el branding.** No borres, difumines ni "reimagines" el logo. Reprodúcelo 1:1 desde la ref del producto.
2. **Pasa la ref del producto como imagen ancla.** El logo se preserva mucho mejor cuando viene de una ref real que cuando se describe con palabras. Con `nano_banana_pro` (líder en preservación de identidad/branding, ver `02-modelos-imagen.md`) y `resolution:"4k"`, pasa el frasco como `@imageN` y referéncialo explícitamente.
3. **Instrucción explícita en el prompt** (en inglés, literal):

```
Reproduce the [marca] logo and label on the bottle EXACTLY as in @image1 — same wordmark,
same typography, same layout, same colours. Do NOT alter, blur, restyle or remove any branding.
The label text must remain crisp and legible.
```

4. **Cruza con la escala (§6):** producto a escala real + logo fiel = el producto se reconoce al instante como el real, no como una imitación.

> **Caso del proyecto:** la regla "el frasco debe incluir los logos reales" **anula el brief** que pedía no mostrar branding. La marca Black Opium / YSL se reproduce 1:1 desde la imagen de referencia. Sin esto, el anuncio no vende el producto del cliente — vende un frasco genérico.

---

## 8. Checklist final de hiperrealismo (pásalo a CADA prompt antes de generar)

```
[ ] LENGUAJE: cero frases de la lista negra (§2). Ningún "glow", "rendered as",
    "magical", "hyperrealistic 8k", "perfect skin", "flawless".
[ ] CÁMARA: el párrafo NL nombra cámara/película, lente (mm), apertura (f/),
    ISO. (Specs de cámara obligatorias — regla PromptDirector.)
[ ] PELÍCULA/ÓPTICA: he elegido el stock y la lente por su CARÁCTER, no al azar (§3).
[ ] DOF COHERENTE: si f/ abierto, el fondo está desenfocado; distancias
    lens-to-subject / subject-to-bg coherentes. No nítido-sobre-nítido.
[ ] MICRO-IMPERFECCIONES: 2–4 por cada material visible (piel, pelo, tela,
    vidrio, metal, comida) (§4). Nada de "perfect/flawless".
[ ] LUZ FÍSICA: toda luz tiene una fuente nombrada ("lit by…", "rim-lit by…").
    Nada se auto-ilumina.
[ ] ESCALA: dimensiones en cm + referencia humana para cada objeto que importe (§6).
[ ] LOGO/PRODUCTO: si hay marca, instrucción de reproducir 1:1 desde la ref,
    ref pasada como @imageN, branding no scrubbeado (§7).
[ ] CODA: el párrafo termina en "…photographic realism, no text." (§5).
[ ] GÉNERO: descrito como "editorial photograph / advertising still / documentary
    photograph", nunca "digital art / concept art / illustration".
```

Si los diez salen marcados, el prompt está limpio para generar. Si alguno falla, reescribe antes de gastar un job — sale más barato corregir el texto que regenerar (ver límites de jobs en `07-troubleshooting.md`).

---

## 9. Mini-resumen para el agente

- El hiperrealismo no es un adjetivo; es **sustituir vocabulario de render por vocabulario de foto**.
- Tres verbos salvavidas: **`photographed`, `lit by`, `shot on`**.
- Toda luz tiene fuente. Toda superficie tiene imperfecciones. Todo objeto tiene tamaño en cm. Toda marca se reproduce 1:1.
- Nombra película + lente + apertura + ISO concretos; cierra en `photographic realism, no text.`
- Prompts y codas SIEMPRE en inglés; la conversación con el creador SIEMPRE en español.
- Este filtro se aplica encima de la estructura de `00-metodologia-promptdirector.md` y antes de cualquier llamada a `generate_image` (`01-higgsfield-mcp.md`).