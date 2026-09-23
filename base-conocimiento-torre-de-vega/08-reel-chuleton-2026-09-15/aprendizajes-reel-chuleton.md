<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Aprendizajes nuevos y decisiones aplicables

## 1. Qué se ha realizado y qué sigue pendiente

Se completó una producción local: imagen de referencia, vídeos generados, locución, montaje automatizado en After Effects, subtítulos nativos editables y exportación MP4. El usuario prefirió la última edición frente a las anteriores.

Esto prueba operaciones concretas del flujo en un equipo. **No demuestra que Society tenga implementadas estas funciones**, ni que exista ya un servicio desatendido o preparado para veinte clientes. El desarrollo de la aplicación continúa siendo responsabilidad del autor, según el README del TFG.

## 2. Resolver instrucciones contradictorias antes de generar

La documentación de imágenes contiene una regla de acabado editorial dramático que sustituía al aspecto de móvil. En este reel el usuario rechazó precisamente el brillo, la luminosidad y el aspecto demasiado publicitario. La última corrección manda para esta pieza: luz ambiente difusa, sombras suaves, color contenido y apariencia cotidiana.

No equivale a bajar resolución, ensuciar el plato ni desenfocar deliberadamente. Se mantuvo salida 1080 × 1920. Tampoco convierte el estilo natural en una preferencia universal de todos los restaurantes: registrar el alcance como pieza/cliente y su fecha, sin borrar el historial.

Otra contradicción: el informe de viabilidad propone Seedance como modelo principal general y una receta antigua de manos nombra Seedance 2.0. La indicación posterior del usuario es más concreta: **Kling 3.0 para planos simples; Seedance 2.5 para manos, cubiertos, cortes e interacciones complejas**. Esta preferencia ya se añadió como apartado 18 a las dos copias de reglas_videos.md durante la producción. Es criterio de selección, no una garantía técnica de superioridad en cualquier situación.

Se detectaron dos apartados numerados «17» en reglas_videos.md, con temas diferentes. Mejora documental pendiente: asignar identificadores estables, fecha y alcance a las reglas; no resolver conflictos solo por el número del encabezado.

## 3. Variedad real de ángulos y continuidad

La prohibición de repetir exactamente el ángulo en varios vídeos generados ya está documentada. Esta prueba concretó el criterio de rechazo: un macro obtenido desde el mismo tres cuartos no aporta otro ángulo, aunque cambien distancia, focal o recorte.

La excepción sigue limitada a una transición expresamente prevista y estudiada en un reel de referencia. No invocarla por ahorro o comodidad. Guardar la referencia, los planos implicados y el motivo.

La edición final utiliza dos fragmentos de **una misma toma** como adelanto inicial y desarrollo posterior, separados por parrilla real. Esto no convierte ambos fragmentos en dos ángulos distintos ni autoriza generar repetidamente el mismo encuadre. Es una decisión de montaje para esta pieza.

## 4. Mejorar el gancho sin inventar una métrica de éxito

El primer montaje de 15 segundos resultó lento y sin enganche para el usuario. La versión valorada como mejor dura 9 segundos: interior visible al principio, transición directa a la brasa y corte completo como desarrollo. El rótulo inicial pregunta «¿ESTE PUNTO?» y la voz termina con una pregunta al espectador.

Lección: elegir el momento que justifica ver el reel y colocarlo pronto; no obligar a esperar una cabecera o una presentación estática. Ajustar la duración al material y a la locución medida. Nueve segundos y esos cortes son una receta ensayada, no una duración óptima demostrada.

La secuencia es un montaje publicitario con adelanto, no una receta cronológica. Revisar que los saltos de estado de la carne sean entendibles. No presentar una pieza cortada y luego otra entera como una acción continua.

## 5. Español y selección de voz: limitación comprobada

Cillian fue seleccionado y después rechazado por el usuario por sonar extranjero. Nadine fue la selección posterior y se usó en el resultado valorado como mejor. No hay aprobación aislada que certifique que Nadine sea una voz nativa es-ES.

En el esquema de `seed_audio` consultado no aparecía un selector de idioma ni acento; sí parámetros de velocidad, volumen y tono. No inventar un campo `language=es-ES` ni asumir el origen de una voz por su nombre. Una transcripción correcta tampoco demuestra un acento adecuado.

Para la futura aplicación: escuchar una muestra corta **en español y con palabras del negocio** antes de producir el reel completo; conservar el proveedor, identificador de voz y valoración de pronunciación. Si el proveedor ofrece idioma/acento verificables, usarlos. Este ensayo con Higgsfield no sustituye la propuesta de evaluar ElevenLabs y otras alternativas que ya existe en el informe de voces.

## 6. Subtítulos: texto exacto y tiempos medidos son cosas distintas

La locución de Nadine duró 7,9 segundos. No se recibieron marcas de tiempo en el resultado utilizado. Por ello se ejecutó `faster-whisper` con idioma `es`, y se alineó con el guion escrito mediante el script de subtítulos de Higgsfield. No se utilizó WhisperX ni un servicio de ElevenLabs en esta prueba.

La transcripción inicial escribió «braza». El guion permitió recuperar «brasa» sin inventar tiempos. Alineación obtenida: similitud 0,9375; 16 palabras temporizadas y 16 conservadas. Ese valor mide correspondencia textual, no precisión temporal absoluta ni acento.

Matiz al informe existente: generar subtítulos «desde el guion» solo evita transcribir si hay marcas temporales fiables del proveedor o una alineación posterior con el audio. Repartir palabras según su longitud o duración supuesta no sustituye medir la locución.

Por la petición de editar en AE, los tiempos se trasladaron a capas nativas de texto, se conservó un SRT y se exportaron integrados en el vídeo. Se unieron dos grupos en «Solo chuletón a la parrilla» y se añadió 0,1 s de lectura al final de cada frase, sin cambiar cuándo empieza la voz. Rehacer la alineación si cambia el audio o se desplaza en la línea de tiempo.

## 7. Integración de After Effects y errores que conviene evitar

Se verificó el flujo local de `/use-after-effects` con `fnf-after-effects-mcp` 0.1.1 y Node 24.21.0, contra After Effects 2026. El servidor se registró como `higgsfield-use-after-effects`. En esta sesión la edición se ejecutó con un cliente local del servidor MCP y operaciones documentadas; no se entregó un JSX para que el usuario montara a mano.

Esto actualiza el histórico que describía panel ZXP y bridge OAuth: no se usaron esos componentes para esta prueba. No asumir que cualquier instalación necesita ambos sistemas. Consultar las instrucciones vigentes del comando antes de instalar.

Registrar el servidor no hizo aparecer automáticamente herramientas AE invocables en la conversación abierta. La prueba válida fue leer el proyecto y realizar importación, capas, guardado y exportación. Diferenciar «registrado», «conexión operativa» y «herramientas disponibles en la conversación».

Precauciones descubiertas:

- Leer el proyecto antes de retomar: en una reanudación AE tenía un proyecto vacío. No reutilizar identificadores de otra sesión sin comprobarlos.
- Guardar versión antes de sustituir material. `footage.replace` cambia todas las capas que usan ese elemento: aquí era intencional para el gancho y el corte completo.
- La sustitución cambió 1076 × 1928 por 1080 × 1920. Corregir escala, punto de anclaje y posición; no conservar el ajuste del archivo anterior sin comprobarlo.
- `render.start` procesa la cola activa. En el último registro devolvió `rendered: 2`. Para futuras ejecuciones, inspeccionar qué elementos se renderizarán y sus rutas antes de iniciar; no asumir que solo exportará el último. Nunca limpiar la cola ajena de forma indiscriminada.
- El nombre de la composición conserva «10S», pero la duración real final es 9 s. La aplicación debe leer propiedades y metadatos, no deducir duración del nombre.
- Esperar a que termine la escritura antes de abrir fotogramas: se observó un error de imagen truncada al leer una captura demasiado pronto.
- Mantener Unicode de extremo a extremo: se detectó y corrigió una tilde dañada en «CHULETÓN» durante la primera edición.

## 8. Costes y ejecución asíncrona

Preflight observado para el corte Seedance 2.5, 6 s, 1080p, sin audio nativo: **54 créditos**. El corte Kling 3.0 Pro de 6 s había devuelto **10,5 créditos**. La diferencia sirve para presupuestar rutas por tipo de acción; no es una comparativa equivalente de calidad, una factura ni una tarifa API de Society.

Registrar por intento: modelo solicitado y devuelto, parámetros efectivos, estimación, identificador, estado, motivo de descarte y si se utilizó. Las imágenes pidieron `nano_banana_pro` pero varios resultados se identificaron como `nano_banana_2`: no ocultar ese cambio. Las revisiones por nuevas preferencias también consumen recursos.

Seedance permaneció bastante tiempo en proceso. Se conservó el identificador y no se duplicó la solicitud. Una demora no equivale a fallo ni justifica volver a cobrar/generar. En Society hacen falta estado persistente y reanudación por job, con revisión de resultados desconocidos antes de reintentar. Esto es una necesidad de diseño; no se implementó una cola SaaS.

## 9. Trabajo posterior propuesto para el autor

1. Versionar preferencias por cliente y pieza, con fecha y motivo de cambio.
2. Clasificar cada plano por interacción, ángulo y propósito antes de estimar costes.
3. Separar texto de locución, audio, alineación y montaje para rehacer solo la etapa que cambie.
4. Registrar referencias, jobs, costes de intentos descartados y validaciones junto al reel.
5. Introducir controles antes de renderizar: fuentes, archivos, duración, cola, rutas y audio.
6. Medir retención y respuesta tras publicar; la aprobación creativa del usuario no sustituye esos datos.

No se adjunta implementación de estas funciones: son requisitos derivados de la prueba para que Víctor desarrolle la aplicación.
