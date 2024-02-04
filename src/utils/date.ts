import { WeekStart } from '@types';

const VALID_DATE_STRING_REGEXP = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // yyyy-mm-dd

export const validateDateString = (dateString: string): string => {
  const str = dateString.match(VALID_DATE_STRING_REGEXP);
  if (str) {
    return str[0];
  } else {
    throw new TypeError(`Incorrect date string format: ${dateString}. Date string must be yyyy-mm-dd`);
  }
};

export const getDateParts = (date: string) => {
  const [year, month, day] = date.split('-').map((part) => Number(part));
  return { year, month, day };
};

export function getUTCDatefromDateString(date: undefined): undefined;
export function getUTCDatefromDateString(date: string): Date;
export function getUTCDatefromDateString(date?: string) {
  if (!date) {
    return;
  }
  const { year, month, day } = getDateParts(validateDateString(date));
  return new Date(Date.UTC(year, month - 1, day));
}

export const toStringDate = (date: Date): string => {
  try {
    date.toISOString();
  } catch (e) {
    return '';
  }
  return date.toISOString().split('T')[0];
};

export const getFirstDayOfTheMonth = (dateString: string) => {
  const newDate = getUTCDatefromDateString(validateDateString(dateString));
  newDate.setDate(1);
  return toStringDate(newDate);
};

export const changeDate = (dateString: string, type: 'month' | 'year' | 'day', amount: number) => {
  const dateObj = getUTCDatefromDateString(dateString);
  const prevValue = type === 'month' ? dateObj.getMonth() : type === 'day' ? dateObj.getDate() : dateObj.getFullYear();
  const newValue = prevValue + amount;
  if (type === 'month') {
    dateObj.setMonth(newValue);
  } else if (type === 'year') {
    dateObj.setFullYear(newValue);
  } else {
    dateObj.setDate(newValue);
  }
  return toStringDate(dateObj);
};

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1);

export const getMonthName = (month: number, locale: Intl.LocalesArgument = 'en-US') => {
  const date = new Date(2000, month - 1, 1);
  const monthName = capitalizeFirstLetter(date.toLocaleString(locale, { month: 'long' }));
  return monthName;
};

export const createCalendarMonthView = (firstDayOfTheMonth: string, weekStart: WeekStart) => {
  const dateObj = getUTCDatefromDateString(firstDayOfTheMonth);
  const firstDayOfTheMonthWeekIndex = dateObj.getDay();
  const weekStartIndex = weekStart === 'Sunday' ? 0 : 1;
  let daysFromTheLastMonthToPrepend = firstDayOfTheMonthWeekIndex - weekStartIndex;

  if (daysFromTheLastMonthToPrepend < 0) {
    daysFromTheLastMonthToPrepend = 6;
  }
  const result = [];
  let currentDate = firstDayOfTheMonth;

  for (let w = 0; result.length < 6; w++) {
    const week = [];
    if (w === 0) {
      while (daysFromTheLastMonthToPrepend > 0) {
        currentDate = changeDate(currentDate, 'day', -1);
        week.unshift({
          date: currentDate,
          types: [],
        });

        daysFromTheLastMonthToPrepend -= 1;
      }
      currentDate = firstDayOfTheMonth;
    }
    while (week.length < 7) {
      week.push({
        date: currentDate,
        types: [],
      });
      currentDate = changeDate(currentDate, 'day', 1);
    }

    result.push(week);
  }

  return result;
};
