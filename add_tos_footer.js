const fs = require('fs');

const files = ['index.html', 'about.html', 'process.html', 'projects.html', 'skills.html', 'contact.html', 'login.html', 'signup.html', 'settings.html', 'tos.html'];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');

    // Only add it if it's not already there
    if (!content.includes('>Terms of Service</a>') && content.includes('class="footer-links"')) {
        content = content.replace(
            /(<div class="footer-links">[\s\S]*?)(<\/div>)/,
            '$1    <a href="tos.html">Terms of Service</a>\n        $2'
        );
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Added TOS link to ${file}`);
    }
}
