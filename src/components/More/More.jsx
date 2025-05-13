import React from "react";
import { useSearchParams } from "react-router-dom";
import Devices from "./Apk/Devices";
import Application from "./Application/Application";
import MapSheet from "./MapSheets/MapSheet";
import TutorialDocuments from "./Tutorial/TutorialDocuments";

function More() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Use 'subtab' instead of 'tab' to avoid conflict with outer component
  const activeSubTab = parseInt(searchParams.get("subtab")) || 1;

  const TabData = [
    { name: "Devices", TabContent: <Devices />, key: 1 },
    { name: "Map Processing Software", TabContent: <Application />, key: 2 },
    { name: "Map Sheets", TabContent: <MapSheet />, key: 3 },
  ];

  const handleTabChange = (key) => {
    searchParams.set("subtab", key); // Set subtab not tab
    setSearchParams(searchParams);
  };

  return (
    <div className="bg-white h-full p-4 md:max-h-[72vh] overflow-y-auto custom-scrollbar">
      <div className="w-full tw-mt-2 tw-mx-2">
        <div className="flex border-b border-gray-300">
          {TabData.map((tab, idx) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-300 rounded-t-md tw-min-w-[8em] cursor-pointer  transition-all duration-300 ${
                activeSubTab === tab.key
                  ? "bg-[var(--primary)]  text-white"
                  : "text-gray-500 hover:bg-gray-100"
              } ${idx !== TabData.length - 1 ? "mr-1" : ""}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-3">
          {TabData.find((tab) => tab.key === activeSubTab)?.TabContent}
        </div>
      </div>
    </div>
  );
}

export default More;
