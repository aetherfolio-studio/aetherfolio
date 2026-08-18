const fs = require('fs');

function buildSettings() {
    const baseHtml = fs.readFileSync('index.html', 'utf8');
    
    // 1. Extract Head
    const headMatch = baseHtml.match(/<head>(.*?)<\/head>/s);
    let headContent = headMatch ? headMatch[1] : '';

    // Add Supabase scripts required for Settings
    headContent += `
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-auth.js"></script>
`;

    // 2. Extract Header
    const headerMatch = baseHtml.match(/(<header class="fixed top-0.*?<\/header>)/s);
    let headerContent = headerMatch ? headerMatch[1] : '';

    // 3. Extract Footer
    const footerMatch = baseHtml.match(/(<footer class="w-full pt-section-gap.*<\/html>)/s);
    let footerContent = footerMatch ? footerMatch[1] : '';

    // Remove cursor from footer to prevent duplicate, or keep it if it's there
    // Actually we keep it since it's global

    // 4. Extract Main from stitch
    const stitchHtml = fs.readFileSync('stitch_settings.html', 'utf8');
    const mainMatch = stitchHtml.match(/(<main.*?<\/main>)/s);
    if (!mainMatch) {
        console.error("Could not find main tag in stitch_settings.html");
        return;
    }
    const mainContent = mainMatch[1];

    // Build the final HTML string
    const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <script>
        (function() {
            var host = window.location.hostname;
            if (host !== 'localhost' && host !== '127.0.0.1' && host !== 'aetherfolio.vercel.app') {
                window.location.replace('https://aetherfolio.vercel.app' + window.location.pathname + window.location.search + window.location.hash);
            }
        })();
    </script>
    <title>Settings | Aetherfolio</title>
    <meta name="description" content="Manage your Aetherfolio account settings and preferences.">
    ${headContent}
</head>
<body class="bg-background font-body-md text-on-background selection:bg-primary/30">

${headerContent}

${mainContent}

${footerContent}
`;

    fs.writeFileSync('settings.html', finalHtml);
    console.log('settings.html successfully built!');
}

buildSettings();
