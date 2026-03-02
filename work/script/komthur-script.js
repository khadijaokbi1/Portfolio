/* ========================================
   KOMTHUR IPA PROJECT - JAVASCRIPT
   Tab Navigation, Scroll Effects, Animations
   ========================================= */

   'use strict';

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
       initHeader();
       initTabs();
       initScrollAnimations();
       initAnalyticsAnimations();
       initStrategieAccordion();
       initSwotAnimations();
       initOptimierungsplan();
       initOptimAccordion();
       initInstaCarousel();
       initLinkedInSlider();
       initShowcaseNav();
   });
   
   // =========================================
   // 1. HEADER SCROLL EFFECT
   // =========================================
   function initHeader() {
       const header = document.querySelector('.site-header');
       
       const updateHeader = () => {
           if (window.scrollY > 100) {
               header?.classList.add('is-solid');
           } else {
               header?.classList.remove('is-solid');
           }
       };
   
       window.addEventListener('scroll', updateHeader);
       updateHeader();
   }
   
   // =========================================
   // 2. TAB NAVIGATION
   // =========================================
   function initTabs() {
       const tabButtons = document.querySelectorAll('.tab-btn');
       
       tabButtons.forEach(button => {
           button.addEventListener('click', () => {
               const tabId = button.getAttribute('data-tab');
               if (!tabId) return;
   
               // Remove active from all buttons
               tabButtons.forEach(btn => btn.classList.remove('active'));
               button.classList.add('active');
   
               // Remove active from all panels
               document.querySelectorAll('.tab-panel').forEach(panel => {
                   panel.classList.remove('active');
               });
   
               // Show selected panel
               const selectedPanel = document.getElementById(tabId);
               if (selectedPanel) {
                   selectedPanel.classList.add('active');
               }
           });
       });
   }
   
   // =========================================
   // 3. SCROLL ANIMATIONS
   // =========================================
   function initScrollAnimations() {
       // Fade in data items
       const observerOptions = {
           threshold: 0.1,
           rootMargin: '0px'
       };
   
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   entry.target.style.opacity = '1';
                   entry.target.style.transform = 'translateY(0)';
               }
           });
       }, observerOptions);
   
       // Observe data items, persona cards, result items
       document.querySelectorAll('.data-item, .persona-card, .result-item, .journey-item, .analytics-card').forEach(el => {
           el.style.opacity = '0';
           el.style.transform = 'translateY(30px)';
           el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
           observer.observe(el);
       });
   
       // GSAP scroll animations for cards
       if (typeof gsap !== 'undefined') {
           gsap.utils.toArray('.swot-item, .checklist-group').forEach(el => {
               gsap.from(el, {
                   y: 40,
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
       }
   }
   
   // =========================================
   // 4. ANALYTICS ANIMATIONS
   // =========================================
   function initAnalyticsAnimations() {
       const observerOptions = {
           threshold: 0.2,
           rootMargin: '0px'
       };
   
       const observer = new IntersectionObserver((entries) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   // Trigger SEO Circle Animation
                   const seoCircle = entry.target.querySelector('.seo-progress-circle');
                   if (seoCircle && !seoCircle.classList.contains('animated')) {
                       seoCircle.style.animationPlayState = 'running';
                       seoCircle.classList.add('animated');
                   }
   
                   // Trigger Ads Bars Animation
                   const googleBar = entry.target.querySelector('.google-bar');
                   const linkedinBar = entry.target.querySelector('.linkedin-bar');
                   const metaBar = entry.target.querySelector('.meta-bar');
   
                   if (googleBar && !googleBar.classList.contains('animated')) {
                       googleBar.style.animationPlayState = 'running';
                       linkedinBar?.style.setProperty('animationPlayState', 'running', 'important');
                       metaBar?.style.setProperty('animationPlayState', 'running', 'important');
                       googleBar.classList.add('animated');
                   }
               }
           });
       }, observerOptions);
   
       // Observe analytics cards
       document.querySelectorAll('.analytics-card').forEach(card => {
           observer.observe(card);
       });
   }
   
   // =========================================
   // 5. STRATEGIE ACCORDION (Produkte & Strategie)
   // =========================================
   function initStrategieAccordion() {
       const items = document.querySelectorAll('.strategie-item');
       if (!items.length) return;

       // Open the first item immediately
       const firstContent = items[0].querySelector('.strategie-content');
       if (firstContent) {
           firstContent.style.height = 'auto';
       }

       items.forEach(item => {
           const trigger  = item.querySelector('.strategie-trigger');
           const content  = item.querySelector('.strategie-content');
           if (!trigger || !content) return;

           trigger.addEventListener('click', () => {
               const isOpen = item.classList.contains('active');

               // Close all
               items.forEach(other => {
                   other.classList.remove('active');
                   const c = other.querySelector('.strategie-content');
                   if (typeof gsap !== 'undefined') {
                       gsap.to(c, { height: 0, duration: 0.5, ease: 'power3.inOut' });
                   } else {
                       c.style.height = '0';
                   }
               });

               if (!isOpen) {
                   item.classList.add('active');
                   if (typeof gsap !== 'undefined') {
                       gsap.fromTo(content,
                           { height: 0 },
                           { height: 'auto', duration: 0.6, ease: 'power3.out' }
                       );
                       // Animate number colour pop
                       gsap.fromTo(item.querySelector('.st2-number'),
                           { opacity: 0.08 },
                           { opacity: 0.4, duration: 0.4, ease: 'power2.out' }
                       );
                   } else {
                       content.style.height = 'auto';
                   }
               }
           });
       });
   }

   // =========================================
   // 6. SWOT CARD SCROLL ANIMATIONS
   // =========================================
   function initSwotAnimations() {
       if (typeof gsap === 'undefined') return;

       gsap.utils.toArray('.swot-card').forEach((card, i) => {
           gsap.from(card, {
               y: 40,
               opacity: 0,
               duration: 0.7,
               ease: 'power3.out',
               delay: i * 0.08,
               scrollTrigger: {
                   trigger: '.swot-grid-new',
                   start: 'top 85%',
                   once: true
               }
           });
       });

       gsap.from('.konkurrenz-split', {
           y: 30,
           opacity: 0,
           duration: 0.8,
           ease: 'power3.out',
           scrollTrigger: {
               trigger: '.konkurrenz-section',
               start: 'top 85%',
               once: true
           }
       });

       gsap.utils.toArray('.strategie-item').forEach((item, i) => {
           gsap.from(item, {
               x: -40,
               opacity: 0,
               duration: 0.7,
               ease: 'power3.out',
               delay: i * 0.07,
               scrollTrigger: {
                   trigger: '.strategie-accordion',
                   start: 'top 85%',
                   once: true
               }
           });
       });
   }

   // =========================================
   // 7. OPTIMIERUNGSPLAN — Scroll-driven reveal
   // =========================================
   function initOptimierungsplan() {
       if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

       const panels      = document.querySelectorAll('.optim-panel');
       const progressBar = document.getElementById('optimProgressBar');
       const currentEl   = document.getElementById('optimCurrent');
       const total       = panels.length;
       if (!panels.length) return;

       panels.forEach((panel, i) => {
           // Set the ghost background number via data attribute
           panel.setAttribute('data-index', String(i + 1).padStart(2, '0'));

           const num        = panel.querySelector('.optim-panel-num');
           const field      = panel.querySelector('.optim-panel-field');
           const istLabel   = panel.querySelector('.optim-state-ist .optim-state-label');
           const istText    = panel.querySelector('.optim-state-ist .optim-state-text');
           const divider    = panel.querySelector('.optim-divider-line');
           const sollLabel  = panel.querySelector('.optim-state-soll .optim-state-label');
           const sollText   = panel.querySelector('.optim-state-soll .optim-state-text');

           // Timeline for this panel
           const tl = gsap.timeline({
               scrollTrigger: {
                   trigger: panel,
                   start: 'top 72%',
                   end: 'bottom 20%',
                   toggleActions: 'play none none reverse',
                   onEnter: () => {
                       // Update sticky counter + progress bar
                       if (currentEl) currentEl.textContent = i + 1;
                       if (progressBar) progressBar.style.width = `${((i + 1) / total) * 100}%`;
                   },
                   onEnterBack: () => {
                       if (currentEl) currentEl.textContent = i + 1;
                       if (progressBar) progressBar.style.width = `${((i + 1) / total) * 100}%`;
                   }
               }
           });

           tl
               // 1. Large number flies up from below
               .fromTo(num,
                   { y: 60, opacity: 0 },
                   { y: 0, opacity: 0.35, duration: 0.75, ease: 'power3.out' }
               )
               // 2. Field name slides up, staggered
               .fromTo(field,
                   { y: 40, opacity: 0 },
                   { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
                   '-=0.5'
               )
               // 3. Ist-label slides in from left
               .fromTo(istLabel,
                   { x: -30, opacity: 0 },
                   { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                   '-=0.3'
               )
               // 4. Ist-text rises
               .fromTo(istText,
                   { y: 22, opacity: 0 },
                   { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
                   '-=0.3'
               )
               // 5. Divider line wipes across
               .fromTo(divider,
                   { scaleX: 0, opacity: 0 },
                   { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' },
                   '-=0.1'
               )
               // 6. Soll-label slides in from left
               .fromTo(sollLabel,
                   { x: -30, opacity: 0 },
                   { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
                   '-=0.3'
               )
               // 7. Soll-text rises — the payoff
               .fromTo(sollText,
                   { y: 28, opacity: 0 },
                   { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
                   '-=0.35'
               );
       });
   }
   
   // =========================================
   // 8. SMOOTH SCROLL FOR ANCHORS
   // =========================================
   document.querySelectorAll('a[href^="#"]').forEach(link => {
       link.addEventListener('click', e => {
           const target = document.querySelector(link.getAttribute('href'));
           if (!target) return;
           e.preventDefault();
           window.scrollTo({
               top: target.offsetTop - 100,
               behavior: 'smooth'
           });
       });
   });
   
   // =========================================
   // 9. SCROLL TRIGGER REFRESH
   // =========================================
   window.addEventListener('resize', () => {
       if (typeof ScrollTrigger !== 'undefined') {
           ScrollTrigger.refresh();
       }
   });
   
   console.log('✓ Komthur IPA Project Initialized');

   // =========================================
   // 10. OPTIMIERUNGSPLAN V2 — COMPACT ACCORDION
   // =========================================
   function initOptimAccordion() {
       const items = document.querySelectorAll('#optimAccordion .oa-item');
       if (!items.length) return;

       items.forEach(item => {
           const trigger = item.querySelector('.oa-trigger');
           if (!trigger) return;

           trigger.addEventListener('click', () => {
               const isOpen = item.classList.contains('active');

               // Close all
               items.forEach(i => i.classList.remove('active'));

               // Toggle open
               if (!isOpen) {
                   item.classList.add('active');
               }
           });
       });
   }

   // =========================================
   // 11. INSTAGRAM CAROUSEL — rail-based infinite loop
   // =========================================
   function initInstaCarousel() {
       const carousel = document.getElementById('instaCarousel');
       const rail     = document.getElementById('instaRail');
       const prevBtn  = document.getElementById('icPrev');
       const nextBtn  = document.getElementById('icNext');
       if (!carousel || !rail) return;

       // ── How many cards are visible? ──
       const visibleCount = () => window.innerWidth >= 769 ? 2 : 1;

       // ── Card width + gap ──
       const cardWidth = () => {
           const card = rail.querySelector('.insta-post-card');
           if (!card) return 300;
           const gap = parseFloat(getComputedStyle(rail).gap) || 20;
           return card.offsetWidth + gap;
       };

       // ── Clone cards for infinite looping ──
       const originalCards = Array.from(rail.querySelectorAll('.insta-post-card'));
       const total = originalCards.length;

       // Append clones of ALL cards at start and end
       originalCards.forEach(c => {
           const cl = c.cloneNode(true);
           cl.setAttribute('aria-hidden', 'true');
           rail.appendChild(cl);
       });
       [...originalCards].reverse().forEach(c => {
           const cl = c.cloneNode(true);
           cl.setAttribute('aria-hidden', 'true');
           rail.prepend(cl);
       });

       // ── State: start at first real card ──
       let currentIndex = total;
       let isAnimating  = false;

       // ── Set overflow:hidden on carousel (viewport), rail scrolls ──
       carousel.style.overflow = 'hidden';
       rail.style.display      = 'flex';
       rail.style.gap          = getComputedStyle(rail).gap || '1.25rem';

       // ── Set carousel (viewport) width ──
       const updateCarouselWidth = () => {
           const vc  = visibleCount();
           const cw  = cardWidth();
           const gap = parseFloat(getComputedStyle(rail).gap) || 20;
           // viewport = vc cards wide
           carousel.style.width    = `${vc * cw - gap}px`;
           carousel.style.maxWidth = `${vc * cw - gap}px`;
           goTo(currentIndex, false);
       };

       // ── Position engine: transform the RAIL ──
       const goTo = (index, animate = true) => {
           const cw = cardWidth();
           rail.style.transition = animate
               ? 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)'
               : 'none';
           rail.style.transform = `translateX(-${index * cw}px)`;
           currentIndex = index;
       };

       // ── After transition: silent jump if boundary hit ──
       rail.addEventListener('transitionend', () => {
           isAnimating = false;
           if (currentIndex < total) {
               goTo(currentIndex + total, false);
           } else if (currentIndex >= total * 2) {
               goTo(currentIndex - total, false);
           }
       });

       // ── Arrow clicks ──
       const step = () => visibleCount();

       nextBtn?.addEventListener('click', () => {
           if (isAnimating) return;
           isAnimating = true;
           goTo(currentIndex + step());
       });

       prevBtn?.addEventListener('click', () => {
           if (isAnimating) return;
           isAnimating = true;
           goTo(currentIndex - step());
       });

       // ── Touch / mouse drag ──
       let startX = 0, dragDelta = 0, dragging = false;

       const dragStart = (x) => { dragging = true; startX = x; dragDelta = 0; };
       const dragMove  = (x) => {
           if (!dragging) return;
           dragDelta = x - startX;
           const cw = cardWidth();
           rail.style.transition = 'none';
           rail.style.transform  = `translateX(-${currentIndex * cw - dragDelta}px)`;
       };
       const dragEnd = () => {
           if (!dragging) return;
           dragging = false;
           const threshold = cardWidth() * 0.25;
           if (dragDelta < -threshold)      goTo(currentIndex + step());
           else if (dragDelta > threshold)  goTo(currentIndex - step());
           else                             goTo(currentIndex);
       };

       rail.addEventListener('mousedown',  e => dragStart(e.clientX));
       window.addEventListener('mousemove', e => { if (dragging) dragMove(e.clientX); });
       window.addEventListener('mouseup',   ()  => dragEnd());
       rail.addEventListener('touchstart', e => dragStart(e.touches[0].clientX), { passive: true });
       rail.addEventListener('touchmove',  e => { if (dragging) dragMove(e.touches[0].clientX); }, { passive: true });
       rail.addEventListener('touchend',   ()  => dragEnd());

       // Prevent native drag on images/videos
       rail.querySelectorAll('img, video').forEach(el => {
           el.addEventListener('dragstart', e => e.preventDefault());
       });

       // ── Autoplay videos in clones ──
       rail.querySelectorAll('video').forEach(v => {
           v.muted = true;
           v.play().catch(() => {});
       });

       // ── Init + resize ──
       updateCarouselWidth();

       let resizeTimer;
       window.addEventListener('resize', () => {
           clearTimeout(resizeTimer);
           resizeTimer = setTimeout(updateCarouselWidth, 120);
       });
   }

   // =========================================
   // 12. LINKEDIN IMAGE SLIDER
   // =========================================
   function initLinkedInSlider() {
       const slider   = document.getElementById('liSlider');
       const prevBtn  = document.getElementById('liPrev');
       const nextBtn  = document.getElementById('liNext');
       const dotsWrap = document.getElementById('liDots');
       const counter  = document.getElementById('liCurrent');
       if (!slider) return;

       const slides = slider.querySelectorAll('.li-slide');
       const total  = slides.length;
       let current  = 0;
       let startX   = 0, startTranslate = 0, isDragging = false;

       // Build dots
       if (dotsWrap) {
           slides.forEach((_, i) => {
               const dot = document.createElement('div');
               dot.className = 'li-slide-dot' + (i === 0 ? ' active' : '');
               dot.addEventListener('click', () => goTo(i));
               dotsWrap.appendChild(dot);
           });
       }

       const goTo = (index) => {
           current = Math.max(0, Math.min(index, total - 1));
           slider.style.transform = `translateX(-${current * 100}%)`;

           // Update dots
           dotsWrap?.querySelectorAll('.li-slide-dot').forEach((d, i) => {
               d.classList.toggle('active', i === current);
           });

           // Update counter
           if (counter) counter.textContent = current + 1;

           // Update buttons
           if (prevBtn) prevBtn.disabled = current === 0;
           if (nextBtn) nextBtn.disabled = current === total - 1;
       };

       prevBtn?.addEventListener('click', () => goTo(current - 1));
       nextBtn?.addEventListener('click', () => goTo(current + 1));

       // Touch drag support
       const onDragStart = (clientX) => {
           isDragging = true;
           startX = clientX;
           startTranslate = current * 100;
           slider.classList.add('is-dragging');
       };

       const onDragMove = (clientX) => {
           if (!isDragging) return;
           const delta = ((startX - clientX) / slider.parentElement.offsetWidth) * 100;
           const translate = Math.max(0, Math.min(startTranslate + delta, (total - 1) * 100));
           slider.style.transform = `translateX(-${translate}%)`;
       };

       const onDragEnd = (clientX) => {
           if (!isDragging) return;
           isDragging = false;
           slider.classList.remove('is-dragging');
           const delta = startX - clientX;
           if (Math.abs(delta) > 50) {
               goTo(delta > 0 ? current + 1 : current - 1);
           } else {
               goTo(current); // snap back
           }
       };

       // Mouse
       slider.addEventListener('mousedown',  e => onDragStart(e.clientX));
       window.addEventListener('mousemove',  e => onDragMove(e.clientX));
       window.addEventListener('mouseup',    e => onDragEnd(e.clientX));

       // Touch
       slider.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
       slider.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
       slider.addEventListener('touchend',   e => onDragEnd(e.changedTouches[0].clientX));

       goTo(0); // initialise
   }

   // =========================================
   // 13. SHOWCASE INPAGE NAV — active on scroll
   // =========================================
   function initShowcaseNav() {
       const nav = document.getElementById('showcaseNav');
       if (!nav) return;

       const links = nav.querySelectorAll('.ssn-link[data-section]');
       const sectionIds = Array.from(links).map(l => l.getAttribute('data-section'));

       // Make nav sticky after it scrolls into view
       const heroSection = document.querySelector('.section-hero');
       const heroHeight  = heroSection ? heroSection.offsetHeight : 400;

       const updateNav = () => {
           const scrollY = window.scrollY;
           // Sticky behaviour
           if (scrollY > heroHeight) {
               nav.classList.add('ssn-sticky');
           } else {
               nav.classList.remove('ssn-sticky');
           }
           // Active link
           let active = null;
           sectionIds.forEach(id => {
               const el = document.getElementById(id);
               if (!el) return;
               const rect = el.getBoundingClientRect();
               if (rect.top <= 120) active = id;
           });
           links.forEach(l => {
               l.classList.toggle('ssn-active', l.getAttribute('data-section') === active);
           });
       };

       window.addEventListener('scroll', updateNav, { passive: true });
       updateNav();

       // Smooth scroll on click
       links.forEach(l => {
           l.addEventListener('click', e => {
               e.preventDefault();
               const target = document.getElementById(l.getAttribute('data-section'));
               if (target) {
                   window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
               }
           });
       });

       // Also wire the "Strategie" link
       const stratLink = nav.querySelector('.ssn-analysis');
       if (stratLink) {
           stratLink.addEventListener('click', e => {
               e.preventDefault();
               const target = document.getElementById('section-analyse');
               if (target) {
                   window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
               }
           });
       }
   }