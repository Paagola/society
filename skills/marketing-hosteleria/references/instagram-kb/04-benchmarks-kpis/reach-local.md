> **Origen:** `torre_de_vega/instagram-skill-hosteleria/04-benchmarks-kpis/reach-local.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Alcance local (% dentro de un radio de proximidad): objetivos

## TL;DR

- **No existe un benchmark público estandarizado** de "% de alcance dentro de 5km" para negocios de hostelería — ninguna de las fuentes consultadas (Metricool, Socialinsider, Hootsuite, Dash Social) publica esta métrica de forma directa, porque Instagram no la expone así de forma nativa.
- Lo que sí existe y es medible: geoetiquetado (ubicación en posts/stories/Reels), uso de hashtags locales, y el hecho documentado de que el contenido geolocalizado mejora la visibilidad en el explorador local y el engagement, a costa de reducir el alcance total.
- La prueba social local (reseñas, menciones de clientes cercanos) puede aumentar conversión un **15%-40%** frente a testimonios genéricos, según A/B testing citado en fuentes de hyperlocal marketing — esto sí tiene respaldo, aunque no es específico de Instagram ni de hostelería en España.
- Como proxy de "alcance local", usa estos cinco indicadores concretos, en orden de fiabilidad creciente: (a) alcance/seguidores por localidad cuando Insights te dé suficiente detalle geográfico, (b) DMs y reservas con origen atribuido a Instagram (registrados a mano en tu log de atribución), (c) clientes que responden "Instagram" cuando les preguntas en sala cómo conocieron el local, (d) clics/conversaciones de WhatsApp iniciadas desde el enlace de la bio, (e) reservas rastreadas con un código de campaña o parámetro UTM propio en el enlace de reservas. Los tres últimos (c, d, e) son los más fiables porque son datos de tu propio negocio, no estimaciones de terceros — y conectan directamente con la métrica norte de `../04-benchmarks-kpis/README.md` (covers reservados atribuibles a Instagram).
- Trata cualquier cifra de "% de alcance en 5km" que veas en otros sitios con escepticismo si no cita una fuente medible — probablemente es una cifra inventada o extrapolada sin base.

## Conceptos fundamentales — hostelería

- El "alcance local" en hostelería importa porque, a diferencia de una marca de e-commerce, tu cliente objetivo real vive o trabaja a poca distancia (a pie, en transporte público corto, o de paso por turismo en la zona).
- Instagram no tiene un filtro nativo de "alcance por radio de km" visible para el negocio — lo que sí puedes ver en Insights es la **ubicación (ciudad/país) de tus seguidores**, que es un proxy razonable pero no idéntico a "alcance en 5km del local".
- El geoetiquetado (marcar tu ubicación en cada post/story/Reel) es la palanca más directa: hace que tu contenido aparezca cuando alguien busca o explora esa ubicación en Instagram, aumentando la probabilidad de que lo vea gente físicamente cerca o de paso por la zona.
- Ejemplo: una hamburguesería en el barrio de Malasaña (Madrid) etiqueta su ubicación exacta en cada Reel y usa hashtags como #MalasañaFood #MadridBurgers — esto no garantiza un "% de alcance en 5km" medible, pero sí aumenta la probabilidad de aparecer en el explorador de gente buscando planes en esa zona concreta.

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| % de alcance dentro de un radio de 5km del local | Sin benchmark público disponible | Sin benchmark público disponible | No verificable — estimación basada en patrones del sector, NO un dato medido |
| Uplift en conversión por prueba social local (reseñas/testimonios locales) vs. genérica | +15% | +40% | Fuentes de hyperlocal marketing 2026 (no específico de Instagram/hostelería España) |
| Nº de hashtags locales recomendados por marca a trackear | 5-10 (locales/nicho) | 20-50 (incluyendo generales) | Fuentes de scraping/análisis competencia 2026 |
| Efecto del geoetiquetado en engagement | Aumenta engagement, reduce alcance total | — (trade-off documentado, sin cifra exacta) | Fuentes de hyperlocal marketing 2026 |

**Honestidad explícita:** la primera fila (alcance en 5km) no tiene fuente — no la publiques ni la uses como KPI oficial frente a clientes o jefes sin dejar claro que es una estimación no verificada. Si necesitas ese dato con precisión real, la única vía fiable es un estudio propio cruzando geolocalización de seguidores + encuestas a clientes en sala ("¿cómo nos encontraste?").

## Pasos accionables

1. Activa el geoetiquetado en el 100% de tus posts, Reels y stories: ubicación exacta del local (no solo "ciudad").
2. Revisa mensualmente en Instagram Insights la sección "Tu audiencia" → ciudad de tus seguidores, como proxy de concentración local.
3. Trackea 5-10 hashtags locales/de barrio + 10-15 de nicho (tipo de cocina, ambiente) con una hoja simple o herramienta como Socialinsider/HypeAuditor.
4. Implementa una pregunta rápida en sala o en el ticket ("¿cómo nos conociste?") de forma continua (no solo 2-4 semanas) para tener un dato real de cuánta gente viene por Instagram — esto sustituye al benchmark inexistente con un dato propio y alimenta el log de atribución de covers/reservas descrito en `../04-benchmarks-kpis/README.md`.
5. Prioriza contenido con testimonios/reseñas de clientes reales de la zona — es la palanca con mejor respaldo de datos (15-40% de uplift en conversión) de esta lista.
6. Añade un código de campaña o UTM propio al enlace de reservas que uses en la bio/Linktree, y activa el seguimiento de conversaciones de WhatsApp iniciadas desde ese mismo enlace — son dos de los cinco proxies de alcance local más fiables porque son datos de negocio, no estimaciones externas.

## Ejemplos reales

Ejemplo ilustrativo (no verificado de forma independiente, construido sobre el patrón documentado de geoetiquetado + hashtags locales): una franquicia de restaurantes en expansión en Madrid combina geoetiquetas exactas por local y hashtags tipo #MadridFoodies con contenido de reseñas de clientes de barrio, y reporta cualitativamente mejor "sensación" de reconocimiento de vecinos — pero no existe una cifra pública auditada de cuánto de su alcance cayó exactamente dentro de un radio de 5km, por lo que no se puede citar un número aquí.

## Errores comunes

- ❌ Usar hashtags genéricos globales (#food #foodie #instafood) esperando alcance local.
  ✅ Combina 1-2 hashtags de ciudad/barrio específicos con hashtags de nicho — el explorador local pondera la relevancia geográfica.
- ❌ No etiquetar la ubicación por pereza o porque "ya me sigue la gente de la zona".
  ✅ Etiqueta siempre — es gratis y es la señal más directa que tiene Instagram para posicionarte en explorador local.
- ❌ Presentar "% de alcance en 5km" como un dato medido en un informe a un cliente sin aclarar que es una estimación.
  ✅ Si no tienes forma de medirlo con precisión, dilo explícitamente y ofrece el proxy (ubicación de seguidores + encuesta en sala) como alternativa honesta.

## Recursos relacionados

- [[profile-visit-funnel.md]]
- [[dms-conversions.md]]
- [[../06-workflows-automatizacion/weekly-content-research.md]]
- [Hyperlocal Marketing Strategies for Local Business Growth in 2026 (SocialPilot)](https://www.socialpilot.co/blog/hyperlocal-marketing)
- [Local Instagram marketing: 9 proven growth hacks (VeraContent)](https://veracontent.com/mix/local-instagram-marketing/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://www.socialpilot.co/blog/hyperlocal-marketing ; https://veracontent.com/mix/local-instagram-marketing/ ; https://curator.io/blog/hyperlocal-social-media-marketing (el KPI principal del archivo, % de alcance en 5km, no tiene fuente pública verificable — se marca así explícitamente en el texto) ; informe interno informes/deep-research-report.md (declaraciones de Adam Mosseri, sección "Instagram en 2026: señales reales y sistema de conversión")*
