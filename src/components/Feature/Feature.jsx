import React, { useRef,useEffect } from "react";
import Slider from "react-slick";
import bgImage from "../../assets/Features_BG.png";
import Adv from "../../assets/Advantages.jpg";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function Feature() {
  const sliderRef = useRef(null);
  

  const FeatureList = [
    "Displays current location in ESM GR, DSM GR, and Lat-Long formats.",
    "Converts Lat-Long to ESM GR and DSM GR. ",
    "Converts Lat-Long to ESM GR and DSM GR.",
    "Converts DSM GR to ESM GR and Lat-Long. ",
    "Provides atomic-clock-based accurate timing. ",
    "Displays mapsheet reference numbers in ESM and DSM formats. ",
    "Rugged: Confirms to Military Standards.",
    "LCD view panel for clear daylight visibility.",
    "Small built-in Torch light for night use.",
    "IP67 rated.",
    "Battery: Normal Operations for 60 hours.",
    "Kill button to delete all data securely.",
    "Supplied with a waterproof pouch for additional protection.",
    "Supports display of 6, 8, and 10-digit GR in both ESM and DSM formats.",
  ];

  const advantages = [
    "Accurate marking of own and enemy elements on a common grid.",
    "Auto compensation for different zones to ensure accuracy.",
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
    <div className="flex flex-col h-full bg-white py-3 px-6  overflow-y-auto ">
      {/* Left Arrow */}

      {/* Slider Component */}

      {/* Slide 1: Features */}
      <div>
        <div className="flex flex-col text-white  md:px-6 rounded-lg  bg-cover bg-center bg-no-repeat">
          <div className=" rounded-lg">
            <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
              Features
            </h5>
            <ul className="list-disc md:px-8 px-4  overflow-y-auto custom-scrollbar  grid md:grid-cols-2 grid-cols-1 space-y-2">
              {FeatureList.map((val, index) => (
                <li key={index} className="text-black">
                  {val}
                </li>
              ))}
            </ul>
          </div>
          <div className=" rounded-lg mt-4">
            <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
              Advantages
            </h5>
            <ul className="list-disc md:px-8  px-4 grid md:grid-cols-4  overflow-y-auto custom-scrollbar ">
              {advantages.map((val, index) => (
                <li key={index} className="text-black col-span-2  mb-4">
                  {val}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 2: Advantages */}
    </div>
  );
}
