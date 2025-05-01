import React, { useRef } from "react";
import Slider from "react-slick";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import GC1 from "../../assets/GC/GC_1.png";
import GC2 from "../../assets/GC/GC_2.png";
import GC3 from "../../assets/GC/GC_3.png";
import GC4 from "../../assets/GC/GC_4.png";

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
    arrows: false, // Disable default arrows
  };

  const images = [GC4, GC2, GC1, GC3];

  return (
    <div className="relative w-full max-w-2xl mx-auto my-3 h-full ">
      {/* Custom Arrows */}
      {/* <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute top-[40%] left-[20%] z-10 transform -translate-y-1/2 !bg-white p-2 rounded-full shadow hover:bg-gray-200"
      >
        <FaChevronCircleLeft />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute top-[40%] right-[20%] z-10 transform -translate-y-1/2 !bg-white py-1 rounded-full shadow hover:bg-gray-200"
      >
        <FaChevronCircleRight />
      </button> */}

      <Slider ref={sliderRef} {...settings}>
        {images.map((src, index) => (
          <div
            key={index}
            className=" justify-center place-content-center place-items-center"
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-[250px] rounded-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
