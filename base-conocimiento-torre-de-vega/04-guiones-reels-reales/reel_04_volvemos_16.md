
---

## 8. Resultado de la generación (2026-09-09)

Las tres bandas están generadas y descargadas. Coste real: **10 créditos** (5 generaciones: 3 buenas
+ 2 descartadas por corrección).

| Banda | `job_id` | Fichero |
|---|---|---|
| 1 · `13:00` | `ac591f81-77f5-4a2a-8533-1fbe25a55096` | [`04_banda1_13h00.png`](../imagenes/generadas/reel_04_volvemos_16/04_banda1_13h00.png) |
| 2 · `13:20` | `c479cdf9-1ce1-4602-bc68-99009656fa7e` | [`04_banda2_13h20.png`](../imagenes/generadas/reel_04_volvemos_16/04_banda2_13h20.png) |
| 3 · `14:00` | `7e4628e4-2f03-4b0b-9dd4-653e6fb4abe4` | [`04_banda3_14h00.png`](../imagenes/generadas/reel_04_volvemos_16/04_banda3_14h00.png) |

Maqueta de los tres estados de revelado, para ver el formato de un vistazo:
[`maqueta_3_estados.jpg`](../imagenes/generadas/reel_04_volvemos_16/maqueta_3_estados.jpg).
Las bandas ya recortadas a 1080×640 están en `band_1.png`, `band_2.png` y `band_3.png`.

**`media_id` de las referencias reales** (válidos 24 h desde 2026-09-09 18:04 UTC):
`mesa-ventana` `76356515-9240-4d19-a700-6ec2bf2bb98f` · `mantel_blanco`
`4c3adfb4-7ca6-44e3-a684-a868f8d78df1` · `plato-blanco-formal` `77319a26-368f-4792-b8b1-a95f66f95b07` ·
fotograma de plantilla B `88340239-ea4f-4bcd-884d-85b74769307b` · `gambas`
`c2f00871-3c93-43cf-9c5d-5cb6a028c304` · `gambas2` `0e6a1e4d-834b-4364-9258-8816917892d2` · `pulpo`
`03fc2113-9c48-4927-ad5b-f84e386b54cb` · `croquetas` `adb44a43-0e60-471b-8880-c9469baf166d`.

### Verificación

| Punto | Resultado |
|---|---|
| Continuidad entre bandas (regla 19) | ✅ Mismo mantel, mismo plato con relieve, misma servilleta, mismos cubiertos en la misma posición, misma luz y misma cámara en las tres |
| Nada inventado (regla 1) | ✅ tras corregir — ver abajo |
| Manos de géneros distintos (regla 13) | ✅ mano de mujer a la izquierda, de hombre a la derecha, claramente distintas |
| Sin sobras (regla 15) | ✅ la banda 3 termina en mesa llena, con las dos copas **servidas**, no vacías |
| Acabado de iPhone (regla 17) | ✅ luz natural, contraste plano, blancos neutros, sin grano |
| Fuego/brasa/humo (regla 22) | ✅ no aparece ninguno |

### Las dos correcciones que hicieron falta

1. **Primera pasada de la banda 1: manos indistinguibles y sin acción.** Las dos manos salían del
   mismo tamaño y ambas quietas sujetando el cubierto. Se regeneró describiendo explícitamente
   *"a woman's slim hand … a man's noticeably larger and broader hand"* y el gesto a medias
   (*"her fingertips still pressing on it and the fork lying visibly at an angle"*).
2. ⚠️ **Segunda pasada: el modelo se inventó una servilleta con el logo `TORRE DE VEGA` impreso.**
   El prompt ya cerraba en `no text, no logo, no watermark` y aun así lo generó. Hizo falta
   prohibirlo por su nombre en `environment` **y** en `negatives`. Ver la regla 24 nueva de
   [`reglas_imagenes.md`](../imagenes/reglas_imagenes.md).

### Lo que queda flojo, dicho claramente

**La banda 1 no tiene una acción tan evidente como pide la regla 12.** Las manos sostienen los
cubiertos junto al plato y la cubertería está desalineada, pero en una imagen fija eso se lee como
"a punto de", no como "está pasando". Dos salidas:

- **Gratis:** aceptarlo. El hook real de este formato no es la acción, son **las dos bandas negras**
  — la atención frontoparietal de la plantilla pica en t=0 justamente por el hueco, no por el
  movimiento.
- **5,25 créditos:** animar solo la banda 1 con `kling3_0` `pro` `duration:3`. Una mano posando un
  cubierto **sí** tiene movimiento propio en el fotograma, así que aquí el modelo tiene de dónde
  sacarlo (a diferencia de un plato quieto). Es el único plano de los tres que merece animarse.
