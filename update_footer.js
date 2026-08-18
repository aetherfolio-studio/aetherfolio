const fs = require('fs');
const files = ['index.html', 'about.html', 'process.html', 'projects.html', 'skills.html', 'contact.html', 'login.html', 'signup.html', 'settings.html', 'tos.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');

    // Replace the footer-links div contents
    const replacement = `<div class="footer-links">
        <a href="contact.html">Contact</a>
        <a href="tos.html">Terms of Service</a>
    </div>`;
    
    content = content.replace(/<div class="footer-links">[\s\S]*?<\/div>/g, replacement);

    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated footer in ${file}`);
}
