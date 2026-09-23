<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** cliente Torre de Vega; no regla universal de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Reel 03 · "LO HACEMOS / LO DISFRUTAS" — guion y montaje

Plantilla base: `plantillas/2026-09-08/01_we-make-you-enjoy_cocina-a-mesa_10s.mp4`
(hook 31 · overall 45 · viral 43 — la única del lote que pasa el filtro de contenido limpia).
Ranking completo en [`informes/2026-09-08_ranking-viralidad-plantillas.md`](../05-informes-medidos/2026-09-08_ranking-viralidad-plantillas.md).

**Duración: 10 s · 1080×1920 · 30 fps · sin audio generado** (va con música de Instagram).

---

## 1. La estructura: pantalla partida, no tres actos

Lo que hace funcionar a la plantilla —y que no se ve en un contact sheet— es que **los primeros
6 segundos son dos franjas horizontales corriendo a la vez**, cada una con su propio rótulo. Solo el
cierre es a pantalla completa.

```
┌─────────────────────────┐  y = 0
│                         │
│   BANDA SUPERIOR        │   La parrilla · vídeo real
│   "LO HACEMOS"          │   864 px de alto
│                         │
├─────────────────────────┤  y = 864
│      (filete 8 px)      │
├─────────────────────────┤  y = 872
│                         │
│   BANDA INFERIOR        │   La sala · vídeo generado
│   "LO DISFRUTAS"        │   864 px de alto
│                         │
└─────────────────────────┘  y = 1736 … 1920 margen inferior
```

Es el mismo mecanismo que dispara la plantilla 06 hasta **56 de potencial viral**: rótulos sobre el
producto **y dos cosas a la vez**. La 01 ya lo traía de serie.

---

## 2. Timeline

| t | Banda superior — LO HACEMOS | Banda inferior — LO DISFRUTAS | Rótulo |
|---|---|---|---|
| 0,0 – 2,0 | Brasa y llama, plano abierto | Plato de carne, push-in | Entran **LO HACEMOS** y **LO DISFRUTAS** |
| 2,0 – 4,0 | Chuletón en la rejilla, humo | Vino cayendo en la copa | — |
| 4,0 – 6,0 | La mano voltea con las pinzas | Tenedor levantando el trozo | Entra **CHULETÓN A LA BRASA** |
| 6,0 – 10,0 | **Pantalla completa:** el camarero saliendo con el plato | Placa de cierre: **TORRE DE VEGA · EL MORA** + **CILLAR DE SILOS · RIBERA DEL DUERO** |

### Qué clip va en cada hueco

| Hueco | Fichero | Notas de recorte |
|---|---|---|
| Superior 0–6 s | `imagenes/parrilla/clips/parrilla_volteo_master_4k60.mp4` | 2160×3840 a 60 fps, 6,82 s. **Cubre los 6 s de un tirón, sin cortes.** Se recorta a la banda y sobra resolución para reencuadrar |
| Inferior 0–2 s | `…/videos/v01_carne-cortada_pushin.mp4` | Push-in ya incorporado |
| Inferior 2–4 s | `…/videos/v02_vino_cayendo.mp4` | Entrar en el segundo 1 del clip, con el chorro ya cayendo |
| Inferior 4–6 s | `…/videos/v03_tenedor_levanta.mp4` | — |
| Pantalla completa 6–10 s | `…/videos/v05_camarero_andando.mp4` | Dura 5,87 s; se estira o se congela el último medio segundo bajo la placa |

*(`…/videos/` = `imagenes/generadas/reel_03_lo_hacemos_lo_disfrutas/videos/`)*

**Reserva, por si un plano no encaja:** `00_parrilla_apertura.png`, `04_botella_frontal.png` y los
fotogramas de `imagenes/parrilla/`.

---

## 3. Tipografía — la aprobada, sin tocar

De `documentación.md` §7, validada el 2026-09-08 tras rechazar la alternativa pesada.

> ⚠️ **Actualizado el 2026-09-08: de Regular a `BodoniMT-Bold`** (*"un poco más gruesa"*).
> **`BodoniMTBlack` sigue rechazado.**

| Elemento | Fuente | Tamaño | Tracking | Color |
|---|---|---|---|---|
| Rótulos de banda (`LO HACEMOS`, `LO DISFRUTAS`) | `BodoniMT-Bold` | 70 px | 400 | Blanco tiza `[0.96, 0.955, 0.93]` |
| Llamada a la acción (`VEN Y PIDE EL TUYO`) | `BodoniMT-Bold` | 52 px | 340 | Blanco puro |
| Marca de cierre (`TORRE DE VEGA`) | `BodoniMT-Bold` | 40 px | 640 | Blanco puro |

**El "efecto pizarra" se hace con textura, no con caja.** Los rótulos llevan `ADBE Roughen Edges`
(`Border 3`, `Scale 45`) que pulveriza el borde de las letras como la tiza, y el color no es blanco
puro sino un blanco tiza roto. Nada más.

### ❌ Dos intentos rechazados por el cliente, y por qué

| Intento | Qué se hizo | Veredicto |
|---|---|---|
| **Fuente manuscrita** | `SegoePrint-Bold` a 88 px, tracking 40 | *"No me termina de gustar, quiero algo más profesional"*. Una fuente de mano sola lee naíf, no de pizarra |
| **Panel de pizarra** | Rectángulo de pizarrín oscuro con filete de tiza detrás de cada rótulo | *"Así queda horrible la tipografía"*. **Una caja sobre el vídeo siempre lee como rótulo de telediario**, por muy bien construida que esté |

**La regla que sale de aquí:** el carácter de un rótulo se consigue con **tipografía, color y textura
del propio texto**, nunca metiendo un contenedor entre el texto y la imagen. Es la misma lógica que ya
decía la tipografía aprobada: *lo premium se consigue restando*.

**Eliminado a petición del cliente:** el rótulo `CHULETÓN A LA BRASA` de 4-6 s y su degradado.

- Blanco puro, **sin contorno** (`applyStroke: false`).
- Legibilidad por `ADBE Drop Shadow`: `Distance 0 / Softness 70 / Opacity 200`.
- Filete horizontal de 2 px al 70 % entre titular y marca.
- Animación: fade 0,45 s + subida de 14 px, filete dibujándose desde el centro, entradas escalonadas
  ~0,12 s.

> **Lo rechazado:** `BodoniMTBlack` a 128 px con contorno negro de 13 px. **Lo premium se consigue
> restando**: peso fino, tamaño pequeño, tracking enorme, sombra suave en vez de borde.

**Contraste texto/fondo (regla del cliente):** el color depende del plano que va debajo. Blanco solo
sobre plano oscuro o medio. La banda de la parrilla es oscura → blanco perfecto. **La banda de abajo es
clara** (mantel crema, luz de día) → ahí el titular puede perderse: comprobar renderizando frames **del
tramo entero** en que el texto está visible, no solo el primero. Si no contrasta: moverlo de zona,
recolocarlo en el tiempo o degradado sutil — **nunca subir el contorno**.

---

## 4. Especificación de montaje en After Effects

### 4.1 Composición

| | |
|---|---|
| Nombre | `REEL_03_LO_HACEMOS` |
| Tamaño | 1080 × 1920 |
| Frame rate | 30 |
| Duración | 10 s |
| Fondo | negro |

### 4.2 Las dos bandas

Cada banda es una **precomposición de 1080 × 864** con su clip dentro, colocada con máscara o con
`Position` + `Scale`:

- `BANDA_SUP` → posición Y centrada en 432
- `BANDA_INF` → posición Y centrada en 1304
- Filete de 8 px (sólido negro) entre ambas, en Y 868

**Conformado de cada clip:**

| Clip | Origen | Qué hacer |
|---|---|---|
| Parrilla | 2160×3840 | Escalar al 50 % → 1080×1920, y encuadrar la rejilla dentro de los 864 px de banda. Sobra material: mover el encuadre en vez de escalar más |
| Carne, vino, tenedor | ~1080×1912 / 1076×1928 | Escalar a 1080 de ancho y recortar a la banda centrando el sujeto |
| Camarero | 1080×1910 | Pantalla completa: escalar a 1080×1920 (estira 10 px, imperceptible) |

### 4.3 Cadencia — ojo con esto

Los clips generados vienen a **24 fps** y el master de la parrilla a **60 fps**, sobre una comp de
**30 fps**. Interpretar cada metraje:

- Parrilla 60 fps → **conformar a 30 fps** da cámara lenta al 50 % limpia, sin interpolar. Es un
  regalo: el volteo con la llama a media velocidad.
- Clips a 24 fps → dejar a 24 y activar **Frame Blending** en modo `Pixel Motion` solo si se nota el
  juddering. Probar antes sin él.

### 4.4 Movimientos de cámara — los que faltan van aquí, gratis

Los clips ya traen el movimiento del sujeto. **Los recorridos de cámara que falten se hacen en AE con
keyframes de `Scale`/`Position`, no se pagan en Higgsfield.** Regla 9: variar el tipo entre planos.

| Plano | Movimiento | Cómo |
|---|---|---|
| Parrilla 0–6 s | Push-in lento del 8 % | `Scale` 100 → 108 en 6 s, ease suave |
| Carne 0–2 s | Ya lo trae | Nada |
| Vino 2–4 s | Quieto | Contrasta con los de al lado |
| Tenedor 4–6 s | Deriva lateral del 4 % | `Position` X, parallax sutil |
| Camarero 6–10 s | Pull-back del 6 % | `Scale` 106 → 100, abre para la placa |

### 4.5 Orden de capas (de arriba abajo)

```
1  TXT_placa_cierre        (6,2 – 10,0 s)
2  TXT_chuleton_a_la_brasa (4,0 – 6,0 s)
3  TXT_lo_disfrutas        (0,3 – 6,0 s)
4  TXT_lo_hacemos          (0,3 – 6,0 s)
5  FILETE_negro_8px        (0,0 – 6,0 s)
6  BANDA_INF               (0,0 – 6,0 s)
7  BANDA_SUP               (0,0 – 6,0 s)
8  CAMARERO_fullframe      (6,0 – 10,0 s)
9  BG_negro
```

### 4.7 Transición de las bandas al plano vertical (5,8 → 6,15 s)

Pedida por el cliente el 2026-09-08: *"entre los dos vídeos y el vídeo en vertical debería haber una
transición"*. Sustituye al corte seco.

**Las dos bandas se abren y dejan ver el plano vertical detrás**, como dos hojas que se separan:

| Capa | 5,8 s | 6,15 s |
|---|---|---|
| `SUP_parrilla` | `Position [540, 478]` | `Position [540, -560]` — sale por arriba |
| `INF_3_tenedor` | `Position [540, 1442]` | `Position [540, 2480]` — sale por abajo |

- Easing `easyEase` en el primer keyframe: arranca suave y acelera al salir.
- `FULL_camarero` entra en **5,7 s** (`startTime` 5,7 también, así el clip empieza por su fotograma 0),
  para estar ya debajo cuando las bandas se separan.
- Rótulos, degradados y filete terminan en **5,78 s**, justo antes de que empiece el movimiento, para
  que no viajen con las bandas.
- **Motion blur activado** en la comp y en las dos capas que se mueven. Sin él el barrido se ve a
  saltos; con él lee como un movimiento de cámara real.

> ⚠️ **Trampa que costó una versión.** `CAM_recorte_plato` —la copia enmascarada que hace el efecto de
> la placa saliendo del plato— está en la **capa 1**, y su máscara cubre todo el cuadro por encima del
> plato. Si entra antes de que termine la transición, **tapa la banda superior justo mientras sube** y
> el movimiento se ve cortado. Detectado por el cliente: *"el vídeo que se va hacia arriba... con el
> efecto de capas del texto se corta"*.
>
> **Solución:** su `inPoint` va a **6,15 s** (cuando las bandas ya han salido), manteniendo
> `startTime` en 5,7 para que siga sincronizada con `FULL_camarero`. Solo tiene que existir mientras
> el texto cruza por detrás del plato (6,2 – 7,5 s).
>
> **Regla general:** una capa de recorte que va arriba del todo solo debe estar activa en el tramo
> exacto en que hace falta. Si se deja encendida antes, se come lo que haya debajo.

### 4.6 Render

H.264, 1080×1920, 30 fps, ~12 Mbps, sin audio → `visible_cliente/reel_03_lo-hacemos-lo-disfrutas.mp4`

---

## 4bis. La placa de cierre sale de detrás del plato

Pedido por el cliente el 2026-09-08. El rótulo `TORRE DE VEGA` no aparece con un fade: **emerge de
detrás del plato que lleva el camarero**, con el centro saliendo el último porque sigue la curva del
plato.

**Cómo está montado — el truco es que las dos capas son el mismo clip:**

1. Se duplica `FULL_camarero` y la copia se llama `CAM_recorte_plato`, colocada en la capa 1.
2. `TXT_placa` va **entre las dos**, en la capa 2.
3. La copa de arriba lleva una **máscara que cubre todo el cuadro por encima del plato**, con el borde
   inferior trazando el arco de la parte de abajo del plato: vértices `(311,766) → (400,832) →
   (490,886) → (580,907) → (670,886) → (760,832) → (849,766)`, cerrando por las esquinas superiores.
4. El texto se anima en `Position` de `[540,700]` a `[540,1180]` entre 6,2 s y 7,5 s.

**Por qué la máscara puede ser tosca:** las dos capas son el mismo vídeo en el mismo instante, así que
donde la máscara corta por fuera del plato **los píxeles son idénticos y el corte es invisible**. Solo
importa la parte del borde por la que cruza el texto. Eso evita tener que rotoscopiar el plato.

Medido a 6,3 s el plato ocupa `x 298-867, y 611-909`; a 9,8 s `x 313-1051, y 725-1023`.

## 5. Después de renderizar

### ✅ Medido el 2026-09-08 — job `256c1aad-b06d-417e-95e4-71230eaacb86`

| | Hook | Overall | Viral | Sustain |
|---|---|---|---|---|
| **Reel 03 (este)** | **36** | **50** | **48** | 96 |
| Plantilla 01, la que copia | 31 | 45 | 43 | 95 |
| Plantilla 06, la más alta del lote | 36 | 54 | 56 | 100 |
| Plantilla 05 | 32 | 48 | 46 | 99 |
| Nuestro mejor Reel anterior | 40 | 38 | — | — |

**Supera a la plantilla que copia en las tres métricas** y queda por delante de todas las del lote
salvo la 06, empatando con ella en hook.

Dos cosas que confirman que las decisiones fueron las correctas:

- **El pico está en el segundo 0** (`peak_second: 0`), que es exactamente donde lo quieres en un Reel:
  la brasa engancha en el primer fotograma y no hay que esperar.
- **La red del lenguaje sube a 0,349 de media**, frente al 0,26-0,32 de las plantillas sin rótulos.
  La pantalla partida con los dos rótulos simultáneos está haciendo su trabajo.

*(Medido sobre el render previo a la mejora de la placa saliendo del plato. Ese cambio está en el
segundo 6,2, fuera de la ventana de hook (0-3 s), así que no mueve el hook_score; puede variar algo el
sustain. Re-medir es gratis si interesa.)*

Si en el futuro hubiera que subir el hook: probar abriendo directamente con la llamarada
(`parrilla_abierta_llamarada_sin-tarjeta.jpg`) en vez del plano general.

> **Aviso medido** (`memoria: techo-viralidad-reels-comida`): el montaje **no mueve el hook_score**.
> El techo lo pone el material. No gastar ciclos iterando el montaje esperando subir la nota.

---

## 6. Estado y bloqueos

**Material: completo.** Cinco planos aprobados por el cliente + el clip real de la parrilla.

| Bloqueo | Estado |
|---|---|
| After Effects no responde al MCP | ⛔ **Abierto.** Abrir AE con un proyecto y comprobar *Preferencias → Scripting y expresiones → Permitir que los scripts escriban archivos y accedan a la red*. Si hay un diálogo modal ("Attempt was made to run a second script"), cerrarlo: bloquea el scripting |
| Fuente `BodoniMT` instalada en el sistema | Por verificar antes de crear las capas de texto |
| Contraste del titular sobre la banda clara | Por verificar renderizando frames del tramo entero (§3) |
