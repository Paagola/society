<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](README.md).

# Society

**Automatización de contenido para redes sociales y presencia online de negocios de hostelería.**

| | |
|---|---|
| **Autor** | Víctor Pagola del Pino |
| **Ciclo** | 2º de Desarrollo de Aplicaciones Multiplataforma (DAM) |
| **Curso académico** | 2025/2026 |
| **Estado** | Fase de definición: el desarrollo no ha empezado |
| **Lanzamiento comercial previsto** | A partir de enero de 2027 (hipótesis) |
| **Última actualización** | 22 de septiembre de 2026 |

Este README es la **referencia principal del proyecto**: recoge qué es Society, las decisiones vigentes, la estructura prevista y las herramientas. Los documentos de la [sección 15](#15-documentos-del-proyecto) contienen el análisis y la evidencia que respaldan cada decisión. Los diagramas externos antiguos no están disponibles; los estados actuales se documentan en los informes vigentes.

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

### 5.1 Coste y presupuesto vigentes

Las tablas mensuales del 15/09 se conservan como escenarios históricos, no como precios actuales. El [informe de producción §6](informes/higgsfield/05-automatizacion-de-produccion.md) separa créditos MCP, USD REST, render, revisión y obligaciones inciertas. Preflight de 22/09: imagen 2K 2 cr; Kling pro 3 s sin audio 5,25 cr; Seedance 10 s/1080p sin audio 120 cr. Cotización sin referencias concretas, no generación verificada.

No hay equivalencia USD/crédito MCP comprobada con factura. El 0,063 procede de un ejemplo REST y el 0,050 es supuesto histórico. Una pieza ilustrativa de siete beats suma 155 cr sin correcciones y 229 cr con factores históricos de reintento, más costes propios. Los precios/cuotas comerciales siguen pendientes del piloto, de la factura y del tiempo humano real.

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
5. **Producción.** Contrato de plano y elección de técnica antes que de modelo: material real, Kling 3.0 para planos simples, Seedance 2.5 para interacciones complejas, composición en Remotion; 3D experimental fuera del núcleo. Voz en off y subtítulos cuando la pieza los necesita.
6. **Verificación.** Controles antes de gastar, después de generar y después de montar. Bloqueos directos: ingredientes cambiados, objetos duplicados, texto comercial incorrecto, manos deformadas o una voz que dice una fecha o un precio distinto del guion.
7. **Publicación.** Asistida, con lista de verificación; por API como ampliación.
8. **Medición y aprendizaje.** Capturas de métricas en fechas fijas, comparación con la línea base del restaurante y registro de hipótesis y patrones confirmados.

Dos puertas por pieza: **G1**, lote de keyframes/plan antes de animar; **G2**, render final antes de publicar. **G0** aprueba al dar de alta o cambiar marca/personaje. Los datos comerciales nuevos los confirma el propietario. Entre puertas opera el sistema; el silencio nunca aprueba.

## 7. Diagramas del flujo

Se retiran las referencias a los 16 HTML/JSON de `diagramas/`: no existen en este repositorio. No se han reconstruido ni presentado como recuperados. El [flujo narrado](informes/Society_flujo_de_la_aplicacion.md), la [máquina de estados de producción](informes/higgsfield/05-automatizacion-de-produccion.md) y el [bucle estratégico](informes/Society_cerebro_estrategico.md) son las representaciones vigentes, con Mermaid integrado en los dos últimos.

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
| Worker de montaje | Linux con Remotion | Montaje en plantillas, rótulos y subtítulos |
| Worker de medios | Linux | Inspección con FFmpeg, transcripción y alineación, 3D experimental |
| Pagos | Stripe (Payments + Billing) | Suscripciones de los tres planes |
| Correo | Resend | Notificaciones |

**Principios:**

- **Multi-restaurante desde el inicio.** Cada consulta, recurso y trabajo lleva el identificador del restaurante; se prueba el aislamiento entre clientes.
- **Trabajos recuperables.** Persistir intención antes de enviar e ID remoto al recibirlo; un envío con resultado desconocido no se repite a ciegas. La idempotencia local no garantiza exactly-once del proveedor.
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

Decisiones revisadas el 22/09/2026. El registro de capacidades de producción manda; las herramientas candidatas de esta tabla no son capacidades implementadas. Las tarifas antiguas de viabilidad son escenarios fechados.

| Función | Herramienta | Estado |
|---|---|---|
| Planificación, prompts, revisión y dirección de edición | GPT-6 Astra (API de OpenAI) | Propuesta |
| Generación y edición de imágenes | Nano Banana Pro (`gemini-3-pro-image`, Gemini API); marca SynthID en toda salida | Propuesta |
| **Vídeo · planos simples** | **Kling 3.0**: producto con movimiento simple, desplazamientos cortos | **Ruta por defecto** (regla del 15/09/2026) |
| **Vídeo · acciones complejas** | **Seedance 2.5**: manos, cubiertos, cortes e interacciones; clips de 4 a 30 s, fotograma final y audio opcional | **Ruta para planos difíciles**. Resolución (720p o 1080p) y proveedor (fal o Higgsfield) pendientes |
| Alternativas de vídeo documentadas | Seedance 2.0, Veo 3.1 | Solo si un ensayo concreto lo justifica |
| Voz en off | ElevenLabs (API; voces de español de España) | Propuesta principal, pendiente de una prueba a ciegas frente a Azure, Gemini TTS y Qwen3-TTS ([informe de voces](informes/Society_voces_y_subtitulos.md)) |
| Subtítulos | Marcas de tiempo de la voz generada; faster-whisper o WhisperX con alineación cuando el proveedor no las da; incrustados en Remotion o FFmpeg | Propuesta, con el ensayo del 15/09 como evidencia |
| **Montaje y rótulos** | **Remotion** (React/TypeScript, render headless en Linux): composición vertical propia con rótulos, placa y cortes | **Validado en el caso práctico el 17/09** ([Reel 09](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/aprendizajes-y-costes.md)). Licencia según entidad y versión; consulta del 22/09 anuncia cambios para v5. Revalidar tarifa al fijar versión |
| Montaje anterior | After Effects con plantillas y render automatizado | Validado el 08/09; **sustituido por Remotion** (quita 113,49 EUR/mes de licencia y worker Windows) |
| Inspección y codificación de medios | FFmpeg | Propuesta |
| Montaje de respaldo | MoviePy + FFmpeg, con MoneyPrinterTurbo (MIT) como código de referencia | Candidato de respaldo si Remotion no encaja ([herramientas evaluadas](informes/Society_herramientas_evaluadas.md)). OpenMontage (AGPL-3.0) **no** se integra en Society |
| Instagram | Instagram API con Instagram Login: publicación, estadísticas, comentarios | Acceso estándar para la cuenta propia; App Review para cuentas de clientes |
| Google | Google Business Profile APIs: reseñas, publicaciones, métricas | Requiere solicitud de acceso |
| Analítica en fases tempranas | Metricool o Windsor.ai (con conector MCP) | Opcional hasta tener ingesta propia |
| Diagramas de arquitectura y flujo | Mermaid dentro de informes | Estados y bucle estratégico documentados; 16 diagramas anteriores no disponibles |
| 3D del local | COLMAP o GLOMAP, gsplat, Blender; VGGT-1B-Commercial como alternativa para las poses | Experimental; fuera del lanzamiento. ABot-Recon descartado por licencia no comercial ([herramientas evaluadas](informes/Society_herramientas_evaluadas.md)) |
| Análisis de vídeos de referencia | PySceneDetect, ViPE, ShotVL, SAM 3, Depth Anything 3 (pesos Base o Metric-Large), SEA-RAFT, beat_this, WhisperX y PaddleOCR: una ficha medida por plano para escribir prompts | Candidato, pendiente de pruebas ([informe](informes/Society_analisis_video_referencia.md) · [plan de pruebas](pruebas/analizador-video-referencia/plan-de-pruebas.md)). GVHMR descartado por licencia no comercial |
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
- **Métricas oficiales por API**, capturadas a +24 h, +72 h, +7 días y +28 días. Para historias se propone captura a 20–23 h; disponibilidad y retención deben verificarse en el contrato de Meta.
- **Comparación** con la mediana de las últimas piezas del mismo formato, nunca con valores absolutos.
- **Registro de hipótesis y aprendizajes.** Un patrón solo se convierte en regla si se repite.
- **Herramientas progresivas:** registro manual → conectores con MCP → ingesta propia en Supabase → aprendizaje entre restaurantes.

## 11. Cumplimiento normativo

Antecedentes de la revisión anterior, no revalidados jurídicamente el 22/09. No son un contrato de API ni asesoramiento actualizado: confirmar fuentes oficiales y revisión profesional antes de vender. Los campos y límites de Meta quedan pendientes por HTTP 429.

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
| **Coste del vídeo** (plan 3): tarifas variables y coste MCP en dinero sin factura verificada | Ruta por tipo de acción; decidir resolución y proveedor con el ensayo; resolver planos con material real; límites por plan y reintentos acotados |
| **Planes 1 y 2 dependen de funciones fuera del foco** | Operación asistida al lanzar; automatización después de enero |
| **Confianza y cumplimiento del contenido con IA** (imagen, vídeo y voz) | Priorizar material real, no inventar, etiquetar, consentimiento para voces reales |
| **Competencia**: Malou desde 99 € por local (reseñas y ficha) y 151 € con gestión de redes; Localo desde 39-49 USD; agencias especializadas desde 699-799 € al mes ([estudio de mercado](informes/estudio-mercado/01-estudio-de-mercado.md)) | Diferenciarse por contenido fiel al local y por el sistema completo de estrategia y medición |

## 14. Decisiones

### 14.1 Tomadas

| Fecha | Decisión | Detalle |
|---|---|---|
| 2026-09-17 | **Montaje en Remotion** en lugar de After Effects, y **multitoma de Seedance 2.5** (varios planos complejos en un solo clip) cuando haya keyframes aprobados | [Aprendizajes y costes del Reel 09](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/aprendizajes-y-costes.md) |
| 2026-09-22 | Se retiran rutas de 16 diagramas ausentes; índice raíz único | Sección 7 y auditoría de continuidad |
| 2026-09-22 | Registro de capacidades, plazos propios, dos puertas por pieza y biblia/ficha versionadas | Informes de producción, dirección visual y cerebro estratégico |
| 2026-09-15 | Society es un proyecto propio para toda la hostelería; Torre de Vega es solo el caso práctico | Secciones 2 y 3 |
| 2026-09-15 | Venta posible a partir de enero de 2027 | Sección 2 |
| 2026-09-15 | Hasta enero, el desarrollo se centra en contenido para redes | Sección 4 |
| 2026-09-15 | Society tendrá una cuenta propia en redes con contenido generado por la app | Sección 4.1 |
| 2026-09-15 | Tres planes acumulativos: Google → + redes (historias, posts y otros sitios) → + reels | Sección 5 |
| 2026-09-15 | **Modelo de vídeo por tipo de acción**: Kling 3.0 en planos simples y Seedance 2.5 en manos, cubiertos y cortes | Sección 9 y [aprendizajes del reel](base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/aprendizajes-reel-chuleton.md) |
| 2026-09-14 | Una sola tecnología de interfaz (React + TypeScript o Angular), no ambas | [Viabilidad §7.1](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-14 | GPT-6 Astra planifica, redacta prompts, revisa y dirige la edición | [Viabilidad §1](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-14 | El 3D del local es un módulo experimental, no un requisito del onboarding | [Viabilidad §8](informes/Society_diseno_y_viabilidad.md) |
| 2026-09-08 | Histórico: montaje AE validado, sustituido por Remotion el 17/09 | [Base de conocimiento](base-conocimiento-torre-de-vega/README.md) |

### 14.2 Pendientes

1. Nombres, precios y cuotas mensuales de los tres planes.
2. Ruta de vídeo cualificada y uso MCP de servicio; no hay ruta REST equivalente con referencias/1080p verificada. Falta coste económico del pool MCP, ensayo de adaptador y alternativas fal. Véase informe de producción.
3. Proveedor de voz tras la prueba a ciegas del informe de voces.
4. React + TypeScript o Angular.
5. Cuenta propia de Society: redes, audiencia, línea editorial y material de partida.
6. Qué plataformas cubre «otros sitios» en el plan 2 y qué permite automatizar cada una.
7. Si el plan 1 se lanza en enero de forma asistida o se retrasa hasta automatizarlo.
8. Dónde corre el orquestador de trabajos y con cuántos workers en paralelo.
9. Papel de Society ante el Reglamento de IA (proveedor, responsable del despliegue o ambos), con revisión jurídica.
10. ~~Licencia de After Effects para uso en un servicio SaaS.~~ Descartada esa dependencia el 17/09 al pasar a Remotion. Aplicar la licencia de Remotion vigente según tamaño de empresa. Queda medir el tiempo real de render por reel.
11. **Oferta de entrada y piloto pagado en Málaga** (Andalucía como expansión). La [auditoría](informes/estudio-mercado/04-auditoria-critica-y-propuesta-reforzada.md) recomienda empezar vendiendo campañas sueltas de novedades (unos 299 €) antes que la suscripción de tres planes; la alternativa es un piloto del plan 2 (3-5 negocios, 4 semanas), con una sola cuota del plan 2 y medición de las horas de revisión por cliente: si son 2 h al mes, el precio mínimo del plan 2 sube a unos 228-239 € ([estudio de mercado](informes/estudio-mercado/README.md)).

## 15. Documentos del proyecto

Este es el único índice vigente. Los documentos históricos conservan evidencia, no instrucciones activas. Las rutas externas de medios no incluidos se señalan como tales, sin fabricar archivos.

### Vigente

| Documento | Ruta |
|---|---|
| Torre de Vega — contexto del proyecto | [base-conocimiento-torre-de-vega/00-proyecto/CLAUDE.md](base-conocimiento-torre-de-vega/00-proyecto/CLAUDE.md) |
| Reglas de imagen — Torre de Vega | [base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_imagenes.md](base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_imagenes.md) |
| Reglas de vídeo — Torre de Vega (Reels) | [base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_videos.md](base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_videos.md) |
| ONBOARDING.md — El cuestionario de primer contacto y la lógica de adaptación | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/ONBOARDING.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/ONBOARDING.md) |
| PERFIL DE USUARIO — DirectorIA | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/PERFIL_USUARIO.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/PERFIL_USUARIO.md) |
| DirectorIA Cloud | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/README.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/README.md) |
| SYSTEM_PROMPT.md — DirectorIA-Cloud | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/SYSTEM_PROMPT.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/SYSTEM_PROMPT.md) |
| Flujo práctico de creación de vídeo cinematográfico con IA | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud-flujo-practico.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud-flujo-practico.md) |
| DirectorIA Cloud — Director de arte IA para Higgsfield | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud.md) |
| Ejemplo trabajado — Still editorial cinematográfico surreal (Reels 9:16) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-editorial-cinematografico.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-editorial-cinematografico.md) |
| Ejemplo trabajado — Ad UGC con personaje recurrente (talking head vertical) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-ugc-personaje.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-ugc-personaje.md) |
| Plantilla — Prompt de imagen (copy-paste) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-imagen.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-imagen.md) |
| Plantilla — Motion Prompt (Kling / Seedance) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-video-motion.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-video-motion.md) |
| Plantilla — Ref Stack de personaje (consistencia de identidad) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/ref-stack-personaje.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/ref-stack-personaje.md) |
| Plantilla — Talking Head con Lipsync | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/talking-head-lipsync.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/talking-head-lipsync.md) |
| Navegación | [base-conocimiento-torre-de-vega/README.md](base-conocimiento-torre-de-vega/README.md) |
| Auditoría de continuidad de Society | [informes/2026-09-22_auditoria-de-continuidad.md](informes/2026-09-22_auditoria-de-continuidad.md) |
| Patrón documental de Society | [informes/2026-09-22_patron-documental.md](informes/2026-09-22_patron-documental.md) |
| Resumen de la revisión de Society | [informes/2026-09-22_resumen-de-cambios.md](informes/2026-09-22_resumen-de-cambios.md) |
| Society | [informes/Society_analisis_video_referencia.md](informes/Society_analisis_video_referencia.md) |
| Society — Cerebro estratégico | [informes/Society_cerebro_estrategico.md](informes/Society_cerebro_estrategico.md) |
| Society | [informes/Society_estrategia_redes_y_retroalimentacion.md](informes/Society_estrategia_redes_y_retroalimentacion.md) |
| Society | [informes/Society_flujo_de_la_aplicacion.md](informes/Society_flujo_de_la_aplicacion.md) |
| Society — Método de dirección visual | [informes/Society_metodo_direccion_visual.md](informes/Society_metodo_direccion_visual.md) |
| Society — Sistema operativo de marketing (eventos, interacción, plano de control; lámina en `informes/diagramas/`) | [informes/Society_sistema_operativo_de_marketing.md](informes/Society_sistema_operativo_de_marketing.md) |
| Society — Radar de nicho (contenido del nicho del cliente: recogida, puntuación, análisis, patrones y recomendaciones; lámina en `informes/diagramas/`) | [informes/Society_radar_de_nicho.md](informes/Society_radar_de_nicho.md) |
| Society | [informes/Society_voces_y_subtitulos.md](informes/Society_voces_y_subtitulos.md) |
| Ad Adaptation / Ad Recreator aplicado a Society | [informes/higgsfield/03-ad-recreator-para-society.md](informes/higgsfield/03-ad-recreator-para-society.md) |
| Protocolo de descubrimiento y ejecución para futuras IA | [informes/higgsfield/04-protocolo-para-ia.md](informes/higgsfield/04-protocolo-para-ia.md) |
| Society — Automatización de producción de Reels | [informes/higgsfield/05-automatizacion-de-produccion.md](informes/higgsfield/05-automatizacion-de-produccion.md) |
| Navegación | [informes/higgsfield/README.md](informes/higgsfield/README.md) |
| Encargo para GPT-6 Astra · Unificar el proyecto Society y diseñar su cerebro creativo-estratégico | [prompts/gpt6-astra-limpieza-y-sistema-creativo.md](prompts/gpt6-astra-limpieza-y-sistema-creativo.md) |
| Prompt para Higgsfield · Bocetos de la app Society | [prompts/higgsfield-bocetos-app-society.md](prompts/higgsfield-bocetos-app-society.md) |
| Prompt — Reel de Torre de Vega con OpenMontage | [prompts/openmontage-reel-torre-de-vega.md](prompts/openmontage-reel-torre-de-vega.md) |
| Plan de pruebas — analizador de vídeos de referencia | [pruebas/analizador-video-referencia/plan-de-pruebas.md](pruebas/analizador-video-referencia/plan-de-pruebas.md) |
| Da Tonino v3 frente a un reel rodado: qué delata la IA (medido; origen de la firma de rodaje real en las skills) | [pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/README.md](pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/README.md) |

### Referencia

| Documento | Ruta |
|---|---|
| 00 · Metodología PromptDirector | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/00-metodologia-promptdirector.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/00-metodologia-promptdirector.md) |
| 01 — Higgsfield MCP: referencia operativa | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/01-higgsfield-mcp.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/01-higgsfield-mcp.md) |
| 02 · Modelos de imagen — Matriz "qué modelo para qué" | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/02-modelos-imagen.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/02-modelos-imagen.md) |
| 03 · Modelos de vídeo (Higgsfield MCP) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/03-modelos-video.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/03-modelos-video.md) |
| 04 · Consistencia de personaje | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/04-consistencia-personaje.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/04-consistencia-personaje.md) |
| 05 — La Biblia del Hiperrealismo | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/05-biblia-hiperrealismo.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/05-biblia-hiperrealismo.md) |
| 06 · Dirección de Movimiento — la biblia del vídeo | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/06-direccion-movimiento.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/06-direccion-movimiento.md) |
| 07 · Troubleshooting — Errores reales y cómo arreglarlos | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/07-troubleshooting.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/07-troubleshooting.md) |
| 08 — Recetas de pipeline (end-to-end) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/08-recetas-pipeline.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/08-recetas-pipeline.md) |
| 09 — Vocabulario de plano/ángulo, modo orgánico y portabilidad a otras herramientas | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md) |
| 10 — Bullet Time y secuencias largas de un solo plano (mega-prompt de continuidad) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/10-bullet-time-y-secuencias-largas.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/10-bullet-time-y-secuencias-largas.md) |
| 11 — FPV de cámara invisible y física de fuerza compartida (construcción/deconstrucción imposible) | [base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md](base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md) |
| Society | [informes/Society_auditoria_estrategica_y_mejoras.md](informes/Society_auditoria_estrategica_y_mejoras.md) |
| Society | [informes/Society_diseno_y_viabilidad.md](informes/Society_diseno_y_viabilidad.md) |
| Society | [informes/Society_herramientas_evaluadas.md](informes/Society_herramientas_evaluadas.md) |
| Society · Estudio de mercado y estrategia de entrada | [informes/estudio-mercado/01-estudio-de-mercado.md](informes/estudio-mercado/01-estudio-de-mercado.md) |
| Lean Canvas · Society | [informes/estudio-mercado/02-lean-canvas.md](informes/estudio-mercado/02-lean-canvas.md) |
| Society · Plan Lean Startup y trabajo de campo | [informes/estudio-mercado/03-validacion-y-entrevistas.md](informes/estudio-mercado/03-validacion-y-entrevistas.md) |
| Society: auditoría crítica y propuesta de empresa más sólida | [informes/estudio-mercado/04-auditoria-critica-y-propuesta-reforzada.md](informes/estudio-mercado/04-auditoria-critica-y-propuesta-reforzada.md) |
| Navegación | [informes/estudio-mercado/README.md](informes/estudio-mercado/README.md) |
| Nueva API de Higgsfield y encaje técnico en Society | [informes/higgsfield/02-api-y-arquitectura.md](informes/higgsfield/02-api-y-arquitectura.md) |

### Histórico

| Documento | Ruta |
|---|---|

Registro de reparación: [enlaces revisados](informes/2026-09-22_enlaces-revisados.json).

### Artefactos y recursos

Los JSON, scripts y medios se conservan con su contexto original. Los siguientes archivos forman parte del inventario; no implican que sean código vigente de la aplicación.

| Archivo | Contexto |
|---|---|
| [archivo/informes/Society_diseno_y_viabilidad.pdf](archivo/informes/Society_diseno_y_viabilidad.pdf) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/04-guiones-reels-reales/buscar_plantillas.sh](base-conocimiento-torre-de-vega/04-guiones-reels-reales/buscar_plantillas.sh) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/higgsfield_chat_addon.py](base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/higgsfield_chat_addon.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/previz_recorrido.py](base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/previz_recorrido.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/insertar_en_html.py](base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/insertar_en_html.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/preparar_para_web.py](base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/preparar_para_web.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_alfa.py](base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_alfa.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_fondo_oscuro.py](base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_fondo_oscuro.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/montaje_remotion/props_montaje_v3.json](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/montaje_remotion/props_montaje_v3.json) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/montaje_remotion/TorreDeVegaReel.tsx](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/montaje_remotion/TorreDeVegaReel.tsx) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/buscar.py](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/buscar.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/contrast3.py](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/contrast3.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/grid.py](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/grid.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/put_uploads.py](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/put_uploads.py) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/sheets.ps1](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/sheets.ps1) | histórico / evidencia |
| [base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/transcribe.py](base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/scripts/transcribe.py) | histórico / evidencia |
| [informes/2026-09-22_fuentes-github.json](informes/2026-09-22_fuentes-github.json) | registro documental |
| [informes/higgsfield/2026-09-22_verificaciones.json](informes/higgsfield/2026-09-22_verificaciones.json) | registro documental |
| [informes/higgsfield/ad-recreator-contrato.json](informes/higgsfield/ad-recreator-contrato.json) | registro documental |

## 16. Estado actual y próximos pasos

**2026-09-22: definición documental revisada; aplicación todavía no implementada.** Víctor escribe el código del TFG. Se ha ejecutado la reorganización, corregido reglas y escrito los diseños de producción, dirección visual y estrategia. No se han ejecutado generaciones de pago ni publicado contenido.

Decidido: Society es el producto; Torre de Vega es evidencia. Personas permitidas con ficha para protagonistas; montaje Remotion; capacidades por contrato; plazos y estados propios; presupuesto antes de generar; dos puertas por pieza; predictor máximo 16 s; aprendizaje con incertidumbre.

Por cerrar: factura/equivalencia MCP, uso de servicio y aislamiento de MCP, ruta fal equivalente, acceso social, prueba visual autorizada, tiempo humano y de render, precios/cuotas y React o Angular. Canvas queda como herramienta opcional de dirección, con API de grafos no verificada. Ninguna de estas verificaciones se da por realizada por estar documentado su plan.

Prioridad: implementar núcleo de imágenes/posts/historias y una ruta cualificada de Reel; medir un piloto; bandits, 3D y automatización de Canvas después. [Resumen de la revisión](informes/2026-09-22_resumen-de-cambios.md).
