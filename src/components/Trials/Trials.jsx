import React from "react";
import trialsimg from "../../assets/Trials.jpg";

export default function Trials() {
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <div className="grid grid-cols-12 h-full pt-6 ">
        <div className="md:col-span-4 col-span-12 flex flex-col items-center justify-start h-full">
          <p className="text-sm font-bold text-[var(--heading)]  text-center">
            Field Testing and Trials of Elena Handheld Devices
          </p>
          <img
            src={trialsimg}
            alt="Trials"
            className="md:h-[70%] xl:h-[85%] w-fit"
          />
        </div>

        <div className="md:col-span-8 col-span-12">
          <div className="text-justify">
            <h2 className="text-2xl font-bold text-[var(--heading)] mb-2 flex justify-center">
              Trials
            </h2>
            <p>
              The final product which was developed at a rapid pace by Elena Geo
              Tech in consultation with ADG Mil Svy and Dte of Arty, was sent
              for field trials. The Arty Dte decided to have the product field
              evaluated at five different locations covering the entire country.
              This included the School of Arty wherein The Trails and Technology
              wing was involved. On successful completion of trials, all user
              inputs were incorporated in the final product. This product is now
              available for use by Arty Units.
            </p>
          </div>
          {/* <p>
            The device underwent rigorous verification by ADG Mil Survey teams
            nationwide before field trials. Initial trials revealed issues,
            prompting a complete redesign of the conversion process, including a
            new chipset and software. The upgraded device was validated by the
            Survey and Cartography Mapping Section (SCMS) at Army Headquarters
            and distributed to five artillery units for testing.
          </p>
          <p>
            Post successful field trials across diverse locations, including the
            School of Artillery’s Training and Testing Wing (TTW), the device
            was confirmed error-proof and operationally reliable. The Artillery
            Directorate subsequently approved it for procurement, finalizing its
            adoption under the project managed by SCMS and Army Headquarters.
          </p> */}
        </div>
      </div>
    </div>
  );
}
