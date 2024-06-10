import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';
import { EffectComposer, RenderPass } from 'three-stdlib';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3d';
import Box from './GlowBox';

extend({ UnrealBloomPass });

const Experience = () => {
  const { gl, scene, camera } = useThree();
  const scroll = useScroll();
  const initialAnimationRef = useRef({ position: new THREE.Vector3(), rotation: new THREE.Euler() });
  const boxRef = useRef();
  const composer = useRef();
  const glbSceneRef = useRef();

  const finalCameraPosition = new THREE.Vector3(-30, -160, -60);
  const finalCameraRotation = new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0);
  const distanceFromCamera = 50;
  const startShowingY = -80;
  const fullVisibleY = -120;

  const params = {
    threshold: 0.1,
    strength: 2.0,
    radius: 1.0
  };

  const mouseOffset = useRef({ x: 0, y: 0 });
  const mouseFactor = 5.0; // 마우스 이동 감도 조절 (크게 증가시켰습니다)
  const lerpFactor = 0.1; // 마우스 이동 부드럽게 적용 (조금 더 빠르게 적용되도록 변경했습니다)

  const prevCameraPosition = useRef(new THREE.Vector3());
  const prevCameraRotation = useRef(new THREE.Euler());

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;
      mouseOffset.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useLayoutEffect(() => {
    initialAnimationRef.current.position.copy(camera.position);
    initialAnimationRef.current.rotation.copy(camera.rotation);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), params.strength, params.radius, params.threshold);

    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderScene);
    composer.current.addPass(bloomPass);

  }, [gl, scene, camera, params]);

  useFrame(() => {
    const scrollOffset = scroll.offset;

    let cameraChanged = false;

    if (scrollOffset <= 0.3) {
      const t = scrollOffset / 0.3;
      camera.position.lerpVectors(
        initialAnimationRef.current.position,
        finalCameraPosition,
        t
      );
      camera.rotation.set(
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.x, finalCameraRotation.x, t),
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.y, finalCameraRotation.y, t),
        THREE.MathUtils.lerp(initialAnimationRef.current.rotation.z, finalCameraRotation.z, t)
      );
    } else {
      const t = ((scrollOffset - 0.3) / 0.7) * Math.PI * 2;
      const radiusX = 40;
      const radiusZ = 40;
      const centerX = -30;
      const centerZ = -60;
      const x = centerX + radiusX * Math.cos(t);
      const z = centerZ + radiusZ * Math.sin(t);
      camera.position.set(x, -160, z);

      if (boxRef.current) {
        camera.lookAt(boxRef.current.position);
      }
    }

    if (boxRef.current) {
      const material = boxRef.current.material;
      if (camera.position.y < startShowingY) {
        const opacity = THREE.MathUtils.lerp(
          0,
          1,
          (startShowingY - camera.position.y) / (startShowingY - fullVisibleY)
        );
        if (material.opacity !== opacity) {
          material.opacity = opacity;
          cameraChanged = true;
        }
        if (glbSceneRef.current) {
          glbSceneRef.current.traverse((child) => {
            if (child.isMesh) {
              child.material.opacity = opacity;
              child.material.transparent = true;
            }
          });
        }
      } else if (material.opacity !== 0) {
        material.opacity = 0;
        if (glbSceneRef.current) {
          glbSceneRef.current.traverse((child) => {
            if (child.isMesh) {
              child.material.opacity = 0;
            }
          });
        }
        cameraChanged = true;
      }
    }

    // 현재 카메라 위치와 회전 값에 마우스 이동 값을 더하거나 빼는 방식으로 적용
    const mouseAdjustedPositionX = camera.position.x + mouseOffset.current.x * mouseFactor;
    const mouseAdjustedPositionY = camera.position.y + mouseOffset.current.y * mouseFactor;

    // 기존 애니메이션에 마우스 이동 값을 더한 최종 카메라 위치 및 회전
    const newPosition = new THREE.Vector3(mouseAdjustedPositionX, mouseAdjustedPositionY, camera.position.z);
    camera.position.lerp(newPosition, lerpFactor);

    // 카메라의 초기 회전을 유지하면서 마우스 이동에 따른 부드러운 회전 추가
    const mouseAdjustedRotationX = camera.rotation.x + mouseOffset.current.y * mouseFactor * 0.01;
    const mouseAdjustedRotationY = camera.rotation.y + mouseOffset.current.x * mouseFactor * 0.01;

    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouseAdjustedRotationX, lerpFactor);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouseAdjustedRotationY, lerpFactor);

    // 카메라 위치나 회전이 변경되었을 때만 로그 출력
    if (!prevCameraPosition.current.equals(camera.position) || !prevCameraRotation.current.equals(camera.rotation)) {
      console.log(`Camera Position - X: ${camera.position.x}, Y: ${camera.position.y}, Z: ${camera.position.z}`);
      console.log(`Camera Rotation - X: ${camera.rotation.x}, Y: ${camera.rotation.y}, Z: ${camera.rotation.z}`);
      prevCameraPosition.current.copy(camera.position);
      prevCameraRotation.current.copy(camera.rotation);
    }

    // Bloom 효과를 적용하여 씬 렌더링
    composer.current.render();
  });

  return (
    <>
      <Background />
      <Grid3D size={500} divisions={10} />
      <TextComponent />
      <Box
        ref={boxRef}
        finalPosition={finalCameraPosition}
        finalRotation={finalCameraRotation}
        distanceFromCamera={distanceFromCamera}
        glbSceneRef={glbSceneRef} 
      />
    </>
  );
};

export default Experience;
