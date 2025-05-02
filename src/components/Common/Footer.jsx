import React from "react";
import Elena from "../../assets/Elena.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/background", label: "Background" },
    { path: "/contact", label: "Contact" },
    { path: "/help", label: "Help" },
  ];
  return (
    <div className="min-h-[200px] bg-[var(--primary)] px-4 pt-10 ">
      <div className="grid grid-cols-12 gap-8 border-b-1 border-white pb-7">
        {/* Column 1: Powered by */}
        <div className="col-span-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 bg-[var(--secondary)] p-4 rounded-lg w-max">
            <p className="text-2xl font-semibold tracking-wide text-black/80">
              Powered by
            </p>
            <img src={Elena} alt="Elena Logo" className="h-[70px]" />
          </div>
        </div>

        {/* Column 2: Page Links */}
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

        {/* Column 3: Contact Info or More */}
        <div className="col-span-4 text-left">
          <p className="text-[var(--secondary)] text-lg font-semibold tracking-wide mb-2">
            Reach Out
          </p>
          <ul className="text-white space-y-3">
            <li className="flex items-center gap-2">
              <FaEnvelope size={18} />
              <span>info@elenageo.com </span>
            </li>
            <li className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <FaPhoneAlt size={18} />
                <span>+91 9384864411</span>
              </div>
              <div className="pl-6">+91 9384864422</div>
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
      </div>
      <div className="grid grid-cols-12 gap-8 py-2">
        <div className="col-span-6 flex justify-start items-center">
          <p className="text-sm text-white">
            copyright &copy; {new Date().getFullYear()} Elena Geo Systems. All
            rights reserved
          </p>
        </div>

        <div className="col-span-6 flex items-center justify-end gap-4">
          {[
            { href: "https://facebook.com", icon: <FaFacebookF /> },
            { href: "https://twitter.com", icon: <FaTwitter /> },
            { href: "https://linkedin.com", icon: <FaLinkedinIn /> },
            { href: "https://instagram.com", icon: <FaInstagram /> },
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
    </div>
  );
}

export default Footer;
