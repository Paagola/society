# 03 · Resolución, proporción y reescalado

Cuándo generar a qué resolución, cuándo vale reescalar y cómo evitar bandas negras. Los precios exactos de cada resolución están en la skill `higgsfield`; aquí se decide **qué** pedir, no **cuánto cuesta**.

## Índice

1. La proporción nace en la imagen de inicio
2. Lo que Instagram penaliza
3. Resolución por uso
4. Qué hace y qué no hace un reescalador
5. Revisión automática de cada clip

---

## 1. La proporción nace en la imagen de inicio [MEDIDO]

**Reel del sushi:** foto de inicio 1:1, vídeo pedido a 9:16, Topaz a 9:16. Resultado: archivo de 1080×1920 con contenido real de 1080×1080 y **420 px negros arriba y abajo** (detectado con `cropdetect`).

- Seedance sigue la proporción de la **imagen de inicio**, no la del parámetro.
- A la vez, los modelos de vídeo tienen `aspect_ratio` por defecto 16:9 y no lo ajustan solos al keyframe (`knowledge/03`, `knowledge/07`).
- **Las dos reglas juntas:** la imagen de inicio se genera o se amplía (outpaint) a 9:16 antes de animar, **y** la llamada de vídeo lleva `aspect_ratio:"9:16"` explícito.
- **Cómo ampliar una foto real cuadrada a 9:16** [OFICIAL, catálogo en vivo]: `flux_2_pro_outpaint` amplía por cada lado en píxeles (`expand_top` / `expand_bottom`); para 1080×1080 → 1080×1920, 420 px arriba y 420 abajo, justo las bandas que salieron negras. La alternativa es la herramienta `outpaint_image` o el modelo `outpaint` con proporción de destino. Después, se comprueba que el relleno no ha inventado vajilla ni decoración que el local no tiene (regla "nada inventado").
- Relacionado [COMUNIDAD, smixs]: el vertical se genera en vertical desde el principio; recortar después de animar es un fallo silencioso.

## 2. Lo que Instagram penaliza [OFICIAL]

`about.instagram.com`, "Instagram Ranking Explained" (31/05/2023): Instagram intenta hacer **menos visibles** los reels de baja resolución o con marca de agua, los reels mudos **con bordes**, los que son mayoritariamente texto y los que ya se habían publicado en Instagram.

Consecuencias para producción:

- **Un reel con bandas negras no solo se ve mal: pierde distribución.** `cropdetect` es obligatorio (§5).
- Ninguna marca de agua de herramientas (CapCut, TikTok, generadores) en la pieza final.
- Resolución de entrega real, no un 480p estirado.
- Reels mayoritariamente de texto (carteles animados sin imagen real) juegan en contra.

## 3. Resolución por uso

Primero la calidad; el coste solo desempata.

### 3.1 Regla obligatoria: Seedance a 720p + ByteDance pro a 2K y 60 fps

> **REGLA R-RES-02 · vigente desde el 25/09/2026 · decisión de Víctor.** La toma aprobada se reescala con ByteDance pro a **2K** (no a 4K) y a **60 fps**, siempre desde el 720p original. Máster en 2K a 60 fps y copia a 1080×1920 **también a 60 fps** para publicar. Sustituye al destino de R-RES-01 (1080p, 24 fps, "nunca más de 30 fps") y a la línea de 4K del 25/09 en `skills/README.md`; el resto de R-RES-01 (generar a 720p, reescalar solo lo aprobado) sigue vigente.
>
> **Lo que implica:**
> - **Coste:** por encima de 30 fps ByteDance cobra el doble [OFICIAL, esquema de `upscale_video`]. El preflight con `get_cost` es obligatorio en cada toma; el coste real a 2K y 60 fps está **sin medir** (el dato de 1,21 cr por 6 s es de 1080p a 24 fps).
> - **Fotogramas inventados:** Seedance entrega 24 fps, así que a 60 fps más de la mitad de los fotogramas los crea el reescalador por interpolación. En la revisión se miran a velocidad normal y fotograma a fotograma los gestos rápidos (manos, fritura, líquidos, humo): si aparecen formas que se deshacen o estelas raras, esa toma se reescala a 30 fps y se registra el caso.
> - **Montaje a 60 fps:** la composición de Remotion/OpenMontage y el render final van a 60 fps; si se monta a 24 o 30, los 60 fps se pierden y se ha pagado el doble para nada. El metraje real del local que venga a 24/25/30 fps se deja como está dentro de la línea de 60 (no se interpola).
> - **Dimensiones:** 2K en 9:16 debería dar 1440×2560 **[SIN VERIFICAR]**; se confirma con `ffprobe` en el primer reescalado y se corrige aquí.
>
> **REGLA R-RES-01 · vigente desde el 24/09/2026 · aprobada por Víctor (destino sustituido por R-RES-02).** Todo clip de Seedance 2.5 se genera a **720p** y, **solo cuando la toma está aprobada**, se reescala con **ByteDance pro**. El 1080p nativo deja de ser el estándar.
>
> **Motivo [MEDIDO, `pruebas/ab-reescalado-720p-2026-09-24/`]:** con el mismo keyframe y el mismo prompt, 720p + ByteDance pro conservó el **71 %** del detalle del keyframe, frente al **31 %** del 1080p nativo, con un coste de 43,21 cr frente a 72 por 6 s, y sale en H.264. Se adopta por calidad; el ahorro es una consecuencia.

**Procedimiento:**

1. **Generar** con `resolution:"720p"` escrito en la llamada (el valor por defecto también es 720p, pero la resolución siempre va explícita), `mode:"omni_reference"`, `aspect_ratio:"9:16"` y `generate_audio:false`.
2. **Revisar a 720p (PUERTA D):** movimiento, continuidad, manos, recuento de piezas y **primer fotograma frente al keyframe** (`omni_reference` no lo fija, §5). Los defectos de contenido se ven igual a 720p; **las tomas descartadas no se reescalan**.
3. **Reescalar solo la toma aprobada** con `generate_video`: `model:"bytedance_video_upscale"`, `model_version:"pro"`, `preset:"aigc"`, `resolution:"2k"`, `fps:60` (R-RES-02; el coste se duplica y va asumido) y el clip como `video_references`. Preflight con `get_cost` (skill `higgsfield`, `references/01` §5.2).
4. **Revisar el reescalado:**
   - `ffprobe` debe dar 2K en 9:16, `r_frame_rate` 60/1, H.264 y la misma duración que el clip.
   - Gestos rápidos fotograma a fotograma: sin formas que se deshagan por la interpolación (R-RES-02).
   - `cropdetect` sin bandas (1072 es un falso positivo, §5).
   - Comparar con el keyframe (no con el 720p) las **tramas regulares** (tejidos, rejillas, vetas), porque ByteDance tiende a exagerarlas.
5. **Si el reescalado falla** (sobreenfoque visible, halos, textura inventada): ByteDance `aigc` **standard** con la misma toma (0,12 cr). Si también falla, **1080p nativo** para ese plano, y se registra el caso: cuenta como contraejemplo de la regla.

**Excepciones:**

- **Regla escrita del cliente que exija generar a 1080p nativo** (hoy, Torre de Vega: *"la calidad mínima es 1080 no 720"*). Manda la del cliente hasta que el cliente apruebe el cambio con la comparativa delante. El reescalado entrega 1080p y se ve más nítido, pero cambiar una regla del cliente es decisión suya.
- **Metraje real del local:** no se toca; se entrega en su resolución original si es ≥ 1080p.
- **Otros modelos** (Kling 3.0 y demás): la regla solo cubre Seedance 2.5, que es donde está medida. Kling sigue a 1080p hasta que haya una A/B propia.

**Revisión de la regla:** está basada en **una escena**. Se reabre si la prueba a ciegas en móvil o alguna de las 3 escenas siguientes (carne cortada, sala con gente, bebida) la contradicen (pendientes, al final de este documento). Con 5 comparables a favor pasa a ser regla consolidada.

### 3.2 Resolución por uso

| Uso | Método | Motivo |
|---|---|---|
| Borradores y pruebas de movimiento complicado | 480p (opcional) | Los fallos que obligan a repetir (piezas que cambian, cámara que tiembla, continuidad rota) se ven igual a 480p. Útil cuando se prevén muchas tomas; si no, se genera directamente a 720p |
| **Cualquier clip de Seedance 2.5 para entregar** | **720p + ByteDance pro a 2K y 60 fps** (R-RES-01 + R-RES-02) | Medido a 1080p: más detalle que el 1080p nativo con un 40 % menos de coste. 2K y 60 fps, decisión de Víctor del 25/09 |
| Excepción por regla del cliente | 1080p nativo | Solo si la ficha del cliente lo exige |
| Imagen fija de producción | Nano Banana Pro 2K, 9:16 | Estándar medido (2 cr). 4K solo para el héroe o impresión |

**Flujo borrador → final [COMUNIDAD, alineado con la guía oficial de ByteDance]:** Seedance 2.5 recomienda explícitamente "draft at 480p, finish at 720p/1080p". Si se hace un borrador, se regenera en la resolución final **con el mismo prompt y el mismo keyframe**; cambiar el prompt entre borrador y final invalida la prueba.

**El 1080p nativo de Seedance 2.5 no rinde a 1080 [MEDIDO, 1 escena]:** solo aporta un 16 % más de alta frecuencia que el mismo plano a 720p escalado con Lanczos. **Observado:** el aceite se ve empastado y las gambas, blandas. Se paga un 71 % más por una resolución que no se traduce en detalle.

## 4. Qué hace y qué no hace un reescalador

- Catálogo revisado el 24/09/2026: Topaz (resolución y proporción), ByteDance (resolución, fps, preset `aigc` / `common` / `short_series`) y un "Video Upscale" genérico. **Ninguno acepta prompt** y ninguno admite preflight de coste.
- **A/B medida el 24/09/2026** (cazuela de gambas, 720p → 1080×1920; detalle fino = varianza de bordes en la zona de las gambas, keyframe = 100 %):

  | Reescalador | Detalle | Estabilidad temporal | Coste por 6 s | Códec | Lectura |
  |---|---|---|---|---|---|
  | Ninguno (Lanczos) | 18 % | Base | 0 | H.264 | Blando |
  | ByteDance `aigc` standard | 53 % | +17 % de parpadeo (leve, no visible) | 0,12 cr | H.264 | Reconstruye texturas; algo exagerado |
  | **ByteDance `aigc` pro** | **71 %** | +17 %; en zonas estáticas, igual que la base | **1,21 cr** | **H.264** | **El mejor.** Trama de servilleta, perejil y pimentón cerca del keyframe |
  | Topaz 1080p | 37 % | Igual que la base | 5 cr | HEVC | Fiel pero blando; no compensa |

  Ninguno alteró el color (rojo/azul y luminancia del mantel sin deriva) ni metió bandas. **ByteDance pro se lanza con `generate_video`** (`model:"bytedance_video_upscale"`, `model_version:"pro"`, `preset:"aigc"`, `resolution:"1080p"`, `fps:24`, vídeo como `video_references`) y ese camino **sí admite preflight** (skill `higgsfield`).
- **Riesgo que vigilar:** la métrica de bordes premia el sobreenfoque. ByteDance puede exagerar tramas regulares (tejidos, rejillas); se revisa contra el keyframe, no solo contra el 720p.
- Un reescalador no corrige textura, color ni proporción: reescala lo que recibe, incluidas las bandas negras.
- Uso correcto: subir a la resolución de entrega planos generales ya buenos. Uso incorrecto: "arreglar" un keyframe ceroso o un borrador de 480p que va a ir en primer plano.

## 5. Revisión automática de cada clip

Antes de dar un clip por bueno:

```bash
# Resolución, fps y duración reales
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=nw=1 clip.mp4

# Bandas negras: el crop sugerido debe coincidir con el tamaño completo
ffmpeg -i clip.mp4 -vf cropdetect=24:16:0 -f null - 2>&1 | grep -o 'crop=[0-9:]*' | sort | uniq -c | sort -rn | head -3

# Fotogramas duplicados (caída real de fps): muchos "drop" indican cadencia falsa
ffmpeg -i clip.mp4 -vf mpdecimate -loglevel debug -f null - 2>&1 | grep -c ' drop '
```

- Si `cropdetect` devuelve algo menor que 1080:1920 de forma estable, hay bandas: se vuelve al keyframe (§1). **Excepción:** `1072:1920` es un falso positivo, porque `cropdetect` redondea a múltiplos de 16 y 1080 no lo es. Una diferencia de 16 px o menos se confirma mirando la luminancia de las columnas del borde.
- **Códec:** Topaz y Seedance a 1080p entregan **HEVC**; ByteDance entrega H.264. Antes de publicar en Instagram: `ffmpeg -i in.mp4 -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -movflags +faststart out.mp4`.
- **Primer fotograma:** Seedance 2.5 en `omni_reference` **no fija el keyframe como primer fotograma** (el servidor lo pasa como `reference_images`). Medido: correlación de 0,84 en la tirada de 720p y 0,31 en la de 1080p, que reencuadró. Si el plano tiene que abrir exacto en el keyframe, se revisa el fotograma 1 antes de aprobar.
- **Fotogramas duplicados [COMUNIDAD, OSideMedia]:** Seedance no siempre respeta la cadencia pedida y rellena con fotogramas repetidos. Un clip con muchos duplicados se ve a saltos: para el plano héroe se regenera y, si es de relleno, se limpia en montaje.
- **Revisión fotograma a fotograma:** un clip generado puede tener un único fotograma roto (una mano, una pieza que cambia). El plano héroe se revisa paso a paso antes de aprobarlo (→ [`06-de-slop-y-revision.md`](06-de-slop-y-revision.md) §4).

## Pendiente de verificar

1. ~~ByteDance frente a Topaz~~ **Resuelto el 24/09/2026:** ByteDance pro > `aigc` > Topaz en detalle; Topaz es el más estable (§4).
2. ~~ByteDance "pro" por `generate_video`~~ **Resuelto:** funciona y cuesta 1,21 cr por 6 s a 1080p (§4).
3. **Prueba a ciegas en móvil**, 720p + ByteDance pro frente a 1080p nativo: la A/B medida existe, falta la percepción.
4. **Repetir la A/B en 3 escenas más** (carne cortada, sala con gente, bebida con líquido) antes de convertirlo en regla. Con 5 comparables se puede fijar.
5. `topaz_image_generative` sobre el keyframe antes de animar (→ [`01-texturas-y-materiales.md`](01-texturas-y-materiales.md) §1).
6. Cómo fijar el primer fotograma en Seedance 2.5 (`omni_reference` no lo fija): probar `end_image` o un modo i2v estricto.
