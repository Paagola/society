# Society

## Voces y subtítulos para vídeo: ElevenLabs, opciones gratuitas y comparativa

Informe para Víctor Pagola del Pino · TFG de segundo curso de DAM · 15 de septiembre de 2026

## 1 Resumen ejecutivo

**Voz en off: ElevenLabs como proveedor principal.**

- Voces con acento de España en su biblioteca, y el modelo v3 admite 74 idiomas.
- Cuesta **0,10 USD por 1.000 caracteres** (v3 y Multilingual v2) o 0,05 USD (Flash).
- Un endpoint devuelve el audio con la posición de cada carácter, así que los subtítulos salen sin transcribir.
- Una voz en off de unos 24 segundos con tres intentos cuesta unos **0,12 USD**.
- Su plan gratuito **no permite uso comercial** y exige atribución: en producción hace falta un plan de pago o la API. [V1][V2][V3][V4]

**Subtítulos: generarlos desde el guion, no transcribirlos.**

- Si la voz sale de un texto que Society ya conoce, las marcas de tiempo de la propia voz dan la posición exacta de cada palabra. No puede haber errores en nombres de platos, precios o fechas.
- Solo hay que transcribir cuando el audio no sale del guion: una persona real hablando o la voz que genera Seedance 2.5 dentro del vídeo.
- Para esos casos: **WhisperX** (gratuito, licencia BSD-2, marcas de tiempo por palabra y alineación en español) o **ElevenLabs Scribe v2** (0,22 USD por hora de audio). [V5][V25][V2]

**Opciones gratuitas que sí permiten uso comercial:**

- **Qwen3-TTS.** Apache-2.0, 10 idiomas con español, clonación con 3 segundos de audio y diseño de voces por descripción. [V17]
- **Chatterbox Multilingual v3.** MIT, 23 idiomas y marca de agua inaudible. [V18]
- **Kokoro-82M.** Apache-2.0, pero solo 3 voces en español y un soporte de idiomas distintos del inglés que su ficha describe como posiblemente «escaso». [V19]
- **Capas gratuitas en la nube:** Gemini 3.1 Flash TTS en fase preview, Azure (0,5 millones de caracteres al mes) y Google Cloud (4 millones de caracteres Standard y 1 millón WaveNet al mes). [V9][V13][V11]

**Descartadas para Society** porque sus licencias no permiten uso comercial: XTTS-v2, los pesos oficiales de F5-TTS y OpenAudio S1-mini. [V21][V22][V23]

**El coste no es lo que decide.** La voz cuesta céntimos por pieza con cualquier proveedor de pago, frente a 19,88-44,75 USD de vídeo por reel. En código abierto, «gratis» significa pagar GPU, mantenimiento y tiempo. Lo que decide es la calidad del acento de España, la pronunciación de nombres de platos y cifras, la licencia y el esfuerzo de operación. Por eso se propone una **prueba a ciegas** con cuatro opciones antes de fijar proveedor (sección 8).

**Obligaciones legales:**

- La voz de una persona real con fines publicitarios exige su consentimiento expreso (Ley Orgánica 1/1982). [V30]
- Meta pide declarar el audio realista creado o alterado. [V31]
- OpenAI obliga a avisar de que la voz es sintética. [V16]
- ElevenLabs prohíbe clonar voces sin consentimiento. [V8]

## 2 Dónde entran voz y subtítulos en Society

| Pieza | Voz | Subtítulos | Recomendación |
| --- | --- | --- | --- |
| Reel del plan 3 | Voz en off opcional a partir del guion | Siempre que haya voz | Voz generada aparte del vídeo; subtítulos desde sus marcas de tiempo |
| Historia del plan 2 | Poco frecuente; frases cortas | Texto en pantalla | Priorizar rótulos; voz solo si aporta algo |
| Persona real a cámara (propietario, cocinero) | Grabación real | Transcripción revisada | WhisperX o Scribe, con corrección humana de nombres y cifras |
| Presentador generado | Voz sincronizada con los labios | Transcripción comparada con el guion | Seedance 2.5 con audio o Veo 3.1; rechazar si dice otra fecha o precio |
| Cuenta propia de Society | Voz de marca de Society | Siempre | Voz diseñada o de biblioteca, no el clon de una persona real sin consentimiento |

**Regla de decisión:**

- **Texto con datos comerciales** (fechas, precios, nombres de platos): voz generada desde un guion confirmado por el propietario.
- **Ambiente y efectos:** audio nativo de Seedance 2.5 o sonido real grabado.
- **Voz de una persona real:** solo grabación propia o clonación con consentimiento escrito.

## 3 Opciones de voz

### 3.1 ElevenLabs

| Plan | Precio mensual | Créditos al mes | Uso comercial | Clonación de voz |
| --- | --- | --- | --- | --- |
| Free | 0 USD | 10.000 | No; atribución obligatoria | No |
| Starter | 6 USD | 30.000 | Sí | Instantánea |
| Creator | 22 USD (11 USD el primer mes) | 121.000 | Sí | Profesional |
| Pro | 99 USD | 600.000 | Sí | Profesional |
| Scale | 299 USD | 1.800.000 | Sí | Profesional |
| Business | 990 USD | 6.000.000 | Sí | Profesional |

Fuente: página de precios. [V1] En Multilingual v2 un carácter equivale a un crédito; algunos modelos de la API consumen menos. Con una estimación propia de unos 1.000 caracteres por minuto de narración en español, Starter da del orden de 30 minutos al mes.

**API de pago por uso** [V2]:

| Servicio | Precio |
| --- | --- |
| Voz: v3 y Multilingual v2 | 0,10 USD por 1.000 caracteres |
| Voz: Flash y Turbo | 0,05 USD por 1.000 caracteres |
| Transcripción: Scribe v2 | 0,22 USD por hora |
| Transcripción en tiempo real | 0,39 USD por hora |
| Música | 0,15 USD por minuto |
| Efectos de sonido, cambio de voz, aislamiento de voz | 0,12 USD por minuto |
| Doblaje v1 | 0,33 USD por minuto con marca de agua; 0,50 USD sin ella |

**Capacidades relevantes para Society:**

- **Voz con marcas de tiempo.** El endpoint `with-timestamps` devuelve el audio junto con la alineación por carácter, también en streaming. [V4]
- **Alineación forzada.** Dados un audio y su texto, devuelve el momento de cada carácter y cada palabra. Sirve para una locución grabada a partir del guion o para voces de otro proveedor. [V5]
- **Español de España.** Tiene voces con acento castellano en su biblioteca y el modelo v3 admite 74 idiomas. [V6][V7]
- **Condiciones.** El plan gratuito no incluye licencia comercial y obliga a poner «elevenlabs.io» en el título de lo publicado. Los planes de pago incluyen licencia comercial, salvo en servicios beta. [V3]
- **Uso prohibido.** No se puede replicar la voz de otra persona sin su consentimiento o derecho legal, ni para engañar sobre si la voz es generada. [V8]

### 3.2 Servicios en la nube con capa gratuita

| Servicio | Capa gratuita | Precio de pago | Español | Notas |
| --- | --- | --- | --- | --- |
| Gemini 3.1 Flash TTS (preview) | Sí, sin coste | 1 USD por millón de tokens de texto; 20 USD por millón de tokens de audio | Español, sin variante regional especificada | 30 voces; estilo, acento, ritmo y tono por instrucciones; hasta 2 hablantes [V9][V10] |
| Gemini 2.5 Flash TTS (preview) | Sí | 0,50 / 10 USD por millón de tokens | Igual | [V9] |
| Google Cloud Text-to-Speech | 4 millones de caracteres Standard y 1 millón WaveNet al mes | Según tipo de voz; comprobar Chirp 3 HD en la página de precios | Chirp 3 HD en es-ES y es-US | Streaming [V11][V12] |
| Azure AI Speech | 0,5 millones de caracteres de voz neuronal y 5 horas de transcripción al mes | 15 USD por millón de caracteres (neuronal); 30 USD (HD) | Voces es-ES nativas, también HD | [V13][V14] |
| OpenAI | No | tts-1: 15 USD por millón de caracteres; tts-1-hd: 30 USD; gpt-4o-mini-tts por tokens | Sigue el soporte de idiomas de Whisper; acento por instrucciones | 13 voces; obliga a avisar al usuario de que la voz es IA [V15][V16] |

Las capas gratuitas en fase preview cambian de límites y condiciones. Sirven para probar, no para sostener producción. Antes de enviar guiones de clientes a un nivel gratuito hay que revisar sus condiciones de uso de datos; no se han analizado en este informe.

### 3.3 Modelos de código abierto

| Modelo | Licencia | Español | Clonación | Requisitos | Encaje en Society |
| --- | --- | --- | --- | --- | --- |
| Qwen3-TTS (0,6B y 1,7B) | Apache-2.0 | Sí, entre 10 idiomas | Con 3 s de audio; diseño de voz por descripción | GPU; streaming con latencia desde 97 ms | **Mejor candidato gratuito** para la prueba a ciegas [V17] |
| Chatterbox Multilingual v3 | MIT | Sí, entre 23 idiomas; hay una variante dedicada al español latinoamericano | Sí, sin entrenamiento | GPU | Candidato; incrusta marca de agua PerTh en todo el audio [V18] |
| Kokoro-82M | Apache-2.0 | 3 voces: ef_dora, em_alex, em_santa | No | Muy ligero | Solo pruebas: su ficha advierte que el soporte no inglés «puede ser escaso» [V19] |
| Piper (piper1-gpl) | Motor GPL-3.0; licencia distinta para cada voz | Voces según catálogo | No | CPU | Voz más sintética; revisar la licencia de cada voz [V20] |
| XTTS-v2 | Coqui Public Model License: solo uso no comercial | Sí | Sí | GPU | **Descartado**; Coqui cerró en 2024 y nadie vende licencia comercial [V21] |
| F5-TTS | Código MIT; pesos CC-BY-NC-4.0 | — | Sí | GPU | **Descartado**: los pesos oficiales no son comerciales [V22] |
| OpenAudio S1-mini (Fish Audio) | CC-BY-NC-SA-4.0 | Sí | Sí | GPU | **Descartado** [V23] |

**Qué supone autoalojar.** Hay que servir el modelo en un servidor de trabajo propio con GPU. Con la tarifa de Modal usada en el informe de viabilidad (L4 a 0,000222 USD por segundo de GPU, más CPU y memoria), el cómputo de una voz corta es de céntimos. A cambio hay arranques en frío, actualizaciones, control de calidad y monitorización que una API ya resuelve. No se ha medido el tiempo de generación. [V33]

### 3.4 Comparativa

| Criterio | ElevenLabs | Gemini TTS | Azure | OpenAI | Qwen3-TTS | Chatterbox Multilingual |
| --- | --- | --- | --- | --- | --- | --- |
| Voz de 24 s con 3 intentos (1.200 caracteres) | 0,12 USD con v3; 0,06 con Flash | Gratis en preview; de pago por tokens | 0,018 USD neuronal; 0,036 HD; gratis dentro de 0,5 M | 0,036 USD con tts-1-hd | Cómputo propio | Cómputo propio |
| Español de España | Voces castellanas en biblioteca | Acento por instrucciones; variante no especificada | Voces es-ES nativas | Acento por instrucciones | Español, variante no especificada | Español; variante latinoamericana dedicada |
| Marcas de tiempo para subtítulos | Sí, por carácter [V4] | No documentado en la guía revisada | No verificado en este informe | No documentado | No documentado | No documentado |
| Clonación | Sí, con consentimiento | No | Voz personalizada con proceso aparte | No | Sí | Sí |
| Licencia comercial | Planes de pago | Condiciones de Google | Sí | Sí, con aviso de voz IA | Apache-2.0 | MIT |
| Operación | API gestionada | API gestionada | API gestionada | API gestionada | Servidor GPU propio | Servidor GPU propio |

Para las opciones sin marcas de tiempo, los subtítulos se obtienen con alineación forzada: WhisperX o el endpoint de ElevenLabs (sección 4.1).

**Sobre la calidad:** no se ha encontrado una evaluación independiente y verificable de calidad en español de España que compare estas opciones. Las afirmaciones de «mejor que ElevenLabs» proceden de los propios proyectos o de blogs. Por eso la decisión final pasa por la prueba de la sección 8.

## 4 Subtítulos

### 4.1 Tres formas de saber cuándo suena cada palabra

| Método | Cuándo usarlo | Herramienta | Coste |
| --- | --- | --- | --- |
| Marcas de tiempo de la voz generada | La voz sale del guion | ElevenLabs `with-timestamps` [V4] | Incluido en la voz |
| Alineación forzada | Hay texto exacto y audio de otro origen: otra voz sintética o una locución grabada leyendo el guion | ElevenLabs Forced Alignment [V5]; WhisperX con alineación wav2vec2 [V25] | API o GPU propia |
| Transcripción | No hay texto fiable: persona real que improvisa o voz generada por Seedance 2.5 | Whisper o WhisperX; Scribe v2; gpt-transcribe; Azure | Gratis en local; Scribe 0,22 USD/h; gpt-transcribe 0,0045 USD/min; Azure 5 h/mes gratis [V24][V25][V2][V15][V13] |

**Herramientas de transcripción gratuitas:**

- **Whisper.** Código y pesos con licencia MIT; modelos de tiny a large y turbo (809 millones de parámetros, unos 6 GB de VRAM). [V24]
- **WhisperX.** BSD-2-Clause; añade marcas de tiempo por palabra, detección de voz para reducir alucinaciones y separación de hablantes, con modelos de alineación para español incluidos por defecto. [V25]

Cuando exista un guion esperado, la transcripción siempre se compara con él. Si cambia una fecha, un precio o el nombre de un plato, la pieza se bloquea antes de publicar.

### 4.2 Incrustados en el vídeo o de la plataforma

| Opción | Ventaja | Límite | Uso en Society |
| --- | --- | --- | --- |
| Capas de texto en After Effects | Tipografía y animación de la marca; el montaje ya se hace en AE | AE no importa SRT de forma nativa según su comunidad; se generan las capas desde un JSON con script [V28, secundaria] | Reels y piezas con plantilla |
| FFmpeg con los filtros `subtitles` o `ass` (libass) | Rápido, sin AE, estilos ASS | Menos control de animación | Historias y piezas simples [V27] |
| Subtítulos automáticos de Instagram (sticker) | Gratis; admite español | Se hacen a mano en la app; no se controlan por API | Solo pruebas en la cuenta propia [V29, secundaria] |

**Recomendación:** subtítulos incrustados. Society controla texto, estilo y revisión, y la pieza se ve igual en cualquier red.

### 4.3 Criterios de estilo

- Grupos cortos de palabras sincronizados con la voz; resaltar la palabra activa solo si la plantilla lo pide.
- Dentro de la zona segura de la interfaz de Instagram y sin tapar el plato.
- Contraste suficiente sobre el fondo durante todo el tramo. La tipografía es una regla de marca de cada restaurante.
- Revisión letra a letra de nombres de platos, precios y fechas.
- Tamaño y número de palabras calibrados con pruebas en el móvil durante el piloto. No se han verificado umbrales universales para vídeo vertical.

### 4.4 Lo que enseñó el ensayo del 15 de septiembre

Un reel de chuletón producido en local, con voz de Higgsfield (`seed_audio`), subtítulos alineados y montaje en After Effects, dejó evidencia directa sobre voz y subtítulos. **Esta prueba no usó ElevenLabs ni WhisperX**, así que no sustituye a la prueba a ciegas de la sección 8. Evidencia completa en [aprendizajes del reel de chuletón](../base-conocimiento-torre-de-vega/08-reel-chuleton-2026-09-15/aprendizajes-reel-chuleton.md), apartados 5 y 6.

**Voz**

- La voz Cillian se descartó por sonar extranjera. Se usó Nadine en la versión preferida, pero nada certifica que sea una voz nativa de español de España.
- El esquema de `seed_audio` consultado no tenía selector de idioma ni de acento, solo velocidad, volumen y tono. No se debe inventar un parámetro de idioma ni deducir el origen de una voz por su nombre.
- Una transcripción correcta no demuestra que el acento sea adecuado.
- **Regla para Society:** antes de producir la pieza completa, escuchar una muestra corta en español con palabras del negocio. Guardar proveedor, identificador de voz y valoración de pronunciación. Es el paso «Prueba de voz» del alta en el [flujo de la aplicación](Society_flujo_de_la_aplicacion.md).

**Subtítulos**

- La locución duró 7,9 s y el proveedor no devolvió marcas de tiempo.
- Se transcribió con faster-whisper (idioma `es`) y el resultado se alineó con el guion escrito. La transcripción escribió «braza» y el guion permitió recuperar «brasa» sin inventar tiempos.
- La alineación dio una similitud de 0,9375, con 16 de 16 palabras temporizadas. Esa cifra mide la correspondencia del texto, no la precisión temporal ni el acento.
- Los tiempos pasaron a capas nativas de texto en After Effects: Arial Bold de 54 px, contorno de 2,5 px y un máximo de cinco palabras por grupo. Se conservó además un SRT.
- Se añadieron 0,1 s de lectura al final de cada frase sin mover el inicio de la voz. Si cambia el audio o se desplaza en la línea de tiempo, la alineación se rehace.

**Matiz a la tabla de la sección 4.1:** «subtítulos desde el guion» solo evita transcribir cuando hay marcas de tiempo fiables del proveedor o una alineación posterior con el audio. Repartir las palabras según su longitud o una duración supuesta no sustituye medir la locución. Por eso, en Society, el texto de la locución, el audio, la alineación y el montaje son etapas separadas y se rehace solo la que cambia.

## 5 Seedance 2.5 y su audio nativo

- El parámetro `generate_audio` está activado por defecto y genera efectos, ambiente y **voz sincronizada con los labios**. En fal, el audio va incluido en la tarifa por segundo. [V26]
- Fuentes secundarias hablan de sincronía labial en unos 20 idiomas; **el español no se ha verificado en una fuente primaria**.
- **Riesgo:** una voz generada dentro del vídeo puede decir algo distinto del guion, y no ofrece control fino de voz ni de pronunciación.

**Reglas propuestas:**

1. **Planos de producto y ambiente:** desactivar `generate_audio`, o sustituir el audio en el montaje, cuando la pieza lleve voz en off o música propia.
2. **Presentador generado:** aceptar el audio nativo solo si su transcripción coincide con el guion.
3. **Voz con datos comerciales:** siempre generada aparte, a partir del guion confirmado.

## 6 Coste por pieza

| Partida | Supuesto | USD |
| --- | --- | --- |
| Voz ElevenLabs v3 | 1.200 caracteres: unos 24 s de voz con 3 intentos | 0,12 |
| Voz ElevenLabs Flash | Igual | 0,06 |
| Voz Azure neuronal | Igual, fuera de la capa gratuita | 0,018 |
| Voz OpenAI tts-1-hd | Igual | 0,036 |
| Subtítulos desde la voz | Marcas de tiempo incluidas | 0 |
| Transcripción Scribe v2 | 24 s de audio | 0,0015 |
| Transcripción gpt-transcribe | 24 s de audio | 0,0018 |
| WhisperX o Qwen3-TTS propios | GPU por medir | — |

Con Seedance 2.5, un reel cuesta entre 19,88 y 44,75 USD de producción variable según resolución (informe de viabilidad §9.5). **La voz y los subtítulos suponen menos del 1 %.**

## 7 Cumplimiento

| Tema | Norma o política | Aplicación en Society |
| --- | --- | --- |
| Voz de una persona real | La Ley Orgánica 1/1982 considera intromisión ilegítima usar la voz de una persona con fines publicitarios o comerciales; exige consentimiento expreso, que es revocable [V30] | Consentimiento escrito por voz y finalidad; guardar la prueba; prever qué pasa si se revoca |
| Clonación | ElevenLabs la prohíbe sin consentimiento o derecho legal [V8] | Solo voces diseñadas, de biblioteca o clones con consentimiento |
| Aviso de voz sintética | OpenAI lo exige a quien use sus voces [V16]; Meta exige declarar audio realista creado o alterado [V31]; artículo 50 del Reglamento de IA [V32] | Etiqueta de IA en el brief cuando la pieza lleve voz generada realista |
| Marca de agua | Chatterbox la incrusta por defecto [V18] | No eliminarla |
| Música | Las cuentas de empresa tienen catálogo musical comercial limitado (informe de estrategia de redes) | Voz y ambiente propios; música con licencia |

## 8 Recomendación y prueba a ciegas

**Durante el desarrollo:** ElevenLabs Starter (6 USD al mes), que ya incluye licencia comercial y acceso a la API. **En producción:** pago por uso o el plan que corresponda al volumen real.

**Prueba antes de fijar proveedor:**

1. **Guiones.** 12 guiones de hostelería de 15-25 s con nombres difíciles (salmorejo, pulpo á feira, txuleta, Ribera del Duero), precios, horas y fechas.
2. **Opciones.** ElevenLabs v3 con voz castellana, Azure HD es-ES, Gemini 3.1 Flash TTS con instrucción de acento de España y Qwen3-TTS 1.7B.
3. **Escucha.** Cinco oyentes de España escuchan en el móvil sin saber de qué proveedor es cada voz, y puntúan de 1 a 5 naturalidad, acento y pronunciación.
4. **Errores.** Se cuentan los errores en cifras, fechas y nombres.
5. **Criterio.** La opción elegida no puede tener errores en datos comerciales. Entre las que empaten, decide el coste y el esfuerzo de operación.

## 9 Integración en la arquitectura

**Entidades nuevas del modelo de datos:**

| Entidad | Información |
| --- | --- |
| Voz de marca | Proveedor, identificador de voz, modelo, idioma y acento, consentimiento si es un clon |
| Pista de voz | Guion confirmado, hash, audio en R2, marcas de tiempo, coste |
| Subtítulos | Segmentos con tiempos, estilo, versión, estado de revisión |

**Comportamiento esperado:**

- **Caché por hash** de texto + voz + modelo: repetir el montaje no vuelve a pagar la voz.
- **Cambios acotados:** cambiar una fecha del guion regenera la voz y los subtítulos de esa escena, no el vídeo.
- **Reparto de trabajo:** el servidor de medios ejecuta WhisperX para transcribir y alinear; FFmpeg incrusta subtítulos en piezas simples; After Effects los monta en plantillas.
- **Validaciones:** la voz cabe en la duración del plano, y el texto transcrito coincide con el guion en los datos comerciales.

## 10 Preguntas abiertas

1. Calidad real del acento de España de cada opción; se resuelve con la prueba de la sección 8.
2. Si Seedance 2.5 genera voz en español con sincronía labial aceptable.
3. Condiciones de uso de datos en los niveles gratuitos de Gemini y de otros proveedores.
4. Marcas de tiempo por palabra en Azure y Gemini, no verificadas en este informe.
5. Tiempo y coste de GPU de Qwen3-TTS y WhisperX en el servidor de medios.
6. Voz de marca de la cuenta propia de Society.

## 11 Fuentes

Consultadas el 15 de septiembre de 2026. «Secundaria» indica fuente de terceros usada solo como referencia.

**ElevenLabs**

- [V1] ElevenLabs · Pricing · https://elevenlabs.io/pricing
- [V2] ElevenLabs · API pricing · https://elevenlabs.io/pricing/api
- [V3] ElevenLabs Help Center · Can I publish the content I generate on the platform? · https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform
- [V4] ElevenLabs Docs · Create speech with timing · https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
- [V5] ElevenLabs Docs · Forced Alignment · https://elevenlabs.io/docs/overview/capabilities/forced-alignment
- [V6] ElevenLabs · Spanish Castilian Accent voices · https://elevenlabs.io/text-to-speech/spanish-castilian-accent
- [V7] ElevenLabs Docs · Models · https://elevenlabs.io/docs/overview/models
- [V8] ElevenLabs · Prohibited Use Policy · https://elevenlabs.io/use-policy

**Nube**

- [V9] Google AI for Developers · Gemini API pricing · https://ai.google.dev/gemini-api/docs/pricing
- [V10] Google AI for Developers · Speech generation · https://ai.google.dev/gemini-api/docs/speech-generation
- [V11] Google Cloud · Text-to-Speech pricing · https://cloud.google.com/text-to-speech/pricing
- [V12] Google Cloud · Chirp 3: HD voices · https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd
- [V13] Microsoft Azure · Speech services pricing · https://azure.microsoft.com/en-us/pricing/details/cognitive-services/speech-services/
- [V14] Microsoft Learn · Language and voice support for Azure Speech · https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support
- [V15] OpenAI · API pricing · https://developers.openai.com/api/docs/pricing
- [V16] OpenAI · Text to speech guide · https://developers.openai.com/api/docs/guides/text-to-speech

**Código abierto**

- [V17] QwenLM · Qwen3-TTS · https://github.com/QwenLM/Qwen3-TTS
- [V18] Resemble AI · Chatterbox · https://github.com/resemble-ai/chatterbox
- [V19] hexgrad · Kokoro-82M VOICES.md · https://huggingface.co/hexgrad/Kokoro-82M/blob/main/VOICES.md
- [V20] Open Home Foundation · piper1-gpl · https://github.com/OHF-Voice/piper1-gpl
- [V21] Coqui · XTTS-v2 License · https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt
- [V22] SWivid · F5-TTS · https://huggingface.co/SWivid/F5-TTS
- [V23] Fish Audio · OpenAudio S1-mini · https://huggingface.co/fishaudio/openaudio-s1-mini
- [V24] OpenAI · Whisper · https://github.com/openai/whisper
- [V25] m-bain · WhisperX · https://github.com/m-bain/whisperX

**Vídeo, montaje y plataformas**

- [V26] fal · Seedance 2.5 image to video, esquema de la API · https://fal.ai/models/bytedance/seedance-2.5/image-to-video/llms.txt
- [V27] FFmpeg · Filters documentation · https://ffmpeg.org/ffmpeg-filters.html
- [V28] Adobe Community · Importar SRT como capas de texto en After Effects (secundaria) · https://community.adobe.com/t5/after-effects-discussions/how-to-import-srt-file-to-after-effects-as-textlayers/m-p/12400635
- [V29] NapoleonCat · Cómo añadir subtítulos a Reels (secundaria) · https://napoleoncat.com/blog/how-to-add-captions-to-instagram-reels/

**Normativa y políticas**

- [V30] BOE · Ley Orgánica 1/1982, de protección civil del derecho al honor, a la intimidad personal y familiar y a la propia imagen · https://www.boe.es/buscar/act.php?id=BOE-A-1982-11196
- [V31] Meta · Labeling AI-Generated Images on Facebook, Instagram and Threads (6 feb. 2024) · https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/
- [V32] Reglamento (UE) 2024/1689 · Artículo 50 · https://artificialintelligenceact.eu/article/50/
- [V33] Modal · Pricing · https://modal.com/pricing
