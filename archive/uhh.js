// =========================================
// about.js
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const mbtiItems = document.querySelectorAll('.mbti-item');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const listItem = entry.target;
          const svgElement = listItem.querySelector('.mbti-svg');
          const progressCircle = listItem.querySelector('.mbti-progress');
  
          if (progressCircle && svgElement) {
            const percent = parseFloat(listItem.dataset.percent);
            const radius = parseFloat(progressCircle.getAttribute('r'));
            const circumference = 2 * Math.PI * radius;
            const offset = circumference * (1 - (percent / 100));
  
            // 1. Set up progress bar (stroke-dasharray/offset)
            progressCircle.style.strokeDasharray = circumference.toFixed(3);
            // Initially hide the bar for animation
            progressCircle.style.strokeDashoffset = circumference.toFixed(3);
  
            // 2. Animate when in view
            setTimeout(() => {
              progressCircle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)';
              progressCircle.style.strokeDashoffset = offset.toFixed(3);
            }, 100); // Small delay to ensure transition applies
  
            // 3. Add and style percentage text
            let percentText = svgElement.querySelector('.mbti-percent-text');
  
            // Ensure text element is inside SVG and has correct class
            if (!percentText) {
              percentText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              percentText.classList.add('mbti-percent-text');
              svgElement.appendChild(percentText);
            }
  
            percentText.setAttribute('x', '50%');
            percentText.setAttribute('y', '50%');
            percentText.setAttribute('dominant-baseline', 'middle');
            percentText.setAttribute('text-anchor', 'middle');
            percentText.setAttribute('fill', 'white');
            percentText.setAttribute('font-size', '18');
            percentText.setAttribute('text-rendering', 'optimizeLegibility');
            percentText.style.visibility = 'visible';
            percentText.style.opacity = '1';
            percentText.textContent = `${percent}%`;
          }
  
          observer.unobserve(listItem); // Stop observing once animated
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% of the item is visible
  
    mbtiItems.forEach(item => {
      observer.observe(item);
    });
  });
   // Counter Animation
   class CounterAnimator {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.current = 0;
        this.startTime = null;
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const progress = Math.min((timestamp - this.startTime) / this.duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 2);
        this.current = Math.floor(this.target * easeOut);
        this.element.textContent = this.current;

        if (progress < 1) {
            requestAnimationFrame((ts) => this.animate(ts));
        } else {
            this.element.textContent = this.target;
        }
    }

    start() {
        requestAnimationFrame((ts) => this.animate(ts));
    }
}

// Initialize on scroll
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const animator = new CounterAnimator(counter, counter.dataset.target, 2000);
                animator.start();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
});

console.log('3D Books 2025 loaded!');

        // Intersection Observer für Sektion-Einblendung
        const observerOptions = {
          threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('visible');
                  
                  // Starte Skill-Animation wenn Sektion sichtbar
                  if (entry.target.classList.contains('section-skills')) {
                      animateSkills();
                  }
              }
          });
      }, observerOptions);

      document.querySelectorAll('section').forEach(section => {
          observer.observe(section);
      });

      // Skill Bars Animation
      function animateSkills() {
          const bars = document.querySelectorAll('.skill-bar-fill');
          bars.forEach(bar => {
              const width = bar.getAttribute('data-width');
              bar.style.width = width;
          });
      }

      // Timeline Accordion Logic
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach(item => {
          const trigger = item.querySelector('.timeline-trigger');
          trigger.addEventListener('click', () => {
              const isActive = item.classList.contains('active');
              
              // Schließe alle anderen
              timelineItems.forEach(i => i.classList.remove('active'));
              
              // Öffne das geklickte, falls es nicht schon offen war
              if (!isActive) {
                  item.classList.add('active');
              }
          });
      });
/* =========================================
   KHADIJA OKBI - ABOUT PAGE 
   Alle Animationen & Interaktionen in EINER Datei
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    console.log('🚀 About Page Loading...');

    // =========================================
    // INTERSECTION OBSERVER - Für alle Scroll-Animationen
    // =========================================
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Spezifische Animationen basierend auf Element-Typ
                if (entry.target.classList.contains('skill-card')) {
                    animateSkillCard(entry.target);
                }
                
                if (entry.target.classList.contains('record-item')) {
                    entry.target.classList.add('in-view');
                }
                
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                
                // Einmalige Animation - nicht wieder beobachten
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // =========================================
    // 1. NEUE SKILLS CARDS ANIMATIONEN
    // =========================================
    
    function animateSkillCard(card) {
        // Animiere Skill Progress Bars
        const skillItems = card.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            const percent = item.getAttribute('data-percent');
            const progress = item.querySelector('.skill-progress');
            
            if (progress && percent) {
                setTimeout(() => {
                    progress.style.width = `${percent}%`;
                }, index * 100);
            }
        });

        // Animiere MBTI Circles
        const traitItems = card.querySelectorAll('.trait-item');
        traitItems.forEach((trait, index) => {
            const percent = trait.getAttribute('data-percent');
            const circle = trait.querySelector('.circle-progress');
            
            if (circle && percent) {
                setTimeout(() => {
                    const radius = 45;
                    const circumference = 2 * Math.PI * radius;
                    const offset = circumference - (circumference * percent / 100);
                    
                    circle.style.strokeDashoffset = offset;
                }, index * 150);
            }
        });
    }

    // Observe alle neuen Skill Cards
    document.querySelectorAll('.skill-card').forEach(card => {
        scrollObserver.observe(card);
    });

    // =========================================
    // 2. COUNTER ANIMATION (für Books Section)
    // =========================================
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 2);
            const current = Math.floor(target * easeOut);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    // Observe alle Counter
    document.querySelectorAll('.counter').forEach(counter => {
        scrollObserver.observe(counter);
    });

    // =========================================
    // 3. RECORD ITEMS (Vinyl Animation)
    // =========================================
    
    document.querySelectorAll('.record-item').forEach(item => {
        scrollObserver.observe(item);
    });

    // =========================================
    // 4. PARALLAX HERO EFFECT
    // =========================================
    
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.5;
                    parallaxBg.style.transform = `translateY(${rate}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // =========================================
    // 5. TIMELINE TOGGLE (Event Beschreibungen)
    // =========================================
    
    const eventToggles = document.querySelectorAll('.event-toggle');
    
    eventToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const card = this.closest('.event-card');
            const description = card.querySelector('.event-description');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle aktuelles Element
            this.setAttribute('aria-expanded', !isExpanded);
            
            if (description) {
                if (!isExpanded) {
                    description.style.maxHeight = description.scrollHeight + 'px';
                    description.style.opacity = '1';
                } else {
                    description.style.maxHeight = '0';
                    description.style.opacity = '0';
                }
            }
        });
        
        // Keyboard Support
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
    });

    // =========================================
    // 6. SMOOTH SCROLL für Anchor Links
    // =========================================
    
    function animateSkillBar(skillItem) {
      const percent = skillItem.getAttribute('data-percent');
      const fill = skillItem.querySelector('.skill-fill');
      
      if (fill && percent) {
          // Add animated class
          skillItem.classList.add('animated');
          
          // Animate width with delay
          setTimeout(() => {
              fill.style.width = `${percent}%`;
          }, 100);
      }
  }
  
  // Observe skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach((item, index) => {
      // Stagger animation delays
      item.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(item);
  });
  
  
  // =========================================
  // 5. MBTI TRAIT CIRCLE ANIMATIONS
  // =========================================
  
  function animateTraitCircle(traitItem) {
      const percent = parseInt(traitItem.getAttribute('data-percent'));
      const circle = traitItem.querySelector('.trait-progress');
      
      if (circle && percent) {
          // Add animated class
          traitItem.classList.add('animated');
          
          // Calculate stroke-dashoffset
          const radius = 54; // From SVG circle r="54"
          const circumference = 2 * Math.PI * radius; // ≈ 339.292
          const offset = circumference * (1 - percent / 100);
          
          // Set CSS variable for animation
          traitItem.style.setProperty('--percent', percent);
          
          // Animate with delay
          setTimeout(() => {
              circle.style.strokeDashoffset = offset;
          }, 200);
      }
  }
  
  // Observe trait items
  const traitItems = document.querySelectorAll('.trait-item');
  traitItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(item);
  });
  
  
  // =========================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =========================================
    // 7. TIMELINE EVENTS Animation
    // =========================================
    
    document.querySelectorAll('.timeline-event').forEach((event, index) => {
        event.style.transitionDelay = `${index * 0.1}s`;
        scrollObserver.observe(event);
    });

    // =========================================
    // 8. SECTION TITLES Animation
    // =========================================
    
    document.querySelectorAll('.section-title').forEach(title => {
        scrollObserver.observe(title);
    });

    // =========================================
    // 9. INTRO IMAGE Hover Effect
    // =========================================
    
    const introImage = document.querySelector('.intro-image');
    
    if (introImage) {
        introImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        introImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // =========================================
    // 10. RESPONSIVE HANDLING
    // =========================================
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate any necessary layout
            console.log('Window resized');
        }, 250);
    });

    // =========================================
    // 11. IMAGE LAZY LOADING
    // =========================================
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // =========================================
    // INITIALIZATION COMPLETE
    // =========================================
    
    const observedElements = document.querySelectorAll('[data-scroll]').length;
    const skillCards = document.querySelectorAll('.skill-card').length;
    const timelineEvents = document.querySelectorAll('.timeline-event').length;
    
    console.log('✨ About page initialized!');
    console.log(`📊 Observing ${observedElements} scroll elements`);
    console.log(`🎯 ${skillCards} skill cards loaded`);
    console.log(`⚡ ${timelineEvents} timeline events`);
    
});
// Counter Animation
class CounterAnimator {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.current = 0;
        this.startTime = null;
    }

    animate(timestamp) {
        if (!this.startTime) this.startTime = timestamp;
        const progress = Math.min((timestamp - this.startTime) / this.duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 2);
        this.current = Math.floor(this.target * easeOut);
        this.element.textContent = this.current;

        if (progress < 1) {
            requestAnimationFrame((ts) => this.animate(ts));
        } else {
            this.element.textContent = this.target;
        }
    }

    start() {
        requestAnimationFrame((ts) => this.animate(ts));
    }
}

// Initialize on scroll
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const animator = new CounterAnimator(counter, counter.dataset.target, 2000);
                animator.start();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
});

console.log('3D Books 2025 loaded!');

'use strict';
// =========================================
// Main.js
// =========================================
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
// =========================================
// animations.js
// =========================================
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