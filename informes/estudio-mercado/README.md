# Estudio de mercado de Society

Investigación realizada el 19 de septiembre de 2026 para un lanzamiento en España. Actualización posterior de Víctor: **Málaga como zona inicial y Andalucía como expansión prioritaria**, con acceso directo al menos a un restaurante. Los documentos 01–03 conservan la primera versión del estudio; el 04 incorpora esa concreción y revisa críticamente la recomendación comercial.

> **Integrado en el repositorio el 19/09/2026.** Origen: `C:\Users\victo\Documents\Codex\2026-09-19\q\outputs\society-estudio-mercado\`.
> Ver [correcciones y contraste con el informe de viabilidad](#correcciones-y-contraste-con-el-informe-de-viabilidad) al final.

## Lectura recomendada

1. [Estudio de mercado](01-estudio-de-mercado.md): producto, clientes, competencia, mercado, posicionamiento y economía.
2. [Lean Canvas](02-lean-canvas.md): los nueve bloques del ejemplo, adaptados a Society.
3. [Validación y entrevistas](03-validacion-y-entrevistas.md): MVP, preguntas, métricas, umbrales y decisiones.
4. [Auditoría crítica y propuesta reforzada](04-auditoria-critica-y-propuesta-reforzada.md): objeciones del comprador, seis alternativas contrastadas, una oferta de entrada más concreta (campañas de novedades reales) y entrada en Málaga. **Es la recomendación más reciente: leer primero.**

## Base documental y método

Se han utilizado los documentos aportados «Ejemplo de Lean Canvas – App SmartNotes» y «Breve manual de Lean Startup», el README vigente del TFG y sus informes de flujo, viabilidad y estrategia, además de la investigación previa sobre Higgsfield. Las instrucciones de entrar en Canva y los precios de SmartNotes se interpretan como contenido del ejemplo, no como una petición de ejecutar acciones o copiar su modelo de negocio.

Las fuentes públicas primarias y sus enlaces aparecen junto a las afirmaciones del estudio. Se distingue entre hechos documentados, diseño de producto, interpretación estratégica y escenarios hipotéticos. Las páginas comerciales sirven para comparar ofertas declaradas, no para demostrar resultados o satisfacción.

## Registro de fuentes externas

Todas consultadas el 19 de septiembre de 2026. Los precios son observaciones de páginas públicas, no presupuestos vinculantes para Society.

| Fuente | Uso | Limitación |
|---|---|---|
| [INE DIRCE 2025](https://www.ine.es/dyngs/Prensa/DIRCE2025.htm) | Contexto empresarial | Referencia enero de 2025; hostelería incluye alojamiento |
| [INE, tabla 39372](https://www.ine.es/jaxiT3/Tabla.htm?t=39372) | Ruta de segmentación por actividad | Empresas, no establecimientos; no se extrajo un total final elegible |
| [Hostelería de España](https://www.hosteleriadigital.es/2025/12/16/la-hosteleria-finaliza-2025-con-un-aumento-de-la-facturacion-hasta-el-4-en-un-ano-marcado-por-la-incertidumbre/) | Contexto sectorial | Balance publicado en 2025; no mide intención de compra de software |
| [Malou](https://www.malou.io/pricing-us) | Competidor especializado | Configuración, mercado y acompañamiento afectan al precio |
| [Localo](https://localo.com/es/precios) | Presencia local | USD y modalidades de facturación distintas |
| [Metricool](https://metricool.com/pricing/) | Publicación y análisis | Alcance y planes variables |
| [Predis.ai](https://predis.ai/features/) | Generación y programación | No se verificó una tarifa numérica comparable |
| [SYM HostelGestión](https://symhostelgestion.com/servicios/gastromarketing/planes-precios-gastromarketing/) | Servicio de agencia especializado | Precio orientativo con compromiso y estrategia aparte |
| [TheFork Manager](https://www.theforkmanager.com/es/) | Reservas y marketing adyacente | No equivalente a producción creativa completa |
| [CoverManager](https://www.covermanager.com/es/) | Reservas y relación con clientes | No se usa como referencia de precio |
| [Higgsfield, documentación](https://docs.higgsfield.ai/docs/llms.txt) | Dependencia técnica y económica | La disponibilidad de API no equivale a todo el catálogo web |

## Límites y trabajo pendiente

La investigación documental está realizada. La validación primaria está diseñada, pero no ejecutada. Faltan: municipio o comarca, censo local, entrevistas, presupuestos comparables de proveedores locales, pagos del piloto y costes observados. No se afirma que haya clientes, alianzas, encuestas o resultados que todavía no existen.

No se ha escrito código del TFG ni contratado servicios, generado anuncios o contactado con negocios. El paquete puede incorporarse al trabajo académico como investigación secundaria y diseño de validación, manteniendo visibles estas limitaciones.

## Correcciones y contraste con el informe de viabilidad

### Correcciones hechas al integrarlo

| Problema del original | Corrección |
|---|---|
| Coste humano de 20 €/h, distinto del supuesto del repositorio (30 €/h) | Recalculado en 01 §9: el escenario a 199 € pasa de 114 € (57,3 %) a **89 € (44,7 %)** de contribución; a 149 € queda en 26,2 %, por debajo del umbral del 40 % de H6; con 5 h de operación la contribución es negativa. Alta: 90 € en lugar de 60 €; recuperación del CAC: 1,35 meses (2,36 con el alta) |
| Cifra del DIRCE (266.476 empresas de hostelería) | No se pudo confirmar en la nota de prensa del INE. Marcada como no verificada; extraerla de INEbase antes de citarla |
| Precios de Malou incompletos | Reverificados el 19/09: Essential 99 €, **Growth 120 €**, Full 151 € (el único con gestión de redes), 15 % menos con pago anual |
| Localo | La página no se pudo reabrir el 19/09; el precio queda como dato del original |
| Referencia al README del 16/09 | Anotado el cambio a Remotion y la API pública de Higgsfield (17-19/09) |
| 04 usaba 25 €/h | Recalculado a 30 €/h en 04 §5: la campaña de 299 € deja 119 € (39,8 %) en el caso contenido y 29 € (9,7 %) con exceso de trabajo; el máximo de entrega para un 40 % baja de 3,98 a **2,98 horas** |
| Horizon Creative | Reverificado: ofrece fotografía, vídeo y redes en Málaga; en su página no se confirmó el SEO local ni un enfoque en restaurantes |
| 04 se presenta como cambio de empresa | Nota al principio: es una recomendación comercial; los planes oficiales del TFG no cambian mientras Víctor no lo decida |

### Lo que el estudio cambia en la viabilidad

1. **El coste del plan 2 no incluye horas de revisión de producción.** El [informe de viabilidad §10.3](../Society_diseno_y_viabilidad.md) cuenta soporte y gestión asistida de Google y otros sitios, pero ninguna hora de revisar y aprobar el contenido. El estudio supone 2 h al mes por cliente. Sumadas a 30 €/h (+60 €), el coste del plan 2 pasa de 70-77 € a **130-137 €**, y el precio mínimo para un 40 % de margen, de 123-134 € a **228-239 €**. El dato decisivo es cuánto tiempo de revisión exige cada cliente, y solo se sabe midiéndolo en el piloto.
2. **El plan 1 compite mal en precio.** Su mínimo calculado (≈63 €) supera a Localo (39-49 USD) y queda cerca de Malou Essential (99 €), que ya incluye reseñas y SEO local. Refuerza la opción, ya pendiente en el README, de no lanzarlo en enero o de venderlo solo junto al plan 2.
3. **Malou Full (151-169 €) es la referencia de precio del plan 2**: incluye gestión de redes. Por encima de ese nivel, Society tiene que justificar el precio con contenido producido y fiel al local, no con la gestión.
4. **El MVP propuesto (8 piezas de feed y 8 historias en 4 semanas) no coincide con la cuota de ejemplo del plan 2** en la viabilidad (20 imágenes y 4 clips de historia). Antes de ofertar el piloto, fijar una sola cuota y recalcular su coste.
5. **Zona de validación: Málaga** (provincia), con Andalucía como expansión (04 §9). Falta concretar el núcleo donde empezar la captación activa.
