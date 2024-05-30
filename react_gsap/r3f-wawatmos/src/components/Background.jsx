import React, { useRef, useEffect } from 'react';
import { Environment, Sphere } from "@react-three/drei";
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three";
import ParticleSystem from "./ParticleSystem";

export const Background = () => {
  const mainLightRef = useRef();
  const secondaryLightRef = useRef();
  const mainTargetRef = useRef();
  const secondaryTargetRef = useRef();
  const { scene } = useThree();
  
  // 애니메이션 루프를 추가하여 조명을 천천히 움직이게 함
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Main light animation (slight movement and intensity variation)
    if (mainLightRef.current) {
      mainLightRef.current.position.x = Math.sin(time * 0.2) * 1;
      mainLightRef.current.position.z = Math.cos(time * 0.2) * 1;
      mainLightRef.current.intensity = 0.4 + Math.sin(time * 0.5) * 0.1;  // 강도를 0.4에서 0.5 사이로 변하게 함
    }

    // Secondary light animation (slow, subtle movement)
    if (secondaryLightRef.current) {
      secondaryLightRef.current.position.x = 10 + Math.sin(time * 0.1) * 2;
      secondaryLightRef.current.position.z = 10 + Math.cos(time * 0.1) * 2;
    }
  });

  useEffect(() => {
    if (mainLightRef.current) {
      // 메인 조명 설정
      mainLightRef.current.target = mainTargetRef.current;
    }

    if (secondaryLightRef.current) {
      // 두 번째 조명 설정
      secondaryLightRef.current.target = secondaryTargetRef.current;
    }
  }, [scene]);

  return (
    <>
      <Environment background preset="sunset" />
      <Sphere scale={[300, 300, 300]} rotation-y={Math.PI / 2}>
        <meshStandardMaterial
          color={"skyblue"}
          emissive={"white"}
          emissiveIntensity={0.1}  // 발광 강도를 줄임
          metalness={0.2}  // 금속성 반사를 줄임
          roughness={0.5}  // 표면 반사를 줄임
          side={THREE.BackSide}
        />
      </Sphere>
      <directionalLight
        ref={mainLightRef}
        intensity={0.5}  // 초기 빛의 강도 설정
        position={[0, 10, 0]}  // 빛의 위치를 조정하여 탑뷰에서 비추도록 설정
        castShadow
      />
      <mesh ref={mainTargetRef} position={[0, 0, 0]} />

      <directionalLight
        ref={secondaryLightRef}
        intensity={0.2}  // 약한 빛의 강도 설정
        position={[10, 5, 10]}  // 오른쪽 끝부분에서 비추도록 위치 설정
      />
      <mesh ref={secondaryTargetRef} position={[0, 0, 0]} />
      
      <ParticleSystem />
    </>
  );
};

export default Background;
