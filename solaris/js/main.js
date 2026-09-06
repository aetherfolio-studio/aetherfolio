/* ============================================================
   ORBITA // MAIN APPLICATION CONTROLLER
   3D Scrollytelling & Deep Space Telemetry Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // 1. Initialize Scene & Renderer
  const orbitaScene = new OrbitaScene(container);

  // 2. Initialize Celestial Bodies & Textures
  const celestialSystem = new CelestialSystem(orbitaScene.scene);

  // 3. Initialize Keplerian Orbital Elements
  const orbitalSystem = new OrbitalSystem(orbitaScene.scene);

  // 4. Initialize Time Warp Propagation Engine
  const timeWarpEngine = new TimeWarpEngine();

  // 5. Initialize Scroll Controller (Camera Choreography)
  const scrollController = new ScrollController(
    orbitaScene.camera,
    celestialSystem,
    orbitalSystem
  );

  // 6. Raycasting for Direct 3D Interaction
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let pointerDownPos = { x: 0, y: 0 };

  orbitaScene.canvas.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
  });

  orbitaScene.canvas.addEventListener('pointerup', (e) => {
    const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (dist > 6) return;

    const rect = orbitaScene.canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, orbitaScene.camera);
    const intersects = raycaster.intersectObjects(celestialSystem.raycastTargets, true);

    if (intersects.length > 0) {
      let targetObj = intersects[0].object;
      while (targetObj && (!targetObj.userData || !targetObj.userData.id)) {
        targetObj = targetObj.parent;
      }

      if (targetObj && targetObj.userData && targetObj.userData.id) {
        selectCelestialBody(targetObj.userData.id);
      }
    }
  });

  // 7. Initialize HUD Controller & Wire Callbacks
  const hud = new OrbitaHUD({
    onSelectPlanet: (id) => {
      selectCelestialBody(id);
    },
    onOverview: () => {
      resetToSystemOverview();
    },
    onTimeWarp: (speed) => {
      timeWarpEngine.setRate(speed);
    }
  });

  function selectCelestialBody(id) {
    scrollController.focusSandboxPlanet(id);
    hud.setPlanet(id);
  }

  function resetToSystemOverview() {
    scrollController.resetSandboxOverview();
    hud.setOverview();
  }

  // Live Nav Clock Elements
  const navUtcVal = document.getElementById('nav-utc-val');
  const navJdVal = document.getElementById('nav-jd-val');

  // 8. 60 FPS RequestAnimationFrame Telemetry Loop
  let isPaused = false;
  hud.callbacks.onTogglePause = (paused) => {
    isPaused = paused;
  };

  function animate() {
    requestAnimationFrame(animate);

    const deltaSeconds = Math.min(orbitaScene.clock.getDelta(), 0.1);

    // Update time warp and astronomical date
    let effectiveWarp = isPaused ? 0 : timeWarpEngine.update(deltaSeconds);

    // Propagate celestial orbits & axial rotations
    celestialSystem.update(deltaSeconds, effectiveWarp);

    // Update Scroll Camera Choreography
    scrollController.update(deltaSeconds);

    // Render WebGL frame
    orbitaScene.render();

    // Update Telemetry Drawer Live Clock
    const simDate = timeWarpEngine.getSimulatedDate();
    const jdDate = timeWarpEngine.getJulianDate();
    hud.updateLiveClock(simDate, jdDate);

    // Update Header Navigation Clock
    if (navUtcVal) {
      const hours = String(simDate.getUTCHours()).padStart(2, '0');
      const minutes = String(simDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(simDate.getUTCSeconds()).padStart(2, '0');
      navUtcVal.textContent = `${hours}:${minutes}:${seconds} UTC`;
    }
    if (navJdVal) {
      navJdVal.textContent = jdDate.toFixed(2);
    }
  }

  animate();
});
