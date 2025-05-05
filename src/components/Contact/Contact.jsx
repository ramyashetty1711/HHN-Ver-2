import React, { useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [from, setFrom] = useState("");
  const [remarks, setRemarks] = useState("");
  const [btnName, setBtnName] = useState("Send Message");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const newErrors = {};

    if (name && !/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name should not contain numbers";
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (phoneNumber && !/^[1-9][0-9]{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    if (from && from.trim().length < 2) {
      newErrors.from = "Company/Organization is required";
    }

    setErrors(newErrors);
  }, [name, email, phoneNumber, from, remarks]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      setBtnName("Sending...");
      const formData = {
        name,
        email,
        mobile: phoneNumber,
        query: from,
        remarks,
      };

      try {
        const res = await axios.post(
          "https://enquiry.elenageosys.com/enquiry/",
          formData
        );
        console.log(res.data);
        nav("/contact-thanku");
      } catch (error) {
        console.error("Error posting enquiry:", error);
        alert("Failed to send. Please try again later.");
        setBtnName("Send Message");
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      <div className="grid grid-cols-12 ">
      
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
        <div className="space-y-6 mt-5 text-lg">
          <ul className="flex flex-col justify-center space-y-4">
            <li className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <FaEnvelope size={20} color="#004080" />
                <a href="mailto:info@elenageo.com" className="text-lg">
                  info@elenageo.com
                </a>
              </div>
              <div className="pl-8">
                <a href="mailto:sales@elenageo.com" className="text-lg">
                  sales@elenageo.com
                </a>
              </div>
            </li>
            <li className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <FaPhoneAlt size={20} color="#004080" />
                <a href="tel:+919384864411" className="text-lg">
                  +91 9384864411
                </a>
              </div>
              <div className="pl-8">
                <a href="tel:+919384864422" className="text-lg">
                  +91 9384864422
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

        <div className="md:col-span-8 col-span-12 px-10 py-6">
          <h2 className="text-2xl mb-2 text-[var(--heading)]">
            Have Questions? Message Us!
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-bold mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full border border-[var(--secondary)] p-4 rounded focus:border-[var(--primary)] focus:outline-none"
                  placeholder="Enter your company or organization"
                />
                {errors.from && (
                  <p className="text-red-500 text-sm mt-1">{errors.from}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Your Message
              </label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
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
