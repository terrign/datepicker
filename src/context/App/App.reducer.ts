import { ActionType, AppReducerType } from './types';

export const appReducer: AppReducerType = (state, action) => {
  switch (action.type) {
    case ActionType.SELECT_START:
      return {
        ...state,
        selectionStart: action.payload,
      };
    case ActionType.SELECT_END:
      return {
        ...state,
        selectionEnd: action.payload,
      };
    case ActionType.MONTH:
      const { currentMonth, currentYear } = state;
      let newMonth = currentMonth + action.payload;
      let newYear = currentYear;

      if (newMonth === 12) {
        newMonth = 0;
        newYear++;
      }
      if (newMonth === -1) {
        newMonth = 11;
        newYear--;
      }
      return {
        ...state,
        currentMonth: newMonth,
        currentYear: newYear,
      };
    case ActionType.YEAR:
      return {
        ...state,
        currentYear: state.currentYear + action.payload,
      };
  }
};
