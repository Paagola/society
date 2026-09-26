---
name: hooks-society
description: 'Diseña el gancho visual de la primera toma de un Reel de hostelería: gesto, movimiento, revelación, primer fotograma, cámara y consecuencia visible. Selecciona aperturas compatibles con las referencias reales del restaurante y entrega un contrato de preproducción al director. Usar al pedir hooks visuales, una primera toma que enganche o aperturas para Reels automatizados.'
---

# Hooks visuales para Society

Estado: vigente · herramienta de preproducción, no integración implementada en la app.
Fecha: 2026-09-26. Ámbito: primera toma. Fuentes: [integración e investigación](references/integracion-reels.md).

El hook es **lo que sucede al abrir el vídeo**. Diseña una acción que ya haya empezado en el primer fotograma, un movimiento de cámara motivado y una consecuencia visible. Debe entenderse sin rótulo ni voz; el sonido refuerza el resultado en producción. El rótulo y el copy se deciden después.

## Consulta

- Para explorar: [24 aperturas visuales](Hooks-visuales.html) o [fichas Markdown](references/hooks-visuales.md).
- Para filtrar con material real: `python scripts/seleccionar_apertura.py brief.json --media-root RUTA_TFG --output candidatos.json`.
- Para estructurar el brief: [contrato de entrada](assets/brief-apertura.schema.json) y [ejemplo Da Tonino](assets/brief-da-tonino-analisis.json), autorizado solo para análisis.
- Para conectar con el proyecto: [integración](references/integracion-reels.md) y [auditoría](references/auditoria-2026-09-26.md).

## Decisión

1. Lee objetivo y perfil; inventaría referencias del producto y local, acciones realmente grabadas, restricciones y hechos vigentes. Las etiquetas de los activos requieren inspección humana o visual previa: el selector no analiza píxeles.
2. Propón hasta tres mecanismos compatibles. Favorece material real apto y evita repetir la misma apertura reciente. Si faltan anclas, simplifica o pide una referencia concreta; una pizza entera no documenta masa cruda, interior ni porción separada.
3. Define **fotograma inicial → una acción → consecuencia → cámara → duración orientativa → referencias → fallos que invalidan la toma**. Los fragmentos de prompt son borradores de movimiento, no prompts finales.
4. Comprueba la apertura sin texto ni audio. Si se necesita una frase para entender qué sucede, revisa el gesto o encuadre. Elige un punto de salida donde el resultado ya se lea y enlázalo con el siguiente plano.
5. Entrega al director el contrato parcial. Este completa el Reel y `directoria` prepara el keyframe y el prompt final. Conserva la ruta, coste y puertas vigentes de `../README.md` y las reglas del cliente. No genera una llamada por cada candidato.

El selector verifica metadatos, ámbito de cliente/producto, archivos, vigencia, permisos declarados y requisitos del patrón. `production_ready` permanece en `false`: no acredita derechos, duración de clips, calidad visual, presupuesto o aprobación. No se envía su JSON a un proveedor como si fuera un `plan.yaml` completo.

## Evidencia y aprendizaje

Las 24 fichas son propuestas originales de dirección sin ensayo de retención. No son «24 ganadoras» ni 5000 mecanismos independientes. Para aprender, registra patrón y versión, referencias, coste total por pieza aceptada, fallos de realismo, ventana de publicación y métricas comparables. Un predictor de atención es una estimación, no respuesta observada de espectadores.

El archivo anterior de [5300 textos](Biblioteca.html) se conserva como apoyo opcional para copy. **No se usa para elegir el gesto ni se contabiliza como biblioteca de hooks visuales.**
