# Society — instrucciones para Claude

Proyecto y TFG de Víctor Pagola del Pino: SaaS que hace de agencia de marketing para hostelería. Índice único y autoridad: [README.md](README.md). Norma documental: [informes/2026-09-22_patron-documental.md](informes/2026-09-22_patron-documental.md).

## Reglas que no se negocian

1. **No se escribe código de la aplicación del TFG.** La IA acompaña, investiga, documenta y produce contenido; el código de la app lo escribe Víctor (README §2). Las herramientas de producción (skills, scripts de revisión, montajes en `promo/`) sí se pueden hacer.
2. **Regla cero de producción: firma de rodaje real.** Cualquier imagen, clip o reel tiene que parecer rodado por un profesional, no generado. Antes de producir nada, leer y aplicar [`skills/README.md`](skills/README.md) y [`skills/directoria/references/hosteleria/08-firma-de-rodaje-real.md`](skills/directoria/references/hosteleria/08-firma-de-rodaje-real.md). Revisión obligatoria antes de entregar: `python3 skills/openmontage/scripts/medir_realismo.py reel.mp4`.
3. **Nada inventado.** Platos, locales, vajilla, personas y datos salen del material real del cliente. Lo no verificado se marca.
4. **Vídeo: solo Seedance 2.5 a 720p + reescalado ByteDance pro.** Kling 3.0 ya no se usa (2026-09-25), aunque aparezca en documentos antiguos.
5. **Coste antes de generar.** Preflight de coste en Higgsfield y lotes pequeños (skill `higgsfield`).
6. **Español de España**, tono llano, en toda la documentación.
