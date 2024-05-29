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
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
};

export default Background;
