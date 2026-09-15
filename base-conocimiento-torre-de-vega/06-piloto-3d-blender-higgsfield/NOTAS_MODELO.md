# Torre de Vega — Blockout 3D (Blender)

Archivo: `torre_de_vega_blockout.blend`

## Qué es esto
Un **blockout** (bloques de volumen, sin acabados) del local, pensado para poder
planificar movimientos de cámara, transiciones y recorridos de vídeo reales del
restaurante — no es un modelo decorativo ni renderizado final.

## Fuentes usadas (nada inventado más allá de lo indicado)
- `C:\Users\victo\Downloads\plamo.png`: plano aéreo de Google Maps con el contorno
  de la parcela y las zonas (RESTAURANTE, BARRA, PARRILLA, TERRAZA) dibujadas a mano.
  De aquí sale toda la forma/proporción del terreno y de cada zona.
- Fotos en `imagenes/local/`: usadas para entender qué hay en cada zona y cómo se
  conectan (entrada, barra con dos arcos de ladrillo, comedor con chimenea de
  piedra en una esquina, terraza exterior con luces de guirnalda).

## Escala
**No hay medidas reales confirmadas.** Se usó una escala arbitraria de
`1 px del plano = 0.025 m` solo para mantener proporciones internas coherentes
(ancho relativo de cada zona, etc.). El tamaño en metros absolutos NO está
verificado — si en algún momento consigues una medida real (p. ej. el ancho de
la fachada, o el largo del salón), dímelo y reescalo todo el modelo con un único
factor de corrección, sin tocar las proporciones.

## Qué es dato firme vs. aproximado

**Firme (trazado directo del plano aéreo):**
- Contorno completo de la parcela (`Parcela_Terreno`).
- Forma y proporciones del edificio principal restaurante+barra (`01_Restaurante_Barra`).
- Forma del edificio secundario rectangular (`02_Edificio_Secundario`) — **su uso real
  no está confirmado por fotos**, solo se sabe que existe y su forma.
- Posición y tamaño relativo de la caseta de `PARRILLA`.
- Zona de `TERRAZA` (contorno pavimentado) — de esta zona casi no había fotos, así
  que solo está bloqueada como superficie exterior sin paredes ni mobiliario.
- División aproximada dentro del edificio 1 entre zona de comedor y zona de barra,
  siguiendo la etiqueta y la línea roja del plano.

**Aproximado / inferido de fotos (marcado explícitamente en la escena, sufijo `_APROX`
o como objetos en la colección `05_Referencias`):**
- Partición interior con dos huecos de arco entre barra y comedor: la posición general
  viene del plano (línea vertical con dos "cuadraditos"), pero el ancho exacto de cada
  arco se ajustó a ojo comparando con la foto de las dos arcadas de ladrillo
  (`entrada-restaurante.jpg`).
- Mostrador de la barra: forma tomada del trazo rojo angular del plano + referencia de
  altura de barra real (fotos `barra-mesas.jpg`, `barra_botellas.jpg`).
- Bloque de la chimenea: **posición dentro de la esquina del comedor es una suposición**
  basada en que las fotos (`chimenea-restaurante.jpg`) muestran una chimenea de piedra
  en una esquina con un cuadro a cada lado, pero el plano aéreo no indica en qué esquina
  exacta está. Está marcada como `Chimenea_APROX` y con una etiqueta de texto para que
  no se confunda con dato verificado.

**Sin cubrir todavía (pendiente de más fotos o medidas):**
- Mobiliario real (mesas, sillas) — no se han colocado, solo el volumen de las salas.
- Ventanas y puertas exteriores (solo hay muros ciegos por ahora).
- Altura real de techo (se usó 3 m como valor de bloque estándar, sin confirmar).
- Detalle de la terraza (mesas, iluminación, vallado) — casi no hay fotos de esta zona.

## Cámaras ya preparadas
- `Camara_Planta`: cámara ortográfica cenital, útil para comparar con el plano aéreo.
- `Camara_Paseo_Comedor`: cámara a altura de persona (1.6 m) dentro del comedor, punto
  de partida para bloquear un recorrido de vídeo.

## Siguiente paso recomendado
Si me pasas más fotos de la terraza y confirmas (aunque sea aproximado) la posición
real de la chimenea y una medida de referencia en metros, afino el modelo sin tener
que rehacer nada de la estructura ya construida.
