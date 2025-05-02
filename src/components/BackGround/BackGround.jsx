import React from "react";
import background from "../../assets/backgroung_gc.png";

function BackGround() {
  return (
    <div className=" mx-auto px-4  space-y-8">
      <div className="grid grid-cols-12 gap-8 items-center">
        {/* Image Section - centered in column */}
        <div className="col-span-4 flex justify-center items-center">
          <img
            src={background}
            alt="Background Illustration"
            className="w-auto h-[20em] rounded-lg  object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="col-span-8 bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] mb-2">
          <p className="text-md text-justify leading-relaxed">
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
