import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocalUserData } from '../../query/UseLocalData';
import { SpinnerCircularFixed } from 'spinners-react';
import { APPURL } from '../../URL';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import React Icons
import { FiMapPin } from 'react-icons/fi';  // Import Map Pin icon

// Fix Leaflet icon paths

import markerIcon from '../../assets/location_icon.png';


const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41], // You can adjust the size
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});


// Simulated data fetcher
async function getData(url, token) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

function VisitorsLocation() {
  const SessionData = useLocalUserData();

  const {
    data: visitorLocation,
    isLoading: locationLoading,
  } = useQuery({
    queryKey: ['devices'],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const defaultCenter = [20.5937, 78.9629]; 

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        {/* Visitor Table */}
        <div className="col-span-4 overflow-auto max-h-[500px]">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">S. No</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {locationLoading ? (
                <tr className="text-center">
                  <td colSpan={2} className="py-6">
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
              ) : visitorLocation && visitorLocation.length > 0 ? (
                visitorLocation.map((location, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center">
                      <FiMapPin className="mr-2" />{' '}
                      {location.coord
                        ? `${location.coord.lat}, ${location.coord.lng}`
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-gray-500">
                    No visitor location records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Map Section */}
<div className="col-span-8 h-[65vh]">
  <MapContainer center={defaultCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />

    {/* Show default marker if no data */}
    {(!visitorLocation || visitorLocation.length === 0) && (
      <Marker position={defaultCenter} icon={customIcon}>
        <Popup>
          <div>
            <h3>Default Location</h3>
            <p>Lat: 20.5937, Lng: 78.9629</p>
          </div>
        </Popup>
      </Marker>
    )}

    {/* Show visitor markers */}
    {/* {visitorLocation &&
      visitorLocation.map((loc, index) => {
        if (!loc.coord) return null;

        const { lat, lng } = loc.coord;

        return (
          <Marker key={index} position={[lat, lng]} icon={customIcon}>
            <Popup>
              <div>
                <h3>Visitor {index + 1}</h3>
                <p>Lat: {lat}, Lng: {lng}</p>
              </div>
            </Popup>
          </Marker>
        );
      })} */}
  </MapContainer>
</div>

      </div>
    </div>
  );
}

export default VisitorsLocation;
