> **Origen:** `torre_de_vega/instagram-skill-hosteleria/04-benchmarks-kpis/dms-conversions.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# DMs semanales → conversión en reservas

## TL;DR

- El DM es el canal de conversión más directo en Instagram para hostelería: de ahí sale la reserva, la consulta de carta, la pregunta de aforo.
- Sin automatización, la conversión de DM a reserva ronda **15%-25%**; con automatización (respuestas rápidas, flujos de reserva) puede subir a **40%-60%**, según fuentes del sector de automatización de DMs.
- La velocidad de respuesta importa muchísimo: responder en menos de 5 minutos convierte hasta **21x mejor** que responder a los 30 minutos.
- El engagement en redes sociales se asocia a un **31%** de incremento en reservas según un estudio de hospitality de 2026 — no es causalidad pura, pero es la correlación que reportan los operadores.
- Los recordatorios automáticos por DM pueden bajar el "no-show" del ~20% habitual al **5%-8%**.

## Conceptos fundamentales — hostelería

- Un DM en hostelería normalmente pregunta: disponibilidad para una fecha, precio de menú/evento, si aceptan una reserva grande, o piden el menú/carta.
- La "conversión" aquí es: DM recibido → reserva confirmada (por teléfono, por el propio DM, por enlace a reservas online).
- Ejemplo: un restaurante de brunch en Barcelona recibe 40 DMs/semana los viernes preguntando por mesa para el sábado; si responde en la primera hora con disponibilidad y enlace de reserva, la conversión histórica ronda el 20-25% (sin automatizar) — con un bot de respuesta rápida que confirma franjas horarias al instante, esa cifra puede acercarse al rango alto reportado en el sector (40-60%).

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| Conversión DM → reserva sin automatización | 15% | 25% | Fuentes de automatización DM sector hostelería 2026 |
| Conversión DM → reserva con automatización | 40% | 60% | Fuentes de automatización DM sector hostelería 2026 |
| Ratio de apertura de DM (audiencia comprometida) | 80% | 90% | CreatorFlow, Instagram DM metrics 2026 |
| CTR dentro de DM (enlace a reservas, carta, etc.) | 12% | 18-28% | CreatorFlow, Instagram DM metrics 2026 |
| Tasa de respuesta de la audiencia a un DM enviado | 50% | 60% | CreatorFlow, Instagram DM metrics 2026 |
| Mejora de conversión por responder en <5 min vs 30 min | — | hasta 21x | Fuentes de lead response benchmarks 2026 (no específico de hostelería, aplicable por analogía) |
| No-show con recordatorio automático por DM | 8% | 5% | Fuentes de automatización DM sector hostelería 2026, vs. ~20% de media sectorial sin recordatorio |
| Impacto de engagement social en reservas | +20% | +31% | ionhospitality.com 2026 |

**Nota de honestidad:** las cifras de "conversión DM → reserva" (15-25% / 40-60%) provienen de fuentes especializadas en automatización de DM y marketing de conversación, no de una auditoría independiente del sector hostelero español. Trátalas como rango orientativo del sector, no como dato certificado — mide siempre tu propia tasa real antes de fijar objetivos internos.

## Pasos accionables

1. Activa respuestas rápidas guardadas en Instagram (Configuración > Empresa > Respuestas rápidas) para las 5 preguntas más frecuentes: horario, ubicación, reserva, menú del día, aforo para grupos.
2. Si el volumen de DMs supera ~15-20/semana, evalúa un flujo de automatización básico (ManyChat, Chatloom, o un bot vía n8n + API de Meta) que confirme franja horaria y derive a reserva online — revisa `[[../06-workflows-automatizacion/engagement-routine.md]]`.
3. Mide semanalmente: DMs recibidos, DMs respondidos en <1h, reservas confirmadas atribuibles a DM. Con eso calculas tu conversión real.
4. Configura un recordatorio automático 24h antes de la reserva (DM o WhatsApp) para reducir no-shows — es la palanca con mejor ratio esfuerzo/impacto según las fuentes consultadas.
5. Si tu conversión está por debajo del 15%, el cuello de botella suele ser tiempo de respuesta, no volumen de DMs — prioriza velocidad antes que automatizar todo el flujo.

## Ejemplos reales

Ejemplo ilustrativo (no verificado de forma independiente): un gastrobar en Sevilla que empieza a usar respuestas rápidas nativas de Instagram para las preguntas de reserva más comunes reduce su tiempo medio de respuesta de 3 horas a 20 minutos; su equipo reporta subjetivamente un aumento notable en reservas confirmadas por DM los fines de semana, coherente con el patrón de "respuesta rápida = más conversión" documentado en las fuentes generales de lead response.

## Errores comunes

- ❌ Dejar los DMs para "cuando haya un rato" — la ventana de conversión se cierra rápido; a los 30 minutos la conversión ya cae drásticamente frente a los primeros 5 minutos.
  ✅ Asigna una persona o turno responsable de revisar DMs cada 30-60 min en horario de apertura, o automatiza la primera respuesta.
- ❌ Automatizar el 100% del flujo sin opción de hablar con una persona — frustra a quien tiene una pregunta específica (alergias, evento grande).
  ✅ Automatiza las preguntas repetitivas (horario, disponibilidad) y deja una salida clara a "hablar con el equipo" para el resto.
- ❌ No medir la conversión real y basarse solo en "sensación" de que van bien los DMs.
  ✅ Lleva una hoja simple (o CRM ligero) con DMs semanales y reservas atribuidas, aunque sea manual al principio.

## Plantillas / Prompts

Respuestas rápidas sugeridas para configurar en Instagram:
- "¡Hola! Gracias por escribir 🙌 Nuestro horario es [X]. ¿Para qué día y cuántas personas sería la reserva?"
- "Puedes reservar directamente aquí: [enlace]. Si prefieres, dime fecha y número de comensales y te confirmo disponibilidad."
- "Nuestro menú completo lo tienes aquí: [enlace a carta/Linktree]. ¿Buscabas algo en concreto (vegano, sin gluten, menú de grupo)?"

## Recursos relacionados

- [[profile-visit-funnel.md]]
- [[reach-local.md]]
- [[../06-workflows-automatizacion/engagement-routine.md]]
- [Instagram DM Automation for Restaurants (CreatorFlow)](https://creatorflow.so/blog/instagram-dm-automation-restaurants-local-businesses/)
- [Key Instagram DM Metrics That Matter for Sales](https://creatorflow.so/blog/instagram-dm-metrics-that-matter/)
- [Social media engagement for restaurants: 31% more bookings](https://www.ionhospitality.com/2026/04/26/social-media-engagement-restaurants-more-bookings/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://creatorflow.so/blog/instagram-dm-automation-restaurants-local-businesses/ ; https://creatorflow.so/blog/instagram-dm-metrics-that-matter/ ; https://www.ionhospitality.com/2026/04/26/social-media-engagement-restaurants-more-bookings/ ; https://leadresponse.co/blog/instagram-dm-statistics (cifras de conversión de DM marcadas como estimación de sector, no auditoría independiente)*
