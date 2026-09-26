# Society · Vídeo promocional

Vídeo vertical (1080 × 1920) y apaisado (1920 × 1080), 30 fps, 56,2 s, hecho en **Remotion** (React + TypeScript) con la identidad de `society-identidad-editorial`: papel arrugado, Anton con una palabra en serif cursiva, fotos recortadas con trama, pegatinas y el bocadillo `@society`. Está compuesto como una revista, sin letra pequeña.

**Renders vigentes (v3, 25/09/2026):** [`society-promo-v3-9x16.mp4`](society-promo-v3-9x16.mp4) y [`society-promo-v3-16x9.mp4`](society-promo-v3-16x9.mp4). Copias ligeras y pósteres en [`web/`](web/). Las versiones anteriores están en el historial de git.

**Uso:** privado. No publicar hasta cerrar lo que queda en «Pendiente».

## Escenas (v3)

Toda la pieza va sobre **una sola rejilla musical** (132,983 BPM, [`src/timeline.json`](src/timeline.json)): cada pase de página, cada foto que cae, cada sello y cada titular entra en un tiempo de la música.

| Tiempo | Escena | Qué cuenta | Pase de salida |
| --- | --- | --- | --- |
| 0,0 s | Portada | «TU BAR *merece* QUE LO VEAN.» (ya en el fotograma 1) | Hoja ↑ |
| 3,6 s | Problema | ¿Qué publico hoy? Cinco tareas tachadas. «Y ADEMÁS, *cocinar.*» | Banda cobalto |
| 9,0 s | Marca | SOCIETY, «*tu agencia con IA*» | Página |
| 11,7 s | Caso real | CASO REAL · DA TONINO. «DE 4 FOTOS *a un reel.*» | Hoja ← |
| 14,5 s | 01 · Tus fotos | Las 4 fotos reales del local caen y se apilan, una por tiempo, con su etiqueta (Pizza, Paella, Rigatoni, Sala). «Del local» | Hoja ← |
| 18,1 s | 02 · La IA propone | Anillo de propuestas generadas («Con IA») con luz, reflejo y profundidad de campo. Gira a golpes, con desenfoque de movimiento, y trae al frente cada descartada en su sello | Hoja ← |
| 21,7 s | 03 · Tú eliges | Las 6 aprobadas del carrusel reciben el sello | Hoja ← |
| 25,3 s | 04 · Y sale el carrusel | Plano de producto: las 7 láminas llegan repartidas como cartas y forman una tira en perspectiva sobre mesa lacada. Se desliza una lámina por tiempo con desenfoque de movimiento; la activa se adelanta con marco mostaza y el marcador «01/07» rueda con ella | Página |
| 28,9 s | 05 · Y el reel | El móvil entra apagado, se enciende y la cámara se mete en la pantalla en el primer golpe del reel. Reel v6 a pantalla completa con **su sonido original**; la cámara sale y la cartela «Da Tonino · Reserva tu mesa» se lee en el móvil. «Listo para publicar» | Banda mostaza (vuelve la música) |
| 43,3 s | Resultado | Real → Con IA → Lista. «4 FOTOS *reales.* 1 REEL + 1 *carrusel.*» «En un día» | Página |
| 47,8 s | Planes | Google, Redes («Recomendado») y Reels | Hoja ↑ |
| 50,5 s | Cierre | «MARKETING QUE *llena tus mesas.*» Empezar. El botón se pulsa en el golpe final | — |

- **Orden:** el carrusel va antes que el reel porque las seis imágenes aprobadas son las del carrusel. El reel v4–v6 salió de otras imágenes clave que no están en el repo.
- **Pases:** tres, cada uno con su papel (`src/transitions.tsx`): hoja para la página siguiente del mismo capítulo, página (3D) para cambiar de capítulo y banda de color en los golpes. El cubo y la profundidad (zoom con fundido) ya no se usan.
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
  1. compases 1–16 hasta la entrada del reel;
  2. el compás de corte sin bajo, con barrido, mientras la cámara entra en la pantalla;
  3. el reel con **su audio original, sin tocar**, colocado a la muestra donde suena su imagen;
  4. la remontada de la canción, filtrada, bajo la cartela del reel;
  5. vuelta del groove completo en el resultado;
  6. el acorde final de la canción en el golpe del botón, que se apaga en la cola.
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
- **Textos de marketing sin decisión en el README raíz:** «Recomendado» en el plan Redes y los nombres GOOGLE / REDES / REELS (provisionales).
- **Llamada a la acción:** «Empezar» no lleva todavía a ninguna web.
