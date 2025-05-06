import React from "react";
import Navbar from "./components/Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Common/Footer";

export default function Wrapper() {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Scrollable content area */}
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>

      {/* Fixed Footer */}
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  );
}
