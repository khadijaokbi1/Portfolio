window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const events = gsap.utils.toArray('.timeline-event');

  events.forEach((event, index) => {
    const card = event.querySelector('.event-card__inner');
    const dot = event.querySelector('.timeline-marker__dot');
    const label = event.querySelector('.timeline-marker__label');

    // Set initial states
    gsap.set(event, {
      opacity: 0,
      y: 60
    });

    gsap.set(dot, {
      scale: 0.6,
      opacity: 0.3
    });

    // Create timeline for each event
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: event,
        start: 'top center+=100',
        end: 'center center',
        toggleActions: 'play none none none',
        // markers: true
      }
    });

    // Fade and slide the card
    tl.to(
      event,
      {
        opacity:  1,
        y: 0,
        duration: 0.9,
        ease: 'cubic.out'
      },
      0
    );

    // Dot "pop" animation
    tl.to(
      dot,
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.2)'
      },
      0.1
    );

    // Optional: subtle card lift
    tl.fromTo(
      card,
      { y: 10, opacity: 0.9 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.out'
      },
      0
    );
  });
});
