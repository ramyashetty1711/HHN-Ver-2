import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import NavicCoverage from "../../assets/coverage.png";
import IWG from "../../assets/issues_with_gps.png";
import adv from "../../assets/navic_advntages.png";
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
    <div className="flex flex-col bg-white py-3 px-6 relative w-[99.9%] custom-scrollbar h-full">
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
           
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
              <div className="col-span-12 md:col-span-6 flex justify-center">
                <img
                  src={NavicCoverage}
                  className="w-full h-auto max-h-[400px] object-contain"
                  alt=" NavIC"
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              NavIC
            </h2>
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  NavIC is one of the three globally accepted satellite
                  navigation systems, providing location services with unmatched
                  Accuracy, Availability, Reliability, and Integrity. It is the
                  only system that includes both Geo-synchronous and
                  Geo-stationary satellites and has been declared fully
                  functional since 2011. The constellation consists of 11
                  satellites. Elena Geo Systems specializes in all forms of
                  downstream solutions in the niche segment catering to the
                  Positioning, Navigation, and Timing (PNT) domain.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="">
            
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
              <div className="col-span-12 md:col-span-6 flex justify-center">
                <img
                  src={IWG}
                  className="w-full h-auto max-h-[400px] object-contain"
                  alt="Issue with GPS"
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Issues with GPS - Loss in coverage
            </h2>
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  GPS was designed during the Cold War era to cater primarily to
                  the temperate zones, covering latitudes between approximately
                  55° North and 55° South. The constellation, consisting of
                  Medium Earth Orbiting (MEO) satellites, faces challenges in
                  the equatorial zone due to high ionospheric scintillation. A
                  study by Prof. A. Bose et al. from Burdwan University
                  demonstrated periodic loss of coverage across all existing
                  GNSS systems. In the equatorial zone, this loss in coverage
                  can vary from 20 to 180 minutes within a 24-hour cycle. The
                  figure in the study illustrating loss of coverage uses blue
                  dots to indicate lower loss and yellow dots to indicate higher
                  loss, as explained in the accompanying legend.
                </p>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="">
            
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
              <div className="col-span-12 md:col-span-6 flex justify-center">
                <img
                  src={adv}
                  className="w-full h-auto max-h-[400px] object-contain"
                  alt="NavIC Systems"
                />
              </div>
              <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              NavIC Advantages
            </h2>
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  Continuing the same study by Prof. A. Bose et al., Burdwan
                  University, zero loss in coverage was demonstrated for IRNSS
                  (NavIC). Thus, NavIC ensures continuous availability, highest
                  integrity, complete reliability, and superior accuracy. This
                  makes NavIC especially effective for critical applications in
                  the equatorial region. Its performance is unmatched when
                  compared to other GNSS systems under challenging ionospheric
                  conditions.
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      {/* FAQ Section */}

      <div className="mt-10 flex justify-center items-center">
        <p className="text-lg text-gray-700 mr-2">To know more about NavIC,</p>
        <a
          className="text-[var(--primary)] underline inline-flex items-center"
          href="https://elenageo.com/faq"
          target="_blank"
          title="Visit FAQ"
        >
          visit our site
        </a>
      </div>
    </div>
  );
}
