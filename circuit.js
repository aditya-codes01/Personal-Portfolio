/**
 * circuit.js
 * ----------
 * Animated PCB circuit-board background.
 *
 * Renders floating junction nodes (circles and squares) connected
 * by axis-aligned L-shaped traces — mimicking real PCB routing.
 * A radial glow follows the mouse cursor.
 *
 * Runs on a fixed <canvas id="circuit-canvas"> that sits behind
 * all page content (z-index: 0, pointer-events: none).
 */

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────────── */
  const NODE_COUNT     = 55;
  const MAX_DIST       = 160;   // max px between connected nodes
  const MAX_ALPHA      = 0.35;  // max trace opacity
  const NODE_SPEED     = 0.3;   // max velocity component
  const MOUSE_RADIUS   = 200;   // px radius of mouse glow
  const MOUSE_STRENGTH = 0.06;  // glow intensity

  /* ── State ──────────────────────────────────────────────── */
  const canvas = document.getElementById('circuit-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, nodes;
  const mouse = { x: 0, y: 0 };

  /* ── Resize: match canvas to viewport ─────────────────── */
  function resize () {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    initNodes();
  }

  /* ── Create nodes ──────────────────────────────────────── */
  function initNodes () {
    nodes = Array.from({ length: NODE_COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * NODE_SPEED,
      vy:    (Math.random() - 0.5) * NODE_SPEED,
      r:     Math.random() * 2 + 1,
      type:  Math.random() > 0.5 ? 'junction' : 'node',
      pulse: Math.random() * Math.PI * 2,   // phase offset for glow pulse
    }));
  }

  /* ── Draw a single node ────────────────────────────────── */
  function drawNode (n) {
    n.pulse += 0.02;
    const glow  = (Math.sin(n.pulse) + 1) / 2;
    const alpha = 0.4 + glow * 0.4;

    ctx.beginPath();

    if (n.type === 'junction') {
      /* Square pad — junction point on a PCB */
      ctx.rect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
    } else {
      /* Round via */
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    }

    ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
    ctx.fill();
  }

  /* ── Draw L-shaped traces between nearby nodes ─────────── */
  function drawConnections () {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d >= MAX_DIST) continue;

        const alpha = (1 - d / MAX_DIST) * MAX_ALPHA;
        const midX  = nodes[i].x + dx * 0.5;  // horizontal knee point

        /* PCB-style: horizontal → vertical (L-shaped route) */
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(midX,       nodes[i].y);   // horizontal leg
        ctx.lineTo(nodes[j].x, nodes[j].y);   // vertical leg

        const grad = ctx.createLinearGradient(
          nodes[i].x, nodes[i].y,
          nodes[j].x, nodes[j].y
        );
        grad.addColorStop(0, `rgba(0, 245, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(123, 47, 190, ${alpha})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth   = 0.6;
        ctx.stroke();
      }
    }
  }

  /* ── Soft radial glow at cursor position ───────────────── */
  function drawMouseGlow () {
    const grad = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, MOUSE_RADIUS
    );
    grad.addColorStop(0, `rgba(0, 245, 255, ${MOUSE_STRENGTH})`);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Animation loop ────────────────────────────────────── */
  function tick () {
    ctx.clearRect(0, 0, W, H);

    drawMouseGlow();
    drawConnections();

    nodes.forEach(n => {
      /* Move */
      n.x += n.vx;
      n.y += n.vy;

      /* Bounce off edges */
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      drawNode(n);
    });

    requestAnimationFrame(tick);
  }

  /* ── Event listeners ───────────────────────────────────── */
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  /* ── Boot ──────────────────────────────────────────────── */
  resize();
  tick();

}());
