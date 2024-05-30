import { Environment, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export const Background = () => {
  return (
    <>
      <Environment background preset="sunset" />
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>  {/* Increase the scale */}
        <meshStandardMaterial
          color={"red"}
          emissive={"white"}
          emissiveIntensity={0.45}
          metalness={0.4}
          roughness={0.6}
          side={THREE.BackSide}
        />
      </Sphere>
      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.3} luminanceSmoothing={0.8} />
      </EffectComposer>
    </>
  );
};

export default Background;   
