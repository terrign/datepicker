import { WeekStart } from '@types';
import { AppContext } from 'context/App/App.context';
import { useApp } from 'context/App/useApp';
import { PropsWithChildren, useMemo, useReducer } from 'react';

import { appReducer } from './App.reducer';
import { ActionType, AppReducerType } from './types';

interface AppProviderProps extends PropsWithChildren {
  weekStart: WeekStart;
  defaultSelectedDate?: string;
  minDate?: string;
  maxDate?: string;
}

export const AppProvider = ({ children, weekStart, defaultSelectedDate, minDate, maxDate }: AppProviderProps) => {
  const initialValues = useApp();
  const [state, dispatch] = useReducer<AppReducerType>(appReducer, initialValues);

  if (defaultSelectedDate) {
    dispatch({ type: ActionType.SET_DATE, payload: new Date(defaultSelectedDate) });
  }

  const value = useMemo(
    () => ({
      ...state,
      weekStart,
      minDate,
      maxDate,
      dispatch,
    }),
    [state, weekStart, minDate, maxDate],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
