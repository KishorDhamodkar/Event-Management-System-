import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/events/eventsSlice";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.events.search);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative px-2 py-5 bg-[#344E41] z-50 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="flex flex-1 justify-start ml-[50px] lg:ml-[5px] lg:justify-start px-1">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="placeholder-white w-2/5 md:w-1/3 lg:w-1/4 px-2 py-2 rounded-md border border-white text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#7B2CBF] transition"
          />
        </div>

        <div className="relative ml-2 shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 bg-white text-[#344E41] px-2 py-2 rounded-full shadow hover:bg-[#c3ffe1] transition text-sm"
          >
            <span className="font-semibold hidden sm:block">User</span>
            <IoIosArrowDropdown
              size={18}
              className={`transform transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="fixed right-4 top-[60px] w-48 bg-white rounded-md shadow-lg overflow-hidden z-[999]">
              <ul className="text-[#344E41]">
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
