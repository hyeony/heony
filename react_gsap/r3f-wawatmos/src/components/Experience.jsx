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

    // 초기 카메라 이동 애니메이션 (아래를 보면서 내려가기)
    tl.current.to(camera.position, { duration: 4, x: 0, y: -40, z: 1, ease: 'power1.inOut' }, 0)
              .to(camera.rotation, { duration: 4, x: -Math.PI / 2, y: 0, z: 0, ease: 'power1.inOut' }, 0);

    // 더 깊이 내려가면서 왼쪽으로 틀어지는 애니메이션
    tl.current.to(camera.position, { duration: 8, x: -10, y: -100, z: -30, ease: 'power1.inOut' }, 4)
              .to(camera.rotation, { duration: 8, x: -Math.PI / 3, y: -Math.PI / 8, z: 0, ease: 'power1.inOut' }, 4);

    // 박스를 향해 내려가는 애니메이션
    tl.current.to(camera.position, { duration: 8, x: 0, y: -160, z: -40, ease: 'power1.inOut' }, 12)
              .to(camera.rotation, { duration: 8, x: -Math.PI / 6, y: 0, z: 0, ease: 'power1.inOut' }, 12);

    // 박스 추가 및 불투명도 애니메이션 설정
    const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, -160, -40);
    scene.add(box);
    boxRef.current = box;

    tl.current.to(boxMaterial, { opacity: 1, duration: 4, ease: 'power1.inOut' }, 20);

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
