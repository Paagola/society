# Reel 08 — «Volvemos el miércoles 16» (material ya generado + AI Motion Designer)

**Fecha:** 2026-09-14
**Coste de generación:** **0 créditos** — no se genera ningún plano. Todo el material existe y está
aprobado. El único coste posible es el del agente Motion Designer (sin tarifa publicada: medir con
`balance` antes y después).
**Formato:** 9:16, 10 s, 1080×1920, 30 fps, sin audio generado (música de Instagram al publicar)
**Publicación prevista:** miércoles 16 de septiembre (ver bloqueo 5, choca con el Reel 04)
**Estado:** plugin instalado ✅ (2026-09-14 20:11) · ⛔ falta reiniciar AE e iniciar sesión en el panel, y autenticar el bridge (bloqueos 1 y 2)

---

## 0. Por qué esta pieza

1. **Es la acción nº 4 del informe de métricas del Reel 03**
   ([`informes/2026-09-09_reel-03_lectura-de-metricas.md`](../informes/2026-09-09_reel-03_lectura-de-metricas.md) §4):
   *«mismo material, un rótulo con la fecha… convierte el plano de producto en aviso, que es el único
   formato que ha viajado en esta cuenta»*. El Reel 03 retuvo mejor que ninguno (68,1 %) y tuvo
   **0 compartidos** porque la fecha no salía en ningún fotograma. Aquí la fecha abre el vídeo.
2. **Pregunta de control — ¿un vecino lo reenviaría?** Sí: es un aviso con fecha de reapertura, el
   patrón del mejor post de los 90 días (barbacoa, 15 compartidos).
3. **Es la prueba piloto de AI Motion Designer** que propone
   [`informes/2026-09-14_procesos-reels_y_ai-motion-designer.md`](../informes/2026-09-14_procesos-reels_y_ai-motion-designer.md) §4:
   paquete gráfico de marca (idea A) + texto que sale de detrás de un objeto (idea B).
4. **No es una repetición del Reel 03:** allí era pantalla partida con dos bandas; aquí es secuencia a
   pantalla completa con ráfaga, y el mensaje es otro.

---

## 1. Material (verificado con `ffprobe` y contact sheets el 2026-09-14)

| Id | Fichero | Origen | Medidas | Qué se ve |
|---|---|---|---|---|
| `PARRILLA` | [`imagenes/parrilla/clips/parrilla_volteo_master_4k60.mp4`](../imagenes/parrilla/clips/parrilla_volteo_master_4k60.mp4) | **Metraje real** del cliente (regla 22) | 2160×3840, 60 fps, 6,82 s | Chuletón con llama viva desde t=0; la mano con pinzas entra hacia 2,3 s y lo voltea hasta ~5 s |
| `VINO` | `imagenes/generadas/reel_03_lo_hacemos_lo_disfrutas/videos/v02_vino_cayendo.mp4` | Generado, aprobado (Reel 03) | 1076×1928, 24 fps, 5,04 s | Mano de mujer sirviendo Cillar de Silos; chorro cayendo desde el fotograma 0 |
| `CARNE` | `…/videos/v01_carne-cortada_pushin.mp4` | Generado, aprobado | 1080×1912, 24 fps, 5,04 s | Solomillo cortado con patatas en plato de barro, push-in incorporado |
| `TENEDOR` | `…/videos/v03_tenedor_levanta.mp4` | Generado, aprobado | 1080×1912, 24 fps, 5,04 s | Tenedor levantando un trozo de carne, copa de tinto detrás |
| `CAMARERO` | `…/videos/v05_camarero_andando.mp4` | Generado, aprobado | 1080×1910, 24 fps, 5,875 s | Camarero **sin cara**, polo negro con logo, avanzando con el plato |

Comprobaciones de reglas sobre el material: sin caras ✅ · una sola mano por plano ✅ · manos de
mujer en 2 de 3 planos con mano ✅ · sin sobras ✅ · fuego solo en metraje real ✅.

> ⚠️ **Choque con la regla 17 vigente.** `VINO`, `CARNE`, `TENEDOR` y `CAMARERO` se generaron el
> 2026-09-08 con el acabado de iPhone (luminosos, contraste plano). Desde el 2026-09-10 rige el
> editorial dramático. Un grade en AE (§4, tarea MD-3) **aproxima** ese look —más contraste, calidez,
> viñeta y grano—, pero **no puede crear una luz dura de una sola fuente** que no existe en el clip.
> Ver bloqueo 6.

---

## 2. Timeline

Comp `REEL_08_VOLVEMOS_16` · 1080×1920 · **30 fps** · 10,0 s · fondo negro.

| t comp | Capa | Tramo de origen | Movimiento (AE, 0 cr) | Rótulo |
|---|---|---|---|---|
| **0,00 – 2,40** | `PARRILLA` | Interpretada a **30 fps** (cámara lenta 50 %, sin interpolar). Conformado: origen 4,60 → 7,00 s = volteo real 2,30 → 3,50 s | Escala 50 % → 54 % (push-in del 8 %), ease suave | **Lockup de gancho** (MD-1), `MIÉRCOLES 16` visible desde el fotograma 0 |
| 2,40 – 3,30 | `VINO` | 1,00 → 1,90 s | Escala 100,4 → 106 (push-in) | — |
| 3,30 – 4,20 | `CARNE` | 2,00 → 2,90 s | Ninguno (ya trae push-in) | — |
| 4,20 – 5,10 | `TENEDOR` | 2,00 → 2,90 s | Posición X 540 → 572 (deriva lateral 3 %), escala 103 | — |
| **5,10 – 10,00** | `CAMARERO` | 0,50 → 5,40 s | Escala 106 → 100,6 (pull-back) | **Placa de cierre** saliendo de detrás del plato (MD-2) |

**Regla 12 cumplida:** acción ya empezada en el fotograma 1 (llama viva + mano con pinzas), rótulo
desde el fotograma 1, primer plano de 2,4 s y ráfaga solo a partir del segundo 2,4.

**Regla 9 cumplida:** push-in · push-in propio del clip · deriva lateral · pull-back — no se repite el
mismo movimiento en dos planos seguidos salvo 2,4-4,2, donde el segundo viene del propio clip (el
de AE es más corto y cerrado). Si se nota, cambiar `VINO` a quieto.

### Fórmula de recorte (skill §3: `startTime = comp_in − src_in`)

| Capa | `startTime` | `inPoint` | `outPoint` | Validación `startTime + duración > outPoint` |
|---|---|---|---|---|
| `PARRILLA` (conformada, 13,64 s) | −4,60 | 0,00 | 2,40 | 9,04 > 2,40 ✅ |
| `VINO` | 1,40 | 2,40 | 3,30 | 6,44 > 3,30 ✅ |
| `CARNE` | 1,30 | 3,30 | 4,20 | 6,34 > 4,20 ✅ |
| `TENEDOR` | 2,20 | 4,20 | 5,10 | 7,24 > 5,10 ✅ |
| `CAMARERO` | 4,60 | 5,10 | 10,00 | 10,475 > 10,00 ✅ |

### Transiciones

- 2,40 / 3,30 / 4,20: whip de desenfoque direccional (`ADBE Motion Blur`, `Blur Length` 45 → 0 en
  3 fotogramas), dirección 90 / 270 / 90. Los planos duran 0,9 s, por encima del mínimo de 0,4 s.
- 5,10: corte seco al camarero. La placa hace el trabajo.

---

## 3. Rótulos — copy (⚠️ PROPUESTA, pendiente de validar por el cliente)

| Momento | Línea | Estilo (estándar aprobado, `documentación.md` §7) |
|---|---|---|
| 0,00 – 2,40 | `VOLVEMOS` | `BodoniMT` Regular, 40 px, tracking 640 |
| | filete | Solid 520×2 px, opacidad 70 |
| | `MIÉRCOLES 16` | `BodoniMT` Regular, 70 px, tracking 400 |
| 5,30 – 10,00 | `TORRE DE VEGA` | `BodoniMT` Regular, 62 px, tracking 540 |
| | filete | Solid 520×2 px, opacidad 70 |
| | `VOLVEMOS EL MIÉRCOLES 16` | `BodoniMT` Regular, 40 px, tracking 640 |

Todo en blanco puro, `applyStroke:false`, `ADBE Drop Shadow` Distance 0 / Softness 70 / Opacity 200,
X del centro +10 px para compensar el tracking.

**Tipografía:** Regular, no Bold. El `BodoniMT-Bold` del Reel 03 fue un ajuste puntual de esa pieza
(efecto tiza, *«un poco más gruesa»*); los Reels 04 y 06, posteriores, siguen el estándar Regular.

**Contraste, comprobado sobre los contact sheets:**
- Gancho → tercio superior de `PARRILLA` (campana y pared oscuras, `y` 330-560). Blanco ✅.
- Placa → torso y pantalón negros de `CAMARERO`, por debajo del plato. Blanco ✅.
- La ráfaga (`VINO`, `CARNE`, `TENEDOR`) es luminosa, con mantel blanco: **por eso no lleva texto.**
  El gancho sale en 2,25 → 2,40 (fundido de 0,15 s).

---

## 4. Ejecución

### Paso A — Ensamblado con `mcp-aftereffects` (determinista, ya probado)

1. `ae_project_info`. Si no hay proyecto: crear y guardar
   `imagenes/generadas/reel_08_volvemos_miercoles_16/REEL_08.aep`.
2. `batch.run`: `project.import_file` (`path`) ×5 → interpretar `PARRILLA` a 30 fps → `comp.create`
   (`fps: 30`) → añadir capas → `layer.set_props` con la tabla de recortes → escalas de §2.
3. Keyframes de movimiento y whips de §2.
4. `ae_save_project`. **A partir de aquí no se toca el proyecto con este MCP hasta el paso C.**

### Paso B — Gráficos con AI Motion Designer (`higgsfield-bridge`)

`balance` antes. Pasar cada petición **tal cual**, con la especificación cerrada: sin ella el agente
aplica su estilo por defecto (tipografía gruesa, animación enérgica), que el cliente ya rechazó.

**MD-1 · Lockup de gancho (idea A: queda como plantilla reutilizable)**

```text
In the open composition REEL_08_VOLVEMOS_16, build a title lockup as a precomp named TDV_LOCKUP_GANCHO,
visible from 0.00s to 2.40s. Exact spec, do not restyle:
- Line 1 "VOLVEMOS": font BodoniMT (Regular, never Black or Bold), 40 px, tracking 640, pure white.
- A horizontal rule: solid layer 520 x 2 px, white, 70% opacity, centred under line 1.
- Line 2 "MIÉRCOLES 16": BodoniMT Regular, 70 px, tracking 400, pure white.
- Centred horizontally at x = 550 (tracking compensation), block centred at y = 450.
- No stroke on any text. Legibility only with Drop Shadow: distance 0, softness 70, opacity 200 (0-255 scale).
Animation, elegant and slow, no scale bounce, no overshoot:
- "MIÉRCOLES 16" is fully visible on the very first frame; it only rises 14 px into place over 0.6s.
- The rule draws from the centre outwards (Scale X 0 to 100%) from 0.10s to 0.75s.
- "VOLVEMOS" fades 0 to 100% and rises 14 px, starting at 0.22s, 0.45s long.
- Whole lockup fades out from 2.25s to 2.40s.
Keep every layer native and editable. Expose the two text strings as editable properties so the
precomp can be reused with other copy.
```

**MD-2 · Placa que sale de detrás del plato (idea B)**

```text
In REEL_08_VOLVEMOS_16, the layer CAMARERO (5.10s to 10.00s) shows a waiter carrying a clay plate
towards camera. Build a closing plate that emerges from BEHIND that plate:
- Duplicate CAMARERO above itself as CAM_RECORTE_PLATO and isolate the plate and everything above it
  with a tracked mask that follows the plate's lower edge (use the Higgsfield Remove Background matte
  if it keeps the clay plate edge intact; otherwise a hand-keyed mask along the plate's lower arc).
  Put the text precomp between the two waiter layers.
- CAM_RECORTE_PLATO is active only from 5.10s to 6.70s, so it never hides anything outside that window.
- Precomp TDV_PLACA_CIERRE: "TORRE DE VEGA" BodoniMT Regular 62 px tracking 540, a 520 x 2 px white
  rule at 70% opacity, then "VOLVEMOS EL MIÉRCOLES 16" BodoniMT Regular 40 px tracking 640. Pure white,
  no stroke, Drop Shadow distance 0 / softness 70 / opacity 200. Centred at x = 550.
- Motion: the plate slides down from y = 700 to its final y = 1180 between 5.30s and 6.60s with an
  ease-out, emerging from behind the plate's lower edge; the lower line fades in 0.12s after the title.
  It stays until 10.00s.
Keep all layers native and editable.
```

> Fallback si el matte o el tracking fallan (plato de barro que se come, bordes que bailan): la técnica
> ya validada del Reel 03 §4bis, con máscara estática por el arco del plato — vértices
> `(311,766) → (400,832) → (490,886) → (580,907) → (670,886) → (760,832) → (849,766)`, medidos a origen
> 0,6 s. Esta pieza la usa en origen 0,70-2,00 s, la misma ventana.

**MD-3 · Grade de acercamiento a la regla 17 (solo 2,40 → 10,00 s)**

```text
Add an adjustment layer named GRADE_R17 from 2.40s to 10.00s, above the footage and below all text.
Goal: move bright, flat smartphone-looking footage towards a dramatic editorial look without
crushing the food. Use Lumetri Color: temperature warmer (about +18), contrast +30, highlights -25,
shadows -30, blacks -25, saturation 105; vignette amount -1.5, midpoint 45, feather 70. Add a fine
film grain at low intensity. Do not touch the text layers and do not add any glow, bloom or
teal-and-orange grade.
```

**MD-4 · Guardar el paquete gráfico**

```text
Save TDV_LOCKUP_GANCHO and TDV_PLACA_CIERRE as reusable Motion Graphics templates (.mogrt) with the
text strings exposed, into C:\Users\victo\Documents\torre_de_vega\imagenes\plantillas_ae\.
```

`balance` después. Anotar créditos consumidos por tarea en §6.

### Paso C — Verificación y render (`mcp-aftereffects`)

1. `ae_save_project` desde el lado de Motion Designer ya hecho → `ae_project_info` para confirmar que
   ve los cambios.
2. `render.frame` en **0,00 · 1,20 · 2,30 · 2,45 · 3,50 · 4,60 · 5,40 · 6,00 · 6,60 · 8,00 · 9,90** →
   convertir a JPG → **mirarlos**. Qué comprobar: el gancho legible sobre la campana; ninguna franja
   negra en los extremos del push/pull; la placa cruza por detrás del plato sin cortes; el
   `CAM_RECORTE_PLATO` no tapa nada fuera de 5,10-6,70; el grade no quema el mantel ni ennegrece la
   carne.
3. Render: `Best Settings` + `H.264 - Match Render Settings - 15 Mbps` →
   `imagenes/generadas/reel_08_volvemos_miercoles_16/REEL_08_volvemos_miercoles_16.mp4`.
4. `ffprobe`: 1080×1920, 30 fps, 10,0 s.

### Paso D — Medir (gratis)

`media_upload` → `curl PUT` → `media_confirm` → `virality_predictor` (10 s < 16 s). Máximo 2
iteraciones. Mirar sobre todo `values_by_frame` de lenguaje en 0-2,4 s frente al Reel 03 (0,349 de
media) — la hipótesis es que la fecha en pantalla la sube.

### Paso E — Aprendizaje

Rellenar §6 y trasladar lo que sirva a la skill `after-effects-reels` (sección «Segundo agente»).

---

## 5. Bloqueos

1. ⛔ **Plugin de Higgsfield no instalado** (comprobado el 2026-09-14: no hay extensión en las carpetas
   CEP/UXP). Lo tiene que hacer el usuario, porque requiere descargar e iniciar sesión: descargar el
   `.zxp` de <https://higgsfield.ai/plugins/after-effects> → abrir **ZXP Installer** (aescripts) **como
   administrador** → arrastrar el `.zxp` → abrir AE 2026 → `Window → Extensions → Higgsfield` →
   iniciar sesión con la cuenta de Higgsfield del plan Plus.
   **Actualización 2026-09-14 19:20:** en Windows el plugin no es un `.zxp` sino
   `higgsfield-cep-1.0.55.msi` (instala en `Common Files\Adobe\CEP\extensions\ai.higgsfield.cep`,
   requiere administrador). **Avast lo bloquea y lo manda al Baúl de virus** con la detección
   `FileRepMalware [Misc]` (19:02 y 19:16; SHA-256
   `B315659E9A260AD1478716AA7678637C36A926E7A8C35F97EF9B6A96AE370BB6`), aunque la firma Authenticode
   es válida (`CN=Higgsfield Inc.`). Es una detección por reputación, no por firma de malware. Decide
   el usuario si lo restaura con excepción; **no desactivar el antivirus desde Claude**.
   ✅ **Resuelto el 2026-09-14 a las 20:11.** Restaurar desde el Baúl no bastaba: Windows Installer copia
   el paquete a `C:\Windows\Installer\*.msi` y Avast bloqueaba esa copia (error 1305 / 1620). El usuario
   pausó los escudos 10 minutos y el MSI oficial instaló bien (`success or error status: 0`) en
   `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\ai.higgsfield.cep`. El manifiesto declara
   `AEFT [0.0,99.9]` y `CSXS 9.0`: compatible con AE 2026 (26.5). Pendiente: reiniciar AE, abrir
   `Window → Extensions → Higgsfield` e iniciar sesión.
2. ⛔ **Bridge sin autenticar.** El conector ya está registrado (`higgsfield-bridge` →
   `https://bridge.higgsfield.ai/mcp`, ámbito user, 2026-09-14; el endpoint responde 401 con OAuth,
   así que existe). Falta **reiniciar Claude Code** y autenticarlo desde `/mcp`.
3. **AE abierto con proyecto** y *Allow Scripts to Write Files and Access Network* activado.
4. **Copy de los rótulos** (§3) — es propuesta; el texto es del cliente.
5. **Choque de calendario con el Reel 04** («Volvemos el miércoles 16», tres bandas, imágenes ya
   generadas y sin montar). Dos piezas con el mismo mensaje el mismo día se canibalizan. Opciones:
   Reel 08 el miércoles y Reel 04 a Stories; o al revés; o Reel 08 el viernes 18 como recordatorio.
6. **Grade de la regla 17 sobre clips de iPhone ya publicados** en el Reel 03. Confirmar con el
   cliente que prefiere el grade dramático (coherente con la regla vigente) aunque el material se vea
   distinto del Reel 03 que ya está en el perfil.
7. **Coste de Motion Designer** desconocido y sin preflight.
8. **Plazo:** publicación el 16; hoy es 14.

---

## 6. Resultado de la prueba (rellenar al ejecutar)

| Tarea | ¿Lo hizo Motion Designer? | Fidelidad a la especificación | Créditos | Tiempo | ¿Mejor que `mcp-aftereffects`? |
|---|---|---|---|---|---|
| MD-1 lockup | | | | | |
| MD-2 placa detrás del plato | | | | | |
| MD-3 grade | | | | | |
| MD-4 .mogrt | | | | | |
