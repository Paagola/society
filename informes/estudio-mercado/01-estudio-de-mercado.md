<!-- society-document -->
> **Estado:** referencia. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

# Society · Estudio de mercado y estrategia de entrada

Fecha de investigación: 19 de septiembre de 2026. Ámbito: España, empezando por una zona local. Municipio o comarca pendiente de concretar. Estado: investigación documental y propuesta de validación; no se han realizado entrevistas, encuestas ni ventas para este estudio.

> **Revisión del 19/09/2026 al integrarlo en el repositorio.** Coste humano unificado a **30 €/h**, el supuesto del [informe de viabilidad](../Society_diseno_y_viabilidad.md) (el original usaba 20 €/h); cifra del DIRCE marcada como no verificada; precios de Malou reverificados. Detalle y contraste con la viabilidad en el [índice](README.md).

## 1. Resultado del estudio

Society tiene una oportunidad plausible como servicio de marketing asistido por software para pequeños negocios de hostelería. La oportunidad consiste en convertir información, fotografías y vídeos del negocio en una presencia comercial constante, con poco trabajo para el propietario. **La existencia de mercado no demuestra todavía que los clientes vayan a contratar Society ni que pueda atenderlos con margen.** Esas son las dos comprobaciones prioritarias.

La competencia ya ofrece marketing para restaurantes, gestión de reputación y creación con IA. Por tanto, «usar IA» o «tener Higgsfield» no bastan como diferenciación. Society deberá demostrar tres resultados conjuntamente: contenido fiel al establecimiento, reducción del tiempo de gestión y un servicio económicamente sostenible.

Recomendación: iniciar la validación en una zona accesible para Víctor, con establecimientos independientes, mediante entrevistas y un piloto de pago centrado en el núcleo del plan 2. Mantener los tres planes como arquitectura comercial prevista, pero probar primero una oferta acotada. No justificar el desarrollo completo de todas las integraciones por el tamaño nacional del sector.

## 2. Qué es Society y qué compra realmente el cliente

La referencia del producto es el README del TFG (versión del 16 de septiembre al redactar el estudio; desde el 17/09 el montaje es en Remotion y la API de Higgsfield ya es pública), junto con sus informes de flujo, viabilidad y estrategia. Society es una aplicación propia SaaS/PWA, todavía en definición, destinada a restaurantes, bares, cafeterías y gastrobares. El negocio paga; el comensal recibe información y contenido, pero no es el comprador de Society.

El cliente no necesita aprender a redactar instrucciones para modelos generativos. Aporta la información de su negocio, sus materiales y sus novedades; Society prepara una propuesta coherente, produce y revisa las piezas, facilita su aprobación y utiliza resultados para mejorar el siguiente ciclo.

### Recorrido previsto

1. Cuenta, selección de plan y contratación.
2. Información comercial confirmada: carta, precios, horarios, identidad y reglas del establecimiento.
3. Biblioteca organizada de fotografías y clips reales de platos y local.
4. Diagnóstico de presencia y contenidos anteriores; establecimiento de una línea de referencia.
5. Estrategia, calendario y muestras de estilo y voz.
6. Comunicación sencilla de novedades: un plato, un evento o una franja que interesa promocionar.
7. Producción y control de calidad; cuando falte un dato esencial, se detiene la pieza afectada para resolverlo.
8. Aprobación del lote terminado por el propietario y publicación asistida o mediante integración disponible.
9. Medición y ajuste del siguiente lote.

Este es el diseño previsto, no una lista de funcionalidades ya desarrolladas. Torre de Vega aporta aprendizaje de un caso práctico; no representa por sí solo la diversidad de la hostelería española.

### Oferta prevista y orden de validación

| Nivel | Función prevista | Implicación para el estudio |
|---|---|---|
| Plan 1 | Presencia en Google Business Profile, información, publicaciones y reseñas | Comparar con herramientas de SEO local y gestión manual; validar si el problema merece una cuota independiente |
| Plan 2 | Añade contenido social: posts, carruseles, historias y alcance de otras plataformas por concretar | Mejor candidato inicial para probar producción recurrente y ahorro de tiempo |
| Plan 3 | Añade reels | Validar aparte fidelidad, revisiones, coste y disposición a pagar |

Los planes son acumulativos. Nombres, precios, cuotas de producción y alcance definitivo siguen abiertos. El piloto propuesto no cambia esas decisiones: permite comprobarlas antes de automatizarlas.

## 3. Problema y comportamiento de compra

Las siguientes son hipótesis sobre el cliente, no resultados de entrevistas:

| Hipótesis de problema | Conducta que permitiría comprobarla | Consecuencia para Society |
|---|---|---|
| El propietario no mantiene una publicación regular por falta de tiempo | Muestra publicaciones pospuestas y explica quién las prepara y cuánto tarda | Entregar lotes listos para aprobar, con pocas decisiones |
| Tiene fotos, pero no consigue convertirlas en comunicación útil | Material disperso, ofertas sin publicar y ausencia de calendario | Organizar activos y unir contenido con una intención comercial |
| Desconfía del contenido artificial | Rechaza piezas que alteran platos, raciones, decoración o identidad | Comparación obligatoria con referencias reales |
| No sabe si su esfuerzo digital compensa | Mide seguidores, pero no consultas o acciones comerciales | Informe sencillo con acciones y límites de atribución |
| La agencia o la gestión propia no encajan | Gasto previo, presupuesto rechazado o tiempo personal documentado | Comparar coste total, trabajo restante y calidad, no solo suscripción |

El desencadenante de compra puede ser una apertura, cambio de carta, temporada baja, baja de quien llevaba las redes o insatisfacción con un proveedor. Debe registrarse cuál aparece realmente. «Me gusta la idea» no equivale a urgencia, presupuesto ni intención de cambiar.

**Trabajo que el cliente quiere resolver:** «Cuando estoy ocupado con el servicio, quiero que mi negocio mantenga una imagen actual, atractiva y fiel, sin tener que organizar cada publicación ni perder el control de lo que se dice».

## 4. Segmentación y primer cliente objetivo

El mercado final es amplio, pero la primera oferta debe ajustarse a un grupo reconocible.

| Segmento | Necesidad probable, por validar | Barrera | Prioridad inicial propuesta |
|---|---|---|---|
| Restaurante o gastrobar independiente, 1–3 locales | Mostrar oferta, novedades y personalidad de forma constante | Confianza, material y presupuesto | Alta si existe responsable accesible y contenido irregular |
| Cafetería con producto visual y novedades frecuentes | Mantener presencia y comunicar ocasiones de consumo | Ticket y presupuesto disponibles | Media-alta; comprobar economía propia |
| Bar tradicional con poca actividad digital | Información local y reputación | Baja prioridad percibida para contenido social | Explorar plan 1; no forzar reels |
| Negocio estacional o rural | Promoción por temporadas y visitas planificadas | Estacionalidad, desplazamientos y poca renovación de material | Piloto específico posterior |
| Grupo o cadena | Coordinación, permisos y consistencia entre locales | Venta larga e integraciones complejas | Baja en el primer lanzamiento |

Perfil inicial recomendado: propietario o gerente que decide el gasto, ya dispone de Google y alguna red social, reconoce un problema reciente, puede aportar material real y acepta una revisión semanal breve. La cifra de locales delimita el experimento; no es una restricción permanente del producto.

Evitar seleccionar solo conocidos entusiastas. Incluir negocios con distintas formas de trabajar y al menos algunos que no quieran contratar. El desacuerdo permite conocer qué segmento no merece perseguirse.

## 5. Mercado español: lo comprobado y sus límites

El estudio original cita **266.476 empresas de hostelería a 1 de enero de 2025** según el DIRCE. **Cifra no verificada:** la nota de prensa enlazada, consultada de nuevo el 19/09, no permitió confirmarla (devolvió 79.365 en una tabla por antigüedad cuya definición no quedó clara). Antes de citarla en la memoria, extraerla de las tablas de INEbase por actividad CNAE. Esta categoría incluye alojamiento y no equivale al número de restaurantes, bares y cafeterías ni al número de locales. Sirve para describir el entorno, pero no debe presentarse como el TAM exacto de Society. La nota se publicó en diciembre de 2025: el año de consulta no transforma el dato en un censo de 2026. [INE, DIRCE 2025](https://www.ine.es/dyngs/Prensa/DIRCE2025.htm).

Hostelería de España describe para 2025 un contexto de incertidumbre y una evolución desigual de facturación y rentabilidad. La lectura comercial para Society es que vender «más contenido» puede ser menos convincente que demostrar una utilidad concreta y un coste controlado. Esto es una inferencia estratégica, no evidencia de disposición a pagar por Society. [Hostelería de España, balance publicado en diciembre de 2025](https://www.hosteleriadigital.es/2025/12/16/la-hosteleria-finaliza-2025-con-un-aumento-de-la-facturacion-hasta-el-4-en-un-ano-marcado-por-la-incertidumbre/).

No se utiliza el gasto total en restauración como mercado de software, ni se trasladan porcentajes de digitalización de empresas de otros sectores a restaurantes. Tampoco se convierte automáticamente una reseña o un perfil de Instagram en un cliente potencial dispuesto a pagar.

### TAM, SAM y SOM sin falsa precisión

**TAM:** establecimientos españoles de restauración y bebidas compatibles con el producto × ingreso anual hipotético por local. Para cerrarlo, extraer del DIRCE los grupos de actividad pertinentes y sus unidades locales; excluir alojamiento y actividades no atendidas. La tabla de empresas permite orientar la clasificación, pero debe contrastarse con la de locales si se cobra por establecimiento. [INE, tabla por actividad](https://www.ine.es/jaxiT3/Tabla.htm?t=39372).

No se publica una cifra nacional monetaria cerrada porque aún no están fijados ni el universo exacto ni el precio. Esta limitación es preferible a presentar alojamiento o empresas multilocal como restaurantes individuales.

**SAM local:** establecimientos únicos dentro del perímetro elegido que cumplen criterios de actividad, necesidad, acceso al decisor y capacidad operativa de atención. Preparar un censo con fuentes municipales o autonómicas, directorios profesionales y comprobación individual. Deduplicar por local y agrupar cadenas para no contar cada ficha como un comprador independiente.

Ejemplo exclusivamente ilustrativo: 300 locales censados × 40% elegibles = 120 locales. A 199 €/mes, el valor anual hipotético sería 286.560 €. Ni los 300, ni el 40%, ni el precio proceden de observación local; no son una estimación del municipio del usuario.

**SOM:** clientes que se pueden captar y atender en un plazo definido. Escenario de seis meses: 20 contactos cualificados/mes × 50% de reuniones × 20% de cierres = 2 altas mensuales; 12 altas brutas, menos 1 baja hipotética = 11 clientes al final. A 199 €, serían 2.189 € de ingreso mensual recurrente al cierre y 26.268 € anualizados. Esa anualización no es la facturación de los seis meses, porque las altas llegan progresivamente.

Si solo se reservan 40 horas mensuales para operación y cada cliente consume 2 horas, el techo teórico es 20 clientes, antes de nuevas altas, incidencias y ventas. La capacidad real será menor. Revisar ese límite con tiempos registrados; no elegir un porcentaje arbitrario del mercado español.

### Cómo elegir la zona

Puntuar de 1 a 5 tres zonas candidatas: acceso a propietarios (30%), desplazamiento y soporte (25%), densidad de negocios adecuados (20%), diversidad para aprender (15%) y facilidad de conseguir material (10%). Elegir el perímetro más abordable, no necesariamente el más poblado. El municipio o comarca todavía no se ha concretado, por lo que no se presentan competidores locales ni censos inventados.

## 6. Competencia y sustitutos

Comparación documental de ofertas públicas, consultadas el 19 de septiembre de 2026. Las prestaciones son declaraciones de sus proveedores, no resultados de pruebas independientes. Que una función no aparezca aquí no significa que el competidor no la tenga.

| Alternativa | Qué resuelve y por qué importa | Precio público observado y cautelas |
|---|---|---|
| **Malou** | Competidor directo especializado en restauración: presencia local, reputación, contenido y gestión social; ofrece autoservicio y acompañamiento | Essential desde 99 €/local/mes (Google, SEO local, reseñas); Growth desde 120 € (contenido con IA para presencia local); **Full desde 151 € (añade gestión de redes)**; configurador muestra 169 €; 15 % menos con pago anual. Reverificado el 19/09. Full es el competidor directo del plan 2. Depende de configuración, tamaño y acompañamiento; confirmar oferta para España. [Fuente](https://www.malou.io/pricing-us) |
| **Localo** | Compite especialmente con el plan 1: presencia y posicionamiento local, reseñas y publicaciones | Single Business: 49 USD/mes en mensual, 39 USD/mes como equivalente anual, más impuestos según página (dato del original; la página no se pudo reabrir el 19/09). Está muy por debajo del precio mínimo calculado para el plan 1 (≈63 €). No convertir a euros ni confundir pago anual con mensual. [Fuente](https://localo.com/es/precios) |
| **Metricool** | Alternativa para quien prepara su contenido y necesita organizar publicación y análisis | Dispone de nivel gratuito y planes de pago; precio depende de modalidad y alcance. No equivale a producción gestionada. [Fuente](https://metricool.com/pricing/) |
| **Predis.ai** | Solapa generación de posts, carruseles y vídeo con planificación y publicación | Precio comparable pendiente de confirmar según créditos y plan; no se infiere de páginas antiguas. [Funciones](https://predis.ai/features/) y [tarifas](https://predis.ai/pricing/) |
| **SYM HostelGestión** | Sustituto de servicio: producción, fotografía y gestión para hostelería | Essentials: 799 €/mes con compromiso de 6 meses, 699 € con 12; precios orientativos sin IVA y estrategia inicial de 1.900 € aparte. Es un ejemplo concreto, no la media de las agencias españolas. [Fuente](https://symhostelgestion.com/servicios/gastromarketing/planes-precios-gastromarketing/) |
| **TheFork Manager / CoverManager** | Resuelven reservas y relación con clientes; compiten por presupuesto y pueden aportar rutas de conversión complementarias | No son equivalentes a toda la producción creativa de Society; valorar compatibilidad con lo que ya paga el local. [TheFork](https://www.theforkmanager.com/es/) · [CoverManager](https://www.covermanager.com/es/) |
| **Propietario, empleado o profesional independiente** | Solución existente cercana al negocio, con conocimiento real de platos y clientes | Medir horas, coste, regularidad y satisfacción en entrevistas; no asumir que es gratis ni que siempre funciona mal |
| **No cambiar nada** | Evita gasto y esfuerzo de adopción | Es el sustituto dominante cuando el problema no se considera urgente; comprobarlo, no descartarlo |

La entrada no debe basarse en «somos los únicos que hacemos marketing con IA para restaurantes». La defensa posible está en la calidad operativa: biblioteca de material autorizada, reglas particulares bien recogidas, historial de correcciones, facilidad de aprobación y prueba de resultados. Hoy son capacidades por construir, no una ventaja inexpugnable ya demostrada.

Antes de cerrar tarifas, solicitar —en una fase posterior autorizada de contacto— presupuestos comparables de tres proveedores de la zona: mismas piezas, fotografía, revisiones, publicación, permanencia y horas que debe dedicar el dueño. El estudio actual no ha contactado con ellos.

## 7. Higgsfield dentro de la propuesta de valor

Higgsfield es el proveedor de creación previsto, no el producto que se vende al hostelero. Society aporta contexto del negocio, selección de técnica, control de calidad, aprobación y aprendizaje. El propietario debe juzgar la pieza y el trabajo que le evita, no el nombre del modelo.

La investigación técnica previa diferencia herramientas del conector, interfaz web y API de producción. La API dispone de facturación y capacidades propias; no debe presupuestarse como uso ilimitado incluido en una suscripción web. Los costes de reintentos y de revisión afectan directamente al margen. [Documentación oficial de Higgsfield](https://docs.higgsfield.ai/docs/llms.txt).

Ad Adaptation/Ad Recreator sirve para estudiar una referencia publicitaria y adaptar su estructura a un producto real. Para Society puede ayudar a crear campañas puntuales con una oferta y llamada a la acción claras. No demuestra por sí mismo que el anuncio convierta mejor, ni sustituye las referencias reales del plato. El procedimiento y las limitaciones se documentaron en el [informe técnico previo](../higgsfield/03-ad-recreator-para-society.md).

Experimento recomendado, pendiente de ejecutar: comparar una pieza convencional basada en material real con una propuesta adaptada usando el mismo objetivo, oferta y formato. Medir aceptación, correcciones, tiempo, coste y señales comerciales. Con pocos locales, las diferencias de alcance no permiten afirmar causalidad ni superioridad general.

## 8. Posicionamiento, captación y venta

Propuesta que se debe probar: **«Tu restaurante, reconocible y activo en redes. Tú aportas las novedades y apruebas; Society prepara el contenido y te muestra qué está funcionando».**

No prometer reservas garantizadas, fidelidad automática ni ahorro concreto antes de medirlos. El beneficio principal puede variar: para un restaurante será tiempo; para otro, constancia; para un tercero, cuidar su imagen. La entrevista debe revelar cuál mueve una compra.

Primer canal: relación local con el decisor y demostración breve con material autorizado del establecimiento. Después, recomendaciones de clientes y colaboraciones con asociaciones o proveedores. La cuenta propia de Society será escaparate y canal educativo para hosteleros; sus seguidores no sustituyen ventas.

Secuencia propuesta: conversación sobre una dificultad reciente → diagnóstico breve → muestra autorizada → oferta con alcance, precio y revisiones → piloto pagado → revisión y renovación. Registrar el motivo de cada rechazo. No iniciar publicidad a escala hasta conocer conversión y margen.

## 9. Precio y economía por cliente

El modelo más coherente para probar es suscripción por establecimiento, con volumen y revisiones definidos. Una prueba limitada puede servir para mostrar calidad; un freemium permanente con generación abierta introduce coste variable antes de demostrar conversión. Los 5 €/mes del documento SmartNotes son parte del ejemplo educativo, no una referencia para Society.

Para el núcleo del plan 2, explorar ofertas de 149, 199 y 249 €/mes con el mismo alcance o con diferencias explícitas. Son hipótesis de investigación, no precios recomendados como definitivos. Con muestras pequeñas, registrar respuestas cualitativas y pagos; no presentar tres ofertas a unos pocos conocidos como una prueba estadística de elasticidad.

Escenario mensual de planificación a 199 €, sin IVA, enteramente hipotético:

| Concepto directo por cliente | Supuesto |
|---|---:|
| Generación y reintentos | 25 € |
| Revisión y operación: 2 h × 30 €/h | 60 € |
| Soporte: 0,5 h × 30 €/h | 15 € |
| Infraestructura y cobro imputables | 10 € |
| Coste directo | **110 €** |
| Contribución antes de costes fijos, captación e impuestos | **89 € / 44,7%** |

Si las horas de operación pasan de 2 a 5, el coste directo sube a 200 € y la contribución es negativa (−1 €). A 149 € y 2 horas, la contribución es de 39 € (26,2 %), por debajo del 40 % que exige la hipótesis H6. A 249 € y 2 horas, 139 € (55,8 %). La automatización aparente no compensa una operación manual oculta.

Registrar el alta aparte. Ejemplo: 3 horas × 30 € = 90 € de trabajo inicial; cobrarlo, recuperarlo con permanencia razonada o amortizarlo explícitamente. No eliminarlo del cálculo. La remuneración por hora es un supuesto económico, no una tarifa de mercado comprobada.

CAC = gasto de captación más valor de horas comerciales / nuevas cuentas pagadoras. Recuperación del CAC = CAC / contribución mensual por cuenta. Ejemplo: CAC 120 € y contribución 89 € implican 1,35 meses, sin incluir los 90 € de alta; incluyéndolos serían 2,36. No calcular un LTV fiable antes de observar renovaciones y bajas durante suficiente tiempo.

Plan 3 necesita un cálculo independiente por reel aprobado, incluyendo todos los intentos, edición y revisión. No financiar producción ilimitada con una cuota calculada solo a partir del coste del primer intento.

## 10. Riesgos y decisiones

| Riesgo | Evidencia que buscar | Respuesta propuesta |
|---|---|---|
| El problema no merece una cuota | Rechazos pese a entender la oferta | Cambiar segmento o centrarse en una necesidad más urgente |
| Demasiado esfuerzo inicial | Material pendiente y altas abandonadas | Simplificar el mínimo necesario; evaluar servicio de captura separado |
| Platos o datos inexactos | Rechazos y errores críticos | Revisar contra referencias; volver a fotografía y edición cuando convenga |
| Exceso de trabajo manual | Minutos y reintentos por lote | Limitar alcance, estandarizar y revisar precio antes de crecer |
| Dependencia de proveedores | Cambios de coste, catálogo o disponibilidad | Conservar originales y permitir técnicas alternativas |
| El cliente no percibe resultados | No renueva aunque apruebe contenido | Aclarar objetivo y medir acciones útiles, no solo impresiones |
| Demasiadas funciones para enero | Retrasos y validaciones abiertas | Priorizar el flujo completo de una oferta; tratar enero como hipótesis |

Fortalezas potenciales: especialización, contexto real y control del proceso. Debilidades actuales: producto sin desarrollar, poco histórico comercial y capacidad de una persona. Oportunidades: servicio cercano, constancia y simplificación. Amenazas: competidores especializados, herramientas genéricas, presión sobre presupuesto y fácil acceso de terceros a los mismos modelos.

## 11. Decisión propuesta

Avanzar con validación local de pago, no con una conclusión de demanda ya demostrada. La señal decisiva será que varios negocios independientes aporten material, publiquen, ahorren tiempo, renueven y puedan atenderse con margen. El [Lean Canvas](02-lean-canvas.md) resume las hipótesis y el [plan de validación](03-validacion-y-entrevistas.md) permite contrastarlas.
