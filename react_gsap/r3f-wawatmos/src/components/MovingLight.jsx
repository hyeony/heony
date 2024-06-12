import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const MovingLight = ({ opposite = false }) => {
  const lightRef = useRef();
  const [position, setPosition] = useState([0, 0, 2]); // 초기 위치를 배열로 설정
  const radius = 5; // 반지름
  const speed = 0.05; // 속도
  let time = 0;

  useFrame(() => {
    const angle = time * speed + (opposite ? Math.PI : 0); // 각도 조정
    const x = radius * Math.cos(angle) * (opposite ? -5.8 : 1); // x 값을 조정하여 두 번째 조명이 더 중앙에 가깝게
    const y = radius * Math.sin(angle) * (opposite ? 22.2 : 1); // y 값을 조정하여 두 번째 조명이 더 위쪽으로

    setPosition([x, y, 2]);
    if (lightRef.current) {
      lightRef.current.position.set(x, y, 2); // 고정된 z축 위치
    }
    time += 0.1;
  });

  return (
    <>
      <pointLight ref={lightRef} intensity={5} distance={25} decay={2} />

    </>
  );
};


export default MovingLight;
