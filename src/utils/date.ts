import { WeekStart } from '@types';

const VALID_DATE_STRING_REGEXP = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // yyyy-mm-dd

export const validateDateString = (dateString: string): string => {
  const str = dateString.match(VALID_DATE_STRING_REGEXP);
  if (str) {
    return str[0];
  } else {
    throw new TypeError(`Incorrect string format: ${dateString}. Date string must be yyyy-mm-dd`);
  }
};

export function getUTCDatefromDateString(date: undefined): undefined;
export function getUTCDatefromDateString(date: string): Date;
export function getUTCDatefromDateString(date?: string) {
  if (!date) {
    return;
  }
  const validatedDate = validateDateString(date);
  const [year, month, day] = validatedDate.split('-').map((datePart) => Number(datePart));
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

export const getFirstDayOfTheMonth = (date: Date) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(1);
  newDate.setHours(10);

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
  const weekStartIndex = weekStart === 'Sunday' ? 0 : 1;
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
          types: [],
        });

        daysFromTheLastMonthToPrepend -= 1;
      }
      currentDate = new Date(firstDayOfTheMonth.valueOf());
    }
    while (week.length < 7) {
      week.push({
        date: toStringDate(currentDate),
        types: [],
      });
      currentDate = changeDate(currentDate, 'day', 1);
    }

    result.push(week);
  }

  return result;
};
