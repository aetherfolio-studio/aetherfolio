/* ============================================================
   ORBITA // CINEMATIC CAMERA & NAVIGATION CONTROLLER
   Smooth Bezier / Dampened Transitions with Dynamic Orbital Tracking
   ============================================================ */

class CameraController {
  constructor(camera, domElement, celestialSystem) {
    this.camera = camera;
    this.domElement = domElement;
    this.celestialSystem = celestialSystem;

    // Overview default posture
    this.overviewPos = new THREE.Vector3(0, 42, 60);
    this.overviewLookAt = new THREE.Vector3(0, 0, 0);

    // Current dynamic target
    this.targetPos = this.overviewPos.clone();
    this.currentLookAt = this.overviewLookAt.clone();
    this.targetLookAt = this.overviewLookAt.clone();

    // Focus state
    this.focusedBodyId = null;
    this.isTransitioning = false;
    this.transitionProgress = 1.0;
    this.transitionDuration = 2.2; // seconds
    this.startPos = this.camera.position.clone();
    this.startLookAt = this.overviewLookAt.clone();

    // Free Orbit Controls (Manual dragging)
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.spherical = new THREE.Spherical().setFromVector3(this.camera.position);

    this.setupInteractions();
  }

  setupInteractions() {
    this.domElement.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      if (!this.focusedBodyId) {
        // Overview manual orbital drag
        this.spherical.setFromVector3(this.camera.position);
        this.spherical.theta -= deltaX * 0.005;
        this.spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, this.spherical.phi - deltaY * 0.005));
        this.camera.position.setFromSpherical(this.spherical);
        this.camera.lookAt(this.currentLookAt);
      }

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Mouse wheel zoom
    this.domElement.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.04;
      if (!this.focusedBodyId) {
        this.camera.position.multiplyScalar(1 + zoomFactor * 0.02);
        this.camera.position.clampLength(15, 120);
        this.camera.lookAt(this.currentLookAt);
      }
    }, { passive: false });
  }

  focusOn(bodyId) {
    if (this.focusedBodyId === bodyId && !this.isTransitioning) return;

    this.focusedBodyId = bodyId;
    this.isTransitioning = true;
    this.transitionProgress = 0.0;
    this.startPos.copy(this.camera.position);
    this.startLookAt.copy(this.currentLookAt);
  }

  returnToOverview() {
    this.focusedBodyId = null;
    this.isTransitioning = true;
    this.transitionProgress = 0.0;
    this.startPos.copy(this.camera.position);
    this.startLookAt.copy(this.currentLookAt);
    this.targetPos.copy(this.overviewPos);
    this.targetLookAt.copy(this.overviewLookAt);
  }

  update(deltaSeconds) {
    const tempPos = new THREE.Vector3();

    if (this.focusedBodyId) {
      // Get real-time position of the orbiting body
      this.celestialSystem.getWorldPosition(this.focusedBodyId, tempPos);
      this.targetLookAt.copy(tempPos);

      // Distance offset scaled to body radius
      const data = ORBITA_TELEMETRY[this.focusedBodyId];
      const scale = data.visualScale || 1.0;
      const offsetDist = Math.max(scale * 3.5, 3.2);

      // Camera stands back at an angle to view the planet and its rings/lighting
      this.targetPos.set(
        tempPos.x + offsetDist * 0.8,
        tempPos.y + offsetDist * 0.45,
        tempPos.z + offsetDist * 0.95
      );
    }

    if (this.isTransitioning) {
      this.transitionProgress += deltaSeconds / this.transitionDuration;
      if (this.transitionProgress >= 1.0) {
        this.transitionProgress = 1.0;
        this.isTransitioning = false;
      }

      // Smooth Quintic Ease-Out curve for cinematic deceleration
      const t = this.transitionProgress;
      const ease = 1 - Math.pow(1 - t, 5);

      this.camera.position.lerpVectors(this.startPos, this.targetPos, ease);
      this.currentLookAt.lerpVectors(this.startLookAt, this.targetLookAt, ease);
      this.camera.lookAt(this.currentLookAt);
    } else if (this.focusedBodyId) {
      // Dynamic locked tracking as planet advances along orbit
      this.camera.position.lerp(this.targetPos, 0.08);
      this.currentLookAt.lerp(this.targetLookAt, 0.08);
      this.camera.lookAt(this.currentLookAt);
    }
  }
}
