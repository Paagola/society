# Reel Da Tonino ristorante (25/09/2026)

**Entregable:** [`da-tonino-reel-v3.mp4`](da-tonino-reel-v3.mp4). 1080×1920, 30 fps, H.264, 10 s, pista de audio silenciosa para añadir en Instagram un audio en tendencia.

## Estrategia

- **Referencia** (`Downloads/Da Tonino ristorante/vide_referencia.mp4`): anuncio de cocina *low-key* de 12,9 s, 720×1280 a 25 fps. Tiene 14 cortes (umbral 0,25) o 18 (umbral 0,1), es decir, un plano cada ~0,6 s, con guantes negros y una cadena de proceso que acaba en el plato héroe y el logo. Energía medida: mediana 5,25, p90 12,6, 40 % de fotogramas rápidos. Hoja de contactos: [`referencia/`](referencia/).
- **Qué se copia:** el ritmo, la cocina *low-key* con bokeh de bombillas, los guantes negros, la cadena de proceso y el cierre en el plato héroe con placa final. **Qué no:** el producto (hamburguesa y patatas); se sustituye por los platos reales del cliente.
- **Concepto:** *Proceso con momento culminante* (`director/07` §2), con gancho abierto en la sala real (medido: +10 % de activación) → pizza → pasta → paella → cierre en la pizza → placa con CTA de reenvío («Mándaselo a quien te debe una cena»).
- **Economía:** un solo clip multitoma de Seedance 2.5 (5 tomas de 3 s) en lugar de 5 generaciones. Se generó a 720p y se reescaló con ByteDance pro, según la regla R-RES-01.

## Coste (medido)

| Paso | Créditos |
|---|---|
| 6 keyframes (1 descartado), pedido Nano Banana Pro, servido `nano_banana_2` | ~12 |
| Multitoma Seedance 2.5, 15 s, 720p, 9:16, sin audio | 105 |
| Reescalado ByteDance pro `aigc` a 1080p | ~3 |
| Montaje en OpenMontage (Remotion) | 0 |
| **Total** | **120,01** (saldo 342,78 → 222,77) |

## Versiones

- **v1 (rechazada):** la multitoma a velocidad real. El prompt pedía *locked-off*, empujes de 3–5 cm y *holds*, y salió con un 1 % de fotogramas rápidos frente al 40 % de la referencia. Aprendizaje **R-VEL-01**, anotado en las skills `directoria` (`hosteleria/00` §2.10 y `07` §7), `director` (`03` §9) y `openmontage` (`03` §4).
- **v2:** rescatada en montaje sin generar vídeo nuevo. Composición `HosteleriaReelSpeed` de OpenMontage; EDL en [`montaje/edl_velocidad.py`](montaje/edl_velocidad.py). Energía: mediana 4,23 / p90 12,6 / 36 % de fotogramas rápidos.
- **v3 (entregable):** v2 sin los dos cortes de la masa. La toma solo apoyaba cinco dedos sobre la masa, un gesto sin sentido (lo correcto era cogerla, estirarla y moldearla). Aprendizaje **R-GESTO-01** en `directoria` (`hosteleria/05` §3.1, principio 11 bis) y `director` (`06` §4). Energía: mediana 5,10 / p90 14,5 / 41 % de fotogramas rápidos (referencia: 5,25 / 12,6 / 40 %).

Volver a renderizar:

```bash
python montaje/edl_velocidad.py datonino/multitoma_1080p.mp4
cd C:/Users/victo/OpenMontage/remotion-composer
npx remotion render src/index.tsx HosteleriaReelSpeed <salida.mp4> --props=<ruta>/montaje/props_datonino_v2.json --codec=h264 --crf=14
```

## Virality Predictor sobre v3 (25/09/2026, trabajo `36be2730-b4ff-4e70-b39c-5f26d206c097`, panel en [`virality-v3.html`](virality-v3.html))

| Global | Gancho | Viral | Sostenimiento | Activación visual en t=0 |
|---|---|---|---|---|
| **51** | **38** | **48** | 96 | **0,600** |

Comparación con Torre de Vega (08/09/2026, 6 clips de Kling fijos, mejor versión): global 40, gancho 25, viral 38, visual en t=0 0,437. **v3 mejora los cuatro.**

Activación visual por segundo: 0,60 · 0,61 · **0,62** · 0,62 · 0,61 · 0,60 · 0,55 · 0,51 · 0,46 · 0,41 · 0,35. Se mantiene arriba mientras hay cocina y acción (s 0–5) y **cae desde el socarrat largo (s 5–6,5), la pizza repetida (s 6,5–7,9) y la placa (s 7,9–10)**. Default Mode (divagación, menos es mejor) es máximo en t=0 (0,545): el gancho aún deja escapar a parte de la audiencia (gancho 38/100).

Palancas (el montaje tiene techo: máximo 2 iteraciones; `openmontage/03` §5):
1. Acortar la placa a ~1,2 s y poner el CTA sobre el último plano de comida.
2. Quitar o acortar la pizza repetida del cierre; el socarrat, a ~0,9 s.
3. Gancho: abrir con la acción más potente (la pasta saltando o la rúcula cayendo) y el rótulo encima.
4. **Luz (R-LUZ-01):** v3 mezcla la sala a plena luz (mediana 142–145) con la cocina de estudio (25–65). Hay que unificarla en el estilo de estudio (ver skill `directoria`, `hosteleria/02` §8).

## Pendiente con el cliente (verificar antes de publicar)

1. **La cocina es generada:** no hay fotos de la cocina real. ¿Guantes negros? ¿Pase de acero? ¿Fogón de gas? Si hay metraje real del pizzaiolo estirando la masa, es el plano que falta.
2. **Rótulo «Masa, fuego y mesa»:** es una afirmación genérica, pero confirma que la masa se hace en el local.
3. **Logo real:** la placa usa tipografía (Georgia Pro Light Italic + Bahnschrift). Si hay logo, se reproduce 1:1.
4. **Etiqueta de IA** al publicar (art. 50 del Reglamento de IA, "AI info" de Meta).
5. **Audio:** audio en tendencia elegido en Instagram, con cortes en el beat.
