import { useDispatch } from "react-redux";
import { addEvent } from "../features/events/eventsSlice";
import { useState } from "react";

export default function EventForm() {
  const [form, setForm] = useState({ name: "", date: "", organizer: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.organizer) return;
    dispatch(addEvent({ ...form, id: Date.now(), status: "Upcoming" }));
    setForm({ name: "", date: "", organizer: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Event Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded border-[#344E41] placeholder-[#588157]"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full p-2 border rounded  border-[#344E41] placeholder-[#588157]"
      />
      <input
        type="text"
        placeholder="Organizer"
        value={form.organizer}
        onChange={(e) => setForm({ ...form, organizer: e.target.value })}
        className="w-full p-2 border rounded  border-[#344E41] placeholder-[#588157]"
      />
      <button
        type="submit"
        className="w-full bg-[#344E41] hover:bg-[#588157] transition text-white py-2 rounded"
      >
        Add Event
      </button>
    </form>
  );
}
