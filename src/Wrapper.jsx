import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Common/Footer";
import { store } from "./redux/Store";
import {
  updateCurrentUserRole,
  updateLoggedInStatus,
  updateShowVerification,
  updateVerificationData,
} from "./redux/DataSlice";
import { APPURL } from "./URL";
import { getData } from "./query/UseFetchData";
import { useLocalUserData } from "./query/UseLocalData";

export default function Wrapper() {
  useEffect(() => {
    const getUserData = JSON.parse(sessionStorage.getItem("user"));

    if (getUserData?.user) {
      store.dispatch(updateLoggedInStatus(true));
      store.dispatch(updateCurrentUserRole(getUserData.role));

      store.dispatch(
        updateVerificationData({
          email_verified: getUserData.email_verified,
          phone_verified: getUserData.phone_verified,
        })
      );

      if (!getUserData.email_verified || !getUserData.phone_verified) {
        store.dispatch(updateShowVerification(true));
      } else {
        store.dispatch(updateShowVerification(false));
      }
    } else {
      store.dispatch(updateLoggedInStatus(false));
      store.dispatch(updateCurrentUserRole(0));
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
