import React, { useState } from "react";
import pricing from "../../assets/gc_price.png";
import {
  FaDownload,
  FaEye,
} from "react-icons/fa";
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
    { title: "Tech Specs", link: tech },
    {title:"Collection Process", oem},
    { title: "PAC by OEM", link: oem },
    { title: "PAC by CO", link: co },
    { title: "COC", link: coc },
  ];

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <h2 className="text-2xl font-bold text-[var(--heading)] mt-4 mb-2 flex justify-center">
        Procurement
      </h2>

      {/* Main Grid Row: 8 + 4 column layout */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left: Text Content */}
        <div className="text-justify col-span-12 md:col-span-9">
  <p className="mb-1">
    The final version of the Grid Converter, incorporating all enhancements and user-friendly features,
    is a robust, military-grade device qualified for operational requirements. The device can be procured
    vide the link provided{" "}
    <a
      className="text-[var(--primary)] underline inline-flex items-center"
      href="https://gem.gov.in/"
      target="_blank"
      title="Visit GeM"
    >
      GeM
    </a>.
  </p>

  <p className="mb-1">
    As per the instructions issued by the Arty Directorate, the Grid Converter can be procured directly from
    the OEM, and the initial set of 2 devices is priced under ₹1 lakh (inclusive of all taxes). The link for the{" "}
    <strong>ibid promotional sale</strong>, as instructed by the Arty Directorate, is available{" "}
    <a
      className="text-[var(--primary)] underline inline-flex items-center"
      href="https://mkp.gem.gov.in/hand-held-gps/elena-navic-grid-converter-limited-edition/p-5116877-24745995044-cat.html"
      target="_blank"
      title="Visit GeM"
    >
      here
    </a>.
  </p>

  
  <p>
    All subsequent procurements will be as per the standard pricing. The link for the same is provided{" "}
    <a
      className="text-[var(--primary)] underline inline-flex items-center"
      href="https://mkp.gem.gov.in/hand-held-gps/elena-grid-converter/p-5116877-91668625108-cat.html"
      target="_blank"
      title="Visit GeM"
    >
      here (Normal Costing)
    </a>.
  </p>
  <p className="mb-1">
    Guidance for the procurement through GeM is provided{" "}
    <a
      href={ProcurementPDF}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--primary)] underline"
    >
      here
    </a>.
  </p>

</div>


        {/* Right: Document Cards */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-4">
  {documents.map((item, index) => (
    <div
      key={index}
      className="bg-[var(--secondary)] text-black font-semibold px-2 py-1 rounded-lg shadow flex items-center justify-between"
    >
      <span>{item.title}</span>
      <a
        href={item.link}
        download={`${item.title.replace(/\s+/g, ' ')}.pdf`} // Replace spaces with underscores and add the .pdf extension
        className="text-[var(--primary)] p-2 rounded-full transition"
      >
        <FaDownload size={20} />
      </a>
    </div>
  ))}
</div>


      </div>
    </div>
  );
}

export default Procurment;
