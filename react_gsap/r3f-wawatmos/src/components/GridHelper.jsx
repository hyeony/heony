// GridHelper.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GridHelper = ({ size, divisions }) => {
  const gridRef = useRef();

  // useFrame은 애니메이션 프레임마다 호출되어, 그리드의 상태를 업데이트할 수 있습니다.
  useFrame(() => {
    if (gridRef.current) {
      // 원하는 애니메이션 또는 업데이트 로직을 추가할 수 있습니다.
      // 예: gridRef.current.rotation.y += 0.01;
    }
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[size, divisions, new THREE.Color('gray'), new THREE.Color('lightgray')]}
    />
  );
};
