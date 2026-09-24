> **Origen:** `torre_de_vega/instagram-skill-hosteleria/08-casos-estudio/torre-de-vega-alhaurin.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Caso real en ejecución: Restaurante Torre de Vega "El Mora" (Alhaurín de la Torre, Málaga)

> **Caso real en ejecución — no es un caso ilustrativo.** A diferencia de los otros tres archivos de esta carpeta (`restaurante-malaga.md`, `cocteleria-sevilla.md`, `pizzeria-valencia.md`), que son composites didácticos sin nombre propio verificado, este caso corresponde a un negocio real, con nombre y ubicación reales: asador Torre de Vega, también conocido como "El Mora", en Plaza Santa Ana 8, Barriada La Alquería, Alhaurín de la Torre (Málaga). La estrategia documentada aquí procede de un informe interno de deep research (`informes/deep-research-report.md`, 2026-09-02) y su primera semana completa de ejecución arranca el **miércoles 9 de septiembre de 2026**. En el momento de escribir este archivo la campaña **todavía no ha corrido**, por lo que no existen resultados que reportar.
>
> **[PENDIENTE: actualizar con resultados tras la ejecución]** — revisar y completar este archivo con métricas reales de Instagram Insights y con el registro de reservas atribuidas, a partir de las primeras 2-4 semanas de publicación (aprox. desde finales de septiembre de 2026).

## TL;DR

- La ventaja competitiva real de Torre de Vega no es "buena carne": es una historia familiar auténtica desde 1980 (José Antonio Domínguez tomó el relevo en 2010, con su madre, su esposa y su padrino implicados en cocina, postres y parrilla), combinada con carnes premium, cocina casera malagueña (tartar de salchichón de receta familiar, lomo en manteca) y un menú del día de miércoles a viernes ya asentado, con reserva por WhatsApp.
- El cambio de mensaje central del plan es pasar de "Mira qué buena está nuestra carne" a "Mándaselo al amigo que siempre discute contigo sobre el punto de la carne": el segundo hook añade una razón social para reenviar el contenido, no solo para admirarlo.
- La North Star del plan no son los seguidores, sino los **covers reservados atribuibles a Instagram/semana**, medidos con una columna de `Fuente` y `IG asset` en el propio registro de reservas.
- El informe distingue rigurosamente entre lo que da Instagram Insights (propio, privado: reach, saves, sends, profile visits, DMs) y lo que puede obtenerse por scraping público de competidores (likes, comments, views, timestamps, audio) — y descarta explícitamente un ranking competitivo que sume métricas no comparables entre sí.
- La automatización semanal (Apify → n8n/Make → Sheets → Insights → atribución de reservas) y la rutina de 3 horas/semana son la parte más transferible del caso: cualquier cliente de hostelería de este KB puede adoptar el mismo esqueleto operativo.

## Diagnóstico y contexto

Torre de Vega es un asador familiar en La Alquería, Alhaurín de la Torre, con carta centrada en carnes premium a la brasa y cocina casera española, más un **menú del día de miércoles a viernes** con ocho o nueve opciones de entrante y principal. La reserva ya funciona por WhatsApp, con dos teléfonos publicados, lo que da al negocio una vía de conversión directa que Instagram puede alimentar sin fricción añadida.

La carta ofrece bastante más que filetes: tartar de salchichón de Málaga (receta que, según documentó el diario SUR, procede de la suegra de José Antonio), lomo en manteca, croquetas caseras, queso azul de cabra de Málaga, pulpo XXL a la brasa, pescados y postres caseros (tartas de queso, pistacho y Lotus). Esto da margen editorial para meses de contenido sin repetir "otro plano de carne".

Lo más relevante del diagnóstico es la combinación **"producto + persona + procedencia"**: el negocio nació alrededor de una barra de feria en 1980, José Antonio asumió la gestión en 2010, y hoy la familia interviene directamente — madre, esposa (postres) y padrino (parrilla). Esa historia está documentada públicamente (SUR) pero está muy infraexplotada frente al contenido genérico de producto que la cuenta viene publicando (ejemplos indexados: "Para los amantes de la buena carne", "La calidad se nota en cada plato", "Déjate caer en la tentación"). Correctos, pero sin gancho específico ni razón de reenvío.

**Diagnóstico creativo del informe:**
- Lo que ya funciona: producto apetecible, identidad de asador clara, llamadas a reservar.
- Lo que falta explotar: las personas, el conocimiento del parrillero, la familia desde 1980, las decisiones detrás de cada corte, objeciones del cliente, situaciones de consumo ("qué pedir si venís cuatro"), y contenido diseñado expresamente para ser **enviado**, no solo admirado.

## Metodología aplicada

### El cambio de mensaje central

> **De:** "Mira qué buena está nuestra carne."
> **A:** "Mándaselo al amigo que siempre discute contigo sobre el punto de la carne."

El segundo mensaje conserva el producto pero añade una razón social explícita para compartir, alineado con el peso que Adam Mosseri atribuye a los sends per reach como señal de distribución a no seguidores (ver [[../00-algoritmo/signals-weight-2026.md]]).

### Auditoría de integridad de datos (principio transferible)

El informe es explícito en que un ranking competitivo que sume `likes + comments + saves + shares` de cuentas ajenas es **metodológicamente inválido**: saves, reach, visitas de perfil y DMs no son métricas públicas comparables fuera de la cuenta propia. Instagram Insights da esa profundidad solo sobre la cuenta gestionada; el scraping público (vía Apify o similar) recupera de forma razonablemente fiable likes, comments, views/plays, timestamps, captions y audio — pero no saves, reach real, profile visits ni DMs.

| Métrica | Torre de Vega vía Insights | Competidor vía scraping público | Uso recomendado |
|---|---|---|---|
| Likes / Comments | Sí | Normalmente sí | Secundario / conversación |
| Reel views / plays | Sí | Frecuentemente | Benchmark de distribución |
| Reach | Sí | No equivalente | Métrica propia |
| Saves | Sí | No fiable/público | Señal propia de intención |
| Sends / shares | Sí (Insights) | No debe asumirse universal | Priorizar dato propio |
| Profile visits, DMs → reservas | Sí (Insights + CRM) | No | Funnel y KPI de negocio |
| Timestamp, caption, audio | Sí | Sí | Velocidad y análisis creativo |

Como proxy competitivo reproducible (no sustituto de saves/sends/reach), el informe define una **Engagement Velocity** pública:

\[ \text{EV} = \frac{\text{likes + comments}}{\max(\text{horas desde publicación}, 6)} \]

y un **Public ER** para comparar cuentas de distinto tamaño: `(likes + comments) / followers × 100`.

### Benchmarking competitivo: tipo de amenaza y qué copiar

El informe seleccionó tres referencias reales, cada una representando un tipo de competidor transferible a otros clientes de hostelería:

| Benchmark | Tipo | Qué copiar estratégicamente (no creativamente) |
|---|---|---|
| Asador directo de la misma zona | Competencia directa | Convertir un ingrediente/corte en acontecimiento temporal, en vez de publicar producto sin contexto. |
| Gastro-bar de cocina creativa | Competidor aspiracional | Más persona, explicación y autoría — el cocinero no debe esconderse detrás del plato. |
| Venta tradicional hiperlocal, misma barriada | Competencia hiperlocal | Reforzar "esto solo lo encuentras aquí" y activar UGC local. |

Este patrón — un competidor directo, uno aspiracional y uno hiperlocal — es reutilizable como plantilla de benchmarking para cualquier negocio de hostelería del KB, incluso sin cifras verificadas: lo que se transfiere es el mecanismo ganador de cada tipo, nunca el guion ni la secuencia de plano exactos.

### North Star: covers reservados, no seguidores

El funnel propuesto es: Reel/Carousel → visita al perfil → DM/WhatsApp ("MESA" + día + personas) → reserva → comensales. La métrica de negocio que ordena todo lo demás es:

\[ \textbf{Covers reservados atribuibles a Instagram / semana} \]

Esto se mide añadiendo al registro de reservas una columna `Fuente` (`Instagram organic | Google | Recomendación | Cliente habitual | Otro`) y una columna `IG asset` (p. ej. `R03_PuntoCarne`), lo que permite descubrir, por ejemplo, que un Reel con pocas views generó más mesas que otro con muchas más — el primero sería el ganador real, no el de mayor alcance. Ver [[../04-benchmarks-kpis/dms-conversions.md]] y [[../04-benchmarks-kpis/profile-visit-funnel.md]] para el marco general de funnel.

## Calendario y piezas de contenido

Arranque: **miércoles 9 de septiembre de 2026**, con horarios iniciales tratados como slots de test (no como conclusiones de reach competitivo, que es privado e inverificable). El ritmo sostenible es de **2 Reels + 1 Carousel/semana + Stories diarias en días de apertura**, con foco especial de miércoles a viernes por el menú del día.

Ejemplos representativos del calendario de 4 semanas (ver informe completo para el detalle día a día):

- **Reel "El corte que elegiría el parrillero"** — descubrimiento + reservas; primer plano de la pieza, sal cayendo, voz del parrillero explicando marmoleo y grosor, CTA de envío ("Mándaselo a quien compartiría esta pieza contigo").
- **Carousel "No pidas carne a ciegas"** — guía de 7-10 slides sobre marmoleo, punto y reposo, cerrando con CTA de guardado y reserva.
- **Reel "1980 → hoy"** — la historia familiar documentada por SUR, desde la barra de feria hasta el relevo generacional de 2010, con CTA "Envíalo a alguien que conozca 'El Mora' de toda la vida".
- **Reel "Tres puntos de carne en veinte segundos"** — comparación visual con CTA explícito de sends: "Envíalo a la persona con la que SIEMPRE discutes el punto de la carne."
- **Reel "Así se decide el menú del día"** — activa el DM con intención directa: "Escribe MENÚ y te enviamos el de hoy."
- **Stories "Mesa de última hora"** — solo cuando hay disponibilidad real, con sticker de reserva vía WhatsApp.

Reglas de formato explícitas: Reels de 12-30 s (no forzar 30-90 s), carousels de 7-10 slides (no 20), primer frame con la promesa ya visible (no "hook a los 1,7 s" como regla oficial, que el informe descarta como mito — ver más abajo). Para la librería completa de hooks y estructuras, ver [[../01-estrategia-contenido/hooks-library.md]] y [[../01-estrategia-contenido/reels-strategy.md]].

### Mitos descartados explícitamente

El informe distingue con cuidado señal confirmada de suposición sin evidencia pública, citando declaraciones de Adam Mosseri sobre average watch time, likes per reach y sends per reach como señales reales:

| Supuesto del brief inicial | Tratamiento en el plan |
|---|---|
| "Retención 60%+ en 3 segundos" es umbral oficial de Meta | No confirmado; se usa como objetivo interno de producción. |
| "Hook exactamente en 1,7 s" | No es regla oficial; el primer frame debe contener la promesa, sin cronómetro fijo. |
| "Responder en <1h es señal de ranking" | Sin evidencia pública directa; se mantiene como SLA comercial, no como factor algorítmico. |
| "Geo-tag = boost de ranking cuantificado" | Se usa por relevancia local y conversión, no se promete boost. |
| "Sends = señal única" | Reformulado: una de las señales clave, con peso especial para alcanzar no seguidores. |

Ver [[../00-algoritmo/signals-weight-2026.md]] y [[../00-algoritmo/reels-ranking.md]] para el marco completo de qué está confirmado y qué no.

## Automatización y medición

Arquitectura propuesta: **Apify → n8n/Make → Google Sheets/BigQuery → análisis visual/narrativo → Instagram Insights → atribución de reservas**, con Instaloader como fallback no oficial (nunca como infraestructura crítica sin monitorización).

- **Lunes 07:00 (Europe/Madrid)**: scraping de perfiles de competidores (Job A), hashtags semilla (Job B) y, mensualmente, discovery de nuevos competidores/hashtags (Job C).
- **Filtro de ventana de 7 días** sobre los datos scrapeados, con cálculo de `Public Engagement Velocity` (nunca llamado "true engagement", precisamente porque excluye saves/sends/reach ajenos).
- **Análisis automático de hooks y patrones visuales** de los posts top, etiquetados por tipo de hook, ángulo, luz, presencia humana y narrativa.
- **Reglas de "winner"** jerarquizadas: `BUSINESS_WINNER` (covers) > `SEND/SAVE_WINNER` > `WATCH_WINNER` > `LIKE_WINNER` > crecimiento de seguidores — el orden en sí es el principio transferible.

**Rutina semanal de exactamente 3 horas**, reutilizable como plantilla operativa para cualquier cliente de hostelería con recursos limitados:

| Día | Tiempo | Acción |
|---|---:|---|
| Lunes | 30 min | Revisar dashboard y elegir 3 piezas (producto, personas/proceso, conversión). |
| Martes/pre-servicio | 60 min | Batch de grabación: 20-30 clips verticales. |
| Miércoles-viernes | 20 min/día | Comments/DMs + interacción con comunidad local. |
| Domingo | 30 min | Review de saves, sends, watch time, profile visits, DMs, reservas; decidir qué duplicar. |

**Ciclo de aprendizaje del domingo** (WHAT WON / WHY / WHAT NEXT): identifica el mejor Reel por sends/reach, el mejor por watch time, el mejor Carousel por saves/reach y el mejor asset por covers reservados; documenta por qué (hook, primer frame, sujeto, presencia humana, narrativa, CTA, timing, audio); y decide 2 patrones a repetir, 1 a abandonar y 1 hipótesis nueva. Ver [[../06-workflows-automatizacion/analytics-review.md]] y [[../06-workflows-automatizacion/weekly-content-research.md]] para el detalle de workflow.

## Lo transferible a otros negocios de hostelería

Este caso es el más completo del KB precisamente porque encadena, en un único negocio real, casi todos los principios metodológicos dispersos en el resto de carpetas. Lo reutilizable para cualquier otro cliente:

1. **Empezar por la ventaja narrativa, no por el producto.** La pregunta de diagnóstico inicial para cualquier negocio de hostelería debería ser: ¿cuál es nuestra ventaja narrativa real — historia, persona, procedencia — más allá de "nuestro producto es bueno"? Casi todo negocio de hostelería tiene una historia infraexplotada equivalente a la de Torre de Vega.
2. **Rediseñar el CTA en clave de sends, no de likes.** El patrón "[producto] + razón social para reenviarlo a alguien concreto" (el amigo que discute el punto de la carne, el que dice "yo carne no", el que "solo quiere probar una cucharadita") es aplicable a cualquier vertical de hostelería.
3. **El principio de integridad de datos es universal.** Ningún cliente de este KB debería recibir un "ranking competitivo" que mezcle métricas privadas propias con métricas públicas de terceros como si fueran comparables. Separar siempre "lo que sé de mi cuenta" de "lo que puedo inferir públicamente de la competencia".
4. **La North Star de negocio, no de vanidad.** Reemplazar seguidores por la métrica de conversión real del negocio (covers, reservas, tickets) y construir la columna de atribución en el propio sistema de reservas desde el primer día, no a posteriori.
5. **El patrón de benchmarking triple (directo / aspiracional / hiperlocal)** es una plantilla reutilizable cuando el cliente no aporta cuentas de referencia propias.
6. **Separar mito de señal confirmada.** Cualquier cifra tipo "regla del algoritmo" que aparezca en un brief de cliente debe contrastarse contra lo que Meta/Mosseri ha confirmado públicamente antes de convertirla en objetivo operativo — y aun así, tratarla como objetivo interno, no como verdad de plataforma.
7. **La rutina de 3 horas/semana y el ciclo WHAT WON/WHY/WHAT NEXT** son el esqueleto operativo mínimo viable para un negocio de hostelería sin equipo de marketing dedicado.

## Recursos relacionados

- [[README.md]]
- [[restaurante-malaga.md]]
- [[cocteleria-sevilla.md]]
- [[pizzeria-valencia.md]]
- [[failures-lessons.md]]
- [[../00-algoritmo/signals-weight-2026.md]]
- [[../00-algoritmo/reels-ranking.md]]
- [[../01-estrategia-contenido/hooks-library.md]]
- [[../01-estrategia-contenido/reels-strategy.md]]
- [[../01-estrategia-contenido/cta-library.md]]
- [[../04-benchmarks-kpis/dms-conversions.md]]
- [[../04-benchmarks-kpis/profile-visit-funnel.md]]
- [[../06-workflows-automatizacion/analytics-review.md]]
- [[../06-workflows-automatizacion/weekly-content-research.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: informe interno `informes/deep-research-report.md` (2026-09-02), citando declaraciones públicas de Adam Mosseri y fuentes periodísticas (Diario SUR) sobre la historia del restaurante.*
