# 07 · Analizar un vídeo de referencia

Protocolo para cuando el cliente o el equipo trae un reel y dice "algo así". Adaptado de `skills/meta/video-reference-analyst.md` de OpenMontage y combinado con el protocolo con ffmpeg de Society (skill `directoria`, `hosteleria/07`).

## Índice

1. Cuándo aplica
2. Análisis en 5 aspectos por plano
3. ¿Movimiento real o foto animada?
4. Auditoría de capacidades
5. Preguntas antes de proponer
6. Propuestas diferenciadas, nunca copias
7. Muestra primero

---

## 1. Cuándo aplica

- **Sí:** URL de Instagram, TikTok o YouTube; "algo como esto", "en este estilo", "inspirado en".
- **No:** "edita este vídeo" o "córtalo en clips" (→ pipeline de metraje real: `hybrid`, `clip-factory`, `talking-head`).

## 2. Análisis en 5 aspectos por plano

Formato canónico (taxonomía CMU/Harvard CHAI que usa OpenMontage). Cada plano o grupo de planos con **los cinco aspectos etiquetados**; si uno no aplica, se escribe **N/A de forma explícita** (omitirlo en silencio es el fallo más común):

- **Sujeto:** tipo, número, atributos, cómo cambia entre planos (aparece, desaparece, se sustituye, alterna).
- **Movimiento del sujeto:** acciones en orden, interacciones.
- **Escena:** **overlays aparte** (textos, rótulos, gráficos, marcas de agua: nunca se describen "en primer plano"), punto de vista (dron, cenital, macro, por encima del hombro, en mano, fija), lugar, hora del día, dinámica (vapor, partículas, gente).
- **Encuadre espacial:** tamaño de plano, posición del sujeto, profundidad (primer plano, medio, fondo), altura relativa, **y cómo cambian** durante el plano.
- **Cámara:** velocidad de reproducción, deformación de la óptica, altura, ángulo, foco y profundidad de campo, estabilidad, movimiento.

Se completa con: **qué hace que funcione** (2–3 cosas concretas: la técnica de gancho, el ritmo, las transiciones, el estilo de narración), las medidas con ffmpeg (cortes, picos de movimiento, luz: `directoria`, `hosteleria/07` §1) y, si conviene, Video Analysis y Virality Predictor de Higgsfield sobre la referencia.

## 3. ¿Movimiento real o foto animada?

Se clasifica cada plano como `motion_clip` (vídeo generado o rodado), `animated_still` (foto con Ken Burns o empujar y tirar) o `static_image`. **No se adivina: se mide** (diferencia entre fotogramas, flujo óptico). Si la mayoría son fotos animadas, la ruta barata es imagen + montaje (Remotion); si son clips en movimiento, hace falta generar vídeo. Equivocarse aquí lleva a proponer la ruta y el presupuesto equivocados.

## 4. Auditoría de capacidades

Se compara lo que necesita la referencia con lo que hay disponible:

```text
LA REFERENCIA NECESITA     TENEMOS                         HUECO
Clips de comida en mov.    Seedance 2.5 / Kling (Higgsfield) LISTO
Persona hablando           Personal real con permiso / —   BLOQUEADO sin permiso
Voz en off                 Proveedor TTS                   LISTO
Montaje                    Remotion / AE                   LISTO
```

Los huecos se dicen con honestidad, con alternativas.

## 5. Preguntas antes de proponer

Una a una, empezando por el hueco más importante y sin repetir lo que ya se sabe:

1. ¿Voz en off o solo imagen con música? Si hay voz: ¿un narrador, diálogo de personajes o narrador con algún diálogo? (Se fija **antes** de las propuestas.)
2. Duración: la referencia dura X s; ¿la queremos igual?
3. ¿Mismo tema que la referencia o el mecanismo aplicado a otro plato o motivo?
4. ¿Algo de la referencia que encante o que moleste?

**Filtro de Society:** si la referencia no es de comida, bebida o restaurante, solo se aprovecha su **mecanismo** (ritmo, gancho, rótulos), nunca su look, sus platos, su local ni sus personas. Investigación ligera (2–3 min): 3–5 piezas parecidas, qué funciona y qué está ya muy visto. Para el guion no se buscan tendencias en la web: las fuentes son el análisis de Instagram del cliente y la noticia del brief.

## 6. Propuestas diferenciadas, nunca copias

**2–3 opciones**, cada una con: de qué se inspira (ritmo, estructura, tono), **qué cambia**, plan visual (herramientas y modelos), plan de audio, duración, **coste estimado desglosado** (imágenes, vídeo, voz, música), valoración honesta de cómo va a quedar y **una recomendación** con el motivo. El proveedor no se elige por el usuario: se le presenta la comparación.

| Patrón de diferenciación | Ejemplo en hostelería |
|---|---|
| Misma estructura, otro sujeto | Cinco cócteles en el mismo posavasos → cinco tapas en la misma pizarra |
| Mismo sujeto, otro ángulo | "Cómo se hace" → "cómo se hace, desde los ojos del cocinero" |
| Mismo tono, otro tratamiento visual | Cortes rápidos de plato → acumulación en mesa con plano cenital |
| Mismo contenido, otra plataforma | TikTok de 45 s → Reel de 12 s |
| Contrapunto | "El secreto del chef" → "No hay secreto: 12 horas de brasa" |

**Estrategia de clips** (OpenMontage): priorizar clips más largos y consolidar escenas contiguas en un solo clip cuando la narración lo permita. Con Seedance 2.5, la multitoma en un clip (skill `directoria`, `hosteleria/07` §5) cuesta menos que varios clips sueltos y da continuidad.

## 7. Muestra primero

Antes de la pieza completa: **una muestra de 10–15 s** (el gancho + una escena intermedia) con la voz, el estilo visual, la música y los subtítulos reales, y su coste. No se salta salvo que el usuario insista después de oír la recomendación. Tras aprobar la muestra se entra en el pipeline, etapa por etapa, con sus puertas (→ [`01-sistema-openmontage.md`](01-sistema-openmontage.md) §3 y §5).
