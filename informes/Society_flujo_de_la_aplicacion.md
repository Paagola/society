# Society

## Flujo de la aplicación: del alta al contenido semanal automatizado

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 16 de septiembre de 2026

## 1 Resumen

Este documento define el recorrido completo de un restaurante en Society: desde que el propietario entra por primera vez hasta que la aplicación genera, publica y mide su contenido cada semana. Añade, funcionalidad por funcionalidad, **cómo trabaja cada una con los servicios externos**: Stripe, Instagram, Google Business Profile, Cloudflare R2, los proveedores de IA y los workers propios.

Es diseño, no implementación: el código lo escribe Víctor.

**Recorrido en una línea:**

**cuenta y plan → pago → datos del negocio → material real → catálogo verificado → cuentas conectadas → diagnóstico → estrategia y muestras de estilo y voz → aprobación → ciclo semanal → publicación → medición → aprendizaje**

### 1.1 Los dieciséis diagramas

Generados con [archify](https://github.com/tt-a1i/archify) (v2.17, licencia MIT) en la carpeta `diagramas/`. Cada fila tiene su especificación JSON (la fuente) y su HTML (el resultado que se abre en el navegador).

| # | Diagrama | Tipo | Qué explica |
| --- | --- | --- | --- |
| 00 | Arquitectura y servicios externos | architecture | Todas las piezas del sistema y con qué servicio externo habla cada una |
| 01 | Alta y configuración | workflow | El recorrido del propietario hasta activar el ciclo, con sus excepciones |
| 02 | Pago y suscripción | sequence | Stripe Checkout, webhooks firmados, cuotas del plan, impagos y bajas |
| 03 | Conexión de cuentas | sequence | OAuth de Instagram y de Google, tokens de 60 días y renovación semanal |
| 04 | Material real y catálogo | sequence | Subida con URL firmadas, inspección técnica, revisión visual y confirmación |
| 05 | Diagnóstico, estrategia y activación | sequence | Línea base, pilares, calendario, muestras de estilo y voz, activación |
| 06 | Ciclo semanal | workflow | La semana automatizada, con sus dos puertas humanas |
| 07 | Producción de imágenes | sequence | Contrato de prompt, Nano Banana Pro, verificación y reparación acotada |
| 08 | Producción de vídeo | sequence | Ruta por tipo de acción, cola del proveedor, id remoto, verificación |
| 09 | Voz y subtítulos | sequence | Voz desde el guion confirmado, tiempos medidos o alineados, bloqueos |
| 10 | Montaje y render | sequence | Lista de edición, worker de After Effects, controles previos e inspección |
| 11 | Aprobación y publicación | sequence | Contenedor de Instagram, publicación, ficha de Google y registro |
| 12 | Medición y aprendizaje | dataflow | De las métricas a los patrones y al plan de la semana siguiente |
| 13 | Ficha de Google y reseñas | sequence | Reseñas, respuestas aprobadas, horarios especiales y métricas locales |
| 14 | Estados de un trabajo | lifecycle | Cómo vive un trabajo de generación y cómo se recupera |
| 15 | Estados de una pieza | lifecycle | Cómo vive una pieza de contenido, del brief a la medición |

Los archivos siguen el patrón `NN-nombre.<tipo>.json` y `NN-nombre.html`.

**Cómo usar los diagramas:**

- Los HTML se abren en el navegador: zoom, búsqueda, resaltado de relaciones, tema claro u oscuro, vistas guiadas y exportación a imagen.
- El contenido está en español. La interfaz fija del visor aparece en inglés, porque archify solo la localiza a inglés y chino.
- La especificación JSON es la fuente: si cambia el flujo, se edita el JSON y se vuelve a generar (sección 10).

## 2 Principios del flujo

1. **Intervención por excepción.** El propietario decide en puntos definidos (alta, aprobación semanal, datos comerciales), no en cada paso de producción.
2. **Los datos comerciales son del propietario.** Precios, fechas, nombres de platos, ingredientes y alérgenos nunca los decide un modelo.
3. **Nada inventado sin referencia real.** Si un plato no tiene foto real, se pide. Cualquier excepción la autoriza el propietario por escrito y queda registrada con su alcance.
4. **Preferencias versionadas por cliente y por pieza.** Estilo visual, voz y reglas guardan fecha, motivo y alcance. Una corrección concreta no se convierte en regla universal ni borra el historial.
5. **Estado persistente por trabajo.** Una generación pagada no se reenvía sin consultar antes su estado.
6. **Cada plan activa solo lo que incluye.** El plan 1 no produce contenido de redes; el plan 2 prioriza historias y posts; el plan 3 añade reels.
7. **Los secretos viven en el servidor.** La interfaz nunca recibe claves de proveedores ni tokens de las cuentas del restaurante.

## 3 Arquitectura en una vista

Diagrama: `diagramas/00-arquitectura.html`.

| Bloque | Piezas | Responsabilidad |
| --- | --- | --- |
| Interfaz | Web Society (React + TypeScript o Angular) en Vercel | Alta, catálogo, revisión, panel |
| Servicio | API Society (TypeScript) en Vercel | Permisos, planes, presupuestos, firma de URL, encolado |
| Supabase | Auth, PostgreSQL, cola de trabajos, Cron (pg_cron + pg_net), Edge Functions | Sesión, datos aislados por restaurante, tareas programadas |
| Workers propios | Orquestador, worker de medios (Linux), worker de montaje (Windows con aerender) | Producción larga, inspección de medios, render |
| Almacenamiento | Cloudflare R2 con URL firmadas | Fotos, clips, voz, subtítulos y entregables |
| Proveedores de IA | GPT-6 Astra, Nano Banana Pro, fal (Kling 3.0 y Seedance 2.5), ElevenLabs | Planificación, imágenes, vídeo y voz |
| Plataformas del cliente | Instagram API, Google Business Profile, otros sitios | Publicación y métricas |
| Cobro y avisos | Stripe, Resend | Suscripciones y notificaciones |

**Por qué el trabajo largo no vive en Vercel.** Generar vídeo, montar en After Effects y transcribir supera el tiempo razonable de una función de servidor; la cola en PostgreSQL con bloqueo y reintento deja el trabajo en manos del orquestador y los workers, que pueden reanudar sin repetir llamadas pagadas.

## 4 Alta y configuración

Diagrama: `diagramas/01-alta-y-configuracion.html`. El detalle de cada paso está en los diagramas 02 a 05.

### 4.1 Pasos

| # | Pantalla | Qué pide al propietario | Qué hace Society | Qué se guarda | Planes |
| --- | --- | --- | --- | --- | --- |
| 1 | Registro | Correo, nombre del negocio, plan elegido | Crea el restaurante como cliente aislado | Restaurante, Miembro, Plan | 1-3 |
| 2 | Pago | Tarjeta en Stripe | Activa la suscripción al recibir el evento firmado | Suscripción | 1-3 |
| 3 | Datos del negocio | Nombre, dirección y teléfono; horarios y cierres; tipo de cocina; carta con precios y alérgenos; zona y público | Valida formatos y marca los datos como confirmados por el propietario | Producto, horario, reglas legales del territorio | 1-3 |
| 4 | Material real | Por plato: tres cuartos, cenital y detalle. Local: mesa, sala y fachada. Clips: fuego, corte, servir. Permisos de personas que aparecen | Inspecciona cada archivo, detecta faltas con mensajes concretos y etiqueta el origen | Recurso con origen, dimensiones, hash y permisos | 1-3 (plan 1: fotos para la ficha) |
| 5 | Catálogo | Confirmar nombres, ración, alérgenos y precios | Propone una imagen maestra por plato y señala lo que falta | Producto con referencias maestras | 1-3 |
| 6 | Integraciones | Autorizar Instagram (planes 2 y 3), Google Business Profile (planes 1-3) y acceso de gestor a otros sitios | Guarda los tokens cifrados; si no hay acceso, activa la operación asistida | Cuenta social, ficha de Google, ficha externa | Según plan |
| 7 | Diagnóstico de alta | Nada nuevo; revisar el informe | Revisa ficha, web, coherencia de datos, competencia en agregado y línea base de las últimas 12 piezas | Diagnóstico, competidores | 1-3 |
| 8 | Estrategia | Novedades reales del trimestre y objetivo principal | Propone objetivos, situaciones de consumo, pilares, calendario y reparto de las cuotas del plan | Periodo estratégico, calendario | 1-3 |
| 9 | Estilo visual | Elegir entre muestras hechas con su propio plato | Genera las muestras con su material y guarda la preferencia con fecha y alcance | Regla de marca versionada | 2-3 |
| 10 | Prueba de voz | Escuchar voces diciendo una frase del negocio con nombres de platos y precios | Genera muestras cortas y registra proveedor, identificador de voz y valoración | Voz de marca | 3 (opcional en el 2) |
| 11 | Activación | Aprobar estilo, voz y calendario; elegir día y hora del ciclo, modo de aprobación y canal de avisos | Programa la tarea semanal | Configuración del ciclo | 1-3 |

**Modos de aprobación a ofrecer en el paso 11:** semana completa, pieza a pieza o revisión del guion antes de generar vídeo.

### 4.2 Excepciones que no bloquean el alta

| Situación | Respuesta |
| --- | --- |
| Falta material o no sirve | Petición concreta indicando plato, vista y motivo; el resto del alta continúa |
| Acceso pendiente: revisión de Meta o aprobación de la API de Google | Operación asistida: una persona gestiona con apoyo de Society hasta tener acceso |
| El propietario no confirma un dato comercial | La pieza que dependa de ese dato no se produce |

### 4.3 Qué activa cada plan en el alta

| Paso | Plan 1 · Presencia en Google | Plan 2 · Presencia + redes | Plan 3 · Completo con reels |
| --- | --- | --- | --- |
| Datos del negocio y carta | Sí | Sí | Sí |
| Material real | Fotos para la ficha | Fotos y clips | Fotos y clips |
| Google Business Profile | Sí | Sí | Sí |
| Instagram | — | Sí | Sí |
| Otros sitios (TripAdvisor y similares) | — | Sí | Sí |
| Diagnóstico de alta | Sí | Sí | Sí |
| Muestras de estilo | — | Sí | Sí |
| Prueba de voz | — | Opcional | Sí |

## 5 Funcionalidad por funcionalidad, con sus servicios externos

Esta sección es la parte nueva: cada funcionalidad, su diagrama y los datos de la API verificados en la documentación oficial. Las referencias [F1] a [F9] están en la sección 11.

### 5.1 Pago y suscripción

Diagrama: `diagramas/02-pago-y-suscripcion.html`.

| Punto | Comportamiento |
| --- | --- |
| Cobro | La interfaz pide a la API una sesión de Checkout en modo suscripción y redirige al propietario |
| Confirmación | **Solo el webhook firmado activa el servicio**, nunca la vuelta del navegador |
| Eventos que se manejan | `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted` y `customer.subscription.trial_will_end` [F5] |
| Duplicados | Cada id de evento se registra; un evento repetido no vuelve a aplicar cambios |
| Reintentos de Stripe | En producción reintenta hasta 3 días con espera creciente [F5] |
| Estados de la suscripción | `active` da servicio; `past_due` avisa y frena generaciones nuevas; `canceled` y `unpaid` retiran el acceso [F5] |
| Coste | 1,5 % + 0,25 € por cobro con tarjeta del EEE y 0,7 % de Billing |

### 5.2 Conexión de cuentas y tokens

Diagrama: `diagramas/03-conexion-de-cuentas.html`.

| Paso | Detalle verificado |
| --- | --- |
| Autorización | `https://www.instagram.com/oauth/authorize` con los permisos del plan [F2] |
| Código | Válido **1 hora y un solo uso** [F2] |
| Token corto | `POST https://api.instagram.com/oauth/access_token` con `grant_type=authorization_code` [F2] |
| Token largo | `https://graph.instagram.com/access_token` con `grant_type=ig_exchange_token`: **60 días** [F2] |
| Renovación | `https://graph.instagram.com/refresh_access_token` con `ig_refresh_token`: otros 60 días si el token tiene al menos 24 horas y no ha caducado [F2] |
| Permisos de métricas | `instagram_business_basic` e `instagram_business_manage_insights` [F3] |
| Google | OAuth con el permiso de gestión de la ficha; la API de Business Profile exige solicitud aprobada |
| Tarea semanal | Supabase Cron renueva los tokens de más de 30 días y avisa si una renovación falla |

Los tokens se guardan cifrados y aislados por restaurante. La interfaz nunca los recibe.

### 5.3 Material real y catálogo

Diagrama: `diagramas/04-material-y-catalogo.html`.

- La subida usa **URL firmadas de R2**: admiten `GET`, `PUT`, `HEAD` y `DELETE`, caducan entre 1 segundo y 7 días y no funcionan con dominio propio. Se tratan como credenciales: caducidad corta y tipo de contenido restringido [F8].
- El worker de medios lee dimensiones, duración y hash; el hash evita duplicados.
- Astra revisa si el plato se ve completo y nítido; cuando falta información, Society pide una toma concreta en lugar de mostrar un error genérico.
- El propietario confirma nombre, ración, ingredientes, alérgenos y precio. Un modelo visual no decide denominación comercial.

### 5.4 Diagnóstico, estrategia y activación

Diagrama: `diagramas/05-estrategia-y-muestras.html`.

- El diagnóstico usa la ficha, la web, la coherencia de los datos y la línea base de las últimas 12 piezas; la competencia solo en agregado.
- Estilo y voz **se eligen con muestras**, generadas con el plato real del restaurante y con una frase del negocio que incluya nombres de platos y precios.
- Cada preferencia se guarda con fecha, motivo y alcance (cliente o pieza).
- La activación programa el ciclo semanal en Supabase Cron con el día, la hora y el modo de aprobación elegidos.

### 5.5 Producción de imágenes

Diagrama: `diagramas/07-produccion-de-imagenes.html`.

- Astra entrega una ficha validable con referencias, lo inmutable y lo editable; el adaptador la traduce al formato del proveedor.
- Se genera **una imagen por escena**, no cuatro variantes. Un defecto local se repara con máscara; un cambio de composición obliga a regenerar desde la imagen maestra. Tras dos correcciones sin éxito, cambia la técnica o se pide material.
- Nano Banana Pro (`gemini-3-pro-image`) admite hasta **6 imágenes de objetos con alta fidelidad**, trabaja a 1K, 2K y 4K, y **todas sus imágenes llevan marca SynthID** [F9].
- Se registra el modelo pedido y el devuelto: en el ensayo del 15 de septiembre se pidió `nano_banana_pro` y varios resultados se identificaron como `nano_banana_2`.

### 5.6 Producción de vídeo

Diagrama: `diagramas/08-produccion-de-video.html`.

**Ruta por tipo de plano**

| Tipo de plano | Ruta |
| --- | --- |
| Fuego, brasa, líquidos complejos, recorridos de sala con metraje útil | Material real |
| Producto con movimiento simple, desplazamiento corto | **Kling 3.0** |
| Manos, cubiertos, cortes y otras interacciones físicas | **Seedance 2.5** |
| Rótulos, placas, texto y composición | After Effects |

**Cómo se comporta la cola del proveedor** [F4]

- El envío devuelve `request_id`, con sus URL de estado, resultado y cancelación. El id se guarda **antes** de esperar.
- Los estados son `IN_QUEUE`, `IN_PROGRESS` y `COMPLETED`.
- Con `fal_webhook` el proveedor avisa al terminar y **puede repetir la entrega**: la deduplicación se hace por `request_id`.
- fal reintenta por su cuenta hasta 10 veces salvo que se envíe la cabecera que lo desactiva. Society debe contar con resultados repetidos y conciliar el coste una sola vez.

**Coste que manda.** Preflight del 15 de septiembre: Seedance 2.5 de 6 s a 1080p sin audio, 54 créditos; Kling 3.0 Pro de 6 s, 10,5 créditos. En fal, Seedance 2.5 cuesta 1,164 USD/s a 1080p y 0,473 USD/s a 720p. El audio nativo se desactiva cuando el montaje lleva voz propia.

### 5.7 Voz y subtítulos

Diagrama: `diagramas/09-voz-y-subtitulos.html`.

- La voz sale siempre de un guion con los datos comerciales confirmados.
- Si el proveedor devuelve marcas de tiempo, se usan; si no, se transcribe y se alinea contra el guion escrito. Repartir palabras por longitud no sustituye a medir la locución.
- La transcripción se compara palabra a palabra con el guion: si cambia una fecha, un precio o el nombre de un plato, la pieza se bloquea.
- Ensayo del 15 de septiembre: locución de 7,9 s sin marcas de tiempo; faster-whisper más alineación dio similitud 0,9375 con 16 de 16 palabras, y el guion recuperó «brasa» donde la transcripción puso «braza».

### 5.8 Montaje y render

Diagrama: `diagramas/10-montaje-y-render.html`.

Controles antes de renderizar, aprendidos en el ensayo:

1. Fuentes y texto en Unicode de extremo a extremo; se dañó una tilde en «CHULETÓN».
2. Archivos y rutas existentes.
3. Duración y dimensiones leídas de los metadatos, nunca del nombre: la composición se llamaba «10S» y duraba 9 s.
4. Escala, anclaje y posición revisados tras sustituir material: el ensayo pasó de 1076 × 1928 a 1080 × 1920.
5. Cola de render inspeccionada antes de iniciar, sin limpiar trabajos ajenos.
6. Audio presente y niveles aplicados.
7. Esperar a que termine la escritura del archivo antes de leer fotogramas.

### 5.9 Aprobación y publicación

Diagrama: `diagramas/11-publicacion.html`.

| Paso | Detalle verificado [F1] |
| --- | --- |
| Contenedor | `POST /<IG_ID>/media` con `image_url` o `video_url` y `media_type` (`IMAGE`, `VIDEO`, `REELS`, `STORIES` o `CAROUSEL`) |
| Carrusel | Hasta 10 elementos con el parámetro `children` |
| Estado | `GET /<IG_CONTAINER_ID>?fields=status_code`: `IN_PROGRESS`, `FINISHED`, `ERROR`, `EXPIRED` o `PUBLISHED` |
| Publicación | `POST /<IG_ID>/media_publish` con `creation_id` |
| Límite | 100 publicaciones por cuenta en 24 horas |
| Caducidad | El contenedor expira si no se publica en 24 horas |
| Alojamiento | El medio debe servirse desde una URL pública; con Instagram Login no hay subida reanudable |
| Ficha de Google | Publicación local con foto real cuando la novedad lo merece [F7] |

Antes de publicar: etiqueta de IA decidida en el brief, máximo 5 hashtags, música con licencia y datos comerciales confirmados.

### 5.10 Ficha de Google y reseñas

Diagrama: `diagramas/13-ficha-de-google-y-resenas.html`.

- Reseñas: se listan con `accounts/{cuenta}/locations/{ubicación}/reviews` y se responde con `.../reviews/{id}/reply` [F6].
- Publicaciones locales: `.../localPosts`, con tipos de evento, oferta y llamada a la acción; las publicaciones de producto no se pueden crear por API [F7].
- **Society nunca genera, filtra ni condiciona reseñas.** Google prohíbe incentivos y presión, y el Real Decreto-ley 24/2021 sanciona las reseñas falsas. Toda respuesta la aprueba el propietario.
- Mientras la API no esté aprobada, la ficha se gestiona de forma asistida.

### 5.11 Medición y aprendizaje

Diagrama: `diagramas/12-medicion-y-aprendizaje.html`.

- Capturas a +24 h, +72 h, +7 días y +28 días; las historias, antes de que expiren sus estadísticas a las 24 horas.
- Las métricas de cuenta se conservan 90 días en la API y las de piezas 2 años: sin captura propia se pierde la serie.
- Se compara con la mediana del propio restaurante por formato, nunca con cifras absolutas.
- Una hipótesis pasa a patrón si la misma variable gana en al menos 2 de 3 piezas; los patrones alimentan el plan de la semana siguiente.
- El uso de la API se vigila con la cabecera `X-Business-Use-Case-Usage`.

## 6 Ciclo semanal automatizado

Diagrama: `diagramas/06-ciclo-semanal.html`.

### 6.1 Semana tipo

Propuesta orientativa; día y hora los elige cada restaurante.

| Momento | Qué ocurre | Quién |
| --- | --- | --- |
| Lunes a la hora elegida | Una tarea programada inicia el ciclo con las cuotas disponibles, el calendario de novedades y las métricas de la semana anterior | Automático |
| Lunes | Plan de la semana y briefs de pieza con objetivo, hipótesis, métrica y umbral | Automático (Astra) |
| Lunes, si el modo está activo | Revisión del guion antes de generar vídeo | Propietario |
| Lunes y martes | Producción por ruta de cada plano | Automático |
| Martes y miércoles | Verificación con bloqueos directos | Automático |
| Miércoles | Aprobación de la semana o de piezas concretas | Propietario |
| Jueves a domingo | Publicación programada según calendario | Automático o asistido |
| +24 h, +72 h y +7 días | Capturas de métricas; las historias antes de 24 h | Automático |
| Lunes siguiente | Informe semanal; los aprendizajes alimentan el nuevo plan | Automático, con lectura humana |

El diagrama no dibuja la vuelta de «Métricas» a «Plan de la semana» para evitar cruces de líneas. Ese bucle existe, está en la tarjeta del diagrama y se ve completo en el diagrama 12.

### 6.2 Criterios de guion aprendidos en el ensayo del 15 de septiembre

- **Ángulos.** Un macro tomado desde el mismo tres cuartos no cuenta como otro ángulo, aunque cambien distancia o recorte. Repetir encuadre solo en una transición prevista y documentada.
- **Gancho.** El momento que justifica ver la pieza va al principio. La versión preferida del reel duró 9 s frente a un primer montaje lento de 15 s. Es una receta ensayada, no una duración óptima.
- **Montaje con adelanto.** Se puede usar un fragmento de la misma toma como adelanto y su desarrollo después, pero no presentarlo como dos ángulos distintos.

### 6.3 El ciclo del plan 1

Sin generación de vídeo ni contenido de redes: publicaciones en la ficha con novedades del calendario y fotos reales, borradores de respuesta a reseñas que aprueba el propietario, horarios especiales en los cierres e informe de acciones de la ficha.

## 7 Estados: piezas y trabajos

Diagramas: `diagramas/15-estados-de-una-pieza.html` y `diagramas/14-estados-de-un-trabajo.html`.

### 7.1 Una pieza de contenido

| Estado | Significado | Sale hacia |
| --- | --- | --- |
| Planificada | Brief validado con cuota disponible | Guion y prompts |
| Guion y prompts | Contrato de plano y ruta elegidos | Produciendo |
| Produciendo | Imágenes, clips, voz y montaje en curso | Verificando; Fallo técnico |
| Verificando | Fidelidad, texto, audio y dimensiones | Espera aprobación |
| Espera aprobación | Pausa hasta la decisión del propietario | Publicada y medida; Cancelada |
| Publicada y medida | Captura a 7 días registrada | Fin |
| Fallo técnico | Error de proveedor, render o archivo | Guion y prompts con otra receta, con límite de intentos |
| Cancelada | Rechazada por el propietario | Fin |

### 7.2 Un trabajo de generación

| Estado | Significado |
| --- | --- |
| Encolado | Presupuesto reservado y clave idempotente creada |
| Enviado | Identificador remoto guardado antes de esperar |
| En el proveedor | En cola o en curso |
| Revisión | Inspección técnica y comparación visual |
| Aceptado | Recurso guardado en R2 y coste asentado |
| Sin respuesta | Se consulta el estado; nunca se reenvía a ciegas |
| Regenerar | Diagnóstico y un cambio concreto |
| Límite agotado | Otra ruta o petición de ayuda |

**Reglas que acompañan a los estados:** separar reintentos técnicos de regeneraciones por calidad; registrar modelo pedido y devuelto, parámetros efectivos, coste y motivo de descarte; y anotar si el resultado se usó en la pieza final.

## 8 Aprendizajes del ensayo del 15 de septiembre incorporados

Evidencia completa en `base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/`. Es una producción local valorada creativamente, sin métricas de publicación ni experimento controlado.

| Aprendizaje | Dónde entra en el flujo |
| --- | --- |
| El propietario rechazó el acabado brillante y prefirió luz natural cotidiana para esa pieza | Paso 9 del alta y diagrama 05: muestras con su plato, preferencia versionada |
| Kling 3.0 para planos simples y Seedance 2.5 para manos, cubiertos y cortes | Ruta por plano del diagrama 08 |
| Una voz se rechazó por sonar extranjera; el esquema de audio usado no tenía selector de idioma | Paso 10 del alta y diagrama 09 |
| Sin marcas de tiempo del proveedor hubo que transcribir y alinear con el guion | Diagrama 09 |
| Precauciones de After Effects | Controles del diagrama 10 |
| Seedance tardó en responder; conviene no duplicar | Diagramas 08 y 14 |
| Un montaje de 15 s resultó lento; el de 9 s con adelanto gustó más | Criterio de gancho, sección 6.2 |
| Dos apartados «17» en las reglas de vídeo | Reglas con identificador estable, fecha y alcance (principio 4) |

## 9 Datos que crea el flujo

| Etapa | Entidades del modelo de datos |
| --- | --- |
| Alta | Restaurante, Miembro, Plan, Suscripción, Producto, Ubicación, Recurso, Regla de marca, Voz de marca, Cuenta social, Ficha de Google, Ficha externa, Diagnóstico, Competidor, Periodo estratégico, Calendario, Configuración del ciclo |
| Planificación semanal | Hipótesis, Brief de pieza, Proyecto |
| Producción | Escena y contrato de plano, Intento de generación, Pista de voz, Subtítulos, Trabajo de montaje |
| Verificación y aprobación | Evaluación, decisión del propietario |
| Publicación y medición | Pieza publicada, Captura de métricas, Métrica diaria de cuenta, Evento de conversión |
| Aprendizaje | Patrón aprendido, Informe semanal |

Todas llevan el identificador del restaurante.

## 10 Cómo se generan y se regeneran los diagramas

**Instalación como skill:** `npx skills add tt-a1i/archify -g`. También sirve clonar el repositorio y trabajar desde `archify/archify`.

```bash
node bin/archify.mjs validate <tipo> <ruta>/diagramas/NN-nombre.<tipo>.json --quality showcase --json
node bin/archify.mjs deliver  <tipo> <ruta>/diagramas/NN-nombre.<tipo>.json <ruta>/diagramas/NN-nombre.html --quality showcase --json
node bin/archify.mjs visual-check <ruta>/diagramas/NN-nombre.html --json
```

**Límites que impone archify y conviene respetar al editar:**

| Límite | Valor comprobado |
| --- | --- |
| Anchura útil | Un `viewBox` de más de ~1085 px suspende el control de legibilidad de escritorio: el texto secundario baja de 6 px a 1440 px de pantalla |
| Altura | Cuanto más alto el diagrama y más largas las tarjetas, más probable es que la página necesite desplazamiento vertical |
| Secuencias | Los mensajes van entre `y = 160` y `altura − 83`, con al menos 28 px entre mensajes que comparten espacio |
| Workflows | Columnas de 0 a 5; cada carril añade unos 124 px de altura |
| Ciclos de vida | Columnas principales 0-4; las de eventos, 0-2, alineadas con la principal N+2 |
| Rutas | `drop` dibuja un codo entre carriles: no sirve cuando origen y destino comparten columna |
| Tarjetas | Son resumen, no topología: un «se reintenta» en una tarjeta no sustituye a una transición |

Se valida después de cada cambio y no se da por buena una entrega con código de salida distinto de cero.

**Estado de verificación a 16 de septiembre de 2026**

| Comprobación | Resultado |
| --- | --- |
| Validación de composición | Los 16 diagramas pasan. Quince con perfil `showcase` y sin avisos |
| Excepción de perfil | El diagrama 12 (medición) se entrega con perfil `standard` y **2 avisos**: las cinco fuentes que convergen en la misma función provocan roces entre etiquetas que el perfil estricto rechaza. Se prefirió conservar las cinco fuentes antes que borrar etiquetas con significado |
| `visual-check` en navegador | Once diagramas caben en una pantalla de 1440 × 900. **Cuatro necesitan desplazamiento vertical**: 00 arquitectura, 01 alta, 06 ciclo semanal y 15 estados de una pieza |
| Motivo del desplazamiento | Son los diagramas con más carriles o filas. Reducirlos a tres carriles los haría caber, a costa de fundir responsabilidades que ahora se leen separadas |

El desplazamiento vertical no impide leer ni exportar el diagrama: es un criterio de presentación de archify, no un error de composición.

## 11 Fuentes primarias consultadas

- [F1] Meta · Content Publishing, Instagram Platform · https://developers.facebook.com/docs/instagram-platform/content-publishing/
- [F2] Meta · Business Login for Instagram · https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login
- [F3] Meta · Instagram Media Insights · https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights
- [F4] fal · Queue API · https://fal.ai/docs/model-apis/model-endpoints/queue
- [F5] Stripe · Webhooks de suscripciones · https://docs.stripe.com/billing/subscriptions/webhooks
- [F6] Google · Datos de reseñas, Business Profile API · https://developers.google.com/my-business/content/review-data
- [F7] Google · Publicaciones locales, Business Profile API · https://developers.google.com/my-business/content/posts-data
- [F8] Cloudflare · URL firmadas en R2 · https://developers.cloudflare.com/r2/api/s3/presigned-urls/
- [F9] Google · Generación de imágenes con Gemini · https://ai.google.dev/gemini-api/docs/image-generation
- [F10] archify · Repositorio (MIT) · https://github.com/tt-a1i/archify

**Sin verificar todavía:** la API de Higgsfield como proveedor alternativo de vídeo, qué permite automatizar TripAdvisor, y la licencia de After Effects para uso en un servicio SaaS.

## 12 Preguntas abiertas

1. Día y hora por defecto del ciclo semanal.
2. Modo de aprobación por defecto: semana completa, pieza a pieza o revisión de guion.
3. Qué pasa si el propietario no aprueba a tiempo: posponer, publicar solo lo aprobado o avisar y esperar.
4. Publicación asistida o por API en el lanzamiento de enero.
5. Proveedor de voz: prueba a ciegas del informe de voces frente a las voces usadas en el ensayo.
6. Resolución y proveedor de Seedance 2.5.
7. Qué permite automatizar TripAdvisor y los demás sitios del plan 2.
8. Dónde corre el orquestador y con cuántos workers en paralelo.
