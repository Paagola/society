# 04 · Texto, subtítulos y audio

Especificaciones de rótulos, subtítulos y mezcla para reels verticales. Combina el estándar tipográfico **validado por cliente** (Torre de Vega, 08/09/2026, skill `after-effects-reels`), las especificaciones de OpenMontage (`typography.md`, `short-form.md`, `sound-design.md`) y la API de subtítulos de Remotion.

## Índice

1. Zonas seguras en vertical
2. Estándar tipográfico premium para hostelería
3. Contraste texto-fondo
4. Subtítulos
5. Texto revelado por la escena
6. Audio: niveles, ducking y efectos
7. Voz en off
8. Música

---

## 1. Zonas seguras en vertical (1080×1920)

| Plataforma | Zona segura | Muerta arriba | Muerta abajo | Muerta a la derecha |
|---|---|---|---|---|
| **Instagram Reels** | 996×1400 | 210 px | 310 px | 84 px |
| TikTok | 900×1492 | 108 px | 320 px | 120 px |
| YouTube Shorts | 984×1500 | 120 px | 300 px | 96 px |
| Facebook Reels | 1080×1520 | 100 px | 300 px | 60 px |
| Instagram Stories | 1080×1620 | 100 px | 200 px | — |

**Zona segura universal: 900×1400 centrada.** Los 300–320 px de abajo los tapa la interfaz (comentarios, botones, pie de texto): **nunca** se pone ahí nada importante. Fuente: OpenMontage, que cita PostPlanify (2026) [COMUNIDAD]; las cifras de Reels coinciden en varias guías del sector.

## 2. Estándar tipográfico premium para hostelería [MEDIDO con cliente]

Validado por el cliente el 08/09/2026, tras rechazar la alternativa pesada. Para restaurantes de registro clásico o tradicional:

| Elemento | Fuente | Tamaño (1080×1920) | *Tracking* |
|---|---|---|---|
| Titular | Bodoni MT **Regular** | 70 | 400 |
| Marca o subtítulo | Bodoni MT Regular | 40 | 640 |
| Placa de cierre | Bodoni MT Regular | 62 | 540 |

- Blanco puro, **sin contorno**. Sombra suave: *Distance* 0, *Softness* 70, *Opacity* 200 (en AE la opacidad va de 0 a 255).
- **Filete** de 2 px entre titular y subtítulo, a opacidad ~70, que se dibuja desde el centro.
- **Estructura:** titular grande y espaciado → filete → marca pequeña, todavía más espaciada. En la placa de cierre, al revés.
- **Animación:** opacidad 0 → 100 en 0,45 s, subida de 14 px en 0,6 s, filete en escala X 0 → 100 en 0,65 s, entradas escalonadas unos 0,12 s (titular 0,2 s, filete 0,3 s, subtítulo 0,42 s). Salida: fundido de 0,15 s, nunca corte seco.
- **Compensación de centrado:** el *tracking* añade espacio tras el último carácter; se desplaza la X unos 8–12 px.
- ⛔ **Rechazado por el cliente:** Bodoni MT Black, texto a 128 px con contorno negro de 13 px. Es la firma del vídeo casero.

**Los cuatro principios: restar, no añadir.** Peso Regular (el trazo fino se lee como caro) · tamaño pequeño (60–75 px) · *tracking* enorme (400–640) · cero contorno, legibilidad con sombra suave.

Esto es una **preferencia de un cliente**, no una regla universal de Society: otro local (una hamburguesería, un bar de copas) puede pedir otro registro. Recomendaciones generales de OpenMontage para otros registros: Montserrat Bold, Bebas Neue u Oswald para titulares; Inter u Open Sans para texto; como mucho 1–2 familias por pieza; titular al menos un 50 % más grande que el texto.

**Tamaños mínimos a 1080p** (OpenMontage): titular 60–90 px, texto 40–60 px (nunca menos de 40), subtítulos 42 px o más.

## 3. Contraste texto-fondo

- **Se mira el plano que va debajo durante todo el tramo del rótulo** (inicio, mitad y final), no solo el primer fotograma.
- Texto blanco → fondo oscuro o de tono medio. Sobre un plato muy iluminado, un mantel blanco o una ventana quemada, el blanco desaparece aunque lleve sombra.
- Si pelea con el fondo, por orden de preferencia: **mover el texto** a una zona estable de tono contrario → **moverlo en el tiempo** → degradado negro sutil (35–45 %) solo en la franja del texto. Nunca subir el contorno.
- **Al planificar el guion, se decide qué planos llevan texto antes de fijar el orden de cortes.**
- Contraste mínimo 4,5:1, óptimo 7:1 (WCAG). Se comprueba sobre un fotograma ya gradado.

## 4. Subtítulos

| Parámetro | Valor |
|---|---|
| Tamaño | 42 px o más a 1080p |
| Líneas | Como mucho 2 |
| Caracteres por línea | 32–42 (en overlays, 30) |
| Velocidad de lectura | 21 caracteres/s; en redes, 180–200 palabras por minuto |
| Duración por bloque | Entre 1 s y 6–7 s |
| Fondo | Negro semitransparente al 70–80 %, o texto blanco con trazo oscuro de 2–4 px |
| Margen inferior | 60 px o más, y siempre dentro de la zona segura (§1) |

- **Palabra a palabra resaltada:** recomendada en redes [COMUNIDAD]. En Remotion: `createTikTokStyleCaptions({captions, combineTokensWithinMilliseconds})` agrupa las palabras en páginas (1200 ms es un buen punto de partida; menos = más palabra a palabra) y cada `token` tiene `fromMs`/`toMs` para resaltar la palabra activa. Espacios antes de cada palabra y `whiteSpace:"pre"`.
- **Importar SRT:** `parseSrt({input})` de `@remotion/captions`.
- **Tiempos reales, nunca repartidos por longitud de palabra:** salen de las marcas del proveedor de voz o de una alineación medida (WhisperX, faster-whisper) corregida contra el guion. Se conserva siempre un SRT (prompt de Torre de Vega).

## 5. Texto revelado por la escena [validado por el cliente]

Al cliente le gustan los efectos donde **la escena descubre la palabra** (no un fundido):

| Efecto | Cómo |
|---|---|
| Texto detrás de un objeto | Duplicar el clip, enmascarar el objeto en la copia superior y poner el texto entre las dos capas |
| Revelado por movimiento | *Track matte* alfa o luma invertida con una forma que sigue al elemento que se retira |
| Revelado simple | La entrada del texto coincide con el fotograma exacto en que el elemento sale del plano. Da el 80 % del efecto sin rotoscopia |

Se empieza siempre por el revelado simple. La tipografía no cambia: solo cambia cómo entra.

## 6. Audio: niveles, ducking y efectos

> **Obligatorio [MEDIDO 25/09/2026]:** el reel de Da Tonino v3 se entregó con la pista de audio vacía. Un reel de comida sin sonido no pasa la puerta E. Capas mínimas y origen del sonido: `directoria/references/hosteleria/08-firma-de-rodaje-real.md` §9.

**Loudness de entrega** (OpenMontage `sound-design.md`, que cita las especificaciones de las plataformas):

| Plataforma | LUFS integrados | True peak |
|---|---|---|
| Instagram Reels, TikTok | −14 LUFS | −1 dBTP |
| YouTube y Shorts | −14 LUFS | −1,5 dBTP |

**Niveles relativos:**

| Elemento | Nivel |
|---|---|
| Voz en off | −12 a −14 dB de pico (principal) |
| Música con voz encima | −22 a −26 dB en short-form; 18–20 dB por debajo de la voz |
| Efectos | −18 a −14 dB; siempre al menos 6 dB por debajo de la voz |

- **Ducking:** bajar la música 6–12 dB cuando habla la voz. Truco de EQ: recortar 2–4 kHz en la música para dejar sitio a la inteligibilidad. En ffmpeg: `sidechaincompress` con threshold=0.02, ratio=9, attack=200 ms, release=500 ms.
- **Efectos de transición:** *whoosh* de 400–500 ms que empieza 10–20 ms **antes** del cambio visual; el pico de energía coincide con el momento de mayor cambio. *Pop* de texto de menos de 200 ms. Impacto de menos de 300 ms. Ajuste fotograma a fotograma.
- **Sonido de comida como sustituto del sabor:** chisporroteo, crujido, vertido, burbuja, cuchillo en la tabla (skill `directoria`, `hosteleria/05` §5). Un sonido dominante por acción y el ambiente debajo.
- **Silencio → impacto:** 3 fotogramas de silencio antes de un sonido fuerte hacen que suene más fuerte [COMUNIDAD].
- **Efectos disponibles en Remotion:** `@remotion/sfx` con `whoosh`, `whip`, `switch`, `shutter-modern`, `ding` y otros; la mayoría de la lista son memes (vine-boom, bruh…) que no encajan con un restaurante.

## 7. Voz en off

- **Español de España.** Antes del texto completo, una muestra corta **con palabras del negocio** (brasa, chuletón, el nombre del pueblo) y aprobación. No se deduce el acento por el nombre de la voz ni se inventa un parámetro de idioma que el proveedor no tenga (prompt de Torre de Vega).
- **Cadena para voces sintéticas** (OpenMontage): filtro de paso alto a 80–100 Hz → recorte en 500 Hz → +2–3 dB en 2–5 kHz → recorte suave en 6–8 kHz → compresión 3:1 (attack 1–5 ms, release 10–20 ms) → de-esser en 6–8 kHz → limitador a −1,5 dBTP. Se prueba en el altavoz del móvil.
- **Ritmo:** 180–200 palabras por minuto en short-form; nada de silencios largos (un silencio muerto invita a pasar al siguiente vídeo).

## 8. Música

- **Libre de derechos**, con la fuente y la licencia registradas en el log de decisiones. En Reels, preferir la biblioteca de la plataforma para evitar reclamaciones.
- **BPM por energía:** 60–80 tranquilo, 90–110 estándar, 120–140 con energía.
- **Instrumental** cuando hay voz en off (la letra compite con la narración).
- **Desde el primer fotograma:** ningún arranque en silencio.
- **Recordatorio medido:** añadir música no movió la métrica del Virality Predictor (→ `03` §2). Se usa por la experiencia del espectador y por el algoritmo (audio en tendencia), no por la puntuación del predictor.
