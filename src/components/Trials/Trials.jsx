import React from "react";
import trialsimg from "../../assets/Trials.jpg";

export default function Trials() {
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <div className="grid grid-cols-12 ">
        <div className="md:col-span-5 col-span-12 flex flex-col items-center justify-start">
          <p className="text-sm font-bold text-[var(--heading)]  text-center">
            Field Testing and Trials of Elena Handheld Devices
          </p>
          <img src={trialsimg} alt="Trials" className="h-[60vh]  w-auto" />
        </div>

        <div className="md:col-span-7 col-span-12">
          <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
            Trials
          </h2>
          <div className="text-justify">
            <p>
              Currently, the Indian Army is transitioning from ESM to DSM.
              However, the transition is a complex, time-consuming process and a
              logistical cum operational challenge. Moreover, with use of
              Lat-Long systems in various equipment, all three reference systems
              coexist for operational purposes. Thus, there arose a critical
              need for a device that can seamlessly convert and display all
              three reference systems viz ESM, DSM, and Lat-Long. Consequently,
              ADG Mil Svy tasked by the DGMO demonstrated a proof-of-concept
              device covering Delhi zone, to the COAS, who directed that a
              scalable device be developed for use by Arty units. Following the
              COAS approval, Additional Director General Military Survey (ADG
              Mil Survey), which had developed a prototype Proof of Concept
              (PoC), approached Elena Geo Tech Pvt Ltd and selected it as the
              industrial partner to scale production. Conversion of data from
              ESM with a complex numbering system and based on Everest Spheroid
              Data to DSM based on WGS 84 datum with an international numbering
              system is quite complex. Hence, graduating from PoC for one zone
              to a solution covering all zones in the Indian subcontinent region
              was a challenging and time-consuming task. After successfully
              developing a prototype covering all regions few devices were
              deployed for testing across various sectors from east to west.
              Following successful field trials at five artillery units and the
              School of Artillery’s Training and Testing Wing (TTW), the device
              was confirmed to be error-proof and operationally reliable. The
              Artillery Directorate then approved its procurement by arty units.
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
