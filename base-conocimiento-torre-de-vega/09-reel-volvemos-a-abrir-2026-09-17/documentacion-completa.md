<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Reel 09 «Volvemos a abrir» — documentación completa de producción

**Fecha de producción:** 2026-09-17 (una sola sesión)
**Cliente:** Torre de Vega «El Mora» — Barriada La Alquería, Alhaurín de la Torre (Málaga)
**Pieza:** Reel de Instagram 9:16, 1080×1920, 11,46 s, sin voz ni música (pendientes)
**Entregable vigente:** `imagenes/generadas/reel_09_carta_de_otono/REEL_09_montaje_v3_sin-fecha_sin-voz.mp4` (recurso no incluido: `../imagenes/generadas/reel_09_carta_de_otono/REEL_09_montaje_v3_sin-fecha_sin-voz.mp4`)
**Guion de trabajo:** [`instagram/reel_09_carta_de_otono.md`](../04-guiones-reels-reales/reel_09_carta_de_otono.md)

Este documento recoge **todo** lo que se hizo, en orden: el prompt de partida, las decisiones, las
herramientas instaladas, la búsqueda de plantillas, las referencias reales, los prompts literales
enviados a los modelos, los IDs de cada trabajo, los costes, el montaje, las correcciones del cliente,
los errores y lo que queda pendiente. Está escrito para que otra sesión pueda reproducir o continuar
la pieza sin preguntar nada.

---

## Índice

1. [Resumen en una tabla](#1-resumen-en-una-tabla)
2. [Punto de partida: el prompt y el brief](#2-punto-de-partida-el-prompt-y-el-brief)
3. [Programas y servicios utilizados](#3-programas-y-servicios-utilizados)
4. [Instalación de OpenMontage y Remotion](#4-instalación-de-openmontage-y-remotion)
5. [Decisión de arquitectura: qué hace cada herramienta](#5-decisión-de-arquitectura-qué-hace-cada-herramienta)
6. [Lectura obligatoria previa](#6-lectura-obligatoria-previa)
7. [Punto A y primera corrección del cliente](#7-punto-a-y-primera-corrección-del-cliente)
8. [Búsqueda de vídeos de referencia](#8-búsqueda-de-vídeos-de-referencia)
9. [Análisis de la plantilla elegida](#9-análisis-de-la-plantilla-elegida)
10. [Traducción a Torre de Vega y guion](#10-traducción-a-torre-de-vega-y-guion)
11. [Referencias reales utilizadas](#11-referencias-reales-utilizadas)
12. [Metodología de prompt](#12-metodología-de-prompt)
13. [Generación de imágenes fijas](#13-generación-de-imágenes-fijas)
14. [Generación de vídeo](#14-generación-de-vídeo)
15. [Muestras de voz](#15-muestras-de-voz)
16. [Montaje en Remotion](#16-montaje-en-remotion)
17. [Control de calidad](#17-control-de-calidad)
18. [Correcciones del cliente y versiones](#18-correcciones-del-cliente-y-versiones)
19. [Costes](#19-costes)
20. [Errores, trampas y cómo se resolvieron](#20-errores-trampas-y-cómo-se-resolvieron)
21. [Cambios hechos en la documentación del proyecto](#21-cambios-hechos-en-la-documentación-del-proyecto)
22. [Inventario de ficheros](#22-inventario-de-ficheros)
23. [Cómo reproducir o continuar](#23-cómo-reproducir-o-continuar)
24. [Pendientes y bloqueos](#24-pendientes-y-bloqueos)
25. [Anexo A — Prompts literales de imagen](#anexo-a--prompts-literales-de-imagen)
26. [Anexo B — Prompts literales de vídeo](#anexo-b--prompts-literales-de-vídeo)

---

## 1. Resumen en una tabla

| Fase | Qué se hizo | Herramienta | Coste |
|---|---|---|---|
| Instalación | OpenMontage clonado e instalado con Remotion, Piper y faster-whisper | git, Python 3.13 venv, npm | 0 |
| Referencias | 12 búsquedas en YouTube + 8 en Instagram por palabra clave; 6 Reels descargados; 3 pasan el filtro | yt-dlp, WebSearch, ffmpeg | 0 |
| Análisis | Cortes por ffmpeg, desglose por escenas; el predictor de viralidad falló | ffmpeg, Higgsfield Video Analysis | 0 |
| Guion | 8 planos traducidos de la plantilla 01 a Torre de Vega | — | 0 |
| Imágenes | 7 keyframes + 2 correcciones; 6 aprobados, P7 eliminado | Higgsfield `nano_banana_pro` (devuelto `nano_banana_2`) | 18 |
| Vídeo | 1 multitoma Seedance 2.5 (3 planos) + 3 clips Kling 3.0 | Higgsfield | 105,75 |
| Voz | 3 muestras de 5,4 s | Higgsfield `seed_audio` | 1,5 |
| Montaje | Composición propia `TorreDeVegaReel`, 5 renders, 3 versiones entregadas | OpenMontage + Remotion 4 | 0 |
| **Total** | | | **125,25 créditos** |

---

## 2. Punto de partida: el prompt y el brief

### El prompt

El usuario pasó la ruta `C:\Users\victo\PANGO\D.A.M\tfg\prompts\openmontage-reel-torre-de-vega.md` y
pidió «ejecuta el prompt para hacer el reel». El prompt define:

- Pipelines de OpenMontage (`cinematic` con referencia, `hybrid` con metraje real).
- Prohibiciones: stock, texto a vídeo, fuego generado, `minimax_hailuo`, handheld, 720p.
- Tabla de modelos: Nano Banana Pro 2K para keyframes, `kling_official_video` pro 1080p para planos
  simples, Seedance 2.5 1080p para manos.
- Cinco puntos de aprobación: A análisis, B guion, C keyframes, D clips, E montaje.
- Voz es-ES con muestra previa; subtítulos alineados medidos; Bodoni MT sin contorno.
- Entregables: vídeo, guion `.md`, registro de intentos, aprendizajes propuestos.

### El brief (bloque YAML del prompt)

Venía vacío. Se preguntó con `AskUserQuestion`:

| Campo | Respuesta del cliente |
|---|---|
| `pieza` | **Carta de otoño + fecha** (plan de contenido, semana 28 sep – 4 oct) |
| `montaje_final` | **OpenMontage + Remotion** |
| `estilo_de_luz` | **Dramático (regla 17)** |
| `voz_en_off` | **Sí** |
| `noticia_o_motivo_para_reenviar` | Sin respuesta (fecha de la carta de otoño) — sigue pendiente |
| `presupuesto_maximo_usd` | Sin respuesta |
| `reel_de_referencia` | Sin respuesta → **corrección: buscarla es obligatorio** (§7) |
| `objetivo` / `duracion` / `cta` | Propuestos por defecto (reenvío, 12 s, reserva + pregunta); el cliente dijo «procede» |

---

## 3. Programas y servicios utilizados

| Programa / servicio | Versión | Para qué |
|---|---|---|
| **Claude Code** (extensión VS Code) | Claude Opus 5 | Orquestación completa |
| **Higgsfield MCP** (plan Plus) | — | Imágenes, vídeo, voz, análisis de vídeo, subida de medios |
| **OpenMontage** | commit `08e2151` (2026-09-05) de `github.com/calesthio/OpenMontage`, AGPL-3.0 | Entorno de montaje |
| **Remotion** | 4.0.484 (dentro de `remotion-composer`) | Composición y render del Reel |
| **Node.js** | 22.14.0 | Remotion |
| **Python** | 3.13.3 (sistema) + venv en `C:\Users\victo\OpenMontage\.venv` | Scripts, OpenMontage |
| **ffmpeg / ffprobe** | 9.0.1 full build (winget Gyan.FFmpeg) | Cortes, recortes, contact sheets, fotogramas, verificación |
| **yt-dlp** | 2026.08.19 | Búsqueda y descarga de Reels de referencia |
| **faster-whisper** | instalado en el venv de OpenMontage, modelo `small` | Transcripción de las muestras de voz |
| **truststore** | 0.10.4 | Saltar la intercepción TLS de Avast al descargar el modelo de Whisper |
| **Pillow** | 11.3.0 (sistema) | Contact sheets, recortes de inspección |
| **numpy** | 2.5.3 (venv) | Medición de contraste de rótulos |
| **Piper TTS** | 1.8.0 | Instalado con OpenMontage; **no se usó** |
| **git** | sistema | Clonar OpenMontage |
| **WebSearch / WebFetch** | — | Localizar el repo y los Reels de Instagram |
| **Bodoni MT Regular** | `C:\Windows\Fonts\BOD_R.TTF` | Tipografía aprobada de los rótulos |
| **After Effects** | — | **No se usó.** El cliente quiere dejar de pagarlo |

No se usaron: Canva, Blender (su MCP falló al conectar), las API de fal / Kling oficial / ElevenLabs.

---

## 4. Instalación de OpenMontage y Remotion

OpenMontage y Remotion no estaban instalados. El cliente pidió descargarlos «porque quiero dejar de
pagar After Effects».

1. **Localizar el repo oficial.** Búsqueda web → `calesthio/OpenMontage` (≈59,6k estrellas, AGPL-3.0).
   Los demás resultados eran forks.
2. **Clonar** en `C:\Users\victo\OpenMontage` (fuera del proyecto del cliente y del TFG):
   ```powershell
   git clone https://github.com/calesthio/OpenMontage.git "C:\Users\victo\OpenMontage"
   ```
3. **Instalar** siguiendo el README para Windows:
   ```powershell
   Set-Location C:\Users\victo\OpenMontage
   py -3 -m venv .venv
   .\.venv\Scripts\python.exe -m pip install --upgrade pip
   .\.venv\Scripts\python.exe -m pip install -r requirements.txt
   Set-Location remotion-composer; npm install; Set-Location ..
   .\.venv\Scripts\python.exe -m pip install piper-tts
   Copy-Item .env.example .env        # vacío: no se ha puesto ninguna clave
   ```
4. **Verificar Remotion:** `npx remotion versions` → «All packages have the correct version».
5. `npm` avisó de **3 vulnerabilidades (1 moderada, 2 altas)**. **No** se ejecutó `npm audit fix`, para
   no cambiar versiones del renderizador. Herramienta local, riesgo bajo.
6. Más tarde: `pip install faster-whisper` en el venv.
7. El primer render de Remotion descarga **Chrome Headless Shell** automáticamente.

### Auditoría del código de OpenMontage (lo que condicionó el plan)

| Hallazgo | Fichero | Consecuencia |
|---|---|---|
| `seedance_video` solo admite `480p` y `720p` | `tools/video/seedance_video.py` l.137-141 | Incumple el mínimo 1080p sin parchear |
| No hay `nano_banana_pro`; solo `google/nano-banana-2` vía Atlas | `tools/atlas_models.py` | No cumple la tabla de modelos |
| `higgsfield_video` usa la **API Cloud** con `HIGGSFIELD_API_KEY` y `HIGGSFIELD_API_SECRET` | `tools/video/higgsfield_video.py` | No aprovecha el plan Plus; se factura aparte |
| `kling_official_video` tiene `720p` por defecto | `tools/video/kling_official_video.py` l.99 | Habría que forzar `1080p` |
| `CinematicRenderer` y la mayoría de composiciones son 1920×1080 con estética fría | `remotion-composer/src/Root.tsx` | Se creó una composición vertical propia |

---

## 5. Decisión de arquitectura: qué hace cada herramienta

Propuesta al cliente y **confirmada** («si confirmo ese plan»):

| Fase | Herramienta | Motivo |
|---|---|---|
| Keyframes | **Higgsfield MCP** `nano_banana_pro` 2K | Plan Plus ya pagado; referencias múltiples |
| Vídeo | **Higgsfield MCP** Seedance 2.5 / Kling 3.0 a 1080p | Plan Plus; 1080p nativo sin parches |
| Montaje, rótulos, render | **OpenMontage + Remotion** | Sustituye a After Effects |
| Voz | Higgsfield `seed_audio` (muestras) | Piper tiene poca calidad en español de España |

---

## 6. Lectura obligatoria previa

Todos verificados en disco y leídos:

| Fichero | Qué se sacó para esta pieza |
|---|---|
| `CLAUDE.md` | Flujo del Reel, reglas duras, correcciones fechadas |
| `imagenes/reglas_videos.md` (675 líneas) | Reglas 1, 5, 6, 7, 9, 10, 11, 12, 15, 16, 17 (variedad de ángulos), 18 (Kling simple / Seedance 2.5 manos) |
| `imagenes/reglas_imagenes.md` (871 líneas) | Reglas 1, 9quater, 13, 14, 15, 17, 22, 23, 24, 25, 26, 27 |
| `directoria-cloud/templates/prompt-imagen.md` | JSON Decoded Brief de 14 campos + párrafo NL + coda |
| `directoria-cloud/templates/prompt-video-motion.md` | PRESERVE / MOTION / CAMERA / FILM GRADE + NEGATIVE + coda |
| `informes/2026-09-08_analisis-instagram-90dias.md` | 75 % de abandono a 3 s; el reenvío es el único motor; patrón anuncio + fecha |
| `TFG/.../08-reel-chuleton-2026-09-15/aprendizajes-reel-chuleton.md` | Dos «17» en `reglas_videos.md`; `nano_banana_pro` devuelve `nano_banana_2`; voz Nadine/Cillian; faster-whisper; costes Seedance 2.5 |
| `instagram/plan_contenido_2026-09_a_12.md` | Hueco «carta de otoño, desde el [fecha]» |
| `instagram/reel_06_para_compartir.md` | Formato de guion, trampas de contraste de rótulos (y=330, visillos) |
| `instagram/fuentes_plantillas_reels.md` | YouTube da horizontales; Avast rompe TLS; límite de 16 s del predictor |
| `plantillas/2026-09-08/README.md` y `2026-09-09/README.md` | Filtro de contenido, plantillas ya medidas |
| `imagenes/parrilla/README.md` | El plano de parrilla sale de vídeo real |

### Conflictos de reglas detectados y cómo se resolvieron

| Conflicto | Resolución |
|---|---|
| Luz dramática (regla 17) frente a luz natural (Reel del chuletón, 15-09) | Elección del cliente para esta pieza: **dramática** |
| Dos apartados «17» en `reglas_videos.md` (el primero dice `seedance_2_0` para manos) | Manda la regla 18, que es más reciente: **Kling 3.0 simple, Seedance 2.5 manos** |
| Tabla de la regla 23 (f/5,6-8, 4300 K) frente a la regla 17 (profundidad corta, 3000-3300 K) | Manda la regla 17, que es más reciente y más concreta |
| Prompts del Reel 06 situaban el local en «Cantabria» | Los prompts nuevos dicen **Alhaurín de la Torre, Málaga** |

---

## 7. Punto A y primera corrección del cliente

Se presentó un punto A con tres conceptos (brasa con anuncio, «mismo plano cambia el plato», anuncio
sin platos) **sin vídeo de referencia**, dando por bueno «ninguno».

**Corrección del cliente:** *"Si no tienes ningún vídeo de referencia es obligatorio buscarlo por tu
cuenta, tener al menos 2 o 3 que analices su viralidad y elijas uno, busca siempre por palabras clave a
la comida que vas a hacer el vídeo."* → Anotado en `CLAUDE.md` (§21).

**Bloqueo detectado en ese punto:** no existe documentación de la carta de otoño (ni platos, ni fecha,
ni fotos). Por eso la plantilla elegida tenía que funcionar **sin enseñar platos nuevos**.

---

## 8. Búsqueda de vídeos de referencia

### 8.1 YouTube (yt-dlp) — descartado

Script `scripts/buscar.py` (12 consultas en paralelo, `ytsearch20`, `--no-check-certificates`):

```
carta de otoño restaurante #shorts        nueva carta otoño asador #shorts
setas a la brasa restaurante #shorts      guiso tradicional restaurante #shorts
rabo de toro restaurante #shorts          castañas asadas restaurante #shorts
autumn menu restaurant reel #shorts       new fall menu restaurant #shorts
wild mushrooms grill restaurant #shorts   steakhouse fall menu #shorts
braised short rib restaurant fall #shorts rustic restaurant autumn dishes #shorts
```

Resultado: **236 vídeos únicos**, 37 entre 5 y 60 s. Los que encajaban por contenido (Stanford's new
menu, cochinillo en Segovia, callos de Lakasa, gírgolas de Les Tres Alzines, guiso de Casa Duque, short
ribs) eran **todos horizontales 1920×1080**. Descartados por formato, como ya documentaba
`fuentes_plantillas_reels.md`. Lista completa en `scripts/candidatos_youtube.json`.

### 8.2 Instagram (búsqueda web + yt-dlp) — funcionó

La búsqueda dentro de Instagram está cerrada, pero **la descarga de un Reel público suelto con yt-dlp
funciona sin login** (probado con `C-WCN8URHHv`, 720×1280). Se localizaron URLs con WebSearch:

```
site:instagram.com/reel nueva carta otoño restaurante
site:instagram.com/reel setas temporada restaurante brasa
site:instagram.com/reel "new fall menu" steakhouse
site:instagram.com/reel "menú de otoño" asador OR "cocina tradicional"
site:instagram.com/reel "nueva carta" asador chuletón brasa
site:instagram.com/reel otoño boletus castañas restaurante
site:instagram.com/reel platos de cuchara otoño restaurante guiso
site:instagram.com/reel "autumn menu" "now available" restaurant rustic grill
```

Descarga: `python -m yt_dlp https://www.instagram.com/reel/<id>/ --no-check-certificates -f "best[ext=mp4]/best"`.
Contact sheets de los primeros 16 s con `scripts/sheets.ps1` (12 fotogramas, `tile=6x2`).

### 8.3 Filtro de contenido (antes de puntuar, regla de `CLAUDE.md`)

| ID | Cuenta | Dur. | Resolución | Contenido visto en el contact sheet | Filtro |
|---|---|---|---|---|---|
| `DHRrUlSu4LP` | @1835 Carne e Brasa (Kempinski Laje de Pedra) | 45,8 s | 720×1280 | «A uma nova temporada»: hierba, ventana, mano retirando silla, fuego, sala, lámpara, mesa, plato, copas | ✅ **01** |
| `DTh3_9hD4fA` | @cenandoconpablo (NaBrasa Ourense) | 164 s | 720×1280 | Presentador con chuletón, patio, caldo gallego **con «10 €» en pantalla** | ✅ **02** |
| `A_new-season-new-menu` | Ya en `plantillas/2026-09-09/` (CLARENCE) | 10,9 s | — | Nuevo menú de temporada; medida antes: hook 28 / overall 43 / viral 42 | ✅ |
| `DSHuvY1EuCi` | Castaño Nervión | 20,5 s | 720×1280 | Cafetería de desayunos | ❌ cafetería |
| `DNAuuG-NNQT` | Restaurante El Limón | 48,2 s | 360×640 | Fine dining urbano, maître a cámara | ❌ |
| `DByfhwgx8O9` | Tabernacle | 17,2 s | 360×640 | Menú de otoño con sushi | ❌ sushi |
| `C-WCN8URHHv` | Tu Asador | 5,1 s | 720×1280 | Obras y rótulo de apertura, sin comida | ❌ |

Descartados también por título sin descargar: `DY0iYpDxMAy` (vendedor de menaje), `DAmOMl3xNwl` (cóctel),
`Crk85qtLlZR` (1:1, cocina búlgara), `DSh4kTEjY10` (cambio de horario de marisquería).

### 8.4 Medición de viralidad — ⛔ falló el servicio

Recortes a 15,9 s y después a 15 s (`ffmpeg -t 15 -c:v libx264 -crf 18 -c:a aac`), subida con
`media_upload` → `curl PUT` → `media_confirm`, y `virality_predictor`:

| Vídeo | `media_id` | `job_id` predictor | Estado |
|---|---|---|---|
| 01 · 15,9 s | `ceae0292-5504-45c9-9bbc-6d6f48cf378f` | `f3fcb70c-a381-4a9f-9f2b-df008a5ef866` | failed |
| 02 · 15,9 s | `dec5585b-0062-410c-85b5-8ffcc3c35424` | `021b61e5-3d08-4b3c-b94a-67206fcf4db9` | failed |
| 01 · 15 s | `5c8bd627-6341-4dc9-9fdf-e88a2cfd284e` | `9ff9fcf5-f7c4-4337-aaaf-7c2776eddf1f` | failed |
| 02 · 15 s | `7d5bad2c-b520-44f5-b7b9-34e31de8d1d1` | `8675ff06-492d-4c21-a297-2b329987a064` | failed |
| **Control** B_south-indian-meal (54/51 el 09-09) | `cf41357e-5bcf-4558-9db8-0a383415a80e` | `c7ab7cda-0677-4d8a-939d-3679c456f1db` | failed |

Todos fallaron sin `fail_reason`, **incluido el control**, así que era un fallo del servicio. Sin
cargo (saldo 498,13 antes y después). **La elección de plantilla se hizo sin puntuación de viralidad**
porque el cliente dijo «elige el que quieras».

### 8.5 Desglose por escenas (Video Analysis) — funcionó, gratis

| Vídeo | `video_analyze_id` |
|---|---|
| 01 | `8896f0bf-3812-42ed-8162-27d22bdfd39a` |
| 02 | `b6cb334b-2196-473e-b849-db941050b3b9` |

Todo en `plantillas/2026-09-17/` + `README.md`.

---

## 9. Análisis de la plantilla elegida

**Elegida: 01 · 1835 Carne e Brasa.** Motivo: anuncia una temporada nueva **enseñando el sitio, no
platos**, y eso esquiva el bloqueo de la carta de otoño sin inventar nada (regla 1). Además su look
oscuro de una fuente coincide con la regla 17.

### Cortes medidos

```powershell
ffmpeg -hide_banner -i 01_..._16s.mp4 -filter:v "select='gt(scene,0.2)',showinfo" -f null -
```

Cortes: **1,93 · 3,67 · 5,57 · 8,07 · 9,73 · 10,93 · 11,70 · 13,63 · 14,40 s** (planos de ~1,7 s).

### Fotogramas de referencia — uno por plano, en el punto medio (regla 10)

| Plano plantilla | Fichero | Qué muestra |
|---|---|---|
| 01 | `frames_01/01_plano01_0.96s.jpg` | Hierba en rack focus |
| 02 | `01_plano02_2.8s.jpg` | Ventana con árboles y copa desenfocada |
| 03 | `01_plano03_4.62s.jpg` | Mano retirando silla, «Sejam bem-vindos» |
| 04 | `01_plano04_6.82s.jpg` | Fuego sobre leña |
| 05 | `01_plano05_8.9s.jpg` | Sala tras cristal, «A uma nova temporada» |
| 06 | `01_plano06_10.33s.jpg` | Lámpara de cristal en contrapicado |
| 07 | `01_plano07_11.32s.jpg` | Mesa larga con copas |
| 08 | `01_plano08_12.66s.jpg` | Plato con marca y copa, «Na história do 1835…» |
| 09 | `01_plano09_14.02s.jpg` | Culos de botella en botellero |
| 10 | `01_plano10_14.7s.jpg` | Copas desenfocadas con punto de luz |

**Rótulos de la plantilla:** serif fino, pequeño, centrado, en minúscula cursiva. Se sustituye por la
tipografía aprobada.

---

## 10. Traducción a Torre de Vega y guion

| Plantilla | Torre de Vega | Cambio y motivo |
|---|---|---|
| Hierba quieta (abre) | — | Abría con plano quieto: incumple la regla 12 |
| Fuego | P1 vídeo real de parrilla | Regla 22. **Quitado en la v2 por el cliente** |
| Mano + silla | **P2** mano de mujer retirando silla real | Acción empezada en el fotograma 1 |
| Sala tras cristal | **P3** sala real en penumbra, copa delante | |
| Lámpara de cristal | **P4** lámpara de forja real | Nunca copiar la lámpara de la plantilla |
| Mesa con copas | **P5** vino tinto cayendo en la copa | Acción para el vídeo; copas llenas (regla 15) |
| Plato con marca | **P6** plato liso real con relieve y copa servida | Sin texto en el plato (regla 24) |
| Culos de botella | ~~P7 botellero~~ | **Eliminado** (§13.3) |
| Copas con luz | **P8** copa desenfocada, aplique encendido, placa de marca | |

Guion con tiempos, ángulos, movimiento y rótulos: [`instagram/reel_09_carta_de_otono.md`](../04-guiones-reels-reales/reel_09_carta_de_otono.md).

**Variedad de ángulos (regla 17 de vídeo):** lateral bajo (P2), bajo de sala (P3), contrapicado (P4), a
ras de mesa (P5), 3/4 alto (P6), nivel de mesa con foco corto (P8).
**Manos (regla 13):** P2 mujer, P5 hombre, P6 mujer.

---

## 11. Referencias reales utilizadas

Revisadas antes con contact sheets etiquetados (`scripts/grid.py`) de `imagenes/local/` (72 fotos) e
`imagenes/parrilla/` (17). Lo que fijan: mantel **beige con relieve** sobre bajo-mantel rosa pálido;
sillas de madera color miel con respaldo tallado, balaustres torneados y asiento de enea; ladrillo visto
con apliques de forja y visillos blancos; lámpara de corona de forja negra con bombillas vela; platos
blancos con relieve de volutas y rombos en el ala; copas de vino grandes de cristal fino; botellero de
metal negro.

### Subidas a Higgsfield (2026-09-17)

| Fichero real | `media_id` | Usado en |
|---|---|---|
| `imagenes/local/mesa-ventana.jpg` | `5e36c978-0917-4110-9df9-2051d30d75c4` | P2, P6 |
| `imagenes/local/mesas-restaurante3.jpg` | `4cb9bfc6-c556-4b3f-8e07-952f22d90536` | P2, P3, P8 |
| `imagenes/local/mesas-restaurante4.jpg` | `16bc9d8e-98d3-4c3c-9261-52b7747bdb77` | P3, P4, P5 |
| `imagenes/local/panoramica-restaurante.jpg` | `ed605e4c-5efb-4407-92d0-207257eb1552` | P3 |
| `imagenes/local/photo_5805514308144795419_y.jpg` (lámpara) | `929483bf-4d49-4b48-ae3c-4ad732ee843d` | P4 |
| `imagenes/local/photo_5805514308144795414_y.jpg` (botellero) | `b9a63457-1614-4a71-9ff0-b15ebe0df35b` | P7 |
| `imagenes/local/mesa-chimenea.jpg` | `630b8260-bbfd-4459-afeb-2e9620a497cb` | P5, P8 |
| `imagenes/local/plato-blanco-formal.jpg` | `d96e740c-9820-4249-8ffe-13883ecd2066` | P6 |
| `imagenes/vinos/copa-vino-grande.jpg` | `32314c78-7b76-4ac9-a66b-28b3ededa6d0` | P5, P6, P8 |
| `plantillas/2026-09-17/frames_01/01_plano03_4.62s.jpg` | `ba12d232-4684-4bcf-b824-d7d55ca1d9eb` | P2 (solo cámara y luz) |
| `…/01_plano05_8.9s.jpg` | `602eb1c4-81b7-45a9-a0ca-a8bc5fd090c6` | P3 |
| `…/01_plano06_10.33s.jpg` | `59fcacc2-1d00-48fa-9f2d-86b76d84bb24` | P4 |
| `…/01_plano07_11.32s.jpg` | `8d0cee0b-ba6e-41f6-9c00-b77c41d88f84` | P5 |
| `…/01_plano08_12.66s.jpg` | `2030bf15-b694-4294-9dc3-007797e16205` | P6 |
| `…/01_plano09_14.02s.jpg` | `704088d1-f294-4761-8f8f-8fc5ac8a7d3d` | P7 |
| `…/01_plano10_14.7s.jpg` | `2bc0a443-48d8-4f43-a30e-3e95bde0241c` | P8 |

La respuesta de `media_upload` con 16 ficheros superaba el límite de salida. Se leyó el JSON guardado
y se subió con `scripts/put_uploads.py` (PUT con `urllib` y contexto SSL sin verificar por Avast).

**Metraje real usado en la v1 (retirado en la v2):** `imagenes/parrilla/clips/parrilla_volteo_master_4k60.mp4`.

---

## 12. Metodología de prompt

### 12.1 Imagen — `directoria-cloud/templates/prompt-imagen.md` (obligatoria, regla 23)

- **JSON Decoded Brief de 14 campos**, stringificado como `params.prompt`: `subject_identity`,
  `realism`, `environment`, `lighting`, `camera` (`lens_mm`, `aperture_f`, `iso`, `shutter`,
  `lens_to_subject_m`, `subject_to_bg_m`, `cct_k`), `composition`, `imperfections`, `palette`, `mood`,
  `film_stock`, `negatives`.
- **Párrafo NL** equivalente para revisión humana (en el guion, §3).
- **Papel de cada referencia** nombrado con `@imageN` en el orden de `medias[]`:
  - Fotos reales: *"govern … completely"* (local, platos, vajilla).
  - Fotograma de plantilla: *"governs ONLY the camera angle, the framing and the direction of the light;
    nothing else from @imageN may appear"* (regla 10).
- **Bloques repetidos literalmente en todos** (regla 9quater):
  - Lugar: *Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain*.
  - Luz (regla 17): *one dramatic, hard, slightly warm key light … deep near-black falloff shadows …
    heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain*.
  - `film_stock`: *warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black
    shadows, visible fine film grain*.
  - Negativos comunes: sin texto, sin logo en tela/plato/copa (regla 24), sin manchas ni migas (regla
    25), sin sobras ni copa vacía (regla 15), sin muebles ausentes de las refs (regla 1), sin fuego ni
    humo (regla 22), sin cara, sin anillos, sin luz plana, sin HDR.
- **Imperfecciones solo de textura y colocación**, nunca suciedad (regla 25).
- **Correcciones con «un solo cambio»** (regla 27): la imagen previa como `@image1`, todo lo que no
  cambia listado en `subject_identity`, y `environment` abierto con `THE ONE CHANGE:`.

### 12.2 Vídeo — `directoria-cloud/templates/prompt-video-motion.md` (obligatoria, regla 11)

Orden fijo: **PRESERVE → MOTION (BEATS con tiempos) → CAMERA → FILM GRADE → NEGATIVE → coda fotográfica**
(`Shot on … lens, f/… Photographic realism, no text.`).

- **CAMERA** con la fórmula del slider motorizado (regla 11): nombrar el aparato (*motorised slider with
  a geared head*), cuantificar el recorrido (3-8 %, 6°), *already moving on the first frame and still
  moving on the last*, y prohibir el handheld por su nombre.
- **Un movimiento distinto por plano** (regla 9): desplazamiento lateral, push-in, bajada de grúa,
  parallax, arco corto, foco.
- **Manos** (regla 6): un gesto breve y quietud después; mismos dedos, sin joyería apareciendo.
- **FILM GRADE:** valores de la regla 17, no los de la plantilla.
- **Multitoma** (indicación del cliente): Seedance 2.5 `omni_reference` con los tres keyframes y
  *"Shot 1 is @image1, shot 2 is @image2, shot 3 is @image3 … hard cuts between shots"*, con beats por
  tramo de tiempo.

Prompts literales en los anexos A y B.

---

## 13. Generación de imágenes fijas

**Modelo:** `nano_banana_pro`, `resolution:"2k"`, `aspect_ratio:"9:16"`. Preflight `get_cost` = **2
créditos**. Lanzadas **7 a la vez** con `generate_image_batch`, sin límite de concurrencia.
**Devuelto:** `nano_banana_2` en las 9 generaciones (anotado, como pide el prompt). Salida
**1536×2752**. El servidor cambió `role:"image"` → `image_references` por su cuenta.

### 13.1 Resultados

| Plano | `job_id` vigente | Fichero | Nota |
|---|---|---|---|
| P2 silla | `1d31813a-7ab6-4d59-b6a9-21c34ea190d6` | `09_P2_silla.png` | Fiel: silla tallada, enea, mantel beige |
| P3 sala | `33e9ec08-26d5-441e-9ef3-62f429bc5496` | `09_P3_sala.png` | Apareció una mano en el pie de la copa (no pedida); se presentó sin tocar |
| P4 lámpara | `eaaa6224-8ed7-4a02-85d3-a63d3dc16910` | `09_P4_lampara.png` | |
| P5 vino | `e7dcd73b-6adf-4f82-ab06-c3e2b76594e4` | `09_P5_vino.png` | Corregida (§13.2) |
| P6 plato y copa | `ea1cd697-aeb5-46ad-8908-4100db3bcdb8` | `09_P6_plato_copa.png` | Mano entera en vez de solo las yemas; se presentó sin tocar |
| P8 cierre | `ac38bb0b-bc3e-47ba-b305-fa5a474544bb` | `09_P8_cierre.png` | |

### 13.2 Defectos objetivos corregidos antes de presentar

- **P5:** la v1 `628c4382-975d-49e8-ac66-fdb5fd13bc02` tenía **texto inventado en la etiqueta**
  («…OSO»). Se corrigió con «un solo cambio» (botella girada, etiqueta de espaldas) → `e7dcd73b…`.
  A la primera.
- **P7 botellero:** la v1 `f8b1c44b-508e-4f91-9e24-081ff1e58b96` y la v2
  `37a17761-f515-460a-8217-6b92a5cf1fb1` **inventaron una pared de botellas apiladas en pirámide**.
  El botellero real tiene las botellas en filas sueltas y con la etiqueta hacia arriba.

### 13.3 Por qué se quitó P7

1. El modelo repitió el defecto dos veces → la regla 27 manda dejar de gastar.
2. La foto real mide **960×1280**; recortada a 9:16 queda en 396×704 y habría que ampliarla ×2,7 para
   llegar a 1080p, lo que incumple el mínimo de calidad.
3. El plano de la plantilla (culos de botella) no existe en el local: la regla 1 manda sobre la plantilla.

→ Se propuso quitar P7 y el cliente lo aprobó junto al lote.

### 13.4 Aprobación

Hoja `sheet_keyframes_para_aprobar.jpg` + galería de Higgsfield (`show_generation_by_ids`). Cliente:
*"estas imágenes me han encantado, procede con el Reel"*.

---

## 14. Generación de vídeo

### 14.1 Consulta de modelos (gratis)

`models_explore action:"get"`:

- **`kling3_0`:** 3-15 s, modos `std`/`pro`/`4k`, `sound` on/off, medias `start_image`/`end_image`,
  etiqueta *multi-shot*.
- **`seedance_2_5`:** 4-30 s, modos `t2v`/`omni_reference`/`video_edit`/`video_extension`,
  480/720/1080p, medias `start_image`, `end_image`, `image_references`, `video_references`,
  `audio_references`.

### 14.2 Preflight de coste

| Configuración | Créditos |
|---|---|
| `seedance_2_5` `omni_reference` 1080p 10 s 9:16 sin audio, 3 `image_references` | **90** |
| `kling3_0` `pro` 10 s `sound:"off"` | 17,5 (solo de referencia) |
| `kling3_0` `pro` 3 s `sound:"off"` | 5,25 |

**Por qué no se usó el multi-shot de Kling:** solo acepta imagen inicial y final, así que las tomas
intermedias saldrían sin referencia, es decir, inventadas (regla 1). Se hicieron tres clips de 3 s con
`start_image` cada uno.

### 14.3 Registro

Límite de 2 vídeos simultáneos respetado (V1 + P3 → P4 → P8).

| Clip | Modelo pedido → devuelto | Params | `job_id` | Créditos | Salida real |
|---|---|---|---|---|---|
| **V1** multitoma P2+P5+P6 | `seedance_2_5` → `seedance_2_5` | `omni_reference`, 1080p, 10 s, 9:16, `generate_audio:false`, refs `1d31813a` / `e7dcd73b` / `ea1cd697` | `f846263b-59c1-4a91-8252-9e7046eebb85` | 90 | 1080×1920, 24 fps, 10,04 s, **cortes a 3,21 y 6,71 s** |
| P3 sala | `kling3_0` → `kling3_0` | `pro`, 3 s, `sound:"off"`, `start_image` `33e9ec08`, `declined_preset_id` | `c87d96da-e1a4-4f8b-9a18-4aae389f732f` | 5,25 | 1076×1928, 24 fps, 3,04 s |
| P4 lámpara | ídem | `start_image` `eaaa6224` | `c1c52b1d-dc26-43df-9158-d66c7b17619f` | 5,25 | ídem |
| P8 cierre | ídem | `start_image` `ac38bb0b` | `e47b1149-439b-46a4-aea8-4d66f8dd69a9` | 5,25 | ídem; salió desplazamiento lateral, no rack focus |

- El primer envío de P3 devolvió el aviso de preset **«IN THE DARK»** (`24bae836-2c4a-48e0-89b6-49fcc0b21612`)
  sin ejecutar nada. Se relanzó con `declined_preset_id` (regla 7). No se cobró.
- **La multitoma de Seedance 2.5 funcionó a la primera:** una generación, tres planos con corte seco,
  cada uno fiel a su keyframe.

### 14.4 Revisión de artefactos

- **Contact sheets** a 2 fps de cada clip (`videos/sheet_*.jpg`).
- **Manos a resolución real:** recortes de los fotogramas 10/40/74, 90/130/158 y 170/205/238 de V1.
  Sin dedos deformes, sin joyería que aparezca, sin comida que cambie.
- **P3:** parallax limpio y la sala estable.
- **P4:** arco corto limpio; las cadenas cambian de posición relativa, que es el parallax esperado.

Cliente: *"los vídeos me encantan, ahora procede a editar el reel entero"*.

---

## 15. Muestras de voz

**Modelo:** `seed_audio`, 0,5 créditos cada una.
**Texto:** *«Carta de otoño en Torre de Vega: chuletón a la brasa, aquí, en Alhaurín.»*
(con las palabras del negocio que pide el prompt).

`list_voices` no da idioma ni acento. **No se dedujo el acento por el nombre.** Se eligieron Nadine
(la usada en el Reel del chuletón) y dos voces más para comparar.

| Muestra | `voice_id` | `job_id` | Transcripción faster-whisper `small` (`language="es"`) |
|---|---|---|---|
| A Nadine | `165d9309-bb17-56ff-964a-5d6a38dab92f` | `585716ea-a8f5-469e-9f02-3d5c71f65b08` | «Carter de Otonio en Torre de Vega, Chulet al Abrasa, Aki, en Al-Haurín» ✗ |
| B Marisol | `75e72cd5-011b-4130-a474-e8b1ab341f04` | `aad16a7a-d4ab-4d43-8473-dcb0b820ad00` | «…chuletón a la brasa aquí en a la» (se come «Alhaurín») |
| C Inés | `023ebf5e-1970-40d8-825c-a5ef6a1dd4ff` | `e892dea9-4431-4375-bfdb-0d307a2a0e78` | «Carta de Otoño en Torre de Vega, Chuletón a la Brasa, aquí en Al-Haorín» ✓ |

Ficheros en `imagenes/generadas/reel_09_carta_de_otono/voz/`. **La transcripción no certifica el
acento; la voz está pendiente de elegir.**

---

## 16. Montaje en Remotion

### 16.1 Composición propia

Las composiciones de OpenMontage son 16:9 y con estética fría (degradados cian, líneas de señal,
Space Grotesk). Se escribió una nueva:

- **Código:** `C:\Users\victo\OpenMontage\remotion-composer\src\TorreDeVegaReel.tsx`
  (copia en `montaje_remotion/TorreDeVegaReel.tsx`).
- **Registro:** `Root.tsx`, id `TorreDeVegaReel`, 1080×1920, 30 fps, duración calculada de la suma de
  los planos.
- **Props:**
  - `shots[]` (`src`, `from`, `duration`, `push`, `muted`, `volume`) encadenados con `<Sequence>` →
    **cortes secos**, sin transiciones.
  - `titles[]` (`text`, `start`, `end`, `y`, `fontSize`, `tracking`).
  - `brand` (placa de cierre).
  - `voice` y `music` opcionales, con fundido de entrada y salida.
- **Vídeo:** `<OffthreadVideo>` con `objectFit: cover`, lo que absorbe los 1076×1928 de Kling, y
  `trimBefore` para la entrada en la fuente.
- **Tipografía:** Bodoni MT Regular desde `public/reel09/BOD_R.TTF` con la API `FontFace` +
  `delayRender`/`continueRender`. Blanco `#FFFFFF`, tracking 0,32-0,34 em (rótulos), 0,42 em (título de
  placa) y 0,5 em (subtítulo). Compensación `paddingLeft` del espaciado final.
- **Sombra (nunca contorno):** `0 0 14px rgba(0,0,0,.6), 0 0 34px rgba(0,0,0,.5), 0 0 70px rgba(0,0,0,.45), 0 1px 2px rgba(0,0,0,.45)`.
- **Animación de rótulos:**
  - Gancho visible desde el fotograma 0 sin fundido (regla 12).
  - Resto: fundido de entrada de 6 fotogramas con subida de 10 px, y salida de 5 fotogramas.
- **Placa de cierre:** `TORRE DE VEGA` (60 px), filete de 2 px que crece desde el centro hasta 360 px, y
  `«EL MORA»` (38 px) escalonado 8 fotogramas.

### 16.2 Recursos en `remotion-composer/public/reel09/`

| Fichero | Origen |
|---|---|
| `BOD_R.TTF` | `C:\Windows\Fonts\BOD_R.TTF` |
| `v1_multitoma.mp4` | V1 Seedance |
| `p3_sala.mp4`, `p4_lampara.mp4`, `p8_cierre.mp4` | Clips Kling |
| `p1_parrilla_real.mp4` | Solo v1. `ffmpeg -ss 2.8 -i parrilla_volteo_master_4k60.mp4 -t 3.6 -vf "scale=1080:1920:flags=lanczos,fps=30" -c:v libx264 -crf 14 -preset slow -pix_fmt yuv420p -c:a aac -b:a 192k` |
| `props_sin_rotulos.json`, `props_v1.json`, `props_v2.json`, `props_v4.json`, `props_v5.json` | Versiones de montaje |

### 16.3 Comando de render

```powershell
Set-Location C:\Users\victo\OpenMontage\remotion-composer
npx remotion render src/index.tsx TorreDeVegaReel out/reel09_v5.mp4 --props=public/reel09/props_v5.json --codec=h264 --crf=16
```

### 16.4 Colocación de rótulos: medida y después mirada

1. **Premontaje sin rótulos** (`props_sin_rotulos.json`).
2. **Medición** (`scripts/contrast.py`, `contrast2.py`, `contrast3.py`): para cada ventana de rótulo,
   fotogramas cada 0,20-0,25 s y, para cada franja candidata (70 px de alto y el **ancho exacto del
   texto**), la **fracción de píxeles con luma > 170** en el peor fotograma. Nunca la luminancia media
   (lección del Reel 06).
3. **Revisión visual a tamaño real** de las franjas del render. Detectó dos fallos que la métrica no vio
   (§18).

---

## 17. Control de calidad

Se hizo en cada versión:

- `ffprobe`: códec, resolución, fps, duración, bitrate.
- `volumedetect` en la v1: media −31,9 dB, pico −4,6 dB (solo sonido de parrilla).
- Contact sheet de 12-14 fotogramas repartidos por toda la pieza (`montaje_remotion/qa_fotogramas_v1.jpg`, `qa_fotogramas_v3.jpg`).
- Recortes a resolución completa de cada zona de rótulo.
- **Fotograma 0 comprobado:** acción empezada y rótulo presente (regla 12).

**Versión vigente (v3):** 1080×1920, 30 fps, **11,456 s**, H.264, 12,4 Mbps, 17,7 MB, pista AAC muda.

---

## 18. Correcciones del cliente y versiones

| Render | Entregable | Cambios |
|---|---|---|
| premontaje | — (interno) | Sin rótulos, para ritmo y medición |
| `reel09_v1` | — (interno) | Primer render con rótulos: «CARTA DE OTOÑO» ilegible sobre la llamarada; «UNA NUEVA TEMPORADA» sobre la lámpara |
| `reel09_v2` | — (interno) | P1 entra a 1,1 s en vez de 0,4 (0,1 % de claros bajo el rótulo); P3 baja a y=980 |
| `reel09_v3` | **`REEL_09_carta_de_otono_montaje_v1_sin-voz.mp4`** (13,06 s) | Sombra de rótulos reforzada |
| `reel09_v4` | **`REEL_09_montaje_v2_volvemos-a-abrir_sin-voz.mp4`** (11,46 s) | **Cliente:** quitar la parrilla («ya se ha utilizado demasiadas veces») y poner «VOLVEMOS A ABRIR» |
| `reel09_v5` | **`REEL_09_montaje_v3_sin-fecha_sin-voz.mp4`** (11,46 s) ← **vigente** | **Cliente:** quitar «DESDE EL [FECHA]» y no poner nada |

### Detalle de la corrección nº 2

*"El primer vídeo que hay quiero que lo quites porque ya se ha utilizado demasiadas veces. Además quiero
que pongas 'volvemo a abrir'."*

- Se interpretó y escribió como **«VOLVEMOS A ABRIR»** (errata evidente).
- El gancho pasa a P2 (la mano ya retirando la silla en el fotograma 0). P2 se alarga a 2,4 s desde el
  segundo 0,4 de V1.
- «CARTA DE OTOÑO» y «BIENVENIDOS» salen: el nuevo rótulo ocupa su lugar.
- Rótulo medido en y=1000 → **3,5 %** de píxeles claros; revisado a tamaño real, se lee bien sobre el
  respaldo de la silla.
- La pieza queda **sin sonido**, porque el único audio era el de la parrilla.

### Montaje vigente (`props_v5.json`)

| t (s) | Plano | Fuente | Entrada | Dur | Rótulo | y |
|---|---|---|---|---|---|---|
| 0,0–2,4 | P2 silla | `v1_multitoma.mp4` | 0,4 | 2,4 | `VOLVEMOS A ABRIR` (52 px, tracking 320) desde el fotograma 0 | 1000 |
| 2,4–4,0 | P3 sala | `p3_sala.mp4` | 0,5 | 1,6 | `UNA NUEVA TEMPORADA` (46 px, tracking 300) | 980 |
| 4,0–5,1 | P4 lámpara | `p4_lampara.mp4` | 0,8 | 1,1 | — | |
| 5,1–7,0 | P5 vino | `v1_multitoma.mp4` | 3,8 | 1,9 | — | |
| 7,0–9,2 | P6 plato y copa | `v1_multitoma.mp4` | 7,2 | 2,2 | — | |
| 9,2–11,4 | P8 cierre | `p8_cierre.mp4` | 0,5 | 2,2 | Placa `TORRE DE VEGA` · filete · `«EL MORA»` desde 9,3 | 1060 |

---

## 19. Costes

| Concepto | Unidades | Créditos |
|---|---|---|
| `nano_banana_pro` 2k (7 keyframes + 2 correcciones) | 9 × 2 | 18,00 |
| `seedance_2_5` omni 1080p 10 s | 1 | 90,00 |
| `kling3_0` pro 3 s sin sonido | 3 × 5,25 | 15,75 |
| `seed_audio` muestras | 3 × 0,5 | 1,50 |
| Video Analysis, Virality Predictor (fallidos), `get_cost`, `models_explore`, `list_voices` | — | 0 |
| OpenMontage, Remotion, ffmpeg, yt-dlp, faster-whisper | — | 0 |
| **Total** | | **125,25** |

Saldo: **498,13 → 372,88**. Sin gasto en API externas.

---

## 20. Errores, trampas y cómo se resolvieron

| # | Problema | Causa | Solución |
|---|---|---|---|
| 1 | Punto A sin vídeo de referencia | Se aceptó «ninguno» | Corrección del cliente → búsqueda obligatoria (§8), anotada en `CLAUDE.md` |
| 2 | YouTube sin candidatos verticales | El contenido de restaurante en YouTube es horizontal | Instagram por búsqueda web + yt-dlp por URL |
| 3 | `virality_predictor` falla sin motivo | Caída del servicio (el control también falla) | Documentado; elección sin puntuación con permiso del cliente |
| 4 | Salida de `media_upload` × 16 demasiado larga | Límite de salida de la herramienta | Leer el JSON guardado con `scripts/put_uploads.py` |
| 5 | `Remove-Item` en el scratchpad bloqueado | Protección de la ruta | Copiar con `-Force` sin borrar |
| 6 | `nano_banana_pro` devuelve `nano_banana_2` | Fallback del servidor | Anotado; el resultado se aceptó |
| 7 | Texto inventado en la etiqueta de P5 | El modelo imprime etiqueta | «Un solo cambio»: etiqueta de espaldas |
| 8 | P7 inventa pared de botellas dos veces | Encuadre de plantilla inexistente en el local | Plano eliminado (§13.3) |
| 9 | Preset «IN THE DARK» bloquea Kling | Autorrecomendación de preset | `declined_preset_id` |
| 10 | faster-whisper no descarga el modelo | Avast intercepta TLS | `truststore.inject_into_ssl()` al inicio del script |
| 11 | Remotion: `inputRange must be strictly monotonically increasing [0,0]` | Fundido de 0 fotogramas en el rótulo gancho | `fadeWindow` trata fundido 0 como opacidad 1 |
| 12 | Remotion no lee `--props` | PowerShell 5.1 `Set-Content -Encoding utf8` escribe BOM | Escribir los props con Python |
| 13 | «CARTA DE OTOÑO» ilegible | Inicio del clip de parrilla quemado en naranja | Entrar a 1,1 s en la fuente |
| 14 | «UNA NUEVA TEMPORADA» sobre la lámpara pese al 0 % de claros | La métrica de claros no ve siluetas oscuras recargadas | Mover a y=980; **mirar siempre a tamaño real** |
| 15 | Kling devuelve 1076×1928 | Salida conocida del modelo | `objectFit: cover` en Remotion |

---

## 21. Cambios hechos en la documentación del proyecto

| Fichero | Cambio |
|---|---|
| `CLAUDE.md` | Nueva sección **«Sin vídeo de referencia, buscarlo es obligatorio»** (corrección 2026-09-17) |
| `CLAUDE.md` | Párrafo **«Varias tomas por generación»**: mejores modelos y multi-shot cuando el modelo lo admita |
| `CLAUDE.md` | Paso 7 del flujo: **montar en OpenMontage + Remotion** en vez de After Effects |
| `CLAUDE.md` | Nueva sección **«El vídeo real de la parrilla está quemado»** |
| `instagram/fuentes_plantillas_reels.md` | Nueva §4bis: Instagram por palabra clave con búsqueda web + yt-dlp |
| `instagram/reel_09_carta_de_otono.md` | Guion completo con prompts, resultados, vídeo, montaje v1/v2 y voces |
| `plantillas/2026-09-17/README.md` | Búsqueda, filtro, cortes, fallo del predictor e IDs |
| Memoria `feedback-edicion-video-capcut.md` + `MEMORY.md` | Montaje pasa a Remotion |

---

## 22. Inventario de ficheros

```
plantillas/2026-09-17/
├── README.md
├── 01_1835-carne-e-brasa_nueva-temporada_46s_original.mp4
├── 01_1835-carne-e-brasa_nueva-temporada_15s.mp4
├── 02_nabrasa-ourense_plato-y-precio_164s_original.mp4
├── 02_nabrasa-ourense_plato-y-precio_15s.mp4
├── sheet_01.jpg · sheet_02.jpg
└── frames_01/01_plano01…10_*.jpg

instagram/reel_09_carta_de_otono.md

imagenes/generadas/reel_09_carta_de_otono/
├── REEL_09_montaje_v3_sin-fecha_sin-voz.mp4                ← VIGENTE
├── REEL_09_montaje_v2_volvemos-a-abrir_sin-voz.mp4
├── REEL_09_carta_de_otono_montaje_v1_sin-voz.mp4
├── 09_P2_silla.png · 09_P3_sala.png · 09_P4_lampara.png
├── 09_P5_vino.png · 09_P6_plato_copa.png · 09_P8_cierre.png
├── sheet_keyframes_para_aprobar.jpg
├── descartadas/
│   ├── 09_P5_vino_v1_etiqueta-con-texto.png
│   ├── 09_P7_botellero_v1_pila-inventada.png
│   ├── 09_P7_botellero_v2_pila-inventada.png
│   └── 09_P7_botellero_REAL_recorte_baja-resolucion.jpg
├── videos/
│   ├── v1_P2-P5-P6_seedance25_multitoma.mp4
│   ├── v_P3_sala_kling.mp4 · v_P4_lampara_kling.mp4 · v_P8_cierre_kling.mp4
│   └── sheet_V1.jpg · sheet_P3.jpg · sheet_P4.jpg · sheet_P8.jpg
├── voz/
│   ├── muestra_A_Nadine.wav · muestra_B_Marisol.wav · muestra_C_Ines.wav
│   └── muestra_A_Nadine.wav.words.json   (tiempos por palabra de las 3 muestras)
└── montaje_remotion/
    ├── TorreDeVegaReel.tsx
    ├── props_montaje_v1.json · props_montaje_v2.json · props_montaje_v3.json
    ├── qa_fotogramas_v1.jpg · qa_fotogramas_v3.jpg
    └── scripts/
        ├── buscar.py            búsqueda YouTube por palabras clave
        ├── candidatos_youtube.json
        ├── sheets.ps1           contact sheets de los primeros 16 s
        ├── grid.py              contact sheet etiquetado de una carpeta
        ├── put_uploads.py       PUT masivo de subidas a Higgsfield
        ├── transcribe.py        faster-whisper + truststore
        └── contrast.py · contrast2.py · contrast3.py   medición de rótulos

C:\Users\victo\OpenMontage\                        (fuera del repo del cliente)
├── .venv\                                         Python + faster-whisper + piper
└── remotion-composer\
    ├── src\TorreDeVegaReel.tsx · src\Root.tsx (registro)
    ├── public\reel09\                             recursos y props
    └── out\reel09_*.mp4                           renders intermedios
```

`props_montaje_v3.json` = `public/reel09/props_v5.json` (la numeración interna de renders y la de
entregas no coincide; manda la tabla del §18).

---

## 23. Cómo reproducir o continuar

**Re-renderizar la versión vigente:**
```powershell
Set-Location C:\Users\victo\OpenMontage\remotion-composer
npx remotion render src/index.tsx TorreDeVegaReel out/reel09_v5.mp4 --props=public/reel09/props_v5.json --codec=h264 --crf=16
```

**Añadir la voz cuando se elija:**
1. `generate_audio` `seed_audio` con el `voice_id` elegido y el texto final. El borrador con fecha ya no
   vale tras quitar el rótulo de fecha: reescribirlo con el cliente.
2. Descargar el audio a `public/reel09/voz.wav`.
3. Transcribir con `scripts/transcribe.py` (venv de OpenMontage) y alinear con el texto del guion.
   Nunca repartir tiempos por longitud de palabra.
4. Guardar el SRT junto al Reel.
5. Añadir a los props, **escritos con Python, sin BOM**: `"voice": {"src": "reel09/voz.wav", "start": <s>, "volume": 1}`.
6. Re-renderizar y pasar `volumedetect` + contact sheet.

**Añadir música:** `"music": {"src": "reel09/musica.mp3", "volume": 0.2}` (fundido de 0,5 s de entrada y
1 s de salida ya implementado). Registrar la fuente y la licencia.

**Mover un rótulo:** editar `y` en los props, medir con `contrast3.py` adaptado a la ventana y **mirar el
fotograma a tamaño real** antes de dar la versión por buena.

---

## 24. Pendientes y bloqueos

1. **Voz:** elegir entre A/B/C (recomendación por transcripción: C Inés) y cerrar el texto de la
   locución ahora que el mensaje es «volvemos a abrir».
2. **Música** libre de derechos con fuente y licencia. Hoy la pieza es muda entera.
3. **Subtítulos SRT** en cuanto haya locución.
4. **Coherencia de calendario:** el plan de contenido colocaba esta pieza como «carta de otoño». Con
   «VOLVEMOS A ABRIR» encaja mejor con una reapertura; confirmar la fecha de publicación.
5. **Viralidad sin medir:** relanzar `virality_predictor` sobre el Reel final (≤16 s, este mide 11,46 s)
   cuando el servicio vuelva, antes de publicar (regla 3).
6. **Metraje nuevo de brasa:** el clip de parrilla existente queda retirado. Sin metraje nuevo no hay
   planos de fuego (regla 22).
7. **Aprendizajes propuestos** para `reglas_videos.md` (sin escribir, a la espera de aprobación):
   - La multitoma de Seedance 2.5 `omni_reference` con N keyframes produce N planos fieles con corte seco.
   - La métrica de píxeles claros no detecta siluetas oscuras recargadas: revisar siempre a tamaño real.
   - Los encuadres de la plantilla que no existen en el local (p. ej. culos de botella) se quitan del
     guion en vez de forzarlos.

---

## Anexo A — Prompts literales de imagen

Todos con `model:"nano_banana_pro"`, `resolution:"2k"`, `aspect_ratio:"9:16"`. `medias[]` en el orden
de `@image1…`, con los `media_id` del §11. El contenido de cada bloque es el `params.prompt` enviado.

### A.1 P2 — La silla · medias: mesa-ventana, mesas-restaurante3, frame plano03 · `1d31813a-7ab6-4d59-b6a9-21c34ea190d6`

```json
{"subject_identity":"A real carved wooden dining chair being pulled out from a laid table at Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain. @image1 and @image2 are real photographs of the dining room and govern the chair and the table completely: a honey-brown solid wood chair with a carved horizontal back rail and turned spindles and a woven rush seat, and a table dressed with a beige embossed tablecloth over a pale pink undercloth, a white plate with an embossed rim and a large wine glass. @image3 is a frame from another restaurant's video and governs ONLY the camera angle, the framing and the direction of the light; nothing else from @image3 may appear.","realism":"a real editorial photograph shot on location during evening service, a single realistic exposure, not CGI, not illustration","environment":"A woman's hand, short natural unpolished nails, fine skin texture, grips the top carved rail of the chair back and is already pulling the chair out and away from the table, the chair tilted a few degrees in motion. Behind it, the edge of the laid table with the beige embossed cloth, the rim of a white plate and the foot of a large wine glass holding red wine. The dining room beyond falls into darkness.","lighting":"one dramatic, hard, slightly warm key light from a single direction at camera-right, raking across the carved wood and the knuckles, deep near-black falloff shadows across most of the frame, heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain; not flat, not bright and airy, not neutral daylight","camera":{"lens_mm":"50","aperture_f":"2.0","iso":"800","shutter":"1/125","lens_to_subject_m":"0.5","subject_to_bg_m":"3","cct_k":"3100"},"composition":"vertical 9:16, low side angle at the height of the chair back; the hand and the carved rail cross the frame diagonally from the right edge toward the centre; the table edge soft in the lower left; the upper third falls to dark and is kept clean for a caption","imperfections":"the natural grain and small worn patches in the varnish of the chair rail, loose fibres in the woven rush seat, the embossed pattern of the tablecloth catching the light unevenly, a soft crease in the cloth where it drops","palette":"honey wood, beige linen, deep red wine, warm amber highlights falling into near-black","mood":"a quiet welcome at the start of service, intimate and editorial","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no text, no lettering anywhere, no logo or emblem or crest or monogram on any cloth, napkin, plate or glass, no restaurant name, no stain or spots on the tablecloth, no crumbs, no food outside a plate, no half-eaten food, no empty wine glass in the foreground, no furniture, decoration or lamp absent from @image1 and @image2, no fire, no flames, no smoke, no face, no rings, no bracelets, no watch, no metal chair, no cowhide upholstery, no dark glossy table, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.2 P3 — La sala · medias: mesas-restaurante4, panoramica-restaurante, mesas-restaurante3, frame plano05 · `33e9ec08-26d5-441e-9ef3-62f429bc5496`

```json
{"subject_identity":"The main dining room of Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain, laid for dinner and still empty of guests. @image1, @image2 and @image3 are real photographs of this exact room and govern its geometry, furniture and decoration completely and literally: exposed red brick walls, windows with white sheer curtains, wrought-iron wall sconces, a black wrought-iron ring chandelier, square tables dressed with beige embossed tablecloths over pale pink undercloths, honey-brown carved wooden chairs with rush seats, terracotta floor tiles, a stone fireplace wall at the far left. @image4 is a frame from another restaurant's video and governs ONLY the camera height, the layering of a foreground glass and the way light and shadow are distributed; nothing else from @image4 may appear.","realism":"a real editorial photograph of an actual restaurant interior, a single realistic exposure, not CGI, not a real-estate HDR render","environment":"early evening, before the first guests; every table laid with white plates with embossed rims, cutlery and large wine glasses; in the immediate foreground, very out of focus, the bowl of a large wine glass holding red wine on the nearest table","lighting":"the last daylight entering through the white curtains of the far windows is the single key light, hard and slightly warm, pooling on the nearest tablecloths; the rest of the room falls into deep near-black shadow; the iron sconces glow faintly as small warm accents; heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain; not flat, not bright and airy","camera":{"lens_mm":"35","aperture_f":"2.2","iso":"1000","shutter":"1/100","lens_to_subject_m":"1.2","subject_to_bg_m":"8","cct_k":"3100"},"composition":"vertical 9:16, camera low as if seated at the nearest table; the out-of-focus wine glass occupies the lower left corner; rows of laid tables recede toward the curtained windows on the right third; the chandelier sits in the upper third; the centre band is kept readable for a caption","imperfections":"natural uneven mortar lines and colour variation in the brick, slightly irregular folds in the sheer curtains, chairs not perfectly aligned, the embossed cloth texture catching light unevenly, faint reflections of the windows in the foreground glass","palette":"terracotta brick, beige linen, honey wood, deep wine red, warm amber light into near-black","mood":"the room waiting for a new season, calm and anticipatory","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no people, no text, no lettering anywhere, no logo or emblem on any cloth or glass, no restaurant name, no stain on the tablecloths, no empty wine glass in the foreground, no furniture, decoration, plants or lamps absent from @image1, @image2 and @image3, no forest outside the windows, no glass wall, no concrete ceiling, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.3 P4 — La lámpara · medias: photo_…419, mesas-restaurante4, frame plano06 · `eaaa6224-8ed7-4a02-85d3-a63d3dc16910`

```json
{"subject_identity":"The real black wrought-iron ring chandelier of Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain. @image1 is a real photograph of this exact chandelier and governs it completely: a black forged iron ring with scroll details hanging from chains, five candle-style arms holding bare round bulbs, and a warm glow through the ring. @image2 is a real photograph of the dining room and governs the brick wall and ceiling behind. @image3 is a frame from another restaurant's video and governs ONLY the close low angle and the way the light glows against darkness; nothing else from @image3 may appear, in particular no crystal chandelier.","realism":"a real editorial photograph, a single realistic exposure, not CGI","environment":"the chandelier switched on in the dining room at night, the bulbs glowing warm, the white ceiling above falling into shadow, a sliver of red brick wall at the lower edge","lighting":"the chandelier's own bulbs are the only light, hard and warm, with the forged iron silhouetted and rim-lit; everything outside the glow falls into deep near-black; heavy contrast, warm cinematic colour grade around 3000K, visible fine film grain","camera":{"lens_mm":"85","aperture_f":"2.0","iso":"1250","shutter":"1/160","lens_to_subject_m":"1.4","subject_to_bg_m":"1","cct_k":"3000"},"composition":"vertical 9:16, strong low angle looking up; the iron ring fills the centre and upper two thirds, cropped by the frame edges; the bulbs form a bright arc; darkness around","imperfections":"hammer marks and uneven matte finish on the forged iron, a little dust on the upper edges of the ring, slightly different brightness between the bulbs, small links of chain catching light","palette":"matte black iron, warm amber bulb glow, a hint of terracotta brick, near-black surroundings","mood":"warm, intimate, nocturnal","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no crystal chandelier, no glass pendants, no faceted crystals, no gold or brass lamp, no text, no lettering, no logo, no fire, no flames, no smoke, no lamp design different from @image1, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.4 P5 v1 — El vino (descartada: texto en la etiqueta) · medias: mesas-restaurante4, mesa-chimenea, copa-vino-grande, frame plano07 · `628c4382-975d-49e8-ac66-fdb5fd13bc02`

```json
{"subject_identity":"Red wine being poured into a large wine glass on a laid table at Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain. @image1 and @image2 are real photographs of the dining room and govern the table setting completely: beige embossed tablecloth over pale pink undercloth, white plates with embossed rims, cutlery, and a dark red wine bottle with a plain label. @image3 is a real photograph of the restaurant's wine glass and governs its exact shape: a large thin-rimmed crystal glass with a wide bowl and a long stem. @image4 is a frame from another restaurant's video and governs ONLY the camera height, the receding row of glasses and the distribution of light; nothing else from @image4 may appear.","realism":"a real editorial photograph during service, a single realistic exposure, not CGI","environment":"a man's hand, slightly larger with a little hair on the back, holds a dark wine bottle by its body with the label turned away from camera and is mid-pour: a continuous stream of deep red wine falls into the nearest glass, already a third full, with a small crest where the stream meets the surface; behind it, three more identical glasses stand in a row along the laid table, each already holding red wine","lighting":"one dramatic, hard, slightly warm key light from behind and to the left, backlighting the wine stream so it glows ruby, rim-lighting the glass bowls; deep near-black falloff shadows across most of the frame, heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain; not flat, not bright and airy","camera":{"lens_mm":"65","aperture_f":"2.2","iso":"800","shutter":"1/500","lens_to_subject_m":"0.45","subject_to_bg_m":"2","cct_k":"3100"},"composition":"vertical 9:16, camera at the level of the tablecloth looking along the table; the nearest glass and the wine stream sharp in the lower-middle of the frame; the row of glasses recedes out of focus toward the upper right; the bottle neck enters from the top edge","imperfections":"small bubbles and ripples where the stream lands, the embossed tablecloth texture uneven in the light, faint reflections of the room in the curved glass, a slight drip ring on the bottle lip","palette":"deep ruby wine, clear crystal highlights, beige linen, near-black surroundings, amber accents","mood":"the first glass of the evening, generous and warm","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no readable label, no text, no lettering anywhere, no logo or emblem on any cloth, glass or bottle, no restaurant name, no wine spilled on the tablecloth, no stain, no crumbs, no food, no empty glass, no glass shape different from @image3, no face, no rings, no bracelets, no watch, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.5 P5 v2 — Corrección «un solo cambio» (vigente) · medias: job `628c4382…`, copa-vino-grande · `e7dcd73b-6adf-4f82-ab06-c3e2b76594e4`

```json
{"subject_identity":"@image1 is the previously generated photograph and must stay identical in everything except the one change below: the same man's hand pouring, the same continuous ruby wine stream, the same four large wine glasses in a row with the same wine levels, the same beige embossed tablecloth over the pale pink undercloth, the same white plates, the same brick wall, horse picture and stone wall behind, the same camera position, framing, light and colour grade. @image2 governs the exact shape of the wine glasses.","realism":"a real editorial photograph during service, a single realistic exposure, not CGI","environment":"THE ONE CHANGE: the wine bottle is rotated in the hand so that its label faces away from camera and is not visible at all; the side of the bottle facing camera is plain dark glass with only a highlight along it, no paper label, no letters, no capsule text. Everything else is unchanged from @image1.","lighting":"unchanged from @image1: one dramatic, hard, slightly warm key light from behind and to the left, backlighting the wine stream, deep near-black falloff shadows, heavy contrast, warm cinematic colour grade around 3100K, visible fine film grain","camera":{"lens_mm":"65","aperture_f":"2.2","iso":"800","shutter":"1/500","lens_to_subject_m":"0.45","subject_to_bg_m":"2","cct_k":"3100"},"composition":"identical to @image1","imperfections":"unchanged from @image1: small bubbles and ripples where the stream lands, uneven embossed cloth texture, faint reflections in the glasses","palette":"unchanged from @image1","mood":"unchanged from @image1","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no label visible, no readable text on the bottle, no letters or words anywhere, no logo or emblem on any cloth, glass or bottle, no restaurant name, no wine spilled on the tablecloth, no stain, no crumbs, no food, no empty glass, no glass shape different from @image2, no face, no rings, no bracelets, no watch, no fire, no flames, no smoke, no change of framing, light or grade from @image1, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.6 P6 — Plato y copa · medias: plato-blanco-formal, mesa-ventana, copa-vino-grande, frame plano08 · `ea1cd697-aeb5-46ad-8908-4100db3bcdb8`

```json
{"subject_identity":"A single laid place at a table of Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain, ready for the guest. @image1 is a real photograph of the restaurant's plate and governs it completely: a white porcelain dinner plate with a raised embossed pattern of scrolls and a diamond lattice around the rim, the centre plain and completely empty and clean. @image2 is a real photograph of a laid table and governs the beige embossed tablecloth, the cutlery and the folded plain napkin beside the plate. @image3 is a real photograph of the restaurant's wine glass and governs its exact shape. @image4 is a frame from another restaurant's video and governs ONLY the close three-quarter angle, the plate cropped at the frame edge and the direction of light; nothing else from @image4 may appear, in particular no printed text or brand on the plate.","realism":"a real editorial photograph, a single realistic exposure, not CGI","environment":"the empty clean plate sits directly on the tablecloth with nothing underneath it; to its left, a completely plain folded napkin, blank, unprinted and undecorated, with the knife and fork on it; beyond the plate, the large wine glass holds red wine to a third of the bowl; a woman's fingertips with short natural nails rest lightly on the foot of the glass","lighting":"one dramatic, hard, slightly warm key light from the upper left, grazing across the embossed rim so every raised scroll casts a tiny shadow, a bright highlight on the glass bowl; deep near-black falloff over the rest of the table, heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain","camera":{"lens_mm":"50","aperture_f":"2.5","iso":"640","shutter":"1/125","lens_to_subject_m":"0.4","subject_to_bg_m":"2","cct_k":"3100"},"composition":"vertical 9:16, high three-quarter angle about 50 degrees; the plate rim curves through the lower half and is cropped by the right edge; the wine glass and the fingertips sit in the upper left third, slightly soft; the plain centre of the plate leaves a clean area for a caption","imperfections":"the embossed pattern slightly uneven in depth, the natural texture of the embossed tablecloth, a faint reflection of the light in the wine surface, a soft crease in the napkin","palette":"porcelain white warmed by the light, beige linen, deep ruby, silver cutlery glints, near-black edges","mood":"everything ready, an invitation","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no text or brand printed on the plate, no lettering anywhere, no logo or emblem or crest or monogram on the napkin, cloth, plate or glass, no restaurant name, no food, no leftovers, no crumbs, no sauce, no stain on the tablecloth, no napkin or cloth or paper under the plate, no empty glass, no plate design different from @image1, no glass shape different from @image3, no face, no rings, no bracelets, no watch, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.7 P7 v1 — Botellero (descartada) · medias: photo_…414, frame plano09 · `f8b1c44b-508e-4f91-9e24-081ff1e58b96`

```json
{"subject_identity":"The real black metal wine rack of Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain. @image1 is a real photograph of this exact rack and governs it completely: a black metal shelving unit whose lower shelves hold wine bottles lying horizontally in rows with their bases facing out, and whose upper shelf holds wine glasses hanging upside down, against a red brick wall. @image2 is a frame from another restaurant's video and governs ONLY the close frontal framing on the bottle bases and the low-key light; nothing else from @image2 may appear.","realism":"a real editorial photograph, a single realistic exposure, not CGI","environment":"close on the rows of dark wine bottles lying in the black metal rack, the punted glass bases and the necks of a few bottles facing camera, the black metal bars crossing the frame","lighting":"one dramatic, hard, slightly warm key light from the upper right catching the rims of the glass bottle bases as bright curved highlights; everything between them falls into deep near-black; heavy contrast with true blacks, warm cinematic colour grade around 3100K, visible fine film grain","camera":{"lens_mm":"85","aperture_f":"2.0","iso":"1000","shutter":"1/125","lens_to_subject_m":"0.5","subject_to_bg_m":"0.3","cct_k":"3100"},"composition":"vertical 9:16, frontal and close; a loose grid of bottle bases fills the frame, the nearest ones sharp in the centre, the outer ones soft and cropped at the edges; a black bar of the rack crosses the lower third","imperfections":"slightly different glass tints between bottles, a faint film of dust on some bases, small irregularities in the rack's black paint","palette":"dark bottle green and black glass, amber highlights, near-black","mood":"quiet cellar calm","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no labels facing camera, no text, no lettering, no logo, no foil capsules with brand, no wooden rack, no cellar vault, no rack design different from @image1, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.8 P7 v2 — Corrección (descartada, repitió el defecto) · medias: job `f8b1c44b…`, photo_…414 · `37a17761-f515-460a-8217-6b92a5cf1fb1`

```json
{"subject_identity":"@image1 is the previously generated photograph and keeps its close frontal framing, its dramatic low-key light, its warm grade and its film grain. @image2 is the real photograph of the restaurant's wine rack and now governs the rack's structure completely: a slim freestanding black metal shelving unit against a red brick wall, whose lower shelves are black wire racks where single rows of wine bottles lie side by side horizontally, each bottle in its own slot, bases facing out, one bottle deep, with open space above each row.","realism":"a real editorial photograph, a single realistic exposure, not CGI","environment":"THE ONE CHANGE: replace the deep pyramid of stacked bottles with the real rack from @image2: two or three separate horizontal rows of wine bottles, each row a single layer of bottles resting side by side in the black wire shelf of the slim metal unit, bases facing camera, with the thin black metal uprights and shelf edges visible between the rows and a strip of red brick wall visible behind and above the rows. Keep the camera close and frontal as in @image1.","lighting":"unchanged from @image1: one dramatic, hard, slightly warm key light from the upper right catching the rims of the glass bottle bases as bright curved highlights, deep near-black between them, heavy contrast, warm cinematic colour grade around 3100K, visible fine film grain","camera":{"lens_mm":"85","aperture_f":"2.0","iso":"1000","shutter":"1/125","lens_to_subject_m":"0.5","subject_to_bg_m":"0.3","cct_k":"3100"},"composition":"vertical 9:16, frontal and close; the rows of bottle bases cross the frame horizontally, the nearest sharp in the centre, the outer ones soft and cropped at the edges; black shelf edges separate the rows","imperfections":"slightly different glass tints between bottles, a faint film of dust on some bases, small irregularities in the black paint of the shelving","palette":"dark bottle green and black glass, amber highlights, terracotta brick in shadow, near-black","mood":"quiet cellar calm","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no stacked pyramid of bottles, no bottles piled on top of each other, no cellar wall of bottles, no wooden rack, no vault, no labels facing camera, no text, no lettering, no logo, no rack design different from @image2, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

### A.9 P8 — Cierre · medias: mesas-restaurante3, mesa-chimenea, copa-vino-grande, frame plano10 · `ac38bb0b-bc3e-47ba-b305-fa5a474544bb`

```json
{"subject_identity":"A quiet corner of the dining room of Torre de Vega, a nearly 50-year-old village grill restaurant in Alhaurín de la Torre, Málaga, Spain, seen past a glass of red wine. @image1 and @image2 are real photographs of this room and govern it completely: red brick walls, a black wrought-iron wall sconce with a warm bulb, white sheer curtains, beige embossed tablecloths over pale pink undercloths, honey carved wooden chairs. @image3 is a real photograph of the restaurant's wine glass and governs its exact shape. @image4 is a frame from another restaurant's video and governs ONLY the very shallow focus, the dark frame and the single glowing light point; nothing else from @image4 may appear.","realism":"a real editorial photograph, a single realistic exposure, not CGI","environment":"in the extreme foreground, very out of focus, the bowl of a large wine glass holding red wine on a laid table; beyond it, the brick wall with the lit iron sconce and the edge of a curtained window, the room empty and ready","lighting":"the iron wall sconce is the single warm light source, a glowing point that blooms softly through the out-of-focus wine glass; faint warm spill on the brick around it; everything else deep near-black; heavy contrast, warm cinematic colour grade around 3000K, visible fine film grain","camera":{"lens_mm":"50","aperture_f":"1.8","iso":"1600","shutter":"1/100","lens_to_subject_m":"0.25","subject_to_bg_m":"4","cct_k":"3000"},"composition":"vertical 9:16, camera at table level; the glass bowl fills the lower left and centre as a soft ruby shape; the sconce glows in the upper right third; the middle band is dark and clean for the closing brand card","imperfections":"natural brick colour variation around the sconce, the curtain folds barely readable in the dark, the grain visible in the shadows","palette":"ruby, amber glow, terracotta hint, near-black","mood":"the evening settling in, an open invitation","film_stock":"warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain","negatives":"no people, no text, no lettering, no logo or emblem, no restaurant name, no empty glass, no stain, no furniture, lamps or decoration absent from @image1 and @image2, no forest, no glass wall, no fire, no flames, no smoke, no flat even lighting, no bright airy look, no HDR, no CGI gloss, no watermark"}
```

---

## Anexo B — Prompts literales de vídeo

### B.1 V1 — Multitoma Seedance 2.5 (P2 + P5 + P6)

`model:"seedance_2_5"`, `mode:"omni_reference"`, `resolution:"1080p"`, `duration:10`,
`aspect_ratio:"9:16"`, `generate_audio:false`, `medias`: `image_references` = `1d31813a…` (P2),
`e7dcd73b…` (P5), `ea1cd697…` (P6). Job `f846263b-59c1-4a91-8252-9e7046eebb85`.

```text
A three-shot sequence inside Torre de Vega, a village grill restaurant, with hard cuts between shots. Shot 1 is @image1, shot 2 is @image2, shot 3 is @image3. Each shot opens framed exactly like its reference image and animates it with restrained, cinematic motion.

PRESERVE EXACTLY FROM EACH REFERENCE IMAGE:
- The room, the carved honey-wood chair with its rush seat, the beige embossed tablecloth over the pale pink undercloth, the white plates with embossed rims, the cutlery and the large wine glasses: same shapes, same positions, unchanged.
- The hands: the woman's hand in shots 1 and 3 and the man's hand in shot 2 keep the same fingers, the same skin, no rings or jewellery appearing, no change of shape in any frame.
- The wine bottle in shot 2 stays plain dark glass with no label visible.
- The framing, the dramatic light direction and the colour grade of each reference.

MOTION (BEATS):
- 0-3.3s, shot 1 (@image1): the woman's hand, already gripping the carved top rail, draws the chair back about ten centimetres from the table in one smooth pull, then the hand rests still on the rail and the chair settles on its legs.
- 3.3-6.6s, shot 2 (@image2): the ruby wine stream keeps pouring continuously from the bottle into the nearest glass; the wine level rises gently with small ripples; at about 6s the man's hand tilts the bottle up slightly and the stream thins to a last drop; the other glasses stay perfectly still.
- 6.6-10s, shot 3 (@image3): the woman's fingertips rest on the foot of the glass, then slide the glass one centimetre closer to the plate in a single short gesture and stay still; a faint shimmer moves across the wine surface.

CAMERA:
- Shot 1: a single continuous lateral move on a motorised slider with a geared head, travelling about five percent to the left, slow constant speed, already moving on the first frame and still moving on the last.
- Shot 2: a slow motorised push-in of about five percent toward the glass and the stream, constant speed from first to last frame.
- Shot 3: a slow mechanical crane descent of about four percent, the camera lowering toward the plate rim at constant speed.
- Perfectly mechanical and stabilised in every shot: no handheld operation, no shake, no jitter, no wobble, no floaty drift, no pan, no roll, no orbit, no zoom punch.

FILM GRADE:
- Keep the exact grade of the references: one hard, slightly warm key light, deep near-black shadows, heavy contrast with true blacks, warm cinematic colour around 3100K, visible fine film grain. No digital sharpening, no smoothing.

NEGATIVE: no warping hands, no extra or melting fingers, no rings appearing, no morphing chair, glasses or plates, no wine spilled on the tablecloth, no stain, no label or text on the bottle, no text overlay, no logo, no food, no empty glass, no face, no fire, no smoke, no sparks, no floating objects, no handheld shake, no fast camera moves.

Shot on a cinema camera with 50mm and 65mm lenses, f/2.2, shallow depth of field consistent with the stills. Photographic realism, no text.
```

### B.2 P3 — Sala (Kling 3.0)

`model:"kling3_0"`, `mode:"pro"`, `duration:3`, `aspect_ratio:"9:16"`, `sound:"off"`,
`declined_preset_id:"24bae836-2c4a-48e0-89b6-49fcc0b21612"`, `start_image` = `33e9ec08…`.
Job `c87d96da-e1a4-4f8b-9a18-4aae389f732f`.

```text
The empty dining room of Torre de Vega laid for dinner, seen past an out-of-focus glass of red wine. Animate the provided start image with restrained, cinematic camera motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- The room: red brick walls, white sheer curtains, iron wall sconces, the black wrought-iron ring chandeliers, the stone fireplace wall, the tables with beige embossed cloths over pale pink undercloths, the honey carved chairs with rush seats, all in the same positions.
- The foreground wine glass and the hand holding its stem at the lower edge stay exactly the same, with the same fingers and the same wine level.
- The light direction, the deep shadows and the colour grade.

MOTION (BEATS):
- 0-1.5s: the room is still; the red wine in the foreground glass holds a faint glint that shifts slightly.
- 1.5-3s: nothing in the room moves; only the camera travels.

CAMERA:
- A single continuous lateral move on a motorised slider with a geared head, travelling about eight percent to the right, so the out-of-focus glass in the foreground slides across the frame faster than the tables and windows behind it, revealing real parallax. Slow, constant speed, already moving on the first frame and still moving on the last. Perfectly mechanical and stabilised: no handheld operation, no shake, no jitter, no wobble, no floaty drift, no pan, no roll, no orbit, no zoom punch.

FILM GRADE:
- Keep the exact grade of the start image: one hard, slightly warm key light from the windows, deep near-black shadows, heavy contrast, warm cinematic colour around 3100K, visible fine film grain.

NEGATIVE: no people walking, no morphing chairs or tables, no chandelier changing shape, no warping hand, no extra fingers, no text overlay, no logo, no fire, no smoke, no sparks, no floating objects, no handheld shake, no fast camera moves.

Shot on a cinema camera with a 35mm lens, f/2.2, depth of field consistent with the still. Photographic realism, no text.
```

### B.3 P4 — Lámpara (Kling 3.0)

Mismos params que B.2, `start_image` = `eaaa6224…`. Job `c1c52b1d-dc26-43df-9158-d66c7b17619f`.

```text
The black wrought-iron ring chandelier of Torre de Vega, lit at night, seen from below. Animate the provided start image with restrained, cinematic camera motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- The chandelier: the same forged iron ring with its scrolls, the same chains, the same number of arms and bare round bulbs, in the same positions; nothing added or removed.
- The brick wall at the lower edge and the dark ceiling.
- The glow of the bulbs, the deep shadows and the colour grade.

MOTION (BEATS):
- 0-1.5s: the bulbs glow steadily; the chandelier hangs completely still, only the faintest natural sway of the chains.
- 1.5-3s: nothing else moves; only the camera travels.

CAMERA:
- A single continuous short arc on a motorised slider with a geared head, travelling about six degrees around the chandelier from left to right while looking up at it, so the iron scrolls and the chains shift against each other and reveal the real depth of the ring. Slow, constant speed, already moving on the first frame and still moving on the last. Perfectly mechanical and stabilised: no handheld operation, no shake, no jitter, no wobble, no floaty drift, no roll, no zoom punch.

FILM GRADE:
- Keep the exact grade of the start image: the bulbs as the only hard warm light, the iron silhouetted and rim-lit, near-black surroundings, heavy contrast, warm cinematic colour around 3000K, visible fine film grain.

NEGATIVE: no crystals, no glass pendants, no swinging chandelier, no flickering bulbs, no bulbs appearing or disappearing, no morphing iron, no text overlay, no logo, no fire, no flames, no smoke, no sparks, no floating objects, no handheld shake, no fast camera moves.

Shot on a cinema camera with an 85mm lens, f/2.0, depth of field consistent with the still. Photographic realism, no text.
```

### B.4 P8 — Cierre (Kling 3.0)

Mismos params que B.2, `start_image` = `ac38bb0b…`. Job `e47b1149-439b-46a4-aea8-4d66f8dd69a9`.

```text
A quiet corner of the Torre de Vega dining room seen past a glass of red wine, the iron wall sconce glowing on the brick. Animate the provided start image with restrained, cinematic motion.

PRESERVE EXACTLY FROM THE START IMAGE:
- The large wine glass in the foreground with the same shape and the same wine level.
- The brick wall, the black wrought-iron sconce with its warm bulb, the sheer curtain, the laid table with the beige embossed cloth over the pale pink undercloth and the honey carved chairs, all in the same positions.
- The light, the deep shadows and the colour grade.

MOTION (BEATS):
- 0-1s: the frame holds; a faint glint moves across the wine surface.
- 1-2.5s: a slow, smooth focus pull: the sharp focus travels from the glass in the foreground back to the sconce and the laid table behind, so the glass softens into a warm ruby shape and the room comes into focus.
- 2.5-3s: the focus settles on the room and holds.

CAMERA:
- A very slow motorised push-in of about three percent toward the sconce, constant speed, already moving on the first frame and still moving on the last. Perfectly mechanical and stabilised: no handheld operation, no shake, no jitter, no wobble, no floaty drift, no pan, no roll, no orbit, no zoom punch.

FILM GRADE:
- Keep the exact grade of the start image: the sconce as the single warm light, near-black surroundings, heavy contrast, warm cinematic colour around 3000K, visible fine film grain.

NEGATIVE: no people, no flickering light, no morphing glass, chairs or table, no wine moving by itself, no text overlay, no logo, no fire, no flames, no smoke, no sparks, no floating objects, no handheld shake, no fast camera moves.

Shot on a cinema camera with a 50mm lens, f/1.8. Photographic realism, no text.
```

### B.5 Muestras de voz

`model:"seed_audio"`, `voice_type:"preset"`, `voice_id` según el §15, prompt idéntico en las tres:

```text
Carta de otoño en Torre de Vega: chuletón a la brasa, aquí, en Alhaurín.
```
