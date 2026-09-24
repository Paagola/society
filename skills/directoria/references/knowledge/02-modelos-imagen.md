> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/02-modelos-imagen.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# 02 · Modelos de imagen — Matriz "qué modelo para qué"

> Esta guía cubre la herramienta `generate_image` del MCP de Higgsfield. Es la decisión que más impacta en el resultado: elegir mal el modelo te hace pelear contra él durante horas. Elegir bien hace que el modelo trabaje a tu favor.
>
> Antes de leer esto conviene tener clara la metodología de prompting (`00-metodologia-promptdirector.md`) y el funcionamiento del MCP (`01-higgsfield-mcp.md`). Para meter un personaje recurrente con la cara bloqueada, lee también `04-consistencia-personaje.md`.

---

## La regla de oro (memorízala antes que nada)

> **Identidad de personaje → `nano_banana_pro` con stack de refs.**
> **Estilo puro, sin identidad que preservar → `soul` (prompt-only).**

Todo lo demás son matices. Si solo te llevas una frase de este documento, que sea esa. El error número uno es intentar bloquear una cara con un modelo prompt-only (`soul`), que **ignora las refs**, o intentar explorar estilo libre cargando refs en un modelo que las respeta tanto que te las clava idénticas.

---

## Por qué los prompts van en inglés

Toda la prosa de esta guía está en español porque hablas tú con el agente en tu idioma. **Pero el prompt final que entra en `params.prompt` va en inglés.** Los modelos de imagen están entrenados mayoritariamente con datos en inglés y rinden notablemente mejor: entienden mejor las specs de cámara, los términos de iluminación y las marcas de stock fotográfico. La conversación es en tu idioma; el entregable a la API es inglés. Verás esto en todos los ejemplos del paquete.

---

## Tabla resumen — los 4 modelos de un vistazo

| Modelo | ¿Respeta refs? | Default | Param clave | Para qué brilla | Cuándo NO |
|---|---|---|---|---|---|
| `nano_banana_pro` | **Sí** (líder identidad 2026) | 1k | `resolution:"4k"` | Personaje con cara bloqueada, gen desde refs + descripción | Cuando no hay identidad que preservar (es matar moscas a cañonazos para puro estilo) |
| `soul_2` / `soul_cinematic` | **No** (PROMPT-ONLY, dropea refs) | quality 2k | — (solo prompt) | Estilo cinematográfico/editorial/UGC sin identidad ref-crítica | Cuando necesitas una cara o un concepto surreal muy específico |
| `gpt_image_2` | Parcial (modifica la cara) | quality `low` | `quality:"high"` | Comparar fidelidad facial, render comercial limpio | Identidad de personaje recurrente (te cambia la cara + AI gloss) |
| `marketing_studio_image` | (verificar) | comercial | — | Producto / anuncios / bodegón comercial por defecto | (verificar) |

> Nota de naming: `soul_2` también aparece con el alias `text2image_soul_v2`. Son lo mismo.

---

## 1. `nano_banana_pro` — el caballo de batalla para identidad

**Qué es:** el líder en preservación de identidad en 2026. Es el modelo al que vas siempre que en la escena tiene que aparecer una persona (o producto) cuya cara/forma debe mantenerse fiel a una referencia.

### Fortalezas
- **Preservación de identidad de primer nivel.** Le das un sheet de identidad y te mantiene la cara escena tras escena.
- **Respeta el stack de refs** (al contrario que `soul`). Lo que cargas en `medias[]` entra de verdad en la generación.
- Funciona en dos modos: (a) **insertar** un personaje recurrente con identidad bloqueada en una escena nueva, o (b) **gen directa** desde refs + una descripción verbosa.

### Debilidades / cuidado
- **La atención se diluce pasadas 3-4 refs.** Admite hasta 14, pero no las cargues todas: más allá de 3-4 el modelo reparte la atención y la cara empieza a driftar. **Máximo 3-4 refs útiles.** (Ver orden correcto en `04-consistencia-personaje.md`.)
- **Puede reportar `model:"nano_banana_2"` internamente.** Es un **fallback normal**, no un error. No reintentes ni cambies nada por verlo.

### Params correctos

```json
{
  "model": "nano_banana_pro",
  "resolution": "4k",
  "aspect_ratio": "9:16",
  "medias": [
    { "role": "image", "value": "<media_id_identity_sheet>" },
    { "role": "image", "value": "<media_id_selfie>" },
    { "role": "image", "value": "<media_id_scene_wardrobe>" }
  ],
  "params": { "prompt": "<JSON Decoded Brief stringificado con @image1 @image2 @image3>" }
}
```

- **`resolution:"4k"` SIEMPRE que quieras calidad de entrega.** El default es `1k`; si no lo pasas, sales en baja resolución.
- `aspect_ratio` está soportado (`"9:16"` para vertical, etc.). Pásalo explícito.
- **`medias[].role` DEBE ser `"image"`.** El server coacciona `"reference"` → `"image"`, pero escríbelo bien desde el principio para evitar sorpresas.
- En `params.prompt` va el **JSON Decoded Brief stringificado** con los tokens `@image1`, `@image2`, `@image3` ya incrustados, en el **orden exacto** del array `medias[]`. (Metodología completa en `00-metodologia-promptdirector.md`.)

### Cuándo elegirlo
- Personaje recurrente que debe mantener la cara.
- Producto cuyo logo/forma debe reproducirse 1:1 desde la ref.
- Cualquier escena donde una referencia visual es **crítica** y debe respetarse.
- Conceptos surreales muy específicos que `soul` perdería (úsalo como **ancla**: ver más abajo).

### Cuándo NO
- Cuando solo exploras estilo/atmósfera y no hay identidad que preservar → es overkill; usa `soul`.

---

## 2. `soul_2` / `soul_cinematic` — estilo puro, prompt-only

**Qué es:** los modelos de estilo cinematográfico/editorial. Son **PROMPT-ONLY**.

> **AVISO CRÍTICO — `soul` IGNORA / DROPEA las refs.** Si lanzas un job de Soul con una ref adjunta, el job guarda `prompt:""` y **solo regenera variaciones de la propia ref**. No bloquea identidad. No combina refs. Si tu plan mental era "cargo la cara y Soul me la mantiene", estás usando el modelo equivocado: ve a `nano_banana_pro`.

### Fortalezas
- **Estilo cinematográfico / editorial / UGC de altísimo nivel** a partir de solo texto.
- Ideal para **exploración**: tirar muchas variaciones de un look sin depender de refs.
- `soul_cinematic` da el grano cinematográfico (grading, atmósfera) casi gratis.

### Debilidades / cuidado
- **No usa refs.** Repítelo hasta que duela.
- **`soul_cinematic` PIERDE conceptos muy específicos o surreales.** Si tu concepto depende de un detalle raro (un caballo en el umbral de una puerta, una composición imposible, un objeto concreto), Soul tiende a "normalizarlo" hacia algo más genérico. **Si el concepto importa de verdad, usa `nano_banana_pro` con una ref ancla** que fije ese concepto.

### Params correctos

```json
{
  "model": "soul_cinematic",
  "params": { "prompt": "<NL prompt en inglés, sin tokens @image>" }
}
```

- **Default `quality` = `2k`.** Suficiente para exploración.
- **No incluyas tokens `@imageN`** ni esperes que las refs hagan nada. Todo el peso está en el texto.

### Cuándo elegirlo
- Exploración de estilo cinematográfico/editorial/UGC donde **la identidad no es ref-crítica**.
- Generar moodboards, opciones de grading, atmósferas, encuadres tipo.
- UGC genérico donde no necesitas una cara concreta y persistente.

### Cuándo NO
- Cuando necesitas mantener una cara → `nano_banana_pro`.
- Cuando el concepto es surreal/específico y no puedes permitir que se normalice → `nano_banana_pro` con ref ancla.

---

## 3. `gpt_image_2` — render limpio, con dos trampas

**Qué es:** un modelo alternativo útil sobre todo para **comparar fidelidad facial** y para ciertos renders comerciales limpios.

### Fortalezas
- Render pulido, buena composición.
- Sirve como **segunda opinión** para comparar cómo sale una cara frente a `nano_banana_pro`.

### Debilidades / cuidado
- **Default `quality` = `low`. HAY QUE PASAR `quality:"high"`** o sales con calidad baja.
- **Tiende al "AI gloss"** (ese acabado plasticoso/render demasiado limpio que delata la IA).
- **Tiende a modificar la cara.** Por eso **NO sirve para identidad de personaje recurrente**: te altera los rasgos entre tomas y rompe la consistencia.

### Params correctos

```json
{
  "model": "gpt_image_2",
  "quality": "high"
}
```

### Cuándo elegirlo
- Comparar fidelidad facial puntualmente (una toma de control frente a `nano_banana_pro`).
- Render comercial donde el AI gloss no estorbe.

### Cuándo NO
- **Personaje recurrente** (te cambia la cara). Para eso, `nano_banana_pro`.
- Cuando buscas hiperrealismo fotográfico sin look de render → el AI gloss juega en contra (ver `05-biblia-hiperrealismo.md`).

---

## 4. `marketing_studio_image` — el comercial por defecto

**Qué es:** el modelo orientado por defecto a **comercial / producto / anuncios**.

### Cuándo elegirlo
- Bodegón de producto, formatos de anuncio, piezas comerciales estándar donde no necesitas bloquear una cara concreta.

### Cuándo NO / detalles
- Fortalezas y debilidades finas más allá de su orientación comercial: **(verificar)**.
- Para identidad de personaje sigue mandando `nano_banana_pro`.

---

## Árbol de decisión rápido

```
¿Tiene que aparecer una CARA / PRODUCTO concreto que debe ser fiel a una ref?
│
├── SÍ ─────────────────────────────► nano_banana_pro  (resolution:"4k", 3-4 refs role:"image")
│
└── NO
     │
     ├── ¿El concepto es surreal / muy específico y no puede normalizarse?
     │       │
     │       ├── SÍ ───────────────► nano_banana_pro con UNA ref ANCLA del concepto
     │       │
     │       └── NO ───────────────► soul_cinematic / soul_2  (prompt-only, quality 2k)
     │
     ├── ¿Es producto / anuncio comercial estándar?
     │       └────────────────────► marketing_studio_image
     │
     └── ¿Quieres una segunda opinión de fidelidad facial / render limpio?
             └────────────────────► gpt_image_2  (quality:"high", ojo con AI gloss y cara cambiada)
```

---

## Casos límite y combos

- **Concepto surreal que Soul pierde + sin cara concreta:** no te resignes a `soul`. Genera primero con `nano_banana_pro` usando **una ref ancla** que fije el concepto (una imagen que contenga el elemento raro), y deja que el resto lo construya el prompt. Así fijas el concepto Y obtienes el render.
- **Estilo de Soul + identidad después:** Soul es genial para encontrar el look, pero no te dará la cara. Flujo típico: explora el estilo con `soul_cinematic`, y cuando el look esté decidido, reprodúcelo con `nano_banana_pro` + stack de identidad para clavar la cara dentro de ese estilo. (Recetas en `08-recetas-pipeline.md`.)
- **El `nano_banana_2` que aparece "solo":** repito porque genera dudas — si en la respuesta ves `model:"nano_banana_2"` habiendo pedido `nano_banana_pro`, **es el fallback normal**. No es un fallo y no requiere acción.

---

## Preflight de coste — no tires un job a ciegas

Antes de lanzar una generación cara (4k, varias refs), puedes pedir solo el coste sin ejecutar el job:

```json
{ "model": "nano_banana_pro", "resolution": "4k", "get_cost": true }
```

`get_cost:true` te devuelve el **coste estimado sin lanzar** la generación. Úsalo cuando vayas a batchear muchas tomas en 4k para no llevarte un susto. (Gestión de jobs, rate limit de 8 concurrentes y subida de refs: ver `01-higgsfield-mcp.md`.)

---

## Checklist antes de pulsar "generar"

- [ ] ¿Hay una cara/producto que debe ser fiel? → `nano_banana_pro`. Si no → `soul`.
- [ ] Si es `nano_banana_pro`: ¿pasé `resolution:"4k"`? ¿`role:"image"` en cada ref? ¿máximo 3-4 refs?
- [ ] Si es `soul`: ¿asumí que NO va a usar refs y puse todo el peso en el prompt?
- [ ] Si es `gpt_image_2`: ¿pasé `quality:"high"`? ¿descarté que sea para identidad recurrente?
- [ ] ¿El prompt está en **inglés** y sigue el formato de `00-metodologia-promptdirector.md` (JSON brief + NL, termina en "Photographic realism, no text.")?
- [ ] ¿Tokens `@image1/@image2/@image3` en el **mismo orden** que `medias[]`?
- [ ] ¿Hago `get_cost:true` antes de un batch grande en 4k?

---

### Ver también
- `00-metodologia-promptdirector.md` — cómo construir el JSON Decoded Brief + párrafo NL.
- `01-higgsfield-mcp.md` — subida de refs, `media_upload`/`media_confirm`, rate limit, workspaces.
- `04-consistencia-personaje.md` — orden de refs, anchor words, ref roles, evitar drift de cara.
- `05-biblia-hiperrealismo.md` — combatir el AI gloss, coda fotográfica, film stock.
- `08-recetas-pipeline.md` — combos Soul→nano_banana_pro y pipelines completos.