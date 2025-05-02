import ImageSlider from "./ImageSlider";

export default function About() {
  return (
    <>
      <div className="flex flex-col  font-semibold text-lg bg-white  rounded-lg ">
        <div className=" w-full ">
          <ImageSlider />
        </div>
        <div className="flex justify-center">
          <div className="px-8 py-6  rounded-xl  max-w-4xl">
            <p className="text-2xl font-bold text-center text-gray-800 tracking-wide leading-relaxed">
              <span className="text-[var(--primary)]">Grid Converter</span> is a
              special tool to bring Arty Net into one grid
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
