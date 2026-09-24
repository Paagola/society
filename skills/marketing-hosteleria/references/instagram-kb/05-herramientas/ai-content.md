> **Origen:** `torre_de_vega/instagram-skill-hosteleria/05-herramientas/ai-content.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# IA generativa para fotografía de alimentos: estado 2026

## TL;DR
- **Si tienes la skill [DirectorIA Cloud](../../../../directoria/SKILL.md) disponible en el mismo workspace, es la ruta recomendada por encima de Midjourney/GPT Image/Stable Diffusion sueltos**: genera desde fotos reales del plato/local (nunca inventa el producto), entrega brief profesional en 2 partes (JSON + párrafo NL con specs de cámara) y, con el MCP de Higgsfield conectado, puede generar directamente. Protocolo de integración completo en [[../10-skill-integration/directoria-integration.md]].
- **DALL-E 2 y DALL-E 3 están descontinuados**; OpenAI los sustituyó por GPT Image (con GPT Image 2 como versión más reciente en 2026). Cualquier guía o prompt que mencione "DALL-E 3" como herramienta activa puede estar desactualizada.
- **Midjourney** sigue activo y en desarrollo (versión V8.1 mencionada en fuentes 2026), y continúa siendo la referencia para imágenes de alto pulido estético, útil para contenido "aspiracional" de plato o ambiente.
- **Stable Diffusion** (versión 3.5 en 2026) sigue siendo la opción de código abierto con más control técnico (vía ControlNet, por ejemplo, para encuadres precisos), y la de menor coste si se autoaloja.
- Para hostelería, la recomendación general y constante en el sector sigue siendo: **la fotografía real del plato/local es preferible a la IA generativa** para contenido de producto, porque genera confianza; la IA es más útil para fondos, ilustraciones, piezas gráficas de promociones o contenido conceptual, no para "inventar" platos que luego no coinciden con la realidad servida.
- Ningún dato de este archivo sobre versiones exactas (V8.1, GPT Image 2) debe tomarse como definitivo sin comprobar la web oficial de cada herramienta en el momento de usarlas, dado el ritmo de cambio de este sector.

## Conceptos fundamentales

**Por qué usar IA en el contenido de un restaurante.** No para sustituir la fotografía del plato real (que debe ser siempre auténtica, para no generar expectativas falsas en el cliente), sino para: fondos y texturas decorativas, piezas gráficas de promociones/eventos, ilustraciones para Stories o carruseles educativos (ej. "así se cultiva nuestro aceite"), y contenido conceptual para fechas señaladas donde no hay foto real disponible.

**Estado de cada herramienta en 2026:**
- **GPT Image (sustituto de DALL-E):** OpenAI retiró DALL-E 2 y DALL-E 3; la generación de imágenes actual se hace a través de modelos GPT Image, con una versión reciente (GPT Image 2 según fuentes de 2026) que mejora notablemente la renderización de texto dentro de la imagen — relevante para crear piezas gráficas con texto integrado (carteles de "Menú del día", por ejemplo).
- **Midjourney:** activo, con evoluciones continuas (V8.1 referenciada en fuentes 2026); se usa sobre todo para imágenes "hero" de alto impacto visual (portadas, contenido de marca), aunque su interfaz basada en Discord/web y su curva de aprendizaje de prompts lo hacen menos inmediato que otras opciones para un equipo no técnico.
- **Stable Diffusion:** de código abierto, permite ejecutarse localmente o vía servicios de terceros; su punto fuerte es el control técnico fino (con herramientas como ControlNet) para fijar composición y encuadre, relevante si se quiere generar variaciones consistentes de una misma pieza gráfica de marca.

**Riesgo reputacional del "plato de mentira".** El error más citado en el sector es usar IA para generar la imagen de un plato que luego no se parece al que se sirve en mesa, generando quejas y comparaciones negativas en redes ("no se parece en nada a la foto"). La IA generativa debe limitarse a contenido no fotográfico de producto real: gráficos, fondos, ilustraciones, texto promocional.

## Datos y benchmarks 2026

| Herramienta | Estado 2026 | Uso recomendado en hostelería | Coste aproximado | Fuente |
|---|---|---|---|---|
| DALL-E 2 / DALL-E 3 | Descontinuadas | No usar; sustituidas por GPT Image | — | aloa.co/ai/comparisons/ai-image-comparison |
| GPT Image (2) | Activa | Piezas gráficas con texto integrado (carteles, promos) | Incluido en suscripción ChatGPT Plus/API de pago por uso | aiunpacking.com/guides/ai-image-generators-2026 |
| Midjourney (V8.1) | Activa | Imágenes "hero" de alto impacto estético, contenido de marca | Planes desde ~10 $/mes | luniq.io/en/resources/blog/midjourney-vs-dall-e-vs-stable-diffusion |
| Stable Diffusion 3.5 | Activa, código abierto | Control técnico de encuadre/composición, generación de variantes de marca | Gratis (autoalojado) o de pago vía servicios como Leonardo/Fireworks | daylongs.com/blog/en/ai-image-generation-tools-comparison-2026 |

## Pasos accionables

1. Nunca generar con IA la imagen de un plato específico del menú para publicarla como si fuera fotografía real del producto servido.
2. Usar IA generativa para: fondos decorativos de Stories, piezas gráficas de promociones con texto, ilustraciones conceptuales (origen de ingredientes, proceso de elaboración de forma estilizada).
3. Para piezas con texto integrado (carteles de "Menú del día", horarios especiales): probar GPT Image por su buena renderización de texto.
4. Para imágenes de alto impacto estético de marca (portada de feed, contenido de campaña): probar Midjourney.
5. Para necesitar control fino de composición/encuadre y generar variantes consistentes de una misma plantilla gráfica: usar Stable Diffusion (autoalojado o vía servicio como Leonardo.ai).
6. Antes de contratar o usar cualquiera de estas herramientas, comprobar en su web oficial la versión y precio vigentes, dado que este sector cambia con mucha frecuencia y esta tabla puede quedar desactualizada en pocos meses.
7. Etiquetar internamente (aunque no sea obligatorio publicarlo) qué piezas de contenido son generadas por IA, para mantener trazabilidad y coherencia de marca.

## Ejemplos reales

*Ejemplo ilustrativo:* Un bar de cócteles genera con Midjourney una serie de fondos abstractos con la paleta de colores de su marca para usar como base de sus Stories de "cóctel de la semana", combinando ese fondo con la fotografía real del cóctel en primer plano. Este enfoque —IA para el fondo/contexto, fotografía real para el producto— es el patrón que más consistentemente aparece recomendado en las fuentes 2026 consultadas sobre fotografía de alimentos con IA.

## Errores comunes

- ❌ Publicar una imagen 100% generada por IA de un plato como si fuera la fotografía real del producto → ✅ Usar siempre fotografía real para el producto; reservar la IA para fondos, gráficos y contenido conceptual.
- ❌ Seguir usando prompts o tutoriales que mencionan "DALL-E 3" sin comprobar si sigue vigente → ✅ Verificar la herramienta actual (GPT Image) antes de usar guías antiguas.
- ❌ Generar contenido de IA sin adaptar la paleta de colores/estilo de marca del negocio → ✅ Incluir siempre referencias de marca (colores, tipografía, estilo) en el prompt.
- ❌ Depender de una sola herramienta sin comprobar cambios de versión o precio → ✅ Revisar periódicamente el estado de la herramienta usada, dado el ritmo de cambio del sector.

## Plantillas/Prompts

Prompt base para fondo decorativo de Stories (ejemplo, adaptar a la estética del negocio):
```
Fondo abstracto y minimalista en tonos [colores de marca], textura de [madera oscura / mármol claro / piedra], 
iluminación cálida ambiental, sin texto, sin personas, sin comida, estilo fotográfico editorial, 
formato vertical 9:16, alta resolución
```

Prompt base para pieza gráfica con texto (usar en GPT Image por su buena renderización de texto):
```
Cartel minimalista para restaurante con el texto "MENÚ DEL DÍA" en tipografía elegante serif, 
fondo en tonos [colores de marca], elementos decorativos sutiles (una rama de olivo / una copa de vino), 
sin fotografías de comida, estilo editorial limpio, formato cuadrado
```

## Recursos relacionados
- [[../10-skill-integration/directoria-integration.md]] — cómo esta skill conecta con DirectorIA Cloud para generar imágenes reales
- [DirectorIA Cloud](../../../../directoria/SKILL.md)
- [[README.md]]
- [[automation.md]]
- [[../07-plantillas-prompts/ai-image-prompts.md]]
- Midjourney: https://www.midjourney.com/
- Stable Diffusion (Stability AI): https://stability.ai/
- GPT Image / OpenAI: https://openai.com/

---
*Última actualización: 2026-09-02*
*Fuentes: https://aloa.co/ai/comparisons/ai-image-comparison/dalle-vs-midjourney-vs-stable-diffusion · https://aiunpacking.com/guides/ai-image-generators-2026-midjourney-dall-e-stable-diffusion/ · https://www.luniq.io/en/resources/blog/midjourney-vs-dall-e-vs-stable-diffusion-for-creative-agencies-in-2026 · https://www.shootlab.co.uk/post/ai-generated-food-photography-with-midjourney — nota: las versiones exactas (GPT Image 2, Midjourney V8.1) proceden de agregadores de noticias de IA y deben verificarse en las webs oficiales antes de dar por definitivas.*
