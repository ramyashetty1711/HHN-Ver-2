import React from "react";

export default function Feature() {
  const FeatureList = [
    "Displays current location in ESM GR, DSM GR, and Lat-Long formats",

    "Converts Lat-Long to ESM GR and DSM GR",

    "Converts ESM GR to DSM GR and Lat-Long",

    "Converts DSM GR to ESM GR and Lat-Long",

    "Provides atomic-clock-based accurate timing",

    "Displays mapsheet reference numbers in ESM and DSM formats",

    "Rugged: Confirms to Military Standards",

    "LCD view panel for clear daylight visibility",

    "Small built-in Torch light for night use",

    "IP67 rated",

    "Battery: Normal Operations - 60 hours",

    "Kill button to delete all data securely",

    "Rubber covering for easy holding with a gloved hand Highly secure",

    "The parameters for grid conversion are uploaded into the device by ADG Mil Svy representative, through a window-based easy-to-use software",

    "Supports display of 6, 8, and 10-digit GR in both ESM and DSM formats",

    "Supplied with a waterproof pouch for additional protection",
  ];
  return (
    <div className="flex flex-col  font-semibold text-lg text-gray-600 bg-gray-100 pt-6 px-6 rounded-lg h-full  ">
      <h5 className="text-2xl text-gray-800 mb-4">Feature</h5>
      <ul className=" list-disc px-8 max-h-[70vh] overflow-y-auto custom-scrollbar grid grid-rows-8 grid-cols-2">
        {FeatureList.map((val) => (
          <li className=" font-medium pb-2 text-md row-span-1 col-span-1">
            {val}
          </li>
        ))}
      </ul>
    </div>
  );
}
