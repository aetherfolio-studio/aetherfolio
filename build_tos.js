const fs = require('fs');
const { assemblePage } = require('./build_projects.js');

// 1. WORK
assemblePage({
  filename: 'work.html',
  activeRoute: '/work',
  title: 'Selected Work & Case Studies — Aetherfolio',
  description: 'Explore live production systems and case studies engineered by Aetherfolio Studio, featuring Kairo Hospital OS, custom WebGL interfaces, and Next.js platforms.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work',
  bodyContent: `
<!-- Page Hero: Orthographic Blueprint & Radar Theme -->
<section class="relative pt-28 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Unique Background Decoration: Orthographic Radar & Coordinate Grid -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <!-- Atmospheric glow pools -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-primary/10 blur-[100px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-emerald-500/10 blur-[80px]"></div>
    
    <!-- Rotating Blueprint Radar Ring -->
    <svg class="dec-radar-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-25" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="250" cy="250" r="240" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="4 8"/>
      <circle cx="250" cy="250" r="170" stroke="rgba(93,217,207,0.2)" stroke-width="1"/>
      <circle cx="250" cy="250" r="100" stroke="rgba(255,180,165,0.25)" stroke-width="1" stroke-dasharray="2 4"/>
      <line x1="250" y1="10" x2="250" y2="490" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <line x1="10" y1="250" x2="490" y2="250" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      <!-- Radar Sweep Line -->
      <g class="dec-radar-sweep">
        <line x1="250" y1="250" x2="250" y2="10" stroke="url(#radarGradient)" stroke-width="2"/>
      </g>
      <defs>
        <linearGradient id="radarGradient" x1="250" y1="250" x2="250" y2="10" gradientUnits="userSpaceOnUse">
          <stop stop-color="rgba(93,217,207,0)"/>
          <stop offset="1" stop-color="rgba(93,217,207,0.8)"/>
        </linearGradient>
      </defs>
    </svg>
  </div>

  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Verified Production Index</span>
    <span class="text-on-surface-variant/40">•</span>
    <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">[ 04 ACTIVE SYSTEMS ]</span>
  </div>

  <h1 class="font-display-xl text-[56px] sm:text-[76px] md:text-[96px] text-on-surface tracking-tighter leading-[0.95] mb-6">
    Engineering <br class="hidden sm:block"/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-light italic">Digital Excellence</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-10">
    A curated index of production digital platforms, interactive WebGL applications, and custom design systems. Handcrafted from scratch for 60fps performance and measurable scale.
  </p>

  <!-- Telemetry Bar -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-surface-container/50 border border-white/10 text-xs font-label-caps text-left">
    <div>
      <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[10px] mb-0.5">Core Web Vitals</span>
      <span class="text-emerald-400 font-semibold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100/100 Perfect</span>
    </div>
    <div>
      <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[10px] mb-0.5">Animation Standard</span>
      <span class="text-on-surface font-semibold">60–120 FPS GPU</span>
    </div>
    <div>
      <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[10px] mb-0.5">Source Architecture</span>
      <span class="text-on-surface font-semibold">100% Handcrafted</span>
    </div>
    <div>
      <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[10px] mb-0.5">Codebase Ownership</span>
      <span class="text-primary font-semibold">100% Client IP</span>
    </div>
  </div>
</section>

<!-- Projects Showcase -->
<section class="w-full pb-28 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">

    <!-- PROJECT 1: KAIRO HOSPITAL OS (Flagship Feature) -->
    <div class="border-beam-card bg-surface-container/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/25 transition-colors duration-700 pointer-events-none"></div>
      
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
        <div class="flex flex-col gap-6 max-w-2xl">
          <div class="flex flex-wrap items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // Flagship Clinical SaaS</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-xs text-emerald-400 tracking-widest">LIVE ON EDGE</span>
          </div>

          <h2 class="font-display-xl text-[36px] sm:text-[48px] md:text-[54px] text-on-surface leading-tight">
            Kairo <span class="italic font-light text-primary">Hospital OS</span>
          </h2>

          <p class="font-body-md text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
            A bespoke, full-stack healthcare operations platform. Engineered with an interactive 3D hospital digital twin, surgical theater timeline orchestrator, 60fps continuous ECG waveform monitors, ward bed floor matrices with 1-click sanitization dispatch, and ambient AI clinical reasoning.
          </p>

          <!-- Metrics Row -->
          <div class="grid grid-cols-3 gap-3 p-4 rounded-xl bg-surface-container-high/60 border border-white/10 text-xs font-label-caps">
            <div>
              <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[9px] mb-0.5">ECG Telemetry</span>
              <span class="text-primary font-bold">60 FPS Native</span>
            </div>
            <div>
              <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[9px] mb-0.5">Lighthouse Score</span>
              <span class="text-emerald-400 font-bold">100 / 100</span>
            </div>
            <div>
              <span class="text-on-surface-variant/60 uppercase tracking-widest block text-[9px] mb-0.5">Codebase</span>
              <span class="text-secondary font-bold">100% TypeScript</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-1">
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/10">Next.js 15.5</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/10">React 19</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/10">TypeScript</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/10">Tailwind CSS v4</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/10">HTML5 Canvas 2D</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-72">
          <a href="/work/kairo" class="tactile-press w-full px-6 py-4 font-label-caps text-xs text-background bg-paper-white hover:bg-surface-tint rounded-full flex items-center justify-center gap-2 transition-all shadow-lg font-medium">
            <span>Read Case Study</span>
            <span class="material-symbols-outlined text-[16px]">menu_book</span>
          </a>
          <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-4 font-label-caps text-xs text-on-surface bg-surface-container-high/90 hover:bg-surface-container-high border border-white/15 hover:border-primary/40 rounded-full flex items-center justify-center gap-2 transition-all shadow-md">
            <span>Launch Live Platform</span>
            <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
          <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-3.5 font-label-caps text-xs text-on-surface-variant hover:text-on-surface bg-surface-container border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center gap-2 transition-all">
            <span>Public GitHub Repo</span>
            <span class="material-symbols-outlined text-[16px]">code</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 3-COLUMN SECONDARY PRODUCTION SHOWCASE -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Card 2: WebGL Fluid Engine -->
      <div class="border-beam-card bg-surface-container/40 p-8 rounded-3xl flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-[10px] text-tertiary tracking-widest uppercase font-semibold">02 // WebGL Physics</span>
            <span class="px-2.5 py-0.5 rounded-full bg-tertiary/10 text-tertiary text-[10px] font-label-caps border border-tertiary/20">60 FPS GLSL</span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface group-hover:text-primary transition-colors">
            Aether GPU Fluid Engine
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
            Real-time Navier-Stokes fluid physics solver with velocity advection, pressure Poisson Jacobi iterations, and dynamic chromatic dispersion.
          </p>
          <div class="flex flex-wrap gap-1.5 pt-2">
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">WebGL 2.0</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">GLSL Shaders</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">FBO Textures</span>
          </div>
        </div>
        <div class="pt-8">
          <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-primary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Read Engineering Breakdown &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Card 3: Zero-Bloat Next.js -->
      <div class="border-beam-card bg-surface-container/40 p-8 rounded-3xl flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase font-semibold">03 // Full-Stack Architecture</span>
            <span class="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-label-caps border border-secondary/20">Next.js 15</span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface group-hover:text-primary transition-colors">
            Zero-Bloat Next.js Framework
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
            Server Components architecture engineered for instantaneous FCP, zero runtime CSS parser overhead, and sub-50ms worldwide edge latency.
          </p>
          <div class="flex flex-wrap gap-1.5 pt-2">
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">RSC</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">Tailwind v4</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">Edge Middleware</span>
          </div>
        </div>
        <div class="pt-8">
          <a href="/journal/zero-bloat-frontend-architecture" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-primary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Read Architecture Report &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Card 4: Hardware-Accelerated UI Engine -->
      <div class="border-beam-card bg-surface-container/40 p-8 rounded-3xl flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
        <div class="flex flex-col gap-5">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-[10px] text-primary tracking-widest uppercase font-semibold">04 // Performance Benchmarks</span>
            <span class="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-label-caps border border-primary/20">0ms Jitter</span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface group-hover:text-primary transition-colors">
            Hardware Compositor Suite
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
            Complete elimination of browser layout thrashing, DOM reflow bottlenecks, and expensive backdrop-blur stalls across modern Chromium engines.
          </p>
          <div class="flex flex-wrap gap-1.5 pt-2">
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">GPU Compositing</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">Passive Observers</span>
            <span class="px-2.5 py-0.5 bg-surface-container-high rounded text-[10px] font-label-caps text-on-surface-variant">0ms INP</span>
          </div>
        </div>
        <div class="pt-8">
          <a href="/journal/eliminating-layout-thrashing-gpu" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-primary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Read Compositor Guide &rarr;</span>
          </a>
        </div>
      </div>

    </div>

    <!-- Bottom CTA Banner -->
    <div class="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-surface-container via-surface-container-high to-surface-container border border-white/10 text-center flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 blur-3xl pointer-events-none"></div>
      <span class="font-label-caps text-xs text-primary uppercase tracking-[0.25em]">Ready to Build?</span>
      <h2 class="font-display-xl text-[36px] sm:text-[48px] text-on-surface leading-tight max-w-2xl">
        Let’s Engineer Something <span class="italic font-light text-primary">Unforgettable</span>.
      </h2>
      <p class="font-body-md text-base text-on-surface-variant max-w-xl font-light">
        Accepting 1 select project for Q3/Q4. Direct collaboration with lead engineer Anish Kadian.
      </p>
      <a href="/contact" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs rounded-full font-semibold uppercase tracking-widest shadow-xl hover:bg-surface-tint transition-all">
        <span>Start a Project &rarr;</span>
      </a>
    </div>

  </div>
</section>
`
});

// Mirror to projects.html
fs.copyFileSync('work.html', 'projects.html');

// 2. KAIRO CASE STUDY
assemblePage({
  filename: 'work/kairo.html',
  activeRoute: '/work',
  title: 'Kairo Hospital OS Case Study — Aetherfolio',
  description: 'Detailed engineering case study for Kairo: an intelligent Hospital Operating System built with Next.js 15, React 19, TypeScript, and 60FPS Canvas 2D telemetry.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work/kairo',
  ogType: 'article',
  bodyContent: `
<article class="relative w-full max-w-4xl mx-auto px-6 py-16 overflow-hidden">
  <!-- Unique Background Decoration: Clinical ECG Pulse Wave -->
  <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary/10 blur-[90px]"></div>
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-emerald-500/10 blur-[70px]"></div>
    
    <!-- SVG Animated ECG Waveform -->
    <svg class="absolute top-10 left-0 w-full h-48 opacity-20" viewBox="0 0 1000 120" preserveAspectRatio="none" fill="none">
      <path class="dec-ecg-path" d="M0,60 L200,60 L220,60 L230,20 L240,100 L250,40 L260,75 L270,60 L450,60 L470,60 L480,15 L490,105 L500,35 L510,75 L520,60 L700,60 L720,60 L730,20 L740,100 L750,40 L760,75 L770,60 L1000,60" stroke="#E06D53" stroke-width="2" vector-effect="non-scaling-stroke"/>
    </svg>

  </div>

  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/work" class="hover:text-primary transition-colors">Work</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">Kairo Hospital OS</span>
  </nav>

  <header class="mb-12">
    <div class="inline-flex items-center gap-2.5 mb-4 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-caps text-xs">
      <span class="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse"></span>
      <span class="tracking-widest uppercase font-semibold">Production SaaS Case Study</span>
    </div>
    <h1 class="font-display-xl text-[44px] sm:text-[60px] md:text-[72px] text-on-surface tracking-tighter leading-[1.05] mb-6">
      Kairo: Intelligent <span class="italic font-light text-primary">Hospital Operating System</span>
    </h1>
    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed font-light mb-8">
      Architecting a modern, zero-latency clinical operating system that orchestrates beds, operating theaters, real-time spatial telemetry, and ambient AI clinical reasoning.
    </p>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-surface-container/40 border border-white/5 text-xs font-label-caps">
      <div>
        <span class="text-on-surface-variant/60 uppercase tracking-widest block mb-1">Role</span>
        <span class="text-on-surface font-medium">Frontend Architecture &amp; UI Engineering</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase tracking-widest block mb-1">Timeline</span>
        <span class="text-on-surface font-medium">Production Release</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase tracking-widest block mb-1">Stack</span>
        <span class="text-on-surface font-medium">Next.js 15 · React 19 · TS · Canvas 2D</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase tracking-widest block mb-1">Status</span>
        <span class="text-emerald-400 font-medium flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live &amp; Open Source</span>
      </div>
    </div>
  </header>

  <div class="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-white/[0.08]">
    <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press px-6 py-3 bg-paper-white text-background font-label-caps text-xs rounded-full flex items-center gap-2 shadow-md font-medium">
      <span>Launch Live Application</span>
      <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
    </a>
    <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press px-6 py-3 bg-surface-container-high text-on-surface font-label-caps text-xs rounded-full border border-white/10 hover:border-primary/40 flex items-center gap-2 transition-all">
      <span>View GitHub Repository</span>
      <span class="material-symbols-outlined text-[16px]">code</span>
    </a>
  </div>

  <div class="prose prose-invert max-w-none flex flex-col gap-14 font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed">
    <section>
      <h2 class="font-headline-md text-3xl text-on-surface mb-4">01 // The Executive Challenge</h2>
      <p class="mb-4">
        Modern clinical operations suffer from extreme software fragmentation. Hospital departments often operate across disjointed legacy systems for patient intake, surgical scheduling, floor bed management, and clinical telemetry. The result is administrative friction, operational blindspots, and clinician burnout.
      </p>
      <p>
        The objective for <strong>Kairo</strong> was to engineer an intuitive, spatial Hospital OS that unifies clinical operations into a single cohesive interface, delivering real-time telemetry, spatial ward twin visualization, and AI-assisted workflow automation without unnecessary cognitive load.
      </p>
    </section>

    <section>
      <h2 class="font-headline-md text-3xl text-on-surface mb-4">02 // Spatial UI/UX &amp; Design Architecture</h2>
      <p class="mb-4">
        Healthcare interfaces require high visual clarity and immediate decision-making capabilities. We established an obsidian/slate dark theme with warm coral highlights (<code class="text-primary font-mono text-sm bg-surface-container px-2 py-0.5 rounded">#E06D53</code>) to maintain optical comfort during long clinical shifts.
      </p>
      <p>Key spatial components include:</p>
      <ul class="list-disc pl-6 space-y-2 mt-4 text-on-surface">
        <li><strong>Interactive 3D Hospital Digital Twin:</strong> Architectural layout of 4 clinical wings (Wing A Emergency, Wing B ICU, Wing C Surgery, Wing D Pharmacy) with real-time room occupancy telemetry.</li>
        <li><strong>Live Surgical Suite Orchestrator:</strong> Real-time OR timelines with procedure phase tracking and emergency trauma overrides.</li>
        <li><strong>Ward Bed Capacity Matrix:</strong> Instant bed status filters (Occupied, Available, Sanitizing, Reserved) paired with a 1-click sanitization dispatch workflow.</li>
      </ul>
    </section>

    <section>
      <h2 class="font-headline-md text-3xl text-on-surface mb-4">03 // Engineering 60FPS Canvas Telemetry</h2>
      <p class="mb-4">
        One of the most technically demanding requirements was rendering real-time, continuous physiological ECG waveforms at 60–120 FPS alongside high-density operational data streams.
      </p>
      <div class="p-6 rounded-2xl bg-surface-container/60 border border-white/5 my-6">
        <h3 class="font-label-caps text-xs text-primary uppercase tracking-widest mb-2">Performance Optimization Case Study:</h3>
        <p class="text-sm leading-relaxed mb-3">
          In initial profiling, <code class="text-primary font-mono">canvas.width = canvas.offsetWidth * dpr</code> was executing inside every single <code class="text-primary font-mono">requestAnimationFrame</code> loop, forcing synchronous DOM layout invalidations up to 120 times per second across the entire page.
        </p>
        <p class="text-sm leading-relaxed">
          <strong>The Solution:</strong> We restructured canvas rendering to measure dimensions exclusively through a passive <code class="text-primary font-mono">ResizeObserver</code> and added an <code class="text-primary font-mono">IntersectionObserver</code> to automatically suspend rendering whenever the telemetry module is scrolled out of viewport. Additionally, all micro-animations were converted to GPU-composited 3D layers (<code class="text-primary font-mono">transform: translate3d(0, 0, 0)</code>).
        </p>
      </div>
    </section>

    <section>
      <h2 class="font-headline-md text-3xl text-on-surface mb-4">04 // Outcome &amp; Architecture Verification</h2>
      <p class="mb-4">
        Kairo delivers an uncompromising blend of aesthetic sophistication and raw computational performance. It serves as a live benchmark for modern healthcare frontend architecture.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div class="p-5 rounded-xl bg-surface-container/40 border border-white/5">
          <span class="font-label-caps text-[10px] text-primary uppercase tracking-widest block mb-1">Performance</span>
          <span class="font-headline-md text-2xl text-on-surface">100 / 100</span>
          <p class="text-xs text-on-surface-variant mt-1">Lighthouse score on desktop &amp; mobile.</p>
        </div>
        <div class="p-5 rounded-xl bg-surface-container/40 border border-white/5">
          <span class="font-label-caps text-[10px] text-secondary uppercase tracking-widest block mb-1">Frame Budget</span>
          <span class="font-headline-md text-2xl text-on-surface">60–120 FPS</span>
          <p class="text-xs text-on-surface-variant mt-1">Zero layout thrashing across all routes.</p>
        </div>
        <div class="p-5 rounded-xl bg-surface-container/40 border border-white/5">
          <span class="font-label-caps text-[10px] text-tertiary uppercase tracking-widest block mb-1">Bundle</span>
          <span class="font-headline-md text-2xl text-on-surface">Zero Bloat</span>
          <p class="text-xs text-on-surface-variant mt-1">Pure Next.js 15 &amp; Tailwind CSS v4.</p>
        </div>
      </div>
    </section>
  </div>

  <footer class="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-6">
    <a href="/work" class="inline-flex items-center gap-2 font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      <span>Back to All Work</span>
    </a>
    <a href="/contact" class="tactile-press px-8 py-3.5 bg-paper-white text-background font-label-caps text-xs rounded-full flex items-center gap-2 font-medium shadow-md">
      <span>Start a Similar Project</span>
      <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
    </a>
  </footer>
</article>
`
});

// 3. SERVICES
assemblePage({
  filename: 'services.html',
  activeRoute: '/services',
  title: 'Services & Frontend Engineering Capabilities — Aetherfolio',
  description: 'Explore custom web development, interactive 3D WebGL interfaces, high-conversion landing pages, and frontend performance architecture by Aetherfolio Studio.',
  canonicalUrl: 'https://aetherfolio.vercel.app/services',
  bodyContent: `
<!-- Services Hero: Kinetic Circuit Node Network Theme -->
<section class="relative pt-28 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Unique Background Decoration: SVG Circuit Nodes & Flowing Data Packets -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <!-- Warm amber & coral aura -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/10 blur-[110px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] bg-primary/15 blur-[80px]"></div>
    
    <!-- SVG Isometric Circuit Lattice -->
    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] opacity-30" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Circuit Traces -->
      <path class="dec-circuit-trace" d="M100,225 L250,225 L350,125 L550,125 L650,225 L750,225" stroke="#f59e0b" stroke-width="1.5"/>
      <path class="dec-circuit-trace" d="M150,325 L300,325 L400,225 L500,225 L600,325 L700,325" stroke="#ffb4a5" stroke-width="1.5" style="animation-delay: 1.5s;"/>
      <!-- Circuit Nodes -->
      <circle cx="250" cy="225" r="4" fill="#f59e0b"/>
      <circle cx="350" cy="125" r="4" fill="#5dd9cf"/>
      <circle cx="550" cy="125" r="4" fill="#ffb4a5"/>
      <circle cx="650" cy="225" r="4" fill="#f59e0b"/>
      <circle cx="400" cy="225" r="5" fill="#ffffff" stroke="#ffb4a5" stroke-width="2"/>
    </svg>

    <!-- Floating Prism Element -->
    <div class="dec-float-prism absolute top-12 right-16 w-8 h-8 border border-amber-400/30 rotate-45 hidden md:block"></div>
    <div class="dec-float-prism absolute bottom-12 left-16 w-6 h-6 border border-primary/30 -rotate-12 hidden md:block" style="animation-delay: 2s;"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Bespoke Engineering Capabilities</span>
  </div>

  <h1 class="font-display-xl text-[56px] sm:text-[76px] md:text-[96px] text-on-surface tracking-tighter leading-[0.95] mb-6">
    Services &amp; <br class="hidden sm:block"/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-primary to-surface-tint font-light italic">Capabilities</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-10">
    Bespoke frontend engineering, custom WebGL interfaces, and high-conversion platforms tailored for ambitious founders and product teams who demand 60fps perfection.
  </p>
</section>

<!-- 4 Core Capabilities Grid -->
<section class="w-full pb-28 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Service 1 -->
      <div class="border-beam-card bg-surface-container/40 p-8 sm:p-10 rounded-3xl flex flex-col justify-between group">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // Web Applications</span>
            <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-label-caps border border-primary/20">Full-Stack Next.js</span>
          </div>
          <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-primary transition-colors">
            Custom Web &amp; SaaS Platforms
          </h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed font-light">
            End-to-end frontend architecture for complex dashboards, interactive portals, and software platforms. Built with React 19, Next.js 15, robust TypeScript typing, and high-throughput real-time state management.
          </p>
          <div class="space-y-2 pt-2 text-xs font-label-caps text-on-surface-variant">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Full-stack Next.js App Router Architecture</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Real-time WebSocket &amp; Canvas Telemetry</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> 100% Type-Safe APIs &amp; Server Actions</div>
          </div>
        </div>
        <div class="pt-8 border-t border-white/5 mt-8">
          <a href="/contact" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-primary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Commission Platform &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Service 2 -->
      <div class="border-beam-card bg-surface-container/40 p-8 sm:p-10 rounded-3xl flex flex-col justify-between group">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold">02 // 3D &amp; Creative</span>
            <span class="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-xs font-label-caps border border-tertiary/20">60 FPS WebGL</span>
          </div>
          <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-tertiary transition-colors">
            Interactive 3D &amp; WebGL Systems
          </h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed font-light">
            Bespoke Three.js scenes, custom GLSL shaders, particle physics, and scroll-linked storytelling. Designed to leave unforgettable impressions while maintaining zero CPU idle overhead.
          </p>
          <div class="space-y-2 pt-2 text-xs font-label-caps text-on-surface-variant">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Custom GLSL Vertex &amp; Fragment Shaders</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Interactive Liquid Physics &amp; Mesh Morphing</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Mobile-Optimized 60 FPS Viewport Observers</div>
          </div>
        </div>
        <div class="pt-8 border-t border-white/5 mt-8">
          <a href="/contact" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-tertiary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Commission 3D Experience &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Service 3 -->
      <div class="border-beam-card bg-surface-container/40 p-8 sm:p-10 rounded-3xl flex flex-col justify-between group">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">03 // Conversion Sites</span>
            <span class="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-label-caps border border-secondary/20">High Conversion</span>
          </div>
          <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-secondary transition-colors">
            Flagship Marketing &amp; Brand Sites
          </h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed font-light">
            Story-driven landing pages that convert visitors into loyal clients. Tailored typography, micro-interactions, smooth scroll physics, and rock-solid technical SEO foundations.
          </p>
          <div class="space-y-2 pt-2 text-xs font-label-caps text-on-surface-variant">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Editorial Typography &amp; Bespoke UI Kits</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Structured JSON-LD &amp; Technical SEO</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Interactive Lead Capture &amp; Calculators</div>
          </div>
        </div>
        <div class="pt-8 border-t border-white/5 mt-8">
          <a href="/contact" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-secondary hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Commission Brand Site &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Service 4 -->
      <div class="border-beam-card bg-surface-container/40 p-8 sm:p-10 rounded-3xl flex flex-col justify-between group">
        <div class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-muted-gold tracking-[0.25em] uppercase font-semibold">04 // Performance</span>
            <span class="px-3 py-1 rounded-full bg-muted-gold/10 text-muted-gold text-xs font-label-caps border border-muted-gold/20">100/100 Audit</span>
          </div>
          <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-muted-gold transition-colors">
            Zero-Bloat Performance Audits
          </h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed font-light">
            Comprehensive diagnostic overhaul of sluggish codebases. We eliminate layout thrashing, purge render-blocking third-party libraries, and achieve flawless 100/100 Core Web Vitals.
          </p>
          <div class="space-y-2 pt-2 text-xs font-label-caps text-on-surface-variant">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-muted-gold"></span> Sub-50ms First Contentful Paint (FCP)</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-muted-gold"></span> Complete Layout Thrashing Elimination</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-muted-gold"></span> Edge Serverless Route Optimization</div>
          </div>
        </div>
        <div class="pt-8 border-t border-white/5 mt-8">
          <a href="/contact" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-muted-gold hover:text-surface-tint uppercase tracking-widest transition-colors">
            <span>Commission Performance Audit &rarr;</span>
          </a>
        </div>
      </div>

    </div>

    <!-- 4-Phase Delivery Process -->
    <div class="flex flex-col gap-8 p-10 md:p-14 rounded-3xl bg-surface-container/40 border border-white/10">
      <div class="flex flex-col gap-2">
        <span class="font-label-caps text-xs text-primary uppercase tracking-[0.25em]">Workflow</span>
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface">The 4-Phase Engineering Sprint</h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        <div class="p-6 rounded-2xl bg-surface-container-high/40 border border-white/5">
          <span class="font-label-caps text-xs text-primary block mb-2">Phase 01 // Blueprint</span>
          <h3 class="font-headline-md text-lg text-on-surface mb-2">Discovery &amp; Spec</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">Technical architecture scoping, information hierarchy, and performance targets aligned within 72 hours.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container-high/40 border border-white/5">
          <span class="font-label-caps text-xs text-secondary block mb-2">Phase 02 // Prototype</span>
          <h3 class="font-headline-md text-lg text-on-surface mb-2">Interactive Preview</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">Live staging URL deployment with bespoke UI components, typography, and motion primitives.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container-high/40 border border-white/5">
          <span class="font-label-caps text-xs text-tertiary block mb-2">Phase 03 // Production</span>
          <h3 class="font-headline-md text-lg text-on-surface mb-2">Zero-Bloat Code</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">Handcrafted Next.js &amp; WebGL implementation, semantic accessibility, and 60fps compositor optimization.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container-high/40 border border-white/5">
          <span class="font-label-caps text-xs text-emerald-400 block mb-2">Phase 04 // Launch</span>
          <h3 class="font-headline-md text-lg text-on-surface mb-2">Edge Deployment</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">Global CDN edge propagation, Lighthouse 100/100 verification, and 100% source code repository handover.</p>
        </div>
      </div>
    </div>

    <!-- Standards of Delivery Grid -->
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-container/50 border border-white/5">
      <div class="max-w-2xl mb-8">
        <span class="font-label-caps text-xs text-primary uppercase tracking-widest block mb-2">Standards of Delivery</span>
        <h3 class="font-headline-md text-[32px] text-on-surface">What Every Project Includes</h3>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-body-md text-sm text-on-surface-variant">
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">100% Code Ownership</strong>
          Full GitHub repository handover with zero recurring lock-in fees.
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">100/100 Lighthouse</strong>
          Engineered for top-tier speed, SEO crawlability, and accessibility.
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">Type-Safe TypeScript</strong>
          Strictly typed components and API clients for longevity.
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">Edge Deployment</strong>
          Configured on Vercel with custom caching, SSL, and security headers.
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">Direct Communication</strong>
          Direct engineer-to-client collaboration without account managers.
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <strong class="text-on-surface block mb-1">Post-Launch Support</strong>
          2 weeks of complimentary bug fixes and production tuning.
        </div>
      </div>
    </div>

    <div class="text-center pt-4">
      <a href="/contact" class="tactile-press px-9 py-4 font-label-caps text-sm text-background bg-paper-white hover:bg-surface-tint transition-all duration-300 rounded-full inline-flex items-center gap-3 shadow-xl font-medium">
        <span>Request a Project Quote &rarr;</span>
      </a>
    </div>
  </div>
</section>
`
});

// 4. ABOUT
assemblePage({
  filename: 'about.html',
  activeRoute: '/about',
  title: 'About Studio & Engineering Standards — Aetherfolio',
  description: 'Learn about Anish Kadian, lead creative engineer at Aetherfolio. Handcrafting bespoke Next.js platforms, WebGL shaders, and high-performance frontend systems.',
  canonicalUrl: 'https://aetherfolio.vercel.app/about',
  bodyContent: `
<!-- About Hero: Monolithic Watermark & Optical Prism Theme -->
<section class="relative pt-28 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Unique Background Decoration: Giant Watermark & Optical Prism Caustic -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <!-- Optical Prism Shimmer Glow -->
    <div class="dec-prism-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-r from-purple-500/15 via-primary/20 to-teal-400/15 blur-[100px]"></div>
    
    <!-- Colossal Watermark Outline Typography -->
    <div class="dec-watermark-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[110px] sm:text-[160px] md:text-[200px] whitespace-nowrap tracking-widest opacity-20">
      AETHERFOLIO
    </div>

    <!-- Datum Compass Geometry Ring -->
    <svg class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-15" viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="190" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-dasharray="2 6"/>
      <polygon points="200,20 210,190 380,200 210,210 200,380 190,210 20,200 190,190" stroke="rgba(255,180,165,0.4)" stroke-width="1" fill="none"/>
    </svg>

  </div>

  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Studio Profile &amp; Ethos</span>
  </div>

  <h1 class="font-display-xl text-[56px] sm:text-[76px] md:text-[96px] text-on-surface tracking-tighter leading-[0.95] mb-6">
    Craftsmanship <br class="hidden sm:block"/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-light italic">Over Convenience</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-10">
    Aetherfolio is an independent creative engineering studio founded by <strong>Anish Kadian</strong>. I partner with founders and product leaders who value bespoke code, 60fps fluidity, and zero template bloat.
  </p>
</section>

<!-- Studio Manifesto & Toolchain -->
<section class="w-full pb-28 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">

    <!-- 3 Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="p-8 sm:p-10 rounded-3xl bg-surface-container/40 border border-white/10 flex flex-col gap-4">
        <span class="font-label-caps text-xs text-primary uppercase tracking-widest">Pillar 01</span>
        <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface">No Commercial Templates</h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
          Templates carry bloated dependencies, generic visual patterns, and unpredictable layout thrashing. Every line of code at Aetherfolio is written by hand for your specific product goals.
        </p>
      </div>

      <div class="p-8 sm:p-10 rounded-3xl bg-surface-container/40 border border-white/10 flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Pillar 02</span>
        <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface">The 60 FPS Standard</h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
          Interfaces should feel as responsive and physical as fine machinery. We profile every animation frame, promote animated elements to dedicated GPU layers, and eliminate DOM reflows.
        </p>
      </div>

      <div class="p-8 sm:p-10 rounded-3xl bg-surface-container/40 border border-white/10 flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Pillar 03</span>
        <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface">Direct Engineer Access</h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed font-light">
          No account managers or middle layers. You communicate directly with the lead engineer building your product, resulting in rapid iteration cycles and uncompromising code quality.
        </p>
      </div>
    </div>

    <!-- Interactive Toolchain Radar -->
    <div class="p-10 md:p-14 rounded-3xl bg-surface-container/40 border border-white/10 flex flex-col gap-8">
      <div>
        <span class="font-label-caps text-xs text-primary uppercase tracking-[0.25em] block mb-1">Toolchain</span>
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface">Modern Engineering Stack</h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-label-caps">
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <span class="text-primary font-semibold block mb-1">Next.js 15 &amp; React 19</span>
          <span class="text-on-surface-variant/70 text-[11px]">Server Components &amp; Edge Actions</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <span class="text-secondary font-semibold block mb-1">TypeScript Strict</span>
          <span class="text-on-surface-variant/70 text-[11px]">100% Type-Safe Architecture</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <span class="text-tertiary font-semibold block mb-1">Three.js &amp; GLSL</span>
          <span class="text-on-surface-variant/70 text-[11px]">Custom WebGL Shaders &amp; Physics</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/5">
          <span class="text-emerald-400 font-semibold block mb-1">Tailwind CSS v4</span>
          <span class="text-on-surface-variant/70 text-[11px]">Zero-Runtime Atomic Utilities</span>
        </div>
      </div>
    </div>

    <div class="text-center">
      <a href="/contact" class="tactile-press px-8 py-4 font-label-caps text-xs text-background bg-paper-white hover:bg-surface-tint transition-colors duration-300 rounded-full inline-flex items-center gap-2.5 font-medium shadow-lg">
        <span>Get in Touch with Anish &rarr;</span>
      </a>
    </div>

  </div>
</section>
`
});

// 5. JOURNAL
assemblePage({
  filename: 'journal.html',
  activeRoute: '/journal',
  title: 'Technical Journal & Engineering Insights — Aetherfolio',
  description: 'Deep-dive technical articles on WebGL fluid dynamics, zero-bloat Next.js frontend architecture, and DOM performance optimization.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal',
  bodyContent: `
<!-- Journal Hero: Editorial Print Matrix & Syntax Stream Theme -->
<section class="relative pt-28 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Unique Background Decoration: Editorial Alignment Rulers & Floating Code -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <!-- Deep lavender aura -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[100px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-primary/15 blur-[80px]"></div>
    
  </div>

  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Technical Journal</span>
  </div>

  <h1 class="font-display-xl text-[56px] sm:text-[76px] md:text-[96px] text-on-surface tracking-tighter leading-[0.95] mb-6">
    Engineering <br class="hidden sm:block"/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-surface-tint font-light italic">Insights</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-10">
    In-depth architectural breakdowns, WebGL optimization guides, and performance engineering reports from the Aetherfolio laboratory.
  </p>
</section>

<!-- Articles Grid -->
<section class="w-full pb-28 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-10">
    
    <!-- Article 1 -->
    <article class="border-beam-card bg-surface-container/40 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group">
      <div class="flex flex-col gap-4 max-w-2xl">
        <div class="flex items-center gap-3 font-label-caps text-xs text-primary">
          <span class="tracking-widest uppercase font-semibold">WebGL &amp; Shaders</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="text-on-surface-variant/70">8 min read</span>
        </div>
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-primary transition-colors">
          <a href="/journal/webgl-fluid-dynamics-at-60fps">Simulating Real-Time Navier-Stokes Fluid Dynamics in WebGL at 60 FPS</a>
        </h2>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          A mathematical and GPU-shader breakdown of advection, divergence, pressure Poisson equations, and Jacobi iteration solvers running on mobile browsers.
        </p>
      </div>
      <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press px-6 py-3.5 bg-surface-container-high text-on-surface border border-white/10 hover:border-primary/40 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
        <span>Read Article &rarr;</span>
      </a>
    </article>

    <!-- Article 2 -->
    <article class="border-beam-card bg-surface-container/40 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group">
      <div class="flex flex-col gap-4 max-w-2xl">
        <div class="flex items-center gap-3 font-label-caps text-xs text-secondary">
          <span class="tracking-widest uppercase font-semibold">Next.js &amp; Architecture</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="text-on-surface-variant/70">6 min read</span>
        </div>
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-secondary transition-colors">
          <a href="/journal/zero-bloat-frontend-architecture">Zero-Bloat Next.js Architecture: Achieving Perfect 100/100 Core Web Vitals</a>
        </h2>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          Why commercial templates kill conversion rates and how to structure Next.js App Router applications for instant sub-50ms edge rendering.
        </p>
      </div>
      <a href="/journal/zero-bloat-frontend-architecture" class="tactile-press px-6 py-3.5 bg-surface-container-high text-on-surface border border-white/10 hover:border-secondary/40 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
        <span>Read Article &rarr;</span>
      </a>
    </article>

    <!-- Article 3 -->
    <article class="border-beam-card bg-surface-container/40 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group">
      <div class="flex flex-col gap-4 max-w-2xl">
        <div class="flex items-center gap-3 font-label-caps text-xs text-tertiary">
          <span class="tracking-widest uppercase font-semibold">Performance Engineering</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="text-on-surface-variant/70">5 min read</span>
        </div>
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface group-hover:text-tertiary transition-colors">
          <a href="/journal/eliminating-layout-thrashing-gpu">Hardware Acceleration &amp; Eliminating Layout Thrashing on Modern Browsers</a>
        </h2>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          How to prevent DOM layout invalidation traps, leverage passive resize observers, and use GPU layer promotion to guarantee 60–120 FPS animations.
        </p>
      </div>
      <a href="/journal/eliminating-layout-thrashing-gpu" class="tactile-press px-6 py-3.5 bg-surface-container-high text-on-surface border border-white/10 hover:border-tertiary/40 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
        <span>Read Article &rarr;</span>
      </a>
    </article>

  </div>
</section>
`
});

// 6. THREE ARTICLES
assemblePage({
  filename: 'journal/webgl-fluid-dynamics-at-60fps.html',
  activeRoute: '/journal',
  title: 'Engineering 60FPS Fluid Dynamics & WebGL Shaders — Aetherfolio Journal',
  description: 'How to implement a high-performance in-house Navier-Stokes fluid dynamics solver and GLSL liquid shaders in WebGL 2.0 without library bloat.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/webgl-fluid-dynamics-at-60fps',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-16">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">WebGL Fluid Dynamics</span>
  </nav>

  <header class="mb-12">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">WebGL &amp; Graphics</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">6 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[54px] text-on-surface tracking-tighter leading-tight mb-6">
      Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL
    </h1>
    <p class="font-body-lg text-lg text-on-surface-variant leading-relaxed font-light">
      How we designed an in-house Navier-Stokes fluid solver and liquid GLSL shaders without external heavy canvas bundles.
    </p>
  </header>

  <div class="prose prose-invert max-w-none font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed flex flex-col gap-8">
    <p>
      WebGL on the modern web often suffers from library bloat. Developers routinely import massive multi-megabyte engine packages merely to render subtle cursor fluid ripples or liquid background distortion.
    </p>
    <p>
      At Aetherfolio, we engineered our fluid simulation directly on top of the WebGL 2.0 API using a discrete Eulerian grid solver for the incompressible Navier-Stokes equations:
    </p>
    <div class="p-6 rounded-2xl bg-surface-container/70 border border-white/5 font-mono text-xs sm:text-sm text-primary overflow-x-auto">
      <code>∂u/∂t = -(u · ∇)u - 1/ρ ∇p + ν∇²u + f</code>
    </div>
    <p>
      By implementing advection, divergence, pressure Poisson Jacobi iteration, and vorticity confinement in raw GLSL fragment shaders, the total JavaScript bundle footprint was kept under 34 KB while executing at a silky 60–120 FPS on all modern GPU architectures.
    </p>
    <h2 class="font-headline-md text-2xl text-on-surface mt-6">Optimizing for Zero Battery Drain</h2>
    <p>
      To prevent GPU thermal throttling and preserve mobile battery life, the simulation loop hooks directly into passive <code class="text-primary font-mono text-sm">IntersectionObserver</code> boundaries. When the canvas is not actively in view or when user motion ceases, the simulation automatically suspends Jacobi iterations.
    </p>
  </div>

  <footer class="mt-16 pt-8 border-t border-white/[0.08] flex justify-between items-center">
    <a href="/journal" class="font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      <span>Back to Journal</span>
    </a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background font-label-caps text-xs rounded-full font-medium shadow-md">
      <span>Discuss a Project</span>
    </a>
  </footer>
</article>
`
});

assemblePage({
  filename: 'journal/zero-bloat-frontend-architecture.html',
  activeRoute: '/journal',
  title: 'Zero-Bloat Frontend Architecture in Next.js — Aetherfolio Journal',
  description: 'Why bespoke code and zero-bloat Next.js architecture outperform generic templates in performance, maintenance, and brand identity.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/zero-bloat-frontend-architecture',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-16">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">Zero-Bloat Architecture</span>
  </nav>

  <header class="mb-12">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold">Next.js &amp; Architecture</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">8 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[54px] text-on-surface tracking-tighter leading-tight mb-6">
      Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue
    </h1>
    <p class="font-body-lg text-lg text-on-surface-variant leading-relaxed font-light">
      Why avoiding pre-built templates and bloated UI libraries yields faster websites, cleaner maintenance, and authentic brand identity.
    </p>
  </header>

  <div class="prose prose-invert max-w-none font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed flex flex-col gap-8">
    <p>
      The modern web development ecosystem is saturated with pre-made templates, WordPress site builders, and bloated component libraries. While these tools promise rapid deployment, they invariably introduce technical debt: excessive CSS cascades, unshakeable JavaScript dependencies, and generic brand aesthetics.
    </p>
    <p>
      At Aetherfolio, every production interface is architected from clean fundamentals. By leveraging Next.js 15 React Server Components (RSC) and Tailwind CSS v4, we deliver initial payloads that are up to 80% lighter than standard commercial templates.
    </p>
    <h2 class="font-headline-md text-2xl text-on-surface mt-6">Key Architecture Tenets</h2>
    <ul class="list-disc pl-6 space-y-2 text-on-surface">
      <li><strong>Strict Type Safety:</strong> 100% TypeScript data models from database to DOM.</li>
      <li><strong>Intentional Micro-Libraries:</strong> Zero multi-megabyte UI packs; bespoke CSS keyframe transforms and atomic state management.</li>
      <li><strong>Edge Scalability:</strong> Instant First Byte (TTFB) delivery via global edge CDN caching.</li>
    </ul>
  </div>

  <footer class="mt-16 pt-8 border-t border-white/[0.08] flex justify-between items-center">
    <a href="/journal" class="font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      <span>Back to Journal</span>
    </a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background font-label-caps text-xs rounded-full font-medium shadow-md">
      <span>Discuss a Project</span>
    </a>
  </footer>
</article>
`
});

assemblePage({
  filename: 'journal/eliminating-layout-thrashing-gpu.html',
  activeRoute: '/journal',
  title: 'Hardware Acceleration & Eliminating Layout Thrashing — Aetherfolio Journal',
  description: 'How to diagnose and eliminate layout thrashing in rAF animation loops and leverage GPU compositing layers for 60fps performance.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/eliminating-layout-thrashing-gpu',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-16">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">Hardware Acceleration</span>
  </nav>

  <header class="mb-12">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold">Performance &amp; DOM</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">5 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[54px] text-on-surface tracking-tighter leading-tight mb-6">
      Hardware Acceleration on the Web: Eliminating Layout Thrashing &amp; GPU Compositing
    </h1>
    <p class="font-body-lg text-lg text-on-surface-variant leading-relaxed font-light">
      A practical case study on fixing requestAnimationFrame layout recalculations and utilizing 3D transform layers for buttery-smooth 60fps scrolling.
    </p>
  </header>

  <div class="prose prose-invert max-w-none font-body-md text-on-surface-variant text-base sm:text-lg leading-relaxed flex flex-col gap-8">
    <p>
      Browser layout thrashing occurs when JavaScript repeatedly reads and writes geometry properties (such as <code class="text-primary font-mono text-sm">offsetWidth</code> or <code class="text-primary font-mono text-sm">clientHeight</code>) within the same animation frame, forcing the browser's layout engine to recalculate document geometry on every tick.
    </p>
    <p>
      During the optimization of Kairo Hospital OS's continuous ECG telemetry, we eliminated all synchronous layout reads by decoupling dimensions into passive <code class="text-primary font-mono text-sm">ResizeObserver</code> callbacks.
    </p>
    <h2 class="font-headline-md text-2xl text-on-surface mt-6">GPU Layer Compositing</h2>
    <p>
      By promoting animated elements to their own GPU compositor layers using <code class="text-primary font-mono text-sm">transform: translate3d(0, 0, 0)</code>, <code class="text-primary font-mono text-sm">will-change: transform</code>, and <code class="text-primary font-mono text-sm">backface-visibility: hidden</code>, browser repaints are bypassed entirely during scroll and micro-animations.
    </p>
  </div>

  <footer class="mt-16 pt-8 border-t border-white/[0.08] flex justify-between items-center">
    <a href="/journal" class="font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest flex items-center gap-2">
      <span class="material-symbols-outlined text-[16px]">arrow_back</span>
      <span>Back to Journal</span>
    </a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background font-label-caps text-xs rounded-full font-medium shadow-md">
      <span>Discuss a Project</span>
    </a>
  </footer>
</article>
`
});

// 7. CONTACT
assemblePage({
  filename: 'contact.html',
  activeRoute: '/contact',
  title: 'Start a Project — Aetherfolio Studio',
  description: 'Initiate a project inquiry with Aetherfolio. Get a direct architectural review and timeline quote within 24 hours.',
  canonicalUrl: 'https://aetherfolio.vercel.app/contact',
  bodyContent: `
<!-- Contact Hero: Radio Transmission & Signal Broadcast Theme -->
<section class="relative pt-28 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Unique Background Decoration: Radio Transmission Pulse Rings -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <!-- Hot ember & coral glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-red-500/10 blur-[100px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[220px] bg-primary/20 blur-[80px]"></div>
    
    <!-- Concentric Broadcast Waves -->
    <div class="dec-broadcast-wave-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary/40"></div>
    <div class="dec-broadcast-wave-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-orange-400/30"></div>
    <div class="dec-broadcast-wave-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-red-500/20"></div>

    <!-- Frequency Waveform Bar -->
    <svg class="absolute bottom-6 left-1/2 -translate-x-1/2 w-72 h-8 opacity-25" viewBox="0 0 200 24" fill="none">
      <path d="M0,12 L30,12 L40,4 L50,20 L60,8 L70,16 L80,12 L120,12 L130,2 L140,22 L150,6 L160,18 L170,12 L200,12" stroke="#ffb4a5" stroke-width="1.5"/>
    </svg>

  </div>

  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Direct Commission Transmission</span>
  </div>

  <h1 class="font-display-xl text-[56px] sm:text-[76px] md:text-[96px] text-on-surface tracking-tighter leading-[0.95] mb-6">
    Start a <br class="hidden sm:block"/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-primary to-orange-300 font-light italic">Project</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed mb-6">
    Have an ambitious concept? Tell me about your requirements, target audience, and goals. I respond with technical feedback within 24 hours.
  </p>
</section>

<section class="w-full pb-24 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
    
    <div class="lg:col-span-5 flex flex-col gap-6">
      <div class="p-8 rounded-3xl bg-surface-container/40 border border-white/5 flex flex-col gap-6">
        <h2 class="font-headline-md text-2xl text-on-surface">Direct Inquiry</h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
          Prefer emailing directly? Feel free to reach out with project briefs, architectural questions, or RFP documents.
        </p>
        <a href="mailto:aether.getyourownsite@gmail.com" class="inline-flex items-center gap-2.5 font-label-caps text-xs text-primary hover:text-surface-tint transition-colors break-all">
          <span class="material-symbols-outlined text-[18px]">mail</span>
          <span>aether.getyourownsite@gmail.com</span>
        </a>
      </div>

      <div class="p-8 rounded-3xl bg-surface-container/40 border border-white/5 flex flex-col gap-4">
        <h3 class="font-headline-md text-xl text-on-surface">Studio Availability</h3>
        <div class="space-y-3 font-body-md text-sm text-on-surface-variant">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-[18px]">public</span>
            <span>Worldwide / Remote</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-secondary text-[18px]">schedule</span>
            <span>Response Time: &lt; 24 Hours</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
            <span>Booking Select Q3/Q4 Projects</span>
          </div>
        </div>
      </div>
    </div>

    <div class="lg:col-span-7">
      <form id="contactForm" class="p-8 sm:p-10 rounded-3xl bg-surface-container/40 border border-white/5 flex flex-col gap-6">
        <div class="flex flex-col gap-2">
          <label for="name" class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Your Name *</label>
          <input type="text" id="name" name="name" required placeholder="Jane Doe" class="w-full px-4 py-3 bg-surface-container-high/60 border border-white/10 rounded-xl text-on-surface placeholder-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors">
        </div>

        <div class="flex flex-col gap-2">
          <label for="email" class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Email Address *</label>
          <input type="email" id="email" name="email" required placeholder="jane@company.com" class="w-full px-4 py-3 bg-surface-container-high/60 border border-white/10 rounded-xl text-on-surface placeholder-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="projectType" class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Type</label>
            <select id="projectType" name="projectType" class="w-full px-4 py-3 bg-surface-container-high/60 border border-white/10 rounded-xl text-on-surface focus:border-primary focus:outline-none transition-colors">
              <option value="Custom Web App">Custom Web Application</option>
              <option value="Landing Page">High-Conversion Landing Page</option>
              <option value="Interactive WebGL">Interactive WebGL / 3D</option>
              <option value="Performance Audit">Performance &amp; Code Audit</option>
              <option value="Other">Other Inquiry</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="timeline" class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Estimated Timeline</label>
            <select id="timeline" name="timeline" class="w-full px-4 py-3 bg-surface-container-high/60 border border-white/10 rounded-xl text-on-surface focus:border-primary focus:outline-none transition-colors">
              <option value="1-2 Months">1–2 Months</option>
              <option value="2-4 Months">2–4 Months</option>
              <option value="Flexible">Flexible Timeline</option>
              <option value="Immediate">Immediate / Rush</option>
            </select>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Overview &amp; Goals *</label>
          <textarea id="message" name="message" rows="4" required placeholder="Tell me about what you're building, target audience, and key technical requirements..." class="w-full px-4 py-3 bg-surface-container-high/60 border border-white/10 rounded-xl text-on-surface placeholder-on-surface-variant/40 focus:border-primary focus:outline-none transition-colors resize-none"></textarea>
        </div>

        <button type="submit" class="tactile-press w-full py-4 bg-paper-white hover:bg-surface-tint text-background font-label-caps text-xs tracking-widest uppercase rounded-full transition-colors font-semibold shadow-lg mt-2">
          Send Inquiry
        </button>

        <div id="formStatus" class="font-body-md text-xs text-center hidden py-2 rounded-lg"></div>
      </form>
    </div>

  </div>
</section>
`
});

// 8. 404
assemblePage({
  filename: '404.html',
  activeRoute: '',
  title: '404 — Page Not Found | Aetherfolio',
  description: 'The requested page could not be found. Return to Aetherfolio home.',
  canonicalUrl: 'https://aetherfolio.vercel.app/404',
  bodyContent: `
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
  <span class="font-label-caps text-xs text-primary uppercase tracking-widest mb-4">Error 404</span>
  <h1 class="font-display-xl text-[72px] sm:text-[96px] text-on-surface tracking-tighter leading-none mb-6">
    Page Not <span class="italic font-light text-primary">Found</span>
  </h1>
  <p class="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
    The page you are looking for has been relocated or does not exist. Explore our production work or reach out directly.
  </p>
  <div class="flex flex-wrap items-center justify-center gap-4">
    <a href="/" class="tactile-press px-8 py-3.5 bg-paper-white text-background font-label-caps text-xs rounded-full font-medium shadow-md">
      <span>Return Home</span>
    </a>
    <a href="/work" class="tactile-press px-8 py-3.5 bg-surface-container-high text-on-surface border border-white/10 hover:border-primary/40 font-label-caps text-xs rounded-full transition-all">
      <span>View Work</span>
    </a>
  </div>
</section>
`
});

// 9. TOS
assemblePage({
  filename: 'tos.html',
  activeRoute: '/tos',
  title: 'Terms of Service — Aetherfolio',
  description: 'Terms of Service and client IP ownership agreements for Aetherfolio Creative Engineering Studio.',
  canonicalUrl: 'https://aetherfolio.vercel.app/tos',
  bodyContent: `
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-3xl mx-auto">
  <div class="flex flex-col gap-4 border-b border-white/[0.08] pb-8 mb-12">
    <span class="font-label-caps text-xs text-primary uppercase tracking-widest">Legal</span>
    <h1 class="font-display-xl text-[48px] sm:text-[64px] text-on-surface tracking-tighter leading-tight">Terms of Service</h1>
    <p class="font-body-md text-sm text-on-surface-variant/70">Last updated: August 2026</p>
  </div>

  <div class="prose prose-invert max-w-none font-body-md text-on-surface-variant text-base leading-relaxed flex flex-col gap-8">
    <p>
      By accessing or commissioning work from Aetherfolio ("Studio", "we", or "our"), you agree to be bound by these Terms of Service.
    </p>

    <div class="space-y-3">
      <h2 class="font-headline-md text-2xl text-on-surface">1. Scope of Services</h2>
      <p>
        Aetherfolio provides bespoke web development, creative engineering, and frontend optimization services as defined in individual project scopes and agreements.
      </p>
    </div>

    <div class="space-y-3">
      <h2 class="font-headline-md text-2xl text-on-surface">2. Intellectual Property Rights</h2>
      <p>
        For client-commissioned deliverables, 100% of custom source code, application assets, and repository ownership are fully transferred to the client upon final invoice settlement.
      </p>
    </div>

    <div class="space-y-3">
      <h2 class="font-headline-md text-2xl text-on-surface">3. Contact &amp; Inquiries</h2>
      <p>
        If you have any questions regarding these terms, please contact <a href="mailto:aether.getyourownsite@gmail.com" class="text-primary hover:underline">aether.getyourownsite@gmail.com</a>.
      </p>
    </div>
  </div>
</section>
`
});

console.log('All pages generated successfully via build_tos.js!');

