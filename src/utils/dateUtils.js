
export const getMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" }).toUpperCase();
};

export const getDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.getDate();
};

export const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

export const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

export const getNextNDates = (n = 5) => {
  const dates = [];
  for (let i = 2; i <= n + 1; i++) { 
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};