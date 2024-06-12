import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from "@react-three/fiber";
import Experience from './components/Experience';
import { ScrollControls, Scroll } from "@react-three/drei";
import MovingLight from './components/MovingLight';
import { Overlay } from './components/Overlay';

const rectangleVariants = {
  hidden: { y: '0%', opacity: 1 },
  visible: (i) => ({
    y: '-100%',
    opacity: 1, // 투명도를 유지
    transition: {
      delay: i === 1 ? 0 : i === 2 ? 0.2 : i === 0 ? 0.4 : 0.6,
      duration: i === 3 ? 2 : 1.5,
      type: 'spring',
      stiffness: 50,
    },
  }),
};

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const totalDuration = 0.6 + 2; // 가장 긴 delay + 가장 긴 duration
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, totalDuration * 450);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`intro-container ${introComplete ? 'hidden' : ''}`}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="intro-rectangle"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={rectangleVariants}
            style={{ left: `${i * 25}%` }} // 각 직사각형의 위치를 다르게 설정
          />
        ))}
      </div>
      <a href="/" className="logo">
        <h1 className="logo">Precise</h1>
      </a>
      <Canvas camera={{ position: [-1.5, 15 , 5], fov: 76, near: 0.1, far: 1000 }}>
        <color attach="background" args={["#ececec"]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[11, 10, 10]} />
        <ScrollControls pages={7} damping={0.4}>
          <Experience />
          <MovingLight />
          <MovingLight opposite={true} />
          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default App;