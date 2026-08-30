const fs = require('fs');
const { assemblePage } = require('./build_projects.js');

// =========================================================================
// 1. WORK ARCHIVE (work.html & projects.html)
// =========================================================================
const workContent = `
<!-- Work Hero: Editorial Monograph Header -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <!-- Atmospheric Subtle Glow -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-primary/10 blur-[100px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-emerald-500/10 blur-[80px]"></div>
    
    <!-- Rotating Blueprint Radar Ring -->
    <svg class="dec-radar-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-20" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="250" cy="250" r="240" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4 8"/>
      <circle cx="250" cy="250" r="170" stroke="rgba(93,217,207,0.15)" stroke-width="1"/>
      <circle cx="250" cy="250" r="100" stroke="rgba(255,180,165,0.2)" stroke-width="1" stroke-dasharray="2 4"/>
      <line x1="250" y1="10" x2="250" y2="490" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="10" y1="250" x2="490" y2="250" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </svg>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Selected Work Archive</span>
    <span class="text-on-surface-variant/40">•</span>
    <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">[ 04 ACTIVE SYSTEMS ]</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Selected <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">Work &amp; Systems</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    A curated index of production digital platforms, interactive WebGL applications, and custom frontend systems. Handcrafted from clean code for 60fps performance and authentic brand distinction.
  </p>

  <!-- Telemetry Bar -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-surface-container/40 border border-white/[0.06] text-xs font-label-caps text-left backdrop-blur-md">
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

<!-- Projects Showcase with Asymmetric Editorial Rhythm -->
<section class="w-full pb-32 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">

    <!-- PROJECT 1: KAIRO HOSPITAL OS (Full Width Flagship) -->
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 md:p-14 rounded-3xl relative overflow-hidden group border border-white/[0.06]">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
        <div class="flex flex-col gap-6 max-w-2xl">
          <div class="flex flex-wrap items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // Flagship Clinical SaaS</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-xs text-emerald-400 tracking-widest">LIVE ON EDGE</span>
          </div>

          <h2 class="font-display-xl text-[40px] sm:text-[54px] md:text-[64px] text-on-surface font-light leading-tight tracking-tight">
            Kairo <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal">Hospital OS</span>
          </h2>

          <p class="font-body-md text-base sm:text-lg text-on-surface-variant leading-relaxed font-light">
            A bespoke, full-stack healthcare operations platform. Engineered with an interactive 3D hospital digital twin, surgical theater timeline orchestrator, 60fps continuous ECG waveform monitors, ward bed floor matrices with 1-click sanitization dispatch, and ambient AI clinical reasoning.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04] text-xs font-label-caps">
            <div>
              <span class="text-on-surface-variant/60 uppercase block text-[10px]">Client / Domain</span>
              <span class="text-on-surface font-medium">Enterprise Health</span>
            </div>
            <div>
              <span class="text-on-surface-variant/60 uppercase block text-[10px]">Rendering Engine</span>
              <span class="text-on-surface font-medium">Canvas 2D / 60FPS</span>
            </div>
            <div>
              <span class="text-on-surface-variant/60 uppercase block text-[10px]">Architecture</span>
              <span class="text-primary font-medium">Next.js 15.5 Edge</span>
            </div>
            <div>
              <span class="text-on-surface-variant/60 uppercase block text-[10px]">Performance</span>
              <span class="text-emerald-400 font-medium">100/100 Core Vitals</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 pt-2">
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/[0.06]">Next.js 15.5</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/[0.06]">React 19</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/[0.06]">TypeScript</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Tailwind CSS v4</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/[0.06]">HTML5 Canvas 2D</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-72">
          <a href="/work/kairo" class="tactile-press w-full px-6 py-4 font-label-caps text-xs text-background bg-paper-white hover:bg-surface-tint rounded-full flex items-center justify-center gap-2 transition-all shadow-lg font-semibold uppercase tracking-widest">
            <span>Read Deep Case Study</span>
            <span class="material-symbols-outlined text-[16px]">menu_book</span>
          </a>
          <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-4 font-label-caps text-xs text-on-surface bg-surface-container-high/60 hover:bg-surface-container-high border border-white/10 hover:border-primary/40 rounded-full flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-widest">
            <span>Launch Live Demo</span>
            <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
          <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-4 font-label-caps text-xs text-on-surface-variant hover:text-on-surface bg-surface-container/40 hover:bg-surface-container-high border border-white/[0.06] rounded-full flex items-center justify-center gap-2 transition-all uppercase tracking-widest">
            <span>GitHub Source Code</span>
            <span class="material-symbols-outlined text-[16px]">code</span>
          </a>
        </div>
      </div>
    </div>

    <!-- ASYMMETRIC GRID: 2/3 and 1/3 Rhythm -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- PROJECT 2: Volumetric WebGL Raymarching Engine (8 Cols - 2/3 Width) -->
      <div class="lg:col-span-8 border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between border border-white/[0.06]">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">02 // Graphics Engineering</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">Shader Architecture</span>
          </div>

          <h3 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
            Realtime Volumetric <span class="italic text-secondary font-normal">Raymarching Engine</span>
          </h3>

          <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
            Custom Signed Distance Field (SDF) volumetric raymarching kernel implemented in pure WebGL 2.0. Renders complex constructive solid geometries, dynamic light absorption, and subsurface scattering at 60 FPS without external engine overhead.
          </p>

          <div class="flex flex-wrap gap-2 pt-2">
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/[0.06]">WebGL 2.0</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">GLSL Shaders</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">SDF Geometry</span>
          </div>
        </div>

        <div class="pt-8 mt-8 border-t border-white/[0.04] flex items-center justify-between">
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Research Experiment</span>
          <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-on-surface hover:text-secondary uppercase tracking-widest transition-colors">
            <span>Read Technical Breakdown &rarr;</span>
          </a>
        </div>
      </div>

      <!-- PROJECT 3: Navier-Stokes Fluid Solver (4 Cols - 1/3 Width) -->
      <div class="lg:col-span-4 border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06]">
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-3">
            <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold">03 // Physics Kernel</span>
          </div>

          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light leading-snug">
            GPU Navier-Stokes <span class="italic text-tertiary font-normal">Fluid Dynamics</span>
          </h3>

          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            A zero-dependency 2D fluid simulation solving Eulerian advection, pressure Poisson divergence, and vorticity confinement entirely on GPU render targets.
          </p>

          <div class="flex flex-wrap gap-2 pt-2">
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/[0.06]">Eulerian Physics</span>
            <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">FBO Ping-Pong</span>
          </div>
        </div>

        <div class="pt-8 mt-8 border-t border-white/[0.04]">
          <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-tertiary uppercase tracking-widest hover:underline">
            <span>Explore Equations &rarr;</span>
          </a>
        </div>
      </div>

    </div>

    <!-- PROJECT 4: Zero-Bloat Headless E-Commerce System (Full Width Feature) -->
    <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border border-white/[0.06]">
      <div class="flex flex-col gap-4 max-w-3xl">
        <div class="flex items-center gap-3">
          <span class="font-label-caps text-xs text-muted-gold tracking-[0.25em] uppercase font-semibold">04 // High-Scale Commerce</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">Global Edge Distribution</span>
        </div>
        <h3 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
          Zero-Bloat Headless <span class="italic text-muted-gold font-normal">Commerce Architecture</span>
        </h3>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          High-performance global digital storefront built with Next.js 15 Partial Prerendering (PPR) and Shopify Storefront API. Sub-100ms page transitions, instantaneous localized checkout, and 100/100 Core Web Vitals across all mobile networks.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-muted-gold tracking-widest uppercase border border-white/[0.06]">Next.js PPR</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Shopify GraphQL</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Vercel Edge</span>
        </div>
      </div>
      <a href="/contact" class="tactile-press px-8 py-4 bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface border border-white/10 hover:border-muted-gold/40 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap">
        <span>Commission Similar Project &rarr;</span>
      </a>
    </div>

  </div>
</section>
`;

assemblePage({
  filename: 'work.html',
  activeRoute: '/work',
  title: 'Selected Work & Case Studies — Aetherfolio Studio',
  description: 'Explore live production systems and case studies engineered by Aetherfolio Studio, featuring Kairo Hospital OS, custom WebGL interfaces, and Next.js platforms.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work',
  bodyContent: workContent
});

assemblePage({
  filename: 'projects.html',
  activeRoute: '/work',
  title: 'Selected Work & Case Studies — Aetherfolio Studio',
  description: 'Explore live production systems and case studies engineered by Aetherfolio Studio, featuring Kairo Hospital OS, custom WebGL interfaces, and Next.js platforms.',
  canonicalUrl: 'https://aetherfolio.vercel.app/projects',
  bodyContent: workContent
});


// =========================================================================
// 2. KAIRO HOSPITAL OS CASE STUDY (work/kairo.html)
// =========================================================================
assemblePage({
  filename: 'work/kairo.html',
  activeRoute: '/work',
  title: 'Kairo Hospital OS — Architecture & Engineering Case Study',
  description: 'Deep technical breakdown of Kairo Hospital OS: building an enterprise 3D clinical digital twin, 60fps continuous ECG canvas telemetry, and ambient AI hospital orchestration.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work/kairo',
  ogType: 'article',
  bodyContent: `
<!-- Case Study Hero -->
<article class="w-full max-w-4xl mx-auto px-6 py-20 relative">
  <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary/10 blur-[90px]"></div>
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-emerald-500/10 blur-[70px]"></div>
    
    <!-- SVG Animated ECG Waveform -->
    <svg class="absolute top-10 left-0 w-full h-48 opacity-15" viewBox="0 0 1000 120" preserveAspectRatio="none" fill="none">
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

  <header class="mb-16">
    <div class="inline-flex items-center gap-2.5 mb-6 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-caps text-xs">
      <span class="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse"></span>
      <span class="tracking-widest uppercase font-semibold">Production Enterprise Case Study</span>
    </div>

    <h1 class="font-display-xl text-[48px] sm:text-[68px] md:text-[80px] text-on-surface font-light tracking-tight leading-[0.94] mb-8">
      Kairo <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal">Hospital OS</span>
    </h1>

    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant font-light leading-relaxed mb-12">
      An enterprise clinical operating system uniting 3D spatial hospital digital twins, 60fps continuous biometric telemetry, surgical theater synchronization, and ambient clinical AI reasoning into one cohesive, zero-bloat platform.
    </p>

    <!-- Metadata Matrix -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06] text-xs font-label-caps">
      <div>
        <span class="text-on-surface-variant/60 uppercase block text-[10px] mb-1 font-medium">Domain</span>
        <span class="text-on-surface font-semibold text-sm">Healthcare SaaS</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase block text-[10px] mb-1 font-medium">Studio Role</span>
        <span class="text-on-surface font-semibold text-sm">Sole Architect &amp; Lead</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase block text-[10px] mb-1 font-medium">Timeline</span>
        <span class="text-on-surface font-semibold text-sm">6 Weeks Engineering</span>
      </div>
      <div>
        <span class="text-on-surface-variant/60 uppercase block text-[10px] mb-1 font-medium">Performance</span>
        <span class="text-emerald-400 font-semibold text-sm">100/100 Lighthouse</span>
      </div>
    </div>
  </header>

  <!-- Case Study Chapters -->
  <div class="flex flex-col gap-16 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    
    <!-- Chapter 1: The Challenge -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">01 // Problem Statement</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Legacy Hospital Software is Broken by Fragmented Windows and Latency
      </h2>
      <p>
        Modern clinical workflows suffer from catastrophic interface fragmentation. Medical staff navigate between disparate electronic health record (EHR) tabs, hardware monitors, and paging systems. Critical surgical schedules drift out of sync, ward beds remain unassigned for hours due to manual paperwork, and real-time biometric anomalies are buried in cluttered tables.
      </p>
      <p>
        The objective was to engineer a unified clinical command system capable of running at 60 FPS on edge hardware, rendering hospital floor plans in interactive 3D, and visualizing continuous vitals with zero layout shifts.
      </p>
    </section>

    <!-- Chapter 2: The Architectural Solution -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-secondary tracking-widest uppercase font-semibold">02 // Architectural Execution</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Hardware-Accelerated Canvas Telemetry &amp; Spatial Twin
      </h2>
      <p>
        Rather than relying on generic DOM elements for biometric graphing (which triggers costly layout reflows), we architected a custom HTML5 Canvas 2D telemetry engine. The waveform visualizer utilizes circular buffer interpolation to stream continuous ECG, SpO2, and respiratory data at 60 frames per second with under 1% CPU utilization.
      </p>
      <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-4 my-4">
        <span class="font-label-caps text-xs text-primary uppercase tracking-widest">Key Engineering Highlights</span>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span> <strong>3D Hospital Digital Twin:</strong> Architectural layout of 4 clinical wings with active room occupancy states and instant floor switching.</li>
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></span> <strong>Surgical Theater Orchestrator:</strong> Live Gantt timeline tracking surgical prep, active anesthesia, and recovery room handover.</li>
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0"></span> <strong>Ward Bed Matrix:</strong> Visual bed allocation grid featuring 1-click sanitization dispatch and rapid patient assignment.</li>
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-muted-gold mt-2 shrink-0"></span> <strong>Ambient Clinical AI:</strong> Background diagnostic assistant analyzing patient vitals against historical pharmacology baselines.</li>
        </ul>
      </div>
    </section>

    <!-- Chapter 3: Verified Outcomes -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-emerald-400 tracking-widest uppercase font-semibold">03 // Measurable Impact</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Zero Reflow Overhead &amp; Sub-Second First Contentful Paint
      </h2>
      <p>
        The platform achieved a perfect 100/100 Core Web Vitals score across Performance, Accessibility, Best Practices, and SEO. By removing bloated UI frameworks and implementing pure Tailwind CSS and React 19 server components, the initial bundle size was reduced by 74% compared to standard enterprise medical dashboards.
      </p>
    </section>

  </div>

  <!-- CTAs -->
  <footer class="mt-20 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
    <div class="flex items-center gap-4">
      <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-surface-tint transition-all">
        <span>Launch Live Demo</span>
        <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
      </a>
      <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press px-8 py-4 bg-surface-container/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest flex items-center gap-2 transition-all">
        <span>Source Code</span>
        <span class="material-symbols-outlined text-[16px]">code</span>
      </a>
    </div>
    <a href="/work" class="font-label-caps text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors">
      &larr; Back to Selected Work
    </a>
  </footer>
</article>
`
});


// =========================================================================
// 3. SERVICES & MANIFESTO (services.html)
// =========================================================================
assemblePage({
  filename: 'services.html',
  activeRoute: '/services',
  title: 'Capabilities & Studio Manifesto — Aetherfolio',
  description: 'How Aetherfolio builds custom-coded React & Next.js web applications, interactive 3D WebGL interfaces, and high-performance frontend architecture.',
  canonicalUrl: 'https://aetherfolio.vercel.app/services',
  bodyContent: `
<!-- Services Hero: Studio Manifesto -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[100px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Capabilities &amp; Manifesto</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Engineering <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">Without Bloat</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    Aetherfolio operates on a simple principle: every line of code should serve a purpose. We don't use bloated WordPress themes, generic page builders, or copy-paste templates.
  </p>
</section>

<!-- Manifesto Stems -->
<section class="w-full pb-32 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-4xl mx-auto flex flex-col gap-20">

    <!-- Stem 01 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-primary/40 font-light shrink-0">01</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Custom Web Applications &amp; SaaS Platforms</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Full-stack web applications engineered with Next.js 15, React 19, TypeScript, and Supabase / PostgreSQL. From authenticated user portals to complex realtime dashboards, we build scalable architectures with pristine type safety.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/[0.06]">Server Actions</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">PostgreSQL Row-Level Security</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Edge Caching</span>
        </div>
      </div>
    </div>

    <!-- Stem 02 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-secondary/40 font-light shrink-0">02</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Interactive 3D WebGL &amp; Custom Shaders</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Transform your digital presence from flat marketing into an unforgettable, interactive brand world. Custom Three.js geometries, GLSL fragment shaders, fluid simulations, and responsive particle fields engineered for 60–120 FPS on all devices.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/[0.06]">GLSL Shaders</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Three.js</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Hardware Acceleration</span>
        </div>
      </div>
    </div>

    <!-- Stem 03 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-tertiary/40 font-light shrink-0">03</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">High-Conversion Editorial Landing Pages</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Product launch pages and marketing experiences with uncompromising typography, bespoke microinteractions, and instant 5-second value proposition clarity. Engineered for sub-second First Contentful Paint.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/[0.06]">Typographic Hierarchy</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Microinteractions</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">A/B Analytics</span>
        </div>
      </div>
    </div>

    <!-- Stem 04 -->
    <div class="pb-8 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-muted-gold/40 font-light shrink-0">04</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Performance Audits &amp; Frontend Refactoring</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Comprehensive diagnostic overhaul of sluggish codebases. We eliminate layout thrashing, purge render-blocking JavaScript, optimize CSS compositing layers, and elevate websites to 100/100 Core Web Vitals.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-muted-gold tracking-widest uppercase border border-white/[0.06]">Layout Thrashing Elimination</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Bundle Shrinking</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">100/100 Lighthouse</span>
        </div>
      </div>
    </div>

    <!-- Final Commission Prompt -->
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-container/40 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
      <div>
        <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light mb-1">Ready to engineer your next release?</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light">Direct engineering review and scope quotation within 24 hours.</p>
      </div>
      <a href="/contact" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold whitespace-nowrap hover:bg-surface-tint transition-all">
        <span>Start a Project &rarr;</span>
      </a>
    </div>

  </div>
</section>
`
});


// =========================================================================
// 4. ABOUT & STUDIO PROFILE (about.html)
// =========================================================================
assemblePage({
  filename: 'about.html',
  activeRoute: '/about',
  title: 'About & Philosophy — Aetherfolio Studio',
  description: 'Learn about Anish Kadian and the engineering philosophy behind Aetherfolio Studio. Pure craftsmanship, zero template bloat, and custom-coded digital experiences.',
  canonicalUrl: 'https://aetherfolio.vercel.app/about',
  bodyContent: `
<!-- About Hero: Personal & Crafted -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[100px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Studio Profile &amp; Ethos</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Craftsmanship <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">&amp; Code</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    Aetherfolio is the independent creative engineering practice of <strong>Anish Kadian</strong>. I partner with founders, visionary brands, and product teams to design and code bespoke digital experiences that reject template fatigue.
  </p>
</section>

<!-- Studio Story & Principles -->
<section class="w-full pb-32 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-4xl mx-auto flex flex-col gap-20">

    <!-- Story Narrative -->
    <div class="flex flex-col gap-6 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed border-b border-white/[0.06] pb-16">
      <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">The Studio Philosophy</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        The Web Has Become Monotonous. We Build The Exception.
      </h2>
      <p>
        Over the past decade, web design has converged on the same prefabricated component libraries, bloated WordPress themes, and cookie-cutter SaaS layouts. Brands end up looking identical, laden with hundred-megabyte dependencies and sluggish frame rates.
      </p>
      <p>
        Aetherfolio exists to offer a different path: bespoke engineering where typography, interaction physics, and 3D visual computing are tailored specifically to your brand narrative. Every line of HTML, CSS, and GLSL is written by hand with obsessive precision.
      </p>
    </div>

    <!-- 4 Core Principles -->
    <div class="flex flex-col gap-8">
      <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">4 Pillars of Practice</span>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
          <span class="font-display-xl text-2xl text-primary font-light">I. Zero Template Bloat</span>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Every component is built custom from scratch. Zero unnecessary libraries, zero generic templates, and clean, readable code.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
          <span class="font-display-xl text-2xl text-secondary font-light">II. 60FPS Hardware Fluidity</span>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Elimination of layout thrashing and DOM invalidation traps. Smooth animations that utilize GPU transform matrices.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
          <span class="font-display-xl text-2xl text-tertiary font-light">III. Pixel-Level Art Direction</span>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Typographic hierarchy, custom GLSL shaders, and generous whitespace composed like high-end editorial publications.
          </p>
        </div>

        <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
          <span class="font-display-xl text-2xl text-muted-gold font-light">IV. Direct Partner Engineering</span>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            No account managers, no junior delegators. You collaborate directly with the lead engineer from initial commit to production deploy.
          </p>
        </div>
      </div>
    </div>

    <!-- Toolchain Matrix -->
    <div class="flex flex-col gap-8 pt-8 border-t border-white/[0.06]">
      <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Technical Toolchain</span>
      
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-label-caps">
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04]">
          <span class="text-primary block mb-1 font-semibold">CORE FRAMEWORKS</span>
          <span class="text-on-surface font-light">Next.js 15, React 19, TypeScript</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04]">
          <span class="text-secondary block mb-1 font-semibold">GRAPHICS &amp; 3D</span>
          <span class="text-on-surface font-light">WebGL 2.0, Three.js, GLSL, Canvas 2D</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04]">
          <span class="text-tertiary block mb-1 font-semibold">STYLING &amp; MOTION</span>
          <span class="text-on-surface font-light">Tailwind CSS v4, Custom GPU rAF</span>
        </div>
        <div class="p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04]">
          <span class="text-muted-gold block mb-1 font-semibold">BACKEND &amp; DEPLOY</span>
          <span class="text-on-surface font-light">Supabase, PostgreSQL, Vercel Edge</span>
        </div>
      </div>
    </div>

  </div>
</section>
`
});


// =========================================================================
// 5. JOURNAL & ARTICLES (journal.html & 3 articles)
// =========================================================================
const journalIndexContent = `
<!-- Journal Hero: Publication Cover -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[100px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Independent Technical Publication</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Engineering <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-primary to-surface-tint font-normal pr-2">Insights</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    In-depth architectural breakdowns, WebGL optimization guides, and performance engineering reports from the Aetherfolio laboratory.
  </p>
</section>

<!-- Featured Story + Archive -->
<section class="w-full pb-32 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">

    <!-- Featured Cover Article -->
    <article class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 md:p-14 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border border-white/[0.06] group">
      <div class="flex flex-col gap-6 max-w-3xl">
        <div class="flex items-center gap-3 font-label-caps text-xs text-primary">
          <span class="tracking-widest uppercase font-semibold">Featured Research</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="text-on-surface-variant/70">6 min read</span>
        </div>
        <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light group-hover:text-primary transition-colors leading-tight">
          <a href="/journal/webgl-fluid-dynamics-at-60fps">Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL</a>
        </h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          How we implemented an in-house Navier-Stokes Eulerian fluid solver and liquid GLSL shaders in WebGL 2.0 without external canvas library bloat.
        </p>
      </div>
      <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press px-8 py-4 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:bg-surface-tint transition-all whitespace-nowrap">
        <span>Read Article &rarr;</span>
      </a>
    </article>

    <!-- 2-Column Archive -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Article 2 -->
      <article class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between border border-white/[0.06] group">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3 font-label-caps text-xs text-secondary">
            <span class="tracking-widest uppercase font-semibold">Next.js &amp; Architecture</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="text-on-surface-variant/70">8 min read</span>
          </div>
          <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light group-hover:text-secondary transition-colors leading-snug">
            <a href="/journal/zero-bloat-frontend-architecture">Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue</a>
          </h2>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Why avoiding pre-built templates and bloated UI libraries yields faster websites, cleaner maintenance, and authentic brand identity.
          </p>
        </div>
        <div class="pt-8 mt-8 border-t border-white/[0.04]">
          <a href="/journal/zero-bloat-frontend-architecture" class="tactile-press font-label-caps text-xs text-secondary uppercase tracking-widest hover:underline">
            Read Full Guide &rarr;
          </a>
        </div>
      </article>

      <!-- Article 3 -->
      <article class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between border border-white/[0.06] group">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-3 font-label-caps text-xs text-tertiary">
            <span class="tracking-widest uppercase font-semibold">Performance Engineering</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="text-on-surface-variant/70">5 min read</span>
          </div>
          <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light group-hover:text-tertiary transition-colors leading-snug">
            <a href="/journal/eliminating-layout-thrashing-gpu">Hardware Acceleration &amp; Eliminating Layout Thrashing on Modern Browsers</a>
          </h2>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            How to prevent DOM layout invalidation traps, leverage passive resize observers, and use GPU layer promotion to guarantee 60–120 FPS animations.
          </p>
        </div>
        <div class="pt-8 mt-8 border-t border-white/[0.04]">
          <a href="/journal/eliminating-layout-thrashing-gpu" class="tactile-press font-label-caps text-xs text-tertiary uppercase tracking-widest hover:underline">
            Read Full Guide &rarr;
          </a>
        </div>
      </article>

    </div>

  </div>
</section>
`;

assemblePage({
  filename: 'journal.html',
  activeRoute: '/journal',
  title: 'Technical Journal & Engineering Insights — Aetherfolio',
  description: 'In-depth architectural breakdowns, WebGL shader optimization guides, and Next.js performance engineering reports from Aetherfolio Studio.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal',
  bodyContent: journalIndexContent
});

// Article 1
assemblePage({
  filename: 'journal/webgl-fluid-dynamics-at-60fps.html',
  activeRoute: '/journal',
  title: 'Engineering 60FPS Fluid Dynamics & WebGL Shaders — Aetherfolio Journal',
  description: 'How to implement a high-performance in-house Navier-Stokes fluid dynamics solver and GLSL liquid shaders in WebGL 2.0 without library bloat.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/webgl-fluid-dynamics-at-60fps',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-20">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">WebGL Fluid Dynamics</span>
  </nav>

  <header class="mb-14">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">WebGL &amp; Graphics</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">6 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      A step-by-step technical breakdown of implementing a custom Navier-Stokes Eulerian solver on GPU framebuffers with zero external dependencies.
    </p>
  </header>

  <div class="flex flex-col gap-8 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    <p>
      Adding interactive fluid simulations to a website often results in crushing performance penalties. Third-party packages often import hundreds of kilobytes of unoptimized code that recalculates particle physics on the CPU main thread.
    </p>
    <p>
      By offloading the entire Navier-Stokes solver to WebGL 2.0 fragment shaders using Ping-Pong Framebuffer Objects (FBOs), we achieve butter-smooth 60–120 FPS performance while keeping JavaScript bundle size below 12KB.
    </p>
    
    <div class="p-6 rounded-2xl bg-surface-container/60 border border-white/[0.06] font-mono text-xs text-primary my-4 overflow-x-auto">
      <pre><code>// Eulerian Advection Fragment Shader
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform float uDt;

void main() {
    vec2 coord = gl_FragCoord.xy - uDt * texture2D(uVelocity, vUv).xy;
    gl_FragColor = texture2D(uSource, coord);
}</code></pre>
    </div>

    <p>
      The result is a silky, responsive liquid interaction that responds to user pointer movement without stealing compute cycles from the main UI thread.
    </p>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-primary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Start a Project</a>
  </footer>
</article>
`
});

// Article 2
assemblePage({
  filename: 'journal/zero-bloat-frontend-architecture.html',
  activeRoute: '/journal',
  title: 'Zero-Bloat Architecture in Next.js 15 — Aetherfolio Journal',
  description: 'How to build high-scale Next.js experiences without template fatigue, bloated UI libraries, and slow frame rates.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/zero-bloat-frontend-architecture',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-20">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-secondary" aria-current="page">Zero-Bloat Next.js</span>
  </nav>

  <header class="mb-14">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold">Next.js Architecture</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">8 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      Why avoiding pre-built templates and massive component libraries creates faster websites, cleaner maintenance, and distinctive brand identities.
    </p>
  </header>

  <div class="flex flex-col gap-8 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    <p>
      The modern web is inundated with cookie-cutter SaaS themes. When every product uses identical styling frameworks and bloated animations, distinct brand equity vanishes.
    </p>
    <p>
      By implementing lean React Server Components (RSC) and handcrafted CSS, our platforms ship with 0KB of unnecessary JavaScript, rendering instant First Contentful Paint times on low-power mobile devices.
    </p>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-secondary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Start a Project</a>
  </footer>
</article>
`
});

// Article 3
assemblePage({
  filename: 'journal/eliminating-layout-thrashing-gpu.html',
  activeRoute: '/journal',
  title: 'Eliminating Layout Thrashing & GPU Acceleration — Aetherfolio Journal',
  description: 'How to eliminate DOM reflow traps and leverage GPU composite layers for 60–120 FPS web animations.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/eliminating-layout-thrashing-gpu',
  ogType: 'article',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-20">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/journal" class="hover:text-primary transition-colors">Journal</a>
    <span>/</span>
    <span class="text-tertiary" aria-current="page">Eliminating Layout Thrashing</span>
  </nav>

  <header class="mb-14">
    <div class="flex items-center gap-3 mb-4">
      <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold">Performance Engineering</span>
      <span class="text-on-surface-variant/40">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">5 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Hardware Acceleration: Eliminating Layout Thrashing on Modern Browsers
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      A practical guide on avoiding synchronous layout recalculations and utilizing GPU compositing layers for stutter-free scrolling.
    </p>
  </header>

  <div class="flex flex-col gap-8 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    <p>
      Layout thrashing occurs when JavaScript writes to the DOM and then immediately reads geometric properties within the same frame, forcing the browser engine to perform an expensive synchronous reflow.
    </p>
    <p>
      By batching DOM reads, using passive ResizeObservers, and delegating visual motion to CSS 3D transforms (<code class="text-primary font-mono">transform: translate3d(...)</code>), we ensure animations run directly on the compositor thread with zero frame stutter.
    </p>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-tertiary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Start a Project</a>
  </footer>
</article>
`
});


// =========================================================================
// 6. CONTACT & COMMISSION PORTAL (contact.html)
// =========================================================================
assemblePage({
  filename: 'contact.html',
  activeRoute: '/contact',
  title: 'Start a Project — Aetherfolio Studio',
  description: 'Initiate a project inquiry with Aetherfolio. Get a direct architectural review and timeline quote within 24 hours.',
  canonicalUrl: 'https://aetherfolio.vercel.app/contact',
  bodyContent: `
<!-- Contact Hero: Statement-Led Commission Portal -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-primary/10 blur-[100px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Direct Studio Commission</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Have an ambitious idea? <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">Let's build it properly.</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed mb-6">
    Tell me about your product vision, timeline, and requirements. I personally review every inquiry and respond with architectural feedback within 24 hours.
  </p>
</section>

<!-- Contact Form Portal -->
<section class="w-full pb-32 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-4xl mx-auto">
    
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/[0.06]">
      <form class="flex flex-col gap-8" action="mailto:aether.getyourownsite@gmail.com" method="GET" enctype="text/plain">
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientName">Your Name</label>
            <input id="clientName" name="name" type="text" placeholder="e.g. Eleanor Vance" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientEmail">Email Address</label>
            <input id="clientEmail" name="email" type="email" placeholder="e.g. eleanor@studio.com" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
          </div>
        </div>

        <!-- Project Type Selection -->
        <div class="flex flex-col gap-3">
          <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Category</label>
          <div class="flex flex-wrap gap-3">
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Full-Stack Web App" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Full-Stack SaaS Platform</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Interactive 3D / WebGL" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Interactive 3D / WebGL</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Editorial Landing Page" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Editorial Landing Page</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Performance Overhaul" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Performance Overhaul</span>
            </label>
          </div>
        </div>

        <!-- Project Details -->
        <div class="flex flex-col gap-2">
          <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="projectScope">What are you building?</label>
          <textarea id="projectScope" name="details" rows="5" placeholder="Share your product goals, timeline, key features, and any design or technical references..." required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors leading-relaxed"></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div class="flex items-center gap-2.5 text-xs font-label-caps text-on-surface-variant/70">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Guaranteed response within 24 hours</span>
          </div>

          <button type="submit" class="tactile-press w-full sm:w-auto px-10 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all flex items-center justify-center gap-2">
            <span>Send Project Inquiry</span>
            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

      </form>
    </div>

    <!-- Direct Email Fallback -->
    <div class="text-center mt-12">
      <p class="font-body-md text-sm text-on-surface-variant font-light">
        Prefer direct email? Reach out at <a href="mailto:aether.getyourownsite@gmail.com" class="text-primary font-medium hover:underline">aether.getyourownsite@gmail.com</a>
      </p>
    </div>

  </div>
</section>
`
});


// =========================================================================
// 7. 404 & TERMS OF SERVICE (404.html, tos.html)
// =========================================================================
assemblePage({
  filename: '404.html',
  activeRoute: '',
  title: '404 — Page Not Found | Aetherfolio Studio',
  description: 'The requested route does not exist in the Aetherfolio directory.',
  canonicalUrl: 'https://aetherfolio.vercel.app/404',
  bodyContent: `
<section class="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
  <span class="font-label-caps text-xs text-primary uppercase tracking-[0.25em] font-semibold mb-4">Error 404</span>
  <h1 class="font-display-xl text-5xl sm:text-7xl text-on-surface font-light tracking-tight mb-6">Route Not Found</h1>
  <p class="font-body-md text-base text-on-surface-variant font-light max-w-md mx-auto mb-10">
    The coordinate you requested does not exist or has been relocated.
  </p>
  <a href="/" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold hover:bg-surface-tint transition-all">
    Return to Studio Home &rarr;
  </a>
</section>
`
});

assemblePage({
  filename: 'tos.html',
  activeRoute: '/tos',
  title: 'Terms of Service — Aetherfolio Studio',
  description: 'Terms of service and engineering engagement agreements for Aetherfolio Studio.',
  canonicalUrl: 'https://aetherfolio.vercel.app/tos',
  bodyContent: `
<article class="w-full max-w-3xl mx-auto px-6 py-24">
  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <span class="text-primary">Terms of Service</span>
  </nav>

  <header class="mb-14">
    <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-2">Legal &amp; Agreements</span>
    <h1 class="font-display-xl text-4xl sm:text-6xl text-on-surface font-light tracking-tight">Terms of Service</h1>
  </header>

  <div class="flex flex-col gap-8 font-body-md text-on-surface-variant font-light text-base leading-relaxed">
    <p>
      All project engagements with Aetherfolio Studio are executed under transparent fixed-scope or milestone contracts. Upon final delivery and payment, clients receive 100% intellectual property ownership of the source code and assets.
    </p>
    <p>
      For bespoke commercial terms or master service agreements (MSA), contact <a href="mailto:aether.getyourownsite@gmail.com" class="text-primary hover:underline">aether.getyourownsite@gmail.com</a>.
    </p>
  </div>
</article>
`
});

console.log('All pages generated successfully via build_tos.js!');
