# «Tu agencia con IA» · de 3 «me gusta» al panel de Society

Anuncio propio de Society (28/09/2026), vertical 1080 × 1920, 30 fps, **46 s**. Mezcla dos estéticas en cada pantalla:
- **Papel recortado:** la foto que se arranca como un papel, sombra dura, letras recortadas del logo y muro de imprenta.
- **Vídeo startup** de «La pizza que nadie vio»: fondo tinta con collage cobalto, titulares Geist que suben palabra a palabra, interfaz limpia y ratón.

**No cambia de página:** hay un solo lienzo y la cámara viaja por él y se centra en cada cosa. **Sin temblor.**

- Vídeo: `promo/renders/society-agencia.mp4`
- Composición: `SocietyAgencia` ([`promo/src/agencia/Agencia.tsx`](../../promo/src/agencia/Agencia.tsx)), con `npm run render:agencia`
- Imágenes generadas y prompts: [`prompts.md`](prompts.md)

## Guion

| Tiempo | Qué pasa |
|---|---|
| 0–1,5 s | **Hook rodado** (Seedance 2.5, reescalado a 2K y 60 fps; ver [`hook/plan.md`](hook/plan.md)): en la mesa real de Da Tonino, las manos del comensal sujetan el móvil en horizontal con la pizza en pantalla. El pulgar dispara y la pantalla hace el parpadeo real. |
| 1,5–2,7 s | **La pantalla se convierte en la foto:** la cámara entra en la pantalla del móvil y la foto crece sin cortes mientras la mesa y las manos se desenfocan y se funden con el fondo oscuro. |
| 2,7–3,7 s | **Directa a la subida:** sin publicación ni tarjeta de Society, la foto que hizo el móvil vuela del centro al hueco PLATO. La caja de subida aparece a su alrededor, transparente y con borde amarillo. |
| 3,4–7 s | «Sube tus *fotos.*» (los títulos del panel van centrados para que no toquen el borde con los acercamientos). El plato ya está; el ratón lleva la foto del local al hueco LOCAL. Cada foto llena su hueco, sin bordes blancos. Mientras la carga circular, casi instantánea, acaba en un check, la cámara se acerca a la caja. |
| 14,8–18,5 s | La cámara sube a «¿Qué quieres *crear hoy?*». En un contenedor blanco, con margen, se escribe rápido: «Esta es mi pizza Prosciutto e rucola, genérame un carrusel». |
| 19–21,5 s | Baja pasando por las fotos subidas. Elige **4:5**, la cámara se acerca a «Continuar →» y lo pulsa. |
| 21,5–29 s | «Elige tu *estética.*», con aire respecto al botón. La cámara se queda quieta y se desliza el carrusel: cada tarjeta grande pasa al centro, con el ratón encima, hasta «+ Tu estética», que sube **un post de `grid.png`** («The Golden Hour», recortado y reescalado). Luego «Creando tu carrusel…». |
| 27–34 s | «Tu *carrusel.*», con los «me gusta» subiendo con corazones. Tres láminas quietas, sin zoom, con el **texto dentro de la imagen** y la tipografía del post elegido: versalitas finas, caligrafía cruzándolas y el título por detrás de la comida. Van «PROSCIUTTO *e Rucola*» (la porción), «RECIÉN *del horno*» (la pizza entera) y «DA TONINO *te espera*» (el jamón). |
| 36,7–38 s | El ratón pulsa la flecha de volver. En «Y ahora, *un reel.*», ya con margen, pulsa «Crear reel». |
| 32–37 s | El reel real de Da Tonino: la tarjeta enseña su primer fotograma quieto hasta que la cámara llega y entonces arranca desde el segundo 0, con la música bajada. **Sin los planos de pasta** (salteado y emplatado, fotogramas 141–210): de la porción, corte seco a la paella. |
| 44–48 s | Una hoja de papel tapa el panel y entra el muro de imprenta, como la referencia «TAXI!!»: cada palabra llega de una forma distinta. |
| 47–52 s | Sin cambiar de pantalla, las palabras se ordenan: cada una se convierte en una letra del logo, y la última en el lema «Gestiona toda tu empresa con ayuda de IA». |

Sonido: papel en cada trozo, clics, tecleo, «me gusta», el audio del reel y la música CC0 «Can't Stop My Feet!» de Loyalty Freak Music, en bajo y con caída durante el reel.

## Material: real, generado y compuesto

| Qué | Origen |
|---|---|
| Pizza prosciutto e rucola y sala de Da Tonino (las fotos que se arrastran) | **Reales**: `caso/real-pizza.jpg` y `caso/real-sala.jpg`. El nombre de la pizza sale de su carta. |
| Foto que se hace y recibe 3 «me gusta» | **Real**: `caso/real-pizza.jpg`, reescalada a 2K y publicada apaisada, como la hizo el móvil |
| Hook de entrada | Generado con Seedance 2.5 a partir de la mesa real expandida a 9:16. El relleno del outpaint añade al fondo un comensal, una pizza y una caña **no documentados**. Detalle y costes en [`hook/plan.md`](hook/plan.md). |
| Reel | **Real**: el v6 de Da Tonino. Se usa la copia de trabajo `promo/public/agencia/reel-sin-pasta.mp4`, que quita el salteado y el emplatado (fotogramas 141–210): 30 fps, sin B-frames y con las marcas de tiempo a 0 |
| Estéticas | `posts/post1-4.png` y la propia, `posts/grid.png` |
| Collage de los paneles | Generado en papel (GPT Image 2.5) |
| Mesa de papel y mano con móvil | Generadas, pero **ya no se usan**: Víctor descartó ese principio el 28/09. La mesa sigue cortada (`--id mesa --objetos`) por si sirve en otra pieza. |
| Láminas del carrusel | 1 y 2, generadas en fotografía profesional (Nano Banana) a partir de la pizza real, con el tono de `grid.png`. La 3 la eligió Víctor: su generación del 25/09 (`hf_20260925_124628_d68d1d5f…`), recortada a 4:5. |
| Títulos, interfaz de la cámara, tarjeta de Society, botón «Empezar», portada, muro de palabras y logo | Compuestos en Remotion, para que el texto sea exacto |

**No verificado o ilustrativo:**
- Los contadores (3 → 1.284 «me gusta») son dramatización del anuncio, no datos de Da Tonino.
- La cabecera de las publicaciones usa el nombre «Da Tonino», no su usuario de Instagram, que no está verificado.

## Cómo está hecho (piezas reutilizables en `promo/src/recorte/`)

- **`Mundo` (`camara.tsx`).** La cámara recorre el lienzo con claves `{f, x, y, z, r}`. El zoom se interpola en escala logarítmica, por eso la entrada en el QR (de ×3,4 a ×260) es continua.
- **`FotoRasgada` (`foto.tsx`).** Cualquier foto entra en 5 a 9 trozos grandes rasgados que llegan volando a saltos y encajan. Son la misma imagen con `clip-path`: no hay PNG por pieza y no hay que cortar nada antes. Después la foto vive: zoom lento, deriva y leve balanceo. Con `costuras` se quedan las juntas de papel; sin ellas, la foto se une limpia.
- **`Raton` y `arrastre` (`raton.tsx`).** Cursor con curva suave, clic con onda cobalto y sonido, mano al arrastrar, y cosas que se cogen y encajan en su hueco.
- Piezas propias en `promo/src/agencia/`:
  - `piezas.tsx`: paneles rasgados, `Titular` startup, `Escribe`, `Chip`, `Boton`, `Carga`, `PostIG`, `Corazones`, `TarjetaReel`, `Papeleta` y `Recortes`, que son las letras del logo para cualquier texto;
  - `poster.tsx`: el cartel final.
- **Recursos** ([`scripts/preparar.py`](scripts/preparar.py)): pasa las imágenes a su tamaño en `promo/public/agencia/`. La tercera lámina se recorta con el encuadre bajado. Nada se mide a mano.

## Regenerar

```bash
python produccion/society-agencia/scripts/preparar.py   # imágenes a promo/public/agencia y medidas (con la matriz del QR)
cd promo && npm run render:agencia                       # ≈ 5 min
python ../skills/papel-stopmotion/scripts/hoja.py out/society-agencia.mp4 --cada 40 --columnas 12 --ancho 130
```

## Notas técnicas del render (28/09/2026)

- **«No frame found at position…» en Remotion.** Venía de copias cuya pista de vídeo empezaba en 0,023 s (el desfase del AAC del original). Las copias de trabajo se hacen con `setpts=PTS-STARTPTS`, 30 fps, `-bf 0` y `-video_track_timescale 15360`. Sirve de ejemplo el `ffmpeg` de `promo/public/agencia/hook.mp4`.
- **No se encadenan dos `OffthreadVideo` del mismo archivo:** los trozos se preparan antes con ffmpeg (`reel-sin-pasta.mp4`).
- **El hook** se usa a 1080 × 1920 (`hook.mp4`) porque la copia 2K con todo intra agotaba el tiempo de espera del render. El máster 2K a 60 fps está en `hook/hook-2k-60fps.mp4`.
- **Render:** `npx remotion render src/index.ts SocietyAgencia out/society-agencia.mp4 --crf=18 --timeout=120000`. Después se comprueba que el MP4 es nuevo: si falla, Remotion deja el anterior.
