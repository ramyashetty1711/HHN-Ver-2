import React, { useState, useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const documents = [
  { title: "Elena HHN Brochure", link: "Elena HHN Brochure.pdf" },
  { title: "Elena HHN User Manual", link: "Elena HHN User Manual.pdf" },
];

const videos = [
  { title: "About Device", link: "/Videos/HHN V4 1.4.5.mp4" },

];

function TutorialDocuments() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef([]);

  // Detect if video is in fullscreen mode
  const handleFullscreenChange = () => {
    if (document.fullscreenElement) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      // Trigger a resize to ensure layout recalculation
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100); // Adding delay to ensure the layout is recalculated after fullscreen exit
    }
  };

  // Set up fullscreen change event listener
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div className="px-4">
      <div className="grid grid-cols-12">
     

    
      <div className="md:col-span-8 col-span-12">
  {videos.map((video, index) => (
    <div
      key={index}
      className="bg-gray-100 p-3 flex justify-center flex-col rounded-lg shadow w-full"
    >
      <p className="text-sm font-medium mb-2">{video.title}</p>
      <video
        ref={(el) => (videoRefs.current[index] = el)}
        controls
        className={`rounded w-auto ${isFullscreen ? "h-screen" : "md:h-[60vh] h-[30vh]"}`}
        style={{ objectFit: "cover" }}
      >
        <source src={video.link} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  ))}
</div>


      <div className="md:col-span-4 col-span-12 ">
        {documents.map((item, index) => (
          <div
            key={index}
            className="bg-[var(--secondary)] text-black font-medium px-4 m-3 py-3 rounded-lg shadow flex items-center justify-between min-w-[250px]"
          >
            <span className="text-sm">{item.title}</span>
            <div className="flex gap-2 ml-4">
              <a
                href={`/Documents/${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 rounded-full"
              >
                <FaEye size={16} />
              </a>
              <a
                href={`/Documents/${item.link}`}
                download
                className="text-[var(--primary)] p-1 rounded-full"
              >
                <FaDownload size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default TutorialDocuments;
