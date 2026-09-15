# Plantilla — Talking Head con Lipsync

> **Qué es esto.** La receta para que un personaje **hable a cámara** en tu anuncio: un plano fijo (o casi fijo) donde la persona mira al objetivo y pronuncia una línea de guion, con la boca sincronizada al audio.
>
> **Por qué es un caso aparte.** El lipsync de verdad (la sincronía labial fina) **NO está expuesto por el MCP de Higgsfield**. Así que el talking head se hace en **dos pasos**: primero generas un clip de vídeo donde la boca ya se mueve (metiendo la línea de diálogo literal en el prompt), y **después** aplicas el lipsync en la **web UI de Higgsfield**. Esta plantilla te da el prompt del paso 1 y te explica el paso 2.
>
> **Idioma.** Las anotaciones y la enseñanza van en español; **el prompt va siempre en inglés**, porque los modelos de vídeo rinden mejor en inglés. Tú conversas con el usuario en su idioma, pero el prompt final se entrega en inglés. La **única excepción** es la línea de diálogo entre comillas: esa va en el idioma real del anuncio (normalmente español), porque es lo que el modelo va a "decir" con la boca.

Ficheros hermanos que conviene tener a mano:
- `templates/prompt-video-motion.md` — la plantilla general de motion (de la que esto es un caso especial).
- `knowledge/03-modelos-video.md` — params completos de Kling / Seedance / wan2_7.
- `knowledge/06-direccion-movimiento.md` — la gramática de movimiento (restraint, beats).
- `knowledge/01-higgsfield-mcp.md` — flujo de subida de medios y `generate_video`.
- `knowledge/07-troubleshooting.md` — rate limit, preset auto-recommend, media_ids inválidos.

---

## 0. El flujo completo en 2 pasos (léelo antes de nada)

```
PASO 1 — generate_video (vía MCP)
   start_image (el retrato) + prompt con la boca moviéndose + línea de diálogo literal entre comillas
        │
        ▼
   clip de vídeo donde la persona YA mueve la boca y gesticula
   (pero la sincronía labial NO encaja todavía con tu audio real)
        │
        ▼
PASO 2 — Lipsync (en la WEB UI de Higgsfield, NO por MCP)
   subes el clip del paso 1 + tu pista de audio/voz
   → eliges una de las herramientas de lipsync: Sync Lipsync 2 Pro, Kling Lipsync,
     Kling 2.6 Lipsync, Kling Avatars 2.0, Higgsfield Speak 2.0, Infinite Talk
   → el motor re-sincroniza los labios al audio
        │
        ▼
   talking head final con labios cuadrados al audio
```

**Por qué metemos la línea de diálogo en el prompt del paso 1 si el lipsync se hace luego.**
Porque si en el paso 1 la boca ya se mueve formando **fonemas plausibles** (no una boca quieta ni un balbuceo aleatorio), el motor de lipsync del paso 2 tiene una base mucho mejor sobre la que re-sincronizar: menos artefactos, dientes y lengua más creíbles, transiciones de boca más limpias. Una boca cerrada o congelada en el paso 1 produce un lipsync sucio en el paso 2.

**Atajo (alternativa a este flujo de 2 pasos).** Existe un modelo de audio-sync que **sí** está expuesto por el MCP: `wan2_7` (start_image + audio → vídeo ya sincronizado, formato **4:3 nativo**, 1080p, 2–15 s). Si te vale 4:3 y no necesitas el catálogo de motores de lipsync de la web, puedes hacerlo en un solo paso por MCP. Para vertical 9:16 limpio y para los motores de lipsync premium, usa el flujo de 2 pasos de arriba. Ver `knowledge/03-modelos-video.md`.

---

## 1. Qué modelo elegir para el PASO 1

El talking head es **movimiento contenido**: una cabeza, micro-gestos, respiración, parpadeos. Eso es territorio de **Kling**. Seedance es para movimiento complejo (cámara que viaja, multi-actor, physics) — no lo necesitas aquí salvo casos raros.

| Modelo | Cuándo para talking head | Params clave |
|---|---|---|
| **kling3_0** | **Default.** Retrato hablando, micro-movimiento, gesto deliberado. | `mode`: std / pro (1080p) / 4k · **`aspect_ratio:"9:16"` OBLIGATORIO** (default es 16:9 y NO auto-matchea al start_image) · `sound` default "on" · media role `start_image` |
| **seedance_2_0** | Solo si el plano lleva cámara en movimiento real o un segundo actor sincronizado. | `mode`: std / fast (no hay pro/4k) · **`resolution:"1080p"`** (default 720p, pásalo) · **`aspect_ratio:"9:16"` OBLIGATORIO** · `genre` default "auto" · media role `start_image` |
| **wan2_7** | Atajo audio-sync en 1 paso, pero **4:3 nativo**. | start_image + audio → sincronizado · 1080p · 2–15 s |

> **El error que cuesta a todo el mundo:** olvidar `aspect_ratio:"9:16"`. Tu start_image es vertical, pero el modelo entrega 16:9 por defecto y te recorta/rellena el plano. **Pásalo siempre explícito.**

---

## 2. Anatomía del prompt de talking head

Un buen prompt de talking head para el paso 1 tiene **seis bloques**, en este orden:

1. **Anchor words** — descripción física breve del personaje al PRINCIPIO (cara, pelo, piel), para que la identidad no se diluya. Si trabajas con `@image1` etc., los pones antes de los tokens. Ver `templates/ref-stack-personaje.md`.
2. **Encuadre / sub-plantilla** — o bien **floating head only** (con las negaciones anti-cuerpo) o bien **seated/desk talking** (preservando la composición del start image). Elige una de las dos plantillas de §4.
3. **Coreografía de gestos por beats** — la cabeza/manos/cejas marcadas con timestamps. Restraint: pocos gestos pero exactos. Nada de magia (ver §3).
4. **La línea de diálogo LITERAL entre comillas** — el placeholder `[SPANISH_LINE_HERE]`. Esto es lo que sincroniza las formas de boca.
5. **Lock de composición** — "DO NOT change wardrobe, background, framing or pose from the start image". Crítico para que el lipsync del paso 2 reciba un plano estable.
6. **Cierre de lipsync** — la línea exacta: `Audio/voice to lipsync is <<<audio_1>>>`.

Y, como siempre en la metodología PromptDirector, el prompt en lenguaje natural termina con la coda fotográfica y `Photographic realism, no text.` (ver `knowledge/00-metodologia-promptdirector.md`).

---

## 3. Restraint: la diferencia entre cine y fantasía Marvel

El talking head es donde más se nota la falta de contención. **RESTRAINT es cine.** El personaje habla; no le pasa NADA mágico alrededor.

**PROHIBIDO en un talking head (lee como fantasía ridícula, no como anuncio):**
- ojos que brillan, destellos en la mirada
- chispas mágicas, "fairy dust", partículas que orbitan
- props que levitan o rotan solos detrás
- luces en cascada que aparecen de la nada
- "glow", "silhouette of light", "rendered as", "CGI"

**SÍ se permite (esto es movimiento cinematográfico real):**
- una respiración visible, un parpadeo, dos parpadeos
- un micro push-in de cámara del 3–4 % (casi imperceptible)
- un ladeo de cabeza deliberado en un beat concreto
- un gesto de mano que subraya una palabra
- bruma/polvo flotando suave en el haz de luz (si hay haz)
- el pelo asentándose con la gravedad

Gramática Glazer / Lanthimos: pasa muy poco, pero cada beat es exacto. Ver `knowledge/06-direccion-movimiento.md`.

---

## 4. Las dos sub-plantillas (prompt en inglés)

> Rellena los `[CORCHETES]`. La línea entre comillas `[SPANISH_LINE_HERE]` va en el idioma real del anuncio. Todo lo demás en inglés.

---

### (a) FLOATING HEAD ONLY

Para cuando quieres **solo la cabeza** flotando en plano (estilo intro, hook, busto recortado) y NO quieres que Kling invente un cuerpo, cuello, hombros o ropa. Las negaciones anti-cuerpo son la clave: sin ellas el modelo "completa" la anatomía y rompe el look.

```text
[PHYSICAL ANCHOR: e.g. a woman in her early 30s, warm olive skin, dark
brown shoulder-length hair, hazel eyes, faint freckles across the nose].

FLOATING HEAD ONLY, centered in frame against [BACKGROUND, e.g. a soft
out-of-focus warm beige studio backdrop]. Treat it like a vinyl figurine
head reference: only the head and the base of the neck are visible.
DO NOT add neck below the collarbone, DO NOT add shoulders, chest, torso,
arms, hands, body, or any clothing below the chin. No collar, no garment,
no jewelry below the jaw. The head sits isolated in the frame.

Gesture choreography (beats):
- 0.0s–1.0s: a slow single blink, head perfectly still, settling breath.
- 1.0s–3.0s: the head tilts ~4 degrees to her right as she begins to speak,
  eyebrows lift slightly on the stressed word.
- 3.0s–4.5s: a small confident nod on the key phrase, eyes locked to lens.
- 4.5s–5.0s: she settles back to neutral, one soft blink.

She speaks directly to camera, lips clearly forming the words, natural mouth
shapes and visible teeth, saying: "[SPANISH_LINE_HERE]"

Micro-imperfections: visible skin pores, fine vellus hair on the cheek, a
faint T-zone sheen, individual eyebrow hairs, slight facial asymmetry, one
flyaway strand of hair.

Camera: locked-off medium close-up, 85mm lens, f/2.8, ISO 200, lens-to-subject
1.2 m, soft key light at 5200K from camera-left, gentle fill. Allow an almost
imperceptible 3% dolly push-in over the clip. Shallow depth of field with a
coherent soft background bokeh.

DO NOT change the background, framing, lighting, identity or pose from the
start image. No floating particles, no glow, no magic light, no sparks.

Shot on a cinema camera, 85mm, f/2.8, ISO 200, natural color grade,
photographic realism, no text.

Audio/voice to lipsync is <<<audio_1>>>
```

**Por qué esas frases concretas:**
- `FLOATING HEAD ONLY` + `vinyl figurine head reference` + la lista de negaciones (`DO NOT add neck / shoulders / chest / body / clothing below the chin`) → bloquea la invención de cuerpo, que es el fallo típico de Kling con cabezas recortadas.
- `lips clearly forming the words, natural mouth shapes and visible teeth` → fuerza fonemas plausibles para que el lipsync del paso 2 tenga buena base.
- `No floating particles, no glow, no magic light, no sparks` → el antídoto contra la fantasía Marvel del §3.

---

### (b) SEATED / DESK TALKING

Para el **talking head clásico de anuncio/UGC**: la persona sentada (a una mesa, en un sofá, en un set) hablando a cámara. Aquí **NO niegas el cuerpo** — al contrario, **preservas exactamente la composición del start image** (vestuario, fondo, encuadre, pose) para que el lipsync del paso 2 reciba un plano estable y todo lo que cambie sea la boca y los micro-gestos.

```text
[PHYSICAL ANCHOR: e.g. a man in his late 20s, light brown skin, short black
curly hair, dark eyes, neatly trimmed stubble].

He is seated at [SETTING from the start image, e.g. a wooden desk in a warm
home-office, a laptop and a coffee mug softly out of focus behind him],
wearing [WARDROBE from the start image], framed as a chest-up medium shot,
looking directly into the lens.

Gesture choreography (beats):
- 0.0s–0.8s: settling breath, a single natural blink, shoulders relaxed.
- 0.8s–2.5s: he leans in ~3 cm toward camera as he starts speaking, right
  hand rises into frame in a small open gesture on the key word.
- 2.5s–4.0s: hand lowers, a calm confident nod, steady eye contact.
- 4.0s–5.0s: he eases back to the starting pose, soft blink, faint smile.

He speaks directly to camera, lips clearly forming the words, natural mouth
shapes and visible teeth, saying: "[SPANISH_LINE_HERE]"

Micro-imperfections: visible skin pores, faint stubble, subsurface scattering
on the ears, individual eyebrow hairs, slight asymmetry, micro lip texture,
a light T-zone oil sheen.

Camera: locked-off chest-up medium shot, 50mm lens, f/4, ISO 400,
lens-to-subject 1.6 m, subject-to-background 2 m, soft window key light at
5600K from camera-left. Allow an almost imperceptible 3% dolly push-in.
Subject sharp, background in coherent soft focus.

PRESERVE the start image EXACTLY: DO NOT change the wardrobe, the background,
the set, the framing, the lighting or the seated pose. The only motion is the
speaking, the listed micro-gestures and natural breathing. No floating objects,
no glow, no magic light, no sparks.

Shot on a cinema camera, 50mm, f/4, ISO 400, natural color grade,
photographic realism, no text.

Audio/voice to lipsync is <<<audio_1>>>
```

**Por qué esas frases concretas:**
- `PRESERVE the start image EXACTLY` + la lista `DO NOT change wardrobe / background / set / framing / lighting / pose` → todo lo que se mueva es la boca y los micro-gestos. Esto es lo que hace que el lipsync del paso 2 quede limpio: si el fondo o el vestuario bailan, el lipsync hereda esos artefactos.
- Los beats con timestamps están **acotados a ~5 s** porque los clips de talking head son cortos; ajusta los timestamps a la duración real de tu línea de diálogo.

---

## 5. La línea de diálogo: cómo tratar `[SPANISH_LINE_HERE]`

- **Va entre comillas, literal, en el idioma real del anuncio** (no la traduzcas al inglés). El modelo usa esa cadena para inferir las formas de boca; si va en español, los fonemas españoles salen mejor.
- **Una sola línea por clip.** Un talking head = una frase / un beat de guion. Si el guion tiene varias frases, haz un clip por frase y encadénalos en montaje; no metas un párrafo entero en un solo prompt (la boca se atropella y el lipsync sufre).
- **Ajusta los timestamps de los beats a la longitud de la línea.** Una frase de ~3 s no necesita 5 s de coreografía; recorta los beats.
- **El audio real lo aplicas en el paso 2.** El `<<<audio_1>>>` del cierre es un marcador para el flujo de lipsync; la voz definitiva (tu locución / TTS) se inyecta en la web UI, no aquí.

---

## 6. Params del PASO 1 — copia-pega (Kling default)

Recuerda el flujo de subida antes de lanzar: `media_upload` → `curl -X PUT` al `upload_url` → `media_confirm` → usar el `media_id` como `medias[].value`. Detalle en `knowledge/01-higgsfield-mcp.md`.

**kling3_0 — talking head vertical (default recomendado):**

```json
{
  "model": "kling3_0",
  "params": {
    "prompt": "<<el prompt en inglés de §4, sub-plantilla (a) o (b)>>",
    "mode": "pro",
    "aspect_ratio": "9:16",
    "sound": "on",
    "medias": [
      { "role": "start_image", "value": "<MEDIA_ID_DEL_RETRATO>" }
    ]
  }
}
```

- `mode:"pro"` = 1080p (sube a `"4k"` si el entregable lo pide).
- **`aspect_ratio:"9:16"` SIEMPRE explícito** — sin esto entrega 16:9.
- `sound` default `"on"` (lo puedes dejar; el audio definitivo va en el paso 2 de todos modos).

**seedance_2_0 — solo si el plano lleva cámara/segundo actor:**

```json
{
  "model": "seedance_2_0",
  "params": {
    "prompt": "<<el prompt en inglés de §4>>",
    "mode": "std",
    "resolution": "1080p",
    "aspect_ratio": "9:16",
    "genre": "auto",
    "medias": [
      { "role": "start_image", "value": "<MEDIA_ID_DEL_RETRATO>" }
    ]
  }
}
```

- Seedance **no tiene** `pro`/`4k`; el control de calidad es `resolution:"1080p"` (default 720p, pásalo).
- `aspect_ratio:"9:16"` igualmente obligatorio.

**Atajo en 1 paso — wan2_7 (audio-sync por MCP, 4:3 nativo):**

```json
{
  "model": "wan2_7",
  "params": {
    "prompt": "<<el prompt en inglés de §4, sin el cierre <<<audio_1>>> (aquí el audio es input real)>>",
    "medias": [
      { "role": "start_image", "value": "<MEDIA_ID_DEL_RETRATO>" },
      { "role": "audio", "value": "<MEDIA_ID_DE_LA_VOZ>" }
    ]
  }
}
```

- **4:3 nativo**, 1080p, 2–15 s. Si necesitas 9:16 limpio o un motor de lipsync premium, NO uses este atajo: usa Kling + lipsync en web (pasos 1+2).
- *(verificar)* los nombres exactos de `medias[].role` para la pista de audio en este modelo desde tu cliente MCP antes de lanzar en producción.

> **Preflight de coste.** Añade `get_cost:true` para ver el coste sin lanzar el job.
>
> **Trampa preset auto-recommend.** Si tu prompt se parece a un preset (p.ej. "IN THE DARK", id `24bae836-2c4a-48e0-89b6-49fcc0b21612`), el server devuelve un `notice` (type `preset_recommendation`) **sin ejecutar**. Fix: añade `declined_preset_id:"<id>"` para forzar la generación literal. Ver `knowledge/07-troubleshooting.md`.
>
> **Rate limit.** Máx 8 jobs concurrentes (plan ultra). Si generas varios clips de talking head (uno por frase del guion), batchea en grupos de ≤ 8.

---

## 7. El PASO 2 — aplicar lipsync en la web UI de Higgsfield

El lipsync **NO está expuesto por el MCP**. Se hace a mano en la interfaz web. El MCP te entrega el clip del paso 1; el lipsync final lo cierras tú en la web.

1. Descarga / localiza el clip del paso 1 (boca ya en movimiento).
2. En la web UI de Higgsfield, abre la herramienta de lipsync y **sube el clip + tu pista de audio/voz** (tu locución o TTS — p.ej. ElevenLabs).
3. Elige uno de los motores expuestos en la web:

| Motor de lipsync (solo web UI) | Notas de uso |
|---|---|
| **Sync Lipsync 2 Pro** | Opción de referencia para sincronía labial fina. |
| **Kling Lipsync** | Lipsync sobre clips estilo Kling. |
| **Kling 2.6 Lipsync** | Variante más reciente del anterior. |
| **Kling Avatars 2.0** | Orientado a avatar/talking head. |
| **Higgsfield Speak 2.0** | Motor de habla nativo de Higgsfield. |
| **Infinite Talk** | Para líneas largas / habla continua. |

4. El motor re-sincroniza los labios al audio. Revisa dientes, lengua y transiciones de boca; si salen sucios, casi siempre es porque el clip del paso 1 tenía la boca demasiado quieta — vuelve al prompt y refuerza `lips clearly forming the words, natural mouth shapes and visible teeth`.

> *(verificar)* los pasos exactos de la UI (nombres de botones, dónde se sube el audio) pueden variar entre versiones de la web de Higgsfield; los **nombres de los motores** de la tabla son la fuente de verdad, el resto de la navegación confírmalo en pantalla.

---

## 8. Checklist antes de lanzar el clip (paso 1)

- [ ] Modelo correcto: **kling3_0** para talking head normal (Seedance solo si hay cámara/multi-actor).
- [ ] **`aspect_ratio:"9:16"` explícito** en los params (el error nº1).
- [ ] `mode:"pro"` (1080p) o el que pida el entregable.
- [ ] Anchor words físicas al **principio** del prompt.
- [ ] Sub-plantilla correcta: **(a) floating head** con todas las negaciones anti-cuerpo, o **(b) seated/desk** con `PRESERVE the start image EXACTLY`.
- [ ] Coreografía de gestos **por beats con timestamps**, ajustada a la duración de la línea.
- [ ] **Restraint:** sin glow, sin partículas, sin magia, sin props levitando.
- [ ] Línea de diálogo **literal entre comillas** y en el **idioma real** del anuncio (`[SPANISH_LINE_HERE]`), una sola frase por clip.
- [ ] `lips clearly forming the words, natural mouth shapes and visible teeth` presente (base limpia para el lipsync).
- [ ] Micro-imperfecciones reales (poros, vello, asimetría) en vez de "8k hyperrealistic".
- [ ] Specs de cámara en el párrafo NL + coda fotográfica + `Photographic realism, no text.`
- [ ] Cierre exacto: `Audio/voice to lipsync is <<<audio_1>>>`.
- [ ] Plan claro para el **paso 2** (qué motor de lipsync en la web + qué pista de audio).