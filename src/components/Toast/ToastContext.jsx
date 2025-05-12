import React, { createContext, useContext, useState, useCallback } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { createPortal } from "react-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(
    ({ type = "success", heading = "", message = "" }) => {
      const id = toastId++;
      const newToast = { id, type, heading, message };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, 3000); // Auto-remove after 3 seconds
    },
    []
  );

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const toastStyles = {
    success: {
      bg: "bg-green-100 border-green-400 text-green-700",
      icon: <FiCheckCircle className="text-green-600 text-xl mr-2" />,
    },
    error: {
      bg: "bg-red-100 border-red-400 text-red-700",
      icon: <FiXCircle className="text-red-600 text-xl mr-2" />,
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {createPortal(
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-4">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="min-w-[300px] w-full shadow-lg rounded-lg overflow-hidden bg-white border border-gray-300 animate-fade-in"
            >
              <div
                className={`flex items-center justify-between px-4 py-2 font-semibold text-base ${
                  toast.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-200 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  {toastStyles[toast.type].icon}
                  {toast.heading}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className={`ml-4 text-lg cursor-pointer ${
                    toast.type === "success"
                      ? " text-green-700"
                      : " text-red-700"
                  }`}
                >
                  <IoCloseCircleSharp size={20} />
                </button>
              </div>
              <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                {toast.message}
              </div>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
