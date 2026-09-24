> **Origen:** `torre_de_vega/instagram-skill-hosteleria/10-skill-integration/README.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# README — Integración con Skills/Workflows de Generación de Imagen IA

## TL;DR
- Esta carpeta conecta la base de conocimiento de Instagram para hostelería con flujos de trabajo de generación de imagen/vídeo IA — en primer lugar con **[DirectorIA Cloud](../../../../directoria/SKILL.md)**, la skill hermana de dirección de arte IA de este workspace; en su ausencia, con Midjourney/DALL-E/Stable Diffusion sueltos.
- `directoria-integration.md` es el documento central: define exactamente qué modelo de DirectorIA usar para cada tipo de pieza de Instagram y la regla no negociable de partir siempre de fotos reales.
- El flujo recomendado es: investigación del negocio y competencia → research-to-prompts (traducir hallazgos en briefs concretos) → generación con DirectorIA Cloud (o fallback sin DirectorIA) → publicación → analítica → iteración.
- La IA generativa complementa la fotografía/vídeo real; nunca la sustituye cuando existe la posibilidad de grabar el producto real del local, y con DirectorIA Cloud nunca genera un plato sin referencia fotográfica real.
- `research-to-prompts.md` explica cómo pasar de una investigación de marca/competencia a un prompt de imagen concreto y usable.
- `workflow-completo.md` documenta el proceso end-to-end de un post, desde la idea hasta la medición de resultados.
- `client-onboarding.md` da un checklist para arrancar con un cliente nuevo de hostelería sin olvidar ningún dato clave.

## Cómo se conecta esta carpeta con el resto de la base
- La investigación de nicho y competencia vive en `03-hosteleria-nichos/` y `08-casos-estudio/`.
- Las plantillas y prompts listos para usar viven en `07-plantillas-prompts/`.
- Los benchmarks y KPIs para medir resultados viven en `04-benchmarks-kpis/`.
- Esta carpeta (`10-skill-integration/`) es la que ata todo el proceso en un workflow operativo, pensado para ejecutarse con ayuda de un skill de generación de imagen IA.

## Pasos accionables para integrar con un skill de generación de imagen
1. Antes de generar ninguna imagen, completa la investigación del negocio (ver `client-onboarding.md`).
2. Convierte los hallazgos de la investigación en prompts/briefs concretos siguiendo `research-to-prompts.md`.
3. Genera las imágenes/vídeos con **DirectorIA Cloud** si está disponible (ver `directoria-integration.md` para el mapeo pieza → modelo), o con el fallback de `07-plantillas-prompts/ai-image-prompts.md` si no lo está.
4. Revisa cada imagen generada antes de publicar (manos, texto, proporciones, y que el plato/local coincida con la foto real de referencia).
5. Publica siguiendo el proceso completo de `workflow-completo.md` y mide resultados con los KPIs de `04-benchmarks-kpis/`.

## Errores comunes
- ❌ Generar imágenes con IA sin haber hecho antes la investigación de marca/competencia.
  ✅ La IA debe reflejar la identidad visual y el posicionamiento real del negocio, no un estilo genérico.
- ❌ Saltarse la revisión humana de las imágenes generadas antes de publicar.
  ✅ Revisión obligatoria de cada imagen antes de que salga a producción (ver checklist en `workflow-completo.md`).
- ❌ Tratar la integración con el skill de IA como un paso aislado, desconectado de la estrategia de contenido.
  ✅ La generación de imagen es un paso dentro del workflow completo, no un proceso independiente.

## Recursos relacionados
- [[directoria-integration.md]] — protocolo detallado de integración con DirectorIA Cloud
- [DirectorIA Cloud](../../../../directoria/SKILL.md)
- [[research-to-prompts.md]]
- [[workflow-completo.md]]
- [[client-onboarding.md]]
- [[../07-plantillas-prompts/ai-image-prompts.md]]
- [[../04-benchmarks-kpis/README.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: elaboración propia, integración interna de la base de conocimiento*
