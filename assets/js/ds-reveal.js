/* ═══════════════════════════════════════════
   ds-reveal.js  —  Design-System Scroll Reveals
   Adds .is-visible to .ds-reveal, .ds-reveal-left,
   .ds-reveal-scale elements when they enter the viewport.
   ═══════════════════════════════════════════ */
(() => {
  'use strict';

  const SELECTOR = '.ds-reveal, .ds-reveal-left, .ds-reveal-scale';

  function init() {
    const targets = document.querySelectorAll(SELECTOR);
    if (!targets.length) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -6% 0px'
    });

    targets.forEach(el => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
