import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SpinnerCircularFixed } from "spinners-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOn } from "react-icons/md";
import { renderToStaticMarkup } from "react-dom/server";
import { useLocalUserData } from "../../query/UseLocalData";

// Custom icons and CSS
import markerIcon from "../../assets/location_icon.png";
import "../../assets/leaflet/MarkerCluster.css";
import "../../assets/leaflet/MarkerCluster.Default.css";
import { getData } from "../../query/UseFetchData";
import { APPURL } from "../../URL";

const iconMarkup = renderToStaticMarkup(<MdLocationOn size={32} color="red" />);
const customDivIcon = L.divIcon({
  html: iconMarkup,
  className: "", // Prevent default leaflet styles
  iconSize: [32, 32], // match your icon size
  iconAnchor: [16, 32], // center bottom point
});

// Dummy Data (used instead of API call)
const dummyVisitorLocation = [
  { coord: { lat: 12.9716, lng: 77.5946 } }, // Bangalore
  { coord: { lat: 13.0827, lng: 80.2707 } }, // Chennai
  { coord: { lat: 17.385, lng: 78.4867 } }, // Hyderabad
  { coord: { lat: 28.6139, lng: 77.209 } }, // Delhi
  { coord: { lat: 19.076, lng: 72.8777 } }, // Mumbai
  { coord: { lat: 26.9124, lng: 75.7873 } }, // Jaipur
];

const defaultCenter = [20.5937, 78.9629];

function VisitorsLocation() {
  const SessionData = useLocalUserData();
  console.log(SessionData);

  const visitorLocation = dummyVisitorLocation;

  const { data: visitors, isLoading: VisitorsLoading } = useQuery({
    queryKey: ["visitors"],
    queryFn: () => getData(APPURL.location, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
  console.log(visitors);

  return (
    <div  className="bg-white h-full">
      <div className="grid grid-cols-12 gap-4">
        {/* Table Section */}
        {/* <div className="xl:col-span-4 col-span-12  overflow-auto max-h-[500px]">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">S. No</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Visited at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {VisitorsLoading ? (
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
              ) : visitors && visitors.length > 0 ? (
                visitors.map((location, index) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {location
                        ? `${location.latitude}, ${location.longitude}`
                        : "N/A"}
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
        </div> */}

        {/* Map Section */}
        <div className="xl:col-span-12 col-span-12 relative z-0 rounded-lg overflow-hidden ">
          <MapContainer
          
            center={defaultCenter}
            zoom={4}
           style={{ height: '65vh', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            <MarkerClusterGroup>
              {visitors?.map((loc, index) => {
                if (!loc) return null;
                const lat = loc.latitude;
                const lng = loc.longitude;

                return (
                  <Marker
                    key={index}
                    position={[lat, lng]}
                    icon={customDivIcon}
                  >
                    <Popup>
                      <strong>Visitor {index + 1}</strong>
                      <br />
                      Lat: {lat}, Lng: {lng}
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default VisitorsLocation;
