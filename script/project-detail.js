// =========================================
// HIGH-END EDITORIAL PROJECT SCRIPTS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. PARALLAX HERO
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Parallax Background
        gsap.to('.parallax-bg', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.parallax-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Text Reveal
        const tl = gsap.timeline();
        tl.to('.hero-title', {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        })
        .to('.hero-meta', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }, '-=1');
    }

    // 2. INFINITE SWIPER LOOP
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 20,
            loop: true,
            speed: 1000,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
            },
            keyboard: {
                enabled: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.5, // Shows 2 full + 0.5 of next
                    spaceBetween: 40,
                }
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            }
        });
    }

    // 3. SMOOTH SCROLL (Optional, if Lenis is added later)
    // const lenis = new Lenis();
    // function raf(time) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);
});
