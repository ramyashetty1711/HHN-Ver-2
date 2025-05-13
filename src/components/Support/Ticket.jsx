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
import { useSelector } from "react-redux";
import { useToast } from "../Toast/ToastContext";
import { SpinnerCircularFixed } from "spinners-react";
import { IoEye } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import TutorialDocuments from "../More/Tutorial/TutorialDocuments";
import GetLoggedUserLocation from "../../GetLoggedUserLocation";

const Status = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

export default function Ticket() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "downloads";

  const tabs = [
    { id: "downloads", name: "Downloads" },
    { id: "ticket", name: "Ticket" },
    { id: "tutorial", name: "Tutotials" },
    { id: "feedback", name: "Feedback" },
    { id: "admin", name: "Admin" },
  ];

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

return (
  <div className="grid grid-cols-12 md:min-h-[78.8vh] 2xl:min-h-full bg-white">
    {/* Sidebar */}
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

    {/* Main Content */}
    <div className="md:col-span-10 col-span-12 w-full p-4">
      {activeTab === "downloads" && <More />}
      {activeTab === "ticket" && <TicketStatus />}
      {activeTab === "tutorial" && <TutorialDocuments />}
      {activeTab === "feedback" && <Feedback />}
      {activeTab === "admin" && <Admin/>}
    </div>

    {/* Log user location once */}
    <GetLoggedUserLocation />
  </div>
);

}

function TicketStatus() {
  const SessionData = useLocalUserData();
  const { showToast } = useToast();
  const UserRole = useSelector((state) => state.data.currentUserRole);

  const [addFormData, setAddFormData] = useState({
    device_id: "",
    name: "",

    description: "",
    uploaded_images: [],
  });
  const [AddTicket, setAddTicket] = useState(false);
  const [EditTicket, setEditTicket] = useState({
    show: false,
    data: {},
    isView: false,
  });

  // const { data: devices, isLoading } = useFetchData("devices");
  const {
    data: tickets,
    refetch: refetchTicket,
    isLoading: TicketLoading,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getData(APPURL.tickets, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const mutationFn = async ({ url, data }) => {
    setAddStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Token ${SessionData.token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const response = await res.json();
        throw response; // 🛑 throw error
      }

      return res;
    } catch (err) {
      throw err; // ✅ pass to onError
    } finally {
      setAddStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const { mutate: PostTicket } = useMutation({
    mutationFn,

    onSuccess: (data) => {
      if (data.status === 201) {
        showToast({
          type: "success",
          heading: "Ticket Submitted",
          message:
            "Your issue has been recorded. Our support team will get back to you shortly.",
        });
        refetchTicket();
        setAddTicket(false);
      }
    },
    onError: (err) => {},
  });

  const [AddStatus, setAddStatus] = useState({
    loading: false,
    disabled: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  useEffect(() => {
    const checkingKeys = ["device_id", "description"];
    const FieldStatus = checkingKeys
      .map((val) => {
        if (val === "email_id") {
          if (emailRegex.test(addFormData[val])) {
            return true;
          } else {
            return false;
          }
        }
        return addFormData[val] !== "";
      })
      .some((val) => {
        return !val;
      });

    setAddStatus((prev) => ({ ...prev, disabled: FieldStatus }));
  }, [addFormData]);

  useEffect(() => {
    if (addFormData) {
      const MandatoryField = ["device_id", "description"];
      const FormStatus = MandatoryField.map((key) => {
        return addFormData[key];
      });
    }
  }, [addFormData]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAddFormData((prev) => ({
      ...prev,
      uploaded_images: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postForm = new FormData();
    const MandatoryField = ["device_id", "description"];

    for (const key of MandatoryField) {
      if (key === "device_id") {
        postForm.append("device_info", addFormData[key]);
      } else {
        postForm.append(key, addFormData[key]);
      }
    }
    if (addFormData.uploaded_images.length > 0) {
      addFormData.uploaded_images.map((images) => {
        postForm.append("uploaded_images", images);
      });
    }

    // for (let [key, value] of postForm) {
    //   console.log(key, value);
    // }

    PostTicket({ url: APPURL.tickets, data: postForm });
  };

  const GetDeviceName = (id) => {
    return devices?.find((val) => val.id === id).device_id || "-";
  };

  const handleCloseAddTicket = () => {
    setAddTicket(false);
    setAddFormData({
      device_id: "",
      name: "",

      description: "",
      uploaded_images: [],
    });
  };
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
      <div className="pb-4 max-h-[60vh] min-h-[51vh] overflow-y-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 max-w-[8em]">Ticket No</th>
              <th className="px-4 py-2 max-w-[6em]">Device Name</th>
              {/* <th className="px-4 py-2">Name</th> */}
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              {/* {UserRole === 1 ? <th>Manage</th> : */}
              <th>View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {TicketLoading ? (
              <tr className="text-center">
                <td colSpan={6} className="py-6">
                  <div className="flex justify-center items-center">
                    <SpinnerCircularFixed
                      speed={200}
                      thickness={200}
                      size={20}
                      color="var(--primary)"
                      secondaryColor="#98acc0"
                    />
                  </div>
                </td>
              </tr>
            ) : tickets && tickets.length === 0 ? (
              <tr className=" text-center ">
                <td className=" py-3 font-semibold text-gray-500" colSpan={6}>
                  No Tickets Found
                </td>
              </tr>
            ) : (
              tickets?.map((ticket) => (
                <tr key={ticket.ticket_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 max-w-[10em]">{ticket.ticket_id}</td>
                  <td className="px-4 py-2 max-w-[6em]">
                    {GetDeviceName(ticket.device_info)}
                  </td>
                  {/* <td className="px-4 py-2">{ticket.created_by}</td> */}
                  <td className="px-4 py-2 max-w-[15em] text-ellipsis whitespace-nowrap overflow-hidden">
                    {ticket.description}
                  </td>
                  <td
                    className={`px-4 py-2 capitalize cursor-pointer flex flex-row items-center ${
                      ticket.status === "open"
                        ? " text-red-500"
                        : ticket.status === "in_progress"
                        ? "text-sky-500"
                        : ticket.status === "closed"
                        ? "text-green-700"
                        : ""
                    }`}
                  >
                    {Status[ticket.status]}{" "}
                    {ticket.status === "closed" && (
                      <CgCheckO className="text-green-700 ml-2" size={18} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(ticket.created_at).toLocaleString()}
                  </td>
                  <td>
                    <div className="flex flex-row items-center ">
                      <div
                        className="bg-[var(--secondary)] w-fit p-1.5  rounded-md text-[var(--primary)] hover:bg-gray-600 hover:text-white transition-all duration-300 cursor-pointer mr-2"
                        onClick={(e) => {
                          setEditTicket({
                            show: true,
                            data: ticket,
                            isView: true,
                          });
                        }}
                      >
                        <IoEye size={20} />
                      </div>
                      {UserRole === 1 && false && (
                        <div
                          className="bg-[var(--primary)] w-fit p-1.5 rounded-md text-[var(--secondary)] hover:bg-sky-700  transition-all duration-300 cursor-pointer"
                          onClick={(e) => {
                            setEditTicket({
                              show: true,
                              data: ticket,
                              isView: false,
                            });
                          }}
                        >
                          <FiEdit size={20} />
                        </div>
                      )}
                    </div>
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
          handleCloseAddTicket();
        }}
        // onHide={true}
        children={
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className=" w-3xl"
          >
            <h4 className="text-xl font-medium">Raise Ticket</h4>
            <div className="p-4">
              <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-1 text-md font-medium text-gray-500">
                    Device
                  </label>
                  <select
                    name="device_id"
                    value={addFormData.device_id}
                    onChange={handleChange}
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
               
                  >
                    <option value="" disabled>
                      Select a device
                    </option>
                    {devices?.map((device) => (
                      <option key={device.id} value={device.id}>
                        {device.device_id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name Input */}
                {/* <div>
                  <label className="block mb-1 text-md font-medium text-gray-500">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={addFormData.name}
                    onChange={handleChange}
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter name"
                  />
                </div> */}

                {/* Mail Input */}
                {/* <div>
                  <label className="block mb-1 text-md font-medium text-gray-500">
                    Mail
                  </label>
                  <input
                    type="email"
                    name="email_id"
                    value={addFormData.mail}
                    onChange={handleChange}
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
                    className="w-full max-w-xs border border-gray-300 rounded px-3 py-2"
                    placeholder="Enter email"
                  />
                </div> */}
                <div
                  className="md:col-span-2"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <label className="block text-md font-medium text-gray-500 cursor-pointer">
                    Upload Images
                  </label>
                  <input
                    id="upload-images"
                    type="file"
                    name="uploaded_images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full max-w-xs border  border-gray-300 rounded px-3 py-2 cursor-pointer"
                  />
                  {addFormData.uploaded_images.length > 0 && (
                    <>
                      <h5 className="mb-0">Selected Images</h5>
                      <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 max-h-[10vh] overflow-y-auto custom-scrollbar">
                        {addFormData.uploaded_images.map((file, idx) => (
                          <li key={idx}>{file.name}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                {/* Description */}
                <div className="col-span-1 md:col-span-4">
                  <label className="block mb-1 text-md font-medium text-gray-500">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={addFormData.description}
                    onChange={handleChange}
                    className=" w-[45%] md:w-full  border border-gray-300 rounded px-3 py-2 custom-scrollbar"
                    rows="4"
                    placeholder="Enter description"
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-4 text-right w-full flex justify-end">
                  <CustomButton
                    disabled={AddStatus.disabled}
                    loading={AddStatus.loading}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="min-w-[6em]"
                  >
                    Submit
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        }
      />

      <EditTicketModal
        show={EditTicket.show}
        EditData={EditTicket.data}
        handleShow={() => {
          setEditTicket((prev) => ({ ...prev, data: {}, show: false }));
        }}
        Device={devices}
        isView={EditTicket.isView}
        refetch={refetchTicket}
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

const EditTicketModal = ({
  show,
  handleShow,
  EditData,
  Device,
  refetch,
  isView,
}) => {
  const [updatedFormData, setUpdatedFormData] = useState(EditData);
  const { showToast } = useToast();
  const SessionData = useLocalUserData();
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const mutationFn = async ({ url, data }) => {
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${SessionData.token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const response = await res.json();
        throw response; // 🛑 throw error
      }

      return res;
    } catch (err) {
      throw err; // ✅ pass to onError
    } finally {
    }
  };

  useEffect(() => {
    if (EditData) {
      setUpdatedFormData({ ...EditData });
    } else {
      setUpdatedFormData({});
    }
  }, [EditData]);

  const { mutate: PatchTicket } = useMutation({
    mutationFn,
    onSuccess: async (res) => {
      if (res.ok) {
        const response = await res.json();
        showToast({
          type: "success",
          heading: "Ticket Status updated",
          message: `Status changed to "${Status[response.status]}"`,
        });
        setLoading(false);
        toggleWaitCursor("remove");
        setUpdatedFormData((prev) => ({
          ...prev,
          status: response.status,
        }));
        refetch();
      }
    },
    onError: (res) => {
      showToast({
        type: "error",
        heading: "Ticket Status Update Failed",
        message: "Unable to change the ticket status.",
      });

      setLoading(false);
      toggleWaitCursor("remove");
    },
  });
  const GetDeviceName = (id) => {
    return Device?.find((val) => val.id === id)?.device_id || "-";
  };
  const [Loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const HandleChange = (e) => {
    if (!isView) {
      setLoading(true);
      toggleWaitCursor("set");

      PatchTicket({
        url: APPURL.tickets + EditData?.id + "/",
        data: JSON.stringify({ status: e.target.value }),
      });
    }
  };

  return (
    <Modal
      show={show}
      handleShow={handleShow}
      onHide={true}
      children={
        <>
          <div
            className="max-w-3xl min-w-2xl wrap-anywhere"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h5 className="font-semibold text-xl mb-4">
              Ticket No -
              <span className="text-gray-500 ml-2">{EditData.ticket_id}</span>
            </h5>
            <div className="grid grid-cols-4">
              <div className="col-span-3 flex flex-row items-center text-gray-600 font-semibold">
                <span className="font-semibold  text-black mr-2">
                  Device :{" "}
                </span>
                {GetDeviceName(EditData.device_info)}
              </div>
              {/* <div className="col-span-2 flex flex-row flex-wrap items-center">
                <span className="font-semibold text-gray-500">Mail ID:</span>
                <div className="ml-2 break-words max-w-full pr-4">
                  {EditData.email_id}
                </div>
              </div> */}
              <div className="md:col-span-1 col-span-4 text-right flex flex-row md:justify-end justify-start items-center ">
                <span className="font-semibold text-black">Status : </span>
                {isView ? (
                  <div
                    className={`ml-2 ${
                      EditData.status === "open"
                        ? " text-red-500"
                        : EditData.status === "in_progress"
                        ? "text-sky-500"
                        : EditData.status === "closed"
                        ? "text-green-700"
                        : ""
                    }`}
                  >
                    {Status[EditData.status]}
                  </div>
                ) : (
                  <select
                    disabled={Loading}
                    value={updatedFormData.status}
                    onChange={(e) => {
                      HandleChange(e);
                    }}
                    className={`block w-fit ml-2 p-2  border border-gray-400 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none cursor-pointer ${
                      Loading
                        ? "opacity-50 bg-gray-300 text-gray-600 cursor-wait"
                        : " "
                    }`}
                  >
                    {Object.entries(Status).map(([key, label]) => (
                      <option key={key} value={key} className="cursor-pointer">
                        {label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className=" col-span-4 w-[50%] md:w-full max-h-[40vh] overflow-y-auto custom-scrollbar mt-4 text-gray-600 mb-4">
                <h5 className="font-semibold  text-black  mb-2">
                  Description :{" "}
                </h5>
                {EditData?.description}
              </div>
              {EditData?.images?.map((val, index) => (
                <div
                  key={index}
                  className="relative w-[95%] h-[8em] aspect-square overflow-hidden rounded shadow cursor-pointer hover:scale-[1.01] transition-all duration-300"
                  onClick={() => setSelectedImage(val.image)}
                >
                  {/* Spinner from spinners-react */}
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                      <SpinnerCircularFixed
                        size={30}
                        thickness={200}
                        speed={200}
                        color="#838588"
                        secondaryColor="#c5c5c5"
                      />
                    </div>
                  )}

                  <img
                    src={val.image}
                    alt={`Image ${index + 1}`}
                    onLoad={() => handleImageLoad(index)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Full view"
                className="max-w-full max-h-full rounded shadow-lg"
              />
            </div>
          )}
        </>
      }
    />
  );
};
