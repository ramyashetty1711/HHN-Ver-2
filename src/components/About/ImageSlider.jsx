import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

import NavIC from "../../assets/HOME/NavIC.png";
import Artillery from "../../assets/HOME/Artillery.png";
import GC from "../../assets/HOME/Grid_Converter.png";
import Elena from "../../assets/HOME/Elena.jpeg";

const ImageSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const images = [NavIC, Artillery, GC, Elena];

  return (
    <div className="relative w-full max-w-7xl mx-auto my-6">
      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[60vh] object-contain sm:h-[50vh] md:h-[60vh] rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
