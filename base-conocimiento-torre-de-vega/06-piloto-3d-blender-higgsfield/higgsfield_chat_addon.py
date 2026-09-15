bl_info = {
    "name": "Higgsfield Chat",
    "author": "Victor + Claude",
    "version": (0, 1, 0),
    "blender": (4, 0, 0),
    "location": "View3D > Sidebar > Higgsfield",
    "description": "Genera imagenes y videos con Higgsfield sin salir de Blender",
    "category": "3D View",
}

import bpy
import json
import os
import threading
import time
import urllib.request
import urllib.error

API_BASE = "https://api.higgsfield.ai"

# --------------------------------------------------------------------------
# Estado compartido entre el hilo de red y el hilo principal de Blender.
# Nunca se toca bpy.* desde el hilo de red: solo se escribe aqui, y un
# timer en el hilo principal lee esto y hace las operaciones de Blender.
# --------------------------------------------------------------------------
_lock = threading.Lock()
_pending = {}  # request_id -> dict con progreso/resultado


def get_prefs():
    return bpy.context.preferences.addons[__name__].preferences


def _auth_header(prefs):
    return "Key {}:{}".format(prefs.api_key_id, prefs.api_key_secret)


def _http_json(url, headers, method="GET", body=None, timeout=30):
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _download_to(url, dest_path, timeout=60):
    req = urllib.request.Request(url, headers={})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        with open(dest_path, "wb") as f:
            f.write(resp.read())


ENDPOINTS = {
    "IMAGE": "/higgsfield-ai/soul/standard",
    "VIDEO_I2V": "/kling-video/v2.1/standard/image-to-video",
}


def _build_body(props):
    if props.mode == "IMAGE":
        return {
            "prompt": props.prompt,
            "resolution": props.resolution,
            "aspect_ratio": props.aspect_ratio,
        }
    else:
        return {
            "prompt": props.prompt,
            "image_url": props.image_url,
            "duration": int(props.video_duration),
        }


def _worker_submit_and_poll(op_key, prefs_key_id, prefs_key_secret, path, body, out_dir):
    """Corre en un hilo aparte. Solo hace red + disco, nunca bpy."""
    headers_json = {
        "Authorization": "Key {}:{}".format(prefs_key_id, prefs_key_secret),
        "Content-Type": "application/json",
    }
    headers_plain = {"Authorization": "Key {}:{}".format(prefs_key_id, prefs_key_secret)}

    def set_state(**kw):
        with _lock:
            _pending[op_key].update(kw)

    try:
        set_state(phase="submitting")
        resp = _http_json(API_BASE + path, headers_json, method="POST", body=body)
        request_id = resp.get("request_id")
        status_url = resp.get("status_url") or (API_BASE + "/requests/{}/status".format(request_id))
        set_state(phase="queued", request_id=request_id)

        while True:
            time.sleep(2)
            status_resp = _http_json(status_url, headers_plain, method="GET")
            status = status_resp.get("status")
            set_state(phase=status)
            if status in ("completed", "failed", "nsfw", "canceled"):
                if status == "completed":
                    urls = []
                    if status_resp.get("images"):
                        urls = [im["url"] for im in status_resp["images"]]
                    elif status_resp.get("video"):
                        urls = [status_resp["video"]["url"]]
                    saved_paths = []
                    os.makedirs(out_dir, exist_ok=True)
                    for i, u in enumerate(urls):
                        ext = ".mp4" if "video" in status_resp and status_resp.get("video") else ".png"
                        dest = os.path.join(out_dir, "{}_{}{}".format(op_key, i, ext))
                        _download_to(u, dest)
                        saved_paths.append(dest)
                    set_state(phase="done", files=saved_paths)
                else:
                    set_state(phase="error", error=status_resp.get("error") or status)
                return
    except urllib.error.HTTPError as e:
        try:
            detail = e.read().decode("utf-8")
        except Exception:
            detail = str(e)
        set_state(phase="error", error="HTTP {}: {}".format(e.code, detail))
    except Exception as e:
        set_state(phase="error", error=str(e))


class HiggsfieldPreferences(bpy.types.AddonPreferences):
    bl_idname = __name__

    api_key_id: bpy.props.StringProperty(name="API Key ID")
    api_key_secret: bpy.props.StringProperty(name="API Key Secret", subtype="PASSWORD")

    def draw(self, context):
        layout = self.layout
        layout.prop(self, "api_key_id")
        layout.prop(self, "api_key_secret")
        col = layout.column()
        col.label(text="Consigue tu API key en cloud.higgsfield.ai (seccion API).")
        col.label(text="Nunca compartas tu Key Secret.")


class HiggsfieldMessage(bpy.types.PropertyGroup):
    role: bpy.props.StringProperty()
    text: bpy.props.StringProperty()


class HiggsfieldProps(bpy.types.PropertyGroup):
    prompt: bpy.props.StringProperty(name="Prompt", default="")
    mode: bpy.props.EnumProperty(
        name="Tipo",
        items=[
            ("IMAGE", "Imagen", "Texto a imagen (Higgsfield Soul)"),
            ("VIDEO_I2V", "Imagen a Video", "Animar una imagen (Kling)"),
        ],
        default="IMAGE",
    )
    resolution: bpy.props.EnumProperty(
        name="Resolucion", items=[("2K", "2K", ""), ("4K", "4K", "")], default="2K"
    )
    aspect_ratio: bpy.props.EnumProperty(
        name="Aspecto",
        items=[(v, v, "") for v in ["1:1", "4:3", "3:4", "16:9", "9:16", "21:9"]],
        default="4:3",
    )
    image_url: bpy.props.StringProperty(
        name="URL imagen base", description="URL publica de la imagen a animar (para modo video)"
    )
    video_duration: bpy.props.EnumProperty(
        name="Duracion", items=[("5", "5s", ""), ("10", "10s", "")], default="5"
    )
    status: bpy.props.StringProperty(default="")
    busy: bpy.props.BoolProperty(default=False)
    current_op_key: bpy.props.StringProperty(default="")
    messages: bpy.props.CollectionProperty(type=HiggsfieldMessage)


def _add_message(props, role, text):
    m = props.messages.add()
    m.role = role
    m.text = text


def _poll_timer():
    scene = bpy.context.scene
    if scene is None:
        return 0.5
    props = scene.higgsfield_props
    if not props.busy or not props.current_op_key:
        return 0.5

    with _lock:
        state = dict(_pending.get(props.current_op_key, {}))

    phase = state.get("phase", "")
    if phase and phase != props.status:
        props.status = phase

    if phase == "done":
        files = state.get("files", [])
        for f in files:
            if f.lower().endswith((".png", ".jpg", ".jpeg")):
                img = bpy.data.images.load(f, check_existing=True)
                bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0, 0))
                plane = bpy.context.active_object
                plane.name = "Higgsfield_" + os.path.basename(f)
                mat = bpy.data.materials.new(plane.name + "_mat")
                mat.use_nodes = True
                bsdf = mat.node_tree.nodes.get("Principled BSDF")
                tex_node = mat.node_tree.nodes.new("ShaderNodeTexImage")
                tex_node.image = img
                if bsdf:
                    mat.node_tree.links.new(tex_node.outputs["Color"], bsdf.inputs["Base Color"])
                plane.data.materials.append(mat)
                _add_message(props, "assistant", "Imagen importada como plano: " + plane.name)
            else:
                _add_message(props, "assistant", "Video descargado en: " + f)
        props.busy = False
        props.current_op_key = ""
        return None

    if phase == "error":
        _add_message(props, "assistant", "Error: " + state.get("error", "desconocido"))
        props.busy = False
        props.current_op_key = ""
        return None

    return 1.0


class HIGGSFIELD_OT_send(bpy.types.Operator):
    bl_idname = "higgsfield.send"
    bl_label = "Generar"
    bl_description = "Enviar el prompt a Higgsfield"

    def execute(self, context):
        props = context.scene.higgsfield_props
        prefs = get_prefs()

        if not prefs.api_key_id or not prefs.api_key_secret:
            self.report({'ERROR'}, "Configura tu API key de Higgsfield en las preferencias del addon")
            return {'CANCELLED'}
        if not props.prompt.strip():
            self.report({'ERROR'}, "Escribe un prompt primero")
            return {'CANCELLED'}
        if props.mode == "VIDEO_I2V" and not props.image_url.strip():
            self.report({'ERROR'}, "El modo Imagen a Video necesita una URL de imagen publica")
            return {'CANCELLED'}
        if props.busy:
            self.report({'WARNING'}, "Ya hay una generacion en curso")
            return {'CANCELLED'}

        _add_message(props, "user", props.prompt)

        op_key = "op_{}".format(int(time.time() * 1000))
        path = ENDPOINTS[props.mode]
        body = _build_body(props)

        out_dir = os.path.join(
            bpy.path.abspath("//") or os.path.expanduser("~"),
            "higgsfield_generado",
        )

        with _lock:
            _pending[op_key] = {"phase": "starting"}

        props.busy = True
        props.current_op_key = op_key
        props.status = "starting"

        t = threading.Thread(
            target=_worker_submit_and_poll,
            args=(op_key, prefs.api_key_id, prefs.api_key_secret, path, body, out_dir),
            daemon=True,
        )
        t.start()

        if not bpy.app.timers.is_registered(_poll_timer):
            bpy.app.timers.register(_poll_timer, first_interval=0.5)

        return {'FINISHED'}


class HIGGSFIELD_PT_panel(bpy.types.Panel):
    bl_label = "Higgsfield"
    bl_idname = "HIGGSFIELD_PT_panel"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "Higgsfield"

    def draw(self, context):
        layout = self.layout
        props = context.scene.higgsfield_props
        prefs = get_prefs()

        if not prefs.api_key_id or not prefs.api_key_secret:
            box = layout.box()
            box.label(text="Falta API key", icon='ERROR')
            box.label(text="Edit > Preferences > Add-ons >")
            box.label(text="Higgsfield Chat > pega tu key")

        # Historial tipo chat
        chat_box = layout.box()
        col = chat_box.column(align=True)
        if len(props.messages) == 0:
            col.label(text="(sin mensajes todavia)")
        for m in props.messages[-12:]:
            prefix = "Tu: " if m.role == "user" else "Higgsfield: "
            col.label(text=(prefix + m.text)[:60])

        if props.busy:
            layout.label(text="Estado: " + props.status, icon='TIME')

        layout.separator()
        layout.prop(props, "mode")
        layout.prop(props, "prompt")

        if props.mode == "IMAGE":
            layout.prop(props, "resolution")
            layout.prop(props, "aspect_ratio")
        else:
            layout.prop(props, "image_url")
            layout.prop(props, "video_duration")

        row = layout.row()
        row.enabled = not props.busy
        row.operator("higgsfield.send", icon='PLAY')


classes = (
    HiggsfieldPreferences,
    HiggsfieldMessage,
    HiggsfieldProps,
    HIGGSFIELD_OT_send,
    HIGGSFIELD_PT_panel,
)


def register():
    for c in classes:
        bpy.utils.register_class(c)
    bpy.types.Scene.higgsfield_props = bpy.props.PointerProperty(type=HiggsfieldProps)


def unregister():
    del bpy.types.Scene.higgsfield_props
    for c in reversed(classes):
        bpy.utils.unregister_class(c)


if __name__ == "__main__":
    register()
