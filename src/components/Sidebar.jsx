import { useState } from "react";
import { MdDashboard, MdUpcoming, MdOutlineMenuOpen } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoIosCreate, IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; 
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const [isMobileOpen, setIsMobileOpen] = useState(false); 
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <MdDashboard size={20} /> },
    { name: "Upcoming Events", path: "/upcoming", icon: <MdUpcoming size={20} /> },
    { name: "Completed Events", path: "/completed", icon: <TiTick size={20} /> },
    { name: "Create Event", path: "/create", icon: <IoIosCreate size={20} /> },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-md 
          text-gray-500 font-bold z-[70] 
          ${isOpen ? "w-64 px-4" : "w-20 px-2"} 
          py-4 transform transition-all duration-300
          md:relative md:block
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex justify-between items-center text-2xl pt-10 pb-10">
          {isOpen && (
            <h1 className="text-[#344E41] text-lg hidden md:block">
              Campus Events
            </h1>
          )}

          <div className="hidden md:block">
            <MdOutlineMenuOpen
              size={28}
              className="cursor-pointer ml-5 text-[#588157]"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          <div className="md:hidden">
            <IoMdClose
              size={28}
              className="cursor-pointer ml-5 text-[#588157]"
              onClick={() => setIsMobileOpen(false)}
            />
          </div>
        </div>

        <ul className="mt-5 text-base font-semibold">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`py-2 px-2 rounded transition-colors duration-300 mb-1 
                ${
                  isActive(item.path)
                    ? "bg-gray-100 text-[#588157]"
                    : "text-gray-500"
                } 
                hover:bg-gray-100 hover:text-[#588157]`}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-3 ${
                  !isOpen ? "justify-center" : ""
                }`}
                onClick={() => setIsMobileOpen(false)} 
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {!isMobileOpen && (
        <div className="md:hidden fixed top-4 left-4 z-[80] mt-5">
          <IoMdMenu
            size={32}
            className="cursor-pointer text-[#ffffff]"
            onClick={() => setIsMobileOpen(true)}
          />
        </div>
      )}
    </>
  );
}
