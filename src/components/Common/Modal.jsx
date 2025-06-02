import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import classNames from "classnames";

export default function Modal({
  isOpen,
  onClose,
  children,
  bgBlur = false,
  CloseButton = true,
}) {
  if (!isOpen) return null;

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        {
          "backdrop-blur bg-black/80": bgBlur,
        }
      )}
      onClick={onClose} // close modal when clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg w-fit relative p-6"
        onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
      >
        {CloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <IoCloseCircle size={25} />
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
