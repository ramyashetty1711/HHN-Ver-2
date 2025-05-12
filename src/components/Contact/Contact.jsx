import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/ToastContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    from: "",
    remarks: "",
  });

  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [btnName, setBtnName] = useState("Send Message");
  const nav = useNavigate();

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (!/^[A-Za-z\s]+$/.test(value))
          return "Name should not contain numbers";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        break;
      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";
        if (!/^[1-9][0-9]{9}$/.test(value))
          return "Invalid phone number format";
        break;
      case "from":
        if (!value.trim()) return "Company/Organization is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
        break;
      case "remarks":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 30)
          return "Message must be at least 30 characters long";
        break;

      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phoneNumber: true,
      from: true,
      remarks: true,
    });

    if (Object.keys(newErrors).length > 0) return;

    setBtnName("Sending...");
    try {
      await axios.post("https://enquiry.elenageo.com:7443/enquiry/", {
        name: formData.name,
        email: formData.email,
        mobile: formData.phoneNumber,
        query: formData.from,
        remarks: formData.remarks,
        received_from: 2,
      });

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        from: "",
        remarks: "",
      });
      setTouched({});
      setErrors({});
      showToast({
        type: "success",
        heading: "Message Status",
        message: "Message sent successfull",
      });
      setBtnName("Send Message");
    } catch (error) {
      console.error("Error posting enquiry:", error);
      showToast({
        type: "error",
        heading: "Message Status",
        message:
          error.response?.data?.error ||
          "An error occurred sending the message.",
      });
      setBtnName("Send Message");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6 overflow-y-auto">
      <h2 className="text-xl font-bold text-[var(--heading)] mt-1  flex justify-center mb-4">
        If you are interested in purchasing or have any enquiries, reach out to
        us anytime.
      </h2>

      <div className="grid grid-cols-12">
        {/* Contact Info Section */}
        <div className="md:col-span-5 col-span-12 md:px-5">
          <h2 className="text-xl font-semibold md:text-md md:mb-1 mb-2  text-[var(--heading)] md:mt-0 mt-2 underline underline-offset-4">
            Contact :
          </h2>
          <div className="mt-5 space-y-6 text-md grid  grid-cols-12">
            {/* Contact 1 */}
            <div className="grid grid-cols-12 md:grid-cols-6 items-start col-span-6 wrap-anywhere">
              <div className="md:col-span-5 col-span-12 font-medium">
                Mr. Purushotham V
              </div>
              <div className="md:col-span-7 col-span-12 flex flex-col space-y-1">
                <a
                  href="mailto:info@elenageo.com"
                  className="hover:text-[var(--primary)] inline-flex items-center text-sm md:text-md rounded w-fit"
                >
                  <FaEnvelope className="mr-2" /> info@elenageo.com
                </a>
                <a
                  href="tel:+919384864411"
                  className="hover:text-[var(--primary)] inline-flex items-center text-sm md:text-md rounded w-fit"
                >
                  <FaPhoneAlt className="mr-2" /> +91 9384864411
                </a>
              </div>
            </div>

            {/* Contact 2 */}
            <div className="grid grid-cols-12 md:grid-cols-6 items-start col-span-6 wrap-anywhere">
              <div className="md:col-span-5 col-span-12 font-medium">
                Mr. Naveen Kumar P
              </div>
              <div className="md:col-span-7 col-span-12 flex flex-col space-y-1">
                <a
                  href="mailto:sales@elenageo.com"
                  className="hover:text-[var(--primary)] inline-flex items-center text-sm md:text-md  rounded w-fit"
                >
                  <FaEnvelope className="mr-2" /> sales@elenageo.com
                </a>
                <a
                  href="tel:+919384864422"
                  className="hover:text-[var(--primary)] inline-flex items-center text-sm md:text-md  rounded w-fit"
                >
                  <FaPhoneAlt className="mr-2" /> +91 9384864422
                </a>
              </div>
            </div>

            {/* Contact 3 */}
            <div className="grid grid-cols-12 md:grid-cols-6 items-start col-span-6">
              <div className="md:col-span-5 col-span-12 font-medium">
                Mrs. Shabeen Taj P
              </div>
              <div className="md:col-span-7 col-span-12 flex flex-col space-y-1">
                <a
                  href="tel:+918023554555"
                  className="hover:text-[var(--primary)] inline-flex items-center text-sm md:text-md  rounded w-fit"
                >
                  <FaPhoneAlt className="mr-2" /> +91 8023554555
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:col-span-7 col-span-12 md:px-5">
          <h2 className="text-md md:mb-3 mb-6  text-[var(--heading)] md:mt-0 mt-5 font-semibold text-xl underline underline-offset-4">
            Send Direct Message
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Full Name */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm ">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm ">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Phone Number */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your 10 digit Mobile number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Organization */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-1">
                  Company / Organization <span className="text-red-500">*</span>
                </label>
                <input
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your company or organization"
                />
                {errors.from && touched.from && (
                  <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                )}
              </div>
            </div>

            {/* Remarks */}
            {/* Remarks */}
            <div className="grid grid-cols-12 ">
              <div className="md:col-span-8 col-span-12">
                <label className="block text-sm font-bold mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-2 rounded focus:border-[var(--primary)] focus:outline-none"
                  rows="3"
                  placeholder="Write your message here"
                />
                {errors.remarks && touched.remarks && (
                  <p className="text-red-500 text-sm mt-1">{errors.remarks}</p>
                )}
              </div>
              <div className="md:col-span-4 col-span-12 flex items-center justify-center mt-5 md:mt-0">
                <button
                  type="submit"
                  disabled={btnName === "Sending..."}
                  className={`border border-[var(--primary)] rounded-md px-4 py-2 flex items-center gap-2
                            ${
                              btnName === "Sending..."
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                            }`}
                >
                  <span>{btnName}</span>
                  <IoSend />
                </button>
              </div>
            </div>

            {/* Submit Button */}
          </form>
        </div>
      </div>
    </div>
  );
}
