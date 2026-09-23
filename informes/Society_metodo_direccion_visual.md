# Society — Método de dirección visual

Estado: vigente · diseño, no implementado. Fecha de revisión: 2026-09-22.
Ámbito: producto Society; preferencias de Torre de Vega solo donde se identifican. Responsable de aprobación de marca: propietario del restaurante.
Fuentes: reglas de imagen/vídeo, Reel 09, investigación previa y fuentes primarias enlazadas. Índice único: [README](../README.md).

## 1. La dirección se aprueba antes de producir

La unidad de trabajo es una campaña coherente: un objetivo, una biblia visual, un reparto de funciones entre planos y un montaje previsto. Primero se decide qué tiene que ser reconocible y qué cambia; después se elige modelo. La elección de un modelo caro no sustituye una dirección aprobada.

El producto guarda la biblia, la ficha de personaje y las referencias por separado. Una preferencia de luz no puede sobreescribir el emplatado real. Un plano generado anterior puede fijar acabado y continuidad, pero no convertirse en la prueba de que existe una mesa. Esta distinción sale de los incidentes de las reglas 1, 14, 17, 19 y 27 de [imagen](../base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_imagenes.md).

Flujo: inventario real → biblia/casting → mapa de beats → hoja de planos y keyframes → revisión G1 → clips → Remotion → revisión de pieza G2. Si cambia la biblia, crear nueva versión y señalar qué piezas en curso dependen de ella; no regenerar las ya publicadas.

## 2. Biblia visual como activo del cliente

Entidad `VisualBibleVersion`: `restaurant_id`, `version`, `status`, `effective_from`, `approved_by`, `approved_at`, `source_asset_ids`, `ruleset_version`, `supersedes`. Los valores de cámara escritos en un prompt son intención artística, no metadatos de una cámara que haya existido.

| Campo | Qué se fija y cómo se comprueba |
|---|---|
| Paleta | Colores de marca y de materiales reales; muestra aprobada; no recolorear comida para encajar |
| Luz | Dirección, tamaño de fuente, dureza, contraste y temperatura pretendida; referencias comparativas de aprobado/rechazado |
| Balance y piel/comida | Blancos y tonos que se preservan; evitar filtro naranja uniforme; excepciones de pieza expresas |
| Óptica | Familias de plano con focal, apertura y distancia orientativas; no combinar números físicamente incoherentes como especificación de rodaje |
| Altura/posición | Mapa de mesa, tres cuartos bajo, lateral, cenital; campo separado de focal para que un zoom no cuente como ángulo nuevo |
| Movimiento | Propósito, aparato/recorrido, velocidad, entrada/salida y zonas que no deben descubrirse sin referencias |
| Grano y nitidez | Intensidad de referencia en una muestra de móvil; evitar grano duplicado en generación y postproducción |
| Grado de color | Transformación/versionado y espacio de color de entrada/salida; intensidad validada, no LUT arbitraria al 100 % |
| Tipografía | Archivo, familia/peso, licencia, tamaño por destino, interletrado, contraste, caja segura y ejemplos |
| Rótulos | Jerarquía de mensaje/fecha/CTA; capas editables, tiempos medidos de lectura y transiciones permitidas |
| Ritmo | Función del arranque, duración útil por beat y pausas; perfil por formato, no cortes cada X s en todos los vídeos |
| Sonido | Voz aprobada, pronunciación de marca, música autorizada, ambiente real y mezcla |
| Exclusiones | Inventar producto/local, incumplir ficha, texto comercial sin fuente; preferencias particulares en otra capa |

Para Torre de Vega, el look dramático cálido de la regla 17, el mínimo de vídeo 1080p, imágenes 2K, tipografía Bodoni MT y las restricciones de vajilla son **preferencias del cliente**. El rechazo al look de estudio en el chuletón del 15/09 es una excepción de esa pieza; no revierte silenciosamente toda la marca. Conservar fecha y alcance. Otro restaurante puede elegir luz diurna y sans serif sin violar Society.

La regla del producto es exigir una decisión consistente y referencias reales. La biblioteca incluye muestras aceptadas y rechazadas con motivo concreto: borde de plato sucio, mantel inventado, dedos distintos, fondo que deriva. Ningún valor del perfil se adivina de un negocio ajeno.

### Compilar la biblia en cada pieza

Antes de generar, resolver en este orden: requisitos de producto/verdad → datos comerciales y permisos → excepción de pieza aprobada → regla vigente del cliente → plantilla general → sugerencia del modelo. Si dos reglas del mismo nivel chocan y no hay sustitución explícita, bloquear el campo y pedir decisión en G1. La fecha más reciente solo desempata dentro de un mismo alcance.

El compilador produce un contrato de plano y el paquete de prompt DirectorIA (JSON + prosa en inglés). Recupera únicamente reglas aplicables; no vuelca 900 líneas de historial. Conserva prompt final, versión y valores de origen. El perfil de cámara es una opción creativa; ingredientes, uniformes y medidas de producto deben proceder de datos confirmados.

## 3. Casting y personaje como función de producto

Personas permitidas, con cara. No añadir una prohibición general para evitar resolver consistencia. Un protagonista habla, presenta el plato, realiza el gesto principal o reaparece. Fondo incidental no necesita ficha. Empleado real identificable requiere consentimiento; la persona de una referencia externa no se replica. Esta política propaga las reglas 2 y 18 sin reabrir su decisión.

La ficha textual se aprueba antes de generar al personaje; después se prepara y aprueba la imagen maestra, y solo entonces se producen sus escenas. Si ya hay una foto autorizada apta, puede ser el ancla sin crear otra identidad.

| Campo de CharacterVersion | Uso |
|---|---|
| character_id, version, restaurant_id | Identidad estable y aislamiento; nunca personajes compartidos por accidente |
| kind y papel | Generado o persona real autorizada; función narrativa, sin inventar testimonio real |
| fixed_traits_en | Rasgos fijos en inglés, aprobados y pegados literalmente al prompt |
| canonical_wardrobe_en | Uniforme real o vestuario canónico; accesorios y marcas estables |
| master_asset_id + hash | Archivo propio aprobado; vinculaciones job_id/media_id/workspace como referencias remotas |
| introduction_shot | Focal/altura/ángulo de presentación para volver a una vista conocida |
| range_limits | Habla/no habla, gestos y registro autorizados |
| permissions, validity, approval | Origen y consentimiento cuando procede; retirada y caducidad trazables |
| reference_set | Vista frontal y otras vistas autorizadas si existen; no prometer calidad de una vista no observada |

Vida: borrador → ficha aprobada → maestra pendiente → activa → sustituida/retirada. Pelo o uniforme nuevo crea versión con fecha; la deriva del generador crea rechazo, no actualización automática. Revisar ficha trimestralmente o al cambiar persona, uniforme o permiso. Una retirada impide nuevos usos y localiza las piezas afectadas mediante linaje; la gestión de publicaciones existentes se decide con el responsable.

No hay un personaje inventado y aprobado en este encargo. Ejemplo de estructura de prompt, con campos por rellenar, no ficha lista para producir:

```text
IDENTITY: Use @image1 only as the approved character identity. Preserve the approved facial traits and canonical wardrobe exactly.
LOCATION: @image2 defines the real room geometry and furniture. Do not import the room from @image1.
PRODUCT: @image3 defines the exact dish, portion and tableware.
ACTION: [one approved, physically simple action].
CAMERA: [approved shot and movement from the visual bible].
PRESERVE: character identity, product count, contact points and real room geometry.
NEGATIVE: no identity replacement, no invented ingredients, no extra hands, no new furniture, no generated commercial text.
```

Los marcadores se resuelven antes de enviar y el orden coincide con medios del adaptador actual. No es una promesa de cumplimiento de la física.

## 4. Consistencia entre planos y durante meses

Preparar un paquete mínimo por plano: foto real de plato, foto de ubicación, maestra de personaje si protagoniza y biblia. Una referencia externa solo gobierna el mecanismo, el encuadre o la distribución de luz permitidos; nunca identidad ni hechos del negocio. La luz se expresa en texto por defecto en Torre de Vega para evitar arrastrar caras desde una referencia de mood.

| Técnica | Qué se hace | Evidencia y límite |
|---|---|---|
| Encadenar una escena fija | Mantener maestra de escena y añadir foto real del nuevo plato; cada variante vuelve a la maestra | Regla 19; evita cadena indefinida de deriva y saturación de referencias |
| Inicio y final | Aprobar ambos extremos y animar entre ellos si el modelo los admite | Regla 16 y catálogo; mejora anclaje, **no garantiza coincidencia al píxel ni continuidad del interior** |
| Multitoma | Agrupar solo beats del mismo espacio/look/personaje con keyframes aprobados y suficientes segundos | Reel 09 evidenció tres planos en 10 s; no demuestra que toda multitoma sea más barata o más fiel |
| Reanclado | Al detectar cambio de cara/plato, volver a maestra y fotos reales; conservar lo correcto | Deriva local → reparación acotada; dos fallos → otro método o pedir grabación |
| Real y generado | Fuego/brasa desde archivo real cuando existe; no sintetizar lo que ya está capturado | Regla 22; cualquier color/sonido añadido se revisa para no inventar un proceso |
| Plano sin acción | Still con movimiento de montaje si cumple su beat | Ahorra créditos; no hace pasar un paneo por acción humana real |
| Transferencia de cámara / 3D / relighting | Ensayo independiente antes de entrar en producción | Investigación previa, no validación integral; fuera del núcleo del TFG |

Los planos se ven juntos antes de animar. Comparar vestuario, tamaño de ración, dirección de sombras, nivel de mesa y continuidad de mano. Anotar posiciones y estados: plato en el aire → contacto → mano fuera. No pedir servir, cortar, girar y brindar en tres segundos porque el prompt quepa.

Para series mensuales, mantener maestra y biblia por versión y un pequeño conjunto de imágenes de control. Repetir estas comprobaciones cuando cambie el modelo servido; no reutilizar el aprobado del mes anterior como garantía. Guardar el último plano de presentación válido para recuperar identidad. Una buena identidad facial no prueba consentimiento ni que el texto del personaje sea verdadero.

## 5. Qué distingue el acabado de estudio: evidencia concreta

| Fallo registrado | Decisión verificable antes/durante producción | Criterio de aceptación |
|---|---|---|
| Comida reorganizada en Hailuo | Evitar modelo vetado para TDV; usar real o extremos con ruta ensayada | Misma ración, utensilios y contacto a lo largo del clip |
| Todos los planos «distintos» desde el mismo tres cuartos | Dibujar posición/altura por plano, no solo variar focal | Variedad visible en contact sheet; excepción solo para transición justificada |
| Parrilla simétrica y limpia | Buscar metraje real del cliente | Brasa, hollín y llama pertenecen al local y al archivo original |
| Cara distinta al cambiar de plano | Ficha/maestra y reanclado | Comparación humana de planos contiguos; ninguna sustitución de identidad |
| Rótulo aparece tarde o no contiene fecha útil | Guion de primer frame y texto confirmado como capa | Se entiende el aviso en móvil, sin depender del pie |
| Cámara tiembla al pedir «natural» | Un movimiento cuantificado con propósito o metraje estable real | Sin jitter perceptible ni entorno inventado al revelar |
| Mantel con manchas heredadas | Reparar defecto local y revisar lote | Sin contaminación repetida; no regenerar todo por un píxel |
| Corte de voz/final abrupto | Timeline con audio medido y escucha completa | Última palabra completa, mezcla legible y cierre deliberado |

No aplicar automáticamente upscale, blur y LUT a todo. Upscale no recupera detalle real perdido; puede inventarlo. Grano no arregla anatomía. La investigación anterior proponía rutas valiosas, pero sobreafirmaba garantías de 3D, motion transfer y coincidencia de fotogramas. Aquí se conservan como hipótesis de ensayo, sin presentarlas como capacidades verificadas de Society.

## 6. Canvas: lo observado, lo documentado y lo que falta

Consulta 2026-09-22. Se abrió [Canvas](https://higgsfield.ai/canvas): la vista pública muestra acceso y pide iniciar sesión para ver lienzos. **No se inspeccionó un lienzo privado ni se ejecutaron nodos.** Por tanto, la siguiente descripción de edición proviene de fuentes primarias del proveedor, no de una prueba práctica en cuenta.

La [ayuda oficial](https://higgsfield.ai/creator-hub/help-center/tools/how-do-i-use-canvas) documenta nodos conectados, ejecución por nodo o secuencia, referencias de imagen/audio, activos previos y plantillas reutilizables. Seedance necesita explicitar en el prompt la función de la referencia. Kling interpreta la imagen conectada como primer frame; para personaje/elemento documenta crear el elemento y usar su etiqueta. Construir nodos es gratis; generarlos consume créditos, también en Canvas con planes Unlimited. No se verificó precio de una campaña concreta.

La [presentación oficial](https://higgsfield.ai/canvas-intro) muestra encadenamiento de prompts, imágenes, vídeos y referencias, ramificación y colaboración. Esto permite representar un paquete de identidad y comparar variantes; **no demuestra un bloqueo persistente y determinista de look, personaje o geometría**. Ese control sigue dependiendo de las referencias, el modelo y la revisión.

Ni el [índice REST](https://docs.higgsfield.ai/docs/llms.txt), ni las herramientas MCP disponibles consultadas aportaron un contrato público verificado para crear/exportar/ejecutar un grafo Canvas desde Society. Ausencia de contrato encontrado no equivale a asegurar que ninguna API exista. Estado: **interfaz documentada; automatización de Canvas no verificada**. No usar endpoints privados descubiertos en el navegador como contrato de producción.

### Encaje decidido

Canvas es mesa opcional de dirección en G0/G1: un nodo de referencias reales, uno de identidad, biblia textual y ramas de keyframes/animación. Sirve para explorar y revisar; no sustituye PostgreSQL, R2, el libro de gastos, aprobaciones o Remotion. Su montaje por nodos no demuestra timeline final con textos, música y publicación que necesita Society.

Guardar fuera de Canvas las referencias, prompts y decisiones; registrar vínculo del lienzo si existe. Duplicar una plantilla no puede arrastrar IDs de otro restaurante sin resolverlos nuevamente. Coste = suma de nodos efectivamente generados + revisión; abrir o conectar no justifica generar.

Plan B operativo, desde el principio: el mismo grafo conceptual vive como entidades de Society y se muestra como hoja de planos/contact sheet. Los adaptadores ejecutan cada etapa permitida y Remotion monta. No necesita un editor infinito para el TFG. Si aparece API de Canvas, debe demostrar importación/exportación versionada, IDs estables, permisos, estados, estimación y recuperación antes de convertirse en adaptador cualificado.

## 7. Ensayo visual que cierra la incertidumbre

Sin ejecutarlo ahora: elegir un plato y local con fotos confirmadas y un protagonista con ficha, comparar tres planos (presentación, acción, producto) y repetirlos en una segunda pieza. Mantener modelo y resolución; variar solo estrategia de referencias: independientes frente a maestra común. Evaluación ciega por propietario/operador: identidad, comida, local, luz, contacto y continuidad, con errores excluyentes explícitos; medir intentos, segundos útiles, coste y minutos humanos.

No inventar un coste completo sin fotos ni configuración. El [preflight de producción](higgsfield/05-automatizacion-de-produccion.md) da 129,25 créditos para dos imágenes + Kling 3 s + Seedance 10 s, **solo como subconjunto orientativo**; este ensayo de dos piezas necesita nuevo presupuesto y autorización de Víctor. Canvas se compara por esfuerzo/recuperabilidad, no adjudicándole mejor calidad por usar un lienzo.

Hasta enero: biblia/ficha versionadas, referencias reales, hoja de planos, dos puertas y montaje reproducible. Después: editor visual propio si ahorra tiempo medido, transferencia de cámara, 3D y pruebas de consistencia automatizadas. El código de la aplicación sigue correspondiendo a Víctor.
