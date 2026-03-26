document.addEventListener('DOMContentLoaded', function() {

  // ══════════════════════════════════════════
  // ACCORDION FUNCTIONALITY
  // ══════════════════════════════════════════
  const accordionItems = document.querySelectorAll('.oa-item');
  
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.oa-trigger');
    trigger.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all
      accordionItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ══════════════════════════════════════════
  // TABS FUNCTIONALITY
  // ══════════════════════════════════════════
  const stratButtons = document.querySelectorAll('.strat-btn');
  const stratPanels = document.querySelectorAll('.strat-panel');
  const stratSelect = document.getElementById('stratSelect');
  
  function showPanel(tabId) {
    stratPanels.forEach(panel => panel.classList.remove('active'));
    stratButtons.forEach(btn => btn.classList.remove('active'));
    
    const panel = document.getElementById(tabId);
    if (panel) {
      panel.classList.add('active');
    }
    
    const btn = document.querySelector(`[data-tab="${tabId}"]`);
    if (btn) {
      btn.classList.add('active');
    }
  }
  
  stratButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      showPanel(tabId);
    });
  });
  
  if (stratSelect) {
    stratSelect.addEventListener('change', function() {
      showPanel(this.value);
    });
  }

  // ══════════════════════════════════════════
  // INSTAGRAM CAROUSEL
  // ══════════════════════════════════════════
  const icRail = document.getElementById('icRail');
  const icPrev = document.getElementById('icPrev');
  const icNext = document.getElementById('icNext');
  const icDots = document.getElementById('icDots');
  const instaCards = document.querySelectorAll('.insta-post-card');
  
  let currentInstaIndex = 0;
  
  function updateInstaCarousel() {
    if (icRail) {
      icRail.style.transform = `translateX(-${currentInstaIndex * 100}%)`;
    }
    updateInstaDots();
  }
  
  function updateInstaDots() {
    if (icDots) {
      icDots.innerHTML = '';
      for (let i = 0; i < instaCards.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('ic-dot');
        if (i === currentInstaIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentInstaIndex = i;
          updateInstaCarousel();
        });
        icDots.appendChild(dot);
      }
    }
  }
  
  if (icPrev) {
    icPrev.addEventListener('click', () => {
      currentInstaIndex = (currentInstaIndex - 1 + instaCards.length) % instaCards.length;
      updateInstaCarousel();
    });
  }
  
  if (icNext) {
    icNext.addEventListener('click', () => {
      currentInstaIndex = (currentInstaIndex + 1) % instaCards.length;
      updateInstaCarousel();
    });
  }
  
  updateInstaDots();

  // ══════════════════════════════════════════
  // LINKEDIN SLIDER
  // ══════════════════════════════════════════
  const liSlider = document.getElementById('liSlider');
  const liPrev = document.getElementById('liPrev');
  const liNext = document.getElementById('liNext');
  const liDots = document.getElementById('liDots');
  const liCurrent = document.getElementById('liCurrent');
  const liSlides = document.querySelectorAll('.li-slide');
  
  let currentLiIndex = 0;
  
  function updateLiSlider() {
    if (liSlider) {
      liSlider.style.transform = `translateX(-${currentLiIndex * 100}%)`;
    }
    updateLiDots();
    if (liCurrent) {
      liCurrent.textContent = currentLiIndex + 1;
    }
  }
  
  function updateLiDots() {
    if (liDots) {
      liDots.innerHTML = '';
      for (let i = 0; i < liSlides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('li-dot');
        if (i === currentLiIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentLiIndex = i;
          updateLiSlider();
        });
        liDots.appendChild(dot);
      }
    }
  }
  
  if (liPrev) {
    liPrev.addEventListener('click', () => {
      currentLiIndex = (currentLiIndex - 1 + liSlides.length) % liSlides.length;
      updateLiSlider();
    });
  }
  
  if (liNext) {
    liNext.addEventListener('click', () => {
      currentLiIndex = (currentLiIndex + 1) % liSlides.length;
      updateLiSlider();
    });
  }
  
  updateLiDots();

  // ══════════════════════════════════════════
  // INPAGE NAV SMOOTH SCROLL & ACTIVE STATE
  // ══════════════════════════════════════════
  const inpageLinks = document.querySelectorAll('.inpage-link');
  
  inpageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      const element = document.querySelector(target);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('.k-section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    inpageLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === current) {
        link.classList.add('active');
      }
    });
  });

  // ══════════════════════════════════════════
  // HEADER SCROLL STATE
  // ══════════════════════════════════════════
  const header = document.getElementById('siteHeader');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('is-solid');
    } else {
      header?.classList.remove('is-solid');
    }
  });

  console.log('✓ Komthur.js loaded successfully');
});