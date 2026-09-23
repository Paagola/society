<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Ensayo V3 (segunda parte) — las herramientas reales de Higgsfield

Ejecutado el **22/09/2026**, después de conectar el MCP `higgsfield` (`mcp.higgsfield.ai/mcp`).
Continúa [`2026-09-22_ensayo-v3-referencia-pasta-negra.md`](2026-09-22_ensayo-v3-referencia-pasta-negra.md),
donde la mitad de Higgsfield no se pudo ejecutar. Mismo vídeo: el reel de pasta negra de Pinterest,
26,581 s.

---

## 1. Lo que sí se ejecutó esta vez

| Paso | Resultado |
|---|---|
| `get_preset_instructions` `/marketing-adapt-video` | **OK** — contrato vigente recuperado |
| `media_upload` + PUT + `media_confirm` del reel completo | **OK** — 6.727.086 bytes en 3,35 s |
| `virality_predictor` sobre el reel completo | **RECHAZADO** — «Video must be 16 seconds or shorter» |
| `virality_predictor` sobre un corte de 16 s | **OK** — completado en ~40 s |
| `video_analysis_create` sobre el reel completo | **Colgado en `queued`** |
| `video_analysis_create` sobre el corte de 16 s | **Colgado en `queued`** |

**Coste total: 0 créditos.** Saldo antes y después: 152,88. Confirma la línea «Análisis de vídeo,
predictor: 0» del informe del Reel 09.

---

## 2. Límite no documentado: el Virality Predictor sólo acepta ≤16 s

Error literal: `Virality Predictor failed: Video must be 16 seconds or shorter.`

No aparece en el esquema de la herramienta ni en la regla 3 de `reglas_videos.md`, que ordena pasar
**todo** Reel por el predictor antes de publicar. Esa regla es inaplicable tal como está escrita:

- Los Reels del proyecto han medido bien porque son cortos (el del chuletón, 9 s).
- Un Reel de 20 o 30 s —formato habitual en hostelería, y el de esta referencia— **no se puede
  puntuar entero**. Hay que recortar, y entonces se puntúa un trozo, no la pieza.

**Para Society:** la validación de calidad no puede depender de una herramienta con un techo de 16 s
sin declararlo. O se acota la duración de las piezas, o el sistema puntúa sólo el arranque y lo dice.

---

## 3. Virality Predictor — resultado sobre los primeros 16 s

Modelo interno: `brain_activity`. Devuelve un panel HTML más un JSON con proxies por segundo.

| Métrica | Valor |
|---|---|
| **hook_score** (ventana 0–3 s) | **28** |
| **sustain** | **100** |
| overall_score | 44 |
| viral_potential | 41 |
| brain_engagement | 36 |
| peak_second | **12** |
| peak_score | 0,368 |

Regiones simuladas (proxies, no medidas clínicas — la propia herramienta lo advierte):

| Región | Media | Pico | Segundo del pico |
|---|---|---|---|
| Visual / occipital | 0,526 | 0,560 | 9 |
| Frontoparietal / atención | 0,360 | 0,386 | 15 |
| Lenguaje / frontotemporal | 0,283 | 0,334 | 15 |
| Auditiva / temporal | 0,270 | 0,347 | 15 |
| **Default Mode** (*lower better*) | 0,677 | **0,691 → en el segundo 0** | 0 |

### Lo que esto contradice de mi propio análisis

En la primera parte del ensayo medí **cinco cortes en el primer segundo** (0,30 · 0,60 · 0,70 · 0,90 ·
1,10) y lo leí como «ráfaga de apertura», dando por hecho que enganchaba. El predictor dice lo
contrario: **hook 28 sobre 100**, y la Default Mode —la red que se activa cuando la mente divaga, y
donde menos es mejor— tiene su **máximo exactamente en el segundo 0**.

Traducido: cortar muy rápido al principio no es lo mismo que enganchar. La pieza engancha **más
tarde**, en el segundo 12, que es donde la pasta negra entra en la sartén. Y aguanta: sustain 100.

Es el mismo patrón que el proyecto ya había medido en el Reel 01 («hook débil con buen sustain»),
ahora en una referencia ajena y bien producida. Sugiere que el problema no era del Reel 01.

**Esto es lo que la pila de ffmpeg + visión no puede dar.** Mi capa mide la rejilla con precisión de
milisegundo, pero no tiene forma de saber si esa rejilla engancha. Aquí las dos vías no se solapan:
se necesitan las dos.

---

## 4. El contrato de Ad Recreator ha cambiado en tres días

Comparado el `instructions_markdown` vivo contra el `ad-recreator-contrato.json` guardado el 19/09.

**Idéntico:** los diez apartados de análisis, los cinco de adaptación y los ocho de escritura. El
método no se ha tocado, ni una palabra.

**Cambiado — sólo la fontanería:**

| 19/09 | 22/09 |
|---|---|
| «Confirm **ChatGPT attachments** with `media_upload_and_confirm`» | «For unconfirmed attachments, call `media_upload_widget`…» |
| «A user-supplied local file path is not a ChatGPT attachment: call `media_upload`…» | «For a supplied media URL, call `media_import_url`… For files produced in the cloud sandbox, use `media_upload`…» |
| «Inspect `seedance_2_5` with `models_get`» | «Inspect `seedance_2_5` with `models_explore` with `action:"get"`» |

Dos lecturas:

1. **Ad Recreator ha dejado de ser específico de ChatGPT.** Las referencias a ChatGPT han
   desaparecido del contrato. Eso amplía dónde se puede ejecutar, pero no lo convierte en API.
2. **El método es estable y la fontanería se mueve.** En tres días cambió un nombre de herramienta
   (`models_get` → `models_explore`) y todo el bloque de subida. Es exactamente el argumento para que
   Society guarde **el método como esquema propio** y no dependa de los nombres del proveedor. Si el
   backend hubiera codificado `models_get`, hoy estaría roto.

---

## 5. Video Analysis: fiabilidad insuficiente para un producto

Dos trabajos lanzados, ambos **colgados en `queued`** pasados más de ocho minutos. La herramienta
anuncia 3–5 minutos.

Contraste con el historial de la cuenta (`video_analysis_jobs`, 9 trabajos):

- Los que completaron lo hicieron en **~20 segundos** (creado 23:23:12 → actualizado 23:23:32).
- Hay un trabajo del **09/09 que sigue en `in_progress`** dos semanas después.

O sea: de los trabajos de la cuenta, uno quedó colgado indefinidamente y los dos de hoy van camino de
lo mismo. No hay `fail_reason`, no hay timeout, no hay transición a `failed`: se quedan en cola.

**Para Society esto es un requisito de diseño, no una anécdota.** Coincide con lo que ya dice
`Society_diseno_y_viabilidad.md` §sobre reintentos: hace falta un plazo propio por etapa, y un estado
de negocio que declare «el proveedor no respondió» en vez de esperar indefinidamente. Un trabajo sin
estado terminal es peor que un fallo, porque nada lo recoge.

### Formato que devuelve cuando funciona

De los análisis completados de la cuenta, la estructura por escena es:

```
scene_number · timestamp_start · timestamp_end · shot_type · label · visual · audio
```

donde `label` viene de un vocabulario cerrado: `Opening Hook`, `Product Information`,
`Product Selling Points`, `Usage Scenarios`. `visual` es un párrafo descriptivo largo y `audio`
transcribe o describe la pista.

Eso responde una pregunta del ensayo anterior: **Video Analysis sí da la capa de interpretación**
(etiqueta la función persuasiva de cada escena), que es justo lo que mi pila de ffmpeg no puede dar.
Pero la da en prosa, con marcas de tiempo redondeadas al segundo — no con la precisión de milisegundo
de `select=scene`. Las dos capas son complementarias, no sustitutivas.

---

## 6. Actualización de la comparación

| | Pila propia (ffmpeg + visión) | Higgsfield |
|---|---|---|
| Cortes con precisión de milisegundo | **Sí** — 35 cortes, rejilla de 0,853 s ±0,065 | No: timestamps al segundo |
| Sonoridad y picos medidos | **Sí** — −12,0 LUFS, +4,7 dBFS | No |
| Rótulos y su ausencia | Sí | Dentro de la descripción en prosa |
| Función persuasiva por escena | No | **Sí** — `Opening Hook`, `Product Selling Points`… |
| Predicción de gancho y retención | No | **Sí** — hook 28, sustain 100, pico en s. 12 |
| Coste | 0 USD | 0 créditos |
| Latencia | 4,8 s | Predictor ~40 s · Análisis **colgado** |
| Automatizable en un backend | Sí | Sólo por MCP, con estados que se cuelgan |

**Conclusión revisada:** el reparto no es «la pila mide y el método razona», como escribí ayer. Es más
fino:

- La **pila propia** da precisión física y disponibilidad garantizada.
- El **Virality Predictor** da lo único que nadie más da: una predicción de gancho que ya ha
  contradicho mi lectura humana una vez. Vale su peso, con el techo de 16 s declarado.
- El **Video Analysis** da etiquetado persuasivo, pero hoy no es fiable.
- El **contrato de Ad Recreator** da el esquema del razonamiento, y es lo más estable de todo: no ha
  cambiado en tres días mientras la fontanería sí.

---

## 6bis. Coste y tiempo: Ad Recreator frente a nuestra automatización

Añadido el 22/09 con `transactions` y `marketing_studio_v2_costs`, ambas gratuitas. **Todo lo de este
apartado son cobros reales de la cuenta, no estimaciones**, salvo donde se diga.

### El Reel 09, reconstruido al céntimo y al segundo

Las transacciones del 16/09 entre las 23:36:15 y las 23:48:01 reconstruyen la pieza entera:

| Hora | Concepto | Créditos |
|---|---|---|
| 23:36:15–16 | 7 × Nano Banana Pro (**en 1,09 s: fueron un lote**) | 14,00 |
| 23:38:27 | 2 × Nano Banana Pro (correcciones, también en lote) | 4,00 |
| 23:42:22 | Seedance 2.5, multitoma de 10 s | 90,00 |
| 23:42:35 | Kling 3.0 pro, 3 s | 5,25 |
| 23:42:58–23:43:04 | 3 × Seed Audio 1.0 | 1,50 |
| 23:44:20 | Kling 3.0 pro, 3 s | 5,25 |
| 23:48:01 | Kling 3.0 pro, 3 s | 5,25 |
| | **Total** | **125,25** |

Cuadra **exactamente** con los 125,25 del informe del Reel 09, lo que valida el método.

**Ventana de generación: 11 min 46 s.** Primer dato de tiempo real que tiene el proyecto.

> **Matiz:** el cobro se asienta al enviar, no al completar. Esos 11:46 son el lapso entre el primer
> envío y el último, así que son un **suelo**, no el tiempo total hasta tener los archivos.

**Hallazgo de eficiencia:** las imágenes se lanzaron en lote (7 cobros en 1,09 s) pero **los tres
clips de Kling se enviaron en serie**, separados 1 min 45 s y 3 min 41 s. Alguien esperaba a ver cada
resultado antes de pedir el siguiente. Con `generate_video_batch` + `jobs_wait` esos tres van en
paralelo: es tiempo que la automatización recupera sin gastar un crédito más.

### Precio por segundo — y una subida del 33 % en seis días

> ⚠️ **Corrección del 22/09 por la tarde.** Las cifras de este apartado se calcularon primero con los
> **cobros históricos** del 16/09. Al hacer `get_cost` con la tarifa **viva** resultó que el precio ha
> subido. Lo de abajo ya está corregido; la tabla del encargo usa la tarifa nueva.

Cobros reales del 16/09, tres importes independientes de Seedance 2.5 a 1080p:

| Cobro | Duración | Créditos/s |
|---|---|---|
| 54 cr | 6 s | 9,0 |
| 72 cr | 8 s | 9,0 |
| 90 cr | 10 s | 9,0 |

Tarifa viva el 22/09, con `get_cost` (preflight, no gasta):

| Configuración | Coste | Créditos/s |
|---|---|---|
| Seedance 2.5 · 8 s · 1080p | 96 cr | **12,0** |
| Seedance 2.5 · 12 s · 1080p | 144 cr | 12,0 |
| Seedance 2.5 · 15 s · 1080p | 180 cr | 12,0 |
| Seedance 2.5 · 8 s · 720p | 56 cr | **7,0** |
| Seedance 2.5 · 15 s · 720p | 105 cr | 7,0 |
| Kling 3.0 pro · 3 s | 6 cr | **2,0** |

**Seedance 2.5 1080p pasó de 9,0 a 12,0 cr/s: +33 % en seis días.** Kling 3.0 pro pasó de 5,25 a 6 cr
por clip de 3 s: +14 %. El salto 1080p→720p divide el precio por 1,7.

**Seedance 1080p cuesta 6,0 veces más por segundo que Kling 3.0 pro** (12,0 frente a 2,0). Ese ratio
—no el precio absoluto— es la palanca económica de todo el sistema, y ha *aumentado*.

> **Consecuencia para el TFG, y no es menor:** el informe de viabilidad y todos los precios de plan
> están calculados sobre 9 cr/s. Con 12 cr/s el coste variable de vídeo sube un tercio. **El modelo de
> precios hay que rehacerlo, y hay que rehacerlo con una tarifa que se consulta, no que se guarda.**
> Es el argumento más claro de todo el ensayo a favor del registro de capacidades con fecha de
> verificación: aquí un número caducó en menos de una semana.

### Mismo encargo: un Reel de 22 s con 7 beats, a tarifa del 22/09

| Ruta | Composición | Créditos | USD |
|---|---|---|---|
| **A · Ad Recreator** | 22 s en Seedance 2.5 1080p (su contrato prohíbe acortar el anuncio para que quepa en una llamada) + 7 keyframes | **278** | 13,90 |
| A con una pasada correctiva sobre un tercio de los planos | | 366 | 18,30 |
| **B · Nuestra automatización** | 4 × Kling 3 s + 1 multitoma Seedance 1080p 10 s + 10 keyframes + voz | **165,50** | 8,28 |
| **C · Marketing Studio** | flujo `reference_to_video`: 38 + 4,96/s (tarifa oficial del documento de costes) | **147,12** | 7,36 |

C está confirmado por un cobro real de **150 créditos** el 20/09 («Marketing Studio Video»), y es el
único de los tres cuya tarifa **no** ha subido — porque viene de `marketing_studio_v2_costs`, un
documento de precios publicado, no de los modelos sueltos.

**A cuesta 1,68 veces B. C cuesta 0,89 veces B**, es decir: con los precios de hoy, **Marketing Studio
ha pasado a ser más barato que nuestra propia receta**, cosa que no era cierta con la tarifa del 16/09.
Merece una comprobación de calidad antes de sacar conclusiones, pero invierte la recomendación.

La diferencia no es que Higgsfield cobre de más: **es que Ad Recreator produce todo el metraje con el
modelo caro**. Nuestra receta usa Seedance solo donde hace falta (manos, interacción con la comida) y
Kling donde no, y agrupa los planos complejos en una multitoma. Esa decisión por plano es el ahorro,
y es exactamente lo que un flujo llave en mano no puede tomar.

### Tiempo

| | Ad Recreator | Nuestra automatización |
|---|---|---|
| Análisis de la referencia | Incluido, sin cifra | **4,8 s medidos**, 0 créditos |
| Predicción de gancho | No lo contempla | **~40 s medidos**, 0 créditos, techo de 16 s |
| Envío de generaciones | Lotes de ≤6 con `jobs_wait` | Igual, pero hoy se hace en serie: **11 min 46 s** de ventana en el Reel 09 |
| Montaje | `sandbox_exec` del proveedor | Remotion, ~5 min **estimados, nunca medidos** |
| Presencia humana | **De principio a fin** | Solo en dos puertas de aprobación |

**No hay ningún tiempo medido de Ad Recreator**: no se ha ejecutado. Lo único afirmable de su
contrato es el alcance — *una producción acotada más como mucho dos envíos correctivos* — y que exige
completar 10 + 5 + 8 apartados antes de generar nada.

La diferencia que sí es estructural y no depende de cronometrar nada: **en Ad Recreator hay una
persona ocupada durante toda la pieza; en Society solo en las puertas.** A una pieza al mes da igual;
a 20 restaurantes con 4 piezas al mes, decide si el negocio existe.

## 7. Pendiente

1. Ver si los dos análisis salen de `queued` o hay que darlos por perdidos.
2. Medir el predictor sobre un Reel propio de Torre de Vega y comparar el hook con su rendimiento
   real en Instagram — es la única forma de saber si el score predice algo.
3. Corregir la regla 3 de `reglas_videos.md` con el techo de 16 s.
4. Decidir el plazo máximo por etapa para Society, a la vista de los trabajos colgados.
