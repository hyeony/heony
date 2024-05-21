// Grid3D.js
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useSpring } from '@react-spring/three';

const Grid3D = ({ size, divisions }) => {
  const whiteMaterialRef = useRef();

  const grid = useMemo(() => {
    const step = size / divisions;
    const halfSize = size / 2;

    const vertices = [];

    for (let i = -halfSize; i <= halfSize; i += step) {
      for (let j = -halfSize; j <= halfSize; j += step) {
        // XY plane
        vertices.push(-halfSize, i, j, halfSize, i, j);
        vertices.push(i, -halfSize, j, i, halfSize, j);

        // XZ plane
        vertices.push(i, j, -halfSize, i, j, halfSize);
        vertices.push(-halfSize, j, i, halfSize, j, i);

        // YZ plane
        vertices.push(j, -halfSize, i, j, halfSize, i);
        vertices.push(j, i, -halfSize, j, i, halfSize);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff, // 그리드의 색상
      transparent: true, // 투명도 설정을 위해 true로 설정
      opacity: 0.2, // 투명도
    });

    const gridLines = new THREE.LineSegments(geometry, material);

    // Add thicker lines at the junctions
    const junctions = [];

    for (let i = -halfSize; i < halfSize; i += step) {
      for (let j = -halfSize; j < halfSize; j += step) {
        for (let k = -halfSize; k < halfSize; k += step) {
          junctions.push(
            i - step / 20, j, k,
            i + step / 20, j, k,
            i, j - step / 20, k,
            i, j + step / 20, k,
            i, j, k - step / 20,
            i, j, k + step / 20
          );
        }
      }
    }

    const junctionGeometry = new THREE.BufferGeometry();
    junctionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(junctions, 3));

    // Create material for grey lines
    const greyMaterial = new THREE.LineBasicMaterial({
      color: 0x808080, // 그레이 색상
      transparent: true,
      opacity: 0.2,
    });
    const greyLines = new THREE.LineSegments(junctionGeometry, greyMaterial);

    // Create material for white lines
    const whiteMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff, // 화이트 색상
      transparent: true,
      opacity: 0.9,
    });
    whiteMaterialRef.current = whiteMaterial;
    const whiteLines = new THREE.LineSegments(junctionGeometry, whiteMaterial);

    gridLines.add(greyLines);
    gridLines.add(whiteLines);

    return gridLines;
  }, [size, divisions]);

  const springProps = useSpring({
    loop: { reverse: true },
    from: { opacity: 0.1, color: 'white' },
    to: { opacity: 1, color: 'white' },
    config: { duration: 1500 },
    onChange: ({ value }) => {
      if (whiteMaterialRef.current) {
        whiteMaterialRef.current.opacity = value.opacity;
        whiteMaterialRef.current.color = new THREE.Color(value.color);
      }
    },
  });

  return <primitive object={grid} />;
};

export default Grid3D;
