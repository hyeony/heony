// components/FireBackground.js
import React from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import fireTexture from '../assets/fire.jpg';

function FireBackground() {
  const texture = useLoader(THREE.TextureLoader, fireTexture);

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

export default FireBackground;
