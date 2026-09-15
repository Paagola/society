# Reel en 3D con Blender — plan y estado

Encargo del cliente (2026-09-09): *"recrear un reel pero en blender… una escena profesional utilizando
el tier gratis de higgsfield conectado a blender para generar figuras, y tú vas a mejorarlo para que
quede natural"*.

---

## ✅ Vía elegida: PREVISUALIZACIÓN

Decidido con el cliente el 2026-09-09. No se hace un Reel 3D renderizado que se haga pasar por
metraje del local — eso rompe la regla 1. Se bloquean **los movimientos de cámara** dentro del
blockout, y el plano real se graba o se genera para encajar con ellos.

**Script listo:** [`previz_recorrido.py`](previz_recorrido.py). Se ejecuta sobre
`torre_de_vega_blockout.blend` (Scripting → Run Script). No necesita el MCP.

Cuatro planos bloqueados —entrada, arcos, comedor, mesa de la ventana— con focal, altura y duración
declaradas. Render Workbench en gris, 9:16, 30 fps. Todo lo que crea lleva prefijo `PREVIZ_` y se
borra solo al relanzar, así que **no toca el blockout**.

**No inventa coordenadas:** lee la caja del edificio y deduce el recorrido de sus dimensiones reales.

> ⚠️ **La escala sigue sin verificar** y eso limita la previz. En cuanto haya **una medida real en
> metros** (ancho de fachada o largo del comedor), se pone en `MEDIDA_REAL_M` al principio del script
> y todo se recalibra con un factor. Hasta entonces la altura de cámara de 1,60 m es una suposición.

## ⛔ El MCP de Blender: diagnosticado y arreglado (pendiente de recargar)

Daba `CONNECT_TIMEOUT` a los 30 s. **No era Blender ni `uvx`** — el servidor arranca en 3,2 s.

| | |
|---|---|
| Blender que corre | **5.2** |
| Quién sirve el puerto 9876 | La extensión `higgsfield_blender`, que empaqueta **`blender_mcp-1.0.0`** |
| Servidor que lanzaba Claude Code | `uvx blender-mcp` sin fijar → resolvía a **1.9.0** |

Addon 1.0.0 contra servidor 1.9.0: el servidor conecta al socket, manda un saludo que el addon no
entiende, se queda esperando y nunca completa su `initialize`. A los 30 s se abandona **dejando el
proceso vivo** — por eso se acumulaban seis o siete huérfanos, que eran el síntoma y no la causa.

**Arreglo aplicado** en `~/.claude.json`: `"blender-mcp"` → `"blender-mcp==1.0.0"`. Caché precalentada
(segundo arranque: 3,8 s). Requiere recargar la ventana de VSCode para que surta efecto.

> `~/.claude.json` lo reescribe Claude Code en vivo. Si el cambio se pierde, aplicarlo por CLI con
> `claude mcp`.

---

## ⚠️ El "tier gratis" no existe en esta cuenta

Verificado: `models_explore` devuelve **`unlim.available: false`**. La cuenta es **Plus con 772
créditos**, sin bolsa de generaciones gratuitas. Todo lo 3D se paga.

La buena noticia es que **hay un modelo casi gratis**, y no es el que parecería.

### Costes reales medidos (`get_cost`, no gasta nada)

| Modelo | Config | Créditos |
|---|---|---|
| **`sam_3_3d`** (Meta) | GLB texturizado | **1** |
| `tripo_h3_1_image_to_3d` | textura + PBR + `detailed` | 18 |
| `image_to_3d` (Meshy) | textura + PBR, 60k polys | 30 |

**`sam_3_3d` cuesta 1 crédito y ya devuelve el GLB texturizado.** Es 18 veces más barato que Tripo y
30 que Meshy. Para poblar una escena de atrezzo —platos, botellas, copas, barril, sillas— es la opción
obvia: **30 objetos por 30 créditos**.

Los caros solo se justifican en el objeto héroe del plano, si hace falta geometría fina.

> Ojo: `sam_3_3d` levanta **un solo objeto** por imagen. Hay que darle fotos de producto recortadas,
> no una mesa entera. Las fotos reales de `imagenes/comida/` sobre el barril valen tal cual.

---

## Qué hay ya construido (no rehacer)

| Fichero | Qué es |
|---|---|
| `torre_de_vega_blockout.blend` | **Blockout del local**: parcela, edificio, barra con los dos arcos, comedor, caseta de la parrilla, terraza. Trazado sobre el plano aéreo real |
| `..._BACKUP_restaurante_completo.blend` | Copia de seguridad de la versión completa |
| `higgsfield_assets/barril_de_vega.glb` | Barril de Cillar de Silos generado |
| `higgsfield_assets/rincon_chimenea_v3.glb` | Rincón de la chimenea, tercera iteración |
| `higgsfield_addon/higgsfield_chat.py` | Addon propio de Blender. **Genera imagen y vídeo, no 3D** — habría que ampliarlo si se quiere generar GLB sin salir de Blender |
| `Camara_Paseo_Comedor` | Cámara a 1,6 m ya colocada en el comedor |

**Lo que `NOTAS_MODELO.md` marca como no resuelto:** mobiliario real, ventanas y puertas, altura de
techo (se usó 3 m sin confirmar) y la posición exacta de la chimenea. Y **no hay ni una medida real
en metros** — la escala es arbitraria (1 px del plano = 0,025 m).

---

## La tensión que hay que resolver antes de gastar

El proyecto se sostiene sobre una regla: **que un cliente que entre al local no note ninguna
diferencia respecto a lo que vio en Instagram**. Y la regla 17 dice que **el acabado de estudio es
justo lo que delata la IA** — por eso se rechazó el grade cinematográfico y por eso la parrilla
generada se descartó por "muy falsa".

Un render 3D es sintético por construcción. Llevado a Reel de producto, es el camino más corto a que
cante. **Pero hay un uso donde el 3D gana de calle, y es el que las propias notas del modelo ya
apuntaban: la previsualización.**

### Las dos vías, y cuál recomiendo

**Vía A — Previz (recomendada).** Bloquear en Blender el movimiento de cámara del Reel: recorrido,
altura, focal, timing. Renderizar en gris, sin acabados. Eso da un guion de cámara exacto, y luego el
plano real se graba o se genera para que encaje. **Coste: casi cero.** Aprovecha el blockout que ya
existe y resuelve el problema que la regla 9 lleva señalando desde el principio — que los movimientos
de cámara no están pensados.

**Vía B — Reel 3D renderizado.** Escena completa con atrezzo generado, materiales, iluminación y
render final. Es lo que pide el encargo literal. Es viable, pero hay que asumir que **no cumple la
regla 1**: nada de lo que se vea existe físicamente. Solo tiene sentido como pieza declaradamente
gráfica —un plano imposible, un recorrido aéreo, una animación de marca—, nunca haciéndose pasar por
metraje del local.

---

## Plan de ejecución (Vía B, si se confirma)

### 1. Preparar las fotos fuente
Recortes de objeto único sobre fondo limpio, desde `imagenes/comida/` y `imagenes/vinos/`:
plato de barro con la carne, copa servida, botella de Cillar de Silos, pimientos, patatas.

### 2. Generar el atrezzo — `sam_3_3d`, 1 crédito por pieza
Máximo 2 trabajos simultáneos (límite del plan). Cada GLB se descarga a `higgsfield_assets/`.

### 3. Importar y montar en Blender
Sobre el blockout existente. Colocar en el comedor, junto a la chimenea, con la
`Camara_Paseo_Comedor` como punto de partida.

### 4. Lo que hay que arreglar a mano — aquí está el trabajo de verdad
Un GLB generado nunca queda natural recién importado. Lo que siempre falla:

- **Escala.** Vienen sin unidades. Hay que fijar una referencia real (un plato de 26 cm) y escalar
  todo lo demás contra ella.
- **Apoyo.** Los objetos flotan o se hunden. Origen al fondo y apoyo en la mesa.
- **Materiales.** La textura viene "quemada" con la luz de la foto original. Hay que separar el color
  base, bajar la especularidad del barro y subirla en la copa y el vino.
- **Densidad de malla.** `sam_3_3d` devuelve triangulación irregular. Remesh y suavizado en los
  bordes que se ven.
- **Iluminación.** Nada de tres puntos de estudio: **una sola fuente de ventana** con la temperatura
  neutra de la regla 9ter (~4300 K), y la chimenea como acento cálido puntual.
- **Cámara.** Focal larga (50-85 mm), altura de persona sentada, y el micro-movimiento de la regla 5
  — nunca cámara clavada.

### 5. Render
Cycles, 9:16, 1080×1920. Contraste plano y blancos neutros (regla 17): **no meter grade
cinematográfico en el compositor**.

---

## Bloqueos

1. **El MCP de Blender no conecta.** Arrancar Blender con el addon y reiniciar sesión.
2. **Decidir Vía A o Vía B.** Cambia por completo el trabajo y el resultado.
3. **Una medida real en metros del local.** Sin ella la escala sigue siendo arbitraria y cualquier
   cámara "a altura de persona" es una suposición. Vale el ancho de la fachada o el largo del comedor.
