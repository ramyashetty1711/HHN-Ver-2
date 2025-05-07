import React, { useState } from "react";
import FAQItem from "../NavIC/FAQRender";

const Gcfaq = () => {
  const faqData = [
    {
      title: "How to use the device?",
      description: "You can find the user manual for the HHN in the attached PDF.",
      file: "/Documents/Grid Converter User Manual.pdf",
      downloadName: "Grid Converter User Manual.pdf",
      linkText: "Download User Manual",
    },
    {
      title: "What are the additional features and advantages of the device??",
      description: "The HHN brochure is available for download.",
      file: "/Documents/Elena HHN Brochure.pdf",
      downloadName: "Elena HHN Brochure.pdf",
      linkText: "Download Brochure",
    },
    {
      title: "How to rectify the specific problem condition of the device?",
      description: "Please refer to the troubleshooting guide attached to resolve any issues.",
      file: "/Documents/Grid Converter Troubleshooting.pdf",
      downloadName: "Grid Converter Troubleshooting.pdf",
      linkText: "Download Troubleshooting Guide",
    },
    {
      title: "What is Handheld Navigator?",
      description:
        "HHN used for outdoor activities, mapping, and navigation in remote areas, featuring route planning, waypoint management, and map display for reliable and accurate positioning.",
    },
    {
      title: "How Long Does the battery work?",
      description:
        "30/60 hrs ",
    },
    {
      title: "How to Verify the GNSS Connection Status?",
      description:
        "Top right corner ensures a green dot is shown if it is in red color, turn on the Bluetooth connection and you will get the GNSS Connection.",
    },
    {
      title: "Where we can find the Grid Reference values?",
      description: "The Values will show the top Display Bar.",
    },
    {
      title: "How do we find out whether we have a signal connection??",
      description:
        "Once the signal got fixed, the location marker icon will turn blue. If the signal is working but not fixed, the icon will be gray. If there is any issue with the signal, the icon will turn red.",
    },
    {
      title: " How to install or upload map sheet into HHN??",
      description:
        "Using Elena Map Processing Software (EMPS).",
    },
    {
      title: "How many map sheets can be uploaded?",
      description:
        "50 Map sheet",
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
