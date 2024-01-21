// CustomSlider.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderContent = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  min-width: 100%;
  max-height: 70vh;
  position: relative;
  background: gray;
  & img {
    mix-blend-mode: multiply;
  }
`;

const TitleWrapper = styled.div`
  position: absolute;
  width: 50%;
  color: white;
  left: 10%;
  top: 30%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & h1 {
    font-size: 3rem;
    text-transform: uppercase;
    font-weight: 500;
  }
  & a {
    display: flex;
    padding: 10px;
    width: 150px;
    height: 40px;
    color: #0e1927;
    background: linear-gradient(160deg, #e6c9a2 50%, #fff 50%);
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    font-size: 1.2rem;
    transition: background 0.3s ease-in-out;
    font-weight: 400;
    &:hover {
      background: linear-gradient(160deg, #e6c9a2 100%, #fff 0%);
    }
  }
`;

const CustomSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <Container>
      <SliderContent
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {images.map((image, index) => (
          <Slide key={index}>
            <TitleWrapper>
              <h1>
                It&apos;s time to enjoy
                <br />
                the finer things in life.
              </h1>
              <p>
                Craving some delicious Paris food? Maybe you&apos;re in the mood
                for a juicy steak? No matter what kind of meal you have in mind.
              </p>
              <Link href={"#foods"}>Order Now</Link>
            </TitleWrapper>
            <div className="relative aspect-[1/1] h-full w-full">
              <Image fill src={image} alt={`slide-${index}`} />
            </div>
          </Slide>
        ))}
      </SliderContent>
    </Container>
  );
};

export default CustomSlider;
