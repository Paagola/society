# 06 · Revisión de realismo

El cliente detecta «se nota que es IA» en medio segundo. Esta revisión existe para detectarlo **antes**
que él, con criterios concretos, y para decidir qué hacer sin gastar a ciegas.

Orden: keyframes (barato de corregir) → clips (caro) → montaje (lo revisa la sesión de OpenMontage).

## Índice

1. Revisión de keyframes
2. Revisión de clips
3. Árbol de decisión
4. Reintentos y registro

---

## 1. Revisión de keyframes

Pon **cada keyframe junto a sus fotos reales** y recorre la lista. Un fallo aquí se arregla con «un
solo cambio»; en vídeo costaría el clip entero.

| Defecto | Cómo verlo | Regla |
|---|---|---|
| Objeto sin ancla (mueble, lámpara, planta, decoración) | Compara con la foto real de esa zona | 1 |
| Ancla cambiada (talla de la silla, relieve del plato, forma de la copa) | Superposición con la foto real | 1 |
| Logo, emblema o texto en mantel, plato, copa o botella | Zoom al 100 % en telas y etiquetas | 24 |
| Manchas, migas, gotas | Hoja de contactos de todas las tomas a la vez: las manchas destacan, la trama no | 25 |
| Algo debajo del plato | Borde inferior del plato | 26 |
| Plato comido, copa vacía | — | 15 |
| Blancos amarillentos | Manteles, platos, visillos | 9ter |
| Aspecto HDR de inmobiliaria | Todo igual de nítido y luminoso, nada cae en sombra | 9quinquies |
| Escala rara (copas enormes, platos pequeños) | Relación con la mano o la silla | — |
| Manos: dedos, uñas, joyería | Recorte a tamaño real | 6, 13 |
| Mano no pedida | P3 del Reel 09 | — |
| Ángulo repetido con otro keyframe | Todos los keyframes juntos | variedad de ángulos |
| La acción no está empezada | ¿Se puede confundir con una foto fija? | 12 |
| Sin sitio para el rótulo | ¿Queda limpio el tercio o la banda prevista? | — |

Corrige los defectos objetivos antes de enseñar el lote y di en la puerta C qué se corrigió.

---

## 2. Revisión de clips

### 2.1 Técnica (automática)

```bash
python scripts/revisar_clip.py clip.mp4 --keyframe K-P2.png [--end K-P2-fin.png] --salida revision/
```

| Aviso del script | Qué significa | Primera respuesta |
|---|---|---|
| Resolución distinta de 1080×1920 | Kling entrega 1076×1928; un alto por debajo de 1900 es un 720p | Reescalar en montaje; si es 720p, regenerar |
| Temblor | Movimiento irregular: lee como handheld | Reforzar la fórmula del slider y los negativos de cámara |
| Primer o último medio segundo parado | La cámara arranca o termina quieta | «already moving on the first frame and still moving on the last» |
| Foto congelada | Cámara parada y casi nada cambia | Si el plano no tiene acción, resolverlo en montaje (L1) |
| Deriva frente al keyframe | El clip no empieza como la imagen aprobada | Comprobar `start_image`; si persiste, otro modelo |
| No aterriza en el `end_image` | El corte a la toma fija saltará | Revisar que se pasó `end_image`; Seedance si era Kling |

Los umbrales son orientativos. Calíbralos pasando el script por los clips que el cliente ya aprobó y
anota los valores en el perfil.

### 2.2 Visual (a tamaño real)

Mira la hoja de contactos y después **recortes a tamaño real** de al menos tres momentos de cada plano
con manos (el Reel 09 revisó los fotogramas 10/40/74, 90/130/158 y 170/205/238 de la multitoma).

| Defecto | Dónde mirar |
|---|---|
| La comida se rehace entre fotogramas | Bordes de las piezas, patatas, lonchas |
| Dedos que cambian, se funden o se multiplican | Principio, mitad y final del gesto |
| Anillo o pulsera que aparece | Manos en todos los tramos |
| Líquido que no obedece la física (sube sin chorro, cambia de dirección, mancha) | Superficie de la copa y mantel |
| Objetos que se duplican o se deforman (sillas, copas, lámpara) | Fondo |
| Personas que aparecen | Fondo de sala |
| Luz que parpadea o salta | Apliques, bombillas |
| Texto o etiqueta que aparece | Botellas, manteles |
| El movimiento pedido no se hizo | Compara con `camara` del contrato (P8 del Reel 09: foco pedido, lateral entregado) |
| Criterios de rechazo del contrato | Uno por uno |

---

## 3. Árbol de decisión

Para cada clip, en este orden:

1. **¿Cumple los criterios de rechazo y la revisión?** → **Aceptar**. Anota el tramo útil para montaje.
2. **¿El defecto ya estaba en el keyframe?** → Corregir el keyframe con «un solo cambio» y regenerar el
   clip. El vídeo no arregla un fotograma malo.
3. **¿El defecto está en un tramo que el montaje no usa?** (el Reel 09 usó 1,9-2,4 s de cada 3,3 s) →
   **Aceptar recortando**, y anótalo.
4. **¿Es un defecto de movimiento** (temblor, arranque parado, movimiento equivocado)? → Regenerar con
   la fórmula de cámara reforzada y **todos** los negativos validados más el nuevo.
5. **¿Es un defecto de anatomía o física** (dedos, líquido, comida) en Kling? → Pasar a Seedance 2.5.
   En Seedance → simplificar la acción (un gesto más corto, la mano quieta antes).
6. **¿El plano no tiene acción propia?** → **Resolver en montaje** (L1).
7. **¿El mismo objeto sale inventado dos veces?** → **Eliminar el plano** y proponer otro con anclas
   fáciles (lección del botellero).

---

## 4. Reintentos y registro

- Máximo **dos reintentos por plano** sin consultar al cliente.
- Un trabajo que tarda no ha fallado: conserva el `job_id` y no lo dupliques.
- Antes de reintentar, anota en la generación: qué falló, qué cambias y por qué.
- En la multitoma, un fallo repite los tres planos: si solo falla uno, valora sacar ese plano a un clip
  propio.
- Todo intento, aprobado o no, va al registro de intentos (`07-registro-y-aprendizaje.md`) con modelo
  pedido y devuelto, parámetros efectivos, coste y motivo del descarte.
