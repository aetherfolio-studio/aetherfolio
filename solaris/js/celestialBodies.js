/* ============================================================
   ORBITA // ULTRA-DETAILED CELESTIAL BODIES ENGINE
   Physically-Based Multi-Pass Shaders, Normal Maps & Atmospheres
   ============================================================ */

class CelestialSystem {
  constructor(scene) {
    this.scene = scene;
    this.textureLoader = new THREE.TextureLoader();
    this.bodies = {};
    this.raycastTargets = [];
    this.sunShaderTime = 0;

    // Master celestial group
    this.systemGroup = new THREE.Group();
    this.scene.add(this.systemGroup);

    this.initBodies();
  }

  initBodies() {
    // ------------------------------------------------------------
    // 1. THE SUN (SOL) — Photosphere & Solar Coronal Glow
    // ------------------------------------------------------------
    const sunTex = this.textureLoader.load('assets/sun.jpg');
    sunTex.wrapS = THREE.RepeatWrapping;
    sunTex.wrapT = THREE.RepeatWrapping;

    const sunGeo = new THREE.SphereGeometry(ORBITA_TELEMETRY.sun.visualScale, 64, 64);
    
    // Photosphere Material
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xffffff
    });

    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.userData = { id: 'sun', data: ORBITA_TELEMETRY.sun };
    this.systemGroup.add(sunMesh);

    this.bodies['sun'] = {
      mesh: sunMesh,
      pivot: this.systemGroup,
      orbitRadius: 0,
      orbitSpeed: 0,
      rotationSpeed: 0.002,
      currentAngle: 0
    };
    this.raycastTargets.push(sunMesh);

    // Dynamic Coronal Plasma Glow Aura (Multi-layer Fresnel)
    const coronaGeo = new THREE.SphereGeometry(ORBITA_TELEMETRY.sun.visualScale * 1.25, 48, 48);
    const coronaMat = new THREE.ShaderMaterial({
      uniforms: {
        glowColor: { value: new THREE.Color(0xf59e0b) },
        innerColor: { value: new THREE.Color(0xfde68a) }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 glowColor;
        uniform vec3 innerColor;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.6);
          vec3 finalColor = mix(innerColor, glowColor, intensity * 0.8);
          gl_FragColor = vec4(finalColor, intensity * 0.75);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const sunCorona = new THREE.Mesh(coronaGeo, coronaMat);
    sunMesh.add(sunCorona);

    // ------------------------------------------------------------
    // 2. THE PLANETS
    // ------------------------------------------------------------
    const planetsList = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    planetsList.forEach(planetId => {
      const data = ORBITA_TELEMETRY[planetId];
      const planetPivot = new THREE.Group();
      this.systemGroup.add(planetPivot);

      const texPath = `assets/${planetId === 'earth' ? 'earth_day' : planetId}.jpg`;
      const tex = this.textureLoader.load(texPath);

      const geo = new THREE.SphereGeometry(data.visualScale, 64, 64);
      let mat;

      if (planetId === 'earth') {
        // High-Fidelity Earth with Normal Topography & Specular Ocean Mask
        const normalTex = this.textureLoader.load('assets/earth_normal.jpg');
        const specularTex = this.textureLoader.load('assets/earth_specular.jpg');

        mat = new THREE.MeshStandardMaterial({
          map: tex,
          normalMap: normalTex,
          normalScale: new THREE.Vector2(0.85, 0.85),
          roughnessMap: specularTex, // Inverted: oceans reflect sharply, land is rough
          roughness: 0.65,
          metalness: 0.08
        });
      } else if (planetId === 'moon' || planetId === 'mercury' || planetId === 'mars') {
        // Rocky / cratered bodies with surface bump mapping
        mat = new THREE.MeshStandardMaterial({
          map: tex,
          bumpMap: tex,
          bumpScale: planetId === 'mars' ? 0.06 : 0.04,
          roughness: 0.88,
          metalness: 0.02
        });
      } else {
        // Gas giants and Venus
        mat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.68,
          metalness: 0.02
        });
      }

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(data.orbitRadiusNorm, 0, 0);
      mesh.rotation.z = THREE.MathUtils.degToRad(data.axialTiltDeg || 0);
      mesh.userData = { id: planetId, data: data };
      planetPivot.add(mesh);

      // Perfectly straight diagonal parade ray matching reference artwork
      const lineAngle = Math.PI * 1.045;
      planetPivot.rotation.y = lineAngle;

      this.bodies[planetId] = {
        mesh: mesh,
        pivot: planetPivot,
        orbitRadius: data.orbitRadiusNorm,
        orbitSpeed: data.orbitSpeedNorm,
        rotationSpeed: 0.015,
        currentAngle: lineAngle
      };
      this.raycastTargets.push(mesh);

      // Dedicated enhancements
      if (planetId === 'earth') {
        this.setupEarthDetails(mesh);
      } else if (planetId === 'saturn') {
        this.setupSaturnRings(mesh, data.visualScale);
      } else if (planetId === 'venus') {
        this.setupAtmosphericHalo(mesh, 0xe2e8f0, 1.05, 0.25);
      } else if (planetId === 'mars') {
        this.setupAtmosphericHalo(mesh, 0xf97316, 1.04, 0.2);
      } else if (planetId === 'uranus') {
        this.setupAtmosphericHalo(mesh, 0x38bdf8, 1.06, 0.3);
      } else if (planetId === 'neptune') {
        this.setupAtmosphericHalo(mesh, 0x3b82f6, 1.06, 0.35);
      }
    });

    // Realistic Asteroid Belt between Mars (50.0) and Jupiter (43.0)
    const asteroidCount = 220;
    const asteroidGeo = new THREE.BufferGeometry();
    const asteroidPos = new Float32Array(asteroidCount * 3);
    for (let i = 0; i < asteroidCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 46.5 + (Math.random() - 0.5) * 3.0;
      asteroidPos[i * 3] = r * Math.cos(angle);
      asteroidPos[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      asteroidPos[i * 3 + 2] = r * Math.sin(angle);
    }
    asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
    const asteroidMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.16,
      transparent: true,
      opacity: 0.55
    });
    this.asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
    this.systemGroup.add(this.asteroidBelt);
  }

  setupEarthDetails(earthMesh) {
    // 1. Earth Cloud Layer (Multi-layered atmosphere with differential spin)
    const cloudsTex = this.textureLoader.load('assets/earth_clouds.png');
    const cloudsGeo = new THREE.SphereGeometry(1.025, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.85,
      blending: THREE.NormalBlending,
      roughness: 0.95
    });
    this.earthClouds = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthMesh.add(this.earthClouds);

    // 2. Rayleigh Atmospheric Blue Limb Scattering
    this.setupAtmosphericHalo(earthMesh, 0x38bdf8, 1.12, 0.45);

    // 3. Moon (Luna) with Crater Map & Bump Relief
    const moonData = ORBITA_TELEMETRY.moon;
    const moonPivot = new THREE.Group();
    earthMesh.add(moonPivot);

    const moonTex = this.textureLoader.load('assets/moon.jpg');
    const moonGeo = new THREE.SphereGeometry(moonData.visualScale, 48, 48);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      bumpMap: moonTex,
      bumpScale: 0.035,
      roughness: 0.92,
      metalness: 0.02
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(moonData.orbitRadiusNorm, 0.15, 0);
    moonMesh.userData = { id: 'moon', data: moonData };
    moonPivot.add(moonMesh);

    this.bodies['moon'] = {
      mesh: moonMesh,
      pivot: moonPivot,
      orbitRadius: moonData.orbitRadiusNorm,
      orbitSpeed: moonData.orbitSpeedNorm,
      rotationSpeed: 0.005,
      currentAngle: 0
    };
    this.raycastTargets.push(moonMesh);
  }

  setupAtmosphericHalo(targetMesh, colorHex, scaleFactor, maxOpacity) {
    const atmoGeo = new THREE.SphereGeometry(scaleFactor, 48, 48);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {
        haloColor: { value: new THREE.Color(colorHex) },
        opacityFactor: { value: maxOpacity }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 haloColor;
        uniform float opacityFactor;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(haloColor, intensity * opacityFactor);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const haloMesh = new THREE.Mesh(atmoGeo, atmoMat);
    targetMesh.add(haloMesh);
  }

  setupSaturnRings(saturnMesh, planetScale) {
    const ringsTex = this.textureLoader.load('assets/saturn_rings.png');
    const innerRadius = planetScale * 1.32;
    const outerRadius = planetScale * 2.75;
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 128);

    // Map radial UV coordinate across radius
    const pos = ringGeo.attributes.position;
    const uv = ringGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, u, 0.5);
    }
    ringGeo.attributes.uv.needsUpdate = true;

    const ringMat = new THREE.MeshStandardMaterial({
      map: ringsTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
      roughness: 0.7
    });

    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    saturnMesh.add(ringMesh);
  }

  update(deltaSeconds, timeWarpFactor) {
    // 1. Sun Photosphere rotation
    if (this.bodies['sun']) {
      this.bodies['sun'].mesh.rotation.y += 0.0015 * timeWarpFactor * deltaSeconds * 60;
    }

    // 2. Propagate planetary orbits and axial spins
    for (const [id, body] of Object.entries(this.bodies)) {
      if (id === 'sun') continue;

      // Axial self-rotation
      body.mesh.rotation.y += body.rotationSpeed * deltaSeconds * 60;

      // Earth Cloud Layer differential spin
      if (id === 'earth' && this.earthClouds) {
        this.earthClouds.rotation.y += 0.0035 * deltaSeconds * 60;
      }

      // Synchronized cinematic drift preserving the iconic Solaris parade alignment
      const baseAngularVelocity = 0.00012 * timeWarpFactor;
      body.currentAngle += baseAngularVelocity * deltaSeconds * 60;

      body.pivot.rotation.y = body.currentAngle;
    }
  }

  getWorldPosition(bodyId, targetVec3) {
    if (!this.bodies[bodyId]) return targetVec3.set(0, 0, 0);
    this.bodies[bodyId].mesh.updateMatrixWorld(true);
    return this.bodies[bodyId].mesh.getWorldPosition(targetVec3);
  }
}
