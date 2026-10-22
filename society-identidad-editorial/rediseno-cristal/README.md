# Rediseño «Papel y cristal» (21/10/2026)

Propuesta de rediseño de las seis pantallas del alta y la home de Society: se mantiene la identidad de papel, pero sin saturarla, y se añade una capa de cristal esmerilado (*glassmorphism*) como la del vídeo de referencia. Es una **maqueta de diseño**: el código de la app lo escribe Víctor.

> **Versión 2 (22/10/2026):** «Escena y hoja», con el aspecto «Papel vegetal» y letra Archivo + Lobster + Montserrat. Está en [`v2/escena/`](v2/escena/README.md); el estudio previo, en [`v2/estudio/`](v2/estudio/README.md). Lo que sigue describe la v1.

| Archivo | Qué es |
| --- | --- |
| `index.html` | Las 6 pantallas maquetadas (390 pt de ancho) |
| `cristal.css` | Tokens y piezas del sistema: color, cristal, tipografía, botones |
| `render.cjs` | Exporta cada pantalla a PNG @3x (1170 px de ancho) con Playwright |
| `preparar_personajes.py` | Descarga los personajes sin fondo de Higgsfield, recorta el margen y los deja en `img/personajes/` |
| `personajes.tsv` | Los 9 personajes: id, nombre, trabajo de Higgsfield y URL del PNG sin fondo |
| `img/` | Fotos reales de Torre de Vega (recortadas de las capturas), referencias estéticas, logotipo y papel |

Para regenerar: `python3 preparar_personajes.py && node render.cjs png/`.

## 1. Diagnóstico de las pantallas actuales

Lo que funciona y se queda:

- El **titular póster** (mayúsculas condensadas + una palabra en cursiva) es reconocible y tiene actitud.
- La paleta papel, cobalto, mostaza y tinta.
- El **botón deslizante** con pomo mostaza y la barra de pestañas flotante.
- Los personajes como hilo narrativo de cada paso.

Lo que satura:

1. **Tres texturas compitiendo** en la misma pantalla: papel arrugado muy contrastado, tinta con trama de puntos y bordes rasgados. El ojo no sabe dónde descansar.
2. **Cambios bruscos de fondo** (negro → papel → negro) dentro de una misma pantalla, que cortan la lectura en bloques.
3. **Mostaza repetida**: en «Empezamos» hay tres pomos mostaza y la lupa; la guía de marca dice uno por pantalla.
4. **Ilustración muy cargada** (azul saturado, sombras duras de cómic) junto a un titular igual de pesado: dos protagonistas a la vez.
5. **Texto gris sobre papel arrugado** con contraste irregular: las arrugas oscuras caen debajo de las letras.
6. Anton es muy estrecha y pesada; en tamaños medianos (títulos de tarjeta de 24–30 pt) cuesta leerla.

## 2. Referencia: el vídeo

Análisis por escenas con Higgsfield (no se pudo descargar el vídeo directamente): fondo en **degradado suave amarillo y azul**, tarjetas blancas flotantes con sombra suave que se mueven en 3D, carpetas con textura de mármol azul, amarillo y blanco, un personaje mascota 3D con sudadera azul y rayo amarillo, y tipografía grande y limpia sobre las fotos. Es el mismo reparto de color que Society (azul + amarillo), así que encaja sin forzar.

## 3. Tipografía

Pinterest bloquea la lectura automática de sus tableros, así que la investigación se ha hecho con las búsquedas de tableros de Pinterest sobre *instagram font pairing* y *bold serif and condensed sans pairing*, y con los resúmenes de tendencias 2026 que recopilan esos tableros. Patrón dominante en Instagram: **grotesca pesada + serif cursiva fina**, con como mucho dos familias y una monoespaciada pequeña de etiqueta.

| Papel | Antes | Ahora | Por qué |
| --- | --- | --- | --- |
| Titulares e interfaz | Anton + Schibsted Grotesk | **Bricolage Grotesque** (variable: 800 a ancho 75 en titulares, 400–650 en texto) | Una sola familia para titular y texto. Tiene eje de tamaño óptico: en grande se ve con carácter (remates de tinta, contraste), en pequeño se abre y se lee cómoda. Más ancha que Anton: se lee mejor a 24–30 pt |
| Palabra en cursiva | Playfair Display Black Italic | **Instrument Serif Italic** | La cursiva fina sobre una grotesca negra es el emparejamiento más repetido en los tableros de Instagram. Aligera el titular en vez de añadir más peso |
| Etiquetas | Space Mono | **DM Mono** 500 | Más fina y regular; no compite con el titular |

Todas son Google Fonts con licencia OFL y están en Figma.

Escala (base 16, razón 1,25): etiqueta 11 · texto 15,5 · título de fila 17 · título de tarjeta 28–30 · titular de pantalla 72–84 (la cursiva va a 1,2× porque su altura de x es menor).

## 4. Reglas de diseño aplicadas

**Color 60 / 30 / 10.** 60 % papel (más claro, `#F1EDE4`, con la textura al 38 % en vez de al 100 %); 30 % cristal y cobalto; 10 % mostaza, que queda **solo para la acción principal** de cada pantalla (pomo del botón, botón «Avisarme» o el «+» de la barra) y para las cifras grandes del aviso cobalto.

**Cristal con propósito.** El cristal solo va en contenedores (tarjetas, barra de pestañas, buscador, botones), nunca en todo. Debajo siempre hay algo que difuminar: unas «auroras» desenfocadas de cobalto y mostaza que imitan el degradado del vídeo.

| Token | Valor |
| --- | --- |
| Desenfoque | `blur(22px) saturate(170%)` |
| Cristal claro | blanco 70 % → 38 % en diagonal + reflejo de canto |
| Cristal oscuro | tinta 93 % → 84 % (botones y barra) |
| Borde | 1 px blanco 85 % (claro) / 16 % (oscuro) |
| Sombra | dos capas suaves y una línea de luz interior arriba |

**Contraste.** El texto pequeño nunca va sobre cristal de menos del 60 % de opacidad. Tinta sobre cristal claro supera 12:1; papel sobre cristal oscuro, 13:1; el gris de apoyo `#6E695F` da 4,7:1 sobre papel. Las cifras mostaza sobre el cristal cobalto dan unos 4:1, válido solo porque van a 40 pt (texto grande, mínimo 3:1). El cobalto no se usa como texto sobre tinta.

**Profundidad en tres planos.** Fondo (papel + auroras) → cristal → personaje 3D. Los personajes **salen** de su tarjeta (los pies o la cabeza rebasan el borde), que es lo que da el efecto de «pop-out» del vídeo. Los titulares van por encima del personaje cuando se cruzan, como en la guía («foto que se cruza con las letras»).

**Ritmo.** Rejilla de 8 pt, márgenes de 16–24 pt, radios concéntricos (exterior 32, interior 24, píldoras redondas), una tarjeta = una idea.

## 5. Personajes

Nueve personajes 3D en estilo de película de animación, con la ropa en la paleta de la marca (cobalto, crema y tinta, con un toque mostaza). Generados con Higgsfield (`nano_banana_pro` pedido, el servidor registró `nano_banana_2`; 2 cr cada uno, 18 cr en total) y con el fondo quitado con `remove_background`.

| Id | Personaje | Pantalla |
| --- | --- | --- |
| c0 | Creadora sentada con portátil | Inicio |
| c1 | Chica de americana cobalto saludando con tableta | Empezamos |
| c2 | Fotógrafa agachada | Análisis |
| c3 | Selfie con plato | Así te ve internet |
| c4 | Pizzero lanzando la masa | Tu primer carrusel y tarjeta de la home |
| c5 | Camarera con dos cervezas | Aviso de la home |
| c6 | Chef emplatando | Tarjeta «Campaña a tu medida» |
| c7 | Dueño de bar con bigote | Tarjeta «Responder reseñas» |
| c8 | Creador grabando con estabilizador | Reserva (tarjeta de Reels) |

Son ilustraciones de interfaz, no piezas para los clientes: la regla cero de firma de rodaje real se aplica a lo que se publica en las redes del bar, no a la mascota de la app.

## 6. Datos

Todos los textos y cifras salen de las capturas originales (Torre de Vega, 4,8 de media, 1.695 reseñas, colores y letras, «10 % menos de clientes frente a julio»…). «Restaurante Casa Pepe» sigue marcado como relleno. Las dos referencias estéticas (hamburguesa y sushi) son posts de terceros que ya estaban en la captura y solo sirven de ejemplo.
