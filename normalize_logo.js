const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/ishit/.gemini/antigravity/scratch/Aether_Website_Final';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
files.forEach(f => {
    let c = fs.readFileSync(path.join(dir, f), 'utf8');
    c = c.replace(/src="logo\.png" alt="Aether" style="height: 24px;"/g, 'src="logo.png" alt="Aether"');
    fs.writeFileSync(path.join(dir, f), c, 'utf8');
});
console.log('Done normalizing logo img tags');
