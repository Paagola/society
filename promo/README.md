# Society · Vídeo promocional

Vídeo vertical (1080 × 1920) y apaisado (1920 × 1080), 30 fps, 57,1 s, hecho en **Remotion** (React + TypeScript) con la identidad de `society-identidad-editorial`: papel arrugado, Anton con una palabra en serif cursiva, fotos recortadas con trama, pegatinas y el bocadillo `@society`. Está compuesto como una revista, sin letra pequeña.

**Versión vigente: la fusión del 27/09/2026.** La historia de la versión de Víctor del 25/09 (apertura con el turno real de Da Tonino, escena de la historia, pases solo en 2D, firma pequeña) sobre la rejilla musical, la banda sonora CC0 y el caso rehecho de la v3 de Juanma. **Está sin renderizar:** los MP4 [`society-promo-v3-9x16.mp4`](society-promo-v3-9x16.mp4) y [`society-promo-v3-16x9.mp4`](society-promo-v3-16x9.mp4) y las copias de [`web/`](web/) son todavía los de la v3. Para rehacerlos: `npm run render`, `npm run render:wide` y `npm run export` (la banda sonora ya está rehecha).

**Uso:** privado. No publicar hasta cerrar lo que queda en «Pendiente».

## Escenas

Toda la pieza va sobre **una sola rejilla musical** (132,983 BPM, [`src/timeline.json`](src/timeline.json)): cada pase de página, cada foto que cae, cada sello y cada titular entra en un tiempo de la música. La marca no aparece hasta la ruptura, y ahí solo como firma.

| Tiempo | Escena | Qué cuenta | Pase de salida |
| --- | --- | --- | --- |
| 0,0 s | Gancho | El reel real de Da Tonino a pantalla completa, con **su propio sonido**, sin marco ni logo | Banda tinta |
| 2,7 s | Rigatoni | Plato real que sale a las 22:47; entra la música | Banda tinta |
| 4,5 s | Paella | Plato real, 23:12. Nadie lo fotografía | Banda tinta ↑ |
| 6,3 s | El hueco | La sala real. «OTRA NOCHE *que no subo nada.*» | Banda papel ↑ (se enciende la idea) |
| 9,0 s | Ruptura | La mano con el móvil escribe una frase real, «Pizza recién salida 🍕», y aparece «con Society» pequeño, como una firma | Hoja ← |
| 11,7 s | 01 · Tus fotos | Las 4 fotos reales del local caen y se apilan, una por tiempo, con su etiqueta. «Del local» | Banda tinta |
| 15,4 s | 02 · La IA propone | Anillo de propuestas generadas («Con IA») que gira a golpes y trae al frente cada descartada en su sello | Hoja ↑ |
| 19,0 s | 03 · Tú eliges | Las 6 aprobadas del carrusel reciben el sello | Hoja ← |
| 22,6 s | 04 · Y sale el carrusel | Las 7 láminas llegan como cartas y forman una tira; se desliza una por tiempo y el marcador «01/07» rueda con ella | Banda cobalto ↑ |
| 26,2 s | 05 · Y el reel | El móvil se enciende y la cámara entra en la pantalla en el primer golpe del reel, que suena con su audio original; al salir, la cartela «Da Tonino · Reserva tu mesa» | Banda mostaza (vuelve la música) |
| 40,6 s | 06 · Y la historia | «UN REEL *no basta.*» con la sala real; corte seco en el tiempo 6 a «Y LA *historia.*» en cobalto con la pizza de estudio. «Más mesas» | Banda cobalto |
| 46,0 s | Resultado | Real → Con IA → Lista. «4 FOTOS *reales.* 1 REEL + 1 *carrusel.*» «En un día» | Banda tinta ↑ |
| 51,5 s | Cierre | «MARKETING QUE *llena tus mesas.*», la mano con la copa y la firma pequeña con «Enero 2027». Golpe final y destellos | — |

- **Orden:** el carrusel va antes que el reel porque las seis imágenes aprobadas son las del carrusel. El reel v4–v6 salió de otras imágenes clave que no están en el repo.
- **Pases:** solo en 2D (`src/transitions.tsx`): hoja para la página siguiente y banda de color a sangre para los cambios y los golpes. Cubo, página (flip) y profundidad se retiraron el 25/09/2026: leían como maqueta, no como revista impresa.
- **Planes, Portada, Problema, Marca y la portadilla del caso** siguen en `src/scenes/`, pero la promo ya no los usa.
- **Zona segura de Reels:** titulares desde y = 250 y nada importante por debajo de y = 1600 ni en los 84 px de la derecha.
- **Piezas 3D:** en `src/three.tsx` (escenario, tarjeta con brillo, sellos y móvil de seis caras). Reglas:
  - nunca se pone `opacity` en un contenedor `preserve-3d`, porque aplana la profundidad;
  - dos tarjetas del mismo escenario no pueden cruzarse: en los anillos, la cuerda entre centros vecinos supera el ancho de la tarjeta; en la mesa de 01, cada foto aterriza plana a su altura (sin muelle que la hunda bajo las demás); en el carrusel, todas van en el mismo plano con hueco;
  - lo que va encima del escenario (titulares, marcador) lleva `zIndex` propio, porque Chrome puede pintar las tarjetas cercanas por encima.
- **Veracidad de los rótulos:** «Real» solo en las 4 fotos del local; «Con IA» en las propuestas; la lámina final pone «Lista», no «Publicada» (el carrusel y el reel no se han publicado). La foto real de los rigatoni se amplía para dejar fuera al comensal.
- **«En un día»:** las fotos reales, el carrusel y el reel (v3 a v6) se hicieron el 25/09/2026 según el historial del repo.

## Sonido

La banda sonora está **premezclada** en [`public/audio/banda-sonora.wav`](public/audio/banda-sonora.wav) con [`scripts/banda_sonora.py`](scripts/banda_sonora.py):

- **Música:** «Can't Stop My Feet !» de Loyalty Freak Music, álbum *ROLLER DISCO DANCE DANCE* (2018), **CC0 1.0 Universal** (dominio público, sin atribución obligatoria). Ficha: <https://freemusicarchive.org/music/Loyalty_Freak_Music/ROLLER_DISCO_DANCE_DANCE/Loyalty_Freak_Music_-_ROLLER_DISCO_DANCE_DANCE_-_04_Cant_Stop_My_Feet_>. Copia usada: espejo del corpus [SoundSafari/CC0-1.0-Music](https://github.com/SoundSafari/CC0-1.0-Music) → `public/audio/loyalty-freak-music-cant-stop-my-feet.mp3` (320 kb/s). Licencia comprobada en la ficha de FMA el 25/09/2026. Es instrumental (medido con separación de voces).
- **Rejilla:** la música (129,994 BPM) se estira un 2,3 % con Rubber Band, sin cambiar el tono, hasta el pulso de la canción del reel (132,983 BPM). Así el reel entra y sale en tiempo.
- **Montaje musical, por compases enteros:**
  0. en el gancho, sin música: el sonido del propio reel (clave `gancho` de la rejilla), que se apaga en el pase a los rigatoni;
  1. compases 4–16 desde el primer plato hasta la entrada del reel;
  2. el compás de corte sin bajo, con barrido, mientras la cámara entra en la pantalla;
  3. el reel con **su audio original, sin tocar**, colocado a la muestra donde suena su imagen;
  4. la remontada de la canción, filtrada, bajo la cartela del reel;
  5. vuelta del groove completo en la historia y el resultado, y sus dos primeros compases otra vez bajo el cierre;
  6. el acorde final de la canción en el golpe final, que se apaga en la cola.
- **Mezcla:** la música se iguala medio punto por debajo del reel. Máster a **−14 LUFS integrados y −1,2 dBTP** (medido con sobremuestreo ×4).

## Uso

```bash
npm install
npm run studio        # editor con línea de tiempo (suena la banda sonora)
npm run audio         # rehace public/audio/banda-sonora.wav (python3: numpy, scipy, soundfile, pyloudnorm; ffmpeg con rubberband)
npm run render        # out/society-promo-9x16-muda.mp4
npm run render:wide   # out/society-promo-16x9-muda.mp4
npm run export        # une imagen y banda sonora → society-promo-v3-*.mp4, y hace las copias y pósteres de web/
```

- El audio se une con ffmpeg en `export` y no en Remotion: el AAC del render llegaba 43 ms tarde (relleno del codificador sin señalizar).
- Calidad de los renders: H.264 CRF 19 en vertical y CRF 18 en apaisado (preset `slow`), para que cada MP4 final quede por debajo de 50 MB, el máximo recomendado por GitHub por archivo.
- En la nube o en un portátil de 2 núcleos, `remotion.config.ts` limita los hilos a los núcleos disponibles. Sin Chrome Headless Shell descargado, se puede usar uno local con `REMOTION_BROWSER=/ruta/al/headless_shell`.
- **Textos:** en [`src/copy.ts`](src/copy.ts).
- **Tiempos:** en [`src/timeline.json`](src/timeline.json) (en tiempos de la música). Si cambias un corte, vuelve a ejecutar `npm run audio`.
- **Colores, fuentes y curvas:** en [`src/theme.ts`](src/theme.ts).
- **Fuentes:** Anton, Playfair Display Italic, Schibsted Grotesk y Space Mono (OFL), en `public/fonts`.

## Pendiente

- **Permiso de Da Tonino** para usar su nombre, sus fotos, el reel y el carrusel fuera de uso privado.
- **La cocina del reel es generada**: la sartén al fuego no figura en el material real del local (`produccion/da-tonino/reel-v4/plan.yaml`, `no_existe`). Confirmarlo con el cliente antes de publicar.
- **Etiqueta de contenido generado con IA** al publicar (art. 50 del Reglamento de IA; «AI info» de Meta).
- **Textos de marketing sin decisión en el README raíz:** los nombres de los planes (la escena de Planes ya no sale en la promo).
- **Llamada a la acción:** el cierre firma con «Enero 2027» y no tiene botón; falta decidir a qué web o perfil llevar.
- **Renders:** la fusión del 27/09/2026 está sin renderizar (ver arriba).
