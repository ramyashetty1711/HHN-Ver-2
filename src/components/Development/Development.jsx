import React from "react";
import GC_Device from "../../assets/GC/GC_Device.png";
import black from "../../assets/LLV3_Photoroom.png";
import GC_from from "../../assets/from.png";
import { FaArrowCircleDown } from "react-icons/fa";


export default function Development() {
  return (
    <div className="flex flex-col h-full bg-white py-3 px-6">
      
      <div className="grid grid-cols-12 ">
      <div className="md:col-span-3 col-span-12 flex justify-center items-center flex-col h-full gap-8">
  <img
    src={black}
    alt="Device"
    className="w-[200px] object-cover mb-4" // Added margin-bottom for spacing
  />
  <img
    src={GC_Device}
    alt="Device"
    className="w-[100px] object-cover"
  />
</div>


        <div className=" md:col-span-9 col-span-12"> 
       
        <h2 className="text-xl font-bold text-[var(--heading)] mt-4 mb-2  flex justify-center">
          Proof of Concept (POC) Demonstrated to COAS
        </h2>
        <p className="text-justify">
          The initial Proof of Concept (POC) device, demonstrated to the Chief
          of Army Staff (COAS), was a basic prototype designed specifically for
          a single zone (Delhi). This simplified version served as a feasibility
          demonstration, showcasing the potential for grid conversion
          functionality. 
        </p>
   
        <h2 className="text-xl font-bold text-[var(--heading)] my-2 flex justify-center">
           Prototype
        </h2>
        <p className="text-justify ">
          To enable the device to perform grid conversions for all zones across
          India, substantial improvements were required. The memory and
          processing capabilities had to be significantly upgraded to handle the
          increased data and computational demands. As a result, a
          high-performance processor was integrated, which greatly enhanced the
          device's capacity but also increased its overall cost. The grid
          conversion formulas, originally developed for a Windows-based system,
          needed to be reprogrammed entirely to function with the upgraded
          processor. This process involved rewriting and optimizing complex
          algorithms to suit the new architecture. Given the urgency of the
          project, the programming costs were significantly higher.
          <br/>
            A technically feasible smaller device which is handy was developed.
            This device included essential features of grid conversion. Further,
            this device was demonstrated to HAL where it garnered interest for
            potential procurement and other operational uses.
        </p>
        <h2 className="text-xl font-bold text-[var(--heading)] my-2 flex justify-center">
            Final Design
          </h2>
          <p className="text-justify ">
            A small instrument was created As a result, the product has been developed into a
            full-fledged military device by Elena and is being sold through GeM.
            The development took about 12 months, mainly due to the need to
            develop the correct algorithm to ensure accurate conversion across
            the entire country and regions beyond our borders, up to 6 map
            sheets. Field trials of the device have been carried out by four
            different formations/units and the TTW, School of Arty. All
            conversion algorithms and parameters used in the device were jointly
            derived by both ADG Mil Survey and EGT and are not shared with
            anyone else; hence, the product is proprietary to the development
            partner, EGT.
          </p>
      </div>
      </div>

      

      {/* Grid Section */}
     
    </div>
  );
}
