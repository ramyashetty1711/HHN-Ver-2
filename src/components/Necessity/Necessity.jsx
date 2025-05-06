import React from "react";
import background from "../../assets/backgroung_gc.png";
import necessity from "../../assets/necessity_pic.jpg";

function Necessity() {
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <div className="grid grid-cols-12 md:gap-8 items-start"> {/* Align items center vertically */}
        {/* Image Section - centered in column */}
        <div className="md:col-span-4 col-span-12 flex justify-center mb-4 md:mb-0">
          <img
            src={necessity}
            alt="Background Illustration"
            className="w-auto h-[22em] rounded-lg object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="md:col-span-8 col-span-12 rounded-lg flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-[var(--heading)]  mb-2 text-center">
            Necessity
          </h2>
          <p className="text-justify leading-relaxed">
            The armed forces use Indian Grid Reference System (IGRS) for
            accurate map reference of location, in both Everest Series Map (ESM)
            and Defence Series Map (DSM). Currently, the Indian Army is
            transitioning from ESM to DSM. The shift from ESM with a complex
            numbering system and based on Everest Spheroid Data to DSM based on
            WGS 84 datum with an international numbering system, is a complex,
            time-consuming process involving the printing of map sheets for
            issuing to units and formations. The transition impacts operational
            orders and boundary realignments, making it a logistical and
            operational challenge. Moreover, with some systems using Latitude-Longitude
            systems in various equipment, all three reference systems coexist
            for operational purposes. Thus, there arose a critical need for a
            device that can seamlessly convert and display all three reference
            systems viz ESM, DSM, and Latitude-Longitude.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Necessity;
