<!-- society-document -->
> **Estado:** vigente · diseño, no implementado. **Fecha de revisión:** 2026-10-12.
> **Ámbito / a quién obliga:** modelo conceptual de la base de datos local de la app móvil en Kotlin, limitado a cuatro pantallas del boceto: búsqueda del local, estudio del local, ficha del local y creación de una pieza.
> **Fuentes:** capturas de los bocetos facilitadas por Víctor el 2026-10-12. Los valores de ejemplo salen de esas capturas; lo que no se ve en ellas va marcado como *no verificado*. El paso a tablas está en el [diagrama de estructura de datos](Society_ded_app_movil.md).
> **Índice único y autoridad:** [README raíz](../README.md).

# Society — Modelo entidad-relación de la app móvil (pantallas de alta y primera pieza)

## 1 Alcance

El modelo cubre **solo lo que aparece en estas cuatro pantallas**:

| # | Pantalla | Qué guarda |
|---|---|---|
| 1 | **Empezamos** · «Busca tu local en Google Maps» | El local elegido con «Es mi local» |
| 2 | **Estudiando tu local** · paso 3 de 6 | El análisis en curso y el estado de cada fuente |
| 3 | **Ficha del local** · «Ficha guardada en tu perfil» | Canales, forma de hablar, colores, letras y rasgos únicos |
| 4 | **Tu idea** · fotos de platos, del local y referencia estética | El brief de una pieza y las fotos que usa |

Se mantienen los nombres de entidad del [README §8.1](../README.md#81-modelo-de-datos-entidades-principales) cuando hay equivalente: *Restaurante*, *Recurso*, *Brief de pieza*. Usuarios, planes, suscripciones, producción, publicación y métricas quedan fuera porque no salen en estas pantallas.

Este documento es el **modelo conceptual**. Describe entidades, atributos y relaciones; no contiene claves foráneas, tipos de datos ni decisiones de implementación. Todo eso aparece al pasar a tablas, en el [DED](Society_ded_app_movil.md).

**Contradicción registrada.** El README (§8) propone la interfaz como web en React + TypeScript o Angular. Este encargo habla de una app móvil en Kotlin con base de datos local. Hasta que Víctor registre el cambio en el README §14, las dos cosas conviven sin decisión.

## 2 Diagrama

![Modelo entidad-relación de la app móvil en notación de Chen](diagramas/modelo-er-app-movil.png)

La lámina está en [`diagramas/modelo-er-app-movil.png`](diagramas/modelo-er-app-movil.png) (fuente editable para Figma: [`.svg`](diagramas/modelo-er-app-movil.svg)).

Notación de Chen:

| Elemento | Forma |
|---|---|
| Entidad | Rectángulo |
| Entidad débil | Rectángulo doble |
| Relación | Rombo con su verbo |
| Relación de identificación (la que une una entidad débil con su propietaria) | Rombo doble |
| Atributo | Óvalo |
| Identificador | Óvalo con el nombre subrayado |
| Clave parcial de una entidad débil | Óvalo con el nombre subrayado a trazos |
| Atributo derivado | Óvalo a trazos |
| Atributo compuesto | Óvalo del que cuelgan los óvalos de sus componentes |

**Cómo se leen las cardinalidades.** El par (mín, máx) junto a una entidad indica cuántas ocurrencias de esa entidad se relacionan con una ocurrencia de la otra. En «tiene fotos», el (0,N) junto a RECURSO significa que un restaurante tiene de cero a muchas fotos, y el (1,1) junto a RESTAURANTE, que cada foto es de un solo restaurante. Junto a cada rombo va el tipo de relación: 1:1, 1:N o N:M.

## 3 Entidades

Once entidades, siete fuertes y cuatro débiles. Las débiles (PASO_ANALISIS, TONO_MARCA, COLOR_MARCA y TIPOGRAFIA) no existen sin su propietaria y se identifican por ella más una clave parcial.

### 3.1 RESTAURANTE · pantallas 1 y 3

Una ocurrencia por local. Se crea al pulsar **«Es mi local»**. Todo local sale de Google Maps: no se añade a mano.

**Identificador:** `id`. `google_place_id` también identifica el local de forma única (identificador alternativo).

| Atributo | Obligatorio | De dónde sale | Ejemplo del boceto |
|---|---|---|---|
| `google_place_id` | sí | Identificador del resultado de Google Maps | — |
| `nombre_google` | no | Título del resultado | Restaurante Torre de Vega «El Mora» |
| `nombre`, `apodo` | sí / no | Cabecera de la ficha, editables | Torre de Vega · «El Mora» |
| `descripcion_corta` | no | Subtítulo de la ficha | Asador familiar en La Alquería |
| `ubicacion` (compuesto: `direccion`, `municipio`, `provincia`) | sí | Resultado de búsqueda | Plaza Santa Ana, 8 · Alhaurín de la Torre · Málaga |
| `valoracion_media`, `num_resenas` | no | Google Maps | 4,8 · 1.695 |
| `creado_en` | sí | Momento en que se pulsa «Es mi local» | — |

Los **resultados de búsqueda no se guardan**: viven en memoria mientras la pantalla está abierta. Solo el elegido pasa a ser un RESTAURANTE. El segundo resultado del boceto («Restaurante Casa Pepe») es relleno, como indica la propia pantalla.

### 3.2 RECURSO · pantallas 1 y 4

Cada foto del local o de un plato. **Identificador:** `id`.

Atributos: `uri_local`, `url_remota`, `procedencia`, `naturaleza`, `categoria`, `atribucion`, `orden` y `creado_en`. La foto se guarda en el almacenamiento interno de la app; la entidad solo guarda su ruta (`uri_local`) o su dirección de origen (`url_remota`).

- `procedencia` dice de dónde vino el archivo: el carrusel de Google Maps de la pantalla 1, la galería o la cámara de la pantalla 4, o la web e Instagram durante el análisis.
- `naturaleza` es la etiqueta del README §6 (real, generado o externo). Las fotos de Google Maps las sube cualquiera, no el restaurante: entran como externas hasta que el propietario confirme que son suyas.
- `categoria` separa «Fotos de tus platos» de «Fotos de tu local». Las de Google llegan sin clasificar, porque el carrusel mezcla sala, terraza y platos.
- `atribucion` guarda el autor de la foto en Google.

### 3.3 CANAL · pantallas 2 y 3 («Dónde te encuentran»)

Una ocurrencia por perfil o vía de contacto: Instagram `@restaurantetorredevega`, TikTok `@restaurante_torredevega`, web `restaurantetorredevega.es`. **Identificador:** `id`. Atributos: `tipo`, `identificador`, `acepta_reservas` y `editado`.

La línea **«Reservas: WhatsApp y formulario web»** no es un canal aparte ni un atributo: es un dato derivado de los canales que aceptan reservas, el de WhatsApp y el de la web. Así, al editar la web, no queda una copia desactualizada en otro sitio.

`editado` indica si el propietario cambió el dato con el lápiz después de que lo encontrara el análisis. Sirve para que, si el análisis se repite, no pise lo que el propietario corrigió. COLOR_MARCA lleva el mismo atributo.

### 3.4 ANALISIS y PASO_ANALISIS · pantalla 2

El estudio corre en el servidor («Puedes cerrar la app. Seguimos trabajando.»), así que ANALISIS es un **espejo del trabajo remoto**. **Identificador:** `id`.

- `trabajo_remoto_id` enlaza con el trabajo del servidor. Al volver a abrir la app se consulta su estado y no se lanza otro.
- `progreso` (46 %) y `minutos_restantes` (4) los manda el servidor.
- `avisar_al_terminar` se activa con «Avisarme cuando termine».
- Completan la entidad `estado`, `total_pasos`, `iniciado_en` y `terminado_en`.
- `paso_actual` es un **atributo derivado**: el «paso 3 de 6» se calcula contando los pasos hechos más uno, sobre `total_pasos`. No se guarda.

**PASO_ANALISIS es una entidad débil** de ANALISIS: un paso no existe fuera de su análisis y se identifica por el análisis al que pertenece más su `orden` (clave parcial). Cada paso tiene su `fuente`, su `estado` (los «HECHO» y «AHORA» del boceto) y un `detalle` libre: «1.695 reseñas leídas» o «Leyendo la carta». Si el paso lee un perfil, se relaciona con ese CANAL («se lee en») y la pantalla muestra el `@usuario`.

*No verificado:* el boceto enseña cinco pasos de seis. El sexto no se ve; el dominio de `fuente` tendrá que ampliarse cuando se defina.

### 3.5 FICHA_MARCA y sus listas · pantalla 3

Una ficha por restaurante como mucho. **Identificador:** `id`. Guarda qué análisis la generó y una `version` que sube con cada edición, en línea con el principio de preferencias versionadas del [flujo §2](Society_flujo_de_la_aplicacion.md#2-principios-del-flujo).

Sus listas son **entidades débiles** de FICHA_MARCA:

| Bloque del boceto | Dónde se guarda |
|---|---|
| **Cómo hablas** · Cercano · Tradicional · Apetitoso | TONO_MARCA, débil: una ocurrencia por palabra, identificada por la ficha y su `orden` |
| «La calidad se nota en cada plato» · *Así escribes en tu Instagram* | `frase_ejemplo` y `origen_frase` en FICHA_MARCA |
| **Tus colores** · Dorado, Azul rótulo, Ladrillo, Pino, Carbón | COLOR_MARCA, débil: `nombre`, `hex` y `editado`, identificada por la ficha y su `orden` |
| *Sacados de tu web, del rótulo de la entrada y de tu sala* | `origen_colores` en FICHA_MARCA (una sola frase para toda la paleta) |
| **Tus letras** · títulos, textos y rótulo | TIPOGRAFIA, débil: identificada por la ficha y su `rol` |
| *Parecida a la de tu rótulo* | `coincidencia` (exacta o parecida) y `origen_texto` en TIPOGRAFIA |
| **Lo que te hace único** · Tu local / En la carta | `unico_local` y `unico_carta` en FICHA_MARCA |

`unico_local` y `unico_carta` son atributos porque el boceto tiene exactamente esas dos etiquetas fijas. Si en el futuro hay más rasgos, se pasan a una entidad propia.

En TIPOGRAFIA, `familia` es opcional: el boceto muestra la letra pero no su nombre, y una tipografía de un rótulo físico puede no tener equivalente exacto. Su `texto_muestra` es lo que se pinta en la ficha.

### 3.6 BRIEF_PIEZA, relación «incluye» y REFERENCIA_ESTETICA · pantalla 4

- **BRIEF_PIEZA** guarda **Tu idea** (`idea`) y el chip elegido (`tipo`), además de `estado`, `creado_en` y `actualizado_en`. **Identificador:** `id`. El texto «Pulpo a la brasa directo de Galicia…» es un ejemplo dentro del campo, no un dato.
- **«incluye»** es la relación N:M entre el brief y las fotos. Una misma foto del local (la terraza traída de Google Maps) puede usarse en varias piezas, y una pieza usa varias fotos. La relación tiene **atributos propios**: `papel` indica en qué bloque está la foto (platos o local) y `orden` respeta el orden de los huecos.
- **REFERENCIA_ESTETICA** reúne las del catálogo de Society («Promo burgers», «Hoy toca sushi») y las que sube el propietario con «Añadir foto». **Identificador:** `id`. Atributos: `origen`, `titulo` e `imagen_uri`. El boceto dice «elige **un** post», así que cada brief tiene como mucho una referencia.

Una referencia subida por el usuario **no** es un RECURSO: es un post ajeno que sirve de inspiración, no material del local. Mantenerla aparte evita que acabe usándose como foto del restaurante.

## 4 Relaciones

| Relación | Entidades y cardinalidades | Tipo | Observaciones |
|---|---|---|---|
| tiene fotos | RESTAURANTE (1,1) — RECURSO (0,N) | 1:N | |
| aparece en | RESTAURANTE (1,1) — CANAL (0,N) | 1:N | |
| se estudia en | RESTAURANTE (1,1) — ANALISIS (0,N) | 1:N | |
| se divide en | ANALISIS (1,1) — PASO_ANALISIS (1,N) | 1:N | De identificación: PASO_ANALISIS es débil |
| se lee en | CANAL (0,1) — PASO_ANALISIS (0,N) | 1:N | Solo los pasos que leen un perfil |
| tiene | RESTAURANTE (1,1) — FICHA_MARCA (0,1) | 1:1 | |
| genera | ANALISIS (0,1) — FICHA_MARCA (0,1) | 1:1 | La ficha sigue valiendo aunque su análisis desaparezca |
| habla | FICHA_MARCA (1,1) — TONO_MARCA (0,N) | 1:N | De identificación |
| usa | FICHA_MARCA (1,1) — COLOR_MARCA (0,N) | 1:N | De identificación |
| escribe con | FICHA_MARCA (1,1) — TIPOGRAFIA (0,N) | 1:N | De identificación; como mucho una por rol (títulos, textos, rótulo) |
| pide | RESTAURANTE (1,1) — BRIEF_PIEZA (0,N) | 1:N | |
| incluye | BRIEF_PIEZA (0,N) — RECURSO (0,N) | N:M | Atributos de la relación: `papel`, `orden` |
| inspira | REFERENCIA_ESTETICA (0,1) — BRIEF_PIEZA (0,N) | 1:N | Un brief tiene como mucho una referencia |
| sube | RESTAURANTE (0,1) — REFERENCIA_ESTETICA (0,N) | 1:N | Las referencias del catálogo no son de ningún restaurante |

## 5 Decisiones de modelado

1. **Sin claves foráneas.** En un modelo conceptual, la relación entre dos entidades la expresa el rombo, no un atributo. Las foráneas aparecen al pasar a tablas, en el DED.
2. **Entidades débiles.** Pasos, tonos, colores y tipografías son partes de un análisis o de una ficha: no tienen sentido solos y se identifican por su propietaria más una clave parcial (`orden` o `rol`).
3. **Atributo compuesto `ubicacion`.** Dirección, municipio y provincia se usan juntos y salen juntos del resultado de Google.
4. **Atributos derivados.** El paso actual del análisis y la línea de reservas se calculan a partir de otros datos, así que no se modelan como atributos almacenados.
5. **Relación N:M con atributos.** El papel y el orden de cada foto no son de la foto ni del brief, sino de su uso en ese brief concreto; por eso son atributos de «incluye».

Dominio de los atributos con valores fijos:

| Entidad | Atributo | Valores |
|---|---|---|
| RECURSO | `procedencia` | Google Maps, galería, cámara, web, Instagram |
| RECURSO | `naturaleza` | Real, generado, externo |
| RECURSO | `categoria` | Plato, local, sin clasificar |
| CANAL | `tipo` | Instagram, TikTok, web, WhatsApp |
| ANALISIS | `estado` | En curso, terminado, error, cancelado |
| PASO_ANALISIS | `fuente` | Google Maps, Instagram, web, TikTok, colores y letras (falta el sexto paso) |
| PASO_ANALISIS | `estado` | Pendiente, en curso, hecho, error, omitido |
| TIPOGRAFIA | `rol` | Títulos, textos, rótulo |
| TIPOGRAFIA | `coincidencia` | Exacta, parecida |
| BRIEF_PIEZA | `tipo` | Plato estrella, novedad, oferta, evento |
| BRIEF_PIEZA | `estado` | Borrador, enviado |
| incluye | `papel` | Plato, local |
| REFERENCIA_ESTETICA | `origen` | Catálogo, usuario |

El paso a tablas, los tipos de datos, los nulos, las acciones al borrar y las notas para Room están en el [DED](Society_ded_app_movil.md).

## 6 Pendiente de decidir

| Tema | Por qué importa |
|---|---|
| **Sincronización con Supabase** | El README pone Supabase como base de datos central. Si la base local es una caché, cada entidad necesitará su identificador remoto y una marca de pendiente de subir. Las pantallas no lo muestran, así que no se ha añadido. |
| **Datos de Google en local** | *No verificado en esta revisión:* los términos de Google Maps Platform suelen limitar qué contenido de Places se puede guardar, salvo el `place_id`. Valoración, número de reseñas y fotos están tratados como caché de Google; hay que leer los términos vigentes antes de decidir si se guardan o se piden cada vez. Las fotos de Places exigen además mostrar la atribución del autor. |
| **Derechos de las fotos de Google Maps** | Son de quien las subió, no del restaurante. Antes de usarlas en una pieza publicada hace falta confirmación del propietario (README §6, «nada inventado» y derechos). |
| **Sexto paso del análisis** | No aparece en el boceto. |
| **Usuario y sesión** | «Ficha guardada en tu perfil» implica una cuenta, pero ninguna de las cuatro pantallas la muestra. |
| **Interfaz web o app Kotlin** | Contradicción con el README §8; ver §1. |

## 7 Cambios en esta revisión

Revisión del 2026-10-12 sobre la primera versión del mismo día. Cambia la forma de modelar; no cambia ningún dato de los bocetos ni ningún tema pendiente.

- **El diagrama pasa a notación de Chen** (entidades, rombos, óvalos y cardinalidades). La versión anterior usaba un diagrama de tablas en Mermaid, que corresponde al DED. Mermaid no dibuja notación de Chen, así que el diagrama es ahora una lámina con su fuente editable.
- **Se quitan del ER las claves foráneas, los tipos de datos y las notas para Room.** Pasan al DED.
- **BRIEF_RECURSO deja de ser una entidad** y se modela como la relación N:M «incluye», con `papel` y `orden` como atributos de la relación. Se renombra de «usa» a «incluye» para no repetir el nombre de la relación entre FICHA_MARCA y COLOR_MARCA.
- **PASO_ANALISIS, TONO_MARCA, COLOR_MARCA y TIPOGRAFIA pasan a ser entidades débiles**, identificadas por su propietaria y una clave parcial.
- **Dirección, municipio y provincia** se agrupan en el atributo compuesto `ubicacion`.
- **El paso actual del análisis** se representa como atributo derivado.
- **Las cardinalidades se expresan como (mín, máx)** en cada participación.
