<!-- society-document -->
> **Estado:** vigente. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../README.md).

# Prompt para Higgsfield · Bocetos de la app Society

Genera bocetos de pantallas de Society con la estética de la referencia de la app de viajes: modo oscuro,
acento verde lima y tarjetas redondeadas con foto a sangre. Las pantallas y los textos salen de
[flujo vigente de Society](../informes/Society_flujo_de_la_aplicacion.md) (alta, catálogo, calendario, revisión y panel; la carpeta antigua fue retirada).

Son **bocetos de dirección visual**, no el diseño final. Los textos que salgan mal se corrigen después en
Figma o en el código.

## Configuración

| Parámetro | Valor |
|---|---|
| Modelo | `nano_banana_pro`, con resolución `2k` |
| Proporción | `4:3`, como la referencia: tres móviles por imagen |
| `medias[]` | `@image1` = captura de la app de viajes (solo estilo) |
| Lote | Los 3 prompts de abajo, uno por imagen. Comprobar el coste antes con `get_cost` |

Antes de lanzarlo, comprobar que el modelo sigue disponible y que admite imagen de referencia: el catálogo
cambia y en el Reel 09 `nano_banana_pro` devolvió `nano_banana_2`. Anotar el modelo que devuelva.

## Bloque fijo de estilo (igual en los tres prompts)

```text
STYLE — copy ONLY the visual language of @image1, never its content: @image1 is a travel app and governs only
the UI style, colour palette, typography feel, corner radii, spacing and the presentation layout. No travel
content, beaches, islands or travel text from @image1 may appear.
- Presentation: three iPhone 15 Pro mockups with Dynamic Island, standing side by side, front view, the middle
  phone slightly higher, on a plain very light grey studio background (#EDEDED) with soft realistic shadows.
  Dribbble-style product shot, crisp, high resolution.
- Theme: dark mode. Screen background near-black charcoal (#141414); cards and input fields dark grey (#232323)
  with 20-28 px rounded corners; text white (#FFFFFF) and secondary text light grey (#9A9A9A).
- Accent: a single neon lime green (#D7F20F) used only for primary buttons, the active navigation item,
  selected filter chips and small highlights. Buttons with the lime fill use black text.
- Typography: clean geometric sans-serif similar to Urbanist or Outfit; bold, large headings; small readable
  body text; generous letter spacing on labels.
- Components: pill-shaped buttons and chips, circular icon buttons (bell, filter, back, heart), large photo
  cards with full-bleed images and a dark gradient at the bottom holding the card title, small pill badges over
  photos, a floating pill-shaped bottom navigation bar with five outline icons and the active one inside a lime
  circle.
- Photography inside the screens: warm, appetising, realistic photos of Mediterranean restaurant food and a
  cosy restaurant dining room (grilled meat, seasonal dishes, wine glasses, rustic tables). Generic, no
  recognisable real restaurant, no logos, people allowed; use an approved character sheet for a protagonist.
- All UI text in Spanish, short, sharp and correctly spelled, exactly as written in quotes below. No other text.
```

## Negativos (igual en los tres prompts)

```text
NEGATIVE: no travel imagery, no beaches, no islands, no sea, no prices in dollars, no English UI text,
no lorem ipsum, no garbled or misspelled letters, no extra words not listed, no brand logos (no Instagram,
no Google logos), no real restaurant names, no unapproved protagonist identity, no light mode, no second accent colour, no gradients on
buttons, no glassmorphism, no cartoon illustration, no 3D clay icons, no watermark.
```

## Prompt 1 · Inicio, campañas y detalle de campaña

`medias`: `@image1` (referencia de estilo). Prompt = bloque de estilo + esto + negativos.

```text
SCREENS (left to right):

Left phone — HOME. Top: small round avatar of a restaurant logo placeholder (simple lime monogram "S"), text
"Hola, Marta" and below it "Mi restaurante", a circular bell button with a small lime dot on the right. A dark
search field "Buscar campañas" with a circular filter button beside it. Horizontal chips: "Todas" (lime,
selected), "En revisión", "Activas", "Entregadas". Section title "Pendiente de ti" with a lime link "Ver todo".
One large photo card of a grilled steak on a rustic table with a small pill badge "2 piezas para aprobar",
card title "Menú de otoño" and a lime pill button "Revisar". Floating bottom navigation bar with five icons:
home (active, lime circle), megaphone, image gallery, store, bar chart.

Middle phone — CAMPAIGNS LIST. Header "Campañas" with a round lime "+" button. Chips "Esta semana" (selected),
"Mes", "Archivadas". Three stacked rounded cards, each with a square food photo thumbnail on the left, a title,
a date and a small status pill: "Menú de otoño · 28 sep · En revisión" (pill lime outline), "Noche de vinos ·
4 oct · Activa" (pill grey), "Reapertura · 16 sep · Entregada" (pill dark with lime check). Same floating bottom
navigation, megaphone active.

Right phone — CAMPAIGN DETAIL. Full-bleed hero photo of a seasonal dish with a circular back button top-left and
a round heart button top-right, title over the photo "Menú de otoño" and small label "Campaña · 28 sep".
Row of three small rounded info pills: "2 piezas", "1 cambio", "Fecha sin confirmar". Tabs as chips:
"Resumen" (lime), "Piezas", "Materiales", "Historial". Section "Pieza 1 · versión 2" with a small image
thumbnail and a short caption line. Bottom: a circular grey button with a chat icon and a wide lime pill button
"Aprobar esta versión".
```

## Prompt 2 · Nueva campaña, revisión de pieza y biblioteca

```text
SCREENS (left to right):

Left phone — NEW CAMPAIGN. Header "Nueva campaña" with a circular close button. A form on dark cards with small
grey labels and white values: "Ocasión" → "Menú de otoño", "Objetivo" → "Más reservas entre semana",
"Fecha" → "28 sep 2026", "Producto" → "Carrillada al vino tinto", "Acción" → "Reservar mesa". A progress
indicator of four small dots, the first two lime. Bottom wide lime pill button "Continuar".

Middle phone — PIECE REVIEW. Large rounded image card showing an Instagram-style square food photo (a plated
dish with a glass of red wine), a small pill badge "Versión 2" over it. Below: caption text block with two short
lines of Spanish copy. A comment bubble in dark grey: "Cambiar la foto del postre" with a small avatar and
"Ayer". Two buttons at the bottom side by side: a dark grey pill "Pedir cambios" and a lime pill "Aprobar".

Right phone — MATERIALS LIBRARY. Header "Materiales" with a round lime upload button. Chips "Todo" (selected),
"Platos", "Local", "Generadas". A grid of six rounded square photos of dishes and the dining room; on each photo
a tiny pill label in the corner, either "Real" (lime) or "Generada" (grey). Floating bottom navigation, gallery
icon active.
```

## Prompt 3 · Generación, calendario y resultados

```text
SCREENS (left to right):

Left phone — GENERATE VARIANT. Header "Nueva variante" with a back button. A rounded card showing the real
reference photo of a dish with a pill label "Referencia real". Below, a dark card with two rows: "Coste estimado"
→ "0,15 €" and "Límite de la campaña" → "5,00 €". A small grey note line "El resultado no se publica sin tu
aprobación". Bottom wide lime pill button "Generar propuesta".

Middle phone — DELIVERY CALENDAR. Header "Calendario". A compact month grid for "Octubre" in dark cards, with
three days marked by small lime dots and one day selected inside a lime circle. Below, two rounded rows with a
thumbnail each: "Menú de otoño · Programada" (pill grey) and "Noche de vinos · Publicada" (pill lime check).
A secondary button "Descargar piezas" with a download icon.

Right phone — RESULTS. Header "Resultados" and a chip row "Septiembre" (selected), "Agosto". Three large metric
cards in a row-wrapping grid: "Alcance 4,9k", "Clics 312", "Reservas 18", each with a small lime icon. A simple
lime line chart on a dark card with a light grey axis. A small grey footnote "Fuente: Instagram · introducido
a mano". Floating bottom navigation, bar chart icon active.
```

## Cómo revisar los bocetos

- **Estilo:** fondo casi negro, un solo acento lima, tarjetas redondeadas y barra inferior flotante.
- **Nada de la app de viajes:** si aparece una playa o texto en inglés, rehacer con «un solo cambio».
- **Texto:** comprobar cada palabra. Si sale mal, no regenerar solo por eso; se corrige en Figma.
- **Recorridos:** que las pantallas coincidan con `03-pantallas-y-recorridos.md`. Sobre todo, que ningún
  resultado generado aparezca como aprobado sin la acción del usuario.
- **Accesibilidad (RN05):** el lima sobre casi negro contrasta bien, pero el gris secundario puede quedarse
  corto. Medirlo en el diseño final.
