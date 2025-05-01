import React from "react";
import GC1 from "../../assets/GC/GC_2.png";
import GC_Device from '../../assets/GC/GC_Device.png'

const steps = [
  {
    title: "Necessity",
    image: "",
    content:
      "The Grid Reference in Military Maps is the system used to align all our units to a single grid, and it is essential for operations. Currently, the Indian Army is transitioning from the old ESM to the DSM. Both use different Grid Reference System. Hence the shift from one to the other requires changes in the Grid References in Army documents, such as Operation Orders, Area of Responsibility, etc. This transition is expected to take up to 10 years. Additionally, many systems in the Army use the Lat-Long system",
  },
];

const probSol = [
  {
    title: "Problem",
    content:
      "This issue is particularly critical for the Artillery, as they have Shakthi Equipment that uses Lat-Long, ESM, and DSM military maps. They must also support units using ESM and DSM. This concern was presented to the COAS through the DGMO by Arty Dte",
  },
  {
    title: "Solution",
    content:
      "The DGMO tasked the ADG Mil Svy to suggest a solution. Based on this, representatives of ADG Mil Svy demonstrated a proof of concept device that could show Lat-Long, ESM GR, and DSM GR simultaneously over several points in Delhi. The COAS directed that this be developed into a full device to be used by Arty units.",
  },
];

export default function Necessity() {
  return (
    <div className=" mx-auto px-4 py-12 space-y-16">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4">
        Necessity
      </h2>
      {steps.map((data, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-12 items-stretch gap-8 transform ${
              isEven ? "-skew-y-3" : "skew-y-3"
            }`}
          >
            {/* Image */}
            <div
              className={`col-span-6 ${
                isEven ? "" : "md:order-last"
              } transform ${isEven ? "skew-y-3" : "-skew-y-3"} h-full`}
            >
              <div className="">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div
              className={`col-span-6 transform ${
                isEven ? "skew-y-3" : "-skew-y-3"
              } h-full`}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] h-full flex flex-col justify-center">
                <p className="text-gray-900 leading-relaxed font-normal text-base text-justify">
                  {data.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols-12 gap-4">
        {probSol.map((data) => (
          <div className="md:col-span-6 col-span-12 text-justify bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)]">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
              {data.title}
            </h2>
            <p className="text-base">{data.content}</p>
          </div>
        ))}
      </div>
      
      
    </div>
  );
}
