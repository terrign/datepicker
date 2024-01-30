import { WeekStart } from '@types';
import { AppContext } from 'context/App/App.context';
import { useApp } from 'context/App/useApp';
import { PropsWithChildren, useMemo, useReducer } from 'react';

import { appReducer } from './App.reducer';
import { AppReducerType } from './types';

interface AppProviderProps extends PropsWithChildren {
  weekStart: WeekStart;
}

export const AppProvider = ({ children, weekStart }: AppProviderProps) => {
  const initialValues = useApp();
  const [state, dispatch] = useReducer<AppReducerType>(appReducer, initialValues);

  const value = useMemo(
    () => ({
      ...state,
      weekStart,
      dispatch,
    }),
    [state, weekStart],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
