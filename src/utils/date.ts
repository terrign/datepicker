import { MONDAY_INDEX, SUNDAY_INDEX, WEEK_LENGTH, WEEKDAYS, WEEKS_TO_DISPLAY } from '@constants';
import { DatePart, WeekStart } from '@types';

const VALID_DATE_STRING_REGEXP = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // yyyy-mm-dd

export const validateDateString = (dateString: string): string => {
  const str = dateString.match(VALID_DATE_STRING_REGEXP);
  if (str) {
    return str[0];
  } else {
    throw new TypeError(`Incorrect date string format: "${dateString}". Date string must be yyyy-mm-dd`);
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

export const changeDate = (dateString: string, datePartType: DatePart, changeAmount: number) => {
  const dateToChangeObject = getUTCDatefromDateString(dateString);

  switch (datePartType) {
    case DatePart.MONTH:
      dateToChangeObject.setMonth(dateToChangeObject.getMonth() + changeAmount);
      break;
    case DatePart.YEAR:
      dateToChangeObject.setFullYear(dateToChangeObject.getFullYear() + changeAmount);
      break;
    case DatePart.DAY:
      dateToChangeObject.setDate(dateToChangeObject.getDate() + changeAmount);
      break;
  }

  return toStringDate(dateToChangeObject);
};

const capitalizeFirstLetter = (str: string) => str[0].toUpperCase() + str.substring(1);

export const getMonthName = (month: number, locale: Intl.LocalesArgument = 'en-US') => {
  const date = new Date(2000, month - 1, 1);
  const monthName = capitalizeFirstLetter(date.toLocaleString(locale, { month: 'long' }));
  return monthName;
};

export const createCalendarMonthView = (firstDayOfTheMonth: string, weekStart: WeekStart) => {
  const firstDayOfTheMonthWeekIndex = getUTCDatefromDateString(firstDayOfTheMonth).getDay();
  const weekStartDayIndex = weekStart === 'Sunday' ? SUNDAY_INDEX : MONDAY_INDEX;
  const daysFromTheLastMonthToPrepend = firstDayOfTheMonthWeekIndex - weekStartDayIndex;
  const getDayObject = (date: string) => ({ date, types: [] });

  const calendarMonthView = [];
  let currentDate = firstDayOfTheMonth;

  for (let week = 0; calendarMonthView.length < WEEKS_TO_DISPLAY; week++) {
    const currentWeek = [];
    if (week === 0) {
      for (let i = daysFromTheLastMonthToPrepend; i > 0; i--) {
        currentDate = changeDate(currentDate, DatePart.DAY, -1);
        currentWeek.unshift(getDayObject(currentDate));
      }
      currentDate = firstDayOfTheMonth;
    }

    for (let i = currentWeek.length; i < WEEK_LENGTH; i++) {
      currentWeek.push(getDayObject(currentDate));
      currentDate = changeDate(currentDate, DatePart.DAY, 1);
    }

    calendarMonthView.push(currentWeek);
  }

  return calendarMonthView;
};

export const getWeekDays = (weekStart: WeekStart) => {
  const weekdays = [...WEEKDAYS];
  if (weekStart === 'Monday') {
    weekdays.push(weekdays.shift() as string);
  }
  return weekdays;
};
