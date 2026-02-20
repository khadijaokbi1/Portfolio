/* =========================================
   PROJECT DETAIL - INTERACTIVE ELEMENTS
   Award-Winning Interactions
========================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Parallax Hero Effect
    const heroParallax = () => {
        const hero = document.querySelector('.project-hero-bg');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    };

    // 2. Fade In Animations on Scroll
    const fadeInOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .content-card, .info-card, .process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };

    // 3. Stats Counter Animation
    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    if (!isNaN(number)) {
                        animateValue(target, 0, number, 2000, text);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    };

    const animateValue = (element, start, end, duration, originalText) => {
        const startTime = performance.now();
        const suffix = originalText.replace(/[0-9]/g, '');
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };
        
        requestAnimationFrame(update);
    };

    // 4. Image Hover Effects (Enhanced)
    const imageHoverEffects = () => {
        const images = document.querySelectorAll('.image-grid img');
        
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1) contrast(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1) contrast(1)';
            });
        });
    };

    // 5. Smooth Scroll to Sections
    const smoothScrollLinks = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // 6. Process Steps Sequential Reveal
    const revealProcessSteps = () => {
        const steps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px) scale(0.95)';
            step.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            observer.observe(step);
        });
    };

    // 7. CTA Button Ripple Effect
    const ctaRippleEffect = () => {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(255,255,255,0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                const rect = button.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left - 10) + 'px';
                ripple.style.top = (e.clientY - rect.top - 10) + 'px';
                
                button.style.position = 'relative';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add keyframe animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // 8. Reading Progress Bar
    const readingProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--burgundy), #5a2f3b);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    // 9. Lazy Load Images
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };

    // 10. Nav Project Cards - Hover Tilt Effect
    const navProjectTilt = () => {
        const cards = document.querySelectorAll('.nav-project');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    };

    // Initialize all features
    heroParallax();
    fadeInOnScroll();
    animateStats();
    imageHoverEffects();
    smoothScrollLinks();
    revealProcessSteps();
    ctaRippleEffect();
    readingProgressBar();
    lazyLoadImages();
    navProjectTilt();
    
    // Performance optimization
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    });
    
    console.log('🎨 Project Detail Interactions Loaded');
});
