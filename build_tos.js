const fs = require('fs');
const { assemblePage } = require('./build_projects.js');

// =========================================================================
// FAQ ACCORDION RENDERER HELPER
// =========================================================================
function renderFaqSection({ eyebrow = "Frequently Asked Questions", title = "Questions &amp; Direct Answers", items = [] }) {
  const itemsHtml = items.map((item, index) => `
    <details class="faq-item group py-6 cursor-pointer select-none transition-all">
      <summary class="flex items-center justify-between text-left gap-4 font-display-xl text-xl sm:text-2xl text-on-surface group-hover:text-primary transition-colors list-none focus-visible:outline-none">
        <span class="leading-snug">${item.q}</span>
        <span class="w-8 h-8 rounded-full bg-surface-container-high/60 border border-white/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
          <span class="material-symbols-outlined text-[18px]">add</span>
        </span>
      </summary>
      <div class="pt-4 pb-2 font-body-md text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
        ${item.a}
      </div>
    </details>
  `).join('\n');

  return `
<!-- FAQ Section (Accessible HTML5 Disclosures & Search Relevance) -->
<section class="w-full py-24 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.06]">
  <div class="max-w-4xl mx-auto flex flex-col gap-12">
    <div class="flex flex-col gap-3">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">${eyebrow}</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">${title}</h2>
    </div>

    <div class="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
      ${itemsHtml}
    </div>
  </div>
</section>
`;
}

function buildFaqSchema(items) {
  return {
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.q.replace(/&amp;/g, '&'),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&')
      }
    }))
  };
}


// =========================================================================
// 1. WORK ARCHIVE (work.html)
// =========================================================================
const workFaqItems = [
  {
    q: "Are the systems in the selected work archive actual working codebases?",
    a: 'Yes. Every project in our archive is an active, fully functional production system engineered from scratch. You can test live deployments such as the <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">Kairo Hospital OS live demo</a> or inspect the underlying <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="text-secondary hover:underline font-medium">GitHub source code repository</a>.'
  },
  {
    q: "What architectural standards are enforced across all studio projects?",
    a: 'Every build adheres to strict zero-bloat architecture: React Server Components (RSC) for minimal client-side JavaScript, hardware-accelerated CSS and WebGL motion, 100/100 Core Web Vitals, and strict accessibility compliance. Read our philosophy in <a href="/journal/zero-bloat-frontend-architecture" class="text-primary hover:underline font-medium">Zero-Bloat Next.js Architecture</a>.'
  },
  {
    q: "Can Aetherfolio build a bespoke digital twin or operational dashboard for our company?",
    a: 'Yes. We architect custom spatial 3D environments, real-time Canvas 2D telemetry feeds, and complex state orchestrators tailored to domain-specific workflows (such as healthcare, fintech, robotics, and logistics). <a href="/contact" class="text-tertiary hover:underline font-medium">Start a project inquiry</a> to discuss your requirements.'
  },
  {
    q: "Who owns the intellectual property and code upon project completion?",
    a: 'You do. 100% of the custom codebase, design assets, shaders, and deployment configurations transfer entirely to your organization upon final milestone delivery and sign-off.'
  }
];

const workJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://aetherfolio.vercel.app/work#page",
      "name": "Selected Work & Case Studies — Aetherfolio Studio",
      "description": "Curated index of production digital platforms, 3D WebGL interfaces, and high-performance frontend systems engineered by Aetherfolio Studio.",
      "url": "https://aetherfolio.vercel.app/work",
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      }
    },
    buildFaqSchema(workFaqItems)
  ]
};

const workContent = `
<!-- Work Hero: Editorial Monograph Header -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-primary/10 blur-[100px]"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-emerald-500/10 blur-[80px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Selected Work Archive</span>
    <span class="text-on-surface-variant/75">•</span>
    <span class="font-label-caps text-[10px] text-on-surface-variant tracking-widest">[ 04 ACTIVE SYSTEMS ]</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Selected <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">Work &amp; Systems</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    A curated index of production digital platforms, interactive WebGL applications, and custom frontend systems. Handcrafted from clean code for 60fps performance, authentic brand distinction, and measurable reliability.
  </p>

  <!-- Telemetry Bar -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto p-4 rounded-2xl bg-surface-container/40 border border-white/[0.06] text-xs font-label-caps text-left backdrop-blur-md">
    <div>
      <span class="text-on-surface-variant/75 uppercase tracking-widest block text-[10px] mb-0.5">Core Web Vitals</span>
      <span class="text-emerald-400 font-semibold flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 100/100 Target</span>
    </div>
    <div>
      <span class="text-on-surface-variant/75 uppercase tracking-widest block text-[10px] mb-0.5">Animation Standard</span>
      <span class="text-on-surface font-semibold">60–120 FPS GPU</span>
    </div>
    <div>
      <span class="text-on-surface-variant/75 uppercase tracking-widest block text-[10px] mb-0.5">Source Architecture</span>
      <span class="text-on-surface font-semibold">100% Handcrafted</span>
    </div>
    <div>
      <span class="text-on-surface-variant/75 uppercase tracking-widest block text-[10px] mb-0.5">Codebase Ownership</span>
      <span class="text-primary font-semibold">100% Client IP</span>
    </div>
  </div>
</section>

<!-- Projects Showcase with Asymmetric Editorial Rhythm -->
<section class="w-full pb-20 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">

    <!-- PROJECT 1: KAIRO HOSPITAL OS (Full Width Flagship) -->
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 md:p-14 rounded-3xl relative overflow-hidden group border border-white/[0.06]">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 relative z-10">
        <div class="flex flex-col gap-6 max-w-2xl">
          <div class="flex flex-wrap items-center gap-3">
            <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
            <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // Flagship Clinical SaaS</span>
            <span class="text-on-surface-variant/75">•</span>
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
              <span class="text-on-surface-variant/75 uppercase block text-[10px]">Client / Domain</span>
              <span class="text-on-surface font-medium">Healthcare SaaS</span>
            </div>
            <div>
              <span class="text-on-surface-variant/75 uppercase block text-[10px]">Rendering Engine</span>
              <span class="text-on-surface font-medium">Canvas 2D / 60FPS</span>
            </div>
            <div>
              <span class="text-on-surface-variant/75 uppercase block text-[10px]">Architecture</span>
              <span class="text-primary font-medium">Next.js 15.5 Edge</span>
            </div>
            <div>
              <span class="text-on-surface-variant/75 uppercase block text-[10px]">Performance</span>
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
            <span class="text-on-surface-variant/75">•</span>
            <span class="font-label-caps text-xs text-on-surface-variant tracking-widest">Shader Architecture</span>
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
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Graphics Breakdown</span>
          <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press inline-flex items-center gap-2 font-label-caps text-xs text-on-surface hover:text-secondary uppercase tracking-widest transition-colors">
            <span>Read Shader Guide &rarr;</span>
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
          <span class="text-on-surface-variant/75">•</span>
          <span class="font-label-caps text-xs text-on-surface-variant tracking-widest">Global Edge Distribution</span>
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

${renderFaqSection({
  eyebrow: "Selected Work // FAQ",
  title: "Frequently Asked Questions About Our Work",
  items: workFaqItems
})}
`;

assemblePage({
  filename: 'work.html',
  activeRoute: '/work',
  title: 'Portfolio & Case Studies — Next.js & WebGL Projects | Aetherfolio',
  description: 'Explore live production systems and case studies engineered by Aetherfolio Studio, featuring Kairo Hospital OS, custom WebGL interfaces, and Next.js platforms.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
  jsonLd: workJsonLd,
  bodyContent: workContent
});


// =========================================================================
// 2. KAIRO HOSPITAL OS CASE STUDY (work/kairo.html)
// =========================================================================
const kairoFaqItems = [
  {
    q: "What operational problem was Kairo Hospital OS engineered to solve?",
    a: 'Kairo was built to replace fragmented, sluggish clinical software by uniting real-time 3D spatial hospital layouts, 60fps biometric telemetry, surgical theater Gantt scheduling, and ambient AI clinical reasoning into one unified, edge-hosted interface.'
  },
  {
    q: "What technologies power the Kairo Hospital OS platform?",
    a: 'Kairo is built with Next.js 15.5 Edge, React 19, TypeScript, Tailwind CSS v4, and custom HTML5 Canvas 2D telemetry engines. The spatial 3D twin runs on lightweight WebGL geometries optimized for zero frame drops.'
  },
  {
    q: "How does the real-time ECG waveform telemetry achieve 60 FPS without memory leaks?",
    a: 'Rather than rendering DOM or SVG nodes for every data point, Kairo uses a memory-efficient circular ring buffer data structure rendered via hardware-accelerated Canvas 2D bezier paths, keeping CPU utilization under 1% on mobile tablets.'
  },
  {
    q: "Can I inspect the live Kairo deployment and open source repository?",
    a: 'Yes. You can launch the interactive system directly at <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline font-medium">kairo-hospital.vercel.app</a> or review the complete codebase on <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="text-secondary hover:underline font-medium">GitHub</a>.'
  },
  {
    q: "Can Aetherfolio build a similar custom interface or operational dashboard for our team?",
    a: 'Yes. We architect bespoke dashboards, clinical tools, and spatial 3D interfaces for specialized industries. Reach out via our <a href="/contact" class="text-tertiary hover:underline font-medium">Contact Portal</a> with your requirements.'
  }
];

const kairoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://aetherfolio.vercel.app/work/kairo#article",
      "headline": "Kairo Hospital OS — Architecture & Engineering Case Study",
      "description": "Technical case study detailing the architectural design, 60fps Canvas 2D telemetry engine, 3D spatial digital twin, and Next.js 15 implementation of Kairo Hospital OS.",
      "url": "https://aetherfolio.vercel.app/work/kairo",
      "image": "https://aetherfolio.vercel.app/assets/og/og-kairo.png",
      "author": {
        "@type": "Person",
        "name": "Anish Kadian",
        "jobTitle": "Lead Creative Engineer",
        "sameAs": ["https://github.com/aetherfolio-studio"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "about": {
        "@type": "SoftwareApplication",
        "name": "Kairo Hospital OS",
        "operatingSystem": "Web (Edge Native)",
        "applicationCategory": "Healthcare Operations Platform",
        "url": "https://kairo-hospital.vercel.app"
      }
    },
    buildFaqSchema(kairoFaqItems)
  ]
};

const kairoContent = `
<!-- Case Study Hero -->
<article class="w-full max-w-4xl mx-auto px-6 py-20 relative">
  <div class="absolute inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-primary/10 blur-[90px]"></div>
    <div class="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-emerald-500/10 blur-[70px]"></div>
  </div>

  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-8" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/work" class="hover:text-primary transition-colors">Work</a>
    <span>/</span>
    <span class="text-primary" aria-current="page">Kairo Hospital OS</span>
  </nav>

  <header class="mb-16">
    <div class="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-caps text-xs">
      <span class="w-2 h-2 rounded-full bg-[#E06D53] animate-pulse"></span>
      <span class="tracking-widest uppercase font-semibold">Production Clinical Operating System</span>
    </div>

    <h1 class="font-display-xl text-[48px] sm:text-[68px] md:text-[84px] text-on-surface font-light tracking-tight leading-[0.94] mb-8">
      Kairo <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal">Hospital OS</span>
    </h1>

    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant font-light leading-relaxed mb-12">
      An enterprise clinical command system uniting an interactive 3D spatial hospital digital twin, 60fps continuous biometric telemetry, surgical theater synchronization, and ambient clinical AI reasoning into one cohesive, zero-bloat platform.
    </p>

    <!-- Metadata Matrix -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06] text-xs font-label-caps">
      <div>
        <span class="text-on-surface-variant/75 uppercase block text-[10px] mb-1 font-medium">Domain</span>
        <span class="text-on-surface font-semibold text-sm">Healthcare SaaS</span>
      </div>
      <div>
        <span class="text-on-surface-variant/75 uppercase block text-[10px] mb-1 font-medium">Studio Role</span>
        <span class="text-on-surface font-semibold text-sm">Sole Architect &amp; Lead</span>
      </div>
      <div>
        <span class="text-on-surface-variant/75 uppercase block text-[10px] mb-1 font-medium">Tech Stack</span>
        <span class="text-primary font-semibold text-sm">Next.js 15, Canvas 2D</span>
      </div>
      <div>
        <span class="text-on-surface-variant/75 uppercase block text-[10px] mb-1 font-medium">Performance</span>
        <span class="text-emerald-400 font-semibold text-sm">100/100 Core Vitals</span>
      </div>
    </div>
  </header>

  <!-- Deep Technical Case Study Body -->
  <div class="flex flex-col gap-16 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    
    <!-- Section 1: Overview & The Clinical Problem -->
    <section class="flex flex-col gap-6" id="overview">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">01 // Problem &amp; Operational Context</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Legacy Hospital Software Fails Through Interface Fragmentation &amp; Latency
      </h2>
      <p>
        Modern hospital environments are overwhelmed by fragmented software. Clinical teams routinely juggle disconnected electronic medical record (EMR) windows, hardware vitals monitors, pagers, and paper ward charts. This fragmentation leads to critical operational bottlenecks:
      </p>
      <ul class="flex flex-col gap-3 pl-4 border-l border-white/10 text-sm sm:text-base">
        <li><strong>Surgical Theater Desynchronization:</strong> Operating room turnover delays average 25–40 minutes due to uncoordinated status updates between surgical prep, anesthesia, and PACU recovery teams.</li>
        <li><strong>Ward Bed Bottlenecks:</strong> Newly discharged beds remain unassigned for hours because environmental service sanitization requests are routed through phone calls rather than automated digital queues.</li>
        <li><strong>Telemetry Lag &amp; DOM Bloat:</strong> Traditional web-based monitoring dashboards attempt to render real-time ECG waveforms via SVG or DOM elements, triggering continuous browser layout reflows and degrading device battery life.</li>
      </ul>
      <p>
        The objective of Kairo Hospital OS was to engineer an all-in-one clinical command platform capable of running at 60 FPS on edge hardware, providing complete spatial awareness of hospital wings, and visualizing continuous vitals with zero layout shifts.
      </p>
    </section>

    <!-- Section 2: 3D Spatial Digital Twin Architecture -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-secondary tracking-widest uppercase font-semibold">02 // Spatial Architecture</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Interactive 3D Hospital Digital Twin &amp; Floor Orchestration
      </h2>
      <p>
        Rather than navigating nested tables of room numbers, Kairo provides a real-time spatial digital twin of the hospital layout. The interface models 4 core functional zones:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-2">
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold">Surgical Wing (OR 1–6)</span>
          <p class="text-sm font-light text-on-surface-variant">Live Gantt schedule showing patient induction, surgical stage, robotic telemetry, and estimated closure times.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-2">
          <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">Intensive Care Unit (ICU)</span>
          <p class="text-sm font-light text-on-surface-variant">Continuous multi-parameter monitoring feeds with dynamic alert thresholding and automated emergency escalation.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-2">
          <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold">Ward Bed Floor Matrix</span>
          <p class="text-sm font-light text-on-surface-variant">Color-coded bed availability grid (Occupied, Discharging, Sanitizing, Available) with 1-click cleaning crew dispatch.</p>
        </div>
        <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-2">
          <span class="font-label-caps text-xs text-muted-gold uppercase tracking-widest font-semibold">Diagnostic Radiology</span>
          <p class="text-sm font-light text-on-surface-variant">High-throughput imaging queue with automated PACS integration and preliminary AI anomaly highlighting.</p>
        </div>
      </div>
    </section>

    <!-- Section 3: Hardware-Accelerated ECG Waveform Engine -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-tertiary tracking-widest uppercase font-semibold">03 // Graphics &amp; Telemetry</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Continuous 60FPS Canvas 2D Biometric Waveforms
      </h2>
      <p>
        Standard charting libraries create DOM nodes for every data point or SVG line segment. In high-frequency clinical streams (ECG at 250Hz sample rate), this causes catastrophic memory churn and garbage collection stutter.
      </p>
      <p>
        We architected an in-house Canvas 2D waveform renderer using a <strong>circular ring buffer</strong>. The buffer stores the latest 1,024 biometric readings. On every animation frame, the renderer performs a single contiguous bezier path stroke across the canvas backing store, avoiding DOM mutations entirely:
      </p>

      <div class="p-6 rounded-2xl bg-surface-container/70 border border-white/[0.06] font-mono text-xs text-tertiary overflow-x-auto">
        <pre><code>// Zero-Allocation Canvas 2D Waveform Loop
function renderECGFrame(ctx, buffer, head, width, height) {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.strokeStyle = '#5dd9cf';
    ctx.lineWidth = 2.0;

    const step = width / buffer.length;
    for (let i = 0; i &lt; buffer.length; i++) {
        const index = (head + i) % buffer.length;
        const x = i * step;
        const y = height * 0.5 - (buffer[index] * height * 0.4);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}</code></pre>
      </div>

      <p>
        This engine renders ECG, SpO2 pulse plethysmographs, and respiratory waveforms at a stable 60–120 FPS while consuming under 1% CPU utilization on edge client tablets.
      </p>
    </section>

    <!-- Section 4: Architecture & Performance Impact -->
    <section class="flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <span class="font-label-caps text-xs text-emerald-400 tracking-widest uppercase font-semibold">04 // Verification &amp; Outcomes</span>
      </div>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light leading-snug">
        Next.js 15 Server Components &amp; Zero Reflow Layouts
      </h2>
      <p>
        By migrating all static clinical documentation and structural navigation to React Server Components (RSC), the client-side JavaScript bundle was drastically reduced. Client hydration is isolated strictly to the telemetry canvas and timeline slider components.
      </p>
      <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-emerald-400 uppercase tracking-widest font-semibold">Measured Technical Outcomes</span>
        <ul class="flex flex-col gap-2.5 text-sm">
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span> <strong>100/100 Core Web Vitals:</strong> Perfect score across Performance, Accessibility, Best Practices, and SEO.</li>
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span> <strong>Sub-Second First Contentful Paint:</strong> Initial paint achieved in under 600ms on 4G mobile networks.</li>
          <li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span> <strong>Zero Cumulative Layout Shift (0.00 CLS):</strong> Fixed spatial grid dimensions ensure zero layout jank during live data streaming.</li>
        </ul>
      </div>
      <p>
        Explore how these architecture principles are applied across our client engagements in our <a href="/services" class="text-primary hover:underline font-medium">Services &amp; Capabilities manifesto</a> or read our deep-dive on <a href="/journal/zero-bloat-frontend-architecture" class="text-secondary hover:underline font-medium">Zero-Bloat Next.js Architecture</a>.
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

${renderFaqSection({
  eyebrow: "Kairo Hospital OS // Technical FAQ",
  title: "Case Study &amp; Architecture Questions",
  items: kairoFaqItems
})}
`;

assemblePage({
  filename: 'work/kairo.html',
  activeRoute: '/work',
  title: 'Kairo Hospital OS — Next.js 15 & WebGL Healthcare Dashboard Case Study | Aetherfolio',
  description: 'Deep technical breakdown of Kairo Hospital OS: building an enterprise 3D clinical digital twin, 60fps continuous ECG canvas telemetry, and zero-bloat Next.js architecture.',
  canonicalUrl: 'https://aetherfolio.vercel.app/work/kairo',
  ogType: 'article',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-kairo.png',
  jsonLd: kairoJsonLd,
  bodyContent: kairoContent
});


// =========================================================================
// 3. SERVICES & MANIFESTO (services.html)
// =========================================================================
const servicesFaqItems = [
  {
    q: "What does Aetherfolio specialize in?",
    a: 'Aetherfolio specializes in bespoke full-stack Next.js and React web applications, interactive 3D WebGL / Three.js interfaces, high-conversion editorial landing pages, and frontend performance engineering & refactoring. Explore our capabilities in our <a href="/services" class="text-primary hover:underline font-medium">Manifesto</a> or view our <a href="/work" class="text-secondary hover:underline font-medium">Selected Work archive</a>.'
  },
  {
    q: "Do you build custom Next.js websites and applications from scratch?",
    a: 'Yes. Every application is handcrafted from clean TypeScript and React Server Components (RSC) without relying on bloated off-the-shelf templates or generic WordPress themes. This guarantees sub-second page loads, zero dependency lock-in, and full intellectual property ownership.'
  },
  {
    q: "Do you work with React and modern frontend architectures?",
    a: 'Yes. We specialize in React 19, Next.js 15, TypeScript, and edge-native architectures. We isolate client hydration strictly to interactive leaves while rendering layout and editorial content via server components for optimal Core Web Vitals.'
  },
  {
    q: "Can you build Three.js and WebGL experiences at 60 FPS?",
    a: 'Absolutely. We author custom GLSL fragment shaders, Signed Distance Field (SDF) geometries, and GPU-driven physics solvers (such as fluid and particle dynamics) engineered to run smoothly at 60–120 FPS on both mobile devices and desktop GPUs. Read our technical breakdown on <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-primary hover:underline font-medium">60FPS WebGL Fluid Dynamics</a>.'
  },
  {
    q: "Can you work with an existing Next.js or React codebase?",
    a: 'Yes. We frequently partner with product teams to conduct comprehensive performance audits, eliminate layout thrashing, refactor legacy state architectures, and modernize frontend codebases to Next.js 15 and React 19. Learn how we eliminate jank in our guide to <a href="/journal/eliminating-layout-thrashing-gpu" class="text-secondary hover:underline font-medium">Eliminating Layout Thrashing &amp; GPU Compositing</a>.'
  },
  {
    q: "How long does a typical project take?",
    a: 'High-impact landing pages and bespoke microsites typically take 2 to 4 weeks from concept to production. Full-scale SaaS platforms, complex interactive WebGL interfaces, or clinical dashboards (similar to our <a href="/work/kairo" class="text-tertiary hover:underline font-medium">Kairo Hospital OS</a>) typically range from 4 to 8 weeks depending on architectural scope.'
  },
  {
    q: "Do you work with international clients?",
    a: 'Yes. Aetherfolio works with startups, design studios, and enterprise founders globally across North America, Europe, Asia, and Australasia, utilizing asynchronous communication, GitHub pull requests, and scheduled video milestone reviews.'
  },
  {
    q: "What types of companies are a good fit for Aetherfolio?",
    a: 'We are the ideal partner for ambitious founders, tech startups, creative studios, and product leaders who prioritize distinct brand equity, artisanal code craftsmanship, and sub-second web performance over cookie-cutter template outputs.'
  },
  {
    q: "How does project scoping and commercial pricing work?",
    a: 'Engagements are structured as transparent, fixed-scope milestones or dedicated sprint-based partnerships. You receive a direct architectural review and itemized quotation within 24 hours of <a href="/contact" class="text-primary hover:underline font-medium">submitting a project inquiry</a>.'
  }
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://aetherfolio.vercel.app/services#service",
      "name": "Creative Engineering & Frontend Architecture Services",
      "provider": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "url": "https://aetherfolio.vercel.app/services",
      "description": "Bespoke full-stack web applications, interactive 3D WebGL interfaces, editorial landing pages, and frontend performance optimization.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Studio Engineering Capabilities",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Full-Stack Next.js Applications" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Interactive 3D WebGL & Custom Shaders" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "High-Conversion Editorial Landing Pages" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Frontend Performance Audits & Refactoring" } }
        ]
      }
    },
    buildFaqSchema(servicesFaqItems)
  ]
};

const servicesContent = `
<!-- Services Hero: Studio Manifesto -->
<section class="relative pt-32 pb-24 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[100px]"></div>
  </div>

  <div class="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
    <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Capabilities &amp; Studio Manifesto</span>
  </div>

  <h1 class="font-display-xl text-[64px] sm:text-[88px] md:text-[108px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
    Engineering <br class="hidden sm:block"/>
    <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-2">Without Bloat</span>
  </h1>

  <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed mb-12">
    Aetherfolio operates on a simple principle: every line of code should serve a distinct purpose. We build custom-coded digital experiences with pristine type safety, hardware-accelerated animations, and zero template dependencies.
  </p>
</section>

<!-- Manifesto Stems -->
<section class="w-full pb-24 px-6 lg:px-margin-edge bg-surface relative z-10" id="manifesto">
  <div class="max-w-4xl mx-auto flex flex-col gap-20">

    <!-- Stem 01 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-primary/60 font-light shrink-0">01</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Custom Full-Stack Next.js Applications &amp; SaaS</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Full-stack web applications engineered with Next.js 15, React 19, TypeScript, and Supabase / PostgreSQL. From authenticated user portals to complex realtime operational dashboards like our <a href="/work/kairo" class="text-primary hover:underline font-medium">Kairo Hospital OS flagship</a>, we build scalable architectures with pristine type safety and sub-second edge routing.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-primary tracking-widest uppercase border border-white/[0.06]">React Server Components</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">PostgreSQL Row-Level Security</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Edge API Caching</span>
        </div>
      </div>
    </div>

    <!-- Stem 02 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-secondary/60 font-light shrink-0">02</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Interactive 3D WebGL &amp; Custom Shaders</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Transform your digital presence from flat marketing into an unforgettable, interactive brand world. Custom Three.js geometries, GLSL fragment shaders, fluid simulations, and responsive particle fields engineered for stable 60–120 FPS on mobile and desktop viewports. Learn more in our <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-secondary hover:underline font-medium">60FPS WebGL Fluid Dynamics guide</a>.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-secondary tracking-widest uppercase border border-white/[0.06]">GLSL Shaders</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Three.js</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">GPU Hardware Acceleration</span>
        </div>
      </div>
    </div>

    <!-- Stem 03 -->
    <div class="border-b border-white/[0.06] pb-16 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-tertiary/60 font-light shrink-0">03</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">High-Conversion Editorial Landing Experiences</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Product launch pages and marketing experiences with uncompromising typography, bespoke microinteractions, and instant 5-second value proposition clarity. Designed and coded with zero template dependencies to guarantee unique brand distinction and sub-second First Contentful Paint.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-tertiary tracking-widest uppercase border border-white/[0.06]">Typographic Hierarchy</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Bespoke Microinteractions</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">High-Intent Funnels</span>
        </div>
      </div>
    </div>

    <!-- Stem 04 -->
    <div class="pb-8 flex flex-col md:flex-row items-start gap-8">
      <span class="font-display-xl text-5xl sm:text-6xl text-muted-gold/60 font-light shrink-0">04</span>
      <div class="flex flex-col gap-4">
        <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Performance Audits &amp; Frontend Refactoring</h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          Comprehensive diagnostic overhaul of sluggish codebases. We eliminate layout thrashing, purge render-blocking JavaScript, optimize CSS compositing layers, and elevate web applications to 100/100 Core Web Vitals. Read our breakdown on <a href="/journal/eliminating-layout-thrashing-gpu" class="text-muted-gold hover:underline font-medium">eliminating layout thrashing</a>.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-muted-gold tracking-widest uppercase border border-white/[0.06]">Reflow Elimination</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">Bundle Shrinking</span>
          <span class="px-3.5 py-1 bg-surface-container-high/60 rounded-full font-label-caps text-[10px] text-on-surface-variant tracking-widest uppercase border border-white/[0.06]">100/100 Core Vitals</span>
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

${renderFaqSection({
  eyebrow: "Capabilities // FAQ",
  title: "Commercial &amp; Technical Capabilities FAQ",
  items: servicesFaqItems
})}
`;

assemblePage({
  filename: 'services.html',
  activeRoute: '/services',
  title: 'Next.js & WebGL Development Services — Aetherfolio Studio',
  description: 'Custom Next.js development, React engineering, WebGL interfaces, and frontend performance services by Aetherfolio. Bespoke code. Zero templates. 60FPS delivery.',
  canonicalUrl: 'https://aetherfolio.vercel.app/services',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-services.png',
  jsonLd: servicesJsonLd,
  bodyContent: servicesContent
});


// =========================================================================
// 4. ABOUT & STUDIO PROFILE (about.html)
// =========================================================================
const aboutFaqItems = [
  {
    q: "What is Aetherfolio Studio?",
    a: 'Aetherfolio is an independent creative engineering practice founded by lead engineer Anish Kadian, dedicated to crafting bespoke digital experiences, 3D WebGL interfaces, and high-performance Next.js platforms.'
  },
  {
    q: "Who works on client projects at Aetherfolio?",
    a: 'You work directly with lead engineer Anish Kadian from initial architectural conception and design prototyping to final code delivery and edge deployment. We do not use intermediary account managers or outsource development to junior contractors.'
  },
  {
    q: "What makes Aetherfolio different from a traditional web agency?",
    a: 'Traditional agencies frequently rely on generic pre-made templates, bloated WordPress installations, or multi-megabyte UI libraries that compromise speed and brand distinctiveness. Aetherfolio handcrafts every interface with bespoke typography, custom GLSL shaders, and zero unnecessary dependencies.'
  },
  {
    q: "What technologies does Aetherfolio use in production?",
    a: 'Our core production stack consists of Next.js 15, React 19, TypeScript, WebGL 2.0, Three.js, GLSL shaders, Tailwind CSS v4, Supabase, PostgreSQL, and Vercel Edge.'
  },
  {
    q: "Does Aetherfolio work with startups and technology companies?",
    a: 'Yes. We partner with early-stage to growth-stage startups, visionary founders, design studios, and enterprise innovation teams who require distinctive digital flagships and reliable, edge-optimized architecture.'
  },
  {
    q: "Does Aetherfolio work with international clients across timezones?",
    a: 'Yes. We utilize asynchronous project communication, structured video walkthroughs, live preview deployment URLs on Vercel, and clear GitHub pull request tracking to ensure seamless collaboration with teams worldwide.'
  }
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aetherfolio.vercel.app/about#anish-kadian",
      "name": "Anish Kadian",
      "jobTitle": "Creative Engineer & Studio Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "url": "https://aetherfolio.vercel.app/about",
      "sameAs": [
        "https://github.com/aetherfolio-studio"
      ],
      "knowsAbout": [
        "Next.js",
        "React",
        "TypeScript",
        "WebGL",
        "GLSL Shaders",
        "Three.js",
        "Creative Engineering",
        "Frontend Performance"
      ]
    },
    buildFaqSchema(aboutFaqItems)
  ]
};

const aboutContent = `
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
<section class="w-full pb-20 px-6 lg:px-margin-edge bg-surface relative z-10">
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
        Aetherfolio exists to offer a different path: bespoke engineering where typography, interaction physics, and 3D visual computing are tailored specifically to your brand narrative. Every line of HTML, CSS, and GLSL is written by hand with obsessive precision. Explore our live work in the <a href="/work" class="text-primary hover:underline font-medium">Selected Work archive</a>.
      </p>
    </div>

    <!-- 4 Core Principles -->
    <div class="flex flex-col gap-8" id="pillars">
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

${renderFaqSection({
  eyebrow: "Studio Profile // FAQ",
  title: "Frequently Asked Questions About Aetherfolio",
  items: aboutFaqItems
})}
`;

assemblePage({
  filename: 'about.html',
  activeRoute: '/about',
  title: 'About Anish Kadian — Freelance Next.js & WebGL Developer | Aetherfolio',
  description: 'Anish Kadian is a freelance Next.js and WebGL developer specializing in custom-coded React platforms, 60FPS shader interfaces, and zero-bloat frontend architecture.',
  canonicalUrl: 'https://aetherfolio.vercel.app/about',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
  jsonLd: aboutJsonLd,
  bodyContent: aboutContent
});


// =========================================================================
// 5. JOURNAL & ARTICLES (journal.html & 3 in-depth articles)
// =========================================================================
const journalIndexJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Aetherfolio Engineering Journal",
  "description": "In-depth architectural breakdowns, WebGL shader optimization guides, and Next.js performance engineering reports from Aetherfolio Studio.",
  "url": "https://aetherfolio.vercel.app/journal",
  "publisher": {
    "@type": "Organization",
    "name": "Aetherfolio Studio",
    "url": "https://aetherfolio.vercel.app/"
  }
};

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
          <span class="text-on-surface-variant/75">•</span>
          <span class="text-on-surface-variant">8 min read</span>
        </div>
        <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light group-hover:text-primary transition-colors leading-tight">
          <a href="/journal/webgl-fluid-dynamics-at-60fps">Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL</a>
        </h2>
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          How to implement an in-house Navier-Stokes Eulerian fluid solver and liquid GLSL shaders in WebGL 2.0 with Ping-Pong Framebuffer Objects and zero external canvas library bloat.
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
            <span class="text-on-surface-variant/75">•</span>
            <span class="text-on-surface-variant">10 min read</span>
          </div>
          <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light group-hover:text-secondary transition-colors leading-snug">
            <a href="/journal/zero-bloat-frontend-architecture">Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue</a>
          </h2>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Why avoiding pre-built templates and massive component libraries creates faster websites, cleaner maintenance, and authentic brand equity.
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
            <span class="text-on-surface-variant/75">•</span>
            <span class="text-on-surface-variant">7 min read</span>
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
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-journal.png',
  jsonLd: journalIndexJsonLd,
  bodyContent: journalIndexContent
});


// =========================================================================
// ARTICLE 1: WEBGL FLUID DYNAMICS (Deep Technical Guide)
// =========================================================================
const article1FaqItems = [
  {
    q: "What is the primary advantage of Eulerian fluid simulation over particle-based Lagrangian simulation in WebGL?",
    a: 'Eulerian grids represent physical space as 2D floating-point texture cells, allowing the entire advection, divergence, and pressure Poisson loop to execute completely in parallel across GPU fragment shaders without CPU thread bottlenecks.'
  },
  {
    q: "Why are Double-Buffered Framebuffer Objects (FBOs) necessary in WebGL shaders?",
    a: 'WebGL specifications prevent a fragment shader from reading from and rendering into the same texture memory simultaneously. Ping-pong double buffering swaps read and write render targets between successive simulation passes to avoid pipeline race conditions.'
  },
  {
    q: "How does grid downsampling preserve mobile device battery during fluid rendering?",
    a: 'Running the internal simulation pass at a lower resolution (e.g., 512×512) and upsampling during the final dye composite via bilinear hardware filtering saves up to 75% of GPU memory bandwidth while maintaining crisp visual fidelity.'
  }
];

const article1JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://aetherfolio.vercel.app/journal/webgl-fluid-dynamics-at-60fps#article",
      "headline": "Engineering 60FPS Fluid Dynamics & Shader Pipelines in Pure WebGL",
      "description": "A comprehensive guide on implementing a Navier-Stokes Eulerian fluid solver and GLSL liquid shaders in WebGL 2.0 with Ping-Pong Framebuffer Objects.",
      "author": {
        "@type": "Person",
        "name": "Anish Kadian",
        "jobTitle": "Lead Creative Engineer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "url": "https://aetherfolio.vercel.app/journal/webgl-fluid-dynamics-at-60fps",
      "image": "https://aetherfolio.vercel.app/assets/og/og-webgl.png",
      "datePublished": "2026-08-15",
      "dateModified": "2026-08-30"
    },
    buildFaqSchema(article1FaqItems)
  ]
};

const article1Content = `
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
      <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">Graphics Engineering &amp; WebGL</span>
      <span class="text-on-surface-variant/75">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant tracking-widest">8 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Engineering 60FPS Fluid Dynamics &amp; Shader Pipelines in Pure WebGL
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      A step-by-step technical breakdown of implementing a custom Navier-Stokes Eulerian solver on GPU framebuffers with zero external library overhead.
    </p>
  </header>

  <div class="flex flex-col gap-10 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    
    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">1. The Problem With Third-Party Canvas Physics</h2>
      <p>
        Adding interactive fluid simulations to a modern web application frequently introduces crippling performance penalties. Standard npm packages often import hundreds of kilobytes of unoptimized code that recalculates particle positions on the CPU main thread. When the main thread is inundated with physics loops, it blocks UI event handling, causes noticeable input lag, and drains mobile batteries.
      </p>
      <p>
        To achieve silky 60–120 FPS performance across desktop and mobile browsers, the simulation must be formulated as a set of GPU fragment shaders operating on 2D texture buffers via WebGL 2.0.
      </p>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">2. The Eulerian Navier-Stokes Solver Architecture</h2>
      <p>
        In computational fluid dynamics, fluids can be modeled via two primary approaches: Lagrangian (tracking individual discrete particles) or Eulerian (dividing space into a stationary grid and tracking velocity vectors and dye density passing through each cell).
      </p>
      <p>
        For WebGL fragment shaders, the Eulerian grid is naturally represented as a 2D floating-point texture where the red and green color channels represent horizontal (\(u\)) and vertical (\(v\)) velocity vectors:
      </p>
      
      <div class="p-6 rounded-2xl bg-surface-container/70 border border-white/[0.06] font-mono text-xs text-primary overflow-x-auto">
        <pre><code>#version 300 es
precision highp float;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;

in vec2 vUv;
out vec4 fragColor;

// Semi-Lagrangian Advection Pass
void main() {
    // Trace backward along velocity characteristic curve
    vec2 velocity = texture(uVelocity, vUv).xy;
    vec2 backtracedUv = vUv - uDt * velocity * uTexelSize;
    
    // Sample interpolated dye/velocity from previous time-step
    fragColor = texture(uSource, backtracedUv);
}</code></pre>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">3. Double-Buffered Ping-Pong Framebuffer Objects (FBOs)</h2>
      <p>
        Because a fragment shader cannot simultaneously read from and write to the same texture memory, we implement double-buffered <strong>Ping-Pong Framebuffer Objects</strong>. For each physical quantity (Velocity, Pressure, Dye Density), we maintain two texture attachments:
      </p>
      <ul class="flex flex-col gap-2 pl-4 border-l border-white/10 text-sm sm:text-base">
        <li><strong>Read Target (\(FBO_A\)):</strong> Bound as an active uniform sampler for the shader.</li>
        <li><strong>Write Target (\(FBO_B\)):</strong> Bound as the render destination output.</li>
        <li><strong>Swap Step:</strong> At the end of each simulation sub-pass, the pointers are swapped (\(FBO_A \leftrightarrow FBO_B\)).</li>
      </ul>
      <p>
        The complete per-frame simulation pipeline consists of 4 distinct GPU sub-passes:
      </p>
      <ol class="list-decimal pl-6 flex flex-col gap-2 text-sm sm:text-base">
        <li><strong>Advection Pass:</strong> Transporting velocity and dye along the flow field.</li>
        <li><strong>Divergence Pass:</strong> Calculating the net flux entering each grid cell.</li>
        <li><strong>Pressure Poisson Solver:</strong> Running 20–40 Jacobi relaxation passes to ensure fluid incompressibility (\(\nabla \cdot \mathbf{u} = 0\)).</li>
        <li><strong>Gradient Subtraction Pass:</strong> Projecting velocity back onto a divergence-free vector field.</li>
      </ol>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">4. Critical GPU Optimization Rules</h2>
      <p>
        To ensure this simulation runs seamlessly without heating mobile devices or dropping frames, we apply three strict optimization rules:
      </p>
      <ul class="flex flex-col gap-3 pl-4 border-l border-white/10 text-sm sm:text-base">
        <li><strong>Simulation Grid Downsampling:</strong> The simulation FBO runs at half screen resolution (e.g. 512x512 grid), while the final dye presentation shader samples the buffer with hardware bilinear filtering, saving 75% of GPU texture fill-rate bandwidth.</li>
        <li><strong>Zero CPU-GPU Readbacks:</strong> Never call <code>glReadPixels()</code> during the render loop. Interleaved readbacks force synchronous GPU pipeline flushes and freeze the main UI thread.</li>
        <li><strong>Pointer Velocity Damping:</strong> Mouse and touch inputs are batched into a continuous velocity spline, preventing high-frequency noise spikes in the divergence calculation.</li>
      </ul>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">5. Summary &amp; Studio Applications</h2>
      <p>
        By bypassing heavyweight external canvas libraries and implementing pure WebGL 2.0 shaders, we deliver immersive, tactile liquid interactions while maintaining a total JavaScript bundle footprint under 12KB.
      </p>
      <p>
        To see how we apply custom shader programming to commercial brand experiences, explore our <a href="/services" class="text-primary hover:underline font-medium">Interactive 3D WebGL service</a> or view our <a href="/work" class="text-secondary hover:underline font-medium">Selected Work archive</a>.
      </p>
    </section>

  </div>

  <!-- In-Article FAQ Section -->
  <div class="mt-16 pt-10 border-t border-white/[0.06]">
    <div class="flex flex-col gap-2 mb-8">
      <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold">Common Technical Questions</span>
      <h3 class="font-display-xl text-2xl text-on-surface font-light">WebGL Fluid Simulation FAQ</h3>
    </div>
    <div class="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
      ${article1FaqItems.map(item => `
        <details class="faq-item group py-5 cursor-pointer select-none transition-all">
          <summary class="flex items-center justify-between text-left gap-4 font-display-xl text-lg sm:text-xl text-on-surface group-hover:text-primary transition-colors list-none focus-visible:outline-none">
            <span>${item.q}</span>
            <span class="w-7 h-7 rounded-full bg-surface-container-high/60 border border-white/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
              <span class="material-symbols-outlined text-[16px]">add</span>
            </span>
          </summary>
          <div class="pt-3 pb-1 font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            ${item.a}
          </div>
        </details>
      `).join('')}
    </div>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-primary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Commission a WebGL Experience</a>
  </footer>
</article>
`;

assemblePage({
  filename: 'journal/webgl-fluid-dynamics-at-60fps.html',
  activeRoute: '/journal',
  title: 'WebGL Fluid Simulation at 60FPS: Navier-Stokes GPU Shader Guide — Aetherfolio',
  description: 'Step-by-step guide to implementing a 60FPS WebGL fluid simulation using Navier-Stokes Eulerian solver, ping-pong FBOs, and GLSL shaders in pure WebGL 2.0.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/webgl-fluid-dynamics-at-60fps',
  ogType: 'article',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-webgl.png',
  jsonLd: article1JsonLd,
  bodyContent: article1Content
});


// =========================================================================
// ARTICLE 2: ZERO-BLOAT NEXT.JS ARCHITECTURE (Deep Technical Guide)
// =========================================================================
const article2FaqItems = [
  {
    q: "How do React Server Components (RSC) reduce client-side JavaScript bundles?",
    a: 'Server Components render entirely on the server or edge runtime and stream lightweight HTML and serialized JSON to the browser. The underlying component code and dependencies (e.g., Markdown parsers, date formatters) are never shipped to the client.'
  },
  {
    q: "When should a component use the 'use client' directive in Next.js?",
    a: 'Only leaf components that require active client interactivity—such as event listeners (onClick, onChange), React state (useState, useReducer), browser APIs (window, localStorage), or WebGL canvas controllers—should be designated as client islands.'
  },
  {
    q: "How does zero-bloat architecture impact search engine rankings and Core Web Vitals?",
    a: 'Minimal client JavaScript eliminates main-thread CPU blocking, delivering sub-600ms First Contentful Paint (FCP) and near-zero Interaction to Next Paint (INP), which directly improves Google Search crawl efficiency and ranking signals.'
  }
];

const article2JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://aetherfolio.vercel.app/journal/zero-bloat-frontend-architecture#article",
      "headline": "Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue",
      "description": "How to architect high-scale Next.js web applications with React Server Components, minimal client-side JavaScript, and sub-second First Contentful Paint.",
      "author": {
        "@type": "Person",
        "name": "Anish Kadian",
        "jobTitle": "Lead Creative Engineer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "url": "https://aetherfolio.vercel.app/journal/zero-bloat-frontend-architecture",
      "image": "https://aetherfolio.vercel.app/assets/og/og-nextjs.png",
      "datePublished": "2026-08-20",
      "dateModified": "2026-08-30"
    },
    buildFaqSchema(article2FaqItems)
  ]
};

const article2Content = `
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
      <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold">Next.js &amp; Architecture</span>
      <span class="text-on-surface-variant/75">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant tracking-widest">10 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Zero-Bloat Architecture: Building High-Scale Next.js Experiences Without Template Fatigue
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      Why avoiding pre-built templates and massive component libraries creates faster websites, cleaner maintenance, and authentic brand equity.
    </p>
  </header>

  <div class="flex flex-col gap-10 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    
    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">1. The Crisis of Modern Frontend Bloat</h2>
      <p>
        In the rush to deliver rapid MVPs, frontend engineering has increasingly embraced monolithic component suites and multi-megabyte npm dependencies. While this speed allows quick scaffolding, it introduces severe architectural liabilities:
      </p>
      <ul class="flex flex-col gap-2 pl-4 border-l border-white/10 text-sm sm:text-base">
        <li><strong>Hydration Overhead:</strong> The client browser must download, parse, and execute megabytes of JavaScript before simple navigation links become interactive.</li>
        <li><strong>Visual Homogenization:</strong> Products built on generic component kits end up sharing identical border radii, spacing scales, and cookie-cutter layouts, eroding brand distinctiveness.</li>
        <li><strong>Maintenance Entanglement:</strong> Deep dependency trees create vulnerability alerts and breaking upgrade cycles with every framework major version.</li>
      </ul>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">2. The Three Pillars of Zero-Bloat Engineering</h2>
      <p>
        At Aetherfolio, our Next.js architecture is governed by three non-negotiable principles:
      </p>
      
      <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-4">
        <div>
          <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">I. Server-First by Default</span>
          <p class="text-sm font-light text-on-surface-variant">Every route, layout, and document structure is rendered statically or on edge servers via React Server Components (RSC). Zero JavaScript is shipped to the client for layout, header, footer, or static editorial sections.</p>
        </div>
        <div>
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold block mb-1">II. Client Islands Only for Active State</span>
          <p class="text-sm font-light text-on-surface-variant">Client-side hydration (<code class="font-mono text-xs text-secondary">'use client'</code>) is strictly restricted to active interactive leaf nodes (e.g. WebGL canvas controllers, telemetry charts, and filter toggles).</p>
        </div>
        <div>
          <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold block mb-1">III. CSS-Driven Transitions Over JS Animation Libraries</span>
          <p class="text-sm font-light text-on-surface-variant">Instead of importing 40KB+ JavaScript physics packages for basic hover states and fades, visual motion is authored using native CSS transitions and GPU compositing layers.</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">3. Real-World Case Study: Kairo Hospital OS</h2>
      <p>
        We applied this architecture to our <a href="/work/kairo" class="text-secondary hover:underline font-medium">Kairo Hospital OS case study</a>. By avoiding generic component frameworks and writing custom, high-efficiency TypeScript and Canvas 2D telemetry, the application achieved:
      </p>
      <ul class="flex flex-col gap-2 pl-4 border-l border-white/10 text-sm sm:text-base">
        <li><strong>74% Reduction in Initial Bundle Payload</strong> compared to typical enterprise admin templates.</li>
        <li><strong>100/100 Core Web Vitals Score</strong> on mobile edge emulation.</li>
        <li><strong>Under 600ms First Contentful Paint (FCP)</strong> across global edge nodes.</li>
      </ul>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">4. Conclusion &amp; Next Steps</h2>
      <p>
        Zero-bloat architecture is not about deprivation; it is about intentionality. By choosing craftsmanship over copy-paste templates, digital products load instantaneously, rank better on search engines, and deliver an unmistakable sense of quality to users.
      </p>
      <p>
        Learn how we build scalable full-stack applications on our <a href="/services" class="text-primary hover:underline font-medium">Capabilities &amp; Services page</a> or <a href="/contact" class="text-secondary hover:underline font-medium">start a project discussion</a>.
      </p>
    </section>

  </div>

  <!-- In-Article FAQ Section -->
  <div class="mt-16 pt-10 border-t border-white/[0.06]">
    <div class="flex flex-col gap-2 mb-8">
      <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold">Common Technical Questions</span>
      <h3 class="font-display-xl text-2xl text-on-surface font-light">Next.js &amp; Architecture FAQ</h3>
    </div>
    <div class="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
      ${article2FaqItems.map(item => `
        <details class="faq-item group py-5 cursor-pointer select-none transition-all">
          <summary class="flex items-center justify-between text-left gap-4 font-display-xl text-lg sm:text-xl text-on-surface group-hover:text-secondary transition-colors list-none focus-visible:outline-none">
            <span>${item.q}</span>
            <span class="w-7 h-7 rounded-full bg-surface-container-high/60 border border-white/10 flex items-center justify-center text-secondary shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
              <span class="material-symbols-outlined text-[16px]">add</span>
            </span>
          </summary>
          <div class="pt-3 pb-1 font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            ${item.a}
          </div>
        </details>
      `).join('')}
    </div>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-secondary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Start a Next.js Project</a>
  </footer>
</article>
`;

assemblePage({
  filename: 'journal/zero-bloat-frontend-architecture.html',
  activeRoute: '/journal',
  title: 'Zero-Bloat Next.js Architecture: RSC, Bundle Optimization & Core Web Vitals — Aetherfolio',
  description: 'How to build high-scale Next.js web applications with React Server Components, minimal client-side JavaScript, and sub-second First Contentful Paint.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/zero-bloat-frontend-architecture',
  ogType: 'article',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-nextjs.png',
  jsonLd: article2JsonLd,
  bodyContent: article2Content
});


// =========================================================================
// ARTICLE 3: LAYOUT THRASHING & GPU COMPOSITING (Deep Technical Guide)
// =========================================================================
const article3FaqItems = [
  {
    q: "What causes forced synchronous layout (layout thrashing) in browsers?",
    a: 'Layout thrashing occurs when JavaScript writes a CSS property that alters geometry (like element.style.width) and immediately queries a dimension (like element.offsetHeight) in the same frame, forcing the browser to synchronously recalculate layout.'
  },
  {
    q: "Which CSS properties are completely safe to animate at 60–120 FPS?",
    a: 'Only compositor-only properties—specifically transform (translate3d, scale, rotate) and opacity—can be animated without triggering geometric layout reflows or rasterization repaints.'
  },
  {
    q: "Why should developers use ResizeObserver instead of window resize event listeners?",
    a: 'ResizeObserver is passive and notifies the application asynchronously after the browser layout phase has completed, preventing cascading reflow loops and reducing main-thread CPU utilization during window resizing.'
  }
];

const article3JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://aetherfolio.vercel.app/journal/eliminating-layout-thrashing-gpu#article",
      "headline": "Hardware Acceleration: Eliminating Layout Thrashing on Modern Browsers",
      "description": "A practical guide to browser rendering pipelines, avoiding forced synchronous reflows, and utilizing GPU layer promotion for butter-smooth 60–120 FPS web animations.",
      "author": {
        "@type": "Person",
        "name": "Anish Kadian",
        "jobTitle": "Lead Creative Engineer"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      },
      "url": "https://aetherfolio.vercel.app/journal/eliminating-layout-thrashing-gpu",
      "image": "https://aetherfolio.vercel.app/assets/og/og-layout.png",
      "datePublished": "2026-08-25",
      "dateModified": "2026-08-30"
    },
    buildFaqSchema(article3FaqItems)
  ]
};

const article3Content = `
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
      <span class="text-on-surface-variant/75">•</span>
      <span class="font-label-caps text-xs text-on-surface-variant tracking-widest">7 min read</span>
    </div>
    <h1 class="font-display-xl text-[40px] sm:text-[56px] text-on-surface font-light tracking-tight leading-[0.96] mb-6">
      Hardware Acceleration: Eliminating Layout Thrashing on Modern Browsers
    </h1>
    <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
      A practical guide on avoiding synchronous layout recalculations and utilizing GPU compositing layers for stutter-free 60–120 FPS web animations.
    </p>
  </header>

  <div class="flex flex-col gap-10 font-body-md text-on-surface-variant font-light text-base sm:text-lg leading-relaxed">
    
    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">1. The Browser Rendering Pipeline</h2>
      <p>
        To eliminate animation jank, one must understand the 4 sequential phases modern browser rendering engines (Chromium Blink, WebKit, Gecko) execute to paint pixels onto a screen:
      </p>
      <ol class="list-decimal pl-6 flex flex-col gap-2 text-sm sm:text-base">
        <li><strong>Style Calculation (Recalculate Style):</strong> Matching CSS rules to DOM elements.</li>
        <li><strong>Layout (Reflow):</strong> Computing exact geometric coordinates, widths, and heights for every box model.</li>
        <li><strong>Paint:</strong> Rasterizing text, colors, images, and borders into GPU bitmap tiles.</li>
        <li><strong>Composite:</strong> Stacking layers on the GPU compositor thread and drawing them to the screen.</li>
      </ol>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">2. What Causes Forced Synchronous Layout Thrashing?</h2>
      <p>
        Normally, the browser batches DOM mutations and executes layout once per frame before painting. However, if JavaScript writes a style property and then immediately reads a geometric property within the same frame, the browser is forced to halt script execution and synchronously calculate layout:
      </p>
      
      <div class="p-6 rounded-2xl bg-surface-container/70 border border-white/[0.06] font-mono text-xs text-red-300 overflow-x-auto">
        <pre><code>// Anti-Pattern: Forced Synchronous Layout Thrashing
cards.forEach(card =&gt; {
    // 1. Write to DOM
    card.style.height = '200px';
    // 2. Read from DOM immediately -&gt; FORCES SYNCHRONOUS REFLOW!
    const offset = card.offsetHeight;
    console.log(offset);
});</code></pre>
      </div>

      <p>
        In a loop of 100 elements, this forces 100 individual synchronous reflows within a single 16ms frame budget, dropping the frame rate from 60 FPS down to 10 FPS.
      </p>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">3. How to Eliminate Layout Invalidation</h2>
      <p>
        We apply three golden architectural rules across all Aetherfolio interfaces:
      </p>
      <div class="p-6 rounded-2xl bg-surface-container/50 border border-white/[0.06] flex flex-col gap-4">
        <div>
          <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold block mb-1">1. Batch Reads and Writes</span>
          <p class="text-sm font-light text-on-surface-variant">Perform all geometric reads first (<code class="font-mono text-xs text-tertiary">getBoundingClientRect()</code>), and defer all style writes inside a single <code class="font-mono text-xs text-tertiary">requestAnimationFrame()</code> callback.</p>
        </div>
        <div>
          <span class="font-label-caps text-xs text-primary uppercase tracking-widest font-semibold block mb-1">2. Use Passive Observers</span>
          <p class="text-sm font-light text-on-surface-variant">Replace scroll and resize event listeners with passive <code class="font-mono text-xs text-primary">IntersectionObserver</code> and <code class="font-mono text-xs text-primary">ResizeObserver</code> APIs, which notify the main thread after composite passes.</p>
        </div>
        <div>
          <span class="font-label-caps text-xs text-secondary uppercase tracking-widest font-semibold block mb-1">3. Animate Only Compositor Properties</span>
          <p class="text-sm font-light text-on-surface-variant">Never animate <code class="font-mono text-xs text-secondary">width</code>, <code class="font-mono text-xs text-secondary">height</code>, <code class="font-mono text-xs text-secondary">top</code>, or <code class="font-mono text-xs text-secondary">margin</code>. Only animate <code class="font-mono text-xs text-secondary">transform: translate3d(...)</code>, <code class="font-mono text-xs text-secondary">scale(...)</code>, and <code class="font-mono text-xs text-secondary">opacity</code>, which execute directly on the GPU compositor thread with 0 layout reflows.</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-4">
      <h2 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">4. Profiling in Chrome DevTools</h2>
      <p>
        In Chrome DevTools under the <strong>Performance</strong> tab, forced synchronous layouts appear as red warning badges labeled <em>"Forced reflow is a likely bottleneck"</em>. By refactoring DOM interactions to rely strictly on CSS 3D transforms, animation frames consistently hit the 60–120 FPS green zone.
      </p>
      <p>
        Interested in auditing your product's frontend performance? Explore our <a href="/services" class="text-tertiary hover:underline font-medium">Frontend Performance Auditing service</a> or <a href="/contact" class="text-primary hover:underline font-medium">contact us for a review</a>.
      </p>
    </section>

  </div>

  <!-- In-Article FAQ Section -->
  <div class="mt-16 pt-10 border-t border-white/[0.06]">
    <div class="flex flex-col gap-2 mb-8">
      <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold">Common Technical Questions</span>
      <h3 class="font-display-xl text-2xl text-on-surface font-light">Layout &amp; Reflow Optimization FAQ</h3>
    </div>
    <div class="flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
      ${article3FaqItems.map(item => `
        <details class="faq-item group py-5 cursor-pointer select-none transition-all">
          <summary class="flex items-center justify-between text-left gap-4 font-display-xl text-lg sm:text-xl text-on-surface group-hover:text-tertiary transition-colors list-none focus-visible:outline-none">
            <span>${item.q}</span>
            <span class="w-7 h-7 rounded-full bg-surface-container-high/60 border border-white/10 flex items-center justify-center text-tertiary shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
              <span class="material-symbols-outlined text-[16px]">add</span>
            </span>
          </summary>
          <div class="pt-3 pb-1 font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            ${item.a}
          </div>
        </details>
      `).join('')}
    </div>
  </div>

  <footer class="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between">
    <a href="/journal" class="font-label-caps text-xs text-tertiary uppercase tracking-widest hover:underline">&larr; Back to Journal</a>
    <a href="/contact" class="tactile-press px-6 py-3 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold">Request a Performance Audit</a>
  </footer>
</article>
`;

assemblePage({
  filename: 'journal/eliminating-layout-thrashing-gpu.html',
  activeRoute: '/journal',
  title: 'Eliminating Layout Thrashing & GPU Compositing: Browser Render Pipeline Guide — Aetherfolio',
  description: 'How to eliminate DOM reflow traps and leverage GPU composite layers for 60–120 FPS web animations.',
  canonicalUrl: 'https://aetherfolio.vercel.app/journal/eliminating-layout-thrashing-gpu',
  ogType: 'article',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-layout.png',
  jsonLd: article3JsonLd,
  bodyContent: article3Content
});


// =========================================================================
// 6. CONTACT & COMMISSION PORTAL (contact.html with Functional Web Form)
// =========================================================================
const contactFaqItems = [
  {
    q: "What information should I include in a project inquiry?",
    a: 'Helpful details include your product goals, core features or deliverables, preferred timeline/launch date, links to any design files or technical references, and approximate budget parameters.'
  },
  {
    q: "What happens after I submit an inquiry?",
    a: 'I personally review your project requirements and respond within 24 hours with direct architectural feedback, preliminary feasibility analysis, and an estimated timeline. If the project is a good mutual fit, we schedule a discovery call to finalize milestones.'
  },
  {
    q: "Do you work with clients outside your home country?",
    a: 'Yes. Aetherfolio collaborates with founders, design studios, and product companies globally using asynchronous communication, GitHub repositories, and scheduled milestone video syncs.'
  },
  {
    q: "Can you improve or refactor an existing website instead of building from scratch?",
    a: 'Yes. We offer comprehensive frontend performance audits, Core Web Vitals optimization, and codebase refactoring for existing React and Next.js platforms. Learn more on our <a href="/services" class="text-primary hover:underline font-medium">Capabilities &amp; Services page</a>.'
  },
  {
    q: "How quickly can a new project begin?",
    a: 'Depending on current studio sprint capacity, new projects typically kick off within 1 to 2 weeks following scope alignment and deposit confirmation.'
  }
];

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://aetherfolio.vercel.app/contact#page",
      "name": "Start a Project — Aetherfolio Studio",
      "description": "Initiate a project inquiry with Aetherfolio Studio. Get a direct architectural review and timeline quote within 24 hours.",
      "url": "https://aetherfolio.vercel.app/contact",
      "publisher": {
        "@type": "Organization",
        "name": "Aetherfolio Studio",
        "url": "https://aetherfolio.vercel.app/"
      }
    },
    buildFaqSchema(contactFaqItems)
  ]
};

const contactContent = `
<!-- Contact Hero: Statement-Led Commission Portal -->
<section class="relative pt-32 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto text-center overflow-hidden">
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
    Tell me about your product vision, timeline, and requirements. I personally review every inquiry and respond with direct architectural feedback within 24 hours.
  </p>
</section>

<!-- Contact Form Portal -->
<section class="w-full pb-20 px-6 lg:px-margin-edge bg-surface relative z-10">
  <div class="max-w-4xl mx-auto">
    
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/[0.06]">
      
      <!-- Functional Form with Client-Side Handler -->
      <form id="studioContactForm" class="flex flex-col gap-8" novalidate>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientName">Your Name *</label>
            <input id="clientName" name="name" type="text" placeholder="e.g. Eleanor Vance" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
            <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="nameError">Please enter your name.</span>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientEmail">Email Address *</label>
            <input id="clientEmail" name="email" type="email" placeholder="e.g. eleanor@studio.com" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
            <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="emailError">Please enter a valid email address.</span>
          </div>
        </div>

        <!-- Project Type Selection -->
        <div class="flex flex-col gap-3">
          <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Category</label>
          <div class="flex flex-wrap gap-3">
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Full-Stack Web App" class="peer sr-only" checked/>
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
          <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="projectScope">What are you building? *</label>
          <textarea id="projectScope" name="details" rows="5" placeholder="Share your product goals, timeline, key features, and any design or technical references..." required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-sm text-on-surface focus:border-primary focus:outline-none transition-colors leading-relaxed"></textarea>
          <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="scopeError">Please provide a brief description of your project.</span>
        </div>

        <!-- Honeypot anti-spam -->
        <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off"/>

        <!-- Form Feedback Banner -->
        <div id="formStatusBanner" class="hidden p-5 rounded-2xl font-body-md text-sm"></div>

        <!-- Submit Button & SLA -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div class="flex items-center gap-2.5 text-xs font-label-caps text-on-surface-variant">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Guaranteed response within 24 hours</span>
          </div>

          <button id="submitBtn" type="submit" class="tactile-press w-full sm:w-auto px-10 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all flex items-center justify-center gap-2">
            <span id="btnText">Send Project Inquiry</span>
            <span class="material-symbols-outlined text-[16px]" id="btnIcon">arrow_forward</span>
          </button>
        </div>

      </form>
    </div>

    <!-- Direct Email Fallback with 1-Click Copy -->
    <div class="text-center mt-12 flex flex-col items-center gap-3">
      <p class="font-body-md text-sm text-on-surface-variant font-light">
        Prefer direct email? Send a message directly to:
      </p>
      <button id="copyEmailBtn" class="tactile-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container/60 hover:bg-surface-container-high border border-white/10 text-primary font-mono text-xs transition-all">
        <span id="emailDisplay">aether.getyourownsite@gmail.com</span>
        <span class="material-symbols-outlined text-[14px]" id="copyIcon">content_copy</span>
      </button>
      <span id="copyConfirm" class="font-label-caps text-[10px] text-emerald-400 hidden">Copied to clipboard!</span>
    </div>

  </div>
</section>

${renderFaqSection({
  eyebrow: "Commissioning // FAQ",
  title: "Inquiry &amp; Collaboration FAQ",
  items: contactFaqItems
})}
`;

assemblePage({
  filename: 'contact.html',
  activeRoute: '/contact',
  title: 'Start a Project — Aetherfolio Studio',
  description: 'Initiate a project inquiry with Aetherfolio. Get a direct architectural review and timeline quote within 24 hours.',
  canonicalUrl: 'https://aetherfolio.vercel.app/contact',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-services.png',
  jsonLd: contactJsonLd,
  bodyContent: contactContent
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
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
  bodyContent: `
<section class="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-32">
  <span class="font-label-caps text-xs text-primary uppercase tracking-[0.25em] font-semibold mb-4">Error 404</span>
  <h1 class="font-display-xl text-5xl sm:text-7xl text-on-surface font-light tracking-tight mb-6">Route Not Found</h1>
  <p class="font-body-md text-base text-on-surface-variant font-light max-w-md mx-auto mb-10">
    The coordinate you requested does not exist or has been relocated to a canonical route.
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
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
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
      All project engagements with Aetherfolio Studio are executed under transparent fixed-scope or milestone agreements. Upon final project sign-off and payment, clients receive 100% intellectual property ownership of all custom codebase repositories, assets, and deployment infrastructure.
    </p>
    <p>
      For bespoke commercial terms or enterprise master service agreements (MSA), contact <a href="mailto:aether.getyourownsite@gmail.com" class="text-primary hover:underline">aether.getyourownsite@gmail.com</a>.
    </p>
  </div>
</article>
`
});


// =========================================================================
// NEW: /services/nextjs-development  
// =========================================================================

const nextjsDevBreadcrumb = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aetherfolio.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://aetherfolio.vercel.app/services" },
        { "@type": "ListItem", "position": 3, "name": "Next.js Development", "item": "https://aetherfolio.vercel.app/services/nextjs-development" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://aetherfolio.vercel.app/services/nextjs-development#service",
      "name": "Custom Next.js Development",
      "provider": { "@type": "Organization", "name": "Aetherfolio Studio", "url": "https://aetherfolio.vercel.app/" },
      "url": "https://aetherfolio.vercel.app/services/nextjs-development",
      "description": "Bespoke Next.js 15 applications with React Server Components, edge-optimized deployments, TypeScript, and zero-bloat frontend architecture."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does a Next.js development engagement with Aetherfolio look like?",
          "acceptedAnswer": { "@type": "Answer", "text": "Every Next.js project begins with an architectural scope session: we agree on the App Router structure, data fetching strategy (RSC vs. client islands), deployment target (Vercel Edge, AWS Lambda, or self-hosted), and performance budget. You receive a working staging deployment after each weekly sprint, with a dedicated GitHub repository and TypeScript codebase delivered upon project completion." }
        },
        {
          "@type": "Question",
          "name": "Do you build both marketing sites and full SaaS platforms in Next.js?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Aetherfolio has built interactive marketing microsites with high-conversion editorial layouts and full-stack SaaS platforms with complex state management, real-time data feeds, and database-backed API routes in Next.js 15. The Kairo Hospital OS is an example of a complex Next.js SaaS platform built by this studio." }
        },
        {
          "@type": "Question",
          "name": "What version of Next.js do you build with?",
          "acceptedAnswer": { "@type": "Answer", "text": "We build on Next.js 15 with the App Router, React 19, TypeScript strict mode, and Tailwind CSS v4. For new projects we default to React Server Components for all static and data-fetching layers, with 'use client' reserved strictly for interactive islands." }
        },
        {
          "@type": "Question",
          "name": "Can you migrate an existing Next.js Pages Router project to the App Router?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. We offer incremental App Router migration services for Next.js codebases. The migration is planned route-by-route to avoid disrupting active production traffic, with performance benchmarks measured before and after each phase." }
        },
        {
          "@type": "Question",
          "name": "How do you approach Core Web Vitals in Next.js projects?",
          "acceptedAnswer": { "@type": "Answer", "text": "We target 100/100 Lighthouse scores by default. This means static rendering where possible, minimal client JavaScript, font subsetting with display=swap, image optimization via next/image, and CSS-only transitions instead of heavy JavaScript animation libraries. Our zero-bloat architecture guide documents the full approach." }
        }
      ]
    }
  ]
};

const nextjsDevContent = `
<!-- Next.js Service Page Hero -->
<section class="relative pt-32 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10">
    <div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/10 blur-[120px]"></div>
  </div>

  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-12" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/services" class="hover:text-primary transition-colors">Services</a>
    <span>/</span>
    <span class="text-secondary" aria-current="page">Next.js Development</span>
  </nav>

  <div class="max-w-4xl">
    <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold block mb-4">Custom Next.js Development</span>
    <h1 class="font-display-xl text-[48px] sm:text-[72px] md:text-[88px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
      Next.js<br/>
      <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-secondary via-surface-tint to-primary font-normal">Development</span><br/>
      Services
    </h1>
    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl font-light leading-relaxed mb-10">
      Bespoke Next.js 15 applications, React SaaS platforms, and high-performance marketing sites engineered from scratch by <a href="/about" class="text-secondary hover:underline font-medium">Anish Kadian</a>. Zero template bloat. Delivered with complete TypeScript codebases and full IP ownership.
    </p>
    <div class="flex flex-wrap gap-3 mb-12">
      <a href="/contact" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all">Start a Next.js Project &rarr;</a>
      <a href="/work/kairo" class="tactile-press px-8 py-4 bg-surface-container/60 border border-white/10 text-on-surface font-label-caps text-xs uppercase tracking-widest rounded-full hover:bg-surface-container-high transition-all">View Case Study</a>
    </div>
  </div>
</section>

<!-- What We Build -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.06]">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col gap-3 mb-16 max-w-xl">
      <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">01 // What We Build</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Custom Next.js Applications &amp; Platforms</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">SaaS Platforms</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Full-Stack Next.js SaaS</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Complex multi-tenant platforms with App Router, database-backed API routes, authentication, and real-time data feeds. Built on Next.js 15, React 19, TypeScript, and Supabase or PostgreSQL.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Marketing &amp; Brand</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">High-Conversion Landing Sites</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Editorial marketing sites with 100/100 Core Web Vitals, React Server Components for zero client-side JavaScript overhead, and GPU-composited CSS animations that run at 60FPS.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Performance Audits</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Next.js Performance Optimization</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Frontend performance audits for existing Next.js codebases. We identify and eliminate layout thrashing, hydration overhead, and unnecessary client JavaScript that hurts Core Web Vitals.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">App Router Migration</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Pages Router → App Router</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Incremental migration from Next.js Pages Router to the App Router with React Server Components, streaming SSR, and Partial Prerendering. Route-by-route with zero production downtime.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Edge &amp; Infrastructure</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Vercel Edge Deployment</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Edge-optimized Next.js deployments with Vercel, including edge middleware, edge API routes, automatic ISR cache invalidation, and global CDN distribution for sub-100ms TTFB worldwide.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-secondary uppercase tracking-widest">Dashboards &amp; Tools</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Complex Admin &amp; Data Interfaces</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Data-dense operational dashboards, real-time telemetry interfaces, and custom admin platforms. See our <a href="/work/kairo" class="text-secondary hover:underline font-medium">Kairo Hospital OS case study</a> as a production reference.</p>
      </div>
    </div>
  </div>
</section>

<!-- Technical Architecture -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface-container/30 relative z-10">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col gap-3 mb-16 max-w-xl">
      <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">02 // Technical Stack</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">The Aetherfolio Next.js Production Stack</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div class="flex flex-col gap-6">
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          Every Next.js project at Aetherfolio is built on a carefully considered technology foundation. We do not import components blindly from npm. Every dependency is evaluated against three criteria: does it reduce development time meaningfully, does it add acceptable bundle weight, and can it be replaced without architectural cost?
        </p>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          The result is applications that are faster to load, cheaper to run, and simpler to maintain. Read our engineering approach in the <a href="/journal/zero-bloat-frontend-architecture" class="text-secondary hover:underline font-medium">Zero-Bloat Next.js Architecture guide</a>.
        </p>
      </div>
      <div class="p-8 rounded-2xl bg-surface-container/60 border border-white/[0.06] font-mono text-xs text-on-surface-variant grid grid-cols-2 gap-4">
        <div><span class="text-secondary font-semibold block mb-2">Framework</span>Next.js 15 App Router<br/>React 19<br/>TypeScript strict</div>
        <div><span class="text-secondary font-semibold block mb-2">Styling</span>Tailwind CSS v4<br/>CSS custom properties<br/>GPU composited motion</div>
        <div><span class="text-secondary font-semibold block mb-2">Backend</span>Next.js API Routes<br/>Supabase / PostgreSQL<br/>Vercel Edge Runtime</div>
        <div><span class="text-secondary font-semibold block mb-2">Deployment</span>Vercel Edge Network<br/>ISR + static prerender<br/>Global CDN distribution</div>
      </div>
    </div>
  </div>
</section>

<!-- Process -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.06]">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col gap-3 mb-16 max-w-xl">
      <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">03 // Process</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">How a Next.js Project Works</h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="flex flex-col gap-3 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06]">
        <span class="font-display-xl text-4xl text-secondary/40 font-light">01</span>
        <h3 class="font-display-xl text-lg text-on-surface font-light">Architecture Review</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">We review your requirements and agree on App Router structure, data patterns, and deployment target. You receive an architectural brief within 24 hours of inquiry.</p>
      </div>
      <div class="flex flex-col gap-3 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06]">
        <span class="font-display-xl text-4xl text-secondary/40 font-light">02</span>
        <h3 class="font-display-xl text-lg text-on-surface font-light">Sprint Development</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">Weekly sprints with a working Vercel preview URL after each. Every component is written in clean TypeScript with full JSDoc and Tailwind utility classes.</p>
      </div>
      <div class="flex flex-col gap-3 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06]">
        <span class="font-display-xl text-4xl text-secondary/40 font-light">03</span>
        <h3 class="font-display-xl text-lg text-on-surface font-light">Performance Audit</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">Before delivery, we audit every route with Lighthouse and WebPageTest. We resolve all Core Web Vitals regressions before handing over the repository.</p>
      </div>
      <div class="flex flex-col gap-3 p-6 rounded-2xl bg-surface-container/40 border border-white/[0.06]">
        <span class="font-display-xl text-4xl text-secondary/40 font-light">04</span>
        <h3 class="font-display-xl text-lg text-on-surface font-light">Handover &amp; IP Transfer</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">You receive the complete GitHub repository, deployment configurations, and documentation. 100% of intellectual property transfers to you upon final payment.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="w-full py-24 px-6 lg:px-margin-edge bg-surface border-t border-white/[0.06] relative z-10">
  <div class="max-w-3xl mx-auto text-center flex flex-col gap-8">
    <span class="font-label-caps text-xs text-secondary tracking-[0.25em] uppercase font-semibold">Start a Project</span>
    <h2 class="font-display-xl text-4xl sm:text-5xl text-on-surface font-light">Ready to build something real in Next.js?</h2>
    <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
      Send an inquiry and receive a direct architectural review within 24 hours. We work with founders, product teams, and design studios worldwide.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/contact" class="tactile-press px-10 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all">Start a Project &rarr;</a>
      <a href="/services" class="tactile-press px-10 py-4 bg-surface-container/60 border border-white/10 text-on-surface font-label-caps text-xs uppercase tracking-widest rounded-full hover:bg-surface-container-high transition-all">All Services</a>
    </div>
  </div>
</section>

${renderFaqSection({
  eyebrow: "Next.js Development Questions",
  title: "Common Questions &amp; Direct Answers",
  items: [
    {
      q: "What does a Next.js development engagement with Aetherfolio look like?",
      a: "Every project begins with an architectural scope session: we agree on the App Router structure, data fetching strategy (React Server Components vs. client islands), deployment target, and performance budget. You receive a working Vercel preview deployment after each weekly sprint, with a dedicated GitHub repository delivered upon project completion."
    },
    {
      q: "Do you build both marketing sites and full SaaS platforms in Next.js?",
      a: 'Yes. Aetherfolio builds both high-conversion editorial marketing sites and full-stack SaaS platforms with complex state management, real-time data feeds, and database-backed API routes. The <a href="/work/kairo" class="text-primary hover:underline font-medium">Kairo Hospital OS</a> is an example of a complex Next.js platform built by this studio.'
    },
    {
      q: "Can you migrate an existing project from Pages Router to Next.js App Router?",
      a: "Yes. We offer incremental App Router migration services for Next.js codebases. The migration is planned route-by-route to avoid disrupting active production traffic, with performance benchmarks measured before and after each phase."
    },
    {
      q: "How do you achieve 100/100 Core Web Vitals in Next.js?",
      a: 'We target 100/100 Lighthouse scores by default: static rendering where possible, minimal client JavaScript via React Server Components, font subsetting with display=swap, GPU-composited CSS transitions instead of JavaScript animation libraries, and image optimization via next/image. Our <a href="/journal/zero-bloat-frontend-architecture" class="text-secondary hover:underline font-medium">zero-bloat architecture guide</a> documents the full approach.'
    },
    {
      q: "What is the typical timeline and pricing structure for a Next.js project?",
      a: 'Marketing sites and microsites typically take 2–4 weeks. Full SaaS platforms with complex state and API routes typically take 6–10 weeks. All engagements are structured as transparent, fixed-scope milestones. <a href="/contact" class="text-primary hover:underline font-medium">Submit an inquiry</a> for a direct architectural review and quotation within 24 hours.'
    }
  ]
})}
`;

assemblePage({
  filename: 'services/nextjs-development.html',
  activeRoute: '/services',
  title: 'Custom Next.js Development Services — Aetherfolio Studio',
  description: 'Bespoke Next.js 15 development: SaaS platforms, marketing sites, App Router migration, and performance optimization by Anish Kadian at Aetherfolio. Zero templates, full TypeScript, 100/100 Core Web Vitals.',
  canonicalUrl: 'https://aetherfolio.vercel.app/services/nextjs-development',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-nextjs.png',
  jsonLd: nextjsDevBreadcrumb,
  bodyContent: nextjsDevContent
});


// =========================================================================
// NEW: /services/webgl-development
// =========================================================================

const webglDevBreadcrumb = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aetherfolio.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://aetherfolio.vercel.app/services" },
        { "@type": "ListItem", "position": 3, "name": "WebGL Development", "item": "https://aetherfolio.vercel.app/services/webgl-development" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://aetherfolio.vercel.app/services/webgl-development#service",
      "name": "WebGL & Three.js Development",
      "provider": { "@type": "Organization", "name": "Aetherfolio Studio", "url": "https://aetherfolio.vercel.app/" },
      "url": "https://aetherfolio.vercel.app/services/webgl-development",
      "description": "Custom WebGL 2.0 and Three.js interfaces including GLSL fragment shaders, Navier-Stokes fluid simulations, and real-time 3D brand experiences at 60FPS."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What kinds of WebGL experiences does Aetherfolio build?",
          "acceptedAnswer": { "@type": "Answer", "text": "We build GLSL fragment shader backgrounds and hero animations, interactive Navier-Stokes fluid simulations, lightweight Three.js 3D product viewers and spatial environments, particle systems for brand storytelling, and real-time Canvas 2D telemetry dashboards for data-dense interfaces." }
        },
        {
          "@type": "Question",
          "name": "Can WebGL animations be made to run at 60FPS on mobile devices?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, with the right architecture. We use simulation grid downsampling, ping-pong framebuffer objects to avoid CPU-GPU readbacks, and requestAnimationFrame throttling on low-powered devices. Our fluid simulation hero runs at 60FPS on mid-range mobile devices without heating the battery. See our WebGL fluid simulation technical guide for the specific GPU optimization approach." }
        },
        {
          "@type": "Question",
          "name": "Do you build Three.js experiences or purely custom WebGL shader pipelines?",
          "acceptedAnswer": { "@type": "Answer", "text": "Both, depending on what the project requires. For complex 3D scenes with mesh geometry, lighting models, and material systems, Three.js provides significant productivity and is our preference. For pure 2D shader effects like fluid simulations, GLSL noise fields, and SDF-based procedural graphics, we implement custom WebGL 2.0 pipelines directly for tighter control over performance." }
        },
        {
          "@type": "Question",
          "name": "What is the performance impact of WebGL on First Contentful Paint (FCP)?",
          "acceptedAnswer": { "@type": "Answer", "text": "Our WebGL scripts are always loaded with defer and never block HTML parsing. The WebGL canvas initializes asynchronously after page hydration. For users on devices that do not support WebGL, a CSS fallback gradient renders immediately. The result is that FCP is measured from the static HTML content, not from the WebGL canvas completion." }
        }
      ]
    }
  ]
};

const webglDevContent = `
<!-- WebGL Service Page Hero -->
<section class="relative pt-32 pb-20 px-6 lg:px-margin-edge w-full max-w-container-max mx-auto overflow-hidden">
  <div class="absolute inset-0 pointer-events-none -z-10">
    <div class="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-tertiary/10 blur-[120px]"></div>
  </div>

  <nav class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant mb-12" aria-label="Breadcrumbs">
    <a href="/" class="hover:text-primary transition-colors">Home</a>
    <span>/</span>
    <a href="/services" class="hover:text-primary transition-colors">Services</a>
    <span>/</span>
    <span class="text-tertiary" aria-current="page">WebGL Development</span>
  </nav>

  <div class="max-w-4xl">
    <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold block mb-4">Interactive 3D &amp; WebGL Development</span>
    <h1 class="font-display-xl text-[48px] sm:text-[72px] md:text-[88px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] mb-8">
      WebGL &amp;<br/>
      <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-tertiary via-surface-tint to-secondary font-normal">Three.js</span><br/>
      Development
    </h1>
    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-3xl font-light leading-relaxed mb-10">
      Custom GLSL shader pipelines, Navier-Stokes fluid simulations, Three.js 3D environments, and GPU-accelerated brand interactions engineered to run at 60FPS on desktop and mobile — without relying on bloated canvas libraries.
    </p>
    <div class="flex flex-wrap gap-3 mb-12">
      <a href="/contact" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all">Commission a WebGL Experience &rarr;</a>
      <a href="/journal/webgl-fluid-dynamics-at-60fps" class="tactile-press px-8 py-4 bg-surface-container/60 border border-white/10 text-on-surface font-label-caps text-xs uppercase tracking-widest rounded-full hover:bg-surface-container-high transition-all">Read the Technical Guide</a>
    </div>
  </div>
</section>

<!-- What We Build -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.06]">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col gap-3 mb-16 max-w-xl">
      <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold">01 // WebGL Capabilities</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">What We Build in WebGL &amp; Three.js</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">GLSL Shaders</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Custom Fragment Shader Pipelines</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Bespoke GLSL fragment shaders for procedural noise backgrounds, SDF-based shape morphing, color grading effects, and GPU-driven text distortion — all rendered at native display framerate with zero external shader libraries.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Fluid Simulation</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Navier-Stokes Fluid Dynamics</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Interactive real-time fluid simulations implemented via the Navier-Stokes Eulerian solver on GPU ping-pong framebuffers. The fluid simulation running on this studio's hero section is a live example. Read the <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-tertiary hover:underline font-medium">technical breakdown</a>.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Three.js Scenes</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">3D Environments &amp; Product Viewers</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Lightweight Three.js 3D scenes for product visualization, spatial brand environments, interactive data globes, and architectural walkthroughs. Optimized for GLTF asset streaming and mobile GPU budgets.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Particle Systems</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">GPU Particle Effects</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Instanced mesh particle systems with custom vertex shader animation, attractor physics, and color interpolation — capable of rendering 100,000+ particles at 60FPS using GPU instancing instead of CPU loops.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Canvas 2D Telemetry</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Real-Time Data Visualization</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">High-frequency Canvas 2D telemetry charts using circular ring buffer data structures for 60FPS rendering without DOM memory leaks. Used in the <a href="/work/kairo" class="text-tertiary hover:underline font-medium">Kairo Hospital OS</a> for real-time ECG waveform rendering.</p>
      </div>
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.06] flex flex-col gap-4">
        <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest">Post-Processing</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Screen-Space Post Effects</h3>
        <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">Bloom, depth-of-field, chromatic aberration, film grain, and color grading via Three.js EffectComposer with custom GLSL passes — designed to complement brand identity without overwhelming page content.</p>
      </div>
    </div>
  </div>
</section>

<!-- Technical architecture -->
<section class="w-full py-20 px-6 lg:px-margin-edge bg-surface-container/30 relative z-10">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col gap-3 mb-16 max-w-xl">
      <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold">02 // Performance Engineering</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">How We Achieve 60FPS on Mobile</h2>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div class="flex flex-col gap-6">
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          Most WebGL implementations on the web are slow, battery-draining, and break on mobile. The difference comes down to GPU architecture decisions made at the start of a project.
        </p>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          At Aetherfolio, every WebGL experience is engineered with three non-negotiable constraints: it must run at 60FPS on mid-range mobile devices, it must not block the main thread, and it must degrade gracefully on devices that lack WebGL 2.0 support.
        </p>
        <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
          Read the complete technical breakdown in our <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-tertiary hover:underline font-medium">WebGL Fluid Simulation at 60FPS guide</a>, which covers ping-pong framebuffers, simulation grid downsampling, and pointer velocity damping in detail.
        </p>
      </div>
      <div class="flex flex-col gap-4">
        <div class="p-6 rounded-2xl bg-surface-container/60 border border-white/[0.06] flex flex-col gap-3">
          <span class="font-label-caps text-xs text-tertiary uppercase tracking-widest font-semibold">GPU Architecture Rules</span>
          <ul class="flex flex-col gap-2 font-body-md text-sm text-on-surface-variant font-light">
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Defer WebGL canvas init until after FCP</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Never call glReadPixels() in the render loop</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Use ping-pong FBOs for stateful simulations</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Downsample simulation grid by 50% on mobile</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Batch pointer events into velocity splines</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Use requestAnimationFrame for frame pacing</li>
            <li class="flex gap-2"><span class="text-tertiary mt-0.5">&#x2192;</span> Respect prefers-reduced-motion media query</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="w-full py-24 px-6 lg:px-margin-edge bg-surface border-t border-white/[0.06] relative z-10">
  <div class="max-w-3xl mx-auto text-center flex flex-col gap-8">
    <span class="font-label-caps text-xs text-tertiary tracking-[0.25em] uppercase font-semibold">Commission a WebGL Experience</span>
    <h2 class="font-display-xl text-4xl sm:text-5xl text-on-surface font-light">Your brand deserves more than a static hero section.</h2>
    <p class="font-body-md text-base text-on-surface-variant font-light leading-relaxed">
      Commission a bespoke WebGL or Three.js experience engineered specifically for your brand. We build to run at 60FPS, not to look impressive in a demo video.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/contact" class="tactile-press px-10 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all">Start a WebGL Project &rarr;</a>
      <a href="/services" class="tactile-press px-10 py-4 bg-surface-container/60 border border-white/10 text-on-surface font-label-caps text-xs uppercase tracking-widest rounded-full hover:bg-surface-container-high transition-all">All Services</a>
    </div>
  </div>
</section>

${renderFaqSection({
  eyebrow: "WebGL Development Questions",
  title: "Common Questions &amp; Direct Answers",
  items: [
    {
      q: "What kinds of WebGL experiences does Aetherfolio build?",
      a: "We build GLSL fragment shader backgrounds and hero animations, interactive Navier-Stokes fluid simulations, lightweight Three.js 3D product viewers and spatial environments, particle systems for brand storytelling, and real-time Canvas 2D telemetry dashboards for data-dense interfaces."
    },
    {
      q: "Can WebGL animations be made to run at 60FPS on mobile devices?",
      a: 'Yes, with the right architecture. We use simulation grid downsampling, ping-pong framebuffer objects to avoid CPU-GPU readbacks, and requestAnimationFrame throttling on low-powered devices. Our fluid simulation hero runs at 60FPS on mid-range mobile devices without heating the battery. See our <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-primary hover:underline font-medium">WebGL fluid simulation technical guide</a> for the specific GPU optimization approach.'
    },
    {
      q: "Do you use Three.js or write custom WebGL shader pipelines?",
      a: "Both, depending on the project. For complex 3D scenes with mesh geometry and material systems, Three.js is our preference. For pure 2D shader effects like fluid simulations, GLSL noise fields, and SDF-based procedural graphics, we implement custom WebGL 2.0 pipelines directly for tighter performance control."
    },
    {
      q: "Does adding WebGL slow down my website's First Contentful Paint?",
      a: 'No — when implemented correctly. Our WebGL scripts are always loaded with defer and never block HTML parsing. The canvas initializes asynchronously after page hydration. For users on devices without WebGL 2.0, a CSS fallback renders immediately. This means FCP is measured from the static HTML, not from the WebGL canvas. We verify this with Lighthouse before every delivery.'
    }
  ]
})}
`;

assemblePage({
  filename: 'services/webgl-development.html',
  activeRoute: '/services',
  title: 'WebGL & Three.js Development Services — Aetherfolio Studio',
  description: 'Custom WebGL 2.0 and Three.js development: GLSL shaders, Navier-Stokes fluid simulations, 3D brand experiences, and GPU particle systems at 60FPS. Engineered by Anish Kadian at Aetherfolio.',
  canonicalUrl: 'https://aetherfolio.vercel.app/services/webgl-development',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-webgl.png',
  jsonLd: webglDevBreadcrumb,
  bodyContent: webglDevContent
});


console.log('All subpages with rich FAQ sections generated successfully via build_tos.js!');
