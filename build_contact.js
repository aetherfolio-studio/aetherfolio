const fs = require('fs');
    headerContent = headerContent.replace(
        'class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="contact"',
        'aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="contact"'
    );

    const footerMatch = indexHtml.match(/(<footer class="w-full pt-section-gap.*<\/html>)/s);
    const footerContent = footerMatch ? footerMatch[1] : '';

    const mainContent = `
<main class="w-full pt-32 pb-section-gap px-margin-edge">
  <div class="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
    
    <!-- Left Column: Info -->
    <div class="flex flex-col gap-12">
      <div class="flex flex-col gap-4">
        <p class="font-label-caps text-label-caps text-primary uppercase tracking-[0.4em]">Let's Talk</p>
        <h1 class="font-display-xl-mobile md:text-[80px] text-on-surface tracking-tighter leading-none mb-4">Start a<br/><span class="italic text-on-surface-variant">project.</span></h1>
        <p class="font-body-lg text-body-lg text-on-surface-variant/80 max-w-md font-light">
          Fill out the form with your project details, and I'll get back to you within 24 hours to discuss the scope and timeline.
        </p>
      </div>

      <div class="flex flex-col gap-8">
        <div class="flex items-center gap-6 group">
          <div class="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">mail</span>
          </div>
          <div class="flex flex-col">
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Direct Email</p>
            <p class="font-body-md text-on-surface">hello@aetherfolio.com</p>
          </div>
        </div>
        
        <div class="flex items-center gap-6 group">
          <div class="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">schedule</span>
          </div>
          <div class="flex flex-col">
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Response Time</p>
            <p class="font-body-md text-on-surface">Within 24 Hours</p>
          </div>
        </div>

        <div class="flex items-center gap-6 group">
          <div class="w-12 h-12 rounded-full border border-outline/30 flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">location_on</span>
          </div>
          <div class="flex flex-col">
            <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.3em]">Location</p>
            <p class="font-body-md text-on-surface">Remote / Worldwide</p>
          </div>
        </div>
      </div>

      <div class="bg-surface-container p-8 border-l-2 border-primary mt-8">
        <p class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.3em] mb-4">What happens next?</p>
        <ol class="flex flex-col gap-3 font-body-md text-on-surface-variant/80 list-decimal pl-4">
            <li>I read your brief and review my schedule.</li>
            <li>I reply within 24 hours with a quote or follow-up questions.</li>
            <li>We confirm the scope and kick off the project.</li>
        </ol>
      </div>
    </div>

    <!-- Right Column: Form -->
    <div class="bg-surface-container-high rounded-sm p-8 md:p-12 shadow-2xl relative">
      <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none p-[1px] -z-10 rounded-sm">
        <div class="w-full h-full bg-surface-container-high"></div>
      </div>
      
      <form id="contactForm" class="flex flex-col gap-6" novalidate>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-2">
            <label for="name" class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Your Name *</label>
            <input type="text" id="name" name="name" required autocomplete="name" placeholder="John Smith" 
                   class="bg-surface border border-outline/20 px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors w-full rounded-none">
          </div>
          
          <div class="flex flex-col gap-2">
            <label for="email" class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Your Email *</label>
            <input type="email" id="email" name="email" required autocomplete="email" placeholder="john@company.com"
                   class="bg-surface border border-outline/20 px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors w-full rounded-none">
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="subject" class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Project Type *</label>
          <input type="text" id="subject" name="subject" required placeholder="Landing page, SaaS app, Portfolio..."
                 class="bg-surface border border-outline/20 px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors w-full rounded-none">
        </div>

        <div class="flex flex-col gap-2">
          <label for="budget" class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Budget Range</label>
          <input type="text" id="budget" name="budget" placeholder="e.g. $5,000 - $15,000"
                 class="bg-surface border border-outline/20 px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors w-full rounded-none">
        </div>

        <div class="flex flex-col gap-2">
          <label for="message" class="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Project Brief *</label>
          <textarea id="message" name="message" required placeholder="Tell me about your goals, timeline, and any reference links..."
                    rows="5" class="bg-surface border border-outline/20 px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary transition-colors w-full resize-y rounded-none"></textarea>
        </div>
        
        <div id="formStatus" class="font-body-md text-sm hidden mt-2"></div>

        <button type="submit" class="mt-4 font-label-caps text-label-caps px-8 py-4 bg-on-surface text-surface hover:bg-primary transition-colors uppercase tracking-widest w-full interactive-element flex items-center justify-center gap-2 group">
          Send Inquiry
          <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </button>

      </form>
    </div>

  </div>
</main>
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
${footerContent}
`;

    fs.writeFileSync('contact.html', finalHtml, 'utf8');
    console.log("contact.html successfully built!");
}

updateNavbarAndBuildContact();
