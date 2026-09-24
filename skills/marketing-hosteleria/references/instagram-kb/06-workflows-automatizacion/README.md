> **Origen:** `torre_de_vega/instagram-skill-hosteleria/06-workflows-automatizacion/README.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Workflows y automatización para Instagram en hostelería

## TL;DR

- Esta carpeta define un sistema semanal repetible: investigar → generar contenido → publicar → interactuar → revisar resultados → repetir, ajustando lo que funciona.
- La automatización (n8n, Metricool, herramientas de scraping/análisis) sirve para ahorrar tiempo en tareas repetitivas (programación, recopilación de datos de competencia, informes), **no** para sustituir la creatividad ni la interacción humana con la comunidad.
- n8n es la herramienta central recomendada para conectar piezas (scraping → IA generativa → calendario → publicación → informe), con una versión self-hosted gratuita y una versión Cloud desde ~20€/mes.
- Metricool es la herramienta líder en España para programación, analítica e IA de sugerencia de contenido y horarios — es el punto de partida más simple si no quieres montar infraestructura propia.
- El ciclo completo (investigación → generación → publicación → engagement → análisis) debería ocupar entre 3 y 6 horas/semana en un negocio pequeño una vez el sistema está rodado, no una jornada completa cada día. Un modelo mínimo realista y validado con un caso real es de **~3 horas/semana** (ver tabla de rutina semanal abajo) — es el suelo, no el objetivo a batir por volumen.

## Los 5 workflows de esta carpeta

1. **[[weekly-content-research.md]]** — Cada semana: qué hace la competencia, qué hashtags/tendencias están funcionando, qué preguntas hace la gente.
2. **[[content-generation.md]]** — De la investigación al post terminado: guion, copy, IA generativa, revisión, aprobación.
3. **[[publishing-schedule.md]]** — Cuándo publicar cada formato, calendario tipo, frecuencia recomendada.
4. **[[engagement-routine.md]]** — Rutina diaria/semanal de respuesta a comentarios, DMs, e interacción con otras cuentas.
5. **[[analytics-review.md]]** — Revisión semanal de métricas: qué duplicar, qué cortar, qué probar la próxima semana.

## Cómo encajan entre sí (flujo semanal)

```
Lunes:     weekly-content-research (30-45 min)
Martes:    content-generation (2-3h, puede repartirse en el resto de la semana)
Toda la semana: publishing-schedule (programado con antelación) + engagement-routine (15-20 min/día)
Viernes:   analytics-review (30-45 min) → alimenta la investigación del lunes siguiente
```

## Rutina semanal realista (~3 horas), validada con un caso real

Este es el modelo mínimo sostenible que reparte las ~3 horas/semana entre las 5 piezas del sistema — úsalo como base antes de escalar tiempo/equipo:

| Día | Tiempo | Acción | Workflow relacionado |
|---|---:|---|---|
| Lunes | 30 min | Revisar dashboard y elegir 3 piezas de la semana: producto/comida, personas/proceso, consideración/conversión | `weekly-content-research.md` |
| Día de pre-servicio | 60 min | Batch de grabación: 20-30 clips verticales variados (macros, caras, ambiente, producto estrella) | `content-generation.md` |
| 3 días/semana | 20 min c/u | Comments/DMs + interacción genuina con cuentas/negocios locales + Story de disponibilidad | `engagement-routine.md` |
| Domingo (o cierre de semana) | 30 min | Review de saves, sends, watch time, profile visits, DMs y reservas; decidir qué duplicar | `analytics-review.md` |
| **Total** | **~180 min / 3h** | | |

Si el negocio tiene más capacidad (equipo dedicado, varias personas), este es el suelo del que escalar frecuencia y producción — no el objetivo final para todos los negocios.

## Principio guía

La automatización reduce el tiempo en tareas mecánicas (buscar, programar, tabular datos) para liberar tiempo en las dos cosas que sí importan y que ninguna IA hace bien todavía en hostelería local: **conocer de verdad al cliente que entra por la puerta** y **responder como una persona en los comentarios/DMs**. Si un workflow automatiza la parte humana (respuestas genéricas de IA sin revisión, por ejemplo), revísalo — es probablemente el punto donde se pierde la conexión real con la comunidad.

## Recursos relacionados

- [[weekly-content-research.md]]
- [[content-generation.md]]
- [[publishing-schedule.md]]
- [[engagement-routine.md]]
- [[analytics-review.md]]
- [[../04-benchmarks-kpis/README.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: consultar cada archivo individual para las fuentes específicas usadas; informe interno informes/deep-research-report.md (rutina semanal realista de ~3h, caso Torre de Vega)*
