const fs = require('fs');
const path = require('path');

// Reusable Navigation Header HTML
function getHeader(activeRoute = '') {
  const navItems = [
    { label: 'Work', path: '/work' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' }
  ];

  const linksHtml = navItems.map(item => {
    const isActive = (activeRoute === item.path || (activeRoute === '/' && item.path === '/'));
    const activeClass = isActive ? 'text-primary font-medium' : 'text-on-surface-variant hover:text-on-surface';
    const ariaCurrent = isActive ? ' aria-current="page"' : '';
    return `<a class="nav-link-underline font-nav-link text-[13px] tracking-wider uppercase transition-colors duration-200 ${activeClass}" href="${item.path}" data-path="${item.path.replace('/', '')}"${ariaCurrent}>${item.label}</a>`;
  }).join('\n        ');

  const mobileLinksHtml = navItems.map((item, idx) => {
    const isActive = (activeRoute === item.path);
    const activeClass = isActive ? 'text-primary' : 'text-on-surface';
    return `
      <div class="flex items-center justify-between py-4 border-b border-white/[0.06]">
        <a class="font-display-xl text-3xl sm:text-4xl tracking-tight transition-colors duration-200 ${activeClass}" href="${item.path}">${item.label}</a>
        <span class="font-label-caps text-[11px] text-on-surface-variant/60">0${idx + 1}</span>
      </div>`;
  }).join('\n    ');

  return `
<!-- Skip to Content for WCAG Accessibility -->
<a href="#mainContent" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-background focus:rounded-full focus:font-label-caps focus:text-xs shadow-xl">Skip to Content</a>

<!-- Master Editorial Navigation Header -->
<header id="masterHeader" class="fixed top-0 w-full z-50 bg-[#001428]/85 backdrop-blur-md border-b border-white/[0.04] transition-all duration-300">
  <div class="h-20 w-full px-6 lg:px-margin-edge flex items-center justify-between max-w-container-max mx-auto">
    <div class="flex items-center gap-12">
      <a class="font-display-xl text-[26px] md:text-[28px] text-on-surface tracking-tighter flex items-center gap-2.5 group" href="/" data-path="brand" aria-label="Aetherfolio Home">
        <span class="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-300"></span>
        <span class="font-light">Aetherfolio</span>
      </a>
      <nav class="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
        ${linksHtml}
      </nav>
    </div>
    <div class="flex items-center gap-4 sm:gap-6">
      <a class="tactile-press px-5 sm:px-6 py-2.5 border border-white/10 font-label-caps text-[11px] text-on-surface hover:bg-paper-white hover:text-background hover:border-paper-white transition-all duration-300 rounded-full shadow-sm font-medium tracking-wider uppercase" href="/contact">
        <span>Start a Project</span>
      </a>
      <button class="menu-btn lg:hidden w-10 h-10 rounded-full bg-surface-container/60 flex flex-col items-center justify-center gap-1.5 border border-white/10" aria-label="Toggle navigation menu" aria-expanded="false">
        <span class="w-5 h-[1.5px] bg-on-surface transition-all"></span>
        <span class="w-5 h-[1.5px] bg-on-surface transition-all"></span>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Fullscreen Editorial Navigation Overlay -->
<div class="sidebar-overlay" aria-hidden="true"></div>
<aside class="mobile-sidebar p-8 flex flex-col justify-between" aria-label="Mobile Navigation">
  <div class="flex flex-col gap-8">
    <div class="flex items-center justify-between pb-6 border-b border-white/[0.06]">
      <a class="font-display-xl text-2xl text-on-surface tracking-tight flex items-center gap-2" href="/" aria-label="Aetherfolio Home">
        <span class="w-2 h-2 rounded-full bg-primary"></span>
        <span>Aetherfolio</span>
      </a>
      <button class="menu-btn w-9 h-9 rounded-full bg-surface-container flex items-center justify-center border border-white/10" aria-label="Close navigation menu">
        <span class="material-symbols-outlined text-[18px] text-on-surface">close</span>
      </button>
    </div>
    <nav class="flex flex-col" aria-label="Mobile Links">
      ${mobileLinksHtml}
    </nav>
  </div>
  <div class="flex flex-col gap-4 pt-8 border-t border-white/[0.06]">
    <div class="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant/80">
      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
      <span>Direct Commission Available</span>
    </div>
    <a class="tactile-press w-full py-4 text-center bg-paper-white text-background rounded-full font-label-caps text-xs uppercase tracking-widest font-semibold" href="/contact">
      Start a Project &rarr;
    </a>
  </div>
</aside>
`;
}

// Master Architectural Closing Footer HTML
function getFooter() {
  return `
<footer class="w-full bg-[#001428] border-t border-white/[0.04] pt-24 pb-16 px-6 lg:px-margin-edge text-on-surface relative z-10">
  <div class="max-w-container-max mx-auto flex flex-col gap-20">
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 pb-16 border-b border-white/[0.04]">
      <div class="flex flex-col gap-4 max-w-2xl">
        <span class="font-label-caps text-[11px] text-primary tracking-[0.3em] uppercase font-semibold">Ready to build?</span>
        <h2 class="font-display-xl text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-on-surface leading-[0.95]">
          Bespoke Digital Experiences for Ambitious Ideas.
        </h2>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a href="/contact" class="tactile-press px-8 py-4 bg-paper-white text-background font-label-caps text-xs uppercase tracking-widest rounded-full font-medium shadow-lg hover:bg-surface-tint transition-all">
          <span>Start a Project &rarr;</span>
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
      <!-- Col 1: Studio Profile -->
      <div class="md:col-span-5 flex flex-col gap-6">
        <a class="font-display-xl text-[28px] text-on-surface tracking-tight flex items-center gap-2.5" href="/">
          <span class="w-2 h-2 rounded-full bg-primary"></span>
          <span>Aetherfolio</span>
        </a>
        <p class="font-body-md text-sm text-on-surface-variant max-w-sm leading-relaxed font-light">
          Independent creative engineering studio founded by <strong>Anish Kadian</strong>. Custom-coded React &amp; Next.js platforms, interactive 3D WebGL interfaces, and high-performance frontend architecture — zero bloat, pure craftsmanship.
        </p>
        <div class="inline-flex items-center gap-3 text-xs font-label-caps text-on-surface-variant/80">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="tracking-widest uppercase">Available for select commissions</span>
        </div>
      </div>

      <!-- Col 2: Navigation Index -->
      <div class="md:col-span-3 flex flex-col gap-4">
        <span class="font-label-caps text-[11px] text-primary tracking-[0.25em] uppercase font-semibold">Navigation</span>
        <div class="flex flex-col gap-3 font-body-md text-sm text-on-surface-variant font-light">
          <a href="/work" class="hover:text-primary transition-colors">Selected Work Archive</a>
          <a href="/services" class="hover:text-primary transition-colors">Services &amp; Capabilities</a>
          <a href="/about" class="hover:text-primary transition-colors">About &amp; Philosophy</a>
          <a href="/journal" class="hover:text-primary transition-colors">Technical Journal</a>
          <a href="/contact" class="hover:text-primary transition-colors">Start a Project</a>
        </div>
      </div>

      <!-- Col 3: Case Studies -->
      <div class="md:col-span-2 flex flex-col gap-4">
        <span class="font-label-caps text-[11px] text-primary tracking-[0.25em] uppercase font-semibold">Featured Work</span>
        <div class="flex flex-col gap-3 font-body-md text-sm text-on-surface-variant font-light">
          <a href="/work/kairo" class="hover:text-primary transition-colors">Kairo Hospital OS</a>
          <a href="https://github.com/aetherfolio-studio/kairo" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors flex items-center gap-1">
            <span>GitHub Source</span>
            <span class="material-symbols-outlined text-[13px]">arrow_outward</span>
          </a>
          <a href="https://kairo-hospital.vercel.app" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors flex items-center gap-1">
            <span>Live System Demo</span>
            <span class="material-symbols-outlined text-[13px]">arrow_outward</span>
          </a>
        </div>
      </div>

      <!-- Col 4: Studio Connect -->
      <div class="md:col-span-2 flex flex-col gap-4">
        <span class="font-label-caps text-[11px] text-primary tracking-[0.25em] uppercase font-semibold">Connect</span>
        <div class="flex flex-col gap-3 font-body-md text-sm text-on-surface-variant font-light">
          <a href="mailto:aether.getyourownsite@gmail.com" class="hover:text-primary transition-colors flex items-center gap-1">
            <span>Direct Email</span>
            <span class="material-symbols-outlined text-[13px]">mail</span>
          </a>
          <a href="https://github.com/aetherfolio-studio" target="_blank" rel="noopener noreferrer" class="hover:text-primary transition-colors flex items-center gap-1">
            <span>GitHub Studio</span>
            <span class="material-symbols-outlined text-[13px]">arrow_outward</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Colophon -->
    <div class="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 font-label-caps text-xs text-on-surface-variant/75">
      <p>&copy; ${new Date().getFullYear()} Aetherfolio Studio. All rights reserved.</p>
      <div class="flex items-center gap-6">
        <a href="/tos" class="hover:text-on-surface transition-colors">Terms</a>
        <a href="/sitemap.xml" class="hover:text-on-surface transition-colors">Sitemap</a>
        <a href="#masterHeader" class="hover:text-primary transition-colors flex items-center gap-1">
          <span>Back to top</span>
          <span class="material-symbols-outlined text-[14px]">arrow_upward</span>
        </a>
      </div>
    </div>
  </div>
</footer>
`;
}

// Master HTML Head generator with Production CSS, Strict Technical SEO, Open Graph & Structured Data
function getHead({ title, description, canonicalUrl, ogType = 'website', ogImage = 'https://aetherfolio.vercel.app/assets/og/og-home.png', jsonLd = null }) {
  const schemaScript = jsonLd ? `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>` : '';

  return `  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>${title}</title>
  <meta name="description" content="${description}"/>
  <link rel="canonical" href="${canonicalUrl}"/>
  
  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="${ogType}"/>
  <meta property="og:url" content="${canonicalUrl}"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${description}"/>
  <meta property="og:image" content="${ogImage}"/>
  <meta property="og:site_name" content="Aetherfolio Studio"/>
  
  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${description}"/>
  <meta name="twitter:image" content="${ogImage}"/>
  
  <!-- PWA & Favicons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
  <link rel="manifest" href="/site.webmanifest"/>
  <meta name="theme-color" content="#001428"/>
  
  <!-- Google Fonts & Material Symbols (Preconnected & Optimized) -->
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
  
  <!-- Compiled Production Stylesheet (Zero Runtime JS Dependencies) -->
  <link rel="stylesheet" href="/css/main.css?v=20260830_v2"/>
  ${schemaScript}
`;
}

// Master Page Assembler
function assemblePage({ filename, activeRoute, title, description, canonicalUrl, ogType = 'website', ogImage = 'https://aetherfolio.vercel.app/assets/og/og-home.png', jsonLd = null, bodyContent }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${getHead({ title, description, canonicalUrl, ogType, ogImage, jsonLd })}
</head>
<body class="bg-background font-body-md text-on-surface selection:bg-primary/30 relative" id="mainBody">
  <div class="fixed inset-0 mouse-gradient pointer-events-none -z-10"></div>

  ${getHeader(activeRoute)}

  <main id="mainContent" class="w-full pt-20 relative z-10">
    ${bodyContent}
  </main>

  ${getFooter()}

  <!-- Core Scripts (Deferred for optimal FCP) -->
  <script src="/config.js?v=20260830_v2" defer></script>
  ${filename === 'index.html' ? '<script src="/js/hero-3d.js?v=20260830_v2" defer></script>' : ''}
  <script src="/js/app.js?v=20260830_v2" defer></script>
</body>
</html>
`;

  const outputPath = path.join('C:\\Users\\ishit\\OneDrive\\Desktop\\aether', filename);
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`[Aetherfolio Builder] Created: ${filename}`);
}

module.exports = {
  getHeader,
  getFooter,
  getHead,
  assemblePage
};
