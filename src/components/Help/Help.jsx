import React from 'react';
import manual from '../../assets/Documents/user_manual.pdf'; 
import { FaDownload } from 'react-icons/fa';

function Help() {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-0 m-0">
      {/* PDF Embed */}
      <a
        href={manual}
        download
        className=" px-6 pb-2  text-blue font-semibold rounded-md transition-all duration-300 flex justify-end w-full"
      >
       <FaDownload/>
      </a>
      <embed
        src={manual}
        type="application/pdf"
        width="100%"
        height="90%"
      />
      
      {/* Download Button */}
      
    </div>
  );
}

export default Help;
