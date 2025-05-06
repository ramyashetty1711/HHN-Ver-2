import ImageSlider from "./ImageSlider";

export default function About() {
  return (
    <>
      <div className="flex flex-col h-full bg-white font-semibold text-lg py-3 px-6">
        {/* Image Slider */}
        <div className="mb-4">
          <ImageSlider />
        </div>

  {/* Description Text */}
  <div className="text-center px-2">
    <p className="text-2xl font-bold tracking-wide leading-relaxed text-[var(--primary)]">
     Grid Converter is a special tool to bring
   Artillery Network into one Grid.
    </p>
  </div>


     

        {/* <div className=" px-4 ">
          <h4 className=" text-stone-800 mb-6 text-lg">
            About The Grid Converter
          </h4>

          <div className="px-4 font-medium pb-8">
            This Grid Converter is state-of-the-art positioning equipment made
            using Elena's multi-GNSS processor, which utilizes NavIC, GPS, and
            GLONASS to provide one-meter accuracy without any external support.
            It follows Elena's integrated approach. This equipment serves as a
            bridge between three reference systems used by the Indian Army, such
            as the ESM India grid system, the new DSM grid system, and the
            latitude-longitude (Lat-Long) system. It accurately provides all
            these reference numbers for the same point in various formats and
            can convert the reference from one system to another accurately.
          </div>
          <h4 className=" text-stone-800 mb-6 text-lg">Background</h4>

          <div className="px-4 font-medium pb-8">
            This equipment serves as a bridge between three reference systems
            used by the Indian Army, such as the ESM India grid system, the new
            DSM grid system, and the latitude-longitude (Lat-Long) system. It
            accurately provides all these reference numbers for the same point
            in various formats and can convert the reference from one system to
            another accurately.
          </div>
        </div> */}
      </div>
    </>
  );
}
