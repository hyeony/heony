import React from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from './components/Experience'
import { ScrollControls } from "@react-three/drei";
import Grid3D from "./components/Grid3d";

function App() {
  return (
    <Canvas camera={{ position: [-1.5, 20 , 5], fov: 50, near: 0.1, far: 1000 }}>
      <color attach="background" args={["#ececec"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[11, 10, 10]} />
      <ScrollControls pages={8} damping={0.3}>
        <Experience />
        <Grid3D size={30} divisions={5} />
      </ScrollControls>
    </Canvas>
  );
}

export default App;

