"""Buscador local, sin dependencias ni conexiones de red."""
from pathlib import Path
import argparse, json, unicodedata

def normalize(s):
    return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn')

def search(rows, sector='', familia='', objetivo='', tipo='', texto='', diversos=False, max_palabras=None):
    selected=[]
    seen=set()
    for row in sorted(rows,key=lambda r:r['tipo']!='editorial'):
        if sector and normalize(sector) not in normalize(row['slug']+' '+row['sector']): continue
        if familia and normalize(familia) not in normalize(row['familia']): continue
        if objetivo and normalize(objetivo)!=normalize(row['objetivo']): continue
        if tipo and tipo!=row['tipo']: continue
        if max_palabras and row['palabras']>max_palabras: continue
        haystack=normalize(' '.join(str(row[k]) for k in ['id','hook','sector','familia','plano','desarrollo']))
        if not all(word in haystack for word in normalize(texto).split()): continue
        key=row['formula_id'].split('-')[0] if row['formula_id'] else row['id']
        if diversos and key in seen: continue
        seen.add(key)
        selected.append(row)
    return selected

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--sector',default='')
    p.add_argument('--familia',default='')
    p.add_argument('--objetivo',default='')
    p.add_argument('--tipo',choices=['editorial','adaptacion'],default='')
    p.add_argument('--texto',default='')
    p.add_argument('--diversos',action='store_true')
    p.add_argument('--max-palabras',type=int)
    p.add_argument('--limite',type=int,default=10)
    p.add_argument('--json',action='store_true')
    p.add_argument('--listar',action='store_true')
    a=p.parse_args()
    if a.limite<1: p.error('--limite debe ser positivo')
    rows=[json.loads(l) for l in (Path(__file__).resolve().parents[1]/'references'/'hooks.jsonl').read_text(encoding='utf-8').splitlines()]
    if a.listar:
        print(json.dumps({k:sorted({r[k] for r in rows}) for k in ['slug','familia','objetivo','tipo']},ensure_ascii=False,indent=2)); return
    result=search(rows,a.sector,a.familia,a.objetivo,a.tipo,a.texto,a.diversos,a.max_palabras)
    if a.json:
        print(json.dumps({'total':len(result),'resultados':result[:a.limite]},ensure_ascii=False,indent=2)); return
    print(f'{len(result)} coincidencias; mostrando {min(len(result),a.limite)}. Propuestas sin probar.\n')
    for r in result[:a.limite]:
        print(f"{r['id']} | {r['sector']} | {r['familia']} | {r['objetivo']}\n{r['hook']}\nPlano: {r['plano']}\nDesarrollo: {r['desarrollo']}\nPrueba: {r['prueba']}\nCondición: {r['condicion']}\n")

if __name__=='__main__': main()
