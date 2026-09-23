<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

# Plan de pruebas — analizador de vídeos de referencia

Preparado el 17/09/2026. **Nada de lo que hay aquí se ha ejecutado todavía.** La investigación de la que sale está en [`informes/Society_analisis_video_referencia.md`](../../informes/Society_analisis_video_referencia.md).

## 1 Qué se quiere comprobar

**Hipótesis:** si un vídeo de referencia se analiza con modelos especializados (cortes, cámara, objetos, profundidad, movimiento, luz, audio, rótulos) y el LLM recibe una ficha de datos por plano, los prompts salen más precisos que mirando fotogramas sueltos.

Las pruebas tienen que responder cuatro preguntas:

1. ¿Cada herramienta funciona en el equipo disponible y en qué tiempo?
2. ¿Lo que mide coincide con la verdad conocida del vídeo patrón?
3. ¿La ficha completa describe lo que Víctor ve en el vídeo?
4. ¿El prompt escrito desde la ficha es mejor que el escrito desde fotogramas?

Si la respuesta a la 2 o la 3 es «no» en una capa, esa capa se descarta, no se fuerza.

## 2 Entorno medido el 17/09/2026

| Elemento | Valor | Consecuencia |
|---|---|---|
| GPU | NVIDIA GeForce RTX 4070 Laptop, **8 GB de VRAM**, driver 616.92 | Los modelos de 7B en precisión completa **no caben**. Ver §5 |
| Python del sistema | 3.13.3 | SAM 3 pide 3.12 y SEA-RAFT 3.10: un entorno conda por herramienta |
| FFmpeg | 9.0.1 (gyan.dev) | Disponible para extraer audio y fotogramas |
| WSL | Solo `docker-desktop`, sin Ubuntu | ViPE se instala con un entorno conda de CUDA pensado para Linux. **No está verificado que funcione en Windows nativo.** Si falla, instalar Ubuntu en WSL2 |

Repetir la medición si cambia el equipo o se alquila GPU.

## 3 Vídeos de prueba

| ID | Vídeo | Ruta | Para qué sirve |
|---|---|---|---|
| **V1** | Reel del chuletón aprobado (15/09) | `C:\Users\victo\Documents\Codex\2026-09-14\qu\outputs\Reel_natural\Reel_final_Seedance_Nadine.mp4` | **Vídeo patrón**: su montaje está documentado, así que hay verdad con la que comparar |
| V2 | Metraje real de parrilla | `C:\Users\victo\Documents\torre_de_vega\imagenes\parrilla\clips\parrilla_volteo_master_4k60.mp4` | Movimiento caótico real (llama, humo): prueba de SEA-RAFT y de la regla 22 |
| V3 | Reel externo de referencia del sector | **Por elegir** | Caso real de uso: con música, rótulos y movimientos de cámara variados |

Antes de empezar, copiar los vídeos a `pruebas/analizador-video-referencia/entradas/` **o** trabajar con las rutas originales, pero no mezclar.

### 3.1 Verdad conocida de V1

Sacada de [`receta-y-evidencia.md`](../../base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/receta-y-evidencia.md).

**Formato:** 9 s, 1080 × 1920, 30 fps, 270 fotogramas, H.264 + AAC.

**Planos (cortes):**

| Plano | Tramo | Fuente | Qué hay |
|---|---|---|---|
| 1 | 0–1,4 s | Seedance (IA) | Interior de la carne, adelanto |
| 2 | 1,4–3,4 s | Parrilla real | Brasa, cambio de punto de vista |
| 3 | 3,4–9 s | Seedance (IA) | Corte completo con tenedor y cuchillo, revelado |

**Subtítulos** (Arial Bold blanco, centrados en x=540, línea base y=1510):

| Texto | Entra | Sale |
|---|---:|---:|
| Por fuera, brasa. | 0,14 | 1,90 |
| Por dentro… | 2,16 | 2,78 |
| mira ese corte. | 3,38 | 4,70 |
| Solo chuletón a la parrilla. | 4,84 | 6,52 |
| ¿Lo pedirías así? | 6,70 | 7,80 |

**Audio:** voz en off desde 0 s (unos 7,9 s) + ambiente de parrilla atenuado. **No hay música**, así que el detector de pulsos no debería encontrar un ritmo claro.

**Luz:** difusa, luz de día de restaurante, sombras suaves, colores neutro-cálidos (brief de luz del reel).

**Sin verdad documentada:** movimiento de cámara exacto de cada plano y porcentaje del encuadre que ocupa el plato. Antes de la fase 2, Víctor anota a mano lo que ve en esos dos puntos, para tener con qué comparar.

## 4 Orden de las pruebas

De menos a más riesgo: primero lo que corre en CPU y se instala con `pip`, al final lo que necesita más VRAM o Linux.

Todos los resultados van a `pruebas/analizador-video-referencia/resultados/<ID de prueba>/`. Los comandos están copiados de los README oficiales a 17/09/2026; si fallan, mirar el README actual antes de improvisar.

### Fase 0 — Capas sin GPU

**P0.1 · Cortes con PySceneDetect**

```bash
pip install scenedetect --upgrade
scenedetect -i V1.mp4 list-scenes save-images
```

- **Acepta si:** detecta 3 planos con cortes a 1,4 s y 3,4 s (tolerancia ±2 fotogramas = ±0,07 s).
- **Anotar:** cortes detectados, falsos positivos (p. ej. en la entrada de un subtítulo), tiempo de ejecución.
- **Si falla:** probar el umbral de `ContentDetector` y, como segunda opción, TransNetV2.

**P0.2 · Rótulos con PaddleOCR**

Extraer un fotograma cada 0,1 s con FFmpeg y pasarlos por PaddleOCR (instalación según su README).

- **Acepta si:** lee los 5 subtítulos con el texto correcto (tildes y «¿» incluidos), da su posición vertical cerca de y=1510 y su entrada y salida con error ≤ 0,2 s.
- **Anotar:** errores de lectura en español, tiempo total.

**P0.3 · Voz con WhisperX**

```bash
pip install whisperx
whisperx audio_V1.wav --language es
```

- **Acepta si:** transcribe la locución y los tiempos por palabra coinciden con la tabla de subtítulos (±0,2 s).
- **Nota:** en GPU pide CUDA Toolkit 12.8 instalado antes. En CPU funciona pero más lento.

**P0.4 · Pulsos con beat_this**

```bash
pip install beat-this
beat_this audio.wav -o salida.beats --gpu=-1
```

- **Acepta si:** en V1 (sin música) **no** marca un ritmo regular. En V3 (con música) marca pulsos y se puede calcular cuántos cortes caen a ±2 fotogramas de un pulso.
- **Riesgo:** puede inventar pulsos en la voz o el crepitar de la brasa. Si pasa en V1, la capa no es fiable sin separar antes la música con Demucs.

### Fase 1 — GPU, modelos pequeños

**P1.1 · Objetos con SAM 3**

Entorno según README: `conda create -n sam3 python=3.12`, PyTorch con CUDA 12.8 y `pip install -e .`

- **Conceptos a pedir:** `plate`, `knife`, `fork`, `hand`, `meat`, `grill`, `flame`, `text`.
- **Acepta si:** en el plano 3 de V1 segmenta plato, carne, manos y cubiertos durante todo el plano sin perderlos; en el plano 2, brasa y llama.
- **Medir:** porcentaje del encuadre de cada objeto por plano y VRAM máxima (`nvidia-smi` en paralelo).
- **Por verificar antes de instalar:** si los pesos en Hugging Face (`facebook/sam3`) piden solicitar acceso.

**P1.2 · Profundidad con Depth Anything 3**

Solo pesos **DA3-BASE** o **DA3METRIC-LARGE** (los demás no permiten uso comercial).

- **Acepta si:** en el plano 3 separa claramente plato y carne (cerca) del fondo del local (lejos) y el resultado es estable entre fotogramas.
- **Anotar:** VRAM, tiempo por fotograma, si el mapa sirve para decir «desenfoque de fondo sí/no».

**P1.3 · Movimiento con SEA-RAFT**

Entorno según README: `conda create --name SEA-RAFT python=3.10.13` y `pip install -r requirements.txt`.

- **Medir:** magnitud media del flujo óptico por plano.
- **Acepta si:** V2 (parrilla con llama) da claramente más movimiento que el plano 1 de V1, y dentro del plano 3 el movimiento se concentra en manos y cubiertos.
- **Uso posterior:** umbral para marcar «textura caótica → usar metraje real» (regla 22). El umbral **no se fija** hasta tener al menos 3 vídeos medidos.

### Fase 2 — Cámara y gramática de plano

**P2.1 · Gramática de plano con ShotVL**

- **Problema de VRAM:** ShotVL-7B en bf16 necesita del orden de 15 GB solo de pesos (7B × 2 bytes, cálculo aproximado), así que no cabe en 8 GB. Opciones por orden:
  1. **ShotVL-3B** en bf16 (unos 6–7 GB de pesos, justo; el vídeo añade memoria). Bajar fps o resolución de entrada.
  2. ShotVL-7B cuantizado a 4 bits (bitsandbytes). **No verificado** que mantenga la precisión.
  3. GPU alquilada para esta prueba.
- **Preguntas a hacerle por plano:** tamaño de plano, ángulo, lente, tipo de luz, condición de luz, composición, movimiento de cámara.
- **Acepta si:** en V1 la luz sale como difusa o natural (no dura ni de estudio) y el movimiento coincide con lo que anotó Víctor (§3.1). Mínimo 5 de 7 respuestas correctas por plano.

**P2.2 · Trayectoria de cámara con ViPE**

```bash
pip install nvidia-vipe
vipe infer V1_plano3.mp4 -o vipe_results/
```

(Desde el código fuente: `conda env create -f envs/cu128.yml`, `uv sync`, `uv run vipe infer ...`.)

- **Pasar cada plano por separado** (cortar antes con FFmpeg usando los tiempos de P0.1): un corte en medio rompe la estimación de trayectoria.
- **Comprobar la licencia en tiempo de ejecución:** revisar en el log qué modelos descarga. Si aparece **Unik3D**, esa ruta no vale para uso comercial.
- **Acepta si:** la trayectoria coincide con lo anotado a mano (por ejemplo, cámara casi fija en el plano 3) y da un avance o giro medible.
- **Riesgo principal:** que no instale en Windows. Plan B: Ubuntu en WSL2. Plan C: GPU alquilada.

**P2.3 · Comparar CameraBench (solo investigación)**

Mismos planos con `chancharikm/qwen2.5-vl-7b-cam-motion` (en GPU alquilada; no cabe en 8 GB). Solo para la memoria del TFG: la licencia de sus pesos está sin aclarar.

### Fase 3 — Ficha y traducción a palabras

**P3.1 · Script de traducción.** Convierte la trayectoria de ViPE en vocabulario de cámara:

| Dato medido | Palabra |
|---|---|
| Traslación hacia delante dominante | dolly in / push in |
| Rotación en eje vertical dominante | pan left / right |
| Rotación en eje horizontal dominante | tilt up / down |
| Traslación vertical | crane / pedestal up / down |
| Todo por debajo de un umbral | static / locked-off |
| Variación alta de alta frecuencia | handheld (prohibido por regla 11: marcarlo como aviso) |

Los umbrales se calibran con V1–V3, **no se inventan antes**. Guardar los usados en `resultados/P3.1/umbrales.json`.

**P3.2 · Ficha JSON por plano.** Juntar las salidas de fases 0–2 en el formato del informe (§2).

- **Acepta si** Víctor lee la ficha de V1 sin ver el vídeo y reconoce los tres planos. Anotar cada campo como correcto, incorrecto o irrelevante.

### Fase 4 — ¿Mejora los prompts?

**P4.1 · Comparación a ciegas.** Con V3 como referencia, escribir dos prompts para la misma pieza:

- **A:** desde fotogramas sueltos (método actual).
- **B:** desde la ficha.

Víctor puntúa sin saber cuál es cuál (1–5) en: fidelidad al movimiento de cámara, ritmo, encuadre y luz. **Primero se comparan los prompts en texto, sin generar vídeo.** Generar solo si B gana con claridad, y como mucho un clip por prompt, porque cada clip cuesta dinero (ver costes en el README §5.1).

## 5 Presupuesto de VRAM (por medir)

| Modelo | Estimación | Medido |
|---|---|---|
| PySceneDetect, PaddleOCR, beat_this | CPU | — |
| WhisperX large-v2 | < 8 GB según su README | — |
| SAM 3 | Sin dato oficial | — |
| Depth Anything 3 Base | Sin dato oficial | — |
| SEA-RAFT | Sin dato oficial | — |
| ShotVL-3B | ~6–7 GB solo pesos (cálculo) | — |
| ViPE | Sin dato oficial | — |

Los modelos se ejecutan **uno detrás de otro**, liberando la GPU entre capas.

## 6 Licencias a revisar antes de pasar a producción

Las pruebas son investigación del TFG. **Antes** de usar cualquier capa en la agencia o en Society:

- [ ] ViPE: confirmar que la ruta usada no carga Unik3D (CC BY-NC-SA).
- [ ] Depth Anything 3: solo pesos BASE o METRIC-LARGE.
- [ ] SAM 3: leer la política de uso aceptable completa.
- [ ] ShotVL: confirmar la licencia del código del repo (sin fichero LICENSE a 17/09/2026; los pesos dicen Apache-2.0).
- [ ] CameraBench: licencia «other» sin texto. Preguntar a los autores o no usar.
- [ ] GVHMR y todo lo basado en SMPL: no comercial. Solo experimento.
- [ ] PaddleOCR y WhisperX: revisar las licencias de los modelos que descargan, no solo del código.

## 7 Registro de resultados

Copiar una fila por prueba ejecutada. No borrar filas fallidas: un fallo también es un resultado.

| Fecha | Prueba | Vídeo | Versión / commit | ¿Pasa? | Tiempo | VRAM máx. | Observaciones |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## 8 Lo que queda abierto

1. Elegir V3 (un reel externo del sector, con música y rótulos).
2. Víctor anota a mano el movimiento de cámara y el encuadre de V1 antes de la fase 2.
3. Decidir si la fase 2 se hace en local, en Ubuntu con WSL2 o en GPU alquilada.
4. Dónde vive el analizador si las pruebas salen bien: skill de OpenMontage (agencia) o módulo de Society.
