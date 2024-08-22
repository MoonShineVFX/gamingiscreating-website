import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useSpring, animated } from "react-spring";
import { withGesture } from "react-with-gesture";

const SlideContainer = styled(animated.div)`
  position: absolute;
  top: 0%
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  height:50%;
`;

const SlideCard = styled.div`
  position: relative;
  width: 160px;
  background: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: 50% 50%;
  border-radius: 8px;
  cursor:pointer;
`;

function Slide({
  content,
  offsetRadius,
  index,
  animationConfig,
  moveSlide,
  delta,
  down,
  up
}) {
  const offsetFromMiddle = index - offsetRadius;
  const totalPresentables = 2 * offsetRadius + 1;
  const distanceFactor = 1 - Math.abs(offsetFromMiddle / (offsetRadius + 1));

  const styles = {
    0: {
      transform: "translateX(0%) translateY(-41.7%) scale(0.8)",
      top: "22%",
      opacity: 0
    },
    1: {
      transform: "translateX(0%) translateY(-75%) scale(0.85)",
      top: "42%",
      opacity: 0.85
    },
    2: {
      transform: "translateX(0%) translateY(-65%) scale(0.9)",
      top: "44%",
      opacity: 0.9
    },
    3: {
      transform: "translateX(0%) translateY(-55%) scale(0.95)",
      top: "47%",
      opacity: 0.95
    },
    4: {
      transform: "translateX(0%) translateY(-45%) scale(1)",
      top: "50%",
      opacity: 1
    },
    5: {
      transform: "translateX(0%) translateY(-35%) scale(0.95)",
      top: "51%",
      opacity: 0.95
    },
    6: {
      transform: "translateX(0%) translateY(-25%) scale(0.9)",
      top: "52%",
      opacity: 0.9
    },
    7: {
      transform: "translateX(0%) translateY(-15%) scale(0.85)",
      top: "52.5%",
      opacity: 0.85
    },
    8: {
      transform: "translateX(0%) translateY(-65%) scale(0.8)",
      top: "74%",
      opacity: 0
    },
    9: {
      transform: "translateX(0%) translateY(-35%) scale(0.85)",
      top: "80%",
      opacity: 0.8
    },
    10: {
      transform: "translateX(0%) translateY(-25%) scale(0.9)",
      top: "82%",
      opacity: 0.9
    },
    11: {
      transform: "translateX(0%) translateY(-20%) scale(0.95)",
      top: "85%",
      opacity: 0.95
    },
    12: {
      transform: "translateX(0%) translateY(-15%) scale(1)",
      top: "88%",
      opacity: 1
    },
    13: {
      transform: "translateX(0%) translateY(-10%) scale(0.95)",
      top: "89%",
      opacity: 0.95
    },
    14: {
      transform: "translateX(0%) translateY(-5%) scale(0.9)",
      top: "90%",
      opacity: 0.9
    },
    15: {
      transform: "translateX(0%) translateY(0%) scale(0.85)",
      top: "92%",
      opacity: 0.85
    }
  };
  
  
  const offsetCardClick = (i) => {
    console.log(i);
  };

  const translateYoffset =
    50 * (Math.abs(offsetFromMiddle) / (offsetRadius + 1));
  let translateY = -0;

  if (offsetRadius !== 0) {
    if (index === 0) {
      translateY = 0;
    } else if (index === totalPresentables - 1) {
      translateY = -100;
    }
  }

  if (offsetFromMiddle === 0 && down) {
    translateY += delta[1] / (offsetRadius + 1);
    if (translateY > -40) {
      moveSlide(-1);
    }
    if (translateY < -100) {
      moveSlide(1);
    }
  }
  if (offsetFromMiddle > 0) {
    translateY += translateYoffset;
  } else if (offsetFromMiddle < 0) {
    translateY -= translateYoffset;
  }

  const springStyles = useSpring({
    ...styles[index],
    config: animationConfig
  });

  return (
    <SlideContainer
      style={{
        ...springStyles,
        zIndex: Math.abs(Math.abs(offsetFromMiddle) - 10)
      }}
      onClick={() => moveSlide(offsetFromMiddle)}
    >
      <SlideCard>{content}</SlideCard>
    </SlideContainer>
  );
}

export default withGesture()(Slide);
