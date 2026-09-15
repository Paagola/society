# 10 — Bullet Time y secuencias largas de un solo plano (mega-prompt de continuidad)

> Origen: `Bullet Time AI Reel Prompt.pdf` (carpeta raíz de `directoria-cloud/`), un prompt de producción real para Higgsfield que genera un reel de **12 segundos, 9:16, un solo plano continuo**, con un accidente en bullet-time (tiempo casi congelado + cámara libre inspeccionando varios objetos) al estilo campaña de moda de lujo / videoclip premium.
>
> Este archivo no documenta "un prompt bonito de bullet-time": documenta el **patrón estructural reutilizable** detrás de él, para poder construir a futuro otras piezas largas, multi-fase y con muchos elementos que deben mantenerse consistentes — con o sin bullet-time — sin que el modelo pierda la identidad, duplique props o rompa la física.
>
> Léelo junto a:
> - `06-direccion-movimiento.md` — la biblia del restraint para clips cortos (4-6s, un solo beat). Este archivo es su contraparte para **piezas largas multi-beat** donde SÍ hay más de un evento, pero cada uno sigue estando calibrado con precisión.
> - `04-consistencia-personaje.md` — bloqueo de identidad facial con ref stack; aquí se extiende el mismo principio a **objetos/props**, no solo a caras.
> - `03-modelos-video.md` — qué modelo del MCP se ajusta a este tipo de pieza (ver §7 de este archivo; hay huecos por verificar).
> - `00-metodologia-promptdirector.md` — el porqué de la salida JSON+NL; este patrón es, en esencia, un JSON Decoded Brief llevado a su máxima extensión de rigor.
> - `11-fpv-camara-invisible-y-fuerza-compartida.md` — el contrato de física opuesto para plano largo continuo: aquí (world-space lock) solo se mueve la cámara; allí (fuerza compartida) todo el frame —objetos y cámara— obedece a la misma variable física a la vez. Úsalo cuando el plano sea una tormenta simultánea en vez de una inspección secuencial.

---

## 1. La idea central: World-Space Lock vs. cámara libre

Todo el prompt gira en torno a **una sola regla no negociable**, repetida de tres formas distintas a lo largo del documento porque es la que más se rompe si no se insiste:

> **Durante el tiempo congelado, los OBJETOS se quedan fijos en el espacio 3D de la escena (world space). La ÚNICA cosa que se mueve es la CÁMARA.**

Esto es lo opuesto al instinto por defecto del generador, que es "acercar el objeto a cámara" (como si fuera un zoom de producto flotando hacia el espectador) — eso lee como animación de anuncio barato, no como fotografía de alta velocidad real. La corrección explícita:

```text
The CAMERA physically approaches the objects.
The objects DO NOT fly toward the camera to create close-ups.
Never create a close-up by moving the object toward the lens.
Never enlarge the object artificially.
Never teleport an object to the camera.
```

**Por qué funciona:** es la misma lógica anti-CGI de `05-biblia-hiperrealismo.md` (cámara real limitada por física = lo que el ojo reconoce como real) aplicada al movimiento de cámara en vez de al grano de la imagen. Una cámara de verdad no puede "atraer" un objeto hacia el lente; solo puede desplazarse ella misma. Nombrar esto una vez no basta — el prompt lo repite en tres bloques distintos (concepto maestro, ruta de cámara, regla de causalidof) precisamente porque es el punto donde más se rompe la ilusión.

**Aplicación general (más allá del bullet-time):** cualquier vez que quieras una secuencia de "inspección" de varios objetos en un plano continuo (un flat-lay que cobra vida, un unboxing cinematográfico, un recorrido por una mesa puesta), esta misma regla aplica: la cámara viaja, los objetos no vuelan hacia ella.

---

## 2. Anatomía completa del mega-prompt, bloque a bloque

El prompt no es un párrafo: es una secuencia de **bloques con nombre** (`# TITULO`), cada uno resolviendo un fallo específico que el modelo comete si no se le blinda explícitamente. Esta es la plantilla, en el orden en que aparece, con el propósito de cada bloque:

### 2.1 Bloque de referencias con ROL explícito y qué NO copiar

Cada `reference imageN` lleva: (a) qué preservar exactamente, (b) qué específicamente NO reproducir de esa referencia. Esto extiende la regla de tokens `@imageN` de `00-metodologia-promptdirector.md` añadiendo la mitad que suele faltar: **la exclusión explícita**.

| Ref | Rol | Preservar | NO reproducir |
|---|---|---|---|
| image1 | Personaje principal | identidad facial, pelo, cuerpo, ropa, calzado, joyas | el fondo original de esa foto |
| image2 | Entorno (solo inspiración) | lenguaje visual, arquitectura, luz, materiales | la composición/ángulo/calle exactos — hay que inventar un espacio nuevo creíble con espacio para la acción |
| image3 | Objeto hero (wearable) | forma, proporciones, materiales, construcción, color, detalles de superficie | — (aquí sí se exige fidelidad 1:1 completa) |
| image4 | Bebida/contenedor | forma del envase, proporciones, material, etiquetado/marca, tapa, color | — (fidelidad 1:1 completa) |

**Patrón generalizable:** cuando una ref es de **identidad/producto** (algo que debe reconocerse), exige fidelidad 1:1 total. Cuando una ref es de **entorno/mood**, dile explícitamente que la use solo como inspiración y que NO copie su composición exacta — si no, el modelo tiende a clonar literalmente el encuadre de la foto de referencia en vez de construir una escena nueva con espacio para la acción.

> Nota: a diferencia de la regla general del paquete ("máximo útil 3-4 refs, `nano_banana_pro`"), este prompt usa 4 refs con roles muy diferenciados (personaje / entorno / producto / bebida) — encaja justo en el límite recomendado. No es una excepción a la regla, es un ejemplo de cómo repartir el presupuesto de refs entre roles distintos sin diluir ninguno.

### 2.2 MASTER VISUAL CONCEPT

Una sola frase con **todo lo que define el formato de la pieza**: duración exacta, aspect ratio, nivel de producción (con qué se compara: "campaña de moda de lujo", "videoclip premium"), y el concepto central en una frase. Cierra con la mecánica física central del concepto (aquí: impulsos de liberación realistas → tiempo al 2-3% de velocidad).

```text
Generate one continuous 12-second, 9:16, ultra-photorealistic LIVE-ACTION luxury fashion film.
The result feels like a high-budget international fashion campaign or premium cinematic
music video photographed with real actors, practical physical props, premium cinema
lenses and real high-speed photography.
```

**Patrón generalizable:** siempre abre la pieza larga con esta frase-ancla de formato + nivel de producción + comparación con un referente real conocido (campaña, videoclip, anuncio). Es el equivalente, a escala de pieza completa, de la coda fotográfica de un still.

### 2.3 EXACT OBJECT COUNT

Una lista literal de "Exactly ONE X" por cada entidad relevante (personas, animales, props). Este bloque existe únicamente para combatir un fallo muy concreto y muy común en generación larga: **duplicación de props/personas** cuando el modelo pierde la cuenta a mitad de secuencia (dos móviles, dos perros, un segundo personaje que aparece sin motivo).

```text
Exactly ONE protagonist.
Exactly ONE secondary passing person.
Exactly ONE Labrador.
...
No duplicate props appear at any point.
```

**Patrón generalizable:** en cualquier pieza con más de 2-3 entidades en escena, añade este bloque. Cuanto más larga la pieza y más objetos "viajan" por el encuadre, más falta hace.

### 2.4 Bloques PERSISTENT PROP — bloqueo de apariencia por objeto crítico

Por cada prop que debe sobrevivir a todo el plano (aquí: el iPhone y la bebida), un bloque dedicado que:
1. Describe la apariencia física exacta y granular (color, material, geometría, estado de pantalla...).
2. Ordena explícitamente **LOCK** de esa apariencia durante cada fase nombrada de la secuencia (plano general → colisión → liberación → inspección macro → caída → impacto).
3. Cierra con la frase clave: **"Wide shot -> medium shot -> macro shot = THE SAME [prop] VIEWED FROM DIFFERENT CAMERA DISTANCES. Do not reinterpret or redesign [el prop] when camera distance changes."**

**Por qué hace falta:** es el fallo equivalente, a nivel de objeto, al "face drift" de `04-consistencia-personaje.md` — cuando la cámara se acerca mucho a un objeto (macro), el modelo tiende a "redibujarlo" como si generase un producto nuevo en vez de acercarse al mismo. Nombrar cada fase por la que pasa el MISMO objeto físico fuerza continuidad.

**Patrón generalizable:** cualquier prop que aparezca tanto en plano general como en primer plano/macro dentro de la misma pieza necesita su propio bloque de "persistent prop" con este mismo cierre de frase.

### 2.5 HAND OWNERSHIP / OBJECT OWNERSHIP LOCK — estado antes/después

Define explícitamente qué mano sostiene qué objeto **antes** del evento clave, y el estado exacto **después** (aquí: ambas manos completamente vacías, nada las reemplaza). Este bloque se repite dos veces en el documento (una vez centrado en las manos, otra como resumen final de todos los objetos) porque es el punto donde el modelo más improvisa: rellenar una mano vacía con un objeto nuevo, o dejar que un prop "sobreviva" pegado a la mano cuando debería haberse soltado.

```text
Before collision: RIGHT HAND = phone. LEFT HAND = drink.
After collision: RIGHT HAND = EMPTY. LEFT HAND = EMPTY.
No prop appearing inside an empty hand.
```

**Patrón generalizable:** en cualquier secuencia donde un personaje suelta, recoge o intercambia objetos, define el estado de cada "punto de sujeción" (manos, hombro, boca del perro, etc.) en cada fase clave — no asumas que el modelo va a inferir correctamente que una mano se queda vacía.

### 2.6 Beats con timestamps — estructura de fases, no de gestos sueltos

A diferencia del motion prompt corto de `06-direccion-movimiento.md` (un solo beat principal en 4-6s), aquí son **7 fases con nombre y ventana de tiempo**, cada una con un objetivo narrativo/técnico propio:

| Ventana | Fase | Qué resuelve |
|---|---|---|
| 0.0–2.0s | Reveal cinematográfico del personaje | dar tiempo a reconocer identidad antes de la acción |
| 2.0–3.7s | Caminar por el entorno | establece el mundo y presenta a los elementos secundarios (persona + perro) |
| 3.7–4.4s | Colisión accidental | el evento causal único que dispara TODO lo demás |
| 4.4–5.2s | Establecer el mundo congelado (plano general primero) | evita saltar a macro sin que el espectador entienda la geometría espacial |
| 5.2–9.8s | Inspección secuencial objeto por objeto (hero object → bebida → móvil) | la cámara visita cada "ancla de world-space" una por una, nunca simultáneo |
| 9.8–10.4s | Reconstrucción del tableau completo | recuerda al espectador (y al modelo) que todos los objetos siguen en su sitio |
| 10.4–12.0s | Payoff físico: el tiempo vuelve, cae todo | resolución con causalidad física explícita |

**Patrón generalizable — "camera route" explícita como su propio bloque:** además de los beats narrativos, el prompt añade un bloque **aparte** solo con la ruta de cámara en formato de diagrama de flechas:

```text
FULL FROZEN TABLEAU
-> CAMERA DOLLIES TO reference image 3 HERO OBJECT
-> HOLD
-> SMALL 20-30 degree CAMERA ORBIT
-> CAMERA TRAVELS TO reference image 4 DRINK
-> HOLD
-> SMALL CAMERA PARALLAX
-> CAMERA TRAVELS TO IPHONE 17
-> ESTABLISH COMPLETE PHONE -> MOVE CLOSER TO DISPLAY -> HOLD
-> CAMERA DOLLIES BACK TO COMPLETE TABLEAU
-> TIME RETURNS.
```

Esto es nuevo respecto a `06-direccion-movimiento.md`: en un clip corto de restraint, el movimiento de cámara es una frase. En una pieza larga multi-objeto, conviene **separar la coreografía de cámara en su propio bloque explícito**, independiente de la narrativa de beats, para que quede clarísimo el orden de visitas y que nunca hay dos focos de atención a la vez ("Complete the inspection before moving to the next object").

### 2.7 PHYSICAL CAUSALITY RULE

Una lista de "esto pasa PORQUE esto otro pasó", encadenando cada cambio visual a una causa física explícita:

```text
The protagonist recoils because of the elbow contact.
The HERO OBJECT moves because collision momentum separates it.
...
Nothing transforms simply because the camera gets closer.
```

**Por qué importa:** esto es la versión extendida, para piezas largas, del principio de `06-direccion-movimiento.md` §2 ("si algo se mueve, algo o alguien lo mueve"). En un clip de 4-6s con un beat, basta con evitar gimmicks. En una pieza de 12s con una cadena de eventos físicos (colisión → impulso → rotación → apertura de tapa → fuga de líquido → caída), hay que **enumerar la cadena causal completa** o el modelo rellena huecos con magia (el líquido "simplemente" sale, la tapa "simplemente" desaparece).

### 2.8 IDENTITY PRIORITY — orden de sacrificio si algo falla

Una lista numerada de qué proteger primero si el modelo tiene que ceder en algo (1. identidad facial, 2. ojos, 3. pelo... hasta 10. trayectorias continuas). Es un recurso nuevo: no pretende que todo salga perfecto, sino decirle al modelo **qué es lo último que puede sacrificar** si hay tensión entre reglas.

**Patrón generalizable:** en cualquier prompt con muchas restricciones simultáneas (identidad + varios props + física), añadir esta lista de prioridad ayuda cuando el modelo no puede cumplir el 100% de todo a la vez.

### 2.9 Coda de realismo fotográfico final

Cierra igual que cualquier brief del paquete (`05-biblia-hiperrealismo.md`): cámara real (ARRI Alexa 35), óptica premium, grano 35mm, grading editorial contenido, y la frase explícita **"NOT CGI product animation"** — la negación directa de la trampa que todo el prompt existe para evitar.

---

## 3. Por qué este patrón es distinto del restraint de `06-direccion-movimiento.md` (y cuándo usar cada uno)

`06-direccion-movimiento.md` predica **un solo beat por clip corto**. Este patrón tiene **siete fases y un evento causal en cadena** en 12 segundos. No se contradicen: son dos escalas del mismo principio.

| | Clip corto (06) | Pieza larga tipo bullet-time (10, este archivo) |
|---|---|---|
| Duración | 4-6s | 8-15s+ |
| Nº de beats | 1 principal (+ atmósfera) | Varios, pero cada uno con una única causa física clara |
| Objetos en escena | Normalmente 1 sujeto | Varios props + personas, cada uno con bloqueo propio |
| Riesgo principal | Exceso de movimiento ("fantasía Marvel") | Duplicación de objetos / pérdida de continuidad / objeto que "vuela" a cámara |
| Herramienta de control | Lista negra de gimmicks + un beat | Object count + persistent prop locks + camera route separada + regla de causalidad en cadena |

**Regla de decisión:** si la pieza cabe en un solo gesto, usa `06`. Si la pieza necesita **varios objetos/personas que deben sobrevivir con continuidad a través de multiple fases y distancias de cámara**, usa la disciplina de este archivo — aunque el resultado final no sea bullet-time, aunque no haya "tiempo congelado" literal (un unboxing largo, un recorrido de producto, un before/after con varios props en juego se benefician igual).

---

## 4. Plantilla en blanco reutilizable

```text
reference image 1 = [ROL]. Preservar: [...]. NO reproducir: [...].
---
reference image 2 = [ROL]. Preservar: [...]. NO reproducir: [...].
---
[una ref por cada entidad crítica, mismo patrón]

# MASTER VISUAL CONCEPT
Generate one continuous [N]-second, [aspect_ratio], ultra-photorealistic LIVE-ACTION [género] film.
Comparación de nivel de producción con un referente real conocido.
[Mecánica física central del concepto en una frase.]

# EXACT OBJECT COUNT
Exactly ONE [entidad A].
Exactly ONE [entidad B].
...
No duplicate props appear at any point.

# PERSISTENT PROP - [nombre del prop] - CRITICAL
[Descripción física granular y estable.]
LOCK its physical appearance throughout: [lista de fases nombradas].
Wide shot -> medium shot -> macro shot = THE SAME [prop] VIEWED FROM DIFFERENT
CAMERA DISTANCES. Do not reinterpret or redesign it when camera distance changes.
[repetir un bloque por cada prop crítico]

# [OWNERSHIP LOCK relevante al concepto: manos, sujeciones, posiciones]
Before [evento clave]: [estado A] = [prop].
After [evento clave]: [estado A] = EMPTY / [nuevo estado].
No prop appearing where it shouldn't. No duplication.

# [BEAT 1 — nombre, ventana de tiempo]
[Qué pasa, qué resuelve narrativa/técnicamente.]
# [BEAT 2 — nombre, ventana de tiempo]
...
# [BEAT N — payoff/cierre, ventana de tiempo]

# NON-NEGOTIABLE CAMERA RULE (si aplica el patrón "mundo casi fijo + cámara libre")
OBJECTS STAY IN WORLD SPACE. CAMERA MOVES THROUGH WORLD SPACE.
Close-up is created by REDUCING CAMERA-TO-OBJECT DISTANCE, never by moving
the object toward the lens.
STRICT CAMERA ROUTE: [diagrama de flechas de la ruta completa].

# PHYSICAL CAUSALITY RULE
[Cada cambio visible <- su causa física explícita, encadenado.]
Nothing transforms simply because the camera gets closer.

# OBJECT OWNERSHIP LOCK (resumen final)
[Repetir el recuento de la sección de object count + el estado antes/después.]

# IDENTITY PRIORITY
1. [lo más crítico a proteger]
...
N. [lo último que se puede sacrificar si hay tensión entre reglas]

# PHOTOGRAPHIC REALISM
[Coda estándar de 05-biblia-hiperrealismo.md: cámara real, óptica, grano, grading,
cierre explícito "NOT CGI [lo que sea]".]
```

---

## 5. Aplicación práctica en el MCP de Higgsfield — huecos por verificar

Antes de lanzar una pieza con este patrón por el MCP, ten en cuenta lo que **no está confirmado** en el resto de la documentación de este paquete:

- **Duración de 12s con 4 refs de imagen simultáneas en vídeo**: los modelos documentados en `03-modelos-video.md`/`01-higgsfield-mcp.md` (`kling3_0`, `seedance_2_0`, `wan2_7`) toman un único `medias[].role:"start_image"` (+ audio en `wan2_7`), no cuatro referencias de imagen distintas a la vez. Un prompt como este, con 4 `reference imageN` inyectadas directamente en un generador de vídeo, probablemente corresponde a una **app/preset específico de Higgsfield** (posiblemente algo del catálogo de `get_workflow_instructions` o `apps_search`/`apps_invoke`) y no a una llamada cruda de `generate_video`. **(verificar)** antes de asumir que se puede pegar tal cual en `generate_video`.
- **Duración por defecto de los modelos de vídeo del MCP**: no está documentada en este paquete una duración de 12s para `kling3_0` ni `seedance_2_0`. Si el objetivo es reproducir esta pieza exacta por MCP, primero consulta `get_workflow_instructions` (sin argumento, para ver el catálogo) y `models_explore(action:'recommend')` para confirmar qué modelo/app soporta multi-ref + 12s antes de construir el brief final.
- Si el modelo real resulta ser de movimiento complejo con cámara viajando entre varios puntos del espacio (que es exactamente lo que pide este patrón), lo más probable por lo ya documentado es que cualquier variante ejecutable por `generate_video` caiga del lado de **`seedance_2_0`** (dolly/parallax/multi-elemento), nunca `kling3_0` (movimiento contenido) — ver tabla de selección en `03-modelos-video.md` §4.
- Independientemente del binding exacto a una tool del MCP, **la disciplina de prompt de este archivo (bloques, locks, causalidad, ruta de cámara separada) es válida y reutilizable ya mismo** como método de escritura del brief, tanto si se lanza por MCP como si se entrega para pegar en la web de Higgsfield.

---

## 6. Checklist rápido antes de escribir una pieza larga con este patrón

- [ ] ¿Cada ref crítica tiene rol explícito + qué preservar + qué NO copiar (§2.1)?
- [ ] ¿Hay un bloque `EXACT OBJECT COUNT` con "Exactly ONE" por cada entidad relevante?
- [ ] ¿Cada prop que aparece tanto en plano general como en macro tiene su propio bloque `PERSISTENT PROP` con el cierre "same X viewed from different camera distances"?
- [ ] ¿Está definido el estado antes/después de cada punto de sujeción (manos, etc.) en el evento clave?
- [ ] ¿Los beats están nombrados por fase con ventana de tiempo, no como una frase única?
- [ ] Si hay inspección de varios objetos: ¿hay una ruta de cámara separada, explícita, en formato de flechas, y se completa una inspección antes de pasar a la siguiente?
- [ ] ¿Hay una regla de causalidad física que encadene cada cambio visible a su causa?
- [ ] ¿Hay una lista de prioridad de identidad/continuidad por si el modelo tiene que ceder en algo?
- [ ] ¿Cierra con la coda de realismo fotográfico + negación explícita de CGI/animación de producto?
- [ ] ¿Se ha verificado qué modelo/app del MCP soporta realmente la duración y el número de refs objetivo (§5), en vez de asumir `generate_video` estándar?
