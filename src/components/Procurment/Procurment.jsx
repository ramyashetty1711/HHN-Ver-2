import React, { useState } from "react";
import pricing from "../../assets/gc_price.png";
import { FaDownload, FaYoutube, FaExternalLinkAlt, FaArrowRight, FaEye } from "react-icons/fa";
import tech from "../../assets/Documents/GC_Tech_spe.pdf";
import co from "../../assets/Documents/PAC_Cos.pdf";
import oem from "../../assets/Documents/PAC_Grid_Converter.pdf";
import coc from "../../assets/Documents/GC_COC_Certificate.pdf";
import ProcurementPDF from "../../assets/Procurement.pdf";

function Procurment() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const documents = [
    { title: "PAC by OEM", link: oem },
    { title: "PAC by CO", link: co },
    { title: "COC", link: coc },
    { title: "Tech Specs", link: tech },
  ];

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
        Procurement
      </h2>

      <div className="text-justify">
        <p className="mb-1">
          The final version of the grid converter, incorporating all enhancement
          and user-requested features, is a robust, military-grade device tailored
          for operational requirements. The device is available on GeM on which
          people can procure{" "}
          <a
            className="text-[var(--primary)] underline inline-flex items-center"
            href="https://mkp.gem.gov.in/hand-held-gps/elena-grid-converter/p-5116877-91668625108-cat.html"
            target="_blank"
            title="Visit GeM"
          >
            Normal costing
          </a>.
        </p>

        <p className="mb-1">
          The dedicated equipment, as per the instructions of Arty Directorate, should
          be procured directly. The initial set of 2 equipment will be given under ₹1
          Lakh, inclusive of all taxes.{" "}
          <a
            className="text-[var(--primary)] underline inline-flex items-center"
            href="https://mkp.gem.gov.in/hand-held-gps/elena-navic-grid-converter-limited-edition/p-5116877-24745995044-cat.html"
            target="_blank"
            title="Visit GeM"
          >
            Discount of costing as per the instruction of Arty Dte
          </a>.
        </p>

        <p>
          This should be procured through GeM. The proprietary procurement process
          document is attached.{" "}
          <a
            href={ProcurementPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] underline"
          >
            Procurement Process Document
          </a>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {documents.map((item, index) => (
          <div
            key={index}
            onClick={() => toggleIndex(index)} // Toggle on mobile
            className="relative group bg-[var(--secondary)] text-black font-semibold p-2 rounded-lg shadow flex items-center justify-center overflow-hidden cursor-pointer"
          >
            {/* Icons Layer */}
            <div
              className={`absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-300 flex justify-center items-center w-full z-10 bg-white/80 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              } group-hover:opacity-100`}
            >
              <div className="flex gap-4">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-[var(--primary)] p-3 rounded-full transition"
                >
                  <FaEye size={20} />
                </a>
                <a
                  href={item.link}
                  download
                  className="flex items-center justify-center text-[var(--primary)] p-3 rounded-full transition"
                >
                  <FaDownload size={20} />
                </a>
              </div>
            </div>

            {/* Title Text */}
            <span className="z-0 relative">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Procurment;
