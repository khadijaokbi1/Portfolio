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
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.visibility = 'visible';
      } else {
        card.style.display = 'none';
      }
    });
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
    blogCards.forEach(card => {
      const cat = card.dataset.category;
      if (filter === 'all' || cat === filter) {
        card.style.display = 'grid';
        card.classList.add('is-visible');
      } else {
        card.style.display = 'none';
      }
    });
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

  // =========================================
  // Image Carousel Functionality
  // =========================================
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-nav-prev');
  const nextBtn = document.querySelector('.carousel-nav-next');
  const dots = document.querySelectorAll('.carousel-dot');

  if (carouselItems.length > 0) {
    const totalItems = carouselItems.length;
    // Start with middle item or first item if less than 4 items
    let currentIndex = totalItems >= 4 ? Math.floor(totalItems / 2) : 0;

    function updateCarousel() {
      carouselItems.forEach((item, index) => {
        // Remove all position classes
        item.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2');
        
        const position = index - currentIndex;
        
        if (position === 0) {
          item.classList.add('active');
        } else if (position === -1) {
          item.classList.add('left-1');
        } else if (position === -2) {
          item.classList.add('left-2');
        } else if (position === 1) {
          item.classList.add('right-1');
        } else if (position === 2) {
          item.classList.add('right-2');
        }
      });

      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Keyboard navigation - only when carousel is in viewport
    let carouselInView = false;
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        carouselInView = entry.isIntersecting;
      });
    }, { threshold: 0.3 });
    
    if (carouselTrack) {
      carouselObserver.observe(carouselTrack);
    }
    
    document.addEventListener('keydown', (e) => {
      // Only respond to arrow keys when carousel is visible and no input is focused
      if (carouselInView && !document.activeElement.matches('input, textarea, select')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
    });

    // Click on items to navigate
    carouselItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
    });

    // Initialize
    updateCarousel();
  }
});
