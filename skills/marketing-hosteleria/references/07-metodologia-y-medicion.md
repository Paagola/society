# 07 · Metodología: estrategia, hipótesis y medición

El proceso repetible que convierte "esto funcionó una vez" en "esto es una regla para este restaurante". Resume `informes/Society_estrategia_redes_y_retroalimentacion.md` (el informe completo manda) y `informes/Society_cerebro_estrategico.md`.

## Índice

1. El ciclo
2. Ritmos: trimestre, mes, semana, pieza
3. Brief de pieza (18 campos)
4. Hipótesis registradas antes de publicar
5. Diccionario de métricas de la API
6. Ventanas de lectura
7. Líneas base y clasificación
8. Diagnóstico por síntomas
9. Informe semanal

---

## 1. El ciclo

**estrategia → hipótesis → brief de pieza → producción → publicación → medición → diagnóstico → decisión → estrategia actualizada**

El contrato de plano de la producción (skills `director` y `directoria`) deja de empezar en una intención suelta ("mostrar el pulpo") y recibe un brief que declara objetivo, situación de consumo, audiencia, motivo de envío, métrica y umbral.

## 2. Ritmos

| Nivel | Frecuencia | Salida |
|---|---|---|
| Estrategia | Trimestral, 60–90 min con el cliente | Objetivos, situaciones de consumo prioritarias, pilares, umbrales, hipótesis principales |
| Plan | Mensual | Calendario por pilar y formato, 2–3 hipótesis que probar, dependencias |
| Revisión | Semanal (lunes) | Informe: hechos, interpretación, 2 patrones para repetir como máximo, 1 para dejar, 1 hipótesis nueva |
| Brief | Por pieza | Contrato de 18 campos |

Un aprendizaje confirmado a mitad de trimestre se registra como **propuesta** de cambio y se aplica en la siguiente revisión, salvo que contradiga una regla dura del cliente.

## 3. Brief de pieza (18 campos)

| Campo | Ejemplo |
|---|---|
| ID | `TDV-2026-09-30-R-carta-otono` |
| Objetivo (uno) | Descubrimiento / consideración / conversión / relación |
| Situación de consumo | Hay una novedad con fecha |
| Audiencia prevista | Seguidores, no seguidores o ambas |
| **Motivo de envío** | «La carta nueva empieza el 2 de octubre» |
| **Hipótesis** | Si la fecha aparece en pantalla desde el fotograma 1, la tasa de envío supera el 0,40 %, porque el aviso resuelve un plan |
| Variable probada | Una por pieza: fecha en pantalla desde t = 0 |
| Métrica principal y umbral | `shares/reach` > 0,40 % a 7 días |
| Guardarraíles | `reels_skip_rate` ≤ 68 %; me gusta/alcance ≥ mediana |
| Gancho | Brasa real encendida + «CARTA DE OTOÑO · 2 OCT» |
| CTA y acción medible | «Mándaselo a quien vienes» + historia con enlace de WhatsApp y código `OTOÑO` |
| Condición de publicación | Normal / prueba / colaborativa / promocionada |
| Fecha y franja | Viernes 14:00–15:30 |
| Pie, hashtags, ubicación | Como máximo 5 hashtags, nombre del plato y localidad |
| Audio | Original, biblioteca permitida o sin música |
| Etiqueta de IA | Sí/no, con motivo |
| Dependencias | Metraje real, aprobaciones, colaborador |
| Ruta de producción | Enlace al proyecto con su contrato de plano |

**Sin brief completo no se abre el proyecto de producción.** Aprendizaje del 15/09/2026: el primer montaje de 15 s del chuletón resultó lento; la versión preferida duró 9 s (local → brasa directamente → corte; rótulo «¿ESTE PUNTO?» y pregunta final al espectador). **Nueve segundos es una receta ensayada, no una duración óptima demostrada.**

## 4. Hipótesis registradas antes de publicar

- **Se registran antes.** Si se escriben después, cualquier resultado parece explicable.
- Campos: enunciado, variable, métrica, umbral, ventana, guardarraíles, piezas asignadas y estado.
- **Nunca dos hipótesis sobre la misma métrica en la misma pieza.**
- Estados: **propuesta** → **confirmada** (gana de forma repetida) o **refutada** → o "sin datos suficientes". Una refutada no se borra: se deja visible con el motivo y la fecha.
- Ejemplo: H-04 · reel de proceso con acción real · "Acción real en el fotograma 1 y primer plano de 2–2,5 s bajan el salto" · `reels_skip_rate` < 65 % · guardarraíl: visionado medio ≥ mediana.

## 5. Diccionario de métricas de la API

**Reels:** `reels_skip_rate` (% que salta en los 3 primeros segundos; estimada, en desarrollo), `ig_reels_avg_watch_time` (unidad no documentada oficialmente; fuentes secundarias dicen milisegundos: **contrastar con la app**), `ig_reels_video_view_total_time`, `views`, `reach`, `shares` (→ tasa de envío = shares/reach), `likes`, `saved`, `comments`. **`follows` y `profile_visits` no existen por API para reels** (solo para feed e historias).

**Carruseles y fotos:** `views`, `reach`, `likes`, `comments`, `saved`, `shares`, `follows`, `profile_visits`, `profile_activity`. No hay estadísticas por lámina.

**Cuenta (diaria):** `reach` con desglose seguidor/no seguidor y por formato, `follows_and_unfollows`, `profile_links_taps` por tipo de botón, demografías (para comprobar que la audiencia es local).

**Historias:** solo durante 24 h; `replies` = 0 en Europa.

**Publicación por API:** 100 publicaciones por cuenta cada 24 h, `trial_params` (reels de prueba), `collaborators` (hasta 3), `is_ai_generated`.

## 6. Ventanas de lectura

| Captura | Cuándo | Estado |
|---|---|---|
| Historia | 20–23 h tras publicar | Definitiva (luego expira) |
| +24 h | Reels y publicaciones | Provisional (decisión sobre los reels de prueba) |
| +72 h | Reels y publicaciones | Provisional (final de la ventana de prueba) |
| **+7 días** | Todo | **Comparación estándar entre piezas** |
| +28 días | Todo | Final |
| Diaria | Métricas de cuenta | Serie histórica (Meta conserva 90 días) |

**Solo se comparan capturas de la misma edad.** Los datos pueden retrasarse hasta 48 h. Meta devuelve vacío (no 0) cuando no hay dato: hay que distinguir "sin dato" de "cero".

## 7. Líneas base y clasificación

1. **Tasas, no absolutos** (por alcance o por visualizaciones).
2. **Mediana móvil por formato y condición:** las últimas 8–12 piezas del mismo formato y condición (un reel de prueba no se compara con uno normal).
3. **Contexto marcado:** local cerrado, festivo, evento, promoción pagada.
4. **Menos de 5 piezas comparables → no se clasifica ninguna como ganadora**: solo se describe.
5. **Correlaciones como exploración** (con 21 publicaciones, Spearman orienta pero no demuestra).

**Ganadora:** ≥ 1,5 × la mediana en su métrica principal, sin empeorar los guardarraíles. **Señal candidata:** la misma variable gana en al menos 2 de 3 piezas. **Revisar la hipótesis:** no gana en 3 intentos.

**Prioridad de decisión:** resultado de negocio (conversaciones, reservas) > envíos y guardados > tiempo de visionado > me gusta > seguidores.

## 8. Diagnóstico por síntomas

Un único síntoma principal por pieza, en orden:

| Síntoma | Causa probable | Dónde actuar |
|---|---|---|
| Salto alto a 3 s | Fotograma 1 quieto o sin promesa | Gancho (skills `openmontage` y `director`) |
| Buen gancho y visionado medio bajo | Desarrollo lento o sin progresión | Ritmo y estructura |
| Buen visionado y pocos envíos | Sin motivo para reenviar | Mensaje: novedad + fecha + beneficio local |
| Buenos envíos y alcance bajo | Frecuencia, franja o competencia | Calendario; reel de prueba; colaboración |
| Alcance alto y ninguna conversación | Perfil o CTA | Bio, enlace, CTA medible |

## 9. Informe semanal

Estructura: hechos con ID y cifra → interpretación → estado de las hipótesis activas → como máximo 2 patrones para repetir, 1 para dejar y 1 hipótesis nueva → decisiones que necesita el propietario. Se separa siempre **hecho, interpretación e hipótesis**. Una sola pieza no convierte un patrón en regla.
