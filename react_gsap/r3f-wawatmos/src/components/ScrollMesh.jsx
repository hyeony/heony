import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const ScrollMesh = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트를 감지하고 Mesh의 가시성을 변경합니다.
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = 100; // Mesh가 나타날 위치 (예: 페이지의 상단에서 500px 아래)

      if (scrollTop > targetPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 가시성에 따라 Mesh를 렌더링합니다.
  useFrame(() => {
    // Mesh의 가시성이 변경될 때마다 렌더링됩니다.
  });

  return isVisible ? (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  ) : null;
};

export default ScrollMesh;
