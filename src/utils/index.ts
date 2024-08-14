import {
  changeDate,
  createCalendarMonthView,
  getDateParts,
  getFirstDayOfTheMonth,
  getMonthName,
  getUTCDatefromDateString,
  getWeekDays,
  isNullDate,
  isValidDate,
  isValidDateStringFormat,
  toStringDate,
} from './date';

function* uniqueIdGenerator() {
  while (true) {
    yield Date.now().toString(36) + Math.random().toString(36);
  }
}

const getUniqueId = () => uniqueIdGenerator().next().value as string;

export {
  changeDate,
  createCalendarMonthView,
  getDateParts,
  getFirstDayOfTheMonth,
  getMonthName,
  getUniqueId,
  getUTCDatefromDateString,
  getWeekDays,
  isNullDate,
  isValidDate,
  isValidDateStringFormat,
  toStringDate,
};
