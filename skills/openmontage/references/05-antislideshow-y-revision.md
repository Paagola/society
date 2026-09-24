# 05 · Antislideshow y revisión del montaje

Cómo detectar que un montaje "se siente como diapositivas" y qué revisar antes de darlo por bueno. Resume el enforcement automático de OpenMontage (`lib/slideshow_risk.py`, `lib/variation_checker.py`, `skills/meta/reviewer.md`), la auditoría de monotonía de OSideMedia y la revisión técnica de Society.

## Índice

1. El enemigo es el slideshow
2. Riesgo de slideshow: 6 dimensiones
3. Variación estructural: 8 comprobaciones
4. Auditoría de monotonía por columnas
5. Revisión técnica automática
6. Revisión editorial y de marca
7. Virality Predictor como puerta auxiliar

---

## 1. El enemigo es el slideshow

Un slideshow es una secuencia de clips con **la misma duración de plano**, sin variedad de encuadre ni diseño de sonido, aunque cada clip por separado sea bonito. Es el fallo más típico del vídeo generado: cada plano es fotorrealista y la pieza aburre.

## 2. Riesgo de slideshow: 6 dimensiones

`score_slideshow_risk()` puntúa de 0 a 5 cada dimensión (menos es mejor) y hace la media:

1. **Repetición:** el tipo de escena dominante pasa del 70 %, las descripciones únicas bajan del 60 %, o el mismo tamaño de plano supera el 60 %.
2. **Visuales decorativos:** escenas sin papel informativo ni narrativo ni intención de plano.
3. **Movimiento débil:** movimiento de cámara sin una intención de plano que lo justifique.
4. **Intención débil:** porcentaje de escenas sin `shot_intent`.
5. **Dependencia tipográfica:** más del 60 % de tarjetas de texto, cifras o KPI ("se siente como diapositivas animadas").
6. **Pretensiones cinematográficas sin respaldo:** si la pieza se anuncia como cinematográfica y no tiene momento héroe, o menos del 30 % de escenas con movimiento, o menos del 30 % con iluminación de carácter.

| Media | Veredicto |
|---|---|
| < 2,0 | Fuerte |
| < 3,0 | Aceptable |
| < 4,0 | Revisar |
| ≥ 4,0 | **Fallo: bloquea el paso a composición** |

## 3. Variación estructural: 8 comprobaciones

`check_scene_variation()` suma las infracciones × 0,6, con los mismos umbrales:

1. Más del 50 % de los planos con el mismo tamaño.
2. Tres o más planos seguidos con el mismo tamaño.
3. Más del 60 % de planos estáticos o sin especificar.
4. Un único `lighting_key` en toda la pieza.
5. El momento héroe comparte tamaño de plano con su vecino.
6. Frases genéricas prohibidas en las descripciones: *"a beautiful"*, *"cutting-edge"*, *"stunning"*, *"seamless"* y otras (20 en total).
7. Ausencia de palabras de textura concretas.
8. Poca cobertura de `shot_intent`.

**Regla manual derivada** (`documentary-montage/edit-director`): se recorre la línea de tiempo por pares. Si dos cortes seguidos comparten sujeto y escala, o paleta, o dirección de movimiento, se intercambian. **Romper el patrón al menos cada 4 cortes.**

## 4. Auditoría de monotonía por columnas

[COMUNIDAD, OSideMedia, `higgsfield-shotlist-director`] Después de escribir la lista de planos, se lee **solo la columna de encuadre + movimiento de cámara**, de arriba abajo, como una secuencia. **Ninguna racha de tres cortes seguidos puede compartir tamaño de plano y movimiento.** Si todo dice "medium, slow push-in", se varía la función y la escala del plano, no solo su duración. Este fallo no se ve revisando prompt a prompt: solo aparece al leer la columna. Es la señal más común de una lista de planos generada.

La misma revisión se hace **dos veces**: en el guion de cámara (skill `director`) y en el montaje final (esta skill).

## 5. Revisión técnica automática

Antes de entregar el render (puerta E de Society):

```bash
# Formato, duración y cadencia reales
ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate,bit_rate -show_entries format=duration -of default=nw=1 final.mp4

# Bandas negras (Instagram penaliza los bordes)
ffmpeg -i final.mp4 -vf cropdetect=24:16:0 -f null - 2>&1 | grep -o 'crop=[0-9:]*' | sort | uniq -c | sort -rn | head -3

# Loudness integrado y true peak (objetivo: -14 LUFS, -1 dBTP)
ffmpeg -i final.mp4 -af loudnorm=print_format=summary -f null - 2>&1 | grep -E 'Input Integrated|Input True Peak'

# Fotogramas de muestra: inicio, gancho, mitad y cierre
ffmpeg -ss 0 -i final.mp4 -frames:v 1 f0.png; ffmpeg -ss 1 -i final.mp4 -frames:v 1 f1.png
```

**Especificaciones de subida** (OpenMontage `short-form.md`): H.264 High Profile, 8–15 Mbps VBR (por debajo de 5 Mbps la plataforma rebaja la calidad), `.mp4`, 1080×1920. Encode final con CRF 18–20 (23 solo en trabajo intermedio).

**Comprobaciones:** 1080×1920 sin bandas; duración real igual a la del guion; subtítulos presentes, sincronizados y dentro de la zona segura; audio sin clics en los cortes; ningún texto sobre la franja muerta de abajo; sin marcas de agua de herramientas.

## 6. Revisión editorial y de marca

- **Fotogramas de revisión:** apertura, revelación y cierre (`cinematic/compose-director`).
- **Grade por escena, no global:** se renderiza un fotograma de cada plano, se mira y se corrige. Rangos medidos en interiores de hostelería (AE): plano cálido ya bien expuesto → *exposure* 0,10–0,14, *gamma* 1,06, *vibrance* 30–36; fondo oscuro con sujeto claro → 0,18–0,22; luz plana → 0,26–0,30 con *vibrance* 42–55. En la ráfaga del gancho, el grade sube un escalón.
- ⚠️ **Choque con la regla de luz neutra:** los perfiles de grade de OpenMontage (`cinematic_warm` 0,85, etc.) no se aplican encima de comida sin comprobar que el mantel sigue blanco roto (skill `directoria`, `hosteleria/02`).
- **Marca:** se cumplen las reglas vigentes del cliente. El estilo aprobado para otro cliente no se hereda.
- **Filtro Society:** ¿notaría un cliente que entra en el local alguna diferencia con lo que vio en el reel?
- **Texto del cliente:** el copy es suyo. Se propone marcado como propuesta y no se inventan afirmaciones (premios, antigüedad, "el mejor de…").

## 7. Virality Predictor como puerta auxiliar

- Se pasa sobre el **render montado** (máximo unos 16 s; si es más largo, una versión corta representativa). 0 créditos (skill `higgsfield`, `06` §1).
- **Se ignora el titular y se lee `values_by_frame`**: la activación por segundo y por red dice qué plano funciona y dónde está el bache. `peak_second` tardío = gancho débil. `default_mode` alto en t=0 = el arranque no engancha.
- **Como mucho 2 iteraciones de montaje** por reel de comida (techo medido → [`03-ritmo-y-gancho.md`](03-ritmo-y-gancho.md) §5).
- La métrica que manda después es el rendimiento real en Instagram (retención a 3 s, reenvíos). Se mide a las 6 h y a las 48–72 h.
