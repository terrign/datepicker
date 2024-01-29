import { WeekStart } from '@types';

export const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const toStringDate = (date: Date) => date.toISOString().split('T')[0];

export const getFirstDayOfTheMonth = (date: Date) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(1);
  return newDate;
};

export const changeDate = (date: Date, type: 'month' | 'year' | 'day', amount: number) => {
  const prevValue = type === 'month' ? date.getMonth() : type === 'day' ? date.getDate() : date.getFullYear();
  const newValue = prevValue + amount;
  const newDate = new Date(date.valueOf());
  if (type === 'month') {
    newDate.setMonth(newValue);
  } else if (type === 'year') {
    newDate.setFullYear(newValue);
  } else {
    newDate.setDate(newValue);
  }
  return newDate;
};

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1);

export const getMonthName = (month: number, locale: Intl.LocalesArgument = 'en-US') => {
  const date = new Date(2000, month, 1);
  const monthName = capitalizeFirstLetter(date.toLocaleString(locale, { month: 'long' }));
  return monthName;
};

export const createCalendarMonthView = (firstDayOfTheMonth: Date, weekStart: WeekStart) => {
  const firstDayOfTheMonthWeekIndex = firstDayOfTheMonth.getDay();
  const weekStartIndex = weekStart === WeekStart.SUNDAY ? 0 : 1;
  let daysFromTheLastMonthToPrepend = firstDayOfTheMonthWeekIndex - weekStartIndex;

  if (daysFromTheLastMonthToPrepend < 0) {
    daysFromTheLastMonthToPrepend = 6;
  }
  const result = [];
  let currentDate = new Date(firstDayOfTheMonth.valueOf());
  for (let w = 0; result.length < 6; w++) {
    const week = [];
    if (w === 0) {
      while (daysFromTheLastMonthToPrepend > 0) {
        currentDate = changeDate(currentDate, 'day', -1);
        week.unshift({
          date: toStringDate(currentDate),
        });

        daysFromTheLastMonthToPrepend -= 1;
      }
      currentDate = new Date(firstDayOfTheMonth.valueOf());
    }
    while (week.length < 7) {
      currentDate = changeDate(currentDate, 'day', 1);
      week.push({
        date: toStringDate(currentDate),
      });
    }

    result.push(week);
  }

  return result;
};
