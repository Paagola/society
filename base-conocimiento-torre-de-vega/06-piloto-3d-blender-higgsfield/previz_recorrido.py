# -*- coding: utf-8 -*-
"""
Torre de Vega — PREVIZ de recorrido de camara
=============================================
Bloquea los movimientos de camara del Reel DENTRO del blockout del local,
en gris y sin acabados. No es un render bonito: es un guion de camara con
datos reales (focal, altura, velocidad, duracion) para que luego el plano
de verdad se grabe o se genere encajando con el.

Como usarlo:
    1. Abrir  torre_de_vega_blockout.blend
    2. Pestana Scripting -> Abrir este archivo -> Run Script (Alt+P)
    3. Leer el informe que imprime en consola
    4. Timeline -> Play, o Ctrl+F12 para renderizar el recorrido

Por que previz y no un render final: la regla 1 del proyecto dice que nada
puede verse que no exista en el local real. Un render 3D es sintetico por
construccion. Pero un recorrido de camara bloqueado NO se publica: se usa
para decidir como se mueve la camara, y eso el 3D lo hace mejor que nadie.
"""

import bpy
import math
from mathutils import Vector

# ===========================================================================
# CONFIGURACION
# ===========================================================================

# --- ESCALA -----------------------------------------------------------------
# NOTAS_MODELO.md dice que la escala es ARBITRARIA y sin verificar.
# En cuanto tengas UNA medida real del local (el ancho de la fachada o el
# largo del comedor, en metros), ponla aqui y todo se recalibra solo.
#
#   MEDIDA_REAL_M  = metros que mide de verdad ese elemento
#   OBJETO_MEDIDO  = nombre del objeto del blockout que corresponde
#   EJE_MEDIDO     = 'X' o 'Y', segun en que direccion se midio
#
# Si lo dejas en None, el script asume que el blockout ya esta en metros
# y te avisa de que la altura de camara es una suposicion.
MEDIDA_REAL_M = None
OBJETO_MEDIDO = "01_Restaurante_Barra"
EJE_MEDIDO = "X"

# --- CAMARA -----------------------------------------------------------------
ALTURA_OJOS = 1.60          # metros. Persona de pie recorriendo el local
ALTURA_SENTADO = 1.15       # metros. Altura de ojos de un comensal sentado
FPS = 30
RESOLUCION = (1080, 1920)   # 9:16

# Cada plano: (nombre, segundos, focal_mm, descripcion)
PLANOS = [
    ("01_entrada",      3.0, 24, "Entrada al local, plano abierto"),
    ("02_arcos",        3.0, 35, "Avance por los dos arcos de ladrillo"),
    ("03_comedor",      3.0, 35, "Revelado del comedor y la chimenea"),
    ("04_mesa_ventana", 3.0, 50, "Llegada a la mesa, altura de comensal"),
]


# ===========================================================================
# Lectura de la escena
# ===========================================================================

def buscar_objeto(*fragmentos):
    """Busca el primer objeto cuyo nombre contenga alguno de los fragmentos."""
    for frag in fragmentos:
        f = frag.lower()
        for obj in bpy.data.objects:
            if f in obj.name.lower() and obj.type == 'MESH':
                return obj
    return None


def caja_mundo(obj):
    """Bounding box del objeto en coordenadas de mundo."""
    esquinas = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    xs = [c.x for c in esquinas]
    ys = [c.y for c in esquinas]
    zs = [c.z for c in esquinas]
    return {
        "min": Vector((min(xs), min(ys), min(zs))),
        "max": Vector((max(xs), max(ys), max(zs))),
        "centro": Vector(((min(xs) + max(xs)) / 2,
                          (min(ys) + max(ys)) / 2,
                          (min(zs) + max(zs)) / 2)),
        "dim": Vector((max(xs) - min(xs), max(ys) - min(ys), max(zs) - min(zs))),
    }


def calcular_escala():
    """
    Devuelve (factor, texto_aviso).
    factor = cuanto hay que multiplicar las unidades del blockout para
    obtener metros reales.
    """
    if MEDIDA_REAL_M is None:
        return 1.0, ("ESCALA SIN VERIFICAR: se asume que el blockout ya esta "
                     "en metros. Las alturas de camara son una SUPOSICION. "
                     "Rellena MEDIDA_REAL_M arriba en cuanto tengas una medida.")

    obj = buscar_objeto(OBJETO_MEDIDO)
    if obj is None:
        return 1.0, "No encontre '%s' para calibrar. Escala sin tocar." % OBJETO_MEDIDO

    caja = caja_mundo(obj)
    actual = caja["dim"].x if EJE_MEDIDO.upper() == "X" else caja["dim"].y
    if actual <= 0:
        return 1.0, "El objeto de calibracion tiene dimension 0. Escala sin tocar."

    factor = MEDIDA_REAL_M / actual
    return factor, ("ESCALA CALIBRADA: '%s' mide %.3f unidades y son %.2f m "
                    "reales -> factor %.4f" % (OBJETO_MEDIDO, actual,
                                               MEDIDA_REAL_M, factor))


# ===========================================================================
# Construccion de la previz
# ===========================================================================

def limpiar_previz():
    """Borra solo lo que genero este script. No toca el blockout."""
    for obj in list(bpy.data.objects):
        if obj.name.startswith("PREVIZ_"):
            bpy.data.objects.remove(obj, do_unlink=True)
    col = bpy.data.collections.get("PREVIZ")
    if col:
        bpy.data.collections.remove(col)


def coleccion_previz():
    col = bpy.data.collections.new("PREVIZ")
    bpy.context.scene.collection.children.link(col)
    return col


def crear_camara(col, nombre, loc, mirar_a, focal, altura):
    cam_data = bpy.data.cameras.new(nombre)
    cam_data.lens = focal
    cam_data.sensor_width = 36.0
    cam = bpy.data.objects.new(nombre, cam_data)
    col.objects.link(cam)

    cam.location = Vector((loc.x, loc.y, altura))

    # Orientar hacia el objetivo
    direccion = Vector((mirar_a.x, mirar_a.y, altura)) - cam.location
    if direccion.length > 1e-6:
        cam.rotation_euler = direccion.to_track_quat('-Z', 'Y').to_euler()
    return cam


def construir(col, edificio, factor):
    """
    Recorrido apoyado en la ORIENTACION REAL del blockout, leida de
    'higgsfield_assets/render_planta_direcciones_labeled.png':

        x = 0        -> esquina de la chimenea      (la sala crece hacia +X)
        y = 0        -> pared de ventanas           (la sala crece hacia +Y)
        y alto       -> barra y particion con los dos arcos
        y bajo       -> comedor pegado a las ventanas

    Las posiciones van como fraccion de la caja del edificio, no como
    coordenadas fijas: si el blockout se reescala o se amplia, el recorrido
    sigue siendo valido.
    """
    caja = caja_mundo(edificio)
    d = caja["dim"]
    o = caja["min"]          # origen: esquina chimenea + pared de ventanas
    suelo = caja["min"].z

    h_ojos = (ALTURA_OJOS / factor) + suelo
    h_sentado = (ALTURA_SENTADO / factor) + suelo

    def punto(fx, fy):
        return Vector((o.x + d.x * fx, o.y + d.y * fy, 0))

    # --- Recorrido: se entra por la barra y se termina en la ventana -------
    p_entrada = punto(0.55, 0.88)   # zona de barra, al fondo
    p_arcos   = punto(0.45, 0.56)   # cruzando la particion de los arcos
    p_comedor = punto(0.34, 0.34)   # ya dentro del comedor
    p_mesa    = punto(0.16, 0.14)   # mesa junto a la ventana, cerca de la chimenea

    # --- Hacia donde mira en cada momento ---------------------------------
    # La diana se mueve: sin eso la camara no "gira la cabeza" y el recorrido
    # queda plano. El giro hacia la chimenea es lo que hace el revelado.
    t_entrada = punto(0.45, 0.10)   # mira hacia las ventanas, sala adelante
    t_arcos   = punto(0.38, 0.05)
    t_comedor = punto(0.03, 0.30)   # gira hacia la esquina de la chimenea
    t_mesa    = punto(0.14, -0.05)  # remata en la ventana de la mesa

    puntos  = [p_entrada, p_arcos, p_comedor, p_mesa]
    dianas  = [t_entrada, t_arcos, t_comedor, t_mesa]
    alturas = [h_ojos, h_ojos, h_ojos, h_sentado]

    # --- Camaras fijas, una por plano -------------------------------------
    # Cada una mira a SU diana, no todas al mismo sitio.
    camaras = []
    for i, (nombre, seg, focal, desc) in enumerate(PLANOS):
        cam = crear_camara(col, "PREVIZ_" + nombre, puntos[i], dianas[i],
                           focal, alturas[i])
        camaras.append(cam)

    # --- Camara animada que recorre los cuatro puntos ----------------------
    recorrido = crear_camara(col, "PREVIZ_CAM_recorrido", puntos[0], dianas[0],
                             PLANOS[0][2], alturas[0])

    # La diana tambien se mueve. Sin esto la camara avanza mirando siempre al
    # mismo punto y el recorrido queda plano: el giro hacia la chimenea es lo
    # que convierte un desplazamiento en un revelado.
    diana = bpy.data.objects.new("PREVIZ_diana", None)
    col.objects.link(diana)
    diana.empty_display_size = 0.25
    diana.location = Vector((dianas[0].x, dianas[0].y, h_ojos))

    seguir = recorrido.constraints.new('TRACK_TO')
    seguir.target = diana
    seguir.track_axis = 'TRACK_NEGATIVE_Z'
    seguir.up_axis = 'UP_Y'

    esc = bpy.context.scene
    esc.render.fps = FPS
    esc.frame_start = 1

    frame = 1
    for i, (nombre, seg, focal, desc) in enumerate(PLANOS):
        recorrido.location = Vector((puntos[i].x, puntos[i].y, alturas[i]))
        recorrido.data.lens = focal
        recorrido.keyframe_insert("location", frame=frame)
        recorrido.data.keyframe_insert("lens", frame=frame)

        diana.location = Vector((dianas[i].x, dianas[i].y, h_ojos))
        diana.keyframe_insert("location", frame=frame)

        frame += int(seg * FPS)

    # Ultimo keyframe: la camara se asienta en la mesa y la diana en la ventana
    recorrido.location = Vector((puntos[-1].x, puntos[-1].y, alturas[-1]))
    recorrido.keyframe_insert("location", frame=frame)
    diana.location = Vector((dianas[-1].x, dianas[-1].y, h_sentado))
    diana.keyframe_insert("location", frame=frame)
    esc.frame_end = frame

    # Velocidad constante: un recorrido con ease lee como clip de stock
    for obj in (recorrido, diana):
        if obj.animation_data and obj.animation_data.action:
            for fc in obj.animation_data.action.fcurves:
                for kp in fc.keyframe_points:
                    kp.interpolation = 'LINEAR'

    esc.camera = recorrido
    return camaras, recorrido, caja, factor


def configurar_render_previz():
    """
    Workbench en gris. Sin materiales, sin luces, sin ruido: en previz lo
    unico que importa es el encuadre y el movimiento.
    """
    esc = bpy.context.scene
    esc.render.engine = 'BLENDER_WORKBENCH'
    esc.render.resolution_x, esc.render.resolution_y = RESOLUCION
    esc.render.resolution_percentage = 100

    shading = esc.display.shading
    shading.light = 'STUDIO'
    shading.color_type = 'SINGLE'
    shading.single_color = (0.62, 0.60, 0.58)
    shading.show_shadows = True
    shading.show_cavity = True

    esc.render.image_settings.file_format = 'FFMPEG'
    esc.render.ffmpeg.format = 'MPEG4'
    esc.render.ffmpeg.codec = 'H264'
    esc.render.filepath = "//previz_recorrido_"


# ===========================================================================

def main():
    limpiar_previz()

    edificio = buscar_objeto("01_Restaurante", "Restaurante", "Barra", "Comedor")
    if edificio is None:
        print("!" * 68)
        print("No encuentro el edificio del restaurante en la escena.")
        print("Objetos tipo MESH disponibles:")
        for o in bpy.data.objects:
            if o.type == 'MESH':
                print("   -", o.name)
        print("Ajusta buscar_objeto() con el nombre correcto y vuelve a lanzar.")
        print("!" * 68)
        return

    factor, aviso = calcular_escala()
    col = coleccion_previz()
    camaras, recorrido, caja, factor = construir(col, edificio, factor)
    configurar_render_previz()

    esc = bpy.context.scene
    dur = (esc.frame_end - esc.frame_start + 1) / FPS

    print("=" * 68)
    print("PREVIZ DE RECORRIDO — Torre de Vega")
    print("=" * 68)
    print(aviso)
    print()
    print("Edificio de referencia : %s" % edificio.name)
    print("Dimensiones (unidades) : %.2f x %.2f x %.2f" %
          (caja["dim"].x, caja["dim"].y, caja["dim"].z))
    print("Dimensiones (metros)   : %.2f x %.2f x %.2f" %
          (caja["dim"].x * factor, caja["dim"].y * factor,
           caja["dim"].z * factor))
    print()
    print("Planos bloqueados:")
    for (nombre, seg, focal, desc) in PLANOS:
        print("   PREVIZ_%-16s %4.1f s   %2d mm   %s" %
              (nombre, seg, focal, desc))
    print()
    print("Recorrido completo     : %.1f s  (%d frames a %d fps)" %
          (dur, esc.frame_end, FPS))
    print("Salida                 : %dx%d (9:16), Workbench gris" % RESOLUCION)
    print()
    print("Siguiente paso: Play en el timeline para ver el movimiento.")
    print("Ctrl+F12 renderiza el recorrido a video.")
    print("=" * 68)


if __name__ == "__main__":
    main()
