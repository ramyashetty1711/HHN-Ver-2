import { Link, Outlet, useLocation } from "react-router-dom";
import Elena from "../../assets/Elena.png";
const Navbar = () => {
  const Location = useLocation();
  const MenuElements = [
    { link: "/", display: "Background" },
    {
      link: "/development",
      display: "Development",
    },
    {
      link: "/trials",
      display: "Trials",
    },
    {
      link: "/features",
      display: "Features",
    },
    {
      link: "/NavIC",
      display: "NavIC",
    },
  ];
  return (
    <div className="min-h-[100vh] flex flex-row justify-center items-center w-[100vw] max-w-[100vw] ">
      <div className="min-h-[100vh] bg-gradient-to-br from-sky-200 to-sky-600  w-full  rounded-xl ">
        <nav className="bg-white h-[70px] flex flex-row justify-between py-2 px-4 items-center   ">
          <div className="  px-2 py-1 rounded-md flex flex-row items-center">
            <img src={Elena} className="h-[45px]" />
            <h5 className="text-gray-700 font-semibold text-xl ml-4">
              Elena Grid Converter
            </h5>
          </div>
          <ul className="p-0 mb-0 flex flex-row ">
            {MenuElements.map((val, index) => (
              <Link to={val.link}>
                <li
                  onClick={(e) => {}}
                  className={`font-semibold h-full p-2 px-3  cursor-pointer duration-300 transition-all min-w-[5vw] text-center hover:bg-gray-100 ${
                    Location.pathname === val.link
                      ? " text-gray-800 "
                      : " border-gray-400  text-gray-500"
                  } rounded-lg mr-1.5`}
                >
                  {val.display}
                </li>
              </Link>
            ))}
          </ul>
          <div
            className="mr-1 font-semibold bg-blue-500 text-white p-2 rounded-lg px-4 py-3 cursor-pointer hover:bg-purple-900 transition-all duration-300 "
            onClick={() => {
              Navigate("/login");
            }}
          >
            Login
          </div>
        </nav>
        <div className=" pt-2    font-semibold text-lg text-gray-600 bg-gray-100/80  px-3 rounded-lg h-full min-h-[95vh] overflow-y-auto custom-scrollbar pr-2">
          {/* <ul className="p-0 mb-0 flex flex-row ">
            {MenuElements.map((val, index) => (
              <Link to={val.link}>
                <li
                  onClick={(e) => {}}
                  className={`font-semibold h-full p-2 px-3 border-[2px]  cursor-pointer duration-300 transition-all min-w-[5vw] text-sm text-center ${
                    Location.pathname === val.link
                      ? "bg-gradient-to-t from-gray-500 to-gray-400 text-white border-gray-300"
                      : " border-gray-400 hover:bg-gray-200 text-gray-500"
                  } rounded-lg mr-1.5`}
                >
                  {val.display}
                </li>
              </Link>
            ))}
          </ul>
          <div className=" col-span-7"> */}
          <Outlet />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
