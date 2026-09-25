# 07 · Registro y aprendizaje

Cada Reel tiene que dejar el siguiente más fácil. Para eso se guardan cuatro cosas, siempre en el mismo
formato: los intentos, las recetas que funcionaron, el historial con métricas y las reglas propuestas.

## Índice

1. Registro de intentos
2. Recetario validado
3. Historial de reels y métricas
4. Aprendizajes propuestos

---

## 1. Registro de intentos

El registro vive en `generaciones:` del propio plan. **Ningún intento se borra**: los descartados se
quedan con `estado: descartado` y dos campos más:

```yaml
- id: K-P5-v1
  tipo: imagen
  planos: [P5]
  modelo: nano_banana_pro
  modelo_devuelto: nano_banana_2
  params: {resolution: 2k, aspect_ratio: "9:16"}
  coste_real_creditos: 2
  estado: descartado
  motivo_descarte: "texto legible en la etiqueta de la botella"
  corregido_en: K-P5
```

Lo que el registro permite responder después: cuánto costó de verdad un plano (con sus descartes), qué
modelo sirvió la plataforma y qué defecto se repite. Es también la evidencia que necesita Society para
el control de presupuesto y los reintentos acotados.

---

## 2. Recetario validado

Cuando el cliente aprueba un clip, su prompt pasa al recetario del cliente
(`<carpeta_cliente>/recetas/<tipo_de_plano>.yaml`). Tipos de plano: `vertido`, `mano_coloca`, `silla`,
`corte`, `sala_parallax`, `lampara`, `copa_primer_plano`, `plato_cenital`…

```yaml
- receta: vertido_vino_ras_de_mesa
  reel: reel_09_volvemos_a_abrir
  generacion: V1 (tramo 2)
  modelo: seedance_2_5
  params: {mode: omni_reference, resolution: 1080p, generate_audio: false}
  estilo_de_luz: dramatico
  prompt_motion: "the ruby wine stream keeps pouring continuously from the bottle into the nearest glass; ..."
  prompt_camera: "a slow motorised push-in of about five percent toward the glass and the stream ..."
  por_que_funciono: "keyframe con el chorro ya cayendo; botella sin etiqueta visible"
  aprobado_por_cliente: 2026-09-17
```

Antes de escribir un prompt nuevo, **busca en el recetario una receta del mismo tipo** y parte de ella.
Una receta aprobada vale más que cualquier plantilla genérica, porque ya pasó el ojo del cliente.

---

## 3. Historial de reels y métricas

Un archivo por cliente, `<carpeta_cliente>/historial-reels.yaml`. El linter lo lee con `--historial`
para avisar si se repite mecanismo creativo.

```yaml
reels:
  - id: reel_09_volvemos_a_abrir
    fecha_publicacion: 2026-09-28
    mecanismo: M3
    gancho: "mano retirando la silla + VOLVEMOS A ABRIR"
    duracion_s: 11.4
    escalones: {L0: 0, L1: 0, L4: 6}
    coste_real_creditos: 125.25
    versiones_hasta_aprobar: 5
    metricas:
      "+24h":  {visualizaciones: null, abandono_3s: null, compartidos: null, guardados: null, alcance_no_seguidores: null}
      "+72h":  {}
      "+7d":   {}
      "+28d":  {}
    comparacion: "frente a la mediana de los 5 últimos reels"
    lectura: ""
```

Reglas de medición (informe de estrategia de redes):

- Métricas oficiales de Instagram capturadas a **+24 h, +72 h, +7 días y +28 días**.
- Se compara con la **mediana de las últimas piezas del mismo formato**, nunca con valores absolutos.
- En Torre de Vega, el objetivo medible es bajar al menos una vez del **65 % de abandono a los 3 s** y
  ver qué hace el algoritmo con un Reel que retiene; los compartidos pesan más que el montaje.
- La aprobación creativa del cliente no sustituye los datos: se registran las dos cosas.

---

## 4. Aprendizajes propuestos

Al cerrar el reel, en `aprendizajes_propuestos:` del plan. Formato:

```yaml
- propuesta: "No confiar a Kling 3.0 un cambio de foco"
  evidencia: "P8 del Reel 09: se pidió rack focus y devolvió desplazamiento lateral"
  alcance: modelo        # pieza | cliente | modelo | producto
  destino: "reglas_videos.md"
  fecha: 2026-09-17
```

- **Nunca** se escribe en las reglas del cliente ni en su `CLAUDE.md` sin su aprobación explícita.
- Distingue el alcance: una preferencia de esta pieza (la luz natural del chuletón) no es una regla del
  cliente, y una regla del cliente no es una regla de Society.
- Un patrón solo se convierte en regla si se repite.
- Si una propuesta aprobada cambia algo del perfil (`perfiles/<cliente>.yaml`), actualiza también el
  perfil con la fecha, para que el linter lo aplique en la siguiente pieza.
