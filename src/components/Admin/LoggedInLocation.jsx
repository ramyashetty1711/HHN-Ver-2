import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocalUserData } from "../../query/UseLocalData";
import { SpinnerCircularFixed } from "spinners-react";
import { APPURL } from "../../URL";
import { FaLocationArrow } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getData } from "../../query/UseFetchData";
import { renderToStaticMarkup } from "react-dom/server";
import { MdLocationOn } from "react-icons/md";

// 🔍 Component to zoom to selected position
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 12);
    }
  }, [position, map]);

  return null;
}

function LoggedInLocation() {
  const iconMarkup = renderToStaticMarkup(
    <MdLocationOn size={32} color="red" />
  );
  const customDivIcon = L.divIcon({
    html: iconMarkup,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const SessionData = useLocalUserData();

  const { data: loggedInUsers, isLoading: locationLoading } = useQuery({
    queryKey: ["loggedInUsers"],
    queryFn: () => getData(APPURL.userLocation, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const [selectedLatitude, setSelectedLatitude] = useState(null);
  const [selectedLongitude, setSelectedLongitude] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  const handleViewLocation = (location) => {
    setSelectedLatitude(location.latitude);
    setSelectedLongitude(location.longitude);
    setSelectedUser(location.reg_username);
  };

  return (
    <div className="bg-white h-full md:max-h-[70vh] overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-12 gap-4">
        {/* Table Section */}
        <div className="xl:col-span-4 col-span-12  max-h-[62vh] overflow-y-auto custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">S. No</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Visited at</th>
                <th className="px-4 py-2 ">View</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-sm">
              {locationLoading ? (
                <tr className="text-center">
                  <td colSpan={4} className="py-6">
                    <div className="flex justify-center items-center">
                      <SpinnerCircularFixed
                        speed={200}
                        thickness={200}
                        size={20}
                        color="var(--primary)"
                        secondaryColor="#98acc0"
                      />
                    </div>
                  </td>
                </tr>
              ) : loggedInUsers && loggedInUsers.length > 0 ? (
                [...loggedInUsers]
      .sort((a, b) => new Date(b.accessed_at) - new Date(a.accessed_at)).map((location, index) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {location.reg_username || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {location.accessed_at
                        ? new Date(location.accessed_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 flex justify-center">
                      <FaLocationArrow
                        className="border border-[var(--primary)] text-[var(--primary)] rounded-md p-1 cursor-pointer hover:bg-[var(--secondary)]"
                        size={25}
                        onClick={() => handleViewLocation(location)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No login location records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Map Section */}
        <div className="xl:col-span-8 col-span-12 rounded-lg overflow-hidden">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={4}
            style={{ height: "62vh", width: "100%" }}
            attributionControl={false} 
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Markers for all users */}
            {loggedInUsers &&
              loggedInUsers.map((location, index) => (
                <Marker
                  key={location.id}
                  position={[location.latitude, location.longitude]}
                  icon={customDivIcon}
                >
                  <Popup>
                    <div className="  bg-white rounded-lg  text-sm text-gray-800 font-sans">
                      <h3 className="text-base font-semibold text-[var(--primary)] mb-2">
                        {location.reg_username || "Unknown User"}
                      </h3>
                      <p>
                        <span className="font-medium">Latitude:</span>{" "}
                        {location.latitude}
                        <br />
                        <span className="font-medium">Longitude:</span>{" "}
                        {location.longitude}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}

            {/* Selected location marker with fly-to */}
            {selectedLatitude && selectedLongitude && (
              <>
                <FlyToLocation
                  position={[selectedLatitude, selectedLongitude]}
                />
                <Marker
                  position={[selectedLatitude, selectedLongitude]}
                  icon={customDivIcon}
                >
                  <Popup>
                    <div className="  bg-white rounded-lg text-sm text-gray-800 font-sans">
                      <h3 className="text-base font-semibold text-[var(--primary)] mb-2">
                        {selectedUser}
                      </h3>
                      <p>
                        <span className="font-medium">Latitude:</span>{" "}
                        {selectedLatitude}
                        <br />
                        <span className="font-medium">Longitude:</span>{" "}
                        {selectedLongitude}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default LoggedInLocation;
