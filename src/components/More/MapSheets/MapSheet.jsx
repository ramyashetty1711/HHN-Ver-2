import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import CustomButton from "../../Common/CustomButton";
import { mutationPostFn, useFetch } from "../../../query/UseFetch";
import { APPURL } from "../../../URL";
import { FaDownload } from "react-icons/fa";
import { SpinnerCircularFixed } from "spinners-react";
import { useLocalUserData } from "../../../query/UseLocalData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "../../Toast/ToastContext";
import { getData } from "../../../query/UseFetchData";

function MapSheet() {
  const [add, setAdd] = useState(false);
  const SessionData = useLocalUserData();
  const { showToast } = useToast();
  const [addFormData, setAddFormData] = useState({
    mapsheet_no: "",
    remarks: "",
    // users: [],
  });

  const [addStatus, setAddStatus] = useState({
    loading: false,
    disabled: false,
  });

  const {
    data: mapsheets,
    refetch: refetchMapsheets,
    isLoading: MapSheetLoading,
  } = useQuery({
    queryKey: ["mapsheets"],
    queryFn: () => getData(APPURL.mapsheets, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const mutationFn = async ({ url, data }) => {
    // setAddStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch(url, {
        method: "POST",
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
    }
  };

  const { mutate: PostNewMapsheet, isPending } = useMutation({
    mutationFn,

    onSuccess: (data) => {
      if (data.status === 201) {
        showToast({
          type: "success",
          heading: "Mapsheet request Submitted",
          message:
            "Your request has been received. We’ll get back to you shortly.",
        });
      }
      setAddFormData({ mapsheet_no: "", remarks: null });
      setAdd(false);
    },
    onError: (err) => {
      if (err.detail) {
        showToast({
          type: "error",
          heading: "Error",
          message:
            err.detail ||
            "Error occured while requesting new mapsheet. Kindly try again later",
        });
      }
    },
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    PostNewMapsheet({
      url: APPURL.mapRequest,
      data: JSON.stringify({
        mapsheet_no: addFormData.mapsheet_no,
        req_detail: addFormData.remarks,
      }),
    });
    // setAdd(false);
  };

  const handleDownload = (url, fileName) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "download.tiff";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const SubmitDisabled =
    addFormData.mapsheet_no === "" || addFormData.remarks.length < 10;

  return (
    <div className="pb-4">
      <div className="flex flex-row justify-end mb-2">
        <div
          className="p-2 px-3 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900"
          onClick={() => setAdd(true)}
        >
          Request new Map sheet
        </div>
      </div>
      <div className=" max-h-[60vh] overflow-y-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Map Sheet Name</th>
              <th className="px-4 py-2">Updated at</th>
              <th className="md:flex md:justify-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {MapSheetLoading ? (
              <tr className="text-center">
                <td colSpan={4} className="py-6">
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
            ) : mapsheets && mapsheets.length > 0 ? (
              mapsheets.map((sheet, index) => (
                <tr key={sheet.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{sheet.file_name}</td>
                  <td className="px-4 py-2">
                    {new Date(sheet.uploaded_at).toLocaleString()}
                  </td>
                  <td className="flex justify-center py-2">
                    <a href={sheet.file} download>
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
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Map Sheets not available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Modal show={add} handleShow={() => setAdd(false)} onHide={true}>
          <div className="w-2xl">
            <h4 className="text-xl font-semibold mb-2">
              Request New Map Sheet
            </h4>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Map Sheet No
                </label>
                <input
                  type="text"
                  name="mapsheet_no"
                  value={addFormData.mapsheet_no}
                  onChange={(e) => {
                    setAddFormData((prev) => ({
                      ...prev,
                      mapsheet_no: e.target.value,
                    }));
                  }}
                  placeholder="Enter Map Sheet No"
                  className="w-full max-w-xs border border-[var(--secondary)] p-2 rounded  text-gray-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={addFormData.remarks}
                  onChange={(e) => {
                    setAddFormData((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }));
                  }}
                  placeholder="Enter remarks"
                  className="w-full  max-w-xs border border-[var(--secondary)] p-2 rounded  text-gray-500"
                />
              </div>

              {/* <div className="hidden">
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Map Sheet
                </label>
                <input
                  type="file"
                  name="mapSheet"
                  onChange={(e) =>
                    setAddFormData((prev) => ({
                      ...prev,
                      mapSheet: e.target.files[0],
                    }))
                  }
                  className="w-full border border-[var(--secondary)] p-2 rounded"
                />
              </div> */}

              <div className="hidden">
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Users
                </label>
                <select
                  name="users"
                  value={addFormData.users}
                  onChange={handleChange}
                  className="w-full border border-[var(--secondary)] p-2 rounded"
                >
                  <option value="">Select Users</option>
                  {/* Add user options dynamically if available */}
                </select>
              </div>

              <div className="md:col-span-3 flex md:justify-end justify-start">
                <CustomButton
                  disabled={SubmitDisabled}
                  loading={isPending}
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

export default MapSheet;
