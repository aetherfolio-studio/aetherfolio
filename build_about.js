const fs = require('fs');

function buildAbout() {
    const baseHtml = fs.readFileSync('index.html', 'utf8');
    
    const headMatch = baseHtml.match(/<head>(.*?)<\/head>/s);
    const headContent = headMatch ? headMatch[1] : '';

    const headerMatch = baseHtml.match(/(<header class="fixed top-0.*?<\/header>)/s);
    let headerContent = headerMatch ? headerMatch[1] : '';

    // Switch active state for About
    headerContent = headerContent.replace(
        'class="nav-link-underline font-nav-link text-nav-link text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest" data-path="about"',
        'aria-current="page" class="nav-link-underline font-nav-link transition-colors uppercase tracking-widest text-primary" data-path="about"'
    );
    // Note: 'Home' is not an active tab in the desktop layout so we only need to turn on 'About'.

    const footerMatch = baseHtml.match(/(<footer class="w-full pt-section-gap.*<\/html>)/s);
    const footerContent = footerMatch ? footerMatch[1] : '';

    const stitchHtml = fs.readFileSync('stitch_about.html', 'utf8');
    const mainMatch = stitchHtml.match(/(<main.*?<\/main>)/s);
    if (!mainMatch) {
        console.error("Could not find main tag in stitch_about.html");
        return;
    }
    const mainContent = mainMatch[1];

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

    fs.writeFileSync('about.html', finalHtml, 'utf8');
    console.log("about.html successfully built!");
}

buildAbout();
