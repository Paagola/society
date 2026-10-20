# Carruseles de Instagram · tres restaurantes

Estado: referencia · pieza producida, propuesta creativa no oficial.
Fecha de revisión: 2026-10-20. Fecha de evidencia: 2026-10-20 (consultas web y generaciones).
Ámbito / a quién obliga: carruseles de Instagram de Society para Etxebarri, Disfrutar y St. JOHN.
Fuentes: `sources.md` de cada restaurante; lo no verificado va marcado **[?]**.
Índice único: [README raíz](../README.md).

Fecha: 20 de octubre de 2026. Producido con la skill de dirección (Director IA, `skills/directoria`) e Higgsfield.

> **Propuestas creativas no oficiales de Society.** Ninguno de los tres restaurantes ha encargado ni aprobado este contenido. No deben publicarse como si fueran campañas suyas.

## Descarga

- **ZIP con las 18 diapositivas** (PNG 1080 × 1350) y las tres vistas previas, con la misma estructura de carpetas que aquí: [instagram_carousels_18.zip](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/8afbafad-6235-467f-b650-9fd3980a5ae6.zip) (30,7 MB, SHA-256 `6e726cf8163287f0c4e5979bb927088927df2a534e3d36da96729e82d140af99`).
- Para colocarlas en el repositorio: `bash instagram_carousels/herramientas/descargar_finales.sh`.

## Los tres carruseles

| Carpeta | Restaurante | Campaña | Lenguaje visual | Vista previa |
|---|---|---|---|---|
| [restaurant_01_etxebarri](restaurant_01_etxebarri/art_direction.md) | Asador Etxebarri · Axpe (Bizkaia) | «Todo pasa por el fuego» | Documental en clave baja, casi monocromo; Archivo Narrow + IBM Plex Mono; motivo de parrilla | [ver](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/2a7451e2-ca6c-422e-9f84-b894c394d484.jpg) |
| [restaurant_02_disfrutar](restaurant_02_disfrutar/art_direction.md) | Disfrutar · Barcelona | «Elige sin mirar» | Estudio en clave alta con sombra dura; banda negra a modo de venda; Bricolage Grotesque | [ver](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/46f8a6c3-ff08-4e86-bd97-e924b45642fb.jpg) |
| [restaurant_03_st_john](restaurant_03_st_john/art_direction.md) | St. JOHN · Smithfield, Londres | «La carta, tal cual» | Deadpan blanco sobre blanco; papeleta de carta mecanografiada; Courier Prime | [ver](https://d2ol7oe51mr4n9.cloudfront.net/user_3Ee1BajtdQsPuDNN1IPZF4hImnO/a386484e-e5b2-487c-93d2-61c857035a47.jpg) |

Cada carpeta tiene:

- `art_direction.md`: concepto, paleta HEX, tipografía, sistema gráfico, referencias y la tabla de diapositivas con la referencia real de cada una.
- `caption.md`: texto exacto de cada diapositiva, caption, llamada a la acción y hashtags razonados, con cada dato marcado como verificado, propuesta o sin confirmar.
- `sources.md`: fuentes oficiales, créditos y licencias de cada foto de referencia, Pinterest y rondas descartadas.
- `prompts.json`: prompt completo, referencia y job de Higgsfield de cada diapositiva.
- `slides/`: manifiesto de las seis diapositivas (los PNG llegan con el script de descarga).

## Cómo se ha hecho

1. **Una foto real por diapositiva.** Por norma del proyecto, cada imagen parte de una fotografía real del restaurante: Wikimedia Commons para Etxebarri y St. JOHN, y la web oficial para Disfrutar. La imagen nueva conserva los mismos elementos (plato, vajilla, espacio, rótulos), pero con una composición nueva y más profesional. No es una copia del encuadre original.
2. **Generación:** Higgsfield `nano_banana_pro` (servido como `nano_banana_2`), 4:5 a 2K, con la foto real como `image_references`. Sin texto dentro de la imagen.
3. **Revisión de cada toma frente a su referencia** en una hoja comparativa: número de piezas, anatomía, vajilla y rótulos letra a letra. Se regeneraron dos tomas, la 6 de Etxebarri (rótulo alterado) y la 6 de Disfrutar (aceitunas de más).
4. **Montaje:** `herramientas/montar_carrusel.py` recorta a 1080 × 1350 y compone la tipografía con fuentes reales (Google Fonts, OFL), según `herramientas/specs_0X_*.json`.
5. **Control final:** seis diapositivas distintas por restaurante, todas a 1080 × 1350 RGB, texto revisado a tamaño de móvil y márgenes de 96 px. `skills/openmontage/scripts/medir_realismo.py` solo mide vídeo y no se aplica a imágenes fijas.

Para volver a montar las diapositivas a partir de las tomas sin texto (enlazadas en cada `slides/README.md`):

```bash
python3 instagram_carousels/herramientas/montar_carrusel.py \
  instagram_carousels/herramientas/specs_01_etxebarri.json <carpeta_con_raw_1..6.png> <carpeta_fuentes> <salida>
```

## Bloqueo técnico (exacto)

El contenedor donde se preparó este repositorio no puede descargar de los dominios de Higgsfield (`d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net` y `upload.higgsfield.ai`): el proxy de salida responde 403. Por eso:

- **Bloqueado:** copiar los PNG finales dentro del repositorio desde aquí.
- **Hecho por otra vía:** la generación, el montaje y la exportación se hicieron en el sandbox de Higgsfield. El ZIP y las vistas previas se subieron a su almacenamiento (subida confirmada y comprobada con HTTP 200). El script `herramientas/descargar_finales.sh` los trae al repositorio desde cualquier ordenador normal.

## Coste

- Saldo de Higgsfield al terminar: 955,9 créditos (plan Plus).
- La fase de rehacer todo con referencias (segunda y tercera ronda, con las dos correcciones) costó 86 créditos (de 1041,9 a 955,9).
- La primera ronda, descartada, costó unos 42 créditos más (21 generaciones a unos 2 créditos cada una; cifra estimada).
