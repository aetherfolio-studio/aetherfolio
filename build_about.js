const { assemblePage } = require('./build_projects.js');

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://aetherfolio.vercel.app/#studio",
      "name": "Aetherfolio Studio",
      "url": "https://aetherfolio.vercel.app/",
      "logo": "https://aetherfolio.vercel.app/logo.png",
      "image": "https://aetherfolio.vercel.app/assets/og/og-home.png",
      "description": "Independent creative engineering studio specializing in bespoke React & Next.js web applications, interactive 3D WebGL interfaces, and high-performance frontend architecture.",
      "founder": {
        "@type": "Person",
        "@id": "https://aetherfolio.vercel.app/#anish-kadian",
        "name": "Anish Kadian",
        "jobTitle": "Creative Engineer & Studio Lead",
        "sameAs": [
          "https://github.com/aetherfolio-studio"
        ]
      },
      "areaServed": "Worldwide",
      "knowsAbout": [
        "React",
        "Next.js",
        "TypeScript",
        "WebGL",
        "GLSL Shaders",
        "Three.js",
        "Creative Engineering",
        "Frontend Architecture",
        "Performance Optimization"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://aetherfolio.vercel.app/#website",
      "url": "https://aetherfolio.vercel.app/",
      "name": "Aetherfolio Studio",
      "publisher": {
        "@id": "https://aetherfolio.vercel.app/#studio"
      }
    }
  ]
};

const homepageContent = `
<!-- SECTION 1: HERO MONOGRAPH -->
<section class="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 lg:px-margin-edge overflow-hidden pt-28 pb-20">
  
  <!-- 3D Ribbon Kinetic Sculpture (Whisper-Quiet 18% Opacity Atmosphere) -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <canvas id="hero-3d-canvas" class="w-full h-full opacity-[0.18] transition-opacity duration-1000"></canvas>
    
    <!-- Ambient Radial Glow Pools -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
  </div>

  <div class="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
    
    <!-- Status Badge -->
    <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md shadow-inner">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Independent Creative Engineering Studio</span>
    </div>

    <!-- Main Editorial Headline -->
    <h1 class="font-display-xl text-[62px] sm:text-[86px] md:text-[110px] lg:text-[116px] text-on-surface font-light tracking-[-0.03em] leading-[0.92] max-w-4xl">
      Custom-Coded <br class="hidden sm:block"/>
      <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-3">Digital Experiences</span>
      <br class="hidden sm:block"/>
      for Ambitious Ideas.
    </h1>

    <!-- Subtitle / Positioning Statement -->
    <p class="font-body-lg text-lg sm:text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed">
      Aetherfolio partners with founders and innovative brands to engineer bespoke <strong>React &amp; Next.js</strong> platforms, <strong>60FPS WebGL</strong> interfaces, and high-performance frontend architecture — zero template bloat, pure craftsmanship.
    </p>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
      <a href="/work" class="tactile-press px-8 py-4 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold shadow-lg hover:bg-surface-tint transition-all flex items-center gap-2">
        <span>Explore Selected Work</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
      <a href="/contact" class="tactile-press px-8 py-4 bg-surface-container/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all">
        <span>Start a Project</span>
      </a>
    </div>

  </div>
</section>

<!-- SECTION 2: 5-SECOND CLARITY GRID -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-3 max-w-xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // The Studio Distinction</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Why Work With Aetherfolio</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Card 1 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06]">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-primary tracking-widest uppercase">01 // What I Build</span>
            <span class="w-2 h-2 rounded-full bg-primary"></span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Bespoke Full-Stack &amp; WebGL Systems</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            From complex healthcare dashboards to 60fps WebGL brand interactions. Handcrafted from pure code without prefabricated templates or bloated UI packages.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/[0.04]">
          <a href="/services" class="font-label-caps text-xs text-primary hover:underline uppercase tracking-widest flex items-center gap-1">
            <span>View Services &amp; Capabilities &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06]">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-secondary tracking-widest uppercase">02 // Who It's For</span>
            <span class="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Ambitious Founders &amp; Design Teams</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Leaders who refuse to let their product look like another generic SaaS template. If distinct brand equity and sub-second performance matter, we are the right partner.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/[0.04]">
          <a href="/about" class="font-label-caps text-xs text-secondary hover:underline uppercase tracking-widest flex items-center gap-1">
            <span>Read Studio Philosophy &rarr;</span>
          </a>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06]">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <span class="font-label-caps text-xs text-tertiary tracking-widest uppercase">03 // Why Aetherfolio</span>
            <span class="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Direct Partner Engineering</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            No junior delegators, no account managers. You collaborate directly with lead engineer Anish Kadian from initial architectural review to production deployment.
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-white/[0.04]">
          <a href="/contact" class="font-label-caps text-xs text-tertiary hover:underline uppercase tracking-widest flex items-center gap-1">
            <span>Commission a Project &rarr;</span>
          </a>
        </div>
      </div>

    </div>

  </div>
</section>

<!-- SECTION 3: FLAGSHIP CASE STUDY PREVIEW -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]">
  <div class="max-w-container-max mx-auto flex flex-col gap-12">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
      <div class="flex flex-col gap-3 max-w-xl">
        <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">02 // Featured Production System</span>
        <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light">Kairo Hospital OS</h2>
      </div>
      <a href="/work" class="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
        View All 04 Systems &rarr;
      </a>
    </div>

    <!-- Flagship Card -->
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/[0.06] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
      <div class="flex flex-col gap-6 max-w-2xl">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
          <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Production Clinical Operating System</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-xs text-emerald-400 tracking-widest">Live on Edge</span>
        </div>
        
        <p class="font-body-md text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
          A bespoke clinical operations platform featuring an interactive 3D hospital digital twin, 60fps continuous ECG canvas telemetry, surgical theater Gantt timeline orchestration, and ambient clinical AI reasoning.
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-high/40 border border-white/[0.04] text-xs font-label-caps">
          <div>
            <span class="text-on-surface-variant/60 uppercase block text-[10px]">Architecture</span>
            <span class="text-on-surface font-medium">Next.js 15.5 Edge</span>
          </div>
          <div>
            <span class="text-on-surface-variant/60 uppercase block text-[10px]">Telemetry</span>
            <span class="text-on-surface font-medium">Canvas 2D / 60FPS</span>
          </div>
          <div>
            <span class="text-on-surface-variant/60 uppercase block text-[10px]">Spatial View</span>
            <span class="text-primary font-medium">3D Digital Twin</span>
          </div>
          <div>
            <span class="text-on-surface-variant/60 uppercase block text-[10px]">Core Vitals</span>
            <span class="text-emerald-400 font-medium">100/100 Perfect</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-72 shrink-0">
        <a href="/work/kairo" class="tactile-press w-full py-4 text-center bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all">
          Read Case Study &rarr;
        </a>
        <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press w-full py-4 text-center bg-surface-container/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all">
          Launch Live Demo &rarr;
        </a>
      </div>
    </div>

  </div>
</section>

<!-- SECTION 4: TECHNICAL METHODOLOGY -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-3 max-w-xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">03 // Engineering Standards</span>
      <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light">The Craft Behind Every Build</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
        <span class="font-display-xl text-3xl text-primary font-light">01</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Zero Template Bloat</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Zero reliance on pre-made themes or bloated component libraries. Clean markup engineered from the ground up for minimal bundle payloads.
        </p>
        <a href="/journal/zero-bloat-frontend-architecture" class="text-primary hover:underline font-label-caps text-[10px] uppercase tracking-widest mt-2">Explore Next.js Guide &rarr;</a>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
        <span class="font-display-xl text-3xl text-secondary font-light">02</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">60FPS GPU Fluidity</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Hardware-accelerated animations using GPU transform matrices, passive resize observers, and strict layout reflow elimination.
        </p>
        <a href="/journal/eliminating-layout-thrashing-gpu" class="text-secondary hover:underline font-label-caps text-[10px] uppercase tracking-widest mt-2">Read Reflow Guide &rarr;</a>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
        <span class="font-display-xl text-3xl text-tertiary font-light">03</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Interactive WebGL</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Custom GLSL fragment shaders, Navier-Stokes fluid simulations, and lightweight 3D geometries tailored to your brand world.
        </p>
        <a href="/journal/webgl-fluid-dynamics-at-60fps" class="text-tertiary hover:underline font-label-caps text-[10px] uppercase tracking-widest mt-2">Shader Architecture &rarr;</a>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-3">
        <span class="font-display-xl text-3xl text-muted-gold font-light">04</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Full IP Ownership</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          100% client intellectual property ownership upon project delivery. Complete type-safe TypeScript codebases and deployment documentation.
        </p>
        <a href="/contact" class="text-muted-gold hover:underline font-label-caps text-[10px] uppercase tracking-widest mt-2">Start Commission &rarr;</a>
      </div>

    </div>

  </div>
</section>
`;

assemblePage({
  filename: 'index.html',
  activeRoute: '/',
  title: 'Aetherfolio — Creative Engineering & High-Performance Next.js Studio',
  description: 'Independent creative engineering studio founded by Anish Kadian. Specializing in bespoke React & Next.js platforms, 60FPS WebGL shaders, and high-performance frontend architecture.',
  canonicalUrl: 'https://aetherfolio.vercel.app/',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
  jsonLd: homepageJsonLd,
  bodyContent: homepageContent
});

console.log('Homepage (index.html) generated successfully!');
