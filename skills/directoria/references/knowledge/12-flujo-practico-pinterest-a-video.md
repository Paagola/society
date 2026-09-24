> **Origen:** `base-conocimiento-torre-de-vega/02-metodologia-prompting-directoria-cloud/directoria-cloud-flujo-practico.md` (revisión editorial 2026-09-22). Integrado en la skill `directoria` el 2026-09-24 sin recortar contenido.
> **Precedencia:** si algo de este documento choca con [`00-precedencia-y-correcciones.md`](../hosteleria/00-precedencia-y-correcciones.md), manda ese archivo: recoge hallazgos medidos posteriores y las correcciones para comida y hostelería.

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# Flujo práctico de creación de vídeo cinematográfico con IA

> Apuntes de curso sobre generación de imagen/vídeo hiperrealista para anuncios, limpiados y estructurados como conocimiento de referencia.
> Complementa [`directoria-cloud.md`](../../SKILL.md) (el agente) y `higgsfield-spec.md` (recurso no incluido: `higgsfield-spec.md`) (la plataforma): este archivo documenta el **flujo de trabajo real** paso a paso, con y sin Claude Code.

---

## 1. Principio comercial: qué se vende realmente

No se vende "IA" — de eso el cliente desconfía. Se vende:

- **Reducción de costes** frente a producción audiovisual tradicional (sin shooting, sin modelos, sin localización).
- **Volumen y variedad de anuncios.** Los anunciantes necesitan probar muchas variantes creativas para saber cuál convierte; generar 10 versiones de un concepto es inviable en producción tradicional pero trivial con este flujo.
- **Contenido que normalmente sería inalcanzable** para un negocio pequeño (campañas con estética editorial/cinematográfica de nivel premium).

**La habilidad central no es técnica, es de traducción**: entender el problema del cliente (qué quiere vender, a quién, en qué plataforma) y convertirlo en una solución visual concreta. El cliente no quiere "vídeos con IA", quiere **ingresos**. La entrega siempre debe enmarcarse en ese resultado, no en la herramienta.

---

## 2. Flujo manual (sin Claude Code)

Flujo de referencia para producir una imagen de producto/persona con estilo controlado, partiendo de una imagen de inspiración.

```
1. Pinterest → encontrar una imagen de referencia con el estilo deseado
2. Decodificar el estilo con un GPT personalizado ("PromptDirector")
   → la IA analiza la imagen y devuelve un JSON con todos los parámetros de estilo
   (cámara, luz, composición, paleta, imperfecciones...)
3. Generar la imagen base en Higgsfield, pegando el JSON decodificado como prompt
   → elegir modelo según el caso (ver tabla §3)
4. (Opcional) Insertar un producto real en la escena:
   a. Tomar la imagen generada en el paso 3
   b. Pedirle a PromptDirector que decodifique de nuevo, esta vez incluyendo
      el producto (ej. "añade una lata de Coca-Cola") → nuevo JSON
   c. Ir a Higgsfield, modelo Nano Banana Pro, con DOS referencias:
      - la imagen generada en el paso 3
      - la imagen/foto real del producto
      + el JSON del paso 4b como prompt
   → resultado: imagen con el producto real integrado y buen contexto
```

### Regla clave al insertar un producto real

Si el producto es una referencia real (foto del cliente), hay que darle **contexto físico explícito** para que la escala y la interacción se vean creíbles: por ejemplo, indicar que hay una mano sujetándolo, o un objeto de tamaño conocido al lado. Sin esa instrucción, el modelo infla o descontextualiza el objeto. Cuanto más detallado y concreto el prompt, mejor el resultado (ver `directoria-cloud/knowledge/05-biblia-hiperrealismo.md`, sección de escala con dimensiones en cm).

---

## 3. Qué modelo usar para qué

Cada modelo de imagen tiene un punto fuerte claro; no son intercambiables:

| Modelo | Punto fuerte | Úsalo para |
|---|---|---|
| **Soul 2.0** | El mejor en generación de personas/humanos realistas | Personas, retratos, escenas con protagonista humano |
| **GPT Image 2.0** | Mejor renderizado de texto legible | Cualquier escena que necesite texto en pantalla (carteles, packaging con texto, UI) |
| **Nano Banana Pro** | Mejor con múltiples referencias y medidas/ajuste de producto (ej. cómo cae la ropa) | Composición con varias refs a la vez, inserción de producto real, fidelidad de identidad |

> Nota: esto afina lo ya documentado en `directoria-cloud/knowledge/02-modelos-imagen.md`. Soul ignora las referencias (prompt-only) — no usarlo si hace falta anclar una cara o producto concreto; para eso, Nano Banana Pro.

---

## 4. Flujo con Claude Code (agente DirectorIA-Cloud)

Mismo flujo, pero delegado a Claude Code con el [agente DirectorIA-Cloud](../../SKILL.md) y el **MCP de Higgsfield conectado**, usando el modelo rápido (Claude 4.8 fast). El agente ejecuta directamente en lugar de solo entregar prompts.

Ejemplo de conversación real:

1. **Generación desde referencia:** se le pasa una imagen de Pinterest y se le pide *"introduce esto en Soul 2.0 como referencia, haz 4 generaciones"*. Claude llama al MCP de Higgsfield directamente, sin pasar por la web.
2. **Animación con ideación previa:** se le indica que una de las imágenes generadas gustó, y se le pide animarla con **Seedance 2.0** — pero antes se le piden **ideas de animación** (qué movimiento de cámara, qué acción). El usuario elige la idea que más le gusta y se la confirma a Claude en el chat ("esta idea me gusta") antes de lanzar la generación.
3. **Generación de vídeo:** los vídeos se lanzan desde `Higgsfield → Create Video`, con Seedance 2.0 cuando hace falta voz/audio propio de la escena (no doblaje por IA) — relevante cuando se necesita **consistencia de voz** del personaje a lo largo de varias piezas.

> Este flujo está alineado con el protocolo ya definido en `directoria-cloud/SYSTEM_PROMPT.md` (§4, Paso 5: "si hay MCP, ofrécete a lanzar" y pide confirmación antes de ejecutar).

---

## 5. Entregable al cliente

El cliente necesita ver un resultado tangible, no una demo abstracta: ofrecer siempre una **muestra del producto real** integrado en la pieza generada (ver §2, inserción de producto), no solo una escena genérica con el estilo. Es lo que conecta la pieza con "esto puede vender mi producto" en vez de "esto es una imagen bonita hecha con IA".

---

## 6. Herramientas del flujo completo

| Herramienta | Rol en el flujo |
|---|---|
| **Pinterest** | Fuente de imágenes de referencia/estilo |
| **PromptDirector (GPT personalizado)** | Decodifica una imagen de referencia a JSON de estilo reproducible |
| **Higgsfield** | Plataforma de generación de imagen y vídeo (ver `higgsfield-spec.md`) |
| **Claude Code + MCP Higgsfield** | Ejecuta el flujo completo por conversación, sin pasar por la web (ver `directoria-cloud.md`) |
| **Soul 2.0** | Modelo de imagen — mejor para personas/humanos |
| **GPT Image 2.0** | Modelo de imagen — mejor para texto legible en escena |
| **Nano Banana Pro** | Modelo de imagen — mejor con múltiples referencias y ajuste de producto/ropa |
| **Seedance 2.0** | Modelo de vídeo — animación con audio/voz nativa, útil para consistencia de voz |
| **ElevenLabs** | Voz IA (mencionada como herramienta del stack; uso concreto pendiente de documentar) |

---

## 7. Referencias cruzadas

- **El agente y su protocolo de trabajo** → [`directoria-cloud.md`](../../SKILL.md), [`directoria-cloud/SYSTEM_PROMPT.md`](../../SKILL.md)
- **Specs de la plataforma Higgsfield (modelos, planes, precios)** → `higgsfield-spec.md` (recurso no incluido: `higgsfield-spec.md`)
- **Modelos de imagen en detalle** → `directoria-cloud/knowledge/02-modelos-imagen.md`
- **Modelos de vídeo en detalle** → `directoria-cloud/knowledge/03-modelos-video.md`
- **Biblia del hiperrealismo (escala, codas fotográficas)** → `directoria-cloud/knowledge/05-biblia-hiperrealismo.md`
