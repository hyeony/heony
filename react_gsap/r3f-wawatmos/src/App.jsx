import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Grid3D from "./components/Grid3d";

function App() {
  return (
    <>
    <Canvas camera={{ position: [10, 10, 10], fov: 95, near: 0.1, far: 1000 }}
     onCreated={({ camera }) => camera.lookAt(0, 0, 0)} // 카메라가 원점을 바라보
    >
        <color attach="background" args={["#ececec"]} />
        <Experience />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Grid3D size={30} divisions={5} />
      </Canvas>
    </>
  );
}

export default App;
