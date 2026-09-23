<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Reel 03 «Lo hacemos, lo disfrutas» — todo lo necesario para publicar

**Fecha:** 2026-09-09
**Fichero:** `visible_cliente/reel_03_lo-hacemos-lo-disfrutas.mp4` (recurso no incluido: `../visible_cliente/reel_03_lo-hacemos-lo-disfrutas.mp4`)
**Guion y montaje:** [`reel_03_lo-hacemos-lo-disfrutas.md`](reel_03_lo-hacemos-lo-disfrutas.md)
**Base de las decisiones:** [`informes/2026-09-08_analisis-instagram-90dias.md`](../05-informes-medidos/2026-09-08_analisis-instagram-90dias.md)

---

## 0. Dos cosas que hay que resolver antes de subirlo

### 0.1. ⚠️ La ubicación estaba mal en `CLAUDE.md` — corregido

`CLAUDE.md` decía "restaurante de pueblo en **El Mora (Cantabria)**". **Es falso.** "El Mora" es
parte del nombre comercial (*Restaurante Torre de Vega "El Mora"*), no el municipio. El NAP
verificado en `informes/04-consistencia-nap.md` (recurso no incluido: `../informes/04-consistencia-nap.md`) contra la web
oficial es:

- **Plaza Santa Ana, 8 · Barriada La Alquería · Alhaurín de la Torre · 29130 · Málaga**
- **952 410 269** (fijo) · **633 027 294** (móvil/WhatsApp)

Esto importa aquí más que en ningún sitio: **los hashtags y la etiqueta de ubicación son geografía
pura.** Un lote de hashtags de Cantabria habría enviado la pieza a una audiencia a 900 km del local.
Ya está corregida la línea en `CLAUDE.md`.

*(Nota menor: los prompts de las dos historias generadas esta mañana decían "El Mora, Cantabria" en
el campo `subject_identity`. No se ve en el resultado —las imágenes las gobiernan las fotos reales—
pero si se regeneran, hay que corregir ese texto.)*

### 0.2. ⚠️ El vídeo lleva pista de audio audible

El guion dice que va sin audio, pero el render **sí trae sonido**: nivel medio −30 dB con picos de
−1,6 dB a lo largo de los 10 segundos. Es el sonido original de los clips de parrilla.

**No es un problema, es una oportunidad, pero hay que decidir:**

- **Opción A (recomendada):** dejar el sonido original de la brasa **por debajo** de un audio de
  tendencia. El chisporroteo real es exactamente el tipo de sonido que sostiene un vídeo de asador,
  y en Instagram se mezcla con el control de volumen de la pista original.
- **Opción B:** silenciar el original y dejar solo la música. Se pierde el chisporroteo.

Lo que **no** hay que hacer es subirlo sin mirar el mezclador y que la música quede peleando con el
audio original a volumen completo.

---

## 1. Ficha técnica (verificada con `ffprobe`)

| Parámetro | Valor | ¿Cumple? |
|---|---|---|
| Resolución | **1080 × 1920** | ✅ 1080p, el mínimo innegociable |
| Relación de aspecto | 9:16 | ✅ |
| Duración | 10,0 s | ✅ |
| Fotogramas por segundo | 30 | ✅ |
| Códec / bitrate | H.264, yuv420p, 15,4 Mbps | ✅ muy por encima de lo que pide Instagram |
| Audio | AAC, presente y audible | ⚠️ ver 0.2 |
| Tamaño | 19,2 MB | ✅ |

No hay que reexportar nada. Sube tal cual.

---

## 2. Cuándo publicarlo

**Se publica ahora, como cuenta atrás.** Hoy es **miércoles 9 de septiembre** y la reapertura es el
**miércoles 16**: exactamente una semana, lo que hace que la cuenta atrás se escriba sola.

El pie de la sección 3 está escrito para eso. Lleva la fecha de reapertura en la segunda línea, que
es lo que importa: los dos únicos posts que se salieron de la burbuja en 90 días (2.954 y 1.938 de
alcance) comparten un mecanismo que no es visual, **novedad concreta + fecha + beneficio local**, y
es lo que hace que un vecino lo reenvíe por WhatsApp. Un chuletón sin fecha se queda en la banda de
645 de alcance de los 11 posts de producto genérico; con la fecha del 16 delante, es un aviso.

**Hora sugerida:** 13:00–15:30, la franja en la que la gente decide dónde come.

**Lo que queda pendiente para el 16:** el plan de contenido reserva una pieza para el día de la
reapertura. Si este Reel se gasta hoy, ese día se cubre con las dos historias ya generadas
(`historia_01_volvemos_el_16` sirve tal cual) más una foto real del primer servicio, que es material
de coste cero y además llega fresco.

---

## 3. El pie de publicación

### 3a. Para publicar hoy, miércoles 9

```
Una semana.

El miércoles 16 de septiembre volvemos a encender la parrilla, después de
dos semanas cerrados.

Chuletón a la brasa, cortado y servido como lo hacemos desde hace casi 50
años. Y para acompañarlo, Cillar de Silos, Ribera del Duero.

Lo hacemos nosotros. Lo disfrutas tú.

📍 Plaza Santa Ana 8 · La Alquería, Alhaurín de la Torre
📞 Reservas por WhatsApp: 633 027 294

¿Con qué vas a empezar tú? Dilo aquí abajo 👇
```

**«Una semana.» como primera línea** no es un adorno: Instagram corta el pie a las ~125 primeras
letras, y lo único que se lee sin tocar "más" tiene que ser la cuenta atrás.

**Por qué está escrito así, línea por línea:**

- **«Volvemos hoy» como primera línea.** Instagram corta el pie a las ~125 primeras letras. Lo único
  que se lee sin tocar "más" tiene que ser el aviso, no la poesía.
- **La fecha escrita con todas las letras.** Es la mitad del patrón que hizo viajar los dos mejores
  posts. Sin fecha, no hay motivo de reenvío.
- **«Cillar de Silos, Ribera del Duero» con nombre y apellido.** El carrusel del Caldelana Gallega
  generó **17 visitas al perfil, el récord del trimestre**, con solo 455 de alcance. La
  especificidad da curiosidad; "vinos de calidad" no da nada. Es la palanca más barata que existe
  en este pie.
- **Dirección y teléfono en el pie, no solo en la bio.** El perfil solo generó **5 taps de contacto
  en 90 días** con el campo web vacío. Mientras eso no se arregle, el pie es la única vía de
  contacto que ve la gente.
- **Pregunta al final.** 71 % de los posts del trimestre tienen cero comentarios. La pregunta no
  sube el alcance (la correlación comentarios↔alcance es negativa), pero sí calienta a la audiencia
  propia y alimenta la historia de "¿qué vas a pedir?" que ya está generada.

### 3b. Variante corta, si se prefiere un pie más seco

```
El miércoles 16 volvemos a encender la parrilla.

Chuletón a la brasa, como lo hacemos desde hace casi 50 años. Y Cillar de
Silos, Ribera del Duero, para acompañarlo.

📍 Plaza Santa Ana 8 · La Alquería, Alhaurín de la Torre
📞 Reservas por WhatsApp: 633 027 294

¿Con qué vas a empezar tú? 👇
```

### 3c. Si se decidiera guardarlo para el día 16

Cambiar las dos primeras líneas por: *«Volvemos hoy. Dos semanas con la parrilla apagada se hacen
largas; desde hoy, 16 de septiembre, vuelve a estar encendida.»* y la pregunta final por *«¿Con qué
vuelves tú?»*. El resto del pie y los hashtags valen igual.

### 3c. Lo que se ha evitado a propósito

- **«¡AVISO!»** — el informe lo señala como gancho ya gastado sin aviso real detrás. Aquí sí hay
  aviso, así que no hace falta gritarlo.
- **«El secreto es la calidad de nuestras carnes»** y variantes. Es literalmente uno de los captions
  intercambiables que ocupan la mitad del calendario y no mueven ninguna métrica.
- **Emojis de fuego y carne repartidos por el texto.** Solo los dos de utilidad (📍📞) y el 👇 de la
  llamada a comentar.

---

## 4. Hashtags

**Van en el primer comentario, no en el pie.** Mantiene el pie legible y funciona igual para el
alcance.

### Lote recomendado (11)

```
#alhaurindelatorre #alhaurin #malaga #malagagastronomia #costadelsol
#asador #chuleton #carnealabrasa #parrilla #restaurantemalaga #torredevega
```

### Por qué estos y no otros

| Grupo | Cuáles | Función |
|---|---|---|
| **Locales (5)** | `#alhaurindelatorre` `#alhaurin` `#malaga` `#malagagastronomia` `#costadelsol` | **Los únicos que pueden funcionar de verdad.** Son bolsas pequeñas donde un negocio local puede aparecer en "recientes" y donde la gente que busca sí puede venir a comer |
| **Categoría (5)** | `#asador` `#chuleton` `#carnealabrasa` `#parrilla` `#restaurantemalaga` | Le dicen a Instagram de qué va la pieza. `#restaurantemalaga` es el que más papeletas tiene de traer a alguien nuevo |
| **Marca (1)** | `#torredevega` | Archivo propio. No trae alcance, ordena el histórico |

**Lo que se ha dejado fuera a propósito:** `#food`, `#foodporn`, `#instafood`, `#carne`,
`#gastronomia` a secas. Son bolsas de decenas de millones de publicaciones donde una cuenta de 4.349
seguidores no aparece nunca; solo diluyen la señal de tema. Con hashtags no se sale de la burbuja —
eso solo lo han hecho los compartidos (correlación +0,51 con el alcance, frente a +0,04 de los
guardados).

---

## 5. Configuración de publicación, campo por campo

| Ajuste | Qué poner | Por qué |
|---|---|---|
| **Portada** | Fotograma de **~1,2 s** (la llamarada, con el rótulo `LO HACEMOS` ya en pantalla) | Es el fotograma con más contraste y movimiento del vídeo. En la cuadrícula del perfil se lee como "asador" a tamaño diminuto, que es lo que tiene que comunicar |
| **Ubicación** | **Alhaurín de la Torre** (o la ficha del propio restaurante si aparece) | Es la palanca de alcance local gratuita más directa. Nunca dejarla vacía |
| **Audio** | Audio de tendencia **de la biblioteca de Instagram**, con el volumen del original bajado pero audible (ver 0.2) | La música de la biblioteca es la que el algoritmo distribuye. Un audio de fuera no entra en las páginas de audio |
| **Compartir en Feed** | **Sí** | Sin esto el Reel no aparece en la cuadrícula del perfil |
| **Permitir remezclas** | **Sí** | Es superficie de alcance extra y no tiene coste |
| **Etiquetar personas** | Al camarero que sale, **si él quiere** | Sale de espaldas y sin cara, pero es un empleado real identificable por el polo. Preguntar antes |
| **Colaboración** | **No en esta pieza** | La colaboración con **@marcosmora_72** es la vía más rápida para llegar a audiencia ajena, pero corresponde al Reel del corte de jamón, no a este. Forzarla aquí no encaja |
| **Texto alternativo** | *"Chuletón a la brasa haciéndose en la parrilla y servido en el comedor del restaurante."* | Accesibilidad, y da a Instagram texto sobre el que clasificar |
| **Programación** | Publicar a mano, no programado | La pieza es un aviso de reapertura: si el 16 pasa algo, hay que poder pararla |

---

## 5bis. Reels de prueba (*trial reels*) — cuándo sí y cuándo no

**Qué son:** un Reel de prueba se muestra **solo a quien no sigue la cuenta**. Los seguidores no lo
ven, no aparece en la cuadrícula del perfil, y a las ~24 h Instagram devuelve las métricas para
decidir si se comparte con todo el mundo.

**⚠️ Incidente 2026-09-09:** este Reel se subió como Reel de prueba. **Es la opción equivocada para
esta pieza** y se corrigió compartiéndolo con todo el mundo sin esperar las 24 h.

**El criterio, para no repetirlo:**

| Tipo de pieza | ¿Reel de prueba? | Por qué |
|---|---|---|
| **Aviso con fecha** (reapertura, carta de otoño, Navidad, feria) | **No** | El motor es el reenvío, y quien reenvía es la clientela fiel. Un Reel de prueba deja fuera justo a esa gente, y además esconde el aviso 24 h de las que quedan hasta la fecha |
| **Producto genérico** (carne, jamón, un plato sin novedad detrás) | **Sí, es el uso ideal** | Son el 52 % de lo publicado y promedian 645 de alcance sin mover nada. No dependen del reenvío, y el formato los pone delante de no seguidores — la audiencia que esta cuenta no ha alcanzado ni una vez en 90 días. Coste cero y no ensucia el perfil si falla |
| **Publicación colaborativa** (p. ej. con `@marcosmora_72`) | **No** | La colaboración reparte a los seguidores de ambas cuentas; el modo prueba anula precisamente eso |

**Al leer los resultados:** las métricas de un Reel de prueba son **solo de no seguidores**. No se
pueden comparar con el histórico del informe de 90 días, que es casi todo alcance entre seguidores.
Sirven para comparar pruebas entre sí, no contra publicaciones normales.

---

## 6. Qué hacer en la hora siguiente a publicarlo (esto sí mueve el alcance)

Los primeros 60–90 minutos deciden el reparto. Cuesta cero:

1. **Subir la historia con el Reel compartido** en cuanto se publique, con el sticker de "Ver Reel".
   Es el empujón más barato que existe y en esta cuenta no se está usando.
2. **Enviarlo por WhatsApp** a la lista de clientes habituales, a la familia y al equipo. Los
   compartidos son el **único motor de alcance demostrado** en esta cuenta, y no hay ninguna regla
   que diga que tienen que ser espontáneos.
3. **Contestar todos los comentarios** en la primera hora, con una frase de verdad, no con un emoji.
4. **Fijar el Reel en el perfil** durante la semana de la reapertura.

---

## 7. Cómo saber si ha funcionado — cuatro números, a los 7 días

| Métrica | Dónde mirarla | Umbral de éxito | Qué significaría |
|---|---|---|---|
| **Abandono a 3 s** | Estadísticas del Reel | **< 65 %** | Que el arranque en llamas funciona. Hoy la mediana de la cuenta es 75 %, y ningún Reel ha bajado de 56,8 % |
| **Share rate** | Compartidos ÷ alcance | **> 0,40 %** | Que el mecanismo "aviso + fecha" ha vuelto a funcionar. Mediana actual: 0,22 % |
| **Alcance** | Estadísticas del Reel | **> 4.349** | La primera salida real de la burbuja de seguidores en 90 días |
| **Visitas al perfil** | Estadísticas del Reel | **> 17** | Que nombrar el Cillar de Silos hace lo mismo que hizo nombrar el Caldelana |

Si el abandono a 3 s baja de 65 % **y** el alcance se queda corto, el problema es el motivo de
reenvío, no el montaje. Si el abandono sigue en 75 %, es el primer segundo. Los dos números
separados dicen exactamente dónde tocar la próxima vez.

---

## 8. Bloqueos y decisiones del cliente

1. **Pieza del 16** — este Reel se publica hoy como cuenta atrás, así que el día de la reapertura
   hay que cubrirlo con la historia ya generada más una foto real del primer servicio. No requiere
   créditos, pero sí que alguien haga la foto ese día.
2. **Audio** — mezclar el sonido de brasa bajo la música, o silenciarlo (sección 0.2).
3. **Etiquetar al camarero** — hace falta su permiso.
4. **Hora de apertura del 16** — el pie no la menciona porque **no hay horario verificado**: ni la
   web oficial ni la ficha de Google publican tabla de horarios
   (`informes/01-expediente-digital.md` (recurso no incluido: `../informes/01-expediente-digital.md`)). Si el cliente
   confirma la hora, añadir "desde las HH:00" a la segunda línea; mejora el pie.
5. **El campo web del perfil sigue vacío** — 15 minutos de trabajo que afectan a cada visita de
   perfil que genere este Reel. No bloquea la publicación, pero publicar sin arreglarlo es tirar
   parte del resultado.
