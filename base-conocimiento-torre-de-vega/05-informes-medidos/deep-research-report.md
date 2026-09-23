<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Estrategia Deep Research de Instagram para Restaurante Torre de Vega “El Mora” — La Alquería

## Executive Summary

- **La ventaja competitiva más potente de Torre de Vega no es simplemente “buena carne”: es una historia familiar real desde 1980, un especialista en brasa con rostro humano y una cocina casera que todavía se elabora en el propio restaurante.** José Antonio Domínguez asumió el negocio familiar en 2010; la familia participa en cocina, postres y parrilla, y el restaurante combina carnes premium con platos de raíz malagueña como tartar de salchichón, lomo en manteca y cocina tradicional. Esa historia hoy tiene mucho más potencial de Instagram del que se está explotando. citeturn16view2turn16view3

- **El objetivo no debe ser maximizar seguidores, sino “covers reservados atribuibles a Instagram”.** La cuenta debe optimizar una cadena completa: Reel/Carousel → visita al perfil → conversación por DM/WhatsApp → reserva → comensales. El sitio ya facilita la reserva mediante WhatsApp y publica dos teléfonos, de modo que existe una vía de conversión directa que Instagram puede alimentar. citeturn16view0

- **El feed debe pasar de “foto bonita + frase gastronómica” a “contenido que resuelve una decisión o que alguien envía a su acompañante”.** En ejemplos recientes indexados de la cuenta aparecen mensajes como “Para los amantes de la buena carne”, “La calidad se nota en cada plato”, “Déjate caer en la tentación” o preguntas generales sobre carne; son correctamente orientados al producto, pero dejan margen para hooks mucho más específicos: “Este es el corte que pide nuestro parrillero”, “No pidas carne a ciegas”, “La receta familiar que terminó en nuestra carta” o “Mándaselo a quien siempre pide la carne demasiado hecha”. citeturn14search5turn14search16turn14search3turn14search23

- **En ranking, hay que separar hechos de mitos.** Adam Mosseri ha señalado como señales fundamentales el tiempo medio de visualización, likes por reach y sends por reach; los sends tienen especial importancia para alcanzar a personas que todavía no siguen una cuenta. No existe evidencia pública de Meta que establezca “1,7 segundos”, “60% de retención a 3 segundos”, “ER >3%” o “responder en menos de una hora” como umbrales oficiales del algoritmo. Los utilizaremos como objetivos internos de producción/conversión, no como reglas de Meta. citeturn17view12turn15search0

- **El scraping competitivo de siete días debe automatizarse, no simularse con métricas inexistentes.** En la ventana exacta del **27 de agosto al 2 de septiembre de 2026**, la web pública no proporciona un conjunto completo y verificable de posts de todos los competidores con reach, saves, shares y DMs. Insights sí permite estudiar en profundidad la cuenta propia; para competencia, Apify puede capturar datos públicos como posts, timestamps, likes, comments, plays y audio, mientras Instaloader es una alternativa no oficial. Por tanto, este informe no inventa un “Top 10” imposible de verificar: deja preparado el sistema que lo producirá automáticamente cada semana. citeturn15search0turn17view8turn17view10

## Diagnóstico del cliente, competencia y hashtags

Torre de Vega está en **Plaza Santa Ana, 8, Barriada La Alquería, Alhaurín de la Torre**. Su web lo posiciona alrededor de carnes premium a la brasa, cocina casera española y ambiente familiar. Además de la carta regular, mantiene **menú del día de miércoles a viernes con ocho o nueve opciones de entrante y principal**, un activo especialmente interesante para generar frecuencia y visitas en días laborables. citeturn16view0

La carta ofrece muchísimo material editorial: tartar de salchichón de Málaga, lomo en manteca, croquetas de varias elaboraciones, queso azul de cabra de Málaga, carnes maduradas, pulpo XXL a la brasa, pescados y varios postres caseros, incluidas tartas de queso, pistacho y Lotus. Es decir, Instagram no tiene por qué convertirse en una sucesión de filetes: existe suficiente variedad para construir contenido de descubrimiento, educación y conversión durante meses. citeturn16view0turn16view1

Más importante todavía, hay **historias detrás de los platos**. SUR documentó que el restaurante trabaja con diferentes razas y procedencias de vacuno según disponibilidad, que el tartar de salchichón procede de una receta de la suegra de José Antonio y que la familia interviene directamente en el negocio: su madre, su esposa en los postres y su padrino como especialista de parrilla. Esa combinación “producto + persona + procedencia” es una materia prima narrativa extraordinariamente superior a un Reel genérico de carne cortándose. citeturn16view3

**Auditoría de integridad de datos.** Un ranking competitivo que sumase `likes + comments + saves + shares` sería metodológicamente incorrecto: los saves, reach, visitas de perfil, DMs y conversiones no son métricas públicas comparables de competidores. Las herramientas profesionales de Instagram dan Insights sobre el rendimiento del contenido de la propia cuenta; los scrapers de terceros pueden recuperar parte de las métricas públicamente expuestas, pero eso no equivale a los Insights privados del propietario. citeturn15search0turn17view8

| Métrica | Torre de Vega con Insights | Competidor mediante scraping público | Uso recomendado |
|---|---:|---:|---|
| Likes | Sí | Normalmente sí | Secundario |
| Comments | Sí | Normalmente sí | Conversación |
| Reel views/plays | Sí | Frecuentemente | Benchmark de distribución |
| Reach | Sí | No de forma equivalente | Métrica propia |
| Saves | Sí | No fiable/público | Señal propia de intención |
| Sends/shares | Insights propios | Puede aparecer en ciertos outputs de scraper, pero no debe asumirse universal | Priorizar dato propio |
| Profile visits | Sí | No | Funnel propio |
| DMs → reservas | CRM propio | No | KPI de negocio |
| Timestamp | Sí | Sí | Velocidad |
| Caption/hook | Sí | Sí | Análisis creativo |
| Audio | Sí | Frecuentemente sí | Detección de tendencias |

Apify documenta extracción de posts, Reels, hashtags, captions, timestamps y diferentes métricas públicas; su actor específico de hashtags también enumera likes, plays, comments, shares y audio entre los campos que puede obtener cuando Instagram los expone. La disponibilidad real debe validarse en cada ejecución. citeturn17view8

**Benchmark competitivo recomendado.** Como el usuario no proporcionó cuentas concretas, he construido un conjunto que combina competencia directa, aspiracional y de proximidad:

| Benchmark | Tipo de amenaza | Evidencia pública | Qué copiar estratégicamente —no creativamente— |
|---|---|---|---|
| **@asadortitapaqui** | Asador directo, misma área | Se posiciona específicamente en carnes a la brasa y su Instagram supera aproximadamente 5.000 seguidores en el snapshot actual. Ha trabajado campañas de producto alrededor de Wagyu y otras jornadas gastronómicas. citeturn18search8turn18search3turn18search12 | Convertir **un ingrediente/corte en acontecimiento temporal**, en vez de publicar el producto sin contexto. |
| **Sergio Megías Gastrobar** | Competidor aspiracional de experiencia gastronómica | Restaurante de Alhaurín orientado a cocina creativa/mediterránea y a una propuesta con fuerte identidad culinaria del chef. citeturn19search5turn18search1 | Más **persona, explicación y autoría**: el cocinero no debe esconderse detrás del plato. |
| **Venta Purguine** | Competidor hiperlocal/tradicional | También en La Alquería; se presenta como venta familiar, cocina tradicional elaborada en el día y comida “de la abuela”. Además genera contenido de terceros/UGC alrededor de la experiencia. citeturn17view5turn19search6turn19search16 | Apropiarse todavía más del concepto **“esto solo lo encuentras aquí”** y activar UGC local. |
| **Torre de Vega** | Marca a optimizar | Restaurante familiar desde 1980, carne premium + comida casera, menú entre semana, postres caseros y WhatsApp de reserva. citeturn16view0turn16view2 | Combinar las tres ventajas: **especialista + familia + identidad malagueña + conversión inmediata**. |

### Qué revela la cuenta actual

La cuenta pública de Torre de Vega se presenta como restaurante desde 1980 especializado en carnes a la brasa y comida tradicional. El buscador ha indexado recientemente contenido centrado en carne, postre y producto; entre los ejemplos de agosto aparecen un post del 4 de agosto con “Para los amantes de la buena carne”, otro del 12 de agosto alrededor de la tentación del postre, uno del 19 de agosto sobre la tarta de queso y otro del 21 invitando a comentar qué carne elegiría el usuario. citeturn0search5turn14search5turn14search3turn14search14turn14search23

Mi diagnóstico creativo es:

**Lo que ya funciona conceptualmente:** producto apetecible, brasa, carne, postres, llamadas a reservar y una identidad muy clara de asador.

**Lo que falta explotar:** las personas, el conocimiento del parrillero, la familia desde 1980, las decisiones detrás de cada corte, comparaciones, objeciones del cliente, platos específicamente malagueños, situaciones de consumo (“qué pedir si venís cuatro”), disponibilidad real y contenido diseñado expresamente para ser enviado.

El cambio clave es éste:

> **De:** “Mira qué buena está nuestra carne.”  
> **A:** “Mándaselo al amigo que siempre discute contigo sobre el punto de la carne.”

El segundo mensaje contiene producto **y** una razón social para distribuirlo.

### Hashtags a monitorizar

No usaría `#food`, `#foodporn`, `#delicious` ni otros términos globales como pilar de adquisición. Para este negocio conviene construir un grafo mucho más cercano a la intención geográfica y gastronómica:

| Capa | Hashtags semilla |
|---|---|
| Hiperlocal | `#AlhaurinDeLaTorre` `#LaAlqueria` `#ValleDelGuadalhorce` |
| Descubrimiento Málaga | `#RestaurantesMalaga` `#ComerEnMalaga` `#DondeComerMalaga` |
| Especialidad | `#CarneALaBrasa` `#AsadorMalaga` `#CarneMadurada` |
| Cocina local | `#CocinaAndaluza` `#PlatoDeLosMontes` `#TartarDeSalchichon` |
| Producto concreto | `#LomoEnManteca` `#TartaDeQuesoMalaga` `#CroquetasCaseras` |

Recomiendo **cinco a ocho hashtags relevantes por pieza**, cambiándolos según el producto, en vez de pegar el mismo bloque a todos los posts. La ubicación debe aparecer también escrita naturalmente en caption y texto en pantalla: “La Alquería · Alhaurín de la Torre · Málaga”. Eso ayuda a que usuario y buscador entiendan inmediatamente dónde puede consumirse lo que está viendo.

El análisis automático de hashtags no debe ordenar los posts únicamente por likes absolutos. La métrica pública útil será:

\[
\text{Engagement Velocity} =
\frac{\text{likes + comments}}
{\max(\text{horas desde publicación},6)}
\]

y, para comparar cuentas de distinto tamaño:

\[
\text{Public ER} =
\frac{\text{likes + comments}}
{\text{followers}}
\times100
\]

Esto **no sustituye** saves, sends ni reach: es simplemente un proxy competitivo reproducible.

## Instagram en 2026: señales reales y sistema de conversión

El marco más útil para Torre de Vega es separar **ranking**, **atención** y **ventas**.

Adam Mosseri ha explicado que Instagram considera especialmente el **average watch time, likes per reach y sends per reach**. Para contenido mostrado a personas que todavía no siguen una cuenta, los sends son especialmente relevantes frente a los likes. Por eso, para un restaurante local, una pieza que provoca “envíaselo a Juan para ir el sábado” puede tener muchísimo más valor estratégico que una fotografía que recibe likes pasivos. citeturn17view12

Instagram Insights está disponible precisamente para estudiar el rendimiento del contenido y las tendencias de audiencia en cuentas profesionales. citeturn15search0turn15search6

### Qué conservar y qué corregir de los supuestos iniciales

| Supuesto | Decisión para Torre de Vega |
|---|---|
| “60%+ retention en primeros 3 segundos” | **Buen objetivo interno**, pero no es un umbral oficial publicado por Meta. Medirlo y mejorarlo. |
| “Hook exactamente en 1,7 s” | No es una regla oficial. Mejor: **el primer frame ya debe contener la promesa**, sin esperar 1,7 segundos. |
| “ER >3%” | Útil como benchmark operativo; nunca debe sustituir sends, saves, leads ni reservas. |
| “Sends = señal #1” | Reformular: es una de las señales clave y tiene especial peso para distribución a no seguidores. citeturn17view12 |
| “Responder en <1h es señal directa de ranking” | No hay evidencia pública suficiente para afirmarlo como factor directo. **Mantener <1 h como SLA comercial**, porque convierte conversaciones mientras la intención está caliente. |
| “Originality Score” | Trabajar contenido original y nativo, pero no tratar “Originality Score” como una métrica visible oficial. |
| “Geo-tag = señal crítica de ranking” | Usar ubicación sistemáticamente por relevancia local y conversión, pero no prometer un boost algorítmico cuantificado. |
| “Reels 30–90 s” | No forzarlo. Para comida, empezar con 12–30 s y ampliar a 35–60 s cuando la historia realmente lo justifique. |
| “20 slides” | No. Torre de Vega debe trabajar normalmente con **7–10 slides**. |

El principio creativo central será:

**Primer frame → tensión/curiosidad → prueba → recompensa visual → razón para compartir → CTA comercial.**

No:

**Logo → plano exterior → introducción → “hoy os vamos a enseñar...” → producto en segundo 8.**

### Estrategia de formatos

| Formato | Objetivo | Frecuencia | Diseño recomendado |
|---|---|---:|---|
| **Reels** | Descubrimiento local y sends | 2 por semana | 12–30 s en la mayoría; acción/producto desde frame 1; fuego, corte, manos y caras; subtítulos; loop o payoff final. |
| **Carousel** | Consideración, saves, expertise | 1 por semana | 7–10 slides; pregunta/beneficio en cover; educación sobre cortes, procesos y qué pedir; CTA comercial al final. |
| **Stories** | DMs, reservas, ocupación inmediata | Diario Wed–Sun | Menú real, disponibilidad real, encuesta, link de reserva/WhatsApp, repost de cliente, preparación en vivo. |
| **Static** | Social proof excepcional | 0–1 por semana | Solo una foto extraordinaria, UGC fuerte, equipo, evento o información que necesite permanecer visible. |

Esto mantiene la producción sostenible: **tres piezas principales por semana + Stories de baja producción**, en lugar de perseguir volumen por volumen.

### Funnel recomendado

**Reel de descubrimiento**  
→ “Envíalo a tu compañero de carne”

**Perfil**  
→ bio inequívoca: `Brasa + cocina casera · La Alquería · Alhaurín de la Torre · Desde 1980 ↓ Reserva`

**Stories/Highlights**  
→ `Carta | Menú día | Carnes | Postres | Cómo llegar | Reservar`

**DM**  
→ palabra clave: `MESA`

**Respuesta rápida**  
→ `Perfecto. Envíanos día + hora aproximada + nº de personas y comprobamos disponibilidad.`

**Reserva**  
→ WhatsApp/llamada

**Atribución**  
→ marcar `IG Organic` en un registro simple.

La North Star deja así de ser followers y pasa a ser:

\[
\mathbf{Covers\ reservados\ atribuibles\ a\ Instagram/semana}
\]

## Calendario editorial de cuatro semanas

Propongo comenzar el **miércoles 9 de septiembre de 2026** como primera semana completa de ejecución operativa. Los horarios siguientes son **slots iniciales de test**, no falsas conclusiones de reach competitivo: el reach horario de los competidores es privado y no puede verificarse en la auditoría pública. Después de dos semanas deben sustituirse progresivamente por los resultados de Insights propios. Instagram profesional permite estudiar cuándo está activa la audiencia. citeturn15search6

La lógica inicial es publicar alrededor del momento en que el usuario está empezando a pensar en comida/reserva, no cuando ya está sentado en otro restaurante.

| Semana | Día/hora inicial | Asset | Objetivo |
|---|---|---|---|
| Semana A | Mié 12:15 | Reel: **“El corte que elegiría el parrillero”** | Descubrimiento + reservas |
|  | Jue 19:30 | Carousel: **“No pidas carne a ciegas”** | Saves |
|  | Vie Stories | **“Mesa de última hora”** | DMs/reservas |
|  | Sáb 11:30 | Reel: **“1980 → hoy”** | Marca + shares |
| Semana B | Mié 12:15 | Reel: **“Tres puntos de carne”** | Sends/comments |
|  | Vie 19:30 | Reel: **“El tartar que empezó en la familia”** | Producto + local |
|  | Dom 11:30 | Carousel: **“De la selección a la mesa”** | Expertise |
| Semana C | Mié 11:45 | Reel: **“Así decidimos el menú del día”** | Visitas laborables |
|  | Jue 19:30 | Carousel: **“Siete platos para traer a alguien de fuera”** | Saves/shares |
|  | Sáb 11:30 | Reel: **“No todo es carne: pulpo XXL”** | Ampliar público |
|  | Dom Stories | **“Tú eliges el próximo protagonista”** | Conversación |
| Semana D | Mié 19:30 | Reel: **“El postre del ‘yo no quiero nada’”** | Shares |
|  | Vie 13:00 | Carousel: **“Qué pedir según tu plan”** | Decisión + reserva |
|  | Dom 11:30 | Reel: **“Cómo elegimos una pieza antes de la brasa”** | Autoridad + reserva |

**Regla de Stories:** aunque no aparezcan como catorce posts independientes en el calendario, debe haber Stories cada día de apertura: producto real del día, preparación, ambiente, mesa/terraza, pregunta, disponibilidad o social proof. El restaurante ya tiene además una razón recurrente muy clara para Stories de miércoles a viernes: el menú del día. citeturn16view0

## Scripts completos, carousels y prompts visuales

**Reel — “El corte que elegiría nuestro parrillero”**

**Hook, frame 0:**  
`Si nuestro parrillero solo pudiera pedir UN corte hoy… sería éste.`

**Script:**  
0–2 s: primerísimo primer plano de la pieza cruda, mano levantándola.  
2–5 s: sal cayendo en slow motion.  
5–9 s: pieza tocando la parrilla; sonido real del fuego.  
9–13 s: cara/manos del parrillero: `“Por este marmoleo y este grosor.”`  
13–18 s: vuelta en parrilla + llama.  
18–23 s: reposo y corte transversal.  
23–27 s: plato en mesa. Texto: `¿Cuál pedirías tú?`

**CTA:** `Mándaselo a quien compartiría esta pieza contigo. Para mesa: DM “MESA”.`

**Visual:** cámara real, 9:16, 50 mm equivalente en macros, contraluz cálido de la brasa, negros profundos naturales, grasa brillante sin sobresaturación, manos del parrillero visibles, humo real, tres cortes máximo por segundo.

**Hashtags:** `#AlhaurinDeLaTorre #LaAlqueria #CarneALaBrasa #AsadorMalaga #CarneMadurada #RestaurantesMalaga #ValleDelGuadalhorce`

**Slot inicial:** miércoles 12:15.

**Audio:** **audio original de brasa como protagonista** + instrumental que figure como tendencia en la librería de Reels el día de edición a volumen bajo. No seleccionar una canción con semanas de antelación: la tendencia es temporal.

---

**Carousel — “No pidas carne a ciegas”**

**Slide 1:** `No pidas carne a ciegas: la guía rápida de El Mora.`  
Foto: tres cortes reales, cenital parcial.

**Slide 2:** `¿Quieres sabor intenso?`  
Copy: `Busca una pieza con carácter y pregúntanos qué tenemos en cámara hoy.`

**Slide 3:** `¿Prefieres ternura?`  
Copy: `El corte importa tanto como el punto. Cuéntanos cómo te gusta y te orientamos.`

**Slide 4:** `¿Compartís?`  
Copy: `Una pieza al centro cambia completamente la experiencia.`

**Slide 5:** `El marmoleo no está ahí por decoración.`  
Copy corto explicando visualmente infiltración, sin convertir el slide en una clase académica.

**Slide 6:** `El reposo también cocina.`  
Copy: `No se corta nada más salir de la brasa.`

**Slide 7:** `Y el punto importa.`  
Imagen comparativa real de dos o tres puntos.

**Slide 8:** `¿No sabes qué elegir? Ésa es precisamente nuestra parte.`  
Copy: `Dinos cuántos sois y cómo os gusta la carne.`

**Slide 9:** `Guarda esta guía para tu próxima visita.`

**Slide 10:** `La Alquería · Alhaurín de la Torre | Reserva por WhatsApp o DM “MESA”.`

El propio restaurante destaca que trabaja diferentes cortes premium y ayuda al comensal a elegir según preferencias, por lo que este contenido convierte una fortaleza operativa real en contenido guardable. citeturn16view0turn16view3

**Hashtags:** `#CarneALaBrasa #AsadorMalaga #CarneMadurada #AlhaurinDeLaTorre #LaAlqueria #RestaurantesMalaga`

**Slot:** jueves 19:30.

---

**Stories — “Mesa de última hora”**

Solo se publicará cuando la disponibilidad sea **real**.

Frame 1: vídeo de sala/terraza: `¿Sin plan para esta noche?`

Frame 2: `Nos quedan mesas a: [horas reales]`.

Frame 3: plano de la parrilla: `La brasa ya está encendida.`

Frame 4, poll: `¿Carne o pulpo?`

Frame 5: `Pulsa aquí para reservar` + link sticker de WhatsApp/reserva.

Frame 6 opcional: `O responde MESA + personas + hora.`

La web ya dirige reservas a WhatsApp, por lo que Stories debe reducir al mínimo los pasos entre hambre y reserva. citeturn16view0

---

**Reel — “1980 → hoy”**

**Hook:** `Esto no empezó como un restaurante.`

**Script:**  
0–2 s: fotografía histórica/objeto antiguo, zoom sutil.  
2–5 s: `Empezó con la idea de abrir una barra en la feria.`  
5–8 s: `1980.`  
8–12 s: transición a José Antonio actual.  
12–17 s: cocina/brasa/equipo.  
17–22 s: `En 2010 tomó el relevo otra generación.`  
22–27 s: familia trabajando.  
27–31 s: plato servido.  
31–34 s: `46 años después, seguimos cocinando aquí.`

La historia está documentada por el propio restaurante y por SUR: el proyecto nació alrededor de la feria local y se consolidó como negocio familiar; José Antonio asumió la gestión en 2010. citeturn16view2turn16view3

**CTA:** `Envíalo a alguien que conozca “El Mora” de toda la vida. ¿Desde qué año vienes tú?`

**Audio:** voz de José Antonio + música instrumental nostálgica actualmente disponible en Reels.

**Hashtags:** `#AlhaurinDeLaTorre #LaAlqueria #ValleDelGuadalhorce #CocinaAndaluza #RestaurantesMalaga`

**Slot:** sábado 11:30.

---

**Reel — “Tres puntos de carne en veinte segundos”**

**Hook:** `Tres puntos. Una misma carne. ¿Dónde paras tú?`

**Script:** mostrar tres piezas/cortes reales alineados; corte rápido de cada uno.

Texto:  
`1 · Poco hecha`  
`2 · Al punto`  
`3 · Más hecha`

Después, macro transversal de los tres.

Final: `No hay examen. Solo dinos cómo la disfrutas.`

**CTA:** `Envíalo a la persona con la que SIEMPRE discutes el punto de la carne.`

Éste es exactamente el tipo de CTA diseñado para elevar sends en vez de solicitar un like genérico.

**Audio:** cuchillo + tabla + ASMR; música secundaria casi imperceptible.

**Hashtags:** `#CarneALaBrasa #AsadorMalaga #CarneMadurada #AlhaurinDeLaTorre #LaAlqueria #DondeComerMalaga`

**Slot:** miércoles 12:15.

---

**Reel — “El tartar que empezó como receta de familia”**

**Hook:** `Este tartar no empezó en un restaurante.`

0–3 s: producto terminado.  
3–7 s: picado/preparación real.  
7–12 s: ingredientes entrando.  
12–17 s: mezclado.  
17–22 s: emplatado.  
22–26 s: `Una receta familiar acabó convirtiéndose en uno de los platos más reconocibles de la casa.`  
26–30 s: cucharada/bocado.

El tartar de salchichón de Málaga figura actualmente en carta y SUR relata que la elaboración parte de una receta personal de la suegra de José Antonio. citeturn16view1turn16view3

**CTA:** `¿Se lo pondrías delante a alguien sin decirle qué es? Envíale el vídeo.`

**Hashtags:** `#TartarDeSalchichon #AlhaurinDeLaTorre #LaAlqueria #CocinaAndaluza #ComerEnMalaga #RestaurantesMalaga`

**Slot:** viernes 19:30.

---

**Carousel — “De la pieza a la mesa”**

1. `Lo que ocurre ANTES de que veas la carne en tu plato.`  
2. `Selección: no todas las piezas entran.`  
3. `Temperatura: la pieza se prepara antes del fuego.`  
4. `Brasa: calor, distancia y tiempo.`  
5. `Punto: no es cuestión de adivinar.`  
6. `Reposo: la parte que casi nunca ves.`  
7. `Corte: ahora sí.`  
8. `Mesa.`  
9. `Guárdalo para mirar la brasa con otros ojos.`  
10. `Reserva: DM “MESA” · La Alquería.`

El contenido debe grabar **el proceso real utilizado ese día**, evitando inventar tiempos, temperaturas o maduraciones que no correspondan a esa pieza concreta. Torre de Vega sí documenta públicamente una especialización en carnes premium y diferentes razas/procedencias, de modo que el ángulo educativo es auténtico. citeturn16view3

**Slot:** domingo 11:30.

---

**Reel — “Así se decide el menú del día”**

**Hook:** `Mañana no repetimos necesariamente este menú.`

0–3 s: varios platos reales sobre pase.  
3–7 s: pizarra/menú del día.  
7–12 s: cocina preparando primer plato.  
12–17 s: segundo.  
17–21 s: plato servido.  
21–25 s: `Miércoles a viernes. Pregunta hoy qué ha salido de cocina.`

La web actual indica que el menú del día funciona de miércoles a viernes y ofrece ocho o nueve posibilidades de entrada y principal. citeturn16view0

**CTA:** `Escribe MENÚ y te enviamos el de hoy.`

Este CTA es particularmente valioso porque crea un **DM con intención inmediata**, no una interacción ornamental.

**Hashtags:** `#MenuDelDia #AlhaurinDeLaTorre #LaAlqueria #ValleDelGuadalhorce #CocinaCasera #ComerEnMalaga`

**Slot:** miércoles 11:45.

---

**Carousel — “Siete cosas de aquí para enseñarle Málaga a alguien”**

Slide 1: `¿Viene alguien de fuera? Empieza por aquí.`  
Slide 2: `Lomo en manteca` — `Sabor de venta, sin complicarlo.`  
Slide 3: `Tartar de salchichón de Málaga` — `Tradición reinterpretada en casa.`  
Slide 4: `Croquetas caseras` — usar la variedad real disponible.  
Slide 5: `Queso de cabra de Málaga` — solo cuando corresponda al producto servido.  
Slide 6: `Brasa` — `El producto cambia; el fuego permanece.`  
Slide 7: `Un plato tradicional de la casa` — actualizar con disponibilidad.  
Slide 8: `Y sí: hay que dejar sitio para el postre casero.`  
Slide 9: `Guárdalo para la próxima visita.`  
Slide 10: `Mándaselo a quien viene a Málaga y nunca sabe dónde comer.`

Torre de Vega publica en su carta lomo en manteca, tartar de salchichón, queso azul de cabra de Málaga y postres caseros, entre otras elaboraciones. citeturn16view1

**Hashtags:** `#CocinaAndaluza #AlhaurinDeLaTorre #LaAlqueria #TartarDeSalchichon #ComerEnMalaga #ValleDelGuadalhorce #RestaurantesMalaga`

**Slot:** jueves 19:30.

---

**Reel — “No todo es carne”**

**Hook:** `¿Vienes a un asador y NO quieres carne? Mira esto.`

0–2 s: pulpo entrando en la brasa.  
2–6 s: chisporroteo.  
6–11 s: giro.  
11–16 s: corte/textura.  
16–21 s: emplatado.  
21–25 s: plato completo.  
25–28 s: `Ahora dime que solo hacemos carne.`

La carta actual incluye pata de pulpo XXL a la brasa, además de varias alternativas de pescado. citeturn16view0turn16view1

**CTA:** `Mándaselo al amigo que siempre dice “yo carne no”.`

**Hashtags:** `#PulpoALaBrasa #AlhaurinDeLaTorre #LaAlqueria #RestaurantesMalaga #CocinaAndaluza #ComerEnMalaga`

**Slot:** sábado 11:30.

---

**Stories — “Tú eliges”**

Frame 1: dos productos reales: `La semana que viene grabamos UNO.`  
Frame 2 poll: `A: [corte] / B: [postre]`  
Frame 3: `¿Qué quieres que enseñemos?` question sticker.  
Frame 4: captura del resultado.  
Frame 5: `El ganador sale esta semana.`  
Frame 6, después de publicar: `Lo prometido.` + enlace al Reel.

Esta secuencia convierte la producción en conversación y proporciona investigación cualitativa gratuita sobre lo que la audiencia quiere ver.

---

**Reel — “El postre del ‘yo no quiero nada’”**

**Hook:** `“Yo no quiero postre.” Cinco minutos después:`

Plano inmediato de cuchara entrando en tarta.

3–7 s: interior/cremosidad.  
7–11 s: siguiente cucharada.  
11–15 s: reacción humana real.  
15–19 s: plano de varias tartas.  
19–22 s: `¿Clásica, pistacho o Lotus?`

La carta actual publica tarta de queso, pistacho y Lotus entre sus postres caseros. citeturn16view1

**CTA:** `Envíalo a esa persona que “solo quiere probar una cucharadita”.`

**Hashtags:** `#TartaDeQuesoMalaga #PostresCaseros #AlhaurinDeLaTorre #LaAlqueria #RestaurantesMalaga`

**Audio:** diálogo/voz real + sonido de cuchara; audio de tendencia secundario solo si mejora la pieza.

**Slot:** miércoles 19:30.

---

**Carousel — “Qué pedir según el plan”**

Slide 1: `Dime con quién vienes y te digo por dónde empezar.`  
Slide 2: `Cena de dos → un entrante + pieza para compartir + postre.`  
Slide 3: `Familia → platos al centro + opciones para pequeños.`  
Slide 4: `El amigo carnívoro → que pregunte qué piezas tenemos hoy.`  
Slide 5: `El que no quiere carne → pulpo/pescado según disponibilidad.`  
Slide 6: `Comida entre semana → pregunta por el menú del día.`  
Slide 7: `Fan del dulce → no cerréis la cuenta antes de mirar postres.`  
Slide 8: `Grupo → pregunta antes y os ayudamos a organizar la mesa.`  
Slide 9: `Guarda este post antes de venir.`  
Slide 10: `DM “MESA” + día + personas.`

La carta contempla carne, pescado, pulpo, opciones infantiles y postres, y el establecimiento ofrece menú de miércoles a viernes. citeturn16view0turn16view1

**Slot:** viernes 13:00.

---

**Reel — “Antes del fuego”**

**Hook:** `La parte más importante de la brasa ocurre antes de encenderla.`

0–4 s: José Antonio/parrillero observando pieza.  
4–8 s: dedo indicando infiltración.  
8–13 s: plano de etiqueta/procedencia únicamente si se puede mostrar correctamente.  
13–18 s: corte/grosor.  
18–23 s: preparación.  
23–27 s: parrilla.  
27–31 s: plato terminado.

SUR documentó que Torre de Vega trabaja múltiples razas y procedencias y selecciona lo disponible según calidad de mercado. citeturn16view3

**CTA:** `Guárdalo. Y cuando vengas, pregúntanos qué piezas tenemos ese día.`

**Hashtags:** `#CarneMadurada #CarneALaBrasa #AsadorMalaga #AlhaurinDeLaTorre #LaAlqueria #RestaurantesMalaga`

**Slot:** domingo 11:30.

### Prompts de AI para previsualización

Aquí haría una distinción esencial: **AI no debe inventar una comida que después se presente al cliente como la comida real de Torre de Vega.** Para hostelería, la expectativa visual forma parte del producto. Los prompts deben servir para storyboard, tratamiento de fotografía, pruebas de composición o generación basada en una **foto real de El Mora como referencia**, no para sustituir sistemáticamente el plato auténtico.

**Prompt — Hero de brasa**

> Use the supplied real photograph from Restaurante Torre de Vega as the strict visual reference. Preserve the exact cut of meat, portion, plate, grill and restaurant environment. Create a vertical 9:16 cinematic food-photography storyboard, extreme close-up of the real beef touching the charcoal grill, visible natural flame and light smoke, realistic rendered fat and moisture, warm practical firelight, authentic dark grill background, shallow depth of field, 50mm macro look, documentary restaurant photography, subtle motion blur from the cook's hand, no artificial garnish, no additional ingredients, no text, no logos invented, no fantasy food, photorealistic skin and hands, natural imperfections, realistic Spanish steakhouse atmosphere.

**Prompt — Parrillero con identidad humana**

> Using a real reference photograph of Torre de Vega's grill station and the actual staff member, produce a vertical editorial storyboard of the parrillero inspecting a real premium beef cut before cooking. Keep facial identity, clothing, architecture and grill layout faithful to the source image. Eye-level 35mm documentary composition, warm light from the grill balanced with ambient restaurant light, realistic skin texture, hands clearly visible holding the meat, shallow but not extreme depth of field, understated Andalusian family-restaurant aesthetic, no luxury-hotel styling, no invented equipment, no generic chef-stock-photo appearance.

**Prompt — Tartar de salchichón**

> Start from the actual Torre de Vega tartar photograph. Preserve plating, quantities, ingredients and tableware exactly. Create three proposed camera compositions for Instagram: macro 45-degree detail, overhead editorial shot and hand-reaching-for-a-bite lifestyle frame. Soft side window fill combined with warm restaurant practical lighting, natural Málaga restaurant ambience, highly realistic texture, restrained saturation, authentic ceramic and tabletop imperfections, no additional garnish, no imaginary ingredients.

**Prompt — Tarta de queso**

> Reference the real Torre de Vega cheesecake and actual restaurant table. Vertical close-up just as a spoon breaks through the centre of the slice, realistic creamy texture and crumbs, soft warm ambient lighting, 85mm food-photography feel, shallow depth of field, visible human hand for scale, background recognisably from the real restaurant but naturally blurred, no artificial dripping, no oversized portion, no invented toppings.

**Prompt — Historia desde 1980**

> Create a storyboard, not a fake historical photograph. Layout concept for a vertical Instagram Reel combining the restaurant's genuine archival image from its early history with a real current photograph of Torre de Vega. First frame uses the original archive image unaltered; transition concept through a match cut into today's restaurant, maintaining authentic architecture and people. Warm documentary tone, subtle film grain only on the historical source, current section clean and natural, family-business rather than corporate-brand feeling.

**Prompt — Menú del día**

> Use today's real menu and actual dishes as image references. Produce a visual storyboard of a Wednesday-to-Friday lunch Reel: handwritten or printed real menu first, chef plating one actual starter, one actual main, table delivery, guest hand beginning to eat. Natural midday light, vertical 9:16, 35mm documentary restaurant photography, realistic steam, no fake dishes, no invented price, no generic fine-dining styling.

**Prompt — La Alquería / local**

> Based entirely on supplied photographs of the restaurant façade, terrace and surrounding La Alquería setting, create an authentic vertical establishing-shot storyboard that places Torre de Vega geographically without changing the building or surroundings. Late-afternoon natural light, human-scale documentary photography, customers arriving naturally, no fabricated landmarks, no oversized signage, no generic Mediterranean stock imagery.

**Prompt — Carousel “tres puntos”**

> Using photographs of three real cuts cooked by Torre de Vega specifically for the shoot, align the three pieces on the same real cutting board and normalize only camera perspective and exposure. Preserve the real colour and doneness of each piece without artificially increasing redness. 50mm overhead-to-45-degree editorial composition, neutral restaurant lighting, clear visual comparison, ample negative space at the top for later typography, no text generated in-image.

## Benchmarks, medición y rutina semanal

Los benchmarks iniciales del brief —ER >3%, 50 saves, 20 DMs, profile-to-follow >15%— son útiles como aspiración, pero **las ratios deben superar a los absolutos**. Cincuenta saves sobre 2.000 de reach son excelentes; cincuenta sobre 100.000 representan otra cosa completamente distinta.

Instagram Insights proporciona precisamente información de rendimiento de la propia cuenta y debe ser la fuente primaria para esa medición. citeturn15search0turn15search4

| KPI | Objetivo inicial de cuatro semanas | “Winner” operativo | Qué hacer |
|---|---:|---:|---|
| **Booked covers from IG** | Crear baseline primero | ≥1,5× mediana 4 semanas | Ésta es la North Star |
| Average watch time | Mejorar vs mediana previa | ≥1,25× mediana últimos 8 Reels | Repetir hook/estructura |
| Hold primeros 3 s | **≥65% objetivo interno** | ≥75% | Usar ese primer-frame pattern |
| Likes / reach | ≥3% como meta interna | ≥1,5× mediana propia | Señal positiva, no suficiente |
| Sends / reach | ≥0,5–1% inicial | ≥1,5% o 1,5× mediana | Repetir concepto social |
| Saves / reach | ≥1% | ≥2% en educativo | Convertir en serie |
| Saves en Carousel | 20–30 baseline; 50 stretch | ≥1,5× mediana | Duplicar utilidad |
| Profile visits → follows | 10–15% baseline | >15% | Mantener |
| Profile visits → reservation lead | Medir desde semana 1 | Crecimiento sostenido | Mejorar bio/CTA |
| DMs de intención | 10–20/semana tras fase de aprendizaje | >20 | Automatizar respuesta |
| DM → reserva | ≥20–30% como objetivo inicial interno | >35% | Analizar fricción |
| Reach no seguidores | Creciente | ≥1,25× mediana | Repetir discovery content |

Los porcentajes marcados son **objetivos de gestión para El Mora**, no benchmarks oficiales de Instagram.

### El problema del “60% de reach dentro de 5 km”

No usaría `>60% dentro de 5 km` como KPI orgánico principal hasta confirmar que la cuenta puede medir esa variable con suficiente precisión. La interfaz de Insights ofrece información de audiencia y rendimiento, pero un radio orgánico exacto de cinco kilómetros no debe asumirse como métrica estándar disponible. citeturn15search0turn15search6

Lo sustituiría por:

**Reach/seguidores de Alhaurín + localidades próximas**, cuando Insights dé suficiente información geográfica;

**DMs y reservas con procedencia Instagram**;

**clientes que responden “Instagram” al preguntar cómo conocieron el restaurante**;

**WhatsApp clicks + conversaciones**;

**reservas por código/UTM de campaña**.

### Cuadro de conversión obligatorio

Añadir al registro de reservas una columna:

`Fuente`

con valores:

`Instagram organic | Google | Recomendación | Cliente habitual | Otro`

Y una segunda:

`IG asset`

Ejemplo:

`R03_PuntoCarne`

Así se puede descubrir que un Reel con “solo” 8.000 views generó nueve mesas mientras otro con 80.000 views generó cero. **El primero es el verdadero ganador.**

### Rutina semanal de exactamente tres horas

| Día | Tiempo | Acción |
|---|---:|---|
| **Lunes** | 30 min | Revisar dashboard automático y elegir tres piezas: food/product, people/process y consideration/conversion. |
| **Martes o pre-servicio** | 60 min | Batch de grabación: 20–30 clips verticales, cuatro macros, dos caras, dos planos ambiente, un producto estrella. |
| **Miércoles** | 20 min | Comments/DMs + interacción genuina con cuentas/locales de Alhaurín. |
| **Jueves** | 20 min | Comments/DMs + responder Stories relevantes de comunidad/locales. |
| **Viernes** | 20 min | Comments/DMs + Story de disponibilidad real. |
| **Domingo** | 30 min | Review de saves, sends, watch time, profile visits, DMs y reservas; decidir qué formato duplicar. |
| **Total** | **180 min** | **3 horas** |

El objetivo de responder DMs y comentarios importantes en menos de una hora durante ventanas de intención se mantiene como **SLA de atención al cliente**, no como supuesto factor algorítmico confirmado.

La regla de revisión del domingo será:

**Reach bajo + retention baja** → problema de hook/primer frame.

**Retention alta + sends bajos** → entretenido pero no suficientemente compartible.

**Sends altos + profile visits bajos** → fortalecer marca/localización.

**Profile visits altas + reservas bajas** → problema de bio, oferta o fricción de reserva.

**Reservas altas aunque reach sea medio** → **ganador. Repetir.**

## Automatización semanal ejecutable

La arquitectura recomendada es:

**Apify → n8n/Make → Google Sheets/BigQuery → análisis visual/narrativo → tablero de ideas → Instagram Insights → atribución de reservas.**

Apify ofrece actores para perfiles, posts, hashtags, Reels y búsqueda; puede programarse y consumirse mediante API, y exportar JSON, CSV o Excel. Su Search Scraper permite buscar cuentas, hashtags, lugares y Reels populares, con hasta 250 resultados por keyword según la documentación actual. citeturn17view8turn17view9

### Configuración de entrada

Crear una tabla `Config`:

| field | example |
|---|---|
| `timezone` | `Europe/Madrid` |
| `own_account` | `restaurantetorredevega` |
| `competitor_1` | `asadortitapaqui` |
| `competitor_2` | Cuenta oficial verificada de benchmark creativo |
| `competitor_3` | Cuenta/location/UGC de Venta Purguine |
| `hashtag_1` | `alhaurindelatorre` |
| `hashtag_2` | `restaurantesmalaga` |
| `hashtag_3` | `carnealabrasa` |
| `hashtag_4` | `asadormalaga` |
| `hashtag_5` | `valledelguadalhorce` |
| `hashtag_6` | `tartardesalchichon` |

No conviene automatizar un handle dudoso: en el caso de Sergio Megías y Venta Purguine, verificar primero la cuenta oficial actual y conservar también sus location/UGC results. Venta Purguine tiene presencia pública como ubicación de Instagram y contenido generado por terceros, de modo que esa capa es estratégica aunque su owned account no sea el benchmark principal. citeturn18search4turn19search6

### Scraping del lunes

Programar a las **07:00 Europe/Madrid**.

**Job A — perfiles**

Actor: `apify/instagram-scraper` o actor específico de posts.

Recuperar hasta 30–50 publicaciones recientes por cuenta, aunque posteriormente solo se utilicen siete días.

Campos:

```text
username
followersCount
postId
url
timestamp
productType
caption
likesCount
commentsCount
videoViewCount / playCount
videoDuration
audioName / audioId
location
displayUrl / thumbnail
```

Apify documenta extracción y programación de posts/Reels/perfiles, así como disponibilidad de captions, métricas y metadata pública. citeturn17view8

**Job B — hashtags**

Ejecutar el Hashtag Scraper para 6–10 hashtags semilla y solicitar 50–100 resultados por término, según coste y disponibilidad.

El actor específico documenta captions, locations, likes, plays, comments, imágenes, timestamps y audio, además de otros hashtags. citeturn17view8

**Job C — discovery**

Una vez por mes ejecutar Instagram Search Scraper:

`alhaurin carne`  
`restaurante alhaurin`  
`asador malaga`  
`comer alhaurin`  
`carne malaga`

para descubrir competidores y hashtags que todavía no están en Config. El Search Scraper admite usuarios, hashtags, lugares y popular Reels como tipos de búsqueda. citeturn17view9

### Filtro automático de siete días

Ventana:

```text
run_time - 7 days <= timestamp <= run_time
```

Por tanto, una ejecución hoy, **2 de septiembre de 2026**, tomaría desde **26/27 de agosto según hora exacta de ejecución hasta el 2 de septiembre**.

Código base:

```python
import pandas as pd

TZ = "Europe/Madrid"

df["timestamp"] = pd.to_datetime(df["timestamp"], utc=True).dt.tz_convert(TZ)

now = pd.Timestamp.now(tz=TZ)
cutoff = now - pd.Timedelta(days=7)

week = df[df["timestamp"].between(cutoff, now)].copy()

week["age_hours"] = (
    (now - week["timestamp"]).dt.total_seconds() / 3600
).clip(lower=6)

week["public_interactions"] = (
    week["likesCount"].fillna(0)
    + week["commentsCount"].fillna(0)
)

week["public_er_pct"] = (
    week["public_interactions"]
    / week["followersCount"].replace(0, pd.NA)
    * 100
)

week["engagement_velocity"] = (
    week["public_interactions"] / week["age_hours"]
)

top10_by_account = (
    week.sort_values("engagement_velocity", ascending=False)
        .groupby("username", group_keys=False)
        .head(10)
)

top20_hashtags = (
    week.sort_values("engagement_velocity", ascending=False)
        .groupby("sourceHashtag", group_keys=False)
        .head(20)
)
```

**Importante:** llamar a esto `Public Engagement Velocity`, no “true engagement”. Saves, sends y reach de otra empresa no forman parte de este cálculo.

### Análisis automático de hooks

Para cada Reel:

1. Descargar/obtener frame de 0,0 s.
2. Frame 0,8 s.
3. Frame 1,5 s.
4. Frame 3 s.
5. Transcribir primeros cinco segundos.
6. Extraer texto sobreimpreso.

Etiquetas automáticas:

```text
question
contrarian
curiosity_gap
local_reference
price/value
scarcity
comparison
human_face
fire/action
cut/reveal
before_after
educational
story
offer
```

Después calcular la mediana de velocity por etiqueta.

Ejemplo de resultado:

```text
human_face + process:       +42% vs account median
generic plated food:       -18%
comparison hook:            +55%
locality in first frame:    +27%
```

Esos porcentajes **solo aparecerán cuando exista el dataset real**; no se pre-rellenan.

### Análisis visual de hashtags

El modelo visual debe etiquetar:

```text
shot_angle:
  macro / 45-degree / overhead / eye-level / wide

light:
  firelight / daylight / warm-practical / hard-flash / mixed

human_presence:
  none / hand / chef / customer / group

action:
  static / slice / pour / flame / cheese-pull / steam / plating

dominant_subject:
  beef / tapas / seafood / dessert / drink / people / venue

narrative:
  product-proof
  how-it-is-made
  education
  founder/team
  local-identity
  offer/scarcity
  social-proof
```

Después producir automáticamente una tabla:

| Pattern | Nº top posts | Median EV | Median plays/h | Recomendación |
|---|---:|---:|---:|---|
| Macro + fire | auto | auto | auto | test/skip |
| Human + process | auto | auto | auto | test/skip |
| Static plate | auto | auto | auto | test/skip |
| Local story | auto | auto | auto | test/skip |

### Trending audio sin inventar canciones

No incluiría una lista fija de “audios trending septiembre 2026” en un calendario de cuatro semanas porque puede quedarse obsoleta en días.

El lunes, el sistema debe agrupar:

```text
audioId
audioName
number_of_top_posts
median_engagement_velocity
median_plays_per_hour
```

Marcar como candidato cuando:

```text
aparece en >= 2 top-performing posts
AND
median EV > mediana del conjunto
```

Luego, **antes de publicar**, comprobar dentro de Instagram que el audio sigue disponible/licenciado para esa cuenta.

Para Torre de Vega, además, la prioridad debería seguir siendo el sonido auténtico —fuego, cuchillo, parrilla, emplatado y voz humana— cuando éste hace más apetecible el contenido.

### Generación automática de ideas

El prompt semanal al modelo no debe decir “copia los cinco posts ganadores”.

Debe recibir:

```text
TOP HOOK PATTERNS
TOP VISUAL PATTERNS
TOP NARRATIVES
TOP PRODUCTS
TOP AUDIO CLUSTERS
TORRE DE VEGA MENU
TORRE DE VEGA BRAND STORY
LAST 8 POSTS TO AVOID REPETITION
BUSINESS PRIORITY THIS WEEK
```

Y devolver:

```text
2 discovery Reels
1 saveable Carousel
3 Story conversion sequences
5 visual shot lists
5 AI storyboard prompts
```

Restricción interna:

> “Transform the winning mechanism, never copy the competitor's script, wording, shot sequence or distinctive creative.”

### Importar los Insights propios

Cada 24 h, 72 h y siete días, almacenar:

```text
post_id
reach
views
average_watch_time
likes
comments
saves
shares/sends where available
profile_activity
follows
link actions
reservation leads
booked covers
revenue attributed
```

Meta ofrece Insights para cuentas/contenido propios; ésa debe ser la capa de verdad para decisiones internas, no la estimación competitiva. citeturn15search0turn15search4

Tablas recomendadas:

`Raw_Competitor_Posts`  
`Raw_Hashtag_Posts`  
`Ranked_7D`  
`Visual_Patterns`  
`Hook_Patterns`  
`Audio_Trends`  
`Own_Insights`  
`Reservations`  
`Content_Plan`

### Regla automática de winners

A partir de ocho publicaciones propias:

```text
SEND_WINNER =
send_rate >= 1.5 × trailing_8_post_median

SAVE_WINNER =
save_rate >= 1.5 × trailing_8_post_median

WATCH_WINNER =
avg_watch_pct >= 1.25 × trailing_8_post_median

BUSINESS_WINNER =
booked_covers >= 1.5 × trailing_8_post_median
```

Prioridad final:

```text
BUSINESS_WINNER
   > SEND/SAVE WINNER
   > WATCH WINNER
   > LIKE WINNER
   > FOLLOWER GROWTH
```

### Fallback con Instaloader

Instaloader puede utilizarse para descargar imágenes/vídeos, captions y metadata y ofrece acceso programático a perfiles, posts y hashtags. Sin embargo, su propio proyecto aclara que es **independiente, no oficial y no está autorizado ni mantenido por Instagram**; por ello no lo usaría como infraestructura crítica sin monitorización. citeturn17view10turn17view11

La arquitectura recomendada sería:

**Primario:** Apify programado.  
**Fallback:** Instaloader.  
**Verdad de performance propia:** Instagram Insights.  
**Verdad comercial:** sistema de reservas/WhatsApp.

### Ciclo final de aprendizaje

Cada domingo el sistema genera automáticamente:

```text
WHAT WON?
- Best Reel by sends/reach
- Best Reel by watch time
- Best Carousel by saves/reach
- Best post by profile visits
- Best asset by booked covers

WHY?
- Hook
- First frame
- Subject
- Human presence
- Narrative
- CTA
- Timing
- Audio

WHAT TO DO NEXT?
- 2 patterns to repeat
- 1 pattern to stop
- 1 new hypothesis
```

El resultado buscado después de cuatro semanas no es “hemos publicado catorce veces”. Es haber descubierto, con datos de Torre de Vega, algo parecido a:

> **“Los Reels con José Antonio explicando un corte generan 2,1× más sends que las tomas puramente gastronómicas; los Carousels de elección generan 1,8× más saves; los Stories del menú del día convierten mejor a WhatsApp los miércoles; y el CTA `MESA + día + personas` produce más reservas que `link en bio`.”**

En ese momento la estrategia deja de ser una colección de buenas prácticas de Instagram y se convierte en un **sistema propietario de adquisición local para Torre de Vega**.