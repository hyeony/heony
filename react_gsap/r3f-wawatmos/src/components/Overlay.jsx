import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  position: relative;
  height: 55vh; /* 각 섹션의 높이를 설정합니다. */
  width: 100%;
  display: flex;
  flex-direction: column; /* 텍스트를 수직으로 나열 */
  justify-content: center; /* 수직 정렬 */
  padding: 0 7vw; /* 양쪽에 여백을 줍니다. */
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  display: inline-block;
`;

const sections = [
  [],
  [],
  [],
  [
    { text: 'Beyond Digital Horizon', className: 'main-title main-title-01', align: 'left' },
    { text: 'BOOMING IDEAS', className: 'main-title main-title-stroke main-title-02', align: 'left' },
    { text: 'WEB3', className: 'main-title main-title-03', align: 'left' },
    { text: 'TECHNOLOGY', className: 'main-title main-title-stroke main-title-04', align: 'left' }
  ],
  [],
  [
    { text: 'Beyond Digital Horizon', className: 'main-title main-title-01', align: 'right' },
    { text: 'BOOMING IDEAS', className: 'main-title main-title-stroke main-title-02', align: 'right' },
    { text: 'WEB3', className: 'main-title main-title-03', align: 'right' },
    { text: 'TECHNOLOGY', className: 'main-title main-title-stroke main-title-04', align: 'right' }
  ]
];

export const Overlay = () => {
  const scroll = useScroll();

  return (
    <Scroll html style={{ width: '100%' }}>
      {sections.map((section, index) => (
        <Section key={index}>
          {section.map((textItem, textIndex) => (
            <TextContainer key={textIndex} align={textItem.align}>
              <div className={textItem.className}>
                {textItem.text}
              </div>
            </TextContainer>
          ))}
        </Section>
      ))}
    </Scroll>
  );
};
