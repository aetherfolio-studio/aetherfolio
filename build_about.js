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
      "description": "Independent creative engineering studio specializing in bespoke Next.js platforms, interactive 3D WebGL interfaces, and high-performance frontend architecture for startups and ambitious brands.",
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
      "priceRange": "$1,500 - $15,000+",
      "knowsAbout": [
        "Next.js Development",
        "React Engineering",
        "TypeScript",
        "WebGL & 3D Shaders",
        "Frontend Architecture",
        "Conversion Optimization",
        "Core Web Vitals"
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
<!-- SECTION 1: HERO MONOGRAPH (COMMERCIAL CLARITY) -->
<section class="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 lg:px-margin-edge overflow-hidden pt-32 pb-24">
  
  <!-- 3D Ribbon Kinetic Sculpture Atmosphere -->
  <div class="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden">
    <canvas id="hero-3d-canvas" class="w-full h-full opacity-[0.18] transition-opacity duration-1000"></canvas>
    
    <!-- Ambient Radial Glow Pools -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>
  </div>

  <div class="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
    
    <!-- Availability & Category Badge -->
    <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container/80 border border-white/10 backdrop-blur-md shadow-inner">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Independent Creative Engineering Studio</span>
      <span class="text-on-surface-variant/40 hidden sm:inline">•</span>
      <span class="font-label-caps text-[10px] text-emerald-400 tracking-widest hidden sm:inline uppercase">Available for Select Commissions</span>
    </div>

    <!-- Main Commercial Headline -->
    <h1 class="hero-headline text-on-surface max-w-4xl">
      I build premium websites <br class="hidden sm:block"/>
      <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-surface-tint to-muted-gold font-normal pr-3">for startups</span>
      <br class="hidden sm:block"/>
      and ambitious brands.
    </h1>

    <!-- Subtitle / Value Proposition -->
    <p class="hero-subtext max-w-2xl leading-relaxed">
      Custom <a href="/services/nextjs-development" class="text-on-surface hover:text-primary underline decoration-white/20 transition-colors">Next.js platforms</a> and high-performance digital experiences engineered from scratch. Fast load times, bespoke aesthetics, and zero template bloat — built to turn attention into action.
    </p>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full justify-center">
      <a href="#contact-section" class="tactile-press w-full sm:w-auto px-10 py-4 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold shadow-lg hover:bg-surface-tint transition-all text-center flex items-center justify-center gap-2">
        <span>Start a Project</span>
        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
      </a>
      <a href="#featured-work" class="tactile-press btn-secondary w-full sm:w-auto px-10 py-4 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all text-center">
        View Selected Work
      </a>
    </div>

    <!-- Proof Badges -->
    <div class="flex flex-wrap items-center justify-center gap-3 pt-4">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/70 border border-white/10 text-xs font-label-caps text-on-surface-variant shadow-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Lighthouse Performance — 100/100 Target</span>
      </div>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/70 border border-white/10 text-xs font-label-caps text-on-surface-variant shadow-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Core Web Vitals — Passed</span>
      </div>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/70 border border-white/10 text-xs font-label-caps text-on-surface-variant shadow-sm">
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        <span>Zero Template Code</span>
      </div>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/70 border border-white/10 text-xs font-label-caps text-on-surface-variant shadow-sm">
        <span class="w-2 h-2 rounded-full bg-secondary"></span>
        <span>100% Client Code Ownership</span>
      </div>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/70 border border-white/10 text-xs font-label-caps text-on-surface-variant shadow-sm">
        <span class="w-2 h-2 rounded-full bg-tertiary"></span>
        <span>Personal Response Within 24 Hours</span>
      </div>
    </div>

  </div>
</section>

<!-- SECTION 2: WHY WORK WITH ME (BUSINESS OUTCOMES BEFORE JARGON) -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]" id="value-prop">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-4 max-w-2xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">01 // The Studio Distinction</span>
      <h2 class="font-display-xl text-4xl sm:text-5xl text-on-surface font-light">Why work with me?</h2>
      <p class="font-body-lg text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
        Most agency sites rely on sluggish WordPress themes, fragile Webflow setups, or bloated component packs. I engineer bespoke, production-grade web systems that make your business look authoritative and perform flawlessly.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <!-- Card 1 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="font-display-xl text-2xl text-primary font-light">01</span>
            <span class="w-2 h-2 rounded-full bg-primary"></span>
          </div>
          <h3 class="font-display-xl text-2xl text-on-surface font-light">Bespoke Craftsmanship</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            No prefabricated themes or cookie-cutter templates. Every layout, typography choice, and interaction is built custom for your brand to command immediate authority.
          </p>
        </div>
        <div class="text-xs font-label-caps text-primary uppercase tracking-widest">
          Authentic Brand Equity
        </div>
      </div>

      <!-- Card 2 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="font-display-xl text-2xl text-secondary font-light">02</span>
            <span class="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
          <h3 class="font-display-xl text-2xl text-on-surface font-light">Speed That Protects Conversion</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Fast rendering and responsive interactions designed to reduce performance-related drop-off. Clean frontend architecture built to load swiftly on mobile and desktop viewports.
          </p>
        </div>
        <div class="text-xs font-label-caps text-secondary uppercase tracking-widest">
          Lighthouse Performance Target
        </div>
      </div>

      <!-- Card 3 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="font-display-xl text-2xl text-tertiary font-light">03</span>
            <span class="w-2 h-2 rounded-full bg-tertiary"></span>
          </div>
          <h3 class="font-display-xl text-2xl text-on-surface font-light">Direct Senior Partnership</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            No junior account managers, sales intermediaries, or agency markups. You work directly with lead engineer Anish Kadian from architectural discovery to launch.
          </p>
        </div>
        <div class="text-xs font-label-caps text-tertiary uppercase tracking-widest">
          Zero Delegation Friction
        </div>
      </div>

      <!-- Card 4 -->
      <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-6">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="font-display-xl text-2xl text-muted-gold font-light">04</span>
            <span class="w-2 h-2 rounded-full bg-muted-gold"></span>
          </div>
          <h3 class="font-display-xl text-2xl text-on-surface font-light">100% IP &amp; Code Ownership</h3>
          <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
            Upon final milestone delivery, you own all source code, assets, and deployment infrastructure. Clean, documented TypeScript with zero proprietary platform lock-in.
          </p>
        </div>
        <div class="text-xs font-label-caps text-muted-gold uppercase tracking-widest">
          Full Intellectual Property
        </div>
      </div>

    </div>

  </div>
</section>

<!-- SECTION 3: WHO THIS IS FOR / WHO IT'S NOT FOR -->
<section class="w-full py-24 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]">
  <div class="max-w-container-max mx-auto flex flex-col gap-12">
    
    <div class="flex flex-col gap-3 max-w-xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">02 // Client Fit &amp; Standards</span>
      <h2 class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Who this studio is built for</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Who it is for -->
      <div class="p-8 sm:p-12 rounded-3xl bg-surface-container/40 border border-emerald-500/20 flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">A great fit if you need:</h3>
        </div>
        
        <ul class="flex flex-col gap-4 font-body-md text-sm sm:text-base text-on-surface-variant font-light">
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span><strong>Seed &amp; Series A startups</strong> preparing for a flagship launch where conversion and brand credibility directly impact fundraising and user acquisition.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span><strong>Brands outgrowing generic templates</strong> that want an unmistakable, bespoke presence that competitors cannot simply copy from a theme marketplace.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span><strong>Product teams requiring advanced execution</strong> such as real-time interactive dashboards, 60fps Canvas telemetry, or 3D WebGL brand interactions.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span><strong>Design agencies &amp; founders</strong> who need a reliable, senior technical partner who delivers pixel-perfect builds on schedule.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">check_circle</span>
            <span><strong>Early founders needing a focused pilot build:</strong> Looking to launch with a fast, bespoke single-page site ($200–$300 introductory rate) with 100% code ownership.</span>
          </li>
        </ul>
      </div>

      <!-- Who it is NOT for -->
      <div class="p-8 sm:p-12 rounded-3xl bg-surface-container/20 border border-white/[0.06] flex flex-col gap-6">
        <div class="flex items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-on-surface-variant/40"></span>
          <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Probably not a fit if:</h3>
        </div>
        
        <ul class="flex flex-col gap-4 font-body-md text-sm sm:text-base text-on-surface-variant/80 font-light">
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-on-surface-variant/40 text-[20px] shrink-0 mt-0.5">block</span>
            <span><strong>You want a generic drag-and-drop page builder:</strong> We handcraft custom code in Next.js and Tailwind. If you prefer off-the-shelf WordPress themes or no-code builders without code ownership, template services are a better match.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-on-surface-variant/40 text-[20px] shrink-0 mt-0.5">block</span>
            <span><strong>You need a rushed 48-hour clone:</strong> We engineer production systems with pristine architecture, type safety, and real accessibility. Quality requires proper architectural scoping.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="material-symbols-outlined text-on-surface-variant/40 text-[20px] shrink-0 mt-0.5">block</span>
            <span><strong>You prioritize low cost over business results:</strong> We partner with clients who treat their digital infrastructure as an investment that drives pipeline and enterprise value.</span>
          </li>
        </ul>
      </div>

    </div>

  </div>
</section>

<!-- SECTION 4: FEATURED PRODUCTION SYSTEM (SALES PROOF ASSET) -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]" id="featured-work">
  <div class="max-w-container-max mx-auto flex flex-col gap-12">
    
    <div class="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
      <div class="flex flex-col gap-3 max-w-xl">
        <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">03 // Featured Production Benchmark</span>
        <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light">Kairo Hospital OS</h2>
      </div>
      <a href="/work" class="font-label-caps text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-1">
        <span>View Full Portfolio Archive &rarr;</span>
      </a>
    </div>

    <!-- Flagship Sales Card -->
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-14 rounded-3xl border border-white/[0.06] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
      <div class="flex flex-col gap-6 max-w-2xl">
        <div class="flex flex-wrap items-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-[#E06D53] animate-pulse"></span>
          <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Independent Engineering Benchmark</span>
          <span class="text-on-surface-variant/40">•</span>
          <span class="font-label-caps text-xs text-emerald-400 tracking-widest uppercase">Self-Initiated Demonstration</span>
        </div>
        
        <!-- The Problem & What Was Built -->
        <div class="flex flex-col gap-3">
          <div class="text-xs font-label-caps text-on-surface-variant uppercase tracking-wider">The Problem:</div>
          <p class="font-body-md text-sm sm:text-base text-on-surface-variant font-light leading-relaxed">
            Critical hospital monitoring systems typically suffer from laggy DOM updates, sluggish chart rendering, and fragmented interfaces that cause cognitive fatigue for clinical teams during high-pressure triage.
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <div class="text-xs font-label-caps text-primary uppercase tracking-wider">What I Engineered:</div>
          <p class="font-body-md text-base sm:text-lg text-on-surface font-light leading-relaxed">
            A bespoke, edge-rendered healthcare operations platform featuring an interactive 3D hospital digital twin, 60fps continuous ECG waveform canvas telemetry, surgical theater Gantt timeline orchestration, and ambient AI clinical reasoning.
          </p>
        </div>

        <!-- Telemetry Metrics Grid -->
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
            <span class="text-on-surface-variant/60 uppercase block text-[10px]">Lighthouse</span>
            <span class="text-emerald-400 font-medium">100/100 Target</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-72 shrink-0">
        <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="tactile-press w-full py-4 text-center bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all flex items-center justify-center gap-2">
          <span>Launch Live Demo</span>
          <span class="material-symbols-outlined text-[16px]">arrow_outward</span>
        </a>
        <a href="/work/kairo" class="tactile-press w-full py-4 text-center bg-surface-container/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all">
          Read Deep Case Study &rarr;
        </a>
        <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="tactile-press w-full py-4 text-center bg-surface-container/40 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-white/[0.06] rounded-full font-label-caps text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
          <span>Inspect Source Code</span>
          <span class="material-symbols-outlined text-[14px]">code</span>
        </a>
      </div>
    </div>

  </div>
</section>

<!-- SECTION 5: TRANSPARENT INVESTMENT & ENGAGEMENT TIERS -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]" id="pricing">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-4 max-w-2xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">04 // Transparent Investment</span>
      <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light">Predictable engagement models</h2>
      <p class="font-body-lg text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
        No unexpected billable hours or hidden agency fees. Fixed-scope milestones with clear delivery timelines established from the approved scope.
      </p>
    </div>

        <!-- Introductory Pilot Rate Callout -->
    <div class="p-6 sm:p-8 rounded-3xl bg-primary/10 border border-primary/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-start gap-4">
        <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse mt-1.5 shrink-0"></span>
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Introductory Pilot Slots (First Few Projects)</span>
            <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 font-label-caps uppercase text-[10px]">Open Now</span>
          </div>
          <p class="font-body-md text-sm sm:text-base text-on-surface font-light leading-relaxed">
            Need a focused single-page launchpad, portfolio, or MVP landing experience? For the first few projects, I am accepting introductory pilot builds starting at <strong class="text-primary font-medium">$200 – $300</strong> with custom Next.js code and 100% IP ownership.
          </p>
        </div>
      </div>
      <a href="#contact-section" class="tactile-press shrink-0 w-full md:w-auto px-8 py-3.5 bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold hover:bg-surface-tint transition-all text-center">
        Claim $200 Pilot Slot &rarr;
      </a>
    </div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Tier 1 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Tier 01 // Launchpad</span>
            <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Bespoke Brand &amp; Marketing Site</h3>
            <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
              For ambitious startups and brands ready to replace their generic template with an authoritative, high-converting digital presence.
            </p>
          </div>

          <div class="py-4 border-y border-white/[0.06] flex flex-col gap-1">
            <div class="text-xs font-label-caps text-on-surface-variant/80 uppercase tracking-widest">Investment:</div>
            <div class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Starting at $1,500</div>
            <div class="text-xs text-on-surface-variant font-light">Typical delivery: 2–3 weeks from approved scope</div>
          </div>

          <ul class="flex flex-col gap-3 text-xs font-body-md text-on-surface-variant font-light">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>100% custom-coded Next.js &amp; Tailwind</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Lighthouse Performance — 100/100 Target</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Bespoke typography &amp; microinteractions</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>SEO meta, schema markup &amp; OpenGraph</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>100% full intellectual property transfer</span>
            </li>
          </ul>
        </div>

        <a href="#contact-section" class="tactile-press w-full py-4 text-center bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all">
          Select Marketing Tier
        </a>
      </div>

      <!-- Tier 2 (Highlighted) -->
      <div class="border-beam-card bg-surface-container/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-primary/40 relative shadow-2xl gap-8">
        <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-background font-label-caps text-[10px] uppercase tracking-widest font-semibold shadow-md whitespace-nowrap">
          Most Popular Commission
        </div>

        <div class="flex flex-col gap-6 pt-2">
          <div class="flex flex-col gap-2">
            <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">Tier 02 // Flagship</span>
            <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Custom Web App &amp; 3D Systems</h3>
            <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
              For tech companies, SaaS founders, and teams requiring advanced state management, real-time data feeds, or interactive 3D WebGL interfaces.
            </p>
          </div>

          <div class="py-4 border-y border-white/[0.08] flex flex-col gap-1">
            <div class="text-xs font-label-caps text-primary uppercase tracking-widest">Investment:</div>
            <div class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">Starting at $3,500</div>
            <div class="text-xs text-on-surface-variant font-light">Typical delivery: 4–6 weeks from approved scope</div>
          </div>

          <ul class="flex flex-col gap-3 text-xs font-body-md text-on-surface-variant font-light">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Full-stack Next.js 15 with TypeScript</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Interactive 3D WebGL / Canvas telemetry</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>API integrations, Auth &amp; Database schemas</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Sub-second edge routing &amp; caching</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[16px]">check</span>
              <span>Full documentation &amp; deployment handover</span>
            </li>
          </ul>
        </div>

        <a href="#contact-section" class="tactile-press w-full py-4 text-center bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold shadow-lg hover:bg-surface-tint transition-all">
          Commission Web App &rarr;
        </a>
      </div>

      <!-- Tier 3 -->
      <div class="border-beam-card bg-surface-container/30 backdrop-blur-xl p-8 sm:p-10 rounded-3xl flex flex-col justify-between border border-white/[0.06] gap-8">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="font-label-caps text-xs text-tertiary tracking-widest uppercase font-semibold">Tier 03 // Dedicated</span>
            <h3 class="font-display-xl text-2xl sm:text-3xl text-on-surface font-light">Fractional Frontend Lead</h3>
            <p class="font-body-md text-sm text-on-surface-variant font-light leading-relaxed">
              Dedicated, monthly engineering partnership for funded startups that need a senior creative engineer without the friction of a full-time hire.
            </p>
          </div>

          <div class="py-4 border-y border-white/[0.06] flex flex-col gap-1">
            <div class="text-xs font-label-caps text-tertiary uppercase tracking-widest">Retainer:</div>
            <div class="font-display-xl text-3xl sm:text-4xl text-on-surface font-light">$2,500 <span class="text-base text-on-surface-variant font-normal">/ month</span></div>
            <div class="text-xs text-on-surface-variant font-light">15–20 hours/week dedicated bandwidth</div>
          </div>

          <ul class="flex flex-col gap-3 text-xs font-body-md text-on-surface-variant font-light">
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[16px]">check</span>
              <span>Direct Slack/Discord &amp; GitHub integration</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[16px]">check</span>
              <span>Continuous sprint delivery &amp; feature shipping</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[16px]">check</span>
              <span>Performance audits &amp; layout thrashing fixes</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[16px]">check</span>
              <span>Immediate architectural decision support</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="material-symbols-outlined text-tertiary text-[16px]">check</span>
              <span>Month-to-month flexibility. Cancel anytime.</span>
            </li>
          </ul>
        </div>

        <a href="#contact-section" class="tactile-press w-full py-4 text-center bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface border border-white/10 rounded-full font-label-caps text-xs uppercase tracking-widest transition-all">
          Discuss Retainer
        </a>
      </div>

    </div>

  </div>
</section>

<!-- SECTION 6: THE 4-STEP ROADMAP -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]">
  <div class="max-w-container-max mx-auto flex flex-col gap-16">
    
    <div class="flex flex-col gap-4 max-w-2xl">
      <span class="font-label-caps text-xs text-primary tracking-[0.25em] uppercase font-semibold">05 // Predictable Execution</span>
      <h2 class="font-display-xl text-3xl sm:text-5xl text-on-surface font-light">How we work together</h2>
      <p class="font-body-lg text-base sm:text-lg text-on-surface-variant font-light leading-relaxed">
        A structured, stress-free process designed to give you complete visibility from first inquiry to production release.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-4">
        <span class="font-display-xl text-4xl text-primary font-light">01</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Discovery &amp; Scoping</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          We align on your business targets, target audience, and key technical requirements. Within 24 hours of your inquiry, you receive a transparent architectural plan and fixed-price quotation.
        </p>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-4">
        <span class="font-display-xl text-4xl text-secondary font-light">02</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Interactive Prototyping</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Before building the full codebase, we validate design aesthetics, typographic rhythm, and interaction behavior so you see and feel the experience before production deployment.
        </p>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-4">
        <span class="font-display-xl text-4xl text-tertiary font-light">03</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Handcrafted Build</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Every line of code is written in clean TypeScript and Next.js. You receive access to a private staging URL and GitHub repository to watch progress unfold in real time.
        </p>
      </div>

      <div class="p-8 rounded-2xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-4">
        <span class="font-display-xl text-4xl text-muted-gold font-light">04</span>
        <h3 class="font-display-xl text-xl text-on-surface font-light">Launch &amp; IP Handover</h3>
        <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">
          Rigorous QA, Lighthouse performance audit, Core Web Vitals verification, and edge deployment. Complete IP rights, codebase ownership, and deployment keys transfer entirely to your team.
        </p>
      </div>

    </div>

  </div>
</section>

<!-- SECTION 7: HIGH-CONVERSION INQUIRY FUNNEL -->
<section class="w-full py-28 px-6 lg:px-margin-edge bg-surface relative z-10 border-t border-white/[0.04]" id="contact-section">
  <div class="max-w-4xl mx-auto flex flex-col gap-12">
    
    <div class="text-center flex flex-col items-center gap-4">
      <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container/60 border border-white/10 backdrop-blur-md">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-label-caps text-[11px] text-on-surface tracking-[0.25em] uppercase font-medium">Direct Founder Contact</span>
      </div>

      <h2 class="font-display-xl text-4xl sm:text-6xl text-on-surface font-light tracking-tight">
        Have a project in mind?
      </h2>

      <p class="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl font-light leading-relaxed">
        Tell me what you want to build. I personally review every inquiry and reply with direct architectural feedback and timeline guidance within 24 hours.
      </p>
    </div>

    <!-- The Qualification Form -->
    <div class="border-beam-card bg-surface-container/40 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-white/[0.06]">
      <form id="studioContactForm" class="flex flex-col gap-8" novalidate>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Name -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientName">Your Name *</label>
            <input id="clientName" name="name" type="text" placeholder="e.g. Alex Morgan" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
            <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="nameError">Please enter your name.</span>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="clientEmail">Email Address *</label>
            <input id="clientEmail" name="email" type="email" placeholder="e.g. alex@company.com" required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
            <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="emailError">Please enter a valid email address.</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <!-- Company / Project Name -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="companyName">Company / Project</label>
            <input id="companyName" name="company" type="text" placeholder="e.g. Acme Health" class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors"/>
          </div>

          <!-- Budget Range Dropdown -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="budgetRange">Estimated Budget</label>
            <select id="budgetRange" name="budget" class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors cursor-pointer">
              <option value="$200 – $500 — Introductory Pilot / Single-Page Launch" selected>$200 – $500 — Introductory Pilot / Single-Page Launch</option>
              <option value="$500 – $1,499 — Compact Marketing Site">$500 – $1,499 — Compact Marketing Site</option>
              <option value="$1,500 – $3,499 — Multi-Page Brand Platform">$1,500 – $3,499 — Multi-Page Brand Platform</option>
              <option value="$3,500 – $7,499 — Custom Web App / 3D Experience">$3,500 – $7,499 — Custom Web App / 3D Experience</option>
              <option value="$7,500+ — Enterprise / Complex System">$7,500+ — Enterprise / Complex System</option>
              <option value="$2,500/month — Fractional Retainer">$2,500 / month — Fractional Retainer</option>
            </select>
          </div>

          <!-- Timeline Dropdown -->
          <div class="flex flex-col gap-2">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="projectTimeline">Target Timeline</label>
            <select id="projectTimeline" name="timeline" class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors cursor-pointer">
              <option value="Immediate (< 2 weeks)">Immediate (&lt; 2 weeks)</option>
              <option value="Within 1 month" selected>Within 1 month</option>
              <option value="1–3 months">1–3 months</option>
              <option value="Exploring / Flexible">Exploring / Flexible</option>
            </select>
          </div>
        </div>

        <!-- Project Type Radios -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Project Type</label>
            <span class="text-xs text-on-surface-variant/70 font-light hidden sm:inline">Not sure? Describe what you want below and I'll help scope it.</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Single-Page Launchpad ($200–$300)" class="peer sr-only" checked/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Single-Page Launch ($200–$300)</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Full-Stack Web App" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Full-Stack Web App / SaaS</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Bespoke Marketing Site" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Bespoke Marketing Site</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Interactive 3D / WebGL" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Interactive 3D / WebGL</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Frontend Retainer" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Dedicated Retainer</span>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="projectType" value="Other / Not sure" class="peer sr-only"/>
              <span class="px-4 py-2.5 rounded-full bg-surface-container-high/40 border border-white/10 peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-label-caps text-xs transition-all block">Other / Not sure</span>
            </label>
          </div>
        </div>

        <!-- Project Details -->
        <div class="flex flex-col gap-2">
          <label class="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest" for="projectScope">What are you looking to build? *</label>
          <textarea id="projectScope" name="details" rows="4" placeholder="Tell me about your product, business goals, any references, or specific features you need..." required class="w-full px-5 py-4 bg-surface-container-high/40 border border-white/10 rounded-2xl font-body-md text-base sm:text-sm text-on-surface focus:border-primary focus:outline-none transition-colors leading-relaxed"></textarea>
          <span class="font-label-caps text-[11px] text-red-400 hidden error-msg" id="scopeError">Please provide a brief description of your project.</span>
        </div>

        <!-- Honeypot anti-spam -->
        <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off"/>

        <!-- Form Feedback Banner -->
        <div id="formStatusBanner" class="hidden p-5 rounded-2xl font-body-md text-sm"></div>

        <!-- Submit Button & SLA -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <div class="flex items-center gap-2.5 text-xs font-label-caps text-on-surface-variant">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Personal response within 24 hours</span>
          </div>

          <button id="submitBtn" type="submit" class="tactile-press w-full sm:w-auto px-10 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-semibold shadow-lg hover:bg-surface-tint transition-all flex items-center justify-center gap-2">
            <span id="btnText">Send Project Inquiry</span>
            <span class="material-symbols-outlined text-[16px]" id="btnIcon">arrow_forward</span>
          </button>
        </div>

      </form>
    </div>

    
    <!-- What Happens Next Module -->
    <div class="p-8 rounded-3xl bg-surface-container/30 border border-white/[0.06] flex flex-col gap-6">
      <span class="font-label-caps text-xs text-primary tracking-widest uppercase font-semibold">What Happens Next</span>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="flex flex-col gap-1">
          <span class="font-display-xl text-2xl text-primary font-light">01</span>
          <h4 class="font-display-xl text-base text-on-surface font-light">Review Brief</h4>
          <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">I personally analyze your product requirements, design references, and goals.</p>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-display-xl text-2xl text-secondary font-light">02</span>
          <h4 class="font-display-xl text-base text-on-surface font-light">Direct Reply in 24h</h4>
          <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">You receive direct architectural feedback and initial thoughts within 24 hours.</p>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-display-xl text-2xl text-tertiary font-light">03</span>
          <h4 class="font-display-xl text-base text-on-surface font-light">Scope Alignment</h4>
          <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">We align on exact deliverables, milestones, and technical trade-offs.</p>
        </div>
        <div class="flex flex-col gap-1">
          <span class="font-display-xl text-2xl text-muted-gold font-light">04</span>
          <h4 class="font-display-xl text-base text-on-surface font-light">Fixed Scope &amp; Timeline</h4>
          <p class="font-body-md text-xs text-on-surface-variant font-light leading-relaxed">You receive a transparent project scope and agreed timeline before build begins.</p>
        </div>
      </div>
    </div>

    <!-- Direct Email Fallback with 1-Click Copy -->
    <div class="text-center flex flex-col items-center gap-3">
      <p class="font-body-md text-sm text-on-surface-variant font-light">
        Prefer direct email? Reach out directly to founder Anish Kadian:
      </p>
      <button id="copyEmailBtn" class="tactile-press inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container/60 hover:bg-surface-container-high border border-white/10 text-primary font-mono text-xs transition-all">
        <span id="emailDisplay">aether.getyourownsite@gmail.com</span>
        <span class="material-symbols-outlined text-[14px]" id="copyIcon">content_copy</span>
      </button>
      <span id="copyConfirm" class="font-label-caps text-[10px] text-emerald-400 hidden">Copied to clipboard!</span>
    </div>

  </div>
</section>
`;

assemblePage({
  filename: 'index.html',
  activeRoute: '/',
  title: 'Aetherfolio — Bespoke Next.js & WebGL Engineering Studio for Startups',
  description: 'Independent creative engineering studio founded by Anish Kadian. I build premium, high-converting Next.js websites and custom WebGL systems for startups and ambitious brands.',
  canonicalUrl: 'https://aetherfolio.vercel.app/',
  ogImage: 'https://aetherfolio.vercel.app/assets/og/og-home.png',
  jsonLd: homepageJsonLd,
  bodyContent: homepageContent
});

console.log('Homepage (index.html) generated successfully with full CRO architecture!');
