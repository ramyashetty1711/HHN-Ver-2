import React from "react";
import background from "../../assets/backgroung_gc.png";
import necessity from "../../assets/necessity_gc.png";

function BackGround() {
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
    
    <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Background
            </h2>
      <div className="grid grid-cols-12  items-start gap-4 ">
        {/* Image Section - centered in column */}
        <div className="md:col-span-4 col-span-12 flex justify-center items-center ">
          <img
            src={necessity}
            alt="Background Illustration"
            className="w-auto h-[20em] rounded-lg  object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="md:col-span-8  col-span-12 rounded-lg  ">
          <p className=" text-justify leading-relaxed ">
            This Grid Converter is state-of-the-art positioning equipment made
            using Elena's multi-GNSS processor, which utilizes NavIC, GPS, and
            GLONASS to provide one-meter accuracy without any external support.
            It follows Elena's integrated approach. This equipment serves as a
            bridge between three reference systems used by the Indian Army, such
            as the ESM India grid system, the new DSM grid system, and the
            latitude-longitude (Lat-Long) system. It accurately provides all
            these reference numbers for the same point in various formats and
            can convert the reference from one system to another accurately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BackGround;
