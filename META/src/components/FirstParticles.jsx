// components/FireParticles.js
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FireParticles() {
  const particlesRef = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = Math.random() * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push({ x, y, z });
    }
    return temp;
  }, []);

  useFrame(() => {
    particlesRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={[particle.x, particle.y, particle.z]}>
          <sphereBufferGeometry attach="geometry" args={[0.1, 16, 16]} />
          <meshStandardMaterial attach="material" color="orange" />
        </mesh>
      ))}
    </group>
  );
}

 1d
export default FireParticles;
       