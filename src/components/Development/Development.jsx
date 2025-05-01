import React from "react";

export default function Development() {
  return (
    <div className="flex flex-col max-w-full  font-semibold text-lg text-gray-600 bg-gray-100 pt-3 px-3 rounded-lg h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="px-3 pt-3">
        <h5 className="text-2xl text-gray-800 mb-4">Necessity</h5>
        <div className="px-4 font-medium pb-8 text-md">
          The Grid Reference in Military Maps is the system used to align all
          our units to a single grid, and it is essential for operations.
          Currently, the Indian Army is transitioning from the old ESM to the
          DSM. Both use different Grid Reference System. Hence the shift from
          one to the other requires changes in the Grid References in Army
          documents, such as Operation Orders, Area of Responsibility, etc. This
          transition is expected to take up to 10 years. Additionally, many
          systems in the Army use the Lat-Long system.
        </div>
        <h5 className="text-2xl text-gray-800 mb-4">Problem</h5>
        <div className="px-4 font-medium pb-8 text-md">
          This issue is particularly critical for the Artillery, as they have
          Shakthi Equipment that uses Lat-Long, ESM, and DSM military maps. They
          must also support units using ESM and DSM. This concern was presented
          to the COAS through the DGMO by Arty Dte.
        </div>
        <h5 className="text-2xl text-gray-800 mb-4">Solution</h5>
        <div className="px-4 font-medium pb-8 text-md">
          The DGMO tasked the ADG Mil Svy to suggest a solution. Based on this,
          representatives of ADG Mil Svy demonstrated a proof of concept device
          that could show Lat-Long, ESM GR, and DSM GR simultaneously over
          several points in Delhi. The COAS directed that this be developed into
          a full device to be used by Arty units.
        </div>
        <h5 className="text-2xl text-gray-800 mb-4">Development</h5>
        <div className="px-4 font-medium pb-8 text-md">
          Elena Geo Tech was contacted by ADG Mil Svy and Arty Dte to develop
          this equipment. As a result, the product has been developed into a
          full-fledged military device by Elena and is being sold through GeM.
          The development took about 12 months, mainly due to the need to
          develop the correct algorithm to ensure accurate conversion across the
          entire country and regions beyond our borders, up to 6 mapsheets.
          Field trials of the device have been carried out by four different
          formations/units and the TTW, School of Arty.
        </div>
      </div>
    </div>
  );
}
