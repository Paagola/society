# Fuentes de plantillas para Reels — probado el 2026-09-08

De dónde sacar los vídeos base que se analizan antes de escribir un guion. Todo lo que sigue está
**probado ejecutando el pipeline**, no supuesto.

---

## 1. Comparativa de fuentes (medida)

| Fuente | ¿Reels editados? | Acceso programático | Puntuación viral | Veredicto |
|---|---|---|---|---|
| **Instagram/TikTok grabando pantalla** | ✅ verticales | ❌ manual | ✅ | **La mejor calidad** |
| **YouTube** vía yt-dlp | ✅ pero horizontales | ✅ **automatizable entero** | ✅ | Volumen, calidad media |
| YouTube vía `youtube_url` de Higgsfield | ✅ | ✅ gratis, ~25 s | ❌ imposible | Solo estructura |
| Pexels / Pixabay / Coverr | ❌ clips sueltos | ✅ | ✅ | **Descartado** |

### Puntuaciones reales obtenidas

| Vídeo | Fuente | Formato | Overall | Viral | Hook | Visual |
|---|---|---|---|---|---|---|
| Plantilla mesa que se llena | Instagram, grabación pantalla | vertical | **44** | **41** | 29 | 0,525 |
| `carne.mp4` | Aportado por el cliente | vertical | 41 | 40 | 25 | — |
| Pizza B-roll comercial | YouTube, yt-dlp | horizontal | 40 | 39 | 24 | 0,460 |
| Nuestro Reel 01 v4 | Producción propia | vertical | 40 | 38 | 25 | 0,443 |
| Montaje de comida | Pexels stock | horizontal | 39 | 38 | 23 | 0,465 |

**Dos conclusiones medidas:**

1. **El stock no sirve.** Puntúa lo mismo que nuestros propios Reels y peor que cualquier plantilla
   real. Son clips sueltos; lo que da valor a una plantilla es la estructura de montaje.
2. **El contenido horizontal de YouTube tampoco.** El B-roll de videógrafo arranca con el DMN en
   0,787 —el peor medido— y la corteza visual en 0,371. Construye despacio, que es exactamente lo
   contrario de lo que necesita un Reel. La plantilla vertical de Instagram arranca con la atención
   en su máximo.

**El formato importa tanto como el contenido.** Un vídeo pensado para verse en horizontal con
sonido y paciencia no sirve de plantilla para el feed vertical.

---

## 1bis. La automatización completa — construida y probada

**Existe y funciona de punta a punta.** Script: [`buscar_plantillas.sh`](buscar_plantillas.sh).

```
yt-dlp ytsearch → filtrar por duración 5-16s → descargar
  → media_upload → curl PUT → media_confirm → virality_predictor → job_status
```

Probado entero con un vídeo real: buscado, descargado (15,7 s), subido, puntuado (40/39). Sin
intervención manual en ningún paso.

**Requisitos y trampas:**
- `python -m pip install yt-dlp` — ya instalado en esta máquina (v2026.08.19).
- **Avast intercepta TLS en este equipo** y rompe la verificación de certificados de yt-dlp. Hay que
  pasar `--no-check-certificates`. Combinar el `avast-root.pem` con el bundle de certifi **no
  funciona** — se probó.
- Filtrar por **5-16 s**: el Virality Predictor rechaza cualquier cosa por encima de 16 s.

**Pero el rendimiento del pipeline es mediocre, y hay que decirlo:** las búsquedas de comida en
YouTube devuelven casi exclusivamente **B-roll horizontal de videógrafos**, no Reels verticales de
restaurante. Se probaron tres consultas distintas orientadas a vertical y ninguna devolvió contenido
9:16 en el rango de duración. Los dos candidatos medidos puntuaron 40/39 y 39/38, frente al 44/41 de
la plantilla que se consiguió a mano en Instagram.

**Veredicto honesto:** la automatización sirve para estudiar muchas estructuras rápido y sin coste,
pero **no supera a un buen candidato elegido a mano en Instagram**. Lo que la haría ganar sería
acceso programático a contenido vertical de Instagram/TikTok, y esa vía está cerrada (§2).

## 2. Limitación técnica encontrada

`video_analysis_create` **acepta `youtube_url` directamente** y devuelve el desglose de planos en
~25 segundos sin descargar nada. Probado y funcionando.

**Pero `video_s3_url` vuelve `null`** al completarse, así que no se puede recuperar el fichero para
pasarlo al `virality_predictor`, que exige un `media_id` confirmado. Con YouTube se obtiene la mitad
del análisis (regla 4), nunca la puntuación (regla 3).

`media_import_url` sí importa cualquier URL HTTPS directa a `.mp4` (máx 50 MB) y devuelve un
`media_id` válido para puntuar — pero **no existe una fuente de Reels verticales editados con URL
directa a `.mp4`**.

### Fuentes probadas y bloqueadas (2026-09-08)

| Fuente | Resultado |
|---|---|
| Reddit JSON (`/r/foodvideos/hot.json`) | **403** — ahora exige OAuth |
| TikTok Creative Center (Top Ads) | **`40101 no permission`** — requiere token |
| Meta Ad Library | **403** con challenge de JavaScript |
| Bluesky API pública | **403** |
| Vimeo `player.vimeo.com/.../config` | Responde 200, pero **cero MP4 progresivos** — ya solo sirve HLS |

Todas las plataformas donde viven los Reels verticales buenos bloquean el acceso programático. Las
que lo permiten (stock) tienen contenido que mide peor.

---

## 3. El pipeline recomendado — dos fases

### Fase 1 · Cribado masivo, gratis

Para descartar rápido y estudiar estructuras sin gastar nada ni descargar nada:

```
video_analysis_create(youtube_url: "https://www.youtube.com/shorts/XXXX")
video_analysis_status(video_analyze_id)   → ~25 s
```

Devuelve por escena: `timestamp`, `shot_type`, descripción visual y descripción de audio. Suficiente
para juzgar si la estructura merece la pena. Se pueden screenear decenas en minutos.

### Fase 2 · Finalistas, análisis completo

Para los 2-3 que sobrevivan al cribado: **grabar la pantalla** del Reel (que es lo que ya se hace) y
pasarlo por el flujo completo.

```
media_upload → curl PUT → media_confirm → virality_predictor → job_status(sync:true)
```

Y en local, gratis, el desglose de cortes exacto que Higgsfield no separa:

```bash
ffmpeg -hide_banner -i PLANTILLA.mp4 -filter:v "select='gt(scene,0.2)',showinfo" -f null - 2>&1 \
  | grep -oE "pts_time:[0-9.]+"
```

⚠️ Límite del Virality Predictor: **16 segundos**.

---

## 4. Qué buscar — heurística respaldada por las mediciones

No hay una web mágica. Lo que discrimina una buena plantilla de una mala es la **estructura**, y las
mediciones dicen exactamente qué mirar:

| Señal | Por qué |
|---|---|
| **Muchos elementos por fotograma** | Es la palanca demostrada dos veces. Mesa con seis platos: corteza visual 0,525. Plato único: 0,443. |
| **Cada corte aporta algo nuevo** | El formato de acumulación mantiene la curva plana y alta — sustain 100. |
| **Sin momentos flojos** | La mejor plantilla va de 0,339 a 0,349 sin caer nunca. Las malas suben y bajan. |
| **La atención hace pico al principio** | En la buena, la red frontoparietal marca su máximo en t=0. En las flojas se hunde justo en el hook. |
| **Cortes de 0,4-0,9 s** | Con destellos de 2-3 fotogramas tapando las entradas de mano. |

**Formatos que han medido bien:**
- **Acumulación** — la mesa que se va llenando plato a plato. El mejor medido (44/41).
- **Montaje rápido** — ~1 s por plano con loop de apertura/cierre. Medio (41/40).

**Formatos a evitar como plantilla:**
- Clip único de un plato, por bonito que sea. Poca información por fotograma.
- Compilaciones de stock. Medido: 39/38.

---

## 4bis. Instagram por palabra clave — sí es automatizable (probado el 2026-09-17)

La búsqueda dentro de Instagram está cerrada, pero **la descarga de un Reel público suelto no**:

```
WebSearch  site:instagram.com/reel <plato o producto> <restaurante|asador>
  → yt-dlp https://www.instagram.com/reel/<id>/ --no-check-certificates   (sin login, 720×1280)
  → contact sheet → filtro de contenido → recorte ≤15 s → virality_predictor
```

Rendimiento real: 8 búsquedas → 9 Reels candidatos → 2 pasan el filtro de contenido. YouTube con las
mismas palabras clave devolvió 0 verticales válidos. Detalle en `plantillas/2026-09-17/README.md`.

## 5. Dónde buscar candidatos

Por orden de utilidad real:

1. **Instagram y TikTok** — donde viven los Reels que funcionan. Buscar cuentas de videografía
   gastronómica y de restaurantes con producción alta. Grabar pantalla de los que encajen con la
   heurística de §4. Es lo que produjo la mejor plantilla que tenemos.
2. **YouTube Shorts** — peor contenido de restaurante en general, pero se criba gratis y rapidísimo.
   Útil para estudiar muchas estructuras seguidas antes de decidir qué buscar en Instagram.
3. **Biblioteca de anuncios de Meta** — anuncios de restauración que están activos y con gasto detrás.
   No probado todavía; el filtro de "alguien está pagando por esto" es un buen indicador de calidad.

**Nota sobre uso:** los vídeos se analizan como referencia estructural para escribir un guion propio;
no se reutiliza metraje ajeno. Lo que se copia es el ritmo y la progresión de planos, nunca el
material ni el look (regla 1).
