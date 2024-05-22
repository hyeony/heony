import React from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Grid3D from "./components/Grid3d";

function CameraController() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0, 0); // 카메라가 장면의 중심을 바라보도록 설정
  });
  return null;
}

function App() {
  return (
    <Canvas camera={{ position: [-1.5, 25 , 5], fov: 50, near: 0.1, far: 1000 }}>
      <color attach="background" args={["#ececec"]} />
      <CameraController />
      <Experience />
      <ambientLight intensity={0.5} />
      <pointLight position={[11, 10, 10]} />
      <Grid3D size={30} divisions={5} />
    </Canvas>
  );
}

export default App;
