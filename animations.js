// =========================================
// GSAP ANIMATIONS - AWWWARDS STYLE
// =========================================

gsap.registerPlugin(ScrollTrigger);

// =========================================
// Smooth Scroll Setup
// =========================================
const initSmoothScroll = () => {
  const html = document.documentElement;
  const body = document.body;
  
  let scrollTop = 0;
  let newScrollTop = 0;
  const damping = 0.1;
  
  const smoothScroll = () => {
    scrollTop += (newScrollTop - scrollTop) * damping;
    body.style.transform = `translateY(-${scrollTop}px)`;
    requestAnimationFrame(smoothScroll);
  };
  
  window.addEventListener('scroll', () => {
    newScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  });
  
  smoothScroll();
};

// =========================================
// Hero Section Parallax
// =========================================
const initHeroParallax = () => {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;
  
  gsap.to('.hero-section .top-line', {
    y: 100,
    opacity: 0.5,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-section .middle-line', {
    y: 150,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-section .bottom-line', {
    y: 200,
    opacity: 0.2,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-section .portrait-bild', {
    y: -100,
    scale: 0.9,
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
  
  gsap.to('.hero-section .portrait-bg', {
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
// Section Title Animations - Editorial Style
// =========================================
const initSectionTitles = () => {
  const titles = document.querySelectorAll('.section-title-editorial');
  
  titles.forEach((title) => {
    // Split text into chars for animation
    const text = title.textContent;
    title.innerHTML = '';
    
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      return span;
    });
    
    chars.forEach(char => title.appendChild(char));
    
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      rotation: 10,
      stagger: 0.02,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
};

// =========================================
// Project Cards - Staggered Reveal
// =========================================
const initProjectCards = () => {
  const cards = document.querySelectorAll('.project-card');
  
  // Stelle sicher dass alle Karten sichtbar sind
  cards.forEach(card => {
    card.style.opacity = '1';
    card.style.visibility = 'visible';
  });
  
  gsap.from(cards, {
    y: 60,
    opacity: 0,
    stagger: {
      each: 0.05,
      from: 'start'
    },
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  // Enhanced Hover-Effekt mit GSAP
  cards.forEach(card => {
    const media = card.querySelector('.project-media');
    const info = card.querySelector('.project-info');
    
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -15,
        scale: 1.03,
        duration: 0.5,
        ease: 'power2.out',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)'
      });
      
      gsap.to(media, {
        scale: 1.15,
        rotation: 2,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(info, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.5)'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      });
      
      gsap.to(media, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
      
      gsap.to(info, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      });
    });
  });
};

// =========================================
// Resume Section - Slide In Animation
// =========================================
const initResumeAnimation = () => {
  const resume = document.querySelector('.resume');
  if (!resume) return;
  
  gsap.from('.resume .base', {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.resume',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.resume .func', {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.resume',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
  
  // Skills bars animation
  const skillBars = document.querySelectorAll('.skills-bar .bar');
  skillBars.forEach(bar => {
    const percent = bar.parentElement.parentElement.dataset.percent;
    gsap.to(bar, {
      width: `${percent}%`,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bar,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Circle skills animation
  const circleSkills = document.querySelectorAll('.skills-soft li');
  circleSkills.forEach(skill => {
    const percent = skill.dataset.percent;
    const circle = skill.querySelector('.cbar');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    gsap.to(circle, {
      strokeDashoffset: offset,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: skill,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
};

// =========================================
// Blog Cards - Wave Animation
// =========================================
const initBlogCards = () => {
  const blogCards = document.querySelectorAll('.blog-card');
  
  gsap.from(blogCards, {
    y: 100,
    opacity: 0,
    rotation: 5,
    stagger: {
      each: 0.15,
      from: 'start'
    },
    duration: 1,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: '.blog-grid',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });
};

// =========================================
// Parallax Images
// =========================================
const initParallaxImages = () => {
  // Deaktiviert - verursacht Probleme mit Sichtbarkeit
  // const images = document.querySelectorAll('.project-media, .blog-thumb, .portrait-bild, .portrait-bg');
  
  // images.forEach(img => {
  //   gsap.to(img, {
  //     yPercent: -20,
  //     ease: 'none',
  //     scrollTrigger: {
  //       trigger: img.closest('.project-card, .blog-card, .hero-section'),
  //       start: 'top bottom',
  //       end: 'bottom top',
  //       scrub: 1
  //     }
  //   });
  // });
};

// =========================================
// Horizontal Scroll Section (Optional)
// =========================================
const initHorizontalScroll = () => {
  const section = document.querySelector('.section-strip');
  if (!section) return;
  
  const track = section.querySelector('.strip-track');
  
  gsap.to(track, {
    x: () => -(track.scrollWidth - section.offsetWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${track.scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1
    }
  });
};

// =========================================
// Cursor Follow Effect
// =========================================
const initCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    gsap.to(cursor, {
      x: mouseX,
      y: mouseY,
      duration: 0.1
    });
  });
  
  const updateFollower = () => {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(updateFollower);
  };
  updateFollower();
  
  // Hover effects
  const interactives = document.querySelectorAll('a, button, .project-card');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    });
  });
};

// =========================================
// Initialize All Animations
// =========================================
window.addEventListener('DOMContentLoaded', () => {
  // Give page time to load
  setTimeout(() => {
    initHeroParallax();
    initSectionTitles();
    initProjectCards();
    initResumeAnimation();
    initBlogCards();
    initParallaxImages();
    // initHorizontalScroll(); // Optional
    // initCustomCursor(); // Optional
    
    // Refresh ScrollTrigger after everything is loaded
    ScrollTrigger.refresh();
  }, 100);
});

// =========================================
// Resize Handler
// =========================================
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});
