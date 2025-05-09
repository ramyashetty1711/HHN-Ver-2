import React from "react";
import classNames from "classnames"; // Optional, for clean class merging
import { SpinnerCircularFixed } from "spinners-react"; // Import spinner from spinners-react

export default function CustomButton({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  stopPropagation = false,
  type = "button",
  ...props
}) {
  const handleClick = (e) => {
    if (stopPropagation) e.stopPropagation();
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  const baseClasses =
    "px-4 py-2 rounded transition-all font-medium flex items-center justify-center";
  const enabledClasses =
    "border-1 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white  cursor-pointer";
  const disabledClasses = "bg-gray-300 text-gray-600 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={classNames(
        baseClasses,
        disabled || loading ? disabledClasses : enabledClasses,
        className
      )}
      {...props}
    >
      {loading ? (
        <SpinnerCircularFixed
          size={20}
          color="white"
          thickness={200}
          speed={250}
        /> // Use CircularSpinner from spinners-react
      ) : (
        children
      )}
    </button>
  );
}
