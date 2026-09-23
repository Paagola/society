<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

# Reglas de imagen — Torre de Vega

Restaurante de pueblo, casi 50 años, clientela fiel y buen renombre. El objetivo de todo contenido
visual es que un cliente que entre físicamente al local no note ninguna diferencia respecto a lo que
vio en Instagram: no se vende una fantasía, se vende la promesa exacta del sitio real.

Este archivo cubre las reglas de **fotografía / imagen fija** (carruseles de plato, fotos de sala,
carteles). Para reglas de **vídeo / Reels**, ver [`reglas_videos.md`](reglas_videos.md) — algunas
reglas de este archivo (continuidad, ficha de personaje, iluminación, variedad de género en manos) son
compartidas y también aplican a vídeo tal cual.

## PERFIL DE CLIENTE — DirectorIA

```markdown
# PERFIL DE CLIENTE — DirectorIA

## Identidad del proyecto
- Usuario / marca:        Torre de Vega
- Sector / a qué se dedica: Restaurante de pueblo, casi 50 años, clientela fiel, buen renombre
- Tono de marca:          Auténtico, tradicional, sin artificios

## Qué genera
- Tipo principal:         editorial producto (carruseles por plato para Instagram)
- Tipos secundarios:      vídeo cinematográfico (bodega) — ver reglas_videos.md

## Personaje recurrente (identidad)
- ¿Cara fija obligatoria? NO por defecto, pero toda persona PROTAGONISTA exige ficha de
  personaje aprobada antes de generar (reglas 2 y 18).
- Nota especial: personal del local (camareros, cocineros) y clientes SÍ pueden aparecer con
  cara. Protagonista → con ficha. De fondo → sin requisito. Empleado real identificable →
  con su consentimiento. Actualizado 2026-09-22.

## Plataforma y formato
- Dónde se publica:       Instagram
- Aspect ratio por defecto:
    - Fotos (carrusel platos): 4:5
    - Vídeo (bodega, cinematográfico): 9:16 — ver reglas_videos.md
- Resolución de imagen:   2K (`resolution:"2k"` en nano_banana_pro) — ver regla 12, nunca 4K

## Estilo / nivel
- Fotos:   hiperrealista editorial, fiel a plato/local/texturas reales, con **acabado editorial dramático** (regla 17)
- Vídeo:   misma calidad fotográfica, con **acabado editorial dramático** (regla 17) — ver reglas_videos.md
  - Luz dura de una sola fuente, cálida (~3000-3300K), sombras casi negras, contraste alto, grano
    de película visible.
  - *(Historial: "cinematográfico film-grain" → "acabado de iPhone" el 2026-09-08 → dramático el
    2026-09-10 a petición del cliente, de forma permanente. Este perfil seguía diciendo iPhone;
    corregido el 2026-09-14.)*

## Herramienta y modalidad de entrega
- Herramienta:            MCP Higgsfield conectado
- Modalidad:              EJECUTA tools

## Idioma
- Conversación en:        español
- Prompts finales en:     inglés
```

## 1. Regla primordial de continuidad (dura, sin excepciones)

**Nunca añadir elementos que no existan en el local real**: ni mobiliario, ni cuadros, ni sillas, ni
textura de manteles, ni decoración que no esté en las fotos de referencia reales aportadas.

**Por qué**: si el cliente entra al local y no reconoce lo que vio en Instagram, se rompe la confianza
en la marca — y en un restaurante de pueblo con 50 años de renombre, la autenticidad es el activo
principal.

**Cómo aplicarlo**:
- Toda generación debe anclarse en fotos reales del local (`imagenes/local/`) como referencia de
  geometría, mobiliario y texturas — nunca inventar el espacio desde cero.
- Si se necesita un ángulo nuevo sin foto real disponible, generarlo usando como referencia las fotos
  reales existentes más cercanas para mantener fidelidad geométrica.
- Ante la duda de si un elemento del encuadre existe en el local, no incluirlo.

**Aplica también a vídeo**: cada fotograma/escena de un Reel sigue esta misma regla — ver
`reglas_videos.md`.

## 2. Personas en cuadro — permitidas, con ficha de personaje obligatoria (actualizada 2026-09-22)

> **Historial:** regla dura de «sin rostros» hasta 2026-09-08 → rebajada a preferencia ese día
> (*«si se puede evitar se evita, sino no pasa nada»*) → **derogada el 2026-09-22 por indicación del
> usuario**. Ya no existe ninguna restricción de marca contra mostrar personas.

**Las personas SÍ salen.** Una cara humana es el mayor activador de engagement que existe y era la
única palanca grande que el proyecto tenía bloqueada por regla. No hay que evitar rostros, ni
recortar encuadres, ni descartar un guion porque pida a alguien a cámara. Los formatos de persona a
cámara (reseña, primer plano comiendo, presentación de plato, talking head) quedan desbloqueados.

**La única condición es la consistencia.** Se distinguen dos categorías, y solo una tiene requisito:

| Categoría | Qué es | Requisito |
|---|---|---|
| **Personaje protagonista** | Cualquier persona que la pieza identifica: habla a cámara, presenta el plato, protagoniza el gesto, o reaparece en más de un plano o en más de una pieza | **Ficha de personaje aprobada ANTES de generar nada** (regla 18). Sin ficha no se genera. |
| **Personas de fondo** | Comensales, siluetas, gente de paso, personal cuyo cuerpo o manos aparecen sin ser el sujeto del plano | Ninguno. Solo aplican las reglas 5, 7 y 7bis (variedad y naturalidad). |

**Por qué la ficha:** sin una identidad fijada, el mismo camarero cambia de cara entre el plano 2 y
el plano 5, y entre un Reel y el siguiente. Esa deriva rompe la marca mucho más de lo que la rompía
una cara de más. La ficha convierte a la persona en un activo reutilizable de la cuenta, no en un
extra desechable.

**Matiz que se mantiene, y es legal, no estético:**

| Caso | Situación |
|---|---|
| Persona genérica generada por IA | Sin problema. No hay ninguna persona real implicada. |
| Empleado real identificable | Hace falta que esa persona esté de acuerdo. No es una regla de marca: es que sale su cara en publicidad. |

Sigue vigente además la regla 18.2: **nunca** replicar a la persona que aparece en un vídeo ajeno
usado como plantilla.

**Aplica también a vídeo** — ver `reglas_videos.md`.

## 3. Foco de posicionamiento

- **Fotos de plato (carrusel)**: el plato protagoniza el encuadre; el local/mesa queda en segundo plano
  como contexto, siempre con elementos reales (manteles, cubertería, decoración de mesa reales).

## 4. Iluminación

Tono dominante coherente con la experiencia real del local: luz cálida de restaurante de pueblo
(ambiente, no luz de estudio plano). Para foco de producto (plato), se permite un toque de luz más
dirigida tipo editorial si no traiciona el ambiente real de la sala.

Describir la luz siempre **en texto** (temperatura de color en K, tipo de fuente) — no imponer una
imagen de referencia de mood/luz compartida entre varias generaciones del mismo lote (arrastra rasgos
faciales y repite personas de forma detectable).

**Aplica también a vídeo**: la descripción de luz en texto (no por imagen de referencia compartida) es
igual de importante en prompts de vídeo — ver `reglas_videos.md`.

## 5. Perfil demográfico de las personas

A los protagonistas los fija su ficha de personaje (reglas 2 y 18); esta regla no les aplica. Para las
**personas de fondo**: variar edad/complexión/vestuario entre generaciones del mismo lote — nunca
repetir el mismo tipo de persona en dos tomas seguidas.

## 6. Varias referencias del mismo sujeto → usarlas todas juntas

Si hay más de una foto real del mismo plato/objeto (ej. dos ángulos de la misma tarta), pasar **todas**
como referencia en la misma generación, no solo una. Cada ref adicional del mismo sujeto aporta
información que una sola foto no da (otro ángulo, otra parte del corte, otra zona de la corteza) y hace
que el resultado sea más concreto y fiel — no una aproximación basada en una sola imagen.

**Por qué**: una sola foto de un plato deja partes del objeto sin ver; el modelo tiene que inventar esas
zonas. Con dos o más fotos reales del mismo plato, hay menos hueco que rellenar de forma inventada.

**Cómo aplicarlo**: al construir el stack de refs, si el pedido incluye 2 fotos del mismo plato, ambas
entran como refs de identidad del sujeto (no se descarta ninguna a favor de la otra). Sigue aplicando el
límite de 3-4 refs por generación — si eso satura el hueco disponible, prioriza sujeto (todas sus fotos)
sobre refs secundarias de fondo/plato antes que al revés.

## 7. Regla anti-repetición en lotes (carrusel = lote)

Un carrusel de plato es, en sí mismo, un lote. Entre las fotos del mismo carrusel:
- Variar ángulo/distancia de cámara en cada foto (plano cenital, 3/4, detalle de textura, plano con
  contexto de mesa).
- No repetir la misma referencia de mood/luz en todas las fotos del carrusel.
- Si aparecen manos/personas de fondo, variarlas entre fotos del mismo carrusel.

## 7bis. Regla de naturalidad (si aparecen personas de fondo)

Evitar expresiones idénticas o gestos idénticos y simultáneos en todo el encuadre. Preferir momentos de
interacción natural (sirviendo, conversando, mirando la carta) sobre poses estáticas mirando a cámara.

## 8. Reglas de encuadre del local

- Variar ángulos entre generaciones del local/bodega.
- Si no hay más ángulos reales disponibles del que se necesita, generar el ángulo nuevo usando como
  referencia las fotos reales existentes más próximas — nunca inventar el espacio desde cero (ver
  regla 1).

## 9. Estilo de referencia validado — encuadre cercano tipo `imagenes/generadas/comiendo_carne.png`

El cliente ha aprobado explícitamente este encuadre como el que hay que repetir por defecto en fotos de
plato/lifestyle (no en fotos de producto puro tipo carrusel cenital). Referencia validada:
`imagenes/generadas/fondo_cartel_vacaciones_v3.png` (aprobada 2026-08-29).

**Qué lo caracteriza:**
- **Plano cercano e íntimo, no gran angular de sala.** Cámara baja y muy próxima a la mesa (equivalente a
  ~85-90mm, f/1.8-f/2.2, sujeto a 25-35cm). Nunca un plano que muestre el comedor/bar entero de forma
  legible — eso ha fallado ya una vez (ver incidente más abajo).
- **La superficie de mesa tiene que ser una referencia real fotografiada tal cual** (p. ej.
  `imagenes/mantel_blanco.jpg`), usada como la única superficie visible en el encuadre. Nunca inventar
  una mesa de madera, barril o barra que no exista en esa ubicación.
- **Todo lo que queda fuera del radio de la mesa se disuelve en bokeh cálido abstracto** — sin arcos,
  sillas ni estanterías legibles de fondo. El fondo aporta solo luz y color, no arquitectura.
- **La persona puede aparecer con cara, brazo o mano según el encuadre.** Si protagoniza el gesto, necesita ficha aprobada (reglas 2 y 18). La mano interactúa con la comida:
  sujeta el tenedor y levanta un trozo de plato hacia cámara, ese trozo es el punto de mayor nitidez.
- **Un segundo elemento real y cercano, ligeramente desenfocado**, aporta contexto de consumo: una copa o
  botella real de la carta (ej. `imagenes/cerveza_aguila*.jpg`) apoyada en la misma mesa, nunca en primer
  plano nítido — ese protagonismo es solo para el plato/tenedor.
- **Espacio negativo generoso en el tercio superior**, dejado limpio a propósito para añadir después el
  texto del cartel/post en diseño, nunca generado como texto dentro de la imagen.

**Incidente a evitar (ya ocurrió una vez):** generar un plano abierto de una zona del local que en
realidad no tiene mesa de madera ahí (se inventó una mesa de barril en una zona donde no existe). Antes
de dar por bueno un fondo, comprobar que la superficie y el entorno visibles se corresponden 1:1 con una
foto real de esa ubicación exacta — si no hay foto real de esa superficie/ubicación, no generar ese plano
abierto; usar en su lugar el encuadre cercano de esta sección, que necesita mucho menos entorno visible y
por tanto es más seguro de mantener fiel a la realidad.

## 9bis. Composición "profesional" vs "sosa" — encuadre editorial para fotos de local

Validado 2026-08-30 sobre `gmaps_01_comedor_chimenea.png`, `gmaps_03_barra_arcos.png` y
`gmaps_06_techo_plantas.png`. Un plano frontal, centrado y a nivel de ojos de pie (documentación plana)
se percibe como "soso" y amateur. Por defecto, para fotos de espacios del local (no fotos de plato en
carrusel, que siguen la regla 9), usar composición editorial:

- **Cámara baja y cercana**, no de pie ni a distancia — como si el fotógrafo estuviera sentado en una
  mesa o apoyado en la barra.
- **Elemento en primer plano desenfocado** (una copa, una botella, el borde de un plato) que aporta
  profundidad de capas en vez de un encuadre plano de una sola distancia focal.
- **Composición en tercios, no centrada**: el elemento principal (chimenea, barra, detalle) va desplazado
  del centro, dejando que arcos/marcos de la sala hagan de línea de fuga.
- **Apertura más abierta** (f/2.2–f/2.8 en vez de f/5.6) para separar sujeto de fondo con más carácter
  cinematográfico, coherente con `05-biblia-hiperrealismo.md`.

## 9ter. Balance de blancos neutro — evitar el "amarillo de IA"

Validado 2026-08-30: una primera pasada con luz muy cálida (CCT ~2800-2900K sin corrección) se leyó como
"muy amarillo" y delataba que la imagen era generada por IA, incluso siendo fiel al local real (que sí
tiene luz cálida de verdad).

**Cómo aplicarlo**: en el campo `lighting` del JSON brief, pedir explícitamente que blancos (manteles,
cortinas, platos) se reproduzcan neutros/blancos y no arrastren un tinte amarillo generalizado, y que el
ladrillo mantenga su terracota real en vez de virar a ámbar. La luz cálida del local debe quedar como
**acento** (bombillas, tiras LED puntuales) sobre una corrección de blancos creíble de cámara real, no
como un filtro de color naranja cubriendo toda la imagen. Subir el `cct_k` usado en el prompt a un rango
~4000-4500K (en vez de ~2800-3000K) ayuda a que el modelo no sature todo de amarillo, aunque la fuente de
luz real sea más cálida.

## 9ter-bis. Corrección: el trofeo de ciervo SÍ es real

Corrección 2026-08-30 a un error de la regla 9quater original: se había asumido que la cabeza de ciervo
que aparecía en `gmaps_03_barra_arcos.png` era una invención del modelo y se excluyó con un negative
(`no deer head / no antlers`). **Es un error** — `imagenes/local/panoramica.png` muestra que el local
tiene un trofeo de ciervo real montado en una columna del comedor grande.

**Cómo aplicarlo**: si la ubicación exacta que se está generando tiene una foto real (como
`panoramica.png`) donde aparece el trofeo, reproducirlo fielmente en vez de excluirlo — es decoración
real del local. Solo excluirlo como invención en encuadres donde ninguna foto real de esa zona concreta
lo muestre (p. ej. no añadirlo en el rincón de la barra bajo los arcos, donde nunca ha aparecido en
ninguna foto real de esa zona).

## 9quinquies. Evitar el aspecto "demasiado perfecto" (HDR de inmobiliaria)

Incidente 2026-08-30: una serie de imágenes (`gmaps_11_comedor_grande.png`, `gmaps_12_vajillero.png`,
`gmaps_13_pase_entrada.png`) fue rechazada por "parecer demasiado falsa" — el ladrillo se veía con un
patrón demasiado uniforme/repetido, el rango dinámico era parejo en toda la imagen (nada quedaba en
sombra, todo nítido a la vez), los colores estaban muy saturados y la luz era demasiado dramática/de
anuncio. Es el aspecto típico de un render HDR de inmobiliaria, no de una foto real de restaurante.

**Por qué**: una foto real de un solo disparo tiene zonas más oscuras, imperfecciones de textura no
repetitivas y un contraste más contenido. Cuando todo en el encuadre está igual de nítido, iluminado y
saturado, se lee como generado por IA aunque el contenido sea fiel.

**Cómo aplicarlo**: en `realism`/`lighting`/`palette`, pedir explícitamente una foto de **una sola
exposición realista, no HDR, no fusión de varias exposiciones**, contraste natural (con zonas que caen en
sombra sin problema), colores no sobresaturados, y textura de ladrillo/madera con variación natural en
vez de patrón uniforme. Preferir el nivel de producción de `gmaps_01_comedor_chimenea.png`,
`gmaps_06_techo_plantas.png` y `gmaps_08_mesa_puesta.png` (referencia validada) sobre el de las tres
imágenes rechazadas.

## 9sexies. Estilo validado — comedor amplio editorial (con botella en primer plano)

Aprobado 2026-08-31 por el cliente sobre `imagenes/generadas/local_comedor/comedor_01_editorial_amplio.png`: "la primera foto que has mandado me encanta tanto como ha quedado como el prompt que has puesto, las imágenes de referencia y demás." Este es ahora el encuadre **por defecto para fotos amplias de sala** (comedor, y por extensión otras salas grandes del local) — distinto del encuadre cercano de plato/lifestyle de la regla 9, que sigue aplicando tal cual a fotos de plato.

**Qué lo caracteriza (repetir esta receta):**

- **Refs**: la foto real más amplia y fiel de la sala (p. ej. `imagenes/local/panoramica.png`) + una segunda foto real de la misma sala desde otro ángulo si existe (p. ej. `imagenes/local/photo_5805514308144795401_y.jpg`) como ancla de geometría — **estas dos mandan sobre cualquier otra cosa, se reproducen literalmente, nada se inventa**. Además, una generación ya aprobada de esa misma sala (p. ej. `gmaps_01_comedor_chimenea.png`) se pasa como tercera referencia, pero **solo como referencia de nivel de acabado/estilo**, nunca como fuente de geometría — así se indica explícitamente en el prompt ("use @imageN only as a style/production-level reference").
- **Cámara baja y cercana a una mesa**, no de pie ni a distancia — como si el fotógrafo estuviera sentado en la mesa más próxima. Lente ~35mm (más ancho que el plano de plato porque aquí sí se quiere transmitir la sala), f/2.2–f/2.5, ISO ~300-400 para permitir luz ambiente sin flash.
- **Elemento real en primer plano, muy desenfocado**: una copa y botella de vino de la mesa más cercana, cortando la esquina inferior del encuadre — aporta profundidad de capas sin robar protagonismo a la sala.
- **Composición en tercios con línea de fuga**: el elemento más característico de la sala (la chimenea de piedra, la columna con el trofeo, la barra) desplazado del centro, con las mesas y arcos de la sala guiando la mirada hacia él.
- **Toda la decoración real se reproduce fiel**, trofeo de ciervo incluido si esa esquina aparece en el encuadre (ver regla 9ter-bis) — nunca se excluye por sistema, solo si la zona exacta no lo muestra en ninguna foto real.
- **Balance de blancos neutro** (regla 9ter): manteles y cortinas en blanco real, ladrillo en su terracota real, luz cálida de bombillas como acento puntual, no como filtro naranja general. CCT en prompt ~4300K.
- **Una sola exposición realista, contraste natural, sin aspecto HDR** (regla 9quinquies): rincones que caen en sombra sin problema, ladrillo con variación natural, colores no sobresaturados.
- **Aspect ratio**: se ha validado en 1:1 (para grid de Instagram); para feed normal usar 4:5 salvo que el cliente pida cuadrado explícitamente.

**Cómo aplicarlo**: para cualquier foto amplia de una sala del local, replicar esta receta de refs + specs de cámara + composición antes de improvisar un ángulo nuevo desde cero.

## 9quater. Las restricciones negativas hay que repetirlas en CADA regeneración

Incidente 2026-08-30: se corrigió una imagen para quitar una cabeza de ciervo inventada (regla 1), pero
en una regeneración posterior de la MISMA escena (para ajustar solo el balance de blancos) la cabeza de
ciervo volvió a aparecer porque el nuevo prompt no repetía la restricción `no deer head / no antlers /
no trophy`.

**Por qué**: cada llamada de generación es independiente; el modelo no "recuerda" las correcciones de una
generación anterior sobre la misma escena salvo que estén explícitas en ese prompt concreto.

**Cómo aplicarlo**: al iterar sobre una escena ya corregida (cambiar ángulo, luz, limpieza de mesa...),
copiar también todas las restricciones negativas ya validadas en la versión anterior, no solo añadir la
corrección nueva. Nunca asumir que un fallo ya solucionado una vez queda solucionado para siempre en esa
escena.

**Aplica también a vídeo**: al reintentar/corregir una escena de Reel ya corregida antes, repetir también
las restricciones negativas ya validadas — ver `reglas_videos.md`.

## 10bis. Carrusel de plato validado — gambas al ajillo

Aprobado 2026-08-31 por el cliente: "las fotografías de las gambas que has generado me encantan también." Referencia validada: las 4 imágenes en `imagenes/generadas/carrusel_gambas/`. Confirma que el patrón de 4 tomas por carrusel de plato (regla 7) funciona bien con este reparto concreto de tipos de plano — usar como plantilla por defecto para el resto de platos del carrusel:

1. **Cenital puro producto** (`gambas_01_cenital.png`) — overhead/top-down sobre la superficie real de mesa del propio plato (aquí el barril con marca "Cillar de Silos"), sin manos, espacio negativo limpio para texto posterior.
2. **3/4 cercano** (`gambas_02_34_cercano.png`) — ángulo alto a ~45°, cámara baja, plato desplazado de centro en tercios, fondo real de la sala disuelto en bokeh cálido.
3. **Detalle de textura** (`gambas_03_detalle.png`) — extreme close-up/insert shot, sin plato ni mesa visibles, solo la comida y sus imperfecciones (burbujas de aceite, perejil, textura de la gamba).
4. **Plano de contexto de mesa** (`gambas_04_contexto_mesa.png`) — mesa real distinta (mantel blanco) como superficie, mano sujetando el plato (encuadre histórico aprobado; hoy se permiten cara y brazo, con ficha si protagoniza), un segundo elemento real de la carta (copa/botella) desenfocado de fondo — aplicación directa de la regla 9 a un carrusel de producto en vez de a un cartel.

**Cómo aplicarlo**: el vocabulario de tipo de plano/ángulo usado (overhead, three-quarter high angle, extreme close-up insert shot, medium shot) viene de `directoria-cloud/knowledge/09-vocabulario-plano-y-modo-organico.md` — consultarlo para nombrar el plano con precisión en vez de dejarlo implícito. Para el resto de platos del carrusel, repetir esta misma secuencia de 4 tomas salvo que el plato pida otra cosa (p. ej. un plato que no tenga sentido en cenital).

## 10. Referencias: mejor pasar de más que de menos

A diferencia de la guía general de DirectorIA (que recomienda un máximo de 3-4 refs porque la atención se
diluye), en este proyecto el cliente prefiere que se aporten **todas las referencias reales relevantes
disponibles** para una escena, aunque sean más de 4 — es preferible arriesgar algo de dilución de atención
que dejar que el modelo invente una zona del local, un mueble o una textura por falta de referencia.

**Cómo aplicarlo:**
- Si hay dudas sobre si una referencia adicional (otro ángulo del mismo plato, otra foto de la misma
  pared, otra foto de la misma copa) puede ayudar a anclar el resultado a la realidad, inclúyela.
- Prioriza igualmente sujeto > entorno > prop secundario si hay que recortar por límite técnico del
  modelo, pero el punto de partida por defecto es "más refs", no "las mínimas".
- Esto no sustituye la regla 6 (varias fotos del mismo sujeto van todas juntas); la amplía a todo el stack
  de refs de una generación, no solo al sujeto principal.

## 11. Estilo validado vs rechazado — planos de plato con comensales de fondo

Validado/rechazado 2026-09-02 sobre el lote `imagenes/generadas/mesas_gente/` (pollo, jamón, ensalada de cabra,
gambas, croquetas) y el lote `imagenes/generadas/carrusel_no_pidas_carne_a_ciegas/` (carne).

**❌ Rechazado — plano por encima del hombro (over-the-shoulder).** Encuadre donde la cabeza/hombros del
comensal ocupan buena parte del primer plano en primer término, cámara detrás de la persona mirando hacia el
plato. Rechazado explícitamente por el cliente ("quedan horrible") la primera vez que se probó, sobre el plato
de solomillo junto a la chimenea.

**❌ Rechazado — plano de acción tipo "cortándose" (cuchillo cortando el corte, mano sujetando el cuchillo en
primer plano dominante).** Aunque cumplía la antigua regla de encuadre sin cara, hoy derogada, el resultado de este tipo de
plano (cuchillo + carne ocupando la mayor parte del encuadre, fondo apenas visible) no ha gustado al cliente.
No usar este tipo de composición de "acción con cuchillo en primer plano" como plano por defecto.

**❌ Rechazado — comensal de espaldas sentado a la mesa, plato en su propia mesa en primer término, resto de
sala (chimenea, sillas) de fondo.** Tampoco ha gustado, aunque evita mostrar cara. Evitar composiciones donde
el cuerpo/nuca de un comensal concreto sea un elemento compositivo central del encuadre.

**✅ Validado — plato protagonista en primer plano nítido, con comensales genéricos de fondo muy desenfocados
(no un comensal concreto ocupando el encuadre), en la sala real.** Este es el patrón que ha funcionado:
cámara relativamente cerca del plato (lens_to_subject ~0.3-0.45m), plato ocupando la mayor parte del
encuadre en foco, la sala real (mesas, chimenea/pared, comensales genéricos irreconocibles) desenfocada
detrás — sin que ningún comensal individual sea el sujeto compositivo. Aplicado con éxito en variantes de
ángulo: eye-level a nivel de mesa, cenital (top-down), 45 grados clásico y 3/4 alto.

**Corolario — variar ángulo de verdad entre platos de un mismo pedido, no solo la etiqueta.** La primera
tanda de 5 platos se pidió "cada uno con ángulo distinto" pero el resultado percibido fue "casi todos desde
el mismo ángulo y con la misma estética" a pesar de usar camera specs distintas. Para que la variación se
note de verdad entre fotos de un mismo lote:
- Cambia el `lens_mm` y el `aperture_f` de forma perceptible entre fotos (no solo 3-5mm de diferencia).
- Cambia la posición del plato en el encuadre (centrado vs tercios, más cerca del borde inferior vs más
  centrado en el cuadro).
- Cambia cuánta sala se ve detrás (una foto con mucha sala visible desenfocada, otra con solo un fragmento
  de pared/mesa cercana desenfocada — como en la regla 9 de encuadre cercano).
- No repitas la misma fórmula de "3/4 alto con sala completa detrás" en más de una foto del lote.

**Cómo aplicarlo:** antes de lanzar el lote, listar explícitamente en una tabla qué ángulo/composición usa
cada foto y verificar que no hay dos filas iguales o casi iguales, no solo confiar en que las camera specs
numéricas ya garantizan la variación percibida.

## 12. Resolución de generación — 2K, nunca 4K

Añadido 2026-09-03 por indicación del cliente.

**Regla:** todas las generaciones de imagen para Torre de Vega deben pedirse en `resolution:"2k"`
en `generate_image` (nano_banana_pro), no en `"4k"`.

**Por qué:** Instagram recomprime cualquier imagen al publicarla, y 2K (~2048px en el lado largo) es
la resolución máxima que aprovecha de verdad al subir un post — pedir 4K no mejora el resultado final
visible en la app, solo genera un archivo más pesado y más lento/caro de producir sin beneficio real
para este caso de uso.

**Cómo aplicarlo:** en cada llamada a `generate_image`, usar `"resolution": "2k"` en vez de `"4k"`.
Si en algún momento la pieza es para otro uso que si aproveche más resolución (impresión, cartelería
grande), pedir explícitamente al cliente confirmación antes de subir a 4K para ese caso concreto.

**Excepción — keyframes que se van a animar a vídeo:** si la imagen fija es el punto de partida de una
escena de Reel (se va a animar con Kling después), mantener 2K; la antigua excepción 1080 está sustituida — ver regla 2bis de
`reglas_videos.md`.

## 13. Variedad de género en manos — cuando aparece más de una mano

Añadido 2026-09-05 por indicación del cliente.

**Regla:** si en un mismo encuadre aparece más de una mano (brindis, varias personas sirviendo, etc.), las manos deben pertenecer a **géneros distintos entre sí** — nunca todas del mismo género, para que no se lean como la misma mano clonada/duplicada. Además, en el conjunto de piezas generadas para el cliente, **deben predominar las manos de mujer sobre las de hombre**.

**Por qué:** varias manos idénticas en tamaño/vello/proporciones en el mismo plano se detectan como repetición del mismo asset generado, rompiendo la naturalidad. Variar el género (y con ello tamaño, vello, tono, uñas) hace que cada mano se lea como una persona distinta de verdad.

**Cómo aplicarlo:**
- Escenas de brindis o con 2+ manos: especificar explícitamente en el prompt el género de cada mano por separado (ej. "one hand is a woman's, with painted nails; the other is a man's, larger with visible hair"), nunca dejarlo genérico.
- Con 3+ manos: mantener siempre al menos una de cada género, y si se reparte de forma desigual, que gane el número de manos de mujer.
- A nivel de lote/serie completa (no solo dentro de un encuadre): al elegir qué mano protagoniza cada escena de mano única (sujetando botella, sirviendo, etc.), priorizar manos de mujer en más ocasiones que manos de hombre.
- Sigue aplicando la regla 2 (personas permitidas; ficha si protagonizan) y la regla 7bis (naturalidad, sin gestos idénticos simultáneos).

**Aplica también a vídeo**: la misma variedad de género en manos aplica a cada frame/escena de un Reel —
ver `reglas_videos.md`.

## 14. Verificar que las referencias "reales" lo son de verdad antes de usarlas

Incidente 2026-09-07: `imagenes/local/copa_vino.png` estaba guardada junto a las fotos reales del
local y se usó como referencia real en varias generaciones del Reel de carne, pero el cliente indicó
que esa imagen **no es una foto real** del local ("no es realmente el local") — se borró del
repositorio.

**Por qué:** no todos los archivos `.png` guardados en `imagenes/local/`, `imagenes/comida/` o
`imagenes/vinos/` son fotos reales — algunos son generaciones anteriores de IA guardadas en la misma
carpeta. Usar una de estas como si fuera real rompe la regla 1 de continuidad sin que se note en el
momento, porque el propio archivo de referencia ya arrastraba invención.

**Cómo aplicarlo:** ante la duda sobre si un archivo de referencia es una foto real o una generación
anterior, preguntar al cliente antes de usarlo como ancla de continuidad, en vez de asumir que todo lo
que hay en las carpetas de referencia es real. Si el cliente confirma que un archivo no es real,
borrarlo del repositorio (no dejarlo "por si acaso" mezclado con las referencias reales).

**Corolario — no usar generaciones de IA ya aprobadas como fuente de geometría, aunque sea tentador
por comodidad.** También en el Reel de carne, una escena usó como referencia principal dos imágenes ya
generadas por IA (`gmaps_08_mesa_puesta.png`, `gmaps_23_mesa_puesta_cercana.png`) en vez de una foto
real de esa mesa/mantel — el resultado inventó un fondo (estantería, candelabro) que no correspondía a
ninguna ubicación real. Las generaciones ya aprobadas solo deben pasarse como referencia de **estilo/
acabado** (como ya indica la regla 9sexies), nunca como la referencia que ancla la geometría de un
mantel, mesa o fondo nuevo — para eso hace falta una foto real.

## 15. Nunca mostrar un plato ya comido o un vaso/copa vacíos

Añadido 2026-09-07 tras el rechazo explícito del cliente sobre un vídeo animado a partir de una foto
real de la terraza nocturna: "Y plato ya comido con el vaso vacío eso Jose no lo quiere ni de coña".

**Por qué:** un plato terminado o un vaso vacío en primer plano/contexto cercano comunica "sobras" o
"la experiencia ya terminó" — el opuesto exacto de lo que se quiere vender (comida recién servida, un
momento de disfrute en curso). Esto aplica aunque la foto sea real y ya esté aprobada para otro uso;
el problema es de contenido, no de fidelidad ni de calidad técnica.

**Cómo aplicarlo:** antes de elegir una foto real como referencia para cualquier pieza nueva
(carrusel, cartel, Reel), comprobar que el plato se ve recién servido/con comida y que
copas/vasos/botellas visibles en el encuadre están llenos o al menos no vacíos de forma evidente. Si
la única foto real disponible de una ubicación tiene un plato ya comido o un vaso vacío en un lugar
protagonista del encuadre, no usarla tal cual — recortar para dejarlo fuera de plano, o pedir al
cliente una foto real nueva de esa misma zona con comida/bebida recién servida.

## 16. El encuadre cercano de la regla 9 necesita seguir viéndose "anclado al suelo"

Incidente 2026-09-07 (Reel de carne, escena "mesa llena"): al recortar el encuadre muy cerca para
evitar fondo inventado (regla 9), el resultado no mostraba ni el borde de la mesa ni ninguna pata o
silla — la mesa quedó "flotando" en el bokeh, sin ninguna referencia de que era un objeto físico
apoyado en el suelo.

**Por qué:** el bokeh cálido sin arquitectura reconocible (regla 9) evita inventar fondo, pero si se
recorta tan cerca que ni siquiera se ve el borde de la mesa cayendo hacia el suelo o una silla/pata
real, el resultado se lee como un objeto suspendido en el vacío, no como una mesa real de restaurante.

**Cómo aplicarlo:** al aplicar el encuadre cercano de la regla 9, dejar siempre visible en algún borde
del encuadre el punto de apoyo físico de la mesa (la caída del mantel hacia el suelo, una pata, una
silla real de la foto de referencia) — el bokeh abstrae el fondo lejano, pero el primer plano tiene
que seguir leyéndose como un mueble real apoyado en el suelo, no como un plato flotando sobre una nube
de color.

## 17. Look editorial dramático — sustituye al "grabado con iPhone" (aplica a imagen Y vídeo)

**Historial de esta regla, íntegro, porque se ha invertido dos veces:**

1. *2026-09-08:* se adoptó el acabado "grabado con iPhone" (luz de día abundante, contraste plano,
   sin grano, profundidad de campo amplia) porque el objetivo entonces era que **no pareciera
   generado por IA** — una imagen técnicamente perfecta con luz de estudio y grano delataba el render.
2. *2026-09-10:* **el cliente pide explícitamente lo contrario** — luz dramática de una sola fuente,
   sombras profundas casi negras, contraste alto, grano visible, grade cálido cinematográfico — y
   confirma que se aplique **a todo el proyecto de forma permanente**, sustituyendo la regla anterior,
   no como pieza puntual. Motivo dado: quiere que el material se vea "mucho más profesional" con esa
   luminosidad.

**Aviso que queda anotado, no para bloquear la decisión del cliente, sino para que quien retome este
proyecto sepa por qué existía la regla anterior:** el look de iPhone no era una preferencia estética
sin más — estaba atado a la premisa fundacional del proyecto (documentada en la cabecera de
`CLAUDE.md`): *que un cliente que entre físicamente al local no note ninguna diferencia respecto a lo
que vio en Instagram.* Una luz de estudio dramática es memorable, pero también es el acabado que con
más probabilidad **no** se va a encontrar el cliente sentado a la mesa real. El cliente ha confirmado
que asume esa diferencia a cambio de un resultado más profesional. Queda su decisión, documentada.

**Regla vigente desde 2026-09-10:**

- Luz **dramática de una sola fuente**, dura, ligeramente cálida, entrando en ángulo (arriba-lateral).
- **Sombras profundas, casi negras**, con caída fuerte — la mayor parte del encuadre puede quedar casi
  en negro fuera de la zona iluminada.
- **Contraste alto**, no plano. Negros marcados, no levantados.
- Balance de blancos **cálido** (aprox. 3000-3300K), no neutro.
- **Grano de película visible**, sutil pero real.
- **Profundidad de campo puede ser corta** si la composición lo pide — ya no rige la regla de fondo
  siempre legible.
- Grade cinematográfico intencionado, no plano de móvil.

**Cómo aplicarlo en prompt (inglés):**
```
One dramatic, hard, slightly warm key light from one direction, deep
near-black falloff shadows across most of the frame, heavy contrast,
warm cinematic colour grade (~3000-3300K), visible fine film grain,
moody and editorial, not flat and not neutral daylight.
Negative: no flat even lighting, no bright airy look, no neutral white
balance, no wide legible background unless the composition calls for it,
no phone-snapshot look.
```

**Lo que NO cambia pese a este giro:** el hiperrealismo, la fidelidad al plato y al local reales
(regla 1), y el encuadre bajo y cercano a la mesa de la regla 9 cuando aplique. Esta regla gobierna
**solo** luz, contraste, grano y profundidad de campo — nunca licencia para inventar mobiliario,
vajilla o comida que no exista en el local.

## 18. Ficha de personaje — obligatoria antes de generar a un protagonista

Añadida 2026-09-08 al rebajarse la regla 2. **Elevada a requisito duro el 2026-09-22**, cuando las
personas quedaron desbloqueadas del todo: si ya no hay una regla que impida mostrar caras, lo único
que puede romper la marca es que la cara cambie de un plano a otro. Esta regla lo impide.

**Regla:** ninguna generación de imagen o vídeo en la que una persona sea **protagonista** (regla 2)
se lanza sin una ficha de personaje aprobada. Las personas de fondo no la necesitan.

### Qué contiene la ficha

Un archivo por personaje en `personajes/<nombre>.md`, más su imagen de referencia aprobada:

1. **Nombre interno y papel** — «Marta, camarera de sala»; «Nuria, clienta habitual».
2. **Rasgos fijos** — edad aparente, complexión, tono de piel, pelo (color, largo, peinado), rasgos
   faciales, vello facial, gafas, tatuajes o marcas visibles. Redactados **en inglés**, tal cual se
   van a pegar al prompt, para que no se reescriban distinto cada vez.
3. **Vestuario canónico** — para personal, el uniforme real de la regla 21. Para clientes, un
   vestuario definido y repetible.
4. **Imagen de referencia maestra** — generada con `nano_banana_pro` a 2k, guardada en
   `imagenes/personas/`, con su `job_id` / `media_id` anotado en la ficha. Ese id se pasa como
   `image_references` en **todas** las generaciones donde aparezca el personaje.
5. **Plano de presentación** — el encuadre con el que se presentó al personaje (distancia, altura de
   cámara, focal aproximada), para poder volver a él cuando haya que reanclar la identidad.
6. **Qué NO hace** — límites de registro: si el personaje no habla a cámara, no baila o no toca la
   comida, se escribe aquí para que ningún guion posterior lo rompa.

### Cómo se usa

- **Antes de escribir el guion:** decidir qué personaje sale y abrir su ficha. Si no existe, crearla
  y aprobar su imagen maestra **antes** de generar una sola escena de la pieza.
- **En cada generación:** pasar el `job_id` de la imagen maestra como referencia, además de las
  fotos reales del local y del plato, y pegar los rasgos fijos en el prompt.
- **Al animar a vídeo:** la imagen maestra —o una imagen de escena ya anclada en ella— va como
  `start_image`.
- **Después de cada pieza:** si el personaje evoluciona (corte de pelo, uniforme nuevo), se
  actualiza la ficha. La deriva del modelo no decide la identidad; la decide la ficha.

### Dos límites que no se tocan

1. **Nunca la persona del vídeo plantilla.** Si se usa un Reel ajeno como referencia de estructura,
   el personaje generado tiene que ser claramente otro: distinta cara, distinto pelo, distinta
   complexión, distinta ropa. Del vídeo ajeno se copia el formato y el ritmo, nunca la persona:
   replicar el rostro de alguien real sería apropiarse de su imagen, y esa persona no ha dado
   permiso para aparecer promocionando Torre de Vega. Es la regla 1 aplicada a personas.
2. **Empleado real identificable → su consentimiento** (regla 2).

## 19. Escenas de mismo ángulo — encadenar imágenes de referencia SIEMPRE

Añadido 2026-09-08 por indicación del cliente, a partir de la plantilla
`plantillas/2026-09-08/02_mismo-plano-cambia-el-plato_7s.mp4`.

**El formato:** mismo encuadre, misma mesa, misma luz, misma mano — y lo único que cambia es el plato.
Es de los que mejor miden (45/43) y es baratísimo de producir, pero **solo funciona si la escena es
literalmente idéntica entre plano y plano**. Si la mesa, la luz o el ángulo bailan, el efecto se
rompe y queda un montaje cualquiera.

**Regla:** en cualquier pieza donde varias tomas comparten ángulo y escena, **cada generación se
ancla en las imágenes ya generadas de las tomas anteriores**, pasadas como `image_references`. No
basta con repetir el prompt: dos generaciones con el mismo texto dan dos mesas distintas.

**Cómo aplicarlo:**
1. Generar y aprobar la **imagen 1** (escena base completa: mesa, mantel, fondo, luz).
2. Para la **imagen 2**, pasar la imagen 1 como `image_references` **además** de las fotos reales del
   plato nuevo. Pedir explícitamente que la mesa, el mantel, el fondo y la luz **no cambien**.
3. Para la imagen 3, pasar la 1 y la 2. Y así sucesivamente — la cadena se acumula.
4. **Al animar a vídeo**, pasar como `start_image` el `job_id` de la imagen correspondiente, para que
   el vídeo herede la misma escena.

Aplica igual al formato de acumulación (mesa que se llena) y a cualquier serie con encuadre fijo.
Ver `instagram/reel_02_mesa_que_se_llena.md`, fase A.

## 20. Efectos de texto por capas — intención vigente, técnica AE histórica

Desde 2026-09-17 se resuelven en Remotion como capas, máscaras y entradas temporizadas. La receta AE siguiente es histórica y no activa esa herramienta.

Añadido 2026-09-08: **al cliente le gustan** los efectos donde el texto aparece al retirarse un
elemento, o queda por detrás de un objeto. Usarlos cuando el guion lo permita.

**Qué son:** texto que no aparece con un simple fundido, sino **revelado por el movimiento de la
escena** — una mano que se retira y descubre la palabra, un plato que se posa y el texto emerge
detrás, texto que pasa por detrás de un objeto en primer plano.

**Cómo se hacen en AE (todo disponible por MCP):**
- **Texto detrás de un objeto:** duplicar el clip, enmascarar el objeto en la copia superior
  (`mask.add` + `mask.set_path`) y colocar la capa de texto entre las dos. El objeto tapa el texto.
- **Revelado por movimiento:** `layer.set_track_matte` con `matteType: "alpha"` o `"lumaInverted"`,
  usando como matte una forma que sigue al elemento que se retira.
- **Revelado simple:** cronometrar la entrada del texto al fotograma exacto en que el elemento sale
  de cuadro. Es el más barato y el 80 % del efecto.

**Con la tipografía aprobada** (regla de tipografía: Bodoni MT Regular, tracking amplio, sin
contorno, sombra suave). El efecto es el movimiento, no el estilo — la tipografía no cambia.

## 21. Uniforme real del personal de sala

Precisado por el cliente el 2026-09-08 sobre `imagenes/personal/camarero2.png`.

**El uniforme es:** polo negro con el logo bordado en el centro de la espalda —"RESTAURANTE / 1980 /
TORRE DE VEGA / «EL MORA»" con la torre, en dorado y blanco— y **pantalón de traje negro**.

- ❌ **Nunca vaqueros.** Repetir `black suit trousers, no denim, no jeans` en **cada** generación donde
  aparezca personal de sala — por la regla 9quater, las restricciones negativas no se heredan de una
  llamada a otra.
- ❌ **De `camarero2.png` solo se puede usar la espalda del primer término.** El empleado que aparece
  al fondo tiene la cara visible y **no se puede reproducir** — es una persona real identificable
  (ver el matiz de la regla 2: hace falta su acuerdo). Excluirlo con `no second person in background`
  o encuadrar solo la espalda.

La foto sí es una referencia excelente para el bordado, el tejido del polo y las bandejas metálicas.

**Aplica también a vídeo.**

## 22. Si existe material real de una textura caótica, NO se genera

Rechazado por el cliente el 2026-09-08: *"esa imagen de la parrilla es muy falsa"*. La imagen estaba
correctamente anclada a las fotos reales de la parrilla y aun así se leía como IA.

**Por qué:** el modelo **promedia y ordena**. Ante fuego, brasa, humo, hollín, grasa quemada o
cualquier textura irregular, devuelve una versión limpia y simétrica: llama uniforme de lado a lado,
todas las barras al rojo por igual, rejilla sin hollín, composición centrada. Justo lo contrario de lo
que hace que ese plano parezca real. Y si el plano se intercala con fotogramas reales del mismo sitio,
el contraste deja el fallo todavía más a la vista.

**Regla:** cuando el cliente ha aportado vídeo o fotos del elemento —**la parrilla, la brasa, el
fuego, el humo**—, ese plano sale del material real. Se extrae el fotograma, no se genera.

**Cómo aplicarlo:**
- Antes de escribir un prompt, comprobar si el plano ya existe en `imagenes/parrilla/` o en los vídeos
  del cliente. Un vídeo de 30 s a 60 fps son 1.800 fotogramas: casi siempre hay uno que sirve.
- Si falta un encuadre concreto (p. ej. un plano abierto), **buscarlo primero en el vídeo** muestreando
  a lo largo de todo el metraje, no solo al principio. Así aparecieron
  `parrilla_abierta_trabajando.jpg` y `parrilla_abierta_llamarada.jpg`, que existían y no se habían
  visto.
- Generar solo lo que no está grabado: platos emplatados, mesa puesta, servicio en sala.

**Lo que sí se genera bien:** superficies ordenadas y predecibles — un plato servido, una botella, una
mesa, una persona con uniforme. Ahí el promediado del modelo no estorba.

## 23. OBLIGATORIO — los prompts se escriben con las plantillas de `directoria-cloud`

Exigido por el cliente el 2026-09-08, después de detectar que se estaban escribiendo prompts en prosa
libre ignorando la metodología del proyecto.

**Regla:** todo prompt de imagen se construye con
[`directoria-cloud/templates/prompt-imagen.md`](../02-metodologia-prompting-directoria-cloud/templates/prompt-imagen.md). No es
orientativo.

### Las dos partes

1. **JSON Decoded Brief** — los 14 campos: `subject_identity`, `realism`, `environment`, `lighting`,
   `camera` (`lens_mm`, `aperture_f`, `iso`, `shutter`, `lens_to_subject_m`, `subject_to_bg_m`,
   `cct_k`), `composition`, `imperfections`, `palette`, `mood`, `film_stock`, `negatives`.
   Para **`nano_banana_pro` y `gpt_image_2` este JSON stringificado ES el `params.prompt`.**
2. **Párrafo en lenguaje natural** que reescribe *cada* campo en prosa — para que el cliente lo revise,
   no para la API.

### Reglas de la plantilla que no se saltan

- **Tokens `@image1`, `@image2`…** nombrados en el campo donde mandan, nunca "the reference image" en
  vago. El orden tiene que coincidir con `medias[]`.
- **Coda fotográfica obligatoria** al cierre: cámara / lente / f/ / ISO / `natural color grade` /
  `Photographic realism, no text.`
- **Micro-imperfecciones reales** en `imperfections`, nunca "8k hyperrealistic".
- Si un campo no se puede inferir del brief, **se omite**. No se inventa.

### ⚠️ Dónde choca con las reglas de este cliente, y quién gana

| Campo de la plantilla | Qué pide | Qué manda en Torre de Vega |
|---|---|---|
| `film_stock` | Kodak Portra 400, Vision3 500T, grano de película | **Regla 17 vigente (2026-09-10).** Se rellena con el acabado dramático: `warm cinematic colour grade around 3000-3300K, heavy contrast with deep near-black shadows, visible fine film grain`. *(Corregido el 2026-09-14: decía `iPhone capture, no film grain`.)* |
| `aperture_f` | f/1.8-2.2, profundidad corta, bokeh cremoso | **Regla 17 vigente.** Profundidad corta permitida según composición; no obliga a fondo siempre legible |
| `cct_k` | Cálido dramático | **Regla 17 vigente.** ~3000–3300K como intención de look; 9ter se conserva como antecedente, salvo excepción de pieza aprobada |

La estructura de la plantilla es obligatoria; **los valores los mandan las reglas de este fichero.**

**Aplica también a vídeo** — ver la regla 11 de `reglas_videos.md`.

## 24. El modelo se inventa el logo de la marca sobre la mantelería — prohibirlo por su nombre

Incidente 2026-09-09, generando la banda 1 del [Reel 04](../04-guiones-reels-reales/reel_04_volvemos_16.md). El
prompt cerraba, como manda la plantilla, en `no text, no logo, no watermark`, y aun así
`nano_banana_pro` devolvió una servilleta de papel con **`TORRE DE VEGA` impreso y un emblema
encima**, inventados de cero.

**Por qué pasa:** el nombre de la marca aparece en `subject_identity` para anclar el sitio ("a laid
table at Torre de Vega, a nearly 50-year-old village grill restaurant..."). El modelo lee ese nombre
como algo que **pertenece a la escena** y lo estampa en la primera superficie textil que encuentra. El
`no text` genérico del final no basta contra un nombre propio que el propio prompt ha introducido.

**Cómo aplicarlo:** siempre que el prompt nombre la marca y en el encuadre haya servilletas, manteles,
delantales, posavasos o cartas:

1. En `environment`, describir la pieza como neutra y decirlo entero:
   *"a completely plain white cloth napkin, blank, unprinted and undecorated, with no logo, no emblem,
   no crest and no lettering of any kind on it"*.
2. En `negatives`, prohibirlo por su nombre además del `no text` genérico:
   `no printed napkin, no logo or emblem or crest or monogram on the napkin, no brand name on any
   cloth, no lettering anywhere in the image, no restaurant name`.

Es la misma lógica de la regla 9quater: **las restricciones negativas hay que repetirlas y hay que
nombrarlas**, no confiar en una fórmula genérica de cierre.

## 25. Las micro-imperfecciones van en la comida y en el material, NUNCA en suciedad

Rechazado por el cliente el 2026-09-09, sobre el lote de los Reels 04, 05 y 06: *"esta imagen tiene
manchas en el plato de líquido que se ha caído pero no me gusta nada"* y *"estas imágenes están
perfectas pero tienen una mancha en el mantel"*.

**Qué pasó.** El campo `imperfections` de la plantilla de `directoria-cloud` pide micro-imperfecciones
reales, y se rellenó con cosas como `one small splash of sauce on the rim of the plate`,
`a faint smear of juices on the plate rim`, `pan juices pooling unevenly`. El modelo las obedeció y
además las amplió por su cuenta: sembró **motas de comida sobre el mantel**. Y como el lote va
encadenado (regla 19), esas motas se propagaron **idénticas a las ocho tomas de la serie**.

**La distinción, que es la regla:**

| ✅ Imperfección que suma realismo | ⛔ Imperfección que se lee como suciedad |
|---|---|
| Los pliegues de plancha del mantel | Manchas, cercos o motas sobre el mantel |
| La trama del tejido irregular | Migas o restos de comida fuera del plato |
| El vidriado desigual del barro | Gotas de aceite o salsa sobre la porcelana |
| Una patata caída fuera del montón **dentro del plato** | Comida caída **sobre la mesa** |
| Una loncha doblada sobre sí misma | Un plato sin limpiar el borde |
| Una marca de fuego real en el exterior de la cazuela | Cubertería con marcas de uso |

**Cómo aplicarlo:** en `imperfections`, solo textura y colocación. Y en `negatives`, prohibirlo
explícitamente en las dos superficies:
`no stain on the tablecloth, no marks or spots on the linen, no crumbs on the cloth, no food outside
the plate, no sauce or oil on the plate rim, no smears, no dirty plate`.

Es hermana de la regla 15 (nada de sobras): **la mesa se fotografía recién puesta y el plato recién
servido, no a media comida.**

## 26. Nada debajo del plato: ni servilleta, ni paño, ni papel

Indicado por el cliente el 2026-09-09: *"no quiero que haya servilletas debajo de los platos"*.

La foto real de las gambas (`imagenes/comida/gambas.jpg`) lleva una servilleta doblada entre el plato
y la cazuela, así que el modelo la reproducía fielmente en cada generación. **No se quiere.** El
recipiente va directamente sobre el plato, y el plato directamente sobre el mantel o la mesa.

**Cómo aplicarlo:** decirlo en `environment` (*"sitting directly on the tablecloth with nothing
underneath it - no napkin, no cloth, no placemat and no paper"*) y repetirlo en `negatives`
(`no napkin under the plate, no cloth or paper or placemat under any dish`). La servilleta **al lado**
del plato, en su sitio de mesa puesta, sigue siendo correcta.

## 27. Para arreglar un defecto pequeño, reencadenar con «un solo cambio» — y si el modelo insiste, parchear el píxel

Validado el 2026-09-09 arreglando el lote de los tres Reels.

**El patrón que funciona (3 de 3 a la primera):** pasar la imagen ya generada como `@image1`, listar
en `subject_identity` **todo lo que debe permanecer idéntico**, y abrir `environment` con
`THE ONE CHANGE:` seguido del único arreglo. Es mucho más fiable que regenerar desde cero, porque no
hay que reconquistar todo lo que ya estaba bien.

**El límite, medido:** hay defectos que el modelo **repone una y otra vez** por mucho que se prohíban.
Las motas del mantel volvieron a aparecer en tres intentos seguidos, incluso partiendo de una imagen
donde ya no estaban. Cuando eso pasa, **dejar de gastar créditos**: si el defecto está sobre una
superficie de textura regular (mantel, madera, pared), se clona un parche limpio de la propia imagen
con los bordes difuminados, y es exacto, instantáneo y gratis.

Receta que se usó (`PIL`): buscar automáticamente una ventana de la misma imagen que sea del mismo
material y no tenga píxeles oscuros, igualar su tono medio al del anillo que rodea el destino, y
pegarla con una máscara con desenfoque gaussiano de la mitad del *feather*. **El origen se toma de la
misma imagen**, nunca de otra, para que coincidan trama, luz y grano.

⚠️ **No intentar detectar las manchas automáticamente por umbral de oscuridad**: la propia trama del
mantel dispara cientos de falsos positivos. La detección se hace mirando un contact sheet de la
franja sospechosa de todas las tomas a la vez — ahí las manchas cantan y la trama no.

## 28. Fotos de producto para la carta web — fondo blanco + `multiply`, nunca recorte a alfa

Añadido 2026-09-13, al producir las 38 imágenes de plato de la carta web
(ver [`informes/2026-09-13_carta-web_mapa-de-imagenes.md`](../05-informes-medidos/2026-09-13_carta-web_mapa-de-imagenes.md)).

**El caso de uso es distinto al carrusel de Instagram**: aquí el plato tiene que quedar aislado, a
78-82 px, junto al nombre y el precio, sobre el fondo claro de la página (`#e9ecef` en esta web). No
es una foto de sala ni de mesa puesta: es **fotografía de producto sobre ciclorama blanco**.

### Cómo se pide la imagen

- `aspect_ratio:"1:1"`, cenital puro por defecto; 3/4 alto solo cuando el plato no se lee desde
  arriba (brochetas, porciones de tarta, salseras).
- El plato **solo** en el encuadre, directamente sobre el blanco, **nada debajo** (regla 26), nada
  al lado, margen limpio en los cuatro lados.
- En `environment`: *"a pure white seamless studio background"*.
- En `lighting`, la fórmula que ha funcionado en las 38:
  *"one hard, slightly warm key light from the upper left at roughly 45 degrees, strong directional
  modelling with deep well-defined shadows inside the dish and a single short soft contact shadow
  under the plate; the seamless white ground behind and around the plate stays clean and bright and
  never falls into shadow"*.
- En `negatives`, además de los de siempre: `no coloured or grey or gradient background, no props or
  cutlery lying on the background, no tablecloth, no wooden table`.

### Cómo se convive con la regla 17

La regla 17 pide sombras casi negras cubriendo la mayor parte del encuadre. **Aquí no se puede**: si
el fondo cae a negro, el fondo deja de poder quitarse. El reparto es: **la luz dramática va sobre la
comida** (fuente única, dura, ~3100 K, contraste alto, sombras marcadas dentro del plato, grano
visible) y **el fondo se queda blanco limpio**. Es fotografía de producto editorial, y así queda
anotado por si algún día el cliente prefiere otra cosa.

### El fondo NO se recorta — se elimina en el navegador

Las dos formas obvias de recortar **fallan**, y las dos se probaron y se midieron:

| Vía | Por qué falla |
|---|---|
| Flood-fill por umbral desde los bordes | La porcelana blanca está a la misma distancia del blanco que el fondo: la inundación entra en el plato y se lo come. Pasó con el plato del jamón y con la bandeja de croquetas. |
| `remove_background` de Higgsfield | Recorta **solo la comida**: tira el plato y la mano. Rompe la regla 1 (el plato de barro del local es parte de la promesa) y elimina el gesto. |

**Lo que sí funciona:** entregar la imagen **sin alfa**, sobre blanco puro `#FFFFFF`, y en el CSS:

```css
img.tdv-dish-img{ mix-blend-mode: multiply; }
```

Sobre cualquier fondo claro el blanco desaparece, el plato blanco y la mano quedan enteros y la
**sombra de contacto real de la foto se conserva** y se funde con el fondo. Cero artefactos de borde.

⚠️ Solo vale sobre fondo claro. Si la página pasa a fondo oscuro, el plan B es servir cada imagen
sobre su propia pastilla blanca (`mix-blend-mode:normal; background:#fff; border-radius:6px`).

**Paso previo obligatorio:** corregir el punto blanco antes de exportar. `nano_banana_pro` devuelve a
veces el fondo a ~`#EDEDED` en vez de blanco puro (5 de 38 en este lote), y `multiply` lo delata como
un velo gris. `imagenes/carta_web/preparar_para_web.py` lo hace: escala cada canal según la mediana
de las esquinas y luego aplana a `#FFFFFF` exacto solo el fondo conectado al borde.

### Y la regla que no cambia

Sigue vigente la regla 1: **una imagen de plato solo se genera si hay foto real de ese plato.** En
este lote, 33 de los 71 productos de la carta no tenían ninguna, y el cliente decidió dejarlos sin
imagen en vez de inventarles un emplatado. Esa es la respuesta por defecto.

### Y si la web es de fondo OSCURO (añadido 2026-09-14)

`multiply` solo vale sobre fondo claro. La web en diseño (`web-referencia`) tiene la carta sobre
`#17201c`, y ahí hace falta **alfa real**. Lo medido:

1. **Platos no blancos** (terracota, cazuelas, salseras, platos de postre oscuros) sobre ciclorama blanco:
   `rembg` con `isnet-general-use` los recorta bien. Script: `imagenes/carta_web/recortar_alfa.py`.
2. **Platos blancos, tablas claras y bandejas**: ningún recorte los salva sobre blanco. El modelo
   neuronal trata la comida como sujeto y **tira el plato**, incluso sobre fondo oscuro. Hay que
   **regenerar cambiando solo el fondo** a carbón mate (regla 27, «THE ONE CHANGE»:
   *"replace the white seamless background with a flat, uniform, matte deep charcoal background
   (#1c1c1c)…"*) y recortar **sin modelo**, por luminancia baja + color neutro conectado al borde.
   Script: `imagenes/carta_web/recortar_fondo_oscuro.py`.
3. ⚠️ El carbón que devuelve `nano_banana_pro` **no es uniforme** aunque se pida: trae degradado y
   viñeteado. Recortar contra un único color de fondo deja cajas grises semitransparentes. Por eso el
   criterio es luminancia + croma, no distancia a un color.
4. Las manos que salen del encuadre se recortan con la muñeca en seco: desvanecer el alfa en la franja
   pegada al borde de la foto (los dos scripts lo hacen, 5 %).

**Para la próxima vez:** si ya se sabe que la web es oscura, **generar desde el principio sobre carbón
los platos blancos** y sobre blanco los oscuros. Ahorra la ronda de regeneración.

## Checklist rápido antes de generar cualquier prompt de imagen

- [ ] ¿Todos los elementos del encuadre (mobiliario, cuadros, manteles, decoración) existen de verdad
      en las fotos de referencia del local?
- [ ] Si hay protagonista, ¿tiene ficha e imagen maestra aprobadas? Si es un empleado real identificable, ¿hay consentimiento? El fondo incidental no necesita ficha.
- [ ] ¿El plato/bodega protagoniza el encuadre según corresponda?
- [ ] ¿La luz está descrita en texto (K, tipo de fuente) en vez de forzada por imagen de referencia
      compartida?
- [ ] Si es parte de un lote/carrusel, ¿varía ángulo, distancia y personas respecto a las otras fotos
      del mismo lote?
- [ ] ¿El aspect ratio es el correcto? (4:5 fotos plato)
- [ ] Si hay personas de fondo, ¿evita expresión/gesto idéntico simultáneo en todo el encuadre?
- [ ] ¿El ángulo nuevo del local/bodega está anclado a una foto real existente, no inventado desde cero?
- [ ] Para foto de plato/lifestyle, ¿el encuadre es cercano e íntimo (no un plano abierto de sala) según
      el estilo validado en la regla 9?
- [ ] ¿La superficie de mesa visible corresponde 1:1 a una foto real de esa ubicación exacta?
- [ ] ¿Se han incluido todas las referencias reales relevantes disponibles, no solo las mínimas (regla 10)?
- [ ] Para foto amplia de sala, ¿se sigue la receta validada de la regla 9sexies (refs de geometría + ref de estilo, cámara baja 35mm, botella en primer plano desenfocada, tercios)?
- [ ] Para carrusel de plato nuevo, ¿se sigue la secuencia de 4 tomas validada en la regla 10bis (cenital, 3/4 cercano, detalle, contexto de mesa)?
- [ ] Si hay comensales de fondo, ¿son genéricos y desenfocados (regla 11), evitando el plano por encima del hombro, el plano de acción con cuchillo en primer plano, y el comensal de espaldas como sujeto compositivo — todos rechazados por el cliente?
- [ ] Si es un lote de varios platos, ¿la variación de ángulo entre fotos es perceptible de verdad (lens/encuadre/cantidad de sala visible), no solo un cambio numérico menor en las specs (regla 11, corolario)?
- [ ] ¿La generación pide `resolution:"2k"`, no `"4k"` (regla 12)?
- [ ] Si hay más de una mano en el encuadre, ¿son de géneros distintos entre sí (regla 13)? ¿Y en el conjunto de la serie, predominan las manos de mujer?
- [ ] ¿Se ha confirmado que todas las referencias usadas son fotos reales de verdad, no generaciones de IA guardadas por error en la misma carpeta (regla 14)? ¿Las generaciones ya aprobadas solo se usan como referencia de estilo, nunca de geometría?
- [ ] ¿Ningún plato se muestra ya comido ni ningún vaso/copa aparece vacío en un lugar protagonista del encuadre (regla 15)?
- [ ] En el encuadre cercano de la regla 9, ¿sigue siendo visible el punto de apoyo físico de la mesa (borde, pata, silla real) para que no "flote" (regla 16)?
- [ ] Si el prompt nombra la marca y hay servilletas, manteles o delantales en cuadro, ¿se ha prohibido
      el logo inventado por su nombre en `environment` **y** en `negatives` (regla 24)?
- [ ] ¿El campo `imperfections` contiene solo textura y colocación, y ninguna suciedad —ni manchas en
      el mantel, ni salsa en el borde del plato, ni comida fuera del plato (regla 25)?
- [ ] ¿No hay ninguna servilleta, paño ni papel **debajo** de un plato o una cazuela (regla 26)?
- [ ] Si es una foto de producto para la **carta web**, ¿va sobre ciclorama blanco puro, sin nada
      debajo del plato, y se ha pasado por `preparar_para_web.py` para corregir el punto blanco
      antes de servirla con `mix-blend-mode: multiply` (regla 28)?
