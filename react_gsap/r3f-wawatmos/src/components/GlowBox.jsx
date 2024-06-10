import React, { useEffect, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useGLTF } from '@react-three/drei';

const Bubbles = ({ modelPosition }) => {
  const bubblesRef = useRef([]);
  const bubbleGroupRef = useRef(new THREE.Group());

  useEffect(() => {
    bubbleGroupRef.current.position.copy(modelPosition); // Set the group position to the model's position

    for (let i = 0; i < 20; i++) {
      const bubble = new THREE.Object3D();
      const initialPosition = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );
      bubble.position.copy(initialPosition);
      bubble.userData.initialPosition = initialPosition;
      bubble.scale.setScalar(Math.random() * 10.1 + 0.05);
      bubblesRef.current.push(bubble);
      bubbleGroupRef.current.add(bubble);
    }

    return () => {
      modelPosition.remove(bubbleGroupRef.current);
    };
  }, [modelPosition]);

  useFrame(() => {
    bubblesRef.current.forEach((bubble) => {
      bubble.position.y += 0.01;
      if (bubble.position.y > 1) {
        bubble.position.y = bubble.userData.initialPosition.y;
      }
    });
  });

  return (
    <>
      {bubblesRef.current.map((bubble, index) => (
        <mesh key={index} position={bubble.position} scale={bubble.scale}>
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
      ))}
    </>
  );
};

const Box = forwardRef(({ finalPosition, finalRotation, distanceFromCamera, glbSceneRef }, ref) => {
  const raycasterRef = useRef(new THREE.Raycaster());
  const lineRef = useRef();
  const lineMaterialRef = useRef(new THREE.LineBasicMaterial({ color: 'white', transparent: true, opacity: 0 }));
  const { scene: glbScene } = useGLTF('/models/cloud/flower.glb');
  const modelPosition = useRef(new THREE.Vector3());

  useEffect(() => {
    const direction = new THREE.Vector3(0, 0, -1).applyEuler(finalRotation);
    const boxPosition = finalPosition.clone().add(direction.multiplyScalar(distanceFromCamera));
    if (ref.current) {
      ref.current.position.copy(boxPosition);
      // console.log('Box Position:', ref.current.position); 
    }
    if (glbScene) {
      glbScene.position.copy(boxPosition);
      modelPosition.current.copy(boxPosition); // Store the model's position

      // console.log('GLB Model Position:', glbScene.position); // Log GLB Model Position

      glbScene.scale.set(10, 10, 10);
      if (glbSceneRef) {
        glbSceneRef.current = glbScene;
      }
      glbScene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material.color,
            emissive: new THREE.Color(0x444444),
            emissiveIntensity: 1.0,
            metalness: 0.1,
            roughness: 0.8
          });
          child.material.transparent = true;
          child.material.depthWrite = false;
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

      if (intersects.length > 0) {
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
      {/* {glbScene && <Bubbles modelPosition={modelPosition.current} />} */}
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.1} luminanceSmoothing={0.5} />
      </EffectComposer>
    </>
  );
});

export default Box;
