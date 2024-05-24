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

    // VERTICAL ANIMATION
    tl.current.to(
      camera.position,
      { duration: 0.2, x: 0, y: -80, z: 0 },  // Adjust y position to extend the movement
      0
    ).to(
      camera.rotation,
      { duration: 0.3, x: -1.7, y: -0.1, z: 0.5 },
      -0.02
    );
  }, []);

  return (
    <>
      <Background />
      <Grid3D size={500} divisions={10} />  {/* Increase size and adjust divisions */}
      <TextComponent />
      <ScrollMesh />
    </>
  );
};

export default Experience;
