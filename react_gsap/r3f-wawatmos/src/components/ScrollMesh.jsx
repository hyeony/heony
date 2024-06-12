import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const ScrollMesh = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = 100;

      if (scrollTop > targetPosition) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {

  });

  return isVisible ? (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  ) : null;
};

export default ScrollMesh;
