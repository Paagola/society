/* ==========================================================================
   Society · Animación — «Cortado», el hostelero-taza
   Personaje 100 % procedimental: cuerpo de taza con degradado, asa,
   brazos y piernas "rubber hose", guantes, cara con 4 estados de ánimo,
   vapor que cambia según el ánimo y un móvil en la mano.

   Squash & stretch en dos capas:
   · determinista: saltos que marca la escena (dependen solo del tiempo,
     así el scrub de la línea de tiempo siempre da el mismo fotograma);
   · interactiva: salto con gravedad al hacer clic + muelle que aplasta
     al aterrizar y estira al despegar.

   Coordenadas locales: origen en los pies, el eje Y crece hacia abajo.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, C, F } = S;

  const GRAVEDAD = 4200;
  const HOMBRO_I = [-136, -185];
  const HOMBRO_D = [136, -178];
  const OJOS = [[-55, -245], [55, -245]];

  /** Posición de las manos (y del móvil) según la pose. */
  function manos(pose, t) {
    switch (pose) {
      case 'telefono': // mira el móvil y se rasca la cabeza
        return { i: [-172, -352 + Math.sin(t * 18) * 9], d: [196, -262], tel: { x: 238, y: -330, rot: -0.14 } };
      case 'telefonoBajo': // brazos caídos, el móvil colgando
        return { i: [-176, -118], d: [176, -170], tel: { x: 205, y: -92, rot: 0.34 } };
      case 'escribe':
        return { i: [-172, -125 + Math.sin(t * 3) * 4], d: [176, -222], tel: { x: 200, y: -282, rot: -0.1 } };
      case 'celebra':
        return { i: [-235, -430 + Math.sin(t * 11) * 18], d: [235, -430 + Math.sin(t * 11 + Math.PI) * 18], tel: null };
      case 'saluda':
        return { i: [-172, -120], d: [250 + Math.sin(t * 12) * 30, -410], tel: null };
      default:
        return { i: [-170, -120], d: [170, -120], tel: null };
    }
  }

  /** Hacia dónde mira cuando el ratón no está en el lienzo. */
  const MIRADA_POSE = {
    telefono: { x: 238, y: -330 },
    telefonoBajo: { x: 205, y: -92 },
    escribe: { x: 200, y: -282 },
  };

  class Personaje {
    constructor() {
      this.saltoY = 0;
      this.saltoV = 0;
      this.squash = new S.Muelle(240, 13);  // + estira, − aplasta
      this.inclina = new S.Muelle(60, 11);  // se inclina hacia el ratón
      this.caja = null;                     // caja de impacto para los clics (coords del mundo)
    }

    reiniciar() {
      this.saltoY = this.saltoV = 0;
      this.squash.reiniciar();
      this.inclina.reiniciar();
    }

    /** Salto interactivo: estira al despegar. */
    saltar(fuerza = 1) {
      if (this.saltoY > -40) {
        this.saltoV = -1500 * fuerza;
        this.squash.golpe(5);
      }
    }

    contiene(x, y) {
      const c = this.caja;
      return !!c && x >= c.x0 && x <= c.x1 && y >= c.y0 && y <= c.y1;
    }

    actualizar(dt) {
      if (this.saltoY < 0 || this.saltoV < 0) {
        this.saltoV += GRAVEDAD * dt;
        this.saltoY += this.saltoV * dt;
        if (this.saltoY >= 0) { // aterriza: aplastamiento proporcional a la velocidad
          this.squash.golpe(-this.saltoV / 300);
          this.saltoY = 0;
          this.saltoV = 0;
        }
      }
      this.squash.actualizar(dt);
      this.inclina.actualizar(dt);
    }

    /**
     * e = { x, suelo, esc, animo, pose, pantalla, salto: {amp, periodo}, camina, mira: {x,y}|null }
     * animo: 'agobiado' | 'triste' | 'concentrado' | 'feliz'
     */
    dibujar(ctx, e, t) {
      const esc = e.esc;

      // --- salto automático marcado por la escena (determinista)
      let hopY = 0, hopS = 0;
      if (e.salto && e.salto.amp > 0) {
        const { amp, periodo } = e.salto;
        const p = ((t / periodo) % 1 + 1) % 1, apoyo = 0.2, f = Math.min(1, amp / 80);
        if (p < apoyo) {
          hopS = -0.2 * f * Math.sin((Math.PI * p) / apoyo);          // aplasta en el suelo
        } else {
          const q = (p - apoyo) / (1 - apoyo);
          hopY = -amp * 4 * q * (1 - q);                              // parábola
          hopS = 0.14 * f * Math.abs(1 - 2 * q);                      // estira al subir y bajar
        }
      }
      const aire = this.saltoY < 0 ? U.clamp(Math.abs(this.saltoV) / 7000, 0, 0.2) : 0;
      const s = U.clamp(hopS + this.squash.v + aire + Math.sin(t * 2.4) * 0.012, -0.38, 0.38);
      const sy = 1 + s, sx = 1 - s * 0.7; // conserva (más o menos) el volumen

      const alto = hopY + this.saltoY;
      const base = e.suelo + alto;
      const x = e.x + (e.animo === 'agobiado' ? Math.sin(t * 47) * 2.2 : 0); // tembleque de nervios
      this.inclina.obj = e.mira ? U.clamp((e.mira.x - e.x) / 2600, -0.08, 0.08) : 0;
      const rot = this.inclina.v
        + (e.animo === 'triste' ? 0.035 : 0)
        + (e.pose === 'celebra' ? Math.sin(t * 5.5) * 0.05 : 0);

      // --- sombra en el suelo (se encoge cuando está en el aire)
      const lejos = U.clamp(-alto / 300, 0, 0.7);
      ctx.save();
      ctx.fillStyle = 'rgba(20,20,20,0.16)';
      ctx.beginPath();
      ctx.ellipse(e.x, e.suelo, 150 * esc * (1 - lejos * 0.6) * sx, 20 * esc * (1 - lejos * 0.5), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      this.caja = { x0: e.x - 200 * esc, x1: e.x + 200 * esc, y0: base - 390 * esc, y1: base + 10 };

      // --- mirada en coordenadas locales
      const mira = e.mira
        ? { x: (e.mira.x - e.x) / esc, y: (e.mira.y - base) / esc }
        : MIRADA_POSE[e.pose] || null;

      ctx.save();
      ctx.translate(x, base);
      ctx.rotate(rot);
      ctx.scale(esc * sx, esc * sy);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      this.vapor(ctx, e.animo, t);
      this.asa(ctx);
      this.piernas(ctx, t, e.camina);
      this.cuerpo(ctx);
      this.cara(ctx, e.animo, mira, t);
      this.extras(ctx, e.animo, t);

      const m = manos(e.pose, t);
      this.brazo(ctx, HOMBRO_I, m.i, -1);
      this.brazo(ctx, HOMBRO_D, m.d, 1);
      if (m.tel) this.telefono(ctx, m.tel, e.pantalla, t);
      this.guante(ctx, m.i, -1);
      this.guante(ctx, m.d, 1);
      ctx.restore();
    }

    /* ------------------------------------------------------------ partes */

    vapor(ctx, animo, t) {
      ctx.save();
      if (animo === 'feliz') { // corazoncitos en vez de vapor
        for (let i = 0; i < 3; i++) {
          const f = (t * 0.6 + i / 3) % 1;
          ctx.globalAlpha = 1 - f;
          S.corazon(ctx, -55 + i * 55 + Math.sin(f * 7 + i) * 12, -385 - f * 150, 34 * (1 - f * 0.3));
          ctx.fillStyle = C.mostaza; ctx.fill();
          ctx.lineWidth = 5; ctx.strokeStyle = C.tinta; ctx.stroke();
        }
      } else {
        ctx.strokeStyle = C.tinta;
        ctx.lineWidth = 7;
        for (let i = 0; i < 3; i++) {
          ctx.globalAlpha = animo === 'agobiado' ? 0.55 : 0.3;
          ctx.beginPath();
          const x0 = -55 + i * 55;
          for (let k = 0; k <= 12; k++) {
            const y = -380 - k * 10;
            const dx = animo === 'agobiado'
              ? (k % 2 ? 11 : -11) * (1 + Math.sin(t * 30 + i) * 0.3)   // vapor "de estrés" en zigzag
              : Math.sin(k * 0.6 - t * 4 + i * 2) * 10;
            k ? ctx.lineTo(x0 + dx, y) : ctx.moveTo(x0 + dx, y);
          }
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    asa(ctx) {
      ctx.beginPath();
      ctx.ellipse(150, -235, 62, 70, 0, -1.75, 1.75);
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 40; ctx.stroke();
      ctx.strokeStyle = C.papelClaro; ctx.lineWidth = 22; ctx.stroke();
    }

    piernas(ctx, t, camina) {
      for (const lado of [-1, 1]) {
        const lev = camina ? Math.max(0, Math.sin(t * 14 + (lado > 0 ? Math.PI : 0))) * 28 : 0;
        ctx.beginPath();
        ctx.moveTo(lado * 50, -85);
        ctx.quadraticCurveTo(lado * 74, -50, lado * 58, -16 - lev);
        ctx.strokeStyle = C.tinta; ctx.lineWidth = 18; ctx.stroke();
        // zapato
        ctx.beginPath();
        ctx.ellipse(lado * 74, -16 - lev, 46, 22, lado * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = C.tinta; ctx.fill();
        ctx.beginPath();
        ctx.ellipse(lado * 84, -24 - lev, 13, 6, lado * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill();
      }
    }

    trazaCuerpo(ctx) {
      ctx.beginPath();
      ctx.moveTo(-150, -330);
      ctx.bezierCurveTo(-148, -220, -135, -120, -118, -95);
      ctx.quadraticCurveTo(-110, -78, -90, -78);
      ctx.lineTo(90, -78);
      ctx.quadraticCurveTo(110, -78, 118, -95);
      ctx.bezierCurveTo(135, -120, 148, -220, 150, -330);
      ctx.closePath();
    }

    cuerpo(ctx) {
      // cuerpo con degradado para dar volumen
      const g = ctx.createLinearGradient(-150, 0, 150, 0);
      g.addColorStop(0, '#FFFFFF');
      g.addColorStop(0.45, C.papelClaro);
      g.addColorStop(1, '#DCD4BF');
      this.trazaCuerpo(ctx);
      ctx.fillStyle = g;
      ctx.fill();

      // franja cobalto de la marca + brillo
      ctx.save();
      this.trazaCuerpo(ctx);
      ctx.clip();
      ctx.fillStyle = C.cobalto;
      ctx.fillRect(-160, -135, 320, 28);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.beginPath();
      ctx.ellipse(-112, -250, 11, 55, 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      this.trazaCuerpo(ctx);
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 9; ctx.stroke();

      // borde y café con arte latte
      ctx.beginPath();
      ctx.ellipse(0, -330, 150, 34, 0, 0, Math.PI * 2);
      ctx.fillStyle = C.papelClaro; ctx.fill();
      ctx.stroke();
      const cg = ctx.createRadialGradient(0, -328, 10, 0, -328, 130);
      cg.addColorStop(0, C.cafeClaro);
      cg.addColorStop(1, C.cafe);
      ctx.beginPath();
      ctx.ellipse(0, -327, 126, 23, 0, 0, Math.PI * 2);
      ctx.fillStyle = cg; ctx.fill();
      ctx.lineWidth = 4; ctx.stroke();
      ctx.save();
      ctx.translate(0, -326);
      ctx.scale(1, 0.26);
      S.corazon(ctx, 0, 0, 80);
      ctx.fillStyle = C.espuma; ctx.fill();
      ctx.restore();
    }

    cara(ctx, animo, mira, t) {
      const parpadeo = ((t + 0.3) % 3.4) < 0.13 ? 0.12 : 1;
      const ry = (animo === 'agobiado' ? 47 : 42) * parpadeo;
      const rPupila = animo === 'agobiado' ? 11 : animo === 'feliz' ? 17 : 15;

      for (const [ex, ey] of OJOS) {
        ctx.beginPath();
        ctx.ellipse(ex, ey, 34, ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = C.blanco; ctx.fill();
        ctx.lineWidth = 7; ctx.strokeStyle = C.tinta; ctx.stroke();
        if (parpadeo < 0.5) continue;

        // pupila que sigue al ratón (o al móvil)
        let px = ex, py = ey + 4;
        if (mira) {
          const dx = mira.x - ex, dy = mira.y - ey, d = Math.hypot(dx, dy) || 1;
          const off = Math.min(14, d * 0.08);
          px = ex + (dx / d) * off;
          py = ey + (dy / d) * off;
        }
        if (animo === 'triste') py = Math.max(py, ey + 8);
        ctx.beginPath(); ctx.arc(px, py, rPupila, 0, Math.PI * 2);
        ctx.fillStyle = C.tinta; ctx.fill();
        ctx.beginPath(); ctx.arc(px - 5, py - 6, rPupila * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = C.blanco; ctx.fill();

        if (animo === 'triste') { // párpado caído
          ctx.save();
          ctx.beginPath(); ctx.ellipse(ex, ey, 34, ry, 0, 0, Math.PI * 2); ctx.clip();
          ctx.fillStyle = C.papelClaro;
          ctx.fillRect(ex - 40, ey - 50, 80, 44);
          ctx.beginPath(); ctx.moveTo(ex - 36, ey - 6); ctx.lineTo(ex + 36, ey - 6);
          ctx.lineWidth = 6; ctx.stroke();
          ctx.restore();
        }
      }

      // cejas
      const cejas = {
        agobiado: [[-90, -300], [-60, -318], [-28, -322]],
        triste: [[-88, -296], [-58, -312], [-28, -318]],
        concentrado: [[-90, -312], [-58, -306], [-26, -296]],
        feliz: [[-88, -306], [-58, -334], [-28, -312]],
      }[animo] || [[-88, -304], [-58, -314], [-28, -306]];
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 10;
      for (const lado of [1, -1]) {
        ctx.beginPath();
        ctx.moveTo(cejas[0][0] * lado, cejas[0][1]);
        ctx.quadraticCurveTo(cejas[1][0] * lado, cejas[1][1], cejas[2][0] * lado, cejas[2][1]);
        ctx.stroke();
      }

      // boca
      ctx.lineWidth = 8;
      ctx.beginPath();
      if (animo === 'agobiado') {
        ctx.moveTo(-45, -165);
        for (let i = 1; i <= 6; i++) ctx.lineTo(-45 + i * 15, -165 + (i % 2 ? -8 : 8));
        ctx.stroke();
      } else if (animo === 'triste') {
        ctx.moveTo(-40, -150);
        ctx.quadraticCurveTo(0, -192, 40, -150);
        ctx.stroke();
      } else if (animo === 'concentrado') {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(24, -156 + Math.sin(t * 9) * 2, 12, 15, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = C.rubor; ctx.fill();
        ctx.lineWidth = 5; ctx.stroke();
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(-26, -166); ctx.lineTo(28, -166);
        ctx.stroke();
      } else { // feliz: boca en D con lengua y mofletes
        const boca = () => {
          ctx.beginPath();
          ctx.moveTo(-56, -182);
          ctx.quadraticCurveTo(0, -172, 56, -182);
          ctx.quadraticCurveTo(46, -106, 0, -104);
          ctx.quadraticCurveTo(-46, -106, -56, -182);
          ctx.closePath();
        };
        boca(); ctx.fillStyle = C.tinta; ctx.fill();
        ctx.save(); boca(); ctx.clip();
        ctx.beginPath(); ctx.ellipse(0, -112, 28, 18, 0, 0, Math.PI * 2);
        ctx.fillStyle = C.rubor; ctx.fill();
        ctx.restore();
        boca(); ctx.lineWidth = 7; ctx.stroke();
        ctx.fillStyle = 'rgba(226,87,76,0.35)';
        for (const lado of [-1, 1]) {
          ctx.beginPath(); ctx.ellipse(lado * 98, -196, 22, 12, 0, 0, Math.PI * 2); ctx.fill();
        }
      }
    }

    /** Gotas de sudor (agobiado) o nube de lluvia (triste). */
    extras(ctx, animo, t) {
      if (animo === 'agobiado') {
        for (let i = 0; i < 2; i++) {
          const f = (t * 0.9 + i * 0.5) % 1, lado = i ? 1 : -1;
          const x = lado * (158 + f * 26), y = -345 + f * 95;
          ctx.save();
          ctx.globalAlpha = 1 - f;
          ctx.beginPath();
          ctx.moveTo(x, y - 24);
          ctx.quadraticCurveTo(x + 15, y, x, y + 8);
          ctx.quadraticCurveTo(x - 15, y, x, y - 24);
          ctx.fillStyle = C.cobaltoClaro; ctx.fill();
          ctx.lineWidth = 4; ctx.strokeStyle = C.tinta; ctx.stroke();
          ctx.restore();
        }
      } else if (animo === 'triste') {
        const cy = -545 + Math.sin(t * 1.5) * 6;
        const bolas = [[-62, cy + 8, 38], [-18, cy - 18, 48], [36, cy - 6, 42], [72, cy + 12, 30]];
        // lluvia
        ctx.save();
        ctx.strokeStyle = C.cobalto; ctx.lineWidth = 6;
        for (let i = 0; i < 5; i++) {
          const f = (t * 1.6 + i * 0.23) % 1;
          ctx.globalAlpha = 1 - f;
          ctx.beginPath();
          ctx.moveTo(-60 + i * 30, cy + 40 + f * 120);
          ctx.lineTo(-64 + i * 30, cy + 60 + f * 120);
          ctx.stroke();
        }
        ctx.restore();
        // nube: contorno de la unión de círculos (trazo grueso y luego relleno)
        ctx.strokeStyle = C.tinta; ctx.lineWidth = 12;
        for (const [bx, by, r] of bolas) { ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.stroke(); }
        ctx.fillStyle = '#D6D1C4';
        for (const [bx, by, r] of bolas) { ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill(); }
      }
    }

    brazo(ctx, [sx, sy], [hx, hy], lado) {
      const mx = (sx + hx) / 2, my = (sy + hy) / 2;
      let nx = -(hy - sy), ny = hx - sx;
      const l = Math.hypot(nx, ny) || 1;
      nx /= l; ny /= l;
      if (nx * lado < 0) { nx = -nx; ny = -ny; } // el codo siempre hacia fuera
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(mx + nx * 38, my + ny * 38, hx, hy);
      ctx.strokeStyle = C.tinta; ctx.lineWidth = 17; ctx.stroke();
    }

    guante(ctx, [x, y], lado) {
      ctx.lineWidth = 6; ctx.strokeStyle = C.tinta; ctx.fillStyle = C.blanco;
      ctx.beginPath(); ctx.arc(x - lado * 20, y - 15, 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); // pulgar
      ctx.beginPath(); ctx.arc(x, y, 27, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(x + lado * 4, y - 8); ctx.lineTo(x + lado * 12, y - 2);
      ctx.moveTo(x + lado * 2, y + 4); ctx.lineTo(x + lado * 10, y + 10);
      ctx.stroke();
    }

    telefono(ctx, tel, pantalla, t) {
      ctx.save();
      ctx.translate(tel.x, tel.y + (pantalla === 'escribe' ? Math.sin(t * 20) * 2.5 : 0));
      ctx.rotate(tel.rot);
      U.redondeado(ctx, -62, -108, 124, 216, 22);
      ctx.fillStyle = C.tinta; ctx.fill();
      ctx.save();
      U.redondeado(ctx, -52, -96, 104, 192, 13);
      ctx.clip();
      const dibuja = S.Pantallas && S.Pantallas[pantalla];
      if (dibuja) dibuja(ctx, -52, -96, 104, 192, t);
      ctx.restore();
      U.redondeado(ctx, -16, -92, 32, 8, 4);
      ctx.fillStyle = C.tinta; ctx.fill();
      ctx.restore();
    }
  }

  S.Personaje = Personaje;
})(window.Society);
