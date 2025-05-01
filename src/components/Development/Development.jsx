import React from "react";
import GC_Device from '../../assets/GC/GC_Device.png'

export default function Development() {
  return (
    <div className=" mx-auto px-4 py-12 space-y-16">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4">
        Development
      </h2>
    <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4">
        <img
                  src={GC_Device}
                  alt="Device"
                  className="w-full h-full object-cover"
                />
        </div>
        <div className=" col-span-12 md:col-span-8">
          <h2 className="text-xl font-bold text-[var(--heading)] my-2">
            Proof of Concept (POC) Demonstrated to COAS
          </h2>
          <p className="text-justify text-base">
            The initial Proof of Concept (POC) device, demonstrated to the Chief
            of Army Staff (COAS), was a basic prototype designed specifically
            for a single zone (Delhi). This simplified version served as a
            feasibility demonstration, showcasing the potential for grid
            conversion functionality. However, the scope was later expanded to
            cover all zones across India, necessitating significant upgrades to
            both hardware and software components.
          </p>
          <h2 className="text-xl font-bold text-[var(--heading)] my-2">
            Enhancement to Prototype
          </h2>
          <p className="text-justify text-base">
            To enable the device to perform grid conversions for all zones
            across India, substantial improvements were required. The memory and
            processing capabilities had to be significantly upgraded to handle
            the increased data and computational demands. As a result, a
            high-performance processor was integrated, which greatly enhanced
            the device's capacity but also increased its overall cost. The grid
            conversion formulas, originally developed for a Windows-based
            system, needed to be reprogrammed entirely to function with the
            upgraded processor. This process involved rewriting and optimizing
            complex algorithms to suit the new architecture. Given the urgency
            of the project, the programming costs were significantly higher.
          </p>
          <h2 className="text-xl font-bold text-[var(--heading)] my-2">
            Development of a Smaller Device and HAL Demonstration
          </h2>
          <p className="text-justify text-base">
            A Technically feasible smaller device which is handy was developed.
            This device included essential features of grid conversion. Further
            this device was demonstrated to HAL where it garnered interest for
            potential procurement and other operational uses.<br/> Elena Geo Tech was
            contacted by ADG Mil Svy and Arty Dte to develop this equipment. As
            a result, the product has been developed into a full-fledged
            military device by Elena and is being sold through GeM. The
            development took about 12 months, mainly due to the need to develop
            the correct algorithm to ensure accurate conversion across the
            entire country and regions beyond our borders, up to 6 map sheets.
            Field trials of the device have been carried out by four different
            formations/units and the TTW, School of Arty. All conversion
            algorithms and parameters used in the device were jointly derived by
            both Adg Mil Survey and EGT and it is not shared to any one else,
            hence the product is proprietary to the development partner EGT.
          </p>
        </div>
      </div>
    </div>
  );
}
