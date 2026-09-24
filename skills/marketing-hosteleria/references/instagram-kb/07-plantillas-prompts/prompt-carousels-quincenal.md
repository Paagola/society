> **Origen:** `torre_de_vega/instagram-skill-hosteleria/07-plantillas-prompts/prompt-carousels-quincenal.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Prompt — Generar carousels de 2 semanas (sesión nueva)

## Cómo usar este archivo
1. Abre una conversación nueva de Claude Code en este workspace (`torre_de_vega`).
2. Escribe: `Lee instagram-skill-hosteleria/07-plantillas-prompts/prompt-carousels-quincenal.md y sigue esas instrucciones.`
3. Responde a las preguntas que te haga al arrancar (ideas propias vs. propuestas nuevas, fotos de referencia disponibles).
4. Si vas a reutilizar este prompt para otro cliente que no sea Torre de Vega, dilo en tu primer mensaje y sustituye los datos del negocio antes de que la IA empiece.

---

## PROMPT (lo que la IA debe ejecutar)

Vas a generar el guion completo de TODOS los carousels de las próximas 2 semanas para Torre de Vega (asador familiar, La Alquería, Alhaurín de la Torre, Málaga — carnes a la brasa + cocina casera + menú del día miércoles-viernes).

### Paso 0 — Preguntar ANTES de generar nada
No escribas ningún carousel todavía. Primero pregúntame, en pocas preguntas y en bloque (no una por una):

1. **¿Tienes ya en mente platos, bebidas o ángulos concretos que quieras que aparezcan estas 2 semanas, o prefieres que te proponga variedad nueva basada en la carta y en lo que aún no se ha explotado en el contenido?** Si tengo ideas, las doy; si no, propón tú 4-6 opciones de plato/bebida/ángulo para que yo elija antes de escribir los carousels completos.
2. **¿Qué fotos reales tienes ya disponibles** (del plato, del local, del parrillero/equipo) **para cada carousel que vamos a planear?** Explícame que sin foto real de referencia no se puede generar la imagen de un plato con DirectorIA Cloud — que me digas exactamente qué fotos necesitas que te consiga antes de avanzar a la fase de imágenes.
3. Si hay un registro de qué se ha publicado en las últimas semanas, pídemelo o pregúntame si asumes que no hay historial previo.

Espera mis respuestas antes de continuar.

### Paso 1 — Leer la base de conocimiento
1. `instagram-skill-hosteleria/01-estrategia-contenido/carousels-strategy.md` y `carousel-templates.md` — estructura (7-10 slides, no 20).
2. `instagram-skill-hosteleria/08-casos-estudio/torre-de-vega-alhaurin.md` — contexto real del negocio (historia desde 1980, tartar de salchichón, lomo en manteca, etc.) y la ventaja narrativa "producto + persona + procedencia".
3. `instagram-skill-hosteleria/01-estrategia-contenido/hooks-library.md` y `cta-library.md` — especialmente la categoría de CTAs diseñados para sends ("mándaselo a quien...").
4. `instagram-skill-hosteleria/01-estrategia-contenido/hashtags-geo-tags.md` — las 5 capas de hashtags.

### Paso 2 — Generar los 2 carousels (uno por semana)
Con mis respuestas del Paso 0 y lo leído en el Paso 1, genera 2 carousels que:
- Usen un ángulo/narrativa distinto entre sí y distinto de lo ya publicado (educativo, elección/decisión, historia familiar, proceso, comparativa, "qué pedir según el plan"... no repitas la misma mecánica dos veces).
- Sigan la estructura de 7-10 slides con cover en pregunta/beneficio y CTA comercial de sends al final.
- Usen datos reales de la carta y la historia del restaurante, nunca platos inventados.
- Incluyan 5-8 hashtags rotando por las 5 capas (hiperlocal, ciudad, especialidad, cocina local, producto concreto).
- Cierren con el funnel de DM ("MESA" + día + personas).

Para cada carousel, entrega:
- Copy completo de cada slide.
- Hashtags.
- Slot de publicación sugerido.
- Un brief por slide con la foto real necesaria (qué debe fotografiarse, o cuál de las fotos que ya di aplica) y el ángulo de cámara (macro/45º/cenital/eye-level), listo para pasar a DirectorIA Cloud siguiendo `instagram-skill-hosteleria/10-skill-integration/directoria-integration.md`.

### Paso 3 — Cierre
Dime explícitamente en qué se diferencia cada carousel del anterior (qué patrón no se repite), para que pueda verificar que hay variedad real.

Si ya tengo todas las fotos reales necesarias y te lo confirmo, pregúntame si quieres que pases los briefs directamente a DirectorIA Cloud para generar las imágenes en esta misma sesión.

---
*Creado: 2026-09-02*
*Ver también: [[carousel-templates.md]] · [[../08-casos-estudio/torre-de-vega-alhaurin.md]] · [[../10-skill-integration/directoria-integration.md]]*
