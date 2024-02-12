import { getFirstDayOfTheMonth, toStringDate } from '@utils';

import { initialValues } from './App.context';
import { appReducer } from './App.reducer';
import { ActionType, ReducerState } from './types';

describe('App.reducer', () => {
  const date = getFirstDayOfTheMonth(toStringDate(new Date(Date.UTC(2024, 1, 1))));
  it('Returns new state', async () => {
    const state = initialValues;
    const newState = appReducer(state, { type: ActionType.HIDE_SHOW_CALENDAR, payload: false });
    expect(state).not.toBe(newState);
  });

  it('Correctly changes month', async () => {
    const state: ReducerState = {
      ...initialValues,
      firstDayOfTheViewMonth: date,
    };
    const newState = appReducer(state, { type: ActionType.CHANGE_MONTH, payload: -1 });
    expect(newState.firstDayOfTheViewMonth).toBe('2024-01-01');
  });

  it('Correctly changes year', async () => {
    const state: ReducerState = {
      ...initialValues,
      firstDayOfTheViewMonth: date,
    };
    const newState = appReducer(state, { type: ActionType.CHANGE_YEAR, payload: -1 });
    expect(newState.firstDayOfTheViewMonth).toBe('2023-02-01');
  });

  it('Correctly sets calendar view date', async () => {
    const state: ReducerState = {
      ...initialValues,
      firstDayOfTheViewMonth: date,
    };
    const newState = appReducer(state, { type: ActionType.SET_VIEW_DATE, payload: '2024-01-01' });
    expect(newState.firstDayOfTheViewMonth).toBe('2024-01-01');
  });

  it('Correctly sets date', async () => {
    const state: ReducerState = {
      ...initialValues,
      firstDayOfTheViewMonth: date,
    };
    const newState = appReducer(state, { type: ActionType.SET_DATE, payload: '2024-03-25' });
    expect(newState.selectedDate).toBe('2024-03-25');
    expect(newState.firstDayOfTheViewMonth).toBe('2024-03-01');
  });

  it(`Doesn't change calendar view date on selected date clear`, async () => {
    const state: ReducerState = {
      ...initialValues,
      firstDayOfTheViewMonth: date,
    };
    const newState = appReducer(state, { type: ActionType.SET_DATE, payload: null });
    expect(newState.selectedDate).toBe(null);
    expect(newState.firstDayOfTheViewMonth).toBe(state.firstDayOfTheViewMonth);
  });
});
