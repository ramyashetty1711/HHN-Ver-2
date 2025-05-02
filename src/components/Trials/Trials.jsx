import React from "react";
import trialsimg from "../../assets/Trials.jpg";

export default function Trials() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-8">
      {/* <h2 className="text-3xl font-bold text-[var(--heading)] mb-8">Trials</h2> */}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
        <p className="text-xl font-bold text-[var(--heading)] my-2 flex justify-center">Field Testing and Trials of Elena Handheld Devices</p>
          <img
            src={trialsimg}
            alt="Trials"
            className="w-full h-auto rounded shadow-md"
          />
          
        </div>
        <div className="md:col-span-7 text-justify space-y-4 text-gray-700 text-md">
          <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[var(--secondary)] mb-2">
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
          <p className="mt-2">
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
