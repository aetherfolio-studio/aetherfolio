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
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center">
  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Selected Portfolio</span>
  </div>
  <h1 class="font-display-xl text-[54px] sm:text-[72px] md:text-[90px] text-on-surface tracking-tighter leading-tight mb-6">
    Engineering <span class="italic font-light text-primary">Digital</span> Excellence
  </h1>
  <p class="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
    A curated index of production digital platforms and interactive web applications, engineered for strategic scale, 60fps performance, and distinct aesthetic impact.
  </p>
</section>

<section class="w-full pb-24 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-12">
    <!-- Featured Project: Kairo Hospital OS -->
    <div class="border-beam-card bg-surface-container/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none"></div>
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
        <div class="flex flex-col gap-5 max-w-2xl">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Featured Live Production SaaS</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">Hospital OS</span>
          </div>
          <h2 class="font-headline-md text-[32px] md:text-[44px] text-on-surface leading-tight">
            Kairo <span class="italic font-light text-primary">Hospital Operating System</span>
          </h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed">
            A bespoke, full-stack healthcare operations platform and clinical OS. Engineered with an interactive 3D hospital digital twin, live operating theater orchestrator, 60fps continuous ECG telemetry waveforms, ward bed floor matrices with 1-click sanitization dispatch, and ambient AI clinical reasoning.
          </p>
          <div class="flex flex-wrap gap-2 pt-2">
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/10">Next.js 15.5</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/10">React 19</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/10">TypeScript</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/10">Tailwind CSS v4</span>
            <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/10">HTML5 Canvas 2D</span>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-64">
          <a href="/work/kairo" class="tactile-press w-full px-6 py-3.5 font-label-caps text-xs text-background bg-paper-white hover:bg-surface-tint rounded-full flex items-center justify-center gap-2 transition-all shadow-lg font-medium">
            <span>Read Case Study</span>
            <span class="material-symbols-outlined text-[16px]">menu_book</span>
          </a>
          <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-3.5 font-label-caps text-xs text-on-surface bg-surface-container-high/90 hover:bg-surface-container-high border border-white/15 hover:border-primary/40 rounded-full flex items-center justify-center gap-2 transition-all shadow-md">
            <span>Launch Live Site</span>
            <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
          </a>
          <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press w-full px-6 py-3.5 font-label-caps text-xs text-on-surface-variant hover:text-on-surface bg-surface-container/60 hover:bg-surface-container-high border border-white/10 rounded-full flex items-center justify-center gap-2 transition-all">
            <span>View Source Code</span>
            <span class="material-symbols-outlined text-[16px]">code</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Private Client Work Notice -->
    <div class="p-8 md:p-10 rounded-2xl bg-surface-container/30 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div class="max-w-xl">
        <span class="font-label-caps text-[10px] text-primary tracking-widest uppercase block mb-1">Confidential Engagements</span>
        <h3 class="font-headline-md text-2xl text-on-surface mb-2">Private Client Architecture</h3>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
          Due to non-disclosure agreements on private client platforms, select production case studies are reviewed 1-on-1 during technical alignment calls.
        </p>
      </div>
      <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background font-label-caps text-xs rounded-full font-medium whitespace-nowrap">
        <span>Request Technical Walkthrough</span>
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
<article class="w-full max-w-4xl mx-auto px-6 py-16">
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
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center">
  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Studio Offerings</span>
  </div>
  <h1 class="font-display-xl text-[54px] sm:text-[72px] md:text-[90px] text-on-surface tracking-tighter leading-tight mb-6">
    Services &amp; <span class="italic font-light text-primary">Capabilities</span>
  </h1>
  <p class="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
    Bespoke frontend engineering, custom WebGL interfaces, and high-conversion marketing systems tailored for ambitious founders and product teams.
  </p>
</section>

<section class="w-full pb-20 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/10 mb-8">
            <span class="material-symbols-outlined text-primary text-[28px]">code</span>
          </div>
          <span class="font-label-caps text-xs text-primary uppercase tracking-widest block mb-2">01 // CORE ENGINEERING</span>
          <h2 class="font-headline-md text-[32px] text-on-surface mb-4">Custom Web Applications</h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed mb-6">
            Bespoke full-stack web applications and SaaS platforms engineered with React 19, Next.js 15, TypeScript, and Supabase. Fast, secure, and easily maintainable.
          </p>
          <div class="space-y-2.5 pt-4 border-t border-white/5 font-body-md text-sm text-on-surface">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Next.js App Router, SSR/SSG &amp; Edge API Routes</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> PostgreSQL database architecture with Supabase Auth</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> 100% strict TypeScript types &amp; modular state stores</div>
          </div>
        </div>
      </div>

      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/10 mb-8">
            <span class="material-symbols-outlined text-secondary text-[28px]">grain</span>
          </div>
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest block mb-2">02 // CREATIVE COMPUTING</span>
          <h2 class="font-headline-md text-[32px] text-on-surface mb-4">Interactive WebGL &amp; 3D</h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed mb-6">
            Custom GLSL fragment shaders, interactive physics engines, fluid dynamics solvers, and real-time canvas telemetry that captivate visitors without hurting frame rate.
          </p>
          <div class="space-y-2.5 pt-4 border-t border-white/5 font-body-md text-sm text-on-surface">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Navier-Stokes GPU fluid simulation engines</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Three.js &amp; GLSL liquid shader pipelines</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Off-screen suspension for zero CPU/battery drain</div>
          </div>
        </div>
      </div>

      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/10 mb-8">
            <span class="material-symbols-outlined text-tertiary text-[28px]">trending_up</span>
          </div>
          <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest block mb-2">03 // GROWTH &amp; CONVERSION</span>
          <h2 class="font-headline-md text-[32px] text-on-surface mb-4">High-Conversion Landing Pages</h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed mb-6">
            Editorial marketing websites tailored to elevate brand positioning, clarify complex value propositions, and drive inbound inquiries.
          </p>
          <div class="space-y-2.5 pt-4 border-t border-white/5 font-body-md text-sm text-on-surface">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Instant 5-second value proposition clarity</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Editorial typography hierarchy &amp; microinteractions</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Flawless responsive UX across mobile &amp; desktop</div>
          </div>
        </div>
      </div>

      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/10 mb-8">
            <span class="material-symbols-outlined text-[#E06D53] text-[28px]">speed</span>
          </div>
          <span class="font-label-caps text-xs text-[#E06D53] uppercase tracking-widest block mb-2">04 // AUDIT &amp; OPTIMIZATION</span>
          <h2 class="font-headline-md text-[32px] text-on-surface mb-4">Frontend Architecture &amp; Performance</h2>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed mb-6">
            Comprehensive code audits, removing layout thrashing, reducing JavaScript bundle sizes, and achieving 100/100 Core Web Vitals.
          </p>
          <div class="space-y-2.5 pt-4 border-t border-white/5 font-body-md text-sm text-on-surface">
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> Eliminating rAF layout recalculations</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> GPU-accelerated CSS compositing layers</div>
            <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> Complete WCAG AA keyboard accessibility</div>
          </div>
        </div>
      </div>

    </div>

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

    <div class="text-center pt-8">
      <a href="/contact" class="tactile-press px-9 py-4 font-label-caps text-sm text-background bg-paper-white hover:bg-surface-tint transition-all duration-300 rounded-full inline-flex items-center gap-3 shadow-xl font-medium">
        <span>Request a Project Quote</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
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
  title: 'About Anish Kadian & Aetherfolio Studio',
  description: 'Learn about Anish Kadian and the engineering philosophy behind Aetherfolio: bespoke code, 60fps performance, and elevated digital aesthetics.',
  canonicalUrl: 'https://aetherfolio.vercel.app/about',
  bodyContent: `
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center">
  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Engineering Background</span>
  </div>
  <h1 class="font-display-xl text-[54px] sm:text-[72px] md:text-[90px] text-on-surface tracking-tighter leading-tight mb-6">
    About <span class="italic font-light text-primary">Aetherfolio</span>
  </h1>
  <p class="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
    Independent creative engineer obsessed with bespoke code, 60fps performance, and elevated digital aesthetics.
  </p>
</section>

<section class="w-full pb-24 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-4xl mx-auto flex flex-col gap-16">
    <div class="p-8 sm:p-12 rounded-3xl bg-surface-container/40 border border-white/5 font-body-md text-base sm:text-lg text-on-surface-variant leading-relaxed space-y-6">
      <h2 class="font-headline-md text-3xl text-on-surface">The Story Behind the Studio</h2>
      <p>
        I am <strong>Anish Kadian</strong>, the founder and creative engineer behind Aetherfolio. I started this studio to bridge the gap between rigorous software engineering and world-class digital design.
      </p>
      <p>
        Too much of the modern web relies on bloated site builders, sluggish multi-megabyte templates, and generic marketing themes. Aetherfolio represents the counter-movement: <strong>writing pure, bespoke code from the first line</strong> to build memorable, lightning-fast digital experiences.
      </p>
      <p>
        When you work with Aetherfolio, there are no layers of account executives or junior outsourced developers. You partner directly with an engineer who cares deeply about typography, frame budgets, database performance, and your business goals.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/5">
        <h3 class="font-headline-md text-2xl text-on-surface mb-4">Core Principles</h3>
        <ul class="space-y-3 font-body-md text-sm text-on-surface-variant">
          <li class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Zero Template Bloat:</strong> Engineered from scratch with intentional dependencies.</span>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Frame-Budget Discipline:</strong> 60FPS animations using GPU transform layers.</span>
          </li>
          <li class="flex items-start gap-2.5">
            <span class="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
            <span><strong>Honest Craftsmanship:</strong> Real verified projects, transparent timelines, and clean handover.</span>
          </li>
        </ul>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/5">
        <h3 class="font-headline-md text-2xl text-on-surface mb-4">Primary Toolchain</h3>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-primary border border-white/10">Next.js 15</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-secondary border border-white/10">React 19</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-tertiary border border-white/10">TypeScript</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-on-surface-variant border border-white/10">Tailwind CSS v4</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-primary border border-white/10">WebGL 2.0 / GLSL</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-secondary border border-white/10">Canvas 2D</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-tertiary border border-white/10">Supabase</span>
          <span class="px-3 py-1 bg-surface-container-high rounded-full font-label-caps text-xs text-on-surface-variant border border-white/10">Vercel Edge</span>
        </div>
      </div>
    </div>

    <div class="text-center">
      <a href="/contact" class="tactile-press px-8 py-4 font-label-caps text-xs text-background bg-paper-white hover:bg-surface-tint transition-colors duration-300 rounded-full inline-flex items-center gap-2.5 font-medium shadow-lg">
        <span>Get in Touch with Anish</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
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
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center">
  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Engineering Insights</span>
  </div>
  <h1 class="font-display-xl text-[54px] sm:text-[72px] md:text-[90px] text-on-surface tracking-tighter leading-tight mb-6">
    Technical <span class="italic font-light text-primary">Journal</span>
  </h1>
  <p class="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
    In-depth architectural breakdowns, WebGL shader techniques, and frontend performance optimizations.
  </p>
</section>

<section class="w-full pb-24 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <a href="/journal/webgl-fluid-dynamics-at-60fps" class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="font-label-caps text-[10px] text-primary tracking-widest uppercase font-semibold">WebGL &amp; Graphics</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">6 min read</span>
        </div>
        <h2 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
          Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL
        </h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
          How we implemented an in-house Navier-Stokes fluid solver and liquid GLSL shaders without external canvas bundle bloat.
        </p>
      </div>
      <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-primary">
        <span>Read Full Article</span>
        <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </div>
    </a>

    <a href="/journal/zero-bloat-frontend-architecture" class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase font-semibold">Next.js &amp; Architecture</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">8 min read</span>
        </div>
        <h2 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
          Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue
        </h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
          Why avoiding pre-built templates and bloated UI libraries yields faster websites, cleaner maintenance, and authentic brand identity.
        </p>
      </div>
      <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-secondary">
        <span>Read Full Article</span>
        <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </div>
    </a>

    <a href="/journal/eliminating-layout-thrashing-gpu" class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
      <div>
        <div class="flex items-center gap-3 mb-4">
          <span class="font-label-caps text-[10px] text-tertiary tracking-widest uppercase font-semibold">Performance &amp; DOM</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">5 min read</span>
        </div>
        <h2 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
          Hardware Acceleration on the Web: Eliminating Layout Thrashing &amp; GPU Compositing
        </h2>
        <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
          A practical case study on fixing requestAnimationFrame layout recalculations and utilizing 3D transform layers for buttery-smooth 60fps scrolling.
        </p>
      </div>
      <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-tertiary">
        <span>Read Full Article</span>
        <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
      </div>
    </a>
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
<section class="relative pt-24 pb-16 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center">
  <div class="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Start an Engagement</span>
  </div>
  <h1 class="font-display-xl text-[54px] sm:text-[72px] md:text-[90px] text-on-surface tracking-tighter leading-tight mb-6">
    Start a <span class="italic font-light text-primary">Project</span>
  </h1>
  <p class="font-body-lg text-lg text-on-surface-variant max-w-xl mx-auto font-light leading-relaxed">
    Tell me about what you're building. I typically review and reply with technical feedback and scope estimates within 24 hours.
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

