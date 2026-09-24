> **Origen:** `torre_de_vega/instagram-skill-hosteleria/04-benchmarks-kpis/README.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# Benchmarks y KPIs para Instagram en hostelería

## TL;DR

- Esta carpeta reúne cifras de referencia (engagement, guardados, DMs, funnel de perfil, alcance local) para que un bar, restaurante, coctelería o pizzería en España sepa si sus números van bien, regular o mal.
- Los benchmarks de "industria" (Food & Beverage) varían mucho según la fuente (0,63% según Rival IQ, hasta 2,5% según Dash Social) porque cada herramienta mide sobre una base distinta (seguidores vs. alcance) y con muestras diferentes. Por eso cada archivo da un **rango**, no una cifra única.
- El benchmark más útil casi siempre es **tu propia cuenta hace 90 días**, no el promedio del sector. Usa las cifras de esta carpeta como techo/suelo orientativo, no como objetivo absoluto.
- Cuantos menos seguidores tengas, más alto debería ser tu % de engagement esperado (las cuentas pequeñas convierten mejor su audiencia real). No te compares en % con cuentas de 500K si tú tienes 3K.
- Donde no exista un dato público fiable (p. ej. "alcance en 5km"), lo decimos explícitamente como estimación basada en patrones del sector, no lo inventamos como si fuera un dato medido.

## La métrica norte (North Star): covers reservados atribuibles a Instagram

Antes de mirar ninguna tabla de esta carpeta, ten claro esto: **el objetivo de la cuenta no es maximizar seguidores, ni siquiera maximizar engagement rate.** Es maximizar **covers (comensales) reservados atribuibles a Instagram**, por semana o por mes. Todo lo demás — engagement rate, guardados, alcance, visitas a perfil — es una **señal diagnóstica útil en el camino**, no el resultado que paga las facturas.

El embudo completo es:

```
Reel / Carrusel (descubrimiento)
      ↓
Visita al perfil
      ↓
Conversación por DM / WhatsApp
      ↓
Reserva
      ↓
Comensales sentados en mesa
      ↓
Registrado en un log de atribución ("¿cómo nos conociste?" / código de campaña)
```

Cada archivo de esta carpeta cubre un tramo de ese embudo: `engagement-rates.md` y `saves-benchmarks.md` diagnostican el arranque (¿el contenido engancha y se guarda?); `profile-visit-funnel.md` cubre el paso de descubrimiento a visita de perfil; `dms-conversions.md` cubre el paso decisivo de conversación a reserva; `reach-local.md` ayuda a estimar cuánto de ese embudo es gente físicamente cerca. Ninguno de esos KPIs intermedios sustituye al KPI real: si el engagement rate sube pero los covers atribuibles a Instagram no se mueven, el embudo tiene una fuga en algún punto entre el contenido y la mesa, y hay que diagnosticarla con estos documentos — no dejar de medir el KPI real y conformarse con el intermedio.

**Cómo montar el log de atribución (mínimo viable):** una hoja de cálculo con: fecha, canal de origen (DM Instagram / WhatsApp desde bio / llamada tras ver Instagram / "vine porque lo vi en Instagram" respondido en sala), nº de comensales, ticket medio. Con 4-6 semanas de datos ya tienes tu propio benchmark, mucho más útil que cualquier cifra de industria de esta carpeta.

## Cómo usar esta carpeta

1. **Identifica tu tamaño de cuenta** (número de seguidores) → ve a `engagement-rates.md` y ubica tu franja.
2. **Mide tu ratio de guardados por post** (guardados ÷ alcance) → compáralo con `saves-benchmarks.md`.
3. Si usas Instagram para generar reservas, revisa `dms-conversions.md` y `profile-visit-funnel.md` para poner objetivos realistas al equipo de sala/reservas.
4. Si tu negocio depende de clientela de proximidad (barrio, turistas de zona), consulta `reach-local.md`, con las salvedades indicadas sobre falta de datos públicos exactos.
5. Revisa estos números **cada 4-6 semanas**, no cada día — el ruido estadístico en cuentas pequeñas (menos de 5.000 seguidores) es alto post a post.

## Qué NO hacer con estos benchmarks

- ❌ No fijar objetivos de equipo basados en la cifra más alta encontrada en una búsqueda (sesgo de survivorship: los casos publicados son los que mejor funcionaron).
- ❌ No comparar engagement rate entre cuentas de tamaños muy distintos sin ajustar por franja de seguidores.
- ❌ No tratar una métrica de una fuente (p. ej. Socialinsider) como comparable 1:1 con otra (p. ej. Dash Social) sin mirar su metodología — miden bases distintas.
- ❌ No confundir un benchmark operativo (p. ej. "ER > 3% es bueno") con un umbral oficial del algoritmo de Meta — ningún archivo de esta carpeta contiene cifras confirmadas por Meta; todas son objetivos de gestión de terceros o tuyos propios. Ver `../00-algoritmo/README.md` para la distinción entre "confirmado por Meta/Mosseri" y "estimación interna".
- ❌ No dejar que el engagement rate (o cualquier otro KPI intermedio) reemplace al KPI real: covers reservados atribuibles a Instagram. Un ER alto sin reservas es una cuenta entretenida, no un negocio que crece.

## Recursos relacionados

- [[engagement-rates.md]]
- [[saves-benchmarks.md]]
- [[dms-conversions.md]]
- [[profile-visit-funnel.md]]
- [[reach-local.md]]
- [[../06-workflows-automatizacion/analytics-review.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: consultar cada archivo individual para las fuentes específicas usadas ; informe interno informes/deep-research-report.md (declaraciones de Adam Mosseri, sección "Instagram en 2026: señales reales y sistema de conversión")*
