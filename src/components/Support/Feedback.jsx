import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

// Sample device list
const devices = [
  { device_id: 10, device_name: "GR-1020" },
  { device_id: 11, device_name: "GR-1021" },
  { device_id: 12, device_name: "GR-1022" },
];

export default function Feedback() {
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  return (
    <div className=" bg-white  h-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-full">
        <div className="md:col-span-2 border-r p-4   border-gray-300 h-full overflow-y-auto ">
          <h3 className="text-lg font-medium mb-2  text-gray-700">Devices</h3>
          <ul className="space-y-2  overflow-y-auto custom-scrollbar">
            {[...devices].map((device) => (
              <li
                key={device.device_id}
                className={`cursor-pointer p-2 rounded ${
                  selectedDevice.device_id === device.device_id
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedDevice(device)}
              >
                {device.device_name}
              </li>
            ))}
          </ul>
        </div>
        {/* Left: Feedback Form */}
        <div className="md:col-span-10 space-y-6 p-4 rounded  border-gray-300">
          <h2 className="text-xl font-semibold text-gray-700">
            Feedback for: {selectedDevice.device_name}
          </h2>

          {/* Star Rating */}
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => {
              const currentRating = i + 1;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  <FaStar
                    size={24}
                    className={
                      currentRating <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              );
            })}
          </div>

          {/* Text Feedback */}
          <textarea
            placeholder="Write your feedback..."
            className="w-full border p-2 rounded resize-none border-gray-300"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="w-full flex flex-row justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded place-content-end self-end">
              Submit Feedback
            </button>
          </div>
        </div>

        {/* Right: Device List */}
      </div>
    </div>
  );
}
