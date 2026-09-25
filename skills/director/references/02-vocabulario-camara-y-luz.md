# 02 · Vocabulario de cámara, óptica, luz y sonido

Términos precisos para escribir planos. Reúne el vocabulario de smixs (CC BY 4.0), los controles de cámara con nombre de OSideMedia (MIT), el diccionario de ai9app (MIT), el vocabulario de plano de la base DirectorIA (`directoria/references/knowledge/09`) y la taxonomía de OpenMontage. **Un término concreto rinde más que un adjetivo.**

## Índice

1. Fórmula de los 5 aspectos
2. Tamaños de plano
3. Ángulos y puntos de vista
4. Movimientos de cámara
5. Óptica y apertura por propósito
6. Luz: fuente, dirección y calidad
7. Color
8. Sonido
9. Términos raros: cómo traducirlos
10. Qué funciona en hostelería y qué no

---

## 1. Fórmula de los 5 aspectos

Todo plano se describe con **[Sujeto] [Movimiento del sujeto] [Escena] [Encuadre] [Cámara]** (taxonomía CMU/Harvard CHAI que usan OpenMontage y la base DirectorIA). Un aspecto que no aplica se marca **N/A** de forma explícita. Los overlays (rótulos, subtítulos) van **aparte**, nunca "en primer plano".

## 2. Tamaños de plano

De más abierto a más cerrado: *extreme wide / establishing*, *wide / full shot*, *medium wide*, *cowboy* (desde medio muslo), *medium shot* (cintura), *medium close-up* (pecho), *close-up* (cara o plato lleno), *extreme close-up*, *macro insert* (textura, gota, grano), *insert / detail* (objeto o acción aislada).

Encuadres especiales útiles en restaurante: *two-shot* (dos comensales), *over-the-shoulder* (desde detrás del cliente hacia el plato), *dirty single* (con un hombro o una copa desenfocados en primer término), *reflection shot* (en una ventana o una copa), *voyeuristic framing* (a través de objetos en primer plano: botellas de la barra, el pase de cocina).

## 3. Ángulos y puntos de vista

| Ángulo | Efecto | Restaurante |
|---|---|---|
| *eye-level* | Neutro, honesto | Sala, personas, conversación |
| *low angle* | Engrandece, poder | La barra, el horno de leña, el cocinero |
| *high angle* | Vista de conjunto o vulnerabilidad | La mesa servida |
| *overhead / top-down* (cenital) | Mapa, orden | Mesa llena, emplatado, acumulación |
| *45° three-quarter* | El ángulo del comensal | Plato héroe |
| *ground level / table-top level* | Intimidad con la superficie | Ras de barra, ras de mesa (caso MURO) |
| *POV* | "Eres tú" | El plato que llega a tu sitio |
| *dutch / canted* | Tensión | Casi nunca en producto o comida |

## 4. Movimientos de cámara

**Por familia** (para que el modelo no confunda traslación, rotación y óptica):

- **Traslación:** *dolly in/out* (*push-in*, *pull-back*), *truck left/right* (*slider*), *pedestal up/down*, *tracking / follow*, *leading shot* (delante del sujeto, retrocediendo).
- **Rotación:** *pan*, *tilt*, *roll*, *whip pan*.
- **Solo óptica:** *zoom*, *rack focus / pull focus*, *focus tracking*. **Nunca se escribe *zoom* para un movimiento físico** (OSideMedia).
- **Compuestos con identidad propia:** *dolly zoom* (vértigo), *arc / orbit*, *crane up/down*, *jib sweep*, *FPV* (dron en primera persona), *bullet time*, *hyperlapse*, *through-object* (atravesar una ventana o el pase de cocina), *snorricam*.
- **Quietud:** *locked-off* (cero movimiento), *micro-shake*.
- **Velocidad de reproducción:** *time-lapse*, *fast motion*, *slow motion*, *stop motion*, *speed ramp*, *reverse*.

**Controles con nombre que reconoce Higgsfield** (OSideMedia `higgsfield-camera`): *Dolly In/Out*, *Super Dolly In/Out*, *Dolly Zoom In/Out*, *Crane Up/Down*, *Crane Over The Head*, *360 Orbit*, *Arc*, *Lazy Susan* (giratorio lento con el sujeto centrado: **producto rígido**), *Robo Arm* (arco mecánico de precisión), *Crash Zoom In/Out*, *FPV Drone*, *Handheld*, *Bullet Time*, *Whip Pan*, *Hyperlapse*, *Low Shutter*, *Through Object In/Out*. ⚠️ Por MCP no existe un parámetro `motions`: estos nombres se escriben en el prompt (skill `higgsfield`, `04` §5).

## 5. Óptica y apertura por propósito

**Óptica** (smixs, OSideMedia, base DirectorIA): 24 mm inmersivo, espacio exagerado · 35 mm documental, con entorno (sala) · 50 mm humano, neutro (plato en mano, conversación) · 85 mm retrato, comprime y separa (plato héroe, persona) · 100 mm macro para textura (grano, costra, burbuja) · anamórfico 40 mm para pantalla ancha de cine (casi nunca en vertical).

**Por propósito** (OSideMedia, a partir del *shotlist-builder* oficial de Higgsfield):

| Propósito | Óptica | Apertura |
|---|---|---|
| Primer plano emocional muy cerrado | 85–100 mm | f/1.4 |
| Diálogo o dos personas | 50 mm | f/2–2.8 |
| General o establecimiento | 35 mm | f/4–5.6 |
| Inserto de objeto (foco fijo en el objeto) | 50–85 mm | f/1.4 (⚠️ en comida, **f/4**: skill `directoria`) |
| Macro (poros, gotas, fibras) | 45 mm macro | f/2.8 |

Cláusulas fijas: **foco bloqueado** en insertos (*"focus plane locked on the plate from first frame to last — no focus drift, no rack focus"*) y **sin distorsión** en ópticas angulares (*"straight rectilinear lines, no barrel distortion, no fisheye"*).

## 6. Luz: fuente, dirección y calidad

**Fuentes** (siempre nombradas): luz de ventana, luz práctica (lámpara, vela), brasa o fuego, neón del rótulo, fluorescente de cocina, LED bajo la barra, farola al atardecer.

**Dirección:** *key* desde la ventana, lateral (textura), contraluz (vapor, brillo, burbuja), cenital, *rim light*, relleno por rebote, *motivated practical* (la fuente se ve en el plano).

**Calidad:** difusa y suave, dura, *low-key* / *high-key*, bruma volumétrica, vapor a contraluz, reflejos húmedos.

**Regla de Society:** en comida, luz de día neutra de unos 5000 K, con calidez solo motivada (skill `directoria`, `hosteleria/02`).

## 7. Color

La paleta se define con colores concretos, nunca con "cinematic colors". Ejemplo: *"neutral daylight whites, charcoal blacks of the grill, deep pink meat centre, warm wood only on the board"*. Si el cliente veta un color, se repite el veto en cada clip. Para frenar una deriva de color → asignación positiva (skill `directoria`, `hosteleria/02` §4).

## 8. Sonido

Aunque el modelo no genere audio, el sonido estructura el ritmo (smixs):

- **Ambiente:** murmullo de sala, campana extractora, lluvia en el cristal.
- **Cuerpo y acción:** cuchillo en la tabla, chisporroteo, vertido, tapón, copas que chocan.
- **Eventos:** silencio súbito, golpe grave, el "clac" del plato en la mesa.

En Seedance 2.5: `< >` efectos, `( )` música, `{ }` diálogo (skill `directoria`, `hosteleria/04` §3).

## 9. Términos raros: cómo traducirlos

Para términos poco comunes se escribe **el término + el sujeto + el cambio visible + la relación entre primer plano y fondo + la dirección o velocidad** (smixs):

> *Rack focus: shift focus smoothly from the wine glass in the foreground to the chef at the pass in the background; the glass blurs while the chef's face goes from soft to sharp.*

Los valores numéricos (mm, f/) están permitidos, pero lo que realmente dirige el modelo es **el resultado visible escrito en palabras**.

## 10. Qué funciona en hostelería y qué no

Evidencia propia (skill `after-effects-reels` §5bis, 08/09/2026; reglas de Torre de Vega) [MEDIDO]:

| Pedido al modelo | Resultado |
|---|---|
| Paneo, dolly u órbita **sobre comida** | El peor morfismo: tentáculos y gambas se regeneran durante el recorrido |
| Traspaso de plato entre dos manos | La comida cambia de forma y de número entre fotogramas |
| Servir vino con movimiento | Copa imposible, mano que se aplana |
| Movimiento suave **sobre la sala** | **El mejor**: la arquitectura es rígida |
| *"static camera"* / *"locked-off"* a secas | Se lee como foto animada |
| *handheld* / micromovimiento de móvil | Temblor sin intención: **rechazado por el cliente** (Torre de Vega). ⚠️ Matiz [MEDIDO 25/09/2026]: el seguimiento con intención de pequeña amplitud que acompaña la mano sí da firma de rodaje; ver `directoria/references/hosteleria/08` §4 |
| ✅ **Plano de proceso:** seguimiento de pequeña amplitud que acompaña la mano (a mano con intención o gimbal), sin atravesar la comida | Firma de rodaje (`directoria/hosteleria/08` §4) |
| ✅ **Plano de plato quieto:** **recorrido pequeño, mecánico, constante y cuantificado** (*motorised slider with a geared head*, 3–15 % de recorrido, velocidad constante del primer al último fotograma, *no handheld operation, no shake*) + el movimiento físico propio de la escena (humo, líquido, tela) | Lo correcto |

**Consecuencias:**

1. Los empujes, tirones y paneos amplios se hacen **en montaje** con fotogramas clave (cero créditos, sin morfismo; skill `openmontage`, `02` §5).
2. En el prompt se declara que **el sujeto no cambia** (*"the food remains the same food throughout — never shifts, morphs or changes shape"*) y se prohíbe solo el movimiento amplio (*no camera pan, no dolly, no orbit, no zoom, no rotation*). **No** se escribe *no camera movement* a secas: congela el plano.
3. Los sujetos rígidos (botella, fachada, mesa montada, horno) sí admiten arcos, *Lazy Susan* y *Robo Arm*.
4. **Variedad real de ángulos** entre planos generados: cambiar solo la distancia, la focal o el recorte **no cuenta** como otro ángulo (regla de Torre de Vega).
