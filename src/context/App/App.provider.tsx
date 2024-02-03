import { WeekStart } from '@types';
import { getUTCDatefromDateString } from '@utils';
import { AppContext } from 'context/App/App.context';
import { useApp } from 'context/App/useApp';
import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

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

  useEffect(() => {
    if (defaultSelectedDate) {
      const initialDate = getUTCDatefromDateString(defaultSelectedDate);
      dispatch({ type: ActionType.SET_DATE, payload: initialDate });
    }
  }, [defaultSelectedDate]);

  const value = useMemo(() => {
    return {
      ...state,
      weekStart,
      minDate,
      maxDate,
      dispatch,
    };
  }, [state, weekStart, minDate, maxDate]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
