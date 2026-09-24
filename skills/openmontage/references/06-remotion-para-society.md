# 06 · Remotion para Society

Remotion es el motor de montaje del producto Society (worker de montaje; sustituye a After Effects desde el 17/09/2026, informe 05 de automatización). Resumen operativo de la skill oficial `remotion-dev/skills` (commit `41b22ee`, 24/09/2026) [OFICIAL] y del compositor de OpenMontage. **Recordatorio del TFG:** el código de la aplicación lo escribe Víctor; esto es referencia técnica.

## Índice

1. Licencia
2. Estructura de un reel en Remotion
3. Secuencias y tiempos
4. Vídeo y audio
5. Transiciones y overlays
6. Subtítulos
7. Compositor de OpenMontage: tipos de escena
8. Props versionados y reproducibilidad

---

## 1. Licencia [OFICIAL, `LICENSE.md` del repo de Remotion]

Gratis para personas individuales, **organizaciones con ánimo de lucro de hasta 3 empleados**, organizaciones sin ánimo de lucro y para evaluación, con uso comercial incluido. Por encima de 3 empleados hace falta *Company License* (`remotion.pro/license`). **Pendiente de verificar:** si el renderizado como servicio para terceros (el caso de Society) tiene condiciones propias en `remotion.pro`.

## 2. Estructura de un reel en Remotion

- **Composición:** 1080×1920, 30 fps (o 24 si el material es de 24), duración en fotogramas = suma de planos − solapes de transición.
- **Capas, de abajo arriba:** clips de vídeo → grade por plano → overlays (rótulos, filete, logo) → subtítulos → audio (voz, música, efectos).
- **Todo dentro de la zona segura de Reels** (→ [`04-texto-subtitulos-y-audio.md`](04-texto-subtitulos-y-audio.md) §1).

## 3. Secuencias y tiempos

- `<Sequence from={f} durationInFrames={n}>` retrasa y limita un elemento. Dentro, `useCurrentFrame()` es **local** (empieza en 0). `layout="none"` evita el `AbsoluteFill` envolvente.
- **Premontar siempre:** `premountFor={1 * fps}`.
- `<Series>` para elementos seguidos sin solape; `offset` negativo para solapar.
- **Animación:** `interpolate(frame, [0, 0.3 * fps], [0, 1], {extrapolateLeft:"clamp", extrapolateRight:"clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)})`. Resorte sin rebote: `Easing.spring({damping:200})`.
- **Escala:** `output: 'perceptual-scale'` en las animaciones de escala (una escala lineal parece más pequeña cuanto mayor es).
- Varios fotogramas clave con un array de easings de *n − 1* elementos. `posterize: 3` para bajar la cadencia a propósito.
- **Editable en Studio:** `interpolate()` directamente en `style`, con propiedades de transformación individuales (`scale`, `translate`, `rotate`) en lugar de cadenas `transform`.

## 4. Vídeo y audio

- `<Video>` y `<Audio>` de `@remotion/media` (`npx remotion add @remotion/media`).
- **Recorte:** `trimBefore` y `trimAfter` **en fotogramas** (`2 * fps` = saltar 2 s). ⚠️ La página oficial de vídeo dice "en segundos", pero sus propios ejemplos usan `2 * fps`: son fotogramas.
- **Montaje con clips independientes:** cada `<Video>` como nodo JSX propio, con `from`, `durationInFrames` y `trimBefore` **escritos a mano, no calculados ni generados con `.map()`** (para que se puedan editar en Studio).
- **Montaje en cascada (ripple):** `<TransitionSeries>` con un `<TransitionSeries.Sequence>` por clip, sin `from` (lo calcula la serie). Cambiar la duración de uno desplaza a todos los siguientes.
- **Audio:** `volume` fijo (0–1) o función de fotograma para fundidos y ducking, `muted` dinámico, `playbackRate`, `loop` con `loopVolumeCurveBehavior`. `toneFrequency` (tono) solo funciona en render de servidor.

## 5. Transiciones y overlays

- `<TransitionSeries.Transition presentation={fade() | slide({direction}) | wipe() | flip() | clockWipe()} timing={linearTiming({durationInFrames}) | springTiming({config:{damping:200}})}>`.
- **Las transiciones acortan la duración total:** 60 + 60 − 15 = 105. Para calcularlo: `timing.getDurationInFrames({fps})`.
- **Overlays** (`<TransitionSeries.Overlay durationInFrames offset>`): efecto encima del corte **sin** acortar. No pueden ir pegados a una transición ni a otro overlay.
- *Light leak*: `@remotion/effects/light-leak`, Remotion ≥ 4.0.500, WebGL2 (`Config.setChromiumOpenGlRenderer("angle")`). Por defecto es naranja: `hueShift` o moderación en comida.
- Qué transiciones usar y cuándo → [`02-transiciones.md`](02-transiciones.md).

## 6. Subtítulos

- `@remotion/captions`: `parseSrt({input})` para importar SRT, `createTikTokStyleCaptions({captions, combineTokensWithinMilliseconds})` para páginas con palabra resaltada.
- Carga asíncrona con `useDelayRender()` (`delayRender` → `continueRender` o `cancelRender`) para que el render espere al JSON.
- Un JSON de subtítulos por vídeo, junto al contenido; los subtítulos en un componente aparte.
- Especificaciones de tamaño, líneas y tiempos → [`04-texto-subtitulos-y-audio.md`](04-texto-subtitulos-y-audio.md) §4.

## 7. Compositor de OpenMontage: tipos de escena

`remotion-composer/SCENE_TYPES.md` (modo plantilla, → [`01-sistema-openmontage.md`](01-sistema-openmontage.md) §7):

| `type` | Uso |
|---|---|
| (ninguno) vídeo | `OffthreadVideo` con `source`, `source_in_seconds`, `in_seconds`/`out_seconds` y `animation` (zoom-in, ken-burns) |
| (ninguno) imagen | Imagen fija con Ken Burns |
| `text_card`, `hero_title` | Tipografía grande, título o cierre |
| `stat_card`, `callout`, `comparison` | Cifra, caja de mensaje (info, warning, tip, quote), comparación |
| `bar_chart`, `line_chart`, `pie_chart`, `kpi_grid`, `progress_bar` | Gráficos animados |
| `anime_scene`, `terminal_scene`, `screenshot_scene` | Anime, terminal sintético, interfaz sintética |
| Overlays: `section_title`, `stat_reveal`, `hero_title`, `provider_chip` | Capas encima del plano |

Para un reel de restaurante sirven los de vídeo e imagen, `hero_title` y los overlays de rótulo. Los gráficos solo tienen sentido en la cuenta propia de Society (contenido para hosteleros). **Más del 60 % de tarjetas de texto = riesgo de slideshow** (→ `05` §2).

## 8. Props versionados y reproducibilidad

Diseño propuesto en el TFG (informe 05, §8, "linaje del activo y props de Remotion"):

- Cada render sale de un **JSON de props versionado**: clips con su `job_id` de origen, recortes, textos, fuentes, grade por plano, audio y subtítulos.
- Repetir el render con los mismos props produce la misma pieza. Cambiar un plano es cambiar una línea del JSON, no volver a montar.
- El JSON guarda el **linaje**: de qué keyframe, de qué generación y de qué foto real sale cada plano (para auditar la regla "nada inventado").
- Es el mismo patrón que usa OpenMontage (`props_asador.json` en `remotion-composer/`).
