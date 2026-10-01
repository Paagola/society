# Prompt de imagen para una escena de papel

Sale del paso 2 de la skill externa `motion-design` (Paper-Cut, en modo prompts). El prompt tiene dos partes: primero se describe la escena y después va el bloque de estilo, **tal cual**.

## Cómo describir la escena para que se corte bien

- **Planos separados.** Fondo liso arriba (cielo o pared), suelo abajo (liso o de piedras o baldosas) y figuras delante, sin que todo se amontone en el mismo plano.
- **Figuras delante del suelo,** para que la línea pared-suelo se vea al menos en algunas columnas.
- **Sin texto, letras, números ni logotipos** («No text, no letters, no numbers, no logos anywhere»). Los textos los pone Remotion.
- **Paleta de la identidad:** cobalto, papel crema, tinta, terracota y verde oliva, y amarillo solo en luces.
- **Si una pantalla o un móvil tienen que animarse aparte,** se piden lisos, por ejemplo un rectángulo cobalto con una forma crema, y el contenido se pone con una pantalla real de la app.
- **Modelo:** `gpt_image_2_5`, 9:16, 2K, calidad media (1 cr).

## Bloque de estilo (literal)

```
Built entirely from layered cut-and-torn paper pieces: every shape is a separate flat paper cutout with rough torn edges, visible paper grain and fibre texture, and a hard drop shadow beneath it. Small rough white negative-space slivers show between the pieces. Muted, tactile, slightly desaturated color treatment. A mosaic of overlapping paper facets, like a real handmade paper artwork photographed under soft directional light. No smooth gradients, no digital flatness, no glossy 3D — it must look like real cut paper.
```

Ejemplo completo en uso: [`produccion/society-papel-recortado/prompt-escena.txt`](../../../produccion/society-papel-recortado/prompt-escena.txt).
