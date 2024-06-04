import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from 'gsap'
import React, { useRef,useLayoutEffect } from 'react'


export const Overlay = () => {
  const scroll = useScroll()
  const tl = useRef()

  // useFrame((state, delta)=>{
  //   tl.current.seek(scroll.offset * tl.current.duration())
  // })

  useFrame(() => {

  });

  return (
    <>
      <Scroll html style={{width: '100%'}}>
        <div className='main'>
          <div className='main-title main-title-01' style={{ position: 'absolute', top: `285vh`,left: '50%', fontSize: '4em', transform: `translate(-135%,-50%)` }}>
            BloomANDBloom
          </div>
          <h1 className='main-title main-title-02' style={{ position: 'absolute', top: `288vh`,left: '50%', fontSize: '10em', transform: `translate(-80%,-50%)` }}>
TEST
          </h1>
          <div className='main-title main-title-03' style={{ position: 'absolute', top: `315vh`,left: '50%', fontSize: '10em', transform: `translate(-61%,-50%)` }}>TECHNOLOGY</div>


            <div className='row' style={{ position: 'absolute', top: `330vh`}}>
              <div className='col' style={{ position: 'absolute', right: `40px`, width: "540px"}}>
                <h2 style={{ maxWidth: "440px" }}>Tech-Savvy Side</h2>
                <p style={{ maxWidth: '440px' }}>Featuring a sleek, metallic design inspired by advanced technology, this aftershave bottle is as stylish as it is functional. But it's not just a pretty face - inside, you'll find a nourishing and protective aftershave formula that will leave your skin feeling refreshed and hydrated.</p>
                <button>Read more</button>
              </div>
            </div>

            {/* <h2 style={{ position: 'absolute', top: '450vh', left: '50%', transform: `translate(-50%,-50%)` }}>Cutting-Edge of Grooming</h2>

            <button style={{ position: 'absolute', top: `690vh`,left: '50%', transform: `translate(-50%,-50%)` }}>Buy now</button> */}
        </div>
      </Scroll>
    </>
  );
};
