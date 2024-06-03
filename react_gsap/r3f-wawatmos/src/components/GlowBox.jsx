import React, { useEffect, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EdgesGeometry } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useGLTF } from '@react-three/drei';

const Box = forwardRef(({ finalPosition, finalRotation, distanceFromCamera, onRaycast, glbSceneRef }, ref) => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const lineRef = useRef();
  const lineMaterialRef = useRef(new THREE.LineBasicMaterial({ color: 'white', transparent: true, opacity: 0 }));
  const { scene: glbScene } = useGLTF('/models/cloud/model.glb');

  useEffect(() => {
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(finalRotation);
    const boxPosition = finalPosition.clone().add(direction.multiplyScalar(distanceFromCamera));
    if (ref.current) {
      ref.current.position.copy(boxPosition);
    }
    if (glbScene) {
      glbScene.position.copy(boxPosition);
      glbScene.scale.set(5, 5, 5);
      if (glbSceneRef) {
        glbSceneRef.current = glbScene;
      }
      glbScene.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.depthWrite = false; // Ensures transparency is handled correctly
        }
      });
    }
  }, [finalPosition, finalRotation, distanceFromCamera, ref, glbScene, glbSceneRef]);

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

  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(30, 30, 30));

  return (
    <>
      <lineSegments ref={ref} material={lineMaterialRef.current}>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial color="white" linewidth={15} transparent opacity={0} />
      </lineSegments>
      <line ref={lineRef} />
      <primitive object={glbScene} />
      <EffectComposer>
        <Bloom intensity={0.45} luminanceThreshold={0.1} luminanceSmoothing={0.5} />
      </EffectComposer>
    </>
  );
});

export default Box;
