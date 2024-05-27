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

    // 카메라 애니메이션 설정: y축을 따라 내려가는 모션 추가
    tl.current.to(
      camera.position,
      { duration: 1, x: 0, y: -20, z: 5, ease: "power1.inOut" }, // y축을 따라 내려가기
      0
    ).to(
      camera.rotation,
      { duration: 1, x: -Math.PI / 4, y: 0, z: 0, ease: "power1.inOut" },
      0
    );

    // y축을 따라 내려간 후, 곡선적인 움직임 추가
    tl.current.to(
      camera.position,
      { duration: 2, x: 10, y: -20, z: 10, ease: "power1.inOut" }, // 곡선적으로 이동
      1
    ).to(
      camera.rotation,
      { duration: 2, x: 0, y: Math.PI / 4, z: 0, ease: "power1.inOut" },
      1
    ).to(
      camera.position,
      { duration: 1, x: 0, y: -20, z: 20, ease: "power1.inOut" }, // 최종 위치로 이동
      3
    ).to(
      camera.rotation,
      { duration: 1, x: 0, y: 0, z: 0, ease: "power1.inOut" }, // 최종적으로 정면 회전으로 변경
      3
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
