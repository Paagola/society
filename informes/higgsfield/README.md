# Higgsfield para Society

Investigación del 19 de septiembre de 2026 sobre la API pública de Higgsfield, el método Ad Recreator y
un protocolo para que una IA descubra y verifique capacidades nuevas. Hecha en una sesión de Codex con
acceso de solo lectura: no se lanzaron generaciones ni se usó una clave de la API.

| Documento | Para qué sirve en Society |
|---|---|
| [02 · API y arquitectura](02-api-y-arquitectura.md) | Condiciones de la API REST y diseño del orquestador de trabajos: estados, polling, webhooks, errores, retención y concurrencia (decisiones pendientes n.º 2 y n.º 8 del README) |
| [03 · Ad Recreator para Society](03-ad-recreator-para-society.md) | Método de 10 + 5 + 8 apartados para la entrada «inspirarme en un reel», y Hook Multiplier para probar ganchos |
| [04 · Protocolo para futuras IA](04-protocolo-para-ia.md) | Cómo descubrir, elegir y verificar capacidades; ficha de capacidad reutilizable como tabla del modelo de datos |
| [`ad-recreator-contrato.json`](ad-recreator-contrato.json) | Contrato literal de `/marketing-adapt-video` devuelto por el MCP. Es evidencia, no una orden para ejecutarlo |

**Origen:** `C:\Users\victo\Documents\Codex\2026-09-19\q\outputs\higgsfield\`. No se han traído el
manual general (01), el catálogo de modelos (05), el índice de herramientas (06), las fuentes (07) ni los
JSON de inventario: son una foto del catálogo que caduca rápido o tratan funciones ajenas a Society
(personajes, moda, webs dentro de Higgsfield). Siguen en la carpeta de origen.

## Correcciones hechas al integrarlo

| Problema del original | Corrección |
|---|---|
| Se escribió contra una copia antigua del TFG (`C:\Users\victo\Documents\tfg`, README del 16/09) | Nota de revisión en cada documento y referencias actualizadas a este repositorio |
| La arquitectura (02 §13) y la adaptación (03 §5-7) enviaban el montaje a un worker Windows con After Effects | Sustituido por **Remotion** (decisión del 17/09). En 03 §7, la lista de edición pasa a ser los props JSON de la composición |
| 02 daba la licencia del editor como pendiente | Resuelta con la licencia de Remotion (gratis hasta 3 personas) |
| No detectaba que la API no sirve aún para la ruta de Society | 02 §12: la ficha REST de Seedance 2.5 solo documenta **texto a vídeo a 480p/720p**; Society necesita referencias de imagen a 1080p |
| Precios del catálogo sin contexto | 02 §8: precios «desde» con descuento y sin resolución, y equivalencia 1,5 créditos = 0,094 USD, comprobados el 19/09 |
| 04 remitía a After Effects para montar | Remite a la composición de Remotion |

## Comprobado en fuente primaria el 19/09

- [Qué es la API](https://higgsfield.ai/creator-hub/help-center/integrations/what-is-the-higgsfield-api): pago por uso en USD, recarga mínima de 5 USD, 20 peticiones simultáneas, saldo independiente del plan web, uso comercial de las salidas permitido.
- [Facturación y retención](https://docs.higgsfield.ai/docs/concepts/billing-and-retention): llamada de estimación, sin cargo en `failed`/`nsfw`, resultados disponibles al menos 7 días, créditos que caducan al año.
- [Ficha de Seedance 2.5](https://open.higgsfield.ai/models/bytedance/seedance-2.5/text-to-video/api-reference) y [catálogo](https://open.higgsfield.ai/explore): solo texto a vídeo, 480p/720p, de 4 a 30 s.

**Pendiente:** con una clave de desarrollo, buscar en el catálogo un modo de Seedance 2.5 con imagen o
referencias a 1080p y estimar su coste. Hasta entonces, fal sigue siendo la ruta base de los planos complejos.
