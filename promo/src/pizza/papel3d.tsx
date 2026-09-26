import React, {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useLoader} from '@react-three/fiber';
import {staticFile} from 'remotion';
import * as THREE from 'three';
import Delaunator from 'delaunator';
import {CONTORNO_FOTO} from './contornos';

// Recorte de papel que se arruga en una bola y se vuelve a abrir.
// La hoja es una malla de facetas (triangulación de Delaunay) con sombreado plano: los pliegues no se
// dibujan, salen de cómo cae la luz en cada faceta. Al arrugarse, los bordes se cierran hacia delante y
// envuelven la foto: por fuera queda el dorso del papel, como una envoltura de verdad. Al abrirse, la
// foto reaparece con las marcas de los pliegues.
// Coordenadas en píxeles del fotograma: la cámara está a la distancia en la que z = 0 se ve a escala 1:1.

const W = 1080;
const H = 1920;
const FOV = 20;
export const DIST = H / 2 / Math.tan(((FOV / 2) * Math.PI) / 180);

export const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const suave = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};

export type P2 = [number, number];

const dentro = (x: number, y: number, pol: P2[]) => {
  let c = false;
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [xi, yi] = pol[i];
    const [xj, yj] = pol[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};

const distBorde = (x: number, y: number, pol: P2[]) => {
  let d = Infinity;
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [ax, ay] = pol[j];
    const [bx, by] = pol[i];
    const t = clamp01(((x - ax) * (bx - ax) + (y - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2));
    d = Math.min(d, Math.hypot(x - ax - t * (bx - ax), y - ay - t * (by - ay)));
  }
  return d;
};

// Contorno cortado a tijera: esquinas que no son del todo rectas y cada lado en dos o tres tramos
// rectos, uno por cada vez que se recoloca la tijera.
const contornoTijera = (w: number, h: number, r: () => number): P2[] => {
  const esq: P2[] = [
    [-w / 2 + r() * 9, -h / 2 + r() * 9],
    [w / 2 - r() * 9, -h / 2 + r() * 9],
    [w / 2 - r() * 9, h / 2 - r() * 9],
    [-w / 2 + r() * 9, h / 2 - r() * 9],
  ];
  const pol: P2[] = [];
  for (let s = 0; s < 4; s++) {
    const [ax, ay] = esq[s];
    const [bx, by] = esq[(s + 1) % 4];
    pol.push([ax, ay]);
    const k = 1 + Math.floor(r() * 2);
    const L = Math.hypot(bx - ax, by - ay);
    for (let i = 1; i <= k; i++) {
      const t = i / (k + 1) + (r() - 0.5) * 0.18;
      const off = (r() - 0.35) * 6;
      pol.push([ax + (bx - ax) * t - ((by - ay) / L) * off, ay + (by - ay) * t + ((bx - ax) / L) * off]);
    }
  }
  return pol;
};

type Malla = {
  n: number;
  contorno: P2[]; // el corte de tijera
  reposo: Float32Array; // x, y de cada vértice con la hoja plana
  uv: Float32Array;
  indices: Uint32Array;
  rn: Float32Array; // distancia al centro, normalizada
  gruesa: Float32Array; // alturas de las facetas grandes (-1…1)
  media: Float32Array; // facetas medianas
  fina: Float32Array; // ruido por vértice
  retraso: Float32Array; // cuándo empieza a cerrarse cada zona
  vuelta: Float32Array; // cuánto se enrolla cada dirección
  borde: Float32Array; // distancia del centro al borde en la dirección de cada vértice
  onda: Float32Array; // el papel nunca está del todo plano: ondulación suave y una esquina levantada
};

// Campo de alturas por facetas: triangula puntos al azar, da a cada uno una altura y la interpola
// en plano dentro de cada triángulo. Cada triángulo es un trozo plano de papel.
const campoFacetas = (reposo: Float32Array, n: number, w: number, h: number, puntos: number, seed: number) => {
  const r = rng(seed);
  const m = 60;
  const p: number[] = [-w / 2 - m, -h / 2 - m, w / 2 + m, -h / 2 - m, w / 2 + m, h / 2 + m, -w / 2 - m, h / 2 + m];
  for (let i = 0; i < puntos; i++) p.push((r() - 0.5) * (w + 2 * m), (r() - 0.5) * (h + 2 * m));
  const d = new Delaunator(p);
  const alt = Array.from({length: p.length / 2}, () => r() * 2 - 1);
  const t = d.triangles;
  const out = new Float32Array(n);
  for (let v = 0; v < n; v++) {
    const x = reposo[2 * v];
    const y = reposo[2 * v + 1];
    for (let k = 0; k < t.length; k += 3) {
      const a = t[k];
      const b = t[k + 1];
      const c = t[k + 2];
      const ax = p[2 * a], ay = p[2 * a + 1], bx = p[2 * b], by = p[2 * b + 1], cx = p[2 * c], cy = p[2 * c + 1];
      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
      const l1 = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / det;
      const l2 = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / det;
      const l3 = 1 - l1 - l2;
      if (l1 >= -1e-5 && l2 >= -1e-5 && l3 >= -1e-5) {
        out[v] = l1 * alt[a] + l2 * alt[b] + l3 * alt[c];
        break;
      }
    }
  }
  return out;
};

const cache = new Map<string, Malla>();

export const construirMalla = (w: number, h: number, seed: number, contorno?: P2[], paso = 14): Malla => {
  const clave = `${w}x${h}:${seed}:${paso}:${contorno ? contorno.length : 0}`;
  const hecha = cache.get(clave);
  if (hecha) return hecha;
  const r = rng(seed);
  const pol = contorno ?? contornoTijera(w, h, r);
  const pts: number[] = [];
  // Borde: puntos seguidos sobre el contorno (uno de cada dos si es un rasgado muy denso).
  if (contorno) {
    for (let i = 0; i < pol.length; i += 2) pts.push(pol[i][0], pol[i][1]);
  } else {
    for (let i = 0; i < pol.length; i++) {
      const [ax, ay] = pol[i];
      const [bx, by] = pol[(i + 1) % pol.length];
      const k = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / 9));
      for (let j = 0; j < k; j++) pts.push(ax + ((bx - ax) * j) / k, ay + ((by - ay) * j) / k);
    }
  }
  // Interior: rejilla con ruido, lejos del borde.
  const nx = Math.round(w / paso);
  const ny = Math.round(h / paso);
  for (let j = 0; j <= ny; j++) {
    for (let i = 0; i <= nx; i++) {
      const x = -w / 2 + (i * w) / nx + (r() - 0.5) * 0.72 * (w / nx);
      const y = -h / 2 + (j * h) / ny + (r() - 0.5) * 0.72 * (h / ny);
      if (dentro(x, y, pol) && distBorde(x, y, pol) > 5) pts.push(x, y);
    }
  }
  const n = pts.length / 2;
  const reposo = new Float32Array(pts);
  const d = new Delaunator(pts);
  // Se quitan los triángulos que caen fuera del corte. Delaunator los da en sentido horario con y
  // hacia arriba: se invierten para que la cara de la foto mire a la cámara.
  const tri: number[] = [];
  for (let k = 0; k < d.triangles.length; k += 3) {
    const a = d.triangles[k];
    const b = d.triangles[k + 1];
    const c = d.triangles[k + 2];
    const gx = (pts[2 * a] + pts[2 * b] + pts[2 * c]) / 3;
    const gy = (pts[2 * a + 1] + pts[2 * b + 1] + pts[2 * c + 1]) / 3;
    if (dentro(gx, gy, pol)) tri.push(a, c, b);
  }
  const uv = new Float32Array(n * 2);
  const rn = new Float32Array(n);
  const rmax = Math.hypot(w / 2, h / 2);
  for (let v = 0; v < n; v++) {
    uv[2 * v] = (reposo[2 * v] + w / 2) / w;
    uv[2 * v + 1] = (reposo[2 * v + 1] + h / 2) / h;
    rn[v] = Math.hypot(reposo[2 * v], reposo[2 * v + 1]) / rmax;
  }
  const gruesa = campoFacetas(reposo, n, w, h, 26, seed + 11);
  const media = campoFacetas(reposo, n, w, h, 150, seed + 23);
  const fina = new Float32Array(n).map(() => r() * 2 - 1);
  const retraso = new Float32Array(n);
  for (let v = 0; v < n; v++) retraso[v] = 0.34 * (1 - rn[v]) + 0.1 * gruesa[v];
  const [a1, a2, a3, a4, a5] = [r() * 6.28, r() * 6.28, r() * 6.28, r() * 6.28, r() * 6.28];
  const vuelta = new Float32Array(n);
  const borde = new Float32Array(n);
  const onda = new Float32Array(n);
  for (let v = 0; v < n; v++) {
    const x = reposo[2 * v];
    const y = reposo[2 * v + 1];
    const ph = Math.atan2(y, x);
    vuelta[v] = 1.04 + 0.05 * Math.sin(2 * ph + a1) + 0.03 * Math.sin(3 * ph + a2) + 0.02 * Math.sin(5 * ph + a3) + 0.03 * gruesa[v];
    borde[v] = Math.min(w / 2 / Math.max(1e-6, Math.abs(Math.cos(ph))), h / 2 / Math.max(1e-6, Math.abs(Math.sin(ph))));
    // Ondulación de unos píxeles, una comba suave y la esquina de arriba a la derecha levantada.
    const s = (x / (w / 2) + y / (h / 2)) / 2;
    onda[v] =
      8 * Math.sin(x * 0.0105 + a4) * Math.cos(y * 0.0085 + a5) +
      4 * Math.sin((x - y) * 0.006 + a1) +
      10 * (x / (w / 2)) ** 2 +
      44 * Math.max(0, s - 0.5) ** 2 / 0.5 ** 2;
  }
  const malla: Malla = {n, contorno: pol, reposo, uv, indices: new Uint32Array(tri), rn, gruesa, media, fina, retraso, vuelta, borde, onda};
  cache.set(clave, malla);
  return malla;
};

// Posición de cada vértice para un grado de arrugado `p` (0 = plana, 1 = bola).
// `marcas` son los pliegues que quedan cuando se vuelve a abrir (0 = papel nuevo, 1 = arrugado y abierto).
// `liso` (0…1) plancha la hoja: quita la ondulación y la esquina levantada, como al escanearla.
export const deformar = (m: Malla, w: number, p: number, marcas: number, liso = 0) => {
  const out = new Float32Array(m.n * 3);
  const Rb = 0.2 * w;
  const encoge = suave(p);
  const ag = w * (0.032 * marcas + 0.1 * suave(p / 0.45));
  const am = w * (0.011 * marcas + 0.055 * suave((p - 0.15) / 0.5));
  const af = w * (0.0014 * marcas + 0.012 * suave((p - 0.35) / 0.65));
  const onda = (1 - 0.6 * marcas) * (1 - liso);
  for (let v = 0; v < m.n; v++) {
    const x0 = m.reposo[2 * v];
    const y0 = m.reposo[2 * v + 1];
    const g = m.gruesa[v];
    const md = m.media[v];
    const fi = m.fina[v];
    // Hoja con pliegues: los bordes empiezan a venir hacia delante mientras se arruga.
    const sx = x0 * (1 - 0.16 * encoge);
    const sy = y0 * (1 - 0.16 * encoge);
    const sz = ag * g + am * md + af * fi + onda * m.onda[v] + 0.3 * encoge * m.rn[v] * m.rn[v] * w;
    // Bola envuelta: el centro de la foto se va al fondo y los bordes se cierran por delante, con la
    // foto hacia dentro: por fuera solo queda el dorso. Todo el borde llega al polo de delante, así que
    // la bola se cierra entera; lo que sobra alrededor se recoge en pliegues, como al cerrar el puño.
    const r0 = Math.hypot(x0, y0);
    const bruto = Math.PI * (r0 / m.borde[v]) * m.vuelta[v];
    const th = Math.min(bruto, Math.PI * 0.985);
    const exceso = bruto - th;
    const ph = Math.atan2(y0, x0);
    const sobra = th > 0.001 ? 1 - Math.sin(th) / th : 0;
    const t = (ph + 0.35 * Math.sin(3 * ph + 1.3) + 0.25 * md) * (7 / (2 * Math.PI));
    const pliegue = 4 * Math.abs(t - Math.floor(t) - 0.5) - 1;
    const R = Rb * (1 + 0.24 * g + 0.12 * md + 0.04 * fi + 0.16 * sobra * pliegue + 0.14 * exceso);
    const bx = R * Math.sin(th) * Math.cos(ph) * 1.06;
    const by = R * Math.sin(th) * Math.sin(ph) * 0.95;
    const bz = -R * Math.cos(th);
    const k = suave((p - 0.08 - m.retraso[v]) / 0.52);
    out[3 * v] = sx + (bx - sx) * k;
    out[3 * v + 1] = sy + (by - sy) * k;
    out[3 * v + 2] = sz + (bz - sz) * k;
  }
  return out;
};

export type EstadoPapel = {
  p: number; // arrugado 0…1
  marcas?: number; // pliegues al abrirla
  liso?: number; // hoja planchada del todo
  x?: number; // centro en píxeles del fotograma
  y?: number;
  z?: number;
  rx?: number; // giros en grados
  ry?: number;
  rz?: number;
  escala?: number;
  sx?: number; // aplastado al caer
  sy?: number;
};

const useTextura = (src: string, repetir = 1) => {
  const tex = useLoader(THREE.TextureLoader, staticFile(src));
  useMemo(() => {
    tex.anisotropy = 8;
    if (repetir !== 1) {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(repetir, repetir * 0.75);
    } else {
      tex.colorSpace = THREE.SRGBColorSpace;
    }
    tex.needsUpdate = true;
  }, [tex, repetir]);
  return tex;
};

const Hoja: React.FC<{cara: string; dorso: string; w: number; h: number; seed: number; contorno?: P2[]; e: EstadoPapel}> = ({cara, dorso, w, h, seed, contorno, e}) => {
  const malla = useMemo(() => construirMalla(w, h, seed, contorno), [w, h, seed, contorno]);
  const texCara = useTextura(cara);
  const texDorso = useTextura(dorso);
  const relieve = useTextura('pizza/papel-normal.png', 1.6);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(deformar(malla, w, e.p, e.marcas ?? 0, e.liso ?? 0), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(malla.uv, 2));
    g.setIndex(new THREE.BufferAttribute(malla.indices, 1));
    g.computeVertexNormals();
    g.computeBoundingSphere();
    return g;
  }, [malla, w, e.p, e.marcas, e.liso]);
  const rad = Math.PI / 180;
  const normal = useMemo(() => new THREE.Vector2(0.16, 0.16), []);
  return (
    <group
      position={[(e.x ?? W / 2) - W / 2, H / 2 - (e.y ?? H / 2), e.z ?? 0]}
      rotation={[(e.rx ?? 0) * rad, (e.ry ?? 0) * rad, (e.rz ?? 0) * rad]}
      scale={[(e.escala ?? 1) * (e.sx ?? 1), (e.escala ?? 1) * (e.sy ?? 1), e.escala ?? 1]}
    >
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial map={texCara} normalMap={relieve} normalScale={normal} flatShading roughness={0.92} metalness={0} side={THREE.FrontSide} />
      </mesh>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial map={texDorso} normalMap={relieve} normalScale={normal} flatShading roughness={0.92} metalness={0} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

// Lienzo a pantalla completa con la hoja, su luz y la sombra que proyecta sobre el fondo.
export const PapelArrugado: React.FC<{
  cara?: string;
  dorso?: string;
  w: number;
  h: number;
  e: EstadoPapel;
  seed?: number;
  contorno?: P2[];
  sombra?: number;
}> = ({cara = 'pizza/foto-recorte.png', dorso = 'pizza/foto-dorso.png', w, h, e, seed = 7, contorno = CONTORNO_FOTO, sombra = 0.5}) => (
  <ThreeCanvas
    width={W}
    height={H}
    flat
    shadows
    camera={{fov: FOV, position: [0, 0, DIST], near: 50, far: DIST * 3}}
    gl={{antialias: true, alpha: true, preserveDrawingBuffer: true}}
    style={{position: 'absolute', left: 0, top: 0}}
  >
    <ambientLight intensity={Math.PI * 0.22} />
    <directionalLight
      position={[-1100, 1300, 2600]}
      intensity={Math.PI * 0.85}
      castShadow
      shadow-mapSize={[4096, 4096]}
      shadow-bias={-0.0004}
      shadow-normalBias={1.5}
      shadow-camera-left={-1300}
      shadow-camera-right={1300}
      shadow-camera-top={1300}
      shadow-camera-bottom={-1300}
      shadow-camera-near={100}
      shadow-camera-far={8000}
    />
    <directionalLight position={[900, -300, 1500]} intensity={Math.PI * 0.12} />
    <mesh position={[0, 0, -22]} receiveShadow>
      <planeGeometry args={[4000, 4000]} />
      <shadowMaterial opacity={sombra} />
    </mesh>
    <Hoja cara={cara} dorso={dorso} w={w} h={h} seed={seed} contorno={contorno} e={e} />
  </ThreeCanvas>
);
