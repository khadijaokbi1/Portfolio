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
  const updateHeader = () => {
    header?.classList.toggle('is-solid', window.scrollY > 100);
  };

  window.addEventListener('scroll', updateHeader);
  updateHeader();

  // Mobile Menu Toggle
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('mobileMenu')?.classList.toggle('open');
  });

  // Note: All other animations and interactions (Accordion, Project Filter, 
  // Blog Filter, Blog Modals, Skill Bars, Card animations) are handled 
  // by animations.js with GSAP for smooth animations
});

// Resize Handler
window.addEventListener('resize', () => {
  ScrollTrigger?.refresh();
});
