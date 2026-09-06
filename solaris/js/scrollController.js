/* ============================================================
   ORBITA // SCROLL CONTROLLER & 3D CAMERA CHOREOGRAPHY
   Precise Element Viewport Visibility Tracking
   ============================================================ */

class ScrollController {
  constructor(camera, celestialSystem, orbitalSystem) {
    this.camera = camera;
    this.celestialSystem = celestialSystem;
    this.orbitalSystem = orbitalSystem;

    this.progressBar = document.getElementById('scroll-progress');
    this.canvasContainer = document.getElementById('canvas-container');

    // Cached elements
    this.heroEl = document.getElementById('hero');
    this.archEl = document.getElementById('architecture');
    this.sunCard = document.getElementById('story-sun');
    this.earthCard = document.getElementById('story-earth');
    this.saturnCard = document.getElementById('story-saturn');
    this.sandboxEl = document.getElementById('sandbox');
    this.matrixEl = document.getElementById('matrix');

    // Camera current and target state
    this.camPos = new THREE.Vector3(0, 42, 60);
    this.camLookAt = new THREE.Vector3(0, 0, 0);

    this.targetPos = new THREE.Vector3(0, 42, 60);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    // Sandbox interactive state
    this.isSandboxActive = false;
    this.userSelectedBody = null;
  }

  isElementActive(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Element is active if its center is within the middle 60% of the screen
    const elementCenter = rect.top + rect.height / 2;
    return elementCenter >= vh * 0.15 && elementCenter <= vh * 0.85;
  }

  update(deltaSeconds) {
    // Update progress bar
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
    if (this.progressBar) {
      this.progressBar.style.width = `${(p * 100).toFixed(1)}%`;
    }

    const tempVec = new THREE.Vector3();

    // Check if in Sandbox section
    const inSandbox = this.sandboxEl && (this.sandboxEl.getBoundingClientRect().top < window.innerHeight * 0.8 && this.sandboxEl.getBoundingClientRect().bottom > window.innerHeight * 0.2);
    if (inSandbox !== this.isSandboxActive) {
      this.isSandboxActive = inSandbox;
      if (this.canvasContainer) {
        if (inSandbox) {
          this.canvasContainer.classList.add('interactive');
        } else {
          this.canvasContainer.classList.remove('interactive');
        }
      }
    }

    // Determine current active section for camera choreography
    if (inSandbox) {
      if (!this.userSelectedBody) {
        this.targetPos.set(0, 42, 54);
        this.targetLookAt.set(0, -3.2, 0);
      }
    } else if (this.isElementActive(this.saturnCard)) {
      // Focus on Saturn & its majestic rings
      this.celestialSystem.getWorldPosition('saturn', tempVec);
      this.targetLookAt.copy(tempVec);
      this.targetPos.set(
        tempVec.x + 8.5,
        tempVec.y + 4.2,
        tempVec.z + 9.5
      );
      this.orbitalSystem.highlightOrbit('saturn');
    } else if (this.isElementActive(this.earthCard)) {
      // Focus on Earth & Moon
      this.celestialSystem.getWorldPosition('earth', tempVec);
      this.targetLookAt.copy(tempVec);
      this.targetPos.set(
        tempVec.x + 3.6,
        tempVec.y + 1.8,
        tempVec.z + 4.2
      );
      this.orbitalSystem.highlightOrbit('earth');
    } else if (this.isElementActive(this.sunCard)) {
      // Focus on Sun
      this.targetLookAt.set(0, 0, 0);
      this.targetPos.set(5.5, 3.2, 7.8);
      this.orbitalSystem.highlightOrbit(null);
    } else if (this.isElementActive(this.archEl)) {
      // Tilted orbital plane view
      this.targetLookAt.set(0, 0, 0);
      this.targetPos.set(28, 18, 42);
      this.orbitalSystem.highlightOrbit('earth');
    } else if (this.matrixEl && this.matrixEl.getBoundingClientRect().top < window.innerHeight * 0.7) {
      // High-altitude panoramic view over matrix
      this.targetLookAt.set(0, 0, 0);
      this.targetPos.set(0, 68, 85);
      this.orbitalSystem.highlightOrbit(null);
    } else {
      // Hero overview
      this.targetLookAt.set(0, 0, 0);
      this.targetPos.set(0, 42, 60);
      this.orbitalSystem.highlightOrbit(null);
    }

    // Smooth lerp camera movement
    this.camPos.lerp(this.targetPos, 0.06);
    this.camLookAt.lerp(this.targetLookAt, 0.06);

    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camLookAt);
  }

  focusSandboxPlanet(bodyId) {
    this.userSelectedBody = bodyId;
    const tempVec = new THREE.Vector3();
    this.celestialSystem.getWorldPosition(bodyId, tempVec);
    this.targetLookAt.copy(tempVec);

    const scale = ORBITA_TELEMETRY[bodyId]?.visualScale || 1.0;
    const dist = Math.max(scale * 3.5, 3.5);
    this.targetPos.set(
      tempVec.x + dist * 0.8,
      tempVec.y + dist * 0.45,
      tempVec.z + dist * 0.95
    );
    this.orbitalSystem.highlightOrbit(bodyId === 'sun' ? null : bodyId);
  }

  resetSandboxOverview() {
    this.userSelectedBody = null;
    this.targetPos.set(0, 42, 54);
    this.targetLookAt.set(0, -3.2, 0);
    this.orbitalSystem.highlightOrbit(null);
  }
}
