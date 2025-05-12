import { IoCheckbox, IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import Modal from "../Common/Modal";
import CustomButton from "../Common/CustomButton";
import { useToast } from "../Toast/ToastContext";
import { useEffect, useRef, useState } from "react";
import { useFetch } from "../../query/UseFetch";
import { useMutation } from "@tanstack/react-query";
import { APPURL } from "../../URL";
import { useSelector } from "react-redux";
import { useLocalUserData } from "../../query/UseLocalData";
import { store } from "../../redux/Store";
import {
  updateShowVerification,
  updateVerificationData,
} from "../../redux/DataSlice";

const VerificationModal = ({ showRegister, setShowRegister }) => {
  const { showToast } = useToast();

  //   const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    mobile_no: "",
    mail_address: "",
    mobile_otp: "",
    mail_otp: "",
  });

  const ShowModal = useSelector((state) => state.data.ShowVerification);
  const VerificationData = useSelector((state) => state.data.VerificationData);
  const ShowRef = useRef(ShowModal);
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
  const SessionData = useLocalUserData();
  const [VerifiedStatus, setVerifiedStatus] = useState({
    email_verified: false,
    phone_verified: false,
  });

  useEffect(() => {
    if (
      ShowRef.current &&
      VerificationData.email_verified &&
      VerificationData.phone_verified
    ) {
      showToast({
        type: "success",
        heading: "Account Verified",
        message:
          "Your account is verified. You now have full access to your account.",
      });

      store.dispatch(updateShowVerification(false));
    }
    if (VerificationData) {
      setVerifiedStatus({ ...VerificationData });
    }
  }, [VerificationData, ShowRef]);

  useEffect(() => {
    if (ShowModal) {
      ShowRef.current = true;
    }
  }, [ShowModal]);
  const mutationFn = async ({ url, data, loadingkey }) => {
    handleLoadingStatus(loadingkey, true);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${SessionData.token}`,
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
          phone_verified: true,
        }));
        setShowMobileOtp(false);
      } else if (err.detail) {
        showToast({
          type: "error",
          heading: "Error",
          message: err.detail,
        });
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
          email_verified: true,
        }));
        setShowMobileOtp(false);
      } else if (err.detail) {
        showToast({
          type: "error",
          heading: "Error",
          message: err.detail,
        });
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
        showToast({
          type: "success",
          heading: "Success",
          message: "Mobile Verified Successfully",
        });
        setVerifiedStatus((prev) => ({
          ...prev,
          phone_verified: true,
        }));
        store.dispatch(
          updateVerificationData({ ...VerificationData, phone_verified: true })
        );
        const SessionData = JSON.parse(sessionStorage.getItem("user"));
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...SessionData, phone_verified: true })
        );

        setShowMobileOtp(false);
      }
    },
    onError: (err) => {
      console.error("Mobile OTP verify failed:", err);
      if (err.detail) {
        showToast({
          type: "error",
          heading: "Error",
          message: err.detail,
        });
      }
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
        showToast({
          type: "success",
          heading: "Success",
          message: "Email ID Verified Successfully",
        });
        setVerifiedStatus((prev) => ({
          ...prev,
          email_verified: true,
        }));
        setShowEmailOtp(false);
        store.dispatch(
          updateVerificationData({ ...VerificationData, email_verified: true })
        );
        const SessionData = JSON.parse(sessionStorage.getItem("user"));
        sessionStorage.setItem(
          "user",
          JSON.stringify({ ...SessionData, email_verified: true })
        );
      }
    },
    onError: (err) => {
      console.error("Mail OTP verify failed:", err);
      if (err.detail) {
        showToast({
          type: "error",
          heading: "Error",
          message: err.detail,
        });
      }
    },
  });

  // console.log(isLoadingMailOTP);

  const handleChange = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   useEffect(() => {
  //     if (!showRegister) {
  //       setRegisterData({
  //         username: "",
  //         password: "",
  //         mobile_no: "",
  //         mail_address: "",
  //         mobile_otp: "",
  //         mail_otp: "",
  //       });
  //       setShowMobileOtp(false);
  //       setShowEmailOtp(false);
  //     }
  //   }, [showRegister]);

  const ValidateField = (key) => {
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
      isOpen={ShowModal}
      //   onClose={() => }
      //   onHide={true}
      bgBlur={true}
      CloseButton={false}
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

        {/* {ShowVerify.button && (
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
        )} */}
        {/* 
        {ShowVerify.button && (
          <div className="w-full">
            <CustomButton
              className="w-full py-3"
              loading={ShowVerify.buttonLoading}
            >
              Verify
            </CustomButton>
          </div>
        )} */}

        {/* Mobile Number */}

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500 flex flex-row">
            Mobile Number{" "}
            {VerifiedStatus.phone_verified && (
              <span className="flex flex-row items-center">
                - Verified{" "}
                <IoCheckbox size={20} className="ml-2 !text-green-500" />
              </span>
            )}
          </label>
          {!VerifiedStatus.phone_verified && (
            <div className="flex gap-2">
              <input
                name="mobile_no"
                type="tel"
                value={registerData.mobile_no}
                disabled={VerifiedStatus.mobile_no || showMobileOtp}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 mt-1 border-gray-400  ${
                  VerifiedStatus.phone_verified || showMobileOtp
                    ? "bg-gray-300 cursor-not-allowed"
                    : ""
                }`}
                placeholder="Enter your 10 digit mobile number"
              />

              <CustomButton
                loading={LoadingStatus.sendMobile}
                onClick={(e) => {
                  e.stopPropagation();
                  ValidateField("mobile_no");
                }}
                disabled={showMobileOtp}
                className="min-w-[4.5em] "
              >
                Verify
              </CustomButton>
            </div>
          )}
          {!VerifiedStatus.phone_verified && showMobileOtp && (
            <div className="mt-2">
              <OtpInput
                value={registerData.mobile_otp}
                isLoading={LoadingStatus.verifyMobile}
                onChange={(otp) =>
                  setRegisterData((prev) => ({ ...prev, mobile_otp: otp }))
                }
                handleSubmit={() => {
                  VerifyMobileOTP();
                }}
              />
            </div>
          )}
        </div>

        {/* Email Address */}

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-500 flex flex-row">
            Mail ID
            {VerifiedStatus.email_verified && (
              <span className="flex flex-row items-center">
                - Verified{" "}
                <IoCheckbox size={20} className="ml-2 !text-green-500" />
              </span>
            )}
          </label>
          {!VerifiedStatus.email_verified && (
            <>
              <div className="flex gap-2">
                <input
                  name="mail_address"
                  type="email"
                  value={registerData.mail_address}
                  onChange={handleChange}
                  disabled={showEmailOtp}
                  className={`w-full border rounded px-3 py-2 mt-1 border-gray-400 ${
                    VerifiedStatus.email_verified || showEmailOtp
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter mail address"
                />

                <CustomButton
                  loading={LoadingStatus.sendMail}
                  onClick={(e) => {
                    e.stopPropagation();
                    ValidateField("mail_address");
                  }}
                  disabled={showEmailOtp}
                  className="min-w-[4.5em]  text-white"
                >
                  Verify
                </CustomButton>
              </div>
              {showEmailOtp && (
                <div className="mt-2">
                  <div className="font-medium text-gray-500">
                    Enter Mail OTP:
                  </div>
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
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VerificationModal;

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
        }  text-white px-3 rounded-lg font-medium transition-all duration-300 min-w-[5.5em]`}
      >
        Submit
      </CustomButton>
    </div>
  );
}
