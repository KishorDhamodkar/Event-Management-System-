import EventForm from "../components/EventForm";

export default function CreateEvent() {
  return (
    <div>
      <h1 className="sm:text-[50px] text-[30px] font-bold p-4 text-[#344E41]">Create New Event</h1>
      <EventForm />
    </div>
  );
}
