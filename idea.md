# Society

**Automatización profesional de contenido para redes sociales, enfocada en hostelería.**

## 1. Resumen

Society es una aplicación que sustituye (o complementa) a una agencia de marketing tradicional para negocios de hostelería, automatizando la creación de contenido audiovisual para redes sociales a partir del propio local, su carta y sus referencias de estilo.

## 2. Problema

Un restaurante/bar que quiere tener presencia constante en redes sociales necesita hoy:

- Contratar una agencia (caro, lento, poco escalable) o
- Producir el contenido internamente (requiere tiempo, criterio audiovisual y herramientas que el negocio no suele tener)

En ambos casos el contenido tarda en producirse y es difícil mantener consistencia visual y un ritmo de publicación alto.

## 3. Propuesta de valor

- **Fidelidad al local real**: todo el contenido generado se basa en imágenes/vídeo reales del local y de sus platos, no en generación genérica de IA que "inventa" un espacio distinto al que el cliente conoce.
- **Criterio profesional integrado**: el sistema no solo genera vídeo, sino que aplica análisis de guion, ritmo y viralidad antes de producir nada, algo que normalmente solo aporta una agencia experimentada.
- **Prompting controlado y no alucinado**: la generación de imagen/vídeo se apoya en `directoria-cloud`, una skill propia que construye prompts estructurados en JSON con directrices aprendidas, reduciendo la aleatoriedad típica de la IA generativa.

## 4. Público objetivo

Negocios de **hostelería** (restaurantes, bares, cafeterías) que quieren presencia recurrente en redes sociales sin depender de una agencia o de producción propia.

## 5. Flujo de usuario

### Fase 1 — Onboarding del local
El cliente graba un vídeo (o, en el futuro, un mapeo 3D) de todo su local. De ahí se extraen las imágenes de referencia que garantizan que todo el contenido generado después sea fiel al espacio real, evitando que el cliente vea en redes algo distinto a lo que existe físicamente.

> Decisión pendiente: hasta qué punto conviene automatizar el mapeo 3D (p. ej. con *3D Jutsu* de Higgsfield) para lograr vídeos más realistas. Ver [§7](#7-decisiones-pendientes).

### Fase 2 — Catálogo de producto
Con el local ya contextualizado, se solicitan fotos de platos, bebidas, postres, etc. Estas se categorizan mediante un sistema pensado para ser cómodo de usar por el cliente y fácil de analizar por la IA.

### Fase 3 — Biblioteca de referencias (Reels)
El cliente guarda los Reels que más le gustan (propios o de inspiración) para poder recrearlos más adelante.

El sistema analiza **todos** los Reels guardados por el cliente y les asigna una **escala/puntuación de viralización**, de modo que pueda recomendarle cuáles de sus propios guardados tienen más potencial antes de invertir en recrearlos. Esto es un análisis previo sobre las referencias guardadas, distinto del de la [Fase 5](#fase-5--predicción-de-viralidad), que evalúa el diseño del Reel ya construido por Society.

### Fase 4 — Análisis del Reel de referencia
Se descompone cada toma del Reel guardado: ángulo de cámara, movimiento, y qué aparece en cada fragmento. Este análisis es la base para construir el prompt del nuevo contenido.

### Fase 5 — Predicción de viralidad
El análisis se pasa por [virality-predictor de Higgsfield](https://higgsfield.ai/apps/virality-predictor), que evalúa el diseño del Reel y sugiere mejoras para maximizar el enganche.

### Fase 6 — Propuesta de guiones
Con la estructura del Reel ya definida, se generan **3 guiones alternativos** adaptados al nicho del cliente, cada uno con un objetivo distinto.

### Fase 7 — Imágenes de plantilla
Elegido el guion, se generan las imágenes base que servirán de plantilla para los vídeos, respetando la estética del local y el guion. El cliente puede modificarlas a su gusto (incluyendo el ángulo).

### Fase 8 — Producción del vídeo final
Se generan los vídeos a partir de las plantillas **sin mostrar los clips sueltos al cliente**: la entrega es directamente el Reel montado. El montaje se realiza preferiblemente con **After Effects**, siguiendo el guion y el análisis previo del vídeo de referencia, con un acabado profesional.

## 6. Componentes técnicos clave

| Componente | Función |
|---|---|
| `directoria-cloud` | Skill que construye los prompts (JSON) e directrices para generación de imagen y vídeo, evitando alucinaciones |
| Higgsfield — *3D Jutsu* | (Candidato) mapeo/vídeo 3D del local para mayor realismo |
| Higgsfield — *Virality Predictor* | Evaluación y mejora del diseño del Reel antes de producirlo |
| After Effects | Montaje profesional del Reel final — *ya automatizado por MCP en el caso real de Torre de Vega (2026-09-08)* |
| Higgsfield — *AI Motion Designer* | (Candidato, en evaluación desde 2026-09-14) agente que construye rótulos, placas y transiciones dentro de la composición de After Effects |

## 7. Decisiones pendientes

- **Vídeo vs. mapeo 3D del local**: si el mapeo 3D aporta suficiente fidelidad frente a la complejidad de automatizarlo.
- **Nivel de automatización del montaje**: cuánto del proceso en After Effects puede/debe automatizarse vs. quedar como paso semi-manual. *Actualización 2026-09-14: en el caso real el ensamblado ya está automatizado; la decisión abierta se ha desplazado a los gráficos (rótulos, placas) y a si se delegan en un agente como AI Motion Designer — ver `caso-practico-01` §6.*
- **Stack técnico final**: aún no definido (curso centrado en React, TypeScript y Angular — ver [`README.md`](./README.md)).
- **Modelo de datos y almacenamiento** de vídeo/imagen por cliente (posible uso de Supabase / Cloudflare R2, en base a experiencia previa de Víctor).

## 8. Fuera de alcance (por ahora)

*(sección a completar: qué queda explícitamente fuera del MVP del TFG, para no diluir el foco del proyecto)*
