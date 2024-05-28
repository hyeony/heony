import React, { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3d';
import ScrollMesh from './ScrollMesh';

const Experience = () => {
  const { camera, scene } = useThree();
  const tl = useRef();
  const scroll = useScroll();
  const boxRef = useRef();

  useFrame(() => {
    if (tl.current) {
      tl.current.seek(scroll.offset * tl.current.duration());
    }
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    const finalPosition = { x: -30, y: -160, z: -60 };

    // 초기 카메라 이동 애니메이션 (부드럽게 아래로 내려가기)
    tl.current
      .to(camera.position, { duration: 2, x: 0, y: -40, z: 1, ease: 'power1.inOut' }, 0)
      .to(camera.rotation, { duration: 2, x: -Math.PI / 2, y: 0, z: 0, ease: 'power1.inOut' }, 0)
      .to(camera.position, { duration: 3, x: -10, y: -80, z: -20, ease: 'power1.inOut' }, 2)
      .to(camera.rotation, { duration: 3, x: -Math.PI / 2, y: -Math.PI / 16, z: 0, ease: 'power1.inOut' }, 2)
      .to(camera.position, { duration: 3, x: -20, y: -120, z: -40, ease: 'power1.inOut' }, 5)
      .to(camera.rotation, { duration: 3, x: -Math.PI / 4, y: -Math.PI / 8, z: 0, ease: 'power1.inOut' }, 5)
      .to(camera.position, { duration: 3, x: -30, y: -160, z: -60, ease: 'power1.inOut' }, 8)
      .to(camera.rotation, { duration: 3, x: -Math.PI / 6, y: -Math.PI / 4, z: 0, ease: 'power1.inOut' }, 8);

    // 박스 추가 및 불투명도 애니메이션 설정
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    // 박스의 위치를 카메라 최종 위치를 기준으로 설정
    const finalCameraPosition = new THREE.Vector3(finalPosition.x, finalPosition.y, finalPosition.z);
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0));
    const distanceFromCamera = 50;
    const boxPosition = finalCameraPosition.clone().add(direction.multiplyScalar(distanceFromCamera));

    box.position.copy(boxPosition);
    scene.add(box);
    boxRef.current = box;

    // 박스가 일찍 보이도록 불투명도 애니메이션을 앞당김
    tl.current.to(boxMaterial, { opacity: 1, duration: 3, ease: 'power1.inOut' }, 5);

    // 타원 경로를 따라 카메라 이동 애니메이션 설정
    const radiusX = 40; // 타원의 x축 반지름
    const radiusZ = 40; // 타원의 z축 반지름
    const centerX = finalPosition.x;
    const centerZ = finalPosition.z;
    const duration = 10; // 타원 경로를 따라 이동하는 데 걸리는 시간
    const segments = 100; // 타원 경로를 따라 나눌 세그먼트 수

    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2; // 매개변수 t (0 ~ 2π)
      const x = centerX + radiusX * Math.cos(t);
      const z = centerZ + radiusZ * Math.sin(t);
      tl.current.to(camera.position, { duration: duration / segments, x, z, ease: 'power1.inOut', onUpdate: () => {
        camera.lookAt(box.position);
      }}, 11 + (i * duration / segments));
    }
  }, [camera, scene]);

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
