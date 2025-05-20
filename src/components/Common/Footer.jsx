import React from "react";
import Elena from "../../assets/Elena.png";
import elena from "../../assets/elena.jpg";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCountData } from "../../query/UseFetchData";
import { useQuery } from "@tanstack/react-query";
import { useLocalUserData } from "../../query/UseLocalData";
import { APPURL } from "../../URL";
import { SpinnerCircularFixed } from "spinners-react";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";

function Footer() {
 




  const footerLinks = [
    { path: "/", label: "Home" },
    { path: "/contact", label: "Contact" },
    { path: "/help", label: "Help" },
  ];

  const visitorsCount=useSelector((state)=>state.data.visitorsCount)
  console.log(visitorsCount);
  
  const visitorsDataLoading=useSelector((state)=>state.data.visitorsDataLoading)
  console.log(visitorsDataLoading);
  
  
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

      <div className="w-full px-6 py-1 bg-[var(--primary)] relative text-white">
        {/* Copyright - always centered */}
        <p className="text-sm text-center">
          &copy; {new Date().getFullYear()} Elena Geo Tech Pvt Ltd, All Rights
          Reserved.
        </p>

        
        <p className="text-sm text-center mt-1 md:mt-0 md:text-right md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 flex items-center gap-2">
  Viewers:
  {visitorsDataLoading ? (
    // Spinner
    <SpinnerCircularFixed
                          speed={200}
                          thickness={200}
                          size={20}
                          color="var(--primary)"
                          secondaryColor="#98acc0"
                        />
  ) : (
    // Count
    <> {visitorsCount?.[0]?.count }</>
  )}
</p>

      </div>
    </div>
  );
}

export default Footer;
