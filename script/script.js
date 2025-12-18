// =========================================
// Smooth scrolling for anchors
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 64; // header height
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // close mobile menu
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    }
  });
});

// =========================================
// Sticky header on scroll
// =========================================
const header = document.querySelector('.site-header');
const toggleHeader = () => {
  if (header) {
    if (window.scrollY > 100) header.classList.add('is-solid');
    else header.classList.remove('is-solid');
  }
};
window.addEventListener('scroll', toggleHeader);
window.addEventListener('load', toggleHeader);

// =========================================
// Mobile menu toggle
// =========================================
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}

// =========================================
// IntersectionObserver for reveal animations
// =========================================
const reveals = document.querySelectorAll('.section-hero, .about-card, .cluster, .project-card, .blog-card, .contact-form, .contact-info, .timeline, .resume');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => io.observe(el));

// =========================================
// Projects filter
// =========================================
const projectFilterButtons = document.querySelectorAll('.section-projects .filter-btn');
const projectCards = document.querySelectorAll('#projectsGrid .project-card');

// Zeige alle Projekte beim Laden
projectCards.forEach(card => {
  card.style.display = 'block';
  card.style.opacity = '1';
  card.style.visibility = 'visible';
});

projectFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    projectFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    // Animate cards out first
    const hideCards = [];
    const showCards = [];
    
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        showCards.push(card);
      } else {
        hideCards.push(card);
      }
    });
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'block';
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog filter
// =========================================
const blogFilterButtons = document.querySelectorAll('.section-blog .filter-btn');
const blogCards = document.querySelectorAll('#blogGrid .blog-card');

blogFilterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    blogFilterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    
    // Animate blog cards
    const hideCards = [];
    const showCards = [];
    
    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        showCards.push(card);
      } else {
        hideCards.push(card);
      }
    });
    
    // Hide cards - Clean & Fast
    if (hideCards.length > 0) {
      gsap.to(hideCards, {
        opacity: 0,
        scale: 0.85,
        y: -30,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power3.in',
        onComplete: () => {
          hideCards.forEach(card => {
            card.style.display = 'none';
          });
        }
      });
    }
    
    // Show cards - Clean & Powerful
    if (showCards.length > 0) {
      showCards.forEach(card => {
        card.style.display = 'grid';
        card.classList.add('is-visible');
      });
      
      gsap.fromTo(showCards, 
        {
          opacity: 0,
          scale: 0.85,
          y: 40
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power3.out',
          delay: 0.25
        }
      );
    }
  });
});

// =========================================
// Blog modals (Read More)
// =========================================
const modals = document.querySelectorAll('.modal');
const openModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
};
const closeModal = (modal) => modal.classList.remove('open');

document.querySelectorAll('.read-more').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.target));
});
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
      closeModal(modal);
    }
  });
});

// =========================================
// Contact Form Handler
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formNote = document.getElementById('formNote');
    if (formNote) {
      formNote.textContent = 'Nachricht wird gesendet...';
      formNote.style.color = 'green';
      setTimeout(() => {
        formNote.textContent = 'Vielen Dank! Deine Nachricht wurde gesendet.';
        contactForm.reset();
      }, 1500);
    }
  });
}

// =========================================
// Resume Section - Skills Animation
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // PARALLAX EFFECT ON HERO SECTION
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax on Hero Background Image
    gsap.to('.hero-bg-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Parallax on Hero Portrait
    gsap.to('.hero-portrait', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: true
      }
    });
  }

  // 1. Linear Skill Bars (Technical Skills)
  const skillBars = document.querySelectorAll('.resume .skills-prog .bar');
  skillBars.forEach((bar, i) => {
    const li = bar.closest('li');
    if (li) {
      const percent = li.getAttribute('data-percent') || 0;
      const delay = i * 150;
      
      setTimeout(() => {
        bar.style.transition = 'width 1s cubic-bezier(0.19, 1, 0.22, 1)';
        bar.style.width = percent + '%';
      }, delay);
    }
  });

  // 2. Circular Skill Bars (Soft/Adobe Skills)
  const circleBars = document.querySelectorAll('.resume .skills-soft li');
  circleBars.forEach((li, i) => {
      const percent = li.getAttribute('data-percent') || 0;
      const cbar = li.querySelector('.cbar');
      const small = li.querySelector('small');
      const delay = i * 150;

      if (cbar) {
          // Radius is 45 (from HTML), Circumference = 2 * PI * 45 ≈ 282.74
          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          
          // Set initial dasharray
          cbar.style.strokeDasharray = circumference;
          cbar.style.strokeDashoffset = circumference;

          setTimeout(() => {
              const offset = circumference - (percent / 100) * circumference;
              cbar.style.strokeDashoffset = offset;
          }, delay);
      }

      if (small) {
          // Count up animation for text
          setTimeout(() => {
            small.textContent = percent + '%';
            small.style.opacity = 1;
          }, delay);
      }
  });

  // Hover-Effekte auf Resume Funktions-Blöcke
  const funcSections = document.querySelectorAll('.resume .func > div');
  funcSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '1.6px';
      if (icon) icon.style.transform = 'scale(1.2)';
    });

    section.addEventListener('mouseleave', () => {
      const h3 = section.querySelector('h3');
      const icon = section.querySelector('h3 i');
      if (h3) h3.style.letterSpacing = '0.65px';
      if (icon) icon.style.transform = 'scale(1)';
    });
  });
});
