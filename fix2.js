const fs = require('fs');

// 1. Fix index.html
let index = fs.readFileSync('index.html', 'utf8');

// Remove the explicit view button circle on hover
const viewBtnRegex = /<!-- Custom Cursor Interaction Area -->[\s\S]*?mix-blend-normal">View.*?\n\s*<\/div>\n\s*<\/div>/g;
index = index.replace(viewBtnRegex, '');

// Fix the image container height and scale
index = index.replace(/h-\[600px\] xl:h-\[800px\]/g, 'aspect-[4/3] xl:aspect-video');
index = index.replace(/bg-contain bg-no-repeat bg-center/g, 'bg-cover bg-center');
fs.writeFileSync('index.html', index);

// 2. Fix projects.html
let projects = fs.readFileSync('projects.html', 'utf8');
projects = projects.replace(/h-\[614px\]/g, 'aspect-[4/3] lg:aspect-video');
projects = projects.replace(/bg-contain bg-no-repeat bg-center/g, 'bg-cover bg-center');
fs.writeFileSync('projects.html', projects);

// 3. Fix stitch_projects.html
let stitch = fs.readFileSync('stitch_projects.html', 'utf8');
stitch = stitch.replace(/h-\[614px\]/g, 'aspect-[4/3] lg:aspect-video');
stitch = stitch.replace(/bg-contain bg-no-repeat bg-center/g, 'bg-cover bg-center');
fs.writeFileSync('stitch_projects.html', stitch);

console.log('Fixed aspect ratios and removed view button.');
