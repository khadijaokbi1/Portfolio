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
   // 5. SMOOTH SCROLL FOR ANCHORS
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
   // 6. SCROLL TRIGGER REFRESH
   // =========================================
   window.addEventListener('resize', () => {
       if (typeof ScrollTrigger !== 'undefined') {
           ScrollTrigger.refresh();
       }
   });
   
   console.log('✓ Komthur IPA Project Initialized');