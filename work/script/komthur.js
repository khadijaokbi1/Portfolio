// ========================================
// INPAGE NAVIGATION
// ========================================
function initInpageNav() {
    const nav = document.querySelector('.inpage-nav');
    const links = document.querySelectorAll('.inpage-nav-link');
    const sections = document.querySelectorAll('[id*="section-"]');
  
    if (!nav) return;
  
    function updateActive() {
      const scrollPos = window.scrollY + 200;
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
  
        links.forEach((link) => {
          if (link.getAttribute('href') === `#${section.id}`) {
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          }
        });
      });
    }
  
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  
    // Show nav after hero
    const hero = document.querySelector('.section-hero');
    if (hero) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            nav.classList.add('is-visible');
          } else {
            nav.classList.remove('is-visible');
          }
        });
      });
      observer.observe(hero);
    }
  }
  // ════════════════════════════════════════════
// INSTAGRAM STORY SHOWCASE - Animation & Like
// ════════════════════════════════════════════

(function initStoryShowcase() {
  const progressBar = document.getElementById('storyProgressBar');
  const likeBtn = document.getElementById('storyLikeBtn');
  
  if (!progressBar) return;

  let isLiked = false;

  // Progress animation
  function startProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.5;
      if (progress >= 100) {
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 40);
  }

  // Like button
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      likeBtn.classList.toggle('liked', isLiked);
      
      if (isLiked) {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    });
  }

  // Start on visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startProgress();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector('.sea-phone-wrap'));
})();// ════════════════════════════════════════════
// INSTAGRAM STORY SHOWCASE - Animation & Like
// ════════════════════════════════════════════

(function initStoryShowcase() {
  const progressBar = document.getElementById('storyProgressBar');
  const likeBtn = document.getElementById('storyLikeBtn');
  
  if (!progressBar) return;

  let isLiked = false;

  // Progress animation
  function startProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.5;
      if (progress >= 100) {
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 40);
  }

  // Like button
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      likeBtn.classList.toggle('liked', isLiked);
      
      if (isLiked) {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    });
  }

  // Start on visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startProgress();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector('.sea-phone-wrap'));
})(); // ════════════════════════════════════════════
// INSTAGRAM STORY SHOWCASE - Animation & Like
// ════════════════════════════════════════════

(function initStoryShowcase() {
  const progressBar = document.getElementById('storyProgressBar');
  const likeBtn = document.getElementById('storyLikeBtn');
  
  if (!progressBar) return;

  let isLiked = false;

  // Progress animation
  function startProgress() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.5;
      if (progress >= 100) {
        clearInterval(interval);
      }
      progressBar.style.width = progress + '%';
    }, 40);
  }

  // Like button
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      likeBtn.classList.toggle('liked', isLiked);
      
      if (isLiked) {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    });
  }

  // Start on visibility
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startProgress();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.querySelector('.sea-phone-wrap'));
})(); 
// ════════════════════════════════════════════
// INSTAGRAM CAROUSEL - Dynamic Caption Switcher
// ════════════════════════════════════════════

(function initInstaCarousel() {
  const rail = document.getElementById('instaRail');
  const prevBtn = document.getElementById('icPrev');
  const nextBtn = document.getElementById('icNext');
  const badge = document.getElementById('instaBadge');
  const postCardContainer = document.getElementById('instaPostCard');

  if (!rail) return;

  // 10 Instagram Posts mit unterschiedlichen Daten
  const instaPosts = [
    {
      id: 0,
      image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
      caption: '✦ Design Dienstag #01 — Kreativität kennt keine Zeit. 🎨',
      likes: 428,
      timestamp: 'vor 3 Tagen'
    },
    {
      id: 1,
      image: '../assets/images/komthur/showcase_komthur_insta_2.jpg',
      caption: '💧 Progress fliesst — wie gutes Design. #DesignThinking',
      likes: 391,
      timestamp: 'vor 1 Woche'
    },
    {
      id: 2,
      image: '../assets/images/komthur/showcase_komthur_insta_3.jpg',
      caption: '🚀 Unsere neue Website ist jetzt online! Modern, schnell & mit Herz. #JetztOnline',
      likes: 487,
      timestamp: 'vor 2 Wochen'
    },
    {
      id: 3,
      image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
      caption: '✦ Design Dienstag #04 — Farben erzählen Geschichten. 🌈',
      likes: 356,
      timestamp: 'vor 3 Wochen'
    },
    {
      id: 4,
      image: '../assets/images/komthur/showcase_komthur_insta_2.jpg',
      caption: '🎯 Zielgerichtetes Design für maximale Wirkung. Unsere Philosophie.',
      likes: 412,
      timestamp: 'vor 4 Wochen'
    },
    {
      id: 5,
      image: '../assets/images/komthur/showcase_komthur_insta_3.jpg',
      caption: '✏️ Design Dienstag #06 — Minimalismus ist nicht weniger, sondern mehr. #Minimalism',
      likes: 445,
      timestamp: 'vor 5 Wochen'
    },
    {
      id: 6,
      image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
      caption: '💡 Inspiration der Woche: Typographie. Die Kunst der Schrift. 🖋️',
      likes: 378,
      timestamp: 'vor 6 Wochen'
    },
    {
      id: 7,
      image: '../assets/images/komthur/showcase_komthur_insta_2.jpg',
      caption: '🌟 Design Dienstag #08 — User Experience ist unser Fokus. #UX #Design',
      likes: 502,
      timestamp: 'vor 7 Wochen'
    },
    {
      id: 8,
      image: '../assets/images/komthur/showcase_komthur_insta_3.jpg',
      caption: '🎨 Neue Projekte, neue Perspektiven. Swipe für mehr! #Portfolio',
      likes: 421,
      timestamp: 'vor 8 Wochen'
    },
    {
      id: 9,
      image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
      caption: '✦ Design Dienstag #10 — Konsistenz ist der Schlüssel zu guter Markenidentität. #Branding',
      likes: 534,
      timestamp: 'vor 9 Wochen'
    }
  ];

  let currentSlide = 0;
  let isLiked = false;
  let isSaved = false;

  // Slides einfügen
  instaPosts.forEach((post) => {
    const slide = document.createElement('div');
    slide.className = 'ic-slide';
    slide.innerHTML = `<img src="${post.image}" alt="Post ${post.id + 1}" loading="lazy">`;
    slide.addEventListener('dblclick', () => likePost());
    rail.appendChild(slide);
  });

  // Post Card rendern
  function renderPostCard() {
    const post = instaPosts[currentSlide];
    isLiked = false;
    isSaved = false;

    postCardContainer.innerHTML = `
     
          ${instaPosts.map((_, i) => 
            `<div class="insta-dot ${i === currentSlide ? 'active' : ''}" onclick="window.instaCarouselInstance.goToSlide(${i})"></div>`
          ).join('')}
        </div>

        <button class="insta-action-btn" id="instaSaveBtn">
          <i class="fa-regular fa-bookmark"></i>
        </button>
      </div>

      <!-- Likes -->
      <div class="insta-likes-section">
        Gefällt <span id="instaLikesCount">${post.likes}</span> Mal
      </div>

      <!-- Caption -->
      <div class="insta-caption-section">
        <p class="insta-caption-text">
          <span class="insta-caption-username">komthur</span>
          ${post.caption}
        </p>
        <div class="insta-timestamp">${post.timestamp}</div>
      </div>

      <!-- Comment Box -->
      <div class="insta-comment-box">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Mein Profil" class="insta-comment-avatar">
        <input type="text" placeholder="Kommentieren..." class="insta-comment-input">
        <button class="insta-comment-btn">Posten</button>
      </div>
    `;

    // Event Listeners für neue Elemente
    document.getElementById('instaLikeBtn')?.addEventListener('click', likePost);
    document.getElementById('instaSaveBtn')?.addEventListener('click', savePost);
  }

  function likePost() {
    isLiked = !isLiked;
    const likeBtn = document.getElementById('instaLikeBtn');
    const likesCount = document.getElementById('instaLikesCount');

    if (isLiked) {
      likeBtn.classList.add('liked');
      likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      likesCount.textContent = instaPosts[currentSlide].likes + 1;
      
      // Heart Animation
      showHeartAnimation();
    } else {
      likeBtn.classList.remove('liked');
      likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      likesCount.textContent = instaPosts[currentSlide].likes;
    }
  }

  function savePost() {
    isSaved = !isSaved;
    const saveBtn = document.getElementById('instaSaveBtn');
    saveBtn.classList.toggle('saved', isSaved);
  }

  function showHeartAnimation() {
    const carousel = document.getElementById('instaCarousel');
    const heart = document.createElement('div');
    heart.className = 'ic-heart-animation';
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    carousel.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }

  function updateCarousel() {
    rail.style.transform = `translateX(-${currentSlide * 100}%)`;
    badge.textContent = `${currentSlide + 1} / ${instaPosts.length}`;

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === instaPosts.length - 1;

    renderPostCard();
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < instaPosts.length - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Expose goToSlide für Dots
  window.instaCarouselInstance = {
    goToSlide: (index) => {
      currentSlide = Math.max(0, Math.min(index, instaPosts.length - 1));
      updateCarousel();
    }
  };

  updateCarousel();
})(); // LinkedIn Post Carousel
(function initLinkedInCarousel() {
  // Deine 10 echten Bildpfade
  const images = [
    '../assets/images/komthur/showcase_komthur_linkedin_1.png',
    '../assets/images/komthur/showcase_komthur_linkedin_2.png',
    '../assets/images/komthur/showcase_komthur_linkedin_3.png',
    '../assets/images/komthur/showcase_komthur_linkedin_4.png',
    '../assets/images/komthur/showcase_komthur_linkedin_5.png',
    '../assets/images/komthur/showcase_komthur_linkedin_6.png',
    '../assets/images/komthur/showcase_komthur_linkedin_7.png',
    '../assets/images/komthur/showcase_komthur_linkedin_8.png',
    '../assets/images/komthur/showcase_komthur_linkedin_9.png',
    '../assets/images/komthur/showcase_komthur_linkedin_10.png'
  ];

  const rail = document.getElementById('liCarouselRail');
  const dots = document.getElementById('liCarouselDots');
  const prevBtn = document.getElementById('liCarouselPrev');
  const nextBtn = document.getElementById('liCarouselNext');
  const counter = document.getElementById('liCarouselCounter');
  const showMoreBtn = document.getElementById('liShowMore');
  const fullText = document.getElementById('liFullText');
  const likeBtn = document.getElementById('liLikeBtn');

  let currentSlide = 0;

  // Carousel Slides einfügen
  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'li-carousel-slide';
    slide.innerHTML = `<img src="${src}" alt="Design Concept #${i + 1}">`;
    rail.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = 'li-carousel-dot' + (i === 0 ? ' active' : '');
    dots.appendChild(dot);
  });

  // Navigation
  function updateCarousel() {
    rail.style.transform = `translateX(-${currentSlide * 100}%)`;
    counter.textContent = `${currentSlide + 1} / ${images.length}`;

    // Dots updaten
    document.querySelectorAll('.li-carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    // Buttons aktivieren/deaktivieren
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === images.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < images.length - 1) {
      currentSlide++;
      updateCarousel();
    }
  });

  // Show more Text
  if (showMoreBtn && fullText) {
    showMoreBtn.addEventListener('click', () => {
      fullText.style.display = 'block';
      showMoreBtn.style.display = 'none';
    });
  }

  // Like Button
  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('liked');
    });
  }

  updateCarousel();
})();
  // ========================================
  // INSTAGRAM CAROUSEL - Dynamic Caption Switcher
  // ========================================
  function initInstaCarouselNew() {
    const rail = document.getElementById('instaCarouselRail');
    const prevBtn = document.getElementById('icPrev');
    const nextBtn = document.getElementById('icNext');
    const badge = document.getElementById('instaBadge');
    const postCardContainer = document.getElementById('instaPostCard');

    if (!rail || !prevBtn || !nextBtn) {
      console.warn('Instagram carousel elements not found');
      return;
    }

    const instaPosts = [
      {
        id: 0,
        image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
        caption: '✦ Design Dienstag #01 — Kreativität kennt keine Zeit. 🎨',
        likes: 428,
        timestamp: 'vor 3 Tagen'
      },
      {
        id: 1,
        image: '../assets/images/komthur/showcase_komthur_insta_2.jpg',
        caption: '💧 Progress fliesst — wie gutes Design. #DesignThinking',
        likes: 391,
        timestamp: 'vor 1 Woche'
      },
      {
        id: 2,
        image: '../assets/images/komthur/showcase_komthur_insta_3.jpg',
        caption: '🚀 Unsere neue Website ist jetzt online! Modern, schnell & mit Herz. #JetztOnline',
        likes: 487,
        timestamp: 'vor 2 Wochen'
      },
      {
        id: 3,
        image: '../assets/images/komthur/showcase_komthur_insta_1.jpg',
        caption: '✦ Design Dienstag #04 — Farben erzählen Geschichten. 🌈',
        likes: 356,
        timestamp: 'vor 3 Wochen'
      }
    ];

    let currentSlide = 0;

    // Populate carousel with images
    instaPosts.forEach((post, idx) => {
      const slide = document.createElement('div');
      slide.className = 'ic-slide';
      const img = document.createElement('img');
      img.src = post.image;
      img.alt = `Post ${idx + 1}`;
      img.loading = 'lazy';
      slide.appendChild(img);
      slide.addEventListener('dblclick', () => likePost());
      rail.appendChild(slide);
    });

    function updateCarousel() {
      if (rail) {
        rail.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
      if (badge) {
        badge.textContent = `${currentSlide + 1} / ${instaPosts.length}`;
      }
      
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === instaPosts.length - 1;
    }

    function likePost() {
      const carousel = document.getElementById('instaCarousel');
      if (carousel) {
        const heart = document.createElement('div');
        heart.className = 'ic-heart-animation';
        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        carousel.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
      }
    }

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < instaPosts.length - 1) {
        currentSlide++;
        updateCarousel();
      }
    });

    updateCarousel();
  }

  // ========================================
  // ACCORDION
  // ========================================
  function initAccordion() {
    const accordion = document.querySelector('.optim-accordion');
    if (!accordion) return;
  
    const items = accordion.querySelectorAll('.oa-item');
  
    items.forEach((item) => {
      const trigger = item.querySelector('.oa-trigger');
  
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
  
        // Close all
        items.forEach((i) => i.classList.remove('active'));
  
        // Open clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  
    // Open first by default
    if (items.length > 0) {
      items[0].classList.add('active');
    }
  }
  
  // ========================================
  // STRATEGY TABS
  // ========================================
  function initStrategyTabs() {
    const tabButtons = document.querySelectorAll('.strat-btn');
    const panels = document.querySelectorAll('.strat-panel');
    const select = document.querySelector('.strat-select');
    const ruleFill = document.querySelector('.strat-rule-fill');
  
    if (!tabButtons.length) return;
  
    function switchTab(panelId) {
      // Deactivate all
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      panels.forEach((panel) => panel.classList.remove('active'));
  
      // Activate clicked
      const activeBtn = document.querySelector(`[data-panel="${panelId}"]`);
      const activePanel = document.getElementById(panelId);
  
      if (activeBtn && activePanel) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
        activePanel.classList.add('active');
  
        // Update rule fill width
        const btnIndex = Array.from(tabButtons).indexOf(activeBtn);
        const fillWidth = ((btnIndex + 1) / tabButtons.length) * 100;
        if (ruleFill) {
          ruleFill.style.width = fillWidth + '%';
        }
      }
    }
  
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const panelId = btn.getAttribute('data-panel');
        switchTab(panelId);
        if (select) {
          select.value = panelId;
        }
      });
    });
  
    if (select) {
      select.addEventListener('change', (e) => {
        switchTab(e.target.value);
      });
    }
  
    // Initialize first tab
    if (tabButtons.length > 0) {
      const firstPanelId = tabButtons[0].getAttribute('data-panel');
      switchTab(firstPanelId);
    }
  }
  
  // ========================================
  // INSTAGRAM CAROUSEL
  // ========================================
  function initInstagramCarousel() {
    const carousel = document.querySelector('.insta-carousel');
    const rail = document.querySelector('.ic-rail');
    const prevBtn = document.querySelector('.ic-prev');
    const nextBtn = document.querySelector('.ic-next');
  
    if (!carousel || !rail) return;
  
    let currentIndex = 0;
    const cards = rail.querySelectorAll('.insta-post-card');
    const totalCards = cards.length;
  
    function moveCarousel() {
      const moveDistance = (currentIndex / totalCards) * 100;
      rail.style.transform = `translateX(-${moveDistance * (rail.offsetWidth / 100)}px)`;
    }
  
    function goToNext() {
      currentIndex = (currentIndex + 1) % totalCards;
      moveCarousel();
    }
  
    function goToPrev() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      moveCarousel();
    }
  
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
  
    // Touch swipe support
    let touchStartX = 0;
    rail.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
  
    rail.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX - touchEndX > 50) {
        goToNext();
      } else if (touchEndX - touchStartX > 50) {
        goToPrev();
      }
    });
  }
  
  // ========================================
  // LINKEDIN SLIDER
  // ========================================
  function initLinkedInSlider() {
    const slider = document.querySelector('.li-img-slider');
    const prevBtn = document.querySelector('.li-slide-prev');
    const nextBtn = document.querySelector('.li-slide-next');
    const counter = document.querySelector('#liCurrent');
  
    if (!slider) return;
  
    const slides = slider.querySelectorAll('.li-slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
  
    function updateSlider() {
      const slideWidth = slider.offsetWidth;
      slider.scrollLeft = currentSlide * slideWidth;
      if (counter) counter.textContent = currentSlide + 1;
    }
  
    function goToNext() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }
  
    function goToPrev() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }
  
    if (nextBtn) nextBtn.addEventListener('click', goToNext);
    if (prevBtn) prevBtn.addEventListener('click', goToPrev);
  
    updateSlider();
  }
  
  // ========================================
  // ANALYTICS ANIMATIONS
  // ========================================
  function initAnalyticsAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // SEO Circle
          const seoCircle = entry.target.querySelector('.seo-progress-circle');
          if (seoCircle && !seoCircle.classList.contains('animated')) {
            seoCircle.style.animationPlayState = 'running';
            seoCircle.classList.add('animated');
          }
  
          // KPI Fills
          const kpiFills = entry.target.querySelectorAll('.kpi-fill');
          kpiFills.forEach((fill) => {
            if (!fill.classList.contains('animated')) {
              const width = fill.getAttribute('data-w');
              fill.style.width = width + '%';
              fill.classList.add('animated');
            }
          });
  
          // Ads bars
          const adsBars = entry.target.querySelectorAll('.ads-bar');
          adsBars.forEach((bar) => {
            bar.style.animationPlayState = 'running';
          });
        }
      });
    });
  
    document.querySelectorAll('.analytics-grid, .p-kpis').forEach((el) => {
      observer.observe(el);
    });
  }
  
  // ========================================
  // STAT COUNTERS
  // ========================================
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-num');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          const suffix = entry.target.getAttribute('data-suffix') || '';
  
          let current = 0;
          const increment = Math.ceil(target / 30);
  
          const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(counter);
              entry.target.classList.add('counted');
            }
            entry.target.textContent = current + suffix;
          }, 30);
        }
      });
    });
  
    counters.forEach((counter) => observer.observe(counter));
  }
  
  // ========================================
  // INIT ALL
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    initInpageNav();
    initAccordion();
    initStrategyTabs();
    initInstagramCarousel();
    initLinkedInSlider();
    initAnalyticsAnimations();
    initStatCounters();
  });
  // ════════════════════════════════════════════
// LINKEDIN CAROUSEL - Image Slider
// ════════════════════════════════════════════

(function initLinkedInSlider() {
  const slider = document.getElementById('liSlider');
  const prevBtn = document.getElementById('liPrev');
  const nextBtn = document.getElementById('liNext');
  const dotsContainer = document.getElementById('liDots');
  const currentCounter = document.getElementById('liCurrent');
  
  if (!slider) return;

  const slides = slider.querySelectorAll('.li-slide');
  const totalSlides = slides.length;
  let currentSlide = 0;

  // Dots erstellen
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'li-slide-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.li-slide-dot');

  function updateSlider() {
    // Slide verschieben
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Counter updaten
    currentCounter.textContent = currentSlide + 1;
    
    // Dots updaten
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });

    // Buttons aktivieren/deaktivieren
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
  }

  function goToSlide(index) {
    currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
    updateSlider();
  }

  prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  // Initial state
  updateSlider();
})();