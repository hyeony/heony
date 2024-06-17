import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function RotatingBox(props) {
  const mesh = useRef();
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <Box ref={mesh} args={[1, 1, 1]} {...props}>
      <meshStandardMaterial attach="material" color="orange" />
    </Box>
  );
}

export default RotatingBox;
