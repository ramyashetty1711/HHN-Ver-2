import React, { useState } from 'react';
import manual from '../../assets/Documents/user_manual.pdf';
import gcb from '../../assets/Documents/GCB.pdf';
import { FaDownload, FaEye } from 'react-icons/fa';
import Gcfaq from './gcfaq';

function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const documents = [
    { title: "Grid Converter Brochure", link: gcb },
    { title: "User Manual", link: manual },
    { title: "Troubleshoot", link: manual },
    {title:"Collection", link:manual}
  ];

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6  max-h-[calc(100vh-12em)] overflow-y-auto ">
        <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
          Grid Converter FAQ
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8">
  Have questions? Find answers to the most frequently asked questions below.
</p>
      <Gcfaq />
    </div>
  );
}

export default Help;
