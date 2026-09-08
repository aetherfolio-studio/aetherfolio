/* ============================================================
   SOLARIS // DEEP SPACE OBSERVATORY: MOONS & ASTEROIDS 3D ENGINE
   Isolated High-Detail Celestial Laboratory & Asteroid Belt
   ============================================================ */

class MoonsAsteroidsSystem {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.textureLoader = new THREE.TextureLoader();

    // Master group for this separate 3D environment
    this.group = new THREE.Group();
    this.group.visible = false;
    this.scene.add(this.group);

    this.bodies = {};
    this.raycastTargets = [];
    this.asteroidBeltMesh = null;
    this.dustParticles = null;
    this.orbitRings = [];

    // Internal animation time
    this.time = 0;

    // Callbacks
    this.onHoverBody = null;
    this.onSelectBody = null;
    this.onRedirectToSection = null;

    this.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (this.isMobile) {
      // Skip heavy procedural canvas generation and 1,500 particles on mobile
      return;
    }

    this.initEnvironment();
    this.initMoons();
    this.initAsteroids();
    this.initAsteroidBelt();
  }

  // ------------------------------------------------------------
  // 1. Procedural Texture Generators
  // ------------------------------------------------------------
  createCanvasTexture(width, height, drawFn) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    drawFn(ctx, width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  generateEuropaTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // Ice surface gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#dbeafe');
      grad.addColorStop(0.5, '#f0fdfa');
      grad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Procedural red-brown linear fractures ("lineae")
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(153, 27, 27, 0.45)';
      for (let i = 0; i < 75; i++) {
        ctx.beginPath();
        let x = Math.random() * w;
        let y = Math.random() * h;
        ctx.moveTo(x, y);
        const segments = 5 + Math.floor(Math.random() * 8);
        for (let s = 0; s < segments; s++) {
          x += (Math.random() - 0.5) * 120;
          y += (Math.random() - 0.5) * 60;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Faint blue subsurface chaos terrain
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 15 + Math.random() * 35, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  generateTitanTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // Dense hazy golden-orange atmosphere
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#78350f');
      grad.addColorStop(0.25, '#d97706');
      grad.addColorStop(0.5, '#f59e0b');
      grad.addColorStop(0.75, '#b45309');
      grad.addColorStop(1, '#78350f');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Atmospheric high-altitude organic haze bands
      ctx.fillStyle = 'rgba(120, 53, 15, 0.22)';
      for (let i = 0; i < 18; i++) {
        const y = (i / 18) * h + (Math.random() - 0.5) * 12;
        ctx.fillRect(0, y, w, 8 + Math.random() * 16);
      }
    });
  }

  generateEnceladusTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // High-albedo pure fresh water-ice
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      // Subtle ice crystalline blue marbling
      ctx.fillStyle = 'rgba(186, 230, 253, 0.35)';
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 10 + Math.random() * 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // South polar "Tiger Stripes" cryovolcanic rifts
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 3;
      const southPoleY = h * 0.85;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(w * 0.25 + i * (w * 0.12), southPoleY - 15);
        ctx.quadraticCurveTo(w * 0.3 + i * (w * 0.12), southPoleY + 10, w * 0.35 + i * (w * 0.12), southPoleY + 30);
        ctx.stroke();
      }
    });
  }

  generateIoTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // Vivid volcanic sulfur yellow-orange base
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#ca8a04');
      grad.addColorStop(0.5, '#eab308');
      grad.addColorStop(1, '#a16207');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Active volcanic calderas (Pele, Loki Patera)
      for (let i = 0; i < 90; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = 5 + Math.random() * 16;
        // Outer sulfur dioxide frost ring
        ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
        ctx.beginPath();
        ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2);
        ctx.fill();
        // Inner black silicate lava lake
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  generateGanymedeTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // Dark cratered terrain base
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 0, w, h);

      // Pale grooved silicate/ice bands (sulci)
      ctx.fillStyle = 'rgba(203, 213, 225, 0.65)';
      for (let i = 0; i < 35; i++) {
        ctx.beginPath();
        const startX = Math.random() * w;
        const startY = Math.random() * h;
        ctx.moveTo(startX, startY);
        ctx.bezierCurveTo(startX + 100, startY - 40, startX + 200, startY + 40, startX + 300, startY);
        ctx.lineTo(startX + 300, startY + 25);
        ctx.bezierCurveTo(startX + 200, startY + 65, startX + 100, startY - 15, startX, startY + 25);
        ctx.closePath();
        ctx.fill();
      }

      // Impact crater rays
      ctx.fillStyle = '#f8fafc';
      for (let i = 0; i < 45; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, 2 + Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  generateCeresTexture() {
    return this.createCanvasTexture(1024, 512, (ctx, w, h) => {
      // Dark carbonaceous gray surface
      ctx.fillStyle = '#334155';
      ctx.fillRect(0, 0, w, h);

      // Primordial impact craters
      for (let i = 0; i < 110; i++) {
        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const r = 3 + Math.random() * 14;
        ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Celebrated Occator Crater bright sodium-carbonate spot (Facula)
      const occX = w * 0.48;
      const occY = h * 0.44;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.beginPath();
      ctx.arc(occX, occY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.beginPath();
      ctx.arc(occX, occY, 18, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  generateVestaTexture() {
    return this.createCanvasTexture(512, 512, (ctx, w, h) => {
      // Basaltic rocky gray
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, 0, w, h);

      // Heavy gouges and Rheasilvia south polar crater basin
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.85, 90, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal equatorial trough grooves
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.5)';
      ctx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        const y = h * 0.35 + i * 14;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y + (Math.random() - 0.5) * 10);
        ctx.stroke();
      }
    });
  }

  // ------------------------------------------------------------
  // 2. Environment Lighting & Cosmic Dust
  // ------------------------------------------------------------
  initEnvironment() {
    // Ambient cosmic void light
    this.deepAmbientLight = new THREE.AmbientLight(0x312e81, 0.95); // deep indigo
    this.group.add(this.deepAmbientLight);

    // Directional deep star light
    this.deepStarLight = new THREE.DirectionalLight(0xe0e7ff, 1.7);
    this.deepStarLight.position.set(40, 50, 60);
    this.group.add(this.deepStarLight);

    // Subtle blue rim fill light
    this.deepRimLight = new THREE.DirectionalLight(0x38bdf8, 0.9);
    this.deepRimLight.position.set(-50, -20, -40);
    this.group.add(this.deepRimLight);

    // Cosmic dust particle swarm (1,200 floating stardust motes)
    const dustCount = 1200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 280;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 280;

      const isCyan = Math.random() > 0.45;
      dustColors[i * 3] = isCyan ? 0.22 : 0.85;
      dustColors[i * 3 + 1] = isCyan ? 0.74 : 0.85;
      dustColors[i * 3 + 2] = isCyan ? 0.97 : 0.95;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(dustGeo, dustMat);
    this.group.add(this.dustParticles);
  }

  // ------------------------------------------------------------
  // 3. Iconic Moons Initialization
  // ------------------------------------------------------------
  initMoons() {
    const moonsConfig = [
      {
        id: 'europa',
        name: 'Europa',
        type: 'moon',
        badge: 'JUPITER II // OCEAN WORLD',
        host: 'Jupiter',
        orbitRadius: 28,
        orbitSpeed: 0.007,
        radius: 2.3,
        getTexture: () => this.generateEuropaTexture(),
        desc: 'Hidden global saltwater ocean under an ice shell; prime astrobiology target.'
      },
      {
        id: 'titan',
        name: 'Titan',
        type: 'moon',
        badge: 'SATURN VI // HYDROCARBON LAKES',
        host: 'Saturn',
        orbitRadius: 42,
        orbitSpeed: 0.005,
        radius: 3.5,
        getTexture: () => this.generateTitanTexture(),
        hasAtmosphere: true,
        desc: 'Dense nitrogen atmosphere with clouds, rainfall, and vast polar liquid methane seas.'
      },
      {
        id: 'enceladus',
        name: 'Enceladus',
        type: 'moon',
        badge: 'SATURN II // CRYOVOLCANIC BEACON',
        host: 'Saturn',
        orbitRadius: 18,
        orbitSpeed: 0.011,
        radius: 1.5,
        getTexture: () => this.generateEnceladusTexture(),
        hasGeysers: true,
        desc: 'Brilliant reflective ice world erupting hydrothermal ocean plumes into space.'
      },
      {
        id: 'io',
        name: 'Io',
        type: 'moon',
        badge: 'JUPITER I // VOLCANIC HELLSCAPE',
        host: 'Jupiter',
        orbitRadius: 22,
        orbitSpeed: 0.009,
        radius: 2.4,
        getTexture: () => this.generateIoTexture(),
        desc: 'Over 400 active sulfur volcanoes driven by tidal gravitational friction.'
      },
      {
        id: 'ganymede',
        name: 'Ganymede',
        type: 'moon',
        badge: 'JUPITER III // SOLAR SYSTEM LARGEST',
        host: 'Jupiter',
        orbitRadius: 52,
        orbitSpeed: 0.004,
        radius: 3.8,
        getTexture: () => this.generateGanymedeTexture(),
        desc: 'Larger than Mercury; the only moon generating an intrinsic magnetic field.'
      },
      {
        id: 'luna',
        name: 'Luna (The Moon)',
        type: 'moon',
        badge: 'EARTH I // GRAVITATIONAL STABILIZER',
        host: 'Earth',
        orbitRadius: 34,
        orbitSpeed: 0.006,
        radius: 2.4,
        getTexture: () => this.textureLoader.load('assets/moon.jpg'),
        desc: 'Born from giant impact; stabilizes Earth axial tilt and drives oceanic tides.'
      }
    ];

    moonsConfig.forEach((cfg, idx) => {
      const pivot = new THREE.Group();
      pivot.rotation.y = (idx / moonsConfig.length) * Math.PI * 2;
      this.group.add(pivot);

      const geo = new THREE.SphereGeometry(cfg.radius, 48, 48);
      const tex = cfg.getTexture();
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.72,
        metalness: 0.08
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.orbitRadius, (Math.random() - 0.5) * 4, 0);
      mesh.userData = {
        id: cfg.id,
        name: cfg.name,
        type: 'moon',
        badge: cfg.badge,
        host: cfg.host,
        desc: cfg.desc,
        targetSection: 'moons'
      };
      pivot.add(mesh);

      // Atmospheric halo for Titan
      if (cfg.hasAtmosphere) {
        const atmoGeo = new THREE.SphereGeometry(cfg.radius * 1.18, 32, 32);
        const atmoMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.28,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending
        });
        mesh.add(new THREE.Mesh(atmoGeo, atmoMat));
      }

      // Orbital trace ring
      const ringGeo = new THREE.RingGeometry(cfg.orbitRadius - 0.08, cfg.orbitRadius + 0.08, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      this.group.add(ringMesh);
      this.orbitRings.push(ringMesh);

      this.bodies[cfg.id] = {
        mesh,
        pivot,
        config: cfg,
        angle: pivot.rotation.y,
        speed: cfg.orbitSpeed
      };

      this.raycastTargets.push(mesh);
    });
  }

  // ------------------------------------------------------------
  // 4. Asteroids & Minor Worlds Initialization
  // ------------------------------------------------------------
  initAsteroids() {
    const asteroidsConfig = [
      {
        id: 'ceres',
        name: 'Ceres',
        type: 'asteroid',
        badge: 'DWARF PLANET // 2.77 AU',
        location: 'Main Asteroid Belt',
        orbitRadius: 70,
        orbitSpeed: 0.003,
        radius: 3.2,
        getTexture: () => this.generateCeresTexture(),
        desc: 'Largest body in Asteroid Belt; water-rich ocean world with glowing Occator salt domes.'
      },
      {
        id: 'vesta',
        name: 'Vesta',
        type: 'asteroid',
        badge: 'PROTO-PLANET // MASSIVE IMPACT',
        location: 'Inner Asteroid Belt',
        orbitRadius: 64,
        orbitSpeed: 0.0034,
        radius: 2.2,
        getTexture: () => this.generateVestaTexture(),
        isIrregular: true,
        desc: 'Differentiated rocky proto-planet bearing the colossal Rheasilvia south polar crater.'
      }
    ];

    asteroidsConfig.forEach((cfg, idx) => {
      const pivot = new THREE.Group();
      pivot.rotation.y = Math.PI * 0.8 + idx * 0.7;
      this.group.add(pivot);

      let geo;
      if (cfg.isIrregular) {
        geo = new THREE.DodecahedronGeometry(cfg.radius, 2);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          const vz = pos.getZ(i);
          const deform = 1.0 + (Math.sin(vx * 3.0) + Math.cos(vy * 2.5)) * 0.12;
          pos.setXYZ(i, vx * deform, vy * deform * 0.88, vz * deform);
        }
        geo.computeVertexNormals();
      } else {
        geo = new THREE.SphereGeometry(cfg.radius, 40, 40);
      }

      const tex = cfg.getTexture();
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.85,
        metalness: 0.15
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cfg.orbitRadius, (Math.random() - 0.5) * 6, 0);
      mesh.userData = {
        id: cfg.id,
        name: cfg.name,
        type: 'asteroid',
        badge: cfg.badge,
        host: cfg.location,
        desc: cfg.desc,
        targetSection: 'asteroids'
      };
      pivot.add(mesh);

      // Orbit ring
      const ringGeo = new THREE.RingGeometry(cfg.orbitRadius - 0.08, cfg.orbitRadius + 0.08, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      this.group.add(ringMesh);
      this.orbitRings.push(ringMesh);

      this.bodies[cfg.id] = {
        mesh,
        pivot,
        config: cfg,
        angle: pivot.rotation.y,
        speed: cfg.orbitSpeed
      };

      this.raycastTargets.push(mesh);
    });
  }

  // ------------------------------------------------------------
  // 5. Instanced Main Asteroid Belt Swarm
  // ------------------------------------------------------------
  initAsteroidBelt() {
    const asteroidCount = 450;
    const baseGeo = new THREE.DodecahedronGeometry(0.7, 1);
    const beltMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.9,
      metalness: 0.2
    });

    this.asteroidBeltMesh = new THREE.InstancedMesh(baseGeo, beltMat, asteroidCount);
    this.asteroidBeltMesh.userData = {
      id: 'belt',
      name: 'Main Asteroid Belt',
      type: 'asteroid',
      badge: 'MARS-JUPITER GAP // DEBRIS SWARM',
      desc: 'Millions of rocky fragments preserved from the primordial solar nebula.',
      targetSection: 'asteroids'
    };

    const dummy = new THREE.Object3D();
    const innerR = 60;
    const outerR = 84;

    for (let i = 0; i < asteroidCount; i++) {
      const r = innerR + Math.random() * (outerR - innerR);
      const theta = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 14;

      dummy.position.set(
        Math.cos(theta) * r,
        height,
        Math.sin(theta) * r
      );

      const scale = 0.4 + Math.random() * 1.4;
      dummy.scale.set(scale, scale * (0.6 + Math.random() * 0.8), scale * (0.7 + Math.random() * 0.6));
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      dummy.updateMatrix();
      this.asteroidBeltMesh.setMatrixAt(i, dummy.matrix);
    }

    this.asteroidBeltMesh.instanceMatrix.needsUpdate = true;
    this.group.add(this.asteroidBeltMesh);
    this.raycastTargets.push(this.asteroidBeltMesh);
  }

  // ------------------------------------------------------------
  // 6. Visibility & Animation
  // ------------------------------------------------------------
  show() {
    this.group.visible = true;
  }

  hide() {
    this.group.visible = false;
  }

  update(deltaSeconds) {
    if (!this.group.visible) return;

    this.time += deltaSeconds;

    // 1. Orbit moons and asteroids
    for (const [id, b] of Object.entries(this.bodies)) {
      b.angle += b.speed * deltaSeconds * 60;
      b.pivot.rotation.y = b.angle;
      b.mesh.rotation.y += 0.01 * deltaSeconds * 60;
    }

    // 2. Swirl the entire asteroid belt
    if (this.asteroidBeltMesh) {
      this.asteroidBeltMesh.rotation.y += 0.0006 * deltaSeconds * 60;
    }

    // 3. Gently drift stardust particles
    if (this.dustParticles) {
      this.dustParticles.rotation.y += 0.0002 * deltaSeconds * 60;
    }
  }

  getWorldPosition(bodyId, targetVec3) {
    if (this.bodies[bodyId]) {
      this.bodies[bodyId].mesh.updateMatrixWorld(true);
      return this.bodies[bodyId].mesh.getWorldPosition(targetVec3);
    }
    return targetVec3.set(0, 0, 0);
  }
}
