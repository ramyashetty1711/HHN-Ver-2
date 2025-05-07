import React from "react";
import background from "../../assets/backgroung_gc.png";
import necessity from "../../assets/necessity_pic.jpg";

function Necessity() {
  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 md:gap-8 items-start">
        {" "}
        {/* Align items center vertically */}
        {/* Image Section - centered in column */}
        <div className="md:col-span-4 col-span-12 flex justify-center mb-4 md:mb-0 border-1 rounded">
        <div className="h-[20em] flex justify-center items-center text-center text-xl font-semibold">
  Necessity Image
</div>

          {/* <img
            src={necessity}
            alt="Background Illustration"
            className="w-auto h-[22em] rounded-lg object-contain"
          /> */}
        </div>
        {/* Text Section */}
        <div className="md:col-span-8 col-span-12 rounded-lg flex flex-col justify-start">
          <h2 className="text-2xl font-bold text-[var(--heading)]  mb-2 text-center">
            Necessity
          </h2>
          <p className="text-justify leading-relaxed mb-2">
            Location Awareness is becoming a vital requirement. Location based
            services are part of every transaction. Navigation is required for
            all our activities. The position of a person, device can be fixed
            accurately anywhere on the globe by Global Navigation Satellite
            Systems generally known as GPS.
          </p>
          <p className="text-justify leading-relaxed mb-2">
            Everyone today carries a phone or a device like watch that will give
            their location accurately.
          </p>
          <p className="text-justify leading-relaxed mb-2">
            Elena's Handheld Navigator is a state-of-art device which helps in
            navigation world-wide using multi GNSS like NavIC, GPS and GLONASS.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Necessity;
