import { DatePart } from '@types';
import { changeDate, getFirstDayOfTheMonth, isNullDate, isValidDate } from '@utils';

import { ActionType, AppReducerType } from './types';

export const appReducer: AppReducerType = (state, { type, payload }) => {
  const { firstDayOfTheViewMonth } = state;
  switch (type) {
    case ActionType.SET_DATE:
      return {
        ...state,
        selectedDate: payload,
        firstDayOfTheViewMonth:
          !isNullDate(payload) && isValidDate(payload) ? getFirstDayOfTheMonth(payload) : firstDayOfTheViewMonth,
      };
    case ActionType.CHANGE_MONTH:
      return {
        ...state,
        firstDayOfTheViewMonth: changeDate(firstDayOfTheViewMonth, DatePart.MONTH, payload),
      };
    case ActionType.CHANGE_YEAR:
      return {
        ...state,
        firstDayOfTheViewMonth: changeDate(firstDayOfTheViewMonth, DatePart.YEAR, payload),
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
    case ActionType.SET_CALENDAR_REF:
      return {
        ...state,
        calendarContainerRef: payload,
      };
    case ActionType.SET_VALIDATION_ERROR:
      return {
        ...state,
        validationError: payload,
      };
  }
};
