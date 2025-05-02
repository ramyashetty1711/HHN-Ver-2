import React from "react";
import Velan from "../../assets/velan.jpeg";
import { FiExternalLink } from "react-icons/fi";
function Elena() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="md:col-span-6 col-span-12 mt-4 w-full">
          <p className=" text-justify  text-lg pr-5 place-items-center w-full">
            <img src={Velan} className="w-[30em] rounded-lg" />
          </p>
        </div>
        <div className="md:col-span-6 col-span-12 mt-4">
          <p className=" text-justify  text-lg pr-10 pb-5">
            <h2 className="text-3xl font-bold text-[var(--heading)] my-2 ">
              About Elena
            </h2>
            Lt Col V S Velan, an Army Veteran, has dedicated himself for the
            proliferation of satellite-based navigation using Indian
            constellation called NavIC. He has been associated with this
            technology from 1998 and with NavIC from its genesis in 2008- 2010.
            Since 2010, he has been working only in this niche segment for which
            he had to travel around the world gathering knowledge. While in
            service, Col Velan was instrumental in establishing and developing
            the Ministry of Defence’s Integrated Space Cell which has now grown
            into Space Forces of India. With his tremendous domain knowledge and
            expertise on GNSS, Col Velan launched Elena Geo Systems in 2012 in
            the Technology Business Incubator of IIT Kharagpur. Elena is the
            only company working dedicatedly to develop indigenous solutions for
            NavIC. Col Velan’s ceaseless drive to innovate has made Elena Geo
            Systems a trailblazer in multi-GNSS devices and applications with an
            orientation to use and deploy NavIC as its core. <br />
            <br />
            The company demonstrated its first NavIC module on April 6, 2019,
            and its first GNSS processor on April 13, 2023.Elena’s
            accomplishments are many: it boasts of having all hardware and
            software to provide end-to-end solution for using NavIC. The
            products include NavIC-based antennae, drone navigation units,
            atomic clocks, tracking devices and severs among others. All the
            devices were designed and developed in the spirit of Make in India.
            Elena Geo Systems is the industrial partner for Bengaluru’s
            prestigious Ramaiah Institute of Technology and IIT, Tirupati.In
            recognition of his ground-breaking work on NavIC, Col Velan was
            appointed as a technology development advisor at IIT-Tirupati’s
            Navavishkar innovation Hub Foundation in July 2023.
            <br /> <br />
            <a
              href="http://elenageo.com"
              target="_blank"
              className="font-bold text-blue-500 flex flex-row items-center hover:text-blue-600 duration-300 transition-all underline"
            >
              Visit Elena <FiExternalLink size={20} className="ms-2" />
            </a>
          </p>
        </div>
        {/* <div className="md:col-span-6 col-span-12 mt-4">
          <p className=" text-justify  text-lg pr-5">
            The company demonstrated its first NavIC module on April 6, 2019,
            and its first GNSS processor on April 13, 2023.Elena’s
            accomplishments are many: it boasts of having all hardware and
            software to provide end-to-end solution for using NavIC. The
            products include NavIC-based antennae, drone navigation units,
            atomic clocks, tracking devices and severs among others. All the
            devices were designed and developed in the spirit of Make in India.
            Elena Geo Systems is the industrial partner for Bengaluru’s
            prestigious Ramaiah Institute of Technology and IIT, Tirupati.In
            recognition of his ground-breaking work on NavIC, Col Velan was
            appointed as a technology development advisor at IIT-Tirupati’s
            Navavishkar innovation Hub Foundation in July 2023.
          </p>
        </div> */}
      </div>
    </>
  );
}

export default Elena;
