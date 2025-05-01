import React from "react";
import pricing from '../../assets/gc_price.png'
import { FaDownload } from "react-icons/fa";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import tech from '../../assets/Documents/GC_Tech_spe.pdf'
import co from '../../assets/Documents/PAC_Cos.pdf'
import oem from '../../assets/Documents/PAC_Grid_Converter.pdf'





function Procurment() {
  return (
    <div className=" mx-auto px-4 py-12 space-y-16">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4">
        Procurement
      </h2>
      <h2 className="text-xl font-bold text-[var(--heading)] mb-4">Costing</h2>

      <p className="text-justify">
        The final version of the grid converter, incorporating all enhancement
        and user-requested features, is a robust, military-grade device tailored
        for operational requirements. The total cost of the device, including
        advanced hardware, iterative software updates, and ruggedized design, is
        ₹75,999 (inclusive of all taxes). Discounted Rate is given below
      </p>
      <div className="grid ">
      <div className="flex justify-center items-center">
  <img src={pricing} className="h-[300px] m-0 p-0" />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
  {/* YouTube Link */}
  <a
    href="https://www.youtube.com/watch?v=your_video_id"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 text-red-600 font-semibold py-3 px-5 transition-all duration-300 hover:text-red-700"
  >
    <FaYoutube className="text-2xl" />
    <span>Watch on YouTube</span>
  </a>

  {/* GeM Link */}
  <a
    href="https://gem.gov.in/your_product_page"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-3 text-blue-600 font-semibold py-3 px-5 transition-all duration-300 hover:text-blue-700"
  >
    <FaExternalLinkAlt className="text-2xl" />
    <span>Visit on GeM</span>
  </a>
</div>
      </div>

      <p>
        This is a dedicatedly developed equipment as per the instructions of
        Arty Directorate the equipment should be procured directly. The letter
        has been given with the letter number. Initial set of 2 equipment will
        be given under ₹1 Lakh inclusive of all taxes
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
  <a
    href=""
    download
    className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
  >
    <FaDownload /> PAC by OEM
  </a>

  <a
    href="/docs/document2.pdf"
    download
    className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
  >
    <FaDownload /> PAC by CO
  </a>

  <a
    href="/docs/document3.pdf"
    download
    className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
  >
    <FaDownload /> COC
  </a>

  <a
    href="/docs/document4.pdf"
    download
    className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
  >
    <FaDownload /> Tech Specs
  </a>

  
</div>
<div>
    
</div>








    </div>
  );
}

export default Procurment;
