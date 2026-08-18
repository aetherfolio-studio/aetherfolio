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
    const footerMatch = processHtml.match(/(<footer class="w-full pt-section-gap pb-12 px-margin-edge bg-background">[\s\S]*?<\/footer>)/);
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
<body class="bg-background font-body-md text-on-background selection:bg-primary/30 relative" id="mainBody" style="opacity: 0; transition: opacity 0.4s ease;">
<div class="fixed inset-0 mouse-gradient"></div>

${headerContent}

${sidebarContent}

<main class="w-full pt-20">
${bodyContent}
</main>

${footerContent}

<!-- Aetherfolio App Logic -->
<script src="app.js"></script>
</body>
</html>`;

    fs.writeFileSync('index.html', finalHtml, 'utf8');
    console.log("Successfully built index.html");
}

buildIndex();
