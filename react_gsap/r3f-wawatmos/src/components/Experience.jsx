import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';
import { EffectComposer, RenderPass } from 'three-stdlib';
import { GUI } from 'dat.gui';
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
  const gui = useRef();

  const finalCameraPosition = new THREE.Vector3(-30, -160, -60);
  const finalCameraRotation = new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0);
  const distanceFromCamera = 50;
  const startShowingY = -120;
  const fullVisibleY = -160;

  const params = {
    threshold: 0.1,
    strength: 2.0,
    radius: 1.0
  };

  useLayoutEffect(() => {
    initialAnimationRef.current.position.copy(camera.position);
    initialAnimationRef.current.rotation.copy(camera.rotation);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), params.strength, params.radius, params.threshold);

    composer.current = new EffectComposer(gl);
    composer.current.addPass(renderScene);
    composer.current.addPass(bloomPass);

    // dat.GUI 설정
    gui.current = new GUI();
    const bloomFolder = gui.current.addFolder('Bloom');
    bloomFolder.add(params, 'threshold', 0.0, 1.0).onChange(value => bloomPass.threshold = Number(value));
    bloomFolder.add(params, 'strength', 0.0, 10.0).onChange(value => bloomPass.strength = Number(value));
    bloomFolder.add(params, 'radius', 0.0, 2.0).onChange(value => bloomPass.radius = Number(value));
    bloomFolder.open();

    return () => {
      gui.current.destroy();
    };
  }, [gl, scene, camera, params]);

  useFrame(() => {
    const scrollOffset = scroll.offset;

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
      if (camera.position.y < startShowingY) {
        boxRef.current.material.opacity = THREE.MathUtils.lerp(
          0,
          1,
          (startShowingY - camera.position.y) / (startShowingY - fullVisibleY)
        );
      } else {
        boxRef.current.material.opacity = 0;
      }
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
      />
    </>
  );
};

export default Experience;
