/* ============================================================
   ORBITA // ORBITAL PATHS & TRAIL ENGINE
   Thin, Restrained Scientific Geometry (No neon glows)
   ============================================================ */

class OrbitalSystem {
  constructor(scene) {
    this.scene = scene;
    this.orbitLines = {};
    this.activeOrbitId = null;

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.initOrbits();
  }

  initOrbits() {
    const planetsList = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

    planetsList.forEach(planetId => {
      const data = ORBITA_TELEMETRY[planetId];
      if (!data.orbitRadiusNorm) return;

      const segments = 128;
      const points = [];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        // Keplerian ellipse with eccentricity
        const a = data.orbitRadiusNorm;
        const e = data.eccentricity;
        const r = (a * (1 - e * e)) / (1 + e * Math.cos(theta));

        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        points.push(new THREE.Vector3(x, 0, z));
      }

      const geo = new THREE.BufferGeometry().setFromPoints(points);
      
      // Default material: very subtle, restrained slate starlight
      const mat = new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.35,
        linewidth: 1
      });

      const line = new THREE.Line(geo, mat);
      this.group.add(line);
      this.orbitLines[planetId] = line;
    });
  }

  highlightOrbit(planetId) {
    // Reset previous
    if (this.activeOrbitId && this.orbitLines[this.activeOrbitId]) {
      this.orbitLines[this.activeOrbitId].material.color.setHex(0x334155);
      this.orbitLines[this.activeOrbitId].material.opacity = 0.35;
    }

    this.activeOrbitId = planetId;

    // Highlight active with Stellar Cyan
    if (planetId && this.orbitLines[planetId]) {
      this.orbitLines[planetId].material.color.setHex(0x38bdf8);
      this.orbitLines[planetId].material.opacity = 0.85;
    }
  }
}
