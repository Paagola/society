# Society · Guía de identidad visual

Society es una app con IA que hace de agencia de marketing para bares y restaurantes. Su identidad tiene que parecer **un feed de Instagram bien diseñado**, porque eso es lo que vende: la propia app debe verse como los posts que genera.

Esta guía describe el sistema visual que muestran las nueve imágenes de esta carpeta. Son imágenes generadas con IA (GPT Image 2.5): sirven de referencia de estilo, no de piezas finales. Tipografías, logotipo e iconos hay que construirlos después en vector con las fuentes reales.

## Las imágenes de referencia

| Archivo | Qué es |
| --- | --- |
| [`…200816_fe588964…png`](hf_20260923_200816_fe588964-21c8-4412-b10d-85414cc49a7e.png) | Tablero de marca: logotipos, paleta, tipografía y aplicaciones |
| [`…200815_ab38d7ed…png`](hf_20260923_200815_ab38d7ed-4523-4591-8088-8c26a1b957bf.png) | Logotipo en cuatro versiones (A, B, C y D) |
| [`…200814_9831cb23…png`](hf_20260923_200814_9831cb23-0ed9-42dd-9006-c89fb188fac4.png) | Pegatinas e iconos de interfaz |
| [`…200815_e4186f88…png`](hf_20260923_200815_e4186f88-dc7d-459a-90b6-2ed19c21021e.png) | Feed de Instagram 3 × 3 |
| [`…200814_8cf95ed4…png`](hf_20260923_200814_8cf95ed4-bba4-4d0e-a5df-9ddc5eb3214f.png) | Post sobre papel: «NADIE VA *a donde* NO VE» |
| [`…200819_bceef1eb…png`](hf_20260923_200819_bceef1eb-7321-40d2-bacf-756f8d1c049f.png) | Post sobre cobalto: «PUBLICA *menos,* LLENA MÁS.» |
| [`…200840_dc848600…png`](hf_20260923_200840_dc848600-b5b8-4692-96b4-044e0b858756.png) | App: bienvenida, busca tu local, conecta tus redes |
| [`…200840_58901a9d…png`](hf_20260923_200840_58901a9d-f5a5-4594-85d6-bcfed6eb78f4.png) | App: crear post (qué hay hoy, elige el estilo, así queda) |
| [`…200840_78e142f5…png`](hf_20260923_200840_78e142f5-9d5b-4c1a-9a28-3b4b863d0876.png) | App en modo oscuro: bienvenida, hoy para tu bar, tu plan |

## Concepto

**Cartel de imprenta sobre papel.** Cada pieza, sea un post o una pantalla de la app, se compone como un cartel:

- un titular enorme en condensada negra;
- una palabra de ese titular en serif cursiva, que le da el tono humano;
- una foto en blanco y negro con trama de semitono que se cruza con las letras;
- y un par de detalles en color: el bocadillo `@society`, un destello o una pegatina.

El resultado es editorial y con actitud, pero cercano: más revista y cartel de bar que startup tecnológica.

## Color

### Paleta

| Rol | Nombre | Hex | Uso |
| --- | --- | --- | --- |
| 60 % | **Papel** | `#ECE8DC` | Fondo de casi todo. Siempre con textura de papel arrugado |
| 30 % | **Cobalto** | `#2440E0` | Posts y bloques a sangre, tarjetas destacadas, bocadillo `@society`, destellos, estados activos |
| 10 % | **Mostaza** | `#F5C518` | Acción principal (botón), pegatinas «NUEVO» y «MÁS MESAS», barra destacada de una gráfica |
| Texto | **Tinta** | `#141414` | Titulares, texto y fondo del modo oscuro. No cuenta en el reparto |

### Regla 60 / 30 / 10

El color más llamativo ocupa siempre la parte más pequeña. Aplicado a cada soporte:

- **Feed de Instagram (9 posts):** unos 3 posts en cobalto a sangre, 3 de foto y 3 sobre papel. La mostaza solo aparece en 2 o 3 pegatinas.
- **Pantalla de la app:** fondo papel. El cobalto marca tarjetas destacadas, chips seleccionados, interruptores y la pestaña activa. La mostaza se reserva para **un único botón principal** por pantalla.
- **La mostaza va siempre junto al cobalto**, nunca como color principal. Sola, sobre cobalto azul y amarillo recuerda a Walmart o IKEA; por eso se limita al 10 % y a elementos pequeños.

### Contraste medido (WCAG)

| Combinación | Contraste | Uso permitido |
| --- | --- | --- |
| Tinta sobre papel | 15,04 : 1 | Todo |
| Cobalto sobre papel / papel sobre cobalto | 5,94 : 1 | Todo, incluido texto pequeño |
| Tinta sobre mostaza | 11,30 : 1 | **Texto de los botones mostaza: siempre en tinta** |
| Mostaza sobre cobalto | 4,47 : 1 | Pegatinas y titulares grandes; no texto pequeño |
| Cobalto sobre tinta | 2,53 : 1 | **No usar para texto** en modo oscuro: el cobalto es superficie con texto papel encima |
| Mostaza sobre papel | 1,33 : 1 | **Nunca** como texto o trazo fino sobre papel |

### Modo oscuro

Fondo tinta `#141414` (60 %), texto y tarjetas en papel (30 %), cobalto en tarjetas destacadas y mostaza en el botón principal (10 %). El logotipo pasa a papel con el subrayado cobalto.

## Tipografía

Las imágenes combinan tres familias. Como son imágenes generadas, las fuentes exactas no existen: la tabla propone equivalentes con licencia libre (SIL Open Font License), que se pueden usar en app, web e impresión.

| Papel | Cómo se ve | Equivalente propuesto | Uso |
| --- | --- | --- | --- |
| **Titulares** | Grotesca ultracondensada, muy pesada, en mayúsculas y con textura de imprenta gastada | **Anton** | Titulares de posts y pantallas, cifras grandes, pegatinas |
| **Acento** | Serif de alto contraste en cursiva, gruesa | **Playfair Display Italic** (700–900) o **DM Serif Display Italic** | La palabra en cursiva de cada titular y el logotipo «Society» |
| **Interfaz y texto** | Grotesca neutra, limpia | **Schibsted Grotesk** (400–700) | Botones, campos, tarjetas, textos de pie, etiquetas de pestañas |
| **Etiquetas** (opcional) | Monoespaciada pequeña en mayúsculas | **Space Mono** o **IBM Plex Mono** | Rótulos pequeños del tablero («AGENCIA DE IA PARA BARES») |

Anton y Schibsted Grotesk ya estaban elegidas en la identidad anterior. Falta probar la serif al lado de Anton, porque su peso y su contraste tienen que casar.

### Cómo se escribe un titular

- Mayúsculas condensadas + **una sola palabra en cursiva**, en minúscula y normalmente en el centro: «TU BAR *merece* QUE LO VEAN.», «¿QUÉ HAY *hoy?*», «BUSCA *tu local*».
- Interlineado muy apretado (≈ 0,85–0,9). Las líneas casi se tocan.
- El titular ocupa todo el ancho y es lo primero que se ve. Nada compite con él.
- Terminar en punto cuando es una afirmación: «LLENA MÁS.»

### Escala orientativa en la app (390 pt de ancho)

| Estilo | Familia | Tamaño |
| --- | --- | --- |
| Titular de pantalla | Anton + serif cursiva | 64–88 pt |
| Titular de tarjeta | Anton | 24–32 pt |
| Título de fila | Schibsted Grotesk 700 | 16–17 pt |
| Texto | Schibsted Grotesk 400 | 14–16 pt |
| Etiqueta | Schibsted Grotesk 600 | 12 pt |
| Botón | Schibsted Grotesk 700 | 17 pt |

## Logotipo

El logotipo principal es **«Society» en serif cursiva negra con un subrayado de pincel cobalto** (versión A). Es el que las pantallas usan de forma natural y encaja con la palabra en cursiva de los titulares.

| Versión | Descripción | Uso |
| --- | --- | --- |
| **A · Principal** | «Society» en serif cursiva + subrayado de pincel cobalto (a veces con un destello mostaza al final) | Cabecera de la app, firma de posts, documentos |
| **B · Bocadillo** | SOCIETY en condensada papel dentro de un bocadillo cobalto, con sombra mostaza desplazada | Pegatinas, merchandising, avatar alternativo |
| **C · Con lema** | SOCIETY en condensada negra + «tu agencia con IA» en serif cursiva debajo | Portadas, carteles, primera pantalla |
| **D · Símbolo** | «S» en serif cursiva papel dentro de un bocadillo cobalto | Icono de app, avatar de redes, favicon |

Firma secundaria: el **bocadillo `@society`**, cobalto sobre papel o tinta sobre foto. Es literalmente un elemento de Instagram y aparece en casi todas las piezas.

## Recursos gráficos

### Fotografía

- **Blanco y negro con trama de semitono**, contraste alto, grano visible.
- **Recortada** (manos con copas, móviles o tazas) cuando se cruza con el titular; **en rectángulo con esquinas redondeadas** cuando va en una tarjeta.
- Temas: manos, copas, cafés, platos, terrazas y barras. Sin caras en primer plano salvo en ambiente.
- Excepción: en los posts **de foto** del feed y en la opción «Foto» del creador de posts, la comida va **a color**, porque tiene que abrir el apetito.

### Pegatinas

Con borde blanco troquelado y ligeramente giradas, como pegadas a mano.

| Pegatina | Color |
| --- | --- |
| `@society` (bocadillo) | Cobalto o tinta |
| NUEVO (estrella de puntas) | Mostaza con texto tinta |
| LISTO PARA PUBLICAR (píldora con megáfono) | Cobalto con texto papel |
| MÁS MESAS (sello redondo) | Mostaza, o tinta sobre papel |
| Destellos de cuatro puntas | Trazo fino cobalto (papel sobre cobalto) |
| Punto | Mostaza, en la esquina de los posts cobalto |

**Como mucho dos pegatinas por pieza y una sola mostaza.**

### Textura

Papel arrugado en todos los fondos claros, incluidas las pantallas de la app. Los titulares tienen un ligero desgaste de tinta. En el modo oscuro, grano sutil.

### Iconos

Línea gruesa con extremos redondeados, en tinta (papel en modo oscuro): inicio, buscar, calendario, crear, resultados, reseñas, megáfono y perfil. La pestaña activa, rellena en cobalto.

## Interfaz de la app

- **Cabecera:** logotipo «Society» arriba a la izquierda (centrado en pantallas con botón de volver) y bocadillo `@society` a la derecha.
- **Titular póster** debajo, ocupando el ancho.
- **Contenido** en tarjetas: papel con borde fino tinta, o cobalto cuando la tarjeta está destacada o seleccionada.
- **Botón principal:** píldora mostaza a todo el ancho, abajo, con texto tinta y flecha.
- **Botón secundario:** píldora con borde (cobalto o tinta) y fondo transparente.
- **Chips e interruptores:** cobalto cuando están activos.
- **Barra de pestañas:** fija. Propuesta: Inicio, Semana, Crear, Resultados, Perfil. Hay que unificarla, porque las imágenes usan pestañas distintas.
- **Vista previa de posts:** el post generado se enseña **como en Instagram** (cabecera con avatar, imagen, iconos de me gusta y comentario, texto y hashtags). Es la idea central del producto.

## Voz en los textos

- Español de España, tuteando: «Busca tu local», «¿Qué hay hoy?».
- Frases cortas y con gancho: «Tu bar merece que lo vean.», «Publica menos, llena más.», «Nadie va a donde no ve.».
- Habla del resultado para el bar (mesas, reservas, que hablen de ti), no de la tecnología.

## Qué no hacer

- Mostaza como color principal, en fondos grandes o como texto sobre papel.
- Más de un botón mostaza por pantalla.
- Garabatos, flechas o letra manuscrita.
- Logotipos de otras marcas (Instagram, TikTok, Facebook, X, Google) en piezas publicadas: las pantallas de la app los muestran por ser generadas; en diseño final se usan iconos propios o los oficiales respetando sus normas.
- Más de una palabra en cursiva por titular.
- Cobalto como texto sobre fondo tinta.

## Datos de relleno

«La Taberna del Patio», «Calle Mayor, 12», «Madrid», las alcachofas y los textos de ejemplo son ilustrativos. Hay que sustituirlos por datos reales antes de usar las piezas.

## Pendiente

1. Probar la serif cursiva real (Playfair Display o DM Serif Display) junto a Anton y elegir.
2. Construir el logotipo A y el símbolo D en vector.
3. Pegatinas e iconos en vector.
4. Tokens de color y tipografía para la app (modo claro y oscuro).
5. Fijar la barra de pestañas y pasar las pantallas a diseño final.
