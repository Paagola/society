> **Origen:** `torre_de_vega/instagram-skill-hosteleria/10-skill-integration/research-to-prompts.md` (base de conocimiento de 2026-09-02). Integrado en la skill `marketing-hosteleria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../../00-precedencia-y-correcciones.md), manda ese archivo: recoge mediciones propias posteriores y fuentes oficiales verificadas.

# De la Investigación a los Prompts de Imagen IA

## TL;DR
- Si usas **[DirectorIA Cloud](../../../../directoria/SKILL.md)**, esta "ficha de estilo" que construyes aquí es exactamente lo que le pasas en su onboarding (ver `[directoria-cloud/ONBOARDING.md](../../../../directoria/assets/onboarding.md)`, preguntas de estilo/nivel y film stock) — así no repites la traducción de adjetivos de marca en cada sesión. Detalle de la integración en [[directoria-integration.md]].
- La investigación de marca y competencia debe traducirse en decisiones concretas de prompt (estilo, iluminación, composición, paleta) antes de generar ninguna imagen.
- Un prompt genérico produce contenido genérico; un prompt basado en la investigación del negocio produce contenido que refuerza la identidad de marca.
- Este proceso convierte hallazgos cualitativos ("el local es rústico y cálido", "el público es joven y busca ambiente nocturno") en parámetros técnicos de prompt (iluminación tungsteno, composición 45 grados, paleta cálida).
- Documenta los prompts que funcionan bien para un cliente en una "ficha de estilo" reutilizable, para mantener consistencia visual entre publicaciones.

## Conceptos fundamentales
- **De atributo de marca a parámetro visual**: cada adjetivo de la identidad de marca (elegante, gamberro, rústico, minimalista) se traduce en decisiones de iluminación, composición, paleta y encuadre.
- **De competencia a diferenciación**: analiza qué estilo visual usa la competencia directa para evitar generar contenido que se confunda con el suyo.
- **De público objetivo a estética**: el tono visual debe hablarle al público real del local (ej. coctelería para público joven nocturno vs. restaurante familiar de mediodía).

## Datos y benchmarks 2026
| Atributo de marca | Traducción a prompt |
|---|---|
| Elegante / fine dining | Iluminación dramática lateral, fondo oscuro, composición minimalista, `--style raw` |
| Cercano / familiar | Luz natural, colores cálidos, composición desde ángulo de 45 grados, ambiente casero |
| Gamberro / desenfadado | Colores saturados, composición dinámica, elementos con movimiento (splash, humo) |
| Nocturno / coctelería | Luz de neón/tungsteno, fondo oscuro con bokeh, condensación en vasos |
| Rústico / km0 | Superficies de madera, luz natural de ventana, props naturales (hierbas, tierra) |

## Pasos accionables
1. Extrae de la investigación del negocio (ver `client-onboarding.md`) 3-5 adjetivos que definan la identidad visual del local.
2. Convierte cada adjetivo en parámetros técnicos de prompt usando la tabla de arriba como referencia.
3. Revisa 2-3 cuentas de competencia directa para identificar qué estilo visual evitar (diferenciación).
4. Redacta un prompt base reutilizable combinando: sujeto + composición + iluminación + paleta + parámetros técnicos (lente, cámara).
5. Genera variaciones cambiando solo el sujeto (el plato/producto) y mantén fijos los parámetros de estilo para consistencia visual entre publicaciones.

## Ejemplos reales de aplicación en hostelería
- **Coctelería nocturna de ambiente urbano**: investigación revela público joven, ambiente de noche, marca "atrevida". Prompt resultante: `close-up hyperrealistic cocktail, neon bokeh background, dramatic side lighting, condensation on glass, cinematic color grading --ar 4:5 --style raw --v 6`.
- **Restaurante familiar de cocina tradicional**: investigación revela público familiar, ambiente cálido, marca "cercana y de siempre". Prompt resultante: `overhead shot of [PLATO] on a rustic wooden table, warm natural daylight, homely atmosphere, editorial food photography --ar 4:5 --style raw --v 6`.
- **Pizzería artesanal km0**: investigación revela foco en producto local y proceso artesanal. Prompt resultante: `close-up of pizza dough being stretched by hand, flour dust in warm kitchen light, rustic wood-fired oven in background --ar 4:5 --style raw --v 6`.

## Errores comunes
- ❌ Generar un prompt sin haber definido antes los adjetivos de marca del negocio.
  ✅ Extrae siempre 3-5 adjetivos de la investigación antes de escribir el prompt.
- ❌ Cambiar el estilo visual en cada publicación sin mantener una línea consistente.
  ✅ Fija una "ficha de estilo" por cliente (iluminación, paleta, composición) y reutilízala en todos los prompts.
- ❌ Copiar el estilo visual exacto de un competidor directo.
  ✅ Usa el análisis de competencia para diferenciarte, no para imitar.

## Plantillas / Prompts
```
FICHA DE ESTILO — [NOMBRE_CLIENTE]
Adjetivos de marca: [ej. cálido, artesanal, cercano]
Iluminación base: [ej. luz natural cálida lateral]
Composición preferida: [ej. 45 grados, close-up]
Paleta de color: [ej. tonos tierra, madera, verde oliva]
Parámetros técnicos fijos: [ej. --ar 4:5 --style raw --v 6, shot on 100mm macro lens f/2.8]

Prompt base reutilizable:
"Hyperrealistic [COMPOSICIÓN] of [SUJETO], [ILUMINACIÓN], [PALETA/AMBIENTE], shot on [CÁMARA/LENTE], editorial food photography [PARÁMETROS TÉCNICOS]"
```

## Recursos relacionados
- [[directoria-integration.md]]
- [DirectorIA Cloud](../../../../directoria/SKILL.md)
- [[README.md]]
- [[workflow-completo.md]]
- [[client-onboarding.md]]
- [[../07-plantillas-prompts/ai-image-prompts.md]]
- [[../03-hosteleria-nichos/README.md]]

---
*Última actualización: 2026-09-02*
*Fuentes: elaboración propia, integración interna de la base de conocimiento*
