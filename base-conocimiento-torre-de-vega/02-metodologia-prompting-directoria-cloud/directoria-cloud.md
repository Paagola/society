<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Método reutilizable: parámetros, lotes, precios y modelos de ejemplos no son contratos vigentes. Consultar registro de capacidades y perfil aprobado antes de ejecutar. La ficha del cliente prevalece sobre defaults de 4K o estilo.

# DirectorIA Cloud — Director de arte IA para Higgsfield

> Paquete de prompts/conocimiento (system prompt + onboarding + knowledge base + plantillas + ejemplos) que convierte a Claude en un director de arte especializado en imagen/vídeo hiperrealista para publicidad, con foco en Higgsfield (adaptable a Freepik, Midjourney, GPT-Image).
> Origen: curso de Higgsfield y creación de vídeo con IA. Paquete completo en `directoria-cloud/` ([documento actual](SYSTEM_PROMPT.md)).
> Complementa `higgsfield-spec.md` (recurso no incluido: `higgsfield-spec.md`) (specs de la plataforma) con la metodología de prompting y dirección de arte.

---

## 1. Qué es

No es código: es documentación Markdown diseñada para que un LLM (Claude Code, Claude Project, GPT personalizado) razone con criterio de director de arte experto sin necesidad de que el experto original esté presente. Convierte una idea vaga ("anuncio de perfume con un dóberman") en:

1. Un **JSON Decoded Brief** (specs de cámara, luz, imperfecciones, negativos)
2. Un **párrafo en lenguaje natural** en inglés listo para pegar en el generador
3. Si hay MCP de Higgsfield conectado, puede ejecutar la generación directamente (subir refs, lanzar jobs, gestionar coste/rate limits)

## 2. Estructura del paquete

```
herramientas/directoria-cloud/
├── README.md              — Qué hace, qué incluye, cómo desplegarlo en 4 entornos
├── SYSTEM_PROMPT.md        — El cerebro: identidad, reglas inviolables, protocolo paso a paso
├── ONBOARDING.md           — Cuestionario de 7 preguntas para perfilar al usuario antes de generar
├── PERFIL_USUARIO.md       — Memoria persistente del perfil (plantilla vacía = primer arranque)
├── knowledge/              — Biblioteca de conocimiento (9 archivos, 00 a 08):
│   ├── 00-metodologia-promptdirector.md  — Salida en 2 partes, tokens @imageN, reglas de rigor
│   ├── 01-higgsfield-mcp.md              — Flujo del MCP: subida de medias, get_cost, workspaces
│   ├── 02-modelos-imagen.md              — nano_banana_pro, soul_2/soul_cinematic, gpt_image_2, marketing_studio_image
│   ├── 03-modelos-video.md               — kling3_0, seedance_2_0, wan2_7
│   ├── 04-consistencia-personaje.md      — Ref stack, anchor words, skin-tone/wardrobe lock
│   ├── 05-biblia-hiperrealismo.md        — Codas fotográficas, film stocks, micro-imperfecciones
│   ├── 06-direccion-movimiento.md        — Restraint cinematográfico, qué movimiento evitar
│   ├── 07-troubleshooting.md             — Rate limit, trampa de preset, drift de cara
│   ├── 08-recetas-pipeline.md            — Pipelines completos ref → still → vídeo → lipsync
│   ├── 09-vocabulario-plano-y-modo-organico.md — Vocabulario de plano/ángulo, modo ORGANIC, portabilidad sin MCP
│   ├── 10-bullet-time-y-secuencias-largas.md   — Plano largo continuo, world-space lock, causalidad en cadena
│   └── 11-fpv-camara-invisible-y-fuerza-compartida.md — FPV/POV imposible, cámara invisible, fuerza física compartida
├── templates/              — Esqueletos en blanco (prompt imagen, vídeo-motion, ref-stack, talking-head)
└── examples/                — Casos resueltos (UGC con personaje, editorial cinematográfico)
```

## 3. Cómo usarlo en Nebulix

- **En Claude Code (este repo o el de un cliente):** copiar `SYSTEM_PROMPT.md` como `CLAUDE.md` en la raíz del proyecto de producción de contenido, junto con `knowledge/`, `templates/` y `examples/`. Si hay MCP de Higgsfield conectado, Claude puede generar directamente.
- **Sin MCP:** funciona igual pero solo entrega prompts + bloque de parámetros para pegar a mano en la web de Higgsfield/Freepik.
- **Regla dura del propio sistema:** nunca genera a ciegas. Primero corre el onboarding de 7 preguntas (`ONBOARDING.md`) y confirma el perfil (`PERFIL_USUARIO.md`) antes de producir nada.

## 4. Cuándo aplica para Nebulix

Útil cuando un proyecto de cliente necesite contenido visual para redes (ads UGC, reels, contenido de marca) generado con IA y se quiera un nivel de calidad "ad real" en vez de imágenes genéricas de IA. Antes de usarlo, confirmar si el cliente o Nebulix tiene cuenta/MCP de Higgsfield activo (ver `higgsfield-spec.md` (recurso no incluido: `higgsfield-spec.md`) para planes y modelos disponibles).

## 5. Flujo práctico (curso)

Apuntes del flujo real de trabajo, paso a paso, con y sin Claude Code (Pinterest → decodificación de estilo → generación → inserción de producto real → animación) → ver [`directoria-cloud-flujo-practico.md`](directoria-cloud-flujo-practico.md).

## 6. Notas

- Los prompts finales que produce siempre van en inglés (los modelos rinden mejor); la conversación con el agente es en español.
- Prohíbe explícitamente vocabulario que delata IA ("glow", "rendered as", "8k hyperrealistic") y exige specs de cámara reales (lente, f/, ISO, distancias, CCT) en cada brief.
- `PERFIL_USUARIO.md` es la plantilla maestra: si se usa en un proyecto de cliente, copiarla y rellenarla ahí, no editar la copia de este repo.
