import React from "react";
import trialsimg from "../../assets/Trials.jpg";

export default function Trials() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-8">Trials</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5">
          <img
            src={trialsimg}
            alt="Trials"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
        <div className="md:col-span-7 text-justify space-y-4 text-gray-700 text-base">
          <p>
            The Indian Army transitioned from Everest Series Maps (ESM) to
            Defence Series Maps (DSM), requiring a device to output both grid
            references during the coexistence period. The Directorate General of
            Artillery (DG Arty) approached the Additional Director General
            Military Survey (ADG Mil Survey), which developed a prototype Proof
            of Concept (PoC). After Chief of Army Staff (COAS) approval, Elena
            Geo Tech Pvt Ltd was selected as the industrial partner to scale
            production.
          </p>
          <p>
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
          </p>
        </div>
      </div>
    </div>
  );
}
