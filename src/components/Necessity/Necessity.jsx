import React from "react";
import necessity from "../../assets/necessity_gc.png"; // one common image

const steps = [
  {
    title: "Necessity",
    content:
      "The Grid Reference in Military Maps is the system used to align all our units to a single grid, and it is essential for operations. Currently, the Indian Army is transitioning from the old ESM to the DSM. Both use different Grid Reference System. Hence the shift from one to the other requires changes in the Grid References in Army documents, such as Operation Orders, Area of Responsibility, etc. This transition is expected to take up to 10 years. Additionally, many systems in the Army use the Lat-Long system.",
  },
  
];

export default function Necessity() {
  return (
   <div className="mx-auto px-4 py-4">
     <div className="mx-auto   grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Centered Image on the Left */}
      <div className="md:col-span-4 col-span-12 flex items-center justify-center">
        <img
          src={necessity}
          alt="Necessity"
          className="w-full max-w-md h-[200px] object-contain rounded-xl"
        />
      </div>

      {/* Step Content on the Right */}
      <div className="md:col-span-8 col-span-12 space-y-6 flex flex-col justify-center">
        {steps.map((data, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)]"
          >
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-4 flex justify-center">
              {data.title}
            </h2>
            <p className=" leading-relaxed  text-justify">
              {data.content}
            </p>
          </div>
        ))}
      </div>
     
    </div>
     <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] mb-2">
     <h2 className="text-2xl font-bold text-[var(--heading)] mb-4 flex justify-center">
              Problem
            </h2>
     <p className=" leading-relaxed  text-justify">
     The transition from the Everest Series Maps (ESM) to the Defence Series Maps (DSM) is a complex and long-term process involving a manual effort of printing map sheets and issuing them to various units and formations. It also involves the destruction of old maps and documents that take long years. The transition also affects operational orders, boundary coordination and making it a significant logistical and operational challenge. Moreover, the military will continue to use latitude and longitude (Lat-Long) in various equipment. The Artillery (Arty) units, must use ESM, DSM, and Lat-Long references in their Shakti equipment. As all three reference systems must coexist for critical operations of the units, it created a critical need for a device that can seamlessly convert and display all three reference systems: ESM, DSM, and Lat-Long.
     </p>

   </div>
   <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] mb-4">
   <h2 className="text-2xl font-bold text-[var(--heading)] mb-4 flex justify-center">
              Solution
            </h2>
     <p className=" leading-relaxed  text-justify">
     The DGMO tasked the ADG Mil Svy to suggest a solution. Based on this, representatives of ADG Mil Svy demonstrated a proof of concept device that could show Lat-Long, ESM GR, and DSM GR simultaneously over several points in Delhi. The COAS directed that this be developed into a full device to be used by Arty units.
     </p>
   </div>
   </div>
  );
}

