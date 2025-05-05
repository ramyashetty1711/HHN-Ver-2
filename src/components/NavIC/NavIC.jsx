import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import NavicCoverage from "../../assets/coverage.png";
import IWG from '../../assets/issues_with_gps.png';
import adv from '../../assets/navic_advntages.png';
import NavICFAQ from "./NavICFAQ";

export default function NavIC() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    ref: sliderRef,
  };

  return (
    <div className="flex flex-col bg-white py-3 px-6 relative">
      {/* Slider Container */}
      <div className="relative">
        {/* Custom Previous Arrow */}
        <button
          className="absolute top-1/2 left-0 z-10 text-2xl text-gray-1000"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <FaChevronCircleLeft />
        </button>

        {/* Custom Next Arrow */}
        <button
          className="absolute top-1/2 right-0 z-10 text-2xl text-gray-1000"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <FaChevronCircleRight />
        </button>

        <Slider {...settings}>
          {/* Slide 1: NavIC */}
          <div className="">
                     <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
                     NavIC

                     </h2>
                     <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
                     <div className="col-span-12 md:col-span-6 flex justify-center">
                         <img
                           src={NavicCoverage}
                           className="w-full h-auto max-h-[400px] object-contain"

                           alt=" NavIC"
                         />
                       </div>
                       <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                         <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                         NavIC, Navigation with Indian Constellation, is a Global Navigation
                Satellite System which is the third system in the world to give location
                services and the best of its kind in providing accurate, reliable data
                all round the clock without any break. This system has been fully
                functional since June 2019. Currently, 11 navigation satellites can be
                used by the public for efficient monitoring applications. Elena Geo
                works only in this niche segment.

                         </p>
                       </div>
         
                       
                     </div>
                   </div>
         
                   {/* Slide 2 */}
                   <div className="">
                     <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
                     Issues with GPS - Loss in coverage
                     </h2>
                     <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
                     <div className="col-span-12 md:col-span-6 flex justify-center">
                         <img
                           src={adv}
                           className="w-full h-auto max-h-[400px] object-contain"

                           alt="Issue with GPS"
                         />
                       </div>
                       <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                         <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                         This study by Prof A Bose et al, Burdwan University shows that there is
                a loss in coverage of all existing GNSS systems other than IRNSS for at
                least 20 minutes, and can be up to 180 minutes, along the equatorial belt
                in a 24-hour cycle. Each dot represents a loss of coverage as per the
                legend over the area it is marked.

                         </p>
                       </div>
         
                      
                     </div>
                   </div>
         
                   {/* Slide 3 */}
                   <div className="">
                     <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
                     NavIC Advantages

                     </h2>
                     <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
                     <div className="col-span-12 md:col-span-6 flex justify-center">
                         <img
                           src={IWG}
                           className="w-full h-auto max-h-[400px] object-contain"

                           alt="NavIC Systems"
                         />
                       </div>
                       <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
                         <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                         In the earlier study (pictured above) by Prof A Bose et al, Burdwan
                University, when IRNSS is included, the Indian region does not have any
                loss in coverage throughout the day. Hence, using this system, we can now
                provide 24/7 navigation and monitoring systems.

                         </p>
                       </div>
         
                       
                     </div>
                   </div>
        </Slider>
      </div>

      {/* FAQ Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
          FAQ
        </h2>
        <NavICFAQ />
      </div>
    </div>
  );
}
