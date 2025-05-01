import React from "react";
import background from '../../assets/background.jpg'

function BackGround() {
  return (
    <div className="mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-10">
        Background
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div>
          <img
            src={background}
            alt="Background Illustration"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Text Section */}
        <div>
          <p className="text-base text-justify leading-relaxed">
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
