/* ========================================
   KOMTHUR IPA PROJECT - JAVASCRIPT
   Tab Navigation, Scroll Effects, Animations
   ======================================== */

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