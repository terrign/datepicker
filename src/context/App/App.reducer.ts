import { changeDate } from '@utils';

import { ActionType, AppReducerType } from './types';

export const appReducer: AppReducerType = (state, { type, payload }) => {
  const { currentDate } = state;
  switch (type) {
    case ActionType.SELECT_START:
      return {
        ...state,
        selectionStart: payload,
      };
    case ActionType.SELECT_END:
      return {
        ...state,
        selectionEnd: payload,
      };
    case ActionType.CHANGE_MONTH:
      return {
        ...state,
        currentDate: changeDate(currentDate, 'month', payload),
      };
    case ActionType.CHANGE_YEAR:
      return {
        ...state,
        currentDate: changeDate(currentDate, 'year', payload),
      };
  }
};
