> **Origen:** `torre_de_vega/instagram-skill-hosteleria/06-workflows-automatizacion/content-generation.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# De la investigación al post: generación de contenido paso a paso

## TL;DR

- El flujo recomendado es: investigación (lunes) → guion/idea → producción (foto/vídeo) → copy con apoyo de IA → revisión humana → programación.
- Herramientas de IA generativa de contenido (Metricool AI, Claude, ChatGPT) sirven para acelerar el copy y adaptar un mismo mensaje a distintos formatos (Reel, carrusel, story), no para sustituir la producción visual real de comida/local.
- Metricool, Later y Buffer incluyen asistentes de IA para sugerir texto y horario óptimo según tu histórico — Metricool es la opción con mejor soporte en español y plan gratuito más útil para una sola marca.
- n8n permite automatizar el "puente" entre investigación y generación: un disparador (nueva fila en Notion/Sheets con la idea) que llama a la IA (Claude/OpenAI) para generar el copy adaptado a cada red, dejándolo listo para revisión humana.
- Ningún contenido generado por IA debería publicarse sin revisión humana — al menos para verificar tono de marca, precisión de datos (precios, alérgenos, horarios) y que el texto suene a personas reales del negocio, no a IA genérica.

## Conceptos fundamentales — hostelería

- **Guion/idea**: una frase que resume el post antes de producirlo ("Reel del proceso de amasado de la pizza, mostrando el horno de leña encendiéndose").
- **Copy**: el texto que acompaña al post — debe tener gancho en la primera línea, cuerpo breve, y CTA claro (reservar, guardar, comentar).
- **Producción visual**: la parte que la IA no puede sustituir en hostelería — el plato real, el local real, el equipo real. La autenticidad visual es lo que diferencia a un negocio local de contenido genérico de stock.
- Ejemplo: una pizzería en Valencia usa la conclusión del lunes ("los carruseles de 'cómo distinguir X' funcionan bien en el sector") para generar el guion del martes: fotografían 5 pasos del proceso de su pizza napolitana, y usan una IA generativa para redactar 3 variantes de copy con distinto tono (informativo, humor, cercano) antes de elegir la que mejor encaja con su marca.

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| Tiempo de producción de contenido semanal (negocio pequeño, 1-2 personas) | 2-3h | Automatizado a <1,5h con IA + plantillas | Estimación basada en patrones del sector |
| Coste de n8n Cloud (si se automatiza el puente investigación→copy) | Self-hosted (gratis, requiere servidor propio) | Cloud desde ~20€/mes | ecosistemastartup.com 2026 |
| % de contenido que debería llevar revisión humana antes de publicar | 100% | 100% | Buena práctica de sector — no es una cifra de fuente externa, es un principio de gestión de marca |

## Pasos accionables

1. Convierte cada conclusión de `[[weekly-content-research.md]]` en 3-5 ideas de guion concretas para la semana (mezcla de formatos: Reel, carrusel, story).
2. Produce el material visual real (fotos/vídeo del local, plato, equipo) — este paso no se automatiza; resérvale el tiempo que necesite.
3. Usa una IA generativa (Metricool AI, Claude, ChatGPT) con un prompt que incluya: tono de marca, formato objetivo, gancho deseado, y CTA — genera 2-3 variantes de copy por post.
4. Revisión humana obligatoria: corrige datos (precios, horarios, alérgenos), ajusta el tono para que suene a tu equipo real, y verifica que no haya errores de la IA (alucinaciones sobre ingredientes o promociones inexistentes).
5. Si quieres automatizar el puente entre investigación y borrador de copy, monta un flujo en n8n: disparador (nueva idea en Notion/Sheets) → llamada a API de Claude/OpenAI con el prompt de marca → guarda el borrador en el mismo Sheets/Notion para revisión → notifica por Slack/email que hay contenido listo para revisar.

## Plantilla de embudo de conversión (descubrimiento → reserva)

El contenido generado no debería pensarse solo pieza a pieza, sino como parte de un embudo completo que conecta el Reel/Carousel con la reserva real. Plantilla generalizable — cada negocio elige su propia palabra clave:

```
Reel de descubrimiento → "Envíalo a [persona específica]"
Perfil → bio inequívoca: "[Propuesta] · [Zona] · [Ciudad] · Desde [año] ↓ Reserva"
Stories/Highlights → Carta | Menú día | [categorías del negocio] | Cómo llegar | Reservar
DM → palabra clave simple (ej. "MESA")
Respuesta rápida (plantilla) → "Perfecto. Envíanos día + hora aproximada + nº de personas y comprobamos disponibilidad."
Reserva → WhatsApp/llamada
Atribución → marcar "IG Organic" en un registro simple de reservas
```

Al escribir el guion/copy de cada pieza (paso 1-3 de "Pasos accionables"), ten este embudo completo en mente: el CTA del Reel/Carousel debe encajar con lo que la bio y los Highlights prometen, y la palabra clave de DM debe ser la misma en todas las piezas de la semana para no fragmentar el embudo. Ver `[[../01-estrategia-contenido/cta-library.md]]` para el diseño del CTA de sends y `[[engagement-routine.md]]` para la respuesta rápida en DM, y `[[analytics-review.md]]` para el registro de atribución de reservas.

## Ejemplos reales

Ejemplo ilustrativo (no verificado de forma independiente): un restaurante que centraliza sus ideas en Notion configura un workflow en n8n donde, al marcar una fila como "aprobado para redactar", se dispara una llamada a Claude que genera el copy adaptado a Instagram, con el tono de marca definido en el prompt; el equipo solo revisa y aprueba antes de pasar a `[[publishing-schedule.md]]` — este patrón (Notion + IA + n8n) es el que describen varias guías de automatización de contenido con n8n para 2026.

## Errores comunes

- ❌ Publicar directamente lo que genera la IA sin revisión, incluyendo posibles errores de datos (precio equivocado, alérgeno mal indicado).
  ✅ Revisión humana obligatoria en el 100% de los posts, especialmente en datos sensibles (alergias, precios, horarios).
- ❌ Usar el mismo prompt genérico para todo el contenido, resultando en un tono robótico y repetitivo.
  ✅ Define un prompt de marca claro (tono, tabúes, ejemplos de frases típicas del negocio) y reutilízalo, ajustando el objetivo de cada post.
- ❌ Delegar la producción visual (fotos/vídeo) a IA generativa de imágenes para mostrar "tu comida" — genera desconfianza si un cliente nota que la foto no es real.
  ✅ Usa IA solo para texto/copy y para tareas de apoyo (subtítulos, ideas de guion); la imagen del producto y del local debe ser real.

## Plantillas / Prompts

Prompt base para generación de copy con IA (adaptar tono a la marca):

```
Eres el/la community manager de [nombre del negocio], un [tipo de negocio: restaurante/coctelería/pizzería]
en [ciudad/barrio]. Tono de marca: [cercano/divertido/elegante/directo].

Genera 3 variantes de copy para Instagram sobre esta idea:
[descripción del guion/post]

Formato: [Reel / carrusel de X slides / story]
Debe incluir: gancho en la primera línea, cuerpo de máximo 3-4 líneas, CTA claro (elige uno: reservar,
guardar, comentar, visitar).
No inventes precios, ingredientes, alérgenos ni promociones — deja [CONFIRMAR] donde falte un dato real.
```

## Recursos relacionados

- [[weekly-content-research.md]]
- [[publishing-schedule.md]]
- [[../04-benchmarks-kpis/saves-benchmarks.md]]
- [Metricool — IA para crear contenido en redes sociales automáticamente](https://metricool.com/ai-social-media-post-generator/)
- [Automatizaciones n8n para Social Media: Guía 2026 + Templates](https://valordeley.es/blog/automatizaciones-n8n-social-media/)
- [Qué es n8n: workflows, IA y precios 2026](https://ecosistemastartup.com/que-es-n8n-workflows-ia-y-precios-2026/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://metricool.com/ai-social-media-post-generator/ ; https://valordeley.es/blog/automatizaciones-n8n-social-media/ ; https://ecosistemastartup.com/que-es-n8n-workflows-ia-y-precios-2026/ ; https://metricool.com/es/prompts-para-crear-contenido-con-inteligencia-artificial/ ; informe interno informes/deep-research-report.md (plantilla de embudo de conversión DM, caso Torre de Vega)*
