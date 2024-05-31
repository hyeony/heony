import React from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from './components/Experience'
import { ScrollControls } from "@react-three/drei";
import MovingLights from './components/MovingLight';

function App() {
  return (
    <>
      <h1 className="logo">Precise</h1>
      <Canvas camera={{ position: [-1.5, 15 , 5], fov: 76, near: 0.1, far: 1000 }}>
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[11, 10, 10]} />ㄹ고
        <ScrollControls pages={10} damping={0.4}>
          <Experience />
        </ScrollControls>
        <MovingLights />
      </Canvas>
    </>
  );
}

export default App;