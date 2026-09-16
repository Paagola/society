# Society

**Automatización de contenido para redes sociales y presencia online de negocios de hostelería.**

| | |
|---|---|
| **Autor** | Víctor Pagola del Pino |
| **Ciclo** | 2º de Desarrollo de Aplicaciones Multiplataforma (DAM) |
| **Curso académico** | 2025/2026 |
| **Estado** | Fase de definición: el desarrollo no ha empezado |
| **Lanzamiento comercial previsto** | A partir de enero de 2027 (hipótesis) |
| **Última actualización** | 16 de septiembre de 2026 |

Este README es la **referencia principal del proyecto**: recoge qué es Society, las decisiones vigentes, la estructura prevista y las herramientas. Los documentos de la [sección 15](#15-documentos-del-proyecto) contienen el análisis y la evidencia que respaldan cada decisión, y la carpeta [`diagramas/`](./diagramas/) contiene el flujo completo dibujado.

## Índice

1. [Qué es Society](#1-qué-es-society)
2. [Naturaleza del proyecto](#2-naturaleza-del-proyecto)
3. [Público objetivo](#3-público-objetivo)
4. [Enfoque hasta enero de 2027](#4-enfoque-hasta-enero-de-2027)
5. [Planes de pago](#5-planes-de-pago)
6. [Flujo del producto](#6-flujo-del-producto)
7. [Diagramas del flujo](#7-diagramas-del-flujo)
8. [Arquitectura propuesta](#8-arquitectura-propuesta)
9. [Herramientas](#9-herramientas)
10. [Estrategia de redes y medición](#10-estrategia-de-redes-y-medición)
11. [Cumplimiento normativo](#11-cumplimiento-normativo)
12. [Calendario orientativo](#12-calendario-orientativo-hasta-enero-de-2027)
13. [Riesgos principales](#13-riesgos-principales)
14. [Decisiones](#14-decisiones)
15. [Documentos del proyecto](#15-documentos-del-proyecto)
16. [Estado actual y próximos pasos](#16-estado-actual-y-próximos-pasos)

---

## 1. Qué es Society

Society es una aplicación propia de tipo SaaS para negocios de hostelería que hace el trabajo de una agencia de marketing. Genera contenido para redes sociales a partir del local real, su carta y su marca; lo organiza con una estrategia; mide los resultados para mejorar las siguientes piezas; y, según el plan, gestiona la presencia del negocio en Google y en otras plataformas donde aparece.

**Propuesta de valor**

- **Fidelidad al negocio real.** El contenido parte de fotos y vídeos reales del local y de sus platos. Nada inventado: quien entra al local encuentra lo que vio en redes.
- **Criterio profesional integrado.** Estrategia, guion, producción, verificación de calidad y medición, en lugar de generar imágenes o vídeos sueltos.
- **Ritmo y coste que una agencia no alcanza.** Automatización con intervención humana solo cuando hace falta.

## 2. Naturaleza del proyecto

- **Proyecto propio con intención comercial.** La idea es empezar a vender a partir de enero de 2027, lo que deja unos **4 meses** de desarrollo desde mediados de septiembre de 2026.
- **También es el TFG, y todavía no está empezado.** La fase actual define la idea desde lo estructural: producto, planes, arquitectura, modelo de datos, herramientas, riesgos y decisiones. No hay código.
- **Torre de Vega no es el objetivo del proyecto.** Es el caso práctico real en el que se probó el flujo a mano y del que salen evidencias y aprendizajes. Sus reglas son **preferencias de ese cliente**: en Society se guardan como reglas por restaurante, no como reglas del producto.

### Filosofía del TFG

Este TFG se desarrolla **al 100 % por Víctor**. El uso de IA está permitido y es bienvenido, pero limitado a:

- Acompañamiento y guía técnica.
- Investigación y validación de ideas.
- Ayuda para definir un producto más profesional del que resultaría en solitario.

**No se usa IA para escribir el código de la aplicación.** Esa línea es intencionada y debe respetarse durante todo el proyecto.

### Contexto académico

El curso se trabaja principalmente con **React**, **TypeScript** y **Angular**, que formarán parte del stack. Víctor aporta además conocimientos previos del grado medio de **SMR** y experiencia práctica con **Supabase**, **Cloudflare R2**, despliegue en **Vercel** y buenas prácticas de seguridad de datos.

## 3. Público objetivo

**Hostelería en general:** restaurantes de cualquier tipo de cocina y gama, asadores, bares, cafeterías y gastrobares. Negocios que quieren presencia constante en redes y en Google sin contratar una agencia ni producir el contenido por su cuenta.

Consecuencia de diseño: el sistema se adapta a cada negocio mediante estilos, formatos, plantillas y reglas por cliente. No asume el caso de un asador rural.

## 4. Enfoque hasta enero de 2027

1. **Prioridad de desarrollo: contenido para redes sociales**: imágenes, posts, carruseles, historias y reels.
2. **Cuenta propia de Society en redes**, con todo el contenido generado por la propia aplicación.
3. **Google Business Profile y otras plataformas** (TripAdvisor y similares): se definen ahora en el modelo de datos y se solicitan los accesos. Su desarrollo va después del núcleo de redes; al lanzar se operarán de forma asistida si la automatización no está lista.

### 4.1 Cuenta propia de Society

Society tendrá su propio perfil en redes sociales, con contenido generado íntegramente por la aplicación y orientado a hostelería.

| Función | Qué aporta |
|---|---|
| Escaparate | Muestra a posibles clientes lo que Society es capaz de producir |
| Captación | Atrae a hosteleros interesados en contratar |
| Banco de pruebas | Permite probar todo el proceso, de la generación a la medición, con métricas reales antes de tener clientes. Al ser una cuenta propia usa acceso estándar a la API de Instagram, sin App Review |
| Contenido útil | Ideas, formatos y buenas prácticas para hosteleros |

**Por definir:** audiencia (el cliente es el hostelero, no el comensal), redes además de Instagram, línea editorial y material de partida. El [informe de estrategia de redes §4.8](informes/Society_estrategia_redes_y_retroalimentacion.md) propone pilares iniciales.

**Reglas desde el primer día:**

- No mostrar restaurantes, marcas ni personas reales sin autorización escrita.
- No presentar un local ficticio como si fuera real.
- Declarar el contenido generado con IA cuando corresponda (ver [sección 11](#11-cumplimiento-normativo)).
- Máximo 5 hashtags y música con licencia de uso comercial.

## 5. Planes de pago

Estructura **acumulativa**: cada plan incluye todo lo del anterior. Decidida el 15 de septiembre de 2026. **Nombres, precios y cantidades están pendientes**; los nombres de la tabla son provisionales.

| Plan | Incluye | Enfoque del contenido | Vídeo generado | Coste operativo relativo |
|---|---|---|---|---|
| **1 · Presencia en Google** | SEO local con Google Business Profile: datos y horarios, fotos, publicaciones, carta, reseñas y métricas | Sin contenido de redes | No | Bajo |
| **2 · Presencia + redes** | Plan 1 + gestión de redes sociales + gestión de otros sitios donde aparece el local (TripAdvisor y similares) | **Historias y posts** (imágenes y carruseles) por encima de reels | Muy poco, sobre todo para historias | Medio-bajo |
| **3 · Completo con reels** | Plan 2 + un número de reels al mes | **Reels** como formato principal | Sí, es la partida principal del plan | Alto |

### 5.1 Cuánto cuesta producir cada plan

El vídeo manda en el coste, y depende de la **ruta por tipo de plano**: Kling 3.0 en planos simples y Seedance 2.5 solo en acciones complejas (manos, cubiertos, cortes).

| Unidad | fal 1080p | fal 720p | Higgsfield 1080p (pendiente de contrato) |
|---|---|---|---|
| Reel estándar (8 imágenes, 4 planos simples con Kling 3.0 y 2 complejos con Seedance 2.5) | 25,82 USD | 13,38 USD | 12,97 USD |
| Clip de historia simple de 5 s (Kling 3.0) | 1,15 USD | 1,15 USD | 1,15 USD |
| Clip de historia complejo de 5 s (Seedance 2.5) | 9,04 USD | 3,86 USD | 3,68 USD |

Una imagen final independiente cuesta unos **0,31 USD**; la voz en off de un reel, unos 0,12 USD.

Con cuotas de ejemplo (plan 2 con 20 imágenes y 4 clips de historia; plan 3 con 4 reels con voz):

| Plan | Coste mensual por restaurante | Precio mínimo para un 40 % de margen |
|---|---|---|
| 1 | 41 € | 73 € |
| 2 | 76-82 € | 133-144 € |
| 3 | 136-200 € | 237-350 € |

El detalle está en el [informe de viabilidad §9.5 y §10](informes/Society_diseno_y_viabilidad.md). **El plan 3 no puede tener precio hasta decidir la resolución y el proveedor del vídeo.**

**Pendiente de definir por plan:**

- Precio mensual y si el alta (onboarding) se cobra aparte: la propuesta es 149-299 € por restaurante.
- Cuotas mensuales: publicaciones, historias, imágenes, vídeos para historias y reels.
- En el plan 1: si incluye respuesta a reseñas y cuántas publicaciones en la ficha.
- En el plan 2: qué plataformas cubre «otros sitios» y qué permite automatizar cada una. Lo que permite TripAdvisor no está verificado.
- Límite de revisiones por pieza y política ante resultados defectuosos.
- Política de exclusividad entre restaurantes de la misma zona y categoría.

**Dependencias:**

- **Los planes 1 y 2 usan Google Business Profile y directorios**, que no son el foco de desarrollo hasta enero. Al lanzar, esas partes se gestionarían de forma asistida.
- **La API de Google Business Profile no es pública.** Hay que solicitarla con una ficha verificada y activa durante al menos 60 días y una web asociada, y la aprobación es manual. Conviene pedirla pronto.

## 6. Flujo del producto

**Onboarding → estrategia → brief de pieza → producción → verificación → publicación → medición → aprendizaje → estrategia**

1. **Onboarding.** El restaurante configura una vez su identidad, platos, ubicaciones, estilo y restricciones. Se captan fotos y clips reales. Cada recurso queda etiquetado como real, generado o externo.
2. **Tres entradas de creación**: *inspirarme en un reel*, *crear desde un plato* y *comunicar una novedad*.
3. **Estrategia.** Objetivos, situaciones de consumo, pilares de contenido y calendario (trimestral, mensual, semanal).
4. **Brief de pieza.** Objetivo, audiencia, motivo para compartir, hipótesis, métrica principal y umbral, etiqueta de IA y dependencias.
5. **Producción.** Contrato de plano y elección de técnica antes que de modelo: material real, Kling 3.0 para planos simples, Seedance 2.5 para interacciones complejas, composición en After Effects o 3D experimental. Voz en off y subtítulos cuando la pieza los necesita.
6. **Verificación.** Controles antes de gastar, después de generar y después de montar. Bloqueos directos: ingredientes cambiados, objetos duplicados, texto comercial incorrecto, manos deformadas o una voz que dice una fecha o un precio distinto del guion.
7. **Publicación.** Asistida, con lista de verificación; por API como ampliación.
8. **Medición y aprendizaje.** Capturas de métricas en fechas fijas, comparación con la línea base del restaurante y registro de hipótesis y patrones confirmados.

El usuario **no aprueba cada paso**: elige intención y producto y revisa la pieza terminada. Hay un modo opcional para revisar el guion antes de generar vídeo, y las decisiones que no se pueden inferir (precios, fechas, ingredientes) siempre las confirma el propietario.

## 7. Diagramas del flujo

La carpeta [`diagramas/`](./diagramas/) contiene el recorrido completo en 16 diagramas, generados con [archify](https://github.com/tt-a1i/archify) (MIT). Cada uno tiene su especificación JSON (la fuente) y su HTML (se abre en el navegador, con búsqueda, temas y exportación).

| # | Diagrama | Qué explica |
|---|---|---|
| 00 | Arquitectura y servicios externos | Piezas del sistema y con qué servicio externo habla cada una |
| 01 | Alta y configuración | Recorrido del propietario hasta activar el ciclo |
| 02 | Pago y suscripción | Stripe: Checkout, webhooks firmados, impagos y bajas |
| 03 | Conexión de cuentas | OAuth de Instagram y Google, tokens y renovación |
| 04 | Material real y catálogo | Subida firmada, inspección, revisión y confirmación |
| 05 | Diagnóstico, estrategia y activación | Línea base, pilares, muestras de estilo y voz |
| 06 | Ciclo semanal | La semana automatizada y sus puertas humanas |
| 07 | Producción de imágenes | Nano Banana Pro, verificación y reparación acotada |
| 08 | Producción de vídeo | Ruta por acción, cola del proveedor, verificación |
| 09 | Voz y subtítulos | Voz desde el guion y tiempos medidos |
| 10 | Montaje y render | Lista de edición y worker de After Effects |
| 11 | Aprobación y publicación | Contenedor de Instagram y ficha de Google |
| 12 | Medición y aprendizaje | De las métricas al plan de la semana siguiente |
| 13 | Ficha de Google y reseñas | Reseñas, respuestas aprobadas y métricas locales |
| 14 | Estados de un trabajo | Vida de un trabajo de generación y su recuperación |
| 15 | Estados de una pieza | Vida de una pieza, del brief a la medición |

El recorrido narrado, con los datos de cada API verificados en su documentación oficial, está en [`informes/Society_flujo_de_la_aplicacion.md`](informes/Society_flujo_de_la_aplicacion.md).

## 8. Arquitectura propuesta

| Componente | Tecnología propuesta | Función |
|---|---|---|
| Interfaz | **React + TypeScript** o **Angular** (una sola, decisión pendiente) | Web adaptable o PWA para restaurantes |
| Backend | TypeScript | Proyectos, permisos, planes, presupuestos, trabajos |
| Base de datos y autenticación | Supabase (PostgreSQL + Auth) | Datos de todos los clientes, aislados por restaurante |
| Archivos | Cloudflare R2 con URL firmadas | Fotos, clips, pistas de voz, entregables |
| Despliegue | Vercel | Interfaz y operaciones cortas |
| Cola de trabajos | PostgreSQL con bloqueo, reintento y recuperación | Todas las etapas de producción |
| Tareas programadas | Supabase Cron (pg_cron + pg_net) + Edge Functions | Publicación, capturas de métricas, renovación de tokens |
| Worker de montaje | Windows con After Effects (aerender) | Montaje en plantillas, rótulos y subtítulos |
| Worker de medios | Linux | Inspección con FFmpeg, transcripción y alineación, 3D experimental |
| Pagos | Stripe (Payments + Billing) | Suscripciones de los tres planes |
| Correo | Resend | Notificaciones |

**Principios:**

- **Multi-restaurante desde el inicio.** Cada consulta, recurso y trabajo lleva el identificador del restaurante; se prueba el aislamiento entre clientes.
- **Trabajos recuperables e idempotentes.** Una caída no repite generaciones pagadas: el identificador remoto se guarda antes de esperar al proveedor.
- **Reglas de marca como datos versionados**, con identificador estable, fecha y alcance.
- **Claves de proveedores y tokens solo en el servidor.**
- **Presupuesto reservado por proyecto y por plan.**

### 8.1 Modelo de datos: entidades principales

| Área | Entidades |
|---|---|
| Negocio y suscripción | Restaurante, Miembro, Plan, Suscripción, Registro de consumo |
| Catálogo | Producto, Ubicación, Recurso (real, generado o externo) |
| Marca | Regla versionada, Plantilla, Voz de marca |
| Estrategia | Periodo estratégico, Situación de consumo, Hipótesis, Calendario |
| Producción | Brief de pieza, Proyecto, Escena y contrato de plano, Intento de generación, Pista de voz, Subtítulos, Evaluación, Trabajo de montaje |
| Redes | Cuenta social, Pieza publicada, Captura de métricas, Métrica diaria de cuenta, Patrón aprendido |
| Presencia local (planes 1 y 2) | Ficha de Google, Horario especial, Reseña, Respuesta a reseña, Ficha externa |
| Resultados | Evento de conversión (canal, código de campaña, pieza atribuida), sin datos personales innecesarios |

Horarios, carta, fotos reales y calendario de novedades son **datos únicos** que se publican en varios canales. Dejarlo previsto ahora evita rehacer tablas al añadir los planes 1 y 2.

## 9. Herramientas

Estado a 16 de septiembre de 2026. Tarifas detalladas en el [informe de viabilidad §9](informes/Society_diseno_y_viabilidad.md).

| Función | Herramienta | Estado |
|---|---|---|
| Planificación, prompts, revisión y dirección de edición | GPT-6 Astra (API de OpenAI) | Propuesta |
| Generación y edición de imágenes | Nano Banana Pro (`gemini-3-pro-image`, Gemini API); marca SynthID en toda salida | Propuesta |
| **Vídeo · planos simples** | **Kling 3.0**: producto con movimiento simple, desplazamientos cortos | **Ruta por defecto** (regla del 15/09/2026) |
| **Vídeo · acciones complejas** | **Seedance 2.5**: manos, cubiertos, cortes e interacciones; clips de 4 a 30 s, fotograma final y audio opcional | **Ruta para planos difíciles**. Resolución (720p o 1080p) y proveedor (fal o Higgsfield) pendientes |
| Alternativas de vídeo documentadas | Seedance 2.0, Veo 3.1 | Solo si un ensayo concreto lo justifica |
| Voz en off | ElevenLabs (API; voces de español de España) | Propuesta principal, pendiente de una prueba a ciegas frente a Azure, Gemini TTS y Qwen3-TTS ([informe de voces](informes/Society_voces_y_subtitulos.md)) |
| Subtítulos | Marcas de tiempo de la voz generada; faster-whisper o WhisperX con alineación cuando el proveedor no las da; incrustados en After Effects o FFmpeg | Propuesta, con el ensayo del 15/09 como evidencia |
| Montaje y rótulos | After Effects con plantillas y render automatizado | Validado en el caso práctico; licencia para uso SaaS por verificar |
| Inspección y codificación de medios | FFmpeg | Propuesta |
| Instagram | Instagram API con Instagram Login: publicación, estadísticas, comentarios | Acceso estándar para la cuenta propia; App Review para cuentas de clientes |
| Google | Google Business Profile APIs: reseñas, publicaciones, métricas | Requiere solicitud de acceso |
| Analítica en fases tempranas | Metricool o Windsor.ai (con conector MCP) | Opcional hasta tener ingesta propia |
| Diagramas de arquitectura y flujo | archify (MIT) | En uso: carpeta `diagramas/` |
| 3D del local | COLMAP, gsplat, Blender | Experimental; fuera del lanzamiento |
| Apoyo con IA a investigación y documentación | Claude Code; Devin Desktop (antes Windsurf) | Solo investigación y documentación, **nunca código de la app** |

**Sobre la elección de modelo de vídeo:**

- **Criterio por acción, no por marca.** El contrato de plano clasifica la acción antes de estimar el coste. Es un criterio de selección, no una garantía técnica de superioridad.
- **Diferencia de coste medida.** En el preflight del 15/09, Seedance 2.5 de 6 s a 1080p costó 54 créditos y Kling 3.0 Pro de 6 s, 10,5 créditos. Resolver con Kling los planos simples baja el reel de unos 45 a unos 26 USD.
- **Pendiente.** El ensayo de calidad del TFG compara 720p reescalado y 1080p nativo, y planos simples con los dos modelos.

## 10. Estrategia de redes y medición

Resumen del [informe de estrategia de redes](informes/Society_estrategia_redes_y_retroalimentacion.md):

- **Cuatro niveles de decisión:** estrategia trimestral, plan mensual, operación semanal y brief de cada pieza.
- **Papel de cada formato:** reels para descubrimiento, carruseles para decisión, historias para relación y conversión inmediata, fotos para avisos. El plan 2 se apoya en historias y posts; el plan 3, en reels.
- **Gancho.** El momento que justifica ver la pieza va al principio: el ensayo del 15/09 prefirió 9 s con adelanto frente a 15 s lentos.
- **Métricas oficiales por API**, capturadas a +24 h, +72 h, +7 días y +28 días. Las historias se capturan antes de 24 h porque sus estadísticas desaparecen.
- **Comparación** con la mediana de las últimas piezas del mismo formato, nunca con valores absolutos.
- **Registro de hipótesis y aprendizajes.** Un patrón solo se convierte en regla si se repite.
- **Herramientas progresivas:** registro manual → conectores con MCP → ingesta propia en Supabase → aprendizaje entre restaurantes.

## 11. Cumplimiento normativo

Resumen; requiere revisión de un asesor antes de vender.

| Tema | Obligación o límite | Aplicación en Society |
|---|---|---|
| Contenido generado con IA | Meta exige declarar vídeo fotorrealista o audio realista creados o alterados; el artículo 50 del Reglamento de IA obliga a declarar *deepfakes* desde el 2 de agosto de 2026 | Etiqueta decidida en cada brief; parámetro `is_ai_generated` al publicar por API |
| Voz de personas reales | La Ley Orgánica 1/1982 exige consentimiento expreso para usar la voz de una persona con fines publicitarios | Consentimiento escrito por voz y finalidad; voces diseñadas o de biblioteca por defecto |
| Hashtags | Máximo 5 por publicación desde diciembre de 2025 | Validación antes de publicar |
| Música | Las cuentas de empresa tienen catálogo comercial limitado | Sonido original o música con licencia |
| Reseñas | Google prohíbe incentivos y presión; el Real Decreto-ley 24/2021 sanciona las reseñas falsas | Society nunca genera, filtra ni condiciona reseñas |
| Comunicaciones comerciales | Artículo 21 de la LSSI: consentimiento previo o cliente previo con derecho de oposición | Consentimiento registrado antes de enviar promociones |
| Alérgenos | Real Decreto 126/2015: información disponible antes de pedir | Cartas generadas con alérgenos confirmados por el propietario |
| Bebidas alcohólicas | Ley 34/1988 y normativa autonómica | Reglas por territorio; anuncios solo a mayores de 18 años |
| Colaboraciones con creadores | Código de conducta de Autocontrol (desde el 1/10/2025) | Identificar la publicidad en cada formato |
| Datos personales | RGPD y criterio de la AEPD sobre *scraping* | Competencia solo en agregado; mínimos datos de clientes |

## 12. Calendario orientativo hasta enero de 2027

Propuesta alineada con el calendario del [informe de viabilidad §11.2](informes/Society_diseno_y_viabilidad.md); se ajustará al calendario y a la rúbrica del centro.

| Periodo | Objetivo | Resultado verificable |
|---|---|---|
| 15 sep – 4 oct | Cerrar la definición | Cuotas de los planes, resolución y proveedor de vídeo, modelo de datos, elección React o Angular, solicitudes de acceso a Meta y Google, cuenta propia de Society creada |
| 5 oct – 1 nov | Base de la aplicación | Autenticación, aislamiento entre restaurantes, catálogo, subida de recursos, reglas de marca versionadas |
| 2 nov – 29 nov | Imágenes, posts e historias (núcleo del plan 2) | Brief de pieza, generación y verificación de imágenes, plantillas de historias, calendario, publicación asistida; la cuenta de Society empieza a publicar |
| 30 nov – 20 dic | Vídeo y reels (plan 3) | Clips por ruta (Kling 3.0 y Seedance 2.5), voz en off y subtítulos, montaje automático, medición en Instagram |
| 21 dic – 10 ene | Preparación comercial | Google Business Profile mínimo o asistido (plan 1), cobro con Stripe, pruebas decisivas, piloto y documentación |
| Enero de 2027 | Posible lanzamiento | Primeros restaurantes de pago |

## 13. Riesgos principales

| Riesgo | Mitigación |
|---|---|
| **Plazo de 4 meses** para producto y TFG | Priorizar el núcleo del plan 2 (imágenes, posts, historias) y dejar el resto preparado en el modelo de datos |
| **Accesos externos** (revisión de Meta, API de Google Business Profile) con plazos que no dependen del proyecto | Solicitarlos en las primeras semanas; operar de forma asistida mientras tanto |
| **Coste del vídeo** (plan 3): a 1080p en fal, un reel cuesta unos 26 USD con la ruta híbrida y unos 63 si todo se hace con Seedance | Ruta por tipo de acción; decidir resolución y proveedor con el ensayo; resolver planos con material real; límites por plan y reintentos acotados |
| **Planes 1 y 2 dependen de funciones fuera del foco** | Operación asistida al lanzar; automatización después de enero |
| **Confianza y cumplimiento del contenido con IA** (imagen, vídeo y voz) | Priorizar material real, no inventar, etiquetar, consentimiento para voces reales |
| **Competencia**: plataformas de reseñas y ficha desde unos 99 € por local; agencias de 500 a 1.500 € al mes | Diferenciarse por contenido fiel al local y por el sistema completo de estrategia y medición |

## 14. Decisiones

### 14.1 Tomadas

| Fecha | Decisión | Detalle |
|---|---|---|
| 2026-09-16 | El flujo completo queda documentado en 16 diagramas de archify | Sección 7 y [flujo de la aplicación](informes/Society_flujo_de_la_aplicacion.md) |
| 2026-09-15 | Society es un proyecto propio para toda la hostelería; Torre de Vega es solo el caso práctico | Secciones 2 y 3 |
| 2026-09-15 | Venta posible a partir de enero de 2027 | Sección 2 |
| 2026-09-15 | Hasta enero, el desarrollo se centra en contenido para redes | Sección 4 |
| 2026-09-15 | Society tendrá una cuenta propia en redes con contenido generado por la app | Sección 4.1 |
| 2026-09-15 | Tres planes acumulativos: Google → + redes (historias, posts y otros sitios) → + reels | Sección 5 |
| 2026-09-15 | **Modelo de vídeo por tipo de acción**: Kling 3.0 en planos simples y Seedance 2.5 en manos, cubiertos y cortes | Sección 9 y [aprendizajes del reel](base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/aprendizajes-reel-chuleton.md) |
| 2026-09-14 | Una sola tecnología de interfaz (React + TypeScript o Angular), no ambas | [Viabilidad §7.1](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-14 | GPT-6 Astra planifica, redacta prompts, revisa y dirige la edición | [Viabilidad §1](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-14 | El 3D del local es un módulo experimental, no un requisito del onboarding | [Viabilidad §8](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-08 | Montaje en After Effects automatizado, validado en el caso práctico | [Base de conocimiento](base-conocimiento-torre-de-vega/README.md) |

### 14.2 Pendientes

1. Nombres, precios y cuotas mensuales de los tres planes.
2. **Resolución (720p o 1080p) y proveedor (fal o Higgsfield)** para Seedance 2.5, que deciden el precio del plan 3.
3. Proveedor de voz tras la prueba a ciegas del informe de voces.
4. React + TypeScript o Angular.
5. Cuenta propia de Society: redes, audiencia, línea editorial y material de partida.
6. Qué plataformas cubre «otros sitios» en el plan 2 y qué permite automatizar cada una.
7. Si el plan 1 se lanza en enero de forma asistida o se retrasa hasta automatizarlo.
8. Dónde corre el orquestador de trabajos y con cuántos workers en paralelo.
9. Papel de Society ante el Reglamento de IA (proveedor, responsable del despliegue o ambos), con revisión jurídica.
10. Licencia de After Effects para uso en un servicio SaaS.

## 15. Documentos del proyecto

| Documento | Contenido | Estado |
|---|---|---|
| [`diagramas/`](./diagramas/) | 16 diagramas del flujo completo (JSON de origen y HTML navegable) | Nuevo (16/09) |
| [`informes/Society_flujo_de_la_aplicacion.md`](informes/Society_flujo_de_la_aplicacion.md) | Recorrido del alta al ciclo semanal, funcionalidad por funcionalidad, con los datos de cada API verificados | Nuevo (16/09) |
| [`informes/Society_diseno_y_viabilidad.md`](informes/Society_diseno_y_viabilidad.md) | Diseño del producto, método de vídeo, arquitectura, costes y viabilidad | Actualizado el 15/09 con la ruta por tipo de acción; el PDF corresponde a la versión del 14/09 |
| [`informes/Society_estrategia_redes_y_retroalimentacion.md`](informes/Society_estrategia_redes_y_retroalimentacion.md) | Estrategia de redes, métricas, ciclo de retroalimentación, cuenta propia, herramientas por fases | Actualizado el 16/09 con el aprendizaje del gancho |
| [`informes/Society_auditoria_estrategica_y_mejoras.md`](informes/Society_auditoria_estrategica_y_mejoras.md) | Campos estratégicos de una agencia de hostelería, huecos, vulnerabilidades, formación | Actualizado el 16/09 |
| [`informes/Society_voces_y_subtitulos.md`](informes/Society_voces_y_subtitulos.md) | ElevenLabs, servicios en la nube y modelos gratuitos de voz; subtítulos; comparativa y prueba a ciegas | Actualizado el 16/09 con la evidencia del ensayo |
| [`informes/Society_inventario_documental.md`](informes/Society_inventario_documental.md) | Inventario de los archivos analizados | Referencia |
| [`base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/`](./base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/) | Aprendizajes, receta y evidencia del reel del 15 de septiembre | Evidencia del ensayo |
| [`base-conocimiento-torre-de-vega/`](./base-conocimiento-torre-de-vega/) | Reglas, metodología de prompting, automatización de After Effects, guiones e informes del caso práctico | Evidencia; no define el producto |
| [`idea.md`](./idea.md) | Definición inicial: problema, propuesta de valor, flujo por fases | Parcialmente superado |
| [`caso-practico-01-torre-de-vega.md`](./caso-practico-01-torre-de-vega.md) | Primera ejecución real del flujo completo | Registro histórico |
| [`investigacion-calidad-profesional-reels-ia.md`](./investigacion-calidad-profesional-reels-ia.md) | Cómo acercar el vídeo con IA a calidad de agencia | Investigación de referencia |

## 16. Estado actual y próximos pasos

📌 **Fase de definición** (16 de septiembre de 2026). No hay código ni stack cerrado.

**Próximos pasos:**

1. Cerrar cuotas y precios de los tres planes con los costes del informe de viabilidad.
2. Decidir resolución y proveedor de vídeo; confirmar en la primera prueba las dimensiones reales y el importe facturado.
3. Elegir React + TypeScript o Angular según los requisitos del centro.
4. Definir la cuenta propia de Society: red, audiencia y línea editorial.
5. Solicitar los accesos a la API de Instagram y a la API de Google Business Profile.
6. Cerrar el modelo de datos con las entidades de la sección 8.1.

La base de conocimiento está sincronizada con el caso práctico Torre de Vega a fecha de 2026-09-15 (ver la tabla de sincronizaciones en [`base-conocimiento-torre-de-vega/README.md`](./base-conocimiento-torre-de-vega/README.md)).
