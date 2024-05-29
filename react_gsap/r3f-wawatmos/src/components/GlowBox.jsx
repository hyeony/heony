import React, { useLayoutEffect, useEffect, useRef, forwardRef } from 'react';
import { extend } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
import { UnrealBloomPass } from 'three-stdlib';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

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

export default Box;