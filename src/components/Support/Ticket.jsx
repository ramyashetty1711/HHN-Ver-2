import React, { useEffect, useState } from "react";
import DeviceData from "./Feedback.json";
import TicketData from "./Ticket.json";
import CustomButton from "../Common/CustomButton";
import { CgCheckO } from "react-icons/cg";
import { useFetch } from "../../query/UseFetch";
import { APPURL } from "../../URL";
import { useMutation, useQuery } from "@tanstack/react-query";
import Feedback from "./Feedback";
import { IoIosCloseCircle } from "react-icons/io";
import More from "../More/More";
import Admin from "../Admin/Admin";
import { useSearchParams } from "react-router-dom";
import { useLocalUserData } from "../../query/UseLocalData";
import { getData } from "../../query/UseFetchData";

export default function Ticket() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "downloads";

  const tabs = [
    { id: "downloads", name: "Downloads" },
    { id: "ticket", name: "Ticket" },
    { id: "feedback", name: "Feedback" },
  ];

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="grid grid-cols-12 min-h-[78.8vh] bg-white">
      <div className="md:col-span-2 col-span-12 border-r border-gray-200 p-4">
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab.id
                  ? "bg-[var(--secondary)] font-semibold"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-10 col-span-12 p-4">
        {activeTab === "downloads" && <More />}
        {activeTab === "ticket" && <TicketStatus />}
        {activeTab === "feedback" && <Feedback />}
      </div>
    </div>
  );
}

function TicketStatus() {
  const [addFormData, setAddFormData] = useState({
    device_id: "",
    name: "",
    mail: "",
    description: "",
    images: [],
  });
  const SessionData = useLocalUserData();

  const { data: devices, refetch: refetchDevices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const mutationFn = async ({ url, data, loadingkey }) => {
    handleLoadingStatus(loadingkey, true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const response = await res.json();
        throw response; // 🛑 throw error
      }

      return res;
    } catch (err) {
      throw err; // ✅ pass to onError
    }
  };

  const {
    mutate: mutateRequestMobileOTP,
    isSuccess: isSuccessMobileOTP,
    isError: isErrorMobileOTP,
    error: errorMobileOTP,
  } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        setShowMobileOtp(true);
        showToast({
          type: "success",
          heading: "OTP sent successfully",
          message: "Enter the code to verify your identity.",
        });
      }
    },
    onError: (err) => {
      if (err.detail && err.detail.includes("Verified")) {
        showToast({
          type: "success",
          heading: "Verified",
          message: "Mobile Number already verified.",
        });
        setVerifiedStatus((prev) => ({
          ...prev,
          mobile_no: true,
        }));
        setShowMobileOtp(false);
      }
      console.error("Mobile OTP failed:", err);
    },
  });

  const [AddStatus, setAddStatus] = useState({
    loading: false,
    disabled: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (addFormData) {
      const MandatoryField = ["name", "device_id", "mail", "description"];
      const FormStatus = MandatoryField.map((key) => {
        return addFormData[key];
      });
    }
  }, [addFormData]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAddFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ValidateField = console.log("Form Submitted", addFormData);
  };

  const [AddTicket, setAddTicket] = useState(false);
  const { data: tickets, refetch: refetchTicket } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getData(APPURL.tickets, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  // console.log(tickets);

  return (
    <>
      <div className="flex flex-row justify-end mb-3">
        <div
          className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900"
          onClick={() => {
            setAddTicket(true);
          }}
        >
          Raise Ticket
        </div>
      </div>
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
            {tickets && tickets.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-2 font-semibold text-gray-500"
                >
                  No Ticket Found
                </td>
              </tr>
            ) : (
              tickets?.map((ticket) => (
                <tr key={ticket.ticket_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{ticket.ticket_id}</td>
                  <td className="px-4 py-2">{ticket.device_name}</td>
                  <td className="px-4 py-2">{ticket.created_by}</td>
                  <td className="px-4 py-2">{ticket.email_id}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal
        show={AddTicket}
        handleShow={() => {
          setAddTicket(false);
        }}
        onHide={true}
        children={
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className=" w-3xl"
          >
            <h4 className="text-lg">Raise Ticket</h4>
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
                    {devices?.map((device) => (
                      <option key={device.device_id} value={device.device_id}>
                        {device.device_info}
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
          </div>
        }
      />
    </>
  );
}

const Modal = ({ show, handleShow, children, onHide = false }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => {
        if (onHide) {
          handleShow();
        }
      }}
    >
      <div className="relative w-fit max-w-full rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={() => handleShow(false)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <IoIosCloseCircle
            size={20}
            className="text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300"
          />
        </button>
        {children}
      </div>
    </div>
  );
};
