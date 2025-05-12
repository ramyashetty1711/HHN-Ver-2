import React, { useEffect, useState } from "react";
import { APPURL } from "./URL";

const LocationLogger = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    const hasLoggedLocation = localStorage.getItem("zqw091203");

    if (hasLoggedLocation) {
      console.log("Location already logged previously.");
      return;
    }

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }

    const logLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //   localStorage.setItem("zqw091203", "true");

          fetch(APPURL.location, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          }).then((res) => {
            if (res.ok) {
              localStorage.setItem("zqw091203", "true");
            }
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
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
    // else {
    //   logLocation(); // fallback for browsers without `navigator.permissions`
    // }
  }, []);

  return null;
};

export default LocationLogger;
