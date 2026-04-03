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
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.toggle('active', scrollPos >= sectionTop && scrollPos < sectionBottom);
        }
      });
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.querySelector(link.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  const hero = document.querySelector('.section-hero');
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => nav.classList.toggle('is-visible', !entry.isIntersecting));
    });
    observer.observe(hero);
  }
}

// ════════════════════════════════════════════
// INSTAGRAM STORY SHOWCASE
// ════════════════════════════════════════════
(function initStoryShowcase() {
  const progressBar = document.getElementById('storyProgressBar');
  const likeBtn = document.getElementById('storyLikeBtn');
  const phoneWrap = document.querySelector('.sea-phone-wrap');

  if (!progressBar || !phoneWrap) return;

  let isLiked = false;
  let started = false;

  function startProgress() {
    if (started) return;
    started = true;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.5;
      progressBar.style.width = progress + '%';
      if (progress >= 100) clearInterval(interval);
    }, 40);
  }

  if (likeBtn) {
    likeBtn.addEventListener('click', () => {
      isLiked = !isLiked;
      likeBtn.classList.toggle('liked', isLiked);
      likeBtn.innerHTML = isLiked
        ? '<i class="fa-solid fa-heart"></i>'
        : '<i class="fa-regular fa-heart"></i>';
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { startProgress(); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.3 });

  observer.observe(phoneWrap);
})();

// ════════════════════════════════════════════
// INSTAGRAM CAROUSEL
// ════════════════════════════════════════════
function initInstaCarousel() {
  const rail    = document.getElementById('instaCarouselRail');
  const prevBtn = document.getElementById('icPrev');
  const nextBtn = document.getElementById('icNext');
  const badge   = document.getElementById('instaBadge');
  const card    = document.getElementById('instaPostCard');

  if (!rail || !prevBtn || !nextBtn || !card) return;

  const instaPosts = [
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '&#10022; Design Dienstag #01 &mdash; Kreativit&auml;t kennt keine Zeit. &#127912;', likes: 428, timestamp: 'vor 3 Tagen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '&#128167; Progress fliesst &mdash; wie gutes Design. #DesignThinking', likes: 391, timestamp: 'vor 1 Woche' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '&#128640; Unsere neue Website ist jetzt online! Modern, schnell &amp; mit Herz. #JetztOnline', likes: 487, timestamp: 'vor 2 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '&#10022; Design Dienstag #04 &mdash; Farben erz&auml;hlen Geschichten. &#127752;', likes: 356, timestamp: 'vor 3 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '&#127919; Zielgerichtetes Design f&uuml;r maximale Wirkung. Unsere Philosophie.', likes: 412, timestamp: 'vor 4 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '&#9999; Design Dienstag #06 &mdash; Minimalismus ist nicht weniger, sondern mehr. #Minimalism', likes: 445, timestamp: 'vor 5 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '&#128161; Inspiration der Woche: Typographie. Die Kunst der Schrift. &#128395;', likes: 378, timestamp: 'vor 6 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '&#127775; Design Dienstag #08 &mdash; User Experience ist unser Fokus. #UX #Design', likes: 502, timestamp: 'vor 7 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '&#127912; Neue Projekte, neue Perspektiven. Swipe f&uuml;r mehr! #Portfolio', likes: 421, timestamp: 'vor 8 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '&#10022; Design Dienstag #10 &mdash; Konsistenz ist der Schl&uuml;ssel zu guter Markenidentit&auml;t. #Branding', likes: 534, timestamp: 'vor 9 Wochen' }
  ];

  let current = 0;
  let isLiked = false;
  let isSaved = false;

  // Slides befuellen
  rail.innerHTML = '';
  instaPosts.forEach((post, idx) => {
    const slide = document.createElement('div');
    slide.className = 'ic-slide';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = 'Post ' + (idx + 1);
    img.loading = 'lazy';
    slide.appendChild(img);
    slide.addEventListener('dblclick', () => triggerLike(true));
    rail.appendChild(slide);
  });

  function renderCard() {
    const post = instaPosts[current];
    isLiked = false;
    isSaved = false;

    const dots = instaPosts.map((_, i) =>
      '<div class="insta-dot' + (i === current ? ' active' : '') + '" data-idx="' + i + '"></div>'
    ).join('');

    card.innerHTML =
      '<div class="ipc-header-full">' +
        '<div class="ipc-profile-section">' +
          '<div class="ipc-avatar-gradient"><div class="ipc-avatar-border">' +
            '<img src="../assets/images/komthur/komthur_favicon.png" alt="komthur" class="ipc-avatar-img">' +
          '</div></div>' +
          '<div class="ipc-username-info">' +
            '<span class="ipc-username">komthur</span>' +
            '<span class="ipc-location">Kreuzlingen, Switzerland</span>' +
          '</div>' +
        '</div>' +
        '<button class="ipc-menu-btn"><i class="fa-solid fa-ellipsis"></i></button>' +
      '</div>' +
      '<div class="insta-actions-bar">' +
        '<div class="insta-actions-left">' +
          '<button class="insta-action-btn" id="instaLikeBtn"><i class="fa-regular fa-heart"></i></button>' +
          '<button class="insta-action-btn"><i class="fa-regular fa-comment"></i></button>' +
          '<button class="insta-action-btn"><i class="fa-solid fa-paper-plane"></i></button>' +
        '</div>' +
        '<div class="insta-dots-container">' + dots + '</div>' +
        '<button class="insta-action-btn" id="instaSaveBtn"><i class="fa-regular fa-bookmark"></i></button>' +
      '</div>' +
      '<div class="insta-likes-section">Gef&auml;llt <span id="instaLikesCount">' + post.likes + '</span> Mal</div>' +
      '<div class="insta-caption-section">' +
        '<p class="insta-caption-text"><span class="insta-caption-username">komthur</span> ' + post.caption + '</p>' +
        '<div class="insta-timestamp">' + post.timestamp + '</div>' +
      '</div>' +
      '<div class="insta-comment-box">' +
        '<img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Profil" class="insta-comment-avatar">' +
        '<input type="text" placeholder="Kommentieren..." class="insta-comment-input">' +
        '<button class="insta-comment-btn">Posten</button>' +
      '</div>';

    document.getElementById('instaLikeBtn').addEventListener('click', () => triggerLike(false));
    document.getElementById('instaSaveBtn').addEventListener('click', toggleSave);
    card.querySelectorAll('.insta-dot[data-idx]').forEach(dot => {
      dot.style.cursor = 'pointer';
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.idx)));
    });
  }

  function triggerLike(fromDblClick) {
    isLiked = !isLiked;
    var btn = document.getElementById('instaLikeBtn');
    var count = document.getElementById('instaLikesCount');
    if (btn) {
      btn.classList.toggle('liked', isLiked);
      btn.innerHTML = isLiked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    }
    if (count) count.textContent = instaPosts[current].likes + (isLiked ? 1 : 0);
    if (isLiked) showHeart();
  }

  function toggleSave() {
    isSaved = !isSaved;
    var btn = document.getElementById('instaSaveBtn');
    if (btn) {
      btn.classList.toggle('saved', isSaved);
      btn.innerHTML = isSaved ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
    }
  }

  function showHeart() {
    var carousel = document.getElementById('instaCarousel');
    if (!carousel) return;
    var heart = document.createElement('div');
    heart.className = 'ic-heart-animation';
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    carousel.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, instaPosts.length - 1));
    update();
  }

  function update() {
    rail.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (badge) badge.textContent = (current + 1) + ' / ' + instaPosts.length;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === instaPosts.length - 1;
    renderCard();
  }

  prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < instaPosts.length - 1) goTo(current + 1); });

  // Touch-Swipe
  var touchStartX = 0;
  rail.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  rail.addEventListener('touchend', e => {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && current < instaPosts.length - 1) goTo(current + 1);
    else if (diff < -50 && current > 0) goTo(current - 1);
  }, { passive: true });

  update();
}

// ════════════════════════════════════════════
// LINKEDIN CAROUSEL
// ════════════════════════════════════════════
(function initLinkedInCarousel() {
  const rail    = document.getElementById('liCarouselRail');
  const dots    = document.getElementById('liCarouselDots');
  const prevBtn = document.getElementById('liCarouselPrev');
  const nextBtn = document.getElementById('liCarouselNext');
  const counter = document.getElementById('liCarouselCounter');
  const showMore = document.getElementById('liShowMore');
  const fullText = document.getElementById('liFullText');
  const likeBtn  = document.getElementById('liLikeBtn');

  if (!rail) return;

  const images = [];
  for (var i = 1; i <= 10; i++) {
    images.push('../assets/images/komthur/showcase_komthur_linkedin_' + i + '.png');
  }

  let current = 0;

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'li-carousel-slide';
    slide.innerHTML = '<img src="' + src + '" alt="Design Concept #' + (i + 1) + '" loading="lazy">';
    rail.appendChild(slide);
    if (dots) {
      const dot = document.createElement('div');
      dot.className = 'li-carousel-dot' + (i === 0 ? ' active' : '');
      dots.appendChild(dot);
    }
  });

  function update() {
    rail.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (counter) counter.textContent = (current + 1) + ' / ' + images.length;
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === images.length - 1;
    if (dots) {
      dots.querySelectorAll('.li-carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { if (current > 0) { current--; update(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { if (current < images.length - 1) { current++; update(); } });
  if (showMore && fullText) {
    showMore.addEventListener('click', () => { fullText.style.display = 'block'; showMore.style.display = 'none'; });
  }
  if (likeBtn) likeBtn.addEventListener('click', () => likeBtn.classList.toggle('liked'));

  update();
})();

// ========================================
// ACCORDION
// ========================================
function initAccordion() {
  const accordion = document.querySelector('.optim-accordion');
  if (!accordion) return;
  const items = accordion.querySelectorAll('.oa-item');
  items.forEach((item) => {
    item.querySelector('.oa-trigger').addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
  if (items.length > 0) items[0].classList.add('active');
}

// ========================================
// STRATEGY TABS
// ========================================
function initStrategyTabs() {
  const tabButtons = document.querySelectorAll('.strat-btn');
  const panels     = document.querySelectorAll('.strat-panel');
  const select     = document.querySelector('.strat-select');
  const ruleFill   = document.querySelector('.strat-rule-fill');

  if (!tabButtons.length) return;

  function switchTab(panelId) {
    tabButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
    panels.forEach(p => p.classList.remove('active'));
    const activeBtn   = document.querySelector('[data-panel="' + panelId + '"]');
    const activePanel = document.getElementById(panelId);
    if (activeBtn && activePanel) {
      activeBtn.classList.add('active');
      activeBtn.setAttribute('aria-selected', 'true');
      activePanel.classList.add('active');
      const btnIndex = Array.from(tabButtons).indexOf(activeBtn);
      if (ruleFill) ruleFill.style.width = ((btnIndex + 1) / tabButtons.length * 100) + '%';
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('data-panel');
      switchTab(panelId);
      if (select) select.value = panelId;
    });
  });
  if (select) select.addEventListener('change', e => switchTab(e.target.value));
  if (tabButtons.length > 0) switchTab(tabButtons[0].getAttribute('data-panel'));
}

// ========================================
// ANALYTICS ANIMATIONS
// ========================================
function initAnalyticsAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const seoCircle = entry.target.querySelector('.seo-progress-circle');
        if (seoCircle && !seoCircle.classList.contains('animated')) {
          seoCircle.style.animationPlayState = 'running';
          seoCircle.classList.add('animated');
        }
        entry.target.querySelectorAll('.kpi-fill').forEach(fill => {
          if (!fill.classList.contains('animated')) {
            fill.style.width = fill.getAttribute('data-w') + '%';
            fill.classList.add('animated');
          }
        });
        entry.target.querySelectorAll('.ads-bar').forEach(bar => {
          if (!bar.classList.contains('animated')) {
            bar.style.animationPlayState = 'running';
            bar.classList.add('animated');
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.analytics-grid, .p-kpis, .ads-list').forEach(el => observer.observe(el));
}

// ========================================
// STAT COUNTERS
// ========================================
function initStatCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target  = parseInt(entry.target.getAttribute('data-target'));
        const suffix  = entry.target.getAttribute('data-suffix') || '';
        let cur = 0;
        const incr = Math.ceil(target / 30);
        const timer = setInterval(() => {
          cur += incr;
          if (cur >= target) { cur = target; clearInterval(timer); entry.target.classList.add('counted'); }
          entry.target.textContent = cur + suffix;
        }, 30);
      }
    });
  });
  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
}

// ========================================
// INIT ALL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initInpageNav();
  initAccordion();
  initStrategyTabs();
  initInstaCarousel();
  initAnalyticsAnimations();
  initStatCounters();
});

// ════════════════════════════════════════════
// INSTAGRAM CAROUSEL (neue Komponente)
// ════════════════════════════════════════════
function initInstagramCarousel() {
  const rail         = document.getElementById('igCarouselRail');
  const prevBtn      = document.getElementById('igCarouselPrev');
  const nextBtn      = document.getElementById('igCarouselNext');
  const counter      = document.getElementById('igCarouselCounter');
  const dots         = document.getElementById('igCarouselDots');
  const likesCount   = document.getElementById('igLikesCount');
  const captionText  = document.getElementById('igCaptionText');
  const timestamp    = document.getElementById('igTimestamp');

  if (!rail || !prevBtn || !nextBtn) return;

  const posts = [
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '✦ Design Dienstag #01 — Kreativität kennt keine Zeit. 🎨', likes: 428, timestamp: 'vor 3 Tagen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '💧 Progress fliesst — wie gutes Design. #DesignThinking', likes: 391, timestamp: 'vor 1 Woche' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '🚀 Unsere neue Website ist jetzt online! Modern, schnell & mit Herz. #JetztOnline', likes: 487, timestamp: 'vor 2 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '✦ Design Dienstag #04 — Farben erzählen Geschichten. 🌈', likes: 356, timestamp: 'vor 3 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '🎯 Zielgerichtetes Design für maximale Wirkung. Unsere Philosophie.', likes: 412, timestamp: 'vor 4 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '✏️ Design Dienstag #06 — Minimalismus ist nicht weniger, sondern mehr. #Minimalism', likes: 445, timestamp: 'vor 5 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '💡 Inspiration der Woche: Typographie. Die Kunst der Schrift. 🖋️', likes: 378, timestamp: 'vor 6 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_2.jpg', caption: '🌟 Design Dienstag #08 — User Experience ist unser Fokus. #UX #Design', likes: 502, timestamp: 'vor 7 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_3.jpg', caption: '🎨 Neue Projekte, neue Perspektiven. Swipe für mehr! #Portfolio', likes: 421, timestamp: 'vor 8 Wochen' },
    { image: '../assets/images/komthur/showcase_komthur_insta_1.jpg', caption: '✦ Design Dienstag #10 — Konsistenz ist der Schlüssel zu guter Markenidentität. #Branding', likes: 534, timestamp: 'vor 9 Wochen' }
  ];

  let current = 0;
  let isLiked = false;
  let isSaved = false;

  // Populate slides
  rail.innerHTML = '';
  posts.forEach((post, idx) => {
    const slide = document.createElement('div');
    slide.className = 'ig-carousel-slide';
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = 'Post ' + (idx + 1);
    img.loading = 'lazy';
    slide.appendChild(img);
    slide.addEventListener('dblclick', () => toggleLike());
    rail.appendChild(slide);
  });

  // Populate dots
  dots.innerHTML = '';
  posts.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'ig-carousel-dot' + (idx === 0 ? ' active' : '');
    dot.style.cursor = 'pointer';
    dot.addEventListener('click', () => goTo(idx));
    dots.appendChild(dot);
  });

  function toggleLike() {
    isLiked = !isLiked;
    const likeBtn = document.getElementById('igLikeBtn');
    if (likeBtn) {
      likeBtn.classList.toggle('liked', isLiked);
      likeBtn.innerHTML = isLiked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
    }
    if (likesCount) likesCount.textContent = posts[current].likes + (isLiked ? 1 : 0);
  }

  function toggleSave() {
    isSaved = !isSaved;
    const saveBtn = document.getElementById('igSaveBtn');
    if (saveBtn) {
      saveBtn.classList.toggle('saved', isSaved);
      saveBtn.innerHTML = isSaved ? '<i class="fa-solid fa-bookmark"></i>' : '<i class="fa-regular fa-bookmark"></i>';
    }
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, posts.length - 1));
    update();
  }

  function update() {
    rail.style.transform = 'translateX(-' + (current * 100) + '%)';
    if (counter) counter.textContent = (current + 1) + ' / ' + posts.length;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === posts.length - 1;

    isLiked = false;
    isSaved = false;

    const post = posts[current];
    if (captionText) captionText.textContent = post.caption;
    if (timestamp) timestamp.textContent = post.timestamp;
    if (likesCount) likesCount.textContent = post.likes;

    const likeBtn = document.getElementById('igLikeBtn');
    if (likeBtn) {
      likeBtn.classList.remove('liked');
      likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }

    const saveBtn = document.getElementById('igSaveBtn');
    if (saveBtn) {
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    }

    // Update dots
    document.querySelectorAll('.ig-carousel-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < posts.length - 1) goTo(current + 1); });

  // Like & Save buttons
  const likeBtn = document.getElementById('igLikeBtn');
  if (likeBtn) likeBtn.addEventListener('click', toggleLike);

  const saveBtn = document.getElementById('igSaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', toggleSave);

  // Touch swipe
  let touchStartX = 0;
  rail.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  rail.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50 && current < posts.length - 1) goTo(current + 1);
    else if (diff < -50 && current > 0) goTo(current - 1);
  }, { passive: true });

  update();
}

// ════════════════════════════════════════════
// Init Instagram on DOMContentLoaded
// ════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initInstagramCarousel();
  initScrollReveal();
});

// ========================================
// SCROLL REVEAL — staggered fade-up
// ========================================
function initScrollReveal() {
  const autoRevealSelectors = [
    '.section-header',
    '.mk-sprig-divider',
    '.positioning-insight-new',
    '.insight-box',
    '.swot-matrix',
    '.konkurrenz-split',
    '.zg-bento',
    '.personas-grid',
    '.strat-header',
    '.strat-tabs',
    '.product-block__header',
    '.showcase-container',
    '.pb-card-wrap',
    '.sea-story-layout',
    '.footer-info-item'
  ];

  autoRevealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
