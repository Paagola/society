# «La terraza que se llena» · papel recortado en stop-motion

Pieza corta de Society (27/09/2026), vertical 1080 × 1920, 30 fps, 14 s. Está hecha con el estilo de la skill `motion-design` (Paper-Cut, en modo prompts, de `Downloads/Motion_Design_Prompts_Claude`), pero **sin generar vídeo**. A petición de Víctor, la animación no la hace Seedance: se genera **una sola imagen**, se corta en piezas con un script y las piezas se animan en Remotion.

- Vídeo: [`promo/renders/society-terraza-recortada.mp4`](../../promo/renders/society-terraza-recortada.mp4)
- Hoja de contacto (un fotograma cada 0,67 s): [`revision/hoja-video.png`](revision/hoja-video.png)
- Composición de Remotion: `SocietyRecortado` ([`promo/src/recortado/Recortado.tsx`](../../promo/src/recortado/Recortado.tsx))

## La historia

El orden de montaje cuenta la historia, sin cambiar de plano:

| Tiempo | Qué pasa |
|---|---|
| 0–5 s | Sobre papel crudo se monta la calle pieza a pieza: cielo, pared, tejado, ventanas, toldo, planta baja, suelo, guirnalda y el camarero. |
| 5–6,5 s | La terraza está vacía. Entran las tiras «TERRAZA / *vacía.*». |
| 6,5–7,4 s | Sube la mano con el móvil y empuja fuera el titular. |
| 7,9–8,7 s | El pulgar publica. La burbuja de la pantalla salta, crece y se queda arriba como «*Society*», con recortitos que saltan. |
| 8,7–11 s | Llegan los clientes, de abajo arriba: sillas, piernas, cuerpos, copas y cabezas. La terraza se llena. |
| 11,4–14 s | El lema: «PUBLICA *menos,* / LLENA MÁS.». |

El sonido es solo de papel (pegar, caer, lanzar, alisar, un pop y un tic). Sale de los efectos sintetizados de `promo/public/audio/pizza/` y está sincronizado con cada pieza que se posa.

## Cómo se hizo

1. **Imagen base.** GPT Image 2.5 en Higgsfield, 9:16, 2K, calidad media: **1 crédito** (trabajo `403a0e9d-d211-4516-825a-4d777a4ba99e`). El prompt está en [`prompt-escena.txt`](prompt-escena.txt): la descripción de la escena más el bloque de estilo de la skill, copiado tal cual. El original está en `imagen/escena-original.png` (1520 × 2688) y la versión de trabajo en `imagen/escena-1080.png`.
2. **Corte** ([`scripts/recortar.py`](scripts/recortar.py) y [`scripts/segmentar.py`](scripts/segmentar.py)):
   - **Regiones.** Filtro de mediana, gradiente de color y *watershed* desde las zonas planas. Las regiones del mismo color se unen si no las separa una ranura blanca. Las ranuras blancas del papel se reparten entre las piezas vecinas y forman su borde de fibra.
   - **Capas por mayoría.** Se decide con polígonos medidos sobre `revision/rejilla-*.png` y `revision/zoom-*.png`, más reglas de color (pared crema, guirnalda, luna, burbuja).
   - **Sombra con la pieza.** Cada pieza de delante se lleva la sombra y el filo que dejaba sobre el fondo. Así el fondo queda limpio y cada recorte vuela con su sombra.
   - **Hojas de fondo completas.** El cielo y la pared se rellenan por detrás de lo que tienen delante y se trocean con cortes rasgados de fibra clara. El suelo se completa estampando piedras reales del suelo visible, más pequeñas al fondo. Así la terraza vacía se ve entera antes de que lleguen los clientes.
   - **Resultado.** 367 piezas. Montadas todas, la imagen coincide con la original salvo un 0,73 % de píxeles, que es la fibra de los cortes nuevos (`revision/montada-llena.png`). La calle vacía está en `revision/montada-vacia.png` y el mapa de capas en `revision/capas.png`.
3. **Guion, piezas de apoyo y sonido** ([`scripts/montaje.py`](scripts/montaje.py)):
   - **Guion.** Para cada pieza fija el fotograma de entrada, el borde por el que entra, el giro y a veces un pequeño recolocado después de posarse.
   - **Piezas de apoyo.** Hace la burbuja grande rasgada, las máscaras de las tiras y el papel de fondo.
   - **Sonido.** Mezcla `foley.wav` con los mismos fotogramas del guion, que es la única fuente de tiempos.
4. **Animación** en Remotion:
   - stop-motion a 15 imágenes por segundo (cada dibujo dura 2 fotogramas);
   - las piezas entran desde fuera del cuadro con sombra dura y un poco levantadas;
   - el cuadro tiembla un pelo y la luz parpadea entre toma y toma.

## Regenerar

Desde la raíz del repo:

```bash
python produccion/society-papel-recortado/scripts/recortar.py   # corta la imagen (≈ 45 s)
python produccion/society-papel-recortado/scripts/montaje.py    # guion, burbuja, tiras, fondo y sonido
cd promo && npm run render:recortado                            # → promo/out/society-terraza-recortada.mp4 (≈ 80 s)
```

Para cambiar tiempos basta con tocar `EV` y `GRUPOS` en `montaje.py` y volver a ejecutar los dos últimos pasos. No hace falta volver a cortar.

## Regla cero y revisión

Esta pieza **se salta a propósito la firma de rodaje real** (`skills/README.md`, «Cuándo se puede saltar»). Es un collage de papel ilustrado que Víctor pidió expresamente y no pretende parecer rodado. `medir_realismo.py` lo confirma:

- **Fuera de objetivo** en lo propio de un rodaje: un solo plano de 14,2 s, 70 % del encuadre en foco, cámara fija y negro en el percentil 1 de 38,4.
- **Dentro de objetivo** el sonido (RMS 2.236) y los blancos (p99 224).

Estas cifras no sirven para juzgar este estilo.

**Nada inventado.** Es una escena ilustrativa de la marca, no un cliente: el bar, los platos y las personas no existen y no se presentan como reales. Sirve para anuncios propios de Society, no como caso de cliente.

## Límites conocidos

- Mientras se monta la fachada (0,5–3,5 s) quedan restos pequeños junto a las lámparas y las macetas: son píxeles de sombra que se quedan en la pared. Desaparecen al llegar su pieza.
- El suelo nuevo bajo la terraza se ve durante la calle vacía. Donde se junta con el suelo original hay cortes rectos junto a las sillas.
- Sin música ni ambiente, como pide la skill (solo papel). Si va a redes con el sonido de los anuncios de Society, habría que añadir música en el montaje.
- El sonido está a −23 dB de media y −4 dB de pico: es bajo para redes.
