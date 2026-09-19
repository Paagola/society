# Torre de Vega — contexto del proyecto

Restaurante **Torre de Vega "El Mora"**, casi 50 años, clientela fiel. Agencia de marketing
unipersonal. El objetivo de todo el contenido visual: que un cliente que entre físicamente al local
**no note ninguna diferencia** respecto a lo que vio en Instagram. No se vende una fantasía, se vende
la promesa exacta del sitio real.

---

## Producir un Reel — flujo completo

Cuando el usuario diga **"genérame un nuevo Reel como este"** y aporte un vídeo base, seguir este
flujo de principio a fin sin pedirle que indique ficheros.

### Lectura obligatoria antes de empezar

| Fichero | Qué contiene |
|---|---|
| [`documentación.md`](documentación.md) | **Documento maestro.** Parte I: proceso del Reel 01. Parte II: hallazgos medidos que corrigen la Parte I. |
| [`imagenes/reglas_videos.md`](imagenes/reglas_videos.md) | Reglas de vídeo/Reels. Especial atención a la 1 (imágenes antes que vídeo), 5 (nunca cámara estática a secas) y 6 (manos). |
| [`imagenes/reglas_imagenes.md`](imagenes/reglas_imagenes.md) | Reglas de imagen. Especial atención a la 1 (nada inventado), 2 (sin caras), 9 (encuadre cercano), 11 (planos rechazados) y 13 (género de manos). |
| Skill `after-effects-reels` | Detalle operativo de montaje, transiciones, tipografía, costes y elección de modelo. Se activa sola. |
| `instagram/reel_NN_*.md` | Guiones de Reels anteriores, como ejemplo de formato. |

### Pasos

1. **Analizar la plantilla sin gastar créditos.** Cortes en local con `ffmpeg`
   (`select='gt(scene,0.2)',showinfo`), y en paralelo `video_analysis_create` +
   `virality_predictor` en Higgsfield — **ambos son gratis en el plan Plus**. Límite del predictor:
   16 s.
2. **Escribir el guion** como `instagram/reel_NN_nombre.md`, traduciendo la **estructura y el ritmo**
   de la plantilla a Torre de Vega. Nunca copiar el look ni los platos de la plantilla: eso rompe la
   regla 1.
3. **Elegir fotos reales** de `imagenes/local/`, `imagenes/comida/`, `imagenes/vinos/`,
   `imagenes/tartas/` como referencia de cada escena. Verificar que las rutas existen.
4. **Generar las imágenes fijas** con `nano_banana_pro` a **2k** (cuesta lo mismo que 1k),
   encadenando cada imagen como referencia de la siguiente si la escena se repite.
   **Pasar siempre el fotograma de la plantilla del plano equivalente como referencia adicional**
   (regla 10 de `reglas_videos.md`, añadida el 2026-09-08): la plantilla manda en **ángulo, encuadre,
   distancia de cámara y reparto de luz**; las fotos reales mandan en local, platos y vajilla; y el
   acabado editorial dramático (regla 17 vigente) prevalece sobre el grade de la plantilla. Lo más parecido posible,
   pero con el estilo del cliente. Decir en el prompt qué papel tiene cada referencia.
5. **Presentar el lote completo de imágenes y esperar aprobación explícita** — regla 1 de
   `reglas_videos.md`. No lanzar `generate_video*` sin ese visto bueno.
6. **Animar solo los planos que necesiten vídeo real**, eligiendo modelo por caso de uso (skill
   §5ter). Los paneos y push/pull van en After Effects, gratis.
7. **Montar en OpenMontage + Remotion** (`C:\Users\victo\OpenMontage\remotion-composer`, composición
   `TorreDeVegaReel`), con la tipografía aprobada y verificando contraste texto/fondo midiendo
   **y** mirando el fotograma a tamaño real. *(Cambio del cliente el 2026-09-17: deja de pagar After
   Effects. Receta y trampas en `instagram/reel_09_carta_de_otono.md` §4ter.)*
8. **Actualizar el `.md` del guion** con lo que se haya aprendido.

### Calidad primero, coste después

1. **1080p es el mínimo innegociable.** Nunca 720p ni configuraciones con resolución sin verificar.
2. Entre las opciones que cumplen, **elegir por calidad**.
3. **El coste solo desempata** entre opciones equivalentes.

**Varias tomas por generación** *(indicación del cliente, 2026-09-17)*: usar los mejores modelos de
vídeo disponibles y, cuando el modelo lo admita, pedir **varias tomas dentro de un mismo vídeo**
(multi-shot) para después cortarlas en el editor. Rinde más material por crédito sin bajar de modelo.
«No gastar una brutalidad» sigue valiendo: preflight de coste y total antes de lanzar.

No proponer nunca una configuración más barata a costa de la calidad del vídeo. Si la única forma de
ajustar presupuesto es bajar calidad, decirlo abiertamente y que decida el cliente — no hacerlo por
defecto.

### Elegir plantillas: el contenido FILTRA, la puntuación solo ordena

> ⚠️ **Error cometido el 2026-09-08.** Se entregó un lote de plantillas donde el **nº 1 del ranking
> era un Reel de cocteles**, además de otro de coctelería y uno de una chica bebiendo en una terraza.
> Ninguno tiene que ver con un asador rural. Se priorizó la métrica sobre el encaje, después de haber
> escrito literalmente que "la relevancia importa más que la puntuación".

**El orden correcto es:**

1. **Filtrar por contenido primero.** Si el Reel no es de **vino, carne a la brasa, cocina
   tradicional o restaurante rural**, se descarta — por muy alto que puntúe. No entra al ranking.
2. **Puntuar solo lo que ha pasado el filtro.**
3. Cafeterías, coctelerías, sushi, hoteles urbanos y contenido *lifestyle* **no son referencia
   válida** para Torre de Vega, aunque la estructura de montaje sea transferible.

> ⚠️ **Segunda pasada del mismo error, el 2026-09-08 por la tarde.** Después de eliminar los cocteles,
> el ranking **seguía encabezado por la 05, que es una cafetería** (cheesecake, americano, cappuccino),
> justificada con la nota "solo se copia la estructura" — exactamente el mismo argumento con el que
> habían entrado los cocteles. Al medir las cuatro que faltaban apareció además la 06 con 56 de
> potencial viral, la más alta del lote, y es un restaurante asiático con poke bowl y sushi.
>
> **El criterio, otra vez:** una plantilla descartada por contenido **no vuelve al ranking** por sacar
> buena nota, ni con nota al pie. Lo que se conserva de ella es el **mecanismo** (rotular el producto
> en pantalla, que es lo que dispara la red del lenguaje), y ese mecanismo se injerta en una plantilla
> que sí encaja. Nunca al revés.

### Sin vídeo de referencia, buscarlo es obligatorio (corrección del 2026-09-17)

> ⚠️ **Error cometido el 2026-09-17** (Reel «carta de otoño»). El brief venía sin reel de referencia
> y se presentó el punto A con conceptos inventados a partir de patrones propios, dando por bueno
> `reel_de_referencia: ninguno`. Cliente: *"si no tienes ningún vídeo de referencia es obligatorio
> buscarlo por tu cuenta"*.

**Criterio:** si el usuario no aporta plantilla, **se buscan por cuenta propia al menos 2-3
candidatos**, se mide la viralidad de cada uno (`virality_predictor`, gratis, ≤16 s) y se **elige uno**
con la justificación. La búsqueda se hace **por palabras clave de la comida o el producto concreto del
Reel** (p. ej. «setas a la brasa», «guiso de otoño», «chuletón»), no por términos genéricos. El filtro
de contenido de arriba sigue mandando antes que la puntuación. Nunca «ninguno» como valor por defecto.

**Verificar el tablero antes de vaciarlo.** Un tablero de "food videography" puede ser en realidad de
bebidas y repostería. Mirar 3-4 pines antes de descargar 20 — y decir de qué es el tablero en el
informe.

**Y verlos siempre.** No fiarse del título del pin ni de la duración: montar contact sheets y mirar
qué hay dentro antes de meter nada en la carpeta del cliente.

### Fotos de producto para la carta web (añadido 2026-09-13)

La web de la carta (`carta-torre-de-vega/index.html`, bloques UAGB de WordPress) lleva una imagen por
producto. Es un caso de uso distinto al carrusel de Instagram y tiene su propia receta, en la
**regla 28 de `imagenes/reglas_imagenes.md`**. Lo esencial:

- Cenital sobre **ciclorama blanco puro**, 1:1, el plato solo, nada debajo ni al lado.
- **El fondo no se recorta a alfa.** Ni el flood-fill (se come el plato blanco) ni
  `remove_background` de Higgsfield (se come el plato y la mano) sirven. Se entrega sin alfa sobre
  blanco y se elimina en el navegador con `mix-blend-mode: multiply`, que además conserva la sombra
  de contacto real.
- Antes de servir, pasar siempre por `imagenes/carta_web/preparar_para_web.py`: corrige el punto
  blanco (el modelo devuelve a veces el fondo a ~#EDEDED y `multiply` lo delata como velo gris).
- La regla 1 sigue mandando: **si no hay foto real del plato, no se genera.** De los 71 productos de
  la carta, 33 no tienen ninguna foto y se quedaron sin imagen por decisión del cliente.
- **Si la web es de fondo oscuro** (caso de `web-referencia`, 2026-09-14), `multiply` no sirve y hace
  falta alfa real: platos oscuros → `recortar_alfa.py` (rembg); **platos blancos → regenerar solo el
  fondo a carbón y `recortar_fondo_oscuro.py`**. El modelo neuronal tira el plato blanco siempre. Si se
  sabe de antemano que la web es oscura, generar los platos blancos directamente sobre carbón.

Estado y pendientes en
[`informes/2026-09-13_carta-web_mapa-de-imagenes.md`](informes/2026-09-13_carta-web_mapa-de-imagenes.md)
— incluye los 33 productos que necesitan foto y 9 dudas de identificación abiertas con Jose.

### No «corregir» una imagen que el cliente aún no ha visto aplicando un criterio de otra pieza

> ⚠️ **Error cometido el 2026-09-15** (hero web, bullet time del chuletón). El primer fotograma salió
> con un chuletón sin hueso visible. Antes de enseñarlo se regeneró añadiéndole hueso, citando la
> «decisión cerrada» de `imagenes/parrilla/README.md` —que era del Reel 03—, y se encadenó el
> siguiente fotograma sobre esa versión. Cliente: *"la primera imagen muy bien, pero a las dos
> siguientes no sé por qué les ha salido un hueso"*. Dos generaciones tiradas y la entrega retrasada.

**Criterio:** los defectos **objetivos** (mano deforme, objeto inventado, texto roto, sobras) se
corrigen antes de presentar. Las decisiones **de producto o de gusto** (qué corte, si se ve el hueso,
cuánta llama, cuánto humo) se presentan tal como salen y decide el cliente. Una nota escrita para otra
pieza no convierte una preferencia en defecto.

En la misma sesión el cliente fijó cómo es el **fotograma final de un bullet time para el hero**:
plano cerrado, la pieza ocupa la mayor parte del encuadre —no flotando pequeña en el centro—, porque
ese fotograma se reutiliza como imagen fija al terminar el vídeo.

### El vídeo real de la parrilla está quemado — no abrir más Reels con él

> ⚠️ **Corrección del cliente el 2026-09-17** (Reel 09): *"el primer vídeo que hay quiero que lo quites
> porque ya se ha utilizado demasiadas veces"*. Era `imagenes/parrilla/clips/parrilla_volteo_master_4k60.mp4`,
> usado ya en el Reel 03, en el del chuletón y en el hero web.

**Criterio:** antes de meter metraje real en un guion, comprobar en qué piezas anteriores ya ha salido.
Ese clip de parrilla no se vuelve a usar salvo que el cliente lo pida; hace falta metraje nuevo de brasa.
Y como la regla 22 prohíbe generar fuego, **sin metraje nuevo no hay plano de brasa**.

### Registrar correcciones aquí, siempre

Cuando el cliente corrija un criterio o señale un error, **anotarlo en este fichero** además de en la
regla o skill correspondiente. `CLAUDE.md` se carga en cada sesión; una corrección que solo vive en
la conversación se pierde. Escribir qué se hizo mal, por qué, y cuál es el criterio correcto.

### Dónde van las plantillas descargadas

Siempre que se pida extraer/buscar Reels de referencia, descargarlos en:

```
plantillas/AAAA-MM-DD/
```

Una carpeta por día, con nombres descriptivos del formato (no el ID del pin): p. ej.
`01_we-make-you-enjoy_cocina-a-mesa_10s.mp4`. El cliente las revisa desde ahí. Añadir también los
contact sheets (`sheet_*.jpg`) para poder ojearlas sin abrir cada vídeo.

### Límites operativos de Higgsfield (plan Plus)

- **Máximo 2 trabajos simultáneos de *vídeo*.** Un tercero devuelve `Rate limit reached`. Encadenar de
  dos en dos.
  - **Las imágenes no tienen ese límite** *(medido el 2026-09-09)*: `generate_image_batch` aceptó
    **4 `nano_banana_pro` simultáneas** sin ningún rechazo. La plantilla de `directoria-cloud` habla de
    8 concurrentes. Para un lote de imágenes, batchear de 4 en 4 en vez de de 2 en 2 — un lote de 17
    imágenes baja de ~9 rondas a ~5.
- Virality Predictor: **máximo 16 segundos** de vídeo.
- `virality_predictor`, `video_analysis_create` y `get_cost` **no consumen créditos**.

### Preflight de coste, siempre

`get_cost: true` no lanza trabajo ni gasta nada. Usarlo antes de cualquier tanda y decir al usuario
el total antes de generar.

---

## Reglas duras — nunca romper

- **Nada inventado.** Solo mobiliario, vajilla y mantelería que existan en el local real.
- **Fuego, brasa y humo NO se generan** (regla 22, añadida el 2026-09-08 tras rechazar una parrilla
  generada por "muy falsa"). El modelo promedia y ordena justo lo que hace que esos planos parezcan
  reales: devuelve llama uniforme, brasa homogénea y rejilla limpia. Si el cliente ha aportado vídeo,
  el plano se extrae de ahí — muestreando **todo** el metraje, no solo el principio.
- **Nada de sobras.** Jamás un plato empezado, un vaso vacío o restos.
- **Manos:** si hay más de una, de géneros distintos. En el conjunto, predominan las de mujer.
- **Sin plano de cuchillo cortando** dominando el encuadre (rechazado, regla 11).
- **Micro-movimiento de cámara, nunca `"static camera"` a secas** (regla 5) ni macro-movimiento
  (paneo/dolly/órbita), que provoca morphing.
- **Prompts finales en inglés**, conversación en español.
- **Los prompts se escriben con las plantillas de `directoria-cloud`, es obligatorio** (regla 23 de
  `reglas_imagenes.md` y regla 11 de `reglas_videos.md`, exigidas el 2026-09-08). Imagen →
  `templates/prompt-imagen.md`: **JSON Decoded Brief de 14 campos stringificado como `params.prompt`**
  + párrafo NL para revisión. Vídeo → `templates/prompt-video-motion.md`: **PRESERVE / MOTION con
  timestamps / CAMERA / FILM GRADE** + NEGATIVE + coda fotográfica. La **estructura** es obligatoria;
  los **valores** los mandan las reglas del cliente (regla 17 prevalece sobre el film stock y la
  profundidad corta de la plantilla).
- **9:16 en Reels.** Las piezas para la **web** (vídeo hero, cabeceras) van en **16:9 horizontal**
  — corrección del cliente el 2026-09-15 al pedir el hero bullet time del chuletón: se había
  arrancado en vertical aplicando por inercia el formato Reel. Preguntarse siempre dónde se publica
  la pieza antes de fijar el aspect ratio.
- **Acabado editorial dramático, no de iPhone** (regla 17, invertida el 2026-09-10 a petición
  expresa del cliente, sustituyendo de forma permanente el look anterior). Luz de una sola fuente,
  dura y cálida, sombras profundas casi negras, contraste alto, grano de película visible y grade
  cinematográfico cálido (~3000-3300K). Ver el historial completo de la regla en
  `imagenes/reglas_imagenes.md` — incluye por qué existía el look anterior y por qué se ha invertido.
- **Personas en vídeo** (regla 18): primero se genera y aprueba su **imagen de referencia**, que se
  reutiliza en todas las generaciones para mantener continuidad. Y **nunca puede ser la misma persona
  que sale en el vídeo plantilla** — de la plantilla se copia la estructura, jamás a la persona.

## Preferencias (no bloquean un guion)

- **Rostros** *(rebajado a secundario el 2026-09-08)*: se prefieren manos, brazos y gestos, pero la
  cara **puede salir si el formato lo pide**. Un empleado real identificable tiene que estar de
  acuerdo; una persona generada por IA no plantea ese problema.

## Formato de entrega

Los informes, guiones y planes se escriben como **ficheros `.md` en el repo**, no como artifacts.
Están redactados para que una IA los ejecute en una sesión futura: parámetros exactos, IDs, prompts
en inglés, rutas reales y una sección de bloqueos al final. En la conversación va solo el resumen y
las decisiones que hagan falta.

## Qué requiere decisión del cliente

Estas cuatro cosas paran el flujo y no se pueden asumir:

1. **Aprobación del lote de imágenes fijas** antes de animar (regla 1).
2. **Selección de platos**, cuando el guion propone varios.
3. **Saldo de créditos** suficiente.
4. **Conceptos ya rechazados antes** — si el guion nuevo reintroduce algo descartado en un proyecto
   anterior, confirmarlo explícitamente en vez de darlo por bueno.
