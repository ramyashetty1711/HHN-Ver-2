import React,{useState} from 'react'
import Apk from './Apk';
import Devices from './Devices';



function ApkWrapper() {
    const [activeTab, setActiveTab] = useState(1);
    const TabData = [
        {
          name: "Application",
          TabContent: <Apk/>,
          key: 1,
        },
    
        {
          name: "Devices",
          TabContent: <Devices/>,
          key: 2,
        },
      ];
  return (
    <div>
         <div className="tw-text-black ">
      <div className="w-full  tw-mt-2 tw-mx-2">
        <div className="flex border-b border-gray-300">
          {TabData.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-sm font-medium hover:tw-border-gray-600 focus:outline-none transition-colors duration-300 tw-rounded-t-lg tw-transition tw-duration-200 tw-min-w-[8em] active:tw-ring-1 active:tw-ring-gray-400 tw-me-[0.15em] ${
                activeTab === tab.key
                  ? " rounded-t-lg   bg-[var(--primary)]    text-white"
                  : "text-gray-500"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {TabData.find((tab) => tab.key === activeTab).TabContent}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ApkWrapper