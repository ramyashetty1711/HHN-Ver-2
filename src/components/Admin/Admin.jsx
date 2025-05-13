import React from "react";
import { useSearchParams } from "react-router-dom";
import VisitorsLocation from "./VisitorsLocation";
import LoggedInLocation from "./LoggedInLocation";

function Admin() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Use 'subtab' instead of 'tab' to avoid conflict with outer component
  const activeSubTab = parseInt(searchParams.get("subtab")) || 1;

  const TabData = [
    { name: "Visitor Locations", TabContent: <VisitorsLocation/>, key: 1 },
    { name: "Logged-In User Locations", TabContent: <LoggedInLocation/>, key: 2 },
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

export default Admin;
