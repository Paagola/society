> **Origen:** `torre_de_vega/instagram-skill-hosteleria/00-algoritmo/README.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Algoritmo de Instagram 2026 — Visión general para hostelería

## TL;DR

- Instagram ya no tiene "un" algoritmo: tiene **cuatro sistemas de recomendación distintos** (Feed, Historias, Reels/Explorar, Búsqueda), cada uno con señales propias. Adam Mosseri lo repite en casi cada actualización pública.
- Las tres señales que Mosseri confirmó como las más importantes desde enero 2025 son: **tiempo de visualización (watch time)**, **envíos por alcance (sends per reach)** y **"me gusta" por alcance (likes per reach)** — con los envíos pesando entre 3 y 5 veces más que los likes para llegar a cuentas que no te siguen.
- Además de esas tres, varias fuentes de marketing digital sostienen que en 2026 ha ganado peso la **conversación bidireccional** (DMs, respuestas a comentarios, respuestas a historias) y que Instagram penaliza la **falta de originalidad** (reposts, marcas de agua de TikTok/CapCut, contenido de IA sin transformación real). **Importante:** a diferencia de las tres señales anteriores, ni la "conversación bidireccional como señal de ranking directa" ni un supuesto "Originality Score" con ese nombre están confirmados públicamente por Mosseri o Meta — son interpretaciones de terceros. Responder rápido a DMs y comentarios sí es una **buena práctica de atención al cliente que convierte en reservas**, y evitar el contenido repostado/con marca de agua sí reduce el alcance en Explorar (esto último con más respaldo indirecto), pero ninguno de los dos debe presentarse como "así puntúa el algoritmo".
- Para un restaurante, bar o pizzería esto se traduce en una prioridad clara: contenido que la gente **guarda, comparte por DM y rewatchea**, no contenido que solo "le gusta".
- No existe un algoritmo único que se pueda "hackear": son modelos de machine learning que predicen probabilidad de interacción por usuario y por superficie, entrenados y re-entrenados constantemente.

## Cómo está organizado este dossier

Instagram no puntúa el contenido con una fórmula fija y pública. Meta combina cientos de señales en modelos predictivos que estiman, para cada usuario y cada pieza de contenido, la probabilidad de que la vea, la guarde, la comparta, comente o se quede viendo. Lo que sí es público —porque Mosseri y el equipo de Instagram lo han explicado en entrevistas, en su cuenta de Instagram (@mosseri) y en el blog de Meta— son las **categorías de señales** y su **peso relativo aproximado**, que es lo que documentamos aquí.

> **Cómo leer este dossier — confirmado vs. estimación interna**
> A partir de aquí verás dos tipos de afirmación, siempre etiquetadas:
> - ✅ **Confirmado por Meta/Mosseri**: declaraciones públicas directas de Adam Mosseri (jefe de Instagram) o documentación oficial de Meta.
> - ⚠️ **Estimación / objetivo interno de gestión**: cifras o "reglas" que circulan en agencias y medios de marketing digital, útiles como benchmark operativo, pero que Meta nunca ha confirmado como umbral oficial del algoritmo. Tratarlas como umbral de ranking real es la fuente de la mayoría de "mitos del algoritmo" que corregimos en este dossier.

Cada superficie (Feed, Historias, Reels, Explorar) tiene su propio documento:

- [[feed-ranking.md]] — cómo se ordena el feed principal
- [[reels-ranking.md]] — watch time, retención y repetición en Reels
- [[stories-ranking.md]] — cercanía y frecuencia de interacción en Historias
- [[explore-ranking.md]] — cómo te descubre gente que no te sigue
- [[signals-weight-2026.md]] — tabla comparativa del peso de cada señal
- [[originality-score.md]] — qué penaliza y cómo optimizar
- [[returning-viewer-rate.md]] — la métrica "oculta" de espectadores que vuelven

## Conceptos fundamentales

### 1. Cuatro superficies, cuatro modelos

Mosseri ha sido explícito: "no hay un algoritmo de Instagram", hay varios, uno por cada parte de la app (Feed, Stories, Reels/Explore, Search). Cada uno optimiza para un objetivo distinto:

- **Feed**: mostrar primero lo que más te importa de la gente que sigues (relación > interés > actualidad).
- **Historias**: mostrar primero a las cuentas con las que tienes más "cercanía" (closeness): a quién le escribes, a quién ves más y con quién interactúas.
- **Reels / Explorar**: maximizar el tiempo de visualización y la probabilidad de que te guste, guardes o compartas contenido de cuentas que **no** sigues (descubrimiento).
- **Búsqueda**: coincidencia semántica de palabras clave, hashtags y texto en la imagen/vídeo (Instagram ya indexa el contenido visual y el texto en pantalla).

### 2. El giro de 2025-2026: de "me gusta" a "confianza"

Hasta 2023-2024 el like era la métrica reina en la percepción popular. Desde 2025, Instagram ha insistido en que un like es una señal "barata" (cuesta un toque, no implica esfuerzo) mientras que **guardar, compartir por DM y comentar con frases largas** implican una decisión activa que Instagram interpreta como una señal de calidad mucho más fiable. Esto es clave para hostelería: un post de un plato que la gente **guarda** para "ir a probarlo" vale mucho más, algorítmicamente, que uno que solo recibe corazones.

### 3. Originalidad y IA

En 2026 Instagram ha reforzado la detección de contenido repostado (marcas de agua de TikTok/CapCut, reposts idénticos) y de contenido generado por IA no transformador, penalizando su alcance en Explorar y Reels aunque mantenga visibilidad ante los seguidores actuales. Ver detalle en [[originality-score.md]].

### 4. Conversación bidireccional (⚠️ estimación / objetivo interno, no confirmado por Meta)

Varias agencias y medios de marketing digital afirman que, desde 2026, las cuentas con las que mantienes intercambios reales (DMs, respuestas a comentarios, reacciones a historias) reciben un impulso algorítmico explícito en Feed e Historias. **No hemos encontrado una declaración pública de Mosseri o Meta que confirme "responder a un DM en menos de 1 hora" (ni ningún otro plazo concreto) como señal directa de ranking.** Lo que sí es sólido y confirmado es el concepto de **cercanía (closeness)** en Historias —basado en con quién interactúas habitualmente, no en la velocidad de respuesta— y el hecho, obvio pero no algorítmico, de que responder rápido convierte mejor: un cliente que pregunta por una reserva y recibe respuesta en minutos tiene muchas más probabilidades de reservar que uno al que se le responde al día siguiente. Trata "responder rápido a DMs y comentarios" como una **SLA de atención al cliente que mejora la conversión en reservas**, no como un hackeo del algoritmo.

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| Engagement rate (sobre seguidores) — sector hostelería/F&B | 1,6% | 2,5%+ | Dash Social, Food & Beverage Industry Benchmarks 2026 |
| Engagement rate (sobre alcance/reach) | 1,9% | 3,5% | Postplanify / Posteverywhere Benchmarks 2026 |
| Engagement rate — hostelería y turismo (Hootsuite) | 2,0% | 3,1%+ | Hootsuite Blog, Instagram Algorithm Tips 2026 |
| Peso de un envío por DM vs. un like (modelo de ranking) | — | ~3-5x más peso | Adam Mosseri (enero 2025), citado en Metricool/Dataslayer |
| Duración óptima de Reel para maximizar engagement | 15-30 s | 5,8% engagement medio (15-30s) vs 3,2% en Reels >90s | Dataslayer, Instagram Algorithm 2026 Guide |

*Nota: estos son benchmarks agregados de fuentes de terceros (no cifras oficiales de Meta). Úsalos como referencia direccional, no como objetivo exacto para tu cuenta.*

## Pasos accionables

1. **Audita tus últimos 12 posts** en Meta Business Suite / Instagram Insights: compara ratio de guardados y compartidos frente a likes. Si los guardados son <0,5% del alcance, tu contenido no está generando suficiente "intención de volver".
2. **Prioriza formatos que generan guardado**: recetas exprés, "cómo llegar/qué pedir", carruseles de menú con precios, Reels de emplatado en cámara lenta.
3. **Responde el 100% de comentarios y DMs cuanto antes** (idealmente <2h): no hay evidencia pública de que exista una "ventana de ranking bidireccional", pero sí hay evidencia clara de que la velocidad de respuesta es el mayor factor de conversión de DM a reserva (ver `../04-benchmarks-kpis/dms-conversions.md`).
4. **No repostees contenido de terceros sin transformación real** (comentario propio, gráficos añadidos, contexto): revisa [[originality-score.md]] antes de reutilizar vídeos de proveedores o de otros locales.
5. **Mide watch time medio y % de repetición en Reels** cada semana usando el Panel Profesional, no solo alcance y likes.
6. **Fija una cadencia de Historias diaria** (mínimo 1-2) para mantener la "cercanía" con tu audiencia habitual — clientes recurrentes son el motor de las reservas.

## Errores comunes

- ❌ **Error**: obsesionarse con el número de "me gusta" como termómetro de éxito.
  ✅ **Solución**: mirar guardados, compartidos por DM y tiempo de visualización como métricas primarias; el like es la señal más débil del modelo de 2026.

- ❌ **Error**: republicar vídeos de proveedores de comida o de otras cuentas con la marca de agua de TikTok/CapCut visible.
  ✅ **Solución**: descargar sin marca de agua, editar en CapCut/Instagram nativo y añadir voz en off, texto o contexto propio antes de publicar.

- ❌ **Error**: publicar y desaparecer, sin responder comentarios ni DMs.
  ✅ **Solución**: bloquear 15-20 minutos tras cada publicación para responder activamente; no hay prueba pública de que esto sea una señal de ranking, pero sí mejora la relación con clientes actuales y la conversión de DM a reserva.

## Recursos relacionados

- [[feed-ranking.md]]
- [[reels-ranking.md]]
- [[stories-ranking.md]]
- [[explore-ranking.md]]
- [[signals-weight-2026.md]]
- [[originality-score.md]]
- [[returning-viewer-rate.md]]
- `../01-estrategia-contenido/reels-strategy.md`
- `../04-benchmarks-kpis/`
- [Dataslayer — Instagram Algorithm 2026: 5 Ranking Signals Mosseri Confirmed](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers)
- [Hootsuite — Instagram algorithm tips for 2026](https://blog.hootsuite.com/instagram-algorithm/)
- [Later — Instagram algorithm in 2026: rank signals for growth](https://later.com/blog/how-instagram-algorithm-works/)
- [Buffer — How the Instagram Algorithm Works: Your 2026 Guide](https://buffer.com/resources/instagram-algorithms/)
- [Dash Social — 2026 Food and Beverage Industry Benchmarks](https://www.dashsocial.com/social-media-benchmarks/food-beverage-industry)

---
*Última actualización: 2026-09-02*
*Fuentes: https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers ; https://blog.hootsuite.com/instagram-algorithm/ ; https://later.com/blog/how-instagram-algorithm-works/ ; https://buffer.com/resources/instagram-algorithms/ ; https://www.dashsocial.com/social-media-benchmarks/food-beverage-industry ; https://postplanify.com/blog/social-media-engagement-rate-benchmarks-2026 ; https://sproutsocial.com/insights/instagram-algorithm/ ; informe interno informes/deep-research-report.md (declaraciones de Adam Mosseri, sección "Instagram en 2026: señales reales y sistema de conversión")*
