import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Script() {
  const LoggedInStatus = useSelector((state) => state.data.LoggedInStatus);
  const location = useLocation();
  const Navigate = useNavigate();
  useEffect(() => {
    if (LoggedInStatus) {
      if (
        !location.pathname.includes("downloads") &&
        !location.pathname.includes("tickets") &&
        !location.pathname.includes("tutorials") &&
        !location.pathname.includes("feedback")
      ) {
        Navigate("/downloads");
      }
    }
  }, [LoggedInStatus]);
  return null;
}
