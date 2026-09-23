<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

# Ad Adaptation / Ad Recreator aplicado a Society

Investigación del **19 de septiembre de 2026**, basada en la página solicitada, el contrato real devuelto por la conexión y la documentación local del TFG.

> **Revisión del 19/09/2026 en este repositorio.** El original se redactó contra una copia antigua del TFG (`C:\Users\victo\Documents\tfg`, README del 16/09). Se ha corregido para reflejar el montaje en **Remotion** y la **multitoma de Seedance 2.5** decididos el 17/09, y se ha añadido una comprobación propia de la API. Registro de cambios en el [índice](README.md).

## 1. Qué es exactamente el enlace

La URL `https://higgsfield.ai/gpt-astra/ad-adaptation` presenta **Ad Recreator**. Su comando es `/marketing-adapt-video`. Su finalidad publicada es crear un anuncio original para un producto aprovechando la estructura narrativa y comercial de un vídeo de referencia. [Página oficial](https://higgsfield.ai/gpt-astra/ad-adaptation).

No es un modelo nuevo que se seleccione en `generate_video`. Es un procedimiento de trabajo que combina observación, estrategia, escritura, generación, edición y verificación. Se resolvió mediante `get_preset_instructions` y se obtuvo el contrato completo. La consulta no produjo ningún anuncio.

Para Society encaja con una necesidad ya descrita en `idea.md`: pasar de un Reel guardado a un guion y una producción adaptados al restaurante. Su mayor aportación es formalizar **qué se transfiere** del anuncio, por qué y con qué pruebas, antes de producir imágenes.

## 2. Qué pide de entrada

El contrato requiere:

- Vídeo de referencia accesible, que pueda verse y escucharse.
- URL exacta del producto o descripción fiel acompañada de imágenes.
- País objetivo e idioma publicitario.

Reutiliza, cuando están aportados, placement, duración, oferta, afirmaciones y restricciones de marca. Cuando faltan, sus defaults son Meta Reels, 9:16 y una duración dentro de un margen del 10 % de la referencia. Esos defaults no son requisitos universales de Society: un brief explícito puede fijar otro destino o duración.

En hostelería «producto» puede ser un plato, menú, experiencia o servicio, pero hay que concretarlo. Una web general del restaurante no demuestra disponibilidad actual, precio ni horario de una oferta. La ficha debería incluir qué se vende, a quién, por qué interesa ahora, referencias del plato real, CTA y restricciones.

## 3. Qué hace por dentro

El contrato organiza la preparación en **10 apartados de análisis, 5 de adaptación y 8 de escritura**. Este detalle es especialmente útil para tu objetivo de que otra IA sepa investigar una tarea nueva.

### A. Diez apartados de análisis de la referencia

| Apartado | Pregunta útil para Society |
|---|---|
| Hook | ¿Qué ocurre en el primer instante y qué promete? |
| Mapa de beats | ¿Qué se ve, oye y lee en cada tramo, y qué función cumple? |
| Mensajero | ¿Quién comunica y desde qué posición? |
| Forma de hablar | ¿Es íntima, demostrativa, directa, humorística o explicativa? |
| Audiencia y conocimiento | ¿El espectador ya conoce el producto o hay que introducirlo? |
| Problemas y deseos | ¿Qué necesidad moviliza el anuncio? |
| Arquitectura persuasiva | ¿Cómo conecta atención, argumento, prueba y acción? |
| Presentación del producto | ¿Cuándo aparece y qué se demuestra? |
| Edición y producción | ¿Qué aportan ritmo, sonido, encuadres y texto? |
| Diagnóstico estratégico | ¿Qué observamos y qué solo suponemos que funciona? |

Un beat es una unidad narrativa; no coincide necesariamente con un corte. Por ejemplo, tres planos muy breves pueden pertenecer a una sola demostración. Registrar cortes y beats por separado evita que el sistema copie montaje superficial y pierda el argumento.

No basta con la transcripción. El plano inicial, la acción y el silencio también persuaden. Si la IA no puede reproducir el vídeo, debe declarar esa limitación y no inventar movimientos de cámara o tiempos.

### B. Cinco apartados de adaptación

1. **Decisiones de transferencia:** qué mecanismo se conserva y qué se sustituye.
2. **Traducción del problema/deseo:** convertirlo en una necesidad real del cliente del restaurante.
3. **Adaptación del mensajero:** una voz o figura propia, sin copiar identidad o voz de la referencia.
4. **Ajuste al conocimiento de la audiencia:** evitar explicar demasiado al cliente habitual o demasiado poco al visitante nuevo.
5. **Revisión de afirmaciones:** eliminar o suavizar lo que no está respaldado.

Ejemplo propuesto: si la referencia presenta «antes / demostración / después», no hay que inventar un antes negativo del restaurante. Puede traducirse a «llegada del plato / detalle de preparación verificable / momento de disfrute», siempre que el material real lo respalde.

### C. Ocho entregables previos a producción

- Un concepto.
- Especificación del personaje o mensajero lista para generar, si corresponde.
- Cinco hooks alternativos con idea visual de primer fotograma y uno elegido.
- Guion original temporizado y tabla de planos.
- Tres intensidades de CTA y una seleccionada.
- Pack final de textos y overlays.
- Plan de producción.
- Plan futuro de prueba de tres variables.

Estos son materiales de preparación de **un anuncio**. Cinco hooks escritos no autorizan cinco vídeos generados. El contrato prevé una producción acotada y, como máximo, dos envíos correctivos de vídeo; en un encargo real se debe volver a consultar la versión vigente.

También pide conservar el número de beats dentro de un margen de uno y mantener el momento relativo de revelación del producto, salvo que el análisis de audiencia justifique cambiarlo. Esto crea una transferencia razonada y permite comparar estructura, no copiar cada plano sin criterio.

### D. Producción y comprobación

El contrato apunta a Seedance 2.5 como modelo a inspeccionar y pide referencias fieles. Cuando la duración supera una llamada soportada, plantea producir planos coherentes por lotes y ensamblarlos. Exige montaje, mezcla, subtítulos y un MP4 final, no solo clips sueltos.

La comprobación incluye diálogo, producto y variante, afirmaciones, textos, CTA, beats, duración medida, momento de revelación, continuidad, decodificación y audio completo. Conservar planos válidos durante correcciones.

**Límite importante:** esta investigación leyó el procedimiento, pero no ha ejecutado su generación ni verificado calidad de salida en Torre de Vega.

## 4. Diferencias con herramientas parecidas

| Ruta | Qué conserva | Qué modifica | Cuándo encaja |
|---|---|---|---|
| Ad Recreator | Lógica persuasiva, ciertos beats y ritmo de referencia | Guion, producto, mensajero y producción originales | Nuevo anuncio inspirado en una estructura |
| Ad Multiplier | Movimiento, encuadre, cortes y timing del vídeo fuente; audio por defecto | Personas, ropa, objetos, escenarios o detalles pedidos | Variantes visuales de un clip que ya funciona |
| Genjutsu de sustitución | El clip que se está editando | Objeto/personaje objetivo | Una edición generativa concreta |
| Genjutsu de movimiento | El movimiento de un vídeo conductor | Sujeto/escena de referencia | Transferir una acción o movimiento |
| Hook Multiplier | Cuerpo y cierre del anuncio | Apertura, con nueva unión de imagen y audio | Comparar mecanismos de atención |
| Reframe | Contenido fuente en lo posible | Lienzo/proporción | Adaptar placement |

Fuente: contratos MCP consultados. Ad Multiplier publica además la conservación del vídeo y audio base en su [página oficial](https://higgsfield.ai/ad-multiplier). El workflow observado limita sus fuentes a 4–30 segundos.

El contrato de Hook Multiplier sí se leyó: N significa N hooks incorporados en N vídeos completos. Pide localizar el límite semántico de la apertura, conservar el cuerpo y verificar sincronía. El recuento de anuncios de un competidor se utiliza como heurística de selección, nunca como prueba de rentabilidad. Para Society conviene mantener esa distinción.

## 5. Qué dice realmente tu TFG

Se revisaron `README.md`, `idea.md`, `caso-practico-01-torre-de-vega.md` y la referencia operativa MCP de la base de conocimiento.

El README es la referencia principal y describe Society como SaaS para hostelería, no como una app exclusiva de Torre de Vega. Fija fidelidad al negocio real y criterio profesional, y establece que **Víctor escribe el código**; la IA acompaña, investiga y ayuda a validar.

El caso del 07/09 documenta un flujo que acababa en CapCut. El montaje se automatizó en After Effects el 08/09 y **desde el 17/09 se hace en Remotion** (Reel 09, [aprendizajes y costes](../../base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/aprendizajes-y-costes.md)). No tiene sentido plantear ahora el montaje como una brecha intacta.

El README propone elegir técnica por plano, Kling 3.0 para simples y Seedance 2.5 para interacciones complejas, y desde el 17/09 agrupar los planos complejos en una **multitoma** de Seedance 2.5 cuando haya keyframes aprobados. Las notas anteriores que citan Seedance 2.0 o una resolución mínima por cliente no deben sobrescribir esa propuesta general sin revisar fecha y alcance.

La base también muestra que las reglas de un restaurante cambian y que las dependencias importan. Una configuración estética histórica no es una regla universal para todos los clientes de Society.

## 6. Encaje funcional propuesto

| Fase de Society | Aporte de Ad Recreator | Qué debe seguir siendo propio |
|---|---|---|
| Alta y banco de materiales | Exige producto y referencias suficientes | Catalogación real, permisos y reglas por restaurante |
| Biblioteca de Reels | Análisis de estructura y persuasión | Archivo, origen, elegibilidad y clasificación |
| Estrategia | Traducción de deseos y audiencia | Objetivo de negocio, oferta y datos del cliente |
| Guion | Hooks, beats, CTA y temporización | Aprobación y versión del brief |
| Producción | Planos originales adaptados | Selección de técnica y referencias reales |
| Edición | Exigencia de pieza final completa | Composición de Remotion y props por versión |
| Calidad | Lista explícita de verificaciones | Reglas de fidelidad y aceptación |
| Medición | Plan de variables futuras | Datos reales de publicación y resultados |

**Recomendación:** incorporar su metodología al diseño de Society como «Adaptar una referencia», pero mantener la orquestación modular. El valor del producto está en unir referencias, reglas, economía de producción y medición, incluso cuando cambie Higgsfield.

## 7. El conflicto con el montaje de Torre de Vega

El procedimiento de Ad Recreator prescribe montaje mediante el sandbox. El caso práctico rechazó un acabado anterior hecho solo con FFmpeg y hoy monta en Remotion con la tipografía y las reglas de rótulos aprobadas. Son niveles distintos: una receta del proveedor frente al proceso aprobado del cliente.

Para Society propongo reutilizar análisis, mapping, guion y controles, y enviar una lista de edición a la composición de Remotion. Encaja de forma natural: en Remotion la lista de edición **son los props JSON** de la composición (planos, entradas, duraciones, rótulos, voz y música), como `props_montaje_v3.json` del Reel 09. Esto sería una **adaptación propia del procedimiento**, no afirmar que se ejecutó literalmente la receta oficial. Si se utiliza Ad Recreator sin modificarlo, hay que evaluar primero su acabado antes de sustituir el flujo validado.

La lista de edición debería recoger por plano: archivo aprobado, entrada y salida, duración, posición narrativa, rótulo, referencia de regla, audio y transición. Conservar el proyecto editable permite corregir precio o fecha sin regenerar la escena.

## 8. Ejemplo aplicado, sin inventar una oferta

Supongamos que el restaurante aporta un Reel de referencia con este mecanismo: primer plano inesperado → contraste → demostración → revelación → invitación. Este es un ejemplo metodológico, no un análisis de un vídeo visto en esta investigación.

| Elemento de referencia | Adaptación posible | Dato necesario |
|---|---|---|
| Apertura inesperada | Detalle real del plato antes del plano general | Foto/vídeo autorizado y plato exacto |
| Contraste | Exterior/interior o preparación/presentación | Ambos estados reales |
| Demostración | Gesto de servicio o textura observable | Material real o generación aprobable |
| Revelación | Plato completo y contexto del local | Vajilla, mesa y sala correctas |
| CTA | Reserva o consulta de disponibilidad | Canal y oferta confirmados |

No introducir premios, procedencias, número de reservas, precio, disponibilidad ni testimonios si no están acreditados. Si la acción de corte ya fue rechazada por ese cliente, el mecanismo puede traducirse a servir o presentar; no se recupera por aparecer en un preset.

### Prompt de investigación reutilizable

> Analiza esta referencia para Society. Identifica su estructura persuasiva y separa lo observado de las hipótesis de rendimiento. Relaciona cada decisión con los materiales reales y las reglas vigentes del restaurante. Propón cinco aperturas y selecciona una; redacta un guion original temporizado y una lista de planos. Conserva solo los mecanismos que tengan sentido para este producto. Señala datos comerciales que faltan. En esta fase entrega análisis y plan; no generes ni publiques.

### Brief para un futuro encargo de producción

> Crea una adaptación original para [restaurante y producto confirmado], destinada a [país, idioma y placement], con [duración y formato]. Usa [referencia accesible] como evidencia de estructura y [materiales propios] para la identidad real. Aplica [versión de reglas]. El montaje debe seguir [pipeline elegido]. El límite es [número de piezas y presupuesto]. Revisa el vídeo y el audio finales y entrega [formatos]. La publicación se gestiona aparte.

Estos prompts son propuestas para futuros encargos; no se han ejecutado.

## 9. Ensayo que daría evidencia útil al TFG

Comparar tres rutas sobre un mismo brief:

1. Flujo actual de Society guiado por su base de conocimiento.
2. Método Ad Recreator con montaje conforme al procedimiento del cliente.
3. Una tercera opción solo si el objetivo lo justifica: conservar cuerpo y comparar hooks.

No mezclar un ensayo de fidelidad con uno de rentabilidad publicitaria. Primero evaluar producto, espacio, errores físicos, claridad del mensaje, esfuerzo de corrección, coste y plazo. Después, si se publica con autorización, estudiar rendimiento con hipótesis y condiciones comparables.

Rúbrica propuesta sobre 100 puntos: fidelidad al negocio 30, claridad comercial 20, calidad visual y física 20, ritmo y audio 15, facilidad de corrección 10 y documentación reproducible 5. Son pesos propuestos, no un estándar del proveedor. Establecer además fallos excluyentes: producto equivocado, oferta inventada o texto ilegible.

El primer caso de Torre de Vega ya mostró un hook débil con buen sustain según el predictor. Ese aprendizaje justifica ensayar una apertura nueva sin desechar el ritmo que sí interesaba. El score orienta la hipótesis; no demuestra causalidad ni ventas.

## 10. Cambios documentales sugeridos para tu base

Sin modificar retrospectivamente la evidencia histórica:

- Añadir «Adaptar referencia» al flujo funcional y distinguirlo de variantes visuales.
- Añadir ficha de capacidad con superficie, contrato, fecha, coste y estado de ensayo.
- Revisar la hipótesis «API pendiente» a la luz del producto público actual. Hecho en el [informe de la API](02-api-y-arquitectura.md) §8 y §12: la API existe, pero su ficha de Seedance 2.5 no documenta referencias de imagen ni 1080p.
- Corregir manuales que tratan un catálogo antiguo como universo cerrado.
- Separar reglas globales de Society, preferencias de Torre de Vega y ajustes experimentales.
- Guardar los diez/cinco/ocho apartados como datos de trabajo aunque el cliente solo vea el anuncio final.
- Vincular cada plano y texto con materiales reales y reglas versionadas.

## 11. Qué queda pendiente

No está verificado que Ad Recreator exista como un endpoint REST autónomo ni que su uso desde el plugin sea equivalente a integrarlo comercialmente en un SaaS. Tampoco se han probado la calidad de sus salidas, costes efectivos o compatibilidad con todas las restricciones de Torre de Vega.

Sí está verificado que el comando resuelve hoy, que su contrato es detallado y que su metodología coincide con una parte relevante de Society. La recomendación es adoptarlo como referencia de diseño y ensayarlo antes de sustituir módulos que ya funcionan.

## Evidencia

- [Página de Ad Recreator](https://higgsfield.ai/gpt-astra/ad-adaptation).
- `ad-recreator-contrato.json`: respuesta íntegra de solo lectura a `/marketing-adapt-video`.
- `catalogo-modelos.json`: catálogo MCP observado. No se ha copiado a este repositorio porque caduca rápido; queda en la carpeta de origen.
- Documentos locales revisados: README, idea, caso práctico 01 y `knowledge/01-higgsfield-mcp.md`.

Los ejemplos y la arquitectura propuestos en este informe son elaboración propia para el TFG; no son afirmaciones de que se hayan realizado pruebas de producción.
