> **Origen:** `torre_de_vega/instagram-skill-hosteleria/00-algoritmo/signals-weight-2026.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Peso relativo de las señales de ranking en Instagram (2026)

## TL;DR

- No existe una fórmula pública exacta ("guardado = X puntos"), pero desde 2025-2026 Adam Mosseri y varias fuentes de marketing digital han dado suficientes referencias cualitativas y cuantitativas parciales para construir un **orden de magnitud fiable**.
- El orden de importancia confirmado por Mosseri es: **tiempo de visualización > envíos por alcance (sends) > likes por alcance**, con los envíos pesando especialmente más que los likes para alcance no conectado (Explorar/no seguidores) — Mosseri no ha dado un multiplicador exacto público; el "3-5x" que verás en la tabla es una estimación de agregadores de marketing, no una cifra de Meta.
- ⚠️ Distingue siempre, fila por fila: las filas marcadas "Adam Mosseri" en la columna Fuente son las únicas confirmadas por declaraciones públicas directas; el resto (Socialboost, Coruzant, PetaPixel, etc.) son interpretaciones o estimaciones de terceros — útiles como objetivo interno de gestión, nunca como umbral oficial.
- Los **guardados** son, según múltiples fuentes de 2026, la segunda señal de "alta confianza" tras los envíos — con estimaciones que sitúan un guardado en torno a 10 veces el peso de un like en el modelo de ranking (cifra de agregadores de marketing, no confirmada oficialmente por Meta).
- Los **comentarios sustanciales** (varias palabras, no solo emojis) pesan más que un like simple, pero menos que un guardado o un envío.
- El **like** sigue siendo una señal válida, pero es la más "barata" de emitir y por tanto la de menor peso relativo en 2026.

## Conceptos fundamentales

### Por qué el orden ha cambiado desde 2020-2023

Durante años, el like fue percibido (correcta o incorrectamente) como la métrica central. Desde que Mosseri empezó a explicar el sistema con más detalle (2022 en adelante) y sobre todo desde sus confirmaciones de enero de 2025, ha quedado claro que Instagram pondera mucho más las acciones que implican **coste cognitivo o social** para el usuario: guardar algo para volver a verlo, o enviárselo activamente a otra persona, son decisiones más deliberadas que un doble toque reflejo.

### Distribución conectada vs. no conectada

Un matiz importante: el peso de cada señal cambia según a quién se le vaya a mostrar el contenido:

- **Alcance conectado** (tus seguidores, en Feed/Historias): los **likes por alcance** tienen más peso relativo, porque reflejan si a la gente que ya te conoce le sigue gustando lo que publicas.
- **Alcance no conectado** (gente que no te sigue, en Explorar/Reels): los **envíos por alcance** son la señal dominante, porque funcionan como un "voto de confianza" de un desconocido hacia otro desconocido.

### La jerarquía de esfuerzo del usuario

Una forma útil de entender el peso relativo es pensar en el esfuerzo que cada acción exige al usuario:

- Ver 1 segundo y seguir scrolleando → señal negativa débil (skip).
- Dar like → esfuerzo mínimo, señal positiva débil.
- Comentar con una palabra o emoji → señal positiva débil-media.
- Comentar con una frase → señal positiva media.
- Visitar el perfil tras ver el contenido → señal positiva media-alta.
- Guardar → señal positiva alta (intención de volver).
- Compartir por DM / Historia → señal positiva muy alta (recomendación activa a un tercero).
- Ver el contenido completo y repetirlo (Reels) → señal positiva muy alta de calidad/retención.

## Datos y benchmarks 2026 — Tabla comparativa de peso de señales

| Señal | Peso relativo aproximado (referencia) | Tipo de alcance donde más pesa | Fuente |
|---|---|---|---|
| Tiempo de visualización total + repetición (Reels) | Señal #1, "la más importante" según Mosseri | Ambos (conectado y no conectado) | Adam Mosseri (ene. 2025), vía Dataslayer/SocialPilot |
| Envíos por alcance (DM / compartir) | ~3-5x el peso de un like; estimación puntual de ~15x en un modelo citado | No conectado (Explorar, descubrimiento) | Adam Mosseri (ene. 2025); Metricool (abr. 2026), vía Dataslayer |
| Guardados | ~10x el peso de un like (estimación de agregador, no oficial) | Ambos, especialmente Explorar | Socialboost, "Why Saves Beat Likes on Instagram in 2026" |
| Comentarios sustanciales (frase completa) | Mayor peso que un like simple; menor que guardado/envío | Feed (relación) | Sprout Social / Later, Instagram Algorithm 2026 |
| Comentarios cortos / solo emoji | Peso bajo-medio | Feed | Estimación cualitativa agregada |
| Likes por alcance | Señal #3 en el orden de Mosseri; señal más débil del conjunto "de calidad" | Conectado (seguidores) | Adam Mosseri (ene. 2025) |
| Visitas al perfil tras ver contenido | Señal media-alta, indica interés genuino | Ambos | Sprout Social, Instagram Algorithm 2026 |
| Conversación bidireccional (DM/comentarios recíprocos) | ⚠️ No confirmado por Mosseri como señal de ranking directa — sí confirmado el concepto de cercanía (closeness) en Historias/Feed, sin plazo de respuesta oficial | Feed e Historias | Dataslayer / Coruzant, Instagram Algorithm 2026 (interpretación de terceros) |
| Originalidad / provenance del contenido | ⚠️ Meta sí penaliza reposts/marcas de agua/contenido no transformado (documentado por prensa especializada), pero no existe un "Originality Score" oficial, público y con ese nombre — ver [[originality-score.md]] | No conectado (Explorar, Reels recomendados) | PetaPixel / Disrupt Marketing, abr. 2026 (interpretación de terceros) |

*Importante: Meta no publica una tabla de pesos numéricos oficial. Las cifras "3-5x", "~10x", "~15x" citadas arriba proceden de interpretaciones y estimaciones de terceros (agencias, herramientas de analítica) basadas en declaraciones de Mosseri y pruebas empíricas propias, no de un documento técnico de Meta. Úsalas como jerarquía direccional, nunca como fórmula exacta para calcular "puntuación" de un post.*

## Pasos accionables

1. **Prioriza el diseño de contenido para watch time y guardado** antes que para likes: pregúntate "¿esto hace que alguien se quede mirando o quiera guardarlo?" antes de "¿esto es bonito?".
2. **Incluye siempre un motivo explícito para compartir** en el caption o en el propio vídeo ("etiqueta a...", "envíaselo a...") — es la palanca más directa sobre la señal de mayor peso para alcance no conectado.
3. **Diseña contenido "de consulta"** (listas, guías, menús, recetas) pensado para ser guardado y revisado más tarde, no solo consumido una vez.
4. **Fomenta comentarios largos, no solo reacciones**: pregunta algo que requiera una respuesta elaborada ("¿qué maridarías con este plato?") en lugar de un simple "¿os gusta? 👍".
5. **No optimices para likes de forma aislada**: campañas de "dale like si..." generan la señal más débil del sistema y no mueven la aguja del alcance en Explorar.
6. **Cruza este documento con [[originality-score.md]] y [[returning-viewer-rate.md]]** antes de planificar contenido: la originalidad actúa como filtro previo, y el retorno de espectadores como validación posterior de calidad sostenida.

## Ejemplos reales

*Ejemplo ilustrativo:* comparar dos publicaciones de un mismo local: (A) una foto de plato con caption "¡Delicioso! 😋" que recibe 200 likes y 3 comentarios; (B) un Reel de 20 segundos mostrando el proceso de emplatado con caption "guárdalo para tu próxima cena especial" que recibe 80 likes pero 45 guardados y 12 envíos por DM. Según el modelo de pesos descrito arriba, la publicación B tiene mayor probabilidad de ranking en Explorar y en el Feed de no seguidores, a pesar de tener menos likes en términos absolutos — este es el cambio de paradigma central del algoritmo 2025-2026.

## Errores comunes

- ❌ **Error**: reportar el éxito de una campaña solo en "likes totales" o "seguidores ganados".
  ✅ **Solución**: incluir guardados, compartidos por DM y watch time medio como KPIs primarios en cualquier informe de rendimiento (ver `../04-benchmarks-kpis/`).

- ❌ **Error**: comprar interacción (likes o comentarios falsos) pensando que mejora el ranking.
  ✅ **Solución**: la interacción falsa no genera guardados ni envíos reales, y además puede dañar la relación de "calidad de audiencia" que el algoritmo también evalúa indirectamente.

- ❌ **Error**: asumir que todas las señales pesan igual en todas las superficies.
  ✅ **Solución**: adaptar el objetivo de cada pieza de contenido: si buscas fidelizar clientes existentes, prioriza señales de Feed/Historias (relación, comentarios); si buscas clientes nuevos, prioriza señales de Explorar/Reels (guardados, envíos, watch time).

## Recursos relacionados

- [[README.md]]
- [[feed-ranking.md]]
- [[reels-ranking.md]]
- [[explore-ranking.md]]
- [[originality-score.md]]
- [[returning-viewer-rate.md]]
- `../04-benchmarks-kpis/`
- [Dataslayer — Instagram Algorithm 2026: 5 Ranking Signals Mosseri Confirmed](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers)
- [Socialboost — Why Saves Beat Likes on Instagram in 2026](https://socialboost.co/blog/blog-saves-beat-likes-instagram-2026)
- [Socialync — Adam Mosseri on Shares: The Real Instagram Signal in 2026](https://www.socialync.io/blog/adam-mosseri-shares-instagram-algorithm-2026)
- [Coruzant — How the Instagram Algorithm Works in 2026: Signals, Surfaces](https://coruzant.com/analytics/instagram-algorithm-2026-guide/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers ; https://socialboost.co/blog/blog-saves-beat-likes-instagram-2026 ; https://www.socialync.io/blog/adam-mosseri-shares-instagram-algorithm-2026 ; https://coruzant.com/analytics/instagram-algorithm-2026-guide/ ; https://sproutsocial.com/insights/instagram-algorithm/ ; informe interno informes/deep-research-report.md (declaraciones de Adam Mosseri, sección "Instagram en 2026: señales reales y sistema de conversión")*
