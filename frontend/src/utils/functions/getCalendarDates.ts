import CalendarDateType from '../../types/CalendarDateType';

const getCalendarDates = (year: number, month: number) => {
  const dates: CalendarDateType[] = [];

  // Get the last date of the month
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Fill in the dates for the current month
  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      date: i,
      day: new Date(year, month, i).getDay()
    });
  }

  return dates;
};

export default getCalendarDates;
