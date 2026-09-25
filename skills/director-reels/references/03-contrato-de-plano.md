# 03 · El contrato de plano

Un plano no está listo cuando «se entiende», sino cuando **cada decisión está escrita y se puede
comprobar**. El plan (`plan.yaml`) separa dos cosas que en el caso práctico iban mezcladas:

- **`planos:`** son unidades de montaje: lo que el espectador ve entre dos cortes.
- **`generaciones:`** son llamadas a la API: un keyframe, un clip, una multitoma.

Una generación puede producir varios planos (la multitoma V1 del Reel 09 dio P2, P5 y P6) y un plano
real no tiene generación. Esta separación es también la que necesita el modelo de datos de Society
(Escena ↔ Intento de generación).

Ejemplo completo: `assets/ejemplo-reel09.yaml`. Esquema formal: `assets/contrato-plano.schema.json`.

## Índice

1. Campos del plano
2. Campos de la generación
3. Bloque de montaje
4. Códigos del linter

---

## 1. Campos del plano

| Campo | Qué es | Qué regla hace cumplir |
|---|---|---|
| `id` | `P1`, `P2`… Estable aunque el orden cambie | Trazabilidad entre guion, clips y montaje |
| `funcion` | `gancho`, `desarrollo`, `heroe`, `prueba`, `cierre` | Un solo `heroe` por Reel (ley 4) |
| `t` | `[inicio, fin]` en segundos de la pieza final | Gancho de 2-2,5 s; línea de tiempo sin huecos |
| `escalon` | `L0`-`L4` | Escalera de realidad (`01` §2) |
| `justificacion_escalon` | Por qué no sirve el escalón de abajo | Obligatoria desde L2 |
| `fuente` | `{tipo: real, ruta, tramo}` o `{tipo: generado}` | Material real primero |
| `generacion` | Id de la generación de **vídeo** que produce el plano | Todo plano generado sale de un clip trazable |
| `accion.descripcion` | Una frase, en español, de lo que pasa | Una acción principal (ley 5) |
| `accion.clase` | `simple`, `compleja`, `ninguna` | Kling para simple, Seedance 2.5 para compleja (regla 18) |
| `accion.origen_movimiento` | `liquido`, `mano`, `objeto_en_curso`, `fuego`, `vapor`, `camara`, `ninguno` | Test de movimiento (`01` §3); fuego solo real |
| `contiene` | `mesa`, `plato`, `copa`, `manos`, `comida`, `liquido`, `silla`, `lampara`… | Activa los negativos condicionales del perfil |
| `anclas` | Ids de `verdad.anclas` presentes en el plano | Sin ancla no hay plano (ley 2) |
| `manos` | `[mujer]`, `[hombre]`, `[mujer, hombre]` | Géneros distintos en un plano y predominio femenino (regla 13) |
| `angulo` | `{posicion, altura, lente_mm}` | Variedad real de ángulos (2026-09-15): cuenta la pareja posición-altura, no la focal |
| `camara` | `{movimiento, aparato, recorrido, direccion}` | Movimiento con intención y distinto al del plano anterior (regla 9) |
| `excepcion_angulo` | Referencia y transición estudiada que obligan a repetir encuadre | Única excepción admitida |
| `beats` | Lista de `{t, accion, estado_final}` | El último beat necesita un estado final visible |
| `transicion` | `{entrada, salida}` | Transiciones en cámara (`02` §3) |
| `rotulo` | Texto en pantalla | Obligatorio en el gancho (regla 12) |
| `criterios_rechazo` | Lo que invalida el clip, escrito **antes** de generarlo | La revisión compara contra esto, no contra el gusto del momento |
| `incidencias` | Lo que pasó y no estaba previsto | Alimenta el aprendizaje |
| `coste_est_creditos` | Parte del coste imputable al plano | Control de presupuesto |

### Valores de `angulo`

- `posicion`: `frontal`, `tres_cuartos`, `lateral`, `cenital`, `contrapicado`, `picado`.
- `altura`: `ras_de_mesa`, `mesa`, `sentado`, `respaldo`, `de_pie`, `alto`, `bajo`.

Dos planos con la misma pareja cuentan como **el mismo ángulo** aunque cambien la lente o el recorte.
Criterio del cliente (reel del chuletón): un macro desde el mismo tres cuartos no es otro ángulo.

### Valores de `camara.movimiento`

`push_in`, `pull_back`, `lateral`, `arco`, `grua_bajada`, `grua_subida`, `tilt`, `foco`, `bloqueada`.
Su traducción a prompt está en `05-vocabulario-camara.md`. `bloqueada` solo con el formato «mismo plano,
cambia el plato» (regla 14) o con `excepcion_angulo`.

### Cómo escribir `criterios_rechazo`

Concretos y observables, pensados para el plano: «anillo que aparece», «el vino mancha el mantel»,
«la silla cambia de talla», «la cámara arranca parada». Nunca «que quede bien».

---

## 2. Campos de la generación

| Campo | Qué es |
|---|---|
| `id` | `K-P2` (keyframe del plano P2), `V1` (clip), `V-P3`… |
| `tipo` | `imagen` o `video` |
| `planos` | Planos que salen de esta generación |
| `modelo` | Nombre exacto en la plataforma (`nano_banana_pro`, `kling3_0`, `seedance_2_5`) |
| `params` | Los parámetros **tal como se envían**: `resolution`, `aspect_ratio`, `mode`, `duration`, `sound` / `generate_audio`, `declined_preset_id` |
| `referencias` | Solo imagen: `{ruta, rol, fidelidad, excluir}` en el orden de `medias[]` |
| `medias` | Solo vídeo: `{rol: start_image \| end_image \| image_references, desde: K-P2}` |
| `prompt` | Texto exacto enviado. En imagen, el JSON del Decoded Brief en una línea |
| `coste_est_creditos` | Del preflight `get_cost` |
| `estado` | `pendiente`, `generado`, `aprobado`, `descartado` |
| `job_id` | Guárdalo en cuanto lo tengas: una espera no es un fallo |
| `modelo_devuelto` | El que sirvió la plataforma (el Reel 09 pidió `nano_banana_pro` y recibió `nano_banana_2`) |
| `salida_real` | Resolución, fps y duración medidas con `revisar_clip.py` |
| `justificacion_duracion` | Si Kling no va a 3 s |

### Grados de `fidelidad`

| Grado | Significa | Uso típico |
|---|---|---|
| `completa` | Lo que aparece en la referencia aparece igual | Foto real de la silla, el plato, la copa |
| `parcial` | Sobreviven las partes nombradas en `rol`; el resto es libre | Foto de sala usada solo para pared y techo |
| `atributo` | Un rasgo nombrado se aplica a otro objeto nombrado | Textura del mantel real sobre otra mesa del mismo local |
| `guia` | Solo ángulo, encuadre, luz o ritmo; nada se copia | Fotograma de la plantilla de referencia (regla 10) |

Toda referencia `guia` necesita `excluir`. Toda generación de imagen necesita al menos una referencia
`completa`.

---

## 3. Bloque de montaje

`montaje:` es lo que lee la sesión de OpenMontage. Una entrada por plano: `clip`, `entrada_s`,
`salida_s`, `rotulo` (con cuerpo, tracking y altura si ya se han medido), `transicion`, `ritmo` y
`sonido`. Esta skill decide la **intención** (dónde se corta y por qué); el montaje decide la ejecución.

---

## 4. Códigos del linter

Los **errores** bloquean la puerta; los **avisos** se presentan al cliente y, si se aceptan, con motivo.

| Código | Qué detecta |
|---|---|
| E01 | Falta una sección o el `tipo` de una generación |
| E02 | Campo del brief vacío |
| E03 | Ruta que no existe (con `--raiz`) |
| E04 | `t` mal escrito |
| E10 | Gancho que no empieza en 0 o sin rótulo |
| E11 | Fotograma 1 sin movimiento real |
| E12 | Fuego, brasa o humo generados |
| E13 | Escalón inválido o sin justificación |
| E14 | Ángulo repetido sin excepción |
| E15 | Plano generado sin generación de vídeo válida |
| E16 | Modelo prohibido, texto a vídeo o `end_image` no admitido |
| E17 | Acción compleja con un modelo no previsto |
| E18 | Dos manos del mismo género en un plano |
| E20 | Relación de aspecto distinta de 9:16 |
| E21 | Resolución por debajo del mínimo |
| E22 | Bloques del prompt de vídeo ausentes o desordenados |
| E23 | Falta la coda «Photographic realism, no text.» |
| E24 | Falta un negativo validado del perfil |
| E25 | Handheld o «static camera» pedidos, o palabras vacías (8k, hyperrealistic…) |
| E26 | Imagen con resolución incorrecta o JSON inválido o incompleto |
| E27 | Referencias sin fidelidad, sin ancla completa o guía sin exclusión |
| E28 | Cámara sin «already moving on the first frame» |
| E29 | Plano generado sin beats o sin estado final |
| E30 | Coste por encima del presupuesto |
| W01 | Gancho fuera de 2-2,5 s |
| W02 | Mismo movimiento de cámara que el plano anterior |
| W03 | Nada se mueve en un plano L3-L4 |
| W04 | Kling con duración distinta de la por defecto |
| W05 | Acción simple con Seedance fuera de una multitoma |
| W06 | Predominio de manos contrario al perfil |
| W07 | Coste por encima del 80 % del presupuesto |
| W08 | Hueco o solape en la línea de tiempo |
| W09 | Duración total lejos de la orientativa |
| W10 | Mecanismo creativo repetido (con `--historial`) |
| W11 | Demasiadas referencias en una imagen |
| W12 | Ancla difícil en un plano L4 |
| W13 | Metraje real ya usado |
| W15 | Prompt no incluido en el plan |
| W16 | Sin presupuesto |

El linter comprueba lo que se puede comprobar con reglas. No ve manos deformes ni comida que cambia:
eso es trabajo de `06-revision-realismo.md`.
