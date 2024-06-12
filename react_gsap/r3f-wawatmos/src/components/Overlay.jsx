import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

const Section = styled.div`
  position: relative;
  height: 90vh;
  width: 100%;
  padding: 0 7vw;
  box-sizing: border-box;
`;

const TextContainer = styled.div`
  display: block;
  overflow: hidden;
`;

const Text = styled(motion.div)`
  transform: translateY(100%); /* 처음에는 숨겨진 상태로 설정 */
  opacity: 0; /* 처음에는 투명 상태로 설정 */
`;

const sections = [
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

const textVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export const Overlay = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({
        y: scrollY * -0.1, // 스크롤에 따라 텍스트의 y 위치를 조정
        transition: { type: 'spring', stiffness: 50 },
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <div style={{ width: '100%' }}>
      {sections.map((section, sectionIndex) => (
        <Section key={sectionIndex} className={`${sectionIndex === 0 ? 'first-section' : ''} ${sectionIndex === sections.length - 1 ? 'last-section' : ''}`}>
          {section.map((textItem, textIndex) => {
            const flatIndex = sectionIndex > 0 ? textIndex + sections[1].length * (sectionIndex - 1) : textIndex;
            return (
              <TextContainer key={textIndex}>
                <Text 
                  className={`text-${flatIndex} ${textItem.className}`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={textVariants}
                >
                  {textItem.text}
                </Text>
              </TextContainer>
            );
          })}
        </Section>
      ))}
    </div>
  );
};
