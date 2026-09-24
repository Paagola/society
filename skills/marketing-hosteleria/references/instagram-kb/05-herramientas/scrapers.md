> **Origen:** `torre_de_vega/instagram-skill-hosteleria/05-herramientas/scrapers.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Scrapers de Instagram: Instaloader, Apify, ScrapFly

## TL;DR
- Estas herramientas sirven para analizar a la competencia (qué publican, con qué frecuencia, qué engagement obtienen), no para automatizar la propia cuenta.
- **Instaloader** es gratuito, de código abierto y **no está mantenido ni respaldado oficialmente por Meta/Instagram** — trátalo como opción de respaldo (fallback) para análisis puntuales de bajo volumen, no como pieza central de un sistema recurrente.
- **Apify** es la opción recomendada como pieza principal del pipeline en 2026: servicio gestionado, sin infraestructura propia, con precio por resultado (aprox. 1,50 $ por 1.000 posts) y planes desde gratis hasta 179 $/mes.
- **Instagram Insights (nativo) es la única fuente de verdad para el rendimiento de tu propia cuenta** — guardados, alcance, sends y visitas a perfil de la cuenta propia nunca están disponibles vía scraping de competidores; el scraping solo aporta señales públicas de terceros (likes, comentarios, y en algunos casos reproducciones).
- La legalidad depende de si los datos son públicos (sin login) y no incluyen contenido con derechos de autor de terceros reutilizado sin permiso; scrapear detrás de un login o recolectar datos personales expone a riesgos legales (RGPD, términos de servicio).
- Para un negocio de hostelería individual, el scraping suele ser innecesario salvo para benchmarking de 3-5 competidores directos; no sustituye a Insights propio.

## Conceptos fundamentales

**¿Para qué sirve el scraping en hostelería?** El caso de uso principal no es "conseguir seguidores" ni automatizar la propia cuenta, sino investigar qué está funcionando a la competencia: frecuencia de publicación, formatos (Reels vs. fotos), horarios, hashtags usados, y engagement aproximado en perfiles públicos comparables (otros restaurantes de la zona o del mismo tipo de cocina).

**Instaloader.** Librería de Python de código abierto, gratuita, que permite descargar publicaciones, Stories, perfiles y metadatos de cuentas públicas de Instagram. Es la opción más usada en 2026 como punto de partida técnico. Requiere ejecutarse en un servidor propio (VPS) y, para uso sostenido, suele necesitar proxies rotativos para evitar bloqueos de IP, lo que añade coste operativo aunque la herramienta en sí sea gratis.

**Apify.** Plataforma de scraping como servicio (SaaS) con "actors" preconstruidos para Instagram (perfiles, posts, hashtags, comentarios). No requiere mantener infraestructura propia. Facturación por resultado obtenido, con plan gratuito de créditos iniciales y planes mensuales para uso recurrente.

**ScrapFly.** Servicio de scraping enfocado en evadir bloqueos anti-bot mediante rotación de proxies y renderizado de páginas, usado más como infraestructura para desarrolladores que construyen su propio scraper que como herramienta lista para no-técnicos. Recomendable solo si ya se dispone de capacidad de desarrollo interna.

**Por qué un ranking de competidores no puede usar guardados/alcance.** Guardados, alcance y sends de una cuenta competidora son datos privados de esa cuenta — nunca están disponibles vía scraping, con independencia de la herramienta usada. Un informe automatizado tipo "Top 10 competidores de la semana" que intente ordenar por esas métricas está, en el mejor de los casos, adivinando. La forma honesta de rankear competidores con datos scrapeados es usar solo señales públicas fiables (likes, comentarios, y reproducciones en Reels cuando el dato es público) combinadas en la fórmula de **Public Engagement Velocity** (ver `[[../04-benchmarks-kpis/README.md]]`) — no redefinas esta fórmula aquí, solo úsala como criterio de ranking en el workflow de scraping semanal (ver `[[../06-workflows-automatizacion/weekly-content-research.md]]`).

**Legalidad y ética.** La jurisprudencia estadounidense (caso hiQ vs. LinkedIn, noveno circuito) estableció que scrapear datos públicos sin necesidad de login no es ilegal per se, pero acceder sin autorización a datos tras un login, o recolectar y almacenar datos personales de usuarios (no solo de negocios), sí expone a riesgos bajo RGPD en la UE y bajo los términos de servicio de Meta, que prohíben explícitamente el scraping automatizado de su plataforma. La recomendación práctica: limitarse a datos públicos de perfiles de negocio (no de personas privadas), a baja frecuencia, y evitar el almacenamiento de datos personales de usuarios individuales.

## Datos y benchmarks 2026

| Herramienta | Precio | Pros | Contras | Fuente |
|---|---|---|---|---|
| Instaloader | Gratis (open source); ~30-100 $/mes en VPS + proxies si se usa a escala | Gratis, muy usado, comunidad activa | Requiere mantenimiento propio, riesgo de bloqueos de IP | proxyway.com/best/instagram-scrapers |
| Apify (Instagram Scraper) | Gratis (créditos iniciales) · Starter 49 $/mes · Scale 179 $/mes · pago por uso ~1,50 $/1.000 resultados | Sin infraestructura propia, actors listos, escalable | Coste puede crecer rápido a volumen alto | apify.com/apidojo/instagram-scraper |
| ScrapFly | Variable según uso (no publicado en las fuentes consultadas) | Buena evasión de bloqueos anti-bot, para desarrolladores | Requiere programar el scraper, no es "listo para usar" | scrapfly.io/blog/posts/best-open-source-instagram-scrapers |

## Pasos accionables

1. Definir el objetivo concreto: benchmarking de 3-5 competidores directos, no scraping masivo ni indiscriminado.
2. Para un análisis puntual y de bajo volumen: usar Instaloader localmente sobre perfiles públicos de competidores.
3. Para análisis recurrente (mensual) sin gestionar infraestructura: contratar el actor de Instagram Scraper en Apify con el plan gratuito o Starter.
4. Nunca scrapear detrás de un login propio ni recolectar datos personales de usuarios individuales (comentaristas, seguidores) — limitarse a datos de la cuenta de negocio (posts, frecuencia, hashtags, engagement agregado).
5. Documentar qué se ha recogido, con qué fin y durante cuánto tiempo se conserva, especialmente si hay algún dato personal indirecto (RGPD).
6. Cruzar los datos obtenidos con la analítica propia (Insights nativo o herramienta de la sección [[analytics.md]]) para contextualizar cifras.

## Ejemplos reales

*Ejemplo ilustrativo:* Una pizzería que quiere lanzar Reels usa Apify para analizar los 5 perfiles de pizzerías con más engagement de su ciudad durante un mes, identificando que publican Reels de "estirado de masa" 3 veces por semana en horario de comida. Esta práctica de benchmarking puntual y no intrusiva es el uso más defendible y común descrito en las fuentes 2026 consultadas.

## Errores comunes

- ❌ Scrapear cuentas privadas o requerir login para acceder a los datos → ✅ Limitarse a perfiles y contenido públicos.
- ❌ Almacenar datos personales de comentaristas o seguidores individuales → ✅ Recoger solo métricas agregadas del contenido del negocio competidor.
- ❌ Montar un scraper propio sin proxies y sorprenderse de bloqueos constantes de IP → ✅ Presupuestar proxies rotativos o usar un servicio gestionado como Apify.
- ❌ Usar los datos scrapeados para copiar literalmente contenido ajeno → ✅ Usarlos solo como inspiración de formato/frecuencia, nunca para plagiar textos o imágenes.

## Recursos relacionados
- [[README.md]]
- [[analytics.md]]
- [[../02-configuracion-tecnica/security-privacy.md]]
- [[../06-workflows-automatizacion/weekly-content-research.md]]
- [[../04-benchmarks-kpis/README.md]]
- Instaloader: https://instaloader.github.io/
- Apify Instagram Scraper: https://apify.com/apidojo/instagram-scraper
- ScrapFly: https://scrapfly.io/

---
*Última actualización: 2026-09-02*
*Fuentes: https://proxyway.com/best/instagram-scrapers · https://apify.com/apidojo/instagram-scraper · https://scrapfly.io/blog/posts/best-open-source-instagram-scrapers · https://use-apify.com/docs/how-to-use-apify/scrape-instagram · informe interno informes/deep-research-report.md (honestidad de datos públicos vs. privados en ranking de competidores, Apify como pieza principal e Instaloader como fallback — caso Torre de Vega)*
