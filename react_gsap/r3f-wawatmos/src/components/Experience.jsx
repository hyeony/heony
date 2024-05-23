import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Text3D, useScroll } from '@react-three/drei';
import { Background } from './Background';
import TextComponent from './Text3d';

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

    // VERTICAL ANIMATION
    tl.current.to(
      camera.position,
      { duration: 0.5, x: 0, y: - 10, z: 0 },
      0
    ).to(
      camera.rotation,
      { duration: 0.5, x: -1, y: -0.1, z: 0 },
      0
    ).to(
      camera.position,
      { duration: 0.5, x: 0, y: -20, z: 0 },
      0
    ).to(
      camera.rotation,
      { duration: 0.5, x: 15, y: -0.1, z: 0 },
      0
    )

    tl.current.to(
      camera.position,
      {
        duration: 1,
        x: -1,
        z: 2,
      },
      0
    );

  }, []);

  return (
    <>
      <Background />
      <TextComponent />
    </>
  );
};

export default Experience;
