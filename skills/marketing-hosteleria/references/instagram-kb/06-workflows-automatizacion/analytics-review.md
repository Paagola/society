> **Origen:** `torre_de_vega/instagram-skill-hosteleria/06-workflows-automatizacion/analytics-review.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Revisión semanal de analítica: qué duplicar, qué cortar

## TL;DR

- Dedica 30-45 minutos cada viernes a revisar los datos de la semana antes de planificar la siguiente — cierra el ciclo entre `[[weekly-content-research.md]]` y el resultado real.
- Las 4 métricas clave a revisar cada semana: alcance, engagement rate (ver `[[../04-benchmarks-kpis/engagement-rates.md]]`), guardados (ver `[[../04-benchmarks-kpis/saves-benchmarks.md]]`), y actividad de perfil (visitas, clics en "Cómo llegar"/reservas — ver `[[../04-benchmarks-kpis/profile-visit-funnel.md]]`).
- Regla simple de decisión: si un formato/tema supera tu benchmark de tu franja de seguidores dos semanas seguidas, duplícalo; si lleva 3-4 semanas por debajo sin mejorar, córtalo o cámbialo de formato.
- Metricool, Later y Buffer ofrecen paneles de analítica con comparación histórica y sugerencias automáticas de mejor horario según tu propio histórico — úsalos para automatizar la recopilación de datos, pero la decisión de qué duplicar/cortar es humana.
- No tomes decisiones sobre 1-2 posts sueltos — el ruido estadístico en cuentas pequeñas es alto; compara tendencias de 3-4 semanas, no picos aislados.
- Las vistas/el alcance solos no dicen qué está ganando de verdad: es posible que un Reel con "solo" 8.000 visualizaciones genere 9 mesas reservadas mientras otro con 80.000 visualizaciones no genere ninguna — sin trackear reservas por publicación, esa diferencia es invisible. Regla de prioridad: **BUSINESS_WINNER (mesas reservadas) > SEND/SAVE WINNER > WATCH WINNER > LIKE WINNER > crecimiento de seguidores**.

## Conceptos fundamentales — hostelería

- **Duplicar**: repetir el mismo formato/tema con variación de contenido (si un carrusel "cómo distinguir X" funcionó, hacer otro carrusel similar sobre otro producto/plato).
- **Cortar**: dejar de invertir tiempo en un formato/tema que consistentemente rinde por debajo de tu benchmark propio, aunque "parezca" buena idea.
- **Iterar**: variar un elemento (gancho, horario, duración) de un formato que rinde "normal" para ver si mejora, antes de cortarlo del todo.
- Ejemplo: una coctelería en Madrid revisa cada viernes que sus Reels de "proceso de cóctel" tienen ER consistentemente por encima de su franja (cuenta de 6.000 seguidores, ER esperado 1,5-3%, consiguiendo 3,5-4%), mientras sus fotos de producto solo llegan al 0,8% — decide duplicar Reels de proceso y reducir fotos de producto a solo apoyo puntual.

## Datos y benchmarks 2026

| Métrica | Objetivo mínimo | Objetivo excelente | Fuente |
|---|---|---|---|
| Frecuencia de revisión de analítica | Mensual | Semanal | Buena práctica de sector — no cifra de fuente externa |
| Ventana mínima de datos antes de decidir duplicar/cortar un formato | 2 semanas | 4 semanas | Estimación basada en patrones del sector |
| Nº de métricas clave a revisar cada semana | 3 (alcance, ER, guardados) | 5+ (+ actividad de perfil, + DMs) | Basado en los archivos de `[[../04-benchmarks-kpis/README.md]]` |
| Tiempo semanal dedicado a la revisión | 20 min | 45 min | Estimación basada en patrones del sector |

## Añade seguimiento de reservas a tu registro (columnas mínimas)

Para poder aplicar la regla BUSINESS_WINNER de arriba, el registro de reservas del negocio (agenda, CRM o simple hoja de cálculo) necesita dos columnas nuevas:

| Columna | Valores |
|---|---|
| `Fuente` | `Instagram organic` \| `Google` \| `Recomendación` \| `Cliente habitual` \| `Otro` |
| `IG asset` | Identificador del post/Reel concreto (ej. `R03_PuntoCarne`) |

Con estas dos columnas rellenadas en cada reserva (basta con preguntar "¿cómo nos has conocido?" y anotar el post si viene de Instagram), en unas semanas se puede cruzar qué piezas concretas generan mesas reales — no solo alcance o guardados. Es la única forma de detectar casos como un Reel de 8.000 visualizaciones que generó 9 mesas frente a uno de 80.000 que no generó ninguna.

## Ciclo de aprendizaje semanal (plantilla)

Usa esta plantilla de 3 preguntas para cerrar cada revisión semanal:

```
¿QUÉ GANÓ?
- Mejor Reel por sends/alcance
- Mejor Reel por watch time
- Mejor Carousel por guardados/alcance
- Mejor publicación por visitas a perfil
- Mejor pieza por mesas reservadas (BUSINESS_WINNER)

¿POR QUÉ?
- Hook, primer frame, sujeto (producto/persona), narrativa, CTA, horario, audio

¿QUÉ HACER LA SEMANA QUE VIENE?
- 2 patrones a repetir
- 1 patrón a dejar de hacer
- 1 hipótesis nueva a probar
```

## Pasos accionables

1. Exporta o revisa en Metricool/Later/Buffer (o Instagram Insights nativo) los datos de los últimos 7 días: alcance, ER, guardados, sends, watch time y actividad de perfil por cada post.
2. Ordena los posts de la semana de mayor a menor ER y de mayor a menor tasa de guardados — identifica el top 2-3 y el bottom 2-3.
3. Compara el top de la semana con las 2-3 semanas anteriores: ¿es un formato/tema que se repite arriba? Si sí, es candidato a duplicar.
4. Compara el bottom con benchmarks de tu franja en `[[../04-benchmarks-kpis/engagement-rates.md]]`: si lleva 3-4 semanas por debajo del mínimo de tu franja, córtalo o cámbialo de formato radicalmente.
5. Cruza el registro de reservas (columnas `Fuente` e `IG asset`, ver arriba) con las publicaciones de la semana — aplica la regla BUSINESS_WINNER > SEND/SAVE WINNER > WATCH WINNER > LIKE WINNER > crecimiento de seguidores antes de decidir qué duplicar.
6. Rellena la plantilla de "Ciclo de aprendizaje semanal" (qué ganó / por qué / qué hacer la semana que viene) y pásala directamente al `[[weekly-content-research.md]]` de la semana siguiente.
7. Una vez al mes, revisa también DMs y conversión a reservas (`[[../04-benchmarks-kpis/dms-conversions.md]]`) para conectar la analítica de contenido con el resultado de negocio real, no solo con vanity metrics.

## Ejemplos reales

Ejemplo ilustrativo (no verificado de forma independiente): un restaurante de brunch en Valencia usa el panel de Metricool cada viernes para comparar el ER de la semana con las 3 anteriores; tras detectar que las stories de "detrás de cámaras" del equipo en cocina generaban consistentemente más visitas al perfil que las fotos de plato solo, reorientan un tercio de su contenido semanal hacia ese formato, coherente con la lógica de "duplicar lo que ya funciona" descrita en este archivo.

## Errores comunes

- ❌ Decidir cortar un formato tras un solo post flojo.
  ✅ Espera 2-4 semanas de datos antes de cortar — el ruido estadístico en cuentas pequeñas es alto.
- ❌ Revisar solo Me gusta y seguidores totales, ignorando guardados y actividad de perfil.
  ✅ Usa las 4-5 métricas clave descritas arriba; son las que de verdad predicen negocio, no solo vanity metrics.
- ❌ Hacer la revisión "quincenal o cuando hay tiempo", perdiendo el hilo de qué está funcionando.
  ✅ Fija un hueco semanal fijo (mismo día, misma hora) — es lo que cierra el ciclo del sistema completo descrito en `[[README.md]]`.

## Plantillas / Prompts

Checklist de revisión semanal (viernes, 30-45 min):
- [ ] Alcance total y por post de la semana comparado con la semana anterior.
- [ ] ER por post, comparado con el benchmark de mi franja de seguidores.
- [ ] Tasa de guardados por post — ¿qué formato/tema lidera?
- [ ] Actividad de perfil (visitas, clics en "Cómo llegar"/reservas) de la semana.
- [ ] 2-3 conclusiones escritas: qué duplicar, qué cortar, qué probar.
- [ ] (Mensual) DMs recibidos y conversión estimada a reservas.

## Recursos relacionados

- [[weekly-content-research.md]]
- [[engagement-routine.md]]
- [[../04-benchmarks-kpis/engagement-rates.md]]
- [[../04-benchmarks-kpis/saves-benchmarks.md]]
- [[../04-benchmarks-kpis/profile-visit-funnel.md]]
- [[../04-benchmarks-kpis/dms-conversions.md]]
- [Metricool — Cómo Programar Instagram con Metricool](https://metricool.com/es/programa-instagram-con-metricool/)

---
*Última actualización: 2026-09-02*
*Fuentes: https://metricool.com/es/programa-instagram-con-metricool/ ; https://www.flick.social/learn/instagram-analytics-benchmarks/insights/conversion-rate/6-months ; ventanas de tiempo y frecuencias de revisión marcadas como estimación basada en patrones del sector; informe interno informes/deep-research-report.md (columnas de atribución de reservas, ciclo de aprendizaje semanal, regla BUSINESS_WINNER — caso Torre de Vega, donde un Reel de 8.000 visualizaciones generó 9 mesas frente a otro de 80.000 sin ninguna)*
