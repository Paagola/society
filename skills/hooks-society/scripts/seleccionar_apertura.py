"""Herramienta local de preproducción; no genera medios ni implementa la app Society."""
from pathlib import Path
from datetime import datetime
import argparse,json,math,sys

VERSION='2.0.0'
TARGET_FACTS={'nombre_producto','ingrediente','formatos_porcion','plazo_encargo','contexto_entrega'}

def timestamp(value):
    if not isinstance(value,str): raise ValueError('Timestamp debe ser texto ISO con zona horaria')
    d=datetime.fromisoformat(value.replace('Z','+00:00'))
    if d.tzinfo is None: raise ValueError('Timestamp sin zona horaria')
    return d

def strings(value):
    return isinstance(value,list) and all(isinstance(s,str) and s.strip() for s in value)

def validate(b):
    if not isinstance(b,dict): raise ValueError('El brief debe ser un objeto')
    for k in ['restaurant_id','target_subject','profile_version']:
        if not isinstance(b.get(k),str) or not b[k].strip():raise ValueError('Falta '+k)
    if b.get('schema_version')!=VERSION:raise ValueError('schema_version debe ser '+VERSION)
    if b.get('entry') not in ['plato','novedad','referencia']:raise ValueError('entry inválida')
    if b.get('objective') not in ['presentar_producto','visitas','difusion','confianza']:raise ValueError('objective inválido')
    timestamp(b.get('scheduled_for'))
    for key,low,high in [('duration_s',6,30),('fps',24,120)]:
        v=b.get(key)
        if isinstance(v,bool) or not isinstance(v,(int,float)) or not math.isfinite(v) or not low<=v<=high:raise ValueError(key+' fuera del intervalo editorial de la herramienta')
    if not isinstance(b['fps'],int):raise ValueError('fps debe ser entero')
    for k in ['forbidden_elements','recent_patterns','catalogue_subjects']:
        if not strings(b.get(k)):raise ValueError('Lista inválida: '+k)
    for group in ['assets','facts']:
        if not isinstance(b.get(group),list):raise ValueError('Falta lista '+group)
        ids=[]
        for item in b[group]:
            if not isinstance(item,dict):raise ValueError('Registro inválido en '+group)
            for k in ['id','restaurant_id','source']:
                if not isinstance(item.get(k),str) or not item[k].strip():raise ValueError('Falta '+group+'.'+k)
            ids.append(item['id'])
            for date in ['valid_from','valid_until']:
                if item.get(date) is not None:timestamp(item[date])
            if item.get('valid_from') and item.get('valid_until') and timestamp(item['valid_from'])>=timestamp(item['valid_until']):raise ValueError('Intervalo de vigencia inválido')
            if group=='assets':
                if item.get('kind') not in ['image','video']:raise ValueError('kind inválido')
                if item.get('provenance') not in ['real','generated','external']:raise ValueError('provenance inválida')
                if item.get('permission') not in ['production','analysis_only','unknown','revoked']:raise ValueError('permission inválido')
                if item.get('review_state') not in ['reviewed','pending','rejected']:raise ValueError('review_state inválido')
                if not strings(item.get('roles')):raise ValueError('roles inválidos')
                if not strings(item.get('elements')):raise ValueError('elements inválidos')
                for k in ['subject_id','path']:
                    if not isinstance(item.get(k),str) or not item[k]:raise ValueError('Falta asset.'+k)
            else:
                if type(item.get('confirmed')) is not bool:raise ValueError('confirmed debe ser booleano')
                if not strings(item.get('subjects')):raise ValueError('subjects inválidos')
                if not isinstance(item.get('key'),str) or not isinstance(item.get('value'),str) or not item['value'].strip():raise ValueError('Hecho sin clave o valor textual')
                if '{' in item['value'] or '}' in item['value']:raise ValueError('El hecho contiene marcadores pendientes')
                if item['key']=='fecha_evento':timestamp(item.get('event_at'))
        if len(ids)!=len(set(ids)):raise ValueError('IDs duplicados en '+group)
    if b['entry']=='referencia':
        r=b.get('reference')
        if not isinstance(r,dict) or r.get('analysis_verified') is not True or r.get('permission') not in ['analysis_only','production'] or not strings(r.get('transfer')) or not r['transfer'] or not isinstance(r.get('source'),str) or not r['source'].strip():
            raise ValueError('La entrada referencia exige análisis, fuente, permiso y rasgos a transferir')
        if not set(r['transfer'])<= {'ritmo','orden','encuadre','mecanismo','camara'}:raise ValueError('No se transfieren caras, marca, producto ni audio ajenos')

def active(item,at):
    return (not item.get('valid_from') or timestamp(item['valid_from'])<=at) and (not item.get('valid_until') or at<timestamp(item['valid_until']))

def file_reason(a,root):
    if root is None:return 'sin comprobación de archivo'
    rel=Path(a['path'])
    if rel.is_absolute():return 'ruta debe ser relativa a media-root'
    resolved=(root/rel).resolve()
    if not resolved.is_relative_to(root):return 'ruta sale de media-root'
    if not resolved.is_file():return 'archivo no encontrado'
    return None

def select(b,patterns,media_root=None):
    validate(b)
    root=Path(media_root).resolve() if media_root else None
    at=timestamp(b['scheduled_for'])
    usable=[];excluded=[]
    for a in b['assets']:
        reasons=[]
        if a['restaurant_id']!=b['restaurant_id']:reasons.append('otro restaurante')
        if a['review_state']!='reviewed':reasons.append('activo no revisado o rechazado')
        if a['permission'] not in ['production','analysis_only']:reasons.append('permiso ausente o revocado')
        if a['provenance']!='real':reasons.append('no es evidencia real')
        if not active(a,at):reasons.append('activo fuera de vigencia')
        issue=file_reason(a,root)
        if issue:reasons.append(issue)
        if reasons:excluded.append({'asset_id':a['id'],'motivos':reasons})
        else:usable.append(a)
    facts={};fact_issues={}
    keys={f['key'] for f in b['facts']}
    for key in keys:
        relevant=[f for f in b['facts'] if f['key']==key and f['restaurant_id']==b['restaurant_id'] and f['confirmed'] and active(f,at) and (b['target_subject'] in f['subjects'] if key in TARGET_FACTS else '*' in f['subjects'])]
        if key=='fecha_evento':relevant=[f for f in relevant if timestamp(f['event_at'])>=at]
        if len(relevant)==1:facts[key]=relevant[0]
        elif len(relevant)>1:fact_issues[key]='hechos vigentes ambiguos; resolver versión'
        else:fact_issues[key]='hecho no confirmado, vencido o de otro ámbito'
    candidates=[];rejected=[]
    for p in patterns:
        reasons=[];bindings={}
        if b['objective'] not in p['objetivos']:reasons.append('objetivo distinto')
        if b['entry'] not in p['entradas']:reasons.append('entrada incompatible')
        if b['entry']=='novedad':
            for key in ['novedad','fecha_evento']:
                if key not in facts:reasons.append('novedad sin '+key+' vigente; no cambiar el brief automáticamente')
        forbidden=set(p['elementos_necesarios'])&set(b['forbidden_elements'])
        if forbidden:reasons.append('elementos prohibidos: '+', '.join(sorted(forbidden)))
        for req in p['requisitos_activos']:
            eligible=[]
            for a in usable:
                scope=req['scope']
                scope_ok=(scope=='target' and a['subject_id']==b['target_subject']) or (scope=='restaurant' and a['subject_id']=='local') or (scope=='catalogue' and a['subject_id'] in b['catalogue_subjects'])
                if scope_ok and a['kind'] in req['kinds'] and set(a['roles'])&set(req['roles']):eligible.append(a)
            # Prefiere un tramo real en vez de añadir generación si ambos son aptos.
            eligible.sort(key=lambda a:(a['kind']!='video',a['id']))
            if req['distinct_subjects']:
                distinct={}
                for a in eligible:distinct.setdefault(a['subject_id'],a)
                eligible=list(distinct.values())
            if len(eligible)<req['min_count']:reasons.append('falta material: '+req['slot'])
            else:bindings[req['slot']]=eligible[:req['min_count']]
        for key in p['requisitos_hechos']:
            if key not in facts:reasons.append('falta '+key+': '+fact_issues.get(key,'sin dato'))
        selected={a['id']:a for arr in bindings.values() for a in arr}
        if 'catalogo' in bindings and 'seleccion_carta' in facts:
            if not {a['subject_id'] for a in bindings['catalogo']}<=set(facts['seleccion_carta']['subjects']):reasons.append('seleccion_carta no confirma todos los productos elegidos')
        # Las prohibiciones se comprueban también contra etiquetas de contenido del activo.
        for a in selected.values():
            conflicts=set(a.get('elements',[]))&set(b['forbidden_elements'])
            if conflicts:reasons.append('activo '+a['id']+' contiene elemento prohibido: '+','.join(sorted(conflicts)))
        if reasons:
            rejected.append({'pattern_id':p['id'],'nombre':p['nombre'],'motivos':reasons,'alternativa':p['alternativa']});continue
        photo=any(a['kind']=='image' for a in selected.values())
        unresolved=[];overlays=[]
        for template in p['rotulos_candidatos']:
            try:overlays.append(template.format(**{k:v['value'] for k,v in facts.items()}))
            except KeyError as err:unresolved.append(str(err))
        first_frames=round(p['duracion_toma_s']*b['fps'])
        contract={'estado':'borrador_para_director','funcion':'gancho','t_frames':[0,first_frames],'t_s':[0,first_frames/b['fps']],
                  'primer_fotograma':p['primer_fotograma'],'accion_principal':p['accion_principal'],'estado_final':p['estado_final'],
                  'camara':p['camara'],'prompt_movimiento_en':p['prompt_movimiento_en'],
                  'criterio_qa_sin_texto':'El gesto y su consecuencia se entienden al ver la toma sin voz ni rótulos.',
                  'aviso':'Contrato parcial de apertura; no es un plan.yaml válido ni un prompt final de proveedor.'}
        blockers=['Revisión creativa de apertura, material y etiquetas visuales','Decisión de dirección sobre planos y cámara','G1 y G2 siguen pendientes; esta salida no autoriza producción ni publicación']
        if photo:blockers+=['Resolver movimiento con directoria: las fotos no acreditan una acción oculta','Cotización vigente del lote multitoma y reescalado si se genera vídeo; aprobación correspondiente']
        else:blockers+=['Validar tramos, duración utilizable, audio y coste de montaje; no se inspeccionó el vídeo con esta herramienta']
        if photo and p.get('tipo_promesa')=='publicitaria_generada_o_metraje_real':blockers+=['Escena publicitaria generada: revisar keyframes, anatomía, contacto y conservación del producto; no presentarla como metraje real ni prueba física']
        if any(a['permission']=='analysis_only' for a in selected.values()):blockers+=['Hay activos autorizados solo para análisis; confirmar uso de producción']
        if unresolved:blockers+=['Rótulos con datos pendientes: '+','.join(unresolved)]
        candidates.append({'pattern_id':p['id'],'nombre':p['nombre'],'mecanismo':p['mecanismo'],'estado':'candidato_editorial','apertura':p['apertura'],'promesa':p['promesa'],'rotulos':overlays,'bindings':{k:[a['id'] for a in v] for k,v in bindings.items()},'fact_ids':[facts[k]['id'] for k in dict.fromkeys(p['requisitos_hechos']+(['novedad','fecha_evento'] if b['entry']=='novedad' else []))],'contrato_apertura':contract,'resto_reel':'Pendiente de dirección; no rellenar con la misma acción','ruta_sugerida':'evaluar_animacion_anclada' if photo else 'montaje_de_metraje_real','regenerar_para_cambiar_rotulo':False,'reciente':p['id'] in b['recent_patterns'],'comprobaciones_pendientes':blockers,'criterios_rechazo':p['criterios_rechazo'],'coste_cotizado':None,'production_ready':False,'evidencia':p['estado_evidencia']})
    candidates.sort(key=lambda c:(c['reciente'],c['ruta_sugerida']!='montaje_de_metraje_real',c['pattern_id']))
    return {'schema_version':VERSION,'estado':'candidatos_para_revision' if candidates else 'necesita_datos_o_material','restaurant_id':b['restaurant_id'],'profile_version':b['profile_version'],'entrada':b['entry'],'objetivo':b['objective'],'policy':'Compatibilidad primero; luego evitar patrón reciente y favorecer metraje real. Orden editorial, no predictor de rendimiento.','candidatos':candidates,'descartados':rejected,'activos_excluidos':excluded,'production_ready':False,'siguiente_paso':'Elegir y completar concepto con director; no enviar estos datos directamente a un proveedor.','limitaciones':['Validación de metadatos declarados y existencia de archivos; no autentica derechos ni contenido visual','No verifica duración de clips, similitud, calidad, contenido de fuente ni costes de proveedor','No modifica plan.yaml, no genera vídeo y no publica']}

def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('brief',type=Path)
    ap.add_argument('--media-root',type=Path,required=True)
    ap.add_argument('--output',type=Path)
    a=ap.parse_args()
    try:
        b=json.loads(a.brief.read_text(encoding='utf-8'))
        patterns=json.loads((Path(__file__).resolve().parents[1]/'references/hooks-visuales.json').read_text(encoding='utf-8'))
        result=select(b,patterns,a.media_root)
    except (ValueError,OSError,KeyError,TypeError) as e:
        print(json.dumps({'estado':'entrada_invalida','detalle':str(e),'production_ready':False},ensure_ascii=False),file=sys.stderr);return 2
    content=json.dumps(result,ensure_ascii=False,indent=2)
    if a.output:
        a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(content+'\n',encoding='utf-8')
        print(f"{len(result['candidatos'])} candidatos; {len(result['descartados'])} descartados. Archivo: {a.output}")
    else:print(content)
    return 0 if result['candidatos'] else 3

if __name__=='__main__':sys.exit(main())
