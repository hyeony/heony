import React, { useEffect, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Box = forwardRef(({ finalPosition, finalRotation, distanceFromCamera, onRaycast }, ref) => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const lineRef = useRef();

  useEffect(() => {
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(finalRotation);
    const boxPosition = finalPosition.clone().add(direction.multiplyScalar(distanceFromCamera));
    if (ref.current) {
      ref.current.position.copy(boxPosition);
    }
  }, [finalPosition, finalRotation, distanceFromCamera, ref]);

  useEffect(() => {
    if (lineRef.current) {
      const material = new THREE.LineBasicMaterial({ color: 'white' });
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -10)];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineRef.current.geometry = geometry;
      lineRef.current.material = material;
    }
  }, [lineRef]);

  useFrame(() => {
    if (ref.current) {
      const raycaster = raycasterRef.current;
      raycaster.set(ref.current.position, new THREE.Vector3(0, 0, -1).applyEuler(finalRotation));
      const intersects = raycaster.intersectObjects([/* array of objects to check for intersections */]);

      if (onRaycast) {
        onRaycast(intersects);
      }
    }
  });

  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(20, 20, 20));

  return (
    <>
      <lineSegments ref={ref}>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color="white" linewidth={5} />
      </lineSegments>
      <line ref={lineRef} />
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.1} luminanceSmoothing={0.3} />
      </EffectComposer>

    </>
  );
});

export default Box;
