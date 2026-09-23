<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Reel 09 — aprendizajes para Society y efecto en costes

Análisis del 17 de septiembre de 2026 sobre el [registro de producción](documentacion-completa.md).
Los importes parten del [informe de viabilidad §9 y §10](../../informes/Society_diseno_y_viabilidad.md)
y usan sus mismos supuestos (factor de vídeo 1,5, factor de imagen 1,25, 1 USD = 0,95 EUR, reserva del
20 %, 20 restaurantes). Solo se cambian las partidas que este ensayo afecta.

## 1. Qué se hizo distinto

| Cambio | Antes (reel de chuletón, 15/09) | Reel 09 (17/09) |
|---|---|---|
| Montaje | After Effects por MCP | **Remotion 4** (dentro de OpenMontage), composición vertical propia, render por línea de comandos |
| Planos complejos | Un clip de Seedance 2.5 de 6 s por plano | **Una multitoma** Seedance 2.5 `omni_reference` de 10 s con 3 keyframes → 3 planos con corte seco, **a la primera** |
| Planos simples | Kling 3.0 | Kling 3.0 Pro de **3 s**, 5,25 créditos, un intento cada uno |
| Referencia | Aportada | Buscada por palabra clave en Instagram (WebSearch + yt-dlp, sin login) |
| Rótulos | Colocación visual | Medición de píxeles claros por franja **y** revisión a tamaño real |

## 2. Coste real del reel

| Concepto | Créditos |
|---|---|
| 9 imágenes `nano_banana_pro` 2K (7 keyframes + 2 correcciones, incluido un plano descartado) | 18,00 |
| 1 multitoma Seedance 2.5 1080p 10 s | 90,00 |
| 3 clips Kling 3.0 Pro 3 s | 15,75 |
| 3 muestras de voz | 1,50 |
| Análisis de vídeo, predictor (fallido), Remotion, ffmpeg, yt-dlp, faster-whisper | 0 |
| **Total** | **125,25** |

Con la equivalencia que usa el informe de viabilidad (90 créditos ≈ 4,50 USD, [S21]), son **unos 6,3 USD**
de generación, desperdicio incluido. El modelo de viabilidad reserva 11,62 USD de generación para un reel
estándar en Higgsfield. **Es una sola pieza, en plan Plus y sin contrato para SaaS**: sirve como
contraste, no como tarifa.

## 3. Palanca 1 · Montaje sin After Effects (coste fijo)

La infraestructura fija del informe (178,05 EUR/mes) incluye **33,49 EUR** de licencia de After Effects y
**80 EUR** de reserva para un worker Windows. Remotion renderiza con Chrome headless en Linux, así que
ambas partidas desaparecen.

| | Antes | Con Remotion |
|---|---|---|
| Infraestructura fija mensual | 178,05 EUR | **64,56 EUR** |
| Por restaurante (20) | 8,90 EUR | **3,23 EUR** |

**Licencia de Remotion** (verificado en remotion.pro/license, 17/09/2026): gratis para particulares y
empresas de **hasta 3 personas**, uso comercial incluido. A partir de 4 personas, «Remotion for
Automators» cuesta **0,01 USD por render con un mínimo de 100 USD/mes**. Con Víctor solo, coste 0; si el
equipo crece, suma unos 95 EUR/mes y el ahorro fijo baja de 113 a unos 18 EUR/mes.

**Cómputo de render:** con las tarifas de Modal del informe, 5 minutos en 4 núcleos y 8 GiB cuestan unos
0,02 USD. Queda cubierto por la reserva de render de 0,35 USD por reel. La duración real del render **no se
midió** en el ensayo.

**OpenMontage es AGPL-3.0** (verificado en el repositorio). Usarlo como servicio de red modificado
obligaría a publicar el código. Society debe depender de **Remotion directamente**, no de OpenMontage;
en el ensayo, OpenMontage solo aportó el entorno y la composición se escribió aparte.

Además resuelve la decisión pendiente n.º 10 del README (licencia de After Effects en un SaaS): deja de
bloquear el lanzamiento.

## 4. Palanca 2 · Multitoma de Seedance 2.5 (coste variable)

Seedance cobra por segundo, así que la multitoma ahorra **segundos**, no tarifa: tres planos en 10 s en
lugar de 6 s por plano. El montaje final usó entre 1,9 y 2,4 s de cada plano.

Reel estándar del informe (4 planos simples + 2 complejos), sustituyendo los dos clips de 6 s por una
multitoma de 10 s y manteniendo el factor de reintento 1,5:

| Escenario Seedance 2.5 | Reel antes | Reel con multitoma | Ahorro |
|---|---|---|---|
| fal 1080p | 25,82 USD | 22,33 USD | −3,49 USD (−13,5 %) |
| fal 720p | 13,38 USD | 11,96 USD | −1,42 USD (−10,6 %) |
| Higgsfield 1080p | 12,97 USD | 11,62 USD | −1,35 USD (−10,4 %) |

Reel con **3 planos complejos**, como el Reel 09 (3 simples + 3 complejos):

| Escenario | Antes (3 × 6 s) | Multitoma 10 s | Ahorro |
|---|---|---|---|
| fal 1080p | 35,79 USD | 21,82 USD | **−13,97 USD (−39 %)** |
| fal 720p | 17,13 USD | 11,46 USD | −5,68 USD (−33 %) |
| Higgsfield 1080p | 16,51 USD | 11,11 USD | −5,40 USD (−33 %) |

**Límites:**

- **Una sola muestra.** Si un plano sale mal, se repite la multitoma entera: el riesgo por reintento es
  mayor que con clips sueltos. Por eso se mantiene el factor 1,5 aunque salió a la primera.
- Funciona con keyframes aprobados antes (`image_references`). El multi-shot de Kling no sirve para esto:
  solo acepta imagen inicial y final, y las tomas intermedias salen inventadas.
- Solo se probó en Higgsfield. Falta comprobar que `omni_reference` con varias referencias existe con el
  mismo comportamiento en fal.

## 5. Efecto conjunto por plan

Coste por restaurante y precio mínimo para un margen del 40 % (fórmula del informe §10.3). Plan 3 con 4
reels estándar (2 complejos) al mes.

| Plan | Escenario | Coste antes | Coste ahora | Precio mínimo antes | Precio mínimo ahora |
|---|---|---|---|---|---|
| 1 | — | 41,39 EUR | **35,72 EUR** | 72,62 EUR | **62,73 EUR** |
| 2 | fal 1080p | 82,18 EUR | **76,51 EUR** | 143,76 EUR | **133,86 EUR** |
| 2 | fal 720p | 76,28 EUR | **70,61 EUR** | 133,47 EUR | **123,58 EUR** |
| 2 | Higgsfield 1080p | 76,08 EUR | **70,41 EUR** | 133,12 EUR | **123,23 EUR** |
| 3 | fal 1080p | 200,46 EUR | **178,86 EUR** | 350,05 EUR | **312,38 EUR** |
| 3 | fal 720p | 137,84 EUR | **125,69 EUR** | 240,84 EUR | **219,65 EUR** |
| 3 | Higgsfield 1080p | 135,75 EUR | **123,92 EUR** | 237,19 EUR | **216,56 EUR** |

Planes 1 y 2 solo reciben el ahorro fijo (−5,67 EUR). El plan 3 suma la multitoma. Si los reels del plan
3 llevan 3 planos complejos, el ahorro de vídeo se multiplica por cuatro.

## 6. Aprendizajes de producción reutilizables

1. **Multitoma con keyframes:** «Shot 1 is @image1, shot 2 is @image2…», beats por tramo de tiempo y
   *hard cuts between shots*. N keyframes → N planos fieles.
2. **La métrica de píxeles claros no ve siluetas oscuras recargadas** (la lámpara detrás de un rótulo
   daba 0 %). Medir y además mirar el fotograma a tamaño real.
3. **Un encuadre de la plantilla que no existe en el local se quita del guion.** El botellero salió
   inventado dos veces; seguir gastando no lo arregla.
4. **Búsqueda de referencias:** YouTube devuelve contenido de restaurante horizontal. Instagram por
   `site:instagram.com/reel <plato>` + yt-dlp sí da verticales (8 búsquedas → 2 válidos).
5. **El modelo pedido no siempre es el servido:** `nano_banana_pro` devolvió `nano_banana_2` en las 9
   imágenes. Society debe registrar el modelo devuelto, no el pedido.
6. **Trampas técnicas de Remotion en Windows:** props JSON escritos por PowerShell 5.1 llevan BOM y
   Remotion no los lee; un fundido de 0 fotogramas rompe `interpolate`.
7. **Aviso de preset en Higgsfield** («IN THE DARK»): bloquea el envío hasta reenviar con
   `declined_preset_id`; no cobra.
8. **Material real gastado:** el cliente retiró el único clip real de parrilla por repetido. El banco de
   material real también se agota; Society debe llevar la cuenta de usos por recurso.
