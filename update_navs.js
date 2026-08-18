const fs = require('fs');

const files = ['index.html', 'about.html', 'process.html', 'projects.html', 'skills.html', 'contact.html'];

const replacement = `
            <a href="projects.html" class="nav-tab">Projects</a>
            <a href="skills.html" class="nav-tab">Skills</a>
            <a href="contact.html" class="nav-cta">Let's Talk</a>
            <button class="theme-toggle" id="themeToggleBtn" aria-label="Toggle Theme">
                
            </button>
            <a href="login.html" class="nav-cta" id="navAuthBtn" style="background: rgba(99,102,241,0.1); color: var(--indigo); border: 1px solid rgba(99,102,241,0.3);">
                Log In 
            </a>
            <button class="menu-btn" aria-label="Menu"></button>
`;

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');

    // Replace navbar right content
    content = content.replace(
        /<div class="nav-right">.*?<\/div>/s,
        `<div class="nav-right">${replacement}        </div>`
    );

    // Add firebase script to head
    if (!content.includes('firebase-auth.js')) {
        content = content.replace(
            /<\/head>/,
            '    <script type="module" src="firebase-auth.js"></script>\n</head>'
        );
    }

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated ${file}`);
}
