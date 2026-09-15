# Base de conocimiento — Torre de Vega (caso real aplicado)

Esta carpeta reúne **todo lo producido de verdad** trabajando como agencia para Torre de Vega
"El Mora" — el restaurante que ya sirve de prueba de concepto real de Society (ver
[`caso-practico-01-torre-de-vega.md`](../caso-practico-01-torre-de-vega.md)). No es teoría: son las
reglas, plantillas, guiones, informes y pilotos técnicos que un cliente real ha aprobado, rechazado y
corregido a lo largo de varias semanas de producción.

**Por qué existe esta carpeta:** `idea.md` describe cómo *debería* funcionar Society. Esta carpeta
es la evidencia de **cómo funciona de verdad** cuando se ejecuta el flujo a mano, mes a mes, con un
cliente exigente — cada regla de aquí nació de un fallo real o una aprobación real, no de una
hipótesis. Es, literalmente, el conjunto de requisitos que Society tiene que poder reproducir para
sustituir este trabajo manual sin perder nivel.

**Origen:** todo el contenido de esta carpeta es copia de material vivo en
`C:\Users\victo\Documents\torre_de_vega\` (un proyecto de cliente aparte, gestionado con Claude Code
y el MCP de Higgsfield). Se ha traído aquí tal cual, sin reescribir, para que quede fijado como
snapshot de conocimiento aplicado — el proyecto original sigue evolucionando y puede ya decir cosas
distintas en el momento en que se lea esto.

| Sincronización | Qué entró |
|---|---|
| 2026-09-10 17:43 | Copia inicial |
| **2026-09-14** | 8 ficheros actualizados (`CLAUDE.md`, proceso del Reel 01, las dos reglas, la skill de AE, Reels 02 y 07, informe bullet) y 3 nuevos (Reel 08, informe de la carta web del 09-13, informe de procesos + AI Motion Designer del 09-14). Ver [«Qué cambió el 2026-09-14»](#qué-cambió-entre-el-2026-09-10-y-el-2026-09-14) |

---

## Cómo está organizada

| Carpeta | Qué contiene | Por qué importa para el TFG |
|---|---|---|
| [`00-proyecto/`](00-proyecto/) | `CLAUDE.md` (brief de marca + registro vivo de correcciones del cliente) y el proceso completo del primer Reel producido, con hallazgos medidos | Es el **contrato de producto** en su forma más cruda: qué no se puede romper nunca, y por qué. Cada regla dura de Society debería poder rastrearse hasta una línea de aquí. |
| [`01-reglas-contenido/`](01-reglas-contenido/) | `reglas_imagenes.md` y `reglas_videos.md` — el reglamento de contenido más maduro del proyecto, con más de 25 reglas numeradas, cada una con incidente, causa y forma de aplicarla | Es el equivalente a un **motor de reglas de negocio** que Society necesita por cliente (banco de preferencias/vetos persistentes, ya señalado como pieza crítica en `caso-practico-01`). Nótese que varias reglas se han **invertido** con el tiempo (ver regla 17 de `reglas_imagenes.md`, cambiada dos veces) — Society tiene que versionar reglas, no solo guardarlas. |
| [`02-metodologia-prompting-directoria-cloud/`](02-metodologia-prompting-directoria-cloud/) | El paquete completo `directoria-cloud`: system prompt, onboarding de 7 preguntas, perfil de cliente, 12 archivos de `knowledge/` (modelos, consistencia de personaje, hiperrealismo, troubleshooting, recetas de pipeline...) y las plantillas obligatorias de prompt (imagen y vídeo-motion) | Es la **capa de generación de prompts** ya resuelta y reutilizable — no es específica de Torre de Vega, es el "director de arte" que cualquier cliente de Society necesita detrás. Society puede tratarlo como el motor de prompts de su propio backend, con el perfil de cliente como los parámetros que cambian. |
| [`03-automatizacion-montaje-after-effects/`](03-automatizacion-montaje-after-effects/) | La skill completa de montaje en After Effects por MCP: conexión, trampas de la API, fórmula de recorte de clips, catálogo de transiciones, y el hallazgo medido de que **el montaje no mueve las métricas de viralidad titulares** | Es la automatización de la **Fase 8** de `idea.md` que sí está resuelta hoy (al contrario de lo que decía `caso-practico-01`, que la daba como hueco pendiente — este fichero demuestra que ya se cerró después). |
| [`04-guiones-reels-reales/`](04-guiones-reels-reales/) | Los guiones `.md` de cada Reel (8 Reels + historias; el 08 es el primero guionizado para AI Motion Designer), el informe de fuentes de plantillas y el script `buscar_plantillas.sh` | Son **casos de uso reales de principio a fin** — el mejor material para probar contra ellos cualquier prototipo de Society, y ejemplo directo del formato de entrega (`.md` ejecutable por una IA futura) que exige `CLAUDE.md` del proyecto. |
| [`05-informes-medidos/`](05-informes-medidos/) | Análisis de 90 días reales de Instagram, ranking de viralidad de plantillas, efecto medido del "bullet time" de Higgsfield, lectura de métricas del Reel 03, mapa de imágenes de la carta web (09-13), análisis de procesos + evaluación de AI Motion Designer (09-14), y un informe de deep research previo | Es la prueba de que las decisiones de producto se toman **con datos medidos**, no con intuición — el patrón que Society debería institucionalizar (puntuación de viralidad como parte del flujo, no como adorno). |
| [`07-carta-web-fotos-producto/`](07-carta-web-fotos-producto/) *(nuevo, 2026-09-14)* | Los 4 scripts de las fotos de producto de la carta web: `preparar_para_web.py` (corrige el punto blanco para `mix-blend-mode: multiply`), `recortar_alfa.py` y `recortar_fondo_oscuro.py` (recorte a alfa real para webs de fondo oscuro), `insertar_en_html.py` (inserta las imágenes en los bloques UAGB). La receta está en la regla 28 de `reglas_imagenes.md` y el estado en `05-informes-medidos/2026-09-13_carta-web_mapa-de-imagenes.md` | Un **segundo caso de uso distinto del Reel** con requisitos opuestos (fondo blanco puro, cenital, sin acabado dramático) y un hallazgo técnico reutilizable: **ningún recorte automático separa porcelana blanca de fondo blanco** (ni flood-fill, ni `isnet`, ni `remove_background` de Higgsfield). Society no puede dar por resuelto el recorte de producto. |
| [`06-piloto-3d-blender-higgsfield/`](06-piloto-3d-blender-higgsfield/) | El piloto **ya en marcha** de reconstrucción 3D del local en Blender: blockout trazado a partir del plano aéreo, cámaras de previsualización, addon de Blender↔Higgsfield ya diagnosticado, y el modelo `sam_3_3d` (1 crédito por objeto) para generar atrezzo 3D barato | **Esto es oro para el TFG**: es la validación práctica, hecha semanas antes de esta conversación, de exactamente la arquitectura discutida en `investigacion-calidad-profesional-reels-ia.md` §9 (Blender + Genjutsu). Ver el aviso más abajo. |

---

## El hallazgo más importante para el TFG: el piloto 3D ya existe, y ya tomó una decisión

Antes de diseñar la arquitectura de escaneo 3D (`investigacion-calidad-profesional-reels-ia.md`,
sección 9), conviene leer primero
[`06-piloto-3d-blender-higgsfield/PLAN_REEL_3D.md`](06-piloto-3d-blender-higgsfield/PLAN_REEL_3D.md):
el cliente ya pidió un "Reel en Blender con Higgsfield conectado" el 2026-09-09, y la decisión tomada
entonces fue **la previsualización (Vía A), no el render 3D final (Vía B)**:

- Se traza un **blockout** (bloques de volumen, sin acabado) del local a partir de un plano aéreo real
  y de las fotos de referencia — ya existe (`torre_de_vega_blockout.blend`, no incluido aquí por ser
  binario, pero documentado en `NOTAS_MODELO.md`).
- Se bloquean **los movimientos de cámara** dentro de ese blockout (recorrido, altura, focal, timing)
  con un script Python (`previz_recorrido.py`, sí incluido) — esto da un guion de cámara exacto.
- El plano final **no se renderiza desde el 3D**: se graba o se genera aparte para encajar con esos
  movimientos ya bloqueados.
- Se descartó explícitamente un Reel 3D renderizado como pieza final porque **rompe la regla 1** de
  continuidad (nada de lo que se vea en un render 3D texturizado existe físicamente en el local) — la
  única vía que no rompe esa regla es usar el 3D como planificación de cámara, no como imagen final.

**Esto matiza directamente la sección 9 de `investigacion-calidad-profesional-reels-ia.md`.** Esa
sección proponía pasar el render de Blender por Genjutsu para "foto-realizarlo" con
`hf_mult_motion_control`. El piloto real de Torre de Vega tomó una decisión más conservadora y ya
probada: **usar el 3D solo para fijar la cámara, nunca como imagen fuente**. Antes de dar por buena la
arquitectura con Genjutsu, hay que decidir con criterio cuál de las dos aproximaciones se lleva a
Society — o si conviven (previz para validar el guion de cámara barato, y Genjutsu como paso posterior
solo si la previz confirma que el movimiento merece generarse en vídeo).

También queda documentado ahí un hallazgo de infraestructura reutilizable para Society: el addon de
Blender de Higgsfield (`blender-mcp`) falló por **desajuste de versión entre el addon (1.0.0) y el
servidor que arrancaba `uvx` sin fijar (resolvía a 1.9.0)** — un tipo de fallo silencioso (conecta el
socket, nunca completa el saludo, se abandona a los 30s dejando procesos huérfanos) que vale la pena
tener en cuenta si Society acaba integrando Blender por MCP en vez de por script headless.

Y el dato de coste más directamente útil para el diseño de Society: **`sam_3_3d` (Meta) genera un GLB
texturizado por 1 crédito** — 18 veces más barato que Tripo y 30 que Meshy — para poblar atrezzo 3D
(platos, botellas, copas) a partir de una foto de producto recortada. Es la pieza que faltaba en la
sección 9 de la investigación para resolver objetos sueltos sin pasar por todo el pipeline de Gaussian
Splatting.

---

## Qué cambió entre el 2026-09-10 y el 2026-09-14

Cuatro cambios de fondo, cada uno con una lectura directa para el diseño de Society:

1. **Limpieza de 15 contradicciones internas** (detalle en
   [`05-informes-medidos/2026-09-14_procesos-reels_y_ai-motion-designer.md`](05-informes-medidos/2026-09-14_procesos-reels_y_ai-motion-designer.md) §1.4).
   Al invertirse una regla (la 17, iluminación) o prohibirse un modelo (`minimax_hailuo`, regla 15), la
   corrección se escribía en la regla nueva pero **no se propagaba** a la skill, a `documentación.md`, a
   `CLAUDE.md` ni a los guiones pendientes — que seguían recomendando lo prohibido. Es el argumento más
   fuerte hasta ahora para que Society guarde las reglas **como datos versionados con dependencias**
   (qué guion, plantilla o prompt usa cada regla) y no como texto repartido en ficheros: una regla que
   cambia tiene que poder marcar como obsoleto todo lo que depende de ella.
2. **Movimiento de cámara: nunca "handheld".** La documentación antigua recomendaba *handheld drift*
   como micro-movimiento; el cliente lo había rechazado («la cámara tiembla mucho y no es nada
   profesional»). Vigente: recorrido mecánico, lento, constante y cuantificado (*motorised slider with a
   geared head*, 3-15 %). Para un catálogo de movimientos parametrizados en Society, este es el valor por
   defecto correcto.
3. **Montaje: ya no es manual.** `caso-practico-01` lo daba como el mayor hueco; desde el 2026-09-08 se
   hace en After Effects por MCP y el cliente lo aprueba. El hueco se ha desplazado a los **gráficos**
   (rótulos, placas, texto que sale de detrás de un objeto), que siguen construyéndose operación a
   operación.
4. **AI Motion Designer de Higgsfield**, evaluado como segundo agente para esos gráficos: un agente que
   trabaja dentro de la composición abierta de After Effects vía un conector MCP propio
   (`bridge.higgsfield.ai/mcp`, OAuth, distinto del MCP de generación). Piloto guionizado en el
   [Reel 08](04-guiones-reels-reales/reel_08_volvemos_miercoles_16.md), aún sin ejecutar. Dos hallazgos
   de infraestructura que aplican a Society si integra plugins de terceros:
   - **El antivirus puede bloquear el plugin aunque su firma sea válida.** Avast mandó el instalador
     (`higgsfield-cep-1.0.55.msi`, firmado por Higgsfield Inc.) a cuarentena con una detección por
     reputación (`FileRepMalware`), sin aviso visible: el fichero simplemente desaparecía y el
     instalador fallaba con «fichero no encontrado» o `0x800700E1`. Restaurarlo de la cuarentena **no
     bastó**: Windows Installer copia el paquete a `C:\Windows\Installer\` y el antivirus bloquea esa
     copia nueva. Se resolvió pausando los escudos 10 minutos durante la instalación. Un onboarding de
     cliente real tiene que prever este caso y explicarlo, porque el síntoma no dice «antivirus» en
     ninguna parte.
   - **Dos agentes sobre el mismo proyecto de AE** (el MCP de montaje y Motion Designer) exigen turnos
     explícitos y guardado entre uno y otro.

---

## Cómo usar esta carpeta en el TFG

- **Como fuente de requisitos de producto**, en el mismo sentido que ya usa `caso-practico-01`: cada
  regla, cada informe y cada guion es un requisito real que Society tendría que poder automatizar o
  al menos representar en su modelo de datos (reglas por cliente, historial de aprobaciones, catálogo
  de plantillas de movimiento, banco de referencias reales).
- **Como banco de pruebas**, si en algún momento del TFG se construye o simula una parte del pipeline:
  los guiones de `04-guiones-reels-reales/` y las reglas de `01-reglas-contenido/` son casos reales
  contra los que contrastar cualquier prototipo, en vez de inventar casos de prueba sintéticos.
- **Como advertencia de que el conocimiento cambia**: varias reglas de aquí ya se han invertido una o
  dos veces (el ejemplo más claro es la regla 17 de iluminación, que pasó de "acabado de iPhone" a
  "look editorial dramático" el mismo día que se escribió esta carpeta). Si Society va a persistir
  reglas de cliente, **tiene que versionarlas con fecha e historial**, no sobrescribirlas — el propio
  `reglas_imagenes.md` ya hace esto a mano dejando el historial dentro del texto de la regla.

## Qué se ha dejado fuera a propósito

- **Las imágenes y vídeos generados** (`imagenes/generadas/`, `plantillas/`, los `.mp4`/`.glb`/`.png`
  de `torre_de_vega_3d/higgsfield_assets/`) — son binarios pesados y no aportan conocimiento textual;
  quedan en el proyecto original si hace falta consultarlos.
- **Los `.blend` del piloto 3D** (`torre_de_vega_blockout.blend` y su backup) — binarios de Blender, no
  legibles como texto; su contenido está descrito en `NOTAS_MODELO.md` y `PLAN_REEL_3D.md`.
- **Las skills genéricas del proyecto** (`instagram-skill-hosteleria/`, `canva-skill-diseno/`) — son
  conocimiento general de hostelería/diseño, no producto específico de trabajar con Torre de Vega; si
  hacen falta como referencia, están en `C:\Users\victo\Documents\torre_de_vega\`.
- **Los informes iniciales de auditoría de negocio** (`informes/00` a `08`: expediente digital, mapa
  competitivo, SEO/GEO, restricciones legales...) — son consultoría de posicionamiento de marca, no
  conocimiento de producción de contenido; quedan fuera del alcance de esta base de conocimiento
  centrada en Reels.
