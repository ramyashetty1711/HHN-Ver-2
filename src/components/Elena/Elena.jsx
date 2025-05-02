import React from "react";
import journey from "../../assets/journey.png";
import e2e from "../../assets/e2e.png";
import { FiExternalLink } from "react-icons/fi";

function Elena() {
  return (
    <>
      <div className=" mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold text-[var(--heading)] my-2 flex justify-center">
            Our Journey
          </h2>
        {/* Journey Section - 2 Column Layout */}
        <div className="grid grid-cols-12  gap-6 mt-4">
          {/* Left: Image */}
          <div className="flex justify-center col-span-6">
            <img
              src={journey}
              className="max-h-[500px] max-w-[600px] rounded-lg"
              alt="Elena Journey"
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center col-span-6">
            <p className="text-justify text-lg pr-10 pb-5">
              Elena Geo was founded at Technology Business Incubator (TBI) at IIT
              Kharagpur in 2012 and has quickly emerged as a pioneer in navigation
              technology. Here's a brief look at its journey:
           
            </p>
          </div>
        </div>

        {/* Elena for NavIC Section - 2 Column Layout */}
        <h2 className="text-3xl font-bold text-[var(--heading)] my-2 flex justify-center">
            Elena for NavIC
          </h2>
        <div className="grid grid-cols-12 gap-6 mt-4">
          {/* Left: Image */}
          

          {/* Right: Content */}
          <div className="flex flex-col justify-center col-span-8">
            <p className="text-justify text-lg pr-10 pb-5">
              Elena Geo has designed and developed NavIC products which are large
              in range and depth to cater to all types of user segments. It has
              products for research domains and high-precision applications.
              Elena's multitude of products ranges from a dual-band antenna to a
              complex system, customized to the user's requirements. The products
              bring full GNSS services to user applications with all the
              advantages of NavIC such as Availability, Accuracy, Reliability, and
              Integrity.
            </p>
          </div>
          <div className="flex justify-center col-span-4">
            <img
              src={e2e}
              className="rounded-lg max-h-[400px] max-w-[400px] "
              alt="Elena Journey"
            />
          </div>
        </div>

        <a
          href="http://elenageo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[var(--primary)] flex items-center justify-center mb-3 hover:text-blue-600 transition-all underline"
        >
          Visit Elena <FiExternalLink size={20} className="ms-2" />
        </a>
      </div>
    </>
  );
}

export default Elena;
