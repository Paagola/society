# Efecto bullet (bullet time) — qué hay realmente en Higgsfield vía MCP

**Fecha:** 2026-09-09 · **Saldo comprobado:** 739,28 créditos, plan **plus**
**Todos los costes de este informe salen de `get_cost: true`** (no consume créditos) el 2026-09-09.

---

## 0. Qué es el efecto y en qué dos piezas se descompone

El "efecto bullet" (bullet time, *Matrix*) son **dos cosas independientes** que solemos confundir:

| Pieza | Qué es | Quién la puede hacer |
|---|---|---|
| **A. Congelación temporal** | La acción se detiene o baja a cámara ultralenta (speed ramp: velocidad normal → freeze → normal) | After Effects (gratis) o `speedramp` de Cinema Studio v2 |
| **B. Recorrido orbital** | La cámara viaja alrededor del sujeto congelado, revelando paralaje | Modelo de vídeo (macro-movimiento) o simulación 2.5D en AE |

Esto importa porque **la pieza A no cuesta nada y no tiene riesgo**, y **la pieza B es la que
choca de frente con las reglas del cliente**. Cualquier plan que las trate como un bloque único
paga de más y arriesga de más.

---

## 1. Inventario verificado de herramientas (lo que hay y lo que NO hay)

### 1.1 Lo que NO existe por MCP — comprobado, no supuesto

- **La librería clásica de camera-motions de Higgsfield ("Bullet Time", "Robo Arm", "Crash Zoom",
  "360 Orbit"…) NO está expuesta.** `presets_show` devuelve únicamente *chain presets* virales
  (EARTH ZOOM, ORBIT 360, ICE STATUE…) y *superhero presets*. No hay parámetro `motions`
  en ningún modelo del catálogo.
- `apps_search` con query `bullet` → **0 resultados**. No hay app de marketplace para esto.
- `get_cost` **no está soportado para `higgsfield_preset`** (error literal del backend:
  *"Cost preflight (get_cost) is not yet supported for Higgsfield presets"*). Cualquier preset se
  lanza a ciegas de coste.

### 1.2 Presets que hacen literalmente bullet time (modelo `higgsfield_preset`)

| Preset | id | Qué hace | Sirve para Torre de Vega |
|---|---|---|---|
| **ORBIT 360** | `b31e4af9-b886-4582-a809-c44caf975d61` | Órbita completa de 360° alrededor del sujeto **mientras este permanece congelado en su pose**. Es bullet time de manual. | ❌ Está construido para **personas** desde un selfie. Sin prompt, sin control de resolución ni duración, sin preflight de coste. |
| **Still world** | `732ba983-3477-4814-8eb5-36bd79aea849` | Congelación del mundo (superhero preset) | ❌ Mismas limitaciones + estética superhéroe |
| FLOAT SPIN | `14077244-7c39-4710-9aa9-e6b92678368d` | El sujeto levita y gira 360° sobre su eje | ❌ Fantasía, rompe regla 1 |
| ACTION FIGURE / CGI BREAKDOWN | `0c99a74f…` / `6372c588…` | Turntable de producto | ❌ Look CGI declarado |

**Limitación estructural del modelo `higgsfield_preset`:** acepta **1 sola imagen**, `preset_id`
obligatorio, **ningún parámetro de resolución**. No cumple el mínimo de 1080p verificable, así que
por el criterio del cliente ("la calidad mínima es 1080, no 720") **no es apto para entrega**.
Como prueba exploratoria sí vale.

### 1.3 Modelos con los que se puede *construir* el efecto

| Modelo | Coste medido (9:16) | Resolución | Por qué entra en la lista |
|---|---|---|---|
| **`kling2_6`** | **5,00 cr** / 5 s, sin audio | 1080p verificado en el proyecto | Físicas y movimiento de cámara cinematográfico. Es el **caso 2 de la skill** (movimiento fluido de cámara). Mejor ratio: 1,00 cr/s |
| **`kling3_0` `pro`** | **8,75 cr** / 5 s, sin audio | 1076×1924 (medido) | Etiqueta `motion-transfer`. Configuración de resolución verificada del proyecto |
| `kling3_0` `4k` | sonda con timeout (18 cr / 3 s según tabla del proyecto) | 4K | Solo para el plano que sostiene el Reel |
| **`cinematic_studio_video_v2`** | **7,50 cr** / 5 s (igual en `std` y `pro`) | ⚠️ **sin parámetro de resolución** | **Único modelo con `speedramp`**: `slowmo`, `speedup`, `impact`, `linear`. Es la pieza A del efecto. Riesgo: resolución no verificable |
| `cinematic_studio_3_0` | 50 cr / 5 s a 1080p | 1080p / 4K explícitos | Máxima calidad de la casa. Caro para un solo plano |
| **`hf_mult_motion_control`** (Genjutsu) | preflight imposible sin vídeo (422) | hasta **1080p** | **Transfiere el movimiento de un vídeo real** a nuestras imágenes. La vía más fiel a "nada inventado" |
| `seedance_2_0` | 45 cr / 5 s a 1080p `std` | 1080p / 4K | Acepta `video_references`. Caro |
| `minimax_h3` | 10 cr / 5 s | **2K fijo** | Acepta `video_references` + keyframes. Buen precio para 2K |
| `veo3_1` preview `high` | 29 cr / 4 s | sin control explícito | Realismo alto, coste alto |
| `veo3` preview | 58 cr | — | Descartado por coste |
| `seedance1_5` | 12 cr / 4 s a 1080p | 1080p | Alternativa sólida y barata |

---

## 2. El choque con las reglas del cliente — hay que decirlo antes de proponer nada

El bullet time **es macro-movimiento de cámara por definición**. Y el proyecto tiene medido que:

> *"El macro sí recorre la escena, y ahí es donde el modelo reinventa la comida."*
> — skill `after-effects-reels` §5bis, negativos obligatorios: `no camera pan, no dolly, **no orbit**,
> no zoom, no rotation`

Y la regla 9 de `reglas_videos.md` solo autoriza **"orbit corto — la cámara gira unos grados
alrededor del plato, no un giro completo"**.

Traducción operativa, sin rodeos:

1. **Una órbita de 360° sobre un plato de comida va a morphear.** No es una probabilidad, es el
   fallo documentado del proyecto. El plato cambia de forma a mitad de recorrido.
2. **La excepción es el sujeto rígido.** La evidencia propia del proyecto: *"el único clip con
   movimiento de cámara que salió bien fue el de la sala, y salió bien porque era arquitectura
   rígida"*. Una **botella de vino, una tabla de madera, una mesa puesta, la fachada, la bodega**
   aguantan un arco. Un chuletón cortado y unas patatas, no.
3. **Si el plano lleva fuego o brasa, no se genera** (regla 22). Un bullet time sobre la parrilla
   solo se puede hacer con metraje real del cliente.

---

## 3. Las cuatro rutas, ordenadas por lo que yo recomendaría

### Ruta A — Bullet time simulado en After Effects · **0 créditos** · recomendada para empezar

Se construye entero en AE por MCP, sobre **una foto real o un fotograma del vídeo del cliente**:

1. **Pieza A (tiempo):** freeze frame + time remap con rampa (velocidad normal → congelado →
   normal). Si el material es vídeo real del cliente, esto ya es el 70 % del efecto.
2. **Pieza B (paralaje):** recorte del sujeto en capa propia + fondo separado, arco de posición y
   escala en 3D de ~20–30° con desenfoque de fondo animado. Da paralaje real, no un zoom plano.

**A favor:** cero créditos, 1080p garantizado, **cero riesgo de morphing**, funciona con material
real (regla 1 intacta), repetible sin coste hasta que quede bien.
**En contra:** no da una órbita de 360°, tope realista ~30°. Requiere que el sujeto se pueda
recortar limpio del fondo.

### Ruta B — Arco real generado, corto, sobre sujeto rígido · **5,00–8,75 créditos**

```json
{ "model": "kling2_6", "duration": 5, "sound": false, "aspect_ratio": "9:16" }
```

Solo para **botella, copa servida, tabla, mesa puesta, sala o fachada**. Nunca sobre carne, guiso
o cualquier textura orgánica. Arco de 30–45° máximo, velocidad constante, aparato nombrado en el
prompt (§4).

**A favor:** paralaje auténtico, 5 s para elegir el mejor tramo, 1,00 cr/s.
**En contra:** el arco es el movimiento que más morphing produce; hay que contar con 2 intentos.

### Ruta C — Genjutsu: transferir el movimiento de un bullet time real · 1080p

```json
{ "model": "hf_mult_motion_control", "resolution": "1080p",
  "medias": [ {"role":"video_references","value":"<clip driver>"},
              {"role":"image_references","value":"<nuestra imagen>"} ] }
```

Si el cliente aporta (o descargamos como plantilla) un clip real con la órbita ya hecha, el modelo
copia **ese** recorrido en vez de inventárselo. Es la vía más alineada con la regla 10 (la plantilla
manda en ángulo y recorrido).
**Bloqueo:** el coste no se puede preflightar sin el vídeo cargado — hay que subir el driver primero.

### Ruta D — Preset ORBIT 360 · coste desconocido · **no apta para entrega**

Solo tiene sentido como **prueba de concepto de 1 tiro** para enseñar el efecto al cliente. No
cumple 1080p verificable, no acepta prompt y no permite preflight de coste. Si se lanza, se lanza
sabiendo eso.

### Complemento transversal — la rampa de velocidad

`cinematic_studio_video_v2` con `speedramp: "impact"` (o `"slowmo"`) por **7,50 cr / 5 s** es el
único modelo que expone la congelación temporal como parámetro. Su punto débil es que **no tiene
control de resolución**, así que lo propondría solo si el AE no basta para la rampa — y el AE
normalmente basta y es gratis.

---

## 4. Prompt de arco (Ruta B) — estructura obligatoria de `prompt-video-motion.md`

```text
PRESERVE EXACTLY FROM THE START IMAGE:
- The dish, the plate, the glass and every piece of food — identical shape, count and position
  throughout. The food remains the same food; it never shifts, morphs or changes shape.
- Table, tablecloth, cutlery and background of the dining room — unchanged.
- Framing and composition — the subject stays centred, it never drifts out of frame.

MOTION (BEATS):
- 0-2s: the camera begins its arc already in motion, travelling to camera-left around the subject.
- 2-4s: the arc continues at exactly the same speed, revealing the far side of the [bottle/board].
- 4-5s: still moving on the last frame, no deceleration, no settle.

CAMERA:
- A single continuous arc on a motorised curved slider with a geared head, like a professional food
  videographer. Roughly thirty degrees of travel across the whole clip, radius unchanged, the lens
  always pointed at the subject. Slow, constant speed, already moving on the first frame and still
  moving on the last. Perfectly mechanical and stabilised: no handheld operation, no shake, no
  jitter, no wobble, no vibration, no floaty drift.

FILM GRADE:
- One dramatic, hard, slightly warm key light, deep near-black shadows, heavy contrast, warm
  cinematic grade around 3000-3300K, visible fine film grain. Keep the exact grade and colour of the
  start image. No digital sharpening, no AI smoothing, no flat daylight look.

NEGATIVE: no handheld camera, no shake, no full 360 rotation, no zoom punch, no dolly push,
no morphing food, no changing plate contents, no extra hands, no text overlay.

Shot on a full-frame cinema camera, 50mm, f/2.8, photographic realism, no text.
```

> *Corregido el 2026-09-14: el FILM GRADE y la coda estaban escritos con el acabado de iPhone, que la
> regla 17 sustituyó el 2026-09-10 por el editorial dramático.*

Las cuatro claves de la fórmula que funcionó siguen aplicando: **nombrar el aparato** (slider curvo
motorizado, cabezal engranado), **cuantificar el recorrido** (treinta grados), **exigir velocidad
constante** de principio a fin, y **prohibir el handheld por su nombre** en el negative.

---

## 5. Qué necesito del cliente para seguir

1. **Sobre qué sujeto va el bullet.** Cambia la ruta entera: botella/tabla/sala → Ruta B viable;
   plato de comida → solo Ruta A; parrilla con fuego → solo metraje real (regla 22).
2. **¿Hay metraje real del cliente con ese sujeto?** Si lo hay, la Ruta A sube a primera opción y
   el coste es cero.
3. **¿Se acepta un arco de ~30° en vez de una órbita de 360°?** La órbita completa sobre comida no
   se puede entregar con la calidad que exige el proyecto.
4. **Autorización de gasto** si vamos a Ruta B (5–9 cr por intento, contar 2 intentos) o Ruta C.

## 6. Bloqueos

- `get_cost` no funciona con `higgsfield_preset` → el coste de ORBIT 360 solo se sabe lanzándolo.
- `hf_mult_motion_control` no admite preflight sin el vídeo driver ya subido (error 422 verificado).
- `cinematic_studio_video_v2` no expone resolución → no se puede garantizar el mínimo de 1080p sin
  medir un render real.
- La sonda de coste de `kling3_0` en modo `4k` dio **timeout**; el dato de 18 cr / 3 s viene de la
  tabla de `documentación.md`, no de una medición de hoy.
