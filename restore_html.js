const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const parts = content.split('<!DOCTYPE html>').filter(p => p.trim());

const titleMap = {
    'About | Aether': 'about.html',
    'Contact | Aether': 'contact.html',
    'Aether | Engineering Digital Excellence': 'index.html',
    'Log In, Aether': 'login.html',
    'Process | Aether': 'process.html',
    'Projects | Aether': 'projects.html',
    'Settings, Aether': 'settings.html',
    'Sign Up, Aether': 'signup.html',
    'Skills | Aether': 'skills.html',
    'Terms of Service, Aether': 'tos.html'
};

parts.forEach(p => {
    const titleMatch = p.match(/<title>(.*?)<\/title>/);
    if (titleMatch) {
        const title = titleMatch[1].trim();
        const filename = titleMap[title];
        if (filename) {
            fs.writeFileSync(filename, '<!DOCTYPE html>\n' + p, 'utf8');
            console.log('Restored ' + filename);
        } else {
            console.log('Unknown title: ' + title);
        }
    }
});
