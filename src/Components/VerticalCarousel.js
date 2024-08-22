import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Slide from "./Slide";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
  height: 100%;
`;

const NavigationButtons = styled.div`
  position: relative;
  display: flex;
  height: 60px;
  margin: 0 auto;
  width: 20%;
  margin-top: 1rem;
  justify-content: space-between;
  z-index: 1000;
`;

const NavBtn = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 3px;
`;

function mod(a, b) {
  return ((a % b) + b) % b;
}

const VerticalCarousel = ({
  slides,
  goToSlide,
  showNavigation,
  offsetRadius = 2,
  animationConfig = { tension: 120, friction: 14 }
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      if (event.keyCode === 38) {
        moveSlide(-1);
      }
      if (event.keyCode === 40) {
        moveSlide(1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);

  const moveSlide = (direction) => {
    setIndex((prevIndex) => mod(prevIndex + direction, slides.length));
  };

  const clampOffsetRadius = (offsetRadius) => {
    const upperBound = Math.floor((slides.length - 1) / 2);
    return Math.min(Math.max(offsetRadius, 0), upperBound);
  };

  const getPresentableSlides = () => {
    let presentableSlides = [];
    const clampedOffsetRadius = clampOffsetRadius(offsetRadius);

    for (let i = -clampedOffsetRadius; i < 1 + clampedOffsetRadius; i++) {
      presentableSlides.push(slides[mod(index + i, slides.length)]);
    }

    return presentableSlides;
  };

  return (
    <>
      <Wrapper>
        {getPresentableSlides().map((slide, presentableIndex) => (
          <Slide
            key={slide.key}
            content={slide.content}
            moveSlide={moveSlide}
            offsetRadius={clampOffsetRadius(offsetRadius)}
            index={presentableIndex}
            animationConfig={animationConfig}
          />
        ))}
      </Wrapper>
      {showNavigation && (
        <NavigationButtons>
          <NavBtn onClick={() => moveSlide(1)}>&#8593;</NavBtn>
          <NavBtn onClick={() => moveSlide(-1)}>&#8595;</NavBtn>
        </NavigationButtons>
      )}
    </>
  );
};

VerticalCarousel.propTypes = {
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      content: PropTypes.object
    })
  ).isRequired,
  goToSlide: PropTypes.number,
  showNavigation: PropTypes.bool,
  offsetRadius: PropTypes.number,
  animationConfig: PropTypes.object
};

export default VerticalCarousel;
