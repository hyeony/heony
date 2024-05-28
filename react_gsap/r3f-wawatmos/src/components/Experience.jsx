import React, { useLayoutEffect, useEffect, useRef, forwardRef } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useScroll, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
import { UnrealBloomPass } from 'three-stdlib';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Background } from './Background';
import TextComponent from './Text3d';
import Grid3D from './Grid3d';


extend({ UnrealBloomPass });

const Box = forwardRef(({ finalPosition, finalRotation, distanceFromCamera }, ref) => {
  useEffect(() => {
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(finalRotation);
    const boxPosition = finalPosition.clone().add(direction.multiplyScalar(distanceFromCamera));
    if (ref.current) {
      ref.current.position.copy(boxPosition);
    }
  }, [finalPosition, finalRotation, distanceFromCamera, ref]);

  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(10, 10, 10));

  return (
    <>
      <lineSegments ref={ref}>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color="lime" linewidth={2} />
      </lineSegments>
    </>
  );
});

const Experience = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const initialAnimationRef = useRef({ position: new THREE.Vector3(), rotation: new THREE.Euler() });
  const boxRef = useRef();

  const finalCameraPosition = new THREE.Vector3(-30, -160, -60);
  const finalCameraRotation = new THREE.Euler(-Math.PI / 6, -Math.PI / 4, 0);
  const distanceFromCamera = 50;
  const startShowingY = -120;
  const fullVisibleY = -160;

  useLayoutEffect(() => {
    initialAnimationRef.current.position.copy(camera.position);
    initialAnimationRef.current.rotation.copy(camera.rotation);
  }, [camera]);

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
  });

  return (
    <>
      <Background />
      <Grid3D size={500} divisions={10} />
      <TextComponent />


  <Box         ref={boxRef}
        finalPosition={finalCameraPosition}
        finalRotation={finalCameraRotation}
        distanceFromCamera={distanceFromCamera} />
    </>
  );
};

export default Experience;
