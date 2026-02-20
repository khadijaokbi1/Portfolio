'use strict';

// =========================================
// HERO PARALLAX
// =========================================
const initHeroParallax = () => {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  
  gsap.to('.hero-top', {
    y: 100,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-bottom', {
    y: 120,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-portrait', {
    y: -20,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-portrait-bg', {
    y: -20,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
};


// =========================================
// PROJECT FILTER
// =========================================
const initProjectFilter = () => {
  const projectCards = [...document.querySelectorAll('.project-card')];
  
  document.querySelectorAll('.section-projects .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.section-projects .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      
      // Erst alle ausblenden
      projectCards.forEach(card => {
        gsap.to(card, {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in'
        });
      });
      
      // Dann gefilterte einblenden
      setTimeout(() => {
        projectCards.forEach((card, index) => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? 'block' : 'none';
          
          if (show) {
            gsap.fromTo(card, 
              { opacity: 0, y: 30 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.5,
                delay: index * 0.05,
                ease: 'power3.out'
              }
            );
          }
        });
        
        ScrollTrigger.refresh();
      }, 300);
    });
  });
};

// =========================================
// PROJECT CARDS ANIMATION
// =========================================
const initProjectCards = () => {
    const cards = document.querySelectorAll('.project-card');

    gsap.fromTo(cards,
        {
            autoAlpha: 0,
            y: 40
        },
        {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 85%',
                once: true,
                toggleActions: 'play none none none'
            },
            onComplete: () => {
                gsap.set(cards, { clearProps: 'transform' });
            }
        }
    );

    // Hover Effect
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, duration: 0.5, ease: 'power1.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.5, ease: 'power1.out' });
      });
    });
};
// =========================================
// PARALLAX IMAGES – deaktiviert: Blog-Thumbnails sind statische <img>-Tags (kein Parallax gewünscht)
// =========================================
const initParallaxImages = () => {
  // intentionally empty – no parallax on blog thumbnails
};

// =========================================
// BLOG FILTER
// =========================================
const initBlogFilter = () => {
  const blogCards = [...document.querySelectorAll('.blog-card')];
  
  document.querySelectorAll('.section-blog .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.section-blog .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      blogCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'grid' : 'none';
      });

      ScrollTrigger.refresh();
    });
  });
};

// =========================================
// BLOG MODALS
// =========================================
const initBlogModals = () => {
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.target)?.classList.add('open');
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal') || 
          e.target.classList.contains('modal-close')) {
        modal.classList.remove('open');
      }
    });
  });
};

// =========================================
// SKILL BARS
// =========================================
const initSkillBars = () => {
  document.querySelectorAll('.skills-bar li').forEach(li => {
    const bar = li.querySelector('.bar');
    if (!bar) return;

    gsap.to(bar, {
      width: `${li.dataset.percent || 0}%`,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: li,
        start: 'top 85%',
        once: true
      }
    });
  });
};

// =========================================
// CAROUSEL
// =========================================
const initCarousel = () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = gsap.utils.toArray('.carousel-item');
  const nextBtn = document.getElementById('moveRight');
  const prevBtn = document.getElementById('moveLeft');

  if (!slides.length) return;

  let current = 0;
  let isAnimating = false;

  slides.forEach((slide, i) => {
    gsap.set(slide, {
      xPercent: i === 0 ? 0 : 100,
      opacity: i === 0 ? 1 : 0,
      zIndex: slides.length - i
    });
  });

  function goToSlide(index, direction = 1) {
    if (isAnimating || index === current) return;
    isAnimating = true;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    gsap.set(nextSlide, {
      xPercent: direction > 0 ? 100 : -100,
      opacity: 1,
      zIndex: slides.length
    });

    gsap.timeline({
      defaults: { duration: 0.8, ease: 'power3.inOut' },
      onComplete: () => {
        gsap.set(currentSlide, { opacity: 0 });
        current = index;
        isAnimating = false;
      }
    })
    .to(currentSlide, { xPercent: direction > 0 ? -100 : 100 }, 0)
    .to(nextSlide, { xPercent: 0 }, 0);
  }

  nextBtn?.addEventListener('click', () => {
    goToSlide((current + 1) % slides.length, 1);
  });

  prevBtn?.addEventListener('click', () => {
    goToSlide((current - 1 + slides.length) % slides.length, -1);
  });

  // Autoplay
  let autoplay = setInterval(() => {
    goToSlide((current + 1) % slides.length, 1);
  }, 6000);

  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => {
      goToSlide((current + 1) % slides.length, 1);
    }, 6000);
  });
};

// =========================================
// ALBUM COVERS
// =========================================
const initAlbumCovers = () => {
  const recordContainers = document.querySelectorAll('.record-container');
  
  recordContainers.forEach(container => {
    const tl = gsap.timeline({ paused: true });
    const album = container.querySelector('.album');
    const record = container.querySelector('.record');
    
    if (!album || !record) return;
    
    tl.to(album, { x: -15, rotation: -5, duration: 0.5, ease: 'power2.out' }, 0);
    tl.to(record, { x: 30, rotation: 360, duration: 0.75, ease: 'power2.out' }, 0);
    
    container.addEventListener('mouseenter', () => tl.play());
    container.addEventListener('mouseleave', () => tl.reverse());
  });
};

// =========================================
// INIT ALL INDEX ANIMATIONS
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded - Initializing animations');
  console.log('📦 GSAP available:', typeof gsap !== 'undefined');
  console.log('📦 ScrollTrigger available:', typeof ScrollTrigger !== 'undefined');
  
  // Direct test without setTimeout
  const testItems = document.querySelectorAll('.accordion-item');
  console.log('🧪 Direct test - Found accordion items:', testItems.length);
  testItems.forEach((item, i) => {
    const btn = item.querySelector('.accordion-trigger');
    if (btn) {
      console.log(`🧪 Adding direct test handler to item ${i + 1}`);
      btn.addEventListener('click', function(e) {
        console.log(`🎯 DIRECT CLICK DETECTED on item ${i + 1}!`);
        alert(`Accordion ${i + 1} clicked!`);
      });
    }
  });
  
  setTimeout(() => {
    try {
      console.log('Initializing initHeroParallax...');
      initHeroParallax();
    } catch (e) {
      console.error('❌ Error in initHeroParallax:', e);
    }
    
    try {
      console.log('Initializing initAccordion...');
      initAccordion();
    } catch (e) {
      console.error('❌ Error in initAccordion:', e);
    }
    
    try {
      console.log('Initializing initProjectFilter...');
      initProjectFilter();
    } catch (e) {
      console.error('❌ Error in initProjectFilter:', e);
    }
    
    try {
      initProjectCards();
      initParallaxImages();
      initBlogFilter();
      initBlogModals();
      initSkillBars();
      initCarousel();
      initAlbumCovers();
    } catch (e) {
      console.error('❌ Error in other inits:', e);
    }
    
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 100);
});

function buildGrid() {
  const rightEl = document.querySelector('.photo-right');
  const grid    = document.getElementById('main-grid');

  // Target grid size: smaller of 500px or 42vw
  const G = Math.min(500, window.innerWidth * 0.42);
  const GAP  = 16;
  const CELL = G / 3 - GAP * 2 / 3;   // one cell size
  const STEP = G / 3;                  // one grid step

  grid.style.width  = G + 'px';
  grid.style.height = G + 'px';

  // Responsive: on narrow viewports use 80vw
  const finalG = window.innerWidth < 900 ? Math.min(420, window.innerWidth * 0.78) : G;
  const finalCell = finalG / 3 - GAP * 2 / 3;
  const finalStep = finalG / 3;

  grid.style.width  = finalG + 'px';
  grid.style.height = finalG + 'px';

  const S  = finalStep;   // alias
  const C  = finalCell;
  const W  = finalG;      // full width (for "pill" wide state)

  // Starting positions for each box (col, row) in grid steps
  const starts = {
    1: [0, 0],       // row1 col1
    2: [S, 0],       // row1 col2
    3: [S*2, 0],     // row1 col3
    4: [0, S],       // row2 col1
    5: [S*2, S],     // row2 col3  (middle col is the empty slot)
    6: [0, S*2],     // row3 col1
    7: [S, S*2],     // row3 col2
    8: [S*2, S*2],   // row3 col3
  };

  // Apply starting positions & sizes
  const boxes = grid.querySelectorAll('.box');
  boxes.forEach(box => {
    const n = parseInt(box.dataset.n);
    const [l, t] = starts[n];
    box.style.left   = l + 'px';
    box.style.top    = t + 'px';
    box.style.width  = C + 'px';
    box.style.height = C + 'px';
    box.style.animationName = 'box-' + n;
  });

  // Fix label text positions (outside the pill)
  const b1span = grid.querySelector('[data-n="1"] > span');
  const b3span = grid.querySelector('[data-n="3"] > span');
  const b4span = grid.querySelector('[data-n="4"] > span');
  const b8span = grid.querySelector('[data-n="8"] > span');
  if (b1span) { b1span.style.top = '50%'; b1span.style.left = '50%'; b1span.style.transform = 'translate(-50%,-50%)'; }
  if (b3span) { b3span.style.top = '50%'; b3span.style.left = '50%'; b3span.style.transform = 'translate(-50%,-50%)'; b3span.style.bottom = ''; }
  if (b4span) { b4span.style.top = '50%'; b4span.style.left = '50%'; b4span.style.transform = 'translate(-50%,-50%)'; }
  if (b8span) { b8span.style.top = '50%'; b8span.style.left = '50%'; b8span.style.transform = 'translate(-50%,-50%)'; }

  /* --- Inject pixel-based @keyframes into a <style> tag --- */
  const WIDE = C * 2 + GAP; // wide pill = 2 cells + 1 gap

  const css = `
    @keyframes box-1 {
      0%,90%,100% { left:0;      top:0;    width:${C}px; }
      2.5%,12.5%  { left:${S}px; top:0;    width:${C}px; }
      15%,25%     { left:${S*2}px; top:0;  width:${C}px; }
      27.5%       { left:${S*2}px; top:${S}px; width:${C}px; }
      29.5%       { left:${S*2}px; top:${S}px; width:${C}px; }
      31.5%,33.5% { left:${S}px; top:${S}px;   width:${WIDE}px; }
      35.5%,37.5% { left:${S*2}px; top:${S}px; width:${C}px; }
      40%,50%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
      52.5%,62.5% { left:${S}px; top:${S*2}px; width:${C}px; }
      65%,75%     { left:0;      top:${S*2}px; width:${C}px; }
      77.5%,87.5% { left:0;      top:${S}px;   width:${C}px; }
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
      0%,90%,100% { left:${S*2}px; top:0;       width:${C}px; }
      2.5%,12.5%  { left:${S*2}px; top:${S}px;  width:${C}px; }
      4.5%,10.5%  { left:${S*2}px; top:${S}px;  width:${C}px; }
      6.5%,8.5%   { left:${S}px;   top:${S}px;  width:${WIDE}px; }
      15%,25%     { left:${S*2}px; top:${S*2}px; width:${C}px; }
      27.5%,37.5% { left:${S}px;   top:${S*2}px; width:${C}px; }
      40%,50%     { left:0;        top:${S*2}px; width:${C}px; }
      52.5%,62.5% { left:0;        top:${S}px;   width:${C}px; }
      65%,75%     { left:0;        top:0;        width:${C}px; }
      77.5%,87.5% { left:${S}px;   top:0;        width:${C}px; }
    }
    @keyframes box-4 {
      0%,90%,100%      { left:0;        top:${S}px;   width:${C}px; }
      2.5%,12.5%       { left:0;        top:0;        width:${C}px; }
      15%,25%          { left:${S}px;   top:0;        width:${C}px; }
      27.5%,37.5%      { left:${S*2}px; top:0;        width:${C}px; }
      40%,42%,48%,50%  { left:${S*2}px; top:${S}px;   width:${C}px; }
      44%,46%          { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      52.5%,62.5%      { left:${S*2}px; top:${S*2}px; width:${C}px; }
      65%,75%          { left:${S}px;   top:${S*2}px; width:${C}px; }
      77.5%,87.5%      { left:0;        top:${S*2}px; width:${C}px; }
    }
    @keyframes box-5 {
      0%,90%,92%,98%,100% { left:${S*2}px; top:${S}px;   width:${C}px; }
      2.5%,12.5%           { left:${S*2}px; top:${S*2}px; width:${C}px; }
      15%,25%              { left:${S}px;   top:${S*2}px; width:${C}px; }
      27.5%,37.5%          { left:0;        top:${S*2}px; width:${C}px; }
      40%,50%              { left:0;        top:${S}px;   width:${C}px; }
      52.5%,62.5%          { left:0;        top:0;        width:${C}px; }
      65%,75%              { left:${S}px;   top:0;        width:${C}px; }
      77.5%,87.5%          { left:${S*2}px; top:0;        width:${C}px; }
      94%,96%              { left:${S}px;   top:${S}px;   width:${WIDE}px; }
    }
    @keyframes box-6 {
      0%,90%,100%                   { left:0;        top:${S*2}px; width:${C}px; }
      2.5%,12.5%                    { left:0;        top:${S}px;   width:${C}px; }
      15%,25%                       { left:0;        top:0;        width:${C}px; }
      27.5%,37.5%                   { left:${S}px;   top:0;        width:${C}px; }
      40%,50%                       { left:${S*2}px; top:0;        width:${C}px; }
      52.5%,54.5%,60.5%,62.5%       { left:${S*2}px; top:${S}px;   width:${C}px; }
      56.5%,58.5%                   { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      65%,75%                       { left:${S*2}px; top:${S*2}px; width:${C}px; }
      77.5%,87.5%                   { left:${S}px;   top:${S*2}px; width:${C}px; }
    }
    @keyframes box-7 {
      0%,90%,100%          { left:${S}px;   top:${S*2}px; width:${C}px; }
      2.5%,12.5%           { left:0;        top:${S*2}px; width:${C}px; }
      15%,25%              { left:0;        top:${S}px;   width:${C}px; }
      27.5%,37.5%          { left:0;        top:0;        width:${C}px; }
      40%,50%              { left:${S}px;   top:0;        width:${C}px; }
      52.5%,62.5%          { left:${S*2}px; top:0;        width:${C}px; }
      65%,67%,73%,75%      { left:${S*2}px; top:${S}px;   width:${C}px; }
      69%,71%              { left:${S}px;   top:${S}px;   width:${WIDE}px; }
      77.5%,87.5%          { left:${S*2}px; top:${S*2}px; width:${C}px; }
    }
    @keyframes box-8 {
      0%,90%,100%                    { left:${S*2}px; top:${S*2}px; width:${C}px; border-radius:9999px; }
      2.5%,12.5%                     { left:${S}px;   top:${S*2}px; width:${C}px; }
      15%,25%                        { left:0;        top:${S*2}px; width:${C}px; }
      27.5%,37.5%                    { left:0;        top:${S}px;   width:${C}px; }
      40%,50%                        { left:0;        top:0;        width:${C}px; }
      52.5%,62.5%                    { left:${S}px;   top:0;        width:${C}px; }
      65%,75%                        { left:${S*2}px; top:0;        width:${C}px; }
      77.5%,79.5%,85.5%,87.5%        { left:${S*2}px; top:${S}px;   width:${C}px; border-radius:50%; }
      81.5%,83.5%                    { left:${S}px;   top:${S}px;   width:${WIDE}px; border-radius:9999px; }
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

buildGrid();
window.addEventListener('resize', buildGrid);

/* ── GSAP & Typed ── */
gsap.registerPlugin(ScrollTrigger);

new Typed('.typed-text-display', {
  strings: ['', 'visuals.', 'campaigns.', 'motion.', 'brands.'],
  typeSpeed: 100, backSpeed: 42, loop: true
});

const section = document.querySelector('.section-photography');
const eyebrow  = section.querySelector('.photo-eyebrow');
const weMake   = section.querySelector('.we-make');
const typedW   = section.querySelector('.typed-line-wrap');
const bodyTxt  = section.querySelector('.photo-left p');
const cta      = section.querySelector('.photo-cta');

gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 70%', once: true } })
  .to(eyebrow,  { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' })
  .to(weMake,   { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.3')
  .to(typedW,   { opacity: 1,       duration: 0.5,  ease: 'power2.out' }, '-=0.4')
  .to(bodyTxt,  { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.35')
  .to(cta,      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35');

const split = new SplitType(weMake, { types: 'chars' });
gsap.from(split.chars, {
  y: 40, opacity: 0, stagger: 0.04, duration: 0.55, ease: 'power3.out',
  scrollTrigger: { trigger: weMake, start: 'top 82%', once: true }
});

const boxes = section.querySelectorAll('.main-grid .box');
gsap.from(boxes, {
  opacity: 0, scale: 0.78,
  stagger: { each: 0.07, from: 'center' },
  duration: 0.7, ease: 'back.out(1.8)',
  scrollTrigger: { trigger: '.main-grid', start: 'top 78%', once: true }
});

gsap.to('.bg-dash-circle', {
  rotation: 30, y: -20,
  scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2 }
});
