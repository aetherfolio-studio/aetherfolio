const fs = require('fs');
const path = require('path');

const cssContent = `
/* ==========================================================================
   15. LEGACY/SPECIFIC LAYOUTS (Linearized)
   ========================================================================== */

/* Process Rows */
.process-rows { display: flex; flex-direction: column; gap: 16px; }
.process-item {
  display: grid; grid-template-columns: 80px 1fr; gap: 24px;
  padding: 32px; background: var(--bg-elevated);
  border: 1px solid var(--border); border-radius: var(--radius-lg);
  transition: all var(--transition-base); box-shadow: inset 0 1px 0 rgba(255,255,255,0.02);
}
.process-item:hover { border-color: var(--border-strong); transform: translateY(-2px); }
.process-num {
  font-family: var(--font-display); font-size: 3rem; font-weight: 800;
  color: var(--text-muted); opacity: 0.5; line-height: 1; margin-top: -8px;
}
.process-item:hover .process-num { opacity: 1; color: var(--accent); }
.process-body h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 8px; }
.process-body p { color: var(--text-secondary); }

/* About Page Split */
.page-hero { padding: 180px 0 80px; text-align: center; }
.about-split {
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
@media (max-width: 900px) { .about-split { grid-template-columns: 1fr; } }
.about-img-wrap { position: relative; }
.about-img-scene {
  background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg);
  aspect-ratio: 4/5; position: relative; overflow: hidden;
}
.about-img-scene::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(94, 106, 210, 0.2) 0%, transparent 70%);
}
.img-accent {
  position: absolute; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong); color: #fff; padding: 6px 12px;
  border-radius: var(--radius-full); font-size: 0.85rem;
}
.accent-1 { top: 24px; left: 24px; }
.accent-2 { bottom: 24px; right: 24px; }

/* Stats Row */
.stat-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 40px; }
.stat-item { padding: 24px; background: var(--bg-surface); border: 1px solid var(--border); border-radius: var(--radius-md); }
.stat-num { font-size: 2.5rem; font-weight: 700; color: var(--text-primary); line-height: 1.1; margin-bottom: 4px; }
.stat-lbl { font-size: 0.9rem; color: var(--text-secondary); }

/* FAQ */
.faq-list { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; }
.faq-item { background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; }
.faq-q {
  padding: 24px; font-weight: 500; display: flex; justify-content: space-between;
  align-items: center; cursor: pointer; user-select: none;
}
.faq-a { padding: 0 24px; max-height: 0; opacity: 0; color: var(--text-secondary); transition: all 0.4s ease; overflow: hidden; }
.faq-item.active .faq-a { padding-bottom: 24px; max-height: 200px; opacity: 1; }

/* Contact Split */
.contact-split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
@media (max-width: 900px) { .contact-split { grid-template-columns: 1fr; } }
.contact-info { padding: 40px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-lg); }

/* Glass Legacy */
.glass { background: var(--bg-elevated); border: 1px solid var(--border); backdrop-filter: none; }
.glass-hover:hover { border-color: var(--border-strong); transform: translateY(-2px); box-shadow: var(--shadow-md); }
`;

fs.appendFileSync(path.join('C:\\Users\\ishit\\.gemini\\antigravity\\scratch\\Aether_Website_Final', 'style.css'), cssContent, 'utf8');
console.log('Appended layout CSS to style.css');
