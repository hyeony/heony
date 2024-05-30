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
  
  // 애니메이션 루프를 추가하여 조명을 천천히 움직이게 함
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Secondary light animation (slow, subtle movement)
    if (secondaryLightRef.current) {
      secondaryLightRef.current.position.x = -45 + Math.sin(time * 0.1) * 2;
      secondaryLightRef.current.position.z = -5 + Math.cos(time * 0.1) * 2;
      secondaryLightRef.current.intensity = 0.8 + Math.sin(time * 0.3) * 0.2;  // 강도를 0.8에서 1.0 사이로 변하게 함
    }

    // Third light animation (slow, subtle movement)
    if (thirdLightRef.current) {
      thirdLightRef.current.position.x = 45 + Math.sin(time * 0.1) * 2;
      thirdLightRef.current.position.z = 5 + Math.cos(time * 0.1) * 2;
      thirdLightRef.current.intensity = 0.6 + Math.sin(time * 0.3) * 0.1;  // 강도를 0.6에서 0.7 사이로 변하게 함
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

    if (thirdLightRef.current) {
      // 세 번째 조명 설정
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
        intensity={0.8}  // 강한 빛의 강도 설정
        position={[-45, 20, -5]}  // 오른쪽 끝부분에서 비추도록 위치 설정
      />
      <mesh ref={secondaryTargetRef} position={[0, 0, 0]} />

      <directionalLight
        ref={thirdLightRef}
        intensity={0.9}  // 강한 빛의 강도 설정
        position={[45, 30, 15]}  // 오른쪽 위에서 비추도록 위치 설정
      />
      <mesh ref={thirdTargetRef} position={[0, 0, 0]} />
      
      <ParticleSystem />
    </>
  );
};

export default Background;
