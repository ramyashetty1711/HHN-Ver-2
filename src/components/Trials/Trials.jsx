import React from "react";
import trialsimg from "../../assets/Trials.jpg";
export default function Trials() {
  return (
    <div className="grid grid-cols-10 max-w-full  font-semibold text-lg text-gray-600 bg-gray-100 pt-3 px-3 rounded-lg h-full max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="col-span-4 pb-2">
        <img src={trialsimg} className="h-[30em]" />
      </div>
      <div className="px-4 font-medium  pb-8 text-md col-span-6">
        Elena has designed and developed NavIC products which are large in range
        and depth to cater to all types of user segments. It has products for
        research domains and high-precision applications. Elena's multitude of
        products ranges from a dual-band antenna to a complex system, customized
        to the user's requirements. The products bring full GNSS services to
        user applications with all the advantages of NavIC such as Availability,
        Accuracy, Reliability, and Integrity.
      </div>
    </div>
  );
}
