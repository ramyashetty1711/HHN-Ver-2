import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Common/Footer";
import { store } from "./redux/Store";
import { updateLoggedInStatus } from "./redux/DataSlice";

export default function Wrapper() {
  useEffect(() => {
    const getUserData = sessionStorage.getItem("user");
    if (getUserData) {
      store.dispatch(updateLoggedInStatus(true));
    }
  }, []);
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
