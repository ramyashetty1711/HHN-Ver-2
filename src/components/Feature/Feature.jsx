import React, { useRef } from "react";
import Slider from "react-slick";
import bgImage from "../../assets/Features_BG.png";
import Adv from "../../assets/Advantages.jpg";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function Feature() {
  const sliderRef = useRef(null);

  const FeatureList = [
    "Displays current location in ESM GR, DSM GR, and Lat-Long formats",
    "Supports display of 6, 8, and 10-digit GR in both ESM and DSM formats",
    "Converts Lat-Long to ESM GR and DSM GR",
    "Converts ESM GR to DSM GR and Lat-Long",
    "Converts DSM GR to ESM GR and Lat-Long",
    "Provides atomic-clock-based accurate timing",
    "Displays mapsheet reference numbers in ESM and DSM formats",
    "Rugged: Confirms to Military Standards",
    "LCD view panel for clear daylight visibility",
    "Small built-in Torch light for night use",
    "IP67 rated",
    "Battery: Normal Operations for 60 hours",
    "Kill button to delete all data securely",
    "Supplied with a waterproof pouch for additional protection",
  ];

  const advantages = [
    "Accurate marking of own and enemy elements on a common grid.",
    "Auto compensation for different zones to ensure accuracy.",
    "Accurate navigation.",
    "Assist target management.",
    "Assist firepower coordination.",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500, // Duration of the transition in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3000, // Time between slides in milliseconds (3 seconds)
  };

  return (
    <div className="relative h-[calc(100vh-13em)]">
      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-2 z-10 text-2xl text-gray-1000 cursor-pointer"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <FaChevronCircleLeft />
      </button>
      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-2 z-10 text-2xl text-gray-1000 cursor-pointer"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaChevronCircleRight />
      </button>

      {/* Slider Component */}
      <Slider ref={sliderRef} {...settings}>
        {/* Slide 1: Features */}
        <div>
  <div
    className="flex flex-col text-white pt-6 px-6 rounded-lg min-h-[calc(100vh-10em)] bg-cover bg-center bg-no-repeat"

  >
    <div className="bg-blue/40 rounded-lg">
      <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
        Features
      </h5>
      <ul className="list-disc px-8 md:h-[40vh] overflow-y-auto custom-scrollbar  grid md:grid-cols-2 grid-cols-1 space-y-2">
        {FeatureList.map((val, index) => (
          <li key={index} className="text-black">
            {val}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>


        {/* Slide 2: Advantages */}
        <div>
          <div
            className="flex flex-col   text-white pt-6 px-6 rounded-lg min-h-[calc(100vh-10em)] bg-cover bg-center bg-no-repeat"
            
          >
            <div className="bg-blue/40 rounded-lg">
              <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
                Advantages
              </h5>
              <ul className="list-disc px-8 h-[50vh] overflow-y-auto custom-scrollbar">
                {advantages.map((val, index) => (
                  <li key={index} className="text-black  mb-6">
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
