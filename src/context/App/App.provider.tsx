import { useApp } from '@hooks/useApp';
import { DateStringOrNull, WeekStart } from '@types';
import { PropsWithChildren, useEffect, useMemo, useReducer } from 'react';

import { AppContext } from './App.context';
import { appReducer } from './App.reducer';
import { ActionType, AppReducerType, GetDatePartChangeHandlerType } from './types';

interface AppProviderProps extends PropsWithChildren {
  weekStart: WeekStart;
  defaultSelectedDate?: DateStringOrNull;
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
}: AppProviderProps) => {
  const initialValues = useApp();

  const [state, dispatch] = useReducer<AppReducerType>(appReducer, initialValues);

  useEffect(() => {
    if (defaultSelectedDate) {
      dispatch({ type: ActionType.SET_DATE, payload: defaultSelectedDate });
    }
  }, [defaultSelectedDate]);

  const getDateChangeHandler: GetDatePartChangeHandlerType = (action, changeAmount) => () => {
    dispatch({ type: action, payload: changeAmount });
  };

  const value = useMemo(() => {
    return {
      ...state,
      weekStart,
      disableWeekends,
      minDate,
      maxDate,
      dispatch,
      getDateChangeHandler,
    };
  }, [state, weekStart, minDate, maxDate, disableWeekends]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
