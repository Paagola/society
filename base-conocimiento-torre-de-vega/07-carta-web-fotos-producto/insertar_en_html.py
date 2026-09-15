# -*- coding: utf-8 -*-
"""Inserta las imagenes de carta_web en el index.html de la carta.

Lee el backup sin imagenes (SRC_HTML) y escribe la carta con imagenes (DST_HTML).

Como funciona
-------------
Cada producto de la carta es un bloque UAGB:

    <div class="wp-block-uagb-restaurant-menu-child uagb-rest_menu__wrap">
      <div class="uagb-rm__content">
        <div class="uagb-rm-details">
          <h4 class="uagb-rm__title">...</h4>
          <div class="uagb-rm__desc">...</div>
        </div>
        <span class="uagb-rm__price"></span>
      </div>
      <div class="uagb-rm__separator"></div>
    </div>

Los bloques van en el mismo orden en que aparecen en el HTML, asi que se
identifican por su indice (1-based) segun el listado de MAPA. Se inserta un
<img> como primer hijo de .uagb-rm__content, y el CSS convierte ese contenedor
en una fila flex.

Las imagenes NO llevan canal alfa: van sobre blanco puro y el fondo se elimina
en el navegador con `mix-blend-mode: multiply`. Ver preparar_para_web.py para el
porque (un recorte a alfa se come el plato blanco, y el recorte neuronal se come
el plato y la mano). El fondo de la pagina es #e9ecef, claro, asi que multiply
lo deja pasar intacto y ademas conserva la sombra de contacto real.

Ojo con el lazyload de Smush: las <img> del tema llevan el src real en data-src
y un SVG placeholder en src. Las nuestras llevan class="tdv-dish-img no-lazy
skip-lazy" y src directo, para quedar fuera de ese mecanismo.
"""
import os
import re
import shutil

BASE = os.path.dirname(os.path.abspath(__file__))
# 2026-09-14: las imagenes ya estan aplicadas a la carta original. Se parte SIEMPRE del
# backup sin imagenes; si se leyera index.html se insertarian por duplicado.
SRC_HTML = r"C:\Users\victo\Downloads\simply-static-1-1789132160 - Copy\carta-torre-de-vega\index.backup-2026-09-14.html"
DST_DIR = r"C:\Users\victo\Downloads\simply-static-1-1789132160 - Copy\carta-torre-de-vega"
DST_HTML = os.path.join(DST_DIR, "index.html")
IMG_DIR = os.path.join(DST_DIR, "img-carta")
WEB_PATH = "img-carta"          # ruta tal y como la ve el navegador

# indice del bloque uagb-rest_menu__wrap (1-based) -> (id de imagen, alt)
MAPA = {
    1:  ("E01_jamon-iberico-bellota",      "Jam\u00f3n 100% ib\u00e9rico de bellota"),
    2:  ("E02_jamon-cebo-campo",           "Jam\u00f3n 50% cebo de campo ib\u00e9rico"),
    3:  ("E03_lomo-en-manteca",            "Lomo en manteca"),
    4:  ("E04_langostinos-pil-pil",        "Langostinos al pil-pil"),
    6:  ("E06_croquetas-bacalao",          "Croquetas de bacalao"),
    10: ("E10_patatas-bravas",             "Patatas bravas"),
    11: ("E11_croquetas-puchero",          "Croquetas de puchero"),
    12: ("E12_croquetas-chipirones",       "Croquetas de chipirones en su tinta"),
    17: ("E17_croquetas-rabo-toro",        "Croquetas de rabo de toro"),
    18: ("E18_surtido-croquetas",          "Surtido de croquetas"),
    21: ("S02_ensalada-queso-cabra",       "Ensalada de queso de cabra"),
    22: ("S03_ensalada-cesar",             "Ensalada C\u00e9sar"),
    24: ("S05_tomate-picado-atun",         "Tomate picado con at\u00fan"),
    25: ("S06_extra-anchoas",              "Extra de anchoas"),
    31: ("M02_medio-pollo-asado",          "Medio pollo asado"),
    32: ("M03_brocheta-cerdo",             "Brocheta de cerdo"),
    33: ("M04_solomillo-cerdo",            "Solomillo de cerdo"),
    34: ("M05_solomillo-ternera",          "Solomillo de ternera"),
    35: ("M06_carrillada-iberica",         "Carrillada ib\u00e9rica en salsa de la casa"),
    39: ("M10_tataki-vaca-madurada",       "Tataki de vaca madurada premium"),
    40: ("M11_brocheta-pollo",             "Brocheta de pollo"),
    41: ("M12_presa-iberica",              "Presa ib\u00e9rica"),
    42: ("M13_entrecot-ternera",           "Entrecot de ternera"),
    43: ("M14_estofado-ternera",           "Estofado de ternera"),
    45: ("G01_patata-asada",               "Patata asada"),
    46: ("G02_patatas-fritas",             "Patatas fritas"),
    47: ("G03_patatas-a-lo-pobre",         "Patatas a lo pobre"),
    48: ("G04_pimientos-padron",           "Pimientos de padr\u00f3n"),
    49: ("G05_verduras-parrilla",          "Verduras a la parrilla"),
    50: ("A01_salsa-champinones",          "Salsa de champi\u00f1ones"),
    51: ("A02_salsa-pimienta",             "Salsa de pimienta"),
    52: ("A03_salsa-alioli",               "Salsa alioli"),
    57: ("P05_pata-pulpo-brasa",           "Pata de pulpo XL a la brasa"),
    58: ("P06_calamar-nacional",           "Calamar nacional a la plancha"),
    64: ("N04_brochetita-langostino",      "Brochetita de langostino"),
    66: ("D01_tarta-queso",                "Tarta de queso"),
    67: ("D02_tarta-pistacho",             "Tarta de pistacho"),
    70: ("D05_brownie-chocolate-blanco",   "Brownie con sopa de chocolate blanco"),
}

CSS = """
<style id="tdv-carta-imagenes">
/* Imagenes de plato de la carta - Torre de Vega */
.uagb-rest_menu__wrap .uagb-rm__content{
  display:flex;
  align-items:center;
  gap:16px;
}
.uagb-rest_menu__wrap .uagb-rm-details{flex:1 1 auto;min-width:0;}
.uagb-rest_menu__wrap .uagb-rm__price{flex:0 0 auto;}
img.tdv-dish-img{
  flex:0 0 auto;
  width:82px;
  height:82px;
  object-fit:contain;
  object-position:center;
  display:block;
  border:0;
  border-radius:0;
  box-shadow:none;
  background:transparent;
  /* El PNG va sobre blanco puro: multiply borra el blanco sobre cualquier fondo
     claro y deja pasar la sombra de contacto real de la foto. */
  mix-blend-mode:multiply;
}
/* Si algun dia la carta pasa a fondo oscuro, multiply dejaria de funcionar.
   En ese caso, descomentar esto para servir la imagen sobre su propia pastilla
   blanca en vez de fundirla con el fondo:
     img.tdv-dish-img{mix-blend-mode:normal;background:#fff;border-radius:6px;padding:2px;}
*/
@media (max-width:781px){
  img.tdv-dish-img{width:64px;height:64px;}
  .uagb-rest_menu__wrap .uagb-rm__content{gap:12px;}
}
@media print{
  img.tdv-dish-img{mix-blend-mode:normal;}
}
</style>
"""

ANCHOR = '<div class="uagb-rm__content">'


def construir_img(img_id, alt):
    return (
        '<img class="tdv-dish-img no-lazy skip-lazy" loading="lazy" decoding="async" '
        'width="1080" height="1080" src="%s/%s.webp" alt="%s">'
        % (WEB_PATH, img_id, alt)
    )


def main():
    os.makedirs(IMG_DIR, exist_ok=True)

    # 1. copiar los webp que se van a usar
    origen = os.path.join(BASE, "web")
    copiados = 0
    faltan = []
    for img_id, _ in MAPA.values():
        p = os.path.join(origen, img_id + ".webp")
        if os.path.exists(p):
            shutil.copy2(p, os.path.join(IMG_DIR, img_id + ".webp"))
            copiados += 1
        else:
            faltan.append(img_id)
    if faltan:
        raise SystemExit("Faltan webp por generar: %s" % faltan)

    # 2. insertar las <img> por indice de bloque
    html = open(SRC_HTML, encoding="utf-8").read()
    trozos = []
    pos = 0
    n = 0
    insertadas = 0
    for m in re.finditer(re.escape(ANCHOR), html):
        n += 1
        if n not in MAPA:
            continue
        img_id, alt = MAPA[n]
        fin = m.end()
        trozos.append(html[pos:fin])
        trozos.append(construir_img(img_id, alt))
        pos = fin
        insertadas += 1
    trozos.append(html[pos:])
    html = "".join(trozos)

    # 3. inyectar el CSS justo antes de </head>
    if 'id="tdv-carta-imagenes"' not in html:
        html = html.replace("</head>", CSS + "</head>", 1)

    open(DST_HTML, "w", encoding="utf-8").write(html)
    print("bloques de producto encontrados: %d" % n)
    print("imagenes insertadas:             %d" % insertadas)
    print("webp copiados a img-carta:       %d" % copiados)
    print("salida: %s" % DST_HTML)


if __name__ == "__main__":
    main()
