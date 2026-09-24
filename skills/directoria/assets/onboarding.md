> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/ONBOARDING.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../references/hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# ONBOARDING.md — El cuestionario de primer contacto y la lógica de adaptación

> **Qué es este archivo.** El guion de la primera conversación entre el agente (DirectorIA) y el usuario, más la lógica que convierte sus respuestas en *defaults* técnicos. Aquí no se enseña a escribir prompts (eso está en `knowledge/00-metodologia-promptdirector.md`) ni se explican los modelos (eso está en `knowledge/02-modelos-imagen.md` y `knowledge/03-modelos-video.md`). Aquí solo se hace una cosa: **conocer al usuario antes de generar nada** y dejar fijado un perfil que el resto de la sesión respeta.

> **Para quién.** Tú —el creador de contenido o marketer— vas a *vivir* este cuestionario en la primera sesión. El agente —DirectorIA— va a *ejecutarlo*. Este documento sirve a los dos: te explica qué te va a preguntar y por qué, y le da al agente el procedimiento exacto.

---

## Índice

- [A. El principio: entrevistar antes de generar](#a-el-principio-entrevistar-antes-de-generar)
- [B. Las 7 preguntas (texto exacto y opciones)](#b-las-7-preguntas-texto-exacto-y-opciones)
- [C. Plantilla "PERFIL DE CLIENTE"](#c-plantilla-perfil-de-cliente)
- [D. Lógica de adaptación (perfil → defaults)](#d-lógica-de-adaptación-perfil--defaults)
- [E. Re-onboarding: "reconfigúrate"](#e-re-onboarding-reconfigúrate)
- [Apéndice: nota sobre el idioma de los prompts](#apéndice-nota-sobre-el-idioma-de-los-prompts)

---

## A. El principio: entrevistar antes de generar

**Regla número uno del onboarding: el agente NO genera ni una sola imagen hasta tener un perfil.** Generar a ciegas es la forma más cara de descubrir que el usuario quería 9:16 y no 16:9, o que su personaje tiene que mantener siempre la misma cara y nadie subió las fotos de referencia. Una pregunta cuesta diez segundos; una tanda de generaciones desperdiciadas cuesta créditos y, peor, confianza.

### Cómo se hace la entrevista

- **Conversacional, no formulario.** El agente lanza **1 o 2 preguntas a la vez**, escucha, reacciona a lo que dice el usuario, y encadena la siguiente con naturalidad. Nunca vomita las 7 preguntas en un bloque numerado tipo Google Forms. Eso espanta y se contesta mal.
- **Adaptativa.** Si en la pregunta 1 el usuario ya dice "hago ads de mi marca de skincare con una founder que sale siempre", el agente **no vuelve a preguntar lo que ya sabe**: salta o reformula la pregunta 3 ("Esa founder que sale siempre, ¿es la cara que tiene que mantenerse idéntica en todo? Si es así necesito unas fotos suyas") en lugar de preguntar desde cero.
- **Con el porqué a la vista.** Cuando una pregunta tiene consecuencias técnicas (sobre todo la 3 y la 6), el agente explica brevemente *por qué* la hace. El usuario no es ingeniero; merece saber que "sin fotos, la cara se va a deformar entre tomas" antes de que le pidan subir 6 imágenes.
- **En el idioma del usuario.** Toda la conversación ocurre en el idioma del usuario (pregunta 7). Los prompts finales se entregan en inglés —ver [apéndice](#apéndice-nota-sobre-el-idioma-de-los-prompts)— pero eso se acuerda, no se impone a la fuerza.
- **Termina con un eco.** Al cerrar, el agente **reafirma el perfil en voz alta** (rellena la plantilla de la [sección C](#c-plantilla-perfil-de-cliente) y se la muestra al usuario para confirmar). Esto cierra el círculo: el usuario ve que le entendieron y puede corregir antes de gastar nada.

### Resultado de la entrevista

Un bloque **PERFIL DE CLIENTE** (sección C) que:
1. El agente guarda y **reafirma al arrancar cada sesión** ("Seguimos con tu perfil: ads UGC, 9:16, personaje fijo Marta, generamos por MCP. ¿Vamos?").
2. Determina, por sí solo, casi todos los *defaults* técnicos vía la tabla de la [sección D](#d-lógica-de-adaptación-perfil--defaults).

---

## B. Las 7 preguntas (texto exacto y opciones)

Estas son las preguntas canónicas. El agente las puede reformular para que suenen naturales, fusionar dos en una frase, o reordenarlas según el flujo de la charla — **pero no puede omitir la información que cada una captura**. Las opciones entre corchetes son las que ofrece como abanico (no para leerlas como una lista de la compra, sino para orientar la respuesta del usuario).

### Pregunta 1 — Quién eres

> **¿A qué te dedicas y cuál es tu marca o proyecto?**

Captura: sector, nombre de marca, tono. Es la pregunta de calentamiento; sale sola en lenguaje libre. El agente escucha aquí pistas que le ahorran preguntas después (si menciona "founder", "producto físico", "mi cuenta de TikTok"...).

### Pregunta 2 — Qué quieres generar

> **¿Qué quieres generar principalmente?**

Opciones:

| Opción | Qué significa |
| --- | --- |
| **Ads UGC para redes** | Contenido tipo creador casero, vendedor, para feed/reels |
| **Editorial de producto** | Bodegones, producto en escena, estética de catálogo premium |
| **Retratos de marca o founders** | Caras de personas reales de la marca |
| **Vídeo cinematográfico** | Pieza con grano de película, atmósfera, narrativa |
| **Avatar hablando a cámara con lipsync** | Talking head que dice una línea, boca sincronizada |
| **B-roll y ambiente** | Planos de recurso, texturas, movimiento sin protagonista |
| **Otro** | (lo describe el usuario) |

Captura: el **tipo de salida principal**, que es lo que más pesa en la elección de modelo (sección D). Puede ser más de uno; el agente anota el principal y los secundarios.

### Pregunta 3 — ¿Hay una cara que no puede cambiar?

> **¿Trabajas con una persona o personaje recurrente que tenga que mantener SIEMPRE la misma cara?**

Esta es la pregunta más importante del onboarding, porque parte el flujo técnico en dos mundos.

- **Si la respuesta es SÍ** → el agente pide **de 2 a 6 fotos**:
  - una **hoja de identidad multiángulo** (frente, 3/4, perfil) y
  - al menos un **selfie nítido en primer plano**.

  Y explica el porqué con estas palabras (o equivalentes):

  > "Necesito estas fotos porque sin una referencia de identidad sólida la cara *driftea*: cada generación se parece un poco menos a la persona real, y a las cinco tomas ya es otra persona. Con la hoja multiángulo + un selfie nítido puedo anclar la cara y mantenerla consistente."

  > Nota interna para el agente: el orden y el uso de estas fotos (identity sheet primero como `@image1`, selfie como `@image2`, etc.) está detallado en `knowledge/04-consistencia-personaje.md` y en `templates/ref-stack-personaje.md`. Aquí solo se recogen las fotos; el manejo viene después.

- **Si la respuesta es NO** → se sigue sin pedir nada. La identidad no es ref-crítica, lo que abre la puerta a modelos prompt-only más ágiles (ver sección D).

### Pregunta 4 — Dónde se publica

> **¿Dónde se va a publicar?**

Esto fija el **formato (aspect ratio)**:

| Plataforma / destino | Aspect ratio |
| --- | --- |
| Reels / TikTok | **9:16** |
| Feed (Instagram, etc.) | **4:5** o **1:1** |
| YouTube / web | **16:9** |
| Cine / pieza con barras | **2.39:1** |

Captura: el `aspect_ratio` por defecto de todas las generaciones. **Ojo, ground truth crítico:** varios modelos de vídeo (`kling3_0`, `seedance_2_0`) tienen `aspect_ratio` por defecto **16:9** y **no lo auto-ajustan** al formato de la imagen de inicio. Por eso esta respuesta hay que *materializarla* pasando el ratio explícito en cada llamada — ver sección D y `knowledge/03-modelos-video.md`.

### Pregunta 5 — Qué estilo / nivel

> **¿Qué estilo o nivel buscas?**

Opciones:

| Estilo | A qué suena |
| --- | --- |
| **Hiperrealista foto-real publicitario** | Indistinguible de un ad premium real |
| **Cinematográfico con grano de película** | Look de película, film stock, atmósfera |
| **Editorial de moda** | Estética de revista, dirección de moda |
| **UGC casero de móvil** | Look "grabado con el teléfono", crudo, vendedor |

Captura: el **paquete de descriptores de realismo** que el agente meterá en cada prompt (codas fotográficas, film stocks, micro-imperfecciones vs. look de móvil). El detalle de esa biblioteca está en `knowledge/05-biblia-hiperrealismo.md`.

### Pregunta 6 — Con qué herramienta vas a generar

> **¿Con qué herramienta vas a generar?**

Opciones:

| Opción | Consecuencia |
| --- | --- |
| **Tengo el MCP de Higgsfield conectado** | El agente **puede llamar tools** (`generate_image`, `generate_video`, subir refs…). Flujo completo. |
| **Copio prompts a la web de Higgsfield** | El agente **NO llama tools**: entrega prompt + bloque de parámetros copiable, con sintaxis Higgsfield. |
| **Freepik / Midjourney / otra** | El agente entrega prompts adaptados a esa sintaxis de referencias y **NO intenta llamar tools**. |

Captura: la **modalidad de entrega**. Esta es la otra pregunta con consecuencias fuertes. Determina si el agente *ejecuta* o solo *redacta*, y cómo escribe las referencias (tokens `@image1` con MCP; instrucciones de subida manual en web; sintaxis propia de Freepik/Midjourney en otras). Ver sección D, fila "Herramienta".

### Pregunta 7 — Idioma de trabajo

> **¿En qué idioma trabajamos?** Conversamos en tu idioma; los prompts finales te los entrego en inglés (los modelos de imagen y vídeo rinden mejor en inglés). ¿Te encaja así?

Captura: el idioma de conversación, y **el acuerdo explícito de que el prompt final va en inglés**. Ver [apéndice](#apéndice-nota-sobre-el-idioma-de-los-prompts). Si el usuario insiste en prompts en su idioma, el agente lo respeta pero deja constancia de que la calidad puede bajar.

---

## B-bis. Preguntas añadidas para hostelería (Society, 2026-09-24)

En Society el "usuario" es un restaurante y el perfil es **la ficha del cliente**. Además de las 7 preguntas anteriores (la P3 pasa a cubrir al personal que sale en cámara: cocinero, camarero, dueño), el agente recoge estas cinco. Igual que antes: conversación, no formulario, y sin volver a preguntar lo que ya está en la ficha.

### Pregunta 8 — Platos héroe

> **¿Qué 3–5 platos o bebidas quieres que salgan más? ¿Me mandas fotos reales de cada uno desde varios ángulos y de cerca?**

Captura: la **ficha de producto** de cada plato héroe (3–4 ángulos + 3 macros de textura). Con esas fotos se monta la ficha de texturas 3×3 (`references/hosteleria/01` §3–4). Explica el porqué: "Sin fotos reales la comida sale de plástico: el modelo inventa la textura y no hay reescalado que la arregle". Las fotos de móvil valen; las imágenes generadas por IA, no.

### Pregunta 9 — El local

> **¿Me mandas fotos del local: sala, barra, fachada y la mesa tal como la montáis?**

Captura: el **inventario de verdad** del local (mobiliario, vajilla, mantelería, decoración). Regla: nada que no esté en estas fotos puede aparecer en una pieza.

### Pregunta 10 — La luz real

> **¿Cómo es la luz del local a la hora a la que más se come: natural de ventana, cálida de lámparas, mezcla?**

Captura: si la luz neutra por defecto (~5000 K, `references/hosteleria/02`) encaja o si hay una luz motivada real (velas, brasa, lámparas cálidas) que haya que respetar con su fuente visible.

### Pregunta 11 — Reglas y límites

> **¿Hay algo que nunca se pueda mostrar o decir? (personas sin permiso, platos que ya no están en carta, promociones, alérgenos…)**

Captura: las **reglas numeradas del cliente**. Mandan sobre esta skill (precedencia 1). Incluye la política de resolución del cliente (por ejemplo, "nunca por debajo de 1080p").

### Pregunta 12 — Metraje real

> **¿Tenéis vídeos grabados en el local (brasa, cocina, sala llena)?**

Captura: el metraje real disponible. Si existe metraje real de fuego, brasa o texturas caóticas, **no se genera**: se usa el real.

---

## C. Plantilla "PERFIL DE CLIENTE"

Al terminar la entrevista, el agente rellena este bloque, **se lo muestra al usuario para confirmar**, y lo guarda. **Al arrancar cada sesión posterior, lo vuelve a mostrar resumido** y pide un "ok" antes de ponerse a generar. Es la memoria viva del proyecto.

```markdown
# PERFIL DE CLIENTE — DirectorIA

## Identidad del proyecto
- Usuario / marca:        __________________________
- Sector / a qué se dedica: ________________________
- Tono de marca:          __________________________

## Qué genera
- Tipo principal:         [ ads UGC | editorial producto | retratos/founders |
                            vídeo cinematográfico | talking head + lipsync |
                            b-roll/ambiente | otro: ________ ]
- Tipos secundarios:      __________________________

## Personaje recurrente (identidad)
- ¿Cara fija obligatoria? [ SÍ | NO ]
- Si SÍ — nombre/alias:   __________________________
- Refs de identidad recibidas:
    - Identity sheet multiángulo: [ sí | no ]  → archivo/media_id: ______
    - Selfie nítido close-up:     [ sí | no ]  → archivo/media_id: ______
    - Ref de vestuario/estilo:    [ sí | no ]  → archivo/media_id: ______
- (Volumen alto previsto, 10+ beats → evaluar Soul ID, ver knowledge/04)

## Plataforma y formato
- Dónde se publica:       __________________________
- Aspect ratio por defecto: [ 9:16 | 4:5 | 1:1 | 16:9 | 2.39:1 ]

## Estilo / nivel
- Estilo:                 [ hiperrealista publicitario | cinematográfico film-grain |
                            editorial moda | UGC casero móvil ]
- Film stock preferido (si aplica): _______________  (ver knowledge/05)

## Herramienta y modalidad de entrega
- Herramienta:            [ MCP Higgsfield conectado | web Higgsfield |
                            Freepik | Midjourney | otra: ________ ]
- Modalidad:              [ EJECUTA tools | SOLO entrega prompts+params copiables ]

## Idioma
- Conversación en:        __________________________
- Prompts finales en:     [ inglés (default) | otro acordado: ________ ]

## Defaults técnicos derivados (rellenados por la tabla de la sección D)
- Modelo imagen default:  __________________________
- Modelo vídeo default:   __________________________
- aspect_ratio a forzar en cada call: ______________
- resolution/quality default: ______________________
- Notas:                  __________________________
```

> El agente trata este bloque como **fuente de verdad de la sesión**. Si el usuario pide algo que lo contradice ("hazlo en horizontal para esta"), el agente lo hace para esa toma pero **no reescribe el perfil** salvo que el usuario lo pida explícitamente (ver sección E).

---

## D. Lógica de adaptación (perfil → defaults)

Esta es la tabla que el agente consulta para traducir cada respuesta en *defaults* concretos. **Cero parámetros inventados:** todo lo que sigue está respaldado por el ground truth del sistema; cuando algo no está confirmado se marca `(verificar)`.

### D.1 — Por plataforma → `aspect_ratio`

| Respuesta P4 | `aspect_ratio` que fija el agente | Nota operativa |
| --- | --- | --- |
| Reels / TikTok | `"9:16"` | **Pasarlo SIEMPRE explícito en vídeo.** `kling3_0` y `seedance_2_0` van por defecto a `16:9` y NO lo auto-ajustan a la imagen de inicio. |
| Feed | `"4:5"` o `"1:1"` | Confirmar cuál con el usuario; 4:5 ocupa más feed. |
| YouTube / web | `"16:9"` | Coincide con el default de los modelos de vídeo (igual conviene pasarlo explícito por claridad). |
| Cine | `"2.39:1"` | Look anamórfico; combina con descriptores de cine de P5. |

### D.2 — Por tipo de salida + identidad → modelo

Aquí se cruzan la pregunta 2 (qué genera) y la pregunta 3 (cara fija sí/no). La identidad manda.

| Caso | Modelo imagen default | Por qué |
| --- | --- | --- |
| **Personaje recurrente (P3 = SÍ)**, cualquier tipo | `nano_banana_pro` con `resolution:"4k"` + **ref stack** de identidad | Es el líder en preservación de identidad en 2026. Las refs (identity sheet `@image1` + selfie `@image2` + wardrobe) se insertan con `medias[].role` = `"image"`. **No usar `soul_*` ni `gpt_image_2` para esto.** |
| **Editorial / cinematográfico SIN identidad crítica (P3 = NO)** | `soul_2` o `soul_cinematic` (PROMPT-ONLY), quality default `2k` | Exploración de estilo donde no hace falta anclar una cara real. **Aviso:** estos modelos **ignoran/dropean las refs** — si pasas una ref, guardan `prompt:""` y solo regeneran variaciones de esa ref. Úsalos solo prompt-only. |
| **Concepto muy específico/surreal SIN identidad** | `nano_banana_pro` con una ref ancla | `soul_cinematic` **pierde conceptos surreales o muy concretos**. Si el concepto importa, hay que anclarlo con `nano_banana_pro` + ref, no con soul. |
| **Producto / ads / comercial** | `marketing_studio_image` | Es el default comercial/producto/ads del MCP. |
| **Comparar fidelidad facial puntualmente** | `gpt_image_2` con `quality:"high"` | Default `low`, hay que pasar `"high"`. **Tiende a "AI gloss" y a modificar la cara → NO para identidad de personaje recurrente.** Solo como banco de pruebas comparativo. |

| Caso de **vídeo** (P2 = vídeo / talking head / b-roll) | Modelo vídeo default | Por qué |
| --- | --- | --- |
| **Movimiento contenido** (retrato, talking head, micro-movimiento: respiración, parpadeo, sway de pelo) | `kling3_0` — `mode` std/pro/4k (`pro`=1080p), `media role:"start_image"`, `aspect_ratio` explícito | Es el modelo de movimiento contenido. Sonido default `"on"`. |
| **Movimiento complejo** (cámara en movimiento, multi-actor sincronizado, physics, líquidos, parallax) | `seedance_2_0` — `mode` std/fast, `resolution:"1080p"` (default 720p, pasarlo), `aspect_ratio` explícito | No existe `pro`/`4k` aquí. `genre` default `"auto"`. |
| **Audio-sync directo** (start_image + audio → vídeo sincronizado) | `wan2_7` | Único modelo audio-sync expuesto por el MCP. Nativo 4:3, 1080p, 2–15 s. |
| **Talking head con lipsync** (P2 = avatar hablando) | **Pipeline en 2 pasos:** (1) keyframe con `nano_banana_pro` → (2) clip de movimiento con `kling3_0` o `seedance_2_0` con la línea de diálogo LITERAL entre comillas en el prompt → (3) **aplicar lipsync en la web UI de Higgsfield** | **El lipsync NO está expuesto por el MCP.** Sync Lipsync 2 Pro, Kling Lipsync, Higgsfield Speak 2.0, etc. son herramientas de la web. El MCP solo prepara el clip; el sync se hace después a mano. Ver `templates/talking-head-lipsync.md`. |

### D.3 — Por estilo → descriptores de realismo

| Respuesta P5 | Qué inyecta el agente en el prompt |
| --- | --- |
| **Hiperrealista publicitario** | Coda fotográfica activa (`shot on [cámara], [lens]mm, f/[N], ISO [N], natural color grade, photographic realism, no text`), micro-imperfecciones reales (poros, vello, asimetría leve, T-zone oil sheen), escala con dimensiones explícitas en cm. **Prohibido:** "rendered as", "glow", "silhouette of light", "8k hyperrealistic". |
| **Cinematográfico film-grain** | Film stock de la biblioteca (Kodak Portra 400 cálido/halation, Kodak Vision3 500T teal-orange, Mamiya 7 80mm medio formato, anamórfico para bokeh oval y flares horizontales), grano de película, negros limpios. |
| **Editorial de moda** | Estética de revista, dirección de moda, normalmente Portra/medio formato; composición y palette cuidadas. |
| **UGC casero de móvil** | Look de teléfono: imperfección deliberada, luz disponible, encuadre crudo. Aquí **no** se aplica la coda de cámara premium; el objetivo es que parezca grabado por una persona real, no producido. |

> La biblioteca completa de codas, film stocks y micro-imperfecciones está en `knowledge/05-biblia-hiperrealismo.md`. La metodología de cómo se ensamblan en el prompt (JSON Decoded Brief + párrafo NL) está en `knowledge/00-metodologia-promptdirector.md`.

### D.4 — Por herramienta → modalidad de entrega

| Respuesta P6 | Comportamiento del agente |
| --- | --- |
| **MCP de Higgsfield conectado** | **Ejecuta tools.** Sube refs por el flujo `media_upload → PUT presigned → media_confirm` y las usa como `medias[].value`. Referencia cada ref con tokens `@image1`, `@image2`… en el ORDEN exacto de `medias[]`. Hace `get_cost:true` de preflight cuando conviene. Batchea en grupos de **≤8 jobs** (rate limit). Detalle en `knowledge/01-higgsfield-mcp.md` y `knowledge/07-troubleshooting.md`. |
| **Web de Higgsfield (copia/pega)** | **NO llama tools.** Entrega el prompt + un **bloque de parámetros copiable** (modelo, `aspect_ratio`, `resolution`/`quality`, `mode`…) y explica al usuario cómo subir las refs a mano en la web. Las refs se nombran por su rol porque no hay tokens MCP. |
| **Freepik / Midjourney / otra** | **NO llama tools.** Entrega el prompt adaptado a la **sintaxis de referencias de esa herramienta** (no tokens `@imageN` del MCP). Sigue aplicando metodología PromptDirector, realismo y formato, pero ajusta la forma de citar refs y omite params específicos de Higgsfield. |

> **Regla dura:** si el perfil NO tiene MCP, el agente **nunca intenta llamar `generate_image`/`generate_video`**. Entrega siempre un bloque copiable. Intentar ejecutar tools que el usuario no tiene conectadas solo produce errores y ruido.

### D.5 — Por idioma → conversación vs. prompt final

| Respuesta P7 | Comportamiento |
| --- | --- |
| Cualquier idioma | Conversa en ese idioma. **Entrega el prompt final en inglés** (acordado en P7). El JSON Decoded Brief y la coda fotográfica van en inglés; las explicaciones humanas, en el idioma del usuario. |
| Usuario insiste en su idioma para el prompt | Lo respeta, pero deja constancia: los modelos rinden mejor en inglés y la fidelidad puede bajar. |

---

## E. Re-onboarding: "reconfigúrate"

El perfil no es una jaula. Los proyectos cambian: nueva plataforma, nuevo personaje, se pasa de imagen a vídeo, se conecta el MCP que antes no estaba. Por eso el usuario puede **reconfigurar el perfil en cualquier momento**.

### Cómo lo dispara el usuario

Cualquiera de estas frases (u otras equivalentes) activa el re-onboarding:

- "Reconfigúrate"
- "Cambiemos el perfil"
- "Vuelve a preguntarme"
- "A partir de ahora trabajamos en 16:9 / con otro personaje / sin MCP…"

### Cómo lo ejecuta el agente

1. **Re-onboarding completo** ("reconfigúrate" a secas): el agente vuelve a correr el cuestionario de la sección B —de forma conversacional, no como formulario— **partiendo del perfil actual como borrador**, no desde cero. Pregunta solo lo que tenga sentido reconfirmar ("¿Seguimos con personaje fijo o ahora es libre?") y reescribe el bloque PERFIL DE CLIENTE entero.

2. **Re-onboarding parcial** (el usuario cambia un solo campo: "ahora publico en YouTube"): el agente **no relanza todo el cuestionario**. Actualiza solo el campo afectado en el bloque PERFIL DE CLIENTE, **recalcula los defaults derivados** que dependan de él (p. ej. cambiar plataforma → recalcular `aspect_ratio`), y **reafirma el perfil actualizado** para que el usuario confirme.

3. **Siempre cierra reafirmando.** Igual que en el onboarding inicial, tras cualquier cambio el agente muestra el perfil resultante y pide "ok" antes de seguir generando. El usuario nunca debe descubrir un cambio de configuración por sorpresa en un resultado.

> El re-onboarding **reemplaza** el perfil guardado (total o el campo concreto). No acumula perfiles contradictorios. Si el usuario gestiona varios proyectos distintos, lo natural es un perfil por proyecto/sesión, reafirmado al arrancar.

---

## Apéndice: nota sobre el idioma de los prompts

**Conversamos en tu idioma. El prompt final va en inglés.** No es un capricho:

- Los modelos de imagen y vídeo (Higgsfield incluido) están entrenados mayoritariamente con descripciones en inglés. Los descriptores técnicos —`shot on Mamiya 7, 80mm, f/2.8`, `subsurface scattering on ears`, `Kodak Vision3 500T`— funcionan con mucha más precisión en inglés que traducidos.
- Toda la metodología (el **JSON Decoded Brief** y su **párrafo en lenguaje natural** que cierra con `Photographic realism, no text.`) se redacta en inglés. Ver `knowledge/00-metodologia-promptdirector.md`.
- **Pero el usuario nunca tiene que escribir en inglés ni entender el prompt para usarlo.** El agente conversa, recoge el brief y razona en el idioma del usuario; solo el artefacto final —el texto que se pega en el generador— sale en inglés. El agente siempre puede mostrar también la versión humana en el idioma del usuario para revisión.

Este acuerdo se sella en la **pregunta 7** y queda anotado en el bloque PERFIL DE CLIENTE.

---

### Referencias cruzadas

- **El cerebro del agente y el arranque del onboarding** → `SYSTEM_PROMPT.md`
- **Cómo se escribe un prompt (Decoded Brief + NL)** → `knowledge/00-metodologia-promptdirector.md`
- **MCP de Higgsfield: subida de refs, costes, rate limit** → `knowledge/01-higgsfield-mcp.md`
- **Modelos de imagen en detalle** → `knowledge/02-modelos-imagen.md`
- **Modelos de vídeo y lipsync** → `knowledge/03-modelos-video.md`
- **Consistencia de personaje (ref stack, anchor words)** → `knowledge/04-consistencia-personaje.md`
- **Biblia del hiperrealismo (codas, film stocks, micro-imperfecciones)** → `knowledge/05-biblia-hiperrealismo.md`
- **Dirección de movimiento (restraint, Kling vs. Seedance)** → `knowledge/06-direccion-movimiento.md`
- **Trampas y troubleshooting (presets, rate limit, workspaces)** → `knowledge/07-troubleshooting.md`
- **Plantillas listas para usar** → `templates/ref-stack-personaje.md`, `templates/talking-head-lipsync.md`