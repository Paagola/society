# Prompt — Reel de Torre de Vega con OpenMontage

Copiar todo lo que hay debajo de la línea en una sesión de Claude Code abierta en la carpeta de
OpenMontage, **después de rellenar el bloque BRIEF**. Uso interno de la agencia: OpenMontage
(AGPL-3.0) se usa como herramienta para producir la pieza, no se integra en Society.

---

Vas a producir un Reel de Instagram para **Torre de Vega "El Mora"**, un asador rural con casi 50
años en Alhaurín. Usa el sistema de pipelines de OpenMontage (lee `AGENT_GUIDE.md` y sigue Rule
Zero), pero con las restricciones de este cliente, que **prevalecen sobre cualquier valor por
defecto, skill o playbook de OpenMontage** cuando choquen.

El principio que manda sobre todo lo demás: un cliente que entre en el local **no puede notar ninguna
diferencia** con lo que vio en el Reel. No se vende una fantasía; se vende el sitio real.

## 1. BRIEF (rellenado por la agencia)

```yaml
pieza: "[p. ej. Reel de proceso: el punto de la brasa, explicado]"
# Opciones del plan de contenido: oficio con el cortador de jamón (necesita metraje real y su OK),
# "carta de otoño, desde el [fecha]" (anuncio + fecha), el punto de la brasa (acción real).
objetivo: "[retención | reenvío | seguidores]"
noticia_o_motivo_para_reenviar: "[fecha, novedad, aviso real — o 'ninguno']"
reel_de_referencia: "[URL o ruta local — o 'ninguno']"
metraje_real_disponible: "[rutas de vídeos grabados en el local — o 'ninguno']"
estilo_de_luz: "[dramático (regla 17) | natural difusa (como el reel del chuletón)]"
duracion_orientativa_s: [9-15]
voz_en_off: [sí | no]
cta: "[p. ej. reserva + pregunta al espectador]"
montaje_final: "[remotion en OpenMontage | entregar clips + EDL + SRT para After Effects]"
presupuesto_maximo_usd: [p. ej. 35]
```

Si falta algún campo, **pregunta antes de empezar**. No lo supongas.

## 2. Lectura obligatoria antes de la primera etapa

Del proyecto del cliente (`C:\Users\victo\Documents\torre_de_vega\`):

1. `CLAUDE.md`: brief de marca y registro de correcciones del cliente.
2. `documentación.md`: la Parte II corrige la Parte I.
3. `imagenes/reglas_imagenes.md` y `imagenes/reglas_videos.md`: todas las reglas numeradas.
4. `directoria-cloud/templates/`: plantillas obligatorias de prompt de imagen y de vídeo.
5. `informes/2026-09-08_analisis-instagram-90dias.md`: el problema medido (75 % de abandono a los 3 s).

Del TFG (`C:\Users\victo\PANGO\D.A.M\tfg\`):

6. `base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/aprendizajes-reel-chuleton.md`:
   la última pieza aprobada y lo que se aprendió.

**Conflictos entre reglas:** manda la corrección **fechada más reciente y más concreta**. Hay dos
apartados numerados «17» en `reglas_videos.md`: no resuelvas por número. Si encuentras una
contradicción que afecte a esta pieza (por ejemplo, luz dramática o natural), **enuméralas en el
primer checkpoint y espera respuesta**.

## 3. Pipeline y análisis de referencia

- **Con reel de referencia:** pipeline `cinematic`, empezando por `skills/meta/video-reference-analyst.md`.
- **Si la pieza se apoya sobre todo en metraje real:** pipeline `hybrid`.
- **Filtro de contenido antes que puntuación.** Si la referencia no es de vino, carne a la brasa,
  cocina tradicional o restaurante rural, dilo. Solo se aprovecha su **mecanismo** (ritmo, gancho,
  rótulos), nunca su look, platos, local ni personas.
- La etapa de *research* **no busca tendencias en la web** para escribir el guion. Sus fuentes son el
  informe de 90 días, el plan de contenido y la noticia del brief.

## 4. Lo que queda prohibido en esta producción

**Material:**

- Nada de stock ni archivo: Pexels, Pixabay, Unsplash, Archive.org, NASA, Wikimedia. **Nada de texto
  a vídeo.** Todo plano generado es **imagen a vídeo** desde un keyframe anclado a fotos reales
  (`imagenes/local/`, `imagenes/comida/`, `imagenes/vinos/`, `imagenes/tartas/`). Comprueba que las
  rutas existen.
- Si existe metraje real de fuego, brasa o una textura caótica, **no se genera** (regla 22).

**Contenido de imagen:**

- Nada inventado: ni mobiliario, ni decoración, ni un logo sobre la mantelería.
- Nada debajo del plato.
- Ni platos comidos ni copas vacías.
- Si aparecen manos de personas distintas, de géneros distintos.
- Una persona identificable necesita imagen de referencia aprobada y nunca puede ser la del vídeo de referencia.

**Cámara:**

- **Nunca handheld** ni «static camera» a secas.
- Un movimiento mecánico, lento y cuantificado por plano, con la fórmula del slider motorizado de la regla 11.
- **Variedad real de ángulos** entre planos generados. Cambiar distancia, focal o recorte no cuenta como otro ángulo.
- Solo se admite cámara bloqueada para una transición estudiada en la referencia, y dejándolo registrado.

**Modelos:** `minimax_hailuo` está prohibido.

**Formato:** OpenMontage renderiza por defecto en 1920×1080. Esta pieza es **1080×1920, 9:16**, con
los rótulos dentro de la zona segura de Reels.

## 5. Modelos y resolución: 1080p es innegociable

Calidad primero; el coste solo desempata. **Nunca 720p ni resoluciones reescaladas.**

| Uso | Herramienta de OpenMontage | Configuración obligatoria |
|---|---|---|
| Keyframes | La que ofrezca Nano Banana Pro con varias referencias | 2K, 9:16, fotos reales + fotograma de la referencia (solo para ángulo, encuadre y luz) |
| Plano simple: producto, desplazamiento corto | `kling_official_video` | `kling-v3`, modo `pro`, `1080p`, `image_tail` cuando el plano deba aterrizar en un fotograma |
| Manos, cubiertos, cortes, interacciones | `seedance_video` con Seedance 2.5 | **1080p nativo** y `end_image_url` cuando haga falta |

Avisos comprobados en el código de OpenMontage:

- **`seedance_video` solo permite `480p` y `720p`**, con 720p por defecto, aunque la API de fal
  admite `1080p`.
  - Puedes añadir `"1080p"` al enum de resolución en una copia local.
  - Si no, **para y pregunta**.
  - `atlas_video` ofrece `1080p-esr`, que es reescalado: **no vale**.
- `kling_video` (vía fal) solo expone `v3/standard`. Usa `kling_official_video` para el modo `pro`.
- Si el modelo devuelto no coincide con el pedido (por ejemplo, `nano_banana_2` en vez de Pro),
  **dilo**, no lo ocultes.
- Veo 3.1 no admite imagen final: no lo uses en planos que deban aterrizar en un fotograma.

## 6. Escritura de prompts

- Prompts de generación **en inglés**; conversación conmigo **en español**.
- Imagen: la plantilla de imagen de `directoria-cloud`. Di en el prompt qué papel tiene cada
  referencia: *"use the template frame only for camera angle, framing and light direction; the real
  photos govern the room, the food and the tableware"*.
- Vídeo: los cuatro bloques de la plantilla de motion, en orden:
  **PRESERVE → MOTION (beats con tiempos) → CAMERA → FILM GRADE**, y después **NEGATIVE** y la coda
  fotográfica. Los valores del grade los manda el campo `estilo_de_luz` del brief, no la plantilla.
- **Repite en cada regeneración las restricciones negativas ya validadas**, no solo la corrección nueva.
- Antes de animar un plano, pregúntate qué se mueve ya en la imagen. Si la respuesta es «nada», ese
  plano se resuelve en el montaje, no con generación.
- Manos: un único gesto breve al principio y quietud después, sin reagarres continuos.

## 7. El gancho

- **Fotograma 1:** acción ya empezada (no puede confundirse con una foto fija) y rótulo en pantalla desde ese fotograma.
- **Primer plano de 2 a 2,5 s.** El ritmo rápido empieza después del segundo 3.
- **El momento que justifica ver el Reel va al principio**, como en el reel del chuletón: no hay
  cabecera ni presentación estática.
- Pregunta de control, que respondes en el checkpoint del guion: **¿un vecino de Alhaurín le
  reenviaría esto a alguien?** Si la respuesta es no, dilo antes de gastar.

## 8. Puntos de aprobación: no se avanza sin mi «ok» explícito

Usa la política de checkpoint `manual_all`, o `guided` sin aprobación automática en ninguna etapa creativa.

| Punto | Qué me presentas |
|---|---|
| **A · Análisis y propuesta** | Resumen de la referencia en 5 aspectos por plano; conflictos de reglas detectados; 2-3 conceptos; coste estimado de cada uno |
| **B · Guion y lista de planos** | Por plano: acción, ángulo, función narrativa, movimiento de cámara, material real o generado, modelo y resolución, duración y rótulo. Respuesta a la pregunta del vecino |
| **C · Keyframes** | **Hoja de contactos con todas las imágenes fijas.** Ningún vídeo se genera hasta que apruebe el lote completo |
| **D · Clips** | Cada clip con su prompt, modelo pedido y devuelto, coste real y defectos detectados (manos, joyería, comida que cambia, deriva de cámara) |
| **E · Montaje** | Render final más la revisión automática: ffprobe, fotogramas de muestra, audio, subtítulos y duración real |

## 9. Voz, subtítulos, música y rótulos

- **Voz** (solo si el brief la pide):
  - Español de España.
  - Antes del texto completo, genera una muestra corta **con palabras del negocio** (brasa,
    chuletón, Alhaurín) y espera mi aprobación.
  - No deduzcas el acento por el nombre de la voz ni inventes un parámetro de idioma que el
    proveedor no tenga.
- **Subtítulos:**
  - El texto sale del guion. Los tiempos, de las marcas del proveedor de voz o de una alineación
    medida (WhisperX o faster-whisper) corregida contra el guion.
  - Nunca repartas los tiempos según la longitud de las palabras.
  - Conserva un SRT.
- **Música:** libre de derechos, con fuente y licencia registradas en el log de decisiones.
- **Rótulos:** Bodoni MT Regular espaciada, con filete y sombra suave. **Nunca contorno negro.**
  Comprueba el contraste con el fondo.

## 10. Presupuesto y trabajos largos

- Antes de producir, pon en `config.yaml`:
  - `budget.mode: cap`
  - `budget.total_usd`: el `presupuesto_maximo_usd` del brief
  - `single_action_approval_usd: 0.50`
- Estima el coste antes de cada tanda y dímelo.
- El manifiesto del pipeline marca `max_wall_time_minutes: 12`. Seedance puede tardar más. **Una
  espera no es un fallo:** guarda el identificador del trabajo, no lo relances ni lo dupliques, y
  reanuda desde el checkpoint.
- Un trabajo fallido se revisa antes de reintentarlo. Máximo 2 reintentos por plano sin consultarme.

## 11. Entregables

1. Si el brief elige Remotion: el vídeo final 1080×1920 MP4.
   Si elige After Effects: los clips aprobados, una lista de edición con entradas, salidas y
   rótulos, el SRT y la voz.
2. El guion en `C:\Users\victo\Documents\torre_de_vega\instagram\reel_NN_<nombre>.md`, con el mismo
   formato que los anteriores.
3. Un registro de intentos: por cada generación, modelo pedido y devuelto, parámetros efectivos,
   coste, estado, si se usó y por qué se descartó.
4. Aprendizajes nuevos, **propuestos** para añadir a `reglas_videos.md` o `CLAUDE.md`. No los
   escribas en las reglas sin mi aprobación.

Empieza leyendo los archivos del apartado 2 y presentando el punto A.
