> **Origen:** `torre_de_vega/instagram-skill-hosteleria/10-skill-integration/directoria-integration.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Integración con DirectorIA Cloud — de plan de contenido a imagen real

## TL;DR
- Esta skill decide **QUÉ** publicar (guion, hook, CTA, slot). [DirectorIA Cloud](../../../../directoria/SKILL.md) decide **CÓMO** se ve la imagen/vídeo y la genera.
- Regla no negociable: DirectorIA **siempre parte de una foto real** del plato/local/equipo del cliente como referencia — nunca inventa una comida que se presente como si fuera la real.
- El puente es un **brief de escena por pieza de contenido**, no un prompt suelto: cada Reel/Carousel/Story de tu calendario editorial se traduce en 1-N briefs con foto de referencia + ángulo + modelo DirectorIA correcto.
- DirectorIA entrega siempre en 2 partes (JSON Decoded Brief + párrafo en inglés) y, si el MCP de Higgsfield está conectado, puede lanzar la generación directamente.
- Sin fotos reales del cliente no se genera nada de producto — se pide antes de producir.

## Por qué dos skills separadas y no una sola

[instagram-skill-hosteleria](../README.md) es una skill de **estrategia y contenido**: algoritmo, calendario, copys, CTAs, benchmarks. No sabe generar imágenes.

[DirectorIA Cloud](../../../../directoria/SKILL.md) es una skill de **dirección de arte y generación**: convierte una escena en un prompt de nivel publicitario y (con MCP de Higgsfield) la ejecuta. No sabe nada de algoritmo de Instagram, de reservas ni de calendario editorial.

Separarlas evita que una skill enorme y genérica intente hacer las dos cosas mal. La integración vive en este archivo: es el protocolo que convierte la salida de una en la entrada de la otra.

## El principio que no se negocia (del deep research de Torre de Vega)

> "AI no debe inventar una comida que después se presente al cliente como la comida real. Para hostelería, la expectativa visual forma parte del producto."

Esto se traduce en una regla técnica exacta, ya integrada en el propio protocolo de DirectorIA (`SYSTEM_PROMPT.md` §3, punto 9: "No fabricar"):

- **Todo prompt de producto/plato/local/equipo real DEBE llevar una foto real como referencia** (`medias[]` con `role:"image"`), nunca generarse solo desde texto.
- El modelo a usar cuando hay una foto real de referencia que debe respetarse es **`nano_banana_pro`** (preserva identidad/producto desde refs) — nunca `soul_2`/`soul_cinematic`, que ignoran las referencias y solo generan desde texto.
- Si no hay foto real disponible de ese plato/plano concreto, la respuesta correcta es **pedirla antes de generar**, no inventar el plato con IA pura y publicarlo como si fuera real.
- Los prompts sirven para **storyboard, tratamiento de fotografía y composición** — no para sustituir sistemáticamente el plato auténtico en contenido que se presenta como el producto real del negocio.

## Mapa: tipo de contenido de Instagram → modelo DirectorIA

| Pieza de [07-plantillas-prompts/](../07-plantillas-prompts/README.md) | ¿Necesita foto real de referencia? | Modelo DirectorIA | Por qué |
|---|---|---|---|
| Hero de producto/plato real (Reel, Carousel, Static) | Sí, siempre | `nano_banana_pro` (`resolution:"4k"`) | Preserva el plato/producto real desde la ref; no lo reinventa. |
| Parrillero/chef/equipo real (retrato, proceso) | Sí, siempre — identity sheet + selfie si es cara recurrente | `nano_banana_pro` con ref stack ([knowledge/04](../../../../directoria/references/knowledge/04-consistencia-personaje.md)) | Cara real que no puede "driftear" entre piezas. |
| Local/terraza/fachada (establishing shot) | Sí, foto real del sitio | `nano_banana_pro` | El local es el local; no se inventa arquitectura. |
| Exploración de estilo/mood puro, sin producto ni cara real que anclar | No | `soul_2` / `soul_cinematic` (prompt-only) | Aquí sí se puede explorar estilo libremente porque no hay nada real que preservar. |
| Producto/ads con estética de campaña comercial | Sí, del producto | `marketing_studio_image` | Default comercial/producto del MCP. |
| Carteles, menús del día, texto legible en escena | Depende — foto real si hay marca/menú concreto | `gpt_image_2` (`quality:"high"`) solo para texto; si hay cara real, no usarlo (tiende a alterarla) | Es el único con buen renderizado de texto en imagen. |
| Reel con movimiento contenido (retrato, proceso, micro-movimiento) | Sí (parte de un still ya anclado) | `kling3_0` | Movimiento contenido sobre una imagen ya validada. |
| Reel con movimiento complejo (cámara moviéndose, multi-elemento, líquidos, brasa/fuego) | Sí | `seedance_2_0` (`resolution:"1080p"` explícito) | Movimiento físico complejo. |
| Talking head del dueño/chef con diálogo | Sí, identity refs | Pipeline 2 pasos: `nano_banana_pro` (keyframe) → `kling3_0`/`seedance_2_0` (clip con línea literal) → lipsync en la web de Higgsfield | El MCP no hace lipsync directamente. Detalle: [knowledge/03](../../../../directoria/references/knowledge/03-modelos-video.md). |

## Vocabulario de plano y ángulo compartido

Cuando el guion de un Reel (ver [07-plantillas-prompts/reel-scripts.md](../07-plantillas-prompts/reel-scripts.md)) especifica un plano — "primerísimo primer plano", "cenital", "45 grados", "plano detalle" — usa exactamente el vocabulario de [directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md](../../../../directoria/references/knowledge/09-vocabulario-plano-y-modo-organico.md) al construir el brief para DirectorIA, para que la traducción de guion → prompt sea 1:1 y no se pierda matiz de dirección.

Ángulos que más se repiten en contenido de hostelería (y su uso recomendado):

| Ángulo | Cuándo usarlo en hostelería |
|---|---|
| Macro / primer plano extremo | Textura del corte, marmoleo, sal cayendo, cremosidad de un postre. |
| 45 grados | El ángulo por defecto para producto en mesa — el más "apetecible" en foodphotography. |
| Cenital (overhead) | Carousels comparativos (varios cortes, varios platos a la vez), flat-lay de mesa completa. |
| Eye-level / documental | Parrillero, chef, dueño — humaniza, no "producto de catálogo". |
| Plano detalle en mano | Escala real, cercanía, sensación de "lo tengo delante". |

## Flujo de trabajo end-to-end

```
1. Instagram skill decide el calendario semanal
   (06-workflows-automatizacion/weekly-content-research.md
    + 06-workflows-automatizacion/content-generation.md)
   → produce N piezas: Reels, Carousels, Stories, con guion,
     hook, CTA y slot ya definidos.

2. Por cada pieza que necesite imagen/vídeo generado o tratado con IA:
   a. Localizar la(s) foto(s) real(es) de referencia del cliente
      (plato, local, equipo) — sin foto real, no se avanza:
      pedirla al cliente primero.
   b. Abrir DirectorIA Cloud (../../directoria-cloud/README.md).
      Primera vez: correr su onboarding (7 preguntas,
      ../../directoria-cloud/ONBOARDING.md) y guardar el perfil
      en ../../directoria-cloud/PERFIL_USUARIO.md.
      Sesiones siguientes: el perfil ya vive ahí, no se repite.
   c. Pasarle a DirectorIA: la foto real de referencia + el guion/
      hook de la pieza + el ángulo deseado (tabla de arriba).
   d. DirectorIA entrega JSON Decoded Brief + párrafo NL en inglés
      + bloque PARAMS. Si hay MCP conectado, se ofrece a lanzar
      la generación (pide confirmación de coste antes con
      get_cost:true — ver ../../directoria-cloud/README.md,
      límite de créditos).

3. La imagen/vídeo resultante vuelve al calendario editorial de
   Instagram skill, se revisa contra el guion original y se publica
   en el slot definido (06-workflows-automatizacion/publishing-schedule.md).

4. El resultado (reach, sends, saves, reservas atribuidas) se mide
   con 06-workflows-automatizacion/analytics-review.md y alimenta
   la siguiente semana: qué patrón visual repetir, qué ángulo
   funcionó, qué hook generó más sends.
```

## Ejemplo aplicado (adaptado del caso real Torre de Vega)

Guion de Instagram skill ([07-plantillas-prompts/reel-scripts.md](../07-plantillas-prompts/reel-scripts.md)):

> Reel "El corte que elegiría nuestro parrillero". Hook: *"Si nuestro parrillero solo pudiera pedir UN corte hoy… sería éste."* Plano macro de la pieza cruda → sal cayendo en slow motion → pieza tocando la parrilla → cara/manos del parrillero → corte transversal → plato en mesa.

Brief que se traslada a DirectorIA (resumen; el prompt completo en inglés lo genera DirectorIA siguiendo su propia metodología en [knowledge/00-metodologia-promptdirector.md](../../../../directoria/references/knowledge/00-metodologia-promptdirector.md)):

- Referencias: foto real de la pieza de carne del cliente (`@image1`) + foto real del parrillero (`@image2`).
- Modelo: `nano_banana_pro`, `resolution:"4k"`, `aspect_ratio:"9:16"`.
- Ángulos por beat: macro extremo (pieza) → macro (sal) → eye-level documental (parrillero) → macro (corte).
- Escala/realismo: sin inventar marmoleo ni corte distinto al de la foto real; luz cálida de brasa real, no "glow" artificial.
- Coda fotográfica obligatoria en el prompt final (cámara, lente, f/, ISO — la aplica DirectorIA automáticamente según su checklist, [SYSTEM_PROMPT.md §8](../../../../directoria/SKILL.md)).

DirectorIA nunca inventa un corte de carne distinto al que el restaurante realmente sirve ese día — parte siempre de la foto real.

## Errores comunes

❌ **Error**: Pedir a DirectorIA un plato "genérico apetitoso" sin foto real de referencia y publicarlo como si fuera el plato del restaurante.
✅ **Solución**: Sin foto real no se genera contenido de producto. Se pide la foto al cliente o se pospone esa pieza del calendario.

❌ **Error**: Usar `soul_2`/`soul_cinematic` para un retrato del chef porque "genera caras bonitas".
✅ **Solución**: Soul ignora las referencias — usar `nano_banana_pro` con ref stack cuando la cara/identidad debe mantenerse fiel ([knowledge/04](../../../../directoria/references/knowledge/04-consistencia-personaje.md)).

❌ **Error**: Repetir el onboarding de DirectorIA cada sesión porque "no se acordaba".
✅ **Solución**: El perfil vive en `directoria-cloud/PERFIL_USUARIO.md` — se confirma un idioma/aspect ratio/estilo una vez y se reafirma al arrancar cada sesión, no se re-pregunta desde cero.

## Recursos relacionados
- [DirectorIA Cloud — README](../../../../directoria/SKILL.md)
- [DirectorIA Cloud — SYSTEM_PROMPT.md](../../../../directoria/SKILL.md)
- [DirectorIA Cloud — vocabulario de plano/ángulo](../../../../directoria/references/knowledge/09-vocabulario-plano-y-modo-organico.md)
- [[../07-plantillas-prompts/ai-image-prompts.md]]
- [[../06-workflows-automatizacion/content-generation.md]]
- [[research-to-prompts.md]]
- [[workflow-completo.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: `directoria-cloud/` (paquete local, README.md, SYSTEM_PROMPT.md, ONBOARDING.md, knowledge/00, 02, 03, 04, 09) e `informes/deep-research-report.md` (sección "Prompts de AI para previsualización").*
