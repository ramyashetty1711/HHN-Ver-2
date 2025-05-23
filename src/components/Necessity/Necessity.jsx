import React from "react";
import background from "../../assets/backgroung_gc.png";
import necessity from "../../assets/necessity_pic.png";

function Necessity() {
  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 xl:gap-8 items-start">
        {" "}
        {/* Align items center vertically */}
        {/* Image Section - centered in column */}
        <div className="xl:col-span-4 col-span-12 flex justify-center mb-4 md:mb-0 ">
          

          <img
            src={necessity}
            alt="Background Illustration"
            className="w-auto h-[25em] rounded-lg object-contain"
          />
        </div>
        {/* Text Section */}
        <div className="xl:col-span-8 col-span-12 rounded-lg flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-[var(--heading)]  mb-2 text-center">
            Necessity
          </h2>
          <p className="text-justify leading-relaxed mb-2">
            Navigation is crucial to multiple sectors for critical
            functionalities and utilities. Satellite-based navigation has become
            most reliable, accurate and cost effective option. However, in the
            current multi GNSS era, GPS and other GNSS find it challenging to
            deliver solutions in the equatorial region. This issue is mitigated
            by incorporating NavIC in the multi GNSS solutions. Elena Handheld
            Navigator device is a state-of-art navigation device that accesses
            NavIC using its own multi GNSS processor to provide navigation
            solutions, with highest accuracy, reliability and integrity,
            especially in the equatorial region.
          </p>
          {/* <p className="text-justify leading-relaxed mb-2">
            Everyone today carries a phone or a device like watch that will give
            their location accurately.
          </p>
          <p className="text-justify leading-relaxed mb-2">
            Elena's Handheld Navigator is a state-of-art device which helps in
            navigation world-wide using multi GNSS like NavIC, GPS and GLONASS.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Necessity;
