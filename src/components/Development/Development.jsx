import React from "react";
import GC_Device from "../../assets/hhn_front.png";
import black from "../../assets/hhn_prototype.png";

export default function Development() {
  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      
      {/* Prototype Section */}
      <div className="grid grid-cols-12">
        <div className="md:col-span-2 col-span-12 order-1 md:order-1 flex justify-start items-center flex-col h-full">
          <img
            src={black}
            alt="Device"
            className="h-[150px] object-cover mb-2"
          />
        </div>

        <div className="md:col-span-10 col-span-12 order-2 md:order-2">
          <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Prototype
          </h2>
          <p className="text-justify">
            In order to address the need for indigenous GNSS incorporated
            navigation solutions, DoT tasked Elena Geo to deliver a Handheld
            Device with NavIC based multi GNSS functionalities, through the DCIS
            2022 scheme. Consequently, Elena, through its in house R & D and
            domain expertise, developed the Elena Handheld Navigator Prototype.
          </p>
        </div>
      </div>

      {/* Final Design Section */}
      <div className="grid grid-cols-12">
        <div className="md:col-span-10 col-span-12 order-2 md:order-1">
          <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Final Design
          </h2>
          <p className="text-justify">
            The Elena NavIC Handheld Navigator prototype was put through
            rigorous testing across different terrains and operational
            environments in India. Subsequently, incorporating improvements
            based on feedback from various entities, including the Armed Forces
            user units, who used the product in real-world scenarios, across
            areas with difficult terrain, the final version was developed and
            deployed for user trials. The success of the trials confirms the
            final version of Elena NavIC Handheld Navigator as an all-weather
            device with the greatest reliability and highest precision.
          </p>
        </div>

        <div className="md:col-span-2 col-span-12 order-1 md:order-2 flex justify-start items-center flex-col h-full">
          <img
            src={GC_Device}
            alt="Device"
            className="h-[250px] object-cover mb-2"
          />
        </div>
      </div>
    </div>
  );
}
