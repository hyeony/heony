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
          <div className='main-title main-title-01' style={{ top: `288vh`, left: '6em', transform: `translate(0%,-50%)` }}>
            Beyound Digital Horizon
          </div>
          <h1 className='main-title main-title-stroke main-title-02' style={{ top: `288vh`, left: '50%', transform: `translate(-40%,-50%)` }}>
          BOOMING IDEAS
          </h1>
          <div className='main-title main-title-03' style={{ top: `311vh`, left: '50%', transform: `translate(-40%,-50%)` }}>
            WEB3
          </div>
          <div className='main-title main-title-stroke main-title-04' style={{ top: `325vh`, left: '50%', transform: `translate(-40%,-50%)` }}>
            TECHNOLOGY
          </div>
        </div>
      </Scroll>
    </>
  );
};
