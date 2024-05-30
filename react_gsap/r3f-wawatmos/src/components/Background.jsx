import { Environment, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import ParticleSystem from "./ParticleSystem";

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
      <ParticleSystem />
    </>
  );
};

export default Background;   
