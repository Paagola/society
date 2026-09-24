# 04 · La lista de planos como contrato

La lista de planos es el documento que conecta estrategia, prompts, generación y montaje. Combina la ficha de 14 campos de smixs (CC BY 4.0), el *shotlist* conectado de OSideMedia (MIT, basado en el *shotlist-builder* oficial de Higgsfield) y el contrato de plano de Torre de Vega.

## Índice

1. Estructura del documento
2. Prefijo de estilo global
3. Glosario de recursos
4. Ficha de plano
5. Del guion a la lista: tres capas
6. Densidad: cuántos planos por generación
7. Presupuesto de tempo
8. Continuidad entre planos y clips
9. Formato de entrega

---

## 1. Estructura del documento

Tres capas, de arriba abajo (OSideMedia `higgsfield-shotlist-director`):

1. **Prefijo de estilo global:** se escribe una vez y se aplica a todos los prompts.
2. **Glosario de recursos:** reparto, platos, props y lugares declarados una vez con un nombre estable.
3. **Planos numerados** (`1`, `2`, `3a`, `3b`…), cada uno con su ficha y su prompt.

**Editar una vez se propaga a todo:** si cambia el prefijo, cambia en todos los prompts. Una escena puede tener una **excepción local** (p. ej. la terraza a pleno sol) sin tocar el prefijo global.

## 2. Prefijo de estilo global

Bloque que fija el aspecto de toda la pieza: formato y resolución, doctrina de luz, reparto de color, óptica y obturación, realismo, registro de actuación, física, composición, continuidad, fotogramas por segundo y audio. En Society se construye desde la ficha del cliente y la skill `directoria`:

```text
Vertical 9:16, 1080p. Real restaurant in [town]; nothing invented beyond @Room.
Light: neutral window daylight around 5000K; warm tones only from visible sources (the grill, a candle).
Lens: 85mm for dishes (f/4), 35mm for the room. Motorised slider moves only, constant speed, no handheld.
Food keeps the exact texture of the reference photos in every frame. Real-time, no slow motion unless stated.
Pure video, no subtitles, no background music.
```

## 3. Glosario de recursos

Cada elemento recurrente con un `@nombre` estable, su **rol** y su **grado de fidelidad**:

```text
@Chuleton — hero dish, full-preserve (real photos + texture sheet)
@Room — dining room, full-preserve (real photos)
@Chef — cook, full-preserve (approved reference + written consent)
@Board — oak cutting board, full-preserve
@Menu_template — reference reel frame, loose-guide (camera angle and framing only)
```

Grados (OSideMedia `higgsfield-seedance-2-5`): **conservar entero** / **conservar en parte** (nombrando las partes) / **transferir un atributo** (a qué se aplica) / **guía libre**. Sin grado, "usa @image4 para el abrigo" significa lo que el modelo quiera ese día. **Las variantes de estado tienen su propia entrada** (`@Chuleton_crudo`, `@Chuleton_cortado`): pedirle al modelo que "lo corte" más tarde le obliga a improvisar.

## 4. Ficha de plano

Cada plano rellena todos los campos. Un campo vacío revela dirección que falta (smixs, 14 campos, más los de Society):

| Campo | Contenido |
|---|---|
| ID | 01, 02, 03a… |
| Tiempo narrativo | Qué cambia aquí en la historia |
| Emoción | Antojo, orgullo, pertenencia… |
| Función | Gancho, establecimiento, poder, presión, detalle, reacción, cambio, impacto, poso, salida |
| Encuadre | Tamaño de plano + ángulo (vocabulario de `02`) |
| Composición | Centro, borde, espacio negativo, reflejo, primer término que tapa |
| Cámara | Movimiento con distancia, tiempo y punto final, o "sin movimiento" explícito |
| Motivo del movimiento | ¿Qué ha cambiado? |
| Acción | Hecho físico exacto (quién, desde dónde, hasta dónde, qué toca, qué mira) |
| Mirada del espectador | Dónde cae la vista en los primeros 0,3 s |
| Duración | 0,5 s, 1 s, 2,5 s… |
| Tipo de corte | Seco, sobre la acción, *match*, J/L-cut, *occlusion*… |
| Sonido | Chisporroteo, cuchillo, silencio… |
| Luz y color | Fuente, dirección, paleta concreta |
| **Material** | Real (ruta) o generado |
| **Modelo y resolución** | Lo decide `higgsfield`; se anticipa aquí porque condiciona el prompt |
| **Rótulo** | Texto en pantalla y posición en la zona segura |
| Nota de producción | Prop, localización, permiso, riesgo de fallo conocido |

Si un plano tiene campos vacíos, se rellenan o se elimina el plano.

## 5. Del guion a la lista: tres capas

(smixs `dramaturgy.md` §10)

**Capa 1 · Tiempos dramáticos.** Mapa para 60–90 s que se comprime en proporción. En un reel de 15 s:

```text
0–2,5 s  Gancho      La acción ya empezada, sin presentación
2,5–5 s  Contexto    Dónde estamos, qué está en juego
5–9 s    Presión     El proceso, el punto que se busca
9–11 s   Ruptura     El corte, la tapa, la revelación
11–13 s  Impacto     El plato en su punto, el primer bocado
13–15 s  Poso / CTA  La mesa servida, la fecha, "reserva"
```

Nunca se salta la ruptura ni el impacto. En el arco de "un momento culminante", ruptura e impacto caen en el mismo tiempo y el poso ocupa más.

**Capa 2 · Funciones de plano:** establecimiento, poder, presión, detalle, reacción, cambio, impacto, poso, salida. Todo lo demás es papel pintado.

**Capa 3 · Ritmo:** escalera *largo → más corto → más corto → pausa → impacto* (skill `openmontage`, `03` §4).

## 6. Densidad: cuántos planos por generación

Heurística del *shotlist-builder* oficial (vía OSideMedia). **Se agrupan varias filas en una generación** cuando se cumple **todo**: mismo reparto, mismo lugar, una sola unidad emocional y temporal, cabe en el sobre del modelo y el prompt no se desborda. **Se separan** cuando pasa **cualquiera** de estas cosas: cambio de lugar, entra o sale un personaje importante, cambio de óptica o de montaje, un arco de actuación que merece su propio tiempo, o un inserto de un prop o de una pantalla.

**Presupuesto de complejidad por generación:** más de 2 acciones fuertes, más de 2 movimientos de cámara, más de 3 personajes importantes o más de 1 cambio de lugar → otra generación. **Escalera de duración:** 4–8 s = una acción fuerte; 8–12 s = acción + revelación; 12–15 s = 2–3 tiempos simples.

**En Society:** la **multitoma de Seedance 2.5** agrupa 2–3 planos del mismo espacio en un clip, con los cortes escondidos en gestos rápidos. Con ventanas de **3 s o más** por toma: 3 tomas en 5 s rompieron la continuidad del chuletón (skill `directoria`, `hosteleria/07` §5).

## 7. Presupuesto de tempo

Antes de escribir: a unos 4–6 s por corte de media, con un único plano héroe más largo. Bandas orientativas: ≤15 s → ~3 cortes; ~20 s → 4–5; ~30 s → ~6 (OSideMedia; en reels de comida con ráfaga de gancho, los primeros segundos pueden ser más densos). **La suma de las duraciones es exactamente la duración de la pieza**: si no cuadra, aparece tiempo muerto o un corte imposible, y el error solo se ve en la línea de tiempo.

**Triple coherencia:** la duración aparece en el título, en la cabecera y en cada plano, y los tres datos cuadran.

## 8. Continuidad entre planos y clips

- **Repetir el bloque de identidad en cada clip:** los modelos no tienen memoria entre generaciones. Plato, recuento, vajilla, luz, color, óptica dominante y reglas de continuidad, **en cada prompt**, aunque parezca repetitivo.
- **El primer tiempo del clip N+1 coincide con el último del N:** misma pose, misma luz, misma temperatura de color.
- **Línea de "fuera de plano"** (OSideMedia): quien acaba de salir del plano queda anotado con su lado de salida y su último estado (*"the waiter exited frame-right, still holding the tray"*), para que vuelva a entrar por el lado correcto.
- **Bloque de disposición espacial** antes de la acción en planos con puertas, pasillos o muebles: dónde está la cámara, qué hay entre medias, en qué dirección se mueven.
- **Recuento y orientación como hechos compartidos:** *"exactly five slices, bone pointing left, light oak background — in every shot"*.

## 9. Formato de entrega

**Para decidir** (antes de generar): tabla *Tiempo · Plano · Función · Acción · Cámara · Luz · Sonido · Emoción · Material · Rótulo*. Es lo que se aprueba en la **puerta B**.

**Para producir:** un prompt por plano o por multitoma con **prefijo + recursos del plano + escena + CUT 1…N**, en inglés, listo para copiar. OSideMedia propone entregarlo como **HTML autocontenido** con casillas por escena y botón de copiar; en Society puede ser un *artifact* o el propio proyecto de la app.

**Para montar:** la lista, con las entradas y salidas reales de cada clip aprobado, viaja a `openmontage` (props de Remotion o EDL para After Effects).
