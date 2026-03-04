// =========================================
// MAIN.JS - Globale Funktionen
// =========================================

'use strict';

// GSAP Setup
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// =========================================
// DOM READY
// =========================================
document.addEventListener('DOMContentLoaded', () => {

  // Smooth Scroll für Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      
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

  // Sticky Header
  const header = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero');

  const updateHeader = () => {
    const threshold = heroSection ? heroSection.offsetHeight - 10 : 60;
    header?.classList.toggle('is-solid', window.scrollY >= threshold);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile Menu Toggle
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
  });

  // Accordion (Work Section)
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const active = item.classList.contains('active');

      // Alle schließen
      accordionItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });

      // Aktuelles öffnen (falls nicht schon offen)
      if (!active) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Project Filter
  const projectCards = [...document.querySelectorAll('.project-card')];
  document.querySelectorAll('.section-projects .filter-btn').forEach(btn => {
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

  // Blog Filter
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

  // Blog Modals
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

  // Skill Bars Animation (nur wenn GSAP vorhanden)
  if (typeof gsap !== 'undefined') {
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

    // Karten-Animation wird von animations.js übernommen
    ScrollTrigger.refresh();
  }
});

// Resize Handler
window.addEventListener('resize', () => {
  ScrollTrigger?.refresh();
});
