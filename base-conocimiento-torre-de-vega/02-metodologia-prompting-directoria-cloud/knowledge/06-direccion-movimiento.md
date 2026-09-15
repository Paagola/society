# 06 · Dirección de Movimiento — la biblia del vídeo

> Este archivo es la biblia de **dirección de movimiento** para vídeo. Su tesis es una sola frase: **el cine es restraint**. Pasa muy poco, pero cada cosa que pasa es exacta. Si en tu plano "ocurren muchas cosas", casi seguro estás haciendo fantasía Marvel, no cine.
>
> Léelo junto a:
> - `03-modelos-video.md` — qué modelo de vídeo elegir y sus params exactos (Kling, Seedance, wan2_7).
> - `05-biblia-hiperrealismo.md` — el mismo principio anti-CGI aplicado a la imagen fija.
> - `04-consistencia-personaje.md` — mantener la cara entre el start-image y el vídeo.
> - `templates/prompt-video-motion.md` y `templates/talking-head-lipsync.md` — las plantillas copy-paste.
> - `10-bullet-time-y-secuencias-largas.md` y `11-fpv-camara-invisible-y-fuerza-compartida.md` — las dos excepciones deliberadas al "un solo beat", para piezas largas de un solo plano continuo (inspección multi-objeto / tormenta física de fuerza compartida).

---

## 0. Idioma: español para ti, inglés para el modelo

Toda la conversación contigo es en español. Pero **el motion prompt final que va al modelo se entrega en inglés**, igual que los prompts de imagen. Los modelos de vídeo (Kling, Seedance) se entrenaron mayoritariamente con descripciones en inglés: entienden mejor verbos de cámara ("slow dolly push-in", "rack focus"), términos de iluminación y la gramática de beats cuando vienen en inglés. Hablamos contigo en tu idioma; la entrega es en inglés. Por eso los dos ejemplos del final están en inglés.

---

## 1. El principio del RESTRAINT (esto es lo único que de verdad importa)

El error número uno del que empieza con vídeo IA es **pedir demasiado movimiento**. El instinto del marketing ("que sea épico, que tenga impacto, que pasen cosas") es exactamente lo que rompe el realismo. El generador, cuando le pides "mucho", improvisa: añade brillos, partículas, levitaciones, cámaras imposibles. Y eso lee como render de videojuego, no como un anuncio premium rodado.

La gramática que queremos imitar es la de **Glazer, Lanthimos, Tarkovsky**: planos donde durante 4-6 segundos casi no pasa nada visible, pero ese "casi nada" está perfectamente calibrado. Una respiración. Un parpadeo. Un push-in tan lento que no lo notas conscientemente pero sientes que el plano "respira hacia ti". Eso es lo que vende un anuncio caro.

**Regla de oro:** un clip de 4-6 s debe contener **UN solo beat principal de movimiento**, más opcionalmente un micro-movimiento de fondo (bruma, una respiración). No tres. No cinco. Uno.

| Instinto del principiante | Lo que de verdad hace cine |
|---|---|
| "Que la cámara vuele alrededor" | Dolly push-in del 3-4%, casi imperceptible |
| "Que explote en partículas doradas" | Una mota de polvo cruzando un haz de luz |
| "Que ella gire dramáticamente" | Un único giro de cabeza, deliberado, a un beat exacto |
| "Que todo cobre vida" | Una respiración. Un parpadeo. Nada más. |
| "Transición espectacular" | Los fluorescentes muriendo en secuencia, uno a uno |

---

## 2. Lista negra de gimmicks de fantasía (y por qué arruinan el plano)

Estos son los movimientos que el generador te ofrece "gratis" y que tienes que **prohibir activamente**. Todos comparten el mismo pecado: leen como VFX de superhéroes, no como algo capturado por una cámara real. Recuerda la biblia del hiperrealismo (`05-biblia-hiperrealismo.md`): si algo se ve "renderizado" en vez de "fotografiado", es un fallo.

| Gimmick prohibido | Por qué arruina el realismo |
|---|---|
| **Ojos que brillan / se iluminan** | No existe en ningún material rodado real. Grita "criatura mágica de CGI" al instante. |
| **Estallidos de chispas / "fairy dust" / partículas doradas** | Es el recurso por defecto de los renders baratos. Una cámara real no produce purpurina flotante. |
| **Objetos que levitan sin motivo** | Rompe la física que el ojo espera. El cerebro detecta el truco en medio segundo. |
| **Props que rotan solos** (el frasco girando en el aire) | Movimiento sin causa = irreal. Si algo se mueve, algo o alguien lo mueve. |
| **Cascadas / cortinas de luz "mágicas"** | Iluminación que desafía cómo se comporta la luz física. Lee como pantalla de carga de videojuego. |
| **Pelo / tela ondeando con viento que no existe** | Si no hay fuente de viento establecida, el ondeo delata el algoritmo. |
| **Morphing / la cara que "se transforma"** | Cualquier deformación facial entre frames mata la identidad y el realismo de golpe. |

**El porqué de fondo:** una cámara real está limitada por la física (peso, inercia, óptica, cómo cae la luz). Esas limitaciones son precisamente lo que tu ojo reconoce como "esto es real". Los gimmicks de fantasía violan esas limitaciones, y aunque cada frame individual sea fotorrealista, el *movimiento* delata que es sintético. **El realismo se gana o se pierde en el movimiento tanto como en el frame.**

> En el prompt, no basta con "no pedir" estos gimmicks: conviene **prohibirlos explícitamente** en un bloque de negativos, porque los modelos los añaden por defecto cuando el prompt es ambiguo. Ver la sección de negativos más abajo.

---

## 3. Catálogo de movimientos cinematográficos que SÍ funcionan

Esta es tu paleta. Elige **uno** por clip (más, como mucho, un micro-movimiento atmosférico de fondo).

### 3.1 Movimiento de cámara
- **Dolly / push-in lento del 3-4%** — la cámara se acerca tan despacio que no lo notas, pero el plano gana intimidad. El movimiento de cámara más cinematográfico que existe. En inglés: `very slow dolly push-in, approximately 3-4% over the shot, almost imperceptible`.
- **Pull-out lento equivalente** — revelar contexto despacio.
- **Rack focus** — el foco viaja de un plano a otro (de la cara al producto, p. ej.). Un solo cambio, deliberado.
- **Pan / tilt mínimo** — un grado o dos, motivado por seguir un gesto. Nunca un barrido amplio.

> Recuerda: **Kling** rinde mejor con cámara casi estática (micro-movimiento). Para cualquier movimiento de cámara real (dolly, parallax, tracking), usa **Seedance** — ver `03-modelos-video.md`.

### 3.2 Un gesto humano
- Un giro de cabeza, único y deliberado.
- Una mano que sube hacia el frasco (no que lo coge: que *empieza* a cogerlo).
- Una respiración visible (el pecho que sube y baja una vez).
- Un parpadeo. Literalmente un parpadeo bien puesto da vida sin romper nada.
- Una mirada que pasa de fuera de cuadro al objetivo.

### 3.3 Transiciones de iluminación (muy cinematográficas)
- **Fluorescentes muriendo en secuencia** — los tubos se apagan uno a uno, no todos a la vez. Crea tensión sin un solo efecto de fantasía.
- Una luz cálida que entra despacio por una ventana.
- El cambio sutil de temperatura de color (CCT) a lo largo del plano.

### 3.4 Sincronía multi-actor (la firma de Lanthimos)
- Varios actores que **giran la cabeza al mismo beat exacto**, con una precisión casi inquietante. Es uno de los recursos más potentes y más "de cine de autor". Requiere movimiento coordinado complejo → **Seedance**.

### 3.5 Atmósfera de fondo (el micro-movimiento "gratis" que SÍ vale)
- **Bruma / humo real en los haces de luz** — `wreathed in real volumetric haze` (nota: "real", no "magical"). Da profundidad y vida sin un solo gesto.
- **Polvo flotando** en un rayo de luz lateral.
- Vapor de un café, condensación.

Estos pueden coexistir con el beat principal porque son atmósfera ambiente, no "acción". Son el equivalente en movimiento a las micro-imperfecciones de la imagen fija.

---

## 4. Cómo estructurar un motion prompt: BEATS con timestamps

Un motion prompt bien hecho no es una frase ("una mujer respira y la cámara se acerca"). Es una **coreografía por beats con marcas de tiempo**, para que el modelo sepa *cuándo* pasa cada cosa dentro de los 4-6 segundos. Esto es lo que separa un clip controlado de uno caótico.

Estructura recomendada (en inglés, en el prompt):

```text
[SHOT SETUP]
One sentence describing the frame we start from (must match the start_image).

[CAMERA]
One single camera behavior for the whole shot. e.g. "very slow dolly
push-in, ~3-4%, almost imperceptible."

[BEATS]
0.0–1.5s — <micro-action 1, e.g. she holds still, one slow blink>
1.5–3.0s — <the single main beat, e.g. she turns her head toward camera>
3.0–5.0s — <settle / hold, breath out, haze drifting through the light>

[ATMOSPHERE]
Background micro-movement only (haze, dust, breath). Nothing else moves.

[NEGATIVE]
no glowing eyes, no sparkles, no fairy dust, no floating objects, no
self-rotating props, no magical light cascades, no morphing, no warping,
no extra limbs, no camera shake, no text.
```

Reglas de los beats:
1. **Un solo beat principal.** Los otros tramos son "hold" (mantener) o micro-movimiento.
2. **Timestamps realistas** para la duración del clip (Kling/Seedance generan clips cortos; no metas 8 beats en 5 segundos).
3. **El primer beat suele ser "casi quieto"** — arrancar en movimiento se ve nervioso. Deja que el plano se asiente.
4. **Cierra con un "settle"** — el plano vuelve a la calma. Así encadena bien con el siguiente clip.
5. **Negativos siempre presentes**, copiando la lista negra de la sección 2.

---

## 5. Talking heads: el formato "floating head only"

Cuando generas una **cabeza parlante** (talking head) a partir de una imagen que solo muestra la cara, Kling tiende a **inventarse un cuerpo** debajo del mentón: cuello, hombros, ropa, torso. Y ese cuerpo inventado casi siempre sale deforme, con manos extra o proporciones raras. Es uno de los fallos más comunes.

La solución es decirle explícitamente que **NO** añada cuerpo. El truco es tratar la cabeza como si fuera una figura de vinilo (una cabeza-objeto que termina en el mentón):

```text
Floating HEAD ONLY, framed from the top of the hair to just below the chin.
DO NOT add a neck, shoulders, chest, body, clothing, or anything below the
chin. Treat it like a vinyl figurine head — the head exists alone in frame.
Only the face moves: eyes, brows, mouth, subtle head tilt.
```

Por qué funciona: al darle la referencia conceptual de "cabeza de figurita de vinilo", el modelo deja de intentar construir anatomía corporal y se concentra solo en animar el rostro. Combínalo siempre con la lista de negativos (`no extra limbs, no hands, no body`).

---

## 6. Protocolo completo de prep de lipsync

Importante (ver `03-modelos-video.md`): **el lipsync NO está expuesto por el MCP de Higgsfield**. Los modelos de lipsync (Sync Lipsync 2 Pro, Kling Lipsync, Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk) se aplican **después, en la web UI de Higgsfield**.

El único modelo audio-sync que sí expone el MCP es **wan2_7** (start_image + audio → vídeo sincronizado, 4:3 nativo, 1080p, 2-15s).

El flujo de producción es de **dos pasos**:

1. **Generas el clip con movimiento de boca** (con generate_video, Kling o Seedance), metiendo la línea de diálogo en el prompt.
2. **Aplicas el lipsync encima** en la web UI con el audio real, o usas wan2_7 vía MCP pasándole el audio.

### El protocolo del prompt de prep (los 4 puntos no negociables)

Para que el clip base sirva luego de soporte al lipsync, el prompt que generas en el paso 1 debe cumplir:

**1) La línea de diálogo LITERAL, entre comillas.**
Mete la frase exacta que se va a decir, entre comillas, dentro del prompt. El modelo sintetiza formas de boca coherentes con esos fonemas, lo que hace que el lipsync posterior cuadre muchísimo mejor.

```text
The character is speaking the line: "No lo has intentado de verdad todavía."
```

**2) Coreografía de gestos a beats con timestamps.**
Igual que en la sección 4, marca cuándo ocurre cada micro-gesto facial, sin pasarte: un parpadeo, una ceja, una pausa.

```text
0.0–1.0s — neutral, one slow blink before speaking
1.0–3.5s — speaks the line, natural mouth movement, slight brow raise on emphasis
3.5–5.0s — finishes, settles, lips close, soft exhale
```

**3) Preservar EXACTAMENTE la composición del start-image.**
El lipsync solo funciona si el encuadre, vestuario, fondo y pose se mantienen idénticos al fotograma de partida. Prohíbe explícitamente cualquier cambio:

```text
Preserve the start image EXACTLY: DO NOT change the wardrobe, background,
framing, lighting, pose, or hair. The ONLY thing that changes is the face
(mouth, eyes, subtle head motion). Composition is locked.
```

**4) Cerrar con el token de audio.**
Cuando el flujo usa audio-sync, termina el prompt con el token que referencia el clip de audio subido:

```text
Audio/voice to lipsync is <<<audio_1>>>.
```

> El audio se sube por el flujo estándar de media (`media_upload` → `curl PUT` → `media_confirm` con `type:"audio"`) y se referencia con su token. Ver el flujo de subida en `01-higgsfield-mcp.md`.

### Resumen del prep de lipsync en una plantilla

```text
[START IMAGE]
<one sentence matching the start_image exactly>

[COMPOSITION LOCK]
Preserve the start image EXACTLY. DO NOT change wardrobe, background,
framing, lighting, pose, or hair. Only the face moves.

[DIALOGUE]
The character speaks the line: "<exact line, verbatim, in quotes>"

[BEATS]
0.0–1.0s — neutral, one slow blink
1.0–3.5s — speaks the line, natural mouth shapes, brow raise on emphasis
3.5–5.0s — settles, lips close, soft exhale

[NEGATIVE]
no glowing eyes, no sparkles, no body morphing, no extra limbs, no
background change, no wardrobe change, no text.

Audio/voice to lipsync is <<<audio_1>>>.
```

Para talking heads sin cuerpo, combina esto con el bloque "floating head only" de la sección 5.

---

## 7. Dos ejemplos completos de motion prompt

Ambos en inglés (recordatorio de la sección 0). Ambos respetan el RESTRAINT: pasa poco, pero exacto.

### 7.1 Ejemplo CONTENIDO — Kling (retrato, micro-movimiento)

**Caso:** retrato cercano de la modelo del anuncio Black Opium. Cámara casi estática, un parpadeo, una respiración, bruma real en la luz. Esto es el dominio de Kling.

**Params** (recordar de `03-modelos-video.md`: Kling default 16:9 → **hay que forzar 9:16**; `pro` = 1080p):

```json
{
  "model": "kling3_0",
  "mode": "pro",
  "aspect_ratio": "9:16",
  "medias": [{ "role": "start_image", "value": "<media_id>" }]
}
```

**Prompt (inglés):**

```text
[SHOT SETUP]
Tight portrait of the woman from the start image, three-quarter face,
warm low key light from camera-left, deep shadows on the right side.
Match the start image exactly.

[CAMERA]
Locked-off camera with a very slow dolly push-in, ~3% over the whole
shot, almost imperceptible. No pan, no tilt, no shake.

[BEATS]
0.0–2.0s — she holds still, gaze just off-camera, one slow natural blink
2.0–3.5s — a single quiet breath: chest rises and falls once
3.5–5.0s — eyes drift to meet the lens, then settle; she stays still

[ATMOSPHERE]
Real volumetric haze drifting slowly through the warm key light. A few
specks of dust float in the beam. Nothing else moves.

[NEGATIVE]
no glowing eyes, no sparkles, no fairy dust, no floating objects, no
self-rotating props, no magical light, no morphing, no warping, no extra
limbs, no camera shake, no text.

Shot on a cinema camera, 85mm, f/2.0, natural color grade, photographic
realism, no text.
```

Por qué funciona: un único beat real (la mirada que encuentra el objetivo), envuelto en micro-movimiento (parpadeo, respiración, bruma) y un push-in que no se nota pero da intimidad. Cero gimmicks. Lee como un anuncio rodado.

### 7.2 Ejemplo COMPLEJO — Seedance (multi-elemento, con restraint)

**Caso:** un plano más ambicioso —multi-actor con sincronía tipo Lanthimos, parallax de cámara, transición de iluminación con fluorescentes muriendo— pero **sin perder el restraint**. Complejo no significa caótico: significa *varios beats exactos y coordinados*, no "que pasen muchas cosas". Esto es el dominio de Seedance.

**Params** (recordar de `03-modelos-video.md`: Seedance NO tiene `pro`/`4k`, solo `std`/`fast`; pasar `resolution:"1080p"`; forzar 9:16):

```json
{
  "model": "seedance_2_0",
  "mode": "std",
  "resolution": "1080p",
  "aspect_ratio": "9:16",
  "medias": [{ "role": "start_image", "value": "<media_id>" }]
}
```

**Prompt (inglés):**

```text
[SHOT SETUP]
A long dim corridor lit by overhead fluorescent tubes. Three people stand
spaced along the corridor, facing away from camera, lit cold and even.
Match the start image exactly.

[CAMERA]
Slow dolly forward down the corridor, steady tracking, gentle parallax as
the walls slide past. Smooth, deliberate, no shake.

[BEATS]
0.0–1.5s — everything still, slow forward dolly, cold fluorescent hum
1.5–3.0s — all three heads turn toward the camera in perfect unison,
           one single synchronized beat (Lanthimos-style), unsettling
3.0–4.5s — the fluorescent tubes die one by one in sequence, front to
           back, the corridor dropping into darkness tube by tube
4.5–6.0s — only the nearest tube remains, flickering once; the three
           faces hold, then the camera settles

[ATMOSPHERE]
Faint haze hanging in the corridor, catching each fluorescent before it
dies. Fine dust in the light. No other motion.

[NEGATIVE]
no glowing eyes, no sparkles, no fairy dust, no floating objects, no
self-rotating props, no magical light cascades, no morphing, no warping
faces, no extra limbs, no jittery camera, no text.

Cinematic, Kodak Vision3 500T look, clean blacks, teal-orange grade,
photographic realism, no text.
```

Por qué sigue siendo restraint a pesar de ser complejo: cada beat es **uno y exacto** (el giro sincronizado, los tubos muriendo en secuencia). No hay improvisación. La "complejidad" está en la *coordinación precisa* de pocos eventos, no en la acumulación de efectos. Eso es Seedance bien usado. La sincronía multi-actor y la transición de luz son cine de autor; ningún gimmick de fantasía.

---

## 8. Checklist rápido antes de lanzar un motion prompt

- [ ] ¿Hay **un solo** beat principal? (si hay tres, recorta)
- [ ] ¿El prompt está **en inglés**?
- [ ] ¿Tiene **timestamps** por beat, realistas para la duración?
- [ ] ¿El primer tramo es "casi quieto" y cierra en "settle"?
- [ ] ¿Está el **bloque de negativos** con la lista negra completa? (ojos brillando, chispas, fairy dust, levitación, props rotando, luz mágica, morphing)
- [ ] ¿El movimiento elegido sale del **catálogo real** (sección 3) y no de la fantasía?
- [ ] **Modelo correcto:** ¿micro-movimiento → Kling? ¿cámara/multi-actor/physics → Seedance?
- [ ] ¿Forzaste **`aspect_ratio:"9:16"`**? (ambos defaultean a 16:9; no auto-matchean el start_image)
- [ ] Si es talking head sin cuerpo: ¿incluiste el bloque **"floating head only"**?
- [ ] Si es prep de lipsync: ¿la **línea literal entre comillas**, el **lock de composición** y el **token de audio** al final?
- [ ] ¿Cierra con coda fotográfica (cámara/lente/grade, "photographic realism, no text")?

> Si dudas entre "más movimiento" o "menos movimiento", elige siempre **menos**. El restraint nunca te hará parecer fantasía barata; el exceso siempre lo hará.