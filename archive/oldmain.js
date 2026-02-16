'use strict';

// =========================================
// GSAP SETUP
// =========================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// =========================================
// DOM READY
// =========================================
document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. SMOOTH SCROLL (nur für echte Anchor-Links)
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      
      // Ignoriere leere Hashes oder spezielle IDs
      if (!href || href === '#' || href.startsWith('#p')) return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: 'smooth'
      });
      document.getElementById('mobileMenu')?.classList.remove('open');
    });
  });

  // =========================================
  // 2. STICKY HEADER
  // =========================================
  const header = document.querySelector('.site-header');
  const updateHeader = () =>
    header?.classList.toggle('is-solid', window.scrollY > 100);

  window.addEventListener('scroll', updateHeader);
  updateHeader();

  // =========================================
  // 3. MOBILE MENU
  // =========================================
  document.getElementById('navToggle')
    ?.addEventListener('click', () =>
      document.getElementById('mobileMenu')?.classList.toggle('open')
    );

  // =========================================
  // 4. ACCORDION
  // =========================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const active = item.classList.contains('active');

      accordionItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger')
          ?.setAttribute('aria-expanded', 'false');
      });

      if (!active) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // =========================================
  // 5. PROJECT FILTER
  // =========================================
  const projectCards = [...document.querySelectorAll('.project-card')];
  document.querySelectorAll('.section-projects .filter-btn')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? 'block' : 'none';
        });

        ScrollTrigger.refresh();
      });
    });

  // =========================================
  // 6. BLOG FILTER
  // =========================================
  const blogCards = [...document.querySelectorAll('.blog-card')];
  document.querySelectorAll('.section-blog .filter-btn')
    .forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.section-blog .filter-btn')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        blogCards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? 'grid' : 'none';
        });

        ScrollTrigger.refresh();
      });
    });

  // =========================================
  // 7. BLOG MODALS
  // =========================================
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', () =>
      document.getElementById(btn.dataset.target)?.classList.add('open')
    );
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal') ||
          e.target.classList.contains('modal-close')) {
        modal.classList.remove('open');
      }
    });
  });

  // =========================================
  // 8. SKILL BARS
  // =========================================
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

  // =========================================
  // 9. SCROLL ANIMATIONS
  // =========================================
  gsap.utils.toArray('.project-card, .blog-card').forEach(el => {
    gsap.from(el, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  ScrollTrigger.refresh();
});

// =========================================
// 10. RESIZE
// =========================================
window.addEventListener('resize', () =>
  ScrollTrigger?.refresh()
);