# Pantallas de Society para Figma

Réplica de las 7 capturas de `../1.png` … `../7.png` (390 × 844 pt, iPhone).

## Cómo meterlas en Figma

Arrastra los `.svg` de esta carpeta al lienzo de Figma. Cada uno entra como un marco con capas con nombre:

- **Titulares** («TU BAR», «merece», «¿QUÉ HAY», el logo «Society»…): vectores ajustados al tamaño exacto de la captura. Para cambiar la frase hay que reescribirla con la fuente.
- **Textos de interfaz** (botones, tarjetas, campos): texto editable en Schibsted Grotesk.
- **Fotos**: imágenes incrustadas (trama de semitono generada a partir de fotos de Higgsfield).
- **Iconos, destellos, bocadillo `@society`, interruptores**: vectores.

`png/` tiene cada pantalla a 2× para revisarla o enseñarla sin Figma.

## Fuentes

| Uso | Fuente |
| --- | --- |
| Titulares en mayúscula | Anton |
| Palabra en cursiva y logo | Playfair Display Black Italic |
| «PLAN» (pantalla 2) | Playfair Display Italic, peso 620 |
| Interfaz | Schibsted Grotesk |
| Lema de la pantalla 2 | Space Mono |

Todas son Google Fonts y están disponibles en Figma.

## Regenerar

`../_svg/build.py` genera los SVG y `../_assets/procesar.py` prepara las fotos (trama, papel, recortes). Las fotos de partida están en `../_assets/original/`.

## Avisos

- Los logos de Instagram, TikTok, Facebook y X de la pantalla 7 son dibujos aproximados; en el diseño final hay que usar los oficiales siguiendo sus normas.
- «La Taberna del Patio», «Calle Mayor, 12» y «Madrid» son datos de relleno.
