import { OrbitControls } from "@react-three/drei";
import { Background } from "./Background";

import { Text3D } from "@react-three/drei";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <Background />
      <Text3D
        font="./fonts/helvetiker_regular.typeface.json"
        curveSegments={24}
        brevelSegments={1}
        bevelEnabled
        bevelSize={0.08}
        scale={[1, 1, 1]}
        height={0.3}
        lineHeight={0.9}
        letterSpacing={0.1}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        BOOM & BLOOM
      </Text3D>
    </>
  );
};
