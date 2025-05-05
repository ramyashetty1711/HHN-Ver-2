import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import necessity from "../../assets/necessity_pic.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const steps = [
  {
    title: "Necessity",
    content:
      "This Grid Converter is state-of-the-art positioning equipment made using Elena's multi-GNSS processor, which utilizes NavIC, GPS, and GLONASS to provide one-meter accuracy without any external support. It follows Elena's integrated approach. This equipment serves as a bridge between three reference systems used by the Indian Army, such as the ESM India grid system, the new DSM grid system, and the latitude-longitude (Lat-Long) system. It accurately provides all these reference numbers for the same point in various formats and can convert the reference from one system to another accurately.",
  },
  {
    title: "Problem",
    content:
      "The transition from the Everest Series Maps (ESM) to the Defence Series Maps (DSM) is a complex and long-term process involving a manual effort of printing map sheets and issuing them to various units and formations. It also involves the destruction of old maps and documents that take long years. The transition also affects operational orders, boundary coordination and making it a significant logistical and operational challenge. Moreover, the military will continue to use latitude and longitude (Lat-Long) in various equipment. The Artillery (Arty) units, must use ESM, DSM, and Lat-Long references in their Shakti equipment. As all three reference systems must coexist for critical operations of the units, it created a critical need for a device that can seamlessly convert and display all three reference systems: ESM, DSM, and Lat-Long.",
  },
  {
    title: "Solution",
    content:
      "The DGMO tasked the ADG Mil Svy to suggest a solution. Based on this, representatives of ADG Mil Svy demonstrated a proof of concept device that could show Lat-Long, ESM GR, and DSM GR simultaneously over several points in Delhi. The COAS directed that this be developed into a full device to be used by Arty units.",
  },
];

export default function Necessity() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Necessity
            </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Image Section */}
        <div className="md:col-span-4 col-span-12 flex  justify-center">
          <img
            src={necessity}
            alt="Necessity"
            className="w-full max-w-md h-auto md:h-[300px] object-contain rounded-xl"
          />
        </div>

        {/* Slider Section */}
        <div className="md:col-span-8 col-span-12  flex  justify-center w-full">
          <div className="w-full  relative">
            <Slider {...settings}>
              {steps.map((step, index) => (
                <div key={index} className="flex justify-center">
                  <div className="bg-white  w-full h-auto max-w-3xl mx-auto ">
                    <h2 className="text-xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
                      {step.title}
                    </h2>
                    <p className="leading-relaxed text-justify">{step.content}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-50 left-0 top-1/2 transform -translate-y-1/2 cursor-pointer sm:left-4 md:left-2 lg:left-4 bg-black rounded-4xl p-1"
      onClick={onClick}
      aria-label="Previous"
    >
      <FaChevronLeft color="white" size={12} />
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-50 right-0 top-1/2 transform -translate-y-1/2 cursor-pointer sm:right-4 md:right-2 lg:right-4 bg-black rounded-4xl p-1"
      onClick={onClick}
      aria-label="Next"
    >
      <FaChevronRight color="white" size={12} />
    </div>
  );
};


