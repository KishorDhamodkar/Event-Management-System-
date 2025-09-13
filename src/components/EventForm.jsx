import { useDispatch } from "react-redux";
import { addEvent } from "../features/events/eventsSlice";
import { useState } from "react";
import { getToday, getTomorrow, getNextNDates } from "../utils/dateUtils";

export default function EventForm() {
  const [form, setForm] = useState({ name: "", date: "", organizer: "" });
  const dispatch = useDispatch();
  const today = getToday();
  const tomorrow = getTomorrow();
  const weekDates = getNextNDates(5); // next 5 dates after tomorrow

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.organizer) return;
    dispatch(addEvent({ ...form, id: Date.now(), status: "Upcoming" }));
    setForm({ name: "", date: "", organizer: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-white shadow-lg rounded-lg max-w-md mx-auto w-full"
    >
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Event Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border border-[#344E41] rounded focus:outline-none focus:ring-2 focus:ring-[#588157]"
          placeholder="Enter event name"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700 font-medium">Organizer</label>
        <input
          type="text"
          value={form.organizer}
          onChange={(e) => setForm({ ...form, organizer: e.target.value })}
          className="w-full p-3 border border-[#344E41] rounded focus:outline-none focus:ring-2 focus:ring-[#588157]"
          placeholder="Enter organizer name"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-700 font-medium">Event Date</label>

        <div className="flex gap-2 mb-2 flex-wrap">
          <button
            type="button"
            onClick={() => setForm({ ...form, date: today })}
            className="text-sm px-2 py-1 bg-[#344E41] text-white rounded hover:bg-[#588157] transition"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, date: tomorrow })}
            className="text-sm px-2 py-1 bg-[#344E41] text-white rounded hover:bg-[#588157] transition"
          >
            Tomorrow
          </button>

          {weekDates.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setForm({ ...form, date: d })}
              className="text-sm px-2 py-1 bg-[#344E41] text-white rounded hover:bg-[#588157] transition"
            >
              {new Date(d).getDate()}
            </button>
          ))}
        </div>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          min={today} // prevent past dates
          className="w-full p-3 border border-[#344E41] rounded focus:outline-none focus:ring-2 focus:ring-[#588157]"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#344E41] hover:bg-[#588157] transition text-white py-3 rounded font-semibold"
      >
        Add Event
      </button>
    </form>
  );
}
