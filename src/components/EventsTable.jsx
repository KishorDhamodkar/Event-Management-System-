import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  markCompleted,
  setFilter,
  clearFilter,
} from "../features/events/eventsSlice";
import { useState } from "react";

export default function EventsTable() {
  const dispatch = useDispatch();
  const { events, filter, search } = useSelector((state) => state.events);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter((event) => {
    const statusMatch = filter.status ? event.status === filter.status : true;
    const dateMatch = filter.date ? event.date === filter.date : true;
    const searchMatch =
      search.trim() === "" ||
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.organizer.toLowerCase().includes(search.toLowerCase());

    return statusMatch && dateMatch && searchMatch;
  });

  const openModal = (event, type) => {
    setSelectedEvent(event);
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (actionType === "delete") {
      dispatch(deleteEvent(selectedEvent.id));
    } else if (actionType === "complete") {
      dispatch(markCompleted(selectedEvent.id));
    }
    setModalOpen(false);
    setSelectedEvent(null);
    setActionType(null);
  };

  return (
    <div
      className="bg-gradient-to-r from-[#344E41] to-[#588157] rounded-xl shadow-md 
                m-2 sm:m-5 p-4 sm:p-10 mt-[20px] sm:mt-[30px]"
    >
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 text-white">
        <select
          value={filter.status || ""}
          onChange={(e) =>
            dispatch(setFilter({ status: e.target.value || null }))
          }
          className="p-2 rounded text-white w-full sm:w-auto"
        >
          <option value="" className="text-black">
            All Status
          </option>
          <option value="Upcoming" className="text-black">
            Upcoming
          </option>
          <option value="Completed" className="text-black">
            Completed
          </option>
        </select>

        <input
          type="date"
          value={filter.date || ""}
          onChange={(e) =>
            dispatch(setFilter({ date: e.target.value || null }))
          }
          className="p-2 rounded text-white w-full sm:w-auto"
        />

        <button
          onClick={() => dispatch(clearFilter())}
          className="bg-white text-[#344E41] px-3 py-1 rounded hover:bg-[#c3ffe1] transition w-full sm:w-auto"
        >
          Clear Filters
        </button>
      </div>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-[#ffffff] text-[#344E41]">
              <th className="p-2 sm:p-3 text-left">Name</th>
              <th className="p-2 sm:p-3 text-left">Date</th>
              <th className="p-2 sm:p-3 text-left">Organizer</th>
              <th className="p-2 sm:p-3 text-left">Status</th>
              <th className="p-2 sm:p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-gray-300 text-white"
                >
                  <td className="p-2 sm:p-3 break-words">{event.name}</td>
                  <td className="p-2 sm:p-3">{event.date}</td>
                  <td className="p-2 sm:p-3 break-words">{event.organizer}</td>
                  <td className="p-2 sm:p-3">{event.status}</td>
                  <td className="p-2 sm:p-3 flex flex-col sm:flex-row gap-2">
                    {event.status !== "Completed" && (
                      <button
                        className="bg-[#344E41] text-white px-2 sm:px-3 py-1 rounded hover:bg-[#5aa780] transition"
                        onClick={() => openModal(event, "complete")}
                      >
                        <span className="sm:hidden">Done</span>
                        <span className="hidden sm:inline">Mark Completed</span>
                      </button>
                    )}
                    <button
                      className="bg-[#ffffff] text-[#344E41] px-2 sm:px-3 py-1 rounded hover:bg-[#c3ffe1] transition duration-500"
                      onClick={() => openModal(event, "delete")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-white py-4 font-semibold"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-[100]">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 shadow-lg text-center">
            <h2 className="text-lg font-semibold text-[#344E41] mb-4">
              Confirm {actionType === "delete" ? "Deletion" : "Completion"}
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {actionType === "delete"
                ? "delete this event?"
                : "mark this event as completed?"}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className="px-4 py-2 rounded bg-[#344E41] text-white hover:bg-[#5aa780] transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
