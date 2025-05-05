import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Elena from "../../assets/Elena.png";
import { FaBars } from "react-icons/fa"; // for hamburger icon

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const MenuElements = [
    { link: "/", display: "Home" },
    { link: "/background", display: "Background" },
    { link: "/necessity", display: "Necessity" },
    { link: "/development", display: "Development" },
    { link: "/trials", display: "Trials" },
    { link: "/features", display: "Features" },
    { link: "/procurement", display: "Procurement" }, // fixed typo
    { link: "/NavIC", display: "NavIC" },
    { link: "/elena", display: "Elena" },
    { link: "/contact", display: "Contact Us" },
    { link: "/help", display: "Help" }
  ];

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full rounded-xl relative">
        {/* Top Navbar */}
        <nav className="flex justify-between py-2 px-4 items-center bg-[var(--primary)]">
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
            {/* Login Button */}
            <div
              className="font-semibold bg-white border rounded-lg px-3 py-2 cursor-pointer text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-white transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </div>

            {/* Mobile Menu Button */}
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
            menuOpen ? "block absolute z-50 left-0 top-full" : "hidden"
          } md:flex justify-center items-center bg-[var(--secondary)] w-full md:static md:z-auto`}
        >
          <ul className="flex flex-col md:flex-row justify-between w-full py-1 px-4">
            {MenuElements.map((val, index) => (
              <li
                key={index}
                className={`font-semibold text-sm p-2 px-4 cursor-pointer duration-300 text-center rounded-lg m-1 ${
                  location.pathname === val.link
                    ? "text-white bg-[var(--primary)]"
                    : "text-gray-900"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <Link to={val.link} className="block w-full h-full">
                  {val.display}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main content */}
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
