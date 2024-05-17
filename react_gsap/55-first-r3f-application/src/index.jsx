import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'


const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas
      camera={{
        fov: 64,
        position: [2.3, 1.5, 2.3],
      }}
    >
      <Experience />
    </Canvas>
  </>
)