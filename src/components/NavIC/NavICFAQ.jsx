// FAQList.jsx
import React, { useState } from "react";
import FAQItem from "./FAQRender";
import FAQJSON from "./NavIC.json";
const NavICFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="max-w-full mx-auto bg-white shadow-md rounded-md divide-y divide-gray-200 gap-2">
      {FAQJSON.map((faq, index) => (
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

export default NavICFAQ;
