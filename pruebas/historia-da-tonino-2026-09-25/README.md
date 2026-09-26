# Historia Da Tonino: «06 · Y la historia.» (25/09/2026)

**Entregable:** paso 06 del caso Da Tonino en `promo/` (`promo/src/scenes/Caso.tsx`, componente `Historia`), entre el carrusel (05) y el resultado. Completa el trío reel + post + historia que promete `copy.ts` ("Posts, historias y reels hechos a partir de tu local real").

## Estrategia

Dos carteles a toda pantalla, problema → solución, en el mismo lenguaje que las referencias de `society-identidad-editorial/` (titular enorme + una palabra en cursiva, foto real grande, bocadillo `@society`, una sola pegatina mostaza):

1. **Problema** (fondo papel): «UN REEL *no basta*.» + foto real de la sala (`real-sala.jpg`, sin tocar).
2. **Solución** (fondo cobalto): «Y LA *historia*.» + foto de la pizza prosciutto e rúcula, con luz de estudio + pegatina «Más mesas».

Corte seco entre las dos (sin fundido), como pide la firma de rodaje real para el montaje.

## Por qué se generó una imagen

La foto real de la pizza (`produccion/da-tonino/reel-v4/referencias/pizza.jpg`) es un plano de móvil con luz de ambiente, no encaja con el estilo "estudio de fotografía" (R-LUZ-01) ya validado en el carrusel. Se pidió a Higgsfield que **relumbrara la misma pizza real** (mismo plato, misma masa, sin ingredientes inventados) en ese estilo, no que inventara un plato nuevo.

- **Ancla:** `produccion/da-tonino/reel-v4/referencias/pizza.jpg` (real, subida como `image_references`).
- **Modelo pedido:** `nano_banana_pro` · **servido:** `nano_banana_2` (job `5895c71f-…`), 4:5, 2K.
- **Resultado:** [`../../promo/public/caso/gen-07-historia-estudio.jpg`](../../promo/public/caso/gen-07-historia-estudio.jpg).
- **Recorte a transparente:** se pidió `remove_background` sobre ese resultado (job `b514dc79-…`) para poder cruzar el titular como en las referencias, pero la cola no terminó en la sesión (se quedó en `queued` varios minutos). Se entrega con la foto en tarjeta (`PhotoCard`, variante oscura) en vez de recorte flotante; pendiente reintentar cuando la cola de background removal responda.

## Coste (medido)

| Paso | Créditos |
|---|---|
| `nano_banana_pro` → servido `nano_banana_2`, 4:5, 2K | 2 |
| `remove_background` (encolado, sin confirmar coste real) | ~1 |
| **Total** | **~3** (saldo 46,57 → 43,57) |

## Pendiente

1. **Recorte flotante de la pizza:** reintentar `remove_background` sobre el job `5895c71f-…` (o volver a generar) cuando la cola de Higgsfield no esté bloqueada, y sustituir el `PhotoCard` por un `Cutout` cruzando el titular, más fiel a las dos referencias de identidad editorial.
2. **Etiqueta de IA** al publicar cualquier pieza derivada de `gen-07-historia-estudio.jpg` (art. 50 del Reglamento de IA; "AI info" de Meta) — es una relumbrado generado, no una foto sin tocar.
3. Confirmar con Da Tonino que el reencuadre de la sala (`real-sala.jpg`, sin generar) sigue representando el local tal cual es hoy.
