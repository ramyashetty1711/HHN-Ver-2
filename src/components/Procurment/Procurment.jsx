import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";

function Procurment() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const documents = [
   
    { title: "Elena HHN Brochure", link: "Elena HHN Brochure.pdf" },
    { title: "Tech Specs", link: "Elena HHN Tech Specs.pdf" },
    { title: "Cert of Conformance", link: "Elena HHN Cert of Conformance.pdf" },
    { title: "PAC by OEM", link: "Elena HHN PAC by OEM.pdf" },
  ];

  return (
    <div className="flex flex-col bg-white py-3 px-6 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-2 xl:gap-6">
        {/* Left Section */}
        <div className="text-justify col-span-12 xl:col-span-9 md:col-span-8 w-full">
          <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
            Procurement
          </h2>
          <p className="mb-3">
          The device is available on GeM{" "}
            <a
              className="text-[var(--primary)] underline inline-flex items-center"
              href="https://mkp.gem.gov.in/hand-held-gps/navic-handheld-navigator/p-5116877-31436672132-cat.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Elena HHN Device
            </a>
            .
          </p>
          {/* <p className="mb-3">
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
              rel="noopener noreferrer"
            >
              Concessional rate Elena Grid Converter
            </a>
            .
          </p> */}
          <p className="mb-3">
            The documents that will help in the procurement are given beside.
          </p>
          {/* <p className="mb-1">
            The product needs to be collected through a special process which is given beside in the document "Collection Process".
          </p> */}
        </div>

        {/* Right Section - Document List */}
        <div className="col-span-12 xl:col-span-3 md:col-span-4 flex flex-col gap-4 mt-10">
          {documents.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--secondary)] text-black font-semibold px-3 py-2 rounded-lg shadow flex items-center justify-between"
            >
              <span className="text-sm">{item.title}</span>
              <a
                href={`/Documents/${item.link}`}
                download
                className="text-[var(--primary)] p-2 rounded-full"
              >
                <FaDownload size={18} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Procurment;
