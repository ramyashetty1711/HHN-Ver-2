import React from "react";

function BackGround() {
  return (
    <div className="  mx-auto px-4 py-12 space-y-16 ">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4">
        Background
      </h2>
      <div className="grid grid-cols-12">
        <div className="md:col-span-4 col-span-12 ">Image</div>
        <div className="md:col-span-8 col-span-12">
          <p className="text-base text-justify">
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
