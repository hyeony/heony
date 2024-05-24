import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const MovingLights = () => {
  const light1Ref = useRef();
  const light2Ref = useRef();
  const light3Ref = useRef();
  const centerIntensity = 40; // 중심에 가까울수록 강도가 높아지도록 설정
  const radius = 5; // 원의 반지름
  const speed = 0.05; // 원을 따라 움직이는 속도

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const centerIntensityFactor = 1; // 중심 조명의 강도 배수

    if (light1Ref.current && light2Ref.current && light3Ref.current) {
      const angle1 = time * speed;
      const angle2 = time * speed + (Math.PI * 2) / 3;
      const angle3 = time * speed + ((Math.PI * 2) / 3) * 2;

      light1Ref.current.position.x = radius * Math.cos(angle1);
      light1Ref.current.position.y = radius * Math.sin(angle1);
      light1Ref.current.position.z = 0;
      light1Ref.current.intensity = centerIntensity + centerIntensityFactor / radius;

      light2Ref.current.position.x = radius * Math.cos(angle2);
      light2Ref.current.position.y = radius * Math.sin(angle2);
      light2Ref.current.position.z = 0;
      light2Ref.current.intensity = centerIntensity + centerIntensityFactor / radius;

      light3Ref.current.position.x = radius * Math.cos(angle3);
      light3Ref.current.position.y = radius * Math.sin(angle3);
      light3Ref.current.position.z = 0;
      light3Ref.current.intensity = centerIntensity + centerIntensityFactor / radius;
    }
  });

  return (
    <>
      <pointLight
        ref={light1Ref}
        color="white"
        intensity={centerIntensity}
        distance={20}
        decay={2}r 
      />
      <pointLight
        ref={light2Ref}
        color="white"
        intensity={centerIntensity}
        distance={20}
        decay={2}
      />
      <pointLight
        ref={light3Ref}
        color="white"
        intensity={centerIntensity}
        distance={20}
        decay={2}
      />
    </>
  );
};

export default MovingLights;
