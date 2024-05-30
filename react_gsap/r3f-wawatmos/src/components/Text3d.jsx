import React, { useRef, useEffect } from 'react';
import { Text3D, useScroll } from '@react-three/drei';
const TextComponent = () => {
  const textMaterialRef = useRef();

  return(
    <group>
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        position={[-6, 0, 0]}
        curveSegments={24}
        brevelSegments={10}
        bevelEnabled
        bevelSize={0.08}
        scale={[1, 1, 1]}
        height={0.3}
        lineHeight={0.9}
        letterSpacing={0.1}
        anchorX="center" // default
        anchorY="middle" // default
        rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
      >
        BOOM
        <meshPhysicalMaterial
            ref={textMaterialRef}
            attach="material"
            color="white"
            metalness={0}
            roughness={0.8}  // 거칠기 값을 높여 텍스트가 덜 반사되도록 함
            envMapIntensity={0.01}  // 환경 맵 반사 강도를 낮춤
        />
      </Text3D>
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        position={[-1.3, 0, 0]}
        curveSegments={35}
        brevelSegments={10}
        bevelEnabled
        bevelSize={0.08}
        scale={[1, 1, 1]}
        height={0.1}
        lineHeight={0.9}
        letterSpacing={0.1}
        color="pink" // &의 색상을 핑크로 설정
        anchorX="center" // default
        anchorY="middle" // default
        rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
      >
        &
        <meshStandardMaterial attach="material" color="pink" metalness={1.3} roughness={0.1} />
      </Text3D>
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        curveSegments={24}
        brevelSegments={10}
        bevelEnabled
        bevelSize={0.08}
        scale={[1, 1, 1]}
        height={0.3}
        lineHeight={0.9}
        letterSpacing={0.1}
        anchorX="center" // default
        anchorY="middle" // default
        rotation={[-Math.PI / 2, 0, 0]}  // Y축을 기준으로 45도 회전
      >
        BLOOM
      </Text3D>
    </group>
  )
}

export default TextComponent;