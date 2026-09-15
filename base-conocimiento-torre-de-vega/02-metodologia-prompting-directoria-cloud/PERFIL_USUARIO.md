# PERFIL DE USUARIO — DirectorIA

> **Estado: VACÍO (primer arranque).**
>
> Este archivo es la **memoria persistente** del agente entre sesiones (el modelo no recuerda nada por sí mismo).
>
> - En **Claude Code / Cursor / Codex**: el agente lee este archivo al arrancar. Si sigue vacío, ejecuta el onboarding (ver `ONBOARDING.md`) y rellena este bloque. En sesiones futuras lo lee y NO vuelve a preguntar.
> - En **Proyecto de Claude / GPT personalizado** (donde el agente no puede escribir archivos): el agente te entregará este bloque relleno al terminar el onboarding. **Guárdalo y pégalo** en las instrucciones del proyecto, o al principio de cada chat nuevo, para no repetir el cuestionario.
>
> Para reconfigurar en cualquier momento, dile al agente: **"reconfigúrate"** (re-onboarding completo) o cambia un solo campo ("ahora publico en YouTube").

---

```markdown
# PERFIL DE CLIENTE — DirectorIA

## Identidad del proyecto
- Usuario / marca:        __________________________
- Sector / a qué se dedica: ________________________
- Tono de marca:          __________________________

## Qué genera
- Tipo principal:         [ ads UGC | editorial producto | retratos/founders |
                            vídeo cinematográfico | talking head + lipsync |
                            b-roll/ambiente | otro: ________ ]
- Tipos secundarios:      __________________________

## Personaje recurrente (identidad)
- ¿Cara fija obligatoria? [ SÍ | NO ]
- Si SÍ — nombre/alias:   __________________________
- Refs de identidad recibidas:
    - Identity sheet multiángulo: [ sí | no ]  → archivo/media_id: ______
    - Selfie nítido close-up:     [ sí | no ]  → archivo/media_id: ______
    - Ref de vestuario/estilo:    [ sí | no ]  → archivo/media_id: ______
- (Volumen alto previsto, 10+ beats → evaluar Soul ID, ver knowledge/04)

## Plataforma y formato
- Dónde se publica:       __________________________
- Aspect ratio por defecto: [ 9:16 | 4:5 | 1:1 | 16:9 | 2.39:1 ]

## Estilo / nivel
- Estilo:                 [ hiperrealista publicitario | cinematográfico film-grain |
                            editorial moda | UGC casero móvil ]
- Film stock preferido (si aplica): _______________  (ver knowledge/05)

## Herramienta y modalidad de entrega
- Herramienta:            [ MCP Higgsfield conectado | web Higgsfield |
                            Freepik | Midjourney | otra: ________ ]
- Modalidad:              [ EJECUTA tools | SOLO entrega prompts+params copiables ]

## Idioma
- Conversación en:        __________________________
- Prompts finales en:     [ inglés (default) | otro acordado: ________ ]

## Defaults técnicos derivados (rellenados por la tabla D de ONBOARDING.md)
- Modelo imagen default:  __________________________
- Modelo vídeo default:   __________________________
- aspect_ratio a forzar en cada call: ______________
- resolution/quality default: ______________________
- Notas:                  __________________________
```
