/* ==========================================================================
   Society · Animación — atrezo
   Mesas y sillas de bistró, clientes, despertador, planta rodadora,
   notificaciones, caja de texto, post de Instagram con póster de
   alcachofas y las pantallas del móvil de Cortado.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, E, C, F } = S;
  const A = {};

  /* ---------------------------------------------------------------- iconos */

  /** Glifo blanco dentro del círculo de una notificación. */
  function glifo(ctx, tipo, x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = C.blanco; ctx.fillStyle = C.blanco;
    ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    switch (tipo) {
      case 'campana':
        ctx.moveTo(-10, 7); ctx.lineTo(-9, -2); ctx.quadraticCurveTo(-8, -11, 0, -11);
        ctx.quadraticCurveTo(8, -11, 9, -2); ctx.lineTo(10, 7); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 11, 3, 0, Math.PI * 2); ctx.fill();
        break;
      case 'chat':
        U.redondeado(ctx, -12, -10, 24, 17, 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-5, 7); ctx.lineTo(-8, 13); ctx.lineTo(2, 7); ctx.stroke();
        break;
      case 'calendario':
        U.redondeado(ctx, -11, -9, 22, 20, 4); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-11, -2); ctx.lineTo(11, -2);
        ctx.moveTo(-5, -13); ctx.lineTo(-5, -7); ctx.moveTo(5, -13); ctx.lineTo(5, -7); ctx.stroke();
        break;
      case 'corazon':
        S.corazon(ctx, 0, 1, 24); ctx.fill();
        break;
      default: // megáfono
        ctx.moveTo(-11, -4); ctx.lineTo(6, -12); ctx.lineTo(6, 12); ctx.lineTo(-11, 4); ctx.closePath(); ctx.stroke();
    }
    ctx.restore();
  }

  /* ---------------------------------------------------------------- notificación */

  /**
   * Píldora de notificación con "pop" elástico.
   * o = { der: alinear a la derecha, icono, color, rot }
   */
  A.notificacion = function (ctx, x, y, texto, k, t, o = {}) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.font = F.ui(30, 600);
    const w = ctx.measureText(texto).width + 112, h = 74;
    const x0 = o.der ? x - w : x;
    const semilla = x * 0.01 + y * 0.013;
    ctx.translate(x0 + w / 2, y + h / 2 + Math.sin(t * 2.4 + semilla) * 4);
    ctx.rotate((o.rot || 0) + Math.sin(t * 2 + semilla) * 0.012);
    ctx.scale(k * (1 + (1 - Math.min(k, 1)) * 0.3), k);
    S.tarjeta(ctx, -w / 2, -h / 2, w, h, h / 2, C.papelClaro, { sombra: 7, grosor: 5 });
    ctx.beginPath(); ctx.arc(-w / 2 + 40, 0, 24, 0, Math.PI * 2);
    ctx.fillStyle = o.color || C.cobalto; ctx.fill();
    glifo(ctx, o.icono || 'campana', -w / 2 + 40, 0);
    ctx.fillStyle = C.tinta;
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, -w / 2 + 76, 2);
    ctx.restore();
  };

  /** Pegatina-píldora cobalto (p. ej. «LISTO PARA PUBLICAR») con borde troquelado. */
  A.pildora = function (ctx, cx, cy, texto, rot, k) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.scale(k, k);
    ctx.font = F.ui(26, 800);
    const w = ctx.measureText(texto).width + 88, h = 58;
    U.redondeado(ctx, -w / 2, -h / 2, w, h, h / 2);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = C.tinta; ctx.lineWidth = 16; ctx.stroke();
    ctx.strokeStyle = C.blanco; ctx.lineWidth = 8; ctx.stroke();
    ctx.fillStyle = C.cobalto; ctx.fill();
    S.destello(ctx, -w / 2 + 32, 0, 22, 30, { relleno: C.mostaza });
    ctx.fillStyle = C.papel;
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, -w / 2 + 54, 2);
    ctx.restore();
  };

  /* ---------------------------------------------------------------- bar */

  function silla(ctx, x, lado) {
    ctx.strokeStyle = C.tinta; ctx.lineCap = 'round';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(x - 40, -125); ctx.lineTo(x - 50, 0);
    ctx.moveTo(x + 40, -125); ctx.lineTo(x + 50, 0);
    ctx.stroke();
    // respaldo con voluta
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(x + lado * 45, -125);
    ctx.bezierCurveTo(x + lado * 58, -200, x + lado * 44, -270, x + lado * 58, -300);
    ctx.quadraticCurveTo(x + lado * 70, -318, x + lado * 50, -318);
    ctx.stroke();
  }

  function asiento(ctx, x) {
    ctx.strokeStyle = C.tinta; ctx.lineWidth = 13; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - 50, -125); ctx.lineTo(x + 50, -125); ctx.stroke();
  }

  /** Cliente sentado: aparece con squash elástico. c = { piel, ropa, pelo, k } */
  function cliente(ctx, x, c, lado, t) {
    if (c.k <= 0.001) return;
    const bote = Math.sin(t * 3.2 + x * 0.01) * 4;
    ctx.save();
    ctx.translate(x, -125);
    ctx.scale(1 + (1 - Math.min(c.k, 1)) * 0.4, c.k);
    ctx.translate(0, bote);
    ctx.lineWidth = 7; ctx.strokeStyle = C.tinta; ctx.lineJoin = 'round';
    // cuerpo
    ctx.beginPath();
    ctx.moveTo(-48, 0);
    ctx.quadraticCurveTo(-52, -95, 0, -100);
    ctx.quadraticCurveTo(52, -95, 48, 0);
    ctx.closePath();
    ctx.fillStyle = c.ropa; ctx.fill(); ctx.stroke();
    // cabeza
    ctx.beginPath(); ctx.arc(0, -150, 46, 0, Math.PI * 2);
    ctx.fillStyle = c.piel; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -150, 46, Math.PI * 1.02, Math.PI * 1.98);
    ctx.closePath(); ctx.fillStyle = c.pelo; ctx.fill(); ctx.stroke();
    // cara mirando a la mesa
    const m = -lado * 12;
    ctx.fillStyle = C.tinta;
    ctx.beginPath(); ctx.arc(m - 14, -145, 5.5, 0, Math.PI * 2); ctx.arc(m + 14, -145, 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(m, -132, 13, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    ctx.restore();
  }

  /** Copa y tacita encima de la mesa. */
  function consumiciones(ctx, k) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(0, -214);
    ctx.scale(k, k);
    ctx.lineWidth = 5; ctx.strokeStyle = C.tinta; ctx.lineCap = 'round';
    // copa
    ctx.beginPath();
    ctx.moveTo(-70, -50); ctx.quadraticCurveTo(-70, -12, -50, -10); ctx.quadraticCurveTo(-30, -12, -30, -50); ctx.closePath();
    ctx.fillStyle = C.blanco; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-68, -34); ctx.quadraticCurveTo(-50, -28, -32, -34); ctx.lineTo(-33, -24);
    ctx.quadraticCurveTo(-50, -10, -67, -24); ctx.closePath(); ctx.fillStyle = '#8E2B3A'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-50, -10); ctx.lineTo(-50, 8); ctx.moveTo(-62, 8); ctx.lineTo(-38, 8); ctx.stroke();
    // tacita
    U.redondeado(ctx, 25, -26, 40, 32, 8); ctx.fillStyle = C.blanco; ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(68, -12, 9, -1.4, 1.4); ctx.stroke();
    ctx.restore();
  }

  /**
   * Mesa de bistró con dos sillas. `clientes` es [izq, der] (o null si está vacía).
   * Todo en coords locales con el suelo en y = 0; `esc` escala el conjunto.
   */
  A.mesa = function (ctx, x, suelo, esc, k, t, o = {}) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(x, suelo);
    ctx.scale(esc * (1 + (1 - Math.min(k, 1)) * 0.3), esc * k);
    ctx.fillStyle = 'rgba(20,20,20,0.15)';
    ctx.beginPath(); ctx.ellipse(0, 0, 250, 20, 0, 0, Math.PI * 2); ctx.fill();
    const cl = o.clientes || [];
    [-1, 1].forEach((lado, i) => {
      silla(ctx, lado * 205, lado);
      if (cl[i]) cliente(ctx, lado * 205, cl[i], lado, t);
      asiento(ctx, lado * 205);
    });
    if (o.telaranya) { // telaraña en el respaldo: la mesa lleva días vacía
      ctx.save();
      ctx.translate(-255, -300);
      ctx.strokeStyle = 'rgba(20,20,20,0.55)'; ctx.lineWidth = 2.5;
      for (let a = 0; a < 5; a++) {
        ctx.beginPath(); ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a * 0.38) * 80, Math.sin(a * 0.38) * 80); ctx.stroke();
      }
      for (let r = 22; r <= 70; r += 16) {
        ctx.beginPath();
        for (let a = 0; a < 5; a++) {
          const px = Math.cos(a * 0.38) * r, py = Math.sin(a * 0.38) * r;
          a ? ctx.quadraticCurveTo(Math.cos((a - 0.5) * 0.38) * r * 0.85, Math.sin((a - 0.5) * 0.38) * r * 0.85, px, py) : ctx.moveTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
    // pie y tablero
    ctx.fillStyle = C.tinta;
    ctx.fillRect(-11, -185, 22, 185);
    ctx.beginPath(); ctx.ellipse(0, -4, 62, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -180, 150, 34, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -192, 150, 34, 0, 0, Math.PI * 2);
    ctx.fillStyle = C.papelClaro; ctx.fill();
    ctx.lineWidth = 8; ctx.strokeStyle = C.tinta; ctx.stroke();
    consumiciones(ctx, o.consumiciones || 0);
    ctx.restore();
  };

  /** Despertador que suena (se sacude) con las agujas girando muy deprisa: no hay tiempo. */
  A.reloj = function (ctx, x, y, r, t, k) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 55) * 0.09);
    ctx.scale(k, k);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = C.tinta;
    // patas y campanas
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-r * 0.55, r * 0.8); ctx.lineTo(-r * 0.8, r * 1.15);
    ctx.moveTo(r * 0.55, r * 0.8); ctx.lineTo(r * 0.8, r * 1.15);
    ctx.moveTo(-r * 0.55, -r * 1.08); ctx.lineTo(r * 0.55, -r * 1.08);
    ctx.stroke();
    for (const lado of [-1, 1]) { // campanas: medias cúpulas inclinadas hacia fuera
      ctx.save();
      ctx.translate(lado * r * 0.66, -r * 0.8);
      ctx.rotate(lado * 0.55);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.36, Math.PI, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = C.cobalto; ctx.fill(); ctx.lineWidth = 7; ctx.stroke();
      ctx.restore();
    }
    // esfera
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fillStyle = C.papelClaro; ctx.fill(); ctx.lineWidth = 9; ctx.stroke();
    ctx.lineWidth = 5;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78);
      ctx.lineTo(Math.cos(a) * r * 0.88, Math.sin(a) * r * 0.88);
      ctx.stroke();
    }
    const aguja = (ang, largo, ancho) => {
      ctx.lineWidth = ancho;
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(ang - Math.PI / 2) * largo, Math.sin(ang - Math.PI / 2) * largo);
      ctx.stroke();
    };
    aguja(t * 1.2, r * 0.45, 10);
    aguja(t * 9, r * 0.68, 7);
    ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fillStyle = C.tinta; ctx.fill();
    // rayitas de "¡RING!"
    ctx.lineWidth = 6;
    const vibra = (Math.sin(t * 30) + 1) / 2;
    for (const lado of [-1, 1]) {
      for (let i = -1; i <= 1; i++) {
        const a = -Math.PI / 2 - lado * (0.9 + i * 0.28);
        const r0 = r * (1.35 + vibra * 0.08), r1 = r * (1.62 + vibra * 0.08);
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
        ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.stroke();
      }
    }
    ctx.restore();
  };

  /** Planta rodadora (el gag del bar vacío). */
  A.rodadora = function (ctx, x, suelo, r, t) {
    const bote = Math.abs(Math.sin(t * 5));
    const y = suelo - r - bote * 70;
    const aplasta = bote < 0.18 ? 0.84 : 1;
    ctx.save();
    ctx.fillStyle = 'rgba(20,20,20,0.13)';
    ctx.beginPath(); ctx.ellipse(x, suelo, r * (0.9 - bote * 0.3), 10, 0, 0, Math.PI * 2); ctx.fill();
    ctx.translate(x, y + r * (1 - aplasta));
    ctx.scale(1 / aplasta, aplasta);
    ctx.rotate(-t * 7);
    ctx.strokeStyle = '#7B5E34'; ctx.lineWidth = 5;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.42, (i * Math.PI) / 7, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.strokeStyle = C.tinta; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  };

  /* ---------------------------------------------------------------- creador de posts */

  /** Caja «¿Qué hay hoy?» donde se va tecleando el texto. */
  A.cajaTexto = function (ctx, x, y, w, h, texto, n, t, k) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(x + w / 2, y + h / 2);
    ctx.scale(k * (1 + (1 - Math.min(k, 1)) * 0.3), k);
    ctx.translate(-w / 2, -h / 2);
    S.tarjeta(ctx, 0, 0, w, h, 28, C.papelClaro);
    ctx.fillStyle = C.cobalto;
    ctx.font = F.ui(26, 700);
    ctx.fillText('¿Qué hay hoy?', 28, 48);
    // texto con salto de línea por palabras
    ctx.font = F.ui(36, 500);
    ctx.fillStyle = C.tinta;
    const visible = texto.slice(0, n);
    const lineas = [];
    let linea = '';
    for (const palabra of visible.split(' ')) {
      const prueba = linea ? linea + ' ' + palabra : palabra;
      if (ctx.measureText(prueba).width > w - 60 && linea) { lineas.push(linea); linea = palabra; }
      else linea = prueba;
    }
    lineas.push(linea);
    lineas.forEach((l, i) => ctx.fillText(l, 28, 104 + i * 46));
    if ((t * 2.2) % 2 < 1) {
      const ultima = lineas[lineas.length - 1];
      ctx.fillStyle = C.cobalto;
      ctx.fillRect(30 + ctx.measureText(ultima).width + 4, 104 + (lineas.length - 1) * 46 - 32, 4, 40);
    }
    ctx.fillStyle = C.tintaSuave;
    ctx.font = F.ui(22, 500);
    ctx.textAlign = 'right';
    ctx.fillText(`${n}/300`, w - 26, h - 22);
    ctx.restore();
  };

  /** Mano-cursor (guante con dedo índice) que pulsa el botón. */
  A.manoCursor = function (ctx, x, y, k) {
    if (k <= 0.001) return;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.35);
    ctx.scale(k, k);
    ctx.lineWidth = 6; ctx.strokeStyle = C.tinta; ctx.fillStyle = C.blanco; ctx.lineJoin = 'round';
    U.redondeado(ctx, -11, -8, 22, 58, 11); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 60, 32, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(-30, 52, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();
  };

  /** Alcachofa a la brasa: capas de pétalos en grises (foto B/N de la marca). */
  function alcachofa(ctx, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(1, 0.8);
    ctx.lineWidth = 2.5; ctx.strokeStyle = C.tinta; ctx.lineJoin = 'round';
    const capas = [[9, 1, '#55554F'], [7, 0.72, '#86857C'], [5, 0.45, '#B8B6AB']];
    for (const [n, f, col] of capas) {
      for (let i = 0; i < n; i++) {
        ctx.save();
        ctx.rotate((i / n) * Math.PI * 2 + f);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-r * f * 0.5, r * f * 0.6, 0, r * f);
        ctx.quadraticCurveTo(r * f * 0.5, r * f * 0.6, 0, 0);
        ctx.fillStyle = col; ctx.fill(); ctx.stroke();
        ctx.restore();
      }
    }
    ctx.strokeStyle = 'rgba(20,20,20,0.7)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-r * 0.7, -r * 0.2); ctx.lineTo(r * 0.5, r * 0.5); ctx.stroke(); // marca de brasa
    ctx.restore();
  }

  /** Póster de papel «ALCACHOFAS a la BRASA» (estilo «Póster de papel» del creador). */
  A.poster = function (ctx, x, y, w, h, t) {
    ctx.save();
    U.redondeado(ctx, x, y, w, h, 14);
    ctx.clip();
    ctx.fillStyle = C.papelOscuro;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = C.tinta;
    ctx.textBaseline = 'alphabetic';
    ctx.font = F.anton(100);
    const tam = (w * 0.9 * 100) / ctx.measureText('ALCACHOFAS').width;
    ctx.font = F.anton(tam);
    ctx.fillText('ALCACHOFAS', x + w * 0.05, y + tam * 0.98);
    ctx.font = F.serif(tam * 0.72);
    ctx.fillText('a la', x + w * 0.05, y + tam * 1.9);
    const anchoAla = ctx.measureText('a la ').width;
    ctx.font = F.anton(tam);
    ctx.fillText('BRASA', x + w * 0.05 + anchoAla, y + tam * 1.9);
    // plato con trama de semitono
    const px = x + w / 2, py = y + h * 0.76;
    ctx.beginPath(); ctx.ellipse(px, py, w * 0.42, h * 0.17, 0, 0, Math.PI * 2);
    ctx.fillStyle = C.blanco; ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.tinta; ctx.stroke();
    alcachofa(ctx, px - w * 0.2, py + 2, w * 0.12, 0.3);
    alcachofa(ctx, px + w * 0.19, py + 4, w * 0.12, -0.5);
    alcachofa(ctx, px, py - h * 0.03, w * 0.14, 1.1);
    ctx.save();
    ctx.beginPath(); ctx.ellipse(px, py, w * 0.42, h * 0.17, 0, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = S.patronTrama(ctx);
    ctx.fillRect(px - w * 0.45, py - h * 0.2, w * 0.9, h * 0.4);
    ctx.restore();
    const brillo = 1 + Math.sin(t * 4) * 0.12;
    S.destello(ctx, x + w * 0.88, y + h * 0.5, 30 * brillo, 42 * brillo, { color: C.cobalto, grosor: 3.5 });
    ctx.restore();
  };

  /** Post tal y como se vería en Instagram: la idea central del producto. */
  A.post = function (ctx, x, y, w, t, o = {}) {
    const pad = w * 0.045, h = w * 1.34;
    S.tarjeta(ctx, x, y, w, h, 28, C.papelClaro);
    ctx.save();
    // cabecera
    const r = w * 0.045, ay = y + pad + r;
    ctx.beginPath(); ctx.arc(x + pad + r, ay, r, 0, Math.PI * 2);
    ctx.fillStyle = C.cobalto; ctx.fill();
    ctx.fillStyle = C.papel;
    ctx.font = F.serif(r * 1.35);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('S', x + pad + r, ay + r * 0.05);
    ctx.textAlign = 'left';
    ctx.fillStyle = C.tinta;
    ctx.font = F.ui(w * 0.042, 700);
    ctx.fillText(o.cuenta || 'tu.bar', x + pad + r * 2 + w * 0.025, ay);
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.arc(x + w - pad - 6, ay - 11 + i * 11, 3.2, 0, Math.PI * 2); ctx.fill();
    }
    // imagen
    const ix = x + pad, iy = y + pad * 2 + r * 2, iw = w - pad * 2, ih = iw * 0.92;
    A.poster(ctx, ix, iy, iw, ih, t);
    // acciones
    let yy = iy + ih + w * 0.07;
    const s = w * 0.07;
    ctx.lineWidth = 4.5; ctx.strokeStyle = C.tinta; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    const kLike = o.meGusta || 0;
    ctx.save();
    ctx.translate(ix + s * 0.55, yy);
    const pulso = 1 + Math.sin(Math.min(kLike, 1) * Math.PI) * 0.45;
    ctx.scale(pulso, pulso);
    S.corazon(ctx, 0, 0, s);
    if (kLike > 0) { ctx.fillStyle = C.cobalto; ctx.fill(); }
    ctx.stroke();
    ctx.restore();
    ctx.beginPath(); ctx.arc(ix + s * 1.95, yy, s * 0.36, 0.25 * Math.PI, 2.1 * Math.PI);
    ctx.lineTo(ix + s * 2.4, yy + s * 0.42); ctx.closePath(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ix + s * 2.9, yy - s * 0.05); ctx.lineTo(ix + s * 3.55, yy - s * 0.4); ctx.lineTo(ix + s * 3.3, yy + s * 0.38); ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(ix + iw - s * 0.6, yy - s * 0.4); ctx.lineTo(ix + iw - s * 0.05, yy - s * 0.4);
    ctx.lineTo(ix + iw - s * 0.05, yy + s * 0.42); ctx.lineTo(ix + iw - s * 0.33, yy + s * 0.18);
    ctx.lineTo(ix + iw - s * 0.6, yy + s * 0.42); ctx.closePath(); ctx.stroke();
    // me gusta y pie de foto
    yy += w * 0.08;
    ctx.fillStyle = C.tinta;
    ctx.font = F.ui(w * 0.04, 700);
    ctx.textBaseline = 'middle';
    ctx.fillText(`${(o.likes || 0).toLocaleString('es-ES')} Me gusta`, ix, yy);
    yy += w * 0.06;
    ctx.font = F.ui(w * 0.036, 700);
    ctx.fillText(o.cuenta || 'tu.bar', ix, yy);
    const ancho = ctx.measureText((o.cuenta || 'tu.bar') + ' ').width;
    ctx.font = F.ui(w * 0.036, 400);
    ctx.fillText('Hoy tenemos alcachofas a la brasa.', ix + ancho, yy);
    yy += w * 0.055;
    ctx.fillStyle = C.cobalto;
    ctx.font = F.ui(w * 0.036, 600);
    ctx.fillText('#Alcachofas  #Hoy  #TuBar', ix, yy);
    ctx.restore();
  };

  /* ---------------------------------------------------------------- pantallas del móvil */

  S.Pantallas = {
    /** Post en blanco: no sabe qué publicar. */
    vacia(ctx, x, y, w, h, t) {
      ctx.fillStyle = C.papelClaro; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = C.tinta; ctx.fillRect(x + 10, y + 18, 34, 6);
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 3; ctx.setLineDash([7, 6]);
      ctx.strokeRect(x + 10, y + 34, w - 20, w - 20);
      ctx.setLineDash([]);
      ctx.font = F.anton(54); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = C.cobalto;
      ctx.fillText('?', x + w / 2, y + 34 + (w - 20) / 2 + Math.sin(t * 6) * 3);
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = C.gris;
      ctx.fillRect(x + 10, y + w + 28, w - 30, 7);
      ctx.fillRect(x + 10, y + w + 42, w - 50, 7);
      if ((t * 2.2) % 2 < 1) { ctx.fillStyle = C.cobalto; ctx.fillRect(x + 10, y + h - 44, 3, 20); }
    },
    /** Último post, hace días y sin me gusta. */
    cero(ctx, x, y, w, h) {
      ctx.fillStyle = C.papelClaro; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = C.gris; ctx.fillRect(x + 8, y + 26, w - 16, w - 16);
      ctx.strokeStyle = C.papelClaro; ctx.lineWidth = 3;
      for (let i = -w; i < w; i += 14) { // imagen "vacía" rayada
        ctx.beginPath(); ctx.moveTo(x + 8 + i, y + 26); ctx.lineTo(x + 8 + i + w, y + 26 + w); ctx.stroke();
      }
      ctx.lineWidth = 3; ctx.strokeStyle = C.tinta;
      S.corazon(ctx, x + 20, y + w + 36, 20); ctx.stroke();
      ctx.fillStyle = C.tinta; ctx.font = F.ui(20, 800); ctx.textBaseline = 'middle';
      ctx.fillText('0', x + 36, y + w + 37);
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = C.gris;
      ctx.fillRect(x + 10, y + w + 58, w - 26, 7);
      ctx.fillRect(x + 10, y + w + 72, w - 46, 7);
    },
    /** Teclado y texto que crece. */
    escribe(ctx, x, y, w, h, t) {
      ctx.fillStyle = C.papelClaro; ctx.fillRect(x, y, w, h);
      ctx.fillStyle = C.tinta;
      const n = Math.floor((t * 3) % 6);
      for (let i = 0; i <= n; i++) ctx.fillRect(x + 10, y + 22 + i * 12, i === n ? 26 + (i * 13) % 40 : w - 22, 6);
      ctx.fillStyle = '#DDD7C8'; ctx.fillRect(x, y + h - 78, w, 78);
      const activa = Math.floor(t * 9) % 21;
      for (let f = 0; f < 3; f++) {
        for (let c = 0; c < 7; c++) {
          ctx.fillStyle = f * 7 + c === activa ? C.cobalto : C.blanco;
          ctx.fillRect(x + 4 + c * 14, y + h - 72 + f * 22, 11, 17);
        }
      }
    },
  };

  S.A = A;
})(window.Society);
