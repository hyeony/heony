import React, { Suspense } from 'react'
import Experience from './components/Experience'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'

export default function AppRapierPhysics() {
  return (
    <>
      <VRButton />
      <Canvas shadows camera={{position: [3, 3, 3], fov: 30}}>
          <XR>
          <Hands />
            <color attach="background" args={["#ececec"]} />
            <Suspense>
              <Physics debug>
                <Experience/>
              </Physics>
            </Suspense>
          </XR>
      </Canvas>
    </>
  )
}