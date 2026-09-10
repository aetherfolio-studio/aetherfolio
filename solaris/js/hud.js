/* ============================================================
   ORBITA // MISSION-CONTROL HUD & TELEMETRY CONTROLLER
   NASA Mission-Control Density x Apple-Level Restraint
   ============================================================ */

class OrbitaHUD {
  constructor(callbacks = {}) {
    this.callbacks = callbacks;

    // Cache DOM Elements
    this.drawer = document.getElementById('telemetry-drawer');
    this.backdrop = document.getElementById('telemetry-backdrop');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    this.planetNameEl = document.getElementById('drawer-planet-name');
    this.classificationEl = document.getElementById('drawer-classification');
    this.summaryEl = document.getElementById('drawer-summary');
    this.keplerianGrid = document.getElementById('grid-keplerian');
    this.physicalGrid = document.getElementById('grid-physical');
    this.atmoSection = document.getElementById('section-atmosphere');
    this.atmoBar = document.getElementById('atmo-bar');
    this.atmoLegend = document.getElementById('atmo-legend');
    this.missionsList = document.getElementById('missions-list');
    
    this.warpButtons = document.querySelectorAll('.warp-btn');
    this.planetPills = document.querySelectorAll('.planet-pill');
    this.pauseBtn = document.getElementById('btn-pause');
    this.overviewPill = document.getElementById('pill-overview');
    
    this.utcValEl = document.getElementById('hud-utc-val');
    this.jdValEl = document.getElementById('hud-jd-val');

    this.isPaused = false;
    this.currentPlanetId = null;
    this.activeTypeIntervals = [];

    this.initEventListeners();
  }

  initEventListeners() {
    // Drawer close button & Backdrop click
    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => {
        this.closeDrawer();
      });
    }

    if (this.backdrop) {
      this.backdrop.addEventListener('click', () => {
        this.closeDrawer();
      });
    }

    // Quick-select planet pills
    this.planetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.getAttribute('data-target');
        if (target === 'overview') {
          this.setOverview();
          if (this.callbacks.onOverview) this.callbacks.onOverview();
        } else if (target) {
          this.setPlanet(target);
          if (this.callbacks.onSelectPlanet) this.callbacks.onSelectPlanet(target);
        }
      });
    });

    // Time Warp buttons
    this.warpButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const speed = parseInt(btn.getAttribute('data-speed'), 10);
        this.setActiveWarpSpeed(speed);
        if (this.callbacks.onTimeWarp) this.callbacks.onTimeWarp(speed);
      });
    });

    // Pause / Resume button
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => {
        this.togglePause();
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePause();
      } else if (e.code === 'Digit1') {
        this.triggerWarp(1);
      } else if (e.code === 'Digit2') {
        this.triggerWarp(10);
      } else if (e.code === 'Digit3') {
        this.triggerWarp(100);
      } else if (e.code === 'Digit4') {
        this.triggerWarp(500);
      } else if (e.code === 'Escape') {
        this.setOverview();
        if (this.callbacks.onOverview) this.callbacks.onOverview();
      }
    });
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.pauseBtn) {
      this.pauseBtn.innerHTML = this.isPaused
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
      this.pauseBtn.setAttribute('title', this.isPaused ? 'Resume Simulation (Space)' : 'Pause Simulation (Space)');
    }
    if (this.callbacks.onTogglePause) this.callbacks.onTogglePause(this.isPaused);
  }

  triggerWarp(speed) {
    this.setActiveWarpSpeed(speed);
    if (this.callbacks.onTimeWarp) this.callbacks.onTimeWarp(speed);
  }

  setActiveWarpSpeed(speed) {
    this.warpButtons.forEach(b => {
      if (parseInt(b.getAttribute('data-speed'), 10) === speed) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  stopTypewriter() {
    if (this.activeTypeIntervals && this.activeTypeIntervals.length > 0) {
      this.activeTypeIntervals.forEach(timer => clearInterval(timer));
      this.activeTypeIntervals = [];
    }
  }

  typewriterText(element, fullText, speedMs = 14, leaveCursor = false, callback = null) {
    if (!element) return;
    element.innerHTML = '<span class="typed-content"></span><span class="typing-cursor"></span>';
    const contentSpan = element.querySelector('.typed-content');
    const cursorSpan = element.querySelector('.typing-cursor');

    let charIdx = 0;
    const interval = setInterval(() => {
      if (charIdx < fullText.length) {
        contentSpan.textContent = fullText.slice(0, charIdx + 1);
        charIdx++;
      } else {
        clearInterval(interval);
        const idx = this.activeTypeIntervals.indexOf(interval);
        if (idx !== -1) this.activeTypeIntervals.splice(idx, 1);
        if (!leaveCursor && cursorSpan) {
          setTimeout(() => {
            if (cursorSpan && cursorSpan.parentNode) cursorSpan.remove();
          }, 1200);
        }
        if (callback) callback();
      }
    }, speedMs);

    this.activeTypeIntervals.push(interval);
  }

  setPlanet(planetId) {
    const data = ORBITA_TELEMETRY[planetId];
    if (!data) return;

    this.currentPlanetId = planetId;
    this.stopTypewriter();

    // Update active pill in bottom carousel
    this.planetPills.forEach(pill => {
      if (pill.getAttribute('data-target') === planetId) {
        pill.classList.add('active');
        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        pill.classList.remove('active');
      }
    });

    // Populate Drawer Header with Terminal Cursor Writing Animation
    if (this.planetNameEl) {
      this.typewriterText(this.planetNameEl, data.name.toUpperCase(), 28, false);
    }
    if (this.classificationEl) {
      this.typewriterText(this.classificationEl, `${data.designation} // ${data.classification}`, 14, false);
    }
    if (this.summaryEl) {
      this.typewriterText(this.summaryEl, data.summary, 11, true);
    }

    // Populate Keplerian Elements Grid
    if (this.keplerianGrid) {
      this.keplerianGrid.innerHTML = `
        <div class="data-card">
          <div class="data-card-label">Semi-Major Axis (a)</div>
          <div class="data-card-val">${data.semiMajorAxisAU} AU</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Orbital Period (P)</div>
          <div class="data-card-val">${data.orbitalPeriodDays.toLocaleString()} Days</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Orbital Velocity (v)</div>
          <div class="data-card-val">${data.orbitalVelocityKmS} km/s</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Orbital Eccentricity (e)</div>
          <div class="data-card-val">${data.eccentricity}</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Orbital Inclination (i)</div>
          <div class="data-card-val">${data.inclinationDeg}&deg;</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Axial Tilt / Obliquity</div>
          <div class="data-card-val">${data.axialTiltDeg}&deg;</div>
        </div>
      `;
    }

    // Populate Physical Characteristics Grid
    if (this.physicalGrid) {
      this.physicalGrid.innerHTML = `
        <div class="data-card">
          <div class="data-card-label">Mean Radius (r)</div>
          <div class="data-card-val">${data.radiusKm.toLocaleString()} km</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Planetary Mass (M)</div>
          <div class="data-card-val">${data.massKg} kg</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Surface Gravity (g)</div>
          <div class="data-card-val">${data.surfaceGravityMS2} m/s&sup2;</div>
        </div>
        <div class="data-card">
          <div class="data-card-label">Mean Temperature (T)</div>
          <div class="data-card-val">${data.meanTempK} K (${(data.meanTempK - 273.15).toFixed(1)}&deg;C)</div>
        </div>
      `;
    }

    // Populate Atmospheric Composition Bar & Legend
    if (this.atmoSection && this.atmoBar && this.atmoLegend) {
      if (data.atmosphere && data.atmosphere.length > 0) {
        this.atmoSection.style.display = 'flex';
        let barHtml = '';
        let legendHtml = '';
        data.atmosphere.forEach(item => {
          barHtml += `<div class="comp-segment" style="width: ${item.percent}%; background: ${item.color};" title="${item.element}: ${item.percent}%"></div>`;
          legendHtml += `
            <div class="legend-item">
              <div class="legend-dot" style="background: ${item.color};"></div>
              <span>${item.element}: <strong>${item.percent}%</strong></span>
            </div>
          `;
        });
        this.atmoBar.innerHTML = barHtml;
        this.atmoLegend.innerHTML = legendHtml;
      } else {
        this.atmoSection.style.display = 'none';
      }
    }

    // Populate Missions Exploration Timeline
    if (this.missionsList) {
      if (data.missions && data.missions.length > 0) {
        let missionsHtml = '';
        data.missions.forEach(m => {
          missionsHtml += `
            <div class="mission-item">
              <div class="mission-name-row">
                <span class="mission-name">${m.name} (${m.agency})</span>
                <span class="mission-year">${m.year}</span>
              </div>
              <p class="mission-desc">${m.summary}</p>
            </div>
          `;
        });
        this.missionsList.innerHTML = missionsHtml;
      } else {
        this.missionsList.innerHTML = '<div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted);">No automated orbital or surface benchmark mission on record.</div>';
      }
    }

    // Open drawer & backdrop
    if (this.drawer) {
      this.drawer.classList.add('open');
    }
    if (this.backdrop) {
      this.backdrop.classList.add('open');
    }
  }

  closeDrawer() {
    this.stopTypewriter();
    if (!this.drawer || !this.drawer.classList.contains('open')) return;
    this.drawer.classList.remove('open');
    this.drawer.style.transform = '';
    if (this.backdrop) {
      this.backdrop.classList.remove('open');
    }
    if (this.callbacks.onClose) {
      this.callbacks.onClose();
    }
  }

  setOverview() {
    this.currentPlanetId = null;
    this.planetPills.forEach(pill => {
      if (pill.getAttribute('data-target') === 'overview') {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
    this.closeDrawer();
  }

  updateLiveClock(simulatedDate, julianDate) {
    if (this.utcValEl) {
      const year = simulatedDate.getUTCFullYear();
      const month = String(simulatedDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(simulatedDate.getUTCDate()).padStart(2, '0');
      const hours = String(simulatedDate.getUTCHours()).padStart(2, '0');
      const minutes = String(simulatedDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(simulatedDate.getUTCSeconds()).padStart(2, '0');
      this.utcValEl.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
    }

    if (this.jdValEl) {
      this.jdValEl.textContent = julianDate.toFixed(4);
    }
  }
}
