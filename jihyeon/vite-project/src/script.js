import { setupScene } from './setupScene.js';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 페이지가 로드되면 실행
window.addEventListener('load', function() {
  setupScene();

  gsap.to(".text-1", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".main-letter-fixed",
      start: "top top",
      end: "center top",
      scrub: true
    }
  });
  
  gsap.to(".text-2", {
    opacity: 1,
    y: -10,
    scrollTrigger: {
      trigger: ".main-letter-fixed",
      start: "top top",
      end: "center top",
      scrub: true
    }
  });

  gsap.to(".main-letter-fixed", {
    y: 0,
    // pin: true, // pinning 설정
    scrollTrigger: {
      trigger: ".main-letter-fixed",
      start: "top top",
      end: "bottom top",
      scrub: true,
    }
  });
});
