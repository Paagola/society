<!-- society-document -->
> **Estado:** vigente. **Fecha:** 2026-09-25.
> **Ámbito / a quién obliga:** montaje del reel v5 de Da Tonino en local (VS Code + OpenMontage). Uso interno de la agencia: OpenMontage (AGPL-3.0) es herramienta, no se integra en Society.
> **Fuentes:** [`produccion/da-tonino/reel-v4/montaje/README.md`](../produccion/da-tonino/reel-v4/montaje/README.md), [`skills/openmontage/references/04-texto-subtitulos-y-audio.md`](../skills/openmontage/references/04-texto-subtitulos-y-audio.md).
> **Índice único y autoridad:** [README raíz](../README.md).

# Prompt: quitar el sonido de la pizza del reel v5 de Da Tonino con OpenMontage

Pega todo lo que hay debajo de la línea en Claude Code, en el proyecto de VS Code donde tienes OpenMontage. Antes, rellena el bloque BRIEF.

---

Vas a hacer **una revisión de sonido** del reel v5 de Da Tonino con OpenMontage. Solo se toca el audio: la imagen está aprobada y **no se regenera nada** (0 créditos de Higgsfield).

## 1. BRIEF (lo rellena Víctor)

```yaml
sonido_a_quitar: "[qué se oye: crujido, roce de la rúcula, tirón del queso, chisporroteo…]"
segundo_aproximado: "[p. ej. 0,3 s, o 'en toda la pizza']"
repo_society: "[ruta local del repo society, p. ej. C:\\Users\\victo\\PANGO\\D.A.M\\tfg\\society]"
```

Si falta el segundo aproximado, no lo supongas: haz el paso 3 y pregunta.

## 2. Material de partida (descárgalo; no está en el repo)

| Qué | URL |
|---|---|
| v5 máster 4K (2160×3840, 13,54 s) | https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/4ac9c8b1-e18b-4c1b-ab3b-112cf162d8ae.mp4 |
| v5 para Instagram (1080×1920) | https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/8ac1bc5e-6f6b-466c-9a01-daf5693be0e2.mp4 |
| Clip de Seedance reescalado a 4K, con el audio original sin montar | https://d8j0ntlcm91z4.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/hf_20260925_132535_94fa925f-007b-4e0c-972a-be293f348be4.mp4 |

Tomas de la pizza en el v5, según los cortes medidos con ffmpeg:

| Toma | Tramo |
|---|---|
| Rúcula | 0,00–1,58 s |
| Cornicione | 1,58–2,42 s |
| Jamón | 2,42–3,38 s |
| Porción | 3,38–4,71 s |

## 3. Lectura obligatoria y reglas

1. En OpenMontage: `AGENT_GUIDE.md` (Rule Zero). Trata el trabajo como una **revisión de la etapa `edit` del pipeline `hybrid`** sobre metraje aprobado, con política de checkpoints `manual_all`.
2. En el repo society:
   - `CLAUDE.md`;
   - `skills/README.md` (regla cero);
   - `skills/openmontage/SKILL.md`;
   - `skills/openmontage/references/04-texto-subtitulos-y-audio.md`, apartado «Separar canción y efectos de un clip de Seedance»;
   - `produccion/da-tonino/reel-v4/montaje/README.md`, sección «v5».
3. Lo que **no** se puede cambiar:
   - La imagen: copia el vídeo con `-c:v copy`. Sin reencodar, sin grade ni recortes.
   - La **canción de fondo**: a Víctor le encanta. No se sustituye, no se acelera y no cambia de nivel fuera del tramo corregido.
   - El **golpe de la caña de cerveza** (7,9–9,4 s): es el corte final.
   - La **sala con el logo y el apagado lento** (9,4–13,54 s).
   - La duración: 13,54 s exactos.

## 4. Pasos

1. **Localizar el sonido.**
   - Separa el audio del v5 con Demucs (`htdemucs_ft`, y `htdemucs_6s` si hace falta más detalle). Parte del sonido de la pizza se coló en los stems de la canción («bass» y «other»), porque en el v5 los efectos ya solo suenan en la cerveza.
   - Mide el RMS por stem en ventanas de 50 ms en 0–4,71 s y lista los transitorios (onsets) con su segundo y el stem donde están.
   - Genera un WAV de escucha de cada candidato (±0,5 s) y un espectrograma PNG de 0–5 s.
   - **Checkpoint:** enseña la lista a Víctor y espera a que elija cuál es.
2. **Quitarlo sin tocar la canción.** En este orden de preferencia:
   - a) Reconstruir el tramo sin el stem que lleva el sonido, si la canción no vive en ese stem en ese tramo.
   - b) Atenuar solo la banda y el tramo del transitorio: ecualizador dinámico o puerta espectral, con fundidos de 15–20 ms a cada lado.
   - c) Si ninguna deja la canción limpia: sustituir el tramo por el mismo compás de la canción de otro momento, con fundido cruzado de 30–50 ms y sin salto de tempo. La canción va a unos 161 BPM medidos; compruébalo.
3. **Remezclar y normalizar.** Canción + golpe de la cerveza, `loudnorm` a −14 LUFS integrados y −1,5 dBTP. Sin clics en los empalmes: revisa la forma de onda ±50 ms alrededor de cada uno.
4. **Montar las dos entregas**, con la imagen copiada tal cual:
   ```bash
   ffmpeg -i v5_4k.mp4 -i audio_v6.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart da-tonino-reel-v6-4k.mp4
   ffmpeg -i v5_1080.mp4 -i audio_v6.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart da-tonino-reel-v6-1080.mp4
   ```
5. **Revisión (puerta E).**
   - `python3 <repo_society>/skills/openmontage/scripts/medir_realismo.py da-tonino-reel-v6-1080.mp4`: el audio RMS tiene que salir «ok».
   - Sonoridad con `ffmpeg -af ebur128`.
   - Comprueba que la duración y el vídeo son idénticos al v5: mismo número de fotogramas y hash de `-map 0:v -c copy -f md5`.
   - **Checkpoint:** entrega los dos MP4 y el WAV de antes y después del tramo corregido para que Víctor lo escuche. No des por cerrada la pieza sin su «ok».
6. **Registrar en el repo society** (después del «ok»):
   - `produccion/da-tonino/reel-v4/montaje/README.md`: sección «v6», con qué sonido era, en qué segundo y stem estaba, qué método se usó y las mediciones.
   - `produccion/da-tonino/reel-v4/plan.yaml`: bloque `montaje_v6`.
   - Si el método sirve para otros reels, añádelo como aprendizaje en `skills/openmontage/references/04-texto-subtitulos-y-audio.md`.
   - Commit en español.

## 5. Formato de lo que presentas en cada checkpoint

- **Qué has hecho**, en 3–5 líneas.
- **Tabla de candidatos o de mediciones.**
- **Qué necesitas de Víctor**, en una sola pregunta.
