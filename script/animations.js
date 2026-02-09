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

// =========================================
// ACCORDION
// =========================================
const initAccordion = () => {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    if (!trigger || !content) return;

    // Initial: Alle Contents auf 0 setzen
    gsap.set(content, { height: 0, opacity: 0 });

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Alle anderen schließen
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector('.accordion-content');
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
          
          gsap.to(otherContent, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        }
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        
        // Measure real height
        gsap.set(content, { height: 'auto', opacity: 0 });
        const fullHeight = content.offsetHeight;
        gsap.set(content, { height: 0, opacity: 0 });
        
        // Animate open
        gsap.to(content, {
          height: fullHeight,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(content, { height: 'auto' });
          }
        });
        
        // Animate content inside
        const items = content.querySelectorAll('.table-cell, .tool-item');
        gsap.from(items, {
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.4,
          delay: 0.2,
          ease: 'power2.out'
        });
        
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        
        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut'
        });
      }
      
      setTimeout(() => ScrollTrigger.refresh(), 700);
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
            }, // <-- Hier endet das scrollTrigger-Objekt

            // Hier kommt onComplete hin:
            onComplete: () => {
                gsap.set(cards, { clearProps: 'transform' });
            }
        }
    );
};
    
    // Nur Hover Effect
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -8, duration: 0.5, ease: 'power1.out' }); // Sanfteres Heben
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, duration: 0.5, ease: 'power1.out' }); // Sanfteres Zurücksetzen
      });
    });
  };
// =========================================
// PARALLAX IMAGES
// =========================================
const initParallaxImages = () => {
  // NUR Parallax für Blog Thumbnails
  const blogThumbs = document.querySelectorAll('.blog-thumb');
  blogThumbs.forEach(thumb => {
    gsap.to(thumb, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: thumb.closest('.blog-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
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
  setTimeout(() => {
    initHeroParallax();
    initAccordion();
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
});