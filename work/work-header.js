// Work Header Navigation Script
document.addEventListener('DOMContentLoaded', () => {
    const workHeader = document.getElementById('workHeader');
    const navToggle = document.getElementById('workNavToggle');
    const mobileMenu = document.getElementById('workMobileMenu');

    // Header scroll effect
    if (workHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                workHeader.classList.add('is-solid');
            } else {
                workHeader.classList.remove('is-solid');
            }
        });
    }

    // Mobile menu toggle
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            navToggle.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Close menu when clicking a link
    if (mobileMenu && navToggle) {
        document.querySelectorAll('.work-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                navToggle.textContent = '☰';
            });
        });
    }

    // --- INTEGRATED PROJECT SCRIPTS ---

    // 1. GSAP GLOBAL LOGIC
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Parallax Hero (About, SBW, Hillsong, Win4)
        const parallaxElems = document.querySelectorAll('.parallax-bg, .parallax-video, .parallax-item');
        parallaxElems.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.25;
            gsap.to(el, {
                y: (speed * 100) + "%",
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Reveal Animations (Shared)
        gsap.utils.toArray(".reveal-text, .reveal-item, .reveal-up, .stagger-item").forEach((item) => {
            gsap.from(item, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                }
            });
        });

        // 2. IDPA: Progress Bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + "%";
            });
        }

        // 3. HILLSONG: Carousel Logic
        const track = document.getElementById('track');
        if (track) {
            let currentIndex = 0;
            const cards = document.querySelectorAll('.video-card');
            const videos = document.querySelectorAll('.content-video');

            window.updateCarousel = function() {
                cards.forEach((card, index) => {
                    card.classList.toggle('active', index === currentIndex);
                    const video = videos[index];
                    if (index === currentIndex) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                        card.classList.remove('playing');
                    }
                });
                const cardWidth = 350 + 80;
                track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
            };

            window.selectVideo = function(index) {
                currentIndex = index;
                window.updateCarousel();
            };

            window.next = function() {
                if (currentIndex < cards.length - 1) {
                    currentIndex++;
                    window.updateCarousel();
                }
            };

            window.prev = function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    window.updateCarousel();
                }
            };

            window.togglePlay = function(event, index) {
                event.stopPropagation();
                const card = cards[index];
                const video = videos[index];
                if (video.paused) {
                    video.play();
                    card.classList.add('playing');
                } else {
                    video.pause();
                    card.classList.remove('playing');
                }
            };
            window.updateCarousel();
        }

        // 4. TIKTOK: Mastery & Knowledge
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            let tiktokProgress = 0;
            window.toggleKnowledge = function(el, value) {
                if (!el.classList.contains('checked')) {
                    el.classList.add('checked');
                    tiktokProgress += value;
                    updateTiktokProgress();
                }
            };

            function updateTiktokProgress() {
                progressFill.style.width = tiktokProgress + "%";
                const label = document.getElementById('progress-label');
                if (label) label.textContent = Math.round(tiktokProgress) + "%";
                if (tiktokProgress >= 100) {
                    const overlay = document.getElementById('success-overlay');
                    if (overlay) overlay.style.display = 'flex';
                }
            }
        }

        // 5. WIN4: Bande & Slider
        const bandeContainer = document.querySelector('.bande-container');
        if (bandeContainer) {
            let currentBande = 1;
            setInterval(() => {
                currentBande = currentBande % 3 + 1;
                const rot = (currentBande - 1) * -90;
                bandeContainer.style.transform = `rotateX(${rot}deg)`;
            }, 5000);
        }

        if (document.querySelector('.pfadi-slide')) {
            let slideIndex = 0;
            window.changeSlide = function(n) {
                const slides = document.querySelectorAll('.pfadi-slide');
                slides[slideIndex].classList.remove('active');
                slideIndex = (slideIndex + n + slides.length) % slides.length;
                slides[slideIndex].classList.add('active');
            };
        }
    }

    // 6. LUCIDE ICONS
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- SKILL OBSERVERS (EXISTING) ---
    gsap.registerPlugin(ScrollTrigger);

    // PARALLAX HERO
    gsap.to("#heroParallax", {
        y: "25%",
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // OBSERVER FOR CIRCLE SKILLS
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.mbti-fill');
                const val = entry.target.getAttribute('data-val');
                const circum = 283;
                const offset = circum - (val / 100) * circum;
                fill.style.strokeDashoffset = offset;
                circleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.mbti-item').forEach(item => circleObserver.observe(item));

    // OBSERVER FOR BAR SKILLS
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                fill.style.width = entry.target.getAttribute('data-width');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-row').forEach(row => barObserver.observe(row));

    // Video Carousel Logic for Sponsoring Section
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide-item');
    const totalSlides = slides.length;
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('bandePrev');
    const nextBtn = document.getElementById('bandeNext');
    const currentNum = document.getElementById('currentNum');

    function updateSlide() {
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        if (currentNum) {
            currentNum.textContent = (currentSlide + 1).toString().padStart(2, '0');
        }
        // Play current video and pause others
        slides.forEach((slide, index) => {
            const video = slide.querySelector('video');
            if (video) {
                if (index === currentSlide) {
                    video.play().catch(e => console.log('Video play interrupted:', e));
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto slide every 5 seconds
    if (totalSlides > 0) {
        setInterval(nextSlide, 5000);
    }

    // Initial update
    updateSlide();
});