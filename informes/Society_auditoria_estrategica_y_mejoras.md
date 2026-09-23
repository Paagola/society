<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../README.md).

# Society

## Auditoría estratégica: qué falta para que los restaurantes ganen visitas, seguidores y clientes reales

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 14 de septiembre de 2026 · actualizado el 15 de septiembre de 2026

## 1 Resumen ejecutivo

> **Actualización del 15 de septiembre de 2026.** Después de esta auditoría se decidió que:
>
> - Society es un proyecto propio para toda la hostelería, con posible venta desde enero de 2027.
> - Hasta entonces, el desarrollo se centra en contenido para redes.
> - La oferta tiene tres planes acumulativos: **plan 1**, barato, de ficha de Google y SEO local; **plan 2**, el plan 1 más redes centradas en historias y posts y gestión de otros sitios como TripAdvisor; **plan 3**, el plan 2 más reels.
>
> La auditoría sigue valiendo como mapa de huecos. El plan 1 cubre la capa de Google y reseñas que aquí se señala como prioritaria, y el plan 2 incorpora la coherencia en otras plataformas. Se han ajustado las secciones 9.2, 10.2, 12 y 13. Torre de Vega aparece solo como ejemplo.

Society está bien diseñado como **sistema de producción audiovisual**, y desde el informe de estrategia de redes tiene también un ciclo de planificación y medición en Instagram. Pero la promesa del proyecto es mayor: sustituir o complementar a una agencia de marketing para que un restaurante **consiga clientes**. Con esa vara, la cobertura actual es parcial.

**El contenido de redes es un eslabón, y en España no es el que más decide.** En el primer informe de TheFork lab (más de 6.000 usuarios, julio de 2026), el 59 % señala las opiniones de otros clientes como el factor que más influye al reservar, el 62 % descarta un restaurante por malas reseñas, el 75 % consulta la carta y el 73 % las opiniones antes de reservar. Las redes sociales, la prensa y las guías solo son el factor principal para el 2 %. [R1] Instagram tiene un 77 % de penetración en España y un 44 % de usuarios dice que las redes influyen en sus compras [R2]: sirve para descubrir y recordar, pero la decisión se valida en Google, en las reseñas y en la carta.

**De 17 campos estratégicos de una agencia de hostelería, Society cubre en diseño 2, parcialmente 7 y no contempla 8.** Los ausentes son precisamente los que convierten atención en visitas: diagnóstico inicial, ficha de Google y Maps, reseñas y reputación, plataformas y coherencia de datos, atención conversacional, fidelización, publicidad local y redes distintas de Instagram. La paradoja es que **la agencia ya hace buena parte de ese trabajo a mano** con Torre de Vega (informes 00 a 08: expediente digital, competencia, NAP, rastreadores, legal, prensa, SEO y búsqueda con IA), pero Society no lo recoge como producto.

**Vulnerabilidades principales:**

1. La promesa se mide en entregables (reels, imágenes), no en clientes. Es la receta de una cancelación a los tres meses.
2. Dependencia de un solo canal controlado por Meta.
3. Confianza en el contenido generado: etiquetarlo como IA reduce la confianza en experimentos publicados [R39], y el Reglamento de IA obliga a declararlo.
4. Cuello de botella del material real, que depende del personal del restaurante.
5. Competencia que ya empaqueta reseñas, ficha de Google, SEO y redes desde 99 € por local (Malou [R36]), y un agente de mensajería gratuito de Meta [R26].
6. Conflicto de interés al atender a restaurantes que compiten por la misma zona.

**Recomendación:** reposicionar Society de «fábrica de reels» a **sistema de captación y fidelización local** con cuatro capas —ser encontrado, ser elegido, ser reservado y volver— y el contenido como combustible de todas. Orden por impacto y coste:

1. Diagnóstico inicial automatizado.
2. Ficha de Google y reseñas.
3. Conversión y atribución.
4. Contenido y estrategia (ya diseñados).
5. Fidelización ligera por WhatsApp.
6. Amplificación pagada de lo que ya funciona.
7. Colaboraciones y prensa.

Para el TFG no hay que construirlo todo: basta ampliar el modelo de datos, incluir el diagnóstico y un panel de embudo, y **pedir cuanto antes el acceso a la API de Google Business Profile**, que tiene requisitos previos y aprobación manual. [R16]

## 2 Método

### 2.1 Cómo se construyó el mapa de campos

El mapa de 17 campos se obtuvo cruzando tres fuentes independientes:

- **El proceso real de la agencia** con Torre de Vega: informes 00 a 08 en `Documents/torre_de_vega/informes/`, la auditoría de verificación que corrigió 9 de 39 hallazgos, y el playbook `marketing-agencia-local` (investigación inicial, SEO local, alcance y precio).
- **Lo que venden las plataformas del sector**: Malou [R36], Owner.com [R37], Mapal [R38] y TheFork Manager [R22][R23].
- **La evidencia sobre cómo decide un comensal**: estudios de consumo, investigación académica sobre reseñas y documentación oficial de Google y Meta.

Cada campo se clasifica como **cubierto** (diseñado con suficiente detalle en los documentos del TFG), **parcial** (mencionado o resuelto a mano sin trasladarse al producto) o **ausente**.

### 2.2 Grado de verificación y límites

Se mantiene la escala del informe anterior: A (oficial o académico), B (prensa especializada con fuente oficial) y C (terceros, marcada «secundaria»). Las cifras de proveedores que venden la solución (Malou, Uberall, Owner.com) se citan como afirmaciones del proveedor.

Límites: no se ha entrevistado a restaurantes para validar disposición a pagar; parte de la evidencia de consumo es de Estados Unidos y se indica; la evidencia española más sólida sobre elección de restaurante procede de TheFork, que tiene interés en las reseñas y las reservas.

## 3 Cómo consigue clientes un restaurante

### 3.1 La decisión en España

| Dato | Valor | Fuente |
| --- | --- | --- |
| Opiniones como factor que más influye al reservar | 59 % (precio 42 %, tipo de cocina 34 %, promociones 28 %) | TheFork lab, >6.000 usuarios [R1] |
| Redes, prensa o guías como factor principal | 2 % | [R1] |
| Descarta un restaurante por malas reseñas | 62 % | [R1] |
| Consulta carta / opiniones antes de reservar | 75 % / 73 % | [R1] |
| Escribe reseña tras una experiencia excelente / mala | 68 % / 16 % | [R1] |
| Penetración mensual de WhatsApp, Instagram, YouTube, Facebook | 94 %, 77 %, 73 %, 56 % | IAB Spain 2026 [R2] |
| TikTok en generación Z | 61 % | [R2] |
| Dice que las redes influyen en sus decisiones de compra | 44 % (56 % en generación Z) | [R2] |

La lectura correcta **no es que Instagram no importe**. El comensal descubre y recuerda en redes, pero confirma en Google, las reseñas y la carta, y reserva por WhatsApp, teléfono o plataforma. Un Reel excelente que lleva a una ficha con horario erróneo, reseñas sin responder o una carta en PDF ilegible pierde el cliente en el último paso.

### 3.2 Las reseñas mueven ingresos, no solo imagen

- **Efecto causal en ingresos.** Con datos fiscales de restaurantes del estado de Washington y un diseño de regresión en discontinuidad, una estrella más en Yelp se asocia a un 5-9 % más de ingresos. El efecto se concentra en **restaurantes independientes**, no en cadenas. [R3]
- **Responder mejora la reputación.** En hoteles, empezar a responder reseñas se asoció a +0,12 estrellas y a un 12 % más de reseñas. Los clientes con una mala experiencia pasan a escribir menos reseñas negativas cortas cuando saben que el negocio lee y contesta. [R5]
- **Expectativas del consumidor (EE. UU., 1.002 adultos, 2026):** el 97 % lee reseñas de negocios locales; el 68 % solo usa negocios con 4 estrellas o más; el 74 % busca reseñas de los últimos tres meses; el 89 % espera que el propietario responda; el 45 % ya usa ChatGPT u otra IA para informarse sobre negocios. [R4]

### 3.3 Cómo ordena Google los resultados locales

Google explica que los resultados locales dependen de **relevancia, distancia y prominencia**. La prominencia se basa, entre otras cosas, en enlaces y en el número y la valoración de las reseñas, y responder reseñas «puede ayudar a destacar». No es posible pagar por mejorar el ranking local. [R6]

La encuesta de Whitespark a 47 especialistas (noviembre de 2025) coloca como primeros factores del mapa:

1. La categoría principal de la ficha.
2. La proximidad.
3. Palabras clave en el nombre de la ficha.
4. Dirección en la ciudad buscada.
5. **Que el negocio esté abierto en el momento de la búsqueda.**

Según esa encuesta, las señales de reseñas y de comportamiento ganan peso. [R7] Es opinión experta, no un algoritmo publicado. Dos consecuencias:

- **El horario correcto es un factor de visibilidad, no solo de atención al cliente.** El cierre de Torre de Vega del 31 de agosto al 15 de septiembre no se pudo verificar en su ficha.
- **Meter palabras clave en el nombre** funciona pero viola las directrices de Google, como ya advierte el playbook.

Proximidad: el informe competitivo de Torre de Vega midió 8,6 km en coche al centro donde se agrupan los competidores. Society debe detectar este techo en el alta y fijar objetivos alcanzables («dominar La Alquería») antes de prometer nada.

### 3.4 Búsqueda con IA

Google activó el Modo IA en España el 8 de octubre de 2025. [R8] Uberall, que vende soluciones para esto, afirma que el 83 % de los locales de restauración nunca aparece en recomendaciones de asistentes de IA aunque el 86 % está en Google. Su muestra son cadenas de comida rápida con varios locales en EE. UU. [R9]

La guía oficial de Google para sus funciones de IA es más sobria: no hay requisitos adicionales ni optimizaciones especiales; no hacen falta ficheros nuevos, marcado específico ni un tipo especial de schema.org; valen las buenas prácticas de SEO; basta estar indexado y ser apto para mostrarse con fragmento. [R10] Whitespark señala como principales factores de visibilidad en IA aparecer en listas de «los mejores» elaboradas por expertos y ser prominente en dominios relevantes del sector. [R7]

**Conclusión:** «optimizar para IA» en un restaurante es hacer bien lo básico —ficha coherente, reseñas, carta legible, web indexable y menciones en listas y medios locales—, no una disciplina separada con trucos.

**Corrección** al informe 08 de Torre de Vega: recomienda marcar `AggregateRating` en la propia web. Google declara que las páginas `LocalBusiness` u `Organization` que controlan reseñas sobre sí mismas **no son aptas para mostrar estrellas**. [R11] El marcado de datos del restaurante sigue siendo útil; las estrellas propias no aparecerán.

### 3.5 Volver es tan importante como venir

Toast (EE. UU., primer trimestre de 2026) estima que un 7 % de clientes con varias visitas puede generar hasta el 50 % del volumen de pedidos. Pasar a un cliente a un programa de fidelización eleva su tasa de retorno del 7 % a casi el 30 %. Entre quienes dejaron su restaurante favorito, un 31 % lo atribuye a peor calidad, un 22 % a subidas de precio y un 15 % a peor servicio. [R12] Society no tiene nada para esta etapa.

### 3.6 El embudo que Society debe cubrir

| Etapa | Pregunta del comensal | Dónde se decide | Cobertura actual |
| --- | --- | --- | --- |
| Ser encontrado | ¿Qué hay cerca? ¿Dónde como el domingo? | Google, Maps, asistentes de IA, Instagram, recomendaciones | Solo Instagram |
| Ser elegido | ¿Es bueno? ¿Qué se come? ¿Cuánto cuesta? ¿Está abierto? | Reseñas, fotos, carta, horario, contenido | Solo contenido |
| Ser reservado | ¿Cómo reservo ahora? | Botones de reserva, WhatsApp, teléfono, plataformas | Atribución esbozada |
| Volver | ¿Me acuerdo de ellos? ¿Tienen algo nuevo? | WhatsApp, correo, experiencia, fidelización | Ausente |
| Contenido | Transversal: alimenta todas las etapas | Redes, ficha, web, mensajes | Cubierto |

## 4 Mapa de cobertura

| # | Campo | Qué aporta | Estado en Society | Prioridad |
| --- | --- | --- | --- | --- |
| 1 | Diagnóstico inicial (expediente digital, competencia, NAP, colisión de marca, legal, prensa, datos del negocio) | Objetivos alcanzables y promesas defendibles | **Ausente** en el producto; hecho a mano en Torre de Vega | Alta |
| 2 | Posicionamiento y marca (propuesta de valor, voz, diferenciación, situaciones de consumo) | Coherencia entre canales | **Parcial**: reglas visuales versionadas; situaciones de consumo añadidas en el informe de redes; falta voz verbal y diferenciación frente a competidores | Media |
| 3 | Producción de contenido | Atención y prueba visual | **Cubierto** en diseño | — |
| 4 | Estrategia y medición de Instagram | Contenido con propósito y aprendizaje | **Cubierto** en diseño | — |
| 5 | Otras redes (Facebook, TikTok, YouTube Shorts) | Alcance en públicos que no están en Instagram | **Ausente** | Media |
| 6 | Google Business Profile y Maps | Visibilidad local y datos correctos | **Ausente** | Alta |
| 7 | Reseñas y reputación | El factor de elección número uno | **Ausente** | Alta |
| 8 | Web, carta digital y datos estructurados | Carta legible, alérgenos, indexación, IA | **Parcial**: fotos de carta web en Torre de Vega; no es módulo de Society | Media-alta |
| 9 | Plataformas y coherencia NAP (TripAdvisor, TheFork, directorios) | Menciones y datos consistentes | **Ausente** | Media |
| 10 | Conversión y reservas | Convertir intención en mesa | **Parcial**: enlace de WhatsApp con código en el informe de redes | Alta |
| 11 | Atención conversacional (mensajes directos, comentarios, WhatsApp) | Respuesta mientras la intención está caliente | **Ausente** | Media |
| 12 | Fidelización y CRM | Recurrencia, ingresos estables | **Ausente** | Media-alta |
| 13 | Publicidad pagada local | Alcance garantizado para piezas probadas | **Ausente** | Media |
| 14 | Colaboraciones, prensa, influencers y eventos | Autoridad y audiencias ajenas | **Parcial**: colaboraciones en el informe de redes; prensa solo en Torre de Vega | Media-baja |
| 15 | Inteligencia de negocio y atribución | Demostrar resultados | **Parcial**: fase 4 del informe de redes | Alta |
| 16 | Cumplimiento normativo | Evitar sanciones y crisis | **Parcial**: repartido entre documentos | Alta |
| 17 | Operación de agencia (alta, expectativas, alcance, informes, crisis, exclusividad) | Retención de clientes | **Parcial**: playbook fuera del producto | Alta |

## 5 Huecos principales y cómo cubrirlos

### 5.1 Diagnóstico inicial automatizado

**Qué es.** Un módulo de alta que reproduce, de forma guiada y verificable, los informes 01 a 07 de Torre de Vega, más la reunión de mensajes difíciles del playbook.

**Qué debe producir:**

- Expediente de ficha, web y redes.
- Competidores cercanos con nota, número de reseñas y distancia.
- Coherencia de NAP en las principales plataformas.
- Comprobaciones técnicas de la web: `robots.txt`, sitemap, Open Graph, datos estructurados y velocidad.
- Riesgos legales del territorio y credenciales verificadas o no.
- Datos que el cliente nunca ofrece: ticket medio, ocupación por día, porcentaje de recurrentes, aforo y accesos a ficha, Search Console y hosting.

**Salida.** Objetivos numerados, objetivos descartados con su argumento («top de Alhaurín» → «dominar La Alquería»), lo que va bien y lo que falta.

**Lección de Torre de Vega.** Una segunda pasada independiente corrigió 9 de 39 hallazgos, sobre todo cifras desactualizadas y datos cambiados entre fechas. El diagnóstico debe etiquetar cada dato como verificado, estimación o no encontrado, con fecha, y re-verificarlo antes de usarlo en un compromiso comercial.

**Automatizable y no automatizable.** Las comprobaciones técnicas de la web, la coherencia de datos entre fuentes accesibles y la redacción del informe se automatizan. El registro de marca, la normativa municipal y el acceso a fichas con sesión siguen necesitando una persona o el propietario.

### 5.2 Ficha de Google y reseñas

**Acceso.** La API de Google Business Profile no es pública: se solicita acceso con una ficha verificada y activa durante al menos 60 días, y una web asociada a ella. [R16] Permite listar y responder reseñas [R17], publicar novedades y obtener métricas diarias (llamadas, rutas, clics a la web, reservas y clics en la carta), ya documentadas en el informe de redes. Las preguntas y respuestas se retiraron de la API el 3 de noviembre de 2025 [R18] y el chat de las fichas terminó el 31 de julio de 2024 [R19]: no se diseñan funciones sobre ellas.

**Módulo de ficha:**

- Horarios y horarios especiales sincronizados con el calendario de Society: un cierre o reapertura se registra una vez y se propaga a ficha, historias y pie de publicaciones.
- Fotos de producto y local **reales**. La ficha es el lugar donde el cliente espera ver el sitio tal cual. No he encontrado una prohibición específica de Google sobre imágenes generadas, pero el riesgo reputacional y de publicidad engañosa es alto.
- Publicaciones de novedades reutilizando las piezas «aviso con fecha».
- Carta con precios y alérgenos.
- Alertas de discrepancia entre ficha, web y plataformas.

**Módulo de reseñas:**

| Función | Cómo | Límite |
| --- | --- | --- |
| Captación | QR o mensaje después de la visita a **todos** los clientes, con enlace directo a la ficha | Prohibido ofrecer incentivos, presionar, pedir una nota concreta o coordinar campañas [R13][R14] |
| Respuesta | Borrador de Astra con la voz del restaurante; aprobación del propietario; plazo objetivo | Sin datos personales del cliente; nunca discutir en público |
| Análisis | Temas recurrentes (servicio, espera, precio, plato) por mes | Alimenta operación y contenido, no solo marketing |
| Alertas | Aviso inmediato de reseñas de 1-2 estrellas | Respuesta humana en casos delicados |
| Métricas | Nota, reseñas por mes, recencia, tasa y tiempo de respuesta | Comparar contra el propio histórico y los competidores del diagnóstico |

**Línea roja legal.** Desde el 28 de mayo de 2022, la Ley de Competencia Desleal considera desleal enviar o encargar reseñas falsas o tergiversarlas (art. 27.8), y afirmar que las reseñas son de consumidores reales sin tomar medidas razonables para comprobarlo (art. 27.7). [R15] **Society no genera reseñas, no las filtra ni las condiciona.**

### 5.3 Web, carta y búsqueda con IA

Society ya tiene el catálogo de platos con nombres confirmados, fotos y precios. Con él puede generar:

- **Carta en HTML con precios y alérgenos.** El Real Decreto 126/2015 exige informar de los alérgenos en alimentos sin envasar, también en restauración y venta a distancia, antes de que el cliente decida. [R20] Una carta en imagen o PDF dificulta cumplirlo y la lectura por buscadores.
- **Datos estructurados** del restaurante y de la carta, coherentes con el contenido visible, sin prometer estrellas propias. [R10][R11]
- **Comprobaciones de la web**: sitemap (en Torre de Vega redirigía a un 404), imágenes Open Graph de 1200×630, horario visible, página «sobre nosotros» con hechos verificables y preguntas frecuentes reales.
- **Accesibilidad.** La Ley 11/2023 aplica desde el 28 de junio de 2025 a servicios de comercio electrónico, con exenciones parciales para microempresas. [R21] Aunque muchos restaurantes estén exentos, Society como servicio debería producir páginas accesibles por defecto.

Society no es un creador de webs. El módulo entrega la carta, los datos estructurados y una lista de correcciones para quien gestione la web del restaurante.

### 5.4 Conversión y reservas

| Pieza | Situación verificada | Uso en Society |
| --- | --- | --- |
| Botón de reserva en Instagram | Se configura con un proveedor de reservas; TheFork lo ofrece con disponibilidad en tiempo real y sin comisión por esas reservas [R22] | Recomendar en el alta si el restaurante usa un proveedor compatible |
| Reserve with Google | Funciona mediante socios de reservas [R23] | Igual |
| Enlace de WhatsApp con código | Ya especificado en el informe de redes | Estándar en historias, bio y ficha |
| Anuncios a WhatsApp | Abren una ventana gratuita de 72 horas si se responde en 24 h [R24] | Cuando haya pieza probada que amplificar |
| Tiempo de respuesta | 89 % espera respuesta a reseñas [R4]; los mensajes directos son intención caliente | Objetivo por canal y medición |

Precios secundarios de referencia: TheFork cobra unos 2 € por comensal y CoverManager tiene cuota fija de 60-250 €/mes. [R46] Society no debe competir con los sistemas de reservas; debe integrarse con ellos para leer el origen de la reserva.

### 5.5 Atención conversacional

Meta lanzó el 3 de junio de 2026 **Meta Business Agent**. Responde preguntas del negocio, recomienda productos del catálogo, reserva citas y cualifica contactos en WhatsApp, Messenger e Instagram, y deja decidir cuándo interviene una persona. Es gratuito por ahora y pasará a suscripción de pago. [R26]

Construir un chatbot propio sería repetir algo que Meta regala. El papel de Society es otro:

1. Preparar el conocimiento que ese agente necesita, a partir de los datos confirmados del restaurante: horarios, carta, alérgenos, políticas de reserva y novedades del calendario.
2. Medir tiempos y resultados.
3. Detectar conversaciones que requieren a una persona.

Si Society automatiza respuestas por la API de Instagram: hay 24 horas para responder, un agente humano puede responder hasta 7 días después con la etiqueta correspondiente, y cuando la ley lo exija hay que avisar de que la conversación es automatizada. [R27][R28]

### 5.6 Fidelización

Un restaurante de pueblo con clientela fiel —como Torre de Vega— tiene su activo más valioso sin registrar. Propuesta en dos fases:

- **Gratuita.** Listas de difusión de la app WhatsApp Business: hasta 256 contactos por lista, que solo reciben el mensaje si han guardado el número del negocio. [R25] Society prepara el mensaje con la novedad real del calendario y el código de campaña.
- **Plataforma.** Base de clientes con consentimiento registrado en la reserva y segmentos (habituales, sin visitar en 60 días, celebraciones declaradas). Envíos con plantillas de WhatsApp Business Platform, que cobra por plantilla de marketing entregada; desde el 1 de julio de 2026 España tiene una tarifa de marketing más alta. [R24]

**Consentimiento.** La LSSI prohíbe enviar comunicaciones promocionales electrónicas no solicitadas o no autorizadas expresamente. La excepción cubre a clientes previos, productos similares y un medio sencillo y gratuito para oponerse. [R29] Una reserva no convierte automáticamente a alguien en destinatario de promociones.

**Medición.** Campañas con grupo de control: enviar al 80 % de un segmento y reservar el 20 %. Es la única forma de saber si un mensaje trae clientes o solo se envía a quien iba a volver igualmente.

### 5.7 Publicidad pagada local

Meta Ads organiza las campañas en seis objetivos: reconocimiento, tráfico, interacción, clientes potenciales, promoción de apps y ventas. [R30] Google Ads ofrece Performance Max para objetivos de tienda. Las conversiones de visitas a tienda exigen ubicaciones vinculadas y verificadas y volumen suficiente; si no se alcanza, se optimiza por acciones locales como llamadas y rutas. [R31][R32] Un restaurante pequeño difícilmente tendrá datos de visitas, así que lo realista es optimizar por acciones y conversaciones.

**Papel de Society:** no gestionar anuncios por defecto, sino **recomendar qué amplificar** a partir del registro de aprendizajes. Solo se promociona una pieza que ya ganó en envíos, guardados o conversaciones, con presupuesto aparte, público local y objetivo de conversación. Los anuncios que mencionan alcohol deben dirigirse a mayores de 18 años y cumplir la ley local. [R33] Fuentes secundarias sitúan un presupuesto habitual de 200-500 €/mes. [R45]

### 5.8 Otras redes

- **Facebook** (56 % de penetración [R2]): publicación cruzada de las mismas piezas, con coste marginal casi nulo.
- **YouTube Shorts** (73 %): mismo formato vertical.
- **TikTok** (61 % en generación Z): las cuentas de empresa solo pueden usar la biblioteca de música comercial preautorizada. [R34] Encaja si el público objetivo es joven.

Cada red se mide por separado. No se copia el diagnóstico de Instagram a otra plataforma sin datos propios.

### 5.9 Colaboraciones, prensa y eventos

- **Colaboraciones con creadores.** El código de conducta de Autocontrol, vigente desde el 1 de octubre de 2025, exige identificar la publicidad al principio de cada formato (título, historia, Reel o directo) e incluye disposiciones sobre contenido con IA y menores. [R35] Society registra en el brief si una colaboración es remunerada y cómo se identifica.
- **Prensa y listas.** Torre de Vega no tenía cobertura de prensa, guías ni premios verificables. Salir en listas de «los mejores» y en medios locales es a la vez relaciones públicas y visibilidad en IA. [R7] Society puede generar la lista de medios y el ángulo noticiable desde el calendario de novedades reales.
- **Eventos.** Cualquier mecánica de acceso restringido, música o evento ocasional pasa antes por la normativa autonómica. En Andalucía, las condiciones de admisión discriminatorias o arbitrarias son infracción grave, según el informe 06 de Torre de Vega. La comprobación se guarda como regla legal por territorio.

### 5.10 Atribución y resultados

Society debe poder enseñar cada mes al restaurante una cadena de números, aunque sea incompleta:

**alcance → acciones en la ficha → conversaciones con código → reservas con origen → reseñas nuevas → recurrencia**

| Fuente | Qué aporta | Estado |
| --- | --- | --- |
| Instagram API | Alcance, envíos, clics, acciones de perfil | Especificado en el informe de redes |
| Google Business Profile Performance API | Llamadas, rutas, clics web, reservas, clics en carta | Requiere acceso [R16] |
| Códigos de WhatsApp | Conversaciones por campaña | Manual o por plataforma |
| Sistema de reservas | Reservas y comensales por origen | Integración por proveedor; CoverManager publica integraciones y API [R47] |
| TPV | Tickets, recurrencia, ingresos | Investigación pendiente por proveedor; no se ha verificado documentación pública de API |

Con muestras pequeñas no hay causalidad garantizada. Lo defendible es comparar el mismo restaurante antes y después, con un arranque escalonado entre restaurantes para separar temporada y efecto, y declarar la incertidumbre.

## 6 Vulnerabilidades del producto

| # | Riesgo | Por qué es real | Mitigación |
| --- | --- | --- | --- |
| 1 | **Promesa medida en entregables** | El restaurante paga por clientes; recibir 8 reels sin saber qué trajeron invita a cancelar | Objetivo de negocio desde el alta; panel de embudo; informe mensual con resultados y límites |
| 2 | **Techo estructural local** | Proximidad y categoría pesan más que el esfuerzo [R6][R7] | Diagnóstico de proximidad; objetivos alcanzables por escrito |
| 3 | **Dependencia de Meta** | Cambios de métricas, App Review, políticas y suspensión de cuentas afectan al único canal | Canales propios o menos volátiles: ficha de Google, base de clientes, web |
| 4 | **Confianza en contenido generado** | Etiquetar un anuncio como IA redujo confianza e intención de compra en un experimento controlado [R39]; declararlo es obligatorio en los casos del artículo 50 | Priorizar material real; usar la generación para mejorar, componer o completar sin inventar; fotos reales en ficha y carta; etiquetar siempre que proceda |
| 5 | **Cuello de botella del material real** | El plan de Torre de Vega depende de que alguien grabe cada día | Protocolo de captura y formación del personal (sección 7.3); recordatorios; medir días con material |
| 6 | **Comoditización** | Malou: 99-169 € por local con reseñas, ficha, SEO y redes [R36]. Owner.com en EE. UU.: web, pedidos, correo, SMS y fidelización [R37]. Meta Business Agent gratis [R26]. Agencias españolas: 500-1.500 €/mes en redes [R45] | Diferenciarse por calidad audiovisual fiel al local **y** por el embudo completo; integrarse con lo que ya existe |
| 7 | **Conflicto territorial** | Veinte restaurantes de la misma zona y categoría compiten por las mismas búsquedas, reseñas y audiencias | Exclusividad por zona y categoría en el plan alto, o transparencia contractual; aprendizajes compartidos solo en agregado |
| 8 | **Riesgo legal por automatización** | Reseñas [R15], comunicaciones comerciales [R29], alcohol, alérgenos [R20], IA, eventos | Motor de reglas legales por territorio con revisión profesional; bloqueos antes de publicar |
| 9 | **Errores automáticos visibles** | Una respuesta automática desafortunada a una reseña queda pública | Aprobación humana por defecto; límites de automatización; evaluaciones periódicas |
| 10 | **Coste sin prueba de efecto** | El vídeo generado es la partida más cara del informe de viabilidad | Producir menos piezas y con más evidencia; amplificar las ganadoras en vez de multiplicar las dudosas |
| 11 | **Accesos y seguridad** | Tokens de Meta y Google, fichas de terceros, revocaciones | OAuth con permisos mínimos; Society como gestor, nunca propietario de fichas o cuentas; alertas de revocación |
| 12 | **Pocos datos para aprender** | Cuentas pequeñas generan pocas publicaciones al mes | Recomendaciones iniciales basadas en patrones de varios restaurantes, validadas en cada cuenta |

## 7 Procesos y entrenamientos

### 7.1 Entrenar el sistema

**No hace falta ajustar un modelo de lenguaje para empezar.** Rinde más construir datos etiquetados y evaluaciones, y usarlos como ejemplos y como banco de pruebas.

| Conjunto de datos | Origen | Para qué |
| --- | --- | --- |
| Imágenes y clips aprobados y rechazados con motivo | Reglas de Torre de Vega y futuras revisiones | Calibrar el verificador visual y los prompts |
| Respuestas a reseñas: borrador, versión editada y aprobación | Módulo de reseñas | Aprender la voz del restaurante y medir cuánto corrige el propietario |
| Briefs con resultados a 7 días | Informe de redes | Recomendaciones basadas en evidencia |
| Casos bloqueados por cumplimiento | Motor de reglas | Pruebas de regresión legal |

**Evaluación del juez automático.** La guía de OpenAI recomienda ejemplos por nivel de puntuación, umbral de aprobado, validar la concordancia con etiquetas humanas antes de optimizar coste, equilibrar los conjuntos para que un resultado no domine y no mezclar datos de evaluación con los de entrenamiento. [R40] Aplicado a Society: cada mes, una muestra revisada por personas mide cuántas veces el verificador acepta defectos o rechaza piezas buenas.

**Fidelidad de producto en imagen.** Gemini 3 Pro Image admite hasta 14 imágenes de referencia, de ellas hasta 6 objetos con alta fidelidad y 5 personas. [R41] Antes de entrenar modelos por plato conviene agotar una buena selección de referencias. Entrenar un LoRA por producto es barato (fal lo tarifa desde unos 2 USD por entrenamiento rápido [R42]), pero añade mantenimiento y riesgo de deriva: queda como experimento para platos que fallen repetidamente con referencias.

### 7.2 Formar al equipo que opera Society

| Formación | Contenido | Coste |
| --- | --- | --- |
| Meta Blueprint | Presencia, objetivos de campaña, anuncios, medición y políticas | Cursos gratuitos; examen de certificación en torno a 99 USD (secundaria) [R43] |
| Google Skillshop | Google Business Profile y Google Ads | Formación y exámenes gratuitos (secundaria) [R44] |
| Autocontrol | Publicidad con influencers, identificación, IA | Certificado básico disponible [R35] |
| Normativa | LSSI, RGPD, reseñas, alérgenos, Reglamento de IA, alcohol | Asesor legal para crear las reglas; revisión anual |
| Playbook interno | Investigación inicial, SEO local, alcance y precio | Ya existe como skill; convertirlo en manual de operación |

### 7.3 Formar al restaurante

El mejor sistema falla si el restaurante no genera material, no responde y no avisa de cambios.

- **Protocolo de captura en 5 minutos al día.** Qué grabar (acción ya empezada, fuego real, sala con gente si hay permiso, plato del día), cómo (vertical, estable, 10-30 s, luz de la ventana) y dónde subirlo. Society lo recuerda y cuenta los días con material.
- **Reseñas sin incentivos.** Guion breve y QR para pedirlas a todos, sin descuentos ni pedir cinco estrellas.
- **Mensajes y comentarios.** Plazo de respuesta, cuándo interviene una persona, qué no se dice en público.
- **Cambios operativos.** Cierres, horarios especiales, platos agotados, precios y eventos se comunican en Society, que los propaga.
- **Consentimiento.** Cómo pedirlo al reservar y cómo registrarlo.

Formato: microformaciones dentro de la app con listas de verificación y vídeos de 1 minuto. No manuales en PDF.

### 7.4 Procesos de agencia a convertir en producto

1. **Alta.** Diagnóstico, reunión con mensajes difíciles y lo que va bien, objetivos numerados, accesos.
2. **Ciclo estratégico.** Trimestral, mensual, semanal y por pieza (informe de redes).
3. **Cambios de alcance.** Toda petición nueva se encaja en el plan o se presupuesta aparte, como indica el playbook.
4. **Re-verificación.** Datos de más de 30 días se revalidan antes de usarlos en materiales o compromisos.
5. **Crisis.** Reseña negativa viral, error de contenido generado, cierre imprevisto: quién decide, plazos y plantillas.
6. **Informe de resultados.** Mensual, con la cadena de la sección 5.10 y las limitaciones de la medición.

## 8 Herramientas por campo y fase

| Campo | Fase 0: manual o gratuita | Fase 1: servicio o API | En Society |
| --- | --- | --- | --- |
| Diagnóstico | Plantilla de los informes 01-07 y comprobaciones técnicas | Search Console y PageSpeed con acceso del cliente | Módulo de alta con etiquetas de verificación |
| Ficha de Google | Panel de Google Business Profile | API de Business Profile y Performance API (solicitud de acceso) [R16] | Horarios, fotos reales, novedades y métricas |
| Reseñas | Responder desde la ficha | API de reseñas [R17]; referencias del mercado: Malou [R36], Mapal [R38], TheFork Manager | Captación, borradores, análisis, alertas |
| Carta y web | WordPress con plugin de datos estructurados | — | Carta HTML con alérgenos y datos estructurados desde el catálogo |
| Reservas | WhatsApp con código | Botón de reserva y Reserve with Google vía socio [R22][R23] | Origen de reserva por integración |
| Mensajería | App WhatsApp Business | Meta Business Agent [R26]; API de mensajes de Instagram [R27] | Conocimiento del agente y métricas |
| Fidelización | Listas de difusión (256 contactos) [R25] | WhatsApp Business Platform [R24] | Consentimientos, segmentos, grupo de control |
| Publicidad | Promocionar desde la app | Meta Ads [R30], Performance Max [R32] | Recomendación de qué amplificar |
| Otras redes | Publicación cruzada a Facebook | TikTok con biblioteca comercial [R34]; Metricool (informe de redes) | Medición separada por red |
| Formación | Blueprint, Skillshop | Certificaciones | Microformaciones en la app |
| Calidad de IA | Revisión manual | Evaluaciones con etiquetas humanas [R40]; LoRA experimental [R42] | Registro de defectos y concordancia del verificador |

## 9 Propuesta de producto revisada

### 9.1 De fábrica de contenido a sistema de captación local

| Capa | Módulos | Métrica que ve el restaurante |
| --- | --- | --- |
| Ser encontrado | Ficha de Google, coherencia de datos, carta y web, plataformas, otras redes | Vistas y acciones en la ficha, alcance a no seguidores |
| Ser elegido | Reseñas, fotos reales, contenido, prueba social | Nota, reseñas al mes, tasa de respuesta, envíos |
| Ser reservado | Botones, WhatsApp con código, agente de mensajes, tiempos de respuesta | Conversaciones y reservas con origen |
| Volver | Consentimientos, segmentos, campañas con grupo de control | Retorno de clientes y reservas por campaña |
| Contenido (transversal) | Producción y estrategia ya diseñadas | Piezas ganadoras y aprendizajes |

### 9.2 Planes decididos

El 15 de septiembre de 2026 se decidieron tres planes acumulativos. Así encajan en ellos los módulos de esta auditoría:

| Módulo | Plan 1 · Presencia en Google | Plan 2 · Presencia + redes | Plan 3 · Completo con reels |
| --- | --- | --- | --- |
| Diagnóstico de alta | Sí | Sí | Sí |
| Ficha de Google y SEO local | Sí | Sí | Sí |
| Reseñas: captación ética y respuesta con aprobación | Sí | Sí | Sí |
| Carta con alérgenos y datos estructurados | Recomendable | Recomendable | Recomendable |
| Otros sitios y coherencia NAP (TripAdvisor y similares) | — | Sí | Sí |
| Redes: posts, carruseles e historias | — | Sí | Sí |
| Clips de vídeo para historias (Kling 3.0 en planos simples; Seedance 2.5 en acciones complejas) | — | Pocos | Sí |
| Reels | — | — | Sí |
| Voz en off y subtítulos | — | Opcional | Sí |
| Panel de embudo y atribución básica | Sí | Sí | Sí |
| Fidelización por WhatsApp, anuncios, prensa, TikTok | Complementos | Complementos | Complementos |

**Lectura:**

- **Plan 1.** Cubre la capa que esta auditoría señala como prioritaria para la decisión del comensal: Google y las reseñas. Además es el más barato de producir, porque no genera vídeo.
- **Coste mientras sea asistido.** Mientras la ficha se gestione de forma asistida, domina el tiempo humano: unos 41 € por restaurante con cuotas de ejemplo (informe de viabilidad §10).
- **Transversal.** El diagnóstico de alta y el panel de embudo deberían estar en los tres planes, porque son los que demuestran resultados.

**Referencias de precio:** Malou cobra desde 99 € por local en su plan básico de reseñas, ficha y SEO, y 169 € para 1-2 locales [R36]; una agencia española cobra 500-1.500 €/mes solo por redes (secundaria) [R45]. Los precios de Society están pendientes: deben calcularse con los costes por plan del informe de viabilidad y validarse con restaurantes reales.

### 9.3 Promesa comercial honesta

- **Compromisos de actividad** (controlables): ficha coherente, 100 % de reseñas respondidas en plazo, frecuencia de publicación, informes mensuales.
- **Resultados reportados** (no garantizados): acciones en la ficha, reseñas nuevas, conversaciones con código, reservas con origen, alcance a no seguidores.
- **Nunca prometer**: seguidores concretos, viralidad, posiciones en el mapa fuera del área alcanzable ni apariciones en asistentes de IA.
- **Exclusividad**: política escrita sobre restaurantes de la misma categoría y zona.

## 10 Priorización

### 10.1 Producto

| Prioridad | Módulo | Motivo |
| --- | --- | --- |
| Imprescindible | Diagnóstico de alta | Barato y evita promesas imposibles |
| Imprescindible | Ficha de Google y reseñas | Factor principal de elección [R1][R3] |
| Imprescindible | Panel de embudo y atribución básica | Sin él no se demuestra valor |
| Imprescindible | Motor de reglas legales por territorio | La automatización multiplica los errores |
| Importante | Carta con alérgenos y datos estructurados | Reutiliza el catálogo; obligación legal y visibilidad |
| Importante | Conversión: botones, códigos, tiempos de respuesta | Cierra el embudo |
| Importante | Fidelización ligera | Recurrencia [R12] |
| Deseable | Otras redes, recomendación de anuncios, prensa | Amplían, pero dependen de lo anterior |
| Aplazado | Chatbot propio, gestión completa de anuncios, integración con TPV | Existen alternativas o falta documentación verificada |

### 10.2 TFG y lanzamiento

Hasta enero de 2027, el desarrollo se centra en contenido para redes (decisión del 15 de septiembre). El alcance de esta auditoría se reparte así:

- **Dentro:**
  - Modelo de datos ampliado (sección 10.3), para no rehacer tablas al añadir los planes 1 y 2.
  - Diagnóstico de alta semiautomático con etiquetas de verificación.
  - Panel de embudo con datos importados.
- **Operación asistida al lanzar:** la ficha de Google y las reseñas del plan 1, y los otros sitios del plan 2, los gestiona una persona con apoyo de Society hasta que se automaticen.
- **Dentro si el núcleo está estable:** lectura y respuesta de reseñas con la API de Business Profile en una ficha piloto. **La solicitud de acceso debe enviarse ya**, porque depende de una aprobación externa. [R16]
- **Fuera, como ampliación:** fidelización con plataforma, anuncios, TikTok, integración con TPV y prensa.

### 10.3 Entidades nuevas del modelo de datos

| Entidad | Información esencial |
| --- | --- |
| Diagnóstico | Fecha, hallazgos con estado (verificado, estimación, no encontrado), fuente, objetivos y descartes |
| Competidor | Nombre, distancia, nota, reseñas, categoría, fecha de consulta |
| Ficha externa | Plataforma, URL, NAP observado, discrepancias, fecha |
| Reseña | Plataforma, fecha, nota, texto, temas, estado de respuesta; tratamiento conforme a RGPD |
| Respuesta a reseña | Borrador, versión final, aprobador, tiempo de respuesta |
| Regla legal | Territorio, ámbito (alcohol, reseñas, eventos, comunicaciones, alérgenos, IA), fuente, vigencia, revisión |
| Consentimiento | Canal, fecha, finalidad, prueba, baja |
| Campaña de fidelización | Segmento, grupo de control, código, resultados |
| Evento de conversión | Canal, código, pieza, reservas, comensales; sin datos personales si no es necesario |
| Formación del restaurante | Módulo, completado, métrica de adopción (días con material, tiempo de respuesta) |

## 11 Plan de validación

- **Piloto.** Tres restaurantes durante 12 semanas, con 4 semanas de línea base antes de activar módulos y arranque escalonado de dos semanas entre restaurantes para separar temporada y efecto.
- **Métricas principales**: acciones en la ficha, reseñas al mes, nota, tasa y tiempo de respuesta, alcance a no seguidores, envíos, conversaciones con código y reservas con origen.
- **Métricas de producto**: horas de propietario por semana, días con material real, recomendaciones aceptadas y ganadoras, cancelaciones y disposición a pagar.
- **Criterio de éxito honesto**: mejoras sostenidas frente a la línea base del propio restaurante, publicadas con su incertidumbre, sin atribuir a Society lo que coincide con temporada o eventos.

## 12 Ejemplo de alta: caso Torre de Vega

Ejemplo de lo que el diagnóstico de alta detectaría en un restaurante real, con los hallazgos del caso práctico. No es una lista de tareas de Society: muestra el tipo de acciones que los planes 1 y 2 deben poder detectar y gestionar. El estado de ejecución de cada punto no consta en los documentos revisados.

| Acción | Motivo | Coste |
| --- | --- | --- |
| Confirmar en la ficha el horario desde la reapertura del 16 | «Abierto en el momento de la búsqueda» es un factor de visibilidad [R7] | Minutos |
| Corregir el NAP de Cylex, fuente raíz con datos de otro restaurante | Coherencia de datos | 30 min |
| Dar de alta TripAdvisor (ya contratado) | Menciones y reseñas de terceros | Presupuestado |
| Corregir el sitemap y el mensaje «en el corazón de Alhaurín» | Indexación y coherencia | 1 h |
| Carta en HTML con alérgenos | Real Decreto 126/2015 [R20] y lectura por buscadores | 2-3 h en el rediseño |
| Rutina de respuesta a reseñas y QR sin incentivos | Factor principal de elección [R1] | 20 min/semana |
| Botón de WhatsApp con código en bio, historias y ficha | Atribución | 15 min |
| Pedir acceso de gestor a la ficha y solicitar la API | Requisito para automatizar [R16] | 30 min |
| Pedir consentimiento de comunicaciones al reservar | Base de fidelización [R29] | Decisión del cliente |

## 13 Preguntas abiertas y bloqueos

1. **Disposición a pagar** por el plan con reseñas y ficha. Requiere entrevistas con restaurantes.
2. **Acceso a la API de Google Business Profile.** Aprobación externa sin plazo publicado.
3. **Integraciones con TPV españoles.** No se ha encontrado documentación pública de API verificable; investigar proveedor por proveedor.
4. **Disponibilidad y precio de Meta Business Agent en España** tras el paso a suscripción.
5. **Política de exclusividad territorial.** Decisión comercial.
6. **Motor de reglas legales.** Necesita revisión profesional por comunidad autónoma antes de automatizar bloqueos.
7. **Fotos generadas en la ficha de Google.** No se ha verificado una norma específica; la recomendación de usar solo fotos reales es prudencial.
8. **Cuotas y precios de los tres planes**, calculados con los costes por plan del informe de viabilidad §10.
9. **Alcance del TFG.** Decisión de Víctor según calendario y rúbrica.

## 14 Fuentes

Consultadas el 14 de septiembre de 2026. «Secundaria» indica fuente de terceros usada solo como referencia.

**Consumo y evidencia**

- [R1] InfoHoreca · Primer informe de TheFork lab sobre reseñas (24 jul. 2026) · https://www.infohoreca.com/noticias/20260724/resenas-online-eleccion-restaurante-comensales-espanoles
- [R2] IAB Spain · Estudio de Redes Sociales 2026 · https://iabspain.es/iab-spain-presenta-estudio-rrss-2026/
- [R3] Michael Luca · Reviews, Reputation, and Revenue: The Case of Yelp.com (HBS) · https://www.hbs.edu/faculty/Pages/item.aspx?num=41233
- [R4] BrightLocal · Local Consumer Review Survey 2026 · https://www.brightlocal.com/research/local-consumer-review-survey/
- [R5] Proserpio y Zervas · Online Reputation Management, Marketing Science 36(5), 2017 · https://pubsonline.informs.org/doi/abs/10.1287/mksc.2017.1043
- [R12] Toast Regulars Report 2026, vía Stacker · https://ktvz.com/stacker-business-economy/2026/09/03/report-7-of-guests-can-drive-up-to-50-of-restaurant-order-volume/
- [R39] Israfilzade · AI-generated versus human-created advertising, Equilibrium 20(4), 2025 · https://economic-policy.pl/index.php/eq/article/view/4038

**Google**

- [R6] Google Business Profile Help · Cómo mejorar el ranking local · https://support.google.com/business/answer/7091
- [R7] Whitespark · 2026 Local Search Ranking Factors (encuesta a 47 expertos, 6 nov. 2025) · https://whitespark.ca/local-search-ranking-factors/
- [R8] Google España · El Modo IA llega a España · https://blog.google/intl/es-es/productos/la-busqueda-de-google-el-modo-ia-llega-a-espana/
- [R10] Google Search Central · AI features and your website · https://developers.google.com/search/docs/appearance/ai-features
- [R11] Google Search Central · Review snippet · https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- [R13] Google Maps · Fake engagement · https://support.google.com/contributionpolicy/answer/11414422?hl=en
- [R14] Google Maps · Incentivized or Biased Reviews · https://support.google.com/contributionpolicy/answer/16597558?hl=en
- [R16] Google Business Profile APIs · Prerequisites · https://developers.google.com/my-business/content/prereqs
- [R17] Google Business Profile APIs · Work with review data · https://developers.google.com/my-business/content/review-data
- [R18] Google Business Profile APIs · Q&A API change log · https://developers.google.com/my-business/content/qanda/change-log
- [R19] Google Business Profile Help · Changes to chat and call history · https://support.google.com/business/answer/14919056?hl=en
- [R31] Google Ads Help · About store visit conversions · https://support.google.com/google-ads/answer/6100636?hl=en
- [R32] Google Ads Help · Performance Max for store goals · https://support.google.com/google-ads/answer/13775728
- [R41] Google AI for Developers · Gemini 3 Pro Image · https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image

**Meta, WhatsApp y TikTok**

- [R24] Meta · WhatsApp Business Platform pricing · https://developers.facebook.com/docs/whatsapp/pricing
- [R25] WhatsApp Help Center · Listas de difusión en WhatsApp Business · https://faq.whatsapp.com/653415899610349/?cms_platform=android
- [R26] Meta · Meta Business Agent (3 jun. 2026) · https://about.fb.com/news/2026/06/meta-business-agent/
- [R27] Meta · Instagram Messaging API · https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/
- [R28] Meta · Messenger Platform and IG Messaging API policy · https://developers.facebook.com/documentation/business-messaging/messenger-platform/policy
- [R30] Meta Business Help · Campaign objectives · https://www.facebook.com/business/help/429925181085716
- [R33] Meta · Advertising standards: Alcohol · https://transparency.meta.com/policies/ad-standards/restricted-goods-services/alcohol/
- [R34] TikTok Help Center · Commercial use of music · https://support.tiktok.com/en/business-and-creator/creator-and-business-accounts/commercial-use-of-music-on-tiktok?lang=en

**Normativa**

- [R15] Garrigues · Real Decreto-ley 24/2021 y reseñas falsas · https://www.garrigues.com/es_ES/noticia/fake-reviews-real-decreto-ley-242021-introduce-nuevas-medidas-evitar-resenas-falsas-bienes-o
- [R20] BOE · Real Decreto 126/2015, información alimentaria de alimentos sin envasar · https://www.boe.es/diario_boe/txt.php?id=BOE-A-2015-2293
- [R21] Iberley · Entrada en vigor de la Ley 11/2023 de accesibilidad (secundaria) · https://www.iberley.es/noticias/entra-vigor-ley-11-2023-que-regula-accesibilidad-los-canales-digitales-35022
- [R29] BOE · Ley 34/2002 (LSSI), artículo 21 · https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758
- [R35] Autocontrol · Nuevo Código de Conducta de publicidad a través de influencers · https://www.autocontrol.es/autocontrol/sala-de-prensa/autocontrol-noticias/entra-vigor-nuevo-codigo-conducta-publicidad-influencers/

**Plataformas y competidores**

- [R9] Business Wire · Uberall: 83 % of Restaurants Are Invisible in AI Search (7 may. 2026; proveedor) · https://www.businesswire.com/news/home/20260507962493/en/83-of-Restaurants-Are-Invisible-in-AI-Search-New-Uberall-Report-Reveals-the-Discovery-Gap-Reshaping-the-Quick-Service-Restaurant-Industry
- [R22] TheFork Manager · Reservas desde Instagram y Facebook · https://www.theforkmanager.com/en/blog/thefork-tools/boost-your-restaurant-bookings-instagram-and-facebook-marketing-restaurants
- [R23] TheFork Manager · Reserve with Google · https://www.theforkmanager.com/en/blog/thefork-tools/maximise-reservations-reserve-google
- [R36] Malou · Pricing · https://www.malou.io/en-us/pricing-us
- [R37] Owner.com · Pricing · https://www.owner.com/pricing
- [R38] Mapal · Marketing para hostelería · https://mapal-os.com/es/marketing/
- [R46] Deru · TheFork frente a CoverManager (secundaria) · https://deru.es/en/blog/software-restaurantes-reservas/
- [R47] CoverManager · Integraciones · https://integraciones.covermanager.com/

**Formación, evaluación y precios**

- [R40] OpenAI · Evaluation best practices · https://developers.openai.com/api/docs/guides/evaluation-best-practices
- [R42] fal · FLUX LoRA Fast Training · https://fal.ai/models/fal-ai/flux-lora-fast-training
- [R43] Markampus · Certificación de Meta en 2026 (secundaria) · https://markampus.com/blog/meta-certification-free-2026/
- [R44] Class Central · Cursos de Google Skillshop (secundaria) · https://www.classcentral.com/provider/skillshop
- [R45] Vender por Internet · Precios de community manager 2026 (secundaria) · https://www.venderporinternet.org/precios-y-tarifas-de-un-community-manager/

**Documentos locales**

- `Documents/torre_de_vega/informes/00_resumen-para-el-equipo.md`, `00b_auditoria-verificacion.md` y `01` a `08`
- Skill `marketing-agencia-local` y sus referencias 01, 02 y 05
- `informes/Society_diseno_y_viabilidad.md` y `informes/Society_estrategia_redes_y_retroalimentacion.md`

Los precios, el encaje de módulos en los planes, las prioridades y el diseño del piloto son propuestas de este informe y deben validarse con restaurantes reales antes de convertirse en compromisos comerciales.
