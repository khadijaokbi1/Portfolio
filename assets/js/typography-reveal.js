'use strict';

(function initTypographyReveal() {
  function shouldSkip(el) {
    return el.closest('nav, footer, .site-footer, .typography-lab, .controls, .meta, .download, .downloads, .code-wrap');
  }

  function addSecondWordAccent(el) {
    if (el.querySelector('em') || el.querySelector('.title-word-2') || el.children.length > 0) return;
    const text = (el.textContent || '').trim();
    if (!text) return;

    const words = text.split(/\s+/);
    if (words.length < 2) return;

    words[1] = `<span class="title-word-2">${words[1]}</span>`;
    el.innerHTML = words.join(' ');
  }

  function wrapMaskedLines(el) {
    if (el.classList.contains('mlr-ready')) return;

    addSecondWordAccent(el);

    const html = el.innerHTML;
    const lines = html.split(/<br\s*\/?\s*>/i).map(s => s.trim()).filter(Boolean);
    const source = lines.length ? lines : [html];

    el.innerHTML = source
      .map((line) => `<span class="mlr-line"><span class="mlr-inner">${line}</span></span>`)
      .join('');

    el.classList.add('mlr-ready');
  }

  function run() {
    const targets = [...document.querySelectorAll('h1, h2')].filter((el) => !shouldSkip(el));
    if (!targets.length) return;

    targets.forEach(wrapMaskedLines);

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => io.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
