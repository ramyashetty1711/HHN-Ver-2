import React, { useState } from "react";
import CustomButton from "../Common/CustomButton";
import { CgCheckO } from "react-icons/cg";
import Application from "./Application/Application";
import Apk from "./Apk/Apk";
import MapSheet from "./MapSheets/MapSheet";
import TutorialDocuments from "./Tutorial/TutorialDocuments";

export default function Ticket() {
  const [activeTab, setActiveTab] = useState("application");

  const tabs = [
    { id: "application", name: "Application" },
    { id: "hhnapk", name: "HHN APK" },
    { id: "mapsheet", name: "Map Sheets" },
    { id: "tutorial", name: "Tutorials" },
  ];
  return (
    <div className="grid grid-cols-12 min-h-[78.8vh] bg-white">
      {/* Left tabs */}
      <div className="col-span-2 border-r border-gray-200 p-4">
        <ul className="space-y-2">
          {[...tabs].map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab.id
                  ? "bg-[var(--secondary)] font-semibold"
                   : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right content */}
      <div className="col-span-10 p-4">
        {activeTab === "application" && <Application />}
        {activeTab === "hhnapk" && <Apk />}
        {activeTab === "mapsheet" && <MapSheet />}
        {activeTab === "tutorial" && <TutorialDocuments />}
      </div>
    </div>
  );
}
