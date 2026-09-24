# Prueba A/B: 720p + reescalado frente a 1080p nativo

Fecha: 2026-09-24. Estado: **medido, una sola escena**. Cuenta Higgsfield plan Plus.
Pregunta: ¿generar a 720p y reescalar a 1080p es una alternativa válida a generar a 1080p nativo?
Convención: **medido** = cargo, preflight o medición sobre el archivo; **observado** = visto en la imagen; **hipótesis** = pendiente.

## 1. Montaje de la prueba

- **Keyframe:** la mesa cenital de Torre de Vega (`hf_20260909_182346_7e4628e4…png`, 2752×1536), recortada a 9:16 centrada en la cazuela de gambas al ajillo (864×1536). Sin outpaint, para no inventar mesa. `media_id` `6392ebe4-2184-42ad-a7c2-904e24888e97`.
- **Plano** (skills `director` y `directoria`): cenital, aceite borboteando desde el fotograma 1 y vapor real; una mano de mujer entra con pan, lo moja y lo levanta. Slider motorizado que desciende un 8 % a velocidad constante. Bloques PRESERVE TEXTURE, PRESERVE EXPOSURE AND COLOUR (con asignación positiva del color), SHARPNESS y velocidad real, sin subtítulos ni música.
- **Mismo prompt, mismo keyframe, mismos parámetros:** Seedance 2.5 `omni_reference`, 6 s, 9:16, `generate_audio:false`. Solo cambia la resolución.
- **Preset:** saltó la trampa "IN THE DARK" y se reenvió con `declined_preset_id`, como indica la skill.

| Versión | Trabajo | Coste real |
|---|---|---|
| 720p nativo | `3a044024-d95c-47f9-a2b8-e37b45fcce97` | 42 cr |
| + ByteDance `aigc` 1080p (herramienta `upscale_video`) | `a1f61ceb-5300-4c66-b47c-449a73ee83fd` | 0,12 cr |
| + ByteDance **pro** `aigc` 1080p (`generate_video`, modelo `bytedance_video_upscale`) | `1f0f8ad9-1ee4-4fe6-971d-e02e33cee36f` | 1,21 cr (preflight: 1) |
| + Topaz 1080p 9:16 | `758e7871-6ab1-4742-b03d-77e8f5eebde3` | 5 cr |
| 1080p nativo (control) | `83dfa696-1e02-4858-8c03-0dc37277f77f` | 72 cr |

Total gastado: 120,33 cr (saldo 463,11 → ~342,78).

## 2. Resultados medidos

Script: [`ab.py`](ab.py). Métricas: [`metricas.json`](metricas.json). Todas las métricas se calculan en 1080×1920; el 720p se escala con Lanczos.

| Versión | cr totales | Detalle fino en gambas (varianza de bordes) | % del keyframe | Estabilidad temporal (ratio; menos = más estable) | Códec | 1.er fotograma ≈ keyframe |
|---|---|---|---|---|---|---|
| Keyframe (referencia) | — | 2.479 | 100 % | — | — | — |
| 720p nativo / Lanczos | 42 | 445 | 18 % | 0,658 | H.264 | Sí (r = 0,84) |
| 720p + ByteDance `aigc` | 42,12 | 1.303 | 53 % | 0,772 (+17 %) | H.264 | Sí |
| **720p + ByteDance pro** | **43,21** | **1.752** | **71 %** | 0,770 (+17 %); en el mantel, 0,841 (= base) | **H.264** | Sí |
| 720p + Topaz | 47 | 929 | 37 % | 0,659 (= base) | **HEVC** | Sí |
| 1080p nativo | 72 | 758 | 31 % | 0,601 | **HEVC** | **No (r = 0,31)** |

**Color del mantel** (rojo/azul, luminancia mediana): keyframe 1,042 / 233. Todas las versiones quedan entre 1,02 y 1,06 y entre 222 y 235 durante los 6 s. **Sin calentamiento ni oscurecimiento**, frente a la deriva del nigiri (1,39 → 1,57 y 105 → 63).

**Bandas:** ninguna. `cropdetect` devuelve `1072:1920` en todas las versiones de 1080, pero es un falso positivo: redondea a múltiplos de 16. Las columnas del borde tienen la misma luminancia que el original.

## 3. Lectura visual (observado)

Imágenes: [`comparativa-gambas.jpg`](comparativa-gambas.jpg) (columnas: 720p Lanczos · ByteDance `aigc` · ByteDance pro · Topaz · 1080p nativo; filas: t = 0,1 s y t = 3 s), [`servilleta-vs-keyframe.jpg`](servilleta-vs-keyframe.jpg) y [`fotogramas-consecutivos-plato.jpg`](fotogramas-consecutivos-plato.jpg).

- **El 1080p nativo de Seedance 2.5 se ve más blando que el 720p reescalado con ByteDance:** aceite empastado y gambas menos definidas. Solo aporta un 16 % más de alta frecuencia que el 720p. El "1080p" de este modelo no rinde el detalle que su resolución promete.
- **ByteDance reconstruye texturas que el 720p había perdido** (la trama de la servilleta, el perejil, el pimentón), cerca del keyframe pero con la dirección algo exagerada (sobreenfoque). No se aprecia hervido en fotogramas consecutivos; el +17 % de inestabilidad es leve.
- **Topaz** es estable y fiel, pero recupera poco, cuesta 40 veces más que ByteDance `aigc` y entrega HEVC.
- **Contenido:** la tirada de 1080p tuvo una mano más natural y un mojado de pan más creíble. La tirada de 720p movió el pan de forma algo errática entre los segundos 3 y 4. Es **variación de tirada**, no efecto de la resolución.

## 4. Conclusión

**Para este tipo de plano (cenital, comida y mano), 720p + ByteDance pro es una solución mejor que el 1080p nativo:** un 40 % más barato (43,21 frente a 72 cr), más nítido (71 % frente al 31 % del detalle del keyframe) y en H.264. ByteDance `aigc` estándar (0,12 cr) es casi igual de bueno por coste. Topaz no compensa.

**Límites de la conclusión:**

1. **Una sola escena y una sola tirada por brazo.** Hay que repetirlo en al menos 3 escenas (carne cortada, sala, bebida) antes de convertirlo en regla (umbral de madurez: 5 comparables).
2. **Nitidez no es fidelidad.** La varianza de bordes premia el sobreenfoque. Falta la **prueba a ciegas en móvil** (¿una persona distingue el 1080p nativo del 720p + ByteDance pro?).
3. **Regla del cliente:** Torre de Vega exige 1080p nativo "no por ahorro". Con este dato, el reescalado no es solo más barato, **se ve mejor**; pero cambiar la regla es **decisión del cliente**.
4. **El color estable** es una señal a favor de los bloques PRESERVE y de la asignación positiva, pero no hay brazo de control sin la cláusula: sigue pendiente el A/B propio.

## 5. Hallazgos operativos nuevos

- **ByteDance pro se puede elegir** con `generate_video`, `model:"bytedance_video_upscale"`, `model_version:"pro"`, rol `video_references`; admite preflight (1 cr en 6 s; cargo real 1,21).
- **Seedance 2.5 `omni_reference` no fija el primer fotograma:** el servidor pasa `start_image` como `reference_images`. En la tirada de 1080p el plano se reencuadró (r = 0,31 con el keyframe). Para aterrizar exacto habría que probar `end_image` o el patrón "@Image 1 is the first frame" más estricto: **pendiente**.
- **Topaz y Seedance 1080p entregan HEVC:** hay que transcodificar a H.264 antes de Instagram. ByteDance entrega H.264.
- **`cropdetect` en 1080 de ancho:** usar tolerancia de 16 px o comprobar las columnas del borde.
