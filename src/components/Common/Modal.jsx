import React from "react";
import { IoCloseCircle } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children, onHide = false }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={(e) => {
        if (onHide) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-lg  w-fit relative p-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <IoCloseCircle size={25} />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
