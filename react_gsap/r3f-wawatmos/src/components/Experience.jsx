import React, { useLayoutEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { Text3D, useScroll } from '@react-three/drei';
import { Background } from './Background';
import TextComponent from './Text3d';


const Experience = () => {
  // const { camera } = useThree(); 
  // const tl = useRef();
  // const scroll = useScroll();


  // useFrame(() => {
  //   tl.current.seek(scroll.offset * tl.current.duration());
  // });
  // useFrame(() => {

  //   camera.position.y = 45; 

  //   camera.lookAt(0, 0, 0); 
  // });


  return (
    <>
      <Background />
      <TextComponent />
    </>
  );
};

export default Experience;
