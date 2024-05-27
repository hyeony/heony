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

    // 탑뷰에서 내려가는 애니메이션
    tl.current.to(
      camera.position,
      { duration: 2, x: 0, y: -20, z: 1, ease: "power1.inOut" },
      0
    ).to(
      camera.rotation,
      { duration: 2, x: -Math.PI / 4, y: 0, z: 0, ease: "power1.inOut" },
      0
    );

    // y축을 따라 내려간 후, 그리드를 따라 약간 회전하는 느낌의 애니메이션 추가
    tl.current.to(
      camera.position,
      { duration: 4, x: -10, y: -100, z: 0, ease: "power1.inOut" },
      2
    ).to(
      camera.rotation,
      { duration: 4, x: Math.PI / 70, y: -Math.PI * 0.15, z: 0, ease: "power1.inOut" },
      2
    ).to(
      camera.position,
      { duration: 2, x: 0, y: -120, z: 20, ease: "power1.inOut" }, 
      6
    ).to(
      camera.rotation,
      { duration: 4, x: 0, y: -Math.PI * 0.5, z: 0, ease: "power1.inOut" },
      6
    );

    // 박스를 미리 추가하고, 불투명도 애니메이션 설정
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    // 카메라의 최종 위치와 방향을 기반으로 박스 위치 설정
    const finalCameraPosition = new THREE.Vector3(0, -120, 20);
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, -Math.PI * 0.5, 0));
    const distanceFromCamera = 30;
    const meshPosition = finalCameraPosition.clone().add(direction.multiplyScalar(distanceFromCamera));

    box.position.copy(meshPosition);
    scene.add(box);
    boxRef.current = box;

    // 박스의 불투명도 애니메이션
    tl.current.to(boxMaterial, { opacity: 1, duration: 2, ease: "power1.inOut" }, 8);

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
