
export const getMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("default", { month: "short" }).toUpperCase();
};

export const getDay = (dateStr) => {
  const date = new Date(dateStr);
  return date.getDate();
};
