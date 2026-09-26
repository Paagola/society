# Auditoría: utilidad de los hooks en Society

Estado: vigente · análisis y corrección de la herramienta de skills; app no implementada por esta revisión.
Fecha: 2026-09-26. Ámbito: `tfg/skills`, documentos de producto y caso Da Tonino.
Fuentes: archivos locales identificados y [investigación visual](integracion-reels.md).

## Dictamen

La primera entrega de 5300 textos **no resolvía el encargo de aperturas visuales**. Puede ayudar al copy, pero su cantidad no equivale a 5300 gestos, tomas o mecanismos diferentes. El nuevo recurso principal contiene 24 acciones descritas de principio a fin y una herramienta de selección por material real. Es más ajustado a este uso por su estructura y sus filtros; no se ha demostrado que retenga más ni que supere el archivo comercial, cuyo interior no se leyó.

Para Society es útil **como capa de preproducción**. No basta con poner una skill en una carpeta para que la futura aplicación cree Reels automáticamente. Falta que la aplicación lea el perfil y los activos, aplique el contrato, gestione aprobaciones y costes, invoque proveedores, revise resultados y mida publicaciones. Según `CLAUDE.md` y README raíz, el código de la app lo escribe Víctor. Aquí se cambian documentación y herramientas de skills.

## Qué se revisó

Se leyeron las entradas y referencias relevantes de marketing-hosteleria, director, director-reels, directoria, higgsfield y openmontage; la biblioteca anterior; el README de producto y el de skills; el cerebro estratégico; el informe de automatización; y el plan, referencias y receta de Da Tonino. Se inspeccionaron las cuatro fotos pizza/sala/rigatoni/paella. La auditoría sigue el recorrido brief → inventario → apertura → keyframe → generación → montaje; no es certificación exhaustiva de todos los documentos históricos ni ejecución de todos los proveedores.

## Hallazgos que afectan a la automatización

| Hallazgo | Consecuencia | Corrección o tratamiento |
|---|---|---|
| La biblioteca anterior se organiza por frases y sectores | No define condiciones suficientes para generar el gesto | Entrada visual con estado inicial, acción única, estado final, cámara y anclas |
| Un sector como «pizzería» no garantiza horno, masa o porción cortada | El modelo puede inventar un proceso | Requisitos por rol de activo, producto y prohibiciones del perfil |
| La app está descrita en documentos; `promo/` es material de promoción | Un script de skills no es función de producto instalada | Herramienta local y diseño de intercambio explícitamente separados de implementación |
| Director-reels y directoria ya contienen reglas de física, anclaje y gestos | Duplicar otro motor de prompts provocaría divergencias | El hook entrega contrato parcial a esas skills |
| El cerebro estratégico ya pide CreativePattern, evidencia y coste por pieza aceptada | Miles de variantes sin trazabilidad no resuelven ese diseño | IDs, requisitos, fuente y estado de evidencia; registro de medición pendiente |
| Conviven puertas manuales A–E y producto G0/G1/G2 | Se podría trasladar el flujo manual literalmente a la app | Documentada la diferencia; ninguna puerta se elimina ni se autoriza gasto |
| Referencias antiguas citan Kling y otras duraciones | Selección inconsistente de modelo o ritmo | Aplicar autoridad explícita de `skills/README.md`, 2026-09-25 |
| `director/SKILL.md` decía tomas de 3 s o más pese a la ruta actual de 0,8–1,4 s | Contradicción directa al compilar la primera toma | Corrección puntual para remitir a la regla vigente |
| El principio 5 de director exigía rótulo en el primer fotograma | Podía forzar texto a un gancho que debe funcionar visualmente | Rótulo pasa a opcional según brief; acción visual conserva prioridad |
| El plan histórico de Da Tonino usa valores como `frontal_alto`, `media` o `seguimiento` no admitidos por el esquema actual, y no completa todos sus campos de fuente | Una plantilla puede parecer válida sin pasar validación | No se reescribe evidencia histórica. Nuevo resultado se marca contrato parcial y exige compilación al esquema vigente |
| Algunas referencias llaman al predictor activación cerebral o prueba de atención | Riesgo de presentar estimación como comportamiento medido | La nueva biblioteca exige distinguir proxy, revisión visual y métricas reales |

## Prueba concreta: Da Tonino

Entrada: pizza, objetivo presentar producto, referencias de `produccion/da-tonino/reel-v4`, sin metraje real en el plan histórico. Las fotos de sala permiten anclar una mesa. La foto de pizza permite reconocer el plato y un detalle/contexto, pero no documenta base, interior o una porción separada. El perfil del ejemplo prohíbe cocina, horno, fuego y personal uniformado. Los permisos se etiquetaron solo para análisis; no se presumen permisos comerciales actuales.

Resultado reproducible del selector: **3 candidatas de 24, 21 descartadas**, todas con `production_ready: false`.

| Candidata | Primera toma propuesta | Pendiente |
|---|---|---|
| VH01 · El plato aterriza | La pizza ya entra en cuadro; una mano la apoya sobre la mesa y sale. Slider corto acompaña y frena en el contacto. 1,2 s orientativos. | Priorizar grabación real del servicio; si se genera, resolver mano, apoyo y escala con keyframe aprobado |
| VH21 · Entrada lateral al plato | Pizza reconocible desde el inicio; un desplazamiento lateral corto crea paralaje con la mesa documentada. 1,2 s. | No revelar caras, lados ni espacios no documentados; verificar que el desplazamiento aporta una revelación legible |
| VH24 · De textura al plato | Detalle visible de la pizza; retirada breve descubre la misma pizza completa. 1,2 s. | Comprobar resolución del recorte y continuidad; evitar falsa reconstrucción de detalle |

Mi candidata editorial para transmitir gesto de servicio es VH01 **si se obtiene metraje o una solución anclada aceptable**. VH21 y VH24 son alternativas de menor complejidad de manos, no supuestas ganadoras. No se produjo vídeo de ninguna de ellas en esta revisión.

Ejemplos descartados: levantar una porción (sin referencia separada), cortar y revelar interior (sin clip real), fuego (prohibido y sin metraje), masa cruda (sin ancla), hojas que caen (falta confirmación y referencia específica del ingrediente). La mesa con varios platos requiere carta/selección confirmada; tener tres fotos no demuestra que exista ese pack.

## Qué se entrega y qué no se afirma

- 24 fichas visuales en HTML, Markdown y JSON con borradores de movimiento en inglés.
- Selector local con contrato de entrada, ejemplo, motivos de descarte y pruebas automatizadas.
- Enlaces desde las skills de dirección y prompt hacia el nuevo recurso.
- Biblioteca textual previa conservada como material secundario e histórico.
- Recursos gratuitos externos, entre ellos un índice de clips visuales de SocialBu consultado sin comprar nada.

**No hay 5000 hooks visuales nuevos en esta revisión.** Tampoco se rebautizan los 5300 textos como gestos ni se multiplican 24 acciones por adjetivos para alcanzar esa cifra. La prioridad de la corrección es que cada apertura tenga condiciones para producirse. La expansión útil debe añadir acciones distintas con referencias revisadas y resultados; el catálogo puede crecer con esos registros. El acceso a documentos es gratuito; producir con proveedores comerciales conserva sus costes y requiere el flujo ya establecido.
