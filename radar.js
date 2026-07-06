/**
 * radar.js
 * --------
 * Animated hexagonal radar / spider chart drawn on
 * <canvas id="radar"> in the Skills section.
 *
 * Animates from zero to full values when the canvas
 * enters the viewport (IntersectionObserver).
 * No external library required.
 */

(function () {
  'use strict';

  /* ── Skill axes ────────────────────────────────────────── */
  const AXES = [
    { label: 'Embedded',   val: 0.85 },
    { label: 'AI / CV',    val: 0.78 },
    { label: 'Railway',    val: 0.72 },
    { label: 'Analytics',  val: 0.80 },
    { label: 'Leadership', val: 0.75 },
    { label: 'Systems',    val: 0.70 },
  ];

  /* ── Canvas setup ──────────────────────────────────────── */
  const canvas = document.getElementById('radar');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;
  const cx  = W / 2;
  const cy  = H / 2;
  const R   = Math.min(W, H) / 2 - 50;   // max radius, leaving label room
  const N   = AXES.length;
  const RINGS = 4;

  /* ── Helpers ───────────────────────────────────────────── */
  /**
   * Returns the angle (radians) for axis i,
   * starting from the top (−π/2).
   */
  function angle (i) {
    return (Math.PI * 2 * i / N) - Math.PI / 2;
  }

  /* ── Drawing functions ─────────────────────────────────── */

  /** Concentric hexagonal grid rings + axis spokes */
  function drawGrid () {
    /* Rings */
    for (let ring = 1; ring <= RINGS; ring++) {
      const r = R * ring / RINGS;

      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = angle(i);
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 245, 255, ${0.07 + ring * 0.02})`;
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    /* Axis spokes */
    AXES.forEach((_, i) => {
      const a = angle(i);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.12)';
      ctx.lineWidth   = 1;
      ctx.stroke();
    });
  }

  /**
   * Filled data polygon, scaled by `progress` (0 → 1).
   * Draws the polygon, fills it with a radial gradient,
   * strokes the outline, and places vertex dots.
   */
  function drawData (progress) {
    /* Polygon path */
    ctx.beginPath();
    AXES.forEach((ax, i) => {
      const a = angle(i);
      const r = R * ax.val * progress;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();

    /* Radial fill */
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(0, 245, 255, 0.30)');
    grad.addColorStop(1, 'rgba(123, 47, 190, 0.10)');
    ctx.fillStyle   = grad;
    ctx.fill();

    /* Stroke */
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.8)';
    ctx.lineWidth   = 2;
    ctx.stroke();

    /* Vertex dots */
    AXES.forEach((ax, i) => {
      const a = angle(i);
      const r = R * ax.val * progress;
      ctx.beginPath();
      ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#00F5FF';
      ctx.fill();
    });
  }

  /** Axis labels placed just outside the outer ring */
  function drawLabels () {
    ctx.font      = '11px "Space Mono", monospace';
    ctx.fillStyle = '#6B7B99';
    ctx.textAlign = 'center';

    AXES.forEach((ax, i) => {
      const a    = angle(i);
      const labelR = R + 28;
      ctx.fillText(
        ax.label,
        cx + labelR * Math.cos(a),
        cy + labelR * Math.sin(a) + 4
      );
    });
  }

  /* ── Animation loop ────────────────────────────────────── */
  let progress = 0;
  let started  = false;

  function animate () {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawData(progress);
    drawLabels();

    if (progress < 1) {
      progress += 0.025;
      requestAnimationFrame(animate);
    }
  }

  /* ── Trigger animation on visibility ─────────────────────
     Waits until the canvas is 30% visible before starting,
     so the animation plays as the user scrolls to it.
  ─────────────────────────────────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      animate();
    }
  }, { threshold: 0.3 });

  observer.observe(canvas);

}());
