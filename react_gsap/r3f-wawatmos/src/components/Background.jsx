import React, { useRef, useEffect } from 'react';
import { Environment, Sphere } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three";
import ParticleSystem from "./ParticleSystem";

export const Background = () => {
  const mainLightRef = useRef();
  const secondaryLightRef = useRef();
  const thirdLightRef = useRef();
  const mainTargetRef = useRef();
  const secondaryTargetRef = useRef();
  const thirdTargetRef = useRef();
  const { scene } = useThree();

  // 조명의 위치와 강도 업데이트
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Secondary light animation (slow, subtle movement)
    if (secondaryLightRef.current) {
      secondaryLightRef.current.position.x = -25 + Math.sin(time * 0.1) * 2;
      secondaryLightRef.current.position.z = -5 + Math.cos(time * 0.1) * 2;
      secondaryLightRef.current.intensity = 0.8 + Math.sin(time * 0.3) * 0.2;
    }

    // Third light animation (slow, subtle movement)
    if (thirdLightRef.current) {
      thirdLightRef.current.position.x = 25 + Math.sin(time * 0.1) * 2;
      thirdLightRef.current.position.z = 5 + Math.cos(time * 0.1) * 2;
      thirdLightRef.current.intensity = 0.6 + Math.sin(time * 0.3) * 0.1;
    }
  });

  useEffect(() => {
    if (mainLightRef.current) {
      mainLightRef.current.target = mainTargetRef.current;
    }

    if (secondaryLightRef.current) {
      secondaryLightRef.current.target = secondaryTargetRef.current;
    }

    if (thirdLightRef.current) {
      thirdLightRef.current.target = thirdTargetRef.current;
    }
  }, [scene]);

  return (
    <>
      <Environment background preset="sunset" />
      <Sphere scale={[300, 300, 300]} rotation-y={Math.PI / 2}>
        <meshStandardMaterial
          color={"skyblue"}
          emissive={"white"}
          emissiveIntensity={0.1}  // 발광 강도
          metalness={0.2}
          roughness={0.5}  // 표면 반사
          side={THREE.BackSide}
        />
      </Sphere>
      <directionalLight
        ref={mainLightRef}
        intensity={0.5}
        position={[0, 10, 0]}  // 탑뷰에서 비추도록 설정
        castShadow
      />
      <mesh ref={mainTargetRef} position={[0, 0, 0]} />

      <directionalLight
        ref={secondaryLightRef}
        intensity={0.8}
        position={[-10, 20, 0]}  // x 값을 중앙에 가깝게 조정
      />
      <mesh ref={secondaryTargetRef} position={[0, 0, 0]} />

      <directionalLight
        ref={thirdLightRef}
        intensity={0.9}
        position={[25, 30, 15]}  // x 값을 중앙에 가깝게 조정
      />
      <mesh ref={thirdTargetRef} position={[0, 0, 0]} />

      <ParticleSystem />
    </>
  );
};

export default Background;
