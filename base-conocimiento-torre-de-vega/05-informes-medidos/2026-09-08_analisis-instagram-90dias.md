# Análisis de Instagram — Torre de Vega · 90 días (11 jun – 8 sep 2026)

**Fecha:** 2026-09-08
**Fuente:** panel de Windsor.ai / API de Meta — artifact `e5667723-a988-4343-8846-c944277101c4`
**Muestra:** 21 publicaciones (16 Reels + 5 carruseles), 90 días de datos diarios de cuenta,
30 días de detalle de altas de seguidores.
**Qué añade este documento sobre el panel:** el panel describe *qué pasó*. Aquí se calcula *qué
causa qué* (correlaciones sobre los datos crudos), se corrigen tres lecturas del panel que llevan
a decisiones equivocadas, y se separan los tres objetivos del cliente —seguidores, virales,
likes— porque **no se consiguen con la misma palanca y en parte se estorban entre sí**.

---

## 1. El diagnóstico en una frase

En 90 días **ninguna publicación salió de la base de seguidores**: el mejor Reel alcanzó al 68 %
de los seguidores y ni uno solo superó los 4.349 en alcance. No es que la cuenta haya perdido
viralidad — **es que no ha tenido ninguna**. Lo que hay es reparto interno entre seguidores, y
ese reparto está limitado por dos cosas medibles: la retención a 3 segundos (todos los Reels por
debajo del umbral de distribución) y la frecuencia (77 % de los días sin publicar).

---

## 2. Los ocho hallazgos duros

| # | Hallazgo | Dato |
|---|---|---|
| 1 | Ningún post rompió la burbuja de seguidores | 0 de 21 con alcance > 4.349. Máximo: 2.954 (67,9 %). Solo 1 post superó los seguidores en *reproducciones* (barbacoa: 4.433 = 102 %) |
| 2 | La cuenta está callada 3 de cada 4 días | 69 de 90 días sin publicar. Hueco medio entre posts: **4,3 días**; diez huecos de ≥5 días; el mayor, 10 días |
| 3 | Publicar es la palanca más fiable que existe | Alcance diario **mediana 417 con post vs. 105 sin post**. Cada publicación compra ~312 de alcance extra, sin excepción y sin depender de la calidad |
| 4 | Todos los Reels están por debajo del umbral de retención | Abandono a 3 s entre **56,8 % y 82,8 %**, mediana ~75 %. El mejor de los 16 sigue perdiendo a más de la mitad de la audiencia en 3 segundos |
| 5 | Lo único que mueve el alcance son los compartidos | Spearman compartidos↔alcance **+0,51**. Guardados↔alcance **+0,04** (nulo). Dos posts concentran el **50 %** de todos los compartidos del trimestre |
| 6 | El contenido casi no genera seguidores | +46 en 30 días = 1,53/día. Correlación alcance diario ↔ altas: **+0,15** (nula). Mediana de altas: **2,0 en día con post vs. 1,5 sin post**. Los 4 días de mayor alcance aportaron 10 de 46 altas |
| 7 | El perfil no convierte | **5 taps** en el botón de contacto en 90 días, sobre 1.070 interacciones. Campo "web" vacío en el perfil |
| 8 | Casi la mitad del rendimiento viene del catálogo viejo | De 50.485 reproducciones de cuenta, solo 29.296 son de estos 21 posts. De 753 me gusta, solo 439 |

---

## 3. Qué ha funcionado de verdad (y por qué)

Solo dos publicaciones se salieron de la banda de 300–1.000 de alcance. Las dos comparten un
mecanismo, y **no es la belleza del plano**:

| Post | Alcance | Compartidos | Share rate | Retención a 3 s |
|---|---|---|---|---|
| ☀️ Barbacoa de verano (12 jun) | 2.954 | 15 | 0,51 % | 67,3 % de abandono |
| ✨ Bienvenidos a Torre de Vega (13 ago) | 1.938 | 9 | 0,46 % | **77,0 % de abandono** |

El resto del trimestre se mueve entre 0,00 % y 0,33 % de share rate.

**El mecanismo real: se comparte lo que resuelve un plan, no lo que enseña un plato.**
"Abrimos la barbacoa el 19 de junio" es un mensaje que un vecino de Alhaurín reenvía a su
cuñado por WhatsApp. "El secreto es la calidad de nuestras carnes" no se reenvía a nadie. El
segundo mejor post del trimestre tiene la **peor retención** de casi todo el lote (77 % de
abandono) y aun así alcanzó a 1.938 personas: la retención no lo salvó, lo salvó el reenvío.

**Patrón replicable:** novedad concreta + fecha + beneficio local. No es un tono ni un estilo
visual, es un **tipo de información**. Y por eso mismo no se puede fabricar todas las semanas:
requiere que haya algo real que anunciar.

**Segundo hallazgo menor pero sólido:** las dos únicas publicaciones que **nombran un producto
concreto** rinden distinto entre sí, pero el carrusel del Caldelana Gallega generó **17 visitas
al perfil**, la cifra más alta del trimestre, con solo 455 de alcance. La especificidad
("Caldelana Gallega, vaca criada en libertad, madurada") genera curiosidad sobre el negocio;
"nuestras carnes de máxima calidad" no.

---

## 4. Qué no ha funcionado

- **El producto genérico, que es el 52 % de lo publicado.** Los 11 posts de "carne/jamón sin
  ángulo" promedian 645 de alcance y 47,5 de puntuación; los otros 10 promedian 1.012 y 52,7.
  Once publicaciones con captions casi intercambiables ("la brasa te está esperando", "todo
  empieza con una buena elección", "el secreto es la calidad") ocupan la mitad del calendario y
  no mueven ninguna métrica.
- **El tema vinos, dos veces.** 26,1 de puntuación media, la más baja. Ver punto 6.3.
- **El gancho "¡AVISO!" sin aviso detrás.** Gastó una palabra que sí hace falta cuando haya un
  cierre o un cambio de horario real.
- **Los comentarios como palanca.** 10 en 90 días, 71 % de los posts con cero. Merece la pena
  arreglarlo por señal de comunidad, pero conviene saber que en esta muestra la correlación
  comentarios↔alcance es **−0,67**: hoy son ruido estadístico, no un motor.

---

## 5. El Reel producido por la agencia: hay que decirlo

El Reel **"3 blancos que le vienen que ni pintados"** (6 sep) —el primero producido con el flujo
de generación de imágenes documentado en [`instagram/proceso-reel-vinos-blancos.md`](../instagram/proceso-reel-vinos-blancos.md)—
es, sobre los datos de Instagram:

- **el peor de los 16 Reels en retención**: 82,8 % de abandono en los 3 primeros segundos (la
  mediana de la cuenta es 75 %, el mejor caso 56,8 %);
- **el más bajo en reproducciones** de todo el trimestre: 695;
- puntuación 31,9 / 100.

Hay un atenuante real y hay que contarlo entero: se publicó el 6 de septiembre, con el
restaurante cerrado por vacaciones desde el 31 de agosto y el alcance de cuenta en mínimos
estacionales. Eso explica parte del alcance bajo. **Lo que no explica es el 82,8 % de abandono**:
esa métrica es por espectador, no depende de cuánta gente lo vio. De cada 100 personas que lo
empezaron, 83 lo dejaron antes del segundo 3.

La lectura honesta: el flujo de producción resolvió bien la fidelidad al local real (botellas
reales, vajilla real, regla 1 respetada), y falló en lo único que decide si un Reel se
distribuye. Nueve cortes de 1,2 s de botellas bonitas no le dan al espectador ninguna razón para
quedarse en el segundo 1. Corregible, y el punto 7.2 dice cómo.

---

## 6. Tres correcciones al panel

El panel es sólido en la descripción y prudente con los tamaños de muestra. Pero tres de sus
recomendaciones, aplicadas tal cual, gastarían el presupuesto en la dirección equivocada.

### 6.1. Los carruseles **no** son la palanca de crecimiento

El panel los presenta como el formato que mejor convierte (5,2 % de engagement vs. 3,1 % de los
Reels) y recomienda subirlos al 40 % del calendario para ganar seguidores. Dos problemas:

- **El 5,2 % es un artefacto del denominador.** Engagement rate = interacciones / alcance. El
  alcance medio del carrusel es **477** (11 % de los seguidores) frente a **926** del Reel (21 %).
  El carrusel no engancha más: llega a menos gente y más cercana. Con un público más frío el
  ratio bajaría igual.
- **Los "2 seguidores atribuidos en 5 carruseles"** no son una señal de crecimiento, son ruido
  frente a las 46 altas del mes.

**Corrección:** el carrusel es una **herramienta de conversión sobre público ya captado** —ahí sí
gana, y las 17 visitas al perfil del Caldelana lo demuestran—, no una herramienta de captación.
Para ganar seguidores hay que alcanzar a quien todavía no sigue la cuenta, y eso en Instagram
solo lo hace el Reel. Mantener el carrusel en ~1/semana por su valor de conversión, no subirlo
al 40 % esperando seguidores.

### 6.2. Los guardados **no** son un indicador de crecimiento

El panel abre el resumen ejecutivo con "los guardados casi se triplicaron (+187,5 %)" como primer
avance. Sobre los datos: **correlación guardados ↔ alcance = +0,04**. Cero.

No es una métrica inútil —para un restaurante, guardar es la señal de intención de visita más
limpia que da Instagram, y por eso vale la pena seguirla como proxy de reserva—. Pero **no
predice distribución** y no debe usarse para decidir qué contenido repetir. El panel construye
su puntuación dando a guardados un 18,75 % del peso; eso hace que el ranking premie contenido
que no crece.

### 6.3. Sobre la retención: el panel la sobrepondera, pero el problema es el contrario

El panel da un 25 % de la puntuación a la retención. En los datos, retención↔alcance = **−0,26**:
prácticamente nula, y el post nº 2 del trimestre tiene la peor retención del lote.

Sería tentador concluir "la retención no importa aquí". **Sería una conclusión equivocada**, y
conviene tenerlo claro antes de tocar nada: no hay correlación porque **no hay variación** —los
16 Reels están entre 57 % y 83 % de abandono, es decir, todos en la franja en la que Instagram
no empuja. No se puede medir el efecto de algo que nunca ha ocurrido en la muestra.

**Corrección:** la retención no sirve para *ordenar* estos 16 Reels entre sí, pero sí es la
puerta que ninguno ha cruzado todavía. Es condición necesaria y no suficiente. El objetivo no es
"mejorar la retención un poco", es **bajar de ~65 % de abandono al menos una vez** para ver por
primera vez qué hace el algoritmo cuando un Reel de esta cuenta sí retiene.

---

## 7. Qué hacer — separado por objetivo

Los tres objetivos del encargo no comparten palanca, y dos de ellos tiran en direcciones
opuestas. Conviene decidir cuál manda antes de repartir horas.

> **El conflicto, con números:** el Reel de la barbacoa —el mejor del trimestre en alcance— tiene
> el **peor like-rate de los 21 posts (1,25 %)**. Los tres mejores like-rates (5,18 %, 4,94 %,
> 4,51 %) son carruseles con alcance de 385–463. Es aritmética normal de redes: cuanto más lejos
> llega una pieza, más fría es la audiencia y menos porcentaje interactúa. **Optimizar el ratio
> de likes y optimizar el alcance son objetivos contrarios.**

### 7.1. Objetivo A — Más seguidores

La palanca es **alcance sobre no-seguidores**, hoy inexistente. Tres vías, por orden de coste:

1. **Publicaciones colaborativas** (la vía más rápida y gratis, y no aparece en el panel).
   Instagram reparte una publicación colaborativa a los seguidores de *ambas* cuentas. El
   cortador de jamón **@marcosmora_72** ya está en la bio y tiene cuenta propia: un Reel de oficio
   publicado en colaboración pone la pieza delante de una audiencia nueva sin gastar un euro.
   Extensible a productores (la bodega del Ossian, el proveedor del Caldelana) y a cuentas
   gastronómicas locales de Málaga.
2. **Diseñar una pieza al mes explícitamente para el reenvío** (ver 7.2). Los dos únicos posts
   que llegaron lejos lo hicieron por compartidos, y ese sigue siendo el único mecanismo
   demostrado en esta cuenta.
3. **Arreglar el perfil, que hoy es una fuga.** 5 taps de contacto en 90 días con el campo web
   vacío. Enlace de Google Maps o WhatsApp Business en la bio, horario visible, y las tres
   primeras publicaciones fijadas contando qué es la casa. Cuesta 15 minutos y afecta a cada
   visita de perfil que se genere de aquí en adelante.

**Expectativa realista:** al ritmo actual (1,53 altas/día, sin relación con lo publicado), la
cuenta llega a ~4.900 en un año. Duplicar esa velocidad exige que al menos una pieza al mes salga
de la burbuja; no se consigue publicando más de lo mismo.

### 7.2. Objetivo B — Reels más virales

Un solo objetivo medible: **bajar el abandono a 3 s de ~75 % a menos de 65 %**. Qué cambiar,
en concreto y en orden de impacto:

1. **Prohibido abrir con un plano bonito y quieto.** El segundo 1 de casi todos los Reels
   actuales es un bodegón: no hay nada en juego, no hay pregunta abierta, no hay movimiento
   humano. El primer fotograma debe tener **una mano en movimiento o una acción ya empezada** —
   la regla 6 de `reglas_videos.md` ya empuja hacia ahí, pero se está aplicando al conjunto del
   montaje, no al fotograma 1.
2. **Rótulo en pantalla desde el fotograma 1.** El mecanismo que la nota del 2026-09-08 en
   `CLAUDE.md` identificó en las plantillas descartadas (rotular el producto en pantalla) es
   exactamente esto, y sigue sin injertarse en ninguna pieza propia. La tipografía ya está
   aprobada y documentada.
3. **Menos cortes al principio, no más.** Nueve cortes de 1,2 s reparten la atención en vez de
   crear una. Un primer plano de 2–2,5 s con una acción reconocible retiene mejor que tres de
   0,8 s.
4. **Diseñar para el reenvío, no para el "me gusta".** Antes de producir, la pregunta de control
   es: *¿un vecino de Alhaurín le reenviaría esto a alguien?* Si la respuesta es no, la pieza va
   a quedarse en la banda de 600–900 de alcance haga lo que haga el montaje. Candidatos reales
   para el próximo trimestre: reapertura del 16 de septiembre, carta de otoño con fecha de
   entrada, feria local, menús de Navidad con fecha de apertura de reservas.

**Nota de coherencia con lo ya medido:** la memoria del proyecto recoge que el montaje no movía
el `hook_score` del Virality Predictor y que "el techo es el material". Los datos reales de
Instagram lo confirman y lo precisan: no es el montaje, es **el primer segundo y el motivo de
reenvío**. Ambos se deciden en el guion, antes de generar una sola imagen.

### 7.3. Objetivo C — Más likes

La respuesta es aburrida y es la correcta: **likes totales = alcance × like-rate**, y el
like-rate ya está donde debe (2–5 %, normal para el sector; no hay margen ahí). Así que la única
palanca real es el alcance total, y la forma más barata y fiable de subirlo no es creativa, es
de calendario.

- Hoy: **1,63 publicaciones/semana**, 77 % de días en silencio, huecos de hasta 10 días.
- A 3–4 publicaciones/semana, con la mediana de 417 de alcance por día con post, **los likes
  totales del trimestre se duplicarían sin cambiar nada del contenido**.
- Regla operativa: **ningún hueco mayor de 3 días**. Los dos valles de alcance más profundos del
  trimestre (19–22 jul y 25–28 jul) son exactamente los dos huecos largos sin publicar.

Esto choca con el coste de producción de Reels generados. La salida sensata: **no todo tiene que
ser un Reel producido**. Una foto real del pase del mediodía, hecha con el móvil y publicada el
martes, mantiene la cuenta viva y cuesta cero créditos. El presupuesto de generación se
concentra en la pieza fuerte de la semana.

---

## 8. Métricas de control para el próximo trimestre

Cinco, con umbral. Si una no se mueve en 8 semanas, se cambia la táctica que la persigue.

| Métrica | Hoy | Umbral objetivo | Qué valida |
|---|---|---|---|
| Frecuencia de publicación | 1,63 / semana | **≥ 3 / semana**, sin huecos > 3 días | Palanca de likes y alcance total |
| Abandono a 3 s (Reels) | mediana 75 % | **< 65 % en al menos 1 Reel/mes** | Puerta de la distribución |
| Share rate | mediana 0,22 % | **> 0,40 % en al menos 1 pieza/mes** | Único motor de alcance demostrado |
| Alcance de un Reel | máx. 2.954 | **> 4.349 (los seguidores) al menos 1 vez** | Primera salida real de la burbuja |
| Taps de contacto del perfil | 5 / 90 días | **> 15 / 90 días** | Que el perfil convierta |

Las que **no** conviene usar como KPI de crecimiento: guardados (correlación +0,04 con alcance)
y comentarios (−0,67). Seguirlos como señal de intención, sí; decidir el calendario con ellos, no.

---

## 9. Bloqueos y decisiones que necesitan al cliente

1. **Objetivo prioritario.** Seguidores, virales y likes no se optimizan juntos (punto 7). Si
   manda el alcance, hay que aceptar ratios de interacción más bajos; si mandan los likes, la
   palanca es frecuencia y no viralidad. **Decisión del cliente.**
2. **Material para subir a 3 publicaciones/semana.** Hace falta o bien fotos/vídeo de móvil del
   día a día del local, o bien más presupuesto de generación. Sin una de las dos, el objetivo de
   frecuencia no es ejecutable. **Decisión del cliente.**
3. **Colaboración con @marcosmora_72** (y, en su caso, con proveedores). Requiere su
   conformidad expresa; es persona real identificable. **Decisión del cliente.**
4. **Acceso al perfil de Instagram** para añadir enlace de Maps/WhatsApp en la bio y fijar
   publicaciones. **Pendiente de accesos.**
5. **Error de ficha en `CLAUDE.md`.** El fichero de proyecto describe el restaurante como
   *"restaurante de pueblo en El Mora (Cantabria)"*. Los datos de la cuenta y el informe
   [`03-colision-marca.md`](03-colision-marca.md) confirman que el restaurante está en
   **Barriada La Alquería, Alhaurín de la Torre (Málaga)**, y que "El Mora" es el sobrenombre de
   la casa; Cantabria viene de *otro* negocio homónimo (Torre de la Vega, en Comillas) detectado
   en el análisis de colisión de marca. **Conviene corregirlo antes del próximo lote de
   imágenes**: un pueblo cántabro y uno del Valle del Guadalhorce no se parecen en nada, y
   `CLAUDE.md` se carga en cada sesión. **Confirmar y corregir.**

---

## Anexo — Correlaciones calculadas (Spearman, sobre los 21 posts)

| Par | ρ | Lectura |
|---|---|---|
| Reproducciones ↔ alcance | +0,71 | Trivial (misma cosa medida dos veces) |
| Compartidos ↔ alcance | **+0,51** | El único motor de distribución identificable |
| Me gusta ↔ alcance | +0,52 | Causalidad inversa: más alcance ⇒ más likes |
| Guardados ↔ alcance | +0,04 | Nulo |
| Abandono 3 s ↔ alcance (16 Reels) | −0,26 | Débil, y sin variación útil en la muestra |
| Comentarios ↔ alcance | −0,67 | Ruido (10 comentarios en 90 días) |
| Alcance diario ↔ altas de seguidores (30 d) | +0,15 | Nulo: el crecimiento es ambiental |

*Cálculos sobre el JSON incrustado en el artifact; script reproducible en el scratchpad de la
sesión (`an.py`, `an2.py`, `an3.py`).*
