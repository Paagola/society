# Proceso: Reel "3 vinos blancos" — Torre de Vega

**Fecha:** 2026-09-04
**Resultado:** Reel vertical (9:16) de ~10-11s, 9 escenas de ~1,2s cada una, montado finalmente por el cliente en CapCut sobre un template de referencia.
**Carpeta de material:** `imagenes/generadas/reel_vinos_blancos/`

Este documento recoge el flujo completo seguido, para poder repetirlo con otra categoría de vino (tintos, rosados...) o con otro grupo de 3 productos.

---

## 0. Flujo en una frase

**Plantilla real → análisis de escenas → elección de producto con foto real → 9 imágenes ancladas al local real → 9 clips animados con Kling → recorte y montaje.**

---

## 1. Punto de partida: análisis de una plantilla que ya funciona

En vez de inventar un guion desde cero, el cliente aportó un vídeo de referencia (una plantilla de Reel que le había gustado, formato "producto de vino", ritmo rápido, ~9-10 cortes de ~1s).

**Herramienta:** `video_analysis_create` (MCP Higgsfield) — análisis escena por escena de un vídeo subido o de una URL de YouTube.

- Subida del vídeo local: `media_upload` → `curl PUT` a la URL prefirmada → `media_confirm`.
- Lanzar análisis: `video_analysis_create(video_input_id=...)` → devuelve `status: queued`.
- Sondear cada 30-60s con `video_analysis_status` hasta `completed` (tardó ~3-5 min).
- El resultado da, por escena: `shot_type`, `visual` (descripción detallada), `audio`, y timestamps de inicio/fin.

**Resultado del análisis** (plantilla real, 9 escenas ~1s cada una): apertura de botella en balcón nocturno, vertido en copa con decantador, brindis cenital de varias manos, plano de barra con botellas, mano sosteniendo botella a cámara, mano sacando botella de un cajón, vertido al aire libre, brindis POV sobre comida, copa grande con cartel de precio de fondo.

Esa estructura de 9 "tipos de plano" es la que se reutilizó, sustituyendo cada elemento por el equivalente real de Torre de Vega.

---

## 2. Elección de producto: 3 vinos con foto real de botella

**Regla dura aplicada (`imagenes/reglas_imagenes.md`, regla 1):** nunca generar una etiqueta o botella que no tenga foto real de referencia — inventar el diseño de una etiqueta cuenta como "romper la promesa" de fidelidad al cliente real.

Categoría elegida: **Vinos Blancos** (de las categorías de la carta: blancos, rosados, generosos, cava, champagne, tintos D.O. Castilla y León).

Al revisar `imagenes/vinos/`, dos de los tres blancos inicialmente propuestos (**José Pariente** y **Barbadillo Blanco**) no tenían foto real de botella — solo aparecían nombrados en la foto de la carta. Se sustituyeron por otros dos blancos que **sí** tenían foto real:

| Vino final | D.O. | Foto real usada |
|---|---|---|
| **Ossian Quinta Luna** | Castilla y León | `quintaluna-frente.jpg`, `quintaluna-lado.jpg` |
| **Finca Viñoa** (= "Treixidura Finca Viña" en carta) | Ribeiro | `finca-vinoa.jpg` |
| **Azzulo Semidulce** | Campo de Borja | `azzulo.jpg`, `azzulo2.jpg` |

**Lección para la próxima vez:** antes de prometer qué 3 productos protagonizan un Reel, comprobar primero qué fotos reales de producto existen — puede obligar a cambiar la selección "ideal" por la selección "con referencia real disponible". Alternativa más rápida si el cliente quiere sí o sí un producto sin foto: pedirle una foto rápida de móvil de esa botella antes de generar nada.

**Lección de texto en etiqueta:** al elegir entre varias fotos reales de la misma botella (frontal con poco texto vs. trasera con mucho texto legal), **priorizar la que tenga menos texto visible** — los modelos de imagen generan con más fiabilidad cuanto menos texto legible tiene que reproducir; una etiqueta trasera con párrafos pequeños es la fuente más probable de erratas.

---

## 3. Ubicaciones: de "cualquier rincón real" a "solo los rincones elegantes"

Primera pasada: se usó la barra con la estantería de licores variados (`barra_botellas.jpg`) para el plano de "3 botellas juntas". **Rechazado por el cliente** ("se ve poco profesional").

Ajuste: se sustituyó por zonas ya validadas como elegantes por el propio cliente en generaciones anteriores:
- **Repisa de la chimenea** (`chimenea-restaurante.jpg`) — ya tenía 2 botellas de vino reales colocadas ahí de antes, así que era una referencia perfecta para el plano de "botellas en display".
- **Mesa vestida con mantel** (`mesa-chimenea.jpg`, `mantel_blanco.jpg`).
- **Comedor amplio ya aprobado** (`imagenes/generadas/local_comedor/comedor_01_editorial_amplio.png` y `comedor_02_mesa_puesta_bokeh.png`) — generaciones previas ya validadas por el cliente, reutilizadas aquí como referencia de "nivel de acabado", no de geometría nueva.

**Lección:** para producto premium (vino), usar por defecto las zonas ya aprobadas como "elegantes" del local (chimenea, mesa vestida, comedor amplio) en vez de zonas funcionales/de trabajo (barra de licores, cocina) — aunque sean reales, transmiten un nivel distinto.

---

## 4. Generación de las 9 imágenes clave

**Modelo:** `nano_banana_pro` (preserva identidad de producto/etiqueta desde referencias — ver `directoria-cloud/knowledge/02-modelos-imagen.md`).
**Parámetros fijos:** `resolution:"2k"` (regla 12 del cliente — nunca 4k), `aspect_ratio:"9:16"`.
**Metodología de prompt:** JSON Decoded Brief + párrafo NL en inglés (`directoria-cloud/knowledge/00-metodologia-promptdirector.md`), modo **ORGANIC** (natural/handheld, no editorial de estudio — ajuste pedido explícitamente por el cliente a mitad de proceso).

**Coste:** ~2 créditos/imagen (con 3-4 refs, 2K).

### Reparto final de las 9 escenas

| # | Escena (plano) | Ubicación real | Vino |
|---|---|---|---|
| 1 | Descorche, entrada de noche | Fachada/entrada (`exterior.png`) | Azzulo |
| 2 | Sirviendo en copa | Mesa junto a chimenea (`mesa-chimenea.jpg`) | Finca Viñoa |
| 3 | Brindis cenital (4-5 manos) | Mesa vestida con comida | Quintaluna |
| 4 | 3 botellas juntas | Repisa de la chimenea (`chimenea-restaurante.jpg`) | Los 3 |
| 5 | Mano sosteniendo botella a cámara | Mesa vestida, vela desenfocada | Azzulo |
| 6 | Mano cogiendo botella de la mesa | Mesa junto a chimenea | Finca Viñoa |
| 7 | Sirviendo en terraza de día | Terraza (`exterior.png`, luz diurna) | Finca Viñoa |
| 8 | Brindis POV (3 manos) | Comedor con mantel | Quintaluna |
| 9 | Copa grande, camarero de fondo sin cara | Comedor amplio (`comedor_01`) | Azzulo |

**Reglas del cliente aplicadas en cada prompt** (ver `imagenes/reglas_imagenes.md`):
- Personal del local sin cara nunca (regla 2) — solo manos/brazos.
- Balance de blancos neutro, CCT ~4000-4300K en vez de 2800-3000K, para evitar el "amarillo de IA" (regla 9ter).
- Una sola exposición realista, sin aspecto HDR (regla 9quinquies).
- Negativos repetidos en cada regeneración, no solo la corrección nueva (regla 9quater).

### Incidencias corregidas durante el proceso

1. **Cartel de la entrada "roto"** (escena 1): la primera generación mostró una raya de luz vertical cruzando el texto del cartel "TORRE DE VEGA", leyéndose como una grieta. Se corrigió regenerando con un negativo explícito (`no cracked or broken sign, no vertical light streak or flare bar crossing the sign`) — el cliente detectó el fallo mirando la imagen, no algo que se hubiera pillado solo con la checklist de reglas.
2. **Erratas de texto en etiquetas** (Azzulo trasera: "BODECAS"/"SPIIN" en vez de "BODEGAS"/"SPAIN"; Finca Viñoa: "RIREIRO" en vez de "RIBEIRO"): fallo típico de los modelos de imagen al reproducir texto pequeño. Se corrigió en el caso del Azzulo pidiendo explícitamente el texto correcto entre comillas en el prompt. Lección aplicada de cara al futuro: usar siempre la referencia con menos texto visible (ver §2).

---

## 5. Animación de las 9 imágenes a vídeo

**Modelo:** `kling3_0`, `mode:"pro"` (1080p), `aspect_ratio:"9:16"` (ningún modelo de vídeo de Higgsfield auto-detecta el aspect ratio del `start_image`, hay que forzarlo siempre).

### Coste real comprobado (`get_cost:true`)

| Modelo | Duración | Coste |
|---|---|---|
| Kling 3.0 pro | 5s (default) | 12,5 créditos |
| **Kling 3.0 pro** | **3s (mínimo permitido)** | **7,5 créditos** — el que se usó |
| Seedance 2.5 | 4s (mínimo permitido) | 36 créditos |

**Duración mínima real de Kling: 3 segundos** (no existe la opción de pedir 1s directamente — rango real 3-15s). Como el objetivo final eran clips de ~1s por escena, se generó a 3s y se recortó el mejor tramo en la fase de edición (ver §6). Con 9 escenas a 3s: **~67,5 créditos** en total para toda la animación (más los ~18 créditos de las 9 imágenes).

### Metodología de motion prompt

Estructura de "beats" con timestamps (`directoria-cloud/knowledge/06-direccion-movimiento.md`), **un solo beat principal por clip**, cámara bloqueada con solo micro-shake natural de móvil (no dolly, salvo la escena 4 que sí llevó un push-in del 3-4% por ser un plano de producto estático). Bloque de negativos fijo contra gimmicks de fantasía (brillos, chispas, levitación, props que rotan solos).

Ejemplo de beat usado (escena 1, descorche):
```
0.0-1.0s — hand holds still, tension building on the grip
1.0-2.5s — single deliberate pull: cork begins to slide free
2.5-4.0s — cork pops free, hand settles
```

**Incidencia:** la escena 9 (copa grande + camarero de fondo) disparó una recomendación automática de preset ("IN THE DARK") en vez de ejecutar el prompt literal — se resolvió reenviando la misma llamada con `declined_preset_id` para forzar la generación tal cual se había pedido. Lo mismo volvió a pasar con la escena 10 de cierre (mismo preset, mismo fix).

### Correcciones tras feedback del cliente sobre el montaje ya publicado (2026-09-05)

El cliente montó los 9 clips en su template de CapCut favorito (mejor resultado que el montaje automático por ffmpeg) y, viéndolo terminado, reportó dos fallos concretos con capturas:

1. **Escena 1 (descorche entrada noche):** el cartel del restaurante salía roto y con un nombre que no es el suyo ("TORRE DE VIORD" en vez de "TORRE DE VEGA"). Causa: el texto del cartel en el fondo, aunque correcto en el frame de partida, es un elemento de alto riesgo — cualquier reencuadre o generación posterior (incluida la animación a vídeo) puede degradar texto pequeño legible.
2. **Escena 7 (sirviendo en terraza de día):** el modelo inventó un cartel/valla blanca en blanco en el fondo que no existe así en la realidad — invención no anclada a ninguna foto real de esa ubicación exacta (incumplimiento de la regla 1).

**Fix aplicado — eliminar el riesgo de raíz en vez de corregir el texto:** en lugar de intentar que el modelo reproduzca el cartel correctamente otra vez, se rediseñó el encuadre de ambas escenas para que **ningún cartel, valla o texto legible entre en el plano en absoluto**:
- Escena 1 v2: mismo concepto (mano descorchando el Azzulo de noche) pero con un encuadre mucho más cerrado — de fondo solo quedan las luces de guirnalda y el bokeh de las mesas, el cartel queda fuera de cuadro por diseño. Ref usada: `exterior_gente.png` (en vez de `exterior.png`, que sí encuadraba el cartel).
- Escena 7 v2: se cambió la ubicación de la terraza exterior (con el riesgo del cartel/fachada) a un **interior junto a una ventana soleada** (`Mesas-restaurante.jpg`) — luz natural igual de válida para transmitir "de día", cero riesgo de cartel porque es un interior.

**Lección clave:** cuando un texto/cartel legible ha fallado más de una vez en la misma escena, la solución más fiable no es seguir puliendo el prompt para que lo reproduzca bien — es **rediseñar el encuadre para que ese elemento de riesgo quede directamente fuera de plano**.

**Incidencia secundaria en la v2 de la escena 7:** la primera regeneración coló sin querer un trozo de barbilla/boca de la persona en la esquina del encuadre (viola la regla 2 de "nunca cara"). Se corrigió bajando el encuadre explícitamente en el prompt ("crop starts at the upper arm, no head/chin/mouth/shoulders visible") — quedó perfecto a la segunda.

### Regla nueva incorporada: variedad de género en las manos (regla 13 de `reglas_imagenes.md`)

A raíz de esta ronda de correcciones, el cliente pidió una regla permanente: cuando aparece más de una mano en un mismo encuadre, deben ser de **géneros distintos entre sí** (para que no se lean como la misma mano clonada), y en el conjunto de la serie **deben predominar las manos de mujer** sobre las de hombre. Se aplicó ya en las dos escenas regeneradas (mano de mujer en ambas) y queda documentada como regla dura para toda generación futura.

### Escena 10 — clip de cierre añadido después

Tras el montaje inicial, el cliente pidió un clip adicional de cierre. Se generó una décima escena siguiendo el mismo criterio: copa de Finca Viñoa servida junto a la botella en la repisa de la chimenea (variación de la escena 4, plano más cerrado y sin manos, pensado como plano de "buenas noches"/firma de marca). Imagen con `nano_banana_pro` (2K) + animación con `kling3_0 pro`, `duration:3`, push-in del 3% muy suave. Archivo: `10_cierre_copa_fincavinoa_chimenea.mp4`.

---

## 6. Montaje final

Dos vías, en paralelo:

1. **Montaje propio (versión de referencia/backup):** se instaló `ffmpeg` (vía `winget install Gyan.FFmpeg`, ~100MB, no estaba instalado en el equipo) y se hizo el montaje por comandos:
   - Recorte de cada clip de 3s al mejor tramo de ~1,2s (el beat de movimiento diseñado en el prompt).
   - Concatenación de los 9 recortes en un único vídeo vertical (`ffmpeg -f concat`).
   - Música: pista royalty-free **"Glitter Blast" de Kevin MacLeod (incompetech.com)**, licencia CC-BY 3.0 — **requiere crédito en la descripción del post**: *"Music by Kevin MacLeod (incompetech.com) — Licensed under Creative Commons: By Attribution 3.0"*. Sincronizada y con fade-out al final.
   - Archivos resultantes en `imagenes/generadas/reel_vinos_blancos/`: `reel_vinos_blancos_v1.mp4` (sin música), `reel_vinos_blancos_v2_con_musica.mp4` (con música).

2. **Montaje final real (el que se usó):** el cliente cogió los 9 clips y los montó directamente sobre el template de CapCut que le había gustado desde el principio — resultado con el que quedó más contento que con el montaje automático por ffmpeg.

**Lección:** para este flujo, generar el material (imágenes + clips) fiel a la plantilla y dejar el montaje fino de ritmo/transiciones en manos del editor humano en CapCut da mejor resultado que automatizar el montaje entero — el ffmpeg cumple como red de seguridad/backup rápido, no como sustituto del montaje manual sobre un template ya validado.

---

## 7. Resumen de coste total (créditos Higgsfield)

| Partida | Créditos aprox. |
|---|---|
| 9 imágenes clave (2 cr/ud) | ~18 |
| 1 regeneración (cartel roto) | ~2 |
| 9 vídeos a 3s con Kling pro (7,5 cr/ud) | ~67,5 |
| Escena 10 (cierre): 1 imagen + 1 vídeo 3s | ~9,5 |
| **Total** | **~97 créditos** (de 273 disponibles en el plan Plus) |

---

## 8bis. Segunda ronda: montaje en CapCut, watermark de plantilla, y correcciones de "aspecto IA" (2026-09-05)

Tras entregar los 9-10 clips, el cliente montó el Reel él mismo en CapCut usando una plantilla de terceros. Esto abrió una segunda ronda de problemas y aprendizajes, ninguno relacionado con la generación en sí:

### El problema del watermark "www.yourstudio.com"

El template de CapCut que usó el cliente traía una marca de agua de su creador original incrustada como texto ya renderizado en cada escena — no una capa de texto independiente que se pueda seleccionar y borrar en el timeline. Se intentó:
1. Editar el texto dentro del modo "Edit" del bloque de plantilla en CapCut — parcialmente posible para otros textos del pack ("VINOS BLANCOS"), pero el watermark en concreto no era editable (probablemente exportado como imagen/logo, no como campo de texto).
2. Cubrirlo dentro de la propia CapCut con una capa superior — el cliente no consiguió aislarlo lo suficiente para hacerlo con garantías.
3. **Solución final:** el cliente exportó el vídeo ya montado (con watermark) y me pasó el archivo (`final.mp4`) directamente por ruta local. Lo repará yo con `ffmpeg`:
   - Localicé la posición exacta en píxeles del texto (banda horizontal ~y=1575-1720 de 1920) probando recortes y una rejilla de referencia (`drawgrid`) sobre un fotograma conocido.
   - Cubrí esa franja con una `drawbox` negra opaca (`color=black@0.9`, no semitransparente — con opacidad parcial se veía un "fantasma" del texto original por debajo) y superpuse `drawtext` con "TORRE DE VEGA" en Georgia Bold, en la misma posición.
   - Verifiqué el resultado con un mosaico de fotogramas (`fps=1,tile=4x3`) de todo el vídeo para confirmar que la tapa cubría el watermark en todas las escenas sin excepción.
   - Mantuve el audio original del export intacto (`-c:a copy`), sin tocarlo.

**Lección:** un watermark de plantilla de terceros normalmente **no es editable como capa de texto** aunque lo parezca en el editor — cuando el cliente no puede aislarlo dentro de la app de edición, la vía más fiable es recibir el vídeo ya exportado y taparlo con precisión de píxel por post-proceso (ffmpeg), convirtiendo la marca de agua ajena en un elemento de marca propia en el mismo sitio, en vez de intentar "borrar" un elemento incrustado.

### Falso positivo: "el vídeo sale en negro"

Al diagnosticar el `final.mp4`, una extracción de fotograma con `-ss` antes de `-i` en un instante concreto devolvió una imagen con dos tercios inferiores en negro puro. Se interpretó inicialmente como un bug real de encuadre/escala en CapCut. Al re-verificar con un método de muestreo más fiable (`fps=1` + `tile`, en vez de seeks puntuales), **el vídeo no tenía ningún fallo real** — fue un artefacto de la propia extracción (`-ss` aterrizando en un fotograma mal decodificado).

**Lección:** ante un fallo visual reportado por el cliente que no se puede reproducir de forma consistente, no dar por buena la primera extracción de un único fotograma con seek — verificar siempre con un muestreo uniforme de toda la pieza (`fps=N` + `tile`) antes de diagnosticar un bug y, sobre todo, antes de decírselo al cliente como confirmado.

### Corrección de "esto se nota mucho IA" — escena 9 (copa grande, comedor)

El cliente señaló que uno de los vídeos generados "se nota mucho IA" aunque "le gusta la idea". Se comparó contra `directoria-cloud/knowledge/05-biblia-hiperrealismo.md` (la biblia de hiperrealismo del framework) y se identificaron los síntomas exactos de "AI gloss":
- Copa de vino perfectamente limpia (sin huellas, sin polvo, sin imperfección).
- Piel de la mano demasiado lisa, sin poros ni textura visible.
- Luz uniforme sin una fuente física clara ni caída natural hacia sombra.
- Composición perfectamente centrada/simétrica (glass dead-center) — lee como bodegón de estudio, no como foto de móvil real.

**Fix aplicado:** regeneré la imagen añadiendo explícitamente, en inglés, en el prompt:
- Imperfecciones de vidrio (`soft fingerprints`, `a faint smudge`, `one small dust speck`, `a hard-edged specular highlight` de una fuente real).
- Imperfecciones de piel (`visible skin pores`, `fine hairs`, `natural knuckle creases`).
- Luz con fuente nombrada (la lámpara de la sala) y caída natural hacia sombra.
- Composición descentrada (`candid off-center framing`, tercios en vez de centro).
- Léxico de cámara real (`shot on a phone-style 26mm equivalent lens, f/2.2, ISO 800`) en vez de vocabulario de render.

**Incidencia secundaria:** la primera regeneración con este enfoque coló sin querer a una camarera con la cara visible de fondo (violando la regla 2). Se corrigió con un negativo explícito ("no people, no staff, no faces anywhere in the frame") y pidiendo la sala vacía. Archivo final: `09_copa_grande_comedor_azzulo_v2_natural.mp4`.

**Lección clave:** "se nota que es IA" casi nunca es un problema de contenido — es la ausencia de imperfecciones físicas y de una fuente de luz nombrada. La biblia de hiperrealismo del framework (`05-biblia-hiperrealismo.md`) es la referencia a consultar en cuanto el cliente dé este feedback, antes de tocar nada más del prompt.

### Pieza suelta: foto de producto de una sola botella

El cliente pidió también, fuera del flujo de las escenas del Reel, una imagen de producto de una sola botella (Quintaluna) partiendo de la foto real de referencia. Se generó con `nano_banana_pro`, 2K, **aspect ratio 4:5** (no 9:16 — al no ser una escena del Reel sino una pieza de producto suelta, se usó el formato por defecto de foto de carrusel/producto del proyecto), replicando fielmente el entorno real (mismo mantel blanco y pared de ladrillo que en la foto de referencia) y aplicando ya las imperfecciones anti-"aspecto IA" aprendidas en el punto anterior desde el primer intento. Archivo: `imagenes/generadas/quintaluna_producto_solo.png`.

### Reglas nuevas incorporadas a `reglas_imagenes.md` a raíz de esta ronda

- **Regla 14 — flujo obligatorio:** en cualquier pieza de vídeo multi-escena, generar y conseguir el visto bueno de **todas** las imágenes fijas antes de animar ninguna a vídeo. Corregir en fase de imagen es barato; corregir después de animar desperdicia también el coste del vídeo.
- **Regla 15 — duración por defecto:** todo vídeo con Kling se pide a `duration:3` (el mínimo real, no 1s) salvo que el cliente pida explícitamente otra duración — es la forma de ahorrar créditos sin perder calidad, ya que el recorte fino se hace después en edición.

### Cierre del proyecto

El cliente terminó montando el Reel final (`reel_vinos_blancos/last.mp4`, 1440×2560, ~11,5s) con **otra plantilla de CapCut distinta** a la primera, usando el material (imágenes + clips) generado en este proceso. El resultado con el que se ha quedado el cliente combina: los 9-10 clips de vídeo de las escenas ya corregidas (sin cartel roto, sin elemento inventado, con la escena 9 en su versión "natural" sin aspecto IA), montados con transiciones y ritmo propios de la plantilla elegida por el cliente en CapCut — no con el montaje automático por ffmpeg, que quedó como red de seguridad/backup.

---

## 8. Checklist para repetir este proceso con otra categoría de vino/producto

1. ¿Hay plantilla de referencia que analizar? → `video_analysis_create`.
2. Elegir categoría/productos **solo entre los que tienen foto real de botella/producto** — comprobar `imagenes/<categoria>/` antes de prometer nada.
3. Si hay varias fotos del mismo producto, usar la que tenga **menos texto visible**.
4. Elegir ubicaciones ya validadas como "elegantes" por el cliente (no zonas funcionales tipo barra de licores/cocina) si el producto es premium.
5. Generar imágenes con `nano_banana_pro`, `resolution:"2k"`, modo ORGANIC, siguiendo `reglas_imagenes.md` al pie de la letra (sin cara de personal, balance de blancos neutro, sin HDR, imperfecciones físicas reales para evitar "aspecto IA" — ver §8bis).
6. Revisar cada imagen tú mismo antes de pasarla al cliente (carteles, texto de etiqueta, elementos inventados, caras coladas de fondo).
7. **(Regla 14, dura) Generar y conseguir el visto bueno explícito del cliente de TODAS las imágenes de la serie antes de animar ninguna a vídeo** — nunca animar una escena cuya imagen no esté ya aprobada.
8. Animar con `kling3_0 pro`, **`duration:3`** (regla 15, dura — el mínimo real, no 1s, salvo que el cliente pida otra duración explícitamente), `aspect_ratio:"9:16"`, un solo beat de movimiento por clip.
9. Backup rápido con ffmpeg si se quiere previsualizar el ritmo, pero dejar el montaje fino para CapCut sobre el template real.
10. Si el cliente exporta ya el montaje desde CapCut y algo no cuadra (watermark de plantilla, elemento raro), pedirle el archivo exportado por ruta local y arreglarlo por post-proceso con ffmpeg en vez de pelear con la plantilla ajena — ver §8bis.
