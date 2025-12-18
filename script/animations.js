// =========================================
// GSAP ANIMATIONS - AWWWARDS STYLE
// =========================================

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// =========================================
// ScrollSmoother Setup
// =========================================
let smoother;

const initScrollSmoother = () => {
  // Create ScrollSmoother instance
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.1
  });

  // Split text animation for hero titles
  const heroTitles = document.querySelectorAll('.hero-top, .hero-bottom');
  heroTitles.forEach((title) => {
    const text = new SplitType(title, { types: 'chars' });
    const chars = text.chars;
    
    chars.forEach((char, i) => {
      smoother.effects(char, { 
        speed: 1, 
        lag: (i + 1) * 0.05 
      });
    });
  });

  // Add parallax effects to images
  const parallaxImages = document.querySelectorAll('.hero-portrait, .about-image-wrapper img, .project-card img');
  parallaxImages.forEach((img) => {
    smoother.effects(img, { 
      speed: 0.8,
      lag: 0.1
    });
  });
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
  
  // Einfacher Hover-Effekt ohne komplexe 3D-Transformationen
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
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
// Parallax Images - Enhanced
// =========================================
const initParallaxImages = () => {
  // Parallax for project cards
  const projectMedia = document.querySelectorAll('.project-card .project-media');
  projectMedia.forEach(media => {
    gsap.to(media, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: media.closest('.project-card'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });
  });

  // Parallax for blog thumbnails
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
// Editorial Grid Animations - Favorites Section
// =========================================
const initEditorialGrid = () => {
  const gridItems = document.querySelectorAll('.editorial-grid .grid-item');
  if (gridItems.length > 0) {
    gsap.from(gridItems, {
      y: 80,
      opacity: 0,
      stagger: {
        amount: 0.6,
        from: 'start'
      },
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.editorial-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }
};

// =========================================
// Spotify Wrapped Animation
// =========================================
const initWrappedAnimation = () => {
  const wrappedItems = document.querySelectorAll('.wrapped-item');
  if (wrappedItems.length > 0) {
    gsap.from(wrappedItems, {
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.wrapped-grid',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }
};

// =========================================
// Album Cover Hover Enhancement
// =========================================
const initAlbumCovers = () => {
  const recordContainers = document.querySelectorAll('.record-container');
  recordContainers.forEach(container => {
    const tl = gsap.timeline({ paused: true });
    const album = container.querySelector('.album');
    const record = container.querySelector('.record');
    
    tl.to(album, {
      x: -15,
      rotation: -5,
      duration: 0.5,
      ease: 'power2.out'
    }, 0);
    
    tl.to(record, {
      x: 30,
      rotation: 360,
      duration: 0.75,
      ease: 'power2.out'
    }, 0);
    
    container.addEventListener('mouseenter', () => tl.play());
    container.addEventListener('mouseleave', () => tl.reverse());
  });
};

// =========================================
// Initialize All Animations
// =========================================
window.addEventListener('DOMContentLoaded', () => {
  // ScrollSmoother deaktiviert
  // initScrollSmoother();
  
  // Give page time to load
  setTimeout(() => {
    initHeroParallax();
    initSectionTitles();
    initProjectCards();
    initResumeAnimation();
    initBlogCards();
    initParallaxImages();
    initEditorialGrid();
    initWrappedAnimation();
    initAlbumCovers();
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
