import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Noise } from 'noisejs';

const ParticleSystem = () => {
  const noise = useMemo(() => new Noise(Math.random()), []);
  const particleCount = 1000;
  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const velocities = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  const particles = useMemo(() => {
    const particles = new THREE.BufferGeometry();
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return particles;
  }, [particleCount, positions, velocities]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
    transparent: true,
    opacity: 0.7,
  }), []);

  const points = useMemo(() => new THREE.Points(particles, material), [particles, material]);

  useFrame(() => {
    const time = performance.now() * 0.0001;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const nx = positions[idx] * 0.01;
      const ny = positions[idx + 1] * 0.01;
      const nz = positions[idx + 2] * 0.01;

      positions[idx] += velocities[idx] + noise.simplex3(nx + time, ny, nz) * 0.1;
      positions[idx + 1] += velocities[idx + 1] + noise.simplex3(nx, ny + time, nz) * 0.1;
      positions[idx + 2] += velocities[idx + 2] + noise.simplex3(nx, ny, nz + time) * 0.1;
    }
    particles.attributes.position.needsUpdate = true;
  });

  return <primitive object={points} />;
};

export default ParticleSystem;
