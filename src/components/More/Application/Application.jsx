import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { CgCheckO } from "react-icons/cg";
import { useFetch } from "../../../query/UseFetch";
import { APPURL } from "../../../URL";
import CustomButton from "../../Common/CustomButton";
import { useToast } from "../../Toast/ToastContext";
import { MdAddCircleOutline } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { useLocalUserData } from "../../../query/UseLocalData";
import { getData } from "../../../query/UseFetchData";
import { FaDownload } from "react-icons/fa";
import { SpinnerCircularFixed } from "spinners-react";

function Application() {
  const SessionData = useLocalUserData();
  const [addFormData, setAddFormData] = useState({
    application_name: "",
    exe_file: null,
  });

  const [Add, setAdd] = useState(false);
  const [AddStatus, setAddStatus] = useState({
    loading: false,
    disabled: false,
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const { get, usePost } = useFetch();
  const { mutate, isPostLoading } = usePost();
  const { showToast } = useToast();

  const {
    data: exe,
    refetch: refetchTicket,
    isLoading: ApplicationLoading,
  } = useQuery({
    queryKey: ["exe"],
    queryFn: () => getData(APPURL.exe, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  console.log(ApplicationLoading);

  const handleExeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setAddFormData({
        exe_file: file,
        application_name: nameWithoutExt,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!addFormData.exe_file) {
      showToast({
        type: "error",
        heading: "Missing File",
        message: "Please upload an .exe file.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("application_name", addFormData.application_name);
    formData.append("exe_file", addFormData.exe_file);

    setAddStatus({ loading: true, disabled: true });

    try {
      const response = await fetch(APPURL.uploadApplication, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      showToast({
        type: "success",
        heading: "Success",
        message: "Application uploaded successfully.",
      });

      setAddFormData({ application_name: "", exe_file: null });
      setAdd(false);
      refetch();
    } catch (error) {
      showToast({
        type: "error",
        heading: "Upload Failed",
        message: error.message,
      });
    } finally {
      setAddStatus({ loading: false, disabled: false });
    }
  };

  return (
    <>
      {/* {role === 0 && (
        <div className="flex flex-row justify-end mb-3">
          <div
            className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900 flex items-center"
            onClick={() => setAdd(true)}
          >
            Add <MdAddCircleOutline className="ml-1"/>
          </div>
        </div>
      )} */}

      <div className="pb-4 max-h-[72vh]  overflow-y-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">S. No</th>
              <th className="px-4 py-2">Application Name</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="md:flex md:justify-center py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ApplicationLoading ? (
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
            ) : exe && exe.length > 0 ? (
              exe.map((ticket, index) => (
                <tr key={ticket.ticket_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{ticket.file_name}</td>
                  <td className="px-4 py-2">
                    {new Date(ticket.updated_at).toLocaleString()}
                  </td>
                  <td className="flex justify-center py-2">
                    <a href={ticket.file} download>
                      <FaDownload
                        className="border border-[var(--primary)] text-[var(--primary)] rounded-md p-1 cursor-pointer hover:bg-[var(--secondary)]"
                        size={25}
                      />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No application available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={Add} handleShow={() => setAdd(false)} onHide={true}>
        <div onClick={(e) => e.stopPropagation()} className="w-3xl">
          <h4 className="text-lg font-semibold mb-2">Add Application</h4>
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
                disabled
                className="w-full border border-[var(--secondary)] p-2 rounded cursor-not-allowed  text-gray-500"
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
                className="w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none cursor-pointer"
              />
              {addFormData.exe_file && (
                <p className="mt-1 text-sm text-gray-600">
                  Selected File: {addFormData.exe_file.name}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <CustomButton
                disabled={AddStatus.disabled}
                loading={AddStatus.loading}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </CustomButton>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

const Modal = ({ show, handleShow, children, onHide = false }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onHide && handleShow()}
    >
      <div
        className="relative w-fit max-w-full rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => handleShow(false)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <IoIosCloseCircle
            size={20}
            className="text-red-500 cursor-pointer hover:text-red-700"
          />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Application;
