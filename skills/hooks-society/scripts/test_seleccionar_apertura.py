"""Pruebas de selección editorial con datos sintéticos. No prueban generación ni retención."""
import unittest,tempfile,json,copy
from pathlib import Path
from seleccionar_apertura import select,validate

class SelectorTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
        self.patterns=json.loads((Path(__file__).resolve().parents[1]/'references/hooks-visuales.json').read_text(encoding='utf-8'))
        self.b=dict(schema_version='2.0.0',restaurant_id='rest-prueba',entry='plato',objective='presentar_producto',target_subject='producto-1',scheduled_for='2026-10-01T12:00:00Z',duration_s=9.1,fps=60,profile_version='test-1',forbidden_elements=['horno'],recent_patterns=[],catalogue_subjects=['producto-1','producto-2'],reference=None,assets=[],facts=[])
        self.add_asset('producto','producto-1',['producto','detalle']);self.add_asset('sala','local',['sala','mesa'])
        self.add_fact('nombre_producto','Producto de prueba',['producto-1']);self.add_fact('nombre_local','Local de prueba',['*'])
    def tearDown(self):self.tmp.cleanup()
    def add_asset(self,id,subject,roles,kind='image'):
        path=id+'.bin';(self.root/path).write_bytes(b'synthetic fixture, not media')
        self.b['assets'].append(dict(id=id,restaurant_id='rest-prueba',source='fixture sintético',subject_id=subject,roles=roles,elements=[],kind=kind,provenance='real',permission='production',review_state='reviewed',path=path))
    def add_fact(self,key,value,subjects):
        self.b['facts'].append(dict(id='fact-'+key,restaurant_id='rest-prueba',source='fixture sintético',key=key,value=value,subjects=subjects,confirmed=True))
    def run_select(self):return select(self.b,self.patterns,self.root)
    def ids(self):return {c['pattern_id'] for c in self.run_select()['candidatos']}
    def test_baseline(self):self.assertEqual(self.ids(),{'VH01','VH24'})
    def test_no_generated_proof(self):
        self.add_asset('corte','producto-1',['corte'],'video');self.b['assets'][-1]['provenance']='generated';self.assertNotIn('VH11',self.ids())
    def test_real_cut(self):
        self.add_asset('corte','producto-1',['corte'],'video');self.assertIn('VH11',self.ids())
    def test_other_tenant(self):
        self.b['assets'][0]['restaurant_id']='otro';self.assertFalse(self.ids())
    def test_other_product(self):
        self.b['assets'][0]['subject_id']='otro';self.assertFalse(self.ids())
    def test_revoked(self):
        self.b['assets'][0]['permission']='revoked';self.assertFalse(self.ids())
    def test_unknown_permission(self):
        self.b['assets'][0]['permission']='unknown';self.assertFalse(self.ids())
    def test_analysis_only_never_production_ready(self):
        self.b['assets'][0]['permission']='analysis_only';r=self.run_select();self.assertFalse(r['production_ready']);self.assertTrue(any('solo para análisis' in x for x in r['candidatos'][0]['comprobaciones_pendientes']))
    def test_missing_file(self):
        (self.root/'producto.bin').unlink();self.assertFalse(self.ids())
    def test_path_escape(self):
        self.b['assets'][0]['path']='../fuera.bin';r=self.run_select();self.assertFalse(r['candidatos']);self.assertIn('ruta sale',str(r['activos_excluidos']))
    def test_absolute_path(self):
        self.b['assets'][0]['path']=str(self.root/'producto.bin');self.assertFalse(self.ids())
    def test_unreviewed(self):
        self.b['assets'][0]['review_state']='pending';self.assertFalse(self.ids())
    def test_unconfirmed_fact(self):
        self.b['facts'][0]['confirmed']=False;self.assertFalse(self.ids())
    def test_expired_fact(self):
        self.b['facts'][0]['valid_until']='2026-10-01T11:00:00Z';self.assertFalse(self.ids())
    def test_expired_asset(self):
        self.b['assets'][0]['valid_until']='2026-10-01T11:00:00Z';self.assertFalse(self.ids())
    def test_future_fact(self):
        self.b['facts'][0]['valid_from']='2026-10-02T12:00:00Z';self.assertFalse(self.ids())
    def test_conflicting_facts(self):
        f=copy.deepcopy(self.b['facts'][0]);f['id']='f2';f['value']='Otro nombre';self.b['facts'].append(f);self.assertFalse(self.ids())
    def test_duplicate_ids(self):
        self.b['assets'].append(copy.deepcopy(self.b['assets'][0]));self.assertRaises(ValueError,self.run_select)
    def test_new_event_does_not_fallback_to_product(self):
        self.b['entry']='novedad';self.assertFalse(self.ids())
    def test_event_after_publication(self):
        self.b['entry']='novedad';self.b['objective']='difusion'
        self.add_fact('novedad','Presentación de prueba',['*']);self.add_fact('fecha_evento','2 de octubre',['*']);self.b['facts'][-1]['event_at']='2026-10-02T12:00:00Z';self.add_fact('canal_reserva','Canal de prueba',['*']);self.assertEqual(self.ids(),{'VH01','VH24'})
        self.b['facts'][-2]['event_at']='2026-09-30T12:00:00Z';self.assertFalse(self.ids())
    def test_profile_forbidden_element(self):
        self.b['assets'][0]['elements']=['horno'];self.assertFalse(self.ids())
    def test_recipe_forbidden_element(self):
        self.add_asset('corte','producto-1',['corte'],'video');self.b['forbidden_elements'].append('corte');self.assertNotIn('VH11',self.ids())
    def test_reference_permission_and_transfer(self):
        self.b['entry']='referencia';self.assertRaises(ValueError,self.run_select)
        self.b['reference']={'analysis_verified':True,'source':'fixture','permission':'analysis_only','transfer':['orden','ritmo']};self.assertTrue(self.ids())
        self.b['reference']['transfer']=['caras'];self.assertRaises(ValueError,self.run_select)
    def test_catalogue_two_distinct_products(self):
        self.add_asset('otro','producto-1',['producto']);self.add_fact('seleccion_carta','Selección de prueba',['*','producto-1','producto-2']);self.assertNotIn('VH23',self.ids())
        self.b['assets'][-1]['subject_id']='producto-2';self.assertIn('VH23',self.ids())
        self.b['facts'][-1]['subjects']=['*','producto-1'];self.assertNotIn('VH23',self.ids())
    def test_first_shot_timing_and_visual_contract(self):
        for c in self.run_select()['candidatos']:
            shot=c['contrato_apertura']
            self.assertEqual(shot['t_frames'][0],0)
            self.assertLessEqual(shot['t_frames'][1],84)
            self.assertGreaterEqual(shot['t_frames'][1],60)
            self.assertEqual(c['rotulos'],[])
            for key in ['primer_fotograma','accion_principal','estado_final','camara','prompt_movimiento_en']:
                self.assertTrue(shot[key])
    def test_no_timezone_rejected(self):
        self.b['scheduled_for']='2026-10-01T12:00:00';self.assertRaises(ValueError,self.run_select)
    def test_boolean_duration_rejected(self):
        self.b['duration_s']=True;self.assertRaises(ValueError,self.run_select)
    def test_fatigue_changes_order(self):
        self.b['recent_patterns']=['VH01'];self.assertEqual(self.run_select()['candidatos'][0]['pattern_id'],'VH24')
    def test_no_root_no_candidate(self):self.assertFalse(select(self.b,self.patterns)['candidatos'])
    def test_generated_scene_requires_table_anchor(self):
        self.b['assets'][1]['roles'].remove('mesa');self.assertNotIn('VH01',self.ids());self.b['assets'][1]['roles'].append('mesa');self.assertIn('VH01',self.ids())
        self.b['forbidden_elements'].append('manos');self.assertNotIn('VH01',self.ids())
    def test_whole_pizza_is_not_separated_portion(self):self.assertNotIn('VH02',self.ids())

    def test_each_visual_pattern_has_a_satisfiable_contract(self):
        original=copy.deepcopy(self.b)
        self.assertEqual(len({p['id'] for p in self.patterns}),24)
        for p in self.patterns:
            with self.subTest(pattern=p['id']):
                self.b=copy.deepcopy(original);self.b['assets']=[];self.b['facts']=[];self.b['forbidden_elements']=[]
                for req in p['requisitos_activos']:
                    for i in range(req['min_count']):
                        subject='local' if req['scope']=='restaurant' else ('producto-'+str(i+1) if req['scope']=='catalogue' else 'producto-1')
                        self.add_asset(p['id']+'-'+req['slot']+str(i),subject,req['roles'],'video')
                for key in p['requisitos_hechos']:
                    self.add_fact(key,'Dato sintético',['*','producto-1','producto-2'])
                candidates=self.run_select()['candidatos']
                match=next(c for c in candidates if c['pattern_id']==p['id'])
                self.assertEqual(match['ruta_sugerida'],'montaje_de_metraje_real')
                self.assertFalse(match['production_ready'])
                self.assertEqual(match['rotulos'],[])

if __name__=='__main__':unittest.main()
