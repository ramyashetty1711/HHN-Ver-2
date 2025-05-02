import React from "react";
import pricing from "../../assets/gc_price.png";
import { FaDownload } from "react-icons/fa";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import tech from "../../assets/Documents/GC_Tech_spe.pdf";
import co from "../../assets/Documents/PAC_Cos.pdf";
import oem from "../../assets/Documents/PAC_Grid_Converter.pdf";
import coc from "../../assets/Documents/GC_COC_Certificate.pdf";
import ProcurementPDF from "../../assets/Procurement.pdf";
function Procurment() {
  return (
    <div className=" mx-auto px-4 py-12 space-y-16">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4 hidden">
        Procurement
      </h2>
      <h2 className="text-xl font-bold text-[var(--heading)] mb-4">Costing</h2>

      <p className="text-justify px-5">
        The final version of the grid converter, incorporating all enhancement
        and user-requested features, is a robust, military-grade device tailored
        for operational requirements. The total cost of the device, including
        advanced hardware, iterative software updates, and ruggedized design, is
        ₹75,999 (inclusive of all taxes). Discounted Rate is given below
      </p>
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Image Column */}
        <div className="flex justify-center col-span-12 sm:col-span-9">
          <img
            src={pricing}
            alt="Pricing"
            className="w-auto object-contain max-h-[400px]"
          />
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-4 justify-start col-span-12 sm:col-span-3">
          {/* YouTube Link */}
          <a
            href={ProcurementPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-red-600 font-semibold py-3 px-5 transition-all duration-300 rounded-lg"
          >
            {/* <FaYoutube className="text-2xl" />
            <span>Watch on YouTube</span> */}
            <FaDownload className="text-2xl" />
            Proprietary procurement process
          </a>

          {/* GeM Link */}
          <a
            href="https://mkp.gem.gov.in/hand-held-gps/elena-navic-grid-converter-limited-edition/p-5116877-24745995044-cat.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-blue-600 font-semibold py-3 px-5 transition-all duration-300 hover:text-blue-700 rounded-lg"
          >
            <FaExternalLinkAlt className="text-2xl" />
            <span>Visit on GeM </span>
          </a>

          {/* GeM Link 2 */}
          <a
            href="https://mkp.gem.gov.in/hand-held-gps/elena-grid-converter/p-5116877-91668625108-cat.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-blue-600 font-semibold py-3 px-5 transition-all duration-300 hover:text-blue-700 rounded-lg"
          >
            <FaExternalLinkAlt className="text-2xl" />
            <span>Visit on GeM </span>
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
          href={oem}
          download
          className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
        >
          <FaDownload /> PAC by OEM
        </a>

        <a
          href={co}
          download
          className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
        >
          <FaDownload /> PAC by CO
        </a>

        <a
          href={coc}
          download
          className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
        >
          <FaDownload /> COC
        </a>

        <a
          href={tech}
          download
          className="flex items-center gap-2 justify-center bg-[var(--secondary)] text-black font-semibold py-3 px-5 rounded-lg shadow hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
        >
          <FaDownload /> Tech Specs
        </a>
      </div>
      <div></div>
    </div>
  );
}

export default Procurment;
