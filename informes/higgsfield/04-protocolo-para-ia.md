<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

# Protocolo de descubrimiento y ejecución para futuras IA

Fecha base: 19/09/2026. Revisado en este repositorio el mismo día (montaje en Remotion; ver [índice](README.md)). Este documento está pensado para adjuntarlo a un encargo o incorporarlo a una base recuperable. **Guardar un archivo no garantiza que un agente futuro lo lea automáticamente.** El sistema que lo utilice debe incluirlo en su contexto o recuperar el apartado pertinente.

## Instrucción breve que se puede reutilizar

> Antes de resolver una tarea audiovisual nueva, lee el índice de esta base y las reglas vigentes del cliente. No limites la solución a los modelos o parámetros que recuerdas. Descubre herramientas, workflows, presets, apps y modelos en los catálogos actuales. Consulta el esquema concreto antes de ejecutar. Diferencia web, MCP y API REST, y separa disponibilidad documentada de acceso y calidad comprobados. Compara las rutas por fidelidad, control, coste total y capacidad de revisión. Registra la decisión, los resultados y lo aprendido. Conserva lo aprobado y actualiza el conocimiento con fecha y alcance.

## 1. Describir la tarea sin nombrar un modelo

Registrar: objetivo, público, formato, duración, idioma, entradas, elementos invariantes, cambios permitidos, presupuesto y entregable. Añadir restricciones reales de cliente: producto, local, identidad, tipografía, estilo, sonido y acciones vetadas.

Ejemplo: «Necesito que este plano de un plato mantenga la vajilla y el fondo, con un desplazamiento suave de cámara, para integrarlo en un reel vertical de 1080p». Esto permite comparar material real, animación generativa y composición; «usa siempre X» oculta esas opciones.

## 2. Elegir la capa correcta de descubrimiento

| Necesidad | Consultar primero |
|---|---|
| No sé qué modelo puede hacerlo | `models_recommend` o `models_explore(action:"recommend")` |
| Conozco una familia de modelos | `models_search` o search de `models_explore` |
| Necesito parámetros precisos | `models_get` o get de `models_explore`, más esquema de generación |
| Me dieron un comando slash | `get_preset_instructions` con el token exacto |
| Quiero un flujo completo | `get_workflow_instructions` sin argumento, luego el nombre elegido |
| Quiero una plantilla visual | `get_presets` o `presets_show`, según conexión |
| Quiero un efecto o función fuera del catálogo | `apps_search` y después `apps_describe` |
| Quiero montar la pieza | Composición de Remotion de Society (props JSON por versión). El puente de After Effects de Higgsfield solo si un cliente trabaja expresamente en AE |
| Quiero integrar una función en Society | Catálogo API, ficha específica e índice REST |

Los prefijos dependen del cliente. En esta sesión coexistían `mcp__codex_apps__higgsfield_*` y `mcp__higgsfield__*`. No trasladar el payload de uno al otro sin comprobarlo.

## 3. Escalera de búsqueda cuando no aparece una función

1. Revisar que se ha buscado en la superficie correcta.
2. Buscar por objetivo y por sinónimos: «tracking», «motion overlay», «object replacement», «ad adaptation».
3. Quitar filtros demasiado restrictivos y consultar otra categoría.
4. Resolver directamente el comando conocido, aunque no esté en el listado inicial.
5. Examinar apps y herramientas especializadas, no solo modelos.
6. Consultar documentación oficial y notas de versión.
7. Si sigue sin resolverse, proponer una combinación de herramientas disponibles o explicar la limitación concreta.

Evidencia de esta investigación: la búsqueda Marketplace por «ad» devolvió cero, mientras que listar sin filtro encontró Match Cut + Tracelab; Ad Recreator resolvió directamente aunque no aparecía en el listado de 63 recetas.

## 4. Ficha mínima de capacidad

Usar una ficha como esta; los valores son campos a rellenar, no hechos ya comprobados:

```yaml
capacidad: objetivo que resuelve
superficie: web | mcp | rest | editor | marketplace
herramienta_o_endpoint: identificador verificado
fuente: URL o nombre de herramienta consultada
verificado_el: fecha y hora
entorno: producción | preview | desconocido
alcance: global | cliente | proyecto
contrato_revision: versión o hash si existe
entradas: tipos, roles, límites
salidas: formato, resolución, duración
coste: estimación, moneda, parámetros y fecha
efectos: lectura | generación | edición | publicación
estado_evidencia: documentado | contrato_leido | ejecutado | aprobado
limitaciones: lista concreta
alternativas: rutas comparables
motivo_eleccion: relación con objetivo y restricciones
revalidar_si: cambio de modelo, error, fuente nueva o caducidad
```

Nunca convertir `contrato_leido` en `aprobado` sin una prueba visual y editorial real.

## 5. Resolver contradicciones

Para endpoints REST, seguir la prioridad oficial: documentación específica del modelo para su contrato; guía general para autenticación/ciclo; OpenAPI como complemento. [Índice API](https://docs.higgsfield.ai/docs/llms.txt).

Para MCP, distinguir tres cosas: lo que acepta la herramienta, las capacidades conceptuales del modelo y los ajustes que aplica el servidor. Una discrepancia entre `image` e `image_references` puede pertenecer a capas diferentes. No probar payloads al azar con generaciones de pago.

Una observación histórica de calidad sigue siendo evidencia útil, pero no demuestra que el contrato actual sea idéntico. Una página publicitaria tampoco demuestra que la cuenta tenga acceso.

Mantener una tabla de discrepancias con fecha, fuentes, efecto y próxima comprobación. No eliminar una fuente antigua: marcarla como histórica o superada y enlazar la nueva evidencia.

## 6. Comparar rutas

Antes de generar, construir una comparación corta:

| Ruta | Fidelidad | Control | Coste estimado | Corrección | Evidencia |
|---|---|---|---|---|---|
| Material real | Evaluar | Evaluar | Medir | Evaluar | Archivo inspeccionado |
| Generación de plano | Evaluar | Evaluar | Preflight | Por toma | Contrato + ensayo |
| Edición localizada | Evaluar | Evaluar | Preflight | Por cambio | Contrato + ensayo |
| Composición/3D | Evaluar | Evaluar | Tiempo/render | Capas/escena | Pipeline disponible |

No asignar puntuaciones ficticias. Si no hay ensayo, escribir «pendiente». Elegir la opción que cumpla los invariantes; si ninguna los cumple, pedir el dato imprescindible o proponer reducir complejidad.

## 7. Preflight

- Comprobar workspace, acceso y presupuesto cuando la tarea vaya a consumir recursos.
- Confirmar modo, duración, resolución, proporción y audio.
- Resolver referencias válidas y su rol; no mezclar rutas locales, URLs, media IDs, job IDs y Element IDs.
- Leer límites de batch y polling de la herramienta actual.
- Preferir estimadores de solo lectura en imagen/vídeo cuando estén disponibles.
- Preparar almacenamiento de salida y recuperación antes de enviar una producción larga.

Los lotes del plugin observado admiten de 1 a 6 solicitudes independientes. `jobs_wait` consulta grupos de hasta 8; la galería de IDs admite hasta 24. Son límites del contrato observado, no límites universales de REST.

## 8. Ejecutar con trazabilidad

Persistir intención, prompt, referencias, configuración, coste previsto y job/request ID. Anotar normalizaciones devueltas por el servidor. No volver a enviar una generación ya aceptada por el hecho de que todavía no aparezca el resultado.

Si una llamada devuelve elección pendiente o rechazo y ningún job ID, no declarar que se ha enviado el trabajo. Un timeout de transporte deja un resultado posiblemente desconocido, no un fallo seguro.

En el sandbox Higgsfield, preparar antes la salida y exportar dentro de la misma operación que crea el archivo. El contrato describe un entorno efímero; no asumir que sus rutas sobreviven como las de un disco local.

## 9. Verificar el artefacto

Revisión técnica: existencia, reproducción, dimensiones, duración, fps, integridad y audio.

Revisión editorial: producto correcto, identidad, geometría, acción, continuidad, pronunciación, textos, CTA y relación con el brief.

Revisión de marca: reglas vigentes y referencias reales. Un estilo aprobado para otro cliente no se hereda automáticamente.

Registrar qué se vio y escuchó de verdad. No escribir «verificado» si solo se recibió un estado `completed` o se leyó una transcripción.

## 10. Aprender del resultado

Separar tres tipos de información:

- **Capacidad del proveedor:** parámetro, modo, límite, contrato.
- **Heurística editorial:** qué parece funcionar y en qué condiciones.
- **Preferencia de cliente:** lo que ese negocio quiere o rechaza.

Una corrección puntual no debe transformarse en veto universal a un modelo. Guardar el contexto: referencias, prompt, versión, intento, motivo de fallo y remedio. Cuando varias pruebas comparables repiten el fallo, aumentar la confianza de la regla.

## 11. Actualización de esta base

Propuesta de cadencia, sin automatización creada:

- Antes de cada tarea nueva: revalidar el contrato de las capacidades elegidas.
- Antes de presupuestar: revalidar coste, configuración y promociones.
- Tras un error de esquema: refrescar catálogo y comparar con la ficha guardada.
- Tras una entrega: guardar aprendizaje y alcance.
- Periódicamente, cuando se vaya a reutilizar esta base: revisar catálogo, changelog y funciones de interés.

No hace falta cargar el inventario completo en todos los prompts. El índice humano permite localizar la familia; después se recupera solo su contrato. Esto reduce ruido y evita que instrucciones antiguas compitan con la versión actual.

## 12. Regla de cierre

Entregar el resultado solicitado con sus límites reales. Distinguir entre una propuesta, una llamada aceptada, un archivo generado, una pieza revisada y una publicación confirmada. Son hitos diferentes.
