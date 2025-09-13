import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UpcomingEvents from "./pages/UpcomingEvents";
import CompletedEvents from "./pages/CompletedEvents";
import CreateEvent from "./pages/CreateEvent";

function App() {

  return (
    <div>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upcoming" element={<UpcomingEvents />} />
              <Route path="/completed" element={<CompletedEvents />} />
              <Route path="/create" element={<CreateEvent />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
