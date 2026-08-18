const fs = require('fs');
const glob = require('fs').readdirSync('.');

for (const file of glob) {
    if (file.endsWith('.html') || file.endsWith('.js')) {
        let content = fs.readFileSync(file, 'utf-8');
        // Remove all <i> tags containing ph-duotone
        content = content.replace(/<i class="ph-duotone[^>]*><\/i>/g, '');
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Stripped icons from ${file}`);
    }
}
