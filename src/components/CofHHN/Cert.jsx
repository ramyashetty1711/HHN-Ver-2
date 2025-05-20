import React from "react";
import bis from "../../assets/certlogo/bis.png";
import CE from "../../assets/certlogo/CE.png";
import IP from "../../assets/certlogo/IP_67.png";
import ROHS from "../../assets/certlogo/ROHS.png";
import { FaEye } from "react-icons/fa";

const certificates = [
  {
    title: "BIS Certificate",
    img: bis,
    alt: "BIS",
    link: "/Documents/Elena-HHN-BIS-Certificate.pdf?v=1",
  },
  {
    title: "CE Certificate",
    img: CE,
    alt: "CE",
    link: "/Documents/Elena HHN CE Certificate.pdf?v=1",
  },

  {
    title: "IP67 Rating",
    img: IP,
    alt: "IP67",
    link: "/Documents/Elena HHN IP67 Rating.pdf?v=1",
  },
  {
    title: "RoHS Certificate",
    img: ROHS,
    alt: "RoHS",
    link: "/Documents/Elena HHN ROHS Certificate.pdf?v=1",
  },
];

function Cert() {
  return (
    <div className="flex flex-col items-center bg-white py-10 px-4 h-full overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold text-[var(--heading)] my-1 flex justify-center">
        Certifications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-5">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-2xl  p-6 flex flex-col items-center  "
          >
            <img src={cert.img} alt={cert.alt} className="w-24 h-auto mb-4" />
            <h2 className="font-semibold text-lg text-center text-[var(--heading)] mb-2">
              {cert.title}
            </h2>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[var(--heading)] flex items-center gap-2 mt-2"
            >
              <FaEye className="text-xl" />
              <span>View Certificate</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cert;
