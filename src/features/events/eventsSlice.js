import { createSlice } from "@reduxjs/toolkit";

const loadEvents = () => {
  const saved = localStorage.getItem("events");
  return saved ? JSON.parse(saved) : [];
};

const saveEvents = (events) => {
  localStorage.setItem("events", JSON.stringify(events));
};

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: loadEvents(),
    filter: {
      status: null,   
      date: null,     
    },
    search: "",        
  },
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
      saveEvents(state.events);
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
      saveEvents(state.events);
    },
    markCompleted: (state, action) => {
      const event = state.events.find((e) => e.id === action.payload);
      if (event) event.status = "Completed";
      saveEvents(state.events);
    },
    setFilter: (state, action) => {
      // action.payload can be { status, date }
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = { status: null, date: null };
    },
    setSearch: (state, action) => {
      state.search = action.payload; // 🔹 store search input
    },
  },
});

export const { addEvent, deleteEvent, markCompleted, setFilter, clearFilter, setSearch } =
  eventsSlice.actions;
export default eventsSlice.reducer;
