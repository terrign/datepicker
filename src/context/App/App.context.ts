import { WeekStart } from '@types';
import { getCurrentDateObject } from '@utils';
import { createContext } from 'react';

import { AppContextType } from './types';

const { year, month } = getCurrentDateObject();

export const initialValues: AppContextType = {
  weekStart: WeekStart.SUNDAY,
  selectionStart: null,
  selectionEnd: null,
  currentMonth: month,
  currentYear: year,
  dispatch: () => {},
};

export const AppContext = createContext(initialValues);
