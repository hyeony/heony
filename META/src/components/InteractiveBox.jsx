// InteractiveBox.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { useXR } from '@react-three/xr';

function InteractiveBox(props) {
  const mesh = useRef();
  const { controllers } = useXR();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
    controllers.forEach((controller) => {
      if (controller.interacting && controller.interacting.length > 0) {
        mesh.current.material.color.set('red');
      } else {
        mesh.current.material.color.set('orange');
      }
    });
  });

  return (
    <Box ref={mesh} args={[1, 1, 1]} {...props}>
      <meshStandardMaterial attach="material" color="orange" />
    </Box>
  );
}

export default InteractiveBox;
    d