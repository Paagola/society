/* ==========================================================================
   Society · Animación — núcleo
   Espacio de nombres, medidas del lienzo lógico, utilidades, curvas de
   easing, generador aleatorio con semilla y muelles (física de squash).
   ========================================================================== */
window.Society = window.Society || {};

(function (S) {
  'use strict';

  /* Todo se dibuja en un lienzo lógico de 1080 × 1350 (formato post 4:5).
     app.js lo escala al tamaño real del contenedor. */
  S.W = 1080;
  S.H = 1350;
  S.SUELO = 1275; // línea del suelo donde apoyan personaje y mesas

  const U = {
    clamp: (v, a, b) => Math.min(b, Math.max(a, v)),
    lerp: (a, b, t) => a + (b - a) * t,
    /** Progreso 0..1 de `v` dentro del tramo [a, b], recortado. */
    tramo: (a, b, v) => U.clamp((v - a) / (b - a), 0, 1),
    /** Rectángulo con esquinas redondeadas (deja el trazado abierto para fill/stroke). */
    redondeado(ctx, x, y, w, h, r) {
      r = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    },
    /** Generador pseudoaleatorio determinista (mulberry32): mismas texturas en cada carga. */
    semilla(a) {
      return function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    },
  };

  /* Curvas de easing (t de 0 a 1). */
  const E = {
    lineal: t => t,
    salida: t => 1 - Math.pow(1 - t, 3),
    entradaSalida: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    /** Sale pasándose un poco y vuelve (outBack): el "pop" cartoon. */
    rebote(t, s = 1.70158) {
      const c = s + 1;
      return 1 + c * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2);
    },
    /** Coge carrerilla hacia atrás antes de irse (inBack): anticipación. */
    entradaAtras: (t, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
    elastico(t) {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
    },
  };

  /**
   * Muelle amortiguado (Euler semiimplícito). Se usa para el squash & stretch
   * interactivo y para suavizar la inclinación del personaje.
   * `v` es el valor actual; `obj`, el valor de reposo.
   */
  class Muelle {
    constructor(rigidez = 180, amortiguacion = 12) {
      this.k = rigidez;
      this.d = amortiguacion;
      this.v = 0;
      this.vel = 0;
      this.obj = 0;
    }
    golpe(impulso) { this.vel += impulso; }
    actualizar(dt) {
      const fuerza = -this.k * (this.v - this.obj) - this.d * this.vel;
      this.vel += fuerza * dt;
      this.v += this.vel * dt;
    }
    reiniciar() { this.v = this.obj; this.vel = 0; }
  }

  S.U = U;
  S.E = E;
  S.Muelle = Muelle;
})(window.Society);
