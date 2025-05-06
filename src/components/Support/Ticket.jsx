import React, { useState } from "react";
import DeviceData from "./Feedback.json";
import TicketData from "./Ticket.json";
import CustomButton from "../Common/CustomButton";
import { CgCheckO } from "react-icons/cg";

export default function Ticket() {
  const [activeTab, setActiveTab] = useState("add");

  const tabs = [
    { id: "add", name: "Add Ticket" },
    { id: "status", name: "Ticket Status" },
  ];
  return (
    <div className="grid grid-cols-12 min-h-[78.8vh] bg-white">
      {/* Left tabs */}
      <div className="col-span-2 border-r border-gray-200 p-4">
        <ul className="space-y-2">
          {[...tabs].map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab.id
                  ? "bg-blue-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right content */}
      <div className="col-span-10 p-4">
        {activeTab === "add" && <AddTicket />}
        {activeTab === "status" && <TicketStatus />}
      </div>
    </div>
  );
}

function AddTicket() {
  const [addFormData, setAddFormData] = useState({
    device_id: "",
    name: "",
    mail: "",
    description: "",
    images: [],
  });
  const [AddStatus, setAddStatus] = useState({
    loading: false,
    disabled: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAddFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", addFormData);
  };

  return (
    <div className="p-4">
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        onSubmit={handleSubmit}
      >
        {/* Device Dropdown */}
        <div>
          <label className="block mb-1 text-md font-medium text-gray-500">
            Device
          </label>
          <select
            name="device_id"
            value={addFormData.device_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="" disabled>
              Select a device
            </option>
            {DeviceData.map((device) => (
              <option key={device.device_id} value={device.device_id}>
                {device.device_name}
              </option>
            ))}
          </select>
        </div>

        {/* Name Input */}
        <div>
          <label className="block mb-1 text-md font-medium text-gray-500">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={addFormData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter name"
          />
        </div>

        {/* Mail Input */}
        <div>
          <label className="block mb-1 text-md font-medium text-gray-500">
            Mail
          </label>
          <input
            type="email"
            name="mail"
            value={addFormData.mail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter email"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block mb-1 text-md font-medium text-gray-500">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {addFormData.images.length > 0 && (
            <>
              <h5 className="mb-0">Selected Images</h5>
              <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 max-h-[10vh] overflow-y-auto custom-scrollbar">
                {addFormData.images.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-1 text-md font-medium text-gray-500">
            Description
          </label>
          <textarea
            name="description"
            value={addFormData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="4"
            placeholder="Enter description"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3 text-right w-full flex justify-end">
          <CustomButton
            disabled={AddStatus}
            loading={AddStatus.loading}
            onClick={(e) => {}}
          >
            Submit
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

function TicketStatus() {
  return (
    <div className="pb-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2">Ticket No</th>
            <th className="px-4 py-2">Device Name</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {[...TicketData, ...TicketData].map((ticket) => (
            <tr key={ticket.ticket_id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{ticket.ticket_id}</td>
              <td className="px-4 py-2">{ticket.device_name}</td>
              <td className="px-4 py-2">{ticket.name}</td>
              <td className="px-4 py-2">{ticket.mail}</td>
              <td
                className={`px-4 py-2 capitalize cursor-pointer flex flex-row items-center ${
                  ticket.status === "open"
                    ? " text-red-500"
                    : ticket.status === "in-progress"
                    ? "text-sky-500"
                    : ticket.status === "closed"
                    ? "text-green-700"
                    : ""
                }`}
              >
                {ticket.status}{" "}
                {ticket.status === "closed" && (
                  <CgCheckO className="text-green-700 ml-2" size={18} />
                )}
              </td>
              <td className="px-4 py-2">
                {new Date(ticket.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
