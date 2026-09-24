> **Origen:** `torre_de_vega/instagram-skill-hosteleria/07-plantillas-prompts/ai-image-prompts.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# AI Image Prompts — Fotografía hiperrealista de comida

## TL;DR
- **Ruta recomendada: [DirectorIA Cloud](../../../../directoria/SKILL.md).** Si tienes esta skill de dirección de arte disponible en el mismo workspace, úsala en vez de escribir prompts sueltos de Midjourney/DALL-E — genera desde fotos reales del plato/local con metodología de brief profesional (JSON + párrafo NL + specs de cámara). Ver protocolo completo en [[../10-skill-integration/directoria-integration.md]].
- **Regla no negociable con cualquier herramienta**: nunca generar con IA un plato que no existe realmente y publicarlo como si fuera el producto real — genera desconfianza y quejas ("no se parece en nada a la foto"). La IA parte siempre de una referencia real o se usa solo para fondos/gráficos/conceptual.
- Si no tienes DirectorIA Cloud disponible, esta página incluye 55 prompts de fallback para Midjourney, DALL-E 3/GPT Image y Stable Diffusion, agrupados por categoría.
- Añade siempre términos técnicos de fotografía (lente, apertura, iluminación) para conseguir resultados "hiperrealistas" y no ilustrativos — DirectorIA Cloud lo aplica automáticamente vía su "coda fotográfica" obligatoria.
- Revisa cada imagen generada antes de publicar: los modelos de IA aún cometen errores en manos, texto y proporciones de cubiertos — nunca publiques sin revisión humana.

## Con DirectorIA Cloud (recomendado)

Cuando tengas acceso a [DirectorIA Cloud](../../../../directoria/SKILL.md) (skill hermana de dirección de arte IA, con o sin MCP de Higgsfield conectado), no escribas un prompt suelto de esta página: dale a DirectorIA la foto real de referencia + el guion de la pieza (de [[reel-scripts.md]] o [[carousel-templates.md]]) + el ángulo deseado, y deja que él construya el brief completo (JSON Decoded Brief + párrafo NL en inglés + specs de cámara). El mapeo de qué modelo de DirectorIA usar según el tipo de pieza está en [[../10-skill-integration/directoria-integration.md]].

Ejemplo de petición a DirectorIA (adaptado de un caso real de asador):

> "Tengo esta foto real de nuestro corte de carne [adjuntar foto]. Necesito un Reel vertical 9:16: primerísimo primer plano de la pieza cruda, sal cayendo en slow motion, la pieza tocando la parrilla con fuego real, luego el corte transversal. Sin inventar un corte distinto al de la foto. Estilo hiperrealista publicitario."

DirectorIA responde con el JSON brief, el párrafo NL cerrado en la coda fotográfica (`shot on [cámara], [lente]mm, f/[N], ISO [N]...`), y el bloque `PARAMS` listo para `nano_banana_pro`. Si el MCP está conectado, se ofrece a lanzarlo.

## Prompts de fallback (sin DirectorIA Cloud / sin MCP)

Si no tienes la skill DirectorIA Cloud disponible, usa los 55 prompts de esta sección directamente en Midjourney, DALL-E 3/GPT Image o Stable Diffusion. Son menos rigurosos que un brief de DirectorIA (sin specs de cámara exactas ni control de referencia real), así que revisa el resultado con más cuidado.

## Conceptos fundamentales
- **Composición**: overhead (cenital), 45 grados, o close-up macro — cada una comunica algo distinto (cenital = editorial/menú, 45º = natural/lifestyle, macro = textura/apetito).
- **Iluminación**: luz natural lateral suave para look editorial; luz cálida de tungsteno para ambiente de noche/coctelería; luz dura direccional para look "chef premium".
- **Lente y cámara**: especificar cámara y objetivo (ej. "shot on Canon EOS R5, 100mm macro lens, f/2.8") mejora drásticamente el realismo.
- **Negative prompts (Stable Diffusion)**: excluye siempre "manos deformes, texto ilegible, cubiertos distorsionados, plástico, exceso de brillo artificial".

## Datos y benchmarks 2026
| Modelo | Mejor uso | Sintaxis clave |
|---|---|---|
| Midjourney v6/v7 | Fotorrealismo de producto y ambiente | `--ar 4:5 --style raw --v 6` |
| DALL-E 3 | Prompts en lenguaje natural, buena coherencia de texto | Prosa detallada, sin flags |
| Stable Diffusion (SDXL) | Control fino con negative prompts y LoRA de food photography | Prompt + negative prompt separados |

## Pasos accionables
1. Elige la categoría del prompt según el objetivo del post (venta de plato, ambiente, packshot).
2. Sustituye los placeholders `[PLATO]`, `[INGREDIENTE]`, `[ESTILO_LOCAL]` por los datos reales del negocio.
3. Genera 4 variaciones y selecciona la más realista (revisa manos, cubiertos, texto en el plato/etiquetas).
4. Haz upscale/retoque final en la propia herramienta o en Photoshop/Lightroom si hace falta corregir color.
5. Usa la imagen como portada de carrusel, fondo de Story o miniatura — evita usarla como "la foto del plato real" si el plato existe físicamente (mejor foto real).

## Errores comunes
- ❌ Prompt genérico ("foto de una pizza rica") → resultados planos, poco realistas.
  ✅ Describe iluminación, lente, textura, entorno y estilo de plating con detalle.
- ❌ Publicar una imagen de IA de un plato que no existe en la carta real.
  ✅ Usa IA solo para conceptos, fondos o platos que sí se sirven; nunca para engañar sobre el producto real.
- ❌ Ignorar el negative prompt en Stable Diffusion.
  ✅ Excluye siempre deformidades de manos/cubiertos/texto.

## Plantillas — Prompts de imagen IA

### Platos calientes / cocina general
```
1. Hyperrealistic overhead shot of [PLATO], on a matte black slate plate, steam rising gently, warm restaurant lighting, shot on Canon EOS R5 100mm macro lens, f/2.8, shallow depth of field, editorial food photography --ar 4:5 --style raw --v 6
2. Close-up 45-degree angle of [PLATO] with visible texture and glossy sauce reflection, natural window light from the left, rustic wooden table, shallow depth of field, food magazine style --ar 4:5 --style raw --v 6
3. Macro shot of [PLATO] focusing on steam and texture detail, dark moody background, single spotlight from above, Michelin-star plating style, ultra realistic --ar 1:1 --style raw --v 6
4. [PLATO] being plated by chef's hands wearing black gloves, motion blur on the sauce drizzle, professional kitchen background out of focus, cinematic lighting --ar 4:5 --style raw --v 6
5. Top-down flat lay of [PLATO] surrounded by raw ingredients used in the recipe, natural light, marble countertop, editorial recipe photography style --ar 1:1 --style raw --v 6
6. [PLATO] served on a rustic ceramic plate, garnished with fresh herbs, soft natural daylight, blurred restaurant interior background, appetizing warm tones --ar 4:5 --style raw --v 6
7. Extreme close-up of a fork lifting a bite of [PLATO], visible steam and texture, shallow focus, warm tungsten restaurant lighting, hyperrealistic --ar 4:5 --style raw --v 6
8. [PLATO] on a dark slate board with dramatic side lighting, deep shadows, moody fine-dining photography style, shot on 85mm lens f/1.8 --ar 4:5 --style raw --v 6
```

### Pizzería
```
9. Hyperrealistic close-up of a wood-fired pizza with [INGREDIENTES] fresh out of the oven, melted cheese stretching, char marks on the crust, warm oven glow in background --ar 4:5 --style raw --v 6
10. Overhead shot of a whole [TIPO] pizza on a wooden peel, rustic pizzeria table, natural light, slight steam rising, editorial food photography --ar 1:1 --style raw --v 6
11. Cheese pull shot: hand lifting a slice of [TIPO] pizza with melted mozzarella stretching, shallow depth of field, warm restaurant lighting, ultra realistic --ar 4:5 --style raw --v 6
12. Close-up of pizza dough being stretched by hand, flour dust in the air, backlit by warm kitchen light, motion frozen, hyperrealistic photography --ar 4:5 --style raw --v 6
13. Wood-fired oven interior with a pizza baking, visible flames in the background, dramatic warm lighting, shot on 35mm lens, cinematic --ar 4:5 --style raw --v 6
14. Sliced pizza on a metal tray with fresh basil leaves, rustic pizzeria counter background blurred, natural daylight, appetizing colors --ar 1:1 --style raw --v 6
```

### Coctelería / bebidas
```
15. Hyperrealistic close-up of a [COCTEL] cocktail with condensation on the glass, garnished with [GUARNICIÓN], moody bar lighting, dark background, bokeh lights --ar 4:5 --style raw --v 6
16. Bartender's hand pouring a cocktail into a coupe glass, dramatic backlighting, liquid catching the light, motion frozen, cinematic bar atmosphere --ar 4:5 --style raw --v 6
17. Top-down shot of a [COCTEL] on a dark marble bar counter, garnish detail in sharp focus, neon reflections, moody nightlife photography style --ar 1:1 --style raw --v 6
18. Close-up of ice cubes and citrus garnish falling into a cocktail glass, splash frozen in motion, dramatic side lighting, ultra realistic --ar 4:5 --style raw --v 6
19. Row of three signature cocktails on a bar counter, warm ambient lighting, blurred bar shelves with bottles in background, editorial bar photography --ar 16:9 --style raw --v 6
20. Smoke effect being poured over a cocktail glass, dramatic dark background, single warm spotlight, cinematic mixology photography --ar 4:5 --style raw --v 6
21. Craft beer glass with visible foam head and condensation, warm pub lighting, blurred wooden bar background, hyperrealistic --ar 4:5 --style raw --v 6
```

### Panadería / repostería / postres
```
22. Hyperrealistic close-up of a freshly baked [POSTRE], visible texture and steam, warm morning light through a bakery window, rustic wooden counter --ar 4:5 --style raw --v 6
23. Cross-section shot of a [TARTA/PASTEL] showing layers, natural soft light, minimalist white background, editorial dessert photography --ar 1:1 --style raw --v 6
24. Chocolate sauce being poured over [POSTRE], motion frozen, dark moody background, single spotlight, ultra realistic dessert photography --ar 4:5 --style raw --v 6
25. Fresh croissants stacked on a wooden board, flour dust visible, warm bakery lighting, shallow depth of field --ar 4:5 --style raw --v 6
26. Spoon breaking into a [POSTRE] revealing gooey/creamy texture inside, close-up macro shot, warm restaurant lighting --ar 4:5 --style raw --v 6
27. Overhead flat lay of assorted pastries on a marble table, natural window light, soft shadows, editorial bakery photography --ar 1:1 --style raw --v 6
```

### Ambiente / marca / interior
```
28. Wide shot of a cozy restaurant interior at golden hour, warm ambient lighting, empty tables set for service, editorial interior photography --ar 16:9 --style raw --v 6
29. Restaurant terrace with string lights at dusk, guests silhouettes blurred in background, warm inviting atmosphere, cinematic wide shot --ar 16:9 --style raw --v 6
30. Close-up of a chef's hands plating a dish in a professional kitchen, shallow depth of field, warm kitchen lighting, documentary style --ar 4:5 --style raw --v 6
31. Bar counter with bartender working, warm bokeh lights in background, moody nightlife atmosphere, cinematic photography --ar 16:9 --style raw --v 6
32. Rustic restaurant entrance with hanging plants and warm signage lighting at night, editorial hospitality photography --ar 4:5 --style raw --v 6
33. Table set for two with candlelight, blurred restaurant interior in background, romantic warm tones, shallow depth of field --ar 4:5 --style raw --v 6
34. Wide interior shot of a modern minimalist restaurant dining room, natural daylight through large windows, editorial architecture photography --ar 16:9 --style raw --v 6
```

### Packshot de producto / menú digital
```
35. Studio packshot of [PLATO/PRODUCTO] on a plain white background, soft even lighting, e-commerce style, ultra clean and realistic --ar 1:1 --style raw --v 6
36. [PRODUCTO] photographed on a neutral grey background with soft studio lighting, subtle shadow, minimalist packshot style --ar 1:1 --style raw --v 6
37. Menu-style photograph of [PLATO] centered on a plain background with even lighting, ready for print menu design --ar 4:5 --style raw --v 6
38. Bottle of [BEBIDA/VINO] on a dark reflective surface, dramatic single light source, product photography style, ultra realistic --ar 4:5 --style raw --v 6
```

### Estacional / temático
```
39. Hyperrealistic [PLATO] styled for autumn, warm orange and brown tones, pumpkin and dried leaves as props, soft natural light --ar 4:5 --style raw --v 6
40. Christmas-themed table setting with [PLATO] as centerpiece, warm string lights, pine branches, cozy festive atmosphere --ar 4:5 --style raw --v 6
41. Summer terrace scene with a fresh [PLATO/BEBIDA], bright natural sunlight, blue sky, vibrant colors, lifestyle photography --ar 4:5 --style raw --v 6
42. Valentine's Day themed dessert plating with [POSTRE], soft pink and red tones, romantic candlelight, editorial style --ar 4:5 --style raw --v 6
43. Halloween-themed cocktail with dry ice smoke effect, dark moody background, orange and purple lighting --ar 4:5 --style raw --v 6
```

### Ingredientes / proceso
```
44. Close-up macro shot of fresh [INGREDIENTE] on a wooden cutting board, natural side lighting, shallow depth of field, editorial ingredient photography --ar 4:5 --style raw --v 6
45. Hands chopping fresh [INGREDIENTE] on a wooden board, motion frozen mid-chop, warm kitchen lighting, documentary food photography --ar 4:5 --style raw --v 6
46. Overhead shot of raw ingredients for [PLATO] arranged aesthetically on a marble surface, natural daylight, editorial recipe style --ar 1:1 --style raw --v 6
47. Close-up of olive oil being drizzled over [PLATO], motion frozen mid-pour, warm natural light, shallow depth of field --ar 4:5 --style raw --v 6
```

### Prompt Stable Diffusion (con negative prompt)
```
48. Prompt: "hyperrealistic food photography of [PLATO], overhead angle, natural window light, shallow depth of field, shot on 100mm macro lens, appetizing warm tones, restaurant editorial style, 8k detail"
    Negative prompt: "deformed hands, extra fingers, blurry text, distorted cutlery, plastic looking food, oversaturated, cartoon, illustration, low quality, watermark"
49. Prompt: "close-up hyperrealistic cocktail photography, [COCTEL] with condensation, moody bar lighting, bokeh background, cinematic color grading, 8k detail"
    Negative prompt: "deformed glass, distorted liquid, cartoon, illustration, low quality, watermark, blurry"
50. Prompt: "hyperrealistic bakery photography of [POSTRE], warm morning light, rustic wooden counter, shallow depth of field, editorial style, 8k detail"
    Negative prompt: "deformed shapes, unrealistic texture, cartoon, illustration, low quality, watermark"
```

### Prompts adaptados a DALL-E 3 (prosa completa, sin flags)
```
51. "A hyperrealistic, editorial-style photograph of [PLATO] served on a matte black plate, shot from a 45-degree angle with soft natural window light coming from the left, shallow depth of field, warm and appetizing color tones, shot as if on a professional DSLR camera with a macro lens."
52. "A hyperrealistic close-up photograph of a bartender's hand garnishing a [COCTEL] cocktail with a citrus twist, moody dark bar background with warm bokeh lights, condensation visible on the glass, cinematic color grading."
53. "A wide, hyperrealistic interior photograph of a cozy restaurant terrace at golden hour, string lights overhead, warm inviting atmosphere, empty tables set for evening service, editorial hospitality photography style."
54. "A hyperrealistic macro photograph of fresh [INGREDIENTE] arranged on a rustic wooden board, natural side lighting, shallow depth of field, shot as if with a 100mm macro lens on a professional camera."
55. "A hyperrealistic photograph of a freshly baked [POSTRE] with visible steam, warm morning bakery light through a window, shallow depth of field, rustic wooden counter in soft focus background."
```

## Recursos relacionados
- [[../10-skill-integration/directoria-integration.md]] — protocolo completo de integración con DirectorIA Cloud
- [DirectorIA Cloud](../../../../directoria/SKILL.md)
- [[reel-scripts.md]]
- [[carousel-templates.md]]
- [[../10-skill-integration/research-to-prompts.md]]
- [[../02-configuracion-tecnica/README.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: elaboración propia siguiendo sintaxis oficial de Midjourney (parámetros --ar/--v/--style raw) y buenas prácticas de prompting fotográfico para DALL-E 3 y Stable Diffusion*
