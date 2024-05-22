import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Grid3D from "./components/Grid3d";

function CameraController() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(-3, 11, 9);
  });
  return null;
}

function App() {
  return (
    <Canvas camera={{ position: [-5, 20, 15], fov: 40, near: 0.5, far: 1000 }}>
      <color attach="background" args={["#ececec"]} />
      <CameraController />
      <Experience />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Grid3D size={30} divisions={5} />
    </Canvas>
  );
}

export default App;
