# 24 hooks visuales para la primera toma

Estado: vigente · biblioteca de propuestas de dirección, no rendimiento validado. Fecha: 2026-09-26. Ámbito: primer plano del Reel. Fuentes: `integracion-reels.md`.

El hook es el acontecimiento visual: un gesto, movimiento o revelación. Debe entenderse sin rótulo y con el audio silenciado. Los tiempos son puntos de partida editoriales para la ruta multitoma del proyecto; no garantías del proveedor. El cuerpo del Reel lo decide el director.

Prioridad: metraje real apto → generación anclada permitida → simplificar el gesto → pedir material. No equiparar una escena publicitaria generada a una prueba real de textura, oficio o resultado.

## VH01 · El plato aterriza

**Mecanismo visual:** contacto y asentamiento. **Toma orientativa:** 1.2 s. **Riesgo:** medio.

**Fotograma inicial:** El plato ya entra por un lateral, a pocos centímetros de apoyarse. Se reconoce la comida y la mesa.

**Una acción:** Una mano termina de bajar el plato, lo apoya y se retira. Un solo gesto continuo.

**Estado final:** Plato apoyado y estable; comida y vajilla conservan forma y cantidad.

**Cámara:** Slider lateral corto que acompaña la entrada y frena al apoyar; foco en el borde delantero del plato.

**Material necesario:** producto: 1 × image/video, rol producto, ámbito target; mesa: 1 × image/video, rol mesa, ámbito restaurant

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The plate is already moving into frame. One hand lowers it the final few centimetres onto the referenced table, makes firm contact, then withdraws. A short lateral slider move follows and settles at contact. The dish keeps its exact shape, garnish and tableware. Real-time weight and natural motion blur.
```

**Rechazar:** El plato levita; Mano cruza vajilla; Comida se reorganiza al tocar la mesa

**Alternativa:** VH21 si el contacto falla; usar metraje real de servicio si existe.

## VH02 · La porción se levanta

**Mecanismo visual:** peso y anticipación. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** Una porción ya separada está sujeta por el borde o utensilio; las superficies visibles están documentadas.

**Una acción:** Elevar unos centímetros la porción con un movimiento breve; dejar que su forma responda al peso sin exagerarlo.

**Estado final:** Porción sostenida, unida al mismo utensilio o mano, sin alimentos nuevos ni hilos inventados.

**Cámara:** Tilt de gimbal ascendente que acompaña la porción, con el plato aún como referencia espacial.

**Material necesario:** porcion: 1 × image/video, rol porcion_visible, ámbito target; producto: 1 × image/video, rol producto, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The already separated, referenced portion is lifted a short distance in one continuous gesture. Follow it with a small upward gimbal tilt, keeping the original plate visible. Preserve the documented underside and filling. The portion has weight, settles naturally and remains securely supported. Do not add cheese strands.
```

**Rechazar:** Interior no documentado; El queso aparece sin referencia; Porción aumenta de tamaño

**Alternativa:** VH01 si solo existe foto del plato entero; solicitar referencia de la porción.

## VH03 · Hojas que caen y se posan

**Mecanismo visual:** caída con consecuencia. **Toma orientativa:** 1.2 s. **Riesgo:** medio.

**Fotograma inicial:** La mano acaba de soltar unas hojas del ingrediente confirmado sobre el plato; ya están en caída.

**Una acción:** Las hojas caen, giran brevemente, contactan con la comida y se quedan en ella.

**Estado final:** Hojas apoyadas con orientación variada; nada suspendido ni repetido como un sello.

**Cámara:** Dolly-in corto que frena cuando las hojas aterrizan; foco sobre la zona de llegada.

**Material necesario:** producto: 1 × image/video, rol producto, ámbito target; ingrediente: 1 × image/video, rol ingrediente, ámbito target

**Datos:** nombre_producto, ingrediente

**Bloque de movimiento orientativo, no prompt final:**

```text
A single hand has just released the confirmed garnish above the referenced dish. The leaves fall quickly under gravity, turn irregularly, land and settle. A short dolly-in stops at their landing. Preserve the original ingredients and quantities apart from this confirmed addition. Natural motion blur only on falling leaves.
```

**Rechazar:** Hojas flotantes; Hojas idénticas; Ingrediente no confirmado

**Alternativa:** VH24 para detalle sin añadir ingredientes.

## VH04 · El vaso toca la mesa

**Mecanismo visual:** impacto suave. **Toma orientativa:** 1.2 s. **Riesgo:** medio.

**Fotograma inicial:** Vaso sostenido a poca altura de la superficie, con contacto inminente.

**Una acción:** La mano apoya el vaso y sale del encuadre; el líquido se estabiliza con una oscilación pequeña.

**Estado final:** Base en contacto, nivel de líquido constante y vaso sin deformaciones.

**Cámara:** Arco muy corto alrededor del vaso, sin exponer un fondo no documentado; foco en base y contacto.

**Material necesario:** bebida: 1 × image/video, rol bebida, ámbito target; mesa: 1 × image/video, rol mesa, ámbito restaurant

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
One hand places the referenced glass onto the table and withdraws. The base makes clear contact; the liquid makes one small settling movement without changing level. A very short camera arc stays within the documented setting. Preserve glass geometry, markings and drink colour.
```

**Rechazar:** Líquido sube sin causa; Cristal se dobla; Dedos quedan pegados

**Alternativa:** VH20 si el vaso ofrece profundidad de foco; metraje real si está disponible.

## VH05 · El tenedor recoge pasta corta

**Mecanismo visual:** acción de utensilio. **Toma orientativa:** 1.2 s. **Riesgo:** alto.

**Fotograma inicial:** Un tenedor ya sujeta una pequeña cantidad de pasta corta identificada; el plato permanece visible.

**Una acción:** Levantar el tenedor con un recorrido breve y mantener la porción; no girarla como espaguetis.

**Estado final:** Mismo número aproximado de piezas, mismo tipo de pasta y mismo utensilio.

**Cámara:** Tilt ascendente pequeño que sigue el utensilio, sin órbita sobre la comida.

**Material necesario:** pasta: 1 × image/video, rol pasta_corta, ámbito target; utensilio: 1 × image/video, rol utensilio, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The fork already holds a small serving of the referenced short pasta. Lift it a short distance in one clear motion. A small upward tilt follows the fork while the plate stays in frame. Preserve the pasta shape and sauce; no twirling, no new strands and no extra utensils.
```

**Rechazar:** Rigatoni se convierte en espagueti; Utensilio atraviesa la mano; Salsa se transforma en queso

**Alternativa:** VH01; pedir toma real si el tenedor falla repetidamente.

## VH06 · Una vuelta de pasta larga

**Mecanismo visual:** giro de oficio. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** El tenedor ya está en contacto con pasta larga real identificada; no empieza en un plato vacío.

**Una acción:** Una sola vuelta corta recoge pasta y termina antes de una elevación compleja.

**Estado final:** Bocado recogido alrededor del tenedor; resto del plato conserva forma y volumen.

**Cámara:** Cámara cercana con seguimiento mínimo del gesto; foco en contacto tenedor-pasta.

**Material necesario:** pasta: 1 × image/video, rol pasta_larga, ámbito target; utensilio: 1 × image/video, rol utensilio, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The fork is already touching the referenced long pasta. Make one short, deliberate turn to gather a bite, then stop. Keep the plate and remaining strands stable. The camera makes a minimal motivated follow, focused on the fork contact. No second gesture or large lift.
```

**Rechazar:** Pasta se multiplica; Mano cambia de agarre; Giro interminable

**Alternativa:** Metraje real o VH24; no aplicar a pasta corta.

## VH07 · Un hilo de salsa cae

**Mecanismo visual:** vertido y expansión. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** Un hilo de salsa confirmada ya cae desde el recipiente referenciado hacia el plato.

**Una acción:** El vertido forma una pequeña zona de salsa y termina de manera visible.

**Estado final:** Salsa apoyada en la comida, recipiente deja de verter; sin atravesar sólidos.

**Cámara:** Slider lateral leve siguiendo el punto de impacto, no el recorrido completo del recipiente.

**Material necesario:** producto: 1 × image/video, rol producto, ámbito target; salsa: 1 × image/video, rol salsa, ámbito target; recipiente: 1 × image/video, rol recipiente_vertido, ámbito target

**Datos:** nombre_producto, ingrediente

**Bloque de movimiento orientativo, no prompt final:**

```text
A thin stream of the confirmed sauce is already falling from the referenced container onto the dish. The sauce spreads locally on contact, then the stream ends. Follow the impact point with a small lateral slider move. Preserve viscosity, colour, food geometry and a physically plausible amount.
```

**Rechazar:** Chorro atraviesa comida; Salsa de ingrediente desconocido; Cambio de viscosidad

**Alternativa:** VH03 con ingrediente sólido confirmado o VH24.

## VH08 · Cuchara que levanta arroz

**Mecanismo visual:** textura y peso. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** La cuchara está parcialmente dentro de la capa de arroz, con una porción ya recogida.

**Una acción:** Levantar una pequeña porción una sola vez, sin afirmar que revela socarrat no documentado.

**Estado final:** Arroz sostenido por la cuchara y resto estable; ninguna pieza de marisco aparece o desaparece.

**Cámara:** Seguimiento corto ascendente, foco en cuchara y borde del plato.

**Material necesario:** arroz: 1 × image/video, rol arroz, ámbito target; utensilio: 1 × image/video, rol utensilio, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The referenced spoon already contains a small portion of rice from the dish. Lift it gently in one short motion. Keep all visible seafood and garnish in their original positions. Follow the spoon with a small upward tilt. No invented crust, no new ingredients and no floating grains.
```

**Rechazar:** Socarrat inventado; Marisco desaparece; Granos suspendidos

**Alternativa:** VH21 o metraje real del gesto.

## VH09 · Leche entra en el café

**Mecanismo visual:** contraste de líquidos. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** La leche confirmada ya cae desde la jarra hacia una taza real de café; se ve el punto de contacto.

**Una acción:** Un vertido corto crea una forma simple y termina; no exigir una figura compleja no referenciada.

**Estado final:** Superficie coherente y cantidad plausible; taza y asa no cambian.

**Cámara:** Plano de tres cuartos con microseguimiento; foco en el contacto de los líquidos.

**Material necesario:** cafe: 1 × image/video, rol cafe, ámbito target; jarra: 1 × image/video, rol jarra, ámbito target

**Datos:** nombre_producto, ingrediente

**Bloque de movimiento orientativo, no prompt final:**

```text
A short stream of the confirmed milk pours from the referenced jug into the coffee. Show the light liquid meeting the dark surface and forming a simple swirl, then end the pour. Keep cup, handle, rim and liquid volume consistent. Small camera follow, no elaborate latte-art figure.
```

**Rechazar:** Taza cambia de forma; Dibujo complejo aparece de golpe; Leche no confirmada

**Alternativa:** VH04 para la bebida servida.

## VH10 · La extracción empieza

**Mecanismo visual:** nacimiento del producto. **Toma orientativa:** 1.4 s. **Riesgo:** bajo_con_metraje.

**Fotograma inicial:** El café está a punto de salir en un clip real de la máquina del negocio.

**Una acción:** Recortar para que las primeras gotas o el flujo empiecen inmediatamente.

**Estado final:** Flujo y taza siguen perteneciendo a la misma toma real.

**Cámara:** Conservar cámara real; reencuadre moderado sin ocultar máquina o taza.

**Material necesario:** extraccion: 1 × video, rol extraccion, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
EDIT ONLY: use the real extraction clip. Start just before the first visible drops, preserve continuity and the original machine. Do not synthesize or replace the extraction. Keep the useful action inside the opening shot.
```

**Rechazar:** Máquina inventada; Café o taza sustituidos; Demora inicial sin acción

**Alternativa:** VH04 con taza referenciada; pedir clip si la máquina debe aparecer.

## VH11 · El corte revela el interior

**Mecanismo visual:** revelación física. **Toma orientativa:** 1.4 s. **Riesgo:** bajo_con_metraje.

**Fotograma inicial:** El filo ya está en contacto con el alimento, en un vídeo real que permite ver el resultado.

**Una acción:** Completar el tramo del corte que separa las partes y revela el interior.

**Estado final:** Interior visible y pieza de origen reconocible, sin saltar a otro alimento.

**Cámara:** Conservar eje de cámara del clip real y evitar un corte antes de la revelación.

**Material necesario:** corte: 1 × video, rol corte, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
EDIT ONLY: use the real cutting footage. Begin with the blade already in contact and keep the actual separation visible. Preserve the same piece, its real interior and the original action. Do not regenerate the inside of the food.
```

**Rechazar:** Interior generado como prueba; Cambio de pieza; Revelación llega después del hook

**Alternativa:** VH02 con porción documentada; VH24 si solo hay exterior.

## VH12 · El pan se abre

**Mecanismo visual:** fractura y textura. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** Dos manos ya sujetan una hogaza con la apertura iniciada; la miga está documentada en otra referencia.

**Una acción:** Separar las mitades un poco más en una sola acción y detenerse con la miga visible.

**Estado final:** Dos mitades reconocibles, miga consistente, sin vapor o elasticidad añadidos.

**Cámara:** Dolly-out corto para conservar ambas mitades en cuadro; foco en la separación.

**Material necesario:** pan: 1 × image/video, rol pan_abierto, ámbito target; producto: 1 × image/video, rol producto, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
Two hands hold the referenced bread with the split already started. Pull the halves a small distance apart in one deliberate gesture, revealing only the documented crumb. A short pull-back keeps both halves visible. No invented steam, elastic dough or duplicated fingers.
```

**Rechazar:** Miga desconocida; Pan se estira como queso; Dedos duplicados

**Alternativa:** Metraje real o VH24 del exterior.

## VH13 · La porción de tarta sale

**Mecanismo visual:** oculto a visible. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** La espátula ya está debajo de una porción separada; todas sus capas están referenciadas.

**Una acción:** Desplazar la porción unos centímetros fuera del conjunto sin cortar ni deformar capas.

**Estado final:** Porción apoyada en espátula con capas estables y hueco consistente en la tarta.

**Cámara:** Slider lateral acompasado con la salida; foco en las capas documentadas.

**Material necesario:** porcion: 1 × image/video, rol porcion_visible, ámbito target; producto: 1 × image/video, rol producto, ámbito target; utensilio: 1 × image/video, rol utensilio, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The spatula is already under the separated, documented cake slice. Move the slice a short distance outward while keeping every layer rigid and consistent. Follow with a small lateral slider move. The remaining cake keeps its shape and the gap stays consistent.
```

**Rechazar:** Relleno nuevo; Porción flotante; Hueco se cierra solo

**Alternativa:** VH24 si solo hay foto exterior; solicitar una referencia cortada.

## VH14 · La bola de helado se deposita

**Mecanismo visual:** apoyo y liberación. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** Una bola ya formada está sobre la cuchara, muy cerca de la tarrina o recipiente real.

**Una acción:** Depositar la bola y retirar el utensilio en un gesto corto.

**Estado final:** Bola apoyada con deformación pequeña y plausible; nada suspendido.

**Cámara:** Tilt descendente corto siguiendo el contacto; foco en base de la bola.

**Material necesario:** helado: 1 × image/video, rol helado, ámbito target; utensilio: 1 × image/video, rol utensilio, ámbito target; recipiente: 1 × image/video, rol recipiente, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The scoop already holds one formed ball of the referenced ice cream just above the real container. Lower it, release it onto the surface and withdraw the utensil. Follow with a small downward tilt. Preserve flavour colour and texture; no floating ball or instant melting.
```

**Rechazar:** Bola flota; Helado líquido de repente; Utensilio se fusiona

**Alternativa:** VH24 de textura; metraje real para el servicio completo.

## VH15 · La tapa deja ver el plato

**Mecanismo visual:** revelación por oclusión. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** La tapa ya está ligeramente levantada y el producto documentado asoma por el hueco.

**Una acción:** Elevar la tapa lo justo para descubrir el plato; sin vapor añadido por defecto.

**Estado final:** Producto y recipiente coinciden con la referencia abierta.

**Cámara:** Cámara a tres cuartos con pequeño dolly-in que se detiene al revelar.

**Material necesario:** cerrado: 1 × image/video, rol producto_con_tapa, ámbito target; abierto: 1 × image/video, rol producto_sin_tapa, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The lid is already partly lifted above the referenced container. Raise it just enough to reveal the documented dish underneath. Make a short dolly-in that settles at the reveal. Preserve lid, container and food exactly. Do not invent steam or hidden ingredients.
```

**Rechazar:** Contenido no referenciado; Recipiente cambia; Tapa atraviesa comida

**Alternativa:** VH01 sin tapa si no hay ambos estados.

## VH16 · La llama responde al gesto

**Mecanismo visual:** cambio luminoso real. **Toma orientativa:** 1.2 s. **Riesgo:** bajo_con_metraje.

**Fotograma inicial:** La acción del cocinero y la reacción del fuego están a punto de coincidir en un clip real.

**Una acción:** Comenzar justo antes del aumento real de llama y conservar su causa.

**Estado final:** La llama vuelve al nivel que muestra ese clip, sin amplificarla artificialmente.

**Cámara:** Conservar el movimiento real que acompaña la acción; no añadir un giro imposible.

**Material necesario:** fuego: 1 × video, rol fuego, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
EDIT ONLY: use the actual cooking clip. Keep the real cause and response of the flame in the same opening shot. Preserve the original scale of the fire and the real equipment. Do not synthesize, enlarge or extend the flame.
```

**Rechazar:** Fuego prohibido por el perfil; Llama generada sin causa; Cocina ajena

**Alternativa:** VH01; no fabricar un horno para obtener impacto.

## VH17 · La espátula gira la pieza

**Mecanismo visual:** cambio de cara real. **Toma orientativa:** 1.2 s. **Riesgo:** bajo_con_metraje.

**Fotograma inicial:** La espátula ya ha tomado contacto con el alimento en el clip real.

**Una acción:** Mantener el tramo donde gira y se apoya la pieza.

**Estado final:** La cara que aparece es la real y el alimento aterriza en la misma superficie.

**Cámara:** Seguir cámara del metraje; sin un corte que esconda el aterrizaje.

**Material necesario:** volteo: 1 × video, rol volteo, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
EDIT ONLY: use the actual turning action, from established spatula contact to the landing. Preserve both real surfaces of the food and the true cooking setup. Do not regenerate the hidden side or replace the landing.
```

**Rechazar:** Cara oculta inventada; Comida atraviesa plancha; Aterrizaje fuera de plano

**Alternativa:** VH24 del acabado si falta vídeo.

## VH18 · La masa se estira una vez

**Mecanismo visual:** deformación con causa. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** La masa cruda está sujeta con el agarre de oficio y la tensión ya es visible.

**Una acción:** Un estiramiento corto cambia su forma y termina; no añadir lanzar, girar y amasar a la vez.

**Estado final:** Masa más extendida sobre la misma superficie, sin agujeros o ingredientes nuevos.

**Cámara:** Seguimiento lateral breve de la mano dominante; foco en la zona de tensión.

**Material necesario:** masa: 1 × image/video, rol masa_cruda, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The hands already hold the referenced raw dough with a plausible working grip. Perform one short controlled stretch, then settle the dough onto the same surface. Follow the dominant hand with a small lateral move. Preserve the dough amount and texture; no toss, spin or extra kneading.
```

**Rechazar:** Masa inferida desde pizza cocinada; Dedos sin función; Varios gestos en una toma

**Alternativa:** Solicitar metraje real de masa; VH01 si solo existe plato cocinado.

## VH19 · Un ingrediente rueda y frena

**Mecanismo visual:** trayectoria y parada. **Toma orientativa:** 1.2 s. **Riesgo:** medio.

**Fotograma inicial:** Un ingrediente redondo confirmado ya rueda sobre una superficie real, cerca de su destino.

**Una acción:** Recorrer una distancia corta y perder velocidad hasta detenerse.

**Estado final:** Ingrediente apoyado y estable, sin choque espectacular ni transformación.

**Cámara:** Travelling lateral corto a la altura de la superficie, sin revelar entorno no documentado.

**Material necesario:** ingrediente: 1 × image/video, rol ingrediente_redondo, ámbito target; superficie: 1 × image/video, rol mesa, ámbito restaurant

**Datos:** nombre_producto, ingrediente

**Bloque de movimiento orientativo, no prompt final:**

```text
One confirmed round ingredient is already rolling a short distance on the referenced surface. Follow it laterally at surface level as it slows naturally and comes to rest. Preserve its size, texture and shape. No bouncing, floating, transformation or additional objects.
```

**Rechazar:** Ingrediente rueda contra gravedad; Escala cambia; No pertenece al producto

**Alternativa:** VH03 si hay caída compatible o VH24.

## VH20 · El foco descubre el héroe

**Mecanismo visual:** revelación óptica. **Toma orientativa:** 1.2 s. **Riesgo:** bajo_medio.

**Fotograma inicial:** Un elemento real cercano ocupa primer término y el producto ya se reconoce parcialmente al fondo.

**Una acción:** Un único cambio de foco lleva la atención desde ese elemento al plato.

**Estado final:** Producto nítido y primer término desenfocado; ninguna cosa cambia de sitio.

**Cámara:** Rack focus único con cámara de recorrido mínimo; no combinar órbita ni zoom de efecto.

**Material necesario:** capas: 1 × image/video, rol capas_foco, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
Both foreground and hero dish are present in the reference. Perform one decisive rack focus from the near element to the hero dish, with only minimal camera drift. Objects remain stationary and unchanged. End with the dish sharp and the foreground optically soft.
```

**Rechazar:** Desenfoque digital tapa todo; No hay profundidad real en referencia; Cambio de producto al enfocar

**Alternativa:** VH21 si solo existe una capa legible.

## VH21 · Entrada lateral al plato

**Mecanismo visual:** paralaje con contexto. **Toma orientativa:** 1.2 s. **Riesgo:** bajo_medio.

**Fotograma inicial:** El producto está visible desde el inicio junto a referencias de mesa que permiten leer profundidad.

**Una acción:** Un desplazamiento lateral breve cambia la relación entre primer término y plato.

**Estado final:** El plato sigue reconocible y no se han inventado lados o fondos nuevos.

**Cámara:** Slider lateral de recorrido corto, a altura de mesa; termina sobre un detalle visible, sin atravesar comida blanda.

**Material necesario:** contexto: 1 × image/video, rol producto_contexto, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
The dish is already clearly visible in its referenced table setting. Make one short lateral slider move at table height, creating restrained parallax with existing foreground objects. End on a documented detail. Preserve geometry and do not reveal unreferenced parts of the room or travel across soft food.
```

**Rechazar:** Se convierte en zoom digital; Mesa o plato se deforman; Aparece cocina fuera de referencia

**Alternativa:** Reencuadre de metraje real; no prolongar una foto inmóvil sin motivo.

## VH22 · Un objeto sale y revela

**Mecanismo visual:** oclusor motivado. **Toma orientativa:** 1.2 s. **Riesgo:** medio_alto.

**Fotograma inicial:** Un objeto real y autorizado tapa parte del producto, que ya asoma en el encuadre.

**Una acción:** Una mano aparta el oclusor en una dirección y deja ver el plato.

**Estado final:** El oclusor sale; el producto detrás coincide con su referencia completa.

**Cámara:** Cámara con seguimiento leve del gesto que se detiene sobre el plato; sin transición añadida.

**Material necesario:** oclusor: 1 × image/video, rol oclusor, ámbito target; producto: 1 × image/video, rol producto, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
A referenced foreground object partly obscures the documented dish. One hand moves the object out of the way in a single direction, revealing the same dish behind it. Make a slight motivated camera follow and settle on the food. No morphing or artificial transition.
```

**Rechazar:** Objeto no anclado; Plato cambia durante oclusión; Mano sin causa

**Alternativa:** VH24 para revelar por encuadre sin objetos extra.

## VH23 · La mesa recibe el último plato

**Mecanismo visual:** acumulación en un gesto. **Toma orientativa:** 1.4 s. **Riesgo:** alto.

**Fotograma inicial:** Una mesa referenciada ya contiene parte del pedido; un último plato confirmado está entrando.

**Una acción:** Una mano coloca solo ese último plato y completa una composición realista.

**Estado final:** Todos los productos conservan identidad, escala y espacio; la mesa no se llena por apariciones.

**Cámara:** Dolly-out corto acompaña la llegada y muestra el conjunto documentado.

**Material necesario:** catalogo: 2 × image/video, rol producto, ámbito catalogue; mesa: 1 × image/video, rol mesa, ámbito restaurant

**Datos:** nombre_producto, seleccion_carta

**Bloque de movimiento orientativo, no prompt final:**

```text
The referenced table already holds the confirmed dishes. One hand brings in only the final documented plate and sets it down. A short pull-back reveals the completed arrangement. Keep every dish, plate count and scale consistent. Nothing appears by itself or transforms between dishes.
```

**Rechazar:** Composición no cabe en mesa; Platos aparecen solos; Pack o raciones inventados

**Alternativa:** VH01 con un solo plato; no fusionar platos para ampliar catálogo.

## VH24 · De textura al plato

**Mecanismo visual:** revelación de escala. **Toma orientativa:** 1.2 s. **Riesgo:** bajo_medio.

**Fotograma inicial:** Una textura real visible ocupa parte del cuadro, con una pista suficiente para reconocer comida.

**Una acción:** La cámara se retira brevemente y revela el plato completo documentado.

**Estado final:** El espectador entiende a qué plato pertenece la textura antes de pasar a la segunda toma.

**Cámara:** Dolly-out corto desde el detalle hacia el encuadre general ya disponible; no órbita ni macro viajando por la superficie.

**Material necesario:** detalle: 1 × image/video, rol detalle, ámbito target; producto: 1 × image/video, rol producto, ámbito target

**Datos:** nombre_producto

**Bloque de movimiento orientativo, no prompt final:**

```text
Start close to the documented food texture, with a recognisable food cue still visible. Make one short pull-back to reveal the same complete dish shown in the wider reference. Preserve texture, plate shape and setting. Do not orbit, travel across the food surface or reveal an unknown interior.
```

**Rechazar:** Textura irreconocible sin recompensa; La retirada descubre otro plato; Intro lenta sin cambio legible

**Alternativa:** VH21 o VH01 si el detalle carece de calidad suficiente.
