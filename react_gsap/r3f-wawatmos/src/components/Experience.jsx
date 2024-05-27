import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useScroll } from '@react-three/drei';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3d';
import ScrollMesh from './ScrollMesh';

const Experience = () => {
  const { camera } = useThree();
  const tl = useRef();
  const scroll = useScroll();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

useLayoutEffect(() => {
  tl.current = gsap.timeline();

  // 탑뷰에서 내려가는 애니메이션
  tl.current.to(
    camera.position,
    { duration: 2, x: 0, y: -20, z: 1, ease: "power1.inOut" },
    0
  ).to(
    camera.rotation,
    { duration: 2, x: -Math.PI / 4, y: 0, z: 0, ease: "power1.inOut" },
    0
  );

  // y축을 따라 내려간 후, 그리드를 따라 약간 회전하는 느낌의 애니메이션 추가
  tl.current.to(
    camera.position,
    { duration: 4, x: -10, y: -100, z: 0, ease: "power1.inOut" },
    2
  ).to(
    camera.rotation,
    { duration: 4, x: Math.PI / 70, y: -Math.PI * 0.15, z: 0, ease: "power1.inOut" },
    2
  ).to(
    camera.position,
    { duration: 2, x: 0, y: -120, z: 20, ease: "power1.inOut" }, 
    6
  ).to(
    camera.rotation,
    { duration: 4, x: 0, y: -Math.PI * 0.5, z: 0, ease: "power1.inOut" },
    6
  );
}, []);


  return (
    <>
      <Background />
      <Grid3D size={500} divisions={10} />
      <TextComponent />
      <ScrollMesh />
    </>
  );
};

export default Experience;
