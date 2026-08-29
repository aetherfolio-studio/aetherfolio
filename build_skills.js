const fs = require('fs');
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
