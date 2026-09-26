# De gancho visual a primera toma producible

Estado: vigente · diseño y herramienta de skills, no aplicación implementada.
Fecha de revisión: 2026-09-26. Ámbito: Society y sus skills de producción.
Fuentes: sección final; decisiones locales en `skills/README.md` e `informes/Society_cerebro_estrategico.md`.

## Qué se automatiza aquí

La herramienta cruza un inventario **ya revisado** con requisitos de 24 acciones visuales. Devuelve candidatas, referencias asignadas y causas de descarte. No determina mediante visión qué contiene una fotografía, ni produce keyframes, vídeos, una puntuación de viralidad o publicaciones.

Las entradas de Society —inspirarme en un reel, crear desde un plato y comunicar una novedad— siguen siendo entradas distintas. La novedad requiere hecho y fecha vigentes; no se sustituye por un anuncio genérico de comida al faltar datos. Para una novedad permanente sin fecha de evento, el contrato requiere ampliación explícita; esta versión es conservadora. En inspiración se necesita fuente, análisis y rasgos transferibles: mecanismo, ritmo, encuadre, orden y cámara. No se copian personas, marca, música ni comida ajenas.

## Recorrido entre skills

| Etapa | Responsable | Resultado |
|---|---|---|
| Objetivo y ocasión de consumo | marketing-hosteleria | Brief y métrica |
| Inventario real y perfil | director / director-reels | Activos con sujeto, rol, restricciones y hechos verificables |
| Elegir primera toma | hooks-society | Hasta tres candidatas, acción y consecuencias, material faltante |
| Diseñar el Reel | director / director-reels | Concepto, plano inicial y resto de contratos dentro de plan.yaml |
| Preparar imagen y movimiento | directoria | Keyframe anclado y prompt compilado con las reglas del cliente |
| Ejecutar ruta aprobada | higgsfield | Cotización, parámetros efectivos, job, coste y medios |
| Montaje del caso práctico | openmontage | Cortes, sonido, revisión y exportación |
| Montaje de la futura aplicación | Motor propio con Remotion, según diseño del proyecto | Parámetros y render, desarrollo a cargo de Víctor |

La cabecera vigente del proyecto manda sobre ejemplos históricos: una generación multitoma de Seedance 2.5 a 720p, referencias aprobadas y posterior reescalado de la toma aceptada. Cada hook es el **primer bloque de esa pieza**, no una llamada independiente. Los 1,2–1,4 s de las fichas son puntos de partida ajustables al material y a la comprensión, no límites garantizados por la API ni una ley de retención.

En producción manual se mantienen las puertas A–E de las skills. En el diseño de la aplicación, el informe de automatización distingue G0 onboarding, G1 keyframes/plan/coste antes de animar y G2 render completo/hash/copy/canal/fecha antes de publicar. Esta herramienta no añade cinco pantallas de aprobación al producto ni convierte una revisión del catálogo en autorización de gasto.

## Contrato parcial y compilación

El selector devuelve `contrato_apertura`: `primer_fotograma`, `accion_principal`, `estado_final`, `camara`, `t_frames`, `t_s`, fragmento `prompt_movimiento_en` y criterio de comprensión sin texto. `bindings` vincula cada rol a IDs concretos. `fact_ids` conserva la procedencia de los hechos. Nunca vincular por el nombre bonito de un fichero ni por coincidencia de restaurante sin comprobar el producto.

Antes de convertirlo a `director-reels/assets/contrato-plano.schema.json`, completar encuadre, ángulo, óptica, luz, fuente y exclusiones, naturaleza real/generada, sonido y relación con el resto del Reel. Resolver los enums admitidos por el contrato; el texto descriptivo de cámara no es un enum de la API. Mapear las referencias a los tokens exactos del proveedor solo después de tener el orden final. Validar ese plan con el esquema vigente; este JSON no pretende sustituirlo.

La estructura es compatible conceptualmente con un `CreativePattern` del cerebro estratégico: mecanismo, requisitos, restricciones, variantes, coste y evidencia. Para la futura persistencia faltan `pattern_version` en la entidad elegida, hash de activos, versión de perfil, historial de jobs y un registro de resultado. La selección local no es esa base de datos.

## Probar sin gastar en variaciones masivas

Primero comparar tres propuestas escritas y los keyframes disponibles. Elegir una apertura que se pueda resolver. En metraje real, localizar el tramo donde la acción ya está en marcha y termina de forma legible; el selector no inspecciona los segundos útiles. En generación, solicitar material real de manos/proceso antes de asumir que hay que sintetizarlo.

Revisar la toma renderizada: identidad y cantidad del producto, apoyo/contacto, anatomía, continuidad, resultado visible y comprensión en silencio. Si un corte muestra el interior, usar evidencia real de ese corte; una animación no prueba cómo es el alimento por dentro. Los presets de foco o slider tienen menor complejidad editorial que un corte, pero su calidad también debe comprobarse.

Para comparar rendimiento mantener similares el resto de la pieza, producto, duración, audiencia y distribución. Registrar la métrica inicial disponible en la plataforma, retención por tiempo, visionado completo, compartidos/guardados por alcance y señal comercial. Fijar ventana antes de mirar resultados. En orgánico hay factores de confusión: no llamar causal a una diferencia entre dos publicaciones. Con poco volumen, conservar el estado «sin evidencia suficiente». No traducir un score de predictor en «activación cerebral».

## Recursos gratuitos y fuentes consultadas

Consultas del 2026-09-26, salvo las fuentes históricas fechadas en [investigación anterior](investigacion.md). Se leyó contenido público; no se compraron archivos ni se accedió al interior del pack de Gumroad.

| Fuente | Qué aporta y límite |
|---|---|
| [TikTok: Food and Beverage SEA](https://ads.tiktok.com/business/creativecenter/quicktok/online/Food_and_Beverage_SEA/pc/en) · WEB-TIKTOK-FB | Patrones observacionales de producto, consumo y sensorialidad. Orientación publicitaria; no prueba las 24 fichas. |
| [TikTok: consejos creativos de alimentación](https://ads.tiktok.com/business/creativecenter/quicktok/online/creative-tips-for-food-and-Beverage/pc/en) | Relacionar apertura, producto y mensaje. Sus sugerencias de efectos no prevalecen sobre los cortes secos y realismo del proyecto. |
| [TikTok: Food & Beverage Playbook, PDF](https://ads.tiktok.com/business/library/FoodBev_ENG.pdf) | Documento público de 15 páginas sobre campañas y creatividad. Se leyó el texto extraído; sus contextos de MENA y publicidad no son datos de Society ni justifican convertir toda primera toma en 3–5 segundos. |
| [Runway: Image to Video Prompting Guide](https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide) · WEB-RUNWAY-I2V | La imagen fija aporta composición; el prompt describe acción/cámara/tiempo. Sirve como principio de diseño, no como sintaxis certificada de Seedance. |
| [Higgsfield: endpoint Seedance 2.5 reference-to-video](https://open.higgsfield.ai/models/bytedance/seedance-2.5/reference-to-video/playground) | Ficha oficial del endpoint y referencias. No se ejecutó la API ni se verificaron permisos de cuenta o costes; no equiparar dólares web con créditos del flujo local. |
| [Higgsfield: ciclo de solicitudes](https://docs.higgsfield.ai/docs/concepts/requests) | Separación entre solicitud, estado y resultado, útil para conservar trazabilidad. No se implementó cliente de API. |
| [Remotion: render parametrizado](https://www.remotion.dev/docs/parameterized-rendering) | Props/esquema/metadatos como entrada del render. Apoya el diseño de contratos; no conecta automáticamente las skills con la app. |
| [YouTube: conversación sobre Shorts](https://blog.youtube/creator-and-artist-stories/youtube-shorts-deep-dive/) | Resumen oficial ya consultado el 25/09. Primer momento y pequeñas historias; experiencia de creadora, no umbral universal probado. El vídeo enlazado no se analizó fotograma a fotograma. |
| [SocialBu: biblioteca gratuita de hooks en vídeo](https://video-hooks.socialbu.com/) | La página mostraba 688 clips y búsqueda por escena. Acceso público a índice y fichas; no se descargó el catálogo ni se verificó una licencia comercial por clip. Útil para estudiar movimientos, no para insertar de forma automática un clip ajeno en un anuncio del restaurante. |
| [SocialBu: hook visual frente a escrito o hablado](https://video-hooks.socialbu.com/blog/visual-vs-text-vs-spoken-hooks) | Distinción práctica entre movimiento, redacción y voz. Sustenta la corrección del enfoque; no aporta ensayo de retención. |
| [SocialBu: punto de corte](https://video-hooks.socialbu.com/blog/where-to-cut-a-video-hook) | Método editorial de localizar la resolución y comprobar el enlace con la toma siguiente en silencio. Adaptado como criterio de QA; no se copiaron clips. |
| [SocialBu: acceso MCP](https://video-hooks.socialbu.com/mcp-server) | Publica herramientas de búsqueda/consulta sin login y URLs MP4 temporales. Se leyó su documentación; no se instaló ni probó ese servidor. Como extensión futura, registrar fuente/licencia antes de incorporar medios. |

Fuentes locales de las fichas: **LOCAL-REGLA-CERO** = `skills/README.md` y `skills/directoria/references/hosteleria/08-firma-de-rodaje-real.md`; **LOCAL-MOTOR** = `informes/Society_cerebro_estrategico.md`, especialmente CreativePattern. Los bloques de movimiento y las fichas son creación editorial propia, no extracciones del catálogo comercial ni recetas probadas por las plataformas.
