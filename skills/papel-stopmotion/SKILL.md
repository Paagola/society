---
name: papel-stopmotion
description: 'Vídeos de Society en papel recortado y stop-motion, sin generar vídeo. Una imagen se corta sola en piezas (recortar.py) y Remotion las monta pieza a pieza con el componente Escena, con efectos explicativos (títulos en tiras, pegatinas numeradas, flechas, círculos, destellos), transiciones de papel, sonido de papel y el logo oficial. Actívala para cualquier vídeo, anuncio, explicación o reel propio de Society con estética de papel, collage o recortes, para montar una imagen «pieza a pieza», o si se menciona papel recortado, stop-motion, paper-cut, la terraza que se llena o «así funciona Society». No sirve para reels de clientes (esos van por director-reels y la firma de rodaje real).'
metadata:
  author: victor-society
  version: "1.0.0"
---

# Papel recortado en stop-motion

Estética: collage de papel rasgado, con sombras duras y fibra clara en los bordes, a 15 imágenes por segundo, con temblor de cámara y parpadeo de luz entre tomas. Colores de la identidad: papel, cobalto y tinta, y mostaza muy poca. Las piezas se montan de atrás adelante y cada figura de abajo arriba. Entran desde fuera del cuadro y suenan al posarse.

**El corte está automatizado. El trabajo de cada vídeo es el guion: qué escenas, en qué orden, con qué textos, efectos y transiciones.** No se miden polígonos ni se retocan piezas a mano.

> **Regla cero:** no se aplica. Es ilustración a propósito, no un plano que deba parecer rodado (`skills/README.md`, «Cuándo se puede saltar»). **Nada inventado** sigue valiendo: para explicar la app se usan sus pantallas reales (`society-identidad-editorial/pantallas`), y las escenas de bar son ilustraciones de marca, no clientes.

## Flujo (4 pasos, pocos tokens)

1. **Imágenes.** Pueden ser propias: pantallas de la app, recursos de la identidad o escenas ya generadas. Si hace falta una escena nueva, se genera en Higgsfield con `gpt_image_2_5`, 9:16 y 2K. En calidad media cuesta **1 cr**, con preflight antes (skill `higgsfield`). El prompt es la descripción de la escena más el bloque de estilo de [`references/prompt-estilo.md`](references/prompt-estilo.md). Hay que pedir la escena con los planos separados (fondo arriba, suelo abajo y figuras delante) y sin texto.
2. **Cortar** (sin mirar nada), desde la raíz:
   ```bash
   python skills/papel-stopmotion/scripts/recortar.py IMAGEN --id terraza                              # escena a pantalla completa
   python skills/papel-stopmotion/scripts/recortar.py pantalla.png --id pantalla-3 --modo recorte --escala 1.5   # elemento con transparencia
   python skills/papel-stopmotion/scripts/recursos.py    # solo la primera vez: fondos, máscaras y recursos gráficos
   ```
   Deja las piezas en `promo/public/papel/<id>/` y los datos en `promo/src/recorte/escenas/<id>.json`, y actualiza el índice. Tarda unos 40 s por escena.
3. **Guion.** Es un archivo en `promo/src/recorte/guiones/` que se registra en `promo/src/Root.tsx`, y solo usa las piezas de abajo. Para retener grupos (por ejemplo, «los clientes llegan después») se mira **una sola imagen**, `promo/out/papel/<id>/rejilla.png`, que tiene coordenadas 0–1, y se escriben las zonas.
4. **Render y revisión con una imagen:**
   ```bash
   cd promo && npx remotion render src/index.ts <Composición> out/<nombre>.mp4 --crf=18
   python skills/papel-stopmotion/scripts/hoja.py promo/out/<nombre>.mp4 --cada 22 --columnas 10 --ancho 150
   ```
   Se lee `promo/out/<nombre>-hoja.png`, con 40 fotogramas en una imagen, se corrige y se vuelve a renderizar. Unos 2 minutos.

## Piezas del guion (`promo/src/recorte/`)

| Pieza | Para qué | Props clave |
|---|---|---|
| `<Lienzo>` | Envuelve todo el vídeo: temblor, parpadeo y filtro de tinta | — |
| `<Fondo tipo desde hasta>` | Hoja de papel, cobalto o tinta a pantalla completa | `tipo: 'papel' \| 'cobalto' \| 'tinta'` |
| `<Escena id en dur …>` | Monta una imagen cortada, pieza a pieza, con su sonido | `x y escala` · `en` (negativo = ya montada) · `dur` · `desde` · `orden` · `grupos` · `sale` · `aparece` · `hasta` |
| `grupos=[{zona, en, dur, desde, orden, oculta}]` | Aparta las **figuras** cuyo centro cae en la zona (0–1) y les da su propio momento. `en: 1e9` = no llegan | el primero que coincide se queda la pieza; el fondo nunca se aparta (salvo `hojas: true`) |
| `sale={{en, dur, desde}}` | Desmontaje: las piezas se van volando, primero las de delante | — |
| `<Titulo en x y palo cursiva>` | Titular en dos tiras: palabra en palo seco + remate en cursiva | `tam` · `fuera` · `fondo1/2` · `desde` |
| `<Tira>` | Una tira suelta con cualquier texto | `mascara 0-3` · `fondo` · `rot` |
| `<Pegatina n en x y>` | Número de paso sobre estallido mostaza | `tam` |
| `<Recurso nombre en x y w>` | Recurso de la identidad que se estampa (`entra='golpe'`) o entra por un lado | `flecha` · `circulo` · `destellos` · `destello` · `subrayado` · `bocadillo` · `corazon` · `pin` · `sello` · `mano-movil` · `plato-tapas` · `brindis`… (`promo/public/papel/recursos/`) |
| `<Motas en x y>` | Recortitos que saltan (publicar, logo) | `n` |
| `<TransTiras en dur colores>` | Tiras rasgadas que cruzan y tapan el cuadro | cambia de escena en `en + dur/2` |
| `<TransHoja en dur color>` | Hoja rasgada que sube, tapa y se va | ídem |
| `<LogoSociety en lema paso={2}>` | **Logo oficial** (`promo/src/marca/Logo.tsx`), siempre al final sobre `<Fondo tipo="tinta">` | `cx cy escala` |

`desde`: `'cerca'` (el borde más próximo, por defecto), `'lados'`, `'arriba'`, `'abajo'`, `'izquierda'` o `'derecha'`. `orden`: `'natural'` (fondo, luego objetos de lejos a cerca y de abajo arriba), `'base'`, `'y'` (de arriba abajo, el de las pantallas), `'x'` o `'azar'`.

### Modo «dashboard»: menos piezas, un solo lienzo (Víctor, 28/09/2026)

Es lo preferido para anuncios. Hay **menos elementos transparentes, piezas más grandes, fotos que se mueven** y **ningún cambio de página**:

| Pieza | Para qué | Props clave |
|---|---|---|
| `<Mundo claves={[{f, x, y, z, r}]}>` (`camara.tsx`) | Todo va en un lienzo; la cámara viaja y se centra. El zoom es logarítmico: se puede entrar por un QR o una pantalla | `desde` · `hasta` · `curva` por clave (`SUAVE`, `SALE`, `ENTRA`) |
| `<FotoRasgada src x y w h en n>` (`foto.tsx`) | Cualquier foto en 5-9 trozos grandes rasgados, **sin cortar antes y sin PNG por pieza**. Luego vive (zoom, deriva, balanceo) | `costuras` (juntas de papel visibles) · `vida: 'zoom' \| 'deriva' \| 'quieta'` · `lejos` · `radio` |
| `<Raton ruta={[{f, x, y, clic}]}>` + `arrastre()` (`raton.tsx`) | Cursor que recorre, hace clic y arrastra cosas a su hueco | `agarrado` (tramos con la mano) |

`recortar.py` corta por defecto con `--min-area 1500`, es decir, piezas grandes. Se usa para escenas cuyo fondo tiene que verse vacío antes de que lleguen las figuras. Para el resto de fotos basta con `FotoRasgada`.

Con **`--objetos`**, cada objeto va entero en una sola pieza (la pizza con su plato, el vaso, la servilleta con los cubiertos) y solo el fondo se parte en trozos. Las juntas finas que unían objetos pasan al fondo. Así lo pidió Víctor el 28/09: los elementos sueltos no se trocean.

Ejemplo completo: [`promo/src/agencia/Agencia.tsx`](../../promo/src/agencia/Agencia.tsx), «Tu agencia con IA», 62 s. Tiene sus propias piezas de interfaz mezclada en `promo/src/agencia/piezas.tsx`: panel rasgado, titular startup, texto que se escribe, píldoras, botón, carga, publicación de Instagram, reel, papeleta y letras recortadas.

Plantilla de explicación en pasos: [`guiones/ComoFunciona.tsx`](../../promo/src/recorte/guiones/ComoFunciona.tsx), «Así funciona Society», 29 s. Su esquema es problema (escena con grupos retenidos) → pasos con pegatina, título y pantalla de la app → resultado (la misma escena con `aparece` y los grupos llegando) → logo.

## Reglas del lenguaje

- **La historia va primero** (memoria `anuncio-historia-primero`): el problema, en una escena reconocible; la app, como solución; el resultado, en la misma escena, y el logo, al final.
- **Una idea por pantalla** y títulos grandes (palo de 130–190 px, cursiva al 88 %), sin letra pequeña.
- **Todo lo que aparece es papel:** entra de fuera, cae, se estampa o se va. Nada se funde, se difumina ni se transforma.
- **Mejor cámara que transiciones.** En anuncios, un solo lienzo con `Mundo`. Las transiciones de tiras y hoja quedan para los vídeos por pasos, cada 4–5 s como mucho.
- **Mezcla de estéticas en cada pantalla.** Titular startup en Geist blanco sobre tinta o cobalto, más paneles de papel rasgado, más la cursiva de la identidad o las letras recortadas.
- **Nada se queda quieto.** Toda foto, al terminar de montarse, sigue moviéndose con `vida`.
- **Sin temblor.** `Lienzo` y `Mundo` no tiemblan por defecto: en un vídeo entero marea (28/09). Lo de papel sigue moviéndose a saltos, pero el cuadro está quieto.
- **Interfaz limpia, papel en el contenido.** Los contenedores (subida, petición) son normales: fondo translúcido y borde fino. Las fotos del usuario son tarjetas limpias y redondeadas; el papel va en escenas, trozos y letras.
- **Sin manos flotando ni papeletas.** Para «hacer una foto», un visor de cámara limpio. Para presentar Society, una tarjeta que sube (estilo startup) con el QR que se construye módulo a módulo.
- **Lo que sale de una estética usa esa estética.** La portada de un carrusel lleva la tipografía de la referencia elegida, no la de Society.
- **Cierre:** las palabras del muro se ordenan y se convierten en las letras del logo (`letrasLogo()` en `promo/src/marca/Logo.tsx`), sin cambiar de pantalla.
- **Sonido solo de papel**, que ya va integrado en cada pieza. Si el vídeo va a redes con música, se añade en el guion con un `<Audio>` a volumen bajo.

## Cómo corta `recortar.py` (por si algo sale raro)

1. **Regiones.** Mediana, gradiente de color, *watershed* y unión de parecidas; las ranuras blancas separan piezas.
2. **Hojas de fondo.** Uniones de regiones parecidas que son grandes (más del 4 %) y tocan el borde en más de 400 px. Lo que solo asoma al borde, como una mano, no cuenta.
3. **Sombra con la pieza.** Cada pieza se lleva la sombra y el filo que deja sobre la hoja.
4. **Lo tapado.** Se reparte por la línea de horizonte entre hojas (cielo / pared / suelo), columna a columna. Las hojas lisas se rellenan con grano; los mosaicos (piedras, baldosas) se estampan con trozos reales, con perspectiva. Las lisas se parten en trozos rasgados.
5. **Figuras.** Lo que se toca forma un objeto, y los objetos se ordenan de lejos a cerca por su base.

Revisión en `promo/out/papel/<id>/`: `capas.png` (gris = fondo, colores = objetos) y `montada.png`, que debe ser igual a la original salvo la fibra de los cortes. Si hay demasiadas piezas diminutas, se sube `--min-area` (por ejemplo, 600).

## Referencias

- Caso de origen, cortado a mano: [`produccion/society-papel-recortado/README.md`](../../produccion/society-papel-recortado/README.md) («La terraza que se llena»).
- Estilo de la skill externa `motion-design` (Paper-Cut): [`references/prompt-estilo.md`](references/prompt-estilo.md).
