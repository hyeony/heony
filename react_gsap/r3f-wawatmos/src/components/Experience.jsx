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

    // 초기 카메라 이동 애니메이션 (부드럽게 아래로 내려가기)
    tl.current.to(camera.position, { duration: 2, x: 0, y: -40, z: 1, ease: 'power1.inOut' }, 0)
              .to(camera.rotation, { duration: 2, x: -Math.PI / 2, y: 0, z: 0, ease: 'power1.inOut' }, 0);

    // 더 깊이 내려가면서 아래를 계속 보다가 왼쪽으로 틀어지는 애니메이션
    tl.current.to(camera.position, { duration: 3, x: -10, y: -80, z: -20, ease: 'power1.inOut' }, 2)
              .to(camera.rotation, { duration: 3, x: -Math.PI / 2, y: -Math.PI / 16, z: 0, ease: 'power1.inOut' }, 2);

    // 박스를 향해 내려가는 애니메이션 (부드럽게 곡선 계단 모양으로, 계속 왼쪽으로 회전)
    tl.current.to(camera.position, { duration: 3, x: -20, y: -120, z: -40, ease: 'power1.inOut' }, 5)
              .to(camera.rotation, { duration: 3, x: -Math.PI / 4, y: -Math.PI / 8, z: 0, ease: 'power1.inOut' }, 5)
              .to(camera.position, { duration: 3, x: -30, y: -160, z: -60, ease: 'power1.inOut' }, 8)
              .to(camera.rotation, { duration: 3, x: -Math.PI / 6, y: -Math.PI / 4, z: 0, ease: 'power1.inOut' }, 8)

    // 박스 추가 및 불투명도 애니메이션 설정
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true, opacity: 0 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);

    // 박스의 위치를 카메라 최종 위치를 기준으로 설정
    const finalCameraPosition = new THREE.Vector3(-30, -160, -60);
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0));
    const distanceFromCamera = 50;
    const boxPosition = finalCameraPosition.clone().add(direction.multiplyScalar(distanceFromCamera));

    box.position.copy(boxPosition);
    scene.add(box);
    boxRef.current = box;

    // 박스가 일찍 보이도록 불투명도 애니메이션을 앞당김
    tl.current.to(boxMaterial, { opacity: 1, duration: 3, ease: 'power1.inOut' }, 8);

    // 박스를 발견한 위치에서 회전 시작
    tl.current.to(camera.position, { duration: 5, ease: 'power1.inOut',
      onUpdate: function () {
        const time = tl.current.time() - 11; // 박스가 나타난 후 회전 시작
        const angle = (1.5 * Math.PI * (time - 11) / 5); // 한바퀴 반 회전
        camera.position.x = box.position.x + distanceFromCamera * Math.cos(angle);
        camera.position.z = box.position.z + distanceFromCamera * Math.sin(angle);
        camera.position.y = box.position.y + 10 * Math.sin(angle / 2); // 높이 조정
        camera.lookAt(box.position);
      }
    }, 11);

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
