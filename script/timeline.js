window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const events = gsap.utils.toArray('.timeline-event');

  events.forEach((event, index) => {
    const card = event.querySelector('.event-card__inner');
    const dot = event.querySelector('.timeline-marker__dot');
    const label = event.querySelector('.timeline-marker__label');

    // Set initial states for elegant entrance
    gsap.set(event, {
      opacity: 0,
      y: 50
    });

    gsap.set(dot, {
      scale: 0,
      opacity: 0
    });

    // Determine if left or right card for subtle directional animation
    const isLeft = event.querySelector('.event-card--left');
    const slideX = isLeft ? -20 : 20;

    gsap.set(card, {
      x: slideX,
      opacity: 0
    });

    // Create smooth timeline for each event
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: event,
        start: 'top center+=120',
        end: 'center center',
        toggleActions: 'play none none none',
      }
    });

    // Elegant fade and slide
    tl.to(event, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0);

    // Card entrance with subtle horizontal movement
    tl.to(card, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out'
    }, 0.1);

    // Dot elegant pop with smooth scaling
    tl.to(dot, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    }, 0.2);

    // Label subtle fade in
    if (label) {
      gsap.set(label, { opacity: 0 });
    }
  });

  // Add subtle parallax effect to timeline spine
  const spine = document.querySelector('.timeline-spine');
  if (spine) {
    gsap.to(spine, {
      opacity: 1,
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });
  }
});
