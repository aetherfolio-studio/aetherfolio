/* ============================================================
   SOLARIS // APPLICATION CONTROLLER
   Cinematic Composition & Interactive Planetary Exploration
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // 1. Initialize Scene & Renderer
  const orbitaScene = new OrbitaScene(container);

  // 2. Initialize Celestial Bodies, Orbits, & Time Warp Engine
  const celestialSystem = new CelestialSystem(orbitaScene.scene);
  const orbitalSystem = new OrbitalSystem(orbitaScene.scene);
  const timeWarpEngine = new TimeWarpEngine();

  // 3. Initialize Dedicated Moons & Asteroids 3D System (Separate Environment)
  const moonsAsteroidsSystem = new MoonsAsteroidsSystem(orbitaScene.scene, orbitaScene.camera, orbitaScene.renderer);

  // Position celestial system so Sun sits on the right edge, matching reference image
  const sunAnchor = new THREE.Vector3(88, 5, -10);
  celestialSystem.systemGroup.position.copy(sunAnchor);
  celestialSystem.systemGroup.rotation.x = 0.28;
  celestialSystem.systemGroup.rotation.z = -0.16;

  orbitalSystem.group.position.copy(sunAnchor);
  orbitalSystem.group.rotation.x = 0.28;
  orbitalSystem.group.rotation.z = -0.16;

  orbitaScene.sunLight.position.copy(sunAnchor);

  // Dynamic Camera Animation Vectors
  const defaultCamPos = new THREE.Vector3(2, 28, 66);
  const defaultLookAt = new THREE.Vector3(18, 5, -5);

  orbitaScene.camera.position.copy(defaultCamPos);
  orbitaScene.camera.lookAt(defaultLookAt);

  let targetCamPos = defaultCamPos.clone();
  let targetCamLookAt = defaultLookAt.clone();
  let currentLookAt = defaultLookAt.clone();
  let focusedBodyId = null;
  let isFocusCamera = false;

  // 4. Telemetry Drawer Controller
  const hud = new OrbitaHUD({
    onSelectPlanet: (id) => focusPlanet(id, true),
    onOverview: () => resetOverview(),
    onClose: () => {
      if (isCinematicTour) exitCinematicTour();
      focusedBodyId = null;
      isFocusCamera = false;
      planetCards.forEach(c => {
        if (c.getAttribute('data-target') === 'earth') {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
      orbitalSystem.highlightOrbit(null);
      targetCamPos.copy(defaultCamPos);
      targetCamLookAt.copy(defaultLookAt);
    }
  });

  // 5. Planet Card Clicks
  const planetCards = document.querySelectorAll('.planet-card-item');

  function focusPlanet(planetId, shouldFlyCamera = true) {
    focusedBodyId = planetId;
    isFocusCamera = shouldFlyCamera;

    planetCards.forEach(c => {
      if (c.getAttribute('data-target') === planetId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    orbitalSystem.highlightOrbit(planetId);
    hud.setPlanet(planetId);
  }

  function resetOverview() {
    if (isCinematicTour) {
      isCinematicTour = false;
      isTourPaused = false;
      if (tourTimer) clearTimeout(tourTimer);
      if (tourHudBar) tourHudBar.classList.remove('active');
      if (btnWatchVideo) {
        btnWatchVideo.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>Watch Video</span>
        `;
      }
    }
    focusedBodyId = null;
    isFocusCamera = false;
    planetCards.forEach(c => {
      if (c.getAttribute('data-target') === 'earth') {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    orbitalSystem.highlightOrbit(null);
    targetCamPos.copy(defaultCamPos);
    targetCamLookAt.copy(defaultLookAt);
    if (hud.drawer && hud.drawer.classList.contains('open')) {
      hud.closeDrawer();
    }
  }

  planetCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      if (target) {
        if (isCinematicTour) {
          const idx = tourPlanets.indexOf(target);
          if (idx !== -1) tourIndex = idx;
          if (tourCurrentLabel) tourCurrentLabel.textContent = `${target.toUpperCase()} (${tourIndex + 1}/${tourPlanets.length})`;
        }
        focusPlanet(target, true);
      }
    });
  });

  // 6. TOP NAVBAR NAVIGATION & SCROLL-SPY CONTROLLER
  const navLinks = document.querySelectorAll('#primary-nav-menu .nav-item');
  const sectionEntries = [
    { id: 'hero', el: document.getElementById('hero') },
    { id: 'planets', el: document.getElementById('planets') },
    { id: 'moons', el: document.getElementById('moons') },
    { id: 'asteroids', el: document.getElementById('asteroids') },
    { id: 'learn', el: document.getElementById('learn') },
    { id: 'about', el: document.getElementById('about') }
  ].filter(s => s.el !== null);

  let isNavClickScrolling = false;
  let navScrollTimeout = null;

  function setActiveNav(targetId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function scrollToSection(targetId) {
    if (isFullSolarSystemMode) exitFullSolarSystem();
    if (isDeepSpaceMode) exitDeepSpaceMode();

    setActiveNav(targetId);
    isNavClickScrolling = true;
    clearTimeout(navScrollTimeout);

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navHeight = 76;
        const rect = targetEl.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const scrollTarget = Math.max(0, absoluteTop - navHeight - 12);

        window.scrollTo({
          top: scrollTarget,
          behavior: 'smooth'
        });
      }
    }

    navScrollTimeout = setTimeout(() => {
      isNavClickScrolling = false;
      updateActiveNavOnScroll();
    }, 850);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId) {
        scrollToSection(targetId);
      }
    });
  });

  // Brand lockup click returns to top
  const brandLogo = document.querySelector('.brand-lockup');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection('hero');
    });
  }

  // ScrollSpy Listener: robust viewport detection
  function updateActiveNavOnScroll() {
    if (isFullSolarSystemMode || isDeepSpaceMode || isNavClickScrolling) return;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // 1. If at or near top of the page, activate hero
    if (scrollY < 120) {
      setActiveNav('hero');
      return;
    }

    // 2. If at or near bottom of the page, activate about
    if (viewportHeight + scrollY >= docHeight - 80) {
      setActiveNav('about');
      return;
    }

    // 3. Middle sections: find the section closest to/under the fixed navbar
    const navOffset = 110;
    let bestSection = 'hero';

    for (let i = 0; i < sectionEntries.length; i++) {
      const s = sectionEntries[i];
      const rect = s.el.getBoundingClientRect();
      if (rect.top <= navOffset) {
        bestSection = s.id;
      }
    }

    setActiveNav(bestSection);
  }

  window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

  // 7. PLANET FILTER PILLS
  const filterPills = document.querySelectorAll('#planets-filter-group .filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      planetCards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 8. CINEMATIC 3D GUIDED TOUR & VIDEO CONTROLLER ("Watch Video")
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const videoBackdrop = document.getElementById('video-backdrop');
  const btnCloseVideo = document.getElementById('btn-close-video');
  const btnWatchVideo = document.getElementById('btn-watch-video');
  const btnVideoAmbient = document.getElementById('btn-video-ambient');

  const tourHudBar = document.getElementById('tour-hud-bar');
  const btnTourToggle = document.getElementById('btn-tour-toggle');
  const btnTourPrev = document.getElementById('btn-tour-prev');
  const btnTourNext = document.getElementById('btn-tour-next');
  const btnTourExit = document.getElementById('btn-tour-exit');
  const tourCurrentLabel = document.getElementById('tour-current-label');

  let isCinematicTour = false;
  let isTourPaused = false;
  let tourIndex = 0;
  let tourTimer = null;
  const tourPlanets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  function startCinematicTour(startIndex = 0) {
    if (isFullSolarSystemMode) exitFullSolarSystem();
    if (isDeepSpaceMode) exitDeepSpaceMode();

    isCinematicTour = true;
    isTourPaused = false;
    tourIndex = startIndex % tourPlanets.length;
    document.body.classList.add('tour-view-active');

    // Smoothly scroll to top so the 3D scene is in full view
    if (window.scrollY > 40) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (tourHudBar) tourHudBar.classList.add('active');
    if (btnTourToggle) btnTourToggle.innerHTML = '&#10074;&#10074; Pause';
    if (btnWatchVideo) btnWatchVideo.innerHTML = '<span style="color: #38BDF8;">&#10074;&#10074; Tour Active</span>';

    tourStep();
  }

  function tourStep() {
    if (!isCinematicTour || isTourPaused) return;

    const planetId = tourPlanets[tourIndex];
    if (tourCurrentLabel) {
      tourCurrentLabel.textContent = `${planetId.toUpperCase()} (${tourIndex + 1}/${tourPlanets.length})`;
    }

    focusPlanet(planetId, true);

    if (tourTimer) clearTimeout(tourTimer);
    tourTimer = setTimeout(() => {
      if (isCinematicTour && !isTourPaused) {
        tourIndex = (tourIndex + 1) % tourPlanets.length;
        tourStep();
      }
    }, 6500);
  }

  function pauseCinematicTour() {
    isTourPaused = true;
    if (tourTimer) clearTimeout(tourTimer);
    if (btnTourToggle) btnTourToggle.innerHTML = '&#9654; Resume';
    if (btnWatchVideo) btnWatchVideo.innerHTML = '<span style="color: #38BDF8;">&#9654; Resume Tour</span>';
  }

  function resumeCinematicTour() {
    isTourPaused = false;
    if (btnTourToggle) btnTourToggle.innerHTML = '&#10074;&#10074; Pause';
    if (btnWatchVideo) btnWatchVideo.innerHTML = '<span style="color: #38BDF8;">&#10074;&#10074; Tour Active</span>';
    tourStep();
  }

  function toggleCinematicTour() {
    if (isTourPaused) {
      resumeCinematicTour();
    } else {
      pauseCinematicTour();
    }
  }

  function nextTourPlanet() {
    if (tourTimer) clearTimeout(tourTimer);
    tourIndex = (tourIndex + 1) % tourPlanets.length;
    tourStep();
  }

  function prevTourPlanet() {
    if (tourTimer) clearTimeout(tourTimer);
    tourIndex = (tourIndex - 1 + tourPlanets.length) % tourPlanets.length;
    tourStep();
  }

  function exitCinematicTour() {
    isCinematicTour = false;
    isTourPaused = false;
    document.body.classList.remove('tour-view-active');
    if (tourTimer) clearTimeout(tourTimer);
    if (tourHudBar) tourHudBar.classList.remove('active');
    if (btnWatchVideo) {
      btnWatchVideo.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Watch Video</span>
      `;
    }
    resetOverview();
  }

  if (btnWatchVideo) {
    btnWatchVideo.addEventListener('click', () => {
      if (!isCinematicTour) {
        startCinematicTour(0);
      } else {
        toggleCinematicTour();
      }
    });
  }

  if (btnTourToggle) btnTourToggle.addEventListener('click', toggleCinematicTour);
  if (btnTourPrev) btnTourPrev.addEventListener('click', prevTourPlanet);
  if (btnTourNext) btnTourNext.addEventListener('click', nextTourPlanet);
  if (btnTourExit) btnTourExit.addEventListener('click', exitCinematicTour);

  const nasaVideoUrl = 'https://www.youtube-nocookie.com/embed/libKVRa01L8?autoplay=1&rel=0&modestbranding=1';

  function openVideoModal() {
    if (!videoModal) return;
    if (isFullSolarSystemMode) exitFullSolarSystem();
    if (isDeepSpaceMode) exitDeepSpaceMode();
    if (videoIframe) videoIframe.src = nasaVideoUrl;
    videoModal.classList.add('open');
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    if (videoIframe) videoIframe.src = '';
    if (audioCtx && isAmbientPlaying) toggleAmbientAudio();
  }

  if (btnCloseVideo) btnCloseVideo.addEventListener('click', closeVideoModal);
  if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);

  // Synthesized cosmic ambient space sound
  let audioCtx = null;
  let isAmbientPlaying = false;
  let ambientNodes = [];

  function toggleAmbientAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (isAmbientPlaying) {
      ambientNodes.forEach(n => { try { n.stop(); } catch(e){} });
      ambientNodes = [];
      isAmbientPlaying = false;
      if (btnVideoAmbient) btnVideoAmbient.innerHTML = '&#127925; Ambient Space Sound';
    } else {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const filter = audioCtx.createBiquadFilter();
      const gain = audioCtx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(55.35, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      ambientNodes = [osc1, osc2];
      isAmbientPlaying = true;
      if (btnVideoAmbient) btnVideoAmbient.innerHTML = '&#9208; Ambient Audio: ON';
    }
  }

  if (btnVideoAmbient) {
    btnVideoAmbient.addEventListener('click', toggleAmbientAudio);
  }

  // 9. SEARCH BAR NAVIGATION
  const searchInput = document.getElementById('planet-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        const validPlanets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const matchedPlanet = validPlanets.find(p => p.startsWith(query));

        if (matchedPlanet) {
          const card = document.querySelector(`.planet-card-item[data-target="${matchedPlanet}"]`);
          if (card) {
            scrollToSection('planets');
            focusPlanet(matchedPlanet);
          }
          searchInput.blur();
          return;
        }

        const validMoons = ['europa', 'titan', 'enceladus', 'ganymede', 'io', 'luna', 'callisto', 'triton'];
        const matchedMoon = validMoons.find(m => m.startsWith(query));
        if (matchedMoon) {
          scrollToSection('moons');
          searchInput.blur();
          return;
        }

        if (query.includes('asteroid') || query.includes('ceres') || query.includes('comet') || query.includes('oort')) {
          scrollToSection('asteroids');
          searchInput.blur();
          return;
        }

        if (query.includes('learn') || query.includes('story') || query.includes('cloud')) {
          scrollToSection('learn');
          searchInput.blur();
          return;
        }
      }
    });
  }

  // ============================================================
  // 10. FULL SOLAR SYSTEM 3D INTERACTIVE MODE
  // ============================================================
  let isFullSolarSystemMode = false;
  let orbitTarget = new THREE.Vector3(24, 0, -6);
  let orbitRadius = 78.0;
  let targetOrbitRadius = 78.0;
  let orbitTheta = 0.08;
  let orbitPhi = 1.22;
  let targetOrbitTheta = 0.08;
  let targetOrbitPhi = 1.22;
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;
  let focusedSolarPlanet = null;

  const btnFullSolar = document.getElementById('btn-full-solar-system');
  const btnExploreSystem = document.getElementById('btn-explore-system');
  const cardExploreTrigger = document.getElementById('card-explore-trigger');
  const btnViewAll = document.getElementById('btn-view-all');
  const btnExitSolar = document.getElementById('btn-exit-solar');
  const miniCard = document.getElementById('solar-mini-card');
  const miniCardClose = document.getElementById('mini-card-close');
  const miniBtnDetails = document.getElementById('mini-btn-details');
  const dockPills = document.querySelectorAll('.dock-pill');
  const speedButtons = document.querySelectorAll('.solar-speed-btn');
  const pauseSolarBtn = document.getElementById('solar-btn-pause');
  const toggleOrbitsBtn = document.getElementById('btn-toggle-orbits');
  const toggleOrbitsLabel = document.getElementById('label-toggle-orbits');

  function enterFullSolarSystem(initialPlanet = 'overview') {
    if (isDeepSpaceMode) exitDeepSpaceMode();

    isFullSolarSystemMode = true;
    document.body.classList.add('solar-system-view');
    container.classList.add('interactive');
    container.style.opacity = '1';
    container.style.transform = 'none';
    const flare = document.querySelector('.sun-corona-flare');
    if (flare) {
      flare.style.opacity = '1';
      flare.style.transform = 'none';
    }
    selectDockPlanet(initialPlanet);
  }

  function exitFullSolarSystem() {
    isFullSolarSystemMode = false;
    document.body.classList.remove('solar-system-view');
    container.classList.remove('interactive');
    container.style.opacity = '';
    container.style.transform = '';
    const flare = document.querySelector('.sun-corona-flare');
    if (flare) {
      flare.style.opacity = '';
      flare.style.transform = '';
    }
    if (miniCard) miniCard.classList.remove('visible');
    focusedSolarPlanet = null;
    resetOverview();
  }

  if (btnFullSolar) {
    btnFullSolar.addEventListener('click', () => enterFullSolarSystem('overview'));
  }
  if (btnExploreSystem) {
    btnExploreSystem.addEventListener('click', () => enterFullSolarSystem('overview'));
  }
  if (cardExploreTrigger) {
    cardExploreTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      enterFullSolarSystem('overview');
    });
  }
  if (btnViewAll) {
    btnViewAll.addEventListener('click', (e) => {
      e.preventDefault();
      enterFullSolarSystem('overview');
    });
  }

  const btnDrawer3D = document.getElementById('btn-drawer-explore-3d');
  if (btnDrawer3D) {
    btnDrawer3D.addEventListener('click', () => {
      const currentPlanet = focusedBodyId || 'earth';
      hud.closeDrawer();
      enterFullSolarSystem(currentPlanet);
    });
  }

  if (btnExitSolar) {
    btnExitSolar.addEventListener('click', () => exitFullSolarSystem());
  }

  // Planet selection in Full Solar System Dock
  function selectDockPlanet(planetId) {
    focusedSolarPlanet = planetId;

    dockPills.forEach(p => {
      if (p.getAttribute('data-target') === planetId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (planetId === 'overview') {
      targetOrbitTheta = 0.08;
      targetOrbitPhi = 1.22;
      targetOrbitRadius = 78.0;
      orbitTarget.set(24, 0, -6);
      orbitalSystem.highlightOrbit(null);
      if (miniCard) miniCard.classList.remove('visible');
    } else if (planetId === 'sun') {
      targetOrbitRadius = 38.0;
      orbitTarget.copy(sunAnchor);
      orbitalSystem.highlightOrbit(null);
      updateMiniCard({
        name: 'Sun',
        classification: 'G-Type Main Sequence // Sol',
        dist: '0.000 AU',
        diam: '696,340 km',
        period: '25.05 d',
        vel: '0.00 km/s'
      });
    } else {
      const data = ORBITA_TELEMETRY[planetId];
      if (!data) return;

      orbitalSystem.highlightOrbit(planetId);
      const scale = data.visualScale || 1.0;
      targetOrbitRadius = Math.max(scale * 5.2, 7.5);

      updateMiniCard({
        name: data.name,
        classification: `${data.designation} // ${data.classification}`,
        dist: `${data.semiMajorAxisAU} AU`,
        diam: `${data.radiusKm.toLocaleString()} km`,
        period: `${data.orbitalPeriodDays.toLocaleString()} d`,
        vel: `${data.orbitalVelocityKmS} km/s`
      });
    }
  }

  function updateMiniCard(stats) {
    if (!miniCard) return;
    const nameEl = document.getElementById('mini-planet-name');
    const typeEl = document.getElementById('mini-planet-type');
    const distEl = document.getElementById('mini-stat-dist');
    const diamEl = document.getElementById('mini-stat-diam');
    const periodEl = document.getElementById('mini-stat-period');
    const velEl = document.getElementById('mini-stat-vel');

    if (nameEl) nameEl.textContent = stats.name.toUpperCase();
    if (typeEl) typeEl.textContent = stats.classification;
    if (distEl) distEl.textContent = stats.dist;
    if (diamEl) diamEl.textContent = stats.diam;
    if (periodEl) periodEl.textContent = stats.period;
    if (velEl) velEl.textContent = stats.vel;

    miniCard.classList.add('visible');
  }

  dockPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-target');
      if (target) selectDockPlanet(target);
    });
  });

  if (miniCardClose) {
    miniCardClose.addEventListener('click', () => {
      if (miniCard) miniCard.classList.remove('visible');
    });
  }

  if (miniBtnDetails) {
    miniBtnDetails.addEventListener('click', () => {
      if (focusedSolarPlanet && focusedSolarPlanet !== 'overview' && focusedSolarPlanet !== 'sun') {
        hud.setPlanet(focusedSolarPlanet);
      }
    });
  }

  // Speed warp controls in HUD
  speedButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      speedButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const warp = parseInt(btn.getAttribute('data-warp'), 10);
      if (!isNaN(warp)) timeWarpEngine.setWarp(warp);
    });
  });

  if (pauseSolarBtn) {
    pauseSolarBtn.addEventListener('click', () => {
      const isPaused = timeWarpEngine.togglePause();
      pauseSolarBtn.textContent = isPaused ? '▶' : '⏸';
    });
  }

  // Toggle Orbits visibility
  let orbitsVisible = true;
  if (toggleOrbitsBtn) {
    toggleOrbitsBtn.addEventListener('click', () => {
      orbitsVisible = !orbitsVisible;
      orbitalSystem.group.visible = orbitsVisible;
      if (toggleOrbitsLabel) {
        toggleOrbitsLabel.textContent = orbitsVisible ? 'Orbits: ON' : 'Orbits: OFF';
      }
      toggleOrbitsBtn.style.opacity = orbitsVisible ? '1' : '0.6';
    });
  }

  // ============================================================
  // 11. DEEP SPACE OBSERVATORY 3D MODE (MOONS & ASTEROIDS)
  // Dedicated Separate Environment with Interactive Redirection
  // ============================================================
  let isDeepSpaceMode = false;
  let deepSpaceOrbitTarget = new THREE.Vector3(0, 0, 0);
  let deepSpaceOrbitRadius = 90.0;
  let targetDeepSpaceOrbitRadius = 90.0;
  let deepSpaceOrbitTheta = 0.35;
  let deepSpaceOrbitPhi = 1.15;
  let targetDeepSpaceOrbitTheta = 0.35;
  let targetDeepSpaceOrbitPhi = 1.15;
  let focusedDeepSpaceBody = null;

  const btnDeepSpace = document.getElementById('btn-deep-space');
  const btnHeroDeepSpace = document.getElementById('btn-hero-deep-space');
  const btnLaunchMoons3D = document.getElementById('btn-launch-moons-3d');
  const btnLaunchAsteroids3D = document.getElementById('btn-launch-asteroids-3d');
  const btnExitDeepSpace = document.getElementById('btn-exit-deep-space');
  const deepFilterPills = document.querySelectorAll('.deep-filter-pill');
  const deepDockPills = document.querySelectorAll('.deep-dock-pill');
  const deepReticle = document.getElementById('deep-space-reticle');
  const reticleName = document.getElementById('reticle-name');
  const reticleBadge = document.getElementById('reticle-badge');
  const reticleAction = document.getElementById('reticle-action');

  function enterDeepSpaceMode(initialBody = 'overview') {
    if (isFullSolarSystemMode) exitFullSolarSystem();

    isDeepSpaceMode = true;
    document.body.classList.add('deep-space-view');
    container.classList.add('interactive');
    container.style.opacity = '1';
    container.style.transform = 'none';

    // Hide planetary parade and flare
    celestialSystem.systemGroup.visible = false;
    orbitalSystem.group.visible = false;
    const flare = document.querySelector('.sun-corona-flare');
    if (flare) {
      flare.style.opacity = '0';
    }

    // Show moons and asteroids system
    moonsAsteroidsSystem.show();

    // Reset camera orbit
    deepSpaceOrbitTarget.set(0, 0, 0);
    targetDeepSpaceOrbitRadius = 90.0;
    targetDeepSpaceOrbitTheta = 0.35;
    targetDeepSpaceOrbitPhi = 1.15;

    selectDeepSpaceBody(initialBody);
  }

  function exitDeepSpaceMode() {
    isDeepSpaceMode = false;
    document.body.classList.remove('deep-space-view');
    container.classList.remove('interactive');
    container.style.opacity = '';
    container.style.transform = '';

    const flare = document.querySelector('.sun-corona-flare');
    if (flare) {
      flare.style.opacity = '';
      flare.style.transform = '';
    }

    if (deepReticle) deepReticle.classList.remove('visible');

    // Hide moons/asteroids and restore solar system
    moonsAsteroidsSystem.hide();
    celestialSystem.systemGroup.visible = true;
    orbitalSystem.group.visible = true;

    focusedDeepSpaceBody = null;
    resetOverview();
  }

  // Redirection from 3D object to website sections with active card pulsing
  function redirectToCelestialSection(targetId, targetType) {
    exitDeepSpaceMode();

    if (targetType === 'moon') {
      scrollToSection('moons');
      setTimeout(() => {
        const card = document.querySelector(`.moon-detail-card[data-moon="${targetId}"]`);
        if (card) {
          card.classList.remove('card-highlight-pulse');
          void card.offsetWidth;
          card.classList.add('card-highlight-pulse');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 450);
    } else {
      // asteroid or belt
      scrollToSection('asteroids');
      setTimeout(() => {
        let card = document.querySelector(`.asteroid-block-card[data-asteroid="${targetId}"]`);
        if (!card) {
          card = document.querySelector('.asteroid-block-card[data-asteroid="belt"]');
        }
        if (card) {
          card.classList.remove('card-highlight-pulse');
          void card.offsetWidth;
          card.classList.add('card-highlight-pulse');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 450);
    }
  }

  function showReticleForBody(id, name, badge, type) {
    if (!deepReticle) return;
    if (reticleName) reticleName.textContent = name.toUpperCase();
    if (reticleBadge) reticleBadge.textContent = badge;
    if (reticleAction) {
      reticleAction.textContent = type === 'moon' 
        ? 'Click to jump to Moons study ↗' 
        : 'Click to jump to Asteroids section ↗';
    }
    deepReticle.classList.add('visible');
  }

  function selectDeepSpaceBody(targetId) {
    focusedDeepSpaceBody = targetId;

    deepDockPills.forEach(p => {
      if (p.getAttribute('data-target') === targetId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (targetId === 'overview') {
      deepSpaceOrbitTarget.set(0, 0, 0);
      targetDeepSpaceOrbitRadius = 90.0;
      targetDeepSpaceOrbitTheta = 0.35;
      targetDeepSpaceOrbitPhi = 1.15;
      if (deepReticle) deepReticle.classList.remove('visible');
    } else if (targetId === 'belt') {
      deepSpaceOrbitTarget.set(0, 0, 0);
      targetDeepSpaceOrbitRadius = 105.0;
      targetDeepSpaceOrbitPhi = 0.95;
      showReticleForBody('belt', 'Main Asteroid Belt', 'MARS-JUPITER GAP // DEBRIS SWARM', 'asteroid');
    } else {
      const b = moonsAsteroidsSystem.bodies[targetId];
      if (b) {
        targetDeepSpaceOrbitRadius = Math.max(b.config.radius * 6.5, 12.0);
        showReticleForBody(targetId, b.config.name, b.config.badge, b.config.type);
      }
    }
  }

  // Deep Space Launcher Triggers
  if (btnDeepSpace) {
    btnDeepSpace.addEventListener('click', () => enterDeepSpaceMode('overview'));
  }
  if (btnHeroDeepSpace) {
    btnHeroDeepSpace.addEventListener('click', () => enterDeepSpaceMode('overview'));
  }
  if (btnLaunchMoons3D) {
    btnLaunchMoons3D.addEventListener('click', () => enterDeepSpaceMode('europa'));
  }
  if (btnLaunchAsteroids3D) {
    btnLaunchAsteroids3D.addEventListener('click', () => enterDeepSpaceMode('ceres'));
  }
  if (btnExitDeepSpace) {
    btnExitDeepSpace.addEventListener('click', () => exitDeepSpaceMode());
  }

  // Deep space filter tabs (All, Moons, Asteroids)
  deepFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      deepFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');

      deepDockPills.forEach(dp => {
        const type = dp.getAttribute('data-type');
        const target = dp.getAttribute('data-target');
        if (target === 'overview') {
          dp.style.display = 'flex';
        } else if (filter === 'all' || type === filter || (filter === 'asteroids' && type === 'asteroid')) {
          dp.style.display = 'flex';
        } else {
          dp.style.display = 'none';
        }
      });
    });
  });

  // Deep space dock pill clicks
  deepDockPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.getAttribute('data-target');
      if (target) selectDeepSpaceBody(target);
    });
  });

  // Clicking the reticle directly redirects to section
  if (deepReticle) {
    deepReticle.addEventListener('click', () => {
      if (focusedDeepSpaceBody && focusedDeepSpaceBody !== 'overview') {
        const b = moonsAsteroidsSystem.bodies[focusedDeepSpaceBody];
        if (b) {
          redirectToCelestialSection(focusedDeepSpaceBody, b.config.type);
        } else if (focusedDeepSpaceBody === 'belt') {
          redirectToCelestialSection('belt', 'asteroid');
        }
      }
    });
  }

  // ============================================================
  // 12. POINTER / TOUCH & ORBIT CONTROLS
  // Unified for Full Solar System and Deep Space Observatory
  // ============================================================
  container.addEventListener('pointerdown', (e) => {
    if (!isFullSolarSystemMode && !isDeepSpaceMode) return;
    isPointerDown = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    container.classList.add('grabbing');
  });

  window.addEventListener('pointermove', (e) => {
    const isInteractive = isFullSolarSystemMode || isDeepSpaceMode;
    if (!isInteractive) return;

    if (isPointerDown) {
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      if (isFullSolarSystemMode) {
        targetOrbitTheta -= dx * 0.0055;
        targetOrbitPhi = Math.max(0.12, Math.min(Math.PI - 0.12, targetOrbitPhi + dy * 0.0055));
      } else if (isDeepSpaceMode) {
        targetDeepSpaceOrbitTheta -= dx * 0.0055;
        targetDeepSpaceOrbitPhi = Math.max(0.12, Math.min(Math.PI - 0.12, targetDeepSpaceOrbitPhi + dy * 0.0055));
      }
    } else if (isDeepSpaceMode) {
      // Raycasting hover detection in Deep Space
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, orbitaScene.camera);
      const intersects = raycaster.intersectObjects(moonsAsteroidsSystem.raycastTargets, true);

      if (intersects.length > 0) {
        let targetObj = intersects[0].object;
        while (targetObj && (!targetObj.userData || !targetObj.userData.id)) {
          targetObj = targetObj.parent;
        }
        if (targetObj && targetObj.userData && targetObj.userData.id) {
          container.style.cursor = 'pointer';
          const d = targetObj.userData;
          showReticleForBody(d.id, d.name, d.badge || '', d.type || 'moon');
          return;
        }
      }
      container.style.cursor = '';
      if (!focusedDeepSpaceBody || focusedDeepSpaceBody === 'overview') {
        if (deepReticle) deepReticle.classList.remove('visible');
      }
    }
  });

  window.addEventListener('pointerup', () => {
    isPointerDown = false;
    container.classList.remove('grabbing');
  });

  window.addEventListener('wheel', (e) => {
    if (!isFullSolarSystemMode && !isDeepSpaceMode) return;
    e.preventDefault();
    if (isFullSolarSystemMode) {
      targetOrbitRadius = Math.max(12.0, Math.min(260.0, targetOrbitRadius + e.deltaY * 0.06));
    } else if (isDeepSpaceMode) {
      targetDeepSpaceOrbitRadius = Math.max(10.0, Math.min(240.0, targetDeepSpaceOrbitRadius + e.deltaY * 0.06));
    }
  }, { passive: false });

  // Direct 3D Raycasting Clicks
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', (e) => {
    // Avoid clicking through UI overlays
    if (e.target.closest('#top-nav') || e.target.closest('#telemetry-drawer') || e.target.closest('#solar-system-hud') || e.target.closest('#deep-space-hud') || e.target.closest('.solaris-feature-card') || e.target.closest('.planet-card-item') || e.target.closest('.sun-feature-card') || e.target.closest('.moon-detail-card') || e.target.closest('.asteroid-block-card') || e.target.closest('.study-chapter') || e.target.closest('.terms-reader-card') || e.target.closest('#master-footer') || e.target.closest('#video-modal')) {
      return;
    }

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, orbitaScene.camera);

    if (isDeepSpaceMode) {
      // Raycasting in separate Moons & Asteroids environment
      const intersects = raycaster.intersectObjects(moonsAsteroidsSystem.raycastTargets, true);
      if (intersects.length > 0) {
        let targetObj = intersects[0].object;
        while (targetObj && (!targetObj.userData || !targetObj.userData.id)) {
          targetObj = targetObj.parent;
        }
        if (targetObj && targetObj.userData && targetObj.userData.id) {
          const id = targetObj.userData.id;
          const type = targetObj.userData.type || 'moon';
          redirectToCelestialSection(id, type);
        }
      }
    } else {
      // Raycasting in Solar System mode or normal page
      const intersects = raycaster.intersectObjects(celestialSystem.raycastTargets, true);
      if (intersects.length > 0) {
        let targetObj = intersects[0].object;
        while (targetObj && (!targetObj.userData || !targetObj.userData.id)) {
          targetObj = targetObj.parent;
        }
        if (targetObj && targetObj.userData && targetObj.userData.id) {
          if (isFullSolarSystemMode) {
            selectDockPlanet(targetObj.userData.id);
          } else {
            focusPlanet(targetObj.userData.id);
          }
        }
      }
    }
  });

  // Global Escape Key Listener
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (isCinematicTour) {
        exitCinematicTour();
      } else if (videoModal && videoModal.classList.contains('open')) {
        closeVideoModal();
      } else if (isDeepSpaceMode) {
        exitDeepSpaceMode();
      } else if (isFullSolarSystemMode) {
        exitFullSolarSystem();
      } else {
        resetOverview();
      }
    }
  });

  // ============================================================
  // 13. 60 FPS Animation & Camera Loop
  // ============================================================
  const tempPos = new THREE.Vector3();

  function animate() {
    requestAnimationFrame(animate);

    const deltaSeconds = Math.min(orbitaScene.clock.getDelta(), 0.1);
    const effectiveWarp = timeWarpEngine.update(deltaSeconds);

    // Update both 3D engines
    celestialSystem.update(deltaSeconds, effectiveWarp);
    moonsAsteroidsSystem.update(deltaSeconds);

    if (isDeepSpaceMode) {
      // Camera choreography for Deep Space Moons & Asteroids environment
      deepSpaceOrbitTheta += (targetDeepSpaceOrbitTheta - deepSpaceOrbitTheta) * 0.09;
      deepSpaceOrbitPhi += (targetDeepSpaceOrbitPhi - deepSpaceOrbitPhi) * 0.09;
      deepSpaceOrbitRadius += (targetDeepSpaceOrbitRadius - deepSpaceOrbitRadius) * 0.09;

      if (focusedDeepSpaceBody && focusedDeepSpaceBody !== 'overview' && focusedDeepSpaceBody !== 'belt') {
        moonsAsteroidsSystem.getWorldPosition(focusedDeepSpaceBody, tempPos);
        deepSpaceOrbitTarget.copy(tempPos);
      } else {
        deepSpaceOrbitTarget.set(0, 0, 0);
      }

      const camX = deepSpaceOrbitTarget.x + deepSpaceOrbitRadius * Math.sin(deepSpaceOrbitPhi) * Math.sin(deepSpaceOrbitTheta);
      const camY = deepSpaceOrbitTarget.y + deepSpaceOrbitRadius * Math.cos(deepSpaceOrbitPhi);
      const camZ = deepSpaceOrbitTarget.z + deepSpaceOrbitRadius * Math.sin(deepSpaceOrbitPhi) * Math.cos(deepSpaceOrbitTheta);

      targetCamPos.set(camX, camY, camZ);
      targetCamLookAt.copy(deepSpaceOrbitTarget);

      orbitaScene.camera.position.lerp(targetCamPos, 0.14);
      currentLookAt.lerp(targetCamLookAt, 0.14);
      orbitaScene.camera.lookAt(currentLookAt);
    } else if (isFullSolarSystemMode) {
      // Camera choreography for Full Solar System mode
      orbitTheta += (targetOrbitTheta - orbitTheta) * 0.09;
      orbitPhi += (targetOrbitPhi - orbitPhi) * 0.09;
      orbitRadius += (targetOrbitRadius - orbitRadius) * 0.09;

      if (focusedSolarPlanet && focusedSolarPlanet !== 'overview') {
        if (focusedSolarPlanet === 'sun') {
          orbitTarget.copy(sunAnchor);
        } else {
          celestialSystem.getWorldPosition(focusedSolarPlanet, tempPos);
          orbitTarget.copy(tempPos);
        }
      }

      const camX = orbitTarget.x + orbitRadius * Math.sin(orbitPhi) * Math.sin(orbitTheta);
      const camY = orbitTarget.y + orbitRadius * Math.cos(orbitPhi);
      const camZ = orbitTarget.z + orbitRadius * Math.sin(orbitPhi) * Math.cos(orbitTheta);

      targetCamPos.set(camX, camY, camZ);
      targetCamLookAt.copy(orbitTarget);

      orbitaScene.camera.position.lerp(targetCamPos, 0.14);
      currentLookAt.lerp(targetCamLookAt, 0.14);
      orbitaScene.camera.lookAt(currentLookAt);
    } else {
      // Normal Editorial Mode / Guided Tour:
      const isDrawerOpen = hud.drawer && hud.drawer.classList.contains('open');
      const isTourActive = isCinematicTour;

      if (isDrawerOpen || isTourActive) {
        // Keep 3D canvas 100% visible, unblurred, and active
        container.style.opacity = '1';
        container.style.transform = 'none';
        const flare = document.querySelector('.sun-corona-flare');
        if (flare) {
          flare.style.opacity = '1';
          flare.style.transform = 'none';
        }
      } else {
        // Smoothly scroll and fade the 3D background with hero scroll so it NEVER collides with #planets cards!
        const scrollOffset = window.scrollY || 0;
        const fadeProgress = Math.min(scrollOffset / 420, 1);
        
        container.style.opacity = `${1 - fadeProgress}`;
        container.style.transform = `translateY(${-scrollOffset * 0.45}px)`;
        
        const flare = document.querySelector('.sun-corona-flare');
        if (flare) {
          flare.style.opacity = `${1 - fadeProgress}`;
          flare.style.transform = `translateY(${-scrollOffset * 0.45}px)`;
        }
      }

      if (focusedBodyId && isFocusCamera) {
        celestialSystem.getWorldPosition(focusedBodyId, tempPos);

        const scale = ORBITA_TELEMETRY[focusedBodyId]?.visualScale || 1.0;
        const dist = Math.max(scale * 5.2, 7.5);

        // When the right-side drawer is open or during tour, shift targetCamLookAt to the right of the planet
        // and camera slightly left so Three.js centers the planet in the remaining open viewport (~35% from screen left),
        // completely clear of the 440px right drawer!
        const isOffsetActive = isDrawerOpen || isTourActive;
        const lookOffset = isOffsetActive ? dist * 0.42 : 0;
        const camOffset = isOffsetActive ? -dist * 0.15 : 0;

        targetCamLookAt.set(tempPos.x + lookOffset, tempPos.y, tempPos.z);
        targetCamPos.set(
          tempPos.x + camOffset + dist * 0.85,
          tempPos.y + dist * 0.40,
          tempPos.z + dist * 1.15
        );
      } else {
        targetCamPos.copy(defaultCamPos);
        targetCamLookAt.copy(defaultLookAt);
      }

      orbitaScene.camera.position.lerp(targetCamPos, 0.08);
      currentLookAt.lerp(targetCamLookAt, 0.08);
      orbitaScene.camera.lookAt(currentLookAt);
    }

    // Render WebGL
    orbitaScene.render();
  }

  // 14. FOOTER TERMS OF SERVICE DRAWER CONTROLLER
  const termsBlock = document.getElementById('terms');
  const btnFooterTerms = document.getElementById('btn-footer-terms');
  const btnBottomTerms = document.getElementById('btn-bottom-terms');
  const btnToggleTerms = document.getElementById('btn-toggle-terms');

  function openTerms() {
    if (!termsBlock) return;
    termsBlock.classList.add('active');
    btnFooterTerms?.setAttribute('aria-expanded', 'true');
    setTimeout(() => {
      termsBlock.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  function closeTerms() {
    if (!termsBlock) return;
    termsBlock.classList.remove('active');
    btnFooterTerms?.setAttribute('aria-expanded', 'false');
  }

  function toggleTerms() {
    if (!termsBlock) return;
    if (termsBlock.classList.contains('active')) {
      closeTerms();
    } else {
      openTerms();
    }
  }

  btnFooterTerms?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTerms();
  });

  btnBottomTerms?.addEventListener('click', (e) => {
    e.preventDefault();
    openTerms();
  });

  btnToggleTerms?.addEventListener('click', (e) => {
    e.preventDefault();
    closeTerms();
  });

  animate();
});
