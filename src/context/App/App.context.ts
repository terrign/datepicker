import { WeekStart } from '@types';
import { getFirstDayOfTheMonth } from '@utils';
import { createContext } from 'react';

import { AppContextType } from './types';

export const initialValues: AppContextType = {
  weekStart: WeekStart.SUNDAY,
  selectionStart: null,
  selectionEnd: null,
  currentDate: getFirstDayOfTheMonth(new Date()),
  dispatch: () => {},
};

export const AppContext = createContext(initialValues);
