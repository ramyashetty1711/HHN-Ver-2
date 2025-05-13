import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useLocalUserData } from '../../query/UseLocalData';
import { SpinnerCircularFixed } from "spinners-react";
import { APPURL } from '../../URL';
import { FaLocationArrow } from "react-icons/fa";



function LoggedInLocation() {
      const SessionData = useLocalUserData();

      const { data: loggedInUsers, refetch: refetchTicket,isLoading: locationLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: () => getData(APPURL.devices, SessionData.token),
    enabled: !!SessionData.token,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  console.log(loggedInUsers);
  
  return (
    <div>
       <div className='grid grid-cols-12 '>
         <div className='col-span-4'>
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                      <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-2">S. No</th>
                          <th className="px-4 py-2">Location</th>
                          <th className="px-4 py-2 flex justify-center">View</th>
                          {/* <th className="px-4 py-2">Actions</th> */}
                        </tr>
                      </thead>
            
                       <tbody className="divide-y divide-gray-100 text-sm">
                        {locationLoading ? (
                          <tr className="text-center">
                            <td colSpan={6} className="py-6">
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
                        loggedInUsers.map((loaction, index) => (
                            <tr key={location.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2">{index + 1}</td>
                              <td className="px-4 py-2">{loaction.coord}</td>
                              <td className="px-4 py-2 flex justify-center">
                                < FaLocationArrow   className="border border-[var(--primary)] text-[var(--primary)] rounded-md p-1 cursor-pointer hover:bg-[var(--secondary)]" size={25}/>
                               
                              </td>
                             
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="text-center py-4 text-gray-500">
                           No login location records found
                            </td>
                          </tr>
                        )}
                      </tbody>
                     
                    </table>
        </div>
        <div className='col-span-8'>

        </div>
       </div>
    </div>
  )
}

export default LoggedInLocation