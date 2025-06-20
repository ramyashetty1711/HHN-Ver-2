import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Elena from "../../assets/Elena.png";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TbLogout } from "react-icons/tb";
import { store } from "../../redux/Store";
import {
  updateAddRaiseTicket,
  updateLoggedInStatus,
  updateShowVerification,
  updateVerificationData,
} from "../../redux/DataSlice";
import { SpinnerCircularFixed } from "spinners-react";
import { useLocalUserData } from "../../query/UseLocalData";
import { APPURL } from "../../URL";
import Script from "../../Script";
import VerificationModal from "../Verification/Verification";
import AddTicket from "../Support/AddTicket";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const UserData = useLocalUserData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [supportMenu, setSuppotMenu] = useState(false);
  const [LogoutLoading, setLogoutLoading] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const userRef = useRef(null);
  const supportRef = useRef(null);

  const moreRef = useRef(null);
  const LoggedInStatus = useSelector((state) => state.data.LoggedInStatus);
  const AddRaiseTicket=useSelector((state)=>state.data.AddRaiseTicket)

  const MenuElements = [
    { link: "/", display: "Home" },
    { link: "/necessity", display: "Necessity" },
    { link: "/development", display: "Development" },
    { link: "/trials", display: "Trials" },
    { link: "/features", display: "Features" },
    { link: "/certificationofhhn", display: "Certification of HHN" },
    { link: "/procurement", display: "Procurement" },
    { link: "/NavIC", display: "NavIC" },
    { link: "/elena", display: "Elena" },
    { link: "/contact", display: "Contact Us" },
    { link: "/faq", display: "FAQ" },
  ];

  const LoggedInMenuElements = [
    { link: "/downloads", display: "Downloads" },
    { link: "/tickets", display: "Ticket" },
    { link: "/tutorials", display: "Tutorial" },
    { link: "/feedback", display: "Feedback" },
  ];

  const handlereload = () => {
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setSuppotMenu(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const HandleLogout = async () => {
    setLogoutLoading(true);
    fetch(APPURL.logout, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${UserData.token}`,
      },
    }).then((res) => {
      if (res.ok) {
        sessionStorage.clear();
        store.dispatch(updateLoggedInStatus(false));
        store.dispatch(updateShowVerification(false));
        store.dispatch(
          updateVerificationData({
            email_verified: false,
            phone_verified: false,
          })
        );
        navigate("/login");
        setLogoutLoading(false);
      }
    });
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="w-full rounded-xl relative">
          {/* Top Navbar */}
          <nav className="flex justify-between py-2 px-4 items-center bg-[var(--primary)]">
            <div className="flex items-center gap-2">
              <img
                src={Elena}
                className="h-[50px] bg-white p-1 rounded-md cursor-pointer"
                alt="Elena Logo"
                onClick={handlereload}
              />
              <h5 className="text-white font-semibold text-md md:text-xl ml-2">
                Elena Handheld Navigator
              </h5>
            </div>

            <div className="flex items-center md:gap-3" ref={dropdownRef}>
              {!LoggedInStatus ? (
                <>
                  <span className="text-[0.8em] md:text-sm text-gray-300 font-semibold text-center wrap-break-word mr-1  md:mr-0">
                    Login for Customer Support
                  </span>
                  <div
                    className="font-semibold bg-white border rounded-lg px-3 py-2 cursor-pointer text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:border-white transition-all duration-300"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                </>
              ) : (
                <div className="relative inline-block text-left">
                  <div
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="cursor-pointer flex flex-row items-center "
                  >
                    <span className="text-gray-200 font-semibold mr-2">
                      {UserData?.user}
                    </span>
                    <FaUserCircle size={30} className="text-white" />
                  </div>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          HandleLogout();
                        }}
                        className="w-full text-left px-4 py-4  justify-center text-md text-gray-700 hover:bg-gray-100 font-semibold flex flex-row items-center cursor-pointer"
                        disabled={LogoutLoading}
                      >
                        {LogoutLoading ? (
                          <SpinnerCircularFixed
                            size={20}
                            color="#fb2c36"
                            secondaryColor="#fb2c3630"
                            thickness={200}
                            speed={200}
                          />
                        ) : (
                          <>
                            <TbLogout size={20} className="text-red-500 mr-2" />
                            Logout
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="xl:hidden text-white text-2xl py-2 pl-2 rounded hover:bg-white/10 transition duration-300 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </nav>

          {/* Menu Items */}
          <nav
            ref={menuRef}
            className={`${
              menuOpen ? "block absolute z-50 left-0 top-full" : "hidden"
            } xl:flex justify-center items-center bg-[var(--secondary)] w-full xl:static xl:z-auto`}
          >
            <ul
              className={`flex flex-col xl:flex-row  w-full py-1 px-4 ${
                LoggedInStatus ? "justify-center" : "justify-between"
              }`}
            >
              {!LoggedInStatus &&
                MenuElements.map((val, index) => (
                  <Link
                    key={index}
                    to={val.link}
                    onClick={() => setMenuOpen(false)}
                  >
                    <li
                      className={`font-semibold text-sm p-2 px-4 cursor-pointer duration-300 text-center rounded-lg m-1 transition-all  ${
                        location.pathname === val.link
                          ? "text-white bg-[var(--primary)]"
                          : "text-gray-900 hover:bg-blue-900/25 "
                      }`}
                    >
                      {val.display}
                    </li>
                  </Link>
                ))}

              {/* Support Menu - Only if logged in */}
              {LoggedInStatus && (
                <>
                  {LoggedInMenuElements.map((val, index) => (
                    <Link
                      key={index}
                      to={val.link}
                      onClick={() => setMenuOpen(false)}
                    >
                      <li
                        className={`font-semibold text-sm p-2 px-4 cursor-pointer duration-300 text-center rounded-lg m-1 transition-all  ${
                          location.pathname === val.link
                            ? "text-white bg-[var(--primary)]"
                            : "text-gray-900 hover:bg-blue-900/25 "
                        }`}
                      >
                        {val.display}
                      </li>
                    </Link>
                  ))}
                </>
              )}
              {LoggedInStatus && (
                <li
                  className={`font-semibold text-sm p-2 px-4 cursor-pointer duration-300 text-center rounded-lg m-1  text-gray-900 hover:bg-blue-900/25 
                   `}
                  onClick={() => {
                    store.dispatch(updateAddRaiseTicket(true));
                     setMenuOpen(false)
                  }}
                >
                  Raise New Ticket
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
      {LoggedInStatus && <VerificationModal />}
      <AddTicket />
      <Script />
    </>
  );
};

export default Navbar;
