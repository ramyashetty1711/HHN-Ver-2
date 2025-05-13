import React, { useEffect, useState } from "react";
import { getAuthToken } from "./query/UseFetch";
import { APPURL } from "./URL";

const token = getAuthToken();

const GetLoggedUserLocation = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const sessionData = sessionStorage.getItem("poasdfu123");
  useEffect(() => {
    if (sessionData) {
      console.log("Location already logged previously.");
      return;
    }

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }

    const logLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (!sessionData) {
          fetch(APPURL.userLocation, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          }).then((res) => {
            sessionStorage.setItem("poasdfu123", "true");
          });
        }
        (error) => {
          console.error("Error getting location:", error.message);
        };
      });
    };

    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionStatus(result.state);

        if (result.state === "granted" || result.state === "prompt") {
          logLocation();
        } else {
          console.warn("Location permission denied");
        }
      });
    }
  }, []);

  return null;
};

export default GetLoggedUserLocation;
