import { useSelector } from "react-redux";
import { getMonth, getDay } from "../utils/dateUtils"; 

export default function CompletedEvents() {
  const events = useSelector(state =>
    state.events.events.filter(e => e.status === "Completed")
  );

  return (
    <div className="p-6">
      <h1 className="sm:text-[50px] text-[30px] font-bold mb-6 text-[#344E41]">
        Completed Events
      </h1>
      <div className="flex gap-[30px] flex-col sm:flex-row flex-wrap">
        {events.map(e => (
          <div
            key={e.id}
            className="bg-gradient-to-b from-[#6B7280] to-[#9CA3AF] 
                       p-4 rounded shadow-lg text-white 
                       transform transition-transform duration-300 hover:scale-105
                       flex flex-col justify-between sm:w-[200px] sm:h-[200px] w-full"
          >
            <div className="mb-2 text-center">
              <p className="text-md opacity-80">{getMonth(e.date)}</p>
              <p className="text-3xl font-bold">{getDay(e.date)}</p>
            </div>
            <h2 className="font-bold text-[24px] mb-2 text-center truncate">{e.name}</h2>
            <div className="text-sm opacity-90 text-center">
              <p>Organizer: {e.organizer || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
