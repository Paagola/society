# Rediseño v2 «Escena y hoja» (22/10/2026)

Segunda versión del rediseño de las seis pantallas del alta y la home. Sale del [estudio previo](../estudio/README.md) y de tres decisiones de Víctor:

1. **Estructura:** dirección 2, «Escena y hoja». Arriba una escena (pared, luz de ventana, suelo, peana) con el personaje y las fotos reales del local; abajo una hoja de cristal esmerilado con el paso, el titular, el texto y la acción.
2. **Aspecto:** tablero 1, «Papel vegetal». Cristal esmerilado sobre papel beis, luz de ventana y neutros cálidos. Sin los brillos azul y amarillo de la v1.
3. **Letra:** la del ejemplo «Beach vibes» (Dan + Carlsons Script + Montserrat), pero completamente legible.

Es una **maqueta de diseño**, no código de la app.

| Archivo | Qué es |
| --- | --- |
| `index.html` | Las 6 pantallas maquetadas (390 pt de ancho) |
| `escena.css` | Tokens y piezas del sistema v2 |
| `render.cjs` | Exporta cada pantalla a PNG (`ESCALA=3` por defecto, 1170 px de ancho) |

Para regenerar, desde `rediseno-cristal/`: `python3 preparar_personajes.py` (deja los personajes en `img/personajes/`), y luego `cd v2/escena && node render.cjs png/`.

## Tipografía

| Papel | Ejemplo | v2 | Por qué |
| --- | --- | --- | --- |
| Titular en mayúsculas | Dan | **Archivo** 900 al 75 % de ancho, 36 pt | Misma silueta estrecha y negra que Dan, pero con las letras más abiertas: se lee bien a 30–40 pt |
| Palabra en cursiva | Carlsons Script | **Lobster** en cobalto, 35 pt, girada −4° | Cursiva de pincel ligada, como Carlsons, pero con trazos gruesos y letras separadas. Es la más legible de su estilo en Google Fonts |
| Interfaz y texto | Montserrat | **Montserrat** 400–800 | La misma del ejemplo |

Como en «Beach vibes», la cursiva se monta sobre las mayúsculas y lleva un contorno del color de la hoja que la recorta. La diferencia es que aquí solo se solapa 2 pt, para que ninguna de las dos palabras pierda letras.

Las tres son Google Fonts con licencia OFL, y por eso valen en Figma y en la app sin coste. No he comprobado la licencia de Dan ni de Carlsons Script.

Los titulares son solo una guía: una línea o una línea más la cursiva, y nunca más de unos 80 pt de alto.

## Composición

- **Escena** (entre el 35 y el 65 % de la pantalla según el paso). Pared con dos franjas de luz de ventana desenfocadas, suelo, peana de piedra con sombra de contacto y marcos de cristal con fotos reales de Torre de Vega. Cada paso cambia el tono de la pared (arena, piedra, lino), así que se nota que se avanza sin cambiar de estilo.
- **Hoja de cristal**. Sube desde abajo con un asa y lleva etiqueta de paso, titular, texto y una sola acción principal.
- **Mostaza solo en la acción principal** de cada pantalla. El cobalto queda para la cursiva, los iconos de estado y las selecciones.
- **Personajes asentados**. Cada personaje se apoya en algo: la creadora en la peana, la camarera en la píldora de la propuesta y los de la home salen por el borde de su teja.
- **Home**. Arriba el titular guía y el aviso del mes como mini-escena. Debajo, un bento de tejas de cristal, la lista «Para hoy» y la barra de pestañas de cristal con el «+» mostaza.

## Tokens

| Token | Valor |
| --- | --- |
| Papel | `#EEEAE3` |
| Pared (base / arena / piedra / lino) | `#E4DCCF` / `#DDD0BD` / `#DCD7CE` / `#E1D7C8` |
| Hoja | blanco cálido al 74 % + `blur(24px) saturate(140%)` |
| Cristal | blanco al 56 % con reflejo diagonal, borde blanco 1 px y `blur(20px)` |
| Sombra | cálida (marrón al 38 % y al 16 %) con línea de luz interior arriba |
| Tinta / tinta 2 / gris | `#1B1B1B` / `#45423C` / `#66615A` |
| Cobalto / mostaza | `#2440E0` / `#F5C518` |
| Radios | hoja 34 · tarjeta 20–26 · píldoras redondas |

## Contraste (WCAG)

| Texto | Fondo | Relación |
| --- | --- | --- |
| Tinta `#1B1B1B` | hoja `#F6F3EE` | 15,6:1 |
| Tinta 2 `#45423C` | hoja | 9,1:1 |
| Tinta 2 | pared arena `#DDD0BD` (aviso de la home) | 6,6:1 |
| Cobalto `#2440E0` | hoja | 6,6:1 |
| Gris `#66615A` | hoja / papel | 5,5:1 / 5,1:1 |

El gris no se usa sobre las paredes de color (sobre arena bajaría a 4,0:1). Allí va tinta 2.

## Datos

Los textos, cifras y fotos son los de la v1, que a su vez salen de las capturas originales de Torre de Vega: 4,8 de media, 1.695 reseñas, Plaza Santa Ana 8, colores del rótulo y el «10 % menos de clientes frente a julio». No se ha añadido ningún dato nuevo.
