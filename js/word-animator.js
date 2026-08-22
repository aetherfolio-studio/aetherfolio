/* ============================================================
   AETHERFOLIO -- Per-Word Blur-to-Focus Entrance Animator
   Inspired by interfere.com's staggered word de-blur technique.
   ============================================================ */

(function () {
  var WORD_STAGGER_MS  = 45;
  var WORD_DURATION_MS = 750;
  var EASING           = 'cubic-bezier(0.16, 1, 0.3, 1)';
  var BASE_DELAY_MS    = 80;
  var reducedMotion = false;
  try { reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e) {}

  function revealWords(words) {
    words.forEach(function(word, i) {
      word.animate(
        [
          { transform: 'translateY(18%) translateZ(0)', filter: 'blur(10px)', opacity: 0 },
          { transform: 'translateY(0) translateZ(0)',   filter: 'blur(0px)',  opacity: 1 }
        ],
        { duration: WORD_DURATION_MS, delay: BASE_DELAY_MS + i * WORD_STAGGER_MS, easing: EASING, fill: 'forwards' }
      );
    });
  }

  function processTarget(target) {
    var allWords = [];
    function wrapNode(node) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        var parts = node.textContent.split(/(\s+)/);
        var frag  = document.createDocumentFragment();
        parts.forEach(function(part) {
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else if (part.length > 0) {
            var span = document.createElement('span');
            span.className = 'aether-word';
            span.style.cssText = 'display:inline-block;will-change:transform,filter,opacity;transform:translateY(18%) translateZ(0);filter:blur(10px);opacity:0;';
            span.textContent = part;
            allWords.push(span);
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrapNode);
      }
    }
    Array.from(target.childNodes).forEach(wrapNode);
    if (reducedMotion) {
      allWords.forEach(function(w) { w.style.transform='none'; w.style.filter='none'; w.style.opacity='1'; });
      return;
    }
    target.style.opacity = '1';
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        revealWords(allWords);
      });
    }, { threshold: 0.1 });
    observer.observe(target);
  }

  function init() {
    document.querySelectorAll('[data-word-reveal]').forEach(processTarget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
