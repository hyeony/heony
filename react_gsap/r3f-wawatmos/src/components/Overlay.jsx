import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from 'gsap';
import React, { useRef, useLayoutEffect } from 'react';
import { ReactComponent as MainTitle } from '../assets/Pantom.svg'; // SVG 파일을 React 컴포넌트로 가져오기
import styled from 'styled-components';

export const MainTitleStyled = styled(MainTitle)`
  object-fit: cover;
`;

export const Overlay = () => {
  const scroll = useScroll();
  const tl = useRef();

  // useFrame((state, delta) => {
  //   tl.current.seek(scroll.offset * tl.current.duration());
  // });

  useFrame(() => {});

  return (
    <>
      <Scroll html style={{ width: '100%' }}>
        <div className='main'>
          <div className='main-title main-title-01' style={{ top: `188vh`,  left: '7vw', }}>
            Beyound Digital Horizon
          </div>
          <h1 className='main-title main-title-stroke main-title-02' style={{ top: `188vh`, left: `7vw` }}>
          BOOMING IDEAS
          </h1>
          <div className='main-title main-title-03' style={{ top: `211vh`, left: `7vw` }}>
            WEB3
          </div>
          <div className='main-title main-title-stroke main-title-04' style={{ top: `225vh`, left: `7vw` }}>
            TECHNOLOGY
          </div>

          <div className='main-title main-title-01' style={{ top: `365vh`, right: '6vw' }}>
            Beyound Digital Horizon
          </div>
          <h1 className='main-title main-title-stroke main-title-02' style={{ top: `362vh`,   right: '6vw' }}>
          BOOMING IDEAS
          </h1>
          <div className='main-title main-title-03' style={{ top: `385vh`,  right: '6vw' }}>
            WEB3
          </div>
          <div className='main-title main-title-stroke main-title-04' style={{ top: `400vh`, right: '6vw' }}>
            TECHNOLOGY
          </div>
        </div>
      </Scroll>
    </>
  );
};
