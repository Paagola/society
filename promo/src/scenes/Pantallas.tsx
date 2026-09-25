import React from 'react';
import {Img, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Button, Headline, Logo, Typed} from '../components';
import {COPY} from '../copy';
import {C, EASE_OUT, FONT, tween} from '../theme';

// Pantallas de la app dibujadas a 390 px de ancho lógico (como un iPhone) y escaladas dentro del móvil.
export const SCREEN_W = 390;
export const SCREEN_H = 831;

const A = COPY.app;

const Header: React.FC<{back?: boolean; close?: boolean}> = ({back, close}) => (
  <div style={{position: 'absolute', top: 58, left: 20, right: 20, height: 50, display: 'flex', alignItems: 'center', justifyContent: back ? 'center' : 'space-between'}}>
    {back && (
      <svg width={22} height={22} viewBox="0 0 24 24" style={{position: 'absolute', left: 0}} fill="none" stroke={C.tinta} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4 L7 12 L15 20" />
      </svg>
    )}
    <Logo size={34} at={-100} />
    {!back && !close && (
      <div style={{background: C.cobalto, color: C.papel, fontFamily: FONT.ui, fontWeight: 700, fontSize: 12, padding: '6px 11px', borderRadius: 14}}>@society</div>
    )}
    {close && (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.tinta} strokeWidth={2.6} strokeLinecap="round">
        <path d="M5 5 L19 19 M19 5 L5 19" />
      </svg>
    )}
  </div>
);

const Pop: React.FC<{at: number; children: React.ReactNode; style?: React.CSSProperties}> = ({at, children, style}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: f - at, fps, config: {damping: 14, stiffness: 170}});
  return <div style={{opacity: f < at ? 0 : 1, transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + 0.06 * s})`, ...style}}>{children}</div>;
};

// Pulsación de dedo: el elemento se hunde un poco y vuelve.
const usePress = (at: number) => {
  const f = useCurrentFrame();
  return tween(f, at, at + 4) - tween(f, at + 5, at + 10);
};

// 01 · Busca tu local
export const PantallaBusca: React.FC = () => {
  const f = useCurrentFrame();
  const press = usePress(92);
  return (
    <div style={{position: 'absolute', width: SCREEN_W, height: SCREEN_H}}>
      <Header />
      <Headline lines={[{t: 'BUSCA'}, {t: 'tu local', it: true}]} size={104} at={4} style={{position: 'absolute', left: 18, top: 112}} />
      <div
        style={{
          position: 'absolute',
          top: 346,
          left: 20,
          right: 20,
          height: 52,
          borderRadius: 30,
          border: `2px solid ${C.tinta}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 18px',
          gap: 12,
          fontFamily: FONT.ui,
          fontSize: 18,
          fontWeight: 500,
          color: C.tinta,
          boxSizing: 'border-box',
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={C.tinta} strokeWidth={2.4} strokeLinecap="round">
          <circle cx={10.5} cy={10.5} r={7} />
          <path d="M16 16 L21 21" />
        </svg>
        <Typed text={A.busqueda} at={20} cps={10} cursor={f < 50} style={{flex: 1}} />
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.tinta} strokeWidth={3} strokeLinecap="round">
          <path d="M5 5 L19 19 M19 5 L5 19" />
        </svg>
      </div>
      <Pop at={46} style={{position: 'absolute', top: 414, left: 20, right: 20}}>
        <div style={{background: C.cobalto, borderRadius: 16, padding: 11, transform: `scale(${1 - press * 0.04})`}}>
          <Img src={staticFile('img/taberna.png')} style={{width: '100%', height: 124, objectFit: 'cover', borderRadius: 10, display: 'block'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 4px 2px'}}>
            <div>
              <div style={{fontFamily: FONT.ui, fontWeight: 700, fontSize: 19, color: C.papel}}>{A.local}</div>
              <div style={{fontFamily: FONT.ui, fontWeight: 500, fontSize: 14, color: C.papel, marginTop: 4, display: 'flex', alignItems: 'center', gap: 5}}>
                <svg width={12} height={14} viewBox="0 0 12 16" fill="none" stroke={C.papel} strokeWidth={1.8}>
                  <path d="M6 15 C6 15 1 9.5 1 6 A5 5 0 0 1 11 6 C11 9.5 6 15 6 15 Z" />
                  <circle cx={6} cy={6} r={1.8} />
                </svg>
                {A.direccion}
              </div>
            </div>
            <svg width={22} height={18} viewBox="0 0 24 20" fill="none" stroke={C.papel} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 10 H21 M13 2 L21 10 L13 18" />
            </svg>
          </div>
        </div>
      </Pop>
      {[0, 1].map((i) => (
        <Pop key={i} at={54 + i * 4} style={{position: 'absolute', top: 640 + i * 62, left: 22, right: 22, display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{width: 38, height: 38, borderRadius: 20, background: 'rgba(20,20,20,.1)'}} />
          <div style={{flex: 1}}>
            <div style={{height: 10, width: '70%', borderRadius: 6, background: 'rgba(20,20,20,.12)'}} />
            <div style={{height: 8, width: '45%', borderRadius: 6, background: 'rgba(20,20,20,.08)', marginTop: 8}} />
          </div>
        </Pop>
      ))}
      <Button label="Continuar" size={18} press={usePress(100)} style={{position: 'absolute', left: 20, right: 20, bottom: 30}} />
    </div>
  );
};

// 02 · ¿Qué hay hoy?
export const PantallaHoy: React.FC<{start: number}> = ({start}) => {
  const f = useCurrentFrame() - start;
  const foto = tween(f, 56, 70, [0, 1], EASE_OUT);
  return (
    <div style={{position: 'absolute', width: SCREEN_W, height: SCREEN_H}}>
      <Header close />
      <Headline lines={[{t: '¿QUÉ HAY'}, {t: 'hoy?', it: true}]} size={100} at={start + 4} style={{position: 'absolute', left: 18, top: 112}} />
      <div
        style={{
          position: 'absolute',
          top: 344,
          left: 20,
          right: 20,
          height: 100,
          borderRadius: 16,
          border: `2px solid ${C.cobalto}`,
          padding: '14px 16px',
          boxSizing: 'border-box',
          fontFamily: FONT.ui,
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.35,
          color: C.tinta,
        }}
      >
        <Typed text={A.frase} at={start + 16} cps={22} cursor={f < 56} />
        <div style={{position: 'absolute', right: 12, bottom: 8, fontSize: 11, color: 'rgba(20,20,20,.5)'}}>
          {Math.min(A.frase.length, Math.max(0, Math.floor(((f - 16) / 30) * 22)))}/300
        </div>
      </div>
      <div style={{position: 'absolute', top: 460, left: 20, right: 20, height: 170, borderRadius: 16, overflow: 'hidden', border: `2px dashed rgba(20,20,20,.3)`, boxSizing: 'border-box'}}>
        <Img
          src={staticFile('img/alcachofas-trama.png')}
          style={{width: '100%', height: '100%', objectFit: 'cover', transform: `translateY(${(1 - foto) * 100}%)`}}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 46,
            height: 46,
            marginLeft: -23,
            marginTop: -23,
            borderRadius: 30,
            background: C.tinta,
            color: C.papel,
            fontFamily: FONT.ui,
            fontSize: 32,
            lineHeight: '44px',
            textAlign: 'center',
            opacity: 1 - foto * 0.2,
          }}
        >
          +
        </div>
      </div>
      <div style={{position: 'absolute', top: 650, left: 20, right: 20, display: 'flex', gap: 10}}>
        {['4:5', 'Historia', 'Reel'].map((c, i) => (
          <div
            key={c}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 22,
              border: `2px solid ${C.cobalto}`,
              background: i === 0 ? C.cobalto : 'transparent',
              color: i === 0 ? C.papel : C.cobalto,
              fontFamily: FONT.ui,
              fontWeight: 600,
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <Button label="SIGUIENTE" size={18} press={usePress(start + 96)} style={{position: 'absolute', left: 20, right: 20, bottom: 30}} />
    </div>
  );
};

const Icon: React.FC<{d: string; fill?: string}> = ({d, fill = 'none'}) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill={fill} stroke={fill === 'none' ? C.tinta : fill} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const HEART = 'M12 20 C12 20 3 14.5 3 8.5 A4.5 4.5 0 0 1 12 6 A4.5 4.5 0 0 1 21 8.5 C21 14.5 12 20 12 20 Z';

// 03 · Así queda
export const PantallaQueda: React.FC<{start: number}> = ({start}) => {
  const f = useCurrentFrame() - start;
  const {fps} = useVideoConfig();
  const like = spring({frame: f - 70, fps, config: {damping: 8, stiffness: 220}});
  return (
    <div style={{position: 'absolute', width: SCREEN_W, height: SCREEN_H}}>
      <Header back />
      <Headline lines={[{t: 'ASÍ'}, {t: 'queda.', it: true}]} size={84} at={start + 4} style={{position: 'absolute', left: 18, top: 108}} />
      <Pop at={start + 14} style={{position: 'absolute', top: 298, left: 16, right: 16}}>
        <div style={{background: '#F6F3EA', borderRadius: 16, padding: '10px 0 12px', boxShadow: '0 0 0 1px rgba(20,20,20,.12)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px 8px'}}>
            <div style={{width: 26, height: 26, borderRadius: 14, background: C.cobalto, color: C.papel, fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 900, fontSize: 17, textAlign: 'center', lineHeight: '26px'}}>
              S
            </div>
            <div style={{fontFamily: FONT.ui, fontWeight: 700, fontSize: 13, flex: 1}}>{A.cuenta}</div>
            <div style={{fontFamily: FONT.ui, fontWeight: 700, fontSize: 16}}>···</div>
          </div>
          <div style={{position: 'relative', height: 300, overflow: 'hidden', background: C.papel}}>
            <Img src={staticFile('img/papel.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply'}} />
            <Img
              src={staticFile('img/plato-trama.png')}
              style={{position: 'absolute', left: 64, bottom: -40, width: 230, transform: `translateY(${tween(f, 24, 40, [80, 0], EASE_OUT)}px)`}}
            />
            <Headline lines={A.plato} size={60} at={start + 20} stagger={4} align="center" style={{position: 'absolute', top: 4, left: 0, right: 0}} />
          </div>
          <div style={{display: 'flex', gap: 14, padding: '10px 12px 6px', alignItems: 'center'}}>
            <div style={{transform: `scale(${1 + 0.35 * Math.sin(Math.min(like, 1) * Math.PI)})`}}>
              <Icon d={HEART} fill={f >= 70 ? C.cobalto : 'none'} />
            </div>
            <Icon d="M20 12 A8 8 0 1 1 16.5 5.4 L21 4 L19.6 8.2 A8 8 0 0 1 20 12 Z" />
            <Icon d="M3 11 L21 4 L14 21 L11 13 Z M11 13 L21 4" />
            <div style={{flex: 1}} />
            <Icon d="M6 3 H18 V21 L12 16 L6 21 Z" />
          </div>
          <div style={{padding: '0 12px', fontFamily: FONT.ui, fontSize: 12.5, lineHeight: 1.35, color: C.tinta}}>
            <b>{A.cuenta}</b> {A.pie}
            <div style={{color: C.cobalto, marginTop: 3}}>{A.tags}</div>
          </div>
        </div>
      </Pop>
      <div style={{position: 'absolute', left: 20, right: 20, bottom: 30, display: 'flex', gap: 12}}>
        <Button label="Editar" size={17} bg="transparent" fg={C.cobalto} border={C.cobalto} style={{flex: 1}} />
        <Button label="Publicar" size={17} press={usePress(start + 60)} style={{flex: 1}} />
      </div>
    </div>
  );
};
