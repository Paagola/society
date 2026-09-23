# Auditoría de continuidad de Society

Estado: vigente · revisión documental. Fecha de revisión: 2026-09-22.
Ámbito / a quién obliga: documentación de producto y conservación de evidencia. Fuentes: archivos del proyecto y comprobaciones indicadas en esta auditoría. Índice único: [README](../README.md).

## 1. Alcance y criterio

La revisión parte del encargo `prompts/gpt6-astra-limpieza-y-sistema-creativo.md`. Se inventariaron los archivos presentes, se leyeron las fuentes prioritarias y se contrastaron los contratos de producción y los recursos seleccionados. Las modificaciones previas de CLAUDE, reglas y ensayos V3 se tomaron como base; no se restauró una versión antigua de Git. Se excluyeron `.git`, `.obsidian` y `.vscode` de la edición.

El problema no era falta de documentación: convivían instrucciones de distintas fechas sin una autoridad clara. README raíz es el índice único; los informes nuevos gobiernan cada dominio. «Vigente» expresa autoridad documental, no software implementado. La [norma documental](2026-09-22_patron-documental.md) distingue revisión editorial, fecha de evidencia y verificación técnica.

## 2. Contradicciones resueltas

| Hallazgo | Resolución ejecutada | Límite que se conserva |
|---|---|---|
| Prohibición de caras frente a ficha de personaje | Reglas activas permiten personas y exigen ficha aprobada para protagonistas; secundarios de ambiente sin ficha | Consentimiento en personas reales; no clonar caras de referencias |
| AE presentado como montaje activo después del 17/09 | Skill trasladada al archivo; flujo, CLAUDE y reglas apuntan a Remotion | Ensayos AE y sus resultados se conservan como historia |
| Índices redundantes y 16 diagramas no presentes | README raíz inventaría documentos; secundarios redirigen; enlaces a diagramas retirados | No se generaron diagramas ficticios ni una aplicación ausente |
| Reglas 1080p/2K/4K y luz contradictorias | Keyframes del cliente 2K; entrega vídeo según perfil aprobado; ejemplos generales no prevalecen | Preferencia de Torre de Vega, no requisito universal de Society |
| Espera del proveedor confundida con estado de negocio | Máquina propia con deadlines, bloqueo y reconciliación tardía | Vencer no cancela ni elimina una posible deuda |
| Fin de generación confundido con aprobación | Dos puertas por pieza, linaje y aprobación ligada a hashes/versiones | Alta inicial de biblia/personaje aparte; máquina no certifica fidelidad |
| Predictor tratado como medida global sin límite | Techo 16 s, ventana registrada; análisis propio separado de persuasión | Score de fragmento no representa un Reel largo ni predice ventas |
| Créditos web, MCP y USD REST mezclados | Costes por pool; preflight en créditos; conversión monetaria marcada pendiente | Sin factura ni `get_cost` disponible no se resuelve un tipo de cambio |
| Catálogo estático tomado como contrato | Registro versionado por ruta/modelo/parámetros/cuenta, recotización y fallbacks cualificados | Catálogo o estimate no prueba generación ni permiso SaaS |
| «2 de 3» y ranking tratados como evidencia causal | Señales candidatas, comparación madura y control de incertidumbre | No se reescriben números históricos; sí se limita su interpretación |
| Canvas supuesto motor automatizable | Herramienta opcional de dirección; producción independiente | Vista pública y ayuda consultadas; sin sesión privada ni API de grafos verificada |

## 3. Clasificación y traslados realizados

El inventario completo por estado está en [README §15](../README.md#15-documentos-del-proyecto). Históricos llevan advertencia explícita; referencias no quedan revalidadas por cambiar su encabezado. Se conservan JSON, scripts, capturas y otros artefactos de ensayo sin insertarles Markdown.

| Ruta anterior | Destino | Motivo y sucesor |
|---|---|---|
| `idea.md` | `archivo/idea.md` | Definición inicial superada; README raíz |
| `informes/Society_inventario_documental.md` | `archivo/informes/Society_inventario_documental.md` | Inventario duplicado y desactualizado; README §15 |
| `informes/Society_diseno_y_viabilidad.pdf` | `archivo/informes/Society_diseno_y_viabilidad.pdf` | Exportación congelada; Markdown de viabilidad queda como referencia, diseños nuevos prevalecen |
| `base-conocimiento-torre-de-vega/03-automatizacion-montaje-after-effects/SKILL-after-effects-reels.md` | `archivo/base-conocimiento-torre-de-vega/03-automatizacion-montaje-after-effects/SKILL-after-effects-reels.md` | Técnica sustituida por Remotion el 17/09; informe de producción |

Además, se guardaron copias previas de los índices secundarios, README raíz y flujo bajo `archivo/antes-de-la-revision-2026-09-22/`. Preservan las afirmaciones originales; solo reciben contexto histórico y reparaciones de navegación. No se borraron ensayos ni se movieron indiscriminadamente carpetas de evidencia.

## 4. Entregables y comprobaciones

- [Producción](higgsfield/05-automatizacion-de-produccion.md): cadena, capacidades, estados propios, plazos, reconciliación, costes, QA, Remotion, publicación y dos puertas.
- [Dirección visual](Society_metodo_direccion_visual.md): biblia, casting, fichas, consistencia y Canvas documentado frente a probado.
- [Cerebro estratégico](Society_cerebro_estrategico.md): trazabilidad de objetivo a plano, aprendizaje y diez recursos seleccionados con límites, licencia y actividad.
- [Registro de comprobaciones MCP](higgsfield/2026-09-22_verificaciones.json) y [evidencia GitHub](2026-09-22_fuentes-github.json): consultas gratuitas, sin secretos.

Fuentes técnicas primarias consultadas el 22/09: documentación Higgsfield de autenticación, estados, polling, webhook, errores, facturación; catálogo público y fichas MCP; ayuda oficial Canvas; repositorios/licencias GitHub y licencia Remotion. Detalles y enlaces en los respectivos informes. Meta devolvió 429. No se ejecutaron generaciones de pago, publicación social, llamadas de prueba con claves REST, renders ni tests de una aplicación inexistente.

## 5. Enlaces y límites de verificación

Se registraron **95 reparaciones de ruta**, **1 anclas obsoletas retiradas** y **64 referencias a recursos no incluidos** convertidas en texto explícito. [Detalle por ocurrencia](2026-09-22_enlaces-revisados.json). La comprobación final no detectó destinos locales ausentes en enlaces Markdown dentro del alcance descrito.

El chequeo cubre enlaces Markdown relativos y sus anclas de encabezado fuera de bloques de código. No certifica enlaces web, wikilinks de Obsidian, rutas escritas como texto, derechos de medios ni disponibilidad futura. Los medios externos ausentes se nombran sin enlace roto; no se inventó su contenido. Se mantiene un registro por ocurrencia de cada reparación y de cada recurso no incluido.

## 6. Pendientes reales

Factura o cotización monetaria del pool MCP; contrato de uso como servicio y aislamiento; cualificar referencias/1080p en una ruta programática; alternativas fal con precio/ensayo; sesión Canvas autenticada y posible contrato de grafos; permisos y esquema social; cronometraje de revisión/render; prueba visual autorizada. Los importes 0,050 y 0,063 USD/cr siguen siendo escenarios, no tarifas. El plazo del TFG se protege con una ruta cualificada, publicación asistida y aprendizaje que puede concluir «inconcluso».
