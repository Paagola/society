# 05 · Orquestación de las skills

Qué skill interviene en cada etapa, qué recibe, qué entrega y dónde se para a esperar aprobación. `director` es la única skill que recorre la cadena completa.

## Índice

1. La cadena
2. Puertas de aprobación
3. Qué viaja entre etapas
4. Atajos legítimos
5. Presupuesto e iteración
6. Registro y aprendizaje

---

## 1. La cadena

| # | Etapa | Skill | Entrada | Salida |
|---|---|---|---|---|
| 1 | Brief | `marketing-hosteleria` | Ficha del cliente, datos propios, calendario de novedades | Brief de 18 campos: objetivo, situación, motivo de envío, hipótesis, métrica, umbral, etiqueta de IA |
| 2 | Inventario de verdad | `director` + `directoria` | Fotos y metraje reales, reglas del cliente | Qué existe de verdad (platos, vajilla, sala, personas con permiso) y qué metraje real evita generar |
| 3 | Conceptos | `director` | Brief + inventario (+ reel de referencia, si lo hay) | 2–3 conceptos con **arcos y mecanismos distintos**, con su coste → **PUERTA A** |
| 4 | Lista de planos | `director` | Concepto aprobado | Prefijo, glosario y fichas de plano → **PUERTA B** |
| 5 | Keyframes | `directoria` (prompt) + `higgsfield` (ejecución) | Fichas de los planos generados | Hoja de contactos → **PUERTA C** |
| 6 | Clips | `directoria` + `higgsfield` | Keyframes aprobados | Clips revisados (técnica, textura, color, recuento) → **PUERTA D** |
| 7 | Montaje | `openmontage` (o `after-effects-reels`) | Clips + metraje real + lista de planos | Render 1080×1920 revisado → **PUERTA E** |
| 8 | Publicación y medida | `marketing-hosteleria` | Pieza aprobada | Capturas a +24 h, +72 h, +7 d y +28 d; estado de la hipótesis |
| 9 | Aprendizaje | Todas | Resultados | Propuestas de cambio en las reglas (nunca escritas sin aprobación) |

## 2. Puertas de aprobación

Coinciden con las del prompt de producción de Torre de Vega (A–E) y con las dos puertas humanas del diseño de Society (G1 antes de animar, G2 antes de publicar):

| Puerta | Qué se presenta | Por qué ahí |
|---|---|---|
| **A** · Análisis y propuesta | Resumen de la referencia en 5 aspectos por plano, conflictos de reglas, 2–3 conceptos, coste de cada uno | Cambiar de concepto aquí cuesta cero |
| **B** · Guion y lista de planos | Por plano: acción, ángulo, función, movimiento, material real o generado, modelo y resolución, duración y rótulo. Respuesta a "¿se reenviaría?" | Cambiar un plano en papel es barato; generado, no |
| **C** · Keyframes (**G1**) | Hoja de contactos con todas las imágenes fijas | Ningún vídeo se genera hasta aprobar el lote completo; animar un keyframe que luego se descarta es lo más caro de la cadena |
| **D** · Clips | Cada clip con su prompt, modelo pedido y servido, coste real y defectos detectados | Antes de montar |
| **E** · Montaje (**G2**) | Render + revisión automática (ffprobe, fotogramas, audio, subtítulos, duración real) | Antes de publicar |

**La aprobación es por puerta:** un "adelante" anterior no cubre la siguiente. En cada puerta se termina el turno y se espera.

## 3. Qué viaja entre etapas

- **Del brief a los conceptos:** motivo de envío, hipótesis y métrica. Todo concepto tiene que servir a la hipótesis.
- **De los conceptos a la lista:** los cinco anclajes (emoción, motivo, objeto, ruptura, imagen final) y el arco.
- **De la lista a `directoria`:** la ficha de cada plano generado (acción, encuadre, cámara con recorrido, recuento, escala, luz) y el prefijo global.
- **De `directoria` a `higgsfield`:** el prompt en dos partes y los parámetros propuestos.
- **De `higgsfield` de vuelta:** modelo servido, parámetros efectivos, coste real y `job_id`.
- **De la lista a `openmontage`:** duraciones, función de cada plano, rótulos, transiciones previstas y qué planos son el gancho y el héroe.

## 4. Atajos legítimos

- **Metraje real disponible** → ese plano salta las etapas 5 y 6. Con fuego, brasa o texturas caóticas reales, no se genera nunca una versión IA.
- **Si en la imagen no se mueve nada** → el plano se resuelve en montaje (empuje digital, corte), no con vídeo generado.
- **Pieza de imagen fija** (historia, carrusel) → las etapas 6 y 7 se convierten en maquetación; la puerta C es la final.
- **Ninguna puerta se salta** porque "hay prisa". Si el usuario insiste, se deja por escrito el riesgo.

## 5. Presupuesto e iteración

- **Antes de la puerta A:** estimar el coste de cada concepto (skill `higgsfield`, `03`).
- **Iterar es el trabajo:** en cine se acepta en torno al 1 % de las imágenes y el 1,5 % de los vídeos (Hell Grind [COMUNIDAD]); en reels de restaurante, los factores de reintento ×1,25 en imagen y ×1,5 en vídeo. Se presupuesta.
- **Máximo 2 reintentos por plano sin consultar.** Un trabajo fallido se revisa antes de reintentarlo.
- **Fallo sistemático → cambiar una variable; fallo aleatorio → repetir tiradas con el prompt fijo** (skill `directoria`, `hosteleria/06` §6).
- **Una espera no es un fallo:** se guarda el `job_id`, no se relanza y se retoma.

## 6. Registro y aprendizaje

Por cada pieza: brief, concepto elegido y descartados, lista de planos, registro de generaciones (modelo pedido y servido, parámetros, coste, veredicto, motivo), render final y métricas por ventana. Los aprendizajes se clasifican (capacidad del proveedor / heurística editorial / preferencia del cliente) y se **proponen**; entran en las reglas del cliente o en estas skills solo con aprobación y con fecha (el patrón "⚠️ Corregido el…" de las skills del proyecto).
