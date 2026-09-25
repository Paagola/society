# 02 · Motor creativo

La creatividad de un Reel de restaurante no está en efectos: está en **elegir el momento**, **contarlo
en el orden que engancha** y **cortar donde el ojo lo pide**. Este archivo da el método para hacerlo
igual de bien en cada pieza sin inventar nada del local.

Datos que condicionan todo (Torre de Vega, 90 días medidos): mediana de abandono del 75 % en los 3
primeros segundos; los dos únicos posts que salieron de la burbuja de seguidores lo hicieron por
**compartidos**; el Reel de nueve cortes de 1,2 s de botellas fue el peor en retención (82,8 %); en el
reel del chuletón, 9 s con el momento clave al principio ganaron a 15 s lentos.

## Índice

1. El tratamiento del director
2. Catálogo de mecanismos creativos
3. Transiciones en cámara
4. Rúbrica para puntuar conceptos
5. Antipatrones

---

## 1. El tratamiento del director

Siete líneas en `tratamiento:` del plan. Se escriben antes de los conceptos y se comprueban contra cada
plano. Si un plano no sirve a ninguna de estas líneas, sobra.

| Campo | Pregunta | Ejemplo |
|---|---|---|
| `motivo_para_reenviar` | ¿Qué resuelve a quien lo recibe? | «Vuelve la carta de otoño el 1 de octubre: plan para ir» |
| `momento_heroe` | ¿Cuál es el único plano por el que merece la pena verlo? | «El cuchillo abre el chuletón y se ve el punto» |
| `emocion` | 2-4 señales **observables**, no adjetivos | «el jugo brilla en el corte; la mano no duda; la sala en penumbra espera» |
| `foco_sensorial` | ¿Qué sentido manda? | «sonido: el chisporroteo» · «tacto: la costra» · «vista: el color del punto» |
| `motivo_visual` | Un elemento que se repite y une los planos | «formas redondas: plato, copa, lámpara» · «luz cálida sobre negro» |
| `curva_de_ritmo` | Dónde se acelera y dónde se sostiene | «2,4 s de gancho → planos de 1,2-1,6 s → sostener 2 s el cierre» |
| `cierre` | Qué se lleva el espectador | «pregunta al espectador + nombre del local» |

**El momento héroe decide el presupuesto.** Es el único plano que justifica Seedance 2.5, una multitoma o
dos reintentos. Los demás se resuelven con metraje real, Kling 3.0 o montaje.

---

## 2. Catálogo de mecanismos creativos

Cada concepto usa **un** mecanismo. Los tres conceptos de la puerta A usan mecanismos distintos. La
columna «tienta a inventar» avisa de lo que el mecanismo empuja a generar sin ancla.

| # | Mecanismo | Fotograma 1 | Estructura | Por qué funciona | Tienta a inventar |
|---|---|---|---|---|---|
| M1 | **Adelanto** | El resultado ya visible (el punto de la carne, la copa llena) | Resultado → proceso → resultado completo | Paga la atención antes de pedirla. Validado en el reel del chuletón (9 s) | Estados intermedios que no existen en el material |
| M2 | **Pregunta al espectador** | Rótulo-pregunta sobre acción («¿ESTE PUNTO?») | Pregunta → prueba → invitación a responder | Genera comentarios y detiene el scroll con una duda | Nada, si la prueba es real |
| M3 | **Aviso con fecha** | Acción + fecha en rótulo desde el fotograma 1 | Novedad → prueba del local → fecha y CTA | Resuelve un plan: es lo que se reenvía | Platos nuevos sin foto (mejor no enseñar plato que inventarlo) |
| M4 | **Tres estados** | El estado intermedio más vistoso | Crudo → brasa → corte, con saltos claros | Transformación visible en segundos | Continuidad falsa entre piezas distintas |
| M5 | **Mismo plano, cambia el plato** | Primer plato ya en mesa con mano | Cámara bloqueada, 4-6 platos en el mismo punto del gesto | Ritmo hipnótico y barato: solo se animan primero y último (regla 14) | Platos que no están en la carta |
| M6 | **El oficio** | Las manos del profesional a mitad de gesto | Gesto → detalle → resultado | Autoridad y autenticidad | Todo: exige metraje real y el «ok» de la persona |
| M7 | **La mesa que se llena** | Mesa vacía con una mano ya dejando algo | Suma de elementos hasta la mesa completa | Promesa de abundancia, fácil de encadenar | Platos o bebidas fuera de la carta |
| M8 | **POV del comensal** | Mano apartando la silla | Llegar → sentarse → servir → primer gesto de comer (sin cara) | El espectador se pone en el sitio | Caras, cubiertos que cambian entre planos |
| M9 | **Sonido primero** | Plano cuyo sonido es el gancho (chisporroteo, descorche) | El sonido manda los cortes | Retiene con los ojos en otra cosa | Sonido que no corresponde a la imagen |
| M10 | **El dato verdadero** | Rótulo con un dato real y confirmado («CASI 50 AÑOS») sobre acción | Dato → prueba visual → consecuencia | Diferencia frente a la competencia | Fotos «de época» generadas: prohibido |
| M11 | **Cerca y lejos** | Macro de textura que no se reconoce | Macro → revelación del plato → la sala | La curiosidad del «¿qué es esto?» | Texturas imposibles en macro |
| M12 | **Cuenta atrás** | Acción + «FALTAN 3 DÍAS» | Preparativos reales → fecha | Urgencia y reenvío | Preparativos que no ocurren |

Encaje con el plan de contenido de Torre de Vega: «el punto de la brasa» → M1 o M2 o M4; «carta de
otoño desde el [fecha]» → M3 o M12; «oficio con el cortador de jamón» → M6 (bloqueado sin metraje real).

---

## 3. Transiciones en cámara

La transición más barata y más real es la que **se diseña en los keyframes** y se ejecuta con un corte
seco en montaje. No cuesta créditos y no inventa nada. Se anota en `transicion.salida` de un plano y
`transicion.entrada` del siguiente.

| Transición | Cómo se diseña | Ejemplo |
|---|---|---|
| **Casar por forma** | La forma dominante ocupa el mismo sitio del encuadre al final de A y al principio de B | Boca de la copa (A) → plato redondo (B), ambos centrados |
| **Casar por movimiento** | La cámara o el objeto salen de A en una dirección y B empieza moviéndose en la misma | Slider a la izquierda en A → slider a la izquierda en B |
| **Oclusión en primer plano** | Algo cruza muy cerca del objetivo al final de A y al principio de B | La botella cruza el encuadre → la sala |
| **Luz a negro** | A termina en una zona oscura del encuadre; B empieza saliendo de la oscuridad | La brasa hacia la sombra → la lámpara encendida |
| **Relevo de mano** | Una mano sale por un lado en A y otra entra por el lado opuesto en B | Mano de mujer sale a la derecha → mano de hombre entra por la izquierda (regla 13) |
| **Foco** | A termina desenfocándose; B empieza desenfocado y enfoca | Copa desenfocada → sala nítida |

**Transiciones generadas** (el modelo crea el puente entre dos clips): solo **una por Reel** y solo si el
concepto lo pide. Según la guía de la comunidad que resume la doctrina de Seedance 2.5, un puente normal
dura unos 0,2-0,8 s y uno héroe unos 1,2 s, y hay que decir **cuándo queda establecida** la escena de
destino. Son cifras de practicantes, no medidas en este proyecto: trátalas como punto de partida.

---

## 4. Rúbrica para puntuar conceptos

Puntúa cada concepto y presenta la tabla en la puerta A.

| Criterio | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **Reenvío** (pregunta de control) | Nadie lo reenviaría | Solo por estética | Resuelve algo con matices | Resuelve un plan concreto (fecha, novedad, aviso) |
| **Gancho del fotograma 1** | Bodegón quieto | Movimiento de montaje | Acción real ya empezada | Acción real + rótulo que plantea una pregunta o un dato |
| **Riesgo de realidad** (invertido) | Plano héroe sin ancla o con fuego generado | ≥3 planos L4 con manos o cortes | 1-2 planos L4 complejos con anclas | Mayoría L0-L1, un solo plano héroe generado |
| **Coste** (0-2) | Supera el presupuesto | Dentro del presupuesto | Menos del 60 % del presupuesto | — |
| **Novedad** (0-2) | Mismo mecanismo que los dos últimos reels | Mismo que el último | Distinto a los dos últimos | — |
| **Encaje** (0-2) | Fuera del plan de contenido | Encaja a medias | Es una pieza del plan | — |

Máximo 15. Recomienda el de mayor puntuación salvo que el de menor riesgo esté a un punto: en ese caso,
recomienda el de menor riesgo y dilo.

---

## 5. Antipatrones

- **Abrir con un bodegón quieto.** Si el fotograma 1 puede confundirse con una foto, el Reel no se
  distribuye (regla 12 de vídeo).
- **Cortar rápido al principio.** El primer plano dura 2-2,5 s; el ritmo rápido empieza después del
  segundo 3.
- **Copiar la referencia entera.** De la referencia se toma el mecanismo (ritmo, gancho, rótulos), nunca
  su look, platos, local ni personas. Si su gancho es débil, se corrige (caso práctico 01: gancho 25,
  sostenimiento 95 → se copió el ritmo y se cambió la apertura).
- **Buscar tendencias en la web para el guion.** Las fuentes son el informe del cliente, el plan de
  contenido y la noticia del brief.
- **«Que sea más épico».** Más movimiento generado = más invención. La épica sale del orden y del corte.
- **Un mecanismo por plano.** Un Reel de 9-15 s cuenta una sola cosa.
