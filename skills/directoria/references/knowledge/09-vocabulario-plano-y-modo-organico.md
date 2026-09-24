> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 09 — Vocabulario de plano/ángulo, modo orgánico y portabilidad a otras herramientas

> Complemento a `05-biblia-hiperrealismo.md` y `00-metodologia-promptdirector.md`. Este archivo no introduce un método nuevo — añade tres piezas de vocabulario y criterio que faltaban: (A) cómo nombrar el **tipo de plano y ángulo de cámara** con precisión de dirección de foto, (B) un **modo específico** para cuando el objetivo NO es "anuncio premium perfecto" sino "foto real de una persona real, sin pulir" (contenido de creador/influencer, testimonios), y (C) cómo **portar** el mismo criterio a herramientas fuera de Higgsfield (Midjourney, Flux, Freepik, GPT-Image) cuando no hay MCP.
>
> Origen: síntesis de tres proyectos de la comunidad estudiados para este paquete — un skill de shots cinematográficos (higgsfield-camera/style), un skill de generación de imágenes con apariencia genuinamente humana para contenido de creador (ai-studio-image), y un skill de "reasoning brief" multi-modelo (nano-banana). Ninguno se instaló tal cual (son repos de terceros sin auditar); lo que aportaban de útil se ha reescrito aquí siguiendo las reglas de rigor de este paquete (`00-metodologia-promptdirector.md` §6).

Archivos hermanos relevantes:
- `05-biblia-hiperrealismo.md` — la lista negra de vocabulario y la biblioteca de film stocks/lentes. Este archivo AÑADE plano/ángulo; no la repite.
- `00-metodologia-promptdirector.md` — el campo `composition` del JSON Decoded Brief es donde vive el vocabulario de §1.
- `02-modelos-imagen.md` — qué modelo Higgsfield usar. §3 de aquí es para cuando NO hay Higgsfield/MCP.

---

## 1. Vocabulario de tipo de plano y ángulo (para el campo `composition`)

Hasta ahora `composition` se rellenaba libremente ("vertical 4:5, subject center-right..."). Añade siempre, cuando aplique, el **tamaño de plano** y el **ángulo de cámara** con sus nombres técnicos — igual que con las lentes, un nombre concreto rinde mejor que una descripción vaga.

### 1.1 Tamaño de plano (shot size)

| Término | Encuadre | Cuándo usarlo |
|---|---|---|
| `extreme wide shot` / `establishing shot` | Sujeto minúsculo en su entorno | Abrir una escena, mostrar contexto/localización |
| `wide shot` / `full shot` | Cuerpo entero con margen | Producto en contexto, moda, escena con acción corporal |
| `medium shot` | De cintura para arriba | Conversación, testimonial, la mayoría de UGC |
| `medium close-up` | De pecho para arriba | Retrato semi-cercano, talking head estándar |
| `close-up` | Cara llena el encuadre | Emoción, belleza, producto pequeño en mano |
| `extreme close-up` | Fragmento (ojos, boca, textura, detalle de producto) | Hero shot de detalle, packshot de producto |
| `insert shot` / `detail shot` | Objeto o acción aislada (manos, etiqueta, botón) | Cutaway de producto, prueba social, unboxing |

### 1.2 Ángulo de cámara

| Término | Efecto | Cuándo usarlo |
|---|---|---|
| `eye-level` | Neutro, honesto, de igual a igual | El default seguro para retrato y UGC |
| `low angle` (cámara por debajo) | Engrandece, da autoridad/poder al sujeto | Hero shots, producto "heroico", moda |
| `high angle` (cámara por encima) | Empequeñece, vulnerabilidad, o vista de conjunto | Mesa/flat-lay de producto, planos íntimos o vulnerables |
| `overhead` / `top-down` | Vista cenital | Flat-lay de producto, comida, mesa de trabajo |
| `over-the-shoulder` | Vemos desde detrás de un sujeto hacia otro/algo | Diálogo, POV de "estás ahí" |
| `dutch angle` / `canted angle` | Horizonte inclinado | Tensión, desorientación — úsalo con moderación, casi nunca en producto/beauty |
| `handheld POV` / `selfie angle` | Cámara sujeta por el propio sujeto, ligera distorsión de gran angular cerca | UGC auténtico, contenido de creador (ver §2) |

> **Cómo se integra:** en el JSON brief, `composition` pasa a incluir shot size + ángulo explícitos, p. ej. `"composition": "Medium close-up, eye-level, vertical 4:5, subject center-frame..."`. En el párrafo NL se traduce literalmente: `"Medium close-up at eye-level, vertical 4:5 framing..."`.

---

## 2. Modo ORGANIC — cuando el objetivo es "persona real, sin pulir" (contenido de creador/influencer)

La biblia del hiperrealismo (`05-biblia-hiperrealismo.md`) está calibrada para el **anuncio premium**: cámara profesional, film stock, luz de estudio o golden hour bien dirigida. Pero hay un encargo distinto y frecuente — **contenido de creador/influencer que debe parecer tomado por una persona normal con su móvil**, no por un fotógrafo. Ahí "premium" es precisamente lo que hay que evitar: un influencer con luz de estudio de anuncio de perfume rompe la ilusión de autenticidad.

Este es un **modo nuevo** dentro de PromptDirector: **ORGANIC**. Se activa cuando el encargo pide explícitamente "estilo influencer", "que no parezca anuncio", "contenido tipo creador", "testimonio real", "UGC crudo" (más crudo que el modo UGC ya cubierto en `05-biblia-hiperrealismo.md` §5, que sigue siendo "UGC premium" de marca).

### 2.1 Qué cambia respecto al modo DECODE/STYLE_TRANSFER normal

| Campo del brief | Modo normal (anuncio premium) | Modo ORGANIC (creador/influencer) |
|---|---|---|
| `camera` | Cámara profesional, film stock nombrado, apertura elegida por intención | Cámara de móvil implícita: `shot on a phone, front or rear camera, slight wide-angle distortion`, apertura fija (no se elige f/ como en cine — un móvil no la controla) |
| `lighting` | Esquema de luz diseñado (key/fill/rim) | Luz ambiente disponible: `available light only, mixed color temperature, no artificial key light`, puede ser algo dura o desigual |
| `composition` | Encuadre deliberado, regla de tercios | Ligeramente imperfecto a propósito: `slightly off-center, casual framing, not perfectly leveled horizon`, ángulo `selfie` u `over-the-shoulder` casual |
| `imperfections` | Micro-imperfecciones de material (piel, tela...) | Además de las de piel, **imperfecciones de captura**: `mild handheld motion softness, natural phone sensor noise in shadows, slight lens flare from a window, minor chromatic aberration at the frame edge` |
| `palette` | Grade de película deliberado | Color natural sin gradar: `true-to-life color, no color grade, mixed indoor/outdoor white balance` |
| `mood`/entorno | Set controlado o localización elegida | Entorno cotidiano real: habitación, coche, calle — con el desorden honesto de la vida real (ver §2.2) |

### 2.2 Frases clave del modo ORGANIC (inglés, para el prompt)

```
Shot on a smartphone front camera, handheld, slight wide-angle lens distortion
at the edges, available indoor light only, mixed warm/cool white balance,
casual selfie-angle framing slightly off-center, natural phone sensor grain
in the shadows, no studio lighting, no professional color grade, everyday
background clutter, true-to-life skin tones, candid unposed expression,
photographic realism, no text.
```

> **No confundir con el "UGC honesto" de `05-biblia-hiperrealismo.md` §5** (que sigue siendo una coda de *marca*, con más control de luz — "premium disfrazado de casero"). El modo ORGANIC es un paso más allá: **cero dirección de luz**, cámara de móvil real, imperfecciones de captura además de las de piel/material. Úsalo cuando el brief diga explícitamente que no debe leerse como producción, ni siquiera una producción disfrazada.

### 2.3 Riesgo a vigilar

El modo ORGANIC es más fácil de sobre-actuar hacia "mala foto" que hacia "foto auténtica". No es "foto borrosa y mal iluminada" — es "foto normal, tomada con cuidado normal, sin equipo profesional". Si el resultado parece deliberadamente degradado, has ido demasiado lejos: retira una imperfección de captura y vuelve a intentar.

---

## 3. Portabilidad a otras herramientas (sin MCP de Higgsfield)

El README (§d, uso manual) ya cubre que el vocabulario de esta biblioteca es agnóstico al modelo. Aquí van las diferencias de **formato de payload** por herramienta, para cuando el creador trabaja en otra plataforma:

| Herramienta | Cómo recibe el prompt | Diferencia clave respecto al JSON+NL de Higgsfield |
|---|---|---|
| **Midjourney** | Solo texto en línea de comandos, con flags `--` | No acepta JSON. Traduce el JSON brief a una sola frase NL (igual que la Parte 2) y añade `--style raw` para reducir la estilización artística por defecto de MJ; evita `--stylize` alto (>250) si el objetivo es fotorrealismo, porque intensifica el look "artístico/render". El resto del vocabulario (cámara, film stock, imperfecciones, coda) se mantiene igual. |
| **Flux (Freepik, BFL, etc.)** | Texto en línea, responde bien a lenguaje natural largo | Usa directamente el párrafo NL (Parte 2) tal cual. Flux necesita menos "negativos" explícitos que otros modelos porque ya sigue el prompt positivo con fidelidad — pero mantén `no text` si no quieres texto inventado. |
| **GPT-Image (fuera de Higgsfield, vía API/ChatGPT directo)** | Acepta texto largo y estructurado | Igual que `gpt_image_2` en `02-modelos-imagen.md`: puedes pasar el JSON stringificado o el NL; ambos funcionan razonablemente. Pide `quality: high` si el parámetro está disponible en tu integración. |
| **Freepik (su propio generador, no Flux)** | Texto en línea + selector de "estilo" en UI | El selector de estilo de la UI puede reintroducir "keyword soup" por su cuenta (p. ej. un preset llamado "hyperreal"); si existe un preset "photo/realistic" úsalo, pero **revisa el resultado contra la checklist de `05-biblia-hiperrealismo.md` §8** — un preset no sustituye el vocabulario del prompt. |

> **Regla general de portabilidad:** el **vocabulario** (cámara, óptica, film stock, imperfecciones, luz física, coda `photographic realism, no text.`) viaja igual a cualquier herramienta. Lo único que cambia es **cómo se empaqueta** (JSON vs. texto plano vs. flags). Nunca adaptes el vocabulario "a la baja" por estar fuera de Higgsfield — la biblia del hiperrealismo aplica siempre.

---

## 4. Mini-resumen para el agente

- Nombra siempre **shot size + ángulo de cámara** en `composition`, con los términos técnicos de §1 — no lo dejes implícito.
- Si el encargo pide contenido de creador/influencer **sin pulir**, activa el **modo ORGANIC** (§2): cámara de móvil, luz ambiente, cero grade, imperfecciones de captura además de las de piel. No lo confundas con el "UGC premium" de `05-biblia-hiperrealismo.md`.
- Si no hay MCP de Higgsfield y el creador usa Midjourney/Flux/Freepik/GPT-Image directo, **traduce el payload** (§3) pero conserva el vocabulario fotográfico intacto — el criterio no cambia con la herramienta.
