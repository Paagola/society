<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Procesos de Reels del proyecto + evaluación de Higgsfield AI Motion Designer

**Fecha:** 2026-09-14
**Pedido:** (1) analizar todos los procesos de producción de Reels del proyecto; (2) investigar
[higgsfield.ai/ai-motion-designer](https://higgsfield.ai/ai-motion-designer) y qué aporta a los Reels.
**Coste de esta investigación:** 0 créditos (solo lectura de docs, web y catálogo MCP).

---

## Parte 1 — El proceso de Reels tal como está hoy

### 1.1 El flujo, en una tabla

| # | Paso | Herramienta | Coste | Puerta de decisión |
|---|---|---|---|---|
| 0 | Buscar plantillas | Pinterest/IG/Pexels → `plantillas/AAAA-MM-DD/` + `sheet_*.jpg` | 0 | **Filtro de contenido antes que puntuación** (vino, brasa, cocina tradicional, rural) |
| 1 | Analizar plantilla | `ffmpeg select='gt(scene,0.2)'` (umbral 0,03 si el fondo no cambia) + `video_analysis_create` + `virality_predictor` (≤16 s) | 0 | — |
| 2 | Guion | `instagram/reel_NN_*.md`: estructura + ritmo, nunca look ni platos | 0 | Regla 12: fotograma 1 con acción empezada, rótulo desde t=0, primer plano 2–2,5 s. «¿Un vecino lo reenviaría?» |
| 3 | Referencias | Fotos reales de `imagenes/{local,comida,vinos,tartas}` + fotograma medio de cada plano de la plantilla | 0 | Regla 1 (nada inventado), regla 10 (plantilla manda en cámara/luz) |
| 4 | Imágenes fijas | `nano_banana_pro` 2k 9:16, JSON Decoded Brief de 14 campos, batches de 4 | 2 cr/imagen | — |
| 5 | **Aprobación del lote** | Conversación | 0 | **Bloqueante** (regla 1 de vídeo) |
| 6 | Animar | Solo planos con movimiento propio. `kling3_0 pro` 3 s (5,25) · `seedance_2_0` std 1080p 4 s con start+end image (36) · `veo3_1 preview high` 8 s para persona a cámara (58). Prompt PRESERVE/MOTION/CAMERA/FILM GRADE | 5–58 cr/clip | `get_cost` antes de cada tanda. Máx. 2 vídeos simultáneos |
| 7 | Montaje | After Effects por MCP (`mcp-aftereffects`, kumoproductions): recortes, push/pull, whips, shock cut, grade por plano, Bodoni MT Regular + filete + sombra, render H.264 | 0 | Contraste texto/fondo en todo el tramo |
| 8 | Validar y documentar | `virality_predictor` (máx. 2 iteraciones) + actualizar el `.md` | 0 | — |
| 9 | Publicar y medir | IG insights a 6 h y 48–72 h; compartir a Stories siempre | 0 | Objetivo: abandono a 3 s < 65 % |

### 1.2 Formatos ya producidos o guionizados

| Reel | Formato | Estado / lección clave |
|---|---|---|
| 01 carne | Montaje rápido ~1 s/plano + shock cut B/N | 40/38. Paneos pedidos al modelo → morphing |
| Vinos blancos | 9 cortes de botellas | Peor retención del trimestre (82,8 % abandono) |
| 02 mesa que se llena | Acumulación | Bloqueado (concepto/platos/créditos) |
| 03 lo hacemos, lo disfrutas | Brasa real + planos generados | **Mejor retención de la cuenta (68,1 %)**, 0 compartidos |
| 04 volvemos el 16 | Anuncio + fecha | Patrón que más viaja en la cuenta |
| 05 media carta cenital | Cenital | — |
| 06 para compartir | Mismo plano, cambia el plato | 2 vídeos Seedance (inicio/fin) + fijos intermedios |
| 07 brindis | Vino + brasa + sala | Prompt maestro escrito, sin generar |

### 1.3 Dónde se va el esfuerzo (y el dinero)

1. **Créditos:** casi todo en el paso 6. Un Reel tipo 06 son ~72 cr de vídeo + ~16 de imágenes.
2. **Tiempo:** en los pasos 4–5 (iteraciones de imagen por elementos inventados) y en el paso 7
   (cada rótulo, máscara y animación se hace operación a operación por MCP).
3. **Lo medido que manda:** el montaje **no** mueve la puntuación de Higgsfield, pero **sí** movió la
   retención real de Instagram (−7 pp en el Reel 03). El alcance lo mueven los **compartidos**, y esos
   dependen de que haya noticia (fecha, precio, novedad), no del acabado.

### 1.4 Inconsistencias en la documentación — ✅ CORREGIDAS el 2026-09-14

Detectadas al cruzar los ficheros y **corregidas todas el mismo día**, a petición del usuario. Cada
corrección deja una nota «Corregido el 2026-09-14» en el fichero, con el porqué. Al corregir
aparecieron cuatro más (12-15), también resueltas.

**Se dejan sin tocar, a propósito:** los guiones ya producidos (Reels 04, 05, 06 e historias del
09-09) conservan sus prompts de iPhone como **registro de lo que se generó**; y la negrita del Reel 03
no es contradicción: fue un ajuste de esa pieza (efecto tiza), y los Reels posteriores volvieron al
Regular.

| # | Dónde | Qué dice | Qué está vigente |
|---|---|---|---|
| 1 | Skill `after-effects-reels` §5ter caso 3 | Recomienda `minimax_hailuo` para manos | **Prohibido** (regla 15 de vídeo). Usar `seedance_2_0` |
| 2 | `documentación.md` Parte II §4 punto 1 y skill §5bis | Pedir «handheld drift» como micro-movimiento | **Prohibido pedir handheld** (regla 11 de vídeo): slider motorizado, recorrido cuantificado |
| 3 | Skill §5bis final | «Bajar de `pro` a `std` y ahorrar un 14 %» | Contradice «calidad primero»: `std` tiene resolución sin verificar |
| 4 | `reglas_videos.md` regla 2bis | Keyframes a 1080p, no 2K | 2k (cuesta lo mismo). Corregido en Parte II, no en la regla |
| 5 | `reglas_videos.md` regla 2 | Kling 3 s ≈ 7,5 cr | Medido: 5,25 cr (`pro`) |
| 6 | `reglas_videos.md` regla 4 | Coste de Video Analysis «no comprobado» | Gratis en Plus (CLAUDE.md) |
| 7 | `instagram/reel_07_brindis_vino_brasa.md` §0 y prompt maestro | Acabado de iPhone, «zero film grain, no cinematic colour grade» | **Regla 17 invertida el 2026-09-10**: acabado editorial dramático. El prompt hay que reescribirlo antes de generar |
| 8 | `informes/2026-09-09_efecto-bullet-higgsfield.md` §4 | FILM GRADE de iPhone | Igual que el 7 |
| 9 | Skill §9 | «Una cara humana… bloqueada por la regla 2» | Regla 2 rebajada a preferencia el 2026-09-08 |
| 10 | Skill §8 | `BodoniMTBlack` como «primera opción» | Estándar aprobado: `BodoniMT` Regular |
| 11 | Skill §13 y memoria «Edición en CapCut» | El cliente monta en CapCut | CLAUDE.md paso 7: montaje en AE por MCP |
| 12 | `CLAUDE.md` paso 4 | «el acabado de iPhone (regla 17) prevalece» | Acabado editorial dramático |
| 13 | `reglas_imagenes.md`, perfil «Estilo / nivel» | Fotos y vídeo con acabado de iPhone | Dramático, con historial |
| 14 | `reglas_imagenes.md`, tabla de la regla 23 (`film_stock`) | `iPhone capture, no film grain` | Valores de la regla 17 vigente |
| 15 | `instagram/reel_02_mesa_que_se_llena.md` §7 | Handheld micro-drift, `minimax_hailuo`, `kling3_0 std` | Slider/trípode, `seedance_2_0`, `kling3_0 pro`; aviso de que falta pasarlos a la plantilla de 4 bloques |

---

## Parte 2 — Qué es realmente «AI Motion Designer»

### 2.1 Son tres productos distintos con nombre parecido

| Producto | Qué es | ¿Lo tenemos ya? |
|---|---|---|
| **Plugin Higgsfield para AE/Premiere** | Panel (`Window → Extensions → Higgsfield`) con: generar vídeo/imagen al timeline, Remove Background, Reframe (9:16 con tracking de sujeto), Upscale a 4K/8K, Draw to Edit, Edit Video | **No** |
| **AI Motion Designer** (el enlace) | Agente que construye motion graphics **dentro de la composición abierta de AE**: títulos, logo reveals, transiciones, promos, expresiones. Todo queda como capas nativas editables. Recrea un diseño desde una imagen de referencia y **una animación desde un vídeo de referencia**. Se lanza desde ChatGPT (`/use-after-effects`, «Powered by GPT 6 Astra») **o desde Claude vía el bridge MCP** | **No** |
| **AI Motion Design / Vibe Motion** | Motor code-to-video en la web: tipografía cinética, infografías, logo reveals, hasta 4K. Terceros hablan de 8–60 cr por pieza (no verificado) | No, pero el MCP actual trae su equivalente: workflow **`video-editing` (Higgsedit)** |

### 2.2 El detalle técnico que importa

- El MCP conectado en este proyecto es `https://mcp.higgsfield.ai/mcp` (verificado en
  `~/.claude.json`). Según Higgsfield: *«The regular MCP endpoint generates assets but does not drive
  After Effects.»* **Para Motion Designer hace falta un segundo conector: `bridge.higgsfield.ai/mcp`**,
  y el plugin instalado en AE.
- Requisitos: **After Effects 2024 (24.0)** según el blog, **2025 (25.0)** según la página del plugin
  — contradictorio, verificar con `ae_version_info`. Windows 10/11 soportado. Conexión permanente.
- Coste: usa los mismos créditos de Higgsfield. **No hay tabla de precios del agente** ni se sabe si
  la construcción de motion graphics (sin generar píxeles) cobra créditos.
- **Ya tenemos el 70 % de esto**: `mcp-aftereffects` hace composiciones, capas, keyframes, texto,
  máscaras, track mattes, efectos y render desde Claude Code. Motion Designer no abre una capacidad
  nueva de control de AE; lo que añade es (a) un agente especializado en motion design que decide él
  la coreografía, (b) **recrear animaciones desde un vídeo de referencia** y (c) el panel de IA en el
  timeline (Remove Background, Reframe, Upscale).

### 2.3 Lo que hay en el MCP actual y no se estaba usando

- **Workflow `video-editing` (Higgsedit):** montaje y motion graphics renderizados en un sandbox en la
  nube — texto animado, títulos, captions, máscaras/mattes, cámara 2.5D, motion blur, H.264/HEVC.
  Sirve como **plan B sin After Effects abierto**, pero no deja proyecto editable en AE ni editor
  alojado.
- **App «Match Cut + Tracelab»** (`app_id 3a69aa1d-8456-4705-92b5-b0616b03e642`): 27 modos de
  plantillas. Casi todos son estéticas incompatibles con la marca (CRT, VHS, glitch, térmico, pop-art,
  comentarios de redes). Interesantes solo dos:
  - `create_productcut`: recorta un producto y lo anima sobre fondos; **acepta hasta 24 fondos
    propios**, así que el plato podría pasar por fotos reales del local (sala, barra, chimenea,
    terraza). **No tiene parámetro de resolución** → 1080p sin verificar → solo prueba.
  - `create_logocut`: logo sobre fondos que cambian rápido. Mismo problema de resolución.

---

## Parte 3 — Qué se podría hacer con Motion Designer en los Reels de Torre de Vega

Ordenado de más a menos valor para este cliente. Cada idea está cruzada con las reglas y el plan de
contenido (`instagram/plan_contenido_2026-09_a_12.md`).

### 3.1 Alto valor

| # | Uso | Por qué encaja | Reglas a vigilar |
|---|---|---|---|
| A | **Paquete gráfico reutilizable de marca**: lockup de titular + filete + marca, placa de cierre y rótulo de plato como plantillas (Essential Graphics / MOGRT) que se rellenan por Reel | El plan exige **3 piezas/semana**; hoy cada rótulo se construye a mano por MCP. Montarlo una vez y reutilizarlo es lo que hace sostenible la frecuencia | Tipografía aprobada (Bodoni MT Regular, tracking 400/640, sombra suave, sin contorno). Hay que dárselo como especificación cerrada: el agente **no** elige estilo |
| B | **Texto revelado por el movimiento** (regla 20, «al cliente le gustan»): el nombre del plato aparece al retirarse la mano, o queda detrás del plato | Hoy exige duplicar clip + máscara + rotoscopia por MCP. El panel trae **Remove Background sobre vídeo** para sacar la mano/plato con alfa y meter el texto entre capas | ⚠️ `remove_background` ya falló con plato blanco y mano en la carta web (se los comió). Probar primero en el Reel 06 antes de fiarse |
| C | **Recrear la animación de texto de una plantilla** desde su vídeo | Es la regla 10 aplicada al montaje: la plantilla manda en la coreografía (cuándo entra, cómo se mueve), el cliente en la tipografía | Nunca copiar la marca/rotulación ajena literal (Reel 07 §0) |
| D | **Anuncio + fecha / precio en pantalla**: «16 DE SEPTIEMBRE», «CARTA DE OTOÑO DESDE EL [fecha]», «GAMBAS AL AJILLO · 14 €» con contador animado | Es **el único patrón que ha generado compartidos** en esta cuenta, y los compartidos son el motor de alcance medido | Las fechas y precios los da el cliente por escrito; no se inventan |
| E | **Reframe 9:16 con tracking + Upscale** del metraje real del cliente | La regla 22 obliga a sacar brasa, fuego y humo de vídeo real. Si Jose graba en horizontal o a baja resolución, esto lo rescata a 1080p sin generar nada | Verificar la resolución de salida real con `ffprobe` antes de dar por bueno |

### 3.2 Valor medio

| # | Uso | Nota |
|---|---|---|
| F | **Subtítulos animados** para el formato de persona a cámara (el mejor medido, 45/45) | El habla dispara las redes auditiva y del lenguaje; los subtítulos refuerzan la del lenguaje. Alternativa ya disponible: workflow `subtitles` del MCP |
| G | **Infografía animada de trazabilidad** (carrusel/Reel del Caldelana, semana 12–19 oct): de dónde viene la carne, en un mapa | Es la especialidad del producto. Solo con datos reales del proveedor |
| H | **Pantalla partida** (la plantilla 01 lo era) y transiciones de marca coherentes entre Reels | Hoy se hace a mano; el agente acelera |

### 3.3 Lo que NO va a hacer, para no venderlo mal

- **No sube el techo de viralidad.** Está medido: el montaje no mueve la puntuación de Higgsfield y el
  alcance lo deciden los compartidos. Motion Designer es montaje.
- **No resuelve el material.** Los problemas caros del proyecto (morphing de comida, manos, elementos
  inventados, fuego) están en la generación de vídeo, no en los gráficos.
- **No sustituye a las puertas de aprobación.** Rótulos y copy siguen siendo del cliente.
- **Riesgo de estética de plantilla genérica**: los ejemplos del producto son promos tech con
  tipografía gruesa y animación enérgica — exactamente lo que el cliente rechazó («esos textos siguen
  siendo horribles»). Hay que forzar el estándar aprobado en cada petición.

---

## Parte 4 — Recomendación y piloto

**Recomendación:** merece una prueba acotada, no un cambio de flujo. Mantener `mcp-aftereffects` como
herramienta principal hasta comparar.

### Piloto propuesto (1 sesión)

1. Verificar versión de AE: `ae_version_info` (necesita ≥ 24.0 o ≥ 25.0, ver bloqueo 1).
2. Instalar el plugin de Higgsfield para AE y añadir el conector en Claude Code:
   `claude mcp add higgsfield-bridge --transport http https://bridge.higgsfield.ai/mcp` (nombre
   provisional; comprobar el comando exacto en la guía oficial de Higgsfield) y reiniciar la sesión.
3. `balance` antes y después de cada prueba (no hay preflight de coste para el agente).
4. **Prueba 1 — Paquete gráfico (idea A):** pedir el lockup titular + filete + marca y la placa de
   cierre con la especificación exacta de `documentación.md` §7. Criterio de éxito: capas nativas
   editables, Bodoni MT Regular, sin contorno, animación fade 0,45 s + subida 14 px.
5. **Prueba 2 — Texto revelado (idea B)** sobre un clip ya aprobado del Reel 06: Remove Background de
   la mano + rótulo del plato entre capas. Criterio: la mano y el plato no pierden bordes.
6. **Prueba 3 — Recrear animación (idea C)** desde `plantillas/2026-09-08/07_brindis-vino-y-plato-flambeado_11s.mp4`,
   con nuestra tipografía.
7. Comparar con lo mismo hecho por `mcp-aftereffects`: tiempo, fidelidad a la especificación y
   créditos. Documentar el resultado en la skill `after-effects-reels`.

**No usar los dos agentes a la vez sobre el mismo proyecto de AE**: ambos escriben capas y grupos de
deshacer; guardar (`ae_save_project`) antes de pasar de uno a otro.

---

## Bloqueos y preguntas abiertas

1. **Versión de After Effects instalada** — requisito contradictorio en las fuentes de Higgsfield
   (24.0 vs 25.0). Sin verificar.
2. **Coste del agente Motion Designer** — no publicado; no admite `get_cost`. Solo se sabe midiendo
   el saldo.
3. **Si el bridge funciona igual desde Claude Code que desde ChatGPT** — la página dice que sí, pero
   la publicidad y el comando `/use-after-effects` son de la integración con ChatGPT (GPT 6 Astra).
   Sin probar.
4. **Remove Background sobre vídeo con plato blanco y manos** — la herramienta de imagen falló en la
   carta web; no hay prueba sobre vídeo.
5. **`create_productcut` / `create_logocut`** — sin control de resolución; no aptos para entrega
   hasta medir una salida real ≥ 1080×1920.
6. ~~Limpieza de las inconsistencias de §1.4~~ — **hecha el 2026-09-14** (15 en total).
7. **Estado de la conexión (2026-09-14):** AE 2026 instalado ✅ (cumple ambos requisitos, 24.0 y 25.0);
   conector `higgsfield-bridge` registrado en ámbito user ✅ (el endpoint existe: 401 con OAuth);
   **plugin sin instalar** ⛔ y bridge **sin autenticar** ⛔. El piloto está guionizado en
   [`instagram/reel_08_volvemos_miercoles_16.md`](../04-guiones-reels-reales/reel_08_volvemos_miercoles_16.md).

## Fuentes

- [AI Motion Designer for After Effects — Higgsfield](https://higgsfield.ai/ai-motion-designer)
- [Blog: AI Motion Designer, Higgsfield Meets After Effects Through GPT](https://higgsfield.ai/blog/ai-motion-designer-after-effects-gpt)
- [Blog: Higgsfield Inside Adobe After Effects](https://higgsfield.ai/blog/higgsfield-after-effects)
- [Higgsfield Plugins for Premiere Pro & After Effects](https://higgsfield.ai/plugins/after-effects)
- [AI Motion Design — Higgsfield](https://higgsfield.ai/ai-motion-design)
- [Blog: AI Motion Design, When Video Generation Meets Code](https://higgsfield.ai/blog/AI-Motion-Design-When-Video-Generation-Meets-Code)
- [Vibe Motion Higgsfield (gaga.art, tercero, cifras no verificadas)](https://gaga.art/blog/vibe-motion-higgsfield/)
- Catálogo MCP consultado el 2026-09-14: `get_workflow_instructions` (catálogo y `video-editing`),
  `apps_search`, `apps_describe` sobre Match Cut + Tracelab.
