<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../README.md).

# Encargo para GPT-6 Astra · Unificar el proyecto Society y diseñar su cerebro creativo-estratégico

Repositorio: `C:\Users\victo\PANGO\D.A.M\tfg` · 105 archivos, 12 MB, todo texto salvo un PDF.
Idioma de trabajo y de entrega: **español**. Los prompts de generación que escribas van en inglés.

---

## 0. Qué es esto en seis líneas

**Society** es un SaaS (TFG de DAM + producto real, venta prevista desde enero de 2027) que hace el
trabajo de una agencia de marketing para negocios de hostelería: genera contenido audiovisual a
partir del local real, lo organiza con estrategia, lo publica y mide para mejorar la siguiente pieza.
**Torre de Vega** es el restaurante donde el flujo se ejecutó a mano durante semanas: **no es el
producto**, es la evidencia. Sus reglas son preferencias de ese cliente y en Society viven como
reglas *por restaurante*, no como reglas del producto. No hay una sola línea de código todavía: esta
fase define producto, arquitectura y método.

---

## 1. Cómo leer el repositorio sin quemar presupuesto

Explora tú mismo el árbol (`README.md` raíz es el índice maestro; su §15 lista los documentos). Usa
estos tres niveles y **no leas entero lo que esté en nivel C**:

**Nivel A — leer completo (≈3.600 líneas). Son la fuente de verdad:**

| Archivo | Líneas | Qué es |
|---|---|---|
| `README.md` | 381 | Referencia principal: producto, planes, arquitectura, decisiones, índice de documentos |
| `base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_imagenes.md` | ~900 | 28 reglas de imagen, cada una con incidente → causa → forma de aplicarla |
| `base-conocimiento-torre-de-vega/01-reglas-contenido/reglas_videos.md` | ~680 | 18 reglas de vídeo + checklist de publicación |
| `informes/Society_flujo_de_la_aplicacion.md` | 412 | El recorrido del alta al ciclo semanal, funcionalidad por funcionalidad |
| `informes/higgsfield/02-api-y-arquitectura.md` | 175 | API REST de Higgsfield y diseño del orquestador de trabajos |
| `informes/higgsfield/03-ad-recreator-para-society.md` | 196 | Método «inspírame en este reel» (10+5+8 apartados) y Hook Multiplier |
| `informes/higgsfield/04-protocolo-para-ia.md` | 145 | Cómo descubrir, elegir y verificar capacidades nuevas del proveedor |
| `pruebas/analizador-video-referencia/2026-09-22_ensayo-v3-referencia-pasta-negra.md` | ~200 | Ensayo real: pila propia frente al método Ad Recreator, con costes y tiempos medidos |
| `pruebas/analizador-video-referencia/2026-09-22b_ensayo-v3-con-herramientas-higgsfield.md` | ~150 | Ensayo real con las herramientas de Higgsfield: límites, fallos y números |
| `investigacion-calidad-profesional-reels-ia.md` | 527 | Por qué el vídeo IA no llega a nivel agencia y qué arquitecturas cierran ese hueco |
| `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/SYSTEM_PROMPT.md` | 206 | El «director de arte»: motor de prompts reutilizable, no específico de Torre de Vega |

**Nivel B — leer índices y tablas, y entrar solo donde haga falta:**
`base-conocimiento-torre-de-vega/README.md` (154; explica qué hay en cada carpeta 00–09) ·
`informes/Society_diseno_y_viabilidad.md` (753) ·
`informes/Society_estrategia_redes_y_retroalimentacion.md` (846) ·
`informes/Society_auditoria_estrategica_y_mejoras.md` (556) ·
`informes/Society_inventario_documental.md` (395; una ficha por archivo — úsalo como atajo al
contenido de lo que no leas) · `informes/estudio-mercado/` (5 archivos) ·
`base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/knowledge/` (12 archivos,
~3.300 líneas: modelos de imagen y de vídeo, consistencia de personaje, biblia de hiperrealismo,
dirección de movimiento, troubleshooting, recetas de pipeline, bullet-time, FPV) ·
`base-conocimiento-torre-de-vega/05-informes-medidos/` (7 informes con métricas reales de Instagram).

**Nivel C — no leer salvo que una conclusión dependa de ello.** Son registros históricos: los 12
guiones de `04-guiones-reels-reales/`, `00-proyecto/documentacion-proceso-reel01.md`,
`08-reel-chuleton-*/`, `09-reel-volvemos-a-abrir-*/` (1.000 líneas), los pilotos `06-` y `07-`, los
scripts `.py` / `.sh` / `.tsx`, y `informes/Society_diseno_y_viabilidad.pdf` (versión vieja del `.md`
homónimo: ignóralo, no lo abras).

> **Regla de presupuesto:** la fase 1 es trabajo de bajo esfuerzo cognitivo; resuélvela con lecturas
> dirigidas y no le dediques razonamiento profundo. El grueso va a las **fases 2, 3 y 4**, que son
> donde este encargo gana valor: la automatización de producción, la dirección visual y el cerebro
> estratégico. Si tienes que sacrificar algo, sacrifica exhaustividad en la limpieza, nunca en esas
> tres.

---

## 2. Hechos ya establecidos — no vuelvas a derivarlos

1. **La regla de «no pueden salir personas» está derogada.** El cambio ya está aplicado en
   `reglas_imagenes.md` (reglas 2 y 18), `reglas_videos.md` (regla compartida 2 y checklist) y
   `00-proyecto/CLAUDE.md`. Política vigente:
   - **Las personas salen, con cara, sin restricción de marca.**
   - Si la persona es **protagonista** (habla a cámara, presenta el plato, protagoniza el gesto, o
     repite entre planos o entre piezas) → **ficha de personaje aprobada antes de generar nada**:
     rasgos fijos redactados en inglés, vestuario canónico, imagen maestra cuyo `job_id` se reutiliza
     como referencia en cada plano, plano de presentación y límites de registro.
   - Si son **personas de fondo** → ningún requisito adicional.
   - Únicos matices legales: un empleado real identificable necesita su consentimiento, y nunca se
     replica a la persona que aparece en un vídeo ajeno usado como plantilla.

   **Tu trabajo es propagar esta política, no rediscutirla.** Quedan restos contradictorios en
   `04-guiones-reels-reales/proceso-reel-vinos-blancos.md`, `reel_02_mesa_que_se_llena.md`,
   `reel_08_volvemos_miercoles_16.md` y `00-proyecto/documentacion-proceso-reel01.md`. Distingue
   *registro histórico* (se marca como histórico, no se reescribe) de *instrucción activa* (se
   corrige).

2. **Incoherencias ya detectadas, para que no gastes presupuesto encontrándolas:**
   - `prompts/higgsfield-bocetos-app-society.md` enlaza a `society-aplicacion-tfg/`, **carpeta que ya
     no existe** en el repositorio.
   - `README.md` §7 y §15, `informes/Society_flujo_de_la_aplicacion.md` §1.1 e
     `informes/Society_diseno_y_viabilidad.md` remiten a `diagramas/` (16 diagramas) — **tampoco
     existe**. Decide: recuperar, regenerar o retirar la referencia.
   - `00-proyecto/CLAUDE.md` enlaza `imagenes/reglas_imagenes.md`; la ruta real en este repositorio
     es `01-reglas-contenido/reglas_imagenes.md`.
   - `minimax_hailuo` está vetado (regla 15 de vídeo), pero los guiones `reel_05` y `reel_06` y la
     regla 14 todavía lo proponen o calculan costes con él.
   - El montaje migró de After Effects a **Remotion** el 17/09, pero
     `03-automatizacion-montaje-after-effects/` sigue redactado como si AE fuera el camino vigente.
   - Conviven tres capas de fechas («última actualización» 19/09; hoy es posterior) y documentos que
     se contradicen sobre qué está decidido y qué sigue pendiente.

3. **Resultados medidos el 22/09/2026 contra las herramientas reales.** Están documentados en
   [`pruebas/analizador-video-referencia/2026-09-22_ensayo-v3-referencia-pasta-negra.md`](../pruebas/analizador-video-referencia/2026-09-22_ensayo-v3-referencia-pasta-negra.md)
   y [`…/2026-09-22b_ensayo-v3-con-herramientas-higgsfield.md`](../pruebas/analizador-video-referencia/2026-09-22b_ensayo-v3-con-herramientas-higgsfield.md).
   **Dalos por ciertos y no los repitas:**

   - **La API REST y el MCP no ofrecen lo mismo, y la diferencia decide la arquitectura.** El
     OpenAPI público (`api.higgsfield.ai`, v2.0.0, comprobado el 22/09) tiene **ocho rutas**: Soul
     standard, Kling 2.5-turbo (pro y standard), Hailuo 2.3, más `status` y `cancel`. **No hay
     Seedance, ni Kling 3.0, ni `nano_banana_pro`.** El MCP (`mcp.higgsfield.ai/mcp`) sí los tiene:
     `seedance_2_5` con `mode: omni_reference`, 1080p, 4–30 s y roles `start_image` / `end_image` /
     `image_references` / `video_references` / `audio_references`, más modos `video_edit` y
     `video_extension` sin documentar en el repositorio. También `flux_3_video` (multi-frame, 1080p,
     5–20 s, audio sincronizado) y `minimax_h3` (2K con keyframes y referencias).
     **Conclusión: la capacidad que Society necesita existe, pero no en la superficie REST.**
   - **El Virality Predictor tiene un techo de 16 segundos** («Video must be 16 seconds or shorter»),
     no documentado. Devuelve `hook_score`, `sustain`, `peak_second`, `overall_score` y proxies por
     región. Cuesta 0 créditos y tardó ~40 s. La regla 3 de `reglas_videos.md` ordena pasar todo Reel
     por él: es inaplicable para piezas de más de 16 s y hay que corregirla.
   - **`video_analysis_*` no es fiable hoy.** Dos trabajos lanzados el 22/09 quedaron **colgados en
     `queued`** con `updated_at` idéntico a `created_at`; en el historial de la cuenta hay otro en
     `in_progress` desde el 09/09. Los que completan tardan ~20 s. No hay `fail_reason` ni timeout:
     **no transitan a un estado terminal**.
   - **El contrato de Ad Recreator es estable en el método y volátil en la fontanería.** Entre el
     19/09 y el 22/09 los 10 + 5 + 8 apartados no cambiaron ni una palabra, pero sí las herramientas:
     `models_get` → `models_explore action:"get"`, y todo el bloque de subida pasó de ser específico
     de ChatGPT a `media_upload_widget` / `media_import_url`.
   - **Copiar cortes en vez de beats cuesta del orden de 1,7–1,9 veces más.** Medido sobre la
     referencia del ensayo: 35 cortes detectados frente a 7 beats narrativos.
   - **⚠️ Los precios caducan en días, y esto invalida el modelo de viabilidad.** Seedance 2.5 a
     1080p costaba **9,0 cr/s el 16/09** (tres cobros reales) y cuesta **12,0 cr/s el 22/09**
     (`get_cost` en vivo): **+33 % en seis días**. Kling 3.0 pro pasó de 5,25 a 6 cr por clip de 3 s.
     El informe de viabilidad y **todos los precios de plan están calculados sobre 9 cr/s**:
     hay que rehacerlos, y hay que rehacerlos leyendo la tarifa, no guardándola. Referencias útiles
     medidas el 22/09: 1080p = 12,0 cr/s · 720p = 7,0 cr/s · Kling 3.0 pro = 2,0 cr/s ·
     `marketing_studio_v2_costs` publica una tarifa estable (`reference_to_video` = 38 + 4,96/s) que
     **no** subió. Usa siempre `get_cost` como preflight: es gratis y no envía el trabajo.
   - **La pila propia de análisis (ffmpeg + visión) tardó 4,8 s y costó 0 USD**, y da precisión de
     milisegundo que Higgsfield no da (timestamps al segundo). A cambio, no predice el gancho.

4. **Errores de método ya cometidos y documentados — no los repitas.** Están en
   [`pruebas/2026-09-22c_errores-a-no-repetir.md`](../pruebas/2026-09-22c_errores-a-no-repetir.md),
   con el coste de cada uno. En corto: se produjeron dos piezas el 22/09 gastando ~480 créditos y
   **el cliente rechazó las dos**. Las siete causas:
   1. Saltarse la puerta de aprobación de keyframes (regla 1 de vídeo), dos veces.
   2. No usar las plantillas de `directoria-cloud`, que las reglas 23 y 11 declaran obligatorias.
   3. Anclar `omni_reference` a fotos malas: el modelo hereda su calidad fotográfica y la
      instrucción de look pierde siempre contra la imagen de referencia.
   4. Corregir defectos con negativos genéricos en vez de nombrarlos literalmente.
   5. **Confundir medición de proceso con calidad percibida** — el error de fondo: se reportaron
      LUFS, suelo de negro y puntuaciones como si fueran prueba de que la pieza era buena.
   6. No fijar con el cliente qué significa «profesional» antes de gastar.
   7. Entregar lo contrario de lo pedido y justificarlo en vez de preguntar.

   **Society debe convertir 1, 2 y 4 en puertas de estado y validaciones de esquema**, no en
   recomendaciones: sin `keyframes_aprobados = true` no hay llamada de vídeo; un prompt que no
   valide contra el JSON Decoded Brief no se envía; y cada defecto observado alimenta un banco de
   negativos literales por restaurante.

5. **No ejecutes generaciones de pago sin autorización explícita de Víctor.** El análisis y el
   catálogo son gratis; generar imagen o vídeo, no. Si algo exige saldo, déjalo escrito como prueba
   pendiente con su coste estimado.

---

## 3. Fase 1 — Continuidad y reorganización *(esfuerzo bajo, resultado obligatorio)*

**Objetivo:** que cualquiera que abra el repositorio entienda la idea sin tropezar con versiones
antiguas, rutas rotas ni dos documentos que dicen lo contrario.

Entrega:

1. **`informes/2026-XX-XX_auditoria-de-continuidad.md`** — una tabla: archivo · qué afirma · con qué
   choca · veredicto (vigente / obsoleto / histórico / duplicado) · acción. Incluye una **jerarquía
   de autoridad** explícita (qué documento manda cuando dos se contradicen) y un criterio único de
   fechas y de estado.
2. **Reorganización ejecutada**, no solo propuesta: mueve, fusiona y archiva. Lo obsoleto no se
   borra, se traslada a `archivo/` con una línea que diga por qué dejó de estar vigente. Corrige
   todos los enlaces rotos. Deja el `README.md` raíz como único índice válido.
3. **Un patrón común de documento** (encabezado, estado, fecha, fuentes, a quién obliga) aplicado a
   todo lo que quede vivo, para que el conjunto se lea como un solo proyecto y no como quince
   sesiones distintas.

---

## 4. Fase 2 — La automatización de producción de Reels *(esfuerzo alto — es el corazón del encargo)*

**Un Reel es el anuncio de las redes sociales.** Esta fase no es «documentar la API de Higgsfield»:
es diseñar la **automatización que produce Reels de calidad de agencia de forma repetible**, sabiendo
ya —por los ensayos del 22/09— que apoyarla solo en la API REST no funciona.

### 4.1 El problema que tienes que resolver

La API REST ofrece ocho rutas y ninguna sirve para lo que Society hace (ver hecho establecido n.º 3).
La capacidad real vive en el MCP, que es una superficie **conversacional, sin contrato versionado,
que cambia de un día para otro y cuyos trabajos a veces no terminan nunca**. Una automatización seria
no puede tratar eso como «una llamada a la API».

Diseña el sistema partiendo de esa realidad, no de la que nos gustaría. Las piezas que tiene que
tener, como mínimo:

1. **Registro de capacidades, no de endpoints.** Society no llama a `seedance_2_5`: pide *«vídeo de
   4–10 s, 1080p, anclado a estas referencias de imagen»* y el registro decide qué proveedor y qué
   modo lo cumple hoy. Cada entrada lleva proveedor, transporte (REST / MCP / fal), modo, parámetros,
   coste por segundo, **fecha de última verificación** y quién la verificó. Un nombre de herramienta
   codificado a fuego es deuda: `models_get` sobrevivió tres días.
2. **Descubrimiento y revalidación periódicos.** Define cada cuánto se revalida el registro, cómo se
   detecta que un modelo cambió de nombre, resolución o precio, y qué pasa con las piezas en vuelo
   cuando eso ocurre. Recuerda el aprendizaje del Reel 09: **el modelo pedido no siempre es el
   servido** (`nano_banana_pro` devolvió `nano_banana_2`); hay que registrar el modelo **devuelto**.
3. **Plazos propios y estados terminales de negocio.** Medido: hay trabajos que se quedan en `queued`
   para siempre, sin `fail_reason`. Define el plazo máximo por etapa, qué hace el sistema al
   vencerlo (reintentar, degradar a otro proveedor, o marcar la pieza como bloqueada y avisar a una
   persona) y cómo se concilia si el proveedor responde tarde y ya se había dado por perdido. **Un
   trabajo sin estado terminal es peor que un fallo.**
4. **Cadena de degradación explícita.** Para cada capacidad, el orden de preferencia y qué se pierde
   al bajar un escalón (calidad, resolución, coste, consistencia). Si Seedance por MCP no está,
   ¿fal? ¿Otro modelo? ¿Se aplaza la pieza? Que lo decida una regla escrita, no el azar.
5. **Presupuesto por pieza, aplicado antes de generar.** Con estimación previa, tope duro y registro
   de lo gastado frente a lo estimado. Sin esto, un bucle de reintentos se come el margen del plan.

### 4.2 La cadena de producción, paso a paso

Detállala de principio a fin —«el usuario pide una pieza» hasta «el Reel está aprobado y
publicado»— diciendo en cada paso qué es propio, qué es del proveedor, qué cuesta y qué lo bloquea:

1. **Análisis de la referencia.** Capa medida propia (cortes, cámara, audio, rótulos) **más** el
   etiquetado persuasivo. Los ensayos demuestran que son complementarias: la propia da precisión de
   milisegundo y disponibilidad garantizada a coste cero; Higgsfield da la función de cada escena
   pero con timestamps al segundo y sin fiabilidad hoy. Di cómo se combinan y qué pasa cuando la
   segunda no responde.
2. **Interpretación: de cortes a beats.** Paso obligatorio y separado. Copiar los 35 cortes en vez de
   producir los 7 beats cuesta **1,9 veces más**. Especifica cómo se decide el número de beats, quién
   lo valida y cómo se impide que un plan de producción pida un plano por corte.
3. **Guion y decisiones de transferencia**, con lo observado separado de la hipótesis.
4. **Anclaje a lo real**: fotos del local, catálogo de platos, uniforme, y **ficha de personaje** si
   hay protagonista (reglas 2 y 18). Sin esto el sistema adapta bien la estructura e inventa el local.
5. **Generación**, por lotes cuando proceda, con multitoma donde ahorre segundos.
6. **Verificación automática**: qué se comprueba sobre el archivo final (duración medida, número de
   beats, momento de revelación, continuidad, decodificación, audio completo, legibilidad de
   rótulos). Distingue lo verificable por máquina de lo que exige ojo humano.
7. **Puerta de calidad con el Virality Predictor**, declarando su techo de 16 s: qué se puntúa, qué
   umbral obliga a iterar y qué se hace con una pieza de 25 s. Es gratis y tarda ~40 s, así que cabe
   en el ciclo.
8. **Montaje en Remotion** con la lista de edición como props JSON.
9. **Publicación y medición**, cerrando el ciclo hacia la fase 4.

### 4.3 Lo que debe quedar decidido

- **La frontera de estados**: los del proveedor frente a los de negocio (pendiente de revisión,
  rechazada por fidelidad, aprobada, archivada, bloqueada por proveedor). «Generación terminada» ≠
  «pieza aprobada».
- **El linaje del activo**: imagen maestra de personaje, fotos reales, plano generado, clip, montaje.
  Qué identificadores se persisten, dónde, y cómo se reconstruye la trazabilidad de un Reel publicado.
- **La equivalencia de crédito**, hoy contradictoria en el repositorio: 0,050 USD/crédito en el
  informe de viabilidad frente a 0,063 USD/crédito en la tarifa de la API. Son un 25 % de diferencia
  y los precios de los planes salen de ahí. Resuélvelo con `get_cost` o con una factura real.
- **Cuántas puertas humanas** hay y dónde. Es lo que separa a Society de usar Ad Recreator a mano:
  allí hay una persona ocupada de principio a fin; aquí solo en las puertas. Justifica cada una.
- **Qué sigue sin verificar**, marcado como tal. No inventes cabeceras, firmas ni endpoints.

### 4.4 Entrega

**`informes/higgsfield/05-automatizacion-de-produccion.md`**, con la cadena completa, el registro de
capacidades como tabla lista para ser modelo de datos, la máquina de estados, las cadenas de
degradación y el coste por pieza con sus supuestos. Verifica en fuente primaria
(`docs.higgsfield.ai`, `open.higgsfield.ai/explore`, la ficha de cada modelo) y **fecha cada
comprobación**, porque este catálogo caduca en días.

Sustituye a `informes/higgsfield/02-api-y-arquitectura.md` en lo que quede desfasado; conserva de él
lo que sigue siendo válido (autenticación `Authorization: Key ID:SECRET`, ciclo de estados REST,
polling 2→10 s, webhook `hf_webhook` sin firma documentada, saldo en USD aparte, retención ≥7 días) y
di explícitamente qué de aquel informe queda derogado.

---

## 5. Fase 3 — Método para vídeos modernos, con consistencia de estudio *(esfuerzo alto)*

**El problema real:** las piezas se producen plano a plano y se nota que las hizo una IA, no un
estudio. Un estudio fija la dirección de arte *antes* de disparar, no después.

Investiga y diseña un método apoyado en **https://higgsfield.ai/canvas** —entra y entiende qué hace
de verdad: cómo compone, qué admite como referencia, si permite fijar look, personaje y espacio entre
piezas, y si es accesible por API o solo por interfaz, porque esto último es decisivo para Society— y
en lo ya medido en `05-informes-medidos/` y `investigacion-calidad-profesional-reels-ia.md`.

Entrega **`informes/Society_metodo_direccion_visual.md`** con:

1. **La biblia visual del cliente**: qué se fija antes de producir nada —paleta, temperatura de luz,
   focales, altura de cámara, grano, grado de color, tipografía y rótulos, ritmo de corte— y cómo se
   guarda para que Society la reaplique sola en cada pieza del mismo restaurante.
2. **Casting y ficha de personaje** como pieza de producto, no como regla de un cliente: cómo se
   crea, se aprueba, se versiona y se reutiliza un personaje a lo largo de meses de contenido.
   Conecta con la regla 18 de `reglas_imagenes.md`.
3. **Consistencia entre planos y entre piezas**: encadenado de referencias, `start_image` /
   `end_image`, multitoma, reanclado cuando el modelo deriva. Di qué funciona ya aquí y qué no.
4. **Qué separa hoy una pieza «de IA» de una «de estudio»**, con ejemplos concretos y verificables,
   no adjetivos. Si una técnica no la has verificado, márcala.
5. **Cómo encaja Canvas** (o su equivalente) en el pipeline de Society: en qué fase entra, qué
   sustituye, qué cuesta y qué plan B hay si no expone API.

---

## 6. Fase 4 — El cerebro estratégico: que el sistema piense, no solo produzca *(esfuerzo alto)*

**El objetivo:** que cada vídeo tenga un propósito medible —traer clientes reales, lanzar un plato,
crear una pieza curiosa que se comparta— y que el sistema **planifique, ejecute, mida y replanifique
solo**, mejorando ciclo a ciclo. No un generador de vídeos: un director de marketing.

Busca **repositorios de GitHub y material de valor real** (licencia comprobada, actividad reciente;
no proyectos abandonados ni listas de enlaces) sobre: orquestación de agentes con planificación y
memoria, sistemas de objetivos y métricas, motores de reglas por cliente, bandits o experimentación
A/B aplicados a contenido, bibliotecas de ganchos y formatos, pipelines de publicación y escucha
social. Contrasta cada hallazgo con lo que este proyecto **ya ha medido** en `05-informes-medidos/`:
hay datos reales de 90 días de Instagram, un ranking de plantillas por viralidad y la lectura de
métricas por Reel. Lo medido gana a lo que prometa un repositorio.

Entrega **`informes/Society_cerebro_estrategico.md`** con:

1. **De qué se alimenta la estrategia**: qué sabe el sistema del negocio, de su competencia, de su
   calendario (temporada, festivos, novedades de carta) y de su rendimiento pasado.
2. **Cómo decide cada pieza**: de objetivo de negocio → pilar de contenido → formato → gancho →
   guion → plano. Que cada vídeo pueda justificar por qué existe.
3. **El bucle de aprendizaje**: qué métrica cierra el ciclo, cuántas piezas hacen falta para que una
   señal sea fiable, y cómo se evita perseguir ruido.
4. **Tabla de recursos**: repositorio o fuente · licencia · actividad · qué aporta exactamente · cómo
   se adapta aquí · qué descartar. Sé selectivo: diez recursos bien explicados valen más que cuarenta
   enlaces.
5. **Qué de todo esto cabe en el TFG antes de enero de 2027** y qué es hoja de ruta posterior.

---

## 7. Reglas de trabajo

- **Verifica en fuente primaria** lo que afirmes sobre precios, endpoints, licencias o capacidades, y
  fecha cada comprobación. Lo que no hayas podido verificar, márcalo explícitamente como no
  verificado en lugar de omitirlo o suavizarlo.
- **No inventes.** Si un dato no está, dilo. Vale más un hueco señalado que un relleno.
- **Español, prosa clara, sin relleno.** Tablas cuando comparan; prosa cuando razonan.
- **Society es el producto; Torre de Vega es la evidencia.** Cuando extraigas una regla del caso
  práctico, di si es regla del producto o preferencia de ese cliente.
- **Entrega trabajo ejecutado, no propuestas.** La fase 1 mueve archivos de verdad; las fases 2–4
  dejan documentos escritos en las rutas indicadas.
- Al terminar, actualiza `README.md` §15 y §16 para que reflejen el repositorio resultante, y deja un
  resumen de una página con lo que cambiaste, lo que descartaste y lo que queda abierto.
