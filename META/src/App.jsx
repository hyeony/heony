import React from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';
import InteractiveBox from './components/InteractiveBox';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <VRButton />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <InteractiveBox position={[0, 1, -3]} />
          <OrbitControls />
          <Controllers />
          <Hands />
        </XR>
      </Canvas>
    </div>
  );
}

export default App;
