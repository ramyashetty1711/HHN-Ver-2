import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import EleneLogo from "../../assets/ElenaLogo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCheckbox, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Modal from "../Common/Modal";
import { useToast } from "../Toast/ToastContext";
import CustomButton from "../Common/CustomButton";
import { store } from "../../redux/Store";
import { updateLoggedInStatus } from "../../redux/DataSlice";
import { useNavigate } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { APPURL } from "../../URL";
import { useFetch } from "../../query/UseFetch";

export default function Login() {
  const { showToast } = useToast();

  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // return;
    if (form.username.trim() === "" || form.password.trim() === "") {
      showToast({
        type: "error",
        heading: "Error",
        message: "Enter valid Username and password",
      });
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(APPURL.login, form);
      if (response.status === 200) {
        setSuccess("Login successful!");
        const data = await response.data;
        showToast({ type: "success", heading: "Login Successfull" });
        window.sessionStorage.setItem("user", JSON.stringify(data));
        store.dispatch(updateLoggedInStatus(true));
        navigate("/support");
      }
    } catch (err) {
      showToast({
        type: "error",
        heading: "Invalid Credentials",
        message:
          err.response?.data?.error || "An error occurred while logging in.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" min-h-[78.5vh] flex items-center justify-center bag-gradient-to-br from-sky-100 to-blue-400 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md "
        >
          <div className="w-full flex justify-center mb-4 hidden">
            <img src={EleneLogo} className="h-[120px]" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2 text-center hidden">
            Elena Handheld Navigator
          </h2>
          <h5 className="text-md font-medium text-gray-500 mb-4 text-center">
          You need to verify your mobile number and mail address to access the website.  <br />
            <span
              className=" text-[var(--primary)] cursor-pointer"
              onClick={(e) => {
                setShowRegister(true);
              }}
            >
              Click here to Verify.
            </span>
          </h5>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <div className="mb-4">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-gray-500 text-sm font-bold mb-2">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10 border-gray-400"
              placeholder="Enter your password"
            />

            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOffSharp size={20} />
              ) : (
                <IoEyeSharp size={20} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // showToast({
                //   type: "error",
                //   heading: "Error",
                //   message: "Something went wrong!",
                // });
                handleSubmit(e);
              }}
              className="bg-[var(--primary)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex justify-center"
            >
              {loading ? (
                <SpinnerCircularFixed
                  color="white"
                  speed={250}
                  thickness={200}
                  size={20}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
      <Register showRegister={showRegister} setShowRegister={setShowRegister} />
    </>
  );
}

const Register = ({ showRegister, setShowRegister }) => {
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    mobile_no: "",
    mail_address: "",
    mobile_otp: "",
    mail_otp: "",
  });
  const { post } = useFetch();
  const {
    mutate: mutateGenerateMobileOTP,
    isLoading: isLoadingGenerateMobileOTP,
    isSuccess: isSuccessGenerateMobileOTP,
    isError: isErrorGenerateMobileOTP,
    error: errorGenerateMobileOTP,
  } = post;

  const {
    mutate: mutateGenerateMailOTP,
    isLoading: isLoadingGenerateMailOTP,
    isSuccess: isSuccessGenerateMailOTP,
    isError: isErrorGenerateMailOTP,
    error: errorGenerateMailOTP,
  } = post;

  const {
    mutate: mutateMobileOTP,
    isLoading: isLoadingMobileOTP,
    isSuccess: isSuccessMobileOTP,
    isError: isErrorMobileOTP,
    error: errorMobileOTP,
  } = post;

  const {
    mutate: mutateMailOTP,
    isLoading: isLoadingMailOTP,
    isSuccess: isSuccessMailOTP,
    isError: isErrorMailOTP,
    error: errorMailOTP,
  } = post;

  const [showMobileOtp, setShowMobileOtp] = useState(false);
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [FieldStatus, setFieldStatus] = useState({
    mobile_no: false,
    mail_address: false,
  });

  const [VerifiedStatus, setVerifiedStatus] = useState({
    mobile_no: false,
    mail_address: false,
  });

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!showRegister) {
      setRegisterData({
        username: "",
        password: "",
        mobile_no: "",
        mail_address: "",
        mobile_otp: "",
        mail_otp: "",
      });
      setShowMobileOtp(false);
      setShowEmailOtp(false);
    }
  }, [showRegister]);

  const ValidateField = (key) => {
    if (
      registerData.username.trim() === "" ||
      registerData.password.trim() === ""
    ) {
      showToast({
        type: "error",
        heading: "Error",
        message: "Enter valid Username and password",
      });
      return;
    }
    if (key === "mobile_no") {
      const isValid = /^\d{10}$/.test(registerData.mobile_no);
      if (isValid) {
        // setFieldStatus([(prev) => ({ ...prev, [key]: true })]);
        // setShowMobileOtp(true);

        mutateGenerateMobileOTP({
          url: APPURL.sendPhoneCode,
          data: {
            username: registerData.username,
            password: registerData.password,
            phone_no: registerData.mobile_no,
          },
          isForm: false,
        });
      } else {
        showToast({
          type: "error",
          heading: "Error",
          message: "Enter valid Mobile Number",
        });
      }
    }

    if (key === "mail_address") {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        registerData.mail_address
      );
      if (isValid) {
        setShowEmailOtp(true);
        setFieldStatus([(prev) => ({ ...prev, [key]: true })]);
      } else {
        showToast({
          type: "error",
          heading: "Error",
          message: "Please enter a valid mail address",
        });
      }
    }
  };

  useEffect(() => {}, [
    isSuccessGenerateMailOTP,
    isSuccessGenerateMobileOTP,
    isSuccessMailOTP,
    isSuccessMobileOTP,
  ]);

  return (
    <Modal
      isOpen={showRegister}
      onClose={() => setShowRegister(false)}
      //   onHide={true}
    >
      <div
        className="min-w-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h5 className="font-semibold text-gray-600 text-xl mb-4">
          Verify Mobile No & Mail ID
        </h5>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500">
            Username
          </label>
          <input
            name="username"
            type="text"
            value={registerData.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 border-gray-400"
            placeholder="Enter username"
          />
        </div>

        {/* Password */}
        {/* <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500">
            Password
          </label>
          <input
            name="password"
            type="password"
            value={registerData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1 border-gray-400"
            placeholder="Enter password"
          />
        </div>
         */}
        <div className="mb-4 relative">
          <label className="block text-lg font-medium text-gray-500 mb-1">
            Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={registerData.password}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 mt-1 border-gray-400"
            placeholder="Enter your password"
          />

          <div
            className="absolute right-3 top-[62%] cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <IoEyeOffSharp size={20} />
            ) : (
              <IoEyeSharp size={20} />
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500">
            Mobile Number
          </label>
          <div className="flex gap-2">
            <input
              name="mobile_no"
              type="tel"
              value={registerData.mobile_no}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 border-gray-400"
              placeholder="Enter your 10 digit mobile number"
            />

            <CustomButton
              disabled={FieldStatus.mobile_no || VerifiedStatus.mobile_no}
              onClick={(e) => {
                e.stopPropagation();
                ValidateField("mobile_no");
              }}
              className="min-w-[4.5em]"
            >
              {VerifiedStatus.mobile_no ? (
                <div className="flex flex-row items-center">
                  <IoCheckbox size={20} className="mr-2 !text-green-500" />
                  Verified
                </div>
              ) : (
                "Verify"
              )}
            </CustomButton>
          </div>
          {showMobileOtp && (
            <div className="mt-2">
              <OtpInput
                value={registerData.mobile_otp}
                onChange={(otp) =>
                  setRegisterData((prev) => ({ ...prev, mobile_otp: otp }))
                }
                handleSubmit={() => {
                  setVerifiedStatus((prev) => ({
                    ...prev,
                    mobile_no: true,
                  }));
                  setShowMobileOtp(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500">
            Mail ID
          </label>
          <div className="flex gap-2">
            <input
              name="mail_address"
              type="email"
              value={registerData.mail_address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1 border-gray-400"
              placeholder="Enter mail address"
            />

            <CustomButton
              disabled={FieldStatus.mail_address || VerifiedStatus.mail_address}
              onClick={(e) => {
                e.stopPropagation();
                ValidateField("mail_address");
              }}
              className="min-w-[4.5em]"
            >
              {VerifiedStatus.mail_address ? (
                <>
                  <div className="flex flex-row items-center">
                    <IoCheckbox size={20} className="mr-2 !text-green-500" />
                    Verified
                  </div>
                </>
              ) : (
                "Verify"
              )}
            </CustomButton>
          </div>
          {showEmailOtp && (
            <div className="mt-2">
              <div className="font-medium text-gray-500">Enter Mail OTP:</div>
              <OtpInput
                value={registerData.mail_otp}
                onChange={(otp) =>
                  setRegisterData((prev) => ({ ...prev, mail_otp: otp }))
                }
                handleSubmit={() => {
                  setVerifiedStatus((prev) => ({
                    ...prev,
                    mail_address: true,
                  }));
                  setShowEmailOtp(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

function OtpInput({ value, onChange, namePrefix, handleSubmit }) {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // Only digits
    if (val.length > 1) return; // Prevent pasting multiple digits
    const updated = value.split("");
    updated[index] = val;
    onChange(updated.join(""));

    if (val && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const disabledStatus = value.trim().length < 6;

  return (
    <div className="flex gap-2">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          ref={(el) => (inputs.current[i] = el)}
          className="w-10 h-10 text-center border rounded text-lg"
        />
      ))}
      <button
        className={`${
          disabledStatus
            ? "bg-green-500/50 cursor-not-allowed"
            : "bg-green-600 cursor-pointer hover:bg-green-700"
        }  text-white px-3 rounded-lg font-medium transition-all duration-300`}
        disabled={disabledStatus}
        onClick={() => {
          if (handleSubmit) {
            handleSubmit();
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
