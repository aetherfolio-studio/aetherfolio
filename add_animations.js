const fs = require('fs');
const path = require('path');

const files = ['index.html', 'projects.html', 'process.html', 'skills.html', 'about.html', 'contact.html', 'tos.html', 'stitch_projects.html', 'stitch_about.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Add reveal to sections (except the absolute background divs, just actual content sections)
    // Actually, adding reveal to <section> might fade the background. We usually want to fade the content INSIDE the section.
    
    // 1. Add reveal to all h1, h2, h3
    content = content.replace(/<h1 class="([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<h1 class="reveal ${p1}"`;
        return match;
    });
    content = content.replace(/<h2 class="([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<h2 class="reveal ${p1}"`;
        return match;
    });
    content = content.replace(/<h3 class="([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<h3 class="reveal ${p1}"`;
        return match;
    });
    
    // 2. Add reveal to Bento grid items (group relative bg-surface-container)
    content = content.replace(/<div class="group relative bg-surface-container([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal group relative bg-surface-container${p1}"`;
        return match;
    });

    // 3. Add reveal to Toolset items (flex flex-col gap-6 p-8 bg-surface-container)
    content = content.replace(/<div class="flex flex-col gap-6 p-8 bg-surface-container([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal flex flex-col gap-6 p-8 bg-surface-container${p1}"`;
        return match;
    });
    
    // 4. Add reveal to process step items (border-l-2 border-outline/10)
    content = content.replace(/<div class="relative z-10 pl-8 border-l-2([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal relative z-10 pl-8 border-l-2${p1}"`;
        return match;
    });

    // 5. Add reveal to Project Images (group block relative)
    content = content.replace(/<a class="group block relative([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<a class="reveal group block relative${p1}"`;
        return match;
    });
    
    // 6. Add reveal to contact form wrapper
    content = content.replace(/<div class="bg-surface-container-high rounded-sm p-8([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal bg-surface-container-high rounded-sm p-8${p1}"`;
        return match;
    });

    // 7. Add reveal to right side image containers (like Vanguard and Crystal)
    content = content.replace(/<div class="xl:w-2\/3 h-\[600px\] xl:h-\[800px\]([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal xl:w-2/3 h-[600px] xl:h-[800px]${p1}"`;
        return match;
    });
    content = content.replace(/<div class="relative w-full h-\[350px\] md:h-\[500px\]([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal relative w-full h-[350px] md:h-[500px]${p1}"`;
        return match;
    });

    // 8. Add reveal to About page image (w-full md:w-5\/12)
    content = content.replace(/<div class="w-full md:w-5\/12([^"]*)"/g, (match, p1) => {
        if (!p1.includes('reveal')) return `<div class="reveal w-full md:w-5/12${p1}"`;
        return match;
    });

    fs.writeFileSync(file, content, 'utf8');
    console.log('Added animations to ' + file);
});
