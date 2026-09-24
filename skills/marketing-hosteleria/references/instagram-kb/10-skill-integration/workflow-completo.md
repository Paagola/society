> **Origen:** `torre_de_vega/instagram-skill-hosteleria/10-skill-integration/workflow-completo.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Workflow Completo: Investigación → Post → Analítica

## TL;DR
- Workflow end-to-end en 6 fases: investigación → planificación de contenido → creación (real o IA) → revisión → publicación → analítica/iteración.
- Cada fase tiene un checklist accionable para no saltarse pasos críticos (revisión de placeholders, revisión de imágenes IA, franja horaria de publicación).
- El ciclo debe repetirse semanalmente para contenido táctico (especiales, Stories) y mensualmente para revisión estratégica (qué formatos funcionan, qué platos convierten más).
- La analítica cierra el ciclo: sin medir resultados, no se puede iterar ni mejorar el contenido siguiente.

## Conceptos fundamentales
- **Investigación**: entender el negocio, la competencia y el público antes de crear nada (ver `client-onboarding.md`).
- **Planificación**: calendario de contenido con mezcla de formatos (Reel, carrusel, Stories) y objetivos (venta, awareness, comunidad).
- **Creación**: producción del contenido, priorizando material real del local sobre IA cuando sea posible.
- **Revisión**: control de calidad antes de publicar (placeholders rellenados, imágenes IA revisadas, ortografía).
- **Publicación**: programación en la franja horaria óptima con caption y hashtags correspondientes.
- **Analítica**: medición de resultados frente a los KPIs definidos y ajuste del siguiente ciclo.

## Datos y benchmarks 2026
| Fase | Frecuencia | Responsable típico |
|---|---|---|
| Investigación inicial | Una vez al arrancar + revisión trimestral | Gestor de cuenta / agencia |
| Planificación de contenido | Semanal/mensual | Gestor de cuenta |
| Creación de contenido | 3-5 veces/semana (Reels/carrusel) + diario (Stories) | Gestor de cuenta / cliente |
| Revisión de calidad | Antes de cada publicación | Gestor de cuenta |
| Publicación | Franjas 12:00-14:00 y 19:00-21:00 | Programado (Metricool/Meta Business Suite) |
| Analítica | Semanal (táctica) + mensual (estratégica) | Gestor de cuenta |

## Pasos accionables

### Fase 1 — Investigación
1. Completa el checklist de `client-onboarding.md`.
2. Analiza 3-5 cuentas de competencia directa (formato, frecuencia, tono).
3. Define 3-5 adjetivos de marca (ver `research-to-prompts.md`).

### Fase 2 — Planificación
4. Crea un calendario semanal combinando Reels, carruseles y Stories usando las plantillas de `07-plantillas-prompts/`.
5. Asigna un objetivo a cada pieza de contenido (venta, awareness, comunidad, urgencia).

### Fase 3 — Creación
6. Prioriza grabar/fotografiar el producto real del local.
7. Cuando falte tiempo de producción o quieras un tratamiento/storyboard sobre una foto real ya tomada, genera con **[DirectorIA Cloud](../../../../directoria/SKILL.md)** siguiendo el protocolo de `directoria-integration.md` (foto real de referencia + guion + ángulo → brief JSON+NL → generación); si no tienes esa skill disponible, usa el fallback de `07-plantillas-prompts/ai-image-prompts.md`.
8. Redacta el caption con `07-plantillas-prompts/caption-templates.md`.

### Fase 4 — Revisión (checklist obligatorio antes de publicar)
9. ¿Todos los placeholders (`[NOMBRE_PLATO]`, `[PRECIO]`, etc.) están rellenados con datos reales?
10. ¿Las imágenes generadas con IA se revisaron (manos, texto, proporciones)?
11. ¿El caption tiene un único CTA claro?
12. ¿Los hashtags son de nicho + ciudad, no genéricos?
13. ¿La ortografía y los datos (horario, precio) son correctos y están vigentes?

### Fase 5 — Publicación
14. Programa en la franja horaria óptima (12:00-14:00 o 19:00-21:00) con la herramienta de programación del cliente (ver `09-recursos/tools-directory.md`).
15. Publica las Stories complementarias del día siguiendo `07-plantillas-prompts/story-sequences.md`.

### Fase 6 — Analítica e iteración
16. Revisa semanalmente: alcance, retención (Reels), guardados (carrusel), comentarios.
17. Compara contra los benchmarks de `04-benchmarks-kpis/`.
18. Identifica el formato/tema con mejor rendimiento del mes y repite su estructura con variaciones.
19. Ajusta el calendario del siguiente ciclo según lo aprendido.

## Ejemplos reales de aplicación en hostelería
- Un restaurante detecta que los Reels de "proceso de elaboración" (categoría B de `reel-scripts.md`) generan el doble de retención que los de "menú del día" → se prioriza esa categoría el mes siguiente.
- Una coctelería nota que los carruseles de "guía de maridaje" generan más guardados que cualquier otro formato → se convierte en contenido mensual fijo.

## Errores comunes
- ❌ Publicar contenido sin haber pasado por la fase de revisión de calidad.
  ✅ Aplica siempre el checklist de la Fase 4 antes de programar/publicar.
- ❌ Crear contenido sin objetivo definido ("publicar por publicar").
  ✅ Cada pieza de contenido debe tener un objetivo claro asignado en la fase de planificación.
- ❌ No revisar la analítica y repetir el mismo calendario mes tras mes sin ajustes.
  ✅ Cierra el ciclo cada mes con una revisión de qué funcionó y ajusta el siguiente calendario.

## Plantillas / Prompts
```
CHECKLIST DE PUBLICACIÓN (copiar antes de cada post)
[ ] Placeholders rellenados con datos reales
[ ] Imagen/vídeo revisado (real o IA revisada manualmente)
[ ] Caption con hook en primera línea + CTA único
[ ] 3-8 hashtags de nicho + ciudad
[ ] Horario, precio y datos verificados y vigentes
[ ] Programado en franja óptima (12-14h o 19-21h)
[ ] Stories complementarias del día programadas
```

## Recursos relacionados
- [[directoria-integration.md]]
- [[README.md]]
- [[research-to-prompts.md]]
- [[client-onboarding.md]]
- [[../07-plantillas-prompts/README.md]]
- [[../04-benchmarks-kpis/README.md]]
- [[../09-recursos/tools-directory.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: elaboración propia, integración interna de la base de conocimiento*
