# Skills de producción de Society

Siete skills trabajan juntas para producir contenido de hostelería:

| Skill | Hace |
|---|---|
| [`marketing-hosteleria`](marketing-hosteleria/SKILL.md) | Decide qué publicar y para qué (brief, objetivo, medición) |
| [`hooks-society`](hooks-society/SKILL.md) | Diseña la primera toma con 24 hooks visuales: gesto, cámara, estado final, referencias y selector local |
| [`director`](director/SKILL.md) | Decide la pieza: conceptos, lista de planos, puertas A–E |
| [`director-reels`](director-reels/SKILL.md) | Produce un reel concreto de principio a fin: plan YAML, inventario de verdad, contratos de plano, keyframes, clips, revisión y paquete de montaje |
| [`directoria`](directoria/SKILL.md) | Escribe los prompts de imagen y vídeo y revisa el resultado |
| [`higgsfield`](higgsfield/SKILL.md) | Elige modelo y parámetros, calcula coste y ejecuta |
| [`openmontage`](openmontage/SKILL.md) | Monta, pone sonido y revisa antes de entregar |

Además, para las piezas ilustradas de Society:

| Skill | Hace |
|---|---|
| [`papel-stopmotion`](papel-stopmotion/SKILL.md) | Vídeos de papel recortado en stop-motion. Corta sola cualquier imagen en piezas y las monta en Remotion con efectos explicativos, transiciones de papel, sonido y el logo oficial, sin generar vídeo. La regla cero no se aplica: es ilustración a propósito. |

La apertura visual se elige después del análisis del reel de referencia con [`hooks-society`](hooks-society/SKILL.md). Su salida es un contrato parcial para dirección, no una generación independiente ni una integración ya implementada en la aplicación. Revisión y fuentes: [`auditoría 2026-09-26`](hooks-society/references/auditoria-2026-09-26.md).

**Orden del proceso (Víctor, 01/10/2026):** análisis del reel de referencia (imagen y audio) → guion → búsqueda de las imágenes reales que mejor encajan con ese reel → keyframes → vídeo → montaje.

**Creatividad propia en cada reel (Víctor, 01/10/2026):** ningún reel tiene estructura fija. Textos, transiciones, efectos 3D y cambios de velocidad se diseñan en el prompt para que salgan dentro del vídeo, con los picos del audio de la referencia como guía. Detalle, límites y prompt de ejemplo: [`director/references/08-creatividad-propia.md`](director/references/08-creatividad-propia.md).

---

## Regla cero: firma de rodaje real (obligatoria)

**Se aplica a cualquier imagen, clip o reel que haga cualquiera de las skills, antes que cualquier otra regla de estilo.** El cliente paga por contenido que parece rodado por un profesional. Si parece hecho con IA, el trabajo ha fallado, por bonito o nítido que sea.

La regla completa, con bloques de prompt y umbrales, está en [`directoria/references/hosteleria/08-firma-de-rodaje-real.md`](directoria/references/hosteleria/08-firma-de-rodaje-real.md). Sale de una comparación medida (→ [`pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/`](../pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/README.md)).

### Ruta de vídeo única (2026-10-01)

Todo vídeo se genera con **Seedance 2.5 a 480p** (`mode:"omni_reference"`, `aspect_ratio:"9:16"`) y **sin reescalado**, para gastar menos créditos (Víctor, 01/10/2026; sustituye a R-RES-01 y R-RES-02 en lo que toca a la resolución de generación y al reescalado). Un reel de 12 s cuesta unos 34 créditos. El montaje va a **60 fps**. **Kling 3.0 no se usa**, aunque alguna referencia antigua de estas skills lo siga nombrando: donde choquen, manda esta línea.

**El reel entero sale de una sola generación multitoma** (Víctor, 2026-09-25): tomas, cortes, textos, transiciones y efectos en el mismo vídeo. En una llamada van todas las imágenes aprobadas como `image_references` (@Image 1…n, hasta 9). El prompt sigue la anatomía de [`director/references/08`](director/references/08-creatividad-propia.md) §4: cabecera, CREATIVE CONCEPT, VISUAL IDENTITY, REFERENCES, SEQUENCE, TRANSITIONS & MOTION DESIGN, CAMERA & LIGHTING, SOUND DESIGN y QUALITY CONTROL. Número de tomas y duración de cada una: los que pida el guion de esa pieza (hay reels con tomas de 3 s y reels con tomas mucho más cortas).

Ejemplo anterior, con la estructura fija de tomas: [`produccion/da-tonino/reel-v4/prompt-seedance-reel.txt`](../produccion/da-tonino/reel-v4/prompt-seedance-reel.txt).

### Antes de generar nada

1. **Material real primero.** Fotos reales del local y del plato como ancla de cada keyframe. Para manos, fuego y proceso, pedir metraje real al local antes de generar.
2. **Nada inventado.** Ni platos, ni vajilla, ni mobiliario, ni espacios (una cocina que no se ha visto) que no estén en el material real.
3. **Un mundo visual por pieza.** Una sola luz y un solo grade. La luz es la del reel de referencia, medida en su análisis; el usuario puede cambiarla con el selector de luminosidad (estudio, natural, cálida…). La ficha del cliente solo guarda la luminosidad por defecto del local.

### En cada prompt (bloques de `08` §11)

4. **Plano de foco con nombre.** Nítido solo lo que importa (8–25 % del encuadre); el resto cae en desenfoque óptico. Nunca todo en foco.
5. **Luz con fuente y contraste.** Balance neutro, pero con sombra, negros profundos y brillos especulares en grasa, salsa y cristal. Nunca luz plana.
6. **Cámara con peso.** Seguimiento de pequeña amplitud que acompaña el gesto, o slider lento en el plano héroe. Nunca cámara muerta ni recorridos sobre la comida.
7. **Física con peso.** Obturación de 180°: lo rápido lleva estela, lo que cae cae rápido y se posa. Nada flota, nada se queda de pie, ninguna pieza idéntica a otra.
8. **Una mano, un verbo, una consecuencia.** Nada se mueve sin causa visible.

### En montaje y entrega

9. **Cortes en los picos del audio** de la referencia. Transiciones, efectos y cambios de velocidad según el concepto de cada reel (`director/references/08`): con motivo y conexión visual con el plano anterior, nunca al azar ni de plantilla.
10. **Sonido obligatorio:** música con pulso + un efecto por acción + ambiente. Sin sonido no se entrega.
11. **Grade y grano comunes** en montaje, nunca pedidos en el prompt.
12. **Revisión automática** antes de las puertas D y E:
    ```bash
    python3 skills/openmontage/scripts/medir_realismo.py reel.mp4 [referencia.mp4]
    ```
    Además, fotograma a fotograma en el plano héroe: ¿algo flota, cae sin estela, se repite idéntico o se mueve sin causa?

### Cuándo se puede saltar

Solo **a propósito y por escrito** en la lista de planos: una cenital quieta de cierre, la capa creativa del concepto (tipografía 3D, transiciones líquidas, un plato que se forma en el aire: `director/references/08`) o una ficha de cliente que lo prohíba. Por ejemplo, Torre de Vega rechazó la cámara en mano; en ese caso manda la ficha. La comida, el local y las personas siguen pareciendo reales. Nunca por comodidad ni por coste.
