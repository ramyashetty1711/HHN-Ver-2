import React from 'react';
import manual from '../../assets/Documents/user_manual.pdf'; 
import gcb from '../../assets/Documents/GCB.pdf'; 
import { FaDownload, FaEye } from 'react-icons/fa';
import Gcfaq from './gcfaq';

function Help() {
  return (
    <div className="flex flex-col justify-center p-4 m-0 bg-gray-100">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
        {[
          { title: "Grid Convertor Brochure", link: gcb },
          { title: " User Manual", link: manual },
          { title: "Troubleshoot", link: manual },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group bg-[var(--secondary)] text-black font-semibold p-2 rounded-lg shadow-lg flex items-center justify-center overflow-hidden transition-all duration-300"
          >
            {/* Icons as hover layer */}
            <div className="absolute top-0 left-35 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center w-full z-10 bg-black-900 bg-opacity-40">
              <div className="flex ">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-[var(--primary)] p-3 rounded-full transition-all hover:bg-[var(--primary-light)]"
                >
                  <FaEye size={20} />
                </a>
                <a
                  href={item.link}
                  download
                  className="flex items-center justify-center text-[var(--primary)] p-3 rounded-full transition-all hover:bg-[var(--primary-light)]"
                >
                  <FaDownload size={20} />
                </a>
              </div>
            </div>

            {/* Title Text */}
            <span className="z-0 relative text-black">{item.title}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-5">
  <h2 className="text-2xl font-semibold text-[var(--heading)]">
    FAQ Grid Converter
  </h2>
</div>
<Gcfaq/>
    </div>
  
  );
}

export default Help;
