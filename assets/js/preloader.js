/* ════════════════════════════════════════════
   PORTFOLIO PRELOADER — preloader.js
   Fullpage (index) & Sub-page (work / blog)
   Lädt nach GSAP (defer)
════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Warte auf GSAP ── */
  function whenGsap(cb) {
    if (typeof gsap !== 'undefined') { cb(); return; }
    var t = setInterval(function () {
      if (typeof gsap !== 'undefined') { clearInterval(t); cb(); }
    }, 20);
  }

  /* ════════════════════════════════
     SPEED-MESSUNG
  ════════════════════════════════ */
  function getLoadDuration() {
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return 2800;
    var downlink = conn.downlink;
    var type     = conn.effectiveType;
    if (type === 'slow-2g' || type === '2g') return 5000;
    if (type === '3g' || downlink < 1)        return 3800;
    if (downlink < 5)                          return 3000;
    return 2200;
  }

  /* ════════════════════════════════
     FULLPAGE LOADER (index.html)
  ════════════════════════════════ */
  function initFullLoader() {
    var loaderEl     = document.getElementById('loader');
    var riser        = document.getElementById('loaderRiser');
    var barFill      = document.getElementById('loaderBarFill');
    var percentEl    = document.getElementById('loaderPercent');
    var progressWrap = document.getElementById('loaderProgressWrap');
    var eyebrow      = document.getElementById('loaderEyebrow');
    var hLine1       = document.getElementById('hLine1');
    var hLine2       = document.getElementById('hLine2');
    var hLine3       = document.getElementById('hLine3');
    var tagline      = document.getElementById('loaderTagline');
    var lineTop      = document.getElementById('lineTop');
    var lineBottom   = document.getElementById('lineBottom');
    var corners      = ['cTL','cTR','cBL','cBR'].map(function(id){return document.getElementById(id);});
    var meta         = document.getElementById('loaderMeta');
    var edition      = document.getElementById('loaderEdition');

    /* Reveal-Target — smooth-wrapper bei index, sonst body-Kinder */
    var revealTarget = document.getElementById('smooth-wrapper') ||
                       document.querySelector('.site-header, main');

    if (!loaderEl || !riser) return;

    function setProgress(p) {
      var pct = Math.min(100, Math.round(p * 100));
      if (barFill)  barFill.style.width = pct + '%';
      if (percentEl) percentEl.textContent = pct + '%';
    }

    function simulateProgress(durationMs) {
      return new Promise(function (resolve) {
        var obj = { val: 0 };
        gsap.to(obj, {
          val: 1,
          duration: durationMs / 1000,
          ease: 'power1.inOut',
          onUpdate: function () { setProgress(obj.val); },
          onComplete: resolve
        });
      });
    }

    function phaseIntro() {
      return new Promise(function (resolve) {
        var tl = gsap.timeline({ onComplete: resolve });

        if (lineTop && lineBottom) {
          tl.to([lineTop, lineBottom], { scaleX: 1, duration: .9, ease: 'power3.inOut', stagger: .1 }, 0);
        }
        if (corners[0]) {
          tl.to(corners.filter(Boolean), { opacity: 1, duration: .35, stagger: .07, ease: 'power2.out' }, .25);
        }
        if (meta && edition) {
          tl.to([meta, edition], { opacity: 1, y: 0, duration: .55, stagger: .08, ease: 'power2.out' }, .4);
        }
        if (eyebrow) {
          tl.to(eyebrow, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }, .5);
        }
        if (hLine1) tl.to(hLine1, { y: '0%', duration: .9, ease: 'power4.out' }, .65);
        if (hLine2) tl.to(hLine2, { y: '0%', duration: .9, ease: 'power4.out' }, .82);
        if (hLine3) tl.to(hLine3, { y: '0%', duration: .9, ease: 'power4.out' }, .99);
        if (tagline) tl.to(tagline, { opacity: 1, duration: .55, ease: 'power2.out' }, 1.25);
      });
    }

    function phaseRiserIn() {
      if (progressWrap) gsap.to(progressWrap, { opacity: 1, duration: .5, delay: .2, ease: 'power2.out' });
      return new Promise(function (resolve) {
        gsap.to(riser, { top: '50%', duration: 1.3, ease: 'power3.out', onComplete: resolve });
      });
    }

    function phaseRiserOut() {
      return new Promise(function (resolve) {
        gsap.to(riser, { top: '-160px', duration: 1.2, ease: 'power4.inOut', onComplete: resolve });
      });
    }

    function phaseLoaderExit() {
      return new Promise(function (resolve) {
        gsap.to(loaderEl, {
          opacity: 0, duration: .45, ease: 'power2.in',
          onComplete: function () {
            loaderEl.style.display = 'none';
            document.body.classList.remove('is-loading');
            /* Merken: Fullpage bereits gezeigt — bei Rückbesuch Sub-Loader */
            try { sessionStorage.setItem('portfolioIntroSeen', '1'); } catch(e) {}
            resolve();
          }
        });
      });
    }

    function revealPage() {
      if (revealTarget) {
        gsap.to(revealTarget, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
      }
    }

    async function runLoader() {
      var loadMs = getLoadDuration();
      await phaseIntro();
      phaseRiserIn();
      await simulateProgress(loadMs);
      await new Promise(function (r) { setTimeout(r, 320); });
      await phaseRiserOut();
      await phaseLoaderExit();
      revealPage();
    }

    /* ── Set initial states ── */
    gsap.set(riser, { top: '100%' });
    if (eyebrow)    gsap.set(eyebrow, { opacity: 0, y: 10 });
    if (hLine1)     gsap.set(hLine1, { y: '108%' });
    if (hLine2)     gsap.set(hLine2, { y: '108%' });
    if (hLine3)     gsap.set(hLine3, { y: '108%' });
    if (tagline)    gsap.set(tagline, { opacity: 0 });
    if (lineTop)    gsap.set(lineTop, { scaleX: 0 });
    if (lineBottom) gsap.set(lineBottom, { scaleX: 0 });
    corners.filter(Boolean).forEach(function (c) { gsap.set(c, { opacity: 0 }); });
    if (meta)       gsap.set(meta, { opacity: 0, y: 6 });
    if (edition)    gsap.set(edition, { opacity: 0, y: 6 });
    if (progressWrap) gsap.set(progressWrap, { opacity: 0 });

    /* ── Page content unsichtbar bis reveal ── */
    if (revealTarget) gsap.set(revealTarget, { opacity: 0, y: 20 });

    runLoader();
  }

  /* ════════════════════════════════
     SUB-PAGE LOADER (work / blog)
  ════════════════════════════════ */
  function initSubLoader() {
    var loaderSub = document.getElementById('loaderSub');
    var subRiser  = document.getElementById('loaderSubRiser');

    if (!loaderSub || !subRiser) return;

    /* Reveal-Targets: smooth-wrapper (index) oder header + main (Unterseiten) */
    var smoothWrapper = document.getElementById('smooth-wrapper');
    var revealEls = smoothWrapper
      ? [smoothWrapper]
      : [
          document.querySelector('.site-header'),
          document.querySelector('main')
        ].filter(Boolean);

    /* reading-progress bar falls vorhanden */
    var readingBar = document.querySelector('.reading-progress');
    if (readingBar) revealEls.push(readingBar);

    async function runSubLoader() {
      /* Seite initial unsichtbar */
      gsap.set(revealEls, { opacity: 0, y: 24 });

      /* Loader einblenden */
      loaderSub.style.display = 'flex';
      loaderSub.style.opacity = '1';
      gsap.set(subRiser, { top: '100%' });

      /* Kurze Pause — blank cream page sichtbar */
      await new Promise(function (r) { setTimeout(r, 260); });

      /* Welle fährt komplett durch nach oben */
      await new Promise(function (resolve) {
        gsap.to(subRiser, {
          top: '-160px',
          duration: 1.1,
          ease: 'power3.inOut',
          onComplete: resolve
        });
      });

      /* Loader entfernen */
      loaderSub.style.display = 'none';
      document.body.classList.remove('is-loading');

      /* Elemente gestaffelt einblenden */
      gsap.to(revealEls, {
        opacity: 1, y: 0,
        duration: .75,
        ease: 'power3.out',
        stagger: .1
      });
    }

    runSubLoader();
  }

  /* ════════════════════════════════
     INIT nach GSAP-Bereitschaft
  ════════════════════════════════ */
  whenGsap(function () {
    var hasFullLoader = document.getElementById('loader');
    var hasSubLoader  = document.getElementById('loaderSub');
    var alreadySeen   = false;
    try { alreadySeen = sessionStorage.getItem('portfolioIntroSeen') === '1'; } catch(e) {}

    if (hasFullLoader && !alreadySeen) {
      /* Erster Besuch — große Intro-Animation */
      initFullLoader();
    } else if (hasSubLoader) {
      /* Rückbesuch auf index ODER normale Unterseite — kurze Welle */
      document.getElementById('loader') && (document.getElementById('loader').style.display = 'none');
      initSubLoader();
    } else {
      /* Kein Loader vorhanden — Seite sofort sichtbar */
      document.body.classList.remove('is-loading');
    }
  });

})();
