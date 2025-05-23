import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import CustomButton from "../../Common/CustomButton";
import { MdAddCircleOutline } from "react-icons/md";
import { getData, useFetch } from "../../../query/UseFetch";
import { APPURL } from "../../../URL";
import { CgCheckO } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { useLocalUserData } from "../../../query/UseLocalData";
import { SpinnerCircularFixed } from "spinners-react";

function Devices() {
  const [add, setAdd] = useState(false);
  const SessionData = useLocalUserData();

  const [addFormData, setAddFormData] = useState({
    deviceSerNo: "",
    deviceId: "",
  });
  const [addStatus, setAddStatus] = useState({
    loading: false,
    disabled: false,
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", addFormData);
    setAdd(false);
  };

  // const { data: tickets, refetch } = get({
  //   key: "tickets",
  //   url: APPURL.tickets,
  // });

  const {
    data: devices,
    refetch: refetchTicket,
    isLoading: DevicesLoading,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  // console.log(tickets);

  const sessionData = useLocalUserData();
  const FilteredDevices = Array.isArray(devices)
    ? devices.filter((val) => val.device_user === sessionData?.user_id)
    : [];
  return (
    <div>
      <div className="pb-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
        {/* {role === 0 && (
          <div className="flex flex-row justify-end mb-3">
            <div
              className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900 flex items-center"
              onClick={() => setAdd(true)}
            >
              Add < MdAddCircleOutline className='ml-1'/>
            </div>
          </div>
        )} */}

        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">S. No</th>
              <th className="px-4 py-2">Ser.No</th>
              <th className="px-4 py-2">Device ID</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {DevicesLoading ? (
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
            ) : FilteredDevices && FilteredDevices.length > 0 ? (
              FilteredDevices.map((device, index) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{device.ser_no}</td>
                  <td className="px-4 py-2">{device.device_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Devices not available
                </td>
              </tr>
            )}
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
                  Device S. No
                </label>
                <input
                  type="text"
                  name="deviceSerNo"
                  onChange={handleChange}
                  value={addFormData.deviceSerNo}
                  className="w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Device Id
                </label>
                <input
                  type="text"
                  name="deviceId"
                  onChange={handleChange}
                  value={addFormData.deviceId}
                  className="w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                />
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

export default Devices;
