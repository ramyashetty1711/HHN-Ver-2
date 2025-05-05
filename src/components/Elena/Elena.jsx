import React, { useRef } from "react";
import journey from "../../assets/journey.png";
import e2e from "../../assets/e2e.png";
import defence from "../../assets/elena_for_defece.jpeg";
import hhn from "../../assets/hhn.jpeg";
import { FiExternalLink } from "react-icons/fi";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Elena() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Disable default arrows
  };

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      {/* Section 1: Our Journey */}
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
        Our Journey
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-4">
        <div className="flex justify-center col-span-12 md:col-span-6">
          <img
            src={journey}
            className="max-h-[500px] max-w-[600px] rounded-lg"
            alt="Elena Journey"
          />
        </div>
        <div className="flex flex-col justify-center col-span-12 md:col-span-6">
          <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
            Elena Geo was founded for developing NavIC-based monitoring Systems.
            It works only in this niche segment and has been marketing solutions
            since 2013. It has End-to-End presence in the NavIC-based PNT
            domain. Elena Geo distinguishes itself by providing unique and
            forefront services within the industry.
            <br />
            <br />
            Elena Geo embarked on its journey with a distinct vision to address
            India's navigation needs through the development of ground-based
            electronics and solutions utilizing Indian satellites. The choice of
            the name "Elena" reflects the company's commitment to guiding and
            illuminating new paths, aligning with its overarching goal.
            <br />
            <br />
            Elena Geo delivers a diverse range of products and services tailored
            to the NavIC-based navigation sector. The core principles of these
            solutions lie in a commitment to achieving the utmost accuracy,
            pioneering technology, and affordability.
          </p>
          <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
            Elena Geo was founded at Technology Business Incubator (TBI) at IIT
            Kharagpur in 2012 and has quickly emerged as a pioneer in navigation
            technology. Here's a brief look at its journey.
          </p>
        </div>
      </div>

      {/* Section 2: Elena for NavIC - Slider */}
      <div className="relative">
        {/* Custom Previous Arrow */}
        <button
          className="absolute top-1/2 left-2 z-10 text-2xl text-gray-1000 transform -translate-y-1/2"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <FaChevronCircleLeft />
        </button>

        {/* Custom Next Arrow */}
        <button
          className="absolute top-1/2 right-2 z-10 text-2xl text-gray-1000 transform -translate-y-1/2"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <FaChevronCircleRight />
        </button>

        <Slider ref={sliderRef} {...settings}>
          {/* Slide 1 */}
          <div className="">
            <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Elena for NavIC
            </h2>
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
            <div className="col-span-12 md:col-span-4 flex justify-center">
                <img
                  src={e2e}
                  className="w-full h-auto max-h-[400px] object-contain"

                  alt="Elena for NavIC"
                />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  Elena Geo has designed and developed NavIC products which are
                  large in range and depth to cater to all types of user
                  segments. It has products for research domains and
                  high-precision applications. Elena's multitude of products
                  ranges from a dual-band antenna to a complex system,
                  customized to the user's requirements. The products bring full
                  GNSS services to user applications with all the advantages of
                  NavIC such as Availability, Accuracy, Reliability, and
                  Integrity.
                </p>
              </div>

              
            </div>
          </div>

          {/* Slide 2 */}
          <div className="">
            <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Elena for Atma Nirbharta
            </h2>
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
            <div className="col-span-12 md:col-span-4 flex justify-center">
                <img
                  src={hhn}
                  className="w-full h-auto max-h-[400px] object-contain"

                  alt="NavIC Systems"
                />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  As the only Indian company that provides complete NavIC-based
                  solutions, Elena Geo demonstrates unmatched expertise,
                  reliability, and innovation in this niche sector. The
                  company's alignment with the government's Atma Nirbharta
                  (self-reliance) initiative further accelerates the
                  commercialization of Indian navigation systems. Elena Geo
                  keeps a stock of 10000 nos of NavIC processor so as to cater
                  to the Indian market demand, especially the defence sector so
                  that there is no dearth of supply of NavIC processors. The use
                  of these products and technology shall account towards a huge
                  import savings to the Govt Exchequer, approximately to the
                  tune of Rs 1000 Crores. Elena Geo has conceived and developed
                  NavIC Atomic Clock and NavIC Navigator using 5G under the DCIS
                  scheme sponsored by DoT in 2021 and 2022 respectively
                </p>
              </div>

            
            </div>
          </div>

          {/* Slide 3 */}
          <div className="">
            <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Elena for Defence
            </h2>
            <div className="grid grid-cols-12 gap-6 items-start mt-4 w-full">
            <div className="col-span-12 md:col-span-4 flex justify-center">
                <img
                  src={defence}
                  className="w-full h-auto max-h-[400px] object-contain"

                  alt="NavIC Systems"
                />
              </div>
              <div className="col-span-12 md:col-span-8 flex flex-col justify-center">
                <p className="text-justify text-lg pr-0 md:pr-10 pb-5">
                  Elena Geo developed and supplied many state-of-the-art
                  products to the Indian Defence Forces. Some details are given
                  below:- 427 nos of Army Reference Stations (as shown in the
                  image below) have been inducted, through BEL into every
                  infantry battalion as a subsystem of the "Thermal Imager -
                  Integrated Observation Equipment" (TI-IOE) system. 79 nos of
                  NavIC Receivers have been supplied to Army through BEL. 14 nos
                  of Marine Receivers have been supplied, through Goa Shipyard
                  Ltd, for Patrol Boats which are being operated by Army in
                  Pangong Tso Lake, Kachchh, and other locations. Intelligent
                  Vehicle Tracking System supplied to various units of the Army
                  including ASC Centre & College, Bengaluru. 36 nos of Handheld
                  Navigators have been supplied to Officers Training Academy,
                  Chennai, for training of Gentleman Cadets. A bridge unit to
                  give Lat Long ESM Grid Reference and DSM Grid Reference has
                  been developed in close coordination with the Army Mapping
                  agency and Arty Dte. This is being issued as a companion to
                  Gun firing and Communication Nodes. Elena is currently
                  pursuing many R&D projects for the Indian Armed Forces.
                </p>
              </div>

              
            </div>
          </div>
        </Slider>

        {/* Link */}
        <div className="mt-10">
          <a
            href="http://elenageo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[var(--primary)] flex items-center justify-center  hover:text-blue-600 transition-all underline"
          >
            Visit Elena <FiExternalLink size={20} className="ms-2" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Elena;
