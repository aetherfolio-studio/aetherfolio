const fs = require('fs');

const files = ['index.html', 'about.html', 'process.html', 'projects.html', 'skills.html', 'contact.html', 'login.html', 'signup.html', 'settings.html', 'tos.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');

    // Add three.js script to head before app.js or closing head
    if (!content.includes('three.min.js')) {
        content = content.replace(
            /<\/head>/,
            '    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n</head>'
        );
    }

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Added Three.js to ${file}`);
}
