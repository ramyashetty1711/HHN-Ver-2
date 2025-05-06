import React from "react";
import Elena from "../../assets/Elena.png";
import elena from "../../assets/elena.jpg";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/help", label: "Help" },
  ];
  return (
    <div className=" bg-[var(--primary)] py-2 ">
      {/* <div className="grid grid-cols-12 gap-8 border-b-1 border-white pb-7">
  
        <div className="col-span-4 flex items-start flex-col gap-5 justify-center">
          <div className="inline-flex items-center gap-3 bg-[var(--secondary)] p-4 rounded-lg w-max">
            <p className="text-2xl font-semibold tracking-wide text-black/80">
              Powered by
            </p>
            <img src={elena} alt="Elena Logo" className="h-[70px] rounded-xl" />
          </div>
          <div className="col-span-6 flex items-center justify-end gap-4">
            {[
              {
                href: "https://www.facebook.com/share/1ZDxcXpVNr/",
                icon: <FaFacebookF />,
              },
              {
                href: "https://x.com/ElenaGeoSys?t=zXsK5BplurtIwv8lZHHxuQ&s=08",
                icon: <FaXTwitter />,
              },
              {
                href: "https://www.linkedin.com/company/elena-geo-systems-private-limited/",
                icon: <FaLinkedinIn />,
              },
              {
                href: "https://www.instagram.com/elena_geosystems?igsh=Ym0xbmVvZGd2M2V2",
                icon: <FaInstagram />,
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-white p-2 rounded-full hover:bg-white hover:border-white  hover:text-[var(--primary)] transition duration-200"
              >
                {React.cloneElement(item.icon, { size: 15 })}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-4 text-left">
          <p className="text-[var(--secondary)] text-lg font-semibold tracking-wide mb-2">
            Quick Links
          </p>
          <ul className="text-white space-y-3">
            {footerLinks.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[var(--secondary)] transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-4 text-left">
          <p className="text-[var(--secondary)] text-lg font-semibold tracking-wide mb-2">
            Reach Out
          </p>
          <ul className="text-white space-y-3">
            <li className="flex items-center gap-2">
              <FaEnvelope size={18} />
              <span>
                <a href="mailto:info@elenageo.com" className="">
                  info@elenageo.com
                </a>
              </span>
            </li>
            <li className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaPhoneAlt size={18} />
                <a href="tel:+919384864411" className="">
                  +91 9384864411
                </a>
              </div>
              <div className="pl-6">
                <a href="tel:+919384864422" className="">
                  +91 9384864422
                </a>
              </div>
            </li>

            <li className="flex items-start gap-2">
              <FaMapMarkerAlt size={18} />
              <span>
                {" "}
                62/1, 1st Cross, 2nd Main,
                <br /> Ganganagar, Bangalore <br />
                560032
              </span>
            </li>
          </ul>
        </div>
      </div> */}

        <div className="col-span-12 flex justify-center items-center">
          <p className="text-sm text-white">
             &copy; {new Date().getFullYear()} Elena Geo Tech Pvt Ltd, All
            Rights Reserved.
          </p>
        </div>
      
    </div>
  );
}

export default Footer;
