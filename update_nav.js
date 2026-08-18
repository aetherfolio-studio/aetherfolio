const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\ishit\\.gemini\\antigravity\\scratch\\Aether_Website_Final';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const navbarHtml = `
<!-- ======== NAVBAR ======== -->
<header class="navbar">
    <div class="nav-left">
        <a href="index.html" class="logo">
            <i class="ph-fill ph-planet"></i> Aether
        </a>
        <div class="nav-links">
            <a href="projects.html" class="nav-tab">Projects</a>
            <a href="process.html" class="nav-tab">Process</a>
            <a href="skills.html" class="nav-tab">Skills</a>
            <a href="about.html" class="nav-tab">About</a>
        </div>
    </div>
    
    <div class="nav-right">
        <button class="icon-btn theme-toggle" id="themeToggleBtn" aria-label="Toggle Theme">
            <i class="ph ph-moon"></i>
        </button>
        <a href="login.html" class="nav-tab" id="navAuthBtn">Log In</a>
        <a href="contact.html" class="btn btn-primary" style="height: 32px; padding: 0 16px; font-size: 0.85rem; border-radius: var(--radius-full);">Let's Talk</a>
        <button class="icon-btn menu-btn" aria-label="Menu">
            <i class="ph ph-list"></i>
        </button>
    </div>
</header>
`;

const sidebarHtml = `
<!-- ======== MOBILE SIDEBAR ======== -->
<div class="mobile-sidebar">
    <a href="index.html">Home</a>
    <a href="projects.html">Projects</a>
    <a href="process.html">Process</a>
    <a href="skills.html">Skills</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
</div>
<div class="sidebar-overlay"></div>
`;

const footerHtml = `
<!-- ======== FOOTER ======== -->
<footer class="footer">
    <div class="wrap footer-inner">
        <div class="logo">
            <i class="ph-fill ph-planet"></i> Aether
        </div>
        <div class="footer-links">
            <a href="projects.html">Projects</a>
            <a href="contact.html">Contact</a>
            <a href="tos.html">Terms of Service</a>
        </div>
    </div>
</footer>
`;

for (const file of files) {
    if (file === 'index.html' || file === 'projects.html') continue; // already rewritten
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Insert phosphor icons if missing
    if (!content.includes('@phosphor-icons/web')) {
        content = content.replace('<script src="config.js">', '<script src="https://unpkg.com/@phosphor-icons/web"></script>\n  <script src="config.js">');
    }

    // Replace Navbar
    const navStart = content.indexOf('<header class="navbar">');
    const navEnd = content.indexOf('</header>', navStart) + 9;
    if (navStart !== -1 && navEnd !== -1) {
        content = content.substring(0, navStart) + navbarHtml + content.substring(navEnd);
    }

    // Replace Sidebar
    const sideStart = content.indexOf('<div class="mobile-sidebar">');
    const sideEnd = content.indexOf('<div class="sidebar-overlay"></div>', sideStart) + 35;
    if (sideStart !== -1 && sideEnd !== -1) {
        content = content.substring(0, sideStart) + sidebarHtml + content.substring(sideEnd);
    }

    // Replace Footer
    const footStart = content.indexOf('<footer class="footer">');
    const footEnd = content.indexOf('</footer>', footStart) + 9;
    if (footStart !== -1 && footEnd !== -1) {
        content = content.substring(0, footStart) + footerHtml + content.substring(footEnd);
    }
    
    // Add phosphor icon to logo in auth pages if present
    content = content.replace('<img src="logo.png" alt="Aether">', '<i class="ph-fill ph-planet" style="font-size: 24px;"></i>');

    fs.writeFileSync(path.join(dir, file), content, 'utf8');
    console.log(`Updated ${file}`);
}
