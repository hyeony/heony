import gsap from 'gsap';

const preload = () => {
  //preload stagger
  gsap.from('.preload-letter', 0.8, {
    y: -20,
    opacity: 0,
    ease: 'power3.inOut',
    stagger: 0.1
  })

  gsap.to('.preload-letter-t, .preload-letter-2', 2, {
    top: '0',
    ease: 'power3.inOut',
    delay: 2,
  })

  gsap.to('.preload-letter-7', 2, {
    bottom: '10',
    ease: 'power3.inOut',
    delay: 2,
  })

  gsap.to('.preload-letter-t', 2, {
    left: '0',
    ease: 'power3.inOut',
    delay: 4,
  })

  gsap.to('.preload-letter-2', 2, {
    right: '0',
    ease: 'power3.inOut',
    delay: 4,
  })

  gsap.to('.preload-letter-7', 2, {
    right: '0',
    ease: 'power3.inOut',
    delay: 4,
  })

  gsap.to('.preload-inner-l', 2, {
    left: '-50%',
    ease: 'power3.inOut',
    delay: 4,
  })

  gsap.to('.preload-inner-r', 2, {
    right: '-50%',
    ease: 'power3.inOut',
    delay: 4,
  })
}

document.addEventListener('DOMContentLoaded', () => {
  preload();
});
