import { setupScene } from './setupScene.js';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 페이지가 로드되면 실행
window.addEventListener('load', function() {
  setupScene();


  gsap.to(".text-1", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power1.out',
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-letter-fixed",
      start: "20px top",
      end: "bottom top",
      scrub: true,
      pin: true,
      // markers: true,
    }
  });
  
  timeline.to(".text-1", {
    opacity: 0
  },"-=0.4")
  .to(".text-2", {
    opacity: 1,
    y: -10
  },"-=0.2");
});
