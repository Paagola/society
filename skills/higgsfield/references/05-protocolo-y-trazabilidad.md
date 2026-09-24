# 05 · Protocolo de descubrimiento, ejecución y trazabilidad

Cómo trabajar con Higgsfield sin fiarse de la memoria: descubrir la capacidad adecuada, comprobar el esquema, ejecutar con trazabilidad y aprender del resultado. Basado en el protocolo propio del TFG (`informes/higgsfield/04-protocolo-para-ia.md`, 19–22/09/2026) y en las disciplinas de producción documentadas por OSideMedia (MIT).

## Índice

1. Principio: verificar, no suponer
2. Describir la tarea sin nombrar un modelo
3. Capa de descubrimiento
4. Escalera de búsqueda
5. Ficha de capacidad y contradicciones
6. Ejecución y registro de generaciones
7. Verificación del artefacto
8. Aprender del resultado

---

## 1. Principio: verificar, no suponer

Disciplina "plausibility-over-verification" [COMUNIDAD, OSideMedia]: un agente que conoce "cómo suele funcionar" una plataforma produce salidas que **parecen** correctas sin comprobarlas. Caso documentado: se inventó `--aspect-ratio 2.35:1` para Kling 3.0, un parámetro que no existe; bastaba con consultar el esquema. **La respuesta verosímil no es la respuesta verificada.** Si la comprobación está a una llamada de distancia (`models_explore(action:"get")`), se hace.

## 2. Describir la tarea sin nombrar un modelo

Registrar: objetivo, público, formato, duración, idioma, entradas, elementos invariantes, cambios permitidos, presupuesto y entregable, más las restricciones reales del cliente (producto, local, identidad, tipografía, estilo, sonido, acciones vetadas).

Ejemplo: *"Necesito que este plano de un plato mantenga la vajilla y el fondo, con un desplazamiento suave de cámara, para un reel vertical de 1080p"*. Así se pueden comparar material real, animación generativa y composición. "Usa siempre X" esconde esas opciones.

## 3. Capa de descubrimiento

| Necesidad | Consultar primero |
|---|---|
| No sé qué modelo puede hacerlo | `models_explore(action:"recommend", query:"…")` |
| Conozco la familia | `models_explore(action:"search")` |
| Necesito los parámetros exactos | `models_explore(action:"get", model_id:"…")` |
| Me han dado un comando slash | `get_preset_instructions` con el token exacto |
| Quiero un flujo completo de varios pasos | `get_workflow_instructions` sin argumento y después el nombre elegido |
| Quiero una plantilla visual o un efecto viral | `get_presets` (`source:"viral"`; producto: `source:"marketing_studio"`, `category:"product-shot"`) |
| Quiero una función fuera del catálogo | `apps_search` → `apps_describe` → `apps_invoke` |
| Quiero montar la pieza | Remotion de Society (props JSON por versión); el puente de After Effects solo si el cliente trabaja en AE |
| Quiero integrar la función en Society | Catálogo de la API, ficha del modelo e índice REST (→ `07`) |

Los prefijos de las herramientas dependen del cliente (se han visto `mcp__codex_apps__higgsfield_*` y `mcp__higgsfield__*`). No se traslada una carga de uno a otro sin comprobarla.

## 4. Escalera de búsqueda

1. Comprobar que se busca en la superficie correcta.
2. Buscar por objetivo y por sinónimos ("tracking", "motion overlay", "object replacement", "ad adaptation").
3. Quitar filtros demasiado restrictivos y probar otra categoría.
4. Resolver directamente el comando conocido aunque no salga en el listado.
5. Examinar apps y herramientas especializadas, no solo modelos.
6. Consultar la documentación oficial y las notas de versión.
7. Si sigue sin aparecer, proponer una combinación de herramientas o explicar la limitación.

Guía oficial [OFICIAL]: si el usuario dice que un modelo existe y la búsqueda no lo encuentra, se confía en él y se comprueba con el listado completo, sin filtros. Evidencia propia: la búsqueda en el Marketplace por "ad" devolvió cero resultados, pero el listado sin filtro encontró Match Cut + Tracelab; Ad Recreator se resolvió directamente aunque no aparecía en el listado de 63 recetas.

## 5. Ficha de capacidad y contradicciones

```yaml
capacidad: objetivo que resuelve
superficie: web | mcp | rest | editor | marketplace
herramienta_o_endpoint: identificador verificado
fuente: URL o herramienta consultada
verificado_el: fecha y hora
entorno: producción | preview | desconocido
alcance: global | cliente | proyecto
entradas: tipos, roles, límites
salidas: formato, resolución, duración
coste: estimación, moneda, parámetros y fecha
efectos: lectura | generación | edición | publicación
estado_evidencia: documentado | contrato_leido | ejecutado | aprobado
limitaciones: lista concreta
alternativas: rutas comparables
revalidar_si: cambio de modelo, error, fuente nueva o caducidad
```

- Nunca pasar de `contrato_leido` a `aprobado` sin una prueba visual y editorial real.
- **Contradicciones:** en REST manda la ficha del modelo, luego la guía general y después el OpenAPI. En MCP se distingue entre lo que acepta la herramienta, lo que el modelo puede hacer y lo que el servidor ajusta.
- **No se borra una fuente antigua:** se marca como histórica o superada y se enlaza la nueva evidencia (tabla de discrepancias con fecha, fuentes, efecto y próxima comprobación).

## 6. Ejecución y registro de generaciones

**Antes de enviar:** workspace, acceso y presupuesto; modo, duración, resolución, proporción y audio; referencias válidas con su rol (sin mezclar rutas locales, URLs, `media_id`, `job_id` e IDs de Element); límites de lote; almacenamiento de salida preparado.

**Al enviar:** persistir intención, prompt, referencias, configuración, coste previsto y `job_id`. Anotar los ajustes que devuelve el servidor. **No reenviar** una generación aceptada porque su resultado aún no aparezca. Si la llamada devuelve una elección pendiente o un rechazo sin `job_id`, **no se ha enviado nada**.

**Registro de generaciones** [COMUNIDAD, OSideMedia, disciplina "log every generation"]: cada intento, aceptado o rechazado, es una fila. Solo registrar los fallos no permite calcular tasas de acierto: el denominador (los aciertos) es lo que convierte la memoria en "tomas por plano conservado" y en presupuestos reales. Regla de los 5 segundos: registrar no puede costar más que una orden corta o una pregunta ("¿vale o no? ¿qué falló?"). Las correcciones se añaden como filas nuevas; el histórico no se edita.

Campos mínimos por fila: fecha, pieza y plano, modelo pedido y servido, parámetros efectivos, coste real, `job_id`, veredicto (aceptada o rechazada), motivo del rechazo y dónde se usó o por qué se descartó.

**Iterar o repetir tiradas** (fallo sistemático frente a aleatorio): → skill `directoria`, `hosteleria/06` §6.

## 7. Verificación del artefacto

- **Técnica:** existe, se reproduce, dimensiones, duración, fps, integridad, audio (`ffprobe`, `cropdetect`, detección de duplicados).
- **Editorial:** producto correcto, identidad, geometría, acción, continuidad, pronunciación, textos, CTA y relación con el brief.
- **Marca:** reglas vigentes y referencias reales. El estilo aprobado para un cliente no se hereda para otro.
- Registrar lo que se **vio y escuchó** de verdad. No escribir "verificado" solo porque llegó un estado `completed`.

## 8. Aprender del resultado

Tres tipos de información, que se guardan por separado:

- **Capacidad del proveedor:** parámetro, modo, límite, contrato.
- **Heurística editorial:** qué parece funcionar y en qué condiciones.
- **Preferencia del cliente:** lo que ese negocio quiere o rechaza.

Una corrección puntual no se convierte en un veto universal a un modelo (el veto a `minimax_hailuo` es una regla de Torre de Vega, no de Society). Cuando varias pruebas comparables repiten un fallo, sube la confianza en la regla.

**Regla de cierre:** propuesta, llamada aceptada, archivo generado, pieza revisada y publicación confirmada son hitos distintos. Se informa del hito real.
