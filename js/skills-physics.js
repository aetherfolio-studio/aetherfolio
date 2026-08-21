/**
 * AETHERFOLIO v3.0 — Interactive 2D Skills Physics & Neon Canvas Engine
 * High-DPI Canvas 2D + Matter.js Rigid Bodies + Web Audio Micro-Ticks
 * Fully responsive, non-blocking page scroll, capped DPR, resilient lifecycle.
 */

(function() {
  'use strict';

  // --- 13 Required Technology Badges ---
  const SKILL_BADGES = [
    { name: 'React', accent: '#5dd9cf', sec: '#00b4d8', glow: 'rgba(93, 217, 207, 0.6)' },
    { name: 'TypeScript', accent: '#38bdf8', sec: '#3178c6', glow: 'rgba(56, 189, 248, 0.6)' },
    { name: 'Three.js', accent: '#ffb4a5', sec: '#f59e0b', glow: 'rgba(255, 180, 165, 0.6)' },
    { name: 'WebGL', accent: '#ff7b72', sec: '#ff5370', glow: 'rgba(255, 123, 114, 0.6)' },
    { name: 'Python', accent: '#fbbf24', sec: '#38bdf8', glow: 'rgba(251, 191, 36, 0.6)' },
    { name: 'Node.js', accent: '#34d399', sec: '#10b981', glow: 'rgba(52, 211, 153, 0.6)' },
    { name: 'GLSL', accent: '#a78bfa', sec: '#818cf8', glow: 'rgba(167, 139, 250, 0.6)' },
    { name: 'TailwindCSS', accent: '#5dd9cf', sec: '#06b6d4', glow: 'rgba(93, 217, 207, 0.6)' },
    { name: 'Next.js', accent: '#F8F9FA', sec: '#89ceff', glow: 'rgba(248, 249, 250, 0.6)' },
    { name: 'PostgreSQL', accent: '#89ceff', sec: '#336791', glow: 'rgba(137, 206, 255, 0.6)' },
    { name: 'Docker', accent: '#38bdf8', sec: '#2563eb', glow: 'rgba(56, 189, 248, 0.6)' },
    { name: 'Git', accent: '#ff8f70', sec: '#ea580c', glow: 'rgba(255, 143, 112, 0.6)' },
    { name: 'Figma', accent: '#c084fc', sec: '#ec4899', glow: 'rgba(192, 132, 252, 0.6)' }
  ];

  let state = null;

  // --- Web Audio Collision Synthesis Engine ---
  let audioCtx = null;
  let lastGlobalSoundTime = 0;

  function initAudio() {
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass({ latencyHint: 'interactive' });
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
    } catch (e) {
      // Graceful fallback if Web Audio is restricted
    }
  }

  // Bind global unlock listeners
  if (typeof window !== 'undefined') {
    ['mousedown', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, initAudio, { once: true, passive: true });
    });
  }

  function playCollisionSound(impactVelocity, mass) {
    if (!audioCtx || audioCtx.state !== 'running') return;
    const now = performance.now();
    if (now - lastGlobalSoundTime < 45) return; // 45ms global throttle
    lastGlobalSoundTime = now;

    try {
      const t0 = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      const startFreq = Math.min(750 + impactVelocity * 40, 1300);
      const endFreq = 160 + Math.random() * 40;
      const vol = Math.min(Math.max((impactVelocity - 1.5) / 12, 0.03), 0.25);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, t0);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + 0.035);

      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(vol, t0 + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.045);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(t0);
      osc.stop(t0 + 0.05);
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch (e) {}
      };
    } catch (e) {}
  }

  // --- Geometry & Drawing Helpers ---
  function drawRoundRectPath(ctx, x, y, w, h, r) {
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r);
      ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h);
      ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
    }
  }

  // --- Out-of-Bounds Clamping ---
  function clampBodiesWithinBounds(badgeBodies, width, height) {
    const margin = 25;
    badgeBodies.forEach(body => {
      let px = body.position.x;
      let py = body.position.y;
      let clamped = false;

      if (px > width - margin) { px = width - margin; clamped = true; }
      if (px < margin) { px = margin; clamped = true; }
      if (py > height - margin) { py = height - margin; clamped = true; }
      if (py < margin) { py = margin; clamped = true; }

      if (clamped && typeof Matter !== 'undefined') {
        Matter.Body.setPosition(body, { x: px, y: py });
        Matter.Body.setVelocity(body, { x: body.velocity.x * 0.4, y: body.velocity.y * 0.4 });
      }
    });
  }

  // --- Public Initializer ---
  window.initSkillsPhysics = function() {
    const container = document.getElementById('skills-physics-container');
    const canvas = document.getElementById('skills-physics-canvas');
    if (!container || !canvas || typeof Matter === 'undefined') return;

    // Clean up previous instance if already active
    if (state) window.destroySkillsPhysics();

    const rect = container.getBoundingClientRect();
    const width = Math.max(rect.width || container.clientWidth || 800, 300);
    const height = Math.max(rect.height || container.clientHeight || 500, 300);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // 1. Matter.js World & Engine Setup
    const Engine = Matter.Engine,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Query = Matter.Query;

    const engine = Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 0.85, scale: 0.001 }
    });
    const world = engine.world;

    // 2. Static Boundary Walls
    const wallThick = 80;
    const walls = {
      floor: Bodies.rectangle(width / 2, height + wallThick / 2, width * 3, wallThick, { isStatic: true, restitution: 0.6, friction: 0.15 }),
      left: Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 3, { isStatic: true, restitution: 0.6, friction: 0.15 }),
      right: Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 3, { isStatic: true, restitution: 0.6, friction: 0.15 }),
      ceiling: Bodies.rectangle(width / 2, -wallThick / 2, width * 3, wallThick, { isStatic: true, restitution: 0.6, friction: 0.15 })
    };
    World.add(world, Object.values(walls));

    // 3. Create 13 Tech Skill Badges
    const badgeBodies = [];
    ctx.font = '600 13px "Space Mono", monospace, sans-serif';

    const cols = Math.max(3, Math.min(5, Math.floor(width / 140)));
    const colSpacing = width / (cols + 1);

    SKILL_BADGES.forEach((item, index) => {
      const textMetrics = ctx.measureText(item.name);
      const textWidth = textMetrics.width || (item.name.length * 8.5);
      const bWidth = Math.max(Math.ceil(textWidth + 52), 104);
      const bHeight = 42;
      const radius = bHeight / 2;

      // Staggered grid spawn in upper portion of arena
      const row = Math.floor(index / cols);
      const col = index % cols;
      const startX = colSpacing * (col + 1) + (Math.random() - 0.5) * 24;
      const startY = 36 + row * 54 + (Math.random() - 0.5) * 16;

      const body = Bodies.rectangle(startX, startY, bWidth, bHeight, {
        chamfer: { radius: radius - 1 },
        restitution: 0.70,
        friction: 0.14,
        frictionAir: 0.015,
        density: 0.0015,
        angle: (Math.random() - 0.5) * 0.35
      });

      // Initial kinetic nudge
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2.0,
        y: Math.random() * 1.5
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      body.customBadge = {
        name: item.name,
        width: bWidth,
        height: bHeight,
        radius: radius,
        accentColor: item.accent,
        secondaryColor: item.sec,
        glowColor: item.glow,
        lastSoundTime: 0
      };

      badgeBodies.push(body);
    });

    World.add(world, badgeBodies);

    // 4. MouseConstraint Setup (Strictly Preserving Native Page Scroll)
    const mouse = Mouse.create(canvas);
    mouse.pixelRatio = 1; // Matter coordinates match logical CSS units

    // CRITICAL: Explicitly detach mousewheel & scroll hijack listeners from Matter.js
    if (mouse.element) {
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
      mouse.element.removeEventListener('wheel', mouse.mousewheel);
    }
    canvas.removeEventListener('mousewheel', mouse.mousewheel);
    canvas.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    canvas.removeEventListener('wheel', mouse.mousewheel);
    mouse.mousewheel = function() {}; // Nullify internal handler

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.24,
        damping: 0.08,
        render: { visible: false }
      }
    });

    World.add(world, mouseConstraint);

    // 5. Collision Audio Hook with Spawn Mute & Debounce
    const spawnTime = performance.now();
    Matter.Events.on(engine, 'collisionStart', (event) => {
      if (performance.now() - spawnTime < 700) return; // Mute initial spawn drop
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const vx = pair.bodyA.velocity.x - pair.bodyB.velocity.x;
        const vy = pair.bodyA.velocity.y - pair.bodyB.velocity.y;
        const impact = Math.hypot(vx, vy);

        if (impact > 1.5) {
          const now = performance.now();
          const bA = pair.bodyA.customBadge;
          const bB = pair.bodyB.customBadge;

          if (bA && (now - bA.lastSoundTime > 120)) {
            bA.lastSoundTime = now;
            playCollisionSound(impact, pair.bodyA.mass);
            break;
          } else if (bB && (now - bB.lastSoundTime > 120)) {
            bB.lastSoundTime = now;
            playCollisionSound(impact, pair.bodyB.mass);
            break;
          }
        }
      }
    });

    // Lazy Audio Activation on interaction with container
    container.addEventListener('pointerdown', initAudio, { passive: true });

    // 6. State Definition
    state = {
      container,
      canvas,
      ctx,
      engine,
      world,
      walls,
      wallThick,
      badgeBodies,
      mouseConstraint,
      mouse,
      width,
      height,
      dpr,
      isRunning: true,
      lastTime: performance.now(),
      rafId: null,
      observer: null,
      resizeObserver: null,
      handleVisibility: null
    };

    // 7. Custom High-DPI Canvas 2D Render & RAF Loop
    function renderLoop(currentTime) {
      if (!state || !state.isRunning) return;
      state.rafId = requestAnimationFrame(renderLoop);

      // Clamp delta to 33.33ms (30fps equivalent min) to prevent tunnel glitch on tab resume
      const delta = Math.min(currentTime - state.lastTime, 33.33);
      state.lastTime = currentTime;

      // 1. Step Matter.js Physics Engine
      Engine.update(engine, delta);

      // 2. Clear Context
      ctx.clearRect(0, 0, state.width, state.height);

      // 3. Hover Detection
      const activeBody = mouseConstraint.body;
      const hoveredBodies = activeBody ? [activeBody] : Query.point(badgeBodies, mouse.position);
      const hoveredBody = hoveredBodies.length > 0 ? hoveredBodies[0] : null;

      // Update Cursor State
      if (activeBody) {
        canvas.style.cursor = 'grabbing';
      } else if (hoveredBody) {
        canvas.style.cursor = 'grab';
      } else {
        canvas.style.cursor = 'default';
      }

      // 4. Render Badge Pills
      for (let i = 0; i < badgeBodies.length; i++) {
        const body = badgeBodies[i];
        const badge = body.customBadge;
        const isGrabbed = (activeBody === body);
        const isHovered = (hoveredBody === body);

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        if (isGrabbed) {
          ctx.scale(1.04, 1.04);
        }

        const w = badge.width;
        const h = badge.height;
        const r = badge.radius;

        // Layer 1: Outer Neon Halo Glow
        ctx.shadowColor = badge.glowColor;
        ctx.shadowBlur = isGrabbed ? 22 : (isHovered ? 14 : 6);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = isGrabbed ? 3 : 1;

        // Layer 2: Frosted Dark Glass Core Fill
        ctx.beginPath();
        drawRoundRectPath(ctx, -w / 2, -h / 2, w, h, r);
        ctx.fillStyle = isGrabbed
          ? 'rgba(18, 30, 48, 0.95)'
          : (isHovered ? 'rgba(12, 22, 36, 0.90)' : 'rgba(8, 16, 26, 0.82)');
        ctx.fill();

        // Layer 3: Glowing Multi-Stop Neon Gradient Border
        const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
        grad.addColorStop(0, badge.accentColor);
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.28)');
        grad.addColorStop(1, badge.secondaryColor || badge.accentColor);

        ctx.strokeStyle = grad;
        ctx.lineWidth = isGrabbed ? 2.2 : (isHovered ? 1.8 : 1.4);
        ctx.stroke();

        // Reset shadow for crisp inner elements
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Layer 4: Glowing Radial Status Pip
        const pipX = -w / 2 + 17;
        const pipY = 0;

        ctx.beginPath();
        ctx.arc(pipX, pipY, 4, 0, Math.PI * 2);
        ctx.fillStyle = badge.accentColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pipX, pipY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Layer 5: Space Mono Typography
        ctx.font = '600 13px "Space Mono", monospace, sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = (isGrabbed || isHovered) ? '#ffffff' : '#d0e4ff';
        ctx.fillText(badge.name, -w / 2 + 29, 1);

        ctx.restore();
      }

      // 5. Active Grab Elastic Leash Line
      if (activeBody && mouseConstraint.constraint.pointA) {
        const pA = mouseConstraint.constraint.pointA;
        const pB = activeBody.position;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.strokeStyle = 'rgba(93, 217, 207, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }
    }

    state.rafId = requestAnimationFrame(renderLoop);

    // 8. Lifecycle Observers: Viewport Intersection, Tab Visibility & Resizing
    // A. IntersectionObserver: Pause when off-screen
    if (typeof IntersectionObserver !== 'undefined') {
      state.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!state) return;
          if (entry.isIntersecting) {
            if (!state.isRunning) {
              state.isRunning = true;
              state.lastTime = performance.now();
              state.rafId = requestAnimationFrame(renderLoop);
            }
          } else {
            state.isRunning = false;
            if (state.rafId) cancelAnimationFrame(state.rafId);
          }
        });
      }, { threshold: 0.05 });
      state.observer.observe(container);
    }

    // B. VisibilityChange: Pause in background tab
    state.handleVisibility = () => {
      if (!state) return;
      if (document.hidden) {
        state.isRunning = false;
        if (state.rafId) cancelAnimationFrame(state.rafId);
      } else {
        state.isRunning = true;
        state.lastTime = performance.now();
        state.rafId = requestAnimationFrame(renderLoop);
      }
    };
    document.addEventListener('visibilitychange', state.handleVisibility);

    // C. ResizeObserver: Dynamic boundary recalculation and DPR rescaling
    if (typeof ResizeObserver !== 'undefined') {
      let resizeTimer = null;
      state.resizeObserver = new ResizeObserver((entries) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (!state) return;
          const newRect = container.getBoundingClientRect();
          const nw = Math.max(newRect.width || container.clientWidth || 800, 300);
          const nh = Math.max(newRect.height || container.clientHeight || 500, 300);
          if (nw === state.width && nh === state.height) return;

          state.width = nw;
          state.height = nh;
          state.dpr = Math.min(window.devicePixelRatio || 1, 2);

          canvas.width = Math.round(nw * state.dpr);
          canvas.height = Math.round(nh * state.dpr);
          canvas.style.width = nw + 'px';
          canvas.style.height = nh + 'px';

          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(state.dpr, state.dpr);

          // Update Static Boundary Wall Positions & Vertices
          const wt = state.wallThick;
          Matter.Body.setPosition(walls.floor, { x: nw / 2, y: nh + wt / 2 });
          Matter.Body.setVertices(walls.floor, Bodies.rectangle(nw / 2, nh + wt / 2, nw * 3, wt).vertices);

          Matter.Body.setPosition(walls.left, { x: -wt / 2, y: nh / 2 });
          Matter.Body.setVertices(walls.left, Bodies.rectangle(-wt / 2, nh / 2, wt, nh * 3).vertices);

          Matter.Body.setPosition(walls.right, { x: nw + wt / 2, y: nh / 2 });
          Matter.Body.setVertices(walls.right, Bodies.rectangle(nw + wt / 2, nh / 2, wt, nh * 3).vertices);

          Matter.Body.setPosition(walls.ceiling, { x: nw / 2, y: -wt / 2 });
          Matter.Body.setVertices(walls.ceiling, Bodies.rectangle(nw / 2, -wt / 2, nw * 3, wt).vertices);

          // Clamp any badges that drifted outside
          clampBodiesWithinBounds(badgeBodies, nw, nh);
        }, 60);
      });
      state.resizeObserver.observe(container);
    }
  };

  // --- Public Destructor ---
  window.destroySkillsPhysics = function() {
    if (!state) return;
    state.isRunning = false;
    if (state.rafId) cancelAnimationFrame(state.rafId);
    if (state.observer) state.observer.disconnect();
    if (state.resizeObserver) state.resizeObserver.disconnect();
    if (state.handleVisibility) document.removeEventListener('visibilitychange', state.handleVisibility);

    if (typeof Matter !== 'undefined' && state.world && state.engine) {
      Matter.World.clear(state.world, false);
      Matter.Engine.clear(state.engine);
    }
    state = null;
  };

  // --- Auto-Initialize on DOMContentLoaded if Canvas Exists ---
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('skills-physics-canvas')) {
          window.initSkillsPhysics();
        }
      });
    } else {
      if (document.getElementById('skills-physics-canvas')) {
        window.initSkillsPhysics();
      }
    }
  }

})();
