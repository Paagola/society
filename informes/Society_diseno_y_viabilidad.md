# Society

## Diseño de la aplicación y viabilidad para 20 restaurantes

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 14 de septiembre de 2026 · actualizado el 15 de septiembre de 2026

## 1 Resumen ejecutivo

> **Actualización del 15 de septiembre de 2026.**
>
> - Society es un **proyecto propio para toda la hostelería**, con posible venta a partir de enero de 2027.
> - Hasta entonces, el desarrollo se centra en **contenido para redes sociales**.
> - La oferta pasa a **tres planes acumulativos**:
>   1. Google Business Profile.
>   2. Lo anterior más redes con historias y posts, y gestión de otros sitios.
>   3. Lo anterior más reels.
> - **Seedance 2.5 es el modelo principal de vídeo.**
> - Torre de Vega se mantiene como caso práctico y fuente de evidencia, no como cliente objetivo.
>
> Se han recalculado las secciones 1, 4.2, 9, 10 y 11. El resto conserva el análisis del 14 de septiembre.

Society debería desarrollarse como un sistema de producción audiovisual para restaurantes: recibe material real, convierte una intención sencilla en un guion, produce únicamente los recursos necesarios, verifica su fidelidad y entrega una pieza montada. El valor de la aplicación está en conservar la identidad del negocio y automatizar las decisiones que hoy requieren intervención constante.

La prioridad es construir un director de planos con reglas verificables. Escribir prompts más precisos ayuda, pero no garantiza geometría, manos ni física realistas. Cada plano debe tener referencias, una acción, estados inicial y final, una trayectoria de cámara y criterios de aceptación. Cuando la generación no sea adecuada, Society debe seleccionar material real o una alternativa de montaje compatible con la intención.

El MVP recomendado incluye:

- catálogo real de platos y local;
- tres entradas de creación y reglas de marca versionadas;
- generación de imágenes;
- vídeo con Seedance 2.5 en dos modos: imagen inicial, e imagen inicial y final;
- edición automática en plantillas;
- control de presupuesto por plan;
- la cuenta propia de Society como banco de pruebas.

La reconstrucción 3D propia sigue dentro de la visión del producto, con captura desde Society, pero debe validarse como módulo experimental de una zona del restaurante antes de exigirla en el onboarding de todos los clientes.

Se mantiene GPT-6 Astra para planificar, redactar todos los prompts, dirigir la edición y revisar resultados. Su tarifa pública es 10 USD por millón de tokens de entrada y 50 USD por millón de salida. La escritura de prompts se presupuesta aparte de los modelos que producen imágenes y vídeos. [S1]

**Seedance 2.5 cambia la economía del plan de reels.**

| Configuración | Coste variable de un reel estándar |
| --- | --- |
| Cálculo anterior (Kling 3.0 y Seedance 2.0) | 13,05 USD |
| Seedance 2.5 a 1080p en fal | **44,75 USD** |
| Seedance 2.5 a 720p en fal | **19,88 USD** |
| Seedance 2.5 a 1080p en Higgsfield | 19,05 USD, si su contrato permite el uso en un SaaS |

Un reel estándar tiene seis planos generados. **La resolución y el proveedor son la decisión económica más importante del plan 3.**

**Coste orientativo por plan.** Se calcula con cuotas de ejemplo, no decididas: plan 1 con 4 publicaciones en la ficha y 20 respuestas a reseñas; plan 2 con 20 imágenes y 4 clips de historia; plan 3 con 4 reels.

| Plan | Coste por restaurante | Precio mínimo para un 40 % de margen |
| --- | --- | --- |
| 1 · Presencia en Google | **41 €** | 73 € |
| 2 · Presencia + redes | **85-109 €** | 148-191 € |
| 3 · Completo con reels | **172-314 €** | 301-548 € |

Los rangos dependen de la resolución y el proveedor. Son márgenes de contribución, no beneficio neto ni precios decididos (sección 10).

**Calidad del modelo.** En la clasificación de Arena del 14 de septiembre de 2026, Seedance 2.5 a 720p es cuarto en imagen a vídeo (1.475 ± 8) y empata en la práctica con Seedance 2.0 (1.474 ± 7); en texto a vídeo es sexto. [S23][S24] Está en el grupo de cabeza y aporta capacidades que encajan con Society: hasta 30 s por generación, fotograma inicial y final, referencias múltiples y audio sincronizado. Las votaciones públicas, sin embargo, no lo sitúan como el mejor modelo en solitario. La decisión se mantiene, y el ensayo de calidad del TFG debe comprobarla con platos y locales reales.

Las cifras dependen especialmente de los planos con manos. El presupuesto supone seis planos generados de 4 s por reel y un 50 % de generaciones de vídeo adicionales. No se recomienda vender uso ilimitado ni prometer que todos los vídeos saldrán bien a la primera.

## 2 Alcance y lectura del material

La carpeta indicada contiene 65 archivos: documentación de producto, metodología de prompting, guiones, informes, seis scripts Python, un script de búsqueda y un archivo de espacio de trabajo. El inventario adjunto cubre los 65 archivos y asigna su función dentro de Society.

**Revisión del 15 de septiembre.** Se han incorporado las decisiones comerciales documentadas en `README.md`. También se han vuelto a consultar las fuentes de vídeo (Seedance 2.5 en fal y Higgsfield, clasificaciones de Arena y Artificial Analysis) y de voz. La voz y los subtítulos se detallan en `Society_voces_y_subtitulos.md`.

El análisis es documental y estático. Los vídeos originales, fotografías, proyectos After Effects y archivo Blender citados no están incluidos en esta carpeta. Los resultados visuales y métricas se tratan como registros del proyecto, no como pruebas reproducidas en esta revisión. Los scripts no se han ejecutado ni se han lanzado generaciones de pago. Las fuentes web de precios se han consultado el 14 y el 15 de septiembre de 2026.

El README establece que Víctor escribe el código de la aplicación. Este informe organiza requisitos, contratos de datos, ejemplos de prompts y pruebas; no implementa Society. La elección entre React y Angular debe cerrarse con los requisitos académicos: no conviene construir ambos frontends.

### 2.1 Lo que ya tiene valor demostrado

| Evidencia del repositorio | Consecuencia para Society |
| --- | --- |
| Reel 01 con cuatro rondas de corrección de imágenes | Validar referencias y reglas antes de animar; conservar historial por escena |
| Montaje en AE automatizado desde el 8 de septiembre | Reutilizar esa experiencia; falta convertirla en un servicio recuperable y aislado |
| Reel 06 mejora con Seedance e imagen inicial y final | Los estados visuales son más útiles que insistir solo con prohibiciones |
| Carta web con 38 productos y 41 generaciones iniciales | La fotografía de catálogo es un caso más controlable que un reel con acciones |
| Cambio de reglas que obligó a corregir 15 contradicciones | Versionar reglas y sus dependencias; no cargar indiscriminadamente toda la carpeta |
| Material real de fuego y brasa preferido por el cliente | Crear biblioteca de clips reales reutilizables y evitar sustituciones generativas innecesarias |

Fuentes locales: caso práctico, documentación del Reel 01, Reel 06, mapa de carta web e informe de procesos del 14 de septiembre. El dato 38/41 equivale a 1,079 generaciones por producto en esa fase, pero no incluye el trabajo posterior para fondo oscuro ni mide por sí solo aceptación visual a la primera.

### 2.2 Contradicciones que permanecen

1. **Modelo prohibido aún recomendado.** Los guiones Reel 05 y Reel 06 conservan propuestas antiguas de Minimax Hailuo. La regla 15 de vídeo lo veta para Torre de Vega. La regla 14 todavía calcula 20 créditos con ese modelo, aunque posteriormente se documentaron dos clips Seedance de 36 créditos cada uno.
2. **Presupuesto incoherente.** Reel 02 conserva un bloqueo de unos 31 créditos y una sección titulada «solo 3 vídeos» junto a una corrección posterior de presupuesto para producir todos los planos como vídeo. Society debe recalcular el coste desde el guion vigente.
3. **Temperatura de color y profundidad de campo.** La regla 17 adopta estética cálida dramática y permite fondo desenfocado; la tabla de adaptación de la regla 23 aún prescribe blancos neutros, unos 4300 K y f/5.6-8. Separar temperatura de la fuente, balance de cámara y acabado de color. Un número Kelvin no define por sí solo la apariencia cálida.
4. **Todo vídeo frente a planos fijos.** Hay textos que prohíben resolver con imágenes fijas, pero el formato validado «mismo plano, cambia el plato» utiliza precisamente imágenes intermedias. Convertirlo en excepción de plantilla, no en una prohibición universal.
5. **Más referencias frente a menos referencias.** Las reglas de imágenes recomiendan añadir referencias, mientras la guía de identidad limita el conjunto a tres o cuatro. Seleccionar por papel y compatibilidad; no imponer una cifra universal ni enviar todo el catálogo.
6. **Encadenar frente a reanclar.** El encadenado ayuda a conservar un fondo, pero propaga errores. Cada variante debe conservar la imagen maestra y las fotos originales del producto; la última generación es una referencia de composición, no la nueva verdad del negocio.
7. **Resolución nominal frente a real.** Se registra Kling a 1076 × 1924 aunque se describe como mínimo 1080p. Society debe medir dimensiones y decidir si acepta y normaliza esa salida; no afirmar que cumple literalmente 1080 × 1920 nativos.
8. **Plan 3D contradictorio.** La investigación propone escaneo integrado y Genjutsu; el piloto documenta previsualización con escala arbitraria y decisiones estéticas anteriores. Registrar ambos como etapas distintas, no como una reconstrucción fotorrealista terminada.

### 2.3 Correcciones de interpretación

Un trípode puede estar perfectamente fijo y producir vídeo realista. El problema es la ausencia de actividad convincente o las deformaciones, no la inmovilidad en sí. Tampoco se puede concluir que un modelo sea incapaz de generar vapor porque un intento no lo produzca.

Un desplazamiento o escalado de una capa en AE cambia el encuadre, pero no crea nuevas superficies ni una órbita real. Una imagen de plato colocada sobre un fondo 3D continúa siendo plana; con una cámara amplia aparecerán errores de perspectiva, oclusión y contacto.

Las métricas de un predictor no son mediciones de actividad cerebral de los espectadores ni probabilidades calibradas de viralidad. Los resultados de una cuenta y las correlaciones con muestras pequeñas no demuestran cómo decide Instagram. La mejora de abandono registrada en el Reel 03 es una observación prometedora, no un experimento causal. Society debe separar calidad visual, evaluación editorial y resultados reales de negocio.

## 3 Producto y experiencia de usuario

### 3.1 Onboarding que se reutiliza

El restaurante configura una sola vez su nombre, identidad visual, platos, ubicaciones, estilo preferido y restricciones. Society guía una captura sencilla: plato completo en ángulo de tres cuartos, vista cenital y detalle; fotos del lugar donde se servirá; clips de acciones difíciles, como servir, cortar o trabajar con fuego. La aplicación puede aceptar una sola foto, pero limitará las perspectivas a lo respaldado por ella.

Cada recurso se etiqueta como real, generado o externo. La ficha conserva fecha, producto, ubicación, derechos de uso y calidad. El propietario confirma los nombres y características del plato: un modelo visual no debe decidir ingredientes, alérgenos, denominación comercial ni precios.

El escaneo avanzado, cuando exista, se capturará desde Society. No se obliga al cliente a instalar Polycam, KIRI u otra aplicación. El uso interno de bibliotecas o un importador de Blender no modifica esta experiencia.

### 3.2 Tres entradas principales

| Entrada visible | Información solicitada | Trabajo automático |
| --- | --- | --- |
| Inspirarme en un reel | Archivo o enlace accesible, producto y objetivo | Analizar estructura, adaptar escenas y producir con la marca propia |
| Crear desde un plato | Foto nueva o selección del catálogo | Elegir formato compatible, mejorar imágenes y dirigir acciones |
| Comunicar una novedad | Fecha, oferta o mensaje confirmado | Recuperar material existente, componer texto y montar la pieza |

Enlaces de Instagram que no se puedan recuperar deben conducir a una subida de archivo o a elegir un formato del catálogo. No basar el MVP en acceso a guardados privados ni en scraping que requiera credenciales del usuario.

Seleccionar un plato del catálogo debe ser tan directo como subir una foto. Si el plato carece de referencia real, Society solicita una foto o propone otro producto disponible; no entrega una invención como representación del restaurante.

### 3.3 Automatización con intervención por excepción

El flujo por defecto será «elige intención y producto → generar → revisar reel terminado». Internamente se validan guion, imágenes, clips y montaje, pero el usuario no necesita aprobar cada paso. Un modo «quiero revisar el guion» permite intervenir antes de consumir vídeo.

La nueva automatización sustituye las aprobaciones manuales rutinarias del caso Torre de Vega por reglas de aceptación y un presupuesto previamente elegido. Los datos comerciales nuevos y las decisiones no inferibles siguen requiriendo al propietario. En lugar de mostrar una pantalla de error genérica, Society debe explicar una acción concreta: «La foto no muestra el plato completo» o «Este recorrido necesita otra vista del comedor».

Cuando una escena no pase la revisión, la aplicación reintenta dentro del límite, cambia a una receta compatible o utiliza un clip real existente. Si ninguna opción conserva la intención y fidelidad, pide ayuda. No debe entregar automáticamente un vídeo defectuoso para aparentar un 100 % de automatización.

Las correcciones del usuario se aplican al elemento señalado: texto, intensidad de movimiento, una imagen o una escena. Cambiar una fecha no debe regenerar los vídeos. Cambiar el plato afecta a sus imágenes y clips, conservando montaje y recursos independientes.

### 3.4 Pantallas del MVP

Inicio con proyectos y botón Crear; catálogo de platos; biblioteca del local; asistente de creación; estado de producción; revisión con comentarios por escena; marca y reglas; plan contratado y cuotas del mes; ficha de Google (plan 1); consumo y facturación. El panel interno añade trabajos fallidos, costes por proveedor y versiones de recetas.

## 4 Método de vídeo con mayor control

### 4.1 El contrato de plano

Antes de redactar un prompt, Astra produce una ficha validable. El contrato es información interna de Society; no se envía literalmente a cualquier modelo como si todos compartieran una API.

| Campo | Ejemplo y propósito |
| --- | --- |
| Intención | Mostrar textura del pulpo sin cambiar el emplatado |
| Referencias | Foto real del plato, mesa real, imagen base aprobada |
| Objetos persistentes | Un plato, misma ración, misma vajilla y fondo |
| Acción | Una mano termina de apoyar el plato |
| Estado inicial y final | Plato ligeramente elevado; plato apoyado con mano inmóvil |
| Cámara | Trípode fijo durante una acción de contacto |
| Duración | 4 s generados, 2,5 s útiles previstos |
| Restricciones | No cambiar ingredientes, vajilla, texto ni número de objetos |
| Ruta de producción | Clip real o vídeo con dos fotogramas de referencia |
| Aceptación | Sin penetración de dedos, deriva de encuadre ni deformación de comida |
| Coste | Estimación y máximo reservado para la escena |

Los valores en centímetros, grados y segundos son objetivos creativos cuando se expresan en texto. Solo se vuelven controles geométricos efectivos cuando un motor como Blender ejecuta la trayectoria. Deben compararse contra el resultado; no se consideran cumplidos porque aparezcan en el prompt.

### 4.2 Elegir la técnica antes que el modelo

**Ruta A, material real.** Preferida para fuego, líquidos complejos, contacto mano-objeto, corte, reflejos difíciles y recorridos amplios de sala cuando hay metraje útil. Se selecciona el tramo, se estabiliza con prudencia, se ajusta el color y se monta. Los clips reales conservan física que la IA tendría que reconstruir.

**Ruta B, imagen a vídeo con movimiento moderado.** Para planos cortos de producto, desplazamiento reducido y una acción local. Se anima una imagen mejorada y aceptada con **Seedance 2.5**, modelo principal del proyecto desde el 15 de septiembre de 2026. Su duración mínima es de 4 s, así que se genera con margen y se recorta el tramo útil. Kling 3.0 Pro, candidato inicial en el caso práctico, queda como alternativa documentada si un ensayo concreto lo justifica.

**Ruta C, estados inicial y final.** Para posar una vajilla, retirar una mano o mantener un encuadre que debe cortar con una imagen fija. Seedance 2.5 admite imagen inicial y final en la misma llamada mediante `end_image_url`. [S20] Los dos estados deben ser compatibles en perspectiva, producto, iluminación y posición. Dos imágenes no garantizan la trayectoria intermedia: hay que revisarla.

**Ruta D, composición y animación en AE.** Para rótulos, placas, ráfagas de producto, recortes y desplazamientos contenidos. Permite usar imágenes fijas cuando la plantilla lo justifica. Si se solicita una órbita o revelado lateral, no sustituirlo por un zoom y llamarlo movimiento 3D.

**Ruta E, recorrido 3D o vídeo conductor.** Experimental para sala y arquitectura. Primero se valida reconstrucción y trayectoria, después el resultado de transferencia de movimiento. No se presupone que una herramienta de motion transfer conserve cámara y geometría porque transfiera gestos humanos.

**Modelo principal: Seedance 2.5**

| Capacidad | Dato verificado | Implicación para Society |
| --- | --- | --- |
| Duración | De 4 a 30 s por generación [S20] | Planos cortos con margen para recortar; las secuencias largas son posibles, con menos control por plano |
| Resolución | El esquema de la API de fal ofrece 480p, 720p y 1080p con tarifa propia, aunque su página web indica 720p como máximo [S20]. Un artículo de Higgsfield publica 1080p y otro de las mismas fechas solo 480p y 720p [S21][S22] | Medir las dimensiones reales con ffprobe en la primera integración |
| Fotograma final | Parámetro `end_image_url` [S20] | La ruta C no obliga a cambiar de modelo |
| Relación de aspecto | En imagen a vídeo sigue a la imagen de entrada [S20] | Las imágenes base se generan ya en 9:16 |
| Referencias | Endpoint de referencias en fal; fuentes secundarias hablan de hasta 50 recursos | Probar si mejora la fidelidad del plato frente a usar solo la imagen inicial |
| Audio | `generate_audio` activo por defecto: efectos, ambiente y voz con sincronía labial, incluidos en la tarifa [S20] | Desactivarlo o sustituirlo cuando el montaje use voz o música propias (`Society_voces_y_subtitulos.md`) |
| Rostros reales | En la versión 2.0, CapCut bloquea imágenes con caras reales y añade marca de agua y credenciales C2PA [S26]; no verificado para la API de 2.5 | Probar pronto con referencias de personal real que haya dado su autorización |
| Calidad percibida | Arena, 14/09/2026: cuarto en imagen a vídeo (1.475 ± 8), junto a Seedance 2.0 (1.474 ± 7); sexto en texto a vídeo [S23][S24]. Artificial Analysis aún no lo incluía en agosto de 2026 [S25] | Grupo de cabeza; la ventaja concreta para hostelería se mide en el ensayo del apartado 6.3 |

### 4.3 Biblioteca inicial de cámara

| Receta | Objetivo creativo inicial | Restricciones |
| --- | --- | --- |
| Acercamiento | Recorrido corto hacia el detalle durante 3 s | Una focal constante; no pedir también órbita |
| Deslizamiento lateral | Pequeña traslación para mostrar profundidad | Requiere información lateral suficiente |
| Alejamiento | Revelar plato y contexto ya referenciados | No descubrir una sala que no se ha capturado |
| Cambio de foco | Pasar de copa a plato con cámara estable | Dos distancias reales y foco final legible |
| Trípode de continuidad | Mantener la mesa mientras cambia el plato | Sin escalado ni deriva entre variantes |
| Órbita corta | Mostrar volumen desde un ángulo próximo | Varias vistas o 3D validado; excluir del catálogo básico si falla |

Los rangos se calibrarán con pruebas, no se publican como capacidades garantizadas. En una toma aislada se puede acelerar y frenar suavemente. En una toma que se recorta dentro de un movimiento continuo se genera con margen antes y después del tramo útil para evitar arranques bruscos.

No hace falta cambiar de movimiento en cada plano por obligación. Una plantilla de continuidad puede repetir cámara. El criterio es que el movimiento ayude a leer el plato y encaje con el montaje.

### 4.4 Física de los elementos

Para cada acción, representar soporte, contacto, oclusión y secuencia. Ejemplo: la mano sostiene el borde; el plato desciende; toca la mesa; deja de descender; la mano se libera; se retira. En producción es preferible dividir la acción en dos clips si el modelo no la mantiene de forma estable.

Una salsa se mueve por gravedad y por el recipiente que la vierte. La comida apoyada permanece rígida mientras cambia el punto de vista. Las sombras de contacto permanecen asociadas al objeto. No pedir movimientos independientes de todos los elementos ni «vida» arbitraria a una vajilla inmóvil.

En el caso Torre de Vega se conservan las prohibiciones del cliente. En Society general se almacenan como reglas del restaurante, no como limitaciones universales del software. Una mano no debe clasificarse por género mediante una comprobación visual automática; las preferencias de reparto pueden describirse en el casting sin convertirlas en inferencias sensibles del verificador.

### 4.5 Ejemplo de prompt de cámara

Ejemplo redactado para imagen a vídeo. La imagen de inicio ya debe tener la composición e identidad correctas. Las cifras son objetivos para el ensayo, no una simulación física.

> PRESERVE: Use the supplied approved image as the visual anchor. Keep the same plate, food arrangement, garnish, table and visible room features throughout the shot. The food and tableware remain rigid and resting on the table.
>
> MOTION: A single continuous three-second shot. The camera is already moving at the start and continues through the end. No handling action occurs.
>
> CAMERA: A smooth motorised slider moves slowly towards the plate. Aim for a small change in framing, approximately five percent larger at the end. Keep the focal length and camera height constant. Maintain the plate near the same screen position. The background changes only as expected from this small camera translation.
>
> FILM GRADE: Preserve the approved image's lighting direction, exposure and food colours. Fine grain and the final contrast treatment will be applied consistently in editing.

Si el proveedor admite un campo negativo separado: «handheld shake, wobble, food deformation, duplicate garnish, changing tableware, new objects, zoom pulse». Si no lo admite, el adaptador redacta el estado deseado en positivo. No enviar largas listas de negaciones de manera universal: la guía oficial de Runway, por ejemplo, recomienda instrucciones positivas para Gen-4. [S14]

### 4.6 Ejemplo de prompt de contacto

> PRESERVE: The start and end images show the same serving plate, food and table from the same locked camera. Preserve their identity and proportions. One visible hand supports the near rim without changing its grip.
>
> MOTION: From 0 to 1.2 seconds, the hand completes the short downward movement already started in the first image. The base of the plate meets the tabletop and stops. From 1.2 to 4 seconds, the plate stays supported by the table and the hand stays still in the position shown in the end image. Keep the food arrangement unchanged.
>
> CAMERA: Locked tripod for the full shot. Maintain the same framing and perspective as both reference images.
>
> FILM GRADE: Match the reference exposure and light direction. Keep the contact shadow under the plate continuous.

La retirada de mano se resuelve en otro clip si aumenta la tasa de fallo. La imagen inicial no puede mostrar ya el plato apoyado si se pide que descienda desde el aire. Este tipo de contradicción se detecta antes de generar.

### 4.7 Del reel de referencia al nuevo guion

Analizar cortes y también regiones simultáneas: las pantallas partidas del proyecto demuestran que un simple detector de escenas puede omitir la estructura. Extraer inicio, mitad y final de cada toma y fotogramas adicionales alrededor de contactos o transiciones. Separar el movimiento del objeto del de cámara; conservar incertidumbre cuando la profundidad no se pueda inferir.

Astra devuelve duración relativa, acción, encuadre, posición del sujeto, rótulo y función narrativa. Society adapta esos atributos al restaurante. Se reutiliza el lenguaje audiovisual de la referencia, pero los recursos, personas, marcas y mensajes deben proceder del cliente o estar autorizados. La réplica literal de música o fotografías ajenas no forma parte del flujo automático.

## 5 Imágenes con menos iteración

### 5.1 La calidad empieza en la selección de referencias

Comprobar recorte, nitidez, exposición, reflejos quemados y visibilidad de ingredientes. Pedir una nueva toma cuando falte información esencial es más barato que regenerar múltiples interpretaciones. Guardar una imagen maestra aprobada por producto y estilo, con vínculos a sus fotografías originales.

Asignar papeles explícitos: producto, vajilla, ubicación y composición. Dos referencias que muestran platos distintos no se tratan como vistas del mismo plato. El fotograma externo de inspiración no puede dominar la identidad del producto.

El prompt debe separar lo inmutable de lo editable. Inmutable: ingredientes visibles confirmados, ración, vajilla, identidad y geometría reconocible. Editable: exposición, encuadre respaldado por las referencias, luz, fondo autorizado y acabado. No «mejorar» la foto añadiendo guarniciones, agrandando la ración o cambiando el punto de cocción.

### 5.2 Dos estilos con contratos diferentes

**Editorial para redes.** Composición apetecible, luz direccional y acabado de la marca. Evitar generar el grano intenso en cada imagen si después se añadirá de forma consistente al vídeo. Se pueden conservar los rasgos del estilo dramático de Torre de Vega sin duplicar tratamientos de color.

**Catálogo y carta.** Producto completo, color fiable y fondo adaptado al destino. Para blanco sobre blanco, usar una máscara supervisada o una captura con contraste si se necesita transparencia. El fallo de los métodos probados no demuestra que todo algoritmo de segmentación sea incapaz de resolverlo.

El modo de mezcla multiply no produce un archivo transparente y puede teñir también las zonas claras del producto sobre fondos de color. Los scripts actuales son una solución localizada, no un sistema general de recorte. El alfa debe revisarse sobre fondo blanco, oscuro y de color; evitar halos y pérdida de borde, mano o vajilla.

### 5.3 Generación y reparación

Primera salida: una imagen por escena, no cuatro variantes por defecto. Si pasa, se reutiliza. Si falla un detalle local, edición acotada con máscara o reparación autorizada; si cambia la composición, nueva generación desde la imagen maestra. Después de dos correcciones infructuosas, cambiar de técnica o solicitar material. El máximo se aplica por escena y al proyecto completo.

Ejemplo de prompt de imagen:

> Photograph the actual dish shown in reference A using its existing ingredients, serving size, arrangement and tableware. Reference B defines the real table and room details. Reference C is composition guidance only. Improve the light and framing while preserving the product's identity. Use one directional key light from camera left and retain readable texture in the food. Keep the plate clean and complete, with a credible contact shadow. Do not add garnish, branded fabric, cutlery or other props. Leave the planned caption area visually simple; the caption will be added in editing.

Astra entrega primero una ficha estructurada con referencias y cambios permitidos. El adaptador la traduce al formato real del proveedor. JSON válido permite verificar campos, pero no obliga a un generador visual a obedecerlos. La salida estructurada de OpenAI facilita ese contrato interno. [S13]

### 5.4 Qué medir

Tasa de aprobación a la primera, generaciones facturadas por imagen aceptada, tiempo hasta aceptación, fallos por ingrediente/vajilla/fondo/texto y minutos de corrección humana. Separar fotos de carta, escenas de local y manos: sus dificultades son distintas. Objetivo inicial de ensayo: al menos 80 % de imágenes aceptadas a la primera en el catálogo acotado, sin sacrificar fidelidad. Es una meta, no un resultado obtenido.

## 6 Verificación y aprendizaje

### 6.1 Tres controles consecutivos

**Antes de gastar.** Referencias disponibles, reglas activas, coherencia de estado inicial/final, parámetros admitidos, derechos de recursos y reserva de presupuesto. El validador de esquema detiene valores incompatibles antes de llamar al proveedor.

**Después de generar.** Inspección técnica de dimensiones, duración, decodificación y audio. Comparación visual del producto y fotogramas temporales por Astra. Una revisión por imágenes muestreadas puede perder defectos entre muestras; añadir seguimiento temporal, análisis de movimiento y muestreo denso alrededor de contactos.

**Después de montar.** Texto exacto, contraste, márgenes, continuidad, música, voz, subtítulos, recortes, sincronización y ausencia de fotogramas vacíos. Evaluar el reel completo a velocidad normal y las zonas señaladas a velocidad reducida durante el piloto.

### 6.2 Reglas de aceptación

Bloqueos directos: ingredientes cambiados, objeto duplicado, texto comercial incorrecto, mano claramente deformada, comida que cambia de forma, fallo de exportación, referencia de otro cliente o voz generada que dice una fecha o un precio distinto del guion. No permitir que una nota estética alta compense uno de estos defectos.

Para cámara fija, estimar la transformación del fondo y medir deriva. Para cámara móvil, comparar dirección y continuidad del movimiento previsto y segmentar el producto antes de juzgar su estabilidad. Una diferencia de píxeles entre dos perspectivas no prueba morphing. Las tolerancias se calibran con vídeos reales y con errores conocidos.

Las puntuaciones iniciales pueden valorar fidelidad, movimiento, composición y marca por separado, con escala de 1 a 5 y ejemplos de cada nivel. La confianza del modelo no es una probabilidad de corrección. Registrar cuándo se equivoca el verificador, tanto aceptando defectos como rechazando vídeos buenos.

### 6.3 Ensayo defendible en el TFG

**Diseño del ensayo:**

- Preparar 12 briefs que cubran platos rígidos, manos, líquidos y salas.
- Comparar el método anterior y el nuevo sobre los mismos recursos y con el mismo presupuesto máximo por brief.
- Hacer dos ejecuciones por método: 48 intentos iniciales, más correcciones limitadas.
- Aleatorizar el orden de revisión, con al menos tres personas que no sepan qué método produjo cada vídeo.

**Qué medir:** aceptación sin ayuda, fidelidad, realismo de cámara y objetos, coste por segundo útil y tiempo humano. Publicar también los fallos y los casos sin solución.

**Comparaciones adicionales:**

- Una variante sin fotograma final y otra sin selección de referencias, para ver qué componente aporta la mejora.
- Los mismos clips de Seedance 2.5 a 720p reescalado y a 1080p nativo, revisados a ciegas en el móvil. Así se decide la resolución con datos.
- Si no hay presupuesto para todas las variantes, priorizar la comparación principal y declarar el tamaño pequeño de la muestra.

Los objetivos iniciales son reducir un 30 % las regeneraciones respecto al método anterior y alcanzar al menos un 80 % de entregas sin intervención en las recetas de bajo riesgo. Se validan con datos; no constituyen compromisos comerciales. Los resultados de Instagram se estudian por separado a 7 y 30 días, sin confundir atractivo visual con reservas o ventas.

## 7 Arquitectura y organización del desarrollo

### 7.1 Componentes recomendados

React con TypeScript para una web adaptable o PWA, si encaja con la evaluación del centro. Angular es alternativa equivalente si se exige; no se propone mantener ambos. La interfaz no llama directamente a los proveedores con claves secretas.

**Reparto de componentes:**

- **Backend TypeScript:** proyectos, permisos, planes, presupuestos y trabajos.
- **Supabase:** autenticación y PostgreSQL.
- **R2:** fotos, clips, pistas de voz y entregables.
- **Vercel:** la interfaz y las operaciones cortas.
- **Servidor Windows separado:** ejecuta After Effects.
- **Servidor Linux, solo para las tareas que lo necesiten:** analiza medios, transcribe o alinea subtítulos y ejecuta la reconstrucción 3D.

La cola del producto debe cubrir todas las etapas, incluidas imágenes, modelos de vídeo, voz y edición. Flamenco puede gestionar render de Blender, pero no sustituye esa cola de negocio. Para el MVP puede utilizarse una cola persistente sobre PostgreSQL con bloqueo, concesión temporal del trabajo, reintento y recuperación; una solución especializada es una mejora posterior.

Flujo de datos: interfaz → backend → proyecto y reserva → planificador Astra → validadores → proveedores → revisión → worker de edición → revisión final → R2 → descarga del cliente.

### 7.2 Modelo de datos mínimo

| Entidad | Información esencial |
| --- | --- |
| Restaurante y miembro | Identificador de cliente, usuarios, roles y plan |
| Plan y suscripción | Plan contratado, cuotas mensuales, consumo del mes y renovación |
| Producto y ubicación | Nombre confirmado, atributos y referencias maestras |
| Recurso | Origen real/generado/externo, hash, dimensiones, propietario y permisos |
| Regla de marca | Ámbito, prioridad, fecha, versión, evidencia y regla sustituida |
| Plantilla | Estructura editorial, gráficos y recetas compatibles |
| Proyecto y escena | Brief, versión del guion, contrato de plano y dependencias |
| Intento de generación | Proveedor, modelo, resolución, configuración, prompt, coste y resultado |
| Pista de voz y subtítulos | Guion confirmado, voz, modelo, marcas de tiempo, estilo y versión |
| Evaluación | Defectos, fotogramas señalados, puntuaciones y decisión humana/automática |
| Trabajo de montaje | Timeline, versiones, recursos, estado y salida |
| Registro de consumo | Importe reservado, facturado, liberado y cuota comercial |

Cada consulta, recurso y trabajo lleva tenant_id o equivalente. Probar aislamiento con dos clientes, incluyendo URLs firmadas y cachés. Una imagen aprobada para Torre de Vega no puede convertirse en referencia de otro restaurante por una búsqueda global sin filtros.

### 7.3 Reglas como datos

Orden propuesto: fidelidad y datos confirmados → instrucciones explícitas del proyecto → reglas activas del cliente → reglas de plantilla → recomendaciones del modelo. Si una instrucción contradice un requisito que no debe ceder, el sistema lo explica y propone una alternativa.

Guardar regla anterior, regla nueva, fecha efectiva y artefactos dependientes. No borrar la historia; excluirla del contexto de generación salvo para diagnosticar un error. Un cambio de tipografía invalida las composiciones afectadas, no los vídeos de platos. Un cambio de uniforme invalida las imágenes que muestran personal.

### 7.4 Trabajos recuperables

Estados: borrador, validando, planificando, generando imágenes, revisando imágenes, generando vídeo, revisando vídeo, montando, revisión final, listo, requiere material, fallido o cancelado. Cada etapa conserva entrada, salida y versión para reanudar sin repetir llamadas pagadas.

Usar identificadores idempotentes y guardar el identificador remoto antes de esperar el resultado. Ante un timeout después de enviar, consultar el trabajo ya creado; no reenviar a ciegas. Los webhooks pueden llegar duplicados o fuera de orden. La facturación debe asentarse una sola vez y conciliarse con el proveedor.

Separar reintentos técnicos de regeneraciones por calidad. Los primeros usan espera creciente y un límite; los segundos requieren un diagnóstico y un cambio específico. Aplicar límites por proveedor y reparto justo entre restaurantes. Veinte usuarios registrados no implican veinte generaciones simultáneas.

### 7.5 Edición dirigida por Astra

Astra selecciona la plantilla, el orden, los puntos de corte, las entradas de rótulos y los parámetros permitidos. El motor ejecuta una lista de edición validada. Evitar que cada reel dependa de un agente escribiendo scripts arbitrarios con acceso completo a la máquina.

After Effects conserva el acabado ya aprobado: tipografía, rótulos, placas y revelados. Adobe documenta render automatizado mediante aerender. Esto permite diseñar un worker, pero no demuestra por sí solo licencia adecuada para cualquier servicio SaaS ni concurrencia ilimitada. [S15]

Cada render abre una copia de plantilla y una carpeta temporal del proyecto. Un worker procesa un proyecto a la vez, registra salida y sube el archivo antes de liberar el trabajo. Si cae, se recupera desde el manifiesto. FFmpeg puede inspeccionar o codificar medios sin ser el responsable del diseño gráfico rechazado en el caso anterior.

**AI Motion Designer queda como herramienta opcional para crear plantillas:**

- Su página anuncia trabajo con GPT-6 Astra y capas editables, pero no publica una tarifa que permita cerrar aquí su coste por reel. No hace falta contratarlo para que Astra dirija el montaje de Society.
- Estado a 14/09 (actualización del Reel 08, 20:11): plugin instalado, con el inicio de sesión y la autenticación del bridge pendientes. La prueba de producción sigue sin resultados.
- Los restaurantes usarían Society en el navegador: no deberían instalar plugins de AE. [S12]

### 7.6 Organización propuesta del repositorio

Separar documentación de producto, arquitectura, contratos de datos, decisiones, catálogo de prompts, experimentos y costes. Mantener el caso Torre de Vega en un directorio de evidencias con archivos históricos intactos. El conocimiento activo debe tener un índice con versión y referencias a evidencias, en lugar de copiar bloques completos entre guiones.

**Los scripts existentes son prototipos, no piezas del servicio:**

- **Addon de Blender:** endpoints antiguos, espera remota sin plazo total y credenciales en preferencias locales. No es el backend multiusuario.
- **Script de previsualización:** depende de nombres y fracciones de una caja del edificio; no verifica colisiones ni escala.
- **Scripts de carta:** dependen de rutas locales, umbrales y posiciones de productos en HTML.
- **Buscador:** desactiva la comprobación TLS y mezcla argumentos en código. No trasladar ese patrón a un servicio.

## 8 El módulo 3D

La dirección de cámara explícita es una mejora valiosa, pero un splat no equivale a una malla física limpia. Las zonas no capturadas, cristales, reflejos y superficies uniformes pueden producir artefactos. La captura debe aportar solapamiento, variedad de puntos de vista y una medida real para escala. COLMAP documenta recomendaciones de captura; gsplat aporta herramientas de reconstrucción y render. [S16][S17]

Pipeline experimental: captura guiada dentro de Society → selección de fotogramas → poses con COLMAP → reconstrucción con gsplat → comprobación visual y de cobertura → trayectoria dentro de zonas observadas → render → composición o transferencia opcional. Guardar la versión del local y cuándo se capturó.

El importador 3DGS de KIRI permite trabajar con splats en Blender, pero sus funciones de sombras e iluminación incluyen partes experimentales. No debe asumirse relighting físicamente correcto ni compatibilidad por un número de versión copiado de una nota antigua. [S18]

El piloto debe cubrir una mesa y su entorno, con dos recorridos cortos. Criterios: escala medida, cámara sin atravesar geometría, ausencia de huecos visibles, mobiliario fiel y coste/tiempo registrados. Si un paso falla, el MVP mantiene vídeo real y referencias 2D. Esto conserva la investigación 3D como aportación del TFG sin hacer depender toda la aplicación de una reconstrucción completa.

Para platos se mantienen imágenes mejoradas ancladas a fotos reales. Una composición plana sirve para trayectorias pequeñas; una órbita amplia necesita varias vistas o una representación adecuada del producto. Genjutsu debe probarse con un vídeo conductor de sala y compararse con el render previo, porque la transferencia puede modificar justamente la geometría que se intentaba preservar.

## 9 Tarifas externas y supuestos

### 9.1 Tarifas públicas relevantes

Importes consultados el 14 y el 15 de septiembre de 2026. USD y EUR se mantienen diferenciados. Se excluyen promociones de entrada del escenario de producción. «Estimación» es una reserva de planificación, no una tarifa contractual.

| Herramienta | Tarifa o referencia | Uso en Society |
| --- | --- | --- |
| GPT-6 Astra API | 10 USD/M entrada; 50 USD/M salida; caché 1 USD/M lectura | Todos los prompts, planificación, revisión y dirección de edición [S1] |
| Nano Banana Pro en Gemini API | 0,134 USD por imagen 1K/2K de salida; entrada y texto aparte | Se reserva 0,15 USD por intento con referencias y procesamiento [S2] |
| **Seedance 2.5 en fal** | 0,2205 USD/s a 480p; 0,4730 USD/s a 720p; 1,164 USD/s a 1080p (equivalencias de la tarifa por tokens); audio incluido | **Modelo principal de vídeo.** 4 s a 1080p: 4,656 USD por intento [S20] |
| Seedance 2.5 en Higgsfield | Clip de 10 s: 30 créditos a 480p, 65 a 720p, 90 a 1080p (unos 4,50 USD según Higgsfield) | Alternativa más barata si el contrato permite su uso en un SaaS [S21] |
| Seedance 2.0 estándar en fal | 0,682 USD/s a 1080p en la ficha | Referencia del caso práctico; alternativa fuera del presupuesto base [S4] |
| Kling 3.0 Pro en fal | 0,112 USD/s sin audio; 0,168 USD/s con audio | Alternativa documentada; fuera del presupuesto base [S3] |
| Veo 3.1 estándar | 0,40 USD/s con audio a 720p/1080p | 8 s: 3,20 USD; alternativa para presentador [S2] |
| Veo 3.1 Fast | 0,12 USD/s con audio a 1080p | 8 s: 0,96 USD; candidato de ensayo, no calidad equiparada [S2] |
| ElevenLabs API | Voz v3 y Multilingual v2: 0,10 USD/1.000 caracteres; Flash: 0,05; Scribe v2: 0,22 USD/hora | Voz en off y transcripción; detalle en el informe de voces [S27] |
| After Effects equipos | 33,49 EUR/mes por licencia, sin IVA, compromiso anual | Una licencia de operador en el escenario; validar despliegue [S5] |
| After Effects particular | 26,43 EUR/mes con IVA, compromiso anual | Referencia personal; no utilizada en el coste de producción [S5] |
| Supabase Pro | Desde 25 USD/mes, primer proyecto con cómputo Micro cubierto | Autenticación y base de datos de todos los clientes [S6] |
| Vercel Pro | 20 USD/mes y consumo según plan | Un desarrollador; no veinte licencias de usuario final [S7] |
| Cloudflare R2 Standard | 0,015 USD/GB-mes; 10 GB-mes gratuitos | 400 GB medios: 5,85 USD/mes [S8] |
| R2 operaciones | 4,50 USD/M clase A; 0,36 USD/M clase B | Bolsas gratuitas de 1 M y 10 M; vigilar excesos [S8] |
| Resend | Gratis 3.000 correos/mes, máximo 100/día; Pro 20 USD/mes | Inicio con dominio único de Society y notificaciones agrupadas [S9] |
| Stripe Payments España | 1,5 % + 0,25 EUR en tarjeta estándar EEE | Cobro mensual; otras tarjetas tienen distinta tarifa [S10] |
| Stripe Billing | 0,7 % del volumen Billing | Sumado al cobro si se usa la gestión de suscripciones [S10] |
| Modal L4 | 0,000222 USD/s de GPU; CPU y memoria aparte | Módulo 3D opcional y modelos de voz o transcripción propios [S11] |
| Modal CPU y memoria | 0,0000131 USD/núcleo/s y 0,00000222 USD/GiB/s | Análisis o reconstrucción; no ejecutar AE Windows aquí [S11] |

**Precio y resolución de Seedance 2.5, pendientes de confirmar.**

- **fal:** en su esquema de API, la tarifa por segundo equivale a la tarifa por tokens. Tokens = alto × ancho × segundos × 24 / 1.024; 0,0214 USD por 1.000 tokens a 480p y 720p, y 0,0234 USD a 1080p. Un clip vertical y uno horizontal de la misma resolución cuestan lo mismo. Su página web indica 720p como máximo, pero el esquema admite 1080p. [S20]
- **Higgsfield:** dos artículos de las mismas fechas se contradicen sobre si ofrece 1080p. [S21][S22]
- **Otros proveedores:** fuentes secundarias sitúan BytePlus y Replicate en unos 0,23 USD/s a 720p, sin tarifa oficial de 1080p verificada en este informe.

Antes de integrar, confirmar la resolución real con ffprobe y el importe facturado. En Higgsfield, `get_cost` permite comprobar el coste sin consumir créditos.

La API de Astra aplica sobreprecio a contextos superiores a 272.000 tokens. El presupuesto trabaja por debajo de ese límite, sin descuentos de caché ni batch. Incluye tokens de salida facturados, también razonamiento cuando corresponda. Las imágenes analizadas y las llamadas de revisión deben contabilizarse según el uso real devuelto por la API. [S1]

### 9.2 Servicios opcionales y costes todavía abiertos

| Componente | Tratamiento económico |
| --- | --- |
| Higgsfield web y créditos | Seedance 2.5 se publica en créditos por clip; falta la tarifa contractual aplicable a un servicio con clientes |
| Higgsfield Cloud API | Acceso programático disponible; coste por endpoint y uso de Society pendiente de cotización |
| Genjutsu y 3D Jutsu | Opcionales; pedir cotización exacta de duración, resolución y tipo de entrada |
| AI Motion Designer y bridge | Tarifa por tarea no verificada; no se presupone gratis |
| Higgsedit, upscale, eliminación de fondo | Opcionales; precio por trabajo a verificar; no incluidos en la ruta base. El reescalado de 720p a 1080p debe tarifarse si se elige esa vía |
| Virality Predictor y Video Analysis | Registros locales sin cargo en Plus; no extrapolables a gratuidad de un SaaS |
| Voces de código abierto (Qwen3-TTS, Chatterbox) | Sin licencia de pago; cómputo GPU y mantenimiento por medir |
| Blender, COLMAP y gsplat | Sin cuota de suscripción del software base; sí cómputo, almacenamiento y revisión de licencias |
| FFmpeg y utilidades de análisis | Sin suscripción prevista; cómputo incluido en reserva y revisión de componentes al distribuir |
| Música y efectos | Base con recursos propios o autorizados; biblioteca multiusuario comercial requiere licencia apropiada |
| Dominio | Reserva de 2 EUR/mes; precio final depende del nombre y renovación |
| Worker Windows para AE | Reserva de 80 EUR/mes de capacidad/amortización; no es una oferta de hosting verificada |
| Análisis, logs y copias externas | Reserva conjunta de 15 USD/mes, a validar con carga real |

La ausencia de una tarifa no equivale a coste cero. La ruta base con APIs tarifadas evita depender de las partidas abiertas. Si se exige que toda la generación y edición use exclusivamente Higgsfield, este presupuesto debe rehacerse con su oferta antes de vender mensualidades.

Los términos de Higgsfield contemplan aplicaciones de desarrollador y usuarios finales, pero restringen la reventa del acceso sin valor añadido y pueden limitar automatización de planes ilimitados. Society aporta catálogo, planificación, verificación y edición; aun así, debe encajar su modalidad concreta con el contrato del proveedor. No compartir una cuenta de consumo entre veinte restaurantes como sustituto de una integración. [S19]

### 9.3 Capacidad y unidad de consumo

Se interpretan 20 usuarios como 20 restaurantes de pago, con una cuenta principal por restaurante. Las herramientas de infraestructura y las APIs se contratan para Society; no se multiplican automáticamente por veinte. Una segunda cuenta de empleado del mismo restaurante no implica otra suscripción de modelos.

**Composición de un reel estándar del cálculo:**

- Duración final de 15 a 20 segundos.
- Ocho imágenes base: seis escenas y dos estados finales adicionales.
- Seis clips de Seedance 2.5 de 4 s, la duración mínima del modelo: cuatro con imagen inicial y dos con imagen inicial y final.
- Son 24 s generados antes de reintentos y recortes. El factor de vídeo 1,5 eleva la media a 36 s facturados por reel; el factor de imagen 1,25 eleva la media a diez intentos por reel.

Estos factores representan medias para el presupuesto, no garantías del modelo. La política máxima de tres intentos por plano produce una cola de casos más caros; el 20 % de reserva financiera absorbe parte de esa variación. Proyectos fuera de presupuesto pasan a otra receta o requieren ampliación. Cada plano resuelto con material real (ruta A) reduce directamente la partida de vídeo.

### 9.4 Tokens de Astra

Por reel se reservan 50.000 tokens de entrada y 10.000 de salida facturada, distribuidos entre análisis, selección de recursos, guion, prompts de las ocho imágenes y seis clips, revisión, correcciones y especificación de edición. Su coste es 0,50 + 0,50 = **1 USD por reel**. No son 10.000 tokens de texto visibles necesariamente; el registro de facturación es la referencia.

Por imagen final independiente se reservan 4.000 tokens de entrada y 1.600 de salida para prompt y revisión: **0,12 USD**. Las imágenes base de un reel ya están en el presupuesto de Astra de ese reel; no se cobran otra vez como imágenes independientes.

Si los recorridos reales del agente superan estas reservas, hay que actualizar el coste unitario. Duplicar tokens de Astra duplica su partida, pero no la factura de vídeo ni el almacenamiento.

### 9.5 Coste unitario calculado

| Partida por reel | Operación | USD a 1080p en fal | USD a 720p en fal |
| --- | --- | --- | --- |
| Imágenes base | 8 × 1,25 × 0,15 | 1,500 | 1,500 |
| Vídeo Seedance 2.5 | 6 × 4 s × 1,5 × tarifa por segundo | 41,904 | 17,028 |
| Astra completo | Entrada y salida de todas las fases | 1,000 | 1,000 |
| Render variable | Reserva de procesamiento por reel | 0,350 | 0,350 |
| Total unitario | Antes de infraestructura y reserva general | **44,754** | **19,878** |

Con Seedance 2.5 a 1080p en Higgsfield (unos 0,45 USD/s, pendiente de contrato), el vídeo cuesta 16,20 USD y el reel **19,05 USD**. Si el reel lleva voz en off, se suman unos 0,12 USD: 1.200 caracteres con ElevenLabs v3, contando tres intentos.

**Otras unidades:**

| Unidad | Operación | USD |
| --- | --- | --- |
| Imagen final independiente | 1,25 × 0,15 + 0,12 | 0,3075 |
| Clip de historia de 5 s a 1080p en fal | 5 × 1,5 × 1,164 + imagen inicial 0,3075 | 9,0375 |
| Clip de historia de 5 s a 720p en fal | 5 × 1,5 × 0,473 + 0,3075 | 3,855 |
| Clip de historia de 5 s a 1080p en Higgsfield | 5 × 1,5 × 0,45 + 0,3075 | 3,6825 |

El render variable de 0,35 USD es reserva estimada, además de capacidad fija del worker; si el hosting lo incluye, no se debe facturar dos veces en el modelo real.

## 10 Coste por plan y precio mínimo

### 10.1 Planes y cuotas de ejemplo

La estructura de planes se decidió el 15 de septiembre de 2026 (ver `README.md`). Las cuotas de esta tabla son **ejemplos para calcular**, no cantidades decididas.

| Plan | Contenido | Cuotas de ejemplo al mes |
| --- | --- | --- |
| 1 · Presencia en Google | Ficha de Google Business Profile y SEO local | 4 publicaciones en la ficha con fotos reales, 20 respuestas a reseñas, informe mensual |
| 2 · Presencia + redes | Plan 1 + redes centradas en historias y posts + otros sitios (TripAdvisor y similares) | 20 imágenes finales, 4 clips de historia de 5 s, informes semanales y plan mensual |
| 3 · Completo con reels | Plan 2 + reels | 4 reels estándar |

### 10.2 Partidas variables por plan

| Partida | Operación | USD |
| --- | --- | --- |
| Plan 1: Astra para ficha y reseñas | 4 publicaciones × 0,12 + 20 respuestas × (2.000 tokens de entrada + 300 de salida) + informe mensual (50.000 + 10.000) | 2,18 |
| Plan 2: imágenes | 20 × 0,3075 | 6,15 |
| Plan 2: clips de historia | 4 clips: 36,15 a 1080p en fal; 15,42 a 720p en fal; 14,73 a 1080p en Higgsfield | Según escenario |
| Plan 2: estrategia y medición de redes | Informes semanales y plan mensual con Astra (informe de estrategia de redes) | 4,00 |
| Plan 3: reels | 4 × 44,754 a 1080p en fal; 4 × 19,878 a 720p en fal; 4 × 19,05 a 1080p en Higgsfield | Según escenario |
| Plan 3: voz en off | 4 × 0,12 | 0,48 |

### 10.3 Coste mensual por restaurante

**Supuestos:**

- 1 USD = 0,95 EUR.
- Reserva del 20 % sobre la producción variable.
- Infraestructura fija de 178,05 EUR repartida entre 20 restaurantes: 8,90 EUR cada uno.
- Soporte: 15 EUR por restaurante.
- Gestión asistida de la ficha de Google: 15 EUR (0,5 h a 30 EUR/h) en todos los planes, hasta automatizarla.
- Gestión asistida de otros sitios: 15 EUR en los planes 2 y 3.

**Fórmulas:**

- **Coste por restaurante** = variable × 0,95 × 1,20 + partes fijas.
- **Precio mínimo** para un margen de contribución objetivo del 40 % = (coste + 0,25 EUR) / (1 − 0,02662 − 0,40). El 2,662 % es la comisión de Stripe Payments + Billing (2,2 %) aplicada sobre un precio con un impuesto repercutido hipotético del 21 %, como en la versión anterior de este informe.

| Plan | Escenario de vídeo | Variable USD | Coste por restaurante | Precio mínimo sin impuestos |
| --- | --- | --- | --- | --- |
| 1 | Sin vídeo | 2,18 | **41,39 EUR** | 72,62 EUR |
| 2 | fal 1080p | 48,48 | **109,17 EUR** | 190,83 EUR |
| 2 | fal 720p | 27,75 | **85,54 EUR** | 149,62 EUR |
| 2 | Higgsfield 1080p (pendiente de contrato) | 27,06 | **84,75 EUR** | 148,24 EUR |
| 3 | fal 1080p | 227,98 | **313,79 EUR** | 547,70 EUR |
| 3 | fal 720p | 107,74 | **176,73 EUR** | 308,66 EUR |
| 3 | Higgsfield 1080p (pendiente de contrato) | 103,74 | **172,16 EUR** | 300,69 EUR |

**Lectura:**

- **Plan 1:** es barato de producir porque no genera vídeo. Su coste lo domina el tiempo humano mientras la ficha se gestione de forma asistida.
- **Plan 2:** con pocos clips de historia se mantiene por debajo de unos 110 EUR incluso a 1080p en fal.
- **Plan 3:** a 1080p en fal cuesta más del doble que a 720p o en Higgsfield. **Sin decidir resolución y proveedor, el plan 3 no puede tener precio.**

**Ejemplo de cartera** de 20 restaurantes (8 en plan 1, 8 en plan 2 y 4 en plan 3), con los supuestos anteriores:

| Escenario de vídeo | Coste operativo mensual |
| --- | --- |
| fal 720p | 1.722,36 EUR |
| fal 1080p | 2.459,64 EUR |

Es una ilustración, no una previsión de ventas.

Los precios mínimos son derivaciones del modelo de costes, no una validación de disposición a pagar ni beneficio neto. No incluyen captación, mantenimiento del desarrollo, administración ni impuestos sobre resultados.

### 10.4 Sensibilidad y límites de la oferta

| Cambio | Efecto por restaurante y mes, con reserva |
| --- | --- |
| Un reel adicional | +51,02 EUR a 1080p en fal; +22,66 EUR a 720p; +21,72 EUR a 1080p en Higgsfield |
| Un clip de historia adicional de 5 s | +10,30 EUR a 1080p en fal; +4,39 EUR a 720p; +4,20 EUR en Higgsfield |
| Resolver 2 de los 6 planos de un reel con material real | −15,92 EUR por reel a 1080p en fal |
| Factor de vídeo de 1,5 a 2 en el plan 3 a 1080p en fal | +63,69 EUR por los 4 reels y +13,27 EUR por los 4 clips de historia |
| Tipo presupuestario 1 USD = 1 EUR en el plan 3 a 1080p en fal | +13,69 EUR |
| Una hora adicional de soporte o gestión asistida | +30 EUR |

**Límites de la oferta:**

- **Vídeo acotado por plan.** Cada plan debe limitar la duración y el número de planos generados, y presentar los trabajos especiales como ampliaciones. No se recomienda vender uso ilimitado.
- **Material real.** Cada plano resuelto con metraje real rebaja directamente la partida más cara.
- **Escala.** Con 50 restaurantes y la misma base fija, el reparto de infraestructura bajaría a 3,56 EUR por restaurante. Es una extrapolación económica, no una prueba de capacidad: la cola, el worker de AE y los límites de proveedores se deben dimensionar de nuevo.

### 10.5 Alta y 3D separados de la mensualidad

Propuesta de alta: **149 a 299 EUR** por restaurante, según el trabajo de validar catálogo y marca. Con 1,5 a 3 horas a 30 EUR/h, el coste humano ya es de 45 a 90 EUR, sin contar recursos. Es una decisión comercial por validar.

Ejemplo de cómputo 3D: una L4, dos núcleos físicos y 8 GiB durante una hora cuestan aproximadamente **0,96 USD** con las tarifas de Modal, antes de otros cargos. Si una reconstrucción consume dos horas, 20 altas supondrían unos **38,30 USD** de ese cómputo. No se ha medido que un restaurante se reconstruya en dos horas: el ejemplo muestra la fórmula, no el precio real del onboarding. [S11]

En escaneo, limpieza y validación, el tiempo humano puede dominar el coste de GPU. Con dos horas de ayuda por restaurante a 30 EUR/h, 20 altas añaden 1.200 EUR. No incluir gemelos digitales ilimitados, reescaneos ni transferencia Genjutsu en ningún plan sin un piloto facturado.

## 11 Plan realizable hasta enero de 2027

### 11.1 Alcance

**Primera versión comercial y del TFG:**

- Un restaurante piloto y la cuenta propia de Society.
- Catálogo real, tres entradas de creación y reglas versionadas.
- **Plan 2:** imágenes, posts y plantillas de historias.
- **Vídeo:** clips de Seedance 2.5 con imagen inicial, y con imagen inicial y final.
- **Plan 3:** reels con montaje automático, voz en off opcional y subtítulos.
- **Plan 1:** ficha de Google mínima o gestionada de forma asistida.
- Planes y cobro con Stripe; registro de consumo por plan.

La arquitectura y las pruebas contemplan veinte clientes; no es necesario gastar la producción mensual completa para demostrar aislamiento y colas.

**Quedan como ampliaciones:** publicación automática por API, automatización de otros sitios como TripAdvisor, scraping de guardados, predicción de viralidad comercial, avatar recurrente, doblaje, generación musical, escaneo completo de múltiples salas y editor visual de timeline. Una prueba 3D de una zona puede presentarse como investigación complementaria con resultados y límites.

### 11.2 Calendario orientativo

| Periodo | Resultado verificable |
| --- | --- |
| 15 sep – 4 oct | Requisitos, cuotas de los planes, resolución y proveedor de Seedance 2.5, esquema de datos, elección React o Angular, solicitudes de acceso a Meta y Google, cuenta propia de Society creada |
| 5 oct – 1 nov | Autenticación, aislamiento entre clientes, catálogo, subida de recursos y reglas de marca versionadas |
| 2 nov – 29 nov | Brief de pieza, generación y verificación de imágenes, plantillas de historias, calendario y publicación asistida; la cuenta de Society empieza a publicar |
| 30 nov – 20 dic | Clips de Seedance 2.5, voz en off y subtítulos, montaje automático en plantillas AE y medición en Instagram |
| 21 dic – 10 ene | Ficha de Google mínima o asistida, cobro con Stripe, pruebas decisivas, piloto y documentación |
| Enero de 2027 | Posible lanzamiento comercial |

La duración es una planificación propuesta, no un plazo comprometido. Confirmar el calendario y los requisitos de DAM antes de convertirla en fechas. El proyecto debe mostrar programación propia en orquestación, reglas, datos, seguridad, estados y pruebas; las APIs son componentes del sistema, no toda la aportación académica.

### 11.3 Pruebas funcionales decisivas

- Un cliente no puede acceder a medios de otro.
- Un webhook repetido no cobra dos veces.
- Una caída del worker no repite generaciones.
- Un cambio de precio solo recompone el rótulo.
- Un plato sin referencia no se inventa.
- Una regla nueva invalida las escenas afectadas.
- Un proyecto no supera el máximo reservado.
- Un restaurante no supera las cuotas de su plan.
- Veinte solicitudes se encolan y recuperan con reparto justo.
- Cambiar la voz de un reel regenera audio y subtítulos sin regenerar vídeo.
- Un clip con dimensiones distintas de las pedidas se detecta antes de montar.

**Rendimiento.** Medir la latencia por etapa y el tiempo de ocupación de AE. Si un render tarda 5 minutos, 160 renders consumen unas 13,3 horas de worker al mes antes de reintentos, y una ráfaga de veinte tarda unos 100 minutos en un único worker. Es una hipótesis de capacidad que debe medirse, no un SLA.

### 11.4 Orden de decisiones

1. Cerrar las cuotas de los tres planes, y la resolución y el proveedor de Seedance 2.5.
2. Cerrar las tres plantillas y su límite de complejidad.
3. Formalizar las reglas del restaurante piloto sin copiar su historial como instrucciones.
4. Validar de extremo a extremo una imagen, un clip de Seedance 2.5 con imagen inicial, uno con imagen inicial y final, y una plantilla de AE con voz y subtítulos.
5. Medir los costes reales de esas unidades.
6. Construir la interfaz y ampliar el catálogo.

La prueba central del TFG será que Society puede repetir ese proceso y recuperarse de errores sin la intervención constante que necesitó el caso práctico.

## 12 Fuentes y trazabilidad

Fuentes de precios y capacidades consultadas el 14 de septiembre de 2026 (S1-S19) y el 15 de septiembre de 2026 (S20-S27). Las cifras locales en créditos son evidencias históricas; las tarifas externas se refieren al proveedor y configuración indicados.

- [S1] OpenAI · GPT-6 Astra · https://developers.openai.com/api/docs/models/gpt-6-astra
- [S2] Google · Gemini API pricing · https://ai.google.dev/gemini-api/docs/pricing
- [S3] fal · Kling 3.0 Pro image to video · https://fal.ai/models/fal-ai/kling-video/v3/pro/image-to-video
- [S4] fal · Seedance 2.0 image to video · https://fal.ai/models/bytedance/seedance-2.0/image-to-video
- [S5] Adobe España · Planes After Effects · https://www.adobe.com/es/products/aftereffects/plans.html
- [S6] Supabase · Pricing · https://supabase.com/pricing
- [S7] Vercel · Pricing · https://vercel.com/pricing
- [S8] Cloudflare · R2 pricing · https://developers.cloudflare.com/r2/pricing/
- [S9] Resend · Pricing · https://resend.com/pricing
- [S10] Stripe España · Tarifas y comisiones · https://stripe.com/es/pricing
- [S11] Modal · Pricing · https://modal.com/pricing
- [S12] Higgsfield · AI Motion Designer · https://higgsfield.ai/ai-motion-designer
- [S13] OpenAI · Structured outputs · https://developers.openai.com/api/docs/guides/structured-outputs
- [S14] Runway · Gen-4 Video Prompting Guide · https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide
- [S15] Adobe · Automated rendering · https://helpx.adobe.com/after-effects/desktop/render-and-export/automate-rendering/automated-rendering-network-rendering.html
- [S16] COLMAP · Tutorial · https://colmap.github.io/tutorial.html
- [S17] gsplat · Repositorio oficial · https://github.com/nerfstudio-project/gsplat
- [S18] KIRI · 3DGS Render · https://github.com/Kiri-Innovation/3dgs-render-blender-addon
- [S19] Higgsfield · Terms of Use · https://higgsfield.ai/terms-of-use-agreement
- [S20] fal · Seedance 2.5 image to video, esquema y precios de la API · https://fal.ai/models/bytedance/seedance-2.5/image-to-video/llms.txt
- [S21] Higgsfield · Seedance 2.5 on Higgsfield (publicado el 6 ago. 2026, modificado el 28 ago.) · https://higgsfield.ai/blog/seedance-2-5-on-higgsfield-2026
- [S22] Higgsfield · Seedance 2.5 Pricing (mismas fechas; indica 480p y 720p) · https://higgsfield.ai/blog/seedance-2-5-pricing-2026
- [S23] Arena · Image-to-Video leaderboard (actualizado el 14 sep. 2026) · https://arena.ai/leaderboard/image-to-video
- [S24] Arena · Text-to-Video leaderboard (actualizado el 4 sep. 2026) · https://arena.ai/leaderboard/text-to-video
- [S25] Artificial Analysis · Image to Video Leaderboard · https://artificialanalysis.ai/video/leaderboard/image-to-video
- [S26] The Next Web · Marcas de agua y límites de propiedad intelectual en Seedance 2.0 (31 mar. 2026) · https://thenextweb.com/news/bytedance-seedance-watermarking-ip-global-rollout
- [S27] ElevenLabs · API pricing · https://elevenlabs.io/pricing/api

La evidencia local queda identificada archivo por archivo en Society_inventario_documental.md. Las hipótesis de consumo, cuotas, rendimiento, reserva, cambio de divisa, soporte y precios mínimos son propuestas de este informe y se deben sustituir por mediciones del piloto. El PDF de este informe corresponde a la versión del 14 de septiembre y no incluye esta actualización.
