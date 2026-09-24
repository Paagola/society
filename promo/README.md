# Society · Vídeo promocional

Vídeo vertical (1080 × 1920, 30 fps, 44 s) hecho en **Remotion** (React + TypeScript) con la identidad de `society-identidad-editorial`: papel arrugado, Anton con una palabra en serif cursiva, fotos recortadas con trama, pegatinas y el bocadillo `@society`. Está compuesto como una revista: cada escena es una página con folio, número y sección.

El render final está en [`society-promo.mp4`](society-promo.mp4).

## Escenas

| Pág. | Escena | Qué cuenta |
| --- | --- | --- |
| 01 | Portada | «TU BAR *merece* QUE LO VEAN.» con la mano y la copa |
| 02 | Problema | ¿Qué publico hoy? Grabar, editar, publicar, medir, responder… «Y ADEMÁS, *cocinar.*» |
| 03 | Marca | SOCIETY, la O se convierte en el punto cobalto; «*tu agencia con IA*» |
| 04 | Pasos | Tres pasos dentro del móvil: busca tu local, ¿qué hay hoy?, así queda |
| 05 | Feed | El feed 3 × 3 de la guía montándose pieza a pieza |
| 06 | Principios | Modo oscuro: nada inventado, criterio de agencia, cada día sin agencia |
| 07 | Planes | Google, Redes y Reels como tarjetas de la app |
| 08 | Cierre | Logotipo, «MARKETING QUE *llena tus mesas.*» y botón Empezar |

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

- **Sin audio.** Falta música con licencia o sonido original, y quizá una voz en off.
- Los datos del local («La Taberna del Patio», «Calle Mayor, 12») son de relleno, igual que en la guía.
- La fecha «Enero 2027» y la etiqueta «Recomendado» del plan Redes son textos de marketing: revísalos en `copy.ts`.
- Si hace falta la versión horizontal (16:9) para web o presentación, se puede añadir como segunda composición.
