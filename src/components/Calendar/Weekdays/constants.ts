import { WeekStart } from '@types';

export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const getWeekDays = (weekStart: WeekStart) => {
  const result = [...WEEKDAYS];
  if (weekStart === WeekStart.MONDAY) {
    result.push(result.shift() as string);
  }
  return result;
};
