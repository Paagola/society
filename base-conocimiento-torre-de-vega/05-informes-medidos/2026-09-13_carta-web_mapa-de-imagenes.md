# Carta web — mapa de imágenes por producto

Fecha: 2026-09-13
Fuente de la carta: `C:\Users\victo\Downloads\simply-static-1-1789132160 - Copy\carta-torre-de-vega\index.html`
Destino de las imágenes generadas: `imagenes/carta_web/`
Objetivo: una imagen por producto de la carta, sobre fondo blanco eliminable por CSS, para la web.

**No se añade ni se elimina ningún producto de la carta.** El listado de abajo es literal del HTML.

---

## 0. Estructura del HTML (para la integración posterior)

La carta está maquetada con bloques **UAGB (Ultimate Addons for Gutenberg)** de WordPress:

- Cabecera de categoría: `div.wp-block-uagb-advanced-heading > h2.uagb-heading-text` — `ENTRANTES`,
  `ENSALADAS`, `CUCHAREO`, `CARNES`, `SALSAS`, `PESCADOS`, `PARA LOS PEQUES`, `POSTRES`.
- Producto: `div.wp-block-uagb-restaurant-menu-child.uagb-rest_menu__wrap`
  → `h4.uagb-rm__title > strong` (nombre + precio, con `–` y un `\u200b` invisible al final)
  → `div.uagb-rm__desc` (traducción al inglés)
  → `span.uagb-rm__price` (vacío: el precio va dentro del título)
- Bloques destacados por categoría: `div.wp-block-uagb-info-box` con una imagen `uagb-image` ya
  existente (`/wp-content/uploads/2024/07/*.png`) — Ensaladilla Rusa, Ensalada César, Plato de los
  Montes, Puntillitas fritas, Postres.

⚠ Las imágenes van con **lazyload de Smush**: el `src` real está en `data-src`/`data-srcset`, y el
`src` es un SVG placeholder en base64. Cualquier `<img>` nueva que se inserte debe seguir ese mismo
patrón o desactivar lazyload para esa clase, o no se verá.

**Punto de inserción usado** (ver sección 6): un `<img class="tdv-dish-img">` como **primer hijo de
`div.uagb-rm__content`**, con ese contenedor convertido en fila flex. 82 px en escritorio, 64 px en
móvil. Hay **73 bloques** `uagb-rest_menu__wrap` en el HTML: 71 productos + 2 filas
«Acompañamiento *» que no son productos.

---

## 1. Inventario de referencias reales verificadas

Contact sheets revisados uno a uno (no solo el nombre de fichero).

**Vajilla real del local — esto es lo que manda en toda generación:**

| Recipiente | Dónde aparece | Se usa para |
|---|---|---|
| Plato de barro/terracota con sello `CILLAR DE SILOS * DESDE 1994` | `solomillo*.jpg`, `pinchito.jpg`, `carne-cortada-plato-barro_REF.jpg` | Carnes a la brasa, brochetas |
| Plato blanco ovalado liso | `pollo_asado*.jpg` | Pollo asado |
| Plato blanco redondo hondo | `ensalada*.jpg`, `ensalada_cabra*.jpg` | Ensaladas |
| Fuente blanca alargada rectangular | `chirlas.jpg` | Mariscos en salsa |
| Cazuela de barro pequeña vidriada | `gambas.jpg`, `carne_salsa.png` | Pil-pil, guisos |
| Pizarra/bandeja blanca con cenefa azul | `croquetas.jpg`, `croquetas.png` | Croquetas |
| Tabla de madera clara | `pulpo.png`, `carne-salsa-cortada-tablon.png`, `servido.png` | Pulpo, carne cortada |
| Plato de postre blanco moteado gris | `plato_tarta.jpg`, `emplatada1.jpg` | Tartas |
| Plato de postre marrón oscuro | `dos-pistacho.png`, `tarta-pistacho.png` | Tartas |
| Salsera metálica con asa | `salsa-blanca.jpg` | Salsas |
| Mesa-barril de roble `CILLAR DE SILOS` y mantel blanco | transversal | Superficie |

---

## 2. Listado completo por categorías + referencia asignada

Leyenda: **✅ foto real directa** · **⚠️ foto parcial o dudosa** · **❌ sin foto**

### ENTRANTES (19)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| E01 | JAMÓN 100% IBÉRICO DE BELLOTA | 18/27 | `comida/jamon11.jpg` (plato en flor), `jamon4.jpg` | ✅ |
| E02 | JAMÓN 50% CEBO DE CAMPO IBÉRICO | 13/20 | mismas que E01 (mismo emplatado, distinta pieza) | ⚠️ |
| E03 | LOMO EN MANTECA | 8/14 | `comida/gildas.jpg`, `gildas3.jpg` | ⚠️ nombre de fichero engañoso |
| E04 | LANGOSTINOS AL PIL-PIL | 12 | `comida/gambas.jpg`, `gambas2.jpg`, `gambas3.jpg` | ✅ |
| E05 | REVUELTO DE SETAS Y FOIE | 15 | — | ❌ |
| E06 | CROQUETAS DE BACALAO (8ud.) | 14 | `comida/croquetas.png`, `croquetas.jpg` (genéricas) | ⚠️ |
| E07 | QUESO CURADO DE OVEJA | 11/16 | — | ❌ |
| E08 | ENSALADILLA RUSA | 10 | — (hay una imagen en la web actual, no en el repo) | ❌ |
| E09 | TOSTA DE ANCHOA DE SANTOÑA CON MANTEQUILLA DE TRUFA | 3.50 | — | ❌ |
| E10 | PATATAS BRAVAS | 10 | `comida/patatas-bravas.jpg`, `patatas-bravas.png` | ✅ |
| E11 | CROQUETAS DE PUCHERO (8ud.) | 12 | `comida/croquetas*` (genéricas) | ⚠️ |
| E12 | CROQUETAS DE CHIPIRONES EN SU TINTA (8ud.) | 14 | `comida/croquetas3.jpg` (hay una oscura en el plato) | ⚠️ |
| E13 | QUESO AZUL DE CABRA DE MÁLAGA | 13/18 | — | ❌ |
| E14 | TARTAR DE SALCHICHÓN DE MÁLAGA | 15 | — | ❌ |
| E15 | STEAK TARTAR | 22 | — | ❌ |
| E16 | BERENJENAS FRITAS CON MIEL DE CAÑA | 12 | — | ❌ |
| E17 | CROQUETAS DE RABO DE TORO (8ud.) | 14 | `comida/croquetas*` (genéricas) | ⚠️ |
| E18 | SURTIDO DE CROQUETAS (8ud.) | 14 | `comida/croquetas.jpg` (se ven variedades distintas) | ✅ |
| E19 | MORCILLA DE ARROZ CON MERMELADA DE TOMATE | 14 | — | ❌ |

### ENSALADAS (6)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| S01 | ENSALADA DE LA CASA | 11 | — | ❌ |
| S02 | ENSALADA DE QUESO DE CABRA | 14 | `comida/ensalada_cabra.jpg`, `_cabra2`, `_cabra3` | ✅ |
| S03 | ENSALADA CESAR | 12 | `comida/ensalada-pollo-frito.jpg`, `ensalada-pollo-frito2.jpg` | ✅ |
| S04 | ENSALADA TROPICAL | 13 | — | ❌ |
| S05 | TOMATE PICADO CON ATÚN | 11 | `comida/ensalada.jpg`, `ensalada2`, `ensalada3`, `salsa.jpg` | ✅ |
| S06 | EXTRA ANCHOAS | 4 | detalle de `comida/ensalada2.jpg` | ⚠️ |

### CUCHAREO (4)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| C01 | SOPA DE MARISCO | 9 | — | ❌ |
| C02 | SOPA DE PICADILLO | 8 | — | ❌ |
| C03 | CARACOLES | 15 | — | ❌ |
| C04 | CALLOS | 9 | — | ❌ |

### CARNES (14)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| M01 | CHURRASCOS DE POLLO | 15 | — (`comida/parrilla_secreto2.jpg` es parrilla, no el plato) | ❌ |
| M02 | MEDIO POLLO ASADO | 12 | `comida/pollo_asado.jpg`, `_2`, `_3`, `_4` | ✅ |
| M03 | BROCHETA DE CERDO | 19 | `comida/pinchito.jpg` | ✅ |
| M04 | SOLOMILLO DE CERDO | 19 | `comida/solomillo*.jpg` (probablemente ternera) | ⚠️ |
| M05 | SOLOMILLO DE TERNERA (300gr.) | 28 | `comida/solomillo.jpg`, `solomillo3.jpg`, `solomillo_cortado*.jpg` | ✅ |
| M06 | CARRILLADA IBÉRICA EN SALSA DE LA CASA | 21 | `comida/carne_salsa.png` (cazuela de barro) | ✅ |
| M07 | PLATO DE LOS MONTES | 16 | — (hay imagen en la web actual, no en el repo) | ❌ |
| M08 | CACHOPO DE TERNERA | 25 | — | ❌ |
| M09 | CHULETITAS DE CORDERO | 24 | — | ❌ |
| M10 | TATAKI DE VACA MADURADA PREMIUM | 20 | `comida/carne-cortada-plato-barro_REF.jpg`, `solomillo_cortado2.jpg` | ⚠️ |
| M11 | BROCHETA DE POLLO | 16 | `comida/pinchito-ternera.jpg` (es de ternera) | ⚠️ |
| M12 | PRESA IBÉRICA | 21 | `comida/parrilla_secreto.jpg` (es secreto, no presa, y en parrilla) | ⚠️ |
| M13 | ENTRECOT DE TERNERA (400gr) | 26 | `comida/carne-cortada.png`, `solomillo2.jpg`, `servido.png` | ✅ |
| M14 | ESTOFADO DE TERNERA | 15 | `comida/carne-salsa2.jpg` | ✅ |

### EXTRA DE GUARNICIONES (5)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| G01 | PATATA ASADA | 2.50 | detalle de `comida/solomillo_cortado2.jpg` (patata con alioli verde) | ⚠️ |
| G02 | PATATAS FRITAS | 2.00 | detalle de `comida/solomillo3.jpg` | ✅ |
| G03 | PATATAS A LO POBRE | 2.50 | `comida/patatas-bravas.png` (es el corte en gajo) | ⚠️ |
| G04 | PIMIENTOS DE PADRÓN | 3.00 | detalle de `comida/solomillo2.jpg` / `carne-pizarra.png` | ⚠️ |
| G05 | VERDURAS A LA PARRILLA | 3.00 | detalle de `comida/carne_salsa.jpg` | ⚠️ |

### SALSAS (3)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| A01 | SALSA DE CHAMPIÑONES | 3.00 | `comida/salsa-blanca.jpg` (salsera real; el contenido no se identifica) | ⚠️ |
| A02 | SALSA DE PIMIENTA | 2.80 | solo la salsera de `salsa-blanca.jpg` | ⚠️ |
| A03 | SALSA ALIOLI | 2.00 | solo la salsera; alioli visible en `patatas-bravas.png` | ⚠️ |

### PESCADOS (7)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| P01 | BACALAO EN SALSA DE LA CASA | 22 | — | ❌ |
| P02 | DORADA A LA ESPALDA | 18 | — | ❌ |
| P03 | ROSADA FRITA O PLANCHA | 16 | — | ❌ |
| P04 | BACALAO FRITO | 20 | — | ❌ |
| P05 | PATA DE PULPO XL A LA BRASA CON PURÉ DE PATATAS | 27 | `comida/pulpo.png`, `pulpo2.png` | ✅ |
| P06 | CALAMAR NACIONAL A LA PLANCHA O FRITO | 5/100gr | `comida/calamar.png` | ✅ |
| P07 | PUNTILLITAS FRITAS | 14 | — (hay imagen en la web actual, no en el repo) | ❌ |

### PARA LOS PEQUES (5)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| N01 | LAGRIMITAS DE POLLO CON PATATAS | 11 | — | ❌ |
| N02 | ESCALOPE DE POLLO CON PATATAS | 13 | — | ❌ |
| N03 | HAMBURGUESA DE CARNE MADURADA | 14 | — | ❌ |
| N04 | BROCHETITA DE LANGOSTINO | 6 | combina `pinchito.jpg` (brocheta) + `gambas3.jpg` (langostino) | ⚠️ |
| N05 | EXTRA DE HUEVO FRITO | 1.50 | — | ❌ |

### POSTRES (8)

| # | Producto | € | Referencia real | Estado |
|---|---|---|---|---|
| D01 | TARTA DE QUESO | 6.50 | `postres/emplatada1.jpg`, `emplatada2.jpg` | ✅ |
| D02 | TARTA DE PISTACHO | 7.00 | `postres/pistacho1.jpg`, `pistacho2.jpg`, `dos-pistacho.png`, `tarta-pistacho.png` | ✅ |
| D03 | TARTA DE LOTUS | 7.00 | — | ❌ |
| D04 | TARTA DE MANZANA CON CARAMELO | 7.00 | — | ❌ |
| D05 | BROWNIE CON SOPA DE CHOCOLATE BLANCO Y HELADO DE VAINILLA | 7.50 | `postres/brownie2.png`, `brownie-flan.png` | ✅ |
| D06 | ARROZ CON LECHE | 5.00 | — | ❌ |
| D07 | NATILLAS | 5.00 | — | ❌ |
| D08 | FRUTAS DEL DÍA | 4.50 | — | ❌ |

---

## 3. Recuento

| | Nº | % |
|---|---|---|
| Total productos en la carta | **71** | 100 % |
| ✅ Con foto real directa | **21** | 30 % |
| ⚠️ Con foto parcial o dudosa | **17** | 24 % |
| ❌ Sin ninguna foto real | **33** | 46 % |

---

## 4. Lo que se ha generado (decisión del cliente, 2026-09-13)

> **Decisión tomada:** generar **solo los 38 productos que tienen foto real** (directa o parcial).
> Los 33 sin ninguna foto quedan sin imagen hasta que Jose aporte material — no se inventan.
> Segunda decisión: **integrar las imágenes en el HTML**, trabajando sobre una copia.

### Parámetros de generación

| | |
|---|---|
| Modelo | `nano_banana_pro` (reporta internamente `nano_banana_2`, es normal) |
| Resolución | `1k` → 1024×1024 nativo, entregado a 1080×1080 |
| Aspect ratio | `1:1` |
| Prompts | Plantilla `directoria-cloud/templates/prompt-imagen.md`, JSON Decoded Brief de 14 campos stringificado (regla 23) |
| Refs subidas | 47 fotos reales de `imagenes/comida/` y `imagenes/postres/` |
| Coste | **82 créditos** (38 × 2 + 3 correcciones × 2) |
| Saldo antes / después | 859,28 → ~777 |
| Fallos de generación | 0 de 41 |

### Correcciones que hubo que relanzar

| Imagen | Defecto | Arreglo |
|---|---|---|
| `M10_tataki` | salieron patatas chips redondas en vez de patatas fritas | reencadenado con «THE ONE CHANGE» (regla 27) ✅ a la primera |
| `A03_salsa-alioli` | la salsera salió como taza de dos asas, distinta a A01/A02 | reencadenado con la salsera real como `@image2` ✅ |
| `E18_surtido-croquetas` | la mano no agarraba nada y había 5 croquetas en vez de 8 | regenerado con el gesto descrito explícitamente ✅ |

### Desviaciones conscientes de las reglas, y por qué

| Regla | Qué dice | Qué se ha hecho | Motivo |
|---|---|---|---|
| **12** — resolución 2k | siempre `2k` | `1k` | Petición expresa del cliente para ahorrar créditos. El render en web es de 82 px; 1k sobra. |
| **17** — look editorial dramático | sombras casi negras en la mayor parte del encuadre | luz dura de una sola fuente ~3100 K, alto contraste y sombras marcadas **sobre la comida**, pero fondo blanco limpio | Un fondo que cae a negro es incompatible con quitar el fondo por código, que es justo lo que se pedía. La parte de la regla que gobierna la luz sí se ha aplicado. |
| **24** — logo inventado | prohibir el logo por su nombre | hecho, y además `no readable words on the plate rim` | El plato de barro real lleva grabado `CILLAR DE SILOS · DESDE 1994`. A 82 px no se lee, y el modelo lo devolvía como texto deforme. Se reproduce el aro impreso, sin letras. |

---

## 5. El fondo NO se recorta a alfa — y por qué

Se probaron las dos vías obvias y **las dos fallan**. Queda documentado para no repetirlo:

| Vía probada | Resultado |
|---|---|
| Flood-fill por umbral desde los bordes (`scipy.ndimage.label`) | ⛔ La porcelana blanca está a la misma distancia del blanco que el fondo. La inundación **entra en el plato** y se lo come: el plato del jamón y la bandeja de croquetas quedaban mordidos. |
| `remove_background` de Higgsfield (matting neuronal) | ⛔ Funciona técnicamente, pero recorta **solo la comida**: elimina el plato y la mano. Rompe la regla 1 (el plato de barro del local es parte de la promesa) y tira el gesto que pidió el cliente. |

**Solución adoptada — `mix-blend-mode: multiply`.** Las imágenes se entregan **sin canal alfa**, sobre
blanco puro `#FFFFFF`, y el navegador elimina el blanco al componer. Sobre cualquier fondo claro
(el de la carta es `#e9ecef`) el resultado es idéntico a un recorte, con tres ventajas:

- el plato blanco y la mano quedan **enteros**;
- la **sombra de contacto real** de la foto se conserva y se funde con el fondo;
- cero artefactos de borde, porque no hay borde que calcular.

`imagenes/carta_web/preparar_para_web.py` hace dos cosas antes de exportar:

1. **Corrige el punto blanco.** Algunas generaciones devuelven el fondo a ~`#EDEDED` en vez de blanco
   puro; se escala cada canal (factor ~1,08) para que ese gris sea blanco exacto. Sin este paso,
   `multiply` deja un velo gris visible. Afectaba a 5 de las 38.
2. **Aplana a `#FFFFFF` exacto solo el fondo conectado al borde** del encuadre, y reencuadra al
   sujeto con un 4 % de aire. Nada del interior del plato se toca.

⚠️ **Si algún día la carta pasa a fondo oscuro, `multiply` deja de funcionar.** El CSS inyectado lleva
comentado el plan B (servir cada imagen sobre su propia pastilla blanca).

---

## 6. Entregables

```
imagenes/carta_web/
├── raw/                     38 PNG originales de Higgsfield, 1024×1024, sin tocar
├── web/                     38 PNG + 38 WebP, 1080×1080, fondo blanco puro   ← lo que va a la web
├── preparar_para_web.py     raw/ → web/ (punto blanco + aplanado + reencuadre)
└── insertar_en_html.py      inserta las <img> y el CSS en la copia del index.html
```

```
…\simply-static-1-1789132160 - Copy\
├── carta-torre-de-vega\              ← CARTA REAL, con imágenes desde 2026-09-14 (a petición del cliente)
│   ├── index.html                    38 <img> insertadas + <style id="tdv-carta-imagenes">
│   ├── index.backup-2026-09-14.html  el original sin imágenes (202.819 bytes) — punto de partida del script
│   └── img-carta\                    38 .webp (43–174 KB cada uno, ~3,9 MB en total)
└── carta-torre-de-vega-con-imagenes\ ← copia de prueba del 2026-09-13, idéntica; se puede borrar
```

### Cómo está integrado

Cada `<img>` va como **primer hijo de `div.uagb-rm__content`**, que el CSS convierte en fila flex:
imagen → nombre y descripción → precio. En móvil (≤781 px) la imagen baja de 82 a 64 px y la fila se
mantiene.

```html
<img class="tdv-dish-img no-lazy skip-lazy" loading="lazy" decoding="async"
     width="1080" height="1080" src="img-carta/E01_jamon-iberico-bellota.webp"
     alt="Jamón 100% ibérico de bellota">
```

Las clases `no-lazy skip-lazy` son deliberadas: el tema usa **lazyload de Smush**, que mueve el `src`
real a `data-src` y deja un SVG placeholder. Nuestras `<img>` quedan fuera de ese mecanismo y usan
`loading="lazy"` nativo del navegador.

**Para pasarlo a WordPress:** subir los 38 `.webp` a la biblioteca de medios (o a
`/wp-content/uploads/carta/`), sustituir `img-carta/` por esa ruta en el `src`, y pegar el bloque
`<style id="tdv-carta-imagenes">` en Apariencia → Personalizar → CSS adicional.

---

## 7. Manos en el encuadre (reglas 9 y 13)

8 de las 38 llevan dedos en cuadro, **nunca cara, muñeca ni antebrazo**:

| Imagen | Gesto | Mano |
|---|---|---|
| `E01_jamon-iberico-bellota` | levanta una loncha del plato | mujer |
| `E18_surtido-croquetas` | pellizca una croqueta | hombre |
| `S03_ensalada-cesar` | tenedor con pollo y lechuga | mujer |
| `M05_solomillo-ternera` | tenedor con un medallón | hombre |
| `P06_calamar-nacional` | tenedor con una tira de calamar | mujer |
| `D01_tarta-queso` | tenedor de postre con un bocado | mujer |
| `D02_tarta-pistacho` | tenedor de postre con un bocado | mujer |
| `D05_brownie-chocolate-blanco` | cuchara con helado y brownie | mujer |

**6 de mujer y 2 de hombre** — cumple la regla 13 (predominan las de mujer).

---

## 8. ❌ Los 33 productos SIN imagen — hace falta foto real

Ordenados por prioridad comercial. Ninguno tiene una sola foto en el repo.

### Prioridad alta — platos de carta principal

| Producto | € | Categoría |
|---|---|---|
| CHURRASCOS DE POLLO | 15 | Carnes |
| PLATO DE LOS MONTES | 16 | Carnes · *hay imagen en la web publicada, no en el repo* |
| CACHOPO DE TERNERA | 25 | Carnes |
| CHULETITAS DE CORDERO | 24 | Carnes |
| BACALAO EN SALSA DE LA CASA | 22 | Pescados |
| DORADA A LA ESPALDA | 18 | Pescados |
| BACALAO FRITO | 20 | Pescados |
| ROSADA FRITA O PLANCHA | 16 | Pescados |
| PUNTILLITAS FRITAS | 14 | Pescados · *hay imagen en la web publicada, no en el repo* |
| STEAK TARTAR | 22 | Entrantes |
| REVUELTO DE SETAS Y FOIE | 15 | Entrantes |

### Prioridad media — entrantes y ensaladas

| Producto | € | Categoría |
|---|---|---|
| ENSALADILLA RUSA | 10 | Entrantes · *hay imagen en la web publicada, no en el repo* |
| QUESO CURADO DE OVEJA | 11/16 | Entrantes |
| QUESO AZUL DE CABRA DE MÁLAGA | 13/18 | Entrantes |
| TARTAR DE SALCHICHÓN DE MÁLAGA | 15 | Entrantes |
| BERENJENAS FRITAS CON MIEL DE CAÑA | 12 | Entrantes |
| MORCILLA DE ARROZ CON MERMELADA DE TOMATE | 14 | Entrantes |
| TOSTA DE ANCHOA DE SANTOÑA CON MANTEQUILLA DE TRUFA | 3.50 | Entrantes |
| ENSALADA DE LA CASA | 11 | Ensaladas |
| ENSALADA TROPICAL | 13 | Ensaladas |

### Cuchareo — la categoría entera está sin foto

| Producto | € |
|---|---|
| SOPA DE MARISCO | 9 |
| SOPA DE PICADILLO | 8 |
| CARACOLES | 15 |
| CALLOS | 9 |

### Para los peques

| Producto | € |
|---|---|
| LAGRIMITAS DE POLLO CON PATATAS | 11 |
| ESCALOPE DE POLLO CON PATATAS | 13 |
| HAMBURGUESA DE CARNE MADURADA | 14 |
| EXTRA DE HUEVO FRITO | 1.50 |

### Postres

| Producto | € |
|---|---|
| TARTA DE LOTUS | 7 |
| TARTA DE MANZANA CON CARAMELO | 7 |
| ARROZ CON LECHE | 5 |
| NATILLAS | 5 |
| FRUTAS DEL DÍA | 4.50 |

---

## 9. ⚠️ Dudas concretas que hay que confirmar con Jose

Estas nueve **sí se han generado**, pero la referencia no es inequívoca. Si alguna está mal, se
corrige por 2 créditos.

| # | Imagen generada | La duda |
|---|---|---|
| 1 | `E03_lomo-en-manteca` | La foto de referencia se llama `gildas.jpg` / `gildas3.jpg`, pero la carta **no tiene gildas**. La foto muestra pinchos de lomo curado con guindilla en manteca, en bandeja gastronorm. **¿Es el lomo en manteca?** Además, la foto no enseña cómo se emplata: se ha servido en plato blanco redondo del local. |
| 2 | `M11_brocheta-pollo` | Se ha usado `pinchito-ternera.jpg` porque `pinchito.jpg` ya iba a la brocheta de cerdo. El nombre dice **ternera** y la carta no tiene brocheta de ternera. **¿Cuál de las dos fotos es la de pollo y cuál la de cerdo?** |
| 3 | `M12_presa-iberica` | La única referencia es `parrilla_secreto.jpg`, que es **secreto** sobre la parrilla, y la carta lista **presa**. Se ha emplatado en el plato de barro (regla 22: la parrilla nunca se genera). **¿Es la misma pieza?** |
| 4 | `M04_solomillo-cerdo` vs `M05_solomillo-ternera` | Todas las fotos `solomillo*.jpg` parecen del **mismo plato**. La carta tiene dos solomillos a precios muy distintos (19 € y 28 €). **¿Cuál de los dos es el de las fotos?** El otro se ha generado por descripción. |
| 5 | `E06`, `E11`, `E12`, `E17` (croquetas) | Solo hay fotos de **croquetas genéricas**. Se han diferenciado por el color del rebozado y del relleno (bacalao clara, puchero dorada, chipirones negra, rabo de toro oscura). **¿Se corresponde con la realidad?** |
| 6 | `A01`, `A02`, `A03` (salsas) | Solo es real **la salsera**. El contenido de `salsa-blanca.jpg` no se identifica, así que el color y la textura de cada salsa son estándar. **¿Son así las tres?** |
| 7 | `G03_patatas-a-lo-pobre` | No hay foto. Se ha generado el corte clásico (rodajas con cebolla y pimiento). `patatas-bravas.png` es el corte en gajo, distinto. **¿Cómo son las de la casa?** |
| 8 | `P05_pata-pulpo-brasa` | La carta dice **con puré de patatas** y la foto real (`pulpo.png`) muestra **patata en rodajas**. Se ha generado con puré, siguiendo la carta. **¿Manda la carta o la foto?** |
| 9 | `S06_extra-anchoas` | No hay foto del extra suelto; las anchoas solo aparecen sobre el tomate. Se han servido solas en plato pequeño. **¿Se sirve así?** |

### Además

Tres productos **ya tienen imagen en la web publicada** (`/wp-content/uploads/2024/07/*.png`) pero
esos archivos no están en el repo: **Ensaladilla Rusa**, **Plato de los Montes** y **Puntillitas
fritas**. Si son fotos reales del local, pasarlas al repo y usarlas como referencia — así se cubren
tres de los 33 sin gastar créditos.

---

## 10. Segunda web: `web-referencia` (fondo OSCURO) — 2026-09-14

La web en diseño del cliente está en
`C:\Users\victo\Documents\Codex\2026-09-10\analiza-este-proyecto-entero-y-analiza\outputs\web-referencia\`.
Es HTML/CSS/JS nativo. La carta (`carta.html` + `carta.js` + `menu.css`) va sobre **fondo oscuro**
(`#17201c`, y `#30231e` / `#152329` / `#171717` según la categoría filtrada) con una franja dorada
`#ccad60` cruzando la galería.

**Consecuencia: aquí `mix-blend-mode: multiply` NO sirve** (sobre oscuro ennegrece la foto entera).
Hacen falta PNG/WebP con **alfa real**, como los 5 `*-recorte-original-v1.png` que ya tenía el diseño.

### Cómo se integró

- `carta.js` ya tenía un mecanismo: el array `references` (`[subcadena del nombre, fichero]`). Cada plato
  que casa se saca de la lista de texto y pasa a la **galería alterna izquierda/derecha** (`.visual-dishes`),
  que imita el póster de referencia. Se han añadido **33 entradas** apuntando a `assets/carta/*.webp`.
- **Se mantienen las 5 fotografías originales** que ya estaban (bravas, pil-pil, surtido de croquetas,
  ensalada de queso de cabra, tarta de pistacho): foto real > emplatado generado. Resultado: **38 platos
  con imagen** en la galería; los 33 sin foto real siguen en «Toda nuestra cocina», solo texto.
- Caché: `carta.html` pasa de `carta.js?v=cutouts-23` a `?v=cutouts-24`.
- Copia de seguridad previa de toda la carpeta: `outputs\web-referencia.backup-2026-09-14\`.

### Cómo se consiguió el alfa — lo que falló y lo que funcionó

| Intento | Resultado |
|---|---|
| `rembg` + `isnet-general-use` sobre las 38 de fondo blanco | ✅ 19 perfectas (terracota, cazuelas, salseras, postres oscuros, bol de bravas, estofado). ⛔ 19 **pierden el plato blanco o la tabla**: el modelo trata la comida como sujeto y la porcelana blanca como fondo. |
| Regenerar esas 19 cambiando **solo el fondo** a carbón mate (regla 27, «THE ONE CHANGE») | ✅ Plato, comida y mano idénticos a la versión blanca (verificado lado a lado). 38 créditos. |
| `isnet-general-use` sobre las regeneradas | ⛔ Sigue perdiendo el plato en 11 de 19 — el problema es del modelo, no del contraste. |
| Recorte por color desde los bordes (un único color de fondo) | ✅ Platos enteros. ⛔ Cajas grises semitransparentes donde el carbón generado traía degradado/viñeteado (esquinas de `#0b0c0b` a `#4b4b4d` en la misma imagen). |
| **Recorte por luminancia baja + color neutro, conectado al borde** | ✅ **Las 19 limpias.** Tolera el degradado; el plato blanco es claro y la mano tiene croma, así que nunca se confunden con el fondo. |

Detalle que evita un defecto visible: las manos entran desde fuera del encuadre y, recortadas, la muñeca
terminaba en un corte recto. Los dos scripts **desvanecen el alfa en el 5 % pegado al borde de la foto**.

### Entregables nuevos

```
imagenes/carta_web/
├── raw_fondo_oscuro/          19 regeneraciones sobre carbón (platos blancos, tabla, manos)
├── alfa/                      38 PNG RGBA recortados (lado máx. 900 px)
├── recortar_alfa.py           rembg isnet-general-use — para platos NO blancos sobre fondo blanco
└── recortar_fondo_oscuro.py   luminancia + croma — para las regeneradas sobre carbón
web-referencia/assets/carta/   33 .webp con alfa (~3,2 MB en total)
```

`rembg` se instaló en un **entorno virtual aislado** del scratchpad de la sesión, no en el Python del
sistema. El modelo (`isnet-general-use.onnx`, 170 MB) está en `~/.u2net/`; se bajó con `curl` porque
la descarga desde Python fallaba por certificado SSL.

### Coste de esta fase

38 créditos (19 × 2). Acumulado de todo el trabajo de la carta: **121 créditos**.

### Pendiente para quien retome

- **Desbordamiento en móvil (PREEXISTENTE, no causado por las imágenes).** A 390 px de ancho, la galería
  alterna corta por la derecha títulos e imágenes, y el buscador y los filtros se salen de la pantalla.
  Verificado con una captura de `web-referencia.backup-2026-09-14` (anterior al cambio): pasa igual con
  las 5 fotos originales. Pero ahora afecta a **38 filas en vez de 5**, así que se nota mucho más. Causa
  probable: `.visual-dish` mantiene `grid-template-columns:1fr 1fr` en móvil con títulos largos a
  `23px` y la franja dorada fija en el centro. No se ha tocado `menu.css`: queda para decidir con el cliente.

- Los 33 platos sin foto real (sección 8) y las 9 dudas de identificación (sección 9) siguen abiertos.
- Coherencia visual: las 5 fotos originales tienen acabado de móvil y las 33 generadas, luz editorial.
  Si al cliente le chirría la mezcla, cambiar cualquiera de las 5 es editar una línea de `references`
  (existen versiones generadas: `E10`, `E04`, `E18`, `S02`, `D02` en `imagenes/carta_web/alfa/`).
