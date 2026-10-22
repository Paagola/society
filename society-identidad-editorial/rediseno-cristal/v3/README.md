# Rediseño v3 «Cristal líquido» (22/10/2026)

Tercera versión de las seis pantallas del alta y la home. Víctor descartó la v2 y pidió:

1. Cambiar por completo el punto de vista y usar el cristal (glassmorphism) de forma profesional.
2. Letra **bold bubble**.
3. Imágenes nuevas con otra estética. Primero se probaron personajes inventados (3D, cartoon y cómic urbano). Después Víctor pidió que la imagen fuera **pequeña, de ayuda**, como en la home, y que saliera **la mascota de Society** en vez de personajes inventados, **con la misma estética que sus ilustraciones del Drive**.

Es una **maqueta de diseño**, no código de la app.

| Archivo | Qué es |
| --- | --- |
| `index.html` | Las 6 pantallas maquetadas (390 pt de ancho) |
| `v3.css` | Tokens y piezas del sistema v3 |
| `liquido.js` + `liquido.css` | El cristal líquido: refracción en los cantos, velo y brillo |
| `escenas.tsv` | De dónde sale el fondo y cada pose de la mascota, y cómo se ajusta |
| `preparar_escenas.py` | Descarga el fondo y las poses en `../img/v3/` (no van al repo) y las limpia |
| `../img/mascota/drive/` | Las ilustraciones oficiales del Drive que se usaron como referencia |
| `render.cjs` | Exporta cada pantalla a PNG (`ESCALA=3` por defecto, 1170 px de ancho) |
| `estudio/letras.html` | Muestrario de las 12 letras bubble que se probaron |
| `estudio/cristal.html` | Comparación entre cristal plano y cristal líquido |

Para regenerar, desde `rediseno-cristal/`: `python3 v3/preparar_escenas.py` y luego `cd v3 && node render.cjs png/`. El cristal líquido solo se ve bien en Chromium, porque usa `backdrop-filter` con un filtro SVG.

## Cambio de punto de vista

En la v1 y la v2 el cristal iba en todos los contenedores. En la v3 se aplican las reglas del Liquid Glass de Apple (WWDC 2025):

- **Dos capas.** Abajo, el contenido: una pared crema con grafitis cobalto en los bordes, fotos y tarjetas sólidas. Encima, los controles de cristal que flotan: botones, la hoja inferior, el aviso de la home y la barra de pestañas.
- **Nunca cristal sobre cristal.** Lo que va dentro de la hoja (buscador, listas, campos, botones) es sólido.
- **Una sola variante de cristal** (la normal, esmerilada). Solo se tiñe la acción principal, y nunca con más de un color por pantalla.
- **Refracción en los cantos.** El fondo entra curvado por el borde de cada pieza, como en una lente, y la pieza lleva brillo especular arriba y sombra suave debajo.
- **Radios concéntricos.** La hoja flota a 10 pt del borde del móvil y su radio es 55 − 10 = 45 pt.
- **Legibilidad primero.** Más velo blanco donde hay texto largo (la hoja, al 62–70 %) y menos en los controles pequeños (30–55 %).

## Maqueta

Todas las pantallas siguen el esquema de la home:

- **Cabecera** arriba a la izquierda: etiqueta del paso y titular.
- **Mascota pequeña** a la derecha de la cabecera, de pie sobre la hoja o sobre el aviso. Es una imagen de ayuda, de unos 130 pt de alto (150 pt en Inicio), y nunca tapa texto.
- **Hoja de cristal** con el contenido sólido debajo.

La pared de fondo lleva un velo crema (90 % arriba, 86 % a 230 pt y 42 % a 380 pt), para que los grafitis no compitan con el titular.

## Tipografía

| Papel | Letra | Por qué |
| --- | --- | --- |
| Titulares | **DynaPuff** 700, 31 pt (42 pt en Inicio y 30 pt en la home) | Es bubble gruesa y redonda, pero con las letras abiertas: se lee bien con tildes, eñes y signos de apertura. De las 12 que se probaron (ver `estudio/letras.html`) es la que mejor aguanta palabras largas como «Estudiando» |
| Interfaz y texto | **Nunito** 400–900 | Redondeada como DynaPuff, pero neutra. Las etiquetas van en 800 y mayúsculas |

Las dos son Google Fonts con licencia OFL, así que valen en Figma y en la app sin coste. La palabra destacada del titular va en cobalto.

## Mascota

Es la mascota oficial de Society, sin cambios de diseño: cabeza de papel arrugado, cara negra mate con dos ojos blancos, aureola de alambre dibujada a tinta, sudadera cobalto con la estrella amarilla, piernas negras finas y zapatillas blancas. Las poses son nuevas y se generaron en Higgsfield copiando la estética de las ilustraciones del Drive (`mascota_completa_aureola_tinta_fondo_claro`, `mascota_pose_saludo`, `mascota_pose_celebrando` y `mascota_pose_senalando`, copiadas en `../img/mascota/drive/`).

| Pantalla | Pose |
| --- | --- |
| Inicio | Saluda con las dos manos |
| Empezamos | Busca con una lupa |
| Análisis | Sentada con el portátil |
| Así te ve internet | Enseña el móvil con una estrella |
| Tu primer carrusel | Hace una foto |
| Home, sobre el aviso | Tumbada, con la cara apoyada en las manos |
| Home, «Contenido desde una idea» | Levanta una bombilla (con borde blanco de pegatina, porque la tarjeta es cobalto) |
| Home, «Campaña a tu medida» | Habla con un megáfono |
| Home, «Responder reseñas» | Sostiene un bocadillo con tres puntos |

Cómo se hizo:

- **Modelo:** se pidió Nano Banana Pro a 2K; Higgsfield lo registra como `nano_banana_2`. Las cuatro ilustraciones del Drive van como referencia en cada petición, y el texto pide redibujar la mascota «como un dibujo más de la misma serie»: ilustración mate con aspecto de papel recortado, sin brillos ni render 3D.
- **Fondo:** cada pose se generó sobre gris cálido liso y se recortó con el quitafondos de Higgsfield. El quitafondos deja gris dentro de la aureola y borra los trazos amarillos sueltos, así que `preparar_escenas.py` compara con la imagen original: quita ese gris y recupera los amarillos.
- **Descartado:** una primera tanda salió en 3D brillante, como un muñeco de vinilo. Víctor la rechazó porque no era la estética del Drive.
- **Coste:** 38 créditos en total. 11 de la tanda en 3D descartada (5 imágenes y un recorte) y 27 de la buena (9 imágenes y 9 recortes). Una petición la bloqueó el filtro de contenido por error y no se cobró; se repitió con otra frase.

El fondo de pared con grafitis es lo único que queda de las pruebas de cómic. Las escenas y personajes de cómic de la primera entrega ya no se usan.

## Contraste

Se ha medido sobre el render @3x, con la posición de cada control sacada del navegador, y contra la tinta `#16161A`. En los controles de cristal se toma el percentil 40 de la luminancia de la pieza (la parte clara). En la cabecera se toma el fondo sin las letras y se usa el 5 % más oscuro, que es el peor caso.

| Pieza | Pantalla | Relación |
| --- | --- | --- |
| Logo | Inicio / Home | 15,0:1 |
| Botón de volver | Empezamos a Tu primer carrusel | 16,8:1 a 16,9:1 |
| Campana | Home | 17,2:1 |
| Aviso del mes | Home | 17,7:1 |
| Titular en tinta sobre la pared | Todas | 12,8:1 a 14,1:1 |
| Etiqueta gris `#5C5966` sobre la pared | Todas | 4,8:1 a 5,3:1 |

La etiqueta gris daba 4,5:1 con el velo anterior (86 % arriba), justo en el límite AA. Por eso el velo subió al 90 %. En la hoja y en las tarjetas sólidas el texto va sobre blanco o crema, así que los valores son los de la v2 o mejores.

## Datos

Los textos, cifras y fotos son los de la v1 y la v2, que salen de las capturas originales de Torre de Vega: 4,8 de media, 1.695 reseñas, Plaza Santa Ana 8, los colores del rótulo y el «10 % menos de clientes frente a julio». No se ha añadido ningún dato nuevo. La mascota es de la marca Society, no del local.
