# Society

## Herramientas evaluadas: dirección de cámara, reconstrucción 3D y montaje automático

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 17 de septiembre de 2026

## 1 Resumen ejecutivo

Se han evaluado tres materiales externos para ver qué aportan a Society. Ninguno entra tal cual en el producto, pero de los tres salen herramientas concretas que sí conviene documentar.

| Material evaluado | Veredicto | Lo que se aprovecha |
|---|---|---|
| Guía «Comandos de cámara para vídeo con IA» (Rekla Studio, PDF) | **No es metodología.** Es el catálogo de presets de cámara de Higgsfield con una barra delante | Glosario de movimientos para forzar variedad de ángulo; traducción a prosa cuantificada |
| ABot-Recon (AMAP · Alibaba) | **Descartado para el producto.** Pesos con licencia no comercial y pensado para recorridos largos, no para un local | Nada en producción. Cabe como experimento comparativo del TFG |
| MoneyPrinterTurbo | **Descartado como motor de reels.** Monta vídeo genérico con clips de stock | Tres piezas de código MIT: montaje con MoviePy y FFmpeg, subtítulos corregidos contra el guion y catálogo de voces |

**Herramientas que se añaden a la lista del proyecto como candidatas:**

- **COLMAP o GLOMAP → gsplat** siguen siendo el pipeline del módulo 3D. **VGGT-1B-Commercial** queda como alternativa rápida para calcular las poses de cámara con licencia comercial. [H7][H8][H9]
- **MoviePy + FFmpeg** como montaje de respaldo si la licencia de After Effects no permite usarlo en un SaaS (decisión pendiente n.º 10 del README). [H10][H12]
- **faster-whisper con corrección contra el guion** para los subtítulos de audio que no sale del guion. [H11]
- **Referencia de vídeo en Seedance 2.5** para copiar el movimiento de cámara de una plantilla en vez de describirlo. [H4]

## 2 Dirección de cámara: la guía de comandos

### 2.1 Qué es en realidad

La guía presenta 54 «comandos» (`/dollyin`, `/crashzoomin`, `/bullet-time`…) como propios de Veo 3.1. No lo son:

- **Veo 3.1 no tiene sintaxis de comandos.** La guía oficial de Google pide prosa con la fórmula `[Cinematografía] + [Sujeto] + [Acción] + [Contexto] + [Estilo y ambiente]`. La única sintaxis que documenta son los tramos de tiempo (`[00:00-00:02] …`). [H1]
- **Los nombres son los presets de Higgsfield.** Los cinco «usados en tu vídeo» (Dolly In, Arc Left, Overhead, Crash Zoom In, Crane Up) y la lista larga coinciden con su catálogo de Camera Controls. En Higgsfield el preset se elige en la interfaz; escribir la barra no hace nada. [H2]
- **Seedance 2.5 no tiene ningún parámetro de cámara.** Su API en fal solo acepta `prompt`, `image_url`, `end_image_url`, `resolution`, `duration`, `aspect_ratio`, `generate_audio` y `bitrate_mode`. Todo el control de cámara va escrito en el texto. [H3]

Consecuencia: el vocabulario vale para cualquier modelo, pero siempre hay que escribirlo en prosa.

### 2.2 Qué vale y qué no para los reels de hostelería

| Grupo de la guía | Ejemplos | Uso en Society |
|---|---|---|
| Movimientos de cámara reales | dolly in/out, arc, crane, tilt, pan, truck, orbit, overhead, rack focus | **Útil** como lista para elegir y variar movimientos (reglas 9 y 17 de vídeo) |
| Tipos de plano | closeup, wide, macro, pov | **Útil** para variar encuadres |
| Cámara en mano | handheld, shakycam | **Prohibido.** El cliente lo rechazó el 08/09 por temblor poco profesional (regla 11) |
| Efectos de posproducción | glitch, loop, reverse, morph, transition, timelapse, speedramp, freeze, motionblur | **Van al montaje**, no al generador: gratis y más controlables |
| Adjetivos vagos | cinematic, epicshot | **A evitar.** Tanto Google como las guías de Seedance piden un movimiento concreto [H1][H4] |
| Movimientos aéreos y de acción | drone, fpv, bullet-time, whip-pan | Casi nunca encajan en un local; solo con un plano estudiado |

### 2.3 Cómo se escribe un movimiento

Un nombre de preset no basta. La fórmula que funcionó en el caso práctico (regla 11 de vídeo) tiene cuatro partes:

1. **Nombrar el aparato:** *motorised slider with a geared head*.
2. **Cuantificar el recorrido:** *pushes in about fifteen percent*.
3. **Pedir velocidad constante** del primer al último fotograma.
4. **Prohibir el handheld por su nombre** en el negativo.

Ejemplo, `/craneup` + `/dollyin` traducido:

> *A single continuous move on a motorised slider with a geared head: the camera rises about twenty centimetres while pushing in fifteen percent toward the plate, slow and at constant speed, already moving on the first frame and still moving on the last. Perfectly mechanical: no handheld operation, no shake, no jitter, no drift.*

Dos pautas de las guías de Seedance 2.5 que coinciden con las reglas del proyecto: **un solo movimiento por tramo** (varios se pelean entre sí) y la posibilidad de subir un **vídeo de referencia** con la indicación *«@Video 1 defines the camera move and the pacing only»*. [H4]

### 2.4 Pendiente de verificar

- Fuentes secundarias dicen que Cinema Studio de Higgsfield aplica los presets sobre Seedance 2.0, Veo 3.1 y Kling 3.0. **No hay confirmación primaria, y no se menciona Seedance 2.5.** Comprobarlo con `models_explore action:"get"` (gratis) antes de depender de ello. [H5]
- La referencia de vídeo de Seedance 2.5 no se ha probado todavía con una plantilla real.

## 3 Reconstrucción 3D del local: ABot-Recon

### 3.1 Qué es

Modelo de reconstrucción 3D en streaming publicado por AMAP (Alibaba) a finales de agosto de 2026. Con una ventana fija de 12 fotogramas calcula la pose de cada cámara y una nube de puntos, y su memoria no crece aunque la secuencia tenga miles de fotogramas. [H6]

### 3.2 Por qué no entra en el producto

**Licencia.**

- El código es Apache 2.0, pero los **pesos son CC BY-NC 4.0**: *"The source-code license in LICENSE does not grant commercial rights to the model weights"*.
- El acelerador opcional cuRoPE es CC BY-NC-SA 4.0.
- Reconstruir el local de un cliente que paga es uso comercial, así que haría falta una autorización escrita de los titulares. [H6]

**Encaje técnico.**

- **Resuelve otro problema.** Su ventaja se nota en recorridos de kilómetros (KITTI, Oxford Spires). En interiores compactos como 7Scenes, los propios autores solo dicen que es «competitive».
- **No da imagen utilizable.** Trabaja a **504×280** y devuelve poses y nube de puntos, no una representación renderizable. Un reel sigue necesitando Gaussian Splatting.
- **Es muy reciente.** El código de entrenamiento no se ha publicado todavía (anunciado para el 30/09).
- **Solo Linux:** CUDA 12.1, PyTorch 2.5.1, FlashInfer. Validado en A100; el benchmark (24,45 FPS y 6,71 GiB) es en H100.

**Uso admisible:** como experimento comparativo del TFG, que es uso educativo, sin procesar locales de clientes.

### 3.3 Pipeline recomendado para el módulo 3D

Se mantiene el del [informe de viabilidad §8](Society_diseno_y_viabilidad.md), con una alternativa para las poses:

| Paso | Herramienta | Licencia | Nota |
|---|---|---|---|
| Poses de cámara | COLMAP o GLOMAP | BSD | Clásico, más lento, robusto con buena captura [H7] |
| Poses de cámara (alternativa) | VGGT-1B-Commercial (Meta) | Comercial salvo uso militar, **con solicitud de acceso** | Solo este checkpoint; el VGGT original es no comercial [H8] |
| Reconstrucción | gsplat | Apache 2.0 | Gaussian Splatting [H9] |
| Trayectoria y render | Blender (+ importador 3DGS de KIRI) | GPL / Apache | Relighting experimental, no asumir física correcta |

### 3.4 Requisitos para procesar 5 locales a la vez

**Estimaciones sin medir.** No se ha reconstruido todavía ningún local completo. Los únicos datos medidos son los de ABot-Recon en H100.

**Captura (cliente, desde Society):**

- Vídeo con el móvil en 4K a 30 fps o 1080p a 60 fps, con exposición y enfoque bloqueados.
- Local vacío con la luz de servicio.
- Recorrido lento con mucho solapamiento y a dos alturas.
- Evitar espejos y cristaleras.
- Una medida real para la escala.
- No hace falta LiDAR ni una aplicación externa.

**Procesamiento:**

| Recurso | A · Una GPU propia con cola | B · GPU serverless en paralelo (recomendada) |
|---|---|---|
| GPU | 1× 24 GB (RTX 4090, L4 o A10G), un trabajo detrás de otro | 5 workers L4 de 24 GB a la vez (Modal o RunPod) |
| VRAM por trabajo | gsplat de una sala: aprox. 8–16 GB | Igual |
| RAM | 64 GB | 16–32 GB por worker |
| CPU | 16 núcleos o más (fotogramas y COLMAP) | 4–8 vCPU por worker |
| Disco | NVMe de 1 TB o más; 2–5 GB de captura y un splat de 200–800 MB por local | Almacenamiento de objetos (R2); temporales borrados al terminar |
| Sistema | Linux | Contenedor Linux |
| Tiempo por local | Aprox. 1–2 h | Igual, pero los cinco acaban a la vez |
| Coste de cómputo | Compra del equipo | Aprox. 1 USD/h de L4 → **unos 10 USD por 5 locales a 2 h** [H13] |

- **Por qué B.** El alta de un cliente no es urgente y una GPU encendida todo el día no se amortiza. La cola persistente sobre PostgreSQL del informe de viabilidad sirve también para estos trabajos.
- **El coste que domina es humano:** la revisión de cada reconstrucción, estimada en el informe en 2 h a 30 €/h por local.
- **Equipo actual** (portátil con RTX 4070 Laptop de 8 GB y Windows): vale para el piloto de una mesa, no para servir a cinco clientes.

## 4 Montaje automático: MoneyPrinterTurbo

### 4.1 Qué es

Generador de vídeos cortos (licencia MIT, mantenido: último commit el 16/09/2026). A partir de un tema:

1. Un LLM escribe el guion y saca palabras clave.
2. Se buscan clips de stock en Pexels o Pixabay.
3. Se añaden voz TTS, subtítulos y música.
4. Se monta con MoviePy y FFmpeg a 1080×1920.

También publica en TikTok, Instagram y YouTube Shorts. [H10]

### 4.2 Por qué no sirve como motor de reels de Society

- **Rompe la regla 1 de continuidad.** Los clips de stock no son el local real.
- **No cumple la regla 12 del gancho.** No hay contrato de plano ni un primer segundo diseñado: son cortes encima de una voz.
- **No usa imagen de partida.** Sus conectores de vídeo (Seedance, MiniMax) son texto a vídeo, sin `start_image` ni `end_image` anclados al local.
- **Publica mediante un intermediario** (`api.upload-post.com`). Society usará la API oficial de Instagram.
- **Su arquitectura no encaja:** interfaz Streamlit y estado de tareas propio, frente a la cola sobre PostgreSQL y los workers del proyecto.
- **El README está lleno de enlaces de afiliado** a pasarelas de API de terceros. No usar ninguna en un producto que guarda claves y datos de clientes.

### 4.3 Qué se aprovecha

| Pieza | Archivo | Para qué en Society |
|---|---|---|
| Montaje con MoviePy y FFmpeg | `app/services/video.py` | **Respaldo si After Effects no se puede usar en un SaaS.** Concatenar, ajustar a 9:16, subtítulos con estilo y animación, mezcla de voz y música, y reintento si falla el codec |
| Subtítulos con faster-whisper y corrección contra el guion | `app/services/subtitle.py` | Audio que no sale del guion (voz nativa de Seedance, persona real). Complementa WhisperX del [informe de voces](Society_voces_y_subtitulos.md) |
| Catálogo de voces tras una misma interfaz | `app/services/voice.py` | Montar la prueba a ciegas de voces sin programar cada conector |

**Forma de uso:** leer y adaptar esas piezas respetando la atribución MIT. No desplegar el proyecto.

No se ha ejecutado. La evaluación sale del README, la licencia y el código de los servicios.

## 5 Cambios propuestos en la lista de herramientas del README

| Función | Herramienta | Estado propuesto |
|---|---|---|
| 3D del local · poses | COLMAP o GLOMAP; VGGT-1B-Commercial como alternativa | Experimental; VGGT pendiente de solicitud de acceso |
| Montaje de respaldo | MoviePy + FFmpeg (referencia: MoneyPrinterTurbo, MIT) | Candidato, solo si la licencia de After Effects no permite uso SaaS |
| Subtítulos de audio no guionizado | faster-whisper con corrección contra el guion | Candidato junto a WhisperX |
| Dirección de cámara | Vocabulario en prosa cuantificada; referencia de vídeo en Seedance 2.5 | La referencia de vídeo está pendiente de ensayo |
| ABot-Recon | — | **Descartado para el producto** (pesos CC BY-NC 4.0) |

## 6 Preguntas abiertas

1. ¿Permite la licencia de After Effects renderizar con `aerender` en un worker que da servicio a clientes? De esto depende que el montaje de respaldo pase de candidato a necesario.
2. ¿Admite Higgsfield sus presets de cámara sobre Seedance 2.5?
3. ¿Copia bien Seedance 2.5 el movimiento de una plantilla con referencia de vídeo, sin deformar el plato?
4. ¿Concede Meta el acceso a VGGT-1B-Commercial para este uso, y mejora a COLMAP en un interior con superficies lisas?
5. ¿Cuánto tarda y cuánta VRAM gasta de verdad reconstruir una sala? Hay que medirlo en el piloto de una mesa.

## 7 Fuentes

**Dirección de cámara y modelos de vídeo**

- [H1] Google Cloud · Ultimate prompting guide for Veo 3.1 · https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- [H2] Higgsfield · Camera Controls · https://higgsfield.ai/camera-controls
- [H3] fal · Seedance 2.5 image to video, esquema de la API · https://fal.ai/models/bytedance/seedance-2.5/image-to-video/api
- [H4] OpenArt · Seedance 2.5 Prompt Guide (secundaria) · https://openart.ai/blog/seedance-2-5-prompt-guide/
- [H5] Higgsfield · Which AI model should I use (búsqueda secundaria sobre Cinema Studio) · https://higgsfield.ai/creator-hub/help-center/ai-models/which-ai-model-should-i-use

**Reconstrucción 3D**

- [H6] amap-cvlab · ABot-Recon (README, MODEL_LICENSE.md, THIRD_PARTY_NOTICES.md e informe técnico) · https://github.com/amap-cvlab/ABot-Recon
- [H7] COLMAP · https://colmap.github.io/
- [H8] Meta · VGGT-1B-Commercial · https://huggingface.co/facebook/VGGT-1B-Commercial
- [H9] nerfstudio-project · gsplat · https://github.com/nerfstudio-project/gsplat

**Montaje, subtítulos y cómputo**

- [H10] harry0703 · MoneyPrinterTurbo (README, LICENSE y `app/services/`) · https://github.com/harry0703/MoneyPrinterTurbo
- [H11] SYSTRAN · faster-whisper · https://github.com/SYSTRAN/faster-whisper
- [H12] MoviePy · https://github.com/Zulko/moviepy
- [H13] Modal · Pricing · https://modal.com/pricing
