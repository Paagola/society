# 07 · API REST y arquitectura en Society

Resumen operativo de los informes del TFG `informes/higgsfield/02-api-y-arquitectura.md` y `05-automatizacion-de-produccion.md` (documentación oficial consultada del 19 al 22/09/2026). Para el detalle completo, esos informes mandan.

## Índice

1. MCP no es REST
2. Ciclo de una petición REST
3. Errores, duplicados e idempotencia
4. Coste y retención
5. La laguna de Seedance 2.5 en REST
6. Arquitectura propuesta
7. Límite de este TFG

---

## 1. MCP no es REST

| | MCP (Claude, agencia) | API REST (backend de Society) |
|---|---|---|
| Identificadores | `seedance_2_5`, `nano_banana_pro` | Rutas como `bytedance/seedance-2.5/text-to-video` |
| Subida de medios | `media_upload` → PUT → `media_confirm` → `media_id` | `POST /files/generate-upload-url` → PUT con todas las cabeceras → `public_url` (caduca en 1 h) |
| Coste | `get_cost:true` | Ruta `/estimate/<ruta-del-modelo>` con el mismo cuerpo |
| Créditos | Monedero del plan | Saldo de la API (USD/créditos), **no convertible** |

**No hay una traducción universal de nombres:** `seedance_2_5` no se convierte en una ruta REST, y no se envía `mode:"omni_reference"` a un endpoint de texto a vídeo porque exista en el MCP. Se abre la ficha del modo REST correspondiente.

## 2. Ciclo de una petición REST

- Autenticación: cabecera `Authorization: Key ID:SECRET`. Las credenciales viven **solo en el servidor**, nunca en React, Angular ni en una app distribuida.
- Estados: `queued` → `in_progress` → `completed` | `failed` | `nsfw` | `canceled`. Se persisten al instante `request_id`, `status_url` y `cancel_url`.
- Polling: empezar cada 2 s, subir hasta 10 s, con variación aleatoria cuando hay varios trabajadores. Un timeout de la aplicación no cancela el trabajo remoto.
- Webhooks: parámetro `hf_webhook` (HTTPS pública); respuesta en menos de 10 s; reintentos hasta 2 h ante errores de red o 5xx; posibles duplicados (se deduplica por petición y estado). **No hay firma criptográfica documentada:** no inventar una cabecera HMAC; antes de una transición sensible, reconciliar con el estado autenticado.

## 3. Errores, duplicados e idempotencia

| Código | Qué investigar |
|---|---|
| 400 | Parámetros, entrada o concurrencia |
| 401 | Credenciales |
| 403 | Saldo insuficiente |
| 404 | ID, modelo o acceso de la cuenta |
| 422 | Validación del cuerpo |
| 423 | Modelo bloqueado temporalmente |
| 500 | Error de servicio: recuperar con espera |
| 503 | Modelo deshabilitado o no listo |

**Las generaciones no admiten clave de idempotencia.** Un POST no se repite automáticamente tras un timeout ambiguo: se marca como "resultado desconocido" y se reconcilia antes de volver a gastar. Registrar también `X-Correlation-ID`. Los GET de estado sí se pueden reintentar con espera exponencial.

## 4. Coste y retención

- Reembolso de reservas en `failed`, `nsfw` y cancelaciones válidas. Un vídeo feo terminado correctamente no se reembolsa.
- **Los resultados se guardan al menos 7 días:** hay que copiarlos a almacenamiento propio. El saldo caduca al año.
- Catálogo público (19/09/2026): Seedance 2.5 desde 0,144 USD/s (normal 0,2057, −30 %) y Kling 3.0 desde 0,042 USD/s (normal 0,084, −50 %), **sin indicar resolución ni modo**. No son comparables con los créditos medidos del plan.

## 5. La laguna de Seedance 2.5 en REST

Comprobado el 19/09/2026: la ficha REST pública de Seedance 2.5 solo documenta **texto a vídeo** y solo **480p y 720p**. Society necesita justo lo contrario: animar keyframes aprobados, con referencias de imagen y a 1080p (multitoma `omni_reference`). **Mientras la API no publique un modo con imagen o referencias a 1080p, no sustituye a fal para los planos complejos.** Hay que revalidarlo en el catálogo con una clave de desarrollo antes de elegir proveedor (decisión pendiente n.º 2 del README del TFG).

## 6. Arquitectura propuesta

Cadena de producción (informe 05): brief → backend de Society (autorización y presupuesto) → cola de producción → **adaptador de proveedor** (Higgsfield API/MCP o fal) → almacenamiento propio + control de calidad → **worker de montaje con Remotion** (sustituye a After Effects desde el 17/09/2026) → aprobación → publicación → métricas.

- **Estados propios separados de los del proveedor:** "generación terminada" no es "pieza aprobada" ni "publicada". Estados de negocio: pendiente de revisión, rechazada por fidelidad, aprobada, archivada.
- **Dos puertas humanas por pieza:** G1 antes de animar (keyframes) y G2 antes de publicar. Coinciden con las puertas A y B de `directoria`.
- **Registro de capacidades como modelo de datos:** cada capacidad (modelo + modo + resolución) con su fecha de verificación y su caducidad; los cambios en vuelo no afectan a los trabajos ya enviados.
- **Degradación explícita:** si falla una capacidad, se baja de nivel **avisando** (p. ej. de vídeo a imagen fija), nunca en silencio.
- **Cola por proveedor y cupos por restaurante:** una campaña grande no bloquea al resto.
- **Linaje del activo:** original, derivados, MIME, tamaño, hash, titularidad, restaurante y función. El objeto propio se relaciona con los IDs o URLs del proveedor sin confundirse con ellos.

## 7. Límite de este TFG

El TFG se desarrolla al 100 % por Víctor: la IA acompaña, investiga y valida, pero **no escribe el código de la aplicación**. Esta skill documenta contratos y criterios; el adaptador REST lo implementa Víctor (clientes oficiales en Python y TypeScript, `@higgsfield/client`).
