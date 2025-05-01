import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Elena from "../../assets/Elena.png";
import { FaBars } from "react-icons/fa"; // for hamburger icon

const Navbar = () => {
  const Location = useLocation();
  const Navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuElements = [
    { link: "/", display: "Home" },
    { link: "/necessity", display: "Necessity" },
    { link: "/background", display: "Background" },
    { link: "/development", display: "Development" },
    { link: "/trials", display: "Trials" },
    { link: "/features", display: "Features" },
    { link: "/procurment", display: "Procurement" },
    { link: "/NavIC", display: "NavIC" },
    { link: "/elena", display: "Elena" },
    { link: "/contact", display: "Contact Us" },
    { link: "/help", display: "Help" },
  ];

  return (
    <div className=" flex flex-row justify-center items-center w-[100vw] max-w-[100vw]">
      <div className=" w-full rounded-xl">
        {/* Top Navbar */}
        <nav className="h-[70px] flex justify-between py-1 px-4 items-center bg-[var(--primary)]">
          <div className="flex items-center gap-2">
          <img 
  src={Elena} 
  className="h-[50px] bg-white p-1 rounded-md cursor-pointer" 
  alt="Elena Logo" 
  onClick={() => window.location.reload()} 
/>

            <h5 className="text-white font-semibold text-xl ml-2">
               Grid Converter
            </h5>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
           
            {/* Login Button */}
            <div
              className="font-semibold bg-white border  rounded-lg px-3 py-2 cursor-pointer hover:bg-[var(--primary)] hover:text-white hover:border-white transition-all duration-300"
              onClick={() => Navigate("/login")}
            >
              Login
            </div>
            <button
  className="md:hidden text-white text-2xl p-2 rounded hover:bg-white/10 transition duration-300"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <FaBars />
</button>


          </div>
        </nav>

        {/* Menu Items */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex h-[70px] justify-center items-center bg-[var(--secondary)]`}
        >
          <ul className="flex flex-col md:flex-row p-0 m-0">
            {MenuElements.map((val, index) => (
              <Link to={val.link} key={index} onClick={() => setMenuOpen(false)}>
                <li
                   className={`font-semibold p-2 px-3 cursor-pointer duration-300 text-center ${
                    Location.pathname === val.link
                      ? "text-white bg-[var(--primary)]"
                      : "text-gray-900"
                  } rounded-lg m-1`}
                >
                  {val.display}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <div className="pt-2  text-lg text-gray-600 bg-gray-100/80 px-3 rounded-lg h-full  overflow-y-auto custom-scrollbar pr-2 min-h-[60vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
