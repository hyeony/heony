import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useScroll } from '@react-three/drei';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3D';

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
      { duration: 0.3, x: 0, y: -30, z: 0 },
      0
    ).to(
      camera.rotation,
      { duration: 0.4, x: -1.7, y: -0.1, z: 0.5 },
      -0.03
    )

    // tl.current.to(
    //   camera.position,
    //   {
    //     duration: 1,
    //     x: -1,
    //     z: 2,
    //   },
    //   0
    // );

  }, []);

  return (
    <>
      <Background />
      <TextComponent />
      <Grid3D size={100} divisions={5} /> {/* Add the Grid3D component here */}
    </>
  );
};

export default Experience;