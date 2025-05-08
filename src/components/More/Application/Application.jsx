import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoIosCloseCircle } from "react-icons/io";
import { CgCheckO } from "react-icons/cg";
import { useFetch } from "../../../query/UseFetch";
import { APPURL } from "../../../URL";
import CustomButton from "../../Common/CustomButton";
import { useToast } from "../../Toast/ToastContext";

function Application() {
  const [addFormData, setAddFormData] = useState({
    application_name: "",
    exe_file: null,
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;
  console.log(role);

  const { get, usePost } = useFetch();
  const { mutate, isPostLoading, isSuccess, isError, error, data } = usePost();
  const {
    data: devices,
    isLoading,
    isDeviceError,
    Deviceerror,
    refetch,
  } = get({
    key: "devices",
    url: APPURL.devices,
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
        throw response;
      }

      return res;
    } catch (err) {
      throw err;
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

  const handleExeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setAddFormData((prev) => ({
        ...prev,
        exe_file: file,
        application_name: nameWithoutExt,
      }));
    }
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
    // const ValidateField = console.log("Form Submitted", addFormData);
  };

  const [Add, setAdd] = useState(false);
  const { data: tickets } = get({
    key: "tickets",
    url: APPURL.tickets,
  });
  console.log(tickets);

  return (
    <>
      {role === 0 && (
        <div className="flex flex-row justify-end mb-3">
          <div
            className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900"
            onClick={() => {
              setAdd(true);
            }}
          >
            Add
          </div>
        </div>
      )}
      <div className="pb-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Application Name</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {tickets?.map((ticket) => (
              <tr key={ticket.ticket_id} className="hover:bg-gray-50">
                {/* <td className="px-4 py-2">{ticket.ticket_id}</td>
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
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={Add}
        handleShow={() => {
          setAdd(false);
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
            <h4 className="text-lg">Add Application</h4>
            <div className="p-4">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block mb-1 text-md font-medium text-gray-500">
                    Application Name
                  </label>
                  <input
                    type="text"
                    name="application_name"
                    value={addFormData.application_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Application name"
                    readOnly
                  />
                </div>
                <div>
  <label className="block mb-1 text-md font-medium text-gray-500">
    Upload the File
  </label>
  <input
    type="file"
    name="exe_file"
    accept=".exe"
    onChange={handleExeChange}
    className="w-full border border-gray-300 rounded px-3 py-2 cursor-pointer"
  />
  {addFormData.exe_file && (
    <p className="mt-1 text-sm text-gray-600">
      Selected File: {addFormData.exe_file.name}
    </p>
  )}
</div>


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

export default Application;
