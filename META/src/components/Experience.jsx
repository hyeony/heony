import React from 'react';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

function FireBackground() {
  const texture = useLoader(TextureLoader, process.env.PUBLIC_URL + '/monster_model.glb');
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function Experience() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <OrbitControls />
      <FireBackground position={[0, 0, -10]} />
      <Model url={process.env.PUBLIC_URL + '/model.glb'} position={[0, 1, 0]} />
    </Canvas>
  );
}
