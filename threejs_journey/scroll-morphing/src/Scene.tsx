import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useControls } from "leva";
import { bezier } from "@leva-ui/plugin-bezier";
import { R3FPointsFX, R3FPointsFXRefType } from "r3f-points-fx";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion-3d";


type SuzanneResult = GLTF & {
  nodes: {
    Suzanne: THREE.Mesh;
  };
  materials: {};
};

type AmongusResult = GLTF & {
  nodes: {
    crewmate_body: THREE.Mesh;
  };
  materials: {};
};

type DnaResult = GLTF & {
  nodes: {
    BezierCircle: THREE.Mesh;
  };
  materials: {};
};

type TreeResult = GLTF & {
  nodes: {
    Icosphere012: THREE.Mesh;
  };
  materials: {};
};

type logoResult = GLTF & {
  nodes: {
    logo: THREE.Mesh;
  };
  materials: {};
};

type properties = {
  current: number;
};

type R3FPointsFX = {
  modelsArray: THREE.Mesh;
  pointSize: number;
  baseColor: string;
  modelA: THREE.Mesh;
  modelB: THREE.Mesh;
}


function Scene({current}:properties) {

  const logo = useGLTF("logo.glb") as logoResult;
  // const logo2 = useGLTF("logo2.glb") as logo2Result;
  const suzanne = useGLTF("suzanne.glb") as SuzanneResult;
  const amongus = useGLTF("among_us.glb") as AmongusResult;
  const dna = useGLTF("dna.glb") as DnaResult;
  const tree = useGLTF("tree.glb") as TreeResult;

  const meshes = [
    logo.nodes.logo,
    // logo2.nodes.logo,
    tree.nodes.Icosphere012,
    dna.nodes.BezierCircle,
    amongus.nodes.crewmate_body,
    suzanne.nodes.Suzanne,
  ];

  const startTime = useRef(0);
  const progress = useRef(0);
  const FBORef = useRef<R3FPointsFXRefType>(null);
  const previousIndex = useRef<number | null>(null);

  const { duration, curve } = useControls({
    duration: {
      value: 2,
      min: 0,
      max: 9,
      step: 0.1,
    },
    curve: bezier([0.3, 0.8, 0.3, 0.7]),
  });

  const changeModel = () => {
    startTime.current = 0;
    FBORef.current?.setModelB(current);
  };


  useEffect(() => {
    changeModel();
  }, [current]);

  useFrame((state) => {
    if (startTime.current === 0) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;

    progress.current = curve.evaluate(Math.min(elapsed / duration, 1));
    if (progress.current >= 1) {
      FBORef.current?.setModelA(current);
      previousIndex.current = current;
    }

    FBORef.current?.updateProgress(progress.current);
    FBORef.current?.updateTime(state.clock.elapsedTime);
  });


  return (
    <>
      <R3FPointsFX
          modelsArray={meshes}
          pointSize={3.0}
          baseColor="#552674"
          modelA={previousIndex.current}
          modelB={current}
          ref={FBORef}
          uniforms={{
            uColor1: new THREE.Color("#D0BFFF"),
            uColor2: new THREE.Color("#FF4B91"),
            uColor3: new THREE.Color("#FFCD4B"),
          }}
          rotation={[0, -0.8, 0]}
          scale={[2, 2, 2]}

        />
    {/* </motion.group> */}

    </>
  );
}

export default Scene;
