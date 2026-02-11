/* ========================================= 
   BLOG INTERACTIVE FEATURES
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================= 
    // 1. READING PROGRESS BAR
    // ========================================= 
    const progressBar = document.querySelector('.reading-progress-bar');
    
    const updateReadingProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    };
    
    window.addEventListener('scroll', updateReadingProgress);
    
    // ========================================= 
    // 2. READING TIME INDICATOR
    // ========================================= 
    const readingTime = document.querySelector('.reading-time');
    
    const calculateReadingTime = () => {
        const article = document.querySelector('.article-body');
        if (!article) return;
        
        const text = article.innerText;
        const wpm = 200; // Words per minute
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        
        if (readingTime) {
            readingTime.textContent = `${time} Min`;
        }
    };
    
    const toggleReadingTime = () => {
        if (!readingTime) return;
        
        if (window.scrollY > 500) {
            readingTime.classList.add('visible');
        } else {
            readingTime.classList.remove('visible');
        }
    };
    
    calculateReadingTime();
    window.addEventListener('scroll', toggleReadingTime);
    
    // ========================================= 
    // 3. BACK TO TOP BUTTON
    // ========================================= 
    const backToTop = document.querySelector('.back-to-top');
    
    const toggleBackToTop = () => {
        if (!backToTop) return;
        
        if (window.scrollY > 800) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    };
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // ========================================= 
    // 4. SCROLL REVEAL ANIMATIONS
    // ========================================= 
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
    
    // ========================================= 
    // 5. SHARE FUNCTIONALITY
    // ========================================= 
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(window.location.href);
                    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
                    setTimeout(() => {
                        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
                    }, 2000);
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // ========================================= 
    // 6. HERO PARALLAX EFFECT (if GSAP available)
    // ========================================= 
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero background parallax
        gsap.to('.blog-hero-bg', {
            y: 300,
            ease: "none",
            scrollTrigger: {
                trigger: ".blog-hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Image zoom on scroll
        const articleImages = document.querySelectorAll('.article-image img');
        articleImages.forEach(img => {
            gsap.from(img, {
                scale: 1.2,
                scrollTrigger: {
                    trigger: img,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
    
    // ========================================= 
    // 7. SMOOTH ANCHOR LINKS
    // ========================================= 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================= 
    // 8. LAZY LOAD IMAGES
    // ========================================= 
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================= 
    // 9. HEADER SCROLL BEHAVIOR
    // ========================================= 
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 100) {
            header?.classList.remove('is-solid');
            header?.classList.remove('hide');
        } else if (currentScroll > lastScroll) {
            // Scrolling down
            header?.classList.add('is-solid');
            header?.classList.add('hide');
        } else {
            // Scrolling up
            header?.classList.remove('hide');
            header?.classList.add('is-solid');
        }
        
        lastScroll = currentScroll;
    });
    
});
