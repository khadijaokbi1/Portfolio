import gsap from 'https://cdn.skypack.dev/gsap@3.12.0'
import ScrollTrigger from 'https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger'

const hasScrollSupport = CSS.supports(
  '(animation-timeline: view()) and (animation-range: 0 100%)'
)

// Set data attributes directly (no config panel needed)
document.documentElement.dataset.theme = 'dark'
document.documentElement.dataset.enhanced = true
document.documentElement.dataset.center = true
document.documentElement.dataset.layers = true
document.documentElement.dataset.stagger = 'range'

if (!hasScrollSupport) {
  gsap.registerPlugin(ScrollTrigger)

  const scalerTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: 'section.foto:first-of-type',
        start: 'top -10%',
        end: 'bottom 80%',
        scrub: true,
      },
    })
    .from(
      '.scaler img',
      {
        height: window.innerHeight - 32,
        ease: 'power1.inOut',
      },
      0
    )
    .from(
      '.scaler img',
      {
        width: window.innerWidth - 32,
        ease: 'power2.inOut',
      },
      0
    )

  const layersTl = gsap
    .timeline({
      scrollTrigger: {
        trigger: 'section.foto:first-of-type',
        start: 'top -40%',
        end: 'bottom bottom',
        scrub: true,
      },
    })
    .from('.layer:nth-of-type(1)', { opacity: 0, ease: 'sine.out' }, 0)
    .from('.layer:nth-of-type(1)', { scale: 0, ease: 'power1.inOut' }, 0)
    .from('.layer:nth-of-type(2)', { opacity: 0, ease: 'sine.out' }, 0)
    .from('.layer:nth-of-type(2)', { scale: 0, ease: 'power3.inOut' }, 0)
    .from('.layer:nth-of-type(3)', { opacity: 0, ease: 'sine.out' }, 0)
    .from('.layer:nth-of-type(3)', { scale: 0, ease: 'power4.inOut' }, 0)
}