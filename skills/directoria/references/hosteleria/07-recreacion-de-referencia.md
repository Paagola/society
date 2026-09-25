# 07 · Recrear un reel de referencia

Cómo analizar un reel de referencia (Pinterest, Instagram, TikTok) y convertirlo en prompts propios sin copiar lo que no se debe. Casos medidos del 24/09/2026. Complementa el flujo Pinterest → decodificar → generar de [`../knowledge/12-flujo-practico-pinterest-a-video.md`](../knowledge/12-flujo-practico-pinterest-a-video.md).

## Índice

1. Protocolo de análisis (automatizable)
2. Qué se copia y qué no
3. Caso MURO
4. Velocidad escrita en el prompt
5. Multitoma con cortes escondidos
6. Estilo dron: el clip del nigiri
7. Igualar la energía de la referencia (R-VEL-01)

---

## 1. Protocolo de análisis (automatizable)

1. **`ffprobe`:** resolución, fps y duración.
2. **Cortes:** `select='gt(scene,0.25)'`, y para los cortes suaves, un umbral de 0,1.
3. **Movimiento (obligatorio, R-VEL-01):** diferencia media entre fotogramas consecutivos a 90×160 px en gris, quitando los cortes (diferencia > 40). Se anotan **mediana, p90 y % de fotogramas por encima de 6**: son la *energía objetivo* que el prompt y el montaje tienen que igualar (§7). Los picos son los gestos rápidos y su anchura da la duración.
4. **Tiras de fotogramas** a 5–10 fps alrededor de cada pico, para medir cuánto se desplaza cada objeto y en cuánto tiempo.
5. **Luz:** luminancia mediana, percentiles 5 y 95, relación rojo/azul y saturación, en 5 fotogramas.
6. **Cinco aspectos por plano** (taxonomía que usa OpenMontage en su analista de referencias): sujeto, movimiento del sujeto, escena, encuadre y cámara.
7. **Virality Predictor** de Higgsfield (0 créditos, unos 16 s como máximo) sobre la referencia, para tener una cifra con la que comparar la recreación.

```bash
# Cortes (umbral normal y suave)
ffmpeg -i ref.mp4 -vf "select='gt(scene,0.25)',showinfo" -f null - 2>&1 | grep -o 'pts_time:[0-9.]*'
ffmpeg -i ref.mp4 -vf "select='gt(scene,0.1)',showinfo" -f null - 2>&1 | grep -o 'pts_time:[0-9.]*'
```

## 2. Qué se copia y qué no

- **Se copia:** el ritmo, el gancho, la mecánica de cámara, la estructura de cortes y la duración de los gestos.
- **No se copia:** el local, el producto, la marca, las personas ni el look si choca con el cliente.
- **Filtro de contenido antes que de estilo:** si la referencia no es de comida, bebida o restaurante, solo se aprovecha su **mecanismo**.
- La persona de un vídeo de referencia nunca es la persona de la pieza. Una persona identificable necesita su propia imagen de referencia aprobada.
- El fotograma de la referencia puede usarse como imagen de encuadre, siempre con su rol limitado: *"use the template frame only for camera angle, framing and light direction; the real photos govern the room, the food and the tableware"*.

## 3. Caso MURO [MEDIDO]

Referencia de Pinterest: 720×1280, 25 fps, 14,3 s.

- **Estructura:** cámara fija a ras de barra. Cinco cócteles en el mismo posavasos, unos 2,8 s cada uno, con un toque final de guarnición.
- **Cambios de copa:** salida en 0,3–0,4 s con desenfoque de movimiento y entrada en 0,3–0,4 s frenando suavemente. Cambio completo en 0,8–1,2 s.
- **Toques finales:** bajada de unos 0,5 s y retirada de unos 0,4 s.
- **Un único corte** (5,92 s), escondido en un cambio de copa.
- **Logo** desde el segundo 12,9.
- **Luz:** mediana 86–131, p5 unos 19, p95 175–194, rojo/azul unos 1,4, saturación unos 0,33.

Recreación: keyframes aprobados, pero con luz demasiado cálida, y plástico en el nigiri tras Topaz. Multitoma de 12 s a 720p + Topaz: 98 créditos en total.

## 4. Velocidad escrita en el prompt

La velocidad se escribe con **distancia, tiempo y perfil**, nunca con adjetivos sueltos:

- *"30 cm in 0.35s with natural motion blur"*
- *"decelerating to a soft stop, no bounce"*
- *"constant speed until the end"*
- *"real-time, no slow motion, no speed ramp"*

Los gestos de precisión van más lentos (0,4–0,6 s) que las entradas y salidas (0,3–0,45 s). Los modelos tienden a la cámara lenta en acciones rápidas: si el plano debe ir a velocidad real, se dice (OSideMedia [COMUNIDAD]).

## 5. Multitoma con cortes escondidos

- Varias tomas en una generación: `Shot N is @imageN`, un keyframe por toma, y cortes secos **a mitad de un movimiento rápido** para que el desenfoque tape la costura.
- Cada toma conserva **un único beat principal** (`knowledge/06`): la multitoma es montaje dentro del clip, no más acción por toma.
- **Tiempo por toma:** tres tomas en 5 s (unos 1,7 s por toma) dejan muy poco margen para la continuidad. En el clip del chuletón: unas 7 lonchas en lugar de 5, el hueso cambió de orientación en la toma 3, el fondo pasó de claro a madera oscura y la toma 3 no subió a cenital [OBSERVADO]. Referencia: en Seedance 2.5, ventanas de **3 s o más** por evento [OFICIAL ByteDance].
- **Continuidad entre tomas:** el recuento de piezas, la orientación y el fondo se escriben como hechos compartidos en un bloque global que se repite (*"exactly five slices in every shot; bone pointing left in every shot; light wood background in every shot"*).
- **Corte en la acción entre clips distintos:** terminar un clip y empezar el siguiente con el **mismo gesto** a medio hacer, a la misma altura y con la misma luz.

## 6. Estilo dron: el clip del nigiri (gustó)

- Cenital con caída en picado y giro de 30° → pasada lateral rasante a 8 cm, 40 cm en 2 s, con paralaje → subida en arco que aterriza en el encuadre del keyframe.
- Cámara tipo gimbal, estabilizada y con velocidad constante.
- 6 s a 720p: 42 créditos; con reescalado ByteDance, 44,12 créditos en total.
- Keyframe hecho con las reglas nuevas (luz neutra, ficha de texturas): trabajo `ccb41958-16f7-4ba8-872c-fe0ffcd80f00`, aprobado.
- Para planos FPV/POV sin sujeto visible, añadir el bloque "THE CAMERA IS INVISIBLE" de [`../knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md`](../knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md) §4 (sin cuerpo de dron, sin sombra y sin reflejo de la cámara).

## 7. Igualar la energía de la referencia (R-VEL-01) [MEDIDO, 25/09/2026]

**Caso Da Tonino.** Referencia: anuncio de cocina *low-key* de 12,9 s, 14 cortes a 0,25 y 18 a 0,1 (~0,6 s por plano), masa lanzada al aire, queso que cae, carne que se voltea, llamaradas. Recreación: multitoma de Seedance 2.5 de 15 s en 5 tomas de 3 s, keyframes muy fieles y color estable. **Rechazada por lenta.**

| Métrica (90×160, sin cortes) | Referencia | Multitoma | Ratio |
|---|---|---|---|
| Movimiento mediano | 5,25 | 2,17 | 0,41 |
| p90 | 12,6 | 3,4 | 0,27 |
| % fotogramas > 6 | 40 % | 1 % | — |

**Causa: el prompt, no el modelo.** Pedía cámara *locked-off* con empuje de 3–5 cm, "hold", "tiny settle, no bounce", gestos de 1 s y "the pizza itself does not move". Seedance hizo exactamente eso. Se aplicó el restraint por defecto (`knowledge/06`) a una referencia que era energía pura.

**Reglas nuevas:**

1. **La energía de la referencia es un requisito del contrato de planos.** En la puerta B, cada plano lleva su energía objetivo (mediana y p90 de la referencia, §1.3). Sin referencia, manda el restraint de siempre.
2. **Vocabulario prohibido en el prompt cuando la referencia es rápida:** *locked-off, very slow, slow push-in, hold, settle, gently, barely, tiny, subtle*. Cada una de estas palabras frena el clip.
3. **Una acción rápida y repetible por toma, no un gesto seguido de un hold.** La ventana de 3 s por toma sigue vigente (§5); lo que cambia es el contenido: la acción se **repite** o **encadena** dentro de la ventana para que el montaje pueda sacar 2–3 cortes de 0,4–0,7 s. Ejemplos con números:
   - *"the dough is slapped onto the counter from 30 cm in 0.2s, flour explodes outward; then tossed 40 cm up, spinning, and caught in 0.5s; repeat"*
   - *"a fistful of rocket is thrown down from 50 cm and hits the pizza in 0.25s, leaves bouncing"*
   - *"the pan is flicked hard: the rigatoni jump 25 cm in 0.2s and fall back in 0.3s; flick again at 1.8s"*
4. **Cámara con la velocidad de la referencia**, escrita con distancia y tiempo: *"snap push-in of 25 cm in 0.4s, ending on…"*, *"fast tilt down following the falling leaves, 40 cm in 0.3s"*, *"quick lateral slide of 30 cm in 0.5s"*. El movimiento rápido va sobre **manos, harina, fuego, sartén y caída de ingredientes** (sujetos que no se deforman o cuya deformación es natural). El plato terminado en reposo sigue con un movimiento corto, porque las órbitas y los macros sobre comida blanda la deforman (`higgsfield/04` §5).
5. **Acelerar en el prompt, no fiarlo solo al montaje:** Seedance tiende a la cámara lenta en acciones rápidas [COMUNIDAD]. Siempre *"real-time speed, fast and energetic, no slow motion"* y, si la referencia usa rampas, *"speed ramp: fast, a 0.3s slow-motion beat on the impact, fast again"*.
6. **Montaje (skill `openmontage`, `03` §4):** cortes de 0,4–0,8 s como la referencia, aceleración de 1,25–2× en los tramos de transición, cámara lenta solo en el impacto, y transiciones de movimiento (*whip* o corte en la acción) si la referencia las usa.
7. **Validar la energía antes de pagar la toma buena:** una prueba a 480p (3 cr/s) de la toma de más riesgo, 5 s = 15 cr, medida con el script de §1.3. Si la mediana queda por debajo de ~0,8× la de la referencia, se reescribe el prompt antes de generar a 720p (**umbral: hipótesis**, a validar en próximos casos).

**Rescate sin regenerar (medido):** el mismo clip montado en OpenMontage con velocidad por corte (tramos a 2–3×, acción a 1–1,2×, *snap zooms*, whips, flash y sacudida en el impacto, cortes de 0,7 s de media) llegó a mediana 4,23 / p90 12,6 / 36 % rápidos, un 0,81× de la mediana de la referencia, con 0 cr (skill `openmontage`, `03` §4). **Orden de preferencia:** escribir bien la energía en el prompt (reglas 2–5) → si el clip ya existe, rescatarlo en montaje antes de pagar otra generación.

**Lo que sí funcionó y se conserva:** los keyframes anclados a las fotos reales (el local reconocible tras regenerar el de la sala), la cláusula PRESERVE (deriva máxima de R/B de +0,08 por toma) y los cortes de la multitoma exactamente en las ventanas pedidas (2,75 · 5,67 · 8,71 · 11,75 s).

## Registro de trabajos del 24/09/2026

| Trabajo | ID | Resultado |
|---|---|---|
| Clip chuletón (Seedance, 480p, 5 s) | `6b9fee9c-b9db-4b87-8fea-3b05409dfc4d` | Fallos de continuidad (§5) |
| Reel sushi cenital (480p, 10 s) → Topaz | `ff621220-c3a8-406a-b2e2-d5029a5dfd87` → `9731199a-fc82-4684-8d7b-73d020a265a2` | Bandas negras; aspecto plástico medido |
| Foto real del sushi | media `b00cd123-7ad5-4ca1-8277-539af7e99bf7` | Ancla de identidad |
| Keyframes recreación MURO | `5284f5ae…`, `822e9428…`, `a84ebd1f…`, `c615a5fe…` | Aprobados; luz demasiado cálida |
| Multitoma MURO (720p, 12 s) → Topaz | `ea856f13-4649-47e3-96fc-19943a790ac1` → `a89cc129-2c08-4bda-b7d3-e55b8475881f` | 98 cr en total; plástico en el nigiri |
| Ficha de texturas reales | media `f4f2048e-7841-435b-8c54-706f76e3f400` | Referencia de textura |
| Keyframe nigiri con reglas nuevas | `ccb41958-16f7-4ba8-872c-fe0ffcd80f00` | Aprobado |
| Multitoma dron (720p, 6 s) → ByteDance | `85694624-d4b5-466f-87fc-8ca0a8b6b841` → `2818f819-cc8e-415a-baa6-2cd989ac5c77` | Gustó; 44,12 cr en total. Calidad de ByteDance medida después en la A/B del 24/09 (`03` §4) |
| A/B gambas 720p → ByteDance pro / `aigc` / Topaz; 1080p nativo de control | `3a044024…` → `1f0f8ad9…` / `a1f61ceb…` / `758e7871…`; `83dfa696…` | ByteDance pro, el más nítido (71 % del keyframe); `pruebas/ab-reescalado-720p-2026-09-24/` |

## Registro de trabajos del 25/09/2026 (Da Tonino)

| Trabajo | ID | Resultado |
|---|---|---|
| Keyframes K1–K5 (pedido `nano_banana_pro`, **servido `nano_banana_2`**) | `dd02f906…` (K1 descartado: paredes grises), `333d4a32…` (K1 sala), `cec08eef…` (masa), `819b7da7…` (rúcula), `84a4353e…` (rigatoni), `a1a4dc83…` (paella) | Aprobados; ~12 cr |
| Multitoma Seedance 2.5, 15 s, 720p, 5 tomas | `326abb72-c40f-4f8b-9c14-50d5304ca72f` | Preset «IN THE DARK» declinado; 105 cr; cortes exactos y color estable, **rechazada por lenta** (§7) |
| ByteDance pro `aigc` 1080p | `38aa8f1d-386b-432c-94a3-84dc68851848` | 1080×1920 H.264; preflight 1 cr |
| Montaje v2 con velocidad (OpenMontage) | `pruebas/reel-da-tonino-2026-09-25/da-tonino-reel-v2.mp4` | 11,2 s; energía 0,81× la de la referencia; 0 cr |
