# Posts terminados para el reel v2

Fecha: 2026-10-20. Víctor vio la primera tanda de posts y le parecieron básicos: los seis seguían la misma fórmula (titular arriba, foto abajo, etiquetas pequeñas). Esta segunda tanda sale de analizar proyectos de restaurantes bien diseñados y aplica una idea distinta en cada post.

## Qué se analizó

- 14 proyectos de identidad de restaurantes publicados en BP&O: Makan (Foreign Policy), Caffè Nazionale (Studio Mut), Teller (Werklig), Tsukiyo (The Colour Club), Knahia (Requena Office), Sucre/Abajo (Ductscot), Woven (Dorchester Collection), LenLen (Pentagram), Ray's (Base Design), Super Peach (Pentagram), Jupiter, Pinky Swear, Theaterbaren y Napoli on the Road.
- El material propio de Etxebarri, Disfrutar y St. JOHN (web oficial y Wikimedia), para que cada post respete su tono: Etxebarri sobrio y oscuro, Disfrutar lúdico, St. JOHN austero.

## Recursos que se sacaron y dónde se usan

| Recurso | Referencia | Post |
|---|---|---|
| La letra pasa por detrás del plato (profundidad) | Makan, «Kaya Toast Cocktails» | E1 · FUEGO |
| Trazo a mano que sale de la foto | Teller, Sucre, Ray's | E3 · Palamós |
| Cuaderno de cocina: flechas y notas a mano | Teller, Jupiter | E4 · anchoa |
| Campo de color plano, una palabra gigante | Makan «New Look», Tsukiyo | E5 · HUMO |
| El texto vive en la retícula del objeto | Caffè Nazionale, Knahia | D1 · cajas de Disfrutar |
| Diagrama de instrucciones numeradas | St. JOHN (tono), Woven | S1 · tuétano |

Sin cajas ni bandas detrás del texto en ningún post.

## Trabajos (gpt_image_2_5, high, 2k, 4:5; referencia = la toma sin texto de la tanda anterior)

| Post | Job | Referencia |
|---|---|---|
| E1 | `1123a653-ef1e-4e41-8e64-2cc27726aa0a` | `49ee9c90-7321-48e0-a7ae-839336055820` |
| E3 | `980c530c-9b9d-44f3-a65d-dc9221720fca` | `d7f7e946-91cc-48ff-9988-ecebaa742655` |
| E4 | `fc02e271-ad4e-4e0a-bc96-56066da24902` | `58ea3541-f80c-4e00-9881-d04c58116c60` |
| E5 | `e2cf07bb-2309-4015-9ca4-380ae1a29dc3` | `8deef2de-a91c-4777-ab4a-70d313d9caed` |
| D1 | `bd639c78-d54c-4139-b82a-e72bedba9126` | `ec37e008-9973-4281-8c32-472ec0b5a2c6` |
| S1 | `1baa982a-1648-47a1-99dc-9cb6843bfaac` | `c2b6175f-4cfd-4794-a113-7c7c112acbd2` |

Hoja de contactos: [posts-v2-hoja.jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/2a7e8380-5f34-4454-a5c0-4387dd85fc9d.jpg). Coste: 16,5 créditos (saldo de 839,15 a 822,65).

## Avisos

- E5: el hilo de humo sobre el helado es un recurso visual (el helado es de leche ahumada, no echa humo). Si molesta, se quita.
- D1: la frase sale de la web oficial de Disfrutar («t'aconsellem escollir el menú sense veure'l»).
- S1: los cuatro pasos siguen la receta conocida de Fergus Henderson (tuétano en la tostada, sal y ensalada de perejil).
- Todos llevan «Propuesta no oficial · Society»: son ejemplos, no encargos de esos restaurantes.

## Tercera tanda: 17 posts, el texto encima de la foto original

Víctor dio por buenos FUEGO, Gamba roja, anchoa, HUMO e Instrucciones, pero pidió que no se modificara la foto de referencia (el post de Disfrutar había cambiado las cajas) y bastantes más posts para el reel. Desde aquí la foto no se regenera: [`montaje-posts/montar.py`](montaje-posts/montar.py) escribe un HTML por post con la tipografía encima de la foto original y [`montaje-posts/captura.cjs`](montaje-posts/captura.cjs) lo captura con Playwright. Coste: 2 créditos (dos recortes de fondo para poner la palabra detrás del objeto).

| Post | Recurso |
|---|---|
| E2 · plaza de Axpe | «PLAZA» pintado en perspectiva sobre el suelo mojado |
| E6 · puerta | reloj dibujado a mano marcando la una: «Solo a mediodía.» |
| D1 · cajas | «ELIGE / SIN MIRAR.» y «?» en las tapas reales (la web de Disfrutar dice «t'aconsellem escollir el menú sense veure'l») |
| D2 · celosía | un hilo blanco que cose los huecos: «La cerámica es el hilo conductor.» |
| D3 · panchino | «PANCHINO» por detrás del bollo (recorte `c97d3893-af80-45bf-ad3e-941d3e8cefde`) |
| D4 · esferas | «Sorprender» y un círculo a mano: «¿y esta?» |
| D5 · sala blanca | cotas de plano |
| D6 · olivo | ficha de herbario, *Olea europaea* |
| S3 · Eccles cake | diagrama de Venn |
| S4 · Welsh rarebit | línea de corte: «por aquí.» |
| S5 · cabeza de cerdo | «Del morro» por detrás de las orejas, «a la cola.» abajo (recorte `eeaca0cb-f8ac-49c2-b19e-ac30862eb548`) |
| S6 · fachada | «Octubre de 1994.» y etiqueta del antiguo ahumadero |

Fuera: S2 (la fachada generada lleva un teléfono que no es el de St. JOHN).

- Hoja de contactos de los 17: [posts-v3-hoja.jpg](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/1799413c-6d5e-48e9-aa33-c39cfbd17a8c.jpg)
- Los 17 en 1080 × 1350: [posts-society-17.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/28edc4ad-6c05-40de-a5b0-ae768a23a336.zip)
