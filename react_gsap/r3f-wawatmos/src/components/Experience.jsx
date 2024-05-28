import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3d';
import ScrollMesh from './ScrollMesh';

const Experience = () => {
  const { camera, scene } = useThree();
  const scroll = useScroll();
  const boxRef = useRef();
  const initialAnimationRef = useRef({ position: new THREE.Vector3(), rotation: new THREE.Euler() });

  useLayoutEffect(() => {
    const finalPosition = { x: -30, y: -160, z: -60 };

    // 박스 추가 및 불투명도 애니메이션 설정
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    // 박스의 위치를 카메라 최종 위치를 기준으로 설정
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0));
    const distanceFromCamera = 50;
    const boxPosition = new THREE.Vector3(finalPosition.x, finalPosition.y, finalPosition.z).add(direction.multiplyScalar(distanceFromCamera));

    box.position.copy(boxPosition);
    scene.add(box);
    boxRef.current = box;

    // 초기 카메라 위치와 회전값 저장
    initialAnimationRef.current.position.copy(camera.position);
    initialAnimationRef.current.rotation.copy(camera.rotation);
  }, [camera, scene]);

  useFrame(() => {
    const scrollOffset = scroll.offset;

    if (scrollOffset <= 0.3) {
      // 초기 애니메이션 (부드럽게 아래로 내려가기)
      const t = scrollOffset / 0.3;
      camera.position.lerpVectors(
        initialAnimationRef.current.position,
        new THREE.Vector3(-30, -160, -60),
        t
      );
      camera.rotation.set(
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.x, -Math.PI / 6, t),
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.y, -Math.PI / 4, t),
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.z, 0, t)
      );
    } else {
      // 타원 경로를 따라 카메라 이동
      const t = (scrollOffset - 0.3) / 0.7 * Math.PI * 2; // 매개변수 t (0 ~ 2π)
      const radiusX = 40; // 타원의 x축 반지름
      const radiusZ = 40; // 타원의 z축 반지름
      const centerX = -30; // 타원의 중심 x좌표
      const centerZ = -60; // 타원의 중심 z좌표
      const x = centerX + radiusX * Math.cos(t);
      const z = centerZ + radiusZ * Math.sin(t);
      camera.position.set(x, -160, z);
      camera.lookAt(boxRef.current.position);
    }

    // 박스가 카메라 y 위치에 따라 서서히 보이도록 설정
    const startShowingY = -120;
    const fullVisibleY = -160;
    if (camera.position.y < startShowingY) {
      boxRef.current.material.opacity = THREE.MathUtils.lerp(
        0,
        1,
        (startShowingY - camera.position.y) / (startShowingY - fullVisibleY)
      );
    } else {
      boxRef.current.material.opacity = 0;
    }
  });

  return (
    <>
      <Background />
      <Grid3D size={500} divisions={10} />
      <TextComponent />
      <ScrollMesh />
    </>
  );
};

export default Experience;
