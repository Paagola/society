# 01 · Inventario de verdad y escalera de realidad

El diagnóstico del caso práctico es claro: el modelo de vídeo **regenera** lo orgánico en cada
fotograma (comida, manos, fuego), y cuanto más tiene que inventar, antes se nota. La respuesta no es un
prompt más largo sino **decidir qué parte del Reel tiene que inventarse de verdad**. Este archivo es esa
decisión.

## Índice

1. Inventario de verdad
2. La escalera de realidad (L0-L4)
3. El test de movimiento
4. Lo que siempre tiene que ser real
5. Árbol de decisión por plano

---

## 1. Inventario de verdad

Se construye **antes** de proponer ideas, porque las ideas dependen de lo que existe. Va en `verdad:` del
plan.

### 1.1 Anclas por objeto

Un ancla es un objeto real del local con al menos una foto real. Granularidad de objeto, no de plato:
mantel, bajo-mantel, silla, plato, copa, cubierto, lámpara, aplique, pared, botellero, uniforme… El caso
práctico lo demostró: sin fotos específicas del mantel y la vajilla, el modelo los cambia.

```yaml
anclas:
  - id: copa_vino
    descripcion: "copa de cristal fino, balón ancho, tallo largo"
    fotos: [imagenes/vinos/copa-vino-grande.jpg]
    dificultad: baja          # baja | media | alta (alta = el modelo la inventa a menudo)
```

Reglas:

- **Comprueba que cada ruta existe** (el linter lo hace con `--raiz`). Una referencia «real» que no lo es
  contamina todo el lote (regla 14 de imagen).
- Varias fotos del mismo objeto se pasan juntas y se declara en el prompt que son **un solo objeto**
  (si no, el modelo lo duplica).
- Marca `dificultad: alta` los objetos que el modelo ya inventó al menos una vez. Si vuelve a pasar, el
  plano sale del guion en lugar de seguir gastando (lección del botellero en el Reel 09).

### 1.2 Metraje real

```yaml
metraje_real:
  - ruta: videos/parrilla_volteo_master_4k60.mp4
    contenido: "pala levanta chuletón entre llamas"
    duracion_s: 12.0
    tramos_utiles: ["3.4-5.8"]
    usos_previos: [reel_09]   # el banco real se agota: el cliente retiró un clip por repetido
```

El metraje real es el material más valioso y **se gasta**. Antes de reutilizar un tramo, mira
`usos_previos` y pregunta si el cliente lo acepta otra vez.

### 1.3 Invenciones recurrentes

Lista de lo que el modelo tiende a meter aunque no exista: sillas metálicas, tapicería de piel de vaca,
mesa oscura brillante, lámpara de cristal, logo en el mantel, servilleta bajo el plato, manchas… Se
convierte en negativos del plano donde aplique.

### 1.4 Lo que no existe

Todo lo que no tiene ancla. No se dibuja, no se «sugiere», no aparece desenfocado al fondo. Si el concepto
lo necesita, el concepto cambia.

---

## 2. La escalera de realidad

Cada plano declara su escalón en `escalon:`. **Se sube un escalón solo cuando el de abajo no puede
cumplir la función del plano**, y se escribe por qué en `justificacion_escalon:`.

| Escalón | Qué es | Coste | Riesgo de «se nota IA» | Cuándo |
|---|---|---|---|---|
| **L0** | Metraje real tal cual | 0 | Nulo | Siempre que exista el momento |
| **L1** | Metraje real o foto real + movimiento de montaje (push-in digital, rampa de velocidad, reencuadre) | 0 | Nulo en metraje; bajo en foto | Plano de apoyo sin acción propia; foto real de un objeto sin movimiento |
| **L2** | Metraje real **extendido o editado** con Seedance 2.5 (`video_extension` / `video_edit`) | Medio | Medio | Experimental: el tramo real es corto o tiene un defecto localizado |
| **L3** | Foto real animada directamente (imagen a vídeo sin keyframe generado) | Bajo-medio | Medio | La foto real ya tiene encuadre y luz de Reel y algo que se mueve |
| **L4** | Keyframe generado anclado en fotos reales + imagen a vídeo | Medio-alto | El más alto | El encuadre o la acción no existen en ningún material real |
| — | Texto a vídeo | — | — | **Prohibido** |

### Notas por escalón

**L1 no es un premio de consolación.** Un push-in del 3-4 % en montaje sobre un plano real es gratis, no
hace temblar la comida y no inventa nada. Lo que no puede hacer: abrir el Reel. Un paneo de montaje
sobre una imagen fija **no lee como «está pasando algo»** (regla 12 de vídeo): el fotograma 1 necesita
movimiento real.

**L2 es experimental y hay que tratarlo como tal.**

- El 17/09/2026 `models_explore` listó `video_edit` y `video_extension` en `seedance_2_5`. Comprueba de
  nuevo antes de usarlo.
- Una skill de la comunidad (OSideMedia, MIT) indica que `video_edit` cobra por la duración del vídeo de
  origen y que `video_extension` hereda su relación de aspecto. **Verificar** con `get_cost`.
- **Nunca sobre fuego, brasa ni humo** (regla 22): extender una llama es generarla.
- Necesita el «ok» del cliente porque convierte material real en parcialmente generado; se etiqueta
  como tal en el registro.
- Uso típico: un gesto real de 1,5 s que necesita llegar a 2,4 s para el gancho; quitar un objeto que
  sobra en una toma real.

**L3 exige una foto real buena de verdad.** Si la foto no tiene encuadre 9:16 limpio, luz del estilo
elegido y un origen de movimiento, no ahorra nada: el defecto se hereda en el vídeo.

**L4 es donde vive casi todo el trabajo de esta skill.** Su riesgo baja con tres cosas: keyframe con la
acción ya empezada, referencias con rol y fidelidad, y una sola acción por plano.

---

## 3. El test de movimiento

Antes de mandar un plano a vídeo, rellena `accion.origen_movimiento:` con una de estas categorías:

| Origen | Ejemplos | ¿Se genera? |
|---|---|---|
| `liquido` | vino cayendo, aceite, caldo | Sí, si el keyframe ya muestra el chorro |
| `mano` | mano ya agarrando la silla, dedos en el pie de la copa, cuchillo a medio corte | Sí: un gesto breve y quietud (regla 6) |
| `objeto_en_curso` | silla a medio retirar, plato bajando hacia la mesa | Sí |
| `fuego` | brasa, llama, humo | **No**: solo metraje real (regla 22) |
| `vapor` | plato humeante | Solo si el keyframe ya muestra vapor; sobre un plato frío no aparece (medido el 08/09) |
| `camara` | sala vacía, lámpara, mesa puesta | Sí, pero el movimiento es solo de cámara; vale Kling |
| `ninguno` | bodegón | **No**: se resuelve en montaje (L1) |

**Diseña el keyframe para el vídeo.** El modelo anima lo que el fotograma insinúa. Si quieres que el vino
caiga, el keyframe tiene el chorro ya cayendo; si quieres un corte, el cuchillo está a mitad de la pieza.
Pide en el keyframe el estado **a mitad de acción**, nunca el previo.

---

## 4. Lo que siempre tiene que ser real

- **Fuego, brasa, humo y texturas caóticas** (regla 22). El modelo las promedia y se ven falsas.
- **Personas identificables** sin imagen de referencia aprobada y consentimiento, y nunca la persona del
  vídeo de referencia (regla 18 de imagen).
- **El oficio de un profesional concreto** (el cortador de jamón): sin su metraje y su «ok», no hay pieza.
- **Textos reales** (carta, pizarra, etiqueta): el modelo escribe texto basura. Los rótulos se ponen en
  montaje.

---

## 5. Árbol de decisión por plano

1. ¿Existe el momento en metraje real? → **L0** (o L1 si hay que reencuadrar).
2. ¿La acción es fuego, brasa o humo? → solo real. Si no hay metraje, **el plano no existe**; propón otro.
3. ¿Hay una foto real del encuadre y no hace falta acción? → **L1** en montaje.
4. ¿Hay un tramo real casi válido pero corto o con un defecto localizado? → **L2**, con «ok» del cliente.
5. ¿La foto real ya es un buen fotograma de Reel y tiene origen de movimiento? → **L3**.
6. ¿Todos los objetos del plano tienen ancla? Si alguno no → quítalo del plano o cambia el plano.
7. Si todo lo anterior falla → **L4**, con keyframe a mitad de acción.
