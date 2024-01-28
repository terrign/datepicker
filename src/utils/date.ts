import { WeekStart } from '@types';

export const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1);

export const getMonthName = (month: number, locale: Intl.LocalesArgument = 'en-US') => {
  const date = new Date(2000, month, 1);
  const monthName = capitalizeFirstLetter(date.toLocaleString(locale, { month: 'long' }));
  return monthName;
};

export const getCurrentDateObject = () => {
  const date = new Date(Date.now());
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
};

export const createMonthCalendar = (year: number, month: number, weekStart: WeekStart) => {
  const daysInCurrentMonth = daysInMonth(year, month);
  const weekStartDay = weekStart === WeekStart.SUNDAY ? 0 : 1;
  const firstWeekDayOfTheMonth = new Date(year, month, 1).getDay();
  const result = [];
  let currentDay = 1;

  for (let w = 0; w < 6; w++) {
    const week = [];
    if (w === 0) {
      for (let d = firstWeekDayOfTheMonth - weekStartDay; d < 7; d++) {
        week.push(currentDay);
        currentDay++;
      }

      let currentPastMonthDay = daysInMonth(year, month - 1);
      while (week.length < 7) {
        week.unshift(currentPastMonthDay);
        currentPastMonthDay--;
      }
    } else {
      for (let d = 0 - weekStartDay; week.length < 7; d++) {
        week.push(currentDay);
        currentDay++;
        if (currentDay > daysInCurrentMonth) {
          currentDay = 1;
        }
      }
    }
    result.push(week);
  }
  return result;
};
