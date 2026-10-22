# Rediseño v3 «Cristal líquido» (22/10/2026)

Tercera versión de las seis pantallas del alta y la home. Víctor descartó la v2 y pidió tres cosas:

1. Cambiar por completo el punto de vista y usar el cristal (glassmorphism) de forma profesional.
2. Letra **bold bubble**.
3. Personajes nuevos con otra estética. Tras descartar las pruebas en 3D (vinilo, cristal esmerilado y plastilina) y las cartoon sacadas de Pinterest, eligió una imagen de referencia: un retrato de **cómic urbano editorial**, con tinta negra gruesa, grises planos, un solo color de acento y grafitis de fondo.

Es una **maqueta de diseño**, no código de la app.

| Archivo | Qué es |
| --- | --- |
| `index.html` | Las 6 pantallas maquetadas (390 pt de ancho) |
| `v3.css` | Tokens y piezas del sistema v3 |
| `liquido.js` + `liquido.css` | El cristal líquido: refracción en los cantos, velo y brillo |
| `escenas.tsv` | De dónde sale cada escena y cada personaje, y cómo se ajusta |
| `preparar_escenas.py` | Descarga escenas y personajes en `../img/v3/` (no van al repo) |
| `render.cjs` | Exporta cada pantalla a PNG (`ESCALA=3` por defecto, 1170 px de ancho) |
| `estudio/letras.html` | Muestrario de las 12 letras bubble que se probaron |
| `estudio/cristal.html` | Comparación entre cristal plano y cristal líquido |

Para regenerar, desde `rediseno-cristal/`: `python3 v3/preparar_escenas.py` y luego `cd v3 && node render.cjs png/`. El cristal líquido solo se ve bien en Chromium, porque usa `backdrop-filter` con un filtro SVG.

## Cambio de punto de vista

En la v1 y la v2 el cristal iba en todos los contenedores. En la v3 se aplican las reglas del Liquid Glass de Apple (WWDC 2025):

- **Dos capas.** Abajo, el contenido: una escena ilustrada a pantalla completa, fotos y tarjetas sólidas. Encima, los controles de cristal que flotan: botones, píldoras, cifras, la hoja inferior y la barra de pestañas.
- **Nunca cristal sobre cristal.** Lo que va dentro de la hoja (buscador, listas, campos, botones) es sólido.
- **Una sola variante de cristal** (la normal, esmerilada). Solo se tiñe la acción principal, y nunca con más de un color por pantalla.
- **Refracción en los cantos.** El fondo entra curvado por el borde de cada pieza, como en una lente, y la pieza lleva brillo especular arriba y sombra suave debajo.
- **Radios concéntricos.** La hoja flota a 10 pt del borde del móvil y su radio es 55 − 10 = 45 pt.
- **Legibilidad primero.** Más velo blanco donde hay texto largo (la hoja, al 62–70 %) y menos en los controles pequeños (30–55 %).

## Cómo está hecho el cristal

`liquido.js` añade dos capas detrás de cada elemento `.liquido`:

- **Lente.** Recoge el fondo con un margen extra y lo dobla con un mapa de desplazamiento que tiene la misma forma que la pieza. El mapa es neutro en el centro y empuja hacia fuera en el bisel, con más fuerza cuanto más cerca del canto. Va recortada con una máscara SVG, porque en Chromium `clip-path` no redondea el fondo filtrado.
- **Brillo.** Velo de esmerilado, reflejo especular arriba a la izquierda y canto de luz de 1,5 pt.

Cada pieza ajusta el efecto con variables: `--bisel`, `--refraccion`, `--desenfoque`, `--velo-a` y `--velo-b`.

## Tipografía

| Papel | Letra | Por qué |
| --- | --- | --- |
| Titulares | **DynaPuff** 700, 31 pt (30 pt en la home) | Es bubble gruesa y redonda, pero con las letras abiertas: se lee bien con tildes, eñes y signos de apertura. De las 12 que se probaron (ver `estudio/letras.html`) es la que mejor aguanta palabras largas como «Estudiando» |
| Interfaz y texto | **Nunito** 400–900 | Redondeada como DynaPuff, pero neutra. Las etiquetas van en 800 y mayúsculas |

Las dos son Google Fonts con licencia OFL, así que valen en Figma y en la app sin coste. La palabra destacada del titular va en cobalto.

## Ilustración

- **Estilo:** cómic editorial, tinta negra gruesa, sombras en planos grises sin degradados y alto contraste.
- **Acento:** cobalto de la marca (`#2440E0`) en lugar del rojo de la referencia, en una prenda de cada personaje y en los grafitis.
- **Escenas:** seis, una por pantalla, sobre pared crema con grafitis. Son una creadora con portátil, una anfitriona con una chincheta de mapa, una fotógrafa con una ensalada, un selfi con pinchos, un pizzero y una camarera con dos cañas.
- **Personajes de la home:** tres bustos recortados como pegatina: un cocinero, un dueño de bar y un creador con estabilizador.
- **Personas:** todas son ilustraciones genéricas de la app. No representan a nadie del local.
- **Modelo:** se pidió Nano Banana Pro; Higgsfield lo registra como `nano_banana_2`.
- **Coste:** 18 créditos en la primera tanda y 8 más al rehacer cuatro escenas que salieron dentro de una viñeta, más el quitado de fondo de los tres bustos.

Algunas escenas necesitan un ajuste, que está anotado en `escenas.tsv` y que `preparar_escenas.py` aplica solo:

- **Recorte:** quita el marco fino que el modelo dibujó en Empezamos, Análisis y Así te ve internet.
- **Espejo a la izquierda:** alarga la pared de la Home con su reflejo, para que la camarera quede a la derecha del titular y no detrás.

El encuadre de cada pantalla (tamaño y posición del fondo) está en `index.html`. Siempre deja la cara del personaje a la vista, fuera de la hoja y de los controles.

## Contraste

Se ha medido sobre el render @3x. Para cada control de cristal se toma la luminancia del fondo que queda detrás del texto (el percentil 40 de la pieza, que es la parte clara) y se compara con la tinta `#16161A`.

| Pieza | Pantalla | Relación |
| --- | --- | --- |
| Logo | Inicio / Home | 7,8:1 / 14,2:1 |
| Píldora «Carrusel listo» | Inicio | 16,6:1 |
| Píldora «Buscamos tu ficha» | Empezamos | 10,2:1 |
| Lente de progreso | Análisis | 15,3:1 |
| Cifras 4,8 y 1.695 | Así te ve internet | 17,2:1 y 10,0:1 |
| Píldora «1 / 3» | Tu primer carrusel | 6,6:1 |
| Aviso del mes | Home | 15,3:1 |

La primera posición de «Carrusel listo», sobre el pantalón oscuro de la creadora, daba 4,3:1. Por eso subió a la pared. En la hoja y en las tarjetas sólidas el texto va sobre blanco o crema, así que los valores son los de la v2 o mejores. El gris `#5C5966` da 6,4:1 sobre crema.

## Datos

Los textos, cifras y fotos son los de la v1 y la v2, que salen de las capturas originales de Torre de Vega: 4,8 de media, 1.695 reseñas, Plaza Santa Ana 8, los colores del rótulo y el «10 % menos de clientes frente a julio». No se ha añadido ningún dato nuevo.
