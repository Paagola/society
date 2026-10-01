# Hook de entrada de «Tu agencia con IA» · plan de plano (28/09/2026)

Sigue `director-reels`, `hooks-society` y `directoria` (regla cero, `08-firma-de-rodaje-real.md`). Hay una sola generación multitoma de Seedance 2.5 a 720p y solo la toma aprobada se reescala con ByteDance pro a 2K y 60 fps (R-RES-02).

## Inventario de verdad

| Ancla | Ruta | Uso |
|---|---|---|
| Mesa real de Da Tonino: pizza prosciutto e rucola en plato oscuro, caña a la izquierda, segunda pizza y copa de vino al fondo, servilleta blanca, tenedor, mesa de madera clara | `promo/public/caso/real-pizza.jpg` (680 × 510, apaisada) | Único mundo del plano. **No se gira:** se reescala (ByteDance, 2K) y se expande a 9:16 con outpaint, para conservar los píxeles reales |
| Persona que come | No hay foto real | Solo se ve la mano con el móvil; sin cara y sin joyas nuevas |

## Gancho (hooks-society)

**VH01 · El plato aterriza** (contacto y asentamiento). Encaja con la historia: el momento en que llega la pizza es justo cuando la gente saca el móvil. Se entiende sin rótulo: el plato cae a la mesa, suena y enseguida sube un móvil.

- Descartados:
  - **VH03 (rúcula que cae):** fue la apertura del reel de Da Tonino y no se repite.
  - **VH02 (porción):** la foto real no documenta porción separada.

## Tomas (multitoma, 5 s, corte seco)

| # | Tramo | Primer fotograma | Una acción | Estado final | Cámara | Foco |
|---|---|---|---|---|---|---|
| 1 | 0–1,4 s | K1: la misma mesa, con el plato de la pizza a pocos cm de la mesa, bajado por la mano de un camarero que entra por la derecha | La mano termina de bajar el plato, lo apoya con un golpe seco y se retira | Plato apoyado donde está en la foto real; la comida no cambia | Slider lateral corto que acompaña la bajada y frena en el contacto | Borde delantero del plato |
| 2 | 1,4–5 s | K2: la mesa real desde el sitio del comensal; su mano ya sube el móvil **en horizontal** y la pantalla enseña la pizza | La mano estabiliza el móvil, aparece el cuadro de enfoque, el pulgar toca el disparador (≈ 4,2 s) y la pantalla parpadea en blanco | La pantalla se queda con la foto hecha | Cámara en mano sobre rig pequeño, detrás del hombro, que sigue el móvil con microtemblor orgánico | Pantalla del móvil y pulgar; la pizza real detrás, algo suave |

La foto hecha es la foto real (apaisada, como la que hizo el móvil de verdad). Tras el destello, en Remotion sale del plano y vuela a la publicación de Instagram.

## Rechazar si

- **El plato:** levita, la comida se reordena al tocar la mesa o la mano cruza la vajilla.
- **La mesa:** aparecen objetos que no están en la foto real (otro vaso, velas, carta).
- **La mano:** tiene dedos de más, un anillo nuevo o se pega al móvil; el móvil se dobla o la pantalla enseña otra cosa.
- **El conjunto:** hay texto o logotipos, o la cámara se queda muerta.

## Coste (preflight)

- Reescalado de la foto: 2 cr. Outpaint a 9:16: 2 cr. Dos keyframes con Nano Banana Pro: 4 cr.
- Seedance 2.5, 5 s a 720p con audio: ver preflight.
- ByteDance pro a 2K y 60 fps: ver preflight.

## Resultado (28/09/2026)

| Paso | Trabajo | Servido | Coste | Estado |
|---|---|---|---|---|
| Reescalado de la foto real a 2K | `59d337b5` | bytedance_image_upscale, 2891 × 2160 | 2 cr | Usada (foto que vuela al post) |
| Outpaint 9:16 (`outpaint_image`) | `a552c02e` | outpaint | 2 cr | **Descartado**: duplicó la franja superior y dejó abajo un beis liso |
| Outpaint 9:16 (`flux_2_pro_outpaint`, +350 px arriba y abajo) | `5040e04a` | flux_2_pro_outpaint, 672 × 1200 | 1,32 cr | Usado como K0. Conserva la foto real en el centro, sin girar; el relleno añade al fondo otro comensal, una pizza y una caña **no documentados** |
| K1 · plato en el aire | `1032ccb0` | nano_banana_2 | 2 cr | Aprobado por error: la mano sujetaba la pizza por el borde |
| K2 · móvil en horizontal | `7c30cfa8` | nano_banana_2 | 2 cr | Aprobado |
| Multitoma Seedance 2.5, 720p, 5 s, audio | `a830218c` | seedance_2_5, 720 × 1280, 24 fps | 35 cr | **Plano 1 rechazado** (no se ve el aterrizaje, la mano toca la pizza dos veces y se ven las piernas bajo la mesa). **Plano 2 aprobado** |
| K1 bis · reintento del plano 1 | `1101a42f` | nano_banana_pro | 2 cr | Sin usar: Víctor decidió quedarse solo con el vídeo desde el segundo 3 |
| ByteDance pro, `aigc`, 2K y 60 fps | `0e9d1597` | bytedance_video_upscale, 1440 × 2560, 60 fps, 4,97 s | 4 cr | Usado |

**Total: 50,32 cr** (saldo de 355,57 → 305,22).

- **Tramo usado:** del corte (3,03 s del reescalado) al final. El parpadeo real del disparo cae a 4,6 s.
- **Revisión** (`revisar_clip.py`):
  - temblor de 2,7 px, que se lee como cámara en mano, como se pidió;
  - el primer fotograma se aparta de K1 (MAE 25,8).
- **Revisión** (`medir_realismo.py`, tramo usado):
  - bien: negros (p1 0) y blancos (p99 239), sin cámara quieta y sin transiciones de efecto;
  - a revisar: plano de 2,1 s (único plano de la apertura), foco del 39 % (móvil y manos nítidos) y audio RMS de 968, que refuerzan la música y los efectos del montaje.

**Aprendizaje:** la mano del keyframe manda. Si en el keyframe toca la comida, Seedance repite el gesto. K1 se tuvo que rechazar en la revisión de keyframes (regla «mano cruza vajilla»), no después del vídeo.
