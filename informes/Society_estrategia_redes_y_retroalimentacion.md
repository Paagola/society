# Society

## Estrategia de redes sociales y ciclo de retroalimentación

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 14 de septiembre de 2026 · actualizado el 15 de septiembre de 2026

## 1 Resumen ejecutivo

> **Actualización del 15 de septiembre de 2026.** Society es un proyecto propio para toda la hostelería, con posible venta desde enero de 2027. No es un proyecto para Torre de Vega: ese caso se usa solo como ejemplo y evidencia. Novedades de esta versión:
>
> 1. **Cuenta propia de Society** en redes, con contenido generado por la app y dirigida a hosteleros (sección 4.8).
> 2. **Mezcla de contenido por plan:** el plan 2 prioriza historias y posts con pocos clips de vídeo, y el plan 3 prioriza reels (sección 4.4).
> 3. **Voz y subtítulos** en la lista de publicación (sección 4.7 y `Society_voces_y_subtitulos.md`).
> 4. **Alcance hasta enero** (sección 10.5).
>
> La sección 9 pasa a ser una guía de arranque válida para cualquier restaurante.

El informe de diseño y viabilidad resolvió cómo se produce una pieza: contrato de plano, rutas de vídeo, verificación y montaje. Falta la otra mitad: **qué se produce, para quién, con qué propósito y qué se aprende después de publicarlo**. Este documento la diseña como un sistema cerrado de decisión:

**estrategia → hipótesis → brief de pieza → producción → publicación → medición → diagnóstico → decisión → estrategia actualizada**

La producción ya definida se engancha en el paso «brief de pieza». El contrato de plano deja de empezar en una intención suelta («mostrar el pulpo») y recibe un brief que declara objetivo de negocio, situación de consumo, audiencia, motivo de envío, métrica principal y umbral. Así cada Reel, carrusel e historia tiene una función dentro de un plan y un criterio para saber si la cumplió.

**La herramienta pedida ha cambiado de nombre y de funcionamiento.** Windsurf pasó a llamarse Devin Desktop el 2 de junio de 2026. El 8 de septiembre de 2026 se eliminó Cascade, el agente que tenía Workflows y Memories; el 10 de septiembre se retiraron los comandos de workflows. El agente vigente, Devin Local, trabaja con skills, reglas en AGENTS.md, hooks, subagentes, plugins y servidores MCP. [R24][R25][R26] La recomendación es construir la operación de marketing sobre formatos portables —Markdown, el estándar abierto de skills y MCP— que sirven igual en Devin Desktop, en Claude Code (la herramienta que ya usa el proyecto Torre de Vega) o en otro editor con agente. **El agente opera la estrategia; no es la fuente de verdad de los datos.**

**Lo que decide el alcance está documentado por la propia plataforma.** Adam Mosseri señaló en enero de 2025 que las tres señales más importantes son tiempo de visionado, me gusta y envíos, y en mayo de 2026 precisó que la tasa de me gusta pesa más con seguidores y la de envíos con quienes no siguen la cuenta. [R13][R14] Coincide con lo medido en Torre de Vega: los compartidos fueron el único motor de alcance identificable en 90 días.

**La medición oficial basta para retroalimentar el proceso, con cinco trampas.** La API de Instagram (v25.0) entrega por Reel `views`, `reach`, `reels_skip_rate`, `ig_reels_avg_watch_time`, `shares`, `saved`, `likes` y `comments`. Pero: las métricas de historias solo existen 24 horas; en Europa la API devuelve 0 en respuestas a historias; `follows` y `profile_visits` no se entregan por Reel; las métricas de cuenta se conservan 90 días; y los datos pueden llegar con 48 horas de retraso. [R1][R2][R3] Society tiene que capturar y almacenar por su cuenta, en fechas fijas.

**Tres correcciones inmediatas a documentos existentes.** Instagram limita a **cinco hashtags** desde diciembre de 2025, y la guía de publicación del Reel 03 recomienda once. [R16] Las cuentas de empresa tienen un catálogo musical restringido, y el mismo documento propone audio de tendencia sin comprobar el tipo de cuenta. [R52] Y el contenido fotorrealista generado o alterado con IA exige declaración: Meta la pide para vídeo y audio, el artículo 50 del Reglamento de IA aplica a los *deepfakes* desde el 2 de agosto de 2026, y la API de publicación ya tiene el parámetro `is_ai_generated`. [R19][R21][R5]

**Las herramientas se incorporan por fases**, sin bloquear la operación a la espera del software final: registro manual y skills (0 €), conectores con MCP (0 a unos 55 €/mes), ingesta propia sobre Supabase (dentro del presupuesto técnico ya calculado), aprendizaje entre restaurantes en Society y, opcionalmente, competencia y atribución a reservas.

El análisis es barato frente a la producción. Con las tarifas de Astra del informe anterior, un informe semanal y un plan mensual por restaurante rondan **4 USD al mes**, unos 79 USD para 20 restaurantes (hipótesis de 30.000 tokens de entrada y 6.000 de salida por informe semanal, y 60.000/15.000 por plan). El coste real está en la disciplina de captura y en el tiempo de revisión con el cliente.

## 2 Alcance y método

### 2.1 Qué se ha revisado

Material local: análisis de Instagram de 90 días, plan de contenido de septiembre a diciembre, lectura de métricas del Reel 03, guía de publicación del Reel 03, historias de reapertura, ranking de plantillas, informe de *deep research* previo, caso práctico 01, `CLAUDE.md` del cliente y el informe de diseño y viabilidad de Society.

Fuentes externas consultadas el 14 de septiembre de 2026: documentación de Meta para desarrolladores, Instagram for Creators, documentación y changelog de Devin, Reglamento (UE) 2024/1689, Comisión Europea, BOE, BOJA, AEPD, documentación de Supabase y Google, y páginas de precios de Metricool, Windsor.ai, n8n y Apify. No se ha llamado a ninguna API con credenciales ni se ha publicado nada.

### 2.2 Grado de verificación

| Nivel | Tipo de fuente | Uso en este informe |
| --- | --- | --- |
| A | Documentación oficial, texto legal, changelog del fabricante | Base de requisitos, límites y métricas |
| B | Prensa especializada que recoge declaraciones oficiales (Social Media Today, TechCrunch) | Señales de ranking y cambios de producto, citando fecha |
| C | Blogs de herramientas, estudios sin metodología pública | Solo como pista, marcado «secundaria»; nunca para fijar umbrales |

Tres puntos no se pudieron verificar en fuente primaria. La página de precios de Devin devolvió error 429 repetidamente. Las páginas del Centro de ayuda de Instagram no se renderizan fuera de la aplicación. Y no hay benchmarks de historias con metodología pública. Cuando una cifra depende de ellos, se indica.

### 2.3 Lo que ya existe y no se repite

El análisis de 90 días ya separa objetivos (seguidores, alcance, me gusta), corrige denominadores engañosos del panel y fija umbrales para Torre de Vega. El *deep research* ya propone embudo, CTA por mensaje directo y regla de ganadores. Este informe no reescribe esas conclusiones: las convierte en un **proceso repetible para 20 restaurantes**, con contratos de datos, ventanas de medición, herramientas por fase y cumplimiento.

## 3 Qué mueve una publicación en Instagram en 2026

### 3.1 Señales confirmadas

| Señal | Qué dijo Instagram | Métrica de la API | Palanca creativa |
| --- | --- | --- | --- |
| Tiempo de visionado | Una de las tres señales principales (ene. 2025). Tiene en cuenta porcentaje y segundos para no penalizar vídeos largos | `ig_reels_avg_watch_time`, `ig_reels_video_view_total_time`, `reels_skip_rate` | Primer fotograma con acción; primer plano de 2 a 2,5 s; ritmo después del segundo 3 |
| Envíos por alcance | Más importante para quien no sigue la cuenta (mayo 2026) | `shares` / `reach` | Motivo de reenvío: fecha, novedad, plan, persona a quien mandarlo |
| Me gusta por alcance | Más importante para seguidores | `likes` / `reach` | Afinidad con la clientela actual |
| Actividad del usuario | La señal que más pesa en Reels según la explicación oficial de ranking | No medible por la cuenta | No se controla; se trabaja con constancia y relevancia local |

Fuentes: [R12][R13][R14]. La explicación oficial de 2023 menciona para Reels la probabilidad de ver completo, compartir, dar me gusta e ir a la página del audio. Las historias se ordenan por historial de visualización, interacción y cercanía con la cuenta. [R12] Por eso **las historias trabajan sobre la relación existente y los Reels sobre el descubrimiento**.

Desde abril de 2026 la aplicación muestra en las estadísticas de cada Reel la tasa de salto y la tasa de compartidos en porcentaje, con comparación frente a lo habitual de la cuenta. Quedan excluidas del nuevo formato las publicaciones colaborativas, los Reels de prueba, el contenido compartido en Facebook y el promocionado. [R15]

### 3.2 Papel de cada formato

| Formato | Función principal | Audiencia | Métrica principal | Guardarraíl |
| --- | --- | --- | --- | --- |
| Reel | Descubrimiento local y recuerdo | Seguidores y no seguidores | Envíos/alcance o tasa de salto, según hipótesis | No bajar la tasa de me gusta de seguidores de forma sostenida |
| Carrusel | Consideración y decisión («qué pedir») | Sobre todo seguidores | Guardados/alcance y visitas al perfil | Alcance mínimo de la mediana de carruseles |
| Historia | Relación y conversión inmediata | Seguidores cercanos | Clics en enlace, salidas por fotograma, respuestas en la app | Alcance de la historia frente a su mediana |
| Foto fija | Aviso breve, prueba social, mantener frecuencia | Seguidores | Alcance y me gusta/alcance | Coste de producción cero o casi cero |

Esta asignación coincide con lo medido en Torre de Vega: el carrusel del Caldelana hizo 17 visitas al perfil con 455 de alcance, y el alcance medio de carrusel fue 477 frente a 926 del Reel. Los benchmarks de Socialinsider para 2026 (35 millones de publicaciones de 447.613 páginas en 2025) dan una interacción sobre seguidores de 0,55 % en carruseles, 0,52 % en Reels y 0,37 % en imágenes; en el segundo trimestre de 2026, 0,50 %, 0,48 % y 0,33 %. [R46] Son medias intersectoriales calculadas sobre seguidores: sirven para no esperar milagros de un formato, no como objetivo de un restaurante de pueblo.

### 3.3 Reglas de plataforma que condicionan el plan

- **Hashtags.** Desde el 18 de diciembre de 2025, máximo cinco por publicación y por Reel. Instagram afirma que pocos hashtags específicos funcionan mejor que muchos genéricos. [R16] La referencia de la API aún indica 30 en el pie; se aplica el límite más estricto. Instagram no ha publicado si los hashtags de un comentario cuentan. Recomendación: de 3 a 5, en el pie, locales y de categoría.
- **Originalidad.** Desde el 30 de abril de 2026, las cuentas que republican contenido ajeno sin transformarlo pierden elegibilidad para recomendaciones. Una marca de agua o un cambio de velocidad no cuentan como aportación. [R18] La entrada «Inspirarme en un reel» de Society debe reutilizar estructura y lenguaje audiovisual, nunca subir material ajeno.
- **Reels de prueba.** Se muestran primero a no seguidores; las métricas llegan tras unas 24 horas; pueden compartirse automáticamente según las reproducciones de las primeras 72 horas. [R17] Por API se publican con `trial_params` y estrategia `MANUAL` o `SS_PERFORMANCE`. [R4] Según fuentes secundarias, requieren al menos 1.000 seguidores y no admiten colaboradores. [R54] Torre de Vega ya los ha usado, así que su cuenta es elegible.
- **Colaboraciones.** La API admite hasta 3 colaboradores por publicación. [R5] Es la vía gratuita para llegar a la audiencia de otra cuenta.
- **Buscadores.** Instagram permite que buscadores indexen fotos y vídeos públicos de ciertas cuentas. [R50] Fuentes secundarias sitúan la ampliación a cuentas profesionales públicas el 10 de julio de 2025, con un ajuste de privacidad para desactivarla. [R51] El pie debe nombrar plato y localidad con palabras que alguien buscaría.
- **Programación nativa.** Fuentes secundarias indican que la app permite programar hasta 75 días antes y 25 publicaciones al día, y que al programar de forma nativa no se pueden añadir colaboradores. [R53] Hay que comprobarlo en la app antes de apoyarse en ello.

### 3.4 Afirmaciones que no deben entrar en la estrategia

- «Instagram empuja a partir del X % de retención a 3 s». No hay umbral oficial. El 65 % de abandono de Torre de Vega es un **objetivo interno** derivado de su propio histórico.
- «La mejor hora es…». Depende de la audiencia de cada cuenta; se decide con datos propios.
- «Los hashtags dan alcance». Instagram los presenta como clasificación del contenido. [R16]
- Benchmarks de historias (por ejemplo, «23,8 % de salida en el primer fotograma»). Circulan sin metodología pública; se sustituyen por la línea base de cada cuenta.
- Encuestas de descubrimiento de restaurantes. La de Toast (1.466 adultos de EE. UU., octubre de 2025) sitúa el boca a boca en el 38 %, Facebook en el 27 % e Instagram en el 15 %. [R47] No es extrapolable a Málaga. La lectura útil: **un envío por mensaje directo es boca a boca digital**, y conviene medir la atribución propia en lugar de suponerla.

## 4 Parte logística: de la estrategia a la pieza

### 4.1 Cuatro niveles de decisión

| Nivel | Frecuencia | Quién decide | Entradas | Salida |
| --- | --- | --- | --- | --- |
| Estrategia | Trimestral, 60-90 min con el cliente | Propietario + agencia/Society | Objetivos de negocio, calendario de novedades reales, aprendizajes confirmados | Objetivos, situaciones de consumo prioritarias, pilares, umbrales, hipótesis principales |
| Plan | Mensual | Agencia/Society, aprobación ligera del cliente | Estrategia, informe mensual, disponibilidad de material y colaboradores | Calendario con reparto por pilar y formato, 2-3 hipótesis a probar, dependencias |
| Operación | Semanal | Agencia/Society | Informe semanal, calendario | Briefs de la semana, ajustes de calendario, piezas que repetir o parar |
| Pieza | Por publicación | Sistema con aprobación de datos comerciales | Brief | Producción, publicación, capturas, diagnóstico |

La estrategia se escribe una vez al trimestre y se consulta en cada brief. Si un aprendizaje se confirma a mitad de trimestre, se registra como propuesta de cambio y se aplica en la siguiente revisión. Se cambia antes solo si contradice una regla dura del cliente.

### 4.2 Objetivo de negocio y cadena de conversión

El objetivo final de un restaurante no son los seguidores: son **mesas ocupadas atribuibles**. La cadena medible es:

**pieza → alcance (seguidores/no seguidores) → interacción con intención → acción de contacto → conversación o reserva → comensales**

| Eslabón | Medida disponible | Fuente |
| --- | --- | --- |
| Alcance | `reach` por pieza; alcance diario con desglose `follow_type` y `media_product_type` | API [R1][R2] |
| Intención | `saved`, `shares`, visitas al perfil (publicaciones e historias) | API [R1] |
| Acción de contacto | `profile_links_taps` por `contact_button_type`: `BOOK_NOW`, `CALL`, `DIRECTION`, `EMAIL`, `TEXT`, `INSTANT_EXPERIENCE`, `UNDEFINED`; `link_clicks` en historias | API [R2][R1] |
| Conversación | Mensajes de WhatsApp con código de campaña prerrellenado | Enlace `https://wa.me/<número>?text=<texto codificado>` [R42] |
| Reserva | Campo «origen» en el registro de reservas o sistema de reservas | Operación del restaurante; CoverManager ofrece API e integraciones [R49] |
| Local en Google | `CALL_CLICKS`, `WEBSITE_CLICKS`, `BUSINESS_DIRECTION_REQUESTS`, `BUSINESS_BOOKINGS`, `BUSINESS_FOOD_MENU_CLICKS` | Google Business Profile Performance API [R41] |

Un código de campaña corto en el mensaje prerrellenado («Hola, quiero reservar · OTOÑO») permite contar conversaciones por pieza sin guardar datos personales: basta anotar fecha, código y número de comensales.

### 4.3 Situaciones de consumo y pilares

La investigación de Ehrenberg-Bass define las *category entry points* como los momentos, necesidades u ocasiones en que alguien piensa en una categoría. Vincular la marca a más situaciones relevantes aumenta la probabilidad de que venga a la cabeza cuando surge la necesidad. [R48] Para un restaurante, la categoría no es «carne», es **«dónde comemos»**. Cada pieza debe unir el restaurante a una situación concreta.

| Situación de consumo | Ejemplo en Torre de Vega | Pilar | Formato habitual |
| --- | --- | --- | --- |
| Hay una novedad con fecha | Reapertura, carta de otoño, menús de Navidad | Aviso con fecha | Reel + historia con cuenta atrás |
| Comida entre semana | Menú del día de miércoles a viernes | Disponibilidad | Historias diarias, foto fija |
| Celebración o comida de domingo en familia | Pieza para compartir al centro | Decisión | Carrusel «qué pedir según el plan» |
| Viene alguien de fuera | Platos de identidad malagueña | Decisión / identidad | Carrusel, Reel |
| Discusión sobre la carne | Punto, corte, reposo | Oficio | Reel con acción real |
| Confianza en quién cocina | Parrillero, familia desde 1980, proveedores | Personas y casa | Reel colaborativo, carrusel de trazabilidad |

Los cinco pilares resultantes son aviso con fecha, oficio, decisión, personas y casa, y disponibilidad. Cada restaurante de Society rellena la tabla en el onboarding con 4 a 8 situaciones confirmadas por el propietario. El sistema no inventa ocasiones que el negocio no atiende.

### 4.4 Mezcla mensual por plan

Los planes decididos el 15 de septiembre de 2026 fijan dónde pesa cada formato. Las cantidades son ejemplos de cálculo (informe de viabilidad §10), no cuotas cerradas; se ajustan por cuenta tras 8 semanas.

**Plan 2: historias y posts, con poco vídeo.** Ejemplo con 20 imágenes finales y 4 clips de historia al mes:

| Pilar | Posts y carruseles | Historias | Clips de vídeo | Objetivo |
| --- | --- | --- | --- | --- |
| Aviso con fecha | 1-2 | Cuenta atrás y recordatorio | 1 | Envíos y alcance |
| Oficio | 1 | Proceso del día con material real | 1 | Retención en historias |
| Decisión | 2 carruseles | Encuesta | — | Guardados y visitas al perfil |
| Personas y casa | 1 | Detrás de la barra | 1, si hay permiso | Relación |
| Disponibilidad | — | Diarias en días de apertura | 1 | Clics y conversaciones |

**Plan 3: reels como formato principal.** Incluye todo lo del plan 2. Ejemplo con 4 reels al mes:

| Pilar | Reels | Objetivo |
| --- | --- | --- |
| Aviso con fecha | 1-2 | Envíos y alcance a no seguidores |
| Oficio | 1-2 | Tasa de salto y tiempo de visionado |
| Personas y casa | 0-1, colaborativo si hay acuerdo | Alcance a otras audiencias |

**Criterios comunes:**

- En el plan 2, los clips de vídeo se reservan a historias en las que el movimiento aporta algo que una foto no muestra. El resto de historias se hace con material real del día o con imágenes.
- En los dos planes, **ningún hueco de más de tres días** y la pieza fuerte de la semana en una franja fija, como se midió en el caso práctico.
- Si ese mes no hay una novedad real, el hueco del pilar «aviso con fecha» pasa a oficio o decisión: **no se fabrican noticias**.

### 4.5 Brief de pieza

El brief es el contrato entre estrategia y producción. Astra lo rellena desde el plan y el propietario confirma los datos comerciales. Sin brief completo no se abre el proyecto de producción del informe anterior.

| Campo | Contenido | Ejemplo |
| --- | --- | --- |
| ID | Restaurante, fecha, formato y nombre corto | `TDV-2026-09-30-R-carta-otono` |
| Objetivo | Uno solo: descubrimiento, consideración, conversión o relación | Descubrimiento |
| Situación de consumo | De la tabla del restaurante | Hay una novedad con fecha |
| Audiencia prevista | Seguidores, no seguidores o ambas | Ambas |
| Motivo de envío | Por qué alguien se lo manda a otra persona | «La carta nueva empieza el 2 de octubre» |
| Hipótesis | Si… entonces… porque… | Si la fecha aparece en pantalla desde el fotograma 1, la tasa de envío supera el 0,40 %, porque el aviso resuelve un plan |
| Variable probada | Una por pieza cuando sea posible | Fecha en pantalla desde t = 0 |
| Métrica principal y umbral | Métrica de la API y valor | `shares/reach` > 0,40 % a 7 días |
| Guardarraíles | Métricas que no deben empeorar | `reels_skip_rate` ≤ 68 %; me gusta/alcance ≥ mediana |
| Gancho | Primer fotograma y texto en pantalla | Brasa real encendida + «CARTA DE OTOÑO · 2 OCT» |
| CTA y acción medible | Qué debe hacer quien lo ve | «Mándaselo a quien vienes» + historia con enlace de WhatsApp código `OTOÑO` |
| Condición de publicación | Normal, prueba, colaborativa o promocionada | Normal |
| Fecha y franja | Del calendario | Viernes 14:00-15:30 |
| Pie, hashtags y ubicación | Máximo 5 hashtags, nombre de plato y localidad | Ubicación: Alhaurín de la Torre |
| Audio | Original, biblioteca permitida para la cuenta o sin música | Sonido original de brasa |
| Etiqueta IA | Sí/no, con motivo | Sí: planos de plato generados |
| Dependencias | Metraje real, aprobaciones, colaborador | Metraje de brasa; confirmación de fecha y platos |
| Ruta de producción | Enlace al proyecto de Society | Proyecto con contrato de plano |

### 4.6 Historias con función

Una secuencia de historias se diseña como una pieza, con objetivo y fotogramas con papel:

1. **Fotograma 1, gancho.** Algo que pasa hoy y no es un título de portada.
2. **Fotogramas 2 a n-1, prueba.** Producto, proceso o disponibilidad real.
3. **Interacción.** Encuesta, pregunta o cuenta atrás, cuando sirva a la hipótesis.
4. **Acción.** Sticker de enlace a WhatsApp con código, o a la web de reservas.

Métricas por fotograma disponibles en la API: `reach`, `views`, `navigation` con desglose `TAP_FORWARD`, `TAP_BACK`, `TAP_EXIT` y `SWIPE_FORWARD`, `shares`, `link_clicks`, `profile_visits`, `follows` y `total_interactions`. **Solo durante 24 horas.** Con Instagram Login no existe el webhook `story_insights`, que es exclusivo de Facebook Login; hay que consultar antes de que expire. En historias creadas en Europa, `replies` devuelve 0. [R1][R3]

Indicadores derivados:

- **Salida del fotograma** = `TAP_EXIT` / `reach`. Mide rechazo.
- **Salto a otra cuenta** = `SWIPE_FORWARD` / `reach`. Mide desinterés por la secuencia.
- **Retención de secuencia** = alcance del fotograma n / alcance del fotograma 1.
- **Clic** = `link_clicks` / `reach` del fotograma con enlace.

Las respuestas se leen en la aplicación y se anotan a mano mientras la API no las entregue en Europa.

### 4.7 Checklist de publicación y primera hora

**Antes de publicar:**

- Pie con la información clave en las primeras líneas.
- Fecha y datos comerciales confirmados por escrito.
- De 3 a 5 hashtags y ubicación.
- Audio permitido para el tipo de cuenta.
- Etiqueta de IA decidida.
- Colaborador aceptado, si procede.
- Portada legible en la cuadrícula y márgenes seguros de la interfaz.
- Texto alternativo en las imágenes.

**Si la pieza lleva voz** (detalle en `Society_voces_y_subtitulos.md`):

- Subtítulos incrustados y revisados palabra por palabra: nombres de platos, precios y fechas.
- Voz generada declarada.
- Audio nativo de Seedance 2.5 revisado o desactivado, para que no contradiga la voz en off.
- Consentimiento escrito si se usa la voz de una persona real.

**Primera hora:**

- Compartir el Reel en historias. En el caso práctico, el 24 % de las visualizaciones del Reel 03 llegó desde historias.
- Enviarlo por WhatsApp a clientela habitual, equipo y familia.
- Responder los comentarios con frases reales.
- Fijar la pieza si es un aviso con fecha.

Es la parte gratuita del alcance y la que suele quedarse sin hacer de forma sistemática.

### 4.8 La cuenta propia de Society

Society tendrá su propio perfil en redes, con todo el contenido generado por la aplicación y orientado a hostelería. Aplica el mismo sistema que un restaurante, con estas diferencias:

| Aspecto | Restaurante cliente | Cuenta de Society |
| --- | --- | --- |
| Audiencia | Comensales de la zona | Hosteleros que pueden contratar |
| Objetivo final | Mesas ocupadas atribuibles | Solicitudes de demo y altas |
| Acción medible | Enlace de WhatsApp o reserva con código | Enlace a demo o formulario con código de campaña |
| Material | Fotos y clips del local | Ejemplos autorizados, piezas de demostración etiquetadas y procesos de la app |

**Pilares propuestos, a validar:**

1. **Antes y después.** La foto hecha con el móvil del hostelero frente a la pieza terminada; solo con restaurantes que lo autoricen por escrito.
2. **Formatos que funcionan.** Estructuras de reels e historias explicadas para hostelería.
3. **Errores habituales.** Carta ilegible, horario desactualizado, reseñas sin responder; conecta con el plan 1.
4. **Detrás de Society.** Cómo se comprueba que un plato no se inventa; refuerza la confianza en el contenido con IA.
5. **Novedades del producto.** Planes, funciones y casos.

**Por qué es el mejor banco de pruebas.** Al ser una cuenta propia usa el acceso estándar a la API de Instagram, sin App Review [R7]. La medición de la sección 5 puede construirse y probarse antes de tener clientes.

**Reglas:**

- No mostrar restaurantes, marcas ni personas reales sin autorización escrita.
- No presentar un local ficticio como si fuera real.
- Etiquetar el contenido generado con IA.
- Máximo 5 hashtags.

## 5 Parte de medición y retroalimentación

### 5.1 Diccionario de métricas

**Reels** (media insights, `media_product_type` REELS) [R1]

| Métrica API | Qué es | Indicador derivado | Diagnostica |
| --- | --- | --- | --- |
| `reels_skip_rate` | % de visualizaciones que saltaron en los 3 primeros segundos (estimada, en desarrollo) | — | Gancho y primer fotograma |
| `ig_reels_avg_watch_time` | Tiempo medio de reproducción | Visionado medio = valor / duración | Desarrollo y ritmo |
| `ig_reels_video_view_total_time` | Tiempo total, incluidas repeticiones | — | Interés sostenido |
| `views` | Reproducciones en Instagram, incluidas repeticiones | `views/reach` ≈ repeticiones | Bucle y relectura |
| `reach` | Cuentas únicas (estimada) | Denominador de todas las tasas | Distribución |
| `shares` | Veces compartido | `shares/reach` = tasa de envío | Motivo de reenvío |
| `likes` | Me gusta orgánicos | `likes/reach` | Afinidad |
| `saved` | Guardados | `saved/reach` | Utilidad o intención |
| `comments`, `reposts`, `total_interactions` | Interacciones | Por alcance | Conversación |
| `crossposted_views`, `facebook_views` | Reproducciones sumando Facebook | — | Solo si se comparte en Facebook |

La documentación oficial no indica la unidad de `ig_reels_avg_watch_time`. Fuentes secundarias afirman que son milisegundos. [R55] Hay que contrastarlo con la cifra de la app en un Reel conocido antes de calcular porcentajes.

`follows`, `profile_visits` y `profile_activity` solo existen en la API para publicaciones del feed e historias, no para Reels. [R1] En Reels se anotan desde la app o se aproximan con las métricas diarias de cuenta.

**Carruseles y fotos** (FEED): `views`, `reach`, `likes`, `comments`, `saved`, `shares`, `reposts`, `follows`, `profile_visits`, `profile_activity` con desglose `action_type` y `total_interactions`. No hay estadísticas de los elementos individuales de un carrusel. [R1]

**Cuenta** (por día) [R2]

| Métrica | Desglose útil | Uso |
| --- | --- | --- |
| `reach` | `follow_type` (FOLLOWER, NON_FOLLOWER, UNKNOWN), `media_product_type` | Proporción de alcance a no seguidores por formato y día |
| `views` | `follower_type`, `media_product_type` | Volumen por formato |
| `follows_and_unfollows` | `follow_type` | Crecimiento neto (cuentas con 100 o más seguidores) |
| `profile_links_taps` | `contact_button_type` | Acciones de contacto |
| `accounts_engaged`, `total_interactions`, `saves`, `shares`, `likes`, `comments` | `media_product_type` en varias | Tendencia semanal |
| `follower_demographics`, `engaged_audience_demographics` | edad, ciudad, país, género | Comprobar que la audiencia es local (requiere 100 seguidores o interacciones) |

Los desgloses solo se devuelven con `metric_type=total_value`. Las demografías devuelven los 45 primeros valores. `online_followers` solo cubre los últimos 30 días. [R2]

### 5.2 Ventanas de lectura y capturas

| Captura | Cuándo | Para qué | Estado |
| --- | --- | --- | --- |
| Historia final | Entre 20 y 23 h después de publicarla | Única lectura posible antes de que expire | Definitiva |
| +24 h | Reels y publicaciones | Señal temprana; decisión de compartir un Reel de prueba | Provisional |
| +72 h | Reels y publicaciones | Final de la ventana de Reels de prueba; primera comparación | Provisional |
| +7 días | Todo lo publicado | **Comparación estándar entre piezas** | Consolidada |
| +28 días | Todo lo publicado | Cola larga y cierre del mes | Final |
| Diaria | Métricas de cuenta del día anterior | Serie histórica más allá de los 90 días que conserva Meta | Recaptura a las 48 h |

Como los datos pueden retrasarse hasta 48 horas, cada captura guarda `capturado_en` y la edad de la pieza en horas. **Solo se comparan capturas de la misma edad**: un Reel de 7 días contra otro de 7 días, nunca contra uno de 3. Las métricas marcadas «en desarrollo» o «estimadas» pueden cambiar de definición, así que se almacena la respuesta cruda junto con la versión de la API. Meta devuelve un conjunto vacío, no un 0, cuando no hay dato: el sistema debe distinguir «sin dato» de «cero». [R1]

### 5.3 Líneas base y normalización

1. **Tasas, no absolutos.** Toda comparación se hace sobre alcance (envíos, me gusta y guardados por alcance) o sobre visualizaciones (tasa de salto).
2. **Mediana móvil por formato y condición.** Se toman las últimas 8 a 12 piezas del mismo formato y condición: normal, prueba, colaborativa o promocionada. Un Reel de prueba solo llega a no seguidores y no se compara con uno normal.
3. **Contexto marcado.** Restaurante cerrado, festivo, evento local, promoción pagada o publicación fuera de franja. El Reel de vinos blancos se publicó con el local cerrado y ese contexto explica parte de su alcance.
4. **Mínimo de muestra.** Con menos de 5 piezas comparables no se clasifica ninguna como ganadora: solo se describe.
5. **Correlaciones como exploración.** Con 21 publicaciones, un coeficiente de Spearman orienta pero no demuestra, y el análisis de 90 días ya lo trata así. Para decidir se usan repeticiones de la misma hipótesis.

Regla de clasificación inicial, adaptada del *deep research*:

- **Ganadora en su métrica principal**: ≥ 1,5 × mediana, sin empeorar los guardarraíles.
- **Patrón confirmado**: la misma variable gana en al menos 2 de 3 piezas.
- **Patrón descartado**: no gana en 3 intentos consecutivos.

La prioridad de decisión es: resultado de negocio (conversaciones, reservas) > envíos y guardados > tiempo de visionado > me gusta > seguidores.

### 5.4 Diagnóstico por síntomas

**Reels** (se aplica en orden y se asigna un único síntoma principal)

| Síntoma | Lectura | Acción siguiente |
| --- | --- | --- |
| Tasa de salto por encima de su mediana o del umbral interno | El gancho no detiene | Cambiar fotograma 1, texto en pantalla o acción inicial; mantener el resto |
| Salto correcto, visionado medio bajo | Se pierde después del gancho | Revisar duración, orden de planos y momento de la recompensa |
| Visionado correcto, tasa de envío baja | Gusta pero no tiene motivo de reenvío | Añadir noticia, fecha, plan o destinatario explícito |
| Envío correcto, alcance a no seguidores bajo | Poca distribución inicial | Revisar franja, huecos de calendario, primera hora y audio; probar como Reel de prueba |
| Alcance correcto, visitas y acciones de contacto bajas | El perfil no convierte | Enlace, horario, publicaciones fijadas, CTA |
| Acciones correctas, reservas bajas | Oferta o fricción operativa | Revisar respuesta a mensajes, disponibilidad y precio con el propietario |

**Carruseles**: pocos guardados → falta utilidad concreta; pocas visitas al perfil → falta especificidad (nombre del plato, procedencia, precio confirmado).

**Historias**: salida alta en el fotograma 1 → gancho; avance rápido y pocos clics → CTA o sticker poco claros; alcance de historias bajando varias semanas → frecuencia o relación, no una historia concreta.

### 5.5 Experimentos y registro de aprendizaje

Cada hipótesis se registra **antes** de publicar. Si se escribe después, cualquier resultado parece explicable.

| Campo | Contenido |
| --- | --- |
| ID y fecha | `H-TDV-07`, fecha de alta |
| Enunciado | Si… entonces… porque… |
| Variable | Qué cambia frente a la línea base |
| Métrica principal, umbral y ventana | Por ejemplo, `shares/reach` > 0,40 % a 7 días |
| Guardarraíles | Métricas que no deben empeorar |
| Piezas asignadas | IDs de brief |
| Resultado | Cifras por pieza a igual edad |
| Estado | Abierta, confirmada, refutada, sin datos suficientes |
| Decisión | Repetir, ajustar, abandonar o elevar a regla del restaurante |

Buenas prácticas:

- Una variable por pieza cuando se pueda.
- Reels de prueba para cambios de gancho con no seguidores, sabiendo que no admiten colaboración.
- Nunca dos hipótesis sobre la misma métrica en la misma pieza.
- Publicar también los resultados negativos en el informe.

Los patrones confirmados pasan a un **registro de aprendizajes** con evidencias (IDs y cifras), ámbito (este restaurante o candidato general) y fecha. En Society, un patrón confirmado en varios restaurantes se convierte en **recomendación inicial** para un restaurante nuevo, pero cada cuenta lo vuelve a validar con sus datos. Es la ventaja de gestionar 20 cuentas: se prueba antes lo que más probabilidades tiene de funcionar, sin dar por hecho que funcionará.

### 5.6 Informe semanal y mensual

**Informe semanal** (lunes, 30 minutos de lectura para la agencia; resumen de 5 líneas para el cliente):

1. Piezas publicadas con capturas de +7 días y de +72 h, marcando las provisionales.
2. Síntoma principal por pieza.
3. Estado de las hipótesis activas.
4. Máximo dos patrones para repetir, uno para dejar y una hipótesis nueva.
5. Decisiones que requieren al propietario (fechas, precios, colaboraciones, material real).
6. Huecos de captura o de calendario.

**Informe mensual**: evolución de medianas por formato, proporción de alcance a no seguidores, acciones de contacto, conversaciones con código, aprendizajes confirmados y propuesta de plan del mes siguiente.

## 6 Agentes tipo Windsurf como operadores de la estrategia

### 6.1 Estado verificado de Windsurf

| Fecha | Cambio | Fuente |
| --- | --- | --- |
| 2 jun. 2026 | Windsurf pasa a llamarse Devin Desktop; los planes y ajustes se conservan; el IDE sigue disponible tras el nuevo Agent Command Center | [R24] |
| 29 jul. 2026 | Asistente de migración de Cascade a skills («Devin: Open Cascade Migration Wizard») | [R25] |
| 8 sep. 2026 (v3.9.19) | **Cascade eliminado.** Devin Local es el único agente de Devin Desktop | [R25] |
| 10 sep. 2026 (v3.10.23) | Retirados los comandos de workflows y otros accesos heredados de Cascade | [R25] |

Devin Local admite skills, reglas y AGENTS.md, hooks, servidores MCP, subagentes, plugins y permisos detallados (denegar, preguntar, permitir) sobre lectura y escritura de ficheros, comandos, peticiones HTTP y herramientas MCP. **No admite Memories ni Workflows**; la documentación recomienda migrar ambos a skills. [R26] Los Workflows antiguos eran ficheros Markdown de hasta 12.000 caracteres invocados con `/nombre` [R31]: cualquier guía que hoy los recomiende está desactualizada.

Precios: la FAQ oficial dice que no cambiaron con el cambio de marca y que en Teams un puesto completo incluye 40 USD mensuales de uso. [R24] Comparativas de terceros hablan de Free, Pro a 20 USD, Max a 200 USD y Teams a 80 USD más 40 USD por puesto. No se pudo confirmar en la página oficial.

### 6.2 Equivalencias entre herramientas

| Necesidad | Devin Desktop (Devin Local) | Claude Code (ya usado en el proyecto) |
| --- | --- | --- |
| Reglas siempre activas | `AGENTS.md` en la raíz; también lee `AGENT.md` o `CLAUDE.md` [R27] | `CLAUDE.md` |
| Procedimientos repetibles | Skills en `.devin/skills/`, `.windsurf/skills/` o `.agents/skills/<nombre>/SKILL.md`; globales en `%APPDATA%\devin\skills\` en Windows; invocación `/nombre` o automática, controlada con `triggers` [R28] | Skills en `.claude/skills/<nombre>/SKILL.md` |
| Conocimiento persistente | Ficheros Markdown del repositorio o skills (no hay memorias) | Ficheros de memoria y del repositorio |
| Herramientas externas | MCP en `.devin/config.json` del proyecto, `.devin/config.local.json` fuera de git y `~/.config/devin/config.json` [R26] | MCP en configuración de proyecto o usuario |
| Automatismos locales | Hooks en `.devin/hooks.v1.json` [R27] | Hooks en ajustes |
| Especialistas | Subagentes en `.devin/agents/<nombre>.md` [R27] | Subagentes en `.claude/agents/` |
| Ejecución periódica | Devin en la nube: Automations con disparador de horario, recomendadas frente a Scheduled Sessions con cron [R30] | Rutinas programadas en la nube |

La CLI de Devin importa configuración de `.cursor/rules/`, `.windsurf/rules/` y `.claude/`, controlado por `read_config_from`. [R27] Devin en la nube descubre skills también en `.claude/skills/` y recomienda `.agents/skills/`. [R29] Conclusión práctica: **escribir las skills con el formato abierto `SKILL.md`, con `name` y `description`**, y verificar en el panel de personalizaciones de cada herramienta que aparecen. Los campos adicionales (`triggers`, `allowed-tools`) son extensiones que conviene comprobar en cada producto.

### 6.3 Repositorio de operación de marketing

Un repositorio por restaurante durante el piloto; en Society, los mismos conceptos pasan a tablas.

```
marketing-<restaurante>/
  AGENTS.md                      reglas del agente (también CLAUDE.md si se usa Claude Code)
  estrategia/
    negocio.md                   NAP, oferta, horarios y datos confirmados por el propietario
    situaciones-y-pilares.md     tabla de situaciones de consumo
    objetivos-y-umbrales.md      trimestre vigente
    reglas-publicacion.md        hashtags, IA, música, alcohol, personas
    diagnostico.md               árbol de la sección 5.4
  hipotesis/registro.md
  aprendizajes/registro.md       patrones confirmados y descartados con evidencias
  calendario/2026-10.md
  briefs/TDV-2026-09-30-R-carta-otono.md
  datos/                         exports o vistas; no se editan a mano
  informes/semanal/2026-W40.md
  .agents/skills/                o .claude/skills/, según la herramienta
```

Ejemplo de `AGENTS.md`:

```markdown
# Operación de redes — <restaurante>

- Las cifras salen de `datos/` o de consultas MCP de solo lectura. Nunca se inventan, completan ni redondean sin decirlo.
- Fechas, precios, platos y horarios solo desde `estrategia/negocio.md` o confirmación escrita del propietario.
- Toda propuesta de pieza usa el brief de 18 campos y declara objetivo, situación de consumo, métrica principal y umbral.
- Máximo 5 hashtags. Toda pieza con imagen o vídeo fotorrealista generado o alterado con IA lleva `etiqueta_ia: sí`.
- Publicar, programar o responder en nombre del restaurante requiere aprobación explícita.
- Separar siempre hecho, interpretación e hipótesis. Una sola pieza no convierte un patrón en regla.
- Los informes terminan con decisiones del cliente y bloqueos.
```

### 6.4 Skills propuestas

| Skill | Se invoca | Lee | Escribe |
| --- | --- | --- | --- |
| `plan-trimestral` | Manual, con el cliente | Negocio, aprendizajes, calendario de novedades | Objetivos, situaciones prioritarias, hipótesis principales |
| `plan-mensual` | Manual | Estrategia, informe mensual | Calendario, reparto por pilar, hipótesis del mes |
| `brief-pieza` | Manual o desde el calendario | Estrategia, calendario, reglas | Brief completo y dudas para el propietario |
| `checklist-publicacion` | Antes de publicar | Brief, reglas de publicación | Lista verificada o bloqueos |
| `diagnostico-pieza` | A +72 h o +7 días | Capturas, líneas base, árbol | Síntoma principal y siguiente acción |
| `revision-semanal` | Lunes | Capturas, hipótesis, aprendizajes | Informe semanal y propuestas de cambio |
| `auditoria-cuenta` | Alta de restaurante | 90 días de datos, perfil | Diagnóstico inicial al estilo del análisis de 90 días |

Ejemplo de `revision-semanal/SKILL.md`:

```markdown
---
name: revision-semanal
description: Revisión semanal del rendimiento de Instagram de un restaurante. Usar cuando se pida la revisión o el informe de la semana, o qué repetir y qué dejar de hacer.
---

# Revisión semanal

## Entradas
1. `estrategia/objetivos-y-umbrales.md`, `hipotesis/registro.md`, `aprendizajes/registro.md`.
2. Capturas de métricas de los últimos 14 días (consulta MCP de solo lectura o export del periodo).
3. `calendario/` del mes para comparar lo previsto con lo publicado.

## Pasos
1. Lista las piezas con ID, formato, condición (normal, prueba, colaborativa, promocionada), fecha y edad de cada captura. Señala capturas que falten.
2. Para cada pieza con captura de 7 días calcula tasa de salto, visionado medio sobre duración, envíos, me gusta y guardados por alcance. Compara con la mediana de las últimas 8 piezas del mismo formato y condición.
3. Aplica `estrategia/diagnostico.md` y asigna un único síntoma principal por pieza.
4. Actualiza el estado de cada hipótesis: confirmada, refutada o sin datos suficientes.
5. Escribe `informes/semanal/AAAA-Www.md`: hechos con ID y cifra, interpretación, dos patrones para repetir como máximo, uno para dejar, una hipótesis nueva y decisiones del propietario.

## Reglas
- Toda cifra sale de la consulta o del export.
- Las capturas de menos de 48 h se marcan como provisionales.
- No se modifica `estrategia/`: los cambios se proponen en el informe.
```

### 6.5 Conexiones MCP y permisos

| Conector | Fase | Qué aporta | Precaución |
| --- | --- | --- | --- |
| Metricool MCP (oficial) | 1 | Métricas, competidores, mejores horas, programación. Clientes documentados: Claude Code, Claude Desktop, Cursor, ChatGPT, Le Chat, Make, n8n, Gemini CLI [R32] | Devin no figura en la lista; probar la conexión manual. Bloquear herramientas de programación por permisos hasta que haya aprobación |
| Windsor.ai MCP | 1 | Datos de Instagram y otras fuentes hacia el agente, Looker Studio, Sheets o PostgreSQL; incluido en todos los planes [R34] | El plan gratuito limita el histórico |
| Supabase MCP (oficial) | 2-3 | Consultas a la base de datos propia | Usar `read_only` y `project_ref` para restringir a un proyecto y a lectura [R37] |
| Servidores MCP comunitarios de Meta | — | Acceso directo a la Graph API | No usar con tokens que permitan publicar; preferir ingesta propia |

En Devin Local, las herramientas MCP de escritura se niegan en permisos y se permiten las de lectura. [R26] Los tokens nunca van al repositorio: ficheros locales fuera de git o variables de entorno.

### 6.6 Periodicidad

El agente del editor trabaja cuando alguien lo abre. La periodicidad fiable no debe depender de él:

- **Captura de datos**: tareas programadas del servidor (Supabase Cron o n8n), sin modelo de lenguaje.
- **Informe semanal**: skill invocada el lunes por la persona responsable o, cuando haya datos en base de datos, una ejecución programada en la nube (Automations de Devin o rutinas de Claude Code) que solo lee datos y escribe un borrador.
- **Aprobación**: humana. El borrador no cambia la estrategia ni publica.

## 7 Hoja de ruta progresiva de herramientas

### 7.1 Cinco fases

| Fase | Momento | Herramientas | Coste mensual orientativo | Criterio para pasar a la siguiente |
| --- | --- | --- | --- | --- |
| 0 · Registro manual | Semanas 1-4 | Estadísticas de la app, hoja de registro de piezas y capturas, repositorio Markdown, skills en Devin Desktop o Claude Code | 0 € adicionales | 12 piezas con capturas a +24 h y +7 días; historias anotadas antes de 24 h; primera mediana por formato |
| 1 · Conectores | Meses 2-3 | Metricool o Windsor.ai con MCP, panel en Looker Studio, skill de revisión semanal | 0 a unos 55 € | 8 semanas de informes; dos hipótesis cerradas; calendario ajustado con datos |
| 2 · Ingesta propia | Meses 3-5 (TFG) | Instagram API con Instagram Login, Supabase Cron + Edge Functions, tablas de capturas, Supabase MCP de solo lectura | Dentro del presupuesto técnico de Society | 30 días sin huecos de captura; histórico propio más allá de 90 días; tokens renovados sin intervención |
| 3 · Society multirrestaurante | Piloto con varios clientes | Acceso avanzado con App Review, informe semanal generado por Astra, registro de aprendizajes compartido, publicación opcional con aprobación | Unos 4 USD de tokens por restaurante | Recomendaciones evaluadas: porcentaje que el cliente acepta y porcentaje que gana tras aplicarse |
| 4 · Mercado y conversión | Opcional | Business Discovery y búsqueda por hashtag (Facebook Login), Apify para tendencias agregadas, Google Business Profile, sistema de reservas | Variable | Solo si responde a una pregunta de negocio concreta |

### 7.2 Detalle por fase

**Fase 0.** Una hoja con dos pestañas:

- *Piezas*: ID, brief, formato, condición, fecha y hora, duración, hashtags, etiqueta IA y colaborador.
- *Capturas*: ID, edad en horas, alcance, visualizaciones, salto, tiempo medio, envíos, me gusta, guardados, visitas al perfil y seguidores.

Las historias se anotan esa misma noche. Las skills funcionan igual sobre la hoja exportada que sobre una base de datos, así que el paso a la fase 2 no cambia el proceso. Es la fase con la que puede empezar cualquier restaurante desde el primer día, y también la cuenta propia de Society.

**Fase 1.** Precios leídos el 14 de septiembre de 2026:

- **Metricool** [R33]. Plan gratuito con 1 marca, 30 días de histórico y 5 competidores. Starter en torno a 16-29 €/mes y Advanced en torno a 43-130 €/mes según marcas y periodicidad; Advanced añade Looker Studio y API. La página del MCP afirma que funciona con cualquier plan, incluido el gratuito. [R32] Dos lecturas de la página de precios dieron detalles distintos: confirmar en la calculadora antes de contratar.
- **Windsor.ai** [R34]. Plan gratuito con 30 días de histórico, que tras la prueba queda en 1 fuente y 1 cuenta. Basic a 19 USD/mes con facturación anual (23 USD mensual) con 3 fuentes, 75 cuentas e histórico ilimitado. Standard a 99 USD anual.

Para uno o dos restaurantes, el plan gratuito de cualquiera de los dos permite validar el proceso. Metricool encaja mejor si también se quiere programar y observar competidores; Windsor.ai si el destino es una base de datos o Looker Studio.

**Fase 2.** Es la parte con programación propia defendible en el TFG. Especificación, sin implementación:

- **Acceso.** Instagram API con Instagram Login: no necesita página de Facebook e incluye publicación, insights, comentarios y menciones. No incluye búsqueda por hashtag ni Business Discovery. [R6] Para cuentas propias o de usuarios con rol en la app basta el acceso estándar, sin App Review. [R7] Para servir a restaurantes ajenos hace falta acceso avanzado con App Review, que exige un screencast del flujo completo y la interfaz en inglés. [R7]
- **Tokens.** Los de larga duración caducan a los 60 días. Se renuevan si tienen al menos 24 horas y siguen válidos, con permiso `instagram_business_basic`. [R9] Tarea semanal que renueva los que tengan más de 30 días y alerta si una renovación falla.
- **Programación.** Supabase Cron (pg_cron) invoca Edge Functions con pg_net; los secretos van en Vault. [R36]

  | Tarea | Frecuencia |
  | --- | --- |
  | Descubrir publicaciones nuevas | Cada hora |
  | Historias que cumplen 20 h | Cada hora |
  | Capturas a +24 h, +72 h, +7 días y +28 días | Diaria |
  | Métricas de cuenta del día anterior, con recaptura a las 48 h | Diaria |
  | Renovación de tokens | Semanal |

- **Límites.** La API de Instagram aplica un límite por caso de uso de negocio: 4.800 llamadas por el número de impresiones de la cuenta en 24 horas. El uso se lee en la cabecera `X-Business-Use-Case-Usage` y el exceso devuelve el error 80002. [R8] Un restaurante genera unas decenas de llamadas diarias, muy por debajo del límite. Aun así, se respeta el tiempo estimado de recuperación que devuelve la cabecera.
- **Retención.** Las métricas de medios se conservan 2 años y las de cuenta 90 días. [R1][R3] Sin captura diaria propia se pierde la serie.

n8n es una alternativa visual a Supabase Cron: la edición Community autoalojada es gratuita y la nube empieza en 20 €/mes con facturación anual y 2.500 ejecuciones. [R35] Para el TFG, Supabase mantiene todo en el stack ya elegido.

**Fase 3.** Añade al Society ya diseñado:

- Aislamiento de tokens por restaurante.
- Informe semanal generado por Astra a partir de consultas, no de texto libre.
- Recomendaciones iniciales para restaurantes nuevos basadas en patrones confirmados en otros.
- Publicación opcional con la API de publicación: 100 publicaciones por cuenta cada 24 horas, JPEG como único formato de imagen, `trial_params` para pruebas, `collaborators` hasta 3 e `is_ai_generated` para la declaración de IA. [R4][R5]

Toda publicación automática pasa por aprobación del propietario y se bloquea si el brief no tiene decidida la etiqueta de IA.

**Fase 4.** Para competencia, primero la vía oficial:

- **Business Discovery** (solo con Facebook Login y cuenta vinculada a página): seguidores, número de publicaciones y `like_count`, `comments_count` y `view_count` de sus medios; `view_count` incluye pago y orgánico. No devuelve cuentas con restricción de edad. [R10]
- **Búsqueda por hashtag**: exige Facebook Login, la función Instagram Public Content Access y un máximo de 30 hashtags distintos cada 7 días. [R11]
- **Apify**: cobra entre 1,50 y 2,70 USD por cada 1.000 resultados, trabaja sin sesión sobre datos públicos, no devuelve compartidos y advierte de que algunos datos públicos son personales según el RGPD. [R38]

Complementos: Google Business Profile Performance API para acciones locales [R41] y el sistema de reservas del restaurante para cerrar la atribución.

### 7.3 Coste del análisis frente al de producción

| Partida para 20 restaurantes | Estimación |
| --- | --- |
| API de Instagram | Sin tarifa por llamada |
| Supabase, Vercel y R2 | Ya incluidos en el presupuesto técnico del informe de viabilidad |
| Astra: 4,35 informes semanales + 1 plan mensual por restaurante | ≈ 79 USD/mes (hipótesis de tokens de la sección 1) |
| Conector externo si no se construye la fase 2 | Según plan de Metricool o Windsor.ai para 20 cuentas; cotizar |
| Tiempo humano de revisión con el cliente | Ya reservado en los 30 minutos de soporte por cliente; puede quedarse corto |

Frente a unos 150 € de coste operativo por restaurante, la retroalimentación añade menos de 5 € de modelo. El riesgo económico no es el análisis; es producir sin él.

## 8 Cumplimiento que afecta a la estrategia

### 8.1 Contenido generado con IA

- **Meta.** Exige usar la herramienta de declaración al publicar vídeo fotorrealista o audio realista creado o alterado digitalmente, y puede aplicar sanciones si no se hace. La etiqueta «Información de IA» también puede aplicarse al detectar señales estándar del sector en el archivo. [R19][R20]
- **Reglamento de IA, artículo 50.4.** Desde el 2 de agosto de 2026, quien despliega un sistema que genera *deepfakes* debe declararlo. [R21][R22] La definición del artículo 3.60 incluye imágenes, audio o vídeo que se parezcan a **objetos, lugares o entidades existentes** y puedan parecer auténticos. Una imagen fotorrealista generada del comedor real o de un plato real de la carta encaja razonablemente en esa definición. Para obras evidentemente artísticas o creativas la obligación se limita, pero una pieza comercial que pretende mostrar el local real difícilmente se acoge a esa excepción.
- **Artículo 50.2.** Obliga a los proveedores de sistemas generativos a marcar la salida en formato legible por máquina. Según un acuerdo provisional del 7 de mayo de 2026, se aplaza al 2 de diciembre de 2026 para sistemas comercializados antes del 2 de agosto. [R23] Si Society ofrece su sistema de generación con nombre propio, podría tener obligaciones de proveedor además de las de sus clientes: requiere revisión jurídica.
- **Código de buenas prácticas.** La Comisión publicó el 10 de junio de 2026 un código voluntario con iconos de la UE para etiquetar. [R22]

Consecuencias operativas:

1. El brief decide la etiqueta y el sistema la aplica al publicar con `is_ai_generated` o manualmente en la app.
2. **Probar si el montaje en After Effects o la recodificación eliminan los metadatos de procedencia** de las imágenes generadas. Si se pierden, la detección automática de Meta no actuará y la declaración manual será la única garantía.
3. Etiquetar también las historias de reapertura del 9 de septiembre si se reutilizan, porque son imágenes fotorrealistas generadas del local real.
4. No esperar que la etiqueta cambie el alcance: no hay dato fiable en ningún sentido, como ya concluyó la lectura del Reel 03.

### 8.2 Música

Varias fuentes secundarias coinciden en que las cuentas de empresa solo acceden a un catálogo con licencia comercial (Meta Sound Collection, citado en torno a 14.000 pistas), mientras que personales y de creador ven un catálogo mayor pensado para uso no comercial. [R52] La ayuda de Meta sobre este tema no se pudo leer fuera de la app. Recomendación: no planificar piezas que dependan de una canción de tendencia; priorizar sonido original (brasa, cocina, voz) y comprobar en la app qué aparece para la cuenta concreta. Cambiar a cuenta de creador para acceder a más música no convierte en comercial una licencia que no lo es.

### 8.3 Vino y bebidas alcohólicas

La Ley 34/1988 remite la publicidad de bebidas de hasta 20 grados a la normativa audiovisual y a limitaciones reglamentarias orientadas a proteger la salud y a no inducir a un consumo indiscriminado. Prohíbe la de más de 20 grados donde esté prohibida su venta o consumo. [R43] En Andalucía, el artículo 25 de la Ley 4/1997 prohíbe la publicidad de bebidas alcohólicas en determinados centros e instalaciones y en patrocinios dirigidos a menores o deportivos. [R44] Un restaurante no es «usuario de especial relevancia»: el Real Decreto 444/2024 exige 300.000 € de ingresos por esa actividad y 1 millón de seguidores en una plataforma o 2 millones en total. [R45]

Reglas prudentes para el brief: sin menores, sin consumo excesivo, sin asociar alcohol a conducción ni a rendimiento, y destilados de más de 20 grados fuera del contenido promocional. Society atenderá restaurantes de varias comunidades: la lista debe revisarla un asesor y guardarse como regla versionada por territorio.

### 8.4 Datos personales, competencia y scraping

La AEPD archivó en noviembre de 2025 un caso de herramienta de *scraping* para tendencias porque la demostración solo mostró información agregada, sin personas identificables. Advirtió que, si se usaran datos personales, habría que cumplir la normativa. [R39] La sentencia estadounidense Meta contra Bright Data (enero de 2024) consideró que los términos de Meta no prohibían extraer datos públicos sin sesión iniciada. [R40] Es un precedente de EE. UU. y no resuelve el RGPD.

Pautas para Society:

- Competencia solo a nivel de cuenta profesional y en agregado.
- Sin guardar comentarios, nombres ni fotos de usuarios.
- Business Discovery antes que *scraping*.
- En atribución de reservas, código de campaña y número de comensales, sin nombres ni teléfonos.

### 8.5 Personas reales y colaboraciones

Se mantienen las reglas del caso Torre de Vega: consentimiento de empleados y colaboradores identificables antes de etiquetar o colaborar, y aceptación expresa de la publicación colaborativa por la otra cuenta. El brief registra quién dio el permiso y cuándo.

## 9 Arranque con un restaurante nuevo

Guía general para aplicar este sistema a cualquier restaurante que contrate el plan 2 o el plan 3. Los ejemplos proceden del caso práctico Torre de Vega y solo ilustran cómo se rellena cada paso.

### 9.1 Lista de arranque

| Paso | Qué se hace | Ejemplo del caso práctico |
| --- | --- | --- |
| 1. Revisar el contenido previo | Detectar prácticas obsoletas: más de 5 hashtags, audio de tendencia sin licencia comercial, IA sin declarar | Una guía de publicación recomendaba 11 hashtags [R16] |
| 2. Crear la línea base | Registrar las últimas 12 piezas con sus métricas (fase 0 de la sección 7) | Mediana de abandono a 3 s del 75 %; tasa de envío mediana del 0,22 % |
| 3. Rellenar situaciones de consumo y pilares | Tabla de la sección 4.3, confirmada por el propietario | «Hay una novedad con fecha» ante una reapertura |
| 4. Calendario de novedades reales | Aperturas, temporadas, eventos y fechas confirmadas | Reapertura tras vacaciones; carta de otoño |
| 5. Registrar las primeras hipótesis | Antes de publicar, con métrica, umbral y guardarraíl (sección 5.5) | Ver 9.2 |
| 6. Preparar la acción medible | Enlace de WhatsApp con código de campaña; botón de reserva si hay proveedor compatible | `https://wa.me/<número>?text=<mensaje con código>` |
| 7. Comprobar audio y etiqueta de IA | Catálogo musical disponible para la cuenta; etiqueta decidida en el brief | Sonido original de brasa en lugar de música sin licencia |
| 8. Capturar historias antes de 24 h | Anotar o capturar sus métricas la misma noche | — |

### 9.2 Ejemplo de registro de hipótesis

Así quedaría el registro de las primeras semanas en el caso práctico. Sirve de plantilla para cualquier restaurante.

| ID | Pieza | Hipótesis | Métrica y umbral a 7 días | Guardarraíl |
| --- | --- | --- | --- | --- |
| H-01 | Reel de reapertura | Aviso + fecha en pantalla desde el fotograma 1 hace que se reenvíe | `shares/reach` > 0,40 % | Salto ≤ 68 % |
| H-02 | Reel de oficio en colaboración con un profesional local | Publicar en colaboración lleva la pieza a no seguidores | Proporción de no seguidores ≥ 2 × mediana de Reels | Me gusta/alcance ≥ mediana |
| H-03 | Reel de carta de temporada con fecha | Réplica de H-01 para confirmar el patrón | `shares/reach` > 0,40 % | Salto ≤ 68 % |
| H-04 | Reel de proceso con acción real | Acción real en el fotograma 1 y primer plano de 2-2,5 s bajan el salto | `reels_skip_rate` < 65 % | Visionado medio ≥ mediana |
| H-05 | Carrusel de trazabilidad de un producto | Nombrar producto y procedencia genera visitas al perfil | `profile_visits` ≥ récord previo de la cuenta | Guardados/alcance ≥ mediana de carruseles |
| H-06 | Historias con enlace a WhatsApp y código | Un enlace directo con código convierte mejor que «reserva por WhatsApp» en texto | `link_clicks/reach` y conversaciones con código (primera medición = línea base) | Salida del fotograma 1 ≤ su mediana |

H-01 y H-03 prueban la misma variable. Si ambas superan el umbral, «aviso + fecha en pantalla» pasa a regla de ese restaurante y a patrón candidato para otros. Si solo una lo hace, queda como candidato.

### 9.3 Correcciones detectadas en los documentos del caso práctico

| Documento | Qué dice | Qué cambia |
| --- | --- | --- |
| `reel_03_publicacion.md` §4 | Lote de 11 hashtags en el primer comentario | Máximo 5, en el pie; no está publicado si los del comentario cuentan [R16] |
| `reel_03_publicacion.md` §5 | Audio de tendencia de la biblioteca de Instagram | Comprobar tipo de cuenta y catálogo disponible; priorizar sonido original [R52] |
| `deep-research-report.md` | 5-8 hashtags por pieza | Máximo 5 |
| `deep-research-report.md` | Apify primario e Instaloader de respaldo para competencia | Business Discovery primero; *scraping* solo agregado y sin datos personales [R10][R39] |
| `2026-09-09_reel-03_lectura-de-metricas.md` §3 | Recomienda marcar la IA sin base normativa europea | Añadir el artículo 50.4 (aplicable desde el 2 de agosto de 2026) y el parámetro `is_ai_generated` [R21][R5] |
| `plan_contenido_2026-09_a_12.md` §6 | Umbrales sin ventana de lectura | Umbrales leídos en la captura de +7 días; historias a +20-23 h |
| Informe de diseño de Society, §11.1 | Publicación automática como ampliación | Se mantiene; la medición mínima puede entrar antes (sección 10.5) |

## 10 Integración en Society

### 10.1 Módulos

| Módulo | Función | Relación con lo ya diseñado |
| --- | --- | --- |
| Estrategia | Objetivos, situaciones de consumo, pilares, umbrales por trimestre, versionados | Usa el mismo mecanismo de reglas versionadas del informe de diseño |
| Calendario y briefs | Plan mensual y brief de pieza | El brief crea el Proyecto de producción y su contrato de plano |
| Publicación | Checklist, datos de publicación, aprobación y, en ampliación, API | Recibe el entregable final del montaje |
| Medición | Conexión de cuenta, capturas, métricas de cuenta, contexto | Nueva cola de trabajos programados |
| Aprendizaje | Hipótesis, experimentos, patrones con evidencias | Alimenta planes y recomendaciones |
| Informes | Semanal y mensual con decisiones del cliente | Pantalla nueva junto a «Consumo y facturación» |

### 10.2 Entidades nuevas del modelo de datos

| Entidad | Información esencial |
| --- | --- |
| Cuenta social | tenant_id, plataforma, id de Instagram, tipo de cuenta, token cifrado, caducidad, permisos, estado de conexión |
| Periodo estratégico | Trimestre, objetivos, situaciones prioritarias, umbrales, versión y aprobación |
| Situación de consumo | Descripción, pilar, confirmada por, vigencia |
| Hipótesis | Enunciado, variable, métrica, umbral, ventana, guardarraíles, estado |
| Brief de pieza | Los 18 campos de la sección 4.5 y el proyecto de producción vinculado |
| Pieza publicada | id de medio, formato, fecha, duración, condición, etiqueta IA, hashtags, audio, brief |
| Captura de métricas | Pieza, capturado_en, edad en horas, respuesta cruda, versión de API, provisional/definitiva |
| Métrica diaria de cuenta | Fecha, métrica, desglose, valor, capturado_en |
| Evento de contexto | Cierre, festivo, evento local, promoción pagada, con fechas |
| Evento de conversión | Fecha, canal, código de campaña, pieza atribuida, comensales; sin datos personales |
| Patrón | Descripción, evidencias, estado, ámbito (restaurante o general), fechas |
| Informe | Periodo, contenido, decisiones propuestas, decisión del cliente |

### 10.3 Trabajos programados y recuperación

Estados de una captura: pendiente, en curso, capturada, sin dato, fallida por permisos, fallida por límite y expirada (solo historias). Cada captura es idempotente por pieza y edad objetivo: repetir la tarea no duplica filas. Un error de límite 80002 reprograma según el tiempo que indica la cabecera. Un token revocado pasa la cuenta a «requiere reconexión» y avisa al restaurante con una acción concreta, sin un error genérico.

### 10.4 Pruebas decisivas

- Una historia publicada a las 23:50 se captura antes de expirar, incluso con la tarea horaria retrasada.
- Un conjunto vacío de la API se guarda como «sin dato», no como 0.
- Las comparaciones rechazan capturas de edades distintas.
- El token se renueva antes de los 60 días; si falla, la alerta llega con margen.
- Un restaurante no puede leer tokens, capturas ni patrones de otro; los patrones generales solo contienen agregados.
- La publicación se bloquea con más de 5 hashtags o sin decisión de etiqueta IA.
- El cambio de nombre o la retirada de una métrica en una nueva versión de la API no rompe la ingesta.

### 10.5 Alcance hasta enero de 2027

El informe de diseño deja la publicación automática fuera del MVP, y se mantiene.

Con el foco en redes decidido el 15 de septiembre de 2026, el **módulo mínimo de medición** encaja mejor que antes. Se construye y prueba primero con la **cuenta propia de Society**, que usa acceso estándar a la API sin App Review [R7], y después se aplica al restaurante piloto. Incluye:

- capturas programadas de métricas;
- captura de historias antes de que desaparezcan sus estadísticas;
- registro de piezas;
- informe semanal.

Aporta programación propia verificable (OAuth, tareas programadas, idempotencia, series temporales, aislamiento) y cierra el ciclo que da sentido a la producción. Si el calendario hasta enero no lo permite, las fases 0 y 1 cubren la operación y el módulo queda documentado como ampliación.

## 11 Preguntas abiertas y bloqueos

1. **Tipo de cuenta de cada restaurante** (empresa o creador). Condiciona la música disponible.
2. **Unidad real de `ig_reels_avg_watch_time`**. Contrastar con la app en un Reel conocido.
3. **Hashtags en comentarios**. Instagram no ha publicado si cuentan para el límite; tratarlo como no fiable.
4. **Metadatos de procedencia tras el montaje en After Effects**. Prueba pendiente; decide si la etiqueta manual es obligatoria siempre.
5. **Papel de Society ante el artículo 50** (proveedor, responsable del despliegue o ambos). Requiere revisión jurídica antes de vender el servicio.
6. **Precios de Devin Desktop**. La página oficial no respondió; confirmar antes de presupuestar licencias.
7. **Planes de Metricool con MCP**. La página del MCP y la de precios no coinciden en detalle.
8. **Sistema de reservas de cada restaurante** (WhatsApp, teléfono u otro). Define cómo se registra el origen de cada reserva.
9. **Audiencia y línea editorial de la cuenta propia de Society**, y si se publica solo en Instagram o también en otras redes.
10. **Inclusión del módulo mínimo de medición en el TFG**. Decisión de Víctor según el calendario y la rúbrica del centro.

## 12 Fuentes

Consultadas el 14 de septiembre de 2026. «Secundaria» indica una fuente de tercero usada solo como pista y marcada en el texto.

**Meta e Instagram**

- [R1] Meta · Instagram Media Insights · https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights
- [R2] Meta · Instagram Account Insights · https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights
- [R3] Meta · Insights, Instagram Platform · https://developers.facebook.com/docs/instagram-platform/insights/
- [R4] Meta · Content Publishing · https://developers.facebook.com/docs/instagram-platform/content-publishing/
- [R5] Meta · IG User Media (parámetros de contenedor) · https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media/
- [R6] Meta · Overview of the Instagram API · https://developers.facebook.com/docs/instagram-platform/overview/
- [R7] Meta · App Review for Instagram API · https://developers.facebook.com/documentation/instagram-platform/app-review
- [R8] Meta · Graph API Rate Limiting · https://developers.facebook.com/docs/graph-api/overview/rate-limiting/
- [R9] Meta · Refresh Access Token · https://developers.facebook.com/docs/instagram-platform/reference/refresh_access_token/
- [R10] Meta · Business Discovery · https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/business-discovery
- [R11] Meta · IG Hashtag Search · https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-hashtag-search/
- [R12] Instagram · Instagram Ranking Explained (31 may. 2023) · https://about.instagram.com/blog/announcements/instagram-ranking-explained
- [R13] Social Media Today · Instagram Shares Algorithm Insights (22 ene. 2025) · https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/
- [R14] Social Media Today · Instagram engagement rates provide insight into reach (26 may. 2026) · https://www.socialmediatoday.com/news/instagram-engagement-rates-provide-insight-into-reach/821170/
- [R15] Social Media Today · Instagram improves Insights UI, adds new metrics (26 abr. 2026) · https://www.socialmediatoday.com/news/instagram-improves-insights-ui-adds-new-metrics/818504/
- [R16] Social Media Today · Instagram Implements New Limits on Hashtag Use (18 dic. 2025) · https://www.socialmediatoday.com/news/instagram-implements-new-limits-on-hashtag-use/808309/
- [R17] Instagram for Creators · Trial reels (10 dic. 2024) · https://creators.instagram.com/blog/instagram-trial-reels
- [R18] TechCrunch · Instagram restricts reach of content aggregators (30 abr. 2026) · https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/
- [R19] Meta · Labeling AI-Generated Images on Facebook, Instagram and Threads (6 feb. 2024) · https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/
- [R20] Meta · Our Approach to Labeling AI-Generated Content and Manipulated Media · https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/
- [R50] Instagram Help Center · Why search engines might index public Instagram photos · https://help.instagram.com/147542625391305/

**Normativa**

- [R21] Reglamento (UE) 2024/1689 · Artículo 50 · https://artificialintelligenceact.eu/article/50/
- [R22] Comisión Europea · Code of Practice on marking and labelling AI-generated content (10 jun. 2026) · https://digital-strategy.ec.europa.eu/en/news/commission-publishes-code-practice-marking-and-labelling-ai-generated-content
- [R23] Sidley Data Matters · EU AI Act Transparency Obligations (24 jun. 2026) · https://datamatters.sidley.com/2026/06/24/eu-ai-act-transparency-obligations-preparing-for-compliance-by-2-august-2026/
- [R39] AEPD · Herramientas de data scraping para la evaluación de tendencias (25 nov. 2025) · https://www.aepd.es/informes-y-resoluciones/criterios-juridicos-aepd/herramientas-data-scraping-para-evaluacion-de-tendencias
- [R40] Quinn Emanuel · Meta v. Bright Data · https://www.quinnemanuel.com/the-firm/news-events/client-alert-meta-v-bright-data-significant-decision-for-web-scraping-industry/
- [R43] BOE · Ley 34/1988, General de Publicidad · https://www.boe.es/buscar/act.php?id=BOE-A-1988-26156
- [R44] BOJA · Ley 4/1997, de Prevención y Asistencia en Materia de Drogas · https://www.juntadeandalucia.es/boja/1997/83/1
- [R45] BOE · Real Decreto 444/2024, usuarios de especial relevancia · https://www.boe.es/buscar/act.php?id=BOE-A-2024-8716

**Devin Desktop (antes Windsurf)**

- [R24] Devin Docs · Devin Desktop FAQ · https://docs.devin.ai/desktop/devin-desktop-faq
- [R25] Devin Docs · Devin Desktop changelog · https://docs.devin.ai/desktop/changelog
- [R26] Devin Docs · Devin Local Agent · https://docs.devin.ai/desktop/devin-local
- [R27] Devin Docs · CLI Extensibility · https://docs.devin.ai/cli/extensibility
- [R28] Devin Docs · Skills Overview · https://docs.devin.ai/cli/extensibility/skills/overview
- [R29] Devin Docs · Devin Skills · https://docs.devin.ai/product-guides/skills
- [R30] Devin Docs · Scheduled Sessions · https://docs.devin.ai/product-guides/scheduled-sessions
- [R31] Devin Docs · Workflows (Cascade, heredado) · https://docs.devin.ai/desktop/cascade/workflows

**Herramientas de datos y automatización**

- [R32] Metricool · MCP para Claude · https://metricool.com/metricool-mcp-claude/
- [R33] Metricool · Precios · https://metricool.com/pricing/
- [R34] Windsor.ai · Pricing · https://windsor.ai/pricing/
- [R35] n8n · Pricing · https://n8n.io/pricing/
- [R36] Supabase · Scheduling Edge Functions · https://supabase.com/docs/guides/functions/schedule-functions
- [R37] Supabase · MCP Server · https://supabase.com/docs/guides/ai-tools/mcp
- [R38] Apify · Instagram Scraper · https://apify.com/apify/instagram-scraper
- [R41] Google · Business Profile Performance API, DailyMetric · https://developers.google.com/my-business/reference/performance/rest/v1/DailyMetric
- [R42] WhatsApp · Cómo usar clic para chatear · https://faq.whatsapp.com/5913398998672934
- [R49] CoverManager · Integraciones · https://integraciones.covermanager.com/

**Estudios y marcos**

- [R46] Socialinsider · 2026 Instagram Organic Engagement Benchmarks · https://www.socialinsider.io/social-media-benchmarks/instagram
- [R47] PMQ, sobre la encuesta de Toast · How are guests discovering new restaurants · https://www.pmq.com/how-are-guests-discovering-new-restaurants-this-national-survey-has-answers/
- [R48] Jenni Romaniuk · Category Entry Points Dissected (8 abr. 2025) · http://www.jenniromaniuk.com/blog/2025/4/8/category-entry-points-dissected-how-they-really-contribute-to-growth

**Secundarias**

- [R51] PPC Land · Instagram content becomes searchable on Google starting July 10 (secundaria) · https://ppc.land/instagram-content-becomes-searchable-on-google-starting-july-10/
- [R52] MaaS · Why your Instagram business account can't use trending music (secundaria) · https://www.trymaas.com/blog/instagram-business-account-trending-music-risks/
- [R53] SocialPilot · How to schedule Reels on Instagram (secundaria) · https://www.socialpilot.co/blog/schedule-instagram-reels
- [R54] PostFast · Instagram Trial Reels in 2026 (secundaria) · https://postfa.st/blog/instagram-trial-reels
- [R55] Phyllo · Instagram Reels API analytics (secundaria) · https://www.getphyllo.com/post/real-time-reels-analytics-using-instagram-reels-api-iv

Las hipótesis de mezcla mensual, umbrales, tokens, frecuencias de captura y reglas de clasificación son propuestas de este informe y deben sustituirse por mediciones del piloto. Las referencias locales a Torre de Vega proceden de `base-conocimiento-torre-de-vega/` y conservan su fecha de origen.
