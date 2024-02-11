import { DateStringOrNull, WeekStart } from '@types';
import { AppContext } from 'context/App/App.context';
import { useApp } from 'hooks/useApp';
import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { appReducer } from './App.reducer';
import { ActionType, AppReducerType } from './types';

interface AppProviderProps extends PropsWithChildren {
  weekStart: WeekStart;
  defaultSelectedDate?: DateStringOrNull;
  onError?: (error: Error) => void;
  disableWeekends: boolean;
  minDate?: DateStringOrNull;
  maxDate?: DateStringOrNull;
}

export const AppProvider = ({
  children,
  weekStart,
  disableWeekends,
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
      disableWeekends,
      minDate,
      maxDate,
      onError,
      dispatch,
    };
  }, [state, weekStart, minDate, maxDate, disableWeekends, onError]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
