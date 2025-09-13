import SummaryCards from "../components/SummaryCards";
import EventsTable from "../components/EventsTable";

export default function Dashboard() {
  return (
    <div>
    <h1 className="sm:text-[50px] text-[30px] font-bold px-6 text-[#344E41] mt-[20px]">Dashboard</h1>
      <SummaryCards />
      <EventsTable />
    </div>
  );
}
