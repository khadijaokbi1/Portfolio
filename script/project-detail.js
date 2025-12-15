// =========================================
// PROJECT DETAIL PAGE SCRIPTS
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper Carousel if exists
    const swiperElements = document.querySelectorAll('.swiper');
    if (swiperElements.length > 0) {
        swiperElements.forEach((swiperEl) => {
            new Swiper(swiperEl, {
                loop: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                keyboard: {
                    enabled: true,
                },
            });
        });
    }

    // GSAP Animations for Project Detail Page
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        gsap.from('.project-hero-title', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.2,
        });

        gsap.from('.project-hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            delay: 0.4,
        });

        // Info Section Animation
        gsap.from('.project-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.project-info-section',
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
        });

        gsap.from('.project-meta', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.project-info-section',
                start: 'top 70%',
                toggleActions: 'play none none none',
            },
        });

        // Gallery Items Animation
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length > 0) {
            gsap.from(galleryItems, {
                y: 60,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.gallery-grid',
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            });
        }

        // Video Container Animation
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            gsap.from(videoContainer, {
                scale: 0.9,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.project-video',
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            });
        }

        // Navigation Animation
        const navProjects = document.querySelectorAll('.nav-project');
        if (navProjects.length > 0) {
            gsap.from(navProjects, {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.project-navigation',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        }

        // Parallax effect for hero
        gsap.to('.project-hero', {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.project-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
            },
        });
    }

    // Image Gallery Lightbox (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    // Create lightbox
                    const lightbox = document.createElement('div');
                    lightbox.className = 'lightbox';
                    lightbox.innerHTML = `
                        <div class="lightbox-content">
                            <img src="${img.src}" alt="${img.alt}">
                            <button class="lightbox-close" aria-label="Close">×</button>
                        </div>
                    `;
                    document.body.appendChild(lightbox);
                    document.body.style.overflow = 'hidden';

                    // Close lightbox
                    const closeBtn = lightbox.querySelector('.lightbox-close');
                    const closeLightbox = () => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    };

                    closeBtn.addEventListener('click', closeLightbox);
                    lightbox.addEventListener('click', (e) => {
                        if (e.target === lightbox) {
                            closeLightbox();
                        }
                    });

                    // Keyboard support
                    document.addEventListener('keydown', function escHandler(e) {
                        if (e.key === 'Escape') {
                            closeLightbox();
                            document.removeEventListener('keydown', escHandler);
                        }
                    });

                    // Animate in
                    setTimeout(() => {
                        lightbox.style.opacity = '1';
                    }, 10);
                }
            });
        });
    }
});

// Add lightbox styles dynamically
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        padding: var(--space-4);
    }
    
    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        height: 50px;
        background: rgba(255, 255, 255, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        font-size: 2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
    }
`;
document.head.appendChild(lightboxStyles);
