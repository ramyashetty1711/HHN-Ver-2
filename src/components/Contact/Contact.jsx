import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    from: "",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [btnName, setBtnName] = useState("Send Message");
  const nav = useNavigate();

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (!/^[A-Za-z\s]+$/.test(value)) return "Name should not contain numbers";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Invalid email format";
        break;
      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";
        if (!/^[1-9][0-9]{9}$/.test(value)) return "Invalid phone number format";
        break;
      case "from":
        if (!value.trim()) return "Company/Organization is required";
        if (value.trim().length < 2) return "Must be at least 2 characters";
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
      });
    } catch (error) {
      console.error("Error posting enquiry:", error);
      alert("Failed to send. Please try again later.");
      setBtnName("Send Message");
    }
  };

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <div className="grid grid-cols-12">
        {/* Contact Info */}
        <div className="md:col-span-4 col-span-12 flex justify-center items-start px-10 py-6">
          <div className="w-full max-w-md">
            <h2 className="text-2xl text-[var(--heading)] mb-4">
              Get in Touch with Us
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              We’d love to hear from you.
              <br />
              Reach out anytime using the details below.
            </p>
            <ul className="space-y-6 mt-5 text-lg">
              <li className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope size={20} color="#004080" />
                  <a href="mailto:info@elenageo.com">info@elenageo.com</a>
                </div>
                <div className="pl-8">
                  <a href="mailto:sales@elenageo.com">sales@elenageo.com</a>
                </div>
              </li>
              <li className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt size={20} color="#004080" />
                  <a href="tel:+919384864411">+91 9384864411</a>
                </div>
                <div className="pl-8">
                  <a href="tel:+919384864422">+91 9384864422</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-8 col-span-12 px-10 py-6">
          <h2 className="text-2xl mb-2 text-[var(--heading)]">
            Have Questions? Message Us!
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">Phone Number</label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">Company / Organization</label>
                <input
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your company or organization"
                />
                {errors.from && touched.from && (
                  <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Your Message</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                rows="4"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="border border-[var(--primary)] rounded-md text-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] hover:text-white flex items-center gap-2"
            >
              <span>{btnName}</span>
              <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
