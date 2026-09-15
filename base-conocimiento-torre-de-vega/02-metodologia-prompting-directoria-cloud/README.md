# DirectorIA Cloud

> Un director de arte de IA, pre-entrenado y portátil. Pídele una escena y te devuelve un prompt de nivel profesional listo para generar imagen o vídeo **hiperrealista** — con foco en Higgsfield, pero adaptable a Freepik, GPT-Image y otras herramientas.

DirectorIA Cloud no es una colección de prompts sueltos. Es un **cerebro completo**: la metodología, los gotchas de cada modelo, las plantillas y los ejemplos que necesita un agente (Claude, un GPT, Cursor…) para razonar como un director de arte experto y producir prompts reproducibles. El objetivo de diseño es radical: **que funcione como si el experto original no existiera**. Tú lees, el agente lee, y ambos pueden reproducir el criterio desde cero.

---

## ⚠ LÍMITE DE CRÉDITOS — LEER ANTES DE GENERAR VÍDEOS

**Los vídeos con Seedance y Kling consumen créditos muy rápido. Reglas obligatorias antes de lanzar cualquier generación de vídeo:**

1. **Máximo 2 vídeos por batch.** No lanzar más de 2 `generate_video` en paralelo en una misma sesión salvo confirmación explícita del usuario.
2. **Preflight de coste obligatorio.** Antes de lanzar un vídeo, ejecutar `generate_video` con `get_cost: true` para ver el coste en créditos sin consumirlos. Mostrarlo al usuario y esperar aprobación.
3. **Consultar saldo primero.** Si el saldo de créditos es inferior a 200, informar al usuario antes de lanzar cualquier generación.
4. **Una imagen antes que un vídeo.** Siempre generar y aprobar el keyframe estático antes de animar. No lanzar vídeos desde keyframes no revisados.
5. **Pedir confirmación explícita** antes de generar más de 1 vídeo en una misma sesión. El usuario debe decir cuántos vídeos quiere lanzar.

### Reglas adicionales para vídeos UGC multi-clip (para edición)

6. **Duración por clip: 4–8 segundos máximo.** Cada clip debe ser corto y editables. Los clips de 15s son excesivos para UGC social — pasar siempre `duration: 5` (Seedance) o `duration: 5` (Kling) a menos que el usuario pida otra cosa. Nunca dejar el `duration` por defecto (el modelo asume 15s y consume créditos innecesarios).
7. **Cada clip tiene su propio argumento.** Antes de generar un batch de clips, definir el guión completo: qué dice o hace el personaje en cada clip, cuál es el gancho, cuál es el CTA. No generar clips genéricos de "movimiento" sin narrativa.
8. **Estructura UGC mínima recomendada:**
   - Clip 1 (3–4s): Hook visual — acción llamativa sin diálogo
   - Clip 2 (5s): Talking head línea 1 — pregunta o afirmación
   - Clip 3 (3s): Plano detalle — producto, reacción, entorno
   - Clip 4 (5s): Talking head línea 2 — argumento o demostración
   - Clip 5 (4s): CTA directo a cámara — llamada a la acción
9. **Ángulos distintos por clip.** Cada clip debe usar un encuadre diferente (plano entero, americano, medio, primer plano, plano detalle). Un UGC con todos los clips en el mismo encuadre no tiene gancho.
10. **Lipsync = 2 pasos.** Clips con diálogo → primero Kling con la línea literal entre comillas → luego lipsync en web UI de Higgsfield. No asumir que el MCP hace lipsync automático.

---

## 1. Qué hace y para quién

**Qué hace:**
- Convierte una idea vaga ("quiero un anuncio de perfume con un dóberman") en un **prompt estructurado en 2 partes**: un *JSON Decoded Brief* (specs de cámara, luz, imperfecciones, negativos) y un *párrafo en lenguaje natural* listo para pegar.
- Elige el **modelo correcto** para cada trabajo (preservar identidad vs. explorar estilo vs. producto/ad) y pasa los parámetros que la gente olvida (resolución, aspect ratio vertical, calidad).
- Mantiene la **consistencia de personaje** entre escenas (orden de refs, anchor words, bloqueo de tono de piel y vestuario).
- Dirige **movimiento cinematográfico** real para vídeo, no "fairy dust" de fantasía.
- Si tienes el **MCP de Higgsfield conectado**, además **genera de verdad** (sube refs, lanza jobs, esquiva trampas de presets y rate limits).

**Para quién:**
- Creadores de contenido, marketers y editores de anuncios que producen sus propios ads con IA.
- Gente que conversa en español (o su idioma) pero entrega **prompts en inglés** porque los modelos rinden mejor así (ver §5).
- No necesitas ser ingeniero. Aquí se explica **el porqué**, no solo el qué.

---

## 2. Qué incluye

Estructura del paquete (`DirectorIA-Cloud/`):

| Archivo | Para qué sirve |
|---|---|
| `README.md` | Este documento: qué es, qué incluye, cómo desplegarlo. |
| `SYSTEM_PROMPT.md` | **El cerebro.** Las instrucciones del agente + el disparo del onboarding. Es lo que se pega como "system" o `CLAUDE.md`. |
| `ONBOARDING.md` | El mini-cuestionario de primer contacto y la lógica de adaptación por perfil de usuario. |
| `PERFIL_USUARIO.md` | **La memoria persistente.** Donde vive el perfil del usuario entre sesiones (el agente lo lee al arrancar para no repetir el onboarding). Plantilla vacía = primer arranque. |
| **knowledge/** | La biblioteca de conocimiento que el agente consulta: |
| `knowledge/00-metodologia-promptdirector.md` | El método PromptDirector: salida en 2 partes (JSON brief + NL), tokens `@imageN`, reglas de rigor. |
| `knowledge/01-higgsfield-mcp.md` | Cómo habla el MCP: flujo de subida de medias, `get_cost`, workspaces. |
| `knowledge/02-modelos-imagen.md` | nano_banana_pro, soul_2 / soul_cinematic, gpt_image_2, marketing_studio_image — cuándo usar cada uno y sus parámetros. |
| `knowledge/03-modelos-video.md` | kling3_0, seedance_2_0, wan2_7 — modos, resoluciones, aspect ratio vertical, audio. |
| `knowledge/04-consistencia-personaje.md` | Orden de refs, anchor words, skin-tone bleed, wardrobe lock, re-anclaje. |
| `knowledge/05-biblia-hiperrealismo.md` | La regla de oro: cada still debe leerse como un ad real. Coda fotográfica, biblioteca de film stock. |
| `knowledge/06-direccion-movimiento.md` | Restraint como cine: qué movimiento sí y qué "magia Marvel" evitar. Prep de lipsync. |
| `knowledge/07-troubleshooting.md` | Las trampas: preset auto-recommend, rate limit, refs dropeadas por Soul, etc. |
| `knowledge/08-recetas-pipeline.md` | Pipelines completos de principio a fin (ref → still → vídeo → lipsync). |
| `knowledge/09-vocabulario-plano-y-modo-organico.md` | Vocabulario de tipo de plano/ángulo de cámara, el modo ORGANIC (contenido de creador/influencer sin pulir) y notas de portabilidad a Midjourney/Flux/Freepik/GPT-Image sin MCP. |
| `knowledge/10-bullet-time-y-secuencias-largas.md` | Piezas largas de un solo plano con varios objetos/personas: world-space lock, bloqueo de props por bloques, ruta de cámara separada, causalidad física en cadena. |
| `knowledge/11-fpv-camara-invisible-y-fuerza-compartida.md` | Piezas FPV/POV de un solo plano donde la cámara es invisible y todo el frame obedece a una única fuerza física que cambia de dirección (contrato de "fuerza compartida", opuesto al world-space lock del 10). |
| **templates/** | Plantillas en blanco para rellenar (en inglés, ver §5): |
| `templates/prompt-imagen.md` | Esqueleto del prompt de imagen (JSON brief + NL). |
| `templates/prompt-video-motion.md` | Esqueleto de prompt de vídeo con dirección de movimiento. |
| `templates/ref-stack-personaje.md` | Cómo ordenar y rolar las refs de un personaje recurrente. |
| `templates/talking-head-lipsync.md` | Plantilla de talking head + preparación para lipsync. |
| **examples/** | Casos resueltos completos para copiar el patrón: |
| `examples/ejemplo-ugc-personaje.md` | UGC con personaje recurrente e identidad bloqueada. |
| `examples/ejemplo-editorial-cinematografico.md` | Pieza editorial/cinematográfica hiperrealista. |

---

## 3. Cómo desplegarlo

DirectorIA Cloud es **portátil**: el mismo paquete funciona en cuatro entornos. Elige el tuyo.

### a) Proyecto de Claude (claude.ai → Projects)

El entorno recomendado si no programas. Es conversacional puro.

1. Entra en [claude.ai](https://claude.ai) → **Projects** → **Create project**.
2. Abre las **instrucciones del proyecto** (*Set project instructions* / *Custom instructions*).
3. Copia **todo el contenido de `SYSTEM_PROMPT.md`** y pégalo ahí. Eso convierte al proyecto en el director de arte.
4. Sube como **conocimiento del proyecto** (*Project knowledge* → *Add content*) todos los archivos de:
   - `knowledge/` (los 10 ficheros `00`–`09`)
   - `templates/` (los 4)
   - `examples/` (los 2)
   - y `ONBOARDING.md`
5. Abre un chat nuevo en el proyecto y di "hola" o "empecemos". El agente arrancará el onboarding (§4).

> En este entorno el agente **no genera imágenes él mismo**: te entrega el prompt y tú lo pegas en Higgsfield/Freepik. Es el flujo más simple y el que menos puede romperse.

### b) Claude Code / Cursor / Codex (con o sin MCP)

El entorno potente: aquí el agente puede **generar de verdad** si tiene el MCP de Higgsfield conectado.

1. Crea una carpeta de trabajo para tus producciones.
2. Coloca `SYSTEM_PROMPT.md` en la **raíz** del proyecto con el nombre que cada herramienta espera:
   - **Claude Code** → renómbralo a `CLAUDE.md`.
   - **Cursor** → `.cursorrules` (o `CLAUDE.md` si usas su modo compatible).
   - **Codex** → el archivo de instrucciones de proyecto equivalente (p. ej. `AGENTS.md` — *verificar* según tu versión).
3. Copia las carpetas `knowledge/`, `templates/` y `examples/` **al lado**, dentro del mismo proyecto, para que el agente las pueda leer.
4. **Si tienes el MCP de Higgsfield conectado**, el agente podrá subir refs, lanzar `generate_image` / `generate_video` y consultar coste. Si no lo tienes, funciona exactamente como el entorno (a): te entrega prompts para pegar a mano.

> Comprobación rápida del MCP: pídele "lista mis workspaces" o "dame el balance". Si responde con datos reales, el MCP está vivo. Recuerda: **cambiar de workspace invalida todos los `media_id`** — habrá que re-subir las refs.

### c) GPT personalizado / otro LLM con subida de archivos

1. Crea un **GPT personalizado** (o el equivalente de tu LLM con *knowledge* / *files*).
2. Pega **`SYSTEM_PROMPT.md`** en el campo de **instrucciones** del GPT.
3. Sube el resto como **knowledge / archivos del GPT**: todo `knowledge/`, `templates/`, `examples/` y `ONBOARDING.md`.
4. Inicia conversación; arranca el onboarding (§4).

> Sin MCP, este entorno entrega prompts pero no genera. Útil si ya vives en otro ecosistema de LLM. Ten en cuenta que un GPT externo **no conoce los detalles internos del MCP de Higgsfield** más allá de lo documentado en `knowledge/`, así que trátalo como generador de prompts, no como ejecutor.

### d) Uso manual, sin agente

No necesitas ningún LLM para aprovechar el paquete.

1. Abre `knowledge/05-biblia-hiperrealismo.md` y `knowledge/00-metodologia-promptdirector.md` para entender el criterio.
2. Abre la plantilla que toque en `templates/` (imagen, vídeo, personaje o talking-head) y **rellénala a mano**, campo por campo.
3. Copia el párrafo en lenguaje natural resultante (termina siempre en `Photographic realism, no text.`) y pégalo en la web de **Higgsfield** o **Freepik**.
4. Para los parámetros del modelo (resolución, aspect ratio, calidad), consulta `knowledge/02-modelos-imagen.md` y `knowledge/03-modelos-video.md` y selecciónalos en la UI.

> Es más lento, pero el resultado es el mismo prompt riguroso. Los `examples/` te sirven de muleta: copia uno y sustituye.

---

## 4. Primer arranque (onboarding)

La primera vez que hables con el agente, **no te lanzará un prompt en frío**. Hará un **mini-cuestionario** (definido en `ONBOARDING.md`) para auto-configurarse a tu caso: qué produces (ads de producto, UGC, editorial cinematográfico…), si trabajas con un **personaje recurrente**, si tienes el **MCP de Higgsfield conectado** o solo quieres prompts, formato de salida (vertical 9:16 vs. 16:9), y nivel de detalle que quieres ver.

Con tus respuestas, el agente ajusta su comportamiento por defecto: el modelo que propondrá primero, si exige refs de identidad, el aspect ratio por defecto, etc. **Solo tienes que contestar.** Si te saltas el cuestionario, asume defaults sensatos y te lo recuerda cuando hagan falta datos.

---

## 5. Nota de idioma

**Conversa en tu idioma. El prompt final va en inglés.**

- Toda la **conversación, las explicaciones y las preguntas** son en **español** (o el idioma en que escribas). El paquete está pensado para creadores hispanohablantes.
- Pero **todos los prompts finales y las plantillas están en inglés**. No es capricho: **los modelos de imagen y vídeo rinden mejor con prompts en inglés** — el vocabulario fotográfico, los nombres de lentes, los film stocks y los términos de luz están mejor representados en sus datos de entrenamiento. Por eso el agente piensa contigo en español pero **entrega el prompt en inglés**.
- El JSON Decoded Brief también va en inglés (es lo que viaja a la API); el párrafo en lenguaje natural igual, y siempre cierra con `Photographic realism, no text.`

---

### En una frase

Pega `SYSTEM_PROMPT.md` como instrucciones, sube `knowledge/` + `templates/` + `examples/` como conocimiento, contesta el onboarding, y pídele tu primera escena. El resto del criterio vive en esos archivos — léelos cuando quieras entender el porqué.