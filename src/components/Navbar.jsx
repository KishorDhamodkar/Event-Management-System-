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
    <div className="relative px-4 py-2.5 bg-[#344E41] overflow-visible z-50">
      <div className="flex justify-between items-center relative">
        <div className="flex-1 flex justify-center lg:justify-start px-2 py-4">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="placeholder-white md:w-1/2 lg:w-1/3 px-2 ml-3 py-2 rounded-lg border border-white text-white focus:outline-none focus:ring-1 focus:ring-[#7B2CBF] transition"
          />
        </div>


        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white text-[#344E41] px-3 py-2 rounded-full shadow hover:bg-[#c3ffe1] transition"
          >
            <span className="font-semibold">User</span>
            <IoIosArrowDropdown
              size={20}
              className={`transform transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
              <ul className="text-[#344E41]">
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-[#c3ffe1] cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
