import { getFirstDayOfTheMonth, toStringDate } from '@utils';
import { createContext } from 'react';

import { AppContextType } from './types';

export const initialValues: AppContextType = {
  weekStart: 'Sunday',
  selectedDate: null,
  firstDayOfTheViewMonth: getFirstDayOfTheMonth(toStringDate(new Date())),
  calendarVisible: false,
  disableWeekends: false,
  validationError: null,
  dispatch: () => {},
};

export const AppContext = createContext(initialValues);
