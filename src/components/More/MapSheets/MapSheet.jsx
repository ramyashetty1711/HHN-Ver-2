import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import CustomButton from "../../Common/CustomButton";
import { useFetch } from '../../../query/UseFetch';
import { APPURL } from '../../../URL';

function MapSheet() {
  const [add, setAdd] = useState(false)
  const { get, usePost } = useFetch();
  const [addFormData, setAddFormData] = useState({
    mapSheetName: '',
    mapSheet: null,
    users:[]
  })
  const [addStatus, setAddStatus] = useState({
    loading: false,
    disabled: false,
  })

  
    const { data: tickets, refetch } = get({
      key: "tickets",
      url: APPURL.tickets,
    });
  

  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted:', addFormData)
    setAdd(false)
  }



  return (
    <div>
      <div className="pb-4 max-h-[72vh] overflow-y-auto custom-scrollbar">
        {/* {role === 0 && (
          <div className="flex flex-row justify-end mb-3">
            <div
              className="p-2 bg-[var(--primary)] text-white rounded-lg font-semibold cursor-pointer hover:bg-blue-900"
              onClick={() => setAdd(true)}
            >
              Add
            </div>
          </div>
        )} */}

        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Map Sheet Name</th>
              <th className="px-4 py-2">Updated at</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
          {tickets && tickets.length > 0 ? (
      tickets.map((ticket, index) => (
        <tr key={ticket.ticket_id} className="hover:bg-gray-50">
          {/* <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">{ticket.application_name}</td>
          <td className="px-4 py-2">
            {new Date(ticket.updated_at).toLocaleString()}
          </td>
          <td className="px-4 py-2">
            {ticket.status === "closed" && (
              <CgCheckO className="text-green-700 inline-block mr-1" size={18} />
            )}
            {ticket.status}
          </td> */}
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
          <div className="w-3xl">
            <h4 className="text-lg font-semibold mb-2">Add Map Sheet</h4>
            <form
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Name
                </label>
                <input
  type="text"
  name="application_name"
  value={addFormData.mapSheetName}
  disabled
  className="w-full border border-[var(--secondary)] p-2 rounded cursor-not-allowed  text-gray-500"
/>
              </div>

              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Map Sheet
                </label>
                <input
                  type="file"
                  name="deviceId"
                  onChange={handleChange}
                  value={addFormData.mapSheet}
                  className="w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none "
                  readOnly
                />
               
              </div>

              <div>
                <label className="block mb-1 text-md font-medium text-gray-500">
                  Users
                </label>
                <select className='w-full  border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none'>
                    <option>Users</option>
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end">
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
  )
}

const Modal = ({ show, handleShow, children, onHide = false }) => {
  if (!show) return null

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
  )
}

export default MapSheet
