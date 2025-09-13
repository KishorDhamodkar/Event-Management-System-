import Card from "./UI/Card";
import { useSelector } from "react-redux";

export default function SummaryCards() {
  const events = useSelector(state => state.events.events);
  const total = events.length;
  const upcoming = events.filter(e => e.status === "Upcoming").length;
  const completed = events.filter(e => e.status === "Completed").length;
  return (
    <div className="relative flex flex-col md:flex-row items-center md:items-stretch justify-around gap-3 px-2 py-10 bg-[#ffffff] overflow-hidden">
      <Card label="Total Events" data={total} />
      <Card label="Upcoming Events" data={upcoming} />
      <Card label="Completed Events" data={completed} />
    </div>
  );
}


