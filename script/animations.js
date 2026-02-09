'use strict';

gsap.registerPlugin(ScrollTrigger);

// =========================================
// HERO PARALLAX
// =========================================
const initHeroParallax = () => {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  
  gsap.to('.hero-top', {
    y: 100,
    opacity: 0.5,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-bottom', {
    y: 150,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-portrait', {
    y: -100,
    scale: 0.9,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-portrait-bg', {
    y: -150,
    scale: 0.85,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
};

// =========================================
// ACCORDION (Skills Section)
// =========================================
const initAccordion = () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const active = item.classList.contains('active');
      
      accordionItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });

      if (!active) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
      
      setTimeout(() => ScrollTrigger.refresh(), 400);
    });
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
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? 'block' : 'none';
      });

      ScrollTrigger.refresh();
    });
  });
};

// =========================================
// PROJECT CARDS ANIMATION
// =========================================
const initProjectCards = () => {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  // Hover Effect
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -10, duration: 0.4, ease: 'power2.out' });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' });
    });
  });
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
  setTimeout(() => {
    initHeroParallax();
    initAccordion();
    initProjectFilter();
    initProjectCards();
    initBlogFilter();
    initBlogModals();
    initSkillBars();
    initCarousel();
    initAlbumCovers();
    
    ScrollTrigger.refresh();
  }, 100);
});