<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Caso práctico 01 — Torre de Vega (Reel "carne")

**Fecha del proceso:** 2026-09-07
**Origen:** ejecución real con `directoria-cloud`, sobre el cliente Torre de Vega, siguiendo sus reglas de imágenes/vídeos.

## 1. Qué es este documento

Este no es un caso hipotético: es el registro de la **primera vez que el flujo descrito en `idea.md` se ha ejecutado de principio a fin**, aunque de forma manual (orquestado paso a paso vía MCP de Higgsfield, sin ninguna interfaz de Society todavía). Sirve como **prueba de concepto** del producto y como fuente de requisitos reales: cada fricción encontrada aquí es una decisión de diseño para Society.

## 2. Mapeo del proceso real a las fases de Society

| Fase en `idea.md` | Qué pasó en este caso real |
|---|---|
| Fase 3 — Biblioteca de referencias | El cliente aportó `carne.mp4` como vídeo de inspiración (no una plantilla generada por Society) |
| Fase 3 (extensión) — Escala de viralización | `virality_predictor` sobre el vídeo de referencia → hook 25, overall 41, sustain 95 |
| Fase 4 — Análisis del Reel de referencia | `video_analysis_create` / `video_analysis_status` → 11 escenas desglosadas (encuadre, movimiento, timestamps) |
| Fase 5 — Predicción de viralidad | Mismo resultado de `virality_predictor`, reutilizado para decidir **qué copiar** de la plantilla (ritmo) y **qué no** (el hook) |
| Fase 6 — Propuesta de guiones | Un guion inicial de 7 escenas → iterado con el cliente hasta 6 escenas + cierre en loop |
| Fase 7 — Imágenes de plantilla | `generate_image_batch` ancladas a fotos reales del local; 4 rondas de corrección con el cliente |
| Fase 8 — Producción del vídeo final | `generate_video_batch` (Kling 3.0) animando cada imagen aprobada; descarga de clips |
| *(fuera del flujo actual)* | Montaje final hecho por el cliente en **CapCut**, no por el sistema |

Esto confirma que la secuencia de fases de `idea.md` es correcta a nivel conceptual. Lo que este caso aporta es el **detalle de lo que hace falta automatizar dentro de cada fase**.

## 3. Pipeline técnico condensado

```
Vídeo de referencia
   └─ media_upload → PUT a S3 → media_confirm
        ├─ video_analysis_create → video_analysis_status (poll) ─────► desglose de escenas
        └─ virality_predictor (create) → job_status (poll) ──────────► scores de viralidad

Desglose + scores + fotos reales del local
   └─ guion propuesto (iterado con cliente)
        └─ generate_image_batch (nano_banana_pro, ancladas a fotos reales) ──► imágenes fijas
             └─ corrección iterativa con el cliente (regenerar por escena)
                  └─ generate_video_batch (kling3_0, start_image = job_id de la imagen aprobada) ──► clips
                       └─ descarga de result_url ──► montaje manual (CapCut, fuera del sistema)
```

## 4. Hallazgos clave

- **El hook de la plantilla no es lo que hay que copiar.** El vídeo de referencia tenía un hook débil (25/100) pero un sustain altísimo (95/100). La decisión de producto correcta no fue "clonar el vídeo", sino **separar qué parte de la plantilla es el ritmo de montaje (bueno, se copia) y qué parte es el arranque (malo, se corrige)**. Este es el tipo de criterio que en la idea original recae en "el sistema"; en la práctica requirió interpretación experta del resultado numérico, no solo mostrar los scores en bruto.
- **Todo se ancla a fotos reales, en cada paso, no solo al principio.** No basta con el vídeo de onboarding del local (Fase 1). Cada imagen generada necesita sus propias referencias reales específicas (mantel, vajilla, silla, fondo) o el sistema "alucina" elementos (mantel distinto, fondo inventado, mesa sin patas). Esto valida la idea de un **banco de fotos reales categorizado** (Fase 2) como pieza crítica, no accesoria — y sugiere que necesita ser granular por objeto (mantel, vajilla, mobiliario), no solo por plato.
- **El cliente tiene memoria de proyectos anteriores que el sistema debe respetar.** Una corrección se debió a que el plano generado (acción de cortar con cuchillo) ya había sido rechazado por el cliente en un proyecto previo, y esa regla estaba documentada en `reglas_imagenes.md`. Esto apunta a que Society necesita **preferencias/vetos persistentes por cliente**, no solo un banco de fotos.
- **El guion no queda cerrado a la primera.** Pasó de 7 a 6 escenas, se descartó una escena entera y se añadió otra (pulpo) a mitad de proceso porque el cliente aportó una foto nueva. El flujo de aprobación de guion (Fase 6) debe soportar **añadir/quitar escenas después de la aprobación inicial**, no solo elegir entre 3 guiones cerrados.
- **Las imágenes fijas se aprueban antes de generar vídeo, y el vídeo reutiliza el resultado ya aprobado sin volver a subir nada** (el `job_id` de la imagen sirve directamente como `start_image` del vídeo). Esto valida el orden "imagen → visto bueno → vídeo" de la Fase 7/8 como necesario, no opcional: encarecer/tirar un vídeo por un error que se podría haber visto en la imagen fija sale más caro.
- **Las herramientas de generación pueden "adivinar" de más.** Al generar animaciones sueltas, el sistema detectó un preset ("IN THE DARK") que coincidía con el prompt y lo sugirió automáticamente; hubo que rechazarlo explícitamente para mantener el prompt de marca. Society debe decidir conscientemente cuándo aceptar atajos automáticos de las herramientas subyacentes y cuándo no, en vez de heredar su comportamiento por defecto.
- **Fricciones de infraestructura no relacionadas con el producto**: una subida falló 7 veces con un archivo concreto y funcionó a la primera con otro; hubo que descartar manualmente que fuera un problema de crédito (`balance`). Un sistema en producción necesita reintentos automáticos y mensajes de error claros al cliente, no que quien opera tenga que descartar hipótesis a mano.
- **El montaje final queda fuera del sistema.** Ahora mismo el cliente monta en CapCut. La Fase 8 de `idea.md` da por hecho el montaje "preferiblemente con After Effects", pero en este caso real ese paso no se automatizó en absoluto — sigue siendo la mayor brecha entre el flujo ideal y lo que hoy es viable.

## 5. Implicaciones para el diseño de Society

1. El **banco de fotos reales** (Fase 2) necesita ser más granular de lo pensado inicialmente: no solo "platos", sino elementos reutilizables del local (mantelería, vajilla, mobiliario, rincones) que se puedan referenciar por separado en cualquier escena.
2. Society necesita un espacio de **preferencias/vetos por cliente** que persista entre proyectos (p. ej. "nunca mostrar cuchillos en primer plano"), no solo el banco de imágenes.
3. La aprobación de guion e imágenes debe tratarse como un **proceso iterativo con el cliente**, no un checkpoint único — el diseño de la interfaz debe prever añadir, quitar y regenerar escenas sueltas después de la aprobación inicial.
4. Los **scores de viralidad en bruto no bastan**: hace falta una capa de interpretación que traduzca "hook bajo, sustain alto" en una recomendación accionable ("copia el ritmo, cambia la apertura"), en vez de mostrar solo números.
5. El **montaje final del vídeo sigue siendo manual** y es el mayor hueco pendiente entre este caso práctico y la Fase 8 tal como está descrita — hay que decidir si el TFG lo aborda o lo deja explícitamente fuera de alcance (ver `idea.md` §8).

---

## 6. Actualización 2026-09-14 — qué ha cambiado desde este caso

Este documento registra el Reel 01 tal como se hizo el 2026-09-07 y se deja intacto como registro. Lo
que ha pasado después cambia varias de sus conclusiones:

| Conclusión del 2026-09-07 | Estado a 2026-09-14 | Fuente |
|---|---|---|
| El montaje queda fuera del sistema (CapCut) — «el mayor hueco pendiente» | **Cerrado.** Desde el 2026-09-08 el montaje se hace en After Effects controlado por MCP y el cliente lo aprueba. Lo rechazado fue el montaje con `ffmpeg`, no la automatización | `base-conocimiento-torre-de-vega/03-automatizacion-montaje-after-effects/` |
| Kling 3.0 para todos los planos | Modelo por caso de uso, con **1080p como mínimo** y la calidad por delante del coste: Kling 3.0 `pro` (movimiento local), Seedance 2.0 con imagen inicial **y final** (manos), Veo 3.1 (persona a cámara). `minimax_hailuo`, prohibido | `01-reglas-contenido/reglas_videos.md` reglas 15-17 |
| «Cámara estática» + micro-movimiento | Ni estática ni *handheld*: recorrido mecánico, lento y cuantificado; el macro-movimiento va en AE | `reglas_videos.md` reglas 5, 9 y 11 |
| Acabado cinematográfico | Pasó a «iPhone» (09-08) y volvió a **editorial dramático** (09-10), a petición del cliente | `reglas_imagenes.md` regla 17 |
| Los scores de viralidad necesitan interpretación | Confirmado y medido: el montaje no mueve la nota de Higgsfield, pero sí la retención real (−7 pp en el Reel 03); el alcance lo deciden los **compartidos**, que dependen de que haya noticia (fecha, precio) | `05-informes-medidos/2026-09-09_reel-03_lectura-de-metricas.md` |

**Nuevo hueco que aparece en su lugar:** los **gráficos del montaje** (rótulos, placa de cierre, texto
revelado por el movimiento de la escena), que hoy se construyen capa a capa. Candidato evaluado: *AI
Motion Designer* de Higgsfield, un agente que trabaja dentro de la composición de After Effects
(`05-informes-medidos/2026-09-14_procesos-reels_y_ai-motion-designer.md`).

**Implicación nueva para Society** (se suma a las cinco de §5):

6. Las **reglas de cliente cambian y tienen dependencias**. En una semana hubo que corregir 15
   contradicciones porque una regla invertida no se propagaba a los documentos, plantillas y guiones que
   la usaban. Society necesita reglas versionadas con fecha **y** saber qué artefactos dependen de cada
   una, para marcarlos como obsoletos cuando cambie.
