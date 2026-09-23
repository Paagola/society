<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Receta reproducible — reel de chuletón

Prueba local del 15/09/2026. El chuletón inventado fue una excepción autorizada por el usuario; no se generaliza a cartas o platos de otros negocios. Local, mesa y vajilla anclados a referencias reales. Sin guarnición.

## Brief de luz que conviene conservar

> Soft diffuse everyday restaurant daylight; gentle shadows; moderate neutral-warm colors; ordinary rendered fat rather than a lacquered surface. Preserve the real room and plate. No theatrical orange grade, commercial studio lighting or excessive sharpening.

Es una síntesis reutilizable, no el prompt literal completo enviado. Definir luz y textura de forma explícita funciona mejor como instrucción que pedir simplemente «menos calidad». El resultado sigue necesitando revisión.

## Descomposición de la acción de corte

| Fase de referencia | Acción pedida | Control físico |
|---|---|---|
| 0–1 s | Entrada de tenedor y cuchillo; sujeción del borde sin hueso | Manos y cubiertos completos; contacto antes de aplicar fuerza |
| 1–4 s | Dos movimientos cortos de sierra sobre una sola línea | Tenedor estabiliza; carne cede en el contacto; hoja no atraviesa plato o hueso |
| 4–5 s | Separación de la pieza y apertura hacia cámara | El interior solo aparece después del corte; no regenerar tejido |
| 5–6 s | Mantener el interior visible | Apoyo, geometría y exposición estables |

Son instrucciones temporales, no una medición de cada gesto del resultado. La toma aceptada separó y mostró la carne apoyada en el plato; no se debe describir como una pieza levantada si el vídeo no lo muestra.

Parámetros enviados: `seedance_2_5`, `mode: omni_reference`, `duration: 6`, `resolution: 1080p`, `aspect_ratio: 9:16`, `generate_audio: false`, una `start_image`. No se envió imagen final. La receta antigua de exigir dos fotogramas en toda cámara fija no describe esta ejecución y queda pendiente de conciliar con pruebas futuras; no inventar que se utilizó.

## Montaje nativo de After Effects

| Tramo final | Fuente y selección | Función |
|---|---|---|
| 0–1,4 s | Seedance, aproximadamente 4,6–6 s | Adelanto del interior; «¿ESTE PUNTO?» |
| 1,4–3,4 s | Parrilla real, aproximadamente 2–4 s | Cambio de punto de vista y contexto de brasa |
| 3,4–9 s | Seedance, aproximadamente 0,4–6 s | Corte completo y revelado final |

Locución Nadine desde 0 s, duración de archivo 7,9 s. Texto: «Por fuera, brasa. Por dentro… mira ese corte. Solo chuletón a la parrilla. ¿Lo pedirías así?».

La parrilla se reutiliza como ambiente atenuado; no hay audio nativo de Seedance ni un sonido de cuchillo sincronizado. Valores aplicados como ajustes de capa, no mediciones LUFS: voz −1 dB, ambiente alrededor de −25 dB, brasa visible alrededor de −20 dB, con fundidos. No se realizó una certificación de sonoridad para plataformas.

Subtítulos: Arial Bold, 54 px, blanco con contorno oscuro 2,5 px; centrados en x=540, línea base y=1510 del lienzo 1080 × 1920. El máximo utilizado es cinco palabras; «Solo chuletón a la parrilla» tiene 28 caracteres con punto. Esta receta nativa utiliza cinco capas de subtítulos; no es el preset visual del burner de Higgsfield.

| Texto | Inicio | Fin de voz del grupo | Salida visual |
|---|---:|---:|---:|
| Por fuera, brasa. | 0,14 | 1,80 | 1,90 |
| Por dentro… | 2,16 | 2,68 | 2,78 |
| mira ese corte. | 3,38 | 4,60 | 4,70 |
| Solo chuletón a la parrilla. | 4,84 | 6,42 | 6,52 |
| ¿Lo pedirías así? | 6,70 | 7,70 | 7,80 |

Estos tiempos pertenecen exclusivamente al archivo de Nadine registrado abajo. No reutilizarlos para otra voz o nueva generación del mismo guion.

## Evidencia trazable

| Activo | Identificador de generación | Estado en la edición |
|---|---|---|
| Imagen natural | a085562d-1d4b-455d-be31-072e7c0cd5e7 | Base del corte |
| Primer corte natural Kling | acb23383-c148-41ea-a6e5-111bc53aa640 | Sustituido por la preferencia de modelo |
| Corte Seedance | 9eb577f0-0d83-48fc-b23e-2f0c02939628 | Utilizado; usuario valoró el vídeo positivamente |
| Voz Cillian | 4a8c409a-f1c6-480f-9b9e-d5f2b4ca7676 | Rechazada por acento |
| Voz Nadine | 9d0a1eb1-271c-416c-8a85-976972fe6a47 | Utilizada |

Material real: `C:\Users\victo\Documents\torre_de_vega\imagenes\parrilla\clips\parrilla_volteo_master_4k60.mp4`. Referencias principales: `local\mesa-chimenea.jpg` y `local\plato-marron.jpg` dentro de la misma carpeta de imágenes.

Validaciones realizadas: revisión de fotogramas del corte, lectura de subtítulos al inicio/medio/final, presencia del audio, lectura completa del MP4 final hasta 270 fotogramas, 9 segundos, 1080 × 1920, 30 fps. Fuente Seedance: HEVC Main10, 1080 × 1920, 24 fps y unos 6,04 segundos. Salida: H.264, audio AAC. Exportar a 30 fps no crea por sí mismo movimiento adicional real entre fotogramas de una fuente de 24 fps.

Límites: no se midió rendimiento en Instagram, no hay evaluación ciega de modelos ni de voces, y la revisión visual no garantiza física perfecta en todos los fotogramas. El acento regional no se verificó independientemente. La aprobación final es del conjunto de la edición.
