const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\ishit\\.gemini\\antigravity\\scratch\\Aether_Website_Final';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Replace the Phosphor planet icon logo with the real logo.png
    content = content.replace(
        /<i class="ph-fill ph-planet"><\/i> Aether/g, 
        '<img src="logo.png" alt="Aether" style="height: 24px;"> <span style="margin-left:8px;">Aether</span>'
    );
    // There might be places where style is on the icon directly
    content = content.replace(
        /<i class="ph-fill ph-planet" style="font-size: 24px;"><\/i>/g, 
        '<img src="logo.png" alt="Aether" style="height: 24px;">'
    );

    // Remove mentions of Linear
    content = content.replace(/Linear Aesthetic Update 3\.0/g, 'Accepting New Projects');
    content = content.replace(/Linear Table style/g, 'Project Table');
    
    fs.writeFileSync(path.join(dir, file), content, 'utf8');
}
console.log('Done replacing logos and Linear mentions');
