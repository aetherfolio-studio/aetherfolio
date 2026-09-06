# Solaris — 3D Real-Time Solar System & Celestial Dynamics Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![WebGL 2.0](https://img.shields.io/badge/WebGL-2.0%20%2F%20Three.js-orange.svg)](https://threejs.org/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Solaris-38BDF8.svg)](https://aetherfolio.vercel.app/solaris)
[![Studio](https://img.shields.io/badge/Crafted%20by-Aetherfolio%20Studio-E06D53.svg)](https://aetherfolio.vercel.app)

> **Live Interactive Experience:** [https://aetherfolio.vercel.app/solaris](https://aetherfolio.vercel.app/solaris)  
> **Engineering Benchmark:** NASA JPL Horizons Ephemeris Telemetry &times; Apple-Grade Spatial Restraint &times; Linear Product Polish.

---

## Overview

**Solaris** is a bespoke, hardware-accelerated 3D astronomical simulation engineered from scratch by [Aetherfolio Studio](https://aetherfolio.vercel.app). It renders the complete solar system—the Sun, terrestrial planets, gas giants, ice giants, major planetary moons, and the main asteroid belt—at an uncompromised 60–120 FPS.

Every celestial trajectory is calibrated against orbital parameters from the **NASA Jet Propulsion Laboratory (JPL) Horizons Ephemeris System**, providing high educational fidelity combined with tactile cinematic controls.

---

## Key Technical Features

- **Full 3D Interactive Solar System**: True multi-body hierarchy with semi-major axes, eccentricities, orbital inclinations, and rotational periods.
- **Deep Space Mode (Moons & Asteroids)**: Dedicated isolated WebGL environment for observing planetary satellites (Luna, Phobos, Deimos, Europa, Ganymede, Titan, Enceladus) and procedural asteroid belt point clouds.
- **Custom PBR Shaders & Dynamic Corona**: Procedurally generated solar corona flares, custom Fresnel rim-lighting, Rayleigh atmospheric scattering halos, and normal-mapped surface relief.
- **NASA JPL Horizons Telemetry Drawer**: Right-side mission-control drawer delivering real-time semi-major axes, orbital velocity, surface gravity, mass coefficients, and scientific monographs.
- **Cinematic Guided Tours**: Automated camera tweening orchestrating orbital flybys across all planetary systems.
- **Zero Framework Bloat**: Pure vanilla HTML5, CSS3, and Three.js WebGL—zero heavy SPA runtimes, sub-second initial paint.

---

## Architectural Toolchain

- **Graphics Core**: Three.js WebGL 2.0 (r128), Custom GLSL Fragment & Vertex Shaders
- **Scientific Reference**: NASA JPL Solar System Dynamics (SSD) Group Standards
- **Typography**: Cormorant Garamond, Instrument Serif, Space Mono, Plus Jakarta Sans
- **Layout Engine**: Responsive CSS Grid & Hardware-Accelerated Transforms

---

## Quick Start (Local Development)

`ash
# Clone the repository
git clone https://github.com/aetherfolio-studio/solaris.git
cd solaris

# Run any local static HTTP server
python -m http.server 8080

# Open in your browser
open http://localhost:8080
`

---

## License & Attribution

Solaris is authored by **Anish Kadian** at **Aetherfolio Studio**.  
Astronomical reference parameters are derived from NASA/JPL public research records.  
Released under the **MIT License**.
