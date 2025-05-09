import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import CustomButton from "../../Common/CustomButton";
import { FaDownload } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";

function Apk() {
  const [add, setAdd] = useState(false);
  const [addFormData, setAddFormData] = useState({
    application_name: "",
    apk_file: null,
  });
  const [addStatus, setAddStatus] = useState({
    loading: false,
    disabled: false,
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const handleApkChange = (e) => {
    setAddFormData((prev) => ({
      ...prev,
      apk_file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", addFormData);
    setAdd(false);
  };

  return (
    <div>
      <div className="pb-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
        {role === 0 && (
          <div className="flex flex-row justify-end mb-3">
            <div
              className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900 flex items-center"
              onClick={() => setAdd(true)}
            >
              Add <MdAddCircleOutline className="ml-1"/>
            </div>
          </div>
        )}

        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">Updated At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {/* Table rows go here */}
          </tbody>
        </table>

        <Modal show={add} handleShow={() => setAdd(false)} onHide={true}>
          <div className="w-3xl">
            <h4 className="text-lg font-semibold mb-2">Add Application</h4>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  APK File
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
                  name="apk_file"
                  accept=".apk"
                  onChange={handleApkChange}
                  className="w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none cursor-pointer"
                />
                {addFormData.apk_file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected File: {addFormData.apk_file.name}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <CustomButton
                  disabled={addStatus.disabled}
                  loading={addStatus.loading}
                  onClick={handleSubmit}
                >
                  Submit
                </CustomButton>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
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

export default Apk;
