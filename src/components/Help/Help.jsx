import React, { useState } from "react";
import Gcfaq from "./gcfaq";

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6  max-h-[85vh] min-h-[70vh] overflow-y-auto ">
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-2 mb-2 flex justify-center">
        Handheld Navigator FAQ
      </h2>
      <p className="text-center text-lg text-gray-700 mb-8">
        Have questions? Find answers to the most frequently asked questions
        below.
      </p>
      <Gcfaq />
    </div>
  );
}

export default Help;
