import React from "react";
import NavICFAQ from "./NavICFAQ.jsx";
import NavicCoverage from "../../assets/coverage.png";
export default function NavIC() {
  return (
   
    <div className="flex flex-col max-w-full  font-semibold text-lg text-gray-600  pt-6 px-6 pb-3 rounded-lg h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
     <div className=" ">
     <h5 className="text-2xl  mb-4 flex justify-center text-[var(--heading)]">NavIC</h5>
      <p className="px-4 font-medium pb-8 text-md">
        NavIC, Navigation with Indian Constellation, is a Global Navigation
        Satellite System which is the third system in the world to give location
        services and the best of its kind in providing accurate, reliable data
        all round the clock without any break. This system has been fully
        functional since June 2019. Currently, 11 navigation satellites can be
        used by the public for efficient monitoring applications. Elena Geo
        works only in this niche segment.
      </p>

      </div>
      <div className="flex justify-center my-2">
  <img src={NavicCoverage} className="w-[700px] h-[400px] " />
</div>

      <h5 className="text-2xl mb-4 flex justify-center text-[var(--heading)]">
        Issues with GPS - Loss in coverage
      </h5>
      <div className="px-4 font-medium pb-8 text-md">
        This study by Prof A Bose et al, Burdwan University shows that there is
        a loss in coverage of all existing GNSS systems other than IRNSS for at
        least 20 minutes, can be up to 180 minutes, along the equatorial belt,
        in 24 Hrs cycle. Each dot represents a loss of coverage as per the
        legend over the area it is marked.
      </div>
      <h5 className="text-2xl  mb-4 flex justify-center text-[var(--heading)]">NavIC ADVANTAGES</h5>
      <div className="px-4 font-medium pb-8 text-md">
        In the earlier study (pictured above) by Prof A Bose et al, Burdwan
        University, when IRNSS is included, the Indian region does not have any
        loss in coverage all through the day. Hence, using this we can now put
        up 24/7 navigation and monitoring systems
      </div>
      <h5 className="text-2xl  mb-4 flex justify-center text-[var(--heading)]">NavIC FAQ</h5>
      <NavICFAQ />
    </div>
  );
}
