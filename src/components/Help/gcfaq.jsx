import React, { useState } from "react";
import FAQItem from "../NavIC/FAQRender";

const Gcfaq = () => {
  const faqData = [
    {
      title: "Where can I find the user manual for the Grid Converter?",
      description: "You can find the user manual for the Grid Converter in the attached PDF.",
      file: "/documents/user_manual.pdf",
      downloadName: "Grid Converter User Manual.pdf",
      linkText: "Download User Manual",
    },
    {
      title: "How do I access the Grid Converter brochure?",
      description: "The Grid Converter brochure is available for download.",
      file: "/documents/GC_Brochure.pdf",
      downloadName: "Grid Converter Brochure.pdf",
      linkText: "Download Brochure",
    },
    {
      title: "What should I do if the device is malfunctioning?",
      description: "Please refer to the troubleshooting guide attached to resolve any issues.",
      file: "/documents/Troubleshooting.pdf",
      downloadName: "Grid Converter Troubleshooting Guide.pdf",
      linkText: "Download Troubleshooting Guide",
    },
    {
      title: "What is the Grid Converter Device?",
      description:
        "The Grid Converter is a handheld standalone device designed to convert geographical coordinates between Latitude/Longitude and military grid formats such as ESM and DSM. It utilizes the NavIC satellite system for precise location data.",
    },
    {
      title: "What are the key functionalities of the Grid Converter?",
      description:
        "Utilizes NavIC for accurate and reliable positioning. Displays current location in Latitude/Longitude, ESM, and DSM GR formats (6, 8, and 10 digits). Supports bi-directional conversion between Lat-Long, ESM GR, and DSM GR.",
    },
    {
      title: "Which grid formats are supported by the Grid Converter?",
      description:
        "The device supports ESM, DSM, and Latitude/Longitude formats.",
    },
    {
      title: "What digit levels are supported for the GR formats?",
      description: "6-digit, 8-digit, and 10-digit grid references.",
    },
    {
      title: "What conversion types are available in the Grid Converter?",
      description:
        "Lat-Long ⇄ ESM GR, Lat-Long ⇄ DSM GR, ESM GR ⇄ DSM GR, ESM GR ⇄ Lat-Long, DSM GR ⇄ Lat-Long (Note: Conversion logic based on parameters approved by ADG Military Survey).",
    },
    {
      title: "Which Lat-Long formats are supported?",
      description:
        "Decimal Degrees: DDD.DDDDD, Degrees, Minutes, Seconds: DDD° MM' SS.S''.",
    },
    {
      title: "What is the accuracy level of the device?",
      description:
        "The device provides 1-meter Circular Error Probable (CEP) accuracy.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-md divide-y divide-gray-200 gap-2">
      {faqData.map((faq, index) => (
        <FAQItem
          key={index}
          data={faq}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index === activeIndex ? null : index)}
        />
      ))}
    </div>
  );
};

export default Gcfaq;
