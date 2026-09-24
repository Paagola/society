# 03 · Precios, economía y presupuesto

Todos los precios son **créditos del plan (MCP/web)**, salvo que se diga otra cosa. Los créditos del plan y los de la API REST son monederos distintos: **no se convierten ni se promedian** (→ [`07-api-rest-y-arquitectura.md`](07-api-rest-y-arquitectura.md)).

## Índice

1. Precios medidos de generación
2. Precios medidos de reescalado y utilidades
3. Coste por reel y estrategia de resolución
4. Coste por formato y cliente tipo
5. Tasa de aceptación e iteración
6. Plan, recargas y conversión a euros
7. Reglas de gasto

---

## 1. Precios medidos de generación

**Seedance 2.5, `omni_reference`, sin audio, 9:16** (preflights exactos y cargos del 24/09/2026) [MEDIDO]:

| Resolución | cr/s | Ejemplos |
|---|---|---|
| 480p | 3 | 10 s = 30 · 5 s = 15 (cargo real, clip del chuletón) |
| 720p | 7 | 5 s = 35 · 6 s = 42 (cargo) · 10 s = 70 · 12 s = 84 (cargo) |
| 1080p | 12 | 5 s = 60 · 10 s = 120 |

⚠️ Con `generate_audio:true` (valor por defecto) el precio cambia: **medir con `get_cost`**. Una cotización del 22/09 sin medios dio 120 cr por 10 s (12 cr/s), coherente con 1080p.

**Otros modelos** [MEDIDO, fechas indicadas]:

| Modelo y configuración | Coste | Fecha |
|---|---|---|
| `nano_banana_pro` 2K 9:16 | 2 cr por imagen | 22/09 y 24/09 |
| `kling3_0` pro | 5,25 cr por 3 s (1,75 cr/s) | 22/09 |
| `kling3_0` pro, 1076×1924 | 8,75 cr por 5 s | 09/09 |
| `kling2_6` | 5,00 cr por 5 s | 09/09 |
| `seedance_2_0` std 1080p | 45 cr por 5 s · 36 cr por 4 s con fotogramas inicial y final | 09/09 |
| `seedance1_5` 1080p | 12 cr por 4 s | 09/09 |
| `cinematic_studio_video_v2` | 7,50 cr por 5 s (std = pro) | 09/09 |
| `cinematic_studio_3_0` 1080p | 50 cr por 5 s | 09/09 |
| `minimax_h3` 2K | 10 cr por 5 s | 09/09 |
| `veo3_1` preview high | 29 cr por 4 s | 09/09 |
| `veo3` preview | 58 cr | 09/09 |
| `flux_3_video_edit` | 1 cr por segundo procesado | catálogo 24/09 [OFICIAL] |
| `video_analysis_*`, `virality_predictor` | 0 cr | 09/09 |

Kling 3.0: `sound:"off"` reduce créditos [OFICIAL, catálogo]; el ahorro exacto no está medido.

## 2. Precios medidos de reescalado y utilidades

| Operación | Coste | Nota |
|---|---|---|
| Topaz, 5 s → 1080p | 3 y 9 cr | Dos cargos distintos por el mismo clip; el de 9 cr (07:10) puede venir de una llamada que devolvió "no aprobada" |
| Topaz, 10 s 480p → 1080p | 8 cr | |
| Topaz, 12 s 720p → 1080p | 6 cr | |
| Topaz, 6 s 720p → 1080p 9:16 | 5 cr | A/B del 24/09: 37 % del detalle, HEVC |
| ByteDance `aigc` standard, 6 s 720p → 1080p | **0,12 cr** | Medido dos veces (dron y A/B del 24/09): 53 % del detalle |
| **ByteDance `aigc` pro**, 6 s 720p → 1080p | **1,21 cr** (preflight: 1) | Vía `generate_video` + `bytedance_video_upscale`; **71 % del detalle, el mejor medido** |
| ByteDance a más de 30 fps | ×2 | [OFICIAL, esquema de `upscale_video`] |
| FLUX Video Upscale | 17,65 cr | Lanzado desde la web; no disponible por MCP |

**La herramienta `upscale_video` (Topaz y ByteDance) no admite preflight**: el precio se conoce tras el cargo. ByteDance lanzado como modelo con `generate_video` **sí** lo admite. `upscale_image`, `outpaint_image` y `reframe` también admiten `get_cost`.

**Seedance 2.5, 6 s sin audio [MEDIDO, 24/09]:** 42 cr a 720p y 72 cr a 1080p. **720p + ByteDance pro = 43,21 cr, un 40 % menos que el 1080p nativo, y en la A/B se vio más nítido** (71 % frente al 31 % del detalle del keyframe; una sola escena).

## 3. Coste por reel y estrategia de resolución

Reel tipo (informe 05 de automatización): 7 imágenes, 4 clips de Kling de 3 s y una multitoma de Seedance de 10 s. Solo cambia la multitoma. Coste esperado con reintentos (×1,25 en imágenes, ×1,5 en vídeo):

| Método | cr/reel | Ahorro al mes (4 reels) | Margen extra por restaurante y mes | Bajada posible del precio mínimo |
|---|---|---|---|---|
| Actual, 1080p nativo | 229 | — | — | — |
| Borrador a 480p + final a 1080p | 199 | 120 cr | 5,70–7,14 € | 10–12 € |
| 720p + Topaz | unos 162 | 268 cr | 12,73–15,95 € | 22–28 € |
| **720p + ByteDance pro (estándar R-RES-01 desde el 24/09)** | **156** | 292 cr | 13,87–17,37 € | 24–30 € |
| 480p + Topaz (descartado por calidad) | 102 | 508 cr | 24,13–30,24 € | 42–53 € |

Cálculo de la fila estándar: 7 imágenes (17,5) + 4 clips de Kling (31,5) + Seedance 10 s a 720p con reintentos (70 × 1,5 = 105) + ByteDance pro **solo sobre la toma aprobada** (≈ 2). Regla práctica: **cada segundo de Seedance del reel final ahorra unos 7,3 cr** frente al 1080p nativo.

Los euros son **hipótesis**: 0,050–0,063 USD por crédito y 0,95 €/USD, a falta de factura. **Calidad:** 720p + ByteDance pro superó en detalle al 1080p nativo en la A/B del 24/09 (una escena; falta la prueba a ciegas en móvil). Es el estándar de Society (regla R-RES-01, skill `directoria`, `hosteleria/03` §3.1), salvo para los clientes que exijan 1080p nativo por escrito (Torre de Vega, de momento). "480p + Topaz" pierde dos tercios del detalle en primer plano (skill `directoria`).

**Fórmula del precio mínimo** (margen del 40 %): `(coste + 0,25) / 0,57338`.

**Modelo de coste de una pieza aprobada** (informe 02 del TFG): `generaciones aceptadas + intentos técnicamente correctos pero descartados + montaje y render + voz + almacenamiento + trabajo humano`. Un vídeo feo que terminó correctamente no es un fallo reembolsable.

## 4. Coste por formato y cliente tipo

| Formato | cr aprox. | Coste aprox. |
|---|---|---|
| Historia con imagen | 2,5 | 0,15–0,30 € |
| Historia con clip Kling de 5 s | 13 | 0,70–0,90 € |
| Carrusel de 6 imágenes | 15 | 0,85–1,10 € |
| Reel (estándar R-RES-01) | 156 | 7,40–9,30 € |
| Reel a 1080p nativo | 229 | 10,90–13,60 € |

**Cliente con 3 reels por semana (unos 13 al mes), sin revisión humana**, recalculado el 24/09 con la regla R-RES-01:

| | 1080p nativo | **720p + ByteDance pro** | Diferencia |
|---|---|---|---|
| Créditos al mes | 2.977 | **2.028** | −949 (−32 %) |
| Generación | 141–177 € | **96–121 €** | **−45 a −56 €/mes** |
| Coste total (+21 € de guion, voz, render e infraestructura) | 162–198 € | **117–142 €** | |
| Precio mínimo (margen del 40 %) | 284–346 € | **205–248 €** | −79 a −98 € |

⚠️ **El precio de lista propuesto de ~199 €/mes queda por debajo del mínimo.** Salía de un reel de ~100 cr con "480p + Topaz", una estrategia que pierde dos tercios del detalle. Con la calidad que exige Society, 3 reels por semana cuestan al menos ~205–248 €/mes. Opciones: subir el precio, bajar a 2 reels por semana con la mezcla de formatos, o esperar a una tasa crédito → euro con factura, que puede mover el rango. Con revisión humana, cada hora por reel suma unos 390 €/mes (13 h a 30 €/h): el tiempo pesa más que los créditos. El plan Plus tenía 605 cr disponibles el 24/09, insuficiente para un solo cliente así.

**Mezcla de formatos:** en automatización sin revisión, vender una mezcla semanal (p. ej. 2 reels, 2 carruseles y 5 historias) cuesta menos (unos 1.650 cr/mes con R-RES-01, frente a 2.028 de solo reels), da casi el triple de días publicados y reduce el riesgo por pieza fallida. La razón de negocio (publicar es la palanca más fiable) está en la skill `marketing-hosteleria`.

## 5. Tasa de aceptación e iteración

- **Hell Grind** (película de 90 min del equipo de Higgsfield, mayo de 2026, divulgada en la serie "Road to Cannes", recogida por OSideMedia) [COMUNIDAD, una sola fuente]: 108.859 generaciones, 9.540.047 créditos, alrededor del **1 % de imágenes y el 1,5 % de vídeos aceptados**, unas 800 iteraciones para fijar al protagonista y 72 generaciones para un plano de establecimiento de 10 s. Es un listón de cine, no de reel.
- **Proyectos de la comunidad** (13 proyectos, 9 creadores): entre 65 y 100 generaciones por plano conservado. La carpeta `TESTS` fue el 61 % del proyecto: las pruebas **son** el trabajo.
- **Para Society:** los factores de reintento (×1,25 en imagen, ×1,5 en vídeo) salen de la experiencia de Torre de Vega y son mucho más optimistas que el cine. Se revisan con el registro de generaciones (→ [`05-protocolo-y-trazabilidad.md`](05-protocolo-y-trazabilidad.md) §6) en cuanto haya muestra.

## 6. Plan, recargas y conversión a euros

| Dato | Valor | Estado |
|---|---|---|
| Plan de la cuenta de Society | Plus | [MEDIDO] |
| Saldo del plan Plus | 739,28 cr (09/09) · 605 cr disponibles (24/09) | [MEDIDO] |
| Precio del plan Plus | 39 USD/mes por 1.000 cr | [COMUNIDAD, robonuggets, sin verificar] |
| Recargas | 5 USD por 100 cr, **caducan a los 90 días** | [COMUNIDAD, sin verificar] |
| Packs de recarga en el widget oficial | 500 / 1.000 / 2.000 / 4.000 cr | [OFICIAL, descripción de `show_plans_and_credits`] |
| Crédito de la API REST | ejemplo oficial: 1,5 cr = 0,094 USD (≈0,063 USD/cr) | [OFICIAL, monedero distinto] |
| Hell Grind, tasa implícita | 0,060 USD/cr a mitad de producción y 0,042 al cierre | [COMUNIDAD]: diverge un 30 % dentro del mismo proyecto |

**Conclusión:** no existe todavía una tasa crédito → euro verificada para Society. Mientras no haya factura, los euros se dan como rango y etiquetados como hipótesis. El precio actual de los planes se consulta con `show_plans_and_credits` (abre el widget oficial).

**Bloqueo de modelos por plan** [COMUNIDAD, robonuggets]: modelos de gama alta pueden estar bloqueados en planes inferiores y devolver un "Something went wrong" genérico. Si un modelo falla sin explicación, sospechar primero del plan.

## 7. Reglas de gasto

1. **Preflight siempre que exista:** `get_cost:true` en `generate_image`, `generate_video`, `reframe`, `outpaint_image` y `upscale_image`. Presets, `upscale_video` y Genjutsu sin vídeo subido no admiten preflight: se presupuestan con margen.
2. **Antes de gastar, se dice:** modelo, parámetros, coste estimado, saldo y saldo resultante. En producción manual se espera la aprobación explícita.
3. **Keyframes antes que vídeo:** ningún vídeo sale de un keyframe no aprobado.
4. **Máximo 2 vídeos por tanda** en producción manual, salvo que se autorice más.
5. **Borrador barato → final caro, con el mismo prompt.**
6. **Registrar lo servido, no lo pedido:** modelo devuelto, parámetros efectivos (el servidor puede ajustarlos) y cargo real.
7. **Saldo bajo (<200 cr):** avisar antes de cualquier vídeo.
