import React from "react";
import trialsimg from "../../assets/Trials.jpg";

export default function Trials() {
  return (
    <div  className="flex flex-col h-full bg-white py-3 px-6">
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
              Trials
            </h2>
      
      <div className="grid grid-cols-12 ">
      <div className="md:col-span-4 col-span-12 flex flex-col items-center justify-start">
  <p className="text-sm font-bold text-[var(--heading)]  text-center">
    Field Testing and Trials of Elena Handheld Devices
  </p>
  <img
    src={trialsimg}
    alt="Trials"
    className="h-[60vh] w-auto"
  />
</div>

        <div className="md:col-span-8 col-span-12">
          <div className="text-justify">
          <p>
            Indian army is migrating from Everest series map (ESM) to Defence
            Series Map (DSM), to give proper support to the environment Indian
            army needed a device that will give out DSM Grid Reference and ESM
            GR to use in this field. The Directorate General of Artillery (DG
            Arty) approached the Additional Director General Military Survey
            (ADG Mil Survey), which developed a prototype Proof of Concept
            (PoC). After Chief of Army Staff (COAS) approval, Elena Geo Tech Pvt
            Ltd was selected as the industrial partner to scale production.
          </p>
          <p >
          Following successful field trials at five artillery units across
            India, including the School of Artillery’s Training and Testing Wing
            (TTW), the device was confirmed to be error-proof and operationally
            reliable. The Artillery Directorate then approved it
            for procurement.
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
