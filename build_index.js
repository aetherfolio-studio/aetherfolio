const fs = require('fs');

function buildIndex() {
    // 1. Read process.html
    const processHtml = fs.readFileSync('process.html', 'utf8');

    // Extract Head
    const headMatch = processHtml.match(/<head>([\s\S]*?)<\/head>/);
    const headContent = headMatch ? headMatch[1] : '';

    // Extract Header
    const headerMatch = processHtml.match(/(<header class="fixed top-0[\s\S]*?<\/header>)/);
    let headerContent = headerMatch ? headerMatch[1] : '';
    
    // Remove active state from Process
    headerContent = headerContent.replace(
        '<a aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="process" href="process.html">Process</a>',
        '<a class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="process" href="process.html">Process</a>'
    );

    // Extract Mobile Sidebar
    const sidebarMatch = processHtml.match(/(<!-- ======== MOBILE SIDEBAR ======== -->[\s\S]*?<div class="sidebar-overlay"><\/div>)/);
    let sidebarContent = sidebarMatch ? sidebarMatch[1] : '';
    
    sidebarContent = sidebarContent.replace('href="process.html" class="active"', 'href="process.html"');
    sidebarContent = sidebarContent.replace('href="index.html"', 'href="index.html" class="active"');

    // Extract Footer
    const footerMatch = processHtml.match(/(<footer class="w-full pt-section-gap[\s\S]*?<\/footer>)/);
    const footerContent = footerMatch ? footerMatch[1] : '';

    // 2. Read stitch raw
    const stitchHtml = fs.readFileSync('stitch_raw.html', 'utf8');

    // Extract Body
    const bodyMatch = stitchHtml.match(/<main class="w-full pt-20">([\s\S]*?)<\/main>/);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';
    
    // Replace Vanguard image
    bodyContent = bodyContent.replace(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtEpj2k7-W20dmCp7ihC8nrL-utyWbgaab8C9Rwpv8heih6Fl_rxsmZFBNQAc513E9LQxcxaCDkdCKrF3RUIKmT9u5mithQvYlG4cZugtOs1gyjAsQ0ge75uxpzAyp3d1uZBtXoIUf7hRPQcjM7BclbGo47KbzjiZnAURPpOC57zWX1eED_96HVASdjYYcS8CCZxA1_Qear28v3XSk9nYZhbJsBIf1qSkE1AttCpj3X8xbJk34eHZa",
        "assets/vanguard.jpg"
    );
    
    // Fix links
    bodyContent = bodyContent.replace(/"#" class="group relative px-8 py-4/g, '"contact.html" class="group relative px-8 py-4');
    bodyContent = bodyContent.replace(/"#" class="nav-link-underline font-label-caps/g, '"projects.html" class="nav-link-underline font-label-caps');

    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30 relative" id="mainBody">
<canvas id="aether-fluid-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
<div class="fixed inset-0 mouse-gradient"></div>

<!-- Aetherfolio Cinematic OS Bootloader Overlay -->
<div id="aether-bootloader" class="fixed inset-0 z-[99999] bg-void-black flex flex-col items-center justify-center font-mono select-none overflow-hidden" role="dialog" aria-modal="true" aria-label="System Bootloader">
  <!-- CRT Vignette & Scanlines -->
  <div class="absolute inset-0 pointer-events-none bootloader-crt-vignette z-10"></div>
  <div class="absolute inset-0 pointer-events-none bootloader-scanlines opacity-30 z-20"></div>

  <!-- Terminal Window Card -->
  <div class="relative z-30 w-[92%] max-w-[680px] p-6 md:p-8 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/30 backdrop-blur-xl shadow-[0_0_50px_rgba(0,20,40,0.8)] flex flex-col gap-6">
    <!-- Topbar -->
    <div class="flex items-center justify-between border-b border-outline-variant/20 pb-4">
      <div class="flex items-center gap-3">
        <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#ffb4a5]"></span>
        <span class="font-label-caps text-xs text-on-surface tracking-[0.25em] uppercase font-semibold">AETHER // KERNEL v4.0.9</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded bg-tertiary/10 border border-tertiary/30 text-[10px] font-label-caps text-tertiary tracking-widest uppercase">SYS: LIVE</span>
      </div>
    </div>

    <!-- Diagnostic Log Stream -->
    <div id="bootloader-logs" class="h-44 md:h-52 overflow-hidden flex flex-col justify-end text-xs md:text-sm font-mono text-on-surface-variant/90 space-y-1.5 leading-relaxed tracking-wide">
      <div class="text-tertiary/60">> SYSTEM INITIALIZING...<span class="terminal-cursor"></span></div>
    </div>

    <!-- Progress Bar & Percentage -->
    <div class="flex flex-col gap-2 pt-2 border-t border-outline-variant/20">
      <div class="flex items-center justify-between font-label-caps text-xs">
        <span class="text-on-surface-variant/70 tracking-widest uppercase">BOOT SEQUENCE</span>
        <span id="bootloader-percentage" class="text-primary font-bold text-base tracking-wider tabular-nums">0%</span>
      </div>
      <div class="w-full h-1.5 md:h-2 bg-surface-container-high rounded-full overflow-hidden p-[1px]">
        <div id="bootloader-progress-bar" class="h-full w-0 bg-gradient-to-r from-primary via-tertiary to-secondary rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(93,217,207,0.7)]"></div>
      </div>
    </div>

    <!-- Skip Hint Prompt -->
    <div class="flex items-center justify-between text-[11px] font-label-caps text-on-surface-variant/40 pt-1">
      <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-tertiary/60"></span> 44.1kHz WEB AUDIO</span>
      <button id="bootloader-skip-btn" class="hover:text-primary transition-colors cursor-pointer uppercase tracking-[0.2em]">[ESC] or click to skip</button>
    </div>
  </div>
</div>

${headerContent}

${sidebarContent}

<main class="w-full pt-20">
${bodyContent}
</main>

${footerContent}

<!-- Aetherfolio Custom Cursor & Logic -->
<script src="js/fluid-sim.js"></script>
<script src="js/bootloader.js"></script>
<script src="js/card-shaders.js"></script>
<script src="app.js"></script>
<div id="aether-cursor" class="aether-cursor" aria-hidden="true">
  <div class="cursor-dot"></div>
  <div class="cursor-label">VIEW ↗</div>
</div>
</body>
</html>`;

    fs.writeFileSync('index.html', finalHtml, 'utf8');
    console.log("Successfully built index.html");
}

buildIndex();
