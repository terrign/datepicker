import { MONDAY_INDEX, SUNDAY_INDEX, WEEK_LENGTH, WEEKDAYS, WEEKS_TO_DISPLAY } from '@constants';
import { DatePart, DateString, DateStringOrNull, WeekStart } from '@types';

const VALID_DATE_STRING_REGEXP = /^[123456789]\d{3}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/; // yyyy-mm-dd

export const isNullDate = (dateString: DateStringOrNull): dateString is null => {
  return dateString === null;
};

export const isValidDateStringFormat = (dateString: DateStringOrNull): dateString is DateString => {
  if (isNullDate(dateString)) {
    return true;
  }
  return Boolean(dateString.match(VALID_DATE_STRING_REGEXP));
};

export const isValidDate = (dateString: DateString) => {
  if (isNaN(Date.parse(dateString))) {
    return false;
  }

  try {
    new Date(dateString).toISOString();
  } catch {
    return false;
  }

  const dateObject = getUTCDatefromDateString(dateString);
  const { month } = getDateParts(dateString);

  const monthDidNotChange = month && month - dateObject.getMonth() !== 1;

  if (monthDidNotChange) {
    return false;
  }

  return true;
};

export const getDateParts = (date: DateString) => {
  const [year, month, day] = date.split('-').map((part) => Number(part));
  return { year, month, day };
};

export function getUTCDatefromDateString(dateString: DateString) {
  const { year, month, day } = getDateParts(dateString);
  const UTCDate = new Date(Date.UTC(year, month - 1, day));
  return UTCDate;
}

export const toStringDate = (date: Date): DateString => {
  return date.toISOString().split('T')[0] as DateString;
};

export const getFirstDayOfTheMonth = (dateString: DateString) => {
  const newDate = getUTCDatefromDateString(dateString);
  newDate.setDate(1);
  return toStringDate(newDate);
};

export const changeDate = (dateString: DateString, datePartType: DatePart, changeAmount: number) => {
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
