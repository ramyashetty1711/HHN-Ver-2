import React from 'react'
import bis from '../../assets/certlogo/bis.png'
import CE from '../../assets/certlogo/CE.png'
import IP from '../../assets/certlogo/IP_67.png'
import ROHS from '../../assets/certlogo/ROHS.png'

function Cert() {
  return (
    <div className='flex flex-col bg-white items-center py-3 px-6 h-full overflow-y-auto custom-scrollbar'>
      {/* First row: justify-between */}
      <div className="flex flex-col gap-4 w-[90%] ">
      <div className="flex justify-between">
        <img src={bis} alt="BIS" className="w-40 h-auto" />
        <img src={CE} alt="CE" className="w-30 h-auto" />
      </div>

      {/* Second row: justify-center */}
      <div className="flex justify-center gap-8">
        <img src={ROHS} alt="ROHS" className="w-40 h-auto" />
        <img src={IP} alt="IP67" className="w-40 h-auto" />
      </div>
      </div>
    </div>
  )
}

export default Cert
