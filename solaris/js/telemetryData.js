/* ============================================================
   ORBITA // ASTRONOMICAL REFERENCE DATASET
   Curated from Public NASA / JPL-Caltech Open Planetary Archives
   ============================================================ */

const ORBITA_TELEMETRY = {
  sun: {
    id: 'sun',
    name: 'Sun (Sol)',
    designation: 'SOL-001',
    classification: 'Yellow Dwarf (Spectral Type G2V)',
    summary: 'The gravitational anchor of the solar system, accounting for 99.86% of the total system mass. Powered by proton-proton thermonuclear hydrogen fusion in its 15.7 million Kelvin core.',
    visualScale: 15.0,
    color: '#F59E0B',
    semiMajorAxisAU: 0.0,
    orbitalPeriodDays: 0.0,
    orbitalVelocityKmS: 220.0, // Galactic orbital speed
    eccentricity: 0.0,
    inclinationDeg: 0.0,
    radiusKm: 696340,
    massKg: '1.989 × 10³⁰',
    surfaceGravityMS2: 274.0,
    meanTempK: 5778,
    axialTiltDeg: 7.25,
    atmosphere: [
      { element: 'Hydrogen (H₂)', percent: 73.46, color: '#38BDF8' },
      { element: 'Helium (He)', percent: 24.85, color: '#F59E0B' },
      { element: 'Oxygen (O)', percent: 0.77, color: '#34D399' },
      { element: 'Carbon/Iron/Trace', percent: 0.92, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Parker Solar Probe', year: '2018', agency: 'NASA', summary: 'Historic perihelion sweeps within 6.1 million km of the photosphere, sampling corona magnetic reconnection.' },
      { name: 'SOHO Observatory', year: '1995', agency: 'ESA / NASA', summary: 'Unbroken continuous solar wind telemetry and coronal mass ejection (CME) tracking from Lagrange L1.' }
    ]
  },

  mercury: {
    id: 'mercury',
    name: 'Mercury',
    designation: 'PLANET-01',
    classification: 'Terrestrial / Iron-Core Rocky Planet',
    summary: 'The innermost planet, featuring the most eccentric orbit of all eight planets. Possesses an enormous iron core comprising 85% of its radius and experiences extreme diurnal temperature swings.',
    visualScale: 0.65,
    orbitRadiusNorm: 70.0,
    orbitSpeedNorm: 4.15,
    color: '#94A3B8',
    semiMajorAxisAU: 0.387,
    orbitalPeriodDays: 87.97,
    orbitalVelocityKmS: 47.36,
    eccentricity: 0.2056,
    inclinationDeg: 7.00,
    radiusKm: 2439.7,
    massKg: '3.301 × 10²³',
    surfaceGravityMS2: 3.70,
    meanTempK: 440,
    axialTiltDeg: 0.034,
    atmosphere: [
      { element: 'Oxygen (O₂)', percent: 42.0, color: '#38BDF8' },
      { element: 'Sodium (Na)', percent: 29.0, color: '#F59E0B' },
      { element: 'Hydrogen (H₂)', percent: 22.0, color: '#34D399' },
      { element: 'Helium / Trace', percent: 7.0, color: '#94A3B8' }
    ],
    missions: [
      { name: 'MESSENGER', year: '2011–2015', agency: 'NASA', summary: 'Confirmed water ice deposits sequestered inside permanently shadowed polar craters and charted high core sulfur density.' },
      { name: 'BepiColombo', year: '2018–Pres.', agency: 'ESA / JAXA', summary: 'Dual orbiter spacecraft executing complex gravity-assist flybys towards orbital insertion in 2025–2026.' }
    ]
  },

  venus: {
    id: 'venus',
    name: 'Venus',
    designation: 'PLANET-02',
    classification: 'Terrestrial / Hyper-Dense Greenhouse Planet',
    summary: 'Earth’s structural sibling in size and mass, encased beneath an opaque, supercritical 92-bar carbon dioxide atmosphere and sulfuric acid clouds producing a runaway greenhouse effect.',
    visualScale: 0.98,
    orbitRadiusNorm: 64.0,
    orbitSpeedNorm: 1.62,
    color: '#E5AA68',
    semiMajorAxisAU: 0.723,
    orbitalPeriodDays: 224.70,
    orbitalVelocityKmS: 35.02,
    eccentricity: 0.0067,
    inclinationDeg: 3.39,
    radiusKm: 6051.8,
    massKg: '4.867 × 10²⁴',
    surfaceGravityMS2: 8.87,
    meanTempK: 737,
    axialTiltDeg: 177.36, // Retrograde slow rotation
    atmosphere: [
      { element: 'Carbon Dioxide (CO₂)', percent: 96.5, color: '#F59E0B' },
      { element: 'Nitrogen (N₂)', percent: 3.5, color: '#38BDF8' },
      { element: 'Sulfur Dioxide (SO₂)', percent: 0.015, color: '#E2E8F0' },
      { element: 'Argon / Trace', percent: 0.005, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Magellan', year: '1989–1994', agency: 'NASA', summary: 'Synthetic aperture radar mapping revealing volcanic flood plains, impact craters, and tectonic ridge belts across 98% of the surface.' },
      { name: 'Akatsuki', year: '2015–Pres.', agency: 'JAXA', summary: 'Meteorological orbital probe tracking equatorial super-rotating wind currents and bow-shaped atmospheric gravity waves.' }
    ]
  },

  earth: {
    id: 'earth',
    name: 'Earth (Terra)',
    designation: 'PLANET-03',
    classification: 'Terrestrial / Hydro-Atmospheric Life Anchor',
    summary: 'The standard astronomical unit reference. The sole known planetary body harboring active plate tectonics, persistent liquid surface water oceans, and a dynamic oxygen-nitrogen biosphere.',
    visualScale: 1.15,
    orbitRadiusNorm: 57.0,
    orbitSpeedNorm: 1.0,
    color: '#38BDF8',
    semiMajorAxisAU: 1.000,
    orbitalPeriodDays: 365.25,
    orbitalVelocityKmS: 29.78,
    eccentricity: 0.0167,
    inclinationDeg: 0.00,
    radiusKm: 6371.0,
    massKg: '5.972 × 10²⁴',
    surfaceGravityMS2: 9.807,
    meanTempK: 288,
    axialTiltDeg: 23.44,
    atmosphere: [
      { element: 'Nitrogen (N₂)', percent: 78.08, color: '#38BDF8' },
      { element: 'Oxygen (O₂)', percent: 20.95, color: '#34D399' },
      { element: 'Argon (Ar)', percent: 0.93, color: '#94A3B8' },
      { element: 'Carbon Dioxide / Vapor', percent: 0.04, color: '#F59E0B' }
    ],
    missions: [
      { name: 'Terra & Aqua Earth Fleet', year: '1999–Pres.', agency: 'NASA', summary: 'Flagship EOS orbital constellations observing multi-spectral aerosol flux, radiative balance, and global carbon sinks.' },
      { name: 'Copernicus Sentinel', year: '2014–Pres.', agency: 'ESA / EU', summary: 'Synthetic radar and high-resolution multispectral telemetry for global environmental monitoring.' }
    ]
  },

  moon: {
    id: 'moon',
    name: 'The Moon (Luna)',
    designation: 'SATELLITE-3A',
    classification: 'Major Planetary Natural Satellite',
    summary: 'Earth’s gravitationally tidally-locked companion. Formed ~4.51 billion years ago via a giant impact between proto-Earth and Theia, stabilizing Earth’s axial tilt and governing oceanic tides.',
    visualScale: 0.32,
    orbitRadiusNorm: 1.8, // Offset around Earth
    orbitSpeedNorm: 13.3,
    color: '#CBD5E1',
    semiMajorAxisAU: 0.00257, // 384,400 km
    orbitalPeriodDays: 27.32,
    orbitalVelocityKmS: 1.022,
    eccentricity: 0.0549,
    inclinationDeg: 5.14,
    radiusKm: 1737.4,
    massKg: '7.342 × 10²²',
    surfaceGravityMS2: 1.62,
    meanTempK: 220,
    axialTiltDeg: 1.54,
    atmosphere: [
      { element: 'Helium (He)', percent: 35.0, color: '#F59E0B' },
      { element: 'Neon (Ne)', percent: 30.0, color: '#38BDF8' },
      { element: 'Hydrogen (H₂)', percent: 20.0, color: '#34D399' },
      { element: 'Argon (Ar)', percent: 15.0, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Apollo 11', year: '1969', agency: 'NASA', summary: 'First crewed lunar landing on Mare Tranquillitatis, returning 21.5 kg of lunar regolith rock samples.' },
      { name: 'Lunar Reconnaissance Orbiter', year: '2009–Pres.', agency: 'NASA', summary: 'Sub-meter scale 3D laser altimeter mapping and confirmation of volatiles at Shackleton Crater.' }
    ]
  },

  mars: {
    id: 'mars',
    name: 'Mars',
    designation: 'PLANET-04',
    classification: 'Terrestrial / Oxidized Desert Planet',
    summary: 'The Red Planet, distinguished by iron-oxide dust, the solar system’s largest shield volcano (Olympus Mons, 21.9 km), and ancient catastrophic paleochannel fluvial systems.',
    visualScale: 0.85,
    orbitRadiusNorm: 50.0,
    orbitSpeedNorm: 0.53,
    color: '#EF4444',
    semiMajorAxisAU: 1.524,
    orbitalPeriodDays: 686.98,
    orbitalVelocityKmS: 24.07,
    eccentricity: 0.0934,
    inclinationDeg: 1.85,
    radiusKm: 3389.5,
    massKg: '6.417 × 10²³',
    surfaceGravityMS2: 3.72,
    meanTempK: 210,
    axialTiltDeg: 25.19,
    atmosphere: [
      { element: 'Carbon Dioxide (CO₂)', percent: 95.32, color: '#F59E0B' },
      { element: 'Nitrogen (N₂)', percent: 2.60, color: '#38BDF8' },
      { element: 'Argon (Ar)', percent: 1.90, color: '#94A3B8' },
      { element: 'Oxygen / Water', percent: 0.18, color: '#34D399' }
    ],
    missions: [
      { name: 'Perseverance & Ingenuity', year: '2020–Pres.', agency: 'NASA / JPL', summary: 'Active core-sample cache in Jezero Crater delta and 72 autonomous aerial flights validating rotorcraft aerodynamics.' },
      { name: 'Curiosity (MSL)', year: '2011–Pres.', agency: 'NASA / JPL', summary: 'Traversing Gale Crater, verifying persistent neutral-pH habitable aqueous lacustrine conditions in ancient mudstones.' }
    ]
  },

  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    designation: 'PLANET-05',
    classification: 'Gas Giant / Jovian Megasystem',
    summary: 'The colossal titan of the solar system, holding 2.5 times the mass of all other planets combined. Encompasses a roaring magnetosphere, deep zonal jetstreams, and the 350-year Great Red Spot storm vortex.',
    visualScale: 2.50,
    orbitRadiusNorm: 43.0,
    orbitSpeedNorm: 0.084,
    color: '#D97706',
    semiMajorAxisAU: 5.204,
    orbitalPeriodDays: 4332.59,
    orbitalVelocityKmS: 13.07,
    eccentricity: 0.0489,
    inclinationDeg: 1.30,
    radiusKm: 69911.0,
    massKg: '1.898 × 10²⁷',
    surfaceGravityMS2: 24.79,
    meanTempK: 165,
    axialTiltDeg: 3.13,
    atmosphere: [
      { element: 'Hydrogen (H₂)', percent: 89.8, color: '#38BDF8' },
      { element: 'Helium (He)', percent: 10.2, color: '#F59E0B' },
      { element: 'Methane (CH₄)', percent: 0.3, color: '#34D399' },
      { element: 'Ammonia (NH₃)', percent: 0.026, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Juno Orbiter', year: '2016–Pres.', agency: 'NASA', summary: 'Polar elliptical orbit mapping gravitational and magnetic fields, discovering a diffuse, diluted metallic core.' },
      { name: 'Galileo', year: '1989–2003', agency: 'NASA', summary: 'First dedicated Jovian orbiter; deployed atmospheric penetration probe and confirmed subsurface oceans on Europa.' }
    ]
  },

  saturn: {
    id: 'saturn',
    name: 'Saturn',
    designation: 'PLANET-06',
    classification: 'Gas Giant / Ringed Jovian System',
    summary: 'The jewel of the solar system, characterized by its majestic, 282,000-km-wide icy ring system and least dense bulk composition (0.687 g/cm³, buoyant in water).',
    visualScale: 1.95,
    orbitRadiusNorm: 35.0,
    orbitSpeedNorm: 0.034,
    color: '#EAB308',
    semiMajorAxisAU: 9.582,
    orbitalPeriodDays: 10759.22,
    orbitalVelocityKmS: 9.68,
    eccentricity: 0.0565,
    inclinationDeg: 2.49,
    radiusKm: 58232.0,
    massKg: '5.683 × 10²⁶',
    surfaceGravityMS2: 10.44,
    meanTempK: 134,
    axialTiltDeg: 26.73,
    atmosphere: [
      { element: 'Hydrogen (H₂)', percent: 96.3, color: '#38BDF8' },
      { element: 'Helium (He)', percent: 3.25, color: '#F59E0B' },
      { element: 'Methane (CH₄)', percent: 0.45, color: '#34D399' },
      { element: 'Ammonia (NH₃)', percent: 0.02, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Cassini-Huygens', year: '1997–2017', agency: 'NASA / ESA / ASI', summary: '13-year landmark orbital study discovering Enceladus cryovolcanic water vapor geysers and landing Huygens on Titan.' },
      { name: 'Voyager 1 & 2', year: '1980–1981', agency: 'NASA', summary: 'Historic reconnaissance revealing intricate spoke structures, density waves, and thousands of distinct ringlets.' }
    ]
  },

  uranus: {
    id: 'uranus',
    name: 'Uranus',
    designation: 'PLANET-07',
    classification: 'Ice Giant / Extreme Obliquity Planet',
    summary: 'An ice giant rolling through space on its side due to a dramatic 97.77° axial tilt (likely caused by an ancient protoplanetary impact), experiencing 42-year long seasonal daylight and night cycles.',
    visualScale: 1.30,
    orbitRadiusNorm: 28.0,
    orbitSpeedNorm: 0.012,
    color: '#38BDF8',
    semiMajorAxisAU: 19.20,
    orbitalPeriodDays: 30685.4,
    orbitalVelocityKmS: 6.80,
    eccentricity: 0.0463,
    inclinationDeg: 0.77,
    radiusKm: 25362.0,
    massKg: '8.681 × 10²⁵',
    surfaceGravityMS2: 8.69,
    meanTempK: 76,
    axialTiltDeg: 97.77,
    atmosphere: [
      { element: 'Hydrogen (H₂)', percent: 82.5, color: '#38BDF8' },
      { element: 'Helium (He)', percent: 15.2, color: '#F59E0B' },
      { element: 'Methane (CH₄)', percent: 2.3, color: '#34D399' },
      { element: 'Hydrogen Deuteride', percent: 0.009, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Voyager 2', year: '1986', agency: 'NASA', summary: 'Only spacecraft to visit Uranus, discovering 10 new moons, 2 new rings, and measuring the off-center, tilted magnetic dipole.' }
    ]
  },

  neptune: {
    id: 'neptune',
    name: 'Neptune',
    designation: 'PLANET-08',
    classification: 'Ice Giant / Supersonic Methane Giant',
    summary: 'The most distant classical planet in our solar system. Bathed in a deep cobalt blue from upper atmospheric methane absorption, and whipped by the highest sustained wind speeds recorded in the solar system (over 2,100 km/h).',
    visualScale: 1.25,
    orbitRadiusNorm: 22.0,
    orbitSpeedNorm: 0.006,
    color: '#2563EB',
    semiMajorAxisAU: 30.05,
    orbitalPeriodDays: 60189.0,
    orbitalVelocityKmS: 5.43,
    eccentricity: 0.0095,
    inclinationDeg: 1.77,
    radiusKm: 24622.0,
    massKg: '1.024 × 10²⁶',
    surfaceGravityMS2: 11.15,
    meanTempK: 72,
    axialTiltDeg: 28.32,
    atmosphere: [
      { element: 'Hydrogen (H₂)', percent: 80.0, color: '#38BDF8' },
      { element: 'Helium (He)', percent: 19.0, color: '#F59E0B' },
      { element: 'Methane (CH₄)', percent: 1.5, color: '#34D399' },
      { element: 'Ethane / Trace', percent: 0.01, color: '#94A3B8' }
    ],
    missions: [
      { name: 'Voyager 2', year: '1989', agency: 'NASA', summary: 'Dramatic close flyby within 4,950 km of the north pole, discovering the Great Dark Spot and retrograde nitrogen geysers on Triton.' }
    ]
  }
};

// Freeze dataset for immutable runtime performance
if (typeof Object.freeze === 'function') {
  Object.freeze(ORBITA_TELEMETRY);
}
