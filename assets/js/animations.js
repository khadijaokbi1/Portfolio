'use strict';

// =========================================
// HELPER FUNCTIONS
// =========================================
function initHeroParallax() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  gsap.fromTo('.hero-bg-image', { scale: 1.08 }, { scale: 1, duration: 2.2, ease: 'power2.out' });
  gsap.to('.hero-bg-image', {
    yPercent: -20, ease: 'none',
    scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 }
  });
}

function initProjectFilter() {
  const projectCards = [...document.querySelectorAll('.project-card')];
  if (!projectCards.length) return;
  document.querySelectorAll('.section-projects .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.section-projects .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        gsap.to(card, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
      });
      setTimeout(() => {
        projectCards.forEach((card, index) => {
          const categories = card.dataset.category.split(',').map(c => c.trim());
          const show = filter === 'all' || categories.includes(filter);
          card.style.display = show ? 'block' : 'none';
          if (show) {
            gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: index * 0.05, ease: 'power3.out' });
          }
        });
        ScrollTrigger.refresh();
      }, 300);
    });
  });
}

function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  gsap.fromTo(cards, { opacity: 0, y: 40 }, {
    opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.08, clearProps: 'all',
    scrollTrigger: { trigger: '.projects-grid', start: 'top 90%', once: true, toggleActions: 'play none none none' }
  });
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, { y: -8, duration: 0.5, ease: 'power1.out' }));
    card.addEventListener('mouseleave', () => gsap.to(card, { y: 0,  duration: 0.5, ease: 'power1.out' }));
  });
}

function initParallaxImages() {}

function initBlogFilter() {
  const blogCards = [...document.querySelectorAll('.blog-card')];
  if (!blogCards.length) return;
  document.querySelectorAll('.section-blog .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.section-blog .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      blogCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'grid' : 'none';
      });
      ScrollTrigger.refresh();
    });
  });
}

function initBlogModals() {
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.target)?.classList.add('open');
    });
  });
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
        modal.classList.remove('open');
      }
    });
  });
}

function initSkillBars() {
  document.querySelectorAll('.skills-bar li').forEach(li => {
    const bar = li.querySelector('.bar');
    if (!bar) return;
    gsap.to(bar, {
      width: `${li.dataset.percent || 0}%`, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: li, start: 'top 85%', once: true }
    });
  });
}

function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  const slides = gsap.utils.toArray('.carousel-item');
  const nextBtn = document.getElementById('moveRight');
  const prevBtn = document.getElementById('moveLeft');
  if (!slides.length) return;
  let current = 0, isAnimating = false;
  slides.forEach((slide, i) => {
    gsap.set(slide, { xPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0, zIndex: slides.length - i });
  });
  function goToSlide(index, direction = 1) {
    if (isAnimating || index === current) return;
    isAnimating = true;
    const currentSlide = slides[current];
    const nextSlide = slides[index];
    gsap.set(nextSlide, { xPercent: direction > 0 ? 100 : -100, opacity: 1, zIndex: slides.length });
    gsap.timeline({
      defaults: { duration: 0.8, ease: 'power3.inOut' },
      onComplete: () => { gsap.set(currentSlide, { opacity: 0 }); current = index; isAnimating = false; }
    })
    .to(currentSlide, { xPercent: direction > 0 ? -100 : 100 }, 0)
    .to(nextSlide,    { xPercent: 0 }, 0);
  }
  nextBtn?.addEventListener('click', () => goToSlide((current + 1) % slides.length, 1));
  prevBtn?.addEventListener('click', () => goToSlide((current - 1 + slides.length) % slides.length, -1));
  let autoplay = setInterval(() => goToSlide((current + 1) % slides.length, 1), 6000);
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide((current + 1) % slides.length, 1), 6000);
  });
}

function initAlbumCovers() {
  document.querySelectorAll('.record-container').forEach(container => {
    const album  = container.querySelector('.album');
    const record = container.querySelector('.record');
    if (!album || !record) return;
    const tl = gsap.timeline({ paused: true });
    tl.to(album,  { x: -15, rotation: -5,  duration: 0.5,  ease: 'power2.out' }, 0);
    tl.to(record, { x:  30, rotation: 360, duration: 0.75, ease: 'power2.out' }, 0);
    container.addEventListener('mouseenter', () => tl.play());
    container.addEventListener('mouseleave', () => tl.reverse());
  });
}

// =========================================
// DOM READY
// =========================================
document.addEventListener('DOMContentLoaded', () => {

  // ── Plugins sicher registrieren ─────────────────────────────
  if (typeof gsap === 'undefined') {
    console.warn('GSAP nicht geladen – Animationen deaktiviert.');
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollSmoother !== 'undefined') gsap.registerPlugin(ScrollSmoother);
  if (typeof SplitText     !== 'undefined') gsap.registerPlugin(SplitText);

  // ── Standard inits (all pages) ──────────────────────────────
  setTimeout(() => {
    initHeroParallax();
    initProjectFilter();
    initProjectCards();
    initParallaxImages();
    initBlogFilter();
    initBlogModals();
    initSkillBars();
    initCarousel();
    initAlbumCovers();
    ScrollTrigger.refresh();
  }, 100);

  // ── Grid (index only) ───────────────────────────────────────
  if (document.getElementById('main-grid')) {
    buildGrid();
    window.addEventListener('resize', buildGrid);
  }

  // ── Hero portrait parallax ───────────────────────────────────
  if (document.querySelector('.hero-bilder')) {
    gsap.to('.hero-bilder', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  // ── Photography section animations (index only) ─────────────
  const photoSection = document.querySelector('.section-photography');
  if (!photoSection) return;

  if (document.querySelector('.typed-text-display')) {
    new Typed('.typed-text-display', {
      strings: ['', 'marketing.', 'design.', 'animation.', 'web dev.'],
      typeSpeed: 100, backSpeed: 42, loop: true
    });
  }

  const eyebrow = photoSection.querySelector('.photo-eyebrow');
  const weMake  = photoSection.querySelector('.we-make');
  const typedW  = photoSection.querySelector('.typed-line-wrap');
  const bodyTxt = photoSection.querySelector('.photo-left p');
  const cta     = photoSection.querySelector('.photo-cta');

  gsap.timeline({ scrollTrigger: { trigger: photoSection, start: 'top 70%', once: true } })
    .to(eyebrow,  { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' })
    .to(weMake,   { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.3')
    .to(typedW,   { opacity: 1,       duration: 0.5,  ease: 'power2.out' }, '-=0.4')
    .to(bodyTxt,  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
    .to(cta,      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35');

  if (weMake) {
    // SplitType (unpkg) mit Guard
    if (typeof SplitType !== 'undefined') {
      const split = new SplitType(weMake, { types: 'chars' });
      gsap.from(split.chars, {
        y: 40, opacity: 0, stagger: 0.04, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: weMake, start: 'top 82%', once: true }
      });
    }
  }

  const boxes = photoSection.querySelectorAll('.main-grid .box');
  if (boxes.length) {
    gsap.from(boxes, {
      opacity: 0, scale: 0.78,
      stagger: { each: 0.07, from: 'center' },
      duration: 0.7, ease: 'back.out(1.8)',
      scrollTrigger: { trigger: '.main-grid', start: 'top 78%', once: true }
    });
  }

  gsap.to('.bg-dash-circle', {
    rotation: 30, y: -20,
    scrollTrigger: { trigger: photoSection, start: 'top bottom', end: 'bottom top', scrub: 2 }
  });

  // ── Blog cards fade-in ───────────────────────────────────────
  gsap.utils.toArray('.blog-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });

  // ── Generic section fade (skip wave sections — y would shift ::after wave) ──
  const WAVE_CLASSES = ['wave-mint', 'wave-burg', 'wave-cream', 'wave-dark', 'wave-mauve', 'wave-foot'];
  gsap.utils.toArray('section').forEach(sec => {
    if (sec.classList.contains('section-photography')) return;
    if (WAVE_CLASSES.some(c => sec.classList.contains(c))) return;
    gsap.from(sec, {
      opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none none' }
    });
  });
});

// =========================================
// BUILD GRID (index only)
// =========================================
function buildGrid() {
  const grid = document.getElementById('main-grid');
  if (!grid) return;

  const GAP    = 16;
  const finalG = window.innerWidth < 900
    ? Math.min(420, window.innerWidth * 0.78)
    : Math.min(500, window.innerWidth * 0.42);

  const S = finalG / 3;
  const C = S - GAP * 2 / 3;

  grid.style.width  = finalG + 'px';
  grid.style.height = finalG + 'px';

  const starts = {
    1: [0,     0], 2: [S,     0], 3: [S*2,   0],
    4: [0,     S], 5: [S*2,   S],
    6: [0,   S*2], 7: [S,   S*2], 8: [S*2, S*2],
  };

  grid.querySelectorAll('.box').forEach(box => {
    const n = parseInt(box.dataset.n);
    const [l, t] = starts[n];
    box.style.cssText += `left:${l}px;top:${t}px;width:${C}px;height:${C}px;`;
    box.style.animationName = 'box-' + n;
  });

  ['1','3','4','8'].forEach(n => {
    const span = grid.querySelector(`[data-n="${n}"] > span`);
    if (span) Object.assign(span.style, { top:'50%', left:'50%', transform:'translate(-50%,-50%)', bottom:'' });
  });

  const WIDE = C * 2 + GAP;

  const css = `
    @keyframes box-1 {
      0%,90%,100% { left:0;      top:0;    width:${C}px; }
      2.5%,12.5%  { left:${S}px; top:0;    width:${C}px; }
      15%,25%     { left:${S*2}px; top:0;  width:${C}px; }
      27.5%       { left:${S*2}px; top:${S}px; width:${C}px; }
      31.5%,33.5% { left:${S}px;   top:${S}px; width:${WIDE}px; }
      35.5%,37.5% { left:${S*2}px; top:${S}px; width:${C}px; }
      40%,50%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
      52.5%,62.5% { left:${S}px;   top:${S*2}px; width:${C}px; }
      65%,75%     { left:0;        top:${S*2}px; width:${C}px; }
      77.5%,87.5% { left:0;        top:${S}px;   width:${C}px; }
    }
    @keyframes box-2 {
      0%,90%,100% { left:${S}px;   top:0;      width:${C}px; }
      2.5%,12.5%  { left:${S*2}px; top:0;      width:${C}px; }
      15%,17%     { left:${S*2}px; top:${S}px; width:${C}px; }
      19%,21%     { left:${S}px;   top:${S}px; width:${WIDE}px; }
      23%,25%     { left:${S*2}px; top:${S}px; width:${C}px; }
      27.5%,37.5% { left:${S*2}px; top:${S*2}px; width:${C}px; }
      40%,50%     { left:${S}px;   top:${S*2}px; width:${C}px; }
      52.5%,62.5% { left:0;        top:${S*2}px; width:${C}px; }
      65%,75%     { left:0;        top:${S}px;   width:${C}px; }
      77.5%,87.5% { left:0;        top:0;        width:${C}px; }
    }
    @keyframes box-3 {
      0%,90%,100% { left:${S*2}px; top:0;        width:${C}px; }
      2.5%,12.5%  { left:${S*2}px; top:${S}px;   width:${C}px; }
      6.5%,8.5%   { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      15%,25%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
      27.5%,37.5% { left:${S}px;   top:${S*2}px; width:${C}px; }
      40%,50%     { left:0;        top:${S*2}px; width:${C}px; }
      52.5%,62.5% { left:0;        top:${S}px;   width:${C}px; }
      65%,75%     { left:0;        top:0;        width:${C}px; }
      77.5%,87.5% { left:${S}px;   top:0;        width:${C}px; }
    }
    @keyframes box-4 {
      0%,90%,100%     { left:0;        top:${S}px;   width:${C}px; }
      2.5%,12.5%      { left:0;        top:0;        width:${C}px; }
      15%,25%         { left:${S}px;   top:0;        width:${C}px; }
      27.5%,37.5%     { left:${S*2}px; top:0;        width:${C}px; }
      40%,42%,48%,50% { left:${S*2}px; top:${S}px;   width:${C}px; }
      44%,46%         { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      52.5%,62.5%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
      65%,75%         { left:${S}px;   top:${S*2}px; width:${C}px; }
      77.5%,87.5%     { left:0;        top:${S*2}px; width:${C}px; }
    }
    @keyframes box-5 {
      0%,90%,92%,98%,100% { left:${S*2}px; top:${S}px;   width:${C}px; }
      2.5%,12.5%          { left:${S*2}px; top:${S*2}px; width:${C}px; }
      15%,25%             { left:${S}px;   top:${S*2}px; width:${C}px; }
      27.5%,37.5%         { left:0;        top:${S*2}px; width:${C}px; }
      40%,50%             { left:0;        top:${S}px;   width:${C}px; }
      52.5%,62.5%         { left:0;        top:0;        width:${C}px; }
      65%,75%             { left:${S}px;   top:0;        width:${C}px; }
      77.5%,87.5%         { left:${S*2}px; top:0;        width:${C}px; }
      94%,96%             { left:${S}px;   top:${S}px;   width:${WIDE}px; }
    }
    @keyframes box-6 {
      0%,90%,100%             { left:0;        top:${S*2}px; width:${C}px; }
      2.5%,12.5%              { left:0;        top:${S}px;   width:${C}px; }
      15%,25%                 { left:0;        top:0;        width:${C}px; }
      27.5%,37.5%             { left:${S}px;   top:0;        width:${C}px; }
      40%,50%                 { left:${S*2}px; top:0;        width:${C}px; }
      52.5%,54.5%,60.5%,62.5% { left:${S*2}px; top:${S}px;  width:${C}px; }
      56.5%,58.5%             { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      65%,75%                 { left:${S*2}px; top:${S*2}px; width:${C}px; }
      77.5%,87.5%             { left:${S}px;   top:${S*2}px; width:${C}px; }
    }
    @keyframes box-7 {
      0%,90%,100%     { left:${S}px;   top:${S*2}px; width:${C}px; }
      2.5%,12.5%      { left:0;        top:${S*2}px; width:${C}px; }
      15%,25%         { left:0;        top:${S}px;   width:${C}px; }
      27.5%,37.5%     { left:0;        top:0;        width:${C}px; }
      40%,50%         { left:${S}px;   top:0;        width:${C}px; }
      52.5%,62.5%     { left:${S*2}px; top:0;        width:${C}px; }
      65%,67%,73%,75% { left:${S*2}px; top:${S}px;   width:${C}px; }
      69%,71%         { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      77.5%,87.5%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
    }
    @keyframes box-8 {
      0%,90%,100%              { left:${S*2}px; top:${S*2}px; width:${C}px;    border-radius:9999px; }
      2.5%,12.5%               { left:${S}px;   top:${S*2}px; width:${C}px; }
      15%,25%                  { left:0;        top:${S*2}px; width:${C}px; }
      27.5%,37.5%              { left:0;        top:${S}px;   width:${C}px; }
      40%,50%                  { left:0;        top:0;        width:${C}px; }
      52.5%,62.5%              { left:${S}px;   top:0;        width:${C}px; }
      65%,75%                  { left:${S*2}px; top:0;        width:${C}px; }
      77.5%,79.5%,85.5%,87.5%  { left:${S*2}px; top:${S}px;  width:${C}px;    border-radius:50%; }
      81.5%,83.5%              { left:${S}px;   top:${S}px;   width:${WIDE}px; border-radius:9999px; }
    }
  `;

  let styleTag = document.getElementById('grid-keyframes');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'grid-keyframes';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css;
}
