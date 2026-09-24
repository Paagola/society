/* ==========================================================================
   Society · Animación — elementos de marca
   Paleta, tipografías y piezas gráficas de la identidad dibujadas con
   Canvas: titular póster, logotipo, destello, bocadillo @society,
   pegatina NUEVO, corazón, tarjetas y botón mostaza.
   Las geometrías replican las de pantallas/_svg/build.py.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, E } = S;

  /* Paleta (README: 60 % papel · 30 % cobalto · 10 % mostaza · tinta para texto).
     Los tonos de café, piel y rubor solo se usan en la ilustración. */
  const C = {
    papel: '#ECE8DC',
    papelClaro: '#F7F3E8',
    papelOscuro: '#E2DCCB',
    cobalto: '#2440E0',
    cobaltoClaro: '#9DB0FF',
    mostaza: '#F5C518',
    tinta: '#141414',
    tintaSuave: '#6E695E',
    blanco: '#FFFFFF',
    gris: '#CFC9B8',
    cafe: '#6B4226',
    cafeClaro: '#9A6A3E',
    espuma: '#EBD9B8',
    rubor: '#E2574C',
  };

  /* Tipografías: Anton (titulares), Playfair Display Italic (acento), Schibsted Grotesk (interfaz). */
  const F = {
    anton: px => `${px}px Anton, Impact, "Arial Narrow Bold", sans-serif`,
    serif: px => `italic 900 ${px}px "Playfair Display", Georgia, serif`,
    ui: (px, peso = 600) => `${peso} ${px}px "Schibsted Grotesk", "Segoe UI", system-ui, sans-serif`,
  };

  const TRAZO = 6; // grosor de contorno cartoon por defecto

  /* ---------------------------------------------------------------- titular póster */

  const cacheTitular = new Map();

  /** Vacía las medidas guardadas (se llama cuando terminan de cargar las fuentes). */
  function reiniciarMedidas() { cacheTitular.clear(); }

  /**
   * Mide un titular: cada línea se ajusta al ancho disponible (como en los carteles)
   * y, si el conjunto no cabe en `altoMax`, todo se reduce en proporción.
   * lineas: [{ txt, serif?: bool, max?: px }]
   */
  function medirTitular(ctx, lineas, anchoMax, altoMax) {
    const clave = lineas.map(l => (l.serif ? '*' : '') + l.txt).join('|') + '@' + anchoMax + 'x' + altoMax;
    const guardado = cacheTitular.get(clave);
    if (guardado) return guardado;

    const calcula = factor => {
      let y = 0;
      const res = lineas.map((l, i) => {
        const fuente = l.serif ? F.serif : F.anton;
        ctx.font = fuente(100);
        const ancho100 = ctx.measureText(l.txt).width || 1;
        const tam = Math.min(l.max || (l.serif ? 165 : 250), (anchoMax * 100) / ancho100) * factor;
        ctx.font = fuente(tam);
        const asc = ctx.measureText(l.serif ? 'hd' : 'H').actualBoundingBoxAscent || tam * 0.75;
        const desc = l.serif ? (ctx.measureText('yp').actualBoundingBoxDescent || tam * 0.25) : 0;
        if (i > 0) y += l.serif ? tam * 0.1 : tam * 0.06;
        const base = y + asc;
        y = base + desc * 0.75;
        return { txt: l.txt, serif: !!l.serif, tam, base };
      });
      return { lineas: res, alto: y };
    };

    let medida = calcula(1);
    if (medida.alto > altoMax) medida = calcula(altoMax / medida.alto);
    cacheTitular.set(clave, medida);
    return medida;
  }

  /**
   * Dibuja un titular con entrada escalonada: cada línea "brota" desde su línea base
   * con squash & stretch y sale hacia arriba al final de la escena.
   */
  function titular(ctx, lineas, local, dur, color, o = {}) {
    const x = o.x ?? 60, y = o.y ?? 70;
    const m = medirTitular(ctx, lineas, o.ancho ?? 960, o.alto ?? 450);
    ctx.save();
    ctx.fillStyle = color;
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    m.lineas.forEach((l, i) => {
      const p = U.tramo(0.15 + i * 0.13, 0.7 + i * 0.13, local);
      if (p <= 0) return;
      const sal = U.tramo(dur - 0.5 + i * 0.05, dur - 0.1 + i * 0.05, local);
      const k = E.rebote(p);                 // 0 → 1,1 → 1
      const sy = Math.max(0.001, k);         // crece desde la línea base
      const sx = 1 + (1 - Math.min(1, k)) * 0.25; // más ancha cuando está aplastada
      ctx.save();
      ctx.globalAlpha = U.clamp(p * 3, 0, 1) * (1 - sal);
      ctx.translate(x, y + l.base - E.entradaAtras(sal) * 90);
      ctx.scale(sx, sy);
      ctx.font = (l.serif ? F.serif : F.anton)(l.tam);
      ctx.fillText(l.txt, 0, 0);
      ctx.restore();
    });
    ctx.restore();
  }

  /* ---------------------------------------------------------------- piezas */

  /** Destello de cuatro puntas (misma curva que build.py: puntas cuadráticas con k = 0,1). */
  function destello(ctx, cx, cy, w, h, o = {}) {
    const x = cx - w / 2, y = cy - h / 2, k = 0.1;
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.quadraticCurveTo(cx + k * w, cy - k * h, x + w, cy);
    ctx.quadraticCurveTo(cx + k * w, cy + k * h, cx, y + h);
    ctx.quadraticCurveTo(cx - k * w, cy + k * h, x, cy);
    ctx.quadraticCurveTo(cx - k * w, cy - k * h, cx, y);
    ctx.closePath();
    ctx.lineJoin = 'round';
    if (o.relleno) { ctx.fillStyle = o.relleno; ctx.fill(); }
    if (o.color) { ctx.strokeStyle = o.color; ctx.lineWidth = o.grosor ?? 4; ctx.stroke(); }
  }

  /** Corazón centrado en (x, y) con alto ≈ s. Solo crea el trazado. */
  function corazon(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.45);
    ctx.bezierCurveTo(x - s * 0.1, y + s * 0.35, x - s * 0.62, y + s * 0.05, x - s * 0.55, y - s * 0.22);
    ctx.bezierCurveTo(x - s * 0.48, y - s * 0.52, x - s * 0.1, y - s * 0.52, x, y - s * 0.25);
    ctx.bezierCurveTo(x + s * 0.1, y - s * 0.52, x + s * 0.48, y - s * 0.52, x + s * 0.55, y - s * 0.22);
    ctx.bezierCurveTo(x + s * 0.62, y + s * 0.05, x + s * 0.1, y + s * 0.35, x, y + s * 0.45);
    ctx.closePath();
  }

  /** Bocadillo «@society» (69 × 25 en las pantallas), centrado en (cx, cy) y escalado por `e`. */
  function bocadillo(ctx, cx, cy, e = 1, o = {}) {
    const w = 69, h = 25;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(e, e);
    ctx.translate(-w / 2, -h / 2);
    const forma = () => {
      U.redondeado(ctx, 0, 0, w, h, h / 2);
      ctx.moveTo(16, h - 2); ctx.lineTo(17, h + 9); ctx.lineTo(28, h - 2); ctx.closePath();
    };
    if (o.troquel) { // borde de pegatina: tinta + blanco
      forma(); ctx.lineJoin = 'round';
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 7; ctx.stroke();
      ctx.strokeStyle = C.blanco; ctx.lineWidth = 3.5; ctx.stroke();
    }
    forma();
    ctx.fillStyle = o.color || C.cobalto;
    ctx.fill();
    ctx.fillStyle = o.texto || C.blanco;
    ctx.font = F.ui(12, 700);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('@society', w / 2, h / 2 + 0.5);
    ctx.restore();
  }

  /** Pegatina NUEVO: estrella de puntas mostaza con borde troquelado blanco. */
  function pegatinaNuevo(ctx, cx, cy, r, rot, k = 1, texto = 'NUEVO') {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.scale(k, k);
    const puntas = 16;
    ctx.beginPath();
    for (let i = 0; i < puntas * 2; i++) {
      const a = (i / (puntas * 2)) * Math.PI * 2;
      const rr = i % 2 === 0 ? r : r * 0.8;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.lineJoin = 'round';
    ctx.strokeStyle = C.tinta; ctx.lineWidth = 20; ctx.stroke();
    ctx.strokeStyle = C.blanco; ctx.lineWidth = 12; ctx.stroke();
    ctx.fillStyle = C.mostaza; ctx.fill();
    ctx.fillStyle = C.tinta;
    ctx.font = F.anton(r * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, 0, r * 0.04);
    // rayitas de "brillo" como en la referencia
    ctx.strokeStyle = C.tinta; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-r * 0.38, -r * 0.42); ctx.lineTo(-r * 0.3, -r * 0.3);
    ctx.moveTo(r * 0.34, r * 0.3); ctx.lineTo(r * 0.42, r * 0.42);
    ctx.stroke();
    ctx.restore();
  }

  /** Tarjeta cartoon: sombra de tinta desplazada + relleno + contorno. */
  function tarjeta(ctx, x, y, w, h, r, relleno, o = {}) {
    const sombra = o.sombra ?? 9;
    if (sombra) {
      U.redondeado(ctx, x + sombra, y + sombra, w, h, r);
      ctx.fillStyle = C.tinta;
      ctx.fill();
    }
    U.redondeado(ctx, x, y, w, h, r);
    ctx.fillStyle = relleno;
    ctx.fill();
    ctx.lineWidth = o.grosor ?? TRAZO;
    ctx.strokeStyle = C.tinta;
    ctx.stroke();
  }

  /** Botón principal mostaza (píldora con texto tinta y flecha), con squash opcional. */
  function botonMostaza(ctx, cx, cy, w, h, texto, sx = 1, sy = 1) {
    ctx.save();
    ctx.translate(cx, cy + h / 2);
    ctx.scale(sx, sy);
    ctx.translate(0, -h / 2);
    tarjeta(ctx, -w / 2, -h / 2, w, h, h / 2, C.mostaza, { sombra: 7, grosor: 5 });
    ctx.fillStyle = C.tinta;
    ctx.font = F.ui(h * 0.32, 800);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const tw = ctx.measureText(texto).width;
    ctx.fillText(texto, -h * 0.2, 2);
    // flecha
    const fx = tw / 2 - h * 0.2 + h * 0.22;
    ctx.strokeStyle = C.tinta; ctx.lineWidth = h * 0.06; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(fx, 0); ctx.lineTo(fx + h * 0.3, 0);
    ctx.moveTo(fx + h * 0.18, -h * 0.12); ctx.lineTo(fx + h * 0.3, 0); ctx.lineTo(fx + h * 0.18, h * 0.12);
    ctx.stroke();
    ctx.restore();
  }

  /** Logotipo A: «Society» en serif cursiva + subrayado de pincel cobalto que se "pinta". */
  const SUBRAYADO = new Path2D('M2 17 C30 9 65 4 98 2 C99.6 2 100 4.2 98.4 5 C66 8.5 34 13.5 4.5 20 C1 20.6 0 18 2 17 Z');
  function logo(ctx, cx, cy, tam, color, pintado = 1) {
    ctx.save();
    ctx.font = F.serif(tam);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = color;
    ctx.fillText('Society', cx, cy);
    const w = ctx.measureText('Society').width;
    if (pintado > 0) {
      ctx.beginPath();
      ctx.rect(cx - w / 2 - 20, cy - tam, (w + 40) * pintado, tam * 2);
      ctx.clip();
      ctx.translate(cx - w * 0.48, cy + tam * 0.06);
      ctx.scale((w * 0.96) / 100, (tam * 0.16) / 21);
      ctx.fillStyle = C.cobalto;
      ctx.fill(SUBRAYADO);
    }
    ctx.restore();
  }

  /** Trama de semitono (puntos) para imitar las fotos en blanco y negro de la marca. */
  let trama = null;
  function patronTrama(ctx) {
    if (!trama) {
      const c = document.createElement('canvas');
      c.width = c.height = 9;
      const g = c.getContext('2d');
      g.fillStyle = 'rgba(20,20,20,0.3)';
      g.beginPath(); g.arc(4.5, 4.5, 1.9, 0, Math.PI * 2); g.fill();
      trama = ctx.createPattern(c, 'repeat');
    }
    return trama;
  }

  Object.assign(S, {
    C, F, reiniciarMedidas, titular, destello, corazon, bocadillo,
    pegatinaNuevo, tarjeta, botonMostaza, logo, patronTrama,
  });
})(window.Society);
