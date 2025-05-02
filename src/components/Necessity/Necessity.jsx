import React from "react";
import GC1 from "../../assets/GC/GC_2.png";
import GC_Device from "../../assets/GC/GC_Device.png";
import necessity from "../../assets/necessity_gc .jpg";

const steps = [
  {
    title: "Necessity",
    image: necessity,
    content:
      "The Grid Reference in Military Maps is the system used to align all our units to a single grid, and it is essential for operations. Currently, the Indian Army is transitioning from the old ESM to the DSM. Both use different Grid Reference System. Hence the shift from one to the other requires changes in the Grid References in Army documents, such as Operation Orders, Area of Responsibility, etc. This transition is expected to take up to 10 years. Additionally, many systems in the Army use the Lat-Long system.",
  },
];

const probSol = [
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
  return (
    <div className=" mx-auto px-4 py-8 space-y-16">
      {steps.map((data, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-12 items-stretch gap-8 transform `}
          >
            {/* Image */}
            <div
              className={`col-span-6 ${
                isEven ? "" : "md:order-last"
              } transform  h-full  content-center`}
            >
              <div className="h-[75%] w-full">
                {data.image ? (
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="h-full bg-gray-200 flex flex-row justify-center items-center text-gray-600 rounded-xl">
                    Necessity image
                  </div>
                )}
              </div>
            </div>

            {/* Text Content */}
            <div className={`col-span-6 transform h-full`}>
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-[var(--heading)] mb-4">
                  Necessity
                </h2>
                <p className="text-gray-900 leading-relaxed font-normal text-md text-justify">
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
            <p className="text-md">{data.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
