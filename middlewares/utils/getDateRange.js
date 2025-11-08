const getDateRange = (filter) => {
  const today = new Date();
  let startDate, endDate;

  if (filter.duration == "last-week") {
    startDate = new Date(today.setDate(today.getDate() - today.getDay() - 7)); // Last week's Monday
    endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Last week's Sunday
  } else if (filter.duration == "past-month") {
    startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of last month
    endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of last month
  } else if (filter.duration == "three-months") {
    startDate = new Date(today.getFullYear(), today.getMonth() - 3); // the last 3 months
    endDate = new Date(today.getFullYear(), today.getMonth()); // Last day of last month
  } else if (filter.startDate && filter.endDate) {
    startDate = new Date(filter.startDate)
    endDate = new Date(filter.endDate)
  } else {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1); // First day of this month
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of this month
  }

  return { startDate, endDate };
};

export default getDateRange