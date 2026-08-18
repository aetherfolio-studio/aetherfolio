const fs = require('fs');

const files = ['index.html', 'process.html', 'projects.html'];

const newFooter = `<footer class="w-full pt-section-gap pb-12 px-margin-edge bg-background">
  <div class="max-w-container-max mx-auto">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-outline-variant/20 pt-8 gap-8">
      <div class="flex flex-col gap-2">
        <p class="font-display-xl-mobile text-[20px] text-on-surface">Aetherfolio</p>
        <p class="font-body-md text-sm text-on-surface-variant/60">Curating digital excellence.</p>
      </div>
      <div class="flex gap-8">
        <a class="font-label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors tracking-[0.3em]" href="index.html">HOME</a>
        <a class="font-label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors tracking-[0.3em]" href="contact.html">CONTACT</a>
        <a class="font-label-caps text-[10px] text-on-surface-variant hover:text-primary transition-colors tracking-[0.3em]" href="tos.html">TERMS OF SERVICE</a>
      </div>
    </div>
    <div class="mt-12 text-center">
      <p class="font-label-caps text-[9px] text-on-surface-variant/30 uppercase tracking-[0.5em]">© 2024 Aetherfolio Studio. All rights reserved.</p>
    </div>
  </div>
</footer>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<footer class="w-full pt-section-gap pb-12.*<\/footer>/s, newFooter);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated footer in ${file}`);
}
