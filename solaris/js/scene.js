/* ============================================================
   ORBITA // SCENE & RENDER ENGINE
   Physically-Inspired Three.js Environment (<2% Idle GPU)
   ============================================================ */

class OrbitaScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    // Camera setup (Perspective with balanced depth)
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 1000);
    this.camera.position.set(0, 38, 55);
    this.camera.lookAt(0, 0, 0);

    // Renderer setup
    this.canvas = document.getElementById('webgl-canvas');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });

    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.isMobile = isMobile;

    this.renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = false; // Zero shadow performance overhead

    // Lighting (Physically inspired)
    this.setupLighting();

    // Starfield optimized for mobile/desktop
    this.setupStarfield();

    // Handle viewport resize
    window.addEventListener('resize', () => this.onResize(), { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.onResize(), 200);
    }, { passive: true });
  }

  setupLighting() {
    // Balanced deep-space ambient light for texture richness
    this.ambientLight = new THREE.AmbientLight(0x475569, 0.95);
    this.scene.add(this.ambientLight);

    // Front-left fill light ensuring crisp planetary surface illumination
    this.fillLight = new THREE.DirectionalLight(0xfff8ed, 1.35);
    this.fillLight.position.set(-20, 25, 40);
    this.scene.add(this.fillLight);

    // Primary central sunlight from the Sun
    this.sunLight = new THREE.PointLight(0xfff6e5, 4.2, 800, 0.4);
    this.sunLight.position.set(0, 0, 0);
    this.scene.add(this.sunLight);
  }

  setupStarfield() {
    // 1,800 distant pinpoint stars on desktop, 450 on mobile for high framerates
    const starCount = this.isMobile ? 450 : 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const baseColors = [
      new THREE.Color(0xf8fafc), // pure white
      new THREE.Color(0x94a3b8), // starlight slate
      new THREE.Color(0x38bdf8), // cyan tint
      new THREE.Color(0xf59e0b)  // amber tint
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 250 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const col = baseColors[Math.floor(Math.random() * baseColors.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: this.isMobile ? 1.0 : 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true
    });

    this.starfield = new THREE.Points(starGeo, starMat);
    this.scene.add(this.starfield);
  }

  onResize() {
    if (!this.container) return;
    this.isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.renderer.setPixelRatio(this.isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5));
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
