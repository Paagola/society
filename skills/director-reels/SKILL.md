---
name: director-reels
description: 'Dirección creativa y de realismo para Reels de hostelería generados con IA (restaurantes, asadores, bares) — del brief a los clips aprobados, antes del montaje. Construye el inventario de verdad del local, propone conceptos con mecanismos creativos distintos, escribe la lista de planos como contratos verificables, compila los prompts de imagen (Nano Banana Pro) y de vídeo (Kling 3.0, Seedance 2.5 incluida la multitoma) y revisa el realismo de cada clip. Úsala SIEMPRE que se vaya a producir un Reel, un guion de planos, keyframes o prompts de vídeo para un restaurante, cuando se mencione Torre de Vega, Higgsfield, Kling, Seedance, keyframes, "que no se note que es IA", "más creativo", "mejores prompts" o se retome un reel a medias, aunque no se pida la skill por su nombre. El montaje (OpenMontage + Remotion) queda fuera: esta skill le entrega el paquete.'
---

# Director de Reels

> **Regla cero, obligatoria antes de cualquier otra:** todo lo que se produzca tiene que parecer rodado, no generado. Lee y aplica [`../README.md`](../README.md) y `../directoria/references/hosteleria/08-firma-de-rodaje-real.md`. Donde esta skill y la regla cero choquen, manda la regla cero salvo que el **perfil del cliente** diga otra cosa (Torre de Vega prohíbe la cámara en mano: ahí manda su perfil).
>
> **Origen:** skill de la cuenta de Víctor, copiada al repo el 2026-09-25 para que toda regla usada en producción esté versionada aquí.

Esta skill hace el trabajo de un director y un director de fotografía **antes del montaje**: decide qué
se cuenta, con qué material real, qué se genera, cómo se escribe cada prompt y qué clip se acepta. El
montaje, la voz, los subtítulos y los rótulos siguen en OpenMontage + Remotion, que funcionan bien; esta
skill les entrega un paquete cerrado (sección 9).

**Uso:** herramienta de producción de la agencia para el caso práctico. No es código de Society ni
sustituye el desarrollo del TFG. Los contratos y registros que produce sí sirven como evidencia para
diseñar el modelo de datos de la aplicación.

## La idea que manda

La creatividad vive en la **dirección** (qué momento, desde dónde, con qué movimiento, cómo se corta), no
en inventar el local. Un cliente que entre al restaurante no puede notar ninguna diferencia con lo que
vio en el Reel. Por eso cada decisión creativa se toma **después** de saber qué es verdad.

## Las diez leyes del realismo

Se aplican en todas las etapas. El detalle y el porqué están en las referencias.

1. **Escalera de realidad.** Cada plano usa el escalón más bajo que cumpla su función: metraje real →
   real con movimiento de montaje → real extendido → foto real animada → keyframe generado anclado.
   Nunca texto a vídeo. → `references/01-escalera-de-realidad.md`
2. **Sin ancla real no hay plano.** Si un objeto no tiene foto real, no aparece. Si el modelo lo inventa
   dos veces, el plano sale del guion (lección del botellero, Reel 09).
3. **¿Qué se mueve ya en el keyframe?** Si la respuesta es «nada», el plano se resuelve en montaje, no
   con generación (sin zoom digital de plantilla: corte seco o foto con movimiento real de slider). El keyframe se diseña para el vídeo: la acción ya empezada dentro de la imagen.
4. **Un plano héroe por Reel.** La complejidad (manos, corte, vertido) se concentra en un momento; el
   resto lo sostienen planos simples o reales.
5. **Una acción principal por plano, con estado final visible.** Timestamps para el reparto, estado
   final para que el modelo sepa dónde parar.
6. **Cámara de aparato, no de adjetivo.** Nombrar el aparato, cuantificar el recorrido, «en marcha en el
   primer fotograma y en el último». Nunca «static camera». Cámara en mano: la decide el perfil del
   cliente. Si no la prohíbe, en planos de manos y proceso se usa el seguimiento de pequeña amplitud del
   bloque CAPTURE (regla cero, `08` §4); el slider queda para el plano héroe y la sala.
7. **Escribe lo visible.** Física observable (grosor del chorro, qué parte se mueve, cuánto), nunca
   «natural», «épico», «8k» ni «hyperrealistic».
8. **Cada referencia con rol, exclusión y grado de fidelidad.** Qué aporta, qué no se toma y cuánto debe
   sobrevivir.
9. **Negativos acumulados en cada prompt.** Los negativos validados del cliente viajan en todas las
   regeneraciones, no solo la corrección nueva.
10. **Registrar lo servido, no lo pedido.** Modelo devuelto, parámetros efectivos, coste real, motivo de
    descarte.

## Antes de la primera etapa

1. Carga el perfil del cliente: `perfiles/<cliente>.yaml`. Si no existe, créalo copiando la estructura
   de `perfiles/torre-de-vega.yaml` y pregunta lo que falte; no lo supongas.
2. Lee las fuentes que el perfil lista en `fuentes:`. El perfil es un resumen fechado: **si una regla
   del cliente es posterior o más concreta, manda la del cliente**. No resuelvas conflictos por el
   número del encabezado (hay dos reglas «17» en `reglas_videos.md`).
3. Si encuentras reglas en conflicto que afectan a esta pieza, enuméralas en la puerta A y espera.
4. Crea el plan copiando `assets/plantilla-reel.yaml` a la carpeta del reel. **El plan YAML es la fuente
   de verdad de toda la producción**: cada etapa lo rellena y ninguna trabaja de memoria.

## Flujo: nueve etapas y cinco puertas

Las puertas A-E son las mismas del prompt de OpenMontage. No se avanza sin un «ok» explícito.

### 1 · Brief

Rellena `brief:` en el plan. Campos que no pueden faltar: pieza, objetivo, motivo para reenviar, reel de
referencia, metraje real disponible, estilo de luz, duración orientativa, voz en off, CTA, presupuesto.
Si falta alguno, pregunta en un solo mensaje.

### 2 · Inventario de verdad

Rellena `verdad:` antes de pensar ideas. Recorre las carpetas de fotos y metraje del cliente y registra:
anclas por objeto (mantel, vajilla, silla, lámpara, copa…) con sus rutas, metraje real con su contenido y
sus usos previos, e invenciones recurrentes del modelo. Comprueba que cada ruta existe.
→ `references/01-escalera-de-realidad.md` §1

### 3 · Tratamiento del director

Rellena `tratamiento:` en siete líneas: motivo para reenviar, momento héroe, emoción en señales
observables, foco sensorial, motivo visual, curva de ritmo y cierre. Es la brújula de los conceptos.
→ `references/02-motor-creativo.md` §1

### 4 · Tres conceptos → **PUERTA A**

Propón tres conceptos con **mecanismos creativos distintos** del catálogo, puntuados con la rúbrica.
Cada uno con su fotograma 1, su arco, sus planos generados y su coste estimado. Responde a la pregunta de
control del cliente (en Torre de Vega: «¿un vecino de Alhaurín le reenviaría esto a alguien?»).
Si hay reel de referencia, preséntalo antes: qué mecanismo se copia (ritmo, gancho, rótulos) y qué no
(look, platos, local, personas). Recomienda uno; decide el cliente.
→ `references/02-motor-creativo.md` §2-§4

### 5 · Lista de planos como contratos → **PUERTA B**

Escribe `planos:` y `generaciones:` en el plan. Cada plano es un contrato: función, tiempo, escalón y su
justificación, acción y origen del movimiento, ángulo, movimiento de cámara, referencias con rol y
fidelidad, beats con estado final, transición de entrada y salida, rótulo y criterios de rechazo.
Diseña las transiciones **en cámara** (salidas y entradas que casan), que no cuestan créditos.

Antes de presentar, ejecuta el linter y corrige todos los errores:

```bash
python scripts/lint_reel.py <ruta>/plan.yaml --perfil perfiles/<cliente>.yaml --raiz <carpeta_cliente>
```

En la puerta B presenta la tabla de planos, el coste total y los avisos del linter que se aceptan con
motivo. → `references/03-contrato-de-plano.md`, `references/05-vocabulario-camara.md`

### 6 · Keyframes → **PUERTA C**

Compila los prompts de imagen desde cada contrato (`references/04-compilador-de-prompts.md` §2).
Consulta el modelo con `models_explore` (gratis) si es la primera tanda de la sesión y haz el preflight
de coste. Genera **todos** los keyframes, incluidos los de final (`end_image`) que no son tomas del guion.
Revisa cada imagen con la lista de `references/06-revision-realismo.md` §1 y corrige los defectos con
«un solo cambio» antes de enseñarla. Presenta una hoja de contactos con todas: ningún vídeo se genera
hasta que se apruebe el lote completo.

### 7 · Clips

**Ruta única desde el 25/09/2026: Seedance 2.5 a 720p + reescalado ByteDance pro de la toma aprobada; Kling 3.0 no se usa** (el §3 del compilador queda como histórico).
Compila los prompts de vídeo por dialecto (`references/04-compilador-de-prompts.md` §4-§5): ~~Kling 3.0~~
para planos simples, Seedance 2.5 para manos, cubiertos, cortes y líquidos, y **multitoma** de Seedance
2.5 cuando haya dos o más planos complejos con keyframes aprobados.

Preflight obligatorio antes de cada tanda:

- `models_explore action:"get"` del modelo: confirma que admite 1080p y los roles de media que vas a
  usar. **1080p es innegociable**: si no está disponible, para y pregunta.
- `get_cost:true` y compara con el presupuesto del plan.
- Regla cero: bloques CAPTURE, LIGHT, PHYSICS y HANDS de `08` §11 en los planos de acción, y
  `../openmontage/scripts/medir_realismo.py` en la revisión de cada clip y del montaje.
- Vuelve a pasar el linter: comprueba bloques, negativos obligatorios y parámetros de cada prompt.

Si el servidor devuelve una recomendación de preset, reenvía con `declined_preset_id`. Una espera larga
no es un fallo: guarda el `job_id`, no dupliques el trabajo.

### 8 · Revisión de realismo → **PUERTA D**

Por cada clip:

```bash
python scripts/revisar_clip.py <clip.mp4> --keyframe <inicio.png> [--end <final.png>] --salida <carpeta>
```

El script comprueba formato, genera la hoja de contactos y mide temblor, deriva, «foto congelada» y si
la cámara se mueve de principio a fin. Después mira los fotogramas a tamaño real con la rúbrica de
`references/06-revision-realismo.md` §2 y decide por plano: aceptar, corregir, bajar de escalón,
resolver en montaje o eliminar. Máximo dos reintentos por plano sin consultar.

En la puerta D presenta cada clip con su prompt, modelo pedido y devuelto, coste real, métricas del
script y defectos detectados.

### 9 · Paquete para el montaje y registro

Rellena `montaje:` en el plan: clip aprobado, entradas y salidas, rótulos, transición prevista,
indicaciones de ritmo y sonido por plano. Ese bloque es lo que lee la sesión de OpenMontage; la puerta
E (montaje) la sigue gestionando su prompt.

Cierra con el registro (`references/07-registro-y-aprendizaje.md`): intentos, recetas validadas nuevas,
entrada en el historial de reels y **aprendizajes propuestos**. No escribas en las reglas del cliente sin
su aprobación.

## Formato de lo que presentas

- Conversación en español; prompts de generación en inglés.
- En cada puerta: tabla primero, detalle después, y lo que necesitas que decida el cliente al final en
  una lista corta.
- Cuando algo no esté verificado (un parámetro, una capacidad de un modelo), escríbelo como «verificar»
  en vez de afirmarlo.

## Mapa de referencias

| Archivo | Cuándo leerlo |
|---|---|
| `references/01-escalera-de-realidad.md` | Etapas 2 y 5: inventario de verdad, escalones, test de movimiento |
| `references/02-motor-creativo.md` | Etapas 3 y 4: tratamiento, mecanismos, transiciones en cámara, rúbrica |
| `references/03-contrato-de-plano.md` | Etapa 5: cada campo del plan y qué regla hace cumplir |
| `references/04-compilador-de-prompts.md` | Etapas 6 y 7: dialectos de Nano Banana Pro, Kling 3.0 y Seedance 2.5, léxico de realismo |
| `references/05-vocabulario-camara.md` | Etapa 5: movimientos con nombre, fórmulas y ángulos que cuentan como distintos |
| `references/06-revision-realismo.md` | Etapas 6 y 8: defectos típicos, cómo detectarlos y qué hacer |
| `references/07-registro-y-aprendizaje.md` | Etapa 9: registros, recetario, métricas y propuestas de reglas |
| `perfiles/torre-de-vega.yaml` | Siempre que el cliente sea Torre de Vega; modelo para otros clientes |
| `assets/plantilla-reel.yaml` | Punto de partida del plan de cada reel |
| `assets/ejemplo-reel09.yaml` | Ejemplo real rellenado (Reel 09) para ver el formato |
| `assets/contrato-plano.schema.json` | Esquema formal del plano; útil también como referencia de diseño para Society |
