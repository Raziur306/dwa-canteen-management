import React from "react";
import CustomSlider from "./CustomSlider";

const sliderImages = ["/img_slider_1.jpg", "/img_slider_2.jpg"];

const HeroSection = () => {
  return <CustomSlider images={sliderImages} />;
};

export default HeroSection;
