/**
 * About Page Animations
 * Redesigned with GSAP and vanilla JS
 * Preserves all original animations: timeline dropdowns, books 3D flip, MBTI circles, skill bars, album hover
 */

// ===== INIT GSAP & SCROLL SMOOTHER =====
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother;

// Initialize ScrollSmoother if elements exist
if (document.querySelector('#smooth-wrapper')) {
  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.1,
  });
}

// ===== HEADER SCROLL BEHAVIOR =====
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('is-solid');
  } else {
    header.classList.remove('is-solid');
  }
  
  lastScroll = currentScroll;
});

// ===== TIMELINE ANIMATIONS =====
const timelineEvents = document.querySelectorAll('.timeline-event');

// Intersection Observer for timeline events
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, index * 100);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

timelineEvents.forEach(event => {
  timelineObserver.observe(event);
});

// Timeline toggle functionality
document.querySelectorAll('.event-toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const description = this.parentElement.querySelector('.event-description');
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      this.setAttribute('aria-expanded', 'false');
      description.classList.remove('expanded');
    } else {
      this.setAttribute('aria-expanded', 'true');
      description.classList.add('expanded');
    }
  });
});

// ===== MBTI CIRCLES ANIMATION =====
const mbtiItems = document.querySelectorAll('.mbti-item');
const mbtiInfo = document.getElementById('mbtiInfo');

const mbtiInfo = document.getElementById('mbtiInfo');

// MBTI data for info box
const mbtiData = {
  'Introvertiert': {
    title: 'Introvertiert',
    description: 'Ich schöpfe Energie aus der inneren Reflexion und bevorzuge tiefgründige Gespräche in kleinen Gruppen.',
    thinking: 'Ich verarbeite Gedanken intern und brauche Zeit für mich selbst, um kreativ zu sein.',
    similar: 'Bill Gates · Emma Watson'
  },
  'Intuitiv': {
    title: 'Intuitiv',
    description: 'Ich sehe Muster und Zusammenhänge, die anderen verborgen bleiben. Innovation entsteht aus meiner Fähigkeit, über das Offensichtliche hinauszudenken.',
    thinking: 'Ich verlasse mich auf meine Intuition und erkunde abstrakte Konzepte statt nur Fakten.',
    similar: 'Steve Jobs · Carl Jung'
  },
  'Analytisch': {
    title: 'Analytisch',
    description: 'Logik und Objektivität leiten meine Entscheidungen. Ich analysiere komplexe Probleme systematisch und finde rationale Lösungen.',
    thinking: 'Ich hinterfrage alles kritisch und suche nach der effizientesten Lösung.',
    similar: 'Elon Musk · Marie Curie'
  },
  'Kreativ': {
    title: 'Kreativ',
    description: 'Ich sehe Design als Problemlösung. Meine Kreativität ist nicht zufällig, sondern methodisch und strategisch ausgerichtet.',
    thinking: 'Ich kombiniere Logik mit Imagination, um innovative und ästhetisch überzeugende Lösungen zu schaffen.',
    similar: 'Leonardo da Vinci · Frank Lloyd Wright'
  }
};

// Animate MBTI circles on load
if (mbtiItems.length > 0 && mbtiInfo) {
  mbtiItems.forEach((item, index) => {
    const percent = parseInt(item.dataset.percent);
    const circle = item.querySelector('.mbti-circle-progress');
    const circumference = 283;
    const offset = circumference - (percent / 100) * circumference;
    
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 300 + (index * 150));
    
    // Click handler for info update
    item.addEventListener('click', () => {
      const aspect = item.dataset.aspect;
      updateMBTIInfo(aspect);
      
      // Visual feedback
      mbtiItems.forEach(i => i.style.opacity = '0.5');
      item.style.opacity = '1';
    });
    
    item.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        item.click();
      }
    });
  });
}

function updateMBTIInfo(aspect) {
  if (!mbtiInfo) return;
  
  const data = mbtiData[aspect];
  if (!data) return;
  
  const titleEl = mbtiInfo.querySelector('.mbti-info-title');
  const textEl = mbtiInfo.querySelector('.mbti-info-text');
  const descEls = mbtiInfo.querySelectorAll('.mbti-info-desc');
  
  if (titleEl) titleEl.textContent = data.title;
  if (textEl) textEl.textContent = data.description;
  if (descEls[0]) descEls[0].textContent = data.thinking;
  if (descEls[1]) descEls[1].textContent = data.similar;
  
  // Animate update
  gsap.fromTo(mbtiInfo, 
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
}

// ===== SKILL BARS ANIMATION =====
const techSkills = document.querySelectorAll('#techSkills li');
const softSkills = document.querySelectorAll('#softSkills li');

const animateSkillBar = (item) => {
  const percent = parseInt(item.dataset.percent);
  const bar = item.querySelector('.skill-bar');
  
  gsap.to(bar, {
    width: `${percent}%`,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
      once: true
    }
  });
};

techSkills.forEach(item => animateSkillBar(item));
softSkills.forEach(item => animateSkillBar(item));

// ===== BOOKS COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const target = parseInt(counter.dataset.target);
  
  gsap.to(counter, {
    textContent: target,
    duration: 2,
    ease: 'power2.out',
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: counter,
      start: 'top 80%',
      once: true
    }
  });
});

// ===== HERO TEXT ANIMATION =====
gsap.fromTo('.hero-top', 
  { x: '-100%', opacity: 0 },
  { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' }
);

gsap.fromTo('.hero-bottom', 
  { x: '100%', opacity: 0 },
  { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
);

gsap.fromTo('.hero-portrait', 
  { scale: 0.8, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.4)', delay: 0.5 }
);

gsap.fromTo('.hero-portrait-bg', 
  { scale: 0.9, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.4)', delay: 0.3 }
);

// ===== SECTION FADE-IN ANIMATIONS =====
const sections = document.querySelectorAll('.about-section, .timeline-section, .skills-section, .spotify-section, .books-section');

sections.forEach(section => {
  gsap.fromTo(section.children,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true
      }
    }
  );
});

// ===== PORTRAIT PARALLAX =====
if (window.innerWidth > 768) {
  gsap.to('.portrait-image', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.portrait-wrapper',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// ===== BOOKS 3D HOVER ENHANCEMENT =====
const bookItems = document.querySelectorAll('.book-item');

bookItems.forEach(item => {
  const book3d = item.querySelector('.book-3d');
  
  item.addEventListener('mouseenter', () => {
    gsap.to(book3d, {
      rotateY: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  
  item.addEventListener('mouseleave', () => {
    gsap.to(book3d, {
      rotateY: -25,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
});

// ===== SMOOTH SCROLL TO TOP =====
const logoLinks = document.querySelectorAll('.logo');

logoLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    // Only prevent default and smooth scroll if we're staying on the same page
    if (!href || href === '#' || href === 'about.html') {
      e.preventDefault();
      if (smoother) {
        smoother.scrollTo(0, true);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Allow normal navigation for other hrefs (like 'index.html')
  });
});

// ===== RECORD HOVER ENHANCEMENT =====
const recordContainers = document.querySelectorAll('.record-container');

recordContainers.forEach(container => {
  const album = container.querySelector('.record-album');
  const vinyl = container.querySelector('.record-vinyl');
  
  container.addEventListener('mouseenter', () => {
    gsap.to(album, {
      rotation: -8,
      x: -15,
      duration: 0.8,
      ease: 'power2.out'
    });
    gsap.to(vinyl, {
      rotation: 360,
      x: 30,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
  
  container.addEventListener('mouseleave', () => {
    gsap.to(album, {
      rotation: 0,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
    gsap.to(vinyl, {
      rotation: 0,
      x: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  gsap.to(document.body, {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  });
});

console.log('🎨 About page animations initialized');
