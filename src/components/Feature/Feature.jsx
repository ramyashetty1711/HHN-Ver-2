import React, { useRef, useEffect } from "react";
import bgImage from "../../assets/Features_BG.png";
import Adv from "../../assets/Advantages.jpg";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

export default function Feature() {
  const sliderRef = useRef(null);

  const FeatureList = [
    "Multi-GNSS Reception: NavIC, GPS, GLONASS, and SBAS for precise, reliable navigation.",
    "Map Page: Add DSM/OSM Maps; includes inbuilt base map. Grid System: Provides Grid Reference Parameters.",
    "Real-Time Tracking: View current location and track your journey. Sky Plot & Satellite SNR: Visualize the sky and monitor satellite signal strength.",
    "Built-In Compass: Reliable direction guidance.",
    "Reference Points: Save important locations.",
    "Route Planning: Optimize routes for efficient navigation.",
    "Debug Page: Advanced insights and customization.",
    "LCD view panel for clear daylight visibility.",
    "View Saved Tracks: Analyze past journeys.",
    "Location Management: Save, edit, and delete location images.",
  ];

  const advantages = [
    "Accurate marking of own and enemy elements on a common grid.",
    "Auto compensation for different zones to ensure accuracy.",
    "Assist target management.",
    "Assist firepower coordination.",
  ];

  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar mb-10 pb-10">
      {/* Slide 1: Features */}
      <div>
        <div className="flex flex-col text-white md:px-3 rounded-lg bg-cover bg-center bg-no-repeat">
          <div className="rounded-lg">
            <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
              Features
            </h5>
            <ul className="list-disc md:px-8 px-4 overflow-y-auto custom-scrollbar grid md:grid-cols-2 grid-cols-1 gap-y-3 gap-x-6">
              {FeatureList.map((val, index) => (
                <li key={index} className="text-black">
                  {val}
                </li>
              ))}
            </ul>
          </div>

          {/* Uncomment if you want to show advantages */}
          {/* 
          <div className="rounded-lg mt-8">
            <h5 className="text-2xl text-[var(--heading)] mb-4 font-bold flex justify-center">
              Advantages
            </h5>
            <ul className="list-disc md:px-8 px-4 grid md:grid-cols-4 grid-cols-1 gap-y-3">
              {advantages.map((val, index) => (
                <li key={index} className="text-black col-span-2 mb-4">
                  {val}
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
