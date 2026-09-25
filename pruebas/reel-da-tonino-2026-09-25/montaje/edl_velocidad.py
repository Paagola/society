"""EDL v2 del reel Da Tonino para la composición HosteleriaReelSpeed de OpenMontage.

v1 (montar.py) respetaba la velocidad real y el cliente la rechazó por lenta (R-VEL-01).
v2 fabrica la energía en montaje, sin generar vídeo nuevo:
  - tramos sin acción a 2-3x (la comida en reposo aguanta la aceleración),
  - momentos de acción a 1-1.2x (rúcula cayendo, pasta en el aire, socarrat),
  - snap zooms, whips, zoom, flash y sacudida en el impacto, como la referencia,
  - cortes de 0,3-0,9 s (referencia: ~0,6 s).
Los sub-cortes encadenados sobre la misma fuente con transitionIn "cut" forman rampas
de velocidad sin salto: el `from` de cada uno se calcula a partir del anterior.

Tiempos de la multitoma: toma 1 sala 0-2.75 · toma 2 masa 2.75-5.67 · toma 3 rúcula
5.67-8.71 · toma 4 rigatoni 8.71-11.75 · toma 5 paella 11.75-15.04.
"""
import json, pathlib, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else "datonino/multitoma.mp4"
OUT = pathlib.Path(__file__).resolve().parent / "props_datonino_v2.json"

shots = []
def seg(id, frm, src_len, rate, trans="cut", scale=(1.0, 1.03), snap=False, shake=None, snap_frames=7):
    """frm y src_len en segundos de la fuente; la duración en la línea de tiempo es src_len/rate."""
    s = {"id": id, "src": SRC, "from": round(frm, 3), "duration": round(src_len / rate, 3),
         "rate": rate, "transitionIn": trans, "scale": list(scale)}
    if snap: s["snap"] = True; s["snapFrames"] = snap_frames
    if shake: s["shakeAt"] = shake
    shots.append(s)

# 1 · Gancho: la pizza aterriza en la sala (acción desde el fotograma 1) y snap hacia ella
seg("1a_aterriza", 0.00, 0.85, 1.0, scale=(1.0, 1.04))
seg("1b_snap_pizza", 0.85, 1.75, 2.5, scale=(1.0, 1.22), snap=True)
# 2 · Masa: ELIMINADO (25/09/2026). La toma de la multitoma solo presiona la masa con los
#     cinco dedos, un gesto sin oficio: un pizzaiolo la coge, la estira y la moldea.
#     Regla R-GESTO-01 (skill directoria, hosteleria/05 §3.1).
# 3 · Rúcula: whip a la cocina, la mano abre rápido, la caída casi a tiempo real, impacto
seg("3a_mano", 5.75, 0.55, 2.0, trans="whip-left", scale=(1.10, 1.14))
seg("3b_cae", 6.30, 1.05, 1.15, scale=(1.14, 1.20), shake=[0.62])
seg("3c_snap_jamon", 7.35, 1.25, 3.0, scale=(1.20, 1.40), snap=True)
# 4 · Rigatoni: zoom de entrada, preparación a 3x, salto a tiempo real, caída con punch
seg("4a_sarten", 8.80, 1.50, 3.0, trans="zoom", scale=(1.0, 1.05))
seg("4b_salto", 10.30, 0.70, 1.0, scale=(1.05, 1.10), shake=[0.05])
seg("4c_cae", 11.00, 0.70, 1.8, scale=(1.25, 1.18), snap=True, snap_frames=5)
# 5 · Paella: flash a la sala, acercamiento rápido y el socarrat como pausa-impacto
seg("5a_paella", 11.80, 1.00, 2.5, trans="flash", scale=(1.0, 1.10), snap=True)
seg("5b_socarrat", 12.80, 2.10, 1.5, scale=(1.10, 1.16))
# 6 · Cierre en el plato estrella (como la referencia cierra en la hamburguesa)
seg("6_heroe_pizza", 1.10, 1.30, 1.0, trans="whip-right", scale=(1.18, 1.26))
# 7 · Placa final sobre negro
shots.append({"id": "7_placa", "duration": 2.2, "transitionIn": "cut"})

total = sum(s["duration"] for s in shots)
card = total - 2.2
props = {
    "shots": shots,
    "fonts": {"serif": "datonino/serif.ttf", "sans": "datonino/sans.ttf"},
    "titles": [
        {"text": "DA TONINO · RISTORANTE", "start": 0, "end": 1.7, "y": 330, "font": "sans", "fontSize": 34},
        {"text": "Masa, fuego y mesa", "start": 0, "end": 1.7, "y": 405, "font": "serif", "fontSize": 88},
    ],
    "brand": {"start": round(card, 3), "end": round(total, 3), "y": 780, "title": "Da Tonino", "subtitle": "RISTORANTE",
              "lines": ["Reserva tu mesa", "MÁNDASELO A QUIEN TE DEBE UNA CENA"]},
    "grain": 0.05, "vignette": 0.3, "fadeOutFrames": 8,
}
OUT.write_text(json.dumps(props, ensure_ascii=False, indent=1), encoding="utf-8")
cuts = [s["duration"] for s in shots[:-1]]
print(f"total {total:.2f} s · {len(shots)} cortes · corte medio (sin placa) {sum(cuts)/len(cuts):.2f} s")
print(OUT)
