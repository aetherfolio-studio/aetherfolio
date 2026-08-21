const fs = require('fs');

function buildSkills() {
    const baseHtml = fs.readFileSync('index.html', 'utf8');
    
    const headMatch = baseHtml.match(/<head>(.*?)<\/head>/s);
    const headContent = headMatch ? headMatch[1] : '';

    const headerMatch = baseHtml.match(/(<header class="fixed top-0.*?<\/header>)/s);
    let headerContent = headerMatch ? headerMatch[1] : '';
    
    // Switch active state for Skills
    // In index.html, all nav links are inactive.
    headerContent = headerContent.replace(
        'class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="skills"',
        'aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="skills"'
    );

    const footerMatch = baseHtml.match(/(<footer class="w-full pt-section-gap.*<\/html>)/s);
    const footerContent = footerMatch ? footerMatch[1] : '';

    const mainContent = `
<main class="w-full pt-20">
  <div class="flex flex-col w-full bg-transparent text-on-background relative overflow-hidden z-10">
    
    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-margin-edge w-full max-w-container-max mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center min-h-[500px]">
      
      <!-- Left Column: Typography -->
      <div class="flex flex-col gap-6 items-start text-left relative z-10">
        <p class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-[0.4em]">Capabilities</p>
        <h1 class="font-display-xl text-display-xl-mobile md:text-display-xl text-on-surface tracking-tighter mix-blend-screen leading-none max-w-2xl">
            My Tech <br/> <span class="italic text-primary/80">Stack</span>
        </h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant/80 max-w-md mt-4 font-light">
            The tools, frameworks, and languages I use to build modern, high-performance websites.
        </p>
      </div>

      <!-- Right Column: Interactive 2D Physics Arena -->
      <div class="reveal relative w-full h-[480px] md:h-[540px] min-h-[500px] flex items-center justify-center">
        <div id="skills-physics-container" class="relative w-full h-full rounded-2xl bg-surface-container/40 border border-outline-variant/30 overflow-hidden shadow-2xl backdrop-blur-md interactive-element group" style="touch-action: pan-y;">
          
          <!-- Matter.js Physics Canvas -->
          <canvas id="skills-physics-canvas" class="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"></canvas>
          
          <!-- Status HUD Overlay -->
          <div class="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 font-label-caps text-[10px] text-on-surface-variant/80 tracking-widest uppercase bg-surface-container-lowest/80 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm shadow-sm">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Matter.js 2D Physics Arena</span>
          </div>

          <!-- Drag & Toss Hint -->
          <div class="absolute bottom-4 right-4 z-20 pointer-events-none font-label-caps text-[9px] text-on-surface-variant/60 tracking-[0.2em] uppercase bg-surface-container-lowest/80 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm shadow-sm">
            Drag &amp; Toss Badges ↗
          </div>

          <!-- Ambient Depth Ring -->
          <div class="absolute w-[450px] h-[450px] border border-primary/5 rounded-full pointer-events-none -top-20 -right-20"></div>
        </div>
      </div>
      
    </section>

    <!-- Bento Grid Section -->
    <section class="w-full py-section-gap px-margin-edge bg-surface/50 backdrop-blur-md relative z-10">
      <div class="max-w-container-max mx-auto flex flex-col">
        
        <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-4">Technical Stack</h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-md">Built with modern tools and performance-first methodologies.</p>
          </div>
          <div class="font-label-caps text-label-caps text-on-surface-variant/50 text-right uppercase">
            01 // Architecture
          </div>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <!-- Frontend Development (Large Span) -->
          <div class="group relative bg-surface-container hover:bg-surface-container-high transition-colors duration-500 p-8 min-h-80 flex flex-col justify-end shadow-sm hover:shadow-xl interactive-element md:col-span-3">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none p-[1px] -z-10">
              <div class="w-full h-full bg-surface-container group-hover:bg-surface-container-high transition-colors duration-500"></div>
            </div>
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-8">Frontend Development</p>
            <h3 class="font-display-xl-mobile text-[32px] text-on-surface mb-6">Interfaces that feel native</h3>
            <ul class="flex flex-col gap-3 font-body-md text-on-surface-variant/80">
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Semantic HTML5 & Accessibility</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> CSS Grid / Flexbox / Custom Properties</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Vanilla JavaScript (ES6+)</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> React.js / Next.js</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Tailwind CSS</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Canvas API / Three.js / WebGL</li>
            </ul>
          </div>

          <!-- Lighthouse Stat -->
          <div class="group relative bg-surface-container hover:bg-surface-container-high transition-colors duration-500 p-8 min-h-80 flex flex-col justify-end shadow-sm hover:shadow-xl interactive-element items-center text-center">
            <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none p-[1px] -z-10">
              <div class="w-full h-full bg-surface-container group-hover:bg-surface-container-high transition-colors duration-500"></div>
            </div>
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-auto w-full text-left">Lighthouse</p>
            <div class="font-display-xl-mobile md:text-[80px] text-primary leading-none my-4 tracking-tighter">100</div>
            <p class="font-body-md text-on-surface-variant/70 text-sm">Performance score</p>
          </div>

          <!-- First Paint Stat -->
          <div class="group relative bg-surface-container hover:bg-surface-container-high transition-colors duration-500 p-8 min-h-80 flex flex-col justify-end shadow-sm hover:shadow-xl interactive-element items-center text-center">
            <div class="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none p-[1px] -z-10">
              <div class="w-full h-full bg-surface-container group-hover:bg-surface-container-high transition-colors duration-500"></div>
            </div>
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-auto w-full text-left">First Paint</p>
            <div class="font-display-xl-mobile md:text-[64px] text-primary leading-none my-4 tracking-tighter">&lt;1s</div>
            <p class="font-body-md text-on-surface-variant/70 text-sm">Load time target</p>
          </div>

          <!-- Engineering -->
          <div class="group relative bg-surface-container hover:bg-surface-container-high transition-colors duration-500 p-8 min-h-80 flex flex-col justify-end shadow-sm hover:shadow-xl interactive-element md:col-span-2">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none p-[1px] -z-10">
              <div class="w-full h-full bg-surface-container group-hover:bg-surface-container-high transition-colors duration-500"></div>
            </div>
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-6">Engineering</p>
            <ul class="flex flex-col gap-3 font-body-md text-on-surface-variant/80">
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Modern Dev Workflows (Git, CI/CD)</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> REST API Integrations</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Performance Optimization</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Security Best Practices</li>
            </ul>
          </div>

          <!-- Design & UX -->
          <div class="group relative bg-surface-container hover:bg-surface-container-high transition-colors duration-500 p-8 min-h-80 flex flex-col justify-end shadow-sm hover:shadow-xl interactive-element md:col-span-1">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none p-[1px] -z-10">
              <div class="w-full h-full bg-surface-container group-hover:bg-surface-container-high transition-colors duration-500"></div>
            </div>
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.4em] mb-6">Design & UX</p>
            <ul class="flex flex-col gap-3 font-body-md text-on-surface-variant/80">
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> UI/UX Design Principles</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Figma Prototyping</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Animations</li>
                <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span> Responsive</li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>

    <!-- Toolset Section -->
    <section class="w-full py-section-gap px-margin-edge bg-transparent relative overflow-hidden border-t border-outline-variant/20">
      <div class="max-w-container-max mx-auto flex flex-col">
        
        <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 class="font-headline-md text-headline-md text-on-surface mb-4">My Toolset</h2>
            <p class="font-body-md text-body-md text-on-surface-variant max-w-md">Tools I use daily to craft digital excellence.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- VS Code -->
          <div class="flex flex-col gap-6 p-8 bg-surface-container rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500 interactive-element">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <span class="material-symbols-outlined">code</span>
            </div>
            <h3 class="font-headline-md text-[24px] text-on-surface">Code Editors</h3>
            <p class="font-body-md text-on-surface-variant/70">VS Code is my primary editor for all development. Clean, fast, and endlessly extensible.</p>
          </div>

          <!-- Git -->
          <div class="flex flex-col gap-6 p-8 bg-surface-container rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500 interactive-element">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <span class="material-symbols-outlined">account_tree</span>
            </div>
            <h3 class="font-headline-md text-[24px] text-on-surface">Version Control</h3>
            <p class="font-body-md text-on-surface-variant/70">Git for tracking every change. Safe collaboration and full project history at all times.</p>
          </div>

          <!-- Figma -->
          <div class="flex flex-col gap-6 p-8 bg-surface-container rounded-sm shadow-xl hover:-translate-y-2 transition-transform duration-500 interactive-element">
            <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
              <span class="material-symbols-outlined">architecture</span>
            </div>
            <h3 class="font-headline-md text-[24px] text-on-surface">Design</h3>
            <p class="font-body-md text-on-surface-variant/70">Figma for all wireframing, UI layout design, and client presentations before a single line of code is written.</p>
          </div>

        </div>

      </div>
    </section>

  </div>
</main>
`;

    const physicsScripts = `
<!-- Matter.js 2D Physics Engine CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>
<!-- Aetherfolio Skills Physics Module -->
<script src="js/skills-physics.js"></script>
`;

    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headContent}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30 relative" id="mainBody">
<canvas id="aether-fluid-canvas" class="fixed inset-0 w-full h-full pointer-events-none z-0"></canvas>
<div class="fixed inset-0 mouse-gradient"></div>
${headerContent}
${mainContent}
${physicsScripts}
${footerContent}
`;

    fs.writeFileSync('skills.html', finalHtml, 'utf8');
    console.log("skills.html successfully built!");
}

buildSkills();
