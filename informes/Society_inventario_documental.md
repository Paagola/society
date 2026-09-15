# Inventario documental de Society

Carpeta analizada: `C:\Users\victo\PANGO\D.A.M\tfg`. Fecha: 14 de septiembre de 2026.

Cobertura del inventario: los 65 archivos de la carpeta, con lectura de estructura, evidencias, reglas y revisión estática de prototipos. No incluye archivos multimedia referenciados fuera de ella ni ejecución de scripts. Las notas indican qué se conserva y qué requiere validación para la aplicación.

## 1 CLAUDE.md

Ruta: `base-conocimiento-torre-de-vega/00-proyecto/CLAUDE.md`

Contrato operativo del cliente; separar reglas activas de notas históricas y límites del plan Plus.

## 2 documentacion-proceso-reel01.md

Ruta: `base-conocimiento-torre-de-vega/00-proyecto/documentacion-proceso-reel01.md`

Histórico del Reel 01 y correcciones posteriores. La parte II prevalece sobre el montaje manual inicial; no extrapolar métricas del predictor.

## 3 reglas_imagenes.md

Ruta: `base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_imagenes.md`

Base de fidelidad y correcciones. Persisten conflictos de CCT/DOF en la regla 23 respecto a la 17; usar ámbitos por editorial y catálogo.

## 4 reglas_videos.md

Ruta: `base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_videos.md`

Fuente principal de movimiento y modelos vetados. La regla 14 conserva costes Hailuo obsoletos; validación inicial/final no garantiza el interior del clip.

## 5 directoria-cloud-flujo-practico.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud-flujo-practico.md`

Flujo de trabajo del operador. Reutilizar fases, sustituyendo aprobaciones rutinarias por validación automática y excepciones.

## 6 directoria-cloud.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud.md`

Entrada de la metodología; convertir interacción manual en estados de backend sin mostrar prompts técnicos al restaurante.

## 7 ejemplo-editorial-cinematografico.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-editorial-cinematografico.md`

Ejemplo de composición y dirección. Referencia didáctica, no receta universal para platos reales.

## 8 ejemplo-ugc-personaje.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/examples/ejemplo-ugc-personaje.md`

Ejemplo de identidad y voz; fuera del núcleo inicial salvo evolución a presentador.

## 9 00-metodologia-promptdirector.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/00-metodologia-promptdirector.md`

JSON más prosa facilita separar contrato y prompt. No asumir que JSON dentro de un prompt elimina alucinaciones.

## 10 01-higgsfield-mcp.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/01-higgsfield-mcp.md`

Payloads, media y preflight históricos. Parametrizar capacidades por endpoint y fecha, no usarlo como catálogo perpetuo.

## 11 02-modelos-imagen.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/02-modelos-imagen.md`

Matriz histórica de selección. Validar fallback de modelo en producción, registrarlo y volver a comprobar calidad.

## 12 03-modelos-video.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/03-modelos-video.md`

Guía de modelos y parámetros. No copiar aspect_ratio ni mínimos de duración entre APIs distintas.

## 13 04-consistencia-personaje.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/04-consistencia-personaje.md`

Roles de referencias, identidad y reanclado. Matizar conflicto con encadenado y número fijo de referencias.

## 14 05-biblia-hiperrealismo.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/05-biblia-hiperrealismo.md`

Vocabulario fotográfico útil. Las prohibiciones de palabras y efectos no prueban resultados universales.

## 15 06-direccion-movimiento.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/06-direccion-movimiento.md`

Un movimiento principal y beats temporales. Base para contratos con contactos, soportes y cámara separada.

## 16 07-troubleshooting.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/07-troubleshooting.md`

Convertir síntomas en códigos de error y recuperaciones acotadas; distinguir fallos técnicos de calidad.

## 17 08-recetas-pipeline.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/08-recetas-pipeline.md`

Recetas extremo a extremo. Extraer plantillas pequeñas y probarlas por proveedor.

## 18 09-vocabulario-plano-y-modo-organico.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md`

Taxonomía de encuadre; estilo orgánico depende del cliente y no invalida el editorial de Torre de Vega.

## 19 10-bullet-time-y-secuencias-largas.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/10-bullet-time-y-secuencias-largas.md`

Contratos de continuidad para secuencias complejas. Mantener fuera de garantías del MVP.

## 20 11-fpv-camara-invisible-y-fuerza-compartida.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md`

Efectos de física estilizada; no confundir con realismo físico de producto ni trasladarlos por defecto a hostelería.

## 21 ONBOARDING.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/ONBOARDING.md`

Perfil previo a generar. Simplificar para restaurante y solicitar recursos faltantes según formato.

## 22 PERFIL_USUARIO.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/PERFIL_USUARIO.md`

Plantilla vacía, no perfil real del usuario. No cargarla por encima de datos confirmados del restaurante.

## 23 README.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/README.md`

Instalación de metodología y restricciones operativas manuales; no son parámetros universales del SaaS.

## 24 SYSTEM_PROMPT.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/SYSTEM_PROMPT.md`

Instrucciones de agente manual. Separar responsabilidades de planificación, validación y ejecución.

## 25 prompt-imagen.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-imagen.md`

Contrato de imagen en dos representaciones. Añadir cambios permitidos y regiones inmutables.

## 26 prompt-video-motion.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/prompt-video-motion.md`

PRESERVE, MOTION, CAMERA y FILM GRADE. Añadir estados y adaptador de capacidades; evitar un único prompt universal.

## 27 ref-stack-personaje.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/ref-stack-personaje.md`

Plantilla de identidad para evolución con presentador; no es una dependencia del reel de plato.

## 28 talking-head-lipsync.md

Ruta: `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/templates/talking-head-lipsync.md`

Sincronía de habla, opcional; requerirá ensayo de idioma y coste de audio.

## 29 SKILL-after-effects-reels.md

Ruta: `base-conocimiento-torre-de-vega/03-automatizacion-montaje-after-effects/SKILL-after-effects-reels.md`

Montaje ya automatizado. Convertir las recetas en plantillas y una lista de edición ejecutable, con worker aislado.

## 30 buscar_plantillas.sh

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/buscar_plantillas.sh`

Prototipo de búsqueda YouTube. No portar la desactivación de TLS ni interpolaciones a código del servicio.

## 31 fuentes_plantillas_reels.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/fuentes_plantillas_reels.md`

Evidencia de accesibilidad y cribado; no depender de recuperación de redes privadas.

## 32 historias_2026-09-09_reapertura.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/historias_2026-09-09_reapertura.md`

Resultados con texto generado y costes altos. En Society, componer fechas y rótulos determinísticamente.

## 33 plan_contenido_2026-09_a_12.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/plan_contenido_2026-09_a_12.md`

Contexto editorial y frecuencia de una cuenta, no requisito global de todos los restaurantes.

## 34 proceso-reel-vinos-blancos.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/proceso-reel-vinos-blancos.md`

Aprendizajes de etiquetas, watermark y extracción de frames. Los costes originales son históricos.

## 35 reel_02_mesa_que_se_llena.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_02_mesa_que_se_llena.md`

Presupuesto y número de vídeos contradictorios entre secciones. Recalcular desde el guion y modelo activos.

## 36 reel_03_lo-hacemos-lo-disfrutas.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_03_lo-hacemos-lo-disfrutas.md`

Pantalla partida, máscaras y rótulo detrás de plato. Receta de montaje reutilizable.

## 37 reel_03_lo-hacemos-lo-disfrutas__lista-de-fotos.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_03_lo-hacemos-lo-disfrutas__lista-de-fotos.md`

Requisitos reales de captura; convertirlos en lista guiada por recursos faltantes.

## 38 reel_03_publicacion.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_03_publicacion.md`

Metadatos y decisiones de publicación históricos. No reutilizar fecha, ubicación o audio sin validar.

## 39 reel_04_volvemos_16.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_04_volvemos_16.md`

Fragmento de resultados; debe vincularse al guion Reel 04 principal, no tratarse como otro proyecto.

## 40 reel_04_volvemos_el_16.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_04_volvemos_el_16.md`

Guion de tres bandas y correcciones; convertir en plantilla con regiones simultáneas.

## 41 reel_05_media_carta_cenital.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_05_media_carta_cenital.md`

Ráfaga cenital, suciedad y corrección local. Conserva propuestas Hailuo incompatibles con veto posterior.

## 42 reel_06_para_compartir.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_06_para_compartir.md`

Caso más útil de contacto y estados final/inicial. Diferenciar resultados definitivos de propuestas fallidas.

## 43 reel_07_brindis_vino_brasa.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_07_brindis_vino_brasa.md`

Mezcla decisiones resueltas con etiquetas de pendiente. Crear un estado único de aprobación y referencias.

## 44 reel_08_volvemos_miercoles_16.md

Ruta: `base-conocimiento-torre-de-vega/04-guiones-reels-reales/reel_08_volvemos_miercoles_16.md`

Piloto Motion Designer no ejecutado en el registro. No presentarlo como integración demostrada.

## 45 2026-09-08_analisis-instagram-90dias.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-08_analisis-instagram-90dias.md`

Datos observacionales de 21 publicaciones y 16 reels. No convertir correlaciones en reglas causales del algoritmo.

## 46 2026-09-08_ranking-viralidad-plantillas.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-08_ranking-viralidad-plantillas.md`

Filtrar por pertinencia antes de puntuar. Usar resultados del predictor como heurística editorial.

## 47 2026-09-09_efecto-bullet-higgsfield.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-09_efecto-bullet-higgsfield.md`

Compara simulación AE, órbita y transferencia. La simulación 2D no equivale a una órbita geométrica.

## 48 2026-09-09_reel-03_lectura-de-metricas.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-09_reel-03_lectura-de-metricas.md`

Lectura temprana a seis horas; separar seguimiento posterior y métricas del predictor.

## 49 2026-09-13_carta-web_mapa-de-imagenes.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-13_carta-web_mapa-de-imagenes.md`

38 productos con referencias y 33 sin foto. Buen benchmark de catálogo, con fases de alfa aparte.

## 50 2026-09-14_procesos-reels_y_ai-motion-designer.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/2026-09-14_procesos-reels_y_ai-motion-designer.md`

Estado más reciente de procesos, 15 correcciones y coste del agente desconocido. No elimina todos los históricos contradictorios.

## 51 deep-research-report.md

Ruta: `base-conocimiento-torre-de-vega/05-informes-medidos/deep-research-report.md`

Informe estratégico previo con marcadores de citas no portátiles. Recuperar fuentes originales antes de citar sus afirmaciones; no es dato experimental.

## 52 higgsfield_chat_addon.py

Ruta: `base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/higgsfield_chat_addon.py`

Prototipo local Blender con modelos anteriores, credenciales en preferencias y polling sin plazo total. No reutilizar como backend SaaS.

## 53 NOTAS_MODELO.md

Ruta: `base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/NOTAS_MODELO.md`

Escala arbitraria y geometría inferida; el blockout no demuestra reconstrucción métrica ni fidelidad completa.

## 54 PLAN_REEL_3D.md

Ruta: `base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/PLAN_REEL_3D.md`

Vía de previsualización y costes históricos; distinguirla de la propuesta posterior de escaneo propio.

## 55 previz_recorrido.py

Ruta: `base-conocimiento-torre-de-vega/06-piloto-3d-blender-higgsfield/previz_recorrido.py`

Cámara basada en bounding box y nombres de objetos. Falta validación de obstáculos, cobertura y medidas reales.

## 56 insertar_en_html.py

Ruta: `base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/insertar_en_html.py`

Mapeo por posición en HTML y rutas Windows fijas; sustituir por IDs de producto en futura aplicación.

## 57 preparar_para_web.py

Ruta: `base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/preparar_para_web.py`

Normalización de blanco y multiply. El ajuste RGB es global antes de tratar fondo; no afirmar que solo cambia fondo.

## 58 recortar_alfa.py

Ruta: `base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_alfa.py`

Recorte parametrizado por umbral; probar conservación de vajilla/manos y bordes con diferentes fondos.

## 59 recortar_fondo_oscuro.py

Ruta: `base-conocimiento-torre-de-vega/07-carta-web-fotos-producto/recortar_fondo_oscuro.py`

Fondo conectado a bordes por luminancia/croma. La cabecera anuncia WebP, pero el main guarda PNG; no es segmentación general.

## 60 README.md

Ruta: `base-conocimiento-torre-de-vega/README.md`

Índice y sincronización de la base; referencias a medios externos no incluidos.

## 61 caso-practico-01-torre-de-vega.md

Ruta: `caso-practico-01-torre-de-vega.md`

Registro manual inicial con actualización del 14 de septiembre. El montaje posterior sí está resuelto a nivel de piloto.

## 62 idea.md

Ruta: `idea.md`

Definición de Society y flujo original de ocho fases. Completar límites del MVP y modos de automatización.

## 63 investigacion-calidad-profesional-reels-ia.md

Ruta: `investigacion-calidad-profesional-reels-ia.md`

Propone escaneo propio, Blender y Genjutsu. Validar transferencia de cámara, splats y composición antes de elevar a arquitectura obligatoria.

## 64 README.md

Ruta: `README.md`

Documento de contexto académico: Víctor desarrolla el código de Society. Estado de diseño, sin implementación.

## 65 tfg.code-workspace

Ruta: `tfg.code-workspace`

Incluye otra carpeta externa mediante ruta relativa; no se ha ampliado silenciosamente el alcance a ese directorio.
