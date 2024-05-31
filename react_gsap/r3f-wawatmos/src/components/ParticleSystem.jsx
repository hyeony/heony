import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Noise } from 'noisejs';

const vertexShader = `
  attribute float size;
  attribute float alpha;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  varying float vAlpha;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist < 0.5) {
      gl_FragColor = vec4(color, vAlpha);
    } else {
      discard;
    }
  }
`;

const ParticleSystem = () => {
  const noise = useMemo(() => new Noise(Math.random()), []);
  const particleCount = 750;
  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const velocities = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);
  const sizes = useMemo(() => new Float32Array(particleCount), [particleCount]);
  const alphas = useMemo(() => new Float32Array(particleCount), [particleCount]);

  const particles = useMemo(() => {
    const particles = new THREE.BufferGeometry();
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600; // 간격을 더 넓게 설정
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
      
      const size = Math.random() * 3 + 1;
      sizes[i] = size;
      alphas[i] = size < 2 ? 1.0 : 0.3;  // 크기가 작은 파티클만 밝게 설정
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particles.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    return particles;
  }, [particleCount, positions, velocities, sizes, alphas]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(0xffffff) },
      size: { value: 5 },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
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
