import React from "react";
import GC_Device from "../../assets/hhn_front.png";
import black from "../../assets/hhn_prototype.png";
import v1 from "../../assets/version_1.png";
import v2 from "../../assets/version_2.jpeg";
import v3 from "../../assets/version_3.jpeg";
import v4 from "../../assets/version_4.jpeg";

export default function Development() {
  return (
    <div className="flex flex-col bg-white py-6 px-6 h-full overflow-y-auto custom-scrollbar">
      {/* Prototype + Final Design Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Prototype Section */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2 text-center">
            Prototype
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3 flex justify-center items-center">
              <img
                src={black}
                alt="Prototype Device"
                className="h-[200px] object-contain rounded-lg"
              />
            </div>
            <div className="md:col-span-9">
              <p className="text-justify leading-relaxed">
                In order to address the need for indigenous GNSS incorporated
                navigation solutions, DoT tasked Elena Geo to deliver a Handheld
                Device with NavIC based multi GNSS functionalities, through the
                DCIS 2022 scheme. Consequently, Elena, through its in house
                R & D and domain expertise, developed the Elena Handheld
                Navigator Prototype.  
              </p>
            </div>
          </div>
        </div>

        {/* Final Design Section */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-2 text-center">
            Final Design
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3 flex justify-center items-center">
              <img
                src={GC_Device}
                alt="Final Device"
                className="h-[200px] object-contain rounded-lg"
              />
            </div>
            <div className="md:col-span-9">
              <p className="text-justify leading-relaxed">
                The Elena NavIC Handheld Navigator prototype was put through
                rigorous testing across different terrains and operational
                environments in India. Subsequently, incorporating improvements
                based on feedback from various entities, including the Armed
                Forces user units, who used the product in real-world scenarios,
                across areas with difficult terrain, the final version was
                developed and deployed for user trials. The success of the
                trials confirms the final version of Elena NavIC Handheld
                Navigator as an all-weather device with the greatest reliability
                and highest precision.
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Versions Section */}
      <h2 className="text-2xl font-bold text-[var(--heading)] my-4 text-center">
        Versions of HHN
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { img: v1, title: "HHN v1.0" },
          { img: v2, title: "OTA v2.0" },
          { img: v3, title: "Infantry v3.0" },
          { img: v4, title: "B Vehicle Map Navigation v4.0" },
        ].map((version, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={version.img}
              alt={version.title}
              className="h-[180px] object-contain rounded-lg mb-3"
            />
            <p className="font-semibold text-gray-800 text-center text-lg">
              {version.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
