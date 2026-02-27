/* ============================================================
   BLOG UPGRADES — in main.js einfügen (oder blog-spezifisches JS).
   Voraussetzung: GSAP + ScrollTrigger bereits geladen.
   ============================================================ */

   (function () {
    // Nur auf Blog-Seiten ausführen
    if (!document.querySelector('.article-main')) return;

    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. MOTION TOGGLE ──────────────────────────────────────
       Schaltet body.no-motion um und pausiert/killt ScrollTrigger.
       ────────────────────────────────────────────────────────── */
    let motionEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const toggleBtn = document.getElementById('motionToggle');

    if (toggleBtn) {
        // Knopf-Initialzustand
        toggleBtn.setAttribute('aria-pressed', motionEnabled);

        toggleBtn.addEventListener('click', () => {
            motionEnabled = !motionEnabled;
            toggleBtn.setAttribute('aria-pressed', motionEnabled);
            document.body.classList.toggle('no-motion', !motionEnabled);

            if (!motionEnabled) {
                // Alle laufenden Tweens stoppen, Elemente sofort sichtbar
                gsap.killTweensOf('.reveal-item, .stagger-item');
                gsap.set('.reveal-item, .stagger-item', { clearProps: 'all' });
                ScrollTrigger.getAll().forEach(t => t.kill());
            } else {
                // Seite neu laden ist die sauberste Option nach Re-Aktivierung
                location.reload();
            }
        });
    }

    /* ── 2. HERO STAGGER (ersetzt das bestehende gsap.from .stagger-item) ──
       Weicher, etwas länger — Abschnitte nicht Wörter.
       Falls du das alte gsap.from(".stagger-item") noch im HTML-Script hast,
       entferne es dort und lass nur dieses hier laufen.
       ────────────────────────────────────────────────────────────────────── */
    if (motionEnabled) {
        gsap.from('.stagger-item', {
            y: 50,
            opacity: 0,
            duration: 1.6,
            stagger: 0.25,
            ease: 'expo.out',
            delay: 0.1,
        });
    }

    /* ── 3. ABSCHNITTS-REVEAL (ersetzt das bestehende .reveal-item forEach) ──
       Jeder Abschnitt kommt elegant als Ganzes — kein Word-Split.
       ────────────────────────────────────────────────────────────────────── */
    if (motionEnabled) {
        gsap.utils.toArray('.reveal-item').forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 88%',
                    once: true,
                },
                y: 36,
                opacity: 0,
                duration: 1.1,
                ease: 'power3.out',
            });
        });
    }

    /* ── 4. BILD-PARALLAX (dezenter scrub) ──────────────────────
       Ersetzt das bestehende img-reveal-wrapper scrub.
       ────────────────────────────────────────────────────────── */
    if (motionEnabled) {
        gsap.utils.toArray('.img-reveal-wrapper img').forEach((img) => {
            gsap.fromTo(img,
                { scale: 1.06 },
                {
                    scale: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        });
    }

    /* ── 5. SIDEBAR ─────────────────────────────────────────────
       Ersetzt das bestehende gsap.from(".article-sidebar").
       ────────────────────────────────────────────────────────── */
    if (motionEnabled && document.querySelector('.article-sidebar')) {
        gsap.from('.article-sidebar', {
            scrollTrigger: {
                trigger: '.article-main',
                start: 'top 70%',
                once: true,
            },
            opacity: 0,
            x: 24,
            duration: 1.4,
            ease: 'power3.out',
        });
    }

})();