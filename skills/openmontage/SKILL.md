---
name: openmontage
description: 'Montaje y retención de reels de hostelería: cómo usar OpenMontage (herramienta local AGPL-3.0: Rule Zero, pipelines cinematic/hybrid/documentary, puertas, Remotion/HyperFrames, plantilla frente a atelier) y cómo montar para que se vea entero y se reenvíe. Transiciones (clásicas, dentro del clip generado y las medidas con cliente), gancho y ritmo (escalera, regla de Murch, tempo), el techo medido del montaje con Virality Predictor, tipografía premium validada, zonas seguras de Reels, subtítulos, loudness, checklist antislideshow, revisión con ffmpeg, Remotion para el worker de Society y análisis de reels de referencia. Actívala al montar o revisar un reel, elegir transiciones, rótulos, subtítulos o música, analizar una referencia, o si un vídeo aburre o parece un pase de diapositivas, o se menciona OpenMontage, Remotion, retención o gancho. Prompts: directoria; modelo: higgsfield; ángulos: director.'
license: 'Contenido propio + adaptaciones de fuentes MIT y CC BY 4.0 (ver "Fuentes")'
metadata:
  author: victor-society
  version: "2.1.0"
---

# OpenMontage y montaje que retiene

> **Regla cero, obligatoria antes de cualquier otra:** todo lo que se produzca tiene que parecer rodado, no generado. Lee y aplica [`../README.md`](../README.md) (firma de rodaje real: material real primero, plano de foco con nombre, luz con fuente, cámara y física con peso, un verbo de manos por plano, corte seco, sonido obligatorio y revisión con `medir_realismo.py`). Detalle: `directoria/references/hosteleria/08-firma-de-rodaje-real.md`.

Esta skill toma los clips aprobados y los convierte en una pieza que **se ve entera y se reenvía**, que es lo que premia Instagram. También documenta OpenMontage, la herramienta de montaje por agentes que usa la agencia (AGPL-3.0: uso interno, **no se integra en Society**; el producto monta con Remotion propio).

> **Lo que manda, medido:** en un reel de comida, un corte plano sin editar puntuó en Virality Predictor lo mismo que un montaje completo (40/38). El montaje sube la activación visual (+16 % en t=0) y baja la divagación, pero **el techo lo pone el material y el mensaje**: acción real en el fotograma 1, más elementos en el encuadre, una cara, un motivo para reenviar. Montar bien es obligatorio; esperar que el montaje salve un material plano es un error.

## Reglas que no se negocian

1. **Fotograma 1 con acción ya empezada y rótulo desde el principio.** Nada de logo ni intro. El gancho abre **en plano ancho**, con información (+10 % de activación medida frente al plano cerrado). → `references/03` §2–3
2. **En comida, corte seco.** Nada de desenfoque, destello ni zoom de transición entre planos de acción (medido 25/09/2026: firma de montaje automático). Como mucho un *whip* que nace del gesto. → `references/02`, `directoria/references/hosteleria/08` §8
3. **Ritmo escalonado, no picadora:** largo → más corto → más corto → pausa → impacto. Cada corte sirve primero a la emoción y a la historia (Murch). → `references/03` §4
4. **Ningún plano quieto, y el movimiento nace en el plano:** cámara en mano o gimbal con microtemblor en los planos de proceso (bloque CAPTURE de `directoria/references/hosteleria/08`). El empuje digital en montaje sobre un clip quieto se lee como plantilla [MEDIDO 25/09/2026]: solo como recurso de rescate. Los recorridos macro sobre comida blanda siguen prohibidos. → `references/02` §5
5. **Nunca slideshow:** ninguna racha de 3 cortes con el mismo tamaño de plano y el mismo movimiento; se rompe el patrón al menos cada 4 cortes. → `references/05`
6. **Todo dentro de la zona segura de Reels**; nada en los 310 px de abajo. → `references/04` §1
7. **Tipografía que resta:** peso Regular, tamaño contenido, *tracking* amplio, sin contorno (estándar validado por el cliente de referencia). → `references/04` §2
8. **Subtítulos con tiempos medidos**, nunca repartidos por longitud de palabra. SRT siempre. → `references/04` §4
9. **Entrega:** 1080×1920, sin bandas, −14 LUFS / −1 dBTP, H.264 de 8–15 Mbps, sin marcas de agua. → `references/05` §5
10. **Sin sonido no se entrega:** música con pulso + un efecto por acción + ambiente. El corte cae en el golpe. → `references/04` §6, `directoria/references/hosteleria/08` §9
11. **Grade y grano comunes** a toda la pieza en montaje (negros 0–3, brillos 225–245, grano fino), nunca pedidos en el prompt. → `directoria/references/hosteleria/08` §10
12. **Revisión automática de firma de rodaje** antes de entregar: `python3 scripts/medir_realismo.py reel.mp4 [referencia.mp4]`. → `references/05` §5
13. **Máximo 2 iteraciones de Virality Predictor** por reel de comida; después, las palancas están en el material. → `references/03` §5

## Flujo de montaje

### 1 · Recibir el paquete de `director`
Lista de planos con función narrativa, duraciones y rótulos; clips aprobados en la puerta B de `directoria`; metraje real; voz y música si las hay.

### 2 · Elegir la ruta
- **Producto Society:** Remotion con props JSON versionados → `references/06`.
- **Agencia con OpenMontage:** pipeline `cinematic` si hay reel de referencia; `hybrid` si manda el metraje real. Rule Zero, puertas humanas y restricciones de Society → `references/01`.
- **Cliente que trabaja en After Effects:** skill `after-effects-reels` (clips + EDL + SRT + voz).

### 3 · Primer corte → **PUERTA D**
Orden por datos (el plano con más activación visual o más elementos abre), duraciones según la escalera de ritmo, un plano héroe más largo, transiciones del vocabulario elegido.

### 4 · Capas
Grade por plano (no global; comprobando que la comida no se calienta), rótulos en zona segura con contraste comprobado en todo el tramo, subtítulos, voz, música con ducking, efectos 10–20 ms antes del corte.

### 5 · Revisión → **PUERTA E**
Checklist antislideshow, revisión técnica con ffmpeg, fotogramas de apertura, revelación y cierre, filtro "¿lo reconocería un cliente que entra en el local?", Virality Predictor como puerta auxiliar (leyendo `values_by_frame`, no el titular).

### 6 · Publicar y medir
Se mide la retención a 3 s y los reenvíos a las 6 h y a las 48–72 h (skill `marketing-hosteleria`). Los aprendizajes se **proponen**; no se escriben directamente en las reglas del cliente.

## Si hay un reel de referencia

Análisis en 5 aspectos por plano (con N/A explícitos), clasificación de movimiento real frente a foto animada, auditoría de capacidades, 2–3 propuestas **diferenciadas** con coste, y muestra de 10–15 s antes de la pieza completa → `references/07`.

## Mapa de referencias

| Archivo | Cuándo leerlo |
|---|---|
| [`references/01-sistema-openmontage.md`](references/01-sistema-openmontage.md) | Usar OpenMontage: capas, Rule Zero, pipelines, puertas, motores, plantilla o atelier, presupuesto, restricciones de Society |
| [`references/02-transiciones.md`](references/02-transiciones.md) | Elegir la transición entre dos planos o dentro de un clip generado; implementarla en Remotion |
| [`references/03-ritmo-y-gancho.md`](references/03-ritmo-y-gancho.md) | Diseñar el gancho, el ritmo y la duración; entender el techo medido del montaje |
| [`references/04-texto-subtitulos-y-audio.md`](references/04-texto-subtitulos-y-audio.md) | Rótulos, zona segura, subtítulos, voz, música y loudness |
| [`references/05-antislideshow-y-revision.md`](references/05-antislideshow-y-revision.md) | Revisión final: riesgo de slideshow, monotonía, ffmpeg, grade, Virality Predictor |
| [`references/06-remotion-para-society.md`](references/06-remotion-para-society.md) | Montar en Remotion: licencia, secuencias, vídeo, audio, transiciones, subtítulos, props versionados |
| [`references/07-analisis-de-referencia.md`](references/07-analisis-de-referencia.md) | Cuando alguien trae un reel y dice "algo así" |

## Fuentes

- **OpenMontage** (repo local, commit `08e2151`, 05/09/2026): `AGENT_GUIDE.md`, `skills/creative/*` (short-form, long-form, storytelling, video-stitching, animation-pipeline, typography, sound-design, broll-planning), `skills/meta/*` (video-reference-analyst, reviewer, bespoke-composition, checkpoint-protocol), `skills/pipelines/{cinematic,hybrid,documentary-montage}/*`, `lib/slideshow_risk.py`, `lib/variation_checker.py`, `remotion-composer/SCENE_TYPES.md`, `config.yaml`. AGPL-3.0.
- **Mediciones propias:** montaje en After Effects y 5 análisis de Virality Predictor (08/09/2026, skill `after-effects-reels`); análisis de Instagram de 90 días de Torre de Vega (08/09/2026); prompt de producción `prompts/openmontage-reel-torre-de-vega.md`.
- **Instagram oficial:** `about.instagram.com`, "Instagram Ranking Explained" (31/05/2023).
- **`remotion-dev/skills`** (commit `41b22ee`, 24/09/2026): transitions, timing, sequencing, video-editing, audio, sfx, light-leaks, captions. Licencia de Remotion: `LICENSE.md` del repo oficial.
- **`smixs/visual-skills`** (CC BY 4.0, Serge Shima): regla de Murch, escalera de ritmo, vocabulario de transiciones de Seedance 2.5, arcos narrativos.
- **`OSideMedia/higgsfield-ai-prompt-skill`** (MIT): auditoría de monotonía, presupuesto de tempo, encadenado por fotograma.
- **`pixelab-ch/higgsfield-skills`** (MIT): `11-social-hook/hook-craft` (estructura del gancho, tipos de gancho, estrategia de audio y texto).
