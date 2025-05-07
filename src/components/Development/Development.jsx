import React from "react";
import GC_Device from "../../assets/hhn_front.png";
import black from "../../assets/hhn_prototype.png";
import { FaArrowCircleDown } from "react-icons/fa";

export default function Development() {
  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 ">
        <div className="md:col-span-4 col-span-12 flex justify-start items-center flex-col h-full ">
          <img
            src={black}
            alt="Device"
            className="w-[100px] object-cover mb-2"
          />
         
        </div>

        <div className=" md:col-span-8 col-span-12">
          {/* <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Proof of Concept (POC) Demonstrated to COAS
          </h2>
          <p className="text-justify">
            Arty units, use ESM, DSM, and Lat-Long references in their Shakti
            Equipment. The Grid converter facilitates the migration from ESM to
            DSM without inhibiting the modernization of Artillery systems, to
            keep pace with the latest miltech, including automation of fire
            control systems. The initial Proof of Concept (POC) device,
            demonstrated to the Chief of Army Staff (COAS), was a basic
            prototype designed specifically for a single zone (Delhi). This
            simplified version served as a feasibility demonstration, showcasing
            the potential for grid conversion functionality.
          </p> */}

          <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Prototype
          </h2>
          <p className="text-justify ">
            This is a culmination of Elena Geo's Effort from 2022, whence we
            were identified with DCIS Scheme 22 by Department of
            Telecommunication and were funded to develop our Handheld Navigator
            Device.
          </p>
          
        </div>
      </div>

      <div className="grid grid-cols-12 ">
        
        <div className=" md:col-span-8 col-span-12">
          {/* <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Proof of Concept (POC) Demonstrated to COAS
          </h2>
          <p className="text-justify">
            Arty units, use ESM, DSM, and Lat-Long references in their Shakti
            Equipment. The Grid converter facilitates the migration from ESM to
            DSM without inhibiting the modernization of Artillery systems, to
            keep pace with the latest miltech, including automation of fire
            control systems. The initial Proof of Concept (POC) device,
            demonstrated to the Chief of Army Staff (COAS), was a basic
            prototype designed specifically for a single zone (Delhi). This
            simplified version served as a feasibility demonstration, showcasing
            the potential for grid conversion functionality.
          </p> */}

          
          <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Final Design
          </h2>
          <p className="text-justify ">
            The Elena NavIC Handheld Navigator has undergone rigorous testing
            across different terrains and operational environments in India. The
            feedback from the Defence units that have used the product in
            real-world scenarios, including areas with difficult terrain,
            confirms its reliability and precision to develop the device to
            its final design.
          </p>
        </div>
        <div className="md:col-span-4 col-span-12 flex justify-start items-center flex-col h-full ">
         
          <img
            src={GC_Device}
            alt="Device"
            className="w-[140px] object-cover"
          />
        </div>

      </div>

      {/* Grid Section */}
    </div>
  );
}
