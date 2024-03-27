import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Interface } from "./components/Interface";
import Scene from "./Scene";
import { useState } from "react";
import { Menu } from "./components/Menu"

interface prop {
  current: number,
  changeModel: (current:number) => void
}


function Experience(props :prop) {
  const {current, changeModel} = props

  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <>
      <div className=" w-screen h-screen fixed z-0 ">
        <Canvas
          className="h-screen w-screen"
          gl={{
            powerPreference: "high-performance",
            toneMapping: THREE.NoToneMapping,
          }}
          dpr={[1, 2]}
        >

              <Scene current={current} />
        </Canvas>
      </div>

      <Menu menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
      <Interface  changeModel={changeModel} />
    </>
  );
}

export default Experience;
