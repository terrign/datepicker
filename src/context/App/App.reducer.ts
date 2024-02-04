import { changeDate, getFirstDayOfTheMonth } from '@utils';

import { ActionType, AppReducerType } from './types';

export const appReducer: AppReducerType = (state, { type, payload }) => {
  const { firstDayOfTheViewMonth } = state;
  switch (type) {
    case ActionType.SET_DATE:
      return {
        ...state,
        selectedDate: payload,
        firstDayOfTheViewMonth: payload ? getFirstDayOfTheMonth(payload) : firstDayOfTheViewMonth,
      };
    case ActionType.CHANGE_MONTH:
      return {
        ...state,
        firstDayOfTheViewMonth: changeDate(firstDayOfTheViewMonth, 'month', payload),
      };
    case ActionType.CHANGE_YEAR:
      return {
        ...state,
        firstDayOfTheViewMonth: changeDate(firstDayOfTheViewMonth, 'year', payload),
      };
    case ActionType.HIDE_SHOW_CALENDAR:
      return {
        ...state,
        calendarVisible: payload,
      };
    case ActionType.SET_VIEW_DATE:
      return {
        ...state,
        firstDayOfTheViewMonth: getFirstDayOfTheMonth(payload),
      };
  }
};
