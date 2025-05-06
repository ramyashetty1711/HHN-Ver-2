import React, { useState } from "react";
import pricing from "../../assets/gc_price.png";
import { FaDownload, FaEye } from "react-icons/fa";
import tech from "../../assets/Documents/GC_Tech_spe.pdf";
import co from "../../assets/Documents/PAC_Cos.pdf";
import oem from "../../assets/Documents/PAC_Grid_Converter.pdf";
import coc from "../../assets/Documents/GC_COC_Certificate.pdf";
import ProcurementPDF from "../../assets/Procurement.pdf";
import collection from "../../assets/Documents/Collection_Process.pdf";



function Procurment() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const documents = [
    { title: "Collection Process",link: collection },
    { title: "PAC by OEM", link: oem },
    { title: "PAC by CO", link: co },
    { title: "Cert of Conformance", link: coc },
    { title: "Grid Converter Tech Specs", link: tech },
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
          <p className="mb-3">
            The final version of the Grid Converter, incorporating all
            enhancements and user-friendly features, is a robust, military-grade
            device qualified for operational requirements. The device is to be
            procured by the Arty units through GEM directly from the OEM. The
            link for the device in GEM is given beside{" "}
            <a
              className="text-[var(--primary)] underline inline-flex items-center"
              href="https://mkp.gem.gov.in/hand-held-gps/elena-grid-converter/p-5116877-91668625108-cat.html"
              target="_blank"
              title="Visit GeM"
            >
              Elena Grid Converter
            </a>
            .
          </p>

          <p className="mb-3">
            To enable faster induction and earliest use of the device by the
            units, Arty Dte requested the OEM to provide two devices to be
            procured by units using funds under the CO's financial powers.
            Accordingly, the OEM has placed 600 devices at a concessional rate
            for procurement. The OEM has made available these devices in GEM for
            procurement. The link for this is given beside{" "}
            <a
              className="text-[var(--primary)] underline inline-flex items-center"
              href="https://mkp.gem.gov.in/hand-held-gps/elena-navic-grid-converter-limited-edition/p-5116877-24745995044-cat.html"
              target="_blank"
              title="Visit GeM"
            >
             Concessional rate Elena Grid Converter
            </a>
            .
          </p>

         
          <p className="mb-3">
            The documents that will help in the procurement are given beside.{" "}
            {/* <a
              href={ProcurementPDF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] underline"
            >
            Pr
            </a>
            . */}
          </p>
          <p className="mb-1">
          The product needs to be collected through a special process which is given beside in the document "Collection Process".
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
                download={`${item.title.replace(/\s+/g, " ")}.pdf`} // Replace spaces with underscores and add the .pdf extension
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
