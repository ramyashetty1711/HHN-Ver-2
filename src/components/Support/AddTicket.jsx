import React, { useEffect, useState } from "react";
import { useLocalUserData } from "../../query/UseLocalData";
import { useToast } from "../Toast/ToastContext";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getData } from "../../query/UseFetch";

import CustomButton from "../Common/CustomButton";
import { Modal } from "./Ticket";
import { store } from "../../redux/Store";
import { updateAddRaiseTicket } from "../../redux/DataSlice";
import { APPURL } from "../../URL";

export default function AddTicket() {
  const SessionData = useLocalUserData();
  const { showToast } = useToast();
  const UserRole = useSelector((state) => state.data.currentUserRole);

  const [addFormData, setAddFormData] = useState({
    device_id: "",
    name: "",

    description: "",
    uploaded_images: [],
  });
  const AddTicket = useSelector((state) => state.data.AddRaiseTicket);

  const [EditTicket, setEditTicket] = useState({
    show: false,
    data: {},
    isView: false,
  });

  // const { data: devices, isLoading } = useFetchData("devices");

  const { data: devices } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData?.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  const {
    data: tickets,
    refetch: refetchTicket,
    isLoading: TicketLoading,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getData(APPURL.tickets, SessionData.token),
    enabled: !!SessionData?.token,
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
        store.dispatch(updateAddRaiseTicket(false));
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
    store.dispatch(updateAddRaiseTicket(false));
    setAddFormData({
      device_id: "",
      name: "",
      description: "",
      uploaded_images: [],
    });
  };
  return (
    <Modal
      show={AddTicket}
      onHide={true}
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
                  {devices
                    ?.filter((val) => val.device_user === SessionData?.user_id)
                    .map((device) => (
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
  );
}
