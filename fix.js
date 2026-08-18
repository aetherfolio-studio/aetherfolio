const fs = require('fs');

// Copy the image
try {
  fs.copyFileSync('C:\\Users\\ishit\\.gemini\\antigravity\\brain\\ea19405b-0bac-4a42-8e39-8caea0ff734f\\.user_uploaded\\media_1786960992274.png', 'assets/vanguard_hero_new.png');
  console.log('Image copied successfully!');
} catch (e) {
  console.log('Error copying image:', e);
}

// 1. Fix index.html
let index = fs.readFileSync('index.html', 'utf8');
// Only replace href="#" inside the Vanguard section or globally if it's the only one. 
// Wait, "Start a Project" link was href="#" originally but we fixed it to href="contact.html".
// Let's replace the specific Vanguard button.
index = index.replace(/href=\"#\"/g, 'href="https://vanguardhq.vercel.app" target="_blank"');
fs.writeFileSync('index.html', index);

// 2. Fix projects.html
let projects = fs.readFileSync('projects.html', 'utf8');
projects = projects.replace(/href=\"#\"/g, 'href="https://vanguardhq.vercel.app" target="_blank"');
fs.writeFileSync('projects.html', projects);

console.log('Links fixed!');
