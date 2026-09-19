# Society

## Análisis estructurado de vídeos de referencia: herramientas tipo GVHMR para cada elemento del plano

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 17 de septiembre de 2026

## 1 Resumen ejecutivo

**La idea.** En vez de pasarle al modelo de lenguaje fotogramas sueltos y pedirle que «describa», se descompone el vídeo de referencia con modelos especializados (uno por elemento: cortes, cámara, profundidad, objetos, personas, movimiento, luz, audio, texto). Cada uno devuelve **datos medidos** y el LLM solo traduce esa «ficha de plano» a prompt. GVHMR [A1] es exactamente eso para cuerpos humanos: devuelve la trayectoria y la pose 3D de la persona en coordenadas del mundo, separada del movimiento de la cámara.

**Veredicto.** La idea es buena y existe una herramienta madura para casi cada elemento. Pero hay dos matices que cambian el diseño:

1. **Los modelos geométricos devuelven números, no palabras.** GVHMR, ViPE o MegaSaM te dan matrices de pose por fotograma. Hace falta una capa propia (un script sencillo) que convierta «rotación de 18° en el eje Y en 2 s» en *«slow pan right»*. Para cámara e iluminación ya existen **modelos de lenguaje entrenados específicamente** (CameraBench, ShotVL) que dan la etiqueta en palabras directamente.
2. **Muchas licencias no son comerciales.** GVHMR incluido. Para la agencia y para Society (ambas son uso comercial) hay que elegir la alternativa con licencia permisiva en cada capa.

**Pila recomendada (todo con licencia comercial verificada salvo donde se indica):**

| Capa | Herramienta | Qué devuelve | Licencia |
|---|---|---|---|
| Cortes de plano | PySceneDetect | Marcas de tiempo de cada corte → ritmo del montaje | BSD-3 [A2] |
| Cámara (datos) | ViPE (NVIDIA) | Intrínsecos, trayectoria 6DoF y profundidad por fotograma | Apache-2.0 salvo el módulo Unik3D (NC) [A3] |
| Cámara (palabras) | ShotVL-7B | Tamaño de plano, encuadre, ángulo, lente, tipo y condición de luz, composición, movimiento | Apache-2.0 (pesos) [A4] |
| Profundidad | Depth Anything 3 **Base o Metric-Large** | Mapa de profundidad → primer plano/fondo, desenfoque | Apache-2.0 (solo esos pesos) [A5] |
| Objetos | SAM 3 | Máscaras y seguimiento por texto: *«plate», «glass», «hand», «flame»* | SAM License, uso comercial permitido [A6] |
| Movimiento dentro del plano | SEA-RAFT | Flujo óptico → cuánto se mueve el sujeto y a qué velocidad | BSD-3 [A7] |
| Audio | beat_this + WhisperX | Pulsos de la música (¿corta en el beat?) y locución con tiempos por palabra | MIT / BSD-2 [A8][A9] |
| Rótulos en pantalla | PaddleOCR | Texto, posición y duración de cada rótulo | Apache-2.0 [A10] |
| Personas (si hay) | **sin opción comercial limpia verificada** | Ver §3.5 | — |

## 2 Cómo encaja en el flujo de prompts

```
vídeo de referencia
  └─ PySceneDetect → lista de planos (inicio, fin, duración)
       └─ por cada plano, en paralelo:
            ViPE ............ trayectoria de cámara (números)
            ShotVL .......... gramática de plano y luz (palabras)
            Depth Anything 3  capas de profundidad
            SAM 3 ........... qué objetos hay, dónde y cuánto ocupan
            SEA-RAFT ........ intensidad de movimiento del sujeto
            PaddleOCR ....... rótulos
       └─ beat_this + WhisperX sobre el audio completo
  └─ script de traducción: números → vocabulario de cámara (§2.3 de herramientas_evaluadas)
  └─ ficha JSON por plano → LLM → prompt imagen a vídeo
```

Ejemplo de ficha que recibiría el LLM (ilustrativo, no es salida real):

```json
{
  "plano": 2, "inicio_s": 1.4, "duracion_s": 2.1,
  "camara": {"movimiento": "dolly in", "avance_aprox_pct": 15, "velocidad": "constante", "temblor": "ninguno"},
  "gramatica": {"tamano": "close-up", "angulo": "high angle", "lente": "medium", "luz": "side light, low key"},
  "objetos": [{"nombre": "plate", "area_pct": 38, "posicion": "centro-abajo"}, {"nombre": "flame", "area_pct": 9}],
  "movimiento_sujeto": "bajo",
  "rotulo": {"texto": "…", "entra_s": 1.6, "posicion": "tercio superior"},
  "corte_en_beat": true
}
```

Ventajas frente a mirar fotogramas: el movimiento de cámara se **mide** (la regla 11 pide cuantificar recorrido y velocidad, y aquí sale medido), el ritmo de corte sale en segundos exactos y se distingue si lo que se mueve es la cámara o el sujeto, que es justo lo que un LLM confunde con imágenes estáticas.

Encaja con el filtro de contenido del prompt de OpenMontage: de la referencia se extrae **mecanismo** (ritmo, cámara, gancho, rótulos); los objetos que detecte SAM 3 sirven para medir composición, no para copiar platos ni local.

## 3 Detalle por elemento

### 3.1 Cortes y ritmo

- **PySceneDetect** [A2] — BSD-3, mantenido (último push 15/09/2026). Detecta cortes duros y fundidos con OpenCV, sin GPU. Es la opción práctica.
- **TransNetV2** [A11] — MIT, más preciso en transiciones graduales, pero sin actividad desde diciembre de 2023.

### 3.2 Cámara

**Datos geométricos** (el equivalente directo de GVHMR para la cámara):

| Repo | Licencia | Notas |
|---|---|---|
| **ViPE** (nv-tlabs) [A3] | Apache-2.0 excepto Unik3D (CC BY-NC-SA) | Mantenido (push 10/09/2026). Pensado justo para vídeo «en bruto»: selfies, planos de cine, gran angular. Hay que comprobar que la ruta usada no carga Unik3D |
| MegaSaM [A12] | Código Apache-2.0 | Muy preciso con escenas dinámicas, pero depende del checkpoint Depth Anything ViT-L, cuya licencia es no comercial **(no verificado en fuente para ese fichero concreto)** |
| MapAnything (Meta) [A13] | Apache-2.0 | Reconstrucción métrica; más orientado a 3D que a vídeo corto |
| π³ [A14] | BSD-3 | Alternativa rápida a VGGT para poses |
| CUT3R [A15] | CC BY-NC-SA | Descartado por licencia |

**En palabras** (se salta la capa de traducción):

- **ShotVL** (Vchitect) [A4] — Qwen2.5-VL afinado en ShotBench. Clasifica 8 dimensiones de cinematografía: tamaño de plano, encuadre, ángulo, lente, **tipo de luz, condición de luz**, composición y movimiento. Pesos 3B y 7B en Apache-2.0 según la ficha de Hugging Face. Precisión media declarada por los autores: 65,1 % (3B) y 70,1 % (7B) — dato propio, no auditado. Existe una v1.1 anunciada el 12/09/2025 que **no aparece públicamente** en Hugging Face a fecha de consulta.
- **CameraBench** [A16] — NeurIPS 2025. Taxonomía de primitivas de movimiento diseñada con directores de fotografía y Qwen2.5-VL afinado (7B, 32B, 72B). Es el mejor en movimiento de cámara, pero la licencia de los pesos es **«other» sin texto** en la ficha: no usar comercialmente hasta aclararlo con los autores. El dataset/código del repo es CC BY 4.0.

**Recomendación:** ViPE para medir recorrido y velocidad + ShotVL para la gramática del plano. CameraBench como comparación en la memoria del TFG.

### 3.3 Profundidad

- **Depth Anything 3** [A5] — repo Apache-2.0, pero **las licencias de los pesos difieren**: DA3-BASE y DA3METRIC-LARGE son Apache-2.0; DA3-LARGE, DA3-GIANT y DA3NESTED-GIANT-LARGE son CC BY-NC 4.0. Usar solo los dos primeros.
- **Video Depth Anything** [A17] — Apache-2.0 el código, consistente en vídeos largos. Licencia de cada checkpoint sin verificar.

Para prompts sirve para decidir *shallow depth of field* y cuántas capas tiene el plano.

### 3.4 Objetos

- **SAM 3** (Meta) [A6] — segmentación y seguimiento por concepto de texto en vídeo. La SAM License concede uso, reproducción y obras derivadas sin cánones, con política de uso aceptable. Es la pieza más útil: permite medir qué porcentaje del encuadre ocupa el plato o si hay manos en plano.
- **SAM 2** [A18] — Apache-2.0, necesita un clic o caja por objeto; combinable con **Grounded-SAM-2** [A19] (Apache-2.0) para prompts de texto.
- **SAM 3D Objects** [A20] — reconstruye objetos en 3D; no aporta a prompts de vídeo.
- **CoTracker3** [A21] y **SpatialTrackerV2** [A22] (seguimiento de puntos 2D/3D) — ambos **CC BY-NC 4.0**, descartados.

### 3.5 Personas (lo que hace GVHMR)

| Repo | Licencia | Estado |
|---|---|---|
| **GVHMR** [A1] | **Solo educativo, investigación y sin ánimo de lucro**; uso comercial por correo a xwzhou@zju.edu.cn | Mantenido |
| WHAM [A23] | Código MIT | Sin actividad desde abril de 2024 |
| TRAM [A24] | Código MIT | Activo hasta junio de 2025 |
| PromptHMR [A25] | Sin identificar | — |
| SAM 3D Body (Meta) [A26] | SAM License | Pose y malla por imagen, no trayectoria en el mundo |

Matiz importante: **todos estos métodos devuelven parámetros del modelo corporal SMPL/SMPL-X**, y SMPL se distribuye con licencia propia no comercial **(conocido, no verificado hoy en fuente primaria)**. Aunque el código sea MIT, la cadena completa no es comercial sin licenciar SMPL.

Para los reels de hostelería el cuerpo 3D completo rara vez hace falta: lo que importa es «hay unas manos cortando», «el camarero entra por la izquierda». Eso sale de **SAM 3 + SEA-RAFT** (máscara de persona o manos + cuánto y hacia dónde se mueve) sin tocar SMPL. GVHMR queda como experimento del TFG con un vídeo de prueba.

### 3.6 Movimiento del sujeto

- **SEA-RAFT** [A7] — BSD-3, flujo óptico. Restando el movimiento de cámara de ViPE se obtiene cuánto se mueve el sujeto (humo, llama, vertido de vino). Sirve para la regla 22 (texturas caóticas): si la referencia tiene mucho movimiento de fuego, marcarlo como «usar metraje real».

### 3.7 Luz y color

- **ShotVL** cubre tipo y condición de luz en palabras (§3.2). Es la opción práctica.
- Paleta y temperatura de color: no necesita un modelo; k-means sobre fotogramas con OpenCV.
- **LuxDiT** (NVIDIA) [A27] estima un mapa de entorno HDR, pero es **NVIDIA OneWay Noncommercial** y excesivo para escribir un prompt.
- **Intrinsic** (compphoto) [A28] separa sombreado y albedo; licencia sin identificar.

### 3.8 Audio y texto

- **beat_this** [A8] — MIT, detección de pulsos y compases. Cruzado con los cortes de PySceneDetect dice si la referencia corta en el beat.
- **WhisperX** [A9] — BSD-2, transcripción con tiempos por palabra (ya se evaluó faster-whisper en `Society_voces_y_subtitulos.md`).
- **Demucs** [A29] — MIT, separa voz y música antes de analizar; sin actividad desde abril de 2024.
- **PaddleOCR** [A10] — Apache-2.0, rótulos en pantalla con posición.

## 4 Qué no se ha encontrado

- **No existe un repo único «vídeo → ficha completa de plano»** con licencia comercial. Hay proyectos «video-to-prompt» en GitHub, pero son envoltorios de un VLM genérico que miran fotogramas, que es lo que se quiere evitar. La orquestación es trabajo propio y es una buena aportación para el TFG.
- **SLU-SUITE / UniShot** (marzo 2026) [A30] cubre 33 tareas de lenguaje de plano y afirma superar a VLM comerciales en un 22 %, pero no se ha localizado código ni pesos.

## 5 Requisitos y riesgos

- **GPU NVIDIA con CUDA** para ViPE, SAM 3, ShotVL-7B y Depth Anything 3. PySceneDetect, PaddleOCR y beat_this corren en CPU. VRAM necesaria por modelo **sin medir**: hay que probarlo en la máquina real.
- Un reel de 15 s son pocos cientos de fotogramas: el coste por análisis es bajo, pero cargar 6 modelos en una GPU obliga a ejecutarlos en secuencia.
- Las precisiones citadas son de los propios autores en sus benchmarks, no con vídeos de hostelería.

## 6 Preguntas abiertas

1. ¿Qué GPU hay disponible para las pruebas (local o alquilada)? Condiciona si ShotVL-7B y ViPE caben a la vez.
2. ¿Se escribe a los autores de CameraBench para aclarar la licencia «other» de los pesos?
3. ¿Merece la pena pedir licencia comercial de GVHMR (y SMPL), o basta con SAM 3 + flujo óptico para las personas?
4. ¿Dónde vive el analizador: como skill de OpenMontage (uso de agencia) o como módulo de Society? La respuesta cambia qué licencias importan.
5. Validar con un reel ya aprobado (el del chuletón): ¿la ficha generada describe lo que Víctor ve?

## 7 Fuentes

Consultadas el 17/09/2026. Licencias y fechas de actividad comprobadas vía API de GitHub y Hugging Face (fuente oficial). Precisiones: declaradas por los autores.

- [A1] GVHMR — https://github.com/zju3dv/GVHMR (fichero LICENSE)
- [A2] PySceneDetect — https://github.com/Breakthrough/PySceneDetect
- [A3] ViPE — https://github.com/nv-tlabs/vipe (README, sección License)
- [A4] ShotBench / ShotVL — https://github.com/Vchitect/ShotBench · https://huggingface.co/Vchitect/ShotVL-7B
- [A5] Depth Anything 3 — https://github.com/ByteDance-Seed/Depth-Anything-3 · fichas `depth-anything/DA3-*` en Hugging Face
- [A6] SAM 3 — https://github.com/facebookresearch/sam3 (SAM License, 19/11/2025)
- [A7] SEA-RAFT — https://github.com/princeton-vl/SEA-RAFT
- [A8] beat_this — https://github.com/CPJKU/beat_this
- [A9] WhisperX — https://github.com/m-bain/whisperX
- [A10] PaddleOCR — https://github.com/PaddlePaddle/PaddleOCR
- [A11] TransNetV2 — https://github.com/soCzech/TransNetV2
- [A12] MegaSaM — https://github.com/mega-sam/mega-sam
- [A13] MapAnything — https://github.com/facebookresearch/map-anything
- [A14] π³ — https://github.com/yyfz/Pi3
- [A15] CUT3R — https://github.com/CUT3R/CUT3R
- [A16] CameraBench — https://github.com/sy77777en/CameraBench · https://huggingface.co/chancharikm/qwen2.5-vl-7b-cam-motion
- [A17] Video Depth Anything — https://github.com/DepthAnything/Video-Depth-Anything
- [A18] SAM 2 — https://github.com/facebookresearch/sam2
- [A19] Grounded-SAM-2 — https://github.com/IDEA-Research/Grounded-SAM-2
- [A20] SAM 3D Objects — https://github.com/facebookresearch/sam-3d-objects
- [A21] CoTracker — https://github.com/facebookresearch/co-tracker
- [A22] SpatialTrackerV2 — https://github.com/henry123-boy/SpaTrackerV2
- [A23] WHAM — https://github.com/yohanshin/WHAM
- [A24] TRAM — https://github.com/yufu-wang/tram
- [A25] PromptHMR — https://github.com/yufu-wang/PromptHMR
- [A26] SAM 3D Body — https://github.com/facebookresearch/sam-3d-body
- [A27] LuxDiT — https://github.com/nv-tlabs/LuxDiT
- [A28] Intrinsic — https://github.com/compphoto/Intrinsic
- [A29] Demucs — https://github.com/facebookresearch/demucs
- [A30] Liu et al., *Seeking Universal Shot Language Understanding Solutions*, arXiv:2603.18448
