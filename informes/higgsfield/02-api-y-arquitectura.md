# Nueva API de Higgsfield y encaje técnico en Society

Fecha de comprobación: **19/09/2026**. Documento de investigación y diseño; no contiene una implementación de la aplicación ni llamadas de generación realizadas.

> **Revisión del 19/09/2026 en este repositorio.** El original se redactó contra una copia antigua del TFG (`C:\Users\victo\Documents\tfg`, README del 16/09). Se ha corregido para reflejar el montaje en **Remotion** y la **multitoma de Seedance 2.5** decididos el 17/09, y se ha añadido una comprobación propia de la API. Registro de cambios en el [índice](README.md).

## 1. Qué cambia para el TFG

Higgsfield publica una API de generación asíncrona con credenciales de servidor, catálogo de modelos y SDK de Python y TypeScript. El producto API se paga desde un saldo separado en dólares; la suscripción web y su Unlimited no se transfieren. La ayuda anuncia recarga mínima de 5 USD y acceso inicial a 20 solicitudes concurrentes, pero el límite válido para una cuenta debe consultarse en su panel. [Descripción comercial y acceso](https://higgsfield.ai/creator-hub/help-center/integrations/what-is-the-higgsfield-api).

**Conclusión para Society:** la API es un candidato real para integrar generación en el backend. No hay que convertir las herramientas del chat en una API imaginaria, ni asumir que todas las skills del plugin tienen un endpoint comercial equivalente.

El README del TFG presentaba los costes de Higgsfield como pendientes de contrato. La existencia pública de API permite revisar esa hipótesis: las condiciones comerciales básicas ya están publicadas (§8). Lo que sigue abierto es si la API ofrece los modos que Society necesita (§12). No permite dar por resueltos los precios de la cuenta, calidad, tratamiento de datos, condiciones SaaS ni disponibilidad de cada modo.

## 2. Dónde se descubre la API

Puntos de entrada oficiales observados:

- [Catálogo/Console](https://console.higgsfield.ai): durante esta consulta redirigió a Open Higgsfield.
- [Documentación compartida](https://docs.higgsfield.ai/docs).
- [Índice para agentes](https://docs.higgsfield.ai/docs/llms.txt).
- [Catálogo actual](https://open.higgsfield.ai/explore).

El índice oficial establece que la ficha de cada modelo manda sobre su endpoint y parámetros. El OpenAPI general es complementario: la ausencia de un modelo allí no demuestra que no exista. También exige diferenciar producción y preview. [Reglas de descubrimiento](https://docs.higgsfield.ai/docs/llms.txt).

**Procedimiento propuesto:** buscar la tarea en el catálogo → abrir la ficha del modo preciso → seguir su documentación y, si existe, su `llms.txt` → registrar fecha, endpoint y entorno → verificar autenticación y coste → hacer una prueba acotada cuando se autorice producción.

## 3. Autenticación

La cabecera recomendada es `Authorization: Key ID:SECRET`. Se mantienen cabeceras antiguas `hf-api-key` y `hf-secret`, pero la documentación recomienda la primera para integraciones nuevas. Las credenciales pertenecen al servidor: no deben quedar en React, Angular, una app móvil distribuida ni un repositorio público. [Autenticación](https://docs.higgsfield.ai/docs/authentication).

Para Society se propone que el navegador solicite una producción a su propio backend. El backend valida usuario, restaurante y presupuesto y llama a Higgsfield. La clave del proveedor no necesita llegar al cliente. Separar credenciales de desarrollo y producción permite limitar el impacto de una incidencia.

## 4. Ciclo de una solicitud

| Estado REST | Significado operativo |
|---|---|
| `queued` | Aceptada y en espera |
| `in_progress` | Procesando |
| `completed` | Resultado disponible |
| `failed` | Fallo terminal |
| `nsfw` | Rechazo de moderación |
| `canceled` | Cancelación antes de procesamiento |

La respuesta inicial incluye `request_id`, `status_url` y `cancel_url`; deben persistirse inmediatamente. Se recomienda usar las URLs devueltas. La salida puede estar en `images`, `video` o `audio`, según modelo. La cancelación solo se admite si todo el trabajo permanece en cola; una petición aceptada para cancelar responde 202. [Ciclo oficial](https://docs.higgsfield.ai/docs/concepts/requests).

**Diseño propuesto:** distinguir estado del proveedor y estado de negocio. «Generación terminada» no significa «pieza aprobada» ni «publicada». Society necesita estados propios como pendiente de revisión, rechazada por fidelidad, aprobada y archivada. Así no se entrega automáticamente un vídeo defectuoso solo porque el proveedor terminó.

## 5. Polling

La guía propone comenzar con intervalos de dos segundos, aumentar gradualmente hasta diez, añadir variación aleatoria cuando hay varios workers y detenerse en estado terminal. Un timeout de la aplicación no cancela necesariamente el trabajo remoto. Las consultas de estado pueden recuperarse después. [Polling](https://docs.higgsfield.ai/docs/concepts/polling).

**Diseño propuesto:** el cierre de la pestaña no debe perder una producción. Persistir el ID antes de devolver éxito al cliente y permitir retomar el seguimiento. Mostrar al usuario progreso por etapa, evitando porcentajes ficticios si el proveedor no informa de ellos.

## 6. Webhooks

La documentación usa el parámetro de query `hf_webhook`, con una URL HTTPS pública. Los eventos terminales contienen `request_id`, `status`, `error` y `payload`. El receptor debe contestar antes de diez segundos; se documentan reintentos por red o 5xx durante hasta dos horas, ausencia de reintento para 4xx y posibles duplicados. La deduplicación se hace por solicitud y estado. [Webhooks](https://docs.higgsfield.ai/docs/how-to/webhooks).

**Diseño propuesto:** guardar duraderamente el evento, responder y procesar en segundo plano. La página consultada no documenta una firma criptográfica del webhook; no inventar una cabecera HMAC. Antes de aceptar una transición sensible, reconciliar con el estado autenticado del proveedor y comprobar que el request pertenece al tenant esperado. Mantener polling como recuperación.

## 7. Subida de medios: REST no es MCP

En REST se solicita una URL de subida mediante `POST /files/generate-upload-url`, indicando el tipo de contenido. La respuesta proporciona `upload_url`, `public_url` y `upload_headers`. Se realiza PUT con todas esas cabeceras y después se utiliza la URL pública en el campo de entrada del modelo. La URL de subida expira tras una hora; no se envía a almacenamiento la clave de la API. [Subida de archivos](https://docs.higgsfield.ai/docs/concepts/file-uploads).

En MCP, en cambio, aparecen `media_upload`, PUT y `media_confirm`, o un widget/ayudante específico del cliente, y normalmente se trabaja con IDs confirmados. No añadir un paso `media_confirm` a REST sin que su contrato lo pida, ni pasar un `media_id` MCP a un campo REST que exige una URL.

**Diseño propuesto:** Society debe almacenar el archivo original y sus derivados, MIME, tamaño, hash, titularidad, restaurante y función. El objeto propio de la aplicación se relaciona con los IDs/URLs de cada proveedor, sin confundirse con ellos.

## 8. Coste, saldo y retención

Existe estimación previa mediante una ruta de la familia `/estimate/<ruta-del-modelo>`, con el mismo cuerpo que la generación. La respuesta de ejemplo contiene `credits` y `usd`; el importe del ejemplo no es una tarifa. Se documenta devolución de reservas para `failed`, `nsfw` y cancelaciones válidas. Los resultados permanecen accesibles **al menos siete días**; hay que copiarlos a almacenamiento propio. La documentación también indica caducidad del saldo en un año. [Facturación y retención](https://docs.higgsfield.ai/docs/concepts/billing-and-retention).

La ayuda comercial habla de saldo en USD y la técnica conserva nomenclatura de créditos. No convertir eso en equivalencia con créditos de suscripción. Para Society conviene registrar el importe estimado y final en su unidad original, la moneda, configuración, promoción y fecha.

**Modelo de coste propuesto:**

`Coste de pieza aprobada = generaciones aceptadas + intentos técnicamente correctos pero descartados + edición/render + voz + almacenamiento + trabajo humano`

Un vídeo feo que terminó correctamente no equivale a un fallo técnico reembolsable. Reservar un margen por regeneraciones y limitar los intentos por plano. Comparar proveedor A y B con el mismo material, duración, resolución y criterio de aprobación.

No se han recalculado los 12,97 USD por reel del README: faltan estimación autenticada y prueba de la configuración equivalente. Los precios públicos «desde» y descuentos observados no son comparables directamente con ese reel de 1080p.

**Datos comprobados el 19/09 en la documentación oficial:** el ejemplo de estimación muestra 1,5 créditos = 0,094 USD (unos 0,063 USD por crédito de API), y el catálogo público muestra Seedance 2.5 desde 0,144 USD/s (normal 0,2057 USD/s, 30 % de descuento) y Kling 3.0 desde 0,042 USD/s (normal 0,084 USD/s, 50 % de descuento), **sin indicar resolución ni modo**. No se sabe si un crédito de API equivale a uno del plan web, así que los 125,25 créditos del Reel 09 no se pueden convertir a coste de API. Los ahorros ya calculados para Society están en [aprendizajes y costes del Reel 09](../../base-conocimiento-torre-de-vega/09-reel-volvemos-a-abrir-2026-09-17/aprendizajes-y-costes.md).

## 9. Errores y duplicados

| Respuesta | Qué investigar |
|---|---|
| 400 | Parámetros, entrada o concurrencia |
| 401 | Credenciales |
| 403 | Saldo insuficiente según la documentación |
| 404 | ID/modelo o acceso de cuenta |
| 422 | Validación del cuerpo |
| 423 | Modelo bloqueado temporalmente |
| 500 | Error de servicio; recuperación con espera |
| 503 | Modelo deshabilitado o no listo |

La documentación advierte que las generaciones no admiten actualmente una clave de idempotencia y que un POST no debe repetirse automáticamente tras timeout ambiguo. Registrar también `X-Correlation-ID`. Los GET de estado sí pueden reintentarse con espera exponencial. [Errores](https://docs.higgsfield.ai/docs/concepts/errors).

**Diseño propuesto:** dar a cada intención de producción un ID interno único. Evita dobles clics y reenvíos de la propia aplicación, pero no elimina por sí solo la incertidumbre de un POST que el proveedor recibió sin devolver respuesta. Marcar ese caso como resultado desconocido y reconciliarlo antes de gastar de nuevo.

## 10. Concurrencia

La documentación recomienda un pool de workers, seguimiento de solicitudes aceptadas, espera con variación aleatoria y separar consultas de estado de envíos de generación. No publica cabeceras estándar de rate limit ni `Retry-After`; el panel de la cuenta manda. [Límites](https://docs.higgsfield.ai/docs/concepts/rate-limits).

**Diseño propuesto:** cola por proveedor y cupos por restaurante. Una campaña grande no debe bloquear a todos los demás. Priorizar entregas cercanas y guardar el orden de planos independientemente del orden de finalización. Cancelar solo trabajos realmente cancelables.

## 11. SDK: qué estudiar, sin escribir el TFG por Víctor

Los clientes oficiales son Python y TypeScript. La guía indica `@higgsfield/client` para Node y muestra la interfaz v2; ofrece métodos de suscripción con espera, envío y seguimiento explícito. Para un backend que se recupera de reinicios interesa estudiar el control explícito del ciclo frente a mantener una única llamada larga abierta. [SDK oficiales](https://docs.higgsfield.ai/docs/how-to/sdk).

No se han instalado paquetes ni generado código de Society. La tarea posterior de aprendizaje puede consistir en que Víctor implemente un adaptador mínimo y explique cómo persiste el ID, trata errores y descarga el resultado. Los ejemplos oficiales son la referencia para sintaxis actual.

## 12. Ejemplo de contrato y separación de nombres

La ficha pública indexada de Seedance 2.5 identifica la ruta `bytedance/seedance-2.5/text-to-video` y campos como prompt, duración, resolución, proporción, bitrate, formato y audio. La lectura directa de esa página fue intermitente; su contenido apareció en búsqueda oficial. No se ha validado una llamada autenticada. [Ficha API de Seedance](https://open.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference).

En MCP se observó el ID `seedance_2_5` y modos `t2v`, `omni_reference`, `video_edit` y `video_extension`. El catálogo declara 4–30 segundos, 480p/720p/1080p y audio opcional. En edición se hereda la duración del vídeo fuente y se ignoran duración/proporción; en extensión se hereda la proporción y hay dirección backward/forward. Fuente: `models_get`, comprobado en esta sesión.

**Laguna crítica para Society (comprobado el 19/09):** la ficha REST pública de Seedance 2.5 solo documenta **texto a vídeo** y solo resoluciones **480p y 720p**. La ruta de producción de Society necesita justo lo contrario: animar keyframes aprobados con referencias de imagen a **1080p**, como la multitoma `omni_reference` del Reel 09 (tres keyframes → tres planos en un clip de 10 s). Generar solo desde texto inventa el local y rompe el principio de fidelidad. **Mientras no aparezca en la API un modo con imagen o referencias a 1080p, la API de Higgsfield no sustituye a fal en los planos complejos.** Comprobarlo en el catálogo con una clave de desarrollo antes de decidir proveedor (decisión pendiente n.º 2 del README).

**No existe una transformación universal de nombres:** `seedance_2_5` no se convierte automáticamente en una ruta REST; tampoco hay que enviar `mode: omni_reference` al endpoint de texto porque aparezca en MCP. Hay que abrir la ficha del modo REST correspondiente.

## 13. Arquitectura propuesta para Society

```text
Cliente / operador
    ↓ brief + referencias + reglas vigentes
Backend Society
    ↓ autorización + presupuesto + contrato de plano
Cola de producción
    ↓ adaptador del proveedor
Higgsfield API / proveedor alternativo / material real
    ↓ estado + archivos
Almacenamiento propio + revisión de calidad
    ↓ lista de edición aprobada
Worker de montaje Remotion (Linux, render headless)
    ↓ MP4 + props de la versión + controles de calidad
Aprobación de pieza
    ↓ publicación autorizada por canal independiente
Métricas reales → aprendizaje por restaurante
```

Desde el 17/09 el montaje se hace en Remotion en lugar de un worker Windows con After Effects: desaparecen la licencia y el ordenador Windows del coste fijo, y el render corre en la misma infraestructura Linux que el resto del backend. Es una propuesta de arquitectura compatible con el README, no una descripción de funciones que Higgsfield ofrezca en una sola llamada. La edición, las aprobaciones, la publicación y la medición son responsabilidades distintas.

### Datos mínimos propuestos

| Entidad | Información necesaria |
|---|---|
| Restaurante | Marca, catálogo, reglas y sus versiones |
| Asset | Original, derivados, hash, licencia/permiso, función |
| Referencia creativa | Origen, análisis, observaciones y qué se permite transferir |
| Contrato de plano | Acción, cámara, duración, referencias, fidelidad, técnica |
| Trabajo del proveedor | Request ID, superficie, modelo, parámetros, estado y coste |
| Intento | Motivo, variante, resultado y decisión de aceptación |
| Montaje | Versión, lista de edición, audio, texto y render |
| Evidencia | Ficheros inspeccionados, defectos y comprobaciones realizadas |
| Experimento | Variable modificada, control, objetivo y resultado |

### Dependencias y actualización

Si cambia una regla del restaurante, no es suficiente cambiar una frase en el perfil. Hay que localizar los briefs, prompts, imágenes y montajes que la utilizaron. Marcar lo afectado como pendiente de revisión y evitar rehacer automáticamente los artefactos no afectados.

## 14. Ensayo mínimo antes de elegir proveedor

Propuesta, aún no ejecutada:

1. Elegir tres planos reales: comida sin interacción, mano/utensilio y una escena del local.
2. Mantener referencias y contrato editorial idénticos.
3. Comparar las rutas candidatas a la resolución prevista para el producto.
4. Medir coste de cada intento, latencia, defectos, tiempo de revisión y resultado utilizable.
5. Ensayar recuperación de seguimiento y descarga; no provocar gasto duplicado para probar un timeout.
6. Decidir con coste por plano aprobado, no con demos publicitarias.

Las condiciones contractuales para operar un SaaS siguen como validación pendiente. La licencia del editor queda resuelta con Remotion: gratis hasta 3 personas y, a partir de ahí, 0,01 USD por render con un mínimo de 100 USD/mes. Este informe no sustituye su revisión ni modifica las decisiones del README.
