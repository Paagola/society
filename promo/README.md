# Society · Vídeo promocional

Vídeo vertical (1080 × 1920, 30 fps, 56 s) y apaisado (1920 × 1080) hecho en **Remotion** (React + TypeScript) con la identidad de `society-identidad-editorial`: papel arrugado, Anton con una palabra en serif cursiva, fotos recortadas con trama, pegatinas y el bocadillo `@society`. Está compuesto como una revista, sin letra pequeña: cada escena se apoya solo en su titular grande, las imágenes y las pegatinas.

El render final está en [`society-promo.mp4`](society-promo.mp4).

## Escenas (v2, 25/09/2026)

La v2 cambia el mockup 2D por el **proceso real de un cliente, Da Tonino, contado en 3D**. Todo el material es real y sale del repo.

| Pág. | Escena | Qué cuenta | 3D |
| --- | --- | --- | --- |
| 01 | Portada | «TU BAR *merece* QUE LO VEAN.» | — |
| 02 | Problema | ¿Qué publico hoy? … «Y ADEMÁS, *cocinar.*» | — |
| 03 | Marca | SOCIETY, «*tu agencia con IA*» | Cubo al salir |
| 04 | Caso real | «DE 4 FOTOS *a un reel.*» | Anillo con las 4 fotos reales y titular que se abate |
| 05 | 01 · Tus fotos | Las 4 fotos reales del local (`produccion/da-tonino/reel-v4/referencias`) | Caen sobre una mesa en perspectiva |
| 06 | 02 · La IA propone | Imágenes generadas del carrusel y del reel v3. Las descartadas se sellan y caen | Anillo giratorio |
| 07 | 03 · Tú eliges | Las 6 aprobadas del carrusel reciben el sello mostaza | Llegan desde el fondo en rejilla inclinada |
| 08 | 04 · Y sale el reel | El reel v6 real, con su sonido | Móvil con grosor; la cámara entra en la pantalla y sale |
| 09 | 05 · Y el carrusel | Las 7 láminas publicadas | Coverflow |
| 10 | Resultado | Foto real → aprobada → publicada. «4 FOTOS *reales.* 1 REEL + 1 *carrusel.*» «En un día» | Tarjetas que giran |
| 11 | Planes | Google, Redes y Reels | — |
| 12 | Cierre | «MARKETING QUE *llena tus mesas.*» | Pase de página |

- **Pases entre páginas:** hoja y banda (2D, de la revista), más cubo, pase de página y profundidad (3D), en `src/transitions.tsx`.
- **Piezas 3D:** en `src/three.tsx`, hechas con CSS 3D:
  - escenario con perspectiva;
  - tarjeta de foto con brillo según el ángulo;
  - sellos;
  - móvil de seis caras.
  **Aviso:** nunca se pone `opacity` en un contenedor `preserve-3d`, porque aplana la profundidad.
- **Sonido:** la canción del reel de Da Tonino, en bucle a compás (`public/audio/musica.m4a`, 134 BPM). Baja a cero mientras el reel suena en el móvil con su propio audio.
- **Material:**
  - `public/caso/`: fotos reales, generadas y láminas, en JPG reducido;
  - `public/video/reel-v6.mp4`: el reel entregado.
  - En la foto real de los rigatoni se recorta al cliente que aparece.
- **«En un día»:** el reel v4 y el carrusel están fechados el mismo día (25/09/2026).

La v1 (mockup 2D de la app, feed y principios) sigue en `src/scenes/Pasos.tsx`, `Feed.tsx` y `Principios.tsx`, sin usar.

## Uso

```bash
npm install
npm run studio      # editor con línea de tiempo en el navegador
npm run render      # genera out/society-promo.mp4
```

- **Textos:** todos están en [`src/copy.ts`](src/copy.ts). Se pueden cambiar sin tocar la animación.
- **Duraciones y transiciones:** en [`src/Promo.tsx`](src/Promo.tsx).
- **Colores, fuentes y curvas:** en [`src/theme.ts`](src/theme.ts).
- **Fuentes:** Anton, Playfair Display Italic, Schibsted Grotesk y Space Mono (OFL) están en `public/fonts`, así que el render no depende de la red.
- **Imágenes:** copia de `society-identidad-editorial/pantallas/_assets/listos` en `public/img`.

## Pendiente

- La fecha «Enero 2027» y la etiqueta «Recomendado» del plan Redes son textos de marketing: revísalos en `copy.ts`.
- Pedir permiso a Da Tonino para usar su caso, sus fotos y su reel en la promo de Society.
- Etiqueta de contenido generado con IA al publicar (art. 50 del Reglamento de IA; «AI info» de Meta).
