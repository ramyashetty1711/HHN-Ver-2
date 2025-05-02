import React from "react";
import pricing from "../../assets/gc_price.png";
import { FaDownload } from "react-icons/fa";
import { FaYoutube, FaExternalLinkAlt } from "react-icons/fa";
import tech from "../../assets/Documents/GC_Tech_spe.pdf";
import co from "../../assets/Documents/PAC_Cos.pdf";
import oem from "../../assets/Documents/PAC_Grid_Converter.pdf";
import coc from "../../assets/Documents/GC_COC_Certificate.pdf";
import ProcurementPDF from "../../assets/Procurement.pdf";
import { FaArrowRight } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
function Procurment() {
  return (
    <div className=" mx-auto px-4 py-12 space-y-8">
      <h2 className="text-3xl font-bold text-[var(--heading)] mb-4 hidden">
        Procurement
      </h2>
      {/* <h2 className="text-xl font-bold text-[var(--heading)] mb-4">Costing</h2> */}
      <p className="text-justify px-5">
        The final version of the grid converter, incorporating all enhancement
        and user-requested features, is a robust, military-grade device tailored
        for operational requirements. The total cost of the device, including
        advanced hardware, iterative software updates, and ruggedized design, is
        <b> ₹75,999</b> (inclusive of all taxes). Discounted Rate is given below
      </p>
      <div className="grid grid-cols-12 gap-6 items-center">
        {/* Image Column */}
        <div className="flex justify-center col-span-12 sm:col-span-4">
          <img
            src={pricing}
            alt="Pricing"
            className="w-auto object-contain max-h-[400px]"
          />
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-2 justify-start col-span-12 sm:col-span-8">
          <p>
            This is a dedicatedly developed equipment as per the instructions of
            Arty Directorate the equipment should be procured directly. Initial
            set of 2 equipment will be given under ₹1 Lakh inclusive of all
            taxes.
          </p>
          <p>
            This should be procured through GeM. The proprietary procurement
            process document is attached. <a
            href={ProcurementPDF} // Update this path to your file location
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] "
          >
            Procurement Process Document
          </a>
          </p>

         

          <p className="text-[var(--primary)] underline ">
            <a
              className="flex items-center "
              href="https://mkp.gem.gov.in/hand-held-gps/elena-grid-converter/p-5116877-91668625108-cat.html"
              target="_blank"
              title="Visit GeM"
            >
              Normal costing <FaArrowRight className="ml-2" />
            </a>
          </p>
          <p className="text-[var(--primary)] underline">
            <a
              className="flex items-center"
              href="https://mkp.gem.gov.in/hand-held-gps/elena-navic-grid-converter-limited-edition/p-5116877-24745995044-cat.html"
              target="_blank"
              title="Visit GeM"
            >
              Discount of costing as per the instruction of Arty Dte{" "}
              <FaArrowRight className="ml-2" />
            </a>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          { title: "PAC by OEM", link: oem },
          { title: "PAC by CO", link: co },
          { title: "COC", link: coc },
          { title: "Tech Specs", link: tech },
        ].map((item, index) => (
          <div
            key={index}
            className="relative group bg-[var(--secondary)] text-black font-semibold p-2 rounded-lg shadow flex items-center justify-center overflow-hidden"
          >
            {/* Icons as layer */}
            <div className="absolute top-0 left-25 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center w-full z-10">
              <div className="flex gap-0 bg-black-100">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center  text-[var(--primary)] p-3 rounded-full  transition"
                >
                  <FaEye size={20} />
                </a>
                <a
                  href={item.link}
                  download
                  className="flex items-center justify-center  text-[var(--primary)] p-3 rounded-full  transition"
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
      <div></div>
    </div>
  );
}

export default Procurment;
