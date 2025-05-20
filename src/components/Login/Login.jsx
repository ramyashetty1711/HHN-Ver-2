import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import EleneLogo from "../../assets/ElenaLogo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { IoCheckbox, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Modal from "../Common/Modal";
import { useToast } from "../Toast/ToastContext";
import CustomButton from "../Common/CustomButton";
import { store } from "../../redux/Store";
import {
  updateLoggedInStatus,
  updateShowVerification,
  updateVerificationData,
} from "../../redux/DataSlice";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { APPURL } from "../../URL";
import { getAuthToken, useFetch } from "../../query/UseFetch";
import { useMutation } from "@tanstack/react-query";
import { getData } from "../../query/UseFetchData";

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
        showToast({
          type: "success",
          heading: "Login Successfull",
          message: "Session started securely.",
        });

        if (data) {
          store.dispatch(
            updateVerificationData({
              email_verified: data.email_verified,
              phone_verified: data.phone_verified,
            })
          );
        }
        if (!data.email_verified || !data.phone_verified) {
          store.dispatch(updateShowVerification(true));
        } else {
          store.dispatch(updateShowVerification(false));
        }

        window.sessionStorage.setItem("user", JSON.stringify(data));
        store.dispatch(updateLoggedInStatus(true));
        navigate("/downloads");
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
      <div className=" h-full flex items-center justify-center bag-gradient-to-br from-sky-100 to-blue-400 bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 w-full max-w-md m-2"
        >
          <h2 className="text-2xl font-semibold text-gray-600 mb-2 text-center hidden">
            Elena HHN
          </h2>
          <h5 className="text-md font-medium text-gray-500 mb-4 text-center">
            Only for registered users.
            <br />
            {/* <span
              className=" text-[var(--primary)] cursor-pointer"
              onClick={(e) => {
                setShowRegister(true);
              }}
            >
              Click here to Verify.
            </span> */}
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

          <div className="mb-2 relative">
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
            {/* <button
              type="submit"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

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
            </button> */}
            <CustomButton
              type="submit"
              className="w-full"
              loading={loading}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                handleSubmit(e);
              }}
            >
              Login
            </CustomButton>
          </div>
          <hr className="mt-3 text-gray-300" />
          <div className=" text-center text-gray-500 mt-1">
            Forget password ?{" "}
            <Link to={"/contact"}>
              <span className="text-[var(--primary)] font-medium cursor-pointer">
                Contact Us
              </span>
            </Link>
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

  const [ShowVerify, setShowVerify] = useState({
    button: true,
    buttonLoading: false,
    mobile: false,
    email: false,
  });

  const LoadingKey = {
    verifyMail: "verifyMail",
    sendMail: "sendMail",
    verifyMobile: "verifyMobile",
    sendMobile: "sendMobile",
  };

  const [LoadingStatus, setLoadingStatus] = useState({
    sendMail: false,
    verifyMail: false,
    sendMobile: false,
    verifyMobile: false,
  });

  const handleLoadingStatus = (key, value) => {
    setLoadingStatus((prev) => ({ ...prev, [key]: value }));
  };

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

  const [status, setStatus] = useState({
    mobileVerified: false,
    mailVerified: false,
  });
  const { usePost } = useFetch();
  useEffect(() => {
    if (VerifiedStatus.mail_address && VerifiedStatus.mobile_no) {
      setShowRegister(false);
      showToast({
        type: "success",
        heading: "Profile Verified",
        message: "Kindly Login with your credentials.",
      });
    }
  }, [VerifiedStatus]);
  const mutationFn = async ({ url, data, loadingkey }) => {
    handleLoadingStatus(loadingkey, true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const response = await res.json();
        throw response; // 🛑 throw error
      }

      return res;
    } catch (err) {
      throw err; // ✅ pass to onError
    } finally {
      handleLoadingStatus(loadingkey, false); // always stop loading
    }
  };
  const {
    mutate: mutateRequestMobileOTP,
    isSuccess: isSuccessMobileOTP,
    isError: isErrorMobileOTP,
    error: errorMobileOTP,
  } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        setShowMobileOtp(true);
        showToast({
          type: "success",
          heading: "OTP sent successfully",
          message: "Enter the code to verify your identity.",
        });
      }
    },
    onError: (err) => {
      if (err.detail && err.detail.includes("Verified")) {
        showToast({
          type: "success",
          heading: "Verified",
          message: "Mobile Number already verified.",
        });
        setVerifiedStatus((prev) => ({
          ...prev,
          mobile_no: true,
        }));
        setShowMobileOtp(false);
      }
      console.error("Mobile OTP failed:", err);
    },
  });

  const {
    mutate: mutateRequestMailOTP,
    isSuccess: isSuccessMailOTP,
    isError: isErrorMailOTP,
    error: errorMailOTP,
  } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        setShowEmailOtp(true);
        showToast({
          type: "success",
          heading: "OTP sent successfully",
          message: "Enter the code to verify your identity.",
        });
      }
    },
    onError: (err) => {
      if (err.detail && err.detail.includes("Verified")) {
        showToast({
          type: "success",
          heading: "Verified",
          message: "Mail ID already verified.",
        });
        setVerifiedStatus((prev) => ({
          ...prev,
          mail_address: true,
        }));
        setShowMobileOtp(false);
      }
      console.error("Mail OTP failed:", err);
    },
  });

  const {
    mutate: mutateVerifyMobileOTP,
    isSuccess: isSuccessVerifyMobileOTP,
    isError: isErrorVerifyMobileOTP,
    error: errorVerifyMobileOTP,
  } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      if (data.status === 200) {
        setVerifiedStatus((prev) => ({
          ...prev,
          mobile_no: true,
        }));
        setShowMobileOtp(false);
      }
    },
    onError: (err) => {
      console.error("Mobile OTP verify failed:", err);
    },
  });

  const {
    mutate: mutateVerifyMailOTP,
    isLoading,
    isSuccess: isSuccessVerifyMailOTP,
    isError: isErrorVerifyMailOTP,
    error: errorVerifyMailOTP,
  } = useMutation({
    mutationFn,

    onSuccess: (data) => {
      if (data.status === 200) {
        setVerifiedStatus((prev) => ({
          ...prev,
          mail_address: true,
        }));
        setShowEmailOtp(false);
      }
    },
    onError: (err) => {
      console.error("Mail OTP verify failed:", err);
    },
  });

  // console.log(isLoadingMailOTP);

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
        message: "Enter valid Username and Password",
      });
      return;
    }
    if (key === "mobile_no") {
      const isValid = /^\d{10}$/.test(registerData.mobile_no);
      if (isValid) {
        RequestMobileOTP();
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
        RequestMailOTP();
      } else {
        showToast({
          type: "error",
          heading: "Error",
          message: "Please enter a valid mail address",
        });
      }
    }
  };

  useEffect(() => {}, []);

  const RequestMobileOTP = async () => {
    const PostData = {
      username: registerData.username,
      password: registerData.password,
      phone_no: registerData.mobile_no,
    };

    mutateRequestMobileOTP({
      url: APPURL.sendPhoneCode,
      data: PostData,
      isForm: false,
      loadingkey: LoadingKey.sendMobile,
    });
  };
  const VerifyMobileOTP = async () => {
    const PostData = {
      username: registerData.username,
      password: registerData.password,
      code: Number(registerData.mobile_otp),
    };

    mutateVerifyMobileOTP({
      url: APPURL.verifyPhoneCode,
      data: PostData,
      isForm: false,
      loadingkey: LoadingKey.verifyMobile,
    });
  };

  const RequestMailOTP = async () => {
    const PostData = {
      username: registerData.username,
      password: registerData.password,
      email: registerData.mail_address,
    };

    mutateRequestMailOTP({
      url: APPURL.sendEmailCode,
      data: PostData,
      isForm: false,
      attachToken: false,
      loadingkey: LoadingKey.sendMail,
    });
  };
  const VerifyMailOTP = async () => {
    const PostData = {
      username: registerData.username,
      password: registerData.password,
      code: registerData.mail_otp,
    };

    mutateVerifyMailOTP({
      url: APPURL.verifyEmailCode,
      data: PostData,
      isForm: false,
      attachToken: false,
      loadingkey: LoadingKey.verifyMail,
    });
  };

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
          Verify Registered Mobile No & Mail ID
        </h5>

        {/* Username */}
        {ShowVerify.button && (
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
        )}

        {ShowVerify.button && (
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
        )}

        {ShowVerify.button && (
          <div className="w-full">
            <CustomButton
              className="w-full py-3"
              loading={ShowVerify.buttonLoading}
            >
              Verify
            </CustomButton>
          </div>
        )}

        {/* Mobile Number */}
        {ShowVerify.button && (
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-500 flex flex-row">
              Mobile Number{" "}
              {!VerifiedStatus.mobile_no && (
                <span className="flex flex-row items-center">
                  - Verified{" "}
                  <IoCheckbox size={20} className="ml-2 !text-green-500" />
                </span>
              )}
            </label>
            {VerifiedStatus.mobile_no && (
              <div className="flex gap-2">
                <input
                  name="mobile_no"
                  type="tel"
                  value={registerData.mobile_no}
                  disabled={VerifiedStatus.mobile_no}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 mt-1 border-gray-400  ${
                    VerifiedStatus.mobile_no
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter your 10 digit mobile number"
                />

                <CustomButton
                  disabled={FieldStatus.mobile_no || VerifiedStatus.mobile_no}
                  loading={LoadingStatus.sendMobile}
                  onClick={(e) => {
                    e.stopPropagation();
                    ValidateField("mobile_no");
                  }}
                  className="min-w-[4.5em] "
                >
                  {/* {VerifiedStatus.mobile_no ? (
                  <div className="flex flex-row items-center text-gray-700">
                    <IoCheckbox size={20} className="mr-2 !text-green-500" />
                    Verified
                  </div>
                ) : ( */}
                  Verify
                  {/* )} */}
                </CustomButton>
              </div>
            )}
            {showMobileOtp && (
              <div className="mt-2">
                <OtpInput
                  value={registerData.mobile_otp}
                  isLoading={LoadingStatus.verifyMobile}
                  onChange={(otp) =>
                    setRegisterData((prev) => ({ ...prev, mobile_otp: otp }))
                  }
                  handleSubmit={() => {
                    // setVerifiedStatus((prev) => ({
                    //   ...prev,
                    //   mobile_no: true,
                    // }));
                    // setShowMobileOtp(false);
                    VerifyMobileOTP();
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Email Address */}
        {!ShowVerify.button && (
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
                disabled={
                  FieldStatus.mail_address || VerifiedStatus.mail_address
                }
                loading={LoadingStatus.sendMail}
                onClick={(e) => {
                  e.stopPropagation();
                  ValidateField("mail_address");
                }}
                className="min-w-[4.5em]  text-white"
              >
                {/* {VerifiedStatus.mail_address ? (
                <>
                  <div className="flex flex-row items-center text-gray-700">
                    <IoCheckbox size={20} className="mr-2 !text-green-500" />
                    Verified
                  </div>
                </>
              ) : ( */}
                Verify
                {/* )} */}
              </CustomButton>
            </div>
            {showEmailOtp && (
              <div className="mt-2">
                <div className="font-medium text-gray-500">Enter Mail OTP:</div>
                <OtpInput
                  value={registerData.mail_otp}
                  isLoading={LoadingStatus.verifyMail}
                  onChange={(otp) =>
                    setRegisterData((prev) => ({ ...prev, mail_otp: otp }))
                  }
                  handleSubmit={() => {
                    VerifyMailOTP();
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

function OtpInput({ value, onChange, namePrefix, handleSubmit, isLoading }) {
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

      <CustomButton
        disabled={disabledStatus}
        loading={isLoading ? isLoading : false}
        onClick={(e) => {
          e.stopPropagation();
          if (handleSubmit) {
            handleSubmit();
          }
        }}
        className={`${
          disabledStatus
            ? "bg-green-500/50 cursor-not-allowed"
            : "bg-green-600 cursor-pointer hover:bg-green-700"
        }   px-3 rounded-lg font-medium transition-all duration-300 min-w-[5.5em]`}
      >
        Submit
      </CustomButton>
    </div>
  );
}
