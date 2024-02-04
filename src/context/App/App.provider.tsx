import { WeekStart } from '@types';
import { AppContext } from 'context/App/App.context';
import { useApp } from 'context/App/useApp';
import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { appReducer } from './App.reducer';
import { ActionType, AppReducerType } from './types';

interface AppProviderProps extends PropsWithChildren {
  weekStart: WeekStart;
  defaultSelectedDate?: string;
  onError?: (error: Error) => void;
  minDate?: string;
  maxDate?: string;
}

export const AppProvider = ({
  children,
  weekStart,
  defaultSelectedDate,
  minDate,
  maxDate,
  onError,
}: AppProviderProps) => {
  const initialValues = useApp();
  const [state, dispatch] = useReducer<AppReducerType>(appReducer, initialValues);

  useEffect(() => {
    if (defaultSelectedDate) {
      dispatch({ type: ActionType.SET_DATE, payload: defaultSelectedDate });
    }
  }, [defaultSelectedDate]);

  const value = useMemo(() => {
    return {
      ...state,
      weekStart,
      minDate,
      maxDate,
      onError,
      dispatch,
    };
  }, [state, weekStart, minDate, maxDate, onError]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
