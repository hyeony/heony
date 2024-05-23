import React, { useLayoutEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { Text3D, useScroll } from '@react-three/drei';
import { Background } from './Background';

const Experience = () => {
  const ref = useRef();
  const tl = useRef();

  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {

    tl.current = gsap.timeline();
    tl.current.to(
      ref.current.position,
      {
        duration: 1,
        y: 5
      },
      0
    );
    
  });

  return (
    <>
      <Background />
      <group ref={ref}>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          position={[-6, 0, 0]}
          curveSegments={24}
          brevelSegments={10}
          bevelEnabled
          bevelSize={0.08}           
          scale={[1, 1, 1]}
          height={0.3}
          lineHeight={0.9}
          letterSpacing={0.1}
          color="black" // 글자의 기본 색상
          anchorX="center" // default
          anchorY="middle" // default
          rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
        >
          BOOM
        </Text3D>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          position={[-1.3, 0, 0]}
          curveSegments={35}
          brevelSegments={10}
          bevelEnabled
          bevelSize={0.08}
          scale={[1, 1, 1]}
          height={0.1}
          lineHeight={0.9}
          letterSpacing={0.1}
          color="pink" // &의 색상을 핑크로 설정
          anchorX="center" // default
          anchorY="middle" // default
          rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
        >
          &
          <meshStandardMaterial attach="material" color="pink" metalness={1.3} roughness={0.1} />
        </Text3D>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          curveSegments={24}
          brevelSegments={10}
          bevelEnabled
          bevelSize={0.08}
          scale={[1, 1, 1]}
          height={0.3}
          lineHeight={0.9}
          letterSpacing={0.1}
          color="black" // 글자의 기본 색상
          anchorX="center" // default
          anchorY="middle" // default
          rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
        >
          BLOOM
        </Text3D>
      </group>
    </>
  );
};

export default Experience;
