import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

import NavIC from "../../assets/HOME/NavIC.png";
import Artillery from "../../assets/HOME/Areas.png";
import GC from "../../assets/HOME/HHN.png";
import Elena from "../../assets/HOME/Elena.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const images = [Elena, NavIC, GC, Artillery];

  return (
    <div className="relative w-full  overflow-hidden  h-[calc(100vh-16em)] ">
      <button
        className="absolute top-1/2 left-2 z-10 text-2xl text-gray-1000 text-white md:text-white cursor-pointer"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <FaChevronCircleLeft />
      </button>
      <button
        className="absolute top-1/2 right-2 z-10 text-2xl text-gray-1000 cursor-pointer text-white md:text-white"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronCircleRight />
      </button>

      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <div className="flex justify-center items-center h-[calc(100vh-15em)]">
              <img
                src={src}
                alt={`Image-${index}`}
                className="w-full h-full object-contain mx-auto"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
