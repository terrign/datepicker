import {
  changeDate,
  createCalendarMonthView,
  getDateParts,
  getFirstDayOfTheMonth,
  getMonthName,
  getUTCDatefromDateString,
  getWeekDays,
  toStringDate,
  validateDateString,
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
  toStringDate,
  validateDateString,
};
