> **Origen:** `torre_de_vega/instagram-skill-hosteleria/06-workflows-automatizacion/weekly-content-research.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Investigación semanal: competencia + hashtags

## TL;DR

- Dedica 30-45 minutos cada lunes a revisar qué ha funcionado en cuentas competidoras y en tu nicho antes de planificar contenido — evita improvisar sin datos.
- Las marcas suelen trackear entre **20 y 50 hashtags** según el tamaño del nicho y los objetivos de campaña; para un negocio local, 5-10 hashtags locales + 10-15 de nicho es un punto de partida razonable.
- Herramientas de scraping/análisis relevantes en 2026: Bright Data, ScrapingBee, Apify, PhantomBuster, Data365, Decodo (antes Smartproxy), y para benchmarking directo: Socialinsider y HypeAuditor.
- No necesitas herramientas de pago para empezar: revisar manualmente 5-8 cuentas competidoras + guardar sus mejores posts en una colección privada de Instagram ya es una investigación semanal válida para un negocio pequeño.
- El objetivo de la investigación no es copiar, es detectar patrones: qué formato funciona en tu categoría (Reel de proceso, carrusel de menú, story de bastidores) y qué preguntas repite la gente en comentarios.
- **Honestidad con los datos de competencia**: guardados, alcance y visitas a perfil de una cuenta competidora nunca son públicos vía scraping — solo likes, comentarios y (en Reels) reproducciones lo son de forma razonablemente fiable. Por eso, un ranking automatizado tipo "Top 10 competidores de la semana" no puede basarse en guardados/shares/alcance: debe usar la fórmula de **Public Engagement Velocity** (ver `[[../04-benchmarks-kpis/README.md]]`), que solo usa señales públicas.

## Conceptos fundamentales — hostelería

- **Competencia directa**: 5-8 cuentas de negocios similares en tu ciudad/zona (mismo tipo de cocina, rango de precio o ambiente).
- **Competencia aspiracional**: 2-3 cuentas de referencia nacional/internacional en tu categoría (para ver hacia dónde va el formato, aunque no compitan contigo directamente por cliente).
- **Hashtags locales**: nombre de barrio/ciudad + tipo de negocio (#MalasañaFood, #ValenciaBrunch).
- **Hashtags de nicho**: tipo de cocina, ambiente o producto (#coctelesdeautor, #pizzanapolitana, #brunchmadrid).
- Ejemplo: una coctelería en Bilbao revisa cada lunes qué Reels de 3 coctelerías de referencia (una local, dos nacionales) tuvieron más guardados esa semana, y anota en una hoja simple el formato y gancho usado (no el contenido exacto) para inspirar, no copiar, el contenido propio.

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| Nº de hashtags trackeados por marca | 20 | 50 | Fuentes de scraping/análisis de competencia 2026 |
| Nº de cuentas competidoras a monitorizar (negocio local pequeño) | 3-5 | 8-10 | Estimación basada en patrones del sector — no hay cifra oficial de "número ideal" |
| Tiempo semanal dedicado a investigación (negocio pequeño, 1 persona) | 20 min | 45 min | Estimación basada en patrones del sector |
| Tasa de éxito de scraping en herramientas líderes (referencia técnica) | ~95% | 99,65% (ScrapingBee) | Bright Data / comparativas de scrapers 2026 |

## Arquitectura de automatización recomendada (para cuando se escala más allá de revisión manual)

Pipeline recomendado de extremo a extremo:

```
Apify (o scraper equivalente) → n8n/Make → Google Sheets/BigQuery
  → análisis visual/narrativo → tablero de ideas
  → Instagram Insights (cuenta propia) → atribución de reservas
```

Apify es la pieza de scraping recomendada (ver `[[../05-herramientas/scrapers.md]]`); n8n o Make conectan el resultado del scraper con una hoja de cálculo o base de datos; el análisis (qué patrón de hook/formato/asunto se repite en lo que mejor rinde) sigue siendo una tarea humana apoyada en IA; Instagram Insights aporta la parte que el scraping nunca puede dar — el rendimiento real de la cuenta propia (guardados, alcance, visitas a perfil); y la atribución de reservas cierra el ciclo conectando contenido con negocio real (ver `[[analytics-review.md]]`).

### Tabla de configuración (Config) para el pipeline
Generaliza la automatización con una tabla de configuración editable, en vez de hardcodear cuentas/hashtags en el workflow:

| Campo | Ejemplo |
|---|---|
| timezone | Europe/Madrid |
| own_account | (cuenta propia) |
| competitor_1..N | (cuentas de competencia verificadas manualmente primero) |
| hashtag_1..N | (hashtags semilla de las 5 capas — ver `[[../01-estrategia-contenido/hashtags-geo-tags.md]]`) |

Verifica manualmente cada cuenta de competencia antes de añadirla a la tabla — evita scrapear perfiles equivocados o cuentas privadas por error.

### Filtro de ventana de 7 días
Para que el ranking semanal solo incluya publicaciones recientes, filtra por timestamp en la zona horaria local de la cuenta:

```
run_time - 7 días <= timestamp_publicación <= run_time   (en timezone: Europe/Madrid, o la que corresponda)
```

Esto evita que un post viejo con mucho engagement acumulado distorsione el ranking de "qué está funcionando esta semana".

## Pasos accionables

1. **Lunes por la mañana (10-15 min):** revisa el feed y los Reels de tus 5-8 cuentas competidoras directas (guarda un tablero/colección privada en Instagram con los mejores posts de la semana).
2. **Revisa hashtags (10 min):** entra a 3-5 hashtags locales/de nicho y anota qué tipo de contenido está en los primeros resultados (formato, gancho, duración de Reel).
3. **Escanea comentarios de competidores (10 min):** lee los comentarios de sus 2-3 posts con más interacción — ahí están las preguntas reales de clientes potenciales (precio, alergias, horario, reservas) que puedes convertir en contenido propio.
4. **Si tienes presupuesto/volumen para escalar:** usa una herramienta como Socialinsider o HypeAuditor para automatizar el tracking de hashtags y comparar tu ER con el de competidores directos; para scraping más técnico (bulk de posts/perfiles), Apify o Bright Data vía n8n.
5. **Cierra con una nota de 3-5 líneas** ("qué funcionó esta semana en el sector") que alimente directamente el workflow de `[[content-generation.md]]`.

## Ejemplos reales

Ejemplo ilustrativo (no verificado de forma independiente): un restaurante de tapas en Sevilla usa un workflow simple en n8n que cada lunes por la mañana consulta vía Apify los últimos posts de 6 cuentas competidoras y los vuelca en una hoja de Google Sheets con alcance estimado, formato y fecha — el equipo revisa esa hoja en 10 minutos en vez de entrar manualmente a cada perfil, ahorrando el tiempo equivalente descrito en fuentes de automatización n8n para social media.

## Errores comunes

- ❌ Copiar literalmente el contenido de un competidor (mismo guion, misma estructura visual) — además de poco ético, Instagram penaliza contenido muy similar a otro que ya circula.
  ✅ Extrae el patrón (formato, gancho, duración) y aplícalo a tu propio producto/historia.
- ❌ Trackear 50 hashtags sin nunca revisar los datos.
  ✅ Empieza con 10-15 hashtags bien elegidos y revísalos de verdad cada semana; escala solo si tienes tiempo/herramienta para analizarlos.
- ❌ Investigar solo cuentas grandes/virales que no representan tu categoría real.
  ✅ Prioriza cuentas de tamaño similar al tuyo en tu misma ciudad — su contenido es más replicable que el de una cuenta con equipo de producción propio.

## Plantillas / Prompts

Checklist semanal de investigación (10-15 min, lunes):
- [ ] Reviso los 3 posts con más interacción de mis 5-8 competidores directos de la última semana.
- [ ] Anoto formato (Reel/carrusel/foto) y gancho de cada uno.
- [ ] Reviso 3-5 hashtags locales/de nicho y qué contenido aparece arriba.
- [ ] Leo comentarios de los 2 posts más comentados de la competencia — anoto preguntas repetidas.
- [ ] Escribo 3-5 líneas de conclusión para pasar a generación de contenido.

## Recursos relacionados

- [[content-generation.md]]
- [[../06-workflows-automatizacion/README.md]]
- [[../04-benchmarks-kpis/reach-local.md]]
- [8 Mejores Scrapers y Herramientas de Instagram 2026 (Data365)](https://data365.co/blog/best-instagram-scrapers)
- [Best Instagram Scrapers in 2026: Ranked and Reviewed (Bright Data)](https://brightdata.com/blog/web-data/best-instagram-scrapers)
- [14 herramientas de análisis de Instagram en 2026 (HypeAuditor)](https://blog.hypeauditor.com/es/herramientas-analisis-instagram-probar/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://data365.co/blog/best-instagram-scrapers ; https://brightdata.com/blog/web-data/best-instagram-scrapers ; https://blog.hypeauditor.com/es/herramientas-analisis-instagram-probar/ ; https://nodemaven.com/blog/instagram-scraping/ (el número de cuentas competidoras a monitorizar y el tiempo semanal recomendado son estimación basada en patrones del sector); informe interno informes/deep-research-report.md (arquitectura de pipeline Apify→n8n→Sheets, tabla Config, filtro de ventana de 7 días, honestidad de datos públicos de competencia — caso Torre de Vega)*
