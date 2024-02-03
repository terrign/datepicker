import { getFirstDayOfTheMonth } from '@utils';
import { createContext } from 'react';

import { AppContextType } from './types';

export const initialValues: AppContextType = {
  weekStart: 'Sunday',
  selectedDate: null,
  firstDayOfTheViewMonth: getFirstDayOfTheMonth(new Date(Date.now())),
  calendarVisible: false,
  dispatch: () => {},
};

export const AppContext = createContext(initialValues);
