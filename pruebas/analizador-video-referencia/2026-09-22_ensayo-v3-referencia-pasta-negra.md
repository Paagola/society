<!-- society-document -->
> **Estado:** histórico. **Fecha de revisión editorial:** 2026-09-22; no refecha la evidencia original.
> **Ámbito / a quién obliga:** documentación de Society. **Fuentes:** las citadas en el cuerpo; datos no reconsultados conservan su fecha y no quedan revalidados por esta edición.
> **Índice único y autoridad:** [README raíz](../../README.md).

> Registro histórico: no ejecutar sus instrucciones como política vigente. Conserva los hechos y fechas originales. Personas permitidas; protagonistas con ficha aprobada; Remotion vigente desde 17/09. Precios/modelos y conclusiones causales requieren contexto y verificación.

# Ensayo V3 — vía automatizada frente al método Ad Recreator

Ejecutado el **22/09/2026**. Primera ejecución real de [`plan-de-pruebas.md`](plan-de-pruebas.md), sobre
el vídeo V3 («Reel externo de referencia del sector», que el plan dejaba por elegir).

**Referencia:** `https://ar.pinterest.com/pin/90353536275336060/` — reel de cocina de un restaurante
italiano, plato protagonista de pasta negra al huevo con marisco.

---

## 1. Qué se ejecutó y qué no

| | Estado |
|---|---|
| Descarga del vídeo (`yt-dlp`, HLS, 14 fragmentos) | **Ejecutado** |
| Formato y códecs (`ffprobe`) | **Ejecutado** |
| Detección de cortes (`ffmpeg select=scene`) | **Ejecutado** |
| Extracción de fotogramas y lectura visual plano a plano | **Ejecutado** (modelo de visión) |
| Sonoridad EBU R128 y detección de silencios | **Ejecutado** |
| ViPE, ShotVL, SAM 3, SEA-RAFT, Depth Anything 3, WhisperX, PaddleOCR, beat_this | **No ejecutado** — no instalados (`torch`, `cv2`, `scenedetect`, `whisperx`, `paddleocr` ausentes en el Python 3.13.3 del sistema) |
| Ad Recreator (`/marketing-adapt-video`) | **No ejecutado** — no tiene API y el puente MCP `higgsfield-bridge` está sin autorizar en esta sesión |

**Sobre la segunda vía.** Ad Recreator no se puede lanzar desde aquí, así que lo comparado **no es
herramienta contra herramienta, sino método contra método**: se aplicó su contrato literal
(`ad-recreator-contrato.json`, 4.407 caracteres, `mode: instructions`) como procedimiento, sobre el
mismo vídeo y sin ver su salida. Todo lo que aparece abajo bajo «vía Ad Recreator» es el método
ejecutado a mano, no una respuesta del proveedor.

---

## 2. Vía automatizada — capa medida

Sustituciones respecto a la pila del informe: `ffmpeg select=scene` en lugar de PySceneDetect,
lectura visual directa en lugar de ShotVL + SAM 3 + PaddleOCR, `ebur128` en lugar de beat_this.

### 2.1 Formato

| Dato | Valor |
|---|---|
| Duración | **26,581 s** |
| Resolución | 720 × 1280 (9:16) |
| Fotogramas | 797 a 30 fps |
| Códecs | H.264 + AAC 44,1 kHz estéreo |
| Tasa | 2.024.604 bps · 6,73 MB |

### 2.2 Cortes

**35 cortes detectados** (umbral `scene > 0,25`), ritmo medio **0,76 s por plano**.

```
0,300  0,600  0,700  0,900  1,100  1,467  1,800  2,300  3,033  3,800
4,567  5,300  6,833  7,600  8,800  9,400 10,033 10,833 11,433 12,100
13,300 14,533 15,600 16,400 17,233 18,033 18,833 19,667 20,467 21,500
22,367 23,200 24,067 24,900 25,767
```

Dos hallazgos que solo aparecen al medir:

1. **Ráfaga de apertura.** Cinco cortes en el primer segundo (0,30 · 0,60 · 0,70 · 0,90 · 1,10).
   Intervalos de 0,1–0,2 s: es un *flash cut* de montaje, no planos narrativos.
2. **Rejilla metronómica en el tercio final.** De 17,2 s al final, los intervalos son
   0,80 · 0,80 · 0,834 · 0,80 · 1,033 · 0,867 · 0,833 · 0,867 · 0,833 · 0,867 — media **0,853 s** con
   desviación de **0,065**. El montaje está **bloqueado al pulso de la música**, equivalente a unos
   **70 BPM**. La primera mitad es irregular (desviación 0,211); la segunda, no.

### 2.3 Audio

| Medida | Valor | Lectura |
|---|---|---|
| Sonoridad integrada | **−12,0 LUFS** | Muy por encima del −14 LUFS de plataforma: masterizado para sonar fuerte |
| Rango de sonoridad (LRA) | **3,3 LU** | Extremadamente comprimido |
| Pico real | **+4,7 dBFS** | Recorta |
| Silencios ≥0,3 s a −35 dB | **ninguno** | Lecho continuo, sin huecos |

**Inferencia, no medición:** un LRA de 3,3 LU sin un solo silencio es impropio de una locución y
propio de una pista musical sola. Sugiere **que no hay voz en off**. `WhisperX` lo zanjaría; sin esa
capa queda como hipótesis.

### 2.4 Rótulos

**Ninguno.** En los 33 fotogramas inspeccionados no aparece un solo texto superpuesto. El único texto
en pantalla es la **carta física** que se filma sobre la mesa (≈2,3 s), que además hace de cartel de
producto sin ser un rótulo.

### 2.5 Contenido plano a plano

| Tramo | Qué se ve |
|---|---|
| 0,0–1,1 s | Ráfaga: tenedor levantando pasta negra del **plato terminado**, sartén, destello dorado, sartén con salsa burbujeando |
| 1,1–3,0 s | Pasta negra en sartén · **carta abierta**, un dedo recorriendo los nombres de los platos |
| 3,0–4,6 s | **Impresora de comandas** escupiendo el ticket · guante negro arrancándolo |
| 4,6–7,6 s | Olla al fuego · aceite cayendo en la sartén |
| 7,6–12,1 s | **Llamarada** · guante echando marisco · salteado · botella de vino al sofrito · sazonado |
| 12,1–17,2 s | Salsa reduciendo · **araña metálica metiendo la pasta negra** · queso rallado · salteado final |
| 17,2–22,4 s | **Emplatado**: pinzas, aceite en hilo, albahaca, tomate seco |
| 22,4–26,6 s | **Sala**: plato en mesa vestida, mano de comensal, tenedor enrollando, bocado |

**Look:** *teal & orange* muy marcado, luz dura de cocina con mucho contraluz, profundidad de campo
mínima, cámara a centímetros del producto y casi siempre en movimiento.

---

## 3. Vía Ad Recreator — el método aplicado

De los diez apartados de análisis del contrato, los que cambian la decisión:

| Apartado | Lectura | Tipo |
|---|---|---|
| **Hook** | El primer segundo enseña **el resultado**, no el proceso: tenedor levantando la pasta terminada. Promete «mira cómo se hace esto que ya te ha entrado por los ojos» | Observado |
| **Mapa de beats** | **7 beats**, no 35: (1) resultado adelantado, (2) la carta elige, (3) entra la comanda, (4) fuego, (5) la pasta se incorpora, (6) emplatado, (7) el comensal lo come | Interpretado |
| **Mensajero** | Nadie. No hay cara, no hay voz: el mensajero es **la cocina misma**, representada por un guante negro | Observado |
| **Conciencia de audiencia** | Alta: no explica qué es la pasta negra ni cuánto cuesta. Da por hecho que el espectador ya desea ese tipo de comida | Interpretado |
| **Arquitectura persuasiva** | **Prueba por proceso**: el argumento es «esto se cocina de verdad, delante de ti, ahora». No hay promesa verbal que verificar porque no hay una sola palabra | Interpretado |
| **Revelación del producto** | Doble: adelantada en el segundo 0 y consumada en el 22,4 con el comensal. El 84 % de la pieza es camino entre las dos | Observado (tiempos medidos) |
| **Diagnóstico** | Lo que hace funcionar esto no es el montaje rápido, es **el cierre**: la pieza no acaba en el plato bonito, acaba en alguien comiéndoselo | Hipótesis de rendimiento |

### Los cinco apartados de adaptación a Torre de Vega

1. **Qué se transfiere:** el arco comanda → fuego → emplatado → comensal, el resultado adelantado en
   el primer segundo y el cierre en boca. **Qué no:** la rejilla de 0,853 s y los 35 cortes, que son
   una decisión de su editor sobre su música, no un mecanismo persuasivo.
2. **Traducción del deseo:** allí es «comida de cocina abierta que se hace al momento»; en Torre de
   Vega el equivalente verdadero es «casi 50 años haciéndolo igual», que es otro argumento y pide
   otro gesto — brasa y leña, no llamarada de sartén.
3. **Mensajero:** el guante negro se traduce a las manos del personal con el uniforme real
   (regla 21). Si aparece alguien a cámara en el cierre, pasa a ser protagonista y **exige ficha de
   personaje** (reglas 2 y 18).
4. **Ajuste de conciencia:** el cliente de Torre de Vega ya conoce el sitio; se puede omitir la
   presentación y no hace falta explicar el plato.
5. **Revisión de afirmaciones:** la pieza no afirma nada verbalmente, así que no hay nada que
   suavizar. Ventaja heredada: **un reel sin texto no puede mentir**, y encaja con la regla 1.

Los ocho entregables previos a producción (concepto, ficha de mensajero, cinco hooks, guion
temporizado, tres intensidades de CTA, pack de rótulos, plan de producción y plan de prueba) no se
redactan aquí: este ensayo compara métodos, no produce una pieza.

---

## 4. La diferencia, que es la conclusión del ensayo

**La pila automatizada mide la rejilla. El método mide el argumento. Ninguno sustituye al otro, y
usados por separado fallan de formas distintas.**

Lo que solo dio la pila: los 35 timestamps exactos, la rejilla de 0,853 s con desviación de 0,065 (a
ojo es invisible), el −12,0 LUFS, el +4,7 dBFS de recorte, la ausencia total de rótulos. Nada de eso
se puede estimar mirando.

Lo que solo dio el método: que los planos son 35 pero **los beats son 7**, que el mensajero es la
cocina y no una persona, que el hook adelanta el resultado, y que el cierre en boca es lo que hay que
copiar.

### El error que esto evita, en dinero

Si a la IA que organiza el vídeo se le pasa la salida de la pila sin la capa de interpretación, lee
35 cortes y pide 35 planos. Con los precios medidos del proyecto:

| Escenario | Planos | Segundos generados | Créditos | Coste |
|---|---|---|---|---|
| **A · copiar los 35 cortes** | 35 × Kling 3.0 pro 3 s | **105 s** para un reel de 26,6 s | 363,1 | **18,16 USD** |
| **B · producir los 7 beats** | 4 × Kling 3 s + 1 multitoma Seedance 10 s | 22 s | 191,5 | **9,58 USD** |

Supuestos: `nano_banana_pro` 2K a 2 créditos por imagen y Kling 3.0 pro 3 s a 5,25 créditos (medidos
en el Reel 09); multitoma Seedance 2.5 1080p 10 s a 90 créditos (medida en el Reel 09); factores de
reintento 1,5 vídeo y 1,25 imagen del informe de viabilidad; 1 crédito = 0,05 USD.

**A cuesta 1,9 veces B por copiar montaje superficial y perder el argumento** — exactamente el fallo
del que avisa el contrato de Higgsfield. Es la justificación económica de la capa de interpretación.

> **Inconsistencia detectada de paso:** el repositorio maneja dos equivalencias de crédito
> incompatibles — 90 cr ≈ 4,50 USD (0,050 USD/cr, informe de viabilidad) y 1,5 cr = 0,094 USD
> (0,063 USD/cr, tarifa de la API del 19/09). Son un **25 % de diferencia**. Con la segunda, A sube a
> 22,77 USD y B a 12,01 USD. Hay que resolverlo antes de fijar precios de plan.

### Coste de analizar

| Vía | Coste de proveedor | Automatizable |
|---|---|---|
| Pila automatizada | **0 USD** (todo local) | Sí |
| Ad Recreator | No facturable aparte | **No** — solo existe en interfaz de chat |

El coste real de Ad Recreator no es dinero, es que **no se puede meter en un backend**: cada pieza
exigiría a una persona abriendo un chat.

---

## 5. Tiempos

### 5.1 Medidos aquí (Ryzen/ffmpeg 9.0.1, sin GPU)

| Paso | Tiempo real |
|---|---|
| Descarga del vídeo (14 fragmentos HLS) | 2,0 s |
| `ffprobe` de formato | 0,17 s |
| Detección de los 35 cortes | 0,90 s |
| Extracción de 33 fotogramas escalados | 0,89 s |
| Sonoridad EBU R128 | 0,88 s |
| **Capa medida completa** | **≈ 4,8 s** |

A esto se suma la lectura visual del modelo, que en esta sesión fueron tres láminas de contactos.

### 5.2 Estimados — **el repositorio no contiene ningún tiempo de producción medido de punta a punta**

Los números de abajo son un modelo con supuestos explícitos, no mediciones. El único dato de latencia
del repo es cualitativo: en el ensayo del 15/09 «Seedance permaneció bastante tiempo en proceso», sin
cifra. El render de Remotion se estima en 5 minutos en el informe de viabilidad, y el propio informe
del Reel 09 dice que **la duración real del render no se midió**.

| Ruta | Análisis | Guion | Generación | Montaje | Puertas humanas | Total estimado |
|---|---|---|---|---|---|---|
| **Manual, como Torre de Vega hoy** | 20–40 min a ojo | 30–60 min | 35 planos secuenciales | 30–60 min | 2 aprobaciones | **medio día a un día** |
| **Ad Recreator en chat** | incluido | incluido | 1 producción + hasta 2 correcciones | en su sandbox | 1 persona presente todo el rato | **1–2 h de persona ocupada** |
| **Society automatizado (objetivo)** | **4,8 s** medidos + GPU de la pila completa | 1 llamada de LLM | 5 trabajos en paralelo | render sin persona | 2 puertas asíncronas | **minutos de máquina + 2 esperas humanas** |

La diferencia de fondo entre la segunda y la tercera fila no es la velocidad de la máquina: es que en
Ad Recreator **hay una persona ocupada de principio a fin**, y en Society solo se la necesita en dos
puertas de aprobación. Eso es lo que escala a 20 restaurantes y lo que no.

---

## 6. Qué queda pendiente

1. **Instalar la pila real y repetir este ensayo** con ViPE, ShotVL, SAM 3, SEA-RAFT, WhisperX,
   PaddleOCR y beat_this, y comparar sus salidas con lo que aquí se obtuvo con ffmpeg + visión. Es la
   pregunta 4 del plan de pruebas y sigue sin responder.
2. **Confirmar si hay voz en off** con WhisperX. Hoy es una inferencia del LRA.
3. **Cronometrar de verdad** una producción de punta a punta, registrando latencia por trabajo. Sin
   eso, cualquier promesa de plazo al cliente es inventada.
4. **Resolver la equivalencia de crédito** (0,050 frente a 0,063 USD).
5. **Decidir la capa de personas** de la pila, que sigue sin opción comercial limpia verificada y que
   ahora importa más: esta referencia cierra con un comensal en cuadro, y ese cierre es justo lo que
   el método dice que hay que copiar.
