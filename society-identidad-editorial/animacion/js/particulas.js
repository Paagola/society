/* ==========================================================================
   Society · Animación — partículas
   Corazones ("me gusta"), destellos y chispas. Se usan para los clics del
   usuario, la estela del ratón y los corazones que suben del bar lleno.
   ========================================================================== */
(function (S) {
  'use strict';
  const { U, E, C } = S;
  const MAXIMO = 260;

  class Particulas {
    constructor() { this.lista = []; }

    vaciar() { this.lista.length = 0; }

    emitir(o) {
      if (this.lista.length >= MAXIMO) this.lista.shift();
      this.lista.push(Object.assign({
        tipo: 'corazon', x: 0, y: 0, vx: 0, vy: 0,
        g: 0,            // gravedad (negativa = flota)
        arrastre: 1.5,   // frenado por segundo
        balanceo: 0,     // vaivén lateral
        rot: 0, vr: 0,
        vida: 0, dur: 1,
        tam: 30,
        color: C.cobalto,
        fase: Math.random() * 10,
      }, o));
    }

    /** Explosión radial de corazones y destellos (clic). */
    rafaga(x, y, n, colores, tipos = ['corazon', 'destello']) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const v = 320 + Math.random() * 520;
        this.emitir({
          tipo: tipos[i % tipos.length],
          x, y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v - 260,
          g: 1100,
          arrastre: 2.2,
          rot: (Math.random() - 0.5) * 0.8,
          vr: (Math.random() - 0.5) * 7,
          dur: 0.8 + Math.random() * 0.6,
          tam: 24 + Math.random() * 28,
          color: colores[i % colores.length],
        });
      }
    }

    actualizar(dt) {
      for (let i = this.lista.length - 1; i >= 0; i--) {
        const p = this.lista[i];
        p.vida += dt;
        if (p.vida >= p.dur) { this.lista.splice(i, 1); continue; }
        const f = Math.exp(-p.arrastre * dt);
        p.vx *= f;
        p.vy = p.vy * f + p.g * dt;
        p.x += (p.vx + Math.sin(p.vida * 5 + p.fase) * p.balanceo) * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
      }
    }

    dibujar(ctx) {
      for (const p of this.lista) {
        const vida = p.vida / p.dur;
        const k = E.rebote(U.clamp(p.vida / 0.22, 0, 1)); // aparece con "pop"
        const alfa = 1 - vida * vida * vida;
        // estiramiento según la velocidad (squash & stretch de las partículas)
        const vel = Math.hypot(p.vx, p.vy);
        const est = 1 + U.clamp(vel / 2500, 0, 0.35);
        ctx.save();
        ctx.globalAlpha = alfa;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(k / Math.sqrt(est), k * est);
        if (p.tipo === 'corazon') {
          S.corazon(ctx, 0, 0, p.tam);
          ctx.fillStyle = p.color; ctx.fill();
          ctx.lineWidth = 4; ctx.strokeStyle = C.tinta; ctx.stroke();
        } else if (p.tipo === 'destello') {
          S.destello(ctx, 0, 0, p.tam * 0.8, p.tam * 1.1, { relleno: p.color });
        } else {
          ctx.beginPath(); ctx.arc(0, 0, p.tam * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = p.color; ctx.fill();
        }
        ctx.restore();
      }
    }
  }

  S.Particulas = Particulas;
})(window.Society);
