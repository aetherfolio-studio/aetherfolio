const fs = require('fs');
const path = require('path');
const { assemblePage } = require('./build_projects.js');

// =========================================================================
// 1. HOMEPAGE (index.html)
// =========================================================================
const homeContent = `
<!-- Hero Section -->
<section class="relative pt-28 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
  <!-- 3D Celestial Armillary Orbital Background (Strictly Behind Typography) -->
  <div class="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden -z-10">
    <!-- SVG Engineering Datum Grid -->
    <svg class="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="eng-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#ffb4a5"/>
        </pattern>
        <pattern id="eng-grid-lg" x="0" y="0" width="192" height="192" patternUnits="userSpaceOnUse">
          <rect width="192" height="192" fill="url(#eng-grid)"/>
          <rect x="0" y="0" width="192" height="1" fill="#ffb4a5" opacity="0.15"/>
          <rect x="0" y="0" width="1" height="192" fill="#ffb4a5" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#eng-grid-lg)"/>
    </svg>

    <!-- Deep Ambient Glow Layer behind canvas -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-primary/10 blur-[100px] pointer-events-none -z-20"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-tertiary/10 blur-[80px] pointer-events-none -z-20"></div>

    <!-- Bespoke Interactive 3D Celestial Armillary Orbital Sculpture Canvas (20% Larger Frame & Subtle Depth) -->
    <canvas id="hero-3d-canvas" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1680px] h-[1140px] max-w-[100vw] pointer-events-none -z-10 opacity-35"></canvas>
  </div>
  
  <!-- Hero Content (Strictly in front with z-10) -->
  <div class="relative z-10 flex flex-col items-center justify-center text-center w-full">
    <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md">
      <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
      <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Accepting Select Projects · Q3/Q4</span>
    </div>

    <h1 class="font-display-xl text-[60px] sm:text-[80px] md:text-[100px] text-on-surface tracking-tighter leading-[0.95] mb-8 max-w-5xl">
      Custom-Coded <br class="hidden sm:block"/>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-light italic">Digital Experiences</span> <br class="hidden sm:block"/>
      for Ambitious Ideas.
    </h1>

    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto mb-10 leading-relaxed font-light">
      Aetherfolio is an independent creative engineering studio by <strong>Anish Kadian</strong>. I build bespoke React &amp; Next.js platforms, interactive 3D WebGL interfaces, and high-performance frontend systems from scratch — zero bloat, pure craftsmanship.
    </p>

    <!-- 5-Second Clarity Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full mb-12 text-left">
      <div class="p-5 rounded-xl bg-surface-container/60 border border-white/10 backdrop-blur-md">
        <span class="font-label-caps text-[10px] text-primary tracking-widest uppercase block mb-1">01 // What I Build</span>
        <p class="font-body-md text-xs sm:text-sm text-on-surface">Full-stack Next.js apps, WebGL shaders &amp; custom UI systems.</p>
      </div>
      <div class="p-5 rounded-xl bg-surface-container/60 border border-white/10 backdrop-blur-md">
        <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase block mb-1">02 // Who It's For</span>
        <p class="font-body-md text-xs sm:text-sm text-on-surface">Founders, product teams &amp; brands demanding distinct craft.</p>
      </div>
      <div class="p-5 rounded-xl bg-surface-container/60 border border-white/10 backdrop-blur-md">
        <span class="font-label-caps text-[10px] text-tertiary tracking-widest uppercase block mb-1">03 // Why Aetherfolio</span>
        <p class="font-body-md text-xs sm:text-sm text-on-surface">Zero template bloat, 100/100 Lighthouse &amp; bespoke engineering.</p>
      </div>
    </div>

    <!-- CTAs -->
    <div class="flex flex-wrap items-center justify-center gap-5">
      <a href="/contact" class="tactile-press px-8 py-4 font-label-caps text-xs sm:text-sm text-background bg-paper-white hover:bg-surface-tint transition-all duration-300 rounded-full flex items-center gap-3 shadow-lg font-medium">
        <span>Start a Project</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </a>
      <a href="/work" class="tactile-press px-8 py-4 font-label-caps text-xs sm:text-sm text-on-surface bg-surface-container/80 hover:bg-surface-container-high border border-white/15 rounded-full flex items-center gap-3 transition-all shadow-md">
        <span>View Selected Work</span>
        <span class="material-symbols-outlined text-[18px] text-primary">arrow_outward</span>
      </a>
    </div>
  </div>
</section>

<!-- Featured Flagship Work Section -->
<section class="w-full py-16 px-6 lg:px-margin-edge bg-surface/60 backdrop-blur-md border-t border-white/[0.06] relative z-10">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Featured Case Study</span>
        <h2 class="font-headline-md text-[36px] md:text-[48px] text-on-surface leading-tight mt-1">
          Featured <span class="italic font-light text-primary">Live Production</span> System
        </h2>
      </div>
      <a href="/work" class="inline-flex items-center gap-2 font-label-caps text-xs text-on-surface-variant hover:text-primary tracking-widest uppercase transition-colors">
        <span>Explore All Work</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
    </div>

    <!-- Kairo Card -->
    <div class="border-beam-card bg-surface-container/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl relative overflow-hidden group">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none"></div>
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
        <div class="flex flex-col gap-5 max-w-2xl">
          <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Live Production SaaS</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-xs text-on-surface-variant/70 tracking-widest">Hospital Operating System</span>
          </div>
          <h3 class="font-headline-md text-[32px] md:text-[44px] text-on-surface leading-tight">
            Kairo <span class="italic font-light text-primary">Hospital OS</span>
          </h3>
          <p class="font-body-md text-base text-on-surface-variant leading-relaxed">
            An enterprise-grade, intelligent healthcare operations platform built from scratch. Features an interactive 3D architectural digital twin of 4 clinical wings, live surgical suite orchestrator, 60fps continuous ECG waveform canvas telemetry, dynamic ward bed matrices with 1-click sanitization dispatch, and ambient AI clinical reasoning.
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
  </div>
</section>

<!-- What I Build / Capabilities Section -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Capabilities &amp; Services</span>
      <h2 class="font-headline-md text-[36px] md:text-[54px] text-on-surface leading-tight mt-2">
        What I <span class="italic font-light text-primary">Engineer</span> for Clients
      </h2>
      <p class="font-body-md text-on-surface-variant mt-4">
        Every project is architected from clean code without bloated templates, WordPress, or generic builders.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <!-- Capability 1 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10 mb-6">
            <span class="material-symbols-outlined text-primary text-[22px]">code</span>
          </div>
          <h3 class="font-headline-md text-[28px] text-on-surface mb-3">Custom Web Development</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Full-stack web applications and SaaS platforms powered by React 19, Next.js 15, TypeScript, and Supabase. Fast, scalable, and responsive on all screens.
          </p>
        </div>
        <ul class="font-body-md text-xs text-on-surface-variant/80 flex flex-col gap-2 pt-4 border-t border-white/5">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Next.js Server Components &amp; Edge API routes</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> Supabase / PostgreSQL database architecture</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary"></span> 100% Type-safe TypeScript codebase</li>
        </ul>
      </div>

      <!-- Capability 2 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10 mb-6">
            <span class="material-symbols-outlined text-secondary text-[22px]">grain</span>
          </div>
          <h3 class="font-headline-md text-[28px] text-on-surface mb-3">Interactive Experiences &amp; WebGL</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Bespoke visual computing, fluid simulations, custom GLSL fragment shaders, and 60FPS physics engines that elevate brand presence without sacrificing usability.
          </p>
        </div>
        <ul class="font-body-md text-xs text-on-surface-variant/80 flex flex-col gap-2 pt-4 border-t border-white/5">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Navier-Stokes GPU fluid dynamics solver</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Three.js &amp; GLSL fragment card shaders</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> Offscreen canvas suspension for zero battery drain</li>
        </ul>
      </div>

      <!-- Capability 3 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10 mb-6">
            <span class="material-symbols-outlined text-tertiary text-[22px]">trending_up</span>
          </div>
          <h3 class="font-headline-md text-[28px] text-on-surface mb-3">High-Conversion Landing Pages</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Conversion-focused editorial marketing experiences with obsessive attention to typographic hierarchy, clear calls-to-action, and tactile microinteractions.
          </p>
        </div>
        <ul class="font-body-md text-xs text-on-surface-variant/80 flex flex-col gap-2 pt-4 border-t border-white/5">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Instant 5-second value proposition clarity</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Sub-second First Contentful Paint (FCP)</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Seamless mobile touch UX</li>
        </ul>
      </div>

      <!-- Capability 4 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-2xl flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10 mb-6">
            <span class="material-symbols-outlined text-[#E06D53] text-[22px]">speed</span>
          </div>
          <h3 class="font-headline-md text-[28px] text-on-surface mb-3">Frontend Architecture &amp; Performance</h3>
          <p class="font-body-md text-on-surface-variant leading-relaxed mb-6">
            Eliminating layout thrashing, reducing JavaScript bundle weight, optimizing GPU compositing layers, and engineering interfaces for 100/100 Core Web Vitals.
          </p>
        </div>
        <ul class="font-body-md text-xs text-on-surface-variant/80 flex flex-col gap-2 pt-4 border-t border-white/5">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> Zero layout thrashing in rAF animation loops</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> GPU-accelerated CSS 3D transforms</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#E06D53]"></span> Complete WCAG AA accessibility compliance</li>
        </ul>
      </div>
    </div>

    <div class="text-center">
      <a href="/services" class="inline-flex items-center gap-2 font-label-caps text-xs text-primary hover:text-surface-tint tracking-widest uppercase transition-colors">
        <span>View Full Services &amp; Pricing Models</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
    </div>
  </div>
</section>

<!-- Engineering Process Section -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface-container-lowest/50 border-t border-white/[0.06] relative z-10">
  <div class="max-w-container-max mx-auto">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Methodology</span>
      <h2 class="font-headline-md text-[36px] md:text-[50px] text-on-surface leading-tight mt-2">
        How Projects Are <span class="italic font-light text-primary">Delivered</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
      <div class="p-6 rounded-2xl bg-surface-container/40 border border-white/5 flex flex-col justify-between">
        <div>
          <span class="font-label-caps text-xs text-primary/70 tracking-widest block mb-4">01 // DISCOVERY</span>
          <h3 class="font-headline-md text-xl text-on-surface mb-2">Scope &amp; Goals</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Understanding product architecture, target users, core requirements, and technical constraints.
          </p>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-surface-container/40 border border-white/5 flex flex-col justify-between">
        <div>
          <span class="font-label-caps text-xs text-secondary/70 tracking-widest block mb-4">02 // DIRECTION</span>
          <h3 class="font-headline-md text-xl text-on-surface mb-2">Architecture</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Defining data models, component hierarchy, design language, typography, and shader prototypes.
          </p>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-surface-container/40 border border-white/5 flex flex-col justify-between">
        <div>
          <span class="font-label-caps text-xs text-tertiary/70 tracking-widest block mb-4">03 // BUILD</span>
          <h3 class="font-headline-md text-xl text-on-surface mb-2">Co-Design &amp; Code</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Engineered concurrently with React 19, Next.js 15, and Tailwind CSS. Clean, maintainable code.
          </p>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-surface-container/40 border border-white/5 flex flex-col justify-between">
        <div>
          <span class="font-label-caps text-xs text-[#E06D53]/70 tracking-widest block mb-4">04 // REFINE</span>
          <h3 class="font-headline-md text-xl text-on-surface mb-2">60FPS Polish</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Hardware acceleration, mobile responsiveness, zero layout shifts, and accessibility testing.
          </p>
        </div>
      </div>
      <div class="p-6 rounded-2xl bg-surface-container/40 border border-white/5 flex flex-col justify-between">
        <div>
          <span class="font-label-caps text-xs text-primary/70 tracking-widest block mb-4">05 // LAUNCH</span>
          <h3 class="font-headline-md text-xl text-on-surface mb-2">Deploy &amp; Handover</h3>
          <p class="font-body-md text-xs text-on-surface-variant leading-relaxed">
            Production Vercel deployment, DNS &amp; domain configuration, technical documentation, and full code handover.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Journal / Technical Insights Section -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.06]">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
      <div>
        <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">Engineering Insights</span>
        <h2 class="font-headline-md text-[36px] md:text-[48px] text-on-surface leading-tight mt-1">
          Technical <span class="italic font-light text-primary">Journal</span>
        </h2>
      </div>
      <a href="/journal" class="inline-flex items-center gap-2 font-label-caps text-xs text-on-surface-variant hover:text-primary tracking-widest uppercase transition-colors">
        <span>View All Articles</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Article 1 -->
      <a href="/journal/webgl-fluid-dynamics-at-60fps" class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="font-label-caps text-[10px] text-primary tracking-widest uppercase">WebGL &amp; Graphics</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">6 min read</span>
          </div>
          <h3 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
            Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
            How we implemented an in-house Navier-Stokes fluid solver and liquid GLSL shaders without external canvas bundle bloat.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-primary">
          <span>Read Article</span>
          <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </a>

      <!-- Article 2 -->
      <a href="/journal/zero-bloat-frontend-architecture" class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase">Next.js &amp; Architecture</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">8 min read</span>
          </div>
          <h3 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
            Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Why avoiding pre-built templates and bloated UI libraries yields faster websites, cleaner maintenance, and authentic brand identity.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-secondary">
          <span>Read Article</span>
          <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </a>

      <!-- Article 3 -->
      <a href="/journal/eliminating-layout-thrashing-gpu" class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="font-label-caps text-[10px] text-tertiary tracking-widest uppercase">Performance &amp; DOM</span>
            <span class="text-on-surface-variant/40">•</span>
            <span class="font-label-caps text-[10px] text-on-surface-variant/70 tracking-widest">5 min read</span>
          </div>
          <h3 class="font-headline-md text-2xl text-on-surface group-hover:text-primary transition-colors mb-3 leading-snug">
            Hardware Acceleration on the Web: Eliminating Layout Thrashing &amp; GPU Compositing
          </h3>
          <p class="font-body-md text-sm text-on-surface-variant leading-relaxed">
            A practical case study on fixing requestAnimationFrame layout recalculations and utilizing 3D transform layers for buttery-smooth 60fps scrolling.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/5 flex items-center justify-between font-label-caps text-xs text-tertiary">
          <span>Read Article</span>
          <span class="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </div>
      </a>
    </div>
  </div>
</section>

<!-- Final Conversion Section -->
<section class="w-full py-24 px-6 lg:px-margin-edge bg-gradient-to-b from-transparent to-surface-container-lowest/60 relative overflow-hidden border-t border-white/[0.06]">
  <div class="max-w-container-max mx-auto text-center relative z-10 flex flex-col items-center">
    <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold mb-4">Let's Build Together</span>
    <h2 class="font-headline-md text-[40px] sm:text-[60px] md:text-[72px] text-on-surface leading-tight mb-6 max-w-4xl">
      Have an idea <span class="italic font-light text-primary">worth building?</span>
    </h2>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
      Whether you need a full-scale web application, an interactive landing page, or a high-performance frontend overhaul, let's schedule a technical review.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-5">
      <a href="/contact" class="tactile-press px-9 py-4 font-label-caps text-sm text-background bg-paper-white hover:bg-surface-tint transition-all duration-300 rounded-full flex items-center gap-3 shadow-xl font-medium">
        <span>Start a Project</span>
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </a>
      <a href="mailto:aether.getyourownsite@gmail.com" class="tactile-press px-8 py-4 font-label-caps text-sm text-on-surface bg-surface-container/80 hover:bg-surface-container-high border border-white/15 rounded-full flex items-center gap-3 transition-all shadow-md">
        <span>Email Directly</span>
        <span class="material-symbols-outlined text-[18px]">mail</span>
      </a>
    </div>
  </div>
</section>
`;

assemblePage({
  filename: 'index.html',
  activeRoute: '/',
  title: 'Aetherfolio — Creative Engineering & Custom Next.js Studio',
  description: 'Independent creative engineering studio by Anish Kadian. Specializing in bespoke React & Next.js platforms, 60FPS WebGL shaders, and high-performance frontend architecture.',
  canonicalUrl: 'https://aetherfolio.vercel.app/',
  ogType: 'website',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Aetherfolio Studio',
    'url': 'https://aetherfolio.vercel.app/',
    'logo': 'https://aetherfolio.vercel.app/logo.png',
    'description': 'Custom-coded React & Next.js web applications, interactive 3D WebGL interfaces, and high-performance frontend systems.',
    'founder': {
      '@type': 'Person',
      'name': 'Anish Kadian'
    },
    'areaServed': 'Worldwide',
    'sameAs': ['https://github.com/aetherfolio-studio']
  },
  bodyContent: homeContent
});

console.log('Homepage built successfully!');

