# Skills de producción de Society

Seis skills trabajan juntas para producir contenido de hostelería:

| Skill | Hace |
|---|---|
| [`marketing-hosteleria`](marketing-hosteleria/SKILL.md) | Decide qué publicar y para qué (brief, objetivo, medición) |
| [`director`](director/SKILL.md) | Decide la pieza: conceptos, lista de planos, puertas A–E |
| [`director-reels`](director-reels/SKILL.md) | Produce un reel concreto de principio a fin: plan YAML, inventario de verdad, contratos de plano, keyframes, clips, revisión y paquete de montaje |
| [`directoria`](directoria/SKILL.md) | Escribe los prompts de imagen y vídeo y revisa el resultado |
| [`higgsfield`](higgsfield/SKILL.md) | Elige modelo y parámetros, calcula coste y ejecuta |
| [`openmontage`](openmontage/SKILL.md) | Monta, pone sonido y revisa antes de entregar |

---

## Regla cero: firma de rodaje real (obligatoria)

**Se aplica a cualquier imagen, clip o reel que haga cualquiera de las skills, antes que cualquier otra regla de estilo.** El cliente paga por contenido que parece rodado por un profesional. Si parece hecho con IA, el trabajo ha fallado, por bonito o nítido que sea.

La regla completa, con bloques de prompt y umbrales, está en [`directoria/references/hosteleria/08-firma-de-rodaje-real.md`](directoria/references/hosteleria/08-firma-de-rodaje-real.md). Sale de una comparación medida (→ [`pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/`](../pruebas/2026-09-25_da-tonino-v3-frente-a-referencia/README.md)).

### Ruta de vídeo única (2026-09-25)

Todo clip se genera con **Seedance 2.5 a 720p** (`mode:"omni_reference"`, `aspect_ratio:"9:16"`) y solo la toma aprobada se reescala a 1080×1920 con **ByteDance pro** (R-RES-01, `directoria/references/hosteleria/03` §3.1). **Kling 3.0 no se usa**, aunque alguna referencia antigua de estas skills lo siga nombrando: donde choquen, manda esta línea.

**El reel entero sale de una sola generación multitoma** (Víctor, 2026-09-25), no de un clip por plano. En una llamada van todas las imágenes aprobadas como `image_references` (@Image 1…n, hasta 9) y el prompt las recorre en orden:

1. Cabecera: «A N-second vertical restaurant film in K shots with hard cuts», y «Shot k is @Image k… each image is the first frame of its shot… do not mix elements between shots».
2. Bloques comunes: PRESERVE TEXTURE, PRESERVE EXPOSURE AND COLOUR, SHARPNESS.
3. Un bloque `[Shot k, a–b s]` por toma, de 0,8–1,4 s (el plano final puede durar más): un verbo con consecuencia física y **un movimiento de cámara profesional con nombre**: dolly-in que frena en seco, slider macro lateral, rack focus, tilt de gimbal que sigue la acción, whip de cámara en mano, grúa cenital, arco corto en slider o planeo FPV / dron de interior en la sala. Nada de «trípode fijo con empuje de 3 cm» en todas las tomas.
4. Cierre: EDIT (corte en el punto más rápido del movimiento, velocidad real, sin rampas), manos y personas, sin texto, sonido diegético y cámara.

Ejemplo en uso: [`produccion/da-tonino/reel-v4/prompt-seedance-reel.txt`](../produccion/da-tonino/reel-v4/prompt-seedance-reel.txt).

### Antes de generar nada

1. **Material real primero.** Fotos reales del local y del plato como ancla de cada keyframe. Para manos, fuego y proceso, pedir metraje real al local antes de generar.
2. **Nada inventado.** Ni platos, ni vajilla, ni mobiliario, ni espacios (una cocina que no se ha visto) que no estén en el material real.
3. **Un mundo visual por pieza.** Una sola luz y un solo grade, sacados de las fotos reales del local.

### En cada prompt (bloques de `08` §11)

4. **Plano de foco con nombre.** Nítido solo lo que importa (8–25 % del encuadre); el resto cae en desenfoque óptico. Nunca todo en foco.
5. **Luz con fuente y contraste.** Balance neutro, pero con sombra, negros profundos y brillos especulares en grasa, salsa y cristal. Nunca luz plana.
6. **Cámara con peso.** Seguimiento de pequeña amplitud que acompaña el gesto, o slider lento en el plano héroe. Nunca cámara muerta ni recorridos sobre la comida.
7. **Física con peso.** Obturación de 180°: lo rápido lleva estela, lo que cae cae rápido y se posa. Nada flota, nada se queda de pie, ninguna pieza idéntica a otra.
8. **Una mano, un verbo, una consecuencia.** Nada se mueve sin causa visible.

### En montaje y entrega

9. **Corte seco** cada 0,4–1,2 s en el golpe del sonido. Sin transiciones de efecto (desenfoque, destello, zoom).
10. **Sonido obligatorio:** música con pulso + un efecto por acción + ambiente. Sin sonido no se entrega.
11. **Grade y grano comunes** en montaje, nunca pedidos en el prompt.
12. **Revisión automática** antes de las puertas D y E:
    ```bash
    python3 skills/openmontage/scripts/medir_realismo.py reel.mp4 [referencia.mp4]
    ```
    Además, fotograma a fotograma en el plano héroe: ¿algo flota, cae sin estela, se repite idéntico o se mueve sin causa?

### Cuándo se puede saltar

Solo **a propósito y por escrito** en la lista de planos: una cenital quieta de cierre, o una ficha de cliente que lo prohíba. Por ejemplo, Torre de Vega rechazó la cámara en mano; en ese caso manda la ficha. Nunca por comodidad ni por coste.
