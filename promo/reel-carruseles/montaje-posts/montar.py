#!/usr/bin/env python3
"""Monta los posts escribiendo HTML sobre las fotos originales, sin tocarlas.
Coordenadas en el lienzo nativo de la foto (1856 x 2304). Salida: html/<id>.html"""
import os

HEAD = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:AN;src:url(../../fuentes/ArchivoNarrow.ttf);font-weight:400 700}
@font-face{font-family:B;src:url(../../fuentes/BricolageGrotesque.ttf);font-weight:200 800}
@font-face{font-family:M;src:url(../IBMPlexMono-Regular.ttf)}
@font-face{font-family:C;src:url(../CourierPrime-Regular.ttf)}
@font-face{font-family:CA;src:url(../../fuentes/Caslon.ttf);font-weight:400 700}
@font-face{font-family:CAI;src:url(../../fuentes/CaslonI.ttf);font-weight:400 700}
@font-face{font-family:H;src:url(../../fuentes/Caveat.ttf);font-weight:400 700}
html,body{margin:0;width:1856px;height:2304px;overflow:hidden;background:#000}
.f{position:absolute;inset:0;background-size:1856px 2304px;background-position:0 0}
.a{position:absolute;white-space:nowrap}
.an{font-family:AN;font-weight:700;letter-spacing:-0.01em;line-height:.9}
.b{font-family:B;font-weight:800;letter-spacing:-0.035em;line-height:.82;font-variation-settings:"opsz" 96,"wdth" 75}
.m{font-family:M;font-size:38px;letter-spacing:.02em;line-height:1.4}
.c{font-family:C;font-size:44px;line-height:1.35}
.ca{font-family:CA;font-weight:700;letter-spacing:-0.01em;line-height:1}
.h{font-family:H;font-weight:500;line-height:1}
.ink{color:#141414;mix-blend-mode:multiply}
.hueso{color:#EDE7DD}
svg{position:absolute;left:0;top:0;overflow:visible}
</style></head><body>"""

def foto(src):
    return f'<div class="f" style="background-image:url({src})"></div>'

def svg(body, w=1856, h=2304):
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'

AVISO = 'Propuesta no oficial · Society'
P = {}

# ───── Etxebarri 02 · plaza de Axpe: «PLAZA» pintado en el suelo mojado
P['E2'] = foto('../../assets/raw/E2.png') + f"""
<div class="a m hueso" style="left:70px;top:40px;color:#151515">ASADOR ETXEBARRI — AXPE</div>
<div class="a m" style="right:70px;top:40px;color:#151515">02/06</div>
<div class="a an ink" style="left:66px;top:120px;font-size:150px">Un pueblo, una plaza,<br>una parrilla.</div>
<div style="position:absolute;left:-200px;top:1340px;width:2256px;height:964px;perspective:1100px;perspective-origin:50% 0%">
  <div class="an" style="position:absolute;left:0;right:0;bottom:120px;text-align:center;font-size:760px;color:#F4F1EA;opacity:.78;transform:rotateX(64deg);transform-origin:50% 100%;letter-spacing:.02em">PLAZA</div>
</div>
<div class="a m hueso" style="left:70px;top:2150px;color:#F4F1EA">Bittor Arguinzoniz enciende las brasas con leña<br>cada mañana desde 1990.</div>
"""

# ───── Etxebarri 06 · la puerta: reloj a mano a la una
reloj = svg("""
<g transform="translate(330,1010)" fill="none" stroke="#151515" stroke-linecap="round" stroke-linejoin="round" style="mix-blend-mode:multiply">
 <path d="M-118,-12 C-122,-80 -60,-128 4,-124 C78,-121 126,-62 122,6 C118,74 62,124 -6,122 C-72,120 -124,66 -116,-6 C-114,-30 -104,-52 -92,-66" stroke-width="7"/>
 <path d="M0,0 L2,-88" stroke-width="8"/><path d="M0,0 L44,-26" stroke-width="8"/>
 <circle r="6" fill="#151515" stroke="none"/>
 <path d="M0,-108 L0,-96 M108,0 L96,0 M0,108 L0,96 M-108,0 L-96,0" stroke-width="5"/>
</g>""")
P['E6'] = foto('../../assets/raw/E6.png') + reloj + f"""
<div class="a m ink" style="left:70px;top:40px">ASADOR ETXEBARRI — AXPE</div>
<div class="a m ink" style="right:70px;top:40px">06/06</div>
<div class="a an ink" style="left:90px;top:470px;font-size:210px">Solo a<br>mediodía.</div>
<div class="a m ink" style="right:80px;top:2060px;text-align:right">Cierra lunes y martes.<br>Reserva por solicitud · asadoretxebarri.com<br><span style="opacity:.7;font-size:30px">{AVISO}</span></div>
"""

# ───── Disfrutar 01 · cajas originales, texto en las tapas
P['D1'] = foto('../../assets/raw/D1.png') + f"""
<div class="a b ink" style="left:968px;top:250px;font-size:410px">ELIGE</div>
<div class="a b ink" style="left:968px;top:1225px;font-size:330px">SIN</div>
<div class="a b ink" style="left:968px;top:1505px;font-size:330px">MIRAR.</div>
<div class="a b ink" style="left:60px;top:1240px;font-size:640px;font-weight:700">?</div>
<div class="a m ink" style="left:205px;top:420px;transform-origin:0 0;transform:rotate(90deg);font-size:40px">DISFRUTAR — BARCELONA</div>
<div class="a m ink" style="left:64px;top:2030px">Disfrutar aconseja elegir<br>el menú sin verlo.<br><span style="font-size:28px;opacity:.7">{AVISO}</span></div>
<div class="a m" style="left:1010px;top:2190px;color:#f2f0eb;opacity:.85">01/06</div>
<div class="a m" style="left:1600px;top:2190px;color:#f2f0eb;opacity:.85">desliza →</div>
"""

# ───── Disfrutar 02 · celosía: un hilo que cose los huecos de cerámica
hilo = svg("""
<path d="M-20,150 C200,160 330,190 365,280 C400,370 640,380 712,447 C790,520 420,700 365,878
 C320,1040 700,1180 712,1325 C724,1450 380,1430 365,1524 C350,1620 760,1640 895,1723
 C1010,1795 1010,1900 990,2010 C980,2070 1000,2112 1040,2116 L1790,2116"
 fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity=".95"/>""")
P['D2'] = foto('../../assets/raw/D2.png') + hilo + f"""
<div class="a m" style="left:1060px;top:40px;color:#FFF6EC">DISFRUTAR — BARCELONA</div>
<div class="a m" style="right:70px;top:40px;color:#FFF6EC">02/06</div>
<div class="a m" style="left:1060px;top:140px;color:#FFF6EC;font-size:34px">La entrada se inspira en la forja<br>del Mercat del Ninot y en los<br>colores cerámicos de Miró.</div>
<div class="a an ink" style="left:1040px;top:1720px;font-size:128px">La cerámica<br>es el hilo<br>conductor.</div>
"""

# ───── Disfrutar 03 · panchino: la palabra detrás del bollo
P['D3'] = foto('../../assets/raw/D3.png') + f"""
<div class="a b" style="left:24px;top:70px;font-size:430px;color:#141414">PANCHINO</div>
<div class="f" style="background-image:url(../../assets/raw/D3_rec.png)"></div>
<div class="a m ink" style="left:70px;top:40px">DISFRUTAR — BARCELONA</div>
<div class="a m ink" style="right:70px;top:40px">03/06</div>
<div class="a b ink" style="left:70px;top:1800px;font-size:150px">de caviar.</div>
<div class="a m ink" style="left:74px;top:1960px">Un clásico de la casa,<br>en el menú Classic.</div>
"""

# ───── Disfrutar 04 · esferas: titular arriba, un círculo a mano abajo
anillo = svg("""
<path d="M1085,2040 C1150,2060 1170,2140 1120,2190 C1070,2240 960,2232 925,2170 C890,2108 930,2040 1000,2030 C1040,2024 1070,2032 1095,2050"
 fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
<path d="M880,1990 C840,1950 790,1930 740,1932" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
<path d="M880,1990 L872,1958 M880,1990 L850,1994" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>""")
P['D4'] = foto('../../assets/raw/D4.png') + anillo + f"""
<div class="a m ink" style="left:70px;top:40px">DISFRUTAR — BARCELONA</div>
<div class="a m ink" style="right:70px;top:40px">04/06</div>
<div class="a b ink" style="left:60px;top:110px;font-size:330px">Sorprender</div>
<div class="a m ink" style="left:70px;top:430px;font-size:42px">es esencial. — «Sorprendre és un sentiment essencial.»</div>
<div class="a h" style="left:430px;top:1860px;font-size:110px;color:#fff">¿y esta?</div>
"""

# ───── Disfrutar 05 · sala blanca: cotas de plano
cotas = svg("""
<g stroke="#141414" stroke-width="3" fill="none" style="mix-blend-mode:multiply">
 <path d="M1200,860 L1560,860"/><path d="M1200,840 L1200,880 M1560,840 L1560,880"/>
 <path d="M300,700 L300,1180"/><path d="M280,700 L320,700 M280,1180 L320,1180"/>
 <path d="M1380,860 L1380,560"/><path d="M300,940 L520,940"/>
</g>""")
P['D5'] = foto('../../assets/raw/D5.png') + cotas + f"""
<div class="a m ink" style="left:70px;top:40px">DISFRUTAR — BARCELONA</div>
<div class="a m ink" style="right:70px;top:40px">05/06</div>
<div class="a m ink" style="left:1300px;top:500px">celosía</div>
<div class="a m ink" style="left:530px;top:915px">luz natural</div>
<div class="a an ink" style="left:80px;top:1580px;font-size:190px">Una sala<br>blanca.</div>
<div class="a m ink" style="left:84px;top:1960px">Inspirada en los pueblos de<br>pescadores del Mediterráneo.</div>
"""

# ───── Disfrutar 06 · olivo: ficha de herbario
herb = svg("""<path d="M640,980 C760,1140 900,1380 1080,1640" fill="none" stroke="#141414" stroke-width="3" style="mix-blend-mode:multiply"/>
<circle cx="1080" cy="1640" r="9" fill="#141414"/>""")
P['D6'] = foto('../../assets/raw/D6.png') + herb + f"""
<div class="a m ink" style="left:70px;top:40px">DISFRUTAR — BARCELONA</div>
<div class="a m ink" style="right:70px;top:40px">06/06</div>
<div class="a an ink" style="left:70px;top:140px;font-size:180px">Villarroel 163,<br>Barcelona.</div>
<div class="a ink" style="left:74px;top:560px;font-family:CAI;font-size:84px">Olea europaea</div>
<div class="a m ink" style="left:76px;top:680px">Frente al Mercat del Ninot.<br>Menús Classic y Festival.</div>
<div class="a m ink" style="left:76px;top:2140px">disfrutarbarcelona.com<br><span style="font-size:28px;opacity:.7">{AVISO}</span></div>
"""

# ───── St. JOHN 03 · Eccles cake y queso: diagrama de Venn
venn = svg("""<g fill="none" stroke="#141414" stroke-width="3" style="mix-blend-mode:multiply">
<circle cx="790" cy="1350" r="440"/><circle cx="1110" cy="1180" r="440"/></g>""")
P['S3'] = foto('../../assets/raw/S3.png') + venn + f"""
<div class="a c ink" style="left:80px;top:60px;font-size:40px">St. JOHN · Smithfield</div>
<div class="a c ink" style="right:80px;top:60px;font-size:40px">3/6</div>
<div class="a ca ink" style="left:76px;top:150px;font-size:118px">Eccles Cake and<br>Lancashire Cheese</div>
<div class="a ca ink" style="right:80px;top:150px;font-size:118px">12.50</div>
<div class="a c ink" style="left:80px;top:1830px">hojaldre y<br>pasas de Corinto</div>
<div class="a c ink" style="left:1330px;top:640px">queso de<br>Lancashire</div>
<div class="a c ink" style="left:80px;top:2190px;font-size:32px">{AVISO}</div>
"""

# ───── St. JOHN 04 · Welsh rarebit: línea de corte
corte = svg("""<path d="M880,1210 L560,1640" fill="none" stroke="#141414" stroke-width="4" stroke-dasharray="18 14" style="mix-blend-mode:multiply"/>""")
P['S4'] = foto('../../assets/raw/S4.png') + corte + f"""
<div class="a c ink" style="left:80px;top:420px;font-size:40px">St. JOHN · Smithfield</div>
<div class="a c ink" style="left:330px;top:1680px">por aquí.</div>
<div class="a ca ink" style="left:76px;top:1960px;font-size:150px">Welsh Rarebit.</div>
<div class="a ca ink" style="right:80px;top:1960px;font-size:150px">12.50</div>
<div class="a c ink" style="left:80px;top:2140px;font-size:40px">Pan tostado con queso fundido y gratinado.</div>
<div class="a c ink" style="right:80px;top:2220px;font-size:30px">4/6 · {AVISO}</div>
"""

# ───── St. JOHN 05 · cabeza de cerdo: «Del morro» detrás de las orejas
P['S5'] = foto('../../assets/raw/S5.png') + f"""
<div class="a ca" style="left:0;right:0;text-align:center;top:300px;font-size:330px;color:#141414">Del morro</div>
<div class="f" style="background-image:url(../../assets/raw/S5_rec.png)"></div>
<div class="a c ink" style="left:80px;top:60px;font-size:40px">St. JOHN · Smithfield</div>
<div class="a c ink" style="right:80px;top:60px;font-size:40px">5/6</div>
<div class="a ca ink" style="left:0;right:0;text-align:center;top:1960px;font-size:210px">a la cola.</div>
<div class="a c ink" style="left:0;right:0;text-align:center;top:2190px;font-size:32px">Fergus Henderson: usar todo el animal es «de sentido común, e incluso de buena educación».</div>
"""

# ───── St. JOHN 06 · fachada: año y etiquetas
eti = svg("""<path d="M640,1260 C800,1300 950,1420 1050,1610" fill="none" stroke="#FFFFFF" stroke-width="4"/>
<circle cx="1050" cy="1610" r="9" fill="#FFFFFF"/>""")
P['S6'] = foto('../../assets/raw/S6.png') + eti + f"""
<div class="a ca ink" style="left:800px;top:40px;font-size:150px;line-height:.95">Octubre<br>de 1994.</div>
<div class="a c" style="left:60px;top:1170px;color:#fff;font-size:38px">Un antiguo ahumadero<br>junto al mercado<br>de Smithfield.</div>
<div class="a c" style="right:70px;top:2240px;color:#fff;font-size:30px">6/6 · {AVISO}</div>
"""

os.makedirs('html', exist_ok=True)
for k, v in P.items():
    open(f'html/{k}.html', 'w').write(HEAD + v + '</body></html>')
print(' '.join(P))
